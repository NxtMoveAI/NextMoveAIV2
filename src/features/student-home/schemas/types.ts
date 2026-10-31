/**
 * NEXT MOVE AI V2 — FLOW 4: STUDENT HOME DASHBOARD SCHEMAS
 * 
 * Typed view models and state interfaces for the Personalized Student Home.
 * Derived from the confirmed Flow 3 StudentIntelligenceProfile.
 */

import { type AcademicStageId } from "@/data/landing-demo";
import {
  type EvidenceStatus,
  type AcademicContextData,
  type ClarityData,
  type InterestsData,
  type ActivityAttemptResult,
} from "@/features/onboarding/schemas/types";

// =============================================================================
// 1. YOUR NEXT MOVE (PRIMARY INTELLIGENT WIDGET)
// =============================================================================

export type NextMoveActionType =
  | "practical_challenge"
  | "compare_pathways"
  | "portfolio_exploration"
  | "skill_starter"
  | "curriculum_review"
  | "curiosity_project";

export interface NextMoveAction {
  id: string;
  title: string;
  description: string;
  whySuggested: string;
  supportingContext: string;
  effortMinutes: number | string;
  learningOutcome: string;
  actionType: NextMoveActionType;
  targetRoute?: string;
  isAlternative?: boolean;
  status: "active" | "postponed" | "completed" | "alternative_selected";
}

// =============================================================================
// 2. EXPLORE POSSIBILITIES PREVIEW
// =============================================================================

export type PossibilityDomainType =
  | "interest_exploration"
  | "educational_pathway"
  | "applied_skill_track"
  | "career_domain"
  | "creative_adventure";

export interface ExplorePossibilityItem {
  id: string;
  title: string;
  domainType: PossibilityDomainType;
  badgeLabel: string;
  summary: string;
  whySuggested: string;
  whatRemainsUnknown: string;
  tags: string[];
  actionLabel: string;
  actionRoute?: string;
}

// =============================================================================
// 3. MY GROWTH & EVIDENCE SNAPSHOT
// =============================================================================

export interface GrowthEvidenceEntry {
  id: string;
  title: string;
  evidenceStatus: EvidenceStatus;
  statusLabel: string;
  category: string;
  provenance: "you_told_us" | "practised_in_challenge" | "demonstrated" | "not_assessed";
  notes?: string;
}

export interface RecentActivityEvent {
  id: string;
  activityId: string;
  title: string;
  stageId: AcademicStageId;
  completedAt: string;
  timeAgo: string;
  feedbackGiven?: string;
  competencyPractised: string;
  wasCorrect?: boolean;
}

export interface GrowthSnapshotViewModel {
  hasAttemptedActivity: boolean;
  totalPractisedCount: number;
  totalSelfReportedCount: number;
  unassessedAreasCount: number;
  evidenceItems: GrowthEvidenceEntry[];
  recentActivity?: RecentActivityEvent;
  emptyStateMessage?: string;
}

// =============================================================================
// 4. MY PARTNER CONTEXTUAL PREVIEW
// =============================================================================

export interface PartnerStructuredAnswer {
  acknowledgement: string;
  explorationDirections: [string, string];
  tradeoffOrUnknown: string;
  suggestedFirstStep: string;
}

export interface PartnerQuestionPrompt {
  id: string;
  question: string;
  contextTag: string;
  response: PartnerStructuredAnswer;
}

// =============================================================================
// 5. STUDENT HOME COMPLETE VIEW MODEL
// =============================================================================

export interface StudentHomeViewModel {
  profileRevision: string;
  studentName?: string;
  isDemoMode: boolean;
  onboardingStatus: "confirmed" | "draft" | "incomplete" | "student_reviewed";
  academicStageId: AcademicStageId;
  academicStageLabel: string;
  academicSummary: string;
  academicContext: AcademicContextData;
  clarity: ClarityData;
  interests: InterestsData;
  primaryGoal: string;
  clarityLevelLabel: string;
  recommendedNextAction: NextMoveAction;
  alternativeNextActions: NextMoveAction[];
  possibilities: ExplorePossibilityItem[];
  growthSnapshot: GrowthSnapshotViewModel;
  partnerPrompts: PartnerQuestionPrompt[];
  latestMeaningfulActivity?: ActivityAttemptResult;
  updatedAt: string;
}

// =============================================================================
// 6. SYNTHETIC PERSONA IDENTIFIERS (DEVELOPMENT FIXTURES)
// =============================================================================

export type PersonaFixtureId =
  | "persona_a_class6"
  | "persona_b_class9"
  | "persona_c_class12"
  | "persona_d_diploma"
  | "persona_e_bca"
  | "persona_f_bcom"
  | "persona_g_engineering"
  | "persona_h_grad"
  | "persona_empty"
  | "persona_returning_bcom";
