/**
 * NEXT MOVE AI V2 — PATHWAY CARD COMPONENT
 * 
 * Epistemically honest pathway card with:
 * - Age-appropriate stage label
 * - Type badge (Traditional, Emerging, Practical, Curiosity)
 * - Transparent provenance trigger ("Why am I seeing this?")
 * - Bookmark / Save toggle
 * - Side-by-side compare checkbox
 * - Detail inspection trigger
 */

"use client";

import React from "react";
import {
  Bookmark,
  Sparkles,
  ArrowRight,
  Layers,
  HelpCircle,
} from "lucide-react";
import { type Pathway } from "../types";

interface PathwayCardProps {
  pathway: Pathway;
  isSaved: boolean;
  isComparing: boolean;
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onOpenDetail: (pathway: Pathway) => void;
  onOpenProvenance: (pathway: Pathway) => void;
}

export function PathwayCard({
  pathway,
  isSaved,
  isComparing,
  onToggleSave,
  onToggleCompare,
  onOpenDetail,
  onOpenProvenance,
}: PathwayCardProps) {
  const typeBadgeLabel = getTypeBadgeLabel(pathway.type);
  const stageBadgeLabel = getStageBadgeLabel(pathway.stageSuitability[0]);

  return (
    <article
      aria-labelledby={`pathway-title-${pathway.id}`}
      className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs hover:border-[#DDD8FE] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
    >
      <div className="space-y-3.5">
        {/* Top Badges & Save/Compare toolbar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Stage Badge */}
            <span className="text-[10px] font-black uppercase tracking-wider text-[#171A2B] bg-[#F4F3F8] px-2 py-0.5 rounded-full">
              {stageBadgeLabel}
            </span>

            {/* Type Badge */}
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getTypeBadgeStyle(
                pathway.type
              )}`}
            >
              {typeBadgeLabel}
            </span>
          </div>

          {/* Quick Actions: Save Bookmark & Compare Checkbox */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Compare Checkbox */}
            <label
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#626987] hover:text-[#171A2B] cursor-pointer px-1.5 py-0.5 rounded-lg hover:bg-[#F4F3F8]"
              title="Add to side-by-side comparison"
            >
              <input
                type="checkbox"
                checked={isComparing}
                onChange={() => onToggleCompare(pathway.id)}
                className="w-3.5 h-3.5 rounded border-[#DDD8FE] text-[#6757F5] focus:ring-[#6757F5] cursor-pointer"
                aria-label={`Compare ${pathway.title}`}
              />
              <span className="hidden sm:inline">Compare</span>
            </label>

            {/* Save Bookmark Button */}
            <button
              type="button"
              onClick={() => onToggleSave(pathway.id)}
              aria-label={isSaved ? `Remove ${pathway.title} from saved` : `Save ${pathway.title}`}
              className={`p-1.5 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                isSaved
                  ? "bg-[#EDEAFF] text-[#6757F5]"
                  : "text-[#8C93AD] hover:text-[#6757F5] hover:bg-[#F4F3F8]"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-[#6757F5]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Title & Category */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-[#6757F5] tracking-tight">
            {pathway.categoryLabel}
          </span>
          <h2
            id={`pathway-title-${pathway.id}`}
            className="text-base sm:text-lg font-black text-[#171A2B] leading-snug group-hover:text-[#6757F5] transition-colors"
          >
            {pathway.title}
          </h2>
          <p className="text-xs text-[#474D66] leading-relaxed line-clamp-2">
            {pathway.headlineSummary}
          </p>
        </div>

        {/* What people learn or do preview */}
        <div className="p-3 rounded-2xl bg-[#FAF9F6] text-[11px] text-[#31364F] space-y-1">
          <span className="font-bold text-[#171A2B] block">What you explore:</span>
          <ul className="space-y-1 list-disc list-inside text-[#626987]">
            {pathway.whatPeopleLearnOrDo.slice(0, 2).map((item, idx) => (
              <li key={idx} className="line-clamp-1">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Foundational Skills Preview */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-bold text-[#8C93AD] uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-3 h-3" />
            Skills:
          </span>
          {pathway.foundationalSkills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-[#F4F3F8] text-[#474D66] text-[10px] font-medium"
            >
              {skill.name}
            </span>
          ))}
        </div>

        {/* What remains unknown boundary */}
        <div className="p-2.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[11px] text-[#92400E] space-y-0.5">
          <span className="font-bold text-[#B45309] flex items-center gap-1">
            <HelpCircle className="w-3 h-3" />
            <span>Critical question:</span>
          </span>
          <p className="leading-normal line-clamp-2">{pathway.whatRemainsUnknown}</p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-[#F0EEF8] flex items-center justify-between gap-2">
        {/* Why am I seeing this? */}
        <button
          type="button"
          onClick={() => onOpenProvenance(pathway)}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#6757F5] hover:text-[#5342E8] py-1 px-2 rounded-lg hover:bg-[#EDEAFF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
        >
          <Sparkles className="w-3 h-3" />
          <span>Why this?</span>
        </button>

        {/* Explore Full Pathway CTA */}
        <button
          type="button"
          onClick={() => onOpenDetail(pathway)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
        >
          <span>Explore Pathway</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
}

function getTypeBadgeLabel(type: string): string {
  switch (type) {
    case "curiosity_theme":
      return "Curiosity Theme";
    case "foundational_stream":
      return "Foundational Stream";
    case "traditional_degree":
      return "Traditional Degree";
    case "emerging_frontier":
      return "Emerging Frontier";
    case "practical_lateral":
      return "Practical / Lateral";
    case "exploratory_general":
      return "Broad Exploratory";
    default:
      return "Pathway";
  }
}

function getTypeBadgeStyle(type: string): string {
  switch (type) {
    case "curiosity_theme":
      return "bg-[#ECFDF5] text-[#059669]";
    case "foundational_stream":
      return "bg-[#E0F2FE] text-[#0284C7]";
    case "traditional_degree":
      return "bg-[#EDEAFF] text-[#6757F5]";
    case "emerging_frontier":
      return "bg-[#F5EEFE] text-[#9333EA]";
    case "practical_lateral":
      return "bg-[#FFFBEB] text-[#D97706]";
    case "exploratory_general":
      return "bg-[#E6F9FB] text-[#0891B2]";
    default:
      return "bg-[#F4F3F8] text-[#474D66]";
  }
}

function getStageBadgeLabel(stageId?: string): string {
  switch (stageId) {
    case "classes-4-7":
      return "Classes 4–7";
    case "classes-8-10":
      return "Classes 8–10";
    case "classes-11-12":
      return "Classes 11–12";
    case "diploma":
      return "Diploma";
    case "degree-engineering":
      return "Degree / Eng";
    case "final-year-grad":
      return "Final Year";
    default:
      return "All Stages";
  }
}

