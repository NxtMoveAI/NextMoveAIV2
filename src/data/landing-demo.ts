export type AcademicStageId =
  | 'classes-4-7'
  | 'classes-8-10'
  | 'classes-11-12'
  | 'diploma'
  | 'degree-engineering'
  | 'final-year-grad';

export interface AcademicStage {
  id: AcademicStageId;
  label: string;
  sublabel: string;
  ageRange: string;
  focusTone: string;
  description: string;
}

export type InterestId =
  | 'technology'
  | 'creativity'
  | 'business'
  | 'science'
  | 'social-impact'
  | 'still-exploring';

export interface InterestOption {
  id: InterestId;
  label: string;
  iconName: string;
  shortDesc: string;
}

export interface InteractiveActivity {
  id: string;
  title: string;
  duration: string;
  tag: string;
  description: string;
  whatYouWillLearn: string;
  clarifiesDecision: string;
}

export interface ExplorationResult {
  headline: string;
  introduction: string;
  suggestedPaths: Array<{
    title: string;
    description: string;
    badge: string;
    tagColor?: string;
  }>;
  interactiveActivities?: InteractiveActivity[];
  practicalTrial: {
    title: string;
    timeEstimate: string;
    description: string;
    firstStep: string;
    reflectionPrompt: string;
  };
  nextAction: {
    title: string;
    description: string;
    ctaText: string;
  };
  curatedInsights: string[];
}

export const ACADEMIC_STAGES: AcademicStage[] = [
  {
    id: 'classes-4-7',
    label: 'Classes 4 – 7',
    sublabel: 'Middle School',
    ageRange: 'Ages 9–12',
    focusTone: 'Curiosity & Playful Discovery',
    description: 'Discover what you enjoy doing without any pressure to pick a career.',
  },
  {
    id: 'classes-8-10',
    label: 'Classes 8 – 10',
    sublabel: 'High School',
    ageRange: 'Ages 13–15',
    focusTone: 'Interests & Subject Exploration',
    description: 'Explore subjects, real-world hobbies, and the streams available after 10th.',
  },
  {
    id: 'classes-11-12',
    label: 'Classes 11 – 12',
    sublabel: 'Pre-University / +2',
    ageRange: 'Ages 16–18',
    focusTone: 'Streams, Degrees & Alternatives',
    description: 'Understand entrance tests, degree options, realistic prerequisites, and hidden paths.',
  },
  {
    id: 'diploma',
    label: 'Diploma',
    sublabel: 'Polytechnic & Applied',
    ageRange: 'Applied Learning',
    focusTone: 'Hands-on Skills & Lateral Entry',
    description: 'Connect practical technical skills with lateral entry degrees or early industry work.',
  },
  {
    id: 'degree-engineering',
    label: 'Degree / Engineering',
    sublabel: 'Undergrad Years 1–3',
    ageRange: 'College & University',
    focusTone: 'Capabilities, Skills & Projects',
    description: 'Build real portfolio projects, explore cross-disciplinary skills, and find your domain.',
  },
  {
    id: 'final-year-grad',
    label: 'Final Year / Graduate',
    sublabel: 'Transition to Work / Higher Studies',
    ageRange: 'Graduating Students',
    focusTone: 'Verified Skills & Next Step Clarity',
    description: 'Prepare evidence of your work, compare higher studies vs roles, and avoid blind placement choices.',
  },
];

export const INTEREST_OPTIONS: InterestOption[] = [
  {
    id: 'technology',
    label: 'Technology & Coding',
    iconName: 'Cpu',
    shortDesc: 'Software, games, gadgets, data & AI',
  },
  {
    id: 'creativity',
    label: 'Design & Creativity',
    iconName: 'Palette',
    shortDesc: 'Visual art, writing, media, UI & storytelling',
  },
  {
    id: 'business',
    label: 'Business & Management',
    iconName: 'TrendingUp',
    shortDesc: 'Entrepreneurship, finance, marketing & systems',
  },
  {
    id: 'science',
    label: 'Science & Research',
    iconName: 'FlaskConical',
    shortDesc: 'Biology, physics, chemistry & how nature works',
  },
  {
    id: 'social-impact',
    label: 'Social Impact & Law',
    iconName: 'HeartHandshake',
    shortDesc: 'Community, public policy, teaching, law & climate',
  },
  {
    id: 'still-exploring',
    label: 'I am Still Exploring',
    iconName: 'Compass',
    shortDesc: 'Not sure yet, want to try a bit of everything',
  },
];

export const EXPLORATION_MATRIX: Record<
  AcademicStageId,
  Record<InterestId, ExplorationResult>
