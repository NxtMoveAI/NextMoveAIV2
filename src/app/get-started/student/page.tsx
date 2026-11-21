"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GraduationCap,
  ArrowRight,
  Sparkles,
  BookOpen,
  Compass,
  Wrench,
  Cpu,
  Briefcase,
  Check,
} from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { StepIndicator, type StepItem } from "@/components/auth/StepIndicator";
import { type AcademicStageId } from "@/data/landing-demo";
import {
  isValidSituation,
  isValidAudience,
  isValidAcademicContext,
  type AcademicContextParam,
  SITUATION_CONFIG,
  ACADEMIC_CONTEXT_CONFIG,
} from "@/data/flow2-config";

const STEPS: StepItem[] = [
  { number: 1, label: "Role" },
  { number: 2, label: "Academic Stage" },
  { number: 3, label: "Access Context" },
  { number: 4, label: "Create Space" },
];

export type OnboardingStageId =
  | "classes-4-7"
  | "classes-8-10"
  | "classes-11-12"
  | "diploma"
  | "degree"
  | "engineering"
  | "working-professional";

interface StageOption {
  id: OnboardingStageId;
  label: string;
  sublabel: string;
  ageRange: string;
  description: string;
  icon: React.ReactNode;
}

const FIRST_SIX_STAGES: StageOption[] = [
  {
    id: "classes-4-7",
    label: "Class 4–7",
    sublabel: "Middle School",
    ageRange: "Ages 9–12",
    description: "Curiosity, foundational exploration and playful discovery without grade pressure.",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    id: "classes-8-10",
    label: "Class 8–10",
    sublabel: "High School",
    ageRange: "Ages 13–15",
    description: "Subject exploration, real-world hobbies, and clarity on 10th stream choices.",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: "classes-11-12",
    label: "Class 11–12",
    sublabel: "Pre-University / +2",
    ageRange: "Ages 16–18",
    description: "Entrance tests, degrees, realistic prerequisites, and stream pathways.",
    icon: <Compass className="w-5 h-5" />,
  },
  {
    id: "diploma",
    label: "Diploma",
    sublabel: "Polytechnic & Applied",
    ageRange: "Applied Learning",
    description: "Practical technical skills, hands-on learning, and lateral entry degrees.",
    icon: <Wrench className="w-5 h-5" />,
  },
  {
    id: "degree",
    label: "Degree",
    sublabel: "BCA · B.Com · BBA · B.Sc",
    ageRange: "Undergraduate",
    description: "Multi-disciplinary undergraduate programs, business, and applied sciences.",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    id: "engineering",
    label: "Engineering",
    sublabel: "B.Tech · B.E. Disciplines",
    ageRange: "Technical Degree",
    description: "Applied engineering, core architecture, algorithms, and technical specializations.",
    icon: <Cpu className="w-5 h-5" />,
  },
];

const WORKING_PROFESSIONAL_STAGE: StageOption = {
  id: "working-professional",
  label: "Working Professional",
  sublabel: "Early & Experienced",
  ageRange: "Career Growth",
  description: "Transferable skills, upskilling opportunities, and structured career transitions.",
  icon: <Briefcase className="w-5 h-5" />,
};

const VALID_ONBOARDING_STAGES: OnboardingStageId[] = [
  "classes-4-7",
  "classes-8-10",
  "classes-11-12",
  "diploma",
  "degree",
  "engineering",
  "working-professional",
];

function normalizeStageId(id: string | null | undefined): OnboardingStageId | null {
  if (!id) return null;
  if (id === "degree-engineering") return "engineering";
  if (id === "final-year-grad") return "working-professional";
  if (VALID_ONBOARDING_STAGES.includes(id as OnboardingStageId)) {
    return id as OnboardingStageId;
  }
  return null;
}

function toCanonicalStage(stageId: OnboardingStageId | null): AcademicStageId | null {
  if (!stageId) return null;
  if (stageId === "degree" || stageId === "engineering") return "degree-engineering";
  if (stageId === "working-professional") return "final-year-grad";
  return stageId;
}

function StudentStageSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stageParam = searchParams.get("stage");
  const situationParam = searchParams.get("situation");
  const audienceParam = searchParams.get("audience");
  const contextParam = searchParams.get("context");

  const validatedStage = normalizeStageId(stageParam);
  const validatedSituation = isValidSituation(situationParam) ? situationParam : null;
  const validatedAudience = isValidAudience(audienceParam) ? audienceParam : null;
  const validatedContext = isValidAcademicContext(contextParam) ? (contextParam as AcademicContextParam) : null;

  // Selected stage state (preselected if valid stage passed in query, else null)
  const [selectedStageId, setSelectedStageId] = useState<OnboardingStageId | null>(validatedStage);

  const handleContinue = () => {
    if (!selectedStageId) return;
    const params = new URLSearchParams();
    params.set("stage", selectedStageId);
    if (validatedSituation) params.set("situation", validatedSituation);
    if (validatedAudience) params.set("audience", validatedAudience);
    if (validatedContext) params.set("context", validatedContext);
    router.push(`/get-started/student/access?${params.toString()}`);
  };

  const backParams = new URLSearchParams();
  backParams.set("role", "student");
  if (validatedSituation) backParams.set("situation", validatedSituation);
  if (validatedAudience) backParams.set("audience", validatedAudience);
  if (validatedContext) backParams.set("context", validatedContext);
  const backHref = `/get-started?${backParams.toString()}`;

  const renderStageCard = (stg: StageOption) => {
    const isSelected = selectedStageId === stg.id;

    return (
      <div
        key={stg.id}
        data-stage={stg.id}
        role="radio"
        aria-checked={isSelected}
        tabIndex={0}
        onClick={() => setSelectedStageId(stg.id)}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            setSelectedStageId(stg.id);
          }
        }}
        className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left flex items-start gap-3.5 focus:outline-hidden focus:ring-2 focus:ring-[#6757F5] ${
          isSelected
            ? "bg-[#FAF9F6] border-[#6757F5] ring-2 sm:ring-4 ring-[#EDEAFF] shadow-sm"
            : "bg-white border-[#E8E6F3] hover:border-[#DDD8FE] hover:bg-[#FAF9F6]/50"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            isSelected
              ? "bg-[#6757F5] text-white"
              : "bg-[#EDEAFF] text-[#6757F5]"
          }`}
        >
          {isSelected ? (
            <Check className="w-5 h-5 text-white" />
          ) : (
            stg.icon
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm sm:text-base font-extrabold text-[#171A2B] truncate">
              {stg.label}
            </span>
            <span className="text-[10px] font-semibold text-[#626987] bg-[#FAF9F6] px-2 py-0.5 rounded-md border border-[#E8E6F3] shrink-0">
              {stg.ageRange}
            </span>
          </div>
          <p className="text-xs text-[#6757F5] font-semibold mt-0.5 truncate">
            {stg.sublabel}
          </p>
          <p className="text-xs text-[#474D66] mt-1 line-clamp-2 leading-relaxed">
            {stg.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <AuthLayout
      role="student"
      stageParam={toCanonicalStage(selectedStageId)}
      backHref={backHref}
      backLabel="Change Role"
      activeStep={2}
      totalSteps={4}
      stepTitle="Academic Stage"
    >
      <AuthCard>
        <StepIndicator steps={STEPS} currentStep={2} />

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-2 border border-[#DDD8FE]">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Step 2: Academic Stage</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
            Where are you in your learning journey?
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#626987]">
            Select your current academic stage or experience level so we can adapt guidance to your exact context.
          </p>

          {validatedSituation && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#4338CA] bg-[#E0E7FF] px-3 py-1 rounded-full border border-[#C7D2FE]">
              <Compass className="w-3.5 h-3.5 text-[#4338CA]" />
              <span>Learning Situation: {SITUATION_CONFIG[validatedSituation].label} ({SITUATION_CONFIG[validatedSituation].title})</span>
            </div>
          )}

          {validatedContext && (
            <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#4338CA] bg-[#EEF2FF] px-3 py-1 rounded-full border border-[#C7D2FE]">
              <Cpu className="w-3.5 h-3.5 text-[#4338CA]" />
              <span>Focus: {ACADEMIC_CONTEXT_CONFIG[validatedContext].label} ({ACADEMIC_CONTEXT_CONFIG[validatedContext].description})</span>
            </div>
          )}
        </div>

        {/* 7 Academic Stage Options */}
        <div
          role="radiogroup"
          aria-label="Academic Stage Choices"
          className="space-y-3 sm:space-y-3.5"
        >
          {/* First six options in clean 2-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            {FIRST_SIX_STAGES.map(renderStageCard)}
          </div>

          {/* 7th option: Working Professional as a separate centered option beneath */}
          <div className="pt-0.5 flex justify-center">
            <div className="w-full sm:max-w-md">
              {renderStageCard(WORKING_PROFESSIONAL_STAGE)}
            </div>
          </div>
        </div>

        {/* Continue Action */}
        <div className="mt-8 space-y-3">
          <button
            type="button"
            disabled={!selectedStageId}
            onClick={handleContinue}
            className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              selectedStageId
                ? "text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/25 hover:shadow-lg active:scale-[0.99] cursor-pointer"
                : "text-[#626987] bg-[#E8E6F3] cursor-not-allowed opacity-70"
            }`}
          >
            <span>
              {selectedStageId ? "Confirm & Continue" : "Select an Academic Stage to Continue"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-[#626987] text-center">
            Next Move AI adapts guidance to your current educational level — never forcing a career prediction.
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default function StudentStageSelectionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-sm text-[#626987]">
          Loading stage selection...
        </div>
      }
    >
      <StudentStageSelectionContent />
    </Suspense>
  );
}
