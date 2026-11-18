"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useIsMarketingMode } from "@/lib/deployment-mode";

export function CollegeFinalCTA() {
  const isMarketing = useIsMarketingMode();

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] text-center overflow-x-clip">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE] shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Take Your Next Step</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
          Your degree gives you a qualification.{" "}
          <span className="text-[#6757F5]">Your projects prove your capability.</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed max-w-2xl mx-auto">
          Stop relying solely on multiple-choice scores. Explore practical challenges, build verified projects, and plan your next move with confidence.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4" suppressHydrationWarning>
          {!isMarketing ? (
            <>
              <Link
                href="/get-started/student?stage=degree-engineering"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#6757F5] text-white font-bold text-sm shadow-md shadow-[#6757F5]/25 hover:bg-[#5342E8] transition-all"
              >
                <span>Find My Starting Point</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#college-framework"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#FAF9F6] border-2 border-[#E8E6F3] text-[#171A2B] font-bold text-sm hover:bg-[#EDEAFF] hover:border-[#DDD8FE] hover:text-[#6757F5] transition-all"
              >
                <span>Explore 3-State Framework</span>
              </a>
            </>
          ) : (
            <>
              <a
                href="#college-framework"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#6757F5] text-white font-bold text-sm shadow-md shadow-[#6757F5]/25 hover:bg-[#5342E8] transition-all"
              >
                <span>Explore 3-State Framework</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#college-partnerships"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#FAF9F6] border-2 border-[#E8E6F3] text-[#171A2B] font-bold text-sm hover:bg-[#EDEAFF] hover:border-[#DDD8FE] hover:text-[#6757F5] transition-all"
              >
                <span>College Pilot Inquiries</span>
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
