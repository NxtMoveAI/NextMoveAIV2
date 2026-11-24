/**
 * NEXT MOVE AI V2 — PERSONALIZED NEXT MOVE ACTIVITIES CATALOG & RESOLVER
 * 
 * Provides simple, practical, educational step-by-step activities
 * tailored to student's Starting Point questionnaire, primary focus, active interests,
 * and academic stage. Each activity contains 4–5 clear, achievable steps.
 */

import { type ActivityStep, type StudentNextMoveActivity } from "@/lib/firestore-service";
import { type UserStartingPoint } from "@/lib/firestore-service";

export interface PersonalizedActivity {
  id: string;
  title: string;
  description: string;
  learningOutcome: string;
  estimatedDuration: string;
  categories: string[];
  stages: string[];
  whySuggested: string;
  steps: ActivityStep[];
}

export const PERSONALIZED_ACTIVITIES_CATALOG: PersonalizedActivity[] = [
  // 1. Creative & Stories (Classes 4–7 & 8–10)
  {
    id: "act_comic_story",
    title: "Create a 3-Scene Adventure Story Comic",
    description: "Design and write a short three-panel adventure story comic featuring original characters solving a creative mystery.",
    learningOutcome: "Storytelling structure, character design, creative writing, and visual narrative planning.",
    estimatedDuration: "20 mins",
    categories: ["Creativity & Media", "Stories & Imagination"],
    stages: ["classes-4-7", "classes-8-10"],
    whySuggested: "Matches your passion for creative ideas, drawing, and imaginative storytelling.",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Create Your Characters",
        instruction: "Choose two characters and give each one a name and unique personality or special quality.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Discover the Mystery",
        instruction: "Think of a small mystery, puzzle, or challenge that your characters need to solve together.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Draft Three Scenes",
        instruction: "Draw or describe three scenes: the beginning situation, the surprising clue, and the solution.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Solve the Mystery",
        instruction: "Decide how your characters solve the problem using their teamwork and creative qualities.",
      },
      {
        id: "step-5",
        stepNumber: 5,
        title: "Reflect on Your Story",
        instruction: "Write one thing you learned about storytelling or what you enjoyed most about creating your comic.",
      },
    ],
  },

  // 2. Technology & Building (Classes 4–7 & 8–10)
  {
    id: "act_cardboard_machine",
    title: "Design a Smart Invention Blueprint on Paper",
    description: "Invent a clever household machine or robot that automates a daily chore using simple mechanics and sensors.",
    learningOutcome: "Design thinking, mechanical logic, problem decomposition, and practical prototyping.",
    estimatedDuration: "20 mins",
    categories: ["Technology & Building", "Problem Solving"],
    stages: ["classes-4-7", "classes-8-10"],
    whySuggested: "Builds on your interest in tinkering, machines, and discovering how tools work.",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Identify a Real Chore",
        instruction: "Pick one repetitive household chore (like sorting shoes, watering plants, or folding clothes) to solve.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Sketch 2 Mechanism Ideas",
        instruction: "Sketch two different ways a mechanical tool or sensor could help make this chore effortless.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Draw Labeled Blueprint",
        instruction: "Draw a detailed diagram of your favorite idea, labeling the power source, motor or lever, and sensors.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "List Everyday Materials",
        instruction: "List everyday recyclable materials (cardboard, rubber bands, straws) you could use to build a mockup.",
      },
      {
        id: "step-5",
        stepNumber: 5,
        title: "Test with a User",
        instruction: "Explain your blueprint to a family member or friend and note one improvement they suggested.",
      },
    ],
  },

  // 3. Nature & Environment (Classes 4–7 & 8–10)
  {
    id: "act_nature_journal",
    title: "Neighborhood Biodiversity & Nature Field Journal",
    description: "Step outside to observe, document, and categorize plant varieties and wildlife in your local habitat.",
    learningOutcome: "Ecological observation, species categorization, environmental awareness, and field notes documentation.",
    estimatedDuration: "20 mins",
    categories: ["Nature & Environment"],
    stages: ["classes-4-7", "classes-8-10"],
    whySuggested: "Connects with your curiosity about plants, animals, and exploring the outdoors.",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Pick an Observation Spot",
        instruction: "Choose an outdoor tree, balcony garden, or nearby park corner for a 10-minute field study.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Catalog 3 Plant Specimens",
        instruction: "Find and sketch 3 distinct leaves or flowers, noting their shapes, textures, and vein patterns.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Observe Pollinators & Insects",
        instruction: "Watch quietly for 5 minutes and write down any insects or birds interacting with the plants.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Record Weather & Soil Factors",
        instruction: "Note the sunlight intensity, soil moisture, and any human impact on this micro-habitat.",
      },
      {
        id: "step-5",
        stepNumber: 5,
        title: "Write an Eco-Insight",
        instruction: "Write two simple ideas on how to make your neighborhood friendlier for local pollinators.",
      },
    ],
  },

  // 4. Science & Discovery (Classes 4–7 & 8–10)
  {
    id: "act_kitchen_science",
    title: "Kitchen Science Experiment: Density Column & Buoyancy",
    description: "Conduct a hands-on physics investigation layering liquids of different densities and testing object buoyancy.",
    learningOutcome: "Scientific method, liquid density, hypothesis testing, and observational recording.",
    estimatedDuration: "20 mins",
    categories: ["Science & Discovery"],
    stages: ["classes-4-7", "classes-8-10"],
    whySuggested: "Tailored to your desire to conduct fun experiments and discover scientific principles in action.",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Gather Household Liquids",
        instruction: "Collect water, cooking oil, honey or dish soap, and a tall clear glass or jar.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Make Your Hypothesis",
        instruction: "Predict which liquid will be the heaviest (bottom layer) and which will float on top.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Layer the Liquids",
        instruction: "Slowly pour each liquid down the side of the glass and observe how distinct layers form without mixing.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Test Floating Objects",
        instruction: "Gently drop small items (grape, plastic cap, metal clip) and record which layer each stops at.",
      },
      {
        id: "step-5",
        stepNumber: 5,
        title: "Conclude & Reflect",
        instruction: "Write down why different materials settle at different layers based on their relative density.",
      },
    ],
  },

  // 5. Helping & People (Classes 4–7 & 8–10)
  {
    id: "act_community_puzzle",
    title: "Solve the Community Library Problem Challenge",
    description: "Collaborate on a structured problem-solving exercise to optimize book borrowing and study space for friends.",
    learningOutcome: "Community empathy, collaborative problem solving, resource allocation, and feedback loops.",
    estimatedDuration: "20 mins",
    categories: ["Helping & People", "Problem Solving"],
    stages: ["classes-4-7", "classes-8-10"],
    whySuggested: "Builds on your strength in helping others, working with friends, and solving practical community puzzles.",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Identify User Needs",
        instruction: "List 3 common frustrations students face when trying to study or borrow books together.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Map Available Resources",
        instruction: "Inventory the available space, popular book genres, and hours students are free to visit.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Propose 2 Clever Rules",
        instruction: "Create two fair guidelines that encourage book sharing and quiet collaborative study.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Create a Visual Signboard",
        instruction: "Design a colorful, friendly one-page announcement board explaining the system to classmates.",
      },
      {
        id: "step-5",
        stepNumber: 5,
        title: "Reflect on Impact",
        instruction: "Note how organizing shared spaces fairly helps everyone learn and succeed together.",
      },
    ],
  },

  // 6. Problem Solving & Logic (Classes 4–7 & 8–10)
  {
    id: "act_secret_cipher",
    title: "Crack the Secret Cipher: Build & Decode Secret Codes",
    description: "Explore basic cryptography and logic by building a letter-shift substitution cipher and encoding a message.",
    learningOutcome: "Algorithmic thinking, pattern recognition, substitution ciphers, and decryption logic.",
    estimatedDuration: "15 mins",
    categories: ["Problem Solving", "Exploring Multiple Directions"],
    stages: ["classes-4-7", "classes-8-10"],
    whySuggested: "Engages your curiosity in solving puzzles, logic challenges, and testing creative solutions.",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Learn the Shift Rule",
        instruction: "Write the alphabet and apply a shift of +3 (A becomes D, B becomes E) to build your cipher key.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Encode a Secret Sentence",
        instruction: "Write a short 5-word message and convert every letter into ciphertext using your key.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Create Decryption Guide",
        instruction: "Write the reverse decoding rule (-3 shift) so an ally can decipher your secret text.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Test with a Partner",
        instruction: "Have a classmate or friend decode your message using your rule and see if they succeed.",
      },
      {
        id: "step-5",
        stepNumber: 5,
        title: "Reflect on Security",
        instruction: "Explain why simple ciphers can be cracked and how modern computers build stronger codes.",
      },
    ],
  },

  // 7. Multi-Stream Discovery (Classes 8–10)
  {
    id: "act_multi_stream_mini_tasks",
    title: "Try 2 Low-Stakes Mini-Tasks Across Different Streams",
    description: "Experience two brief exploration tasks comparing science/tech inquiry with creative/social analysis without stream lock.",
    learningOutcome: "Cross-stream exposure, low-pressure discovery, subject comparison, and self-reflection.",
    estimatedDuration: "20 mins",
    categories: ["Exploring Multiple Directions", "Problem Solving"],
    stages: ["classes-8-10"],
    whySuggested: "Allows open multi-path exploration across high school subjects without premature stream locking.",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Task A: Science / Tech Analysis",
        instruction: "Read a short real-world scenario on how solar panels convert sunlight and note 2 engineering challenges.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Task B: Commerce / Humanities Case",
        instruction: "Review how community electricity pricing affects family budgets and note 2 economic trade-offs.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Compare Your Engagement",
        instruction: "Reflect on which scenario felt more natural and exciting to think through: the technical or the social?",
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Identify Overlap",
        instruction: "Notice how technology and economics work together in renewable energy projects.",
      },
      {
        id: "step-5",
        stepNumber: 5,
        title: "Record Discovery Note",
        instruction: "Write down one topic you'd like to explore further before selecting your Class 11 stream.",
      },
    ],
  },

  // 8. Class 11–12 Science PCM
  {
    id: "act_compare_ug_pathways",
    title: "Compare 2 Undergraduate Pathways",
    description: "Compare curriculum structure, real day-to-day coursework, and career options between two undergraduate degree options.",
    learningOutcome: "Curriculum comparison, entrance requirements, realistic career trajectories, and honest trade-offs.",
    estimatedDuration: "25 mins",
    categories: ["Technology & Building", "Science & Discovery", "Science (PCM)"],
    stages: ["classes-11-12"],
    whySuggested: "Provides objective pathway comparisons for Class 12 without false placement guarantees.",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Select 2 Degree Options",
        instruction: "Choose two degrees to compare (e.g. B.Tech Computer Science vs B.Sc Data Science).",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Inspect Core Curriculum",
        instruction: "Review the semester syllabi and list 3 common subjects and 3 distinct specialized subjects.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Analyze Entrance Exams & Costs",
        instruction: "Compare admission criteria, typical entrance exams (JEE, CET), and average degree durations.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Examine Career Realities",
        instruction: "Research entry-level roles for both pathways and identify realistic starting skills needed.",
      },
      {
        id: "step-5",
        stepNumber: 5,
        title: "Synthesize Your Decision Matrix",
        instruction: "Score both pathways on interest, difficulty, and alignment with your preferred learning style.",
      },
    ],
  },

  // 9. Diploma Mechanical / Tech
  {
    id: "act_diploma_leet",
    title: "Review Lateral Entry Entrance Exam (LEET) Requirements",
    description: "Map out the syllabus, eligibility criteria, and engineering branch transition pathways for 2nd-year B.Tech lateral entry.",
    learningOutcome: "Lateral entry roadmap, practical engineering alignment, and entrance exam preparation strategy.",
    estimatedDuration: "20 mins",
    categories: ["Mechanical", "Engineering"],
    stages: ["diploma"],
    whySuggested: "Builds on your diploma coursework to plan a seamless transition into degree engineering.",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Check State LEET Eligibility",
        instruction: "Verify minimum diploma aggregate marks and eligible B.Tech branch mappings for your state.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Analyze Exam Syllabus",
        instruction: "Review the three exam sections: Applied Mechanics, Mathematics, and Engineering Fundamentals.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Map Strengths & Gaps",
        instruction: "Identify which diploma subjects you've already mastered and which theoretical math topics need revision.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Draft a 4-Week Study Schedule",
        instruction: "Allocate 45 minutes daily for topic reviews and past LEET question papers.",
      },
      {
        id: "step-5",
        stepNumber: 5,
        title: "Identify Top 3 Target Colleges",
        instruction: "Shortlist three engineering institutions with strong practical labs and lateral entry seats.",
      },
    ],
  },

  // 10. Degree BCA / Computer Applications
  {
    id: "act_bca_fastify",
    title: "Build a Small CRUD API with Fastify or Express",
    description: "Design a clean RESTful microservice with 3 endpoints to practise request validation and relational database queries.",
    learningOutcome: "REST architectural patterns, route handling, error middlewares, and query optimization.",
    estimatedDuration: "30 mins",
    categories: ["Technology & Building", "Computer Science"],
    stages: ["degree-engineering"],
    whySuggested: "Strengthens backend engineering fundamentals with verifiable hands-on code.",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Define Data Model & Routes",
        instruction: "Outline 3 endpoints (GET /items, POST /items, GET /items/:id) with JSON request/response contracts.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Implement Input Validation",
        instruction: "Add schema validation to prevent invalid payloads and return friendly 400 Bad Request responses.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Connect In-Memory Mock Store",
        instruction: "Implement CRUD operations against an in-memory array or SQLite instance with proper ID generation.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Test with curl or Thunder Client",
        instruction: "Send valid and malformed HTTP requests, asserting correct status codes (200, 201, 400, 404).",
      },
      {
        id: "step-5",
        stepNumber: 5,
        title: "Document Error Handling Strategy",
        instruction: "Write a short summary of how centralized error middleware avoids leaking stack traces.",
      },
    ],
  },

  // 11. Degree BCom / Finance
  {
    id: "act_cash_flow_model",
    title: "Analyze a Real-World 12-Month Cash Flow Statement",
    description: "Examine monthly cash inflows, operating expenses, and working capital cycles of a real retail business case.",
    learningOutcome: "Cash vs profit accounting, burn rate, liquidity management, and working capital trade-offs.",
    estimatedDuration: "25 mins",
    categories: ["Finance & Accounting", "Commerce"],
    stages: ["degree-engineering", "final-year-grad"],
    whySuggested: "Applies corporate finance fundamentals to practical liquidity analysis without forced coding.",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Inspect Income vs Collections",
        instruction: "Review the sample 12-month statement and note the difference between invoiced sales and actual cash collected.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Classify Fixed vs Variable Costs",
        instruction: "Separate rent and payroll from inventory purchases and utility variations.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Locate Negative Cash Months",
        instruction: "Identify months where cash outflows exceeded inflows and determine the root cause (e.g. bulk inventory purchase).",
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Calculate Working Capital Cushion",
        instruction: "Determine the minimum bank balance required to survive two consecutive slow months.",
      },
      {
        id: "step-5",
        stepNumber: 5,
        title: "Propose 2 Financial Solutions",
        instruction: "Suggest two concrete recommendations: negotiating 45-day vendor credit terms and offering early-payment discounts.",
      },
    ],
  },

  // 12. Engineering Senior / Systems
  {
    id: "act_benchmark_sensor",
    title: "Benchmark Your Existing Sensor Project with Latency Profiles",
    description: "Measure transmission latency, throughput, and memory consumption across sample data bursts in a simulated sensor network.",
    learningOutcome: "Systems benchmarking, performance profiling, latency metrics, and empirical engineering rigor.",
    estimatedDuration: "30 mins",
    categories: ["Computer Science", "Electronics", "Engineering"],
    stages: ["degree-engineering"],
    whySuggested: "Elevates existing project work into verifiable technical portfolio evidence.",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Define Metric Baselines",
        instruction: "Identify three critical performance metrics: p95 latency, packet loss rate, and memory footprint.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Create a Controlled Load Test",
        instruction: "Simulate 100 consecutive sensor readings transmitted at 50ms intervals.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Log Execution Timing",
        instruction: "Record time stamps at transmission, queue arrival, and database write completion.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Plot Latency Distribution",
        instruction: "Calculate average and tail latency, pinpointing where bottlenecks (serialization vs I/O) occur.",
      },
      {
        id: "step-5",
        stepNumber: 5,
        title: "Write an Optimization Summary",
        instruction: "Document two architectural improvements: payload compression and asynchronous batch writes.",
      },
    ],
  },

  // 13. Humanities / Public Policy
  {
    id: "act_policy_brief",
    title: "Draft a 1-Page Policy Brief on an Urban Sustainability Trade-Off",
    description: "Synthesize economic data, public interest considerations, and governance constraints into an executive policy brief.",
    learningOutcome: "Evidence-based policy synthesis, multi-stakeholder analysis, and executive communication.",
    estimatedDuration: "25 mins",
    categories: ["Public Policy", "Economics", "Humanities"],
    stages: ["final-year-grad", "degree-engineering"],
    whySuggested: "Demonstrates rigorous policy analysis and institutional communication without tech startup assumptions.",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Frame the Policy Dilemma",
        instruction: "Summarize the core trade-off (e.g. banning diesel autorickshaws vs driver livelihood impact) in 3 clear sentences.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Review Empirical Evidence",
        instruction: "Extract air quality data and average driver conversion costs to ground the problem in reality.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Map Stakeholder Perspectives",
        instruction: "Identify priorities for three groups: daily commuters, vehicle owners, and the municipal transport board.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Formulate Phased Implementation",
        instruction: "Draft a 3-stage transition plan combining electric retrofitting subsidies with pilot zoning.",
      },
      {
        id: "step-5",
        stepNumber: 5,
        title: "Refine Executive Summary",
        instruction: "Polish a 100-word takeaway summarizing why this compromise delivers maximum public benefit.",
      },
    ],
  },

  // 14. First-Time Student / Open Discovery
  {
    id: "act_first_discovery",
    title: "Try Your First 5-Minute Practical Discovery Task",
    description: "Experience a quick, low-stakes micro-exploration to see how hands-on learning works on Next Move AI.",
    learningOutcome: "Low-pressure orientation, self-reflection, and beginning exploration momentum.",
    estimatedDuration: "5 mins",
    categories: ["Still Exploring", "General Discovery"],
    stages: ["classes-8-10", "classes-4-7", "classes-11-12"],
    whySuggested: "Welcomes first-time students with an easy, pressure-free first step.",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Pick a Passion Topic",
        instruction: "Think of one topic you found genuinely fun or fascinating over the last month.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Identify Why It Clicked",
        instruction: "Note whether it was fun because you were building, analyzing, helping, or discovering.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Ask One Big Question",
        instruction: "Write down one question about that topic you'd love to know the answer to.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Explore a Next Move",
        instruction: "Check out one activity or experiment connected to that question.",
      },
    ],
  },

  // 15. Returning Student / Continued Modeling
  {
    id: "act_continue_cash_flow",
    title: "Continue: 12-Month Cash Flow Statement Modeling",
    description: "You began this action yesterday. Complete the final two sensitivity formulas to finish your model.",
    learningOutcome: "Spreadsheet modeling, sensitivity analysis, and financial acumen.",
    estimatedDuration: "15 mins",
    categories: ["Finance & Accounting"],
    stages: ["degree-engineering"],
    whySuggested: "Resumes your active financial modeling activity.",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Review Cash Inflows",
        instruction: "Check your opening balances and verified customer payment streams from yesterday.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Audit Operating Expenses",
        instruction: "Ensure fixed expenses and payroll taxes are properly categorized across all quarters.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Build Best/Worst Case Scenarios",
        instruction: "Adjust sales projections down by 20% to model a conservative market downturn scenario.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Calculate Working Capital Cushion",
        instruction: "Check if the cash reserves remain above the minimum required solvency safety net.",
      },
      {
        id: "step-5",
        stepNumber: 5,
        title: "Finalize & Document",
        instruction: "Write a short summary of the sensitivity analysis takeaways.",
      },
    ],
  },
];

