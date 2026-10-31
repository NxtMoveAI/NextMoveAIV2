/**
 * NEXT MOVE AI V2 — STAGE H: STUDENT INTELLIGENCE STARTING PROFILE
 * 
 * The central artifact of Flow 3.
 * Features 7 structured sections, evidence taxonomy badges, explicit
 * "What Remains Unknown" notes, edit hooks, and typed Flow 4 handoff.
 */

"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  GraduationCap,
  Compass,
  Layers,
  Target,
  ArrowRight,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Clock,
  HelpCircle,
} from "lucide-react";
import { type AcademicStageId } from "@/data/landing-demo";
import {
  type StudentIntelligenceProfile,
  type OnboardingStepId,
} from "../schemas/types";
import { EvidenceStatusCard } from "./EvidenceStatusCard";
import { STAGE_AWARE_COPY } from "@/data/flow2-config";

interface StartingProfileProps {
  profile: StudentIntelligenceProfile;
  stageId: AcademicStageId;
  isConfirmed: boolean;
  confirmedId: string | null;
  isSubmitting: boolean;
  onEditStep: (stepId: OnboardingStepId) => void;
  onConfirmProfile: () => void;
}

export function StartingProfile({
  profile,
  stageId,
  isConfirmed,
  confirmedId,
  isSubmitting,
  onEditStep,
  onConfirmProfile,
}: StartingProfileProps) {
  const stageCopy = STAGE_AWARE_COPY[stageId];

  // Helper to extract academic description
  const getAcademicSummary = () => {
    const { academicContext } = profile;
    switch (academicContext.type) {
      case "classes-4-7":
        return `${academicContext.data.currentClass} • Primary & Middle School`;
      case "classes-8-10":
        return `${academicContext.data.currentClass} • Secondary School`;
      case "classes-11-12":
        return `${academicContext.data.currentClass} • ${academicContext.data.stream}`;
      case "diploma":
        return `${academicContext.data.branch} (${academicContext.data.currentYear}) • Technical Diploma`;
      case "degree-engineering":
        return `${academicContext.data.degreeProgram} in ${academicContext.data.branchOrMajor} (${academicContext.data.currentYear})`;
      case "final-year-grad":
        return `${academicContext.data.completedDegree} • ${academicContext.data.transitionStage}`;
      default:
        return stageCopy.focusMessage;
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#DDD8FE] shadow-xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider border border-[#DDD8FE]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stage H • Initial Student Intelligence Profile</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black text-[#171A2B] tracking-tight">
            Your journey starts here.
          </h1>
          <p className="text-sm sm:text-base text-[#474D66] max-w-xl mx-auto leading-relaxed">
            Here&apos;s what we&apos;ve understood so far. You can change anything, explore more, and grow your intelligence record over time.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-2 text-xs font-bold text-[#626987]">
          <span>Profile Status:</span>
          <span
            className={`px-2.5 py-0.5 rounded-full border ${
              isConfirmed
                ? "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]"
                : "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]"
            }`}
          >
            {isConfirmed ? "Confirmed by Student" : "Draft (Under Review)"}
          </span>
          {confirmedId && (
            <span className="text-[11px] font-mono text-[#8C93AD]">
              ID: {confirmedId}
            </span>
          )}
        </div>
      </div>

      {/* Confirmation Success Callout (If confirmed) */}
      {isConfirmed && (
        <div className="p-6 rounded-3xl bg-[#ECFDF5] border border-[#A7F3D0] shadow-md space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 text-sm font-bold text-[#065F46]">
            <CheckCircle2 className="w-5 h-5 text-[#059669]" />
            <span>Starting Intelligence Profile Confirmed!</span>
          </div>
          <p className="text-xs text-[#047857] leading-relaxed">
            Your profile baseline has been approved. In production, this record is stored in Supabase with strict student-controlled privacy. Next Move AI will never lock you into a single career path.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-xs font-bold text-[#059669] border border-[#A7F3D0]">
              <span>Flow 4 Handoff Ready:</span>
              <span className="font-mono text-[11px]">/dashboard/student</span>
            </div>
            <span className="text-xs text-[#065F46]">
              (Flow 4 Home Dashboard will be developed in the next sprint)
            </span>
          </div>
        </div>
      )}

      {/* Section 1: Academic Starting Point */}
      <section
        aria-labelledby="sec-academic-title"
        className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E6F3] shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EDEAFF] border border-[#DDD8FE] flex items-center justify-center text-[#6757F5]">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
                Section 1
              </span>
              <h2 id="sec-academic-title" className="text-base font-black text-[#171A2B]">
                Academic Starting Point
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onEditStep("academic")}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#6757F5] hover:text-[#5342E8] px-3 py-1.5 rounded-lg border border-[#DDD8FE] hover:bg-[#EDEAFF] transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#DDD8FE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-sm font-black text-[#171A2B]">
              {getAcademicSummary()}
            </div>
            <div className="text-xs text-[#626987] mt-0.5">
              Stage Context: {stageCopy.tagline}
            </div>
          </div>
          <span className="self-start sm:self-center text-xs font-bold px-3 py-1 rounded-full bg-white border border-[#E8E6F3] text-[#31364F]">
            {stageId}
          </span>
        </div>
      </section>

      {/* Section 2: Interests and Curiosity */}
      <section
        aria-labelledby="sec-interests-title"
        className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E6F3] shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#F5EEFE] border border-[#E4D4F9] flex items-center justify-center text-[#9333EA]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9333EA]">
                Section 2
              </span>
              <h2 id="sec-interests-title" className="text-base font-black text-[#171A2B]">
                Interests & Curiosity
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onEditStep("interests")}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#6757F5] hover:text-[#5342E8] px-3 py-1.5 rounded-lg border border-[#DDD8FE] hover:bg-[#EDEAFF] transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {profile.interests.selectedCategoryIds.length > 0 ? (
              profile.interests.selectedCategoryIds.map((catId) => (
                <span
                  key={catId}
                  className="px-3 py-1.5 rounded-xl bg-[#F7F6FF] text-[#5342E8] border border-[#DDD8FE] text-xs font-bold capitalize"
                >
                  {catId.replace(/_/g, " ")}
                </span>
              ))
            ) : (
              <span className="px-3 py-1.5 rounded-xl bg-[#F7F6FF] text-[#5342E8] border border-[#DDD8FE] text-xs font-bold">
                Still Exploring (Open to all directions)
              </span>
            )}
          </div>

          {profile.interests.selectedSubInterestIds.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] text-xs space-y-1.5">
              <span className="font-bold text-[#626987] block uppercase tracking-wider text-[10px]">
                Specific Sub-Topics of Interest:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {profile.interests.selectedSubInterestIds.map((subId) => (
                  <span
                    key={subId}
                    className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E6F3] text-[#31364F] text-[11px] font-semibold"
                  >
                    {subId.replace(/^[^_]+_/, "").replace(/_/g, " ")}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.interests.customInterestText && (
            <div className="p-3 rounded-xl bg-[#F0FCFD] border border-[#B2EFF4] text-xs text-[#0891B2]">
              <strong>In your own words:</strong> &ldquo;{profile.interests.customInterestText}&rdquo;
            </div>
          )}
        </div>
      </section>

      {/* Section 3: Where You Stand (Evidence Taxonomy) */}
      <section
        aria-labelledby="sec-evidence-title"
        className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E6F3] shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E6F9FB] border border-[#B2EFF4] flex items-center justify-center text-[#0891B2]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0891B2]">
                Section 3
              </span>
              <h2 id="sec-evidence-title" className="text-base font-black text-[#171A2B]">
                Where You Stand (Evidence Taxonomy)
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onEditStep("starting-point")}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#6757F5] hover:text-[#5342E8] px-3 py-1.5 rounded-lg border border-[#DDD8FE] hover:bg-[#EDEAFF] transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        <p className="text-xs text-[#626987] leading-relaxed">
          Next Move AI tracks capabilities with strict epistemic honesty. We never conflate self-reported interest with verified proof.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {profile.startingSkills.map((sk) => (
            <div
              key={sk.id}
              className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] flex flex-col justify-between gap-2"
            >
              <div>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C93AD]">
                    {sk.category}
                  </span>
                  <EvidenceStatusCard status={sk.evidenceStatus} />
                </div>
                <div className="text-xs font-black text-[#171A2B] mt-1">
                  {sk.name}
                </div>
              </div>

              <div className="text-[11px] text-[#626987] flex items-center gap-1 pt-1 border-t border-[#E8E6F3]">
                <span>Familiarity:</span>
                <span className="font-bold text-[#31364F] capitalize">
                  {sk.familiarity.replace(/_/g, " ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Current Questions and Goals */}
      <section
        aria-labelledby="sec-goals-title"
        className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E6F3] shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center text-[#D97706]">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706]">
                Section 4
              </span>
              <h2 id="sec-goals-title" className="text-base font-black text-[#171A2B]">
                Current Questions & Goals
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onEditStep("clarity")}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#6757F5] hover:text-[#5342E8] px-3 py-1.5 rounded-lg border border-[#DDD8FE] hover:bg-[#EDEAFF] transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#DDD8FE] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#171A2B]">
              Clarity Assessment:
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EDEAFF] text-[#5342E8]">
              {profile.interests.selectedCategoryIds.includes("still_exploring")
                ? "Exploring Multiple Directions"
                : profile.clarity.clarityLevel === "somewhat_clear" || profile.clarity.clarityLevel === "few_interests"
                ? "Evaluating Potential Directions"
                : profile.clarity.clarityLevel.replace(/_/g, " ")}
            </span>
          </div>

          <p className="text-xs text-[#474D66] leading-relaxed">
            <strong>Your Main Stated Focus:</strong> &ldquo;{profile.clarity.primaryHelpReason}&rdquo;
          </p>

          {profile.reflection.immediateSupportNeeded.length > 0 && (
            <div className="pt-2 border-t border-[#E8E6F3]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C93AD] block mb-1">
                Requested Learning Support:
              </span>
              <ul className="text-xs text-[#31364F] space-y-1 list-disc list-inside">
                {profile.reflection.immediateSupportNeeded.map((sup) => (
                  <li key={sup} className="capitalize">
                    {sup.replace(/_/g, " ")}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Section 5: Possibilities to Explore */}
      <section
        aria-labelledby="sec-possibilities-title"
        className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E6F3] shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EDEAFF] border border-[#DDD8FE] flex items-center justify-center text-[#6757F5]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
                Section 5
              </span>
              <h2 id="sec-possibilities-title" className="text-base font-black text-[#171A2B]">
                Possibilities to Explore (Suggestions, Not Prescriptions)
              </h2>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#626987] leading-relaxed">
          These are initial starting ideas to investigate, not deterministic career rankings. Each idea clearly discloses the rationale and what remains unknown.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.possibilities.map((pos) => (
            <div
              key={pos.id}
              className="p-5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-black text-[#171A2B]">
                    {pos.title}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white px-2 py-0.5 rounded-md border border-[#DDD8FE] text-[#6757F5] shrink-0">
                    {pos.type.replace(/_/g, " ")}
                  </span>
                </div>

                <p className="text-xs text-[#474D66] leading-relaxed">
                  {pos.summary}
                </p>

                <div className="p-3 rounded-xl bg-white border border-[#E8E6F3] space-y-1.5 text-xs">
                  <div>
                    <span className="font-bold text-[#059669] flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Why Suggested:</span>
                    </span>
                    <p className="text-[11px] text-[#31364F]">{pos.whySuggested}</p>
                  </div>

                  <div className="pt-1 border-t border-[#E8E6F3]">
                    <span className="font-bold text-[#D97706] flex items-center gap-1 text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>What Remains Unknown:</span>
                    </span>
                    <p className="text-[11px] text-[#626987]">{pos.whatRemainsUnknown}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#6757F5] font-bold flex items-center gap-1">
                <span>Recommended Investigation:</span>
                <span className="text-[#171A2B] font-semibold truncate">
                  {pos.sampleNextActions[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Your First Next Move */}
      <section
        aria-labelledby="sec-nextmove-title"
        className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E6F3] shadow-sm space-y-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669]">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669]">
              Section 6
            </span>
            <h2 id="sec-nextmove-title" className="text-base font-black text-[#171A2B]">
              Your First Next Move
            </h2>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#F0FCFD] border border-[#B2EFF4] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0891B2] bg-white px-2.5 py-0.5 rounded-full border border-[#B2EFF4]">
                Starter Action • ~{profile.firstNextMove.estimatedTime}
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold text-[#0891B2]">
              {profile.firstNextMove.actionType.replace(/_/g, " ")}
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-black text-[#171A2B]">
              {profile.firstNextMove.title}
            </h3>
            <p className="text-xs text-[#31364F] leading-relaxed">
              {profile.firstNextMove.description}
            </p>
          </div>

          <p className="text-[11px] text-[#0891B2] italic">
            You are in full control. When your private workspace opens in Flow 4, you can swap this action with any other exploration.
          </p>
        </div>
      </section>

      {/* Section 7: Review & Confirm */}
      <section
        aria-labelledby="sec-confirm-title"
        className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#F7F6FF] to-white border border-[#DDD8FE] shadow-xl text-center space-y-6"
      >
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
            Section 7 • Review & Confirmation
          </span>
          <h2 id="sec-confirm-title" className="text-xl sm:text-2xl font-black text-[#171A2B]">
            Ready to confirm your starting baseline?
          </h2>
          <p className="text-xs sm:text-sm text-[#626987] max-w-lg mx-auto">
            Confirming validates this draft with our typed API adapter. In production, this stores your initial profile securely in Supabase under your private student session.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onEditStep("academic")}
            className="px-4 py-2.5 rounded-xl border border-[#DDD8FE] bg-white text-xs font-bold text-[#6757F5] hover:bg-[#EDEAFF] transition-colors"
          >
            Review Academic Context
          </button>

          <button
            type="button"
            onClick={() => onEditStep("interests")}
            className="px-4 py-2.5 rounded-xl border border-[#DDD8FE] bg-white text-xs font-bold text-[#6757F5] hover:bg-[#EDEAFF] transition-colors"
          >
            Explore Another Interest
          </button>

          <button
            type="button"
            disabled={isSubmitting || isConfirmed}
            onClick={onConfirmProfile}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold text-white shadow-lg shadow-[#6757F5]/25 transition-all ${
              isConfirmed
                ? "bg-[#059669] cursor-default"
                : isSubmitting
                ? "bg-[#8C93AD] cursor-not-allowed"
                : "bg-[#6757F5] hover:bg-[#5342E8] transform hover:-translate-y-0.5"
            }`}
          >
            {isConfirmed ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile Confirmed (Flow 4 Handoff Ready)</span>
              </>
            ) : isSubmitting ? (
              <span>Saving Confirmed Profile...</span>
            ) : (
              <>
                <span>Confirm My Starting Point</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {isConfirmed && (
          <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Link
              href="/dashboard/student"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-lg shadow-[#6757F5]/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>Enter My Student Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Development Demo Notice */}
        <div className="pt-4 border-t border-[#E8E6F3] text-[11px] text-[#626987] max-w-lg mx-auto flex items-center justify-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-[#6757F5] shrink-0" />
          <span>
            Simulated frontend adapter active. No live credentials or personal data persisted to localStorage.
          </span>
        </div>
      </section>
    </div>
  );
}
