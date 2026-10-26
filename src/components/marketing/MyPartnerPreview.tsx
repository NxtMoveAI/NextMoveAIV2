"use client";

import React, { useState } from "react";
import { MY_PARTNER_SCENARIOS } from "@/data/landing-demo";
import {
  Sparkles,
  Bot,
  User,
  ArrowRight,
  FlaskConical,
  CheckCircle2,
  Clock,
  HelpCircle,
  Lightbulb,
} from "lucide-react";

export function MyPartnerPreview() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("bca-python");
  const scenario = MY_PARTNER_SCENARIOS.find((s) => s.id === selectedScenarioId)!;

  return (
    <section
      id="my-partner"
      className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E8E6F3] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Contextual AI Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A2B] tracking-tight">
            Meet My Partner. Guidance that understands your journey.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#31364F] leading-relaxed">
            Not a generic chatbot that produces walls of text. My Partner responds with
            structured pathways, 15-minute trials, and trade-off comparisons tailored to your
            exact academic stage.
          </p>
        </div>

        {/* 3 Predetermined Student Scenario Switchers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#626987]">
            Select Student Scenario:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {MY_PARTNER_SCENARIOS.map((sc) => {
              const isSelected = selectedScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                    isSelected
                      ? "bg-[#6757F5] text-white shadow-md shadow-[#6757F5]/20 ring-2 ring-[#6757F5]"
                      : "bg-white text-[#31364F] hover:bg-[#EDEAFF] border border-[#E8E6F3]"
                  }`}
                >
                  <span>{sc.studentTag}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-[#EDEAFF] text-[#6757F5]"
                    }`}
                  >
                    {sc.stageBadge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The Interactive Conversation Preview Canvas */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-[#DDD8FE] shadow-xl overflow-hidden">
          {/* Conversation Header Bar */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#171A2B] to-[#2C314E] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#6757F5] flex items-center justify-center text-white shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-white">
                    My Partner
                  </h3>
                  <span className="text-[10px] bg-[#35B8C5]/20 text-[#35B8C5] px-2 py-0.5 rounded-full font-semibold border border-[#35B8C5]/30">
                    Context-Aware
                  </span>
                </div>
                <p className="text-[11px] text-white/70">
                  Grounding guidance in verified education databases
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-white/80">
              <Sparkles className="w-4 h-4 text-[#35B8C5]" />
              <span>Interactive Landing Demonstration</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Student Message */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 rounded-2xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0 font-bold text-xs border border-[#DDD8FE]">
                <User className="w-4 h-4" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#171A2B]">
                    {scenario.studentTag}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {scenario.contextPills.map((pill) => (
                      <span
                        key={pill}
                        className="text-[10px] font-medium bg-[#FAF9F6] text-[#626987] px-2 py-0.5 rounded-md border border-[#E8E6F3]"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-2xl rounded-tl-sm bg-[#FAF9F6] border border-[#E8E6F3] text-sm text-[#171A2B] font-medium leading-relaxed">
                  &ldquo;{scenario.question}&rdquo;
                </div>
              </div>
            </div>

            {/* My Partner Structured Response */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 rounded-2xl bg-[#6757F5] text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6757F5] flex items-center gap-1.5">
                    <span>My Partner Guidance</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#35B8C5]" />
                    <span className="text-[10px] text-[#626987] font-normal">
                      Structured Decision Response
                    </span>
                  </span>
                </div>

                {/* 1. Acknowledgement */}
                <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-sm text-[#31364F] leading-relaxed">
                  {scenario.partnerResponse.acknowledgement}
                </div>

                {/* 2. Structured Pathways */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#626987] block mb-2">
                    Verified Pathways to Consider:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {scenario.partnerResponse.verifiedPathways.map((path, idx) => (
                      <div
                        key={path.title}
                        className="p-4 rounded-xl bg-white border border-[#E8E6F3] shadow-2xs hover:border-[#6757F5]/40 transition-colors flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-bold text-[#6757F5] uppercase">
                              Direction 0{idx + 1}
                            </span>
                            <span className="text-[10px] font-semibold bg-[#FAF9F6] px-1.5 py-0.5 rounded border border-[#E8E6F3] text-[#31364F]">
                              {path.difficulty}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-[#171A2B] mb-1 leading-snug">
                            {path.title}
                          </h4>
                          <p className="text-[11px] text-[#626987] leading-relaxed mb-2">
                            {path.description}
                          </p>
                        </div>
                        <div className="mt-2 pt-2 border-t border-[#F0EEF8] text-[10px] text-[#6757F5]">
                          <strong>Prerequisites:</strong> {path.prerequisites}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Practical Trial */}
                <div className="p-4 rounded-2xl bg-[#EDEAFF]/60 border border-[#DDD8FE]">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#6757F5] uppercase tracking-wider">
                      <FlaskConical className="w-3.5 h-3.5" />
                      <span>Suggested Weekend Micro-Trial:</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#626987] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{scenario.partnerResponse.practicalTrial.duration}</span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#171A2B] font-semibold mt-1">
                    {scenario.partnerResponse.practicalTrial.action}
                  </p>
                  <p className="text-xs text-[#626987] mt-1">
                    <strong>What you observe:</strong>{" "}
                    {scenario.partnerResponse.practicalTrial.whatYouLearn}
                  </p>
                </div>

                {/* 4. Reflection and Mentor Note */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3]">
                    <div className="font-bold text-[#171A2B] mb-1 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-[#35B8C5]" />
                      <span>Guided Reflection:</span>
                    </div>
                    <p className="text-[#626987] leading-relaxed">
                      {scenario.partnerResponse.guidedReflection}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3]">
                    <div className="font-bold text-[#6757F5] mb-1 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Philosophy Guardrail:</span>
                    </div>
                    <p className="text-[#626987] leading-relaxed">
                      {scenario.partnerResponse.mentorNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Demonstration Notice Banner */}
          <div className="p-4 bg-[#FAF9F6] border-t border-[#E8E6F3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#626987]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#35B8C5] shrink-0" />
              <span>
                Demonstration showing structured guidance outputs rather than generic chat text.
              </span>
            </div>
            <a
              href="#explorer"
              className="inline-flex items-center gap-1 font-semibold text-[#6757F5] hover:text-[#5342E8]"
            >
              <span>Explore your own stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
