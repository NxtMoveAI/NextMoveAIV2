"use client";

import React, { useState } from "react";
import {
  Compass,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

interface PathwayStep {
  stage: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  realWorldArtifact: string;
  honestPacingNote: string;
}

const PATHWAY_STEPS: PathwayStep[] = [
  {
    stage: "Stage 01",
    stepNumber: "01",
    title: "Understand Existing Experience",
    subtitle: "Inventory your built-up capital before discarding it",
    description:
      "Map your career history into foundational capabilities: stakeholder management, compliance rigor, quantitative judgment, or frontline customer insights. Identify what has compound value.",
    realWorldArtifact: "1-Page Transferable Capability Inventory (no vanity scores)",
    honestPacingNote: "Typically 1–2 reflective sessions over a weekend",
  },
  {
    stage: "Stage 02",
    stepNumber: "02",
    title: "Explore New Possibilities",
    subtitle: "Examine adjacent tracks that value your baseline",
    description:
      "Review realistic role transitions and internal growth vectors. Understand how your industry domain expertise directly differentiates you from entry-level graduates.",
    realWorldArtifact: "Transition Feasibility Matrix comparing 2–3 directions",
    honestPacingNote: "Self-paced reading & industry benchmark review",
  },
  {
    stage: "Stage 03",
    stepNumber: "03",
    title: "Try a Practical Activity",
    subtitle: "Test the day-to-day work before paying for courses",
    description:
      "Complete a low-stakes 20-minute exercise (e.g., analyze a small sales dataset, trace a bottleneck, or draft a process SOP). Find out if you genuinely enjoy solving that category of problem.",
    realWorldArtifact: "A completed micro-deliverable reviewed against a rubric",
    honestPacingNote: "20–30 minutes in a single evening session",
  },
  {
    stage: "Stage 04",
    stepNumber: "04",
    title: "Identify Learning Needs",
    subtitle: "Isolate precise capability gaps without course bloat",
    description:
      "Rather than enrolling in a generic 100-hour bootcamp covering topics you already know, pinpoint the 2 or 3 missing technical primitives (e.g., SQL queries, workflow webhooks, or financial formulas).",
    realWorldArtifact: "Targeted Gap List prioritizing high-impact skills",
    honestPacingNote: "Saves months of redundant video lectures",
  },
  {
    stage: "Stage 05",
    stepNumber: "05",
    title: "Build Relevant Capabilities",
    subtitle: "Develop demonstrable proof on real projects",
    description:
      "Work on modular challenges directly applicable to your current employer or prospective role. Every project produces a defensible artifact you can showcase and explain in detail.",
    realWorldArtifact: "Portfolio of 2–3 reviewed case studies or functional tools",
    honestPacingNote: "Flexible schedule (e.g. 4–6 hours/week alongside your job)",
  },
  {
    stage: "Stage 06",
    stepNumber: "06",
    title: "Explore Realistic Opportunities",
    subtitle: "Engage internal promotions, lateral moves, or adjacent hiring",
    description:
      "Present demonstrated artifacts to current managers for internal role expansion, or target external roles with evidence of capability rather than generic keyword resumes.",
    realWorldArtifact: "Evidence-backed portfolio demonstrating applied impact",
    honestPacingNote: "Adaptive timing based on market hiring cycles",
  },
];

export function ProfessionalPathwaysSection() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = PATHWAY_STEPS[activeStepIndex];

  return (
    <section id="flexible-pathways" className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DBEAFE] shadow-xs">
            <Compass className="w-3.5 h-3.5" />
            <span>Structured Progression</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Build your next move at{" "}
            <span className="text-[#2563EB]">
              your own pace.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Working professionals have mortgages, families, variable shifts, and real-life commitments. We reject arbitrary 30-day bootcamp deadlines in favor of a flexible, grounded developmental sequence.
          </p>
        </div>

        {/* 6-Stage Timeline Flow Visualizer */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {PATHWAY_STEPS.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  isSelected
                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-[#2563EB]/20 scale-[1.02]"
                    : "bg-white text-[#474D66] border-[#E8E6F3] hover:border-[#BFDBFE] hover:text-[#171A2B]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-[#EFF6FF] text-[#2563EB]"
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight line-clamp-2">
                    {step.title}
                  </h4>
                  <span
                    className={`text-[10px] block mt-1 line-clamp-1 ${
                      isSelected ? "text-blue-100" : "text-[#7B82A0]"
                    }`}
                  >
                    {step.stage}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown */}
        <div className="rounded-3xl bg-white border-2 border-[#E8E6F3] p-6 sm:p-8 lg:p-10 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0EEF8] mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                  {activeStep.stage}
                </span>
                <span className="text-xs text-[#7B82A0]">·</span>
                <span className="text-xs text-[#626987]">Pacing Framework</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
                {activeStep.title}
              </h3>
              <p className="text-sm font-semibold text-[#2563EB] mt-1">
                {activeStep.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold border border-[#DBEAFE]">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeStep.honestPacingNote}</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Description */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs font-bold text-[#626987] uppercase tracking-wider">
                What This Stage Accomplishes:
              </h4>
              <p className="text-sm sm:text-base text-[#171A2B] leading-relaxed bg-[#FAF9F6] p-5 rounded-2xl border border-[#E8E6F3]">
                {activeStep.description}
              </p>
            </div>

            {/* Deliverable Artifact */}
            <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-[#EFF6FF]/40 border-2 border-[#DBEAFE]">
              <div>
                <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block mb-1">
                  Concrete Tangible Deliverable:
                </span>
                <h5 className="text-sm font-bold text-[#1E40AF] mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                  <span>{activeStep.realWorldArtifact}</span>
                </h5>
                <p className="text-xs text-[#474D66] leading-relaxed">
                  Every step is anchored to an actual working output rather than passive video completion percentages.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DBEAFE] flex items-center justify-between">
                <span className="text-xs text-[#7B82A0]">Next Step:</span>
                <button
                  onClick={() =>
                    setActiveStepIndex((prev) => (prev + 1) % PATHWAY_STEPS.length)
                  }
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
                >
                  <span>{PATHWAY_STEPS[(activeStepIndex + 1) % PATHWAY_STEPS.length].title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ethical Roadmap Invariants - Explicit Anti-Hyping Banner */}
        <div className="p-6 rounded-3xl bg-white border-2 border-[#E8E6F3] shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#171A2B]">
                Truthful Career Transition Standards
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-[#474D66] leading-relaxed">
                Next Move AI actively rejects misleading commercial marketing. We will never publish claims like:
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-2.5 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] text-xs text-[#991B1B] font-medium flex items-center gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>&ldquo;Become a Data Scientist in 30 Days&rdquo;</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] text-xs text-[#991B1B] font-medium flex items-center gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>&ldquo;Guaranteed 100% Placement Switch&rdquo;</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] text-xs text-[#991B1B] font-medium flex items-center gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>&ldquo;Automated 100% Job-Ready Badges&rdquo;</span>
                </div>
              </div>
              <p className="mt-3 text-xs text-[#626987]">
                True career mobility takes dedicated practice, realistic pacing, and demonstrated outputs that withstand tough peer interviews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
