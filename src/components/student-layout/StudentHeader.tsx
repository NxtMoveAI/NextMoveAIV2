/**
 * NEXT MOVE AI V2 — SHARED STUDENT HEADER
 * 
 * Top bar providing context badge, quick action, and student profile menu.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useStudentHome } from "@/features/student-home/hooks/useStudentHome";
import { studentProfileStore } from "@/features/student-home/services/profile-store";

export function StudentHeader() {
  const router = useRouter();
  const { viewModel, hasConfirmedProfile } = useStudentHome();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 w-full h-16 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E8E6F3] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left side: Mobile brand OR Desktop Academic Stage Badge */}
      <div className="flex items-center gap-3">
        {/* Mobile brand (hidden on desktop) */}
        <Link
          href="/"
          className="lg:hidden flex items-center gap-2"
          aria-label="Next Move AI Homepage"
        >
          <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-[#E4E1F8] bg-white flex items-center justify-center p-0.5">
            <Image
              src="/logo.png"
              alt="Next Move AI"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <span className="font-bold text-sm tracking-tight text-[#171A2B]">
            Next Move <span className="text-[#6757F5]">AI</span>
          </span>
        </Link>

        {/* Academic context pill or neutral Student Workspace */}
        {hasConfirmedProfile ? (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DDD8FE] text-xs shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#059669]" />
            <span className="font-semibold text-[#171A2B]">
              {viewModel.academicSummary}
            </span>
            <span className="text-[10px] uppercase font-bold text-[#6757F5] bg-[#EDEAFF] px-1.5 py-0.2 rounded-full">
              {viewModel.academicStageLabel}
            </span>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8E6F3] text-xs shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#8C93AD]" />
            <span className="font-semibold text-[#171A2B]">
              Student Workspace
            </span>
          </div>
        )}
      </div>

      {/* Right side: Quick Action & User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Partner CTA */}
        <Link
          href="#partner-preview"
          aria-label="Ask Partner"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EDEAFF] hover:bg-[#DDD8FE] text-[#6757F5] text-xs font-bold transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden xs:inline">Ask Partner</span>
        </Link>

        {/* User profile dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-1.5 p-1 rounded-full hover:bg-white border border-transparent hover:border-[#E8E6F3] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
            aria-expanded={menuOpen}
            aria-haspopup="true"
            aria-label={hasConfirmedProfile ? "Student Account Menu" : "Account Options"}
          >
            <div className="w-8 h-8 rounded-full bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center font-bold text-xs shadow-sm">
              {hasConfirmedProfile && viewModel.studentName ? (
                viewModel.studentName.charAt(0).toUpperCase()
              ) : (
                <User className="w-4 h-4 text-[#6757F5]" />
              )}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#626987]" />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-[#E8E6F3] shadow-xl py-2 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-[#E8E6F3]">
                  <p className="text-xs font-bold text-[#171A2B]">
                    {hasConfirmedProfile && viewModel.studentName
                      ? viewModel.studentName
                      : "Student Workspace"}
                  </p>
                  <p className="text-[11px] text-[#626987] truncate">
                    {hasConfirmedProfile
                      ? viewModel.academicSummary
                      : "Anonymous Prototype Session"}
                  </p>
                </div>

                <div className="py-1">
                  {hasConfirmedProfile ? (
                    <>
                      <Link
                        href="/dashboard/student/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#31364F] hover:bg-[#F4F3F8] transition-colors"
                      >
                        <User className="w-4 h-4 text-[#626987]" />
                        <span>Starting Profile Baseline</span>
                      </Link>

                      <Link
                        href="/dashboard/student/settings"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#31364F] hover:bg-[#F4F3F8] transition-colors"
                      >
                        <Settings className="w-4 h-4 text-[#626987]" />
                        <span>Settings & Preferences</span>
                      </Link>
                    </>
                  ) : (
                    <Link
                      href="/onboarding"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#6757F5] font-semibold hover:bg-[#EDEAFF] transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-[#6757F5]" />
                      <span>Start Onboarding</span>
                    </Link>
                  )}

                  <a
                    href="#faq"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#31364F] hover:bg-[#F4F3F8] transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-[#626987]" />
                    <span>Help & Guidance</span>
                  </a>
                </div>

                <div className="pt-1 border-t border-[#E8E6F3]">
                  {hasConfirmedProfile ? (
                    <button
                      type="button"
                      onClick={() => {
                        studentProfileStore.clearConfirmedProfile();
                        setMenuOpen(false);
                        router.push("/sign-in");
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#DC2626] hover:bg-[#FEF2F2] transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 text-[#DC2626]" />
                      <span>Sign Out</span>
                    </button>
                  ) : (
                    <div className="space-y-1 p-2">
                      <Link
                        href="/sign-in"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-[#6757F5] hover:bg-[#EDEAFF] transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-[#6757F5]" />
                        <span>Sign In</span>
                      </Link>
                      <Link
                        href="/get-started"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-[#059669] hover:bg-[#ECFDF5] transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
                        <span>Get Started</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