> = {
  'classes-4-7': {
    technology: {
      headline: 'Build playful curiosity with block games and mini-inventions',
      introduction:
        'At this age, you do not need to learn complex code syntax. Focus on how computers solve puzzles, make characters move, and bring simple ideas to life.',
      suggestedPaths: [
        {
          title: 'Block-based Visual Coding',
          description: 'Create interactive animations and simple games using visual drag-and-drop blocks.',
          badge: 'Fun & Creative',
        },
        {
          title: 'How Gadgets Work',
          description: 'Discover what is inside everyday tech like remote controls, smart speakers, and screens.',
          badge: 'Tinkering',
        },
        {
          title: 'Logic Puzzles & Mazes',
          description: 'Strengthen problem-solving with riddles, pattern challenges, and algorithmic thinking games.',
          badge: 'Foundations',
        },
      ],
      practicalTrial: {
        title: 'Make a Digital Birthday Card in Scratch',
        timeEstimate: '20 mins',
        description: 'Animate two cartoon characters with spoken dialogue and a festive background sound.',
        firstStep: 'Pick two characters (sprites) and add a "say hello" block when green flag is clicked.',
        reflectionPrompt: 'Did you enjoy figuring out the timing of the characters talking to each other?',
      },
      nextAction: {
        title: 'Save your creative Scratch projects in your private student workspace',
        description: 'Track how your creative projects evolve without any grades or scorecards.',
        ctaText: 'Explore Middle School Playground',
      },
      curatedInsights: [
        'No premature career labels or job tests',
        'Safe, supervised, parent-friendly exploration',
        'Builds logic through play, not rote memorization',
      ],
    },
    creativity: {
      headline: 'Unleash storytelling, digital drawings, and creative world-building',
      introduction:
        'Every creative journey starts with expressing stories you care about—whether through comic strips, paper crafts, or simple digital audio recordings.',
      suggestedPaths: [
        {
          title: 'Comic Strip Creation',
          description: 'Draw 4-panel stories featuring original characters solving everyday school or sci-fi adventures.',
          badge: 'Storytelling',
        },
        {
          title: 'Digital Art & Color Exploration',
          description: 'Experiment with digital drawing tools, shapes, and color palettes on a tablet or computer.',
          badge: 'Visual Arts',
        },
        {
          title: 'Voice Acting & Mini Podcasts',
          description: 'Record a 60-second audio story with voice changes and background sound effects.',
          badge: 'Audio & Media',
        },
      ],
      practicalTrial: {
        title: 'The 4-Panel Superhero Comic',
        timeEstimate: '15 mins',
        description: 'Draw a comic where an unusual everyday object (like a pencil or eraser) gains a superpower.',
        firstStep: 'Fold a paper into 4 squares. In box 1, show normal life; in box 4, show the twist ending.',
        reflectionPrompt: 'Did you like writing the story dialogue more, or drawing the character expressions?',
      },
      nextAction: {
        title: 'Build a private digital sketchbook of creative trials',
        description: 'Keep your sketches and stories organized to see how your creative style grows.',
        ctaText: 'Start Creative Showcase',
      },
      curatedInsights: [
        'Encourages imaginative self-expression',
        'No right or wrong answers',
        'Builds observational and communication skills',
      ],
    },
    business: {
      headline: 'Understand how small stalls, value, and problem-solving work',
      introduction:
        'Business at this stage is all about understanding what people need, how bartering works, and how everyday shops manage their supplies.',
      suggestedPaths: [
        {
          title: 'Classroom Marketplace Simulation',
          description: 'Design homemade bookmarks or origami and understand how pricing and demand work.',
          badge: 'Mini-Venture',
        },
        {
          title: 'Smart Pocket Money Tracker',
          description: 'Learn the difference between "needs", "wants", and long-term saving goals in a simple journal.',
          badge: 'Financial Literacy',
        },
        {
          title: 'The Neighborhood Shop Tour',
          description: 'Observe how a local grocery store decides which snacks to keep near the counter.',
          badge: 'Observation',
        },
      ],
      practicalTrial: {
        title: 'Design a Bookmark Brand for Bookworms',
        timeEstimate: '20 mins',
        description: 'Create 3 themed bookmarks and calculate how much paper was used to make them.',
        firstStep: 'Draft a catchy slogan for your bookmark and design a unique corner tab.',
        reflectionPrompt: 'Would people want this because it is beautiful, or because it makes reading easier?',
      },
      nextAction: {
        title: 'Log your mini-projects in your student journal',
        description: 'Reflect on what you liked about creating value for others.',
        ctaText: 'Explore Practical Projects',
      },
      curatedInsights: [
        'Develops early ethical financial habits',
        'Focuses on empathy and understanding user needs',
        'Completely safe, age-appropriate activities',
      ],
    },
    science: {
      headline: 'Observe nature, ask curious "why" questions, and test mini-hypotheses',
      introduction:
        'Science begins with curiosity about the world around you: why leaves change color, how plants drink water, and why stars sparkle.',
      suggestedPaths: [
        {
          title: 'Kitchen Science Detective',
          description: 'Explore safe physical reactions like baking soda bubbles and capillary action in celery.',
          badge: 'Experiments',
        },
        {
          title: 'Stargazer & Astronomy Log',
          description: 'Track moon phases over 14 days and spot easily visible constellations in the evening sky.',
          badge: 'Space & Sky',
        },
        {
          title: 'Biodiversity Backyard Hunt',
          description: 'Document 5 different insects or bird species in your neighborhood and sketch their features.',
          badge: 'Ecology',
        },
      ],
      practicalTrial: {
        title: 'The Capillary Color Ladder',
        timeEstimate: '15 mins',
        description: 'Place white flowers or celery in colored water to watch the invisible veins transport liquids.',
        firstStep: 'Fill two small glasses with water and add 5 drops of food coloring.',
        reflectionPrompt: 'How fast did the color reach the tips? What does this tell you about tree tops?',
      },
      nextAction: {
        title: 'Start a Young Explorer observation diary',
        description: 'Keep note of curious questions you can ask your science teachers.',
        ctaText: 'Begin Nature Log',
      },
      curatedInsights: [
        'Hands-on, sensory exploration',
        'Builds a scientific mindset without memorizing formulas',
        'Safe home activities with everyday household items',
      ],
    },
    'social-impact': {
      headline: 'Empathy, community kindness, and caring for people and animals',
      introduction:
        'Understanding how our actions affect friends, neighbors, stray animals, and the planet is the foundation of future changemakers.',
      suggestedPaths: [
        {
          title: 'Neighborhood Kindness Action',
          description: 'Organize a safe clean-up spot or build a clay water bowl for birds during hot afternoons.',
          badge: 'Community',
        },
        {
          title: 'The Waste & Recycling Audit',
          description: 'Track how much plastic your home uses in three days and brainstorm 2 easy alternatives.',
          badge: 'Environment',
        },
        {
          title: 'School Peer Support Buddy',
          description: 'Learn how to listen patiently when a classmate is feeling quiet, nervous, or left out.',
          badge: 'Empathy',
        },
      ],
      practicalTrial: {
        title: 'The Home Eco-Inspector Checklist',
        timeEstimate: '15 mins',
        description: 'Walk around your home and spot 3 lights or taps left running unnecessarily.',
        firstStep: 'Draw a mini checklist of 5 rooms on a scrap sheet of paper.',
        reflectionPrompt: 'Was it easy to help your family change a small daily habit without arguing?',
      },
      nextAction: {
        title: 'Record your impact stories in Next Move AI',
        description: 'See how small acts of community service foster teamwork and leadership.',
        ctaText: 'Join Changemaker Track',
      },
      curatedInsights: [
        'Instills values of civic responsibility early',
        'Builds emotional intelligence and communication',
        'Recognizes everyday kindness as leadership',
      ],
    },
    'still-exploring': {
      headline: 'No need to choose right now—try 3 completely different mini-adventures',
      introduction:
        'The best thing about classes 4 to 7 is that you have plenty of time. Great scientists often love music, and great engineers love sketching!',
      suggestedPaths: [
        {
          title: 'Mystery Skill Wheel',
          description: 'Pick one mini-activity from arts, one from gadgets, and one from nature each weekend.',
          badge: 'Sampler',
        },
        {
          title: 'The Curiosity Notebook',
          description: 'Whenever you wonder "How does that work?", write it down to explore later without pressure.',
          badge: 'Reflection',
        },
        {
          title: 'Hands-on Maker Weekend',
          description: 'Cardboard construction, origami geometry, and building marble runs from recycled boxes.',
          badge: 'Making',
        },
      ],
      practicalTrial: {
        title: 'The 3-Item Curiosity Challenge',
        timeEstimate: '10 mins',
        description: 'Pick 3 random objects in your room and invent a story where they save a lost astronaut.',
        firstStep: 'Write the 3 items down and brainstorm one surprising connection.',
        reflectionPrompt: 'Did you enjoy making up the story, or did you want to build the spaceship physically?',
      },
      nextAction: {
        title: 'Start a pressure-free exploration journey',
        description: 'Discover your interests naturally through small experiments and reflective moments.',
        ctaText: 'Explore Without Pressure',
      },
      curatedInsights: [
        'Zero pressure to pick a stream or career',
        'Helps parents understand what brings their child joy',
        'Celebrates multidimensional curiosity',
      ],
    },
  },
  'classes-8-10': {
    technology: {
      headline: 'Connect problem solving to real code, websites, and algorithmic logic',
      introduction:
        'Move from simple block coding to writing real script logic in Python or HTML, and see how modern apps and games are constructed under the hood.',
      suggestedPaths: [
        {
          title: 'Introduction to Python Logic',
          description: 'Learn variables, loops, and conditions by building a text-based adventure or quiz game.',
          badge: 'Core Programming',
        },
        {
          title: 'Web Basics: HTML & CSS',
          description: 'Build your first personal website showcasing your favorite hobby or school club.',
          badge: 'Web Creation',
        },
        {
          title: 'Robotics & Arduino Sensors',
          description: 'Connect hardware sensors to motors to create automated door alarms or plant waterers.',
          badge: 'Physical Computing',
        },
      ],
      practicalTrial: {
        title: 'Build a Terminal Quiz in Python',
        timeEstimate: '25 mins',
        description: 'Write a 5-question interactive quiz that calculates a final score and provides custom tips.',
        firstStep: 'Define 3 variables for questions and use `input()` to capture the user response.',
        reflectionPrompt: 'Did you like debugging errors when the code broke, or writing the question logic?',
      },
      nextAction: {
        title: 'Understand how Computer Science maps to 11th-12th stream choices',
        description: 'Compare PCM with CS vs other combinations before making high school stream choices.',
        ctaText: 'Compare 11th Stream Options',
      },
      curatedInsights: [
        'Relevant for CBSE, ICSE, and State Board curriculum',
        'Focuses on computational thinking, not just typing code',
        'Clarifies stream requirements early without stress',
      ],
    },
    creativity: {
      headline: 'Discover UI/UX design, visual identity, digital storytelling & content design',
      introduction:
        'If you love drawing, typography, or video editing, explore how creative skills power modern product design, animation studios, and brand agencies.',
      suggestedPaths: [
        {
          title: 'Product & App UI Design Basics',
          description: 'Learn how mobile apps arrange buttons, colors, and layouts using tools like Figma.',
          badge: 'Design Thinking',
        },
        {
          title: 'Digital Illustration & Poster Art',
          description: 'Master visual hierarchy, font pairing, and color psychology for school event posters.',
          badge: 'Visual Arts',
        },
        {
          title: 'Creative Writing & Scripting',
          description: 'Write character arcs, world bibles, and video essays on topics you care about.',
          badge: 'Content & Media',
        },
      ],
      practicalTrial: {
        title: 'Redesign Your School Bus App Screen',
        timeEstimate: '20 mins',
        description: 'Sketch a mobile screen that shows a student whether their bus is 5 minutes away.',
        firstStep: 'Draw a phone wireframe on paper and place the 3 most urgent pieces of info at the top.',
        reflectionPrompt: 'Did you focus on making it look stylish, or making the information crystal clear?',
      },
      nextAction: {
        title: 'Explore Design and Humanities pathways for Class 11 & 12',
        description: 'Understand design entrance exams like UCEED, NID, and emerging creative degree routes.',
        ctaText: 'View Creative Education Routes',
      },
      curatedInsights: [
        'Dispel myths that creative students have limited careers',
        'Hands-on portfolio building starts early',
        'Combines aesthetics with analytical thinking',
      ],
    },
    business: {
      headline: 'Learn how companies work, products solve problems, and markets trade',
      introduction:
        'From local startups in Indian cities to global platforms, discover what makes a business trustworthy, profitable, and sustainable over time.',
      suggestedPaths: [
        {
          title: 'Introduction to Commerce & Economics',
          description: 'Understand supply and demand, inflation, banking, and how currencies work.',
          badge: 'Foundations',
        },
        {
          title: 'Product Case Study Teardown',
          description: 'Analyze why UPI succeeded in India and how small vendors adopted digital payments.',
          badge: 'Market Analysis',
        },
        {
          title: 'Junior Entrepreneurship Canvas',
          description: 'Map out a solution for a school challenge: identify customer, cost, and benefit.',
          badge: 'Innovation',
        },
      ],
      practicalTrial: {
        title: 'UPI Vendor Adoption Teardown',
        timeEstimate: '20 mins',
        description: 'Interview one local tea vendor or grocer on why they prefer QR codes over cash.',
        firstStep: 'Prepare 3 polite questions about speed, change return, and daily settlement.',
        reflectionPrompt: 'Was their biggest reason convenience, safety, or customer demand?',
      },
      nextAction: {
        title: 'Compare Commerce with Maths vs Commerce without Maths',
        description: 'Understand how 11th subject combinations affect CA, BBA, Economics, and Fintech paths.',
        ctaText: 'Explore Commerce Combinations',
      },
      curatedInsights: [
        'Grounds abstract financial theory in Indian market realities',
        'Helps decide between Commerce and Humanities streams',
        'Develops critical thinking about numbers and incentives',
      ],
    },
    science: {
      headline: 'Deep dive into pure sciences, biotechnology, and physics concepts',
      introduction:
        'Test whether you enjoy theoretical derivations, laboratory research, or applying science to medical and environmental challenges.',
      suggestedPaths: [
        {
          title: 'Hands-on Physics Phenomena',
          description: 'Build optics prisms, electromagnets, and water rockets to verify classical physics laws.',
          badge: 'Applied Physics',
        },
        {
          title: 'Cellular Biology & Genetics Intro',
          description: 'Understand DNA structure, gene inheritance patterns, and modern CRISPR innovations.',
          badge: 'Life Sciences',
        },
        {
          title: 'Chemistry in Daily Life',
          description: 'Analyze polymers, acids, bases, and renewable batteries powering electric vehicles.',
          badge: 'Chemical Sciences',
        },
      ],
      practicalTrial: {
        title: 'Extract DNA from a Banana or Strawberry',
        timeEstimate: '25 mins',
        description: 'Use salt, liquid soap, and chilled rubbing alcohol to isolate visible white DNA strands.',
        firstStep: 'Mash the fruit in a ziplock bag and add the soapy extraction buffer solution.',
        reflectionPrompt: 'Did seeing real biological molecules change how you think of textbook diagrams?',
      },
      nextAction: {
        title: 'Evaluate PCB vs PCM vs PCMB before 11th admissions',
        description: 'Understand workloads, NEET/JEE realities, and non-medical biotechnology degrees.',
        ctaText: 'Compare Science Combinations',
      },
      curatedInsights: [
        'Breaks beyond the binary "Doctor vs Engineer" stereotype',
        'Highlights research institutes (IISc, IISER, NISER)',
        'Realistic expectations on study hours and entrance tests',
      ],
    },
    'social-impact': {
      headline: 'Explore civics, constitutional rights, public policy, and environmental action',
      introduction:
        'Discover how laws are drafted, how courtrooms resolve conflicts, and how non-profit organizations solve systemic challenges.',
      suggestedPaths: [
        {
          title: 'Model United Nations & Debating',
          description: 'Research international policies, articulate counterarguments, and draft consensus resolutions.',
          badge: 'Public Speaking',
        },
        {
          title: 'Indian Constitution & Citizen Rights',
          description: 'Understand Fundamental Rights, Directive Principles, and how public interest litigation works.',
          badge: 'Legal Studies',
        },
        {
          title: 'Urban Ecology & Waste Management',
          description: 'Study how your city treats sewage, organizes landfills, and plans green corridors.',
          badge: 'Civic Research',
        },
      ],
      practicalTrial: {
        title: 'Draft a 3-Minute Policy Speech on Traffic Safety',
        timeEstimate: '20 mins',
        description: 'Propose one actionable rule for your neighborhood to protect school pedestrians.',
        firstStep: 'Identify the exact intersection that causes problems and cite one specific risk factor.',
        reflectionPrompt: 'Was it harder to identify the problem or to balance driver vs pedestrian needs?',
      },
      nextAction: {
        title: 'Look into Humanities, Law (CLAT), and Social Science routes',
        description: 'Discover 5-year integrated BA LLB programs, Ashoka, TISS, and liberal arts options.',
        ctaText: 'Explore Humanities & Law Paths',
      },
      curatedInsights: [
        'Demystifies career security in law, policy, and journalism',
        'Cultivates persuasive writing and debate stamina',
        'Validates social empathy as an elite professional capability',
      ],
    },
    'still-exploring': {
      headline: 'Sample 3 core streams before finalizing your Class 11 subject group',
      introduction:
        'It is completely normal to feel uncertain in 9th or 10th grade. Instead of guessing, try small mini-tasks across Science, Commerce, and Humanities.',
      suggestedPaths: [
        {
          title: 'Stream Comparison Matrix',
          description: 'See the true weekly schedule, future college entrances, and career branches for each stream.',
          badge: 'Stream Clarity',
        },
        {
          title: 'Three 20-Minute Taster Projects',
          description: 'Code a quiz (Science/Tech), analyze a balance sheet (Commerce), debate a policy (Humanities).',
          badge: 'Hands-on Taster',
        },
        {
          title: 'Debunking Stream Myths',
          description: 'Learn why Humanities is not "easy" and Science is not the only ticket to good employment.',
          badge: 'Perspective',
        },
      ],
      practicalTrial: {
        title: 'The "What Energized Me?" Week Tracker',
        timeEstimate: '5 mins/day',
        description: 'Rate your homework sessions across Math, History, and Science on a 1-5 energy scale.',
        firstStep: 'Keep a post-it on your study desk and record your energy level right after finishing tasks.',
        reflectionPrompt: 'Which subject made time fly by even when the problems were challenging?',
      },
      nextAction: {
        title: 'Use the Stream Decision Framework with your parents',
        description: 'Have a productive conversation based on evidence of what you enjoy, not peer gossip.',
        ctaText: 'Open Stream Decision Guide',
      },
      curatedInsights: [
        'Helps avoid changing streams midway through Class 11',
        'Fosters calm, respectful discussions with family',
        'Keeps multiple backup options open',
      ],
    },
  },
  'classes-11-12': {
    technology: {
      headline: "Interested in technology? Let's explore where it could take you.",
      introduction:
        'Discover educational pathways and realistic alternatives beyond entrance exam hype. Compare B.Tech, BCA, and B.Sc Computing options, explore self-directed building, and try beginner-friendly practical tasks.',
      suggestedPaths: [
        {
          title: 'Explore Relevant Education Pathways and Prerequisites',
          description:
            'Understand B.Tech CS, BCA, B.Sc Computer Science, and Data Science options, including entrance criteria, prerequisites, and alternative admissions.',
          badge: 'Education Pathways',
        },
        {
          title: 'Compare Different Study Options and Alternatives',
          description:
            'Weigh 4-year engineering vs 3-year degrees + MCA; analyze fee structures, curriculum depth, and campus recruitment realities without bias.',
          badge: 'Option Comparison',
        },
        {
          title: 'Try a Short Beginner-Friendly Technology Activity',
          description:
            'Test real coding, API data handling, or algorithmic logic in a 20-minute low-stakes micro-trial before making long-term tuition commitments.',
          badge: 'Starter Activity',
        },
      ],
      interactiveActivities: [
        {
          id: 'activity-api',
          title: 'Build a Live Currency Exchange Calculator',
          duration: '20 mins',
          tag: 'Web & APIs',
          description:
            'Fetch real-time exchange rates using a public API endpoint and parse currency JSON values in JavaScript.',
          whatYouWillLearn:
            'You will understand how client applications communicate with remote cloud servers and parse real-world data payloads.',
          clarifiesDecision:
            'Helps you discover whether hands-on software development and web applications feel exciting and intuitive.',
        },
        {
          id: 'activity-algo',
          title: 'Trace a Shortest-Path & Maze Algorithm',
          duration: '20 mins',
          tag: 'Logic & Algorithms',
          description:
            'Follow how a graph traversal algorithm searches grid nodes to find the optimal route through a maze.',
          whatYouWillLearn:
            'You will discover the difference between memorizing math formulae and applying algorithmic problem-solving to complex systems.',
          clarifiesDecision:
            'Helps you evaluate whether theoretical computer science, discrete mathematics, and competitive problem solving fit your thinking style.',
        },
      ],
      practicalTrial: {
        title: 'Build a Live Currency Exchange Calculator',
        timeEstimate: '20 mins',
        description: 'Fetch real-time currency rates using a free public API and display INR conversion values.',
        firstStep: 'Open a public JSON endpoint in your browser, inspect the currency keys, and extract the USD-to-INR rate.',
        reflectionPrompt: 'Did you find manipulating live API data intuitive, or do you prefer working with visual designs or system algorithms?',
      },
      nextAction: {
        title: 'Map out entrance exams and non-JEE top engineering & computing colleges',
        description: 'Explore state CETs, university portals, non-JEE technical programs, and independent admissions calendars.',
        ctaText: 'Explore Computing Portals',
      },
      curatedInsights: [
        'Comprehensive breakdown of Tier 1/2/3 college realities and cutoff expectations',
        'Emphasis on building GitHub proof of work alongside 12th board preparation',
        'Direct alternative degree pathways if entrance test ranks fall short of top institutions',
      ],
    },
    creativity: {
      headline: 'Prepare for design entrance tests, portfolio building, and digital media',
      introduction:
        'Understand design degrees (B.Des), animation, visual communication, and architecture, including what top colleges like NID, IIT IDC, and NIFT look for.',
      suggestedPaths: [
        {
          title: 'Design Aptitude & UCEED/NID Prep',
          description: 'Practice spatial ability, visualization puzzles, and 2D/3D perspective sketching.',
          badge: 'Entrance Exams',
        },
        {
          title: 'Interaction & Product UI/UX Design',
          description: 'Master Figma wireframes, user journeys, design systems, and usability heuristics.',
          badge: 'Digital Products',
        },
        {
          title: 'Animation, VFX & Game Art',
          description: 'Explore 3D modeling fundamentals, concept art, and game development pipelines.',
          badge: 'Entertainment',
        },
      ],
      practicalTrial: {
        title: 'Rapid Usability Redesign of IRCTC Booking',
        timeEstimate: '30 mins',
        description: 'Identify 2 friction points in Indian train booking and draw an improved mobile flow.',
        firstStep: 'Screenshot the seat availability screen and mark confusing button labels or contrast errors.',
        reflectionPrompt: 'How did you balance showing detailed information with keeping the screen uncluttered?',
      },
      nextAction: {
        title: 'Review the Step-by-Step B.Des Entrance & Portfolio Roadmap',
        description: 'Understand exam timelines, portfolio requirements, and studio test procedures.',
        ctaText: 'View Design Roadmap',
      },
      curatedInsights: [
        'Clarifies difference between Fine Arts and Industrial/UI Design',
        'Guidance on creating an original portfolio without expensive coaching',
        'Strong career salary trajectories in Indian tech startups',
      ],
    },
    business: {
      headline: 'Evaluate BBA, IPMAT, CA Foundation, Economics, and Fintech routes',
      introduction:
        'Understand premier 5-year integrated management programs (IIM Indore/Rohtak IPM), Chartered Accountancy timelines, and modern finance careers.',
      suggestedPaths: [
        {
          title: 'IPMAT & Integrated BBA+MBA Programs',
          description: 'Understand quantitative aptitude and verbal requirements for IIM entrance right after 12th.',
          badge: 'Top Programs',
        },
        {
          title: 'The CA / CMA / CFA Pathway Blueprint',
          description: 'Realistic pass percentages, article-ship commitments, and timeline alternatives.',
          badge: 'Professional Finance',
        },
        {
          title: 'Modern Marketing & Growth Systems',
          description: 'Explore performance marketing, SEO, unit economics, and customer acquisition costs.',
          badge: 'Digital Commerce',
        },
      ],
      practicalTrial: {
        title: 'Analyze Swiggy vs Zomato Unit Economics',
        timeEstimate: '25 mins',
        description: 'Calculate average order value, delivery fee breakdown, and restaurant commission margins.',
        firstStep: 'Review a public order bill and calculate what percentage goes to the platform.',
        reflectionPrompt: 'Does the business model rely more on volume or on high order margins?',
      },
      nextAction: {
        title: 'Compare B.Com (Hons), BBA, and B.A. Economics college requirements',
        description: 'Explore Delhi University CUET, NMIMS NPAT, Christ University, and Symbiosis SET.',
        ctaText: 'Compare Management Entrances',
      },
      curatedInsights: [
        'Objective analysis of CA vs Corporate Finance careers',
        'CUET exam strategy and subject mapping',
        'Practical understanding of startup equity and venture capital',
      ],
    },
    science: {
      headline: 'Evaluate Medical (NEET), Allied Health, Pure Research, and Biotechnology',
      introduction:
        'Explore what happens beyond the NEET race: B.Sc Research at IISc/IISER, Pharmacy, Biomedical Engineering, Forensic Science, and Clinical Psychology.',
      suggestedPaths: [
        {
          title: 'Research Pathways: IISc, IISER & IAT Exam',
          description: 'Understand BS-MS dual degrees, KVPY replacements, and scientific research careers.',
          badge: 'Pure Science',
        },
        {
          title: 'Allied Healthcare & Biotechnology',
          description: 'Explore high-demand fields like Clinical Trials, Genetics, Radiology, and Medical Devices.',
          badge: 'Healthcare Tech',
        },
        {
          title: 'NEET Realistic Decision Framework',
          description: 'Prepare calmly for medical admissions with clear backup routes and mental health balance.',
          badge: 'Medical Planning',
        },
      ],
      practicalTrial: {
        title: 'Explore a Clinical Drug Trial Case Study',
        timeEstimate: '25 mins',
        description: 'Understand Phase 1 to Phase 3 trial stages for an indigenous vaccine in India.',
        firstStep: 'Read an ICMR trial abstract and identify the primary efficacy endpoint.',
        reflectionPrompt: 'Did you find the patient safety protocol more interesting or the biochemical mechanism?',
      },
      nextAction: {
        title: 'Explore Non-NEET high-growth life science careers',
        description: 'See 12 emerging fields combining biology with data, instruments, and healthcare management.',
        ctaText: 'View Life Science Paths',
      },
      curatedInsights: [
        'Healthy perspective on drop year risks vs alternative scientific careers',
        'Comprehensive guide to IISER Aptitude Test (IAT) and NEST',
        'Biotech and pharmaceutical industry compensation trends',
      ],
    },
    'social-impact': {
      headline: 'Explore Law (CLAT/AILET), Civil Services foundations, and Public Policy',
      introduction:
        'Understand 5-year integrated law degrees at National Law Universities (NLUs), international relations, journalism, and social research careers.',
      suggestedPaths: [
        {
          title: 'CLAT & NLU Admissions Architecture',
          description: 'Understand critical reasoning, legal aptitude, and reading speed strategies for CLAT.',
          badge: 'Legal Entrances',
        },
        {
          title: 'Public Policy, Urban Planning & Sociology',
          description: 'Study how government schemes are implemented, audited, and reformed through data.',
          badge: 'Policy & Governance',
        },
        {
          title: 'Investigative Journalism & Media Ethics',
          description: 'Fact-checking methodologies, data journalism, and digital investigative storytelling.',
          badge: 'Communications',
        },
      ],
      practicalTrial: {
        title: 'Analyze a Landmark Supreme Court Judgment Summary',
        timeEstimate: '30 mins',
        description: 'Read a simplified 2-page privacy ruling and identify the ratio decidendi (core reasoning).',
        firstStep: 'Highlight the conflict between individual privacy and state regulatory interest.',
        reflectionPrompt: 'Did you enjoy weighing constitutional principles against practical governance?',
      },
      nextAction: {
        title: 'Evaluate NLU fees, scholarships, and corporate law vs litigation trade-offs',
        description: 'Understand corporate law salaries, judicial clerkships, and civil service transitions.',
        ctaText: 'Explore Legal Pathways',
      },
      curatedInsights: [
        'Honest assessment of CLAT competition and NLU tier comparisons',
        'Guidance on building analytical reading stamina',
        'Alternative 3-year LLB and private law school comparisons',
      ],
    },
    'still-exploring': {
      headline: 'A structured method to narrow down your university applications',
      introduction:
        'With board exams and multiple entrance tests approaching, discover how to build an balanced list of Dream, Target, and Safety colleges without panic.',
      suggestedPaths: [
        {
          title: 'University Tier & Backup Strategy',
          description: 'How to pick 2 ambitious entrances, 3 realistic matches, and 2 solid backups.',
          badge: 'Application Strategy',
        },
        {
          title: 'Cross-Disciplinary Degree Exploration',
          description: 'Explore hybrid degrees: B.Sc Data Science + Economics, Liberal Arts with Computer Science.',
          badge: 'Hybrid Degrees',
        },
        {
          title: 'ROI & College Fee Evaluation',
          description: 'Calculate return on investment, hostel costs, and true median placement statistics.',
          badge: 'Decision Tools',
        },
      ],
      practicalTrial: {
        title: 'Create Your Personal 3-Bucket College Grid',
        timeEstimate: '20 mins',
        description: 'List 1 ambitious dream college, 2 solid target colleges, and 1 guaranteed safety option.',
        firstStep: 'Check last year cutoff marks or rank percentiles for your category.',
        reflectionPrompt: 'Would you feel genuinely satisfied attending your solid target backup college?',
      },
      nextAction: {
        title: 'Run Next Move AI College Decision Matrix',
        description: 'Compare fees, location, branch flexibility, and student culture systematically.',
        ctaText: 'Open College Comparison',
      },
      curatedInsights: [
        'Eliminates last-minute admission panic and scramble',
        'Validates hybrid degrees that fit multifaceted interests',
        'Focuses on long-term skills rather than just college brand badges',
      ],
    },
  },
  diploma: {
    technology: {
      headline: 'Bridge polytechnic practical training with B.Tech lateral entry or specialized roles',
      introduction:
        'Leverage your hands-on lab experience to outshine theoretical peers in software implementation, embedded systems, and industrial automation.',
      suggestedPaths: [
        {
          title: 'Lateral Entry (LEET / DCET) into B.Tech 2nd Year',
          description: 'State entrance exams, top government engineering seats, and curriculum bridging.',
          badge: 'Degree Upgrade',
        },
        {
          title: 'Embedded Systems & IoT Hardware',
          description: 'Combine microcontrollers (STM32, ESP32) with firmware programming in C/C++.',
          badge: 'Core Tech',
        },
        {
          title: 'Network Administration & Cloud Foundations',
          description: 'CCNA networking fundamentals, Linux server management, and AWS/Azure cloud basics.',
          badge: 'Infrastructure',
        },
      ],
      practicalTrial: {
        title: 'Configure an ESP32 Sensor to Send MQTT Data',
        timeEstimate: '30 mins',
        description: 'Read temperature data from a digital sensor and publish to a free MQTT test broker.',
        firstStep: 'Flash a basic Wi-Fi connection script using Arduino IDE or PlatformIO.',
        reflectionPrompt: 'Did you find troubleshooting hardware wiring or software packet loss more engaging?',
      },
      nextAction: {
        title: 'Explore DCET Lateral Entry syllabus and engineering seat matrices',
        description: 'Compare top state engineering colleges offering 2nd-year lateral admissions.',
        ctaText: 'View Lateral Entry Guide',
      },
      curatedInsights: [
        'Turns practical diploma lab hours into an unfair advantage',
        'Identifies direct industry hiring pathways for junior engineers',
        'Clear roadmap to complete a degree without losing academic years',
      ],
    },
    creativity: {
      headline: 'Turn digital drafting, CAD, or multimedia skills into high-demand 3D & UI roles',
      introduction:
        'Polytechnic students with drafting skills can seamlessly transition into architectural 3D visualization, BIM modeling, and industrial product design.',
      suggestedPaths: [
        {
          title: 'BIM & Architectural Visualization (Revit/Blender)',
          description: 'Create photo-realistic 3D walkthroughs and clash detection for construction projects.',
          badge: 'Spatial Tech',
        },
        {
          title: 'Industrial CAD & Rapid Prototyping',
          description: 'Master SolidWorks, Fusion 360, and 3D printing tolerances for product design.',
          badge: 'Manufacturing',
        },
        {
          title: 'Digital Media Production & Video VFX',
          description: 'Motion graphics, color grading, and asset creation for commercial media studios.',
          badge: 'Creative Media',
        },
      ],
      practicalTrial: {
        title: 'Model a Low-Poly Mechanical Enclosure in Blender',
        timeEstimate: '35 mins',
        description: 'Design a snap-fit case for an electronics PCB with mounting holes and USB cutouts.',
        firstStep: 'Block out dimensions using exact caliper measurements of a small gadget.',
        reflectionPrompt: 'Was it exciting to see your 2D schematic turn into a tactile 3D model?',
      },
      nextAction: {
        title: 'Build a Behance or ArtStation portfolio showcasing technical renders',
        description: 'Learn how to present engineering drawings alongside photorealistic renders.',
        ctaText: 'Build Technical Portfolio',
      },
      curatedInsights: [
        'High freelance and global outsourcing demand for BIM & 3D artists',
        'Pathways to lateral entry in B.Des or Architecture',
        'Demonstrates skill proof directly to hiring design studios',
      ],
    },
    business: {
      headline: 'Industrial operations, technical sales, and contracting entrepreneurship',
      introduction:
        'Combine technical diploma know-how with commercial acumen to lead site operations, industrial equipment distribution, or vendor contracting.',
      suggestedPaths: [
        {
          title: 'Technical Sales & B2B Client Management',
          description: 'Selling specialized industrial pumps, electrical panels, and automation kits to factories.',
          badge: 'High Earning',
        },
        {
          title: 'Supply Chain & Warehouse Operations',
          description: 'Manage inventory systems, logistics hubs, and quality assurance workflows.',
          badge: 'Operations',
        },
        {
          title: 'Electrical / Civil Contracting Business',
          description: 'Obtain contractor licensing, participate in government tenders, and manage field teams.',
          badge: 'Entrepreneurship',
        },
      ],
      practicalTrial: {
        title: 'Draft a Bill of Quantities (BOQ) for a Small Renovation',
        timeEstimate: '30 mins',
        description: 'Calculate material quantities, labor charges, and profit margin for a 200 sq.ft wiring job.',
        firstStep: 'List cable gauges, conduit pipes, switch sockets, and estimate market retail costs.',
        reflectionPrompt: 'Did you feel comfortable negotiating pricing buffers for unexpected material cost hikes?',
      },
      nextAction: {
        title: 'Explore BBA / B.Com lateral pathways and SME finance programs',
        description: 'Understand working capital loans, MSME schemes, and business registration.',
        ctaText: 'Explore Business Options',
      },
      curatedInsights: [
        'Technical background gives massive credibility in B2B client conversations',
        'Prepares for government contractor exam licenses',
        'Direct route to practical entrepreneurship in industrial clusters',
      ],
    },
    science: {
      headline: 'Quality control, industrial chemistry, testing labs, and instrumentation',
      introduction:
        'Polytechnic science and chemical diplomas open doors in pharmaceutical QC, environmental soil testing, and automated calibration labs.',
      suggestedPaths: [
        {
          title: 'Quality Control & Analytical Chemistry (HPLC)',
          description: 'Standard operating procedures, calibration of chromatography instruments in pharma plants.',
          badge: 'Pharma QC',
        },
        {
          title: 'Materials Testing & Metallurgy Lab Tech',
          description: 'Tensile testing, hardness verification, and ultrasonic non-destructive testing (NDT).',
          badge: 'Industrial Testing',
        },
        {
          title: 'Water Treatment & Environmental Auditing',
          description: 'Testing effluent parameters (BOD/COD), RO filtration systems, and pollution compliance.',
          badge: 'Green Tech',
        },
      ],
      practicalTrial: {
        title: 'Draft an SOP for Calibration of a Digital pH Meter',
        timeEstimate: '25 mins',
        description: 'Write a step-by-step Standard Operating Procedure using buffer solutions pH 4, 7, and 9.',
        firstStep: 'Outline required safety equipment and pre-inspection checklist.',
        reflectionPrompt: 'Did you appreciate the rigor required to prevent laboratory contamination?',
      },
      nextAction: {
        title: 'Explore B.Sc / B.Tech Chemical Engineering lateral entry options',
        description: 'See colleges offering part-time evening degrees for working diploma holders.',
        ctaText: 'Explore Lateral Degrees',
      },
      curatedInsights: [
        'Direct employability in certified NABL testing laboratories',
        'Clear roadmap to international NDT certifications (Level 1 & 2)',
        'Combines lab protocol precision with career stability',
      ],
    },
    'social-impact': {
      headline: 'Rural infrastructure, water conservation, and public works execution',
      introduction:
        'Diploma engineers are the backbone of actual on-ground execution: rural drinking water missions (Jal Jeevan), rural roads, and solar micro-grids.',
      suggestedPaths: [
        {
          title: 'Rooftop Solar & Microgrid Installation',
          description: 'Survey roof orientations, calculate inverter loads, and commission net-metering systems.',
          badge: 'Clean Energy',
        },
        {
          title: 'Public Works & Municipal Junior Engineer Roles',
          description: 'Prepare for SSC JE, State PWD/Irrigation Junior Engineer examinations.',
          badge: 'Govt Service',
        },
        {
          title: 'Community Sanitation & Watershed Management',
          description: 'Construct rainwater harvesting recharge wells and check-dams in drought-prone villages.',
          badge: 'Rural Dev',
        },
      ],
      practicalTrial: {
        title: 'Calculate Rooftop Solar Feasibility for a 2BHK Home',
        timeEstimate: '25 mins',
        description: 'Calculate average monthly units (kWh) and determine required solar panel wattage.',
        firstStep: 'Examine one electricity bill to find average daily consumption in units.',
        reflectionPrompt: 'Were you surprised by how fast a solar payback period is with current subsidies?',
      },
      nextAction: {
        title: 'Access State Junior Engineer exam syllabus and preparation schedules',
        description: 'Review previous year technical question papers and reservation guidelines.',
        ctaText: 'View State JE Guide',
      },
      curatedInsights: [
        'Direct public service impact on village and town infrastructure',
        'High job security through state public works recruitment',
        'Fast-growing demand in rooftop solar EPC companies',
      ],
    },
    'still-exploring': {
      headline: 'Decide clearly: B.Tech Lateral Entry, Industry Job, or Direct Upskilling?',
      introduction:
        'The biggest dilemma for diploma holders is whether to spend 3 more years in engineering college or start earning immediately. Let us weigh both routes objectively.',
      suggestedPaths: [
        {
          title: 'The Degree vs Job Decision Calculator',
          description: 'Compare 3-year salary progression of direct jobs vs starting salary after B.Tech.',
          badge: 'Career Math',
        },
        {
          title: 'Work + Distance/Evening Degree Options',
          description: 'Explore AICTE-approved flexible shift B.Tech programs for working professionals.',
          badge: 'Flexible Learning',
        },
        {
          title: 'High-Value Skill Certification Blueprint',
          description: 'Certifications that pay more than generic fresh engineering degrees (AWS, PLC, NDT).',
          badge: 'Fast Track',
        },
      ],
      practicalTrial: {
        title: 'Build a 3-Year Financial & Time Comparison Table',
        timeEstimate: '20 mins',
        description: 'Compare total tuition expense + foregone salary vs potential post-degree starting pay.',
        firstStep: 'Write down average B.Tech lateral college fees in your state.',
        reflectionPrompt: 'Does your family need immediate income support, or can you invest 3 more study years?',
      },
      nextAction: {
        title: 'Run Next Move AI Diploma Career Pathway Simulator',
        description: 'Evaluate salary curves, promotions, and lateral entry colleges side by side.',
        ctaText: 'Launch Pathway Simulator',
      },
      curatedInsights: [
        'Zero bias towards either continuing college or taking a job',
        'Addresses financial realities faced by Indian middle-class families',
        'Practical alternatives including working while upskilling',
      ],
    },
  },
  'degree-engineering': {
    technology: {
      headline: "I'm pursuing my degree and want to explore career possibilities, practical skills and next steps.",
      introduction:
        'Whether in engineering, applied computing, data science, or sciences, standout undergraduates bridge academic theory with demonstrable projects, industry skills, and clear next moves.',
      suggestedPaths: [
        {
          title: 'Explore Career Possibilities & Emerging Tech Domains',
          description:
            'Investigate backend systems, cloud engineering, applied machine learning, or mobile development with verified salary and hiring data.',
          badge: 'Career Possibilities',
        },
        {
          title: 'Build Practical Skills & Portfolio Artifacts',
          description:
            'Transition from generic tutorial clones to authenticated, production-deployed applications with databases and automated tests.',
          badge: 'Practical Skills',
        },
        {
          title: 'Plan Your Next Steps (Placements, Internships or Higher Studies)',
          description:
            'Compare direct startup hiring, tier-1 IT campus drives, and higher degree entrance exams (GATE, NIMCET, CAT, or MS abroad).',
          badge: 'Next Steps',
        },
      ],
      interactiveActivities: [
        {
          id: 'degree-api-sec',
          title: 'Implement API Rate Limiting & Token Auth',
          duration: '25 mins',
          tag: 'Production Engineering',
          description:
            'Create an Express or Next.js route handler that restricts requests to 10 per minute per IP using a token bucket.',
          whatYouWillLearn:
            'Learn how production backend systems defend against spam attacks and manage concurrent traffic.',
          clarifiesDecision:
            'Clarifies whether you enjoy backend system architecture, API infrastructure, and security engineering.',
        },
        {
          id: 'degree-rag-pipeline',
          title: 'Inspect an Embeddings Vector Search Pipeline',
          duration: '25 mins',
          tag: 'Applied AI & Data',
          description:
            'Convert 5 paragraphs of university syllabus into text embeddings and query the nearest semantic neighbor.',
          whatYouWillLearn:
            'Understand how modern Retrieval-Augmented Generation (RAG) and search algorithms work behind LLMs.',
          clarifiesDecision:
            'Clarifies whether applied AI engineering, data modeling, and machine learning pipelines suit your goals.',
        },
      ],
      practicalTrial: {
        title: 'Build an Authenticated API with Rate Limiting',
        timeEstimate: '30 mins',
        description: 'Create an Express or Next.js route handler that restricts requests to 10 per minute per IP.',
        firstStep: 'Set up an in-memory token bucket or connect to an Upstash Redis free instance to track client IP request counts.',
        reflectionPrompt: 'Did handling concurrent requests and edge cases feel engaging, or do you prefer user interface engineering?',
      },
      nextAction: {
        title: 'Build your demonstrated skill portfolio on Next Move AI',
        description: 'Link your GitHub commits, deployment URLs, and architecture decisions into an evidence-backed profile.',
        ctaText: 'Build Project Portfolio',
      },
      curatedInsights: [
        'Move past generic tutorial clones (like Netflix/Spotify clones) to solve real user problems',
        'Balances data structures & algorithms (DSA) with shipped production code',
        'Provides objective clarity on higher studies vs direct corporate internships',
      ],
    },
    creativity: {
      headline: 'Product Design (UI/UX), Design Systems, and Front-End Interaction Engineering',
      introduction:
        'Blend aesthetic intuition with engineering precision: design accessible design systems in Figma and build them in React with seamless animations.',
      suggestedPaths: [
        {
          title: 'Design Systems & Component Libraries',
          description: 'Create tokens, accessible primitives, and consistent style guides across web and mobile.',
          badge: 'Product Design',
        },
        {
          title: 'Interactive Web Animations & Three.js',
          description: 'Build immersive 3D canvas experiences, shaders, and micro-interactions.',
          badge: 'Creative Dev',
        },
        {
          title: 'User Research & Usability Benchmarking',
          description: 'Conduct moderated student usability sessions and calculate task completion rates.',
          badge: 'HCI Research',
        },
      ],
      practicalTrial: {
        title: 'Audit an Existing App for WCAG 2.2 AA Contrast & Focus',
        timeEstimate: '30 mins',
        description: 'Test a popular Indian mobile web app using keyboard navigation and color contrast checkers.',
        firstStep: 'Open Chrome DevTools, tab through all buttons, and identify missing focus rings.',
        reflectionPrompt: 'How often did you get stuck in a keyboard focus trap or unreadable muted text?',
      },
      nextAction: {
        title: 'Create an interactive Case Study that shows your reasoning',
        description: 'Show how your design solved a real student friction point with evidence.',
        ctaText: 'Start Design Case Study',
      },
      curatedInsights: [
        'Bridges the gap between designers who cannot code and coders who cannot design',
        'High salary premium for Product Designers who understand code',
        'Portfolio-first evaluation over college grades',
      ],
    },
    business: {
      headline: 'Product management, venture building, financial modeling, and analytics',
      introduction:
        'Learn how tech products scale, how growth funnels convert visitors, and how financial analysts build DCF valuation models in Excel.',
      suggestedPaths: [
        {
          title: 'Associate Product Manager (APM) Track',
          description: 'Write PRDs (Product Requirement Docs), define North Star metrics, and manage agile sprints.',
          badge: 'Product Track',
        },
        {
          title: 'Financial Modeling & Valuation (DCF / LBO)',
          description: 'Build 3-statement integrated financial models and evaluate startup pitch decks.',
          badge: 'Corporate Finance',
        },
        {
          title: 'Growth Marketing & SQL Analytics',
          description: 'Query database tables to identify user churn cohorts and design retention email funnels.',
          badge: 'Data-Driven',
        },
      ],
      practicalTrial: {
        title: 'Write a 1-Page PRD for a Student Split-Bill Feature',
        timeEstimate: '30 mins',
        description: 'Define the user persona, success metric, edge cases, and MVP feature scope.',
        firstStep: 'Describe the exact pain point when roommates split groceries using UPI.',
        reflectionPrompt: 'Was it tempting to add 10 features, and how did you decide what to cut for MVP?',
      },
      nextAction: {
        title: 'Explore APM Fellowship programs and Tier-1 startup internship cycles',
        description: 'Review case study interview questions and frameworks used by Indian unicorns.',
        ctaText: 'Explore APM Roadmaps',
      },
      curatedInsights: [
        'Demystifies product management entry without prior experience',
        'Teaches analytical SQL and Excel skills that employers test on day 1',
        'Real-world business case studies over dry textbook management theory',
      ],
    },
    science: {
      headline: 'Bioinformatics, quantum computing, renewable energy, and lab research',
      introduction:
        'Bridge computational power with scientific discovery: analyze genomic sequences, model solar cell efficiencies, or prepare for MS/PhD abroad.',
      suggestedPaths: [
        {
          title: 'Computational Biology & Genomics (Python / Biopython)',
          description: 'Process DNA FASTA files, run sequence alignments, and explore protein structures.',
          badge: 'Bioinformatics',
        },
        {
          title: 'Renewable Energy & Battery Storage Systems',
          description: 'Simulate Lithium-ion thermal degradation and solar grid inverters using MATLAB/Python.',
          badge: 'Clean Energy',
        },
        {
          title: 'GRE / GATE / CSIR-NET Preparation Architecture',
          description: 'Timeline planning for funded Master’s and PhD programs in India and abroad.',
          badge: 'Higher Studies',
        },
      ],
      practicalTrial: {
        title: 'Fetch and Analyze a Gene Sequence from NCBI in Python',
        timeEstimate: '30 mins',
        description: 'Write a 15-line script to calculate GC-content of the human hemoglobin gene.',
        firstStep: 'Install Biopython and use Entrez API to fetch sequence accession NM_000558.',
        reflectionPrompt: 'Did you see how programming turns biological data into quantifiable insights?',
      },
      nextAction: {
        title: 'Review research lab internship openings (IITs, IISc, TIFR, CSIR)',
        description: 'Learn how to write professional cold emails to lab professors with project proposals.',
        ctaText: 'Explore Research Fellowships',
      },
      curatedInsights: [
        'Crucial advice on getting published papers during undergrad',
        'Funded scholarship options (DAAD, Erasmus, Fulbright, PMRF)',
        'Emerging industry R&D jobs in biotech and advanced materials',
      ],
    },
    'social-impact': {
      headline: 'Tech policy, public digital infrastructure, ESG analytics, and legal advocacy',
      introduction:
        'Work at the intersection of technology, law, and citizen welfare: open data initiatives, AI ethics, digital public goods (like ONDC), and climate tech.',
      suggestedPaths: [
        {
          title: 'Digital Public Infrastructure (DPI) & Open Networks',
          description: 'Study how India Stack, UPI, ONDC, and ABDM health protocols transform governance.',
          badge: 'GovTech',
        },
        {
          title: 'ESG & Corporate Sustainability Reporting',
          description: 'Calculate Scope 1, 2, and 3 carbon emissions for industrial companies using BRSR norms.',
          badge: 'Sustainability',
        },
        {
          title: 'AI Ethics, Algorithmic Bias & Data Protection Law',
          description: 'Analyze compliance with the Digital Personal Data Protection (DPDP) Act 2023.',
          badge: 'Policy & Law',
        },
      ],
      practicalTrial: {
        title: 'Audit a Local App for Indian DPDP Act Consent Compliance',
        timeEstimate: '30 mins',
        description: 'Check whether a popular food or cab app provides itemized, withdrawable consent.',
        firstStep: 'Review the signup permissions screen and note bundled or pre-ticked checkboxes.',
        reflectionPrompt: 'Were the terms written in plain, accessible language that anyone can understand?',
      },
      nextAction: {
        title: 'Explore fellowships like Gandhi Fellowship, Young India Fellowship & Policy Think Tanks',
        description: 'Discover stipend-supported policy fellowships and government advisory roles.',
        ctaText: 'Explore Policy Fellowships',
      },
      curatedInsights: [
        'Connects college engineering/degree backgrounds with policy careers',
        'Huge demand for DPDP compliance specialists in Indian firms',
        'Direct pathways into social enterprises and global foundations',
      ],
    },
    'still-exploring': {
      headline: 'Build a high-leverage hybrid skillset: T-shaped student strategy',
      introduction:
        'You do not have to be solely a coder or solely a marketer. Modern high-growth teams look for T-shaped people who possess broad curiosity and one deep demonstrable skill.',
      suggestedPaths: [
        {
          title: 'The T-Shaped Capability Blueprint',
          description: 'Pick 1 deep execution skill (e.g., Python or UI Design) and 2 complementary skills.',
          badge: 'Strategy',
        },
        {
          title: 'Weekend Hackathons & Sprint Challenges',
          description: 'Join 36-hour hackathons to experience rapid prototyping under team pressure.',
          badge: 'Team Building',
        },
        {
          title: 'Freelance & Open Source First Gig Roadmap',
          description: 'How to land your first paid ₹5,000 project or merged GitHub PR in 60 days.',
          badge: 'Validation',
        },
      ],
      practicalTrial: {
        title: 'Define Your 3-Pillar Capability Triangle',
        timeEstimate: '20 mins',
        description: 'Pick your Core Deep Skill, your Design/Comms Skill, and your Domain Interest.',
        firstStep: 'Score your current confidence in each pillar from 1 (beginner) to 5 (can teach others).',
        reflectionPrompt: 'Which single pillar, if strengthened, would make you 3x more hireable?',
      },
      nextAction: {
        title: 'Run Next Move AI Skill Gap Assessment',
        description: 'Compare your current projects against real startup job requirements.',
        ctaText: 'Assess Skill Gaps',
      },
      curatedInsights: [
        'Removes anxiety about not having a single narrow obsession',
        'Prepares for modern cross-functional startup roles',
        'Emphasizes self-directed evidence over passive college grades',
      ],
    },
  },
  'final-year-grad': {
    technology: {
      headline: 'Portfolio proof of work, system design fundamentals, and offer negotiations',
      introduction:
        'Final-year students need clean, verifiable evidence: a live portfolio, clean GitHub code, clear explanation of trade-offs, and calm interview composure.',
      suggestedPaths: [
        {
          title: 'System Design & Scalability Architecture',
          description: 'Design WhatsApp, URL shorteners, or payment webhooks with database sharding and caching.',
          badge: 'Interview Prep',
        },
        {
          title: 'Production Portfolio Review & Code Polishing',
          description: 'Refactor your flagship project with TypeScript, CI/CD pipelines, and clean README docs.',
          badge: 'Proof of Work',
        },
        {
          title: 'Off-Campus Hiring Strategy & AngelList/LinkedIn Outreach',
          description: 'How to write personalized cold emails with loom video walkthroughs directly to CTOs.',
          badge: 'Direct Hiring',
        },
      ],
      practicalTrial: {
        title: 'Record a 2-Minute Technical Loom Walkthrough',
        timeEstimate: '25 mins',
        description: 'Explain the single hardest bug you solved in your flagship project and why your fix worked.',
        firstStep: 'Draft 3 bullet points: Context, the failing edge case, and the architectural fix.',
        reflectionPrompt: 'Did you explain the trade-offs clearly without reading from a script?',
      },
      nextAction: {
        title: 'Run Next Move AI Portfolio Readiness Check',
        description: 'Ensure your GitHub repo and live demo pass standard engineering recruiter filters.',
        ctaText: 'Inspect Portfolio Readiness',
      },
      curatedInsights: [
        'Helps avoid predatory mass-recruitment service company bonds',
        'Direct playbooks for product startup off-campus applications',
        'Negotiation frameworks for equity, CTC vs in-hand compensation',
      ],
    },
    creativity: {
      headline: 'Interactive design portfolio, case studies with metrics, and studio presentations',
      introduction:
        'Design recruiters do not care about Dribbble eye-candy without context. They want to see what problem you solved, what failed in user testing, and why the final design works.',
      suggestedPaths: [
        {
          title: 'End-to-End Case Study Storytelling',
          description: 'Structure case studies: Problem, User Research, Wireframes, Usability Failure, and Solution.',
          badge: 'Portfolio',
        },
        {
          title: 'Live Whiteboard Design Challenge Prep',
          description: 'Practice solving ambiguous design prompts in 45 minutes during product company rounds.',
          badge: 'Design Rounds',
        },
        {
          title: 'Freelance Design Retainer Contracts',
          description: 'Standardize client contracts, IP transfer clauses, and monthly retainer pricing.',
          badge: 'Independent Work',
        },
      ],
      practicalTrial: {
        title: 'Cut 50% of the Text in Your Weakest Portfolio Case Study',
        timeEstimate: '25 mins',
        description: 'Replace paragraphs of generic design philosophy with clear screenshots and bullet metrics.',
        firstStep: 'Scan your case study and remove phrases like "I followed the double diamond design process".',
        reflectionPrompt: 'Can a recruiter understand your primary user insight in under 45 seconds now?',
      },
      nextAction: {
        title: 'Get an illustrative critique on your portfolio layout',
        description: 'Review structural guidelines used by top consumer app design leads.',
        ctaText: 'Review Design Portfolio',
      },
      curatedInsights: [
        'Cuts through generic portfolio templates that recruiters ignore',
        'Prepares for live take-home design assignments without unpaid labor traps',
        'Guidance on pricing international design client contracts',
      ],
    },
    business: {
      headline: 'Campus placement negotiation, consulting case prep, and MBA vs Job timing',
      introduction:
        'Evaluate whether to take a campus placement role, join a seed-stage startup as a founder’s office associate, or prepare for CAT/GMAT with 2 years of work experience.',
      suggestedPaths: [
        {
          title: 'Consulting Guesstimates & Case Interview Prep',
          description: 'Structure market sizing, profitability trees, and operational bottlenecks on whiteboards.',
          badge: 'Consulting Prep',
        },
        {
          title: 'Founder’s Office & Chief of Staff Generalist Track',
          description: 'Work directly with startup founders on ops, growth, and investor pitch preparation.',
          badge: 'High Growth',
        },
        {
          title: 'CAT / XAT / GMAT Timeline & Work-Ex Strategy',
          description: 'Why 24 months of quality work experience dramatically improves top IIM admission odds.',
          badge: 'MBA Timing',
        },
      ],
      practicalTrial: {
        title: 'Solve a Market Sizing Case: Electric Autos in Bengaluru',
        timeEstimate: '25 mins',
        description: 'Estimate the total number of EV 3-wheelers running in Bangalore using top-down assumptions.',
        firstStep: 'State population, commuter percentage, daily fleet replacement rate.',
        reflectionPrompt: 'Did you state your assumptions out loud and verify if the final number sounds sane?',
      },
      nextAction: {
        title: 'Access the Campus Offer vs Startup Founder’s Office Comparison Guide',
        description: 'Compare stability, learning velocity, and long-term trajectory objectively.',
        ctaText: 'Compare Job Offers',
      },
      curatedInsights: [
        'Realistic comparison of corporate MNC stability vs fast-paced startup learning',
        'Avoids common CAT preparation burnout while managing full-time work',
        'Direct breakdown of ESOP vesting schedules and true value',
      ],
    },
    science: {
      headline: 'Research fellowships, GATE PSU interviews, or transition to computational roles',
      introduction:
        'Finalize your post-graduation direction: join a CSIR/ICMR national laboratory, secure a PSU job through GATE, or pivot to high-paying computational biology roles.',
      suggestedPaths: [
        {
          title: 'GATE Score Strategy for PSUs vs IIT M.Tech/M.S.',
          description: 'Target rank percentiles for ONGC, IOCL, BARC vs direct research programs.',
          badge: 'PSU & Research',
        },
        {
          title: 'Industrial R&D and Clinical Trial Data Specialist',
          description: 'Work with SAS, R, and clinical data management for global pharmaceutical submissions.',
          badge: 'Clinical Data',
        },
        {
          title: 'Direct PhD in Europe/USA with Full Assistantship',
          description: 'How to contact principal investigators and secure RA/TA stipends that cover all expenses.',
          badge: 'Global Research',
        },
      ],
      practicalTrial: {
        title: 'Draft a Tailored Research Statement of Purpose (SOP) Outline',
        timeEstimate: '35 mins',
        description: 'Structure 4 paragraphs connecting your undergraduate thesis directly to the target lab.',
        firstStep: 'Identify the exact paper published by the professor in the last 12 months you want to build on.',
        reflectionPrompt: 'Did you demonstrate genuine familiarity with their specific research gap?',
      },
      nextAction: {
        title: 'Explore the Research Scholar Roadmap on Next Move AI',
        description: 'Track application deadlines, scholarship criteria, and academic reference templates.',
        ctaText: 'View Scholar Roadmap',
      },
      curatedInsights: [
        'Discloses true stipend ranges and living expenses for foreign PhDs',
        'Strategic alternatives if GATE rank is just below PSU cutoffs',
        'How to transition wet-lab skills into high-demand data roles',
      ],
    },
    'social-impact': {
      headline: 'Civil services backup strategy, think-tank research, and impact consulting',
      introduction:
        'If preparing for UPSC/State PSC, create an airtight 2-year backup plan so your career momentum remains strong regardless of exam outcomes.',
      suggestedPaths: [
        {
          title: 'UPSC Preparation with an Airtight Career Safety Net',
          description: 'How to combine civil service attempts with part-time research or policy analyst roles.',
          badge: 'Strategy',
        },
        {
          title: 'Think-Tank Policy Research & Legislative Drafting',
          description: 'Work with organizations like PRS Legislative Research, CPR, and NITI Aayog consultants.',
          badge: 'Policy Research',
        },
        {
          title: 'Impact Investing & Development Consulting (Dalberg, FSG)',
          description: 'Apply management consulting frameworks to water, education, and livelihood projects.',
          badge: 'Development',
        },
      ],
      practicalTrial: {
        title: 'Write a 500-Word Policy Brief on Renewable Energy Subsidies',
        timeEstimate: '35 mins',
        description: 'Summarize the current PM Surya Ghar scheme, one execution bottleneck, and a fix.',
        firstStep: 'State the policy objective, current target vs actual installation numbers.',
        reflectionPrompt: 'Did you write for a busy bureaucrat who only has 2 minutes to read your memo?',
      },
      nextAction: {
        title: 'Review the Public Sector & Policy Fellowship Calendar',
        description: 'Track application dates for CM Fellowships, LAMP Fellowship, and think tanks.',
        ctaText: 'View Fellowship Calendar',
      },
      curatedInsights: [
        'Mental health resilience and timeline limits for competitive government exams',
        'Direct transition playbook from UPSC preparation into policy think tanks',
        'Legitimate salaries and growth paths in the social impact sector',
      ],
    },
    'still-exploring': {
      headline: 'The 90-Day Transition Sprint: clarity, concrete portfolio, and direct outreach',
      introduction:
        'If graduation is near and you feel lost, do not panic. 90 days of focused, honest skill building and project proof can change your employment trajectory entirely.',
      suggestedPaths: [
        {
          title: 'The 90-Day Clarity & Portfolio Sprint',
          description: 'Month 1: Pick one demonstrable skill. Month 2: Build 2 real projects. Month 3: Direct outreach.',
          badge: 'Action Plan',
        },
        {
          title: 'Internship-to-PPO Strategy in High-Growth Startups',
          description: 'How to convert a 3-month stipend internship into a full-time permanent role.',
          badge: 'Career Launch',
        },
        {
          title: 'Salary Negotiation & Understanding In-Hand CTC in India',
          description: 'Demystify basic pay, HRA, PF deductions, performance bonuses, and medical benefits.',
          badge: 'Financial Literacy',
        },
      ],
      practicalTrial: {
        title: 'Map Out Your 90-Day Weekly Milestone Grid',
        timeEstimate: '20 mins',
        description: 'Break the next 12 weeks into 4 distinct phases: Audit, Build, Ship, and Outreach.',
        firstStep: 'Identify the single skill you feel most confident turning into an asset.',
        reflectionPrompt: 'Does having a concrete weekly target make the future feel less overwhelming?',
      },
      nextAction: {
        title: 'Start your personalized Next Move AI Launchpad',
        description: 'Access weekly reflection prompts and project checkpoints designed for graduating students.',
        ctaText: 'Launch 90-Day Sprint',
      },
      curatedInsights: [
        'Zero judgment, 100% practical focus on what you can control today',
        'Shields students from expensive scam bootcamps promising 100% placement',
        'Empowers students to take ownership of their own next move',
      ],
    },
  },
};

