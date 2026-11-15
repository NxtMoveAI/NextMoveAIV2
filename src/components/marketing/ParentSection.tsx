"use client";

import React, { useState } from "react";
import {
  Heart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Lock,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

const CONVERSATION_CARDS = [
  {
    number: "01",
    theme: "Curiosity & Discovery",
    question: "What was the most interesting thing you discovered this week?",
    tip: "Listen with open excitement—whether it was about a video game, an animal fact, or a sketch.",
    icon: "🔍",
  },
  {
    number: "02",
    theme: "Trying New Things",
    question: "Was there anything new you enjoyed trying recently?",
    tip: "Praise their courage to try something unfamiliar, even if it didn't turn out perfect.",
    icon: "🎨",
  },
  {
    number: "03",
    theme: "Shared Exploration",
    question: "What would you like to explore or build together?",
    tip: "A 30-minute weekend activity together builds shared trust and wonderful memories.",
    icon: "🤝",
  },
  {
    number: "04",
    theme: "Learning From Challenges",
    question: "What felt difficult, and what did you learn from it?",
    tip: "Normalize stumbling blocks: every builder, scientist, and artist encounters hurdles along the way.",
    icon: "💡",
  },
  {
    number: "05",
    theme: "Future Curiosity",
    question: "What's one small thing you'd like to try next?",
    tip: "Encourage self-directed choices without steering them toward a single predetermined career track.",
    icon: "🚀",
  },
];

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
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE] shadow-xs">
            <Heart className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>For Parents & Families</span>
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
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs hover:border-[#6757F5]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center text-2xl mb-4 shadow-xs">
                🧭
              </div>
              <h3 className="text-lg font-bold text-[#171A2B] mb-2 leading-snug">
                Understand Their Journey
              </h3>
              <p className="text-xs sm:text-sm text-[#626987] leading-relaxed">
                See age-appropriate learning and exploration updates without intrusive monitoring or surveillance.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#F0EEF8] flex items-center gap-1.5 text-[11px] font-semibold text-[#6757F5]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Transparent & student-respectful</span>
            </div>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs hover:border-[#6757F5]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E0F7FA] text-[#00838F] flex items-center justify-center text-2xl mb-4 shadow-xs">
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

          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs hover:border-[#6757F5]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#047857] flex items-center justify-center text-2xl mb-4 shadow-xs">
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
              <span>Autonomy with family warmth</span>
            </div>
          </div>
        </div>

        {/* Interactive Feature: Family Conversation Cards */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-white border-2 border-[#DDD8FE] p-6 sm:p-8 lg:p-10 shadow-lg shadow-[#6757F5]/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#E8E6F3]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6757F5]">
                  Interactive Family Preview
                </span>
                <span className="text-[10px] bg-[#35B8C5]/15 text-[#21818B] px-2 py-0.5 rounded-full font-bold">
                  Card {card.number} of 05
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#171A2B]">
                Family Conversation Cards
              </h3>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous question card"
                className="p-2 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] text-[#626987] hover:text-[#6757F5] hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next question card"
                className="p-2 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] text-[#626987] hover:text-[#6757F5] hover:bg-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* The Active Conversation Card */}
          <div className="py-8 sm:py-10 text-center animate-fadeIn">
            <span className="text-4xl sm:text-5xl block mb-4 animate-bounce">
              {card.icon}
            </span>

            <span className="text-xs font-bold uppercase tracking-wider text-[#6757F5] bg-[#EDEAFF] px-3 py-1 rounded-full inline-block mb-3">
              {card.theme}
            </span>

            <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#171A2B] max-w-xl mx-auto leading-snug tracking-tight">
              &ldquo;{card.question}&rdquo;
            </h4>

            {/* Conversation Tip */}
            <div className="mt-6 max-w-lg mx-auto p-4 rounded-2xl bg-[#FFFDF7] border border-[#FDE68A] text-xs text-[#92400E] flex items-start gap-2.5 text-left">
              <Lightbulb className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <p>
                <strong>Parent Tip:</strong> {card.tip}
              </p>
            </div>
          </div>

          {/* Card Footer Controls */}
          <div className="pt-6 border-t border-[#E8E6F3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#626987]">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#6757F5]" />
              <span>Real parent co-pilot links securely with student consent</span>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center gap-1.5 text-[#6757F5] font-bold hover:text-[#5342E8] self-start sm:self-auto"
            >
              <span>See Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
