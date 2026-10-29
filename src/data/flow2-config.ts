/**
 * FLOW 2 CONFIGURATION & STAGE-AWARE UTILITIES
 * Next Move AI V2 — Intelligent Entry, Signup & Sign In
 */

import { ACADEMIC_STAGES, type AcademicStageId, type AcademicStage } from "@/data/landing-demo";

// =============================================================================
// 1. STAGE-AWARE CONTEXTUAL COPY
// Directly aligned with Flow 2 specification
// =============================================================================

export const STAGE_AWARE_COPY: Record<AcademicStageId, {
  tagline: string;
  focusMessage: string;
  subtext: string;
  previewFocus: string;
}> = {
  "classes-4-7": {
    tagline: "Discover something new and create something fun.",
    focusMessage: "Curiosity & Playful Discovery",
    subtext: "Explore science gadgets, games, and creative storytelling without any grades or career pressure.",
    previewFocus: "Playground & Creative Trials",
  },
  "classes-8-10": {
    tagline: "Explore subjects, interests and practical skills.",
    focusMessage: "Interests & Subject Exploration",
    subtext: "Understand real-world stream choices (Science, Commerce, Arts) and build tangible projects you enjoy.",
    previewFocus: "10th Stream Clarity & Mini-Projects",
  },
  "classes-11-12": {
    tagline: "Explore your educational options and next steps.",
    focusMessage: "Streams, Degrees & Alternatives",
    subtext: "Compare entrance exams, colleges, realistic prerequisites, and high-impact computing or research alternatives.",
    previewFocus: "Degree Prerequisite & Trade-Off Matrix",
  },
  diploma: {
    tagline: "Build on your practical learning and explore what comes next.",
    focusMessage: "Hands-on Skills & Lateral Entry",
    subtext: "Connect technical diploma strengths with lateral-entry B.Tech programs or direct industry roles.",
    previewFocus: "Lateral Entry & Applied Engineering",
  },
  "degree-engineering": {
    tagline: "Explore your skills, possibilities and future pathways.",
    focusMessage: "Capabilities, Skills & Projects",
    subtext: "Build real portfolio evidence, compare tech stacks vs business domains, and prepare with clarity.",
    previewFocus: "Demonstrated Projects & Domain Selection",
  },
  "final-year-grad": {
    tagline: "Prepare for your next education or career transition.",
    focusMessage: "Demonstrated Projects & Next Step Clarity",
    subtext: "Evaluate master's degrees (GATE, GRE, CAT) vs startup and industry placements without herd anxiety.",
    previewFocus: "Transition Readiness & Portfolio Handoff",
  },
};

// =============================================================================
// 2. VALID STAGE VALIDATOR & RECOVERY
// =============================================================================

export const VALID_STAGE_IDS: AcademicStageId[] = [
  "classes-4-7",
  "classes-8-10",
  "classes-11-12",
  "diploma",
  "degree-engineering",
  "final-year-grad",
];

export function isValidStageId(stage: string | null | undefined): stage is AcademicStageId {
  if (!stage) return false;
  return VALID_STAGE_IDS.includes(stage as AcademicStageId);
}

export function getValidatedStage(stageParam: string | null | undefined): AcademicStage {
  if (isValidStageId(stageParam)) {
    const found = ACADEMIC_STAGES.find((s) => s.id === stageParam);
    if (found) return found;
  }
  // Safe default: Classes 11-12 (Pre-University)
  return ACADEMIC_STAGES[2];
}

// =============================================================================
// 3. AGE & ACCESS CONTEXT DEFINITIONS
// =============================================================================

export interface AgeCategoryOption {
  id: "under_13" | "13_to_17" | "18_plus";
  label: string;
  sublabel: string;
  accessRoute: "guardian_required" | "guardian_notified" | "standard_eligible";
  description: string;
}

export const AGE_CATEGORY_OPTIONS: AgeCategoryOption[] = [
  {
    id: "under_13",
    label: "Under 13 Years",
    sublabel: "Middle School / Classes 4–7",
    accessRoute: "guardian_required",
    description: "Requires verified parent or guardian authorization to protect minor privacy under data protection guidelines.",
  },
  {
    id: "13_to_17",
    label: "13 to 17 Years",
    sublabel: "High School & Pre-University (+2)",
    accessRoute: "guardian_notified",
    description: "Independent exploration space with periodic non-invasive guardian summary updates.",
  },
  {
    id: "18_plus",
    label: "18 Years or Older",
    sublabel: "College, Polytechnic & Graduates",
    accessRoute: "standard_eligible",
    description: "Standard independent account route with full autonomous student controls.",
  },
];
