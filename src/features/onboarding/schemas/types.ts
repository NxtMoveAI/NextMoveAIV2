/**
 * NEXT MOVE AI V2 — FLOW 3 SCHEMA DEFINITIONS
 * 
 * Adaptive Student Onboarding & Student Intelligence Profile Types
 * Conforms to frontend architecture, Flow 2 handoff contracts, and Havyas backend specs.
 */

import { type AcademicStageId } from "@/data/landing-demo";

// =============================================================================
// 1. ONBOARDING STEPS & NAVIGATION
// =============================================================================

export type OnboardingStepId =
  | "welcome"          // Stage A: Personalized Welcome
  | "academic"         // Stage B: Dynamic Academic Context
  | "clarity"          // Stage C: Clarity and Personal Goals
  | "interests"        // Stage D: Interactive Interest Explorer
  | "starting-point"   // Stage E: My Starting Point (Evidence Taxonomy)
  | "activity-prompt"  // Decision: Try optional activity? (Yes / Skip)
  | "activity"         // Stage F: Interactive Micro-Exploration
  | "reflection"       // Stage G: Reflection and Review
  | "profile";         // Stage H: Student Intelligence Starting Profile

export interface StepMetadata {
  id: OnboardingStepId;
  label: string;
  shortDescription: string;
  isOptional: boolean;
  canSkip: boolean;
}

// =============================================================================
// 2. EVIDENCE TAXONOMY
// Strictly adhered to as per Section 11 specifications
// =============================================================================

export type EvidenceStatus =
  | "self_reported"    // Student stated familiarity or interest without formal rubric
  | "practised"        // Completed an interactive task or mini-challenge
  | "demonstrated"     // Validated against a defined rubric and verified work
  | "reviewed"         // Evaluated with mentor, peer or validated test rubric
  | "not_assessed"     // Area not yet explored or skipped (never labeled as 'weak')
  | "needs_practice";  // Evaluated task revealed clear opportunity for improvement

export type FamiliarityLevel =
  | "not_explored"      // I haven't explored it yet
  | "heard_about"       // I've heard about it
  | "tried_it"          // I've tried it
  | "practised"         // I've practised it
  | "created_something";// I've created something using it

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  familiarity: FamiliarityLevel;
  evidenceStatus: EvidenceStatus;
  userNotes?: string;
}

// =============================================================================
// 3. ACADEMIC CONTEXT DATA (STAGE-SPECIFIC)
// =============================================================================

export interface Classes4to7Context {
  currentClass: "Class 4" | "Class 5" | "Class 6" | "Class 7";
  favoriteSchoolActivities: string[];
}

export interface Classes8to10Context {
  currentClass: "Class 8" | "Class 9" | "Class 10";
  subjectInterests: string[];
  streamCuriosity?: "Science" | "Commerce" | "Arts/Humanities" | "Vocational" | "Exploring all";
}

export interface Classes11to12Context {
  currentClass: "Class 11" | "Class 12";
  stream: "Science (PCM)" | "Science (PCB)" | "Science (PCMB)" | "Commerce" | "Arts & Humanities" | "Vocational / Applied" | "Other";
  currentSubjects: string[];
  futureEducationInterest?: string;
}

export interface DiplomaContext {
  branch: string;
  currentYear: "1st Year" | "2nd Year" | "3rd Year (Final Year)";
  practicalFocus: string[];
  postDiplomaAspiration: "Lateral Entry (B.Tech / B.E.)" | "Industry Technical Role" | "Entrepreneurship" | "Undecided / Exploring";
}

export interface DegreeEngineeringContext {
  degreeProgram: "BCA" | "BBA" | "BCom" | "BA" | "BSc" | "BE / B.Tech" | "Other";
  branchOrMajor: string;
  currentYear: "1st Year" | "2nd Year" | "3rd Year" | "4th Year / Final";
  currentFocusAreas: string[];
}

export interface FinalYearGradContext {
  completedDegree: string;
  specialization: string;
  transitionStage: "Preparing for Master's / Higher Ed" | "Seeking Direct Industry / Tech Role" | "Building a Startup / Venture" | "Undecided / Evaluating Paths";
  timelinePreference: "Immediate (0-3 months)" | "Medium-term (3-12 months)" | "Exploring freely";
}

