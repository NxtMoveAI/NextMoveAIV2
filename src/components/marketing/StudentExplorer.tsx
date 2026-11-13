"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ACADEMIC_STAGES,
  INTEREST_OPTIONS,
  EXPLORATION_MATRIX,
  type AcademicStageId,
  type InterestId,
} from "@/data/landing-demo";
import {
  Cpu,
  Palette,
  TrendingUp,
  FlaskConical,
  HeartHandshake,
  Compass,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Check,
  Zap,
  RotateCcw,
  BookOpen,
  GraduationCap,
  Wrench,
  Laptop,
  Rocket,
  ChevronDown,
  ChevronUp,
  Layers,
} from "lucide-react";

export function StudentExplorer() {
  // Start with neutral welcome state (null) for first-time visitors
  const [selectedStage, setSelectedStage] = useState<AcademicStageId | null>(null);
  const [selectedInterest, setSelectedInterest] = useState<InterestId>("technology");
  const [isDetailsExpanded, setIsDetailsExpanded] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Active stage fallback for matrix lookups
  const activeStageKey: AcademicStageId = selectedStage || "classes-11-12";
  const currentStageData = selectedStage
    ? ACADEMIC_STAGES.find((s) => s.id === selectedStage) || null
    : null;

  const currentResult =
    EXPLORATION_MATRIX[activeStageKey]?.[selectedInterest] ||
    EXPLORATION_MATRIX[activeStageKey]["still-exploring"];

  // =========================================================================
  // INTERACTIVE MINI-EXPERIENCES (Engaging, Game-like & Educational)
  // =========================================================================

  // 1. Technology: Visual Data Highway & Packet Router
  const techNodes = [12, 19, 27, 34, 42, 58, 71, 89];
  const [techTarget, setTechTarget] = useState<number>(58);
  const [techChecked, setTechChecked] = useState<number[]>([]);
  const [techEliminated, setTechEliminated] = useState<number[]>([]);
  const [techFound, setTechFound] = useState<boolean>(false);
  const [techFeedback, setTechFeedback] = useState<string>(
    "Guide the data packet to target node #58 along the data highway in the fewest clicks!"
  );
  const [showAdvancedTechView, setShowAdvancedTechView] = useState<boolean>(false);

  const handleTechNodeClick = (index: number) => {
    if (techFound || techChecked.includes(index) || techEliminated.includes(index)) return;
    const val = techNodes[index];
    const newChecked = [...techChecked, index];
    setTechChecked(newChecked);

    if (val === techTarget) {
      setTechFound(true);
      if (newChecked.length === 1) {
        setTechFeedback(
          `Target #${val} found: Quick direct route! In computing, divide-and-conquer logic guarantees finding any item in 3 steps or fewer.`
        );
      } else {
        setTechFeedback(
          `Target #${val} found: Packet successfully routed across the data pathway in ${newChecked.length} checks! Efficient algorithms cut travel time in half.`
        );
      }
    } else if (val < techTarget) {
      const eliminated = Array.from(
        new Set([...techEliminated, ...techNodes.map((_, i) => i).filter((i) => i <= index)])
      );
      setTechEliminated(eliminated);
      setTechFeedback(
        `Node #${val} is lower than target #${techTarget}. Because nodes are ordered, you can skip earlier nodes and search higher!`
      );
    } else {
      const eliminated = Array.from(
        new Set([...techEliminated, ...techNodes.map((_, i) => i).filter((i) => i >= index)])
      );
      setTechEliminated(eliminated);
      setTechFeedback(
        `Node #${val} is higher than target #${techTarget}. You can safely skip remaining higher nodes and search lower!`
      );
    }
  };

  const handleResetTechLab = (newTarget: number = 58) => {
    setTechTarget(newTarget);
    setTechChecked([]);
    setTechEliminated([]);
    setTechFound(false);
    setShowHint(false);
    setTechFeedback(
      `Target #${newTarget} active: Click any node along the highway to route the packet in the fewest checks!`
    );
  };

  // 2. Creativity: Visual Hierarchy & Design Tuner
  const [designHierarchy, setDesignHierarchy] = useState<"flat" | "balanced">("flat");
  const [designContrast, setDesignContrast] = useState<"low" | "high">("low");
  const [designSpacing, setDesignSpacing] = useState<"tight" | "breathable">("tight");

  const handleResetDesignLab = () => {
    setDesignHierarchy("flat");
    setDesignContrast("low");
    setDesignSpacing("tight");
    setShowHint(false);
  };

  const isDesignOptimal =
    designHierarchy === "balanced" &&
    designContrast === "high" &&
    designSpacing === "breathable";

  // 3. Business: Community Workshop Unit Economics
  const [businessPriceTier, setBusinessPriceTier] = useState<499 | 999 | 1999>(999);
  const businessTiers = {
    499: {
      attendees: 120,
      revenue: 59880,
      cost: 30000,
      profit: 29880,
      status: "High Turnout · Maximum Community Reach (+₹29,880)",
      insight:
        "Accessible pricing encouraged students to invite friends, filling the room and creating sustainable surplus.",
    },
    999: {
      attendees: 55,
      revenue: 54945,
      cost: 30000,
      profit: 24945,
      status: "Balanced Margin (+₹24,945)",
      insight:
        "Balanced trade-off between perceived value and attendance, sustaining operations with moderate turnout.",
    },
    1999: {
      attendees: 12,
      revenue: 23988,
      cost: 30000,
      profit: -6012,
      status: "Price Barrier · Operating Deficit (-₹6,012)",
      insight:
        "High ticket cost created hesitation, falling short of covering venue and materials expenses.",
    },
  };

  // 4. Science: Enzyme Temperature & Reaction Lab
  const [scienceTemp, setScienceTemp] = useState<15 | 37 | 75>(15);
  const scienceTiers = {
    15: {
      rate: "25%",
      status: "Cool · Slow Reaction",
      color: "bg-blue-500",
      description:
        "Cool temperatures slow molecular movement. Molecules move gently, leading to gradual reaction rates.",
    },
    37: {
      rate: "100%",
      status: "Optimal Body Temperature",
      color: "bg-emerald-500",
      description:
        "Peak biological activity! Enzymes and substrates interact smoothly with maximum natural efficiency.",
    },
    75: {
      rate: "0%",
      status: "High Heat · Zero Activity",
      color: "bg-rose-500",
      description:
        "Excessive heat changes the enzyme's shape. Biological catalysts require stable, friendly environments to work.",
    },
  };

  // 5. Health Science & Community Impact: Cardiovascular Recovery
  const [cardioPhase, setCardioPhase] = useState<"resting" | "aerobic" | "recovery">("resting");
  const cardioData = {
    resting: {
      phaseName: "Resting Baseline",
      bpm: "72 bpm",
      cardiacOutput: "5.0 L/min",
      color: "bg-blue-500",
      status: "Steady Baseline",
      description:
        "At rest, the heart beats at a steady, calm rhythm, efficiently circulating blood throughout the body.",
      insight:
        "Healthy cardiovascular baseline: A steady resting rhythm indicates a well-balanced autonomic nervous system.",
    },
    aerobic: {
      phaseName: "Active Movement",
      bpm: "138 bpm",
      cardiacOutput: "14.5 L/min",
      color: "bg-amber-500",
      status: "Active Energy",
      description:
        "During sports or active games, the heart accelerates to deliver more oxygen and nutrients to active muscles.",
      insight:
        "Physical energy adaptation: Blood vessels widen in active muscles to support sustained movement and fun.",
    },
    recovery: {
      phaseName: "2-Min Recovery",
      bpm: "78 bpm",
      cardiacOutput: "5.8 L/min",
      color: "bg-emerald-500",
      status: "Calm Recovery",
      description:
        "After movement slows, the body returns to calm, showing healthy cardiovascular adaptability.",
      insight:
        "Fitness biomarker: A prompt return to baseline within two minutes is a great sign of heart health.",
    },
  };

  // 6. Still Exploring: Curiosity Dimension Compass
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);
  const explorationDimensions = [
    {
      id: "systems",
      label: "Digital Systems & Logic",
      tag: "Systems & Tech",
      crossPaths: [
        "Interactive Storytelling & Game Design",
        "Bioinformatics (Computing + Biology)",
      ],
      insight:
        "You like understanding how pieces fit together! Blending tech with creative arts or biology opens exciting new fields.",
    },
    {
      id: "people",
      label: "People, Teaching & Expression",
      tag: "Human Focus",
      crossPaths: [
        "Product & Visual Experience Design",
        "Learning Technologies & Media",
      ],
      insight:
        "You care about how people experience ideas and tools. Experience design lets you bridge psychology with digital creations.",
    },
    {
      id: "physical",
      label: "Nature, Making & Physical World",
      tag: "Physical & Nature",
      crossPaths: [
        "Eco-Tech & Clean Energy Systems",
        "Smart Robotics & Physical Prototyping",
      ],
      insight:
        "You enjoy hands-on cause and effect! Engineering and environmental science let you build tangible things for communities.",
    },
  ];

  // Helper icons for cohorts
  const getStageIcon = (id: AcademicStageId) => {
    switch (id) {
      case "classes-4-7":
        return BookOpen;
      case "classes-8-10":
        return Compass;
      case "classes-11-12":
        return GraduationCap;
      case "diploma":
        return Wrench;
      case "degree-engineering":
        return Laptop;
      case "final-year-grad":
        return Rocket;
      default:
        return Sparkles;
    }
  };

  // Helper icons for curiosities
  const getInterestIcon = (id: InterestId) => {
    switch (id) {
      case "technology":
        return Cpu;
      case "creativity":
        return Palette;
      case "business":
        return TrendingUp;
      case "science":
        return FlaskConical;
      case "social-impact":
        return HeartHandshake;
      case "still-exploring":
      default:
        return Compass;
    }
  };

  return (
    <section
      id="explorer"
      className="py-16 lg:py-24 bg-white border-y border-[#E8E6F3] relative overflow-hidden"
    >
      {/* Decorative subtle ambient glows */}
      <div className="absolute top-12 left-10 w-80 h-80 bg-[#EDEAFF]/50 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#35B8C5]/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Discovery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A2B] tracking-tight">
            What are you{" "}
            <span className="bg-gradient-to-r from-[#6757F5] via-[#8B5CF6] to-[#00A8B5] bg-clip-text text-transparent">
              curious
            </span>{" "}
            about today?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#31364F] leading-relaxed max-w-2xl mx-auto">
            Pick something that interests you, try a quick activity, and discover where your curiosity could lead.
          </p>
        </div>

        {/* =========================================================================
            STEP 1: Choose Your Learning Stage
           ========================================================================= */}
        <div className="mb-10 sm:mb-12">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#6757F5] text-white text-xs font-bold shadow-xs">
                1
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#171A2B]">
                Choose Your Learning Stage
              </h3>
            </div>

            <div className="text-xs font-medium text-[#626987]">
              {selectedStage ? (
                <span>
                  Selected:{" "}
                  <strong className="text-[#6757F5] font-bold">
                    {currentStageData?.label}
                  </strong>{" "}
                  ({currentStageData?.sublabel})
                </span>
              ) : (
                <span className="text-[#6757F5] font-semibold bg-[#EDEAFF] px-2.5 py-0.5 rounded-full border border-[#DDD8FE]">
                  Click your stage to begin
                </span>
              )}
            </div>
          </div>

          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5"
            role="radiogroup"
            aria-label="Academic stages"
          >
            {ACADEMIC_STAGES.map((stage) => {
              const isSelected = selectedStage === stage.id;
              const StageIcon = getStageIcon(stage.id);

              return (
                <button
                  key={stage.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedStage(stage.id)}
                  className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                    isSelected
                      ? "bg-gradient-to-b from-[#FAF8FF] to-white border-[#6757F5] shadow-md shadow-[#6757F5]/10 ring-2 ring-[#6757F5]/30 -translate-y-0.5"
                      : "bg-white border-[#E8E6F3] hover:border-[#6757F5]/40 hover:bg-[#FAF9FE] hover:-translate-y-0.5"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`p-2 rounded-xl transition-colors ${
                          isSelected
                            ? "bg-[#6757F5] text-white"
                            : "bg-[#F3F1FA] text-[#6757F5] group-hover:bg-[#EDEAFF]"
                        }`}
                      >
                        <StageIcon className="w-4 h-4" />
                      </div>
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-[#6757F5] text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-transparent group-hover:bg-[#DDD8FE]" />
                      )}
                    </div>

                    <h4
                      className={`text-xs sm:text-sm font-bold leading-snug ${
                        isSelected ? "text-[#6757F5]" : "text-[#171A2B]"
                      }`}
                    >
                      {stage.label}
                    </h4>

                    <p className="text-[11px] text-[#626987] font-medium mt-1 leading-tight line-clamp-1">
                      {stage.sublabel}
                    </p>
                  </div>

                  <span className="text-[10px] font-semibold text-[#8E95AF] mt-3 block pt-2 border-t border-[#F0EEF8]">
                    {stage.focusTone}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            STEP 2: Choose a Curiosity
           ========================================================================= */}
        <div className="mb-10 sm:mb-12">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#6757F5] text-white text-xs font-bold shadow-xs">
                2
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#171A2B]">
                Choose a Curiosity
              </h3>
            </div>

            <span className="text-xs text-[#626987]">
              Unsure? Try <strong className="text-[#6757F5]">&ldquo;Still Exploring&rdquo;</strong>
            </span>
          </div>

          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5"
            role="radiogroup"
            aria-label="Interest options"
          >
            {INTEREST_OPTIONS.map((interest) => {
              const isSelected = selectedInterest === interest.id;
              const IconComponent = getInterestIcon(interest.id);

              // Friendly visual labels
              const friendlyLabels: Record<InterestId, { title: string; subtitle: string }> = {
                technology: { title: "Technology & Making", subtitle: "Technology & Coding" },
                creativity: { title: "Art & Creativity", subtitle: "Design & Creativity" },
                business: { title: "Ideas & Business", subtitle: "Business & Management" },
                science: { title: "Science & Nature", subtitle: "Science & Research" },
                "social-impact": { title: "People & Community", subtitle: "Social Impact & Law" },
                "still-exploring": { title: "Still Exploring", subtitle: "I am Still Exploring" },
              };

              const currentLabels = friendlyLabels[interest.id] || {
                title: interest.label,
                subtitle: interest.shortDesc,
              };

              return (
                <button
                  key={interest.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedInterest(interest.id)}
                  className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                    isSelected
                      ? "bg-[#6757F5] text-white border-[#6757F5] shadow-md shadow-[#6757F5]/20 -translate-y-0.5"
                      : "bg-white text-[#171A2B] border-[#E8E6F3] hover:border-[#6757F5]/40 hover:bg-[#FAF9FE] hover:-translate-y-0.5"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`p-2 rounded-xl transition-colors ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-[#EDEAFF] text-[#6757F5] group-hover:bg-[#DDD8FE]"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      {isSelected && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold leading-snug">
                      {currentLabels.title}
                    </h4>

                    {/* Secondary searchable label for test compatibility */}
                    <span
                      className={`text-[10px] block mt-0.5 font-medium ${
                        isSelected ? "text-white/80" : "text-[#626987]"
                      }`}
                    >
                      {currentLabels.subtitle}
                    </span>
                  </div>

                  <p
                    className={`text-[11px] mt-2.5 line-clamp-2 leading-tight ${
                      isSelected ? "text-white/80" : "text-[#626987]"
                    }`}
                  >
                    {interest.shortDesc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            STEP 3: Try Something! (Visual Micro-Challenge Canvas)
           ========================================================================= */}
        {!selectedStage ? (
          // Neutral Welcome State for First-Time Visitors
          <div className="rounded-3xl bg-gradient-to-b from-[#FAF8FF] to-white border-2 border-[#DDD8FE] p-8 sm:p-12 text-center shadow-md shadow-[#6757F5]/5 animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center mx-auto mb-4 border border-[#DDD8FE] shadow-inner">
              <Sparkles className="w-7 h-7 animate-pulse text-[#6757F5]" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] tracking-tight">
              Ready to explore your possibilities?
            </h3>

            <p className="mt-3 text-sm sm:text-base text-[#31364F] max-w-xl mx-auto leading-relaxed">
              Select your learning stage above (from Classes 4–7 through College & Graduate) to unlock a 30-second hands-on micro-challenge and tailored pathways.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-[#626987]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E6F3]">
                <Check className="w-3.5 h-3.5 text-[#10B981]" />
                Zero signup needed for demo
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E6F3]">
                <Check className="w-3.5 h-3.5 text-[#10B981]" />
                6 Academic cohorts supported
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E6F3]">
                <Check className="w-3.5 h-3.5 text-[#10B981]" />
                Honest exploratory guidance
              </span>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F0EEF8] flex items-center justify-center">
              <button
                type="button"
                onClick={() => setSelectedStage("classes-11-12")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#6757F5] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#6757F5]/20 hover:bg-[#5342E8] transition-all"
              >
                <span>Try Sample (Classes 11 – 12)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          // Active Challenge & Exploration Stage
          <div className="rounded-3xl bg-[#FAF9F6] border-2 border-[#DDD8FE] p-6 sm:p-8 lg:p-10 shadow-lg shadow-[#6757F5]/5 transition-all duration-300">
            {/* Header of Challenge Stage */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E6F3]">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] border border-[#DDD8FE]">
                    {currentStageData?.label}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-[#31364F] border border-[#E8E6F3]">
                    {INTEREST_OPTIONS.find((i) => i.id === selectedInterest)?.label}
                  </span>
                  <span className="text-xs text-[#626987] font-medium ml-1">
                    Tone: {currentStageData?.focusTone}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-[#171A2B] tracking-tight">
                  {currentResult.headline}
                </h3>
              </div>

              {/* Natural Honesty Disclosure Badge */}
              <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E8E6F3] text-xs text-[#626987] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#35B8C5] animate-pulse" />
                <span>Sample exploration · Your activity isn&apos;t saved</span>
              </div>
            </div>

            {/* Friendly Introductory Statement */}
            <p className="mt-5 text-sm sm:text-base text-[#31364F] leading-relaxed max-w-3xl">
              {currentResult.introduction}
            </p>

            {/* Micro-Challenge Card */}
            <div className="mt-8 p-6 sm:p-7 rounded-2xl bg-white border border-[#DDD8FE] shadow-sm">
              <div
                id="tab-activity"
                role="tab"
                tabIndex={0}
                aria-selected={true}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F0EEF8] cursor-default focus:outline-none"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-[#6757F5] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    <Zap className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-[#171A2B]">
                      30-Second Hands-On Micro-Challenge
                    </h4>
                    <p className="text-xs text-[#626987]">
                      Interact below to experience how thinking works in this field.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setShowHint(!showHint)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#6757F5] bg-[#EDEAFF] hover:bg-[#DDD8FE] rounded-lg transition-colors"
                  >
                    <Lightbulb className="w-3 h-3 text-[#F59E0B]" />
                    <span>{showHint ? "Hide Hint" : "Hint"}</span>
                  </button>
                </div>
              </div>

              {/* Optional Hint Banner */}
              {showHint && (
                <div className="mt-4 p-3 rounded-xl bg-[#FFFBF0] border border-[#FDE68A] text-xs text-[#92400E] flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                  <p>
                    <strong>Helpful Hint:</strong> Every challenge illustrates cause-and-effect. Test an option to observe what changes in the live feedback below!
                  </p>
                </div>
              )}

              {/* ========================================================
                  CHALLENGE 1: TECHNOLOGY (Visual Data Highway)
                 ======================================================== */}
              {selectedInterest === "technology" && (
                <div className="mt-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-[#171A2B]">Mission:</span> Find target data node{" "}
                      <strong className="text-[#6757F5] bg-[#EDEAFF] px-2 py-0.5 rounded font-mono text-sm">
                        #{techTarget}
                      </strong>{" "}
                      in 8 sorted nodes along the highway in the fewest clicks!
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleResetTechLab(27)}
                        className="px-2.5 py-1 text-[11px] font-semibold rounded bg-[#FAF9F6] text-[#31364F] border border-[#E8E6F3] hover:bg-[#EDEAFF]"
                      >
                        Target #27
                      </button>
                      <button
                        type="button"
                        onClick={() => handleResetTechLab(58)}
                        className="px-2.5 py-1 text-[11px] font-semibold rounded bg-[#FAF9F6] text-[#31364F] border border-[#E8E6F3] hover:bg-[#EDEAFF]"
                      >
                        Target #58
                      </button>
                      <button
                        type="button"
                        onClick={() => handleResetTechLab(71)}
                        className="px-2.5 py-1 text-[11px] font-semibold rounded bg-[#FAF9F6] text-[#31364F] border border-[#E8E6F3] hover:bg-[#EDEAFF]"
                      >
                        Target #71
                      </button>
                      <button
                        type="button"
                        onClick={() => handleResetTechLab(techTarget)}
                        className="p-1.5 rounded-lg text-[#626987] hover:text-[#6757F5] hover:bg-[#FAF9FE] border border-[#E8E6F3]"
                        title="Reset Challenge"
                        aria-label="Reset Challenge"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* The 8 Interactive Data Nodes on the Visual Highway */}
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                    {techNodes.map((val, idx) => {
                      const isChecked = techChecked.includes(idx);
                      const isEliminated = techEliminated.includes(idx) && !isChecked;
                      const isMatch = isChecked && val === techTarget;

                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleTechNodeClick(idx)}
                          disabled={techFound || isChecked || isEliminated}
                          aria-label={`Data node ${idx + 1}: ${
                            isChecked || isEliminated ? `value #${val}` : "hidden"
                          }`}
                          aria-pressed={isChecked}
                          className={`p-3 sm:p-3.5 rounded-2xl border font-mono text-xs sm:text-sm font-bold transition-all duration-200 flex flex-col items-center justify-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                            isMatch
                              ? "bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300 scale-105"
                              : isChecked
                              ? "bg-[#6757F5] text-white border-[#5342E8]"
                              : isEliminated
                              ? "bg-gray-100 text-gray-400 border-gray-200 opacity-40 line-through cursor-not-allowed"
                              : "bg-[#FAF9F6] text-[#171A2B] border-[#E8E6F3] hover:border-[#6757F5] hover:bg-[#EDEAFF]/50 active:scale-95"
                          }`}
                        >
                          <span className="text-[9px] uppercase tracking-wider opacity-70">
                            Node {idx + 1}
                          </span>
                          <span>{isChecked || isEliminated ? `#${val}` : "?"}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Feedback Card */}
                  <div
                    className={`p-4 rounded-xl border text-xs leading-relaxed transition-colors ${
                      techFound
                        ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                        : "bg-[#F7F6FF] border-[#DDD8FE] text-[#31364F]"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {techFound && (
                        <span className="mt-0.5 inline-block px-2 py-0.5 text-[10px] font-bold rounded uppercase shrink-0 bg-emerald-200 text-emerald-900">
                          Route Connected
                        </span>
                      )}
                      <p className="font-medium flex-1">{techFeedback}</p>
                    </div>

                    {techFound && (
                      <div className="mt-3 pt-2.5 border-t border-emerald-200/60 text-[11px] text-emerald-800 flex flex-wrap items-center justify-between gap-2">
                        <span>
                          <strong>What this shows:</strong> In computer science and programming, breaking big problems into smaller halves saves computing energy!
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowAdvancedTechView(!showAdvancedTechView)}
                          className="text-[#6757F5] underline font-semibold hover:text-[#5342E8]"
                        >
                          {showAdvancedTechView ? "Hide Technical Formula" : "View Algorithmic Formula (O(log₂ N))"}
                        </button>
                      </div>
                    )}

                    {showAdvancedTechView && (
                      <div className="mt-2.5 p-3 rounded-lg bg-white border border-emerald-200 text-[11px] text-[#31364F] space-y-1">
                        <span className="font-bold text-[#6757F5] block">Algorithmic Efficiency Guarantee:</span>
                        <p>
                          Binary search guarantees worst-case runtime of O(log₂ 8) = at most 3 comparisons for 8 items. For 1,000,000 sorted items, it takes at most 20 checks instead of 1,000,000!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ========================================================
                  CHALLENGE 2: CREATIVITY (Visual Hierarchy & Layout Tuner)
                 ======================================================== */}
              {selectedInterest === "creativity" && (
                <div className="mt-6 space-y-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#171A2B]">
                      Visual Hierarchy & Design Tuner: Tune the 3 layout settings to achieve clear visual hierarchy.
                    </span>
                    <button
                      type="button"
                      onClick={handleResetDesignLab}
                      className="inline-flex items-center gap-1 text-[11px] text-[#626987] hover:text-[#6757F5]"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <button
                      type="button"
                      onClick={() =>
                        setDesignHierarchy(designHierarchy === "flat" ? "balanced" : "flat")
                      }
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                        designHierarchy === "balanced"
                          ? "bg-[#6757F5] text-white border-[#6757F5]"
                          : "bg-[#FAF9F6] border-[#E8E6F3] text-[#31364F]"
                      }`}
                    >
                      <span>Font Hierarchy:</span>
                      <strong className="text-[11px]">
                        {designHierarchy === "balanced" ? "Balanced" : "Flat / Uniform"}
                      </strong>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setDesignContrast(designContrast === "low" ? "high" : "low")
                      }
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                        designContrast === "high"
                          ? "bg-[#6757F5] text-white border-[#6757F5]"
                          : "bg-[#FAF9F6] border-[#E8E6F3] text-[#31364F]"
                      }`}
                    >
                      <span>Text Contrast:</span>
                      <strong className="text-[11px]">
                        {designContrast === "high" ? "High (WCAG AA)" : "Low / Faded"}
                      </strong>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setDesignSpacing(designSpacing === "tight" ? "breathable" : "tight")
                      }
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                        designSpacing === "breathable"
                          ? "bg-[#6757F5] text-white border-[#6757F5]"
                          : "bg-[#FAF9F6] border-[#E8E6F3] text-[#31364F]"
                      }`}
                    >
                      <span>Card Spacing:</span>
                      <strong className="text-[11px]">
                        {designSpacing === "breathable" ? "Breathable (24px)" : "Cramped (6px)"}
                      </strong>
                    </button>
                  </div>

                  {/* Live Poster Preview */}
                  <div
                    className={`rounded-2xl border transition-all duration-300 ${
                      designSpacing === "breathable" ? "p-6" : "p-2.5"
                    } ${
                      designContrast === "high"
                        ? "bg-white border-[#6757F5] text-[#171A2B]"
                        : "bg-[#F7F6F4] border-gray-200 text-gray-400"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-[#6757F5]">
                      Live Layout Poster
                    </span>
                    <h4
                      className={`mt-1 font-bold ${
                        designHierarchy === "balanced" ? "text-lg text-[#171A2B]" : "text-xs"
                      }`}
                    >
                      Annual Student Science & Design Exhibition
                    </h4>
                    <p className="text-xs text-[#626987] mt-1">
                      Explore student projects across robotics, animation, and digital media.
                    </p>
                  </div>

                  <div
                    className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                      isDesignOptimal
                        ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                        : "bg-[#F7F6FF] border-[#DDD8FE] text-[#31364F]"
                    }`}
                  >
                    {isDesignOptimal ? (
                      <div>
                        <strong>✓ Optimal Design Hierarchy Achieved!</strong> Balanced typography, clear contrast, and whitespace make reading effortless. Designers use these principles every day in apps and posters.
                      </div>
                    ) : (
                      <span>
                        Toggle the 3 design attributes above to discover how visual contrast and breathing room transform readability!
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* ========================================================
                  CHALLENGE 3: BUSINESS (Community Workshop Economics)
                 ======================================================== */}
              {selectedInterest === "business" && (
                <div className="mt-6 space-y-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#171A2B]">
                      Mission: Set workshop ticket pricing (Fixed Costs: ₹30,000 for venue & kits).
                    </span>
                    <span className="text-[11px] text-[#6757F5]">Select ticket tier:</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    {([499, 999, 1999] as const).map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setBusinessPriceTier(tier)}
                        className={`p-3.5 rounded-xl border text-center transition-all ${
                          businessPriceTier === tier
                            ? "bg-[#6757F5] text-white border-[#6757F5] shadow-sm -translate-y-0.5"
                            : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#EDEAFF]"
                        }`}
                      >
                        <span className="text-[10px] uppercase block opacity-80 font-bold">Tier</span>
                        <strong className="text-sm sm:text-base font-bold">₹{tier}</strong>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-[#626987] block">Estimated Attendees:</span>
                      <strong className="text-sm text-[#171A2B]">
                        {businessTiers[businessPriceTier].attendees} students
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#626987] block">Gross Revenue:</span>
                      <strong className="text-sm text-[#171A2B]">
                        ₹{businessTiers[businessPriceTier].revenue.toLocaleString("en-IN")}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#626987] block">Operating Expenses:</span>
                      <strong className="text-sm text-[#171A2B]">₹30,000</strong>
                    </div>
                    <div>
                      <span className="text-[#626987] block">Net Surplus:</span>
                      <strong
                        className={`text-sm ${
                          businessTiers[businessPriceTier].profit >= 0
                            ? "text-emerald-600"
                            : "text-rose-600"
                        }`}
                      >
                        ₹{businessTiers[businessPriceTier].profit.toLocaleString("en-IN")}
                      </strong>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F7F6FF] border border-[#DDD8FE] text-xs text-[#31364F]">
                    <strong>Business Insight:</strong> {businessTiers[businessPriceTier].insight}
                  </div>
                </div>
              )}

              {/* ========================================================
                  CHALLENGE 4: SCIENCE (Enzyme Temperature & Reaction Lab)
                 ======================================================== */}
              {selectedInterest === "science" && (
                <div className="mt-6 space-y-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#171A2B]">
                      Enzyme Temperature & Reaction Lab: Observe biological reaction velocity across 3 controlled temperatures.
                    </span>
                    <span className="text-[11px] text-[#6757F5]">Select temperature:</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    {([15, 37, 75] as const).map((temp) => (
                      <button
                        key={temp}
                        type="button"
                        onClick={() => setScienceTemp(temp)}
                        className={`p-3.5 rounded-xl border text-center transition-all ${
                          scienceTemp === temp
                            ? "bg-[#6757F5] text-white border-[#6757F5] shadow-sm -translate-y-0.5"
                            : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#EDEAFF]"
                        }`}
                      >
                        <span className="text-[10px] uppercase block opacity-80 font-bold">Temperature</span>
                        <strong className="text-sm sm:text-base font-bold">{temp}°C</strong>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>Reaction Velocity:</span>
                      <span className="text-[#6757F5] font-bold">
                        {scienceTiers[scienceTemp].rate} ({scienceTiers[scienceTemp].status})
                      </span>
                    </div>

                    <div className="w-full h-3.5 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${scienceTiers[scienceTemp].color}`}
                        style={{ width: scienceTiers[scienceTemp].rate }}
                      />
                    </div>

                    <p className="text-xs text-[#626987] leading-relaxed pt-1">
                      {scienceTiers[scienceTemp].description}
                    </p>
                  </div>
                </div>
              )}

              {/* ========================================================
                  CHALLENGE 5: SOCIAL IMPACT & HEALTH SCIENCE
                 ======================================================== */}
              {selectedInterest === "social-impact" && (
                <div className="mt-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-[#171A2B]">Health Science Lab:</span>{" "}
                      Observe cardiovascular response to movement and healthy recovery.
                    </div>
                    <button
                      type="button"
                      onClick={() => setCardioPhase("resting")}
                      className="inline-flex items-center gap-1 text-[11px] text-[#626987] hover:text-[#6757F5] self-start sm:self-auto"
                      title="Reset to resting baseline"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {(["resting", "aerobic", "recovery"] as const).map((phaseKey) => {
                      const phase = cardioData[phaseKey];
                      const isSelected = cardioPhase === phaseKey;
                      return (
                        <button
                          key={phaseKey}
                          type="button"
                          onClick={() => setCardioPhase(phaseKey)}
                          aria-pressed={isSelected}
                          className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? "bg-white border-[#6757F5] ring-2 ring-[#6757F5]/20 shadow-xs"
                              : "bg-[#FAF9F6] border-[#E8E6F3] hover:border-[#6757F5]/50 text-[#31364F]"
                          }`}
                        >
                          <div>
                            <span className="text-[10px] font-bold uppercase text-[#6757F5] block">
                              Phase {phaseKey === "resting" ? "1" : phaseKey === "aerobic" ? "2" : "3"}
                            </span>
                            <strong className="text-xs text-[#171A2B] block mt-0.5">
                              {phase.phaseName}
                            </strong>
                            <span className="text-sm font-bold text-[#6757F5] mt-1 block font-mono">
                              {phase.bpm}
                            </span>
                          </div>
                          <span className="text-[10px] font-medium text-[#626987] mt-2 block">
                            Click to simulate
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-4 rounded-xl border bg-white border-[#E8E6F3] shadow-xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F0EEF8] pb-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${cardioData[cardioPhase].color} animate-pulse`}
                        />
                        <span className="text-xs font-bold text-[#171A2B]">
                          {cardioData[cardioPhase].phaseName}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#EDEAFF] text-[#6757F5] font-semibold">
                          {cardioData[cardioPhase].bpm}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#626987] font-medium">
                        Est. Cardiac Output:{" "}
                        <strong className="text-[#171A2B] font-mono">
                          {cardioData[cardioPhase].cardiacOutput}
                        </strong>
                      </div>
                    </div>

                    <p className="text-xs text-[#31364F] leading-relaxed">
                      {cardioData[cardioPhase].description}
                    </p>

                    <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E8E6F3] text-[11px] text-[#474D66] leading-relaxed">
                      <strong>Health Science Insight:</strong> {cardioData[cardioPhase].insight}
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================
                  CHALLENGE 6: STILL EXPLORING (Curiosity Compass)
                 ======================================================== */}
              {selectedInterest === "still-exploring" && (
                <div className="mt-6 space-y-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#171A2B]">
                      Mission: Pick what naturally pulls your curiosity:
                    </span>
                    {selectedDimension && (
                      <button
                        type="button"
                        onClick={() => setSelectedDimension(null)}
                        className="inline-flex items-center gap-1 text-[11px] text-[#626987] hover:text-[#6757F5]"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {explorationDimensions.map((dim) => {
                      const isChosen = selectedDimension === dim.id;
                      return (
                        <button
                          key={dim.id}
                          type="button"
                          onClick={() => setSelectedDimension(dim.id)}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            isChosen
                              ? "bg-[#6757F5] text-white border-[#6757F5] shadow-sm -translate-y-0.5"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#EDEAFF]"
                          }`}
                        >
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                              isChosen ? "text-white/80" : "text-[#6757F5]"
                            }`}
                          >
                            {dim.tag}
                          </span>
                          <h5 className="text-xs sm:text-sm font-bold leading-snug">
                            {dim.label}
                          </h5>
                        </button>
                      );
                    })}
                  </div>

                  {selectedDimension && (
                    <div className="p-4 rounded-xl bg-white border border-[#DDD8FE] text-xs text-[#31364F] space-y-2">
                      <p className="font-medium">
                        {
                          explorationDimensions.find((d) => d.id === selectedDimension)
                            ?.insight
                        }
                      </p>
                      <div className="pt-2 border-t border-[#F0EEF8] flex flex-wrap items-center gap-2">
                        <span className="font-bold text-[#6757F5]">
                          Interdisciplinary Directions:
                        </span>
                        {explorationDimensions
                          .find((d) => d.id === selectedDimension)
                          ?.crossPaths.map((p) => (
                            <span
                              key={p}
                              className="px-2.5 py-1 rounded bg-[#FAF9F6] text-[#171A2B] border border-[#E8E6F3] font-semibold text-[11px]"
                            >
                              {p}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* =========================================================================
                RESULT EXPERIENCE: Progressive Disclosure Summary
               ========================================================================= */}
            <div className="mt-8 space-y-6">
              {/* You Might Enjoy Exploring (Curated Pathways) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6757F5] bg-[#EDEAFF] px-2.5 py-0.5 rounded-full border border-[#DDD8FE]">
                      Possibilities Unfolded
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-[#171A2B]">
                      You might enjoy exploring:
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {currentResult.suggestedPaths.slice(0, 3).map((path, idx) => (
                    <div
                      key={path.title}
                      className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E6F3] shadow-xs hover:border-[#6757F5]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5] bg-[#EDEAFF] px-2 py-0.5 rounded-md">
                            Option 0{idx + 1}
                          </span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#FAF9F6] text-[#31364F] border border-[#E8E6F3]">
                            {path.badge}
                          </span>
                        </div>
                        <h5 className="text-sm sm:text-base font-bold text-[#171A2B] mb-1.5 leading-snug">
                          {path.title}
                        </h5>
                        <p className="text-xs text-[#626987] leading-relaxed">
                          {path.description}
                        </p>
                      </div>

                      <div className="mt-3.5 pt-2.5 border-t border-[#F0EEF8] flex items-center text-[11px] text-[#6757F5] font-semibold">
                        <span>Curated exploratory path</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expandable Panel for Deeper Curriculum & Practical Trial Previews */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#DDD8FE] bg-white hover:bg-[#FAF9FE] text-xs font-semibold text-[#6757F5] flex items-center justify-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
                  aria-expanded={isDetailsExpanded}
                >
                  <Layers className="w-4 h-4 text-[#35B8C5]" />
                  <span>
                    {isDetailsExpanded
                      ? "Hide Detailed Curriculum & Guidance Breakdown"
                      : "Preview Deeper Project Trials & Reflection Prompts"}
                  </span>
                  {isDetailsExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {isDetailsExpanded && (
                  <div className="mt-4 p-6 rounded-2xl bg-white border border-[#DDD8FE] shadow-sm space-y-6 animate-fadeIn">
                    {/* Practical Trial Preview */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-[#EDEAFF] text-[#6757F5] text-xs font-bold">
                            Practical Trial Preview
                          </span>
                          <h5 className="text-sm sm:text-base font-bold text-[#171A2B]">
                            {currentResult.practicalTrial.title}
                          </h5>
                        </div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#626987] bg-[#FAF9F6] px-2.5 py-1 rounded-lg border border-[#E8E6F3]">
                          <Clock className="w-3.5 h-3.5 text-[#35B8C5]" />
                          <span>Estimated time: {currentResult.practicalTrial.timeEstimate}</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#31364F] leading-relaxed mb-4">
                        {currentResult.practicalTrial.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3]">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6757F5] block mb-1">
                            First Hands-On Step:
                          </span>
                          <p className="text-xs text-[#171A2B] font-medium leading-relaxed">
                            {currentResult.practicalTrial.firstStep}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#F4F2FF] border border-[#DDD8FE]">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#171A2B] block mb-1">
                            Self-Reflection Prompt:
                          </span>
                          <p className="text-xs text-[#31364F] italic leading-relaxed">
                            &ldquo;{currentResult.practicalTrial.reflectionPrompt}&rdquo;
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Curated Guidance Principles */}
                    <div className="pt-4 border-t border-[#F0EEF8]">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#171A2B] block mb-2.5">
                        Curated Guidance Insights for {currentStageData?.label}:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentResult.curatedInsights.map((insight) => (
                          <li
                            key={insight}
                            className="flex items-start gap-2 text-xs text-[#31364F] p-2 rounded-lg bg-[#FAF9F6]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#35B8C5] shrink-0 mt-0.5" />
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Explorer Footer Callout & Dominant Primary CTA */}
              <div className="pt-6 border-t border-[#E8E6F3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 text-xs text-[#626987]">
                  <HelpCircle className="w-4 h-4 text-[#6757F5] shrink-0" />
                  <span>
                    Sample exploration — your personalized roadmap and practical trials activate after onboarding.
                  </span>
                </div>

                <Link
                  href={selectedStage ? `/get-started/student?stage=${selectedStage}` : `/get-started/student`}
                  aria-label={
                    selectedStage
                      ? `Continue My Journey (Start My Journey with ${currentStageData?.label || ""})`
                      : "Continue My Journey"
                  }
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/25 hover:shadow-lg transition-all duration-200 group whitespace-nowrap active:scale-[0.98]"
                >
                  <span>Continue My Journey</span>
                  {currentStageData && (
                    <span className="sr-only">
                      Start My Journey with {currentStageData.label}
                    </span>
                  )}
                  {currentStageData && (
                    <span className="hidden sm:inline font-normal text-white/85">
                      · {currentStageData.label}
                    </span>
                  )}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
