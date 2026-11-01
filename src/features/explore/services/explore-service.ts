/**
 * NEXT MOVE AI V2 — EXPLORE SERVICE
 * 
 * Epistemic recommendation and filtering engine for educational and career pathways.
 * Strictly enforces truth in signaling:
 * - Differentiates self-reported interests from demonstrated mini-activity evidence.
 * - Prevents fake match percentages, rankings, or predictive career locks.
 * - Enforces child data safety (Classes 4–7 strictly curiosity themes).
 */

import { type AcademicStageId } from "@/data/landing-demo";
import { type StudentIntelligenceProfile } from "@/features/onboarding/schemas/types";
import { MICRO_ACTIVITIES_CATALOG } from "@/features/onboarding/data/activities";
import { PATHWAY_CATALOG } from "../data/pathway-catalog";
import {
  type Pathway,
  type PathwayProvenance,
  type ProvenanceSignal,
  type ExploreFilters,
} from "../types";

export class ExploreService {
  /**
   * Retrieve a single pathway by its unique identifier
   */
  public getPathwayById(id: string): Pathway | undefined {
    return PATHWAY_CATALOG.find((p) => p.id === id);
  }

  /**
   * Retrieve all pathways in the catalogue
   */
  public getAllPathways(): Pathway[] {
    return [...PATHWAY_CATALOG];
  }

  /**
   * Retrieve stage-adaptive pathways based on the student profile
   */
  public getPathwaysForProfile(
    profile: StudentIntelligenceProfile | null
  ): {
    primaryPathways: Pathway[];
    divergentPathways: Pathway[];
    undecidedPathways: Pathway[];
  } {
    if (!profile) {
      // Anonymous visitor / no confirmed profile
      return {
        primaryPathways: PATHWAY_CATALOG,
        divergentPathways: [],
        undecidedPathways: [],
      };
    }

    const stageId = profile.academicStageId;
    const selectedCategories = profile.interests?.selectedCategoryIds || [];
    const isUndecided =
      profile.interests?.isStillExploring ||
      profile.clarity?.clarityLevel === "very_confused" ||
      profile.clarity?.clarityLevel === "still_exploring";

    // Filter by academic stage
    const stagePathways = PATHWAY_CATALOG.filter((p) =>
      p.stageSuitability.includes(stageId)
    );

    // Primary: matching selected interest categories
    let primary: Pathway[] = [];
    if (isUndecided || selectedCategories.length === 0) {
      // If student is still exploring, show all stage-appropriate pathways
      primary = stagePathways;
    } else {
      primary = stagePathways.filter((p) =>
        selectedCategories.includes(p.categoryId)
      );
      // If strict filter yielded fewer than 2 items, blend in related stage pathways
      if (primary.length < 2) {
        const remaining = stagePathways.filter((p) => !primary.includes(p));
        primary = [...primary, ...remaining];
      }
    }

    // Divergent: pathways strictly OUTSIDE selected categories
    const divergent = stagePathways.filter(
      (p) => !selectedCategories.includes(p.categoryId)
    );

    // Undecided / Broad exploration pathways
    const undecided = stagePathways.filter(
      (p) => p.type === "exploratory_general" || p.tags.includes("Still Exploring")
    );

    return {
      primaryPathways: primary,
      divergentPathways: divergent,
      undecidedPathways: undecided,
    };
  }

