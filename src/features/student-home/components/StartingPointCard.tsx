/**
 * NEXT MOVE AI V2 — MY STARTING POINT CARD
 * 
 * Intelligent profile-summary card answering:
 * 1. "Where am I right now?"
 * 2. "What have I told Next Move AI?"
 * Progressive disclosure, canonical interest badges, and edit handoff.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Edit3,
} from "lucide-react";
import { type StudentHomeViewModel } from "../schemas/types";
import { INTEREST_CATEGORIES } from "@/features/onboarding/data/interests";

interface StartingPointCardProps {
  viewModel: StudentHomeViewModel;
}

export function StartingPointCard({ viewModel }: StartingPointCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Map selected category IDs to display objects
  const selectedCategories = INTEREST_CATEGORIES.filter((cat) =>
    viewModel.interests.selectedCategoryIds.includes(cat.id)
  );

  return (
    <div
      id="starting-point"
      className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-5"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E6F3] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight">
              My Starting Point
            </h2>
            <p className="text-xs text-[#626987]">
              Your confirmed baseline from onboarding
            </p>
          </div>
        </div>

        <Link
          href={`/onboarding?stage=${viewModel.academicStageId}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] hover:text-[#5342E8] transition-colors self-start sm:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Answers</span>
        </Link>
      </div>

      {/* Grid: Context + Interests + Goal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Col 1: Current Education Context */}
        <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE]/60 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
            Where You Stand
          </span>
          <p className="text-xs sm:text-sm font-bold text-[#171A2B] leading-snug">
            {viewModel.academicSummary}
          </p>
          <p className="text-[11px] text-[#626987]">
            Stage: {viewModel.academicStageLabel}
          </p>
        </div>

        {/* Col 2: Primary Goal & Clarity */}
        <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE]/60 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
            Primary Focus
          </span>
          <p className="text-xs sm:text-sm font-bold text-[#171A2B] leading-snug truncate">
            {viewModel.primaryGoal}
          </p>
          <p className="text-[11px] text-[#059669] font-semibold">
            Status: {viewModel.clarityLevelLabel}
          </p>
        </div>

        {/* Col 3: Exploration Interests */}
        <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE]/60 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
            Active Interests
          </span>
          <div className="flex flex-wrap gap-1.5">
            {selectedCategories.length > 0 ? (
              selectedCategories.map((cat) => (
                <span
                  key={cat.id}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cat.accentBg} ${cat.colorClass} ${cat.borderColor}`}
                >
                  {cat.title}
                </span>
              ))
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F4F3F8] text-[#474D66]">
                Still Exploring Options
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Progressive Disclosure Toggle */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#626987] hover:text-[#171A2B] transition-colors"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? "Hide detailed baseline" : "Inspect full baseline answers"}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {isExpanded && (
          <div className="mt-3 p-4 rounded-2xl bg-[#F4F3F8] border border-[#E8E6F3] space-y-3 text-xs text-[#31364F] animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="font-bold text-[#171A2B] block pb-0.5">Selected Sub-Interests:</span>
                {viewModel.interests.selectedSubInterestIds.length > 0 ? (
                  <ul className="list-disc list-inside space-y-0.5 text-[#626987]">
                    {viewModel.interests.selectedSubInterestIds.map((id) => (
                      <li key={id}>{id.replace(/_/g, " ").replace(/^[a-z]+ /, "")}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[#8C93AD] italic">None selected (exploring freely)</p>
                )}
              </div>

              <div>
                <span className="font-bold text-[#171A2B] block pb-0.5">Truthful Evidence Status:</span>
                <p className="text-[#626987]">
                  {viewModel.growthSnapshot.totalPractisedCount} skills practised in challenge •{" "}
                  {viewModel.growthSnapshot.totalSelfReportedCount} self-reported familiarity •{" "}
                  {viewModel.growthSnapshot.unassessedAreasCount} unassessed exploration areas.
                </p>
              </div>
            </div>

            <p className="text-[11px] text-[#8C93AD] pt-1 border-t border-[#E8E6F3] italic">
              Student Profile Revision: <code>{viewModel.profileRevision}</code> • Last updated {new Date(viewModel.updatedAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
