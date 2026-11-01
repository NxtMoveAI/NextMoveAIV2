/**
 * NEXT MOVE AI V2 — FLOW 5: EXPLORE POSSIBILITIES SCHEMAS & TYPES
 * 
 * Epistemically honest data structures for educational and career pathway discovery.
 * Strictly prohibits fabricated fit percentages, fake ranks, or predictive scores.
 * Accurately models adaptive experiences across all 6 academic stages.
 */

import { type AcademicStageId } from "@/data/landing-demo";
import { type EvidenceStatus } from "@/features/onboarding/schemas/types";

// =============================================================================
// 1. PATHWAY TAXONOMY & TYPES
// =============================================================================

export type PathwayType =
  | "curiosity_theme"       // Classes 4–7: curiosity & exploration themes (NO job titles/corporate careers)
  | "foundational_stream"   // Classes 8–10: subject & stream foundational exposure
  | "traditional_degree"    // Established collegiate/professional degree programs
  | "emerging_frontier"     // Contemporary interdisciplinary domains (AI, UX, Green Tech, etc.)
  | "practical_lateral"     // Hands-on, polytechnic, lateral engineering or applied technical paths
  | "exploratory_general";  // Broad liberal/open discovery tracks for undecided students

export type WorkEnvironmentStyle =
  | "hands_on_lab"          // Workshops, hardware labs, physical setups
  | "screen_and_code"       // Digital systems, deep focus desk analysis
  | "collaborative_studio"  // Cross-functional team design, sprint studios
  | "field_and_community";  // External field observation, stakeholder dialogues

export interface DayInTheLifeBlock {
  title: string;
  timeframe: string;
  activities: string[];
  environmentNote: string;
}

export interface EducationRouteOption {
  id: string;
  title: string;
  routeType: "degree" | "diploma" | "lateral_entry" | "integrated_masters" | "vocational_certification" | "open_curiosity" | "school_stream";
  duration: string;
  prerequisites: string;
  honestWorkloadNote: string;
}

export interface FoundationalSkill {
  name: string;
  category: "subject_foundation" | "technical_tool" | "thinking_disposition";
  description: string;
  requiredEvidenceLevel?: EvidenceStatus;
}

export interface PreCommitmentTrial {
  title: string;
  objective: string;
  estimatedMinutes: number;
  format: "mini_project" | "curiosity_exercise" | "case_analysis" | "creative_prompt";
  stepByStepPrompt: string[];
  deliverable: string;
}

export interface PathwayRelatedAlternative {
  pathwayId: string;
  title: string;
  relationshipDescription: string;
}

export interface Pathway {
  id: string;
  title: string;
  type: PathwayType;
  categoryId: string; // matches interest categories: technology, creativity, science_discovery, business_entrepreneurship, social_impact, analysis_problem_solving, or exploratory
  categoryLabel: string;
  stageSuitability: AcademicStageId[];
  isCuriosityOnly: boolean; // TRUE for Classes 4–7 to enforce zero corporate job assignments
  headlineSummary: string;
  detailedOverview: string;
  whatPeopleLearnOrDo: string[];
  dayInTheLife: DayInTheLifeBlock[];
  foundationalSkills: FoundationalSkill[];
  educationRoutes: EducationRouteOption[];
  eligibilityAndRealities: {
    prerequisitesText: string;
    tradeoffsToConsider: string[];
    honestDisclaimer: string;
  };
  beforeYouCommitTrial: PreCommitmentTrial;
  whatRemainsUnknown: string; // Epistemic unknown questions the student should ask themselves
  alternativePathways: PathwayRelatedAlternative[];
  tags: string[];
}

// =============================================================================
// 2. PROVENANCE & RECOMMENDATION TRANSPARENCY
// =============================================================================

export interface ProvenanceSignal {
  type:
    | "academic_stage_context"
    | "self_reported_interest"
    | "practised_activity_evidence"
    | "demonstrated_competency"
    | "undecided_exploratory_mode"
    | "outside_interest_discovery";
  label: string;
  description: string;
  truthBoundary: string;
}

export interface PathwayProvenance {
  pathwayId: string;
  primaryReason: string;
  signals: ProvenanceSignal[];
  epistemicDisclaimer: string; // Explains this is a direction to investigate, not a test prediction
}

// =============================================================================
// 3. COMPARISON & SAVED PATHWAY CONTRACTS
// =============================================================================

export interface SavedPathwayRecord {
  pathwayId: string;
  savedAt: string;
  note?: string;
}

export interface PathwayComparisonMatrix {
  pathways: Pathway[];
  comparisonAttributes: {
    attributeName: string;
    description: string;
    values: Record<string, string>;
  }[];
}

// =============================================================================
// 4. FILTER STATE
// =============================================================================

export interface ExploreFilters {
  searchQuery: string;
  selectedCategory: string; // "all" | categoryId
  selectedStage: AcademicStageId | "all";
  selectedType: PathwayType | "all";
  showDivergentOnly: boolean; // "Explore something different"
}
