/**
 * NEXT MOVE AI V2 — FLOW 3 INTEREST CATEGORIES & SUB-INTERESTS
 * 
 * Curated, age-adaptive interest catalog.
 * Follows V2 design system (Electric Iris, Cyan, Warm Slate).
 */

import { type InterestCategory } from "../schemas/types";

export const INTEREST_CATEGORIES: InterestCategory[] = [
  {
    id: "technology",
    title: "Technology & Software",
    shortDesc: "Coding, AI systems, games, robotics, and interactive web tools.",
    iconName: "Code2",
    colorClass: "text-[#6757F5]",
    accentBg: "bg-[#EDEAFF]",
    borderColor: "border-[#DDD8FE]",
    subInterests: [
      { id: "tech_programming", name: "Programming & Algorithms", description: "Writing code in Python, JavaScript, C++, or Rust to solve real problems." },
      { id: "tech_game_dev", name: "Game Creation & Virtual Worlds", description: "Designing gameplay, 2D/3D physics, mechanics, and interactive engines." },
      { id: "tech_ai_ml", name: "AI & Emerging Technologies", description: "Exploring neural networks, generative AI models, computer vision, and NLP." },
      { id: "tech_web_apps", name: "Websites & Digital Applications", description: "Building modern user experiences, mobile apps, and robust cloud services." },
      { id: "tech_robotics", name: "Robotics & Hardware Systems", description: "Programming microcontrollers, sensors, IoT devices, and automation gear." },
      { id: "tech_cybersecurity", name: "Cybersecurity & Networks", description: "Understanding digital defense, network protocols, cryptography, and safety." },
    ],
  },
  {
    id: "creativity",
    title: "Creativity & Media",
    shortDesc: "Visual design, storytelling, digital art, animation, and sound.",
    iconName: "Palette",
    colorClass: "text-[#9333EA]",
    accentBg: "bg-[#F5EEFE]",
    borderColor: "border-[#E4D4F9]",
    subInterests: [
      { id: "creat_visual_design", name: "Graphic Design & UI/UX", description: "Crafting visual identities, web interfaces, branding, and typography." },
      { id: "creat_storytelling", name: "Storytelling & Creative Writing", description: "Developing compelling narratives, screenplays, articles, and novels." },
      { id: "creat_video_creation", name: "Video Production & Filmmaking", description: "Shooting, editing, lighting, visual pacing, and documentary filmmaking." },
      { id: "creat_animation", name: "Animation & 3D Modeling", description: "Bringing characters and environments to life in motion and render engines." },
      { id: "creat_music_sound", name: "Music, Audio & Sound Design", description: "Composing music, mixing audio, podcast engineering, and sound effects." },
      { id: "creat_industrial_design", name: "Product & Spatial Design", description: "Designing physical tools, smart products, architectural spaces, and models." },
    ],
  },
  {
    id: "science_discovery",
    title: "Science & Discovery",
    shortDesc: "Space exploration, biology, physics, chemistry, and earth systems.",
    iconName: "Compass",
    colorClass: "text-[#0284C7]",
    accentBg: "bg-[#E0F2FE]",
    borderColor: "border-[#BAE6FD]",
    subInterests: [
      { id: "sci_space_astronomy", name: "Space & Astrophysics", description: "Studying planetary systems, orbital mechanics, telescope optics, and cosmology." },
      { id: "sci_biology_life", name: "Life Sciences & Genetics", description: "Exploring cellular biology, human physiology, biotechnology, and ecology." },
      { id: "sci_physics_mechanics", name: "Physics & Fundamental Forces", description: "Investigating mechanics, quantum theory, renewable energy, and optics." },
      { id: "sci_chemistry_materials", name: "Chemistry & Advanced Materials", description: "Understanding molecular synthesis, polymers, batteries, and nanotechnology." },
      { id: "sci_earth_environment", name: "Climate, Earth & Sustainability", description: "Studying ecosystems, oceanography, geology, and environmental protection." },
    ],
  },
  {
    id: "business_entrepreneurship",
    title: "Business & Ventures",
    shortDesc: "Building startups, marketing, economics, finance, and product strategy.",
    iconName: "TrendingUp",
    colorClass: "text-[#059669]",
    accentBg: "bg-[#ECFDF5]",
    borderColor: "border-[#A7F3D0]",
    subInterests: [
      { id: "biz_startup", name: "Entrepreneurship & Startups", description: "Transforming customer problems into viable products and new ventures." },
      { id: "biz_finance", name: "Finance, Investing & Economics", description: "Analyzing markets, budgeting, capital allocation, and fiscal policies." },
      { id: "biz_marketing", name: "Marketing, Growth & Brand Strategy", description: "Understanding customer psychology, digital campaigns, and community growth." },
      { id: "biz_product_mgmt", name: "Product Strategy & Management", description: "Defining product roadmaps, user research, and cross-functional execution." },
      { id: "biz_operations", name: "Operations & Supply Chain", description: "Optimizing logistics, resource allocation, manufacturing, and operational scale." },
    ],
  },
  {
    id: "social_impact",
    title: "Social Impact & People",
    shortDesc: "Public policy, education, human psychology, community development, and healthcare.",
    iconName: "Users",
    colorClass: "text-[#D97706]",
    accentBg: "bg-[#FFFBEB]",
    borderColor: "border-[#FDE68A]",
    subInterests: [
      { id: "soc_education", name: "Education & Teaching Innovation", description: "Designing engaging learning tools, mentoring, and cognitive pedagogy." },
      { id: "soc_psychology", name: "Psychology & Behavioral Science", description: "Exploring cognitive behavior, emotional wellbeing, and interpersonal dynamics." },
      { id: "soc_policy_law", name: "Public Policy, Law & Governance", description: "Evaluating civic frameworks, constitutional rights, justice, and social ethics." },
      { id: "soc_community", name: "Community Leadership & Non-profits", description: "Mobilizing grassroots movements, social advocacy, and civic support." },
      { id: "soc_health_wellbeing", name: "Health, Nutrition & Wellness", description: "Promoting physical fitness, public health awareness, and balanced living." },
    ],
  },
  {
    id: "analysis_problem_solving",
    title: "Analysis & Logic",
    shortDesc: "Data analysis, strategic thinking, puzzle solving, and complex research.",
    iconName: "Search",
    colorClass: "text-[#35B8C5]",
    accentBg: "bg-[#E6F9FB]",
    borderColor: "border-[#B2EFF4]",
    subInterests: [
      { id: "ana_data_analytics", name: "Data Science & Statistics", description: "Finding patterns in messy datasets, building charts, and statistical models." },
      { id: "ana_logic_strategy", name: "Logic Puzzles & Game Strategy", description: "Solving chess tactics, algorithmic puzzles, and decision trees." },
      { id: "ana_investigative", name: "Investigative Research", description: "Sifting through primary sources, verifying claims, and writing objective syntheses." },
      { id: "ana_systems_thinking", name: "Systems & Process Optimization", description: "Mapping complex causal loops, feedback mechanisms, and architectural tradeoffs." },
    ],
  },
  {
    id: "still_exploring",
    title: "Still Exploring",
    shortDesc: "I want to keep an open mind and sample different domains before choosing.",
    iconName: "Sparkles",
    colorClass: "text-[#474D66]",
    accentBg: "bg-[#F4F3F8]",
    borderColor: "border-[#E8E6F3]",
    subInterests: [
      { id: "explore_general", name: "Broad Multidisciplinary Exposure", description: "Sample technology, creative work, and business without committing to one." },
      { id: "explore_subject_guided", name: "Subject-Guided Discovery", description: "Follow favorite school/college topics to see what real-world work they connect to." },
      { id: "explore_hands_on_first", name: "Action-First Exploration", description: "Try quick practical mini-tasks to discover what actually feels engaging in practice." },
    ],
  },
];
