/**
 * NEXT MOVE AI V2 — FLOW 3 ONBOARDING SERVICE & ADAPTER
 * 
 * Typed frontend adapter simulating Havyas's backend endpoints.
 * Provides transparent demo simulation without credential leaks or fake persistence.
 */

import { type AcademicStageId } from "@/data/landing-demo";
import {
  type OnboardingState,
  type StudentIntelligenceProfile,
  type ActivityAttemptResult,
  type StartingPossibility,
  type FirstNextMoveAction,
} from "../schemas/types";
import { createInitialOnboardingState } from "../data/questions";

// =============================================================================
// 1. RECOMMENDATION GENERATOR (HEURISTIC FIXTURE ENGINE)
// Generates curated exploration ideas with explicit "What Remains Unknown"
// =============================================================================

export function generateCuratedPossibilities(
  stageId: AcademicStageId,
  selectedCategoryIds: string[]
): StartingPossibility[] {
  void selectedCategoryIds;
  switch (stageId) {
    case "classes-4-7":
      return [
        {
          id: "poss_young_creative_code",
          title: "Visual Storyteller & Game Animator",
          type: "exploration_domain",
          summary: "Combining character drawing with simple block animation to create interactive adventures.",
          whySuggested: "You expressed interest in fun visual activities and building things you can share.",
          whatRemainsUnknown: "Whether you enjoy writing character storylines or programming logic puzzles more.",
          sampleNextActions: ["Build a 3-scene animated animal story in Scratch", "Create a handmade storyboard comic"],
        },
        {
          id: "poss_young_science_detective",
          title: "Junior Science & Nature Explorer",
          type: "exploration_domain",
          summary: "Investigating how machines work, building model telescopes, and exploring plant ecosystems.",
          whySuggested: "Hands-on curiosity challenges spark excitement without needing advanced math yet.",
          whatRemainsUnknown: "Which specific branch of science (space, biology, or robotics) excites you most.",
          sampleNextActions: ["Build a simple cardboard pinhole camera", "Track evening star constellations for 3 days"],
        },
      ];

    case "classes-8-10":
      return [
        {
          id: "poss_mid_creative_tech",
          title: "Interactive Web & UI Design Foundations",
          type: "applied_skill_track",
          summary: "Connecting visual creativity with front-end code to craft apps people love using.",
          whySuggested: "Strong overlap between creative design curiosity and interest in computers.",
          whatRemainsUnknown: "Whether you lean toward visual interface design (Figma) or code implementation.",
          sampleNextActions: ["Design a personal portfolio mockup on paper", "Learn basic HTML/CSS layout basics"],
        },
        {
          id: "poss_mid_steam_discovery",
          title: "Multidisciplinary STEAM Pathways (10th Stream Exploration)",
          type: "degree_or_pathway",
          summary: "Exploring modern combinations (Computer Science with Economics, or Design with Applied Science).",
          whySuggested: "You want clarity before choosing 11th stream without being forced into a narrow box.",
          whatRemainsUnknown: "Your comfort level with advanced mathematics vs. humanities-led subjects.",
          sampleNextActions: ["Compare Science vs Commerce curriculum syllabi side-by-side", "Interview a 12th-grade senior"],
        },
      ];

    case "classes-11-12":
      return [
        {
          id: "poss_high_applied_computing",
          title: "Modern Computing & Software Engineering (B.Tech / BCA + Portfolio)",
          type: "degree_or_pathway",
          summary: "Evaluating traditional engineering versus flexible computer applications and direct project building.",
          whySuggested: "You indicated interest in technology while currently balancing 11th/12th grade academics.",
          whatRemainsUnknown: "Your target balance between entrance examination preparation and practical coding.",
          sampleNextActions: ["Compare curriculum modules between B.Tech CS and BCA programs", "Build your first GitHub repo"],
        },
        {
          id: "poss_high_data_economics",
          title: "Computational Finance & Data Analytics",
          type: "exploration_domain",
          summary: "Connecting quantitative mathematics, statistical modeling, and economic decision systems.",
          whySuggested: "High interest in problem-solving and structured reasoning across domains.",
          whatRemainsUnknown: "Whether you prefer financial markets analysis or pure algorithm development.",
          sampleNextActions: ["Analyze a public consumer pricing dataset in Google Sheets", "Explore introductory statistics"],
        },
        {
          id: "poss_high_product_design",
          title: "Digital Product Design & Human-Computer Interaction",
          type: "exploration_domain",
          summary: "Designing intuitive mobile interfaces, user workflows, and customer journeys.",
          whySuggested: "Provides an alternative high-impact technology path without pure math dependency.",
          whatRemainsUnknown: "Your preference for UX research vs visual brand identity.",
          sampleNextActions: ["Conduct a usability critique of your favorite mobile app", "Explore introductory Figma tutorials"],
        },
      ];

    case "diploma":
      return [
        {
          id: "poss_dip_lateral_entry",
          title: "Lateral-Entry B.Tech (2nd Year Direct Admission)",
          type: "degree_or_pathway",
          summary: "Leveraging polytechnic lab credits to enter 2nd year B.Tech, advancing theoretical and math foundations.",
          whySuggested: "Connects your hands-on diploma workshop practice with an engineering degree.",
          whatRemainsUnknown: "Target state entrance requirements (e.g. ECET, JELET, LEET) and college cutoffs.",
          sampleNextActions: ["Review lateral entry syllabus for regional engineering colleges", "Prepare core engineering mathematics"],
        },
        {
          id: "poss_dip_specialized_tech",
          title: "Applied Technical Specialist / Embedded & Cloud Roles",
          type: "applied_skill_track",
          summary: "Targeting direct industry positions through industry certifications and applied shop-floor excellence.",
          whySuggested: "Industry values practical technicians who can diagnose physical and software systems.",
          whatRemainsUnknown: "Whether your preferred trajectory is technical field service or software development.",
          sampleNextActions: ["Complete an applied microcontroller or networking certification", "Draft a technical skills CV"],
        },
      ];

    case "degree-engineering":
      return [
        {
          id: "poss_deg_fullstack_cloud",
          title: "Modern Cloud & Full-Stack Systems Engineering",
          type: "applied_skill_track",
          summary: "Building scalable distributed web applications, containerized services, and resilient data pipelines.",
          whySuggested: "Aligns with your demonstrated programming interest and third-year growth phase.",
          whatRemainsUnknown: "Your familiarity with asynchronous concurrency, database indexing, and CI/CD pipelines.",
          sampleNextActions: ["Deploy a full-stack CRUD application with Postgres and Next.js", "Solve 10 medium algorithmic problems"],
        },
        {
          id: "poss_deg_applied_ai",
          title: "Applied AI & Intelligent Data Products",
          type: "exploration_domain",
          summary: "Integrating large language model APIs, embeddings, and vector databases into practical user workflows.",
          whySuggested: "High leverage domain combining software architecture with emerging ML tooling.",
          whatRemainsUnknown: "Depth of mathematical background in linear algebra and probability.",
          sampleNextActions: ["Build a retrieval-augmented question answering bot over PDF documents", "Evaluate prompt pipelines"],
        },
        {
          id: "poss_deg_product_tech",
          title: "Technical Product Management & Systems Consulting",
          type: "degree_or_pathway",
          summary: "Bridging customer requirements, technical feasibility, and business roadmaps.",
          whySuggested: "Ideal if you enjoy understanding the 'why' behind product features alongside code.",
          whatRemainsUnknown: "Experience conducting customer discovery interviews and writing PRDs.",
          sampleNextActions: ["Write a 1-page Product Requirements Document for a feature you want", "Study product metrics (CAC, LTV)"],
        },
      ];

    case "final-year-grad":
    default:
      return [
        {
          id: "poss_grad_specialized_role",
          title: "Targeted Industry Role with Verifiable Project Proof",
          type: "applied_skill_track",
          summary: "Accelerating direct employment through 2 distinctive portfolio projects with live demonstrations.",
          whySuggested: "Fastest route to career momentum without falling into generic placement anxiety.",
          whatRemainsUnknown: "Your preferred domain specialization (fintech, developer tooling, health-tech, etc.).",
          sampleNextActions: ["Polish a flagship capstone project with live URL and README", "Conduct 3 mock technical interviews"],
        },
        {
          id: "poss_grad_higher_ed",
          title: "Focused Master's Degree (M.Tech, MS abroad, or MBA / PGDM)",
          type: "degree_or_pathway",
          summary: "Evaluating whether deeper academic specialization or management credentials align with your 5-year vision.",
          whySuggested: "Provides clear timeline criteria to evaluate exam preparation (GATE/GRE/CAT) vs immediate employment.",
          whatRemainsUnknown: "Target budget, geographic preferences, and scholarship eligibility.",
          sampleNextActions: ["Take a diagnostic test for target entrance exam", "Compare ROI of 2-year work experience vs immediate Master's"],
        },
        {
          id: "poss_grad_startup_builder",
          title: "Early-Stage Startup Contributor or Founder",
          type: "exploration_domain",
          summary: "Joining a high-growth seed/Series A startup to gain cross-functional execution speed.",
          whySuggested: "Offers maximum learning velocity and autonomy if you thrive on rapid problem solving.",
          whatRemainsUnknown: "Risk tolerance regarding salary structure versus equity upside.",
          sampleNextActions: ["Reach out to 5 founders building products in your interest domain", "Contribute to an active open source project"],
        },
      ];
  }
}

