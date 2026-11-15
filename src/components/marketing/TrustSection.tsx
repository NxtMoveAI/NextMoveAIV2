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
  number: string;
  icon: string;
  title: string;
  sentence: string;
  coreHighlight: string;
  details: string;
  evidenceNote: string;
}

const PRINCIPLES: TrustPrinciple[] = [
  {
    id: "control",
    number: "01",
    icon: "🧭",
    title: "You're in Control",
    sentence: "Explore different possibilities and choose what feels meaningful to you.",
    coreHighlight: "The Student Remains in Control",
    details:
      "We don’t decide careers; we enable clarity. You always decide which interests to explore, which small projects to build, and when to pivot. Our platform offers insights, never locked-in verdicts.",
    evidenceNote: "Self-directed decision making at every step",
  },
  {
    id: "honest",
    number: "02",
    icon: "🔍",
    title: "Honest Guidance",
    sentence:
      "We explain what information comes from you, your activities, and educational sources.",
    coreHighlight: "Why We Reject Artificial “Fit” Percentages",
    details:
      "No algorithm can predict a young human's future with an arbitrary percentage. We provide transparent educational realities, verifiable pathways, and real project practice—not automated scorecards or sponsored rankings.",
    evidenceNote: "Objective facts from verified educational sources",
  },
  {
    id: "privacy",
    number: "03",
    icon: "🛡️",
    title: "Privacy Matters",
    sentence: "Student information deserves careful protection and appropriate controls.",
    coreHighlight: "Private Curiosity by Default",
    details:
      "Your early questions, drafts, and reflections are private. Sharing with parents or mentors occurs only with explicit student understanding, giving you a safe harbor to discover who you are.",
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
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE] shadow-xs">
            <Shield className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>Trust & Transparency</span>
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

        {/* 3 Simple Principles Cards */}
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
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-mono font-bold text-[#6757F5] bg-[#EDEAFF] px-2.5 py-0.5 rounded-md">
                      Principle {item.number}
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
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] hover:text-[#5342E8] transition-colors"
                  >
                    <span>{isExpanded ? "Hide Details" : "Learn More"}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <span className="text-[11px] text-[#626987]">
                    Governing commitment
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
