/**
 * NEXT MOVE AI V2 — MY STARTING POINT CARD
 * 
 * Intelligent profile-summary & baseline discovery card.
 * Features age/class-specific questionnaires for all academic stages:
 * - Classes 4–7: Simple, playful, curiosity-based exploration
 * - Classes 8–10: Interests, problem-solving, subjects, and mini-projects
 * - Classes 11–12: Deeper academic streams, degree directions, and skill goals
 * - Diploma: Hands-on skills, practical making/fixing, lateral entry
 * - Degree / Engineering: Tech stacks, portfolio projects, real-world challenges
 * - Working Professionals: Skills, strategic transitions, leadership, domain excellence
 * 
 * Automatically shows questionnaire for first-time users, saved baseline summary
 * for returning users, and prefilled questionnaire on "Edit Answers".
 */

"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Edit3,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { type StudentHomeViewModel } from "../schemas/types";
import { useStudentHome } from "../hooks/useStudentHome";
import { normalizeAcademicStage } from "@/data/flow2-config";
import { type AcademicStageId } from "@/data/landing-demo";
import { type UserStartingPoint } from "@/lib/firestore-service";

// =============================================================================
// 1. QUESTION INTERFACE & DEFINITIONS BY ACADEMIC STAGE
// Kept directly inside the Starting Point component as required
// =============================================================================

export interface StartingPointQuestion {
  id: number;
  title: string;
  options: string[];
}

// -----------------------------------------------------------------------------
// STAGE 1: CLASSES 4–7 (Ages 9–12) — Playful, curiosity-based
// -----------------------------------------------------------------------------
export const CLASSES_4_TO_7_QUESTIONS: StartingPointQuestion[] = [
  {
    id: 1,
    title: "What do you enjoy doing most in your free time?",
    options: [
      "Drawing, painting, or making things",
      "Playing games or sports",
      "Exploring nature or animals",
      "Building, fixing, or experimenting",
      "Reading stories or imagining things",
      "Trying different activities",
    ],
  },
  {
    id: 2,
    title: "Which activity sounds the most exciting to you?",
    options: [
      "Creating something with my own hands",
      "Solving a puzzle or mystery",
      "Discovering how things work",
      "Helping someone or caring for others",
      "Making a story, video, or artwork",
      "Exploring something I've never tried",
    ],
  },
  {
    id: 3,
    title: "If you had a whole day to do anything you wanted, what would you choose?",
    options: [
      "Build something interesting",
      "Go on an adventure or explore outdoors",
      "Draw, create, or design something",
      "Play, experiment, and discover",
      "Learn something new",
      "Spend time doing different things",
    ],
  },
  {
    id: 4,
    title: "What would you love to explore more?",
    options: [
      "Art, animation, and creativity",
      "Animals, plants, and nature",
      "Science and experiments",
      "Technology, robots, and machines",
      "Stories, games, and imagination",
      "Many different things—I haven't decided",
    ],
  },
];

// -----------------------------------------------------------------------------
// STAGE 2: CLASSES 8–10 (Ages 13–16) — Interests, subjects & problem solving
// -----------------------------------------------------------------------------
export const CLASSES_8_TO_10_QUESTIONS: StartingPointQuestion[] = [
  {
    id: 1,
    title: "Which subjects or activities do you find most interesting in school?",
    options: [
      "Science and experimenting with how things work in the real world",
      "Mathematics, logical puzzles, and solving complex problems",
      "Computers, coding, robotics, and digital technology",
      "Art, creative writing, media, and visual design",
      "Social sciences, history, understanding people and society",
      "Business ideas, organizing activities, and practical projects",
    ],
  },
  {
    id: 2,
    title: "When you want to build or try something new, what excites you most?",
    options: [
      "Designing digital apps, games, or tinkering with tech hardware",
      "Conducting hands-on science experiments or studying nature",
      "Creating graphic illustrations, videos, music, or stories",
      "Analysing real-world problems and finding practical solutions",
      "Leading a group project or planning an event with friends",
      "Exploring different streams to see what fits me best",
    ],
  },
  {
    id: 3,
    title: "What kind of real-world challenge would you enjoy tackling?",
    options: [
      "Building a smart gadget or program that solves an everyday problem",
      "Protecting the environment, wildlife, or community health",
      "Designing an inspiring media campaign, magazine, or animated story",
      "Understanding how businesses grow and managing resources",
      "Helping people in my community through social initiatives",
      "Testing multiple project ideas across different fields",
    ],
  },
  {
    id: 4,
    title: "What area do you want to explore most over the coming months?",
    options: [
      "Computer science, coding, and engineering concepts",
      "Physics, chemistry, biology, and scientific research",
      "Creative arts, journalism, communication, and design",
      "Commerce, finance, entrepreneurship, and economics",
      "Humanities, psychology, law, and social development",
      "Broad exploration across multiple streams before deciding",
    ],
  },
];

// -----------------------------------------------------------------------------
// STAGE 3: CLASSES 11–12 (Ages 16–18) — Deeper streams, degrees & directions
// -----------------------------------------------------------------------------
export const CLASSES_11_TO_12_QUESTIONS: StartingPointQuestion[] = [
  {
    id: 1,
    title: "Which academic area or stream aligns best with your strengths and interests?",
    options: [
      "Computer science, mathematics, and engineering sciences",
      "Physics, chemistry, biological sciences, or medicine",
      "Commerce, economics, accounting, and financial markets",
      "Humanities, psychology, literature, sociology, or law",
      "Applied design, digital media, architecture, or creative arts",
      "Still exploring between different degree directions",
    ],
  },
  {
    id: 2,
    title: "What kind of projects or study work do you find most fulfilling?",
    options: [
      "Building software, algorithms, or working with technical systems",
      "Doing lab experiments, research analysis, and scientific theory",
      "Case studies, financial models, and business strategy analysis",
      "Debating social ideas, creative writing, and human interactions",
      "Prototyping visual designs, user experiences, or creative content",
      "Exploring practical industry applications across diverse fields",
    ],
  },
  {
    id: 3,
    title: "What is your main goal for your higher education journey?",
    options: [
      "Pursuing competitive engineering / tech programs and building tech skills",
      "Entering medical, healthcare, or pure scientific research fields",
      "Building a strong foundation in commerce, management, or finance",
      "Studying humanities, liberal arts, design, or law",
      "Exploring practical vocational pathways and applied professional degrees",
      "Gaining clarity on entrance exams vs degree alternatives",
    ],
  },
  {
    id: 4,
    title: "Which capability would you most like to develop right now?",
    options: [
      "Technical problem-solving and software development",
      "Scientific inquiry and advanced conceptual mastery",
      "Business acumen, leadership, and quantitative analysis",
      "Critical thinking, communication, and social analysis",
      "Creative direction, portfolio design, and multimedia",
      "Decision-making clarity and exploring college pathways",
    ],
  },
];

