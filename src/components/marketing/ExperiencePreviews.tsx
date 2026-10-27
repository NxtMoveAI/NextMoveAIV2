"use client";

import React, { useState } from "react";
import { STUDENT_EXPERIENCES } from "@/data/landing-demo";
import {
  Sparkles,
  Map,
  Layers,
  Flame,
  Milestone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export function ExperiencePreviews() {
  const [selectedExpId, setSelectedExpId] = useState<string>("discover-interests");
  const activeExp = STUDENT_EXPERIENCES.find((e) => e.id === selectedExpId)!;

  const getExpIcon = (name: string) => {
    switch (name) {
      case "Sparkles":
        return Sparkles;
      case "Map":
        return Map;
      case "Layers":
        return Layers;
      case "Flame":
        return Flame;
      case "Milestone":
        return Milestone;
      case "ShieldCheck":
      default:
        return ShieldCheck;
    }
  };

  return (
    <section
      id="experiences"
      className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Platform Previews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A2B] tracking-tight">
            Don’t just read about possibilities. Explore them.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#31364F] leading-relaxed">
            Every feature in Next Move AI is built around student action and verifiable
            discovery—from 15-minute micro-trials to evidence-based growth records.
          </p>
        </div>

        {/* 6 Feature Selection Grid / Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {STUDENT_EXPERIENCES.map((exp) => {
            const IconComp = getExpIcon(exp.iconName);
            const isSelected = selectedExpId === exp.id;
            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => setSelectedExpId(exp.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#FAF9F6] border-[#6757F5] ring-2 ring-[#6757F5]/20 shadow-sm"
                    : "bg-white border-[#E8E6F3] hover:border-[#6757F5]/30 hover:bg-[#FAF9F6]/50"
                }`}
              >
                <div
                  className={`p-2 rounded-xl w-fit mb-2 ${
                    isSelected
                      ? "bg-[#6757F5] text-white"
                      : "bg-[#EDEAFF] text-[#6757F5]"
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#626987] block">
                    {exp.badge}
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-bold block leading-snug ${
                      isSelected ? "text-[#6757F5]" : "text-[#171A2B]"
                    }`}
                  >
                    {exp.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive UI Composition Card */}
        <div className="rounded-3xl bg-[#FAF9F6] border-2 border-[#DDD8FE] p-6 sm:p-8 lg:p-10 shadow-lg shadow-[#6757F5]/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#EDEAFF] text-[#6757F5] text-xs font-bold">
                  {activeExp.badge}
                </span>
                <span className="text-xs text-[#626987]">
                  Illustrative UI Preview
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B]">
                {activeExp.title}
              </h3>

              <p className="text-sm sm:text-base text-[#31364F] leading-relaxed">
                {activeExp.shortDesc}
              </p>

              <div className="p-4 rounded-2xl bg-white border border-[#E8E6F3] space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#6757F5]">
                  Student Benefit
                </div>
                <p className="text-xs sm:text-sm text-[#31364F] font-medium leading-relaxed">
                  {activeExp.previewData.calloutText}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="#explorer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#6757F5] hover:text-[#5342E8] group"
                >
                  <span>Experience this in the Explorer above</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right: Mock UI Widget Composition */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white border border-[#DDD8FE] p-5 sm:p-6 shadow-md">
                {/* Mock Window Title Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-[#F0EEF8] mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    <span className="text-xs font-bold text-[#171A2B] ml-2">
                      {activeExp.previewData.heading}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#626987] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E8E6F3]">
                    Interactive Preview
                  </span>
                </div>

                <p className="text-xs text-[#626987] mb-4">
                  {activeExp.previewData.subheading}
                </p>

                {/* Items in Mock Window */}
                <div className="space-y-2.5">
                  {activeExp.previewData.items.map((item, idx) => (
                    <div
                      key={item.label}
                      className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs ${
                        item.highlight
                          ? "bg-[#FAF9F6] border-[#6757F5]/50 ring-1 ring-[#6757F5]/30 font-medium"
                          : "bg-white border-[#E8E6F3]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#EDEAFF] text-[#6757F5] font-bold text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-[#171A2B]">
                          {item.label}
                        </span>
                      </div>
                      <span
                        className={`${
                          item.highlight ? "text-[#6757F5] font-bold" : "text-[#31364F]"
                        }`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Widget Footer */}
                <div className="mt-4 pt-4 border-t border-[#F0EEF8] flex items-center justify-between text-[11px] text-[#626987]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#35B8C5]" />
                    <span>Real-world student data architecture</span>
                  </span>
                  <span className="font-semibold text-[#6757F5]">
                    Evidence-Based & Grounded
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
