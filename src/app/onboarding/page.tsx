"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Layers,
  ArrowRight,
  Lock,
} from "lucide-react";
import { getValidatedStage, STAGE_AWARE_COPY } from "@/data/flow2-config";

function OnboardingHandoffContent() {
  const searchParams = useSearchParams();
  const stageParam = searchParams.get("stage");
  const stage = getValidatedStage(stageParam);
  const stageCopy = STAGE_AWARE_COPY[stage.id];

  const isPreview = searchParams.get("preview") === "true";

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171A2B] flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-[#E8E6F3] bg-white sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
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
            <span className="font-extrabold text-base tracking-tight text-[#171A2B]">
              Next Move <span className="text-[#6757F5]">AI</span>
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#626987] hover:text-[#171A2B] px-3 py-1.5 rounded-lg border border-[#E8E6F3] hover:bg-[#FAF9F6] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Landing Page</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl w-full mx-auto px-4 py-10 flex-1 flex flex-col justify-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#DDD8FE] shadow-xl text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider border border-[#DDD8FE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {isPreview
                ? "Flow 3 Preview Mode"
                : "Flow 3 Transition Contract Destination"}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
              Adaptive Student Onboarding
            </h1>

            <p className="mt-2 text-sm text-[#474D66] leading-relaxed max-w-lg mx-auto">
              You arrived from Flow 2 with your verified academic stage. Flow 3 will dynamically personalize your starting exploration.
            </p>
          </div>

          {/* Preserved Stage Card */}
          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#DDD8FE] text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6757F5] flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>Carried Forward Stage Identifier</span>
              </span>
              <span className="text-xs font-semibold text-[#626987] bg-white px-2.5 py-1 rounded-md border border-[#E8E6F3]">
                {stage.ageRange}
              </span>
            </div>

            <div className="text-lg font-black text-[#171A2B]">
              {stage.label} ({stage.sublabel})
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#E8E6F3] text-xs text-[#31364F] space-y-1">
              <div className="font-bold text-[#6757F5]">Stage Contextual Focus:</div>
              <p className="leading-relaxed">&ldquo;{stageCopy.tagline}&rdquo;</p>
              <p className="text-[11px] text-[#626987]">{stageCopy.subtext}</p>
            </div>
          </div>

          {/* Upcoming Flow 3 Milestones */}
          <div className="p-5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-left space-y-3">
            <div className="text-xs font-bold text-[#6757F5] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Upcoming Flow 3 Modules (Scheduled Next Phase)</span>
            </div>

            <ul className="space-y-2 text-xs text-[#31364F]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#35B8C5] shrink-0 mt-0.5" />
                <span>
                  <strong>1. Curiosity Discovery:</strong> Deep-dive into specific sub-domains without forced career tests.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#35B8C5] shrink-0 mt-0.5" />
                <span>
                  <strong>2. Starter Micro-Trial:</strong> Experience a hands-on 15-minute practical challenge.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#35B8C5] shrink-0 mt-0.5" />
                <span>
                  <strong>3. Student Workspace Activation:</strong> Generate your starter private roadmap.
                </span>
              </li>
            </ul>
          </div>

          {/* Safety & Scope Notice */}
          <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] text-left text-xs text-[#626987] flex items-start gap-2">
            <Lock className="w-4 h-4 text-[#6757F5] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Scope Boundary:</strong> In accordance with development plan instructions, Flow 3 will be engineered in the next phase. No fake accounts or mock profiles are generated.
            </p>
          </div>

          {/* Action Navigation */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/get-started/student?stage=${stage.id}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-[#6757F5] bg-white border border-[#DDD8FE] hover:bg-[#EDEAFF] transition-colors"
            >
              <span>Edit Stage ({stage.label})</span>
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/25 transition-all"
            >
              <span>Return to Landing Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8E6F3] bg-white py-4 text-center text-xs text-[#626987]">
        © {new Date().getFullYear()} Next Move AI — Flow 3 Adaptive Onboarding will connect here.
      </footer>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-sm text-[#626987]">
          Loading...
        </div>
      }
    >
      <OnboardingHandoffContent />
    </Suspense>
  );
}
