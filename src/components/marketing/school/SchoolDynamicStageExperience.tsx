"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Sparkles,
  Palette,
  FlaskConical,
  BookOpen,
  Cpu,
  Laptop,
  Wrench,
  HeartHandshake,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Lightbulb,
  MessageSquare,
  ChevronRight,
  Send,
  Eye,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useIsMarketingMode } from "@/lib/deployment-mode";

// Code-split heavy 2,400-line StudentExplorer component for optional extended matrix view
const StudentExplorer = dynamic(
  () => import("@/components/marketing/StudentExplorer").then((mod) => mod.StudentExplorer),
  {
    loading: () => (
      <div className="p-8 text-center bg-white rounded-3xl border border-[#E8E6F3] text-sm text-[#626987]">
        Loading Extended Matrix...
      </div>
    ),
    ssr: false,
  }
);

export type SchoolStageKey = "classes-4-7" | "classes-8-10" | "classes-11-12";

interface CategoryData {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  summary: string;
  activity: {
    title: string;
    focus: string;
    timeEstimate: string;
    whatYouExplore: string;
    practicalTask: string;
    expectedOutput: string;
    reflectionPrompt: string;
    placeholderAnswer: string;
    sampleFeedback: string;
    nextExperience: string;
  };
}

interface StageConfig {
  key: SchoolStageKey;
  label: string;
  cohort: string;
  ageSpan: string;
  philosophyBadge: string;
  philosophyHeadline: string;
  philosophyDescription: string;
  guardrailNotice: string;
  categories: CategoryData[];
}