/**
 * Resolves TWO distinct, personalized activities for a student to choose between,
 * based on their Starting Point questionnaire data, primary focus, active interests,
 * and academic stage.
 * 
 * Each option represents a different approach:
 * e.g., Creative narrative vs. Hands-on physical invention
 *       Cross-stream comparison vs. Algorithmic logic
 *       Curriculum analysis vs. Real-world challenge
 */
export function getPersonalizedActivityPairForStudent(params: {
  startingPoint?: UserStartingPoint | null;
  academicStage?: string | null;
  activePersonaId?: string | null;
  isRealUser?: boolean;
}): [PersonalizedActivity, PersonalizedActivity] {
  const { startingPoint, academicStage, activePersonaId, isRealUser } = params;

  // 1. Starting Point Answers / Interests Matching (HIGHEST PRIORITY)
  if (startingPoint?.isCompleted && startingPoint.activeInterests && startingPoint.activeInterests.length > 0) {
    const primaryInterest = startingPoint.activeInterests[0];

    switch (primaryInterest) {
      case "Creativity & Media":
      case "Stories & Imagination":
        return [
          getActivityById("act_comic_story"),         // Creative storytelling approach
          getActivityById("act_cardboard_machine"),   // Hands-on invention/maker approach
        ];
      case "Technology & Building":
        return [
          getActivityById("act_cardboard_machine"),   // Practical engineering & prototyping
          getActivityById("act_secret_cipher"),       // Algorithmic logic & cryptography
        ];
      case "Nature & Environment":
        return [
          getActivityById("act_nature_journal"),      // Field observation & biodiversity
          getActivityById("act_kitchen_science"),     // Hands-on physics experiment
        ];
      case "Science & Discovery":
        return [
          getActivityById("act_kitchen_science"),     // Experimental density & buoyancy
          getActivityById("act_nature_journal"),      // Field nature journaling
        ];
      case "Helping & People":
        return [
          getActivityById("act_community_puzzle"),    // Collaborative civic problem solving
          getActivityById("act_comic_story"),         // Creative visual communication
        ];
      case "Problem Solving":
        return [
          getActivityById("act_secret_cipher"),       // Cryptographic puzzle & logic
          getActivityById("act_cardboard_machine"),   // Mechanical design & engineering
        ];
      case "Exploring Multiple Directions":
        return [
          getActivityById("act_multi_stream_mini_tasks"), // Multi-stream comparison
          getActivityById("act_secret_cipher"),           // Logic & pattern exploration
        ];
    }
  }

  // 2. Real Authenticated Student without Starting Point: Personalize based on Academic Stage
  if (isRealUser && academicStage) {
    const stage = academicStage.toLowerCase();
    if (stage.includes("4-7")) {
      return [getActivityById("act_comic_story"), getActivityById("act_cardboard_machine")];
    }
    if (stage.includes("8-10")) {
      return [getActivityById("act_multi_stream_mini_tasks"), getActivityById("act_secret_cipher")];
    }
    if (stage.includes("11-12")) {
      return [getActivityById("act_compare_ug_pathways"), getActivityById("act_multi_stream_mini_tasks")];
    }
    if (stage.includes("diploma")) {
      return [getActivityById("act_diploma_leet"), getActivityById("act_benchmark_sensor")];
    }
    if (stage.includes("engineering") || stage.includes("degree")) {
      return [getActivityById("act_benchmark_sensor"), getActivityById("act_bca_fastify")];
    }
    if (stage.includes("grad") || stage.includes("working")) {
      return [getActivityById("act_policy_brief"), getActivityById("act_cash_flow_model")];
    }
  }

  // 3. Dev Demo Persona alignment (for demo mode / testing suite compatibility)
  if (activePersonaId && !isRealUser) {
    switch (activePersonaId) {
      case "persona_a_class6":
        return [getActivityById("act_comic_story"), getActivityById("act_cardboard_machine")];
      case "persona_b_class9":
        return [getActivityById("act_multi_stream_mini_tasks"), getActivityById("act_secret_cipher")];
      case "persona_c_class12":
        return [getActivityById("act_compare_ug_pathways"), getActivityById("act_multi_stream_mini_tasks")];
      case "persona_d_diploma":
        return [getActivityById("act_diploma_leet"), getActivityById("act_benchmark_sensor")];
      case "persona_e_bca":
        return [getActivityById("act_bca_fastify"), getActivityById("act_benchmark_sensor")];
      case "persona_f_bcom":
        return [getActivityById("act_cash_flow_model"), getActivityById("act_policy_brief")];
      case "persona_g_engineering":
        return [getActivityById("act_benchmark_sensor"), getActivityById("act_bca_fastify")];
      case "persona_h_grad":
        return [getActivityById("act_policy_brief"), getActivityById("act_cash_flow_model")];
      case "persona_empty":
        return [getActivityById("act_first_discovery"), getActivityById("act_comic_story")];
      case "persona_returning_bcom":
        return [getActivityById("act_continue_cash_flow"), getActivityById("act_cash_flow_model")];
    }
  }

  // 4. Fallback based on Academic Stage
  const stage = (academicStage || "classes-4-7").toLowerCase();
  if (stage.includes("4-7")) {
    return [getActivityById("act_comic_story"), getActivityById("act_cardboard_machine")];
  }
  if (stage.includes("8-10")) {
    return [getActivityById("act_multi_stream_mini_tasks"), getActivityById("act_secret_cipher")];
  }
  if (stage.includes("11-12")) {
    return [getActivityById("act_compare_ug_pathways"), getActivityById("act_multi_stream_mini_tasks")];
  }
  if (stage.includes("diploma")) {
    return [getActivityById("act_diploma_leet"), getActivityById("act_benchmark_sensor")];
  }
  if (stage.includes("engineering") || stage.includes("degree")) {
    return [getActivityById("act_benchmark_sensor"), getActivityById("act_bca_fastify")];
  }
  if (stage.includes("grad") || stage.includes("working")) {
    return [getActivityById("act_policy_brief"), getActivityById("act_cash_flow_model")];
  }

  // Default safe fallback
  return [getActivityById("act_comic_story"), getActivityById("act_cardboard_machine")];
}

