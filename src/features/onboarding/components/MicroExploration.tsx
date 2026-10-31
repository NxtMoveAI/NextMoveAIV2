/**
 * NEXT MOVE AI V2 — STAGE F: INTERACTIVE MICRO-EXPLORATION
 * 
 * Stage-aware interactive challenge engine with immediate feedback,
 * retry capability, and non-punitive skip.
 */

"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Zap,
  FastForward,
} from "lucide-react";
import { type AcademicStageId } from "@/data/landing-demo";
import { type ActivityAttemptResult, type ActivityOption } from "../schemas/types";
import { STAGE_MICRO_ACTIVITIES, type MicroActivity } from "../data/activities";

interface MicroExplorationProps {
  stageId: AcademicStageId;
  activity?: MicroActivity;
  attempt?: ActivityAttemptResult;
  onSubmitChoice: (optionId: string) => void;
  onRetry: () => void;
  onSkip: () => void;
  onNext: () => void;
  onBack: () => void;
}

export function MicroExploration({
  stageId,
  activity: customActivity,
  attempt,
  onSubmitChoice,
  onRetry,
  onSkip,
  onNext,
  onBack,
}: MicroExplorationProps) {
  const activity = customActivity || STAGE_MICRO_ACTIVITIES[stageId] || STAGE_MICRO_ACTIVITIES["classes-11-12"];
  const [selectedOpt, setSelectedOpt] = useState<string | null>(
    attempt?.selectedOptionId || null
  );

  const hasAnswered = Boolean(attempt?.status === "completed" && attempt?.selectedOptionId);
  const isCorrect = attempt?.isCorrect ?? false;

  const handleSelect = (optId: string) => {
    setSelectedOpt(optId);
    onSubmitChoice(optId);
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-8 sm:py-10 flex flex-col justify-center">
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#DDD8FE] shadow-xl text-center space-y-6">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider border border-[#DDD8FE]">
          <Zap className="w-3.5 h-3.5" />
          <span>Stage F • Interactive Micro-Exploration</span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#171A2B] tracking-tight">
            {activity.title}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#626987] max-w-xl mx-auto">
            {activity.subtitle}
          </p>
        </div>

        {/* Challenge Scenario Box */}
        <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#DDD8FE] text-left space-y-3">
          <div className="text-[11px] font-bold text-[#6757F5] uppercase tracking-wider">
            Practical Scenario
          </div>
          <p className="text-xs sm:text-sm text-[#171A2B] leading-relaxed whitespace-pre-line font-medium">
            {activity.scenario}
          </p>
        </div>

        {/* Interactive Options */}
        <div className="space-y-3 text-left">
          <div className="text-xs font-bold text-[#6757F5] uppercase tracking-wider">
            Select your response:
          </div>

          {activity.options.map((opt: ActivityOption) => {
            const isThisChosen = selectedOpt === opt.id || attempt?.selectedOptionId === opt.id;
            const showFeedback = hasAnswered && isThisChosen;

            return (
              <div key={opt.id} className="space-y-2">
                <button
                  type="button"
                  disabled={hasAnswered && isCorrect}
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs transition-all flex items-start justify-between gap-3 ${
                    isThisChosen
                      ? isCorrect
                        ? "bg-[#ECFDF5] border-[#059669] ring-2 ring-[#059669]/20"
                        : "bg-[#FFFBEB] border-[#D97706] ring-2 ring-[#D97706]/20"
                      : "bg-white border-[#E8E6F3] hover:border-[#DDD8FE] hover:bg-[#FAF9F6]"
                  }`}
                >
                  <span
                    className={`font-semibold leading-relaxed flex-1 ${
                      isThisChosen ? "text-[#171A2B]" : "text-[#31364F]"
                    }`}
                  >
                    {opt.label}
                  </span>

                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isThisChosen
                        ? isCorrect
                          ? "bg-[#059669] border-[#059669] text-white"
                          : "bg-[#D97706] border-[#D97706] text-white"
                        : "border-[#DDD8FE] bg-white"
                    }`}
                  >
                    {isThisChosen && (
                      isCorrect ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5" />
                      )
                    )}
                  </div>
                </button>

                {/* Granular Option Feedback */}
                {showFeedback && (
                  <div
                    className={`p-3 rounded-xl text-xs leading-relaxed animate-in fade-in duration-200 ${
                      isCorrect
                        ? "bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]"
                        : "bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                      )}
                      <div>
                        <strong>{isCorrect ? "Insight Verified:" : "Learning Note:"}</strong>{" "}
                        {attempt?.feedback || opt.feedback}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Underlying Principle Explanation (Visible after response) */}
        {hasAnswered && (
          <div className="p-4 rounded-2xl bg-[#F0FCFD] border border-[#B2EFF4] text-left space-y-1">
            <span className="text-[11px] font-bold text-[#0891B2] uppercase tracking-wider block">
              Competency Insight: {activity.demonstratedCompetency}
            </span>
            <p className="text-xs text-[#155E75] leading-relaxed">
              {activity.explanation}
            </p>
          </div>
        )}

        {/* Retry or Continue Actions */}
        <div className="pt-4 border-t border-[#E8E6F3] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E8E6F3] text-xs font-bold text-[#626987] hover:bg-[#FAF9F6] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {hasAnswered && !isCorrect && (
              <button
                type="button"
                onClick={() => {
                  setSelectedOpt(null);
                  onRetry();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#DDD8FE] bg-white text-xs font-bold text-[#6757F5] hover:bg-[#EDEAFF] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Another Choice</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onSkip}
              className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#626987] hover:text-[#171A2B] hover:bg-[#FAF9F6] transition-colors"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>Skip Challenge</span>
            </button>

            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold shadow-md shadow-[#6757F5]/20 transition-all"
            >
              <span>Continue to Reflection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
