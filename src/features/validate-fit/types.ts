/**
 * NEXT MOVE AI V2 — FLOW 6: VALIDATE FIT TYPES
 * 
 * Strict typed contracts for experiential trials, interactive adapters,
 * student reflections, evidence taxonomy, and learning feedback.
 * 
 * Epistemic mandate:
 * - "We don't decide careers; we enable clarity."
 * - Zero predictive fit percentages or fake competency ranks.
 * - Factual tracking of Attempted, Practised, Self-Reported, and Demonstrated.
 */

import { type AcademicStageId } from "@/data/landing-demo";

export type InterestCategoryId =
  | "technology"
  | "creativity"
  | "science_discovery"
  | "business_entrepreneurship"
  | "social_impact"
  | "analysis_problem_solving"
  | string;

// =============================================================================
// 1. EVIDENCE TAXONOMY (Strict Canonical Alignment)
// =============================================================================

export type EvidenceStatus =
  | "not_assessed"     // Area not yet explored
  | "self_reported"    // Student stated familiarity or interest without formal rubric
  | "attempted"        // Started an activity or completed with skipped steps
  | "practised"        // Completed a real-world mini-challenge or simulation
  | "reviewed"         // Evaluated against a rubric with peer, mentor, or self-critique
  | "demonstrated";    // Verified against an authentic rubric (never auto-awarded)

// =============================================================================
// 2. TRIAL FORMATS & ADAPTERS
// =============================================================================

export type TrialFormat =
  | "creative_prompt"         // Open-ended drawing/writing prompt with self-checklist (Classes 4-7, Design)
  | "scenario_tradeoff"       // Multi-factor dilemma evaluating trade-offs (Commerce, Decision-making)
  | "logic_simulation"        // Code/algorithm bug detective & step-by-step logic (Tech, Math)
  | "applied_troubleshoot"    // Industrial relay, circuit schematic, or server log diagnosis (Diploma, Systems)
  | "case_critique";          // Policy memo, enterprise strategy, or research abstract critique (Grad, Engineering)

// =============================================================================
// 3. TRIAL DEFINITION CONTRACT
// =============================================================================

export interface BaseTrialContent {
  contextSummary: string;
}

export interface CreativePromptContent extends BaseTrialContent {
  promptSteps: string[];
  materialsSuggested: string[];
  rubricChecklist: string[];
  sampleInspirations?: string[];
}

export interface ScenarioTradeoffContent extends BaseTrialContent {
  situation: string;
  options: {
    id: string;
    label: string;
    description: string;
    tradeoffsGained: string;
    tradeoffsSacrificed: string;
  }[];
  discussionPrompt: string;
}

export interface LogicSimulationContent extends BaseTrialContent {
  initialCodeOrState: string;
  problemDescription: string;
  testCases: {
    input: string;
    expectedOutput: string;
    explanation: string;
  }[];
  fixOptions: {
    id: string;
    label: string;
    codeChange: string;
    isCorrectApproach: boolean;
    explanation: string;
  }[];
}

export interface AppliedTroubleshootContent extends BaseTrialContent {
  systemDescription: string;
  diagnosticLogsOrReadings: string[];
  possibleFaults: {
    id: string;
    component: string;
    hypothesis: string;
    isRootCause: boolean;
    verificationStep: string;
  }[];
}

export interface CaseCritiqueContent extends BaseTrialContent {
  briefText: string;
  stakeholders: string[];
  keyQuestions: string[];
  guidingRubric: {
    criterion: string;
    considerations: string;
  }[];
}

export type TrialContentPayload =
  | { format: "creative_prompt"; payload: CreativePromptContent }
  | { format: "scenario_tradeoff"; payload: ScenarioTradeoffContent }
  | { format: "logic_simulation"; payload: LogicSimulationContent }
  | { format: "applied_troubleshoot"; payload: AppliedTroubleshootContent }
  | { format: "case_critique"; payload: CaseCritiqueContent };

export interface TrialActivity {
  id: string;
  title: string;
  subtitle: string;
  stageSuitability: AcademicStageId[];
  categoryId: InterestCategoryId;
  categoryLabel: string;
  relatedPathwayId: string;
  relatedPathwayTitle: string;
  format: TrialFormat;
  suggestedMinutes: number; // Flexible reference, zero artificial urgency countdowns
  learningObjective: string;
  scenarioBackground: string;
  instructions: string[];
  optionalHints: string[];
  content: TrialContentPayload;
  competencyPractised: string;
  whatThisClarifies: string;
  tags: string[];
}

// =============================================================================
// 4. STUDENT ATTEMPT & REFLECTION
// =============================================================================

export interface TrialReflection {
  enjoyed: string;
  challenged: string;
  learned: string;
  wouldExploreAgain: "yes" | "maybe" | "not_for_me";
  whatTryDifferently: string;
}

export interface TrialAttemptRecord {
  id: string;
  trialId: string;
  trialTitle: string;
  pathwayId: string;
  stageId: AcademicStageId;
  format: TrialFormat;
  status: "in_progress" | "completed" | "skipped";
  evidenceStatus: EvidenceStatus;
  startedAt: string;
  completedAt?: string;
  selectedOptionIds?: string[];
  submittedWorkText?: string;
  reflection?: TrialReflection;
  competencyPractised: string;
  isSyntheticFixture?: boolean;
}

// =============================================================================
// 5. LEARNING FEEDBACK & NEXT MOVES
// =============================================================================

export interface TrialFeedbackSummary {
  trialTitle: string;
  completionPraise: string;
  evidenceGenerated: {
    status: EvidenceStatus;
    competency: string;
    truthBoundary: string;
  };
  reflectionInsights: string[];
  recommendedNextActions: {
    id: string;
    title: string;
    description: string;
    actionType: "explore_pathway" | "practise_another_trial" | "review_ledger" | "try_divergent";
    targetUrl: string;
  }[];
}

// =============================================================================
// 6. WORKSPACE VIEW & FILTER STATE
// =============================================================================

export type FitWorkspaceTab = "discovery" | "in_progress" | "ledger" | "history";

export interface FitFilters {
  searchQuery: string;
  selectedCategory: string; // "all" | InterestCategoryId
  selectedStage: AcademicStageId | "all";
  selectedFormat: TrialFormat | "all";
  showDivergentOnly: boolean;
}