// -----------------------------------------------------------------------------
// STAGE 4: DIPLOMA STUDENTS — Hands-on skills, practical making, lateral entry
// -----------------------------------------------------------------------------
export const DIPLOMA_QUESTIONS: StartingPointQuestion[] = [
  {
    id: 1,
    title: "What technical or practical work do you enjoy doing most?",
    options: [
      "Coding, developing software, or working with IT systems",
      "Assembling circuits, electronics, or automation hardware",
      "Mechanical fabrication, 3D modeling, or machine maintenance",
      "Civil construction, drafting, surveying, or site planning",
      "Chemical processes, quality testing, or laboratory analysis",
      "Hands-on troubleshooting and fixing technical problems",
    ],
  },
  {
    id: 2,
    title: "What type of hands-on project gives you the greatest satisfaction?",
    options: [
      "Writing clean code or deploying a working application",
      "Building an automated electronic or IoT device",
      "Designing, assembling, or repairing mechanical mechanisms",
      "Creating detailed architectural or structural CAD drawings",
      "Testing and validating industrial equipment or workflows",
      "Solving real workshop or workplace operational bottlenecks",
    ],
  },
  {
    id: 3,
    title: "What is your primary goal after completing your diploma?",
    options: [
      "Lateral entry into B.Tech / B.E. degree programs",
      "Securing a skilled technical job in core industry",
      "Starting a specialized technical service or venture",
      "Mastering in-demand modern tools, CAD, or software stacks",
      "Exploring emerging industrial technology and automation",
      "Assessing options between immediate job vs higher degree",
    ],
  },
  {
    id: 4,
    title: "Which practical skill do you want to strengthen most right now?",
    options: [
      "Advanced software development or networking tools",
      "Embedded systems, PLC, and industrial automation",
      "Advanced CAD / CAM modeling and precision manufacturing",
      "Project estimation, site execution, and quality control",
      "Industry certifications and hands-on domain mastery",
      "Practical problem-solving and professional communication",
    ],
  },
];

// -----------------------------------------------------------------------------
// STAGE 5: DEGREE / ENGINEERING — Tech stacks, projects, real-world building
// -----------------------------------------------------------------------------
export const DEGREE_ENGINEERING_QUESTIONS: StartingPointQuestion[] = [
  {
    id: 1,
    title: "Which technical or domain area do you find most engaging?",
    options: [
      "Full-stack software engineering, web architectures, and cloud",
      "Artificial Intelligence, machine learning, and data analytics",
      "Embedded systems, robotics, IoT, and hardware design",
      "Core engineering disciplines (Mechanical, Civil, Electrical)",
      "Product management, tech entrepreneurship, and systems design",
      "Broad technological exploration across software and systems",
    ],
  },
  {
    id: 2,
    title: "What kind of project would you be most proud to showcase on your portfolio?",
    options: [
      "A production-ready web or mobile app solving a user need",
      "An AI/ML pipeline or model trained on real-world datasets",
      "A functional hardware prototype or robotic automation system",
      "A validated engineering design, simulation, or research paper",
      "A scalable software tool with clean architecture and tests",
      "A multi-disciplinary solution solving an industry challenge",
    ],
  },
  {
    id: 3,
    title: "What is your primary objective for the current academic year?",
    options: [
      "Securing top-tier software / tech internships or placements",
      "Building portfolio projects with verified real-world code",
      "Preparing for GATE, GRE, or higher graduate studies (MS / M.Tech)",
      "Exploring product innovation or startup venture building",
      "Mastering core systems, algorithms, and technical interviews",
      "Clarifying specialization options between tech and business roles",
    ],
  },
  {
    id: 4,
    title: "Which capability do you want to elevate most in the coming months?",
    options: [
      "System design, architecture patterns, and backend performance",
      "Machine learning algorithms, mathematics, and data engineering",
      "Practical DevOps, cloud infrastructure, and CI/CD pipelines",
      "Collaborative open-source contributions and production code",
      "Technical communication, problem framing, and leadership",
      "End-to-end project execution from concept to deployment",
    ],
  },
];

// -----------------------------------------------------------------------------
// STAGE 6: WORKING PROFESSIONALS — Upskilling, transition, leadership
// -----------------------------------------------------------------------------
export const PROFESSIONAL_QUESTIONS: StartingPointQuestion[] = [
  {
    id: 1,
    title: "What is your main focus in your professional or career journey right now?",
    options: [
      "Advancing modern technical skills and software engineering leadership",
      "Transitioning into AI, data science, or high-growth tech domains",
      "Moving into product management, strategic operations, or leadership",
      "Preparing for higher education, executive degrees, or global transitions",
      "Deepening expertise in my current domain and optimizing workflows",
      "Exploring new career directions and expanding professional versatility",
    ],
  },
  {
    id: 2,
    title: "What type of challenges energize you most in your work?",
    options: [
      "Solving complex architectural bottlenecks and technical challenges",
      "Extracting actionable business insights from complex data",
      "Aligning teams, defining product roadmaps, and delivering value",
      "Innovating processes and introducing modern best practices",
      "Mentoring team members and improving collaborative outcomes",
      "Tackling multifaceted problems that require cross-functional skills",
    ],
  },
  {
    id: 3,
    title: "What is your single most important objective for the next year?",
    options: [
      "Upskilling with hands-on projects to unlock senior or lead roles",
      "Pivoting to a new specialized domain or higher-leverage industry",
      "Building an impressive personal brand, portfolio, or venture",
      "Earning high-impact credentials, certifications, or publications",
      "Improving work-life balance while expanding domain impact",
      "Clarifying long-term career roadmaps with structured guidance",
    ],
  },
  {
    id: 4,
    title: "Which core capability do you want to sharpen most?",
    options: [
      "Modern system architectures, cloud-native design, and tech stacks",
      "Data-driven decision making and advanced AI integration",
      "Strategic thinking, stakeholder communication, and negotiation",
      "High-velocity execution and agile project management",
      "Deep domain expertise and specialized problem-solving",
      "Professional leadership, influence, and executive presence",
    ],
  },
];

// -----------------------------------------------------------------------------
// Stage Question Selector
// -----------------------------------------------------------------------------
export function getStageQuestionnaire(stage: AcademicStageId): StartingPointQuestion[] {
  switch (stage) {
    case "classes-4-7":
      return CLASSES_4_TO_7_QUESTIONS;
    case "classes-8-10":
      return CLASSES_8_TO_10_QUESTIONS;
    case "classes-11-12":
      return CLASSES_11_TO_12_QUESTIONS;
    case "diploma":
      return DIPLOMA_QUESTIONS;
    case "degree-engineering":
      return DEGREE_ENGINEERING_QUESTIONS;
    case "final-year-grad":
      return PROFESSIONAL_QUESTIONS;
    default:
      return CLASSES_8_TO_10_QUESTIONS;
  }
}

