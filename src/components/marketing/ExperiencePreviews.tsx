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
  Clock,
} from "lucide-react";

type PreviewTab = "explore" | "try" | "plan";

export function ExperiencePreviews() {
  const [activeTab, setActiveTab] = useState<PreviewTab>("explore");

  // Preview 1: Selected Curiosity
  const [selectedInterest, setSelectedInterest] = useState<string>("creative-tech");

  // Preview 2: Selected Mini Activity
  const [selectedTryActivity, setSelectedTryActivity] = useState<string>("poster");

  // Preview 3: Interactive Learning Plan Checklist
  const [planTasks, setPlanTasks] = useState([
    {
      id: "task-1",
      title: "Explore an Idea",
      desc: "Watch a 5-minute video on how game developers design sound effects.",
      category: "Discovery",
      done: true,
    },
    {
      id: "task-2",
      title: "Try a Small Project",
      desc: "Record 3 short sound effects using kitchen utensils or outdoor nature.",
      category: "Hands-on Trial",
      done: true,
    },
    {
      id: "task-3",
      title: "Reflect on What You Enjoyed",
      desc: "Note whether you preferred the recording part or the editing part.",
      category: "Self-Reflection",
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
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
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

        {/* 3 Core Experience Tabs: Explore, Try, Plan */}
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
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
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
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
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
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
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

        {/* The Single Prominent Preview Display Area */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#FAF9F6] border-2 border-[#DDD8FE] p-6 sm:p-8 lg:p-10 shadow-lg shadow-[#6757F5]/5">
          {/* PREVIEW 1: EXPLORE AN INTEREST */}
          {activeTab === "explore" && (
            <div id="preview-panel-explore" role="tabpanel" aria-labelledby="preview-tab-explore" className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E8E6F3]">
                <div>
                  <span className="text-xs font-bold text-[#6757F5] uppercase tracking-wider block mb-1">
                    Preview 1 · Curiosity Exploration
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#171A2B]">
                    Pick an interest to see what you could discover
                  </h3>
                </div>
                <span className="text-xs text-[#626987] bg-white px-3 py-1 rounded-full border border-[#E8E6F3] self-start sm:self-auto">
                  Illustrative sample · No test scores
                </span>
              </div>

              {/* 4 Illustrated Curiosity Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    id: "creative-tech",
                    icon: "🎨",
                    title: "Creative Tech",
                    sub: "Games, UI & digital art",
                  },
                  {
                    id: "nature-science",
                    icon: "🌿",
                    title: "Nature & Science",
                    sub: "Ecology, biology & clean tech",
                  },
                  {
                    id: "code-making",
                    icon: "🤖",
                    title: "Building & Code",
                    sub: "Robotics, apps & gadgets",
                  },
                  {
                    id: "community-stories",
                    icon: "🤝",
                    title: "Community & Media",
                    sub: "Teaching, writing & policy",
                  },
                ].map((item) => {
                  const isSelected = selectedInterest === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedInterest(item.id)}
                      className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "bg-[#6757F5] text-white border-[#5342E8] shadow-md shadow-[#6757F5]/20 scale-[1.02]"
                          : "bg-white border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF] hover:border-[#DDD8FE]"
                      }`}
                    >
                      <span className="text-2xl block mb-2">{item.icon}</span>
                      <strong className="text-xs sm:text-sm font-bold block leading-snug">
                        {item.title}
                      </strong>
                      <span className={`text-[10px] block mt-0.5 ${isSelected ? "text-white/80" : "text-[#626987]"}`}>
                        {item.sub}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Directions Revealed */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DDD8FE] shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6757F5] block mb-3">
                  Possible Activities You Might Enjoy:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedInterest === "creative-tech" && (
                    <>
                      <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3]">
                        <strong className="text-xs font-bold text-[#171A2B] block mb-1">
                          🕹️ Game Animation
                        </strong>
                        <p className="text-[11px] text-[#626987] leading-relaxed">
                          Sketch simple 2D game character sprites and animate run cycles.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3]">
                        <strong className="text-xs font-bold text-[#171A2B] block mb-1">
                          📱 Mobile UI Wireframing
                        </strong>
                        <p className="text-[11px] text-[#626987] leading-relaxed">
                          Design 3 clean screens of an app to help students share notes.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3]">
                        <strong className="text-xs font-bold text-[#171A2B] block mb-1">
                          🎬 Digital Storyboarding
                        </strong>
                        <p className="text-[11px] text-[#626987] leading-relaxed">
                          Create a 6-frame visual storyboard for an animated film scene.
                        </p>
                      </div>
                    </>
                  )}

                  {selectedInterest === "nature-science" && (
                    <>
                      <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3]">
                        <strong className="text-xs font-bold text-[#171A2B] block mb-1">
                          🌱 Sprout Lab Observation
                        </strong>
                        <p className="text-[11px] text-[#626987] leading-relaxed">
                          Test sunlight vs shade growth rates on sunflower seedlings.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3]">
                        <strong className="text-xs font-bold text-[#171A2B] block mb-1">
                          ☀️ Solar Energy Mapping
                        </strong>
                        <p className="text-[11px] text-[#626987] leading-relaxed">
                          Calculate roof solar potential for campus buildings using daylight angles.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3]">
                        <strong className="text-xs font-bold text-[#171A2B] block mb-1">
                          🧪 Bio-Material Testing
                        </strong>
                        <p className="text-[11px] text-[#626987] leading-relaxed">
                          Explore biodegradable alternatives to single-use packaging.
                        </p>
                      </div>
                    </>
                  )}

                  {selectedInterest === "code-making" && (
                    <>
                      <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3]">
                        <strong className="text-xs font-bold text-[#171A2B] block mb-1">
                          🤖 Autonomous Route Guide
                        </strong>
                        <p className="text-[11px] text-[#626987] leading-relaxed">
                          Write step-by-step logic rules to guide a campus bot safely.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3]">
                        <strong className="text-xs font-bold text-[#171A2B] block mb-1">
                          💻 Python Quiz Builder
                        </strong>
                        <p className="text-[11px] text-[#626987] leading-relaxed">
                          Build a 3-question interactive trivia challenge for friends.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3]">
                        <strong className="text-xs font-bold text-[#171A2B] block mb-1">
                          🔋 Smart Gadget Prototyping
                        </strong>
                        <p className="text-[11px] text-[#626987] leading-relaxed">
                          Simulate how sensors detect light and sound in smart gadgets.
                        </p>
                      </div>
                    </>
                  )}

                  {selectedInterest === "community-stories" && (
                    <>
                      <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3]">
                        <strong className="text-xs font-bold text-[#171A2B] block mb-1">
                          🎙️ Campus Audio Spotlight
                        </strong>
                        <p className="text-[11px] text-[#626987] leading-relaxed">
                          Draft a 2-minute interview about a community problem worth solving.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3]">
                        <strong className="text-xs font-bold text-[#171A2B] block mb-1">
                          🦽 Inclusive Playground Plan
                        </strong>
                        <p className="text-[11px] text-[#626987] leading-relaxed">
                          Design accessible park features so all neighborhood kids play safely.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3]">
                        <strong className="text-xs font-bold text-[#171A2B] block mb-1">
                          📚 Community Book Swap
                        </strong>
                        <p className="text-[11px] text-[#626987] leading-relaxed">
                          Organize a student exchange to share stories and promote reading.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PREVIEW 2: TRY SOMETHING NEW */}
          {activeTab === "try" && (
            <div id="preview-panel-try" role="tabpanel" aria-labelledby="preview-tab-try" className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E8E6F3]">
                <div>
                  <span className="text-xs font-bold text-[#6757F5] uppercase tracking-wider block mb-1">
                    Preview 2 · Hands-On Trials
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#171A2B]">
                    Try a 15-minute low-stakes project
                  </h3>
                </div>
                <span className="text-xs text-[#626987] bg-white px-3 py-1 rounded-full border border-[#E8E6F3] self-start sm:self-auto">
                  Safe & pressure-free
                </span>
              </div>

              {/* Activity Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: "poster",
                    icon: "🎨",
                    title: "Make Your Poster Pop",
                    desc: "Experiment with layout and contrast.",
                  },
                  {
                    id: "robot",
                    icon: "🤖",
                    title: "Help the Robot Navigate",
                    desc: "Guide a bot with step-by-step logic.",
                  },
                  {
                    id: "plant",
                    icon: "🌻",
                    title: "Help the Plant Grow",
                    desc: "Balance sunlight, water and nutrients.",
                  },
                ].map((act) => {
                  const isSelected = selectedTryActivity === act.id;
                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setSelectedTryActivity(act.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "bg-[#6757F5] text-white border-[#5342E8] shadow-md shadow-[#6757F5]/20 scale-[1.02]"
                          : "bg-white border-[#E8E6F3] text-[#171A2B] hover:bg-[#FAF8FF]"
                      }`}
                    >
                      <span className="text-2xl block mb-2">{act.icon}</span>
                      <strong className="text-xs sm:text-sm font-bold block mb-1">
                        {act.title}
                      </strong>
                      <p className={`text-[11px] ${isSelected ? "text-white/80" : "text-[#626987]"}`}>
                        {act.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Live Mini Preview Box */}
              <div className="p-6 rounded-2xl bg-white border border-[#DDD8FE] text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#6757F5] bg-[#EDEAFF] px-2.5 py-0.5 rounded-full inline-block mb-3">
                  Live Mini Preview
                </span>

                <div className="max-w-md mx-auto space-y-3">
                  {selectedTryActivity === "poster" && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-purple-100 to-amber-100 border border-purple-200">
                      <h4 className="text-lg font-black text-[#171A2B]">ART & SCIENCE NIGHT</h4>
                      <p className="text-xs text-[#31364F] mt-1">
                        Contrasting typography and balanced whitespace grab attention immediately!
                      </p>
                    </div>
                  )}

                  {selectedTryActivity === "robot" && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-sky-100 to-indigo-100 border border-sky-200 flex items-center justify-center gap-3">
                      <span className="text-2xl">🤖</span>
                      <span className="text-xs font-bold text-[#171A2B]">
                        ⬆️ Step Forward ➡️ Turn Right 📚 Reached Library!
                      </span>
                    </div>
                  )}

                  {selectedTryActivity === "plant" && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200 flex items-center justify-center gap-3">
                      <span className="text-2xl">🌻</span>
                      <span className="text-xs font-bold text-emerald-950">
                        Sunlight + Water = Healthy Photosynthesis Bloom!
                      </span>
                    </div>
                  )}

                  <p className="text-xs text-[#626987]">
                    Experience how fun thinking works in this field with zero pressure.
                  </p>

                  <div className="pt-2">
                    <Link
                      href="#explorer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5342E8] shadow-xs"
                    >
                      <span>Try Full Mini Activity in Explorer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PREVIEW 3: PLAN YOUR NEXT STEP */}
          {activeTab === "plan" && (
            <div id="preview-panel-plan" role="tabpanel" aria-labelledby="preview-tab-plan" className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E8E6F3]">
                <div>
                  <span className="text-xs font-bold text-[#6757F5] uppercase tracking-wider block mb-1">
                    Preview 3 · Interactive Action Plan
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#171A2B]">
                    A visual learning plan shaped by you
                  </h3>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-semibold text-[#6757F5] bg-white px-3 py-1.5 rounded-full border border-[#E8E6F3]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#35B8C5]" />
                  <span>{completedCount} of 3 steps completed</span>
                </div>
              </div>

              {/* Interactive Checkable Task List */}
              <div className="space-y-3">
                {planTasks.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => togglePlanTask(task.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 ${
                      task.done
                        ? "bg-white border-[#DDD8FE] shadow-xs"
                        : "bg-white/80 border-[#E8E6F3] hover:border-[#DDD8FE]"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        task.done
                          ? "bg-[#6757F5] text-white shadow-xs"
                          : "border-2 border-gray-300 bg-white"
                      }`}
                    >
                      {task.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#EDEAFF] text-[#6757F5]">
                          {task.category}
                        </span>
                        <strong
                          className={`text-xs sm:text-sm font-bold ${
                            task.done ? "text-[#171A2B]" : "text-[#626987]"
                          }`}
                        >
                          {task.title}
                        </strong>
                      </div>
                      <p className="text-xs text-[#626987] leading-relaxed">
                        {task.desc}
                      </p>
                    </div>

                    <span className="text-[11px] text-[#6757F5] font-semibold shrink-0">
                      {task.done ? "Completed" : "Tap to Complete"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Progress Summary Bar */}
              <div className="p-4 rounded-2xl bg-white border border-[#DDD8FE] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#35B8C5]" />
                  <span className="text-[#31364F]">
                    Estimated project time: <strong>30 minutes total</strong> (at your own pace)
                  </span>
                </div>
                <span className="text-[11px] text-[#626987]">
                  Sample student plan · Example only
                </span>
              </div>
            </div>
          )}

          {/* Invitation to Begin Student Journey */}
          <div className="mt-8 pt-6 border-t border-[#E8E6F3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs text-[#626987]">
              Ready to explore your own tailored direction? Zero commitment required.
            </span>

            <Link
              href="/get-started/student"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#6757F5]/20 hover:shadow-lg transition-all active:scale-[0.98] whitespace-nowrap"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
