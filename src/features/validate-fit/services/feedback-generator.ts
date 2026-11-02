/**
 * NEXT MOVE AI V2 — FLOW 6: SUPPORTIVE LEARNING FEEDBACK GENERATOR
 * 
 * Generates grounded, evidence-backed feedback following trial completion.
 * Strictly adheres to:
 * - "We don't decide careers; we enable clarity."
 * - No fake aptitude scores, no predictive fit percentages, no commercial guarantees.
 * - Affirming curiosity and factual completion while acknowledging remaining questions.
 */

import { type TrialActivity, type TrialReflection, type TrialFeedbackSummary } from "../types";

export class FeedbackGenerator {
  public generateSummary(
    trial: TrialActivity,
    reflection: TrialReflection
  ): TrialFeedbackSummary {
    const insights: string[] = [];

    // 1. Synthesize student enjoyment
    if (reflection.enjoyed.trim().length > 0) {
      insights.push(
        `You enjoyed "${reflection.enjoyed.trim()}", highlighting areas where your natural attention and engagement flow easily.`
      );
    }

    // 2. Synthesize what challenged them
    if (reflection.challenged.trim().length > 0) {
      insights.push(
        `You noticed friction around "${reflection.challenged.trim()}". Friction in a low-stakes trial is normal learning data, not a sign of inability.`
      );
    }

    // 3. Synthesize future interest intention
    if (reflection.wouldExploreAgain === "yes") {
      insights.push(
        `You expressed excitement to explore ${trial.categoryLabel} further. Investigating the full educational pathway is a great next step.`
      );
    } else if (reflection.wouldExploreAgain === "maybe") {
      insights.push(
        `You are keeping an open mind about this domain. Trying a different activity in an adjacent subject can help you compare.`
      );
    } else {
      insights.push(
        `You decided this particular task wasn't for you. Ruling out directions early saves months of mismatched commitment and brings real clarity.`
      );
    }

    // 4. Actionable Next Steps
    const nextActions: TrialFeedbackSummary["recommendedNextActions"] = [
      {
        id: "act_view_pathway",
        title: `Deep-Dive: ${trial.relatedPathwayTitle}`,
        description: `Review degree routes, entrance realities, and typical work environments in Flow 5 Explore.`,
        actionType: "explore_pathway",
        targetUrl: `/dashboard/student/explore?focus=${trial.relatedPathwayId}`,
      },
      {
        id: "act_view_ledger",
        title: "Review Your Evidence Ledger",
        description: "See your updated record of Practised activities versus Self-Reported capabilities.",
        actionType: "review_ledger",
        targetUrl: "/dashboard/student/growth?tab=ledger",
      },
    ];

    if (reflection.wouldExploreAgain === "not_for_me" || reflection.wouldExploreAgain === "maybe") {
      nextActions.unshift({
        id: "act_try_divergent",
        title: "Try an Experience Outside This Field",
        description: "Test a micro-challenge in a completely different domain to compare how it feels.",
        actionType: "try_divergent",
        targetUrl: "/dashboard/student/growth?filter=divergent",
      });
    }

    return {
      trialTitle: trial.title,
      completionPraise: `Well done on completing this hands-on trial! You invested genuine focus in experiencing what this field feels like in practice.`,
      evidenceGenerated: {
        status: "practised",
        competency: trial.competencyPractised,
        truthBoundary:
          "Recorded as 'Practised in Platform Challenge'. Demonstrates introductory real-world engagement; does not constitute a certified professional credential.",
      },
      reflectionInsights: insights,
      recommendedNextActions: nextActions,
    };
  }
}

export const feedbackGenerator = new FeedbackGenerator();
