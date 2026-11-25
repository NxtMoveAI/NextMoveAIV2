/**
 * NEXT MOVE AI V2 — IN-MEMORY PROFILE STORE & FLOW 3/FIRESTORE HANDOFF
 * 
 * Provides reactive client-side state continuity, Firebase Auth integration,
 * and Firestore profile caching without fake backend claims.
 */

import { type StudentIntelligenceProfile } from "@/features/onboarding/schemas/types";
import { type PersonaFixtureId } from "../schemas/types";
import { DEMO_PERSONAS } from "../data/demo-personas";
import { type AcademicStageId } from "@/data/landing-demo";
import { normalizeAcademicStage } from "@/data/flow2-config";
import { type AuthUser } from "@/lib/auth-service";
import {
  getUserProfile,
  subscribeToUserProfile,
  saveStartingPoint as persistStartingPoint,
  saveNextMoveActivity as persistNextMoveActivity,
  saveActivitySubmission as persistActivitySubmission,
  type UserProfile,
  type UserStartingPoint,
  type StudentNextMoveActivity,
  type ActivitySubmission,
} from "@/lib/firestore-service";

type ProfileChangeListener = () => void;

class StudentProfileStore {
  private confirmedProfile: StudentIntelligenceProfile | null = null;
  private activePersonaId: PersonaFixtureId = "persona_c_class12";
  private listeners: Set<ProfileChangeListener> = new Set();
  private selectedAlternativeMoveId: string | null = null;
  private isMovePostponed: boolean = false;

