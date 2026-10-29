"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import {
  Users,
  ArrowRight,
  ShieldCheck,
  Lock,
  Loader2,
  HeartHandshake,
} from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { FormField } from "@/components/auth/FormField";
import { PrototypeNotice } from "@/components/auth/PrototypeNotice";
import { submitParentRegistration } from "@/lib/auth-adapter";
import {
  type ParentAccountRoleType,
  PARENT_ROLE_OPTIONS,
} from "@/data/flow2-config";

function ParentSignUpContent() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roleType, setRoleType] = useState<ParentAccountRoleType>("parent_guardian");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    } else if (fullName.trim().length < 2) {
      errs.fullName = "Name must be at least 2 characters.";
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
      errs.acceptedTerms = "Please agree to the guardian terms and privacy notice.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSubmissionFeedback(null);

    const result = await submitParentRegistration({
      fullName,
      email,
      passwordHash: "simulated_parent_hash",
      relationship: roleType === "parent_guardian" ? "parent" : "educator_sponsor",
      acceptedTermsVersion: "v2.0-draft",
    });

    setIsLoading(false);

    if (result.success) {
      setSubmissionFeedback(
        "Parent account creation proposal submitted. Secure authentication and verification will activate when backend services by Havyas are connected."
      );
    } else if (result.error) {
      setErrors({ form: result.error.message });
    }
  };

  return (
    <AuthLayout
      role="parent"
      backHref="/get-started"
      backLabel="Change Role"
    >
      <AuthCard>
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-2 border border-[#DDD8FE]">
            <Users className="w-3.5 h-3.5" />
            <span>Parent & Guardian Entry</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
            Support their journey, one step at a time.
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#626987] leading-relaxed">
            Stay involved in ways that encourage exploration and informed decisions.
          </p>
        </div>

        {/* Informative Guidance Card */}
        <div className="mb-6 p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#6757F5]">
            <HeartHandshake className="w-4 h-4 text-[#35B8C5]" />
            <span>Respectful Student-Parent Architecture</span>
          </div>
          <p className="text-xs text-[#31364F] leading-relaxed">
            You will receive calm milestone digests and structured discussion frameworks. Student-parent linkage requires mutual authorization—no child&apos;s private details are requested during initial parent signup.
          </p>
        </div>

        {/* Parent Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
          <FormField
            id="parent-name"
            label="Full Name"
            placeholder="e.g. Meera Sharma"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={errors.fullName}
            required
            autoComplete="name"
          />

          <FormField
            id="parent-email"
            label="Email Address"
            type="email"
            placeholder="parent@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            hint="Used for account verification and digest updates"
            required
            autoComplete="email"
          />

          {/* Account Role Classification */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#171A2B]">
              Account Role & Guardian Authority <span className="text-[#6757F5]">*</span>
            </label>
            <div
              role="radiogroup"
              aria-label="Parent or Mentor Role Choices"
              className="grid grid-cols-1 gap-2"
            >
              {PARENT_ROLE_OPTIONS.map((opt) => {
                const isSelected = roleType === opt.id;
                return (
                  <div
                    key={opt.id}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onClick={() => setRoleType(opt.id)}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        setRoleType(opt.id);
                      }
                    }}
                    className={`p-3 rounded-xl border-2 transition-all cursor-pointer text-left flex items-start gap-2.5 focus:outline-hidden focus:ring-2 focus:ring-[#6757F5] ${
                      isSelected
                        ? "bg-[#FAF9F6] border-[#6757F5] ring-2 ring-[#EDEAFF]"
                        : "bg-white border-[#E8E6F3] hover:border-[#DDD8FE]"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? "border-[#6757F5] bg-[#6757F5] text-white"
                          : "border-[#C7C4E2] bg-white"
                      }`}
                    >
                      {isSelected && <div className="w-1 h-1 rounded-full bg-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[#171A2B]">
                          {opt.title}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                            opt.canAuthorizeMinors
                              ? "bg-purple-50 text-[#6757F5] border-[#DDD8FE]"
                              : "bg-gray-50 text-gray-600 border-gray-200"
                          }`}
                        >
                          {opt.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#474D66] mt-0.5 leading-normal">
                        {opt.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-[#626987]">
              Selecting a role does not grant automatic access. Legal guardian verification occurs securely through the backend.
            </p>
          </div>

          <FormField
            id="parent-password"
            label="Password"
            isPassword
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            hint="Minimum 8 characters. Demo Note: Do NOT enter a real personal password; use a sample value like DemoPass123!."
            required
            autoComplete="new-password"
          />

          <FormField
            id="parent-confirm-password"
            label="Confirm Password"
            isPassword
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
          />

          {/* Post-Verification Linking Architecture Notice */}
          <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#DDD8FE] text-left space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#171A2B]">
              <Lock className="w-3.5 h-3.5 text-[#6757F5]" />
              <span>Student Account Linking Occurs Post-Verification</span>
            </div>
            <p className="text-[11px] text-[#626987] leading-relaxed">
              To protect student privacy, parent-student linkage cannot be established during initial signup. Mutual linking is initiated only after both accounts are verified and authenticated.
            </p>
          </div>

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
                  Parent Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-[#6757F5] font-semibold underline">
                  Guardian Privacy Commitment
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

          {/* Submit Button */}
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
                <span>Create Parent Space</span>
              </>
            )}
          </button>
        </form>

        {/* Submission Feedback */}
        {submissionFeedback && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Backend Authentication Pending</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              {submissionFeedback}
            </p>
          </div>
        )}

        {/* Future-Ready States Preview (QA Switcher - Dev Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 pt-4 border-t border-[#E8E6F3] space-y-2 text-left">
            <div className="flex items-center justify-between text-[11px] text-[#626987] font-semibold">
              <span>Future Backend States Preview (Dev Only):</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <Link
                href="/verify?type=email_pending"
                className="p-2 rounded-lg bg-white border border-[#E8E6F3] hover:border-[#6757F5] text-[#31364F] flex items-center justify-between"
              >
                <span>1. Account Verification</span>
                <ArrowRight className="w-3 h-3 text-[#6757F5]" />
              </Link>

              <Link
                href="/verify?type=guardian_pending"
                className="p-2 rounded-lg bg-white border border-[#E8E6F3] hover:border-[#6757F5] text-[#31364F] flex items-center justify-between"
              >
                <span>2. Relationship Verification</span>
                <ArrowRight className="w-3 h-3 text-[#6757F5]" />
              </Link>
            </div>
          </div>
        )}

        {/* Prototype Scope Banner */}
        <div className="mt-5">
          <PrototypeNotice message="Prototype Mode: No credentials, family relationships, or student linkages are stored. Do not enter a real or personal password." />
        </div>

        {/* Sign In Link */}
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

export default function ParentSignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-sm text-[#626987]">
          Loading...
        </div>
      }
    >
      <ParentSignUpContent />
    </Suspense>
  );
}
