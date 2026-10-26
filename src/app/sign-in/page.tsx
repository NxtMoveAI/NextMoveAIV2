"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Sparkles,
  Lock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171A2B] flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-[#E8E6F3] bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white p-0.5 border border-[#E8E6F3] flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Next Move AI"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Next Move <span className="text-[#6757F5]">AI</span>
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#626987] hover:text-[#171A2B] px-3 py-1.5 rounded-lg border border-[#E8E6F3] hover:bg-[#FAF9F6]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Landing Page</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 py-12 flex-1 flex flex-col justify-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#DDD8FE] shadow-xl text-center">
          {/* Lock Icon */}
          <div className="w-12 h-12 rounded-2xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center mx-auto mb-5">
            <Lock className="w-6 h-6" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F6] text-[#626987] text-xs font-semibold border border-[#E8E6F3] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>Phase 2 Authentication Route</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] tracking-tight">
            Student & Parent Sign In
          </h1>

          <p className="mt-3 text-sm text-[#626987] leading-relaxed">
            Authentication, age verification, and student profile persistence are scheduled
            for Phase 2 backend integration with Supabase.
          </p>

          <div className="mt-6 p-5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] text-left space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#6757F5]">
              Scope Boundary Notice:
            </div>
            <p className="text-xs text-[#31364F] leading-relaxed">
              In accordance with Phase 1 design boundaries, no fake login forms or dummy
              credentials are used. You can explore all interactive features directly on
              the landing page without an account!
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#35B8C5] font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Full privacy by design — no credentials collected in public preview</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/#explorer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/25"
            >
              <span>Explore Without Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#31364F] bg-white border border-[#E8E6F3] hover:bg-[#FAF9F6]"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-[#E8E6F3] text-center text-xs text-[#626987]">
        A product by Navlore AI Technologies LLP.
      </footer>
    </div>
  );
}
