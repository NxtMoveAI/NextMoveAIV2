/**
 * NEXT MOVE AI V2 — EXPLORE POSSIBILITIES PREVIEW
 * 
 * Compact visual grid of up to 3 age-appropriate curated avenues.
 * Answers: "What could I explore next?"
 * Shows:
 * - Domain type
 * - Summary & Why Suggested
 * - What Remains Unknown
 * - Action handoff
 */

"use client";

import React from "react";
import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import { type ExplorePossibilityItem } from "../schemas/types";

interface ExplorePreviewProps {
  possibilities: ExplorePossibilityItem[];
  stageLabel: string;
}

export function ExplorePreview({ possibilities, stageLabel }: ExplorePreviewProps) {
  return (
    <section id="explore-possibilities" aria-labelledby="possibilities-heading" className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2
              id="possibilities-heading"
              className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight"
            >
              Possibilities to explore
            </h2>
            <p className="text-xs text-[#626987]">
              Curated avenues grounded in your {stageLabel} baseline
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/student/explore"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] hover:text-[#5342E8] transition-colors self-start sm:self-auto"
        >
          <span>View all possibilities</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of up to 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {possibilities.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs hover:border-[#DDD8FE] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              {/* Type pill */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5] bg-[#EDEAFF] px-2.5 py-0.5 rounded-full">
                  {item.badgeLabel}
                </span>
                <span className="text-[10px] text-[#8C93AD] font-medium">
                  Illustrative sample
                </span>
              </div>

              {/* Title & Summary */}
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-[#171A2B] leading-snug group-hover:text-[#6757F5] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#474D66] leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>

              {/* Why suggested */}
              <div className="p-2.5 rounded-xl bg-[#F7F6FF] text-[11px] text-[#31364F] space-y-0.5">
                <span className="font-bold text-[#6757F5] block">Why suggested:</span>
                <p className="leading-normal">{item.whySuggested}</p>
              </div>

              {/* What remains unknown */}
              <div className="p-2.5 rounded-xl bg-[#FFFBEB] text-[11px] text-[#92400E] space-y-0.5">
                <span className="font-bold text-[#D97706] block">What remains unknown:</span>
                <p className="leading-normal">{item.whatRemainsUnknown}</p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 border-t border-[#E8E6F3]">
              <Link
                href={item.actionRoute || `/dashboard/student/explore?focus=${item.id}`}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#F4F3F8] hover:bg-[#EDEAFF] text-[#31364F] hover:text-[#6757F5] text-xs font-bold transition-all"
              >
                <span>Explore this direction</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