// -----------------------------------------------------------------------------
// Stage Friendly Display Names
// -----------------------------------------------------------------------------
export function getStageDisplayName(stageId: AcademicStageId | string, currentClass?: string | null): string {
  if (currentClass) return currentClass;
  switch (stageId) {
    case "classes-4-7":
      return "Classes 4 – 7";
    case "classes-8-10":
      return "Classes 8 – 10";
    case "classes-11-12":
      return "Classes 11 – 12";
    case "diploma":
      return "Diploma";
    case "degree-engineering":
      return "Degree / Engineering";
    case "final-year-grad":
      return "Working Professional";
    default:
      return "Classes 8 – 10";
  }
}

// =============================================================================
// BACKWARD COMPATIBILITY HELPER
// Normalizes answers from both the legacy 6-question schema and the 4-question schema
// =============================================================================

const EXPLORE_QUESTION_OPTIONS = [
  "Art, animation, and creativity",
  "Animals, plants, and nature",
  "Science and experiments",
  "Technology, robots, and machines",
  "Stories, games, and imagination",
  "Many different things—I haven't decided",
];

export function normalizeSavedAnswers(
  rawAnswers?: Record<string, string> | Record<number, string> | null
): Record<number, string> {
  if (!rawAnswers) return {};
  const normalized: Record<number, string> = {};
  const raw = rawAnswers as Record<string, string>;

  if (raw[1] || raw["1"]) normalized[1] = String(raw[1] || raw["1"]);
  if (raw[2] || raw["2"]) normalized[2] = String(raw[2] || raw["2"]);
  if (raw[3] || raw["3"]) normalized[3] = String(raw[3] || raw["3"]);

  const val4 = raw[4] || raw["4"];
  const val5 = raw[5] || raw["5"];

  if (val4 && EXPLORE_QUESTION_OPTIONS.includes(String(val4))) {
    normalized[4] = String(val4);
  } else if (val5 && EXPLORE_QUESTION_OPTIONS.includes(String(val5))) {
    normalized[4] = String(val5);
  } else if (val4) {
    normalized[4] = String(val4);
  }

  return normalized;
}

// =============================================================================
// DETERMINISTIC RULE-BASED ANALYSIS LOGIC PER STAGE
// Evaluates selected answers to generate Primary Focus, Status, and Active Interests
// =============================================================================

export interface AnalysisResult {
  primaryFocus: string;
  status: string;
  activeInterests: string[];
}

// -----------------------------------------------------------------------------
// Scoring for Classes 4–7
// -----------------------------------------------------------------------------
export function analyzeClasses4to7Answers(answers: Record<number, string>): AnalysisResult {
  const scores: Record<string, number> = {
    "Creativity & Media": 0,
    "Nature & Environment": 0,
    "Technology & Building": 0,
    "Science & Discovery": 0,
    "Stories & Imagination": 0,
    "Helping & People": 0,
    "Problem Solving": 0,
    "Exploring Multiple Directions": 0,
  };

  const a1 = answers[1] || "";
  const a2 = answers[2] || "";
  const a3 = answers[3] || "";
  const a4 = answers[4] || answers[5] || "";

  // Question 1
  if (a1.includes("Drawing") || a1.includes("making")) scores["Creativity & Media"] += 2;
  if (a1.includes("sports") || a1.includes("games")) scores["Exploring Multiple Directions"] += 1;
  if (a1.includes("nature") || a1.includes("animals")) scores["Nature & Environment"] += 2;
  if (a1.includes("Building") || a1.includes("fixing")) scores["Technology & Building"] += 2;
  if (a1.includes("stories") || a1.includes("imagining")) scores["Stories & Imagination"] += 2;
  if (a1.includes("different activities")) scores["Exploring Multiple Directions"] += 2;

  // Question 2
  if (a2.includes("own hands")) scores["Creativity & Media"] += 2;
  if (a2.includes("puzzle") || a2.includes("mystery")) {
    scores["Problem Solving"] += 2;
    scores["Science & Discovery"] += 1;
  }
  if (a2.includes("how things work")) {
    scores["Science & Discovery"] += 2;
    scores["Technology & Building"] += 1;
  }
  if (a2.includes("Helping") || a2.includes("caring")) scores["Helping & People"] += 2;
  if (a2.includes("story") || a2.includes("artwork")) scores["Creativity & Media"] += 2;
  if (a2.includes("never tried")) scores["Exploring Multiple Directions"] += 2;

  // Question 3
  if (a3.includes("Build something")) scores["Technology & Building"] += 2;
  if (a3.includes("adventure") || a3.includes("outdoors")) scores["Nature & Environment"] += 2;
  if (a3.includes("Draw") || a3.includes("design")) scores["Creativity & Media"] += 2;
  if (a3.includes("experiment") || a3.includes("discover")) scores["Science & Discovery"] += 2;
  if (a3.includes("Learn something new")) scores["Problem Solving"] += 1;
  if (a3.includes("different things")) scores["Exploring Multiple Directions"] += 2;

  // Question 4: What would you love to explore more?
  if (a4.includes("Art") || a4.includes("animation")) scores["Creativity & Media"] += 2;
  if (a4.includes("Animals") || a4.includes("plants")) scores["Nature & Environment"] += 2;
  if (a4.includes("Science")) scores["Science & Discovery"] += 2;
  if (a4.includes("Technology") || a4.includes("robots")) scores["Technology & Building"] += 2;
  if (a4.includes("Stories") || a4.includes("imagination")) scores["Stories & Imagination"] += 2;
  if (a4.includes("Many different")) scores["Exploring Multiple Directions"] += 2;

  const sortedDomains = Object.entries(scores)
    .filter(([key]) => key !== "Exploring Multiple Directions")
    .sort((a, b) => b[1] - a[1]);

  const topCategory = sortedDomains[0]?.[0] || "Creativity & Media";
  const secondCategory = sortedDomains[1]?.[0] || "Science & Discovery";
  const thirdCategory = sortedDomains[2]?.[0];

  const activeInterests: string[] = [topCategory, secondCategory];
  if (thirdCategory && scores[thirdCategory] >= 2) {
    activeInterests.push(thirdCategory);
  }

  let primaryFocus: string;
  switch (topCategory) {
    case "Creativity & Media":
      primaryFocus = "Discovering creative ideas and learning by making, drawing, and exploring.";
      break;
    case "Nature & Environment":
      primaryFocus = "Exploring wildlife, observing plants, and discovering the natural world outdoors.";
      break;
    case "Technology & Building":
      primaryFocus = "Building, tinkering with models, and discovering how machines and tools work.";
      break;
    case "Science & Discovery":
      primaryFocus = "Conducting fun experiments, observing changes, and uncovering scientific mysteries.";
      break;
    case "Stories & Imagination":
      primaryFocus = "Imagining new adventures, crafting creative stories, and exploring expressive ideas.";
      break;
    case "Helping & People":
      primaryFocus = "Working with friends, helping others, and finding fun ways to solve problems together.";
      break;
    case "Problem Solving":
      primaryFocus = "Solving curious puzzles, testing different solutions, and mastering challenges.";
      break;
    default:
      primaryFocus = "Discovering new hobbies, exploring different activities, and building personal curiosity.";
  }

  let status: string;
  const topScore = sortedDomains[0]?.[1] || 0;
  if (scores["Exploring Multiple Directions"] >= 3) {
    status = "Exploring Potential Directions";
  } else if (topScore >= 3) {
    status = "Exploring Interests";
  } else if (topCategory === "Science & Discovery" || topCategory === "Technology & Building") {
    status = "Discovering Possibilities";
  } else {
    status = "Building Curiosity";
  }

  return { primaryFocus, status, activeInterests };
}

