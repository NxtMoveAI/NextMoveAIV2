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
} from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { isValidStageId } from "@/data/flow2-config";

function GetStartedRoleSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stageParam = searchParams.get("stage");
  const validatedStage = isValidStageId(stageParam) ? stageParam : null;

  const [selectedRole, setSelectedRole] = useState<"student" | "parent" | null>(null);

  const handleContinue = () => {
    if (selectedRole === "student") {
      const target = validatedStage
        ? `/get-started/student?stage=${validatedStage}`
        : "/get-started/student";
      router.push(target);
    } else if (selectedRole === "parent") {
      router.push("/sign-up/parent");
    }
  };

  return (
    <AuthLayout
      role="general"
      stageParam={validatedStage}
      backHref="/"
      backLabel="Return to Landing Page"
    >
      <AuthCard>
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-3 border border-[#DDD8FE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Step 1: Choose Your Path</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
            Every journey starts somewhere.
          </h1>

          <p className="mt-2 text-sm text-[#626987]">
            Tell us how you&apos;d like to begin.
          </p>
        </div>

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
                Explore my interests, discover possibilities, build skills and plan my next move.
              </p>

              {validatedStage && (
                <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#6757F5] bg-[#EDEAFF] px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Preserving your exploration stage selection</span>
                </div>
              )}
            </div>
          </div>

          {/* 2. Parent / Guardian Card */}
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
