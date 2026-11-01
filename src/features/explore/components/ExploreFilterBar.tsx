/**
 * NEXT MOVE AI V2 — EXPLORE FILTER BAR
 * 
 * Interactive controls for topic search, category filtering,
 * stage adaptation, pathway type selection, and divergent curiosity ("Explore something different").
 */

"use client";

import React from "react";
import { Search, X, Sparkles, Filter, RotateCcw } from "lucide-react";
import { type AcademicStageId } from "@/data/landing-demo";
import { type PathwayType, type ExploreFilters } from "../types";

interface ExploreFilterBarProps {
  filters: ExploreFilters;
  studentStageId?: AcademicStageId;
  totalFiltered: number;
  totalCatalog: number;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onStageChange: (stage: AcademicStageId | "all") => void;
  onTypeChange: (type: PathwayType | "all") => void;
  onToggleDivergent: () => void;
  onResetFilters: () => void;
}

const CATEGORIES = [
  { id: "all", label: "All Interests" },
  { id: "technology", label: "Technology & Software" },
  { id: "creativity", label: "Creativity & Media" },
  { id: "science_discovery", label: "Science & Discovery" },
  { id: "business_entrepreneurship", label: "Business & Ventures" },
  { id: "social_impact", label: "Social Impact & People" },
  { id: "analysis_problem_solving", label: "Analysis & Logic" },
];

const STAGES: { id: AcademicStageId | "all"; label: string }[] = [
  { id: "all", label: "All Stages" },
  { id: "classes-4-7", label: "Classes 4–7" },
  { id: "classes-8-10", label: "Classes 8–10" },
  { id: "classes-11-12", label: "Classes 11–12" },
  { id: "diploma", label: "Diploma" },
  { id: "degree-engineering", label: "Degree / Eng" },
  { id: "final-year-grad", label: "Final-Year / Grad" },
];

const PATHWAY_TYPES: { id: PathwayType | "all"; label: string }[] = [
  { id: "all", label: "All Types" },
  { id: "traditional_degree", label: "Traditional" },
  { id: "emerging_frontier", label: "Emerging Frontier" },
  { id: "practical_lateral", label: "Practical / Lateral" },
  { id: "curiosity_theme", label: "Curiosity Themes" },
  { id: "exploratory_general", label: "Broad Exploratory" },
];

export function ExploreFilterBar({
  filters,
  studentStageId,
  totalFiltered,
  totalCatalog,
  onSearchChange,
  onCategoryChange,
  onStageChange,
  onTypeChange,
  onToggleDivergent,
  onResetFilters,
}: ExploreFilterBarProps) {
  const hasActiveFilters =
    filters.searchQuery.trim().length > 0 ||
    filters.selectedCategory !== "all" ||
    filters.selectedType !== "all" ||
    filters.showDivergentOnly ||
    (studentStageId && filters.selectedStage !== studentStageId);

  return (
    <div
      aria-label="Filter and Search Pathways"
      className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-4"
    >
      {/* Search Input & Divergent Curiosity Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8C93AD] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            id="explore-search-input"
            value={filters.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search pathways, skills, subjects, or keywords..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] text-xs sm:text-sm text-[#171A2B] placeholder:text-[#8C93AD] focus:outline-none focus:border-[#6757F5] focus:bg-white focus:ring-2 focus:ring-[#EDEAFF] transition-all"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search query"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8C93AD] hover:text-[#171A2B] rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Explore something different button */}
        <button
          type="button"
          onClick={onToggleDivergent}
          aria-pressed={filters.showDivergentOnly}
          className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
            filters.showDivergentOnly
              ? "bg-[#9333EA] text-white shadow-xs"
              : "bg-[#F5EEFE] text-[#9333EA] hover:bg-[#E4D4F9]"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Explore something different</span>
        </button>

        {/* Reset button if filters active */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            aria-label="Reset all filters"
            className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#626987] hover:text-[#171A2B] hover:bg-[#F4F3F8] transition-colors shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Pills (Horizontal Scroll on Mobile) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-bold text-[#626987]">
          <span>Filter by Interest Domain:</span>
          <span>
            Showing <strong className="text-[#171A2B]">{totalFiltered}</strong> of {totalCatalog} possibilities
          </span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {CATEGORIES.map((cat) => {
            const isActive = filters.selectedCategory === cat.id && !filters.showDivergentOnly;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryChange(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                  isActive
                    ? "bg-[#6757F5] text-white shadow-xs"
                    : "bg-[#F4F3F8] text-[#474D66] hover:bg-[#EDEAFF] hover:text-[#6757F5]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Row: Academic Stage & Pathway Type */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F0EEF8] text-xs">
        {/* Academic Stage Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[#626987] font-semibold flex items-center gap-1 text-[11px]">
            <Filter className="w-3 h-3" />
            <span>Academic Stage:</span>
          </span>
          <div className="flex flex-wrap items-center gap-1">
            {STAGES.map((stg) => {
              const isSelected = filters.selectedStage === stg.id;
              return (
                <button
                  key={stg.id}
                  type="button"
                  onClick={() => onStageChange(stg.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                    isSelected
                      ? "bg-[#171A2B] text-white"
                      : "bg-[#FAF9F6] text-[#626987] hover:bg-[#F4F3F8] hover:text-[#171A2B]"
                  }`}
                >
                  {stg.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pathway Type Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[#626987] font-semibold text-[11px]">Type:</span>
          <div className="flex flex-wrap items-center gap-1">
            {PATHWAY_TYPES.map((pt) => {
              const isSelected = filters.selectedType === pt.id;
              return (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => onTypeChange(pt.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                    isSelected
                      ? "bg-[#6757F5] text-white"
                      : "bg-[#FAF9F6] text-[#626987] hover:bg-[#F4F3F8] hover:text-[#171A2B]"
                  }`}
                >
                  {pt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

