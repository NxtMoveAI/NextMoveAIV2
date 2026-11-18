"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useIsMarketingMode } from "@/lib/deployment-mode";
import {
  Sparkles,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

interface HowItWorksStage {
  step: string;
  title: string;
  badgeLabel: string;
  question: string;
  shortDesc: string;
  realWorldExample: {
    title: string;
    description: string;
    tag: string;
  };
  actionText: string;
  actionHref: string;
  themeColor: string;
  bgLight: string;
}

const STAGES: HowItWorksStage[] = [
  {
    step: "01",
    title: "Discover",
    badgeLabel: "Step 01 · Discover",
    question: "Notice what catches your curiosity.",
    shortDesc:
      "Start with what you already enjoy. There are no right or wrong answers—just the topics, stories, and activities that make you wonder.",
    realWorldExample: {
      title: "Real-world Spark",
      description:
        "A student who loves doodling comics and playing space games discovers interest in character design and storytelling.",
      tag: "Zero test pressure",
    },
    actionText: "Try the Student Explorer",
    actionHref: "#explorer",
    themeColor: "#6757F5",
    bgLight: "#EDEAFF",
  },
  {
    step: "02",
    title: "Explore",
    badgeLabel: "Step 02 · Explore",
    question: "Connect interests to real-world possibilities.",
    shortDesc:
      "See how everyday interests connect to unexpected career paths, degree courses, and creative fields across technology, science, arts, and community.",
    realWorldExample: {
      title: "Pathway Connection",
      description:
        "Connecting drawing and technology reveals fields like UI design, game animation, and interactive educational media.",
      tag: "Curated Indian pathways",
    },
    actionText: "Browse Pathways",
    actionHref: "#explorer",
    themeColor: "#00838F",
    bgLight: "#E0F7FA",
  },
  {
    step: "03",
    title: "Try",
    badgeLabel: "Step 03 · Try",
    question: "Test the work with a quick hands-on trial.",
    shortDesc:
      "Try short, pressure-free mini activities to see what the work actually feels like. No grades, no exams—just direct hands-on experience.",
    realWorldExample: {
      title: "Hands-on Micro-Trial",
      description:
        "In a short starter activity, arrange the code logic for a school delivery bot or tune the visual typography of an environmental festival poster.",
      tag: "Hands-on doing",
    },
    actionText: "Try a Mini Activity",
    actionHref: "#explorer",
    themeColor: "#B45309",
    bgLight: "#FEF3C7",
  },
  {
    step: "04",
    title: "Grow",
    badgeLabel: "Step 04 · Grow",
    question: "Shape your own path, one step at a time.",
    shortDesc:
      "Reflect on what felt fun, track your own projects, and decide your next learning move with clarity, confidence, and family support.",
    realWorldExample: {
      title: "Continuous Reflection",
      description:
        "Save project reflections in your personal growth trail. Your interests evolve as you gain new experiences.",
      tag: "Clarity over verdicts",
    },
    actionText: "Begin Your Free Journey",
    actionHref: "/get-started/student",
    themeColor: "#047857",
    bgLight: "#ECFDF5",
  },
];

// Rich Illustrated Visual Scene for Each Stage
function StageIllustration({ stageIndex }: { stageIndex: number }) {
  if (stageIndex === 0) {
    // 01 Discover: Student character exploring curiosity sparks with magnifying glass
    return (
      <svg
        viewBox="0 0 520 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[300px] select-none"
        aria-label="Student discovering interests through curiosity sparks"
      >
        <defs>
          <linearGradient id="hiw-bg-01" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF8FF" />
            <stop offset="50%" stopColor="#F5F3FF" />
            <stop offset="100%" stopColor="#EDE9FE" />
          </linearGradient>
          <filter id="hiw-shadow-01" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#6757F5" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Ambient Backing Pod */}
        <rect width="520" height="340" rx="24" fill="url(#hiw-bg-01)" />
        <circle cx="260" cy="180" r="130" fill="#FFFFFF" fillOpacity="0.75" />

        {/* Constellation Trail Lines connecting sparks */}
        <path
          d="M140 100 C 180 80, 230 110, 260 130 C 300 150, 350 90, 400 110"
          stroke="#C4B5FD"
          strokeWidth="2.5"
          strokeDasharray="5 5"
          strokeLinecap="round"
        />
        <path
          d="M260 130 C 270 200, 340 220, 390 230"
          stroke="#C4B5FD"
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />

        {/* Floating Curiosity Token 1: Creative Art */}
        <g transform="translate(100, 70)" filter="url(#hiw-shadow-01)">
          <rect width="68" height="68" rx="18" fill="#FFFFFF" stroke="#DDD8FE" strokeWidth="2" />
          <circle cx="34" cy="34" r="22" fill="#EDEAFF" />
          {/* Palette Icon */}
          <path
            d="M34 20 C 26 20, 20 26, 20 34 C 20 42, 26 46, 32 46 C 34 46, 36 44, 36 42 C 36 40, 35 39, 37 38 C 38 37, 40 37, 42 37 C 46 37, 48 35, 48 31 C 48 25, 42 20, 34 20 Z"
            fill="#6757F5"
          />
          <circle cx="28" cy="28" r="2.5" fill="#FFFFFF" />
          <circle cx="35" cy="26" r="2.5" fill="#35B8C5" />
          <circle cx="41" cy="31" r="2.5" fill="#FBBF24" />
        </g>

        {/* Floating Curiosity Token 2: Science & Planets */}
        <g transform="translate(370, 80)" filter="url(#hiw-shadow-01)">
          <rect width="68" height="68" rx="18" fill="#FFFFFF" stroke="#B2EBF2" strokeWidth="2" />
          <circle cx="34" cy="34" r="22" fill="#E0F7FA" />
          {/* Planet with Ring */}
          <circle cx="34" cy="34" r="14" fill="#00838F" />
          <ellipse cx="34" cy="34" rx="20" ry="6" fill="none" stroke="#F59E0B" strokeWidth="2.5" transform="rotate(-20 34 34)" />
        </g>

        {/* Floating Curiosity Token 3: Robotics & Code */}
        <g transform="translate(360, 200)" filter="url(#hiw-shadow-01)">
          <rect width="64" height="64" rx="16" fill="#FFFFFF" stroke="#DDD8FE" strokeWidth="2" />
          <circle cx="32" cy="32" r="20" fill="#F5F3FF" />
          {/* Code Brackets */}
          <path d="M26 25 L 20 32 L 26 39 M 38 25 L 44 32 L 38 39" stroke="#6757F5" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Central Friendly Student Character */}
        <g transform="translate(195, 120)">
          {/* Shoulders & Torso */}
          <path
            d="M30 180 C 30 140, 50 120, 75 120 C 100 120, 120 140, 120 180 Z"
            fill="#6757F5"
          />
          {/* Shirt Collar Accent */}
          <path d="M63 120 L 75 136 L 87 120 Z" fill="#FAF9F6" />

          {/* Neck */}
          <rect x="66" y="102" width="18" height="22" rx="4" fill="#C58C65" />

          {/* Head */}
          <ellipse cx="75" cy="74" rx="32" ry="34" fill="#C58C65" />

          {/* Hair */}
          <path
            d="M43 70 C 43 42, 60 38, 75 38 C 90 38, 107 42, 107 70 C 103 62, 98 60, 92 60 C 84 60, 80 64, 75 64 C 70 64, 64 58, 56 60 C 48 62, 45 66, 43 70 Z"
            fill="#2D2327"
          />

          {/* Cheerful Eyes */}
          <circle cx="63" cy="74" r="3.5" fill="#1E171A" />
          <circle cx="64" cy="73" r="1.2" fill="#FFFFFF" />
          <circle cx="87" cy="74" r="3.5" fill="#1E171A" />
          <circle cx="88" cy="73" r="1.2" fill="#FFFFFF" />

          {/* Friendly Smile */}
          <path d="M68 87 Q 75 94 82 87" stroke="#1E171A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Soft Cheek Blush */}
          <circle cx="56" cy="80" r="4.5" fill="#F4A896" fillOpacity="0.5" />
          <circle cx="94" cy="80" r="4.5" fill="#F4A896" fillOpacity="0.5" />

          {/* Magnifying Glass in hand */}
          <g transform="translate(75, 95) rotate(-15)">
            <line x1="28" y1="28" x2="48" y2="48" stroke="#B45309" strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="20" cy="20" r="18" fill="#E0F7FA" fillOpacity="0.65" stroke="#35B8C5" strokeWidth="3.5" />
            <path d="M14 14 Q 20 8 26 14" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        </g>

        {/* Sparkles */}
        <path d="M190 60 L 193 68 L 201 71 L 193 74 L 190 82 L 187 74 L 179 71 L 187 68 Z" fill="#FBBF24" />
        <path d="M330 50 L 332 56 L 338 58 L 332 60 L 330 66 L 328 60 L 322 58 L 328 56 Z" fill="#6757F5" />
      </svg>
    );
  }

  if (stageIndex === 1) {
    // 02 Explore: Connecting ideas on an interactive pathway board
    return (
      <svg
        viewBox="0 0 520 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[300px] select-none"
        aria-label="Connecting interests to curated educational pathways"
      >
        <defs>
          <linearGradient id="hiw-bg-02" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0FDFA" />
            <stop offset="50%" stopColor="#E0F7FA" />
            <stop offset="100%" stopColor="#EDE9FE" />
          </linearGradient>
          <filter id="hiw-shadow-02" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#00838F" floodOpacity="0.12" />
          </filter>
        </defs>

        <rect width="520" height="340" rx="24" fill="url(#hiw-bg-02)" />

        {/* Pathway Map Canvas Board */}
        <g transform="translate(60, 45)" filter="url(#hiw-shadow-02)">
          <rect width="400" height="250" rx="20" fill="#FFFFFF" stroke="#B2EBF2" strokeWidth="2" />

          {/* Grid lines on blueprint */}
          <line x1="40" y1="50" x2="360" y2="50" stroke="#F0FDF4" strokeWidth="1.5" />
          <line x1="40" y1="125" x2="360" y2="125" stroke="#F0FDF4" strokeWidth="1.5" />
          <line x1="40" y1="200" x2="360" y2="200" stroke="#F0FDF4" strokeWidth="1.5" />

          {/* Node 1: Visual Arts */}
          <rect x="35" y="35" width="105" height="42" rx="12" fill="#EDEAFF" stroke="#DDD8FE" strokeWidth="1.5" />
          <text x="50" y="60" fill="#6757F5" fontSize="11" fontWeight="700">🎨 Visual Art</text>

          {/* Node 2: Technology */}
          <rect x="35" y="155" width="105" height="42" rx="12" fill="#E0F7FA" stroke="#B2EBF2" strokeWidth="1.5" />
          <text x="50" y="180" fill="#00838F" fontSize="11" fontWeight="700">💻 Tech & Code</text>

          {/* Connected Pathway Curve */}
          <path
            d="M140 56 C 200 56, 180 115, 240 115"
            stroke="#6757F5"
            strokeWidth="3"
            strokeDasharray="6 4"
            fill="none"
          />
          <path
            d="M140 176 C 200 176, 180 115, 240 115"
            stroke="#00838F"
            strokeWidth="3"
            strokeDasharray="6 4"
            fill="none"
          />

          {/* Converged Pathway Node: Game UI & Animation */}
          <rect x="240" y="90" width="140" height="52" rx="14" fill="#6757F5" stroke="#5342E8" strokeWidth="2" />
          <text x="254" y="114" fill="#FFFFFF" fontSize="11" fontWeight="800">✨ Interactive UI</text>
          <text x="254" y="130" fill="#DDD8FE" fontSize="9" fontWeight="600">&amp; Game Animation</text>
        </g>

        {/* Student Character observing the pathway with excitement */}
        <g transform="translate(320, 160)">
          {/* Torso */}
          <path d="M20 140 C 20 110, 40 95, 60 95 C 80 95, 100 110, 100 140 Z" fill="#00838F" />
          {/* Head */}
          <ellipse cx="60" cy="58" rx="24" ry="26" fill="#C58C65" />
          {/* Hair */}
          <path d="M36 54 C 36 32, 50 28, 60 28 C 70 28, 84 32, 84 54 C 80 48, 74 46, 68 46 C 62 46, 56 48, 52 48 C 44 48, 38 52, 36 54 Z" fill="#2D2327" />
          {/* Eyes looking up at the board */}
          <circle cx="51" cy="56" r="2.8" fill="#1E171A" />
          <circle cx="69" cy="56" r="2.8" fill="#1E171A" />
          <path d="M55 68 Q 60 74 65 68" stroke="#1E171A" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    );
  }

  if (stageIndex === 2) {
    // 03 Try: Student at maker bench building a 15-minute challenge
    return (
      <svg
        viewBox="0 0 520 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[300px] select-none"
        aria-label="Student trying a hands-on mini activity"
      >
        <defs>
          <linearGradient id="hiw-bg-03" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="50%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
          <filter id="hiw-shadow-03" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#B45309" floodOpacity="0.12" />
          </filter>
        </defs>

        <rect width="520" height="340" rx="24" fill="url(#hiw-bg-03)" />

        {/* Workbench Base */}
        <rect x="70" y="220" width="380" height="18" rx="6" fill="#78350F" />
        <rect x="95" y="238" width="16" height="60" fill="#92400E" rx="3" />
        <rect x="409" y="238" width="16" height="60" fill="#92400E" rx="3" />

        {/* Mini Maker Project on Table: Friendly Prototype Bot */}
        <g transform="translate(230, 115)" filter="url(#hiw-shadow-03)">
          {/* Bot Body */}
          <rect x="20" y="40" width="60" height="65" rx="16" fill="#FFFFFF" stroke="#B45309" strokeWidth="2.5" />
          {/* Bot Screen Face */}
          <rect x="28" y="50" width="44" height="28" rx="8" fill="#171A2B" />
          <circle cx="40" cy="62" r="3.5" fill="#35B8C5" />
          <circle cx="60" cy="62" r="3.5" fill="#35B8C5" />
          <path d="M46 70 Q 50 73 54 70" stroke="#35B8C5" strokeWidth="1.5" strokeLinecap="round" />

          {/* Bot Antenna */}
          <line x1="50" y1="40" x2="50" y2="22" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="18" r="5" fill="#F59E0B" />

          {/* Circuit / Sensor Wire */}
          <path d="M80 80 Q 95 90 105 85" stroke="#35B8C5" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>

        {/* Quick Trial Badge */}
        <g transform="translate(185, 45)">
          <rect width="145" height="34" rx="17" fill="#FFFFFF" stroke="#FDE68A" strokeWidth="1.8" />
          <circle cx="20" cy="17" r="7" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
          <polyline points="20 13, 20 17, 23 17" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
          <text x="35" y="21" fill="#B45309" fontSize="11" fontWeight="800">Quick Trial</text>
        </g>

        {/* Student hands-on assembling the project */}
        <g transform="translate(90, 100)">
          <path d="M30 140 C 30 110, 50 95, 75 95 C 100 95, 120 110, 120 140 Z" fill="#B45309" />
          <rect x="66" y="78" width="18" height="20" rx="3" fill="#C58C65" />
          <ellipse cx="75" cy="52" rx="26" ry="28" fill="#C58C65" />
          <path d="M48 48 C 48 26, 62 22, 75 22 C 88 22, 102 26, 102 48 C 98 42, 92 40, 86 40 C 78 40, 74 44, 70 44 C 64 44, 58 40, 52 42 Z" fill="#2D2327" />
          <circle cx="65" cy="52" r="3" fill="#1E171A" />
          <circle cx="85" cy="52" r="3" fill="#1E171A" />
          <path d="M70 65 Q 75 70 80 65" stroke="#1E171A" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Arm holding small gear */}
          <path d="M110 115 Q 135 110 150 125" stroke="#B45309" strokeWidth="14" strokeLinecap="round" fill="none" />
          <circle cx="152" cy="126" r="7" fill="#FBBF24" stroke="#92400E" strokeWidth="1.5" />
        </g>
      </svg>
    );
  }

  // 04 Grow: Living reflection notebook & branching open future
  return (
    <svg
      viewBox="0 0 520 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-h-[300px] select-none"
      aria-label="Student reflecting and choosing next learning direction"
    >
      <defs>
        <linearGradient id="hiw-bg-04" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="50%" stopColor="#D1FAE5" />
          <stop offset="100%" stopColor="#EDE9FE" />
        </linearGradient>
        <filter id="hiw-shadow-04" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#047857" floodOpacity="0.12" />
        </filter>
      </defs>

      <rect width="520" height="340" rx="24" fill="url(#hiw-bg-04)" />

      {/* Sprouting Tree with Branching Directions */}
      <g transform="translate(230, 40)">
        <path
          d="M60 260 Q 60 180 60 140 Q 60 100 20 70 M 60 140 Q 60 100 100 70 M 60 180 Q 20 140 10 120"
          stroke="#047857"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Leaf Clusters */}
        <circle cx="20" cy="70" r="18" fill="#10B981" />
        <circle cx="100" cy="70" r="18" fill="#34D399" />
        <circle cx="60" cy="110" r="14" fill="#059669" />
        <circle cx="10" cy="120" r="12" fill="#6EE7B7" />

        {/* Floating Possibility Portals */}
        <g transform="translate(-40, 25)" filter="url(#hiw-shadow-04)">
          <rect width="64" height="28" rx="10" fill="#FFFFFF" stroke="#A7F3D0" strokeWidth="1.5" />
          <text x="12" y="18" fill="#047857" fontSize="10" fontWeight="800">🌿 Science</text>
        </g>
        <g transform="translate(90, 25)" filter="url(#hiw-shadow-04)">
          <rect width="64" height="28" rx="10" fill="#FFFFFF" stroke="#A7F3D0" strokeWidth="1.5" />
          <text x="14" y="18" fill="#047857" fontSize="10" fontWeight="800">🚀 Design</text>
        </g>
      </g>

      {/* Student holding open notebook reflecting */}
      <g transform="translate(90, 110)">
        <path d="M30 150 C 30 115, 55 100, 80 100 C 105 100, 130 115, 130 150 Z" fill="#047857" />
        <ellipse cx="80" cy="56" rx="28" ry="30" fill="#C58C65" />
        <path d="M52 50 C 52 26, 68 22, 80 22 C 92 22, 108 26, 108 50 C 104 44, 98 42, 92 42 C 84 42, 80 46, 76 46 C 70 46, 64 42, 58 44 Z" fill="#2D2327" />
        <circle cx="69" cy="56" r="3" fill="#1E171A" />
        <circle cx="91" cy="56" r="3" fill="#1E171A" />
        <path d="M74 70 Q 80 76 86 70" stroke="#1E171A" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Open Notebook in Hand */}
        <g transform="translate(50, 110)">
          <rect x="0" y="0" width="30" height="38" rx="4" fill="#FFFFFF" stroke="#DDD8FE" strokeWidth="1.5" />
          <rect x="30" y="0" width="30" height="38" rx="4" fill="#FAF9F6" stroke="#DDD8FE" strokeWidth="1.5" />
          <line x1="6" y1="10" x2="24" y2="10" stroke="#6757F5" strokeWidth="1.5" />
          <line x1="6" y1="18" x2="20" y2="18" stroke="#35B8C5" strokeWidth="1.5" />
          <line x1="36" y1="10" x2="54" y2="10" stroke="#10B981" strokeWidth="1.5" />
          <circle cx="45" cy="24" r="5" fill="#FEF3C7" />
        </g>
      </g>
    </svg>
  );
}

