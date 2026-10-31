/**
 * NEXT MOVE AI V2 — SHARED STUDENT APPLICATION SHELL
 * 
 * Unified frame hosting desktop sidebar, responsive header, mobile navigation,
 * and the main content area with accessible skip links and zero horizontal overflow.
 */

"use client";

import React from "react";
import { StudentSidebar } from "./StudentSidebar";
import { StudentHeader } from "./StudentHeader";
import { StudentMobileNav } from "./StudentMobileNav";

interface StudentAppShellProps {
  children: React.ReactNode;
}

export function StudentAppShell({ children }: StudentAppShellProps) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171A2B] flex flex-col lg:flex-row font-sans antialiased overflow-x-hidden selection:bg-[#EDEAFF] selection:text-[#6757F5]">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#6757F5] text-white font-bold rounded-xl shadow-lg"
      >
        Skip to main student workspace
      </a>

      {/* Desktop Navigation Sidebar */}
      <StudentSidebar />

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0">
        <StudentHeader />

        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12 max-w-7xl w-full mx-auto outline-none"
        >
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <StudentMobileNav />
    </div>
  );
}

