/**
 * NEXT MOVE AI V2 — FLOW 3 ADAPTIVE QUESTIONS & STAGE CONFIGURATION
 * 
 * Defines stage-specific prompts, options, and defaults for all 6 academic stages.
 */

import { type AcademicStageId } from "@/data/landing-demo";
import {
  type AcademicContextData,
  type ClarityData,
  type InterestsData,
  type SkillItem,
  type ReflectionData,
  type OnboardingState,
} from "../schemas/types";

// =============================================================================
// 1. STAGE-SPECIFIC WELCOME COPY
// =============================================================================

export interface WelcomeCopyConfig {
  headline: string;
  subheadline: string;
  stageNote: string;
  bulletPoints: string[];
}

export const STAGE_WELCOME_CONFIG: Record<AcademicStageId, WelcomeCopyConfig> = {
  "classes-4-7": {
    headline: "Let's discover what you enjoy!",
    subheadline: "We'll explore fun topics, try activities and discover things you find exciting.",
    stageNote: "Curiosity & Playful Discovery",
    bulletPoints: [
      "There are no grades, scores, or right/wrong answers here.",
      "You can change your mind and answers anytime.",
      "You don't need to choose what you want to be when you grow up.",
      "Explore stories, science, games, and art at your own pace.",
    ],
  },
  "classes-8-10": {
    headline: "Let's begin by understanding you.",
    subheadline: "Let's explore your interests, favorite subjects, and real-world possibilities.",
    stageNote: "Interests & Subject Exploration",
    bulletPoints: [
      "No permanent career pressure or forced stream decisions.",
      "You can explore multiple directions simultaneously.",
      "All answers are completely editable whenever you want.",
      "Discover how school subjects actually connect to real-world projects.",
    ],
  },
  "classes-11-12": {
    headline: "Let's begin by understanding you.",
    subheadline: "Let's understand your current subjects, interests, and the educational options you're curious about.",
    stageNote: "Streams, Degrees & Alternatives",
    bulletPoints: [
      "We do not decide your degree — we help you evaluate your choices clearly.",
      "Explore Science, Commerce, Arts, Vocational, or emerging multidisciplinary paths.",
      "You can compare options without anxiety or peer pressure.",
      "Activities are strictly optional practical previews.",
    ],
  },
  diploma: {
    headline: "Let's begin by understanding you.",
    subheadline: "Build on your practical diploma coursework and discover what comes next.",
    stageNote: "Applied Skills & Lateral Pathways",
    bulletPoints: [
      "Connect your hands-on technical skills with future possibilities.",
      "Evaluate lateral-entry B.Tech programs vs direct industry opportunities.",
      "Highlight the practical lab and workshop work you've already completed.",
      "Explore domains without being pigeonholed by your branch.",
    ],
  },
  "degree-engineering": {
    headline: "Let's begin by understanding you.",
    subheadline: "Let's understand what you've learned, what you've built, and where you'd like to grow.",
    stageNote: "Capabilities, Skills & Projects",
    bulletPoints: [
      "Move beyond generic syllabus definitions into demonstrable portfolio skills.",
      "Compare specialized tech stacks, analytical roles, or creative ventures.",
      "You can test different tracks without abandoning your core degree.",
      "Self-reported familiarity is kept separate from verified project work.",
    ],
  },
  "final-year-grad": {
    headline: "Let's begin by understanding you.",
    subheadline: "Prepare for your next education, startup, or career transition with structured clarity.",
    stageNote: "Transition Readiness & Portfolio Handoff",
    bulletPoints: [
      "Clarify your next move across master's degrees, industry roles, or entrepreneurship.",
      "Evaluate trade-offs between immediate jobs, exams (GATE, CAT, GRE), and building projects.",
      "Identify the exact evidence you need to prove your readiness.",
      "No generic personality labels — just actionable decision support.",
    ],
  },
};

// =============================================================================
// 2. STAGE-SPECIFIC ACADEMIC OPTIONS
// =============================================================================

export const DEGREE_PROGRAM_OPTIONS = [
  "BCA",
  "BBA",
  "BCom",
  "BA",
  "BSc",
  "BE / B.Tech",
  "Other",
] as const;

export const DIPLOMA_BRANCH_OPTIONS = [
  "Computer Engineering / IT",
  "Mechanical Engineering",
  "Electrical & Electronics Engineering",
  "Electronics & Communication",
  "Civil Engineering",
  "Automobile Engineering",
  "Chemical Engineering",
  "Mechatronics & Robotics",
  "Design / Applied Arts",
  "Other",
];

