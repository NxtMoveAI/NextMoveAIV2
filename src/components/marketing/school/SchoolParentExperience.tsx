"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface DinnerCard {
  number: string;
  theme: string;
  question: string;
  guide: string;
  offlineIdea: string;
  icon: string;
}

const DINNER_CONVERSATION_CARDS: DinnerCard[] = [
  {
    number: "01",
    theme: "Curiosity & Surprise",
    question: "What was the most surprising thing you tried or sketched this week?",
    guide: "Listen with genuine interest—whether it was about a robot comic, a leaf experiment, or a game sprite.",
    offlineIdea: "Look up a 5-minute video or visit the local park together to observe similar examples in nature.",
    icon: "🌱",
  },
  {
    number: "02",
    theme: "Learning Through Tinkering",
    question: "Did any part of your activity feel tricky, and what did you test to fix it?",
    guide: "Normalize bugs and false starts: great scientists and artists iterate through dozens of rough drafts.",
    offlineIdea: "Work on a hands-on kitchen experiment or cardboard prototype together on Saturday morning.",
    icon: "💡",
  },
  {
    number: "03",
    theme: "Shared Exploration",
    question: "If we could explore one wild question together this weekend, what would it be?",
    guide: "Encourage self-directed interest without steering the conversation toward entrance exams or stream decisions.",
    offlineIdea: "Visit a science museum, library, or hardware store to touch real tools and materials.",
    icon: "🚀",
  },
];

