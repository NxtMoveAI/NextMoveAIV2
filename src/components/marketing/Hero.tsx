"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Compass,
  Sparkles,
  FlaskConical,
  CheckCircle2,
  ChevronRight,
  Target,
  GraduationCap,
} from "lucide-react";

export function Hero() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(1);

  const heroJourneySteps = [
    {
      id: "current-position",
      stage: "Step 01",
      title: "Current Position",
      subtitle: "Academic reality & interests",
      icon: GraduationCap,
      badge: "Understand Me",
      color: "#6757F5",
      sample: "BCA Semester 3 · Self-reported Python familiarity · Uncertain between MCA vs direct job",
      tag: "Self-Reported",
    },
    {
      id: "possibilities",
      stage: "Step 02",
      title: "Grounded Possibilities",
      subtitle: "3 verified pathway options",
      icon: Compass,
      badge: "Explore Possibilities",
      color: "#35B8C5",
      sample: "Backend Systems (FastAPI) · Applied Data Science · NIMCET / NIT MCA entrance route",
      tag: "3 Pathways",
    },
    {
      id: "practical-trial",
      stage: "Step 03",
      title: "15-Min Micro-Trial",
      subtitle: "Experience before deciding",
      icon: FlaskConical,
      badge: "Practical Exploration",
      color: "#7C6BF8",
      sample: "Build a 30-line mini API route to test whether backend logic energizes you",
      tag: "Low-Stakes Trial",
    },
    {
      id: "next-move",
      stage: "Step 04",
      title: "Your Next Move",
      subtitle: "Evidence-backed roadmap",
      icon: Target,
      badge: "Build My Move",
      color: "#171A2B",
      sample: "Approved 12-week roadmap: 2 GitHub projects, 1 case study, zero fake percentage scores",
      tag: "Actionable Milestone",
    },
  ];

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] border border-[#DDD8FE] text-[#6757F5] text-xs sm:text-sm font-semibold mb-6 shadow-sm">
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
              Explore your interests, discover verified Indian education pathways,
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

          {/* Right Column: Hero Visual - Transformation Journey Canvas */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl bg-white border border-[#E4E1F8] p-5 sm:p-6 shadow-[0_20px_50px_-15px_rgba(23,26,43,0.08)]">
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F0EEF8]">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-[#6757F5] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#171A2B]">
                    Interactive Student Journey
                  </span>
                </div>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#EDEAFF] text-[#6757F5]">
                  Live Demo Concept
                </span>
              </div>

              {/* Progress Stepper Tabs */}
              <div className="grid grid-cols-4 gap-1.5 mt-4">
                {heroJourneySteps.map((step, idx) => {
                  const isActive = activeStepIndex === idx;
                  const StepIcon = step.icon;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setActiveStepIndex(idx)}
                      className={`flex flex-col items-center text-center p-2 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-[#6757F5] text-white shadow-sm"
                          : "bg-[#F7F6FF] text-[#626987] hover:bg-[#EDEAFF]/80"
                      }`}
                      aria-label={`View step ${step.stage}: ${step.title}`}
                    >
                      <StepIcon className="w-4 h-4 mb-1" />
                      <span className="text-[10px] font-bold uppercase">
                        {step.stage}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Showcase Card */}
              <div className="mt-5 p-5 rounded-2xl bg-gradient-to-br from-[#FAF9F6] to-[#F5F3FF] border border-[#DDD8FE]/80 relative overflow-hidden transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-[#6757F5] border border-[#DDD8FE] shadow-2xs">
                    {heroJourneySteps[activeStepIndex].badge}
                  </span>
                  <span className="text-[11px] font-semibold text-[#626987]">
                    {heroJourneySteps[activeStepIndex].tag}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-[#171A2B]">
                  {heroJourneySteps[activeStepIndex].title}
                </h2>
                <p className="text-xs text-[#626987] mt-0.5">
                  {heroJourneySteps[activeStepIndex].subtitle}
                </p>

                <div className="mt-4 p-3.5 rounded-xl bg-white border border-[#E8E6F3] shadow-xs">
                  <div className="flex items-start gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-[#35B8C5] shrink-0 mt-1.5" />
                    <p className="text-xs sm:text-sm text-[#171A2B] font-medium leading-relaxed">
                      {heroJourneySteps[activeStepIndex].sample}
                    </p>
                  </div>
                </div>

                {/* Micro transformation bar */}
                <div className="mt-4 flex items-center justify-between text-[11px] text-[#626987] pt-2">
                  <span>Transformation:</span>
                  <span className="font-semibold text-[#6757F5]">
                    {activeStepIndex === 0 && "Confusion -> Articulated Profile"}
                    {activeStepIndex === 1 && "Vague ideas -> 3 Concrete Choices"}
                    {activeStepIndex === 2 && "Passive reading -> 15-Min Real Trial"}
                    {activeStepIndex === 3 && "Anxiety -> Actionable Step 1"}
                  </span>
                </div>
              </div>

              {/* Interactive Step Carousel Navigation */}
              <div className="mt-4 flex items-center justify-between pt-2 text-xs text-[#626987]">
                <span>Tap steps above or click next:</span>
                <button
                  type="button"
                  onClick={() =>
                    setActiveStepIndex((prev) => (prev + 1) % heroJourneySteps.length)
                  }
                  className="inline-flex items-center gap-1 font-semibold text-[#6757F5] hover:text-[#5342E8] p-1 rounded-md"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Floating micro pill */}
              <div className="mt-4 p-3 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] flex items-center gap-2.5">
                <div className="p-1 rounded-md bg-[#35B8C5]/15 text-[#35B8C5]">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="text-[11px] text-[#31364F]">
                  <span className="font-bold">Next Move AI Principle:</span> Decision
                  clarity happens through hands-on trials, not algorithmic destiny scores.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