// -----------------------------------------------------------------------------
// Scoring for Classes 8–10
// -----------------------------------------------------------------------------
export function analyzeClasses8to10Answers(answers: Record<number, string>): AnalysisResult {
  const scores: Record<string, number> = {
    "Technology & Coding": 0,
    "Science & Investigation": 0,
    "Creative Arts & Media": 0,
    "Logic & Problem Solving": 0,
    "Business & Entrepreneurship": 0,
    "People & Social Impact": 0,
    "Multi-Disciplinary Exploration": 0,
  };

  const a1 = answers[1] || "";
  const a2 = answers[2] || "";
  const a3 = answers[3] || "";
  const a4 = answers[4] || "";

  // Question 1
  if (a1.includes("Science")) scores["Science & Investigation"] += 2;
  if (a1.includes("Mathematics") || a1.includes("puzzles")) scores["Logic & Problem Solving"] += 2;
  if (a1.includes("Computers") || a1.includes("coding") || a1.includes("robotics")) scores["Technology & Coding"] += 2;
  if (a1.includes("Art") || a1.includes("writing") || a1.includes("design")) scores["Creative Arts & Media"] += 2;
  if (a1.includes("Social sciences") || a1.includes("society")) scores["People & Social Impact"] += 2;
  if (a1.includes("Business ideas") || a1.includes("organizing")) scores["Business & Entrepreneurship"] += 2;

  // Question 2
  if (a2.includes("digital apps") || a2.includes("hardware")) scores["Technology & Coding"] += 2;
  if (a2.includes("science experiments") || a2.includes("nature")) scores["Science & Investigation"] += 2;
  if (a2.includes("graphic illustrations") || a2.includes("videos")) scores["Creative Arts & Media"] += 2;
  if (a2.includes("Analysing real-world problems")) scores["Logic & Problem Solving"] += 2;
  if (a2.includes("group project") || a2.includes("planning an event")) scores["Business & Entrepreneurship"] += 2;
  if (a2.includes("Exploring different streams")) scores["Multi-Disciplinary Exploration"] += 2;

  // Question 3
  if (a3.includes("smart gadget") || a3.includes("program")) scores["Technology & Coding"] += 2;
  if (a3.includes("environment") || a3.includes("health")) scores["Science & Investigation"] += 2;
  if (a3.includes("media campaign") || a3.includes("magazine")) scores["Creative Arts & Media"] += 2;
  if (a3.includes("businesses grow")) scores["Business & Entrepreneurship"] += 2;
  if (a3.includes("social initiatives")) scores["People & Social Impact"] += 2;
  if (a3.includes("multiple project ideas")) scores["Multi-Disciplinary Exploration"] += 2;

  // Question 4
  if (a4.includes("Computer science") || a4.includes("coding")) scores["Technology & Coding"] += 2;
  if (a4.includes("Physics") || a4.includes("research")) scores["Science & Investigation"] += 2;
  if (a4.includes("Creative arts") || a4.includes("journalism")) scores["Creative Arts & Media"] += 2;
  if (a4.includes("Commerce") || a4.includes("economics")) scores["Business & Entrepreneurship"] += 2;
  if (a4.includes("Humanities") || a4.includes("psychology")) scores["People & Social Impact"] += 2;
  if (a4.includes("Broad exploration")) scores["Multi-Disciplinary Exploration"] += 2;

  const sortedDomains = Object.entries(scores)
    .filter(([key]) => key !== "Multi-Disciplinary Exploration")
    .sort((a, b) => b[1] - a[1]);

  const topCategory = sortedDomains[0]?.[0] || "Technology & Coding";
  const secondCategory = sortedDomains[1]?.[0] || "Logic & Problem Solving";
  const thirdCategory = sortedDomains[2]?.[0];

  const activeInterests: string[] = [topCategory, secondCategory];
  if (thirdCategory && scores[thirdCategory] >= 2) {
    activeInterests.push(thirdCategory);
  }

  let primaryFocus: string;
  switch (topCategory) {
    case "Technology & Coding":
      primaryFocus = "Exploring software, digital building, and practical engineering concepts.";
      break;
    case "Science & Investigation":
      primaryFocus = "Investigating scientific principles, natural phenomena, and hands-on experiments.";
      break;
    case "Creative Arts & Media":
      primaryFocus = "Developing visual design, storytelling, and expressive digital media.";
      break;
    case "Logic & Problem Solving":
      primaryFocus = "Tackling analytical puzzles, mathematical challenges, and structured reasoning.";
      break;
    case "Business & Entrepreneurship":
      primaryFocus = "Exploring commerce, enterprise thinking, and practical initiative building.";
      break;
    case "People & Social Impact":
      primaryFocus = "Understanding human behavior, community challenges, and positive social impact.";
      break;
    default:
      primaryFocus = "Discovering multiple subjects and practical skills across streams.";
  }

  const status = scores["Multi-Disciplinary Exploration"] >= 3
    ? "Exploring Potential Directions"
    : "Interests & Stream Clarity";

  return { primaryFocus, status, activeInterests };
}

