/**
 * NEXT MOVE AI V2 — FLOW 7: BUILD MY NEXT MOVE STORE
 * 
 * Manages active projects, adaptive roadmaps, student growth goals, and portfolio artifacts.
 * 
 * Key Principles:
 * - Scoped per student profile / persona to ensure ZERO data leakage.
 * - Non-punitive: flexible pacing, milestone toggling, custom project creation.
 * - Reactive state updates for workspace and dashboard views.
 */

import {
  type ActiveProject,
  type StudentRoadmap,
  type StudentGrowthGoal,
  type ProjectEvidenceArtifact,
  type RoadmapPacing,
  type AcademicStageId,
} from "../types";
import { PROJECT_CATALOG } from "../data/project-catalog";
import { ROADMAP_CATALOG } from "../data/roadmap-catalog";

type StoreListener = () => void;

const BASE_STORAGE_KEY = "nextmove_flow7_state";

interface Flow7PersistedState {
  activeRoadmap: StudentRoadmap | null;
  projects: ActiveProject[];
  studentGoal: StudentGrowthGoal | null;
  postponedActionIds: string[];
}

class NextMoveStore {
  private activeScope: string = "anonymous";
  private studentStageId?: AcademicStageId;
  private state: Flow7PersistedState = {
    activeRoadmap: null,
    projects: [],
    studentGoal: null,
    postponedActionIds: [],
  };
  private listeners: Set<StoreListener> = new Set();
  private isHydrated: boolean = false;

  constructor() {
    this.hydrateFromStorage();
  }

  private getStorageKey(): string {
    return `${BASE_STORAGE_KEY}_${this.activeScope}`;
  }

  private hydrateFromStorage(): void {
    if (typeof window === "undefined") return;
    try {
      const stored = sessionStorage.getItem(this.getStorageKey());
      if (stored) {
        const parsed: Flow7PersistedState = JSON.parse(stored);
        this.state = {
          activeRoadmap: parsed.activeRoadmap || null,
          projects: Array.isArray(parsed.projects) ? parsed.projects : [],
          studentGoal: parsed.studentGoal || null,
          postponedActionIds: Array.isArray(parsed.postponedActionIds) ? parsed.postponedActionIds : [],
        };
      } else {
        this.state = {
          activeRoadmap: null,
          projects: [],
          studentGoal: null,
          postponedActionIds: [],
        };
      }
    } catch {
      this.state = {
        activeRoadmap: null,
        projects: [],
        studentGoal: null,
        postponedActionIds: [],
      };
    }
    this.isHydrated = true;
  }

