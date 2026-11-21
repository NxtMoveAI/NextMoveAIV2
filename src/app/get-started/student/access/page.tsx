"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Check,
  ArrowRight,
  AlertTriangle,
  Info,
  Lock,
  Compass,
  Cpu,
} from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { StepIndicator, type StepItem } from "@/components/auth/StepIndicator";
import { StageBadge } from "@/components/auth/StageBadge";
import { type AcademicStageId, type AcademicStage } from "@/data/landing-demo";
import {
  getValidatedStage,
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
  { number: 3, label: "Access & Safety" },
  { number: 4, label: "Create Space" },
];

export type SchoolStageId = "classes-4-7" | "classes-8-10" | "classes-11-12";
export type NonSchoolStageId =
  | "diploma"
  | "degree"
  | "engineering"
  | "working-professional"
  | "degree-engineering"
  | "final-year-grad";

interface NormalizedStageInfo {
  isSchool: boolean;
  schoolStageId: SchoolStageId | null;
  canonicalStage: AcademicStage | null;
  rawId: string;
}

function normalizeStage(raw: string | null | undefined): NormalizedStageInfo | null {
  if (!raw) return null;
  const clean = raw.trim().toLowerCase();

  // School stages: Support both singular (class-X) and plural (classes-X) forms
  if (clean === "class-4-7" || clean === "classes-4-7") {
    return {
      isSchool: true,
      schoolStageId: "classes-4-7",
      canonicalStage: getValidatedStage("classes-4-7"),
      rawId: clean,
    };
  }
  if (clean === "class-8-10" || clean === "classes-8-10") {
    return {
      isSchool: true,
      schoolStageId: "classes-8-10",
      canonicalStage: getValidatedStage("classes-8-10"),
      rawId: clean,
    };
  }
  if (clean === "class-11-12" || clean === "classes-11-12") {
    return {
      isSchool: true,
      schoolStageId: "classes-11-12",
      canonicalStage: getValidatedStage("classes-11-12"),
      rawId: clean,
    };
  }

  // Non-school stages
  if (clean === "diploma") {
    return {
      isSchool: false,
      schoolStageId: null,
      canonicalStage: getValidatedStage("diploma"),
      rawId: clean,
    };
  }
  if (clean === "degree") {
    return {
      isSchool: false,
      schoolStageId: null,
      canonicalStage: getValidatedStage("degree-engineering"),
      rawId: clean,
    };
  }
  if (clean === "engineering" || clean === "degree-engineering") {
    return {
      isSchool: false,
      schoolStageId: null,
      canonicalStage: getValidatedStage("degree-engineering"),
      rawId: clean,
    };
  }
  if (clean === "working-professional" || clean === "final-year-grad") {
    return {
      isSchool: false,
      schoolStageId: null,
      canonicalStage: getValidatedStage("final-year-grad"),
      rawId: clean,
    };
  }

  return null;
}

interface SafetyOption {
  id: string;
  label: string;
  badge: string;
  description: string;
  targetRoute: "sign-up" | "guardian-support";
  accessParam: "teen" | "adult" | "guardian_led" | "invite";
  nextStepLabel: string;
  nextStepExplanation: string;
}

interface SafeguardItem {
  title: string;
  description: string;
}

interface SchoolStageSafetyConfig {
  badge: string;
  title: string;
  description: string;
  options: SafetyOption[];
  safeguards: SafeguardItem[];
}

