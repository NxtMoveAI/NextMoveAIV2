/**
 * NEXT MOVE AI V2 — FLOW 7: USE NEXT MOVE HOOK
 * 
 * Central React hook managing:
 * - Student profile synchronization & cross-student isolation
 * - Workspace tabs: Overview, Roadmaps, Projects, Experiences, Opportunities
 * - Continuous Growth Engine recommendations
 * - Interactive Project Runner & Roadmap Builder modals
 */

"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { studentProfileStore } from "@/features/student-home/services/profile-store";
import { activityEvidenceStore } from "@/features/validate-fit/services/evidence-store";
import { type StudentIntelligenceProfile } from "@/features/onboarding/schemas/types";
import { type TrialAttemptRecord } from "@/features/validate-fit/types";
import {
  type NextMoveWorkspaceTab,
  type ActiveProject,
  type StudentRoadmap,
  type StudentGrowthGoal,
  type ProjectEvidenceArtifact,
} from "../types";
import { nextMoveStore } from "../services/next-move-store";
import { continuousGrowthEngine } from "../services/growth-engine";
import { OPPORTUNITY_CATALOG } from "../data/opportunities-catalog";
import { EXPERIENCES_CATALOG } from "../data/experiences-catalog";
import { PROJECT_CATALOG } from "../data/project-catalog";