export function SchoolParentExperience() {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const prevCard = () => {
    setActiveCardIndex((prev) =>
      prev === 0 ? DINNER_CONVERSATION_CARDS.length - 1 : prev - 1
    );
  };

  const nextCard = () => {
    setActiveCardIndex((prev) =>
      prev === DINNER_CONVERSATION_CARDS.length - 1 ? 0 : prev + 1
    );
  };

  const currentCard = DINNER_CONVERSATION_CARDS[activeCardIndex];

  return (
    <section id="parent-support" className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE] shadow-xs">
            <Heart className="w-3.5 h-3.5" />
            <span>For Parents &amp; Families</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Learning is better when we{" "}
            <span className="text-[#6757F5]">
              explore together.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            How parents can understand their child&apos;s emerging interests, celebrate meaningful creations, and nurture curiosity without academic stress or premature career anxiety.
          </p>
        </div>

        {/* 4 Core Parent Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          <div className="p-6 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#E8F9FA] text-[#269CA8] flex items-center justify-center text-lg mb-3">
                🔍
              </div>
              <h3 className="text-sm font-extrabold text-[#171A2B] mb-1.5">
                Understand Emerging Interests
              </h3>
              <p className="text-xs text-[#626987] leading-relaxed">
                See what subjects your child is exploring without hovering over their screen or micro-managing tasks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F0EEF8] flex items-center gap-1.5 text-[11px] font-semibold text-[#269CA8]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Pressure-free visibility</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center text-lg mb-3">
                💬
              </div>
              <h3 className="text-sm font-extrabold text-[#171A2B] mb-1.5">
                Encourage Without Pressure
              </h3>
              <p className="text-xs text-[#626987] leading-relaxed">
                Shift conversations from &ldquo;What marks did you score?&rdquo; to &ldquo;What made you curious today?&rdquo;
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F0EEF8] flex items-center gap-1.5 text-[11px] font-semibold text-[#6757F5]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Positive dialogue</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#ECFDF5] text-[#047857] flex items-center justify-center text-lg mb-3">
                🎨
              </div>
              <h3 className="text-sm font-extrabold text-[#171A2B] mb-1.5">
                Celebrate Creative Effort
              </h3>
              <p className="text-xs text-[#626987] leading-relaxed">
                Applaud the comics drawn, logic puzzles solved, and science questions asked rather than test scores.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F0EEF8] flex items-center gap-1.5 text-[11px] font-semibold text-[#047857]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Growth mindset</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#FFFBEB] text-[#B45309] flex items-center justify-center text-lg mb-3">
                🚲
              </div>
              <h3 className="text-sm font-extrabold text-[#171A2B] mb-1.5">
                Suggest Offline Exploration
              </h3>
              <p className="text-xs text-[#626987] leading-relaxed">
                Take digital curiosity into the physical world with nature walks, library visits, and tinkering weekends.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F0EEF8] flex items-center gap-1.5 text-[11px] font-semibold text-[#B45309]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Real-world connection</span>
            </div>
          </div>
        </div>

        {/* Supportive Conversation Contrast & Family Conversation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Dinner Table Conversation Comparison */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl font-black text-[#171A2B] tracking-tight">
              Supportive Conversations at Home
            </h3>
            <p className="text-sm text-[#626987] leading-relaxed">
              Small shifts in how we ask questions transform high-stress interrogation into joyful shared discovery.
            </p>

            <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#EF4444] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                ✕
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#991B1B] uppercase tracking-wider block">
                  High-Stress Interrogation:
                </span>
                <p className="text-xs sm:text-sm text-[#7F1D1D] mt-0.5 italic">
                  &ldquo;What marks did you score on the mock test? Have you decided your Class 11 stream yet? Everyone else is doing coaching.&rdquo;
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#10B981] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                ✓
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#065F46] uppercase tracking-wider block">
                  Curiosity-Led Dialogue:
                </span>
                <p className="text-xs sm:text-sm text-[#047857] mt-0.5 font-medium">
                  &ldquo;What was the most surprising thing you tried or sketched this week? What made that problem fun to figure out?&rdquo;
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/get-started?role=parent&stage=classes-4-7&audience=school"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] text-white text-xs sm:text-sm font-bold shadow-sm shadow-[#6757F5]/20 hover:bg-[#5342E8] transition-all"
              >
                <span>Explore Parent Overview</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Family Conversation Card Carousel */}
          <div className="lg:col-span-6 rounded-3xl bg-white border-2 border-[#DDD8FE] p-6 sm:p-8 shadow-md shadow-[#6757F5]/5">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EEF8] mb-5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentCard.icon}</span>
                <div>
                  <span className="text-[10px] font-bold text-[#6757F5] uppercase tracking-wider block">
                    Dinner Table Conversation Card · #{currentCard.number}
                  </span>
                  <h4 className="text-sm font-bold text-[#171A2B]">
                    {currentCard.theme}
                  </h4>
                </div>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevCard}
                  aria-label="Previous card"
                  className="w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#E8E6F3] flex items-center justify-center text-[#626987] hover:text-[#171A2B] hover:bg-[#EDEAFF] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextCard}
                  aria-label="Next card"
                  className="w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#E8E6F3] flex items-center justify-center text-[#626987] hover:text-[#171A2B] hover:bg-[#EDEAFF] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3]">
                <span className="text-[11px] font-bold text-[#626987] uppercase tracking-wider block mb-1">
                  Question to ask tonight:
                </span>
                <p className="text-base font-bold text-[#171A2B] leading-snug">
                  &ldquo;{currentCard.question}&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E8E6F3] text-xs text-[#474D66]">
                <strong className="text-[#6757F5] block mb-0.5">Parent Tip:</strong>
                <p className="leading-relaxed">{currentCard.guide}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#E8F9FA] border border-[#CBF0F3] text-xs text-[#0F6570]">
                <strong className="text-[#269CA8] block mb-0.5">Suggested Weekend Offline Idea:</strong>
                <p className="leading-relaxed">{currentCard.offlineIdea}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Guardian Safeguard Transparency Banner */}
        <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-white border border-[#E8E6F3] shadow-xs flex items-center gap-3 text-xs text-[#626987]">
          <ShieldCheck className="w-5 h-5 text-[#6757F5] shrink-0" />
          <p>
            <strong>Guardian Privacy Promise:</strong> We provide parents with topic-level awareness and conversation prompts. We do not provide intrusive surveillance, private diary logs, or sell student exploration records.
          </p>
        </div>
      </div>
    </section>
  );
}
