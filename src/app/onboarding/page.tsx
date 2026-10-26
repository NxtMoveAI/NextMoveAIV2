"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ACADEMIC_STAGES } from "@/data/landing-demo";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  ShieldAlert,
} from "lucide-react";

function OnboardingContent() {
  const searchParams = useSearchParams();
  const stageParam = searchParams.get("stage") || "classes-11-12";
  const stageData =
    ACADEMIC_STAGES.find((s) => s.id === stageParam) || ACADEMIC_STAGES[2];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171A2B] flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-[#E8E6F3] bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white p-0.5 border border-[#E8E6F3] flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Next Move AI"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Next Move <span className="text-[#6757F5]">AI</span>
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#626987] hover:text-[#171A2B] px-3 py-1.5 rounded-lg border border-[#E8E6F3] hover:bg-[#FAF9F6]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Landing Page</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12 flex-1 flex flex-col justify-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#DDD8FE] shadow-xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-6 border border-[#DDD8FE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phase 2 Handoff Destination</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] tracking-tight">
            Ready to Begin Your Onboarding Journey
          </h1>

          <p className="mt-3 text-sm text-[#31364F] leading-relaxed">
            You navigated from the landing page with your selected academic stage:
          </p>

          {/* Academic Stage Preview Box */}
          <div className="mt-6 p-4 rounded-2xl bg-[#FAF9F6] border border-[#DDD8FE] flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6757F5] text-white flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#6757F5] uppercase tracking-wider block">
                  Preserved Selection
                </span>
                <span className="text-base font-bold text-[#171A2B]">
                  {stageData.label} ({stageData.sublabel})
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#626987] bg-white px-2.5 py-1 rounded-md border border-[#E8E6F3]">
              {stageData.ageRange}
            </span>
          </div>

          {/* Upcoming Phase Notice */}
          <div className="mt-6 p-5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#6757F5]">
              <ShieldAlert className="w-4 h-4" />
              <span>Upcoming Phase 2 Implementation Notice</span>
            </div>
            <p className="text-xs text-[#626987] leading-relaxed">
              In Phase 2, backend services engineered by Havyas will provide:
            </p>
            <ul className="space-y-1.5 text-xs text-[#31364F]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#35B8C5]" />
                <span>Role selection (Student / Parent)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#35B8C5]" />
                <span>Age verification, parental consent & secure Supabase auth</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#35B8C5]" />
                <span>Adaptive onboarding & starting student intelligence profile</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/25"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Landing Page</span>
            </Link>
            <Link
              href="/#explorer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#31364F] bg-white border border-[#E8E6F3] hover:bg-[#FAF9F6]"
            >
              <span>Explore Other Stages</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-[#E8E6F3] text-center text-xs text-[#626987]">
        A product by Navlore AI Technologies LLP.
      </footer>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading handoff...</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
