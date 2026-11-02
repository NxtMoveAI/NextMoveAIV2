/**
 * NEXT MOVE AI V2 — FLOW 7: CONTINUOUS GROWTH ENGINE
 * 
 * Recommends single high-leverage next action grounded strictly in:
 * - Confirmed academic profile & stream
 * - Selected interests & Flow 5 saved pathways
 * - Real Flow 6 practical attempts & practised competencies
 * - Active project milestones
 * 
 * Epistemic mandate:
 * - "We don't decide careers; we enable clarity."
 * - Zero artificial urgency countdowns or predictive fit scores.
 * - Every suggested action includes a grounded 'whySuggested' explanation.
 */

import { type StudentIntelligenceProfile } from "@/features/onboarding/schemas/types";
import { type TrialAttemptRecord } from "@/features/validate-fit/types";
import {
  type NextMoveRecommendation,
  type ActiveProject,
  type StudentRoadmap,
} from "../types";
import { PROJECT_CATALOG } from "../data/project-catalog";

export class ContinuousGrowthEngine {
  public computeNextMove(params: {
    profile: StudentIntelligenceProfile | null;
    activeProjects: ActiveProject[];
    activeRoadmap: StudentRoadmap | null;
    trialAttempts: TrialAttemptRecord[];
    savedPathwayCount: number;
    isActionPostponed: (id: string) => boolean;
  }): {
    primaryRecommendation: NextMoveRecommendation;
    alternatives: NextMoveRecommendation[];
  } {
    const {
      profile,
      activeProjects,
      activeRoadmap,
      trialAttempts,
      isActionPostponed,
    } = params;

    const stageId = profile?.academicStageId || "classes-11-12";
    const completedAttempts = trialAttempts.filter((a) => a.status === "completed");
    const activeProject = activeProjects.find((p) => p.status === "in_progress");

    const pool: NextMoveRecommendation[] = [];

    // 1. If an active project is in progress and has uncompleted steps, prioritize continuing it
    if (activeProject) {
      const nextStep = activeProject.steps.find((s) => !s.isCompleted);
      if (nextStep) {
        pool.push({
          id: `act_cont_proj_${activeProject.id}_${nextStep.id}`,
          title: `Continue Project: ${activeProject.title} (Step ${nextStep.stepNumber})`,
          description: nextStep.instruction,
          actionCategory: "continue_project",
          whySuggested: `You started "${activeProject.title}" and Step ${nextStep.stepNumber} (${nextStep.title}) is your next milestone.`,
          supportingContext: `Active Project in ${activeProject.categoryLabel}`,
          estimatedMinutes: 25,
          targetTab: "projects",
          targetEntityId: activeProject.id,
          status: "active",
        });
      }
    }

    // 2. If active roadmap has pending milestones in the current phase
    if (activeRoadmap) {
      const currentPhase = activeRoadmap.phases.find((p) => p.isCurrent) || activeRoadmap.phases[0];
      if (currentPhase) {
        const nextMilestone = currentPhase.milestones.find((m) => !m.isCompleted);
        if (nextMilestone) {
          pool.push({
            id: `act_ms_${nextMilestone.id}`,
            title: `Roadmap Milestone: ${nextMilestone.title}`,
            description: nextMilestone.description,
            actionCategory: "explore_roadmap",
            whySuggested: `Aligned with your ${activeRoadmap.title} (${currentPhase.title}) to build practical experience.`,
            supportingContext: `${currentPhase.growthObjective}`,
            estimatedMinutes: nextMilestone.estimatedHours * 30, // flexible representation
            targetTab: "roadmaps",
            targetEntityId: nextMilestone.id,
            status: "active",
          });
        }
      }
    }

    // 3. Stage-adaptive starter project recommendation
    const recommendedTemplate =
      PROJECT_CATALOG.find((t) => t.stageSuitability.includes(stageId)) ||
      PROJECT_CATALOG[0];

    if (recommendedTemplate) {
      pool.push({
        id: `act_start_${recommendedTemplate.id}`,
        title: `Launch Starter Project: ${recommendedTemplate.title}`,
        description: recommendedTemplate.subtitle,
        actionCategory: "start_project",
        whySuggested: `Suggested for your ${stageId} stage to build tangible portfolio evidence in ${recommendedTemplate.categoryLabel}.`,
        supportingContext: recommendedTemplate.whatThisClarifies,
        estimatedMinutes: 30,
        targetTab: "projects",
        targetEntityId: recommendedTemplate.id,
        status: "active",
      });
    }

    // 4. Experience / Practical Trial recommendation (connecting Flow 6)
    if (completedAttempts.length === 0) {
      pool.push({
        id: "act_sample_flow6_trial",
        title: "Test an Interactive Real-World Scenario in Flow 6",
        description: "Experience 15 minutes of low-stakes practical decision-making without test anxiety.",
        actionCategory: "try_experience",
        whySuggested: "Hands-on trials provide authentic evidence of what daily problem solving in this field feels like.",
        supportingContext: "Validate Fit & Evidence Ledger",
        estimatedMinutes: 15,
        targetTab: "experiences",
        status: "active",
      });
    } else {
      pool.push({
        id: "act_review_evidence",
        title: "Review Your Evidence Ledger & Next Horizons",
        description: `You have completed ${completedAttempts.length} hands-on challenges. See what directions remain unassessed.`,
        actionCategory: "review_evidence",
        whySuggested: "Keeping track of demonstrated practice clarifies which new fields to test next.",
        supportingContext: "Evidence Ledger Review",
        estimatedMinutes: 10,
        targetTab: "experiences",
        status: "active",
      });
    }

    // Filter out postponed items if non-postponed alternatives exist
    const nonPostponed = pool.filter((item) => !isActionPostponed(item.id));
    const activeCandidates = nonPostponed.length > 0 ? nonPostponed : pool;

    const primary = activeCandidates[0];
    const alternatives = activeCandidates.slice(1);

    return {
      primaryRecommendation: primary,
      alternatives,
    };
  }
}

export const continuousGrowthEngine = new ContinuousGrowthEngine();

