/**
 * NEXT MOVE AI V2 — STAGE C: CLARITY & PERSONAL GOALS
 * 
 * Evaluates student certainty without psychometric diagnosis or deterministic labeling.
 * Normalizes confusion and welcomes pivots.
 */

"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Target, CheckCircle2 } from "lucide-react";
import { type AcademicStageId } from "@/data/landing-demo";
import { type ClarityData } from "../schemas/types";
import { OLDER_CLARITY_OPTIONS, YOUNGER_CLARITY_OPTIONS } from "../data/questions";

interface ClarityStepProps {
  stageId: AcademicStageId;
  clarity: ClarityData;
  onUpdate: (update: Partial<ClarityData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ClarityStep({
  stageId,
  clarity,
  onUpdate,
  onNext,
  onBack,
}: ClarityStepProps) {
  const isYounger = stageId === "classes-4-7";
  const options = isYounger ? YOUNGER_CLARITY_OPTIONS : OLDER_CLARITY_OPTIONS;

  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-8 sm:py-10 flex flex-col justify-center">
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#DDD8FE] shadow-xl text-center space-y-6">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider border border-[#DDD8FE]">
          <Target className="w-3.5 h-3.5" />
          <span>Stage C • Clarity & Personal Goals</span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#171A2B] tracking-tight">
            {isYounger
              ? "Do you already have something you'd like to try?"
              : "How clear are you about what you want to explore next?"}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#626987]">
            {isYounger
              ? "Tell us how you feel today! You can change this anytime."
              : "Whatever your answer, there is no right or wrong position. We design your starting steps to match."}
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-3 text-left">
          {options.map((opt) => {
            const isSelected = clarity.clarityLevel === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  onUpdate({
                    clarityLevel: opt.id as ClarityData["clarityLevel"],
                  })
                }
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? "bg-[#F7F6FF] border-[#6757F5] ring-2 ring-[#6757F5]/20 shadow-sm"
                    : "bg-white border-[#E8E6F3] hover:border-[#DDD8FE]"
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#171A2B]">
                      {opt.label}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-[#6757F5] text-white"
                          : "bg-[#F0EEFF] text-[#6757F5]"
                      }`}
                    >
                      {opt.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#626987] leading-relaxed">
                    {opt.description}
                  </p>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? "bg-[#6757F5] border-[#6757F5] text-white"
                      : "border-[#DDD8FE] bg-white"
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Contextual Goal Prompt */}
        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#DDD8FE] text-left space-y-2">
          <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider">
            {isYounger
              ? "What is one thing you find super interesting right now?"
              : "What is your primary question or focus for Next Move AI?"}
          </label>
          <input
            type="text"
            value={clarity.primaryHelpReason}
            onChange={(e) => onUpdate({ primaryHelpReason: e.target.value })}
            placeholder={
              isYounger
                ? "e.g. Building LEGO robots, drawing space rockets..."
                : "e.g. Compare computer science vs BCA, find practical portfolio projects..."
            }
            className="w-full p-3 rounded-xl border border-[#DDD8FE] bg-white text-xs font-semibold text-[#171A2B] focus:outline-none focus:ring-2 focus:ring-[#6757F5]"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="pt-4 border-t border-[#E8E6F3] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E8E6F3] text-xs font-bold text-[#626987] hover:bg-[#FAF9F6] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold shadow-md shadow-[#6757F5]/20 transition-all"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
