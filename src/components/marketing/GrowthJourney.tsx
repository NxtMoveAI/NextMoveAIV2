"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sprout,
} from "lucide-react";

interface GrowthStage {
  id: string;
  label: string;
  title: string;
  headline: string;
  story: string;
  gardenIllustration: {
    icon: string;
    stageLabel: string;
    visualElements: string[];
  };
  takeaway: string;
}

const GROWTH_STAGES: GrowthStage[] = [
  {
    id: "explore",
    label: "1. Explore",
    title: "A Seed of Curiosity",
    headline: "You discover an idea that catches your eye.",
    story:
      "Curiosity always begins with a single question. You don't need a life plan—just permission to wonder about how games are coded, why plants grow, or how stories are drawn.",
    gardenIllustration: {
      icon: "🌱",
      stageLabel: "Seed Sprout & Open Mind",
      visualElements: ["Magical Seed Sprout", "Question Marks & Books", "Gentle Raindrops"],
    },
    takeaway: "Every great journey starts by noticing what makes you smile.",
  },
  {
    id: "try",
    label: "2. Try",
    title: "Hands-On Experiments",
    headline: "You build a mini project and test what doing the work feels like.",
    story:
      "Instead of stressing over exams or future job titles, you spend 20 minutes building something tangible. You test cause-and-effect with your own hands.",
    gardenIllustration: {
      icon: "🌿",
      stageLabel: "Branching Stems & Project Tools",
      visualElements: ["Vibrant Green Leaves", "Pencils & Creative Blocks", "Trial Notebook"],
    },
    takeaway: "One small experiment teaches you more than weeks of guessing.",
  },
  {
    id: "reflect",
    label: "3. Reflect",
    title: "Understanding What You Enjoy",
    headline: "You reflect on what felt fun and what felt challenging.",
    story:
      "No grades, no percentiles, and no judgment. You simply note: Did I enjoy solving this puzzle? Would I do it again? What would I change next time?",
    gardenIllustration: {
      icon: "🌸",
      stageLabel: "Budding Blossom & Self-Insight",
      visualElements: ["Budding Flower", "Personal Reflection Notes", "Warm Sunlight"],
    },
    takeaway: "Reflecting on your own experiences turns practice into confidence.",
  },
  {
    id: "grow",
    label: "4. Grow",
    title: "An Expanding World",
    headline: "Your confidence expands, and you decide your next move on your own terms.",
    story:
      "Your interests branch into unexpected directions. You know what you enjoy, you have real project memories, and you choose your next learning step with clarity.",
    gardenIllustration: {
      icon: "🌻",
      stageLabel: "Living Garden in Full Bloom",
      visualElements: ["Blooming Sunflowers", "Branching Pathways", "Personal Growth Map"],
    },
    takeaway: "We don't decide careers; we enable clarity so you can grow your way.",
  },
];

export function GrowthJourney() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const stage = GROWTH_STAGES[activeStep];

  const handleNext = () => {
    setActiveStep((prev) => (prev < GROWTH_STAGES.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : GROWTH_STAGES.length - 1));
  };

  return (
    <section
      id="continuous-growth"
      className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE] shadow-xs">
            <Sprout className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>Continuous Growth</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Your curiosity{" "}
            <span className="bg-gradient-to-r from-[#6757F5] via-[#8B7FF8] to-[#35B8C5] bg-clip-text text-transparent">
              grows with you.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Your interests can change. Every experience helps you discover something new.
          </p>
        </div>

        {/* 4 Interactive Growth Steps: Explore -> Try -> Reflect -> Grow */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 overflow-x-auto pb-2">
          {GROWTH_STAGES.map((item, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? "bg-[#6757F5] text-white shadow-md shadow-[#6757F5]/20 scale-[1.02]"
                    : "bg-[#FAF9F6] text-[#31364F] hover:bg-[#EDEAFF] border border-[#E8E6F3]"
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* The Living Learning Garden Canvas */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#FAF9F6] border-2 border-[#DDD8FE] p-6 sm:p-8 lg:p-10 shadow-lg shadow-[#6757F5]/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Garden Illustration */}
            <div className="lg:col-span-6 p-8 rounded-2xl bg-gradient-to-b from-[#F0FDF4] via-white to-[#E8F5E9] border border-[#C8E6C9] flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="text-6xl sm:text-7xl mb-3 animate-bounce">
                {stage.gardenIllustration.icon}
              </div>

              <span className="text-[10px] uppercase font-bold tracking-wider text-[#047857] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0] mb-2">
                {stage.gardenIllustration.stageLabel}
              </span>

              <h4 className="text-base font-extrabold text-[#171A2B] mt-1">
                {stage.title}
              </h4>

              {/* Visual Element Badges */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
                {stage.gardenIllustration.visualElements.map((elem) => (
                  <span
                    key={elem}
                    className="text-[11px] font-semibold text-[#047857] bg-white px-2.5 py-0.5 rounded-lg border border-[#C8E6C9]"
                  >
                    {elem}
                  </span>
                ))}
              </div>
            </div>

            {/* Stage Description & Friendly Principle */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-bold text-[#6757F5] uppercase tracking-wider block mb-1">
                  Living Learning Garden · Step 0{activeStep + 1}
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] tracking-tight">
                  &ldquo;{stage.headline}&rdquo;
                </h3>

                <p className="mt-3 text-sm sm:text-base text-[#31364F] leading-relaxed">
                  {stage.story}
                </p>
              </div>

              {/* Principle Box */}
              <div className="p-4 rounded-xl bg-white border border-[#DDD8FE] text-xs text-[#171A2B] font-medium flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#6757F5] shrink-0 mt-0.5" />
                <p>
                  <strong>Growth Principle:</strong> {stage.takeaway}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous growth step"
                    className="p-2 rounded-xl bg-white border border-[#E8E6F3] text-[#626987] hover:text-[#6757F5] hover:border-[#DDD8FE]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next growth step"
                    className="p-2 rounded-xl bg-white border border-[#E8E6F3] text-[#626987] hover:text-[#6757F5] hover:border-[#DDD8FE]"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-[#626987] ml-2">
                    Step {activeStep + 1} of {GROWTH_STAGES.length}
                  </span>
                </div>

                <Link
                  href="/get-started/student"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] hover:text-[#5342E8]"
                >
                  <span>Start Growing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
