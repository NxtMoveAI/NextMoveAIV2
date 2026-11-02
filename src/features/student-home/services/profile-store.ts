/**
 * NEXT MOVE AI V2 — IN-MEMORY PROFILE STORE & FLOW 3 HANDOFF
 * 
 * Provides transparent client-side state continuity between Flow 3 and Flow 4
 * without unsafe localStorage persistence or fake backend claims.
 */

import { type StudentIntelligenceProfile } from "@/features/onboarding/schemas/types";
import { type PersonaFixtureId } from "../schemas/types";
import { DEMO_PERSONAS } from "../data/demo-personas";

type ProfileChangeListener = () => void;

class StudentProfileStore {
  private confirmedProfile: StudentIntelligenceProfile | null = null;
  private activePersonaId: PersonaFixtureId = "persona_c_class12";
  private listeners: Set<ProfileChangeListener> = new Set();
  private selectedAlternativeMoveId: string | null = null;
  private isMovePostponed: boolean = false;

  /**
   * Set confirmed profile from Flow 3 onboarding completion
   */
  public setConfirmedProfile(profile: StudentIntelligenceProfile): void {
    this.confirmedProfile = profile;
    this.selectedAlternativeMoveId = null;
    this.isMovePostponed = false;
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("confirmed_student_profile", JSON.stringify(profile));
      } catch {
        // Safe storage write fallback
      }
    }
    this.notify();
  }

  /**
   * Clear confirmed profile and session prototype state (e.g., on sign out)
   */
  public clearConfirmedProfile(): void {
    this.confirmedProfile = null;
    this.selectedAlternativeMoveId = null;
    this.isMovePostponed = false;
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem("confirmed_student_profile");
      } catch {
        // Safe storage removal fallback
      }
    }
    this.notify();
  }

  /**
   * Retrieve genuine confirmed profile if present in memory or session storage
   */
  public getConfirmedProfile(): StudentIntelligenceProfile | null {
    if (
      typeof window !== "undefined" &&
      window.location.search.includes("session=anonymous")
    ) {
      return null;
    }
    if (this.confirmedProfile) {
      return this.confirmedProfile;
    }
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("confirmed_student_profile");
        if (stored) {
          const parsed = JSON.parse(stored) as StudentIntelligenceProfile;
          if (parsed && parsed.academicStageId && parsed.profileId) {
            this.confirmedProfile = parsed;
            return parsed;
          }
        }
      } catch {
        // Malformed storage ignored
      }
    }
    return null;
  }

  /**
   * Get confirmed profile or fall back to active persona fixture (development only)
   */
  public getActiveProfile(): StudentIntelligenceProfile {
    const confirmed = this.getConfirmedProfile();
    if (confirmed) {
      return confirmed;
    }
    return DEMO_PERSONAS[this.getActivePersonaId()]?.profile || DEMO_PERSONAS.persona_c_class12.profile;
  }

  public isAnonymousMode(): boolean {
    if (process.env.NODE_ENV === "production") return true;
    if (typeof window !== "undefined") {
      return (
        window.location.search.includes("mode=production") ||
        window.location.search.includes("session=anonymous") ||
        window.sessionStorage.getItem("anonymous_session") === "true"
      );
    }
    return false;
  }

  public hasRealHandoff(): boolean {
    return this.getConfirmedProfile() !== null;
  }

  public setActivePersonaId(personaId: PersonaFixtureId): void {
    this.clearConfirmedProfile(); // switching fixture clears in-memory and session handoff
    this.activePersonaId = personaId;
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("active_persona_id", personaId);
      } catch {
        // Safe storage fallback
      }
    }
    this.selectedAlternativeMoveId = null;
    this.isMovePostponed = false;
    this.notify();
  }

  public getActivePersonaId(): PersonaFixtureId {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("active_persona_id") as PersonaFixtureId;
        if (stored && DEMO_PERSONAS[stored]) {
          this.activePersonaId = stored;
        }
      } catch {
        // Safe storage fallback
      }
    }
    return this.activePersonaId;
  }

  public setSelectedAlternativeMove(moveId: string | null): void {
    this.selectedAlternativeMoveId = moveId;
    this.isMovePostponed = false;
    this.notify();
  }

  public getSelectedAlternativeMove(): string | null {
    return this.selectedAlternativeMoveId;
  }

  public setMovePostponed(postponed: boolean): void {
    this.isMovePostponed = postponed;
    this.notify();
  }

  public getIsMovePostponed(): boolean {
    return this.isMovePostponed;
  }

  public subscribe(listener: ProfileChangeListener): () => void {
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
        console.error("Error in profile store listener", err);
      }
    });
  }
}

// Global singleton instance
export const studentProfileStore = new StudentProfileStore();