  private persistToStorage(): void {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(this.getStorageKey(), JSON.stringify(this.state));
    } catch {
      // Storage write fallback
    }
  }

  public setProfileScope(scope: string, stageId?: AcademicStageId): void {
    const normalized = scope || "anonymous";
    if (this.activeScope === normalized && this.studentStageId === stageId && this.isHydrated) {
      return;
    }
    this.activeScope = normalized;
    this.studentStageId = stageId;
    this.hydrateFromStorage();

    // If no roadmap exists yet for this profile, initialize stage default
    if (!this.state.activeRoadmap) {
      this.initializeDefaultRoadmap(stageId);
    }

    this.notify();
  }

  private initializeDefaultRoadmap(stageId?: AcademicStageId): void {
    const targetStage = stageId || this.studentStageId;
    const defaultTemplate = targetStage
      ? ROADMAP_CATALOG.find((r) => r.stageSuitability.includes(targetStage)) || ROADMAP_CATALOG[0]
      : ROADMAP_CATALOG[0];

    if (defaultTemplate) {
      this.state.activeRoadmap = JSON.parse(JSON.stringify(defaultTemplate));
      this.persistToStorage();
    }
  }

  public subscribe(listener: StoreListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error("Error in NextMoveStore listener", err);
      }
    });
  }

  // ===========================================================================
  // ROADMAP ACTIONS
  // ===========================================================================

  public getActiveRoadmap(): StudentRoadmap | null {
    if (!this.isHydrated) this.hydrateFromStorage();
    if (!this.state.activeRoadmap) {
      this.initializeDefaultRoadmap(this.studentStageId);
    }
    return this.state.activeRoadmap;
  }

  public toggleMilestone(phaseId: string, milestoneId: string): void {
    if (!this.isHydrated) this.hydrateFromStorage();
    if (!this.state.activeRoadmap) return;

    this.state.activeRoadmap.phases.forEach((phase) => {
      if (phase.id === phaseId) {
        phase.milestones.forEach((ms) => {
          if (ms.id === milestoneId) {
            ms.isCompleted = !ms.isCompleted;
            ms.completedAt = ms.isCompleted ? new Date().toISOString() : undefined;
          }
        });
      }
    });

    this.state.activeRoadmap.updatedAt = new Date().toISOString();
    this.persistToStorage();
    this.notify();
  }

  public setRoadmapPacing(pacing: RoadmapPacing): void {
    if (!this.isHydrated) this.hydrateFromStorage();
    if (!this.state.activeRoadmap) return;

    this.state.activeRoadmap.pacing = pacing;
    this.state.activeRoadmap.updatedAt = new Date().toISOString();
    this.persistToStorage();
    this.notify();
  }

  public switchRoadmapTrack(newRoadmapId: string): StudentRoadmap | null {
    if (!this.isHydrated) this.hydrateFromStorage();
    const found = ROADMAP_CATALOG.find((r) => r.id === newRoadmapId);
    if (!found) return null;

    this.state.activeRoadmap = JSON.parse(JSON.stringify(found));
    this.persistToStorage();
    this.notify();
    return this.state.activeRoadmap;
  }

  public regenerateRoadmap(customFocus: string): StudentRoadmap | null {
    if (!this.isHydrated) this.hydrateFromStorage();
    if (!this.state.activeRoadmap) return null;

    // Reset milestones or adapt broad objective to new focus
    this.state.activeRoadmap.broadObjective = customFocus.trim() || this.state.activeRoadmap.broadObjective;
    this.state.activeRoadmap.updatedAt = new Date().toISOString();
    this.persistToStorage();
    this.notify();
    return this.state.activeRoadmap;
  }

  // ===========================================================================
  // PROJECT LIFECYCLE ACTIONS
  // ===========================================================================

  public getAllProjects(): ActiveProject[] {
    if (!this.isHydrated) this.hydrateFromStorage();
    return [...this.state.projects];
  }

  public getActiveProjects(): ActiveProject[] {
    return this.getAllProjects().filter((p) => p.status === "in_progress");
  }

  public getCompletedProjects(): ActiveProject[] {
    return this.getAllProjects().filter((p) => p.status === "completed");
  }

  public startProjectFromTemplate(templateId: string): ActiveProject {
    if (!this.isHydrated) this.hydrateFromStorage();
    const template = PROJECT_CATALOG.find((t) => t.id === templateId);

    const newProject: ActiveProject = {
      id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      templateId,
      title: template ? template.title : "Custom Project",
      problemStatement: template ? template.problemStatement : "Self-directed exploratory inquiry.",
      stageId: template?.stageSuitability[0] || this.studentStageId || "classes-11-12",
      categoryId: template?.categoryId || "technology",
      categoryLabel: template?.categoryLabel || "General Discovery",
      status: "in_progress",
      steps: template
        ? template.starterSteps.map((s, idx) => ({
            id: `step_${idx + 1}`,
            stepNumber: idx + 1,
            title: s.title,
            instruction: s.instruction,
            guidanceTip: s.guidanceTip,
            isCompleted: false,
          }))
        : [
            {
              id: "step_1",
              stepNumber: 1,
              title: "Define Inquiry & Outline",
              instruction: "Draft core research questions and materials needed.",
              isCompleted: false,
            },
            {
              id: "step_2",
              stepNumber: 2,
              title: "Build Prototype / Conduct Analysis",
              instruction: "Produce initial draft, code, model, or notes.",
              isCompleted: false,
            },
            {
              id: "step_3",
              stepNumber: 3,
              title: "Review & Document Reflection",
              instruction: "Synthesize findings and assess learning friction.",
              isCompleted: false,
            },
          ],
      artifacts: [],
      startedAt: new Date().toISOString(),
      isSyntheticFixture: false,
    };

    this.state.projects.unshift(newProject);
    this.persistToStorage();
    this.notify();
    return newProject;
  }

  public createCustomProject(params: {
    title: string;
    problemStatement: string;
    categoryLabel: string;
    steps: string[];
  }): ActiveProject {
    if (!this.isHydrated) this.hydrateFromStorage();

    const newProject: ActiveProject = {
      id: `proj_custom_${Date.now()}`,
      title: params.title.trim(),
      problemStatement: params.problemStatement.trim(),
      stageId: this.studentStageId || "classes-11-12",
      categoryId: "analysis_problem_solving",
      categoryLabel: params.categoryLabel.trim() || "Independent Inquiry",
      status: "in_progress",
      steps: params.steps.map((text, idx) => ({
        id: `step_${idx + 1}`,
        stepNumber: idx + 1,
        title: text.trim(),
        instruction: "Self-guided execution milestone.",
        isCompleted: false,
      })),
      artifacts: [],
      startedAt: new Date().toISOString(),
      isSyntheticFixture: false,
    };

    this.state.projects.unshift(newProject);
    this.persistToStorage();
    this.notify();
    return newProject;
  }

  public updateProjectStep(
    projectId: string,
    stepId: string,
    updates: { isCompleted?: boolean; workNotes?: string }
  ): void {
    if (!this.isHydrated) this.hydrateFromStorage();
    const proj = this.state.projects.find((p) => p.id === projectId);
    if (!proj) return;

    const step = proj.steps.find((s) => s.id === stepId);
    if (!step) return;

    if (updates.isCompleted !== undefined) {
      step.isCompleted = updates.isCompleted;
      step.completedAt = updates.isCompleted ? new Date().toISOString() : undefined;
    }
    if (updates.workNotes !== undefined) {
      step.workNotes = updates.workNotes;
    }

    this.persistToStorage();
    this.notify();
  }

  public attachArtifact(
    projectId: string,
    artifact: Omit<ProjectEvidenceArtifact, "id" | "addedAt">
  ): ProjectEvidenceArtifact | null {
    if (!this.isHydrated) this.hydrateFromStorage();
    const proj = this.state.projects.find((p) => p.id === projectId);
    if (!proj) return null;

    const newArtifact: ProjectEvidenceArtifact = {
      id: `art_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      ...artifact,
      addedAt: new Date().toISOString(),
    };

    proj.artifacts.push(newArtifact);
    this.persistToStorage();
    this.notify();
    return newArtifact;
  }

  public completeProject(
    projectId: string,
    reflection: ActiveProject["reflection"]
  ): ActiveProject | null {
    if (!this.isHydrated) this.hydrateFromStorage();
    const proj = this.state.projects.find((p) => p.id === projectId);
    if (!proj) return null;

    proj.status = "completed";
    proj.completedAt = new Date().toISOString();
    proj.reflection = reflection;

    // Mark remaining steps as completed
    proj.steps.forEach((s) => {
      s.isCompleted = true;
      if (!s.completedAt) s.completedAt = new Date().toISOString();
    });

    this.persistToStorage();
    this.notify();
    return proj;
  }

  // ===========================================================================
  // STUDENT GROWTH GOALS
  // ===========================================================================

  public getStudentGoal(): StudentGrowthGoal | null {
    if (!this.isHydrated) this.hydrateFromStorage();
    return this.state.studentGoal;
  }

  public setStudentGoal(goal: Omit<StudentGrowthGoal, "id" | "createdAt">): StudentGrowthGoal {
    if (!this.isHydrated) this.hydrateFromStorage();
    const newGoal: StudentGrowthGoal = {
      id: `goal_${Date.now()}`,
      ...goal,
      createdAt: new Date().toISOString(),
    };
    this.state.studentGoal = newGoal;
    this.persistToStorage();
    this.notify();
    return newGoal;
  }

  public postponeAction(actionId: string): void {
    if (!this.isHydrated) this.hydrateFromStorage();
    if (!this.state.postponedActionIds.includes(actionId)) {
      this.state.postponedActionIds.push(actionId);
      this.persistToStorage();
      this.notify();
    }
  }

  public isActionPostponed(actionId: string): boolean {
    if (!this.isHydrated) this.hydrateFromStorage();
    return this.state.postponedActionIds.includes(actionId);
  }

  public clearAll(): void {
    this.state = {
      activeRoadmap: null,
      projects: [],
      studentGoal: null,
      postponedActionIds: [],
    };
    this.persistToStorage();
    this.notify();
  }
}

export const nextMoveStore = new NextMoveStore();
