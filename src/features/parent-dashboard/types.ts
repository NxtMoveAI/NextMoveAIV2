/**
 * NEXT MOVE AI V2 — PARENT DASHBOARD TYPES
 */

import { type AcademicStageId } from "@/data/landing-demo";

export interface ParentProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  relationship: "mother" | "father" | "legal_guardian";
}

export interface QualitativeObservation {
  id: string;
  activityTitle: string;
  category: string;
  completedDate: string;
  observationSummary: string;
  learningEvidenceType: "practical_trial" | "project_artifact" | "reflection";
}

export interface LinkedStudentSummary {
  id: string;
  name: string;
  academicStageId: AcademicStageId;
  academicStageLabel: string;
  gradeLevel: string;
  schoolName: string;
  age: number;
  isMinor: boolean;
  lastActiveFormatted: string;
  consentStatus: "granted" | "pending" | "required";
  
  // Learning & Exploration
  exploredPathways: Array<{
    id: string;
    title: string;
    cluster: string;
    stream: string;
  }>;
  curiosityTopics: string[];

  // Practical Progress
  practicalTrialsCount: number;
  observations: QualitativeObservation[];
  activeProjects: Array<{
    id: string;
    title: string;
    status: string;
    currentMilestone: string;
  }>;

  // Family Discussion Starters
  discussionPrompts: string[];
}

