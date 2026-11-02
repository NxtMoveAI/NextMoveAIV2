/**
 * NEXT MOVE AI V2 — FLOW 7: BUILD MY NEXT MOVE TYPES
 * 
 * Strict typed contracts for:
 * 1. Roadmaps & Adaptive Milestone Planning
 * 2. Projects & Portfolio Evidence Building
 * 3. Practical Experiences (Extending Flow 6 Validate Fit)
 * 4. Age-Appropriate Career & Educational Opportunities
 * 5. Continuous Growth Engine & Recommendations
 * 
 * Epistemic mandate:
 * - "We don't decide careers; we enable clarity."
 * - Zero fabricated scores, fake certainty, or guaranteed outcomes.
 * - Clear distinction of Verified vs Curated vs Prototype listings.
 */

import { type AcademicStageId } from "@/data/landing-demo";
import { type InterestCategoryId } from "@/features/validate-fit/types";

export type { AcademicStageId } from "@/data/landing-demo";

// =============================================================================
// 1. WORKSPACE TABS & VIEW NAVIGATION
// =============================================================================

export type NextMoveWorkspaceTab =
  | "overview"       // Personalized Next Move situation & single recommended step
  | "roadmaps"       // Flexible roadmap builder with phases & milestones
  | "projects"       // Project starter catalog & active project workspace
  | "experiences"    // Extended hands-on challenges & real-world tasks
  | "opportunities"; // Age-gated internships, education routes & enrichment

// =============================================================================
// 2. ROADMAPS & ADAPTIVE MILESTONES
// =============================================================================

export type RoadmapPacing = "flexible" | "weekly" | "monthly" | "steady" | "exploratory" | "intensive";

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  category: "foundational_skill" | "practical_project" | "educational_route" | "reflection";
  estimatedHours: number;
  isCompleted: boolean;
  completedAt?: string;
  studentNotes?: string;
  relatedPathwayId?: string;
  relatedTrialId?: string;
  relatedProjectId?: string;
  skillTags?: string[];
  associatedProjectTemplateId?: string;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  growthObjective: string;
  estimatedDuration?: string;
  milestones: RoadmapMilestone[];
  isCurrent: boolean;
  status?: "in_progress" | "completed" | "upcoming";
}

export interface AlternativeTrackOption {
  trackId: string;
  title: string;
  description: string;
  suggestedShiftReason?: string;
}

export interface StudentRoadmap {
  id: string;
  trackId?: string;
  title: string;
  description: string;
  stageSuitability: AcademicStageId[];
  targetFocus: string;
  focusDiscipline?: string;
  broadObjective: string;
  pacing: RoadmapPacing;
  phases: RoadmapPhase[];
  alternativePaths?: {
    title: string;
    description: string;
    suggestedShiftReason: string;
  }[];
  alternativeTracks?: AlternativeTrackOption[];
  createdAt: string;
  updatedAt: string;
  isCustom: boolean;
}

// =============================================================================
// 3. PROJECTS WORKSPACE & ARTIFACTS
// =============================================================================

export type ProjectDifficulty = "beginner" | "intermediate" | "advanced";

export interface ProjectStep {
  id: string;
  stepNumber: number;
  title: string;
  instruction: string;
  description?: string;
  guidanceTip?: string;
  isCompleted: boolean;
  workNotes?: string;
  completedAt?: string;
}

export type ProjectArtifactType =
  | "link_github"
  | "link_figma"
  | "link_document"
  | "link_spreadsheet"
  | "notes_summary"
  | "image_proof";

export interface ProjectEvidenceArtifact {
  id: string;
  title: string;
  type?: ProjectArtifactType;
  artifactType: ProjectArtifactType;
  urlOrReference: string;
  url?: string;
  description?: string;
  addedAt: string;
}

export interface ProjectTemplate {
  id: string;
  title: string;
  subtitle: string;
  stageSuitability: AcademicStageId[];
  categoryId: InterestCategoryId;
  categoryLabel: string;
  difficulty: ProjectDifficulty;
  estimatedHours: number;
  problemStatement: string;
  deliverableSummary?: string;
  skillsCovered?: string[];
  learningObjectives: string[];
  whatThisClarifies: string;
  starterSteps: {
    title: string;
    instruction: string;
    guidanceTip?: string;
  }[];
  deliverableSuggestions: string[];
  relatedPathwayIds: string[];
  tags: string[];
}

