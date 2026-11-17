"use client";

import React, { useState } from "react";
import {
  Code,
  TrendingUp,
  FileSpreadsheet,
  Palette,
  Workflow,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Layers,
} from "lucide-react";

interface ProjectBlueprint {
  id: string;
  category: string;
  categoryTag: string;
  title: string;
  discipline: string;
  icon: React.ComponentType<{ className?: string }>;
  problem: string;
  purpose: string;
  creates: string;
  capabilities: string[];
  feedbackCriteria: string;
  highlightStat: string;
}

const PROJECT_BLUEPRINTS: ProjectBlueprint[] = [
  {
    id: "web-transit-tracker",
    category: "Technology",
    categoryTag: "Web & API Architecture",
    title: "Responsive Transit Tracker & Micro-API",
    discipline: "Degree (BCA/B.Sc) & Engineering (B.Tech)",
    icon: Code,
    problem:
      "Daily bus commuters face delays because route schedules exist only as unsearchable static PDF notices with no live status.",
    purpose:
      "Connect a mobile-responsive web interface to asynchronous REST API endpoints with fallback error handling for patchy mobile connections.",
    creates:
      "A functioning web application featuring live route searches, status badges, and localized offline caching.",
    capabilities: [
      "Asynchronous REST APIs",
      "State Management",
      "Network Error Recovery",
      "Responsive Layouts",
    ],
    feedbackCriteria:
      "Evaluates graceful degradation during network dropouts, DOM rendering performance, and accessible UI contrast.",
    highlightStat: "Production-grade micro project",
  },
  {
    id: "data-retail-churn",
    category: "Data Analytics",
    categoryTag: "Data & Business Insights",
    title: "Retail Store Inventory & Margin Analysis",
    discipline: "Degree (B.Com/BBA/BCA) & Engineering",
    icon: TrendingUp,
    problem:
      "A regional retail outlet holds ₹8 Lakhs in stagnant inventory without clear data on which products drive gross profitability.",
    purpose:
      "Clean 500 rows of transactional records, categorize SKU velocity, and compute seasonal inventory turnover ratios.",
    creates:
      "A cleaned dataset notebook, visual margin distribution chart, and an executive memo recommending deadweight stock clearance.",
    capabilities: [
      "Data Cleansing",
      "Pandas & Spreadsheets",
      "Inventory Turnover Ratios",
      "Executive Data Synthesis",
    ],
    feedbackCriteria:
      "Examines data audit methods, treatment of missing records, and mathematical integrity of gross margin conclusions.",
    highlightStat: "Direct business application",
  },
  {
    id: "finance-cafe-model",
    category: "Commerce",
    categoryTag: "Financial Modeling",
    title: "Campus Cafe 3-Year Pro-Forma Cash Flow",
    discipline: "Degree (B.Com/BBA) & Polytechnic Commerce",
    icon: FileSpreadsheet,
    problem:
      "Student entrepreneurs want to launch a specialty cafe stall but lack financial visibility into when startup equipment costs will break even.",
    purpose:
      "Build a dynamic financial spreadsheet separating fixed equipment capital expenditure from daily variable ingredient costs.",
    creates:
      "A full pro-forma financial statement with dynamic price-switch sensitivities, break-even unit counters, and working capital buffers.",
    capabilities: [
      "Unit Contribution Margins",
      "Sensitivity Analysis",
      "Cash Flow Projections",
      "Financial Modeling",
    ],
    feedbackCriteria:
      "Reviews whether working capital requirements are adequately modeled and tests resilience against 20% ingredient inflation.",
    highlightStat: "Rigorous commercial modeling",
  },
  {
    id: "design-clinic-ux",
    category: "UI / UX Design",
    categoryTag: "Product & Usability",
    title: "Clinic Appointment Booking Usability Audit",
    discipline: "All Higher Ed Disciplines",
    icon: Palette,
    problem:
      "Older patients take an average of 9 minutes to book a consultation on a clinic portal and frequently abandon the workflow.",
    purpose:
      "Conduct a Nielsen Norman heuristic audit on the existing portal and design an accessible, frictionless 3-tap scheduling flow.",
    creates:
      "An annotated usability critique scorecard and a tested high-contrast prototype wireframe.",
    capabilities: [
      "Heuristic Evaluation",
      "WCAG Accessibility Standards",
      "Low-Fidelity Wireframing",
      "Cognitive Load Reduction",
    ],
    feedbackCriteria:
      "Evaluates clarity of error recovery messaging, touch-target sizing for elderly users, and form field minimalism.",
    highlightStat: "Human-centered design",
  },
  {
    id: "comms-deck",
    category: "Communication",
    categoryTag: "Executive Strategy",
    title: "B2B Logistics SaaS Executive Pitch Deck",
    discipline: "Degree, Final-Year & Engineering",
    icon: Sparkles,
    problem:
      "A software startup struggles to explain its warehouse route-optimization software to warehouse managers due to jargon-heavy presentations.",
    purpose:
      "Distill a complex mathematical routing algorithm into a compelling 10-slide executive pitch deck demonstrating measurable ROI.",
    creates:
      "A 10-slide executive slide deck structured around customer pain points, verified savings metrics, and deployment ease.",
    capabilities: [
      "Executive Narrative",
      "Value Proposition Framing",
      "Visual Hierarchy",
      "Audience Empathy",
    ],
    feedbackCriteria:
      "Scrutinizes whether the core business value is articulated within the first 3 slides without hiding behind technical buzzwords.",
    highlightStat: "Persuasive communication",
  },
  {
    id: "ops-warehouse",
    category: "Engineering & Ops",
    categoryTag: "Applied Operations",
    title: "Small Warehouse Buffer Stock Optimization",
    discipline: "Engineering (Mech/Prod) & Diploma",
    icon: Workflow,
    problem:
      "A small light-manufacturing assembly plant shuts down twice a month because assembly screws and fasteners run out unannounced.",
    purpose:
      "Apply classical inventory management models to establish reorder points and safety stock levels for high-velocity parts.",
    creates:
      "A visual Kanban replenishment manual with calculated reorder thresholds and buffer stock calculation formulas.",
    capabilities: [
      "Lean Operations",
      "Reorder Point Formulas",
      "Supplier Lead-Time Analysis",
      "Visual Process Controls",
    ],
    feedbackCriteria:
      "Examines whether lead-time variability is factored into the safety stock equation and how easily factory floor workers can interpret cards.",
    highlightStat: "Applied physical systems",
  },
];

