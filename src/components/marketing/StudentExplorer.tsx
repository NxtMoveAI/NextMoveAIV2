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
} from "lucide-react";

export function StudentExplorer() {
  const [selectedStage, setSelectedStage] =
    useState<AcademicStageId>("classes-11-12");
  const [selectedInterest, setSelectedInterest] =
    useState<InterestId>("technology");
  const [activeTab, setActiveTab] = useState<
    "paths" | "activity" | "trial" | "next"
  >("activity");

  const currentStageData = ACADEMIC_STAGES.find((s) => s.id === selectedStage)!;
  const currentResult =
    EXPLORATION_MATRIX[selectedStage]?.[selectedInterest] ||
    EXPLORATION_MATRIX[selectedStage]["still-exploring"];

  // Mini-interaction state
  const availableActivities: InteractiveActivity[] =
    currentResult.interactiveActivities || [
      {
        id: "default-activity-1",
        title: currentResult.practicalTrial.title,
        duration: currentResult.practicalTrial.timeEstimate,
        tag: "Hands-on Starter",
        description: currentResult.practicalTrial.description,
        whatYouWillLearn: `You will test foundational concepts in ${INTEREST_OPTIONS.find((i) => i.id === selectedInterest)?.label} and discover if hands-on practice energizes you.`,
        clarifiesDecision: "Helps you know whether to invest time into this stream before committing to expensive courses.",
      },
      {
        id: "default-activity-2",
        title: `Compare Real-World Tools & Methods in ${INTEREST_OPTIONS.find((i) => i.id === selectedInterest)?.label}`,
        duration: "15 mins",
        tag: "Analytical Comparison",
        description: `Compare 2 different practical approaches used by practitioners in this domain.`,
        whatYouWillLearn: "You will understand the trade-offs between theory and real-world execution.",
        clarifiesDecision: "Clarifies which specialization or study structure fits your preferred learning style.",
      },
    ];

  const [selectedActivityId, setSelectedActivityId] = useState<string>(
    availableActivities[0].id
  );

  // When stage or interest changes, ensure selectedActivityId stays valid
  const activeActivity =
    availableActivities.find((a) => a.id === selectedActivityId) ||
    availableActivities[0];

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
            <span>Interactive Explorer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A2B] tracking-tight">
            Let’s discover what your next move could look like.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#31364F] leading-relaxed">
            Every student’s journey is different. Choose where you are today and
            explore what you could try next—without creating an account.
          </p>
        </div>

        {/* Step A: Academic Stage Selector */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#626987] flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#6757F5] text-white text-[11px] font-bold">
                1
              </span>
              Select Your Current Academic Stage
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

        {/* Step B: Interest Selector */}
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

        {/* Step C: Dynamic Journey Preview Card */}
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

            {/* Stage Change Notification */}
            <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E8E6F3] text-xs text-[#626987]">
              <div className="w-2 h-2 rounded-full bg-[#35B8C5] animate-ping" />
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
              <span>Mini Interactive Activity ({availableActivities.length})</span>
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
              <span>15-Min Micro-Trial Preview</span>
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

          {/* Tab 0: Interactive Mini Activity (Real frontend interactivity) */}
          {activeTab === "activity" && (
            <div
              id="panel-activity"
              role="tabpanel"
              aria-labelledby="tab-activity"
              className="mt-6 space-y-6 animate-fadeIn"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6757F5] block">
                    Select a starter micro-task to test:
                  </span>
                  <p className="text-xs text-[#626987]">
                    Choose one of the two activities below to see what you will immediately discover.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-[#35B8C5] bg-[#35B8C5]/10 px-2.5 py-1 rounded-lg border border-[#35B8C5]/20 self-start sm:self-auto">
                  Deterministic Interactive Task
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
                            {act.tag}
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
                          {isActSelected ? "Selected Activity" : "Click to Inspect"}
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
                    Immediate Learning & Decision Clarity
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

                <div className="mt-4 pt-4 border-t border-[#F0EEF8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <span className="text-[#626987]">
                    Estimated investment: <strong>{activeActivity.duration}</strong> · Low-stakes exploration
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab("trial")}
                    className="inline-flex items-center gap-1.5 font-bold text-[#6757F5] hover:text-[#5342E8]"
                  >
                    <span>View First Step Instructions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
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
                    Micro-Trial Preview
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
              href={`/onboarding?stage=${selectedStage}`}
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
