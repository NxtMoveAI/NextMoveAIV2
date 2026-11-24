/**
 * NEXT MOVE AI V2 — MY STARTING POINT CARD
 * 
 * Intelligent profile-summary & baseline discovery card.
 * For Classes 4–7: Displays an interactive 6-question questionnaire when new,
 * and saves/displays a personalized, rule-based baseline in Firestore.
 * Supports editing answers and returning users seamlessly.
 */

"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Edit3,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { type StudentHomeViewModel } from "../schemas/types";
import { useStudentHome } from "../hooks/useStudentHome";
import { normalizeAcademicStage } from "@/data/flow2-config";
import { type UserStartingPoint } from "@/lib/firestore-service";

// =============================================================================
// 1. QUESTION DEFINITIONS (CLASSES 4–7)
// Stored directly inside the Starting Point component as required
// =============================================================================

export interface StartingPointQuestion {
  id: number;
  title: string;
  options: string[];
}

export const CLASSES_4_TO_7_QUESTIONS: StartingPointQuestion[] = [
  {
    id: 1,
    title: "What do you enjoy doing most in your free time?",
    options: [
      "Drawing, painting, or making things",
      "Playing games or sports",
      "Exploring nature or animals",
      "Building, fixing, or experimenting",
      "Reading stories or imagining things",
      "Trying different activities",
    ],
  },
  {
    id: 2,
    title: "Which activity sounds the most exciting to you?",
    options: [
      "Creating something with my own hands",
      "Solving a puzzle or mystery",
      "Discovering how things work",
      "Helping someone or caring for others",
      "Making a story, video, or artwork",
      "Exploring something I've never tried",
    ],
  },
  {
    id: 3,
    title: "If you had a whole day to do anything you wanted, what would you choose?",
    options: [
      "Build something interesting",
      "Go on an adventure or explore outdoors",
      "Draw, create, or design something",
      "Play, experiment, and discover",
      "Learn something new",
      "Spend time doing different things",
    ],
  },
  {
    id: 4,
    title: "What makes you feel proud of yourself?",
    options: [
      "When I create something new",
      "When I solve something difficult",
      "When I learn something I didn't know",
      "When I help someone",
      "When I do something better than before",
      "When I try something even if it's difficult",
    ],
  },
  {
    id: 5,
    title: "What would you love to explore more?",
    options: [
      "Art, animation, and creativity",
      "Animals, plants, and nature",
      "Science and experiments",
      "Technology, robots, and machines",
      "Stories, games, and imagination",
      "Many different things—I haven't decided",
    ],
  },
  {
    id: 6,
    title: "How do you like learning or trying something new?",
    options: [
      "By doing it myself",
      "By watching someone and then trying",
      "By reading or learning about it first",
      "By playing and experimenting",
      "With friends or other people",
      "I like trying different ways",
    ],
  },
];

// =============================================================================
// 2. DETERMINISTIC RULE-BASED ANALYSIS LOGIC
// Evaluates selected answers to generate Primary Focus, Status, and Active Interests
// =============================================================================

export interface AnalysisResult {
  primaryFocus: string;
  status: string;
  activeInterests: string[];
}

