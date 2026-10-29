/**
 * NEXT MOVE AI V2 — ONBOARDING PROGRESS INDICATOR
 * 
 * Accessible, adaptive progress bar reflecting real completion percentage.
 */

"use client";

import React from "react";
import { type AcademicStageId } from "@/data/landing-demo";
import { type OnboardingStepId } from "../schemas/types";
import { VALID_STAGE_IDS } from "@/data/flow2-config";

interface OnboardingProgressProps {
  currentStep: OnboardingStepId;
  currentStepIndex: number;
  totalSteps: number;
  progressPercentage: number;
  stageId: AcademicStageId;
  onSelectStage?: (stageId: AcademicStageId) => void;
}

const STEP_LABELS: Record<OnboardingStepId, string> = {
  welcome: "Welcome",
  academic: "Academic Context",
  clarity: "Clarity & Goals",
  interests: "Interests & Curiosity",
  "starting-point": "My Starting Point",
  "activity-prompt": "Optional Challenge",
  activity: "Micro-Exploration",
  reflection: "Reflection",
  profile: "Starting Profile",
};

const STAGE_SHORT_LABELS: Record<AcademicStageId, string> = {
  "classes-4-7": "Classes 4–7",
  "classes-8-10": "Classes 8–10",
  "classes-11-12": "Classes 11–12",
  diploma: "Diploma",
  "degree-engineering": "Degree / Eng",
  "final-year-grad": "Graduate",
};

export function OnboardingProgress({
  currentStep,
  currentStepIndex,
  totalSteps,
  progressPercentage,
  stageId,
  onSelectStage,
}: OnboardingProgressProps) {
  return (
    <div className="w-full bg-white border-b border-[#E8E6F3] py-2.5 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Step details */}
        <div className="flex items-center justify-between sm:justify-start gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#6757F5] bg-[#EDEAFF] px-2 py-0.5 rounded-full border border-[#DDD8FE]">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
            <span className="text-xs font-semibold text-[#171A2B] truncate max-w-[180px] sm:max-w-xs">
              {STEP_LABELS[currentStep] || currentStep}
            </span>
          </div>

          {/* Academic stage dropdown/pill */}
          {onSelectStage && (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="hidden md:inline text-[#626987]">Stage:</span>
              <select
                value={stageId}
                onChange={(e) => onSelectStage(e.target.value as AcademicStageId)}
                aria-label="Switch Academic Stage"
                className="bg-[#FAF9F6] border border-[#DDD8FE] text-[#171A2B] text-xs font-bold rounded-lg px-2 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6757F5]"
              >
                {VALID_STAGE_IDS.map((id) => (
                  <option key={id} value={id}>
                    {STAGE_SHORT_LABELS[id]}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full sm:w-48">
          <div
            className="flex-1 h-2 bg-[#F0EEFF] rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Onboarding progress: ${progressPercentage}%`}
          >
            <div
              className="h-full bg-gradient-to-r from-[#6757F5] to-[#35B8C5] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-xs font-bold text-[#626987] tabular-nums shrink-0">
            {progressPercentage}%
          </span>
        </div>
      </div>
    </div>
  );
}
