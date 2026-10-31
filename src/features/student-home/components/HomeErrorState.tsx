/**
 * NEXT MOVE AI V2 — HOME ERROR STATE
 * Resilient, user-friendly error container with retry action and onboarding fallback.
 */

"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";

interface HomeErrorStateProps {
  errorMessage: string;
  onRetry: () => void;
}

export function HomeErrorState({ errorMessage, onRetry }: HomeErrorStateProps) {
  return (
    <div
      role="alert"
      className="max-w-xl mx-auto py-12 px-6 text-center space-y-6"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] flex items-center justify-center mx-auto shadow-sm">
        <AlertCircle className="w-7 h-7" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-black text-[#171A2B] tracking-tight">
          Unable to load your student dashboard
        </h2>
        <p className="text-xs sm:text-sm text-[#626987] leading-relaxed">
          {errorMessage || "We encountered an issue preparing your personalized home view. Please check your connection and try again."}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold shadow-md shadow-[#6757F5]/20 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Loading</span>
        </button>

        <Link
          href="/onboarding"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#F4F3F8] text-[#31364F] border border-[#E8E6F3] text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Review Onboarding</span>
        </Link>
      </div>
    </div>
  );
}

