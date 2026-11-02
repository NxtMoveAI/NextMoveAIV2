/**
 * NEXT MOVE AI V2 — FLOW 6: EVIDENCE LEDGER VIEW
 * 
 * Truthful, non-judgmental record of what the student has explored and practised.
 * Adheres strictly to canonical taxonomy: Self-Reported vs Practised vs Demonstrated.
 */

"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, Calendar, ArrowRight, Info, RotateCcw } from "lucide-react";
import { type StudentIntelligenceProfile } from "@/features/onboarding/schemas/types";
import { type TrialAttemptRecord } from "../types";

interface EvidenceLedgerViewProps {
  profile: StudentIntelligenceProfile | null;
  attempts: TrialAttemptRecord[];
  onRetryTrial?: (trialId: string) => void;
  onExploreMore: () => void;
}

export function EvidenceLedgerView({
  profile,
  attempts,
  onRetryTrial,
  onExploreMore,
}: EvidenceLedgerViewProps) {
  const completedAttempts = attempts.filter((a) => a.status === "completed");
  const selfReportedSkills = profile?.startingSkills || [];

  return (
    <div className="space-y-6">
      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 sm:p-5 rounded-3xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669]">
            Practised in Challenge
          </span>
          <p className="text-2xl sm:text-3xl font-black text-[#065F46]">
            {completedAttempts.length}
          </p>
          <p className="text-xs text-[#047857]">Real-world interactive challenges completed</p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-[#EFF6FF] border border-[#BFDBFE] space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8]">
            Self-Reported Familiarity
          </span>
          <p className="text-2xl sm:text-3xl font-black text-[#1E40AF]">
            {selfReportedSkills.length}
          </p>
          <p className="text-xs text-[#1D4ED8]">Topics you stated familiarity with</p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-[#F7F6FF] border border-[#DDD8FE] space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
            Unassessed Horizons
          </span>
          <p className="text-2xl sm:text-3xl font-black text-[#4338CA]">
            {Math.max(1, 8 - (completedAttempts.length + selfReportedSkills.length))}
          </p>
          <p className="text-xs text-[#626987]">Open directions to investigate next</p>
        </div>
      </div>

      {/* Epistemic Truth Banner */}
      <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-xs text-[#31364F] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#6757F5] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-[#6757F5] block">Next Move AI Evidence Integrity Guarantee</span>
          <p className="text-[#474D66] text-[11px] leading-relaxed">
            Completing an exploratory trial demonstrates hands-on familiarity and problem-solving practice—it is never automatically labeled as a certified mastery credential. Genuine competence requires formal assessment rubrics or portfolio verification.
          </p>
        </div>
      </div>

      {/* Completed Practical Trials Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-[#171A2B] uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#059669]" />
            <span>Completed Practical Challenge Records</span>
          </h2>
          <span className="text-xs text-[#626987]">
            {completedAttempts.length} recorded
          </span>
        </div>

        {completedAttempts.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-[#E8E6F3] text-center space-y-3">
            <p className="text-sm font-bold text-[#171A2B]">No trial challenges completed yet</p>
            <p className="text-xs text-[#626987] max-w-sm mx-auto">
              Your growth ledger records genuine practice when you complete an exploratory challenge. Try your first one today!
            </p>
            <button
              type="button"
              onClick={onExploreMore}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5342E8] transition-colors"
            >
              <span>Explore Trial Challenges</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {completedAttempts.map((attempt) => {
              const completedDate = attempt.completedAt
                ? new Date(attempt.completedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Recent";

              return (
                <div
                  key={attempt.id}
                  className="p-5 rounded-3xl bg-white border border-[#E8E6F3] shadow-2xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#059669]" />
                        <h3 className="text-sm font-bold text-[#171A2B]">{attempt.trialTitle}</h3>
                      </div>
                      <span className="text-[11px] text-[#626987] block pl-4">
                        Practised Competency: <strong>{attempt.competencyPractised}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pl-4 sm:pl-0">
                      <span className="text-[10px] font-bold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 rounded-full">
                        Practised
                      </span>
                      <span className="text-[11px] text-[#8C93AD] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{completedDate}</span>
                      </span>
                    </div>
                  </div>

                  {/* Reflection Notes Preview */}
                  {attempt.reflection && (
                    <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#F0EEF8] space-y-1.5 text-xs">
                      <div>
                        <strong className="text-[#171A2B]">What you enjoyed: </strong>
                        <span className="text-[#474D66]">&ldquo;{attempt.reflection.enjoyed}&rdquo;</span>
                      </div>
                      <div>
                        <strong className="text-[#171A2B]">What challenged you: </strong>
                        <span className="text-[#474D66]">&ldquo;{attempt.reflection.challenged}&rdquo;</span>
                      </div>
                      <div className="text-[11px] text-[#6757F5] font-semibold pt-1">
                        Explore again? {attempt.reflection.wouldExploreAgain === "yes" ? "Yes, definitely" : attempt.reflection.wouldExploreAgain === "maybe" ? "Maybe / Unsure" : "Not for me"}
                      </div>
                    </div>
                  )}

                  {/* Link to Pathway in Flow 5 */}
                  {attempt.pathwayId && (
                    <div className="pt-2 border-t border-[#F0EEF8] flex items-center justify-between text-xs">
                      <Link
                        href={`/dashboard/student/explore?focus=${attempt.pathwayId}`}
                        className="inline-flex items-center gap-1 text-[#6757F5] font-bold hover:underline"
                      >
                        <span>Investigate Related Pathway in Explore</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>

                      {onRetryTrial && (
                        <button
                          type="button"
                          onClick={() => onRetryTrial(attempt.trialId)}
                          className="inline-flex items-center gap-1 text-[#626987] hover:text-[#171A2B] font-semibold"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Retry</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Starting Stated Familiarity Items */}
      {selfReportedSkills.length > 0 && (
        <div className="space-y-3 pt-2 border-t border-[#E8E6F3]">
          <h2 className="text-sm font-black text-[#171A2B] uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1D4ED8]" />
            <span>Self-Reported Starting Familiarity (Flow 3 Baseline)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {selfReportedSkills.map((skill) => (
              <div
                key={skill.id}
                className="p-3.5 rounded-2xl bg-white border border-[#E8E6F3] flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <p className="font-bold text-[#171A2B]">{skill.name}</p>
                  <p className="text-[10px] text-[#626987] capitalize">{skill.category.replace("_", " ")}</p>
                </div>
                <span className="text-[10px] font-bold text-[#1D4ED8] bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 rounded-full shrink-0">
                  Self-Reported
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
