/**
 * NEXT MOVE AI V2 — GLOBAL APPLICATION ERROR BOUNDARY
 * 
 * Accessible, resilient error screen for unhandled runtime exceptions.
 * Never exposes raw internal stack traces to end users.
 */

"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log sanitized error reference internally for monitoring without leaking stack to UI
    if (process.env.NODE_ENV !== "production") {
      console.error("[Next Move AI Runtime Boundary]:", error.message);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171A2B] flex flex-col justify-between font-sans antialiased px-4 py-8 sm:py-12">
      {/* Header */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between pb-6 border-b border-[#E8E6F3]">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-base font-black tracking-tight text-[#171A2B]"
        >
          <div className="w-8 h-8 rounded-xl bg-[#6757F5] text-white flex items-center justify-center font-black text-sm shadow-sm">
            N
          </div>
          <span>Next Move AI</span>
        </Link>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#D97706] bg-[#FEF3C7] px-3 py-1 rounded-full border border-[#FDE68A]">
          Safe Recovery State
        </span>
      </header>

      {/* Main Content */}
      <main className="max-w-xl w-full mx-auto text-center py-12 sm:py-16 space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-[#FEF2F2] text-[#DC2626] mx-auto flex items-center justify-center border border-[#FECACA] shadow-sm">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-[#DC2626]">
            Application Notice
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#171A2B] tracking-tight">
            Something unexpected occurred
          </h1>
          <p className="text-sm sm:text-base text-[#626987] max-w-md mx-auto leading-relaxed">
            Don&apos;t worry — your active session data and saved exploration progress are intact.
          </p>
        </div>

        {/* Action recovery buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#6757F5] text-white text-sm font-bold shadow-md shadow-[#6757F5]/20 hover:bg-[#5342E8] transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/dashboard/student"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white border border-[#DDD8FE] text-[#6757F5] text-sm font-bold hover:bg-[#F7F6FF] transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Student Home</span>
          </Link>
        </div>

        {/* Sanitized Reference Digest */}
        {error.digest && (
          <div className="p-3.5 rounded-2xl bg-white border border-[#E8E6F3] text-left max-w-md mx-auto">
            <div className="flex items-center gap-2 text-xs text-[#8F95B2]">
              <ShieldAlert className="w-3.5 h-3.5 text-[#626987]" />
              <span>Reference Code:</span>
              <code className="font-mono text-[11px] text-[#474D66] bg-[#F4F3F8] px-2 py-0.5 rounded">
                {error.digest}
              </code>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-5xl w-full mx-auto pt-6 border-t border-[#E8E6F3] text-center text-xs text-[#8F95B2]">
        Next Move AI V2 • Resilient Discovery Infrastructure
      </footer>
    </div>
  );
}

