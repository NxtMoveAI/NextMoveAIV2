/**
 * NEXT MOVE AI V2 — FLOW 8: MY PARTNER TYPE DEFINITIONS
 * 
 * Typed AI companion contracts, conversation data models, epistemic grounding schemas,
 * and structured action contracts.
 */

import { type AcademicStageId } from "@/data/landing-demo";
import { type EvidenceStatus } from "@/features/validate-fit/types";

export type MessageRole = "user" | "partner" | "system";

export type EpistemicSource =
  | "profile_fact"             // Confirmed academic stage, stream, board
  | "self_reported_interest"   // Stated in onboarding or preferences
  | "practised_evidence"       // Completed trial / task in Validate Fit
  | "active_roadmap"          // Milestone progress in Build My Next Move
  | "active_project"          // Ongoing student project
  | "curated_catalog"         // Verified pathway or opportunity listing
  | "unassessed_gap";         // Explicitly declared unknown / not evaluated

export interface EpistemicCitation {
  id: string;
  sourceType: EpistemicSource;
  label: string;
  detail: string;
  linkHref?: string;
}

export type SuggestedActionType =
  | "navigate_explore"         // Go to Explore Possibilities
  | "navigate_growth"          // Go to Validate Fit / Growth Trials
  | "navigate_projects"        // Go to Build My Next Move / Projects
  | "add_roadmap_milestone"    // Propose adding a step to the student's roadmap
  | "save_pathway"             // Propose saving a recommended pathway
  | "start_starter_project";   // Propose starting a specific project

export interface PartnerActionSuggestion {
  id: string;
  type: SuggestedActionType;
  title: string;
  description: string;
  targetHref?: string;
  payload?: {
    pathwayId?: string;
    milestoneTitle?: string;
    milestoneEstimatedHours?: number;
    milestoneVerificationMethod?: string;
    projectId?: string;
  };
  requiresConfirmation: boolean;
  executed?: boolean;
}

export interface PartnerMessage {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  citations?: EpistemicCitation[];
  suggestedActions?: PartnerActionSuggestion[];
  isPrototypeSimulated?: boolean;
}

export interface PartnerContextSnapshot {
  studentProfile: {
    profileId: string;
    studentName: string;
    academicStageId: AcademicStageId;
    academicSummary: string;
    streamOrBranch?: string;
    curriculumOrBoard?: string;
    clarityLevel?: string;
    isConfirmedProfile: boolean;
  };
  selfReportedInterests: string[];
  savedPathways: {
    id: string;
    title: string;
    stream: string;
    category: string;
  }[];
  practisedEvidence: {
    trialId: string;
    trialTitle: string;
    competencyPractised: string;
    evidenceStatus: EvidenceStatus;
    completedAt?: string;
  }[];
  activeRoadmap: {
    id: string;
    title: string;
    totalMilestones: number;
    completedMilestones: number;
    pacing: string;
  } | null;
  activeProjects: {
    id: string;
    title: string;
    status: "in_progress" | "completed" | "paused";
    progressPercentage: number;
  }[];
  epistemicGaps: string[];
}

export interface SuggestedPrompt {
  id: string;
  label: string;
  promptText: string;
  category: "next_action" | "pathway_compare" | "skill_evidence" | "exam_balance" | "project_help";
  applicableStages?: AcademicStageId[];
}

export interface PartnerConversation {
  conversationId: string;
  profileScope: string;
  createdAt: string;
  lastActiveAt: string;
  messages: PartnerMessage[];
}

export interface PartnerServiceAdapter {
  generateResponse(params: {
    conversationId: string;
    userQuery: string;
    context: PartnerContextSnapshot;
    history: PartnerMessage[];
  }): Promise<PartnerMessage>;
}
