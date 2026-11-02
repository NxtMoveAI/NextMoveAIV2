/**
 * NEXT MOVE AI V2 — FLOW 4 STUDENT HOME ADAPTER
 * 
 * Transforms the confirmed Flow 3 StudentIntelligenceProfile into
 * a typed StudentHomeViewModel. Grounded, truthful, and age-adaptive.
 */

import { type AcademicStageId, ACADEMIC_STAGES } from "@/data/landing-demo";
import {
  type StudentIntelligenceProfile,
  type AcademicContextData,
  type InterestsData,
  type ClarityData,
  type StartingPossibility,
} from "@/features/onboarding/schemas/types";
import { MICRO_ACTIVITIES_CATALOG } from "@/features/onboarding/data/activities";
import { activityEvidenceStore } from "@/features/validate-fit/services/evidence-store";
import {
  type StudentHomeViewModel,
  type NextMoveAction,
  type NextMoveActionType,
  type PossibilityDomainType,
  type ExplorePossibilityItem,
  type GrowthSnapshotViewModel,
  type GrowthEvidenceEntry,
  type RecentActivityEvent,
  type PartnerQuestionPrompt,
} from "../schemas/types";

// =============================================================================
// 1. ACADEMIC STAGE & CONTEXT HELPERS
// =============================================================================

export function getAcademicStageTitle(stageId: AcademicStageId): string {
  const stage = ACADEMIC_STAGES.find((s) => s.id === stageId);
  return stage ? stage.label : "Academic Journey";
}

export function formatAcademicSummary(context: AcademicContextData): string {
  switch (context.type) {
    case "classes-4-7":
      return `${context.data.currentClass} • Middle School Explorer`;
    case "classes-8-10":
      return `${context.data.currentClass} • High School Foundations`;
    case "classes-11-12":
      return `${context.data.currentClass} • ${context.data.stream}`;
    case "diploma":
      return `Diploma in ${context.data.branch} (${context.data.currentYear})`;
    case "degree-engineering":
      return `${context.data.degreeProgram} in ${context.data.branchOrMajor} (${context.data.currentYear})`;
    case "final-year-grad":
      return `${context.data.completedDegree} • ${context.data.specialization}`;
  }
}

export function formatClarityLabel(
  clarityLevel: string,
  isStillExploring?: boolean
): string {
  if (isStillExploring) {
    if (clarityLevel === "very_clear") {
      return "Initial Direction • Exploring Options";
    }
    return "Exploring Multiple Directions";
  }
  switch (clarityLevel) {
    case "very_confused":
    case "still_exploring":
      return "Exploring Multiple Directions";
    case "somewhat_clear":
    case "few_interests":
      return "Evaluating Potential Directions";
    case "have_an_idea":
      return "Exploring Early Ideas";
    case "very_clear":
      return "Focused on Defined Path";
    case "direction_changing":
      return "Evaluating New Horizon";
    default:
      return "Active Exploration";
  }
}

// =============================================================================
// 2. ALTERNATIVE NEXT ACTIONS GENERATOR
// Grounded alternatives for the primary intelligent widget
// =============================================================================

