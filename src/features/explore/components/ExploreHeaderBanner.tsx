/**
 * NEXT MOVE AI V2 — EXPLORE HEADER BANNER
 * 
 * Dynamic personalized welcome based on confirmed profile,
 * or neutral invitation for unconfirmed / anonymous visitors.
 * Surfaces saved list trigger and comparison tray launcher.
 */

"use client";

import React from "react";
import Link from "next/link";
import { Compass, Bookmark, Columns3, Sparkles, ArrowLeft } from "lucide-react";
import { type StudentIntelligenceProfile } from "@/features/onboarding/schemas/types";

interface ExploreHeaderBannerProps {
  profile: StudentIntelligenceProfile | null;
  isAnonymous: boolean;
  savedCount: number;
  comparisonCount: number;
  onOpenSaved: () => void;
  onOpenComparison: () => void;
}

export function ExploreHeaderBanner({
  profile,
  isAnonymous,
  savedCount,
  comparisonCount,
  onOpenSaved,
  onOpenComparison,
}: ExploreHeaderBannerProps) {
  // Derive human-readable stage and context
  const hasProfile = Boolean(profile) && !isAnonymous;
  const stageName = hasProfile ? getStageName(profile?.academicStageId) : "Student Workspace";

  return (
    <section
      aria-label="Explore Possibilities Header"
      className="p-5 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-4"
    >
      {/* Top Breadcrumb & Return to Dashboard */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#626987]">
        <Link
          href="/dashboard/student"
          className="inline-flex items-center gap-1.5 font-bold text-[#6757F5] hover:text-[#5342E8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] rounded-lg"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home Dashboard</span>
        </Link>

        {/* Action Trays: Saved & Compare */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Saved Pathways Drawer Trigger */}
          <button
            type="button"
            onClick={onOpenSaved}
            aria-label={`View Saved Pathways (${savedCount})`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F3F8] hover:bg-[#EDEAFF] text-[#31364F] hover:text-[#6757F5] font-semibold text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>Saved Pathways</span>
            {savedCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#6757F5] text-white text-[10px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Comparison Tray Trigger */}
          <button
            type="button"
            onClick={onOpenComparison}
            disabled={comparisonCount === 0}
            aria-label={`Compare Pathways (${comparisonCount} selected)`}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
              comparisonCount > 0
                ? "bg-[#6757F5] text-white hover:bg-[#5342E8] shadow-xs"
                : "bg-[#F4F3F8] text-[#8C93AD] cursor-not-allowed"
            }`}
          >
            <Columns3 className="w-3.5 h-3.5" />
            <span>Compare</span>
            {comparisonCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-[#6757F5] text-[10px] font-black flex items-center justify-center">
                {comparisonCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Title & Personalization Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6757F5] bg-[#EDEAFF] px-2.5 py-0.5 rounded-full">
                {stageName}
              </span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#171A2B] tracking-tight">
            {hasProfile
              ? `Explore Pathways & Possibilities`
              : `Explore Educational & Career Possibilities`}
          </h1>

          <p className="text-xs sm:text-sm text-[#474D66] max-w-2xl leading-relaxed">
            {hasProfile
              ? `Curated directions grounded in your confirmed ${stageName} baseline and self-reported interests. Investigate day-in-the-life realities, educational routes, and low-stakes micro-trials before committing.`
              : `A neutral discovery workspace to explore streams, university degrees, vocational alternatives, and emerging domains without premature career locks.`}
          </p>
        </div>

        {/* Epistemic Provenance Badge */}
        <div className="p-3.5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-xs text-[#31364F] space-y-1 max-w-xs shrink-0 self-start md:self-auto">
          <div className="flex items-center gap-1.5 font-bold text-[#6757F5]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Epistemic Clarity</span>
          </div>
          <p className="text-[11px] text-[#474D66] leading-snug">
            We don&apos;t predict careers or assign match scores. Every avenue is a possibility to investigate through evidence and lived experience.
          </p>
        </div>
      </div>
    </section>
  );
}

function getStageName(stageId?: string): string {
  switch (stageId) {
    case "classes-4-7":
      return "Classes 4–7 Exploration";
    case "classes-8-10":
      return "Classes 8–10 Foundation";
    case "classes-11-12":
      return "Classes 11–12 Higher Ed";
    case "diploma":
      return "Diploma & Applied Tech";
    case "degree-engineering":
      return "Degree & Engineering";
    case "final-year-grad":
      return "Final-Year & Graduate";
    default:
      return "Student Workspace";
  }
}
