/**
 * NEXT MOVE AI V2 — FLOW 3 INTERACTIVE MICRO-EXPLORATIONS
 * 
 * Stage-aware interactive mini-challenges with genuine options, immediate feedback,
 * retry capability, and non-punitive skip.
 */

import { type AcademicStageId } from "@/data/landing-demo";
import { type MicroActivity } from "../schemas/types";

export const STAGE_MICRO_ACTIVITIES: Record<AcademicStageId, MicroActivity> = {
  "classes-4-7": {
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

  "classes-8-10": {
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

  "classes-11-12": {
    id: "act_degree_tradeoff",
    stageId: "classes-11-12",
    type: "decision_tradeoff",
    title: "The Educational Pathway & Skill Trade-Off Matrix",
    subtitle: "Evaluate realistic career readiness constraints between two higher education pathways.",
    estimatedMinutes: 5,
    scenario:
      "Student A chooses a traditional 4-year degree focusing on theoretical science but never builds portfolio projects. Student B pursues a 3-year applied degree with 2 published open-source applications, Git commit history, and a specialized cloud certification. When applying for junior developer or product roles in modern technology firms, which observation reflects industry reality?",
    options: [
      {
        id: "opt_1",
        label: "Student B has stronger verifiable hiring evidence; modern tech teams evaluate demonstrated capability over degree pedigree alone.",
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

  diploma: {
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

  "degree-engineering": {
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

  "final-year-grad": {
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
};