const SCHOOL_STAGES_CONFIG: Record<SchoolStageKey, StageConfig> = {
  "classes-4-7": {
    key: "classes-4-7",
    label: "Classes 4–7",
    cohort: "Foundational Curiosity",
    ageSpan: "Ages 9–13",
    philosophyBadge: "Curiosity Before Career Decisions",
    philosophyHeadline: "Playful exploration, creative expression, and zero adult job labels.",
    philosophyDescription:
      "At this age, learning is about testing imagination, noticing how nature works, making things with your hands, and developing confidence—not preparing for entrance exams or picking a lifelong career.",
    guardrailNotice:
      "Zero career-fit percentages · No job recommendations · No competitive rankings · Pure hands-on discovery",
    categories: [
      {
        id: "creative-storytelling",
        name: "Creative Storytelling",
        icon: Palette,
        tag: "Imagination & Arts",
        summary: "Build imaginative worlds, invent characters, and express ideas through visual stories.",
        activity: {
          title: "Create Your Own Three-Panel Comic",
          focus: "Visual pacing & narrative humor",
          timeEstimate: "15 mins · Playful creative trial",
          whatYouExplore:
            "How visual timing, simple dialogue bubbles, and character choices make an audience smile or feel curious.",
          practicalTask:
            "Pick two characters (like an inquisitive owl and a gentle robot) and draw or write a three-panel comic solving a silly morning dilemma.",
          expectedOutput:
            "A completed 3-panel storyboard showing beginning, obstacle, and surprising resolution.",
          reflectionPrompt:
            "What did you enjoy more: designing your characters' personalities, or coming up with the funny ending?",
          placeholderAnswer: "e.g., I enjoyed drawing the robot trying to feed toast to the owl...",
          sampleFeedback:
            "Terrific creative instinct! Storyboarding builds narrative sequencing and empathy—foundational skills for both writers and visual designers.",
          nextExperience: "Add expressive sound effects (onomatopoeia) to each panel!",
        },
      },
      {
        id: "logic-problem-solving",
        name: "Logic & Problem-Solving",
        icon: Sparkles,
        tag: "Patterns & Puzzles",
        summary: "Unravel real-life mysteries, spot clues, and eliminate impossible answers with reasoning.",
        activity: {
          title: "Solve a Neighborhood Library Mystery",
          focus: "Deductive logic & pattern clues",
          timeEstimate: "15 mins · Low-pressure puzzle",
          whatYouExplore:
            "Deductive clues, patterns, and eliminating impossible answers to find the real explanation.",
          practicalTask:
            "Three bicycles are parked outside the library. Using four clue cards (color, bell, basket, tire size), deduce who owns each bike.",
          expectedOutput:
            "A step-by-step logic grid showing how you crossed out mismatches until only the true matches remained.",
          reflectionPrompt:
            "Did you guess first, or did crossing out the impossible options help you feel certain of your answer?",
          placeholderAnswer: "e.g., Crossing out helped me be 100% sure before guessing...",
          sampleFeedback:
            "Excellent deductive approach! Eliminating impossible states is the exact thinking computer scientists and detectives use.",
          nextExperience: "Create your own three-clue puzzle for a family member to solve!",
        },
      },
      {
        id: "science-observation",
        name: "Science & Observation",
        icon: FlaskConical,
        tag: "Living World & Nature",
        summary: "Look closely at plants, light, weather, and everyday kitchen science through observation.",
        activity: {
          title: "Observe How Plants Seek the Light",
          focus: "Phototropism & biological observation",
          timeEstimate: "20 mins setup · 4-day log",
          whatYouExplore:
            "Phototropism—how living sprouts gently bend towards a window to absorb vital sunlight.",
          practicalTask:
            "Place two bean seeds in moist cotton—one beside a bright window and one in a cardboard box with a small side coin hole. Sketch what happens over 4 days.",
          expectedOutput:
            "A mini 4-day field journal containing sketches, stem angles, and daily observation notes.",
          reflectionPrompt:
            "What surprised you about how the shoot in the dark box navigated toward the tiny light beam?",
          placeholderAnswer: "e.g., It bent almost 90 degrees like an elbow to reach the hole...",
          sampleFeedback:
            "Fascinating scientific observation! Documenting physical changes over time is the heart of real experimental science.",
          nextExperience: "Test why water drops bead up on certain leaves like lotus leaves!",
        },
      },
      {
        id: "digital-creativity",
        name: "Digital Creativity",
        icon: Laptop,
        tag: "Interactive Concepts",
        summary: "Explore pixel grids, friendly game sprites, and simple visual sequence commands.",
        activity: {
          title: "Design Your First Game Character Sprite",
          focus: "Pixel art & visual silhouettes",
          timeEstimate: "15 mins · Digital play",
          whatYouExplore:
            "Pixel grids, color palettes, and how simple shapes communicate motion and character mood.",
          practicalTask:
            "On a 16×16 grid, design an animated running animal or friendly creature using only four colors.",
          expectedOutput:
            "A 2-frame sprite flipbook concept showing an idle pose and a running stride.",
          reflectionPrompt:
            "What makes your sprite immediately recognizable even from far away on a tiny screen?",
          placeholderAnswer: "e.g., The giant yellow ears make the bunny stand out immediately...",
          sampleFeedback:
            "Wonderful eye for silhouette! Visual constraints spark great creativity in game and user interface design.",
          nextExperience: "Explore how keyboard arrow keys tell a game engine to move your sprite!",
        },
      },
      {
        id: "making-building",
        name: "Making & Building",
        icon: Wrench,
        tag: "Spatial Crafts & Prototypes",
        summary: "Fold cardboard structures, craft kinetic toys, and explore physical problem solving.",
        activity: {
          title: "Design an All-Abilities Dream Playground",
          focus: "Inclusive spatial design",
          timeEstimate: "20 mins · Hands-on sketch",
          whatYouExplore:
            "Spatial layout, physical balance, and making play spaces accessible for children of all abilities.",
          practicalTask:
            "Design an inclusive community play space featuring sensory garden paths, gentle wheelchair-friendly ramps, and a safe slide.",
          expectedOutput:
            "A top-down architectural layout sketch labeled with safety zones and recycled materials.",
          reflectionPrompt:
            "How did considering different friends' physical needs change where you placed the playground equipment?",
          placeholderAnswer: "e.g., I added smooth rubber paths so wheelchairs don't get stuck in mud...",
          sampleFeedback:
            "Compassionate, human-centered design! That is the core mindset of great civil and product designers.",
          nextExperience: "Build a miniature model of your swing set using popsicle sticks or folded paper!",
        },
      },
      {
        id: "communication-expression",
        name: "Communication & Expression",
        icon: HeartHandshake,
        tag: "Public Sharing & Voice",
        summary: "Share wonder stories, articulate curious thoughts, and practice confident listening.",
        activity: {
          title: "The 60-Second Wonder Talk",
          focus: "Expressive oral presentation",
          timeEstimate: "10 mins prep · 1 min share",
          whatYouExplore:
            "How to explain one surprising natural or historical fact to your family in a compelling 60 seconds.",
          practicalTask:
            "Pick one animal or space mystery (like why flamingos stand on one leg) and write 3 cue cards for dinner-table sharing.",
          expectedOutput:
            "A 3-point presentation outline with a hook, a fun fact, and a question to ask your listeners.",
          reflectionPrompt:
            "What question from your family surprised you after you finished your 60-second talk?",
          placeholderAnswer: "e.g., My sister asked if flamingos sleep standing up too...",
          sampleFeedback:
            "Fantastic! Great communication is as much about sparking a two-way conversation as it is about talking.",
          nextExperience: "Draft an encouraging thank-you postcard to someone who taught you something new!",
        },
      },
    ],
  },
  "classes-8-10": {
    key: "classes-8-10",
    label: "Classes 8–10",
    cohort: "Guided Exploration",
    ageSpan: "Ages 13–16",
    philosophyBadge: "Guided Exploration & Foundational Thinking",
    philosophyHeadline: "Build real understanding across streams before making high-stakes choices.",
    philosophyDescription:
      "Class 10 is often full of premature pressure to declare a career. We give students safe, practical micro-projects across science, tech, humanities, and commerce to see what the actual work feels like first.",
    guardrailNotice:
      "Multi-stream parity · Real micro-projects · Zero premature stream locks · No entrance coaching hype",
    categories: [
      {
        id: "tech-foundations",
        name: "Technology Foundations",
        icon: Cpu,
        tag: "Systems & Algorithms",
        summary: "Understand how code, inputs, conditional rules, and data packets build digital tools.",
        activity: {
          title: "Map an Automated School Library Assistant",
          focus: "Logic branching & edge cases",
          timeEstimate: "20 mins · Systems design",
          whatYouExplore:
            "Decision trees, conditional branches, and handling real-world exceptions in automated services.",
          practicalTask:
            "Draw the logic flow for a book reminder bot: what happens when a student returns a book early, on time, or during an unexpected school holiday?",
          expectedOutput:
            "A visual flowchart with conditional diamond nodes, user inputs, and clear notification actions.",
          reflectionPrompt:
            "What unexpected situation (edge case) did you need to add to prevent the bot from sending mistaken overdue alerts?",
          placeholderAnswer: "e.g., If the school is closed for a holiday, the return date must automatically shift to the next working day...",
          sampleFeedback:
            "Superb systems thinking! Anticipating edge cases is what separates fragile code from production-ready software.",
          nextExperience: "Translate your decision tree into 12 lines of readable Python logic!",
        },
      },
      {
        id: "scientific-thinking",
        name: "Scientific Thinking",
        icon: FlaskConical,
        tag: "Hypothesis & Evidence",
        summary: "Form testable hypotheses, analyze experimental data, and question claims with evidence.",
        activity: {
          title: "Explain an Everyday Thermodynamic Phenomenon",
          focus: "Convective cooling & surface area",
          timeEstimate: "25 mins · Empirical measurement",
          whatYouExplore:
            "Thermal physics and evaporation rates—why tea cools significantly faster poured into a saucer than in a tall mug.",
          practicalTask:
            "Design a household test measuring liquid cooling rates across three containers of varying surface areas over 15 minutes.",
          expectedOutput:
            "A plotted cooling curve comparing surface-area-to-volume ratio against temperature loss over time.",
          reflectionPrompt:
            "How does increasing exposed surface area accelerate molecular heat transfer to the surrounding air?",
          placeholderAnswer: "e.g., The wider surface lets more high-energy steam molecules escape into the air every second...",
          sampleFeedback:
            "Exact physical reasoning! That identical thermodynamic principle is used to cool high-performance laptop processors and car engines.",
          nextExperience: "Investigate how cooling fins on power transformers use the exact same geometry!",
        },
      },
      {
        id: "communication-debating",
        name: "Communication & Debating",
        icon: HeartHandshake,
        tag: "Argumentation & Ethics",
        summary: "Evaluate evidence, synthesize opposing perspectives, and build structured arguments.",
        activity: {
          title: "Draft a Balanced School AI Policy Memo",
          focus: "Two-sided ethical policy framing",
          timeEstimate: "20 mins · Policy synthesis",
          whatYouExplore:
            "Structured argumentation: how to present legitimate student benefits alongside genuine educational risks without dogmatism.",
          practicalTask:
            "Write a concise 200-word memo detailing two genuine learning benefits and two pitfalls of generative AI in homework, proposing a balanced guideline.",
          expectedOutput:
            "A 4-part structured comparison memo featuring clear policy boundaries and an executive summary.",
          reflectionPrompt:
            "Which argument was harder to frame fairly—the student perspective or the teacher/evaluator perspective?",
          placeholderAnswer: "e.g., Defending the teacher perspective was harder until I realized how cognitive struggle is what actually builds memory...",
          sampleFeedback:
            "Mature, balanced civic reasoning! Synthesizing conflicting requirements is key to law, public policy, and product leadership.",
          nextExperience: "Record a crisp 90-second voice briefing pitching your policy to your principal!",
        },
      },
      {
        id: "logical-reasoning",
        name: "Logical Reasoning",
        icon: Sparkles,
        tag: "Analytical Thinking",
        summary: "Spot manipulative statistics, audit graph scales, and evaluate causal relationships.",
        activity: {
          title: "Deconstruct a Misleading Commercial Chart",
          focus: "Data literacy & axis distortion",
          timeEstimate: "15 mins · Data audit",
          whatYouExplore:
            "How truncated Y-axes, selective sampling, and confounding variables can make a 1% difference look like a 500% revolution.",
          practicalTask:
            "Examine two smartphone battery comparison charts; identify the truncation technique used on the axis and redraw an honest zero-baseline version.",
          expectedOutput:
            "An annotated chart audit sheet highlighting axis manipulation and the corrected honest visualization.",
          reflectionPrompt:
            "Why do advertisers truncate axes, and what ethical responsibility do data analysts hold toward readers?",
          placeholderAnswer: "e.g., They start the graph at 90% so a 92% battery looks 3 times bigger than 91%...",
          sampleFeedback:
            "Spot on! Defending intellectual honesty with data is one of the highest-value capabilities in any scientific or business discipline.",
          nextExperience: "Learn why data scientists report median income rather than average income!",
        },
      },
      {
        id: "creative-design",
        name: "Creative Design & UI",
        icon: Palette,
        tag: "Human Ergonomics & UX",
        summary: "Examine physical affordances, visual hierarchy, and intuitive user interfaces.",
        activity: {
          title: "Redesign an Everyday Household Remote Control",
          focus: "Cognitive ergonomics & simplification",
          timeEstimate: "20 mins · Wireframe sketch",
          whatYouExplore:
            "Cognitive ergonomics: why modern television remotes have 45 tiny buttons when most grandparents only ever press four.",
          practicalTask:
            "Design an accessible remote control layout for older family members, incorporating high-contrast typography, tactile markers, and grouped actions.",
          expectedOutput:
            "A clean wireframe design schematic with callouts explaining ergonomics, button sizing, and grouping.",
          reflectionPrompt:
            "What feature was most tempting to keep, and why did removing it ultimately make the device better?",
          placeholderAnswer: "e.g., I removed the number pad because typing channel numbers is slower than voice search or simple up/down...",
          sampleFeedback:
            "Classic Dieter Rams design wisdom! Good design is as much about what you leave out as what you put in.",
          nextExperience: "Compare physical remote buttons with touch-screen accessibility standards!",
        },
      },
      {
        id: "community-solutions",
        name: "Community Problem-Solving",
        icon: TrendingUp,
        tag: "Social Impact & Logistics",
        summary: "Identify local neighborhood challenges and engineer practical, low-cost community solutions.",
        activity: {
          title: "Engineer a Canteen Surplus Food Redistribution Plan",
          focus: "Micro-logistics & community impact",
          timeEstimate: "25 mins · Action blueprint",
          whatYouExplore:
            "Civic problem solving: safe food handling, transit timelines, and stakeholder incentives to minimize canteen food waste.",
          practicalTask:
            "Design a 3-step surplus food collection workflow connecting school canteen leftovers with a local community distribution shelter.",
          expectedOutput:
            "A 1-page operational blueprint detailing pickup schedules, hygiene checks, and volunteer roles.",
          reflectionPrompt:
            "What is the single biggest operational bottleneck (e.g. food temperature safety vs. transport speed), and how did you resolve it?",
          placeholderAnswer: "e.g., Food safety was crucial, so we instituted a strict 60-minute insulated transport window...",
          sampleFeedback:
            "Outstanding pragmatic design! Real social impact requires rigorous operational thinking, not just good intentions.",
          nextExperience: "Estimate the weekly kilograms of food diverted and CO2 emissions saved!",
        },
      },
    ],
  },
  "classes-11-12": {
    key: "classes-11-12",
    label: "Classes 11–12",
    cohort: "Practical Streams & Pathways",
    ageSpan: "Ages 16–18",
    philosophyBadge: "Practical Streams & Future Pathways",
    philosophyHeadline: "Multi-stream exploration without engineering bias or entrance exam anxiety.",
    philosophyDescription:
      "Whether you are studying Science, Commerce, Humanities, or Vocational courses, discover what real degrees, industry projects, and research feel like before submitting university applications.",
    guardrailNotice:
      "Science, Commerce, Arts & Vocational parity · Grounded higher ed paths · Zero commercial coaching bias",
    categories: [
      {
        id: "programming-tech-basics",
        name: "Programming & Technology",
        icon: Cpu,
        tag: "Computational Thinking",
        summary: "Understand algorithmic complexity, data structures, and how modern software scales.",
        activity: {
          title: "Investigate Algorithmic Search Complexity",
          focus: "Binary search vs. linear scan",
          timeEstimate: "20 mins · Algorithmic trial",
          whatYouExplore:
            "Computational scale: how music streaming services search across 100 million track titles in milliseconds.",
          practicalTask:
            "Simulate linear scan vs. binary search on a sorted list of 1,000 song titles, recording step counts across different query targets.",
          expectedOutput:
            "An annotated complexity log showing 1,000 max steps for linear search vs. 10 max steps for binary search.",
          reflectionPrompt:
            "Why does the upfront cost of keeping an array sorted yield massive efficiency dividends when search volume grows to millions?",
          placeholderAnswer: "e.g., Because dividing the search space in half each step keeps time logarithmic even for huge databases...",
          sampleFeedback:
            "Spot on! Grasping logarithmic scalability is the cornerstone of computer science and database design.",
          nextExperience: "Explore how hash maps achieve near-instant constant time O(1) lookups!",
        },
      },
      {
        id: "business-financial-thinking",
        name: "Business & Financial Thinking",
        icon: TrendingUp,
        tag: "Economics & Unit Margins",
        summary: "Model startup unit economics, break-even thresholds, and practical budgeting spreadsheets.",
        activity: {
          title: "Model Break-Even Economics for a Campus Cafe Stall",
          focus: "Unit contribution margin & fixed costs",
          timeEstimate: "25 mins · Financial model",
          whatYouExplore:
            "Fixed costs, variable costs, gross margins, and finding the exact sales volume needed to reach profitability.",
          practicalTask:
            "Build a financial projection for a weekend cold-brew coffee stand: ingredient costs (Rs. 25/cup), stall fee (Rs. 1,500), price (Rs. 75/cup). Calculate break-even units.",
          expectedOutput:
            "A unit economics model demonstrating that 30 cups covers fixed costs, and every cup beyond that generates Rs. 50 net profit.",
          reflectionPrompt:
            "If dairy costs rise by 20%, what are the strategic trade-offs between raising cup price vs. accepting thinner margins?",
          placeholderAnswer: "e.g., Raising prices might push students to competitors, so negotiating bulk bean discounts is smarter first...",
          sampleFeedback:
            "Sharp commercial acumen! Understanding contribution margin vs. fixed overhead is central to every sustainable venture.",
          nextExperience: "Learn how venture capital equity differs from bank debt financing!",
        },
      },
      {
        id: "design-creative-systems",
        name: "Design & Creative Systems",
        icon: Palette,
        tag: "Spatial & Industrial Design",
        summary: "Examine architectural floor plans, sustainable materials, and human ergonomics.",
        activity: {
          title: "Architect a Sustainable 250 sq. ft. Studio Living Space",
          focus: "Multi-functional zoning & passive airflow",
          timeEstimate: "25 mins · Architectural plan",
          whatYouExplore:
            "Spatial efficiency, modular multi-functional furniture, cross-ventilation, and natural solar lighting angles.",
          practicalTask:
            "Draft a 1:50 scale floor plan for a compact urban studio apartment incorporating study, kitchen, fold-down bed, and window light corridors.",
          expectedOutput:
            "A scaled architectural zoning diagram labeled with dimensions, ventilation flow lines, and dual-purpose furniture notes.",
          reflectionPrompt:
            "How does intentional window orientation reduce both artificial lighting electricity and air conditioning requirements?",
          placeholderAnswer: "e.g., North-facing glass provides consistent diffused light all day without hot glare...",
          sampleFeedback:
            "Brilliant bioclimatic architectural awareness! Passive environmental design is the future of sustainable architecture.",
          nextExperience: "Explore degree pathways in interior architecture, urban planning, and product design!",
        },
      },
      {
        id: "communication-research",
        name: "Communication & Academic Research",
        icon: BookOpen,
        tag: "Qualitative & Source Audit",
        summary: "Audit scientific claims, evaluate primary vs. secondary sources, and synthesize literature.",
        activity: {
          title: "Conduct an Academic Source Credibility Audit",
          focus: "Peer-review rigor & funding conflicts",
          timeEstimate: "20 mins · Research methodology",
          whatYouExplore:
            "Methodology scrutiny: sample size, control groups, reproducibility, and identifying sponsor bias in viral science headlines.",
          practicalTask:
            "Review two published abstracts regarding battery recycling; evaluate their sample sizes, peer-review indexing, and potential funding bias.",
          expectedOutput:
            "A 1-page source credibility audit matrix rating study methodology, sample adequacy, and potential conflict disclosures.",
          reflectionPrompt:
            "What subtle difference separated the peer-reviewed university preprint from the commercial corporate press release?",
          placeholderAnswer: "e.g., The journal paper openly documented three failure modes that the corporate PR completely hid...",
          sampleFeedback:
            "First-rate academic discernment! Critical source interrogation is essential for higher education across arts, sciences, and law.",
          nextExperience: "Learn how to formulate a defensible academic thesis statement with counter-arguments!",
        },
      },
      {
        id: "science-investigation",
        name: "Science & Practical Investigation",
        icon: FlaskConical,
        tag: "Environmental Hydrology",
        summary: "Model ecological ecosystems, investigate laboratory protocols, and test biochemical principles.",
        activity: {
          title: "Model Groundwater Depletion in a Micro-Watershed",
          focus: "Permeability & sustainable aquifer yield",
          timeEstimate: "25 mins · Environmental calculation",
          whatYouExplore:
            "Hydrogeological cycles: rainfall percolation rates across clay, sand, and asphalt, and calculating safe water extraction yields.",
          practicalTask:
            "Calculate seasonal percolation volume for a 10-hectare semi-urban catchment receiving 800mm annual rainfall, comparing paved vs. permeable ground.",
          expectedOutput:
            "A water balance balance-sheet showing annual aquifer recharge potential under 20%, 50%, and 80% surface paving scenarios.",
          reflectionPrompt:
            "How does rapid urban concretization paradoxically create simultaneous monsoon flooding and summer water drought?",
          placeholderAnswer: "e.g., Water rushes off concrete as storm flash-floods instead of slowly sinking to refill groundwater...",
          sampleFeedback:
            "Insightful environmental engineering insight! That exact paradox drives modern sponge-city civil infrastructure initiatives.",
          nextExperience: "Explore degree avenues in environmental geosciences and GIS spatial mapping!",
        },
      },
      {
        id: "educational-pathways",
        name: "Educational Pathways After Class 12",
        icon: Compass,
        tag: "Higher Ed Comparison",
        summary: "Compare degree structures, diploma avenues, vocational tracks, and realistic career trajectories.",
        activity: {
          title: "Compare Multi-Stream Higher Education Pathways",
          focus: "Curriculum truth, prerequisites & trade-offs",
          timeEstimate: "20 mins · Comparative decision matrix",
          whatYouExplore:
            "Transparent degree comparison: B.Des (Design) vs. B.Com (Analytics) vs. B.Sc (Data) vs. B.Tech vs. Vocational options.",
          practicalTask:
            "Map out three prospective 3-to-4 year undergraduate paths, comparing actual weekly course hours, practical portfolio needs, and real graduate roles.",
          expectedOutput:
            "A side-by-side comparative table analyzing prerequisite subjects, portfolio vs. exam emphasis, and typical work environments.",
          reflectionPrompt:
            "Which prospective educational route values portfolio projects and studio critique over entrance examination percentiles?",
          placeholderAnswer: "e.g., Design (B.Des) and Architecture rely heavily on creative studio portfolios and critique...",
          sampleFeedback:
            "Clear, grounded clarity! Knowing whether a field prioritizes portfolio evidence or standardized exams gives you immense strategic control.",
          nextExperience: "Explore lateral entry possibilities and university scholarship frameworks!",
        },
      },
    ],
  },
};

