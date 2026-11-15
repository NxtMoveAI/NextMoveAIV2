"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  User,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface PartnerConversation {
  id: string;
  category: string;
  chipLabel: string;
  studentMessage: string;
  partnerResponse: string;
  actionText: string;
  actionHref: string;
  relatedTips: string[];
}

const CONVERSATIONS: PartnerConversation[] = [
  {
    id: "curiosity",
    category: "Curiosity & Combining Interests",
    chipLabel: "🎨 Drawing + Science",
    studentMessage: "I like drawing and science. Can I explore both?",
    partnerResponse:
      "Of course! You don't have to choose just one interest. Many exciting creative fields combine both—like scientific illustration, nature game design, and biomimicry! Would you like to try a small creative activity or see 3 pathways that connect art and science?",
    actionText: "Explore an Activity",
    actionHref: "#explorer",
    relatedTips: [
      "No need to pick a narrow track early",
      "Creativity and technology strengthen each other",
    ],
  },
  {
    id: "uncertainty",
    category: "Uncertainty & Low Pressure",
    chipLabel: "🧭 Not Sure What to Learn",
    studentMessage: "I'm not sure what I want to learn next.",
    partnerResponse:
      "That's completely normal—most great discoveries start with not being sure! You don't have to pick a career right now. Let's start with what made you smile recently: did you enjoy building things, reading a story, or being outdoors?",
    actionText: "Try a Discovery Activity",
    actionHref: "#explorer",
    relatedTips: [
      "Every explorer starts without knowing the whole map",
      "One small trial gives more clarity than overthinking",
    ],
  },
  {
    id: "growth",
    category: "Starting Small Projects",
    chipLabel: "🚀 Start a Small Project",
    studentMessage: "Can you help me start a small project?",
    partnerResponse:
      "I'd love to! A great first project takes under 30 minutes: pick a question you find intriguing, build a quick prototype, and note what you enjoyed doing. Ready to see some project sparks?",
    actionText: "Pick a Project Spark",
    actionHref: "#explorer",
    relatedTips: [
      "15–30 minutes is plenty for a first step",
      "Hands-on doing makes learning memorable",
    ],
  },
];

export function MyPartnerPreview() {
  const [selectedId, setSelectedId] = useState<string>("curiosity");
  const conversation =
    CONVERSATIONS.find((c) => c.id === selectedId) || CONVERSATIONS[0];

  return (
    <section
      id="my-partner"
      className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E8E6F3] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>Meet My Partner</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Have a question?{" "}
            <span className="bg-gradient-to-r from-[#6757F5] via-[#8B7FF8] to-[#35B8C5] bg-clip-text text-transparent">
              My Partner
            </span>{" "}
            is here to help.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Explore your ideas, ask questions, and discover a next step that feels right for you.
          </p>
        </div>

        {/* Suggested Question Chips */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#626987]">
            Try an Example Question:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CONVERSATIONS.map((conv) => {
              const isSelected = selectedId === conv.id;
              return (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => setSelectedId(conv.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                    isSelected
                      ? "bg-[#6757F5] text-white shadow-md shadow-[#6757F5]/20 ring-2 ring-[#6757F5]/20 scale-[1.02]"
                      : "bg-white text-[#31364F] hover:bg-[#FAF8FF] border border-[#E8E6F3] hover:border-[#DDD8FE]"
                  }`}
                >
                  <span>{conv.chipLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Chat Canvas Container */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-white border-2 border-[#DDD8FE] shadow-xl overflow-hidden">
          {/* Chat Window Top Bar */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#171A2B] to-[#2B3150] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#6757F5] flex items-center justify-center text-white shadow-sm text-lg">
                🤖
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-white">
                    My Partner
                  </h3>
                  <span className="text-[10px] bg-[#35B8C5]/20 text-[#35B8C5] px-2 py-0.5 rounded-full font-semibold border border-[#35B8C5]/30">
                    Friendly Thinking Companion
                  </span>
                </div>
                <p className="text-[11px] text-white/70">
                  Non-judgmental guidance for every learner
                </p>
              </div>
            </div>

            <span className="text-[11px] bg-white/10 px-2.5 py-1 rounded-full text-white/80 hidden sm:inline">
              Example conversation
            </span>
          </div>

          {/* Conversation Bubbles Canvas */}
          <div className="p-6 sm:p-8 space-y-6 bg-[#FAF9F6]/50 min-h-[300px] flex flex-col justify-between">
            <div className="space-y-4">
              {/* Student Message Bubble (Right aligned) */}
              <div className="flex items-start justify-end gap-3 animate-fadeIn">
                <div className="p-4 rounded-2xl rounded-tr-xs bg-[#6757F5] text-white text-xs sm:text-sm font-medium shadow-sm max-w-md leading-relaxed">
                  {conversation.studentMessage}
                </div>
                <div className="w-8 h-8 rounded-full bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              </div>

              {/* Partner Response Bubble (Left aligned) */}
              <div className="flex items-start gap-3 animate-fadeIn">
                <div className="w-8 h-8 rounded-full bg-[#6757F5] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                  ✨
                </div>
                <div className="space-y-3 max-w-lg">
                  <div className="p-5 rounded-2xl rounded-tl-xs bg-white border border-[#DDD8FE] text-xs sm:text-sm text-[#171A2B] font-normal leading-relaxed shadow-xs">
                    {conversation.partnerResponse}
                  </div>

                  {/* Supportive Quick Principles */}
                  <div className="flex flex-wrap items-center gap-2">
                    {conversation.relatedTips.map((tip) => (
                      <span
                        key={tip}
                        className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg bg-white border border-[#E8E6F3] text-[#626987]"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#35B8C5]" />
                        <span>{tip}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Action Prompt Footer */}
            <div className="pt-4 border-t border-[#E8E6F3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-[#626987]">
                Try the action My Partner suggested:
              </span>

              <Link
                href={conversation.actionHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-[0.98]"
              >
                <span>{conversation.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
