"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  Sliders,
  Sparkles,
} from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { FormField } from "@/components/auth/FormField";
import { PrototypeNotice } from "@/components/auth/PrototypeNotice";
import { submitSignIn } from "@/lib/auth-adapter";

function SignInContent() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // QA simulation state switcher
  const [simState, setSimState] = useState<
    "normal" | "backend_unavailable" | "unverified_email" | "guardian_pending"
  >("normal");

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!password) {
      errs.password = "Please enter your password.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setFeedback(null);

    const result = await submitSignIn(
      {
        email,
        passwordHash: "not_logged_or_persisted",
      },
      simState === "normal" ? "success" : simState
    );

    setIsLoading(false);

    if (result.success) {
      setFeedback(
        "Authentication request submitted. When secure backend authentication is connected by Havyas, you will be redirected to your personal dashboard or onboarding."
      );
    } else if (result.error) {
      if (result.error.errorCode === "UNVERIFIED_EMAIL") {
        router.push("/verify?type=email_pending");
      } else if (result.error.errorCode === "GUARDIAN_APPROVAL_PENDING") {
        router.push("/verify?type=guardian_pending");
      } else {
        setErrors({ form: result.error.message });
      }
    }
  };

  return (
    <AuthLayout
      role="general"
      backHref="/"
      backLabel="Return to Landing Page"
    >
      <AuthCard>
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-2 border border-[#DDD8FE]">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure Access</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
            Welcome back. Your journey continues.
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#626987] leading-relaxed">
            Sign in to access your private exploration space, evidence log, or parent summaries.
          </p>
        </div>

        {/* Public Demo & Evaluation Environment Notice */}
        <div className="mb-6 p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-left text-xs text-[#92400E] space-y-1 shadow-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
            <span className="font-bold text-[#D97706] uppercase tracking-wider text-[11px]">
              Demonstration &amp; Evaluation Environment
            </span>
          </div>
          <p className="text-[11px] text-[#78350F] leading-relaxed">
            Operational authentication is currently in active backend development. <strong>Do not enter real personal passwords or credentials.</strong> Use the instant demo shortcuts below to evaluate the student and guardian workspaces safely.
          </p>
        </div>

        {/* Quick Demo Access - Direct Access to Signed-In Pages */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#F7F6FF] to-[#FAF8FF] border border-[#DDD8FE] text-left space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#6757F5] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Signed-In Workspace (Demo)</span>
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-[#6757F5] border border-[#DDD8FE]">
              Instant Access
            </span>
          </div>
          <p className="text-xs text-[#474D66] leading-relaxed">
            Directly open the interactive student workspace or guardian portal to explore all post-signin pages:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <Link
              href="/dashboard/student"
              className="inline-flex items-center justify-between p-3 rounded-xl bg-white border border-[#DDD8FE] hover:border-[#6757F5] hover:shadow-xs transition-all text-left group"
            >
              <div>
                <span className="text-xs font-bold text-[#171A2B] group-hover:text-[#6757F5] block">
                  Student Workspace &rarr;
                </span>
                <span className="text-[10px] text-[#626987]">
                  Home, Explore, Fit, Projects, Partner
                </span>
              </div>
            </Link>
            <Link
              href="/dashboard/parent"
              className="inline-flex items-center justify-between p-3 rounded-xl bg-white border border-[#DDD8FE] hover:border-[#6757F5] hover:shadow-xs transition-all text-left group"
            >
              <div>
                <span className="text-xs font-bold text-[#171A2B] group-hover:text-[#6757F5] block">
                  Guardian Portal &rarr;
                </span>
                <span className="text-[10px] text-[#626987]">
                  Parent observation &amp; discussion guides
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
          <FormField
            id="signin-email"
            label="Email Address"
            type="email"
            placeholder="student@example.com or parent@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
            autoComplete="email"
          />

          <div>
            <FormField
              id="signin-password"
              label="Password"
              isPassword
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              hint="Demo Note: Do NOT enter a real personal password; use a sample value like DemoPass123!."
              required
              autoComplete="current-password"
            />

            <div className="mt-1.5 text-right">
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-[#6757F5] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {errors.form && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errors.form}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/25 hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Feedback / Pending State Message */}
        {feedback && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Backend Authentication Pending</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">{feedback}</p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <Link
                href="/dashboard/student"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5342E8] shadow-xs transition-colors"
              >
                <span>Enter Student Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/dashboard/parent"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#DDD8FE] text-[#6757F5] text-xs font-bold hover:bg-[#EDEAFF] transition-colors"
              >
                <span>Enter Guardian Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* QA Simulation Switcher (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 pt-4 border-t border-[#E8E6F3] text-left space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#626987] font-semibold">
              <span className="flex items-center gap-1">
                <Sliders className="w-3 h-3 text-[#6757F5]" />
                <span>QA Backend Response Simulator (Dev Only):</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <button
                type="button"
                onClick={() => {
                  setSimState("normal");
                  setErrors({});
                }}
                className={`p-2 rounded-lg border text-left transition-colors ${
                  simState === "normal"
                    ? "bg-[#6757F5] text-white border-[#6757F5]"
                    : "bg-white text-[#31364F] border-[#E8E6F3]"
                }`}
              >
                1. Standard Pending
              </button>
              <button
                type="button"
                onClick={() => {
                  setSimState("backend_unavailable");
                  setErrors({});
                }}
                className={`p-2 rounded-lg border text-left transition-colors ${
                  simState === "backend_unavailable"
                    ? "bg-[#6757F5] text-white border-[#6757F5]"
                    : "bg-white text-[#31364F] border-[#E8E6F3]"
                }`}
              >
                2. Backend 503 Unavailable
              </button>
              <button
                type="button"
                onClick={() => {
                  setSimState("unverified_email");
                  setErrors({});
                }}
                className={`p-2 rounded-lg border text-left transition-colors ${
                  simState === "unverified_email"
                    ? "bg-[#6757F5] text-white border-[#6757F5]"
                    : "bg-white text-[#31364F] border-[#E8E6F3]"
                }`}
              >
                3. Unverified Email (403)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSimState("guardian_pending");
                  setErrors({});
                }}
                className={`p-2 rounded-lg border text-left transition-colors ${
                  simState === "guardian_pending"
                    ? "bg-[#6757F5] text-white border-[#6757F5]"
                    : "bg-white text-[#31364F] border-[#E8E6F3]"
                }`}
              >
                4. Guardian Pending (403)
              </button>
            </div>
          </div>
        )}

        {/* Prototype Scope Banner */}
        <div className="mt-5">
          <PrototypeNotice message="Prototype Mode: No credentials, tokens, or sessions are stored or transmitted. Do not enter a real or personal password." />
        </div>

        {/* New User Action */}
        <div className="mt-6 pt-4 border-t border-[#E8E6F3] text-center text-xs text-[#626987]">
          <span>New to Next Move AI? </span>
          <Link
            href="/get-started"
            className="font-bold text-[#6757F5] hover:underline"
          >
            Get Started
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-sm text-[#626987]">
          Loading...
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