export interface MyPartnerScenario {
  id: string;
  studentTag: string;
  avatarSeed: string;
  stageBadge: string;
  question: string;
  contextPills: string[];
  partnerResponse: {
    acknowledgement: string;
    verifiedPathways: Array<{
      title: string;
      difficulty: string;
      description: string;
      whyItFits: string;
      prerequisites: string;
    }>;
    whatRemainsUnknown: string[];
    practicalTrial: {
      title?: string;
      action: string;
      duration: string;
      whatYouLearn: string;
    };
    guidedReflection: string;
    mentorNote: string;
    nextAction?: {
      title: string;
      description: string;
    };
  };
}

export const MY_PARTNER_SCENARIOS: MyPartnerScenario[] = [
  {
    id: 'class-12-pcm',
    studentTag: 'Arjun, Class 12 PCM',
    avatarSeed: 'arjun',
    stageBadge: 'Class 12 / High School',
    question:
      'I am in Class 12 studying Physics, Chemistry, and Math. I enjoy coding and technology, but JEE coaching is overwhelming me. What are my real options beyond top IIT/NIT engineering seats?',
    contextPills: ['Class 12 PCM', 'Enjoys coding', 'Overwhelmed by JEE', 'Exploring alternative routes'],
    partnerResponse: {
      acknowledgement:
        'Feeling overwhelmed by JEE while knowing you genuinely like technology is very common. An entrance rank measures high-speed test elimination, not your ultimate potential as a software engineer or problem solver. Let us look at grounded options across degrees and colleges.',
      verifiedPathways: [
        {
          title: 'Top Non-JEE Engineering Entrances (BITSAT, KCET, COMEDK, VITEEE)',
          difficulty: 'Moderate to High',
          description:
            'State CETs and premier private universities offer excellent computer engineering education and campus hiring without the single-exam pressure of JEE Advanced.',
          whyItFits: 'Allows you to focus on solid fundamentals while keeping top engineering options wide open.',
          prerequisites: '12th PCM board preparation, consistent mock test practice for state entrance syllabi',
        },
        {
          title: 'Direct Computing Degrees (BCA + MCA or B.Sc Computer Science)',
          difficulty: 'Moderate',
          description:
            'Focus on practical software development and computer science principles from day one. Top product companies evaluate your demonstrable GitHub portfolio over a degree title.',
          whyItFits: 'Avoids heavy physics/chemistry engineering coursework if you want pure computing focus.',
          prerequisites: 'Mathematics at 12th level (recommended for premier universities and NIMCET eligibility)',
        },
        {
          title: 'Skill-First Engineering & Open Source Portfolio Route',
          difficulty: 'Self-Directed & Rewarding',
          description:
            'Build real software projects alongside your college degree. Many students in Tier-2 and Tier-3 colleges secure high-paying remote startup roles by showcasing shipped code.',
          whyItFits: 'Shields you from college brand bias by creating indisputable public proof of capability.',
          prerequisites: 'Curiosity to learn Git, modern web technologies, and build small usable utilities',
        },
      ],
      whatRemainsUnknown: [
        'Your final 12th board marks and entrance rank score on exam day',
        'Your family’s budget flexibility for private college tuition vs state university fees',
        'Whether you prefer theoretical algorithmic mathematics or practical software product development',
      ],
      practicalTrial: {
        title: 'Build a Live Currency Exchange Calculator',
        action: 'Open a free JSON exchange rate API in your browser and calculate live USD to INR conversions.',
        duration: '20 minutes',
        whatYouLearn: 'You will see how real web applications fetch and manipulate live data.',
      },
      guidedReflection:
        'Try the small API trial this weekend. If seeing code work gives you genuine energy, remember that practical skills will matter far more in your career than an arbitrary coaching test rank.',
      mentorNote:
        'My Partner is a conceptual preview of our upcoming contextual AI guidance engine. We do not predict a single career; we surface pathways with trade-offs so you stay in control.',
      nextAction: {
        title: 'Map out non-JEE state CET application dates and college backup options',
        description: 'Review exam dates, fees, and eligibility for 4 backup colleges alongside your board prep.',
      },
    },
  },
  {
    id: 'degree-career-pivot',
    studentTag: 'Priya, 2nd Year Degree',
    avatarSeed: 'priya',
    stageBadge: 'Degree / College',
    question:
      'I am in my 2nd year of college. I have good grades, but I haven’t built real projects and feel unprepared for technical internships. How do I start?',
    contextPills: ['Undergrad Year 2', 'Good theory grades', 'Zero portfolio projects', 'Targeting internships'],
    partnerResponse: {
      acknowledgement:
        'It is very common in 2nd year to realize that college exams test rote theory rather than building real software. Having strong grades means you have disciplined study habits—now we simply redirect that discipline into shipping demonstrable work.',
      verifiedPathways: [
        {
          title: 'Backend API Development with Node.js or Python (FastAPI)',
          difficulty: 'Moderate',
          description:
            'Build backend REST APIs, connect relational databases (PostgreSQL), and understand authentication and server deployment.',
          whyItFits: 'Highest volume of entry-level engineering internships in Indian technology companies.',
          prerequisites: 'Basic programming syntax, foundational SQL queries, HTTP concepts',
        },
        {
          title: 'Modern Front-End Engineering with React & Next.js',
          difficulty: 'Moderate',
          description:
            'Translate design wireframes into responsive, accessible web interfaces with clean component architecture and state management.',
          whyItFits: 'Immediate visual feedback that makes portfolio demonstration engaging to recruiters.',
          prerequisites: 'HTML, CSS, JavaScript ES6 fundamentals, basic Git commands',
        },
        {
          title: 'Higher Studies & Competitive Placement Strategy (GATE / NIMCET / CAT)',
          difficulty: 'Intensive',
          description:
            'If you want access to premier tier-1 campus placements, prepare structured aptitude and technical foundations for national competitive exams.',
          whyItFits: 'Best if you want placement access to top-tier institutional campus hiring drives.',
          prerequisites: 'Core engineering mathematics, analytical reasoning, 12 months consistent preparation',
        },
      ],
      whatRemainsUnknown: [
        'Your preferred technical domain (frontend, backend, data science, or mobile)',
        'How many weekly hours you can protect outside your college attendance obligations',
        'Whether your college requires an official faculty sign-off for off-campus summer internships',
      ],
      practicalTrial: {
        title: 'Deploy a 30-Line Authenticated API Route',
        action: 'Build a mini API route using Next.js or FastAPI that returns structured JSON and protects a endpoint with a header token.',
        duration: '25 minutes',
        whatYouLearn: 'You will immediately feel whether backend logic and server responses feel intuitive to you.',
      },
      guidedReflection:
        'Focus on building one small, finished utility rather than starting three massive uncompleted tutorial clones. One deployed link beats ten unfinished folders.',
      mentorNote:
        'Next Move AI does not tell you to pick web development or prepare for exams; we provide the exact trial so you can experience both before deciding.',
      nextAction: {
        title: 'Create your GitHub repository and ship a 1-page project roadmap',
        description: 'Define an MVP problem, write a README, and schedule 4 hours of focused coding this week.',
      },
    },
  },
  {
    id: 'class-6-story-comic',
    studentTag: 'Meera, Class 6',
    avatarSeed: 'meera',
    stageBadge: 'Middle School / Classes 4–7',
    question:
      'I love sketching funny comic strips and making up stories about animals in my school notebook. What can I do with this right now?',
    contextPills: ['Loves drawing comics', 'Class 6', 'Curious about creative hobbies'],
    partnerResponse: {
      acknowledgement:
        'That is a fantastic creative superpower! Many famous video game creators, children’s book authors, and movie directors started exactly by drawing funny comics in their school notebooks.',
      verifiedPathways: [
        {
          title: 'Visual Storytelling & 4-Panel Webcomics',
          difficulty: 'Fun & Exploratory',
          description:
            'Learn how to create funny character expressions, timing jokes, and writing simple speech bubbles.',
          whyItFits: 'Direct continuation of what you already love doing in class.',
          prerequisites: 'Pencil, paper, notebook, and your imagination',
        },
        {
          title: 'Character Design & Digital Drawing',
          difficulty: 'Beginner Friendly',
          description:
            'Learn how different shapes (circles for friendly characters, sharp triangles for tricky ones) give characters personality.',
          whyItFits: 'Connects traditional paper sketches with digital art software like Krita or Canva.',
          prerequisites: 'Curiosity to observe people and cartoon characters around you',
        },
        {
          title: 'Stop-Motion Clay / Paper Animation',
          difficulty: 'Playful Maker Activity',
          description:
            'Take 20 photos with a phone camera, moving a cutout character a tiny bit in each photo, to make it dance!',
          whyItFits: 'Brings your static notebook characters to life in real moving video.',
          prerequisites: 'A phone or tablet camera with family supervision, paper cutouts',
        },
      ],
      whatRemainsUnknown: [
        'Which creative mediums (digital drawing, clay modeling, comic writing) feel most fun over time',
        'Parental preferences for screen time and device availability for digital drawing tools',
        'Whether you enjoy drawing characters solo or collaborating with classmates on school projects',
      ],
      practicalTrial: {
        title: 'The 3-Second Paper Flipbook',
        action: 'Draw a ball bouncing on the corner of 15 pages in your rough notebook and flip the pages fast with your thumb.',
        duration: '15 minutes',
        whatYouLearn: 'You will understand the core principle of all 2D animation and Disney movies.',
      },
      guidedReflection:
        'Notice how your friends react when you show them your bouncing ball. Storytelling is all about sharing joy with others!',
      mentorNote:
        'In middle school, our focus is purely curiosity and joyful practice—zero career pressure or formal evaluations.',
      nextAction: {
        title: 'Create a private sketchbook folder in your room',
        description: 'Keep your best 5 character sketches in one folder to look back at at the end of the year.',
      },
    },
  },
];