export function analyzeClasses4to7Answers(answers: Record<number, string>): AnalysisResult {
  const scores: Record<string, number> = {
    "Creativity & Media": 0,
    "Nature & Environment": 0,
    "Technology & Building": 0,
    "Science & Discovery": 0,
    "Stories & Imagination": 0,
    "Helping & People": 0,
    "Problem Solving": 0,
    "Exploring Multiple Directions": 0,
  };

  const a1 = answers[1] || "";
  const a2 = answers[2] || "";
  const a3 = answers[3] || "";
  const a4 = answers[4] || "";
  const a5 = answers[5] || "";
  const a6 = answers[6] || "";

  // Question 1
  if (a1.includes("Drawing") || a1.includes("making")) scores["Creativity & Media"] += 2;
  if (a1.includes("sports") || a1.includes("games")) scores["Exploring Multiple Directions"] += 1;
  if (a1.includes("nature") || a1.includes("animals")) scores["Nature & Environment"] += 2;
  if (a1.includes("Building") || a1.includes("fixing")) scores["Technology & Building"] += 2;
  if (a1.includes("stories") || a1.includes("imagining")) scores["Stories & Imagination"] += 2;
  if (a1.includes("different activities")) scores["Exploring Multiple Directions"] += 2;

  // Question 2
  if (a2.includes("own hands")) scores["Creativity & Media"] += 1;
  if (a2.includes("puzzle") || a2.includes("mystery")) {
    scores["Problem Solving"] += 2;
    scores["Science & Discovery"] += 1;
  }
  if (a2.includes("how things work")) {
    scores["Science & Discovery"] += 2;
    scores["Technology & Building"] += 1;
  }
  if (a2.includes("Helping") || a2.includes("caring")) scores["Helping & People"] += 2;
  if (a2.includes("story") || a2.includes("artwork")) scores["Creativity & Media"] += 2;
  if (a2.includes("never tried")) scores["Exploring Multiple Directions"] += 2;

  // Question 3
  if (a3.includes("Build something")) scores["Technology & Building"] += 2;
  if (a3.includes("adventure") || a3.includes("outdoors")) scores["Nature & Environment"] += 2;
  if (a3.includes("Draw") || a3.includes("design")) scores["Creativity & Media"] += 2;
  if (a3.includes("experiment") || a3.includes("discover")) scores["Science & Discovery"] += 2;
  if (a3.includes("Learn something new")) scores["Problem Solving"] += 1;
  if (a3.includes("different things")) scores["Exploring Multiple Directions"] += 2;

  // Question 4
  if (a4.includes("create something")) scores["Creativity & Media"] += 2;
  if (a4.includes("solve something")) scores["Problem Solving"] += 2;
  if (a4.includes("learn something")) scores["Science & Discovery"] += 1;
  if (a4.includes("help someone")) scores["Helping & People"] += 2;
  if (a4.includes("better than before")) scores["Problem Solving"] += 1;
  if (a4.includes("even if it's difficult")) scores["Exploring Multiple Directions"] += 1;

  // Question 5
  if (a5.includes("Art") || a5.includes("animation")) scores["Creativity & Media"] += 2;
  if (a5.includes("Animals") || a5.includes("plants")) scores["Nature & Environment"] += 2;
  if (a5.includes("Science")) scores["Science & Discovery"] += 2;
  if (a5.includes("Technology") || a5.includes("robots")) scores["Technology & Building"] += 2;
  if (a5.includes("Stories") || a5.includes("imagination")) scores["Stories & Imagination"] += 2;
  if (a5.includes("Many different")) scores["Exploring Multiple Directions"] += 2;

  // Question 6
  if (a6.includes("doing it myself")) {
    scores["Technology & Building"] += 1;
    scores["Creativity & Media"] += 1;
  }
  if (a6.includes("watching someone")) scores["Stories & Imagination"] += 1;
  if (a6.includes("reading") || a6.includes("learning")) scores["Science & Discovery"] += 1;
  if (a6.includes("playing and experimenting")) scores["Science & Discovery"] += 1;
  if (a6.includes("friends")) scores["Helping & People"] += 2;
  if (a6.includes("different ways")) scores["Exploring Multiple Directions"] += 1;

  // Rank domains
  const sortedDomains = Object.entries(scores)
    .filter(([key]) => key !== "Exploring Multiple Directions")
    .sort((a, b) => b[1] - a[1]);

  const topCategory = sortedDomains[0]?.[0] || "Creativity & Media";
  const secondCategory = sortedDomains[1]?.[0] || "Science & Discovery";
  const thirdCategory = sortedDomains[2]?.[0];

  // Derive active interests
  const activeInterests: string[] = [topCategory, secondCategory];
  if (thirdCategory && scores[thirdCategory] >= 2) {
    activeInterests.push(thirdCategory);
  }

  // Derive primary focus
  let primaryFocus: string;
  switch (topCategory) {
    case "Creativity & Media":
      primaryFocus = "Discovering creative ideas and learning by making, drawing, and exploring.";
      break;
    case "Nature & Environment":
      primaryFocus = "Exploring wildlife, observing plants, and discovering the natural world outdoors.";
      break;
    case "Technology & Building":
      primaryFocus = "Building, tinkering with models, and discovering how machines and tools work.";
      break;
    case "Science & Discovery":
      primaryFocus = "Conducting fun experiments, observing changes, and uncovering scientific mysteries.";
      break;
    case "Stories & Imagination":
      primaryFocus = "Imagining new adventures, crafting creative stories, and exploring expressive ideas.";
      break;
    case "Helping & People":
      primaryFocus = "Working with friends, helping others, and finding fun ways to solve problems together.";
      break;
    case "Problem Solving":
      primaryFocus = "Solving curious puzzles, testing different solutions, and mastering challenges.";
      break;
    default:
      primaryFocus = "Discovering new hobbies, exploring different activities, and building personal curiosity.";
  }

  // Derive status
  let status: string;
  const topScore = sortedDomains[0]?.[1] || 0;
  if (scores["Exploring Multiple Directions"] >= 4) {
    status = "Exploring Potential Directions";
  } else if (topScore >= 4) {
    status = "Exploring Interests";
  } else if (topCategory === "Science & Discovery" || topCategory === "Technology & Building") {
    status = "Discovering Possibilities";
  } else {
    status = "Building Curiosity";
  }

  return {
    primaryFocus,
    status,
    activeInterests,
  };
}

