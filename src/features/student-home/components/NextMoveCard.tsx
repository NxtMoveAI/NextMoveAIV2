/**
 * NEXT MOVE AI V2 — YOUR NEXT MOVE CARD (PRIMARY INTELLIGENT WIDGET)
 * 
 * The central decision widget on the Home Dashboard.
 * Answers: "What is one useful thing I can do today?"
 * Features:
 * - Clear recommended action
 * - Why-this-suggestion grounded disclosure
 * - Effort / time estimate
 * - Interactive alternative selection
 * - Postponement & restoration
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Target,
  Clock,
  HelpCircle,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Calendar,
} from "lucide-react";
import { useStudentHome } from "../hooks/useStudentHome";

export function NextMoveCard() {
  const {
    viewModel,
    selectAlternativeMove,
    restoreSuggestedMove,
    postponeMove,
  } = useStudentHome();

  const [showWhy, setShowWhy] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);

  const activeMove = viewModel.recommendedNextAction;
  const alternatives = viewModel.alternativeNextActions;
  const isPostponed = activeMove.status === "postponed";
  const isAlternative = activeMove.isAlternative || activeMove.status === "alternative_selected";

  return (
    <section
      id="next-move"
      aria-labelledby="next-move-heading"
      className={`relative p-6 sm:p-8 rounded-3xl border transition-all duration-200 ${
        isPostponed
          ? "bg-[#F4F3F8] border-[#E8E6F3]"
          : "bg-white border-[#DDD8FE] shadow-md shadow-[#6757F5]/5 ring-1 ring-[#6757F5]/10"
      }`}
    >
      {/* Top Banner & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E6F3]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#6757F5] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#6757F5]/25">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="next-move-heading"
                className="text-lg sm:text-xl font-black text-[#171A2B] tracking-tight"
              >
                Your next move
              </h2>
              {isAlternative && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]">
                  Alternative Chosen
                </span>
              )}
            </div>
            <p className="text-xs text-[#626987]">
              One useful, practical action you can do today
            </p>
          </div>
        </div>

        {/* Estimated effort badge */}
        {!isPostponed && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F6FF] text-[#6757F5] border border-[#DDD8FE] text-xs font-bold self-start sm:self-auto">
            <Clock className="w-3.5 h-3.5" />
            <span>{activeMove.effortMinutes} mins</span>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {isPostponed ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#E8E6F3] text-[#626987] flex items-center justify-center mx-auto">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#171A2B]">
              Action postponed for later
            </h3>
            <p className="text-xs text-[#626987] max-w-md mx-auto">
              No pressure. Exploration happens at your pace. You can return to this suggested action anytime.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={restoreSuggestedMove}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold shadow-md shadow-[#6757F5]/20 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restore suggested move</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="pt-5 space-y-5">
          {/* Action Title & Description */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-[#171A2B] leading-snug">
              {activeMove.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#31364F] leading-relaxed">
              {activeMove.description}
            </p>
          </div>

          {/* Learning Outcome Pill */}
          <div className="p-3.5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE]/60 flex items-start gap-2.5 text-xs text-[#31364F]">
            <Sparkles className="w-4 h-4 text-[#6757F5] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#171A2B] block">What you&apos;ll learn or clarify:</span>
              <span className="text-[#626987]">{activeMove.learningOutcome}</span>
            </div>
          </div>

          {/* Why disclosure trigger & content */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setShowWhy(!showWhy)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6757F5] hover:text-[#5342E8] transition-colors"
              aria-expanded={showWhy}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showWhy ? "Hide why this was suggested" : "Why was this action suggested?"}</span>
            </button>

            {showWhy && (
              <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] space-y-1 animate-in fade-in duration-200">
                <span className="font-bold block">Grounded Suggestion Basis:</span>
                <p className="leading-relaxed">{activeMove.whySuggested}</p>
                <p className="text-[11px] text-[#B45309] italic pt-0.5">
                  Context: {activeMove.supportingContext}
                </p>
              </div>
            )}
          </div>

          {/* Action CTAs & Controls */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#E8E6F3]">
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href={`/dashboard/student/projects?action=${activeMove.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold shadow-md shadow-[#6757F5]/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Start This Action</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setShowAlternatives(!showAlternatives)}
                className="px-4 py-3 rounded-xl bg-[#F4F3F8] hover:bg-[#E8E6F3] text-[#31364F] text-xs font-bold transition-colors"
                aria-expanded={showAlternatives}
              >
                <span>{showAlternatives ? "Hide Alternatives" : "Choose an Alternative"}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {isAlternative && (
                <button
                  type="button"
                  onClick={restoreSuggestedMove}
                  className="text-xs font-semibold text-[#6757F5] hover:underline"
                >
                  Reset to Recommended
                </button>
              )}

              <button
                type="button"
                onClick={postponeMove}
                className="text-xs font-medium text-[#8C93AD] hover:text-[#474D66] transition-colors p-1"
              >
                Postpone for later
              </button>
            </div>
          </div>

          {/* Alternatives Drawer/Accordion */}
          {showAlternatives && (
            <div className="mt-4 pt-4 border-t border-[#E8E6F3] space-y-3 animate-in fade-in duration-200">
              <span className="text-xs font-bold text-[#171A2B] block">
                Choose an alternative next move that fits your mood today:
              </span>

              <div className="space-y-2.5">
                {alternatives.map((alt) => {
                  const isCurrent = activeMove.id === alt.id;
                  return (
                    <div
                      key={alt.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isCurrent
                          ? "bg-[#EDEAFF] border-[#6757F5]"
                          : "bg-[#F7F6FF] border-[#DDD8FE]/60 hover:border-[#6757F5]/60"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1.5">
                        <span className="text-xs sm:text-sm font-bold text-[#171A2B]">
                          {alt.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#6757F5] border border-[#DDD8FE]">
                            ~{alt.effortMinutes} mins
                          </span>
                          {!isCurrent && (
                            <button
                              type="button"
                              onClick={() => {
                                selectAlternativeMove(alt.id);
                                setShowAlternatives(false);
                              }}
                              className="px-3 py-1 rounded-lg bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5342E8] transition-colors"
                            >
                              Select this move
                            </button>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-[#474D66] leading-relaxed">
                        {alt.description}
                      </p>
                      <p className="text-[11px] text-[#626987] italic pt-1">
                        Why: {alt.whySuggested}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
