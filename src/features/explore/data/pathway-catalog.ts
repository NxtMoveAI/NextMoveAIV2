/**
 * NEXT MOVE AI V2 — FLOW 5: DETERMINISTIC PATHWAY CATALOGUE
 * 
 * Comprehensive catalogue covering all 6 academic stages.
 * Adheres strictly to the Next Move AI V2 product philosophy:
 * - "We don't decide careers; we enable clarity."
 * - Zero fabricated placement percentages, fake salary claims, or artificial match ranks.
 * - Age-appropriate framing (Classes 4–7 strictly exploration themes, no corporate job titles).
 * - Differentiates self-reported interest from demonstrated competence.
 */

import { type Pathway } from "../types";

export const PATHWAY_CATALOG: Pathway[] = [
  // ===========================================================================
  // STAGE 1: CLASSES 4–7 (Curiosity & Creative Exploration Themes)
  // Strictly no adult job titles, corporate careers, or salary mentions
  // ===========================================================================
  {
    id: "path_c47_story_worlds",
    title: "Visual Storytelling & Comic Worlds",
    type: "curiosity_theme",
    categoryId: "creativity",
    categoryLabel: "Creativity & Media",
    stageSuitability: ["classes-4-7"],
    isCuriosityOnly: true,
    headlineSummary: "Inventing original characters, sketching story panels, and writing exciting illustrated adventures.",
    detailedOverview: "This curiosity theme lets younger students discover how art and stories connect. Instead of just reading books or drawing random pictures, students explore how to create sequential art, build imaginary worlds, and express emotional stories using panels, colors, and speech bubbles.",
    whatPeopleLearnOrDo: [
      "Drawing character expressions (happy, puzzled, determined, surprised)",
      "Storyboarding a beginning, middle problem, and satisfying resolution",
      "Experimenting with colored markers, watercolor washes, and digital sketch tablets",
      "Creating mini-comic books to share with classmates and family",
    ],
    dayInTheLife: [
      {
        title: "Morning Imagination Session",
        timeframe: "10:00 AM – 11:30 AM",
        activities: ["Doodling 5 new character silhouettes", "Picking one hero and sketching 3 funny expressions"],
        environmentNote: "Desk with drawing paper, pencils, and felt-tip outline pens",
      },
      {
        title: "Afternoon Storyboarding",
        timeframe: "2:00 PM – 3:30 PM",
        activities: ["Dividing a sheet into 6 comic panels", "Writing dialog bubbles and sound effect lettering"],
        environmentNote: "Creative table with colorful reference books and comic strips",
      },
    ],
    foundationalSkills: [
      { name: "Visual Observation", category: "thinking_disposition", description: "Noticing shapes, expressions, and details in everyday life" },
      { name: "Story Sequencing", category: "subject_foundation", description: "Arranging events in a logical and engaging order" },
      { name: "Sketching Basics", category: "technical_tool", description: "Controlling pencil pressure and line clarity" },
    ],
    educationRoutes: [
      {
        id: "er_c47_story_1",
        title: "School Art & Literature Clubs",
        routeType: "open_curiosity",
        duration: "Ongoing in middle school",
        prerequisites: "Curiosity to draw and tell stories",
        honestWorkloadNote: "Fun, low-pressure weekly participation in school magazines and art periods",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "No previous drawing expertise required; open to any curious student in Classes 4–7.",
      tradeoffsToConsider: [
        "Takes patience when a drawing doesn't look exact on the first try",
        "Encourages practicing redrawing rather than giving up early",
      ],
      honestDisclaimer: "This is a creative learning theme to explore interests, not an early career track.",
    },
    beforeYouCommitTrial: {
      title: "The 3-Panel Hero Challenge",
      objective: "Create a 3-panel mini comic about a clumsy robot helping a lost kitten",
      estimatedMinutes: 30,
      format: "creative_prompt",
      stepByStepPrompt: [
        "Panel 1: Draw the robot meeting the kitten in the rain.",
        "Panel 2: Draw the robot attempting to hold an umbrella with clumsy metal hands.",
        "Panel 3: Show both of them safely smiling under a makeshift shelter.",
      ],
      deliverable: "A completed 3-panel pencil or colored sketch on paper.",
    },
    whatRemainsUnknown: "Whether you prefer inventing stories with words or focusing primarily on the visual drawing style.",
    alternativePathways: [
      { pathwayId: "path_c47_sound_music", title: "Soundscapes & Foley Audio", relationshipDescription: "Focuses on audio effects and soundtrack pacing rather than visual drawing." },
      { pathwayId: "path_c47_gadgets_makers", title: "Makerspace Inventions", relationshipDescription: "Focuses on building physical moving cardboard props rather than 2D comic art." },
    ],
    tags: ["Drawing", "Comics", "Storytelling", "Art", "Middle School"],
  },
  {
    id: "path_c47_nature_lab",
    title: "Nature Observation & Habitat Journals",
    type: "curiosity_theme",
    categoryId: "science_discovery",
    categoryLabel: "Science & Discovery",
    stageSuitability: ["classes-4-7"],
    isCuriosityOnly: true,
    headlineSummary: "Discovering how local plants, insects, and animals survive and interact in natural ecosystems.",
    detailedOverview: "A hands-on curiosity path for young naturalists. Students learn how to look closely at trees, soil, weather patterns, and birds in their neighborhood, maintaining an illustrated field journal just like historic natural scientists.",
    whatPeopleLearnOrDo: [
      "Keeping a daily weather and bird-sighting log in a personal notebook",
      "Collecting and pressing fallen leaves to classify leaf vein structures",
      "Using simple magnifying glasses to examine soil composition and insect habits",
      "Learning why clean water and green spaces matter for local biodiversity",
    ],
    dayInTheLife: [
      {
        title: "Morning Backyard or Park Walk",
        timeframe: "7:30 AM – 8:30 AM",
        activities: ["Spotting 3 different bird species", "Recording sounds and noting tree bark textures"],
        environmentNote: "Outdoors in neighborhood park, balcony, or school playground",
      },
      {
        title: "Field Journal Documentation",
        timeframe: "4:00 PM – 5:00 PM",
        activities: ["Sketching leaf shapes", "Looking up bird names in a beginner nature guidebook"],
        environmentNote: "Study desk with magnifying lens, ruler, and colored pencils",
      },
    ],
    foundationalSkills: [
      { name: "Keen Observation", category: "thinking_disposition", description: "Noticing minute changes in plants and living behavior" },
      { name: "Data Logging", category: "subject_foundation", description: "Recording dates, times, temperatures, and sketches" },
      { name: "Environmental Care", category: "thinking_disposition", description: "Respecting living creatures without harming their habitats" },
    ],
    educationRoutes: [
      {
        id: "er_c47_nat_1",
        title: "Middle School Eco Clubs & Science Fairs",
        routeType: "open_curiosity",
        duration: "School terms",
        prerequisites: "Interest in outdoor exploration and animals",
        honestWorkloadNote: "Weekend outdoor walks and afternoon science experiments",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Open to all students who love animals, plants, and spending time outdoors.",
      tradeoffsToConsider: [
        "Requires spending time outside in varying weather conditions",
        "Requires patience when waiting to observe birds or small animals",
      ],
      honestDisclaimer: "Curiosity exploration designed to nurture scientific wonder, not a vocational choice.",
    },
    beforeYouCommitTrial: {
      title: "The 3-Day Backyard Biodiversity Log",
      objective: "Track 4 different living species in your garden, balcony, or neighborhood park across 3 days",
      estimatedMinutes: 45,
      format: "curiosity_exercise",
      stepByStepPrompt: [
        "Day 1: Pick one flowering plant and sketch its flower structure and leaf veins.",
        "Day 2: Observe two insects or birds visiting that plant and record what time they arrive.",
        "Day 3: Write 3 questions about why that plant survives well in your city.",
      ],
      deliverable: "A 1-page illustrated nature journal entry with dates and drawings.",
    },
    whatRemainsUnknown: "Whether you are more fascinated by animal behavior, plant biology, or stargazing astronomy.",
    alternativePathways: [
      { pathwayId: "path_c47_story_worlds", title: "Visual Storytelling", relationshipDescription: "Illustrate fictional nature tales rather than factual scientific logs." },
      { pathwayId: "path_c47_gadgets_makers", title: "Makerspace Inventions", relationshipDescription: "Build instruments like homemade rain gauges or solar ovens." },
    ],
    tags: ["Nature", "Animals", "Biology", "Ecology", "Outdoor Exploration"],
  },
  {
    id: "path_c47_gadgets_makers",
    title: "Makerspace Inventions & Everyday Tinkering",
    type: "curiosity_theme",
    categoryId: "technology",
    categoryLabel: "Technology & Software",
    stageSuitability: ["classes-4-7"],
    isCuriosityOnly: true,
    headlineSummary: "Building cardboard machines, simple battery circuits, and playful inventions out of everyday objects.",
    detailedOverview: "For young students who love taking things apart and seeing how they work. This theme introduces physical crafting, simple levers, coin-cell LED circuits, and basic puzzle mechanics using safe materials like cardboard, rubber bands, and craft sticks.",
    whatPeopleLearnOrDo: [
      "Constructing rubber-band powered cars and cardboard catapults",
      "Lighting up paper greeting cards using coin-cell batteries and copper tape",
      "Understanding levers, pulleys, and simple mechanical linkages",
      "Troubleshooting why a paper mechanism jammed and fixing it creatively",
    ],
    dayInTheLife: [
      {
        title: "Tinkering & Prototyping",
        timeframe: "11:00 AM – 1:00 PM",
        activities: ["Measuring and cutting cardboard struts", "Testing rubber-band tension on a rolling wheel axel"],
        environmentNote: "Maker corner with safety scissors, craft glue, tape, and recycled cardboard",
      },
    ],
    foundationalSkills: [
      { name: "Hands-on Trial & Error", category: "thinking_disposition", description: "Willingness to rebuild when something collapses" },
      { name: "Spatial Reasoning", category: "thinking_disposition", description: "Imagining how 2D flat cardboard folds into 3D objects" },
      { name: "Basic Circuit Logic", category: "technical_tool", description: "Understanding positive and negative battery loops" },
    ],
    educationRoutes: [
      {
        id: "er_c47_make_1",
        title: "School Robotics & Maker Labs",
        routeType: "open_curiosity",
        duration: "Flexible middle school clubs",
        prerequisites: "Enthusiasm for hands-on building",
        honestWorkloadNote: "After-school building sessions and fun showcase projects",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Requires adult supervision when using hot glue guns or scissors.",
      tradeoffsToConsider: [
        "Cardboard and craft messes are part of the learning process",
        "Prototypes often break several times before working smoothly",
      ],
      honestDisclaimer: "Hands-on maker curiosity theme to develop engineering intuition safely.",
    },
    beforeYouCommitTrial: {
      title: "The Great Rubber-Band Racer",
      objective: "Build a 4-wheeled vehicle using cardboard, bottle caps, straws, and a single rubber band that rolls at least 1 meter",
      estimatedMinutes: 40,
      format: "mini_project",
      stepByStepPrompt: [
        "Step 1: Cut two wooden skewers and insert through plastic straws taped under a cardboard base.",
        "Step 2: Press bottle caps onto the skewer ends as wheels.",
        "Step 3: Hook a rubber band to the front and loop around the rear axel. Wind back and release!",
      ],
      deliverable: "A rolling racer prototype that travels across your floor.",
    },
    whatRemainsUnknown: "Whether you enjoy physical mechanical gadgets more or writing digital software on a computer.",
    alternativePathways: [
      { pathwayId: "path_c47_math_detective", title: "Mathematical Puzzles & Strategy", relationshipDescription: "Focus on abstract rules and logic puzzles rather than physical craft materials." },
      { pathwayId: "path_c810_applied_mechanics", title: "Applied Robotics (Classes 8–10)", relationshipDescription: "Future stage avenue with microcontrollers and motors once in high school." },
    ],
    tags: ["Tinkering", "Maker", "Circuits", "Robotics", "Hands-on"],
  },
  {
    id: "path_c47_math_detective",
    title: "Mathematical Puzzles & Strategy Games",
    type: "curiosity_theme",
    categoryId: "analysis_problem_solving",
    categoryLabel: "Analysis & Logic",
    stageSuitability: ["classes-4-7"],
    isCuriosityOnly: true,
    headlineSummary: "Cracking secret codes, solving visual pattern grids, and mastering strategic board games.",
    detailedOverview: "Mathematics is far more than repetitive memorization drills. This theme reframes math as a detective mystery: finding hidden number patterns, breaking substitution ciphers, and anticipating moves in games like chess and Sudoku.",
    whatPeopleLearnOrDo: [
      "Deciphering secret Caesar cipher messages written by friends",
      "Finding arithmetic shortcuts and geometric symmetry in tessellation tiles",
      "Analyzing opening strategies in chess, checkers, and grid games",
      "Formulating 'what if' hypotheses to solve multi-step logic riddles",
    ],
    dayInTheLife: [
      {
        title: "Puzzle Solving Sprint",
        timeframe: "4:30 PM – 5:30 PM",
        activities: ["Solving a 6x6 KenKen logic grid", "Creating a secret cipher code to encrypt a mystery clue"],
        environmentNote: "Quiet desk with grid paper, colored pens, and a puzzle book",
      },
    ],
    foundationalSkills: [
      { name: "Pattern Recognition", category: "subject_foundation", description: "Spotting repeating intervals and numerical trends" },
      { name: "Logical Deduction", category: "thinking_disposition", description: "Ruling out impossible options systematically" },
      { name: "Strategic Foresight", category: "thinking_disposition", description: "Thinking 2 to 3 steps ahead before choosing an action" },
    ],
    educationRoutes: [
      {
        id: "er_c47_math_1",
        title: "School Math Olympiad & Chess Clubs",
        routeType: "open_curiosity",
        duration: "Weekly school activity",
        prerequisites: "Enjoyment of riddles and mental challenges",
        honestWorkloadNote: "Friendly puzzle competitions without stressful tutoring pressure",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Basic middle-school arithmetic; no advanced formulas required.",
      tradeoffsToConsider: [
        "Some puzzles feel frustrating until the breakthrough moment arrives",
        "Demands focus and careful re-checking of step-by-step logic",
      ],
      honestDisclaimer: "Intellectual discovery theme aimed at building self-confidence in problem-solving.",
    },
    beforeYouCommitTrial: {
      title: "The Caesar Cipher Decoder",
      objective: "Decode a hidden clue using a shift-3 Caesar cipher and write an encrypted reply",
      estimatedMinutes: 25,
      format: "case_analysis",
      stepByStepPrompt: [
        "Step 1: Write the alphabet A through Z on a strip of paper.",
        "Step 2: Decode the message: 'FRPSXWHU VFLHQFH LV IXQ' by shifting each letter back 3 spots.",
        "Step 3: Encrypt your favorite hobby using the same rule.",
      ],
      deliverable: "The decoded secret phrase and your own encrypted cipher challenge.",
    },
    whatRemainsUnknown: "Whether you enjoy purely abstract puzzles or applying logic to computer games and coding.",
    alternativePathways: [
      { pathwayId: "path_c47_gadgets_makers", title: "Makerspace Inventions", relationshipDescription: "Combines logic with physical moving parts." },
      { pathwayId: "path_c810_comp_science", title: "Computer Coding (Classes 8–10)", relationshipDescription: "Translate logical strategy into Python and web scripts when older." },
    ],
    tags: ["Math", "Puzzles", "Logic", "Strategy", "Cryptography"],
  },
  {
    id: "path_c47_sound_music",
    title: "Rhythm, Sounds & Foley Studio",
    type: "curiosity_theme",
    categoryId: "creativity",
    categoryLabel: "Creativity & Media",
    stageSuitability: ["classes-4-7"],
    isCuriosityOnly: true,
    headlineSummary: "Discovering how music rhythms are built and recording funny everyday sound effects for animated clips.",
    detailedOverview: "Explore how sound shapes emotions. Students learn about beats, tempo, recording sounds with household objects (foley art like crinkling paper to sound like forest fires), and basic musical patterns on keyboards or percussion.",
    whatPeopleLearnOrDo: [
      "Clapping complex polyrhythms and understanding tempo changes",
      "Using a phone or tablet voice recorder to create a library of funny sound effects",
      "Matching happy, spooky, or adventurous soundscapes to short video clips",
      "Experimenting with digital piano keys or simple percussion instruments",
    ],
    dayInTheLife: [
      {
        title: "Sound Hunting Expedition",
        timeframe: "3:00 PM – 4:00 PM",
        activities: ["Recording 5 strange sounds around the house (door hinges, pots, dripping taps)", "Guessing sound origins"],
        environmentNote: "Living room or bedroom with simple voice recording app",
      },
    ],
    foundationalSkills: [
      { name: "Active Listening", category: "thinking_disposition", description: "Hearing subtle layers of pitch, tone, and rhythm" },
      { name: "Timing & Cadence", category: "subject_foundation", description: "Keeping steady tempo across musical measures" },
      { name: "Audio Experimentation", category: "technical_tool", description: "Using basic recording and playback tools" },
    ],
    educationRoutes: [
      {
        id: "er_c47_mus_1",
        title: "School Music Band & Choir",
        routeType: "open_curiosity",
        duration: "School terms",
        prerequisites: "Joy of singing or playing rhythms",
        honestWorkloadNote: "Weekly practice and annual school concert participation",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "No formal instrument lessons necessary; accessible with everyday objects and body percussion.",
      tradeoffsToConsider: [
        "Repetitive practice is needed to master steady rhythm",
        "Need quiet spaces to record clean audio clips",
      ],
      honestDisclaimer: "Curiosity theme for acoustic and musical awareness.",
    },
    beforeYouCommitTrial: {
      title: "The 60-Second Foley Soundscape",
      objective: "Create a 3-sound audio story representing 'A sudden thunderstorms in a dry forest' using kitchen items",
      estimatedMinutes: 20,
      format: "creative_prompt",
      stepByStepPrompt: [
        "Sound 1: Gentle finger tapping on a table for early rain drops.",
        "Sound 2: Shaking a metal baking tray gently for distant rolling thunder.",
        "Sound 3: Crinkling butter paper for the wind in dry leaves.",
      ],
      deliverable: "A 30-second audio recording or a live demonstration for your family.",
    },
    whatRemainsUnknown: "Whether you enjoy performing music live or creating background audio effects for movies and games.",
    alternativePathways: [
      { pathwayId: "path_c47_story_worlds", title: "Visual Storytelling", relationshipDescription: "Focus on visual drawing and comic narratives." },
    ],
    tags: ["Music", "Sound Effects", "Rhythm", "Audio", "Creative Arts"],
  },
  {
    id: "path_c47_junior_builder",
    title: "Community Helping & School Leadership",
    type: "curiosity_theme",
    categoryId: "social_impact",
    categoryLabel: "Social Impact & People",
    stageSuitability: ["classes-4-7"],
    isCuriosityOnly: true,
    headlineSummary: "Organizing playground games, leading eco-cleanup drives, and helping fellow students solve school dilemmas.",
    detailedOverview: "For young students who love bringing people together. This theme nurtures empathy, teamwork, and active listening. Students learn how to listen to different opinions, organize book exchange drives, and build inclusive games where everyone gets to play.",
    whatPeopleLearnOrDo: [
      "Listening actively when two classmates disagree and helping find a middle ground",
      "Designing a classroom poster campaign for plastic-free lunch days",
      "Organizing a book swap shelf for used adventure storybooks",
      "Speaking clearly and warmly in morning school assemblies",
    ],
    dayInTheLife: [
      {
        title: "Lunchtime Project Coordination",
        timeframe: "12:30 PM – 1:15 PM",
        activities: ["Checking the class book donation box", "Helping younger students choose reading books"],
        environmentNote: "School library corner or classroom reading nook",
      },
    ],
    foundationalSkills: [
      { name: "Empathy & Perspective-Taking", category: "thinking_disposition", description: "Understanding how other students feel in stressful situations" },
      { name: "Team Organization", category: "thinking_disposition", description: "Assigning fun roles so everyone feels valued" },
      { name: "Friendly Communication", category: "subject_foundation", description: "Explaining ideas without yelling or dominating" },
    ],
    educationRoutes: [
      {
        id: "er_c47_lead_1",
        title: "Junior Student Council & Scouts / Guides",
        routeType: "open_curiosity",
        duration: "School year",
        prerequisites: "Desire to help classmates and participate in school initiatives",
        honestWorkloadNote: "1–2 hours per week supporting class duties and events",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Open to every student; builds emotional maturity and leadership naturally.",
      tradeoffsToConsider: [
        "Requires learning how to stay calm when people disagree",
        "Balancing helping others with personal school study time",
      ],
      honestDisclaimer: "Exploratory theme to encourage citizenship and interpersonal confidence.",
    },
    beforeYouCommitTrial: {
      title: "The Friendly Book Swap Pitch",
      objective: "Design a colorful 1-page poster encouraging classmates to swap one favorite storybook for the weekend",
      estimatedMinutes: 30,
      format: "creative_prompt",
      stepByStepPrompt: [
        "Step 1: Write a catchy 5-word headline that makes reading sound exciting.",
        "Step 2: List 3 simple rules (handle books with clean hands, return on Monday, write a thank-you note).",
        "Step 3: Add drawings of books flying with wings.",
      ],
      deliverable: "A completed poster ready to pin on the class noticeboard.",
    },
    whatRemainsUnknown: "Whether you prefer organizing community activities or writing persuasive speeches and articles.",
    alternativePathways: [
      { pathwayId: "path_c47_story_worlds", title: "Visual Storytelling", relationshipDescription: "Channel storytelling into illustrated comics rather than social campaigns." },
      { pathwayId: "path_c810_humanities_policy", title: "Humanities & Public Voice", relationshipDescription: "Follow-up stage avenue with debate and civics in Classes 8–10." },
    ],
    tags: ["Leadership", "Community", "Empathy", "Teamwork", "School Clubs"],
  },

  // ===========================================================================
  // STAGE 2: CLASSES 8–10 (Subject Foundations & Guided Stream Exposure)
  // ===========================================================================
  {
    id: "path_c810_comp_science",
    title: "Computer Coding & Web Application Foundations",
    type: "foundational_stream",
    categoryId: "technology",
    categoryLabel: "Technology & Software",
    stageSuitability: ["classes-8-10"],
    isCuriosityOnly: false,
    headlineSummary: "Writing scripts in Python, building web layouts with HTML/CSS, and developing algorithmic problem-solving habits.",
    detailedOverview: "For secondary school students interested in technology. Move beyond playing games into understanding how digital software operates. Learn fundamental programming structures (loops, variables, conditionals) and build simple, interactive utilities.",
    whatPeopleLearnOrDo: [
      "Writing clean Python scripts to calculate statistics or solve puzzles",
      "Structuring web pages with HTML semantic tags and styling with CSS",
      "Breaking complex logic problems into step-by-step algorithms",
      "Understanding internet security basics: passwords, encryption, and phishing prevention",
    ],
    dayInTheLife: [
      {
        title: "Coding Lab Practice",
        timeframe: "4:00 PM – 5:30 PM",
        activities: ["Writing a Python quiz game that tracks user score", "Debugging a syntax error where an indentation was missing"],
        environmentNote: "Laptop or computer lab with VS Code or Thonny IDE",
      },
    ],
    foundationalSkills: [
      { name: "Algorithmic Logic", category: "subject_foundation", description: "Structuring procedural logic and conditional branches" },
      { name: "Python Syntax Basics", category: "technical_tool", description: "Lists, loops, functions, and string operations" },
      { name: "Patience in Debugging", category: "thinking_disposition", description: "Reading error traceback lines without panic" },
    ],
    educationRoutes: [
      {
        id: "er_c810_cs_1",
        title: "Classes 11–12 Science (PCM with Computer Science) or Applied Coding",
        routeType: "school_stream",
        duration: "2 Years in Senior Secondary",
        prerequisites: "Comfort with Class 10 Mathematics and logical problem solving",
        honestWorkloadNote: "Combines Physics, Chemistry, and Math coursework with weekly programming lab assignments",
      },
      {
        id: "er_c810_cs_2",
        title: "Polytechnic Diploma in Computer Engineering",
        routeType: "diploma",
        duration: "3 Years after Class 10",
        prerequisites: "Class 10 completion with Mathematics and Science",
        honestWorkloadNote: "More hands-on practical coding and lab work with less theoretical physics/chemistry",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Basic numeracy and typing skills; Class 10 math foundation recommended.",
      tradeoffsToConsider: [
        "Involves extensive screen time and troubleshooting stubborn bugs",
        "Requires consistent weekly practice rather than last-minute cramming",
      ],
      honestDisclaimer: "Focuses on building software intuition; does not require choosing an engineering entrance exam yet.",
    },
    beforeYouCommitTrial: {
      title: "Interactive Text Adventure in Python",
      objective: "Write a 20-line Python or JavaScript script that asks the player 3 choices to escape an enchanted castle",
      estimatedMinutes: 45,
      format: "mini_project",
      stepByStepPrompt: [
        "Step 1: Set up a variable `score = 0`.",
        "Step 2: Use `input()` to ask the player which door to open ('left', 'center', 'right').",
        "Step 3: Use `if/elif/else` statements to print different funny outcomes.",
      ],
      deliverable: "A working code file or browser sandbox link running your text game.",
    },
    whatRemainsUnknown: "Whether you prefer backend math algorithms or visual user interface frontends.",
    alternativePathways: [
      { pathwayId: "path_c810_visual_media", title: "Visual Media & UI Design", relationshipDescription: "Focuses on aesthetic design, typography, and visual Figma prototypes rather than Python syntax." },
      { pathwayId: "path_c810_applied_mechanics", title: "Applied Robotics", relationshipDescription: "Connects code to physical sensors and motors rather than purely on-screen apps." },
    ],
    tags: ["Coding", "Python", "Web Development", "Computer Science", "Class 8-10"],
  },
  {
    id: "path_c810_visual_media",
    title: "Visual Communication & Digital Media Design",
    type: "foundational_stream",
    categoryId: "creativity",
    categoryLabel: "Creativity & Media",
    stageSuitability: ["classes-8-10"],
    isCuriosityOnly: false,
    headlineSummary: "Crafting graphic identities, exploring UI layout, and learning digital typography and video pacing.",
    detailedOverview: "For secondary school students drawn to the intersection of art and digital technology. Explores how visual media influences people: color theory, layout grids, icon design, and modern digital design tools like Figma and vector editors.",
    whatPeopleLearnOrDo: [
      "Mastering typography: pairing fonts for legibility and aesthetic mood",
      "Designing responsive mobile screen wireframes in Figma or Penpot",
      "Editing short educational videos with thoughtful pacing and clean subtitles",
      "Creating brand identity boards with color palettes and vector logos",
    ],
    dayInTheLife: [
      {
        title: "Digital Design Studio",
        timeframe: "3:30 PM – 5:00 PM",
        activities: ["Iterating a logo design for a school environment club", "Testing 3 different color palettes for contrast accessibility"],
        environmentNote: "Computer workspace with modern design software and visual mood boards",
      },
    ],
    foundationalSkills: [
      { name: "Visual Hierarchy", category: "thinking_disposition", description: "Guiding the viewer's eye to the most important element first" },
      { name: "Design Software (Figma/Canva)", category: "technical_tool", description: "Vector tools, layout frames, and exporting assets" },
      { name: "Constructive Critique", category: "thinking_disposition", description: "Receiving and applying design feedback objectively" },
    ],
    educationRoutes: [
      {
        id: "er_c810_vis_1",
        title: "Senior Secondary (Any Stream: Arts, Commerce, or Science) + Portfolio",
        routeType: "school_stream",
        duration: "2 Years (Classes 11–12)",
        prerequisites: "Any senior secondary stream; design entrance tests evaluate portfolios and drawing aptitude rather than specific high school streams",
        honestWorkloadNote: "Gives freedom to choose subjects you enjoy while developing a design portfolio on weekends",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "No specific stream restriction in Classes 11–12; open to Arts, Commerce, or Science.",
      tradeoffsToConsider: [
        "Design is subjective; requires iterating multiple drafts that might be rejected",
        "Requires paying attention to small details like pixel alignment and line height",
      ],
      honestDisclaimer: "Focuses on visual literacy and creative confidence without premature career locking.",
    },
    beforeYouCommitTrial: {
      title: "School Cafe App Redesign",
      objective: "Design 2 mobile app screens in Figma or on paper for ordering healthy school snacks",
      estimatedMinutes: 45,
      format: "mini_project",
      stepByStepPrompt: [
        "Screen 1: Menu list with item photos, prices, and an 'Add to Tray' button.",
        "Screen 2: Order summary with pickup time selector.",
        "Apply a consistent 2-color palette and clear bold headings.",
      ],
      deliverable: "Two hand-drawn or digital screen mockups demonstrating clean visual hierarchy.",
    },
    whatRemainsUnknown: "Whether you enjoy digital UI/UX screen design more than physical product packaging or animated films.",
    alternativePathways: [
      { pathwayId: "path_c810_comp_science", title: "Computer Coding", relationshipDescription: "Learn to build and code the interfaces you design into live working web pages." },
      { pathwayId: "path_c1112_bdes_ux", title: "B.Des User Experience Design", relationshipDescription: "Full 4-year degree pathway available after completing Class 12." },
    ],
    tags: ["Design", "UI/UX", "Figma", "Digital Media", "Visual Arts"],
  },
  {
    id: "path_c810_life_biotech",
    title: "Life Sciences, Ecology & Biotechnology Exposure",
    type: "foundational_stream",
    categoryId: "science_discovery",
    categoryLabel: "Science & Discovery",
    stageSuitability: ["classes-8-10"],
    isCuriosityOnly: false,
    headlineSummary: "Investigating cellular structures, genetics fundamentals, and sustainable environmental solutions.",
    detailedOverview: "For secondary students fascinated by biology, health, and living systems. Explores genetics, biotechnology applications (like drought-resistant crops), microbiological processes, and ecosystem conservation.",
    whatPeopleLearnOrDo: [
      "Understanding DNA structure, inheritance traits, and Punnett squares",
      "Investigating water quality and microorganism samples with optical microscopes",
      "Exploring biotechnology: fermentation, enzymes, and modern vaccine basics",
      "Analyzing how human activities alter local climate and food webs",
    ],
    dayInTheLife: [
      {
        title: "Biology Lab Exploration",
        timeframe: "2:00 PM – 3:30 PM",
        activities: ["Preparing a wet-mount slide of onion peel cells", "Sketching cell walls and nuclei under 40x magnification"],
        environmentNote: "School biology laboratory with compound microscopes and staining reagents",
      },
    ],
    foundationalSkills: [
      { name: "Microscopic Observation", category: "technical_tool", description: "Focusing slides and recognizing cellular structures" },
      { name: "Scientific Method", category: "subject_foundation", description: "Formulating hypotheses, control variables, and recording findings" },
      { name: "Biological Classification", category: "subject_foundation", description: "Understanding kingdoms, species adaptations, and organ systems" },
    ],
    educationRoutes: [
      {
        id: "er_c810_bio_1",
        title: "Senior Secondary Science (PCB or PCMB)",
        routeType: "school_stream",
        duration: "2 Years (Classes 11–12)",
        prerequisites: "Good foundation in Class 10 Science (Biology & Chemistry)",
        honestWorkloadNote: "Intense memorization and conceptual understanding across Botany, Zoology, and Chemistry",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Interest in biology and chemistry; requires patience with technical terminology.",
      tradeoffsToConsider: [
        "Higher secondary biology entails significant terminology and anatomical diagrams",
        "Competitive medical entrances demand heavy preparation; research fields offer alternative collegiate paths",
      ],
      honestDisclaimer: "Educational discovery path; medicine is only one of many biology pathways.",
    },
    beforeYouCommitTrial: {
      title: "Family Genetics Trait Investigation",
      objective: "Chart 3 genetic physical traits (earlobe attachment, thumb flexibility, eye color) across 3 family members",
      estimatedMinutes: 30,
      format: "case_analysis",
      stepByStepPrompt: [
        "Step 1: Research dominant and recessive expressions of attached vs detached earlobes.",
        "Step 2: Collect data across parents, siblings, or grandparents.",
        "Step 3: Draw a simple family pedigree chart illustrating the trait distribution.",
      ],
      deliverable: "A 1-page pedigree diagram explaining whether traits appeared dominantly.",
    },
    whatRemainsUnknown: "Whether you are drawn to healthcare clinical practice, biotech laboratory research, or environmental ecology.",
    alternativePathways: [
      { pathwayId: "path_c1112_biomedical_tech", title: "Biomedical Engineering", relationshipDescription: "Combines biology with engineering devices and hardware sensors." },
    ],
    tags: ["Biology", "Life Sciences", "Biotechnology", "Genetics", "Ecology"],
  },
  {
    id: "path_c810_commerce_markets",
    title: "Commerce, Trade & Practical Financial Literacy",
    type: "foundational_stream",
    categoryId: "business_entrepreneurship",
    categoryLabel: "Business & Ventures",
    stageSuitability: ["classes-8-10"],
    isCuriosityOnly: false,
    headlineSummary: "Understanding business operations, banking systems, profit dynamics, and economic supply and demand.",
    detailedOverview: "For students curious about how money works, how companies are started, and how global trade functions. Explores personal budgeting, enterprise cost structures, market pricing, and modern digital payment infrastructure.",
    whatPeopleLearnOrDo: [
      "Calculating gross margins, operating expenses, and net profit for small businesses",
      "Understanding compound interest, inflation, savings instruments, and credit risks",
      "Analyzing supply and demand graphs and why festival seasons alter market prices",
      "Mapping how an e-commerce order travels from seller to final doorstep delivery",
    ],
    dayInTheLife: [
      {
        title: "Business Case Study Session",
        timeframe: "5:00 PM – 6:15 PM",
        activities: ["Comparing subscription pricing models of two streaming services", "Building a mock monthly budget spreadsheet"],
        environmentNote: "Desk with spreadsheet software (Google Sheets or Excel) and news articles",
      },
    ],
    foundationalSkills: [
      { name: "Financial Arithmetic", category: "subject_foundation", description: "Percentages, profit/loss calculations, and interest rates" },
      { name: "Spreadsheet Basics", category: "technical_tool", description: "Writing basic SUM, AVERAGE, and margin formulas in Excel/Sheets" },
      { name: "Critical Consumer Thinking", category: "thinking_disposition", description: "Evaluating marketing claims versus actual product utility" },
    ],
    educationRoutes: [
      {
        id: "er_c810_com_1",
        title: "Senior Secondary Commerce Stream (with or without Mathematics)",
        routeType: "school_stream",
        duration: "2 Years (Classes 11–12)",
        prerequisites: "Class 10 completion; Mathematics recommended for top finance/economics programs",
        honestWorkloadNote: "Involves Accountancy ledgers, Business Studies case studies, and Economics theory",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Comfort with percentages and arithmetic; open to all secondary students.",
      tradeoffsToConsider: [
        "Accountancy requires high precision; balancing ledgers can be meticulous",
        "Commerce with Mathematics expands university degree choices significantly",
      ],
      honestDisclaimer: "Foundational exposure to business and trade without early professional lock-in.",
    },
    beforeYouCommitTrial: {
      title: "Lemonade Stand Unit Economics Audit",
      objective: "Calculate the exact unit cost and break-even point for selling 50 cups of fresh juice",
      estimatedMinutes: 35,
      format: "case_analysis",
      stepByStepPrompt: [
        "Step 1: List ingredient costs (lemons, sugar, ice, biodegradable cups, cardboard stand).",
        "Step 2: Calculate cost per cup. Set a competitive selling price with a 40% margin.",
        "Step 3: Calculate how many cups must be sold to recover the fixed stand cost.",
      ],
      deliverable: "A simple break-even calculation table showing costs, price, and profit point.",
    },
    whatRemainsUnknown: "Whether you prefer financial accounting precision or creative entrepreneurial marketing.",
    alternativePathways: [
      { pathwayId: "path_c1112_ca_corporate_fin", title: "Chartered Accountancy & Finance", relationshipDescription: "Rigorous professional track in auditing, taxation, and corporate governance in Classes 11–12." },
      { pathwayId: "path_c1112_bsc_data_econ", title: "B.Sc Data Science & Economics", relationshipDescription: "Blends commerce and economics with coding and statistical algorithms." },
    ],
    tags: ["Commerce", "Business", "Economics", "Finance", "Class 8-10"],
  },
  {
    id: "path_c810_humanities_policy",
    title: "Humanities, Public Voice & Social Enquiry",
    type: "foundational_stream",
    categoryId: "social_impact",
    categoryLabel: "Social Impact & People",
    stageSuitability: ["classes-8-10"],
    isCuriosityOnly: false,
    headlineSummary: "Investigating civic institutions, historical causes, constitutional rights, and persuasive writing.",
    detailedOverview: "For secondary students passionate about debate, justice, journalism, and history. Explores how societies govern themselves, how constitutional protections work, and how structured research sheds light on contemporary social challenges.",
    whatPeopleLearnOrDo: [
      "Analyzing primary historical documents to understand different historical viewpoints",
      "Formulating structured debate arguments using verified facts rather than rhetoric",
      "Understanding constitutional fundamental rights and judicial systems",
      "Writing clear investigative essays on civic problems like urban waste or rural schooling",
    ],
    dayInTheLife: [
      {
        title: "Debate & Research Preparation",
        timeframe: "4:00 PM – 5:30 PM",
        activities: ["Reading 2 differing editorial opinions on an environmental law", "Drafting a 3-point rebuttal argument with citations"],
        environmentNote: "Library table with national newspapers, constitutional handbooks, and notebook",
      },
    ],
    foundationalSkills: [
      { name: "Source Evaluation", category: "thinking_disposition", description: "Distinguishing verified journalistic facts from opinion or propaganda" },
      { name: "Persuasive Writing", category: "subject_foundation", description: "Structuring essays with thesis statements, evidence, and synthesis" },
      { name: "Public Speaking", category: "thinking_disposition", description: "Delivering spoken arguments clearly and maintaining composure" },
    ],
    educationRoutes: [
      {
        id: "er_c810_hum_1",
        title: "Senior Secondary Humanities / Arts Stream",
        routeType: "school_stream",
        duration: "2 Years (Classes 11–12)",
        prerequisites: "Good reading comprehension and interest in History, Political Science, or Psychology",
        honestWorkloadNote: "Extensive essay writing, source analysis, and textbook reading assignments",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Strong reading comprehension; openness to multiple perspectives.",
      tradeoffsToConsider: [
        "Involves significant long-form reading and essay writing",
        "Success relies on depth of argumentation rather than simple formulaic answers",
      ],
      honestDisclaimer: "Exploration of social sciences and public affairs, opening doors to Law, Journalism, and Policy.",
    },
    beforeYouCommitTrial: {
      title: "The Civic Policy Editorial",
      objective: "Write a 250-word editorial proposing a workable solution for traffic safety near your school",
      estimatedMinutes: 40,
      format: "case_analysis",
      stepByStepPrompt: [
        "Step 1: Identify the root problem (speeding, lack of pedestrian zebra crossings, or parked vehicles).",
        "Step 2: Propose 2 concrete, low-cost municipal actions.",
        "Step 3: Address one expected counter-argument from motorists.",
      ],
      deliverable: "A structured 250-word policy editorial with headline and evidence.",
    },
    whatRemainsUnknown: "Whether you are most drawn to legal advocacy, investigative journalism, or international diplomacy.",
    alternativePathways: [
      { pathwayId: "path_c1112_ba_law_policy", title: "Integrated Law (B.A. LL.B)", relationshipDescription: "Formal 5-year collegiate legal pathway after Class 12." },
    ],
    tags: ["Humanities", "Civics", "Debate", "Public Policy", "Social Science"],
  },
  {
    id: "path_c810_applied_mechanics",
    title: "Applied Mechanics & Physical Robotics Basics",
    type: "foundational_stream",
    categoryId: "technology",
    categoryLabel: "Technology & Software",
    stageSuitability: ["classes-8-10"],
    isCuriosityOnly: false,
    headlineSummary: "Wiring sensors, coding microcontrollers like Arduino, and understanding mechanical gears and physics in action.",
    detailedOverview: "For secondary students who want to bridge software code with physical real-world hardware. Learn how electricity flows through circuits, how servo motors move precisely, and how sensors detect obstacles, temperature, and light.",
    whatPeopleLearnOrDo: [
      "Wiring breadboard circuits with resistors, LEDs, and ultrasonic distance sensors",
      "Programming Arduino or micro:bit boards using C++ or block-based logic",
      "Calculating gear ratios, torque, and rotational speed in small robotic chassis",
      "Troubleshooting loose jumper wires and soldering safety fundamentals",
    ],
    dayInTheLife: [
      {
        title: "Hardware Lab Session",
        timeframe: "3:30 PM – 5:15 PM",
        activities: ["Writing code to flash an LED when an object is closer than 10 cm", "Calibrating an ultrasonic sensor on a test bench"],
        environmentNote: "Workbench with Arduino board, breadboard, multimeter, and USB cable",
      },
    ],
    foundationalSkills: [
      { name: "Circuit Schematic Reading", category: "subject_foundation", description: "Understanding resistors, capacitors, grounds, and power lines" },
      { name: "Embedded Logic Basics", category: "technical_tool", description: "Writing setup and loop routines in Arduino C++" },
      { name: "Hardware Troubleshooting", category: "thinking_disposition", description: "Systematically checking wire continuity and voltage levels" },
    ],
    educationRoutes: [
      {
        id: "er_c810_app_1",
        title: "Classes 11–12 Science (PCM) or Polytechnic Diploma in Mechanical/Mechatronics",
        routeType: "school_stream",
        duration: "2 or 3 Years",
        prerequisites: "Good foundation in Class 10 Science (Physics) and Mathematics",
        honestWorkloadNote: "Rigorous physics principles combined with engineering workshop lab practice",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Interest in hands-on hardware and physical electronics; basic algebra.",
      tradeoffsToConsider: [
        "Hardware components can burn out if wired incorrectly to power supplies",
        "Requires tracking both software bugs and physical wiring faults simultaneously",
      ],
      honestDisclaimer: "Introductory robotics and applied physics exposure; not a binding engineering lock.",
    },
    beforeYouCommitTrial: {
      title: "Virtual Arduino Sensor Simulation",
      objective: "Build a virtual ultrasonic obstacle detector in Tinkercad Circuits without spending any money on physical hardware",
      estimatedMinutes: 45,
      format: "mini_project",
      stepByStepPrompt: [
        "Step 1: Open a free Tinkercad Circuits account.",
        "Step 2: Place an Arduino Uno, breadboard, red LED, 220-ohm resistor, and HC-SR04 sensor.",
        "Step 3: Connect wiring and paste test code to light the LED when the simulated obstacle moves near.",
      ],
      deliverable: "A working virtual circuit simulation demonstrating obstacle detection.",
    },
    whatRemainsUnknown: "Whether you enjoy mechanical chassis design or electrical microchip programming more.",
    alternativePathways: [
      { pathwayId: "path_dip_mechatronics_plc", title: "Industrial Automation & Mechatronics", relationshipDescription: "Hands-on polytechnic pathway with factory automation and PLC controllers." },
      { pathwayId: "path_c1112_btech_cs", title: "B.Tech Computer Science", relationshipDescription: "More software and algorithmic focus with less mechanical hardware." },
    ],
    tags: ["Robotics", "Arduino", "Circuits", "Electronics", "Physics"],
  },

  // ===========================================================================
  // STAGE 3: CLASSES 11–12 (Higher Education, Streams & Degree Opportunities)
  // ===========================================================================
  {
    id: "path_c1112_btech_cs",
    title: "B.Tech Computer Science & Software Engineering",
    type: "traditional_degree",
    categoryId: "technology",
    categoryLabel: "Technology & Software",
    stageSuitability: ["classes-11-12"],
    isCuriosityOnly: false,
    headlineSummary: "The established 4-year undergraduate degree in computing systems, algorithms, database architectures, and software engineering.",
    detailedOverview: "A core professional engineering pathway covering foundational computer science theory and modern applied software systems. Students study data structures, discrete mathematics, computer networks, operating systems, and full-stack software development.",
    whatPeopleLearnOrDo: [
      "Mastering algorithmic time complexity (Big-O notation) and efficient data structures",
      "Designing relational and NoSQL database schemas with ACID consistency",
      "Building full-stack client-server web and cloud systems with modern frameworks",
      "Understanding operating system primitives: processes, threads, virtual memory, and concurrency",
    ],
    dayInTheLife: [
      {
        title: "Morning Systems Lecture & Problem Set",
        timeframe: "9:00 AM – 12:30 PM",
        activities: ["Attending Operating Systems lecture on page replacement algorithms", "Implementing memory allocation simulations in C++"],
        environmentNote: "University computing auditorium and departmental lab",
      },
      {
        title: "Afternoon Team Project Sprint",
        timeframe: "2:00 PM – 5:00 PM",
        activities: ["Collaborating on a Git repository for a campus event booking API", "Code review with peers addressing pull request comments"],
        environmentNote: "Software lab with dual monitors and version control tooling",
      },
    ],
    foundationalSkills: [
      { name: "Data Structures & Algorithms", category: "subject_foundation", description: "Trees, graphs, dynamic programming, and hash tables" },
      { name: "Git Version Control", category: "technical_tool", description: "Branching, rebasing, pull requests, and merge conflict resolution" },
      { name: "Discrete Mathematics", category: "subject_foundation", description: "Set theory, boolean algebra, probability, and graph theory" },
    ],
    educationRoutes: [
      {
        id: "er_c1112_cs_1",
        title: "4-Year B.Tech / B.E. in Computer Science & Engineering",
        routeType: "degree",
        duration: "4 Years (8 Semesters)",
        prerequisites: "Class 12 with Physics, Mathematics, and Chemistry/Technical subject",
        honestWorkloadNote: "Requires cracking national (JEE Main/Advanced) or state/university engineering entrance examinations; rigorous coursework",
      },
      {
        id: "er_c1112_cs_2",
        title: "3-Year Bachelor of Computer Applications (BCA)",
        routeType: "degree",
        duration: "3 Years (6 Semesters)",
        prerequisites: "Class 12 in any stream (Mathematics preferred or required depending on university)",
        honestWorkloadNote: "Direct university admissions or college entrance tests; practical software development focus with less heavy physics/chemistry requirements",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Physics and Mathematics in Class 12 mandatory for AICTE/UGC B.Tech programs.",
      tradeoffsToConsider: [
        "Engineering entrance competition is intense across India; many quality state and private universities exist beyond IITs/NITs",
        "A degree alone is insufficient: real software employment requires building self-directed projects and maintaining an active GitHub portfolio",
      ],
      honestDisclaimer: "Curriculum varies by university; top software careers depend heavily on continuous independent self-study.",
    },
    beforeYouCommitTrial: {
      title: "Algorithmic Efficiency Stress Test",
      objective: "Compare execution speed between linear search and binary search on an array of 100,000 numbers in Python",
      estimatedMinutes: 50,
      format: "case_analysis",
      stepByStepPrompt: [
        "Step 1: Generate a sorted array of 100,000 random integers using Python's `random` module.",
        "Step 2: Write a linear search loop that checks each item from index 0 until found. Record time using `time.time()`.",
        "Step 3: Implement binary search dividing the array in half each time. Compare the millisecond elapsed difference.",
      ],
      deliverable: "A Python script showing the mathematical difference between O(n) and O(log n) performance.",
    },
    whatRemainsUnknown: "Whether you will thrive in deep theoretical computer science math or in product-focused visual web development.",
    alternativePathways: [
      { pathwayId: "path_c1112_bdes_ux", title: "B.Des User Experience Design", relationshipDescription: "Focuses on user interface empathy and human-centered design rather than backend math and algorithms." },
      { pathwayId: "path_c1112_bsc_data_econ", title: "B.Sc Data Science & Economics", relationshipDescription: "Applies coding specifically to econometric statistics and business intelligence." },
    ],
    tags: ["B.Tech", "Computer Science", "Engineering", "Software", "Class 11-12"],
  },
  {
    id: "path_c1112_bdes_ux",
    title: "B.Des User Experience & Interaction Design",
    type: "emerging_frontier",
    categoryId: "creativity",
    categoryLabel: "Creativity & Media",
    stageSuitability: ["classes-11-12"],
    isCuriosityOnly: false,
    headlineSummary: "A human-centered 4-year degree shaping how people interact with digital apps, smart hardware, and AI interfaces.",
    detailedOverview: "User Experience (UX) designers don't just make apps look pretty; they understand human psychology, conduct user interviews, map customer journeys, and design frictionless interfaces. This 4-year Bachelor of Design program bridges art, cognitive science, and technology.",
    whatPeopleLearnOrDo: [
      "Conducting qualitative user interviews and synthesizing empathy maps and personas",
      "Building high-fidelity interactive component prototypes in Figma and Protopie",
      "Applying cognitive ergonomics and WCAG accessibility standards to digital interfaces",
      "Conducting usability benchmark testing with real end-users to spot friction points",
    ],
    dayInTheLife: [
      {
        title: "User Research & Synthesis",
        timeframe: "10:00 AM – 1:00 PM",
        activities: ["Watching 4 recorded user test sessions of a healthcare onboarding flow", "Tagging usability friction points where users hesitated"],
        environmentNote: "Design studio with whiteboards, sticky notes, and Figma canvas",
      },
      {
        title: "Interactive Component Prototyping",
        timeframe: "2:30 PM – 5:30 PM",
        activities: ["Refining micro-interactions and transitions for a mobile checkout drawer", "Validating color contrast against WCAG 2.1 AA standards"],
        environmentNote: "Dual-screen workstation with tablet stylus and interactive component libraries",
      },
    ],
    foundationalSkills: [
      { name: "User Research Methodology", category: "subject_foundation", description: "Interview protocol design, thematic synthesis, and heuristic evaluation" },
      { name: "Figma Component Architecture", category: "technical_tool", description: "Auto-layout, variables, design tokens, and interactive component states" },
      { name: "Cognitive Psychology", category: "thinking_disposition", description: "Understanding mental models, Hick's law, and cognitive load" },
    ],
    educationRoutes: [
      {
        id: "er_c1112_bdes_1",
        title: "4-Year Bachelor of Design (B.Des) in Interaction / UX Design",
        routeType: "degree",
        duration: "4 Years",
        prerequisites: "Class 12 in any stream (Science, Commerce, or Humanities)",
        honestWorkloadNote: "Requires clearing design entrance exams like UCEED, NID DAT, or private university design aptitude tests with a creative portfolio",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Open to students from any stream (Science, Commerce, Arts). Math not mandatory for most design schools.",
      tradeoffsToConsider: [
        "Admission depends on studio tests, portfolio interviews, and creative observation rather than standard board percentages",
        "Demands defending design choices with user data rather than personal artistic taste",
      ],
      honestDisclaimer: "Design degrees evaluate visual problem solving; no coding requirement to enter.",
    },
    beforeYouCommitTrial: {
      title: "Real-World UX Friction Audit",
      objective: "Pick one frustrating mobile app on your phone, document 3 UX pain points, and sketch wireframe solutions",
      estimatedMinutes: 50,
      format: "case_analysis",
      stepByStepPrompt: [
        "Step 1: Take screenshots of 3 consecutive screens that caused confusion or extra clicks.",
        "Step 2: Write a 1-paragraph explanation of what cognitive confusion occurred on each screen.",
        "Step 3: Sketch an improved wireframe layout on paper with clearer buttons and reduced clutter.",
      ],
      deliverable: "A 2-page case study audit contrasting the frustrating original with your proposed redesign.",
    },
    whatRemainsUnknown: "Whether you prefer visual aesthetic styling (UI) or deep behavioral research and user psychology (UX).",
    alternativePathways: [
      { pathwayId: "path_c1112_btech_cs", title: "B.Tech Computer Science", relationshipDescription: "Code the backends and engineering architecture that support modern software." },
      { pathwayId: "path_deg_product_management", title: "Associate Product Management", relationshipDescription: "Degree-level avenue focusing on business viability and product strategy." },
    ],
    tags: ["B.Des", "UX Design", "Figma", "Humanities", "Class 11-12"],
  },
  {
    id: "path_c1112_bsc_data_econ",
    title: "B.Sc Data Science & Quantitative Economics",
    type: "emerging_frontier",
    categoryId: "analysis_problem_solving",
    categoryLabel: "Analysis & Logic",
    stageSuitability: ["classes-11-12"],
    isCuriosityOnly: false,
    headlineSummary: "An interdisciplinary undergraduate degree blending statistical modeling, Python data science, and macroeconomic analysis.",
    detailedOverview: "Modern policy institutes, banks, and tech firms rely on quantitative data scientists who understand both statistical computation and economic market dynamics. This degree combines linear algebra, probability, econometric regressions, and machine learning models.",
    whatPeopleLearnOrDo: [
      "Analyzing real-world economic datasets using Python (Pandas, NumPy, Statsmodels)",
      "Estimating econometric regression models to isolate causal policy effects",
      "Visualizing multi-dimensional economic indicators with Seaborn and Plotly",
      "Formulating mathematical hypotheses on inflation, trade flows, and labor dynamics",
    ],
    dayInTheLife: [
      {
        title: "Econometric Modeling Lab",
        timeframe: "11:00 AM – 1:30 PM",
        activities: ["Cleaning a messy census survey dataset in Jupyter Notebooks", "Running a multivariate regression to test income correlations"],
        environmentNote: "University data lab with Jupyter environment and high-speed statistical compute",
      },
    ],
    foundationalSkills: [
      { name: "Statistical Inference", category: "subject_foundation", description: "Hypothesis testing, p-values, confidence intervals, and distributions" },
      { name: "Python Data Science Stack", category: "technical_tool", description: "Pandas DataFrame operations, data wrangling, and visual plotting" },
      { name: "Economic Intuition", category: "thinking_disposition", description: "Understanding incentives, market equilibrium, and policy tradeoffs" },
    ],
    educationRoutes: [
      {
        id: "er_c1112_dse_1",
        title: "3 or 4-Year B.Sc / B.S. in Data Science & Economics",
        routeType: "degree",
        duration: "3 or 4 Years (NEP structure)",
        prerequisites: "Class 12 with Mathematics (Science or Commerce with Math)",
        honestWorkloadNote: "Offered at top institutes (IIT Madras BS, ISI, DSE, Ashoka, Azim Premji); combines heavy mathematical calculus and statistics",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Class 12 Mathematics is essential. Open to Science (PCM) and Commerce with Mathematics students.",
      tradeoffsToConsider: [
        "Involves significant abstract mathematical rigor, including linear algebra and multivariate calculus",
        "Less emphasis on raw software engineering systems, much higher focus on data interpretation and mathematical modeling",
      ],
      honestDisclaimer: "Rapidly growing analytical degree track; requires strong quantitative comfort.",
    },
    beforeYouCommitTrial: {
      title: "Public Inflation Dataset Investigation",
      objective: "Analyze a public CSV file of consumer price changes across 12 months in Python or Google Sheets",
      estimatedMinutes: 45,
      format: "case_analysis",
      stepByStepPrompt: [
        "Step 1: Download a public CPI dataset from RBI or government statistical portal.",
        "Step 2: Calculate percentage change between Q1 and Q4 for food vs fuel commodities.",
        "Step 3: Plot a line graph highlighting which category drove the greatest inflation spike.",
      ],
      deliverable: "A line chart and a 3-bullet analytical summary of key economic drivers.",
    },
    whatRemainsUnknown: "Whether you lean toward macroeconomic government policy or corporate tech data analytics.",
    alternativePathways: [
      { pathwayId: "path_c1112_ca_corporate_fin", title: "Chartered Accountancy & Finance", relationshipDescription: "Focuses on corporate auditing and regulatory compliance rather than statistical regression coding." },
      { pathwayId: "path_c1112_btech_cs", title: "B.Tech Computer Science", relationshipDescription: "Broader software engineering and systems architecture degree." },
    ],
    tags: ["Data Science", "Economics", "Statistics", "Python", "Class 11-12"],
  },
  {
    id: "path_c1112_ca_corporate_fin",
    title: "Chartered Accountancy & Corporate Finance",
    type: "traditional_degree",
    categoryId: "business_entrepreneurship",
    categoryLabel: "Business & Ventures",
    stageSuitability: ["classes-11-12"],
    isCuriosityOnly: false,
    headlineSummary: "The prestigious professional credential governing financial auditing, taxation, corporate governance, and investment banking.",
    detailedOverview: "The Chartered Accountancy (CA) qualification administered by ICAI is one of India's most respected financial credentials. Paired with a B.Com or BBA, students become statutory auditors, financial controllers, corporate tax advisors, and investment analysts.",
    whatPeopleLearnOrDo: [
      "Auditing corporate balance sheets according to Indian Accounting Standards (Ind AS)",
      "Navigating Direct & Indirect Tax codes (Income Tax Act & GST compliance)",
      "Analyzing corporate mergers, enterprise valuations, and debt restructuring",
      "Completing mandatory 2-year practical articleship training under a practicing CA firm",
    ],
    dayInTheLife: [
      {
        title: "Statutory Audit Fieldwork",
        timeframe: "10:30 AM – 3:30 PM",
        activities: ["Verifying company bank reconciliation statements and voucher trails", "Cross-checking inventory valuation methods during a client plant visit"],
        environmentNote: "Client corporate office or CA firm audit desk",
      },
    ],
    foundationalSkills: [
      { name: "Double-Entry Accounting", category: "subject_foundation", description: "Journal entries, ledger posting, trial balances, and cash-flow statements" },
      { name: "Taxation & Regulatory Law", category: "subject_foundation", description: "Corporate tax deductions, TDS rules, and GST return filings" },
      { name: "Meticulous Attention to Detail", category: "thinking_disposition", description: "Reconciling line items down to the single rupee" },
    ],
    educationRoutes: [
      {
        id: "er_c1112_ca_1",
        title: "ICAI CA Program (Foundation -> Intermediate -> Articleship -> Final) + B.Com",
        routeType: "degree",
        duration: "4.5 to 5 Years",
        prerequisites: "Class 12 completion in any stream (Commerce preferred)",
        honestWorkloadNote: "Self-paced but demanding national examination pass rates; requires balancing college graduation with rigorous professional exams",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Class 12 in any stream. Foundation exam registration open right after Class 12 boards.",
      tradeoffsToConsider: [
        "National pass percentages for CA Intermediate and Final are historically selective (10–25%)",
        "Requires deep self-discipline, lengthy study hours, and 2 full years of dedicated articleship",
      ],
      honestDisclaimer: "Demanding professional credential; rewards disciplined, meticulous analytical thinkers.",
    },
    beforeYouCommitTrial: {
      title: "Corporate Balance Sheet Diagnostic",
      objective: "Analyze a publicly listed Indian company's annual balance sheet and calculate 3 core liquidity ratios",
      estimatedMinutes: 45,
      format: "case_analysis",
      stepByStepPrompt: [
        "Step 1: Download the annual report PDF of a well-known company (e.g., Infosys, Tata Motors).",
        "Step 2: Locate the Consolidated Balance Sheet. Calculate the Current Ratio (Current Assets / Current Liabilities).",
        "Step 3: Write a 1-paragraph assessment of whether the company has sufficient short-term cash liquidity.",
      ],
      deliverable: "A ratio calculation worksheet and liquidity health assessment.",
    },
    whatRemainsUnknown: "Whether you prefer statutory audit and taxation compliance or strategic investment banking and startup CFO advisory.",
    alternativePathways: [
      { pathwayId: "path_c1112_bsc_data_econ", title: "B.Sc Data Science & Economics", relationshipDescription: "Focus on statistical modeling and algorithmic data analysis rather than legal accounting compliance." },
    ],
    tags: ["CA", "Accounting", "Finance", "Auditing", "Commerce", "Class 11-12"],
  },
  {
    id: "path_c1112_biomedical_tech",
    title: "Biomedical Engineering & Health Technology",
    type: "emerging_frontier",
    categoryId: "science_discovery",
    categoryLabel: "Science & Discovery",
    stageSuitability: ["classes-11-12"],
    isCuriosityOnly: false,
    headlineSummary: "Designing medical diagnostic devices, prosthetic limb biomechanics, and hospital healthcare systems.",
    detailedOverview: "For students who love biology and health sciences but are also drawn to engineering, mechanics, and electronics. Biomedical engineers design MRI imaging hardware, robotic surgical tools, patient monitors, and artificial heart valves.",
    whatPeopleLearnOrDo: [
      "Designing medical sensor circuits to measure ECG heart signals and pulse oximetry",
      "Analyzing biomechanical stress on bone implants and orthopedic prosthetics",
      "Understanding hospital regulatory safety standards for high-voltage medical gear",
      "Applying signal processing algorithms to filter background noise from brain EEG waves",
    ],
    dayInTheLife: [
      {
        title: "Medical Instrumentation Lab",
        timeframe: "1:30 PM – 4:30 PM",
        activities: ["Testing a prototype pulse sensor circuit on an oscilloscope", "Calibrating amplifier gain to detect faint heart voltage pulses"],
        environmentNote: "Biomedical engineering laboratory with circuit test benches and anatomical models",
      },
    ],
    foundationalSkills: [
      { name: "Human Anatomy & Physiology", category: "subject_foundation", description: "Cardiovascular, neural, and musculoskeletal systems" },
      { name: "Bio-instrumentation Circuits", category: "technical_tool", description: "Operational amplifiers, analog filters, and medical sensors" },
      { name: "Biomaterials Science", category: "subject_foundation", description: "Biocompatible titanium alloys, polymers, and tissue response" },
    ],
    educationRoutes: [
      {
        id: "er_c1112_bme_1",
        title: "4-Year B.Tech in Biomedical Engineering",
        routeType: "degree",
        duration: "4 Years",
        prerequisites: "Class 12 with Physics, Chemistry, and Mathematics (Biology is an advantage)",
        honestWorkloadNote: "Combines electrical engineering coursework with medical biology curriculum and clinical hospital internships",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Class 12 Science (PCM or PCMB). Required to meet engineering entrance criteria.",
      tradeoffsToConsider: [
        "Involves mastering both engineering physics/math AND biological terminology",
        "Medical device commercialization involves lengthy clinical trials and stringent regulatory approvals",
      ],
      honestDisclaimer: "Excellent bridge between engineering and healthcare without requiring medical NEET qualification.",
    },
    beforeYouCommitTrial: {
      title: "Pulse Oximeter Optical Physics Breakdown",
      objective: "Diagram how infrared and red light absorption differentiates oxygenated from deoxygenated blood in a finger clip",
      estimatedMinutes: 40,
      format: "case_analysis",
      stepByStepPrompt: [
        "Step 1: Research Beer-Lambert law of optical absorption.",
        "Step 2: Note why oxygenated hemoglobin absorbs more infrared light while deoxygenated absorbs red light.",
        "Step 3: Draw a schematic block diagram showing LED emitters, finger tissue, photodiode, and microchip converter.",
      ],
      deliverable: "A labelled block diagram explaining the optical engineering behind pulse oximeters.",
    },
    whatRemainsUnknown: "Whether you are more excited by hardware medical devices or software medical image processing.",
    alternativePathways: [
      { pathwayId: "path_c1112_btech_cs", title: "B.Tech Computer Science", relationshipDescription: "Focus purely on software algorithms and machine learning without medical hardware." },
    ],
    tags: ["Biomedical", "Healthcare", "Medical Devices", "Engineering", "Class 11-12"],
  },
  {
    id: "path_c1112_ba_law_policy",
    title: "Integrated Law (B.A. LL.B) & Public Policy Strategy",
    type: "traditional_degree",
    categoryId: "social_impact",
    categoryLabel: "Social Impact & People",
    stageSuitability: ["classes-11-12"],
    isCuriosityOnly: false,
    headlineSummary: "The 5-year integrated double degree qualifying students for litigation, corporate counsel, and policy governance.",
    detailedOverview: "Administered at India's National Law Universities (NLUs) and premier law colleges. This 5-year program blends arts/social science foundations with comprehensive legal training in constitutional law, corporate jurisprudence, criminal law, and international arbitration.",
    whatPeopleLearnOrDo: [
      "Analyzing landmark Supreme Court case judgments and extracting legal precedents",
      "Drafting commercial contracts, non-disclosure agreements, and litigation petitions",
      "Participating in competitive moot court simulations arguing constitutional petitions",
      "Understanding statutory interpretation, evidence admissibility, and cross-examination rules",
    ],
    dayInTheLife: [
      {
        title: "Moot Court Oral Arguments",
        timeframe: "2:00 PM – 5:00 PM",
        activities: ["Presenting a 15-minute oral argument on digital privacy rights before a mock bench", "Answering tough judicial questions and citing constitutional precedents"],
        environmentNote: "University moot courtroom with wood-paneled benches and legal library",
      },
    ],
    foundationalSkills: [
      { name: "Legal Research & Precedent Analysis", category: "subject_foundation", description: "Using databases like SCC Online and Manupatra to find binding judgments" },
      { name: "Precision Drafting", category: "technical_tool", description: "Writing ambiguous-free clauses and procedural affidavits" },
      { name: "Composed Adversarial Advocacy", category: "thinking_disposition", description: "Thinking on your feet under intense judicial questioning" },
    ],
    educationRoutes: [
      {
        id: "er_c1112_law_1",
        title: "5-Year Integrated B.A. LL.B / B.B.A. LL.B (Hons)",
        routeType: "degree",
        duration: "5 Years (10 Semesters)",
        prerequisites: "Class 12 in any stream (Science, Commerce, or Humanities)",
        honestWorkloadNote: "Requires cracking entrance tests like CLAT or AILET; extensive reading of hundreds of pages of legal text per week",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Class 12 in any stream with minimum 45% aggregate; CLAT/AILET entrance for top NLUs.",
      tradeoffsToConsider: [
        "Demands reading voluminous legal judgments and statutes continuously",
        "Early litigation practice requires perseverance before establishing an independent practice",
      ],
      honestDisclaimer: "Rigorous legal career path opening doors to corporate law, litigation, judiciary, and civil policy.",
    },
    beforeYouCommitTrial: {
      title: "Constitutional Case Synthesis",
      objective: "Read a summarized summary of a landmark right-to-privacy case and write a 2-page judgment summary (Case Brief)",
      estimatedMinutes: 50,
      format: "case_analysis",
      stepByStepPrompt: [
        "Step 1: Identify the central constitutional question (Issue).",
        "Step 2: Note the primary arguments of the Petitioner and the State.",
        "Step 3: Summarize the Court's binding ratio decidendi (legal rule) in 3 clear sentences.",
      ],
      deliverable: "A standard legal Case Brief containing Issue, Facts, Arguments, and Holding.",
    },
    whatRemainsUnknown: "Whether you are better suited for courtroom trial litigation or corporate transactional advisory.",
    alternativePathways: [
      { pathwayId: "path_c1112_liberal_curiosity", title: "Interdisciplinary Liberal Arts", relationshipDescription: "Broader humanities curriculum before choosing whether to enter law or journalism." },
    ],
    tags: ["Law", "B.A. LL.B", "CLAT", "Public Policy", "Humanities", "Class 11-12"],
  },
  {
    id: "path_c1112_liberal_curiosity",
    title: "Interdisciplinary Liberal Arts & Open Discovery Track",
    type: "exploratory_general",
    categoryId: "analysis_problem_solving",
    categoryLabel: "Analysis & Logic",
    stageSuitability: ["classes-11-12"],
    isCuriosityOnly: false,
    headlineSummary: "A multidisciplinary undergraduate foundation for students who have diverse interests and want to explore before declaring a major.",
    detailedOverview: "Ideal for Class 11–12 students who are 'Still Exploring' and do not want to force an early, rigid career commitment. Leading modern universities offer flexible 4-year programs where students sample literature, data science, sociology, philosophy, and economics before choosing their major.",
    whatPeopleLearnOrDo: [
      "Taking foundational courses across human sciences, quantitative reasoning, and creative writing",
      "Conducting interdisciplinary research projects that combine technology with social challenges",
      "Developing versatile critical thinking, persuasive argumentation, and data literacy",
      "Postponing major specialization until the end of the second college year",
    ],
    dayInTheLife: [
      {
        title: "Interdisciplinary Seminar",
        timeframe: "10:00 AM – 12:30 PM",
        activities: ["Participating in a seminar discussing AI ethics from both a programming and philosophical lens", "Synthesizing notes for a joint essay"],
        environmentNote: "Roundtable seminar classroom with digital projectors and open discussions",
      },
    ],
    foundationalSkills: [
      { name: "Critical Synthesis", category: "thinking_disposition", description: "Connecting insights from disparate fields like psychology and software" },
      { name: "Academic Writing", category: "subject_foundation", description: "Crafting structured research papers with proper peer-reviewed citations" },
      { name: "Inquiry Disposition", category: "thinking_disposition", description: "Asking deeper 'why' questions rather than accepting surface claims" },
    ],
    educationRoutes: [
      {
        id: "er_c1112_lib_1",
        title: "4-Year B.A. (Hons) / B.Sc (Hons) in Interdisciplinary Studies",
        routeType: "degree",
        duration: "4 Years (with exit option after 3)",
        prerequisites: "Class 12 in any stream (Science, Commerce, or Arts)",
        honestWorkloadNote: "Offered at institutions like Ashoka, Krea, Plaksha, Azim Premji, and central universities under NEP; emphasis on broad reading and essay writing",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Class 12 in any stream; holistic admissions evaluating essays, extracurriculars, and personal interviews.",
      tradeoffsToConsider: [
        "Does not offer a singular vocational badge (like MBBS or CA); requires articulating your unique skill set to employers",
        "Requires genuine curiosity across multiple subjects rather than memorizing a single textbook",
      ],
      honestDisclaimer: "Excellent choice for versatile thinkers who want to explore broadly before specializing.",
    },
    beforeYouCommitTrial: {
      title: "The Multi-Perspective Tech Dilemma",
      objective: "Write a 300-word analysis of facial recognition technology evaluated through 3 lenses: Technical Accuracy, Civic Privacy, and Commercial Utility",
      estimatedMinutes: 40,
      format: "case_analysis",
      stepByStepPrompt: [
        "Lens 1: How does the software detect faces mathematically?",
        "Lens 2: What happens to citizen freedom when public cameras record all movements?",
        "Lens 3: Why do retail stores and airports want to install it?",
      ],
      deliverable: "A 3-part synthesis paper demonstrating interdisciplinary critical thinking.",
    },
    whatRemainsUnknown: "Which specific domain will eventually captivate you enough to declare as your final collegiate major.",
    alternativePathways: [
      { pathwayId: "path_c1112_btech_cs", title: "B.Tech Computer Science", relationshipDescription: "If you decide to commit fully to software and technical math." },
      { pathwayId: "path_c1112_bdes_ux", title: "B.Des User Experience Design", relationshipDescription: "If you decide your core strength is visual human-computer interaction." },
    ],
    tags: ["Liberal Arts", "Still Exploring", "Interdisciplinary", "Humanities", "Class 11-12"],
  },

  // ===========================================================================
  // STAGE 4: DIPLOMA STUDENTS (Practical Pathways, Lateral Entry & Skills)
  // ===========================================================================
  {
    id: "path_dip_lateral_btech",
    title: "Lateral Entry B.Tech / B.E. (Direct 2nd Year Entry)",
    type: "practical_lateral",
    categoryId: "technology",
    categoryLabel: "Technology & Software",
    stageSuitability: ["diploma"],
    isCuriosityOnly: false,
    headlineSummary: "The structured academic pathway allowing polytechnic diploma holders to join full B.Tech engineering programs directly in Semester 3.",
    detailedOverview: "For polytechnic diploma students who want to earn a full engineering degree. Under AICTE regulations, diploma graduates enter directly into the 2nd year (3rd semester) of B.Tech programs through state Lateral Entry Entrance Tests (like Karnataka DCET, UPSEE Lateral, Maharashtra DSE).",
    whatPeopleLearnOrDo: [
      "Bridging polytechnic hands-on workshop experience with university engineering mathematics",
      "Completing advanced 3rd and 4th-year engineering specialization electives",
      "Participating in university campus placements alongside regular B.Tech students",
      "Undertaking final-year capstone engineering research projects",
    ],
    dayInTheLife: [
      {
        title: "Advanced Engineering Lecture",
        timeframe: "9:30 AM – 1:00 PM",
        activities: ["Attending Engineering Mathematics-III lecture on Fourier transforms", "Bridging theoretical formulas with prior practical diploma lab experience"],
        environmentNote: "University engineering college department classroom",
      },
    ],
    foundationalSkills: [
      { name: "Engineering Mathematics", category: "subject_foundation", description: "Calculus, differential equations, and linear algebra" },
      { name: "Applied Technical Foundation", category: "subject_foundation", description: "Pre-existing diploma workshop knowledge in mechanical, civil, or electrical" },
      { name: "Academic Transition Discipline", category: "thinking_disposition", description: "Adapting from diploma marking systems to university semester exams" },
    ],
    educationRoutes: [
      {
        id: "er_dip_lat_1",
        title: "3-Year B.Tech Degree via Lateral Entry (Direct 2nd Year Admission)",
        routeType: "lateral_entry",
        duration: "3 Years (Semesters 3 through 8)",
        prerequisites: "3-Year Polytechnic Diploma with minimum 45% (40% reserved) aggregate",
        honestWorkloadNote: "Requires clearing state lateral entrance exams (e.g., DCET/JELET); high practical advantage over standard B.Tech classmates",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "State-recognized 3-year polytechnic diploma in relevant engineering discipline.",
      tradeoffsToConsider: [
        "University mathematics can feel challenging during the first bridge semester; requires focused extra tutoring",
        "Lateral entry seats are capped at 10% of total intake per branch in most engineering institutions",
      ],
      honestDisclaimer: "Proven, cost-effective route to earning a full Bachelor of Engineering degree.",
    },
    beforeYouCommitTrial: {
      title: "Lateral Entrance Math Diagnostic",
      objective: "Solve 5 standard Engineering Math-I differential calculus problems to assess your theoretical transition readiness",
      estimatedMinutes: 45,
      format: "case_analysis",
      stepByStepPrompt: [
        "Step 1: Review basic differentiation rules: product rule, quotient rule, chain rule.",
        "Step 2: Solve 3 second-order derivative equations.",
        "Step 3: Compare your solutions against standard lateral entrance exam answer keys.",
      ],
      deliverable: "Completed problem sheet highlighting which calculus areas need bridge review.",
    },
    whatRemainsUnknown: "Whether you will get higher long-term return by entering industry immediately or investing 3 more years into B.Tech.",
    alternativePathways: [
      { pathwayId: "path_dip_mechatronics_plc", title: "Industrial Automation Specialist", relationshipDescription: "Start in industry immediately with practical technical roles instead of full-time collegiate study." },
    ],
    tags: ["Diploma", "Lateral Entry", "B.Tech", "Polytechnic", "Engineering"],
  },
  {
    id: "path_dip_mechatronics_plc",
    title: "Industrial Automation & PLC Mechatronics Specialist",
    type: "practical_lateral",
    categoryId: "technology",
    categoryLabel: "Technology & Software",
    stageSuitability: ["diploma"],
    isCuriosityOnly: false,
    headlineSummary: "Programming programmable logic controllers (PLCs), maintaining industrial robotic arms, and calibrating SCADA systems.",
    detailedOverview: "Modern smart factories, automotive assembly plants, and pharmaceutical packaging lines run on automated mechatronic systems. Diploma graduates in Mechanical, Electrical, or Electronics excel here by programming Siemens/Allen-Bradley PLCs and troubleshooting sensor feedback loops.",
    whatPeopleLearnOrDo: [
      "Programming ladder logic, function block diagrams, and structured text for industrial PLCs",
      "Wiring 24V industrial control panels, safety relays, and variable frequency drives (VFDs)",
      "Configuring Supervisory Control and Data Acquisition (SCADA) operator screens",
      "Calibrating pneumatic actuators, optical proximity sensors, and solenoid valves",
    ],
    dayInTheLife: [
      {
        title: "Automated Line Commissioning",
        timeframe: "8:30 AM – 1:30 PM",
        activities: ["Connecting laptop to a Siemens S7-1200 PLC via Ethernet", "Testing conveyor safety stop routines and sensor interrupt flags"],
        environmentNote: "Automated manufacturing shopfloor with safety helmet and multimeter",
      },
    ],
    foundationalSkills: [
      { name: "PLC Ladder Logic", category: "technical_tool", description: "Timers, counters, interlocks, and state machine ladder diagrams" },
      { name: "Control Panel Schematic Reading", category: "subject_foundation", description: "DIN-rail component wiring, terminal blocks, and circuit breakers" },
      { name: "Root Cause Machine Diagnostics", category: "thinking_disposition", description: "Tracing electrical continuity when an assembly line stops unexpectedly" },
    ],
    educationRoutes: [
      {
        id: "er_dip_plc_1",
        title: "Industry Apprenticeship & Specialized Automation Certification",
        routeType: "vocational_certification",
        duration: "6 Months to 1 Year",
        prerequisites: "Diploma in Mechanical, Electrical, or Electronics Engineering",
        honestWorkloadNote: "Hands-on industrial training at authorized Siemens/Bosch Rexroth training centers",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Diploma in Mechanical, Mechatronics, Electrical, or Electronics Engineering.",
      tradeoffsToConsider: [
        "Involves shift work and noisy manufacturing plant environments during early career stages",
        "Requires continuous upgrading as factories transition to cloud-connected Industry 4.0 systems",
      ],
      honestDisclaimer: "High practical utility pathway; practical skills are valued directly on the factory floor.",
    },
    beforeYouCommitTrial: {
      title: "Virtual PLC Ladder Logic Simulation",
      objective: "Design a 4-rung PLC ladder logic program to control a 2-button safety press machine in an online PLC simulator",
      estimatedMinutes: 40,
      format: "mini_project",
      stepByStepPrompt: [
        "Rung 1: Both Start Button A AND Start Button B must be pressed simultaneously to energize the motor relay.",
        "Rung 2: If the Emergency Stop button is pressed, cut power immediately.",
        "Rung 3: Latch the motor contactor until an optical barrier is interrupted.",
      ],
      deliverable: "A ladder logic diagram with input/output addresses and simulation verification.",
    },
    whatRemainsUnknown: "Whether you prefer plant floor field engineering or sitting in an office programming SCADA screens.",
    alternativePathways: [
      { pathwayId: "path_dip_lateral_btech", title: "Lateral Entry B.Tech", relationshipDescription: "Pursue a 4-year degree credential for executive engineering design roles." },
    ],
    tags: ["Mechatronics", "PLC", "Industrial Automation", "Robotics", "Diploma"],
  },
  {
    id: "path_dip_cloud_sysadmin",
    title: "Applied Cloud & Linux Systems Administration",
    type: "practical_lateral",
    categoryId: "technology",
    categoryLabel: "Technology & Software",
    stageSuitability: ["diploma"],
    isCuriosityOnly: false,
    headlineSummary: "Managing Linux server environments, automating container deployments with Docker, and monitoring cloud infrastructure.",
    detailedOverview: "For Computer Science or Electronics diploma students who love operating systems, server racks, and network configurations. Systems administrators and junior DevOps engineers maintain server uptime, manage cloud permissions, and automate repetitive tasks using Bash scripts.",
    whatPeopleLearnOrDo: [
      "Configuring Linux servers (Ubuntu/RHEL) via command-line SSH terminals",
      "Managing containerized applications using Docker and Docker Compose",
      "Setting up basic cloud virtual machines, security groups, and storage buckets (AWS/Azure)",
      "Automating server backup scripts using Cron jobs and Bash shell scripting",
    ],
    dayInTheLife: [
      {
        title: "Infrastructure Monitoring & Maintenance",
        timeframe: "10:00 AM – 1:00 PM",
        activities: ["Reviewing server CPU and memory alert dashboards", "Investigating a high-latency database connection in a Linux server log"],
        environmentNote: "Multi-monitor workspace with terminal windows, Grafana dashboards, and cloud consoles",
      },
    ],
    foundationalSkills: [
      { name: "Linux Command Line Proficiency", category: "technical_tool", description: "File permissions, grep, systemd service management, and SSH keys" },
      { name: "Computer Networking Fundamentals", category: "subject_foundation", description: "TCP/IP, subnetting, DNS resolution, and HTTP status codes" },
      { name: "Bash Automation", category: "technical_tool", description: "Writing shell scripts with loops and conditional checks" },
    ],
    educationRoutes: [
      {
        id: "er_dip_cld_1",
        title: "Diploma + Professional Cloud Certifications (AWS Certified SysOps / Red Hat RHCSA)",
        routeType: "vocational_certification",
        duration: "6 to 9 Months self-paced",
        prerequisites: "Diploma in CS/IT/Electronics with basic networking knowledge",
        honestWorkloadNote: "Hands-on command line exam testing real server configuration under time pressure",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Diploma in Computer Science, Information Technology, or Electronics.",
      tradeoffsToConsider: [
        "May involve on-call rotation schedules for unexpected server outages",
        "Requires constant adaptation as cloud providers update their management consoles and tools",
      ],
      honestDisclaimer: "Accessible software infrastructure route that prioritizes hands-on competence over formal 4-year degrees.",
    },
    beforeYouCommitTrial: {
      title: "Linux Command Line Diagnostic Challenge",
      objective: "Set up a virtual Linux machine (or WSL) and complete a 5-step server security hardening drill",
      estimatedMinutes: 40,
      format: "mini_project",
      stepByStepPrompt: [
        "Step 1: Create a new non-root user and grant `sudo` privileges.",
        "Step 2: Generate an SSH key pair and disable password authentication in `sshd_config`.",
        "Step 3: Write a 1-line bash script to find all files modified in `/var/log` within the last 24 hours.",
      ],
      deliverable: "Terminal screenshot or shell log verifying successful configuration.",
    },
    whatRemainsUnknown: "Whether you will enjoy systems administration operations or prefer writing application code as a software developer.",
    alternativePathways: [
      { pathwayId: "path_dip_lateral_btech", title: "Lateral Entry B.Tech", relationshipDescription: "Pursue computer science engineering degree for advanced software architecture positions." },
    ],
    tags: ["Linux", "Cloud", "AWS", "DevOps", "Sysadmin", "Diploma"],
  },

  // ===========================================================================
  // STAGE 5: DEGREE & ENGINEERING (Capability, Projects & Career Pathways)
  // ===========================================================================
  {
    id: "path_deg_ai_ml_systems",
    title: "Applied AI / Machine Learning Systems Engineering",
    type: "emerging_frontier",
    categoryId: "technology",
    categoryLabel: "Technology & Software",
    stageSuitability: ["degree-engineering"],
    isCuriosityOnly: false,
    headlineSummary: "Deploying machine learning models to production, optimizing transformer inference, and building retrieval-augmented generation (RAG) systems.",
    detailedOverview: "For undergraduate degree and engineering students who want to build real-world AI applications. Move beyond toy Jupyter notebooks into production engineering: data pipelines, model quantization, API serving, vector databases, and evaluation metrics.",
    whatPeopleLearnOrDo: [
      "Building production semantic search pipelines with vector embeddings (Pinecone, Chroma)",
      "Optimizing model inference latency with ONNX, TensorRT, and 4-bit quantization",
      "Implementing Retrieval-Augmented Generation (RAG) architectures with citation provenance",
      "Evaluating generative outputs using structured rubrics, precision/recall, and latency budgets",
    ],
    dayInTheLife: [
      {
        title: "Model Pipeline Optimization Sprint",
        timeframe: "10:30 AM – 2:00 PM",
        activities: ["Benchmarking latency difference between fp16 and int8 model weights", "Writing unit tests to verify JSON output adherence for an LLM extractor"],
        environmentNote: "High-spec workstation or cloud GPU instance (AWS SageMaker / RunPod)",
      },
    ],
    foundationalSkills: [
      { name: "PyTorch & Transformers Library", category: "technical_tool", description: "Model architectures, attention mechanisms, and fine-tuning loops" },
      { name: "Linear Algebra & Probability", category: "subject_foundation", description: "Matrix multiplication, eigenvalues, loss gradient descent, and Bayes' rule" },
      { name: "API Serving & Dockerization", category: "technical_tool", description: "FastAPI, async request handling, and container deployment" },
    ],
    educationRoutes: [
      {
        id: "er_deg_ai_1",
        title: "B.Tech / B.E. / BCA / B.Sc with Deep Self-Directed Project Portfolio",
        routeType: "degree",
        duration: "4th Year / Final Year Focus",
        prerequisites: "Good foundation in Python, data structures, and undergraduate calculus",
        honestWorkloadNote: "Top tech roles evaluate demonstrable GitHub repositories and live deployed demos rather than university certificates",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Undergraduate degree in CS, IT, Electronics, Math, or Data Science.",
      tradeoffsToConsider: [
        "Cloud GPU training credits can become costly without academic or student free-tier grants",
        "The AI landscape changes rapidly; tools popular 12 months ago get superseded quickly",
      ],
      honestDisclaimer: "Focuses on engineering discipline and deployment realities, not speculative AI hype.",
    },
    beforeYouCommitTrial: {
      title: "RAG Semantic Search Prototype",
      objective: "Build a Python script that indexes 3 PDF documents and returns verifiable factual answers with page citations using local embeddings",
      estimatedMinutes: 50,
      format: "mini_project",
      stepByStepPrompt: [
        "Step 1: Chunk a 10-page text file into 500-token sections with 50-token overlap.",
        "Step 2: Generate sentence embeddings using a lightweight open-source model (all-MiniLM-L6-v2).",
        "Step 3: Query the vector collection and display the top-2 matching text chunks alongside their cosine similarity score.",
      ],
      deliverable: "A working Python script demonstrating semantic search retrieval with source citations.",
    },
    whatRemainsUnknown: "Whether you want to work on deep foundational model pre-training or building user-facing AI product experiences.",
    alternativePathways: [
      { pathwayId: "path_deg_product_management", title: "Associate Product Management", relationshipDescription: "Focus on user problems and product roadmaps rather than neural network code." },
      { pathwayId: "path_deg_gate_higher_ed", title: "M.Tech / MS Research Specialization", relationshipDescription: "Pursue deep academic research leading to PhD or corporate research labs." },
    ],
    tags: ["AI", "Machine Learning", "Python", "PyTorch", "Degree Engineering"],
  },
  {
    id: "path_deg_product_management",
    title: "Associate Product Management (APM) & Tech Strategy",
    type: "emerging_frontier",
    categoryId: "business_entrepreneurship",
    categoryLabel: "Business & Ventures",
    stageSuitability: ["degree-engineering"],
    isCuriosityOnly: false,
    headlineSummary: "Acting as the cross-functional bridge between software engineers, UX designers, and business stakeholders.",
    detailedOverview: "Product managers define 'what to build and why', while engineers figure out 'how to build it'. APMs conduct customer discovery interviews, prioritize sprint backlog tickets, define product requirement documents (PRDs), and track key retention and adoption metrics.",
    whatPeopleLearnOrDo: [
      "Authoring comprehensive Product Requirement Documents (PRDs) with clear user stories",
      "Defining North Star metrics, funnel conversion ratios, and retention cohorts",
      "Facilitating sprint planning meetings and prioritizing features using RICE frameworks",
      "Analyzing user analytics dashboards (Mixpanel, PostHog) to identify drop-off points",
    ],
    dayInTheLife: [
      {
        title: "Sprint Standup & User Discovery",
        timeframe: "9:30 AM – 1:00 PM",
        activities: ["Resolving a blocker between engineering and design on a payment checkout flow", "Interviewing 2 active customers about why they abandoned an export feature"],
        environmentNote: "Collaborative office space with digital whiteboards (Miro), Jira, and Notion",
      },
    ],
    foundationalSkills: [
      { name: "PRD Writing & User Stories", category: "technical_tool", description: "Writing unambiguous acceptance criteria for engineering teams" },
      { name: "Data-Driven Prioritization", category: "subject_foundation", description: "RICE scoring (Reach, Impact, Confidence, Effort) and funnel analytics" },
      { name: "Cross-Functional Empathy", category: "thinking_disposition", description: "Translating business goals into technical requirements without dictating implementation" },
    ],
    educationRoutes: [
      {
        id: "er_deg_pm_1",
        title: "Undergraduate Degree + APM Rotational Programs / Startup Product Internships",
        routeType: "degree",
        duration: "Degree completion + 1-2 Year APM track",
        prerequisites: "Any undergraduate degree (Engineering, Commerce, Design, or Arts)",
        honestWorkloadNote: "Requires strong analytical thinking and communication; campus placement or case competition entry",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Open to engineering, commerce, and design graduates with demonstrated product curiosity.",
      tradeoffsToConsider: [
        "You hold responsibility for product success without formal authority over team members; requires leadership through influence",
        "High ambiguity: requirements shift frequently based on real market feedback",
      ],
      honestDisclaimer: "Demanding cross-functional role; best suited for organized, communicative analytical minds.",
    },
    beforeYouCommitTrial: {
      title: "Feature Tear-Down & PRD Specification",
      objective: "Write a 1-page Product Requirement Document (PRD) proposing an 'Offline Mode' feature for a music streaming app",
      estimatedMinutes: 50,
      format: "case_analysis",
      stepByStepPrompt: [
        "Step 1: Define the Problem Statement: Who suffers when internet cuts out?",
        "Step 2: List 3 User Stories with clear 'Given-When-Then' acceptance criteria.",
        "Step 3: Define 2 Success Metrics and list 1 intentional out-of-scope tradeoff.",
      ],
      deliverable: "A structured 1-page PRD document ready for engineering review.",
    },
    whatRemainsUnknown: "Whether you will enjoy the high-pressure coordination of product management or miss directly writing code/creating designs.",
    alternativePathways: [
      { pathwayId: "path_deg_ai_ml_systems", title: "Applied AI / ML Systems", relationshipDescription: "Remain on the hands-on engineering track writing software algorithms." },
    ],
    tags: ["Product Management", "APM", "Strategy", "Tech Leadership", "Degree Engineering"],
  },
  {
    id: "path_deg_gate_higher_ed",
    title: "M.Tech / MS Research Specialization & Academic Specialization",
    type: "traditional_degree",
    categoryId: "analysis_problem_solving",
    categoryLabel: "Analysis & Logic",
    stageSuitability: ["degree-engineering"],
    isCuriosityOnly: false,
    headlineSummary: "Cracking national competitive tests (GATE) or GRE/TOEFL to pursue research-driven Masters degrees in premier global institutes.",
    detailedOverview: "For undergraduate students who want to deepen their theoretical expertise rather than take an early generalist IT services job. Preparing for GATE (Graduate Aptitude Test in Engineering) opens doors to M.Tech programs at IITs/IISc, PSU public sector recruitments, and international research universities.",
    whatPeopleLearnOrDo: [
      "Mastering undergraduate engineering subjects to high conceptual depth",
      "Conducting literature reviews on published IEEE and ACM research papers",
      "Designing novel experiments in specialized departmental laboratories",
      "Writing academic research papers with peer-reviewed mathematical rigor",
    ],
    dayInTheLife: [
      {
        title: "Intensive Problem-Solving & Research Review",
        timeframe: "8:00 AM – 12:00 PM",
        activities: ["Solving 20 advanced previous-year GATE problems in Computer Organization", "Reading a newly published paper on distributed database consensus protocols"],
        environmentNote: "University library study carrel or departmental research laboratory",
      },
    ],
    foundationalSkills: [
      { name: "Advanced Theoretical Foundations", category: "subject_foundation", description: "Deep conceptual mastery across 10+ undergraduate subject domains" },
      { name: "Academic Literature Review", category: "subject_foundation", description: "Extracting methodologies and baseline comparisons from published research" },
      { name: "Sustained Self-Study Discipline", category: "thinking_disposition", description: "Maintaining 12–18 months of focused, rigorous exam preparation" },
    ],
    educationRoutes: [
      {
        id: "er_deg_gate_1",
        title: "2-Year M.Tech / MS by Research at IITs, NITs, IISc (via GATE) or International MS (via GRE)",
        routeType: "integrated_masters",
        duration: "2 Years",
        prerequisites: "B.Tech / B.E. / MCA / M.Sc with valid GATE score",
        honestWorkloadNote: "Tuition is typically subsidized with government MHRD teaching assistantship stipends for GATE qualifiers",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "B.Tech / B.E. degree completion with competitive GATE or GRE percentile.",
      tradeoffsToConsider: [
        "Postpones immediate corporate employment and full-time earning by 2 years",
        "Demands high resilience: research theses often encounter dead-ends before producing breakthroughs",
      ],
      honestDisclaimer: "Prepares students for specialized R&D roles, high-end engineering positions, and academic doctorates.",
    },
    beforeYouCommitTrial: {
      title: "GATE Subject Diagnostic Test",
      objective: "Attempt 5 standard 2-mark GATE questions from Operating Systems and Theory of Computation under exam time conditions",
      estimatedMinutes: 45,
      format: "case_analysis",
      stepByStepPrompt: [
        "Step 1: Download the official previous year GATE question paper.",
        "Step 2: Solve 3 questions on regular expressions and finite automata without consulting solutions.",
        "Step 3: Score your attempts and note whether you enjoy conceptual mathematical proofs.",
      ],
      deliverable: "Scored diagnostic sheet with honest notes on theoretical comprehension.",
    },
    whatRemainsUnknown: "Whether your long-term goal is corporate industrial R&D or an academic university professorship.",
    alternativePathways: [
      { pathwayId: "path_deg_ai_ml_systems", title: "Applied AI Systems", relationshipDescription: "Focus on commercial production codebases rather than academic thesis publications." },
    ],
    tags: ["GATE", "M.Tech", "Higher Education", "Research", "Degree Engineering"],
  },

  // ===========================================================================
  // STAGE 6: FINAL-YEAR STUDENTS & GRADUATES (Transition, Roles & Alternatives)
  // ===========================================================================
  {
    id: "path_grad_early_career_eng",
    title: "Software Engineer / Associate Consultant (Campus-to-Corporate)",
    type: "traditional_degree",
    categoryId: "technology",
    categoryLabel: "Technology & Software",
    stageSuitability: ["final-year-grad"],
    isCuriosityOnly: false,
    headlineSummary: "Navigating the first 2 years in industry: writing production code, participating in sprint reviews, and mastering teamwork.",
    detailedOverview: "The transition from university student to corporate software engineer involves far more than syntax. Early-career engineers learn how to read large 100,000-line legacy codebases, write unit and integration tests, handle CI/CD automated deployments, and communicate clearly in cross-functional standup meetings.",
    whatPeopleLearnOrDo: [
      "Contributing bug fixes and features within massive multi-developer code repositories",
      "Writing thorough automated unit and end-to-end tests to prevent production regressions",
      "Understanding corporate sprint cadences, estimation story points, and Agile retrospectives",
      "Communicating status updates proactively to engineering leads and product managers",
    ],
    dayInTheLife: [
      {
        title: "Daily Standup & Production Code Review",
        timeframe: "9:30 AM – 1:00 PM",
        activities: ["Giving a 2-minute concise standup update on yesterday's pull request", "Incorporating senior engineer review comments regarding database query indexing"],
        environmentNote: "Corporate software desk or remote workstation with Slack, Jira, and GitHub",
      },
    ],
    foundationalSkills: [
      { name: "Production Debugging", category: "thinking_disposition", description: "Reading application logs and stack traces to isolate intermittent bugs" },
      { name: "Automated Testing Discipline", category: "technical_tool", description: "Writing unit tests (Jest, PyTest, JUnit) that cover edge cases" },
      { name: "Professional Asynchronous Communication", category: "thinking_disposition", description: "Documenting technical decisions clearly in PR descriptions and Slack" },
    ],
    educationRoutes: [
      {
        id: "er_grad_eng_1",
        title: "Campus Placements or Off-Campus Entry-Level Software Engineering Roles",
        routeType: "degree",
        duration: "Full-Time Corporate Employment",
        prerequisites: "Undergraduate degree completion in CS, IT, ECE, or related domain",
        honestWorkloadNote: "Requires passing online coding assessments (DSA) followed by 2–3 rounds of technical and managerial interviews",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Completed Bachelor's degree (B.Tech, BCA, B.Sc, MCA); demonstrable code samples.",
      tradeoffsToConsider: [
        "First 6 months involve steep learning curves and feeling overwhelmed by legacy systems",
        "Balancing routine sprint ticket delivery with continuing personal skill development",
      ],
      honestDisclaimer: "The foundational launchpad for long-term technology careers; focuses on professional consistency.",
    },
    beforeYouCommitTrial: {
      title: "Open Source Code Review Simulation",
      objective: "Find an active open-source repository on GitHub, review 2 recently merged pull requests, and write an analysis of how code quality was enforced",
      estimatedMinutes: 45,
      format: "case_analysis",
      stepByStepPrompt: [
        "Step 1: Open a popular open-source repository (e.g., Supabase, Next.js, FastAPI).",
        "Step 2: Inspect a merged PR: look at comments made by maintainers.",
        "Step 3: Document 3 standards enforced (naming conventions, test coverage, backwards compatibility).",
      ],
      deliverable: "A 1-page review summarizing corporate code review standards.",
    },
    whatRemainsUnknown: "Whether you thrive in structured large corporate enterprises or fast-moving early-stage startups.",
    alternativePathways: [
      { pathwayId: "path_grad_disciplined_venture", title: "Disciplined Entrepreneurship", relationshipDescription: "Build your own software service or client consultancy rather than joining an existing firm." },
    ],
    tags: ["Software Engineering", "Early Career", "Corporate", "Agile", "Final Year Grad"],
  },
  {
    id: "path_grad_policy_fellowship",
    title: "Public Policy & Social Governance Fellowships",
    type: "emerging_frontier",
    categoryId: "social_impact",
    categoryLabel: "Social Impact & People",
    stageSuitability: ["final-year-grad"],
    isCuriosityOnly: false,
    headlineSummary: "1 to 2-year structured prestigious fellowships working directly in district administrations, rural education, or policy think tanks.",
    detailedOverview: "For graduates seeking purpose-driven impact before committing to conventional corporate jobs. Programs like Teach For India, Gandhi Fellowship, Chief Minister's Good Governance Fellowship (CMGGA), and PRS Legislative Research place graduates on ground-level governance and education missions.",
    whatPeopleLearnOrDo: [
      "Working directly with government school teachers, district collectors, and village panchayats",
      "Designing and implementing grassroots interventions that improve public service delivery",
      "Gathering field data to identify systemic policy bottlenecks and submitting evidence briefs",
      "Developing deep resilience, cross-cultural empathy, and leadership under resource constraints",
    ],
    dayInTheLife: [
      {
        title: "Field Stakeholder Engagement",
        timeframe: "8:30 AM – 2:00 PM",
        activities: ["Visiting 2 rural primary schools to observe student reading fluency assessments", "Meeting with district education officers to present weekly baseline attendance data"],
        environmentNote: "District administrative offices, community classrooms, and field sites",
      },
    ],
    foundationalSkills: [
      { name: "Ground-Level Empathy", category: "thinking_disposition", description: "Listening to community concerns without imposing urban assumptions" },
      { name: "Stakeholder Management", category: "thinking_disposition", description: "Working respectfully with government officials, local leaders, and citizens" },
      { name: "Field Data Collection", category: "subject_foundation", description: "Conducting unbiased surveys and analyzing real ground-level indicators" },
    ],
    educationRoutes: [
      {
        id: "er_grad_fel_1",
        title: "1–2 Year Competitive Fellowship Programs with Living Stipend",
        routeType: "vocational_certification",
        duration: "1 to 2 Years",
        prerequisites: "Any completed undergraduate or postgraduate degree",
        honestWorkloadNote: "Highly competitive multi-stage selection including essays, phone interviews, group case challenges, and personal interviews",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Graduation in any stream (Engineering, Arts, Commerce, Science).",
      tradeoffsToConsider: [
        "Field postings often involve living in semi-urban or rural environments with basic amenities",
        "Stipends cover living costs but are modest compared to corporate tech salaries",
      ],
      honestDisclaimer: "Transformational personal and leadership experience; highly regarded for subsequent MBA, MPP, or social leadership careers.",
    },
    beforeYouCommitTrial: {
      title: "District Service Bottleneck Analysis",
      objective: "Select one public civic service in your city (e.g., municipal waste segregation or ration distribution) and map 3 systemic failure points",
      estimatedMinutes: 45,
      format: "case_analysis",
      stepByStepPrompt: [
        "Step 1: Map the official intended citizen journey step-by-step.",
        "Step 2: Identify where actual citizens get stuck (long queues, lack of digital access, confusing paperwork).",
        "Step 3: Propose 1 administrative process improvement that costs zero extra money.",
      ],
      deliverable: "A 1-page civic bottleneck diagnostic note.",
    },
    whatRemainsUnknown: "Whether you will want to transition into permanent civil services/politics or return to corporate social responsibility (CSR).",
    alternativePathways: [
      { pathwayId: "path_grad_early_career_eng", title: "Early Career Corporate Roles", relationshipDescription: "Conventional corporate employment path." },
    ],
    tags: ["Fellowship", "Public Policy", "Social Impact", "Governance", "Final Year Grad"],
  },
  {
    id: "path_grad_disciplined_venture",
    title: "Disciplined Tech & Service Entrepreneurship (Bootstrapping)",
    type: "emerging_frontier",
    categoryId: "business_entrepreneurship",
    categoryLabel: "Business & Ventures",
    stageSuitability: ["final-year-grad"],
    isCuriosityOnly: false,
    headlineSummary: "Building customer-funded software utilities, agency services, or niche micro-businesses without relying on venture capital hype.",
    detailedOverview: "For graduates who want to build their own company with operational discipline. Avoids the trap of chasing vanity venture capital pitch decks. Focuses on discovering a paying customer pain point, building a minimum viable product (MVP), generating real cash flow from Day 1, and iterating based on paying customer feedback.",
    whatPeopleLearnOrDo: [
      "Conducting customer discovery interviews that validate willingness to pay before writing code",
      "Building rapid, functional MVPs using modern full-stack web and low-code tools",
      "Managing cash-flow runway, basic bookkeeping, client invoicing, and GST compliance",
      "Acquiring early customers through cold outreach, helpful content marketing, and word-of-mouth",
    ],
    dayInTheLife: [
      {
        title: "Customer Discovery & Outreach",
        timeframe: "9:00 AM – 1:00 PM",
        activities: ["Sending 15 personalized email inquiries to small business owners about their inventory pain points", "Conducting a 20-minute Zoom demo showing an automated WhatsApp alert tool"],
        environmentNote: "Home office or co-working space with laptop and coffee",
      },
    ],
    foundationalSkills: [
      { name: "Customer Discovery Interviewing", category: "thinking_disposition", description: "Asking questions about past behavior without pitching your idea prematurely" },
      { name: "Rapid Prototyping", category: "technical_tool", description: "Shipping functional web MVPs in days rather than months" },
      { name: "Financial Runway Discipline", category: "subject_foundation", description: "Controlling expenses and prioritizing positive monthly cash flow" },
    ],
    educationRoutes: [
      {
        id: "er_grad_ent_1",
        title: "Self-Directed Bootstrapping / Startup Incubator Residency",
        routeType: "open_curiosity",
        duration: "1 to 2 Years Milestone-driven",
        prerequisites: "Undergraduate degree with 6–12 months of personal financial runway",
        honestWorkloadNote: "Demands total self-discipline, handling rejection, and wearing all hats (sales, tech, support, accounting)",
      },
    ],
    eligibilityAndRealities: {
      prerequisitesText: "Requires having at least 6–9 months of living expense savings or part-time freelance income.",
      tradeoffsToConsider: [
        "Income can be unpredictable during the first 6–12 months",
        "High emotional grit required when prospective customers say no",
      ],
      honestDisclaimer: "Disciplined, grounded approach to business building; rejects venture capital myths in favor of customer value.",
    },
    beforeYouCommitTrial: {
      title: "The 48-Hour Customer Willingness-to-Pay Test",
      objective: "Identify a real recurring problem faced by 3 local businesses or freelancers and validate whether they would pay ₹500/month to solve it",
      estimatedMinutes: 50,
      format: "case_analysis",
      stepByStepPrompt: [
        "Step 1: Write down 1 specific friction (e.g., generating GST invoices, tracking gym memberships).",
        "Step 2: Talk to 3 real business owners. Ask: 'How do you currently handle this? How much time does it waste?'",
        "Step 3: Document whether anyone asked to buy your proposed solution.",
      ],
      deliverable: "A summary table of 3 customer interviews with documented quotes on willingness to pay.",
    },
    whatRemainsUnknown: "Whether you will maintain motivation without the external structure and steady monthly paycheck of a corporate job.",
    alternativePathways: [
      { pathwayId: "path_grad_early_career_eng", title: "Software Engineer in Industry", relationshipDescription: "Gain 2–3 years of professional experience and savings inside an established firm first." },
    ],
    tags: ["Entrepreneurship", "Bootstrapping", "Startups", "Business", "Final Year Grad"],
  },
];