export function generateAlternativeActions(
  stageId: AcademicStageId,
  context: AcademicContextData
): NextMoveAction[] {
  switch (stageId) {
    case "classes-4-7":
      return [
        {
          id: "alt_c47_1",
          title: "Nature Detective: Backyard Leaf & Bug Observation Log",
          description: "Spend 15 minutes outdoors sketching two different plants or insects, noting how they adapt to sunlight.",
          whySuggested: "Connects your interest in drawing and outdoor living systems.",
          supportingContext: "Classes 4–7 Curiosity Track",
          effortMinutes: 15,
          learningOutcome: "Develops empirical observation and nature recording skills.",
          actionType: "curiosity_project",
          status: "active",
        },
        {
          id: "alt_c47_2",
          title: "Build a Paper Machine: Gravity Marble Maze",
          description: "Use recycled cardboard and tape to build a simple gravity ramp with at least two speed bumps.",
          whySuggested: "Hands-on making without requiring screen time or specialized kits.",
          supportingContext: "Classes 4–7 Hands-on Making Track",
          effortMinutes: 20,
          learningOutcome: "Introduces potential energy and mechanical friction principles.",
          actionType: "curiosity_project",
          status: "active",
        },
      ];

    case "classes-8-10":
      return [
        {
          id: "alt_c810_1",
          title: "Compare Real-World Subjects: Economics vs. Applied Physics",
          description: "Read two short scenario breakdowns: how a solar farm prices electricity vs how photovoltaic cells generate it.",
          whySuggested: "Helps you see how high-school subjects translate to real careers before Class 11 stream selection.",
          supportingContext: "Classes 8–10 Stream Discovery",
          effortMinutes: 15,
          learningOutcome: "Broadens subject awareness without locking your choices prematurely.",
          actionType: "compare_pathways",
          status: "active",
        },
        {
          id: "alt_c810_2",
          title: "Logical Deduction: The Community Library Budget Puzzle",
          description: "Allocate a fixed local budget across book purchases, computers, and evening classes based on survey demand.",
          whySuggested: "Builds structured problem-solving and trade-off evaluation.",
          supportingContext: "Classes 8–10 Logic Track",
          effortMinutes: 15,
          learningOutcome: "Practises resource allocation and qualitative constraint balancing.",
          actionType: "practical_challenge",
          status: "active",
        },
      ];

    case "classes-11-12":
      return [
        {
          id: "alt_c1112_1",
          title: "Compare 2 Degree Curricula: B.Tech CS vs. Bachelor of Design (B.Des)",
          description: "Review core first-year syllabi, lab coursework, and internship expectations for both paths side-by-side.",
          whySuggested: "Explores creative-technical intersections before entrance examination deadlines.",
          supportingContext: "Classes 11–12 Educational Pathway Comparison",
          effortMinutes: 20,
          learningOutcome: "Evaluates curriculum depth and career options across technical and creative degrees.",
          actionType: "compare_pathways",
          status: "active",
        },
        {
          id: "alt_c1112_2",
          title: "Build a 1-Page Portfolio Starter on GitHub or Notion",
          description: "Document one school project or personal hobby with a clear problem statement, photos/code, and reflection.",
          whySuggested: "Modern admissions and tech recruiters increasingly value self-initiated evidence over test scores alone.",
          supportingContext: "Classes 11–12 Evidence Building",
          effortMinutes: 25,
          learningOutcome: "Learns how to package practical work as verifiable proof of interest.",
          actionType: "portfolio_exploration",
          status: "active",
        },
      ];

    case "diploma":
      return [
        {
          id: "alt_dip_1",
          title: "PLC Ladder Logic Starter: Virtual Traffic Signal Controller",
          description: "Simulate a 4-state traffic signal using open-source ladder logic diagrams with timing relays.",
          whySuggested: "Applied industrial automation is one of the highest-demand skills for polytechnic graduates.",
          supportingContext: "Diploma Practical Specialization",
          effortMinutes: 25,
          learningOutcome: "Bridges mechanical/electrical systems with programmable industrial controllers.",
          actionType: "practical_challenge",
          status: "active",
        },
        {
          id: "alt_dip_2",
          title: "Lateral Entry vs. Direct Employment: 3-Year Salary & Growth Review",
          description: "Examine realistic junior technician starting bands vs 2nd-year B.Tech lateral transfer outcomes.",
          whySuggested: "Provides objective financial and career trajectory data without hype.",
          supportingContext: "Diploma Transition Strategy",
          effortMinutes: 15,
          learningOutcome: "Evaluates immediate earning potential against the long-term return on an engineering degree.",
          actionType: "compare_pathways",
          status: "active",
        },
      ];

    case "degree-engineering": {
      const isCommerce =
        context.type === "degree-engineering" &&
        (context.data.degreeProgram === "BCom" ||
          context.data.degreeProgram === "BBA" ||
          context.data.branchOrMajor.includes("Finance") ||
          context.data.branchOrMajor.includes("Accounting"));

      if (isCommerce) {
        return [
          {
            id: "alt_bcom_1",
            title: "Build a 3-Statement Linking Model in a Spreadsheet",
            description: "Connect Net Income from the P&L to Cash Flow from Operations and Balance Sheet Retained Earnings.",
            whySuggested: "Core financial modeling skill required for corporate finance and analyst internships.",
            supportingContext: "Commerce & Finance Practical Track",
            effortMinutes: 30,
            learningOutcome: "Masters balance sheet balancing and working capital flow mechanics.",
            actionType: "practical_challenge",
            status: "active",
          },
          {
            id: "alt_bcom_2",
            title: "Compare Career Pathways: CA vs CFA vs Corporate Financial Analyst",
            description: "Examine exam schedules, passing rates, articleship vs full-time job flexibility, and global mobility.",
            whySuggested: "Helps resolve post-graduation certification timing during your 3rd year.",
            supportingContext: "Commerce Strategic Decisions",
            effortMinutes: 20,
            learningOutcome: "Clarifies credential trade-offs before investing time and registration fees.",
            actionType: "compare_pathways",
            status: "active",
          },
        ];
      }

      return [
        {
          id: "alt_deg_1",
          title: "Benchmark API Latency & Add Redis Caching to an Endpoint",
          description: "Measure the p95 latency difference between a raw SQL query and a key-value cached response in local code.",
          whySuggested: "System performance and caching are foundational to backend engineering roles.",
          supportingContext: "Engineering & Tech Specialization",
          effortMinutes: 30,
          learningOutcome: "Demonstrates practical performance profiling beyond basic CRUD tutorials.",
          actionType: "practical_challenge",
          status: "active",
        },
        {
          id: "alt_deg_2",
          title: "Write a Technical Architecture README for Your Best Project",
          description: "Document system components, data schemas, trade-offs made, and local reproduction instructions.",
          whySuggested: "High-signal hiring teams evaluate architectural clarity and documentation discipline.",
          supportingContext: "Engineering Evidence Track",
          effortMinutes: 25,
          learningOutcome: "Transforms raw code into an impressive, reviewable portfolio artifact.",
          actionType: "portfolio_exploration",
          status: "active",
        },
      ];
    }

    case "final-year-grad":
      return [
        {
          id: "alt_grad_1",
          title: "Review 3 Competitive Public Policy Fellowship Applications",
          description: "Analyze essay prompts, eligibility criteria, stipend structures, and alumni placements for top fellowship programs.",
          whySuggested: "Gives concrete deadlines and application expectations for immediate post-graduation transitions.",
          supportingContext: "Graduate Transition Track",
          effortMinutes: 20,
          learningOutcome: "Clarifies application timelines and portfolio requirements.",
          actionType: "compare_pathways",
          status: "active",
        },
        {
          id: "alt_grad_2",
          title: "Synthesize an Urban Mobility Trade-off Case Study",
          description: "Draft a 1-page stakeholder analysis evaluating dedicated bus lanes vs public subsidy of metro fares.",
          whySuggested: "Directly matches think-tank and policy analyst interview tasks.",
          supportingContext: "Policy & Social Impact Track",
          effortMinutes: 25,
          learningOutcome: "Practises structured evidence citation and objective trade-off articulation.",
          actionType: "practical_challenge",
          status: "active",
        },
      ];
  }
}

