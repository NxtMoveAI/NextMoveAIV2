/**
 * NEXT MOVE AI V2 — FLOW 4: USE STUDENT HOME HOOK
 * 
 * Manages reactive home dashboard state, Firebase Auth & Firestore profile integration,
 * academic stage locking, persona switching (development only), and intelligent UI interactions.
 */

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { studentProfileStore } from "../services/profile-store";
import { transformProfileToHomeViewModel } from "../services/home-adapter";
import { type StudentHomeViewModel, type PersonaFixtureId } from "../schemas/types";
import { DEMO_PERSONAS } from "../data/demo-personas";
import { isValidStageId, isValidSituation } from "@/data/flow2-config";
import { onAuthStateChange, getCurrentAuthUser, signOutUser, type AuthUser } from "@/lib/auth-service";
import {
  type UserProfile,
  type UserStartingPoint,
  type StudentNextMoveActivity,
  type ActivitySubmission,
} from "@/lib/firestore-service";

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
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // 1. Subscribe to Firebase Auth state changes
  useEffect(() => {
    // Immediate initial sync
    const initialUser = getCurrentAuthUser();
    if (initialUser) {
      studentProfileStore.setAuthUser(initialUser);
    }

    const unsubscribe = onAuthStateChange((user) => {
      studentProfileStore.setAuthUser(user);
    });

    return unsubscribe;
  }, []);

  // 2. Re-render when profile store changes
  useEffect(() => {
    const unsubscribe = studentProfileStore.subscribe(() => {
      setTick((t) => t + 1);
    });
    return unsubscribe;
  }, []);

  // 3. Align initial demo persona with incoming query parameters ONLY for unauthenticated demo visits
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      // CRITICAL SAFEGUARD: Authenticated user OR confirmed session profile MUST NEVER be mutated by URL params
      if (
        studentProfileStore.isRealAuthenticatedUser() ||
        studentProfileStore.hasRealHandoff()
      ) {
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

  const authUser: AuthUser | null = studentProfileStore.getAuthUser();
  const userProfile: UserProfile | null = studentProfileStore.getUserProfile();
  const isRealAuthenticatedUser: boolean = studentProfileStore.isRealAuthenticatedUser();

  const activePersonaId = studentProfileStore.getActivePersonaId();
  const hasRealHandoff = studentProfileStore.hasRealHandoff();
  const isProductionMode = studentProfileStore.isAnonymousMode();
  const hasConfirmedProfile = hasRealHandoff || (!isProductionMode && activePersonaId !== "persona_empty");

  const profile = studentProfileStore.getActiveProfile();
  const selectedAltId = studentProfileStore.getSelectedAlternativeMove();
  const isPostponed = studentProfileStore.getIsMovePostponed();

  // Student Name: Authenticated user's real Firestore name ALWAYS takes precedence
  const studentName = useMemo(() => {
    if (isRealAuthenticatedUser && userProfile?.name) {
      return userProfile.name;
    }
    if (!hasConfirmedProfile) return undefined;
    if (hasRealHandoff) return undefined;
    if (isProductionMode) return undefined;
    return DEMO_PERSONAS[activePersonaId]?.name;
  }, [isRealAuthenticatedUser, userProfile, hasConfirmedProfile, hasRealHandoff, isProductionMode, activePersonaId]);

  const viewModel: StudentHomeViewModel = useMemo(() => {
    return transformProfileToHomeViewModel(profile, {
      studentName,
      selectedAlternativeMoveId: selectedAltId,
      isMovePostponed: isPostponed,
      isReturningUser: activePersonaId === "persona_returning_bcom",
      isDemoMode: !isRealAuthenticatedUser,
    });
  }, [profile, studentName, selectedAltId, isPostponed, activePersonaId, isRealAuthenticatedUser]);

  const isLoading = localLoading || studentProfileStore.getIsProfileLoading();
  const error = localError || studentProfileStore.getProfileError();

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
    // Authenticated users cannot switch personas
    if (studentProfileStore.isRealAuthenticatedUser()) {
      return;
    }
    setLocalLoading(true);
    setLocalError(null);
    setTimeout(() => {
      studentProfileStore.setActivePersonaId(personaId);
      setLocalLoading(false);
    }, 120);
  }, []);

  const retryLoad = useCallback(() => {
    const user = studentProfileStore.getAuthUser();
    if (user) {
      studentProfileStore.loadUserProfile(user.uid);
    } else {
      setLocalLoading(true);
      setLocalError(null);
      setTimeout(() => {
        setLocalLoading(false);
      }, 150);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await signOutUser();
    } catch (err) {
      console.error("Sign out error", err);
    }
    studentProfileStore.clearAll();
    if (typeof window !== "undefined") {
      sessionStorage.clear();
    }
  }, []);

  const startingPoint = userProfile?.startingPoint || studentProfileStore.getStartingPoint();

  const saveStartingPoint = useCallback(async (data: UserStartingPoint) => {
    return studentProfileStore.saveStartingPoint(data);
  }, []);

  const nextMoveActivity = userProfile?.nextMoveActivity || studentProfileStore.getNextMoveActivity();
  const nextMoveHistory = userProfile?.nextMoveHistory || studentProfileStore.getNextMoveHistory();

  const saveNextMoveActivity = useCallback(async (data: StudentNextMoveActivity) => {
    return studentProfileStore.saveNextMoveActivity(data);
  }, []);

  const saveActivitySubmission = useCallback(async (data: ActivitySubmission) => {
    return studentProfileStore.saveActivitySubmission(data);
  }, []);

  return {
    viewModel,
    isLoading,
    error,
    activePersonaId,
    hasRealHandoff,
    hasConfirmedProfile,
    isRealAuthenticatedUser,
    authUser,
    userProfile,
    startingPoint,
    saveStartingPoint,
    nextMoveActivity,
    nextMoveHistory,
    saveNextMoveActivity,
    saveActivitySubmission,
    selectAlternativeMove,
    restoreSuggestedMove,
    postponeMove,
    switchPersona,
    retryLoad,
    signOut,
  };
}
