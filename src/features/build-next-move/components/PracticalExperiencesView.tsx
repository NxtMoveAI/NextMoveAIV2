/**
 * NEXT MOVE AI V2 — FLOW 7: PRACTICAL EXPERIENCES VIEW
 * 
 * Immersive career tastings, workplace simulations, and hands-on challenges.
 * 
 * Epistemic Mandates:
 * - Bridges directly with Flow 6 Validate Fit trials.
 * - Highlights tangible deliverables (maps, spreadsheets, memos, wireframes).
 * - Distinguishes between tasting an interest vs claiming professional mastery.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { type PracticalExperienceItem, type NextMoveWorkspaceTab } from "../types";

interface PracticalExperiencesViewProps {
  experiences: PracticalExperienceItem[];
  completedTrialCount: number;
  onTabChange: (tab: NextMoveWorkspaceTab) => void;
}

export function PracticalExperiencesView({
  experiences,
  completedTrialCount,
  onTabChange,
}: PracticalExperiencesViewProps) {
  const [filterType, setFilterType] = useState<string>("all");

  const filterOptions = [
    { id: "all", label: "All Practical Experiences" },
    { id: "career_tasting", label: "Career Tastings" },
    { id: "real_world_problem", label: "Real-World Problems" },
    { id: "guided_simulation", label: "Simulations" },
  ];

  const filtered = experiences.filter((exp) => {
    if (filterType !== "all" && exp.experienceType !== filterType) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200" data-testid="practical-experiences-view">
      {/* 1. Header Banner */}
      <section className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
              Real-World Tastings & Simulations
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#171A2B] tracking-tight">
              Sample Daily Reality Before You Commit
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4E69] max-w-2xl leading-relaxed">
              Experience the actual day-to-day decisions, trade-offs, and challenges professionals face. 
              Each experience gives you a low-stakes way to test genuine fit.
            </p>
          </div>

          <Link
            href="/dashboard/student/validate-fit"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E8E6F3] bg-[#F7F7FD] hover:bg-[#F2F1FA] text-[#171A2B] text-xs font-bold transition-all flex-shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#6757F5]" />
            Validate Fit Trials ({completedTrialCount} recorded)
          </Link>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-[#F2F1FA] scrollbar-none">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilterType(opt.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filterType === opt.id
                  ? "bg-[#171A2B] text-white"
                  : "bg-white border border-[#E8E6F3] text-[#4A4E69] hover:bg-[#F7F7FD]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((exp) => (
          <div
            key={exp.id}
            className="p-6 rounded-3xl bg-white border border-[#E8E6F3] hover:border-[#6757F5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            data-testid={`experience-card-${exp.id}`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#F2F1FA] text-[#6757F5]">
                  {exp.typeLabel}
                </span>
                <span className="text-[11px] font-medium text-[#98A2B3] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> ~{exp.estimatedMinutes} mins
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#171A2B] leading-snug">
                  {exp.title}
                </h3>
                <p className="text-xs font-medium text-[#6757F5] mt-0.5">
                  {exp.subtitle}
                </p>
                <p className="text-xs text-[#4A4E69] mt-2 leading-relaxed">
                  {exp.overview}
                </p>
              </div>

              {/* Hands-on deliverable */}
              <div className="p-3 rounded-xl bg-[#F7F7FD] border border-[#E8E6F3] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">
                  What You Create & Test
                </span>
                <p className="text-xs font-semibold text-[#171A2B]">
                  🎯 {exp.handsOnDeliverable}
                </p>
              </div>

              {/* What you discover */}
              <div className="text-xs text-[#4A4E69] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">
                  Key Clarity Question
                </span>
                <p className="italic text-[#171A2B]">
                  &ldquo;{exp.whatYouWillDiscover}&rdquo;
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded bg-white text-[#4A4E69] border border-[#E8E6F3]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t border-[#F2F1FA] flex items-center justify-between gap-2">
              {exp.relatedTrialId ? (
                <Link
                  href={`/dashboard/student/validate-fit?trial=${exp.relatedTrialId}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6757F5] hover:bg-[#5645E5] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Try in Validate Fit <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <button
                  onClick={() => onTabChange("projects")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#171A2B] hover:bg-[#252A40] text-white text-xs font-bold transition-all"
                >
                  Start Project Version <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              <span className="text-[11px] text-[#98A2B3]">Low-stakes trial</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
