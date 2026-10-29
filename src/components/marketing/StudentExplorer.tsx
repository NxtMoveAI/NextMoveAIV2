"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ACADEMIC_STAGES,
  INTEREST_OPTIONS,
  EXPLORATION_MATRIX,
  type AcademicStageId,
  type InterestId,
  type InteractiveActivity,
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
  Milestone,
  Check,
  Zap,
  RotateCcw,
} from "lucide-react";

export function StudentExplorer() {
  const [selectedStage, setSelectedStage] =
    useState<AcademicStageId>("classes-11-12");
  const [selectedInterest, setSelectedInterest] =
    useState<InterestId>("technology");
  const [activeTab, setActiveTab] = useState<
    "activity" | "paths" | "trial" | "next"
  >("activity");

  const currentStageData = ACADEMIC_STAGES.find((s) => s.id === selectedStage)!;
  const currentResult =
    EXPLORATION_MATRIX[selectedStage]?.[selectedInterest] ||
    EXPLORATION_MATRIX[selectedStage]["still-exploring"];

  // Activity Previews state
  const availableActivities: InteractiveActivity[] =
    currentResult.interactiveActivities || [
      {
        id: "default-activity-1",
        title: currentResult.practicalTrial.title,
        duration: currentResult.practicalTrial.timeEstimate,
        tag: "Starter Preview",
        description: currentResult.practicalTrial.description,
        whatYouWillLearn: `You will test foundational concepts in ${
          INTEREST_OPTIONS.find((i) => i.id === selectedInterest)?.label
        } and discover if hands-on practice energizes you.`,
        clarifiesDecision:
          "Helps you know whether to invest time into this stream before committing to expensive courses.",
      },
      {
        id: "default-activity-2",
        title: `Compare Real-World Tools & Methods in ${
          INTEREST_OPTIONS.find((i) => i.id === selectedInterest)?.label
        }`,
        duration: "15 mins",
        tag: "Analytical Comparison",
        description:
          "Compare 2 different practical approaches used by practitioners in this domain.",
        whatYouWillLearn:
          "You will understand the trade-offs between theory and real-world execution.",
        clarifiesDecision:
          "Clarifies which specialization or study structure fits your preferred learning style.",
      },
    ];

  const [selectedActivityId, setSelectedActivityId] = useState<string>(
    availableActivities[0].id
  );

  const activeActivity =
    availableActivities.find((a) => a.id === selectedActivityId) ||
    availableActivities[0];

  // =========================================================================
  // PRIORITY 2: Self-Contained Deterministic Interactive Mini-Experiences
  // =========================================================================

  // 1. Technology: Binary Search Data Router
  const techNodes = [12, 19, 27, 34, 42, 58, 71, 89];
  const [techTarget, setTechTarget] = useState<number>(58);
  const [techChecked, setTechChecked] = useState<number[]>([]);
  const [techEliminated, setTechEliminated] = useState<number[]>([]);
  const [techFound, setTechFound] = useState<boolean>(false);
  const [techFeedback, setTechFeedback] = useState<string>(
    "Find target #58 in 8 sorted data nodes. Click any node to test divide-and-conquer logic!"
  );

  const handleTechNodeClick = (index: number) => {
    if (techFound || techChecked.includes(index) || techEliminated.includes(index)) return;
    const val = techNodes[index];
    const newChecked = [...techChecked, index];
    setTechChecked(newChecked);

    if (val === techTarget) {
      setTechFound(true);
      if (newChecked.length === 1) {
        setTechFeedback(
          `Target #${val} found on your very first click! That was a 1-in-8 lucky guess (12.5% random probability) rather than divide-and-conquer reasoning. Try switching to Target #27 or #71 and click a middle node first to see how binary elimination guarantees a solution in ≤3 comparisons!`
        );
      } else {
        setTechFeedback(
          `✓ Target #${val} located in ${newChecked.length} checks! Demonstrated algorithmic reasoning: by comparing against midpoints and eliminating sorted sub-ranges, you reached the target in O(log₂ 8) time without sequentially checking all nodes.`
        );
      }
    } else if (val < techTarget) {
      const eliminated = Array.from(
        new Set([...techEliminated, ...techNodes.map((_, i) => i).filter((i) => i <= index)])
      );
      setTechEliminated(eliminated);
      setTechFeedback(
        `#${val} is lower than target #${techTarget}. Because the list is sorted in ascending order, you can safely eliminate nodes 1 through ${
          index + 1
        } without checking them! Remaining search space cut in half.`
      );
    } else {
      const eliminated = Array.from(
        new Set([...techEliminated, ...techNodes.map((_, i) => i).filter((i) => i >= index)])
      );
      setTechEliminated(eliminated);
      setTechFeedback(
        `#${val} is higher than target #${techTarget}. You can safely eliminate nodes ${
          index + 1
        } through 8 in a single comparison! Now search only the lower remaining nodes.`
      );
    }
  };

  const handleResetTechLab = (newTarget: number = 58) => {
    setTechTarget(newTarget);
    setTechChecked([]);
    setTechEliminated([]);
    setTechFound(false);
    setTechFeedback(
      `Target #${newTarget} active. Click any node to find it in the fewest comparisons!`
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
  };

  const isDesignOptimal =
    designHierarchy === "balanced" &&
    designContrast === "high" &&
    designSpacing === "breathable";

  // 3. Business: Unit Economics Simulator
  const [businessPriceTier, setBusinessPriceTier] = useState<499 | 999 | 1999>(999);
  const businessTiers = {
    499: {
      attendees: 120,
      revenue: 59880,
      cost: 30000,
      profit: 29880,
      status: "High Volume · Maximum Net Surplus (+₹29,880)",
      insight:
        "Accessible pricing triggered word-of-mouth adoption among students, yielding highest overall net surplus.",
    },
    999: {
      attendees: 55,
      revenue: 54945,
      cost: 30000,
      profit: 24945,
      status: "Balanced Margin (+₹24,945)",
      insight:
        "Balanced trade-off between perceived prestige and volume, but fewer total students impacted.",
    },
    1999: {
      attendees: 12,
      revenue: 23988,
      cost: 30000,
      profit: -6012,
      status: "Price Resistance · Operating Deficit (-₹6,012)",
      insight:
        "Severe price barrier collapsed demand below fixed venue/kit costs, resulting in an operating loss.",
    },
  };

  // 4. Science: Enzyme Kinetics & Temperature Lab
  const [scienceTemp, setScienceTemp] = useState<15 | 37 | 75>(15);
  const scienceTiers = {
    15: {
      rate: "25%",
      status: "Slow Reaction Kinetics",
      color: "bg-blue-500",
      description:
        "Low kinetic energy restricts enzyme-substrate collision frequency. Safe but sluggish.",
    },
    37: {
      rate: "100%",
      status: "Optimal Catalytic Rate",
      color: "bg-emerald-500",
      description:
        "Optimal physiological temperature! Active sites conform with maximum binding efficiency.",
    },
    75: {
      rate: "0%",
      status: "Protein Denatured · Zero Activity",
      color: "bg-rose-500",
      description:
        "Excess thermal energy ruptured tertiary hydrogen bonds. Enzyme permanently lost its structure.",
    },
  };

  // 5. Health Science & Social Impact: Cardiovascular Physiology & Aerobic Recovery Lab
  const [cardioPhase, setCardioPhase] = useState<"resting" | "aerobic" | "recovery">("resting");
  const cardioData = {
    resting: {
      phaseName: "Resting Baseline",
      bpm: "72 bpm",
      cardiacOutput: "5.0 L/min",
      color: "bg-blue-500",
      status: "Resting Homeostasis",
      description:
        "Baseline cardiac output at rest. The parasympathetic nervous system maintains steady, rhythmic ventricular contractions and efficient cellular oxygen delivery.",
      insight:
        "Healthy cardiovascular baseline: At rest, stroke volume is approximately 70 mL per beat, circulating the body's total blood volume (~5 liters) once every minute.",
    },
    aerobic: {
      phaseName: "Aerobic Exertion",
      bpm: "138 bpm",
      cardiacOutput: "14.5 L/min",
      color: "bg-amber-500",
      status: "Elevated Metabolic Demand",
      description:
        "During aerobic movement, sympathetic nervous activity increases heart rate and stroke volume, channeling oxygenated blood to contracting skeletal muscles.",
      insight:
        "Exercise physiology: Vasodilation widens arterioles in active muscle tissue while vasoconstriction temporarily slows flow to non-critical digestive systems.",
    },
    recovery: {
      phaseName: "2-Min Cool-Down",
      bpm: "78 bpm",
      cardiacOutput: "5.8 L/min",
      color: "bg-emerald-500",
      status: "Healthy Parasympathetic Recovery",
      description:
        "Post-exercise heart rate recovery (HRR). Vagal tone reactivates promptly, returning heart rate toward resting baseline within 120 seconds.",
      insight:
        "Health-science metric: Rapid heart-rate recovery within 2 minutes is a primary non-invasive biomarker of cardiovascular fitness and autonomic health.",
    },
  };

  // 6. Still Exploring: Curiosity Dimension Compass
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);
  const explorationDimensions = [
    {
      id: "systems",
      label: "Digital Systems & Abstract Logic",
      tag: "Systems Focus",
      crossPaths: [
        "Computational Linguistics (AI + Language)",
        "Bioinformatics (Computing + Genetics)",
      ],
      insight:
        "You enjoy discovering rules and order. Cross-disciplinary technology allows you to build solutions across biology, linguistics, or robotics.",
    },
    {
      id: "people",
      label: "Human Behavior, Teaching & Expression",
      tag: "Human Focus",
      crossPaths: [
        "Product Design & HCI (Psychology + Software)",
        "EdTech & Cognitive Experience Design",
      ],
      insight:
        "You care about how humans experience tools and ideas. Design and education technology let you bridge psychology with digital tools.",
    },
    {
      id: "physical",
      label: "Physical Artifacts, Nature & Material Systems",
      tag: "Physical Focus",
      crossPaths: [
        "Sustainable Materials Engineering",
        "Hardware IoT & Clean-Tech Systems",
      ],
      insight:
        "You like tangible cause-and-effect. Engineering, green tech, and applied science let you build physical systems that impact real communities.",
    },
  ];

  // Handlers for switching stage and interest
  const handleStageChange = (newStage: AcademicStageId) => {
    setSelectedStage(newStage);
    const newResult =
      EXPLORATION_MATRIX[newStage]?.[selectedInterest] ||
      EXPLORATION_MATRIX[newStage]["still-exploring"];
    if (newResult.interactiveActivities && newResult.interactiveActivities.length > 0) {
      setSelectedActivityId(newResult.interactiveActivities[0].id);
    }
  };

  const handleInterestChange = (newInterest: InterestId) => {
    setSelectedInterest(newInterest);
    const newResult =
      EXPLORATION_MATRIX[selectedStage]?.[newInterest] ||
      EXPLORATION_MATRIX[selectedStage]["still-exploring"];
    if (newResult.interactiveActivities && newResult.interactiveActivities.length > 0) {
      setSelectedActivityId(newResult.interactiveActivities[0].id);
    }
  };

  // Helper icon mapper
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
      className="py-16 lg:py-24 bg-white border-y border-[#E8E6F3] relative"
    >
      {/* Decorative subtle background accents */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#EDEAFF]/50 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#35B8C5]/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Student Explorer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A2B] tracking-tight">
            Discover what your next move could look like.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#31364F] leading-relaxed">
            Every student’s path is unique. Choose your academic stage and curiosities
            to test a hands-on micro-challenge and inspect curated educational directions.
          </p>
        </div>

        {/* Step 1: Academic Stage Selector */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#626987] flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#6757F5] text-white text-[11px] font-bold">
                1
              </span>
              Select Your Academic Stage
            </span>
            <span className="text-xs font-medium text-[#6757F5] hidden sm:inline">
              Selected: <strong className="text-[#171A2B]">{currentStageData.label}</strong> ({currentStageData.sublabel})
            </span>
          </div>

          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            role="radiogroup"
            aria-label="Academic stages"
          >
            {ACADEMIC_STAGES.map((stage) => {
              const isSelected = selectedStage === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleStageChange(stage.id)}
                  className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                    isSelected
                      ? "bg-[#FAF9F6] border-[#6757F5] shadow-md shadow-[#6757F5]/10 ring-1 ring-[#6757F5]"
                      : "bg-white border-[#E8E6F3] hover:border-[#6757F5]/40 hover:bg-[#FAF9F6]/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-xs font-bold ${
                          isSelected ? "text-[#6757F5]" : "text-[#171A2B]"
                        }`}
                      >
                        {stage.label}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#6757F5] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-[#626987] font-medium leading-tight">
                      {stage.sublabel}
                    </p>
                  </div>
                  <span className="text-[10px] text-[#6757F5] font-semibold mt-2.5 inline-block">
                    {stage.ageRange}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Interest Selector */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#626987] flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#6757F5] text-white text-[11px] font-bold">
                2
              </span>
              What Interests or Curiosities Do You Have?
            </span>
            <span className="text-xs text-[#626987]">
              Unsure? Choose <strong className="text-[#6757F5]">&ldquo;Still Exploring&rdquo;</strong>
            </span>
          </div>

          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            role="radiogroup"
            aria-label="Interest options"
          >
            {INTEREST_OPTIONS.map((interest) => {
              const isSelected = selectedInterest === interest.id;
              const IconComponent = getInterestIcon(interest.id);
              return (
                <button
                  key={interest.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleInterestChange(interest.id)}
                  className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                    isSelected
                      ? "bg-[#6757F5] text-white border-[#6757F5] shadow-md shadow-[#6757F5]/20"
                      : "bg-white text-[#171A2B] border-[#E8E6F3] hover:border-[#6757F5]/40 hover:bg-[#EDEAFF]/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-xl ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-[#EDEAFF] text-[#6757F5]"
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
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold leading-snug">
                      {interest.label}
                    </h3>
                    <p
                      className={`text-[11px] mt-1 line-clamp-2 ${
                        isSelected ? "text-white/80" : "text-[#626987]"
                      }`}
                    >
                      {interest.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Journey Preview Canvas */}
        <div className="rounded-3xl bg-[#FAF9F6] border-2 border-[#DDD8FE] p-6 sm:p-8 lg:p-10 shadow-lg shadow-[#6757F5]/5 transition-all duration-300">
          {/* Header of dynamic preview */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E6F3]">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] border border-[#DDD8FE]">
                  {currentStageData.label}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-[#31364F] border border-[#E8E6F3]">
                  {INTEREST_OPTIONS.find((i) => i.id === selectedInterest)?.label}
                </span>
                <span className="text-xs text-[#626987] font-medium ml-1">
                  Focus: {currentStageData.focusTone}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#171A2B] tracking-tight">
                {currentResult.headline}
              </h3>
            </div>

            <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E8E6F3] text-xs text-[#626987]">
              <div className="w-2 h-2 rounded-full bg-[#35B8C5] animate-pulse" />
              <span>Deterministic local preview</span>
            </div>
          </div>

          {/* Friendly introductory statement */}
          <p className="mt-6 text-sm sm:text-base text-[#31364F] leading-relaxed">
            {currentResult.introduction}
          </p>

          {/* Tab Navigation for Exploration Details */}
          <div
            className="mt-8 flex items-center gap-2 border-b border-[#E8E6F3] pb-3 overflow-x-auto"
            role="tablist"
            aria-label="Exploration Views"
          >
            <button
              type="button"
              role="tab"
              id="tab-activity"
              aria-selected={activeTab === "activity"}
              aria-controls="panel-activity"
              onClick={() => setActiveTab("activity")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
                activeTab === "activity"
                  ? "bg-[#6757F5] text-white shadow-sm"
                  : "bg-white text-[#31364F] hover:bg-[#EDEAFF]/60 border border-[#E8E6F3]"
              }`}
            >
              <Zap className="w-4 h-4 text-[#35B8C5]" />
              <span>Interactive Micro-Challenge & Previews</span>
            </button>

            <button
              type="button"
              role="tab"
              id="tab-paths"
              aria-selected={activeTab === "paths"}
              aria-controls="panel-paths"
              onClick={() => setActiveTab("paths")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
                activeTab === "paths"
                  ? "bg-[#6757F5] text-white shadow-sm"
                  : "bg-white text-[#31364F] hover:bg-[#EDEAFF]/60 border border-[#E8E6F3]"
              }`}
            >
              <Milestone className="w-4 h-4" />
              <span>Curated Pathways ({currentResult.suggestedPaths.length})</span>
            </button>

            <button
              type="button"
              role="tab"
              id="tab-trial"
              aria-selected={activeTab === "trial"}
              aria-controls="panel-trial"
              onClick={() => setActiveTab("trial")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
                activeTab === "trial"
                  ? "bg-[#6757F5] text-white shadow-sm"
                  : "bg-white text-[#31364F] hover:bg-[#EDEAFF]/60 border border-[#E8E6F3]"
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>15-Min Sample Trial Preview</span>
            </button>

            <button
              type="button"
              role="tab"
              id="tab-next"
              aria-selected={activeTab === "next"}
              aria-controls="panel-next"
              onClick={() => setActiveTab("next")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
                activeTab === "next"
                  ? "bg-[#6757F5] text-white shadow-sm"
                  : "bg-white text-[#31364F] hover:bg-[#EDEAFF]/60 border border-[#E8E6F3]"
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span>Next Action & Principles</span>
            </button>
          </div>

          {/* Tab 0: Interactive Micro-Challenge & Activity Previews */}
          {activeTab === "activity" && (
            <div
              id="panel-activity"
              role="tabpanel"
              aria-labelledby="tab-activity"
              className="mt-6 space-y-8 animate-fadeIn"
            >
              {/* PART 1: The Self-Contained Genuine Interactive Micro-Experience */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DDD8FE] shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F0EEF8]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#6757F5] text-white flex items-center justify-center text-xs font-bold">
                      <Zap className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-[#171A2B]">
                        30-Second Hands-On Micro-Challenge
                      </h4>
                      <p className="text-xs text-[#626987]">
                        Perform an action below to experience how thinking works in this domain.
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#6757F5] bg-[#EDEAFF] px-2.5 py-1 rounded-lg border border-[#DDD8FE] self-start sm:self-auto">
                    Interactive Trial · Zero Backend Calls
                  </span>
                </div>

                {/* --- 1. TECHNOLOGY MINI-CHALLENGE (Binary Search Vault) --- */}
                {selectedInterest === "technology" && (
                  <div className="mt-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-[#171A2B]">Challenge:</span> Find target data node{" "}
                        <strong className="text-[#6757F5] bg-[#EDEAFF] px-2 py-0.5 rounded font-mono text-sm">
                          #{techTarget}
                        </strong>{" "}
                        in 8 sorted nodes in the fewest clicks!
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
                          className="p-1 rounded text-[#626987] hover:text-[#6757F5]"
                          title="Reset Challenge"
                          aria-label="Reset Challenge"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* The 8 Interactive Data Nodes */}
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
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
                            className={`p-3 rounded-xl border font-mono text-xs sm:text-sm font-bold transition-all duration-200 flex flex-col items-center justify-center gap-1 focus:outline-hidden focus:ring-2 focus:ring-[#6757F5] ${
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

                    {/* Feedback and Learning Outcome */}
                    <div
                      className={`p-3.5 rounded-xl border text-xs leading-relaxed transition-colors ${
                        techFound
                          ? techChecked.length === 1
                            ? "bg-amber-50 border-amber-200 text-amber-900"
                            : "bg-emerald-50 border-emerald-200 text-emerald-900"
                          : "bg-[#F7F6FF] border-[#DDD8FE] text-[#31364F]"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {techFound && (
                          <span
                            className={`mt-0.5 inline-block px-1.5 py-0.5 text-[10px] font-bold rounded uppercase shrink-0 ${
                              techChecked.length === 1
                                ? "bg-amber-200 text-amber-900"
                                : "bg-emerald-200 text-emerald-900"
                            }`}
                          >
                            {techChecked.length === 1 ? "Lucky First Guess" : "Algorithmic Reasoning"}
                          </span>
                        )}
                        <p className="font-medium flex-1">{techFeedback}</p>
                      </div>

                      {techFound && (
                        <div
                          className={`mt-2.5 pt-2 border-t text-[11px] ${
                            techChecked.length === 1
                              ? "border-amber-200 text-amber-800"
                              : "border-emerald-200/60 text-emerald-800"
                          }`}
                        >
                          {techChecked.length === 1 ? (
                            <span>
                              <strong>Algorithmic Principle:</strong> In computer science, algorithms
                              provide deterministic worst-case guarantees (O(log₂ 8) = at most 3
                              comparisons) so that systems never depend on random chance.
                            </span>
                          ) : (
                            <span>
                              <strong>Autonomy Reflection:</strong> Did finding the efficiency shortcut
                              feel satisfying? Software engineering and algorithms center on eliminating
                              wasted computational effort to build fast, scalable systems.
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* --- 2. CREATIVITY MINI-CHALLENGE (Hierarchy & Readability Tuner) --- */}
                {selectedInterest === "creativity" && (
                  <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#171A2B]">
                        Challenge: Tune the 3 sliders to achieve optimal visual hierarchy.
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

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() =>
                          setDesignHierarchy(designHierarchy === "flat" ? "balanced" : "flat")
                        }
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between ${
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
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between ${
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
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between ${
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

                    {/* Live Preview of Design Tuner */}
                    <div
                      className={`rounded-2xl border transition-all duration-300 ${
                        designSpacing === "breathable" ? "p-6" : "p-2"
                      } ${
                        designContrast === "high"
                          ? "bg-white border-[#6757F5] text-[#171A2B]"
                          : "bg-[#F7F6F4] border-gray-200 text-gray-400"
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold text-[#6757F5]">
                        Live Layout Component
                      </span>
                      <h4
                        className={`mt-1 font-bold ${
                          designHierarchy === "balanced" ? "text-lg text-[#171A2B]" : "text-xs"
                        }`}
                      >
                        Annual Student Science & Design Exhibition
                      </h4>
                      <p className="text-xs text-[#626987] mt-1">
                        Explore student projects across robotics, animation, and UI architecture.
                      </p>
                    </div>

                    <div
                      className={`p-3.5 rounded-xl border text-xs ${
                        isDesignOptimal
                          ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                          : "bg-[#F7F6FF] border-[#DDD8FE] text-[#31364F]"
                      }`}
                    >
                      {isDesignOptimal ? (
                        <div>
                          <strong>✓ Optimal Design Hierarchy Achieved!</strong> High contrast +
                          breathable whitespace significantly cuts cognitive fatigue. Product and
                          UI designers apply these exact cognitive principles every day.
                        </div>
                      ) : (
                        <span>
                          Toggle the 3 design attributes above to see how layout structure changes
                          human readability.
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* --- 3. BUSINESS MINI-CHALLENGE (Unit Economics Simulator) --- */}
                {selectedInterest === "business" && (
                  <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#171A2B]">
                        Challenge: Price a student workshop (Fixed Venue & Kit Cost: ₹30,000).
                      </span>
                      <span className="text-[11px] text-[#6757F5]">Select a ticket price tier:</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {([499, 999, 1999] as const).map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setBusinessPriceTier(tier)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            businessPriceTier === tier
                              ? "bg-[#6757F5] text-white border-[#6757F5] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#EDEAFF]"
                          }`}
                        >
                          <span className="text-[10px] uppercase block opacity-80">Tier</span>
                          <strong className="text-sm font-bold">₹{tier}</strong>
                        </button>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-[#626987] block">Expected Attendees:</span>
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
                        <span className="text-[#626987] block">Total Operating Cost:</span>
                        <strong className="text-sm text-[#171A2B]">₹30,000</strong>
                      </div>
                      <div>
                        <span className="text-[#626987] block">Net Operating Profit:</span>
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

                {/* --- 4. SCIENCE MINI-CHALLENGE (Enzyme Kinetics Lab) --- */}
                {selectedInterest === "science" && (
                  <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#171A2B]">
                        Challenge: Test enzyme reaction velocity at 3 controlled temperatures.
                      </span>
                      <span className="text-[11px] text-[#6757F5]">Select temperature:</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {([15, 37, 75] as const).map((temp) => (
                        <button
                          key={temp}
                          type="button"
                          onClick={() => setScienceTemp(temp)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            scienceTemp === temp
                              ? "bg-[#6757F5] text-white border-[#6757F5] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#EDEAFF]"
                          }`}
                        >
                          <span className="text-[10px] uppercase block opacity-80">Variable</span>
                          <strong className="text-sm font-bold">{temp}°C</strong>
                        </button>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span>Reaction Velocity:</span>
                        <span className="text-[#6757F5]">
                          {scienceTiers[scienceTemp].rate} ({scienceTiers[scienceTemp].status})
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${scienceTiers[scienceTemp].color}`}
                          style={{ width: scienceTiers[scienceTemp].rate }}
                        />
                      </div>
                      <p className="text-xs text-[#626987] leading-relaxed pt-1">
                        {scienceTiers[scienceTemp].description}
                      </p>
                    </div>
                  </div>
                )}

                {/* --- 5. HEALTH SCIENCE & PHYSIOLOGY LAB (Cardiovascular Recovery) --- */}
                {selectedInterest === "social-impact" && (
                  <div className="mt-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-bold text-[#171A2B]">Health Science Lab:</span>{" "}
                        Observe cardiovascular response to physical exertion and autonomic recovery.
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

                    {/* Physiology Monitor Card */}
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
                        <strong>Autonomic Health Insight:</strong> {cardioData[cardioPhase].insight}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- 6. STILL EXPLORING (Curiosity Dimension Compass) --- */}
                {selectedInterest === "still-exploring" && (
                  <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#171A2B]">
                        Challenge: Select what naturally pulls your curiosity:
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
                                ? "bg-[#6757F5] text-white border-[#6757F5] shadow-sm"
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
                            Interdisciplinary Combinations:
                          </span>
                          {explorationDimensions
                            .find((d) => d.id === selectedDimension)
                            ?.crossPaths.map((p) => (
                              <span
                                key={p}
                                className="px-2 py-0.5 rounded bg-[#FAF9F6] text-[#171A2B] border border-[#E8E6F3] font-semibold text-[11px]"
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

              {/* PART 2: Optional Advanced Activity Previews (Explicitly Labeled) */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6757F5] block">
                      Optional Activity Previews (For Future Exploration)
                    </span>
                    <p className="text-xs text-[#626987]">
                      These deeper practical challenges show what advanced project trials look like.
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold text-[#626987] bg-white px-2 py-1 rounded-md border border-[#E8E6F3] self-start sm:self-auto">
                    Activity Preview Only · Demonstrative
                  </span>
                </div>

                {/* Activity Selector Toggle Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableActivities.map((act) => {
                    const isActSelected = activeActivity.id === act.id;
                    return (
                      <button
                        key={act.id}
                        type="button"
                        onClick={() => setSelectedActivityId(act.id)}
                        className={`p-5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between ${
                          isActSelected
                            ? "bg-white border-[#6757F5] shadow-md shadow-[#6757F5]/10 ring-2 ring-[#6757F5]/30 -translate-y-0.5"
                            : "bg-white/80 border-[#E8E6F3] hover:border-[#DDD8FE] hover:bg-white"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                isActSelected
                                  ? "bg-[#6757F5] text-white"
                                  : "bg-[#EDEAFF] text-[#6757F5]"
                              }`}
                            >
                              Activity Preview: {act.tag}
                            </span>
                            <span className="text-[11px] font-semibold text-[#626987] flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#35B8C5]" />
                              {act.duration}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-[#171A2B] mb-2 leading-snug">
                            {act.title}
                          </h4>
                          <p className="text-xs text-[#626987] leading-relaxed">
                            {act.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#F0EEF8] flex items-center justify-between text-xs">
                          <span
                            className={`font-semibold ${
                              isActSelected ? "text-[#6757F5]" : "text-[#626987]"
                            }`}
                          >
                            {isActSelected ? "Selected Preview" : "Click to Inspect"}
                          </span>
                          {isActSelected && (
                            <span className="w-4 h-4 rounded-full bg-[#6757F5] text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Discovery Box for the Selected Activity */}
                <div className="p-6 rounded-2xl bg-white border border-[#DDD8FE] shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#35B8C5] bg-[#35B8C5]/10 px-2.5 py-0.5 rounded-md">
                      Sample Learning & Decision Clarity
                    </span>
                    <span className="text-xs text-[#626987]">
                      For {currentStageData.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-1">
                      <div className="text-xs font-bold text-[#6757F5] uppercase tracking-wider">
                        What You Will Learn / Discover:
                      </div>
                      <p className="text-xs sm:text-sm text-[#171A2B] font-medium leading-relaxed">
                        {activeActivity.whatYouWillLearn}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F7F6FF] border border-[#DDD8FE] space-y-1">
                      <div className="text-xs font-bold text-[#171A2B] uppercase tracking-wider">
                        How It Clarifies Your Next Move:
                      </div>
                      <p className="text-xs sm:text-sm text-[#31364F] leading-relaxed font-medium">
                        {activeActivity.clarifiesDecision}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 1: Suggested Pathways */}
          {activeTab === "paths" && (
            <div
              id="panel-paths"
              role="tabpanel"
              aria-labelledby="tab-paths"
              className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn"
            >
              {currentResult.suggestedPaths.map((path, idx) => (
                <div
                  key={path.title}
                  className="p-5 rounded-2xl bg-white border border-[#E8E6F3] shadow-xs hover:border-[#6757F5]/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
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
                    <h4 className="text-base font-bold text-[#171A2B] mb-2 leading-snug">
                      {path.title}
                    </h4>
                    <p className="text-xs text-[#626987] leading-relaxed">
                      {path.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#F0EEF8] flex items-center text-[11px] text-[#6757F5] font-semibold">
                    <span>Curated Educational Pathway</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Practical Trial */}
          {activeTab === "trial" && (
            <div
              id="panel-trial"
              role="tabpanel"
              aria-labelledby="tab-trial"
              className="mt-6 p-6 rounded-2xl bg-white border border-[#E8E6F3] shadow-xs animate-fadeIn"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#EDEAFF] text-[#6757F5] text-xs font-bold">
                    Sample Trial Preview
                  </span>
                  <h4 className="text-lg font-bold text-[#171A2B]">
                    {currentResult.practicalTrial.title}
                  </h4>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#626987] bg-[#FAF9F6] px-3 py-1 rounded-lg border border-[#E8E6F3]">
                  <Clock className="w-3.5 h-3.5 text-[#35B8C5]" />
                  <span>Time required: {currentResult.practicalTrial.timeEstimate}</span>
                </div>
              </div>

              <p className="text-sm text-[#31364F] leading-relaxed mb-4">
                {currentResult.practicalTrial.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#6757F5] mb-1">
                    First Immediate Step:
                  </div>
                  <p className="text-xs sm:text-sm text-[#171A2B] font-medium">
                    {currentResult.practicalTrial.firstStep}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F4F2FF] border border-[#DDD8FE]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#171A2B] mb-1">
                    Self-Reflection Question:
                  </div>
                  <p className="text-xs sm:text-sm text-[#31364F] italic">
                    &ldquo;{currentResult.practicalTrial.reflectionPrompt}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Next Action & Principles */}
          {activeTab === "next" && (
            <div
              id="panel-next"
              role="tabpanel"
              aria-labelledby="tab-next"
              className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-4 animate-fadeIn"
            >
              <div className="md:col-span-7 p-6 rounded-2xl bg-white border border-[#E8E6F3]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#35B8C5] mb-1 block">
                  Recommended Concrete Step
                </span>
                <h4 className="text-base font-bold text-[#171A2B] mb-2">
                  {currentResult.nextAction.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#626987] leading-relaxed">
                  {currentResult.nextAction.description}
                </p>
                <div className="mt-4 pt-4 border-t border-[#F0EEF8] flex items-center gap-2">
                  <span className="text-xs font-bold text-[#6757F5]">
                    Suggested Focus:
                  </span>
                  <span className="text-xs text-[#31364F]">
                    {currentResult.nextAction.ctaText}
                  </span>
                </div>
              </div>

              <div className="md:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-[#FAF9F6] to-[#EDEAFF]/40 border border-[#DDD8FE]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#171A2B] mb-2 block">
                  Curated Guidance Rules
                </span>
                <ul className="space-y-2.5">
                  {currentResult.curatedInsights.map((insight) => (
                    <li
                      key={insight}
                      className="flex items-start gap-2 text-xs text-[#31364F]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#35B8C5] shrink-0 mt-0.5" />
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Explorer Footer Callout & Primary CTA */}
          <div className="mt-8 pt-6 border-t border-[#E8E6F3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs text-[#626987]">
              <HelpCircle className="w-4 h-4 text-[#6757F5] shrink-0" />
              <span>
                This is an illustrative sample exploration. Your personalized
                journey with full roadmaps begins after onboarding.
              </span>
            </div>

            <Link
              href={`/get-started/student?stage=${selectedStage}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#6757F5] hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/25 hover:shadow-lg transition-all duration-200 group whitespace-nowrap active:scale-[0.98]"
            >
              <span>Start My Journey with {currentStageData.label}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
