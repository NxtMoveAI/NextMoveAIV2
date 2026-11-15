"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface HowItWorksStage {
  step: string;
  title: string;
  question: string;
  shortDesc: string;
  activityTitle: string;
  activityDesc: string;
  actionText: string;
  actionHref: string;
  tagColor: string;
  themeColor: string;
}

const STAGES: HowItWorksStage[] = [
  {
    step: "01",
    title: "Discover",
    question: "What do you love exploring?",
    shortDesc:
      "Notice the ideas, topics, and everyday questions that naturally catch your attention. There are no right or wrong interests—just what makes you curious.",
    activityTitle: "Sample Discovery Spark",
    activityDesc:
      "Pick 3 things that sound fun today: building a robot, drawing a comic, or planting seeds in a cup.",
    actionText: "Explore an Interest",
    actionHref: "#explorer",
    tagColor: "bg-[#EDEAFF] text-[#6757F5] border-[#DDD8FE]",
    themeColor: "#6757F5",
  },
  {
    step: "02",
    title: "Explore",
    question: "See what else is possible.",
    shortDesc:
      "See how your natural interests connect to real projects, creative fields, and unexpected possibilities across technology, arts, science, and community.",
    activityTitle: "Sample Pathway View",
    activityDesc:
      "Discover 3 surprising ways drawing and digital tech meet: video game art, animation, and smartphone app design.",
    actionText: "Browse Pathways",
    actionHref: "#explorer",
    tagColor: "bg-[#E0F7FA] text-[#00838F] border-[#B2EBF2]",
    themeColor: "#00838F",
  },
  {
    step: "03",
    title: "Try",
    question: "Give something new a go!",
    shortDesc:
      "Try short, pressure-free mini activities to experience what doing the work actually feels like. No grades, no exams—just hands-on fun.",
    activityTitle: "Sample 15-Min Trial",
    activityDesc:
      "Test a 15-minute challenge: help an autonomous delivery bot navigate campus or tune an art festival poster.",
    actionText: "Try a Mini Activity",
    actionHref: "#explorer",
    tagColor: "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]",
    themeColor: "#B45309",
  },
  {
    step: "04",
    title: "Grow",
    question: "Take your next step, your way.",
    shortDesc:
      "Reflect on what felt exciting, keep track of what you learned, and shape your own path with clarity, confidence, and supportive mentors.",
    activityTitle: "Sample Reflection Map",
    activityDesc:
      "Save your project thoughts to your personal growth trail. Watch your possibilities expand as you try new things.",
    actionText: "Begin Your Journey",
    actionHref: "/get-started/student",
    tagColor: "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]",
    themeColor: "#047857",
  },
];

