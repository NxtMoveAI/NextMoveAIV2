/**
 * NEXT MOVE AI V2 — FLOW 6: PRACTICAL EXPERIENTIAL TRIAL CATALOGUE
 * 
 * Age-appropriate, hands-on micro-challenges across all 6 academic stages.
 * Strictly adheres to:
 * - "We don't decide careers; we enable clarity."
 * - Flexible suggested durations, zero artificial urgency countdowns.
 * - Classes 4–7 strictly curiosity and maker themes; no corporate titles or grades.
 * - Genuine problem statements with step-by-step participation, hints, and reflections.
 */

import { type TrialActivity } from "../types";

export const TRIAL_CATALOG: TrialActivity[] = [
  // ===========================================================================
  // STAGE 1: CLASSES 4–7 (Curiosity Themes: Story, Nature, Maker)
  // Strictly zero adult career titles, corporate jobs, or salary mentions
  // ===========================================================================
  {
    id: "trial_c47_story_hero",
    title: "The 3-Panel Hero Adventure",
    subtitle: "Sketching character emotions and drawing a comic strip solution",
    stageSuitability: ["classes-4-7"],
    categoryId: "creativity",
    categoryLabel: "Creativity & Media",
    relatedPathwayId: "path_c47_story_worlds",
    relatedPathwayTitle: "Visual Storytelling & Comic Worlds",
    format: "creative_prompt",
    suggestedMinutes: 20,
    learningObjective: "Practise sequential visual storytelling by drawing three comic panels with a clear problem and creative resolution.",
    scenarioBackground: "Sparky is an eager young inventor robot who wants to help a wet puppy caught in sudden rain. Sparky only has a cardboard box, an umbrella, and metal wheels. How does Sparky solve this problem?",
    instructions: [
      "Panel 1: Sketch Sparky discovering the shivering puppy in the rain.",
      "Panel 2: Show Sparky facing a challenge (e.g., clumsily holding the umbrella with round robot hands).",
      "Panel 3: Show the happy resolution (Sparky builds a cozy shelter with the box and shares the umbrella).",
    ],
    optionalHints: [
      "Focus on facial expressions: big round eyes for surprise, arched eyebrows for determination, and wide smiles for relief.",
      "Use speech bubbles or sound effects like 'Pitter-Patter!' or 'Clank!' to make your comic lively.",
    ],
    content: {
      format: "creative_prompt",
      payload: {
        contextSummary: "Visual storytelling teaches how to organize thoughts into an engaging sequence that others can understand.",
        promptSteps: [
          "Divide a plain sheet of paper into 3 rectangular comic panels.",
          "Draw Panel 1: Establish the setting (rainy day) and introduce Sparky and the puppy.",
          "Draw Panel 2: Introduce the silly obstacle Sparky faces while trying to help.",
          "Draw Panel 3: Illustrate the creative team-up that keeps both dry and happy.",
        ],
        materialsSuggested: [
          "Pencil and eraser",
          "Black pen or fine marker for outlines",
          "Crayons or color pencils",
        ],
        rubricChecklist: [
          "Did I show 3 clear story beats (Beginning, Middle obstacle, Ending)?",
          "Can a friend understand what happened just by looking at the pictures?",
          "Did I express emotions through the characters' eyes and postures?",
        ],
        sampleInspirations: [
          "Calvin and Hobbes by Bill Watterson",
          "Tintin comic adventures",
          "Classic newspaper comic strips",
        ],
      },
    },
    competencyPractised: "Visual Storytelling & Emotion Expression",
    whatThisClarifies: "Whether you enjoy expressing ideas through visual character drawing rather than just writing plain text.",
    tags: ["Drawing", "Comics", "Storytelling", "Middle School", "Art"],
  },
  {
    id: "trial_c47_nature_journal",
    title: "Backyard Eco-Detective Field Journal",
    subtitle: "Observing local plant patterns and sketching habitat adaptations",
    stageSuitability: ["classes-4-7"],
    categoryId: "science_discovery",
    categoryLabel: "Science & Discovery",
    relatedPathwayId: "path_c47_nature_lab",
    relatedPathwayTitle: "Nature Observation & Habitat Journals",
    format: "creative_prompt",
    suggestedMinutes: 20,
    learningObjective: "Observe real living plants or insects in your garden or balcony, recording physical details like a naturalist.",
    scenarioBackground: "Every leaf shape, bark texture, and insect color is a clever adaptation for survival. Historic scientists like Charles Darwin and Beatrix Potter carried notebooks everywhere to sketch what they saw.",
    instructions: [
      "Find 2 different leaves or flowers from nearby plants (or safely observe an outdoor tree).",
      "Sketch the vein patterns, leaf margins (smooth vs jagged), and sunlight exposure.",
      "Write down 3 questions about why you think the plant grew that way.",
    ],
    optionalHints: [
      "Use the side of your pencil to do a gentle 'leaf rubbing' to capture the vein network accurately.",
      "Notice if the leaves feel waxy, hairy, or soft to the touch.",
    ],
    content: {
      format: "creative_prompt",
      payload: {
        contextSummary: "Natural science begins with patient looking and asking curious questions about everyday living things.",
        promptSteps: [
          "Select two contrasting plants or leaves from your neighborhood or balcony.",
          "Sketch each leaf with attention to vein symmetry and serrated edges.",
          "Note the direction of sunlight and soil moisture around the plant.",
          "Write 3 'I wonder why...' hypotheses in your journal.",
        ],
        materialsSuggested: [
          "Notebook or sketchbook",
          "Soft drawing pencil (2B or HB)",
          "Magnifying glass (optional)",
        ],
        rubricChecklist: [
          "Did I capture the distinctive vein pattern of each leaf?",
          "Did I record where each specimen was growing?",
          "Did I form curious questions instead of just naming the plant?",
        ],
      },
    },
    competencyPractised: "Natural Observation & Field Documentation",
    whatThisClarifies: "Whether you enjoy investigating biological living systems in the real world.",
    tags: ["Nature", "Biology", "Observation", "Field Science", "Curiosity"],
  },
  {
    id: "trial_c47_gadget_lever",
    title: "Cardboard Kinetic Lever Challenge",
    subtitle: "Designing a moving mechanical arm using simple pivot principles",
    stageSuitability: ["classes-4-7"],
    categoryId: "technology",
    categoryLabel: "Technology & Software",
    relatedPathwayId: "path_c47_gadgets_makers",
    relatedPathwayTitle: "Makerspace Inventions, Electronics & Levers",
    format: "creative_prompt",
    suggestedMinutes: 25,
    learningObjective: "Understand how pivot points, levers, and linkages transform small hand movements into larger mechanical reaches.",
    scenarioBackground: "Robotic arms on Mars rovers and construction cranes all rely on simple mechanical levers. By connecting cardboard strips with split pins, you can build a working extending grabber arm.",
    instructions: [
      "Cut 4 equal strips of recycled cardboard (approx. 15 cm long).",
      "Punch holes at the ends and centers of the strips.",
      "Join them in an 'X' scissor linkage using brass split pins or paper clips.",
      "Test pushing and pulling the handles to see the grabber extend.",
    ],
    optionalHints: [
      "Ensure the pivot holes aren't too tight; the strips need to rotate freely.",
      "Reinforce hole edges with a tiny square of tape so the cardboard doesn't tear.",
    ],
    content: {
      format: "creative_prompt",
      payload: {
        contextSummary: "Mechanical design starts with understanding how physical objects pivot, push, and balance force.",
        promptSteps: [
          "Measure and cut 4 sturdy cardboard strips of identical size.",
          "Mark pivot holes at 1 cm from each end and exactly in the middle.",
          "Assemble two pairs of criss-crossed strips into a pantograph scissor linkage.",
          "Attach small eraser heads or rubber bands at the tip to grip a light object.",
        ],
        materialsSuggested: [
          "Cardboard cereal box or shipping box",
          "Scissors (with adult supervision if needed)",
          "Paper fasteners (split pins) or bread twist-ties",
          "Ruler and pencil",
        ],
        rubricChecklist: [
          "Do all 4 linkages rotate smoothly around their pivot centers?",
          "Does the linkage extend straight forward without buckling sideways?",
          "Can it gently clasp a small ball of paper?",
        ],
      },
    },
    competencyPractised: "Mechanical Reasoning & Physical Prototyping",
    whatThisClarifies: "Whether you enjoy building physical moving mechanisms more than digital on-screen tasks.",
    tags: ["Robotics", "Makerspace", "Invention", "Mechanics", "Hands-on"],
  },

  // ===========================================================================
  // STAGE 2: CLASSES 8–10 (Foundations, Streams & Problem-Solving)
  // ===========================================================================
  {
    id: "trial_c810_code_logic",
    title: "Python Algorithm & Bug Detective",
    subtitle: "Troubleshooting an off-by-one loop error in temperature analysis",
    stageSuitability: ["classes-8-10"],
    categoryId: "technology",
    categoryLabel: "Technology & Software",
    relatedPathwayId: "path_c810_comp_science",
    relatedPathwayTitle: "Computer Coding & Web Application Foundations",
    format: "logic_simulation",
    suggestedMinutes: 20,
    learningObjective: "Inspect a failing Python algorithm, identify loop boundary conditions, and verify the correct average calculation.",
    scenarioBackground: "A school weather station records hourly temperature readings. The junior developer wrote a Python script to compute the 7-day average temperature, but it crashes on the last day with an 'IndexError' and miscalculates total readings.",
    instructions: [
      "Inspect the buggy script snippet provided.",
      "Review the failing test case when passing an array of 7 temperatures.",
      "Select the correct algorithmic fix that prevents the array index out of bounds.",
    ],
    optionalHints: [
      "In Python, list indexes run from 0 to len(list) - 1. When a loop checks `index <= len(list)`, it attempts to read beyond the end.",
      "Check both the loop termination condition and the divisor used for computing the mean.",
    ],
    content: {
      format: "logic_simulation",
      payload: {
        contextSummary: "Algorithmic thinking requires tracing variable states step-by-step to spot subtle boundary bugs.",
        initialCodeOrState: `def calculate_weekly_average(temperatures):\n    total = 0\n    # BUG HERE: index range check\n    for i in range(len(temperatures) + 1):\n        total += temperatures[i]\n    return total / len(temperatures)`,
        problemDescription: "The loop iterates `range(len(temperatures) + 1)`, attempting to access index 7 on a 7-element list (valid indices 0 to 6), throwing IndexError.",
        testCases: [
          {
            input: "[28, 30, 29, 31, 27, 26, 29]",
            expectedOutput: "28.57",
            explanation: "Sum of 7 days (200) divided by 7 days = 28.57°C.",
          },
        ],
        fixOptions: [
          {
            id: "fix_1",
            label: "Option A: Iterate directly over elements with 'for temp in temperatures'",
            codeChange: `def calculate_weekly_average(temperatures):\n    if not temperatures:\n        return 0.0\n    return sum(temperatures) / len(temperatures)`,
            isCorrectApproach: true,
            explanation: "Idiomatic Python avoids manual indexing entirely by using `sum()` or a direct iterator, eliminating off-by-one errors and safely handling empty inputs.",
          },
          {
            id: "fix_2",
            label: "Option B: Change range to 'range(len(temperatures) - 1)'",
            codeChange: `for i in range(len(temperatures) - 1):\n    total += temperatures[i]`,
            isCorrectApproach: false,
            explanation: "This creates another bug by skipping the final element of the array entirely, calculating an inaccurate 6-day average.",
          },
          {
            id: "fix_3",
            label: "Option C: Wrap in a try/except block without fixing the range",
            codeChange: `try:\n    for i in range(len(temperatures) + 1):\n        total += temperatures[i]\nexcept IndexError:\n    pass`,
            isCorrectApproach: false,
            explanation: "Masks the bug with exception handling instead of writing clean, predictable boundary conditions.",
          },
        ],
      },
    },
    competencyPractised: "Algorithmic Debugging & Boundary Tracing",
    whatThisClarifies: "Whether you enjoy systematic deductive problem solving and coding syntax.",
    tags: ["Python", "Algorithms", "Debugging", "Logic", "Computer Science"],
  },
  {
    id: "trial_c810_civic_policy",
    title: "School Safety Civic Policy Memo",
    subtitle: "Drafting a structured 250-word proposal to fix school pedestrian bottlenecks",
    stageSuitability: ["classes-8-10"],
    categoryId: "social_impact",
    categoryLabel: "Social Impact & People",
    relatedPathwayId: "path_c810_humanities_policy",
    relatedPathwayTitle: "Humanities, Public Voice & Social Enquiry",
    format: "case_critique",
    suggestedMinutes: 20,
    learningObjective: "Structure an evidence-backed civic proposal distinguishing root causes from emotional complaints, offering practical low-cost municipal solutions.",
    scenarioBackground: "Every afternoon, the street outside your school becomes congested with parked autorickshaws, parents on scooters, and students crossing in chaotic traffic. The school administration wants to appeal to the city municipal corporation.",
    instructions: [
      "Review the 3 stakeholder perspectives (Students, Parents, Municipal Traffic Police).",
      "Draft a 3-part policy memorandum proposing two low-cost municipal changes.",
      "Address the main counter-argument from motorists.",
    ],
    optionalHints: [
      "Focus on low-cost physical interventions: painted zebra crossings, staggered 15-minute school dispersal times, or designated pickup zones 100 meters away.",
      "Strong arguments use facts and safety data rather than angry blame.",
    ],
    content: {
      format: "case_critique",
      payload: {
        contextSummary: "Public policy is the art of solving shared community friction through clear analysis, empathy, and practical administration.",
        briefText: "Issue: School gate arterial road congestion causing near-miss pedestrian accidents between 3:15 PM and 3:45 PM on weekdays.",
        stakeholders: [
          "Students & Pedestrians: Need safe, unblocked walking paths and zebra crossings.",
          "Van & Auto Drivers: Need a quick place to wait without getting penalized by traffic police.",
          "City Municipal Police: Limited officers available; cannot station two cops at every school gate daily.",
        ],
        keyQuestions: [
          "What is the single root physical cause of the 30-minute traffic spike?",
          "What low-cost intervention can the school implement immediately without waiting for state government budget approval?",
          "How can parent volunteers or student traffic wardens assist sustainably?",
        ],
        guidingRubric: [
          {
            criterion: "Root Cause Clarity",
            considerations: "Identifies infrastructural and scheduling bottlenecks rather than just blaming bad drivers.",
          },
          {
            criterion: "Practical Feasibility",
            considerations: "Proposes actionable ideas (staggered bell schedules, dedicated pickup bays) that cost little to no money.",
          },
          {
            criterion: "Balanced Perspective",
            considerations: "Acknowledges the real constraints of auto drivers and traffic police.",
          },
        ],
      },
    },
    competencyPractised: "Civic Problem Framing & Policy Writing",
    whatThisClarifies: "Whether you thrive in public policy, legal argumentation, sociology, and community advocacy.",
    tags: ["Policy", "Humanities", "Civics", "Debate", "Social Science"],
  },
  {
    id: "trial_c810_cash_flow",
    title: "Small Business Break-Even Simulation",
    subtitle: "Analyzing fixed vs variable costs for a student eco-stationery store",
    stageSuitability: ["classes-8-10"],
    categoryId: "business_entrepreneurship",
    categoryLabel: "Business & Ventures",
    relatedPathwayId: "path_c810_commerce_fin",
    relatedPathwayTitle: "Commerce, Trade & Practical Financial Literacy",
    format: "scenario_tradeoff",
    suggestedMinutes: 20,
    learningObjective: "Distinguish fixed costs from variable costs and calculate the break-even volume required to avoid financial loss.",
    scenarioBackground: "You and two classmates want to set up an eco-friendly recycled stationery stall during the annual 3-day school festival. You have ₹3,000 saved up. How do you price each notebook kit to ensure you don't lose money?",
    instructions: [
      "Review the stall rental cost (Fixed: ₹1,500) and cost per notebook kit (Variable: ₹50).",
      "Evaluate 3 different pricing and production quantity strategies.",
      "Choose the model that balances student affordability with safe break-even margins.",
    ],
    optionalHints: [
      "Break-even formula: Fixed Costs / (Selling Price - Variable Cost per unit).",
      "If you price too high (e.g. ₹150), fewer students buy; if too low (₹60), you need to sell 150 kits just to recover stall rent.",
    ],
    content: {
      format: "scenario_tradeoff",
      payload: {
        contextSummary: "Commercial acumen is built on understanding that revenue must cover both ongoing unit costs and upfront fixed commitments.",
        situation: "Fixed Stall Fee: ₹1,500. Raw materials per notebook kit: ₹50. Maximum festival attendance: 250 students.",
        options: [
          {
            id: "opt_balanced",
            label: "Option A: Price at ₹90 per kit (Contribution Margin: ₹40)",
            description: "Sell kits at ₹90. Break-even occurs at 38 units (1,500 / 40). Selling 75 units yields ₹1,500 net profit.",
            tradeoffsGained: "Highly affordable for students, fast break-even at only 38 sales, low unsold inventory risk.",
            tradeoffsSacrificed: "Moderate profit per kit compared to luxury stationery branding.",
          },
          {
            id: "opt_premium",
            label: "Option B: Price at ₹160 with deluxe glitter pens (Variable cost: ₹100, Margin: ₹60)",
            description: "Break-even occurs at 25 units. Selling 50 units yields ₹1,500 profit.",
            tradeoffsGained: "High prestige product, fewer kits needed to break even.",
            tradeoffsSacrificed: "Risk of alienating students with tight daily pocket money; unsold units cost ₹100 each to produce.",
          },
          {
            id: "opt_ultra_cheap",
            label: "Option C: Price at ₹55 per kit (Margin: ₹5)",
            description: "Break-even requires selling 300 kits (1,500 / 5).",
            tradeoffsGained: "Lowest possible price.",
            tradeoffsSacrificed: "Mathematically impossible to break even because only 250 students attend the festival!",
          },
        ],
        discussionPrompt: "Why is knowing your total addressable market size (250 students) just as important as knowing your profit margin?",
      },
    },
    competencyPractised: "Break-Even Financial Modeling & Pricing Strategy",
    whatThisClarifies: "Whether you enjoy practical commerce, economics, and entrepreneurial business modeling.",
    tags: ["Commerce", "Finance", "Business", "Break-Even", "Economics"],
  },

  // ===========================================================================
  // STAGE 3: CLASSES 11–12 (Higher Ed, Entrance Streams & Collegiate Trials)
  // ===========================================================================
  {
    id: "trial_c1112_algo_efficiency",
    title: "Algorithmic Complexity Stress Test",
    subtitle: "Comparing O(n) linear search vs O(log n) binary search on 100,000 items",
    stageSuitability: ["classes-11-12"],
    categoryId: "technology",
    categoryLabel: "Technology & Software",
    relatedPathwayId: "path_c1112_btech_cs",
    relatedPathwayTitle: "B.Tech Computer Science & Software Engineering",
    format: "logic_simulation",
    suggestedMinutes: 25,
    learningObjective: "Analyze the mathematical difference between linear operations and logarithmic divide-and-conquer algorithms.",
    scenarioBackground: "In university computer science coursework, software engineers evaluate algorithms not just by whether they work, but by how their runtime scales as data grows from 100 to 1,000,000 records.",
    instructions: [
      "Review the benchmark scenario comparing linear vs binary search across an array of 100,000 sorted phone numbers.",
      "Analyze the worst-case comparison count for both algorithms.",
      "Select the correct algorithmic architectural principle.",
    ],
    optionalHints: [
      "Linear search checks items one by one: worst case = n (100,000 steps).",
      "Binary search cuts the search space in half each step: log2(100,000) ≈ 17 steps!",
    ],
    content: {
      format: "logic_simulation",
      payload: {
        contextSummary: "Big-O notation is the lingua franca of collegiate computer science and backend engineering systems.",
        initialCodeOrState: `# Array size n = 100,000 sorted elements\n# Target number is at index 99,999\n\n# Linear Search:\ncomparisons_linear = 100_000\n\n# Binary Search:\n# log2(100,000) = 16.6 -> at most 17 comparisons`,
        problemDescription: "A query that takes 17 comparisons takes under a microsecond, whereas 100,000 comparisons can stall database threads during concurrent user spikes.",
        testCases: [
          {
            input: "Array of 1,000,000 elements",
            expectedOutput: "Linear: 1,000,000 ops | Binary: ~20 ops",
            explanation: "Doubling or 10x-ing array size barely adds 3 comparisons in binary search.",
          },
        ],
        fixOptions: [
          {
            id: "opt_precondition",
            label: "Principle A: Binary search requires data to be sorted upfront; sorting costs O(n log n)",
            codeChange: `if not is_sorted(data):\n    data.sort() # O(n log n)\nreturn binary_search(data, target) # O(log n)`,
            isCorrectApproach: true,
            explanation: "Core engineering tradeoff: Sorting once enables millions of lightning-fast binary lookups. If data changes constantly and is queried rarely, linear search may suffice.",
          },
          {
            id: "opt_hash_alternative",
            label: "Principle B: Binary search is always the fastest possible search method",
            codeChange: `return binary_search(data, target)`,
            isCorrectApproach: false,
            explanation: "Hash tables (dictionaries) provide O(1) average constant time lookup, which is even faster than binary search.",
          },
        ],
      },
    },
    competencyPractised: "Algorithmic Time Complexity Analysis",
    whatThisClarifies: "Whether you thrive in theoretical computer science, mathematical rigor, and engineering coursework.",
    tags: ["Computer Science", "Algorithms", "Big-O", "B.Tech", "Class 11-12"],
  },
  {
    id: "trial_c1112_ux_heuristic",
    title: "Mobile Checkout Friction Audit",
    subtitle: "Applying Nielsen Norman usability heuristics to identify checkout drop-off",
    stageSuitability: ["classes-11-12"],
    categoryId: "creativity",
    categoryLabel: "Creativity & Media",
    relatedPathwayId: "path_c1112_bdes_ux",
    relatedPathwayTitle: "B.Des User Experience & Interaction Design",
    format: "case_critique",
    suggestedMinutes: 20,
    learningObjective: "Audit a digital mobile checkout interface using 3 core UX heuristics (Visibility of system status, Error prevention, Recognition vs recall).",
    scenarioBackground: "An e-commerce student book marketplace sees 68% of users abandon their cart on the final payment screen. Users report feeling confused whether their UPI transaction succeeded.",
    instructions: [
      "Examine the 3 UX friction points in the checkout interface.",
      "Identify the violation of heuristic 'Visibility of System Status'.",
      "Propose an empathetic interaction design redesign.",
    ],
    optionalHints: [
      "When a user taps 'Pay Now', freezing the button without a loading spinner or clear transition creates panic and accidental double-taps.",
      "Good UX always confirms what state the system is currently in.",
    ],
    content: {
      format: "case_critique",
      payload: {
        contextSummary: "Digital design is not about graphic decoration; it is cognitive empathy applied to human interaction friction.",
        briefText: "Audit: Student book app checkout screen. Observed issues: 1) Button freezes with no spinner. 2) No order summary visible while typing card details. 3) Error message simply says 'Invalid input' without highlighting which field failed.",
        stakeholders: [
          "Student Buyers: Hurried, shopping on mobile with intermittent 4G/5G connections.",
          "Merchant Sellers: Losing genuine textbook sales due to abandoned checkout flows.",
          "Engineering Team: Needs clear specification of button states (Disabled, Loading, Succeeded, Failed).",
        ],
        keyQuestions: [
          "How would you redesign the 'Pay Now' button feedback to prevent anxious multiple clicks?",
          "How should form validation guide the user inline when an address pincode is incomplete?",
        ],
        guidingRubric: [
          {
            criterion: "Heuristic Accuracy",
            considerations: "Correctly identifies lack of system status visibility and poor error message recovery.",
          },
          {
            criterion: "User-Centered Empathy",
            considerations: "Understands the user's emotional state (anxiety over losing money) during checkout.",
          },
        ],
      },
    },
    competencyPractised: "Heuristic Usability Evaluation & Interface Empathy",
    whatThisClarifies: "Whether you enjoy human cognitive ergonomics and digital UI/UX design.",
    tags: ["UI/UX", "Design", "Figma", "Heuristics", "Product Design"],
  },

  // ===========================================================================
  // STAGE 4: DIPLOMA / POLYTECHNIC (Hands-On Technical & Workplace Tasks)
  // ===========================================================================
  {
    id: "trial_dip_plc_ladder",
    title: "Industrial Conveyor Interlock Diagnosis",
    subtitle: "Troubleshooting a safety relay interlock in a factory automation circuit",
    stageSuitability: ["diploma"],
    categoryId: "technology",
    categoryLabel: "Technology & Software",
    relatedPathwayId: "path_dip_mechatronics_plc",
    relatedPathwayTitle: "Industrial Automation & PLC Mechatronics Specialist",
    format: "applied_troubleshoot",
    suggestedMinutes: 20,
    learningObjective: "Analyze an industrial sensor ladder circuit to isolate why a pneumatic pusher fails to engage when an optical sensor trips.",
    scenarioBackground: "On an automated packaging line, conveyor motor runs continuously, but the pneumatic arm fails to push defective cartons into the reject bin. The PLC digital input light DI-04 remains OFF.",
    instructions: [
      "Review the diagnostic multimeter readings across the 24V DC sensor circuit.",
      "Correlate the optical sensor LED status with the PLC input terminal.",
      "Identify whether the fault is a sensor misalignment, severed wire, or blown PLC optocoupler.",
    ],
    optionalHints: [
      "If the sensor's internal LED illuminates when an object passes, the sensor power is intact and detection works.",
      "If multimeter reads 0V at the PLC terminal despite sensor LED triggering, there is an open-circuit break in the return signal wire.",
    ],
    content: {
      format: "applied_troubleshoot",
      payload: {
        contextSummary: "Industrial automation requires isolating faults systematically across physical mechanics, 24V electrical circuits, and software controller logic.",
        systemDescription: "Conveyor Line #2: 24V DC PNP Photoelectric Sensor (E3Z-R61) connected to Siemens S7-1200 PLC Input Module Terminal DI-04.",
        diagnosticLogsOrReadings: [
          "Reading 1: Sensor Power Terminals (Brown to Blue) = 24.1V DC [PASS]",
          "Reading 2: Sensor Optical Beam Triggers internal Yellow LED = YES [PASS]",
          "Reading 3: Terminal DI-04 on PLC Panel voltage when beam blocked = 0.2V DC [FAIL - Expected 24V]",
          "Reading 4: Cable continuity test from Sensor Black wire to Panel Terminal block = OPEN CIRCUIT (Infinite Ohms) [FAULT FOUND]",
        ],
        possibleFaults: [
          {
            id: "fault_cable_break",
            component: "Cable Jumper / Flexible Conduit Junction",
            hypothesis: "The signal wire was pinched or severed inside the moving cable track, causing an open circuit before reaching the PLC panel.",
            isRootCause: true,
            verificationStep: "Inspect the cable guide carrier for mechanical pinching; replace the shielded 3-core signal lead and re-test continuity.",
          },
          {
            id: "fault_plc_blown",
            component: "PLC Input Channel DI-04",
            hypothesis: "Internal optocoupler diode on PLC input card is burnt out.",
            isRootCause: false,
            verificationStep: "Incorrect: continuity test already proved the wire itself was severed before reaching the terminal.",
          },
        ],
      },
    },
    competencyPractised: "Industrial Circuit Isolation & PLC Fault Tracing",
    whatThisClarifies: "Whether you enjoy practical hands-on mechatronics, factory automation, and hardware maintenance.",
    tags: ["PLC", "Mechatronics", "Automation", "Diploma", "Electrical"],
  },
  {
    id: "trial_dip_sysadmin_log",
    title: "Linux Server Port & Nginx 502 Bad Gateway Triage",
    subtitle: "Analyzing server logs to identify why an API reverse proxy dropped traffic",
    stageSuitability: ["diploma"],
    categoryId: "technology",
    categoryLabel: "Technology & Software",
    relatedPathwayId: "path_dip_sysadmin_cloud",
    relatedPathwayTitle: "Applied Cloud & Linux Systems Administration",
    format: "applied_troubleshoot",
    suggestedMinutes: 20,
    learningObjective: "Read Linux system logs and service statuses to diagnose why Nginx fails to reach an upstream Node.js service.",
    scenarioBackground: "A company internal web portal hosted on an Ubuntu Linux cloud instance suddenly starts returning HTTP 502 Bad Gateway to all office users. Nginx is running, but the app is dead.",
    instructions: [
      "Inspect the output of `systemctl status api-service` and `ss -tuln`.",
      "Read the error line in `/var/log/nginx/error.log`.",
      "Select the corrective systemctl recovery command.",
    ],
    optionalHints: [
      "502 Bad Gateway means Nginx is alive and listening on port 80/443, but cannot connect to the backend daemon on port 3000.",
      "Check if the backend process crashed due to an uncaught exception or port collision.",
    ],
    content: {
      format: "applied_troubleshoot",
      payload: {
        contextSummary: "Systems administration requires correlating HTTP proxy errors with Linux process lifecycles and port socket bindings.",
        systemDescription: "Ubuntu 22.04 LTS: Nginx reverse proxy passing `http://localhost:3000` to Node.js backend daemon managed by systemd.",
        diagnosticLogsOrReadings: [
          "[error] 1421#1421: *1 connect() failed (111: Connection refused) while connecting to upstream, client: 192.168.1.45, server: portal.corp, upstream: 'http://127.0.0.1:3000/api'",
          "Command: `ss -tuln | grep 3000` -> (Empty output: nothing listening on port 3000)",
          "Command: `systemctl status api-service` -> Active: failed (Result: exit-code) since 10 mins ago. Reason: Error: EADDRINUSE or uncaught DB connection timeout.",
        ],
        possibleFaults: [
          {
            id: "fault_backend_crash",
            component: "systemd api-service.service",
            hypothesis: "The upstream backend daemon died after a database timeout and was not configured with `Restart=always` in its unit file.",
            isRootCause: true,
            verificationStep: "Restart service via `sudo systemctl restart api-service` and update unit file to enable auto-restart.",
          },
          {
            id: "fault_nginx_syntax",
            component: "nginx.conf",
            hypothesis: "Nginx configuration syntax is corrupt.",
            isRootCause: false,
            verificationStep: "Incorrect: Nginx is running properly on port 80 and logging 111 Connection Refused to upstream.",
          },
        ],
      },
    },
    competencyPractised: "Linux Service Diagnostics & Network Socket Tracing",
    whatThisClarifies: "Whether you thrive in IT infrastructure, cloud administration, DevOps, and Linux sysadmin tasks.",
    tags: ["Linux", "DevOps", "Sysadmin", "Nginx", "Diploma"],
  },

  // ===========================================================================
  // STAGE 5: DEGREE / ENGINEERING (Capability Building, Systems & Tradeoffs)
  // ===========================================================================
  {
    id: "trial_deg_db_partition",
    title: "Database Partitioning vs Read Replication Trade-off",
    subtitle: "Evaluating CAP theorem architectural decisions for a high-volume booking platform",
    stageSuitability: ["degree-engineering"],
    categoryId: "technology",
    categoryLabel: "Technology & Software",
    relatedPathwayId: "path_deg_aiml_systems",
    relatedPathwayTitle: "Applied Machine Learning & Intelligent Systems",
    format: "scenario_tradeoff",
    suggestedMinutes: 25,
    learningObjective: "Evaluate database architectural trade-offs between horizontal sharding (partitioning) and asynchronous read-replicas under high-write constraints.",
    scenarioBackground: "A national train ticket booking service experiences 50,000 read requests per second and 12,000 write reservations per second in the first 10 minutes of ticket release. Single Postgres primary database CPU utilization spikes to 99%.",
    instructions: [
      "Analyze the primary bottleneck: Is it read contention or write concurrency locking?",
      "Compare 3 architectural scaling interventions.",
      "Select the solution that protects ACID seat allocation while handling massive read query spikes.",
    ],
    optionalHints: [
      "Read replicas solve read volume (searching for trains), but do NOT solve write concurrency (booking the exact same train seat).",
      "Horizontally sharding tickets by Train ID partitions write locks across multiple independent database nodes.",
    ],
    content: {
      format: "scenario_tradeoff",
      payload: {
        contextSummary: "Senior software engineering is about making deliberate tradeoffs between data consistency, query latency, and operational complexity.",
        situation: "Current architecture: 1 Master DB (Reads & Writes) + 2 Read Replicas. Master CPU = 99% due to `SELECT ... FOR UPDATE` row locks on seat tables.",
        options: [
          {
            id: "opt_shard_train_id",
            label: "Option A: Shard seat reservations horizontally by Train Number (Hash Partitioning)",
            description: "Seat locks for Train #12951 happen exclusively on Node A; Train #12952 on Node B. Distributed locks eliminated.",
            tradeoffsGained: "Writes scale linearly with the number of shards; eliminates lock contention between distinct trains.",
            tradeoffsSacrificed: "Cross-train analytical queries become complex distributed map-reduces.",
          },
          {
            id: "opt_add_more_replicas",
            label: "Option B: Spin up 10 additional Read Replicas",
            description: "Route all search queries to replicas.",
            tradeoffsGained: "Fast to deploy without changing code.",
            tradeoffsSacrificed: "Does nothing to alleviate Master write CPU contention during booking rushes.",
          },
        ],
        discussionPrompt: "How does domain boundary design (partitioning by Train ID rather than User ID) prevent distributed transactions?",
      },
    },
    competencyPractised: "Distributed Systems Architecture & Scalability Modeling",
    whatThisClarifies: "Whether you enjoy high-scale backend engineering and systems architecture.",
    tags: ["Distributed Systems", "Databases", "Architecture", "Engineering", "Degree"],
  },
  {
    id: "trial_deg_apm_prioritize",
    title: "Feature Prioritization Trade-off Matrix",
    subtitle: "Balancing engineering debt vs customer growth using RICE scoring",
    stageSuitability: ["degree-engineering"],
    categoryId: "business_entrepreneurship",
    categoryLabel: "Business & Ventures",
    relatedPathwayId: "path_deg_assoc_product",
    relatedPathwayTitle: "Associate Product Management & Tech Strategy",
    format: "scenario_tradeoff",
    suggestedMinutes: 20,
    learningObjective: "Apply structured RICE framework (Reach, Impact, Confidence, Effort) to prioritize quarterly product engineering sprints under resource constraints.",
    scenarioBackground: "You are the Associate Product Manager for a fintech mobile app. Your 6-person engineering team has capacity for only 2 major initiatives in Q3 out of 4 high-priority requests.",
    instructions: [
      "Review the 4 competing proposals (Biometric Login, One-Click Mutual Funds, Database Refactoring, Dark Mode).",
      "Evaluate each using the RICE framework formula.",
      "Select the sprint allocation that protects user trust and business expansion.",
    ],
    optionalHints: [
      "RICE Score = (Reach × Impact × Confidence) / Effort.",
      "Never ignore technical debt: if the database refactor is skipped, the app crashes when new growth features launch.",
    ],
    content: {
      format: "scenario_tradeoff",
      payload: {
        contextSummary: "Product managers manage opportunity cost. Saying 'no' to good ideas is necessary to deliver critical outcomes.",
        situation: "Team capacity: 40 engineering points. Initiative 1: Biometric Login (15 pts, cuts login failure by 40%). Initiative 2: Mutual Fund Checkout (25 pts, generates ₹2M revenue). Initiative 3: Core Database Migration (20 pts, prevents downtime).",
        options: [
          {
            id: "opt_balanced_pm",
            label: "Option A: Deliver Core Database Migration + Biometric Login (Total: 35 pts)",
            description: "Secures platform stability and improves checkout completion rates before layering high-risk financial products.",
            tradeoffsGained: "Zero downtime risk, immediate reduction in customer support tickets, leaves 5 points buffer.",
            tradeoffsSacrificed: "Mutual Fund launch delayed to Q4.",
          },
          {
            id: "opt_revenue_first",
            label: "Option B: Mutual Funds + Biometric Login (Total: 40 pts)",
            description: "Maximizes revenue opportunities immediately.",
            tradeoffsGained: "Immediate quarterly revenue growth.",
            tradeoffsSacrificed: "Database migration skipped; risk of catastrophic crash if traffic surges during marketing campaign.",
          },
        ],
        discussionPrompt: "How do you explain delaying a revenue-generating feature to non-technical executive stakeholders?",
      },
    },
    competencyPractised: "RICE Product Prioritization & Stakeholder Communication",
    whatThisClarifies: "Whether you thrive in product management, tech strategy, and executive decision-making.",
    tags: ["Product Management", "Strategy", "APM", "Fintech", "Degree"],
  },

  // ===========================================================================
  // STAGE 6: FINAL-YEAR / GRADUATE (Workplace Cases, Industry Strategy & Policy)
  // ===========================================================================
  {
    id: "trial_grad_policy_memo",
    title: "Renewable Microgrid Subsidy Memorandum",
    subtitle: "Drafting a policy trade-off brief for rural solar microgrid capital subsidies",
    stageSuitability: ["final-year-grad"],
    categoryId: "social_impact",
    categoryLabel: "Social Impact & People",
    relatedPathwayId: "path_grad_policy_fellowship",
    relatedPathwayTitle: "Public Policy & Social Impact Fellowships",
    format: "case_critique",
    suggestedMinutes: 25,
    learningObjective: "Evaluate public subsidy instruments (CapEx upfront grants vs generation-linked tariff support) to ensure sustainable rural electrification.",
    scenarioBackground: "State Ministry of Power is designing a ₹500 Crore allocation for 1,200 remote off-grid villages. Previous upfront capital grant programs saw 40% of microgrids abandon operations after 3 years due to lack of battery maintenance funds.",
    instructions: [
      "Review the historical failure mode of upfront capital expenditure (CapEx) grants.",
      "Compare CapEx grants with Results-Based Financing (OpEx subsidies tied to verified runtime hours).",
      "Draft a 2-paragraph policy recommendation to the Principal Secretary.",
    ],
    optionalHints: [
      "When companies receive 100% money upfront, they have little incentive to service remote batteries in year 4.",
      "Tying 50% of financial payout to uptime logs monitored via IoT telemetry aligns long-term maintenance incentives.",
    ],
    content: {
      format: "case_critique",
      payload: {
        contextSummary: "Effective public policy designs financial incentives so that private contractors' profit motives align with sustained public welfare.",
        briefText: "Policy Brief: Sustainable Solar Mini-Grid Deployment for Remote Hamlet Electrification. Budget: ₹500 Cr.",
        stakeholders: [
          "Rural Households: Require reliable evening lighting for children's studies and agricultural refrigeration.",
          "Solar EPC Developers: Require reasonable return on equity and protection against consumer bill payment defaults.",
          "State Discom: Wants to avoid expanding expensive transmission lines into difficult hilly terrain.",
        ],
        keyQuestions: [
          "Why did previous 100% upfront capital grant programs fail after battery lifecycles expired?",
          "How does hybrid 40% CapEx + 60% generation-linked annuity ensure microgrid operators maintain batteries for 10 years?",
        ],
        guidingRubric: [
          {
            criterion: "Incentive Alignment",
            considerations: "Demonstrates understanding of how payment milestones influence long-term maintenance behavior.",
          },
          {
            criterion: "Fiscal Prudence",
            considerations: "Balances state budget constraints with investor risk-adjusted internal rate of return (IRR).",
          },
        ],
      },
    },
    competencyPractised: "Public Finance Mechanism Design & Policy Memorandum",
    whatThisClarifies: "Whether you thrive in public policy fellowships, development economics, and governmental think tanks.",
    tags: ["Policy", "Economics", "Renewables", "Fellowship", "Graduate"],
  },
  {
    id: "trial_grad_saas_metrics",
    title: "B2B SaaS Churn & Unit Economics Audit",
    subtitle: "Evaluating LTV:CAC ratios and identifying net revenue retention leaks",
    stageSuitability: ["final-year-grad"],
    categoryId: "business_entrepreneurship",
    categoryLabel: "Business & Ventures",
    relatedPathwayId: "path_grad_bootstrapped_biz",
    relatedPathwayTitle: "Bootstrapped Digital Venture & Micro-Agency",
    format: "case_critique",
    suggestedMinutes: 20,
    learningObjective: "Audit a bootstrapped SaaS venture's customer acquisition cost (CAC) payback period and evaluate gross revenue retention health.",
    scenarioBackground: "A founder of an AI documentation tool has ₹15,000 monthly recurring revenue (MRR), but notices customer churn is 5% monthly and CAC payback has stretched from 4 months to 14 months.",
    instructions: [
      "Review the customer churn formula and its compounding impact on annual customer lifetime value (LTV).",
      "Identify why a 5% monthly churn rate equals losing nearly 46% of all customers every year!",
      "Propose 2 high-leverage product onboarding retention fixes.",
    ],
    optionalHints: [
      "Compound retention: (1 - 0.05)^12 = 0.54. A 5% monthly churn means losing 46% of customers annually!",
      "If CAC payback exceeds 12 months in a bootstrapped startup, the company runs out of cash before replenishing bank reserves.",
    ],
    content: {
      format: "case_critique",
      payload: {
        contextSummary: "Venture sustainability requires mastering the arithmetic of unit economics: customer acquisition cost, gross margin, and churn velocity.",
        briefText: "Audit: Bootstrapped SaaS tool. Metrics: MRR ₹15L, Monthly Logo Churn: 5.2%, CAC: ₹28,000, ARPU: ₹2,500/month, Gross Margin: 80%.",
        stakeholders: [
          "Founder / Bootstrapper: Zero outside VC funding; payroll depends strictly on positive operational cash flow.",
          "Sales Lead: Spending money on Google Ads acquiring customers who drop off in 60 days.",
          "Customer Success Team: Small 1-person team responding reactively to cancellation requests.",
        ],
        keyQuestions: [
          "Why is acquiring new customers with a 14-month payback fatal if customers cancel after 8 months?",
          "How would introducing annual upfront billing with a 2-month discount solve both working capital and customer retention?",
        ],
        guidingRubric: [
          {
            criterion: "Unit Economics Literacy",
            considerations: "Correctly identifies that LTV is underwater relative to CAC payback.",
          },
          {
            criterion: "Tactical Execution",
            considerations: "Proposes onboarding check-ins and annual contracts to lock in commitment.",
          },
        ],
      },
    },
    competencyPractised: "SaaS Unit Economics & Retention Architecture",
    whatThisClarifies: "Whether you thrive in startup operations, bootstrapped entrepreneurship, and venture building.",
    tags: ["SaaS", "Startups", "Unit Economics", "Entrepreneurship", "Graduate"],
  },

  // ===========================================================================
  // NON-TECHNICAL ADDITIONS (COMMERCE, HUMANITIES, SUPPLY CHAIN)
  // Ensures balanced domain representation across 11-12, Diploma, Degree & Grad
  // ===========================================================================

  {
    id: "trial_c1112_working_capital",
    title: "Working Capital & Cash Flow Stress Test",
    subtitle: "Navigate invoice payment delays, inventory holding costs, and emergency supplier credit trade-offs",
    stageSuitability: ["classes-11-12"],
    categoryId: "business_entrepreneurship",
    categoryLabel: "Commerce, Finance & Business",
    relatedPathwayId: "pw_bcom_finance",
    relatedPathwayTitle: "Commerce, Accounting & Financial Analysis",
    format: "scenario_tradeoff",
    suggestedMinutes: 15,
    learningObjective: "Distinguish operational cash flow from accounting profit, and evaluate how invoice credit terms affect commercial business survival.",
    scenarioBackground: "An artisanal retail brand recorded ₹12,00,000 in invoiced sales this month. However, ₹9,00,000 is tied up in wholesale client receivables with a 60-day credit period. Meanwhile, raw fabric suppliers and workshop wages totaling ₹6,50,000 are due in 10 days. The bank balance is ₹2,00,000.",
    instructions: [
      "Analyze why having a profitable paper margin does not prevent immediate liquidity insolvency.",
      "Compare 3 strategic options to bridge the ₹4.5L cash shortfall without damaging supplier goodwill or taking predatory loans.",
      "Select the most resilient commercial trade-off.",
    ],
    optionalHints: [
      "Revenue on an accrual invoice is not cash in the bank until the client pays.",
      "Early-payment cash discounts (e.g. 3% discount for 48-hour wire transfer) are often cheaper than high-interest uncollateralized credit lines.",
    ],
    content: {
      format: "scenario_tradeoff",
      payload: {
        situation: "An artisanal brand faces a ₹4.5L working capital deficit with wholesale invoices due in 60 days but staff wages and fabric suppliers due in 10 days.",
        contextSummary: "Commercial viability depends on cash flow velocity, not just book profit. A business with positive margins can still fail if cash is trapped in receivables.",
        discussionPrompt: "Which commercial trade-off best preserves solvency while safeguarding vendor trust and profitability?",
        options: [
          {
            id: "opt_cash_discount",
            label: "Offer 3.5% Prompt-Payment Discount on Wholesale Invoices",
            description: "Contact top wholesale clients and offer an immediate 3.5% discount if invoices are cleared within 48 hours.",
            tradeoffsGained: "Secures ₹4,50,000+ immediate cash within 48 hours to pay workshop wages on time with zero bank debt.",
            tradeoffsSacrificed: "Sacrifices ~₹31,500 in gross margin on the discounted receivables.",
          },
          {
            id: "opt_bank_overdraft",
            label: "Draw Down Emergency Bank Overdraft Line at 15.5% APR",
            description: "Borrow ₹4,50,000 on a short-term bank credit facility until wholesale clients clear their 60-day dues.",
            tradeoffsGained: "Retains full invoice value without giving any margin discount to clients.",
            tradeoffsSacrificed: "Incurs interest charges and uses up emergency borrowing lines, increasing balance sheet leverage.",
          },
          {
            id: "opt_delay_suppliers",
            label: "Delay Raw Fabric Supplier Payments by 30 Days",
            description: "Pay staff wages now with existing ₹2,00,000 cash and push supplier dues past their 30-day term.",
            tradeoffsGained: "Zero financial cost and no margin sacrificed.",
            tradeoffsSacrificed: "Damages vendor trust; fabric suppliers may withhold future deliveries right before festive peak season.",
          },
        ],
      },
    },
    competencyPractised: "Working Capital Cash Flow Management",
    whatThisClarifies: "Whether you enjoy commercial problem-solving, financial accounting, and managerial business decision-making.",
    tags: ["Commerce", "Accounting", "Cash Flow", "Business Management", "Classes 11-12"],
  },

  {
    id: "trial_dip_cold_chain_dispatch",
    title: "Cold-Chain Logistics & Temperature Breach Triage",
    subtitle: "Manage freight transport routing, temperature data loggers, and depot triage",
    stageSuitability: ["diploma", "degree-engineering"],
    categoryId: "business_entrepreneurship",
    categoryLabel: "Supply Chain & Operations",
    relatedPathwayId: "pw_dip_logistics",
    relatedPathwayTitle: "Supply Chain & Logistics Operations",
    format: "scenario_tradeoff",
    suggestedMinutes: 15,
    learningObjective: "Evaluate supply chain trade-offs between spoilage risk, detour transit times, and temperature compliance in pharmaceutical freight dispatch.",
    scenarioBackground: "A refrigerated truck carrying temperature-sensitive pediatric vaccines is 3 hours from its destination depot when a highway landslide forces an 8-hour detour. The onboard temperature data logger shows internal cabin temperature has risen from 3.5°C to 7.1°C (critical spoilage threshold is 8.0°C).",
    instructions: [
      "Analyze the risk of vaccine denaturation if the secondary cooling unit battery depletes during the 8-hour detour.",
      "Compare 3 triage protocols: diverting to an intermediate regional cold-storage warehouse vs requesting dry ice replenishment roadside.",
      "Choose the protocol that safeguards biological cargo integrity while minimizing supply chain disruption.",
    ],
    optionalHints: [
      "Temperature breaches above 8°C permanently invalidate the cold-chain certificate and require destroying the shipment.",
      "Intermediate authorized cold rooms can verify vial integrity and re-chill the cargo before proceeding.",
    ],
    content: {
      format: "scenario_tradeoff",
      payload: {
        situation: "Refrigerated freight truck encounters road closure with temperature rising toward 8.0°C critical spoilage limit.",
        contextSummary: "Operational logistics requires fast risk mitigation under physical constraints: maintaining product integrity while adhering to stringent compliance standards.",
        discussionPrompt: "Which dispatch triage protocol best safeguards cargo integrity without catastrophic freight delay?",
        options: [
          {
            id: "opt_divert_cold_hub",
            label: "Divert 45 km to Authorized Regional Cold-Storage Depot",
            description: "Reroute immediately to a certified secondary distribution warehouse to transfer vaccines into stationary chilling units.",
            tradeoffsGained: "Guarantees temperature remains below 5°C, preventing ₹40L in vaccine inventory loss.",
            tradeoffsSacrificed: "Adds 12 hours of total delay and requires warehouse docking and restacking fees.",
          },
          {
            id: "opt_push_through",
            label: "Engage Auxiliary Diesel Chiller and Take Detour Highway",
            description: "Switch cooling system to backup diesel motor and attempt the 8-hour detour without stopping.",
            tradeoffsGained: "Maintains direct route toward destination hospital.",
            tradeoffsSacrificed: "High risk: if diesel fuel clogs or traffic jams occur, temperature will exceed 8°C, ruining all vaccines.",
          },
          {
            id: "opt_roadside_dry_ice",
            label: "Dispatch Emergency Roadside Dry Ice Replenishment",
            description: "Meet a local industrial gas courier along the detour to pack supplementary dry ice into pallet insulation.",
            tradeoffsGained: "Lowers cabin temperature without full warehouse unloading.",
            tradeoffsSacrificed: "Uneven freezing risks: direct dry ice contact can freeze vials below 2°C, causing frost cracking.",
          },
        ],
      },
    },
    competencyPractised: "Cold-Chain Freight Route & Spoilage Triage",
    whatThisClarifies: "Whether you enjoy supply chain logistics, operations management, and industrial distribution systems.",
    tags: ["Logistics", "Supply Chain", "Operations", "Cold Chain", "Diploma"],
  },

  {
    id: "trial_deg_editorial_bias",
    title: "Investigative Media Source Credibility & Fact-Check Audit",
    subtitle: "Cross-reference anonymous whistleblower claims against municipal public filings and identify framing bias",
    stageSuitability: ["degree-engineering", "final-year-grad"],
    categoryId: "social_impact",
    categoryLabel: "Humanities & Media Ethics",
    relatedPathwayId: "pw_media_comm",
    relatedPathwayTitle: "Journalism, Media Communications & Public Discourse",
    format: "case_critique",
    suggestedMinutes: 20,
    learningObjective: "Audit factual claims for rhetorical framing bias, corroborate primary documentation, and uphold journalistic verification standards.",
    scenarioBackground: "An independent newsroom receives an anonymous tip claiming an urban riverfront revitalization project diverted public water allocations to a luxury commercial golf resort. The lead reporter drafts a breaking exposé based solely on the anonymous leaked email.",
    instructions: [
      "Evaluate the risk of publishing a breaking investigative piece based solely on a single unverified digital document.",
      "Cross-reference the claim with Right to Information (RTI) municipal water filings and satellite hydrology data.",
      "Identify 2 loaded rhetorical phrases in the draft that prejudge guilt before obtaining the irrigation department's official response.",
    ],
    optionalHints: [
      "A leaked email could be authentic, fabricated, or selectively truncated to omit contextual addendums.",
      "Responsible investigative journalism requires giving named subjects a minimum 24-hour window to answer specific written queries before publishing allegations.",
    ],
    content: {
      format: "case_critique",
      payload: {
        contextSummary: "Investigative reporting balances public interest with strict evidentiary standards: separating verified documentation from rhetoric and speculation.",
        briefText: "Draft Article: 'CORRUPT WATER THEFT: How Municipal Authorities Starved Local Farmers to Greenlight Billionaire Golf Greens.' Evidence cited: 1 scanned PDF labeled 'Confidential Water Allocation Memo 2024'. Unverified sender, no digital signatures.",
        stakeholders: [
          "Anonymous Whistleblower: Claims to be an irrigation junior engineer; identity unverified.",
          "Lead Reporter: Eager for an exclusive front-page viral scoop ahead of regional elections.",
          "Editorial Fact-Checker: Responsible for verifying primary documentation, avoiding defamation lawsuits, and ensuring balanced right of reply.",
        ],
        keyQuestions: [
          "Why is relying solely on an unauthenticated leaked PDF an unacceptable editorial risk?",
          "How can the newsroom corroborate whether water was actually diverted using public satellite imagery or municipal meter records?",
          "What standard protocol must be followed regarding right-of-reply before publishing damaging allegations against public servants?",
        ],
        guidingRubric: [
          {
            criterion: "Evidentiary Rigor",
            considerations: "Identifies that digital documents must be corroborated via independent secondary sources or official filings.",
          },
          {
            criterion: "Journalistic Ethics & Tone",
            considerations: "Replaces inflammatory assertions with factual reporting and insists on documented right-of-reply.",
          },
        ],
      },
    },
    competencyPractised: "Investigative Source Verification & Bias Critique",
    whatThisClarifies: "Whether you thrive in journalism, media law, public discourse, and investigative communications.",
    tags: ["Journalism", "Media", "Fact-Checking", "Humanities", "Ethics", "Degree", "Graduate"],
  },
];

