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
import { StageBadge } from "@/components/auth/StageBadge";
import { ACADEMIC_STAGES, type AcademicStageId } from "@/data/landing-demo";
import {
  STAGE_AWARE_COPY,
  getStageOrNull,
  getStageById,
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

const STAGE_ICONS: Record<AcademicStageId, React.ReactNode> = {
  "classes-4-7": <Sparkles className="w-5 h-5 text-[#6757F5]" />,
  "classes-8-10": <BookOpen className="w-5 h-5 text-[#6757F5]" />,
  "classes-11-12": <Compass className="w-5 h-5 text-[#6757F5]" />,
  diploma: <Wrench className="w-5 h-5 text-[#6757F5]" />,
  "degree-engineering": <Cpu className="w-5 h-5 text-[#6757F5]" />,
  "final-year-grad": <Briefcase className="w-5 h-5 text-[#6757F5]" />,
};

function StudentStageSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stageParam = searchParams.get("stage");
  const situationParam = searchParams.get("situation");
  const audienceParam = searchParams.get("audience");
  const contextParam = searchParams.get("context");

  const initialStage = getStageOrNull(stageParam);
  const hasInitialValidStage = initialStage !== null;
  const validatedSituation = isValidSituation(situationParam) ? situationParam : null;
  const validatedAudience = isValidAudience(audienceParam) ? audienceParam : null;
  const validatedContext = isValidAcademicContext(contextParam) ? (contextParam as AcademicContextParam) : null;

  // If a valid stage was passed from landing page, initialize with it.
  // CRITICAL CORRECTION: If missing or invalid, do NOT preselect any stage.
  const [selectedStageId, setSelectedStageId] = useState<AcademicStageId | null>(
    initialStage ? initialStage.id : null
  );
  const [isEditing, setIsEditing] = useState<boolean>(!hasInitialValidStage);

  const activeStage = selectedStageId ? getStageById(selectedStageId) : null;
  const stageCopy = activeStage ? STAGE_AWARE_COPY[activeStage.id] : null;

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
  if (selectedStageId) backParams.set("stage", selectedStageId);
  if (validatedSituation) backParams.set("situation", validatedSituation);
  if (validatedAudience) backParams.set("audience", validatedAudience);
  if (validatedContext) backParams.set("context", validatedContext);
  const backHref = backParams.toString() ? `/get-started?${backParams.toString()}` : "/get-started";

  return (
    <AuthLayout
      role="student"
      stageParam={selectedStageId}
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
            <span>Student Entry</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
            Where are you in your learning journey?
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#626987]">
            We adjust our guidance to your current educational context—never forcing a career prediction.
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

        {/* State 1: Recognized Stage from Landing Page (Clean Confirmation) */}
        {!isEditing && hasInitialValidStage && activeStage && stageCopy ? (
          <div className="space-y-5">
            <StageBadge
              stage={activeStage}
              onEdit={() => setIsEditing(true)}
              showEdit={true}
            />

            {/* Stage Context Card */}
            <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-left space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6757F5]">
                What this means for your experience:
              </span>
              <p className="text-sm font-semibold text-[#171A2B] leading-snug">
                &ldquo;{stageCopy.tagline}&rdquo;
              </p>
              <p className="text-xs text-[#474D66] leading-relaxed">
                {stageCopy.subtext}
              </p>

              {validatedContext && activeStage.id === "degree-engineering" && (
                <div className="pt-2 border-t border-[#DDD8FE] flex items-center gap-1.5 text-xs text-[#6757F5]">
                  <Cpu className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    Focus Track: <strong>{ACADEMIC_CONTEXT_CONFIG[validatedContext].label}</strong> ({ACADEMIC_CONTEXT_CONFIG[validatedContext].description})
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2 text-xs text-[#626987] flex items-center justify-between">
              <span>Not in {activeStage.label}?</span>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="font-bold text-[#6757F5] hover:underline"
              >
                Change Academic Stage
              </button>
            </div>
          </div>
        ) : (
          /* State 2: Full Stage Selection List (6 Compatible Stage IDs) */
          <div className="space-y-5">
            <div className="flex items-center justify-between text-xs text-[#626987] pb-1">
              <span>Select the stage that best matches your current status:</span>
              {hasInitialValidStage && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-[#6757F5] font-semibold hover:underline"
                >
                  Cancel
                </button>
              )}
            </div>

            {(() => {
              const SCHOOL_STAGE_IDS = ["classes-4-7", "classes-8-10", "classes-11-12"];
              const schoolStages = ACADEMIC_STAGES.filter((s) => SCHOOL_STAGE_IDS.includes(s.id));
              const collegeStages = ACADEMIC_STAGES.filter((s) => !SCHOOL_STAGE_IDS.includes(s.id));

              const renderStageItem = (stg: (typeof ACADEMIC_STAGES)[number]) => {
                const isSelected = selectedStageId === stg.id;
                const copy = STAGE_AWARE_COPY[stg.id];

                return (
                  <div
                    key={stg.id}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onClick={() => {
                      setSelectedStageId(stg.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        setSelectedStageId(stg.id);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-left flex items-start gap-3 focus:outline-hidden focus:ring-2 focus:ring-[#6757F5] ${
                      isSelected
                        ? "bg-[#FAF9F6] border-[#6757F5] ring-2 ring-[#EDEAFF] shadow-xs"
                        : "bg-white border-[#E8E6F3] hover:border-[#DDD8FE] hover:bg-[#FAF9F6]/50"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-[#6757F5] text-white"
                          : "bg-[#EDEAFF] text-[#6757F5]"
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        STAGE_ICONS[stg.id]
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-[#171A2B] truncate">
                          {stg.label}
                        </span>
                        <span className="text-[10px] font-semibold text-[#626987] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E8E6F3] shrink-0">
                          {stg.ageRange}
                        </span>
                      </div>
                      <p className="text-xs text-[#6757F5] font-medium mt-0.5">
                        {stg.sublabel} · {stg.focusTone}
                      </p>
                      <p className="text-[11px] text-[#474D66] mt-1 leading-normal">
                        {copy.tagline}
                      </p>
                    </div>
                  </div>
                );
              };

              if (validatedAudience === "school") {
                return (
                  <div className="space-y-5" role="radiogroup" aria-label="Academic Stage Choices">
                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#269CA8] bg-[#E0F7F6] px-2.5 py-0.5 rounded-full border border-[#B2EBF2]">
                          Next Move Explore — School Stages
                        </span>
                        <span className="text-[11px] text-[#626987]">Recommended for school students</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {schoolStages.map(renderStageItem)}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2.5 pt-2 border-t border-[#E8E6F3]">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#6757F5] bg-[#EDEAFF] px-2.5 py-0.5 rounded-full border border-[#DDD8FE]">
                          Next Move Build — Higher Education
                        </span>
                        <span className="text-[11px] text-[#626987]">Diploma & Degree pathways</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {collegeStages.map(renderStageItem)}
                      </div>
                    </div>
                  </div>
                );
              }

              if (validatedAudience === "college") {
                return (
                  <div className="space-y-5" role="radiogroup" aria-label="Academic Stage Choices">
                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#6757F5] bg-[#EDEAFF] px-2.5 py-0.5 rounded-full border border-[#DDD8FE]">
                          Next Move Build — College & Degrees
                        </span>
                        <span className="text-[11px] text-[#626987]">Recommended for college students</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {collegeStages.map(renderStageItem)}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2.5 pt-2 border-t border-[#E8E6F3]">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#269CA8] bg-[#E0F7F6] px-2.5 py-0.5 rounded-full border border-[#B2EBF2]">
                          Next Move Explore — School Stages
                        </span>
                        <span className="text-[11px] text-[#626987]">Classes 4 through 12</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {schoolStages.map(renderStageItem)}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  role="radiogroup"
                  aria-label="Academic Stage Choices"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {ACADEMIC_STAGES.map(renderStageItem)}
                </div>
              );
            })()}
          </div>
        )}

        {/* Continue Action */}
        <div className="mt-8 space-y-3">
          <button
            type="button"
            disabled={!selectedStageId}
            onClick={handleContinue}
            className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all ${
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
            No personal data or assessment is requested here. Specific skills and goals belong to Flow 3.
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
          Loading...
        </div>
      }
    >
      <StudentStageSelectionContent />
    </Suspense>
  );
}
