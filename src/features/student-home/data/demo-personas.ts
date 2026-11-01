/**
 * NEXT MOVE AI V2 — FLOW 4 SYNTHETIC DEMO PERSONAS
 * 
 * Pre-compiled, grounded student intelligence starting profiles
 * representing all 8 required persona variants, plus empty and returning states.
 * Uses exact canonical schemas from Flow 3.
 */

import { type StudentIntelligenceProfile } from "@/features/onboarding/schemas/types";
import { type PersonaFixtureId } from "../schemas/types";

export const DEMO_PERSONAS: Record<PersonaFixtureId, {
  name: string;
  shortLabel: string;
  stageLabel: string;
  description: string;
  profile: StudentIntelligenceProfile;
}> = {
  // ---------------------------------------------------------------------------
  // Persona A: Class 6 Creative Student
  // ---------------------------------------------------------------------------
  persona_a_class6: {
    name: "Aanya Verma",
    shortLabel: "Class 6 Creative",
    stageLabel: "Classes 4–7",
    description: "Enjoys drawing, stories, and nature. No mandatory career lock, curiosity-led.",
    profile: {
      profileId: "sip_persona_a_class6",
      academicStageId: "classes-4-7",
      academicContext: {
        type: "classes-4-7",
        data: {
          currentClass: "Class 6",
          favoriteSchoolActivities: ["Drawing & Art", "Science Experiments", "Story Reading"],
        },
      },
      clarity: {
        clarityLevel: "few_interests",
        primaryHelpReason: "Discovering fun things I can build and learn with drawings and nature.",
        studentStatement: "I love drawing animals and making comic characters with my friends.",
      },
      interests: {
        selectedCategoryIds: ["creativity", "science_discovery"],
        selectedSubInterestIds: ["creat_storytelling", "creat_visual_design", "sci_biology_life"],
        isStillExploring: false,
      },
      startingSkills: [
        {
          id: "skill_drawing",
          name: "Visual Sketching & Character Doodles",
          category: "Creative Expression",
          familiarity: "tried_it",
          evidenceStatus: "self_reported",
        },
        {
          id: "skill_story_telling",
          name: "Narrative Arc & Visual Storyboarding",
          category: "Storytelling",
          familiarity: "practised",
          evidenceStatus: "practised",
        },
      ],
      activityAttempt: {
        activityId: "act_story_pacing",
        attempted: true,
        selectedOptionId: "opt_1",
        isCorrect: true,
        retriesCount: 0,
        feedback: "Wonderful storytelling! Starting with the challenge, building mystery in the middle, and resolving warmly keeps readers captivated.",
        status: "completed",
        completedAt: "2026-10-28T10:00:00.000Z",
        isSyntheticFixture: true,
      },
      reflection: {
        enjoyedMost: "Drawing the animal habitats and imagining the detective character.",
        directionPreference: "explore_similar",
        immediateSupportNeeded: ["Work on an interactive, guided starter project"],
      },
      possibilities: [
        {
          id: "poss_a1",
          title: "Visual Storyteller & Comic Creator",
          type: "exploration_domain",
          summary: "Combining character sketches, panel layout, and storytelling to produce illustrated adventure stories.",
          whySuggested: "You expressed high curiosity in drawing stories and exploring creative arts.",
          whatRemainsUnknown: "Whether you enjoy digital drawing on a screen or traditional colored pens on paper most.",
          sampleNextActions: ["Draw a 3-scene comic strip about a robot in an ancient forest", "Design 2 original comic heroes"],
        },
        {
          id: "poss_a2",
          title: "Junior Nature & Wildlife Observer",
          type: "exploration_domain",
          summary: "Learning how living creatures adapt, building nature observation logs, and hands-on environmental exploration.",
          whySuggested: "You selected science and love discovering living ecosystems.",
          whatRemainsUnknown: "Which part of science (plants, animals, or space stars) feels most exciting.",
          sampleNextActions: ["Start a 3-day backyard nature sketchpad", "Track bird visiting patterns"],
        },
      ],
      firstNextMove: {
        id: "fnm_a1",
        title: "Create a 3-Scene Adventure Story Comic",
        description: "Pick two characters (e.g., an observant squirrel and an explorer) and draw three panels showing how they solve a mystery together.",
        estimatedTime: "20 mins",
        actionType: "explore_interest",
      },
      status: "confirmed",
      updatedAt: "2026-10-31T12:00:00.000Z",
    },
  },

  // ---------------------------------------------------------------------------
  // Persona B: Class 9 Unsure Student
  // ---------------------------------------------------------------------------
  persona_b_class9: {
    name: "Rohan Kulkarni",
    shortLabel: "Class 9 Undecided",
    stageLabel: "Classes 8–10",
    description: "Curious but unsure. Supported with low-pressure multi-path discovery without premature stream lock.",
    profile: {
      profileId: "sip_persona_b_class9",
      academicStageId: "classes-8-10",
      academicContext: {
        type: "classes-8-10",
        data: {
          currentClass: "Class 9",
          subjectInterests: ["Mathematics", "Social Studies", "English Literature"],
          streamCuriosity: "Exploring all",
        },
      },
      clarity: {
        clarityLevel: "very_confused",
        primaryHelpReason: "I don't know what stream to pick in Class 11 and want to see what fits me.",
        studentStatement: "Everyone at school is talking about engineering and commerce, but I am still figuring out what I like.",
      },
      interests: {
        selectedCategoryIds: ["still_exploring"],
        selectedSubInterestIds: ["explore_general", "explore_hands_on_first"],
        isStillExploring: true,
      },
      startingSkills: [
        {
          id: "skill_reading_analysis",
          name: "Analytical Reading & Summarization",
          category: "Core Skills",
          familiarity: "tried_it",
          evidenceStatus: "self_reported",
        },
        {
          id: "skill_stream_evaluation",
          name: "Curricular Stream Evaluation & Pathway Awareness",
          category: "Pathway Analysis",
          familiarity: "practised",
          evidenceStatus: "practised",
        },
      ],
      activityAttempt: {
        activityId: "act_stream_comparison",
        attempted: true,
        selectedOptionId: "opt_1",
        isCorrect: true,
        retriesCount: 0,
        feedback: "Spot on! Knowing that computing is accessible through both Commerce with Math (BCA, B.Sc, FinTech) and Science (B.Tech) removes unnecessary panic from 10th stream choices.",
        status: "completed",
        completedAt: "2026-10-28T11:00:00.000Z",
        isSyntheticFixture: true,
      },
      reflection: {
        enjoyedMost: "Seeing that you do not have to pick your lifelong career at age 14.",
        directionPreference: "explore_different",
        immediateSupportNeeded: ["Review sample education and career roadmaps without commitment"],
      },
      possibilities: [
        {
          id: "poss_b1",
          title: "Multi-Stream Subject Explorer",
          type: "exploration_domain",
          summary: "Exploring how Mathematics, Economics, and Humanities connect in modern careers like product design and economics.",
          whySuggested: "You are currently exploring all options and want broad exposure before choosing.",
          whatRemainsUnknown: "Which subjects feel energizing when you solve practical, real problems.",
          sampleNextActions: ["Sample 1 mini-task in commerce and 1 in science this week", "Talk to someone who studied humanities"],
        },
        {
          id: "poss_b2",
          title: "Applied Problem Solving & Logic",
          type: "exploration_domain",
          summary: "Learning how structured thinking and logic apply across diverse fields from law to software.",
          whySuggested: "You enjoy mathematics and literature equally.",
          whatRemainsUnknown: "Whether you prefer qualitative writing or quantitative problem solving.",
          sampleNextActions: ["Solve a logic case study involving a community library budget"],
        },
      ],
      firstNextMove: {
        id: "fnm_b1",
        title: "Try 2 Low-Stakes Mini-Tasks Across Different Streams",
        description: "Complete one quick creative/business exercise and one quick scientific deduction task to observe what sparks genuine engagement.",
        estimatedTime: "15 mins",
        actionType: "explore_interest",
      },
      status: "confirmed",
      updatedAt: "2026-10-31T12:00:00.000Z",
    },
  },

  // ---------------------------------------------------------------------------
  // Persona C: Class 12 Science PCM Student
  // ---------------------------------------------------------------------------
  persona_c_class12: {
    name: "Aryan Sharma",
    shortLabel: "Class 12 Science PCM",
    stageLabel: "Classes 11–12",
    description: "Science stream exploring technology and alternative degree pathways without fake guarantees.",
    profile: {
      profileId: "sip_persona_c_class12",
      academicStageId: "classes-11-12",
      academicContext: {
        type: "classes-11-12",
        data: {
          currentClass: "Class 12",
          stream: "Science (PCM)",
          currentSubjects: ["Physics", "Chemistry", "Mathematics", "Computer Science", "English"],
          futureEducationInterest: "Software, Engineering or Applied Mathematics",
        },
      },
      clarity: {
        clarityLevel: "somewhat_clear",
        primaryHelpReason: "Evaluating whether to focus strictly on JEE or build practical coding skills alongside.",
        studentStatement: "I like computer science and math, but I want to make sure I pick the right undergraduate course.",
      },
      interests: {
        selectedCategoryIds: ["technology", "analysis_problem_solving"],
        selectedSubInterestIds: ["tech_programming", "tech_web_apps", "ana_data_analytics"],
        isStillExploring: false,
      },
      startingSkills: [
        {
          id: "skill_math_reasoning",
          name: "Calculus & Linear Algebra Foundations",
          category: "Quantitative Foundations",
          familiarity: "practised",
          evidenceStatus: "self_reported",
        },
        {
          id: "skill_pathway_eval",
          name: "Educational Pathway & Trade-Off Analysis",
          category: "Strategic Decision Making",
          familiarity: "practised",
          evidenceStatus: "practised",
        },
      ],
      activityAttempt: {
        activityId: "act_degree_tradeoff",
        attempted: true,
        selectedOptionId: "opt_1",
        isCorrect: true,
        retriesCount: 0,
        feedback: "Balanced and accurate. Real-world career outcomes depend on aligning curriculum depth, financial constraints, and practical project proof with personal learning goals rather than assuming one format is universally superior.",
        status: "completed",
        completedAt: "2026-10-28T12:00:00.000Z",
        isSyntheticFixture: true,
      },
      reflection: {
        enjoyedMost: "Seeing that practical projects carry weight even alongside traditional degrees.",
        directionPreference: "explore_similar",
        immediateSupportNeeded: ["Work on an interactive, guided starter project", "Compare degree vs alternative options"],
      },
      possibilities: [
        {
          id: "poss_c1",
          title: "Computer Science & Engineering Pathways",
          type: "degree_or_pathway",
          summary: "Traditional 4-year B.Tech / B.E. programs focusing on core systems, data structures, algorithms, and computing hardware.",
          whySuggested: "Strong alignment with Science PCM and technology interests.",
          whatRemainsUnknown: "Whether you prefer building web products, system-level software, or research mathematics.",
          sampleNextActions: ["Compare curriculum of Tier-1 vs Tier-2 CS universities", "Review what modern hiring looks for beyond degrees"],
        },
        {
          id: "poss_c2",
          title: "Applied Data Science & Computational Economics",
          type: "degree_or_pathway",
          summary: "Interdisciplinary programs combining mathematical statistics, economic forecasting, and cloud data platforms.",
          whySuggested: "Your interest in analysis and logic opens pathways beyond standard engineering.",
          whatRemainsUnknown: "Your interest in macroeconomic and market questions.",
          sampleNextActions: ["Explore 3 real-world computational economics case studies"],
        },
      ],
      firstNextMove: {
        id: "fnm_c1",
        title: "Compare 2 Undergraduate Pathways: B.Tech CS vs BCA + Practical Portfolio",
        description: "Examine curriculum differences, semester timelines, and hiring evidence expectations for both degrees.",
        estimatedTime: "25 mins",
        actionType: "compare_pathways",
      },
      status: "confirmed",
      updatedAt: "2026-10-31T12:00:00.000Z",
    },
  },

  // ---------------------------------------------------------------------------
  // Persona D: Diploma Mechanical Student
  // ---------------------------------------------------------------------------
  persona_d_diploma: {
    name: "Vikram Rathod",
    shortLabel: "Diploma Mechanical",
    stageLabel: "Diploma",
    description: "Polytechnic 2nd year. Evaluates lateral entry engineering vs industrial robotics & CAD.",
    profile: {
      profileId: "sip_persona_d_diploma",
      academicStageId: "diploma",
      academicContext: {
        type: "diploma",
        data: {
          branch: "Mechanical Engineering",
          currentYear: "2nd Year",
          practicalFocus: ["Workshop Practice", "AutoCAD & 3D Modeling", "Thermal Engineering"],
          postDiplomaAspiration: "Lateral Entry (B.Tech / B.E.)",
        },
      },
      clarity: {
        clarityLevel: "somewhat_clear",
        primaryHelpReason: "Deciding between direct 2nd-year B.Tech lateral entry or taking an industry technician role.",
        studentStatement: "I love hands-on mechanical work and CNC machines, but I want to understand if a B.Tech degree makes a big difference.",
      },
      interests: {
        selectedCategoryIds: ["technology", "business_entrepreneurship"],
        selectedSubInterestIds: ["tech_robotics", "biz_operations"],
        isStillExploring: false,
      },
      startingSkills: [
        {
          id: "skill_cad",
          name: "Computer-Aided Design (AutoCAD / SolidWorks)",
          category: "Mechanical Design",
          familiarity: "practised",
          evidenceStatus: "self_reported",
        },
        {
          id: "skill_manufacturing_opt",
          name: "Mechanical Root-Cause Diagnosis & Spindle Reliability",
          category: "Industrial Engineering",
          familiarity: "practised",
          evidenceStatus: "practised",
        },
      ],
      activityAttempt: {
        activityId: "act_mech_manufacturing",
        attempted: true,
        selectedOptionId: "opt_1",
        isCorrect: true,
        retriesCount: 0,
        feedback: "Superb mechanical diagnostics! Too much grease causes fluid friction churning that overheats bearings faster than under-lubrication. Pre-load alignment check is critical.",
        status: "completed",
        completedAt: "2026-10-28T13:00:00.000Z",
        isSyntheticFixture: true,
      },
      reflection: {
        enjoyedMost: "Diagnosing practical bottlenecks rather than memorizing formulas.",
        directionPreference: "explore_similar",
        immediateSupportNeeded: ["Explore lateral entry exam requirements (LEET / state CET)"],
      },
      possibilities: [
        {
          id: "poss_d1",
          title: "B.Tech Lateral Entry (Mechanical / Mechatronics)",
          type: "degree_or_pathway",
          summary: "Direct admission into the 2nd year of an accredited engineering degree, deepening design and robotics theory.",
          whySuggested: "Your 2nd year mechanical diploma prepares you directly for lateral transfer.",
          whatRemainsUnknown: "State-specific cutoff ranks and tuition trade-offs.",
          sampleNextActions: ["Review LEET syllabus topics and previous exam papers", "Compare 3 state polytechnic-to-engineering programs"],
        },
        {
          id: "poss_d2",
          title: "Industrial Automation & CNC Specialist",
          type: "applied_skill_track",
          summary: "Hands-on engineering tracks in automated assembly lines, PLC programming, and precision CNC fabrication.",
          whySuggested: "Strong demonstration in manufacturing process optimization.",
          whatRemainsUnknown: "Local industrial manufacturing hubs in your region.",
          sampleNextActions: ["Review a sample PLC ladder-logic diagram", "Check equipment requirements"],
        },
      ],
      firstNextMove: {
        id: "fnm_d1",
        title: "Review Lateral Entry Entrance Exam (LEET) Requirements & Eligibility",
        description: "Check the exact subject syllabus, reservation criteria, and university seat allocations for polytechnic lateral entry.",
        estimatedTime: "20 mins",
        actionType: "compare_pathways",
      },
      status: "confirmed",
      updatedAt: "2026-10-31T12:00:00.000Z",
    },
  },

  // ---------------------------------------------------------------------------
  // Persona E: BCA Student (Self-Reported Python)
  // ---------------------------------------------------------------------------
  persona_e_bca: {
    name: "Kavya Menon",
    shortLabel: "BCA Python Student",
    stageLabel: "Degree / Engineering",
    description: "Self-reported Python familiarity. Recorded truthfully as self-reported, not demonstrated certification.",
    profile: {
      profileId: "sip_persona_e_bca",
      academicStageId: "degree-engineering",
      academicContext: {
        type: "degree-engineering",
        data: {
          degreeProgram: "BCA",
          branchOrMajor: "Computer Applications",
          currentYear: "2nd Year",
          currentFocusAreas: ["Python Scripting", "Database Management (MySQL)", "Web Technologies"],
        },
      },
      clarity: {
        clarityLevel: "somewhat_clear",
        primaryHelpReason: "Building a portfolio to get my first software development internship.",
        studentStatement: "I know Python syntax and basic data structures, but I haven't built a real production project yet.",
      },
      interests: {
        selectedCategoryIds: ["technology", "analysis_problem_solving"],
        selectedSubInterestIds: ["tech_programming", "tech_web_apps", "ana_data_analytics"],
        isStillExploring: false,
      },
      startingSkills: [
        {
          id: "skill_python_syntax",
          name: "Python Scripting & Basic Syntax",
          category: "Programming Languages",
          familiarity: "practised",
          evidenceStatus: "self_reported", // TRUTHFUL LABEL!
        },
        {
          id: "skill_query_optimization",
          name: "Relational Query Diagnosis (N+1 Avoidance)",
          category: "Backend Data Systems",
          familiarity: "practised",
          evidenceStatus: "practised", // PRACTISED IN CHALLENGE!
        },
      ],
      activityAttempt: {
        activityId: "act_api_bottleneck",
        attempted: true,
        selectedOptionId: "opt_1",
        isCorrect: true,
        retriesCount: 0,
        feedback: "Outstanding! 501 network roundtrips create latency cascades. Replacing this with an indexed JOIN or a single batch WHERE student_id IN (...) query reduces DB roundtrips to 1 or 2.",
        status: "completed",
        completedAt: "2026-10-28T14:00:00.000Z",
        isSyntheticFixture: true,
      },
      reflection: {
        enjoyedMost: "Seeing how code efficiency impacts real server costs and performance.",
        directionPreference: "explore_similar",
        immediateSupportNeeded: ["Build a guided backend starter project for GitHub"],
      },
      possibilities: [
        {
          id: "poss_e1",
          title: "Backend Web & API Development",
          type: "applied_skill_track",
          summary: "Building REST and GraphQL services in Python (FastAPI / Django) with PostgreSQL and Redis caching.",
          whySuggested: "Your Python foundation and query optimization experience directly translate to backend engineering.",
          whatRemainsUnknown: "Your familiarity with asynchronous programming and containerization (Docker).",
          sampleNextActions: ["Build a lightweight CRUD API with FastAPI", "Integrate automated tests with Pytest"],
        },
        {
          id: "poss_e2",
          title: "Data Operations & Analytics Engineering",
          type: "applied_skill_track",
          summary: "Automating data ingestion pipelines, cleaning messy CSVs/APIs, and publishing dashboard insights.",
          whySuggested: "Combines database query skills with scripting.",
          whatRemainsUnknown: "Whether you prefer user-facing features or behind-the-scenes data pipelines.",
          sampleNextActions: ["Build an automated web scraper script that logs price data into SQLite"],
        },
      ],
      firstNextMove: {
        id: "fnm_e1",
        title: "Build a Structured 3-Tier Python Project to Verify Your Skills",
        description: "Transform your self-reported Python familiarity into demonstrated code by creating a tested, documented CLI utility.",
        estimatedTime: "30 mins",
        actionType: "try_mini_project",
      },
      status: "confirmed",
      updatedAt: "2026-10-31T12:00:00.000Z",
    },
  },

  // ---------------------------------------------------------------------------
  // Persona F: BCom Finance & Accounting Student
  // ---------------------------------------------------------------------------
  persona_f_bcom: {
    name: "Sneha Patel",
    shortLabel: "BCom Finance",
    stageLabel: "Degree / Engineering",
    description: "3rd-year BCom in Finance & Accounting. Completed Cash Flow vs Profit challenge. No forced coding.",
    profile: {
      profileId: "sip_persona_f_bcom",
      academicStageId: "degree-engineering",
      academicContext: {
        type: "degree-engineering",
        data: {
          degreeProgram: "BCom",
          branchOrMajor: "Finance & Accounting",
          currentYear: "3rd Year",
          currentFocusAreas: ["Financial Accounting", "Corporate Taxation", "Working Capital Management"],
        },
      },
      clarity: {
        clarityLevel: "somewhat_clear",
        primaryHelpReason: "Preparing for financial analyst roles and deciding on CA / CFA / MBA pathways.",
        studentStatement: "I love corporate accounting and balance sheet analysis, but I want to build financial modeling skills.",
      },
      interests: {
        selectedCategoryIds: ["business_entrepreneurship", "analysis_problem_solving"],
        selectedSubInterestIds: ["biz_finance", "ana_data_analytics"],
        isStillExploring: false,
      },
      startingSkills: [
        {
          id: "skill_accounting_basics",
          name: "Financial Accounting & Reporting Basics",
          category: "Finance Foundations",
          familiarity: "practised",
          evidenceStatus: "self_reported",
        },
        {
          id: "skill_cashflow_diagnosis",
          name: "Working Capital Analysis & Financial Acumen",
          category: "Financial Analytics",
          familiarity: "practised",
          evidenceStatus: "practised",
        },
      ],
      activityAttempt: {
        activityId: "act_commerce_case",
        attempted: true,
        selectedOptionId: "opt_1",
        isCorrect: true,
        retriesCount: 0,
        feedback: "Excellent commercial insight! Profit is an accounting construct; cash is real liquidity. High sales on credit without structured working capital terms frequently creates cash insolvency.",
        status: "completed",
        completedAt: "2026-10-28T15:00:00.000Z",
        isSyntheticFixture: true,
      },
      reflection: {
        enjoyedMost: "Connecting academic balance sheets to real startup cash flow survival.",
        directionPreference: "explore_similar",
        immediateSupportNeeded: ["Hands-on financial modeling spreadsheet exercises"],
      },
      possibilities: [
        {
          id: "poss_f1",
          title: "Corporate Financial Planning & Analysis (FP&A)",
          type: "applied_skill_track",
          summary: "Building 3-statement forecast models, tracking working capital variances, and preparing board budget reports.",
          whySuggested: "Direct synergy with your 3rd-year BCom and cash flow analysis challenge.",
          whatRemainsUnknown: "Your advanced Excel modeling speed and familiarity with Power BI / Tableau.",
          sampleNextActions: ["Build a dynamic 12-month rolling cash flow forecast template in Excel", "Review an actual quarterly earnings report"],
        },
        {
          id: "poss_f2",
          title: "Equity Research & Valuation",
          type: "applied_skill_track",
          summary: "Analyzing business models, DCF valuation, industry unit economics, and investment memos.",
          whySuggested: "Your interest in finance and analytical problem solving.",
          whatRemainsUnknown: "Whether you prefer internal corporate finance or external investment research.",
          sampleNextActions: ["Write a 2-page investment breakdown of a listed retail company"],
        },
      ],
      firstNextMove: {
        id: "fnm_f1",
        title: "Analyze a Real-World 12-Month Cash Flow Statement",
        description: "Review a sanitized company case study to calculate operating cash conversion cycles and free cash flow.",
        estimatedTime: "25 mins",
        actionType: "try_mini_project",
      },
      status: "confirmed",
      updatedAt: "2026-10-31T12:00:00.000Z",
    },
  },

  // ---------------------------------------------------------------------------
  // Persona G: Engineering Student (With Prior Project)
  // ---------------------------------------------------------------------------
  persona_g_engineering: {
    name: "Arjun Nambiar",
    shortLabel: "Engineering Senior",
    stageLabel: "Degree / Engineering",
    description: "4th-year BE Computer Science with prior self-hosted IoT project. Grounded review without false test certification.",
    profile: {
      profileId: "sip_persona_g_engineering",
      academicStageId: "degree-engineering",
      academicContext: {
        type: "degree-engineering",
        data: {
          degreeProgram: "BE / B.Tech",
          branchOrMajor: "Computer Science & Engineering",
          currentYear: "4th Year / Final",
          currentFocusAreas: ["Distributed Systems", "IoT Sensor Telemetry", "Cloud Deployment"],
        },
      },
      clarity: {
        clarityLevel: "very_clear",
        primaryHelpReason: "Preparing for product company technical interviews and strengthening architecture skills.",
        studentStatement: "I have built a working campus sensor network, but I want to benchmark its reliability and concurrency.",
      },
      interests: {
        selectedCategoryIds: ["technology"],
        selectedSubInterestIds: ["tech_programming", "tech_robotics", "tech_web_apps"],
        isStillExploring: false,
      },
      startingSkills: [
        {
          id: "skill_prior_project_iot",
          name: "Campus Environmental Sensor Mesh (Prior Project)",
          category: "Systems Engineering",
          familiarity: "created_something",
          evidenceStatus: "self_reported", // NOT certified without external rubric
        },
        {
          id: "skill_concurrency_opt",
          name: "Backend Architectural Efficiency & Database Query Optimization",
          category: "Distributed Architecture",
          familiarity: "practised",
          evidenceStatus: "practised",
        },
      ],
      activityAttempt: {
        activityId: "act_api_bottleneck",
        attempted: true,
        selectedOptionId: "opt_1",
        isCorrect: true,
        retriesCount: 0,
        feedback: "Outstanding! 501 network roundtrips create latency cascades. Replacing this with an indexed JOIN or a single batch WHERE student_id IN (...) query reduces DB roundtrips to 1 or 2.",
        status: "completed",
        completedAt: "2026-10-28T16:00:00.000Z",
        isSyntheticFixture: true,
      },
      reflection: {
        enjoyedMost: "Stress-testing concurrency limits instead of building simple UI forms.",
        directionPreference: "explore_similar",
        immediateSupportNeeded: ["System design interview guidance and benchmark metrics"],
      },
      possibilities: [
        {
          id: "poss_g1",
          title: "Site Reliability & Systems Engineering",
          type: "applied_skill_track",
          summary: "Designing fault-tolerant infrastructure, Kubernetes container orchestration, latency tracing, and telemetry pipelines.",
          whySuggested: "Direct match with your 4th-year CS focus and IoT sensor project experience.",
          whatRemainsUnknown: "Experience with cloud billing constraints and high-scale message queues (Kafka).",
          sampleNextActions: ["Run automated latency load tests on your existing sensor service using Locust or k6"],
        },
        {
          id: "poss_g2",
          title: "Embedded Software & IoT Firmware Development",
          type: "applied_skill_track",
          summary: "Writing bare-metal C/C++ on ESP32/ARM, low-power sleep modes, and MQTT device communication.",
          whySuggested: "Hands-on sensor hardware and firmware background.",
          whatRemainsUnknown: "Comfort with low-level register manipulation and memory constraints.",
          sampleNextActions: ["Implement an MQTT client with automatic reconnect exponential backoff"],
        },
      ],
      firstNextMove: {
        id: "fnm_g1",
        title: "Benchmark Your Existing Sensor Project with Latency Profiles",
        description: "Set up a structured benchmark script measuring p95 and p99 response times under simulated concurrent traffic.",
        estimatedTime: "30 mins",
        actionType: "try_mini_project",
      },
      status: "confirmed",
      updatedAt: "2026-10-31T12:00:00.000Z",
    },
  },

  // ---------------------------------------------------------------------------
  // Persona H: Final-Year Humanities Graduate
  // ---------------------------------------------------------------------------
  persona_h_grad: {
    name: "Meera Sen",
    shortLabel: "Humanities Graduate",
    stageLabel: "Final Year / Graduate",
    description: "BA in Economics & Policy. Evaluates public policy fellowships and think-tank analyst roles without tech startup assumptions.",
    profile: {
      profileId: "sip_persona_h_grad",
      academicStageId: "final-year-grad",
      academicContext: {
        type: "final-year-grad",
        data: {
          completedDegree: "BA in Economics & Political Science",
          specialization: "Development Economics & Public Policy",
          transitionStage: "Preparing for Master's / Higher Ed",
          timelinePreference: "Medium-term (3-12 months)",
        },
      },
      clarity: {
        clarityLevel: "somewhat_clear",
        primaryHelpReason: "Evaluating master's in public policy (MPP) vs think-tank research fellowships.",
        studentStatement: "I love qualitative field research and policy synthesis, and I want to work with government or developmental organizations.",
      },
      interests: {
        selectedCategoryIds: ["social_impact", "analysis_problem_solving"],
        selectedSubInterestIds: ["soc_policy_law", "ana_investigative"],
        isStillExploring: false,
      },
      startingSkills: [
        {
          id: "skill_policy_literature",
          name: "Socio-Economic Field Evidence Synthesis",
          category: "Policy Analysis",
          familiarity: "practised",
          evidenceStatus: "self_reported",
        },
        {
          id: "skill_multi_source_policy",
          name: "Empirical Evidence Synthesis & Strategic Policy Prioritization",
          category: "Governance & Ethics",
          familiarity: "practised",
          evidenceStatus: "practised",
        },
      ],
      activityAttempt: {
        activityId: "act_grad_policy_synthesis",
        attempted: true,
        selectedOptionId: "opt_1",
        isCorrect: true,
        retriesCount: 0,
        feedback: "Outstanding analytical evaluation! Rigorous human sciences and policy analysis look past technology hypes to evaluate empirical evidence of human behavioral impact.",
        status: "completed",
        completedAt: "2026-10-28T17:00:00.000Z",
        isSyntheticFixture: true,
      },
      reflection: {
        enjoyedMost: "Evaluating real stakeholder tradeoffs between fiscal cost and equity.",
        directionPreference: "explore_similar",
        immediateSupportNeeded: ["Review top policy fellowship deadlines and essay requirements"],
      },
      possibilities: [
        {
          id: "poss_h1",
          title: "Public Policy Research & Think-Tank Analyst",
          type: "applied_skill_track",
          summary: "Drafting policy briefs, synthesizing legislative data, evaluating scheme outcomes, and presenting evidence to civic leaders.",
          whySuggested: "Demonstrated analytical policy synthesis and development economics background.",
          whatRemainsUnknown: "Your familiarity with statistical econometric packages (R / Stata).",
          sampleNextActions: ["Review 3 recent policy working papers published by NITI Aayog or CPR"],
        },
        {
          id: "poss_h2",
          title: "Development Sector Project Management & Monitoring",
          type: "applied_skill_track",
          summary: "Field program monitoring, stakeholder interviews, baseline impact assessment, and grant reporting for NGOs.",
          whySuggested: "Strong alignment with social impact and governance.",
          whatRemainsUnknown: "Willingness to spend extended durations in rural field sites.",
          sampleNextActions: ["Examine an actual Monitoring & Evaluation (M&E) logframe matrix"],
        },
      ],
      firstNextMove: {
        id: "fnm_h1",
        title: "Draft a 1-Page Policy Brief on an Urban Sustainability Trade-Off",
        description: "Choose a local public issue (e.g., bus lane prioritization vs road widening) and synthesize the three key stakeholder trade-offs.",
        estimatedTime: "25 mins",
        actionType: "try_mini_project",
      },
      status: "confirmed",
      updatedAt: "2026-10-31T12:00:00.000Z",
    },
  },

  // ---------------------------------------------------------------------------
  // Persona Empty: First-Time Student (No Activities Yet)
  // ---------------------------------------------------------------------------
  persona_empty: {
    name: "Tanya Sen",
    shortLabel: "New Student (Empty)",
    stageLabel: "Classes 8–10",
    description: "First-time student who completed initial profile but has not attempted any practical activity yet.",
    profile: {
      profileId: "sip_persona_empty",
      academicStageId: "classes-8-10",
      academicContext: {
        type: "classes-8-10",
        data: {
          currentClass: "Class 10",
          subjectInterests: ["Science", "Art"],
          streamCuriosity: "Exploring all",
        },
      },
      clarity: {
        clarityLevel: "have_an_idea",
        primaryHelpReason: "I just started exploring and want to take it step by step.",
      },
      interests: {
        selectedCategoryIds: ["still_exploring"],
        selectedSubInterestIds: ["explore_general"],
        isStillExploring: true,
      },
      startingSkills: [],
      // NO ACTIVITY ATTEMPT!
      reflection: {
        enjoyedMost: "Taking the first step into my space.",
        directionPreference: "still_deciding",
        immediateSupportNeeded: ["Take a simple first discovery task"],
      },
      possibilities: [
        {
          id: "poss_emp_1",
          title: "Open Discovery & Subject Exploration",
          type: "exploration_domain",
          summary: "Sample mini-tasks from different domains to discover what feels fun and engaging in practice.",
          whySuggested: "You are beginning your exploration journey.",
          whatRemainsUnknown: "Which practical topics spark your curiosity most.",
          sampleNextActions: ["Try one low-pressure 5-minute activity"],
        },
      ],
      firstNextMove: {
        id: "fnm_emp_1",
        title: "Try Your First 5-Minute Practical Discovery Task",
        description: "Experience a quick, low-stakes micro-exploration to see how hands-on learning works on Next Move AI.",
        estimatedTime: "5 mins",
        actionType: "explore_interest",
      },
      status: "confirmed",
      updatedAt: "2026-10-31T12:00:00.000Z",
    },
  },

  // ---------------------------------------------------------------------------
  // Persona Returning BCom: Returning User With Activity History
  // ---------------------------------------------------------------------------
  persona_returning_bcom: {
    name: "Sneha Patel",
    shortLabel: "Returning Student",
    stageLabel: "Degree / Engineering",
    description: "Returning student with completed recent activity history and an in-progress next action.",
    profile: {
      profileId: "sip_persona_returning_bcom",
      academicStageId: "degree-engineering",
      academicContext: {
        type: "degree-engineering",
        data: {
          degreeProgram: "BCom",
          branchOrMajor: "Finance & Accounting",
          currentYear: "3rd Year",
          currentFocusAreas: ["Financial Accounting", "Working Capital Management"],
        },
      },
      clarity: {
        clarityLevel: "somewhat_clear",
        primaryHelpReason: "Preparing for corporate finance roles.",
      },
      interests: {
        selectedCategoryIds: ["business_entrepreneurship"],
        selectedSubInterestIds: ["biz_finance"],
        isStillExploring: false,
      },
      startingSkills: [
        {
          id: "skill_ret_1",
          name: "Financial Accounting & Reporting Basics",
          category: "Finance Foundations",
          familiarity: "practised",
          evidenceStatus: "self_reported",
        },
        {
          id: "skill_ret_2",
          name: "Working Capital Analysis & Financial Acumen",
          category: "Financial Analytics",
          familiarity: "practised",
          evidenceStatus: "practised",
        },
      ],
      activityAttempt: {
        activityId: "act_commerce_case",
        attempted: true,
        selectedOptionId: "opt_1",
        isCorrect: true,
        retriesCount: 0,
        feedback: "Excellent commercial insight! Profit is an accounting construct; cash is real liquidity. High sales on credit without structured working capital terms frequently creates cash insolvency.",
        status: "completed",
        completedAt: "2026-10-28T12:00:00.000Z",
        isSyntheticFixture: true,
      },
      reflection: {
        enjoyedMost: "Connecting academic balance sheets to real startup cash flow survival.",
        directionPreference: "explore_similar",
        immediateSupportNeeded: ["Hands-on financial modeling spreadsheet exercises"],
      },
      possibilities: [
        {
          id: "poss_ret_1",
          title: "Corporate Financial Planning & Analysis (FP&A)",
          type: "applied_skill_track",
          summary: "Building 3-statement forecast models and tracking budget variances.",
          whySuggested: "Direct synergy with your completed cash flow analysis challenge.",
          whatRemainsUnknown: "Advanced spreadsheet modeling proficiency.",
          sampleNextActions: ["Build a dynamic cash flow forecast template in Excel"],
        },
      ],
      firstNextMove: {
        id: "fnm_ret_1",
        title: "Continue: 12-Month Cash Flow Statement Modeling",
        description: "You began this action yesterday. Complete the final two sensitivity formulas to finish your model.",
        estimatedTime: "15 mins remaining",
        actionType: "try_mini_project",
      },
      status: "confirmed",
      updatedAt: "2026-10-28T12:00:00.000Z", // 3 days ago
    },
  },
};
