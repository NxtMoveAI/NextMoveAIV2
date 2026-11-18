"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useIsMarketingMode } from "@/lib/deployment-mode";

export function SchoolFinalCTA() {
  const isMarketing = useIsMarketingMode();

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] overflow-x-clip text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F9FA] text-[#269CA8] text-xs font-bold uppercase tracking-wider mb-4 border border-[#CBF0F3] shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Begin Your Discovery</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
          Every child has a spark of curiosity.{" "}
          <span className="text-[#269CA8]">Let&apos;s explore where it leads.</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed max-w-2xl mx-auto">
          Try low-pressure activities, create something meaningful, and discover what you enjoy learning today.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4" suppressHydrationWarning>
          {!isMarketing ? (
            <>
              <Link
                href="/get-started/student?stage=classes-4-7"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#269CA8] text-white font-bold text-sm shadow-md shadow-[#35B8C5]/25 hover:bg-[#1F808A] transition-all"
              >
                <span>Start Exploring</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/get-started?role=parent"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#FAF9F6] border-2 border-[#E8E6F3] text-[#171A2B] font-bold text-sm hover:bg-[#EDEAFF] hover:border-[#DDD8FE] hover:text-[#6757F5] transition-all"
              >
                <span>Parent Overview</span>
              </Link>
            </>
          ) : (
            <>
              <a
                href="#school-stages"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#269CA8] text-white font-bold text-sm shadow-md shadow-[#35B8C5]/25 hover:bg-[#1F808A] transition-all"
              >
                <span>Try School Activities</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#school-partnerships"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#FAF9F6] border-2 border-[#E8E6F3] text-[#171A2B] font-bold text-sm hover:bg-[#EDEAFF] hover:border-[#DDD8FE] hover:text-[#6757F5] transition-all"
              >
                <span>School Pilot Inquiries</span>
              </a>
            </>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-[#626987]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#269CA8]" />
            <span>Zero account required to explore</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#269CA8]" />
            <span>DPDP child-safety compliant</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#269CA8]" />
            <span>Curiosity over competition</span>
          </span>
        </div>
      </div>
    </section>
  );
}
