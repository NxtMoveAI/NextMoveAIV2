"use client";

import React, { useState } from "react";
import { PARENT_PILLARS } from "@/data/landing-demo";
import {
  Sparkles,
  Eye,
  MessageSquareHeart,
  ShieldCheck,
  ChevronDown,
  Lock,
  ArrowRight,
} from "lucide-react";

export function ParentSection() {
  const [showDiscussionGuide, setShowDiscussionGuide] = useState(false);

  const getPillarIcon = (name: string) => {
    switch (name) {
      case "Eye":
        return Eye;
      case "MessageSquareHeart":
        return MessageSquareHeart;
      case "ShieldCheck":
      default:
        return ShieldCheck;
    }
  };

  return (
    <section
      id="for-parents"
      className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E8E6F3] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>For Parents</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A2B] tracking-tight">
            Help them explore. Support their decisions.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#31364F] leading-relaxed">
            Support your child’s educational choices with objective facts and constructive
            dialogue—while preserving their independence and private curiosity.
          </p>
        </div>

        {/* 3 Parent Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PARENT_PILLARS.map((pillar) => {
            const IconComp = getPillarIcon(pillar.iconName);
            return (
              <div
                key={pillar.title}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center mb-5">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#171A2B] mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#31364F] leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                  <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] text-xs text-[#626987] leading-relaxed">
                    <strong className="text-[#171A2B] block mb-0.5">How it works:</strong>
                    {pillar.howItWorks}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F0EEF8] flex items-center gap-2 text-[11px] text-[#6757F5] font-semibold">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>{pillar.studentRespectNote}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Parent-Student Discussion Guide Expandable */}
        <div className="rounded-3xl bg-white border-2 border-[#DDD8FE] p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6757F5]">
                  Constructive Family Conversations
                </span>
                <span className="text-[10px] bg-[#35B8C5]/15 text-[#21818B] px-2 py-0.5 rounded-full font-bold">
                  Guided Framework
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#171A2B]">
                Sample 5-Point Dining Table Discussion Guide
              </h3>
              <p className="text-xs sm:text-sm text-[#626987] mt-1">
                Designed to replace stressful conflict with curiosity when discussing 10th or 12th stream choices.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowDiscussionGuide(!showDiscussionGuide)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#6757F5] bg-[#EDEAFF] hover:bg-[#DDD8FE] transition-colors self-start sm:self-auto shrink-0"
              aria-expanded={showDiscussionGuide}
            >
              <span>{showDiscussionGuide ? "Hide Discussion Guide" : "Preview Discussion Guide"}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  showDiscussionGuide ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {showDiscussionGuide && (
            <div className="mt-6 pt-6 border-t border-[#E8E6F3] grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-1">
                <div className="text-xs font-bold text-[#6757F5]">
                  1. Question of Energy:
                </div>
                <p className="text-xs text-[#171A2B] font-medium">
                  &ldquo;Which subject homework made you lose track of time this month, and which one felt exhausting?&rdquo;
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-1">
                <div className="text-xs font-bold text-[#6757F5]">
                  2. Hands-on Trials:
                </div>
                <p className="text-xs text-[#171A2B] font-medium">
                  &ldquo;Can we try one 20-minute micro-trial together this Saturday before we talk about tuition classes?&rdquo;
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-1">
                <div className="text-xs font-bold text-[#6757F5]">
                  3. Multiple Parallel Pathways:
                </div>
                <p className="text-xs text-[#171A2B] font-medium">
                  &ldquo;What are 2 other exciting degrees or careers if the primary entrance exam cutoff is missed?&rdquo;
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-1">
                <div className="text-xs font-bold text-[#6757F5]">
                  4. Transparent Financials:
                </div>
                <p className="text-xs text-[#171A2B] font-medium">
                  &ldquo;Let’s review the true 4-year college tuition, hostel costs, and average starting median pay together.&rdquo;
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F6FF] border border-[#DDD8FE] md:col-span-2 flex items-center justify-between gap-4">
                <span className="text-xs text-[#31364F]">
                  <strong>Privacy Promise:</strong> Next Move AI never shares private student notes, test scores, or exploratory doubts without student consent.
                </span>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#6757F5] shrink-0"
                >
                  <span>Learn how it works</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
