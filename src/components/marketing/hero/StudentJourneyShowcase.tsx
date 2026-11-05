"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Sparkles,
  Compass,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Atom,
  Palette,
  Code2,
  Globe2,
  Rocket,
  GraduationCap,
  School,
  ArrowRight,
  Check,
  Zap,
  Trophy,
} from "lucide-react";

export type StudentMode = "school" | "college";

interface SceneConfig {
  id: number;
  label: string;
  shortTitle: string;
  mobileTitle: string;
  badge: string;
  school: {
    headline: string;
    subtext: string;
    actionHint: string;
  };
  college: {
    headline: string;
    subtext: string;
    actionHint: string;
  };
}

const SCENES: SceneConfig[] = [
  {
    id: 0,
    label: "01 Discover",
    shortTitle: "Discover Yourself",
    mobileTitle: "Discover",
    badge: "Step 1 · Curiosity",
    school: {
      headline: "What makes you curious?",
      subtext: "Explore what sparks your interest without exam pressure, rankings, or premature career locks.",
      actionHint: "Tap any interest to see where natural curiosities lead",
    },
    college: {
      headline: "Where do your strengths lie?",
      subtext: "Map your genuine interests, work styles, and technical curiosities with zero artificial scorecards.",
      actionHint: "Identify authentic strengths across engineering, design, and research",
    },
  },
  {
    id: 1,
    label: "02 Explore",
    shortTitle: "Explore Possibilities",
    mobileTitle: "Explore",
    badge: "Step 2 · Horizons",
    school: {
      headline: "Discover a world of possibilities.",
      subtext: "Look beyond rigid stream boundaries. Connect creativity, science, nature, and technology together.",
      actionHint: "Explore multi-disciplinary pathways that fit who you are",
    },
    college: {
      headline: "Map verified career horizons.",
      subtext: "Compare degrees, real-world industry tracks, emerging domains, workload realities, and parallel options.",
      actionHint: "Compare side-by-side realities across modern industries",
    },
  },
  {
    id: 2,
    label: "03 Try",
    shortTitle: "Give It a Try",
    mobileTitle: "Try Out",
    badge: "Step 3 · Micro-Trials",
    school: {
      headline: "Learn by trying something new.",
      subtext: "Test short, fun 15–20 minute micro-projects to see what you actually enjoy doing before choosing a stream.",
      actionHint: "Interactive micro-trial: test practical thinking in minutes",
    },
    college: {
      headline: "Test real-world micro-trials.",
      subtext: "Tackle authentic industry tasks to build verifiable skills evidence and experience work before committing.",
      actionHint: "Hands-on engineering & product challenges with tangible evidence",
    },
  },
  {
    id: 3,
    label: "04 Move",
    shortTitle: "Make Your Next Move",
    mobileTitle: "Next Move",
    badge: "Step 4 · Action Roadmap",
    school: {
      headline: "Take your next step, your way.",
      subtext: "Build a flexible roadmap with subjects, creative clubs, and summer milestones—with clarity, not stress.",
      actionHint: "Step-by-step milestones owned entirely by you",
    },
    college: {
      headline: "Chart your transition with confidence.",
      subtext: "Transform verified project evidence into targeted internships, skill sprints, and career launchpads.",
      actionHint: "Student-controlled growth roadmap with verified portfolio artifacts",
    },
  },
];