export function useNextMove() {
  const searchParams = useSearchParams();

  // 1. Profile State
  const [profile, setProfile] = useState<StudentIntelligenceProfile | null>(() =>
    studentProfileStore.isAnonymousMode()
      ? null
      : studentProfileStore.getConfirmedProfile() || studentProfileStore.getActiveProfile()
  );

  const isAnonymous = useMemo(() => {
    return studentProfileStore.isAnonymousMode() && !studentProfileStore.hasRealHandoff();
  }, []);

  const studentStageId = profile?.academicStageId;

  // 2. Tab Navigation
  const tabParam = searchParams.get("tab") as NextMoveWorkspaceTab | null;
  const initialTab: NextMoveWorkspaceTab = tabParam || "overview";
  const [activeTab, setActiveTab] = useState<NextMoveWorkspaceTab>(initialTab);

  // 3. Store State
  const [projects, setProjects] = useState<ActiveProject[]>(() => nextMoveStore.getAllProjects());
  const [roadmap, setRoadmap] = useState<StudentRoadmap | null>(() => nextMoveStore.getActiveRoadmap());
  const [goal, setGoal] = useState<StudentGrowthGoal | null>(() => nextMoveStore.getStudentGoal());
  const [trialAttempts, setTrialAttempts] = useState<TrialAttemptRecord[]>(() =>
    activityEvidenceStore.getAllAttempts()
  );

  // 4. Modals State
  const [activeProjectModal, setActiveProjectModal] = useState<ActiveProject | null>(null);
  const [isCustomProjectOpen, setIsCustomProjectOpen] = useState(false);
  const [isCustomizeRoadmapOpen, setIsCustomizeRoadmapOpen] = useState(false);

  // 5. Selected Alternative Move State
  const [selectedAlternativeId, setSelectedAlternativeId] = useState<string | null>(null);

  // 6. Filters
  const [opportunityTypeFilter, setOpportunityTypeFilter] = useState<string>("all");
  const [opportunitySearch, setOpportunitySearch] = useState<string>("");

  // Sync profile scope across stores (notifies subscribers)
  useEffect(() => {
    const scope = profile ? profile.profileId || profile.academicStageId : "anonymous";
    nextMoveStore.setProfileScope(scope, profile?.academicStageId);
    activityEvidenceStore.setProfileScope(scope, profile?.academicStageId);
  }, [profile]);

  // Synchronize profile subscriptions
  useEffect(() => {
    const unsubscribeProfile = studentProfileStore.subscribe(() => {
      const nextProfile = studentProfileStore.isAnonymousMode()
        ? studentProfileStore.getConfirmedProfile()
        : studentProfileStore.getConfirmedProfile() || studentProfileStore.getActiveProfile();
      setProfile(nextProfile);

      const nextScope = nextProfile ? nextProfile.profileId || nextProfile.academicStageId : "anonymous";
      nextMoveStore.setProfileScope(nextScope, nextProfile?.academicStageId);
    });

    const unsubscribeNextMove = nextMoveStore.subscribe(() => {
      setProjects(nextMoveStore.getAllProjects());
      setRoadmap(nextMoveStore.getActiveRoadmap());
      setGoal(nextMoveStore.getStudentGoal());
    });

    const unsubscribeEvidence = activityEvidenceStore.subscribe(() => {
      setTrialAttempts(activityEvidenceStore.getAllAttempts());
    });

    return () => {
      unsubscribeProfile();
      unsubscribeNextMove();
      unsubscribeEvidence();
    };
  }, []);

  // Compute Growth Engine Next Move Recommendation
  const { primaryRecommendation, alternatives } = useMemo(() => {
    return continuousGrowthEngine.computeNextMove({
      profile,
      activeProjects: projects,
      activeRoadmap: roadmap,
      trialAttempts,
      savedPathwayCount: profile?.possibilities?.length || 0,
      isActionPostponed: (id) => nextMoveStore.isActionPostponed(id),
    });
  }, [profile, projects, roadmap, trialAttempts]);

  const activeMove = useMemo(() => {
    if (selectedAlternativeId) {
      const found = alternatives.find((a) => a.id === selectedAlternativeId);
      if (found) {
        return {
          ...found,
          status: "alternative_selected" as const,
        };
      }
    }
    return primaryRecommendation;
  }, [selectedAlternativeId, primaryRecommendation, alternatives]);

  // Opportunities filtered by stage suitability and child safety
  const filteredOpportunities = useMemo(() => {
    return OPPORTUNITY_CATALOG.filter((opp) => {
      // Child safety gate: Middle schoolers (Classes 4-7) and High schoolers (Classes 8-10)
      // can NEVER see adult employment listings
      if (studentStageId === "classes-4-7" || studentStageId === "classes-8-10") {
        if (opp.opportunityType === "internship" || opp.opportunityType === "apprenticeship") {
          return false;
        }
      }

      // Stage suitability check
      if (studentStageId && !opp.stageSuitability.includes(studentStageId)) {
        return false;
      }

      // Type filter
      if (opportunityTypeFilter !== "all" && opp.opportunityType !== opportunityTypeFilter) {
        return false;
      }

      // Keyword search
      if (opportunitySearch.trim().length > 0) {
        const q = opportunitySearch.toLowerCase();
        const matchesTitle = opp.title.toLowerCase().includes(q);
        const matchesOrg = opp.organizationName.toLowerCase().includes(q);
        const matchesDesc = opp.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesOrg && !matchesDesc) return false;
      }

      return true;
    });
  }, [studentStageId, opportunityTypeFilter, opportunitySearch]);

  // Handlers
  const handleStartProject = useCallback((templateId: string) => {
    const newProj = nextMoveStore.startProjectFromTemplate(templateId);
    setActiveProjectModal(newProj);
    setActiveTab("projects");
  }, []);

  const handleCreateCustomProject = useCallback((params: {
    title: string;
    problemStatement: string;
    categoryLabel: string;
    steps: string[];
  }) => {
    const newProj = nextMoveStore.createCustomProject(params);
    setIsCustomProjectOpen(false);
    setActiveProjectModal(newProj);
    setActiveTab("projects");
  }, []);

  const handleToggleMilestone = useCallback((phaseId: string, milestoneId: string) => {
    nextMoveStore.toggleMilestone(phaseId, milestoneId);
  }, []);

  const handleStepUpdate = useCallback(
    (projectId: string, stepId: string, updates: { isCompleted?: boolean; workNotes?: string }) => {
      nextMoveStore.updateProjectStep(projectId, stepId, updates);
      if (activeProjectModal && activeProjectModal.id === projectId) {
        const updated = nextMoveStore.getAllProjects().find((p) => p.id === projectId);
        if (updated) setActiveProjectModal({ ...updated });
      }
    },
    [activeProjectModal]
  );

  const handleAttachArtifact = useCallback(
    (projectId: string, artifact: Omit<ProjectEvidenceArtifact, "id" | "addedAt">) => {
      nextMoveStore.attachArtifact(projectId, artifact);
      if (activeProjectModal && activeProjectModal.id === projectId) {
        const updated = nextMoveStore.getAllProjects().find((p) => p.id === projectId);
        if (updated) setActiveProjectModal({ ...updated });
      }
    },
    [activeProjectModal]
  );

  const handleCompleteProject = useCallback(
    (projectId: string, reflection: ActiveProject["reflection"]) => {
      nextMoveStore.completeProject(projectId, reflection);
      if (activeProjectModal && activeProjectModal.id === projectId) {
        const updated = nextMoveStore.getAllProjects().find((p) => p.id === projectId);
        if (updated) setActiveProjectModal({ ...updated });
      }
    },
    [activeProjectModal]
  );

  const handlePostponeMove = useCallback((actionId: string) => {
    nextMoveStore.postponeAction(actionId);
  }, []);

  return {
    profile,
    isAnonymous,
    studentStageId,
    activeTab,
    setActiveTab,
    projects,
    completedProjects: projects.filter((p) => p.status === "completed"),
    activeProjects: projects.filter((p) => p.status === "in_progress"),
    roadmap,
    goal,
    trialAttempts,
    completedTrialCount: trialAttempts.filter((a) => a.status === "completed").length,
    activeMove,
    alternatives,
    selectedAlternativeId,
    setSelectedAlternativeId,
    activeProjectModal,
    setActiveProjectModal,
    isCustomProjectOpen,
    setIsCustomProjectOpen,
    isCustomizeRoadmapOpen,
    setIsCustomizeRoadmapOpen,
    // Catalogs & filters
    projectTemplates: PROJECT_CATALOG.filter((t) =>
      studentStageId ? t.stageSuitability.includes(studentStageId) : true
    ),
    experiences: EXPERIENCES_CATALOG.filter((e) =>
      studentStageId ? e.stageSuitability.includes(studentStageId) : true
    ),
    filteredOpportunities,
    opportunityTypeFilter,
    setOpportunityTypeFilter,
    opportunitySearch,
    setOpportunitySearch,
    // Action methods
    handleStartProject,
    handleCreateCustomProject,
    handleToggleMilestone,
    handleStepUpdate,
    handleAttachArtifact,
    handleCompleteProject,
    handlePostponeMove,
    switchRoadmapTrack: (id: string) => nextMoveStore.switchRoadmapTrack(id),
    regenerateRoadmap: (focus: string) => nextMoveStore.regenerateRoadmap(focus),
    setStudentGoal: (g: Omit<StudentGrowthGoal, "id" | "createdAt">) => nextMoveStore.setStudentGoal(g),
  };
}