// -----------------------------------------------------------------------------
// Scoring for Classes 11–12
// -----------------------------------------------------------------------------
export function analyzeClasses11to12Answers(answers: Record<number, string>): AnalysisResult {
  const scores: Record<string, number> = {
    "Engineering & Tech Pathways": 0,
    "Sciences & Healthcare Exploration": 0,
    "Commerce & Financial Thinking": 0,
    "Humanities, Law & Social Sciences": 0,
    "Creative Design & Media": 0,
    "Higher Education Discovery": 0,
  };

  const a1 = answers[1] || "";
  const a2 = answers[2] || "";
  const a3 = answers[3] || "";
  const a4 = answers[4] || "";

  if (a1.includes("Computer science") || a1.includes("engineering")) scores["Engineering & Tech Pathways"] += 2;
  if (a1.includes("Physics") || a1.includes("medicine")) scores["Sciences & Healthcare Exploration"] += 2;
  if (a1.includes("Commerce") || a1.includes("financial")) scores["Commerce & Financial Thinking"] += 2;
  if (a1.includes("Humanities") || a1.includes("law")) scores["Humanities, Law & Social Sciences"] += 2;
  if (a1.includes("Applied design") || a1.includes("architecture")) scores["Creative Design & Media"] += 2;
  if (a1.includes("Still exploring")) scores["Higher Education Discovery"] += 2;

  if (a2.includes("software") || a2.includes("algorithms")) scores["Engineering & Tech Pathways"] += 2;
  if (a2.includes("lab experiments") || a2.includes("research analysis")) scores["Sciences & Healthcare Exploration"] += 2;
  if (a2.includes("financial models") || a2.includes("business strategy")) scores["Commerce & Financial Thinking"] += 2;
  if (a2.includes("social ideas") || a2.includes("creative writing")) scores["Humanities, Law & Social Sciences"] += 2;
  if (a2.includes("visual designs") || a2.includes("user experiences")) scores["Creative Design & Media"] += 2;
  if (a2.includes("practical industry applications")) scores["Higher Education Discovery"] += 2;

  if (a3.includes("engineering / tech")) scores["Engineering & Tech Pathways"] += 2;
  if (a3.includes("medical") || a3.includes("scientific research")) scores["Sciences & Healthcare Exploration"] += 2;
  if (a3.includes("commerce") || a3.includes("management")) scores["Commerce & Financial Thinking"] += 2;
  if (a3.includes("humanities") || a3.includes("liberal arts")) scores["Humanities, Law & Social Sciences"] += 2;
  if (a3.includes("vocational") || a3.includes("applied professional")) scores["Creative Design & Media"] += 2;
  if (a3.includes("entrance exams")) scores["Higher Education Discovery"] += 2;

  if (a4.includes("Technical problem-solving")) scores["Engineering & Tech Pathways"] += 2;
  if (a4.includes("Scientific inquiry")) scores["Sciences & Healthcare Exploration"] += 2;
  if (a4.includes("Business acumen")) scores["Commerce & Financial Thinking"] += 2;
  if (a4.includes("Critical thinking")) scores["Humanities, Law & Social Sciences"] += 2;
  if (a4.includes("Creative direction")) scores["Creative Design & Media"] += 2;
  if (a4.includes("Decision-making clarity")) scores["Higher Education Discovery"] += 2;

  const sortedDomains = Object.entries(scores)
    .filter(([key]) => key !== "Higher Education Discovery")
    .sort((a, b) => b[1] - a[1]);

  const topCategory = sortedDomains[0]?.[0] || "Engineering & Tech Pathways";
  const secondCategory = sortedDomains[1]?.[0] || "Commerce & Financial Thinking";
  const thirdCategory = sortedDomains[2]?.[0];

  const activeInterests: string[] = [topCategory, secondCategory];
  if (thirdCategory && scores[thirdCategory] >= 2) {
    activeInterests.push(thirdCategory);
  }

  let primaryFocus: string;
  switch (topCategory) {
    case "Engineering & Tech Pathways":
      primaryFocus = "Deepening technical foundations, programming, and engineering problem-solving.";
      break;
    case "Sciences & Healthcare Exploration":
      primaryFocus = "Mastering scientific theory, laboratory inquiry, and healthcare pathways.";
      break;
    case "Commerce & Financial Thinking":
      primaryFocus = "Building financial literacy, business strategy, and economic analysis.";
      break;
    case "Humanities, Law & Social Sciences":
      primaryFocus = "Developing critical inquiry, legal/social analysis, and effective communication.";
      break;
    case "Creative Design & Media":
      primaryFocus = "Building portfolio-ready design skills, media creation, and visual storytelling.";
      break;
    default:
      primaryFocus = "Clarifying degree prerequisites, entrance pathways, and career options.";
  }

  const status = scores["Higher Education Discovery"] >= 3
    ? "Higher Education Exploration"
    : "Focused Pathway Preparation";

  return { primaryFocus, status, activeInterests };
}

// -----------------------------------------------------------------------------
// Scoring for Diploma Students
// -----------------------------------------------------------------------------
export function analyzeDiplomaAnswers(answers: Record<number, string>): AnalysisResult {
  const scores: Record<string, number> = {
    "Applied Software & IT Systems": 0,
    "Electrical, Electronics & IoT": 0,
    "Mechanical & Manufacturing Design": 0,
    "Civil & Infrastructure Planning": 0,
    "Lateral Entry Preparation": 0,
    "Industrial Skills Mastery": 0,
  };

  const a1 = answers[1] || "";
  const a2 = answers[2] || "";
  const a3 = answers[3] || "";
  const a4 = answers[4] || "";

  if (a1.includes("Coding") || a1.includes("IT systems")) scores["Applied Software & IT Systems"] += 2;
  if (a1.includes("circuits") || a1.includes("automation")) scores["Electrical, Electronics & IoT"] += 2;
  if (a1.includes("Mechanical") || a1.includes("3D modeling")) scores["Mechanical & Manufacturing Design"] += 2;
  if (a1.includes("Civil") || a1.includes("drafting")) scores["Civil & Infrastructure Planning"] += 2;
  if (a1.includes("troubleshooting")) scores["Industrial Skills Mastery"] += 2;

  if (a2.includes("clean code") || a2.includes("application")) scores["Applied Software & IT Systems"] += 2;
  if (a2.includes("electronic") || a2.includes("IoT device")) scores["Electrical, Electronics & IoT"] += 2;
  if (a2.includes("mechanical mechanisms")) scores["Mechanical & Manufacturing Design"] += 2;
  if (a2.includes("architectural") || a2.includes("CAD")) scores["Civil & Infrastructure Planning"] += 2;
  if (a2.includes("operational bottlenecks")) scores["Industrial Skills Mastery"] += 2;

  if (a3.includes("Lateral entry")) scores["Lateral Entry Preparation"] += 3;
  if (a3.includes("technical job")) scores["Industrial Skills Mastery"] += 2;
  if (a3.includes("modern tools")) scores["Applied Software & IT Systems"] += 2;
  if (a3.includes("emerging industrial")) scores["Electrical, Electronics & IoT"] += 2;

  if (a4.includes("software development")) scores["Applied Software & IT Systems"] += 2;
  if (a4.includes("Embedded systems") || a4.includes("PLC")) scores["Electrical, Electronics & IoT"] += 2;
  if (a4.includes("CAD / CAM")) scores["Mechanical & Manufacturing Design"] += 2;
  if (a4.includes("site execution")) scores["Civil & Infrastructure Planning"] += 2;
  if (a4.includes("certifications")) scores["Industrial Skills Mastery"] += 2;

  const sortedDomains = Object.entries(scores)
    .filter(([key]) => key !== "Industrial Skills Mastery")
    .sort((a, b) => b[1] - a[1]);

  const topCategory = sortedDomains[0]?.[0] || "Applied Software & IT Systems";
  const secondCategory = sortedDomains[1]?.[0] || "Electrical, Electronics & IoT";
  const thirdCategory = sortedDomains[2]?.[0];

  const activeInterests: string[] = [topCategory, secondCategory];
  if (thirdCategory && scores[thirdCategory] >= 2) {
    activeInterests.push(thirdCategory);
  }

  let primaryFocus: string;
  switch (topCategory) {
    case "Applied Software & IT Systems":
      primaryFocus = "Mastering software tools, network systems, and digital development.";
      break;
    case "Electrical, Electronics & IoT":
      primaryFocus = "Hands-on circuit design, microcontrollers, and hardware automation.";
      break;
    case "Mechanical & Manufacturing Design":
      primaryFocus = "Precision fabrication, 3D CAD modeling, and machine troubleshooting.";
      break;
    case "Civil & Infrastructure Planning":
      primaryFocus = "Drafting, structural surveying, and practical site execution.";
      break;
    case "Lateral Entry Preparation":
      primaryFocus = "Strengthening engineering fundamentals for B.Tech transition.";
      break;
    default:
      primaryFocus = "Developing job-ready technical proficiencies and workshop expertise.";
  }

  const status = scores["Lateral Entry Preparation"] >= 3
    ? "Lateral Entry Readiness"
    : "Applied Technical Mastery";

  return { primaryFocus, status, activeInterests };
}