const SCHOOL_STAGE_CONFIGS: Record<SchoolStageId, SchoolStageSafetyConfig> = {
  "classes-4-7": {
    badge: "Safety & Guardian Guidance",
    title: "Safety & access for young learners",
    description:
      "For students in Class 4–7 (ages 9–12), Next Move AI operates in a protected curiosity sandbox. In line with digital child-safety best practices, an adult parent or guardian assists with account setup.",
    options: [
      {
        id: "guardian_led",
        label: "Parent or Guardian Co-Setup",
        badge: "Recommended (Ages 9–12)",
        description:
          "My parent or guardian is here to set up my workspace with me. They manage account credentials, safety preferences, and oversight.",
        targetRoute: "guardian-support",
        accessParam: "guardian_led",
        nextStepLabel: "Continue to Guardian Setup",
        nextStepExplanation:
          "You will be guided to the Guardian Gateway to complete verified account co-setup with your parent or guardian.",
      },
      {
        id: "guardian_request",
        label: "Request Guardian Authorization Link",
        badge: "Invite Link",
        description:
          "Begin your profile and send an authorization link to your parent or guardian's email to review and activate your space.",
        targetRoute: "guardian-support",
        accessParam: "invite",
        nextStepLabel: "Continue to Guardian Request",
        nextStepExplanation:
          "You will enter your parent or guardian's email address so they receive a secure link to approve your workspace.",
      },
    ],
    safeguards: [
      {
        title: "Curiosity-Driven Exploration Sandbox",
        description:
          "Playful discovery across science, building, and storytelling without grades, tests, or career pressure.",
      },
      {
        title: "Protected Privacy & Zero Commercial Ads",
        description:
          "No third-party advertisements, commercial profiling, or public chat channels.",
      },
      {
        title: "Continuous Guardian Visibility",
        description:
          "Parents can review project milestones and adjust safety boundaries at any time.",
      },
    ],
  },
  "classes-8-10": {
    badge: "Teen Safety & Stream Exploration",
    title: "Safety & access for high school",
    description:
      "For Class 8–10 students (ages 13–15), Next Move AI encourages independent exploration of 10th stream options (Science, Commerce, Arts) with guardian transparency.",
    options: [
      {
        id: "teen_supervised",
        label: "Student Account with Guardian Awareness",
        badge: "Recommended (Ages 13–15)",
        description:
          "Create your student space to explore subjects and projects. Connect a parent or guardian's email for milestone visibility and safety authorization.",
        targetRoute: "sign-up",
        accessParam: "teen",
        nextStepLabel: "Continue to Create Space",
        nextStepExplanation:
          "You will proceed directly to Create Space to establish your student account with guardian awareness linking.",
      },
      {
        id: "guardian_assisted",
        label: "Parent/Guardian-Assisted Setup",
        badge: "Co-Piloted",
        description:
          "Work through account setup and stream planning together with a parent or legal guardian.",
        targetRoute: "guardian-support",
        accessParam: "guardian_led",
        nextStepLabel: "Continue to Guardian Gateway",
        nextStepExplanation:
          "You will be routed to the Guardian Gateway to set up the account alongside your parent or guardian.",
      },
    ],
    safeguards: [
      {
        title: "Unbiased Stream Exploration",
        description:
          "Objective comparisons across Science, Commerce, and Arts without commercial coaching affiliations.",
      },
      {
        title: "Guardian Progress Transparency",
        description:
          "Parents receive periodic stream clarity summaries so you can discuss choices together without daily intrusion.",
      },
      {
        title: "Strict Data Confidentiality",
        description:
          "Student projects and learning queries remain protected under DPDP child safety standards.",
      },
    ],
  },
  "classes-11-12": {
    badge: "Pre-University Decision Support",
    title: "Safety & access for higher secondary",
    description:
      "For Class 11–12 students (ages 16–18), Next Move AI provides objective entrance exam planning, degree prerequisites, and realistic alternatives.",
    options: [
      {
        id: "teen_independent",
        label: "Student Account with Family Sharing",
        badge: "Recommended (Ages 16–17)",
        description:
          "Direct student workspace for entrance planning and degree research, with the ability to share decision reports with parents.",
        targetRoute: "sign-up",
        accessParam: "teen",
        nextStepLabel: "Continue to Create Space",
        nextStepExplanation:
          "You will proceed directly to Create Space to set up your pre-university exploration account.",
      },
      {
        id: "adult_autonomous",
        label: "Autonomous Student Account (18+)",
        badge: "Ages 18+",
        description:
          "For students who are 18 or older. Full autonomous access to degree prerequisites, entrance timelines, and self-managed privacy.",
        targetRoute: "sign-up",
        accessParam: "adult",
        nextStepLabel: "Continue to Create Space",
        nextStepExplanation:
          "You will proceed directly to Create Space with autonomous student controls.",
      },
    ],
    safeguards: [
      {
        title: "Pressure-Free Prerequisite Planning",
        description:
          "Clear breakdown of college prerequisites and realistic alternatives to prevent entrance exam herd anxiety.",
      },
      {
        title: "Independent Demonstration Space",
        description:
          "Build and verify technical or domain projects owned entirely by the student.",
      },
      {
        title: "Exportable Family Discussion Reports",
        description:
          "Generate concise college comparison summaries whenever you wish to discuss options with mentors or family.",
      },
    ],
  },
};

function StudentAccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stageParam = searchParams.get("stage");
  const situationParam = searchParams.get("situation");
  const audienceParam = searchParams.get("audience");
  const contextParam = searchParams.get("context");

  const stageInfo = normalizeStage(stageParam);
  const validatedSituation = isValidSituation(situationParam) ? situationParam : null;
  const validatedAudience = isValidAudience(audienceParam) ? audienceParam : null;
  const validatedContext = isValidAcademicContext(contextParam) ? (contextParam as AcademicContextParam) : null;

  // Selected supervision / access option state (requires explicit selection before Continue is enabled)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Automatic bypass for non-school stages: Diploma, Degree, Engineering, Working Professional
  useEffect(() => {
    if (stageInfo && !stageInfo.isSchool) {
      const targetParams = new URLSearchParams();
      const canonicalId: AcademicStageId = stageInfo.canonicalStage?.id || "degree-engineering";
      targetParams.set("stage", canonicalId);
      targetParams.set("access", "adult");

      if (stageInfo.rawId === "degree" && !contextParam) {
        targetParams.set("context", "degree");
      } else if ((stageInfo.rawId === "engineering" || stageInfo.rawId === "degree-engineering") && !contextParam) {
        targetParams.set("context", "engineering");
      } else if (stageInfo.rawId === "diploma" && !contextParam) {
        targetParams.set("context", "diploma");
      }

      if (validatedSituation) targetParams.set("situation", validatedSituation);
      if (validatedAudience) targetParams.set("audience", validatedAudience);
      if (validatedContext) targetParams.set("context", validatedContext);

      router.replace(`/sign-up/student?${targetParams.toString()}`);
    }
  }, [stageInfo, router, validatedSituation, validatedAudience, validatedContext, contextParam]);

  // If stage is non-school, do NOT show the Access & Safety screen — render minimal transition state
  if (stageInfo && !stageInfo.isSchool) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-sm text-[#626987]">
        Preparing your workspace setup...
      </div>
    );
  }

  // If stage is missing or invalid, require student to pick a stage first
  if (!stageInfo || !stageInfo.isSchool || !stageInfo.schoolStageId || !stageInfo.canonicalStage) {
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

  const schoolConfig = SCHOOL_STAGE_CONFIGS[stageInfo.schoolStageId];
  const schoolStageId = stageInfo.schoolStageId;
  const canonicalStage = stageInfo.canonicalStage;
  const selectedOption = schoolConfig.options.find((opt) => opt.id === selectedOptionId) || null;

  // Temporary parent verification bypass for Class 4-7 and Class 8-10
  const isParentVerificationStage =
    schoolStageId === "classes-4-7" || schoolStageId === "classes-8-10";

  // Preserve all query parameters for Back navigation
  const backParams = new URLSearchParams();
  backParams.set("stage", schoolStageId);
  if (validatedSituation) backParams.set("situation", validatedSituation);
  if (validatedAudience) backParams.set("audience", validatedAudience);
  if (validatedContext) backParams.set("context", validatedContext);
  const backHref = `/get-started/student?${backParams.toString()}`;

  const handleContinue = () => {
    if (!selectedOption) return;

    const navParams = new URLSearchParams();
    navParams.set("stage", schoolStageId);
    navParams.set("access", selectedOption.accessParam);
    if (validatedSituation) navParams.set("situation", validatedSituation);
    if (validatedAudience) navParams.set("audience", validatedAudience);
    if (validatedContext) navParams.set("context", validatedContext);

    if (selectedOption.targetRoute === "guardian-support") {
      router.push(`/guardian-support?${navParams.toString()}`);
    } else {
      router.push(`/sign-up/student?${navParams.toString()}`);
    }
  };

  const handleParentVerify = () => {
    const navParams = new URLSearchParams();
    navParams.set("stage", schoolStageId);
    navParams.set("access", "guardian_led");
    if (validatedSituation) navParams.set("situation", validatedSituation);
    if (validatedAudience) navParams.set("audience", validatedAudience);
    if (validatedContext) navParams.set("context", validatedContext);

    router.push(`/sign-up/student?${navParams.toString()}`);
  };

  return (
    <AuthLayout
      role="student"
      stageParam={canonicalStage.id}
      backHref={backHref}
      backLabel="Back to Stage"
      activeStep={3}
      totalSteps={4}
      stepTitle="Access & Safety"
    >
      <AuthCard>
        <StepIndicator steps={STEPS} currentStep={3} />

        {/* Header Badge & Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-2 border border-[#DDD8FE]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#35B8C5]" />
            <span>{schoolConfig.badge}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
            {schoolConfig.title}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#626987] leading-relaxed">
            {schoolConfig.description}
          </p>

          {validatedSituation && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#4338CA] bg-[#E0E7FF] px-3 py-1 rounded-full border border-[#C7D2FE]">
              <Compass className="w-3.5 h-3.5 text-[#4338CA]" />
              <span>Learning Situation: {SITUATION_CONFIG[validatedSituation].label}</span>
            </div>
          )}

          {validatedContext && (
            <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#4338CA] bg-[#EEF2FF] px-3 py-1 rounded-full border border-[#C7D2FE]">
              <Cpu className="w-3.5 h-3.5 text-[#4338CA]" />
              <span>Focus: {ACADEMIC_CONTEXT_CONFIG[validatedContext].label}</span>
            </div>
          )}
        </div>

        {/* Current Academic Stage Pill */}
        <div className="mb-5">
          <StageBadge
            stage={canonicalStage}
            editHref={backHref}
            showEdit={true}
          />
        </div>

        {isParentVerificationStage ? (
          /* Temporary Parent Verification Bypass for Class 4-7 and Class 8-10 */
          <div className="space-y-5">
            {/* Built-in Safety Principles for This Stage */}
            <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-left space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#6757F5]">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#35B8C5]" />
                <span>Parental verification &amp; safeguards for {canonicalStage.label}:</span>
              </div>

              <div className="space-y-2">
                {schoolConfig.safeguards.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#31364F]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6757F5] mt-1.5 shrink-0" />
                    <p className="leading-relaxed">
                      <strong className="text-[#171A2B]">{item.title}:</strong>{" "}
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Single "Verify as Parent" Button */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={handleParentVerify}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/25 hover:shadow-lg active:scale-[0.99] transition-all duration-200 cursor-pointer"
              >
                <span>Verify as Parent</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <Link
                  href={backHref}
                  className="text-xs text-[#626987] hover:text-[#171A2B] hover:underline"
                >
                  Change academic stage
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Class 11-12 retains its existing options and Continue button */
          <>
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#171A2B]">
                Select your preferred access and supervision mode:
              </label>

              <div
                role="radiogroup"
                aria-label="Access & Supervision Choices"
                className="grid grid-cols-1 gap-2.5"
              >
                {schoolConfig.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;

                  return (
                    <div
                      key={opt.id}
                      data-option={opt.id}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() => setSelectedOptionId(opt.id)}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          setSelectedOptionId(opt.id);
                        }
                      }}
                      className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left flex items-start gap-3.5 focus:outline-hidden focus:ring-2 focus:ring-[#6757F5] ${
                        isSelected
                          ? "bg-[#FAF9F6] border-[#6757F5] ring-2 sm:ring-4 ring-[#EDEAFF] shadow-sm"
                          : "bg-white border-[#E8E6F3] hover:border-[#DDD8FE] hover:bg-[#FAF9F6]/50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? "border-[#6757F5] bg-[#6757F5] text-white"
                            : "border-[#C7C4E2] bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-[#171A2B]">
                            {opt.label}
                          </span>
                          <span className="text-[10px] font-semibold text-[#626987] bg-white px-2 py-0.5 rounded-md border border-[#E8E6F3] shrink-0">
                            {opt.badge}
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

            {/* Selected Mode: What Happens Next Callout */}
            {selectedOption ? (
              <div className="mt-4 p-3.5 rounded-xl bg-[#F0F7FF] border border-[#BFDBFE] text-left flex items-start gap-2.5 animate-fadeIn">
                <Info className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <div className="text-xs text-[#1E3A8A] leading-relaxed">
                  <span className="font-bold block">What happens next:</span>
                  <p className="mt-0.5">{selectedOption.nextStepExplanation}</p>
                </div>
              </div>
            ) : (
              <div className="mt-4 p-3 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] text-left flex items-center gap-2 text-xs text-[#626987]">
                <Lock className="w-3.5 h-3.5 shrink-0 text-[#6757F5]" />
                <span>Please select an access mode above to proceed to the next step.</span>
              </div>
            )}

            {/* Built-in Safety Principles for This Stage */}
            <div className="mt-5 p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-left space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#6757F5]">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#35B8C5]" />
                <span>Safety safeguards for {canonicalStage.label}:</span>
              </div>

              <div className="space-y-2">
                {schoolConfig.safeguards.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#31364F]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6757F5] mt-1.5 shrink-0" />
                    <p className="leading-relaxed">
                      <strong className="text-[#171A2B]">{item.title}:</strong>{" "}
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Controls */}
            <div className="mt-6 space-y-3">
              <button
                type="button"
                disabled={!selectedOption}
                onClick={handleContinue}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  selectedOption
                    ? "text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/25 hover:shadow-lg active:scale-[0.99] cursor-pointer"
                    : "text-[#626987] bg-[#E8E6F3] cursor-not-allowed opacity-70"
                }`}
              >
                <span>
                  {selectedOption
                    ? selectedOption.nextStepLabel
                    : "Select an Access Option to Continue"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <Link
                  href={backHref}
                  className="text-xs text-[#626987] hover:text-[#171A2B] hover:underline"
                >
                  Change academic stage
                </Link>
              </div>
            </div>
          </>
        )}
      </AuthCard>
    </AuthLayout>
  );
}

export default function StudentAccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-sm text-[#626987]">
          Loading safety &amp; access framework...
        </div>
      }
    >
      <StudentAccessContent />
    </Suspense>
  );
}
