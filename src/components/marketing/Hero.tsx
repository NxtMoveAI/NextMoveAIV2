"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Compass,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Target,
  GraduationCap,
  Layers,
} from "lucide-react";

export function Hero() {
  const [activeStageId, setActiveStageId] = useState<
    "understand" | "explore" | "compare" | "build"
  >("understand");

  const heroStages = [
    {
      id: "understand" as const,
      stageNumber: "01",
      title: "Understand",
      subtitle: "Where you are today",
      badge: "Self & Context",
      icon: GraduationCap,
      color: "#6757F5",
      accentBg: "#EDEAFF",
      sampleContext: "Class 12 (PCM) · Interested in technology & coding",
      sampleDilemma: "Overwhelmed by JEE coaching; unclear about options beyond top IIT/NIT seats.",
      transformation: "Stress & confusion &rarr; Clear understanding of personal strengths & constraints",
      keyOutput: "Documented student interests and genuine curiosities without arbitrary scorecards",
    },
    {
      id: "explore" as const,
      stageNumber: "02",
      title: "Explore",
      subtitle: "Grounded possibilities",
      badge: "Pathway Discovery",
      icon: Compass,
      color: "#35B8C5",
      accentBg: "#E0F7FA",
      sampleContext: "Curated computing & technology routes across India",
      sampleDilemma: "Discovering B.Tech CS via state CETs, BCA/B.Sc computer science, and data engineering.",
      transformation: "Narrow 1-exam tunnel vision &rarr; 3 credible parallel education pathways",
      keyOutput: "Curated database of prerequisites, entrance calendars, and curriculum differences",
    },
    {
      id: "compare" as const,
      stageNumber: "03",
      title: "Compare",
      subtitle: "Trade-offs & alternatives",
      badge: "Decision Matrix",
      icon: Layers,
      color: "#7C6BF8",
      accentBg: "#F0EDFF",
      sampleContext: "Side-by-side: Private B.Tech vs State Degree + MCA",
      sampleDilemma: "Comparing 4-year tuition (₹16L) vs 3-year degree + skills portfolio, ROI, and placements.",
      transformation: "Blind peer rumors &rarr; Transparent fees, workload, and placement realities",
      keyOutput: "Student-controlled shortlist with explicit awareness of risks and alternatives",
    },
    {
      id: "build" as const,
      stageNumber: "04",
      title: "Build",
      subtitle: "Concrete next move",
      badge: "Action Roadmap",
      icon: Target,
      color: "#171A2B",
      accentBg: "#E8E6F3",
      sampleContext: "Actionable 2-week exploration trial",
      sampleDilemma: "Build a 20-min live Currency API calculator & map out backup entrance application dates.",
      transformation: "Hesitation & analysis paralysis &rarr; Clear first step taken with confidence",
      keyOutput: "Flexible milestone roadmap with demonstrable project artifacts",
    },
  ];

  const currentStage = heroStages.find((s) => s.id === activeStageId)!;
  const activeIndex = heroStages.findIndex((s) => s.id === activeStageId);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      const nextIndex = (index + 1) % heroStages.length;
      setActiveStageId(heroStages[nextIndex].id);
    } else if (e.key === "ArrowLeft") {
      const prevIndex = (index - 1 + heroStages.length) % heroStages.length;
      setActiveStageId(heroStages[prevIndex].id);
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-[#FAF9F6]">
      {/* Background subtle radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-[#EDEAFF]/80 via-[#FAF9F6]/40 to-transparent pointer-events-none -z-10 rounded-full blur-3xl opacity-70" />
      <div className="absolute top-40 right-[-100px] w-80 h-80 bg-[#35B8C5]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Philosophy Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] border border-[#DDD8FE] text-[#6757F5] text-xs sm:text-sm font-semibold mb-6 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#6757F5]" />
              <span>We don’t decide careers; we enable clarity.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#171A2B] tracking-tight leading-[1.12]">
              Your next move starts with{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-[#6757F5]">
                  understanding you.
                </span>
                <span
                  className="absolute bottom-2 left-0 w-full h-3 bg-[#35B8C5]/20 -z-0 rounded"
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 text-lg sm:text-xl text-[#31364F] leading-relaxed max-w-2xl font-normal">
              Explore your interests, discover curated educational pathways,
              test practical 15-minute micro-trials, and make informed choices—with
              student-centered guidance that grows alongside you.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="#explorer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-[0_10px_25px_-5px_rgba(103,87,245,0.4)] hover:shadow-[0_14px_30px_-5px_rgba(103,87,245,0.5)] transition-all duration-200 group active:scale-[0.98]"
              >
                <span>Discover My Next Move</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-[#171A2B] bg-white hover:bg-[#FAF9F6] border border-[#DDD8FE] shadow-sm hover:border-[#6757F5]/40 transition-all duration-200"
              >
                <span>See How It Works</span>
                <ChevronRight className="w-4 h-4 text-[#626987]" />
              </a>
            </div>

            {/* Reassurance points */}
            <div className="mt-10 pt-6 border-t border-[#E8E6F3] w-full grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-[#626987]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#35B8C5] shrink-0" />
                <span>Zero premature labels</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#35B8C5] shrink-0" />
                <span>No sponsored bias</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#35B8C5] shrink-0" />
                <span>Classes 4–12 & College</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual - Interactive 4-Stage Transformation Canvas */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl bg-white border border-[#DDD8FE] p-5 sm:p-6 shadow-[0_20px_50px_-15px_rgba(23,26,43,0.09)]">
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F0EEF8]">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6757F5] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#171A2B]">
                    Interactive Journey Canvas
                  </span>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EDEAFF] text-[#6757F5] border border-[#DDD8FE]">
                  Class 12 Example
                </span>
              </div>

              {/* The 4-Stage Connected Node Diagram */}
              <div
                className="mt-4 relative"
                role="tablist"
                aria-label="Student Journey Stages"
              >
                {/* Connecting track line */}
                <div
                  className="absolute top-6 left-6 right-6 h-0.5 bg-[#E8E6F3] -z-0"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-4 gap-2 relative z-10">
                  {heroStages.map((stage, idx) => {
                    const isSelected = activeStageId === stage.id;
                    const StageIcon = stage.icon;

                    return (
                      <button
                        key={stage.id}
                        type="button"
                        role="tab"
                        id={`hero-tab-${stage.id}`}
                        aria-selected={isSelected}
                        aria-controls={`hero-panel-${stage.id}`}
                        tabIndex={isSelected ? 0 : -1}
                        onClick={() => setActiveStageId(stage.id)}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        className={`flex flex-col items-center text-center p-2 rounded-2xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                          isSelected
                            ? "bg-[#FAF9F6] border-2 border-[#6757F5] shadow-sm -translate-y-0.5"
                            : "bg-white border border-[#E8E6F3] hover:border-[#6757F5]/40 hover:bg-[#FAF9F6]/50"
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors mb-1.5 ${
                            isSelected
                              ? "bg-[#6757F5] text-white shadow-xs"
                              : "bg-[#EDEAFF] text-[#6757F5]"
                          }`}
                        >
                          <StageIcon className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-xs font-extrabold ${
                            isSelected ? "text-[#6757F5]" : "text-[#171A2B]"
                          }`}
                        >
                          {stage.title}
                        </span>
                        <span className="text-[10px] text-[#626987] font-medium hidden sm:inline">
                          Step {stage.stageNumber}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Stage Dynamic Showcase Panel */}
              <div
                id={`hero-panel-${currentStage.id}`}
                role="tabpanel"
                aria-labelledby={`hero-tab-${currentStage.id}`}
                className="mt-5 p-5 rounded-2xl bg-[#FAF9F6] border border-[#DDD8FE] relative transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#6757F5] text-white">
                      Stage {currentStage.stageNumber}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white text-[#6757F5] border border-[#DDD8FE]">
                      {currentStage.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#626987] font-medium">
                    {currentStage.subtitle}
                  </span>
                </div>

                <div className="mt-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6757F5] block mb-1">
                    Student Situation:
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                    {currentStage.sampleContext}
                  </p>
                  <p className="text-xs text-[#626987] mt-1 leading-relaxed">
                    {currentStage.sampleDilemma}
                  </p>
                </div>

                {/* Concrete Output Box */}
                <div className="mt-4 p-3 rounded-xl bg-white border border-[#E8E6F3] shadow-xs space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#35B8C5]">
                    Concrete Stage Output:
                  </div>
                  <p className="text-xs text-[#171A2B] font-medium leading-relaxed">
                    {currentStage.keyOutput}
                  </p>
                </div>

                {/* Clarity Transformation Bar */}
                <div className="mt-3 pt-3 border-t border-[#E8E6F3] flex items-center justify-between text-[11px]">
                  <span className="text-[#626987] font-medium">Clarity Shift:</span>
                  <span
                    className="font-bold text-[#6757F5]"
                    dangerouslySetInnerHTML={{ __html: currentStage.transformation }}
                  />
                </div>
              </div>

              {/* Quick Stepper Footer */}
              <div className="mt-4 flex items-center justify-between pt-1 text-xs text-[#626987]">
                <span>Stage {activeIndex + 1} of {heroStages.length}</span>
                <button
                  type="button"
                  onClick={() => {
                    const nextIndex = (activeIndex + 1) % heroStages.length;
                    setActiveStageId(heroStages[nextIndex].id);
                  }}
                  className="inline-flex items-center gap-1 font-bold text-[#6757F5] hover:text-[#5342E8] p-1 rounded-md transition-colors"
                  aria-label={`Next: ${heroStages[(activeIndex + 1) % heroStages.length].title}`}
                >
                  <span>Next: {heroStages[(activeIndex + 1) % heroStages.length].title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Guiding Principle Note */}
              <div className="mt-4 p-3 rounded-xl bg-[#F7F6FF] border border-[#DDD8FE] flex items-center gap-2.5">
                <div className="p-1 rounded-md bg-[#6757F5] text-white shrink-0">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <p className="text-[11px] text-[#31364F] leading-tight">
                  <strong className="text-[#171A2B]">Next Move AI Philosophy:</strong> We
                  replace high-stakes anxiety with short trials and student-owned choices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
