/**
 * NEXT MOVE AI V2 — FLOW 7: PROJECT STARTER CATALOG
 * 
 * Curated, age-appropriate, realistic project templates across all 6 academic cohorts.
 * Spans Technology, Design, Commerce, Humanities, Science, and Social Impact.
 * 
 * Epistemic Mandate:
 * - Projects build genuine portfolio evidence and self-clarity.
 * - Completing starter steps does NOT equate to automated professional certification.
 */

import { type ProjectTemplate } from "../types";

export const PROJECT_CATALOG: ProjectTemplate[] = [
  // ===========================================================================
  // 1. CLASSES 4–7: PLAYFUL CURIOSITY & MAKER PROJECTS (NO CAREER PRESSURE)
  // ===========================================================================
  {
    id: "proj_c47_nature_atlas",
    title: "Neighborhood Biodiversity Field Atlas",
    subtitle: "Observe, sketch, and classify 5 local plants or insects and their sunlight adaptations",
    stageSuitability: ["classes-4-7"],
    categoryId: "science_discovery",
    categoryLabel: "Science & Nature",
    difficulty: "beginner",
    estimatedHours: 4,
    problemStatement: "Many city neighborhoods have rich living ecosystems that students walk past every day without noticing.",
    learningObjectives: [
      "Practice empirical observation and outdoor scientific sketching.",
      "Understand how leaf surface area and insect behavior respond to temperature and light.",
    ],
    whatThisClarifies: "Whether you enjoy hands-on field biology, environmental observation, and botanical illustration.",
    starterSteps: [
      {
        title: "Field Exploration Walk",
        instruction: "Spend 20 minutes in a nearby park or garden. Take photos or pencil sketches of 5 different living plants or insects.",
        guidanceTip: "Look under leaves and around tree bark for tiny camouflaged creatures.",
      },
      {
        title: "Botanical Observation Log",
        instruction: "Note the leaf shape, texture, flower color, and where each plant was growing (in deep shade vs direct sun).",
        guidanceTip: "Measure leaf length with a standard 15cm school ruler.",
      },
      {
        title: "Atlas Layout & Reflection",
        instruction: "Combine your sketches into a 2-page handwritten or digital mini-atlas with captions explaining what surprised you.",
        guidanceTip: "Include what each creature might eat or how the plant collects rainwater.",
      },
    ],
    deliverableSuggestions: ["2-page illustrated field journal PDF or scanned photo page"],
    relatedPathwayIds: ["pw_c47_nature", "path_c47_science"],
    tags: ["Nature", "Biology", "Drawing", "Classes 4-7"],
  },
  {
    id: "proj_c47_stopmotion_comic",
    title: "3-Scene Stop-Motion Character Comic",
    subtitle: "Build a clay or paper character and storyboard an obstacle-overcoming adventure",
    stageSuitability: ["classes-4-7"],
    categoryId: "creativity",
    categoryLabel: "Creativity & Storytelling",
    difficulty: "beginner",
    estimatedHours: 5,
    problemStatement: "Great animation begins with structured visual pacing and expressive character emotion, not expensive software.",
    learningObjectives: [
      "Master narrative pacing: Setup, Complication, Resolution.",
      "Experiment with visual storytelling, facial expressions, and camera angles.",
    ],
    whatThisClarifies: "Whether you enjoy character design, creative directing, and animation storytelling.",
    starterSteps: [
      {
        title: "Character Design & Motivation",
        instruction: "Create a simple character (from clay, paper cutout, or Lego). Decide what their goal is and what problem stands in their way.",
        guidanceTip: "Give your character one distinctive feature, like oversized glasses or a bright scarf.",
      },
      {
        title: "3-Panel Storyboard",
        instruction: "Draw three rectangular frames showing: 1) The goal, 2) The obstacle, 3) The creative workaround.",
        guidanceTip: "Focus on clear silhouette shapes so the action is easy to read at a glance.",
      },
      {
        title: "Photo Capture or Animated Slides",
        instruction: "Take 6 to 12 smartphone photos shifting the character slightly, or assemble slides into an animated flipbook.",
        guidanceTip: "Keep the phone steady on a stack of books for consistent framing.",
      },
    ],
    deliverableSuggestions: ["Storyboard photo strip or short 10-second animation video/GIF"],
    relatedPathwayIds: ["pw_c47_storyteller", "path_c47_animation"],
    tags: ["Animation", "Storytelling", "Art", "Classes 4-7"],
  },

  // ===========================================================================
  // 2. CLASSES 8–10: FOUNDATIONAL EXPLORATION & SUBJECT APPLICATION
  // ===========================================================================
  {
    id: "proj_c810_pop_up_bakery_plan",
    title: "Weekend Pop-Up Bakery Unit Economics & Menu Plan",
    subtitle: "Calculate ingredient costs, pricing margins, and break-even sales for a community dessert stall",
    stageSuitability: ["classes-8-10"],
    categoryId: "business_entrepreneurship",
    categoryLabel: "Commerce & Business",
    difficulty: "beginner",
    estimatedHours: 6,
    problemStatement: "Many first-time entrepreneurs confuse revenue with profit, forgetting ingredient costs, packaging, and electricity.",
    learningObjectives: [
      "Calculate Cost of Goods Sold (COGS) and gross margin percentages.",
      "Understand fixed versus variable overhead costs in a real food business.",
    ],
    whatThisClarifies: "Whether you enjoy commercial math, entrepreneurship planning, and product pricing strategy.",
    starterSteps: [
      {
        title: "Menu & Recipe Formulation",
        instruction: "Select 3 baked items (e.g. chocolate brownies, banana bread, lemon cookies) and list precise batch quantities of flour, sugar, butter, and chocolate.",
        guidanceTip: "Use retail grocery packet prices to find cost per gram.",
      },
      {
        title: "Costing & Margin Spreadsheet",
        instruction: "Calculate the exact ingredient cost per single portion, add packaging (box, butter paper), and model a 65% gross margin price.",
        guidanceTip: "Selling Price = Ingredient Cost / (1 - Desired Gross Margin).",
      },
      {
        title: "Break-Even & Sensitivity Analysis",
        instruction: "If table rental costs ₹500, calculate how many brownies must be sold to cover all costs before making the first rupee of profit.",
        guidanceTip: "Break-Even Units = Fixed Costs / (Selling Price - Variable Cost per Unit).",
      },
    ],
    deliverableSuggestions: ["1-page cost model spreadsheet or handwritten pricing ledger"],
    relatedPathwayIds: ["pw_c810_commerce", "path_c810_entrepreneurship"],
    tags: ["Commerce", "Accounting", "Unit Economics", "Classes 8-10"],
  },
  {
    id: "proj_c810_pocket_budget_app",
    title: "Personal Savings & Expense Tracker in Python",
    subtitle: "Build a command-line script that categorizes expenses and tracks progress toward a savings goal",
    stageSuitability: ["classes-8-10"],
    categoryId: "technology",
    categoryLabel: "Technology & Software",
    difficulty: "intermediate",
    estimatedHours: 8,
    problemStatement: "Writing simple programs that solve personal daily frictions builds real computational confidence faster than dry syntax drills.",
    learningObjectives: [
      "Master Python data structures: lists, dictionaries, and file I/O for persistent storage.",
      "Implement user input validation and summary statistics calculation.",
    ],
    whatThisClarifies: "Whether you enjoy algorithmic problem-solving and software tool creation.",
    starterSteps: [
      {
        title: "CLI Data Architecture Design",
        instruction: "Design a data structure holding date, category (food, books, travel), and amount. Write a menu loop offering: Add Expense, View Total, Set Goal.",
        guidanceTip: "Use a Python dictionary `{'date': '...', 'category': '...', 'amount': 150.0}`.",
      },
      {
        title: "File Storage & Category Rollup",
        instruction: "Implement saving and loading from a simple CSV or JSON file so data is preserved between terminal runs.",
        guidanceTip: "Use Python's built-in `json` module with `json.dump` and `json.load`.",
      },
      {
        title: "Summary Output & Edge Testing",
        instruction: "Print a clear ASCII summary showing total spent per category and remaining budget towards a savings target.",
        guidanceTip: "Test what happens if the user enters letters instead of a number for the amount.",
      },
    ],
    deliverableSuggestions: ["Python script `.py` file or GitHub repository link"],
    relatedPathwayIds: ["pw_c810_tech", "path_c810_cs"],
    tags: ["Python", "Coding", "Software", "Classes 8-10"],
  },

  // ===========================================================================
  // 3. CLASSES 11–12: STREAM-ALIGNED PRACTICAL APPLICATIONS
  // ===========================================================================
  {
    id: "proj_c1112_working_capital_model",
    title: "SME Working Capital & Cash Flow Stress Test Model",
    subtitle: "Model a 12-month cash cycle for an apparel brand facing delayed receivables and seasonal demand peaks",
    stageSuitability: ["classes-11-12"],
    categoryId: "business_entrepreneurship",
    categoryLabel: "Commerce & Finance",
    difficulty: "intermediate",
    estimatedHours: 10,
    problemStatement: "Rapidly growing small businesses frequently go bankrupt despite strong sales because cash is trapped in unpaid client invoices.",
    learningObjectives: [
      "Build a dynamic 12-month cash flow forecast distinguishing accrual profit from liquid cash reserves.",
      "Evaluate Days Sales Outstanding (DSO) and working capital credit facilities.",
    ],
    whatThisClarifies: "Whether corporate finance, commercial banking, and business advisory are appealing educational paths.",
    starterSteps: [
      {
        title: "Revenue & Collections Schedule",
        instruction: "Model monthly sales of ₹10L–₹25L with 70% of clients paying on 60-day credit and 30% paying immediately.",
        guidanceTip: "Cash collected in month t = 30% of sales(t) + 70% of sales(t-2).",
      },
      {
        title: "Payables & Fixed Overhead Outflows",
        instruction: "Incorporate supplier invoice disbursements (30-day term), monthly workshop rent, and staff payroll due on the 1st of every month.",
        guidanceTip: "Identify the minimum cash balance trough across the 12-month horizon.",
      },
      {
        title: "Mitigation Scenarios & Trade-offs",
        instruction: "Compare two remedies for cash deficits: 1) Invoice factoring at 3% discount, 2) Bank overdraft at 14% interest.",
        guidanceTip: "Document which option protects customer goodwill while minimizing financing fees.",
      },
    ],
    deliverableSuggestions: ["Google Sheets / Excel financial model with scenario switch"],
    relatedPathwayIds: ["pw_bcom_finance", "path_c1112_commerce"],
    tags: ["Commerce", "Finance", "Cash Flow", "Financial Modeling", "Classes 11-12"],
  },
  {
    id: "proj_c1112_algovis_dashboard",
    title: "Algorithm Complexity Benchmark Visualizer",
    subtitle: "Build a front-end visualizer comparing Linear O(n), Binary O(log n), and Quadratic O(n²) sorting steps",
    stageSuitability: ["classes-11-12"],
    categoryId: "technology",
    categoryLabel: "Computer Science",
    difficulty: "intermediate",
    estimatedHours: 12,
    problemStatement: "Textbook Big-O formulas are abstract; interactive visual steps make algorithm scaling concrete and intuitive.",
    learningObjectives: [
      "Implement step-by-step state visualization for search and sort algorithms.",
      "Understand benchmark metrics: clock time versus operation comparison counts.",
    ],
    whatThisClarifies: "Whether software engineering, data structures, and computer science theory align with your goals.",
    starterSteps: [
      {
        title: "Array State & Animation Loop",
        instruction: "Render an array of 20–50 randomized vertical bars in HTML/Canvas or Python Pygame.",
        guidanceTip: "Use color coding (e.g. green = compared, red = swapped, purple = sorted).",
      },
      {
        title: "Algorithm Implementation",
        instruction: "Implement Bubble Sort O(n²), Insertion Sort, and Binary Search, yielding state after each comparison.",
        guidanceTip: "Use `async/await` with `setTimeout` to control animation speed without blocking the browser thread.",
      },
      {
        title: "Operation Counter & Complexity Graph",
        instruction: "Add live counters for 'Comparisons' and 'Swaps' so students can see why O(n log n) crushes O(n²) as size increases.",
        guidanceTip: "Test with array sizes 10, 50, and 100 to show quadratic growth.",
      },
    ],
    deliverableSuggestions: ["Interactive web page, CodeSandbox link, or GitHub repo"],
    relatedPathwayIds: ["path_c1112_btech_cs", "pw_tech_cs"],
    tags: ["Computer Science", "Algorithms", "Web Dev", "Classes 11-12"],
  },

  // ===========================================================================
  // 4. DIPLOMA: APPLIED INDUSTRIAL & TECHNICAL SYSTEMS
  // ===========================================================================
  {
    id: "proj_dip_plc_conveyor_audit",
    title: "Dual-Sensor Conveyor Interlock Wiring & Logic Spec",
    subtitle: "Design a ladder logic safety interlock and circuit wiring schematic for an automated sorting line",
    stageSuitability: ["diploma"],
    categoryId: "technology",
    categoryLabel: "Industrial Automation",
    difficulty: "intermediate",
    estimatedHours: 12,
    problemStatement: "In manufacturing plants, unexpected sensor failure or safety gate breaches must immediately shut down drive motors without damaging goods.",
    learningObjectives: [
      "Design fail-safe normally-closed (NC) emergency stop circuits.",
      "Formulate ladder logic rungs for photocell part detection, motor run latching, and overload tripping.",
    ],
    whatThisClarifies: "Whether mechatronics, industrial electrical maintenance, and plant automation are areas you enjoy.",
    starterSteps: [
      {
        title: "I/O Hardware Address Mapping",
        instruction: "List all digital inputs (Start PB, E-Stop NC, Jam Photocell, Thermal Relay) and outputs (Main Contactor, Jam Beacon, Alarm Horn).",
        guidanceTip: "Standardize naming with PLC register tags (e.g. `DI_01`, `DQ_04`).",
      },
      {
        title: "Ladder Logic Schematic",
        instruction: "Draft the ladder logic diagram incorporating seal-in motor latching and safety interlock rungs.",
        guidanceTip: "Always place hardware E-Stop contacts in series before software coil energization.",
      },
      {
        title: "Failure Mode & Diagnostics Guide",
        instruction: "Document 3 realistic fault scenarios (photo-eye misalignment, motor thermal trip, welded contactor) and technician troubleshooting procedures.",
        guidanceTip: "Include virtual simulation multimeter voltage test points.",
      },
    ],
    deliverableSuggestions: ["Circuit schematic PDF, Ladder diagram CAD, or technical maintenance memo"],
    relatedPathwayIds: ["pw_dip_mechatronics", "path_dip_mech"],
    tags: ["PLC", "Automation", "Mechatronics", "Electrical Safety", "Diploma"],
  },

  // ===========================================================================
  // 5. DEGREE / ENGINEERING: CAPABILITY & PORTFOLIO READY SYSTEMS
  // ===========================================================================
  {
    id: "proj_deg_distributed_cache",
    title: "Distributed In-Memory Key-Value Store with Consistent Hashing",
    subtitle: "Build a multi-node cache server in Go/Node.js featuring consistent hash ring partition and TTL expiration",
    stageSuitability: ["degree-engineering"],
    categoryId: "technology",
    categoryLabel: "Backend Engineering",
    difficulty: "advanced",
    estimatedHours: 20,
    problemStatement: "Monolithic databases crumble under peak traffic spikes; distributed caching is the foundational layer of modern cloud scale.",
    learningObjectives: [
      "Implement a Consistent Hashing ring with virtual nodes to minimize cache re-mapping when nodes fail or join.",
      "Understand concurrency controls, mutex locks, and LRU eviction policies.",
    ],
    whatThisClarifies: "Whether backend systems engineering, distributed infrastructure, and cloud architecture match your ambitions.",
    starterSteps: [
      {
        title: "Node Hash Ring Algorithm",
        instruction: "Implement a circular ring using SHA-256 where each cache server maps to multiple virtual tokens on the hash circle.",
        guidanceTip: "Virtual nodes prevent hotspot clustering on single physical nodes.",
      },
      {
        title: "Concurrent Storage Engine & LRU Eviction",
        instruction: "Build thread-safe memory storage supporting GET, SET with TTL, and Least-Recently-Used eviction when memory ceiling is reached.",
        guidanceTip: "Combine a doubly-linked list with a hash map for O(1) LRU eviction.",
      },
      {
        title: "Benchmark Harness & Failure Simulation",
        instruction: "Write a client benchmark sending 10,000 concurrent requests; simulate node failure and measure key migration percentage.",
        guidanceTip: "Verify that removing 1 of N nodes only invalidates 1/N of total cached keys.",
      },
    ],
    deliverableSuggestions: ["GitHub repository with architecture README and benchmark charts"],
    relatedPathwayIds: ["path_c1112_btech_cs", "pw_ai_systems"],
    tags: ["Backend", "Distributed Systems", "Go", "Cloud Architecture", "Degree"],
  },
  {
    id: "proj_deg_fintech_onboarding_ux",
    title: "Fintech Mobile Onboarding Heuristic Audit & Prototype",
    subtitle: "Audit user drop-off across 3 live banking apps and redesign a frictionless, accessible identity verification flow",
    stageSuitability: ["degree-engineering", "final-year-grad"],
    categoryId: "creativity",
    categoryLabel: "Product & UX Design",
    difficulty: "intermediate",
    estimatedHours: 15,
    problemStatement: "Financial apps lose over 40% of first-time signups due to confusing document upload errors, dark patterns, and lack of visual feedback.",
    learningObjectives: [
      "Apply Nielsen Norman 10 Usability Heuristics to mobile financial onboarding.",
      "Design an accessible, high-contrast Figma wireframe sequence with explicit error prevention states.",
    ],
    whatThisClarifies: "Whether product design, UX research, and product management are career paths you thrive in.",
    starterSteps: [
      {
        title: "Comparative Friction Benchmark",
        instruction: "Record screenshots of 3 leading apps during account creation. Document friction points using the Nielsen Norman heuristic framework.",
        guidanceTip: "Look specifically for vague error messages (e.g. 'Invalid input' without explaining format).",
      },
      {
        title: "Information Architecture & Flow Redesign",
        instruction: "Map the improved user journey, separating identity upload into progressive disclosure steps with live camera framing guides.",
        guidanceTip: "Reduce required text inputs by using camera OCR and auto-filling details.",
      },
      {
        title: "Interactive Figma Prototype",
        instruction: "Create clickable mobile frames (390px) demonstrating happy path, document retry state, and clear security assurance badges.",
        guidanceTip: "Ensure all text meets WCAG AA contrast (4.5:1) and tap targets are at least 44x44px.",
      },
    ],
    deliverableSuggestions: ["Figma prototype link or comprehensive UX audit slide deck"],
    relatedPathwayIds: ["pw_c1112_design", "path_grad_fellowship"],
    tags: ["UX Design", "Figma", "Fintech", "Product Management", "Degree"],
  },

  // ===========================================================================
  // 6. FINAL-YEAR / GRADUATES: VENTURE, RESEARCH & EMPLOYMENT READINESS
  // ===========================================================================
  {
    id: "proj_grad_saas_metrics_dashboard",
    title: "SaaS Unit Economics & Cohort Retention Analytics Suite",
    subtitle: "Analyze raw subscription transaction logs to compute CAC Payback, Monthly Logo Churn, and Net Dollar Retention (NDR)",
    stageSuitability: ["final-year-grad"],
    categoryId: "business_entrepreneurship",
    categoryLabel: "Venture Analytics",
    difficulty: "advanced",
    estimatedHours: 18,
    problemStatement: "Startups often celebrate high top-line subscriber growth while quietly leaking revenue due to customer churn and unrecovered acquisition spend.",
    learningObjectives: [
      "Formulate cohort-based retention matrices (Month 0 to Month 12).",
      "Calculate Net Dollar Retention (NDR) including expansion, contraction, and cancellation MRR.",
    ],
    whatThisClarifies: "Whether startup operations, venture capital analysis, or chief-of-staff roles suit your capabilities.",
    starterSteps: [
      {
        title: "Transaction Data Ingestion & Sanitization",
        instruction: "Import 1,000 synthetic transaction records with customer signups, monthly charges, tier upgrades, and cancellation timestamps.",
        guidanceTip: "Categorize revenue into New MRR, Expansion MRR, Contraction MRR, and Churned MRR.",
      },
      {
        title: "Cohort Retention Heatmap",
        instruction: "Generate a triangle cohort matrix showing the percentage of each monthly signup batch that remains active 3, 6, and 12 months later.",
        guidanceTip: "A healthy B2B SaaS cohort curve flattens into a horizontal asymptote.",
      },
      {
        title: "Executive Synthesis & Strategy Memo",
        instruction: "Write a 2-page investment memorandum diagnosing whether the business is ready for venture scaling or needs onboarding retention fixes first.",
        guidanceTip: "Benchmark against industry health standard: CAC Payback < 12 months, NDR > 110%.",
      },
    ],
    deliverableSuggestions: ["Interactive Python/Pandas dashboard or spreadsheet executive summary PDF"],
    relatedPathwayIds: ["path_grad_bootstrapped_saas", "pw_corporate_finance"],
    tags: ["SaaS", "Unit Economics", "Venture Capital", "Analytics", "Graduate"],
  },
  {
    id: "proj_grad_media_bias_factcheck",
    title: "Investigative Source Fact-Checking Protocol & Editorial Styleguide",
    subtitle: "Establish an empirical verification handbook for digital newsrooms cross-referencing whistleblower leaks against municipal records",
    stageSuitability: ["final-year-grad"],
    categoryId: "social_impact",
    categoryLabel: "Journalism & Media Ethics",
    difficulty: "intermediate",
    estimatedHours: 15,
    problemStatement: "In an era of hyper-accelerated digital news cycles, viral unverified allegations damage journalistic credibility and public trust.",
    learningObjectives: [
      "Develop structured verification protocols for unauthenticated documents and anonymous sources.",
      "Standardize fair-comment and right-of-reply timelines adhering to press ethics jurisprudence.",
    ],
    whatThisClarifies: "Whether investigative journalism, media law, and public communications match your career direction.",
    starterSteps: [
      {
        title: "Verification Heuristics Matrix",
        instruction: "Create a 5-step verification checklist: Document Metadata Analysis, Corroborating Public Records, On-the-Record Witness Interviews, Satellite/Geospatial Cross-Check, and Legal Defamation Review.",
        guidanceTip: "Require at least two independent primary documents before publishing institutional allegations.",
      },
      {
        title: "Right-of-Reply Standard Operating Procedure",
        instruction: "Draft standard written query templates offering accused entities specific detailed claims with reasonable 24–48 hour response windows.",
        guidanceTip: "Clarify the legal distinction between reporting a public servant's official denial vs omitting their perspective.",
      },
      {
        title: "Case Study Audit & Newsroom Handbook",
        instruction: "Compile the protocol into a 6-page practical newsroom handbook with red-flag trigger phrases that editors must scrub from straight news copy.",
        guidanceTip: "Include an appendix on protecting anonymous whistleblower digital security (Signal, PGP, metadata scrubbing).",
      },
    ],
    deliverableSuggestions: ["Comprehensive 6-page Editorial Verification Handbook PDF"],
    relatedPathwayIds: ["pw_media_comm", "path_grad_fellowship"],
    tags: ["Journalism", "Media Ethics", "Fact Checking", "Public Policy", "Graduate"],
  },
];

