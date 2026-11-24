import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  type Timestamp,
  type FieldValue,
} from "firebase/firestore";
import { db } from "./firebase";
import { type AcademicStageId } from "@/data/landing-demo";
import { type UserRole } from "./api-contracts";

// =============================================================================
// FIRESTORE USER PROFILE SCHEMA & TYPES
// =============================================================================

export interface UserStartingPoint {
  answers: Record<string, string>;
  academicStage: string;
  primaryFocus: string;
  status: string;
  activeInterests: string[];
  isCompleted: boolean;
  completedAt: string;
  updatedAt: string;
}

export interface ActivityStep {
  id: string;
  stepNumber: number;
  title: string;
  instruction: string;
}

export interface StudentNextMoveActivity {
  activityId: string;
  title: string;
  description: string;
  learningOutcome: string;
  estimatedDuration: string;
  steps: ActivityStep[];
  completedStepIds: string[];
  progressPercentage: number;
  status: "not_started" | "in_progress" | "completed";
  createdAt: string;
  updatedAt: string;
  completedAt?: string | null;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phoneNumber?: string | null;
  city?: string | null;
  institution?: string | null;
  role: UserRole | "professional" | string;
  academicStage?: AcademicStageId | string | null;
  currentClass?: "Class 4" | "Class 5" | "Class 6" | "Class 7" | string | null;
  isOnboardingCompleted: boolean;
  startingPoint?: UserStartingPoint | null;
  nextMoveActivity?: StudentNextMoveActivity | null;
  nextMoveHistory?: Record<string, StudentNextMoveActivity> | null;
  createdAt: Timestamp | FieldValue | string | null;
  updatedAt: Timestamp | FieldValue | string | null;
}

export interface CreateUserProfileInput {
  uid: string;
  name: string;
  email: string;
  phoneNumber?: string | null;
  city?: string | null;
  institution?: string | null;
  role?: UserRole | "professional" | string;
  academicStage?: AcademicStageId | string | null;
  currentClass?: "Class 4" | "Class 5" | "Class 6" | "Class 7" | string | null;
  isOnboardingCompleted?: boolean;
  startingPoint?: UserStartingPoint | null;
  nextMoveActivity?: StudentNextMoveActivity | null;
  nextMoveHistory?: Record<string, StudentNextMoveActivity> | null;
}

export interface UpdateUserProfileInput {
  name?: string;
  email?: string;
  phoneNumber?: string | null;
  city?: string | null;
  institution?: string | null;
  role?: UserRole | "professional" | string;
  academicStage?: AcademicStageId | string | null;
  currentClass?: "Class 4" | "Class 5" | "Class 6" | "Class 7" | string | null;
  isOnboardingCompleted?: boolean;
  startingPoint?: UserStartingPoint | null;
  nextMoveActivity?: StudentNextMoveActivity | null;
  nextMoveHistory?: Record<string, StudentNextMoveActivity> | null;
  [key: string]: unknown;
}

export interface FirestoreServiceResponse<T = void> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

const USERS_COLLECTION = "users";

// =============================================================================
// REUSABLE USER PROFILE SERVICE LAYER
// =============================================================================

/**
 * Creates a new user profile document in `users/{uid}`.
 * Strictly uses the Firebase Auth UID as the document key.
 * Never stores passwords, tokens, or credential secrets in Firestore.
 */
