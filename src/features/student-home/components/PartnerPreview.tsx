/**
 * NEXT MOVE AI V2 — MY PARTNER PREVIEW
 * 
 * Contextual guidance preview.
 * Answers student questions with structured, deterministic guidance cards:
 * 1. Acknowledgement
 * 2. Two exploration directions
 * 3. One important unknown / trade-off
 * 4. One practical suggested action
 * Explicitly labeled as demo preview without fake LLM chat transcripts.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import { type PartnerQuestionPrompt } from "../schemas/types";

interface PartnerPreviewProps {
  prompts: PartnerQuestionPrompt[];
  stageLabel: string;
}

export function PartnerPreview({ prompts, stageLabel }: PartnerPreviewProps) {
  const [selectedPromptId, setSelectedPromptId] = useState<string>(
    prompts[0]?.id || ""
  );

  const activePrompt = prompts.find((p) => p.id === selectedPromptId) || prompts[0];

  if (!activePrompt) {
    return null;
  }

  const { response } = activePrompt;

  return (
    <section id="partner-preview" aria-labelledby="partner-heading" className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6757F5] to-[#9333EA] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#6757F5]/25">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="partner-heading"
                className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight"
              >
                My Partner Preview
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EDEAFF] text-[#6757F5]">
                Contextual Guide
              </span>
            </div>
            <p className="text-xs text-[#626987]">
              Context-grounded guidance • No hallucinations or ungrounded predictions
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/student/partner"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] hover:text-[#5342E8] transition-colors self-start sm:self-auto"
        >
          <span>Ask a custom question</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Container */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#DDD8FE] shadow-sm space-y-6">
        {/* Question Selector Tabs */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
            Choose a common {stageLabel} question to preview guidance:
          </span>
          <div className="flex flex-wrap gap-2">
            {prompts.map((p) => {
              const isSelected = p.id === activePrompt.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPromptId(p.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center gap-2 ${
                    isSelected
                      ? "bg-[#6757F5] text-white shadow-sm shadow-[#6757F5]/25"
                      : "bg-[#F4F3F8] text-[#474D66] hover:bg-[#EDEAFF] hover:text-[#6757F5]"
                  }`}
                  aria-pressed={isSelected}
                >
                  <Lightbulb className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-white" : "text-[#6757F5]"}`} />
                  <span>&ldquo;{p.question}&rdquo;</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Structured Response Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#F7F6FF] to-white border border-[#DDD8FE] space-y-4 animate-in fade-in duration-200">
          {/* Section 1: Acknowledgement */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
              1. Understanding Your Dilemma
            </span>
            <p className="text-xs sm:text-sm font-semibold text-[#171A2B] leading-relaxed">
              {response.acknowledgement}
            </p>
          </div>

          {/* Section 2: Two Exploration Directions */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
              2. Two Grounded Exploration Directions
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-white border border-[#E8E6F3] space-y-1 shadow-2xs">
                <span className="text-[10px] font-bold text-[#6757F5] block">Direction A</span>
                <p className="text-xs text-[#31364F] leading-snug">
                  {response.explorationDirections[0]}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E8E6F3] space-y-1 shadow-2xs">
                <span className="text-[10px] font-bold text-[#6757F5] block">Direction B</span>
                <p className="text-xs text-[#31364F] leading-snug">
                  {response.explorationDirections[1]}
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Trade-off / Unknown */}
          <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] space-y-0.5">
            <span className="font-bold text-[#D97706] block">
              3. Important Trade-Off or Unknown to Keep in Mind:
            </span>
            <p className="leading-relaxed">{response.tradeoffOrUnknown}</p>
          </div>

          {/* Section 4: Suggested Action */}
          <div className="p-3.5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-xs text-[#065F46] flex items-start justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-[#059669] block">
                4. Practical Suggested Action:
              </span>
              <p className="leading-relaxed">{response.suggestedFirstStep}</p>
            </div>
            <a
              href="#next-move"
              className="px-3 py-1.5 rounded-lg bg-[#059669] text-white text-[11px] font-bold hover:bg-[#047857] shrink-0 self-center transition-colors"
            >
              Take Action
            </a>
          </div>
        </div>

        {/* Demo preview notice */}
        <p className="text-[11px] text-[#8C93AD] text-center italic">
          Demo preview • In future releases, My Partner provides continuous personal context-aware guidance powered by Havyas&apos;s verified knowledge engine.
        </p>
      </div>
    </section>
  );
}
