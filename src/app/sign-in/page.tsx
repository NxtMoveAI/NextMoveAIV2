"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  ArrowRight,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { FormField } from "@/components/auth/FormField";
import { signInWithEmail } from "@/lib/auth-service";
import { getUserProfile } from "@/lib/firestore-service";

function getFriendlySignInErrorMessage(code?: string, rawMessage?: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-login-credentials":
      return "Incorrect email or password. Please check your credentials and try again.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/too-many-requests":
      return "Too many unsuccessful attempts. Access is temporarily locked. Please wait a moment or reset your password.";
    case "auth/network-request-failed":
      return "Network error: Unable to reach authentication servers. Please check your internet connection.";
    default:
      if (rawMessage && !rawMessage.includes("Firebase:") && !rawMessage.includes("auth/")) {
        return rawMessage;
      }
      return "Unable to sign in. Please check your credentials and try again.";
  }
}

function SignInContent() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
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
    if (!validate() || isLoading) return;

    setIsLoading(true);
    setErrors({});

    try {
      // 1. Authenticate with Firebase Email/Password
      const authResult = await signInWithEmail(email.trim(), password);

      if (!authResult.success || !authResult.user) {
        setIsLoading(false);
        const friendlyMsg = getFriendlySignInErrorMessage(
          authResult.error?.code,
          authResult.error?.message
        );
        setErrors({ form: friendlyMsg });
        return;
      }

      const uid = authResult.user.uid;

      // 2. Fetch authenticated user profile from Cloud Firestore
      const profileResult = await getUserProfile(uid);

      if (!profileResult.success) {
        setIsLoading(false);
        setErrors({
          form: "Unable to retrieve your user profile from server. Please check your connection and try again.",
        });
        return;
      }

      const profile = profileResult.data;

      // 3. Verify user profile exists in Firestore
      if (!profile) {
        setIsLoading(false);
        setErrors({
          form: "Your user profile was not found in our records. Please contact support or complete registration.",
        });
        return;
      }

      // 4. Role-based redirection strictly driven by verified Firestore profile
      const normalizedRole = (profile.role || "").toLowerCase().trim();

      if (normalizedRole === "student") {
        if (profile.academicStage) {
          router.push(`/dashboard/student?stage=${encodeURIComponent(profile.academicStage)}`);
        } else {
          router.push("/dashboard/student");
        }
        return;
      }

      if (normalizedRole === "parent" || normalizedRole === "guardian") {
        router.push("/dashboard/parent");
        return;
      }

      // Disallow workspace access for unknown roles
      setIsLoading(false);
      setErrors({
        form: "Unrecognized account role. Please contact support for access assistance.",
      });
    } catch {
      setIsLoading(false);
      setErrors({
        form: "An unexpected error occurred while signing in. Please try again.",
      });
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

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
          <FormField
            id="signin-email"
            label="Email Address"
            type="email"
            placeholder="student@example.com or parent@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
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
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
              }}
              error={errors.password}
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
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold block text-rose-900">Sign In Error</span>
                <p className="leading-relaxed">{errors.form}</p>
              </div>
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
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

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
