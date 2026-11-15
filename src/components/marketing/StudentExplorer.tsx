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
  RotateCcw,
  BookOpen,
  GraduationCap,
  Wrench,
  Laptop,
  Rocket,
  ChevronDown,
  ChevronUp,
  Layers,
  Sun,
  Droplets,
  TreePine,
  Volume2,
  ShieldCheck,
} from "lucide-react";

export function StudentExplorer() {
  // Neutral welcome state (null) for first-time visitors
  const [selectedStage, setSelectedStage] = useState<AcademicStageId | null>(null);
  const [selectedInterest, setSelectedInterest] = useState<InterestId | null>(null);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Active stage fallback for matrix lookups
  const activeStageKey: AcademicStageId = selectedStage || "classes-11-12";
  const activeInterestKey: InterestId = selectedInterest || "technology";
  const currentStageData = selectedStage
    ? ACADEMIC_STAGES.find((s) => s.id === selectedStage) || null
    : null;

  const currentResult =
    EXPLORATION_MATRIX[activeStageKey]?.[activeInterestKey] ||
    EXPLORATION_MATRIX[activeStageKey]["still-exploring"];

  // Cohort difficulty tier
  const cohortTier: "foundation" | "exploration-junior" | "exploration-senior" | "applied" =
    selectedStage === "classes-4-7"
      ? "foundation"
      : selectedStage === "classes-8-10"
      ? "exploration-junior"
      : selectedStage === "classes-11-12"
      ? "exploration-senior"
      : "applied";

  // =========================================================================
  // ACTIVITY 1: TECHNOLOGY & MAKING
  // =========================================================================
  // Foundation (Classes 4-7): Help the Robot Find Its Way
  const [techRobotStep, setTechRobotStep] = useState<"library" | "garden" | "rocket" | null>(null);
  // Exploration Junior (Classes 8-10): Guide the Mars Rover
  const [techRoverRoute, setTechRoverRoute] = useState<"ridge" | "canyon" | "sensor" | null>("ridge");
  // Exploration Senior (Classes 11-12): Smart Campus Route Delivery
  const [techCampusDispatch, setTechCampusDispatch] = useState<"safety" | "speed" | "battery" | null>("safety");
  // Applied (Diploma, Degree, Graduate): Smart Grid Power Router
  const [techGridTarget, setTechGridTarget] = useState<"battery" | "compute" | "ev" | null>("battery");
  // Optional Deeper Algorithmic Highway (for curious older students & test compatibility)
  const [showAlgorithmicHighway, setShowAlgorithmicHighway] = useState<boolean>(false);
  const techNodes = [12, 19, 27, 34, 42, 58, 71, 89];
  const [techTarget, setTechTarget] = useState<number>(58);
  const [techChecked, setTechChecked] = useState<number[]>([]);
  const [techEliminated, setTechEliminated] = useState<number[]>([]);
  const [techFound, setTechFound] = useState<boolean>(false);
  const [techFeedback, setTechFeedback] = useState<string>("Target #58 active");

  const handleTechNodeClick = (index: number) => {
    if (techFound || techChecked.includes(index) || techEliminated.includes(index)) return;
    const val = techNodes[index];
    const newChecked = [...techChecked, index];
    setTechChecked(newChecked);

    if (val === techTarget) {
      setTechFound(true);
      setTechFeedback(`Target #${val} found! Binary search located the item in ${newChecked.length} checks.`);
    } else if (val < techTarget) {
      const eliminated = Array.from(new Set([...techEliminated, ...techNodes.map((_, i) => i).filter((i) => i <= index)]));
      setTechEliminated(eliminated);
      setTechFeedback(`Node #${val} is lower than target #${techTarget}. Search higher!`);
    } else {
      const eliminated = Array.from(new Set([...techEliminated, ...techNodes.map((_, i) => i).filter((i) => i >= index)]));
      setTechEliminated(eliminated);
      setTechFeedback(`Node #${val} is higher than target #${techTarget}. Search lower!`);
    }
  };

  const handleResetTechHighway = (newTarget: number = 58) => {
    setTechTarget(newTarget);
    setTechChecked([]);
    setTechEliminated([]);
    setTechFound(false);
    setTechFeedback(`Target #${newTarget} active: Click any node along the highway.`);
  };

  // =========================================================================
  // ACTIVITY 2: ART & CREATIVITY (Make Your Poster Pop!)
  // =========================================================================
  const [posterPalette, setPosterPalette] = useState<"sunny" | "ocean" | "forest">("sunny");
  const [posterLayout, setPosterLayout] = useState<"hero" | "split" | "neon">("hero");
  const [posterTypography, setPosterTypography] = useState<"modern" | "editorial" | "cyber">("modern");
  const [posterUiHierarchy, setPosterUiHierarchy] = useState<"minimal" | "cards" | "dark">("minimal");

  // =========================================================================
  // ACTIVITY 3: IDEAS & BUSINESS (Plan a Mini School Fair Stall)
  // =========================================================================
  const [stallItem, setStallItem] = useState<"cupcake" | "bookmark" | "lemonade">("cupcake");
  const [carnivalBundle, setCarnivalBundle] = useState<"books" | "combo" | "game">("combo");
  const [entrepreneurKit, setEntrepreneurKit] = useState<"starter" | "maker" | "digital">("starter");
  const [coopModel, setCoopModel] = useState<"bike" | "locker" | "evening">("bike");

  // =========================================================================
  // ACTIVITY 4: SCIENCE & NATURE (Help the Plant Grow)
  // =========================================================================
  const [plantAction, setPlantAction] = useState<"sun" | "water" | "bee">("sun");
  const [lightSpectrum, setLightSpectrum] = useState<"sunlight" | "led" | "shade">("sunlight");
  const [cropConservation, setCropConservation] = useState<"mulch" | "drip" | "biochar">("mulch");
  const [bioreactorMedium, setBioreactorMedium] = useState<"nitrogen" | "saline" | "circular">("nitrogen");

  // =========================================================================
  // ACTIVITY 5: PEOPLE & COMMUNITY (Make Our Playground Better)
  // =========================================================================
  const [playgroundUpgrade, setPlaygroundUpgrade] = useState<"ramps" | "trees" | "chimes">("ramps");
  const [courtyardProject, setCourtyardProject] = useState<"bikes" | "waste" | "gazebo">("bikes");
  const [transitPriority, setTransitPriority] = useState<"crossings" | "shade" | "braille">("crossings");
  const [healthOutreach, setHealthOutreach] = useState<"van" | "pharmacy" | "school">("van");

  // =========================================================================
  // ACTIVITY 6: STILL EXPLORING (Pick Something New to Try)
  // =========================================================================
  const [selectedSparkCard, setSelectedSparkCard] = useState<string>("card-1");

  // Master Reset for Active Activity
  const handleResetCurrentActivity = () => {
    setShowHint(false);
    if (selectedInterest === "technology") {
      setTechRobotStep(null);
      setTechRoverRoute("ridge");
      setTechCampusDispatch("safety");
      setTechGridTarget("battery");
      handleResetTechHighway(58);
    } else if (selectedInterest === "creativity") {
      setPosterPalette("sunny");
      setPosterLayout("hero");
      setPosterTypography("modern");
      setPosterUiHierarchy("minimal");
    } else if (selectedInterest === "business") {
      setStallItem("cupcake");
      setCarnivalBundle("combo");
      setEntrepreneurKit("starter");
      setCoopModel("bike");
    } else if (selectedInterest === "science") {
      setPlantAction("sun");
      setLightSpectrum("sunlight");
      setCropConservation("mulch");
      setBioreactorMedium("nitrogen");
    } else if (selectedInterest === "social-impact") {
      setPlaygroundUpgrade("ramps");
      setCourtyardProject("bikes");
      setTransitPriority("crossings");
      setHealthOutreach("van");
    } else {
      setSelectedSparkCard("card-1");
    }
  };

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
      {/* Decorative Background Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#EDEAFF] rounded-full blur-3xl opacity-40 pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E0F7FA] rounded-full blur-3xl opacity-30 pointer-events-none translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* =========================================================================
            SECTION HEADER: Simplified & Student-Friendly Intro
           ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDEAFF] border border-[#DDD8FE] text-xs font-bold text-[#6757F5] mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>Interactive Discovery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            What are you{" "}
            <span className="bg-gradient-to-r from-[#6757F5] via-[#8B7FF8] to-[#35B8C5] bg-clip-text text-transparent">
              curious
            </span>{" "}
            about today?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Pick something that interests you, try a quick activity, and discover where your curiosity could lead.
          </p>
        </div>

        {/* =========================================================================
            STEP 1: Choose Your Learning Stage (6 Cohorts)
           ========================================================================= */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#6757F5] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                1
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#171A2B]">
                Choose Your Learning Stage
              </h3>
            </div>
            <span className="text-xs text-[#626987] font-medium hidden sm:inline">
              {selectedStage ? `Selected: ${currentStageData?.label}` : "Click your stage to begin · Or view sample below"}
            </span>
          </div>

          <div
            role="radiogroup"
            aria-label="Academic Cohort Selection"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3"
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
                  onClick={() => {
                    setSelectedStage(stage.id);
                    if (!selectedInterest) {
                      setSelectedInterest("technology");
                    }
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                    isSelected
                      ? "bg-[#6757F5] text-white border-[#5342E8] shadow-md shadow-[#6757F5]/25 scale-[1.02]"
                      : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:border-[#6757F5]/40 hover:bg-[#FAF8FF] hover:shadow-sm"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-white text-[#6757F5] flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}

                  <div className="mb-3">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-xl mb-2.5 transition-colors ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-white text-[#6757F5] border border-[#E8E6F3] group-hover:border-[#6757F5]/30 shadow-xs"
                      }`}
                    >
                      <StageIcon className="w-4 h-4" />
                    </span>

                    <h4 className="text-xs sm:text-sm font-bold leading-snug">
                      {stage.label}
                    </h4>

                    <p
                      className={`text-[11px] mt-0.5 font-medium ${
                        isSelected ? "text-white/80" : "text-[#626987]"
                      }`}
                    >
                      {stage.sublabel}
                    </p>
                  </div>

                  <div
                    className={`pt-2 border-t text-[10px] font-semibold flex items-center gap-1 ${
                      isSelected
                        ? "border-white/20 text-white/90"
                        : "border-[#E8E6F3] text-[#6757F5]"
                    }`}
                  >
                    <span>{stage.focusTone}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            STEP 2: Choose a Curiosity (6 Interests)
           ========================================================================= */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#6757F5] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                2
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#171A2B]">
                Choose a Curiosity
              </h3>
            </div>
            <span className="text-xs text-[#626987] font-medium hidden sm:inline">
              {selectedInterest
                ? `Selected: ${INTEREST_OPTIONS.find((i) => i.id === selectedInterest)?.label}`
                : "Choose a topic that sparks your interest · Unsure? Try “Still Exploring”"}
            </span>
          </div>

          <div
            role="radiogroup"
            aria-label="Student Curiosity Selection"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3"
          >
            {INTEREST_OPTIONS.map((interest) => {
              const isSelected = selectedInterest === interest.id;
              const InterestIcon = getInterestIcon(interest.id);

              return (
                <button
                  key={interest.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedInterest(interest.id)}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                    isSelected
                      ? "bg-[#171A2B] text-white border-[#171A2B] shadow-md shadow-[#171A2B]/20 scale-[1.02]"
                      : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:border-[#171A2B]/40 hover:bg-[#FAF8FF] hover:shadow-sm"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-xl transition-colors ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-white text-[#6757F5] border border-[#E8E6F3] group-hover:border-[#6757F5]/30 shadow-xs"
                        }`}
                      >
                        <InterestIcon className="w-4 h-4" />
                      </span>

                      {isSelected && (
                        <span className="text-[10px] uppercase font-bold text-emerald-400 bg-white/10 px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold leading-snug">
                      {interest.id === "technology"
                        ? "Technology & Making"
                        : interest.id === "creativity"
                        ? "Art & Creativity"
                        : interest.id === "business"
                        ? "Ideas & Business"
                        : interest.id === "science"
                        ? "Science & Nature"
                        : interest.id === "social-impact"
                        ? "People & Community"
                        : "Still Exploring"}
                    </h4>

                    {/* Dual sub-label for test accessibility & searchability */}
                    <span className="text-[10px] text-[#626987] block group-hover:text-[#31364F]">
                      {interest.label}
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
            STEP 3: Try a Mini Activity (Visual Mini-Activity Canvas)
           ========================================================================= */}
        {!selectedStage ? (
          // Neutral Welcome State for First-Time Visitors
          <div className="rounded-3xl bg-gradient-to-b from-[#FAF8FF] to-white border-2 border-[#DDD8FE] p-8 sm:p-12 text-center shadow-md shadow-[#6757F5]/5 animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center mx-auto mb-4 border border-[#DDD8FE] shadow-inner">
              <Sparkles className="w-7 h-7 animate-pulse text-[#6757F5]" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DDD8FE] text-xs font-semibold text-[#6757F5] mb-3">
              <span>Sample Exploration Preview</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] tracking-tight">
              Ready to explore your possibilities?
            </h3>

            <p className="mt-3 text-sm sm:text-base text-[#31364F] max-w-xl mx-auto leading-relaxed">
              Select your learning stage above (from Classes 4–7 through College &amp; Graduate) to unlock a friendly hands-on activity and tailored pathways. Or click below to try a sample preview.
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
                onClick={() => {
                  setSelectedStage("classes-11-12");
                  setSelectedInterest("technology");
                }}
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
                    {INTEREST_OPTIONS.find((i) => i.id === activeInterestKey)?.label}
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

            {/* Refined Activity Container: "Try a Mini Activity" */}
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
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-[#171A2B]">
                      Try a Mini Activity
                    </h4>
                    <p className="text-xs text-[#626987]">
                      A quick, fun way to discover something new.
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

                  <button
                    type="button"
                    onClick={handleResetCurrentActivity}
                    aria-label="Reset Challenge"
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#626987] hover:text-[#6757F5] bg-[#FAF9F6] border border-[#E8E6F3] rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Optional Hint Banner */}
              {showHint && (
                <div className="mt-4 p-3 rounded-xl bg-[#FFFBF0] border border-[#FDE68A] text-xs text-[#92400E] flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                  <p>
                    <strong>Helpful Hint:</strong> There is no test score or wrong choice here. Tap any option to see what happens and explore how different decisions create different results!
                  </p>
                </div>
              )}

              {/* ========================================================
                  ACTIVITY A: TECHNOLOGY & MAKING
                 ======================================================== */}
              {selectedInterest === "technology" && (
                <div className="mt-6 space-y-5">
                  {/* Foundation (Classes 4-7): Help the Robot Find Its Way */}
                  {cohortTier === "foundation" && (
                    <div className="space-y-4">
                      <div className="p-3 bg-[#FAF8FF] border border-[#DDD8FE] rounded-xl flex items-center justify-between">
                        <span className="text-xs font-bold text-[#171A2B]">
                          Help the Robot Find Its Way
                        </span>
                        <span className="text-[11px] text-[#6757F5] font-semibold">
                          Goal: Reach the School Library 📚
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Tap the direction that helps the robot reach its destination:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setTechRobotStep("library")}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            techRobotStep === "library"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-base">⬆️</span>
                            <strong className="text-xs sm:text-sm">Step Forward</strong>
                          </div>
                          <p className={`text-[11px] ${techRobotStep === "library" ? "text-white/80" : "text-[#626987]"}`}>
                            Walk straight past the math room directly to the door.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTechRobotStep("garden")}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            techRobotStep === "garden"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-base">🌿</span>
                            <strong className="text-xs sm:text-sm">Take Garden Path</strong>
                          </div>
                          <p className={`text-[11px] ${techRobotStep === "garden" ? "text-white/80" : "text-[#626987]"}`}>
                            Follow the flower beds and scenic walkway to the library.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTechRobotStep("rocket")}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            techRobotStep === "rocket"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-base">🚀</span>
                            <strong className="text-xs sm:text-sm">Rocket Hop</strong>
                          </div>
                          <p className={`text-[11px] ${techRobotStep === "rocket" ? "text-white/80" : "text-[#626987]"}`}>
                            A gentle booster hop right into the library study hall!
                          </p>
                        </button>
                      </div>

                      {/* Visual Robot Stage Display */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F7FF] border border-[#DDD8FE] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-[#DDD8FE] flex items-center justify-center text-[#6757F5] shadow-sm text-2xl">
                            🤖
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#6757F5] tracking-wider block">
                              Robot Beep-Boop
                            </span>
                            <strong className="text-xs sm:text-sm text-[#171A2B]">
                              {techRobotStep ? "Destination Reached! ✨" : "Waiting for your direction..."}
                            </strong>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${techRobotStep ? "bg-emerald-500" : "bg-[#DDD8FE]"}`} />
                          <span className={`w-8 h-1 rounded ${techRobotStep ? "bg-emerald-400" : "bg-gray-200"}`} />
                          <span className={`w-3 h-3 rounded-full ${techRobotStep ? "bg-emerald-500" : "bg-[#DDD8FE]"}`} />
                          <span className={`w-8 h-1 rounded ${techRobotStep ? "bg-emerald-400" : "bg-gray-200"}`} />
                          <span className="text-xl">📚</span>
                        </div>
                      </div>

                      {techRobotStep && (
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 animate-fadeIn">
                          <p className="font-semibold">
                            You helped the robot follow instructions. That&apos;s how simple step-by-step systems begin.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Exploration Junior (Classes 8-10): Guide the Mars Rover */}
                  {cohortTier === "exploration-junior" && (
                    <div className="space-y-4">
                      <div className="p-3 bg-[#FAF8FF] border border-[#DDD8FE] rounded-xl flex items-center justify-between">
                        <span className="text-xs font-bold text-[#171A2B]">
                          Guide the Mars Rover
                        </span>
                        <span className="text-[11px] text-[#6757F5] font-semibold">
                          Goal: Reach Mineral Analysis Station
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Choose the safest route for the rover across the Martian ridge:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { id: "ridge", title: "Smooth Ridge Route 🧭", desc: "Avoids boulder craters with steady speed." },
                          { id: "canyon", title: "Direct Canyon Cut ⚡", desc: "Shortest distance with steeper slope." },
                          { id: "sensor", title: "Sensor Scan Route 📡", desc: "Collects surface telemetry along the way." },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setTechRoverRoute(opt.id as "ridge" | "canyon" | "sensor")}
                            className={`p-3.5 rounded-xl border text-left transition-all ${
                              techRoverRoute === opt.id
                                ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                                : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                            }`}
                          >
                            <strong className="text-xs sm:text-sm block mb-1">{opt.title}</strong>
                            <p className={`text-[11px] ${techRoverRoute === opt.id ? "text-white/80" : "text-[#626987]"}`}>
                              {opt.desc}
                            </p>
                          </button>
                        ))}
                      </div>

                      {techRoverRoute && (
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 animate-fadeIn">
                          <p className="font-semibold">
                            Path planning algorithms let exploration rovers make safe navigation decisions millions of miles away!
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Exploration Senior (Classes 11-12): Smart Campus Route Delivery */}
                  {cohortTier === "exploration-senior" && (
                    <div className="space-y-4">
                      <div className="p-3 bg-[#FAF8FF] border border-[#DDD8FE] rounded-xl flex items-center justify-between">
                        <span className="text-xs font-bold text-[#171A2B]">
                          Smart Campus Route Delivery
                        </span>
                        <span className="text-[11px] text-[#6757F5] font-semibold">
                          Autonomous Systems & Constraint Optimization
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Select the route priority to deliver lab equipment across campus:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setTechCampusDispatch("safety")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            techCampusDispatch === "safety"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <ShieldCheck className="w-4 h-4 text-emerald-300" />
                            <strong className="text-xs sm:text-sm">Pedestrian Safety</strong>
                          </div>
                          <p className={`text-[11px] ${techCampusDispatch === "safety" ? "text-white/80" : "text-[#626987]"}`}>
                            Avoids crowded central corridors, zero crowd conflict.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTechCampusDispatch("speed")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            techCampusDispatch === "speed"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <Clock className="w-4 h-4 text-amber-300" />
                            <strong className="text-xs sm:text-sm">Shortest Transit Time</strong>
                          </div>
                          <p className={`text-[11px] ${techCampusDispatch === "speed" ? "text-white/80" : "text-[#626987]"}`}>
                            Direct perimeter road, fastest delivery window.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTechCampusDispatch("battery")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            techCampusDispatch === "battery"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <Sparkles className="w-4 h-4 text-cyan-300" />
                            <strong className="text-xs sm:text-sm">Eco-Battery Saver</strong>
                          </div>
                          <p className={`text-[11px] ${techCampusDispatch === "battery" ? "text-white/80" : "text-[#626987]"}`}>
                            Uses gentle inclines to conserve motor battery.
                          </p>
                        </button>
                      </div>

                      {techCampusDispatch && (
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 animate-fadeIn">
                          <p className="font-semibold">
                            Autonomous systems balance multiple constraints like safety, speed, and battery. That&apos;s foundational systems design!
                          </p>
                        </div>
                      )}

                      {/* Optional Algorithmic View Toggle */}
                      <div className="pt-2 border-t border-[#F0EEF8]">
                        <button
                          type="button"
                          onClick={() => setShowAlgorithmicHighway(!showAlgorithmicHighway)}
                          className="text-xs font-semibold text-[#6757F5] hover:text-[#5342E8] underline inline-flex items-center gap-1"
                        >
                          <span>{showAlgorithmicHighway ? "Hide Algorithmic Highway" : "Curious about search algorithms? Open Algorithmic Data Highway (Target #58)"}</span>
                        </button>

                        {showAlgorithmicHighway && (
                          <div className="mt-3 p-4 rounded-xl bg-[#FAF9F6] border border-[#DDD8FE] space-y-3 animate-fadeIn">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-[#171A2B]">Mission: Find Target #58</span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleResetTechHighway(58)}
                                  className="px-2 py-0.5 rounded text-[11px] bg-white border border-[#E8E6F3] font-semibold"
                                >
                                  Target #58
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleResetTechHighway(techTarget)}
                                  aria-label="Reset Challenge"
                                  className="p-1 rounded bg-white border border-[#E8E6F3]"
                                >
                                  <RotateCcw className="w-3 h-3 text-[#626987]" />
                                </button>
                              </div>
                            </div>

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
                                    className={`p-2.5 rounded-xl border text-center font-mono text-xs font-bold transition-all ${
                                      isMatch
                                        ? "bg-emerald-500 text-white border-emerald-600 shadow-sm"
                                        : isChecked
                                        ? "bg-[#6757F5] text-white"
                                        : isEliminated
                                        ? "bg-gray-100 text-gray-400 opacity-40 line-through"
                                        : "bg-white text-[#171A2B] border-[#E8E6F3] hover:border-[#6757F5]"
                                    }`}
                                  >
                                    <span className="text-[9px] block opacity-70">Node {idx + 1}</span>
                                    <span>#{val}</span>
                                  </button>
                                );
                              })}
                            </div>
                            <p className="text-[11px] text-[#31364F]">{techFeedback}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Applied (Diploma, Degree, Graduate): Smart Grid Power Router */}
                  {cohortTier === "applied" && (
                    <div className="space-y-4">
                      <div className="p-3 bg-[#FAF8FF] border border-[#DDD8FE] rounded-xl flex items-center justify-between">
                        <span className="text-xs font-bold text-[#171A2B]">
                          Smart Grid Power Router
                        </span>
                        <span className="text-[11px] text-[#6757F5] font-semibold">
                          Micro-Grid Peak Load Optimization
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Choose where to route excess solar energy during peak afternoon hours:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setTechGridTarget("battery")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            techGridTarget === "battery"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="text-xs sm:text-sm block mb-1">Battery Storage Bank 🔋</strong>
                          <p className={`text-[11px] ${techGridTarget === "battery" ? "text-white/80" : "text-[#626987]"}`}>
                            Stores clean surplus power for evening peak demand.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTechGridTarget("compute")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            techGridTarget === "compute"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="text-xs sm:text-sm block mb-1">Research Computing Lab 💻</strong>
                          <p className={`text-[11px] ${techGridTarget === "compute" ? "text-white/80" : "text-[#626987]"}`}>
                            Powers high-throughput computing without fossil grid draw.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTechGridTarget("ev")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            techGridTarget === "ev"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="text-xs sm:text-sm block mb-1">Campus EV Charging Hub ⚡</strong>
                          <p className={`text-[11px] ${techGridTarget === "ev" ? "text-white/80" : "text-[#626987]"}`}>
                            Recharges electric student transit shuttles for zero emissions.
                          </p>
                        </button>
                      </div>

                      {techGridTarget && (
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 animate-fadeIn">
                          <p className="font-semibold">
                            Dynamic load balancing keeps modern electrical systems stable, clean, and sustainable.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================
                  ACTIVITY B: ART & CREATIVITY (Make Your Poster Pop!)
                 ======================================================== */}
              {selectedInterest === "creativity" && (
                <div className="mt-6 space-y-5">
                  <div className="p-3 bg-[#FAF8FF] border border-[#DDD8FE] rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold text-[#171A2B]">
                      Make Your Poster Pop!
                    </span>
                    <span className="text-[11px] text-[#6757F5] font-semibold">
                      Visual Communication & Mood
                    </span>
                  </div>

                  {cohortTier === "foundation" && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Choose a colour theme to make your festival poster pop!
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setPosterPalette("sunny")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            posterPalette === "sunny"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Sunny Yellow & Purple 🎨</strong>
                          <span className={posterPalette === "sunny" ? "text-white/80" : "text-[#626987]"}>
                            Cheerful, playful and high-energy vibe.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPosterPalette("ocean")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            posterPalette === "ocean"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Ocean Cyan & Coral 🌊</strong>
                          <span className={posterPalette === "ocean" ? "text-white/80" : "text-[#626987]"}>
                            Fresh, modern and lively vibe.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPosterPalette("forest")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            posterPalette === "forest"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Forest Green & Gold 🌿</strong>
                          <span className={posterPalette === "forest" ? "text-white/80" : "text-[#626987]"}>
                            Nature-inspired and warm creative vibe.
                          </span>
                        </button>
                      </div>

                      {/* Live Canvas Poster Preview */}
                      <div
                        className={`p-6 rounded-2xl border transition-all duration-300 text-center ${
                          posterPalette === "sunny"
                            ? "bg-gradient-to-br from-amber-100 via-purple-50 to-pink-50 border-purple-300 text-[#171A2B]"
                            : posterPalette === "ocean"
                            ? "bg-gradient-to-br from-cyan-100 via-sky-50 to-rose-50 border-cyan-300 text-[#171A2B]"
                            : "bg-gradient-to-br from-emerald-100 via-teal-50 to-amber-50 border-emerald-300 text-[#171A2B]"
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/70 shadow-xs">
                          Live Event Poster
                        </span>
                        <h4 className="text-xl sm:text-2xl font-black mt-2 text-[#171A2B]">
                          ART & FUN FAIR
                        </h4>
                        <p className="text-xs text-[#31364F] mt-1">
                          Explore painting, sculpture, pottery & digital stories!
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <p className="font-semibold">
                          Colours instantly set an emotion! Bright contrasting colours grab attention from across the hallway.
                        </p>
                      </div>
                    </div>
                  )}

                  {cohortTier === "exploration-junior" && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Choose a layout style that makes the headline easiest to spot:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setPosterLayout("hero")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            posterLayout === "hero"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Bold Center Hero 🌟</strong>
                          <span className={posterLayout === "hero" ? "text-white/80" : "text-[#626987]"}>
                            Headline takes center stage for maximum impact.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPosterLayout("split")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            posterLayout === "split"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Dynamic Split Grid 📐</strong>
                          <span className={posterLayout === "split" ? "text-white/80" : "text-[#626987]"}>
                            Artwork on left, event details clearly on the right.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPosterLayout("neon")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            posterLayout === "neon"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Framed Border Glow ✨</strong>
                          <span className={posterLayout === "neon" ? "text-white/80" : "text-[#626987]"}>
                            Vibrant border draws the eye inward.
                          </span>
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <p className="font-semibold">
                          Layout guides where people look first. Designers call this visual focal point!
                        </p>
                      </div>
                    </div>
                  )}

                  {cohortTier === "exploration-senior" && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Choose the typography pairing and contrast that communicates your event&apos;s story:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setPosterTypography("modern")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            posterTypography === "modern"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Modern Sans-Serif 🖋️</strong>
                          <span className={posterTypography === "modern" ? "text-white/80" : "text-[#626987]"}>
                            Clean, airy, geometric design for contemporary events.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPosterTypography("editorial")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            posterTypography === "editorial"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Cinematic Serif 🎬</strong>
                          <span className={posterTypography === "editorial" ? "text-white/80" : "text-[#626987]"}>
                            Warm editorial style with bold contrast and drama.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPosterTypography("cyber")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            posterTypography === "cyber"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Cyber Neon Mono ⚡</strong>
                          <span className={posterTypography === "cyber" ? "text-white/80" : "text-[#626987]"}>
                            Electric digital aesthetic with high energy.
                          </span>
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <p className="font-semibold">
                          Typography sets brand voice before a visitor even reads the words. Great design pairs feeling with function.
                        </p>
                      </div>
                    </div>
                  )}

                  {cohortTier === "applied" && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Choose the visual hierarchy that highlights the call-to-action button:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setPosterUiHierarchy("minimal")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            posterUiHierarchy === "minimal"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">High-Contrast Minimal 🎯</strong>
                          <span className={posterUiHierarchy === "minimal" ? "text-white/80" : "text-[#626987]"}>
                            Zero distraction, pure focus on primary action.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPosterUiHierarchy("cards")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            posterUiHierarchy === "cards"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Elevated Card Depth 🗂️</strong>
                          <span className={posterUiHierarchy === "cards" ? "text-white/80" : "text-[#626987]"}>
                            Layered cards and soft shadows for tactile feel.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPosterUiHierarchy("dark")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            posterUiHierarchy === "dark"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Dark-Mode Accent 🌙</strong>
                          <span className={posterUiHierarchy === "dark" ? "text-white/80" : "text-[#626987]"}>
                            Electric Iris purple contrast against dark slate.
                          </span>
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <p className="font-semibold">
                          Clear UI hierarchy reduces cognitive load, helping users accomplish their goals seamlessly.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================
                  ACTIVITY C: IDEAS & BUSINESS (Plan a Mini School Fair Stall)
                 ======================================================== */}
              {selectedInterest === "business" && (
                <div className="mt-6 space-y-5">
                  <div className="p-3 bg-[#FAF8FF] border border-[#DDD8FE] rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold text-[#171A2B]">
                      Plan a Mini School Fair Stall
                    </span>
                    <span className="text-[11px] text-[#6757F5] font-semibold">
                      Value Creation & Customer Joy
                    </span>
                  </div>

                  {cohortTier === "foundation" && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Pick an item to make and share with your school friends:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setStallItem("cupcake")}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            stallItem === "cupcake"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-xl">🧁</span>
                            <strong className="text-xs sm:text-sm">Homemade Cupcakes</strong>
                          </div>
                          <p className={`text-[11px] ${stallItem === "cupcake" ? "text-white/80" : "text-[#626987]"}`}>
                            Fresh fruit-topped cupcakes baked by student teams.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setStallItem("bookmark")}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            stallItem === "bookmark"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-xl">🎨</span>
                            <strong className="text-xs sm:text-sm">Handmade Bookmarks</strong>
                          </div>
                          <p className={`text-[11px] ${stallItem === "bookmark" ? "text-white/80" : "text-[#626987]"}`}>
                            Hand-painted recycled art bookmarks with inspiring quotes.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setStallItem("lemonade")}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            stallItem === "lemonade"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-xl">🍋</span>
                            <strong className="text-xs sm:text-sm">Iced Mint Lemonade</strong>
                          </div>
                          <p className={`text-[11px] ${stallItem === "lemonade" ? "text-white/80" : "text-[#626987]"}`}>
                            Cold refreshing drink perfect for a sunny afternoon crowd.
                          </p>
                        </button>
                      </div>

                      {/* Visual Stall Scene */}
                      <div className="p-5 rounded-2xl bg-[#FFFDF7] border border-[#FDE68A] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-2xl shadow-xs">
                            🎪
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider block">
                              Team Fair Stall
                            </span>
                            <strong className="text-xs sm:text-sm text-[#171A2B]">
                              {stallItem === "cupcake"
                                ? "Cupcake Bakery Stall Active! 🧁"
                                : stallItem === "bookmark"
                                ? "Handmade Craft Stall Active! 🎨"
                                : "Chilled Drink Stand Active! 🍋"}
                            </strong>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-[#626987] bg-white px-3 py-1.5 rounded-xl border border-[#E8E6F3]">
                          <span>Smiling visitors:</span>
                          <strong className="text-[#171A2B] font-bold">😊 😊 😊 😊</strong>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <p className="font-semibold">
                          Offering something people enjoy on a warm afternoon is the heart of every great idea!
                        </p>
                      </div>
                    </div>
                  )}

                  {cohortTier === "exploration-junior" && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Choose your stall&apos;s special bundle to raise funds for the school library:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setCarnivalBundle("books")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            carnivalBundle === "books"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Mystery Book Pouch (₹50) 📚</strong>
                          <span className={carnivalBundle === "books" ? "text-white/80" : "text-[#626987]"}>
                            Surprise donated novel wrapped in riddle clues.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setCarnivalBundle("combo")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            carnivalBundle === "combo"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Snack & Sticker Combo (₹80) 🥤</strong>
                          <span className={carnivalBundle === "combo" ? "text-white/80" : "text-[#626987]"}>
                            Healthy juice drink paired with student stickers.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setCarnivalBundle("game")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            carnivalBundle === "game"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Mini Ring Toss Game (₹30) 🎯</strong>
                          <span className={carnivalBundle === "game" ? "text-white/80" : "text-[#626987]"}>
                            3 ring tosses to win handmade clay keychains.
                          </span>
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <p className="font-semibold">
                          Bundles make it fun and easy for people to support a cause. Businesses call this creating customer value!
                        </p>
                      </div>
                    </div>
                  )}

                  {cohortTier === "exploration-senior" && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Choose your pricing and packaging strategy for student project kits:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setEntrepreneurKit("starter")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            entrepreneurKit === "starter"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Starter Maker Kit 📦</strong>
                          <span className={entrepreneurKit === "starter" ? "text-white/80" : "text-[#626987]"}>
                            Budget-friendly core parts for maximum student reach.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setEntrepreneurKit("maker")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            entrepreneurKit === "maker"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Complete Explorer Box 🎁</strong>
                          <span className={entrepreneurKit === "maker" ? "text-white/80" : "text-[#626987]"}>
                            Includes bonus video guide, extra parts & stickers.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setEntrepreneurKit("digital")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            entrepreneurKit === "digital"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Digital Workshop Pass 💡</strong>
                          <span className={entrepreneurKit === "digital" ? "text-white/80" : "text-[#626987]"}>
                            Zero physical materials cost, unlimited virtual access.
                          </span>
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <p className="font-semibold">
                          Matching price to what students value most helps projects stay sustainable while serving the community.
                        </p>
                      </div>
                    </div>
                  )}

                  {cohortTier === "applied" && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Choose the operating model for a student-run delivery pilot:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setCoopModel("bike")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            coopModel === "bike"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">On-Demand Bicycle Fleet 🚲</strong>
                          <span className={coopModel === "bike" ? "text-white/80" : "text-[#626987]"}>
                            High agility, minimal fixed infrastructure, flexible schedule.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setCoopModel("locker")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            coopModel === "locker"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Campus Smart Lockers 📦</strong>
                          <span className={coopModel === "locker" ? "text-white/80" : "text-[#626987]"}>
                            Secure automated 24/7 pickup, low recurring labor.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setCoopModel("evening")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            coopModel === "evening"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Scheduled Evening Drops 🕒</strong>
                          <span className={coopModel === "evening" ? "text-white/80" : "text-[#626987]"}>
                            Predictable consolidated routes, maximum vehicle capacity.
                          </span>
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <p className="font-semibold">
                          Evaluating trade-offs between fixed infrastructure and variable effort is the first step in designing any viable venture.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================
                  ACTIVITY D: SCIENCE & NATURE (Help the Plant Grow)
                 ======================================================== */}
              {selectedInterest === "science" && (
                <div className="mt-6 space-y-5">
                  <div className="p-3 bg-[#FAF8FF] border border-[#DDD8FE] rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold text-[#171A2B]">
                      Help the Plant Grow
                    </span>
                    <span className="text-[11px] text-[#6757F5] font-semibold">
                      Plant Biology & Photosynthesis
                    </span>
                  </div>

                  {cohortTier === "foundation" && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Choose what your plant needs to grow:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setPlantAction("sun")}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            plantAction === "sun"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <Sun className="w-5 h-5 text-amber-300" />
                            <strong className="text-xs sm:text-sm">Give Gentle Sunlight</strong>
                          </div>
                          <p className={`text-[11px] ${plantAction === "sun" ? "text-white/80" : "text-[#626987]"}`}>
                            Warm solar rays help green leaves turn light into plant food.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPlantAction("water")}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            plantAction === "water"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <Droplets className="w-5 h-5 text-cyan-300" />
                            <strong className="text-xs sm:text-sm">Give Fresh Water</strong>
                          </div>
                          <p className={`text-[11px] ${plantAction === "water" ? "text-white/80" : "text-[#626987]"}`}>
                            Moist soil carries nutrients from root tips to the stems.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPlantAction("bee")}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            plantAction === "bee"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-xl">🐝</span>
                            <strong className="text-xs sm:text-sm">Invite a Friendly Bee</strong>
                          </div>
                          <p className={`text-[11px] ${plantAction === "bee" ? "text-white/80" : "text-[#626987]"}`}>
                            Pollinators help flowers blossom and produce healthy seeds!
                          </p>
                        </button>
                      </div>

                      {/* Illustrated Plant Growth Canvas */}
                      <div className="p-6 rounded-2xl bg-gradient-to-b from-[#F0FDF4] to-[#E8F5E9] border border-[#C8E6C9] flex flex-col items-center justify-center text-center">
                        <div className="text-5xl sm:text-6xl mb-2 animate-bounce">
                          {plantAction === "sun" ? "🌻" : plantAction === "water" ? "🌱" : "🌸"}
                        </div>
                        <strong className="text-sm font-bold text-emerald-950">
                          {plantAction === "sun"
                            ? "Warm Sunbeams Active — Leaves Glowing Emerald! ☀️"
                            : plantAction === "water"
                            ? "Raindrops Absorbed — Sprout Growing Tall! 💧"
                            : "Bee Visiting — Flower in Full Bloom! 🐝"}
                        </strong>
                        <span className="text-xs text-emerald-800 mt-1">
                          Photosynthesis & Root Health in Natural Balance
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <p className="font-semibold">
                          With water and sunlight, leaves make their own food through photosynthesis. Nature&apos;s little solar panels!
                        </p>
                      </div>
                    </div>
                  )}

                  {cohortTier === "exploration-junior" && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Adjust the light spectrum to see how the greenhouse plant responds:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setLightSpectrum("sunlight")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            lightSpectrum === "sunlight"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Natural Daylight ☀️</strong>
                          <span className={lightSpectrum === "sunlight" ? "text-white/80" : "text-[#626987]"}>
                            Balanced leaf and sturdy stem development.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setLightSpectrum("led")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            lightSpectrum === "led"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Red & Blue LED Mix 🔴</strong>
                          <span className={lightSpectrum === "led" ? "text-white/80" : "text-[#626987]"}>
                            Boosts chlorophyll activation and flowering rate.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setLightSpectrum("shade")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            lightSpectrum === "shade"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Low Ambient Shade ⛅</strong>
                          <span className={lightSpectrum === "shade" ? "text-white/80" : "text-[#626987]"}>
                            Stems stretch taller searching for available light.
                          </span>
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <p className="font-semibold">
                          Plants absorb specific wavelengths of light — red light triggers flowering, while blue light strengthens leaves!
                        </p>
                      </div>
                    </div>
                  )}

                  {cohortTier === "exploration-senior" && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Choose a soil conservation method to protect crops during dry weather:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setCropConservation("mulch")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            cropConservation === "mulch"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Organic Straw Mulch 🌾</strong>
                          <span className={cropConservation === "mulch" ? "text-white/80" : "text-[#626987]"}>
                            Shields soil from surface evaporation, keeping roots cool.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setCropConservation("drip")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            cropConservation === "drip"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Targeted Drip Irrigation 💧</strong>
                          <span className={cropConservation === "drip" ? "text-white/80" : "text-[#626987]"}>
                            Delivers water right to roots with zero evaporation waste.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setCropConservation("biochar")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            cropConservation === "biochar"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Biochar Compost 🪱</strong>
                          <span className={cropConservation === "biochar" ? "text-white/80" : "text-[#626987]"}>
                            Enriches beneficial soil microbes and natural water holding.
                          </span>
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <p className="font-semibold">
                          Soil moisture management and root microbiomes help crops thrive in changing climates. That&apos;s agricultural biotechnology!
                        </p>
                      </div>
                    </div>
                  )}

                  {cohortTier === "applied" && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Select the nutrient medium for a clean algae bio-energy culture:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setBioreactorMedium("nitrogen")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            bioreactorMedium === "nitrogen"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Balanced Nitrogen Mix 🧪</strong>
                          <span className={bioreactorMedium === "nitrogen" ? "text-white/80" : "text-[#626987]"}>
                            Accelerates green cellular biomass reproduction.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setBioreactorMedium("saline")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            bioreactorMedium === "saline"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Saline Mineral Broth 🌊</strong>
                          <span className={bioreactorMedium === "saline" ? "text-white/80" : "text-[#626987]"}>
                            Optimizes natural lipid synthesis for clean biofuel extraction.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setBioreactorMedium("circular")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            bioreactorMedium === "circular"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Recycled Nutrient Flow ♻️</strong>
                          <span className={bioreactorMedium === "circular" ? "text-white/80" : "text-[#626987]"}>
                            Closed-loop sustainable culture with zero chemical waste.
                          </span>
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <p className="font-semibold">
                          Optimizing biochemical media balances yield with sustainability — essential in modern biotechnology and clean energy.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================
                  ACTIVITY E: PEOPLE & COMMUNITY (Make Our Playground Better)
                 ======================================================== */}
              {selectedInterest === "social-impact" && (
                <div className="mt-6 space-y-5">
                  <div className="p-3 bg-[#FAF8FF] border border-[#DDD8FE] rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold text-[#171A2B]">
                      Make Our Playground Better
                    </span>
                    <span className="text-[11px] text-[#6757F5] font-semibold">
                      Accessible Design & Community Caring
                    </span>
                  </div>

                  {cohortTier === "foundation" && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Choose one change that could help more people enjoy this space:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setPlaygroundUpgrade("ramps")}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            playgroundUpgrade === "ramps"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-xl">🦽</span>
                            <strong className="text-xs sm:text-sm">Wheelchair Ramps</strong>
                          </div>
                          <p className={`text-[11px] ${playgroundUpgrade === "ramps" ? "text-white/80" : "text-[#626987]"}`}>
                            Smooth ramps connect play zones so all friends can join in.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPlaygroundUpgrade("trees")}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            playgroundUpgrade === "trees"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <TreePine className="w-5 h-5 text-emerald-300" />
                            <strong className="text-xs sm:text-sm">Shaded Tree Benches</strong>
                          </div>
                          <p className={`text-[11px] ${playgroundUpgrade === "trees" ? "text-white/80" : "text-[#626987]"}`}>
                            Cool shady spot for grandparents, parents, and resting kids.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPlaygroundUpgrade("chimes")}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            playgroundUpgrade === "chimes"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <Volume2 className="w-5 h-5 text-cyan-300" />
                            <strong className="text-xs sm:text-sm">Sensory Chime Wall</strong>
                          </div>
                          <p className={`text-[11px] ${playgroundUpgrade === "chimes" ? "text-white/80" : "text-[#626987]"}`}>
                            Outdoor xylophone chimes offering musical fun for all senses.
                          </p>
                        </button>
                      </div>

                      {/* Illustrated Public Park Scene */}
                      <div className="p-5 rounded-2xl bg-[#F0FDF9] border border-[#CCFBF1] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-teal-100 border border-teal-200 flex items-center justify-center text-2xl shadow-xs">
                            🏞️
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-teal-800 tracking-wider block">
                              Inclusive Community Park
                            </span>
                            <strong className="text-xs sm:text-sm text-[#171A2B]">
                              {playgroundUpgrade === "ramps"
                                ? "Wheelchair Access Connected Across Swings & Slides!"
                                : playgroundUpgrade === "trees"
                                ? "Cool Canopy Shading Park Benches & Walking Paths!"
                                : "Sensory Chime Wall Ringing Cheerful Notes!"}
                            </strong>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-white px-3 py-1.5 rounded-xl border border-teal-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                          <span>Welcoming to Everyone</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <p className="font-semibold">
                          When we design spaces for everyone, including friends who use wheelchairs or get tired in the heat, the whole community becomes happier!
                        </p>
                      </div>
                    </div>
                  )}

                  {cohortTier === "exploration-junior" && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Choose a community improvement for the school common area:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setCourtyardProject("bikes")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            courtyardProject === "bikes"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Safe Bicycle Shelters 🚲</strong>
                          <span className={courtyardProject === "bikes" ? "text-white/80" : "text-[#626987]"}>
                            Encourages active and clean cycling to school.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setCourtyardProject("waste")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            courtyardProject === "waste"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Zero-Waste Sorting Hub ♻️</strong>
                          <span className={courtyardProject === "waste" ? "text-white/80" : "text-[#626987]"}>
                            Clear campus recycling and compost sorting stations.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setCourtyardProject("gazebo")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            courtyardProject === "gazebo"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Outdoor Reading Gazebo 📖</strong>
                          <span className={courtyardProject === "gazebo" ? "text-white/80" : "text-[#626987]"}>
                            Shaded open-air spot for student book clubs and quiet study.
                          </span>
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <p className="font-semibold">
                          Small community improvements encourage healthy habits and make school spaces welcoming for everyone.
                        </p>
                      </div>
                    </div>
                  )}

                  {cohortTier === "exploration-senior" && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Choose an urban design priority for the local transit hub:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setTransitPriority("crossings")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            transitPriority === "crossings"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Protected Crossings 🚶</strong>
                          <span className={transitPriority === "crossings" ? "text-white/80" : "text-[#626987]"}>
                            Raised pedestrian islands and high-visibility zebra lights.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTransitPriority("shade")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            transitPriority === "shade"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Solar Shade Canopies ☀️</strong>
                          <span className={transitPriority === "shade" ? "text-white/80" : "text-[#626987]"}>
                            Cool waiting shelters with solar evening illumination.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTransitPriority("braille")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            transitPriority === "braille"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Braille & Audio Wayfinding 🔊</strong>
                          <span className={transitPriority === "braille" ? "text-white/80" : "text-[#626987]"}>
                            Audio transit announcements and tactile paving for visually impaired riders.
                          </span>
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <p className="font-semibold">
                          Urban planning balances safety, equity, and accessibility so towns work for every citizen.
                        </p>
                      </div>
                    </div>
                  )}

                  {cohortTier === "applied" && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                        Choose an outreach model to deliver healthcare checkups to rural areas:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setHealthOutreach("van")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            healthOutreach === "van"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Mobile Health Vans 🚐</strong>
                          <span className={healthOutreach === "van" ? "text-white/80" : "text-[#626987]"}>
                            Direct home visits and portable diagnostic testing kits.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setHealthOutreach("pharmacy")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            healthOutreach === "pharmacy"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">Pharmacy Wellness Days 🏥</strong>
                          <span className={healthOutreach === "pharmacy" ? "text-white/80" : "text-[#626987]"}>
                            Partnering with local village shops for scheduled health screenings.
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setHealthOutreach("school")}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            healthOutreach === "school"
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <strong className="block text-sm mb-1">School Weekend Clinics 🏫</strong>
                          <span className={healthOutreach === "school" ? "text-white/80" : "text-[#626987]"}>
                            Using familiar community buildings for family health days.
                          </span>
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <p className="font-semibold">
                          Designing public health distribution requires understanding local transport, trust, and community hubs.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================
                  ACTIVITY F: STILL EXPLORING (Pick Something New to Try)
                 ======================================================== */}
              {selectedInterest === "still-exploring" && (
                <div className="mt-6 space-y-5">
                  <div className="p-3 bg-[#FAF8FF] border border-[#DDD8FE] rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold text-[#171A2B]">
                      Pick Something New to Try
                    </span>
                    <span className="text-[11px] text-[#6757F5] font-semibold">
                      Exploration with Zero Pressure
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-[#171A2B]">
                    Choose one thing you&apos;d enjoy trying today:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        id: "card-1",
                        icon: "🤖",
                        title: "Build a Cardboard Bot",
                        desc: "Use cereal boxes, bottle caps, and foil to invent your companion!",
                      },
                      {
                        id: "card-2",
                        icon: "🎨",
                        title: "Draw a 3-Panel Comic",
                        desc: "Tell a funny mini-story about a pet or superhero with markers!",
                      },
                      {
                        id: "card-3",
                        icon: "🌿",
                        title: "Sprout a Seed in a Cup",
                        desc: "Watch green shoots appear on damp cotton in a sunny window!",
                      },
                      {
                        id: "card-4",
                        icon: "🧁",
                        title: "Bake Fun Treats",
                        desc: "Measure ingredients and bake delicious muffins with friends!",
                      },
                    ].map((card) => {
                      const isSelected = selectedSparkCard === card.id;
                      return (
                        <button
                          key={card.id}
                          type="button"
                          onClick={() => setSelectedSparkCard(card.id)}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? "bg-[#6757F5] text-white border-[#5342E8] shadow-sm scale-[1.02]"
                              : "bg-[#FAF9F6] border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                          }`}
                        >
                          <span className="text-2xl block mb-2">{card.icon}</span>
                          <strong className="text-xs sm:text-sm block mb-1">{card.title}</strong>
                          <p className={`text-[11px] leading-relaxed ${isSelected ? "text-white/80" : "text-[#626987]"}`}>
                            {card.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                    <p className="font-semibold">
                      Curiosity starts with trying things you enjoy. You don&apos;t have to pick just one thing — explorers try everything!
                    </p>
                  </div>
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
