/**
 * NEXT MOVE AI V2 — FLOW 6: FEEDBACK & EVIDENCE SUMMARY MODAL
 * 
 * Displays supportive, evidence-grounded feedback after reflection.
 * Connects the student to their next move without opaque AI scores.
 */

"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, ArrowRight, Sparkles, X, RotateCcw } from "lucide-react";
import { type TrialFeedbackSummary } from "../types";

interface FeedbackSummaryModalProps {
  summary: TrialFeedbackSummary;
  onClose: () => void;
  onRetry?: () => void;
}

export function FeedbackSummaryModal({ summary, onClose, onRetry }: FeedbackSummaryModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-[#E8E6F3] flex flex-col overflow-hidden outline-none">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#E8E6F3] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669]">
                Evidence Recorded
              </span>
              <h1
                id="feedback-modal-title"
                className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight"
              >
                Experience Summary
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close summary"
            className="p-2 rounded-xl text-[#8C93AD] hover:text-[#171A2B] hover:bg-[#F4F3F8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 space-y-5 text-[#171A2B] overflow-y-auto">
          {/* Trial & Praise */}
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-[#171A2B]">{summary.trialTitle}</h2>
            <p className="text-xs text-[#474D66] leading-relaxed">{summary.completionPraise}</p>
          </div>

          {/* Genuine Evidence Added */}
          {summary.evidenceGenerated.status === "practised" ? (
            <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#065F46]">
                <ShieldCheck className="w-4 h-4 text-[#059669]" />
                <span>Evidence Ledger Addition</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#047857] font-semibold">Classification:</span>
                  <span className="bg-white text-[#059669] font-bold px-2 py-0.5 rounded-full text-[10px] border border-[#A7F3D0]">
                    Practised in Challenge
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#047857] font-semibold">Practised Competency:</span>
                  <span className="text-[#065F46] font-bold text-right">{summary.evidenceGenerated.competency}</span>
                </div>
              </div>
              <p className="text-[10px] italic text-[#047857] pt-1 border-t border-[#A7F3D0]/50 leading-relaxed">
                Truth Boundary: {summary.evidenceGenerated.truthBoundary}
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#92400E]">
                <ShieldCheck className="w-4 h-4 text-[#D97706]" />
                <span>Evidence Ledger Addition</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#B45309] font-semibold">Classification:</span>
                  <span className="bg-white text-[#B45309] font-bold px-2 py-0.5 rounded-full text-[10px] border border-[#FDE68A]">
                    Attempted (Reflection-Only)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#B45309] font-semibold">Explored Topic:</span>
                  <span className="text-[#92400E] font-bold text-right">{summary.evidenceGenerated.competency}</span>
                </div>
              </div>
              <p className="text-[10px] italic text-[#B45309] pt-1 border-t border-[#FDE68A]/60 leading-relaxed">
                Truth Boundary: {summary.evidenceGenerated.truthBoundary}
              </p>
            </div>
          )}

          {/* Synthesized Reflection Insights */}
          {summary.reflectionInsights.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#626987] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#6757F5]" />
                <span>Your Reflection Takeaways</span>
              </h3>
              <div className="space-y-2">
                {summary.reflectionInsights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-[#FAF9F6] border border-[#F0EEF8] text-xs text-[#31364F] leading-relaxed"
                  >
                    {insight}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actionable Next Steps */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#171A2B]">
              Recommended Next Moves
            </h3>
            <div className="space-y-2">
              {summary.recommendedNextActions.map((act) => (
                <Link
                  key={act.id}
                  href={act.targetUrl}
                  onClick={onClose}
                  className="p-3.5 rounded-2xl bg-white border border-[#E8E6F3] hover:border-[#6757F5] shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3 text-xs group"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#171A2B] group-hover:text-[#6757F5] transition-colors block">
                      {act.title}
                    </span>
                    <p className="text-[11px] text-[#626987] leading-snug">{act.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8C93AD] group-hover:text-[#6757F5] group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF9F6] border-t border-[#E8E6F3] flex items-center justify-between gap-2 shrink-0">
          {onRetry && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onRetry();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#626987] hover:text-[#171A2B] hover:bg-[#F4F3F8]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Challenge</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#171A2B] hover:bg-[#31364F] text-white text-xs font-bold transition-colors ml-auto"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
