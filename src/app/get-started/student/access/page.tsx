"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Info,
  Sliders,
  AlertTriangle,
} from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { StepIndicator, type StepItem } from "@/components/auth/StepIndicator";
import { StageBadge } from "@/components/auth/StageBadge";
import { PrototypeNotice } from "@/components/auth/PrototypeNotice";
import {
  getValidatedStage,
  AGE_CATEGORY_OPTIONS,
  isValidSituation,
  isValidAudience,
  isValidAcademicContext,
  type AcademicContextParam,
} from "@/data/flow2-config";

const STEPS: StepItem[] = [
  { number: 1, label: "Role" },
  { number: 2, label: "Stage" },
  { number: 3, label: "Access & Safety" },
  { number: 4, label: "Create Space" },
];

function StudentAccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stageParam = searchParams.get("stage");
  const situationParam = searchParams.get("situation");
  const audienceParam = searchParams.get("audience");
  const contextParam = searchParams.get("context");

  const stage = getValidatedStage(stageParam);
  const validatedSituation = isValidSituation(situationParam) ? situationParam : null;
  const validatedAudience = isValidAudience(audienceParam) ? audienceParam : null;
  const validatedContext = isValidAcademicContext(contextParam) ? (contextParam as AcademicContextParam) : null;

  // Non-binding initial age recommendation based on confirmed stage
  const defaultAgeId: "under_13" | "13_to_17" | "18_plus" =
    stage && stage.id === "classes-4-7"
      ? "under_13"
      : stage && (stage.id === "classes-8-10" || stage.id === "classes-11-12")
      ? "13_to_17"
      : "18_plus";

  const [selectedAge, setSelectedAge] = useState<"under_13" | "13_to_17" | "18_plus">(
    defaultAgeId
  );

  // Check if selected age category conflicts with confirmed academic stage
  const hasStageAgeConflict =
    (stage?.id === "classes-4-7" && selectedAge === "18_plus") ||
    ((stage?.id === "degree-engineering" || stage?.id === "final-year-grad" || stage?.id === "diploma") &&
      selectedAge === "under_13");

  const recommendedAge = stage
    ? stage.id === "classes-4-7"
      ? AGE_CATEGORY_OPTIONS.find((a) => a.id === "under_13")
      : stage.id === "classes-8-10" || stage.id === "classes-11-12"
      ? AGE_CATEGORY_OPTIONS.find((a) => a.id === "13_to_17")
      : AGE_CATEGORY_OPTIONS.find((a) => a.id === "18_plus")
    : null;

  // Prototype state simulation switcher (for testing all 5 required conditions in dev mode)
  const [prototypeSimState, setPrototypeSimState] = useState<
    "standard" | "guardian_required" | "incomplete" | "pending" | "restricted"
  >("standard");

  // If no stage is provided or stage is invalid, require student to pick a stage first
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
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-[#171A2B]">
              No Academic Stage Selected
            </h1>
            <p className="text-sm text-[#626987] max-w-md mx-auto leading-relaxed">
              To provide an age-appropriate exploration and safety framework, please select where you are in your learning journey first.
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

  const handleAgeChange = (ageId: "under_13" | "13_to_17" | "18_plus") => {
    setSelectedAge(ageId);
    if (ageId === "under_13") {
      setPrototypeSimState("guardian_required");
    } else {
      setPrototypeSimState("standard");
    }
  };

  const handleProceed = () => {
    const baseParams = new URLSearchParams();
    baseParams.set("stage", stage.id);
    if (validatedSituation) baseParams.set("situation", validatedSituation);
    if (validatedAudience) baseParams.set("audience", validatedAudience);
    if (validatedContext) baseParams.set("context", validatedContext);

    if (prototypeSimState === "guardian_required" || selectedAge === "under_13") {
      const guardianParams = new URLSearchParams();
      guardianParams.set("stage", stage.id);
      if (validatedAudience) guardianParams.set("audience", validatedAudience);
      if (validatedContext) guardianParams.set("context", validatedContext);
      router.push(`/guardian-support?${guardianParams.toString()}`);
    } else if (prototypeSimState === "pending") {
      const pendingParams = new URLSearchParams();
      pendingParams.set("type", "guardian_pending");
      pendingParams.set("stage", stage.id);
      if (validatedContext) pendingParams.set("context", validatedContext);
      router.push(`/verify?${pendingParams.toString()}`);
    } else if (selectedAge === "13_to_17") {
      baseParams.set("access", "teen");
      router.push(`/sign-up/student?${baseParams.toString()}`);
    } else {
      baseParams.set("access", "adult");
      router.push(`/sign-up/student?${baseParams.toString()}`);
    }
  };

  const backParams = new URLSearchParams();
  backParams.set("stage", stage.id);
  if (validatedSituation) backParams.set("situation", validatedSituation);
  if (validatedAudience) backParams.set("audience", validatedAudience);
  if (validatedContext) backParams.set("context", validatedContext);
  const backHref = `/get-started/student?${backParams.toString()}`;

  return (
    <AuthLayout
      role="student"
      stageParam={stage.id}
      backHref={backHref}
      backLabel="Back to Stage"
      activeStep={3}
      totalSteps={4}
      stepTitle="Access & Safety"
    >
      <AuthCard>
        <StepIndicator steps={STEPS} currentStep={3} />

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-2 border border-[#DDD8FE]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#35B8C5]" />
            <span>Age-Appropriate Safety Framework</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
            Safety and access context
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#626987] leading-relaxed">
            Next Move AI protects school-age students under digital safety guidelines.
            We ensure younger learners have appropriate parental support.
          </p>
        </div>

        {/* Current Academic Stage Pill */}
        <div className="mb-5">
          <StageBadge
            stage={stage}
            editHref={`/get-started/student?stage=${stage.id}`}
            showEdit={true}
          />
        </div>

        {/* Age Category Selector */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-[#171A2B]">
            Select your age category:
          </label>

          <div
            role="radiogroup"
            aria-label="Age Category Choices"
            className="grid grid-cols-1 gap-2.5"
          >
            {AGE_CATEGORY_OPTIONS.map((opt) => {
              const isSelected = selectedAge === opt.id;

              return (
                <div
                  key={opt.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => handleAgeChange(opt.id)}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      handleAgeChange(opt.id);
                    }
                  }}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-left flex items-start gap-3 focus:outline-hidden focus:ring-2 focus:ring-[#6757F5] ${
                    isSelected
                      ? "bg-[#FAF9F6] border-[#6757F5] ring-2 ring-[#EDEAFF] shadow-xs"
                      : "bg-white border-[#E8E6F3] hover:border-[#DDD8FE]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? "border-[#6757F5] bg-[#6757F5] text-white"
                        : "border-[#C7C4E2] bg-white"
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#171A2B]">
                        {opt.label}
                      </span>
                      <span className="text-[10px] font-semibold text-[#626987] bg-white px-2 py-0.5 rounded border border-[#E8E6F3]">
                        {opt.sublabel}
                      </span>
                    </div>
                    <p className="text-xs text-[#474D66] mt-1 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Age-Stage Mismatch Conflict Resolution */}
        {hasStageAgeConflict && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-left space-y-2.5 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Stage &amp; Age Selection Conflict</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              You selected <strong>{stage.label}</strong> (typical cohort age: {stage.ageRange}), but chose{" "}
              <strong>{AGE_CATEGORY_OPTIONS.find((o) => o.id === selectedAge)?.label}</strong>.
              To ensure appropriate safeguards, please confirm your choice or adjust below:
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {recommendedAge && (
                <button
                  type="button"
                  onClick={() => handleAgeChange(recommendedAge.id)}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors shadow-2xs"
                >
                  Switch to Recommended ({recommendedAge.label})
                </button>
              )}
              <Link
                href={`/get-started/student?stage=${stage.id}`}
                className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 text-xs font-semibold hover:bg-amber-100/50 transition-colors"
              >
                Change Academic Stage
              </Link>
            </div>
          </div>
        )}

        {/* Active Access Context Explanation Card */}
        <div className="mt-5 p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#6757F5]">
            <Info className="w-4 h-4 shrink-0" />
            <span>Why age-related authorization is required</span>
          </div>

          <p className="text-xs text-[#31364F] leading-relaxed">
            Designed for compliance review under applicable Indian child-data protection guidelines (including phased DPDP implementation) and global minor safety practices. Real age verification and parental consent workflows are managed securely by Havyas&apos;s backend service.
          </p>

          {selectedAge === "under_13" ? (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <Users className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold block">Guardian-Led Co-Setup Required (Under 13):</span>
                <p className="text-amber-800 leading-relaxed">
                  Students under 13 require a parent or legal guardian to lead account creation and establish the workspace before digital exploration begins.
                </p>
              </div>
            </div>
          ) : selectedAge === "13_to_17" ? (
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 shrink-0 text-indigo-600 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold block">Teen Student Entry with Guardian Authorization (13–17):</span>
                <p className="text-indigo-800 leading-relaxed">
                  You can set up your teen exploration profile now. In accordance with child-data protection frameworks, active continuous exploration and platform features will require guardian authorization and linking confirmation before activation.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold block">Adult Autonomous Student Entry (18+):</span>
                <p className="text-emerald-800 leading-relaxed">
                  Standard independent student registration with full autonomous controls and self-managed privacy preferences.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Prototype State Simulation Switcher (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-5 p-3 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] text-left space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#626987] font-semibold">
              <span className="flex items-center gap-1">
                <Sliders className="w-3 h-3 text-[#6757F5]" />
                <span>QA Simulation Switcher (Dev Mode Only):</span>
              </span>
              <span className="text-[10px] text-[#6757F5]">Dev Switcher</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => setPrototypeSimState("standard")}
                className={`px-2 py-1.5 rounded-lg border text-left transition-colors ${
                  prototypeSimState === "standard"
                    ? "bg-[#6757F5] text-white border-[#6757F5]"
                    : "bg-white text-[#31364F] border-[#E8E6F3]"
                }`}
              >
                Standard Route
              </button>
              <button
                type="button"
                onClick={() => setPrototypeSimState("guardian_required")}
                className={`px-2 py-1.5 rounded-lg border text-left transition-colors ${
                  prototypeSimState === "guardian_required"
                    ? "bg-[#6757F5] text-white border-[#6757F5]"
                    : "bg-white text-[#31364F] border-[#E8E6F3]"
                }`}
              >
                Guardian Required
              </button>
              <button
                type="button"
                onClick={() => setPrototypeSimState("pending")}
                className={`px-2 py-1.5 rounded-lg border text-left transition-colors ${
                  prototypeSimState === "pending"
                    ? "bg-[#6757F5] text-white border-[#6757F5]"
                    : "bg-white text-[#31364F] border-[#E8E6F3]"
                }`}
              >
                Auth Pending
              </button>
              <button
                type="button"
                onClick={() => setPrototypeSimState("incomplete")}
                className={`px-2 py-1.5 rounded-lg border text-left transition-colors ${
                  prototypeSimState === "incomplete"
                    ? "bg-[#6757F5] text-white border-[#6757F5]"
                    : "bg-white text-[#31364F] border-[#E8E6F3]"
                }`}
              >
                Incomplete Data
              </button>
              <button
                type="button"
                onClick={() => setPrototypeSimState("restricted")}
                className={`px-2 py-1.5 rounded-lg border text-left transition-colors ${
                  prototypeSimState === "restricted"
                    ? "bg-[#6757F5] text-white border-[#6757F5]"
                    : "bg-white text-[#31364F] border-[#E8E6F3]"
                }`}
              >
                Restricted State
              </button>
            </div>

            {prototypeSimState === "incomplete" && (
              <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
                Age / verification information incomplete: Please confirm your birth year or legal jurisdiction before continuing.
              </p>
            )}

            {prototypeSimState === "restricted" && (
              <p className="text-[11px] text-rose-700 bg-rose-50 p-2 rounded border border-rose-200 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Unable to continue until authorization is confirmed by backend regulatory policy.</span>
              </p>
            )}
          </div>
        )}

        {/* Prototype Scope Banner */}
        <div className="mt-4">
          <PrototypeNotice message="Frontend selections do not grant permission. All age & guardian authorizations must be verified by the secure backend." />
        </div>

        {/* Action Controls */}
        <div className="mt-6 space-y-3">
          <button
            type="button"
            disabled={prototypeSimState === "restricted" || prototypeSimState === "incomplete"}
            onClick={handleProceed}
            className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all ${
              prototypeSimState === "restricted" || prototypeSimState === "incomplete"
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/25 hover:shadow-lg active:scale-[0.99] cursor-pointer"
            }`}
          >
            <span>
              {selectedAge === "under_13" || prototypeSimState === "guardian_required"
                ? "Continue to Guardian Authorization"
                : prototypeSimState === "pending"
                ? "View Authorization Status"
                : "Continue to Student Signup"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center">
            <Link
              href={`/get-started/student?stage=${stage.id}`}
              className="text-xs text-[#626987] hover:text-[#171A2B] hover:underline"
            >
              Change academic stage
            </Link>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default function StudentAccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-sm text-[#626987]">
          Loading...
        </div>
      }
    >
      <StudentAccessContent />
    </Suspense>
  );
}
