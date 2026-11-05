"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  School,
  Sparkles,
} from "lucide-react";
import {
  DiscoverScene,
  ExploreScene,
  TryScene,
  GrowScene,
  StudentMode,
} from "./illustrations/JourneyIllustrations";

export type { StudentMode };

interface SceneConfig {
  id: number;
  label: string;
  stepNumber: string;
  school: {
    headline: string;
    subtext: string;
  };
  college: {
    headline: string;
    subtext: string;
  };
  component: React.ComponentType<{ mode: StudentMode }>;
}

const SCENES: SceneConfig[] = [
  {
    id: 0,
    label: "Discover",
    stepNumber: "01",
    school: {
      headline: "What makes you curious?",
      subtext: "Start by exploring what genuinely excites you—from nature and science to stories and art.",
    },
    college: {
      headline: "What makes you curious?",
      subtext: "Discover where your natural strengths lie across technology, creative design, sciences, and beyond.",
    },
    component: DiscoverScene,
  },
  {
    id: 1,
    label: "Explore",
    stepNumber: "02",
    school: {
      headline: "There's so much to discover.",
      subtext: "Step into vibrant worlds of learning and see how your favorite topics connect together.",
    },
    college: {
      headline: "There's so much to discover.",
      subtext: "Explore exciting multidisciplinary fields and see how skills translate into real opportunities.",
    },
    component: ExploreScene,
  },
  {
    id: 2,
    label: "Try",
    stepNumber: "03",
    school: {
      headline: "Try something new!",
      subtext: "Build a fun mini-project, solve a puzzle, or try a hands-on activity just to see what you like.",
    },
    college: {
      headline: "Try something new!",
      subtext: "Tackle a creative challenge or practical project to see what kind of work you actually enjoy doing.",
    },
    component: TryScene,
  },
  {
    id: 3,
    label: "Grow",
    stepNumber: "04",
    school: {
      headline: "Every small step helps you grow.",
      subtext: "Move at your own pace with small, fun milestones that build confidence every day.",
    },
    college: {
      headline: "Every small step helps you grow.",
      subtext: "Chart your personal roadmap with inspiring projects and skills you are proud of.",
    },
    component: GrowScene,
  },
];

export function StudentJourneyShowcase() {
  const [mode, setMode] = useState<StudentMode>("school");
  const [activeScene, setActiveScene] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const DURATION_MS = 5500;
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

  const current = SCENES[activeScene];
  const content = mode === "school" ? current.school : current.college;
  const ActiveSceneIllustration = current.component;

  return (
    <div
      className="relative rounded-3xl bg-white border border-[#DDD8FE] shadow-[0_20px_50px_-15px_rgba(23,26,43,0.08)] overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Student Journey Interactive Showcase"
    >
      {/* Top Bar: "See how your journey unfolds" & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-[#F0EEF8] bg-gradient-to-r from-[#FAF9F6] to-white">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6757F5] opacity-75 ${
                isPlaying && !isHovered ? "" : "hidden"
              }`}
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#6757F5]" />
          </span>
          <span className="text-xs font-bold text-[#171A2B] tracking-tight sm:text-sm">
            See how your journey unfolds
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

      {/* Simplified Navigation Steps: Discover -> Explore -> Try -> Grow */}
      <div
        className="grid grid-cols-4 border-b border-[#F0EEF8] bg-[#FAF9F6]/60 relative"
        role="tablist"
        aria-label="Journey Steps"
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
              className={`relative px-2 sm:px-4 py-2.5 text-center transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                isActive
                  ? "bg-white text-[#6757F5] font-bold shadow-xs"
                  : "text-[#626987] hover:text-[#171A2B] hover:bg-white/50"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
                  {scene.stepNumber}
                </span>
                <span
                  className={`text-xs font-bold ${
                    isActive ? "text-[#171A2B]" : "text-[#626987]"
                  }`}
                >
                  {scene.label}
                </span>
              </div>

              {/* Progress bar line if active & playing */}
              {isActive && isPlaying && !isHovered && (
                <div
                  className="absolute bottom-0 left-0 h-[2.5px] bg-[#6757F5] transition-all duration-100 ease-linear rounded-full"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Showcase Body */}
      <div
        id={`journey-panel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`journey-tab-${current.id}`}
        className="p-4 sm:p-6 min-h-[410px] sm:min-h-[430px] flex flex-col justify-between"
      >
        {/* Minimal Text: Headline + One Student-Friendly Sentence */}
        <div className="space-y-1 mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EDEAFF] text-[#6757F5]">
              <Sparkles className="w-3 h-3 text-[#6757F5]" />
              Step {current.stepNumber} · {current.label}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#171A2B] tracking-tight">
            {content.headline}
          </h2>
          <p className="text-xs sm:text-sm text-[#31364F] leading-relaxed max-w-xl">
            {content.subtext}
          </p>
        </div>

        {/* DOMINANT ILLUSTRATION STAGE (Occupies 60–70% of Showcase Area) */}
        <div className="my-2 relative rounded-2xl bg-gradient-to-b from-[#FAF9FE] to-[#F1EEFB] border border-[#E5E1F8] p-2 sm:p-3 overflow-hidden shadow-inner flex items-center justify-center">
          <ActiveSceneIllustration mode={mode} />
        </div>

        {/* Bottom Control Bar: Prev / Play / Pause / Next Controls */}
        <div className="pt-2 flex items-center justify-between text-xs text-[#626987] border-t border-[#F0EEF8]/80">
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