export function HowItWorks() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const isMarketing = useIsMarketingMode();

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
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
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

        {/* Compact 4-Stage Pill Navigation */}
        <div
          role="tablist"
          aria-label="How Next Move AI Works Stages"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8"
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
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                  isSelected
                    ? "bg-[#6757F5] text-white border-[#5342E8] shadow-md shadow-[#6757F5]/20 ring-2 ring-[#6757F5]/20 scale-[1.02]"
                    : "bg-white text-[#31364F] border-[#E8E6F3] hover:border-[#DDD8FE] hover:bg-[#FAF8FF]"
                }`}
              >
                <span
                  className={`text-[11px] font-mono font-black px-1.5 py-0.5 rounded ${
                    isSelected ? "bg-white/20 text-white" : "bg-[#F0EEF8] text-[#626987]"
                  }`}
                >
                  {item.step}
                </span>
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Showcase */}
        <div
          id={`how-it-works-panel-${activeStage}`}
          role="tabpanel"
          aria-labelledby={`how-it-works-tab-${activeStage}`}
          className="rounded-3xl bg-white border-2 border-[#DDD8FE] p-6 sm:p-8 lg:p-10 shadow-sm transition-all duration-300 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Illustrated Scene for Current Stage */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#FAF8FF] via-white to-[#F0FDF4] rounded-2xl p-4 sm:p-6 border border-[#E8E6F3] flex items-center justify-center overflow-hidden min-h-[280px]">
              <StageIllustration stageIndex={activeStage} />
            </div>

            {/* Explanation and Practical Real-World Example */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                {/* Active Stage Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 border bg-[#EDEAFF] text-[#6757F5] border-[#DDD8FE]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{stage.badgeLabel}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] leading-snug">
                  {stage.question}
                </h3>

                <p className="mt-3 text-sm sm:text-base text-[#626987] leading-relaxed">
                  {stage.shortDesc}
                </p>
              </div>

              {/* One Clear Practical Example Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#171A2B] flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-[#F59E0B]" />
                    {stage.realWorldExample.title}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-[#E8E6F3] text-[#626987]">
                    {stage.realWorldExample.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#31364F] leading-relaxed">
                  {stage.realWorldExample.description}
                </p>
              </div>

              {/* Action Button Linking to Explorer */}
              <div className="pt-2">
                <Link
                  href={isMarketing && stage.actionHref.startsWith("/get-started") ? "#explorer" : stage.actionHref}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#6757F5] text-white text-sm font-bold shadow-md shadow-[#6757F5]/25 hover:bg-[#5342E8] hover:shadow-lg transition-all"
                >
                  <span>
                    {isMarketing && stage.actionHref.startsWith("/get-started")
                      ? "Explore Interactive Journeys"
                      : stage.actionText}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
