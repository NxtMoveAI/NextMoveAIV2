import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";

// =============================================================================
// TYPES & CONTRACTS
// =============================================================================

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface SignInParams {
  /**
   * Primary or alternate login identifier:
   * - Email address (standard format)
   * - Phone number (alternate identifier with same password, without OTP)
   */
  identifier: string;
  password: string;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  emailVerified: boolean;
}

export interface AuthResponse<T = AuthUser> {
  success: boolean;
  user?: T;
  error?: {
    code: string;
    message: string;
  };
}

// =============================================================================
// IDENTIFIER HELPERS
// =============================================================================

/**
 * Determines whether an input string is formatted as an email address.
 */
export function isEmailIdentifier(identifier: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier.trim());
}

/**
 * Normalizes phone numbers for consistent storage and lookup.
 * Strips formatting characters (spaces, dashes, parentheses) while preserving leading '+'.
 */
export function normalizePhoneNumber(phone: string): string {
  const trimmed = phone.trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  return hasPlus ? `+${digits}` : digits;
}

/**
 * Helper to map a raw Firebase User into our clean AuthUser shape.
 */
export function mapFirebaseUser(user: User): AuthUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    phoneNumber: user.phoneNumber,
    emailVerified: user.emailVerified,
  };
}

// =============================================================================
// REUSABLE AUTHENTICATION SERVICES
// =============================================================================

/**
 * Sign up a new user using Name, Email, Password, and optional Phone Number.
 * 1. Creates the user in Firebase Auth with email and password.
 * 2. Updates the Firebase display name with the user's full name.
 * 3. Returns the typed AuthUser result.
 */
export async function signUpWithEmail(params: SignUpParams): Promise<AuthResponse> {
  try {
    // Testing mock hook for browser tests (e.g. Playwright)
    if (
      typeof window !== "undefined" &&
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__?: unknown }).__NEXT_MOVE_MOCK_AUTH__
    ) {
      const mockHost = window as unknown as {
        __NEXT_MOVE_MOCK_AUTH__:
          | boolean
          | { shouldFail?: boolean; errorCode?: string; errorMessage?: string; customUid?: string }
          | ((params: SignUpParams) => Promise<AuthResponse>);
        __LAST_AUTH_SIGNUP__?: SignUpParams;
        __AUTH_SIGNUP_COUNT__?: number;
      };

      mockHost.__LAST_AUTH_SIGNUP__ = params;
      mockHost.__AUTH_SIGNUP_COUNT__ = (mockHost.__AUTH_SIGNUP_COUNT__ || 0) + 1;

      if (typeof mockHost.__NEXT_MOVE_MOCK_AUTH__ === "function") {
        return await mockHost.__NEXT_MOVE_MOCK_AUTH__(params);
      }

      if (
        typeof mockHost.__NEXT_MOVE_MOCK_AUTH__ === "object" &&
        mockHost.__NEXT_MOVE_MOCK_AUTH__ !== null &&
        mockHost.__NEXT_MOVE_MOCK_AUTH__.shouldFail
      ) {
        return {
          success: false,
          error: {
            code: mockHost.__NEXT_MOVE_MOCK_AUTH__.errorCode || "auth/unknown-error",
            message: mockHost.__NEXT_MOVE_MOCK_AUTH__.errorMessage || "Mock auth error",
          },
        };
      }

      const mockUid =
        (typeof mockHost.__NEXT_MOVE_MOCK_AUTH__ === "object" &&
        mockHost.__NEXT_MOVE_MOCK_AUTH__ !== null &&
        mockHost.__NEXT_MOVE_MOCK_AUTH__.customUid) ||
        "uid-verified-student-12345";

      return {
        success: true,
        user: {
          uid: mockUid,
          email: params.email.trim().toLowerCase(),
          displayName: params.name.trim() || null,
          phoneNumber: params.phoneNumber?.trim() || null,
          emailVerified: false,
        },
      };
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      params.email.trim(),
      params.password
    );

    if (params.name.trim()) {
      await updateProfile(userCredential.user, {
        displayName: params.name.trim(),
      });
    }

    return {
      success: true,
      user: mapFirebaseUser(userCredential.user),
    };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    return {
      success: false,
      error: {
        code: firebaseError.code || "auth/unknown-error",
        message: firebaseError.message || "An unexpected error occurred during sign up.",
      },
    };
  }
}

/**
 * Password Reset response contract.
 */
