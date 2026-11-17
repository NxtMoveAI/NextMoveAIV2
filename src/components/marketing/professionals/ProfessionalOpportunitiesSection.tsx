"use client";

import React from "react";
import {
  TrendingUp,
  Briefcase,
  Layers,
  Building2,
  Rocket,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

interface OpportunityVector {
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  realisticMechanism: string;
  illustrativeScenario: string;
}

const OPPORTUNITY_VECTORS: OpportunityVector[] = [
  {
    title: "Internal Career Advancement",
    category: "Promotions & Scope",
    icon: TrendingUp,
    description:
      "Expand your remit within your current company by pairing domain expertise with modern analytics or automation capabilities.",
    realisticMechanism:
      "Presenting a working prototype or operational improvement to your department head demonstrates initiative that traditional performance reviews rarely capture.",
    illustrativeScenario:
      "An operations lead automates daily shift handoffs, reducing manual errors by 30% and securing a promotion to Senior Operations Architect.",
  },
  {
    title: "Cross-Functional Role Changes",
    category: "Lateral Moves",
    icon: Layers,
    description:
      "Transition from frontline execution into enablement, product operations, customer success, or business systems.",
    realisticMechanism:
      "Internal lateral moves are often 5x easier than external switches because existing organizational trust and cultural knowledge transfer immediately.",
    illustrativeScenario:
      "A senior customer support specialist moves into Product Operations to help engineers prioritize real-world user bug fixes.",
  },
  {
    title: "Taking on New Responsibilities",
    category: "Capability Scope",
    icon: Briefcase,
    description:
      "Lead cross-department initiatives, digital tool rollouts, or vendor evaluations without needing an official title change first.",
    realisticMechanism:
      "Volunteering to pilot a low-code tool or author standard operating procedures proves leadership capability before formal promotion cycles.",
    illustrativeScenario:
      "A school teacher coordinates digital classroom tool guidelines for their department, becoming the campus academic technology lead.",
  },
  {
    title: "Industry & Sector Transitions",
    category: "Sector Pivots",
    icon: Building2,
    description:
      "Carry functional strengths (e.g. accounting, logistics, marketing) into higher-margin or faster-growing adjacent sectors.",
    realisticMechanism:
      "Moving from traditional manufacturing logistics to quick-commerce e-commerce logistics leverages the same core supply-chain fundamentals.",
    illustrativeScenario:
      "A retail branch accountant transitions into SaaS revenue operations by proving spreadsheet financial modeling rigor.",
  },
  {
    title: "Independent Consulting & Entrepreneurship",
    category: "Self-Employment",
    icon: Rocket,
    description:
      "Package specialized domain knowledge into independent client advisory services, specialized micro-agencies, or regional services.",
    realisticMechanism:
      "Clients pay for deep problem diagnosis and tangible execution, not certificates. A portfolio of case studies builds instant advisory credibility.",
    illustrativeScenario:
      "A quality auditor sets up an independent compliance advisory helping tier-2 automotive suppliers pass ISO audits.",
  },
  {
    title: "Targeted Higher Education & Certifications",
    category: "Strategic Learning",
    icon: GraduationCap,
    description:
      "Evaluate Executive MBA, specialized M.Tech, or selective diplomas with clear clarity on whether the credential actually moves the needle.",
    realisticMechanism:
      "Testing the subject matter in practical micro-projects beforehand ensures you only invest in higher degrees when the ROI is undeniable.",
    illustrativeScenario:
      "A software developer completes a financial modeling trial and decides to pursue an Executive MBA to enter venture investment.",
  },
];

export function ProfessionalOpportunitiesSection() {
  return (
    <section id="opportunities" className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DBEAFE] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real-World Possibilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Connect capability to{" "}
            <span className="text-[#2563EB]">
              real professional outcomes.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Professional development is much broader than just browsing external job listings. Practical capabilities open multiple pathways for long-term career growth, internal recognition, and professional autonomy.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] border border-[#E8E6F3] text-[11px] text-[#626987] shadow-xs">
            <AlertCircle className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Illustrative professional vectors · Not a live job board or recruitment agency</span>
          </div>
        </div>

        {/* 6 Opportunity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {OPPORTUNITY_VECTORS.map((vec, idx) => {
            const Icon = vec.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#FAF9F6] border border-[#E8E6F3] hover:border-[#BFDBFE] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE] flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#2563EB] border border-[#DBEAFE]">
                      {vec.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#171A2B] mb-2 leading-snug">
                    {vec.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#626987] leading-relaxed mb-4">
                    {vec.description}
                  </p>

                  <div className="p-3.5 rounded-xl bg-white border border-[#E8E6F3] space-y-1 mb-4">
                    <span className="text-[10px] font-bold text-[#171A2B] uppercase tracking-wider block">
                      How It Actually Works:
                    </span>
                    <p className="text-xs text-[#474D66] leading-relaxed">
                      {vec.realisticMechanism}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8E6F3]">
                  <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block mb-0.5">
                    Illustrative Scenario:
                  </span>
                  <p className="text-xs text-[#1E40AF] italic leading-relaxed">
                    &ldquo;{vec.illustrativeScenario}&rdquo;
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Truth Invariant Notice */}
        <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-[#FAF9F6] border-2 border-[#E8E6F3] shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#171A2B]">
                Ethical Platform Boundaries &amp; No Vacancy Claims
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-[#474D66] leading-relaxed">
                Next Move AI is <strong>not a commercial placement agency, recruitment consultancy, headhunting service, or live job portal</strong>. We do not invent vacancies, post fabricated salary ranges, or guarantee employment interviews. Our mission is strictly focused on cognitive clarity, transferable capability analysis, and self-directed professional capability building.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
