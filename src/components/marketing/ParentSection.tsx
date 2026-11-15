"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

const CONVERSATION_CARDS = [
  {
    number: "01",
    theme: "Curiosity & Discovery",
    question: "What was the most interesting idea you discovered this week?",
    tip: "Listen with open excitement—whether it was about a video game mechanic, a plant fact, or a sketch.",
    icon: "🔍",
  },
  {
    number: "02",
    theme: "Trying New Things",
    question: "Was there anything unfamiliar you enjoyed trying recently?",
    tip: "Praise their courage to experiment, even if the project prototype didn't turn out perfect.",
    icon: "🎨",
  },
  {
    number: "03",
    theme: "Shared Exploration",
    question: "What would you like to explore or build together this weekend?",
    tip: "A 30-minute hands-on activity together builds wonderful memories and mutual trust.",
    icon: "🤝",
  },
  {
    number: "04",
    theme: "Learning From Challenges",
    question: "What felt tricky in your project, and what did it teach you?",
    tip: "Normalize stumbling blocks: every scientist, designer, and programmer encounters bugs.",
    icon: "💡",
  },
  {
    number: "05",
    theme: "Future Curiosity",
    question: "What is one small question you’d like to investigate next?",
    tip: "Encourage self-directed choices without steering them toward a single predetermined career track.",
    icon: "🚀",
  },
];

// Warm, Professional Illustration of Parent and Student Discussing Learning Together (SVG)
function ParentStudentIllustration() {
  return (
    <svg
      viewBox="0 0 520 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-h-[300px] select-none"
      aria-label="Parent and student discussing a learning project together with warm encouragement"
    >
      <defs>
        <linearGradient id="parent-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAF8FF" />
          <stop offset="50%" stopColor="#EDEAFF" />
          <stop offset="100%" stopColor="#E0F7FA" />
        </linearGradient>
        <filter id="parent-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#6757F5" floodOpacity="0.12" />
        </filter>
      </defs>

      <rect width="520" height="340" rx="28" fill="url(#parent-bg)" />

      {/* Warm Ambient Family Table */}
      <rect x="60" y="225" width="400" height="18" rx="7" fill="#78350F" />
      <rect x="90" y="243" width="18" height="65" rx="4" fill="#92400E" />
      <rect x="412" y="243" width="18" height="65" rx="4" fill="#92400E" />

      {/* Shared Open Notebook / Project on Table */}
      <g transform="translate(210, 195)" filter="url(#parent-shadow)">
        <rect x="0" y="0" width="48" height="30" rx="4" fill="#FFFFFF" stroke="#DDD8FE" strokeWidth="1.8" />
        <rect x="48" y="0" width="48" height="30" rx="4" fill="#FAF9F6" stroke="#DDD8FE" strokeWidth="1.8" />
        <line x1="8" y1="8" x2="38" y2="8" stroke="#6757F5" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="16" x2="30" y2="16" stroke="#35B8C5" strokeWidth="2" strokeLinecap="round" />
        <line x1="56" y1="8" x2="86" y2="8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
        <line x1="56" y1="16" x2="76" y2="16" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Warm Tea Cup */}
      <g transform="translate(160, 205)">
        <rect width="20" height="18" rx="4" fill="#FFFFFF" stroke="#DDD8FE" strokeWidth="1.5" />
        <path d="M20 5 Q 26 8 20 12" stroke="#6757F5" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Gentle steam */}
        <path d="M7 -2 Q 10 -6 7 -10" stroke="#DDD8FE" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M13 -2 Q 16 -6 13 -10" stroke="#DDD8FE" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>

      {/* Parent Figure on Left (Supportive, listening warmly) */}
      <g transform="translate(90, 85)">
        {/* Torso */}
        <path d="M25 140 C 25 105, 50 88, 78 88 C 106 88, 131 105, 131 140 Z" fill="#00838F" />
        <rect x="68" y="66" width="20" height="24" rx="4" fill="#A86B4C" />
        <ellipse cx="78" cy="42" rx="27" ry="29" fill="#A86B4C" />
        {/* Hair with neat soft styling */}
        <path d="M49 38 C 49 14, 65 10, 78 10 C 91 10, 107 14, 107 38 C 103 32, 97 30, 91 30 C 85 30, 80 34, 78 34 C 74 34, 69 30, 63 30 C 56 30, 52 34, 49 38 Z" fill="#1F171A" />
        <circle cx="68" cy="42" r="3" fill="#171A2B" />
        <circle cx="88" cy="42" r="3" fill="#171A2B" />
        <path d="M73 54 Q 78 59 83 54" stroke="#171A2B" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Supportive Arm gesturing toward the student's notebook */}
        <path d="M120 110 Q 155 125 180 120" stroke="#00838F" strokeWidth="14" strokeLinecap="round" fill="none" />
      </g>

      {/* Student Figure on Right (Engaged, pointing at notebook) */}
      <g transform="translate(300, 95)">
        {/* Torso */}
        <path d="M25 130 C 25 98, 45 84, 70 84 C 95 84, 115 98, 115 130 Z" fill="#6757F5" />
        <rect x="61" y="66" width="18" height="20" rx="3" fill="#C58C65" />
        <ellipse cx="70" cy="44" rx="24" ry="26" fill="#C58C65" />
        {/* Hair */}
        <path d="M44 40 C 44 18, 58 14, 70 14 C 82 14, 96 18, 96 40 C 92 34, 86 32, 80 32 C 74 32, 70 36, 66 36 C 60 36, 54 32, 48 34 Z" fill="#2D2327" />
        <circle cx="61" cy="44" r="2.8" fill="#1E171A" />
        <circle cx="79" cy="44" r="2.8" fill="#1E171A" />
        <path d="M66 54 Q 70 59 74 54" stroke="#1E171A" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Arm pointing at the project */}
        <path d="M35 110 Q 0 115 -20 108" stroke="#6757F5" strokeWidth="12" strokeLinecap="round" fill="none" />
      </g>

      {/* Floating Gentle Heart Spark */}
      <g transform="translate(250, 45)">
        <path d="M12 4 C 8 -2, 0 0, 0 8 C 0 14, 12 22, 12 22 C 12 22, 24 14, 24 8 C 24 0, 16 -2, 12 4 Z" fill="#F43F5E" fillOpacity="0.8" />
      </g>
    </svg>
  );
}

