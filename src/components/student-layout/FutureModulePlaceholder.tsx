/**
 * NEXT MOVE AI V2 — FUTURE MODULE PLACEHOLDER
 * 
 * Provides an honest, polished "Integration in Progress" destination
 * for future flows (Explore, Growth, Projects, Partner, Settings)
 * without dead links or fake completed features.
 */

"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

interface FutureModulePlaceholderProps {
  moduleName: string;
  flowNumber: string;
  shortDescription: string;
  upcomingCapabilities: string[];
  icon: React.ReactNode;
}

export function FutureModulePlaceholder({
  moduleName,
  flowNumber,
  shortDescription,
  upcomingCapabilities,
  icon,
}: FutureModulePlaceholderProps) {
  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/dashboard/student"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#6757F5] hover:text-[#5342E8] transition-colors p-1 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student Home</span>
        </Link>
      </div>

      {/* Main card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#DDD8FE] shadow-sm text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#EDEAFF] text-[#6757F5] border border-[#DDD8FE] flex items-center justify-center mx-auto shadow-sm">
          {icon}
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F3F8] border border-[#E8E6F3] text-[11px] font-bold text-[#626987]">
            <Clock className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>Scheduled for {flowNumber}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
            {moduleName}
          </h1>

          <p className="text-sm text-[#474D66] max-w-lg mx-auto leading-relaxed">
            {shortDescription}
          </p>
        </div>

        {/* Upcoming capabilities */}
        <div className="p-5 rounded-2xl bg-[#F7F6FF] border border-[#E8E6F3] text-left max-w-md mx-auto space-y-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
            Planned in upcoming releases:
          </span>
          <ul className="space-y-2 text-xs text-[#31364F]">
            {upcomingCapabilities.map((cap, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6757F5] mt-1.5 shrink-0" />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Honest epistemic disclosure */}
        <p className="text-[11px] text-[#8C93AD] max-w-md mx-auto italic">
          Next Move AI V2 strictly separates completed flows from future features. This screen is live to preserve navigation integrity without claiming unbuilt capabilities.
        </p>

        {/* Action */}
        <div>
          <Link
            href="/dashboard/student"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Personalized Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
