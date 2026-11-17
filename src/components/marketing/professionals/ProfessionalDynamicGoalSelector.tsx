"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  RefreshCw,
  Compass,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Layers,
  Sparkles,
  RotateCcw,
  Target,
} from "lucide-react";

export type ProfessionalGoal = "upskill" | "reskill" | "transition";

interface GoalProfile {
  id: ProfessionalGoal;
  title: string;
  badge: string;
  tagline: string;
  userStatement: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  corePrinciple: string;
  examples: {
    role: string;
    targetGrowth: string;
    existingStrengths: string[];
    developmentAreas: string[];
    sampleActivity: {
      task: string;
      expectedOutput: string;
      duration: string;
    };
    flexiblePathway: string[];
  }[];
}

const GOAL_PROFILES: Record<ProfessionalGoal, GoalProfile> = {
  upskill: {
    id: "upskill",
    title: "Upskill",
    badge: "Grow in Place",
    tagline: "Deepen capability within your existing profession",
    userStatement: "I want to grow in my existing profession.",
    icon: TrendingUp,
    description:
      "Deepen your expertise, adopt modern digital methods, and handle higher-level strategic responsibilities without having to abandon the professional capital you have built over years.",
    corePrinciple:
      "You do not need to switch careers to benefit. Existing deep domain knowledge is the foundation upon which modern analytical and automation skills become truly valuable.",
    examples: [
      {
        role: "Marketing Professional",
        targetGrowth: "Data-Driven Campaign Measurement & Analytics",
        existingStrengths: [
          "Audience segmentation & messaging",
          "Brand tone & creative storytelling",
          "Customer empathy & campaign execution",
        ],
        developmentAreas: [
          "SQL for multi-channel acquisition queries",
          "Cohort retention & CAC-to-LTV attribution modeling",
          "A/B testing statistical significance checks",
        ],
        sampleActivity: {
          task: "Audit 3 months of campaign conversion data in Google Sheets or SQL. Identify which acquisition channel has the highest drop-off rate between click and signup.",
          expectedOutput: "A 1-page channel drop-off analysis table with 2 concrete hypotheses for creative optimization.",
          duration: "25–30 Mins",
        },
        flexiblePathway: [
          "Review raw spreadsheet export and calculate cost per acquisition",
          "Learn basic SQL SELECT and GROUP BY queries on sample data",
          "Design a hypothesis-driven landing page A/B test",
          "Present campaign performance with unit-economic rigor",
        ],
      },
      {
        role: "Operations Professional",
        targetGrowth: "Process Analysis, Bottleneck Discovery & Automation",
        existingStrengths: [
          "Vendor coordination & escalation handling",
          "Inventory flow & operational compliance",
          "Daily floor problem-solving under tight deadlines",
        ],
        developmentAreas: [
          "Value-stream mapping & cycle-time breakdown",
          "Low-code automation triggers (e.g., webhook notifications)",
          "Error-budgeting and root-cause analysis frameworks",
        ],
        sampleActivity: {
          task: "Map the step-by-step handoff process for customer delivery escalations. Document exactly where information waits more than 4 hours for manual approval.",
          expectedOutput: "A visual flow diagram highlighting the 1 major bottleneck and a proposed asynchronous notification rule.",
          duration: "20–25 Mins",
        },
        flexiblePathway: [
          "Document current operational handoffs and delay durations",
          "Map inputs, outputs, and responsible owners in a flowchart",
          "Prototype an automated spreadsheet trigger or status alert",
          "Establish an error log to track recurring operational failures",
        ],
      },
      {
        role: "Teacher / Educator",
        targetGrowth: "Practical AI & Digital Learning Tools Integration",
        existingStrengths: [
          "Curriculum planning & pedagogical sequencing",
          "Formative student evaluation & diagnostic questioning",
          "Classroom engagement & differentiated pacing",
        ],
        developmentAreas: [
          "Prompt design for differentiated practice problem generation",
          "Digital rubric authoring with automated feedback checks",
          "Adaptive lesson micro-modules for mixed-ability classrooms",
        ],
        sampleActivity: {
          task: "Design an AI prompt template that generates three tiered reading comprehension questions (basic recall, conceptual analysis, real-world application) for a Grade 8 topic.",
          expectedOutput: "A reusable prompt template with guidelines on how to spot and correct AI hallucinations before sharing with students.",
          duration: "20 Mins",
        },
        flexiblePathway: [
          "Identify one lesson topic where students commonly struggle",
          "Draft and refine a Socratic prompt template for concept review",
          "Test the prompt with sample student responses to check edge cases",
          "Assemble a verified digital question bank with teacher review notes",
        ],
      },
    ],
  },
  reskill: {
    id: "reskill",
    title: "Reskill",
    badge: "Adapt & Expand",
    tagline: "Develop capabilities for new responsibilities or emerging work",
    userStatement: "I want to develop capabilities for new responsibilities or emerging work.",
    icon: RefreshCw,
    description:
      "Prepare for shifting organizational needs, modern workflow tools, or internal department transitions while carrying forward your valuable organizational and stakeholder expertise.",
    corePrinciple:
      "Reskilling is never starting from zero. Your documentation rigor, stakeholder handling, and business acumen give you a massive head start over a beginner with only theoretical tool knowledge.",
    examples: [
      {
        role: "Administrative Professional",
        targetGrowth: "Digital Operations & Workflow Automation Specialist",
        existingStrengths: [
          "Documentation rigor & audit compliance",
          "Process management & cross-department coordination",
          "High reliability in meeting administrative deadlines",
        ],
        developmentAreas: [
          "Low-code database schemas (Airtable / Notion / Supabase)",
          "Automated approval workflows via webhooks and rules",
          "Standard Operating Procedure (SOP) documentation for automated systems",
        ],
        sampleActivity: {
          task: "Convert a paper-based or email-heavy vendor onboarding checklist into a structured 4-step digital workflow with automated reminders.",
          expectedOutput: "A clear workflow architecture schema showing trigger events, validation steps, and escalation paths.",
          duration: "25 Mins",
        },
        flexiblePathway: [
          "Catalogue every manual form and email approval in your current role",
          "Learn relational tables (linking records, avoiding duplicate data)",
          "Build a working automated onboarding prototype in a sandbox",
          "Write an audit-ready maintenance guide for internal teams",
        ],
      },
      {
        role: "Customer Support Specialist",
        targetGrowth: "Customer Success Operations & Knowledge Base Architect",
        existingStrengths: [
          "Deep understanding of recurring user pain points",
          "Empathetic de-escalation & troubleshooting clarity",
          "Ticket triage & priority management under pressure",
        ],
        developmentAreas: [
          "Ticket trend clustering & root-cause product feedback loops",
          "Self-serve documentation architecture & SEO structure",
          "Churn early-warning indicator tracking",
        ],
        sampleActivity: {
          task: "Review 20 sample customer support inquiries. Group them into 3 root causes and draft 1 self-serve knowledge base article that answers the top issue definitively.",
          expectedOutput: "A structured help guide with step-by-step screenshots and an FAQ checklist that reduces ticket repetition.",
          duration: "30 Mins",
        },
        flexiblePathway: [
          "Analyze 50 recent support tickets for recurring pattern tags",
          "Draft modular troubleshooting guides for common failure modes",
          "Coordinate with product managers to prioritize bug fixes",
          "Track self-service deflection metrics over a 30-day window",
        ],
      },
      {
        role: "Quality Assurance / Inspection Officer",
        targetGrowth: "Systems Compliance & Digital Audit Analyst",
        existingStrengths: [
          "Meticulous attention to physical and process defects",
          "Strict adherence to industry compliance standards",
          "Defect documentation and traceability logging",
        ],
        developmentAreas: [
          "Digital inspection checklists & mobile audit forms",
          "Defect Pareto analysis using spreadsheet pivot tables",
          "Preventive maintenance trigger design",
        ],
        sampleActivity: {
          task: "Take a 10-point manual inspection clipboard and design a structured digital data schema that flags out-of-tolerance measurements automatically.",
          expectedOutput: "A digital inspection template with conditional formatting rules highlighting critical safety variances.",
          duration: "25 Mins",
        },
        flexiblePathway: [
          "Translate paper checklists into normalized data fields",
          "Learn conditional logic formulas (IF, AND, VLOOKUP / XLOOKUP)",
          "Construct a visual Pareto defect dashboard",
          "Draft a preventive corrective action memo for plant leadership",
        ],
      },
    ],
  },
  transition: {
    id: "transition",
    title: "Career Transition",
    badge: "Realistic Pivot",
    tagline: "Explore moving into an adjacent or different professional direction",
    userStatement: "I want to explore moving into a different professional direction.",
    icon: Compass,
    description:
      "Explore changing industries or career tracks with complete realism regarding time, family commitments, financial buffers, and actual market expectations—without false promises of 30-day miracles.",
    corePrinciple:
      "We never force every professional toward software coding. Successful transitions leverage authentic skill adjacencies, respecting your financial obligations and available hours.",
    examples: [
      {
        role: "Non-IT Professional (e.g., Banking, Retail, Education)",
        targetGrowth: "Transitioning toward Technology-Enabled Roles",
        existingStrengths: [
          "Domain knowledge in regulated operations or sales",
          "Real-world business judgment and customer expectations",
          "Professional resilience and collaborative team experience",
        ],
        developmentAreas: [
          "Understanding system architectures without needing to code",
          "Translating business needs into clear technical user stories",
          "Agile sprint ceremonies and product backlog grooming",
        ],
        sampleActivity: {
          task: "Compare three possible transition tracks (Business Systems Analyst vs. Customer Success Manager vs. Technical Project Coordinator) against your available learning hours and financial obligations.",
          expectedOutput: "A personalized Transition Feasibility Matrix scoring 3 paths against time, cost, existing strengths, and market demand.",
          duration: "20 Mins",
        },
        flexiblePathway: [
          "Complete an honest time and financial commitment audit",
          "Try introductory 20-minute trials in 2 adjacent directions",
          "Build 1 domain-specific case study rather than generic tutorials",
          "Engage mentors in your target sector to sanity-check portfolio work",
        ],
      },
      {
        role: "Sales / Account Manager",
        targetGrowth: "Transitioning to B2B Solution Consulting / Pre-Sales",
        existingStrengths: [
          "Discovery questioning & active listening with executives",
          "Commercial proposal writing and pricing negotiations",
          "Executive relationship building and presentation skills",
        ],
        developmentAreas: [
          "High-level product architecture & API integration concepts",
          "Technical demo tailoring to solve specific customer workflows",
          "Proof-of-Concept (PoC) scoping and success criteria setting",
        ],
        sampleActivity: {
          task: "Review a simulated customer RFP (Request for Proposal). Map the client's 3 core business challenges to specific product features, highlighting potential technical constraints.",
          expectedOutput: "A structured 2-page Solution Scoping Memo detailing implementation assumptions and customer prerequisites.",
          duration: "30 Mins",
        },
        flexiblePathway: [
          "Audit technical vocabulary of your target industry products",
          "Shadow a solutions engineer during a live client discovery call",
          "Build an interactive demo script solving a concrete business problem",
          "Present the solution in a mock executive committee defense",
        ],
      },
      {
        role: "Mechanical / Civil Engineer",
        targetGrowth: "Transitioning to Industrial Automation / Technical Product Ops",
        existingStrengths: [
          "Physical systems intuition & mathematical modeling",
          "Safety-critical tolerances and blueprint reading",
          "Project scheduling & on-site contractor coordination",
        ],
        developmentAreas: [
          "PLC / SCADA basics and industrial IoT sensor communication",
          "Python / MATLAB for sensor telemetry data logging",
          "Predictive maintenance data models for mechanical assets",
        ],
        sampleActivity: {
          task: "Examine a pump vibration sensor dataset. Write a threshold rule that flags anomalous high-frequency vibrations before mechanical bearing seizure occurs.",
          expectedOutput: "A predictive warning rule with trigger limits and an emergency shutdown protocol document.",
          duration: "25 Mins",
        },
        flexiblePathway: [
          "Connect mechanical domain expertise to sensor telemetry data",
          "Learn basic Python script for CSV sensor data plotting",
          "Design an asset condition dashboard for plant managers",
          "Assemble an end-to-end industrial automation capstone portfolio",
        ],
      },
    ],
  },
};

