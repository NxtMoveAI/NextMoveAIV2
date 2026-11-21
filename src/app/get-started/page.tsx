"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GraduationCap,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Briefcase,
  Compass,
} from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import {
  isValidStageId,
  isValidSituation,
  isValidAudience,
  isValidAccountRole,
  isValidAcademicContext,
  type AccountRoleId,
  type AcademicContextParam,
  getStageById,
  SITUATION_CONFIG,
  ACADEMIC_CONTEXT_CONFIG,
} from "@/data/flow2-config";

function GetStartedRoleSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Safely extract and validate allowlisted incoming query parameters
  const stageParam = searchParams.get("stage");
  const situationParam = searchParams.get("situation");
  const audienceParam = searchParams.get("audience");
  const roleParam = searchParams.get("role");
  const contextParam = searchParams.get("context");

  const validatedStage = isValidStageId(stageParam) ? stageParam : null;
  const validatedSituation = isValidSituation(situationParam) ? situationParam : null;
  const validatedAudience = isValidAudience(audienceParam) ? audienceParam : null;
  const validatedRole: AccountRoleId | null = isValidAccountRole(roleParam) ? roleParam : null;
  const validatedContext: AcademicContextParam | null = isValidAcademicContext(contextParam) ? contextParam : null;

  const [selectedRole, setSelectedRole] = useState<AccountRoleId | null>(validatedRole);

  const handleContinue = () => {
    if (selectedRole === "student") {
      const params = new URLSearchParams();
      if (validatedStage) params.set("stage", validatedStage);
      if (validatedSituation) params.set("situation", validatedSituation);
      if (validatedAudience) params.set("audience", validatedAudience);
      if (validatedContext) params.set("context", validatedContext);
      const queryStr = params.toString() ? `?${params.toString()}` : "";
      router.push(`/get-started/student${queryStr}`);
    } else if (selectedRole === "professional") {
      const params = new URLSearchParams();
      if (validatedSituation) params.set("situation", validatedSituation);
      if (validatedAudience) params.set("audience", validatedAudience);
      const queryStr = params.toString() ? `?${params.toString()}` : "";
      router.push(`/professionals${queryStr}`);
    } else if (selectedRole === "parent") {
      const params = new URLSearchParams();
      if (validatedStage) params.set("stage", validatedStage);
      if (validatedAudience) params.set("audience", validatedAudience);
      if (validatedContext) params.set("context", validatedContext);
      const queryStr = params.toString() ? `?${params.toString()}` : "";
      router.push(`/sign-up/parent${queryStr}`);
    }
  };

  const backDestination =
    validatedAudience === "school"
      ? "/school"
      : validatedAudience === "college"
      ? "/college"
      : validatedAudience === "professionals"
      ? "/professionals"
      : "/";

  const backLabel =
    validatedAudience === "school"
      ? "Return to School Page"
      : validatedAudience === "college"
      ? "Return to College Page"
      : validatedAudience === "professionals"
      ? "Return to Professionals Page"
      : "Return to Landing Page";

  return (
    <AuthLayout
      role="general"
      stageParam={validatedStage}
      backHref={backDestination}
      backLabel={backLabel}
      activeStep={1}
      totalSteps={4}
      stepTitle="Role Selection"
    >
      <AuthCard>
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-3 border border-[#DDD8FE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Step 1: Role Selection</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
            How would you like to start?
          </h1>

          <p className="mt-2 text-sm text-[#626987]">
            Choose your learning or career path to begin your personalized journey.
          </p>
        </div>

        {/* Preserved Context Summary Badges (If coming with valid context) */}
        {(validatedStage || validatedSituation || validatedContext) && (
          <div className="mb-6 p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#DDD8FE] text-left space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5] block">
              Recognized Learning Context:
            </span>
            <div className="flex flex-wrap gap-2">
              {validatedStage && (
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6757F5] bg-[#EDEAFF] px-2.5 py-1 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6757F5]" />
                  <span>Stage: {getStageById(validatedStage).label}</span>
                </div>
              )}
              {validatedContext && (
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-lg border border-[#DBEAFE]">
                  <GraduationCap className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>{ACADEMIC_CONTEXT_CONFIG[validatedContext].label}: {ACADEMIC_CONTEXT_CONFIG[validatedContext].focus}</span>
                </div>
              )}
              {validatedSituation && (
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4338CA] bg-[#E0E7FF] px-2.5 py-1 rounded-lg">
                  <Compass className="w-3.5 h-3.5 text-[#4338CA]" />
                  <span>Situation: {SITUATION_CONFIG[validatedSituation].label} ({SITUATION_CONFIG[validatedSituation].title})</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Role Selection Cards */}
        <div
          role="radiogroup"
          aria-label="Account Role Selection"
          className="space-y-4"
        >
          {/* 1. Student Card */}
          <div
            role="radio"
            aria-checked={selectedRole === "student"}
            tabIndex={0}
            onClick={() => setSelectedRole("student")}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                setSelectedRole("student");
              }
            }}
            className={`p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left flex items-start gap-4 focus:outline-hidden focus:ring-2 focus:ring-[#6757F5] ${
              selectedRole === "student"
                ? "bg-[#FAF9F6] border-[#6757F5] ring-4 ring-[#EDEAFF] shadow-md"
                : "bg-white border-[#E8E6F3] hover:border-[#DDD8FE] hover:bg-[#FAF9F6]/50"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                selectedRole === "student"
                  ? "bg-[#6757F5] text-white"
                  : "bg-[#EDEAFF] text-[#6757F5]"
              }`}
            >
              <GraduationCap className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-extrabold text-[#171A2B]">
                  I&apos;m a Student
                </h2>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedRole === "student"
                      ? "border-[#6757F5] bg-[#6757F5] text-white"
                      : "border-[#C7C4E2] bg-white"
                  }`}
                >
                  {selectedRole === "student" && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#474D66] mt-1.5 leading-relaxed">
                School (Classes 4–12), College, Polytechnic or Degree learner exploring interests, building capabilities and planning realistic next steps.
              </p>

              {validatedStage && (
                <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#6757F5] bg-[#EDEAFF] px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Preserving your exploration stage selection</span>
                </div>
              )}
            </div>
          </div>

          {/* 2. Professional Card */}
          <div
            role="radio"
            aria-checked={selectedRole === "professional"}
            tabIndex={0}
            onClick={() => setSelectedRole("professional")}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                setSelectedRole("professional");
              }
            }}
            className={`p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left flex items-start gap-4 focus:outline-hidden focus:ring-2 focus:ring-[#6757F5] ${
              selectedRole === "professional"
                ? "bg-[#FAF9F6] border-[#6757F5] ring-4 ring-[#EDEAFF] shadow-md"
                : "bg-white border-[#E8E6F3] hover:border-[#DDD8FE] hover:bg-[#FAF9F6]/50"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                selectedRole === "professional"
                  ? "bg-[#6757F5] text-white"
                  : "bg-[#EDEAFF] text-[#6757F5]"
              }`}
            >
              <Briefcase className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-extrabold text-[#171A2B]">
                  I&apos;m a Professional
                </h2>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedRole === "professional"
                      ? "border-[#6757F5] bg-[#6757F5] text-white"
                      : "border-[#C7C4E2] bg-white"
                  }`}
                >
                  {selectedRole === "professional" && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#474D66] mt-1.5 leading-relaxed">
                Working professional or graduate exploring transferable capabilities, upskilling opportunities, and structured career progression pathways.
              </p>
            </div>
          </div>

          {/* 3. Parent / Guardian Card */}
          <div
            role="radio"
            aria-checked={selectedRole === "parent"}
            tabIndex={0}
            onClick={() => setSelectedRole("parent")}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                setSelectedRole("parent");
              }
            }}
            className={`p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left flex items-start gap-4 focus:outline-hidden focus:ring-2 focus:ring-[#6757F5] ${
              selectedRole === "parent"
                ? "bg-[#FAF9F6] border-[#6757F5] ring-4 ring-[#EDEAFF] shadow-md"
                : "bg-white border-[#E8E6F3] hover:border-[#DDD8FE] hover:bg-[#FAF9F6]/50"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                selectedRole === "parent"
                  ? "bg-[#6757F5] text-white"
                  : "bg-[#EDEAFF] text-[#6757F5]"
              }`}
            >
              <Users className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-extrabold text-[#171A2B]">
                  I&apos;m a Parent or Guardian
                </h2>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedRole === "parent"
                      ? "border-[#6757F5] bg-[#6757F5] text-white"
                      : "border-[#C7C4E2] bg-white"
                  }`}
                >
                  {selectedRole === "parent" && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#474D66] mt-1.5 leading-relaxed">
                Understand how I can support my child&apos;s learning and educational choices responsibly.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 space-y-4">
          <button
            type="button"
            disabled={!selectedRole}
            onClick={handleContinue}
            className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              selectedRole
                ? "text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/25 hover:shadow-lg active:scale-[0.99] cursor-pointer"
                : "text-[#9EA3B5] bg-[#F1F0F8] cursor-not-allowed"
            }`}
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-4 border-t border-[#E8E6F3] text-center text-xs text-[#626987]">
            <span>Already have an account? </span>
            <Link
              href="/sign-in"
              className="font-bold text-[#6757F5] hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default function GetStartedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-sm text-[#626987]">
          Loading...
        </div>
      }
    >
      <GetStartedRoleSelection />
    </Suspense>
  );
}
