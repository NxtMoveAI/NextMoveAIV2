/**
 * NEXT MOVE AI V2 — ONBOARDING WORKSPACE LAYOUT
 * 
 * Premium student workspace container with responsive structure,
 * demo notice, accessibility controls, and brand identity.
 */

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";
import { type AcademicStageId } from "@/data/landing-demo";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  stageId: AcademicStageId;
  isDemoMode?: boolean;
}

export function OnboardingLayout({
  children,
  isDemoMode = true,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171A2B] flex flex-col justify-between selection:bg-[#EDEAFF] selection:text-[#6757F5]">
      {/* Top Demo Notification Banner (Per Flow 3 Spec & Architecture Diagram) */}
      {isDemoMode && (
        <aside
          aria-label="Development Preview Notice"
          className="bg-[#EDEAFF] border-b border-[#DDD8FE] text-[#5342E8] text-[11px] font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#6757F5]" />
          <span>
            <strong>Flow 3 Development Demonstration</strong> — Interactive adaptive onboarding simulation with synthetic profile fixtures. No live AI or Supabase credentials required.
          </span>
        </aside>
      )}

      {/* Main App Navigation Header */}
      <header className="border-b border-[#E8E6F3] bg-white sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] rounded-lg"
          >
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
              <span className="font-extrabold text-base tracking-tight text-[#171A2B] leading-none">
                Next Move <span className="text-[#6757F5]">AI</span>
              </span>
              <span className="text-[10px] text-[#626987] font-medium leading-none mt-0.5">
                Understand Me • Adaptive Onboarding
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#626987] hover:text-[#171A2B] px-3 py-1.5 rounded-lg border border-[#E8E6F3] hover:bg-[#FAF9F6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Exit to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Dynamic Main Workspace Content */}
      <main className="flex-1 flex flex-col justify-start">
        {children}
      </main>

      {/* Trust & Ethics Footer */}
      <footer className="border-t border-[#E8E6F3] bg-white py-3.5 px-4 text-center text-xs text-[#626987]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#35B8C5]" />
            <span>
              &ldquo;We don&apos;t decide careers; we enable clarity.&rdquo; All responses are student-reported and editable.
            </span>
          </div>
          <span className="text-[11px] text-[#8C93AD]">
            Flow 3 Adaptive Engine • Navlore AI Technologies LLP
          </span>
        </div>
      </footer>
    </div>
  );
}
