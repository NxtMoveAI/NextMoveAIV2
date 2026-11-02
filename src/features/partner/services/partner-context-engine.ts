/**
 * NEXT MOVE AI V2 — FLOW 8: UNIFIED PARTNER CONTEXT ENGINE
 * 
 * Aggregates client-side state across Flows 1–7 into an isolated, readonly
 * context snapshot. This ensures the conversational partner is always strictly
 * grounded in what the student has actually verified, practised, and planned.
 */

import { studentProfileStore } from "@/features/student-home/services/profile-store";
import { formatAcademicSummary, formatClarityLabel } from "@/features/student-home/services/home-adapter";
import { savedPathwaysStore } from "@/features/explore/services/saved-store";
import { PATHWAY_CATALOG } from "@/features/explore/data/pathway-catalog";
import { activityEvidenceStore } from "@/features/validate-fit/services/evidence-store";
import { nextMoveStore } from "@/features/build-next-move/services/next-move-store";
import { DEMO_PERSONAS } from "@/features/student-home/data/demo-personas";
import { type PartnerContextSnapshot } from "../types";

export class PartnerContextEngine {
  /**
   * Assemble a unified context snapshot for the active student profile/persona.
   */
  public static assembleSnapshot(): PartnerContextSnapshot {
    const activeProfile = studentProfileStore.getActiveProfile();
    const confirmed = studentProfileStore.getConfirmedProfile();
    const isConfirmed = confirmed !== null;
    const activePersonaId = studentProfileStore.getActivePersonaId();
    const demoPersona = DEMO_PERSONAS[activePersonaId];

    // 1. Saved Pathways (Flow 5)
    const savedIds = savedPathwaysStore.getSavedIds();
    const savedPathways = savedIds
      .map((id) => {
        const item = PATHWAY_CATALOG.find((p) => p.id === id);
        if (!item) return null;
        return {
          id: item.id,
          title: item.title,
          stream: item.categoryLabel,
          category: item.categoryId,
        };
      })
      .filter((p): p is { id: string; title: string; stream: string; category: string } => p !== null);

    // 2. Practised Evidence (Flow 6)
    const attempts = activityEvidenceStore.getAllAttempts();
    const practisedEvidence = attempts.map((a) => ({
      trialId: a.trialId,
      trialTitle: a.trialTitle,
      competencyPractised: a.competencyPractised,
      evidenceStatus: a.evidenceStatus,
      completedAt: a.completedAt,
    }));

    // 3. Active Roadmap & Projects (Flow 7)
    const activeRoadmap = nextMoveStore.getActiveRoadmap();
    const activeProjects = nextMoveStore.getAllProjects().map((p) => {
      const completedSteps = p.steps.filter((s) => s.isCompleted).length;
      const progress = p.steps.length > 0 ? Math.round((completedSteps / p.steps.length) * 100) : 0;
      return {
        id: p.id,
        title: p.title,
        status: p.status,
        progressPercentage: progress,
      };
    });

    // 4. Epistemic Gaps (Declared unknowns)
    const epistemicGaps: string[] = [];
    if (practisedEvidence.length === 0) {
      epistemicGaps.push("No interactive trial evidence recorded yet");
    }
    if (savedPathways.length === 0) {
      epistemicGaps.push("No pathways currently saved in Explore");
    }
    epistemicGaps.push("No standardized external entrance score asserted");
    epistemicGaps.push("No subjective psychological profile asserted");

    const academicSummary = formatAcademicSummary(activeProfile.academicContext);
    const clarityLevelLabel = formatClarityLabel(activeProfile.clarity.clarityLevel);

    const totalMilestones = activeRoadmap
      ? activeRoadmap.phases.reduce((acc, phase) => acc + phase.milestones.length, 0)
      : 0;
    const completedMilestones = activeRoadmap
      ? activeRoadmap.phases.reduce(
          (acc, phase) => acc + phase.milestones.filter((m) => m.isCompleted).length,
          0
        )
      : 0;

    // Determine student name safely without inventing identity in production
    const studentName = isConfirmed
      ? "Student"
      : demoPersona?.name || "Guest Explorer";

    return {
      studentProfile: {
        profileId: activeProfile.profileId || "anonymous-student",
        studentName,
        academicStageId: activeProfile.academicStageId,
        academicSummary,
        streamOrBranch: academicSummary,
        curriculumOrBoard: undefined,
        clarityLevel: clarityLevelLabel,
        isConfirmedProfile: isConfirmed,
      },
      selfReportedInterests: activeProfile.interests.selectedSubInterestIds || [],
      savedPathways,
      practisedEvidence,
      activeRoadmap: activeRoadmap
        ? {
            id: activeRoadmap.id,
            title: activeRoadmap.title,
            totalMilestones,
            completedMilestones,
            pacing: activeRoadmap.pacing,
          }
        : null,
      activeProjects,
      epistemicGaps,
    };
  }
}
