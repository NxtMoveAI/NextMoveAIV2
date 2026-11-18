"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useIsMarketingMode } from "@/lib/deployment-mode";
import {
  Compass,
  Sparkles,
  Code,
  FileSpreadsheet,
  Workflow,
  Cpu,
  Palette,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Lightbulb,
  Send,
  RotateCcw,
  ChevronRight,
  Eye,
  ArrowRight,
} from "lucide-react";

// Code-split heavy 2,400-line StudentExplorer component for optional extended matrix view
const StudentExplorer = dynamic(
  () => import("@/components/marketing/StudentExplorer").then((mod) => mod.StudentExplorer),
  {
    loading: () => (
      <div className="p-8 text-center bg-white rounded-3xl border border-[#E8E6F3] text-sm text-[#626987]">
        Loading Extended Matrix...
      </div>
    ),
    ssr: false,
  }
);

export type LearningSituation = "discover" | "begin" | "progress";
export type AcademicContext = "degree" | "engineering" | "diploma" | "final-year-grad";

interface DiscoverDomain {
  id: string;
  name: string;
  tag: string;
  contexts: AcademicContext[];
  icon: React.ComponentType<{ className?: string }>;
  workDescription: string;
  introductoryTask: string;
  expectedOutput: string;
  reflectionPrompt: string;
  sampleThought: string;
  simulatedFeedback: string;
  alternativeOption: string;
}

const DISCOVER_DOMAINS: DiscoverDomain[] = [
  {
    id: "web-development",
    name: "Web Systems & Frontends",
    tag: "Technology & Software",
    contexts: ["degree", "engineering", "diploma", "final-year-grad"],
    icon: Code,
    workDescription:
      "Web developers connect visual interfaces to servers, APIs, and databases. The work involves writing structured layouts, managing data states, and making apps fast on phones and laptops.",
    introductoryTask:
      "Inspect a simple interactive counter: trace how clicking a button sends an event, updates an in-memory number, and re-renders the text in the browser DOM.",
    expectedOutput:
      "A working interactive HTML/JS snippet modifying DOM state on user clicks without reloading the page.",
    reflectionPrompt:
      "What surprised you more: how quickly you can make a button do something, or how much attention goes into keeping state clean?",
    sampleThought:
      "I liked seeing immediate visual feedback on the screen when I changed the event handler logic...",
    simulatedFeedback:
      "Great observation! Front-end engineering is all about creating predictable, responsive feedback loops for real users.",
    alternativeOption: "Prefer data patterns over visual interfaces? Explore Data Analytics next.",
  },
  {
    id: "data-analytics",
    name: "Data Analytics & Insights",
    tag: "Data & Decision Science",
    contexts: ["degree", "engineering", "diploma", "final-year-grad"],
    icon: TrendingUp,
    workDescription:
      "Data analysts extract messy records, clean anomalies, compute key metrics, and communicate what trends mean so teams can make evidence-based operational decisions.",
    introductoryTask:
      "Take 50 rows of canteen sales data: filter out weekend zero-sales rows, calculate the average weekday lunch order, and identify the top selling item.",
    expectedOutput:
      "A filtered summary table and 3-sentence executive finding on lunchtime peak volume.",
    reflectionPrompt:
      "When inspecting the data, was it easier to spot numerical outliers or understand why they happened?",
    sampleThought:
      "Spotting the huge spike on Friday was easy, but realizing it was exam day took contextual thinking...",
    simulatedFeedback:
      "Insightful! Real data analysis requires domain context and curiosity, not just running mathematical formulas.",
    alternativeOption: "Prefer operational systems? Explore Operations & Supply Chain next.",
  },
  {
    id: "ui-ux-design",
    name: "UI / UX & Product Design",
    tag: "Human Ergonomics & Design",
    contexts: ["degree", "engineering", "diploma", "final-year-grad"],
    icon: Palette,
    workDescription:
      "Product designers study human habits, layout readability, and friction points. They build wireframes and interactive prototypes that make software intuitive to navigate.",
    introductoryTask:
      "Audit a mobile bus ticketing interface: identify 2 points where a first-time commuter might get confused, and sketch a simplified 3-tap booking flow.",
    expectedOutput:
      "An annotated paper wireframe comparing the confusing original layout with your simplified flow.",
    reflectionPrompt:
      "What did you prioritize removing to make the screen feel less overwhelming?",
    sampleThought:
      "I moved the payment method choice to the final screen so the passenger only focuses on selecting their destination first...",
    simulatedFeedback:
      "Superb cognitive staging! Reducing cognitive load per screen is the golden rule of mobile product design.",
    alternativeOption: "Prefer code architecture? Explore Web Systems next.",
  },
  {
    id: "business-finance",
    name: "Financial Modeling & Commerce",
    tag: "Commerce & Unit Economics",
    contexts: ["degree", "diploma", "final-year-grad"],
    icon: FileSpreadsheet,
    workDescription:
      "Financial analysts map cost structures, cash flow projections, and profit margins to determine whether a business idea or department budget is sustainable.",
    introductoryTask:
      "Model a micro-bakery stall: calculate fixed rental costs (₹2,000) against per-unit ingredient costs (₹30) to find the exact price and sales volume needed to break even.",
    expectedOutput:
      "A structured break-even calculation table showing required unit sales at ₹60, ₹75, and ₹90 pricing tiers.",
    reflectionPrompt:
      "If wholesale flour costs rise by 15%, what strategic trade-offs occur between increasing price vs. lowering portion size?",
    sampleThought:
      "Raising price might reduce footfall among students, so negotiating bulk purchase discounts is smarter...",
    simulatedFeedback:
      "Sharp commercial sensibility! Understanding price elasticity and supplier leverage is key to sustainable business management.",
    alternativeOption: "Want to explore technology applications? Explore Data Analytics next.",
  },
  {
    id: "operations-logistics",
    name: "Operations & Process Engineering",
    tag: "Applied Engineering & Ops",
    contexts: ["engineering", "diploma", "final-year-grad"],
    icon: Workflow,
    workDescription:
      "Operations specialists eliminate waste, design warehouse floor plans, and optimize workflow timing across manufacturing plants, hospitals, and delivery fleets.",
    introductoryTask:
      "Map a local parcel delivery hub: analyze the 4-step intake, sorting, labeling, and vehicle dispatch pipeline to pinpoint where parcels queue up longest.",
    expectedOutput:
      "A visual process-flow diagram highlighting the critical bottleneck station and proposing a 2-sorter reallocation plan.",
    reflectionPrompt:
      "Did adding more staff solve the bottleneck, or did rearranging the physical sorting bins create more throughput?",
    sampleThought:
      "Moving the pre-labeled bins closer to the loading bay saved 40 seconds per batch without extra staff...",
    simulatedFeedback:
      "Classic industrial engineering efficiency! Spatial layout often unlocks more capacity than simply throwing labor at a problem.",
    alternativeOption: "Curious about automated hardware? Explore Embedded Systems next.",
  },
  {
    id: "embedded-systems",
    name: "Embedded Systems & Hardware",
    tag: "Engineering & IoT",
    contexts: ["engineering", "diploma"],
    icon: Cpu,
    workDescription:
      "Embedded engineers write low-level firmware that runs inside microcontrollers, automotive sensors, smart electric meters, and factory robotics.",
    introductoryTask:
      "Trace a temperature-controlled greenhouse controller: map how a thermistor sensor reading triggers a relay switch to turn on an exhaust fan.",
    expectedOutput:
      "A state transition diagram showing Safe Temperature, Warning Threshold, and Fan Activated conditions with hysteresis margins.",
    reflectionPrompt:
      "Why is adding a small temperature buffer (hysteresis) essential to prevent the relay switch from chattering on and off every 2 seconds?",
    sampleThought:
      "Without a buffer, a 0.1 degree fluctuation would flick the switch constantly and burn out the motor...",
    simulatedFeedback:
      "Exact hardware control principle! Managing sensor jitter through software hysteresis is fundamental in all automation.",
    alternativeOption: "Curious about web-connected dashboards? Explore Web Systems next.",
  },
];

