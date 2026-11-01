/**
 * NEXT MOVE AI V2 — PROVENANCE TRANSPARENCY MODAL
 * 
 * "Why am I seeing this?" modal detailing exact signals:
 * - Academic stage alignment
 * - Self-reported interests (explicitly labeled as self-reported, not aptitude scores)
 * - Demonstrated mini-challenge evidence (if completed in Flow 3)
 * - Undecided exploratory setting (if still exploring)
 * - Strict prohibition of fake match percentages or predictive ranks
 */

"use client";

import React, { useEffect } from "react";
import { X, Sparkles, CheckCircle2, ShieldCheck, Info } from "lucide-react";
import { type Pathway, type PathwayProvenance } from "../types";

interface WhyRecommendationModalProps {
  pathway: Pathway | null;
  provenance: PathwayProvenance | null;
  onClose: () => void;
}

export function WhyRecommendationModal({
  pathway,
  provenance,
  onClose,
}: WhyRecommendationModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (pathway && provenance) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [pathway, provenance, onClose]);

  if (!pathway || !provenance) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="provenance-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-[#E8E6F3] flex flex-col overflow-hidden outline-none">
        {/* Sticky Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#E8E6F3] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
                Recommendation Provenance
              </span>
              <h1
                id="provenance-modal-title"
                className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight"
              >
                Why are you seeing this?
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close provenance modal"
            className="p-2 rounded-xl text-[#8C93AD] hover:text-[#171A2B] hover:bg-[#F4F3F8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 space-y-5 text-[#171A2B] overflow-y-auto">
          {/* Pathway Title Context */}
          <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#F0EEF8] space-y-1">
            <span className="text-[11px] font-bold text-[#6757F5]">
              {pathway.categoryLabel}
            </span>
            <h2 className="text-sm font-bold text-[#171A2B]">
              {pathway.title}
            </h2>
            <p className="text-xs text-[#474D66]">
              {provenance.primaryReason}
            </p>
          </div>

          {/* Explicit Signals Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#626987] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              <span>Verified Signals Used</span>
            </h3>

            <div className="space-y-2.5">
              {provenance.signals.map((signal, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-[#E8E6F3] space-y-1 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span className="font-bold text-[#171A2B]">{signal.label}</span>
                  </div>
                  <p className="text-[#474D66] pl-6 leading-relaxed">
                    {signal.description}
                  </p>
                  <div className="pl-6 text-[11px] font-medium text-[#626987] italic">
                    Truth Boundary: {signal.truthBoundary}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Epistemic Honesty Guarantee */}
          <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-xs text-[#31364F] space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#6757F5]">
              <Info className="w-4 h-4" />
              <span>Next Move AI Epistemic Guarantee</span>
            </div>
            <p className="text-[11px] text-[#474D66] leading-relaxed">
              {provenance.epistemicDisclaimer}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF9F6] border-t border-[#E8E6F3] flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#171A2B] hover:bg-[#31364F] text-white text-xs font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
