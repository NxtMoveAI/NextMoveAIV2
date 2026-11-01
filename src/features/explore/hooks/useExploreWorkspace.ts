/**
 * NEXT MOVE AI V2 — EXPLORE WORKSPACE HOOK
 * 
 * Central state orchestration hook for Flow 5:
 * - Profile continuity with studentProfileStore
 * - Reactive synchronization with savedPathwaysStore
 * - Dynamic filtering, searching, and stage adaptation
 * - Modal and drawer state management
 */

"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { studentProfileStore } from "@/features/student-home/services/profile-store";
import { type StudentIntelligenceProfile } from "@/features/onboarding/schemas/types";
import { type AcademicStageId } from "@/data/landing-demo";
import { exploreService } from "../services/explore-service";
import { savedPathwaysStore } from "../services/saved-store";
import {
  type Pathway,
  type PathwayType,
  type ExploreFilters,
  type PathwayProvenance,
} from "../types";

export function useExploreWorkspace() {
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

  // 2. Saved and Comparison IDs
  const [savedIds, setSavedIds] = useState<string[]>(() => savedPathwaysStore.getSavedIds());
  const [comparisonIds, setComparisonIds] = useState<string[]>(() =>
    savedPathwaysStore.getComparisonIds()
  );

  // 3. Filter State
  const defaultStage = profile ? profile.academicStageId : "all";
  const [filters, setFilters] = useState<ExploreFilters>({
    searchQuery: "",
    selectedCategory: "all",
    selectedStage: defaultStage,
    selectedType: "all",
    showDivergentOnly: false,
  });

  // 4. Modal and Drawer States
  const [activeDetailPathway, setActiveDetailPathway] = useState<Pathway | null>(() => {
    const focusId = searchParams.get("focus");
    if (focusId) {
      const p = exploreService.getPathwayById(focusId);
      if (p) {
        // Child safety: block higher-stage pathway if student is in classes-4-7
        const currentStage = profile?.academicStageId;
        if (currentStage === "classes-4-7" && !p.stageSuitability.includes("classes-4-7")) {
          return null;
        }
        return p;
      }
    }
    return null;
  });
  const [activeProvenancePathway, setActiveProvenancePathway] = useState<Pathway | null>(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [comparisonToast, setComparisonToast] = useState<string | null>(null);

  // Synchronize profile scope on mount
  useEffect(() => {
    const scope = profile ? profile.profileId || profile.academicStageId : "anonymous";
    savedPathwaysStore.setProfileScope(scope, profile?.academicStageId);
  }, [profile]);

  // Synchronize with studentProfileStore
  useEffect(() => {
    const unsubscribeProfile = studentProfileStore.subscribe(() => {
      const nextProfile = studentProfileStore.isAnonymousMode()
        ? studentProfileStore.getConfirmedProfile()
        : studentProfileStore.getConfirmedProfile() ||
          studentProfileStore.getActiveProfile();
      setProfile(nextProfile);

      // Isolate saved pathways & comparisons per profile/persona to prevent data leakage
      const nextScope = nextProfile ? nextProfile.profileId || nextProfile.academicStageId : "anonymous";
      savedPathwaysStore.setProfileScope(nextScope, nextProfile?.academicStageId);

      if (nextProfile) {
        setFilters((prev) => ({
          ...prev,
          selectedStage: nextProfile.academicStageId,
          selectedCategory: "all",
          selectedType: "all",
          showDivergentOnly: false,
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          selectedStage: "all",
          selectedCategory: "all",
          selectedType: "all",
          showDivergentOnly: false,
        }));
      }
    });

    const unsubscribeSaved = savedPathwaysStore.subscribe(() => {
      setSavedIds(savedPathwaysStore.getSavedIds());
      setComparisonIds(savedPathwaysStore.getComparisonIds());
    });

    return () => {
      unsubscribeProfile();
      unsubscribeSaved();
    };
  }, []);

  // Derived categorized pathways
  const { primaryPathways, divergentPathways, undecidedPathways } = useMemo(() => {
    return exploreService.getPathwaysForProfile(isAnonymous ? null : profile);
  }, [profile, isAnonymous]);

  // Active pathways before general filtering
  const basePool = useMemo(() => {
    // Classes 4-7 Child Safety Gate: Middle school students can NEVER access adult career content
    if (profile?.academicStageId === "classes-4-7") {
      if (filters.showDivergentOnly) {
        return divergentPathways.length > 0 ? divergentPathways : primaryPathways;
      }
      return primaryPathways;
    }

    if (filters.showDivergentOnly) {
      return divergentPathways.length > 0
        ? divergentPathways
        : exploreService.getAllPathways();
    }
    // If user explicitly picked a stage different from their profile stage, open the catalog for that stage
    if (
      profile &&
      filters.selectedStage !== "all" &&
      filters.selectedStage !== profile.academicStageId
    ) {
      return exploreService.getAllPathways();
    }
    return primaryPathways;
  }, [
    filters.showDivergentOnly,
    divergentPathways,
    primaryPathways,
    profile,
    filters.selectedStage,
  ]);

  // Final filtered list
  const filteredPathways = useMemo(() => {
    return exploreService.filterPathways(basePool, filters);
  }, [basePool, filters]);

  // Full objects for comparison tray
  const comparisonPathways = useMemo(() => {
    return comparisonIds
      .map((id) => exploreService.getPathwayById(id))
      .filter((p): p is Pathway => Boolean(p));
  }, [comparisonIds]);

  // Full objects for saved pathways
  const savedPathways = useMemo(() => {
    return savedIds
      .map((id) => exploreService.getPathwayById(id))
      .filter((p): p is Pathway => Boolean(p));
  }, [savedIds]);

  // Actions
  const handleSearchChange = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedCategory: category,
      showDivergentOnly: false,
    }));
  }, []);

  const handleStageChange = useCallback((stage: AcademicStageId | "all") => {
    // Child safety gate: Classes 4-7 students cannot switch stage to adult levels
    if (profile?.academicStageId === "classes-4-7") {
      return;
    }
    setFilters((prev) => ({ ...prev, selectedStage: stage }));
  }, [profile]);

  const handleSetActiveDetailPathway = useCallback((pathway: Pathway | null) => {
    if (pathway && profile?.academicStageId === "classes-4-7") {
      if (!pathway.stageSuitability.includes("classes-4-7")) {
        return; // Child safety gate
      }
    }
    setActiveDetailPathway(pathway);
  }, [profile]);

  const handleTypeChange = useCallback((type: PathwayType | "all") => {
    setFilters((prev) => ({ ...prev, selectedType: type }));
  }, []);

  const handleToggleDivergent = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      showDivergentOnly: !prev.showDivergentOnly,
      selectedCategory: "all",
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({
      searchQuery: "",
      selectedCategory: "all",
      selectedStage: profile ? profile.academicStageId : "all",
      selectedType: "all",
      showDivergentOnly: false,
    });
  }, [profile]);

  const toggleSavePathway = useCallback((pathwayId: string) => {
    savedPathwaysStore.toggleSaved(pathwayId);
  }, []);

  const toggleComparePathway = useCallback((pathwayId: string) => {
    const res = savedPathwaysStore.toggleComparison(pathwayId);
    if (!res.success && res.reason) {
      setComparisonToast(res.reason);
      setTimeout(() => setComparisonToast(null), 4000);
    }
  }, []);

  const removeFromComparison = useCallback((pathwayId: string) => {
    savedPathwaysStore.removeFromComparison(pathwayId);
  }, []);

  const clearComparison = useCallback(() => {
    savedPathwaysStore.clearComparison();
  }, []);

  const getProvenance = useCallback(
    (pathway: Pathway): PathwayProvenance => {
      return exploreService.getProvenanceForPathway(
        pathway,
        isAnonymous ? null : profile
      );
    },
    [profile, isAnonymous]
  );

  return {
    profile,
    isAnonymous,
    filters,
    filteredPathways,
    totalCatalogCount: exploreService.getAllPathways().length,
    savedIds,
    savedPathways,
    comparisonIds,
    comparisonPathways,
    activeDetailPathway,
    activeProvenancePathway,
    isComparisonOpen,
    isSavedDrawerOpen,
    comparisonToast,
    undecidedPathways,
    // Handlers
    handleSearchChange,
    handleCategoryChange,
    handleStageChange,
    handleTypeChange,
    handleToggleDivergent,
    handleResetFilters,
    toggleSavePathway,
    toggleComparePathway,
    removeFromComparison,
    clearComparison,
    setActiveDetailPathway: handleSetActiveDetailPathway,
    setActiveProvenancePathway,
    setIsComparisonOpen,
    setIsSavedDrawerOpen,
    getProvenance,
  };
}