export function SchoolDynamicStageExperience() {
  const [activeStageKey, setActiveStageKey] = useState<SchoolStageKey>("classes-4-7");
  const isMarketing = useIsMarketingMode();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("creative-storytelling");
  const [userReflection, setUserReflection] = useState<string>("");
  const [reflectionSubmitted, setReflectionSubmitted] = useState<boolean>(false);
  const [showFullMatrix, setShowFullMatrix] = useState<boolean>(false);

  const currentStageConfig = SCHOOL_STAGES_CONFIG[activeStageKey];
  const activeCategory =
    currentStageConfig.categories.find((c) => c.id === selectedCategoryId) ||
    currentStageConfig.categories[0];

  const handleStageChange = (newKey: SchoolStageKey) => {
    setActiveStageKey(newKey);
    const firstCat = SCHOOL_STAGES_CONFIG[newKey].categories[0];
    setSelectedCategoryId(firstCat.id);
    setUserReflection("");
    setReflectionSubmitted(false);
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategoryId(catId);
    setUserReflection("");
    setReflectionSubmitted(false);
  };

  const handleReflectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userReflection.trim().length > 0) {
      setReflectionSubmitted(true);
    }
  };

  const handleResetReflection = () => {
    setUserReflection("");
    setReflectionSubmitted(false);
  };

  return (
    <section id="school-stages" className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F9FA] text-[#269CA8] text-xs font-bold uppercase tracking-wider mb-4 border border-[#CBF0F3] shadow-xs">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Stage Explorer</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Tailored for each school age.{" "}
            <span className="text-[#269CA8]">
              No labels, just discovery.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Select an academic stage below to see how Next Move Explore shapes curiosity, practical activities, and reflective learning for that age group.
          </p>
        </div>

        {/* 3-Way Dynamic Academic Stage Selector */}
        <div
          role="tablist"
          aria-label="School Academic Stages"
          className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 p-2 rounded-2xl bg-[#FAF9F6] border-2 border-[#E8E6F3] mb-10 shadow-xs"
        >
          {(
            [
              { key: "classes-4-7", label: "Classes 4–7", sub: "Foundational Curiosity", span: "Ages 9–13" },
              { key: "classes-8-10", label: "Classes 8–10", sub: "Guided Exploration", span: "Ages 13–16" },
              { key: "classes-11-12", label: "Classes 11–12", sub: "Streams & Pathways", span: "Ages 16–18" },
            ] as const
          ).map((tab) => {
            const isSelected = activeStageKey === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isSelected}
                tabIndex={0}
                onClick={() => handleStageChange(tab.key)}
                className={`flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#269CA8] focus:ring-offset-2 ${
                  isSelected
                    ? "bg-white text-[#171A2B] shadow-md border-2 border-[#269CA8]/40 scale-[1.01]"
                    : "text-[#626987] hover:text-[#171A2B] hover:bg-white/60 border border-transparent"
                }`}
              >
                <span className="text-sm sm:text-base font-extrabold tracking-tight">
                  {tab.label}
                </span>
                <span
                  className={`text-xs font-semibold mt-0.5 ${
                    isSelected ? "text-[#269CA8]" : "text-[#7B82A0]"
                  }`}
                >
                  {tab.sub}
                </span>
                <span className="text-[10px] text-[#A0A5BA] mt-1">
                  {tab.span}
                </span>
              </button>
            );
          })}
        </div>

        {/* Stage Philosophy Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[#FAF9F6] to-[#E8F9FA]/40 border-2 border-[#E8E6F3] p-6 sm:p-8 mb-12 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F9FA] text-[#269CA8] text-xs font-bold uppercase tracking-wider mb-2.5 border border-[#CBF0F3]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentStageConfig.philosophyBadge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#171A2B] tracking-tight">
                {currentStageConfig.philosophyHeadline}
              </h3>
              <p className="mt-2 text-sm text-[#474D66] leading-relaxed">
                {currentStageConfig.philosophyDescription}
              </p>
            </div>

            <div className="shrink-0 p-4 rounded-2xl bg-white border border-[#CBF0F3] shadow-xs lg:max-w-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#269CA8] mb-1">
                <ShieldCheck className="w-4 h-4 text-[#269CA8]" />
                <span>Educational Safeguard</span>
              </div>
              <p className="text-[11px] text-[#626987] leading-relaxed">
                {currentStageConfig.guardrailNotice}
              </p>
            </div>
          </div>
        </div>

        {/* 6 Category Pills for the Active Stage */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#626987] uppercase tracking-wider">
              1. Choose an Exploration Area:
            </span>
            <span className="text-xs text-[#7B82A0]">
              6 age-appropriate categories for {currentStageConfig.label}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {currentStageConfig.categories.map((cat) => {
              const isCatActive = cat.id === activeCategory.id;
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`p-3 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#269CA8] ${
                    isCatActive
                      ? "bg-[#E8F9FA] border-[#269CA8] text-[#171A2B] shadow-sm shadow-[#35B8C5]/10 scale-[1.02]"
                      : "bg-[#FAF9F6] border-[#E8E6F3] text-[#626987] hover:border-[#CBF0F3] hover:text-[#171A2B]"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 transition-colors ${
                      isCatActive
                        ? "bg-[#269CA8] text-white"
                        : "bg-white text-[#626987] border border-[#E8E6F3]"
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold leading-tight line-clamp-2">
                      {cat.name}
                    </h4>
                    <span className="text-[10px] text-[#7B82A0] block mt-1 line-clamp-1">
                      {cat.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Experience Showcase Card */}
        <div className="rounded-3xl bg-white border-2 border-[#E8E6F3] shadow-md shadow-[#35B8C5]/5 overflow-hidden mb-12">
          {/* Card Header */}
          <div className="p-6 sm:p-8 border-b border-[#F0EEF8] bg-gradient-to-r from-white via-[#FAF9F6] to-[#E8F9FA]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F9FA] text-[#269CA8] border border-[#CBF0F3] flex items-center justify-center shrink-0">
                <activeCategory.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#269CA8] uppercase tracking-wider">
                    {activeCategory.tag} · {currentStageConfig.label}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#171A2B] tracking-tight">
                  {activeCategory.activity.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E8E6F3] text-xs font-semibold text-[#626987]">
                ⏱ {activeCategory.activity.timeEstimate}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#E8F9FA] border border-[#CBF0F3] text-xs font-bold text-[#269CA8]">
                {activeCategory.activity.focus}
              </span>
            </div>
          </div>

          {/* Card Body Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: What to explore & Practical Task */}
            <div className="lg:col-span-7 space-y-6">
              {/* What You Explore */}
              <div>
                <h4 className="text-xs font-bold text-[#626987] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-[#269CA8]" />
                  <span>What the Learner Explores:</span>
                </h4>
                <p className="text-sm sm:text-base text-[#171A2B] leading-relaxed bg-[#FAF9F6] p-4 rounded-2xl border border-[#E8E6F3]">
                  {activeCategory.activity.whatYouExplore}
                </p>
              </div>

              {/* Practical Task */}
              <div>
                <h4 className="text-xs font-bold text-[#626987] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Lightbulb className="w-3.5 h-3.5 text-[#269CA8]" />
                  <span>The Practical Creative Task:</span>
                </h4>
                <div className="p-4 rounded-2xl bg-white border-2 border-[#E8F9FA] shadow-xs">
                  <p className="text-sm text-[#373D54] leading-relaxed">
                    {activeCategory.activity.practicalTask}
                  </p>
                </div>
              </div>

              {/* Tangible Output Preview */}
              <div>
                <h4 className="text-xs font-bold text-[#626987] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Expected Tangible Output:</span>
                </h4>
                <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-[#10B981] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#065F46]">
                      Tangible Output Created
                    </h5>
                    <p className="text-xs sm:text-sm text-[#047857] mt-0.5 leading-relaxed">
                      {activeCategory.activity.expectedOutput}
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Recommended Experience */}
              <div className="pt-2 flex items-center gap-2 text-xs text-[#626987]">
                <span className="font-bold text-[#171A2B]">Next possible step:</span>
                <span>{activeCategory.activity.nextExperience}</span>
              </div>
            </div>

            {/* Right Column: Interactive Reflection Prompt & Demonstration Sandbox */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-[#FAF9F6] border-2 border-[#E8E6F3]">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E6F3] mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#E8F9FA] text-[#269CA8] flex items-center justify-center">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#171A2B]">
                      Guided Reflection Sandbox
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EDEAFF] text-[#6757F5] border border-[#DDD8FE]">
                    Demonstration Preview
                  </span>
                </div>

                {/* Reflection Question */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-[#626987] block mb-1">
                    Sample Reflection Prompt:
                  </span>
                  <p className="text-sm font-bold text-[#171A2B] leading-snug">
                    &ldquo;{activeCategory.activity.reflectionPrompt}&rdquo;
                  </p>
                </div>

                {/* Interactive Reflection Input Form */}
                {!reflectionSubmitted ? (
                  <form onSubmit={handleReflectionSubmit} className="space-y-3">
                    <textarea
                      rows={3}
                      value={userReflection}
                      onChange={(e) => setUserReflection(e.target.value)}
                      placeholder={activeCategory.activity.placeholderAnswer}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5D8E2] bg-white text-[#171A2B] focus:outline-none focus:ring-2 focus:ring-[#269CA8] resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setUserReflection(activeCategory.activity.placeholderAnswer.replace("e.g., ", ""))}
                        className="text-[11px] font-semibold text-[#269CA8] hover:underline"
                      >
                        Insert sample thought
                      </button>
                      <button
                        type="submit"
                        disabled={userReflection.trim().length === 0}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#269CA8] text-white text-xs font-bold shadow-sm shadow-[#35B8C5]/20 hover:bg-[#1F808A] disabled:opacity-50 transition-all"
                      >
                        <span>Test Reflection</span>
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-3 animate-fade-in">
                    <div className="p-3.5 rounded-xl bg-white border border-[#CBF0F3] text-xs text-[#171A2B]">
                      <span className="text-[10px] font-bold text-[#269CA8] uppercase block mb-1">
                        Your Sample Reflection:
                      </span>
                      <p className="italic">&ldquo;{userReflection}&rdquo;</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#E8F9FA] border border-[#CBF0F3] text-xs text-[#0F6570]">
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#269CA8]" />
                        <span>My Partner&apos;s Encouraging Feedback:</span>
                      </div>
                      <p className="leading-relaxed">
                        {activeCategory.activity.sampleFeedback}
                      </p>
                    </div>

                    <button
                      onClick={handleResetReflection}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#626987] hover:text-[#171A2B] transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Try another reflection</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Stage-Aware Exploration Entry Action */}
              <div className="mt-5 pt-4 border-t border-[#E8E6F3] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left">
                  <span className="text-xs font-bold text-[#171A2B] block">
                    Ready to begin with {currentStageConfig.label}?
                  </span>
                  <span className="text-[11px] text-[#626987]">
                    {!isMarketing
                      ? "Continue to personalized exploration workspace"
                      : "Try hands-on activities or explore pilot partnership"}
                  </span>
                </div>
                {!isMarketing ? (
                  <Link
                    href={`/get-started?stage=${activeStageKey}&audience=school`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#269CA8] text-white text-xs sm:text-sm font-bold shadow-sm shadow-[#35B8C5]/20 hover:bg-[#1F808A] transition-all shrink-0"
                  >
                    <span>Begin {currentStageConfig.label} Exploration</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <a
                    href="#school-partnerships"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#269CA8] text-white text-xs sm:text-sm font-bold shadow-sm shadow-[#35B8C5]/20 hover:bg-[#1F808A] transition-all shrink-0"
                  >
                    <span>Inquire for School Pilot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Privacy Disclaimer Callout */}
              <div className="mt-5 pt-4 border-t border-[#E8E6F3]">
                <div className="flex items-start gap-2 text-[11px] text-[#626987]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                  <span>
                    <strong>Public Preview Safety:</strong> No accounts, no cookies, and no personal student data collected in this public demonstration.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle to Open Full Parameterized StudentExplorer for School Stages */}
        <div className="text-center pt-2">
          <button
            onClick={() => setShowFullMatrix(!showFullMatrix)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FAF9F6] border-2 border-[#E8E6F3] text-sm font-bold text-[#171A2B] hover:bg-[#E8F9FA] hover:border-[#CBF0F3] transition-all shadow-xs"
          >
            <Compass className="w-4 h-4 text-[#269CA8]" />
            <span>
              {showFullMatrix
                ? "Hide Extended 24-Experience Matrix"
                : "Browse Extended 24-Experience Matrix for School Stages"}
            </span>
            <ChevronRight
              className={`w-4 h-4 text-[#626987] transition-transform ${
                showFullMatrix ? "rotate-90" : ""
              }`}
            />
          </button>
        </div>

        {/* Optional Collapsible Parameterized StudentExplorer */}
        {showFullMatrix && (
          <div className="mt-10 pt-10 border-t border-[#E8E6F3] animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold text-[#269CA8] uppercase tracking-wider block mb-1">
                Extended Discovery Matrix
              </span>
              <h3 className="text-2xl font-black text-[#171A2B]">
                Explore All 6 Domains Across School Cohorts
              </h3>
              <p className="text-xs sm:text-sm text-[#626987] mt-1.5">
                Filtered strictly to Classes 4–7, Classes 8–10, and Classes 11–12.
              </p>
            </div>
            <StudentExplorer
              allowedStages={["classes-4-7", "classes-8-10", "classes-11-12"]}
              initialStage={activeStageKey}
            />
          </div>
        )}
      </div>
    </section>
  );
}