export interface HowItWorksStage {
  stepNumber: string;
  title: string;
  subtitle: string;
  tagline: string;
  iconName: string;
  accentColor: string;
  description: string;
  concreteExample: string;
  studentQuestion: string;
  keyOutputs: string[];
}

export const HOW_IT_WORKS_STAGES: HowItWorksStage[] = [
  {
    stepNumber: '01',
    title: 'Understand Me',
    subtitle: 'Where you are today',
    tagline: 'Start with who you are, not what society expects',
    iconName: 'UserCheck',
    accentColor: '#6757F5',
    description:
      'Map your academic background, genuine interests, what you have actually tried, what you are uncertain about, and what energizes you during school or college.',
    concreteExample:
      'A Class 11 student logs that they enjoy physics and visual sketching, but feel stressed by 6-hour chemistry coaching classes.',
    studentQuestion: 'What do I genuinely enjoy doing when no one is grading me?',
    keyOutputs: [
      'Self-reported background & constraints',
      'Honest inventory of uncertainties',
      'No artificial psychometric scores',
    ],
  },
  {
    stepNumber: '02',
    title: 'Explore My Possibilities',
    subtitle: 'What exists out there',
    tagline: 'Expand your horizon beyond 3 conventional career stereotypes',
    iconName: 'Compass',
    accentColor: '#35B8C5',
    description:
      'Discover educational pathways, emerging cross-disciplinary domains, realistic degree options, prerequisite requirements, and age-appropriate practical opportunities.',
    concreteExample:
      'Connecting a technology-interested student to specialized tracks in Cloud Infrastructure, Backend Systems, and UI Engineering with realistic entry salaries.',
    studentQuestion: 'What options match my strengths that my relatives haven’t told me about?',
    keyOutputs: [
      'Grounded Indian education pathways',
      'Entrance exams vs alternative admissions',
      'Salary and growth realities without hype',
    ],
  },
  {
    stepNumber: '03',
    title: 'Make Informed Choices',
    subtitle: 'Student-controlled decisions',
    tagline: 'Compare trade-offs and evaluate alternatives side by side',
    iconName: 'Scale',
    accentColor: '#7C6BF8',
    description:
      'We don’t decide careers for you. We put the facts, costs, college cutoffs, day-in-the-life realities, and unknown risks side-by-side so you remain in full control.',
    concreteExample:
      'Comparing B.Tech CS in a private university (₹16 Lakhs total fee) vs state university computing options, analyzing ROI and placement profiles.',
    studentQuestion: 'What are the real trade-offs between my top two choices?',
    keyOutputs: [
      'Side-by-side trade-off matrix',
      'Fee vs ROI transparency',
      'You make and approve your own shortlist',
    ],
  },
  {
    stepNumber: '04',
    title: 'Build My Next Move',
    subtitle: 'Actionable execution',
    tagline: 'Translate decisions into milestones, projects, and evidence',
    iconName: 'Rocket',
    accentColor: '#171A2B',
    description:
      'Turn chosen directions into flexible weekly roadmaps, hands-on micro-projects, portfolio evidence, and sample internships or higher study applications.',
    concreteExample:
      'A student builds a 12-week roadmap: 2 flagship GitHub projects, 1 technical case study, and targeted applications.',
    studentQuestion: 'What is the exact concrete step I need to take this week?',
    keyOutputs: [
      'Flexible, adjustable milestone timeline',
      'Proof of work instead of certificates',
      'Reflect, learn, and adapt as you grow',
    ],
  },
];

