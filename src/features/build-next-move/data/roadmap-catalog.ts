/**
 * NEXT MOVE AI V2 — FLOW 7: ADAPTABLE ROADMAP CATALOG
 * 
 * Flexible, non-punitive roadmap tracks across all 6 academic stages.
 * 
 * Epistemic Mandate:
 * - Never force rigid countdowns or artificial pressure.
 * - Roadmaps adapt when student priorities change.
 * - Progress reflection turns steps into genuine clarity.
 */

import { type StudentRoadmap } from "../types";

export const ROADMAP_CATALOG: StudentRoadmap[] = [
  // ===========================================================================
  // 1. CLASSES 4–7: PLAYFUL CURIOSITY ROADMAP
  // ===========================================================================
  {
    id: "roadmap_c47_creative_maker",
    title: "Curiosity & Hands-on Maker Journey",
    description: "A fun, low-pressure adventure to explore drawing, outdoor nature, and building creative machines.",
    stageSuitability: ["classes-4-7"],
    targetFocus: "Creative Expression & Scientific Curiosity",
    broadObjective: "Discover what topics make you excited to learn and create without any career expectations.",
    pacing: "flexible",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isCustom: false,
    phases: [
      {
        id: "phase_c47_1",
        title: "Phase 1: Spark Curiosity",
        description: "Small, fun daily observations and creative exercises.",
        growthObjective: "Notice patterns in everyday living things and visual stories.",
        isCurrent: true,
        milestones: [
          {
            id: "ms_c47_1_1",
            title: "Nature Sketchbook Entry",
            description: "Sketch 2 plants or leaves from your neighborhood noting their colors and sun exposure.",
            category: "foundational_skill",
            estimatedHours: 2,
            isCompleted: false,
            relatedProjectId: "proj_c47_nature_atlas",
          },
          {
            id: "ms_c47_1_2",
            title: "Create a 3-Panel Mini Comic",
            description: "Draw a simple character tackling a funny obstacle.",
            category: "practical_project",
            estimatedHours: 3,
            isCompleted: false,
            relatedProjectId: "proj_c47_stopmotion_comic",
          },
        ],
      },
      {
        id: "phase_c47_2",
        title: "Phase 2: Hands-On Making",
        description: "Build something tangible with paper, cardboard, or recycled items.",
        growthObjective: "Experience the joy of turning an idea into a physical object.",
        isCurrent: false,
        milestones: [
          {
            id: "ms_c47_2_1",
            title: "Build a Recycled Cardboard Mechanism",
            description: "Assemble a simple lever or gravity ramp with paper cups and tape.",
            category: "practical_project",
            estimatedHours: 4,
            isCompleted: false,
          },
          {
            id: "ms_c47_2_2",
            title: "Show-and-Tell Reflection",
            description: "Explain how your creation works to a family member or teacher.",
            category: "reflection",
            estimatedHours: 1,
            isCompleted: false,
          },
        ],
      },
    ],
    alternativePaths: [
      {
        title: "Nature & Wildlife Explorer Track",
        description: "Shift focus toward biology, gardening, and bird-watching logs.",
        suggestedShiftReason: "If you found drawing plants more fun than building mechanical levers.",
      },
    ],
  },

  // ===========================================================================
  // 2. CLASSES 8–10: FOUNDATIONAL STREAM & SUBJECT DISCOVERY
  // ===========================================================================
  {
    id: "roadmap_c810_stream_exploration",
    title: "Secondary School Stream & Subject Discovery",
    description: "Explore real-world applications of Science, Commerce, and Arts before making Class 11 stream decisions.",
    stageSuitability: ["classes-8-10"],
    targetFocus: "Multidisciplinary Subject Awareness",
    broadObjective: "Understand how school subjects connect to real careers without feeling pressured to pick one prematurely.",
    pacing: "flexible",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isCustom: false,
    phases: [
      {
        id: "phase_c810_1",
        title: "Phase 1: Hands-On Subject Sampling",
        description: "Sample small practical activities across Science, Commerce, and Humanities.",
        growthObjective: "Discover which thinking style feels most engaging.",
        isCurrent: true,
        milestones: [
          {
            id: "ms_c810_1_1",
            title: "Small Business Break-Even Calculation",
            description: "Model ingredient costs and profit margins for a pop-up stall.",
            category: "foundational_skill",
            estimatedHours: 3,
            isCompleted: false,
            relatedProjectId: "proj_c810_pop_up_bakery_plan",
          },
          {
            id: "ms_c810_1_2",
            title: "Civic Debate or Policy Argument",
            description: "Write a 1-page structured argument on a community issue.",
            category: "practical_project",
            estimatedHours: 3,
            isCompleted: false,
          },
          {
            id: "ms_c810_1_3",
            title: "Introductory Code Logic Script",
            description: "Write a simple program in Python or Scratch that automates calculations.",
            category: "practical_project",
            estimatedHours: 4,
            isCompleted: false,
            relatedProjectId: "proj_c810_pocket_budget_app",
          },
        ],
      },
      {
        id: "phase_c810_2",
        title: "Phase 2: Stream Comparison & Mentorship",
        description: "Compare senior secondary stream combinations (Science PCM/PCB, Commerce, Humanities).",
        growthObjective: "Clarify prerequisites and dispel common myths about stream limitations.",
        isCurrent: false,
        milestones: [
          {
            id: "ms_c810_2_1",
            title: "Investigate Class 11 Subject Options in Flow 5",
            description: "Explore pathway options and entrance timelines across all 3 streams.",
            category: "educational_route",
            estimatedHours: 2,
            isCompleted: false,
          },
          {
            id: "ms_c810_2_2",
            title: "Self-Reflection on Engagement vs Pressure",
            description: "Record which topics you enjoy studying versus what others expect of you.",
            category: "reflection",
            estimatedHours: 1,
            isCompleted: false,
          },
        ],
      },
    ],
    alternativePaths: [
      {
        title: "Polytechnic Applied Diploma Track",
        description: "Explore hands-on technical diplomas right after Class 10.",
        suggestedShiftReason: "If you prefer practical machinery and labs over 2 years of purely theoretical board exams.",
      },
    ],
  },

  // ===========================================================================
  // 3. CLASSES 11–12: SENIOR SECONDARY & HIGHER EDUCATION PREPARATION
  // ===========================================================================
  {
    id: "roadmap_c1112_higher_ed_readiness",
    title: "Senior Secondary Exploration & Higher Education Readiness",
    description: "Balance board exam foundations with real-world skills and transparent degree exploration.",
    stageSuitability: ["classes-11-12"],
    targetFocus: "Degree Routes, Practical Projects & Entrance Reality",
    broadObjective: "Build demonstrable project work and understand realistic admission routes across multiple universities.",
    pacing: "flexible",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isCustom: false,
    phases: [
      {
        id: "phase_c1112_1",
        title: "Phase 1: Practical Problem Solving",
        description: "Apply your stream concepts to realistic mini-projects beyond textbook definitions.",
        growthObjective: "Differentiate rote memorization from genuine interest in the discipline.",
        isCurrent: true,
        milestones: [
          {
            id: "ms_c1112_1_1",
            title: "Stream-Aligned Starter Project",
            description: "Complete a working capital model, coding visualizer, or design prototype.",
            category: "practical_project",
            estimatedHours: 8,
            isCompleted: false,
            relatedProjectId: "proj_c1112_working_capital_model",
          },
          {
            id: "ms_c1112_1_2",
            title: "Experiential Trial in Flow 6",
            description: "Test an interactive real-world trial to practice diagnostic decision-making.",
            category: "foundational_skill",
            estimatedHours: 1,
            isCompleted: false,
            relatedTrialId: "trial_c1112_algo_efficiency",
          },
        ],
      },
      {
        id: "phase_c1112_2",
        title: "Phase 2: Collegiate Pathways & Alternate Backups",
        description: "Research 3 primary degree options and at least 2 high-quality alternate backup routes.",
        growthObjective: "Avoid high-stakes panic by establishing multiple viable educational trajectories.",
        isCurrent: false,
        milestones: [
          {
            id: "ms_c1112_2_1",
            title: "Compare 3 Degree Pathways in Flow 5 Explore",
            description: "Review entrance exam cutoffs, fee structures, and typical daily campus routines.",
            category: "educational_route",
            estimatedHours: 3,
            isCompleted: false,
          },
          {
            id: "ms_c1112_2_2",
            title: "Draft First Personal Statement or Portfolio Outline",
            description: "Synthesize why your chosen direction appeals to you with concrete project evidence.",
            category: "reflection",
            estimatedHours: 2,
            isCompleted: false,
          },
        ],
      },
    ],
    alternativePaths: [
      {
        title: "Multidisciplinary Liberal Arts & Design Track",
        description: "Combine analytical thinking with creative design, psychology, or communications.",
        suggestedShiftReason: "If you want to keep options open across technology and humanities.",
      },
    ],
  },

  // ===========================================================================
  // 4. DIPLOMA: APPLIED CAPABILITY & LATERAL ENTRY ROADMAP
  // ===========================================================================
  {
    id: "roadmap_dip_applied_automation",
    title: "Applied Mechatronics & Lateral Engineering Track",
    description: "Strengthen hands-on troubleshooting and prepare for certified apprenticeships or lateral B.Tech entry.",
    stageSuitability: ["diploma"],
    targetFocus: "Industrial Automation & Lateral Entry Options",
    broadObjective: "Bridge vocational diploma coursework into demonstrable technical portfolios and higher engineering routes.",
    pacing: "flexible",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isCustom: false,
    phases: [
      {
        id: "phase_dip_1",
        title: "Phase 1: Industrial Systems Mastery",
        description: "Deepen PLC ladder logic, sensory instrumentation, and preventative safety diagnostics.",
        growthObjective: "Build verified troubleshooting reflexes under simulated plant conditions.",
        isCurrent: true,
        milestones: [
          {
            id: "ms_dip_1_1",
            title: "Complete Conveyor Safety Circuit Schematic",
            description: "Design ladder rungs and NC emergency stop circuits for an automated sorting line.",
            category: "practical_project",
            estimatedHours: 10,
            isCompleted: false,
            relatedProjectId: "proj_dip_plc_conveyor_audit",
          },
          {
            id: "ms_dip_1_2",
            title: "Simulated Multimeter & Sensor Triage in Flow 6",
            description: "Diagnose conveyor interlock failure using virtual instrument telemetry.",
            category: "foundational_skill",
            estimatedHours: 1,
            isCompleted: false,
            relatedTrialId: "trial_dip_plc_ladder",
          },
        ],
      },
      {
        id: "phase_dip_2",
        title: "Phase 2: Lateral Entry & Apprenticeship Strategy",
        description: "Explore State Lateral Entry Engineering Tests (LEET) and National Apprenticeship Promotion Scheme (NAPS).",
        growthObjective: "Establish dual-track readiness: industry job placement or direct 2nd-year B.Tech admission.",
        isCurrent: false,
        milestones: [
          {
            id: "ms_dip_2_1",
            title: "Review Lateral B.Tech Prerequisites in Flow 5",
            description: "Verify university eligibility guidelines and branch conversion policies.",
            category: "educational_route",
            estimatedHours: 3,
            isCompleted: false,
          },
        ],
      },
    ],
    alternativePaths: [
      {
        title: "Automated Supply Chain & Logistics Track",
        description: "Focus on warehouse robotics, IoT freight tracking, and distribution management.",
        suggestedShiftReason: "If you enjoy operations coordination and fleet telemetry over pure circuit design.",
      },
    ],
  },

  // ===========================================================================
  // 5. DEGREE / ENGINEERING: PORTFOLIO & CAPABILITY DEVELOPMENT
  // ===========================================================================
  {
    id: "roadmap_deg_engineering_portfolio",
    title: "Software Systems Engineering & Portfolio Roadmap",
    description: "Transform academic computer science coursework into production-grade distributed projects and internship readiness.",
    stageSuitability: ["degree-engineering"],
    targetFocus: "Distributed Systems & Technical Portfolio",
    broadObjective: "Construct 2 deep architectural projects, master system design principles, and vet internship environments.",
    pacing: "flexible",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isCustom: false,
    phases: [
      {
        id: "phase_deg_1",
        title: "Phase 1: Deep Architectural Project",
        description: "Build a non-trivial distributed systems application with clear trade-off documentation.",
        growthObjective: "Move beyond boilerplate tutorial clones to genuine systems thinking.",
        isCurrent: true,
        milestones: [
          {
            id: "ms_deg_1_1",
            title: "Build Distributed Key-Value Store",
            description: "Implement consistent hashing, virtual nodes, and LRU eviction in Go or Node.js.",
            category: "practical_project",
            estimatedHours: 18,
            isCompleted: false,
            relatedProjectId: "proj_deg_distributed_cache",
          },
          {
            id: "ms_deg_1_2",
            title: "System Design Trade-off Simulation in Flow 6",
            description: "Complete Database Partitioning vs Read Replication analysis.",
            category: "foundational_skill",
            estimatedHours: 1,
            isCompleted: false,
            relatedTrialId: "trial_deg_db_partition",
          },
        ],
      },
      {
        id: "phase_deg_2",
        title: "Phase 2: Internship & Technical Communication",
        description: "Format public GitHub repository with architecture diagrams and explore curated internships.",
        growthObjective: "Articulate engineering trade-offs clearly in technical interviews.",
        isCurrent: false,
        milestones: [
          {
            id: "ms_deg_2_1",
            title: "Write Architecture Design Document (README)",
            description: "Explain why specific data structures and caching eviction strategies were chosen.",
            category: "reflection",
            estimatedHours: 4,
            isCompleted: false,
          },
          {
            id: "ms_deg_2_2",
            title: "Review Curated Technical Internships in Flow 7",
            description: "Evaluate verified listings and understand realistic engineering prerequisites.",
            category: "educational_route",
            estimatedHours: 2,
            isCompleted: false,
          },
        ],
      },
    ],
    alternativePaths: [
      {
        title: "Product Management & UX Architecture Track",
        description: "Pivot toward user research, technical specifications, and cross-functional product delivery.",
        suggestedShiftReason: "If you enjoy customer problem discovery more than low-level memory concurrency.",
      },
    ],
  },

  // ===========================================================================
  // 6. FINAL-YEAR / GRADUATES: EMPLOYMENT & POST-GRADUATE STRATEGY
  // ===========================================================================
  {
    id: "roadmap_grad_career_launch",
    title: "Post-Graduate Career Launch & Fellowship Roadmap",
    description: "Align your degree background with public policy fellowships, research labs, or venture opportunities.",
    stageSuitability: ["final-year-grad"],
    targetFocus: "Fellowships, Employment & Practical Evidence",
    broadObjective: "Bridge graduate studies into verified workplace readiness, paid fellowships, or entrepreneurial launches.",
    pacing: "flexible",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isCustom: false,
    phases: [
      {
        id: "phase_grad_1",
        title: "Phase 1: Domain Evidence Synthesis",
        description: "Produce a high-leverage analytical portfolio artifact (policy memo, unit economics audit, or research paper).",
        growthObjective: "Demonstrate professional analytical maturity beyond standardized GPA scores.",
        isCurrent: true,
        milestones: [
          {
            id: "ms_grad_1_1",
            title: "Write Policy Memo or Venture Analytics Suite",
            description: "Complete a 5-page structured policy analysis or SaaS unit economics audit.",
            category: "practical_project",
            estimatedHours: 15,
            isCompleted: false,
            relatedProjectId: "proj_grad_saas_metrics_dashboard",
          },
          {
            id: "ms_grad_1_2",
            title: "Complete Flow 6 Microgrid Policy Trial",
            description: "Analyze renewable energy subsidy trade-offs under real-world municipal constraints.",
            category: "foundational_skill",
            estimatedHours: 1,
            isCompleted: false,
            relatedTrialId: "trial_grad_microgrid_policy",
          },
        ],
      },
      {
        id: "phase_grad_2",
        title: "Phase 2: Fellowship Applications & Network",
        description: "Shortlist 3 verified fellowship programs or graduate assistantships and prepare writing samples.",
        growthObjective: "Establish tangible, paid, high-impact post-graduate launch options.",
        isCurrent: false,
        milestones: [
          {
            id: "ms_grad_2_1",
            title: "Audit Fellowship Requirements in Flow 7 Opportunities",
            description: "Check verified eligibility dates, stipend details, and selection criteria.",
            category: "educational_route",
            estimatedHours: 3,
            isCompleted: false,
          },
        ],
      },
    ],
    alternativePaths: [
      {
        title: "Bootstrapped Venture & Consulting Track",
        description: "Direct your skills toward independent client advisory or early-stage startup building.",
        suggestedShiftReason: "If institutional fellowships feel too bureaucratic and you crave direct market feedback.",
      },
    ],
  },
];

