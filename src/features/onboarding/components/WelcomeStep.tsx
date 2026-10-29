/**
 * NEXT MOVE AI V2 — STAGE A: PERSONALIZED WELCOME
 * 
 * Reassuring, age-adaptive entry screen establishing student autonomy,
 * editable responses, and freedom from premature career judgment.
 */

"use client";

import React from "react";
import { ArrowRight, Sparkles, CheckCircle2, RotateCcw, Compass, Shield } from "lucide-react";
import { type AcademicStageId } from "@/data/landing-demo";
import { STAGE_WELCOME_CONFIG } from "../data/questions";
import { STAGE_AWARE_COPY } from "@/data/flow2-config";

interface WelcomeStepProps {
  stageId: AcademicStageId;
  onContinue: () => void;
  onSelectStage?: (stageId: AcademicStageId) => void;
}

export function WelcomeStep({
  stageId,
  onContinue,
}: WelcomeStepProps) {
  const config = STAGE_WELCOME_CONFIG[stageId] || STAGE_WELCOME_CONFIG["classes-11-12"];
  const stageCopy = STAGE_AWARE_COPY[stageId];

  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center">
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#DDD8FE] shadow-xl text-center space-y-6">
        {/* Stage Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider border border-[#DDD8FE]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stage A • {config.stageNote}</span>
        </div>

        {/* Dynamic Headings */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#171A2B] tracking-tight">
            {config.headline}
          </h1>
          <p className="text-sm sm:text-base text-[#474D66] leading-relaxed max-w-lg mx-auto">
            {config.subheadline}
          </p>
        </div>

        {/* Stage Focus Capsule */}
        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#DDD8FE] text-left">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#6757F5]">
            Confirmed Academic Context
          </div>
          <p className="mt-1 text-xs text-[#31364F] font-medium leading-relaxed">
            &ldquo;{stageCopy.tagline}&rdquo; — {stageCopy.subtext}
          </p>
        </div>

        {/* Reassuring Student Rights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <div className="p-3.5 rounded-xl bg-[#F7F6FF] border border-[#DDD8FE] flex items-start gap-2.5">
            <RotateCcw className="w-4 h-4 text-[#6757F5] shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-[#171A2B] block">Change answers anytime</strong>
              <span className="text-[#626987]">Nothing is locked or permanent. You can revisit previous steps.</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F0FCFD] border border-[#B2EFF4] flex items-start gap-2.5">
            <Compass className="w-4 h-4 text-[#35B8C5] shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-[#171A2B] block">Explore multiple interests</strong>
              <span className="text-[#626987]">You don&apos;t have to fit into one single career box or label.</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F5EEFE] border border-[#E4D4F9] flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#9333EA] shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-[#171A2B] block">No premature decisions</strong>
              <span className="text-[#626987]">We don&apos;t force you to pick a final career during onboarding.</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F4F3F8] border border-[#E8E6F3] flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-[#626987] shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-[#171A2B] block">Optional explorations</strong>
              <span className="text-[#626987]">Practical challenges are for fun and discovery, not high-stakes tests.</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            type="button"
            onClick={onContinue}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-sm font-bold shadow-lg shadow-[#6757F5]/25 transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6757F5]"
          >
            <span>Begin My Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
