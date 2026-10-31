/**
 * NEXT MOVE AI V2 — OPTIONAL ACTIVITY PROMPT STEP
 * 
 * Decision node per Flow 3 architecture diagram:
 * "Try optional activity? -> Yes / Skip"
 * Strictly non-punitive and fully accessible.
 */

"use client";

import React from "react";
import { ArrowLeft, Play, FastForward, Clock, Zap } from "lucide-react";
import { type AcademicStageId } from "@/data/landing-demo";
import { STAGE_MICRO_ACTIVITIES, type MicroActivity } from "../data/activities";

interface ActivityPromptStepProps {
  stageId: AcademicStageId;
  activity?: MicroActivity;
  onAccept: () => void;
  onSkip: () => void;
  onBack: () => void;
}

export function ActivityPromptStep({
  stageId,
  activity: customActivity,
  onAccept,
  onSkip,
  onBack,
}: ActivityPromptStepProps) {
  const activity = customActivity || STAGE_MICRO_ACTIVITIES[stageId] || STAGE_MICRO_ACTIVITIES["classes-11-12"];

  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-8 sm:py-10 flex flex-col justify-center">
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#DDD8FE] shadow-xl text-center space-y-6">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider border border-[#DDD8FE]">
          <Zap className="w-3.5 h-3.5" />
          <span>Stage F • Optional Practical Exploration</span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#171A2B] tracking-tight">
            Try a 5-minute practical challenge?
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#626987] max-w-lg mx-auto">
            Experience a sample real-world task tailored to your educational level. Participation is 100% optional.
          </p>
        </div>

        {/* Challenge Preview Card */}
        <div className="p-6 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-left space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6757F5] uppercase tracking-wider">
              Prepared for your stage
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#626987] bg-white px-2.5 py-1 rounded-md border border-[#E8E6F3]">
              <Clock className="w-3.5 h-3.5 text-[#35B8C5]" />
              <span>~{activity.estimatedMinutes} Mins</span>
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-black text-[#171A2B]">
              {activity.title}
            </h3>
            <p className="text-xs text-[#626987] leading-relaxed">
              {activity.subtitle}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#E8E6F3] text-xs text-[#474D66]">
            <strong className="text-[#171A2B] block">Evidence Impact:</strong>
            Completing this challenge adds an &ldquo;Attempted / Practised&rdquo; tag to your profile. Skipping simply leaves it as &ldquo;Not assessed yet&rdquo; without any negative rating.
          </div>
        </div>

        {/* Primary Choices */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onAccept}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold shadow-md shadow-[#6757F5]/25 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Yes, Try Practical Challenge</span>
          </button>

          <button
            type="button"
            onClick={onSkip}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#FAF9F6] text-[#626987] hover:text-[#171A2B] border border-[#DDD8FE] text-xs font-bold transition-all"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Skip Challenge & Continue</span>
          </button>
        </div>

        {/* Back Link */}
        <div className="pt-4 border-t border-[#E8E6F3] flex justify-start">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#626987] hover:text-[#171A2B]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to My Starting Point</span>
          </button>
        </div>
      </div>
    </div>
  );
}