// =============================================================================
// 3. MAIN MY STARTING POINT COMPONENT
// =============================================================================

interface StartingPointCardProps {
  viewModel: StudentHomeViewModel;
}

export function StartingPointCard({ viewModel }: StartingPointCardProps) {
  const { userProfile, startingPoint, saveStartingPoint } = useStudentHome();

  // Resolved stage
  const currentStage = normalizeAcademicStage(userProfile?.academicStage || viewModel.academicStageId);
  const isClass4to7 = currentStage === "classes-4-7";

  // Check if saved baseline exists
  const hasCompletedBaseline = Boolean(startingPoint?.isCompleted);

  // Local questionnaire state
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>(() => {
    if (startingPoint?.answers) {
      const numericAnswers: Record<number, string> = {};
      Object.entries(startingPoint.answers).forEach(([key, val]) => {
        numericAnswers[parseInt(key, 10)] = val;
      });
      return numericAnswers;
    }
    return {};
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const questions = CLASSES_4_TO_7_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const currentAnswer = selectedAnswers[currentQuestion?.id];

  const handleSelectOption = (option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleComplete = async () => {
    if (!currentAnswer) return;

    setIsSaving(true);
    try {
      const analysis = analyzeClasses4to7Answers(selectedAnswers);

      const serializedAnswers: Record<string, string> = {};
      Object.entries(selectedAnswers).forEach(([k, v]) => {
        serializedAnswers[String(k)] = v;
      });

      const newStartingPoint: UserStartingPoint = {
        answers: serializedAnswers,
        academicStage: currentStage,
        primaryFocus: analysis.primaryFocus,
        status: analysis.status,
        activeInterests: analysis.activeInterests,
        isCompleted: true,
        completedAt: startingPoint?.completedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveStartingPoint(newStartingPoint);
      setIsEditMode(false);
      setCurrentQuestionIndex(0);
    } catch (err) {
      console.error("Error saving starting point:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStartEdit = () => {
    if (startingPoint?.answers) {
      const numericAnswers: Record<number, string> = {};
      Object.entries(startingPoint.answers).forEach(([key, val]) => {
        numericAnswers[parseInt(key, 10)] = val;
      });
      setSelectedAnswers(numericAnswers);
    }
    setIsEditMode(true);
    setCurrentQuestionIndex(0);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setCurrentQuestionIndex(0);
    // Reset back to saved answers
    if (startingPoint?.answers) {
      const numericAnswers: Record<number, string> = {};
      Object.entries(startingPoint.answers).forEach(([key, val]) => {
        numericAnswers[parseInt(key, 10)] = val;
      });
      setSelectedAnswers(numericAnswers);
    }
  };

  // ---------------------------------------------------------------------------
  // SCENARIO A: Non-Classes 4–7 stage handling
  // Do NOT display Classes 4–7 questionnaire to other stages!
  // ---------------------------------------------------------------------------
  if (!isClass4to7) {
    return (
      <div
        id="starting-point"
        className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E6F3] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight">
                My Starting Point
              </h2>
              <p className="text-xs text-[#626987]">
                Baseline profile for {viewModel.academicStageLabel}
              </p>
            </div>
          </div>

          <span className="text-[11px] font-bold text-[#6757F5] bg-[#EDEAFF] px-3 py-1 rounded-full self-start sm:self-auto">
            {viewModel.academicStageLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE]/60 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
              Where You Stand
            </span>
            <p className="text-xs sm:text-sm font-bold text-[#171A2B] leading-snug">
              {viewModel.academicSummary}
            </p>
            <p className="text-[11px] text-[#626987]">Stage: {viewModel.academicStageLabel}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE]/60 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
              Primary Focus
            </span>
            <p className="text-xs sm:text-sm font-bold text-[#171A2B] leading-snug line-clamp-2">
              {viewModel.primaryGoal}
            </p>
            <p className="text-[11px] text-[#059669] font-semibold">
              Status: {viewModel.clarityLevelLabel}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE]/60 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
              Active Interests
            </span>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EDEAFF] text-[#6757F5]">
                Tailored to {viewModel.academicStageLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Progressive Disclosure Toggle */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#626987] hover:text-[#171A2B] transition-colors"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? "Hide detailed baseline" : "Inspect full baseline answers"}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {isExpanded && (
            <div className="mt-3 p-4 rounded-2xl bg-[#F4F3F8] border border-[#E8E6F3] space-y-3 text-xs text-[#31364F] animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="font-bold text-[#171A2B] block pb-0.5">Selected Sub-Interests:</span>
                  {viewModel.interests.selectedSubInterestIds.length > 0 ? (
                    <ul className="list-disc list-inside space-y-0.5 text-[#626987]">
                      {viewModel.interests.selectedSubInterestIds.map((id) => (
                        <li key={id}>{id.replace(/_/g, " ").replace(/^[a-z]+ /, "")}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[#8C93AD] italic">None selected (exploring freely)</p>
                  )}
                </div>

                <div>
                  <span className="font-bold text-[#171A2B] block pb-0.5">Truthful Evidence Status:</span>
                  <p className="text-[#626987]">
                    {viewModel.growthSnapshot.totalPractisedCount} skills practised in challenge •{" "}
                    {viewModel.growthSnapshot.totalSelfReportedCount} self-reported familiarity •{" "}
                    {viewModel.growthSnapshot.unassessedAreasCount} unassessed exploration areas.
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-[#8C93AD] pt-1 border-t border-[#E8E6F3] italic">
                Student Profile Revision: <code>{viewModel.profileRevision}</code> • Last updated {new Date(viewModel.updatedAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENARIO B: Classes 4–7 Interactive Questionnaire (New user OR Edit mode)
  // ---------------------------------------------------------------------------
  if (!hasCompletedBaseline || isEditMode) {
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
    const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

    return (
      <div
        id="starting-point"
        className="p-6 sm:p-7 rounded-3xl bg-white border border-[#DDD8FE] shadow-sm space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E6F3] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight">
                My Starting Point
              </h2>
              <p className="text-xs text-[#626987]">
                {isEditMode ? "Editing your answers" : "6 fun questions to discover your favorite activities"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-[#6757F5] bg-[#EDEAFF] border border-[#DDD8FE] px-3 py-1 rounded-full">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>

            {isEditMode && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-xs font-bold text-[#626987] hover:text-[#171A2B] px-2 py-1 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-semibold text-[#626987]">
            <span>Exploration Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#E8E6F3] overflow-hidden">
            <div
              className="h-full bg-[#6757F5] transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Area */}
        <div className="space-y-4 pt-1">
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#171A2B] leading-snug">
              {currentQuestion.title}
            </h3>
            <p className="text-xs text-[#626987] mt-1">
              Choose the option that sounds most exciting to you.
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {currentQuestion.options.map((option) => {
              const isSelected = currentAnswer === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all duration-150 ${
                    isSelected
                      ? "border-[#6757F5] bg-[#F7F6FF] text-[#171A2B] shadow-sm ring-2 ring-[#6757F5]/20"
                      : "border-[#E8E6F3] bg-white text-[#474D66] hover:border-[#DDD8FE] hover:bg-[#FAF9F6]"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-[#6757F5] bg-[#6757F5]"
                        : "border-[#8C93AD] bg-white"
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span className="leading-snug">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E8E6F3]">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              currentQuestionIndex === 0
                ? "text-[#A5ABBD] cursor-not-allowed opacity-50"
                : "text-[#474D66] hover:text-[#171A2B] hover:bg-[#F4F3F8]"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {isLastQuestion ? (
            <button
              type="button"
              onClick={handleComplete}
              disabled={!currentAnswer || isSaving}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md shadow-[#6757F5]/25 transition-all ${
                !currentAnswer || isSaving
                  ? "bg-[#C2C7D6] cursor-not-allowed opacity-70"
                  : "bg-[#6757F5] hover:bg-[#5342E8] active:scale-[0.99]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isSaving ? "Saving Baseline..." : isEditMode ? "Save Changes" : "Complete & View Starting Point"}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={!currentAnswer}
              className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md shadow-[#6757F5]/25 transition-all ${
                !currentAnswer
                  ? "bg-[#C2C7D6] cursor-not-allowed opacity-70"
                  : "bg-[#6757F5] hover:bg-[#5342E8] active:scale-[0.99]"
              }`}
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENARIO C: Classes 4–7 Completed Starting Point Summary
  // ---------------------------------------------------------------------------
  if (!startingPoint) {
    return null;
  }

  const activeInterests = startingPoint.activeInterests || [];

  return (
    <div
      id="starting-point"
      className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-5"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E6F3] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight">
              My Starting Point
            </h2>
            <p className="text-xs text-[#626987]">
              Your personalized baseline from exploration answers
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleStartEdit}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] hover:text-[#5342E8] transition-colors self-start sm:self-auto px-3 py-1.5 rounded-xl hover:bg-[#EDEAFF]"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Answers</span>
        </button>
      </div>

      {/* Grid: Context + Focus + Interests */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Col 1: Where You Stand */}
        <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE]/60 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
            Where You Stand
          </span>
          <p className="text-xs sm:text-sm font-bold text-[#171A2B] leading-snug">
            {viewModel.academicSummary}
          </p>
          <p className="text-[11px] text-[#626987]">
            Stage: {viewModel.academicStageLabel}
          </p>
        </div>

        {/* Col 2: Primary Focus */}
        <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE]/60 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
            Primary Focus
          </span>
          <p className="text-xs sm:text-sm font-bold text-[#171A2B] leading-snug line-clamp-3">
            {startingPoint.primaryFocus}
          </p>
          <p className="text-[11px] text-[#059669] font-semibold pt-0.5">
            Status: {startingPoint.status}
          </p>
        </div>

        {/* Col 3: Active Interests */}
        <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE]/60 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
            Active Interests
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeInterests.length > 0 ? (
              activeInterests.map((interest) => (
                <span
                  key={interest}
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#DDD8FE] bg-white text-[#6757F5] shadow-2xs"
                >
                  {interest}
                </span>
              ))
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F4F3F8] text-[#474D66]">
                Exploring Interests
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Progressive Disclosure Toggle */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#626987] hover:text-[#171A2B] transition-colors"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? "Hide detailed baseline" : "Inspect full baseline answers"}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {isExpanded && (
          <div className="mt-3 p-4 rounded-2xl bg-[#F4F3F8] border border-[#E8E6F3] space-y-3 text-xs text-[#31364F] animate-in fade-in duration-200">
            <span className="font-bold text-[#171A2B] block pb-0.5">
              Your Questionnaire Responses (6 Questions):
            </span>
            <div className="space-y-2.5">
              {CLASSES_4_TO_7_QUESTIONS.map((q) => {
                const answer = startingPoint.answers?.[String(q.id)] || startingPoint.answers?.[q.id];
                return (
                  <div key={q.id} className="p-2.5 rounded-xl bg-white border border-[#E8E6F3] space-y-0.5">
                    <p className="font-bold text-[#171A2B] text-[11px]">
                      Q{q.id}. {q.title}
                    </p>
                    <p className="text-[11px] text-[#6757F5] font-semibold">
                      {answer || "Not answered"}
                    </p>
                  </div>
                );
              })}
            </div>

            {startingPoint.completedAt && (
              <p className="text-[10px] text-[#8C93AD] pt-1 border-t border-[#E8E6F3] italic">
                Completed on {new Date(startingPoint.completedAt).toLocaleDateString()}
                {startingPoint.updatedAt && startingPoint.updatedAt !== startingPoint.completedAt
                  ? ` • Updated ${new Date(startingPoint.updatedAt).toLocaleDateString()}`
                  : ""}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