export const DEGREE_BRANCH_OPTIONS = [
  "Computer Science & Engineering",
  "Information Technology",
  "Artificial Intelligence & Machine Learning",
  "Data Science",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Finance & Accounting",
  "Marketing & Management",
  "Economics & Analytics",
  "English / Literature",
  "Biotechnology / Life Sciences",
  "Physics / Mathematics",
  "Design & Multimedia",
  "Other",
];

export const STREAM_11_12_OPTIONS = [
  "Science (PCM)",
  "Science (PCB)",
  "Science (PCMB)",
  "Commerce",
  "Arts & Humanities",
  "Vocational / Applied",
  "Other",
] as const;

// =============================================================================
// 3. CLARITY QUESTIONS & OPTIONS
// =============================================================================

export const OLDER_CLARITY_OPTIONS = [
  {
    id: "very_confused",
    label: "I'm feeling uncertain / exploring broadly",
    description: "Completely normal. You want to see what is possible before narrowing down.",
    badge: "Open Exploration",
  },
  {
    id: "somewhat_clear",
    label: "I have a few directions in mind",
    description: "You have 2–3 paths or fields you find interesting and want to test them practically.",
    badge: "Comparing Options",
  },
  {
    id: "very_clear",
    label: "I have a clear goal in sight",
    description: "You know where you want to go and want to build the concrete skills to get there.",
    badge: "Skill Acceleration",
  },
  {
    id: "direction_changing",
    label: "My direction is changing",
    description: "You previously focused on one path and now want to thoughtfully transition into another.",
    badge: "Strategic Pivot",
  },
];

export const YOUNGER_CLARITY_OPTIONS = [
  {
    id: "have_an_idea",
    label: "Yes! I already have something I'd love to try",
    description: "You have a project, game, or topic you're really excited about.",
    badge: "Ready to Create",
  },
  {
    id: "few_interests",
    label: "I have a few different things I like",
    description: "You enjoy drawing, science experiments, or games, but want to see more.",
    badge: "Curious Explorer",
  },
  {
    id: "still_exploring",
    label: "I'm still exploring and want to see what's out there",
    description: "You're happy to look at different fun topics and see what catches your eye.",
    badge: "Open Discovery",
  },
];

// =============================================================================
// 4. DEFAULT SKILLS PER STAGE (STAGE E: STARTING POINT)
// =============================================================================

