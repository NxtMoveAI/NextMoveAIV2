/**
 * NEXT MOVE AI V2 — FLOW 4: USE STUDENT HOME HOOK
 * 
 * Manages reactive home dashboard state, persona switching, and intelligent UI interactions.
 */

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { studentProfileStore } from "../services/profile-store";
import { transformProfileToHomeViewModel } from "../services/home-adapter";
import { type StudentHomeViewModel, type PersonaFixtureId } from "../schemas/types";
import { DEMO_PERSONAS } from "../data/demo-personas";
import { isValidStageId, isValidSituation } from "@/data/flow2-config";

const STAGE_TO_PERSONA: Record<string, PersonaFixtureId> = {
  "classes-4-7": "persona_a_class6",
  "classes-8-10": "persona_b_class9",
  "classes-11-12": "persona_c_class12",
  diploma: "persona_d_diploma",
  "degree-engineering": "persona_g_engineering",
  "final-year-grad": "persona_h_grad",
};

const SITUATION_TO_PERSONA: Record<string, PersonaFixtureId> = {
  discover: "persona_g_engineering",
  begin: "persona_d_diploma",
  progress: "persona_h_grad",
};

export function useStudentHome() {
  const [, setTick] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Align initial demo persona with incoming query parameters if present and no real handoff exists
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      // CRITICAL SAFEGUARD: If a real student profile is confirmed (from Flow 3 onboarding or session),
      // URL demo parameters must NEVER overwrite or mutate it.
      if (studentProfileStore.hasRealHandoff()) {
        return;
      }

      const searchParams = new URLSearchParams(window.location.search);
      const stageParam = searchParams.get("stage");
      const situationParam = searchParams.get("situation");
      const personaParam = searchParams.get("persona");
      const contextParam = searchParams.get("context") || searchParams.get("degree");

      // 1. Explicit demo persona param (e.g. persona=persona_e_bca)
      if (personaParam && personaParam in DEMO_PERSONAS) {
        studentProfileStore.setActivePersonaId(personaParam as PersonaFixtureId);
        return;
      }

      // 2. Academic Stage param alignment
      if (isValidStageId(stageParam)) {
        // Degree vs Engineering distinction: if stage is degree-engineering and context indicates BCA / non-engineering degree
        if (stageParam === "degree-engineering" && (contextParam === "bca" || contextParam === "degree")) {
          studentProfileStore.setActivePersonaId("persona_e_bca");
        } else if (stageParam === "degree-engineering" && contextParam === "engineering") {
          studentProfileStore.setActivePersonaId("persona_g_engineering");
        } else {
          const target = STAGE_TO_PERSONA[stageParam];
          if (target && studentProfileStore.getActivePersonaId() !== target) {
            studentProfileStore.setActivePersonaId(target);
          }
        }
        return;
      }

      // 3. Academic Context param alignment (standalone context query)
      if (contextParam === "bca" || contextParam === "degree") {
        studentProfileStore.setActivePersonaId("persona_e_bca");
        return;
      }
      if (contextParam === "engineering") {
        studentProfileStore.setActivePersonaId("persona_g_engineering");
        return;
      }

      // 4. Learning Situation param alignment
      if (isValidSituation(situationParam)) {
        const target = SITUATION_TO_PERSONA[situationParam];
        if (target && studentProfileStore.getActivePersonaId() !== target) {
          studentProfileStore.setActivePersonaId(target);
        }
      }
    } catch {
      // Safe fallback on URL parsing
    }
  }, []);

  // Re-render when profile store changes
  useEffect(() => {
    const unsubscribe = studentProfileStore.subscribe(() => {
      setTick((t) => t + 1);
    });
    return unsubscribe;
  }, []);

  const activePersonaId = studentProfileStore.getActivePersonaId();
  const hasRealHandoff = studentProfileStore.hasRealHandoff();
  const isProductionMode = studentProfileStore.isAnonymousMode();
  const hasConfirmedProfile = hasRealHandoff || (!isProductionMode && activePersonaId !== "persona_empty");

  const profile = studentProfileStore.getActiveProfile();
  const selectedAltId = studentProfileStore.getSelectedAlternativeMove();
  const isPostponed = studentProfileStore.getIsMovePostponed();

  // Find persona display name if available - never invent identity in production or when unconfirmed
  const studentName = useMemo(() => {
    if (!hasConfirmedProfile) return undefined;
    if (hasRealHandoff) return undefined; // neutral or read from student session
    if (isProductionMode) return undefined;
    return DEMO_PERSONAS[activePersonaId]?.name;
  }, [hasConfirmedProfile, hasRealHandoff, isProductionMode, activePersonaId]);

  const viewModel: StudentHomeViewModel = useMemo(() => {
    return transformProfileToHomeViewModel(profile, {
      studentName,
      selectedAlternativeMoveId: selectedAltId,
      isMovePostponed: isPostponed,
      isReturningUser: activePersonaId === "persona_returning_bcom",
    });
  }, [profile, studentName, selectedAltId, isPostponed, activePersonaId]);

  // Actions
  const selectAlternativeMove = useCallback((moveId: string) => {
    studentProfileStore.setSelectedAlternativeMove(moveId);
  }, []);

  const restoreSuggestedMove = useCallback(() => {
    studentProfileStore.setSelectedAlternativeMove(null);
    studentProfileStore.setMovePostponed(false);
  }, []);

  const postponeMove = useCallback(() => {
    studentProfileStore.setMovePostponed(true);
  }, []);

  const switchPersona = useCallback((personaId: PersonaFixtureId) => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      studentProfileStore.setActivePersonaId(personaId);
      setIsLoading(false);
    }, 120);
  }, []);

  const retryLoad = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 150);
  }, []);

  return {
    viewModel,
    isLoading,
    error,
    activePersonaId,
    hasRealHandoff,
    hasConfirmedProfile,
    selectAlternativeMove,
    restoreSuggestedMove,
    postponeMove,
    switchPersona,
    retryLoad,
  };
}

