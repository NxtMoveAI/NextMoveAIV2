"use client";

import React, { useState } from "react";
import {
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Bot,
  User,
} from "lucide-react";

interface CompanionDialogue {
  id: string;
  prompt: string;
  partnerResponse: string;
  nurturingFollowUp: string;
  reflectionTheme: string;
}

const PARTNER_DIALOGUES: CompanionDialogue[] = [
  {
    id: "explore-today",
    prompt: "What would you like to explore today?",
    partnerResponse:
      "Whether you're curious about how animated movies are drawn, how plants communicate underground, or why bridges don't collapse—there's no wrong choice today. What caught your eye?",
    nurturingFollowUp:
      "Explore 3 different topics this week just to see which one makes you smile.",
    reflectionTheme: "Open-Ended Curiosity",
  },
  {
    id: "explain-solution",
    prompt: "Can you explain how you solved that?",
    partnerResponse:
      "I love how you broke that puzzle into smaller pieces! Taking time to step back and eliminate what didn't work shows real patience. Walk me through your first hunch.",
    nurturingFollowUp:
      "Explaining your thinking out loud helps your brain remember the strategy for next time.",
    reflectionTheme: "Metacognitive Reflection",
  },
  {
    id: "enjoy-activity",
    prompt: "What did you enjoy about this activity?",
    partnerResponse:
      "Noticing what makes you feel energized while learning is such a superpower! Was it the hands-on building, the sketching, or finding the hidden pattern?",
    nurturingFollowUp:
      "When you know what kind of challenges you enjoy, learning feels like an adventure instead of a chore.",
    reflectionTheme: "Joy of Learning",
  },
  {
    id: "try-different",
    prompt: "Would you like to try something different?",
    partnerResponse:
      "Absolutely! Exploring is all about testing different waters. If logic puzzles felt too dry today, let's jump into character drawing, sound experiments, or kitchen science.",
    nurturingFollowUp:
      "You are never locked into one subject or activity. Variety builds broader thinking.",
    reflectionTheme: "Freedom to Pivot",
  },
  {
    id: "improve-next",
    prompt: "What could you improve next time?",
    partnerResponse:
      "Every scientist, architect, and artist makes drafts that don't work on the first try. That's not a mistake—it's prototype data! What small adjustment would you test on round two?",
    nurturingFollowUp:
      "Growth happens in the second and third drafts. Celebrate the effort you put in today.",
    reflectionTheme: "Iterative Mindset",
  },
];

export function SchoolPartnerSection() {
  const [activeDialogueId, setActiveDialogueId] = useState<string>("explore-today");
  const activeDialogue =
    PARTNER_DIALOGUES.find((d) => d.id === activeDialogueId) || PARTNER_DIALOGUES[0];

  return (
    <section id="my-partner-school" className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F9FA] text-[#269CA8] text-xs font-bold uppercase tracking-wider mb-4 border border-[#CBF0F3] shadow-xs">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Supportive Learning Companion</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            My Partner.{" "}
            <span className="text-[#269CA8]">
              A friendly guide, not a judge.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            A reflective companion that asks thoughtful questions, celebrates genuine effort, and encourages curiosity—without tests, grades, or premature career verdicts.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] border border-[#E8E6F3] text-[11px] text-[#626987] shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#269CA8]" />
            <span>Interactive Demonstration Preview · Full My Partner companion experience requires verified guardian account</span>
          </div>
        </div>

        {/* Main Grid: Interactive Companion Simulation & Ethical Guardrails */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Interactive Dialogue Simulator */}
          <div className="lg:col-span-7 rounded-3xl bg-[#FAF9F6] border-2 border-[#E8E6F3] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E6F3] mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#269CA8] text-white flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#171A2B]">
                    My Partner Reflection Space
                  </h3>
                  <p className="text-[11px] text-[#269CA8] font-semibold">
                    Theme: {activeDialogue.reflectionTheme}
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
                Click a reflection prompt:
              </span>
              <div className="flex flex-wrap gap-2">
                {PARTNER_DIALOGUES.map((d) => {
                  const isCurrent = d.id === activeDialogue.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setActiveDialogueId(d.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 border text-left ${
                        isCurrent
                          ? "bg-[#269CA8] text-white border-[#269CA8] shadow-xs"
                          : "bg-white text-[#474D66] border-[#E8E6F3] hover:border-[#CBF0F3] hover:text-[#171A2B]"
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
                <div className="p-3.5 rounded-2xl rounded-tr-sm bg-[#269CA8] text-white text-xs sm:text-sm font-medium max-w-md shadow-xs">
                  <p>&ldquo;{activeDialogue.prompt}&rdquo;</p>
                </div>
                <div className="w-7 h-7 rounded-lg bg-[#E8F9FA] text-[#269CA8] flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              </div>

              {/* My Partner Bubble */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl rounded-tl-sm bg-white border border-[#E8E6F3] text-xs sm:text-sm text-[#171A2B] leading-relaxed max-w-lg shadow-xs">
                  <p className="text-[#171A2B]">{activeDialogue.partnerResponse}</p>

                  <div className="mt-3 pt-3 border-t border-[#F0EEF8] flex items-center gap-2 text-[11px] text-[#269CA8] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Next Move Insight: {activeDialogue.nurturingFollowUp}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Right Column: Educational Safeguards & Strict Boundaries */}
          <div className="lg:col-span-5 space-y-6">
            {/* What My Partner DOES */}
            <div className="p-6 rounded-3xl bg-white border-2 border-[#E8E6F3] shadow-xs">
              <h3 className="text-sm font-extrabold text-[#171A2B] uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>How My Partner Supports Students</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#474D66]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span><strong>Asks reflective questions</strong> that help learners think about what they enjoyed and how they solved puzzles.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span><strong>Celebrates creative iterations</strong> instead of penalizing mistakes or wrong answers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span><strong>Encourages multi-subject curiosity</strong> across science, arts, logic, and stories without stream pressure.</span>
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
                  <span><strong>Never says:</strong> <em>&ldquo;You are destined to become an engineer.&rdquo;</em> We never pigeonhole children into careers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#EF4444] font-bold">✗</span>
                  <span><strong>Never says:</strong> <em>&ldquo;Your intelligence score is 94%.&rdquo;</em> We do not calculate fake IQ or aptitude percentages.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#EF4444] font-bold">✗</span>
                  <span><strong>Never says:</strong> <em>&ldquo;You are unsuitable for science.&rdquo;</em> Curiosity is open to every learner, always.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
