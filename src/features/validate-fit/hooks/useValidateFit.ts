/**
 * NEXT MOVE AI V2 — FLOW 6: USE VALIDATE FIT HOOK
 * 
 * Orchestrates student profile synchronization, trial filtering,
 * execution modals, reflection workflows, and evidence ledger access.
 */

"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { studentProfileStore } from "@/features/student-home/services/profile-store";
import { type StudentIntelligenceProfile } from "@/features/onboarding/schemas/types";
import { TRIAL_CATALOG } from "../data/trial-catalog";
import { activityEvidenceStore } from "../services/evidence-store";
import { feedbackGenerator } from "../services/feedback-generator";
import {
  type TrialActivity,
  type TrialAttemptRecord,
  type TrialReflection,
  type TrialFeedbackSummary,
  type FitWorkspaceTab,
  type FitFilters,
} from "../types";

export function useValidateFit() {
  const searchParams = useSearchParams();

  // 1. Profile state
  const [profile, setProfile] = useState<StudentIntelligenceProfile | null>(() =>
    studentProfileStore.isAnonymousMode()
      ? null
      : studentProfileStore.getConfirmedProfile() || studentProfileStore.getActiveProfile()
  );

  const isAnonymous = useMemo(() => {
    return studentProfileStore.isAnonymousMode() && !studentProfileStore.hasRealHandoff();
  }, []);

  const studentStageId = profile?.academicStageId;

  // 2. Tab selection ("discovery" | "ledger" | "history")
  const initialTab = (searchParams.get("tab") as FitWorkspaceTab) || "discovery";
  const [activeTab, setActiveTab] = useState<FitWorkspaceTab>(initialTab);

  // 3. Filters
  const defaultStage = studentStageId || "all";
  const [filters, setFilters] = useState<FitFilters>({
    searchQuery: "",
    selectedCategory: "all",
    selectedStage: defaultStage,
    selectedFormat: "all",
    showDivergentOnly: searchParams.get("filter") === "divergent",
  });

  // 4. Modal states
  const [activeTrial, setActiveTrial] = useState<TrialActivity | null>(() => {
    const trialParam = searchParams.get("trial");
    if (trialParam) {
      const found = TRIAL_CATALOG.find((t) => t.id === trialParam);
      if (found) {
        // Child safety gate: Classes 4-7 cannot open adult trials
        if (studentStageId === "classes-4-7" && !found.stageSuitability.includes("classes-4-7")) {
          return null;
        }
        return found;
      }
    }
    return null;
  });

  const [activeReflectionTrial, setActiveReflectionTrial] = useState<TrialActivity | null>(null);
  const [activeFeedback, setActiveFeedback] = useState<TrialFeedbackSummary | null>(null);
  const [pendingTrialWork, setPendingTrialWork] = useState<{
    workNotes: string;
    selectedOptionIds: string[];
    hasParticipated: boolean;
  } | null>(null);

  // Derive active trial, strictly gating adult trials from middle schoolers
  const effectiveActiveTrial = useMemo(() => {
    if (
      profile?.academicStageId === "classes-4-7" &&
      activeTrial &&
      !activeTrial.stageSuitability.includes("classes-4-7")
    ) {
      return null;
    }
    return activeTrial;
  }, [profile?.academicStageId, activeTrial]);

  // 5. Evidence store attempts state
  const [attempts, setAttempts] = useState<TrialAttemptRecord[]>(() =>
    activityEvidenceStore.getAllAttempts()
  );

  // Sync profile scope
  useEffect(() => {
    const scope = profile ? profile.profileId || profile.academicStageId : "anonymous";
    activityEvidenceStore.setProfileScope(scope, profile?.academicStageId);
  }, [profile]);

  // Adjust active trial if URL search params change
  const [prevTrialParam, setPrevTrialParam] = useState(() => searchParams.get("trial"));
  const currentTrialParam = searchParams.get("trial");
  if (currentTrialParam !== prevTrialParam) {
    setPrevTrialParam(currentTrialParam);
    if (currentTrialParam) {
      const found = TRIAL_CATALOG.find((t) => t.id === currentTrialParam);
      if (found && !(profile?.academicStageId === "classes-4-7" && !found.stageSuitability.includes("classes-4-7"))) {
        setActiveTrial(found);
      }
    }
  }

  // Synchronize profile updates
  useEffect(() => {
    const unsubscribeProfile = studentProfileStore.subscribe(() => {
      const nextProfile = studentProfileStore.isAnonymousMode()
        ? studentProfileStore.getConfirmedProfile()
        : studentProfileStore.getConfirmedProfile() ||
          studentProfileStore.getActiveProfile();
      setProfile(nextProfile);

      const nextScope = nextProfile ? nextProfile.profileId || nextProfile.academicStageId : "anonymous";
      activityEvidenceStore.setProfileScope(nextScope, nextProfile?.academicStageId);

      if (nextProfile) {
        setFilters((prev) => ({
          ...prev,
          selectedStage: nextProfile.academicStageId,
          selectedCategory: "all",
          selectedFormat: "all",
          showDivergentOnly: false,
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          selectedStage: "all",
          selectedCategory: "all",
          selectedFormat: "all",
          showDivergentOnly: false,
        }));
      }
    });

    const unsubscribeEvidence = activityEvidenceStore.subscribe(() => {
      setAttempts(activityEvidenceStore.getAllAttempts());
    });

    return () => {
      unsubscribeProfile();
      unsubscribeEvidence();
    };
  }, []);

  // Filtered Trials Pool
  const filteredTrials = useMemo(() => {
    return TRIAL_CATALOG.filter((trial) => {
      // 1. Child safety gate: Middle schoolers (Classes 4-7) can NEVER see adult trials
      if (profile?.academicStageId === "classes-4-7") {
        if (!trial.stageSuitability.includes("classes-4-7")) {
          return false;
        }
      }

      // 2. Stage Filter
      if (
        filters.selectedStage !== "all" &&
        !trial.stageSuitability.includes(filters.selectedStage)
      ) {
        return false;
      }

      // 3. Category Filter
      if (
        filters.selectedCategory !== "all" &&
        trial.categoryId !== filters.selectedCategory
      ) {
        return false;
      }

      // 4. Format Filter
      if (
        filters.selectedFormat !== "all" &&
        trial.format !== filters.selectedFormat
      ) {
        return false;
      }

      // 5. Divergent Filter (explore outside selected categories)
      if (filters.showDivergentOnly && profile?.interests?.selectedCategoryIds) {
        const studentCategories = profile.interests.selectedCategoryIds;
        if (studentCategories.includes(trial.categoryId)) {
          return false;
        }
      }

      // 6. Search Query
      if (filters.searchQuery.trim().length > 0) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = trial.title.toLowerCase().includes(q);
        const matchesSubtitle = trial.subtitle.toLowerCase().includes(q);
        const matchesObjective = trial.learningObjective.toLowerCase().includes(q);
        const matchesTags = trial.tags.some((t) => t.toLowerCase().includes(q));
        const matchesCompetency = trial.competencyPractised.toLowerCase().includes(q);

        if (!matchesTitle && !matchesSubtitle && !matchesObjective && !matchesTags && !matchesCompetency) {
          return false;
        }
      }

      return true;
    });
  }, [filters, profile]);

  // Handlers
  const handleStartTrial = useCallback(
    (trial: TrialActivity) => {
      if (profile?.academicStageId === "classes-4-7" && !trial.stageSuitability.includes("classes-4-7")) {
        return; // Child safety gate
      }
      activityEvidenceStore.startTrial(trial);
      setActiveTrial(trial);
    },
    [profile]
  );

  const handleSaveProgress = useCallback(
    (trialId: string, updates: { selectedOptionIds?: string[]; submittedWorkText?: string }) => {
      activityEvidenceStore.saveProgress(trialId, updates);
    },
    []
  );

  const handleFinishTrialContent = useCallback(
    (
      trial: TrialActivity,
      interaction?: {
        workNotes: string;
        selectedOptionIds: string[];
        hasParticipated: boolean;
      }
    ) => {
      if (interaction) {
        setPendingTrialWork(interaction);
        activityEvidenceStore.saveProgress(trial.id, {
          submittedWorkText: interaction.workNotes,
          selectedOptionIds: interaction.selectedOptionIds,
        });
      }
      setActiveTrial(null);
      setActiveReflectionTrial(trial);
    },
    []
  );

  const handleSubmitReflection = useCallback(
    (trial: TrialActivity, reflection: TrialReflection) => {
      const record = activityEvidenceStore.completeTrial(
        trial.id,
        reflection,
        pendingTrialWork?.workNotes
      );
      const summary = feedbackGenerator.generateSummary(
        trial,
        reflection,
        record.evidenceStatus
      );
      setPendingTrialWork(null);
      setActiveReflectionTrial(null);
      setActiveFeedback(summary);
    },
    [pendingTrialWork]
  );

  const handleSkipTrial = useCallback((trial: TrialActivity) => {
    activityEvidenceStore.skipTrial(trial.id);
    setActiveTrial(null);
  }, []);

  const handleRetryTrial = useCallback((trial: TrialActivity) => {
    activityEvidenceStore.retryTrial(trial.id);
    setActiveTrial(trial);
  }, []);

  const handleCloseFeedback = useCallback(() => {
    setActiveFeedback(null);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({
      searchQuery: "",
      selectedCategory: "all",
      selectedStage: profile ? profile.academicStageId : "all",
      selectedFormat: "all",
      showDivergentOnly: false,
    });
  }, [profile]);

  return {
    profile,
    isAnonymous,
    studentStageId,
    activeTab,
    setActiveTab,
    filters,
    setFilters,
    filteredTrials,
    totalCatalogCount: TRIAL_CATALOG.length,
    activeTrial: effectiveActiveTrial,
    setActiveTrial,
    activeReflectionTrial,
    setActiveReflectionTrial,
    activeFeedback,
    attempts,
    completedCount: activityEvidenceStore.getCompletedCount(),
    practisedCompetencies: activityEvidenceStore.getPractisedCompetencies(),
    // Handlers
    handleStartTrial,
    handleSaveProgress,
    handleFinishTrialContent,
    handleSubmitReflection,
    handleSkipTrial,
    handleRetryTrial,
    handleCloseFeedback,
    handleResetFilters,
  };
}