export interface GrowthMilestoneCase {
  step: string;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  description: string;
  sampleStudent: string;
  whatStudentDid: string;
  tangibleArtifact: string;
  clarityGained: string;
}

export const GROWTH_TIMELINE_CASES: GrowthMilestoneCase[] = [
  {
    step: '01',
    title: 'Explore',
    subtitle: 'Map Possibilities',
    iconName: 'Compass',
    color: '#6757F5',
    description:
      'Investigate streams, college options, and emerging domains without immediate commitment or pressure.',
    sampleStudent: 'Aryan (Class 12 PCM)',
    whatStudentDid: 'Explored 3 distinct paths beyond JEE: State CET engineering colleges, direct BCA+MCA routes, and design technology programs.',
    tangibleArtifact: 'Curated 1-page Pathway Map with fee brackets and entrance deadlines',
    clarityGained: 'Discovered that missing an IIT cutoff does not close the door to becoming a top software engineer.',
  },
  {
    step: '02',
    title: 'Try',
    subtitle: '15-Min Micro-Trials',
    iconName: 'FlaskConical',
    color: '#35B8C5',
    description:
      'Experience short practical tasks—write a script, audit a policy, build an API—before spending months of study.',
    sampleStudent: 'Aryan (Class 12 PCM)',
    whatStudentDid: 'Tested a 20-minute live Currency API script in JavaScript instead of only reading theoretical textbook code.',
    tangibleArtifact: 'Working browser exchange rate calculator parsing real JSON data',
    clarityGained: 'Confirmed that building interactive software feels intuitive and deeply energizing.',
  },
  {
    step: '03',
    title: 'Build',
    subtitle: 'Verifiable Projects',
    iconName: 'Hammer',
    color: '#7C6BF8',
    description:
      'Create real portfolio evidence: GitHub repositories, design case studies, or scientific reports.',
    sampleStudent: 'Aryan (1st Year College)',
    whatStudentDid: 'Built a student timetable & study planner web application deployed on Vercel with a PostgreSQL database.',
    tangibleArtifact: 'Public GitHub repository with 42 commits and a live deployed URL',
    clarityGained: 'Gained confidence that recruiters and internship mentors evaluate shipped code over college prestige.',
  },
  {
    step: '04',
    title: 'Reflect',
    subtitle: 'Private Journaling',
    iconName: 'MessageSquareHeart',
    color: '#171A2B',
    description:
      'Note what energized you, what felt stressful, and what you want to adjust in your roadmap.',
    sampleStudent: 'Aryan (2nd Year College)',
    whatStudentDid: 'Logged weekly reflections comparing feelings of flow during backend development vs frustration during rote exam prep.',
    tangibleArtifact: 'Private reflection log tracking energy, friction points, and focus hours',
    clarityGained: 'Decided to double down on backend distributed systems and skip unrelated competitive exam hype.',
  },
  {
    step: '05',
    title: 'Grow',
    subtitle: 'Evolving Student Profile',
    iconName: 'TrendingUp',
    color: '#35B8C5',
    description:
      'Your profile evolves with you throughout school and college, capturing authentic demonstrated capability.',
    sampleStudent: 'Aryan (Final Year Candidate)',
    whatStudentDid: 'Aggregated 4 project case studies, open-source pull requests, and reflective learning milestones into an evidence-backed profile.',
    tangibleArtifact: 'Comprehensive demonstrated capability profile shared with 8 product startups',
    clarityGained: 'Secured a product engineering internship with an offer based on demonstrated work, not arbitrary grades.',
  },
];