export function ProfessionalDynamicGoalSelector() {
  const [activeGoal, setActiveGoal] = useState<ProfessionalGoal>("upskill");
  const [selectedExampleIndex, setSelectedExampleIndex] = useState<number>(0);
  const [userReflection, setUserReflection] = useState<string>("");
  const [reflectionSubmitted, setReflectionSubmitted] = useState<boolean>(false);

  // Mode change explicitly resets active example index and reflection sandbox
  const handleGoalChange = (goal: ProfessionalGoal) => {
    setActiveGoal(goal);
    setSelectedExampleIndex(0);
    setUserReflection("");
    setReflectionSubmitted(false);
  };

  const handleExampleChange = (index: number) => {
    setSelectedExampleIndex(index);
    setUserReflection("");
    setReflectionSubmitted(false);
  };

  const currentProfile = GOAL_PROFILES[activeGoal];
  const activeExample = currentProfile.examples[selectedExampleIndex] || currentProfile.examples[0];

  return (
    <section id="growth-directions" className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DBEAFE] shadow-xs">
            <Target className="w-3.5 h-3.5" />
            <span>Dynamic Growth Modes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Upskill. Reskill. Transition.{" "}
            <span className="text-[#2563EB]">
              Clarify your objective.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Professional growth is not one-size-fits-all. Some professionals want to excel in their current role; others need to adapt to emerging responsibilities or explore an adjacent path. Select your objective below.
          </p>
        </div>

        {/* 3-State Goal Switcher Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto mb-10">
          {(["upskill", "reskill", "transition"] as ProfessionalGoal[]).map((goalKey) => {
            const profile = GOAL_PROFILES[goalKey];
            const isSelected = activeGoal === goalKey;
            const Icon = profile.icon;

            return (
              <button
                key={goalKey}
                onClick={() => handleGoalChange(goalKey)}
                className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  isSelected
                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-[#2563EB]/20 scale-[1.02]"
                    : "bg-[#FAF9F6] text-[#474D66] border-[#E8E6F3] hover:border-[#BFDBFE] hover:text-[#171A2B]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isSelected ? "bg-white/20 text-white" : "bg-white text-[#2563EB] border border-[#E8E6F3]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-[#EFF6FF] text-[#2563EB]"
                    }`}
                  >
                    {profile.badge}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-extrabold leading-snug">
                    {profile.title}
                  </h3>
                  <p
                    className={`text-xs mt-1 line-clamp-1 ${
                      isSelected ? "text-blue-100" : "text-[#7B82A0]"
                    }`}
                  >
                    {profile.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mode Overview Card */}
        <div className="rounded-3xl bg-[#FAF9F6] border-2 border-[#DBEAFE] p-6 sm:p-8 lg:p-10 mb-8 shadow-sm">
          {/* Header Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E8E6F3] mb-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider block mb-1">
                Learner Objective Statement
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#171A2B] tracking-tight">
                &ldquo;{currentProfile.userStatement}&rdquo;
              </h3>
              <p className="mt-2 text-sm text-[#474D66] leading-relaxed">
                {currentProfile.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#DBEAFE] max-w-sm shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Foundational Principle:</span>
              </div>
              <p className="text-xs text-[#626987] leading-relaxed">
                {currentProfile.corePrinciple}
              </p>
            </div>
          </div>

          {/* Persona / Example Switcher */}
          <div className="mb-6">
            <span className="text-xs font-bold text-[#626987] uppercase tracking-wider block mb-3">
              Explore Illustrative Professional Scenarios:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentProfile.examples.map((ex, idx) => {
                const isExSelected = selectedExampleIndex === idx;
                return (
                  <button
                    key={ex.role}
                    onClick={() => handleExampleChange(idx)}
                    className={`p-3.5 rounded-xl text-left border transition-all text-xs font-bold ${
                      isExSelected
                        ? "bg-white border-[#2563EB] text-[#171A2B] shadow-xs ring-1 ring-[#2563EB]"
                        : "bg-white/70 border-[#E8E6F3] text-[#626987] hover:border-[#BFDBFE] hover:text-[#171A2B]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-[#2563EB] uppercase tracking-wider">
                        Scenario 0{idx + 1}
                      </span>
                      {isExSelected && <span className="w-2 h-2 rounded-full bg-[#2563EB]" />}
                    </div>
                    <span className="block text-sm font-extrabold text-[#171A2B]">
                      {ex.role}
                    </span>
                    <span className="block text-[11px] font-normal text-[#7B82A0] mt-0.5 line-clamp-1">
                      {ex.targetGrowth}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Scenario Deep Dive */}
          <div className="rounded-2xl bg-white border-2 border-[#E8E6F3] p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F0EEF8] mb-6">
              <div>
                <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                  Target Competency Focus
                </span>
                <h4 className="text-xl font-black text-[#171A2B]">
                  {activeExample.targetGrowth}
                </h4>
                <p className="text-xs text-[#7B82A0] mt-0.5">
                  Context: {activeExample.role}
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE] text-xs font-bold self-start sm:self-auto">
                ⏱ {activeExample.sampleActivity.duration} Practical Trial
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Strengths & Development Areas */}
              <div className="lg:col-span-7 space-y-6">
                {/* Existing Strengths */}
                <div>
                  <h5 className="text-xs font-bold text-[#10B981] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Existing Transferable Capabilities (Your Foundation):</span>
                  </h5>
                  <ul className="space-y-2">
                    {activeExample.existingStrengths.map((str, i) => (
                      <li
                        key={i}
                        className="text-xs sm:text-sm text-[#373D54] flex items-start gap-2 bg-[#F0FDF4] p-2.5 rounded-xl border border-[#DCFCE7]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0 mt-1.5" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Relevant Additional Skills */}
                <div>
                  <h5 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Target Additional Capabilities to Develop:</span>
                  </h5>
                  <ul className="space-y-2">
                    {activeExample.developmentAreas.map((dev, i) => (
                      <li
                        key={i}
                        className="text-xs sm:text-sm text-[#373D54] flex items-start gap-2 bg-[#EFF6FF] p-2.5 rounded-xl border border-[#DBEAFE]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0 mt-1.5" />
                        <span>{dev}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sample Practical Activity */}
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border-2 border-[#E8E6F3]">
                  <h5 className="text-xs font-bold text-[#171A2B] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Sample Practical Activity:</span>
                  </h5>
                  <p className="text-xs sm:text-sm text-[#474D66] leading-relaxed mb-3">
                    {activeExample.sampleActivity.task}
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-[#E8E6F3] text-xs text-[#065F46] bg-[#ECFDF5]/50 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[11px] uppercase tracking-wider text-[#047857]">
                        Expected Tangible Output:
                      </strong>
                      <span className="text-xs text-[#065F46]">
                        {activeExample.sampleActivity.expectedOutput}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Flexible Pathway & Reflection Sandbox */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                {/* Illustrative Pathway Sequence */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3]">
                  <h5 className="text-xs font-bold text-[#171A2B] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Illustrative Flexible Pathway:</span>
                  </h5>
                  <ol className="space-y-2.5">
                    {activeExample.flexiblePathway.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#474D66]">
                        <span className="w-5 h-5 rounded-md bg-white border border-[#DBEAFE] text-[#2563EB] font-bold flex items-center justify-center shrink-0 text-[10px]">
                          0{idx + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-3 pt-3 border-t border-[#E8E6F3] text-[10px] text-[#7B82A0] italic">
                    Self-paced progression. Pacing adapts non-punitively around working hours.
                  </p>
                </div>

                {/* Interactive Reflection Sandbox */}
                <div className="p-5 rounded-2xl bg-[#EFF6FF]/40 border-2 border-[#DBEAFE]">
                  <div className="flex items-center justify-between pb-2 border-b border-[#DBEAFE] mb-3">
                    <span className="text-xs font-bold text-[#1E40AF]">
                      Professional Reflection Sandbox
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#2563EB] border border-[#DBEAFE]">
                      Preview
                    </span>
                  </div>

                  {!reflectionSubmitted ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (userReflection.trim()) setReflectionSubmitted(true);
                      }}
                      className="space-y-2.5"
                    >
                      <label className="text-xs text-[#373D54] block">
                        How would building this capability impact your day-to-day work or next promotion?
                      </label>
                      <textarea
                        rows={2}
                        value={userReflection}
                        onChange={(e) => setUserReflection(e.target.value)}
                        placeholder="e.g., Automating weekly reports would save 6 hours for client strategy..."
                        className="w-full text-xs p-3 rounded-xl border border-[#D5D8E2] bg-white text-[#171A2B] focus:outline-none focus:ring-1 focus:ring-[#2563EB] placeholder:text-[#9AA0B8]"
                      />
                      <button
                        type="submit"
                        disabled={!userReflection.trim()}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold hover:bg-[#1D4ED8] transition-colors disabled:opacity-40"
                      >
                        <span>Simulate My Partner Reflection</span>
                        <Sparkles className="w-3 h-3" />
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-3 animate-fade-in">
                      <div className="p-3 rounded-xl bg-white border border-[#DBEAFE] text-xs text-[#1E40AF]">
                        <span className="font-bold block text-[10px] uppercase tracking-wider text-[#2563EB] mb-1">
                          My Partner Socratic Perspective:
                        </span>
                        <p className="leading-relaxed">
                          Reflecting on <em>&ldquo;{userReflection}&rdquo;</em>: You have identified an authentic business outcome rather than just a technical tool. In professional growth, tying every new skill directly to an operational deliverable is what creates lasting credibility.
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
                        <span>Reset reflection</span>
                      </button>
                    </div>
                  )}

                  <div className="mt-3 pt-2 border-t border-[#DBEAFE] flex items-center gap-1 text-[10px] text-[#7B82A0]">
                    <AlertCircle className="w-3 h-3 text-[#2563EB] shrink-0" />
                    <span>Client-side demonstration · Zero data persistence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ethical Safeguard Notice */}
        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] text-center max-w-3xl mx-auto flex items-center justify-center gap-2 text-xs text-[#626987]">
          <AlertCircle className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
          <span>
            <strong>Professional Transparency:</strong> Next Move Grow does not calculate simulated &ldquo;career fit&rdquo; percentages or promise automatic job offers. We structure self-directed capability building.
          </span>
        </div>
      </div>
    </section>
  );
}
