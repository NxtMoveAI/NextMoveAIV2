"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

interface SocraticPrompt {
  id: string;
  question: string;
  category: string;
  founderContext: string;
  sampleUserThought: string;
  simulatedPartnerResponse: string;
}

const SOCRATIC_PROMPTS: SocraticPrompt[] = [
  {
    id: "existing-experience",
    question: "What experience do you already have?",
    category: "Baseline Inventory",
    founderContext:
      "Most professionals overlook the depth of their daily execution. We help you catalog the real judgment you exercise every week.",
    sampleUserThought:
      "I’ve spent 4 years coordinating logistics between 12 regional warehouses, dealing with unexpected transport delays and angry branch managers.",
    simulatedPartnerResponse:
      "That is not merely 'clerical logistics.' That is high-stakes crisis mediation, distributed inventory triage, and vendor relationship management. Those exact capabilities form the bedrock of technical operations and supply-chain product management.",
  },
  {
    id: "transferable-capabilities",
    question: "Which capabilities could be transferable?",
    category: "Skill Adjacency",
    founderContext:
      "Transferable skills are not generic buzzwords. They are specific cognitive methods that solve problems in multiple industries.",
    sampleUserThought:
      "I know how to write clear step-by-step SOPs and reconcile monthly billing errors in spreadsheets.",
    simulatedPartnerResponse:
      "SOP writing translates directly to Systems Documentation and Workflow Architecture. Billing reconciliation proves data audit integrity. You are far closer to business operations analysis than someone who only knows theoretical tool syntax.",
  },
  {
    id: "work-to-explore",
    question: "What type of work would you like to explore?",
    category: "Directional Clarity",
    founderContext:
      "Many people say 'I want to enter tech' because of hype. We help you isolate which actual daily tasks you find energizing.",
    sampleUserThought:
      "I want to explore work where I can solve operational problems using data, but I don't want to write pure backend server code all day.",
    simulatedPartnerResponse:
      "That points toward Business Intelligence, Revenue Operations, or Solutions Consulting. In those roles, business acumen and stakeholder translation are 70% of the value; writing analytical queries is just the tool.",
  },
  {
    id: "transition-constraints",
    question: "What constraints matter when considering a professional transition?",
    category: "Real-Life Feasibility",
    founderContext:
      "Ignoring family commitments, financial buffers, and shift schedules leads to burnt-out learners and abandoned goals.",
    sampleUserThought:
      "I have a family to support and can only invest 5 hours a week in the evenings without risking my current job performance.",
    simulatedPartnerResponse:
      "A 5-hour weekly budget is completely workable if you focus on 1 applied project rather than a 40-hour video course. We design self-directed sprints that respect your financial responsibilities.",
  },
  {
    id: "try-before-committing",
    question: "What could you try before committing to an expensive training program?",
    category: "Cost & Risk Mitigation",
    founderContext:
      "Private bootcamps charge huge fees upfront before students even know if they like the work. Always build a proof-of-concept trial first.",
    sampleUserThought:
      "A bootcamp wants ₹1,50,000 for a 6-month full-stack course. Should I enroll immediately?",
    simulatedPartnerResponse:
      "Try a free 20-minute data or workflow trial first. Build a minimal spreadsheet tool or inspect a real API response on your computer. If you find the problem-solving tedious, you just saved yourself months of tuition and frustration.",
  },
  {
    id: "evaluate-suitability",
    question: "How would you evaluate whether the new direction suits your circumstances?",
    category: "Decision Framework",
    founderContext:
      "Career choices must balance cognitive interest, regional market demand, long-term sustainability, and lifestyle.",
    sampleUserThought:
      "How do I know if this role transition makes sense for my city and 5-year goals?",
    simulatedPartnerResponse:
      "Evaluate through three lenses: 1) Does your regional market hire for this role or are remote opportunities stable? 2) Does the daily work energize you? 3) Does it build compounding capital rather than a temporary trend?",
  },
];

