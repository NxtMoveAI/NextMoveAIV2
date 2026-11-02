/**
 * NEXT MOVE AI V2 — PARENT APP SHELL
 * 
 * Accessible layout frame for the Guardian Observation Portal.
 */

"use client";

import React from "react";
import Link from "next/link";
import { Users, ArrowRight, LogOut } from "lucide-react";
import { MOCK_PARENT_PROFILE } from "../data/mock-parent-data";

interface ParentAppShellProps {
  children: React.ReactNode;
}

export function ParentAppShell({ children }: ParentAppShellProps) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171A2B] flex flex-col font-sans antialiased overflow-x-hidden selection:bg-[#EDEAFF] selection:text-[#6757F5]">
      {/* Accessibility Skip Link */}
      <a
        href="#parent-main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#6757F5] text-white font-bold rounded-xl shadow-lg"
      >
        Skip to main guardian workspace
      </a>

      {/* Top Guardian Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E6F3] px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Portal Badge */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-base font-black tracking-tight text-[#171A2B] hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-xl bg-[#6757F5] text-white flex items-center justify-center font-black text-sm shadow-sm">
                N
              </div>
              <span className="hidden sm:inline">Next Move AI</span>
            </Link>

            <span className="text-[11px] font-bold uppercase tracking-wider text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-3 py-1 rounded-full flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Guardian Observation Portal</span>
            </span>
          </div>

          {/* Parent Identity & Quick Navigation */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-bold text-[#171A2B]">{MOCK_PARENT_PROFILE.name}</span>
              <span className="text-[10px] text-[#8F95B2]">Verified Guardian (Demo)</span>
            </div>

            <Link
              href="/dashboard/student"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DDD8FE] bg-[#F7F6FF] text-[#6757F5] text-xs font-bold hover:bg-[#EDEAFF] transition-all"
              title="Switch to Student Workspace Demo"
            >
              <span>View Student Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/sign-in"
              className="p-2 text-[#8F95B2] hover:text-[#171A2B] rounded-xl hover:bg-[#F4F3F8] transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main
        id="parent-main-content"
        tabIndex={-1}
        className="flex-1 px-4 sm:px-6 lg:px-8 py-6 pb-16 max-w-7xl w-full mx-auto outline-none"
      >
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E8E6F3] py-6 px-4 sm:px-6 text-center text-xs text-[#8F95B2]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Next Move AI V2 • Guardian Transparency & Student Agency</span>
          <span className="text-[11px] text-[#626987]">
            Prototype Demonstration • Authentic parent-child authorization handled by backend server
          </span>
        </div>
      </footer>
    </div>
  );
}