export function StudentJourneyShowcase() {
  const [mode, setMode] = useState<StudentMode>("school");
  const [activeScene, setActiveScene] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Interactive playground states inside scenes
  const [selectedCuriosities, setSelectedCuriosities] = useState<string[]>([
    "Robotics & AI",
    "Space & Physics",
  ]);
  const [solarAngle, setSolarAngle] = useState<number>(65);

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const DURATION_MS = 6000;
  const TICK_INTERVAL = 100;

  // Reduced motion preference detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      const frameId = requestAnimationFrame(() => setIsPlaying(false));
      return () => cancelAnimationFrame(frameId);
    }
  }, []);

  const goToScene = useCallback((index: number) => {
    setActiveScene(index);
    setProgress(0);
  }, []);

  const nextScene = useCallback(() => {
    setActiveScene((prev) => (prev + 1) % SCENES.length);
    setProgress(0);
  }, []);

  const prevScene = useCallback(() => {
    setActiveScene((prev) => (prev - 1 + SCENES.length) % SCENES.length);
    setProgress(0);
  }, []);

  // Autoplay progression effect
  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const stepIncrement = (TICK_INTERVAL / DURATION_MS) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextScene();
          return 0;
        }
        return prev + stepIncrement;
      });
    }, TICK_INTERVAL);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, isHovered, nextScene]);

  const toggleCuriosity = (item: string) => {
    setSelectedCuriosities((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const current = SCENES[activeScene];
  const content = mode === "school" ? current.school : current.college;

  return (
    <div
      className="relative rounded-3xl bg-white border border-[#DDD8FE] shadow-[0_20px_50px_-15px_rgba(23,26,43,0.08)] overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Student Journey Interactive Showcase"
    >
      {/* Top Bar: Interactive Header & School / College Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[#F0EEF8] bg-gradient-to-r from-[#FAF9F6] to-white">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6757F5] opacity-75 ${
                isPlaying && !isHovered ? "" : "hidden"
              }`}
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#6757F5]" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#171A2B]">
            Interactive Journey Showcase
          </span>
        </div>

        {/* Mode Switcher Pill */}
        <div className="flex items-center rounded-xl bg-[#FAF9F6] p-1 border border-[#E8E6F3]">
          <button
            type="button"
            onClick={() => setMode("school")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
              mode === "school"
                ? "bg-[#6757F5] text-white shadow-xs"
                : "text-[#626987] hover:text-[#171A2B] hover:bg-white"
            }`}
            aria-pressed={mode === "school"}
          >
            <School className="w-3.5 h-3.5" />
            <span>School (4–12)</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("college")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
              mode === "college"
                ? "bg-[#6757F5] text-white shadow-xs"
                : "text-[#626987] hover:text-[#171A2B] hover:bg-white"
            }`}
            aria-pressed={mode === "college"}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>College & Career</span>
          </button>
        </div>
      </div>

      {/* Scene Navigation Steps (4 Steps) */}
      <div
        className="grid grid-cols-4 border-b border-[#F0EEF8] bg-[#FAF9F6]/60 relative"
        role="tablist"
        aria-label="Journey Scenes"
      >
        {SCENES.map((scene, idx) => {
          const isActive = activeScene === idx;
          return (
            <button
              key={scene.id}
              type="button"
              role="tab"
              id={`journey-tab-${scene.id}`}
              aria-selected={isActive}
              aria-controls={`journey-panel-${scene.id}`}
              onClick={() => goToScene(idx)}
              className={`relative px-2 sm:px-3 py-2.5 text-left transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                isActive
                  ? "bg-white text-[#6757F5] font-bold shadow-xs"
                  : "text-[#626987] hover:text-[#171A2B] hover:bg-white/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
                  0{idx + 1}
                </span>
                {isActive && (
                  <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#6757F5]" />
                )}
              </div>
              <p
                className={`text-xs truncate font-semibold mt-0.5 ${
                  isActive ? "text-[#171A2B]" : "text-[#626987]"
                }`}
              >
                <span className="sm:hidden">{scene.mobileTitle}</span>
                <span className="hidden sm:inline">{scene.shortTitle}</span>
              </p>

              {/* Individual step progress line if active */}
              {isActive && isPlaying && !isHovered && (
                <div
                  className="absolute bottom-0 left-0 h-[2px] bg-[#6757F5] transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Body */}
      <div
        id={`journey-panel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`journey-tab-${current.id}`}
        className="p-5 sm:p-6 min-h-[360px] sm:min-h-[400px] flex flex-col justify-between"
      >
        {/* Scene Header */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EDEAFF] text-[#6757F5] border border-[#DDD8FE]">
              <Sparkles className="w-3 h-3 text-[#6757F5]" />
              {current.badge}
            </span>
            <span className="text-[11px] text-[#626987] font-medium hidden sm:inline-block">
              {mode === "school" ? "Class 4–12 Pathway" : "Higher Ed & Transition"}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-[#171A2B] tracking-tight">
            {content.headline}
          </h2>
          <p className="text-xs sm:text-sm text-[#31364F] leading-relaxed">
            {content.subtext}
          </p>
        </div>

        {/* Dynamic Scene Visual Area */}
        <div className="my-4 relative rounded-2xl bg-gradient-to-b from-[#FAF9F6] to-[#F7F6FF] border border-[#E8E6F3] p-4 sm:p-5 overflow-hidden">
          {/* Subtle decorative glow circles */}
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#EDEAFF]/60 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-[#35B8C5]/10 blur-xl pointer-events-none" />

          {/* SCENE 0: Discover Yourself */}
          {activeScene === 0 && (
            <div className="space-y-3.5 animate-fadeIn">
              <div className="flex items-center justify-between text-xs text-[#626987]">
                <span className="font-semibold text-[#171A2B]">
                  {mode === "school" ? "Curiosity Radar" : "Strengths Inventory"}
                </span>
                <span className="text-[11px] text-[#6757F5] font-medium">
                  {selectedCuriosities.length} active curiosities
                </span>
              </div>

              {/* Curiosity Chips (Interactive toggle) */}
              <div className="flex flex-wrap gap-2">
                {(mode === "school"
                  ? [
                      { label: "Robotics & AI", icon: Atom, color: "#6757F5" },
                      { label: "Space & Physics", icon: Rocket, color: "#35B8C5" },
                      { label: "Creative Design", icon: Palette, color: "#FF7A59" },
                      { label: "Game Dev & Code", icon: Code2, color: "#7C6BF8" },
                      { label: "Wildlife & Nature", icon: Globe2, color: "#10B981" },
                    ]
                  : [
                      { label: "Cloud Systems", icon: Code2, color: "#6757F5" },
                      { label: "UX & Product", icon: Palette, color: "#FF7A59" },
                      { label: "Data Intelligence", icon: Atom, color: "#35B8C5" },
                      { label: "Biotech & Health", icon: Globe2, color: "#10B981" },
                      { label: "Tech Entrepreneurship", icon: Rocket, color: "#F59E0B" },
                    ]
                ).map((item) => {
                  const isSelected = selectedCuriosities.includes(item.label);
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => toggleCuriosity(item.label)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                        isSelected
                          ? "bg-white border-[#6757F5] text-[#171A2B] shadow-xs scale-102"
                          : "bg-white/80 border-[#E8E6F3] text-[#626987] hover:border-[#DDD8FE]"
                      }`}
                    >
                      <Icon
                        className="w-3.5 h-3.5"
                        style={{ color: isSelected ? item.color : "#9AA0B8" }}
                      />
                      <span>{item.label}</span>
                      {isSelected && (
                        <Check className="w-3 h-3 text-[#6757F5] stroke-[3]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Reflection Card */}
              <div className="p-3 rounded-xl bg-white border border-[#DDD8FE] flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#EDEAFF] flex items-center justify-center shrink-0 text-[#6757F5]">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#171A2B]">
                    {mode === "school"
                      ? "Zero premature stream categorization"
                      : "Evidence-based self discovery"}
                  </p>
                  <p className="text-[11px] text-[#626987] leading-tight">
                    {mode === "school"
                      ? "Instead of forcing PCM vs Arts, we help you understand what activities spark real focus."
                      : "We replace arbitrary aptitude scorecards with genuine exploration and demonstrated problem-solving."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SCENE 1: Explore Possibilities */}
          {activeScene === 1 && (
            <div className="space-y-3 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(mode === "school"
                  ? [
                      {
                        title: "Creative Tech & Robotics",
                        sub: "Combines coding, mechanical design & physics",
                        accent: "#6757F5",
                        bg: "#EDEAFF",
                      },
                      {
                        title: "Astrophysics & Space",
                        sub: "Mathematical modeling & observational research",
                        accent: "#35B8C5",
                        bg: "#E0F7FA",
                      },
                      {
                        title: "Visual Arts & Game Design",
                        sub: "Digital illustration, narrative & 3D worlds",
                        accent: "#FF7A59",
                        bg: "#FFF0EB",
                      },
                      {
                        title: "Bio-Sciences & Climate",
                        sub: "Ecological restoration & genetic research",
                        accent: "#10B981",
                        bg: "#E6F9F0",
                      },
                    ]
                  : [
                      {
                        title: "AI & Distributed Systems",
                        sub: "Parallel degree vs direct project apprenticeship",
                        accent: "#6757F5",
                        bg: "#EDEAFF",
                      },
                      {
                        title: "Product Design & HCI",
                        sub: "Design systems, usability research & prototyping",
                        accent: "#FF7A59",
                        bg: "#FFF0EB",
                      },
                      {
                        title: "Computational Biology",
                        sub: "Data science applied to genomics & biotech",
                        accent: "#10B981",
                        bg: "#E6F9F0",
                      },
                      {
                        title: "Technological Policy & Law",
                        sub: "Digital governance, IP rights & ethics",
                        accent: "#7C6BF8",
                        bg: "#F0EDFF",
                      },
                    ]
                ).map((domain) => (
                  <div
                    key={domain.title}
                    className="p-3 rounded-xl bg-white border border-[#E8E6F3] hover:border-[#6757F5]/50 transition-all duration-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#171A2B]">
                          {domain.title}
                        </span>
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: domain.accent }}
                        />
                      </div>
                      <p className="text-[11px] text-[#626987] leading-snug">
                        {domain.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#626987] px-1">
                <span>All paths transparently mapped</span>
                <span className="font-semibold text-[#6757F5]">
                  Prerequisites · Calendars · Realities
                </span>
              </div>
            </div>
          )}

          {/* SCENE 2: Give It a Try */}
          {activeScene === 2 && (
            <div className="space-y-3 animate-fadeIn">
              <div className="p-3.5 rounded-xl bg-white border border-[#DDD8FE] shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-[#EDEAFF] text-[#6757F5]">
                      <Zap className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs font-bold text-[#171A2B]">
                      {mode === "school"
                        ? "Interactive Micro-Trial: Solar Rover Tracker"
                        : "Industry Micro-Trial: Real-Time Currency API"}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E0F7FA] text-[#00838F]">
                    {mode === "school" ? "20-Min Challenge" : "Practical Evidence"}
                  </span>
                </div>

                {/* Micro-trial Interactive Simulation */}
                {mode === "school" ? (
                  <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E8E6F3] space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#626987]">Sensor Angle: {solarAngle}°</span>
                      <span className="font-bold text-[#10B981]">
                        Power Output: {Math.round((solarAngle / 90) * 100)}% Optimal
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="90"
                      value={solarAngle}
                      onChange={(e) => setSolarAngle(Number(e.target.value))}
                      className="w-full accent-[#6757F5] cursor-pointer"
                      aria-label="Adjust solar tracker angle"
                    />
                    <p className="text-[10px] text-[#626987] italic">
                      Move the slider to test solar alignment physics in real time.
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-[#171A2B] text-white font-mono text-[11px] space-y-1.5 overflow-x-auto">
                    <div className="flex items-center justify-between text-[#8E95AF] text-[10px]">
                      <span>endpoint: /api/v1/forex/rates</span>
                      <span className="text-[#10B981]">HTTP 200 OK</span>
                    </div>
                    <p className="text-[#35B8C5]">
                      const rates = await fetchForex(&quot;INR&quot;, &quot;USD&quot;);
                    </p>
                    <p className="text-[#EDEAFF] text-[10px]">
                      output: 83.42 INR · Latency: 24ms · Verified Unit Test Passed
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-[#626987] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    Evidence recorded in your growth log
                  </span>
                  <span className="font-bold text-[#6757F5]">
                    No exam pressure
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* SCENE 3: Make Your Next Move */}
          {activeScene === 3 && (
            <div className="space-y-3 animate-fadeIn">
              <div className="space-y-2">
                {[
                  {
                    step: "01",
                    title:
                      mode === "school"
                        ? "Curiosities Discovered"
                        : "Skills & Interests Mapped",
                    status: "Completed",
                    icon: Check,
                    done: true,
                  },
                  {
                    step: "02",
                    title:
                      mode === "school"
                        ? "Practical Micro-Trial Completed"
                        : "Real-world Project Artifact Saved",
                    status: "Completed",
                    icon: Check,
                    done: true,
                  },
                  {
                    step: "03",
                    title:
                      mode === "school"
                        ? "Shortlist 3 Subject Combinations"
                        : "Build Growth Roadmap & Internship Shortlist",
                    status: "In Progress",
                    icon: ArrowRight,
                    done: false,
                  },
                ].map((milestone) => (
                  <div
                    key={milestone.step}
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                      milestone.done
                        ? "bg-white border-[#E8E6F3] shadow-xs"
                        : "bg-[#FAF9F6] border-[#DDD8FE] ring-1 ring-[#6757F5]/20"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          milestone.done
                            ? "bg-[#E6F9F0] text-[#10B981]"
                            : "bg-[#6757F5] text-white"
                        }`}
                      >
                        {milestone.done ? (
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        ) : (
                          milestone.step
                        )}
                      </div>
                      <span className="text-xs font-semibold text-[#171A2B]">
                        {milestone.title}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        milestone.done
                          ? "bg-[#E6F9F0] text-[#10B981]"
                          : "bg-[#EDEAFF] text-[#6757F5]"
                      }`}
                    >
                      {milestone.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Confidence reassurance */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#EDEAFF] to-[#E0F7FA] border border-[#DDD8FE] flex items-center justify-between">
                <span className="text-xs font-bold text-[#171A2B]">
                  Clarity over confusion · You stay in control
                </span>
                <Trophy className="w-4 h-4 text-[#6757F5]" />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Control Bar: Prev / Play / Pause / Next Controls */}
        <div className="pt-2 flex items-center justify-between text-xs text-[#626987]">
          {/* Autoplay toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DDD8FE] bg-white hover:bg-[#FAF9F6] text-[#171A2B] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
              aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#6757F5]" />
                  <span className="text-[11px]">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#6757F5]" />
                  <span className="text-[11px]">Play</span>
                </>
              )}
            </button>
            <span className="text-[11px] text-[#626987] hidden sm:inline">
              {isPlaying ? (isHovered ? "Paused on hover" : "Auto-advancing") : "Paused"}
            </span>
          </div>

          {/* Stepper buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prevScene}
              className="p-1.5 rounded-lg border border-[#E8E6F3] bg-white hover:bg-[#FAF9F6] text-[#31364F] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
              aria-label="Previous scene"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-semibold text-[#171A2B] px-1">
              {activeScene + 1} / {SCENES.length}
            </span>
            <button
              type="button"
              onClick={nextScene}
              className="p-1.5 rounded-lg border border-[#E8E6F3] bg-white hover:bg-[#FAF9F6] text-[#31364F] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
              aria-label="Next scene"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