export interface ProjectReflectionData {
  whatWorkedWell?: string;
  biggestObstacle?: string;
  whatLearnedAboutSelf?: string;
  wouldContinueField?: "yes" | "maybe" | "not_for_me";
  whatLearned?: string;
  whatWasChallenging?: string;
  wouldPursueFurther?: "yes" | "maybe" | "no";
  nextCuriosity?: string;
  submittedAt?: string;
}

export interface ActiveProject {
  id: string;
  templateId?: string;
  title: string;
  problemStatement: string;
  stageId: AcademicStageId;
  categoryId: InterestCategoryId;
  categoryLabel: string;
  difficulty?: ProjectDifficulty;
  estimatedHours?: number;
  status: "in_progress" | "completed" | "paused";
  steps: ProjectStep[];
  artifacts: ProjectEvidenceArtifact[];
  reflection?: ProjectReflectionData;
  startedAt: string;
  completedAt?: string;
  isSyntheticFixture?: boolean;
}

// =============================================================================
// 4. PRACTICAL EXPERIENCES (EXTENDING FLOW 6)
// =============================================================================

export type ExperienceType =
  | "career_tasting"
  | "real_world_problem"
  | "guided_simulation"
  | "community_project"
  | "research_activity"
  | "workplace_exposure"
  | "entrepreneurship_experiment";

export interface PracticalExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  stageSuitability: AcademicStageId[];
  experienceType: ExperienceType;
  typeLabel: string;
  estimatedMinutes: number;
  overview: string;
  handsOnDeliverable: string;
  whatYouWillDiscover: string;
  safetyOrSupervisionNotice?: string;
  relatedTrialId?: string;
  relatedPathwayId?: string;
  tags: string[];
}

// =============================================================================
// 5. AGE-APPROPRIATE CAREER & EDUCATIONAL OPPORTUNITIES
// =============================================================================

export type OpportunityType =
  | "higher_education"
  | "internship"
  | "apprenticeship"
  | "skill_program"
  | "research_fellowship"
  | "entrepreneurship_incubator"
  | "curiosity_camp"
  | "school_enrichment"
  | "competition"
  | "scholarship"
  | "fellowship";

export type OpportunityProvenance =
  | "verified_listing"       // Independently verified live listing
  | "curated_educational"   // Sourced educational program / national scheme
  | "prototype_example";     // Illustrative prototype test entry

export interface OpportunityItem {
  id: string;
  title: string;
  organizationName: string;
  opportunityType: OpportunityType;
  typeLabel: string;
  provenance: OpportunityProvenance;
  stageSuitability: AcademicStageId[];
  locationOrMode: string;
  location?: string;
  stipendOrCostDescription: string;
  stipendOrReward?: string;
  description: string;
  eligibilityCriteria: {
    minStageRequired: AcademicStageId;
    prerequisites: string[];
    isEligibleCurrently: boolean;
    whyIneligibleReason?: string;
  };
  eligibilityNotes?: string;
  applicationWindowOrDeadline: string;
  deadline?: string;
  sourceUrlOrInfo: string;
  sourceAttribution?: string;
  applicationUrl?: string;
  whatStudentGains: string;
  tags: string[];
}

// =============================================================================
// 6. CONTINUOUS GROWTH ENGINE & RECOMMENDATIONS
// =============================================================================

export type GoalType =
  | "project_portfolio"
  | "skill_mastery"
  | "academic_preparation"
  | "internship_readiness"
  | "exploration_clarity";

export interface StudentGrowthGoal {
  id: string;
  title: string;
  targetHorizon: "1_month" | "3_months" | "this_year" | "long_term";
  focusArea: string;
  goalType?: GoalType;
  targetQuarter?: string;
  status: "active" | "achieved" | "postponed";
  createdAt: string;
}

export interface NextMoveRecommendation {
  id: string;
  title: string;
  description: string;
  actionCategory: "start_project" | "continue_project" | "try_experience" | "explore_roadmap" | "review_evidence";
  whySuggested: string;
  supportingContext: string;
  estimatedMinutes: number;
  targetTab: NextMoveWorkspaceTab;
  targetEntityId?: string;
  status: "active" | "alternative_selected" | "postponed";
}
