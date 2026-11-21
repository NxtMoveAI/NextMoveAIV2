import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
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

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phoneNumber?: string | null;
  city?: string | null;
  institution?: string | null;
  role: UserRole | "professional" | string;
  academicStage?: AcademicStageId | string | null;
  isOnboardingCompleted: boolean;
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
  isOnboardingCompleted?: boolean;
}

export interface UpdateUserProfileInput {
  name?: string;
  email?: string;
  phoneNumber?: string | null;
  city?: string | null;
  institution?: string | null;
  role?: UserRole | "professional" | string;
  academicStage?: AcademicStageId | string | null;
  isOnboardingCompleted?: boolean;
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
