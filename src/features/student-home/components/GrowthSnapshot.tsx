/**
 * NEXT MOVE AI V2 — MY GROWTH SNAPSHOT
 * 
 * Truthful, non-judgmental evidence breakdown answering:
 * "What have I explored or practised?"
 * Conforms to canonical evidence taxonomy. No fake progress rings or manipulative streaks.
 */

"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { type GrowthSnapshotViewModel } from "../schemas/types";

interface GrowthSnapshotProps {
  snapshot: GrowthSnapshotViewModel;
}

export function GrowthSnapshot({ snapshot }: GrowthSnapshotProps) {
  const {
    hasAttemptedActivity,
    totalPractisedCount,
    totalSelfReportedCount,
    unassessedAreasCount,
    evidenceItems,
    recentActivity,
    emptyStateMessage,
  } = snapshot;

  return (
    <section aria-labelledby="growth-heading" className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h2
              id="growth-heading"
              className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight"
            >
              What you&apos;ve explored so far
            </h2>
            <p className="text-xs text-[#626987]">
              Truthful evidence record • Building real capability rather than assigning arbitrary fit percentages
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/student/growth"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] hover:text-[#5342E8] transition-colors self-start sm:self-auto"
        >
          <span>View growth ledger</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-6">
        {/* Metric counts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0]/60 space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669]">
              Practised in Challenge
            </span>
            <p className="text-xl sm:text-2xl font-black text-[#065F46]">
              {totalPractisedCount}
            </p>
            <p className="text-[10px] text-[#047857]">Attempted in platform challenges</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE]/60 space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8]">
              Self-Reported
            </span>
            <p className="text-xl sm:text-2xl font-black text-[#1E40AF]">
              {totalSelfReportedCount}
            </p>
            <p className="text-[10px] text-[#1D4ED8]">Familiarity you shared</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE]/60 space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
              Unassessed Areas
            </span>
            <p className="text-xl sm:text-2xl font-black text-[#4338CA]">
              {unassessedAreasCount}
            </p>
            <p className="text-[10px] text-[#626987]">Open for future exploration</p>
          </div>
        </div>

        {/* Empty State vs Recent Activity State */}
        {!hasAttemptedActivity ? (
          <div className="p-5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-center space-y-3">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-bold text-[#171A2B]">
                {emptyStateMessage || "You haven't tried an activity yet. That's a place to begin, not a problem."}
              </p>
              <p className="text-xs text-[#626987] max-w-md mx-auto">
                Next Move AI records evidence only when you actually complete a practical task. Whenever you want to try one, your next move is ready.
              </p>
            </div>
            <div>
              <a
                href="#next-move"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold shadow-md shadow-[#6757F5]/20 transition-all"
              >
                <span>Try Your First Discovery Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : recentActivity ? (
          <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#059669]" />
                <span className="text-xs font-bold text-[#171A2B]">
                  Latest Activity Completed: {recentActivity.title}
                </span>
              </div>
              {recentActivity.timeAgo && (
                <span className="text-[11px] text-[#626987] font-medium">
                  {recentActivity.timeAgo}
                </span>
              )}
            </div>
            {recentActivity.feedbackGiven && recentActivity.feedbackGiven.trim().length > 0 && (
              <p className="text-xs text-[#31364F] leading-relaxed">
                &ldquo;{recentActivity.feedbackGiven}&rdquo;
              </p>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1 text-[11px]">
              <div className="flex items-center gap-2 text-[#059669] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Practised topic: {recentActivity.competencyPractised}</span>
              </div>
              <span className="text-[10px] text-[#626987]">
                Self-guided practice • Rubric review required for verified mastery
              </span>
            </div>
          </div>
        ) : null}

        {/* Evidence items list */}
        {evidenceItems.length > 0 && (
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-[#171A2B] block">
              Starting Capabilities & Stated Familiarity:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {evidenceItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-[#E8E6F3] bg-white flex items-center justify-between gap-2 shadow-2xs"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-[#171A2B]">{item.title}</p>
                    <p className="text-[10px] text-[#626987]">{item.category}</p>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      item.evidenceStatus === "practised"
                        ? "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]"
                        : "bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]"
                    }`}
                  >
                    {item.statusLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