  // Real authenticated user state
  private authUser: AuthUser | null = null;
  private userProfile: UserProfile | null = null;
  private isAuthLoading: boolean = true;
  private isProfileLoading: boolean = false;
  private profileError: string | null = null;
  private hasFetchedProfile: boolean = false;
  private fetchPromise: Promise<UserProfile | null> | null = null;
  private unsubscribeProfileListener: (() => void) | null = null;

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
   * Full session reset on sign-out
   */
  public clearAll(): void {
    if (this.unsubscribeProfileListener) {
      this.unsubscribeProfileListener();
      this.unsubscribeProfileListener = null;
    }
    this.clearConfirmedProfile();
    this.authUser = null;
    this.userProfile = null;
    this.isAuthLoading = false;
    this.isProfileLoading = false;
    this.profileError = null;
    this.hasFetchedProfile = false;
    this.fetchPromise = null;
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem("active_persona_id");
        sessionStorage.removeItem("access_status");
        sessionStorage.removeItem("demo_starting_point");
        sessionStorage.removeItem("demo_next_move_activity");
        sessionStorage.removeItem("demo_next_move_history");
      } catch {
        // Safe storage removal fallback
      }
    }
    this.notify();
  }

  /**
   * Update authenticated Firebase user and trigger Firestore realtime profile subscription
   */
  public setAuthUser(user: AuthUser | null): void {
    const previousUid = this.authUser?.uid;
    this.authUser = user;
    this.isAuthLoading = false;

    if (!user) {
      if (this.unsubscribeProfileListener) {
        this.unsubscribeProfileListener();
        this.unsubscribeProfileListener = null;
      }
      this.userProfile = null;
      this.isProfileLoading = false;
      this.profileError = null;
      this.hasFetchedProfile = false;
      this.fetchPromise = null;
      this.notify();
      return;
    }

    // When user changes or profile hasn't been fetched yet, subscribe to Firestore realtime updates
    if (user.uid !== previousUid || !this.hasFetchedProfile || !this.unsubscribeProfileListener) {
      if (this.unsubscribeProfileListener) {
        this.unsubscribeProfileListener();
        this.unsubscribeProfileListener = null;
      }
      this.userProfile = null;
      this.isProfileLoading = true;
      this.profileError = null;
      this.notify();

      this.unsubscribeProfileListener = subscribeToUserProfile(
        user.uid,
        (liveProfile) => {
          if (!liveProfile) {
            this.profileError = "User profile document not found. Please complete registration or sign in with a registered account.";
            this.userProfile = null;
          } else {
            this.userProfile = liveProfile;
            this.profileError = null;
            if (liveProfile.academicStage) {
              const canonicalStage = normalizeAcademicStage(liveProfile.academicStage);
              const personaId = this.getPersonaForStage(canonicalStage, liveProfile.academicStage);
              this.activePersonaId = personaId;
            }
          }
          this.hasFetchedProfile = true;
          this.isProfileLoading = false;
          this.notify();
        },
        (err) => {
          this.profileError = err.message || "An unexpected error occurred while loading your profile.";
          this.userProfile = null;
          this.isProfileLoading = false;
          this.notify();
        }
      );
    }
  }

  /**
   * Fetch authenticated user's real profile from Firestore (`users/{uid}`)
   */
  public async loadUserProfile(uid: string): Promise<UserProfile | null> {
    if (this.fetchPromise && this.authUser?.uid === uid) {
      return this.fetchPromise;
    }

    this.isProfileLoading = true;
    this.profileError = null;
    this.notify();

    this.fetchPromise = (async () => {
      try {
        const res = await getUserProfile(uid);
        if (!res.success) {
          this.profileError = res.error?.message || "Failed to load user profile from Firestore.";
          this.userProfile = null;
        } else if (!res.data) {
          this.profileError = "User profile document not found. Please complete registration or sign in with a registered account.";
          this.userProfile = null;
        } else {
          this.userProfile = {
            ...res.data,
            startingPoint: this.userProfile?.startingPoint || res.data.startingPoint,
            nextMoveActivity: this.userProfile?.nextMoveActivity || res.data.nextMoveActivity,
            nextMoveHistory: {
              ...(res.data.nextMoveHistory || {}),
              ...(this.userProfile?.nextMoveHistory || {}),
            },
          };
          this.profileError = null;
        }
        this.hasFetchedProfile = true;
        this.isProfileLoading = false;
        this.notify();
        return this.userProfile;
      } catch {
        this.profileError = "An unexpected error occurred while loading your profile.";
        this.userProfile = null;
        this.isProfileLoading = false;
        this.notify();
        return null;
      } finally {
        this.fetchPromise = null;
      }
    })();

    return this.fetchPromise;
  }

  public getAuthUser(): AuthUser | null {
    return this.authUser;
  }

  public getUserProfile(): UserProfile | null {
    return this.userProfile;
  }

  public async saveStartingPoint(startingPoint: UserStartingPoint): Promise<boolean> {
    if (this.userProfile) {
      this.userProfile = {
        ...this.userProfile,
        startingPoint,
      };
      this.notify();
    }

    if (this.authUser?.uid) {
      const res = await persistStartingPoint(this.authUser.uid, startingPoint);
      if (!res.success) {
        console.error("Failed to persist startingPoint to Firestore:", res.error);
        return false;
      }
      return true;
    }

    // For unauthenticated session/testing:
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("demo_starting_point", JSON.stringify(startingPoint));
      } catch {
        // Safe storage fallback
      }
    }
    this.notify();
    return true;
  }

  public getStartingPoint(): UserStartingPoint | null {
    if (this.userProfile?.startingPoint) {
      return this.userProfile.startingPoint;
    }
    if (this.authUser) {
      return null;
    }
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("demo_starting_point");
        if (stored) {
          return JSON.parse(stored) as UserStartingPoint;
        }
      } catch {
        // ignore
      }
    }
    return null;
  }

  public async saveNextMoveActivity(activity: StudentNextMoveActivity): Promise<boolean> {
    const updatedHistory: Record<string, StudentNextMoveActivity> = {
      ...(this.userProfile?.nextMoveHistory || this.getNextMoveHistory()),
      [activity.activityId]: activity,
    };

    if (this.userProfile) {
      this.userProfile = {
        ...this.userProfile,
        nextMoveActivity: activity,
        nextMoveHistory: updatedHistory,
      };
    } else {
      this.userProfile = {
        uid: this.authUser?.uid || "anonymous",
        name: this.authUser?.displayName || "Student",
        email: this.authUser?.email || "",
        role: "student",
        isOnboardingCompleted: false,
        nextMoveActivity: activity,
        nextMoveHistory: updatedHistory,
        createdAt: null,
        updatedAt: null,
      };
    }
    this.notify();

    if (this.authUser?.uid) {
      const res = await persistNextMoveActivity(this.authUser.uid, activity);
      if (!res.success) {
        console.error("Failed to persist Next Move activity to Firestore:", res.error);
        return false;
      }
      this.notify();
      return true;
    }

    // For unauthenticated session/testing:
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("demo_next_move_activity", JSON.stringify(activity));
        sessionStorage.setItem("demo_next_move_history", JSON.stringify(updatedHistory));
      } catch {
        // Safe storage fallback
      }
    }
    this.notify();
    return true;
  }

  public async saveActivitySubmission(submission: ActivitySubmission): Promise<boolean> {
    const updatedSubmissions = {
      ...(this.userProfile?.activitySubmissions || {}),
      [submission.activityId]: submission,
    };

    let updatedNextMove = this.userProfile?.nextMoveActivity || null;
    if (updatedNextMove && updatedNextMove.activityId === submission.activityId) {
      updatedNextMove = {
        ...updatedNextMove,
        submission,
      };
    }

    const updatedHistory = {
      ...(this.userProfile?.nextMoveHistory || this.getNextMoveHistory()),
    };
    if (updatedHistory[submission.activityId]) {
      updatedHistory[submission.activityId] = {
        ...updatedHistory[submission.activityId],
        submission,
      };
    }

    if (this.userProfile) {
      this.userProfile = {
        ...this.userProfile,
        activitySubmissions: updatedSubmissions,
        nextMoveActivity: updatedNextMove,
        nextMoveHistory: updatedHistory,
      };
      this.notify();
    }

    const res = await persistActivitySubmission(submission, this.authUser?.uid || this.userProfile?.uid);
    if (!res.success) {
      console.error("Failed to persist activity submission:", res.error);
      return false;
    }
    this.notify();
    return true;
  }

  public getNextMoveActivity(): StudentNextMoveActivity | null {
    if (this.userProfile?.nextMoveActivity) {
      return this.userProfile.nextMoveActivity;
    }
    if (this.authUser) {
      return null;
    }
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("demo_next_move_activity");
        if (stored) {
          return JSON.parse(stored) as StudentNextMoveActivity;
        }
      } catch {
        // ignore
      }
    }
    return null;
  }

  public getNextMoveHistory(): Record<string, StudentNextMoveActivity> {
    if (this.userProfile?.nextMoveHistory) {
      return this.userProfile.nextMoveHistory;
    }
    if (this.authUser) {
      return {};
    }
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("demo_next_move_history");
        if (stored) {
          return JSON.parse(stored) as Record<string, StudentNextMoveActivity>;
        }
      } catch {
        // ignore
      }
    }
    return {};
  }

  public isRealAuthenticatedUser(): boolean {
    return Boolean(this.authUser && this.userProfile);
  }

  public getIsProfileLoading(): boolean {
    // If we have an authenticated user and haven't fetched profile yet, consider loading
    if (this.authUser && !this.hasFetchedProfile) {
      return true;
    }
    return this.isProfileLoading;
  }

  public getIsAuthLoading(): boolean {
    return this.isAuthLoading;
  }

  public getProfileError(): string | null {
    return this.profileError;
  }

  /**
   * Helper to select baseline stage persona for an authenticated user
   */
  private getPersonaForStage(canonicalStage: AcademicStageId, rawStage?: string | null): PersonaFixtureId {
    const cleanRaw = rawStage?.trim().toLowerCase() || "";
    if (canonicalStage === "degree-engineering") {
      if (cleanRaw === "degree" || cleanRaw === "bca" || cleanRaw === "bcom") {
        return "persona_e_bca";
      }
      return "persona_g_engineering";
    }
    if (canonicalStage === "classes-4-7") return "persona_a_class6";
    if (canonicalStage === "classes-8-10") return "persona_b_class9";
    if (canonicalStage === "classes-11-12") return "persona_c_class12";
    if (canonicalStage === "diploma") return "persona_d_diploma";
    if (canonicalStage === "final-year-grad") return "persona_h_grad";
    return "persona_b_class9";
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
    // Authenticated user: STRICTLY LOCK WORKSPACE TO REGISTERED STAGE
    if (this.userProfile) {
      const canonicalStage = normalizeAcademicStage(this.userProfile.academicStage);
      const mappedPersona = this.getPersonaForStage(canonicalStage, this.userProfile.academicStage);
      const baseProfile = DEMO_PERSONAS[mappedPersona]?.profile || DEMO_PERSONAS.persona_b_class9.profile;

      // Check if user completed Flow 3 onboarding in this session
      const confirmed = this.getConfirmedProfile();
      const sourceProfile = confirmed || baseProfile;

      const adapted: StudentIntelligenceProfile = {
        ...sourceProfile,
        profileId: `sip_user_${this.userProfile.uid}`,
        academicStageId: canonicalStage,
        status: "confirmed",
      };

      if (this.userProfile.startingPoint?.isCompleted) {
        adapted.clarity = {
          ...adapted.clarity,
          primaryHelpReason: this.userProfile.startingPoint.primaryFocus,
        };
      }

      return adapted;
    }

    const confirmed = this.getConfirmedProfile();
    if (confirmed) {
      return confirmed;
    }
    return DEMO_PERSONAS[this.getActivePersonaId()]?.profile || DEMO_PERSONAS.persona_c_class12.profile;
  }

  public isAnonymousMode(): boolean {
    if (this.isRealAuthenticatedUser()) return false;
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
    return this.isRealAuthenticatedUser() || this.getConfirmedProfile() !== null;
  }

  public setActivePersonaId(personaId: PersonaFixtureId): void {
    // CRITICAL LOCK: Authenticated users CANNOT switch persona fixture
    if (this.isRealAuthenticatedUser()) {
      return;
    }

    this.clearConfirmedProfile();
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