// =============================================================================
// 3. CONTEXTUAL MY PARTNER STARTER PROMPTS
// =============================================================================

export function generatePartnerPrompts(
  stageId: AcademicStageId,
  context: AcademicContextData,
  interests?: InterestsData,
  clarity?: ClarityData
): PartnerQuestionPrompt[] {
  void clarity;
  switch (stageId) {
    case "classes-4-7":
      return [
        {
          id: "pq_c47_1",
          question: "How do I know what I'm really good at?",
          contextTag: "Curiosity & Discovery",
          response: {
            acknowledgement: "It's wonderful to wonder about this! At your age, what you enjoy doing often points directly to what you can get really good at.",
            explorationDirections: [
              "Notice what activities make you lose track of time—like sketching, building with LEGO, or solving puzzles.",
              "Try sharing a mini-project (like a drawing or a nature collection) with a friend or teacher to get their perspective.",
            ],
            tradeoffOrUnknown: "You don't need to pick one talent today; human abilities expand as you try different creative and scientific things.",
            suggestedFirstStep: "Try the 3-scene adventure story challenge this afternoon and see how it feels!",
          },
        },
        {
          id: "pq_c47_2",
          question: "Can I like both drawing and science?",
          contextTag: "Combining Interests",
          response: {
            acknowledgement: "Absolutely yes! Some of the world's greatest thinkers, like Leonardo da Vinci, combined drawing with scientific exploration.",
            explorationDirections: [
              "Botanical and scientific illustration (drawing realistic plants, dinosaurs, and spacecraft).",
              "Animation and video game design (where physics, math, and character art work together).",
            ],
            tradeoffOrUnknown: "Traditional school splits these into different classes, but real-world creators use both every single day.",
            suggestedFirstStep: "Keep an outdoor sketchpad where you draw interesting leaves or insects you find.",
          },
        },
      ];

    case "classes-8-10":
      return [
        {
          id: "pq_c810_1",
          question: "What if I am still unsure about choosing a stream for Class 11?",
          contextTag: "Stream Decisions",
          response: {
            acknowledgement: "Being unsure in Class 9 or 10 is completely normal and healthy. It means you are thoughtful, not behind.",
            explorationDirections: [
              "Examine the actual day-to-day subject material of Science, Commerce, and Humanities rather than just listening to reputations.",
              "Look into interdisciplinary fields like Economics, Product Design, or Data Science that combine multiple streams.",
            ],
            tradeoffOrUnknown: "Your choice of stream in Class 11 opens certain pathways, but modern universities offer far more flexibility to change or combine fields than in the past.",
            suggestedFirstStep: "Try 2 quick mini-tasks across different domains to observe where your natural curiosity leads.",
          },
        },
        {
          id: "pq_c810_2",
          question: "Do I have to do engineering or medical to build a great career?",
          contextTag: "Broad Horizons",
          response: {
            acknowledgement: "No, absolutely not. Technology, business, design, policy, and law offer thriving, high-impact careers without engineering or medical degrees.",
            explorationDirections: [
              "Explore careers in digital product design, corporate finance, developmental economics, and cybersecurity.",
              "Notice that practical demonstrated skills often outweigh traditional degrees in modern high-growth industries.",
            ],
            tradeoffOrUnknown: "Societal prestige often lags behind economic reality by 10 to 15 years.",
            suggestedFirstStep: "Review our 3-part comparison of non-traditional high-impact careers.",
          },
        },
      ];

    case "classes-11-12": {
      const isStillExploring =
        interests?.selectedCategoryIds.includes("still_exploring") ||
        interests?.isStillExploring ||
        (interests?.selectedCategoryIds.length ?? 0) === 0;

      if (isStillExploring) {
        return [
          {
            id: "pq_c1112_explore_1",
            question: "How can I explore degree options across engineering, pure sciences, and analytics without feeling overwhelmed?",
            contextTag: "Broad Horizons",
            response: {
              acknowledgement: "In Class 12 Science (PCM), keeping multiple options open is completely normal. Your analytical foundations open up a wide range of degrees beyond just one narrow track.",
              explorationDirections: [
                "Compare core curriculum and career directions across B.Tech engineering branches, B.Sc research programs, and quantitative economics.",
                "Dedicate short 20-minute sessions to syllabus audits or sample projects across two distinct fields to test what energizes you.",
              ],
              tradeoffOrUnknown: "Balancing board preparation and exam cutoffs requires steady focus, but exploring options early helps you make intentional degree choices without rushing.",
              suggestedFirstStep: "Review the exploratory Next Move action on your dashboard to compare 2 distinct degree tracks side-by-side.",
            },
          },
          {
            id: "pq_c1112_explore_2",
            question: "What if I'm not sure whether traditional engineering is the right fit for me?",
            contextTag: "Alternative Pathways",
            response: {
              acknowledgement: "That is a thoughtful and valid question. A Science (PCM) background is valuable across data science, economics, industrial design, and scientific research—not just engineering.",
              explorationDirections: [
                "Investigate emerging multidisciplinary fields that blend analytical logic with computing, design, or economics.",
                "Look into flexible undergraduate programs where you can take both technical and humanities or business electives.",
              ],
              tradeoffOrUnknown: "Traditional engineering provides familiar campus placement pipelines, while alternative and interdisciplinary degrees reward self-driven project portfolios and initiative.",
              suggestedFirstStep: "Sample a short practical micro-activity in your next move to experience hands-on problem solving.",
            },
          },
        ];
      }

      return [
        {
          id: "pq_c1112_1",
          question: "How do I balance entrance exam prep with building real skills?",
          contextTag: "Preparation Strategy",
          response: {
            acknowledgement: "This is a frequent dilemma for Class 12 students. Entrance exams help clear university cutoffs, while demonstrable skills build lasting capability once you begin your degree.",
            explorationDirections: [
              "Maintain consistent focus on your core board and entrance preparation, while reserving small weekend blocks for hands-on problem solving.",
              "Select exploratory mini-projects that reinforce your physics, mathematics, or computing curriculum rather than distracting from it.",
            ],
            tradeoffOrUnknown: "Strong entrance scores satisfy formal admission criteria, while early hands-on projects build practical intuition and long-term momentum.",
            suggestedFirstStep: "Review our 2-pathway undergraduate comparison (B.Tech CS vs BCA + Practical Portfolio).",
          },
        },
        {
          id: "pq_c1112_2",
          question: "Can I explore computer science if I'm not in an elite coaching institute?",
          contextTag: "Self-Directed Learning",
          response: {
            acknowledgement: "Yes, absolutely. The global developer and open-source ecosystems are merit-based, accessible, and rich with free learning resources.",
            explorationDirections: [
              "Build small, working projects and document your learning progression with clean code and explanations.",
              "Participate in beginner-friendly open-source sprints and student technical communities to learn alongside peers.",
            ],
            tradeoffOrUnknown: "Self-directed learning requires self-discipline and curiosity, but builds durable problem-solving habits that coaching alone cannot provide.",
            suggestedFirstStep: "Check out the guided starter project recommendations in your Next Move card.",
          },
        },
      ];
    }

    case "diploma":
      return [
        {
          id: "pq_dip_1",
          question: "Should I take lateral entry into B.Tech or start working after my diploma?",
          contextTag: "Lateral Entry vs Work",
          response: {
            acknowledgement: "Both pathways have strong merits depending on your financial priorities and career aspirations.",
            explorationDirections: [
              "Lateral Entry gives you a B.Tech degree in 3 years instead of 4, qualifying you for graduate design and engineering roles.",
              "Direct employment lets you gain 3 years of real plant/shop-floor experience while pursuing an evening degree or certifications.",
            ],
            tradeoffOrUnknown: "Starting salaries for diploma technicians are lower initially, but senior technicians with hands-on machinery mastery are extremely hard to replace.",
            suggestedFirstStep: "Review the LEET entrance syllabus to evaluate your preparation readiness.",
          },
        },
      ];

    case "degree-engineering": {
      const isCommerce =
        context.type === "degree-engineering" &&
        (context.data.degreeProgram === "BCom" ||
          context.data.branchOrMajor.includes("Finance"));

      if (isCommerce) {
        return [
          {
            id: "pq_bcom_1",
            question: "How do I get an equity research or FP&A role as a BCom student?",
            contextTag: "Finance Career Entry",
            response: {
              acknowledgement: "Hiring managers for finance analyst roles care immensely about financial modeling speed, clean Excel formulas, and balance sheet intuition.",
              explorationDirections: [
                "Build a public portfolio of 3-statement financial models analyzing publicly listed Indian or global companies.",
                "Learn basic SQL and Power BI alongside accounting to stand out against thousands of textbook-only applicants.",
              ],
              tradeoffOrUnknown: "Campus placement drives often favor branded colleges, but a public financial model on LinkedIn gets direct hiring partner attention.",
              suggestedFirstStep: "Complete the 12-month working capital cash flow modeling exercise.",
            },
          },
        ];
      }

      return [
        {
          id: "pq_deg_1",
          question: "How do I transition from tutorial code to real production engineering?",
          contextTag: "Engineering Capability",
          response: {
            acknowledgement: "Tutorials teach syntax; production engineering is about failure handling, edge cases, latency, and automated testing.",
            explorationDirections: [
              "Take any existing tutorial project and add structured logging, unit tests with 80% coverage, and Docker containerization.",
              "Profile where your code runs slowest under simulated load and implement caching or database indexing to optimize it.",
            ],
            tradeoffOrUnknown: "Building your own architecture is messier and slower than following video tutorials, but builds deep interview confidence.",
            suggestedFirstStep: "Check the 'Your next move' widget to benchmark and optimize your existing project.",
          },
        },
      ];
    }

    case "final-year-grad":
      return [
        {
          id: "pq_grad_1",
          question: "How do I evaluate a master's degree vs immediate analyst fellowships?",
          contextTag: "Post-Graduate Strategy",
          response: {
            acknowledgement: "A master's deepens specialized research frameworks, while fellowships provide immediate fieldwork and real policy exposure.",
            explorationDirections: [
              "Top public policy fellowships provide paid stipends and direct placement into legislative and research teams.",
              "Master's programs (MPP / MS) often accept applicants with 1-2 years of fellowship or field experience more favorably.",
            ],
            tradeoffOrUnknown: "Immediate master's programs involve tuition costs before knowing exactly which sub-discipline you enjoy most.",
            suggestedFirstStep: "Draft a 1-page policy synthesis brief to test your analytical appetite.",
          },
        },
      ];
  }
}

