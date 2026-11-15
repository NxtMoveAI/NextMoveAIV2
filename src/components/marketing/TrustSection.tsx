"use client";

import React, { useState } from "react";
import {
  Shield,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface TrustPrinciple {
  id: string;
  badge: string;
  iconBg: string;
  iconSvg: React.ReactNode;
  title: string;
  sentence: string;
  coreHighlight: string;
  details: string;
  evidenceNote: string;
}

const PRINCIPLES: TrustPrinciple[] = [
  {
    id: "control",
    badge: "Student Agency",
    iconBg: "bg-[#EDEAFF] text-[#6757F5]",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#6757F5" fillOpacity="0.2" />
      </svg>
    ),
    title: "You're in Control",
    sentence: "Explore different possibilities and choose what feels meaningful to you.",
    coreHighlight: "The Student Remains in Control",
    details:
      "We don’t decide careers; we enable clarity. You always decide which interests to explore, which small projects to build, and when to pivot. Our platform offers insights, never locked-in verdicts.",
    evidenceNote: "Self-directed decision making at every step",
  },
  {
    id: "honest",
    badge: "Objective Realities",
    iconBg: "bg-[#E0F7FA] text-[#00838F]",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M3 9l9-6 9 6M3 9l3 8h6l-3-8M21 9l-3 8h-6l3-8" />
        <circle cx="6" cy="17" r="1.5" fill="#00838F" />
        <circle cx="18" cy="17" r="1.5" fill="#00838F" />
      </svg>
    ),
    title: "Honest Guidance",
    sentence:
      "We explain what information comes from you, your activities, and verified educational sources.",
    coreHighlight: "Why We Reject Artificial “Fit” Percentages",
    details:
      "No algorithm can predict a young human's future with an arbitrary percentage. We provide transparent educational realities, verifiable pathways, and real project practice—not automated scorecards or sponsored rankings.",
    evidenceNote: "Objective facts from verified educational sources",
  },
  {
    id: "privacy",
    badge: "Safe Harbor",
    iconBg: "bg-[#ECFDF5] text-[#047857]",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#047857" fillOpacity="0.15" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Privacy Matters",
    sentence: "Student information deserves careful protection and clear, documented controls.",
    coreHighlight: "Private Curiosity by Default",
    details:
      "Early questions, drafts, and reflections are personal exploration. In our documented platform architecture, sharing updates with parents or mentors occurs only with explicit student understanding.",
    evidenceNote: "Student-owned data with verified family permissions",
  },
];

export function TrustSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="trust"
      className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE] shadow-xs">
            <Shield className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>Trust &amp; Transparency</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Your journey. Your choices.{" "}
            <span className="bg-gradient-to-r from-[#6757F5] via-[#8B7FF8] to-[#35B8C5] bg-clip-text text-transparent">
              Your trust.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            We believe guidance should be clear, thoughtful, and respectful of every student.
          </p>
        </div>

        {/* 3 Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PRINCIPLES.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`p-6 sm:p-7 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                  isExpanded
                    ? "bg-[#FAF8FF] border-[#6757F5] shadow-lg shadow-[#6757F5]/5 ring-1 ring-[#6757F5]/20"
                    : "bg-[#FAF9F6] border-[#E8E6F3] hover:border-[#DDD8FE] hover:bg-white hover:shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-xs`}>
                      {item.iconSvg}
                    </div>
                    <span className="text-xs font-bold text-[#6757F5] bg-[#EDEAFF] px-2.5 py-1 rounded-md border border-[#DDD8FE]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#171A2B] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#31364F] leading-relaxed mb-4">
                    {item.sentence}
                  </p>

                  {/* Core Highlight Pill */}
                  <div className="p-3 rounded-xl bg-white border border-[#DDD8FE] text-xs text-[#6757F5] font-bold mb-3 shadow-2xs">
                    {item.coreHighlight}
                  </div>

                  {/* Optional Expanded Information */}
                  {isExpanded && (
                    <div className="p-4 rounded-xl bg-white border border-[#E8E6F3] text-xs text-[#626987] leading-relaxed space-y-2 animate-fadeIn mb-3">
                      <p>{item.details}</p>
                      <div className="pt-2 border-t border-[#F0EEF8] flex items-center gap-1.5 text-[#047857] font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{item.evidenceNote}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#E8E6F3] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleExpand(item.id)}
                    className="text-xs font-bold text-[#6757F5] hover:text-[#5342E8] flex items-center gap-1 focus:outline-none"
                  >
                    <span>{isExpanded ? "Hide Details" : "Learn More"}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <span className="text-[11px] text-[#626987] font-medium">
                    Our Commitment
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
