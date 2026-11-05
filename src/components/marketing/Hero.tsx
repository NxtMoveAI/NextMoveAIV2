"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { StudentJourneyShowcase } from "./hero/StudentJourneyShowcase";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-[#FAF9F6]">
      {/* Background subtle radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-[#EDEAFF]/80 via-[#FAF9F6]/40 to-transparent pointer-events-none -z-10 rounded-full blur-3xl opacity-70" />
      <div className="absolute top-40 right-[-100px] w-80 h-80 bg-[#35B8C5]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
            {/* Brand Philosophy Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] border border-[#DDD8FE] text-[#6757F5] text-xs sm:text-sm font-semibold mb-6 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#6757F5]" />
              <span>We don’t decide careers; we enable clarity.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-[#171A2B] tracking-tight leading-[1.14]">
              Discover what excites you.{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#6757F5]">
                  Build what comes next.
                </span>
                <span
                  className="absolute bottom-1 sm:bottom-2 left-0 w-full h-2.5 sm:h-3 bg-[#35B8C5]/20 -z-0 rounded"
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="mt-6 text-lg sm:text-xl text-[#31364F] leading-relaxed max-w-2xl font-normal">
              Explore your interests, try new things, discover possibilities,
              and grow with guidance that understands your journey.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-[0_10px_25px_-5px_rgba(103,87,245,0.4)] hover:shadow-[0_14px_30px_-5px_rgba(103,87,245,0.5)] transition-all duration-200 group active:scale-[0.98]"
              >
                <span>Explore Your Next Move</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-[#171A2B] bg-white hover:bg-[#FAF9F6] border border-[#DDD8FE] shadow-sm hover:border-[#6757F5]/40 transition-all duration-200"
              >
                <span>See How It Works</span>
                <ChevronRight className="w-4 h-4 text-[#626987]" />
              </a>
            </div>

            {/* Student-Centric Trust Indicators */}
            <div className="mt-10 pt-6 border-t border-[#E8E6F3] w-full grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-[#626987]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#35B8C5] shrink-0" />
                <span>Classes 4–12 & College</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#35B8C5] shrink-0" />
                <span>Zero premature labels</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#35B8C5] shrink-0" />
                <span>Hands-on projects & trials</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual - One Animated Illustration-Based Journey */}
          <div className="lg:col-span-6 xl:col-span-6 w-full">
            <StudentJourneyShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
