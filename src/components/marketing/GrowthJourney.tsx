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
  stageBadge: string;
  headline: string;
  story: string;
  takeaway: string;
}

const GROWTH_STAGES: GrowthStage[] = [
  {
    id: "explore",
    label: "1. Explore",
    stageBadge: "Stage 01 · Explore",
    headline: "A spark of curiosity begins your journey.",
    story:
      "You don't need a life plan today—just permission to wonder. When you notice what catches your attention (from drawing comics to coding games or exploring nature), curiosity takes its first step.",
    takeaway: "Every great journey starts by noticing what genuinely makes you smile.",
  },
  {
    id: "try",
    label: "2. Try",
    stageBadge: "Stage 02 · Try",
    headline: "You build a project and test the work with your hands.",
    story:
      "Instead of stressing over exams or distant career titles, you spend 15 minutes assembling a real project prototype. You experience what doing the work actually feels like.",
    takeaway: "One hands-on experiment gives more clarity than weeks of guessing.",
  },
  {
    id: "reflect",
    label: "3. Reflect",
    stageBadge: "Stage 03 · Reflect",
    headline: "You reflect on what felt exciting and what you'd change.",
    story:
      "No grades, no percentiles, and no judgment. You note your honest observations: What part felt fun? Where did I get stuck? What do I want to build next?",
    takeaway: "Reflecting on your own work transforms practice into genuine confidence.",
  },
  {
    id: "grow",
    label: "4. Grow",
    stageBadge: "Stage 04 · Grow",
    headline: "Your world expands, and you choose your next move.",
    story:
      "Your interests connect into multiple organic possibilities. Your journey is never locked into a single fixed track—you keep exploring, learning, and growing on your own terms.",
    takeaway: "We don't decide careers; we enable clarity so you can grow your way.",
  },
];

