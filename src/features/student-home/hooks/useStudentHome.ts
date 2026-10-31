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

export function useStudentHome() {
  const [, setTick] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Re-render when profile store changes
  useEffect(() => {
    const unsubscribe = studentProfileStore.subscribe(() => {
      setTick((t) => t + 1);
    });
    return unsubscribe;
  }, []);

  const activePersonaId = studentProfileStore.getActivePersonaId();
  const hasRealHandoff = studentProfileStore.hasRealHandoff();
  const profile = studentProfileStore.getActiveProfile();
  const selectedAltId = studentProfileStore.getSelectedAlternativeMove();
  const isPostponed = studentProfileStore.getIsMovePostponed();

  // Find persona display name if available
  const studentName = useMemo(() => {
    if (hasRealHandoff) return undefined; // neutral or read from student session
    return DEMO_PERSONAS[activePersonaId]?.name;
  }, [hasRealHandoff, activePersonaId]);

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
    selectAlternativeMove,
    restoreSuggestedMove,
    postponeMove,
    switchPersona,
    retryLoad,
  };
}
