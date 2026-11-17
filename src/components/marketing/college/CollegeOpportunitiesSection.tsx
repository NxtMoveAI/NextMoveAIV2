"use client";

import React from "react";
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  Rocket,
  Building,
  Workflow,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface OpportunityAvenue {
  title: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  portfolioRole: string;
}

const OPPORTUNITY_AVENUES: OpportunityAvenue[] = [
  {
    title: "Internships & Apprenticeships",
    tag: "Practical Exposure",
    icon: Briefcase,
    description:
      "Gain early industry experience where teams look for students who can write clean, tested code or parse balance sheets without hand-holding.",
    portfolioRole: "Demonstrates you can contribute to real team workflows from day one.",
  },
  {
    title: "Higher Education & Specialization",
    tag: "Academic Progression",
    icon: GraduationCap,
    description:
      "Stand out during competitive M.Tech, MCA, MBA, or international Master&apos;s admissions with concrete project research rather than generic statements.",
    portfolioRole: "Provides verifiable proof of curiosity and academic depth.",
  },
  {
    title: "Direct Entry-Level Opportunities",
    tag: "Workforce Entry",
    icon: Building,
    description:
      "Differentiate yourself from thousands of generic applicants by bringing a public repository or financial model to technical interviews.",
    portfolioRole: "Shifts interview focus from multiple-choice tests to your actual work.",
  },
  {
    title: "Entrepreneurship & Freelance",
    tag: "Independent Ventures",
    icon: Rocket,
    description:
      "Test commercial viability for your own product concepts with verified unit economics, break-even targets, and prototype software.",
    portfolioRole: "Reduces early venture risk through structured validation.",
  },
  {
    title: "Regional Enterprise Exposure",
    tag: "Local Industry",
    icon: Workflow,
    description:
      "Apply digital and operational problem-solving to regional retail, logistics, manufacturing, and agricultural businesses.",
    portfolioRole: "Solves real community business bottlenecks with practical tools.",
  },
  {
    title: "Lateral Entry & Pathway Pivots",
    tag: "Diploma & Transitions",
    icon: Sparkles,
    description:
      "Navigate polytechnic-to-B.Tech lateral entry or branch transitions with a clear portfolio showing foundational alignment.",
    portfolioRole: "Proves you have mastered the prerequisite technical skills.",
  },
];

export function CollegeOpportunitiesSection() {
  return (
    <section id="college-opportunities" className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE] shadow-xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Real-World Connections</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Connect learning to{" "}
            <span className="text-[#6757F5]">
              real-world possibilities.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Meaningful capabilities open doors across diverse career pathways. Here is how building demonstrable projects connects to tangible future opportunities.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E6F3] text-[11px] text-[#626987] shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>Illustrative pathway categories · Not active corporate vacancies or live job guarantees</span>
          </div>
        </div>

        {/* 6 Avenues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {OPPORTUNITY_AVENUES.map((av, idx) => {
            const Icon = av.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-[#E8E6F3] hover:border-[#6757F5]/40 transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#6757F5] uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#DDD8FE]">
                      {av.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#171A2B] mb-2 leading-snug">
                    {av.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#626987] leading-relaxed mb-4">
                    {av.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0EEF8] flex items-start gap-1.5 text-[11px] font-semibold text-[#4338CA]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6757F5] shrink-0 mt-0.5" />
                  <span>{av.portfolioRole}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Honest Truth in Employability Callout */}
        <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-white border-2 border-[#DDD8FE] shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#171A2B]">
                Truthful Expectations on Industry Readiness
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-[#474D66] leading-relaxed">
                Completing a single starter project or introductory trial <strong>does not make a student immediately employment-ready</strong>. Real hiring and professional growth require a coherent portfolio of reviewed work, fundamental conceptual depth, and the ability to articulate trade-offs in interviews. Next Move AI helps you systematically build that evidence base over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
