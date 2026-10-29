/**
 * NEXT MOVE AI V2 — STAGE G: REFLECTION & REVIEW
 * 
 * Captures momentary student reflection without permanent personality labels.
 * Enables students to direct their next learning move.
 */

"use client";

import React from "react";
import { ArrowLeft, ArrowRight, MessageSquareHeart, Check } from "lucide-react";
import { type ReflectionData } from "../schemas/types";

interface ReflectionStepProps {
  reflection: ReflectionData;
  onUpdate: (update: Partial<ReflectionData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const SUPPORT_OPTIONS = [
  { id: "explore_possibilities", label: "Explore new career & project possibilities" },
  { id: "build_skills", label: "Build concrete skills and practical portfolio projects" },
  { id: "understand_education", label: "Understand entrance exams, degrees, and college realities" },
  { id: "start_project", label: "Work on an interactive, guided starter project" },
  { id: "compare_directions", label: "Compare trade-offs between two different paths" },
  { id: "figuring_out", label: "I'm still figuring it out — show me gentle starting options" },
];

export function ReflectionStep({
  reflection,
  onUpdate,
  onNext,
  onBack,
}: ReflectionStepProps) {
  const toggleSupport = (id: string) => {
    const current = reflection.immediateSupportNeeded;
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    onUpdate({ immediateSupportNeeded: next });
  };

  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-8 sm:py-10 flex flex-col justify-center">
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#DDD8FE] shadow-xl text-center space-y-6">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider border border-[#DDD8FE]">
          <MessageSquareHeart className="w-3.5 h-3.5" />
          <span>Stage G • Reflection & Goals</span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#171A2B] tracking-tight">
            Reflecting on your exploration
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#626987]">
            A quick check-in before we assemble your Student Intelligence Starting Profile.
          </p>
        </div>

        <div className="space-y-6 text-left">
          {/* Question 1: What did you enjoy? */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider">
              What has felt most engaging so far?
            </label>
            <input
              type="text"
              value={reflection.enjoyedMost}
              onChange={(e) => onUpdate({ enjoyedMost: e.target.value })}
              placeholder="e.g. Trying the practical scenario, exploring game design, seeing degree comparisons..."
              className="w-full p-3 rounded-xl border border-[#DDD8FE] bg-white text-xs font-semibold text-[#171A2B] focus:outline-none focus:ring-2 focus:ring-[#6757F5]"
            />
          </div>

          {/* Question 2: Direction preference */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider">
              Would you like to explore something similar or something different?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: "explore_similar", label: "Explore similar topics" },
                { id: "explore_different", label: "Try something different" },
                { id: "still_deciding", label: "Keep an open mind" },
              ].map((opt) => {
                const isSelected = reflection.directionPreference === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      onUpdate({
                        directionPreference: opt.id as ReflectionData["directionPreference"],
                      })
                    }
                    className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-[#6757F5] text-white border-[#6757F5] shadow-xs"
                        : "bg-white text-[#31364F] border-[#E8E6F3] hover:border-[#DDD8FE]"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 3: What would you like help with next? */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider">
              What would you like Next Move AI to help you with first? (Select any)
            </label>
            <div className="space-y-2">
              {SUPPORT_OPTIONS.map((sup) => {
                const isSelected = reflection.immediateSupportNeeded.includes(sup.id);
                return (
                  <button
                    key={sup.id}
                    type="button"
                    onClick={() => toggleSupport(sup.id)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                      isSelected
                        ? "bg-[#EDEAFF] text-[#5342E8] border-[#6757F5] font-bold"
                        : "bg-white text-[#31364F] border-[#E8E6F3] hover:border-[#DDD8FE]"
                    }`}
                  >
                    <span>{sup.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#6757F5]" />}
                  </button>
                );
              })}
            </div>
          </div>
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
            <span>View My Starting Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
