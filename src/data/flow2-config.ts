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
    subtext: "Compare entrance exams, colleges, realistic prerequisites, and pathway possibilities across Science, Commerce, and Humanities without pressure.",
    previewFocus: "Degree Prerequisite & Pathway Explorer",
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

/**
 * Returns the matching AcademicStage object if valid, or null if missing or invalid.
 * CRITICAL: Never silently defaults to Class 12.
 */
export function getStageOrNull(stageParam: string | null | undefined): AcademicStage | null {
  if (isValidStageId(stageParam)) {
    const found = ACADEMIC_STAGES.find((s) => s.id === stageParam);
    if (found) return found;
  }
  return null;
}

/**
 * Convenience helper to look up a stage known to be a valid AcademicStageId.
 */
export function getStageById(stageId: AcademicStageId): AcademicStage {
  const found = ACADEMIC_STAGES.find((s) => s.id === stageId);
  return found || ACADEMIC_STAGES[0];
}

// Deprecated alias for backwards-compatibility, strictly returns null when invalid
export function getValidatedStage(stageParam: string | null | undefined): AcademicStage | null {
  return getStageOrNull(stageParam);
}

// =============================================================================
// 2B. LEARNING SITUATION & AUDIENCE VALIDATORS (PROMPT 6)
// Keeps Academic Stage, Learning Situation, Audience, and Account Role strictly separate.
// =============================================================================

export type LearningSituationId = "discover" | "begin" | "progress";

export const VALID_SITUATIONS: LearningSituationId[] = ["discover", "begin", "progress"];

export function isValidSituation(situation: string | null | undefined): situation is LearningSituationId {
  if (!situation) return false;
  return VALID_SITUATIONS.includes(situation as LearningSituationId);
}

export const SITUATION_CONFIG: Record<
  LearningSituationId,
  {
    label: string;
    title: string;
    description: string;
    defaultStage: AcademicStageId;
  }
> = {
  discover: {
    label: "Discover",
    title: "Explore Interests & Direction",
    description: "Uncertain what direction fits best; explore disciplines and emerging possibilities without commitment.",
    defaultStage: "degree-engineering",
  },
  begin: {
    label: "Begin",
    title: "Build Fundamental Capabilities",
    description: "Know the general direction; start building structured foundational capabilities and practical projects.",
    defaultStage: "degree-engineering",
  },
  progress: {
    label: "Progress",
    title: "Advance & Demonstrated Projects",
    description: "Already have skills and projects; prepare for practical internships, higher education or career transition.",
    defaultStage: "final-year-grad",
  },
};

export type AudienceId = "school" | "college" | "professionals";

export const VALID_AUDIENCES: AudienceId[] = ["school", "college", "professionals"];

export function isValidAudience(audience: string | null | undefined): audience is AudienceId {
  if (!audience) return false;
  return VALID_AUDIENCES.includes(audience as AudienceId);
}

export const AUDIENCE_CONFIG: Record<
  AudienceId,
  {
    label: string;
    badge: string;
    description: string;
  }
> = {
  school: {
    label: "School (Classes 4–12)",
    badge: "Next Move Explore",
    description: "Curiosity, creativity, foundational skills, and stream exploration.",
  },
  college: {
    label: "College & Higher Ed",
    badge: "Next Move Build",
    description: "Discover, Begin, and Progress pathways for Diploma, Degree, and Engineering.",
  },
  professionals: {
    label: "Experienced Professionals",
    badge: "Next Move Grow (Research)",
    description: "Transferable skills and career growth. Currently in research and development.",
  },
};

// =============================================================================
// 2C. ACCOUNT ROLE VALIDATORS (PROMPT 6.1)
// Validates account role query parameters against the strict Flow 2 contract.
// =============================================================================

export type AccountRoleId = "student" | "professional" | "parent";

export const VALID_ACCOUNT_ROLES: AccountRoleId[] = ["student", "professional", "parent"];

export function isValidAccountRole(role: string | null | undefined): role is AccountRoleId {
  if (!role) return false;
  return VALID_ACCOUNT_ROLES.includes(role as AccountRoleId);
}

// =============================================================================
// 2D. ACADEMIC CONTEXT VALIDATORS (PROMPT 7)
// Distinguishes Degree vs Engineering and other specialized stream contexts
// without mutating the canonical 6 academic stage IDs.
// =============================================================================

