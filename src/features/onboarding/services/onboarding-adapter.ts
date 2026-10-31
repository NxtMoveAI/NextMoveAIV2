/**
 * NEXT MOVE AI V2 — FLOW 3 ONBOARDING SERVICE & ADAPTER
 * 
 * Typed frontend adapter simulating Havyas's backend endpoints.
 * Provides transparent demo simulation without credential leaks or fake persistence.
 * 
 * Accurately synthesizes student interests, academic context, and stage into
 * grounded Student Intelligence profiles with honest epistemic disclosures.
 */

import { type AcademicStageId } from "@/data/landing-demo";
import {
  type OnboardingState,
  type StudentIntelligenceProfile,
  type ActivityAttemptResult,
  type StartingPossibility,
  type FirstNextMoveAction,
  type AcademicContextData,
} from "../schemas/types";
import { createInitialOnboardingState } from "../data/questions";

import { studentProfileStore } from "@/features/student-home/services/profile-store";

// =============================================================================
// 1. RECOMMENDATION GENERATOR (HEURISTIC FIXTURE ENGINE)
// Generates curated exploration ideas with explicit "What Remains Unknown"
// =============================================================================

export function generateCuratedPossibilities(
  stageId: AcademicStageId,
  selectedCategoryIds: string[] = [],
  academicContext?: AcademicContextData
): StartingPossibility[] {
  const isBusiness =
    selectedCategoryIds.includes("business_entrepreneurship") ||
    (academicContext?.type === "degree-engineering" &&
      (academicContext.data.degreeProgram === "BCom" ||
        academicContext.data.degreeProgram === "BBA" ||
        academicContext.data.branchOrMajor === "Finance & Accounting" ||
        academicContext.data.branchOrMajor === "Marketing & Management" ||
        academicContext.data.branchOrMajor === "Economics & Analytics")) ||
    (academicContext?.type === "classes-11-12" &&
      academicContext.data.stream === "Commerce");

  const isCreative =
    selectedCategoryIds.includes("creativity") ||
    (academicContext?.type === "classes-4-7" &&
      academicContext.data.favoriteSchoolActivities.includes("Drawing & Art"));

  const isHumanitiesOrPolicy =
    selectedCategoryIds.includes("social_impact") ||
    (academicContext?.type === "final-year-grad" &&
      (academicContext.data.completedDegree.includes("Humanities") ||
        academicContext.data.completedDegree.includes("Arts") ||
        academicContext.data.completedDegree.includes("Commerce") ||
        academicContext.data.completedDegree.includes("B.Com") ||
        academicContext.data.specialization.includes("Economics") ||
        academicContext.data.specialization.includes("Literature")));

  const isDiplomaMechanical =
    academicContext?.type === "diploma" &&
    (academicContext.data.branch.includes("Mechanical") ||
      academicContext.data.branch.includes("Automobile"));

  const isBCAorPython =
    (academicContext?.type === "degree-engineering" &&
      academicContext.data.degreeProgram === "BCA") ||
    selectedCategoryIds.includes("technology");

  const isStillExploring =
    selectedCategoryIds.includes("still_exploring") ||
    selectedCategoryIds.length === 0;

  switch (stageId) {
    // -------------------------------------------------------------------------
    // 1. Classes 4-7
    // -------------------------------------------------------------------------
    case "classes-4-7":
      if (isCreative) {
        return [
          {
            id: "poss_young_creative_art",
            title: "Visual Storyteller & Creative Maker",
            type: "exploration_domain",
            summary: "Combining character drawing, comic storyboarding, and hands-on crafts to create illustrated stories.",
            whySuggested: "You expressed excitement about drawing, stories, and creating visual worlds.",
            whatRemainsUnknown: "Whether you enjoy illustrating characters, writing storylines, or making paper crafts most.",
            sampleNextActions: ["Sketch a 3-scene story comic with colored markers on paper", "Create a handmade paper character mask"],
          },
          {
            id: "poss_young_nature_science",
            title: "Junior Nature & Environmental Explorer",
            type: "exploration_domain",
            summary: "Exploring plants, wildlife habits, evening stars, and hands-on natural science puzzles.",
            whySuggested: "You enjoy observing nature and exploring how living ecosystems thrive.",
            whatRemainsUnknown: "Which specific area of science (animals, plants, or space) excites your curiosity most.",
            sampleNextActions: ["Keep a 3-day outdoor leaf and insect discovery sketchpad", "Track evening moon phases for a week"],
          },
        ];
      }
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

    // -------------------------------------------------------------------------
    // 2. Classes 8-10
    // -------------------------------------------------------------------------
    case "classes-8-10":
      if (isStillExploring) {
        return [
          {
            id: "poss_mid_stream_explore",
            title: "Multidisciplinary Stream Exploration (Science, Commerce, Arts)",
            type: "degree_or_pathway",
            summary: "Comparing 11th-grade subjects side-by-side to understand prerequisites without premature specialization.",
            whySuggested: "You are currently exploring broadly across multiple areas of interest.",
            whatRemainsUnknown: "Your sustainable study stamina across theoretical math vs empirical reading vs commercial subjects.",
            sampleNextActions: ["Compare Science vs Commerce curriculum syllabi side-by-side", "Interview a 12th-grade senior about day-to-day study"],
          },
          {
            id: "poss_mid_practical_sampling",
            title: "Hands-On Practical Trial Sampling",
            type: "applied_skill_track",
            summary: "Sampling short 20-minute tasks across design, introductory coding, business ideas, and science lab experiments.",
            whySuggested: "Taking small practical trials reveals what energizes you faster than abstract career surveys.",
            whatRemainsUnknown: "Which practical problem-solving style feels most natural in real execution.",
            sampleNextActions: ["Complete a 15-minute design trial in Figma", "Write a simple 10-line calculation in Python"],
          },
        ];
      }
      if (isBusiness) {
        return [
          {
            id: "poss_mid_commerce_startup",
            title: "Young Entrepreneur & Commercial Foundations",
            type: "exploration_domain",
            summary: "Exploring how products are created, customer pricing, unit economics, and digital business operations.",
            whySuggested: "You indicated interest in business, marketing, or commercial decision-making.",
            whatRemainsUnknown: "Whether you lean toward financial accounting, marketing strategy, or starting a venture.",
            sampleNextActions: ["Draft a 1-page business canvas for a campus service", "Review 11th Commerce syllabus modules"],
          },
          {
            id: "poss_mid_data_economics",
            title: "Applied Economics & Quantitative Analysis",
            type: "applied_skill_track",
            summary: "Using spreadsheets, graphs, and market data to understand how cities and consumer economies function.",
            whySuggested: "Strong connection between analytical logic and real-world business systems.",
            whatRemainsUnknown: "Your interest in higher mathematics vs organizational management.",
            sampleNextActions: ["Plot consumer price trends in Google Sheets", "Study how currency exchange rates fluctuate"],
          },
        ];
      }
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

    // -------------------------------------------------------------------------
    // 3. Classes 11-12
    // -------------------------------------------------------------------------
    case "classes-11-12":
      if (isBusiness) {
        return [
          {
            id: "poss_high_commerce_finance",
            title: "Corporate Finance, Accounting & Analytics (B.Com / BBA + Professional Credentials)",
            type: "degree_or_pathway",
            summary: "Evaluating traditional commerce degrees with modern corporate analytics, financial modeling, and CFA/CA foundation routes.",
            whySuggested: "You are studying or exploring Commerce and financial decision-making.",
            whatRemainsUnknown: "Whether you want to pursue professional auditing (CA/CPA), corporate finance, or investment management.",
            sampleNextActions: ["Analyze an audited company annual report in Google Sheets", "Compare B.Com vs BBA curriculum modules"],
          },
          {
            id: "poss_high_business_mgmt",
            title: "Strategic Management, Marketing & Entrepreneurship",
            type: "applied_skill_track",
            summary: "Developing leadership, consumer psychology, brand strategy, and venture creation capabilities.",
            whySuggested: "High interest in strategic operations and building commercial products.",
            whatRemainsUnknown: "Your preference between immediate corporate roles and integrated IPM / MBA programs.",
            sampleNextActions: ["Conduct a competitive pricing analysis of 3 retail brands", "Explore IIM IPM entrance structures"],
          },
        ];
      }
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

    // -------------------------------------------------------------------------
    // 4. Diploma
    // -------------------------------------------------------------------------
    case "diploma":
      if (isDiplomaMechanical) {
        return [
          {
            id: "poss_dip_mech_lateral",
            title: "Lateral-Entry B.Tech in Mechanical / Mechatronics Engineering",
            type: "degree_or_pathway",
            summary: "Leveraging polytechnic CAD and machine workshop credits to enter 2nd year B.Tech, advancing thermodynamics and engineering math.",
            whySuggested: "Directly bridges your hands-on mechanical diploma workshop practice with an engineering degree.",
            whatRemainsUnknown: "Target state LEET/ECET entrance cutoffs and college fee structures.",
            sampleNextActions: ["Review regional lateral entry syllabus for engineering colleges", "Practice core engineering mathematics"],
          },
          {
            id: "poss_dip_precision_manufacturing",
            title: "Precision Manufacturing, CAD/CAM & Automation Specialist",
            type: "applied_skill_track",
            summary: "Targeting high-demand industry roles in CNC programming, 3D modeling, robotics maintenance, and quality metrology.",
            whySuggested: "Industry values practical technicians who can operate real production machinery.",
            whatRemainsUnknown: "Whether your preferred track is industrial field automation or design consulting.",
            sampleNextActions: ["Complete an advanced 3D CAD modeling tutorial in SolidWorks", "Draft a technical machining project resume"],
          },
        ];
      }
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

    // -------------------------------------------------------------------------
    // 5. Degree / Engineering
    // -------------------------------------------------------------------------
    case "degree-engineering":
      if (isBusiness) {
        return [
          {
            id: "poss_deg_fin_analytics",
            title: "Financial Analytics, Modeling & Investment Strategy",
            type: "applied_skill_track",
            summary: "Building robust financial models, valuation analyses, corporate cash flow forecasts, and risk assessments.",
            whySuggested: "Directly matches your commercial and accounting context in B.Com/BBA studies.",
            whatRemainsUnknown: "Your familiarity with financial statement modeling in Excel vs SQL-based data analytics.",
            sampleNextActions: ["Build a discounted cash flow (DCF) model for a public listed firm in Google Sheets", "Study CFA Level 1 curriculum topics"],
          },
          {
            id: "poss_deg_biz_consulting",
            title: "Corporate Management Consulting & Operations Strategy",
            type: "degree_or_pathway",
            summary: "Evaluating operational bottlenecks, supply chain efficiencies, and strategic market expansion.",
            whySuggested: "Aligns with your interest in high-level business strategy and organizational execution.",
            whatRemainsUnknown: "Your preference for strategic case problem solving vs quantitative corporate finance.",
            sampleNextActions: ["Analyze a Harvard Business Review case study breakdown", "Practice structured consulting market-sizing calculations"],
          },
          {
            id: "poss_deg_fintech_analytics",
            title: "FinTech & Product Analytics",
            type: "exploration_domain",
            summary: "Bridging financial services, digital payment architectures, and quantitative user behavior analytics.",
            whySuggested: "High-growth domain combining business fundamentals with modern data tooling.",
            whatRemainsUnknown: "Your interest in learning SQL and business intelligence dashboards (PowerBI/Tableau).",
            sampleNextActions: ["Explore public RBI digital payments data reports", "Learn basic SQL queries for business transactions"],
          },
        ];
      }

      if (isBCAorPython) {
        return [
          {
            id: "poss_deg_software_python",
            title: "Applied Software Engineering & Python Application Development",
            type: "applied_skill_track",
            summary: "Building modular Python web services, backend APIs, data parsers, and public portfolio applications.",
            whySuggested: "Directly builds on your self-reported Python familiarity and computer applications coursework.",
            whatRemainsUnknown: "Your experience with database indexing, REST API design, and automated unit testing.",
            sampleNextActions: ["Build a Python script that parses real JSON data and saves to SQLite", "Deploy a simple Flask/FastAPI service on Render"],
          },
          {
            id: "poss_deg_cloud_systems",
            title: "Modern Web & Cloud Systems Architecture",
            type: "applied_skill_track",
            summary: "Developing scalable distributed web applications, containerized services, and resilient data pipelines.",
            whySuggested: "Fastest pathway to verifiable industry readiness with a demonstrable GitHub repository.",
            whatRemainsUnknown: "Your familiarity with asynchronous concurrency, database indexing, and CI/CD pipelines.",
            sampleNextActions: ["Deploy a full-stack CRUD application with Postgres and Next.js", "Solve 10 medium algorithmic problems"],
          },
          {
            id: "poss_deg_data_science",
            title: "Applied Data Science & Machine Learning Tooling",
            type: "exploration_domain",
            summary: "Leveraging Python libraries (Pandas, Scikit-Learn) and LLM APIs to build data intelligence tools.",
            whySuggested: "Natural progression from Python foundations into high-leverage data analytics.",
            whatRemainsUnknown: "Your depth in linear algebra, multivariable calculus, and probability.",
            sampleNextActions: ["Clean and analyze a Kaggle dataset in a Jupyter notebook", "Evaluate prompt pipelines with LangChain"],
          },
        ];
      }

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

    // -------------------------------------------------------------------------
    // 6. Final Year / Graduate
    // -------------------------------------------------------------------------
    case "final-year-grad":
    default:
      if (isHumanitiesOrPolicy || isBusiness) {
        return [
          {
            id: "poss_grad_policy_analyst",
            title: "Strategic Corporate & Analytical Roles (Policy / Research / Consulting)",
            type: "applied_skill_track",
            summary: "Applying rigorous qualitative and quantitative evidence synthesis to organizational decision-making and public policy.",
            whySuggested: "Leverages your humanities/commerce analytical training without forcing startup or software stereotypes.",
            whatRemainsUnknown: "Target sector preference (public policy, corporate research, non-profit, or management consulting).",
            sampleNextActions: ["Audit 2 flagship academic papers or reports into 1-page executive briefs", "Review fellowship application criteria"],
          },
          {
            id: "poss_grad_advanced_degree",
            title: "Focused Master's Degree (MBA, M.Com, MA, or Public Policy)",
            type: "degree_or_pathway",
            summary: "Evaluating specialized postgraduate study vs immediate industry experience across competitive admissions (CAT/GMAT/UGC-NET).",
            whySuggested: "Provides structured criteria to compare entrance preparation timelines against working experience.",
            whatRemainsUnknown: "Financial budget, scholarship availability, and target university cutoffs.",
            sampleNextActions: ["Take a diagnostic test for target entrance exam", "Compare career trajectory of 2 years work experience vs immediate Master's"],
          },
          {
            id: "poss_grad_civic_fellowship",
            title: "Public Sector Fellowships & Civic Leadership",
            type: "exploration_domain",
            summary: "Participating in structured national fellowships (e.g. Teach for India, Gandhi Fellowship, Young India Fellowship) to build leadership.",
            whySuggested: "Offers intensive experiential learning and nationwide peer networks for proactive graduates.",
            whatRemainsUnknown: "Comfort with grassroots field immersion vs desk-based analytical policy.",
            sampleNextActions: ["Review fellowship application deadlines and alumni profiles", "Draft an experiential leadership statement"],
          },
        ];
      }

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
  possibilities: StartingPossibility[],
  selectedCategoryIds: string[] = [],
  academicContext?: AcademicContextData
): FirstNextMoveAction {
  const topPossibility = possibilities[0];

  const isBusiness =
    selectedCategoryIds.includes("business_entrepreneurship") ||
    (academicContext?.type === "degree-engineering" &&
      (academicContext.data.degreeProgram === "BCom" ||
        academicContext.data.degreeProgram === "BBA"));

  const isHumanities =
    selectedCategoryIds.includes("social_impact") ||
    (academicContext?.type === "final-year-grad" &&
      (academicContext.data.completedDegree.includes("Humanities") ||
        academicContext.data.completedDegree.includes("Arts") ||
        academicContext.data.completedDegree.includes("Commerce")));

  const isDiplomaMech =
    academicContext?.type === "diploma" &&
    (academicContext.data.branch.includes("Mechanical") ||
      academicContext.data.branch.includes("Automobile"));

  const isBCA =
    academicContext?.type === "degree-engineering" &&
    academicContext.data.degreeProgram === "BCA";

  switch (stageId) {
    case "classes-4-7":
      return {
        id: "fnm_younger_starter",
        title: `Try a playful exploration: ${topPossibility.sampleNextActions[0]}`,
        description: "Spend 20 quiet minutes exploring this fun activity without any pressure to grade yourself.",
        estimatedTime: "20 mins",
        actionType: "try_mini_project",
      };

    case "classes-8-10":
      return {
        id: "fnm_mid_pathway_scout",
        title: topPossibility.sampleNextActions[0],
        description: "Compare realistic subject requirements so you feel confident about stream options.",
        estimatedTime: "20 mins",
        actionType: "compare_pathways",
      };

    case "classes-11-12":
      if (isBusiness) {
        return {
          id: "fnm_high_commerce_starter",
          title: "Download a public company annual report and calculate gross margin",
          description: "Inspect how real corporate financial statements report revenue, cost of goods, and operating cash flow.",
          estimatedTime: "25 mins",
          actionType: "try_mini_project",
        };
      }
      return {
        id: "fnm_high_pathway_audit",
        title: `Compare the ${topPossibility.title} pathway against alternatives`,
        description: topPossibility.sampleNextActions[0] || "Audit prerequisites and entrance timelines.",
        estimatedTime: "25 mins",
        actionType: "compare_pathways",
      };

    case "diploma":
      if (isDiplomaMech) {
        return {
          id: "fnm_dip_mech_starter",
          title: "Review lateral-entry engineering mathematics cutoffs & CAD tutorials",
          description: "Check the LEET/ECET mathematics requirements and explore 3D modeling workflows.",
          estimatedTime: "25 mins",
          actionType: "review_curriculum",
        };
      }
      return {
        id: "fnm_dip_audit_prerequisites",
        title: topPossibility.sampleNextActions[0] || "Review lateral-entry engineering requirements",
        description: "Check regional engineering college cutoff lists and key lateral exam dates.",
        estimatedTime: "25 mins",
        actionType: "review_curriculum",
      };

    case "degree-engineering":
      if (isBusiness) {
        return {
          id: "fnm_deg_fin_statement_action",
          title: "Analyze a public company quarterly financial statement in Google Sheets",
          description: "Download an annual report (e.g. Infosys or Tata Consumer) and calculate gross margin and operating cash flow.",
          estimatedTime: "25 mins",
          actionType: "try_mini_project",
        };
      }

      if (isBCA) {
        return {
          id: "fnm_deg_python_automation_action",
          title: "Build a Python script that automates a real-world task",
          description: "Write a script that parses a CSV file or automates a web request using requests and pandas.",
          estimatedTime: "30 mins",
          actionType: "try_mini_project",
        };
      }

      return {
        id: "fnm_deg_build_portfolio_action",
        title: `Explore the ${topPossibility.title} pathway`,
        description: topPossibility.sampleNextActions[0] || "Review the recommended first project guide.",
        estimatedTime: "30 mins",
        actionType: "try_mini_project",
      };

    case "final-year-grad":
    default:
      if (isHumanities) {
        return {
          id: "fnm_grad_humanities_synthesis",
          title: "Audit your writing, research, and analysis portfolio for transition readiness",
          description: "Synthesize 2 flagship papers or analytical reports into a concise 1-page professional brief.",
          estimatedTime: "25 mins",
          actionType: "review_curriculum",
        };
      }

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
    state.interests.selectedCategoryIds,
    state.academicContext
  );

  const firstNextMove = generateFirstNextMove(
    state.stageId,
    possibilities,
    state.interests.selectedCategoryIds,
    state.academicContext
  );

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
    studentProfileStore.setConfirmedProfile(profile);
    await new Promise((r) => setTimeout(r, 120));
    return {
      success: true,
      confirmationId: `conf_${Date.now().toString(36)}`,
      nextHandoff: "/dashboard/student?preview=true&flow=flow4_handoff",
    };
  },
};