export interface StudentExperienceFeature {
  id: string;
  title: string;
  shortDesc: string;
  badge: string;
  iconName: string;
  previewType: 'interests' | 'paths' | 'compare' | 'trial' | 'roadmap' | 'growth';
  previewData: {
    heading: string;
    subheading: string;
    items: Array<{
      label: string;
      value: string;
      status?: string;
      highlight?: boolean;
    }>;
    calloutText: string;
  };
}

export const STUDENT_EXPERIENCES: StudentExperienceFeature[] = [
  {
    id: 'discover-interests',
    title: 'Discover Your Interests',
    shortDesc: 'Interactive self-reflections and low-stakes micro-tasks that reveal what truly energizes you.',
    badge: 'Self-Discovery',
    iconName: 'Sparkles',
    previewType: 'interests',
    previewData: {
      heading: 'Interest Energy Map',
      subheading: 'Based on actual activities, not generic multiple-choice quizzes',
      items: [
        { label: 'Building & Coding', value: 'High Energy (8.8/10)', highlight: true },
        { label: 'Visual Layouts & Art', value: 'High Energy (8.2/10)', highlight: true },
        { label: 'Theoretical Derivations', value: 'Medium Energy (5.4/10)' },
        { label: 'Memorizing Chemistry Formulae', value: 'Low Energy (2.1/10)' },
      ],
      calloutText: 'Notice how building projects gives you 4x more focus than memorizing abstract rules.',
    },
  },
  {
    id: 'explore-paths',
    title: 'Explore Different Paths',
    shortDesc: 'Curated educational pathways across Indian state, central, and private university systems.',
    badge: 'Pathways',
    iconName: 'Map',
    previewType: 'paths',
    previewData: {
      heading: 'Pathway Breakdown: Computing & Technology Paths',
      subheading: 'Educational routes beyond the standard coaching bottleneck',
      items: [
        { label: 'Route A: Direct Tech Degree', value: 'B.Tech / B.Sc / BCA -> Foundations + Project Work' },
        { label: 'Route B: National Entrance Route', value: 'Central / State Universities -> Competitive Selection' },
        { label: 'Route C: Applied Technology & Design', value: 'UI/UX or Data Science -> Portfolio-led Roles' },
      ],
      calloutText: 'Explore credible options that match your strengths without getting stuck in a single entrance exam mindset.',
    },
  },
  {
    id: 'compare-options',
    title: 'Compare Your Options',
    shortDesc: 'Side-by-side trade-offs: prerequisites, total degree costs, placement medians, and hidden risks.',
    badge: 'Decision Matrix',
    iconName: 'Layers',
    previewType: 'compare',
    previewData: {
      heading: 'Trade-Off Matrix: PCB vs PCMB',
      subheading: 'Realistic workload vs future career flexibility analysis',
      items: [
        { label: 'Study Workload', value: 'PCB: 32 hrs/wk | PCMB: 44 hrs/wk' },
        { label: 'NEET Focus Impact', value: 'PCB: Dedicated | PCMB: Math requires 8 hrs' },
        { label: 'Engineering/CS Fallback', value: 'PCB: Closed | PCMB: 100% Open', highlight: true },
        { label: 'Biotech Degree Eligibility', value: 'Both eligible across top universities' },
      ],
      calloutText: 'If you want to keep computing options open, keeping PCMB is worth the extra math hours.',
    },
  },
  {
    id: 'practical-trial',
    title: 'Try a Practical Experience',
    shortDesc: 'Experience a realistic 20-minute simulation of the actual work before committing months of study.',
    badge: 'Micro-Trial',
    iconName: 'Flame',
    previewType: 'trial',
    previewData: {
      heading: '15-Minute Trial: Day as a Junior Web Developer',
      subheading: 'Fix a broken checkout button using real HTML & CSS inspection',
      items: [
        { label: 'Step 1: Inspect DOM', value: 'Completed in 4 mins', status: 'done' },
        { label: 'Step 2: Correct CSS z-index', value: 'Completed in 6 mins', status: 'done' },
        { label: 'Step 3: Test on mobile view', value: 'Ready to verify', status: 'active', highlight: true },
      ],
      calloutText: 'Sample Student Feedback: "Troubleshooting CSS made me feel like a detective solving a puzzle!"',
    },
  },
  {
    id: 'build-roadmap',
    title: 'Build Your Roadmap',
    shortDesc: 'Dynamic milestones that adapt when your exams, family circumstances, or interests change.',
    badge: 'Action Plan',
    iconName: 'Milestone',
    previewType: 'roadmap',
    previewData: {
      heading: 'Term Roadmap: Foundations to Internship Ready',
      subheading: 'Flexible weekly milestones with built-in reflection checkpoints',
      items: [
        { label: 'Weeks 1–3', value: 'Core Programming & API Foundations', status: 'done' },
        { label: 'Weeks 4–6', value: 'Interactive Web UI & Prototype', status: 'active', highlight: true },
        { label: 'Weeks 7–9', value: 'Deployed Web Demo & Documentation' },
        { label: 'Weeks 10–12', value: 'Peer Review & Portfolio Showcase' },
      ],
      calloutText: 'Every milestone results in a linkable artifact you can show a mentor or recruiter.',
    },
  },
  {
    id: 'understand-growth',
    title: 'Understand Your Growth',
    shortDesc: 'Evidence-based growth logs showing demonstrated capabilities rather than arbitrary readiness percentages.',
    badge: 'Evidence Log',
    iconName: 'ShieldCheck',
    previewType: 'growth',
    previewData: {
      heading: 'Student Demonstrated Activity Record',
      subheading: 'Grounded in demonstrated project artifacts, not self-claimed scores',
      items: [
        { label: 'Software Architecture', value: 'Demonstrated: 2 deployed production repos', highlight: true },
        { label: 'Database Design', value: 'Demonstrated: Normalized schema with foreign keys' },
        { label: 'API Security', value: 'Demonstrated: JWT & rate limiting middleware' },
        { label: 'Reflective Clarity', value: '14 weekly reflections logged in journal' },
      ],
      calloutText: 'No fake "92% Career Match". Just authentic evidence of what you have built and learned.',
    },
  },
];

