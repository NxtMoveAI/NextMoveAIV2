"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";

interface PartnerConversation {
  id: string;
  category: string;
  chipLabel: string;
  studentMessage: string;
  partnerResponse: string;
  actionText: string;
  actionHref: string;
  takeawayTip: string;
}

const CONVERSATIONS: PartnerConversation[] = [
  {
    id: "curiosity",
    category: "Combining Interests",
    chipLabel: "🎨 Drawing + Science",
    studentMessage: "I like drawing and biology. Can I explore both together?",
    partnerResponse:
      "Yes, absolutely! You don't have to pick just one. Creative fields like medical animation, science comic design, and nature game art blend both beautifully. Would you like to try a 15-minute creative activity or see 3 real career pathways?",
    actionText: "Try a Creative Activity",
    actionHref: "#explorer",
    takeawayTip: "You never have to force yourself into a single narrow box.",
  },
  {
    id: "uncertainty",
    category: "Starting Out",
    chipLabel: "🧭 Not Sure What to Learn",
    studentMessage: "I'm not sure what I want to learn next. Is that okay?",
    partnerResponse:
      "That is completely normal! Every great explorer begins without knowing the whole map. You don't need a life plan today—let's just pick one small question that makes you curious and build something fun.",
    actionText: "Explore Discovery Sparks",
    actionHref: "#explorer",
    takeawayTip: "Trying one small activity gives more clarity than overthinking.",
  },
  {
    id: "growth",
    category: "Small Projects",
    chipLabel: "🚀 Start a Small Project",
    studentMessage: "Can you help me start a small project this weekend?",
    partnerResponse:
      "I'd love to! A great first project takes under 30 minutes: pick an idea you enjoy, build a quick prototype, and note what you liked doing. Ready to choose a project spark?",
    actionText: "Pick a Project Spark",
    actionHref: "#explorer",
    takeawayTip: "Small hands-on projects create lasting confidence.",
  },
];

// Consistent Friendly Companion Character Avatar (SVG)
function CompanionAvatar({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 select-none"
      aria-label="My Partner Assistant Avatar"
    >
      <defs>
        <linearGradient id="mp-avatar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B7FF8" />
          <stop offset="100%" stopColor="#5342E8" />
        </linearGradient>
        <filter id="mp-glow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#6757F5" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Companion Head/Body Orb */}
      <circle cx="32" cy="35" r="23" fill="url(#mp-avatar-grad)" filter="url(#mp-glow)" />

      {/* Gentle Antenna Spark */}
      <line x1="32" y1="12" x2="32" y2="4" stroke="#8B7FF8" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="4" r="3.5" fill="#FBBF24" />

      {/* Soft Inner Face Area */}
      <ellipse cx="32" cy="36" rx="17" ry="15" fill="#FAF9F6" />

      {/* Expressive Friendly Eyes */}
      <circle cx="26" cy="34" r="2.8" fill="#171A2B" />
      <circle cx="27" cy="33" r="1" fill="#FFFFFF" />
      <circle cx="38" cy="34" r="2.8" fill="#171A2B" />
      <circle cx="39" cy="33" r="1" fill="#FFFFFF" />

      {/* Warm Rosy Cheeks */}
      <circle cx="22" cy="39" r="2.5" fill="#F4A896" fillOpacity="0.7" />
      <circle cx="42" cy="39" r="2.5" fill="#F4A896" fillOpacity="0.7" />

      {/* Happy Smile */}
      <path d="M28 40 Q 32 44 36 40" stroke="#171A2B" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// Student Character Avatar (SVG)
function StudentAvatar({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 select-none"
      aria-label="Student Avatar"
    >
      <circle cx="32" cy="32" r="28" fill="#FAF9F6" stroke="#DDD8FE" strokeWidth="2" />
      <ellipse cx="32" cy="30" rx="15" ry="16" fill="#C58C65" />
      {/* Hair */}
      <path d="M19 28 C 19 16, 26 14, 32 14 C 38 14, 45 16, 45 28 C 43 25, 40 24, 37 24 C 33 24, 32 26, 30 26 C 27 26, 24 24, 21 25 Z" fill="#2D2327" />
      <circle cx="27" cy="30" r="1.8" fill="#1E171A" />
      <circle cx="37" cy="30" r="1.8" fill="#1E171A" />
      <path d="M29 36 Q 32 39 35 36" stroke="#1E171A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Shirt */}
      <path d="M16 56 C 16 46, 22 42, 32 42 C 42 42, 48 46, 48 56 Z" fill="#6757F5" />
    </svg>
  );
}

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
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
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

        {/* Conversational Window Container */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-white border-2 border-[#DDD8FE] p-6 sm:p-8 lg:p-10 shadow-lg shadow-[#6757F5]/5">
          {/* Header Bar of Chat Window */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#F0EEF8]">
            <div className="flex items-center gap-3">
              <CompanionAvatar size={42} />
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-[#171A2B] flex items-center gap-1.5">
                  <span>My Partner</span>
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                </h3>
                <p className="text-[11px] text-[#626987]">
                  Friendly AI Learning Companion · Always encouraging
                </p>
              </div>
            </div>

            <span className="text-[11px] font-semibold text-[#6757F5] bg-[#EDEAFF] px-2.5 py-1 rounded-full border border-[#DDD8FE]">
              {conversation.category}
            </span>
          </div>

          {/* Interactive Chat Dialogue Stream */}
          <div className="space-y-5 mb-6">
            {/* Student Message */}
            <div className="flex items-start justify-end gap-3">
              <div className="max-w-md bg-[#6757F5] text-white rounded-2xl rounded-tr-xs p-4 sm:p-5 shadow-sm text-sm sm:text-base leading-relaxed">
                <p>{conversation.studentMessage}</p>
              </div>
              <StudentAvatar size={38} />
            </div>

            {/* My Partner Response */}
            <div className="flex items-start gap-3">
              <CompanionAvatar size={38} />
              <div className="max-w-lg bg-[#FAF9F6] border border-[#DDD8FE] text-[#171A2B] rounded-2xl rounded-tl-xs p-4 sm:p-5 shadow-xs text-sm sm:text-base leading-relaxed space-y-3">
                <p>{conversation.partnerResponse}</p>

                {/* Helpful Takeaway Tag */}
                <div className="p-3 rounded-xl bg-white border border-[#E8E6F3] text-xs text-[#626987]">
                  <strong className="text-[#6757F5] block mb-0.5">Friendly Reflection:</strong>
                  <span>{conversation.takeawayTip}</span>
                </div>

                {/* Single Clear Next-Action Button */}
                <div className="pt-2">
                  <Link
                    href={conversation.actionHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] text-white text-xs sm:text-sm font-bold hover:bg-[#5342E8] shadow-sm transition-all"
                  >
                    <span>{conversation.actionText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Prominent Example Disclosure */}
          <div className="pt-4 border-t border-[#F0EEF8] flex items-center justify-between text-xs text-[#626987]">
            <div className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#6757F5]" />
              <span>
                Illustrative sample conversation · Not connected to live student accounts or active AI chat
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
