/**
 * NEXT MOVE AI V2 — FLOW 3 INTERACTIVE MICRO-EXPLORATIONS
 * 
 * Stage- and interest-aware interactive mini-challenges with genuine options,
 * immediate feedback, retry capability, and non-punitive skip.
 * 
 * Supports diverse academic pathways (Engineering, BCA, Commerce/BCom, Humanities,
 * Diploma Mechanical/Electrical, Middle School Playful Discovery, High School Streams).
 */

import { type AcademicStageId } from "@/data/landing-demo";
import { type MicroActivity, type AcademicContextData } from "../schemas/types";

// =============================================================================
// COMPLETE DIVERSE ACTIVITIES CATALOG
// =============================================================================

export const MICRO_ACTIVITIES_CATALOG: MicroActivity[] = [
  // ---------------------------------------------------------------------------
  // 1. Classes 4-7: STEM / Space / Logic
  // ---------------------------------------------------------------------------
  {
    id: "act_rover_sequence",
    stageId: "classes-4-7",
    type: "pattern_sequence",
    title: "The Solar Explorer Rover Challenge",
    subtitle: "Help a robotic rover plan its sunny afternoon mission on an alien planet!",
    estimatedMinutes: 3,
    scenario:
      "A friendly explorer rover called Sparky is on a rocky plateau. Sparky has 3 important tasks: collect solar power, photograph a glowing crystal cave, and beam the pictures back to the research station before the twin moons rise. In what order should Sparky act to succeed safely?",
    options: [
      {
        id: "opt_1",
        label: "1. Charge solar batteries in sunlight -> 2. Photograph glowing crystals -> 3. Transmit images to station",
        isCorrect: true,
        feedback:
          "Brilliant thinking! Charging first gives Sparky plenty of power to navigate the crystal cave and radio the images back safely.",
      },
      {
        id: "opt_2",
        label: "1. Transmit images before taking them -> 2. Charge batteries -> 3. Enter the dark cave",
        isCorrect: false,
        feedback:
          "Sparky can't send photos before taking them! Sequence matters when planning robotic missions.",
      },
      {
        id: "opt_3",
        label: "1. Enter the dark cave with low battery -> 2. Take photos -> 3. Wait for the sun inside the cave",
        isCorrect: false,
        feedback:
          "Be careful! If Sparky runs out of power inside a dark cave, there is no sunlight to recharge.",
      },
    ],
    explanation:
      "Logical sequencing is the foundation of computer science, storytelling, and engineering: prepare your energy, perform the main action, and share the results.",
    demonstratedCompetency: "Sequential Reasoning & Resource Planning",
  },

  // ---------------------------------------------------------------------------
  // 2. Classes 4-7: Creativity / Art / Storytelling
  // ---------------------------------------------------------------------------
  {
    id: "act_story_pacing",
    stageId: "classes-4-7",
    type: "pattern_sequence",
    title: "The Illustrated Adventure Storyboard",
    subtitle: "Choose the opening hook and scene sequence for an illustrated character story.",
    estimatedMinutes: 3,
    scenario:
      "You are creating a 3-panel illustrated story about a lost baby owl who wants to find her treehouse before sunrise. To make the story exciting and heartwarming for readers, which sequence creates the strongest story arc?",
    options: [
      {
        id: "opt_1",
        label: "1. The Hook (Baby owl wakes up alone at dusk in a hollow tree) -> 2. The Climax (Follows fireflies through a foggy river) -> 3. The Heartfelt Resolution (Arrives at the glowing window where family waits)",
        isCorrect: true,
        feedback:
          "Wonderful storytelling! Starting with the challenge, building mystery in the middle, and resolving warmly keeps readers captivated.",
      },
      {
        id: "opt_2",
        label: "1. Resolution first (Eating dinner with family) -> 2. Flying around with no goal -> 3. The baby owl sleeps alone",
        isCorrect: false,
        feedback:
          "If the happy ending happens first, readers lose interest because there's no adventure or mystery left to solve!",
      },
      {
        id: "opt_3",
        label: "1. Reading an encyclopedia page about owls -> 2. The owl sits completely still on a branch for hours -> 3. The end",
        isCorrect: false,
        feedback:
          "Factual descriptions are great for biology, but narrative stories need action, emotion, and character movement.",
      },
    ],
    explanation:
      "Storytelling and creative design rely on pacing: introduce a relatable hero, present a clear obstacle, and deliver a satisfying conclusion.",
    demonstratedCompetency: "Narrative Arc & Visual Storyboarding",
  },

  // ---------------------------------------------------------------------------
  // 3. Classes 8-10: Systems & Logic
  // ---------------------------------------------------------------------------
  {
    id: "act_smart_traffic",
    stageId: "classes-8-10",
    type: "logic_puzzle",
    title: "The Smart Eco-Transit Route Logic",
    subtitle: "Design the automated traffic signal priority for an eco-friendly bus rapid transit corridor.",
    estimatedMinutes: 4,
    scenario:
      "An automated city transit sensor detects: (A) A school bus carrying 40 students approaching from North, (B) An electric emergency ambulance with active sirens from West, and (C) A steady line of 15 private cars from South. If the intersection controller can only grant green to one lane at a time, which priority rule optimizes human safety and urban flow?",
    options: [
      {
        id: "opt_1",
        label: "Priority: Ambulance (Immediate Life Safety) -> School Bus (High Passenger Volume) -> Private Cars",
        isCorrect: true,
        feedback:
          "Spot-on! Emergency life safety always preempts scheduled transit, which in turn carries higher public volume than individual private vehicles.",
      },
      {
        id: "opt_2",
        label: "First-come, first-served: whichever vehicle touched the sensor first gets the green light",
        isCorrect: false,
        feedback:
          "Naive FIFO (First-In, First-Out) queues cause dangerous delays for emergency responders and stall high-occupancy public transit.",
      },
      {
        id: "opt_3",
        label: "Longest queue first: clear the 15 private cars first because the physical line is longer",
        isCorrect: false,
        feedback:
          "Length of queue does not account for passenger density or emergency urgency. 1 bus carries more people than 15 single-occupant cars.",
      },
    ],
    explanation:
      "Modern urban analytics and algorithm design balance multiple constraints: urgent safety thresholds vs. systemic throughput.",
    demonstratedCompetency: "Constraint Prioritization & Systems Thinking",
  },

  // ---------------------------------------------------------------------------
  // 4. Classes 8-10: Stream Selection / Still Exploring
  // ---------------------------------------------------------------------------
  {
    id: "act_stream_comparison",
    stageId: "classes-8-10",
    type: "decision_tradeoff",
    title: "The 10th-to-11th Stream Exploration Challenge",
    subtitle: "Evaluate curriculum alignment for a student interested in both computers and economics.",
    estimatedMinutes: 4,
    scenario:
      "A Class 10 student enjoys coding games and also loves analyzing market trends and business ideas. They are torn between 11th Science (PCM) and 11th Commerce with Math. What is the most accurate insight regarding their future degree pathways?",
    options: [
      {
        id: "opt_1",
        label: "Both paths allow computing and tech careers; Commerce with Math opens FinTech, Data Analytics, and BCA/BBA, while PCM preserves direct B.Tech engineering eligibility.",
        isCorrect: true,
        feedback:
          "Spot on! Knowing that computing is accessible through both Commerce with Math (BCA, B.Sc, FinTech) and Science (B.Tech) removes unnecessary panic from 10th stream choices.",
      },
      {
        id: "opt_2",
        label: "Only Science students are ever legally allowed to touch computers or build software in college.",
        isCorrect: false,
        feedback:
          "A major myth! Thousands of leading developers and product managers graduate from BCA, B.Sc, B.Com, and self-directed portfolios.",
      },
      {
        id: "opt_3",
        label: "Commerce students can never learn quantitative mathematics or statistical analysis.",
        isCorrect: false,
        feedback:
          "Incorrect. Modern commerce, actuarial science, and econometrics require rigorous mathematical and statistical analysis.",
      },
    ],
    explanation:
      "Stream selection should reflect your genuine curiosity and sustainable study stamina—not arbitrary societal prestige.",
    demonstratedCompetency: "Curricular Stream Evaluation & Pathway Awareness",
  },

  // ---------------------------------------------------------------------------
  // 5. Classes 11-12: Science & General Higher Education Trade-offs
  // ---------------------------------------------------------------------------
  {
    id: "act_degree_tradeoff",
    stageId: "classes-11-12",
    type: "decision_tradeoff",
    title: "The Educational Pathway & Skill Trade-Off Matrix",
    subtitle: "Evaluate realistic career readiness constraints between two higher education pathways.",
    estimatedMinutes: 5,
    scenario:
      "Student A chooses a traditional 4-year degree focusing purely on theoretical coursework with zero portfolio projects. Student B pursues a 3-year applied degree with 2 published open-source applications, Git commit history, and a specialized cloud certification. When applying for modern junior tech/product roles, which observation reflects industry reality?",
    options: [
      {
        id: "opt_1",
        label: "Student B has stronger verifiable hiring evidence; modern technology teams evaluate demonstrable capability over degree pedigree alone.",
        isCorrect: true,
        feedback:
          "Accurate. Industry hiring data consistently shows that verified project artifacts, public code repositories, and practical problem-solving carry enormous weight alongside degree foundations.",
      },
      {
        id: "opt_2",
        label: "Student A is automatically preferred everywhere because 4-year degrees always guarantee immediate job readiness.",
        isCorrect: false,
        feedback:
          "A common misconception. Degrees provide valuable theoretical foundations, but without demonstrable practical work, candidates face significant skill gaps.",
      },
      {
        id: "opt_3",
        label: "Neither pathway matters; only memorizing competitive entrance exam questions determines career success.",
        isCorrect: false,
        feedback:
          "Entrance exams help with college admissions, but ongoing career progression and real-world impact depend on building continuous capability.",
      },
    ],
    explanation:
      "Next Move AI helps you look past superficial labels. The strongest career position blends credible foundational education with continuous, verifiable portfolio evidence.",
    demonstratedCompetency: "Realistic Educational Evaluation & Portfolio Awareness",
  },

  // ---------------------------------------------------------------------------
  // 6. Commerce & Business: Cash Flow vs Profit (BCom, BBA, Finance, 11-12 Commerce)
  // ---------------------------------------------------------------------------
  {
    id: "act_commerce_case",
    stageId: "degree-engineering",
    type: "case_evaluation",
    title: "Financial Insight: Cash Flow vs. Accounting Profit",
    subtitle: "Diagnose why a growing venture ran out of cash despite reporting quarterly profit.",
    estimatedMinutes: 5,
    scenario:
      "A student-run merchandise enterprise reports ₹80,000 in net accounting profit in its second quarter by delivering 300 custom university hoodies. However, the business bank account has only ₹3,000 left and cannot pay garment suppliers next week. Reviewing receivables and working capital, what is the root financial cause?",
    options: [
      {
        id: "opt_1",
        label: "Revenue was booked on accrual credit with a 60-day customer payment cycle, while inventory and fabric costs had to be paid upfront in cash (Working capital timing gap).",
        isCorrect: true,
        feedback:
          "Excellent commercial insight! Profit is an accounting construct; cash is real liquidity. High sales on credit without structured working capital terms frequently creates cash insolvency.",
      },
      {
        id: "opt_2",
        label: "Accounting profit and bank balance must always be identical in standard double-entry bookkeeping.",
        isCorrect: false,
        feedback:
          "A dangerous assumption. Non-cash revenues, accounts receivable, and inventory capital create significant divergence between profit and available cash.",
      },
      {
        id: "opt_3",
        label: "The enterprise should take an emergency 40% interest loan without reviewing accounts receivable collection terms.",
        isCorrect: false,
        feedback:
          "Predatory borrowing masks operational flaws. Tightening payment terms or demanding advance deposits is the sustainable solution.",
      },
    ],
    explanation:
      "Business and financial acumen require understanding cash flow timing, working capital cycles, and unit economics beyond top-line sales.",
    demonstratedCompetency: "Working Capital Analysis & Financial Acumen",
  },

  // ---------------------------------------------------------------------------
  // 7. Diploma: Electrical / Electronics / Telemetry
  // ---------------------------------------------------------------------------
  {
    id: "act_telemetry_diagnostic",
    stageId: "diploma",
    type: "applied_scenario",
    title: "Applied Diagnostic: Industrial Sensor Telemetry Failure",
    subtitle: "Troubleshoot an intermittent data dropout on a shop-floor PLC telemetry loop.",
    estimatedMinutes: 5,
    scenario:
      "A 4-20mA pressure transducer on an automated hydraulic press sends erratic, spiking signals whenever the primary 3-phase induction motor spins up. The wiring runs 15 meters along the same cable tray as the 415V motor supply line. As a technical diploma engineer, what is your first diagnostic recommendation?",
    options: [
      {
        id: "opt_1",
        label: "Check for electromagnetic interference (EMI); separate analog 4-20mA shielded twisted-pair cables from high-voltage AC lines.",
        isCorrect: true,
        feedback:
          "Excellent engineering intuition! High-current motor inrush induces magnetic noise on parallel unshielded signal lines. Physical segregation and single-point shielding solve the issue.",
      },
      {
        id: "opt_2",
        label: "Replace the pressure transducer immediately without checking cable routing or grounding.",
        isCorrect: false,
        feedback:
          "Premature component replacement wastes budget. The transducer is likely intact; external electromagnetic induction is corrupting the signal loop.",
      },
      {
        id: "opt_3",
        label: "Ignore the spikes and increase the software smoothing filter to 30 seconds.",
        isCorrect: false,
        feedback:
          "Heavy software filtering masks real hydraulic pressure surges, introducing dangerous control lag into high-pressure machinery.",
      },
    ],
    explanation:
      "Practical engineering combines fundamental physics with disciplined root-cause diagnosis — bridging hands-on craftsmanship with systems design.",
    demonstratedCompetency: "Applied Hardware Diagnostics & Signal Integrity",
  },

  // ---------------------------------------------------------------------------
  // 8. Diploma: Mechanical / Manufacturing / Automobile
  // ---------------------------------------------------------------------------
  {
    id: "act_mech_manufacturing",
    stageId: "diploma",
    type: "applied_scenario",
    title: "Mechanical Diagnostic: CNC Spindle Bearing Thermal Spike",
    subtitle: "Identify root cause of unexpected thermal spikes on a precision lathe spindle.",
    estimatedMinutes: 5,
    scenario:
      "During a production shift, a CNC lathe's primary spindle bearing temperature rises from 40°C to 82°C within 45 minutes of operation following scheduled lubrication. Accelerometers show high-frequency axial chatter. As a mechanical diploma engineer, what is your initial diagnostic assessment?",
    options: [
      {
        id: "opt_1",
        label: "Over-lubrication causing grease churning friction, or shaft misalignment resulting in excessive axial pre-load on the angular contact bearings.",
        isCorrect: true,
        feedback:
          "Superb mechanical diagnostics! Too much grease causes fluid friction churning that overheats bearings faster than under-lubrication. Pre-load alignment check is critical.",
      },
      {
        id: "opt_2",
        label: "Immediate total motor winding burnout; scrap and replace the 15kW spindle motor immediately.",
        isCorrect: false,
        feedback:
          "Premature motor replacement overlooks mechanical spindle bearings. Motor electrical integrity should be verified with a megohmmeter before condemnation.",
      },
      {
        id: "opt_3",
        label: "Increase spindle RPM by 50% to blow out excess heat through ambient convection.",
        isCorrect: false,
        feedback:
          "Increasing speed under thermal distress risks catastrophic bearing seizure and spindle shaft galling.",
      },
    ],
    explanation:
      "Mechanical and manufacturing mastery relies on precision physics, lubrication mechanics, and systematic root-cause troubleshooting.",
    demonstratedCompetency: "Mechanical Root-Cause Diagnosis & Spindle Reliability",
  },

  // ---------------------------------------------------------------------------
  // 9. Degree / Engineering / BCA: Backend Systems & Database Architecture
  // ---------------------------------------------------------------------------
  {
    id: "act_api_bottleneck",
    stageId: "degree-engineering",
    type: "debugging_or_data",
    title: "Engineering Inspection: The N+1 Database Query Bottleneck",
    subtitle: "Spot the architectural flaw causing response times to scale from 20ms to 4.2 seconds.",
    estimatedMinutes: 5,
    scenario:
      "Review this serverless backend handler designed to return a list of active students and their latest learning milestone:\n\nconst students = await db.query('SELECT * FROM students WHERE active = true');\nconst results = [];\nfor (const student of students) {\n  const milestone = await db.query('SELECT * FROM milestones WHERE student_id = ?', [student.id]);\n  results.push({ ...student, latestMilestone: milestone[0] });\n}\nreturn results;\n\nWhy does this code degrade severely when active students scale to 500?",
    options: [
      {
        id: "opt_1",
        label: "Classic N+1 query problem: It executes 1 query for students plus 500 individual queries inside the loop, overwhelming database connection pools.",
        isCorrect: true,
        feedback:
          "Outstanding! 501 network roundtrips create latency cascades. Replacing this with an indexed JOIN or a single batch `WHERE student_id IN (...)` query reduces DB roundtrips to 1 or 2.",
      },
      {
        id: "opt_2",
        label: "JavaScript `for...of` loops are inherently too slow for arrays with more than 50 elements.",
        isCorrect: false,
        feedback:
          "V8 JavaScript engines execute in-memory loops over 500 items in microseconds. The latency is entirely driven by network and database round-trip times.",
      },
      {
        id: "opt_3",
        label: "The code should create 500 parallel microservices to query each milestone independently.",
        isCorrect: false,
        feedback:
          "Spawning 500 microservices would dramatically increase network hops, cold starts, and infrastructure costs without fixing the underlying query design.",
      },
    ],
    explanation:
      "Recognizing systemic bottlenecks versus micro-optimizations is what distinguishes experienced software builders from theoretical coders.",
    demonstratedCompetency: "Backend Architectural Efficiency & Database Query Optimization",
  },

  // ---------------------------------------------------------------------------
  // 10. Final Year / Graduate: Humanities, Arts, Social Sciences, Policy
  // ---------------------------------------------------------------------------
  {
    id: "act_grad_policy_synthesis",
    stageId: "final-year-grad",
    type: "case_evaluation",
    title: "Strategic Evaluation: Evidence-Based Policy Synthesis",
    subtitle: "Evaluate conflicting primary source data to recommend an educational fellowship intervention.",
    estimatedMinutes: 5,
    scenario:
      "A non-profit education initiative has ₹15 Lakhs to pilot an intervention in 20 primary learning centers. Proposal A allocates 100% of funding to smart tablets. Proposal B cites longitudinal peer-reviewed studies demonstrating that structured phonics teacher mentoring and interactive reading kits yield 3.4x greater literacy retention per rupee than unguided hardware. As a graduating researcher or analyst, which synthesis optimizes evidence-based impact?",
    options: [
      {
        id: "opt_1",
        label: "Prioritize structured teacher coaching and localized reading workbooks, running a small 10% digital pilot; empirical research demonstrates pedagogy and teacher capability drive literacy gains, not hardware alone.",
        isCorrect: true,
        feedback:
          "Outstanding analytical evaluation! Rigorous human sciences and policy analysis look past technology hypes to evaluate empirical evidence of human behavioral impact.",
      },
      {
        id: "opt_2",
        label: "Deploy only tablet screens because digital hardware always automatically guarantees improved student reading proficiency.",
        isCorrect: false,
        feedback:
          "Multiple global studies confirm that unguided hardware distribution without teacher training produces negligible learning gains.",
      },
      {
        id: "opt_3",
        label: "Refuse to allocate the budget until an artificial intelligence model replaces all human teachers and local school boards.",
        isCorrect: false,
        feedback:
          "Unrealistic and unsupported by developmental psychology. Human teachers and community relationships remain foundational to early learning.",
      },
    ],
    explanation:
      "Advanced humanities, commerce, and social sciences graduates distinguish themselves through critical source evaluation, empirical rigor, and grounded policy recommendations.",
    demonstratedCompetency: "Empirical Evidence Synthesis & Strategic Policy Prioritization",
  },

  // ---------------------------------------------------------------------------
  // 11. Final Year / Graduate: Startup / Tech Strategy
  // ---------------------------------------------------------------------------
  {
    id: "act_startup_mvp_tradeoff",
    stageId: "final-year-grad",
    type: "case_evaluation",
    title: "Strategic Transition Dilemma: The 30-Day Launch Trade-Off",
    subtitle: "Make an executive technical decision under tight runway and early customer validation constraints.",
    estimatedMinutes: 5,
    scenario:
      "You are technical lead for a nascent venture. You have 30 days to pilot a student learning copilot with 200 real test users. Lead Engineer A wants to spend 3 weeks building a custom multi-tenant microservices mesh with Kubernetes. Lead Engineer B proposes using a modular monolith on a managed platform with a PostgreSQL database and automated migrations, allowing the team to ship the pilot by Day 10 and spend 20 days gathering real user feedback. Which path optimizes strategic survival?",
    options: [
      {
        id: "opt_1",
        label: "Adopt Lead Engineer B's approach: Speed-to-learning and customer discovery outweigh premature infrastructure optimization at 200 users.",
        isCorrect: true,
        feedback:
          "Exceptional decision-making! Early ventures die from lack of customer validation, not Kubernetes absence. Modular monoliths allow rapid iteration while remaining refactorable as scale demands.",
      },
      {
        id: "opt_2",
        label: "Adopt Lead Engineer A's approach: Always build for 10 million hypothetical users before talking to a single customer.",
        isCorrect: false,
        feedback:
          "Classic premature optimization trap. Complex infrastructure built for imaginary scale burns runway and slows down feature adjustments.",
      },
      {
        id: "opt_3",
        label: "Delay the launch by 6 months until venture capital investors guarantee funding.",
        isCorrect: false,
        feedback:
          "Investors back traction and evidence of user desire, not unimplemented slide decks. Validating prototypes with real users creates genuine leverage.",
      },
    ],
    explanation:
      "Strategic clarity means knowing what NOT to build yet. High-performing graduates stand out by demonstrating pragmatic prioritization and real execution speed.",
    demonstratedCompetency: "Pragmatic Architecture Prioritization & Venture Execution",
  },
];

