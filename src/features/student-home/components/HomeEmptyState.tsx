/**
 * NEXT MOVE AI V2 — HOME EMPTY STATE
 * 
 * Displayed when no confirmed profile exists in the session (e.g. initial direct visit).
 * Welcomes the student and provides a clear path into adaptive onboarding.
 */

"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Shield } from "lucide-react";

export function HomeEmptyState() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#6757F5] to-[#9333EA] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#6757F5]/25">
        <Sparkles className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
          Your Intelligence Workspace
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
          Welcome to Next Move AI
        </h1>
        <p className="text-xs sm:text-sm text-[#474D66] max-w-lg mx-auto leading-relaxed">
          Your personal home dashboard is built around your confirmed starting profile. Complete our 5-minute adaptive onboarding to personalize your questions, activities, and daily next moves.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-[#DDD8FE] max-w-md mx-auto text-left space-y-2 text-xs text-[#31364F] shadow-xs">
        <span className="font-bold text-[#6757F5] block">What onboarding sets up:</span>
        <ul className="space-y-1.5 list-disc list-inside text-[#626987]">
          <li>Adaptive context for your specific academic stage</li>
          <li>Your self-selected exploration interests</li>
          <li>A practical, low-stakes micro-exploration challenge</li>
          <li>Your initial verified starting profile baseline</li>
        </ul>
      </div>

      <div className="pt-2">
        <Link
          href="/get-started/student"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold shadow-lg shadow-[#6757F5]/25 transition-all transform hover:-translate-y-0.5"
        >
          <span>Begin Adaptive Onboarding</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <p className="text-[11px] text-[#8C93AD] flex items-center justify-center gap-1.5">
        <Shield className="w-3.5 h-3.5 text-[#059669]" />
        <span>Privacy-first design • No cookies or trackers set without authorization</span>
      </p>
    </div>
  );
}