export interface ParentPillar {
  title: string;
  iconName: string;
  description: string;
  howItWorks: string;
  studentRespectNote: string;
}

export const PARENT_PILLARS: ParentPillar[] = [
  {
    title: 'Permission-Based Milestone Summaries',
    iconName: 'Eye',
    description:
      'Stay informed on which career streams, colleges, and skills your child is exploring without hovering over their screen.',
    howItWorks:
      'Students can share periodic summary briefs (e.g., "Top 3 streams I explored this month") with their parents with a single click.',
    studentRespectNote: 'Private student journal reflections and exploratory searches remain private to the student.',
  },
  {
    title: 'Constructive Family Discussion Guides',
    iconName: 'MessageSquareHeart',
    description:
      'Turn stressful dining table arguments into structured, calm conversations backed by objective data on fees, cutoffs, and workload.',
    howItWorks:
      'We provide 5-point family agendas for critical decisions like 10th stream selection, engineering vs medical, and college budgeting.',
    studentRespectNote: 'Helps parents understand modern fields (like UI/UX and Cloud) with clear, simple explanations.',
  },
  {
    title: 'Verified Information & Safe Exploration',
    iconName: 'ShieldCheck',
    description:
      'Rest easy knowing your child is exploring official university guidelines, approved entrance criteria, and safe, age-appropriate activities.',
    howItWorks:
      'All pathway data is cross-verified with official bodies (UGC, AICTE, NTA) without sponsored advertisements or coaching sales pitches.',
    studentRespectNote: 'Zero predatory loan advertising, zero aggressive telecaller calls, zero data selling.',
  },
];

