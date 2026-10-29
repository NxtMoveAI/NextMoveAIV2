/**
 * NEXT MOVE AI V2 — FLOW 3 ONBOARDING STATE CONTROLLER
 * 
 * Reusable React state controller managing navigation, step validation,
 * adaptive branch progress, answer preservation, and draft submissions.
 */

"use client";

import { useState, useCallback, useMemo } from "react";
import { type AcademicStageId } from "@/data/landing-demo";
import {
  type OnboardingStepId,
  type OnboardingState,
  type AcademicContextData,
  type ClarityData,
  type FamiliarityLevel,
  type ReflectionData,
  type ActivityAttemptResult,
} from "../schemas/types";
import { createInitialOnboardingState } from "../data/questions";
import { STAGE_MICRO_ACTIVITIES } from "../data/activities";
import {
  compileStudentIntelligenceProfile,
  onboardingAdapter,
} from "../services/onboarding-adapter";

// Core adaptive sequence
const BASE_STEP_SEQUENCE: OnboardingStepId[] = [
  "welcome",
  "academic",
  "clarity",
  "interests",
  "starting-point",
  "activity-prompt",
  "activity",
  "reflection",
  "profile",
];

export function useOnboardingState(initialStageId: AcademicStageId, isDemoMode: boolean = true) {
  const [state, setState] = useState<OnboardingState>(() =>
    createInitialOnboardingState(initialStageId, isDemoMode)
  );

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);

  // Compute active sequence based on whether user skips or accepts activity
  const activeStepSequence = useMemo<OnboardingStepId[]>(() => {
    if (state.activityAttempt?.status === "skipped") {
      return BASE_STEP_SEQUENCE.filter((step) => step !== "activity");
    }
    return BASE_STEP_SEQUENCE;
  }, [state.activityAttempt?.status]);

  const currentStepIndex = activeStepSequence.indexOf(state.currentStep);
  const totalSteps = activeStepSequence.length;
  const progressPercentage = Math.round(
    ((currentStepIndex + 1) / totalSteps) * 100
  );

  // ---------------------------------------------------------------------------
  // Step Navigation
  // ---------------------------------------------------------------------------

  const goToStep = useCallback((targetStep: OnboardingStepId) => {
    setState((prev) => {
      // If navigating to profile, compile profile first
      let updatedProfile = prev.profile;
      if (targetStep === "profile") {
        updatedProfile = compileStudentIntelligenceProfile(prev);
      }
      return {
        ...prev,
        currentStep: targetStep,
        profile: updatedProfile,
        history: [...prev.history, targetStep],
      };
    });
  }, []);

  const goNext = useCallback(() => {
    setState((prev) => {
      const seq = prev.activityAttempt?.status === "skipped"
        ? BASE_STEP_SEQUENCE.filter((step) => step !== "activity")
        : BASE_STEP_SEQUENCE;

      const idx = seq.indexOf(prev.currentStep);
      if (idx < seq.length - 1) {
        const nextStep = seq[idx + 1];
        let updatedProfile = prev.profile;
        if (nextStep === "profile") {
          updatedProfile = compileStudentIntelligenceProfile(prev);
        }
        return {
          ...prev,
          currentStep: nextStep,
          profile: updatedProfile,
          history: [...prev.history, nextStep],
        };
      }
      return prev;
    });
  }, []);

  const goBack = useCallback(() => {
    setState((prev) => {
      const seq = prev.activityAttempt?.status === "skipped"
        ? BASE_STEP_SEQUENCE.filter((step) => step !== "activity")
        : BASE_STEP_SEQUENCE;

      const idx = seq.indexOf(prev.currentStep);
      if (idx > 0) {
        const prevStep = seq[idx - 1];
        return {
          ...prev,
          currentStep: prevStep,
          history: [...prev.history, prevStep],
        };
      }
      return prev;
    });
  }, []);

  // ---------------------------------------------------------------------------
  // Academic Stage Switching (With Answer Preservation)
  // ---------------------------------------------------------------------------

  const setAcademicStage = useCallback((newStageId: AcademicStageId) => {
    setState((prev) => {
      if (prev.stageId === newStageId) return prev;
      const freshInitial = createInitialOnboardingState(newStageId, prev.isDemoMode);
      return {
        ...prev,
        stageId: newStageId,
        academicContext: freshInitial.academicContext,
        startingSkills: freshInitial.startingSkills,
        activityAttempt: undefined,
        // Preserve compatible prior interests, clarity, and reflection
        interests: {
          ...prev.interests,
        },
        reflection: {
          ...prev.reflection,
        },
      };
    });
  }, []);

  // ---------------------------------------------------------------------------
  // Updaters
  // ---------------------------------------------------------------------------

  const updateAcademicContext = useCallback((context: AcademicContextData) => {
    setState((prev) => ({
      ...prev,
      academicContext: context,
    }));
  }, []);

  const updateClarity = useCallback((update: Partial<ClarityData>) => {
    setState((prev) => ({
      ...prev,
      clarity: {
        ...prev.clarity,
        ...update,
      },
    }));
  }, []);

  const toggleInterestCategory = useCallback((categoryId: string) => {
    setState((prev) => {
      const current = prev.interests.selectedCategoryIds;
      const isSelected = current.includes(categoryId);
      const nextCategories = isSelected
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId];

      return {
        ...prev,
        interests: {
          ...prev.interests,
          selectedCategoryIds: nextCategories,
          isStillExploring: categoryId === "still_exploring" ? !isSelected : prev.interests.isStillExploring,
        },
      };
    });
  }, []);

  const toggleSubInterest = useCallback((subInterestId: string) => {
    setState((prev) => {
      const current = prev.interests.selectedSubInterestIds;
      const isSelected = current.includes(subInterestId);
      const nextSub = isSelected
        ? current.filter((id) => id !== subInterestId)
        : [...current, subInterestId];

      return {
        ...prev,
        interests: {
          ...prev.interests,
          selectedSubInterestIds: nextSub,
        },
      };
    });
  }, []);

  const setCustomInterest = useCallback((text: string) => {
    setState((prev) => ({
      ...prev,
      interests: {
        ...prev.interests,
        customInterestText: text,
      },
    }));
  }, []);

  const updateSkillFamiliarity = useCallback(
    (skillId: string, familiarity: FamiliarityLevel) => {
      setState((prev) => {
        const updatedSkills = prev.startingSkills.map((sk) => {
          if (sk.id === skillId) {
            return {
              ...sk,
              familiarity,
              evidenceStatus:
                familiarity === "not_explored"
                  ? ("not_assessed" as const)
                  : ("self_reported" as const),
            };
          }
          return sk;
        });
        return {
          ...prev,
          startingSkills: updatedSkills,
        };
      });
    },
    []
  );

  // ---------------------------------------------------------------------------
  // Micro-Exploration Activity Engine
  // ---------------------------------------------------------------------------

  const acceptOptionalActivity = useCallback(() => {
    setState((prev) => ({
      ...prev,
      activityAttempt: {
        activityId: STAGE_MICRO_ACTIVITIES[prev.stageId]?.id || "act_default",
        attempted: true,
        retriesCount: 0,
        feedback: "",
        status: "in_progress",
      },
      currentStep: "activity",
    }));
  }, []);

  const skipOptionalActivity = useCallback(() => {
    setState((prev) => {
      const nextStep: OnboardingStepId = "reflection";
      return {
        ...prev,
        activityAttempt: {
          activityId: STAGE_MICRO_ACTIVITIES[prev.stageId]?.id || "act_default",
          attempted: false,
          retriesCount: 0,
          feedback: "Activity skipped by student. Marked as 'not_assessed' on intelligence profile.",
          status: "skipped",
        },
        currentStep: nextStep,
      };
    });
  }, []);

  const submitActivityChoice = useCallback((optionId: string) => {
    setState((prev) => {
      const activity = STAGE_MICRO_ACTIVITIES[prev.stageId];
      if (!activity) return prev;
      const chosenOption = activity.options.find((opt) => opt.id === optionId);
      const isCorrect = chosenOption?.isCorrect ?? false;
      const feedback = chosenOption?.feedback || "";

      const attempt: ActivityAttemptResult = {
        activityId: activity.id,
        attempted: true,
        selectedOptionId: optionId,
        isCorrect,
        retriesCount: prev.activityAttempt?.retriesCount || 0,
        feedback,
        status: "completed",
      };

      // Add practised evidence item to skills list if correct
      const updatedSkills = [...prev.startingSkills];
      const existingPractisedIndex = updatedSkills.findIndex(
        (sk) => sk.id === `act_evidence_${activity.id}`
      );
      const activitySkill = {
        id: `act_evidence_${activity.id}`,
        name: activity.demonstratedCompetency,
        category: "Practical Exploration",
        familiarity: "practised" as FamiliarityLevel,
        evidenceStatus: "practised" as const,
        userNotes: `Attempted in Stage F (${activity.title})`,
      };

      if (existingPractisedIndex >= 0) {
        updatedSkills[existingPractisedIndex] = activitySkill;
      } else {
        updatedSkills.push(activitySkill);
      }

      return {
        ...prev,
        activityAttempt: attempt,
        startingSkills: updatedSkills,
      };
    });
  }, []);

  const retryActivity = useCallback(() => {
    setState((prev) => {
      if (!prev.activityAttempt) return prev;
      return {
        ...prev,
        activityAttempt: {
          ...prev.activityAttempt,
          selectedOptionId: undefined,
          isCorrect: undefined,
          retriesCount: (prev.activityAttempt.retriesCount || 0) + 1,
          feedback: "",
          status: "in_progress",
        },
      };
    });
  }, []);

  const updateReflection = useCallback((update: Partial<ReflectionData>) => {
    setState((prev) => ({
      ...prev,
      reflection: {
        ...prev.reflection,
        ...update,
      },
    }));
  }, []);

  // ---------------------------------------------------------------------------
  // Profile Confirmation
  // ---------------------------------------------------------------------------

  const confirmStartingProfile = useCallback(async () => {
    setState((prev) => ({ ...prev, isSubmitting: true }));
    try {
      const finalProfile = compileStudentIntelligenceProfile(state);
      const res = await onboardingAdapter.submitConfirmedProfile(finalProfile);
      setIsConfirmed(true);
      setConfirmedId(res.confirmationId);
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        profile: {
          ...finalProfile,
          status: "confirmed",
        },
      }));
      return res;
    } catch {
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: "Failed to confirm profile. Please try again.",
      }));
      return null;
    }
  }, [state]);

  return {
    state,
    currentStepIndex,
    totalSteps,
    progressPercentage,
    goToStep,
    goNext,
    goBack,
    setAcademicStage,
    updateAcademicContext,
    updateClarity,
    toggleInterestCategory,
    toggleSubInterest,
    setCustomInterest,
    updateSkillFamiliarity,
    acceptOptionalActivity,
    skipOptionalActivity,
    submitActivityChoice,
    retryActivity,
    updateReflection,
    confirmStartingProfile,
    isConfirmed,
    confirmedId,
  };
}