export function getDefaultStarterSkills(
  stageId: AcademicStageId,
  academicContext?: AcademicContextData,
  selectedCategoryIds?: string[]
): SkillItem[] {
  // Check for business / commerce context
  const isBusiness =
    selectedCategoryIds?.includes("business_entrepreneurship") ||
    (academicContext?.type === "degree-engineering" &&
      (academicContext.data.degreeProgram === "BCom" ||
        academicContext.data.degreeProgram === "BBA" ||
        academicContext.data.branchOrMajor === "Finance & Accounting" ||
        academicContext.data.branchOrMajor === "Marketing & Management")) ||
    (academicContext?.type === "classes-11-12" && academicContext.data.stream === "Commerce");

  const isHumanities =
    selectedCategoryIds?.includes("social_impact") ||
    (academicContext?.type === "final-year-grad" &&
      (academicContext.data.completedDegree.includes("Humanities") ||
        academicContext.data.completedDegree.includes("Arts") ||
        academicContext.data.completedDegree.includes("Commerce") ||
        academicContext.data.completedDegree.includes("B.Com") ||
        academicContext.data.specialization.includes("Economics") ||
        academicContext.data.specialization.includes("Literature")));

  const isMechanicalDiploma =
    academicContext?.type === "diploma" &&
    (academicContext.data.branch.includes("Mechanical") ||
      academicContext.data.branch.includes("Automobile"));

  switch (stageId) {
    case "classes-4-7":
      return [
        { id: "sk_drawing", name: "Drawing & Visual Art", category: "Creativity", familiarity: "tried_it", evidenceStatus: "self_reported" },
        { id: "sk_stories", name: "Storytelling & Reading", category: "Language", familiarity: "heard_about", evidenceStatus: "self_reported" },
        { id: "sk_science_exp", name: "Science Experiments & Puzzles", category: "Discovery", familiarity: "tried_it", evidenceStatus: "self_reported" },
        { id: "sk_block_coding", name: "Block Coding / Scratch", category: "Tech", familiarity: "not_explored", evidenceStatus: "not_assessed" },
      ];
    case "classes-8-10":
      return [
        { id: "sk_math_problem_solving", name: "Math & Numerical Logic", category: "Analysis", familiarity: "tried_it", evidenceStatus: "self_reported" },
        { id: "sk_science_practicals", name: "Science Lab Experiments", category: "Discovery", familiarity: "heard_about", evidenceStatus: "self_reported" },
        { id: "sk_computer_basics", name: "Computer Basics & Coding", category: "Tech", familiarity: "heard_about", evidenceStatus: "self_reported" },
        { id: "sk_creative_design", name: "Visual Art & Presentations", category: "Creativity", familiarity: "not_explored", evidenceStatus: "not_assessed" },
      ];
    case "classes-11-12":
      if (isBusiness) {
        return [
          { id: "sk_commercial_concepts", name: "Accountancy & Business Studies", category: "Commerce", familiarity: "practised", evidenceStatus: "self_reported" },
          { id: "sk_data_interpretation", name: "Financial Data & Graph Interpretation", category: "Analysis", familiarity: "tried_it", evidenceStatus: "self_reported" },
          { id: "sk_concept_synthesis", name: "Economic Reasoning & Analysis", category: "Commerce", familiarity: "heard_about", evidenceStatus: "self_reported" },
          { id: "sk_spreadsheet_tools", name: "Spreadsheet Basics (Excel/Sheets)", category: "Tools", familiarity: "not_explored", evidenceStatus: "not_assessed" },
        ];
      }
      return [
        { id: "sk_concept_synthesis", name: "Analytical Problem Solving", category: "Core Academic", familiarity: "practised", evidenceStatus: "self_reported" },
        { id: "sk_intro_programming", name: "Introductory Programming (Python/C++)", category: "Technology", familiarity: "heard_about", evidenceStatus: "self_reported" },
        { id: "sk_data_interpretation", name: "Data & Graph Interpretation", category: "Analysis", familiarity: "tried_it", evidenceStatus: "self_reported" },
        { id: "sk_commercial_concepts", name: "Financial / Economic Basics", category: "Commerce", familiarity: "not_explored", evidenceStatus: "not_assessed" },
      ];
    case "diploma":
      if (isMechanicalDiploma) {
        return [
          { id: "sk_workshop_machining", name: "Hands-on Workshop & Machine Operations", category: "Manufacturing", familiarity: "practised", evidenceStatus: "self_reported" },
          { id: "sk_cad_tools", name: "CAD / Technical Drafting (AutoCAD/SolidWorks)", category: "Design Tools", familiarity: "tried_it", evidenceStatus: "self_reported" },
          { id: "sk_quality_tolerance", name: "Tolerance Inspection & Metrology", category: "Quality", familiarity: "heard_about", evidenceStatus: "self_reported" },
          { id: "sk_troubleshooting", name: "Mechanical Equipment Maintenance", category: "Practical", familiarity: "practised", evidenceStatus: "self_reported" },
        ];
      }
      return [
        { id: "sk_lab_workshop", name: "Hands-on Lab & Workshop Practice", category: "Engineering", familiarity: "practised", evidenceStatus: "self_reported" },
        { id: "sk_cad_tools", name: "CAD / Technical Drawing / Circuit Design", category: "Tools", familiarity: "tried_it", evidenceStatus: "self_reported" },
        { id: "sk_programming_tools", name: "Applied Scripting or Tooling", category: "Technology", familiarity: "heard_about", evidenceStatus: "self_reported" },
        { id: "sk_troubleshooting", name: "Hardware / System Troubleshooting", category: "Practical", familiarity: "practised", evidenceStatus: "self_reported" },
      ];
    case "degree-engineering":
      if (isBusiness) {
        return [
          { id: "sk_fin_accounting", name: "Financial Accounting & Reporting Basics", category: "Finance", familiarity: "practised", evidenceStatus: "self_reported" },
          { id: "sk_spreadsheet_mod", name: "Spreadsheet & Financial Modeling (Excel)", category: "Analysis Tools", familiarity: "tried_it", evidenceStatus: "self_reported" },
          { id: "sk_business_analytics", name: "Business Analytics & Metrics Interpretation", category: "Strategy", familiarity: "heard_about", evidenceStatus: "self_reported" },
          { id: "sk_commercial_law", name: "Commercial Operations & Cost Analysis", category: "Commerce", familiarity: "heard_about", evidenceStatus: "self_reported" },
        ];
      }
      return [
        { id: "sk_core_programming", name: "Data Structures & Algorithms / Core Code", category: "Technology", familiarity: "practised", evidenceStatus: "self_reported" },
        { id: "sk_web_or_app_dev", name: "Web / Mobile Project Development", category: "Applied Tech", familiarity: "tried_it", evidenceStatus: "self_reported" },
        { id: "sk_data_analytics", name: "Data Analytics & SQL / Python", category: "Analysis", familiarity: "heard_about", evidenceStatus: "self_reported" },
        { id: "sk_git_version_control", name: "Git & Collaborative Development", category: "Tools", familiarity: "heard_about", evidenceStatus: "self_reported" },
      ];
    case "final-year-grad":
    default:
      if (isHumanities) {
        return [
          { id: "sk_primary_research", name: "Primary Source Research & Synthesis", category: "Research", familiarity: "practised", evidenceStatus: "self_reported" },
          { id: "sk_policy_writing", name: "Structured Policy & Analytical Writing", category: "Communication", familiarity: "practised", evidenceStatus: "self_reported" },
          { id: "sk_stakeholder_pres", name: "Stakeholder Presentation & Discussion", category: "Leadership", familiarity: "tried_it", evidenceStatus: "self_reported" },
          { id: "sk_capstone_thesis", name: "Capstone Thesis / Empirical Paper", category: "Portfolio", familiarity: "heard_about", evidenceStatus: "self_reported" },
        ];
      }
      return [
        { id: "sk_capstone_project", name: "Full Lifecycle Capstone Project", category: "Portfolio", familiarity: "practised", evidenceStatus: "self_reported" },
        { id: "sk_technical_writing", name: "Technical Documentation & Reports", category: "Communication", familiarity: "practised", evidenceStatus: "self_reported" },
        { id: "sk_system_design", name: "System Design & Architecture Concepts", category: "Engineering", familiarity: "tried_it", evidenceStatus: "self_reported" },
        { id: "sk_interview_prep", name: "Domain Problem Solving & Case Study", category: "Career", familiarity: "heard_about", evidenceStatus: "self_reported" },
      ];
  }
}