export function CollegeProjectShowcase() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("web-transit-tracker");
  const activeProject =
    PROJECT_BLUEPRINTS.find((p) => p.id === selectedProjectId) || PROJECT_BLUEPRINTS[0];

  return (
    <section id="college-projects" className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE] shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>Practical Capability Proof</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Learn by building{" "}
            <span className="text-[#6757F5]">
              something meaningful.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Real capability isn&apos;t proven by collecting attendance certificates or watching video playlists. It is forged when you solve messy problems, manage trade-offs, and defend your work.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E6F3] text-[11px] text-[#626987] shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>Illustrative project specifications for practical learning · Not real student submissions or corporate vacancies</span>
          </div>
        </div>

        {/* 6 Project Blueprint Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {PROJECT_BLUEPRINTS.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            const Icon = proj.icon;
            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`p-6 rounded-3xl transition-all duration-200 cursor-pointer flex flex-col justify-between border-2 ${
                  isSelected
                    ? "bg-white border-[#6757F5] shadow-lg shadow-[#6757F5]/10 scale-[1.01]"
                    : "bg-white/80 border-[#E8E6F3] hover:border-[#DDD8FE] hover:bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-[10px] font-extrabold uppercase tracking-wider border border-[#DDD8FE] inline-flex items-center gap-1">
                      <Icon className="w-3 h-3" />
                      <span>{proj.category}</span>
                    </span>
                    <span className="text-[10px] text-[#7B82A0] font-semibold">
                      {proj.categoryTag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#171A2B] mb-1.5 leading-snug">
                    {proj.title}
                  </h3>

                  <span className="text-[11px] font-semibold text-[#6757F5] block mb-3">
                    {proj.discipline}
                  </span>

                  <p className="text-xs text-[#626987] leading-relaxed mb-4 line-clamp-3">
                    {proj.problem}
                  </p>
                </div>

                <div>
                  <div className="pt-3 border-t border-[#F0EEF8] flex flex-wrap gap-1.5 mb-3">
                    {proj.capabilities.slice(0, 3).map((cap, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E8E6F3] text-[10px] font-semibold text-[#474D66]"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-[#6757F5]">
                    <span>{proj.highlightStat}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Project In-Depth Breakdown Modal/Card */}
        <div className="rounded-3xl bg-white border-2 border-[#DDD8FE] p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0EEF8] mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0">
                <activeProject.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#6757F5] uppercase tracking-wider">
                  Detailed Blueprint · {activeProject.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#171A2B]">
                  {activeProject.title}
                </h3>
              </div>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-[#FAF9F6] border border-[#E8E6F3] text-xs font-bold text-[#171A2B] self-start sm:self-auto">
              Curriculum Relevance: {activeProject.discipline}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-[#626987] uppercase tracking-wider mb-1">
                  1. The Real-World Problem:
                </h4>
                <p className="text-sm text-[#171A2B] leading-relaxed bg-[#FAF9F6] p-3.5 rounded-xl border border-[#E8E6F3]">
                  {activeProject.problem}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#626987] uppercase tracking-wider mb-1">
                  2. What You Build &amp; Create:
                </h4>
                <p className="text-sm text-[#171A2B] leading-relaxed bg-[#FAF9F6] p-3.5 rounded-xl border border-[#E8E6F3]">
                  {activeProject.creates}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-[#626987] uppercase tracking-wider mb-1">
                  3. Key Capabilities Practised:
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeProject.capabilities.map((cap, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-[#EDEAFF] text-[#4338CA] text-xs font-bold border border-[#DDD8FE]"
                    >
                      ✓ {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#626987] uppercase tracking-wider mb-1">
                  4. What Meaningful Review Evaluates:
                </h4>
                <div className="p-3.5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-xs sm:text-sm text-[#065F46] leading-relaxed">
                  <strong>Rubric Criteria:</strong> {activeProject.feedbackCriteria}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