export interface TrustPrinciple {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export const TRUST_PRINCIPLES: TrustPrinciple[] = [
  {
    number: '01',
    title: 'The Student Remains in Control',
    description:
      'We don’t decide careers; we enable clarity. Next Move AI will never output a single forced career prediction or claim to know your destiny.',
    iconName: 'Compass',
  },
  {
    number: '02',
    title: 'Grounded in Verified Sources',
    description:
      'College prerequisites, entrance exams, syllabus patterns, and salary distributions are verified against government and accredited industry sources.',
    iconName: 'BookCheck',
  },
  {
    number: '03',
    title: 'Evidence-Based Skill Recognition',
    description:
      'No meaningless "98% Future Ready" percentages. Skills are evidenced by actual code, design prototypes, writing samples, and reflective trials.',
    iconName: 'Award',
  },
  {
    number: '04',
    title: 'Privacy by Design',
    description:
      'Student curiosity needs a safe space to fail and try again. Your personal reflections and exploratory questions are never commercialized or sold to third parties.',
    iconName: 'Lock',
  },
  {
    number: '05',
    title: 'Zero Sponsored Bias',
    description:
      'We do not accept payments from private colleges or edtech institutes to recommend their degrees. Our recommendations are 100% objective.',
    iconName: 'CheckCircle2',
  },
  {
    number: '06',
    title: 'AI as a Thought Partner, Not an Oracle',
    description:
      'Our AI assists by asking clarifying questions, surfacing alternatives, and breaking goals into trials—never by hallucinating authoritative career dictates.',
    iconName: 'Cpu',
  },
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Is Next Move AI only for career guidance?',
    answer:
      'No. Next Move AI is a comprehensive student intelligence, decision, and continuous growth ecosystem. Career clarity is just one outcome. It helps students understand their learning style, explore subjects, try practical 20-minute simulations, build portfolio projects, and navigate academic transitions from Class 4 through college graduation.',
    category: 'Platform Scope',
  },
  {
    id: 'faq-2',
    question: 'Can I use Next Move AI if I have no idea what my interests are?',
    answer:
      'Yes, in fact, this is where Next Move AI is most helpful! You do not need to have a predefined goal. You can select "I am Still Exploring" in our Explorer and try short, low-stakes micro-trials across creativity, science, technology, and business to observe what energizes you naturally without pressure.',
    category: 'Student Journey',
  },
  {
    id: 'faq-3',
    question: 'Is it useful for Class 10 or Class 12 students facing stream or entrance choices?',
    answer:
      'Extremely useful. For Class 10, we provide an objective Stream Decision Matrix (comparing Science, Commerce, Humanities, and Polytechnic) based on real student energy rather than peer rumors. For Class 11-12, we map out degree alternatives, non-JEE engineering routes, non-NEET life science careers, and multi-tier college backup strategies.',
    category: 'High School',
  },
  {
    id: 'faq-4',
    question: 'Can college and engineering students explore career pivots or higher studies?',
    answer:
      'Yes. Degree, Diploma, and final-year students use Next Move AI to identify high-leverage skill gaps, structure flagship portfolio projects, compare higher studies (like GATE, NIMCET, CAT, or MS abroad) against startup jobs, and prepare demonstrable proof of work for recruiters.',
    category: 'College & Careers',
  },
  {
    id: 'faq-5',
    question: 'Does Next Move AI decide my career for me or give a single percentage match?',
    answer:
      'Never. Our core philosophy is: "We don’t decide careers; we enable clarity." Automated algorithms that claim to predict a 15-year-old’s single ideal career are misleading and dangerous. We put realistic pathways, trade-offs, entrance requirements, and practical trials in front of you so you make your own informed choice.',
    category: 'Philosophy',
  },
  {
    id: 'faq-6',
    question: 'How do parents participate without compromising student privacy?',
    answer:
      'Next Move AI provides permission-based milestone summaries and structured family discussion guides. Students can share high-level summaries of their explored streams and college options with their parents to foster calm, constructive conversations, while their private student notes and rough exploratory thoughts remain completely confidential.',
    category: 'Parents',
  },
  {
    id: 'faq-7',
    question: 'Is Next Move AI free to use?',
    answer:
      'The public interactive landing explorer and foundational student exploration features are free during our initial beta phase. As the platform evolves into Phase 2 and beyond, verified institutional partnerships and specialized deep mentoring roadmaps are being defined with complete transparency—with no hidden paywalls on foundational guidance.',
    category: 'Pricing & Access',
  },
];