export function ParentSection() {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const card = CONVERSATION_CARDS[activeCardIndex];

  const handleNext = () => {
    setActiveCardIndex((prev) =>
      prev < CONVERSATION_CARDS.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    setActiveCardIndex((prev) =>
      prev > 0 ? prev - 1 : CONVERSATION_CARDS.length - 1
    );
  };

  return (
    <section
      id="for-parents"
      className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E8E6F3] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE] shadow-xs">
            <Heart className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>For Parents &amp; Families</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Support their curiosity.{" "}
            <span className="bg-gradient-to-r from-[#6757F5] via-[#8B7FF8] to-[#35B8C5] bg-clip-text text-transparent">
              Celebrate their growth.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Stay involved, have better conversations, and help your child explore with confidence.
          </p>
        </div>

        {/* 3 Simple Parent Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div className="p-6 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs hover:border-[#6757F5]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center text-xl mb-4 shadow-xs">
                🧭
              </div>
              <h3 className="text-lg font-bold text-[#171A2B] mb-2 leading-snug">
                Understand Their Journey
              </h3>
              <p className="text-xs sm:text-sm text-[#626987] leading-relaxed">
                See age-appropriate learning updates and project milestones without intrusive surveillance.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#F0EEF8] flex items-center gap-1.5 text-[11px] font-semibold text-[#6757F5]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Transparent &amp; student-respectful</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs hover:border-[#6757F5]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#E0F7FA] text-[#00838F] flex items-center justify-center text-xl mb-4 shadow-xs">
                💬
              </div>
              <h3 className="text-lg font-bold text-[#171A2B] mb-2 leading-snug">
                Talk About Possibilities
              </h3>
              <p className="text-xs sm:text-sm text-[#626987] leading-relaxed">
                Use thoughtful questions to turn dinner-table discussions into positive, open chats about their interests.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#F0EEF8] flex items-center gap-1.5 text-[11px] font-semibold text-[#00838F]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Positive, pressure-free dialogue</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs hover:border-[#6757F5]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#ECFDF5] text-[#047857] flex items-center justify-center text-xl mb-4 shadow-xs">
                🌱
              </div>
              <h3 className="text-lg font-bold text-[#171A2B] mb-2 leading-snug">
                Support Their Choices
              </h3>
              <p className="text-xs sm:text-sm text-[#626987] leading-relaxed">
                Help students explore options and learn from small experiments without pressuring them into a fixed path.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#F0EEF8] flex items-center gap-1.5 text-[11px] font-semibold text-[#047857]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Clarity over premature verdicts</span>
            </div>
          </div>
        </div>

        {/* Focal Section: Warm Illustration & Family Conversation Card Showcase */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-white border-2 border-[#DDD8FE] p-6 sm:p-8 lg:p-10 shadow-lg shadow-[#6757F5]/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Warm Parent & Student Illustration */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#FAF8FF] to-[#F5F3FF] rounded-2xl p-4 sm:p-6 border border-[#E8E6F3] flex items-center justify-center overflow-hidden min-h-[280px]">
              <ParentStudentIllustration />
            </div>

            {/* Interactive Family Conversation Card */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EEF8]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <span className="text-xs font-bold text-[#6757F5] uppercase tracking-wider">
                    Family Conversation Starter
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#626987] bg-[#FAF9F6] px-2.5 py-0.5 rounded-md border border-[#E8E6F3]">
                  Card {card.number} of 05
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-[#35B8C5] uppercase tracking-wider block mb-2">
                  {card.theme}
                </span>

                <h4 className="text-xl sm:text-2xl font-black text-[#171A2B] leading-snug">
                  “{card.question}”
                </h4>

                {/* Practical Parent Tip Box */}
                <div className="mt-4 p-4 rounded-2xl bg-[#FAF9F6] border border-[#DDD8FE] text-xs sm:text-sm text-[#31364F] leading-relaxed flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#6757F5] block mb-0.5">Parent Tip:</strong>
                    <span>{card.tip}</span>
                  </div>
                </div>
              </div>

              {/* Card Cycling Controls */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous Conversation Card"
                    className="p-2.5 rounded-xl border border-[#E8E6F3] bg-[#FAF9F6] text-[#626987] hover:text-[#171A2B] hover:border-[#DDD8FE] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex gap-1.5 px-2">
                    {CONVERSATION_CARDS.map((c, idx) => (
                      <button
                        key={c.number}
                        type="button"
                        onClick={() => setActiveCardIndex(idx)}
                        aria-label={`Go to card ${c.number}`}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          activeCardIndex === idx
                            ? "bg-[#6757F5] w-6"
                            : "bg-[#E8E6F3] hover:bg-[#DDD8FE]"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next Conversation Card"
                    className="p-2.5 rounded-xl border border-[#E8E6F3] bg-[#FAF9F6] text-[#626987] hover:text-[#171A2B] hover:border-[#DDD8FE] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <Link
                  href="/sign-up/parent"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] hover:text-[#5342E8]"
                >
                  <span>Explore Parent Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Scope Note Clarification */}
              <div className="pt-3 border-t border-[#F0EEF8] text-[11px] text-[#626987]">
                <span>
                  *Guardian-student collaboration features to be linked upon account activation. No live guardian linking is operational on the public preview.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