export function generateFirstNextMove(
  stageId: AcademicStageId,
  possibilities: StartingPossibility[]
): FirstNextMoveAction {
  const topPossibility = possibilities[0];

  switch (stageId) {
    case "classes-4-7":
      return {
        id: "fnm_younger_starter",
        title: "Create your first mini creative project",
        description: "Spend 20 minutes making a fun interactive story or drawing without any grades or pressure.",
        estimatedTime: "20 mins",
        actionType: "try_mini_project",
      };
    case "classes-8-10":
      return {
        id: "fnm_mid_explore_subjects",
        title: "Explore real-world subject connections",
        description: "See how your favorite topics connect directly to modern careers and interactive projects.",
        estimatedTime: "15 mins",
        actionType: "explore_interest",
      };
    case "classes-11-12":
      return {
        id: "fnm_high_compare_degrees",
        title: "Compare realistic educational pathways",
        description: "Review prerequisites, realistic timelines, and practical skills for your top 2 degree options.",
        estimatedTime: "25 mins",
        actionType: "compare_pathways",
      };
    case "diploma":
      return {
        id: "fnm_dip_review_lateral",
        title: "Map your lateral entry vs industry options",
        description: "Check eligibility requirements for lateral entry B.Tech programs in your state.",
        estimatedTime: "20 mins",
        actionType: "compare_pathways",
      };
    case "degree-engineering":
      return {
        id: "fnm_deg_build_portfolio_action",
        title: `Explore the ${topPossibility.title} pathway`,
        description: topPossibility.sampleNextActions[0] || "Review the recommended first project guide.",
        estimatedTime: "30 mins",
        actionType: "try_mini_project",
      };
    case "final-year-grad":
    default:
      return {
        id: "fnm_grad_clarify_transition",
        title: "Audit your project evidence against industry benchmarks",
        description: "Evaluate your existing resume and projects against modern rubric standards.",
        estimatedTime: "25 mins",
        actionType: "review_curriculum",
      };
  }
}