export function ProfessionalPartnerSection() {
  const [activePromptId, setActivePromptId] = useState<string>("existing-experience");
  const [customUserNote, setCustomUserNote] = useState<string>("");
  const [noteSubmitted, setNoteSubmitted] = useState<boolean>(false);

  const activePrompt =
    SOCRATIC_PROMPTS.find((p) => p.id === activePromptId) || SOCRATIC_PROMPTS[0];

  const handlePromptSelect = (id: string) => {
    setActivePromptId(id);
    setCustomUserNote("");
    setNoteSubmitted(false);
  };

  return (
    <section id="professional-partner" className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DBEAFE] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Reflective Learning Companion</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            My Partner for{" "}
            <span className="text-[#2563EB]">
              experienced professionals.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Most career tools pretend to predict your entire future with black-box algorithms. My Partner takes a Socratic approach: asking probing questions that help you clarify what you know, what constraints matter, and what step makes sense next.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E6F3] text-[11px] text-[#626987] shadow-xs">
            <AlertCircle className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Future Experience Preview · Socratic reflection model · Not an automated placement adviser</span>
          </div>
        </div>

        {/* 6 Socratic Prompts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {SOCRATIC_PROMPTS.map((prompt) => {
            const isSelected = prompt.id === activePromptId;

            return (
              <button
                key={prompt.id}
                onClick={() => handlePromptSelect(prompt.id)}
                className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  isSelected
                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-[#2563EB]/20 scale-[1.02]"
                    : "bg-white text-[#474D66] border-[#E8E6F3] hover:border-[#BFDBFE] hover:text-[#171A2B]"
                }`}
              >
                <div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-2 ${
                      isSelected ? "bg-white/20 text-white" : "bg-[#EFF6FF] text-[#2563EB]"
                    }`}
                  >
                    {prompt.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold leading-snug">
                    {prompt.question}
                  </h4>
                </div>

                <div
                  className={`mt-3 pt-2 border-t flex items-center justify-between text-[11px] font-semibold ${
                    isSelected ? "border-blue-400 text-blue-100" : "border-[#F0EEF8] text-[#2563EB]"
                  }`}
                >
                  <span>Explore Perspective</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Conversation Dialogue Box */}
        <div className="rounded-3xl bg-white border-2 border-[#DBEAFE] p-6 sm:p-8 lg:p-10 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F0EEF8] mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                  Socratic Exploration · {activePrompt.category}
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#171A2B]">
                  &ldquo;{activePrompt.question}&rdquo;
                </h3>
              </div>
            </div>

            <span className="text-[11px] text-[#7B82A0]">
              {activePrompt.founderContext}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Sample Thought & Socratic Response */}
            <div className="lg:col-span-7 space-y-4">
              {/* Learner Perspective */}
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#171A2B] text-white flex items-center justify-center text-[10px] font-bold">
                    You
                  </div>
                  <span className="text-xs font-bold text-[#171A2B]">
                    Professional Experience Reflection:
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#474D66] italic leading-relaxed pl-8">
                  &ldquo;{activePrompt.sampleUserThought}&rdquo;
                </p>
              </div>

              {/* My Partner Perspective */}
              <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-[10px] font-bold">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-bold text-[#1E40AF]">
                    My Partner Socratic Re-framing:
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#1E40AF] leading-relaxed pl-8 font-medium">
                  {activePrompt.simulatedPartnerResponse}
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Note Sandbox */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-[#FAF9F6] border-2 border-[#E8E6F3] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#171A2B] uppercase tracking-wider block mb-2">
                  Test With Your Own Circumstances:
                </span>

                {!noteSubmitted ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (customUserNote.trim()) setNoteSubmitted(true);
                    }}
                    className="space-y-2.5"
                  >
                    <textarea
                      rows={3}
                      value={customUserNote}
                      onChange={(e) => setCustomUserNote(e.target.value)}
                      placeholder={`Reflect on: ${activePrompt.question}`}
                      className="w-full text-xs p-3 rounded-xl border border-[#D5D8E2] bg-white text-[#171A2B] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                    />
                    <button
                      type="submit"
                      disabled={!customUserNote.trim()}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold hover:bg-[#1D4ED8] transition-colors disabled:opacity-40"
                    >
                      <span>Simulate Reflection</span>
                      <Sparkles className="w-3 h-3" />
                    </button>
                  </form>
                ) : (
                  <div className="space-y-2.5 animate-fade-in">
                    <div className="p-3 rounded-xl bg-white border border-[#DBEAFE] text-xs text-[#1E40AF]">
                      <span className="text-[10px] font-bold uppercase tracking-wider block mb-1 text-[#2563EB]">
                        My Partner Perspective on Your Note:
                      </span>
                      <p className="italic mb-2">&ldquo;{customUserNote}&rdquo;</p>
                      <p className="leading-relaxed font-medium">
                        By naming your specific reality, you move past generic career advice and begin designing a path anchored in your authentic daily circumstances.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setCustomUserNote("");
                        setNoteSubmitted(false);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#626987] hover:text-[#171A2B]"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset note</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8E6F3] text-[10px] text-[#7B82A0]">
                Client-side preview · Does not save or share personal reflections
              </div>
            </div>
          </div>
        </div>

        {/* Ethical Companion Guardrails */}
        <div className="max-w-4xl mx-auto p-5 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <p className="text-xs text-[#626987] leading-relaxed">
              <strong>My Partner Ethical Guardrails:</strong> My Partner is a reflective inquiry companion, not an automated resume ghostwriter, artificial intelligence recruiter, or placement broker. It does not replace qualified human mentors or legal career agreements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
