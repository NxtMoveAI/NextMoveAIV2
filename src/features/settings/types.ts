/**
 * NEXT MOVE AI V2 — STUDENT SETTINGS TYPES
 */

import { type AcademicStageId } from "@/data/landing-demo";

export type LearningPacePreference = "explorer" | "builder" | "deep_dive";

export interface StudentSettingsState {
  // Privacy & AI Memory Controls (Local)
  allowCompanionMemory: boolean;
  allowPathwaysPersonalization: boolean;
  
  // Accessibility Controls (Local)
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;

  // Flexible Growth & Pace (Task D)
  learningPace: LearningPacePreference;

  // Guardian Visibility (Read-only simulation)
  guardianObservationEnabled: boolean;
  guardianName?: string;
  guardianEmail?: string;
  guardianConsentStatus: "granted" | "pending" | "not_required";
}

export interface PrototypeExportPayload {
  exportVersion: string;
  exportDate: string;
  disclaimer: string;
  student: {
    name?: string;
    stageId: AcademicStageId;
    stageLabel: string;
    institution?: string;
    isMinor: boolean;
    primaryInterests: string[];
  };
  exploration: {
    savedPathwaysCount: number;
    savedPathways: string[];
    evidenceCount: number;
    practisedCount: number;
  };
  activeProjects: {
    projectsCount: number;
    currentMilestones: string[];
  };
}

