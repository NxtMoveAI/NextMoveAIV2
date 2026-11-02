/**
 * NEXT MOVE AI V2 — EXPLORE POSSIBILITIES MAIN WORKSPACE
 * 
 * Complete interactive discovery environment for Flow 5.
 * Answers: "What could I explore next?"
 * Bridges Flow 4 Student Home to Flow 6 Validate Fit and Flow 7 Build My Next Move.
 */

"use client";

import React from "react";
import { AlertCircle, RotateCcw, Compass } from "lucide-react";
import { useExploreWorkspace } from "../hooks/useExploreWorkspace";
import { PersonaSwitcherExploreBar } from "./PersonaSwitcherExploreBar";
import { ExploreHeaderBanner } from "./ExploreHeaderBanner";
import { StageDiscoveryPrompt } from "./StageDiscoveryPrompt";
import { ExploreFilterBar } from "./ExploreFilterBar";
import { PathwayCard } from "./PathwayCard";
import { PathwayDetailModal } from "./PathwayDetailModal";
import { PathwayComparisonDrawer } from "./PathwayComparisonDrawer";
import { SavedPathwaysModal } from "./SavedPathwaysModal";
import { WhyRecommendationModal } from "./WhyRecommendationModal";

export function ExploreWorkspace() {
  const {
    profile,
    isAnonymous,
    filters,
    filteredPathways,
    totalCatalogCount,
    savedIds,
    savedPathways,
    comparisonIds,
    comparisonPathways,
    activeDetailPathway,
    activeProvenancePathway,
    isComparisonOpen,
    isSavedDrawerOpen,
    comparisonToast,
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
    setActiveDetailPathway,
    setActiveProvenancePathway,
    setIsComparisonOpen,
    setIsSavedDrawerOpen,
    getProvenance,
  } = useExploreWorkspace();

  return (
    <div data-testid="explore-workspace" className="space-y-6">
      {/* Dev Persona Switcher (Hidden in production and anonymous sessions) */}
      <PersonaSwitcherExploreBar />

      {/* Header Banner */}
      <ExploreHeaderBanner
        profile={profile}
        isAnonymous={isAnonymous}
        savedCount={savedIds.length}
        comparisonCount={comparisonIds.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenComparison={() => setIsComparisonOpen(true)}
      />

      {/* Stage-Adaptive Discovery Prompt */}
      <StageDiscoveryPrompt stageId={profile?.academicStageId} />

      {/* Comparison Toast Alert */}
      {comparisonToast && (
        <div
          role="alert"
          className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex items-center gap-2 shadow-xs animate-in slide-in-from-top-2 duration-200"
        >
          <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0" />
          <span className="font-semibold">{comparisonToast}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <ExploreFilterBar
        filters={filters}
        studentStageId={profile?.academicStageId}
        totalFiltered={filteredPathways.length}
        totalCatalog={totalCatalogCount}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onStageChange={handleStageChange}
        onTypeChange={handleTypeChange}
        onToggleDivergent={handleToggleDivergent}
        onResetFilters={handleResetFilters}
      />

      {/* Pathway Grid */}
      <section aria-label="Available Pathways" className="space-y-4">
        {filteredPathways.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E8E6F3] text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6] text-[#8C93AD] flex items-center justify-center mx-auto">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-[#171A2B]">
              No possibilities match your current filter combination
            </h2>
            <p className="text-xs text-[#626987] max-w-sm mx-auto">
              Try resetting your search query or interest categories to view all available pathways.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold transition-all shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredPathways.map((pathway) => (
              <PathwayCard
                key={pathway.id}
                pathway={pathway}
                isSaved={savedIds.includes(pathway.id)}
                isComparing={comparisonIds.includes(pathway.id)}
                onToggleSave={toggleSavePathway}
                onToggleCompare={toggleComparePathway}
                onOpenDetail={(p) => setActiveDetailPathway(p)}
                onOpenProvenance={(p) => setActiveProvenancePathway(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Pathway Detail Modal */}
      <PathwayDetailModal
        pathway={activeDetailPathway}
        isSaved={activeDetailPathway ? savedIds.includes(activeDetailPathway.id) : false}
        isComparing={
          activeDetailPathway
            ? comparisonIds.includes(activeDetailPathway.id)
            : false
        }
        onClose={() => setActiveDetailPathway(null)}
        onToggleSave={toggleSavePathway}
        onToggleCompare={toggleComparePathway}
        onSelectAlternative={(altId) => {
          const target = filteredPathways.find((p) => p.id === altId);
          if (target) {
            setActiveDetailPathway(target);
          }
        }}
      />

      {/* Side-by-Side Comparison Drawer */}
      <PathwayComparisonDrawer
        isOpen={isComparisonOpen}
        pathways={comparisonPathways}
        onClose={() => setIsComparisonOpen(false)}
        onRemove={removeFromComparison}
        onClearAll={clearComparison}
        onOpenDetail={(p) => {
          setIsComparisonOpen(false);
          setActiveDetailPathway(p);
        }}
      />

      {/* Saved Pathways Drawer */}
      <SavedPathwaysModal
        isOpen={isSavedDrawerOpen}
        savedPathways={savedPathways}
        onClose={() => setIsSavedDrawerOpen(false)}
        onRemove={toggleSavePathway}
        onOpenDetail={(p) => {
          setIsSavedDrawerOpen(false);
          setActiveDetailPathway(p);
        }}
      />

      {/* Provenance Transparency Modal */}
      <WhyRecommendationModal
        pathway={activeProvenancePathway}
        provenance={
          activeProvenancePathway ? getProvenance(activeProvenancePathway) : null
        }
        onClose={() => setActiveProvenancePathway(null)}
      />
    </div>
  );
}

