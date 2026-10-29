/**
 * NEXT MOVE AI V2 — FLOW 3 ADAPTIVE ONBOARDING ROUTE
 * 
 * Entry route for Flow 3 "Understand Me" adaptive student onboarding.
 * Validates stage parameter or displays explicit stage selection modal.
 */

"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import { getStageOrNull } from "@/data/flow2-config";
import { ACADEMIC_STAGES, type AcademicStageId } from "@/data/landing-demo";
import { AdaptiveQuestionRenderer } from "@/features/onboarding/components/AdaptiveQuestionRenderer";

function OnboardingContent() {
  const searchParams = useSearchParams();
  const stageParam = searchParams.get("stage");
  const stage = getStageOrNull(stageParam);

  // Missing or Invalid Stage: Explicit Selection Required (Never silently defaults to Class 12)
  if (!stage) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-[#171A2B] flex flex-col justify-between">
        <header className="border-b border-[#E8E6F3] bg-white sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="font-extrabold text-base tracking-tight text-[#171A2B]">
                Next Move <span className="text-[#6757F5]">AI</span>
              </span>
            </Link>

            <Link
              href="/"
              className="text-xs font-semibold text-[#626987] hover:text-[#171A2B]"
            >
              Return Home
            </Link>
          </div>
        </header>

        <main className="max-w-3xl w-full mx-auto px-4 py-12 flex-1 flex flex-col justify-center">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#DDD8FE] shadow-xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider border border-[#DDD8FE]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Academic Stage Selection</span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
                Select your academic stage to begin
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-[#626987] max-w-md mx-auto">
                Next Move AI adapts every question and micro-exploration to your exact educational level.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left pt-2">
              {ACADEMIC_STAGES.map((s) => (
                <Link
                  key={s.id}
                  href={`/onboarding?stage=${s.id}&preview=true`}
                  className="p-4 rounded-2xl border border-[#E8E6F3] hover:border-[#6757F5] bg-white hover:bg-[#FAF9F6] transition-all group flex flex-col justify-between gap-3 shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
                        {s.ageRange}
                      </span>
                      <GraduationCap className="w-4 h-4 text-[#8C93AD] group-hover:text-[#6757F5] transition-colors" />
                    </div>
                    <div className="font-black text-sm text-[#171A2B] mt-1">
                      {s.label}
                    </div>
                    <div className="text-xs text-[#626987] mt-0.5">
                      {s.sublabel}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1 text-xs font-bold text-[#6757F5] group-hover:text-[#5342E8]">
                    <span>Start Onboarding</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E8E6F3] text-xs text-[#626987]">
              Already have an account?{" "}
              <Link href="/sign-in" className="font-bold text-[#6757F5] hover:underline">
                Sign in here
              </Link>
            </div>
          </div>
        </main>

        <footer className="border-t border-[#E8E6F3] bg-white py-4 text-center text-xs text-[#626987]">
          © {new Date().getFullYear()} Next Move AI — Flow 3 Adaptive Onboarding
        </footer>
      </div>
    );
  }

  // Valid stage: Mount Flow 3 Adaptive Engine
  return (
    <AdaptiveQuestionRenderer
      initialStageId={stage.id as AcademicStageId}
      isDemoMode={true}
    />
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-sm text-[#626987]">
          Loading adaptive onboarding workspace...
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
