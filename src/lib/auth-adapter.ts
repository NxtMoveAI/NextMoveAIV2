/**
 * NEXT MOVE AI V2 — FRONTEND AUTH ADAPTER BOUNDARY
 * 
 * Provides a clean interface boundary between Flow 2 frontend screens and future
 * backend authentication services engineered by Havyas.
 * 
 * Guardrails:
 * - NO credentials persisted in localStorage, sessionStorage, mock DBs, or URL params.
 * - NO credential logging.
 * - NO fake JWT or session tokens generated.
 * - Explicitly marks responses as "simulation" until Havyas connects live Supabase/REST endpoints.
 */

import {
  type RegisterStudentRequest,
  type RegisterStudentResponse,
  type RegisterParentRequest,
  type RegisterParentResponse,
  type SignInRequest,
  type SignInResponse,
  type CheckAgeEligibilityRequest,
  type CheckAgeEligibilityResponse,
  type ApiErrorResponse,
} from "./api-contracts";

// Simulated network latency
const SIMULATED_LATENCY_MS = 500;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Register Student (Frontend Mock Boundary)
 */
export async function submitStudentRegistration(
  req: RegisterStudentRequest
): Promise<{ success: boolean; data?: RegisterStudentResponse; error?: ApiErrorResponse }> {
  await wait(SIMULATED_LATENCY_MS);

  // In frontend-only mode, we validate format without saving
  if (!req.displayName || req.displayName.trim().length < 2) {
    return {
      success: false,
      error: {
        statusCode: 400,
        errorCode: "VALIDATION_FAILED",
        message: "Please enter your preferred display name (at least 2 characters).",
        fieldErrors: { displayName: "Name is too short." },
      },
    };
  }

  if (!req.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.email)) {
    return {
      success: false,
      error: {
        statusCode: 400,
        errorCode: "VALIDATION_FAILED",
        message: "Please enter a valid email address.",
        fieldErrors: { email: "Invalid email format." },
      },
    };
  }

  // Simulated successful registration proposal
  return {
    success: true,
    data: {
      userId: `stu_sim_${Date.now()}`,
      email: req.email,
      displayName: req.displayName,
      role: "student",
      academicStage: req.academicStage,
      accessStatus: req.ageCategory === "under_13" ? "guardian_pending" : "standard_eligible",
      emailVerified: false,
      guardianVerificationRequired: req.ageCategory === "under_13",
      nextStep: req.ageCategory === "under_13" ? "await_guardian" : "flow3_onboarding",
      createdAt: new Date().toISOString(),
    },
  };
}

/**
 * Register Parent (Frontend Mock Boundary)
 */
export async function submitParentRegistration(
  req: RegisterParentRequest
): Promise<{ success: boolean; data?: RegisterParentResponse; error?: ApiErrorResponse }> {
  await wait(SIMULATED_LATENCY_MS);

  if (!req.fullName || req.fullName.trim().length < 2) {
    return {
      success: false,
      error: {
        statusCode: 400,
        errorCode: "VALIDATION_FAILED",
        message: "Please enter your full name.",
        fieldErrors: { fullName: "Full name is required." },
      },
    };
  }

  if (!req.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.email)) {
    return {
      success: false,
      error: {
        statusCode: 400,
        errorCode: "VALIDATION_FAILED",
        message: "Please enter a valid email address.",
        fieldErrors: { email: "Invalid email format." },
      },
    };
  }

  return {
    success: true,
    data: {
      userId: `par_sim_${Date.now()}`,
      email: req.email,
      fullName: req.fullName,
      role: "parent",
      relationship: req.relationship,
      emailVerified: false,
      linkedStudentsCount: 0,
      nextStep: "verify_email",
      createdAt: new Date().toISOString(),
    },
  };
}

/**
 * Sign In (Frontend Mock Boundary)
 */
export async function submitSignIn(
  req: SignInRequest,
  simulateState: "success" | "backend_unavailable" | "unverified_email" | "guardian_pending" = "success"
): Promise<{ success: boolean; data?: SignInResponse; error?: ApiErrorResponse }> {
  await wait(SIMULATED_LATENCY_MS);

  if (simulateState === "backend_unavailable") {
    return {
      success: false,
      error: {
        statusCode: 503,
        errorCode: "SERVICE_UNAVAILABLE",
        message: "Authentication service is temporarily unavailable. Backend integration by Havyas is in progress.",
        retryAfterSeconds: 30,
      },
    };
  }

  if (simulateState === "unverified_email") {
    return {
      success: false,
      error: {
        statusCode: 403,
        errorCode: "UNVERIFIED_EMAIL",
        message: "Please verify your email address to access your space.",
      },
    };
  }

  if (simulateState === "guardian_pending") {
    return {
      success: false,
      error: {
        statusCode: 403,
        errorCode: "GUARDIAN_APPROVAL_PENDING",
        message: "Your parent or guardian authorization is currently pending.",
      },
    };
  }

  if (!req.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.email)) {
    return {
      success: false,
      error: {
        statusCode: 400,
        errorCode: "INVALID_CREDENTIALS",
        message: "Invalid email or password.",
      },
    };
  }

  return {
    success: true,
    data: {
      user: {
        id: `usr_sim_${Date.now()}`,
        email: req.email,
        displayName: "Student Explorer",
        role: "student",
        academicStage: "classes-11-12",
        emailVerified: true,
        accessStatus: "standard_eligible",
      },
      session: {
        accessTokenExpiresAt: new Date(Date.now() + 3600000).toISOString(),
        refreshTokenExpiresAt: new Date(Date.now() + 604800000).toISOString(),
      },
      destination: "onboarding",
    },
  };
}

/**
 * Check Age & Access Eligibility
 */
export async function checkAgeEligibility(
  req: CheckAgeEligibilityRequest
): Promise<CheckAgeEligibilityResponse> {
  await wait(250);

  if (req.ageCategory === "under_13" || req.academicStage === "classes-4-7") {
    return {
      eligible: true,
      accessStatus: "guardian_required",
      requiresGuardianConsent: true,
      minimumAgeForIndependentAccess: 18,
      explanation:
        "Students in Classes 4–7 explore with active guardian-led co-setup under digital minor protection guidelines.",
      applicableLaw: "Draft Framework for Minor Safety & DPDP Phased Implementation",
    };
  }

  if (req.ageCategory === "13_to_17" || req.academicStage === "classes-8-10" || req.academicStage === "classes-11-12") {
    return {
      eligible: true,
      accessStatus: "teen_guardian_required",
      requiresGuardianConsent: true,
      minimumAgeForIndependentAccess: 18,
      explanation:
        "Secondary school students (ages 13–17) create a teen profile; continuous recommendations and platform features require guardian authorization and linking confirmation.",
      applicableLaw: "Draft Framework for Minor Safety & DPDP Phased Implementation",
    };
  }

  return {
    eligible: true,
    accessStatus: "standard_eligible",
    requiresGuardianConsent: false,
    minimumAgeForIndependentAccess: 18,
    explanation: "Autonomous student exploration with standard privacy protections.",
    applicableLaw: "Standard Digital Privacy Framework",
  };
}