// =============================================================================
// 2. COMPILE STARTING PROFILE (STAGE H)
// =============================================================================

export function compileStudentIntelligenceProfile(
  state: OnboardingState
): StudentIntelligenceProfile {
  const possibilities = generateCuratedPossibilities(
    state.stageId,
    state.interests.selectedCategoryIds
  );

  const firstNextMove = generateFirstNextMove(state.stageId, possibilities);

  return {
    profileId: `sip_${state.stageId}_${Date.now().toString(36)}`,
    academicStageId: state.stageId,
    academicContext: state.academicContext,
    clarity: state.clarity,
    interests: state.interests,
    startingSkills: state.startingSkills,
    activityAttempt: state.activityAttempt,
    reflection: state.reflection,
    possibilities,
    firstNextMove,
    status: "student_reviewed",
    updatedAt: new Date().toISOString(),
  };
}

// =============================================================================
// 3. FRONTEND API ADAPTER
// =============================================================================

export interface OnboardingAdapter {
  getInitialState(stageId: AcademicStageId, isDemo?: boolean): Promise<OnboardingState>;
  saveDraft(draft: Partial<OnboardingState>): Promise<{ success: boolean; savedAt: string }>;
  recordActivity(attempt: ActivityAttemptResult): Promise<{ recorded: boolean }>;
  submitConfirmedProfile(
    profile: StudentIntelligenceProfile
  ): Promise<{ success: boolean; confirmationId: string; nextHandoff: string }>;
}

export const onboardingAdapter: OnboardingAdapter = {
  async getInitialState(stageId: AcademicStageId, isDemo: boolean = true): Promise<OnboardingState> {
    // Simulated network latency
    await new Promise((r) => setTimeout(r, 60));
    return createInitialOnboardingState(stageId, isDemo);
  },

  async saveDraft(draft: Partial<OnboardingState>): Promise<{ success: boolean; savedAt: string }> {
    void draft;
    await new Promise((r) => setTimeout(r, 80));
    return {
      success: true,
      savedAt: new Date().toISOString(),
    };
  },

  async recordActivity(attempt: ActivityAttemptResult): Promise<{ recorded: boolean }> {
    void attempt;
    await new Promise((r) => setTimeout(r, 60));
    return { recorded: true };
  },

  async submitConfirmedProfile(
    profile: StudentIntelligenceProfile
  ): Promise<{ success: boolean; confirmationId: string; nextHandoff: string }> {
    void profile;
    await new Promise((r) => setTimeout(r, 120));
    return {
      success: true,
      confirmationId: `conf_${Date.now().toString(36)}`,
      nextHandoff: "/dashboard/student?preview=true&flow=flow4_handoff",
    };
  },
};