/**
 * Resolves the primary personalized activity for a student based on their:
 * - Starting Point questionnaire data (answers, primaryFocus, activeInterests)
 * - Academic stage / class
 * - Or active demo persona if in development testing
 */
export function getPersonalizedActivityForStudent(params: {
  startingPoint?: UserStartingPoint | null;
  academicStage?: string | null;
  activePersonaId?: string | null;
  isRealUser?: boolean;
}): PersonalizedActivity {
  return getPersonalizedActivityPairForStudent(params)[0];
}

/**
 * Returns alternative activities suitable for the student, excluding the currently active one.
 */
export function getAlternativeActivitiesForStudent(params: {
  startingPoint?: UserStartingPoint | null;
  academicStage?: string | null;
  currentActivityId?: string;
}): PersonalizedActivity[] {
  const { currentActivityId, academicStage } = params;
  const stage = (academicStage || "classes-4-7").toLowerCase();

  const filtered = PERSONALIZED_ACTIVITIES_CATALOG.filter((act) => {
    if (act.id === currentActivityId) return false;
    // Keep activities suitable for student's broad cohort or general interest
    if (stage.includes("4-7") || stage.includes("8-10")) {
      return act.stages.includes("classes-4-7") || act.stages.includes("classes-8-10");
    }
    return true;
  });

  return filtered.slice(0, 4);
}

/**
 * Helper to fetch activity by ID with fallback.
 */
export function getActivityById(activityId: string): PersonalizedActivity {
  const found = PERSONALIZED_ACTIVITIES_CATALOG.find((a) => a.id === activityId);
  return found || PERSONALIZED_ACTIVITIES_CATALOG[0];
}

/**
 * Converts a PersonalizedActivity to a full StudentNextMoveActivity state object.
 */
export function initializeStudentActivity(activity: PersonalizedActivity): StudentNextMoveActivity {
  return {
    activityId: activity.id,
    title: activity.title,
    description: activity.description,
    learningOutcome: activity.learningOutcome,
    estimatedDuration: activity.estimatedDuration,
    steps: activity.steps,
    completedStepIds: [],
    progressPercentage: 0,
    status: "not_started",
    createdAt: "",
    updatedAt: "",
    completedAt: null,
  };
}