export type AcademicContextParam = "degree" | "engineering" | "diploma" | "final-year-grad" | "bca";

export const VALID_ACADEMIC_CONTEXTS: AcademicContextParam[] = [
  "degree",
  "engineering",
  "diploma",
  "final-year-grad",
  "bca",
];

export function isValidAcademicContext(ctx: string | null | undefined): ctx is AcademicContextParam {
  if (!ctx) return false;
  return VALID_ACADEMIC_CONTEXTS.includes(ctx as AcademicContextParam);
}

export const ACADEMIC_CONTEXT_CONFIG: Record<
  AcademicContextParam,
  {
    label: string;
    focus: string;
    description: string;
  }
> = {
  degree: {
    label: "Degree Focus",
    focus: "BCA · B.Com · BBA · B.Sc",
    description: "Multi-disciplinary undergraduate programs, applied business and technical foundations.",
  },
  engineering: {
    label: "Engineering Focus",
    focus: "B.Tech · B.E. Disciplines",
    description: "Applied engineering, core architecture, algorithms and systems design.",
  },
  diploma: {
    label: "Diploma Focus",
    focus: "Polytechnic & Applied Tech",
    description: "Hands-on technical diploma, lateral entry pathways, and practical engineering skills.",
  },
  "final-year-grad": {
    label: "Transition Focus",
    focus: "Capstone & Graduation",
    description: "Preparation for post-graduate education, verified project portfolios, and career transitions.",
  },
  bca: {
    label: "BCA Focus",
    focus: "Computer Applications & Scripting",
    description: "Computer applications, scripting, databases, and portfolio software development.",
  },
};

// =============================================================================
// 3. AGE & ACCESS CONTEXT DEFINITIONS (3-Tier Framework)
// =============================================================================

export interface AgeCategoryOption {
  id: "under_13" | "13_to_17" | "18_plus";
  label: string;
  sublabel: string;
  accessRoute: "guardian_led" | "teen_guardian_required" | "adult_independent";
  description: string;
  authorizationRequirement: string;
}

export const AGE_CATEGORY_OPTIONS: AgeCategoryOption[] = [
  {
    id: "under_13",
    label: "Under 13 Years",
    sublabel: "Middle School / Classes 4–7",
    accessRoute: "guardian_led",
    description: "Requires a parent or legal guardian to lead account creation and complete verified co-setup before exploration begins.",
    authorizationRequirement: "Parent/Guardian Co-Setup Required",
  },
  {
    id: "13_to_17",
    label: "13 to 17 Years",
    sublabel: "High School & Pre-University (+2)",
    accessRoute: "teen_guardian_required",
    description: "Teen student entry space. Under minor safety frameworks (including phased DPDP review), active continuous features require guardian authorization and linking confirmation.",
    authorizationRequirement: "Guardian Authorization Pending",
  },
  {
    id: "18_plus",
    label: "18 Years or Older",
    sublabel: "College, Polytechnic & Graduates",
    accessRoute: "adult_independent",
    description: "Standard adult student account entry with autonomous student controls and privacy self-management.",
    authorizationRequirement: "Direct Autonomous Entry",
  },
];

// =============================================================================
// 4. PARENT & GUARDIAN ROLE CLASSIFICATION
// =============================================================================

export type ParentAccountRoleType = "parent_guardian" | "mentor_advisor";

export interface ParentRoleOption {
  id: ParentAccountRoleType;
  title: string;
  badge: string;
  description: string;
  canAuthorizeMinors: boolean;
}

export const PARENT_ROLE_OPTIONS: ParentRoleOption[] = [
  {
    id: "parent_guardian",
    title: "Parent or Legal Guardian",
    badge: "Authorization Eligible",
    description: "Eligible to provide legal guardian authorization for minor children (under 18) following secure identity verification.",
    canAuthorizeMinors: true,
  },
  {
    id: "mentor_advisor",
    title: "Mentor, Teacher, or Academic Advisor",
    badge: "Advisory Role Only",
    description: "Educational support and guidance role. Does not hold legal parental authority to authorize minor data processing.",
    canAuthorizeMinors: false,
  },
];
