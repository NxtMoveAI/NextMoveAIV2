/**
 * NEXT MOVE AI V2 — TRIAL CARD COMPONENT
 * 
 * Individual experiential trial card.
 * Displays duration, category, format type, and completion/progress status.
 */

"use client";

import React from "react";
import { Clock, CheckCircle2, RotateCcw, ArrowRight } from "lucide-react";
import { type TrialActivity, type TrialAttemptRecord } from "../types";

interface TrialCardProps {
  trial: TrialActivity;
  attempt?: TrialAttemptRecord;
  onStart: (trial: TrialActivity) => void;
  onRetry: (trial: TrialActivity) => void;
}

export function TrialCard({ trial, attempt, onStart, onRetry }: TrialCardProps) {
  const isCompleted = attempt?.status === "completed";
  const isInProgress = attempt?.status === "in_progress";

  return (
    <article
      data-testid={`trial-card-${trial.id}`}
      aria-labelledby={`trial-title-${trial.id}`}
      className="p-5 rounded-3xl bg-white border border-[#E8E6F3] hover:border-[#6757F5]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
    >
      <div className="space-y-3">
        {/* Stage & Status Row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5] bg-[#EDEAFF] px-2.5 py-0.5 rounded-full">
            {trial.categoryLabel}
          </span>

          <div className="flex items-center gap-1.5">
            {isCompleted && attempt?.evidenceStatus === "practised" && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                <span>Practised</span>
              </span>
            )}
            {isCompleted && attempt?.evidenceStatus === "attempted" && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#B45309] bg-[#FFFBEB] border border-[#FDE68A] px-2 py-0.5 rounded-full">
                <span>Attempted</span>
              </span>
            )}
            {isInProgress && (
              <span className="text-[10px] font-bold text-[#D97706] bg-[#FFFBEB] border border-[#FDE68A] px-2 py-0.5 rounded-full">
                In Progress
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#626987]">
              <Clock className="w-3 h-3 text-[#8C93AD]" />
              <span>~{trial.suggestedMinutes}m</span>
            </span>
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-1">
          <h2
            id={`trial-title-${trial.id}`}
            className="text-base font-black text-[#171A2B] group-hover:text-[#6757F5] transition-colors leading-snug"
          >
            {trial.title}
          </h2>
          <p className="text-xs text-[#626987] leading-relaxed line-clamp-2">
            {trial.subtitle}
          </p>
        </div>

        {/* Learning Objective Preview */}
        <div className="p-3 rounded-2xl bg-[#FAF9F6] border border-[#F0EEF8] text-[11px] text-[#474D66] space-y-1">
          <span className="font-bold text-[#171A2B] block">What this clarifies:</span>
          <p className="leading-relaxed line-clamp-2">{trial.whatThisClarifies}</p>
        </div>

        {/* Competency Pill */}
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#626987]">
          <span className="text-[#8C93AD]">Topic:</span>
          <span className="bg-[#F4F3F8] text-[#171A2B] px-2 py-0.5 rounded-md">
            {trial.competencyPractised}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-[#F0EEF8] flex items-center justify-between gap-2">
        <span className="text-[10px] font-semibold text-[#8C93AD] capitalize">
          {trial.format.replace("_", " ")}
        </span>

        {isCompleted ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onRetry(trial)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#626987] hover:text-[#171A2B] px-2.5 py-1.5 rounded-xl hover:bg-[#F4F3F8] transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retry</span>
            </button>
            <button
              type="button"
              onClick={() => onStart(trial)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] hover:text-[#047857] px-3 py-1.5 rounded-xl bg-[#ECFDF5] transition-colors"
            >
              <span>Review</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onStart(trial)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#171A2B] group-hover:bg-[#6757F5] text-white text-xs font-bold transition-all shadow-xs"
          >
            <span>{isInProgress ? "Resume Trial" : "Try Experience"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </article>
  );
}
