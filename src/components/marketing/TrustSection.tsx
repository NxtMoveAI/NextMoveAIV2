"use client";

import React from "react";
import { TRUST_PRINCIPLES } from "@/data/landing-demo";
import {
  Compass,
  BookCheck,
  Award,
  Lock,
  CheckCircle2,
  Cpu,
  Shield,
} from "lucide-react";

export function TrustSection() {
  const getTrustIcon = (name: string) => {
    switch (name) {
      case "Compass":
        return Compass;
      case "BookCheck":
        return BookCheck;
      case "Award":
        return Award;
      case "Lock":
        return Lock;
      case "CheckCircle2":
        return CheckCircle2;
      case "Cpu":
      default:
        return Cpu;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE]">
            <Shield className="w-3.5 h-3.5" />
            <span>Integrity & Governance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A2B] tracking-tight">
            Built on trust, authoritative sources, and student control.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#31364F] leading-relaxed">
            We don’t rely on aggressive advertising, fake accuracy percentages, or sponsored
            college rankings. Here are the core commitments that govern Next Move AI.
          </p>
        </div>

        {/* 6 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUST_PRINCIPLES.map((principle) => {
            const IconComp = getTrustIcon(principle.iconName);
            return (
              <div
                key={principle.title}
                className="p-6 sm:p-7 rounded-3xl bg-[#FAF9F6] border border-[#E8E6F3] hover:border-[#6757F5]/40 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-[#6757F5] bg-[#EDEAFF] px-2.5 py-1 rounded-lg">
                      Commitment {principle.number}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white text-[#6757F5] border border-[#E8E6F3] shadow-2xs">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#171A2B] mb-2 leading-snug">
                    {principle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#626987] leading-relaxed">
                    {principle.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E8E6F3] flex items-center gap-1.5 text-[11px] font-semibold text-[#35B8C5]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Governing Product Commitment</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