// =============================================================================
// 4. MAIN TRANSFORMATION ENGINE
// =============================================================================

export function transformProfileToHomeViewModel(
  profile: StudentIntelligenceProfile,
  options?: {
    studentName?: string;
    selectedAlternativeMoveId?: string | null;
    isMovePostponed?: boolean;
    isReturningUser?: boolean;
  }
): StudentHomeViewModel {
  const stageId = profile.academicStageId;
  const stageTitle = getAcademicStageTitle(stageId);
  const academicSummary = formatAcademicSummary(profile.academicContext);
  const alternatives = generateAlternativeActions(stageId, profile.academicContext);

  // Determine active next action
  let activeMove: NextMoveAction;
  const selectedAlt = alternatives.find((a) => a.id === options?.selectedAlternativeMoveId);

  if (selectedAlt) {
    activeMove = {
      ...selectedAlt,
      status: "alternative_selected",
      isAlternative: true,
    };
  } else {
    activeMove = {
      id: profile.firstNextMove.id,
      title: profile.firstNextMove.title,
      description: profile.firstNextMove.description,
      whySuggested: `Suggested from your ${profile.academicStageId} starting profile and stated exploration goals.`,
      supportingContext: "Recommended by your starting baseline",
      effortMinutes: profile.firstNextMove.estimatedTime,
      learningOutcome: "Builds practical evidence and clarifies your next exploration step.",
      actionType: (profile.firstNextMove.actionType === "try_mini_project"
        ? "practical_challenge"
        : profile.firstNextMove.actionType === "compare_pathways"
        ? "compare_pathways"
        : "curiosity_project") as NextMoveActionType,
      status: options?.isMovePostponed ? "postponed" : "active",
    };
  }

  if (options?.isMovePostponed) {
    activeMove.status = "postponed";
  }

  const isStillExploring =
    profile.interests.selectedCategoryIds.includes("still_exploring") ||
    profile.interests.isStillExploring ||
    profile.interests.selectedCategoryIds.length === 0;

  // A first-position suggestion or a broad keyword match is NOT evidence of fit.
  // Until an independently reviewed alignment model exists, use neutral labels.
  const determineBadge = (_p: StartingPossibility, idx: number): string => {
    if (isStillExploring) {
      return idx === 0 ? "Exploration Pathway" : "Curiosity Direction";
    }
    return "Suggested Exploration";
  };

  // Format possibilities
  const possibilities: ExplorePossibilityItem[] = profile.possibilities.map((p, idx) => ({
    id: p.id,
    title: p.title,
    domainType: (p.type === "degree_or_pathway"
      ? "educational_pathway"
      : p.type === "applied_skill_track"
      ? "applied_skill_track"
      : "interest_exploration") as PossibilityDomainType,
    badgeLabel: determineBadge(p, idx),
    summary: p.summary,
    whySuggested: p.whySuggested,
    whatRemainsUnknown: p.whatRemainsUnknown,
    tags: p.sampleNextActions || [],
    actionLabel: "Explore Path",
    actionRoute: `/dashboard/student/explore?focus=${p.id}`,
  }));

  // Format growth evidence entries
  const evidenceItems: GrowthEvidenceEntry[] = profile.startingSkills.map((s) => ({
    id: s.id,
    title: s.name,
    evidenceStatus: s.evidenceStatus,
    statusLabel:
      s.evidenceStatus === "practised"
        ? "Practised in Challenge"
        : s.evidenceStatus === "self_reported"
        ? "You Told Us (Self-Reported)"
        : s.evidenceStatus === "demonstrated"
        ? "Demonstrated in Work"
        : "Not Assessed Yet",
    category: s.category,
    provenance:
      s.evidenceStatus === "practised"
        ? "practised_in_challenge"
        : s.evidenceStatus === "self_reported"
        ? "you_told_us"
        : "not_assessed",
    notes: s.userNotes,
  }));

  // Only a real completed attempt with a catalogued option may appear in history.
  // An activity practice topic is NOT a verified or demonstrated competency.
  let recentActivity: RecentActivityEvent | undefined;
  const attempt = profile.activityAttempt;
  const activityDef = MICRO_ACTIVITIES_CATALOG.find(
    (activity) => activity.id === attempt?.activityId
  );
  const selectedOption = activityDef?.options.find(
    (option) => option.id === attempt?.selectedOptionId
  );
  const hasConsistentResult =
    selectedOption &&
    (attempt?.isCorrect === undefined || attempt.isCorrect === selectedOption.isCorrect);

  if (
    attempt?.attempted === true &&
    attempt.status === "completed" &&
    activityDef &&
    selectedOption &&
    hasConsistentResult
  ) {
    // Only the activity event's own timestamp can be shown. A missing or invalid
    // timestamp is omitted instead of being replaced with the profile update date.
    const rawTimestamp = attempt.completedAt;
    const eventDate = rawTimestamp && Number.isFinite(Date.parse(rawTimestamp))
      ? new Date(rawTimestamp)
      : undefined;
    const completedAt = eventDate?.toISOString();
    const isSynthetic = attempt.isSyntheticFixture === true;
    const dateLabel = eventDate
      ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(eventDate)
      : undefined;

    recentActivity = {
      id: `evt_${activityDef.id}`,
      activityId: activityDef.id,
      title: activityDef.title,
      stageId: profile.academicStageId,
      completedAt,
      // Do not manufacture relative times from returning-user status.
      timeAgo: dateLabel ? `${dateLabel}${isSynthetic ? " · Synthetic fixture" : ""}` : undefined,
      feedbackGiven: (attempt.feedback || selectedOption.feedback)?.trim() || undefined,
      competencyPractised: activityDef.demonstratedCompetency,
      wasCorrect: selectedOption.isCorrect,
      isSyntheticFixture: isSynthetic,
    };
  }

  // This first-onboarding baseline records only one in-app micro-activity.
  // Do not count or display practice entries when that activity has no valid record.
  // Future backend history must provide separately attributable task events.
  // Flow 6 Experiential Trials Integration: Check for genuine completed challenges
  const evidenceScope = profile ? profile.profileId || profile.academicStageId : "anonymous";
  activityEvidenceStore.setProfileScope(evidenceScope, profile?.academicStageId);
  const completedTrials = activityEvidenceStore.getCompletedAttempts();
  const latestTrial = completedTrials[0];

  if (latestTrial && latestTrial.completedAt) {
    const trialDate = new Date(latestTrial.completedAt);
    const dateLabel = new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(trialDate);

    if (!recentActivity || (attempt?.completedAt && new Date(latestTrial.completedAt) > new Date(attempt.completedAt))) {
      recentActivity = {
        id: latestTrial.id,
        activityId: latestTrial.trialId,
        title: latestTrial.trialTitle,
        stageId: latestTrial.stageId,
        completedAt: latestTrial.completedAt,
        timeAgo: dateLabel,
        feedbackGiven: latestTrial.reflection?.enjoyed || "Real-world challenge completed",
        competencyPractised: latestTrial.competencyPractised,
        wasCorrect: true,
        isSyntheticFixture: false,
      };
    }
  }

  const trialEvidenceItems: GrowthEvidenceEntry[] = completedTrials.map((t) => ({
    id: t.id,
    title: t.trialTitle,
    category: "Practical Challenge",
    evidenceStatus: "practised",
    statusLabel: "Practised",
    provenance: "practised_in_challenge",
  }));

  const baseItems = recentActivity
    ? evidenceItems
    : evidenceItems.filter((entry) => entry.evidenceStatus !== "practised");

  const supportedEvidenceItems = [...trialEvidenceItems, ...baseItems];
  const practisedCount = supportedEvidenceItems.filter((entry) => entry.evidenceStatus === "practised").length;
  const selfReportedCount = supportedEvidenceItems.filter((entry) => entry.evidenceStatus === "self_reported").length;
  const hasAttempted = Boolean(recentActivity);

  const growthSnapshot: GrowthSnapshotViewModel = {
    hasAttemptedActivity: hasAttempted,
    totalPractisedCount: practisedCount,
    totalSelfReportedCount: selfReportedCount,
    unassessedAreasCount: Math.max(1, 4 - (practisedCount + selfReportedCount)),
    evidenceItems: supportedEvidenceItems,
    recentActivity,
    emptyStateMessage: hasAttempted
      ? undefined
      : "You haven't completed an activity yet. That's a place to begin, not a problem.",
  };

  const partnerPrompts = generatePartnerPrompts(
    stageId,
    profile.academicContext,
    profile.interests,
    profile.clarity
  );

  return {
    profileRevision: profile.profileId,
    studentName: options?.studentName,
    isDemoMode: true,
    onboardingStatus: profile.status,
    academicStageId: stageId,
    academicStageLabel: stageTitle,
    academicSummary,
    academicContext: profile.academicContext,
    clarity: profile.clarity,
    interests: profile.interests,
    primaryGoal: profile.clarity.primaryHelpReason || "Explore possibilities and build clarity.",
    clarityLevelLabel: formatClarityLabel(profile.clarity.clarityLevel, isStillExploring),
    recommendedNextAction: activeMove,
    alternativeNextActions: alternatives,
    possibilities,
    growthSnapshot,
    partnerPrompts,
    latestMeaningfulActivity: recentActivity ? profile.activityAttempt : undefined,
    updatedAt: profile.updatedAt,
  };
}