export interface ResetPasswordResponse {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Sign in using Email + Password.
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    // Testing mock hook for browser tests (e.g. Playwright)
    if (
      typeof window !== "undefined" &&
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__?: unknown }).__NEXT_MOVE_MOCK_AUTH__
    ) {
      const mockHost = window as unknown as {
        __NEXT_MOVE_MOCK_AUTH__:
          | boolean
          | {
              shouldFailSignIn?: boolean;
              signInErrorCode?: string;
              signInErrorMessage?: string;
              customUid?: string;
              customEmail?: string;
            }
          | ((email: string, pass: string) => Promise<AuthResponse>);
        __LAST_AUTH_SIGNIN__?: { email: string; password: string };
        __AUTH_SIGNIN_COUNT__?: number;
      };

      mockHost.__LAST_AUTH_SIGNIN__ = { email, password };
      mockHost.__AUTH_SIGNIN_COUNT__ = (mockHost.__AUTH_SIGNIN_COUNT__ || 0) + 1;

      if (typeof mockHost.__NEXT_MOVE_MOCK_AUTH__ === "function") {
        return await mockHost.__NEXT_MOVE_MOCK_AUTH__(email, password);
      }

      if (
        typeof mockHost.__NEXT_MOVE_MOCK_AUTH__ === "object" &&
        mockHost.__NEXT_MOVE_MOCK_AUTH__ !== null &&
        mockHost.__NEXT_MOVE_MOCK_AUTH__.shouldFailSignIn
      ) {
        return {
          success: false,
          error: {
            code: mockHost.__NEXT_MOVE_MOCK_AUTH__.signInErrorCode || "auth/invalid-credential",
            message:
              mockHost.__NEXT_MOVE_MOCK_AUTH__.signInErrorMessage ||
              "Invalid email or password.",
          },
        };
      }

      const mockUid =
        (typeof mockHost.__NEXT_MOVE_MOCK_AUTH__ === "object" &&
        mockHost.__NEXT_MOVE_MOCK_AUTH__ !== null &&
        mockHost.__NEXT_MOVE_MOCK_AUTH__.customUid) ||
        "uid-verified-student-12345";

      return {
        success: true,
        user: {
          uid: mockUid,
          email: email.trim().toLowerCase(),
          displayName: "Authenticated User",
          phoneNumber: null,
          emailVerified: true,
        },
      };
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    return {
      success: true,
      user: mapFirebaseUser(userCredential.user),
    };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    return {
      success: false,
      error: {
        code: firebaseError.code || "auth/unknown-error",
        message: firebaseError.message || "An unexpected error occurred during sign in.",
      },
    };
  }
}

/**
 * Sends a password reset email via Firebase Authentication.
 */
export async function sendPasswordReset(
  email: string
): Promise<ResetPasswordResponse> {
  try {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return {
        success: false,
        error: {
          code: "auth/invalid-email",
          message: "Please enter your email address.",
        },
      };
    }

    // Testing mock hook for browser tests (e.g. Playwright)
    if (
      typeof window !== "undefined" &&
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__?: unknown }).__NEXT_MOVE_MOCK_AUTH__
    ) {
      const mockHost = window as unknown as {
        __NEXT_MOVE_MOCK_AUTH__:
          | boolean
          | { shouldFailReset?: boolean; resetErrorCode?: string; resetErrorMessage?: string };
        __LAST_PASSWORD_RESET_EMAIL__?: string;
        __PASSWORD_RESET_COUNT__?: number;
      };

      mockHost.__LAST_PASSWORD_RESET_EMAIL__ = cleanEmail;
      mockHost.__PASSWORD_RESET_COUNT__ = (mockHost.__PASSWORD_RESET_COUNT__ || 0) + 1;

      if (
        typeof mockHost.__NEXT_MOVE_MOCK_AUTH__ === "object" &&
        mockHost.__NEXT_MOVE_MOCK_AUTH__ !== null &&
        mockHost.__NEXT_MOVE_MOCK_AUTH__.shouldFailReset
      ) {
        return {
          success: false,
          error: {
            code: mockHost.__NEXT_MOVE_MOCK_AUTH__.resetErrorCode || "auth/network-request-failed",
            message:
              mockHost.__NEXT_MOVE_MOCK_AUTH__.resetErrorMessage ||
              "Network error. Please try again.",
          },
        };
      }

      return { success: true };
    }

    await sendPasswordResetEmail(auth, cleanEmail);
    return { success: true };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    return {
      success: false,
      error: {
        code: err.code || "auth/reset-password-failed",
        message: err.message || "Failed to send password reset email.",
      },
    };
  }
}

/**
 * Sign in using an Identifier (Email or Phone Number) + Password.
 * Supports:
 * - Direct email login when identifier is an email address.
 * - Phone number as alternate login identifier with same password (without OTP).
 *   (Phone lookup strategy hook will be connected when user records/profiles are configured).
 */
export async function signInWithIdentifier(
  params: SignInParams
): Promise<AuthResponse> {
  const trimmedIdentifier = params.identifier.trim();

  if (isEmailIdentifier(trimmedIdentifier)) {
    return signInWithEmail(trimmedIdentifier, params.password);
  }

  // Alternate identifier: Phone number without OTP
  const normalizedPhone = normalizePhoneNumber(trimmedIdentifier);
  if (normalizedPhone.length >= 7) {
    // Extensible hook for phone-to-credential resolution
    // Note: Once Firestore/user directory is activated in the next step,
    // this will resolve the user's primary auth email by their registered phone number.
    return {
      success: false,
      error: {
        code: "auth/phone-identifier-pending",
        message:
          "Phone number login requires profile resolution. This will be connected once user profile storage is active.",
      },
    };
  }

  return {
    success: false,
    error: {
      code: "auth/invalid-identifier",
      message: "Please enter a valid email address or phone number.",
    },
  };
}

