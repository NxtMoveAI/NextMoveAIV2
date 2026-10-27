"use client";

import React, { useState } from "react";
import { HOW_IT_WORKS_STAGES } from "@/data/landing-demo";
import {
  UserCheck,
  Compass,
  Scale,
  Rocket,
  ArrowRight,
  Sparkles,
  Repeat,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

export function HowItWorks() {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const activeStage = HOW_IT_WORKS_STAGES[activeStageIndex];

  const getStageIcon = (name: string) => {
    switch (name) {
      case "UserCheck":
        return UserCheck;
      case "Compass":
        return Compass;
      case "Scale":
        return Scale;
      case "Rocket":
      default:
        return Rocket;
    }
  };

  return (
    <section
      id="how-it-works"
      className="py-16 lg:py-24 bg-[#FAF9F6] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Four Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A2B] tracking-tight">
            From understanding yourself to building your next move.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#31364F] leading-relaxed">
            Next Move AI connects self-reflection, pathway discovery, student-controlled
            decisions, and real-world execution into one continuous growth loop.
          </p>
        </div>

        {/* 4 Connected Stages - Horizontal Bar on Desktop / Vertical on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {HOW_IT_WORKS_STAGES.map((stage, idx) => {
            const IconComponent = getStageIcon(stage.iconName);
            const isSelected = activeStageIndex === idx;

            return (
              <div key={stage.title} className="relative group">
                <button
                  type="button"
                  onClick={() => setActiveStageIndex(idx)}
                  className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 relative flex flex-col justify-between h-full ${
                    isSelected
                      ? "bg-white border-[#6757F5] shadow-xl shadow-[#6757F5]/10 ring-2 ring-[#6757F5]/30 -translate-y-1"
                      : "bg-white/80 border-[#E8E6F3] hover:border-[#DDD8FE] hover:bg-white"
                  }`}
                  aria-label={`Inspect ${stage.title}`}
                >
                  <div>
                    {/* Step number and icon badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-2xl font-black ${
                          isSelected ? "text-[#6757F5]" : "text-[#B8B4D4]"
                        }`}
                      >
                        {stage.stepNumber}
                      </span>
                      <div
                        className={`p-3 rounded-2xl ${
                          isSelected
                            ? "bg-[#6757F5] text-white shadow-sm"
                            : "bg-[#EDEAFF] text-[#6757F5]"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#626987] block mb-1">
                      {stage.subtitle}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#171A2B] mb-2 leading-tight">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-[#626987] leading-relaxed line-clamp-3">
                      {stage.description}
                    </p>
                  </div>

                  {/* Stage indicator pill */}
                  <div className="mt-5 pt-3 border-t border-[#F0EEF8] flex items-center justify-between">
                    <span
                      className={`text-[11px] font-semibold ${
                        isSelected ? "text-[#6757F5]" : "text-[#626987]"
                      }`}
                    >
                      {isSelected ? "Inspecting Stage" : "Click to Inspect"}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected
                          ? "text-[#6757F5] translate-x-1"
                          : "text-[#626987]"
                      }`}
                    />
                  </div>
                </button>

                {/* Connecting arrow for desktop between cards */}
                {idx < 3 && (
                  <div
                    className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white border border-[#DDD8FE] text-[#6757F5] items-center justify-center shadow-xs"
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detailed Stage Deep-Dive Card */}
        <div className="mt-8 rounded-3xl bg-white border border-[#DDD8FE] p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left detail area */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase">
                  Stage {activeStage.stepNumber} Deep Dive
                </span>
                <span className="text-xs text-[#626987] font-semibold">
                  {activeStage.tagline}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B]">
                {activeStage.title}: {activeStage.subtitle}
              </h3>

              <p className="text-sm sm:text-base text-[#31364F] leading-relaxed">
                {activeStage.description}
              </p>

              {/* Concrete Example Box */}
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6757F5]">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Real Indian Student Scenario:</span>
                </div>
                <p className="text-xs sm:text-sm text-[#171A2B] font-medium leading-relaxed">
                  &ldquo;{activeStage.concreteExample}&rdquo;
                </p>
              </div>

              {/* Key Outputs */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#626987] block mb-2">
                  What You Get From This Stage:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeStage.keyOutputs.map((output) => (
                    <div
                      key={output}
                      className="p-2.5 rounded-xl bg-[#F7F6FF] border border-[#DDD8FE]/60 text-xs text-[#31364F] flex items-center gap-2 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#35B8C5] shrink-0" />
                      <span>{output}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right student question & reflection area */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#FAF9F6] to-[#EDEAFF]/50 p-6 sm:p-7 rounded-3xl border border-[#DDD8FE]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6757F5] block mb-2">
                Core Student Question
              </span>
              <p className="text-lg sm:text-xl font-bold text-[#171A2B] italic leading-snug">
                &ldquo;{activeStage.studentQuestion}&rdquo;
              </p>

              <div className="mt-6 pt-6 border-t border-[#DDD8FE]/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171A2B]">
                  <Sparkles className="w-4 h-4 text-[#6757F5]" />
                  <span>Why this stage is student-centered:</span>
                </div>
                <p className="text-xs text-[#626987] leading-relaxed">
                  Most platforms rush students directly to a single job label. Next Move AI
                  gives you room to explore multiple paths, test low-stakes simulations,
                  and change your mind as you grow.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Growth Loop Banner */}
        <div className="mt-8 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#171A2B] to-[#2C314E] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-white/10 text-[#35B8C5] shrink-0">
              <Repeat className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-[#35B8C5]">
                  Continuous Growth Ecosystem
                </span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-medium">
                  Not a One-Time Test
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                Explore → Try → Build → Reflect → Grow
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
                Your journey doesn’t end with picking a college or course. Your student profile
                evolves with new projects, demonstrated capabilities, and updated goals.
              </p>
            </div>
          </div>

          <a
            href="#explorer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-[#6757F5] hover:bg-[#5342E8] text-white whitespace-nowrap shadow-md transition-colors"
          >
            <span>Try the 4 Steps Now</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
