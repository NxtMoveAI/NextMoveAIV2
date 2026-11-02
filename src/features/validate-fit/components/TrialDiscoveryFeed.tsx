/**
 * NEXT MOVE AI V2 — TRIAL DISCOVERY FEED
 * 
 * Interactive discovery feed for experiential learning challenges.
 * Includes category pills, format filters, search bar, and divergent exploration.
 */

"use client";

import React from "react";
import { Search, Sparkles, Filter, RotateCcw, Compass } from "lucide-react";
import { type AcademicStageId } from "@/data/landing-demo";
import { type TrialActivity, type TrialFormat, type FitFilters, type TrialAttemptRecord } from "../types";
import { TrialCard } from "./TrialCard";

interface TrialDiscoveryFeedProps {
  trials: TrialActivity[];
  attempts: TrialAttemptRecord[];
  filters: FitFilters;
  studentStageId?: AcademicStageId;
  totalCatalog: number;
  onFilterChange: (updates: Partial<FitFilters>) => void;
  onResetFilters: () => void;
  onStartTrial: (trial: TrialActivity) => void;
  onRetryTrial: (trial: TrialActivity) => void;
}

const CATEGORIES = [
  { id: "all", label: "All Topics" },
  { id: "technology", label: "Technology" },
  { id: "creativity", label: "Creativity & Design" },
  { id: "science_discovery", label: "Science & Discovery" },
  { id: "business_entrepreneurship", label: "Business & Commerce" },
  { id: "social_impact", label: "Social Impact & Policy" },
  { id: "analysis_problem_solving", label: "Logic & Analysis" },
];

const FORMATS: { id: TrialFormat | "all"; label: string }[] = [
  { id: "all", label: "All Formats" },
  { id: "creative_prompt", label: "Creative Prompts" },
  { id: "scenario_tradeoff", label: "Strategic Tradeoffs" },
  { id: "logic_simulation", label: "Code & Logic" },
  { id: "applied_troubleshoot", label: "Applied Diagnostics" },
  { id: "case_critique", label: "Case Analyses" },
];

export function TrialDiscoveryFeed({
  trials,
  attempts,
  filters,
  studentStageId,
  totalCatalog,
  onFilterChange,
  onResetFilters,
  onStartTrial,
  onRetryTrial,
}: TrialDiscoveryFeedProps) {
  const isMiddleSchool = studentStageId === "classes-4-7";

  const visibleFormats = isMiddleSchool
    ? [{ id: "creative_prompt" as const, label: "Curiosity Prompts" }]
    : FORMATS;

  const hasActiveFilters =
    filters.searchQuery.trim().length > 0 ||
    filters.selectedCategory !== "all" ||
    filters.selectedFormat !== "all" ||
    filters.showDivergentOnly;

  return (
    <div className="space-y-6">
      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-4">
        {/* Search & Divergent Curiosity Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8C93AD] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Search practical challenges by skill, scenario, or keyword..."
              aria-label="Search trials"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] text-xs text-[#171A2B] placeholder:text-[#8C93AD] focus:outline-none focus:ring-2 focus:ring-[#6757F5] transition-all"
            />
          </div>

          {/* Divergent curiosity toggle */}
          <button
            type="button"
            onClick={() => onFilterChange({ showDivergentOnly: !filters.showDivergentOnly })}
            className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
              filters.showDivergentOnly
                ? "bg-[#6757F5] text-white shadow-xs"
                : "bg-[#F7F6FF] text-[#6757F5] border border-[#DDD8FE] hover:bg-[#EDEAFF]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explore outside your interests</span>
          </button>

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

        {/* Category Chips */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#626987]">
            <span>Filter by Domain:</span>
            <span>
              Showing <strong className="text-[#171A2B]">{trials.length}</strong> of {totalCatalog} trials
            </span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {CATEGORIES.map((cat) => {
              const isActive = filters.selectedCategory === cat.id && !filters.showDivergentOnly;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onFilterChange({ selectedCategory: cat.id, showDivergentOnly: false })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all focus:outline-none ${
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

        {/* Format Selector Row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F0EEF8] text-xs">
          <span className="text-[#626987] font-semibold text-[11px] flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Experience Format:</span>
          </span>
          <div className="flex flex-wrap items-center gap-1">
            {visibleFormats.map((fmt) => {
              const isSelected = filters.selectedFormat === fmt.id;
              return (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => onFilterChange({ selectedFormat: fmt.id })}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    isSelected
                      ? "bg-[#171A2B] text-white"
                      : "bg-[#FAF9F6] text-[#626987] hover:bg-[#F4F3F8] hover:text-[#171A2B]"
                  }`}
                >
                  {fmt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trial Cards Grid */}
      {trials.length === 0 ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E8E6F3] text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F4F3F8] text-[#8C93AD] flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#171A2B]">No trial activities match your filter</h3>
          <p className="text-xs text-[#626987] max-w-sm mx-auto">
            Try resetting your search query or exploring outside your primary interests to discover new fields.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="px-4 py-2 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5342E8] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trials.map((trial) => {
            const attempt = attempts.find((a) => a.trialId === trial.id);
            return (
              <TrialCard
                key={trial.id}
                trial={trial}
                attempt={attempt}
                onStart={onStartTrial}
                onRetry={onRetryTrial}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

