/**
 * NEXT MOVE AI V2 — PATHWAY DETAIL MODAL / SLIDING SHEET
 * 
 * Deep dive exploration experience:
 * - What the pathway involves & what people learn or do
 * - Typical day-in-the-life schedule & environment
 * - Useful skills and subject foundations (subjects, tools, thinking dispositions)
 * - Possible educational routes & duration
 * - Eligibility considerations & honest academic trade-offs (NO fake cutoffs/salaries)
 * - How to explore before committing (low-stakes micro-trial challenge)
 * - What remains unknown
 * - Alternative & related pathways
 * - Honest bridges to Validate Fit (Flow 6) and Build My Next Move (Flow 7)
 */

"use client";

import React, { useEffect, useRef } from "react";
import {
  X,
  Bookmark,
  Calendar,
  GraduationCap,
  Sparkles,
  Layers,
  ArrowRight,
  HelpCircle,
  AlertCircle,
  Workflow,
  Compass,
} from "lucide-react";
import { type Pathway } from "../types";

interface PathwayDetailModalProps {
  pathway: Pathway | null;
  isSaved: boolean;
  isComparing: boolean;
  onClose: () => void;
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectAlternative: (pathwayId: string) => void;
}

export function PathwayDetailModal({
  pathway,
  isSaved,
  isComparing,
  onClose,
  onToggleSave,
  onToggleCompare,
  onSelectAlternative,
}: PathwayDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (pathway) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [pathway, onClose]);

  if (!pathway) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pathway-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-[#E8E6F3] flex flex-col overflow-hidden outline-none"
      >
        {/* Sticky Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#E8E6F3] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#6757F5] bg-[#EDEAFF] px-2.5 py-0.5 rounded-full">
              {pathway.categoryLabel}
            </span>
            <span className="text-[10px] font-bold text-[#8C93AD] bg-[#F4F3F8] px-2 py-0.5 rounded-full">
              {pathway.type.replace("_", " ").toUpperCase()}
            </span>
          </div>

          {/* Header Action Buttons: Save, Compare & Close */}
          <div className="flex items-center gap-2">
            {/* Compare Toggle */}
            <button
              type="button"
              onClick={() => onToggleCompare(pathway.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                isComparing
                  ? "bg-[#6757F5] text-white shadow-xs"
                  : "bg-[#F4F3F8] text-[#474D66] hover:bg-[#EDEAFF] hover:text-[#6757F5]"
              }`}
            >
              <span>{isComparing ? "In Comparison" : "Add to Compare"}</span>
            </button>

            {/* Bookmark Toggle */}
            <button
              type="button"
              onClick={() => onToggleSave(pathway.id)}
              aria-label={isSaved ? "Remove from saved" : "Save this pathway"}
              className={`p-2 rounded-xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                isSaved
                  ? "bg-[#EDEAFF] border-[#DDD8FE] text-[#6757F5]"
                  : "border-[#E8E6F3] text-[#8C93AD] hover:text-[#6757F5] hover:bg-[#F4F3F8]"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-[#6757F5]" : ""}`} />
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close pathway detail"
              className="p-2 rounded-xl text-[#8C93AD] hover:text-[#171A2B] hover:bg-[#F4F3F8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-7 text-[#171A2B]">
          {/* Title and Detailed Overview */}
          <div className="space-y-2">
            <h1
              id="pathway-modal-title"
              className="text-xl sm:text-2xl font-black text-[#171A2B] tracking-tight leading-snug"
            >
              {pathway.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#474D66] leading-relaxed">
              {pathway.detailedOverview}
            </p>
          </div>

          {/* Section 1: What People Learn or Do */}
          <section aria-labelledby="section-learn-do" className="space-y-3">
            <h2
              id="section-learn-do"
              className="text-sm font-black text-[#171A2B] uppercase tracking-wider flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-[#6757F5]" />
              <span>What You Learn and Do in this Pathway</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {pathway.whatPeopleLearnOrDo.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-[#FAF9F6] border border-[#F0EEF8] text-xs text-[#31364F] flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6757F5] mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Typical Day in the Life */}
          <section aria-labelledby="section-day-life" className="space-y-3">
            <h2
              id="section-day-life"
              className="text-sm font-black text-[#171A2B] uppercase tracking-wider flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#6757F5]" />
              <span>Typical Day-in-the-Life Schedule</span>
            </h2>
            <div className="space-y-3">
              {pathway.dayInTheLife.map((block, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-[#E8E6F3] shadow-2xs space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-[#171A2B]">{block.title}</span>
                    <span className="font-semibold text-[#6757F5] bg-[#EDEAFF] px-2 py-0.5 rounded-full text-[11px]">
                      {block.timeframe}
                    </span>
                  </div>
                  <ul className="space-y-1 list-disc list-inside text-xs text-[#474D66]">
                    {block.activities.map((act, aIdx) => (
                      <li key={aIdx}>{act}</li>
                    ))}
                  </ul>
                  <div className="text-[11px] text-[#8C93AD] italic pt-1 border-t border-[#F0EEF8]">
                    Environment: {block.environmentNote}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Useful Skills & Subject Foundations */}
          <section aria-labelledby="section-skills" className="space-y-3">
            <h2
              id="section-skills"
              className="text-sm font-black text-[#171A2B] uppercase tracking-wider flex items-center gap-2"
            >
              <Workflow className="w-4 h-4 text-[#6757F5]" />
              <span>Useful Skills & Subject Foundations</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {pathway.foundationalSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] space-y-1"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5] block">
                    {skill.category.replace("_", " ")}
                  </span>
                  <h3 className="text-xs font-bold text-[#171A2B]">{skill.name}</h3>
                  <p className="text-[11px] text-[#474D66] leading-snug">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Educational Routes & Duration */}
          <section aria-labelledby="section-routes" className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2
                id="section-routes"
                className="text-sm font-black text-[#171A2B] uppercase tracking-wider flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-[#6757F5]" />
                <span>Illustrative Educational Routes & Entrance Exam Examples</span>
              </h2>
              <span className="text-[10px] font-bold text-[#626987] bg-[#F4F3F8] px-2.5 py-0.5 rounded-full border border-[#E8E6F3]">
                Reference: AICTE / UGC / Official Portals (2025–2026)
              </span>
            </div>
            <div className="space-y-3">
              {pathway.educationRoutes.map((route) => (
                <div
                  key={route.id}
                  className="p-4 rounded-2xl bg-white border border-[#E8E6F3] space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-[#171A2B]">
                      {route.title}
                    </h3>
                    <span className="text-[11px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                      {route.duration}
                    </span>
                  </div>
                  <div className="text-xs text-[#474D66] space-y-1">
                    <div>
                      <strong className="text-[#171A2B]">Prerequisites: </strong>
                      {route.prerequisites}
                    </div>
                    <div>
                      <strong className="text-[#171A2B]">Workload Reality: </strong>
                      {route.honestWorkloadNote}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#626987] italic pt-1 leading-relaxed">
              *Entrance examinations (e.g. JEE, CUET, NID, GATE) and degree durations are presented as illustrative examples derived from official accrediting bodies. Specific cutoffs, seat allocations, and criteria vary annually and must be verified on official examination portals.
            </p>
          </section>

          {/* Section 5: Eligibility & Academic Realities */}
          <section aria-labelledby="section-realities" className="space-y-3">
            <h2
              id="section-realities"
              className="text-sm font-black text-[#171A2B] uppercase tracking-wider flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-[#D97706]" />
              <span>Eligibility & Honest Academic Realities</span>
            </h2>
            <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] space-y-2">
              <div>
                <strong className="text-[#B45309]">Baseline Requirements: </strong>
                {pathway.eligibilityAndRealities.prerequisitesText}
              </div>
              <div>
                <strong className="text-[#B45309]">Tradeoffs to consider:</strong>
                <ul className="mt-1 space-y-0.5 list-disc list-inside">
                  {pathway.eligibilityAndRealities.tradeoffsToConsider.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="text-[11px] italic text-[#B45309] pt-1 border-t border-[#FDE68A]">
                Notice: {pathway.eligibilityAndRealities.honestDisclaimer} We never invent admission cutoffs or guarantee placements. Entrance requirements reflect established institutional guidelines (AICTE / UGC / NTA); Next Move AI does not publish speculative ranks, scores, or commercial admission guarantees.
              </div>
            </div>
          </section>

          {/* Section 6: How to Explore Before Committing (Micro-Trial) */}
          <section aria-labelledby="section-trial" className="space-y-3">
            <h2
              id="section-trial"
              className="text-sm font-black text-[#171A2B] uppercase tracking-wider flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#6757F5]" />
              <span>How to Explore Before Committing (Low-Stakes Trial)</span>
            </h2>
            <div className="p-5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-[#171A2B]">
                  {pathway.beforeYouCommitTrial.title}
                </h3>
                <span className="text-[11px] font-bold text-[#6757F5] bg-white px-2.5 py-0.5 rounded-full border border-[#DDD8FE]">
                  ~{pathway.beforeYouCommitTrial.estimatedMinutes} Minutes
                </span>
              </div>
              <p className="text-xs text-[#474D66]">
                {pathway.beforeYouCommitTrial.objective}
              </p>
              <div className="space-y-1.5 text-xs text-[#31364F]">
                <strong className="block text-[#171A2B]">Step-by-step trial prompt:</strong>
                <ol className="space-y-1 list-decimal list-inside text-[#626987]">
                  {pathway.beforeYouCommitTrial.stepByStepPrompt.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
              <div className="text-xs font-semibold text-[#6757F5] pt-1">
                Deliverable: {pathway.beforeYouCommitTrial.deliverable}
              </div>
            </div>
          </section>

          {/* Section 7: What Remains Unknown */}
          <section aria-labelledby="section-unknown" className="space-y-2">
            <h2
              id="section-unknown"
              className="text-sm font-black text-[#171A2B] uppercase tracking-wider flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-[#D97706]" />
              <span>What Remains Unknown</span>
            </h2>
            <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] text-xs text-[#474D66]">
              <p className="leading-relaxed">{pathway.whatRemainsUnknown}</p>
            </div>
          </section>

          {/* Section 8: Alternative & Related Pathways */}
          {pathway.alternativePathways.length > 0 && (
            <section aria-labelledby="section-alternatives" className="space-y-3">
              <h2
                id="section-alternatives"
                className="text-sm font-black text-[#171A2B] uppercase tracking-wider flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#6757F5]" />
                <span>Alternative & Related Pathways</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pathway.alternativePathways.map((alt) => (
                  <button
                    key={alt.pathwayId}
                    type="button"
                    onClick={() => onSelectAlternative(alt.pathwayId)}
                    className="p-3.5 rounded-2xl bg-white border border-[#E8E6F3] hover:border-[#6757F5] text-left transition-all group flex flex-col justify-between space-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#171A2B] group-hover:text-[#6757F5] transition-colors">
                        {alt.title}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8C93AD] group-hover:text-[#6757F5] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                    <p className="text-[11px] text-[#626987] leading-snug">
                      {alt.relationshipDescription}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Section 9: Honest Future Roadmap Bridge */}
          <section
            aria-labelledby="section-roadmap-bridge"
            className="p-4 sm:p-5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-3"
          >
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#626987]">
              <span>Next Steps in Your Journey</span>
              <span className="text-[10px] font-bold text-[#D97706] bg-[#FFFBEB] border border-[#FDE68A] px-2 py-0.5 rounded-full">
                Upcoming Roadmap Modules
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#E8E6F3] space-y-1">
                <span className="font-bold text-[#6757F5] block">
                  Flow 6 — Validate Fit (Coming Next)
                </span>
                <p className="text-[#626987] text-[11px] leading-snug">
                  Diagnostic simulations and verified skill tasks to test your genuine day-to-day alignment before making high-stakes decisions.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E8E6F3] space-y-1">
                <span className="font-bold text-[#059669] block">
                  Flow 7 — Build My Next Move
                </span>
                <p className="text-[#626987] text-[11px] leading-snug">
                  Personalized week-by-week action plans, portfolio milestones, and mentor feedback checkpoints.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#FAF9F6] border-t border-[#E8E6F3] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-[#626987]">
            Saved to your exploration list? Use the bookmark icon above.
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#171A2B] hover:bg-[#31364F] text-white text-xs font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
          >
            Done Exploring This Pathway
          </button>
        </div>
      </div>
    </div>
  );
}

