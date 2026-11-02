/**
 * NEXT MOVE AI V2 — STUDENT SETTINGS STORE
 * 
 * Manages local preferences, accessibility toggles, and prototype data exports.
 * Transparently separates local client capabilities from backend-dependent controls.
 */

import { type StudentSettingsState, type LearningPacePreference, type PrototypeExportPayload } from "../types";
import { studentProfileStore } from "@/features/student-home/services/profile-store";
import { activityEvidenceStore } from "@/features/validate-fit/services/evidence-store";
import { nextMoveStore } from "@/features/build-next-move/services/next-move-store";
import { type ActiveProject } from "@/features/build-next-move/types";
import { type TrialAttemptRecord } from "@/features/validate-fit/types";

type SettingsChangeListener = () => void;

class StudentSettingsStore {
  private state: StudentSettingsState = {
    allowCompanionMemory: true,
    allowPathwaysPersonalization: true,
    reducedMotion: false,
    highContrast: false,
    largeText: false,
    learningPace: "explorer",
    guardianObservationEnabled: true,
    guardianName: "Sunita Sharma",
    guardianEmail: "s.sharma@example.com",
    guardianConsentStatus: "granted",
  };

  private listeners: Set<SettingsChangeListener> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      this.loadFromStorage();
    }
  }

  private loadFromStorage() {
    try {
      const stored = sessionStorage.getItem("student_settings_preferences");
      if (stored) {
        const parsed = JSON.parse(stored);
        this.state = { ...this.state, ...parsed };
      }
    } catch {
      // Storage read fallback
    }
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("student_settings_preferences", JSON.stringify(this.state));
      } catch {
        // Storage write fallback
      }
    }
  }

  public getState(): StudentSettingsState {
    const profile = studentProfileStore.getActiveProfile();
    const stageId = profile.academicStageId;
    const isMinor = stageId === "classes-4-7" || stageId === "classes-8-10";

    return {
      ...this.state,
      guardianConsentStatus: isMinor ? "granted" : "not_required",
      guardianObservationEnabled: isMinor ? this.state.guardianObservationEnabled : false,
      guardianName: isMinor ? this.state.guardianName : undefined,
      guardianEmail: isMinor ? this.state.guardianEmail : undefined,
    };
  }

  public setCompanionMemory(enabled: boolean): void {
    this.state.allowCompanionMemory = enabled;
    this.saveToStorage();
    this.notify();
  }

  public setPathwaysPersonalization(enabled: boolean): void {
    this.state.allowPathwaysPersonalization = enabled;
    this.saveToStorage();
    this.notify();
  }

  public setReducedMotion(enabled: boolean): void {
    this.state.reducedMotion = enabled;
    if (typeof document !== "undefined") {
      if (enabled) {
        document.documentElement.classList.add("reduce-motion");
      } else {
        document.documentElement.classList.remove("reduce-motion");
      }
    }
    this.saveToStorage();
    this.notify();
  }

  public setHighContrast(enabled: boolean): void {
    this.state.highContrast = enabled;
    if (typeof document !== "undefined") {
      if (enabled) {
        document.documentElement.classList.add("high-contrast-mode");
      } else {
        document.documentElement.classList.remove("high-contrast-mode");
      }
    }
    this.saveToStorage();
    this.notify();
  }

  public setLearningPace(pace: LearningPacePreference): void {
    this.state.learningPace = pace;
    this.saveToStorage();
    this.notify();
  }

  /**
   * Generates a structured JSON payload of prototype session data.
   * Accurately labeled as a prototype export rather than a certified statutory export.
   */
  public generatePrototypeExport(): PrototypeExportPayload {
    const profile = studentProfileStore.getActiveProfile();
    const stageId = profile.academicStageId;
    const isMinor = stageId === "classes-4-7" || stageId === "classes-8-10";

    // Evidence from Flow 6
    const allAttempts: TrialAttemptRecord[] = activityEvidenceStore.getAllAttempts();
    const practisedCount = activityEvidenceStore.getPractisedCount();

    // Projects from Flow 7
    const projects: ActiveProject[] = nextMoveStore.getAllProjects();
    const currentMilestones: string[] = projects.flatMap((p: ActiveProject) =>
      p.steps.filter((s) => s.isCompleted).map((s) => s.title)
    );

    const savedPathways = profile.possibilities.map((p) => p.title);
    const interestsList = [
      ...profile.interests.selectedCategoryIds,
      ...profile.interests.selectedSubInterestIds,
    ];

    return {
      exportVersion: "NextMoveAI-V2-Prototype-Export-1.0",
      exportDate: new Date().toISOString(),
      disclaimer:
        "PROTOTYPE SESSION EXPORT ONLY: This file contains locally available student exploration data from the active browser session. It does NOT constitute a certified statutory export under the Digital Personal Data Protection (DPDP) Act or GDPR.",
      student: {
        name: "Student Explorer",
        stageId: profile.academicStageId,
        stageLabel: profile.academicStageId,
        institution: "Next Move AI Learning Sandbox",
        isMinor,
        primaryInterests: interestsList,
      },
      exploration: {
        savedPathwaysCount: savedPathways.length,
        savedPathways,
        evidenceCount: allAttempts.length,
        practisedCount,
      },
      activeProjects: {
        projectsCount: projects.length,
        currentMilestones,
      },
    };
  }

  /**
   * Triggers browser download of the prototype profile JSON.
   */
  public downloadPrototypeExport(): void {
    if (typeof window === "undefined") return;

    const exportData = this.generatePrototypeExport();
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `nextmove-prototype-profile-${exportData.student.stageId}-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  public subscribe(listener: SettingsChangeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch {
        // Safe listener dispatch
      }
    });
  }
}

export const studentSettingsStore = new StudentSettingsStore();