// -----------------------------------------------------------------------------
// Scoring for Degree / Engineering Students
// -----------------------------------------------------------------------------
export function analyzeDegreeEngineeringAnswers(answers: Record<number, string>): AnalysisResult {
  const scores: Record<string, number> = {
    "Full-Stack & Cloud Engineering": 0,
    "AI & Data Science Innovation": 0,
    "Hardware & Embedded Systems": 0,
    "Core Engineering & Simulation": 0,
    "Technical Project Leadership": 0,
    "Systems & Algorithmic Foundations": 0,
  };

  const a1 = answers[1] || "";
  const a2 = answers[2] || "";
  const a3 = answers[3] || "";
  const a4 = answers[4] || "";

  if (a1.includes("Full-stack") || a1.includes("cloud")) scores["Full-Stack & Cloud Engineering"] += 2;
  if (a1.includes("Artificial Intelligence") || a1.includes("data analytics")) scores["AI & Data Science Innovation"] += 2;
  if (a1.includes("Embedded systems") || a1.includes("robotics")) scores["Hardware & Embedded Systems"] += 2;
  if (a1.includes("Core engineering")) scores["Core Engineering & Simulation"] += 2;
  if (a1.includes("Product management") || a1.includes("entrepreneurship")) scores["Technical Project Leadership"] += 2;
  if (a1.includes("Broad technological")) scores["Systems & Algorithmic Foundations"] += 2;

  if (a2.includes("production-ready web")) scores["Full-Stack & Cloud Engineering"] += 2;
  if (a2.includes("AI/ML pipeline")) scores["AI & Data Science Innovation"] += 2;
  if (a2.includes("hardware prototype")) scores["Hardware & Embedded Systems"] += 2;
  if (a2.includes("engineering design") || a2.includes("simulation")) scores["Core Engineering & Simulation"] += 2;
  if (a2.includes("clean architecture")) scores["Systems & Algorithmic Foundations"] += 2;
  if (a2.includes("industry challenge")) scores["Technical Project Leadership"] += 2;

  if (a3.includes("internships or placements")) scores["Full-Stack & Cloud Engineering"] += 2;
  if (a3.includes("portfolio projects")) scores["Technical Project Leadership"] += 2;
  if (a3.includes("GATE, GRE") || a3.includes("graduate studies")) scores["Core Engineering & Simulation"] += 2;
  if (a3.includes("startup venture")) scores["Technical Project Leadership"] += 2;
  if (a3.includes("technical interviews") || a3.includes("algorithms")) scores["Systems & Algorithmic Foundations"] += 2;

  if (a4.includes("System design") || a4.includes("backend")) scores["Full-Stack & Cloud Engineering"] += 2;
  if (a4.includes("Machine learning algorithms")) scores["AI & Data Science Innovation"] += 2;
  if (a4.includes("DevOps") || a4.includes("CI/CD")) scores["Full-Stack & Cloud Engineering"] += 2;
  if (a4.includes("open-source")) scores["Systems & Algorithmic Foundations"] += 2;
  if (a4.includes("Technical communication")) scores["Technical Project Leadership"] += 2;

  const sortedDomains = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topCategory = sortedDomains[0]?.[0] || "Full-Stack & Cloud Engineering";
  const secondCategory = sortedDomains[1]?.[0] || "AI & Data Science Innovation";
  const thirdCategory = sortedDomains[2]?.[0];

  const activeInterests: string[] = [topCategory, secondCategory];
  if (thirdCategory && scores[thirdCategory] >= 2) {
    activeInterests.push(thirdCategory);
  }

  let primaryFocus: string;
  switch (topCategory) {
    case "Full-Stack & Cloud Engineering":
      primaryFocus = "Architecting scalable web applications, APIs, and cloud services.";
      break;
    case "AI & Data Science Innovation":
      primaryFocus = "Developing machine learning pipelines, analytics, and intelligent systems.";
      break;
    case "Hardware & Embedded Systems":
      primaryFocus = "Tinkering with microcontrollers, IoT devices, and robotic automation.";
      break;
    case "Core Engineering & Simulation":
      primaryFocus = "Mastering engineering analysis, physical simulations, and domain methods.";
      break;
    case "Technical Project Leadership":
      primaryFocus = "Leading end-to-end software delivery and building verified portfolio evidence.";
      break;
    default:
      primaryFocus = "Strengthening algorithms, data structures, and system design.";
  }

  const status = "Portfolio & Industry Readiness";

  return { primaryFocus, status, activeInterests };
}