const mockAuthListeners: Set<(user: AuthUser | null) => void> = new Set();

/**
 * Sign out current authenticated user.
 */
export async function signOutUser(): Promise<void> {
  // Testing mock hook for browser tests (e.g. Playwright)
  if (
    typeof window !== "undefined" &&
    (window as unknown as { __NEXT_MOVE_MOCK_AUTH__?: unknown }).__NEXT_MOVE_MOCK_AUTH__
  ) {
    const mockHost = window as unknown as {
      __NEXT_MOVE_MOCK_AUTH__: unknown;
      __AUTH_SIGNED_OUT__?: boolean;
    };
    mockHost.__AUTH_SIGNED_OUT__ = true;
    if (typeof mockHost.__NEXT_MOVE_MOCK_AUTH__ === "object" && mockHost.__NEXT_MOVE_MOCK_AUTH__ !== null) {
      (mockHost.__NEXT_MOVE_MOCK_AUTH__ as { notAuthenticated?: boolean; isAuthenticated?: boolean }).notAuthenticated = true;
      (mockHost.__NEXT_MOVE_MOCK_AUTH__ as { notAuthenticated?: boolean; isAuthenticated?: boolean }).isAuthenticated = false;
    } else {
      mockHost.__NEXT_MOVE_MOCK_AUTH__ = { notAuthenticated: true, isAuthenticated: false };
    }
    mockAuthListeners.forEach((listener) => {
      try {
        listener(null);
      } catch (err) {
        console.error("Error in mock auth listener", err);
      }
    });
  }
  await firebaseSignOut(auth);
}

/**
 * Subscribe to Firebase auth state changes.
 * Returns an unsubscribe callback for cleanup.
 */
export function onAuthStateChange(
  callback: (user: AuthUser | null) => void
): () => void {
  // Testing mock hook for browser tests
  if (
    typeof window !== "undefined" &&
    (window as unknown as { __NEXT_MOVE_MOCK_AUTH__?: unknown }).__NEXT_MOVE_MOCK_AUTH__
  ) {
    mockAuthListeners.add(callback);
    const mockUser = getCurrentAuthUser();
    queueMicrotask(() => callback(mockUser));
    return () => {
      mockAuthListeners.delete(callback);
    };
  }

  return onAuthStateChanged(auth, (firebaseUser) => {
    callback(firebaseUser ? mapFirebaseUser(firebaseUser) : null);
  });
}

/**
 * Synchronously get the currently authenticated user (if any).
 */
export function getCurrentAuthUser(): AuthUser | null {
  // Testing mock hook for browser tests
  if (
    typeof window !== "undefined" &&
    (window as unknown as { __NEXT_MOVE_MOCK_AUTH__?: unknown }).__NEXT_MOVE_MOCK_AUTH__
  ) {
    const mockHost = window as unknown as {
      __NEXT_MOVE_MOCK_AUTH__:
        | boolean
        | {
            mockUser?: AuthUser | null;
            customUid?: string;
            customEmail?: string;
            customName?: string;
            notAuthenticated?: boolean;
            isAuthenticated?: boolean;
            shouldFailSignIn?: boolean;
            shouldFail?: boolean;
          };
    };

    if (
      typeof mockHost.__NEXT_MOVE_MOCK_AUTH__ === "object" &&
      mockHost.__NEXT_MOVE_MOCK_AUTH__ !== null
    ) {
      if (
        mockHost.__NEXT_MOVE_MOCK_AUTH__.notAuthenticated ||
        mockHost.__NEXT_MOVE_MOCK_AUTH__.shouldFailSignIn ||
        mockHost.__NEXT_MOVE_MOCK_AUTH__.shouldFail
      ) {
        return null;
      }
      if (mockHost.__NEXT_MOVE_MOCK_AUTH__.mockUser !== undefined) {
        return mockHost.__NEXT_MOVE_MOCK_AUTH__.mockUser;
      }
      if (
        mockHost.__NEXT_MOVE_MOCK_AUTH__.isAuthenticated ||
        mockHost.__NEXT_MOVE_MOCK_AUTH__.customUid
      ) {
        return {
          uid: mockHost.__NEXT_MOVE_MOCK_AUTH__.customUid || "uid-verified-student-12345",
          email: mockHost.__NEXT_MOVE_MOCK_AUTH__.customEmail || "student@example.com",
          displayName: mockHost.__NEXT_MOVE_MOCK_AUTH__.customName || "Authenticated Student",
          phoneNumber: null,
          emailVerified: true,
        };
      }
      return null;
    }

    if (mockHost.__NEXT_MOVE_MOCK_AUTH__ === true) {
      return {
        uid: "uid-verified-student-12345",
        email: "student@example.com",
        displayName: "Authenticated Student",
        phoneNumber: null,
        emailVerified: true,
      };
    }
  }

  const current = auth.currentUser;
  return current ? mapFirebaseUser(current) : null;
}
