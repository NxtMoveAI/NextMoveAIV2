/**
 * NEXT MOVE AI V2 — STAGE D: INTERACTIVE INTEREST EXPLORER
 * 
 * Reusable visual interest selection component with expandable sub-interests,
 * custom interest text input, and "Still Exploring" support.
 */

"use client";

import React from "react";
import {
  Code2,
  Palette,
  Compass,
  TrendingUp,
  Users,
  Search,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { type AcademicStageId } from "@/data/landing-demo";
import { type InterestsData } from "../schemas/types";
import { INTEREST_CATEGORIES } from "../data/interests";
import { InterestSubcategoryPicker } from "./InterestSubcategoryPicker";

interface InterestExplorerProps {
  stageId: AcademicStageId;
  interests: InterestsData;
  onToggleCategory: (categoryId: string) => void;
  onToggleSubInterest: (subInterestId: string) => void;
  onSetCustomInterest: (text: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  Palette,
  Compass,
  TrendingUp,
  Users,
  Search,
  Sparkles,
};

export function InterestExplorer({
  interests,
  onToggleCategory,
  onToggleSubInterest,
  onSetCustomInterest,
  onNext,
  onBack,
}: InterestExplorerProps) {
  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-8 sm:py-10 flex flex-col justify-center">
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#DDD8FE] shadow-xl text-center space-y-6">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider border border-[#DDD8FE]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stage D • Interests & Curiosity</span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#171A2B] tracking-tight">
            What subjects or activities make you curious?
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#626987]">
            Select as many as you like. We&apos;ll reveal specific sub-topics you can explore.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
          {INTEREST_CATEGORIES.map((cat) => {
            const isSelected = interests.selectedCategoryIds.includes(cat.id);
            const IconComponent = ICON_MAP[cat.iconName] || Sparkles;

            return (
              <div
                key={cat.id}
                onClick={() => onToggleCategory(cat.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#F7F6FF] border-[#6757F5] shadow-sm ring-2 ring-[#6757F5]/20"
                    : "bg-white border-[#E8E6F3] hover:border-[#DDD8FE] hover:shadow-xs"
                } ${cat.id === "still_exploring" ? "md:col-span-2" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${cat.accentBg} ${cat.borderColor} border flex items-center justify-center shrink-0 mt-0.5`}
                    >
                      <IconComponent className={`w-5 h-5 ${cat.colorClass}`} />
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-sm font-bold text-[#171A2B] block">
                        {cat.title}
                      </span>
                      <p className="text-xs text-[#626987] leading-relaxed">
                        {cat.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                      isSelected
                        ? "bg-[#6757F5] border-[#6757F5] text-white"
                        : "border-[#DDD8FE] bg-white"
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* Expandable Sub-interests */}
                {isSelected && cat.subInterests.length > 0 && (
                  <InterestSubcategoryPicker
                    category={cat}
                    selectedSubInterestIds={interests.selectedSubInterestIds}
                    onToggleSubInterest={onToggleSubInterest}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Custom Interest Input (In student's own words) */}
        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#DDD8FE] text-left space-y-2">
          <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider">
            Have an interest in your own words? (Optional)
          </label>
          <input
            type="text"
            value={interests.customInterestText || ""}
            onChange={(e) => onSetCustomInterest(e.target.value)}
            placeholder="e.g. Building solar telescopes, game streaming, ethical AI policy..."
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
            <span>Continue to Starting Point</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
