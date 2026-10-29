/**
 * NEXT MOVE AI V2 — EVIDENCE STATUS CARD
 * 
 * Explains and displays the rigorous evidence hierarchy:
 * self_reported vs practised vs demonstrated vs not_assessed.
 */

"use client";

import React from "react";
import { ShieldCheck, Info } from "lucide-react";
import { type EvidenceStatus } from "../schemas/types";

interface EvidenceStatusCardProps {
  status: EvidenceStatus;
  showExplanation?: boolean;
}

const STATUS_METADATA: Record<
  EvidenceStatus,
  { label: string; badgeClass: string; description: string }
> = {
  self_reported: {
    label: "Self-Reported Familiarity",
    badgeClass: "bg-[#EDEAFF] text-[#6757F5] border-[#DDD8FE]",
    description: "Stated by you during onboarding. Kept distinct from evaluated work.",
  },
  practised: {
    label: "Practised in Challenge",
    badgeClass: "bg-[#E6F9FB] text-[#0891B2] border-[#B2EFF4]",
    description: "Attempted during an interactive micro-challenge or practical mini-task.",
  },
  demonstrated: {
    label: "Verified Artifact / Rubric",
    badgeClass: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]",
    description: "Validated through real submitted code, writing, or practical task rubrics.",
  },
  reviewed: {
    label: "Mentor / Peer Reviewed",
    badgeClass: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
    description: "Reviewed collaboratively with an advisor or educator.",
  },
  not_assessed: {
    label: "Not Assessed Yet",
    badgeClass: "bg-[#F4F3F8] text-[#626987] border-[#E8E6F3]",
    description: "Not yet explored. Never labeled as a deficiency or weak skill.",
  },
  needs_practice: {
    label: "Opportunity for Practice",
    badgeClass: "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]",
    description: "Identified learning area with actionable steps to improve.",
  },
};

export function EvidenceStatusCard({
  status,
  showExplanation = false,
}: EvidenceStatusCardProps) {
  const meta = STATUS_METADATA[status] || STATUS_METADATA.self_reported;

  return (
    <div className="space-y-1">
      <div className="inline-flex items-center gap-1.5">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${meta.badgeClass}`}
        >
          <ShieldCheck className="w-3 h-3" />
          <span>{meta.label}</span>
        </span>
      </div>

      {showExplanation && (
        <p className="text-[11px] text-[#626987] flex items-center gap-1 mt-0.5">
          <Info className="w-3 h-3 text-[#8C93AD] shrink-0" />
          <span>{meta.description}</span>
        </p>
      )}
    </div>
  );
}
