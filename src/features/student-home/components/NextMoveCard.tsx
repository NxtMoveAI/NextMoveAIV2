/**
 * NEXT MOVE AI V2 — YOUR NEXT MOVE (CHOOSE BETWEEN 2 PERSONALIZED ACTIVITIES)
 * 
 * Upgrades the Next Move experience so students can choose between 2 distinct,
 * personalized activities tailored to their Starting Point questionnaire answers,
 * primary focus, active interests, and academic stage.
 * 
 * Features:
 * - 2 distinct personalized activity cards displayed side-by-side
 * - Each card shows title, description, learning outcome, estimated time, and step count
 * - "Choose This Activity" button to pick and immediately start
 * - Interactive step-by-step checklist with checkboxes (4–5 steps per activity)
 * - Real-time progress bar, percentage, and celebration state on completion
 * - Persistent progress saved in Firestore (users/{uid})
 * - Resumes in-progress activities across refreshes and logins
 * - Prioritizes "Continue Activity" when an activity is in progress
 * - Non-destructive activity switching without losing historical progress
 */

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Target,
  Clock,
  HelpCircle,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Calendar,
  CheckCircle2,
  Circle,
  Trophy,
  ChevronDown,
  ChevronUp,
  ListChecks,
  Compass,
} from "lucide-react";
import { useStudentHome } from "../hooks/useStudentHome";
import {
  getPersonalizedActivityPairForStudent,
  getAlternativeActivitiesForStudent,
  initializeStudentActivity,
  type PersonalizedActivity,
} from "../data/next-move-activities";
import { type StudentNextMoveActivity } from "@/lib/firestore-service";

function formatEffortMinutes(effort: string | number): string {
  const str = String(effort).trim();
  const match = str.match(/^(\d+)/);
  if (match) {
    return `${match[1]} mins`;
  }
  return str.endsWith("mins") ? str : `${str} mins`;
}

