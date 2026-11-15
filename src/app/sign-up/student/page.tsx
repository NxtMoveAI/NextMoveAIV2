"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock,
  Loader2,
} from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { StepIndicator, type StepItem } from "@/components/auth/StepIndicator";
import { StageBadge } from "@/components/auth/StageBadge";
import { FormField } from "@/components/auth/FormField";
import { PrototypeNotice } from "@/components/auth/PrototypeNotice";
import { getValidatedStage } from "@/data/flow2-config";
import { submitStudentRegistration } from "@/lib/auth-adapter";

const STEPS: StepItem[] = [
  { number: 1, label: "Role" },
  { number: 2, label: "Stage" },
  { number: 3, label: "Access" },
  { number: 4, label: "Create Space" },
];

function StudentSignUpContent() {
  const searchParams = useSearchParams();
  const stageParam = searchParams.get("stage");
  const accessParam = searchParams.get("access");
  const stage = getValidatedStage(stageParam);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  // If no stage is provided or stage is invalid, require student to pick a stage first
  if (!stage) {
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

  const isTeen =
    accessParam === "teen" ||
    stage.id === "classes-4-7" ||
    stage.id === "classes-8-10" ||
    stage.id === "classes-11-12";

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!displayName.trim()) {
      errs.displayName = "Please enter your preferred display name.";
    } else if (displayName.trim().length < 2) {
      errs.displayName = "Name must be at least 2 characters.";
    }

    if (!email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!password) {
      errs.password = "Please create a password.";
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters.";
    }

    if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }

    if (!acceptedTerms) {
      errs.acceptedTerms = "Please acknowledge the privacy notice and draft terms.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSubmissionFeedback(null);

    // Call frontend adapter (no credentials persisted or logged)
    const result = await submitStudentRegistration({
      displayName,
      email,
      passwordHash: "simulated_hash_not_saved",
      academicStage: stage.id,
      ageCategory: stage.id === "classes-4-7" ? "under_13" : "13_to_17",
      acceptedTermsVersion: "v2.0-draft",
    });

    setIsLoading(false);

    if (result.success) {
      setSubmissionFeedback(
        "Account creation will be available when secure sign-in is connected. Account creation will be available once secure authentication is connected by Havyas."
      );
    } else if (result.error) {
      setErrors({ form: result.error.message });
    }
  };

  return (
    <AuthLayout
      role="student"
      stageParam={stage.id}
      backHref={`/get-started/student/access?stage=${stage.id}`}
      backLabel="Back to Access"
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
            Start with the essentials. You&apos;ll discover more about yourself as you go.
          </p>
        </div>

        {/* Recognized Stage Pill */}
        <div className="mb-4">
          <StageBadge
            stage={stage}
            editHref={`/get-started/student?stage=${stage.id}`}
            showEdit={true}
          />
        </div>

        {/* Teen Minor Notice (if under 18) */}
        {isTeen && (
          <div className="mb-5 p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-left space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Under-18 Account Entry (Phased Minor Protection)</span>
            </div>
            <p className="text-[11px] text-indigo-800 leading-relaxed">
              Your personal profile will be created now. Under child-data protection guidelines, full continuous exploration and recommendations will require guardian authorization and linking confirmation before activation.
            </p>
          </div>
        )}

        {/* Direct Exploration Option (No Password Required) */}
        <div className="mb-6 p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#6757F5] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Onboarding Preview</span>
            </div>
            <p className="text-xs text-[#474D66]">
              View the student onboarding UI and interactive flow without entering credentials.
            </p>
          </div>
          <Link
            href={`/onboarding?stage=${stage.id}&preview=true`}
            className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-xs transition-colors"
          >
            <span>Explore Preview</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Minimal Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <FormField
            id="student-name"
            label="Preferred Display Name"
            placeholder="e.g. Aryan, Riya, or your nickname"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            error={errors.displayName}
            hint="How you'd like your partner to greet you"
            required
            autoComplete="name"
          />

          <FormField
            id="student-email"
            label="Email Address"
            type="email"
            placeholder="student@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            hint="Used for verification and account recovery"
            required
            autoComplete="email"
          />

          <FormField
            id="student-password"
            label="Password"
            isPassword
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            hint="Minimum 8 characters. (Public preview: do not enter a real personal password)"
            required
            autoComplete="new-password"
          />

          <FormField
            id="student-confirm-password"
            label="Confirm Password"
            isPassword
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
          />

          {/* Privacy & Terms Checkbox */}
          <div className="pt-1 text-left">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#474D66]">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 rounded border-[#C7C4E2] text-[#6757F5] focus:ring-[#6757F5]"
              />
              <span>
                I agree to the{" "}
                <span className="text-[#6757F5] font-semibold underline">
                  Terms of Exploration
                </span>{" "}
                and acknowledge that my reflections and trials are private by design under the{" "}
                <span className="text-[#6757F5] font-semibold underline">
                  Privacy Notice
                </span>
                .
              </span>
            </label>
            {errors.acceptedTerms && (
              <p className="text-xs text-rose-600 font-medium mt-1">
                {errors.acceptedTerms}
              </p>
            )}
          </div>

          {errors.form && (
            <p className="text-xs text-rose-600 font-semibold p-2.5 rounded-lg bg-rose-50 border border-rose-200">
              {errors.form}
            </p>
          )}

          {/* Form Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/25 hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Checking requirements...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Create Student Space</span>
              </>
            )}
          </button>
        </form>

        {/* Submission Feedback & Explicit Backend Notice */}
        {submissionFeedback && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Authentication Integration Pending</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              {submissionFeedback}
            </p>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              No credentials were saved or sent over the network. To explore the next screen in the design flow, use the preview path below:
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <Link
                href={`/onboarding?stage=${stage.id}&preview=true`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#6757F5] bg-white border border-[#DDD8FE] hover:bg-[#EDEAFF] transition-colors"
              >
                <span>Design Preview: Continue to Flow 3 Onboarding Preview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/dashboard/student"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-xs transition-colors"
              >
                <span>Enter Student Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Prototype Scope Banner */}
        <div className="mt-6">
          <PrototypeNotice message="Prototype Mode: No credentials, tokens, or sessions are stored or transmitted. Do not enter a real or personal password." />
        </div>

        {/* Footer Link */}
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
          Loading...
        </div>
      }
    >
      <StudentSignUpContent />
    </Suspense>
  );
}