// Rich Illustrated World SVG for Continuous Growth
function GrowthWorldScene({ stepIndex }: { stepIndex: number }) {
  if (stepIndex === 0) {
    // 1. Explore: Student character with open notebook, curiosity sparks floating
    return (
      <svg
        viewBox="0 0 540 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[320px] select-none"
        aria-label="Student exploring curiosity sparks from an open notebook"
      >
        <defs>
          <linearGradient id="gw-bg-0" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF8FF" />
            <stop offset="50%" stopColor="#F5F3FF" />
            <stop offset="100%" stopColor="#EDE9FE" />
          </linearGradient>
          <filter id="gw-glow-0" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#6757F5" floodOpacity="0.15" />
          </filter>
        </defs>

        <rect width="540" height="360" rx="28" fill="url(#gw-bg-0)" />

        {/* Ambient Curiosity Halo */}
        <circle cx="270" cy="190" r="140" fill="#FFFFFF" fillOpacity="0.75" />

        {/* Floating Curiosity Sparks */}
        <g transform="translate(100, 75)" filter="url(#gw-glow-0)">
          <rect width="64" height="64" rx="18" fill="#FFFFFF" stroke="#DDD8FE" strokeWidth="2" />
          <circle cx="32" cy="32" r="20" fill="#EDEAFF" />
          <text x="21" y="40" fontSize="22">🎨</text>
        </g>

        <g transform="translate(380, 80)" filter="url(#gw-glow-0)">
          <rect width="64" height="64" rx="18" fill="#FFFFFF" stroke="#B2EBF2" strokeWidth="2" />
          <circle cx="32" cy="32" r="20" fill="#E0F7FA" />
          <text x="21" y="40" fontSize="22">🌿</text>
        </g>

        <g transform="translate(390, 205)" filter="url(#gw-glow-0)">
          <rect width="60" height="60" rx="16" fill="#FFFFFF" stroke="#FDE68A" strokeWidth="2" />
          <circle cx="30" cy="30" r="18" fill="#FEF3C7" />
          <text x="20" y="38" fontSize="20">🤖</text>
        </g>

        <g transform="translate(90, 210)" filter="url(#gw-glow-0)">
          <rect width="60" height="60" rx="16" fill="#FFFFFF" stroke="#DDD8FE" strokeWidth="2" />
          <circle cx="30" cy="30" r="18" fill="#FAF8FF" />
          <text x="20" y="38" fontSize="20">🪐</text>
        </g>

        {/* Connecting gentle curiosity streams */}
        <path d="M164 107 Q 220 120 250 170" stroke="#C4B5FD" strokeWidth="2" strokeDasharray="4 4" fill="none" />
        <path d="M380 112 Q 320 125 290 170" stroke="#80DEEA" strokeWidth="2" strokeDasharray="4 4" fill="none" />

        {/* Student sitting with open notebook */}
        <g transform="translate(200, 140)">
          {/* Torso */}
          <path d="M40 180 C 40 135, 65 115, 95 115 C 125 115, 150 135, 150 180 Z" fill="#6757F5" />
          <path d="M82 115 L 95 132 L 108 115 Z" fill="#FAF9F6" />
          <rect x="85" y="96" width="20" height="22" rx="4" fill="#C58C65" />
          <ellipse cx="95" cy="68" rx="34" ry="36" fill="#C58C65" />
          {/* Hair */}
          <path d="M61 64 C 61 34, 78 30, 95 30 C 112 30, 129 34, 129 64 C 125 56, 118 54, 112 54 C 104 54, 100 58, 95 58 C 90 58, 84 52, 76 54 C 68 56, 63 60, 61 64 Z" fill="#2D2327" />
          <circle cx="82" cy="68" r="3.5" fill="#1E171A" />
          <circle cx="83" cy="67" r="1.2" fill="#FFFFFF" />
          <circle cx="108" cy="68" r="3.5" fill="#1E171A" />
          <circle cx="109" cy="67" r="1.2" fill="#FFFFFF" />
          <circle cx="74" cy="74" r="4.5" fill="#F4A896" fillOpacity="0.5" />
          <circle cx="116" cy="74" r="4.5" fill="#F4A896" fillOpacity="0.5" />
          <path d="M87 81 Q 95 88 103 81" stroke="#1E171A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Glowing Open Curiosity Notebook */}
          <g transform="translate(60, 130)">
            <rect x="0" y="0" width="34" height="42" rx="5" fill="#FFFFFF" stroke="#DDD8FE" strokeWidth="2" />
            <rect x="34" y="0" width="34" height="42" rx="5" fill="#FAF9F6" stroke="#DDD8FE" strokeWidth="2" />
            <line x1="8" y1="12" x2="26" y2="12" stroke="#6757F5" strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="20" x2="22" y2="20" stroke="#35B8C5" strokeWidth="2" strokeLinecap="round" />
            <line x1="42" y1="12" x2="60" y2="12" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            <line x1="42" y1="20" x2="54" y2="20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            {/* Sparkle rising from book */}
            <circle cx="34" cy="-8" r="5" fill="#FBBF24" />
          </g>
        </g>
      </svg>
    );
  }

  if (stepIndex === 1) {
    // 2. Try: Student assembling maker project prototype on table
    return (
      <svg
        viewBox="0 0 540 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[320px] select-none"
        aria-label="Student trying a hands-on project experiment"
      >
        <defs>
          <linearGradient id="gw-bg-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="50%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#EDE9FE" />
          </linearGradient>
          <filter id="gw-glow-1" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#B45309" floodOpacity="0.15" />
          </filter>
        </defs>

        <rect width="540" height="360" rx="28" fill="url(#gw-bg-1)" />

        {/* Maker Table Surface */}
        <rect x="60" y="235" width="420" height="20" rx="8" fill="#78350F" />
        <rect x="90" y="255" width="18" height="70" rx="4" fill="#92400E" />
        <rect x="432" y="255" width="18" height="70" rx="4" fill="#92400E" />

        {/* Prototype Taking Shape: Friendly Smart Machine */}
        <g transform="translate(260, 130)" filter="url(#gw-glow-1)">
          {/* Main Bot Body */}
          <rect x="20" y="30" width="75" height="75" rx="20" fill="#FFFFFF" stroke="#B45309" strokeWidth="2.5" />
          {/* Screen Display */}
          <rect x="32" y="42" width="51" height="32" rx="10" fill="#171A2B" />
          <circle cx="45" cy="56" r="4" fill="#35B8C5" />
          <circle cx="70" cy="56" r="4" fill="#35B8C5" />
          <path d="M52 65 Q 57 68 62 65" stroke="#35B8C5" strokeWidth="2" strokeLinecap="round" />

          {/* Antenna */}
          <line x1="57" y1="30" x2="57" y2="12" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
          <circle cx="57" cy="8" r="6" fill="#F59E0B" />

          {/* Project Tag */}
          <rect x="15" y="112" width="85" height="22" rx="7" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="1.5" />
          <text x="24" y="127" fill="#B45309" fontSize="10" fontWeight="700">Hands-on Trial</text>
        </g>

        {/* Tools on Table */}
        <g transform="translate(380, 215)">
          <rect width="32" height="6" rx="2" fill="#D97706" />
          <line x1="32" y1="3" x2="48" y2="3" stroke="#6B7280" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g transform="translate(225, 215)">
          <circle cx="10" cy="10" r="8" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
        </g>

        {/* Student building with hands */}
        <g transform="translate(100, 115)">
          <path d="M35 150 C 35 115, 60 98, 90 98 C 120 98, 145 115, 145 150 Z" fill="#B45309" />
          <rect x="80" y="78" width="20" height="22" rx="4" fill="#C58C65" />
          <ellipse cx="90" cy="52" rx="30" ry="32" fill="#C58C65" />
          <path d="M60 48 C 60 22, 76 18, 90 18 C 104 18, 120 22, 120 48 C 116 42, 110 40, 104 40 C 96 40, 92 44, 88 44 C 82 44, 76 40, 70 42 Z" fill="#2D2327" />
          <circle cx="78" cy="52" r="3" fill="#1E171A" />
          <circle cx="102" cy="52" r="3" fill="#1E171A" />
          <path d="M84 66 Q 90 71 96 66" stroke="#1E171A" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Arm placing module */}
          <path d="M130 115 Q 165 110 185 130" stroke="#B45309" strokeWidth="15" strokeLinecap="round" fill="none" />
          <circle cx="188" cy="132" r="7" fill="#35B8C5" />
        </g>
      </svg>
    );
  }

  if (stepIndex === 2) {
    // 3. Reflect: Student pausing thoughtfully, notes and insight reflections floating
    return (
      <svg
        viewBox="0 0 540 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[320px] select-none"
        aria-label="Student reflecting on learning experience and personal insights"
      >
        <defs>
          <linearGradient id="gw-bg-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5F3FF" />
            <stop offset="50%" stopColor="#EDEAFF" />
            <stop offset="100%" stopColor="#E0F7FA" />
          </linearGradient>
          <filter id="gw-glow-2" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#6757F5" floodOpacity="0.15" />
          </filter>
        </defs>

        <rect width="540" height="360" rx="28" fill="url(#gw-bg-2)" />

        {/* Thoughtful Floating Reflection Cards */}
        <g transform="translate(60, 60)" filter="url(#gw-glow-2)">
          <rect width="180" height="54" rx="14" fill="#FFFFFF" stroke="#DDD8FE" strokeWidth="1.8" />
          <text x="14" y="24" fill="#6757F5" fontSize="11" fontWeight="800">💡 Personal Insight</text>
          <text x="14" y="42" fill="#626987" fontSize="10">“Loved designing the sensors!”</text>
        </g>

        <g transform="translate(300, 75)" filter="url(#gw-glow-2)">
          <rect width="180" height="54" rx="14" fill="#FFFFFF" stroke="#A7F3D0" strokeWidth="1.8" />
          <text x="14" y="24" fill="#047857" fontSize="11" fontWeight="800">🌱 What to Try Next</text>
          <text x="14" y="42" fill="#626987" fontSize="10">“Test solar battery power next.”</text>
        </g>

        <g transform="translate(320, 210)" filter="url(#gw-glow-2)">
          <rect width="160" height="48" rx="14" fill="#FFFFFF" stroke="#B2EBF2" strokeWidth="1.8" />
          <text x="14" y="22" fill="#00838F" fontSize="11" fontWeight="800">🧭 No Grade Pressure</text>
          <text x="14" y="38" fill="#626987" fontSize="10">“Just honest self-discovery.”</text>
        </g>

        {/* Student Sitting Relaxed, Reflecting */}
        <g transform="translate(190, 135)">
          <path d="M40 180 C 40 135, 65 115, 95 115 C 125 115, 150 135, 150 180 Z" fill="#6757F5" />
          <rect x="85" y="96" width="20" height="22" rx="4" fill="#C58C65" />
          <ellipse cx="95" cy="68" rx="34" ry="36" fill="#C58C65" />
          <path d="M61 64 C 61 34, 78 30, 95 30 C 112 30, 129 34, 129 64 C 125 56, 118 54, 112 54 C 104 54, 100 58, 95 58 C 90 58, 84 52, 76 54 C 68 56, 63 60, 61 64 Z" fill="#2D2327" />
          <circle cx="82" cy="68" r="3.5" fill="#1E171A" />
          <circle cx="108" cy="68" r="3.5" fill="#1E171A" />
          <path d="M87 82 Q 95 87 103 82" stroke="#1E171A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="74" cy="74" r="4.5" fill="#F4A896" fillOpacity="0.5" />
          <circle cx="116" cy="74" r="4.5" fill="#F4A896" fillOpacity="0.5" />

          {/* Holding Pencil & Notebook */}
          <g transform="translate(65, 135)">
            <rect width="60" height="38" rx="5" fill="#FFFFFF" stroke="#DDD8FE" strokeWidth="2" />
            <line x1="8" y1="12" x2="40" y2="12" stroke="#6757F5" strokeWidth="2" />
            <line x1="8" y1="22" x2="32" y2="22" stroke="#35B8C5" strokeWidth="2" />
            {/* Pencil */}
            <line x1="48" y1="8" x2="56" y2="28" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    );
  }

  // 4. Grow: Expanding landscape with multiple branching pathways & open future doors
  return (
    <svg
      viewBox="0 0 540 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-h-[320px] select-none"
      aria-label="Expanding learning landscape with multiple open future possibilities"
    >
      <defs>
        <linearGradient id="gw-bg-3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="50%" stopColor="#E0F7FA" />
          <stop offset="100%" stopColor="#F5F3FF" />
        </linearGradient>
        <filter id="gw-glow-3" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#047857" floodOpacity="0.15" />
        </filter>
      </defs>

      <rect width="540" height="360" rx="28" fill="url(#gw-bg-3)" />

      {/* Gentle Rolling Hills Horizon */}
      <path
        d="M0 250 Q 140 210 270 240 Q 400 270 540 230 L 540 360 L 0 360 Z"
        fill="#D1FAE5"
        fillOpacity="0.8"
      />
      <path
        d="M0 280 Q 150 250 280 270 Q 420 290 540 260 L 540 360 L 0 360 Z"
        fill="#A7F3D0"
        fillOpacity="0.6"
      />

      {/* Multiple Radiating Pathways */}
      <path d="M270 340 Q 220 260 140 180" stroke="#047857" strokeWidth="4" strokeDasharray="6 4" fill="none" />
      <path d="M270 340 Q 270 240 270 170" stroke="#00838F" strokeWidth="4" strokeDasharray="6 4" fill="none" />
      <path d="M270 340 Q 320 260 400 180" stroke="#6757F5" strokeWidth="4" strokeDasharray="6 4" fill="none" />

      {/* Future Possibility Doorway 1: Creative Art & Game Design */}
      <g transform="translate(90, 110)" filter="url(#gw-glow-3)">
        <rect width="105" height="70" rx="16" fill="#FFFFFF" stroke="#DDD8FE" strokeWidth="2" />
        <circle cx="52" cy="28" r="14" fill="#EDEAFF" />
        <text x="44" y="34" fontSize="16">🎨</text>
        <text x="14" y="56" fill="#6757F5" fontSize="11" fontWeight="800">Game &amp; UI Art</text>
      </g>

      {/* Future Possibility Doorway 2: Clean Tech & Nature Science */}
      <g transform="translate(218, 90)" filter="url(#gw-glow-3)">
        <rect width="105" height="70" rx="16" fill="#FFFFFF" stroke="#B2EBF2" strokeWidth="2" />
        <circle cx="52" cy="28" r="14" fill="#E0F7FA" />
        <text x="44" y="34" fontSize="16">🌿</text>
        <text x="18" y="56" fill="#00838F" fontSize="11" fontWeight="800">Clean Tech</text>
      </g>

      {/* Future Possibility Doorway 3: Robotics & Autonomous Systems */}
      <g transform="translate(345, 110)" filter="url(#gw-glow-3)">
        <rect width="105" height="70" rx="16" fill="#FFFFFF" stroke="#A7F3D0" strokeWidth="2" />
        <circle cx="52" cy="28" r="14" fill="#ECFDF5" />
        <text x="44" y="34" fontSize="16">🤖</text>
        <text x="24" y="56" fill="#047857" fontSize="11" fontWeight="800">Robotics</text>
      </g>

      {/* Student standing at center, arms open looking forward at the open horizon */}
      <g transform="translate(235, 195)">
        <path d="M15 130 C 15 95, 35 80, 55 80 C 75 80, 95 95, 95 130 Z" fill="#047857" />
        <rect x="46" y="65" width="18" height="18" rx="4" fill="#C58C65" />
        <ellipse cx="55" cy="45" rx="25" ry="27" fill="#C58C65" />
        <path d="M30 42 C 30 20, 44 16, 55 16 C 66 16, 80 20, 80 42 C 76 36, 70 34, 65 34 C 58 34, 55 38, 51 38 C 45 38, 40 34, 35 36 Z" fill="#2D2327" />
        <circle cx="45" cy="45" r="2.8" fill="#1E171A" />
        <circle cx="65" cy="45" r="2.8" fill="#1E171A" />
        <path d="M49 56 Q 55 61 61 56" stroke="#1E171A" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

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
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
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

        {/* 4 Interactive Growth Steps */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2">
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

        {/* Prominent Illustrated Learning Garden Display Box */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#FAF9F6] border-2 border-[#DDD8FE] p-6 sm:p-8 lg:p-10 shadow-lg shadow-[#6757F5]/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Illustrated Garden Scene */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-6 border border-[#E8E6F3] shadow-xs flex items-center justify-center overflow-hidden">
              <GrowthWorldScene stepIndex={activeStep} />
            </div>

            {/* Narrative Explanation & Self-Led Reflection */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 border bg-[#EDEAFF] text-[#6757F5] border-[#DDD8FE]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{stage.stageBadge}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-[#171A2B] leading-snug">
                  {stage.headline}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#626987] leading-relaxed">
                  {stage.story}
                </p>
              </div>

              {/* Gentle Takeaway Note */}
              <div className="p-4 rounded-2xl bg-white border border-[#DDD8FE] text-xs text-[#31364F] leading-relaxed">
                <strong className="text-[#6757F5] block mb-1">Guiding Principle:</strong>
                <span>{stage.takeaway}</span>
              </div>

              {/* Step Navigation Controls */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous Growth Step"
                    className="p-2.5 rounded-xl border border-[#E8E6F3] bg-white text-[#626987] hover:text-[#171A2B] hover:border-[#DDD8FE] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-bold text-[#626987] px-2">
                    Step {activeStep + 1} of {GROWTH_STAGES.length}
                  </span>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next Growth Step"
                    className="p-2.5 rounded-xl border border-[#E8E6F3] bg-white text-[#626987] hover:text-[#171A2B] hover:border-[#DDD8FE] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <Link
                  href="/get-started/student"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] hover:text-[#5342E8]"
                >
                  <span>Start Your Trail</span>
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
