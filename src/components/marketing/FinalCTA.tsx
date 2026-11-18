"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import { useIsMarketingMode } from "@/lib/deployment-mode";

export function FinalCTA() {
  const isMarketing = useIsMarketingMode();

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-[#FAF9F6] relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#EDEAFF] via-[#E8F9FA] to-[#EDEAFF] rounded-full blur-3xl opacity-70 pointer-events-none -z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Philosophy Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] border border-[#DDD8FE] text-[#6757F5] text-xs font-semibold mb-6 shadow-xs">
          <Sparkles className="w-4 h-4 text-[#6757F5]" />
          <span>A place to start, not a finish line</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight max-w-3xl mx-auto leading-tight">
          You don’t need every answer today. You just need a place to begin.
        </h2>

        {/* Supporting Line */}
        <p className="mt-6 text-base sm:text-xl text-[#31364F] max-w-2xl mx-auto leading-relaxed">
          Understand where you are, discover what is possible, and build your next
          move—with guidance that respects your choices and grows alongside you.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" suppressHydrationWarning>
          {!isMarketing ? (
            <Link
              href="/get-started"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-[0_12px_30px_-5px_rgba(103,87,245,0.4)] hover:shadow-[0_16px_36px_-5px_rgba(103,87,245,0.5)] transition-all duration-200 group active:scale-[0.98]"
            >
              <span>Start Exploring</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <a
              href="#explorer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-[0_12px_30px_-5px_rgba(103,87,245,0.4)] hover:shadow-[0_16px_36px_-5px_rgba(103,87,245,0.5)] transition-all duration-200 group active:scale-[0.98]"
            >
              <span>Try Interactive Explorer</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          )}

          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-bold text-[#171A2B] bg-white hover:bg-[#FAF9F6] border border-[#DDD8FE] shadow-sm hover:border-[#6757F5]/40 transition-all duration-200"
          >
            <span>See How It Works</span>
            <ChevronRight className="w-4 h-4 text-[#626987]" />
          </a>
        </div>

        {/* Reassurance points */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-[#626987]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#35B8C5]" />
            <span>Zero account required for interactive explorer</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#35B8C5]" />
            <span>No ads or sponsored placement</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#35B8C5]" />
            <span>Parent-friendly transparency</span>
          </span>
        </div>
      </div>
    </section>
  );
}
