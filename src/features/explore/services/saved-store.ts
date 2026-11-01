/**
 * NEXT MOVE AI V2 — EXPLORE POSSIBILITIES SESSION STORE
 * 
 * Manages client-side saved pathways list and side-by-side comparison tray.
 * Persists temporarily in sessionStorage with safe fallback.
 * Emits reactive events to keep UI buttons and counters synchronized.
 */

type StoreListener = () => void;

const SAVED_STORAGE_KEY = "nextmove_saved_pathways";

class SavedPathwaysStore {
  private savedIds: Set<string> = new Set();
  private comparisonIds: string[] = [];
  private listeners: Set<StoreListener> = new Set();
  private isHydrated: boolean = false;

  constructor() {
    this.hydrateFromStorage();
  }

  private hydrateFromStorage(): void {
    if (typeof window === "undefined") return;
    try {
      const stored = sessionStorage.getItem(SAVED_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          this.savedIds = new Set(parsed);
        }
      }
    } catch {
      // Storage access fallback
    }
    this.isHydrated = true;
  }

  private persistToStorage(): void {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(
        SAVED_STORAGE_KEY,
        JSON.stringify(Array.from(this.savedIds))
      );
    } catch {
      // Storage write fallback
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
        console.error("Error in SavedPathwaysStore listener", err);
      }
    });
  }

  // --- Saved Pathways API ---

  public toggleSaved(pathwayId: string): boolean {
    if (!this.isHydrated) this.hydrateFromStorage();
    let isNowSaved = false;
    if (this.savedIds.has(pathwayId)) {
      this.savedIds.delete(pathwayId);
      isNowSaved = false;
    } else {
      this.savedIds.add(pathwayId);
      isNowSaved = true;
    }
    this.persistToStorage();
    this.notify();
    return isNowSaved;
  }

  public isSaved(pathwayId: string): boolean {
    if (!this.isHydrated) this.hydrateFromStorage();
    return this.savedIds.has(pathwayId);
  }

  public getSavedIds(): string[] {
    if (!this.isHydrated) this.hydrateFromStorage();
    return Array.from(this.savedIds);
  }

  public clearSaved(): void {
    this.savedIds.clear();
    this.persistToStorage();
    this.notify();
  }

  // --- Comparison Tray API ---

  public addToComparison(pathwayId: string): { success: boolean; reason?: string } {
    if (this.comparisonIds.includes(pathwayId)) {
      return { success: true };
    }
    if (this.comparisonIds.length >= 3) {
      return {
        success: false,
        reason: "You can compare up to 3 pathways at a time. Remove one to add this.",
      };
    }
    this.comparisonIds = [...this.comparisonIds, pathwayId];
    this.notify();
    return { success: true };
  }

  public removeFromComparison(pathwayId: string): void {
    this.comparisonIds = this.comparisonIds.filter((id) => id !== pathwayId);
    this.notify();
  }

  public toggleComparison(pathwayId: string): { success: boolean; isComparing: boolean; reason?: string } {
    if (this.comparisonIds.includes(pathwayId)) {
      this.removeFromComparison(pathwayId);
      return { success: true, isComparing: false };
    } else {
      const res = this.addToComparison(pathwayId);
      return { success: res.success, isComparing: res.success, reason: res.reason };
    }
  }

  public isComparing(pathwayId: string): boolean {
    return this.comparisonIds.includes(pathwayId);
  }

  public getComparisonIds(): string[] {
    return [...this.comparisonIds];
  }

  public clearComparison(): void {
    this.comparisonIds = [];
    this.notify();
  }
}

export const savedPathwaysStore = new SavedPathwaysStore();