export function CollegeDynamicLearningFramework() {
  const isMarketing = useIsMarketingMode();

  // Situation State: Discover / Begin / Progress
  const [activeSituation, setActiveSituation] = useState<LearningSituation>("discover");

  // Academic Pathway Context State
  const [activeAcademicContext, setActiveAcademicContext] = useState<AcademicContext>("degree");

  // Discover Mode State
  const [selectedDomainId, setSelectedDomainId] = useState<string>("web-development");
  const [userReflection, setUserReflection] = useState<string>("");
  const [reflectionSubmitted, setReflectionSubmitted] = useState<boolean>(false);

  // Begin Mode State (Lightweight Diagnostic)
  const [beginInterest, setBeginInterest] = useState<string>("programming-logic");
  const [beginExperience, setBeginExperience] = useState<string>("complete-beginner");
  const [beginDevice, setBeginDevice] = useState<string>("laptop");

  // Progress Mode State (Code & Project Review Simulation)
  const [simulatedReviewShown, setSimulatedReviewShown] = useState<boolean>(false);

  // Full Matrix Toggle
  const [showFullMatrix, setShowFullMatrix] = useState<boolean>(false);

  // Reset local state when switching situations or academic contexts
  const handleSituationChange = (situation: LearningSituation) => {
    setActiveSituation(situation);
    setUserReflection("");
    setReflectionSubmitted(false);
    setSimulatedReviewShown(false);
  };

  const handleAcademicContextChange = (context: AcademicContext) => {
    setActiveAcademicContext(context);
    setUserReflection("");
    setReflectionSubmitted(false);
    setSimulatedReviewShown(false);

    // Pick first domain valid for new context
    const validDomains = DISCOVER_DOMAINS.filter((d) => d.contexts.includes(context));
    if (validDomains.length > 0 && !validDomains.some((d) => d.id === selectedDomainId)) {
      setSelectedDomainId(validDomains[0].id);
    }
  };

  const handleDomainChange = (domainId: string) => {
    setSelectedDomainId(domainId);
    setUserReflection("");
    setReflectionSubmitted(false);
  };

  const handleReflectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userReflection.trim().length > 0) {
      setReflectionSubmitted(true);
    }
  };

  // Filtered domains for the selected academic context
  const filteredDomains = DISCOVER_DOMAINS.filter((d) =>
    d.contexts.includes(activeAcademicContext)
  );

  const activeDomain =
    filteredDomains.find((d) => d.id === selectedDomainId) || filteredDomains[0] || DISCOVER_DOMAINS[0];

  return (
    <section id="college-framework" className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE] shadow-xs">
            <Workflow className="w-3.5 h-3.5" />
            <span>Interactive Learning Framework</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Discover. Begin. Progress.{" "}
            <span className="text-[#6757F5]">
              Meet yourself where you are.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Every college student arrives from a different starting point. Select your current learning situation and academic background below to preview a tailored, practical experience.
          </p>
        </div>

        {/* 1. Academic Pathway Context Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-[#626987] uppercase tracking-wider">
              Academic Background:
            </span>
            <span className="text-xs text-[#7B82A0]">
              Adapts examples to your curriculum reality
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Academic Context Selector"
            className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-1.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3]"
          >
            {(
              [
                { id: "degree", label: "Degree", sub: "BCA · B.Com · BBA · B.Sc" },
                { id: "engineering", label: "Engineering", sub: "B.Tech · B.E. Disciplines" },
                { id: "diploma", label: "Diploma", sub: "Polytechnic · Applied Tech" },
                { id: "final-year-grad", label: "Final-Year & Grad", sub: "Capstone · Transitions" },
              ] as const
            ).map((ctx) => {
              const isSelected = activeAcademicContext === ctx.id;
              return (
                <button
                  key={ctx.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleAcademicContextChange(ctx.id)}
                  className={`p-3 rounded-xl text-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#6757F5] ${
                    isSelected
                      ? "bg-white text-[#171A2B] font-extrabold shadow-sm border border-[#DDD8FE] scale-[1.01]"
                      : "text-[#626987] hover:text-[#171A2B] hover:bg-white/60"
                  }`}
                >
                  <span className="text-xs sm:text-sm block">{ctx.label}</span>
                  <span className="text-[10px] text-[#7B82A0] block mt-0.5">
                    {ctx.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Three-Option Learning-State Selector (Discover / Begin / Progress) */}
        <div
          role="tablist"
          aria-label="Learning Situation Modes"
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 mb-12 p-2 rounded-2xl bg-[#FAF9F6] border-2 border-[#E8E6F3] shadow-xs"
        >
          {/* OPTION A: DISCOVER */}
          <button
            role="tab"
            aria-selected={activeSituation === "discover"}
            onClick={() => handleSituationChange("discover")}
            className={`p-5 rounded-xl text-left transition-all duration-200 flex flex-col justify-between border-2 focus:outline-none focus:ring-2 focus:ring-[#6757F5] ${
              activeSituation === "discover"
                ? "bg-white border-[#6757F5] shadow-md shadow-[#6757F5]/10 scale-[1.01]"
                : "bg-white/60 border-transparent hover:bg-white hover:border-[#E8E6F3]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-[10px] font-extrabold uppercase tracking-wider">
                  Phase 01
                </span>
                <Compass className="w-4 h-4 text-[#6757F5]" />
              </div>
              <h3 className="text-base font-black text-[#171A2B] tracking-tight">
                Discover
              </h3>
              <p className="text-xs text-[#6757F5] font-semibold mt-0.5 italic">
                &ldquo;I don&apos;t know which direction to explore.&rdquo;
              </p>
              <p className="mt-2 text-xs text-[#626987] leading-relaxed">
                Compare diverse disciplines through introductory, low-stakes practical trials before committing months or fees.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#F0EEF8] flex items-center justify-between text-[11px] font-bold text-[#6757F5]">
              <span>Compare Possibilities</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>

          {/* OPTION B: BEGIN */}
          <button
            role="tab"
            aria-selected={activeSituation === "begin"}
            onClick={() => handleSituationChange("begin")}
            className={`p-5 rounded-xl text-left transition-all duration-200 flex flex-col justify-between border-2 focus:outline-none focus:ring-2 focus:ring-[#6757F5] ${
              activeSituation === "begin"
                ? "bg-white border-[#6757F5] shadow-md shadow-[#6757F5]/10 scale-[1.01]"
                : "bg-white/60 border-transparent hover:bg-white hover:border-[#E8E6F3]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-[10px] font-extrabold uppercase tracking-wider">
                  Phase 02
                </span>
                <Code className="w-4 h-4 text-[#6757F5]" />
              </div>
              <h3 className="text-base font-black text-[#171A2B] tracking-tight">
                Begin
              </h3>
              <p className="text-xs text-[#6757F5] font-semibold mt-0.5 italic">
                &ldquo;I know my interest, but don&apos;t know where to start.&rdquo;
              </p>
              <p className="mt-2 text-xs text-[#626987] leading-relaxed">
                Identify your ideal first activity, essential prerequisites, and build an actionable starting roadmap.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#F0EEF8] flex items-center justify-between text-[11px] font-bold text-[#6757F5]">
              <span>Find Starting Point</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>

          {/* OPTION C: PROGRESS */}
          <button
            role="tab"
            aria-selected={activeSituation === "progress"}
            onClick={() => handleSituationChange("progress")}
            className={`p-5 rounded-xl text-left transition-all duration-200 flex flex-col justify-between border-2 focus:outline-none focus:ring-2 focus:ring-[#6757F5] ${
              activeSituation === "progress"
                ? "bg-white border-[#6757F5] shadow-md shadow-[#6757F5]/10 scale-[1.01]"
                : "bg-white/60 border-transparent hover:bg-white hover:border-[#E8E6F3]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-[10px] font-extrabold uppercase tracking-wider">
                  Phase 03
                </span>
                <Workflow className="w-4 h-4 text-[#6757F5]" />
              </div>
              <h3 className="text-base font-black text-[#171A2B] tracking-tight">
                Progress
              </h3>
              <p className="text-xs text-[#6757F5] font-semibold mt-0.5 italic">
                &ldquo;I&apos;ve started and want to apply what I know.&rdquo;
              </p>
              <p className="mt-2 text-xs text-[#626987] leading-relaxed">
                Tackle rigorous project blueprints, review solution criteria, and transform knowledge into demonstrated capability.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#F0EEF8] flex items-center justify-between text-[11px] font-bold text-[#6757F5]">
              <span>Review Real Practice</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>
        </div>

        {/* 3. Dynamic Mode View Rendering */}

        {/* ============================================================ */}
        {/* MODE A: DISCOVER VIEW */}
        {/* ============================================================ */}
        {activeSituation === "discover" && (
          <div className="space-y-8 animate-fade-in">
            {/* Domain Pills for Active Context */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#626987] uppercase tracking-wider">
                  Select a Field to Preview:
                </span>
                <span className="text-xs text-[#7B82A0]">
                  Practical introductory trials for {activeAcademicContext.replace("-", " ")}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {filteredDomains.map((dom) => {
                  const isDomSelected = dom.id === activeDomain.id;
                  const IconComp = dom.icon;
                  return (
                    <button
                      key={dom.id}
                      onClick={() => handleDomainChange(dom.id)}
                      className={`p-3 rounded-2xl text-left transition-all duration-150 border flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#6757F5] ${
                        isDomSelected
                          ? "bg-[#EDEAFF] border-[#6757F5] text-[#171A2B] shadow-sm shadow-[#6757F5]/10 scale-[1.02]"
                          : "bg-[#FAF9F6] border-[#E8E6F3] text-[#626987] hover:border-[#DDD8FE] hover:text-[#171A2B]"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 ${
                          isDomSelected
                            ? "bg-[#6757F5] text-white"
                            : "bg-white text-[#626987] border border-[#E8E6F3]"
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold leading-tight line-clamp-2">
                          {dom.name}
                        </h4>
                        <span className="text-[10px] text-[#7B82A0] block mt-1 line-clamp-1">
                          {dom.tag}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Trial Card */}
            <div className="rounded-3xl bg-white border-2 border-[#E8E6F3] shadow-md shadow-[#6757F5]/5 overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-[#F0EEF8] bg-gradient-to-r from-white via-[#FAF9F6] to-[#EDEAFF]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#EDEAFF] text-[#6757F5] border border-[#DDD8FE] flex items-center justify-center shrink-0">
                    <activeDomain.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#6757F5] uppercase tracking-wider">
                      {activeDomain.tag} · Discover Mode
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#171A2B] tracking-tight">
                      {activeDomain.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E8E6F3] text-xs font-semibold text-[#626987]">
                    ⏱ 15–20 Mins Trial
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#EDEAFF] border border-[#DDD8FE] text-xs font-bold text-[#6757F5]">
                    Low-Stakes Preview
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Description, Task & Output */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-[#626987] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Eye className="w-3.5 h-3.5 text-[#6757F5]" />
                      <span>What the Work Actually Involves:</span>
                    </h4>
                    <p className="text-sm sm:text-base text-[#171A2B] leading-relaxed bg-[#FAF9F6] p-4 rounded-2xl border border-[#E8E6F3]">
                      {activeDomain.workDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#626987] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-[#6757F5]" />
                      <span>The Introductory 15-Minute Task:</span>
                    </h4>
                    <div className="p-4 rounded-2xl bg-white border-2 border-[#EDEAFF] shadow-xs">
                      <p className="text-sm text-[#373D54] leading-relaxed">
                        {activeDomain.introductoryTask}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#626987] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Expected Tangible Output:</span>
                    </h4>
                    <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-[#10B981] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-[#065F46]">
                          Clear Deliverable
                        </h5>
                        <p className="text-xs sm:text-sm text-[#047857] mt-0.5 leading-relaxed">
                          {activeDomain.expectedOutput}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-[#626987] flex items-center gap-2">
                    <span className="font-bold text-[#171A2B]">Alternative Direction:</span>
                    <span>{activeDomain.alternativeOption}</span>
                  </div>
                </div>

                {/* Right Column: Guided Reflection Sandbox */}
                <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-[#FAF9F6] border-2 border-[#E8E6F3]">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#E8E6F3] mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center">
                          <Compass className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-[#171A2B]">
                          Trial Reflection Sandbox
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white text-[#6757F5] border border-[#DDD8FE]">
                        Simulated Preview
                      </span>
                    </div>

                    <div className="mb-4">
                      <span className="text-[11px] font-semibold text-[#626987] block mb-1">
                        Reflection Prompt:
                      </span>
                      <p className="text-sm font-bold text-[#171A2B] leading-snug">
                        &ldquo;{activeDomain.reflectionPrompt}&rdquo;
                      </p>
                    </div>

                    {!reflectionSubmitted ? (
                      <form onSubmit={handleReflectionSubmit} className="space-y-3">
                        <textarea
                          rows={3}
                          value={userReflection}
                          onChange={(e) => setUserReflection(e.target.value)}
                          placeholder={activeDomain.sampleThought}
                          className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5D8E2] bg-white text-[#171A2B] focus:outline-none focus:ring-2 focus:ring-[#6757F5] resize-none"
                        />
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setUserReflection(activeDomain.sampleThought)}
                            className="text-[11px] font-semibold text-[#6757F5] hover:underline"
                          >
                            Insert sample thought
                          </button>
                          <button
                            type="submit"
                            disabled={userReflection.trim().length === 0}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6757F5] text-white text-xs font-bold shadow-sm shadow-[#6757F5]/20 hover:bg-[#5342E8] disabled:opacity-50 transition-all"
                          >
                            <span>Test Reflection</span>
                            <Send className="w-3 h-3" />
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-3 animate-fade-in">
                        <div className="p-3.5 rounded-xl bg-white border border-[#DDD8FE] text-xs text-[#171A2B]">
                          <span className="text-[10px] font-bold text-[#6757F5] uppercase block mb-1">
                            Your Trial Reflection:
                          </span>
                          <p className="italic">&ldquo;{userReflection}&rdquo;</p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#EDEAFF] border border-[#DDD8FE] text-xs text-[#4338CA]">
                          <div className="flex items-center gap-1.5 font-bold mb-1">
                            <Sparkles className="w-3.5 h-3.5 text-[#6757F5]" />
                            <span>My Partner&apos;s Supportive Guidance:</span>
                          </div>
                          <p className="leading-relaxed">
                            {activeDomain.simulatedFeedback}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setUserReflection("");
                            setReflectionSubmitted(false);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#626987] hover:text-[#171A2B] transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset reflection</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E8E6F3] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-left">
                      <span className="text-xs font-bold text-[#171A2B] block">
                        Start your college exploration with Discover
                      </span>
                      <span className="text-[11px] text-[#626987]">
                        Explore interests and emerging possibilities without pressure
                      </span>
                    </div>
                    <Link
                      href={isMarketing ? "#college-projects" : `/get-started?stage=${activeAcademicContext === "diploma" ? "diploma" : activeAcademicContext === "final-year-grad" ? "final-year-grad" : "degree-engineering"}&context=${activeAcademicContext}&situation=discover&audience=college`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] text-white text-xs sm:text-sm font-bold shadow-sm shadow-[#6757F5]/20 hover:bg-[#5342E8] transition-all shrink-0"
                    >
                      <span>{isMarketing ? "Explore Practical Projects" : "Start Discover Path"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E8E6F3] flex items-start gap-2 text-[11px] text-[#626987]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>
                      <strong>Educational Safeguard:</strong> This trial is an exploratory experience. We do not calculate career-fit percentages or lock you into a single path.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* MODE B: BEGIN VIEW */}
        {/* ============================================================ */}
        {activeSituation === "begin" && (
          <div className="rounded-3xl bg-white border-2 border-[#E8E6F3] p-6 sm:p-8 lg:p-10 shadow-sm animate-fade-in">
            <div className="max-w-3xl mb-8">
              <span className="px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-2.5 inline-block border border-[#DDD8FE]">
                Phase 02 · Begin Diagnostic
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
                Find your grounded starting point.
              </h3>
              <p className="mt-2 text-sm text-[#474D66] leading-relaxed">
                You know the broad area you want to pursue, but courses often dive straight into syntax or jargon. Answer 3 quick questions to preview an illustrative, flexible starter roadmap (typically explored over 14 days or at your own pace).
              </p>
            </div>

            {/* 3 Lightweight Diagnostic Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 pb-8 border-b border-[#F0EEF8]">
              {/* Question 1: What do you want to build? */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#171A2B] uppercase tracking-wider block">
                  1. What would you like to build?
                </label>
                <select
                  value={beginInterest}
                  onChange={(e) => setBeginInterest(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5D8E2] bg-[#FAF9F6] text-[#171A2B] focus:outline-none focus:ring-2 focus:ring-[#6757F5]"
                >
                  <option value="programming-logic">Beginner Programming & Logic</option>
                  <option value="financial-modeling">Financial Modeling & Spreadsheets</option>
                  <option value="data-analytics">Business Data & SQL Dashboards</option>
                  <option value="ui-ux-wireframing">Product UI & Interface Wireframing</option>
                  <option value="operations-workflow">Operations & Process Optimization</option>
                </select>
                <span className="text-[11px] text-[#7B82A0] block">
                  We don&apos;t force everyone into coding.
                </span>
              </div>

              {/* Question 2: Prior exposure */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#171A2B] uppercase tracking-wider block">
                  2. Prior experience level?
                </label>
                <select
                  value={beginExperience}
                  onChange={(e) => setBeginExperience(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5D8E2] bg-[#FAF9F6] text-[#171A2B] focus:outline-none focus:ring-2 focus:ring-[#6757F5]"
                >
                  <option value="complete-beginner">Complete Beginner (Zero prior exposure)</option>
                  <option value="some-tutorials">Watched tutorials / know syntax basics</option>
                  <option value="built-toy-scripts">Built small scripts, need structured application</option>
                </select>
                <span className="text-[11px] text-[#7B82A0] block">
                  Calibrates starting difficulty.
                </span>
              </div>

              {/* Question 3: Device Access */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#171A2B] uppercase tracking-wider block">
                  3. Hardware / Device Access?
                </label>
                <select
                  value={beginDevice}
                  onChange={(e) => setBeginDevice(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5D8E2] bg-[#FAF9F6] text-[#171A2B] focus:outline-none focus:ring-2 focus:ring-[#6757F5]"
                >
                  <option value="laptop">Standard Laptop / Computer</option>
                  <option value="budget-pc">Budget / Older PC (Low RAM)</option>
                  <option value="mobile-tablet">Mobile phone or Tablet (Web-only tools)</option>
                </select>
                <span className="text-[11px] text-[#7B82A0] block">
                  Ensures tools run comfortably on your hardware.
                </span>
              </div>
            </div>

            {/* Generated Actionable Starting Roadmap */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF9F6] border-2 border-[#DDD8FE] shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E6F3] mb-6">
                <div>
                  <span className="text-[10px] font-bold text-[#6757F5] uppercase tracking-wider">
                    Grounded Starter Blueprint
                  </span>
                  <h4 className="text-xl font-black text-[#171A2B]">
                    {beginInterest === "programming-logic" && "Foundational Computational Logic & Small Automation"}
                    {beginInterest === "financial-modeling" && "Core Spreadsheet Architecture & Commercial Unit Margins"}
                    {beginInterest === "data-analytics" && "Relational Data Questions & Practical Excel/SQL Cleansing"}
                    {beginInterest === "ui-ux-wireframing" && "User Flow Heuristics & Low-Fidelity Layout Hierarchy"}
                    {beginInterest === "operations-workflow" && "Bottleneck Mapping & Standardized Operational Runbooks"}
                  </h4>
                </div>
                <span className="px-3 py-1 rounded-full bg-white border border-[#DDD8FE] text-xs font-bold text-[#6757F5] self-start sm:self-auto">
                  Illustrative Flexible Plan (~14 Days)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Step 1 */}
                <div className="p-4 rounded-2xl bg-white border border-[#E8E6F3]">
                  <span className="text-xs font-black text-[#6757F5] block mb-1">
                    Days 1–3: Core Prerequisite
                  </span>
                  <h5 className="text-sm font-bold text-[#171A2B] mb-1">
                    Understand the Core Mechanism
                  </h5>
                  <p className="text-xs text-[#626987] leading-relaxed">
                    Learn how memory, variables, and conditions interact before installing bulky IDEs or frameworks.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-2xl bg-white border border-[#E8E6F3]">
                  <span className="text-xs font-black text-[#6757F5] block mb-1">
                    Days 4–8: First 20-Min Exercise
                  </span>
                  <h5 className="text-sm font-bold text-[#171A2B] mb-1">
                    Build a Single Concrete Function
                  </h5>
                  <p className="text-xs text-[#626987] leading-relaxed">
                    Write one function that takes raw input, cleans whitespace, and outputs a formatted result.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-2xl bg-white border border-[#E8E6F3]">
                  <span className="text-xs font-black text-[#6757F5] block mb-1">
                    Days 9–14: Tangible Milestone
                  </span>
                  <h5 className="text-sm font-bold text-[#171A2B] mb-1">
                    Create a Working Micro-Tool
                  </h5>
                  <p className="text-xs text-[#626987] leading-relaxed">
                    Assemble a simple script or spreadsheet you can run on your own machine and explain to a classmate.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E6F3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-[#626987]">
                  <strong>Flexible Pacing Notice:</strong> This roadmap is an illustrative plan, not a mandatory 14-day deadline. Learners adapt pacing around semester exams, family commitments, and study schedules.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleSituationChange("progress")}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#DDD8FE] text-[#6757F5] text-xs font-bold hover:bg-[#EDEAFF] transition-all shrink-0"
                  >
                    <span>Preview Progress Phase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href={isMarketing ? "#college-projects" : `/get-started?stage=${activeAcademicContext === "diploma" ? "diploma" : activeAcademicContext === "final-year-grad" ? "final-year-grad" : "degree-engineering"}&context=${activeAcademicContext}&situation=begin&audience=college`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5342E8] shadow-sm shadow-[#6757F5]/20 transition-all shrink-0"
                  >
                    <span>{isMarketing ? "View Project Showcase" : "Continue with Begin Plan"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* MODE C: PROGRESS VIEW */}
        {/* ============================================================ */}
        {activeSituation === "progress" && (
          <div className="rounded-3xl bg-white border-2 border-[#E8E6F3] p-6 sm:p-8 lg:p-10 shadow-sm animate-fade-in space-y-8">
            <div className="max-w-3xl">
              <span className="px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-2.5 inline-block border border-[#DDD8FE]">
                Phase 03 · Progress &amp; Rigorous Practice
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
                Turn knowledge into demonstrated capability.
              </h3>
              <p className="mt-2 text-sm text-[#474D66] leading-relaxed">
                Saying you &ldquo;know Python&rdquo; or &ldquo;studied accounting&rdquo; is not the same as solving edge cases. Progress happens when your work is tested, critiqued, and iteratively improved.
              </p>
            </div>

            {/* 4-Tier Competency Ladder */}
            <div>
              <span className="text-xs font-bold text-[#626987] uppercase tracking-wider block mb-3">
                The 4-Tier Competency Ladder:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3]">
                  <span className="text-[10px] font-black text-[#7B82A0] uppercase">Tier 01</span>
                  <h4 className="text-sm font-bold text-[#171A2B] mt-0.5">Self-Reported Knowledge</h4>
                  <p className="text-xs text-[#626987] mt-1 leading-relaxed">
                    &ldquo;I watched a tutorial or read documentation.&rdquo; Valuable start, but untested in practice.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3]">
                  <span className="text-[10px] font-black text-[#7B82A0] uppercase">Tier 02</span>
                  <h4 className="text-sm font-bold text-[#171A2B] mt-0.5">Attempted Practice</h4>
                  <p className="text-xs text-[#626987] mt-1 leading-relaxed">
                    &ldquo;I cloned an exercise or followed a guided script.&rdquo; Tests syntax, but lacks original problem-solving.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#DDD8FE] bg-[#EDEAFF]/30">
                  <span className="text-[10px] font-black text-[#6757F5] uppercase">Tier 03</span>
                  <h4 className="text-sm font-bold text-[#171A2B] mt-0.5">Reviewed Work</h4>
                  <p className="text-xs text-[#4338CA] mt-1 leading-relaxed">
                    &ldquo;My solution was tested against edge cases and reviewed with clear criteria.&rdquo; Reveals hidden bugs.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0]">
                  <span className="text-[10px] font-black text-[#047857] uppercase">Tier 04</span>
                  <h4 className="text-sm font-bold text-[#065F46] mt-0.5">Demonstrated Capability</h4>
                  <p className="text-xs text-[#047857] mt-1 leading-relaxed">
                    &ldquo;I built a functioning project and can defend my architectural trade-offs.&rdquo; Real portfolio proof.
                  </p>
                </div>
              </div>
            </div>

            {/* Sample Progress Challenge Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF9F6] border-2 border-[#DDD8FE] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E6F3] mb-6">
                <div>
                  <span className="text-[10px] font-bold text-[#6757F5] uppercase tracking-wider">
                    Sample Rigorous Challenge
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-[#171A2B]">
                    API Response In-Memory Caching &amp; TTL Eviction
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold">
                    Intermediate Level
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#E8E6F3] text-xs text-[#626987]">
                    Time: ~45 mins
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <h5 className="text-xs font-bold text-[#626987] uppercase tracking-wider mb-1">
                      Problem Statement:
                    </h5>
                    <p className="text-xs sm:text-sm text-[#171A2B] leading-relaxed bg-white p-3.5 rounded-xl border border-[#E8E6F3]">
                      Your application queries an external currency rate endpoint 1,000 times/minute. Build an in-memory cache function in Python or JavaScript that caches results for 60 seconds (TTL), evicts stale keys, and handles connection timeouts gracefully.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-[#626987] uppercase tracking-wider mb-1">
                      Required Concepts:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E6F3] text-[11px] font-semibold text-[#474D66]">
                        Hash Maps &amp; Dictionaries
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E6F3] text-[11px] font-semibold text-[#474D66]">
                        Timestamp Expiry (TTL)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E6F3] text-[11px] font-semibold text-[#474D66]">
                        Error Fallback Handling
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#DDD8FE]">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-[#F0EEF8] mb-3">
                      <span className="text-xs font-bold text-[#171A2B]">
                        Solution Review Rubric
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EDEAFF] text-[#6757F5]">
                        Simulated Review
                      </span>
                    </div>

                    {!simulatedReviewShown ? (
                      <div className="text-center py-4">
                        <p className="text-xs text-[#626987] mb-4">
                          See how Next Move AI reviews practice projects against rigorous edge-case criteria.
                        </p>
                        <button
                          type="button"
                          onClick={() => setSimulatedReviewShown(true)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5342E8] shadow-sm transition-all"
                        >
                          <Workflow className="w-3.5 h-3.5" />
                          <span>Simulate Review Feedback</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2.5 animate-fade-in text-xs">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-[#ECFDF5] text-[#047857]">
                          <span>1. Cache hit returns sub-millisecond response</span>
                          <span className="font-bold">✓ Pass</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-[#ECFDF5] text-[#047857]">
                          <span>2. Stale keys evicted after 60 seconds</span>
                          <span className="font-bold">✓ Pass</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E]">
                          <strong className="block mb-0.5">Critical Review Finding:</strong>
                          <span>Memory leak risk: Expired keys remain in memory until explicitly queried. Suggested next step: Add a periodic lazy cleanup sweep.</span>
                        </div>
                        <button
                          onClick={() => setSimulatedReviewShown(false)}
                          className="text-[10px] text-[#6757F5] font-semibold hover:underline block pt-1"
                        >
                          Reset review simulation
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F0EEF8] text-[10px] text-[#7B82A0]">
                    *Demonstration review. No automated certification or guaranteed placement implied.
                  </div>
                </div>
              </div>

              {/* Progress Entry CTA */}
              <div className="mt-6 pt-4 border-t border-[#E8E6F3] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <span className="text-xs font-bold text-[#171A2B] block">
                    Advance to rigorous practice and portfolio evidence
                  </span>
                  <span className="text-[11px] text-[#626987]">
                    Build demonstrable work reviewed against real edge cases
                  </span>
                </div>
                <Link
                  href={isMarketing ? "#college-partnerships" : `/get-started?stage=${activeAcademicContext === "diploma" ? "diploma" : activeAcademicContext === "final-year-grad" ? "final-year-grad" : "degree-engineering"}&context=${activeAcademicContext}&situation=progress&audience=college`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] text-white text-xs sm:text-sm font-bold shadow-sm shadow-[#6757F5]/20 hover:bg-[#5342E8] transition-all shrink-0"
                >
                  <span>{isMarketing ? "College Pilot Inquiries" : "Continue with Progress Track"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 4. Full Parameterized StudentExplorer Toggle */}
        <div className="text-center pt-8">
          <button
            onClick={() => setShowFullMatrix(!showFullMatrix)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FAF9F6] border-2 border-[#E8E6F3] text-sm font-bold text-[#171A2B] hover:bg-[#EDEAFF] hover:border-[#DDD8FE] hover:text-[#6757F5] transition-all shadow-xs"
          >
            <Compass className="w-4 h-4 text-[#6757F5]" />
            <span>
              {showFullMatrix
                ? "Hide Extended 24-Experience Matrix"
                : "Browse Extended 24-Experience Matrix for Higher Ed"}
            </span>
            <ChevronRight
              className={`w-4 h-4 text-[#626987] transition-transform ${
                showFullMatrix ? "rotate-90" : ""
              }`}
            />
          </button>
        </div>

        {/* Collapsible Parameterized StudentExplorer */}
        {showFullMatrix && (
          <div className="mt-10 pt-10 border-t border-[#E8E6F3] animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold text-[#6757F5] uppercase tracking-wider block mb-1">
                Extended Discovery Matrix
              </span>
              <h3 className="text-2xl font-black text-[#171A2B]">
                Explore Higher Education Cohorts &amp; Disciplines
              </h3>
              <p className="text-xs sm:text-sm text-[#626987] mt-1.5">
                Filtered strictly to Diploma, Degree &amp; Engineering, and Final-Year / Graduate stages.
              </p>
            </div>
            <StudentExplorer
              allowedStages={["diploma", "degree-engineering", "final-year-grad"]}
              initialStage="degree-engineering"
            />
          </div>
        )}
      </div>
    </section>
  );
}
