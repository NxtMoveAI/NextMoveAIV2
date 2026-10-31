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
    this.notify();
  }

  /**
   * Get confirmed profile or fall back to active persona fixture
   */
  public getActiveProfile(): StudentIntelligenceProfile {
    if (this.confirmedProfile) {
      return this.confirmedProfile;
    }
    return DEMO_PERSONAS[this.activePersonaId]?.profile || DEMO_PERSONAS.persona_c_class12.profile;
  }

  public hasRealHandoff(): boolean {
    return this.confirmedProfile !== null;
  }

  public setActivePersonaId(personaId: PersonaFixtureId): void {
    this.confirmedProfile = null; // switching fixture clears in-memory handoff
    this.activePersonaId = personaId;
    this.selectedAlternativeMoveId = null;
    this.isMovePostponed = false;
    this.notify();
  }

  public getActivePersonaId(): PersonaFixtureId {
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