// =============================================================================
// ADAPTIVE ACTIVITY RESOLVER
// =============================================================================

export function resolveMicroActivity(
  stageId: AcademicStageId,
  selectedCategoryIds: string[] = [],
  academicContext?: AcademicContextData
): MicroActivity {
  const isBusiness =
    selectedCategoryIds.includes("business_entrepreneurship") ||
    (academicContext?.type === "degree-engineering" &&
      (academicContext.data.degreeProgram === "BCom" ||
        academicContext.data.degreeProgram === "BBA" ||
        academicContext.data.branchOrMajor === "Finance & Accounting" ||
        academicContext.data.branchOrMajor === "Marketing & Management")) ||
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
        academicContext.data.completedDegree.includes("Commerce") ||
        academicContext.data.completedDegree.includes("B.Com") ||
        academicContext.data.completedDegree.includes("Arts") ||
        academicContext.data.specialization.includes("Economics") ||
        academicContext.data.specialization.includes("Literature")));

  const isDiplomaMechanical =
    academicContext?.type === "diploma" &&
    (academicContext.data.branch.includes("Mechanical") ||
      academicContext.data.branch.includes("Automobile"));

  const isDiplomaElectricalOrTech =
    academicContext?.type === "diploma" &&
    (academicContext.data.branch.includes("Computer") ||
      academicContext.data.branch.includes("Electronics") ||
      academicContext.data.branch.includes("Electrical"));

  const isStillExploring =
    selectedCategoryIds.includes("still_exploring") ||
    (academicContext?.type === "classes-8-10" &&
      academicContext.data.streamCuriosity === "Exploring all");

  // Stage-specific routing
  switch (stageId) {
    case "classes-4-7":
      if (isCreative) {
        return (
          MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_story_pacing") ||
          MICRO_ACTIVITIES_CATALOG[0]
        );
      }
      return (
        MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_rover_sequence") ||
        MICRO_ACTIVITIES_CATALOG[0]
      );

    case "classes-8-10":
      if (isStillExploring) {
        return (
          MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_stream_comparison") ||
          MICRO_ACTIVITIES_CATALOG[2]
        );
      }
      return (
        MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_smart_traffic") ||
        MICRO_ACTIVITIES_CATALOG[2]
      );

    case "classes-11-12":
      if (isBusiness) {
        return (
          MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_commerce_case") ||
          MICRO_ACTIVITIES_CATALOG[4]
        );
      }
      return (
        MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_degree_tradeoff") ||
        MICRO_ACTIVITIES_CATALOG[4]
      );

    case "diploma":
      if (isDiplomaMechanical) {
        return (
          MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_mech_manufacturing") ||
          MICRO_ACTIVITIES_CATALOG[7]
        );
      }
      return (
        MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_telemetry_diagnostic") ||
        MICRO_ACTIVITIES_CATALOG[6]
      );

    case "degree-engineering":
      if (isBusiness) {
        return (
          MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_commerce_case") ||
          MICRO_ACTIVITIES_CATALOG[5]
        );
      }
      return (
        MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_api_bottleneck") ||
        MICRO_ACTIVITIES_CATALOG[8]
      );

    case "final-year-grad":
    default:
      if (isHumanitiesOrPolicy || isBusiness) {
        return (
          MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_grad_policy_synthesis") ||
          MICRO_ACTIVITIES_CATALOG[9]
        );
      }
      return (
        MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_startup_mvp_tradeoff") ||
        MICRO_ACTIVITIES_CATALOG[10]
      );
  }
}

// Default legacy dictionary export for backwards compatibility
export const STAGE_MICRO_ACTIVITIES: Record<AcademicStageId, MicroActivity> = {
  "classes-4-7": MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_rover_sequence")!,
  "classes-8-10": MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_smart_traffic")!,
  "classes-11-12": MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_degree_tradeoff")!,
  diploma: MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_telemetry_diagnostic")!,
  "degree-engineering": MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_api_bottleneck")!,
  "final-year-grad": MICRO_ACTIVITIES_CATALOG.find((a) => a.id === "act_startup_mvp_tradeoff")!,
};
