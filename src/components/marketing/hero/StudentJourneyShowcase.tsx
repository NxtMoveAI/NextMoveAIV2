"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Palette,
  Compass,
  Lightbulb,
  HeartHandshake,
  ChevronDown,
} from "lucide-react";
import {
  DiscoverScene,
  ExploreScene,
  TryScene,
  GrowScene,
  CuriositySpark,
  StudentMode,
  IllustrationProps,
} from "./illustrations/JourneyIllustrations";

export type { CuriositySpark, StudentMode };

export interface SparkOption {
  id: CuriositySpark;
  label: string;
  tagline: string;
  shortDesc: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

export const SPARK_OPTIONS: SparkOption[] = [
  {
    id: "all",
    label: "All Sparks",
    tagline: "Multidisciplinary",
    shortDesc: "Inclusive blend across art, science, tech & impact",
    color: "#6757F5",
    bgColor: "#EDEAFF",
    borderColor: "#DDD8FE",
    icon: Sparkles,
  },
  {
    id: "create",
    label: "Create",
    tagline: "Art & Storytelling",
    shortDesc: "Art, design, storytelling & imaginative projects",
    color: "#DE512E",
    bgColor: "#FFF2EE",
    borderColor: "#FFD8CC",
    icon: Palette,
  },
  {
    id: "discover",
    label: "Discover",
    tagline: "Science & Nature",
    shortDesc: "Nature, science, research & exploration",
    color: "#00838F",
    bgColor: "#E8F9FA",
    borderColor: "#C5F2F6",
    icon: Compass,
  },
  {
    id: "solve",
    label: "Solve",
    tagline: "Tech & Logic",
    shortDesc: "Puzzles, technology, entrepreneurship & challenges",
    color: "#6757F5",
    bgColor: "#F0EDFF",
    borderColor: "#DDD8FE",
    icon: Lightbulb,
  },
  {
    id: "impact",
    label: "Make an Impact",
    tagline: "Community & Society",
    shortDesc: "People, communities, environment & social action",
    color: "#047857",
    bgColor: "#E8F9F0",
    borderColor: "#A7F3D0",
    icon: HeartHandshake,
  },
];

interface SceneCopy {
  headline: string;
  subtext: string;
}

interface SceneConfig {
  id: number;
  label: string;
  stepNumber: string;
  sparks: Record<CuriositySpark, SceneCopy>;
  component: React.ComponentType<IllustrationProps>;
}

const SCENES: SceneConfig[] = [
  {
    id: 0,
    label: "Discover",
    stepNumber: "01",
    sparks: {
      all: {
        headline: "What makes you curious?",
        subtext: "Start by exploring what genuinely excites you—from nature and science to stories, technology, and art.",
      },
      create: {
        headline: "What inspires your imagination?",
        subtext: "Explore how visual arts, storytelling, and design turn raw ideas into creative expressions.",
      },
      discover: {
        headline: "What makes you curious?",
        subtext: "Explore the mysteries of nature, scientific questions, and how the world works around us.",
      },
      solve: {
        headline: "What puzzles grab your attention?",
        subtext: "Explore technology, logical systems, and clever ways to untangle real-world problems.",
      },
      impact: {
        headline: "What changes do you want to see?",
        subtext: "Explore how helping people, communities, and our environment sparks meaningful purpose.",
      },
    },
    component: DiscoverScene,
  },
  {
    id: 1,
    label: "Explore",
    stepNumber: "02",
    sparks: {
      all: {
        headline: "There's so much to discover.",
        subtext: "Step into vibrant worlds of learning and see how your favorite topics connect together.",
      },
      create: {
        headline: "Immerse in creative worlds.",
        subtext: "Wander through digital design, character animation, creative writing, and visual arts.",
      },
      discover: {
        headline: "Wander into scientific realms.",
        subtext: "Journey through astronomy, field ecology, biotechnology, and observational research.",
      },
      solve: {
        headline: "Connect code and challenges.",
        subtext: "Investigate software logic, smart hardware, engineering prototypes, and practical builds.",
      },
      impact: {
        headline: "Discover ways to make a difference.",
        subtext: "Explore community health, renewable ecology, education access, and public innovation.",
      },
    },
    component: ExploreScene,
  },
  {
    id: 2,
    label: "Try",
    stepNumber: "03",
    sparks: {
      all: {
        headline: "Try something new!",
        subtext: "Build a fun mini-project, solve a puzzle, or try a hands-on activity just to see what you like.",
      },
      create: {
        headline: "Bring your ideas to life!",
        subtext: "Sketch a storyboard, style a digital character, or craft a creative visual mini-project.",
      },
      discover: {
        headline: "Investigate and experiment!",
        subtext: "Run a simple nature study, analyze microscope samples, or test a scientific question hands-on.",
      },
      solve: {
        headline: "Build and test a solution!",
        subtext: "Write your first automation script, debug a logic puzzle, or assemble a smart prototype.",
      },
      impact: {
        headline: "Work on a real community need!",
        subtext: "Map a local neighbourhood project, design an eco-friendly plan, or organize a helpful initiative.",
      },
    },
    component: TryScene,
  },
  {
    id: 3,
    label: "Grow",
    stepNumber: "04",
    sparks: {
      all: {
        headline: "Your journey keeps growing.",
        subtext: "Every new experience opens more possibilities. Keep learning, creating, and exploring at your own pace.",
      },
      create: {
        headline: "Your creative world expands.",
        subtext: "Every piece of art or story you craft opens new collaborative projects and creative horizons.",
      },
      discover: {
        headline: "New horizons unfold.",
        subtext: "Each question you investigate deepens your understanding and reveals fascinating new areas to study.",
      },
      solve: {
        headline: "New challenges become possible.",
        subtext: "Each puzzle you solve equips you with practical problem-solving confidence for bigger builds.",
      },
      impact: {
        headline: "Your positive contribution grows.",
        subtext: "Every hands-on initiative connects you with more people and meaningful ways to contribute.",
      },
    },
    component: GrowScene,
  },
];

export function StudentJourneyShowcase() {
  const [selectedSpark, setSelectedSpark] = useState<CuriositySpark>("all");
  const [isSparkMenuOpen, setIsSparkMenuOpen] = useState<boolean>(false);
  const [activeScene, setActiveScene] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const sparkMenuRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const DURATION_MS = 5500;
  const TICK_INTERVAL = 100;

  // Reduced motion preference detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      const frameId = requestAnimationFrame(() => {
        setIsReducedMotion(true);
        setIsPlaying(false);
      });
      return () => cancelAnimationFrame(frameId);
    }
    const handler = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (e.matches) setIsPlaying(false);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Close spark popover on click outside or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sparkMenuRef.current && !sparkMenuRef.current.contains(event.target as Node)) {
        setIsSparkMenuOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSparkMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
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
  const content = current.sparks[selectedSpark] || current.sparks.all;
  const ActiveSceneIllustration = current.component;
  const currentSparkConfig = SPARK_OPTIONS.find((s) => s.id === selectedSpark) || SPARK_OPTIONS[0];
  const CurrentSparkIcon = currentSparkConfig.icon;

  return (
    <div
      className="relative rounded-3xl bg-white border border-[#DDD8FE] shadow-[0_20px_50px_-15px_rgba(23,26,43,0.08)] overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Student Journey Interactive Showcase"
    >
      {/* Top Bar: "See where curiosity takes you ✨" & "Choose Your Spark" Control */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-[#F0EEF8] bg-gradient-to-r from-[#FAF9FE] via-[#F6F4FF]/70 to-white">
        {/* Refined Heading */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6757F5] opacity-60 ${
                isPlaying && !isHovered ? "" : "hidden"
              } motion-reduce:hidden`}
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-[#6757F5] to-[#35B8C5]" />
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-[#171A2B] tracking-tight flex items-center gap-1">
            <span>See where</span>
            <span className="bg-gradient-to-r from-[#6757F5] via-[#8B5CF6] to-[#00A8B5] bg-clip-text text-transparent font-extrabold px-0.5">
              curiosity
            </span>
            <span>takes you</span>
            <span
              className="inline-block text-[#F59E0B] text-xs sm:text-sm transition-transform duration-300 hover:scale-125 motion-reduce:animate-none"
              role="img"
              aria-label="sparkles"
            >
              ✨
            </span>
          </h3>
        </div>

        {/* Compact "Choose Your Spark" Interactive Selector */}
        <div className="relative" ref={sparkMenuRef}>
          <button
            type="button"
            onClick={() => setIsSparkMenuOpen((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
              selectedSpark !== "all"
                ? "bg-white text-[#171A2B] border-[#DDD8FE] shadow-xs"
                : "bg-[#FAF9F6] text-[#31364F] border-[#E8E6F3] hover:bg-white hover:border-[#DDD8FE]"
            }`}
            aria-haspopup="true"
            aria-expanded={isSparkMenuOpen}
            aria-label="Choose your spark interest"
          >
            <CurrentSparkIcon
              className="w-3.5 h-3.5"
              style={{ color: currentSparkConfig.color }}
            />
            <span className="font-bold text-[#171A2B]">
              {selectedSpark === "all" ? "Choose Your Spark" : currentSparkConfig.label}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#626987] transition-transform duration-200 ${
                isSparkMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Spark Selection Popover */}
          {isSparkMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white border border-[#DDD8FE] shadow-[0_12px_32px_-8px_rgba(23,26,43,0.14)] p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150"
              role="menu"
              aria-label="Curiosity spark options"
            >
              <div className="px-3 py-2 border-b border-[#F0EEF8] mb-1">
                <p className="text-[11px] font-bold text-[#626987] uppercase tracking-wider">
                  Choose Your Spark
                </p>
                <p className="text-xs text-[#31364F] mt-0.5">
                  See how the journey adapts to what excites you
                </p>
              </div>

              <div className="space-y-1">
                {SPARK_OPTIONS.map((spark) => {
                  const isSelected = selectedSpark === spark.id;
                  const Icon = spark.icon;
                  return (
                    <button
                      key={spark.id}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setSelectedSpark(spark.id);
                        setIsSparkMenuOpen(false);
                      }}
                      className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors ${
                        isSelected
                          ? "bg-[#FAF8FF] border border-[#DDD8FE]/80"
                          : "hover:bg-[#FAF9F6] border border-transparent"
                      }`}
                    >
                      <div
                        className="p-1.5 rounded-lg shrink-0 mt-0.5"
                        style={{ backgroundColor: spark.bgColor }}
                      >
                        <Icon className="w-4 h-4" style={{ color: spark.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#171A2B]">
                            {spark.label}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] font-bold text-[#6757F5] bg-[#EDEAFF] px-1.5 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#626987] line-clamp-1 leading-snug">
                          {spark.shortDesc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
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
              {isActive && isPlaying && !isHovered && !isReducedMotion && (
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
            {selectedSpark !== "all" && (
              <span
                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border"
                style={{
                  backgroundColor: currentSparkConfig.bgColor,
                  color: currentSparkConfig.color,
                  borderColor: currentSparkConfig.borderColor,
                }}
              >
                Spark: {currentSparkConfig.label}
              </span>
            )}
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
          <ActiveSceneIllustration spark={selectedSpark} />
        </div>

        {/* Bottom Control Bar: Prev / Play / Pause / Next Controls */}
        <div className="pt-2 flex items-center justify-between text-xs text-[#626987] border-t border-[#F0EEF8]/80">
          {/* Autoplay toggle and clear state indicator */}
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
                  <span className="text-[11px]">Resume</span>
                </>
              )}
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#626987]">
              {isReducedMotion && !isPlaying ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8E95AF]" />
                  <span>Static mode (reduced motion)</span>
                </>
              ) : !isPlaying ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8E95AF]" />
                  <span>Playback paused</span>
                </>
              ) : isHovered ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                  <span>Paused on hover</span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Auto-advancing</span>
                </>
              )}
            </div>
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
