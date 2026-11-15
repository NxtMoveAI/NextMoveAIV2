"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Compass,
  Wrench,
  CheckSquare,
  ArrowRight,
  Check,
  CheckCircle2,
} from "lucide-react";

type PreviewTab = "explore" | "try" | "plan";

export function ExperiencePreviews() {
  const [activeTab, setActiveTab] = useState<PreviewTab>("explore");

  // Preview 1: Selected Curiosity
  const [selectedInterest, setSelectedInterest] = useState<string>("creative-tech");

  // Preview 2: Selected Mini Activity
  const [selectedTryActivity, setSelectedTryActivity] = useState<string>("storyboard");

  // Preview 3: Interactive Learning Plan Checklist
  const [planTasks, setPlanTasks] = useState([
    {
      id: "task-1",
      title: "Discover an intriguing spark",
      desc: "Picked creative character design & storytelling after watching a 5-min tutorial.",
      done: true,
    },
    {
      id: "task-2",
      title: "Try a quick hands-on trial",
      desc: "Sketched 3 character facial expressions and colored one with digital palette.",
      done: true,
    },
    {
      id: "task-3",
      title: "Reflect and talk with family",
      desc: "Share your sketch at dinner and note what parts felt exciting to build.",
      done: false,
    },
  ]);

  const togglePlanTask = (id: string) => {
    setPlanTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const completedCount = planTasks.filter((t) => t.done).length;

  return (
    <section
      id="experiences"
      className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>Interactive Platform Previews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            See what you can do with{" "}
            <span className="bg-gradient-to-r from-[#6757F5] via-[#8B7FF8] to-[#35B8C5] bg-clip-text text-transparent">
              Next Move AI.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Explore ideas, try activities, and turn discoveries into your next step.
          </p>
        </div>

        {/* 3 Core Experience Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <div
            role="tablist"
            aria-label="Platform Experience Previews"
            className="p-1.5 rounded-2xl bg-[#F0EEF8] border border-[#DDD8FE] inline-flex items-center gap-1.5 shadow-inner"
          >
            <button
              type="button"
              role="tab"
              id="preview-tab-explore"
              aria-selected={activeTab === "explore"}
              aria-controls="preview-panel-explore"
              onClick={() => setActiveTab("explore")}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "explore"
                  ? "bg-white text-[#6757F5] shadow-md shadow-[#6757F5]/10"
                  : "text-[#626987] hover:text-[#171A2B]"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>1. Explore an Interest</span>
            </button>

            <button
              type="button"
              role="tab"
              id="preview-tab-try"
              aria-selected={activeTab === "try"}
              aria-controls="preview-panel-try"
              onClick={() => setActiveTab("try")}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "try"
                  ? "bg-white text-[#6757F5] shadow-md shadow-[#6757F5]/10"
                  : "text-[#626987] hover:text-[#171A2B]"
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>2. Try Something New</span>
            </button>

            <button
              type="button"
              role="tab"
              id="preview-tab-plan"
              aria-selected={activeTab === "plan"}
              aria-controls="preview-panel-plan"
              onClick={() => setActiveTab("plan")}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "plan"
                  ? "bg-white text-[#6757F5] shadow-md shadow-[#6757F5]/10"
                  : "text-[#626987] hover:text-[#171A2B]"
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>3. Plan Your Next Step</span>
            </button>
          </div>
        </div>

        {/* The Display Showcase Area */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#FAF9F6] border-2 border-[#DDD8FE] p-6 sm:p-8 lg:p-10 shadow-lg shadow-[#6757F5]/5">
          {/* TAB 1: EXPLORE AN INTEREST */}
          {activeTab === "explore" && (
            <div id="preview-panel-explore" role="tabpanel" aria-labelledby="preview-tab-explore" className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E6F3]">
                <div>
                  <span className="text-xs font-bold text-[#6757F5] uppercase tracking-wider block mb-1">
                    Preview 1 · Explore an Interest
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#171A2B]">
                    Pick an interest to view real creative examples
                  </h3>
                </div>
                <span className="text-xs text-[#626987] bg-white px-3 py-1 rounded-full border border-[#E8E6F3] self-start sm:self-auto font-medium">
                  Illustrative sample
                </span>
              </div>

              {/* 4 Clean Curiosity Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "creative-tech", label: "🎨 Creative Arts", desc: "Animation & Design" },
                  { id: "nature-science", label: "🌿 Nature Lab", desc: "Plants & Ecology" },
                  { id: "code-making", label: "🤖 Maker Project", desc: "Robotics & Circuits" },
                  { id: "community-stories", label: "📢 Stories & Media", desc: "Podcasts & Writing" },
                ].map((item) => {
                  const isSelected = selectedInterest === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedInterest(item.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "bg-[#6757F5] text-white border-[#5342E8] shadow-md shadow-[#6757F5]/20 scale-[1.02]"
                          : "bg-white border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF] hover:border-[#DDD8FE]"
                      }`}
                    >
                      <strong className="text-xs sm:text-sm font-bold block leading-snug">
                        {item.label}
                      </strong>
                      <span className={`text-[11px] block mt-0.5 ${isSelected ? "text-white/80" : "text-[#626987]"}`}>
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* One Prominent Visual Work Example Showcase */}
              <div className="p-6 rounded-2xl bg-white border border-[#DDD8FE] shadow-xs">
                {selectedInterest === "creative-tech" && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Visual Storyboard Mockup */}
                    <div className="md:col-span-7 bg-[#FAF8FF] rounded-xl p-4 border border-[#EDEAFF]">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#EDEAFF]">
                        <span className="text-xs font-bold text-[#6757F5]">Project: 3-Frame Storyboard</span>
                        <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#DDD8FE] text-[#626987]">Scene Draft</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="aspect-4/3 bg-white rounded-lg border border-[#DDD8FE] p-2 flex flex-col justify-between">
                          <span className="text-[10px] font-mono text-gray-400">Frame 01</span>
                          <div className="w-full h-8 bg-[#EDEAFF] rounded flex items-center justify-center text-xs">🚀 Launch</div>
                          <span className="text-[9px] text-[#626987]">Rocket lifts off</span>
                        </div>
                        <div className="aspect-4/3 bg-white rounded-lg border border-[#DDD8FE] p-2 flex flex-col justify-between">
                          <span className="text-[10px] font-mono text-gray-400">Frame 02</span>
                          <div className="w-full h-8 bg-[#E0F7FA] rounded flex items-center justify-center text-xs">🪐 Orbit</div>
                          <span className="text-[9px] text-[#626987]">Approaching Mars</span>
                        </div>
                        <div className="aspect-4/3 bg-white rounded-lg border border-[#DDD8FE] p-2 flex flex-col justify-between">
                          <span className="text-[10px] font-mono text-gray-400">Frame 03</span>
                          <div className="w-full h-8 bg-[#FEF3C7] rounded flex items-center justify-center text-xs">✨ Discovery</div>
                          <span className="text-[9px] text-[#626987]">Beacon found</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-[#EDEAFF] text-[11px] text-[#626987]">
                        <span>Palette:</span>
                        <div className="flex gap-1.5">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#6757F5]" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#35B8C5]" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#F59E0B]" />
                        </div>
                      </div>
                    </div>

                    {/* Explanatory Details */}
                    <div className="md:col-span-5 space-y-3">
                      <span className="text-xs font-bold text-[#6757F5] uppercase tracking-wider">Visual Arts & Media</span>
                      <h4 className="text-lg font-black text-[#171A2B]">Storyboarding & Animation</h4>
                      <p className="text-xs sm:text-sm text-[#626987] leading-relaxed">
                        Visualizing scenes frame-by-frame is how animators, directors, and game developers build entire fictional worlds.
                      </p>
                      <div className="pt-2">
                        <Link
                          href="#explorer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] hover:text-[#5342E8]"
                        >
                          <span>Explore similar creative sparks</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {selectedInterest === "nature-science" && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Miniature Field Observation Log */}
                    <div className="md:col-span-7 bg-[#F0FDF4] rounded-xl p-4 border border-[#DCFCE7]">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#DCFCE7]">
                        <span className="text-xs font-bold text-[#047857]">Field Log: Sunflower Sprout</span>
                        <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#A7F3D0] text-[#047857]">Day 7 Data</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-white rounded-lg border border-[#A7F3D0] p-2 text-center">
                          <span className="text-lg block">🌱</span>
                          <strong className="text-xs text-[#171A2B] block">4.2 cm</strong>
                          <span className="text-[10px] text-[#626987]">Stem Height</span>
                        </div>
                        <div className="bg-white rounded-lg border border-[#A7F3D0] p-2 text-center">
                          <span className="text-lg block">☀️</span>
                          <strong className="text-xs text-[#171A2B] block">6 hrs/day</strong>
                          <span className="text-[10px] text-[#626987]">Sunlight Exp.</span>
                        </div>
                        <div className="bg-white rounded-lg border border-[#A7F3D0] p-2 text-center">
                          <span className="text-lg block">💧</span>
                          <strong className="text-xs text-[#171A2B] block">25 ml</strong>
                          <span className="text-[10px] text-[#626987]">Daily Water</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#047857] italic">“First pair of true leaves unfolded toward morning light.”</p>
                    </div>

                    <div className="md:col-span-5 space-y-3">
                      <span className="text-xs font-bold text-[#047857] uppercase tracking-wider">Ecology & Biology</span>
                      <h4 className="text-lg font-black text-[#171A2B]">Field Observation & Botany</h4>
                      <p className="text-xs sm:text-sm text-[#626987] leading-relaxed">
                        Observing living ecosystems and recording data helps environmental scientists understand plant biology and climate health.
                      </p>
                      <div className="pt-2">
                        <Link
                          href="#explorer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#047857] hover:text-[#065F46]"
                        >
                          <span>Explore science activities</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {selectedInterest === "code-making" && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Friendly Maker Robot Project */}
                    <div className="md:col-span-7 bg-[#FFFBEB] rounded-xl p-4 border border-[#FDE68A]">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#FDE68A]">
                        <span className="text-xs font-bold text-[#B45309]">Maker Project: Smart Recycler</span>
                        <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#FDE68A] text-[#B45309]">Prototype v1</span>
                      </div>
                      <div className="flex items-center justify-around bg-white rounded-lg p-3 border border-[#FDE68A] mb-3">
                        <div className="text-center">
                          <span className="text-2xl block">🤖</span>
                          <span className="text-[10px] text-[#B45309] font-bold">Chassis Body</span>
                        </div>
                        <span className="text-gray-300">+</span>
                        <div className="text-center">
                          <span className="text-2xl block">⚡</span>
                          <span className="text-[10px] text-[#B45309] font-bold">Color Sensor</span>
                        </div>
                        <span className="text-gray-300">+</span>
                        <div className="text-center">
                          <span className="text-2xl block">💻</span>
                          <span className="text-[10px] text-[#B45309] font-bold">Simple Logic</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#B45309]">Rule: If paper detected, turn servo left; if plastic, turn right.</p>
                    </div>

                    <div className="md:col-span-5 space-y-3">
                      <span className="text-xs font-bold text-[#B45309] uppercase tracking-wider">Robotics & Engineering</span>
                      <h4 className="text-lg font-black text-[#171A2B]">Friendly Maker Prototyping</h4>
                      <p className="text-xs sm:text-sm text-[#626987] leading-relaxed">
                        Makers combine craft cardboard with affordable sensors to prototype real-world solutions that keep neighborhoods cleaner.
                      </p>
                      <div className="pt-2">
                        <Link
                          href="#explorer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B45309] hover:text-[#92400E]"
                        >
                          <span>Explore robotics challenges</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {selectedInterest === "community-stories" && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Media & Storytelling Preview */}
                    <div className="md:col-span-7 bg-[#FAF8FF] rounded-xl p-4 border border-[#DDD8FE]">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#DDD8FE]">
                        <span className="text-xs font-bold text-[#6757F5]">Audio Storyboard: School Voices</span>
                        <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#DDD8FE] text-[#6757F5]">Episode 01</span>
                      </div>
                      <div className="bg-white rounded-lg border border-[#DDD8FE] p-3 mb-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#6757F5]">00:00</span>
                          <div className="flex-1 h-3 bg-[#EDEAFF] rounded-full overflow-hidden flex items-center px-1">
                            <div className="h-1.5 w-1/3 bg-[#6757F5] rounded-full" />
                          </div>
                          <span className="text-xs font-mono text-[#626987]">02:15</span>
                        </div>
                        <p className="text-[11px] text-[#171A2B] font-medium">“Interviewing school cafeteria chefs about local food sources.”</p>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-[#626987]">
                        <span className="bg-[#EDEAFF] px-2 py-0.5 rounded text-[#6757F5]">3 Questions Ready</span>
                        <span className="bg-[#E0F7FA] px-2 py-0.5 rounded text-[#00838F]">Audio Recorded</span>
                      </div>
                    </div>

                    <div className="md:col-span-5 space-y-3">
                      <span className="text-xs font-bold text-[#6757F5] uppercase tracking-wider">Journalism & Audio</span>
                      <h4 className="text-lg font-black text-[#171A2B]">Community Podcasting</h4>
                      <p className="text-xs sm:text-sm text-[#626987] leading-relaxed">
                        Journalists and storytellers give voice to community heroes through audio interviews, podcasts, and thoughtful feature writing.
                      </p>
                      <div className="pt-2">
                        <Link
                          href="#explorer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] hover:text-[#5342E8]"
                        >
                          <span>Explore storytelling sparks</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: TRY SOMETHING NEW */}
          {activeTab === "try" && (
            <div id="preview-panel-try" role="tabpanel" aria-labelledby="preview-tab-try" className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E6F3]">
                <div>
                  <span className="text-xs font-bold text-[#6757F5] uppercase tracking-wider block mb-1">
                    Preview 2 · Hands-on Micro-Trial
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#171A2B]">
                    Try a quick hands-on mini activity
                  </h3>
                </div>
                <span className="text-xs text-[#047857] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0] self-start sm:self-auto font-medium">
                  Zero scores · 100% exploration
                </span>
              </div>

              {/* 3 Activity Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "storyboard", label: "🎬 Quick Storyboard", time: "Flexible", tag: "Design" },
                  { id: "sprout", label: "🌱 Seedling Observation", time: "Flexible", tag: "Science" },
                  { id: "robot", label: "🤖 Bot Delivery Route", time: "Flexible", tag: "Robotics" },
                ].map((act) => {
                  const isSelected = selectedTryActivity === act.id;
                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setSelectedTryActivity(act.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "bg-[#6757F5] text-white border-[#5342E8] shadow-md shadow-[#6757F5]/20"
                          : "bg-white border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isSelected ? "bg-white/20 text-white" : "bg-[#F0EEF8] text-[#626987]"}`}>
                          {act.tag}
                        </span>
                        <span className={`text-[11px] ${isSelected ? "text-white/80" : "text-[#626987]"}`}>{act.time}</span>
                      </div>
                      <strong className="text-xs sm:text-sm font-bold block">{act.label}</strong>
                    </button>
                  );
                })}
              </div>

              {/* Hands-on Interactive Preview Box */}
              <div className="p-6 rounded-2xl bg-white border border-[#DDD8FE] shadow-xs">
                {selectedTryActivity === "storyboard" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#6757F5]">Activity Challenge: Arrange the Sequence</span>
                      <span className="text-xs text-[#047857] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        3 of 3 panels ordered correctly!
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-[#FAF8FF] rounded-xl border-2 border-[#6757F5] text-center">
                        <span className="text-xl block mb-1">🌱</span>
                        <strong className="text-xs text-[#171A2B] block">1. Seed Planted</strong>
                        <span className="text-[10px] text-[#626987]">In rich soil</span>
                      </div>
                      <div className="p-3 bg-[#FAF8FF] rounded-xl border-2 border-[#6757F5] text-center">
                        <span className="text-xl block mb-1">🌿</span>
                        <strong className="text-xs text-[#171A2B] block">2. Sprout Emerges</strong>
                        <span className="text-[10px] text-[#626987]">Toward the sun</span>
                      </div>
                      <div className="p-3 bg-[#FAF8FF] rounded-xl border-2 border-[#6757F5] text-center">
                        <span className="text-xl block mb-1">🌻</span>
                        <strong className="text-xs text-[#171A2B] block">3. Bloom Opens</strong>
                        <span className="text-[10px] text-[#626987]">Full sunflower</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#626987] leading-relaxed">
                      Great storytelling is about sequence. You’ve just mapped the narrative arc of plant growth.
                    </p>
                  </div>
                )}

                {selectedTryActivity === "sprout" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#047857]">Experiment Challenge: Match the Variable</span>
                      <span className="text-xs text-[#047857] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Optimal growth conditions matched!
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-[#F0FDF4] rounded-xl border border-[#A7F3D0] text-center">
                        <span className="text-lg block">☀️ Sunlight</span>
                        <strong className="text-xs text-[#171A2B]">Bright Indirect</strong>
                      </div>
                      <div className="p-3 bg-[#F0FDF4] rounded-xl border border-[#A7F3D0] text-center">
                        <span className="text-lg block">💧 Water</span>
                        <strong className="text-xs text-[#171A2B]">Moist, Not Soaked</strong>
                      </div>
                      <div className="p-3 bg-[#F0FDF4] rounded-xl border border-[#A7F3D0] text-center sm:col-span-1 col-span-2">
                        <span className="text-lg block">🌡️ Temperature</span>
                        <strong className="text-xs text-[#171A2B]">22°C - 26°C</strong>
                      </div>
                    </div>
                    <p className="text-xs text-[#626987] leading-relaxed">
                      Controlling variables is how biologists isolate what helps organisms thrive.
                    </p>
                  </div>
                )}

                {selectedTryActivity === "robot" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#B45309]">Robotics Challenge: Choose the Navigation Path</span>
                      <span className="text-xs text-[#047857] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Safe obstacle-free path verified!
                      </span>
                    </div>
                    <div className="p-3 bg-[#FFFBEB] rounded-xl border border-[#FDE68A] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🤖</span>
                        <span className="text-xs font-bold text-[#171A2B]">Delivery Bot #4</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#B45309]">Path: Hallway A → Courtyard Ramp → Library</span>
                    </div>
                    <p className="text-xs text-[#626987] leading-relaxed">
                      Autonomous machines use graph algorithms to calculate the shortest obstacle-free route.
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-[#F0EEF8] flex items-center justify-between">
                  <span className="text-xs text-[#626987]">Ready to try the full 6-cohort challenges?</span>
                  <Link
                    href="#explorer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5342E8] transition-all"
                  >
                    <span>Open Student Explorer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PLAN YOUR NEXT STEP */}
          {activeTab === "plan" && (
            <div id="preview-panel-plan" role="tabpanel" aria-labelledby="preview-tab-plan" className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E6F3]">
                <div>
                  <span className="text-xs font-bold text-[#6757F5] uppercase tracking-wider block mb-1">
                    Preview 3 · Editable Learning Notebook
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#171A2B]">
                    Plan your next step without pressure
                  </h3>
                </div>
                <div className="flex items-center gap-2 bg-[#EDEAFF] px-3 py-1.5 rounded-full border border-[#DDD8FE] self-start sm:self-auto">
                  <Check className="w-3.5 h-3.5 text-[#6757F5]" />
                  <span className="text-xs font-bold text-[#6757F5]">
                    {completedCount} of {planTasks.length} steps completed
                  </span>
                </div>
              </div>

              {/* Interactive Checkable Notebook Items */}
              <div className="space-y-3">
                {planTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => togglePlanTask(task.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      task.done
                        ? "bg-white border-[#A7F3D0] shadow-xs"
                        : "bg-white border-[#E8E6F3] hover:border-[#DDD8FE]"
                    }`}
                  >
                    <button
                      type="button"
                      aria-label={`Toggle ${task.title}`}
                      className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        task.done
                          ? "bg-[#10B981] border-[#059669] text-white"
                          : "border-gray-300 bg-white hover:border-[#6757F5]"
                      }`}
                    >
                      {task.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <strong
                          className={`text-sm font-bold block ${
                            task.done ? "text-[#171A2B] line-through opacity-70" : "text-[#171A2B]"
                          }`}
                        >
                          {task.title}
                        </strong>
                        <span className="text-[10px] text-[#626987] font-semibold bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E8E6F3]">
                          Tap to check
                        </span>
                      </div>
                      <p className="text-xs text-[#626987] leading-relaxed">{task.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Summary and Free Student Sign-Up */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAF8FF] to-[#F0FDF4] border border-[#DDD8FE] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#171A2B]">
                    {completedCount === planTasks.length
                      ? "🎉 Excellent exploration! Ready to save your journey?"
                      : "💡 Take your time: every completed step gives you more clarity."}
                  </h4>
                  <p className="text-[11px] text-[#626987]">
                    Save your personal notebook and access curated paths when you sign up.
                  </p>
                  <p className="text-[10px] text-[#626987] mt-1.5 opacity-80">
                    *Sample interactive preview · Not linked to live student accounts or active progress stores.
                  </p>
                </div>

                <Link
                  href="/get-started/student"
                  className="px-5 py-2.5 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/20 shrink-0 transition-all"
                >
                  Start Your Learning Notebook
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