// =============================================================================
// 5. INITIAL STATE FACTORY
// =============================================================================

export function createInitialOnboardingState(
  stageId: AcademicStageId,
  isDemo: boolean = true
): OnboardingState {
  let initialAcademic: AcademicContextData;
  switch (stageId) {
    case "classes-4-7":
      initialAcademic = {
        type: "classes-4-7",
        data: { currentClass: "Class 6", favoriteSchoolActivities: ["Drawing & Art", "Storytelling & Reading"] },
      };
      break;
    case "classes-8-10":
      initialAcademic = {
        type: "classes-8-10",
        data: { currentClass: "Class 9", subjectInterests: ["Mathematics", "Computers & Coding"], streamCuriosity: "Exploring all" },
      };
      break;
    case "classes-11-12":
      initialAcademic = {
        type: "classes-11-12",
        data: { currentClass: "Class 12", stream: "Science (PCM)", currentSubjects: ["Physics", "Chemistry", "Mathematics", "Computer Science"] },
      };
      break;
    case "diploma":
      initialAcademic = {
        type: "diploma",
        data: { branch: "Computer Engineering / IT", currentYear: "2nd Year", practicalFocus: ["C Programming", "Networking Labs"], postDiplomaAspiration: "Lateral Entry (B.Tech / B.E.)" },
      };
      break;
    case "degree-engineering":
      initialAcademic = {
        type: "degree-engineering",
        data: { degreeProgram: "BE / B.Tech", branchOrMajor: "Computer Science & Engineering", currentYear: "3rd Year", currentFocusAreas: ["Web Development", "Algorithms"] },
      };
      break;
    case "final-year-grad":
      initialAcademic = {
        type: "final-year-grad",
        data: { completedDegree: "B.Tech Computer Science", specialization: "Software Systems", transitionStage: "Seeking Direct Industry / Tech Role", timelinePreference: "Medium-term (3-12 months)" },
      };
      break;
  }

  const initialInterests: InterestsData = {
    selectedCategoryIds:
      stageId === "classes-4-7"
        ? ["creativity"]
        : stageId === "diploma"
        ? ["technology"]
        : ["still_exploring"],
    selectedSubInterestIds:
      stageId === "classes-4-7"
        ? ["creat_visual_design", "creat_storytelling"]
        : [],
    isStillExploring: stageId !== "classes-4-7" && stageId !== "diploma",
  };

  const defaultSkills = getDefaultStarterSkills(
    stageId,
    initialAcademic,
    initialInterests.selectedCategoryIds
  );

  const initialClarity: ClarityData = {
    clarityLevel: stageId === "classes-4-7" ? "few_interests" : "somewhat_clear",
    primaryHelpReason: "Explore realistic possibilities and understand what practical skills to build.",
  };

  const initialReflection: ReflectionData = {
    enjoyedMost: "Learning how realistic options connect to real projects rather than generic exams.",
    directionPreference: "explore_similar",
    immediateSupportNeeded: ["explore_possibilities", "build_skills"],
  };

  return {
    currentStep: "welcome",
    stageId,
    academicContext: initialAcademic,
    clarity: initialClarity,
    interests: initialInterests,
    startingSkills: defaultSkills,
    reflection: initialReflection,
    profile: null,
    isLoading: false,
    isSubmitting: false,
    isDemoMode: isDemo,
    error: null,
    history: ["welcome"],
  };
}
