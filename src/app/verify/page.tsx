"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Mail,
  Clock,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { PrototypeNotice } from "@/components/auth/PrototypeNotice";
import { type VerificationType } from "@/lib/api-contracts";

function VerifyContent() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("type") as VerificationType) || "email_pending";

  const [activeType, setActiveType] = useState<VerificationType>(initialType);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  const handleResend = () => {
    setResendStatus("Simulated verification link re-sent! Check your inbox.");
    setTimeout(() => setResendStatus(null), 4000);
  };

  return (
    <AuthLayout
      role="general"
      backHref="/sign-in"
      backLabel="Back to Sign In"
    >
      <AuthCard>
        {/* State 1: Email Pending */}
        {activeType === "email_pending" && (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider border border-[#DDD8FE]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Email Verification Required</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
              Check your email inbox
            </h1>

            <p className="text-xs sm:text-sm text-[#474D66] leading-relaxed max-w-md mx-auto">
              We&apos;ve sent a verification link to your email address. Clicking the link confirms your ownership and unlocks your space.
            </p>

            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] text-left text-xs text-[#626987] space-y-1">
              <div className="font-bold text-[#171A2B]">Didn&apos;t receive the email?</div>
              <p>Check your spam or junk folder, or request a new verification link below.</p>
            </div>

            {resendStatus && (
              <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                {resendStatus}
              </p>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResend}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resend Verification Link</span>
              </button>

              <Link
                href="/sign-in"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#31364F] bg-white border border-[#E8E6F3] hover:bg-[#FAF9F6]"
              >
                <span>Back to Sign In</span>
              </Link>
            </div>
          </div>
        )}

        {/* State 2: Email Expired */}
        {activeType === "email_expired" && (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200">
              <Clock className="w-3.5 h-3.5" />
              <span>Link Expired</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
              Verification link expired
            </h1>

            <p className="text-xs sm:text-sm text-[#474D66] leading-relaxed max-w-md mx-auto">
              For security, email verification links expire after 24 hours. Request a new link to continue setting up your account.
            </p>

            {resendStatus && (
              <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                {resendStatus}
              </p>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={handleResend}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Request New Link</span>
              </button>
            </div>
          </div>
        )}

        {/* State 3: Guardian Approval Pending */}
        {activeType === "guardian_pending" && (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFFBF0] text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Awaiting Guardian Authorization</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
              Guardian approval pending
            </h1>

            <p className="text-xs sm:text-sm text-[#474D66] leading-relaxed max-w-md mx-auto">
              Under digital minor safety guidelines, your parent or guardian must authorize your student space before you begin Flow 3 onboarding.
            </p>

            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] text-left text-xs text-[#626987] space-y-2">
              <div className="font-bold text-[#171A2B]">What needs to happen next:</div>
              <ul className="list-disc pl-4 space-y-1">
                <li>Your parent or guardian checks their email for the authorization invite.</li>
                <li>They approve your request through their secure link.</li>
                <li>Your space automatically unlocks—no passwords or private notes are shared.</li>
              </ul>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/guardian-support"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md transition-all"
              >
                <span>Guardian Support Information</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* State 4: Backend Unavailable */}
        {activeType === "backend_unavailable" && (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold uppercase tracking-wider border border-rose-200">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Service Status</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
              Backend service temporarily offline
            </h1>

            <p className="text-xs sm:text-sm text-[#474D66] leading-relaxed max-w-md mx-auto">
              The authentication and verification service is undergoing scheduled integration. Please check back shortly.
            </p>

            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-[#31364F] bg-white border border-[#E8E6F3] hover:bg-[#FAF9F6]"
              >
                <span>Return to Landing Page</span>
              </Link>
            </div>
          </div>
        )}

        {/* QA Mode Switcher for Quick State Review */}
        <div className="mt-8 pt-4 border-t border-[#E8E6F3] text-left space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[#626987] font-semibold">
            <span>QA Verification States:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px]">
            <button
              type="button"
              onClick={() => setActiveType("email_pending")}
              className={`p-2 rounded-lg border text-center transition-colors ${
                activeType === "email_pending"
                  ? "bg-[#6757F5] text-white border-[#6757F5]"
                  : "bg-white text-[#31364F] border-[#E8E6F3]"
              }`}
            >
              Email Pending
            </button>

            <button
              type="button"
              onClick={() => setActiveType("email_expired")}
              className={`p-2 rounded-lg border text-center transition-colors ${
                activeType === "email_expired"
                  ? "bg-[#6757F5] text-white border-[#6757F5]"
                  : "bg-white text-[#31364F] border-[#E8E6F3]"
              }`}
            >
              Link Expired
            </button>

            <button
              type="button"
              onClick={() => setActiveType("guardian_pending")}
              className={`p-2 rounded-lg border text-center transition-colors ${
                activeType === "guardian_pending"
                  ? "bg-[#6757F5] text-white border-[#6757F5]"
                  : "bg-white text-[#31364F] border-[#E8E6F3]"
              }`}
            >
              Guardian Pending
            </button>

            <button
              type="button"
              onClick={() => setActiveType("backend_unavailable")}
              className={`p-2 rounded-lg border text-center transition-colors ${
                activeType === "backend_unavailable"
                  ? "bg-[#6757F5] text-white border-[#6757F5]"
                  : "bg-white text-[#31364F] border-[#E8E6F3]"
              }`}
            >
              Unavailable
            </button>
          </div>
        </div>

        {/* Prototype Scope Banner */}
        <div className="mt-5">
          <PrototypeNotice message="Verification actions are simulated in frontend prototype mode. Havyas will configure Supabase Auth email redirect links and token verification." />
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-sm text-[#626987]">
          Loading...
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
