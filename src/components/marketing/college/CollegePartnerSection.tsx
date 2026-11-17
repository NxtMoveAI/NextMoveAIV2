"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface CollegeDialogue {
  id: string;
  prompt: string;
  partnerResponse: string;
  strategicInsight: string;
  theme: string;
}

const COLLEGE_DIALOGUES: CollegeDialogue[] = [
  {
    id: "understand-python",
    prompt: "What do you already understand about Python?",
    partnerResponse:
      "Before we tackle complex async libraries, let's calibrate: Can you write a function from scratch that parses a dictionary of student grades and returns only passing scores? Testing fundamental syntax logic first ensures you won't get stuck on syntax errors later.",
    strategicInsight: "Anchoring your baseline prevents frustrating leaps into overly complex frameworks.",
    theme: "Baseline Calibration",
  },
  {
    id: "simpler-problem",
    prompt: "Would you like to try a simpler problem?",
    partnerResponse:
      "Stepping back to a simpler model is what principal engineers do constantly! Let's isolate the algorithm into a 10-line prototype with hardcoded values before hooking up dynamic inputs. What is the single core calculation we need to test first?",
    strategicInsight: "Decomposing complex problems into minimal reproducible examples builds mastery.",
    theme: "Problem Decomposition",
  },
  {
    id: "difficult-task",
    prompt: "What did you find difficult in this task?",
    partnerResponse:
      "Pinpointing the exact point of confusion is half the battle. Was it managing asynchronous event timing, setting up database keys, or interpreting the error stack trace? Let's analyze that specific log together.",
    strategicInsight: "Identifying the precise friction point turns vague frustration into actionable debugging.",
    theme: "Targeted Debugging",
  },
  {
    id: "explain-solution",
    prompt: "Can you explain why your solution works?",
    partnerResponse:
      "Writing code that runs is great, but technical interviews evaluate whether you can defend your trade-offs: Why did you choose a hash map over an array? What is the memory complexity if your input scales to 50,000 items?",
    strategicInsight: "Articulating architectural trade-offs is what separates juniors from senior candidates.",
    theme: "Architectural Defense",
  },
  {
    id: "compare-direction",
    prompt: "Would you like to compare another direction?",
    partnerResponse:
      "Exploring alternatives is smart. If building visual web interfaces felt tedious, let's explore Data Analytics or Process Operations. The logical thinking you practised transfers directly across disciplines.",
    strategicInsight: "Skills compound across domains—you never start from zero when exploring alternatives.",
    theme: "Cross-Disciplinary Transfer",
  },
  {
    id: "skill-next",
    prompt: "What practical skill might you work on next?",
    partnerResponse:
      "Now that your micro-service handles valid inputs, the most valuable next capability is error resilience: How does your service behave when the database goes offline for 10 seconds? Let's add graceful retry logic.",
    strategicInsight: "Handling failure modes is what differentiates amateur scripts from production tools.",
    theme: "Progressive Capability",
  },
];

export function CollegePartnerSection() {
  const [selectedDialogueId, setSelectedDialogueId] = useState<string>("understand-python");
  const activeDialogue =
    COLLEGE_DIALOGUES.find((d) => d.id === selectedDialogueId) || COLLEGE_DIALOGUES[0];

  return (
    <section id="my-partner-college" className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Learning &amp; Decision Support</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            My Partner.{" "}
            <span className="text-[#6757F5]">
              A thinking companion, not a ghostwriter.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            A reflection companion that challenges your assumptions, prompts architectural thinking, and helps you make independent decisions—without generating your code or handing out fake certificates.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] border border-[#E8E6F3] text-[11px] text-[#626987] shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>Interactive Demonstration Preview · Evaluates mental models without storing personal data</span>
          </div>
        </div>

        {/* Main Grid: Interactive Companion Dialogue & Companion Boundaries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left: Interactive Dialogue Simulator */}
          <div className="lg:col-span-7 rounded-3xl bg-[#FAF9F6] border-2 border-[#E8E6F3] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E6F3] mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#6757F5] text-white flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#171A2B]">
                    My Partner College Workspace
                  </h3>
                  <p className="text-[11px] text-[#6757F5] font-semibold">
                    Focus: {activeDialogue.theme}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-white border border-[#E8E6F3] text-[#626987]">
                Live Interactive Demo
              </span>
            </div>

            {/* Prompt Selector Pills */}
            <div className="mb-6">
              <span className="text-[11px] font-bold text-[#626987] uppercase tracking-wider block mb-2">
                Select an inquiry prompt:
              </span>
              <div className="flex flex-wrap gap-2">
                {COLLEGE_DIALOGUES.map((d) => {
                  const isCurrent = d.id === activeDialogue.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDialogueId(d.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border text-left ${
                        isCurrent
                          ? "bg-[#6757F5] text-white border-[#6757F5] shadow-xs"
                          : "bg-white text-[#474D66] border-[#E8E6F3] hover:border-[#DDD8FE] hover:text-[#171A2B]"
                      }`}
                    >
                      &ldquo;{d.prompt}&rdquo;
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulated Chat Dialogue */}
            <div className="space-y-4">
              {/* User Bubble */}
              <div className="flex items-start gap-3 justify-end">
                <div className="p-3.5 rounded-2xl rounded-tr-sm bg-[#6757F5] text-white text-xs sm:text-sm font-medium max-w-md shadow-xs">
                  <p>&ldquo;{activeDialogue.prompt}&rdquo;</p>
                </div>
                <div className="w-7 h-7 rounded-lg bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              </div>

              {/* My Partner Bubble */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl rounded-tl-sm bg-white border border-[#E8E6F3] text-xs sm:text-sm text-[#171A2B] leading-relaxed max-w-lg shadow-xs">
                  <p>{activeDialogue.partnerResponse}</p>

                  <div className="mt-3 pt-3 border-t border-[#F0EEF8] flex items-center gap-2 text-[11px] text-[#6757F5] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Strategic Takeaway: {activeDialogue.strategicInsight}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Educational Boundaries Matrix */}
          <div className="lg:col-span-5 space-y-6">
            {/* What My Partner DOES */}
            <div className="p-6 rounded-3xl bg-white border-2 border-[#E8E6F3] shadow-xs">
              <h3 className="text-sm font-extrabold text-[#171A2B] uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>How My Partner Supports College Learners</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#474D66]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span><strong>Asks Socratic questions</strong> that push you to understand underlying mechanisms and algorithms rather than blindly copy-pasting.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span><strong>Encourages problem decomposition</strong> when tasks feel overwhelming, breaking them down into minimal reproducible tests.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span><strong>Guides trade-off evaluation</strong> across different technologies, degree routes, and career directions.</span>
                </li>
              </ul>
            </div>

            {/* What My Partner NEVER DOES */}
            <div className="p-6 rounded-3xl bg-[#FEF2F2] border-2 border-[#FECACA] shadow-xs">
              <h3 className="text-sm font-extrabold text-[#991B1B] uppercase tracking-wider mb-4 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-[#EF4444]" />
                <span>What My Partner Never Does</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#7F1D1D]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#EF4444] font-bold">✗</span>
                  <span><strong>Never ghostwrites complete project code</strong> to bypass genuine learning. True capability requires doing the thinking yourself.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#EF4444] font-bold">✗</span>
                  <span><strong>Never awards automated &ldquo;100% job-ready&rdquo; scores</strong>. Hiring depends on comprehensive portfolio review and interview defense.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#EF4444] font-bold">✗</span>
                  <span><strong>Never makes unilateral career decrees</strong> or pressures students into software engineering if their interests lie in finance, design, or operations.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
