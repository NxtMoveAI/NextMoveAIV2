/**
 * NEXT MOVE AI V2 — SUBCATEGORY PICKER
 * 
 * Collapsible/revealed sub-interests for selected top-level domains.
 */

"use client";

import React from "react";
import { Check } from "lucide-react";
import { type InterestCategory } from "../schemas/types";

interface InterestSubcategoryPickerProps {
  category: InterestCategory;
  selectedSubInterestIds: string[];
  onToggleSubInterest: (subInterestId: string) => void;
}

export function InterestSubcategoryPicker({
  category,
  selectedSubInterestIds,
  onToggleSubInterest,
}: InterestSubcategoryPickerProps) {
  return (
    <div className="mt-3 pt-3 border-t border-[#DDD8FE] space-y-2">
      <div className="text-[11px] font-bold text-[#6757F5] uppercase tracking-wider">
        Explore topics within {category.title}:
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {category.subInterests.map((sub) => {
          const isSelected = selectedSubInterestIds.includes(sub.id);
          return (
            <button
              key={sub.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSubInterest(sub.id);
              }}
              className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-start justify-between gap-2 ${
                isSelected
                  ? "bg-white border-[#6757F5] shadow-xs ring-1 ring-[#6757F5]/30"
                  : "bg-white/70 border-[#E8E6F3] hover:bg-white hover:border-[#DDD8FE]"
              }`}
            >
              <div>
                <span className={`font-bold block ${isSelected ? "text-[#5342E8]" : "text-[#171A2B]"}`}>
                  {sub.name}
                </span>
                <span className="text-[11px] text-[#626987] leading-tight block mt-0.5">
                  {sub.description}
                </span>
              </div>
              <div
                className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                  isSelected
                    ? "bg-[#6757F5] border-[#6757F5] text-white"
                    : "border-[#DDD8FE] bg-white"
                }`}
              >
                {isSelected && <Check className="w-3 h-3" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
