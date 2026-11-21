"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Compass,
  Cpu,
} from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { StepIndicator, type StepItem } from "@/components/auth/StepIndicator";
import { StageBadge } from "@/components/auth/StageBadge";
import { FormField } from "@/components/auth/FormField";
import { type AcademicStage } from "@/data/landing-demo";
import {
  getValidatedStage,
  isValidSituation,
  isValidAudience,
  isValidAcademicContext,
  type AcademicContextParam,
  SITUATION_CONFIG,
  ACADEMIC_CONTEXT_CONFIG,
} from "@/data/flow2-config";
import { signUpWithEmail, getCurrentAuthUser } from "@/lib/auth-service";
import { createUserProfile } from "@/lib/firestore-service";

const STEPS: StepItem[] = [
  { number: 1, label: "Role" },
  { number: 2, label: "Academic Stage" },
  { number: 3, label: "Access & Safety" },
  { number: 4, label: "Create Space" },
];

interface ResolvedStage {
  canonicalStage: AcademicStage;
  isSchool: boolean;
  rawStage: string;
}

function resolveStage(raw: string | null | undefined): ResolvedStage | null {
  if (!raw) return null;
  const clean = raw.trim().toLowerCase();

  // School stages
  if (clean === "class-4-7" || clean === "classes-4-7") {
    const s = getValidatedStage("classes-4-7");
    return s ? { canonicalStage: s, isSchool: true, rawStage: clean } : null;
  }
  if (clean === "class-8-10" || clean === "classes-8-10") {
    const s = getValidatedStage("classes-8-10");
    return s ? { canonicalStage: s, isSchool: true, rawStage: clean } : null;
  }
  if (clean === "class-11-12" || clean === "classes-11-12") {
    const s = getValidatedStage("classes-11-12");
    return s ? { canonicalStage: s, isSchool: true, rawStage: clean } : null;
  }

  // Non-school stages
  if (clean === "diploma") {
    const s = getValidatedStage("diploma");
    return s ? { canonicalStage: s, isSchool: false, rawStage: clean } : null;
  }
  if (clean === "degree") {
    const s = getValidatedStage("degree-engineering");
    return s ? { canonicalStage: s, isSchool: false, rawStage: clean } : null;
  }
  if (clean === "engineering" || clean === "degree-engineering") {
    const s = getValidatedStage("degree-engineering");
    return s ? { canonicalStage: s, isSchool: false, rawStage: clean } : null;
  }
  if (clean === "working-professional" || clean === "final-year-grad") {
    const s = getValidatedStage("final-year-grad");
    return s ? { canonicalStage: s, isSchool: false, rawStage: clean } : null;
  }

  return null;
}

// Phone validator: validates 10-digit Indian mobile numbers (with optional +91 or 0 prefix)
function validateIndianPhoneNumber(phone: string): { isValid: boolean; message?: string } {
  const trimmed = phone.trim();
  if (!trimmed) {
    return { isValid: false, message: "Please enter your phone number." };
  }
  const digitsOnly = trimmed.replace(/\D/g, "");

  if (digitsOnly.length === 10 && /^[6-9]/.test(digitsOnly)) {
    return { isValid: true };
  }
  if (digitsOnly.length === 11 && digitsOnly.startsWith("0") && /^[6-9]/.test(digitsOnly.slice(1))) {
    return { isValid: true };
  }
  if (digitsOnly.length === 12 && digitsOnly.startsWith("91") && /^[6-9]/.test(digitsOnly.slice(2))) {
    return { isValid: true };
  }

  return {
    isValid: false,
    message: "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).",
  };
}

function validateEmail(email: string): { isValid: boolean; message?: string } {
  const trimmed = email.trim();
  if (!trimmed) {
    return { isValid: false, message: "Please enter your email address." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, message: "Please enter a valid email address (e.g. name@example.com)." };
  }
  return { isValid: true };
}

function validatePassword(password: string): { isValid: boolean; message?: string } {
  if (!password) {
    return { isValid: false, message: "Please create a password." };
  }
  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters long." };
  }
  if (!/[A-Za-z]/.test(password) || !/[0-9\W]/.test(password)) {
    return {
      isValid: false,
      message: "Password must include at least one letter and at least one number or symbol.",
    };
  }
  return { isValid: true };
}

function validateConfirmPassword(password: string, confirmPassword: string): { isValid: boolean; message?: string } {
  if (!confirmPassword) {
    return { isValid: false, message: "Please confirm your password." };
  }
  if (password !== confirmPassword) {
    return { isValid: false, message: "Passwords do not match." };
  }
  return { isValid: true };
}

