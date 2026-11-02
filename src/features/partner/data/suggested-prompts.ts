/**
 * NEXT MOVE AI V2 — FLOW 8: SUGGESTED CONVERSATION PROMPTS
 * 
 * Contextual, age-appropriate conversation starters tailored to each of the
 * educational stages, plus cross-stage context triggers.
 */

import { type AcademicStageId } from "@/data/landing-demo";
import { type SuggestedPrompt } from "../types";

export const COHORT_SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  // =========================================================================
  // 1. CLASSES 4–7 (Curiosity & Exploration)
  // =========================================================================
  {
    id: "c47_curiosity_starter",
    label: "Explore a fun science topic",
    promptText: "Can you help me explore a fun science topic or hobby project based on what I like?",
    category: "next_action",
    applicableStages: ["classes-4-7"],
  },
  {
    id: "c47_explain_practised",
    label: "What did I practise today?",
    promptText: "Can you explain what I practised in my interactive challenge in simple words?",
    category: "skill_evidence",
    applicableStages: ["classes-4-7"],
  },
  {
    id: "c47_explore_careers",
    label: "What do space scientists do?",
    promptText: "What does an astronomer or space scientist actually do day-to-day?",
    category: "pathway_compare",
    applicableStages: ["classes-4-7"],
  },

  // =========================================================================
  // 2. CLASSES 8–10 (Stream Discovery & Subject Alignment)
  // =========================================================================
  {
    id: "c810_stream_discovery",
    label: "Science vs Commerce vs Arts",
    promptText: "How should I think about choosing between Science, Commerce, and Arts after Class 10?",
    category: "pathway_compare",
    applicableStages: ["classes-8-10"],
  },
  {
    id: "c810_skill_sampling",
    label: "How do I sample different subjects?",
    promptText: "What small trial or project can I try to see if I actually enjoy coding or business?",
    category: "skill_evidence",
    applicableStages: ["classes-8-10"],
  },
  {
    id: "c810_next_milestone",
    label: "What is my next best step?",
    promptText: "Based on my saved pathways and interests, what should my focus be this month?",
    category: "next_action",
    applicableStages: ["classes-8-10"],
  },

  // =========================================================================
  // 3. CLASSES 11–12 (Entrance Exam Realism & Backup Strategy)
  // =========================================================================
  {
    id: "c1112_compare_pathways",
    label: "Compare my saved pathways",
    promptText: "Can you compare my saved career pathways in terms of entrance exams, time commitment, and backup options?",
    category: "pathway_compare",
    applicableStages: ["classes-11-12"],
  },
  {
    id: "c1112_exam_stress",
    label: "Balancing board exams & prep",
    promptText: "How can I balance my board exam syllabus with competitive entrance prep without burning out?",
    category: "exam_balance",
    applicableStages: ["classes-11-12"],
  },
  {
    id: "c1112_evidence_reality",
    label: "Review my evidence vs interests",
    promptText: "What is the difference between my self-reported interests and my actual practised evidence so far?",
    category: "skill_evidence",
    applicableStages: ["classes-11-12"],
  },
  {
    id: "c1112_next_action",
    label: "Plan my next roadmap action",
    promptText: "Look at my active roadmap. What is the most realistic next milestone I can complete this week?",
    category: "next_action",
    applicableStages: ["classes-11-12"],
  },

  // =========================================================================
  // 4. DIPLOMA (Practical Skills & Lateral Entry)
  // =========================================================================
  {
    id: "dip_lateral_vs_job",
    label: "Lateral B.Tech vs Industry Job",
    promptText: "Should I prepare for lateral entry into B.Tech or start with a junior engineer/technician apprenticeship?",
    category: "pathway_compare",
    applicableStages: ["diploma"],
  },
  {
    id: "dip_practical_skills",
    label: "Highlight my practical skills",
    promptText: "How can I showcase my laboratory and troubleshooting evidence to recruiters or colleges?",
    category: "skill_evidence",
    applicableStages: ["diploma"],
  },
  {
    id: "dip_project_advice",
    label: "Next step for my diploma project",
    promptText: "Help me break down my technical project into practical verification steps.",
    category: "project_help",
    applicableStages: ["diploma"],
  },

  // =========================================================================
  // 5. DEGREE ENGINEERING / UNDERGRADUATE (Portfolio, Internships & Depth)
  // =========================================================================
  {
    id: "deg_portfolio_review",
    label: "What portfolio gaps do I have?",
    promptText: "Looking at my active projects and practised skills, what tangible evidence is missing from my portfolio?",
    category: "skill_evidence",
    applicableStages: ["degree-engineering"],
  },
  {
    id: "deg_internship_timeline",
    label: "When should I apply for internships?",
    promptText: "What is the timeline for summer research internships vs industry engineering internships?",
    category: "next_action",
    applicableStages: ["degree-engineering"],
  },
  {
    id: "deg_compare_domains",
    label: "Software vs Data vs Research",
    promptText: "Can you help me evaluate the trade-offs between core software engineering, data science, and academic research?",
    category: "pathway_compare",
    applicableStages: ["degree-engineering"],
  },

  // =========================================================================
  // 6. FINAL YEAR GRADUATES & BEYOND (Transitions & Independent Execution)
  // =========================================================================
  {
    id: "grad_transition_plan",
    label: "Transition into a new domain",
    promptText: "I want to transition from my current background into a new sector. What is a grounded transition roadmap?",
    category: "pathway_compare",
    applicableStages: ["final-year-grad"],
  },
  {
    id: "grad_project_execution",
    label: "Accelerate my active venture/project",
    promptText: "How do I validate my project concept with genuine user feedback before writing more code?",
    category: "project_help",
    applicableStages: ["final-year-grad"],
  },
  {
    id: "grad_fellowships_vs_jobs",
    label: "Fellowships vs direct job search",
    promptText: "How do fellowship programs like LAMP or research grants compare to corporate entry-level roles?",
    category: "next_action",
    applicableStages: ["final-year-grad"],
  },
];

/**
 * Filter suggested prompts by student stage, with graceful fallback.
 */
export function getSuggestedPromptsForStage(stageId?: AcademicStageId): SuggestedPrompt[] {
  if (!stageId) {
    return COHORT_SUGGESTED_PROMPTS.slice(0, 4);
  }
  const matched = COHORT_SUGGESTED_PROMPTS.filter(
    (p) => !p.applicableStages || p.applicableStages.includes(stageId)
  );
  if (matched.length > 0) {
    return matched;
  }
  return COHORT_SUGGESTED_PROMPTS.slice(0, 4);
}
