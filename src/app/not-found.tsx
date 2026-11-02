/**
 * NEXT MOVE AI V2 — GLOBAL 404 NOT FOUND PAGE
 * 
 * Branded, accessible fallback for missing routes.
 * Designed with Electric Iris, Deep Ink, and Warm Off-White.
 */

import React from "react";
import Link from "next/link";
import { Compass, Home, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Page Not Found • Next Move AI V2",
  description: "The requested career discovery page or resource could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171A2B] flex flex-col justify-between font-sans antialiased px-4 py-8 sm:py-12">
      {/* Top Brand Bar */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between pb-6 border-b border-[#E8E6F3]">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-base font-black tracking-tight text-[#171A2B] hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-xl bg-[#6757F5] text-white flex items-center justify-center font-black text-sm shadow-sm">
            N
          </div>
          <span>Next Move AI</span>
        </Link>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#6757F5] bg-[#EDEAFF] px-3 py-1 rounded-full border border-[#DDD8FE]">
          Navigation Assistance
        </span>
      </header>

      {/* Main 404 Content */}
      <main className="max-w-xl w-full mx-auto text-center py-12 sm:py-16 space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-[#EDEAFF] text-[#6757F5] mx-auto flex items-center justify-center border border-[#DDD8FE] shadow-sm">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-[#6757F5]">
            Error 404 • Pathway Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#171A2B] tracking-tight">
            We couldn&apos;t find that page
          </h1>
          <p className="text-sm sm:text-base text-[#626987] max-w-md mx-auto leading-relaxed">
            The link may be outdated, or the experimental pathway you are looking for has been reorganized.
          </p>
        </div>

        {/* Action recovery buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard/student"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#6757F5] text-white text-sm font-bold shadow-md shadow-[#6757F5]/20 hover:bg-[#5342E8] transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Student Home</span>
          </Link>
          <Link
            href="/dashboard/student/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white border border-[#DDD8FE] text-[#6757F5] text-sm font-bold hover:bg-[#F7F6FF] transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Possibilities</span>
          </Link>
        </div>

        {/* Informational help note */}
        <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-left max-w-md mx-auto">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-[#6757F5] shrink-0 mt-0.5" />
            <div className="text-xs text-[#474D66] space-y-1">
              <p className="font-bold text-[#171A2B]">Looking for a specific stage or tool?</p>
              <p>
                All student discovery workflows (Explore, Validate Fit, and My Projects) are accessible from the main dashboard.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl w-full mx-auto pt-6 border-t border-[#E8E6F3] text-center text-xs text-[#8F95B2]">
        Next Move AI V2 • Empowering student clarity across academic transitions.
      </footer>
    </div>
  );
}