function validateRequiredText(value: string, fieldName: string): { isValid: boolean; message?: string } {
  const trimmed = value.trim();
  if (!trimmed) {
    return { isValid: false, message: `Please enter your ${fieldName.toLowerCase()}.` };
  }
  if (trimmed.length < 2) {
    return { isValid: false, message: `${fieldName} must be at least 2 characters.` };
  }
  return { isValid: true };
}

function getFriendlyAuthErrorMessage(code?: string, rawMessage?: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email address is already registered. Please sign in or use a different email.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 8 characters with letters and numbers.";
    case "auth/network-request-failed":
      return "Network error: Unable to reach authentication servers. Please check your internet connection.";
    case "auth/too-many-requests":
      return "Too many attempts. Access is temporarily disabled. Please wait a moment and try again.";
    case "auth/operation-not-allowed":
      return "Email and password signup is currently disabled. Please contact support.";
    case "auth/popup-closed-by-user":
      return "The authentication window was closed before completion.";
    default:
      if (rawMessage && !rawMessage.includes("Firebase:") && !rawMessage.includes("auth/")) {
        return rawMessage;
      }
      return "Unable to complete registration. Please check your details and try again.";
  }
}

function StudentSignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stageParam = searchParams.get("stage");
  const accessParam = searchParams.get("access");
  const situationParam = searchParams.get("situation");
  const audienceParam = searchParams.get("audience");
  const contextParam = searchParams.get("context");

  const resolved = resolveStage(stageParam);
  const validatedSituation = isValidSituation(situationParam) ? situationParam : null;
  const validatedAudience = isValidAudience(audienceParam) ? audienceParam : null;
  const validatedContext = isValidAcademicContext(contextParam) ? (contextParam as AcademicContextParam) : null;

  // Form Fields State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [institution, setInstitution] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Progressive validation and submission states
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pendingAuthUid, setPendingAuthUid] = useState<string | null>(null);

  // Mark field as touched on blur
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Validation outcomes
  const fullNameValidation = validateRequiredText(fullName, "Full Name");
  const phoneValidation = validateIndianPhoneNumber(phone);
  const emailValidation = validateEmail(email);
  const cityValidation = validateRequiredText(city, "City / Location");
  const institutionValidation = validateRequiredText(institution, "Institution");
  const passwordValidation = validatePassword(password);
  const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword);

  const isFormValid =
    fullNameValidation.isValid &&
    phoneValidation.isValid &&
    emailValidation.isValid &&
    cityValidation.isValid &&
    institutionValidation.isValid &&
    passwordValidation.isValid &&
    confirmPasswordValidation.isValid;

  // If no stage is provided or stage is invalid, require student to pick a stage first
  if (!resolved) {
    return (
      <AuthLayout
        role="student"
        backHref="/get-started/student"
        backLabel="Choose Stage"
        activeStep={2}
        totalSteps={4}
        stepTitle="Stage Required"
      >
        <AuthCard>
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-[#171A2B]">
              No Academic Stage Selected
            </h1>
            <p className="text-sm text-[#626987] max-w-md mx-auto leading-relaxed">
              Please select your academic stage first so we can tailor your signup experience appropriately.
            </p>
            <div className="pt-2">
              <Link
                href="/get-started/student"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6757F5] text-white font-bold hover:bg-[#5342E8] shadow-md transition-colors"
              >
                <span>Select Your Stage</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  const { canonicalStage, isSchool, rawStage } = resolved;

  // Determine back navigation link based on whether this stage came through Step 3 (school) or bypassed it (non-school)
  const backParams = new URLSearchParams();
  backParams.set("stage", rawStage);
  if (accessParam) backParams.set("access", accessParam);
  if (validatedSituation) backParams.set("situation", validatedSituation);
  if (validatedAudience) backParams.set("audience", validatedAudience);
  if (validatedContext) backParams.set("context", validatedContext);

  const backHref = isSchool
    ? `/get-started/student/access?${backParams.toString()}`
    : `/get-started/student?${backParams.toString()}`;
  const backLabel = isSchool ? "Back to Access & Safety" : "Back to Academic Stage";

  const isTeen = accessParam === "teen" || isSchool;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      city: true,
      institution: true,
      password: true,
      confirmPassword: true,
    });

    if (!isFormValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let authUid = pendingAuthUid;

      // 1. Firebase Authentication: Create user if not already created in this session
      if (!authUid) {
        const currentUser = getCurrentAuthUser();
        if (currentUser && currentUser.email?.toLowerCase() === email.trim().toLowerCase()) {
          authUid = currentUser.uid;
          setPendingAuthUid(currentUser.uid);
        } else {
          const authResult = await signUpWithEmail({
            name: fullName.trim(),
            email: email.trim().toLowerCase(),
            password,
            phoneNumber: phone.trim(),
          });

          if (!authResult.success || !authResult.user) {
            setIsSubmitting(false);
            const friendlyMsg = getFriendlyAuthErrorMessage(
              authResult.error?.code,
              authResult.error?.message
            );
            setSubmitError(friendlyMsg);
            return;
          }

          authUid = authResult.user.uid;
          setPendingAuthUid(authResult.user.uid);
        }
      }

      // 2. Save User Profile to Firestore: collection `users/{uid}`
      // Strict security: Passwords and confirm passwords are NEVER passed to Firestore
      const profileResult = await createUserProfile({
        uid: authUid,
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        phoneNumber: phone.trim(),
        city: city.trim(),
        institution: institution.trim(),
        role: "student",
        academicStage: canonicalStage.id,
        isOnboardingCompleted: false,
      });

      if (!profileResult.success) {
        setIsSubmitting(false);
        setSubmitError(
          "Your account was created, but we could not set up your student profile in Firestore. Please click below to retry saving your profile."
        );
        return;
      }

      // Both Auth and Firestore succeeded
      setPendingAuthUid(null);
      setIsSuccess(true);

      // Redirect to Student Workspace
      const workspaceParams = new URLSearchParams();
      workspaceParams.set("stage", canonicalStage.id);
      if (validatedSituation) workspaceParams.set("situation", validatedSituation);
      if (validatedAudience) workspaceParams.set("audience", validatedAudience);
      if (validatedContext) workspaceParams.set("context", validatedContext);

      router.push(`/dashboard/student?${workspaceParams.toString()}`);
    } catch (err: unknown) {
      setIsSubmitting(false);
      const errorObj = err as { code?: string; message?: string };
      setSubmitError(getFriendlyAuthErrorMessage(errorObj.code, errorObj.message));
    }
  };

  return (
    <AuthLayout
      role="student"
      stageParam={canonicalStage.id}
      backHref={backHref}
      backLabel={backLabel}
      activeStep={4}
      totalSteps={4}
      stepTitle="Create Space"
    >
      <AuthCard>
        <StepIndicator steps={STEPS} currentStep={4} />

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-2 border border-[#DDD8FE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Step 4: Your Personal Space</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
            Create your space to explore and grow.
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#626987] leading-relaxed">
            Set up your personal student account. You&apos;ll discover more about your abilities and pathways as you go.
          </p>

          {validatedSituation && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#4338CA] bg-[#E0E7FF] px-3 py-1 rounded-full border border-[#C7D2FE]">
              <Compass className="w-3.5 h-3.5 text-[#4338CA]" />
              <span>Learning Situation: {SITUATION_CONFIG[validatedSituation].label}</span>
            </div>
          )}

          {validatedContext && (
            <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#4338CA] bg-[#EEF2FF] px-3 py-1 rounded-full border border-[#C7D2FE]">
              <Cpu className="w-3.5 h-3.5 text-[#4338CA]" />
              <span>Focus: {ACADEMIC_CONTEXT_CONFIG[validatedContext].label}</span>
            </div>
          )}
        </div>

        {/* Recognized Academic Stage Badge */}
        <div className="mb-4">
          <StageBadge
            stage={canonicalStage}
            editHref={backHref}
            showEdit={true}
          />
        </div>

        {/* Teen Minor Notice (if under 18 / school stage) */}
        {isTeen ? (
          <div className="mb-5 p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-left space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Minor Safety Safeguards Active</span>
            </div>
            <p className="text-[11px] text-indigo-800 leading-relaxed">
              Your student exploration space will be established with minor privacy defaults. Continuous exploration features will link guardian authorization.
            </p>
          </div>
        ) : (
          <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-left space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Autonomous Student Account</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Standard independent student registration with full autonomous privacy and portfolio management.
            </p>
          </div>
        )}

        {/* Success Feedback Banner */}
        {isSuccess && (
          <div
            role="status"
            className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 animate-fadeIn text-left"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5 flex-1">
              <span className="font-bold block text-emerald-900">Workspace Created Successfully!</span>
              <p className="leading-relaxed">Redirecting to your personalized Student Workspace...</p>
            </div>
          </div>
        )}

        {/* Registration Form with All 7 Required Fields */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1. Full Name */}
            <FormField
              id="full-name"
              label="Full Name"
              placeholder="e.g. Aryan Sharma"
              value={fullName}
              disabled={isSubmitting}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => handleBlur("fullName")}
              error={touched.fullName && !fullNameValidation.isValid ? fullNameValidation.message : undefined}
              required
              autoComplete="name"
            />

            {/* 2. Phone Number */}
            <FormField
              id="phone-number"
              label="Phone Number"
              type="tel"
              placeholder="e.g. 9876543210"
              value={phone}
              disabled={isSubmitting}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => handleBlur("phone")}
              error={touched.phone && !phoneValidation.isValid ? phoneValidation.message : undefined}
              hint="10-digit Indian mobile number"
              required
              autoComplete="tel"
            />
          </div>

          {/* 3. Email Address */}
          <FormField
            id="email"
            label="Email Address"
            type="email"
            placeholder="student@example.com"
            value={email}
            disabled={isSubmitting}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            error={touched.email && !emailValidation.isValid ? emailValidation.message : undefined}
            hint="Used for account login and workspace verification"
            required
            autoComplete="email"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 4. City / Location */}
            <FormField
              id="location"
              label="City / Location"
              placeholder="e.g. Bengaluru, Karnataka"
              value={city}
              disabled={isSubmitting}
              onChange={(e) => setCity(e.target.value)}
              onBlur={() => handleBlur("city")}
              error={touched.city && !cityValidation.isValid ? cityValidation.message : undefined}
              required
              autoComplete="address-level2"
            />

            {/* 5. School / College / Institution */}
            <FormField
              id="institution"
              label="School / College / Institution"
              placeholder="e.g. National Public School"
              value={institution}
              disabled={isSubmitting}
              onChange={(e) => setInstitution(e.target.value)}
              onBlur={() => handleBlur("institution")}
              error={touched.institution && !institutionValidation.isValid ? institutionValidation.message : undefined}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 6. Password */}
            <FormField
              id="password"
              label="Password"
              isPassword
              placeholder="At least 8 characters"
              value={password}
              disabled={isSubmitting}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              error={touched.password && !passwordValidation.isValid ? passwordValidation.message : undefined}
              hint="Min. 8 characters with letters & numbers"
              required
              autoComplete="new-password"
            />

            {/* 7. Confirm Password */}
            <FormField
              id="confirm-password"
              label="Confirm Password"
              isPassword
              placeholder="Repeat your password"
              value={confirmPassword}
              disabled={isSubmitting}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
              error={touched.confirmPassword && !confirmPasswordValidation.isValid ? confirmPasswordValidation.message : undefined}
              required
              autoComplete="new-password"
            />
          </div>

          {/* Terms and Privacy Notice */}
          <p className="text-[11px] text-[#626987] text-left pt-1 leading-relaxed">
            By clicking Create Student Space, you agree to Next Move AI&apos;s{" "}
            <span className="text-[#6757F5] font-semibold underline">Terms of Exploration</span>{" "}
            and{" "}
            <span className="text-[#6757F5] font-semibold underline">Privacy Notice</span>.
            Your learning reflections and portfolio trials are private by design.
          </p>

          {/* Submission Error Banner */}
          {submitError && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-fadeIn text-left"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5 flex-1">
                <span className="font-bold block text-rose-900">Registration Error</span>
                <p className="leading-relaxed">{submitError}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              isFormValid && !isSubmitting
                ? "text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/25 hover:shadow-lg active:scale-[0.99] cursor-pointer"
                : "text-[#626987] bg-[#E8E6F3] cursor-not-allowed opacity-70"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating your space...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>
                  {pendingAuthUid
                    ? "Retry Saving Profile"
                    : isFormValid
                    ? "Create Student Space"
                    : "Complete All Fields to Continue"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation Link */}
        <div className="mt-6 pt-4 border-t border-[#E8E6F3] text-center text-xs text-[#626987]">
          <span>Already have an account? </span>
          <Link
            href="/sign-in"
            className="font-bold text-[#6757F5] hover:underline"
          >
            Sign In
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default function StudentSignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-sm text-[#626987]">
          Loading registration...
        </div>
      }
    >
      <StudentSignUpContent />
    </Suspense>
  );
}