  /**
   * Generate transparent provenance explanation for why a pathway is presented
   */
  public getProvenanceForPathway(
    pathway: Pathway,
    profile: StudentIntelligenceProfile | null
  ): PathwayProvenance {
    if (!profile) {
      return {
        pathwayId: pathway.id,
        primaryReason: "Presented from the global catalogue for prototype exploration.",
        signals: [
          {
            type: "outside_interest_discovery",
            label: "Open Exploration Mode",
            description: "No confirmed student profile detected in the active session.",
            truthBoundary: "Viewing general pathway possibilities without personal profile signals.",
          },
        ],
        epistemicDisclaimer:
          "Next Move AI does not decide careers; we enable clarity. This pathway is an educational possibility to investigate, not an automated prediction.",
      };
    }

    const signals: ProvenanceSignal[] = [];
    const stageId = profile.academicStageId;
    const isStageMatch = pathway.stageSuitability.includes(stageId);
    const isInterestMatch =
      profile.interests?.selectedCategoryIds?.includes(pathway.categoryId) ?? false;
    const isStillExploring = profile.interests?.isStillExploring ?? false;
    const hasActivityProof =
      profile.activityAttempt?.attempted &&
      profile.activityAttempt?.isCorrect;

    // 1. Stage context signal
    if (isStageMatch) {
      signals.push({
        type: "academic_stage_context",
        label: `Adaptive to ${this.getStageHumanLabel(stageId)}`,
        description: `This pathway matches the academic and developmental milestones of your current education stage.`,
        truthBoundary: "Academic stage verified from your confirmed onboarding profile.",
      });
    }

    // 2. Interest signal (honest self-reported distinction)
    if (isInterestMatch) {
      signals.push({
        type: "self_reported_interest",
        label: `Self-Reported Interest in ${pathway.categoryLabel}`,
        description: `You selected ${pathway.categoryLabel} during Step D of onboarding.`,
        truthBoundary:
          "Represents your self-reported curiosity; this is not an evaluated aptitude score or intelligence ranking.",
      });
    }

    // 3. Mini-challenge demonstration signal
    if (hasActivityProof) {
      const activity = MICRO_ACTIVITIES_CATALOG.find(
        (a) => a.id === profile.activityAttempt?.activityId
      );
      const activityTitle = activity ? activity.title : "Introductory Micro-Challenge";
      const competency = activity ? activity.demonstratedCompetency : "problem-solving logic";

      signals.push({
        type: "practised_activity_evidence",
        label: `Demonstrated Mini-Challenge Practice (${competency})`,
        description: `You completed '${activityTitle}', demonstrating initial practice in ${competency}.`,
        truthBoundary:
          "Demonstrated evidence from one short onboarding challenge; this does NOT constitute an evaluated vocational aptitude score or career lock.",
      });
    }

    // 4. Undecided exploration signal
    if (isStillExploring) {
      signals.push({
        type: "undecided_exploratory_mode",
        label: "Broad Exploration Setting",
        description: `Your profile indicates you are keeping your options open, so we include interdisciplinary and foundational pathways.`,
        truthBoundary:
          "Surfaced to help you discover new fields before narrowing your focus.",
      });
    }

    // Primary summary text
    let primaryReason = "";
    if (isInterestMatch) {
      primaryReason = `Grounded in your stated interest in ${pathway.categoryLabel} and your ${this.getStageHumanLabel(stageId)} context.`;
    } else if (isStillExploring) {
      primaryReason = `Included as a broad exploratory avenue to help you compare educational directions freely.`;
    } else {
      primaryReason = `Curated for ${this.getStageHumanLabel(stageId)} students to encourage discovering directions outside routine choices.`;
    }

    return {
      pathwayId: pathway.id,
      primaryReason,
      signals,
      epistemicDisclaimer:
        "Next Move AI does not predict careers or assign match scores. We present real pathways, day-in-the-life realities, and practical trials so you can evaluate fit for yourself.",
    };
  }

  /**
   * Filter pathways by active search query, category, stage, and type
   */
  public filterPathways(
    pathways: Pathway[],
    filters: ExploreFilters
  ): Pathway[] {
    return pathways.filter((pathway) => {
      // 1. Stage filter
      if (
        filters.selectedStage !== "all" &&
        !pathway.stageSuitability.includes(filters.selectedStage)
      ) {
        return false;
      }

      // 2. Category filter
      if (
        filters.selectedCategory !== "all" &&
        pathway.categoryId !== filters.selectedCategory
      ) {
        return false;
      }

      // 3. Pathway Type filter
      if (
        filters.selectedType !== "all" &&
        pathway.type !== filters.selectedType
      ) {
        return false;
      }

      // 4. Search query
      if (filters.searchQuery.trim().length > 0) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = pathway.title.toLowerCase().includes(query);
        const matchesSummary = pathway.headlineSummary.toLowerCase().includes(query);
        const matchesCategory = pathway.categoryLabel.toLowerCase().includes(query);
        const matchesTags = pathway.tags.some((t) => t.toLowerCase().includes(query));
        const matchesSkills = pathway.foundationalSkills.some((s) =>
          s.name.toLowerCase().includes(query)
        );

        if (
          !matchesTitle &&
          !matchesSummary &&
          !matchesCategory &&
          !matchesTags &&
          !matchesSkills
        ) {
          return false;
        }
      }

      return true;
    });
  }

  private getStageHumanLabel(stageId: AcademicStageId): string {
    switch (stageId) {
      case "classes-4-7":
        return "Classes 4–7";
      case "classes-8-10":
        return "Classes 8–10";
      case "classes-11-12":
        return "Classes 11–12";
      case "diploma":
        return "Diploma / Polytechnic";
      case "degree-engineering":
        return "Degree & Engineering";
      case "final-year-grad":
        return "Final-Year & Graduate";
      default:
        return "Student";
    }
  }
}

export const exploreService = new ExploreService();

