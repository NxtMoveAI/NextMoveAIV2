"use client";

import React, { useState } from "react";
import { GROWTH_TIMELINE_CASES } from "@/data/landing-demo";
import {
  Sparkles,
  Compass,
  FlaskConical,
  Hammer,
  MessageSquareHeart,
  TrendingUp,
  CheckCircle2,
  XCircle,
  FileCheck2,
  Check,
} from "lucide-react";

export function GrowthJourney() {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const activeCase = GROWTH_TIMELINE_CASES[selectedCaseIndex];

  const getTimelineIcon = (name: string) => {
    switch (name) {
      case "Compass":
        return Compass;
      case "FlaskConical":
        return FlaskConical;
      case "Hammer":
        return Hammer;
      case "MessageSquareHeart":
        return MessageSquareHeart;
      case "TrendingUp":
      default:
        return TrendingUp;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Continuous Growth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A2B] tracking-tight">
            Your journey doesn’t end with one decision.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#31364F] leading-relaxed">
            Interests evolve. New industries emerge. Skills compound. Next Move AI is built
            to be your lifelong thinking partner, not a one-time questionnaire.
          </p>
        </div>

        {/* 5-Step Continuous Timeline - Selectable */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3 text-xs text-[#626987]">
            <span className="font-bold uppercase tracking-wider text-[#6757F5]">
              Select a Milestone to View Authentic Student Evidence:
            </span>
            <span>Click any stage below</span>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
            role="tablist"
            aria-label="Student Growth Milestones"
          >
            {GROWTH_TIMELINE_CASES.map((item, idx) => {
              const IconComp = getTimelineIcon(item.iconName);
              const isSelected = selectedCaseIndex === idx;

              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  id={`milestone-tab-${item.step}`}
                  aria-selected={isSelected}
                  aria-controls={`milestone-panel-${item.step}`}
                  onClick={() => setSelectedCaseIndex(idx)}
                  className={`p-4 rounded-3xl text-left border transition-all duration-200 flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                    isSelected
                      ? "bg-[#FAF9F6] border-[#6757F5] shadow-md shadow-[#6757F5]/10 ring-2 ring-[#6757F5]/30 -translate-y-0.5"
                      : "bg-[#FAF9F6]/60 border-[#E8E6F3] hover:border-[#DDD8FE] hover:bg-[#FAF9F6]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                          isSelected
                            ? "bg-[#6757F5] text-white"
                            : "bg-[#EDEAFF] text-[#6757F5]"
                        }`}
                      >
                        Stage {item.step}
                      </span>
                      <div
                        className={`p-1.5 rounded-xl ${
                          isSelected
                            ? "bg-[#6757F5] text-white"
                            : "bg-white text-[#6757F5] border border-[#E8E6F3]"
                        }`}
                      >
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-[#171A2B] mb-0.5">
                      {item.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-[#626987] block mb-1">
                      {item.subtitle}
                    </span>
                    <p className="text-[11px] text-[#626987] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#E8E6F3] text-[10px] font-semibold flex items-center justify-between">
                    <span className={isSelected ? "text-[#6757F5]" : "text-[#626987]"}>
                      {isSelected ? "Active Evidence" : "Inspect"}
                    </span>
                    {isSelected && (
                      <span className="w-3.5 h-3.5 rounded-full bg-[#6757F5] text-white flex items-center justify-center">
                        <Check className="w-2 h-2 stroke-[3]" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Demonstration Case Box for Selected Milestone */}
        <div
          id={`milestone-panel-${activeCase.step}`}
          role="tabpanel"
          aria-labelledby={`milestone-tab-${activeCase.step}`}
          className="mb-12 p-6 sm:p-7 rounded-3xl bg-[#FAF9F6] border border-[#DDD8FE] shadow-sm animate-fadeIn"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E8E6F3]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#6757F5] text-white">
                Stage {activeCase.step} Evidence
              </span>
              <h3 className="text-lg font-bold text-[#171A2B]">
                Sample Demonstration: {activeCase.title}
              </h3>
            </div>
            <div className="text-xs text-[#626987] flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-[#35B8C5]" />
              <span>Sample Student: <strong>{activeCase.sampleStudent}</strong></span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-[#E8E6F3] space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#6757F5]">
                What the Student Did:
              </div>
              <p className="text-xs sm:text-sm text-[#31364F] leading-relaxed">
                {activeCase.whatStudentDid}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8E6F3] space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#35B8C5]">
                Demonstrated Artifact Created:
              </div>
              <p className="text-xs sm:text-sm text-[#171A2B] font-medium leading-relaxed">
                {activeCase.tangibleArtifact}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#171A2B]">
                Decision Clarity Gained:
              </div>
              <p className="text-xs sm:text-sm text-[#31364F] leading-relaxed">
                {activeCase.clarityGained}
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy Contrast: Authentic Evidence vs Fake Percentages */}
        <div className="rounded-3xl bg-[#FAF9F6] border border-[#DDD8FE] p-6 sm:p-8 lg:p-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#171A2B]">
              Why We Reject Artificial &ldquo;Fit&rdquo; Percentages
            </h3>
            <p className="text-xs sm:text-sm text-[#626987] mt-1">
              Many edtech portals show students made-up numbers like &ldquo;87% Medical Fit&rdquo; to sell
              courses. Here is how Next Move AI does things differently:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Way */}
            <div className="p-6 rounded-2xl bg-white border border-[#FCDAD7] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D93829]">
                <XCircle className="w-4 h-4" />
                <span>The Industry Old Way</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#31364F]">
                <li className="flex items-start gap-2">
                  <span className="text-[#D93829] font-bold">✕</span>
                  <span>Arbitrary &ldquo;92% Career Match&rdquo; based on 20 quiz questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D93829] font-bold">✕</span>
                  <span>Premature career pigeonholing in Class 6 or Class 8</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D93829] font-bold">✕</span>
                  <span>Manipulative daily streaks and artificial urgency notifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D93829] font-bold">✕</span>
                  <span>Sponsored recommendations pushing private partner degrees</span>
                </li>
              </ul>
            </div>

            {/* The Next Move AI Way */}
            <div className="p-6 rounded-2xl bg-[#F6F4FF] border border-[#6757F5]/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6757F5]">
                <CheckCircle2 className="w-4 h-4 text-[#35B8C5]" />
                <span>The Next Move AI Standard</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#171A2B]">
                <li className="flex items-start gap-2">
                  <span className="text-[#35B8C5] font-bold">✓</span>
                  <span>Verifiable evidence: actual code, sketches, and 15-min trial notes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#35B8C5] font-bold">✓</span>
                  <span>Broad curiosity and multiple parallel pathways encouraged</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#35B8C5] font-bold">✓</span>
                  <span>Calm, respectful workspace without addictive gamification traps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#35B8C5] font-bold">✓</span>
                  <span>100% objective data from official UGC, AICTE, and university portals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
