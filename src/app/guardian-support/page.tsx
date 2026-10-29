"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Users,
  ArrowRight,
  Clock,
  AlertTriangle,
  RotateCcw,
  Mail,
  Lock,
} from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { PrototypeNotice } from "@/components/auth/PrototypeNotice";
import { StageBadge } from "@/components/auth/StageBadge";
import { getValidatedStage } from "@/data/flow2-config";

function GuardianSupportContent() {
  const searchParams = useSearchParams();
  const stageParam = searchParams.get("stage");
  const stage = getValidatedStage(stageParam);

  const [simulatedState, setSimulatedState] = useState<
    "explanation" | "pending" | "unavailable"
  >("explanation");

  if (!stage) {
    return (
      <AuthLayout
        role="student"
        backHref="/get-started/student"
        backLabel="Choose Stage"
        activeStep={2}
        totalSteps={4}
        stepTitle="Stage Required"
      >
        <AuthCard>
          <div className="text-center py-6 space-y-4">
            <h1 className="text-2xl font-black text-[#171A2B]">
              No Academic Stage Selected
            </h1>
            <p className="text-sm text-[#626987] max-w-md mx-auto leading-relaxed">
              Please select your academic stage first to continue with guardian support guidance.
            </p>
            <div className="pt-2">
              <Link
                href="/get-started/student"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6757F5] text-white font-bold hover:bg-[#5342E8] shadow-md transition-colors"
              >
                <span>Select Your Stage</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      role="student"
      stageParam={stage.id}
      backHref={`/get-started/student/access?stage=${stage.id}`}
      backLabel="Back to Access"
    >
      <AuthCard>
        {/* Header Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-2 border border-[#DDD8FE]">
            <Users className="w-3.5 h-3.5" />
            <span>Guardian Support Gateway</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
            A little help to get started.
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#626987] leading-relaxed">
            Some students need a parent or guardian to help complete account setup.
          </p>
        </div>

        {/* Current Academic Stage */}
        <div className="mb-6">
          <StageBadge
            stage={stage}
            editHref={`/get-started/student?stage=${stage.id}`}
            showEdit={true}
          />
        </div>

        {/* State 1: Standard Explanation State */}
        {simulatedState === "explanation" && (
          <div className="space-y-5 text-left">
            <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] space-y-3">
              <span className="text-xs font-bold text-[#6757F5] uppercase tracking-wider block">
                How guardian-assisted entry works:
              </span>

              <div className="space-y-3 text-xs text-[#31364F]">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#EDEAFF] text-[#6757F5] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong>Parent or Guardian Sign-Up:</strong> Your parent creates a guardian account to provide safe authorization.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#EDEAFF] text-[#6757F5] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong>Secure Linking:</strong> A private, single-use invite code links your accounts without exposing private notes.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#EDEAFF] text-[#6757F5] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong>Unlocking Your Space:</strong> Once authorized by the backend, your student space and Flow 3 onboarding are unlocked.
                  </div>
                </div>
              </div>
            </div>

            {/* Why this matters */}
            <div className="p-3.5 rounded-xl bg-white border border-[#E8E6F3] text-xs text-[#626987] space-y-1.5">
              <div className="font-bold text-[#171A2B] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#6757F5]" />
                <span>Respecting your privacy:</span>
              </div>
              <p className="leading-relaxed">
                Parents receive milestone summaries (e.g., &ldquo;Aryan explored 3 technology paths this week&rdquo;). Your private reflections, exploratory searches, and starter trial attempts remain strictly yours.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-3">
              <Link
                href="/sign-up/parent"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/25 hover:shadow-lg transition-all"
              >
                <span>Continue with Parent or Guardian</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={`/get-started/student?stage=${stage.id}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-[#31364F] bg-white border border-[#E8E6F3] hover:bg-[#FAF9F6] transition-colors"
              >
                <span>Return to Student Entry</span>
              </Link>
            </div>
          </div>
        )}

        {/* State 2: Simulated Pending State */}
        {simulatedState === "pending" && (
          <div className="p-5 rounded-2xl bg-[#FFFBF0] border border-amber-300 text-left space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
              <Clock className="w-5 h-5 text-amber-600 animate-pulse" />
              <span>Authorization Pending</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              An authorization invite has been generated for your parent or guardian. Once approved, your student workspace will automatically activate.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-amber-800">
              <Mail className="w-4 h-4" />
              <span>Check your parent&apos;s email inbox for the confirmation link.</span>
            </div>
          </div>
        )}

        {/* State 3: Simulated Unavailable State */}
        {simulatedState === "unavailable" && (
          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-left space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-rose-900">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Guardian Verification Service Unavailable</span>
            </div>
            <p className="text-xs text-rose-800 leading-relaxed">
              The guardian authorization service is currently undergoing scheduled backend integration. Please try again shortly or contact support.
            </p>
            <button
              type="button"
              onClick={() => setSimulatedState("explanation")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] hover:underline pt-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry authorization status check</span>
            </button>
          </div>
        )}

        {/* QA State Switcher (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 pt-4 border-t border-[#E8E6F3] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#626987]">
            <span>QA Preview States (Dev Only):</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSimulatedState("explanation")}
                className={`px-2 py-1 rounded text-[10px] font-semibold border ${
                  simulatedState === "explanation"
                    ? "bg-[#6757F5] text-white border-[#6757F5]"
                    : "bg-white text-[#31364F] border-[#E8E6F3]"
                }`}
              >
                Default
              </button>
              <button
                type="button"
                onClick={() => setSimulatedState("pending")}
                className={`px-2 py-1 rounded text-[10px] font-semibold border ${
                  simulatedState === "pending"
                    ? "bg-[#6757F5] text-white border-[#6757F5]"
                    : "bg-white text-[#31364F] border-[#E8E6F3]"
                }`}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => setSimulatedState("unavailable")}
                className={`px-2 py-1 rounded text-[10px] font-semibold border ${
                  simulatedState === "unavailable"
                    ? "bg-[#6757F5] text-white border-[#6757F5]"
                    : "bg-white text-[#31364F] border-[#E8E6F3]"
                }`}
              >
                Unavailable
              </button>
            </div>
          </div>
        )}

        {/* Prototype Scope Banner */}
        <div className="mt-4">
          <PrototypeNotice message="No real guardian emails are sent in frontend prototype mode. Havyas will integrate the lawful verification and linking workflow." />
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default function GuardianSupportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-sm text-[#626987]">
          Loading...
        </div>
      }
    >
      <GuardianSupportContent />
    </Suspense>
  );
}
