/**
 * NEXT MOVE AI V2 — FLOW 8: PRIVACY GUARD BANNER
 * 
 * Context-aware privacy banner providing child-safety notifications for minors (Classes 4–10)
 * and epistemic grounding guarantees for older students and graduates.
 */

"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, X } from "lucide-react";
import { type AcademicStageId } from "@/data/landing-demo";

interface PrivacyGuardBannerProps {
  stageId: AcademicStageId;
  isConfirmedProfile: boolean;
}

export function PrivacyGuardBanner({ stageId, isConfirmedProfile }: PrivacyGuardBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const isMinorCohort = stageId === "classes-4-7" || stageId === "classes-8-10";

  return (
    <div
      data-testid="privacy-guard-banner"
      className={`px-4 py-3 border-b text-xs transition-colors flex items-center justify-between gap-4 ${
        isMinorCohort
          ? "bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]"
          : "bg-[#F8F9FC] border-[#E2E8F0] text-[#475569]"
      }`}
    >
      <div className="flex items-center gap-2.5">
        {isMinorCohort ? (
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#22C55E]" aria-hidden="true" />
        ) : (
          <Lock className="w-4 h-4 shrink-0 text-[#6757F5]" aria-hidden="true" />
        )}

        <div className="leading-relaxed">
          {isMinorCohort ? (
            <span>
              <strong>Student Privacy & Safety Guard:</strong> Designed for young explorers. Conversation data is private, session-scoped, and never shared or used to train public models. Guardians can review profile settings at any time.
            </span>
          ) : (
            <span>
              <strong>Epistemic Grounding Guarantee:</strong> Responses are grounded exclusively in your authentic session profile ({isConfirmedProfile ? "Confirmed" : "Exploratory Prototype"}). No fabricated confidence scores, rank predictions, or false guarantees.
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsDismissed(true)}
        className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-black/5 transition-colors shrink-0"
        aria-label="Dismiss privacy notice"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