export function NextMoveCard() {
  const {
    viewModel,
    startingPoint,
    userProfile,
    activePersonaId,
    isRealAuthenticatedUser,
    nextMoveActivity,
    nextMoveHistory,
    saveNextMoveActivity,
    restoreSuggestedMove,
    postponeMove,
  } = useStudentHome();

  const [showWhy, setShowWhy] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showStepsReview, setShowStepsReview] = useState(true);
  const [localActivity, setLocalActivity] = useState<StudentNextMoveActivity | null>(null);
  const [isChoosingAnother, setIsChoosingAnother] = useState(false);

  // 1. Resolve TWO distinct personalized activity options for this student
  const personalizedPair = useMemo(() => {
    return getPersonalizedActivityPairForStudent({
      startingPoint,
      academicStage: userProfile?.academicStage || viewModel.academicStageId,
      activePersonaId,
      isRealUser: isRealAuthenticatedUser,
    });
  }, [startingPoint, userProfile?.academicStage, viewModel.academicStageId, activePersonaId, isRealAuthenticatedUser]);

  const [option1, option2] = personalizedPair;
  const resolvedDefaultActivity = option1;

  // 2. Active activity: Prioritize local optimistic state, then Firestore/profile-store, then initialized default
  const activeActivity: StudentNextMoveActivity = useMemo(() => {
    if (localActivity) {
      return localActivity;
    }
    if (nextMoveActivity) {
      return nextMoveActivity;
    }
    return initializeStudentActivity(resolvedDefaultActivity);
  }, [localActivity, nextMoveActivity, resolvedDefaultActivity]);

  const steps = activeActivity.steps || [];
  const completedStepIds = activeActivity.completedStepIds || [];
  const isPostponed = viewModel.recommendedNextAction.status === "postponed";
  const isAlternative = activeActivity.activityId !== resolvedDefaultActivity.id;

  // Active status determination
  const hasActiveRecord = Boolean(localActivity || nextMoveActivity);
  const isStarted =
    hasActiveRecord &&
    (activeActivity.status === "in_progress" ||
      activeActivity.status === "completed" ||
      completedStepIds.length > 0);

  const isCompleted =
    isStarted &&
    (activeActivity.status === "completed" ||
      (steps.length > 0 && completedStepIds.length === steps.length));

  const progressPercentage =
    steps.length > 0
      ? Math.round((completedStepIds.length / steps.length) * 100)
      : 0;

  // 3. Alternative activities suitable for this student
  const alternatives = useMemo(() => {
    return getAlternativeActivitiesForStudent({
      startingPoint,
      academicStage: userProfile?.academicStage || viewModel.academicStageId,
      currentActivityId: activeActivity.activityId,
    });
  }, [startingPoint, userProfile?.academicStage, viewModel.academicStageId, activeActivity.activityId]);

  // ---------------------------------------------------------------------------
  // INTERACTIVE ACTIONS
  // ---------------------------------------------------------------------------

  // Handle "Choose This Activity" on either of the 2 cards
  const handleSelectAndStartActivity = async (chosen: PersonalizedActivity) => {
    setIsUpdating(true);
    try {
      const now = new Date().toISOString();
      // Check if this activity has prior saved progress in history
      const existing = nextMoveHistory[chosen.id];
      const activityToSet: StudentNextMoveActivity = existing
        ? {
          ...existing,
          status: existing.status === "completed" ? "completed" : "in_progress",
          updatedAt: now,
        }
        : {
          ...initializeStudentActivity(chosen),
          status: "in_progress",
          createdAt: now,
          updatedAt: now,
        };

      setLocalActivity(activityToSet);
      setIsChoosingAnother(false);
      await saveNextMoveActivity(activityToSet);
    } catch (err) {
      console.error("Failed to select activity:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Return to active activity steps from choice screen
  const handleContinueActive = () => {
    setIsChoosingAnother(false);
  };

  // Handle Step Toggle (Mark as completed / unmark)
  const handleToggleStep = async (stepId: string) => {
    setIsUpdating(true);
    try {
      const isAlreadyCompleted = completedStepIds.includes(stepId);
      const newCompletedStepIds = isAlreadyCompleted
        ? completedStepIds.filter((id) => id !== stepId)
        : [...completedStepIds, stepId];

      const newProgress = Math.round(
        (newCompletedStepIds.length / steps.length) * 100
      );
      const allDone = steps.length > 0 && newCompletedStepIds.length === steps.length;
      const now = new Date().toISOString();

      const updated: StudentNextMoveActivity = {
        ...activeActivity,
        completedStepIds: newCompletedStepIds,
        progressPercentage: newProgress,
        status: allDone ? "completed" : "in_progress",
        createdAt: activeActivity.createdAt || now,
        updatedAt: now,
        completedAt: allDone
          ? activeActivity.completedAt || now
          : null,
      };

      setLocalActivity(updated);
      await saveNextMoveActivity(updated);
    } catch (err) {
      console.error("Failed to update step progress:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle Alternative Selection from drawer (Preserves past progress in history)
  const handleSelectAlternative = async (alt: PersonalizedActivity) => {
    await handleSelectAndStartActivity(alt);
    setShowAlternatives(false);
  };

  // Reset to default recommended activity
  const handleResetToRecommended = async () => {
    await handleSelectAndStartActivity(resolvedDefaultActivity);
    restoreSuggestedMove();
  };

  // Whether the 2-activity choice view should be displayed
  const shouldShowChoiceCards = !isStarted || isChoosingAnother;

  return (
    <section
      id="next-move"
      aria-label="Your Next Move"
      aria-labelledby="next-move-heading"
      className={`relative p-6 sm:p-8 rounded-3xl border transition-all duration-200 ${isPostponed
        ? "bg-[#F4F3F8] border-[#E8E6F3]"
        : "bg-white border-[#DDD8FE] shadow-md shadow-[#6757F5]/5 ring-1 ring-[#6757F5]/10"
        }`}
    >
      {/* --------------------------------------------------------------------- */}
      {/* 1. TOP BANNER & STATUS */}
      {/* --------------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E6F3]">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${isCompleted && !shouldShowChoiceCards
              ? "bg-[#059669] text-white shadow-[#059669]/25"
              : "bg-[#6757F5] text-white shadow-[#6757F5]/25"
              }`}
          >
            {isCompleted && !shouldShowChoiceCards ? (
              <Trophy className="w-5 h-5" />
            ) : (
              <Target className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="next-move-heading"
                className="text-lg sm:text-xl font-black text-[#171A2B] tracking-tight"
              >
                Your next move
              </h2>
              {isCompleted && !shouldShowChoiceCards ? (
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                  Completed 🎉
                </span>
              ) : isStarted && !shouldShowChoiceCards ? (
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]">
                  In Progress
                </span>
              ) : isAlternative && !shouldShowChoiceCards ? (
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]">
                  Alternative Chosen
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EDEAFF] text-[#6757F5] border border-[#DDD8FE]">
                  Choose Between 2 Activities
                </span>
              )}
            </div>
            <p className="text-xs text-[#626987]">
              {shouldShowChoiceCards
                ? "Compare these 2 personalized options and choose the activity you'd like to do today"
                : "Interactive step-by-step activity · Save progress as you go"}
            </p>
          </div>
        </div>

        {/* Estimated effort badge */}
        {!isPostponed && !shouldShowChoiceCards && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F6FF] text-[#6757F5] border border-[#DDD8FE] text-xs font-bold self-start sm:self-auto">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatEffortMinutes(activeActivity.estimatedDuration)}</span>
          </div>
        )}
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 2. POSTPONED STATE */}
      {/* --------------------------------------------------------------------- */}
      {isPostponed ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#E8E6F3] text-[#626987] flex items-center justify-center mx-auto">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#171A2B]">
              Action postponed for later
            </h3>
            <p className="text-xs text-[#626987] max-w-md mx-auto">
              No pressure. Exploration happens at your pace. You can return to this suggested action anytime.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={restoreSuggestedMove}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold shadow-md shadow-[#6757F5]/20 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restore suggested move</span>
            </button>
          </div>
        </div>
      ) : shouldShowChoiceCards ? (
        /* ------------------------------------------------------------------- */
        /* 3. TWO-ACTIVITY CHOICE COMPARISON SCREEN */
        /* ------------------------------------------------------------------- */
        <div className="pt-5 space-y-6">
          {/* Active Activity Resume Banner (If an activity is already in progress) */}
          {isStarted && (
            <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#A7F3D0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#065F46] animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs">
                <Target className="w-4 h-4 text-[#059669] shrink-0" />
                <span>
                  You have an activity in progress: <strong>{activeActivity.title}</strong> ({completedStepIds.length} of {steps.length} steps completed)
                </span>
              </div>
              <button
                type="button"
                onClick={handleContinueActive}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
              >
                <span>Continue Active Activity</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* 2 Activities Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[option1, option2].map((act, index) => {
              const isThisActive = isStarted && activeActivity.activityId === act.id;
              const savedInHistory = nextMoveHistory[act.id];
              const hasSavedProgress =
                savedInHistory &&
                savedInHistory.completedStepIds &&
                savedInHistory.completedStepIds.length > 0;
              const savedCount = hasSavedProgress
                ? savedInHistory.completedStepIds.length
                : 0;

              return (
                <div
                  key={act.id}
                  className={`p-6 sm:p-7 rounded-2xl border transition-all flex flex-col justify-between ${isThisActive
                    ? "bg-[#F7F6FF] border-[#6757F5] shadow-md shadow-[#6757F5]/10 ring-2 ring-[#6757F5]/20"
                    : "bg-white border-[#DDD8FE] hover:border-[#6757F5]/60 hover:shadow-md hover:shadow-[#6757F5]/5"
                    }`}
                >
                  <div className="space-y-4">
                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6757F5] bg-[#EDEAFF] px-2.5 py-1 rounded-lg">
                          Option {index + 1}
                        </span>
                        {isThisActive ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]">
                            In Progress ({progressPercentage}%)
                          </span>
                        ) : hasSavedProgress ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                            {savedCount}/{act.steps.length} steps saved
                          </span>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#626987]">
                        <span className="inline-flex items-center gap-1 font-semibold bg-[#F4F3F8] px-2.5 py-1 rounded-full text-[#31364F]">
                          <Clock className="w-3.5 h-3.5 text-[#6757F5]" />
                          <span>{formatEffortMinutes(act.estimatedDuration)}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold bg-[#F4F3F8] px-2.5 py-1 rounded-full text-[#31364F]">
                          <ListChecks className="w-3.5 h-3.5 text-[#059669]" />
                          <span>{act.steps.length} steps</span>
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-[#171A2B] leading-snug">
                        {act.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#474D66] leading-relaxed">
                        {act.description}
                      </p>
                    </div>

                    {/* What they will learn */}
                    <div className="p-3.5 rounded-xl bg-[#F7F6FF] border border-[#DDD8FE]/60 flex items-start gap-2.5 text-xs text-[#31364F]">
                      <Sparkles className="w-4 h-4 text-[#6757F5] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#171A2B] block">What you&apos;ll learn:</span>
                        <span className="text-[#626987] leading-relaxed">{act.learningOutcome}</span>
                      </div>
                    </div>
                  </div>

                  {/* "Choose This Activity" / "Continue Activity" Button */}
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        if (isThisActive && isStarted) {
                          handleContinueActive();
                        } else {
                          handleSelectAndStartActivity(act);
                        }
                      }}
                      disabled={isUpdating}
                      className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all transform hover:-translate-y-0.5 shadow-md ${isThisActive && isStarted
                        ? "bg-[#6757F5] hover:bg-[#5342E8] text-white shadow-[#6757F5]/25"
                        : "bg-[#171A2B] hover:bg-[#2C314E] text-white shadow-[#171A2B]/20"
                        }`}
                      aria-label={isThisActive && isStarted ? "Continue Activity" : "Choose This Activity"}
                    >
                      <span className="sr-only">Start This Action</span>
                      <span>{isThisActive && isStarted ? "Continue Activity" : "Choose This Activity"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Why disclosure trigger & content */}
          <div className="space-y-2 pt-2 border-t border-[#E8E6F3]">
            <button
              type="button"
              onClick={() => setShowWhy(!showWhy)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6757F5] hover:text-[#5342E8] transition-colors"
              aria-expanded={showWhy}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showWhy ? "Hide why this was suggested" : "Why was this action suggested?"}</span>
            </button>

            {showWhy && (
              <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] space-y-1 animate-in fade-in duration-200">
                <span className="font-bold block">Grounded Suggestion Basis:</span>
                <p className="leading-relaxed">
                  {resolvedDefaultActivity.whySuggested ||
                    viewModel.recommendedNextAction.whySuggested}
                </p>
                <p className="text-[11px] text-[#B45309] italic pt-0.5">
                  Context: Personalized for {viewModel.academicStageLabel} exploration
                </p>
              </div>
            )}
          </div>

          {/* Secondary Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAlternatives(!showAlternatives)}
              className="px-4 py-2.5 rounded-xl bg-[#F4F3F8] hover:bg-[#E8E6F3] text-[#31364F] text-xs font-bold transition-colors"
              aria-expanded={showAlternatives}
            >
              <span>{showAlternatives ? "Hide Alternatives" : "Choose an Alternative"}</span>
            </button>

            <button
              type="button"
              onClick={postponeMove}
              className="text-xs font-medium text-[#8C93AD] hover:text-[#474D66] transition-colors p-1"
            >
              Postpone for later
            </button>
          </div>

          {/* Alternatives Drawer / Accordion */}
          {showAlternatives && (
            <div
              id="alternative-moves-container"
              className="mt-4 pt-4 border-t border-[#E8E6F3] space-y-3 animate-in fade-in duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#171A2B] block">
                  Choose an alternative next move that fits your mood today:
                </span>
                <span className="text-[11px] text-[#626987]">
                  Your progress on other activities is automatically saved
                </span>
              </div>

              <div className="space-y-2.5">
                {alternatives.map((alt) => {
                  const existingSaved = nextMoveHistory[alt.id];
                  const hasPriorProgress =
                    existingSaved &&
                    existingSaved.completedStepIds &&
                    existingSaved.completedStepIds.length > 0;

                  return (
                    <div
                      key={alt.id}
                      className="p-4 rounded-2xl border bg-[#F7F6FF] border-[#DDD8FE]/60 hover:border-[#6757F5]/60 transition-all space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-[#171A2B]">
                            {alt.title}
                          </span>
                          {hasPriorProgress && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                              {existingSaved.completedStepIds.length}/{alt.steps.length} steps saved
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#6757F5] border border-[#DDD8FE]">
                            ~{formatEffortMinutes(alt.estimatedDuration)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleSelectAlternative(alt)}
                            disabled={isUpdating}
                            className="px-3 py-1 rounded-lg bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5342E8] transition-colors"
                          >
                            Select this move
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-[#474D66] leading-relaxed">
                        {alt.description}
                      </p>
                      <p className="text-[11px] text-[#626987] italic">
                        Why: {alt.whySuggested}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ------------------------------------------------------------------- */
        /* 4. ACTIVE STEP-BY-STEP ACTIVITY INTERACTIVE EXPERIENCE */
        /* ------------------------------------------------------------------- */
        <div className="pt-5 space-y-5">
          {/* Action Title & Description */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-[#171A2B] leading-snug">
              {activeActivity.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#31364F] leading-relaxed">
              {activeActivity.description}
            </p>
          </div>

          {/* Learning Outcome Pill */}
          <div className="p-3.5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE]/60 flex items-start gap-2.5 text-xs text-[#31364F]">
            <Sparkles className="w-4 h-4 text-[#6757F5] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#171A2B] block">What you&apos;ll learn or clarify:</span>
              <span className="text-[#626987]">{activeActivity.learningOutcome}</span>
            </div>
          </div>

          {/* Step-by-Step Experience */}
          <div className="space-y-4 pt-1 animate-in fade-in duration-300">
            {/* Progress Tracker Bar */}
            <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#171A2B]">
                  Activity Progress
                </span>
                <span className="font-bold text-[#6757F5]">
                  {completedStepIds.length} of {steps.length} steps completed ({progressPercentage}%)
                </span>
              </div>

              {/* Visual Progress Bar */}
              <div className="w-full bg-[#E8E6F3] h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${isCompleted ? "bg-[#059669]" : "bg-[#6757F5]"
                    }`}
                  style={{ width: `${progressPercentage}%` }}
                  role="progressbar"
                  aria-valuenow={progressPercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>

            {/* CELEBRATION STATE BANNER (When 100% completed) */}
            {isCompleted && (
              <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-3 text-[#065F46] animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Trophy className="w-5 h-5 text-[#059669]" />
                  <span>Activity Completed! Excellent work! 🎉</span>
                </div>
                <p className="text-xs leading-relaxed text-[#047857]">
                  You&apos;ve completed all steps of this activity and built real practical capability today.
                  Your achievement is preserved in your workspace. You can choose another activity or explore more possibilities!
                </p>
                <div className="pt-1">
                  <Link
                    href="/dashboard/student/explore"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Explore More Possibilities</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Steps Header Toggle */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-bold text-[#171A2B]">
                Actionable Steps ({steps.length}):
              </span>
              <button
                type="button"
                onClick={() => setShowStepsReview(!showStepsReview)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#6757F5] hover:text-[#5342E8]"
              >
                <span>{showStepsReview ? "Hide Step Checklist" : "Show Step Checklist"}</span>
                {showStepsReview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Interactive Steps Checklist */}
            {showStepsReview && (
              <div id="activity-steps-container" className="space-y-3">
                {steps.map((step) => {
                  const isStepDone = completedStepIds.includes(step.id);
                  return (
                    <div
                      key={step.id}
                      onClick={() => handleToggleStep(step.id)}
                      className={`group p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3.5 ${isStepDone
                        ? "bg-[#F0FDF4] border-[#A7F3D0] hover:border-[#059669]"
                        : "bg-white border-[#E8E6F3] hover:border-[#DDD8FE] hover:shadow-xs"
                        }`}
                      role="checkbox"
                      aria-checked={isStepDone}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          handleToggleStep(step.id);
                        }
                      }}
                    >
                      {/* Checkbox button */}
                      <div className="pt-0.5 shrink-0">
                        {isStepDone ? (
                          <div className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-xs">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-[#DDD8FE] group-hover:border-[#6757F5] flex items-center justify-center transition-colors">
                            <Circle className="w-3.5 h-3.5 text-transparent" />
                          </div>
                        )}
                      </div>

                      {/* Step Details */}
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5] bg-[#EDEAFF] px-2 py-0.5 rounded-md">
                            Step {step.stepNumber}
                          </span>
                          <span
                            className={`text-xs sm:text-sm font-bold ${isStepDone
                              ? "text-[#065F46] line-through decoration-[#059669]/50"
                              : "text-[#171A2B]"
                              }`}
                          >
                            {step.title}
                          </span>
                          {isStepDone && (
                            <span className="text-[10px] font-bold text-[#059669] bg-[#DCFCE7] px-2 py-0.5 rounded-full ml-auto">
                              Completed
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-xs leading-relaxed ${isStepDone ? "text-[#047857]" : "text-[#474D66]"
                            }`}
                        >
                          {step.instruction}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Why disclosure trigger & content */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setShowWhy(!showWhy)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6757F5] hover:text-[#5342E8] transition-colors"
              aria-expanded={showWhy}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showWhy ? "Hide why this was suggested" : "Why was this action suggested?"}</span>
            </button>

            {showWhy && (
              <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] space-y-1 animate-in fade-in duration-200">
                <span className="font-bold block">Grounded Suggestion Basis:</span>
                <p className="leading-relaxed">
                  {resolvedDefaultActivity.whySuggested ||
                    viewModel.recommendedNextAction.whySuggested}
                </p>
                <p className="text-[11px] text-[#B45309] italic pt-0.5">
                  Context: Personalized for {viewModel.academicStageLabel} exploration
                </p>
              </div>
            )}
          </div>

          {/* Action CTAs & Controls */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#E8E6F3]">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsChoosingAnother(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold shadow-md shadow-[#6757F5]/25 transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Choose Another Activity</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAlternatives(!showAlternatives)}
                className="px-4 py-2.5 rounded-xl bg-[#F4F3F8] hover:bg-[#E8E6F3] text-[#31364F] text-xs font-bold transition-colors"
                aria-expanded={showAlternatives}
              >
                <span>{showAlternatives ? "Hide Alternatives" : "Choose an Alternative"}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {isAlternative && (
                <button
                  type="button"
                  onClick={handleResetToRecommended}
                  disabled={isUpdating}
                  className="text-xs font-semibold text-[#6757F5] hover:underline"
                >
                  Reset to Recommended
                </button>
              )}

              <button
                type="button"
                onClick={postponeMove}
                className="text-xs font-medium text-[#8C93AD] hover:text-[#474D66] transition-colors p-1"
              >
                Postpone for later
              </button>
            </div>
          </div>

          {/* Alternatives Drawer */}
          {showAlternatives && (
            <div
              id="alternative-moves-container"
              className="mt-4 pt-4 border-t border-[#E8E6F3] space-y-3 animate-in fade-in duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#171A2B] block">
                  Choose an alternative next move that fits your mood today:
                </span>
                <span className="text-[11px] text-[#626987]">
                  Your progress on other activities is automatically saved
                </span>
              </div>

              <div className="space-y-2.5">
                {alternatives.map((alt) => {
                  const existingSaved = nextMoveHistory[alt.id];
                  const hasPriorProgress =
                    existingSaved &&
                    existingSaved.completedStepIds &&
                    existingSaved.completedStepIds.length > 0;

                  return (
                    <div
                      key={alt.id}
                      className="p-4 rounded-2xl border bg-[#F7F6FF] border-[#DDD8FE]/60 hover:border-[#6757F5]/60 transition-all space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-[#171A2B]">
                            {alt.title}
                          </span>
                          {hasPriorProgress && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                              {existingSaved.completedStepIds.length}/{alt.steps.length} steps saved
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#6757F5] border border-[#DDD8FE]">
                            ~{formatEffortMinutes(alt.estimatedDuration)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleSelectAlternative(alt)}
                            disabled={isUpdating}
                            className="px-3 py-1 rounded-lg bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5342E8] transition-colors"
                          >
                            Select this move
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-[#474D66] leading-relaxed">
                        {alt.description}
                      </p>
                      <p className="text-[11px] text-[#626987] italic">
                        Why: {alt.whySuggested}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
