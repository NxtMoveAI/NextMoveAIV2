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
import { getValidatedStage, AGE_CATEGORY_OPTIONS } from "@/data/flow2-config";

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
  const stage = getValidatedStage(stageParam);

  // Default age selection based on stage recommendation (non-binding)
  const defaultAgeId =
    stage.id === "classes-4-7"
      ? "under_13"
      : stage.id === "classes-8-10" || stage.id === "classes-11-12"
      ? "13_to_17"
      : "18_plus";

  const [selectedAge, setSelectedAge] = useState<"under_13" | "13_to_17" | "18_plus">(
    defaultAgeId
  );

  // Prototype state simulation switcher (for testing all 5 required conditions)
  const [prototypeSimState, setPrototypeSimState] = useState<
    "standard" | "guardian_required" | "incomplete" | "pending" | "restricted"
  >("standard");

  const handleAgeChange = (ageId: "under_13" | "13_to_17" | "18_plus") => {
    setSelectedAge(ageId);
    if (ageId === "under_13") {
      setPrototypeSimState("guardian_required");
    } else {
      setPrototypeSimState("standard");
    }
  };

  const handleProceed = () => {
    if (prototypeSimState === "guardian_required" || selectedAge === "under_13") {
      router.push(`/guardian-support?stage=${stage.id}`);
    } else if (prototypeSimState === "pending") {
      router.push(`/verify?type=guardian_pending&stage=${stage.id}`);
    } else {
      router.push(`/sign-up/student?stage=${stage.id}&access=standard`);
    }
  };

  return (
    <AuthLayout
      role="student"
      stageParam={stage.id}
      backHref={`/get-started/student?stage=${stage.id}`}
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

        {/* Active Access Context Explanation Card */}
        <div className="mt-5 p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#6757F5]">
            <Info className="w-4 h-4 shrink-0" />
            <span>Why age-related authorization is required</span>
          </div>

          <p className="text-xs text-[#31364F] leading-relaxed">
            In compliance with the <strong>Digital Personal Data Protection (DPDP) Act 2023</strong> and international minor safety guidelines, learners under 13 require parental assistance before starting digital exploratory journals.
          </p>

          {selectedAge === "under_13" ? (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
              <Users className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <span>
                <strong>Guardian-Assisted Route:</strong> Continuing will guide you to connect a parent or guardian to authorize your workspace.
              </span>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <span>
                <strong>Standard Account Entry:</strong> You are eligible for direct student registration.
              </span>
            </div>
          )}
        </div>

        {/* Prototype State Simulation Switcher (Configurable Verification Tester) */}
        <div className="mt-5 p-3 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] text-left space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[#626987] font-semibold">
            <span className="flex items-center gap-1">
              <Sliders className="w-3 h-3 text-[#6757F5]" />
              <span>QA Simulation Switcher:</span>
            </span>
            <span className="text-[10px] text-[#6757F5]">Backend Ready</span>
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
