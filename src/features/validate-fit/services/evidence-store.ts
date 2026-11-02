/**
 * NEXT MOVE AI V2 — FLOW 6: ACTIVITY EVIDENCE & TRIAL PROGRESS STORE
 * 
 * Manages interactive trial attempts, reflections, and evidence records.
 * 
 * Key Principles:
 * - Scoped per student profile / persona to ensure ZERO data leakage.
 * - Factual tracking: distinguishes Attempted from Practised.
 * - Never claims automatic verified competence.
 * - Reactive state updates for UI components and Student Home integration.
 */

import { type TrialActivity, type TrialAttemptRecord, type TrialReflection, type EvidenceStatus } from "../types";

type StoreListener = () => void;

const BASE_STORAGE_KEY = "nextmove_trial_evidence";

class ActivityEvidenceStore {
  private activeScope: string = "anonymous";
  private studentStageId?: string;
  private attempts: Map<string, TrialAttemptRecord> = new Map();
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
        const parsed: TrialAttemptRecord[] = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          this.attempts.clear();
          parsed.forEach((record) => {
            // Child safety check: never load adult trials into Classes 4-7
            if (this.studentStageId === "classes-4-7" && record.stageId !== "classes-4-7") {
              return;
            }
            this.attempts.set(record.trialId, record);
          });
        } else {
          this.attempts.clear();
        }
      } else {
        this.attempts.clear();
      }
    } catch {
      this.attempts.clear();
    }
    this.isHydrated = true;
  }

  private persistToStorage(): void {
    if (typeof window === "undefined") return;
    try {
      const records = Array.from(this.attempts.values());
      sessionStorage.setItem(this.getStorageKey(), JSON.stringify(records));
    } catch {
      // Storage write fallback
    }
  }

  /**
   * Set active student profile scope (student ID, persona ID, or "anonymous").
   * Automatically isolates trial history and prevents cross-profile leakage.
   */
  public setProfileScope(scope: string, stageId?: string): void {
    const normalized = scope || "anonymous";
    if (this.activeScope === normalized && this.studentStageId === stageId && this.isHydrated) {
      return;
    }
    this.activeScope = normalized;
    this.studentStageId = stageId;
    this.hydrateFromStorage();
    this.notify();
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
        console.error("Error in ActivityEvidenceStore listener", err);
      }
    });
  }

  // ===========================================================================
  // TRIAL EXECUTION API
  // ===========================================================================

  public startTrial(trial: TrialActivity): TrialAttemptRecord {
    if (!this.isHydrated) this.hydrateFromStorage();

    const existing = this.attempts.get(trial.id);
    if (existing && existing.status === "completed") {
      return existing;
    }

    const newRecord: TrialAttemptRecord = {
      id: `rec_${trial.id}_${Date.now()}`,
      trialId: trial.id,
      trialTitle: trial.title,
      pathwayId: trial.relatedPathwayId,
      stageId: trial.stageSuitability[0],
      format: trial.format,
      status: "in_progress",
      evidenceStatus: "attempted",
      startedAt: new Date().toISOString(),
      competencyPractised: trial.competencyPractised,
      isSyntheticFixture: false,
    };

    this.attempts.set(trial.id, newRecord);
    this.persistToStorage();
    this.notify();
    return newRecord;
  }

  public saveProgress(
    trialId: string,
    updates: { selectedOptionIds?: string[]; submittedWorkText?: string }
  ): void {
    if (!this.isHydrated) this.hydrateFromStorage();
    const current = this.attempts.get(trialId);
    if (!current) return;

    const updated: TrialAttemptRecord = {
      ...current,
      ...updates,
    };
    this.attempts.set(trialId, updated);
    this.persistToStorage();
    this.notify();
  }

  public completeTrial(
    trialId: string,
    reflection: TrialReflection,
    submittedWorkText?: string
  ): TrialAttemptRecord {
    if (!this.isHydrated) this.hydrateFromStorage();
    const current = this.attempts.get(trialId);

    const effectiveWorkText = submittedWorkText ?? current?.submittedWorkText;
    const hasSelectedOption = Boolean(current?.selectedOptionIds && current.selectedOptionIds.length > 0);
    const hasWorkText = Boolean(effectiveWorkText && effectiveWorkText.trim().length >= 5);
    const hasMeaningfulTaskWork = hasSelectedOption || hasWorkText;

    // Epistemic Integrity: Only award "practised" evidence status if the student
    // meaningfully interacted with the activity (selected a solution/trade-off or documented work notes).
    // Reflection-only shortcuts or empty submissions record "attempted" evidence.
    const evidenceStatus: EvidenceStatus = hasMeaningfulTaskWork ? "practised" : "attempted";

    const completedRecord: TrialAttemptRecord = {
      id: current?.id || `rec_${trialId}_${Date.now()}`,
      trialId,
      trialTitle: current?.trialTitle || "Experiential Trial",
      pathwayId: current?.pathwayId || "",
      stageId: current?.stageId || "classes-11-12",
      format: current?.format || "scenario_tradeoff",
      status: "completed",
      evidenceStatus,
      startedAt: current?.startedAt || new Date().toISOString(),
      completedAt: new Date().toISOString(),
      selectedOptionIds: current?.selectedOptionIds,
      submittedWorkText: effectiveWorkText,
      reflection,
      competencyPractised: current?.competencyPractised || "Hands-on Problem Solving",
      isSyntheticFixture: false,
    };

    this.attempts.set(trialId, completedRecord);
    this.persistToStorage();
    this.notify();
    return completedRecord;
  }

  public skipTrial(trialId: string): void {
    if (!this.isHydrated) this.hydrateFromStorage();
    const current = this.attempts.get(trialId);
    if (!current) return;

    // Skipping is completely non-punitive
    const skippedRecord: TrialAttemptRecord = {
      ...current,
      status: "skipped",
      evidenceStatus: "attempted",
      completedAt: new Date().toISOString(),
    };

    this.attempts.set(trialId, skippedRecord);
    this.persistToStorage();
    this.notify();
  }

  public retryTrial(trialId: string): void {
    if (!this.isHydrated) this.hydrateFromStorage();
    const current = this.attempts.get(trialId);
    if (!current) return;

    const retryRecord: TrialAttemptRecord = {
      ...current,
      id: `rec_${trialId}_${Date.now()}`,
      status: "in_progress",
      startedAt: new Date().toISOString(),
      completedAt: undefined,
      reflection: undefined,
    };

    this.attempts.set(trialId, retryRecord);
    this.persistToStorage();
    this.notify();
  }

  // ===========================================================================
  // QUERY & LEDGER ACCESSORS
  // ===========================================================================

  public getAttempt(trialId: string): TrialAttemptRecord | undefined {
    if (!this.isHydrated) this.hydrateFromStorage();
    return this.attempts.get(trialId);
  }

  public getAllAttempts(): TrialAttemptRecord[] {
    if (!this.isHydrated) this.hydrateFromStorage();
    return Array.from(this.attempts.values()).sort((a, b) => {
      const dateA = a.completedAt ? new Date(a.completedAt).getTime() : new Date(a.startedAt).getTime();
      const dateB = b.completedAt ? new Date(b.completedAt).getTime() : new Date(b.startedAt).getTime();
      return dateB - dateA;
    });
  }

  public getCompletedAttempts(): TrialAttemptRecord[] {
    return this.getAllAttempts().filter((a) => a.status === "completed");
  }

  public getCompletedCount(): number {
    return this.getCompletedAttempts().length;
  }

  public getPractisedCount(): number {
    return this.getCompletedAttempts().filter((a) => a.evidenceStatus === "practised").length;
  }

  public getAttemptedCount(): number {
    return this.getAllAttempts().filter((a) => a.evidenceStatus === "attempted").length;
  }

  public getPractisedCompetencies(): string[] {
    const set = new Set<string>();
    this.getCompletedAttempts().forEach((a) => {
      if (a.evidenceStatus === "practised" && a.competencyPractised) {
        set.add(a.competencyPractised);
      }
    });
    return Array.from(set);
  }

  public clearAll(): void {
    this.attempts.clear();
    this.persistToStorage();
    this.notify();
  }
}

export const activityEvidenceStore = new ActivityEvidenceStore();