export type AcademicContextData =
  | { type: "classes-4-7"; data: Classes4to7Context }
  | { type: "classes-8-10"; data: Classes8to10Context }
  | { type: "classes-11-12"; data: Classes11to12Context }
  | { type: "diploma"; data: DiplomaContext }
  | { type: "degree-engineering"; data: DegreeEngineeringContext }
  | { type: "final-year-grad"; data: FinalYearGradContext };

// =============================================================================
// 4. CLARITY & PERSONAL GOALS
// =============================================================================

export type ClarityLevel =
  | "very_confused"        // Reassuring: completely normal to explore
  | "somewhat_clear"       // Has directions, wants to test them
  | "very_clear"           // Focused on a direction, wants to build skills
  | "direction_changing";  // Moving from a prior path to a new domain

export type YoungerClarityLevel =
  | "have_an_idea"
  | "few_interests"
  | "still_exploring";

export interface ClarityData {
  clarityLevel: ClarityLevel | YoungerClarityLevel;
  primaryHelpReason: string;
  studentStatement?: string;
}

// =============================================================================
// 5. INTERESTS & CURIOSITY
// =============================================================================

export interface SubInterestItem {
  id: string;
  name: string;
  description: string;
}

export interface InterestCategory {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  colorClass: string;
  accentBg: string;
  borderColor: string;
  subInterests: SubInterestItem[];
}

export interface InterestsData {
  selectedCategoryIds: string[];
  selectedSubInterestIds: string[];
  customInterestText?: string;
  isStillExploring: boolean;
}

// =============================================================================
// 6. MICRO-EXPLORATION ACTIVITY
// =============================================================================

export type ActivityType =
  | "pattern_sequence"     // Younger: story sequence / visual pattern
  | "logic_puzzle"        // Middle: logical deduction / connections
  | "decision_tradeoff"    // Class 11-12: realistic education/career trade-off analysis
  | "applied_scenario"     // Diploma: practical hardware/software challenge
  | "debugging_or_data"    // Degree: code debugging or dataset insight
  | "case_evaluation";     // Grad: structured problem breakdown

export interface ActivityOption {
  id: string;
  label: string;
  description?: string;
  isCorrect?: boolean;
  feedback: string;
}

export interface MicroActivity {
  id: string;
  stageId: AcademicStageId;
  type: ActivityType;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  scenario: string;
  codeSnippet?: string;
  options: ActivityOption[];
  explanation: string;
  demonstratedCompetency: string;
}

export interface ActivityAttemptResult {
  activityId: string;
  attempted: boolean;
  selectedOptionId?: string;
  isCorrect?: boolean;
  retriesCount: number;
  feedback: string;
  status: "completed" | "skipped" | "in_progress";
}

// =============================================================================
// 7. REFLECTION DATA
// =============================================================================

export interface ReflectionData {
  enjoyedMost: string;
  directionPreference: "explore_similar" | "explore_different" | "still_deciding";
  immediateSupportNeeded: string[];
  personalReflectionNotes?: string;
}

// =============================================================================
// 8. STUDENT INTELLIGENCE STARTING PROFILE (STAGE H)
// =============================================================================

export interface StartingPossibility {
  id: string;
  title: string;
  type: "exploration_domain" | "degree_or_pathway" | "applied_skill_track";
  summary: string;
  whySuggested: string;
  whatRemainsUnknown: string;
  sampleNextActions: string[];
}

export interface FirstNextMoveAction {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  actionType: "explore_interest" | "compare_pathways" | "try_mini_project" | "review_curriculum";
}

export interface StudentIntelligenceProfile {
  profileId: string;
  academicStageId: AcademicStageId;
  academicContext: AcademicContextData;
  clarity: ClarityData;
  interests: InterestsData;
  startingSkills: SkillItem[];
  activityAttempt?: ActivityAttemptResult;
  reflection: ReflectionData;
  possibilities: StartingPossibility[];
  firstNextMove: FirstNextMoveAction;
  status: "draft" | "student_reviewed" | "confirmed";
  updatedAt: string;
}

// =============================================================================
// 9. ONBOARDING STATE MACHINE
// =============================================================================

export interface OnboardingState {
  currentStep: OnboardingStepId;
  stageId: AcademicStageId;
  academicContext: AcademicContextData;
  clarity: ClarityData;
  interests: InterestsData;
  startingSkills: SkillItem[];
  activityAttempt?: ActivityAttemptResult;
  reflection: ReflectionData;
  profile: StudentIntelligenceProfile | null;
  isLoading: boolean;
  isSubmitting: boolean;
  isDemoMode: boolean;
  error?: string | null;
  history: OnboardingStepId[];
}
