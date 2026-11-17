"use client";

import React, { useState } from "react";
import {
  Compass,
  Code,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

interface RoadmapStep {
  question: string;
  headline: string;
  detail: string;
  actionableArtifact: string;
}

interface SampleRoadmap {
  id: string;
  title: string;
  discipline: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  summary: string;
  steps: RoadmapStep[];
}

const SAMPLE_ROADMAPS: SampleRoadmap[] = [
  {
    id: "fullstack-systems",
    title: "Modern Web Systems & Distributed State",
    discipline: "Degree (BCA/B.Sc) & Engineering (CS/IT)",
    icon: Code,
    tag: "Software Engineering",
    summary:
      "A structured pathway starting from DOM events and asynchronous JavaScript, progressing through database indexing, and culminating in a production-ready micro-service.",
    steps: [
      {
        question: "1. What should I try first?",
        headline: "DOM Event Life Cycle & Asynchronous Fetch",
        detail:
          "Write a minimal 30-line script that listens to user inputs, handles promise rejections, and renders live data without framework overhead.",
        actionableArtifact: "Working interactive vanilla JS micro-app with error boundaries.",
      },
      {
        question: "2. What should I learn next?",
        headline: "Component State Management & Relational Schemas",
        detail:
          "Learn how client state synchronizes with database records. Design a 3-table normalized PostgreSQL schema and write parameterized queries.",
        actionableArtifact: "Documented relational schema diagram with primary and foreign key constraints.",
      },
      {
        question: "3. Why does it matter?",
        headline: "Prevents Race Conditions & Data Corruption",
        detail:
          "Most junior developer bugs come from unhandled asynchronous states or loose database constraints. Understanding this early separates you immediately.",
        actionableArtifact: "Unit tests simulating slow network responses.",
      },
      {
        question: "4. How do I practise it?",
        headline: "Build a Full-Stack Collaborative Board",
        detail:
          "Build an issue tracker where cards move across columns, updating the database in real time with optimistic UI updates.",
        actionableArtifact: "Deployed full-stack app with verified API latency under 150ms.",
      },
      {
        question: "5. What demonstrates progress?",
        headline: "Reviewed Edge Cases & Defensible Code Architecture",
        detail:
          "Your code passes review: handles network dropouts, validates user inputs on both client and server, and uses indexed queries.",
        actionableArtifact: "Peer or mentor code review checklist with resolved critique comments.",
      },
      {
        question: "6. What options could follow?",
        headline: "Cloud Deployment, Mobile APIs, or Full-Stack Roles",
        detail:
          "With demonstrable full-stack proof, explore cloud infrastructure (Docker/AWS), mobile cross-platform frameworks, or junior engineering internships.",
        actionableArtifact: "Production Git repository with clear README and architecture diagram.",
      },
    ],
  },
  {
    id: "data-bi",
    title: "Business Intelligence & Applied Data Analytics",
    discipline: "Degree (B.Com/BBA/BCA) & Engineering",
    icon: TrendingUp,
    tag: "Data Science & BI",
    summary:
      "A pathway that bridges spreadsheet formulas with relational SQL queries and dashboard narrative presentations for operational decision-making.",
    steps: [
      {
        question: "1. What should I try first?",
        headline: "Spreadsheet Data Cleansing & Pivot Distributions",
        detail:
          "Audit 100 rows of customer order data: identify missing records, normalize date formats, and calculate average order value by city.",
        actionableArtifact: "Cleaned spreadsheet with documented anomaly corrections.",
      },
      {
        question: "2. What should I learn next?",
        headline: "Relational SQL Joins & Window Aggregations",
        detail:
          "Write multi-table SQL queries using LEFT JOIN, GROUP BY, and RANK() window functions to identify repeat purchase behavior.",
        actionableArtifact: "Annotated SQL query file with query plan explanations.",
      },
      {
        question: "3. Why does it matter?",
        headline: "Businesses Run on Unit Economics, Not Raw Data",
        detail:
          "Executives need to know gross margin trends and churn risks, not just spreadsheet dumps. Transforming numbers into strategy is in high demand.",
        actionableArtifact: "Executive KPI scorecard summarizing key growth levers.",
      },
      {
        question: "4. How do I practise it?",
        headline: "Analyze a Retail Outlet&apos;s Stagnant Stock",
        detail:
          "Take an open retail dataset, compute inventory velocity by category, and pinpoint which product lines tied up working capital without margin.",
        actionableArtifact: "Interactive BI dashboard with drill-down filters.",
      },
      {
        question: "5. What demonstrates progress?",
        headline: "Data Integrity Defense & Metric Accuracy",
        detail:
          "You can explain why your analysis excluded specific edge cases and defend the methodology used to calculate customer lifetime value.",
        actionableArtifact: "1-page methodology audit note alongside dashboard findings.",
      },
      {
        question: "6. What options could follow?",
        headline: "Analytics Roles, Business Operations, or Graduate Studies",
        detail:
          "Leverage your portfolio for business analyst roles, operations planning, or higher studies in data science and management.",
        actionableArtifact: "Demonstrated portfolio containing 2 real business case analyses.",
      },
    ],
  },
  {
    id: "commerce-finance",
    title: "Corporate Finance, Unit Economics & Modeling",
    discipline: "Degree (B.Com/BBA) & Polytechnic Commerce",
    icon: FileSpreadsheet,
    tag: "Commerce & Corporate Finance",
    summary:
      "Progress from fundamental ledger accounting to dynamic pro-forma three-statement financial modeling and capital budgeting sensitivity analysis.",
    steps: [
      {
        question: "1. What should I try first?",
        headline: "Unit Contribution Margin & Break-Even Analysis",
        detail:
          "Map fixed overheads vs. variable costs for a micro-enterprise. Compute the exact unit sales needed to achieve operational profitability.",
        actionableArtifact: "Break-even sensitivity calculation spreadsheet.",
      },
      {
        question: "2. What should I learn next?",
        headline: "Integrated Three-Statement Financial Model",
        detail:
          "Connect the Income Statement, Balance Sheet, and Cash Flow Statement so that changes in working capital automatically reflect in cash balances.",
        actionableArtifact: "Dynamic linked 3-statement model in Excel / Google Sheets.",
      },
      {
        question: "3. Why does it matter?",
        headline: "Cash Flow Solvency Trumps Paper Profit",
        detail:
          "Profitable businesses go bankrupt every month due to poor working capital timing. Understanding cash conversion cycles is critical.",
        actionableArtifact: "Working capital cycle calculation model.",
      },
      {
        question: "4. How do I practise it?",
        headline: "Build a Pro-Forma Forecast for a Campus Venture",
        detail:
          "Forecast 36 months of cash flow for a student service or retail venture, incorporating seasonal spikes and debt service schedules.",
        actionableArtifact: "3-year forecast model with best-case and stress-test switches.",
      },
      {
        question: "5. What demonstrates progress?",
        headline: "Stress-Test Resilience & Audit Integrity",
        detail:
          "Your model handles sudden 20% cost inflation or 30-day payment delays from corporate clients without formula circularities or breaks.",
        actionableArtifact: "Stress-testing audit sheet proving financial resilience.",
      },
      {
        question: "6. What options could follow?",
        headline: "Financial Analyst Roles, MBA Prep, or Entrepreneurship",
        detail:
          "Apply your modeling rigor to corporate finance internships, commercial banking, venture capital research, or starting your own firm.",
        actionableArtifact: "Defensible financial model with executive assumptions memo.",
      },
    ],
  },
];

export function CollegeRoadmapPreview() {
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>("fullstack-systems");
  const activeRoadmap =
    SAMPLE_ROADMAPS.find((r) => r.id === selectedRoadmapId) || SAMPLE_ROADMAPS[0];

  return (
    <section id="college-roadmaps" className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE] shadow-xs">
            <Compass className="w-3.5 h-3.5" />
            <span>Actionable Progression Paths</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Actionable roadmaps designed around{" "}
            <span className="text-[#6757F5]">
              demonstrated capability.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Illustrative project sequences that focus on practical deliverables, clearly separating early exploratory practice from verified, reviewable capability. In our survey of 67 college students, over 70% stated they wanted clear, step-by-step roadmaps connecting classroom theory to practical employment requirements.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] border border-[#E8E6F3] text-[11px] text-[#626987] shadow-xs">
            <AlertCircle className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>Exploratory student survey findings (25 Engineering, 42 Degree) · Not representative national statistics</span>
          </div>
        </div>

        {/* Roadmap Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {SAMPLE_ROADMAPS.map((rm) => {
            const isSelected = rm.id === selectedRoadmapId;
            const Icon = rm.icon;
            return (
              <button
                key={rm.id}
                onClick={() => setSelectedRoadmapId(rm.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all border ${
                  isSelected
                    ? "bg-[#6757F5] text-white border-[#6757F5] shadow-md shadow-[#6757F5]/20 scale-[1.02]"
                    : "bg-[#FAF9F6] text-[#474D66] border-[#E8E6F3] hover:border-[#DDD8FE] hover:text-[#171A2B]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{rm.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Roadmap Container */}
        <div className="rounded-3xl bg-[#FAF9F6] border-2 border-[#DDD8FE] p-6 sm:p-8 lg:p-10 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#E8E6F3] mb-8">
            <div>
              <span className="text-[10px] font-bold text-[#6757F5] uppercase tracking-wider">
                {activeRoadmap.tag} · {activeRoadmap.discipline}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#171A2B]">
                {activeRoadmap.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#626987] leading-relaxed max-w-3xl">
                {activeRoadmap.summary}
              </p>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-white border border-[#DDD8FE] text-xs font-bold text-[#6757F5] self-start sm:self-auto shrink-0">
              6 Core Roadmap Invariants
            </span>
          </div>

          {/* 6 Step Cards Answering Core Invariant Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeRoadmap.steps.map((st, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-[#E8E6F3] flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-black text-[#6757F5] uppercase tracking-wider block mb-1">
                    {st.question}
                  </span>
                  <h4 className="text-sm font-bold text-[#171A2B] mb-2 leading-snug">
                    {st.headline}
                  </h4>
                  <p className="text-xs text-[#474D66] leading-relaxed mb-4">
                    {st.detail}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0EEF8] flex items-start gap-1.5 text-[11px] font-semibold text-[#065F46] bg-[#ECFDF5]/50 p-2 rounded-xl border border-[#A7F3D0]/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Demonstrable Proof:</strong> {st.actionableArtifact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reality Check Callout */}
        <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-white border border-[#E8E6F3] shadow-xs flex items-center gap-3 text-xs text-[#626987]">
          <ShieldCheck className="w-5 h-5 text-[#6757F5] shrink-0" />
          <p>
            <strong>Truth in Progress:</strong> Next Move AI roadmaps do not contain fabricated completion dates or guaranteed job placement claims. Progress is measured by the quality of projects you can explain, defend, and demonstrate.
          </p>
        </div>
      </div>
    </section>
  );
}