export async function createUserProfile(
  input: CreateUserProfileInput
): Promise<FirestoreServiceResponse<UserProfile>> {
  try {
    if (!input.uid || !input.uid.trim()) {
      return {
        success: false,
        error: {
          code: "firestore/invalid-uid",
          message: "A valid authenticated user UID is required to create a profile.",
        },
      };
    }

    // Testing mock hook for browser tests (e.g. Playwright) when live Firestore is mocked or offline
    if (
      typeof window !== "undefined" &&
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__?: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__
    ) {
      const mockHost = window as unknown as {
        __NEXT_MOVE_MOCK_FIRESTORE__:
          | boolean
          | { shouldFail?: boolean; errorMessage?: string; errorCode?: string; failCount?: number }
          | ((input: CreateUserProfileInput) => Promise<FirestoreServiceResponse<UserProfile>>);
        __LAST_FIRESTORE_WRITE__?: CreateUserProfileInput;
        __FIRESTORE_WRITE_COUNT__?: number;
      };

      mockHost.__LAST_FIRESTORE_WRITE__ = input;
      mockHost.__FIRESTORE_WRITE_COUNT__ = (mockHost.__FIRESTORE_WRITE_COUNT__ || 0) + 1;

      if (typeof mockHost.__NEXT_MOVE_MOCK_FIRESTORE__ === "function") {
        return await mockHost.__NEXT_MOVE_MOCK_FIRESTORE__(input);
      }

      if (
        typeof mockHost.__NEXT_MOVE_MOCK_FIRESTORE__ === "object" &&
        mockHost.__NEXT_MOVE_MOCK_FIRESTORE__ !== null &&
        mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.shouldFail
      ) {
        if (typeof mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.failCount === "number") {
          mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.failCount -= 1;
          if (mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.failCount <= 0) {
            mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.shouldFail = false;
          }
        }
        return {
          success: false,
          error: {
            code: mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.errorCode || "firestore/unavailable",
            message:
              mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.errorMessage ||
              "Internal Firestore write error",
          },
        };
      }

      const mockProfile: UserProfile = {
        uid: input.uid,
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        phoneNumber: input.phoneNumber?.trim() || null,
        city: input.city?.trim() || null,
        institution: input.institution?.trim() || null,
        role: input.role || "student",
        academicStage: input.academicStage || null,
        isOnboardingCompleted: input.isOnboardingCompleted ?? false,
        startingPoint: input.startingPoint || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return {
        success: true,
        data: mockProfile,
      };
    }

    const userDocRef = doc(db, USERS_COLLECTION, input.uid);

    const newProfile: Omit<UserProfile, "createdAt" | "updatedAt"> & {
      createdAt: FieldValue;
      updatedAt: FieldValue;
    } = {
      uid: input.uid,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phoneNumber: input.phoneNumber?.trim() || null,
      city: input.city?.trim() || null,
      institution: input.institution?.trim() || null,
      role: input.role || "student",
      academicStage: input.academicStage || null,
      isOnboardingCompleted: input.isOnboardingCompleted ?? false,
      startingPoint: input.startingPoint || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(userDocRef, newProfile);

    return {
      success: true,
      data: newProfile as unknown as UserProfile,
    };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    return {
      success: false,
      error: {
        code: err.code || "firestore/create-failed",
        message: err.message || "Failed to create user profile in Firestore.",
      },
    };
  }
}

/**
 * Fetches the user profile document for a specific UID (`users/{uid}`).
 * Returns `null` if the profile document does not exist.
 */
export async function getUserProfile(
  uid: string
): Promise<FirestoreServiceResponse<UserProfile | null>> {
  try {
    if (!uid || !uid.trim()) {
      return {
        success: false,
        error: {
          code: "firestore/invalid-uid",
          message: "A valid user UID is required to fetch a profile.",
        },
      };
    }

    // Testing mock hook for browser tests (e.g. Playwright)
    if (
      typeof window !== "undefined" &&
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__?: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__
    ) {
      const mockHost = window as unknown as {
        __NEXT_MOVE_MOCK_FIRESTORE__:
          | boolean
          | {
              mockProfile?: UserProfile | null;
              profileNotFound?: boolean;
              getProfileShouldFail?: boolean;
              getProfileErrorMessage?: string;
              customRole?: string;
              customStage?: string;
            };
        __LAST_FIRESTORE_GET_UID__?: string;
        __FIRESTORE_GET_COUNT__?: number;
      };

      mockHost.__LAST_FIRESTORE_GET_UID__ = uid;
      mockHost.__FIRESTORE_GET_COUNT__ = (mockHost.__FIRESTORE_GET_COUNT__ || 0) + 1;

      if (
        typeof mockHost.__NEXT_MOVE_MOCK_FIRESTORE__ === "object" &&
        mockHost.__NEXT_MOVE_MOCK_FIRESTORE__ !== null
      ) {
        if (mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.getProfileShouldFail) {
          return {
            success: false,
            error: {
              code: "firestore/unavailable",
              message:
                mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.getProfileErrorMessage ||
                "Failed to fetch user profile from Firestore.",
            },
          };
        }
        if (mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.profileNotFound) {
          return {
            success: true,
            data: null,
          };
        }
        if (mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.mockProfile !== undefined) {
          return {
            success: true,
            data: mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.mockProfile,
          };
        }
        if (mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.customRole) {
          return {
            success: true,
            data: {
              uid,
              name: "Test User",
              email: "test@example.com",
              role: mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.customRole,
              academicStage: mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.customStage || "classes-8-10",
              isOnboardingCompleted: false,
              startingPoint: null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            } as unknown as UserProfile,
          };
        }
      }

      // Default mock profile for verified student
      return {
        success: true,
        data: {
          uid,
          name: "Devansh Mehta",
          email: "student@example.com",
          role: "student",
          academicStage: "classes-8-10",
          isOnboardingCompleted: false,
          startingPoint: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as unknown as UserProfile,
      };
    }

    const userDocRef = doc(db, USERS_COLLECTION, uid);
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      return {
        success: true,
        data: null,
      };
    }

    return {
      success: true,
      data: docSnap.data() as UserProfile,
    };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    return {
      success: false,
      error: {
        code: err.code || "firestore/fetch-failed",
        message: err.message || "Failed to fetch user profile from Firestore.",
      },
    };
  }
}

/**
 * Realtime Firestore subscription for a user's profile document at `users/{uid}`.
 * Immediately pushes profile updates, Starting Point changes, and activity progress
 * to the calling component or store.
 */
export function subscribeToUserProfile(
  uid: string,
  onUpdate: (profile: UserProfile | null) => void,
  onError?: (error: Error) => void
): () => void {
  if (!uid || !uid.trim()) {
    onUpdate(null);
    return () => {};
  }

  // Testing mock hook for browser tests (e.g. Playwright)
  if (
    typeof window !== "undefined" &&
    (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__?: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__
  ) {
    const mockHost = window as unknown as {
      __NEXT_MOVE_MOCK_FIRESTORE__:
        | boolean
        | {
            mockProfile?: UserProfile | null;
            profileNotFound?: boolean;
            getProfileShouldFail?: boolean;
            getProfileErrorMessage?: string;
            customRole?: string;
            customStage?: string;
          };
      __LAST_FIRESTORE_GET_UID__?: string;
      __MOCK_SUBSCRIBERS__?: Set<() => void>;
    };

    mockHost.__LAST_FIRESTORE_GET_UID__ = uid;

    const notifyMockUpdate = () => {
      if (typeof mockHost.__NEXT_MOVE_MOCK_FIRESTORE__ === "object" && mockHost.__NEXT_MOVE_MOCK_FIRESTORE__ !== null) {
        if (mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.profileNotFound) {
          onUpdate(null);
          return;
        }
        if (mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.mockProfile !== undefined) {
          onUpdate(mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.mockProfile);
          return;
        }
      }
      onUpdate({
        uid,
        name: "Devansh Mehta",
        email: "student@example.com",
        role: "student",
        academicStage: "classes-8-10",
        isOnboardingCompleted: false,
        startingPoint: null,
        nextMoveActivity: null,
        nextMoveHistory: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as unknown as UserProfile);
    };

    notifyMockUpdate();

    if (!mockHost.__MOCK_SUBSCRIBERS__) {
      mockHost.__MOCK_SUBSCRIBERS__ = new Set();
    }
    mockHost.__MOCK_SUBSCRIBERS__.add(notifyMockUpdate);

    return () => {
      mockHost.__MOCK_SUBSCRIBERS__?.delete(notifyMockUpdate);
    };
  }

  const userDocRef = doc(db, USERS_COLLECTION, uid);
  const unsubscribe = onSnapshot(
    userDocRef,
    (docSnap) => {
      if (docSnap.exists()) {
        onUpdate(docSnap.data() as UserProfile);
      } else {
        onUpdate(null);
      }
    },
    (err) => {
      console.error("Firestore subscribeToUserProfile error:", err);
      if (onError) onError(err);
    }
  );

  return unsubscribe;
}

/**
 * Checks whether a user profile document exists in `users/{uid}`.
 */
export async function checkUserProfileExists(uid: string): Promise<boolean> {
  if (!uid || !uid.trim()) return false;
  try {
    const userDocRef = doc(db, USERS_COLLECTION, uid);
    const docSnap = await getDoc(userDocRef);
    return docSnap.exists();
  } catch {
    return false;
  }
}

/**
 * Updates an existing user profile document in `users/{uid}`.
 * Automatically refreshes `updatedAt` with `serverTimestamp()`.
 */
export async function updateUserProfile(
  uid: string,
  updates: UpdateUserProfileInput
): Promise<FirestoreServiceResponse<void>> {
  try {
    if (!uid || !uid.trim()) {
      return {
        success: false,
        error: {
          code: "firestore/invalid-uid",
          message: "A valid user UID is required to update a profile.",
        },
      };
    }

    // Testing mock hook for browser tests (e.g. Playwright)
    if (
      typeof window !== "undefined" &&
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__?: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__
    ) {
      const mockHost = window as unknown as {
        __NEXT_MOVE_MOCK_FIRESTORE__:
          | boolean
          | { mockProfile?: UserProfile | null };
        __LAST_FIRESTORE_UPDATE__?: UpdateUserProfileInput;
      };
      mockHost.__LAST_FIRESTORE_UPDATE__ = updates;
      if (
        typeof mockHost.__NEXT_MOVE_MOCK_FIRESTORE__ === "object" &&
        mockHost.__NEXT_MOVE_MOCK_FIRESTORE__ !== null &&
        mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.mockProfile
      ) {
        Object.assign(mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.mockProfile, updates);
      }
      return { success: true };
    }

    const userDocRef = doc(db, USERS_COLLECTION, uid);

    // Sanitize payload: strip any accidental attempts to overwrite UID
    const cleanUpdates = { ...updates };
    delete cleanUpdates.uid;

    await updateDoc(userDocRef, {
      ...cleanUpdates,
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
    };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    return {
      success: false,
      error: {
        code: err.code || "firestore/update-failed",
        message: err.message || "Failed to update user profile in Firestore.",
      },
    };
  }
}

/**
 * Saves the student's starting point questionnaire responses and generated baseline
 * directly inside their Firestore user profile document at `users/{uid}`.
 */
export async function saveStartingPoint(
  uid: string,
  startingPoint: UserStartingPoint
): Promise<FirestoreServiceResponse<UserStartingPoint>> {
  try {
    if (!uid || !uid.trim()) {
      return {
        success: false,
        error: {
          code: "firestore/invalid-uid",
          message: "A valid user UID is required to save Starting Point.",
        },
      };
    }

    // Testing mock hook for browser tests (e.g. Playwright)
    if (
      typeof window !== "undefined" &&
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__?: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__
    ) {
      const mockHost = window as unknown as {
        __NEXT_MOVE_MOCK_FIRESTORE__:
          | boolean
          | {
              mockProfile?: UserProfile | null;
              saveStartingPointShouldFail?: boolean;
              saveStartingPointErrorMessage?: string;
            };
        __LAST_SAVED_STARTING_POINT__?: UserStartingPoint;
        __LAST_FIRESTORE_WRITE__?: unknown;
        __MOCK_SUBSCRIBERS__?: Set<() => void>;
      };

      mockHost.__LAST_SAVED_STARTING_POINT__ = startingPoint;
      mockHost.__LAST_FIRESTORE_WRITE__ = { startingPoint };

      if (
        typeof mockHost.__NEXT_MOVE_MOCK_FIRESTORE__ === "object" &&
        mockHost.__NEXT_MOVE_MOCK_FIRESTORE__ !== null
      ) {
        if (mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.saveStartingPointShouldFail) {
          return {
            success: false,
            error: {
              code: "firestore/unavailable",
              message:
                mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.saveStartingPointErrorMessage ||
                "Failed to save Starting Point to Firestore.",
            },
          };
        }
        if (mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.mockProfile) {
          mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.mockProfile.startingPoint = startingPoint;
          try {
            window.sessionStorage.setItem("__E2E_MOCK_PROFILE__", JSON.stringify(mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.mockProfile));
          } catch {}
          mockHost.__MOCK_SUBSCRIBERS__?.forEach((cb) => {
            try { cb(); } catch {}
          });
        }
      }

      return {
        success: true,
        data: startingPoint,
      };
    }

    const userDocRef = doc(db, USERS_COLLECTION, uid);
    await updateDoc(userDocRef, {
      startingPoint,
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      data: startingPoint,
    };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    return {
      success: false,
      error: {
        code: err.code || "firestore/save-starting-point-failed",
        message: err.message || "Failed to save Starting Point in Firestore.",
      },
    };
  }
}

/**
 * Saves the student's active Next Move activity progress
 * directly inside their Firestore user profile document at `users/{uid}`.
 */
export async function saveNextMoveActivity(
  uid: string,
  activity: StudentNextMoveActivity
): Promise<FirestoreServiceResponse<StudentNextMoveActivity>> {
  try {
    if (!uid || !uid.trim()) {
      return {
        success: false,
        error: {
          code: "firestore/invalid-uid",
          message: "A valid user UID is required to save Next Move activity.",
        },
      };
    }

    // Testing mock hook for browser tests (e.g. Playwright)
    if (
      typeof window !== "undefined" &&
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__?: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__
    ) {
      const mockHost = window as unknown as {
        __NEXT_MOVE_MOCK_FIRESTORE__:
          | boolean
          | {
              mockProfile?: UserProfile | null;
              saveNextMoveShouldFail?: boolean;
              saveNextMoveErrorMessage?: string;
            };
        __LAST_SAVED_NEXT_MOVE__?: StudentNextMoveActivity;
        __LAST_FIRESTORE_WRITE__?: unknown;
        __MOCK_SUBSCRIBERS__?: Set<() => void>;
      };

      mockHost.__LAST_SAVED_NEXT_MOVE__ = activity;
      mockHost.__LAST_FIRESTORE_WRITE__ = { nextMoveActivity: activity };

      if (
        typeof mockHost.__NEXT_MOVE_MOCK_FIRESTORE__ === "object" &&
        mockHost.__NEXT_MOVE_MOCK_FIRESTORE__ !== null
      ) {
        if (mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.saveNextMoveShouldFail) {
          return {
            success: false,
            error: {
              code: "firestore/unavailable",
              message:
                mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.saveNextMoveErrorMessage ||
                "Failed to save Next Move activity to Firestore.",
            },
          };
        }
        if (mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.mockProfile) {
          mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.mockProfile.nextMoveActivity = activity;
          const currentHistory = mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.mockProfile.nextMoveHistory || {};
          currentHistory[activity.activityId] = activity;
          mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.mockProfile.nextMoveHistory = currentHistory;
          try {
            window.sessionStorage.setItem("__E2E_MOCK_PROFILE__", JSON.stringify(mockHost.__NEXT_MOVE_MOCK_FIRESTORE__.mockProfile));
          } catch {}
          mockHost.__MOCK_SUBSCRIBERS__?.forEach((cb) => {
            try { cb(); } catch {}
          });
        }
      }

      return {
        success: true,
        data: activity,
      };
    }

    const userDocRef = doc(db, USERS_COLLECTION, uid);
    const docSnap = await getDoc(userDocRef);
    const existingData = docSnap.exists() ? (docSnap.data() as UserProfile) : null;
    const existingHistory = existingData?.nextMoveHistory || {};
    const updatedHistory = {
      ...existingHistory,
      [activity.activityId]: activity,
    };

    await updateDoc(userDocRef, {
      nextMoveActivity: activity,
      nextMoveHistory: updatedHistory,
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      data: activity,
    };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    return {
      success: false,
      error: {
        code: err.code || "firestore/save-next-move-failed",
        message: err.message || "Failed to save Next Move activity in Firestore.",
      },
    };
  }
}
