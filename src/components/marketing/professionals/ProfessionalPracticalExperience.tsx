"use client";

import React, { useState } from "react";
import {
  Sparkles,
  BarChart2,
  Workflow,
  Calendar,
  Headphones,
  Cpu,
  Search,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

interface PracticalTrial {
  id: string;
  title: string;
  category: "Analytical" | "Process" | "Management" | "Service" | "Automation" | "Strategy";
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  summary: string;
  task: {
    context: string;
    actionSteps: string[];
  };
  expectedOutput: {
    format: string;
    details: string;
  };
  reflectionQuestion: string;
  suggestedNextActivity: string;
}

const PRACTICAL_TRIALS: PracticalTrial[] = [
  {
    id: "sales-dataset",
    title: "Analyse a Multi-Channel Sales Dataset",
    category: "Analytical",
    icon: BarChart2,
    tag: "Data & Revenue Ops",
    summary:
      "Inspect 3 months of transaction records to uncover regional churn and identify which customer segment drives 60% of recurring profit.",
    task: {
      context:
        "You are given a simulated 200-row spreadsheet containing regional orders, fulfillment dates, product categories, and gross margins.",
      actionSteps: [
        "Filter for orders where delivery exceeded 5 days and compare customer refund rates.",
        "Use a Pivot Table to compute net profit margin by product category.",
        "Pinpoint the single channel with declining quarterly repeat purchase rates.",
      ],
    },
    expectedOutput: {
      format: "1-Page Executive Summary Table",
      details:
        "A 3-column breakdown showing channel margin variance, refund percentages, and 2 actionable inventory re-allocation recommendations.",
    },
    reflectionQuestion:
      "When numbers drop, what operational or customer factors outside the spreadsheet might explain the decline before you blame the sales team?",
    suggestedNextActivity:
      "Progress to writing SQL queries that automate this weekly cohort breakdown rather than manually refreshing spreadsheets.",
  },
  {
    id: "operational-workflow",
    title: "Map an Operational Hand-Off Workflow",
    category: "Process",
    icon: Workflow,
    tag: "Operations & Systems",
    summary:
      "Audit a 6-stage warehouse dispatch process to eliminate manual email checkpoints that create 48-hour delivery backlogs.",
    task: {
      context:
        "An e-commerce order passes through inventory picking, packaging, address verification, and courier hand-off, but address mismatches stall the entire line.",
      actionSteps: [
        "Trace where physical paperwork transfers between shift supervisors.",
        "Highlight steps requiring verbal confirmation rather than a digital status timestamp.",
        "Formulate a standardized exception protocol for invalid pincodes.",
      ],
    },
    expectedOutput: {
      format: "Visual Workflow Diagram & Exception SOP",
      details:
        "A clear lane flowchart marking responsible owners, maximum permitted queue times, and automated failure-alert thresholds.",
    },
    reflectionQuestion:
      "Why do frontline floor workers frequently bypass official software systems to use informal WhatsApp chats, and how can your process address their real pain point?",
    suggestedNextActivity:
      "Build a low-code automated notification rule that alerts logistics coordinators the instant a package is delayed by more than 3 hours.",
  },
  {
    id: "project-plan",
    title: "Create a Realistic 30-Day Project Plan",
    category: "Management",
    icon: Calendar,
    tag: "Delivery & Coordination",
    summary:
      "Scope a software or operational rollout while incorporating real-world constraints: buffer time, vendor holidays, and executive approvals.",
    task: {
      context:
        "Your company is migrating from paper expense reimbursements to a mobile tool. You must launch across 3 departments in 4 weeks.",
      actionSteps: [
        "Decompose the rollout into 3 distinct workstreams: Tool Setup, Employee Training, and Finance Reconciliation.",
        "Add realistic 2-day contingency buffers for department heads who submit reviews late.",
        "Define 1 clear 'Go / No-Go' launch gate checklist for the CFO.",
      ],
    },
    expectedOutput: {
      format: "Gantt Timeline & Critical Path Matrix",
      details:
        "A structured timeline with milestones, primary risk mitigations, and weekly status communication templates.",
    },
    reflectionQuestion:
      "If a project falls 4 days behind schedule in Week 2, do you cut features, add weekend overtime, or reset executive expectations—and what are the trade-offs of each?",
    suggestedNextActivity:
      "Run an agile retrospective simulation to practice facilitating difficult team conversations when deliverables miss deadlines.",
  },
  {
    id: "customer-service",
    title: "Design a High-Touch Customer Service Process",
    category: "Service",
    icon: Headphones,
    tag: "Customer Experience",
    summary:
      "Construct a tiered customer escalation architecture that balances rapid AI self-service with empathetic human intervention for sensitive issues.",
    task: {
      context:
        "A fintech or education service is experiencing customer anxiety during payment failures. Current bot responses sound dismissive.",
      actionSteps: [
        "Categorize customer inquiries into routine questions (balance check) vs. high-anxiety events (money deducted but transaction failed).",
        "Write 2 de-escalation communication templates emphasizing active listening and immediate assurance.",
        "Set strict SLA (Service Level Agreement) routing rules sending anxious customers directly to senior specialists.",
      ],
    },
    expectedOutput: {
      format: "Customer Journey Flow & De-escalation Scripts",
      details:
        "A visual routing tree with empathetic scripts and maximum 5-minute response guarantees for financial discrepancies.",
    },
    reflectionQuestion:
      "How do you measure whether a customer service interaction was truly successful beyond simplistic metrics like 'average handle time'?",
    suggestedNextActivity:
      "Shadow an escalated customer call and synthesize recurring friction points into product feature change requests.",
  },
  {
    id: "digital-automation",
    title: "Evaluate a Digital Automation Opportunity",
    category: "Automation",
    icon: Cpu,
    tag: "Low-Code & Tech Ops",
    summary:
      "Assess whether automating a manual invoice reconciliation process actually saves money or just introduces expensive software maintenance overhead.",
    task: {
      context:
        "An administrative team spends 15 hours a week matching PDF vendor invoices against purchase orders. A vendor wants to sell a $5,000/year OCR AI tool.",
      actionSteps: [
        "Calculate the true hourly labor cost of the current manual task.",
        "Factor in exception handling time when OCR misreads handwritten vendor receipts.",
        "Compare the vendor's enterprise software cost against a lightweight Google Sheets + script alternative.",
      ],
    },
    expectedOutput: {
      format: "Automation ROI & Feasibility Assessment Memo",
      details:
        "A 2-page decision memo showing break-even months, risk of vendor lock-in, and an honest recommendation on whether to automate or standardize first.",
    },
    reflectionQuestion:
      "Why is automating a broken, messy manual process usually worse than keeping it manual until the underlying workflow is clean?",
    suggestedNextActivity:
      "Prototype a free, lightweight webhook trigger using Zapier, Make, or Google Apps Script to test the concept with zero software budget.",
  },
  {
    id: "industry-problem",
    title: "Investigate an Industry Structural Problem",
    category: "Strategy",
    icon: Search,
    tag: "Strategic Analysis",
    summary:
      "Analyze why regional tier-2 logistics providers struggle with last-mile delivery economics during monsoon and festival seasons.",
    task: {
      context:
        "E-commerce growth in tier-2 and tier-3 Indian towns is surging, but delivery vehicle breakdowns and cash-on-delivery refusals erode margins.",
      actionSteps: [
        "Map the 3 biggest operational friction points: cash reconciliation delays, driver turnover, and unpaved road navigation.",
        "Benchmark local shared-hub models versus dedicated carrier fleets.",
        "Formulate a pilot proposal utilizing hyper-local neighborhood kirana drop-points.",
      ],
    },
    expectedOutput: {
      format: "Strategic Problem Brief & Pilot Proposal",
      details:
        "A structured briefing memo highlighting the unit economics of kirana-assisted delivery versus traditional failed-attempt van costs.",
    },
    reflectionQuestion:
      "What local social trust factors in Indian towns make community-based pickup points more resilient than automated locker boxes?",
    suggestedNextActivity:
      "Interview 2 local retail shop owners or logistics delivery riders to validate your assumptions against actual daily ground reality.",
  },
];

export function ProfessionalPracticalExperience() {
  const [selectedTrialId, setSelectedTrialId] = useState<string>("sales-dataset");
  const [userReflection, setUserReflection] = useState<string>("");
  const [reflectionSubmitted, setReflectionSubmitted] = useState<boolean>(false);

  const activeTrial =
    PRACTICAL_TRIALS.find((t) => t.id === selectedTrialId) || PRACTICAL_TRIALS[0];

  const handleTrialChange = (id: string) => {
    setSelectedTrialId(id);
    setUserReflection("");
    setReflectionSubmitted(false);
  };

  return (
    <section id="practical-preview" className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DBEAFE] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Practical Demonstration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Experience a possible{" "}
            <span className="text-[#2563EB]">
              next direction.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Before committing thousands of rupees or months of evening hours to an expensive course, test what the work actually looks and feels like through a curated 20-minute practical trial.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] border border-[#E8E6F3] text-[11px] text-[#626987] shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Public demonstration preview · Zero account required · Zero personal data collected</span>
          </div>
        </div>

        {/* 6 Trial Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-10">
          {PRACTICAL_TRIALS.map((trial) => {
            const isSelected = trial.id === selectedTrialId;
            const Icon = trial.icon;

            return (
              <button
                key={trial.id}
                onClick={() => handleTrialChange(trial.id)}
                className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  isSelected
                    ? "bg-[#EFF6FF] border-[#2563EB] text-[#171A2B] shadow-xs ring-1 ring-[#2563EB]"
                    : "bg-[#FAF9F6] border-[#E8E6F3] text-[#626987] hover:border-[#BFDBFE] hover:text-[#171A2B]"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 ${
                    isSelected
                      ? "bg-[#2563EB] text-white"
                      : "bg-white text-[#2563EB] border border-[#E8E6F3]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block">
                    {trial.category}
                  </span>
                  <h4 className="text-xs font-bold leading-tight mt-0.5 line-clamp-2">
                    {trial.title}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Trial Detailed Container */}
        <div className="rounded-3xl bg-[#FAF9F6] border-2 border-[#DBEAFE] p-6 sm:p-8 lg:p-10 shadow-sm mb-8">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E6F3] mb-8">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                <activeTrial.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                  {activeTrial.tag} · Curated Practical Exercise
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#171A2B] tracking-tight">
                  {activeTrial.title}
                </h3>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-white border border-[#DBEAFE] text-xs font-bold text-[#2563EB] self-start sm:self-auto">
              ⏱ 20–25 Mins Hands-on Trial
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 Columns: Context, Task, & Expected Output */}
            <div className="lg:col-span-7 space-y-6">
              {/* Context */}
              <div>
                <h4 className="text-xs font-bold text-[#626987] uppercase tracking-wider mb-2">
                  1. Scenario Context:
                </h4>
                <p className="text-sm text-[#171A2B] leading-relaxed bg-white p-4 rounded-2xl border border-[#E8E6F3]">
                  {activeTrial.task.context}
                </p>
              </div>

              {/* Action Steps */}
              <div>
                <h4 className="text-xs font-bold text-[#626987] uppercase tracking-wider mb-2">
                  2. What You Would Actually Do:
                </h4>
                <div className="p-4 rounded-2xl bg-white border border-[#E8E6F3] space-y-2.5">
                  {activeTrial.task.actionSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#373D54]">
                      <span className="w-5 h-5 rounded-full bg-[#EFF6FF] text-[#2563EB] font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tangible Output */}
              <div>
                <h4 className="text-xs font-bold text-[#10B981] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>3. Expected Tangible Deliverable:</span>
                </h4>
                <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-1">
                  <span className="text-xs font-bold text-[#065F46] block">
                    {activeTrial.expectedOutput.format}
                  </span>
                  <p className="text-xs sm:text-sm text-[#047857] leading-relaxed">
                    {activeTrial.expectedOutput.details}
                  </p>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Reflection Question, Sandbox & Next Activity */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              {/* Reflection Sandbox */}
              <div className="p-5 rounded-2xl bg-white border-2 border-[#E8E6F3] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#F0EEF8] mb-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#171A2B]">
                      <HelpCircle className="w-4 h-4 text-[#2563EB]" />
                      <span>Critical Reflection Question</span>
                    </div>
                    <span className="text-[10px] text-[#7B82A0]">Judgment Check</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#1E40AF] bg-[#EFF6FF] p-3 rounded-xl border border-[#DBEAFE] font-medium leading-relaxed mb-4">
                    &ldquo;{activeTrial.reflectionQuestion}&rdquo;
                  </p>

                  {!reflectionSubmitted ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (userReflection.trim()) setReflectionSubmitted(true);
                      }}
                      className="space-y-2.5"
                    >
                      <textarea
                        rows={3}
                        value={userReflection}
                        onChange={(e) => setUserReflection(e.target.value)}
                        placeholder="Type your brief perspective here (e.g. In my team, communication breakdown usually happens because...)"
                        className="w-full text-xs p-3 rounded-xl border border-[#D5D8E2] bg-[#FAF9F6] text-[#171A2B] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                      />
                      <button
                        type="submit"
                        disabled={!userReflection.trim()}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold hover:bg-[#1D4ED8] transition-colors disabled:opacity-40"
                      >
                        <span>Simulate My Partner Feedback</span>
                        <Sparkles className="w-3 h-3" />
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-3 animate-fade-in">
                      <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] text-xs text-[#373D54]">
                        <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block mb-1">
                          My Partner Analytical Review:
                        </span>
                        <p className="leading-relaxed">
                          Your observation directly highlights the difference between academic theory and operational reality. Practical capability means identifying these human and business nuances before rushing to build a tool.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setUserReflection("");
                          setReflectionSubmitted(false);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#626987] hover:text-[#171A2B]"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset answer</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0EEF8] text-[10px] text-[#7B82A0]">
                  Client-side simulation · Zero data transmitted
                </div>
              </div>

              {/* Suggested Next Activity */}
              <div className="p-4 rounded-2xl bg-[#EFF6FF]/60 border border-[#DBEAFE]">
                <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block mb-1">
                  Logical Next Progression Step:
                </span>
                <p className="text-xs text-[#1E40AF] leading-relaxed mb-2">
                  {activeTrial.suggestedNextActivity}
                </p>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#2563EB]">
                  <span>Builds naturally on this trial deliverable</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ethical Quality Callout */}
        <div className="p-4 rounded-2xl bg-white border border-[#E8E6F3] text-center max-w-3xl mx-auto flex items-center justify-center gap-2 text-xs text-[#626987]">
          <AlertCircle className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
          <span>
            <strong>Authentic Learning Principle:</strong> Completing one practical trial provides clarity about whether you enjoy the day-to-day work. It does not replace extensive professional training or guarantee a job offer.
          </span>
        </div>
      </div>
    </section>
  );
}