// -----------------------------------------------------------------------------
// Scoring for Working Professionals
// -----------------------------------------------------------------------------
export function analyzeProfessionalAnswers(answers: Record<number, string>): AnalysisResult {
  const scores: Record<string, number> = {
    "Technical Leadership & Architecture": 0,
    "AI & Data Transformation": 0,
    "Product Strategy & Management": 0,
    "Strategic Career Advancement": 0,
    "Specialized Domain Excellence": 0,
    "Cross-Functional Versatility": 0,
  };

  const a1 = answers[1] || "";
  const a2 = answers[2] || "";
  const a3 = answers[3] || "";
  const a4 = answers[4] || "";

  if (a1.includes("software engineering leadership")) scores["Technical Leadership & Architecture"] += 2;
  if (a1.includes("AI, data science")) scores["AI & Data Transformation"] += 2;
  if (a1.includes("product management")) scores["Product Strategy & Management"] += 2;
  if (a1.includes("higher education") || a1.includes("global transitions")) scores["Strategic Career Advancement"] += 2;
  if (a1.includes("Deepening expertise")) scores["Specialized Domain Excellence"] += 2;
  if (a1.includes("versatility")) scores["Cross-Functional Versatility"] += 2;

  if (a2.includes("architectural bottlenecks")) scores["Technical Leadership & Architecture"] += 2;
  if (a2.includes("business insights")) scores["AI & Data Transformation"] += 2;
  if (a2.includes("product roadmaps")) scores["Product Strategy & Management"] += 2;
  if (a2.includes("Innovating processes")) scores["Specialized Domain Excellence"] += 2;
  if (a2.includes("Mentoring team members")) scores["Technical Leadership & Architecture"] += 2;
  if (a2.includes("multifaceted problems")) scores["Cross-Functional Versatility"] += 2;

  if (a3.includes("senior or lead roles")) scores["Strategic Career Advancement"] += 2;
  if (a3.includes("Pivoting to a new specialized domain")) scores["AI & Data Transformation"] += 2;
  if (a3.includes("personal brand") || a3.includes("venture")) scores["Product Strategy & Management"] += 2;
  if (a3.includes("credentials")) scores["Specialized Domain Excellence"] += 2;
  if (a3.includes("long-term career roadmaps")) scores["Cross-Functional Versatility"] += 2;

  if (a4.includes("System architectures")) scores["Technical Leadership & Architecture"] += 2;
  if (a4.includes("Data-driven decision making")) scores["AI & Data Transformation"] += 2;
  if (a4.includes("Strategic thinking")) scores["Product Strategy & Management"] += 2;
  if (a4.includes("High-velocity execution")) scores["Specialized Domain Excellence"] += 2;
  if (a4.includes("leadership, influence")) scores["Strategic Career Advancement"] += 2;

  const sortedDomains = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topCategory = sortedDomains[0]?.[0] || "Technical Leadership & Architecture";
  const secondCategory = sortedDomains[1]?.[0] || "AI & Data Transformation";
  const thirdCategory = sortedDomains[2]?.[0];

  const activeInterests: string[] = [topCategory, secondCategory];
  if (thirdCategory && scores[thirdCategory] >= 2) {
    activeInterests.push(thirdCategory);
  }

  let primaryFocus: string;
  switch (topCategory) {
    case "Technical Leadership & Architecture":
      primaryFocus = "Mastering modern software architectures and technical strategy.";
      break;
    case "AI & Data Transformation":
      primaryFocus = "Leveraging machine learning, analytics, and data-driven execution.";
      break;
    case "Product Strategy & Management":
      primaryFocus = "Aligning user needs, business goals, and product innovation.";
      break;
    case "Strategic Career Advancement":
      primaryFocus = "Targeting high-impact promotions and expanding professional influence.";
      break;
    case "Specialized Domain Excellence":
      primaryFocus = "Deepening specialized skills and delivering high-value solutions.";
      break;
    default:
      primaryFocus = "Expanding leadership, stakeholder management, and strategic execution.";
  }

  const status = "Career Acceleration & Strategic Transition";

  return { primaryFocus, status, activeInterests };
}

// -----------------------------------------------------------------------------
// Unified Stage Analyzer
// -----------------------------------------------------------------------------
export function analyzeAnswersByStage(
  stage: AcademicStageId,
  answers: Record<number, string>
): AnalysisResult {
  switch (stage) {
    case "classes-4-7":
      return analyzeClasses4to7Answers(answers);
    case "classes-8-10":
      return analyzeClasses8to10Answers(answers);
    case "classes-11-12":
      return analyzeClasses11to12Answers(answers);
    case "diploma":
      return analyzeDiplomaAnswers(answers);
    case "degree-engineering":
      return analyzeDegreeEngineeringAnswers(answers);
    case "final-year-grad":
      return analyzeProfessionalAnswers(answers);
    default:
      return analyzeClasses8to10Answers(answers);
  }
}

// =============================================================================
// MAIN MY STARTING POINT COMPONENT
// =============================================================================

interface StartingPointCardProps {
  viewModel: StudentHomeViewModel;
}

