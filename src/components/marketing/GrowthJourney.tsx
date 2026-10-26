"use client";

import React from "react";
import {
  Sparkles,
  Compass,
  FlaskConical,
  Hammer,
  MessageSquareHeart,
  TrendingUp,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export function GrowthJourney() {
  const growthTimeline = [
    {
      step: "01",
      title: "Explore",
      subtitle: "Map Possibilities",
      icon: Compass,
      color: "#6757F5",
      description:
        "Investigate streams, college options, and emerging domains without immediate commitment or pressure.",
    },
    {
      step: "02",
      title: "Try",
      subtitle: "15-Min Micro-Trials",
      icon: FlaskConical,
      color: "#35B8C5",
      description:
        "Experience short practical tasks—write a script, audit a policy, build an API—before spending months of study.",
    },
    {
      step: "03",
      title: "Build",
      subtitle: "Verifiable Projects",
      icon: Hammer,
      color: "#7C6BF8",
      description:
        "Create real portfolio evidence: GitHub repositories, design case studies, or scientific reports.",
    },
    {
      step: "04",
      title: "Reflect",
      subtitle: "Private Journaling",
      icon: MessageSquareHeart,
      color: "#171A2B",
      description:
        "Note what energized you, what felt stressful, and what you want to adjust in your roadmap.",
    },
    {
      step: "05",
      title: "Grow",
      subtitle: "Evolving Student Profile",
      icon: TrendingUp,
      color: "#35B8C5",
      description:
        "Your profile evolves with you throughout school and college, capturing authentic demonstrated capability.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Continuous Growth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A2B] tracking-tight">
            Your journey doesn’t end with one decision.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#31364F] leading-relaxed">
            Interests evolve. New industries emerge. Skills compound. Next Move AI is built
            to be your lifelong thinking partner, not a one-time questionnaire.
          </p>
        </div>

        {/* 5-Step Continuous Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative mb-12">
          {growthTimeline.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.title}
                className="p-5 rounded-3xl bg-[#FAF9F6] border border-[#E8E6F3] hover:border-[#6757F5]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#6757F5] bg-[#EDEAFF] px-2 py-0.5 rounded-md">
                      Stage {item.step}
                    </span>
                    <div className="p-2 rounded-xl bg-white text-[#6757F5] border border-[#E8E6F3]">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#171A2B] mb-0.5">
                    {item.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#626987] block mb-2">
                    {item.subtitle}
                  </span>
                  <p className="text-xs text-[#626987] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E6F3] text-[11px] font-semibold text-[#6757F5] flex items-center justify-between">
                  <span>Student Centered</span>
                  <span>&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Philosophy Contrast: Authentic Evidence vs Fake Percentages */}
        <div className="rounded-3xl bg-[#FAF9F6] border border-[#DDD8FE] p-6 sm:p-8 lg:p-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#171A2B]">
              Why We Reject Artificial &ldquo;Fit&rdquo; Percentages
            </h3>
            <p className="text-xs sm:text-sm text-[#626987] mt-1">
              Many edtech portals show students made-up numbers like &ldquo;87% Medical Fit&rdquo; to sell
              courses. Here is how Next Move AI does things differently:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Way */}
            <div className="p-6 rounded-2xl bg-white border border-[#FCDAD7] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D93829]">
                <XCircle className="w-4 h-4" />
                <span>The Industry Old Way</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#31364F]">
                <li className="flex items-start gap-2">
                  <span className="text-[#D93829] font-bold">✕</span>
                  <span>Arbitrary &ldquo;92% Career Match&rdquo; based on 20 quiz questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D93829] font-bold">✕</span>
                  <span>Premature career pigeonholing in Class 6 or Class 8</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D93829] font-bold">✕</span>
                  <span>Manipulative daily streaks and artificial urgency notifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D93829] font-bold">✕</span>
                  <span>Sponsored recommendations pushing private partner degrees</span>
                </li>
              </ul>
            </div>

            {/* The Next Move AI Way */}
            <div className="p-6 rounded-2xl bg-[#F6F4FF] border border-[#6757F5]/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6757F5]">
                <CheckCircle2 className="w-4 h-4 text-[#35B8C5]" />
                <span>The Next Move AI Standard</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#171A2B]">
                <li className="flex items-start gap-2">
                  <span className="text-[#35B8C5] font-bold">✓</span>
                  <span>Verifiable evidence: actual code, sketches, and 15-min trial notes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#35B8C5] font-bold">✓</span>
                  <span>Broad curiosity and multiple parallel pathways encouraged</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#35B8C5] font-bold">✓</span>
                  <span>Calm, respectful workspace without addictive gamification traps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#35B8C5] font-bold">✓</span>
                  <span>100% objective data from official UGC, AICTE, and university portals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
