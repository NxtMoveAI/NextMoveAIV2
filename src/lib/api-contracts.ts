/**
 * NEXT MOVE AI V2 — FLOW 2 API CONTRACT SPECIFICATIONS
 * 
 * Target Backend Engineer: Havyas
 * Purpose: Strongly-typed frontend/backend contract boundary for Authentication,
 *          Role Entry, Guardian Authorization, and Flow 3 Onboarding Handoff.
 * 
 * Note: These contracts represent the agreed interface definitions.
 *       Frontend mock adapter simulates these responses without credential leakage.
 */

import { type AcademicStageId } from "@/data/landing-demo";

// =============================================================================
// 1. ENUMS & CORE VALUE TYPES
// =============================================================================

export type UserRole = "student" | "parent" | "admin";

export type AccessRouteStatus =
  | "standard_eligible"        // 18+ or standard legal digital consent
  | "guardian_required"        // Minors requiring parental/guardian authorization
  | "verification_pending"     // Email or identity verification awaiting completion
  | "guardian_pending"         // Waiting on guardian approval
  | "incomplete_data"          // Missing required age/jurisdiction data
  | "restricted";              // Regional or age restriction blocking account creation

export type GuardianRelationType =
  | "parent"
  | "legal_guardian"
  | "educator_sponsor"
  | "other";

export type VerificationType =
  | "email_pending"
  | "email_expired"
  | "guardian_pending"
  | "backend_unavailable";

// =============================================================================
// 2. ERROR RESPONSE CONTRACT
// =============================================================================

export interface ApiErrorResponse {
  statusCode: number;
  errorCode:
    | "VALIDATION_FAILED"
    | "INVALID_CREDENTIALS"
    | "USER_ALREADY_EXISTS"
    | "UNVERIFIED_EMAIL"
    | "GUARDIAN_CONSENT_REQUIRED"
    | "GUARDIAN_APPROVAL_PENDING"
    | "TOKEN_EXPIRED"
    | "RATE_LIMITED"
    | "SERVICE_UNAVAILABLE"
    | "INTERNAL_ERROR";
  message: string;
  fieldErrors?: Record<string, string>;
  retryAfterSeconds?: number;
}

// =============================================================================
// 3. ENDPOINT 1: REGISTER STUDENT
// POST /api/v1/auth/register/student
// =============================================================================

export interface RegisterStudentRequest {
  displayName: string;
  email: string;
  passwordHash: string; // Pre-hashed or TLS-encrypted
  academicStage: AcademicStageId;
  ageCategory: "under_13" | "13_to_17" | "18_plus";
  guardianEmail?: string; // Required if ageCategory is "under_13"
  acceptedTermsVersion: string; // e.g. "v2.0-draft"
}

export interface RegisterStudentResponse {
  userId: string;
  email: string;
  displayName: string;
  role: "student";
  academicStage: AcademicStageId;
  accessStatus: AccessRouteStatus;
  emailVerified: boolean;
  guardianVerificationRequired: boolean;
  nextStep: "verify_email" | "await_guardian" | "flow3_onboarding";
  createdAt: string;
}

// =============================================================================
// 4. ENDPOINT 2: REGISTER PARENT
// POST /api/v1/auth/register/parent
// =============================================================================

export interface RegisterParentRequest {
  fullName: string;
  email: string;
  passwordHash: string;
  relationship: GuardianRelationType;
  studentInviteCode?: string; // Optional code if invited by a student
  acceptedTermsVersion: string;
}

export interface RegisterParentResponse {
  userId: string;
  email: string;
  fullName: string;
  role: "parent";
  relationship: GuardianRelationType;
  emailVerified: boolean;
  linkedStudentsCount: number;
  nextStep: "verify_email" | "parent_workspace_pending";
  createdAt: string;
}

// =============================================================================
// 5. ENDPOINT 3: SIGN IN
// POST /api/v1/auth/sign-in
// =============================================================================

export interface SignInRequest {
  email: string;
  passwordHash: string;
}

export interface SignInResponse {
  user: {
    id: string;
    email: string;
    displayName: string;
    role: UserRole;
    academicStage?: AcademicStageId;
    emailVerified: boolean;
    accessStatus: AccessRouteStatus;
  };
  session: {
    accessTokenExpiresAt: string;
    refreshTokenExpiresAt: string;
  };
  destination: "onboarding" | "dashboard" | "parent_workspace" | "verify";
}

// =============================================================================
// 6. ENDPOINT 4: SESSION STATUS
// GET /api/v1/auth/session
// =============================================================================

export interface SessionStatusResponse {
  authenticated: boolean;
  user?: {
    id: string;
    email: string;
    displayName: string;
    role: UserRole;
    academicStage?: AcademicStageId;
    emailVerified: boolean;
    accessStatus: AccessRouteStatus;
  };
}

// =============================================================================
// 7. ENDPOINT 5: EMAIL VERIFICATION
// POST /api/v1/auth/verify-email
// =============================================================================

export interface VerifyEmailRequest {
  token: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  email: string;
  verifiedAt: string;
  nextDestination: "onboarding" | "dashboard" | "parent_workspace";
}

// =============================================================================
// 8. ENDPOINT 6: FORGOT PASSWORD
// POST /api/v1/auth/forgot-password
// =============================================================================

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  cooldownSeconds: number;
}

// =============================================================================
// 9. ENDPOINT 7: RESET PASSWORD
// POST /api/v1/auth/reset-password
// =============================================================================

export interface ResetPasswordRequest {
  token: string;
  newPasswordHash: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

// =============================================================================
// 10. ENDPOINT 8: AGE & ACCESS ELIGIBILITY CHECK
// POST /api/v1/auth/eligibility/check-age
// =============================================================================

export interface CheckAgeEligibilityRequest {
  academicStage: AcademicStageId;
  ageCategory: "under_13" | "13_to_17" | "18_plus";
  countryCode?: string; // Defaults to IN (India DPDP Act)
}

export interface CheckAgeEligibilityResponse {
  eligible: boolean;
  accessStatus: AccessRouteStatus;
  requiresGuardianConsent: boolean;
  minimumAgeForIndependentAccess: number;
  explanation: string;
  applicableLaw: string; // e.g. "Digital Personal Data Protection Act 2023 (India) / COPPA"
}

// =============================================================================
// 11. ENDPOINT 9: GUARDIAN AUTHORIZATION STATUS
// GET /api/v1/guardian/authorization-status?studentId=...
// =============================================================================

export interface GuardianAuthorizationStatusResponse {
  studentId: string;
  status: "pending_invite" | "invite_sent" | "approved" | "rejected" | "expired";
  guardianEmailMasked?: string; // e.g. "p*****t@example.com"
  invitedAt?: string;
  expiresAt?: string;
  resendAvailableAt?: string;
}

// =============================================================================
// 12. ENDPOINT 10: STUDENT ONBOARDING STATUS (Flow 3 Handoff)
// GET /api/v1/students/me/onboarding-status
// =============================================================================

export interface StudentOnboardingStatusResponse {
  userId: string;
  academicStage: AcademicStageId;
  onboardingStep: "stage_confirmed" | "interests_selected" | "trial_started" | "completed";
  isCompleted: boolean;
  profileSnapshot?: {
    primaryInterests: string[];
    selectedStarterPath?: string;
  };
}
