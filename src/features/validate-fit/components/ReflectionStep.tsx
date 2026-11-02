/**
 * NEXT MOVE AI V2 — FLOW 6: POST-ACTIVITY REFLECTION MODAL
 * 
 * 5-point reflection capturing subjective student feelings, frictions, and intentions.
 * Strictly separates student reflection from objective task completion.
 */

"use client";

import React, { useState } from "react";
import { Sparkles, ThumbsUp, HelpCircle, Ban, ArrowRight, X } from "lucide-react";
import { type TrialActivity, type TrialReflection } from "../types";

interface ReflectionStepProps {
  trial: TrialActivity;
  onSubmit: (reflection: TrialReflection) => void;
  onCancel: () => void;
}

export function ReflectionStep({ trial, onSubmit, onCancel }: ReflectionStepProps) {
  const [enjoyed, setEnjoyed] = useState("");
  const [challenged, setChallenged] = useState("");
  const [learned, setLearned] = useState("");
  const [wouldExploreAgain, setWouldExploreAgain] = useState<"yes" | "maybe" | "not_for_me">("yes");
  const [whatTryDifferently, setWhatTryDifferently] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedEnjoyed = enjoyed.trim();
    const trimmedChallenged = challenged.trim();
    const trimmedLearned = learned.trim();
    const trimmedDifferently = whatTryDifferently.trim();

    const hasSubstantiveThought = Boolean(
      trimmedEnjoyed.length >= 3 ||
      trimmedChallenged.length >= 3 ||
      trimmedLearned.length >= 3 ||
      trimmedDifferently.length >= 3
    );

    if (!hasSubstantiveThought) {
      setValidationError("Please share at least one reflection thought on what you enjoyed, learned, or found challenging before submitting.");
      return;
    }

    setValidationError(null);
    onSubmit({
      enjoyed: trimmedEnjoyed,
      challenged: trimmedChallenged,
      learned: trimmedLearned,
      wouldExploreAgain,
      whatTryDifferently: trimmedDifferently,
    });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reflection-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-[#E8E6F3] flex flex-col overflow-hidden outline-none">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#E8E6F3] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
                Experiential Reflection · {trial.title}
              </span>
              <h1
                id="reflection-modal-title"
                className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight"
              >
                How did that feel?
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Close reflection"
            className="p-2 rounded-xl text-[#8C93AD] hover:text-[#171A2B] hover:bg-[#F4F3F8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#F0EEF8] text-xs text-[#474D66]">
            Reflecting on your experience turns an exercise into lasting clarity. There are no &quot;wrong&quot; answers—not enjoying something is just as valuable as loving it.
          </div>

          {/* Q1: What did you enjoy? */}
          <div className="space-y-1.5">
            <label
              htmlFor="ref-enjoyed"
              className="text-xs font-bold text-[#171A2B] block"
            >
              1. What part of this activity felt most engaging or natural to you?
            </label>
            <textarea
              id="ref-enjoyed"
              rows={2}
              value={enjoyed}
              onChange={(e) => setEnjoyed(e.target.value)}
              placeholder="e.g. 'I liked calculating the break-even math' or 'Sketching character expressions was fun...'"
              className="w-full p-3 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] text-xs text-[#171A2B] placeholder:text-[#8C93AD] focus:outline-none focus:ring-2 focus:ring-[#6757F5] transition-all resize-y"
            />
          </div>

          {/* Q2: What challenged you? */}
          <div className="space-y-1.5">
            <label
              htmlFor="ref-challenged"
              className="text-xs font-bold text-[#171A2B] block"
            >
              2. What was the hardest part or created friction?
            </label>
            <textarea
              id="ref-challenged"
              rows={2}
              value={challenged}
              onChange={(e) => setChallenged(e.target.value)}
              placeholder="e.g. 'Tracing boundary errors in code' or 'Balancing two bad tradeoffs...'"
              className="w-full p-3 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] text-xs text-[#171A2B] placeholder:text-[#8C93AD] focus:outline-none focus:ring-2 focus:ring-[#6757F5] transition-all resize-y"
            />
          </div>

          {/* Q3: Would you explore this again? */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#171A2B] block">
              3. Based on this trial, would you explore this direction further?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setWouldExploreAgain("yes")}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                  wouldExploreAgain === "yes"
                    ? "bg-[#ECFDF5] border-[#059669] text-[#059669] shadow-2xs"
                    : "bg-white border-[#E8E6F3] text-[#474D66] hover:bg-[#FAF9F6]"
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Yes, definitely</span>
              </button>

              <button
                type="button"
                onClick={() => setWouldExploreAgain("maybe")}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                  wouldExploreAgain === "maybe"
                    ? "bg-[#EFF6FF] border-[#1D4ED8] text-[#1D4ED8] shadow-2xs"
                    : "bg-white border-[#E8E6F3] text-[#474D66] hover:bg-[#FAF9F6]"
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Maybe / Unsure</span>
              </button>

              <button
                type="button"
                onClick={() => setWouldExploreAgain("not_for_me")}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                  wouldExploreAgain === "not_for_me"
                    ? "bg-[#FEF2F2] border-[#DC2626] text-[#DC2626] shadow-2xs"
                    : "bg-white border-[#E8E6F3] text-[#474D66] hover:bg-[#FAF9F6]"
                }`}
              >
                <Ban className="w-4 h-4" />
                <span>Not for me</span>
              </button>
            </div>
          </div>

          {/* Q4: What did you learn? */}
          <div className="space-y-1.5">
            <label
              htmlFor="ref-learned"
              className="text-xs font-bold text-[#171A2B] block"
            >
              4. What is the single biggest takeaway you learned?
            </label>
            <input
              id="ref-learned"
              type="text"
              value={learned}
              onChange={(e) => setLearned(e.target.value)}
              placeholder="e.g. 'I learned how Big-O log time scales with data'"
              className="w-full p-3 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] text-xs text-[#171A2B] placeholder:text-[#8C93AD] focus:outline-none focus:ring-2 focus:ring-[#6757F5] transition-all"
            />
          </div>

          {/* Q5: What would you try differently? */}
          <div className="space-y-1.5">
            <label
              htmlFor="ref-differently"
              className="text-xs font-bold text-[#171A2B] block"
            >
              5. What would you do differently next time?
            </label>
            <input
              id="ref-differently"
              type="text"
              value={whatTryDifferently}
              onChange={(e) => setWhatTryDifferently(e.target.value)}
              placeholder="e.g. 'I would sketch thumbnail outlines before inking'"
              className="w-full p-3 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] text-xs text-[#171A2B] placeholder:text-[#8C93AD] focus:outline-none focus:ring-2 focus:ring-[#6757F5] transition-all"
            />
          </div>

          {/* Validation Notice */}
          {validationError && (
            <div
              role="alert"
              className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#DC2626] font-semibold animate-in fade-in"
            >
              ⚠️ {validationError}
            </div>
          )}

          {/* Footer Submit */}
          <div className="pt-3 border-t border-[#E8E6F3] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#626987] hover:bg-[#F4F3F8]"
            >
              Back to Activity
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold shadow-sm transition-all"
            >
              <span>Record Evidence & View Summary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