export function HowItWorks() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const stage = STAGES[activeStage];

  return (
    <section
      id="how-it-works"
      className="py-16 lg:py-24 bg-[#FAF9F6] border-y border-[#E8E6F3] relative overflow-hidden"
    >
      {/* Soft Ambient Background Highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#EDEAFF] via-[#E0F7FA] to-[#FAF8FF] rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDEAFF] border border-[#DDD8FE] text-xs font-bold text-[#6757F5] mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>How Next Move AI Works</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            A little curiosity can lead to{" "}
            <span className="bg-gradient-to-r from-[#6757F5] via-[#8B7FF8] to-[#35B8C5] bg-clip-text text-transparent">
              big discoveries.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Discover what you enjoy, try new things, and keep growing—one step at a time.
          </p>
        </div>

        {/* 4 Interactive Stage Selector Cards */}
        <div
          role="tablist"
          aria-label="How Next Move AI Works Stages"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8"
        >
          {STAGES.map((item, idx) => {
            const isSelected = activeStage === idx;
            return (
              <button
                key={item.title}
                type="button"
                role="tab"
                id={`how-it-works-tab-${idx}`}
                aria-selected={isSelected}
                aria-controls={`how-it-works-panel-${idx}`}
                onClick={() => setActiveStage(idx)}
                className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border text-left transition-all duration-200 relative flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                  isSelected
                    ? "bg-white border-[#6757F5] shadow-lg shadow-[#6757F5]/10 ring-2 ring-[#6757F5]/20 -translate-y-0.5"
                    : "bg-white/70 border-[#E8E6F3] hover:border-[#DDD8FE] hover:bg-white hover:shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span
                      className={`text-xs sm:text-sm font-black font-mono px-2 py-0.5 rounded-lg ${
                        isSelected
                          ? "bg-[#6757F5] text-white"
                          : "bg-[#F0EEF8] text-[#626987]"
                      }`}
                    >
                      {item.step}
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        isSelected ? "bg-[#35B8C5] ring-4 ring-[#E0F7FA]" : "bg-gray-200"
                      }`}
                    />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#171A2B] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#626987] mt-0.5 font-medium line-clamp-1">
                    {item.question}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[#F0EEF8] flex items-center justify-between text-[11px] font-semibold text-[#6757F5]">
                  <span>{isSelected ? "Active Step" : "Tap to See"}</span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? "translate-x-0.5 text-[#6757F5]" : "text-gray-400 group-hover:translate-x-0.5"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Experience Showcase */}
        <div
          id={`how-it-works-panel-${activeStage}`}
          role="tabpanel"
          aria-labelledby={`how-it-works-tab-${activeStage}`}
          className="rounded-3xl bg-white border-2 border-[#DDD8FE] p-6 sm:p-8 lg:p-10 shadow-sm transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Illustrated Scene for Current Stage */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#FAF8FF] via-white to-[#F0FDF4] rounded-2xl p-6 sm:p-8 border border-[#E8E6F3] flex flex-col items-center justify-center relative overflow-hidden min-h-[280px]">
              {/* Illustrated Scene based on stage */}
              {activeStage === 0 && (
                <div className="w-full flex flex-col items-center text-center animate-fadeIn">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-3xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center text-4xl shadow-inner border border-[#DDD8FE]">
                      🔍
                    </div>
                    <span className="absolute -top-2 -right-2 text-2xl animate-bounce">
                      ✨
                    </span>
                  </div>

                  <h4 className="text-lg font-extrabold text-[#171A2B]">
                    Discovering Your Sparks
                  </h4>
                  <p className="text-xs text-[#626987] mt-1 max-w-xs">
                    Curiosity is simple: notice what problems and stories you naturally enjoy exploring.
                  </p>

                  {/* Visual Sparks Badges */}
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E6F3] text-xs font-semibold text-[#171A2B] shadow-xs">
                      🎨 Creative Arts
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E6F3] text-xs font-semibold text-[#171A2B] shadow-xs">
                      🤖 Building Bots
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E6F3] text-xs font-semibold text-[#171A2B] shadow-xs">
                      🌿 Science & Nature
                    </span>
                  </div>
                </div>
              )}

              {activeStage === 1 && (
                <div className="w-full flex flex-col items-center text-center animate-fadeIn">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-3xl bg-[#E0F7FA] text-[#00838F] flex items-center justify-center text-4xl shadow-inner border border-[#B2EBF2]">
                      🧭
                    </div>
                    <span className="absolute -top-2 -right-2 text-2xl">
                      🌍
                    </span>
                  </div>

                  <h4 className="text-lg font-extrabold text-[#171A2B]">
                    Expanding Possibilities
                  </h4>
                  <p className="text-xs text-[#626987] mt-1 max-w-xs">
                    See how your favorite topics open real doors across education, technology, and society.
                  </p>

                  <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E6F3] text-xs font-semibold text-[#00838F] shadow-xs">
                      🎮 Game Animation
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E6F3] text-xs font-semibold text-[#00838F] shadow-xs">
                      ⚡ Solar Clean Tech
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E6F3] text-xs font-semibold text-[#00838F] shadow-xs">
                      📱 Interactive UI
                    </span>
                  </div>
                </div>
              )}

              {activeStage === 2 && (
                <div className="w-full flex flex-col items-center text-center animate-fadeIn">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-3xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center text-4xl shadow-inner border border-[#FDE68A]">
                      🛠️
                    </div>
                    <span className="absolute -top-2 -right-2 text-2xl animate-pulse">
                      ⚡
                    </span>
                  </div>

                  <h4 className="text-lg font-extrabold text-[#171A2B]">
                    Hands-On Mini Activities
                  </h4>
                  <p className="text-xs text-[#626987] mt-1 max-w-xs">
                    15-minute starter experiments that let you test an idea by doing, not just reading.
                  </p>

                  <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E6F3] text-xs font-semibold text-[#B45309] shadow-xs">
                      📦 Cardboard Bot Prototype
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E6F3] text-xs font-semibold text-[#B45309] shadow-xs">
                      🎨 Poster Layout Tuner
                    </span>
                  </div>
                </div>
              )}

              {activeStage === 3 && (
                <div className="w-full flex flex-col items-center text-center animate-fadeIn">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-3xl bg-[#ECFDF5] text-[#047857] flex items-center justify-center text-4xl shadow-inner border border-[#A7F3D0]">
                      🌱
                    </div>
                    <span className="absolute -top-2 -right-2 text-2xl">
                      🌟
                    </span>
                  </div>

                  <h4 className="text-lg font-extrabold text-[#171A2B]">
                    Your Expanding World
                  </h4>
                  <p className="text-xs text-[#626987] mt-1 max-w-xs">
                    Every small experiment adds clarity. You choose your next move with confidence.
                  </p>

                  <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E6F3] text-xs font-semibold text-[#047857] shadow-xs">
                      📝 Personal Reflection
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E6F3] text-xs font-semibold text-[#047857] shadow-xs">
                      🗺️ Growth Trail
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E6F3] text-xs font-semibold text-[#047857] shadow-xs">
                      🤝 Mentor Chats
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Explanation, Example Activity, and Next Action */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold border mb-2.5">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${stage.tagColor}`}>
                    Stage {stage.step}
                  </span>
                  <span className="text-[#171A2B] font-semibold">{stage.title}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] tracking-tight">
                  &ldquo;{stage.question}&rdquo;
                </h3>

                <p className="mt-3 text-sm sm:text-base text-[#31364F] leading-relaxed">
                  {stage.shortDesc}
                </p>
              </div>

              {/* Example Activity Card */}
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#6757F5] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{stage.activityTitle}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#171A2B] font-medium leading-relaxed">
                  {stage.activityDesc}
                </p>
              </div>

              {/* Primary Next Action */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={stage.actionHref}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#6757F5]/20 hover:shadow-lg transition-all active:scale-[0.98]"
                >
                  <span>{stage.actionText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <span className="text-xs text-[#626987]">
                  Step {stage.step} of 04 · Always under student control
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