export function StartingPointCard({ viewModel }: StartingPointCardProps) {
  const { userProfile, startingPoint, saveStartingPoint } = useStudentHome();

  // Resolved stage & exact class
  const currentStage = normalizeAcademicStage(userProfile?.academicStage || viewModel.academicStageId);
  const questions = getStageQuestionnaire(currentStage);

  // Exact class/stage resolution for Where You Stand
  const actualWhereYouStand = userProfile?.currentClass
    ? userProfile.currentClass
    : getStageDisplayName(currentStage, userProfile?.currentClass);

  const stageDisplayName = getStageDisplayName(currentStage, null);

  // Check if saved baseline exists in Firestore
  const hasCompletedBaseline = Boolean(startingPoint && startingPoint.isCompleted && startingPoint.primaryFocus);

  // Local questionnaire state
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>(() => {
    return normalizeSavedAnswers(startingPoint?.answers);
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Synchronize state when startingPoint updates in background or user logs in
  useEffect(() => {
    if (!isEditMode && startingPoint?.answers) {
      setSelectedAnswers(normalizeSavedAnswers(startingPoint.answers));
    }
  }, [startingPoint?.answers, isEditMode]);

  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const totalQuestions = questions.length;
  const currentAnswer = selectedAnswers[currentQuestion?.id];

  const handleSelectOption = (option: string) => {
    if (!currentQuestion) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleComplete = async () => {
    if (!currentAnswer) return;

    setIsSaving(true);
    try {
      const analysis = analyzeAnswersByStage(currentStage, selectedAnswers);

      const serializedAnswers: Record<string, string> = {};
      Object.entries(selectedAnswers).forEach(([k, v]) => {
        serializedAnswers[String(k)] = v;
      });

      const newStartingPoint: UserStartingPoint = {
        answers: serializedAnswers,
        academicStage: currentStage,
        primaryFocus: analysis.primaryFocus,
        status: analysis.status,
        activeInterests: analysis.activeInterests,
        isCompleted: true,
        completedAt: startingPoint?.completedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveStartingPoint(newStartingPoint);
      setIsEditMode(false);
      setCurrentQuestionIndex(0);
    } catch (err) {
      console.error("Error saving starting point:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStartEdit = () => {
    setSelectedAnswers(normalizeSavedAnswers(startingPoint?.answers));
    setIsEditMode(true);
    setCurrentQuestionIndex(0);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers(normalizeSavedAnswers(startingPoint?.answers));
  };

  // ---------------------------------------------------------------------------
  // SCENARIO 1: FIRST-TIME USER OR EDIT MODE (Show Interactive Questionnaire)
  // ---------------------------------------------------------------------------
  if (!hasCompletedBaseline || isEditMode) {
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
    const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

    return (
      <div
        id="starting-point"
        className="p-6 sm:p-7 rounded-3xl bg-white border border-[#DDD8FE] shadow-sm space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E6F3] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight">
                My Starting Point
              </h2>
              <p className="text-xs text-[#626987]">
                {isEditMode
                  ? "Editing your answers"
                  : `4 quick questions to discover your interests for ${actualWhereYouStand}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-[#6757F5] bg-[#EDEAFF] border border-[#DDD8FE] px-3 py-1 rounded-full">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-xs font-bold text-[#474D66] bg-[#F4F3F8] px-2.5 py-1 rounded-full hidden sm:inline-block">
              {stageDisplayName}
            </span>

            {isEditMode && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-xs font-bold text-[#626987] hover:text-[#171A2B] px-2 py-1 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-semibold text-[#626987]">
            <span>Exploration Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#E8E6F3] overflow-hidden">
            <div
              className="h-full bg-[#6757F5] transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Area */}
        <div className="space-y-4 pt-1">
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#171A2B] leading-snug">
              {currentQuestion.title}
            </h3>
            <p className="text-xs text-[#626987] mt-1">
              Choose the option that best reflects your genuine interests.
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {currentQuestion.options.map((option) => {
              const isSelected = currentAnswer === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all duration-150 ${
                    isSelected
                      ? "border-[#6757F5] bg-[#F7F6FF] text-[#171A2B] shadow-sm ring-2 ring-[#6757F5]/20"
                      : "border-[#E8E6F3] bg-white text-[#474D66] hover:border-[#DDD8FE] hover:bg-[#FAF9F6]"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-[#6757F5] bg-[#6757F5]"
                        : "border-[#8C93AD] bg-white"
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span className="leading-snug">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E8E6F3]">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              currentQuestionIndex === 0
                ? "text-[#A5ABBD] cursor-not-allowed opacity-50"
                : "text-[#474D66] hover:text-[#171A2B] hover:bg-[#F4F3F8]"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {isLastQuestion ? (
            <button
              type="button"
              onClick={handleComplete}
              disabled={!currentAnswer || isSaving}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md shadow-[#6757F5]/25 transition-all ${
                !currentAnswer || isSaving
                  ? "bg-[#C2C7D6] cursor-not-allowed opacity-70"
                  : "bg-[#6757F5] hover:bg-[#5342E8] active:scale-[0.99]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isSaving ? "Saving Baseline..." : isEditMode ? "Save Changes" : "Complete & View Starting Point"}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={!currentAnswer}
              className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md shadow-[#6757F5]/25 transition-all ${
                !currentAnswer
                  ? "bg-[#C2C7D6] cursor-not-allowed opacity-70"
                  : "bg-[#6757F5] hover:bg-[#5342E8] active:scale-[0.99]"
              }`}
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENARIO 2: RETURNING USER WITH COMPLETED BASELINE (Display Summary Card)
  // ---------------------------------------------------------------------------
  if (!startingPoint) {
    return null;
  }

  const activeInterests = startingPoint.activeInterests || [];

  return (
    <div
      id="starting-point"
      className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-5"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E6F3] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight">
              My Starting Point
            </h2>
            <p className="text-xs text-[#626987]">
              Your personalized baseline from exploration answers
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleStartEdit}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] hover:text-[#5342E8] transition-colors self-start sm:self-auto px-3 py-1.5 rounded-xl hover:bg-[#EDEAFF]"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Answers</span>
        </button>
      </div>

      {/* Grid: Where You Stand + Primary Focus + Active Interests */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Col 1: Where You Stand */}
        <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE]/60 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
            Where You Stand
          </span>
          <p className="text-xs sm:text-sm font-bold text-[#171A2B] leading-snug">
            {userProfile?.currentClass || viewModel.academicSummary || actualWhereYouStand}
          </p>
          <p className="text-[11px] text-[#626987]">
            Stage: {stageDisplayName}
          </p>
        </div>

        {/* Col 2: Primary Focus */}
        <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE]/60 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
            Primary Focus
          </span>
          <p className="text-xs sm:text-sm font-bold text-[#171A2B] leading-snug line-clamp-3">
            {startingPoint.primaryFocus}
          </p>
          <p className="text-[11px] text-[#059669] font-semibold pt-0.5">
            Status: {startingPoint.status}
          </p>
        </div>

        {/* Col 3: Active Interests */}
        <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE]/60 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
            Active Interests
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeInterests.length > 0 ? (
              activeInterests.map((interest) => (
                <span
                  key={interest}
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#DDD8FE] bg-white text-[#6757F5] shadow-2xs"
                >
                  {interest}
                </span>
              ))
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F4F3F8] text-[#474D66]">
                Exploring Interests
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Progressive Disclosure: Inspect full baseline answers */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#626987] hover:text-[#171A2B] transition-colors"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? "Hide detailed baseline" : "Inspect full baseline answers"}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {isExpanded && (
          <div className="mt-3 p-4 rounded-2xl bg-[#F4F3F8] border border-[#E8E6F3] space-y-3 text-xs text-[#31364F] animate-in fade-in duration-200">
            <span className="font-bold text-[#171A2B] block pb-0.5">
              Your Questionnaire Responses ({questions.length} Questions):
            </span>
            <div className="space-y-2.5">
              {questions.map((q) => {
                const normalized = normalizeSavedAnswers(startingPoint.answers);
                const answer = normalized[q.id] || startingPoint.answers?.[String(q.id)] || startingPoint.answers?.[q.id];
                return (
                  <div key={q.id} className="p-2.5 rounded-xl bg-white border border-[#E8E6F3] space-y-0.5">
                    <p className="font-bold text-[#171A2B] text-[11px]">
                      Q{q.id}. {q.title}
                    </p>
                    <p className="text-[11px] text-[#6757F5] font-semibold">
                      {answer || "Not answered"}
                    </p>
                  </div>
                );
              })}
            </div>

            {startingPoint.completedAt && (
              <p className="text-[10px] text-[#8C93AD] pt-1 border-t border-[#E8E6F3] italic">
                Completed on {new Date(startingPoint.completedAt).toLocaleDateString()}
                {startingPoint.updatedAt && startingPoint.updatedAt !== startingPoint.completedAt
                  ? ` • Updated ${new Date(startingPoint.updatedAt).toLocaleDateString()}`
                  : ""}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
