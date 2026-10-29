"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { KeyRound, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { FormField } from "@/components/auth/FormField";
import { PrototypeNotice } from "@/components/auth/PrototypeNotice";

function ForgotPasswordContent() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid registered email address.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <AuthLayout
      role="general"
      backHref="/sign-in"
      backLabel="Back to Sign In"
    >
      <AuthCard>
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-2 border border-[#DDD8FE]">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Password Recovery</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
            Reset your password
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#626987] leading-relaxed">
            Enter your registered email address and we&apos;ll send you instructions to reset your password.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
            <FormField
              id="recovery-email"
              label="Email Address"
              type="email"
              placeholder="student@example.com or parent@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error || undefined}
              required
              autoComplete="email"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/25 hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting request...</span>
                </>
              ) : (
                <>
                  <span>Send Recovery Instructions</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="p-5 rounded-2xl bg-[#F0EFFE] border border-[#DDD8FE] text-left space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#6757F5]">
              <CheckCircle2 className="w-5 h-5 text-[#35B8C5]" />
              <span>Password Recovery Request Prepared</span>
            </div>

            <p className="text-xs text-[#31364F] leading-relaxed">
              If an account with <strong className="text-[#171A2B]">{email}</strong> exists, reset instructions will be sent once the backend email provider is connected by Havyas.
            </p>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-semibold text-[#6757F5] hover:underline"
              >
                Send another reset link
              </button>
            </div>
          </div>
        )}

        {/* Prototype Scope Banner */}
        <div className="mt-6">
          <PrototypeNotice message="No real emails are sent or reset tokens generated in frontend prototype mode. Havyas will configure transactional email templates." />
        </div>

        {/* Return to Sign In */}
        <div className="mt-6 pt-4 border-t border-[#E8E6F3] text-center text-xs text-[#626987]">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-1.5 font-bold text-[#6757F5] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sign In</span>
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-sm text-[#626987]">
          Loading...
        </div>
      }
    >
      <ForgotPasswordContent />
    </Suspense>
  );
}
