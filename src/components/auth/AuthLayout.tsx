"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { type AcademicStageId } from "@/data/landing-demo";
import { STAGE_AWARE_COPY, getValidatedStage } from "@/data/flow2-config";

interface AuthLayoutProps {
  children: React.ReactNode;
  stageParam?: AcademicStageId | null;
  role?: "student" | "parent" | "general";
  backHref?: string;
  backLabel?: string;
  activeStep?: number;
  totalSteps?: number;
  stepTitle?: string;
}

export function AuthLayout({
  children,
  stageParam,
  role = "student",
  backHref = "/",
  backLabel = "Back to Landing Page",
  activeStep,
  totalSteps,
  stepTitle,
}: AuthLayoutProps) {
  const stage = getValidatedStage(stageParam);
  const stageCopy = STAGE_AWARE_COPY[stage.id];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171A2B] flex flex-col justify-between">
      {/* Top Navigation Header */}
      <header className="border-b border-[#E8E6F3] bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-white p-0.5 border border-[#E8E6F3] flex items-center justify-center group-hover:border-[#6757F5]/50 transition-colors">
              <Image
                src="/logo.png"
                alt="Next Move AI"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-[#171A2B]">
                Next Move <span className="text-[#6757F5]">AI</span>
              </span>
              <span className="text-[10px] text-[#626987] font-medium leading-none -mt-0.5 hidden sm:block">
                Intelligent Student Career Platform
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {activeStep && totalSteps && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-semibold border border-[#DDD8FE]">
                <span>
                  Step {activeStep} of {totalSteps}
                </span>
                {stepTitle && (
                  <>
                    <span className="opacity-50">·</span>
                    <span className="text-[#171A2B] font-medium">{stepTitle}</span>
                  </>
                )}
              </div>
            )}

            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#626987] hover:text-[#171A2B] px-3 py-1.5 rounded-lg border border-[#E8E6F3] hover:bg-[#FAF9F6] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{backLabel}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area: Responsive Two-Column Layout on Desktop */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero / Brand / Context Panel (Visible on large screens) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between space-y-8 pr-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-5 border border-[#DDD8FE]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {role === "parent"
                    ? "Parent & Guardian Gateway"
                    : role === "general"
                    ? "Intelligent Entry"
                    : "Student Exploration Gateway"}
                </span>
              </div>

              <h1 className="text-3xl xl:text-4xl font-black text-[#171A2B] tracking-tight leading-tight">
                {role === "parent"
                  ? "Support their journey with calm clarity."
                  : role === "general"
                  ? "Every journey starts with understanding you."
                  : stageCopy.tagline}
              </h1>

              <p className="mt-4 text-sm sm:text-base text-[#31364F] leading-relaxed">
                {role === "parent"
                  ? "Help your child explore real options without aggressive coaching sales, fake test scores, or high-pressure career dictates."
                  : role === "general"
                  ? "We don't decide careers; we enable clarity. Choose how you'd like to begin your journey."
                  : stageCopy.subtext}
              </p>
            </div>

            {/* Recognized Stage Pill (if student role) */}
            {role === "student" && (
              <div className="p-4 rounded-2xl bg-white border border-[#E8E6F3] shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#6757F5] uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Academic Context</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#FAF9F6] text-[#626987] font-semibold text-[11px] border border-[#E8E6F3]">
                    {stage.ageRange}
                  </span>
                </div>
                <div className="font-extrabold text-base text-[#171A2B]">
                  {stage.label} ({stage.sublabel})
                </div>
                <p className="text-xs text-[#626987] leading-relaxed">
                  Focus: <strong className="text-[#31364F]">{stageCopy.focusMessage}</strong>
                </p>
              </div>
            )}

            {/* Platform Trust Commitments */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-[#474D66]">
                <CheckCircle2 className="w-4 h-4 text-[#35B8C5] shrink-0 mt-0.5" />
                <span>
                  <strong>Zero Sponsored Bias:</strong> No payments accepted from private colleges
                  or coaching institutes to promote their degrees.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#474D66]">
                <Lock className="w-4 h-4 text-[#6757F5] shrink-0 mt-0.5" />
                <span>
                  <strong>Privacy by Design:</strong> Student reflections and trials are private
                  and never commercialized.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#474D66]">
                <ShieldCheck className="w-4 h-4 text-[#35B8C5] shrink-0 mt-0.5" />
                <span>
                  <strong>Authoritative Frameworks:</strong> Referenced from official educational
                  guidelines (UGC, AICTE, NTA).
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E6F3] text-[11px] text-[#626987]">
              Next Move AI is a product of{" "}
              <strong className="text-[#171A2B]">Navlore AI Technologies LLP</strong>.
            </div>
          </div>

          {/* Right Column: Active Interactive Screen Container */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-xl">{children}</div>
          </div>
        </div>
      </main>

      {/* Accessible Footer */}
      <footer className="border-t border-[#E8E6F3] bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#626987]">
          <span>
            © {new Date().getFullYear()} Next Move AI — Navlore AI Technologies LLP. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#6757F5] transition-colors">
              Landing Page
            </Link>
            <span>·</span>
            <Link href="/sign-in" className="hover:text-[#6757F5] transition-colors">
              Sign In
            </Link>
            <span>·</span>
            <Link href="/get-started" className="hover:text-[#6757F5] transition-colors">
              Role Selection
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
