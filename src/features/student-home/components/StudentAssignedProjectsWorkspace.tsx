/**
 * NEXT MOVE AI V2 — STUDENT ASSIGNED PROJECTS WORKSPACE
 * 
 * Rendered at: /dashboard/student/projects
 * 
 * Displays the logged-in student's actual assigned activities, tasks, and mini-projects:
 * - Tasks/activities currently assigned to the student (personalized pair)
 * - Tasks not started yet, in progress, and completed
 * - Real step-by-step progress tracking (e.g. 2/5 steps completed · 40%)
 * - Interactive step completion & immediate persistence in Firestore / profile-store
 * - Real-time status filters: All, In Progress, Not Started, Completed
 * - Real data from userProfile, startingPoint, nextMoveActivity, nextMoveHistory
 * - Honest empty states when no work assigned or started yet
 */

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FolderGit2,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Compass,
  Trophy,
  Target,
  ListChecks,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { useStudentHome } from "../hooks/useStudentHome";
import { PersonaSwitcherExploreBar } from "@/features/explore/components/PersonaSwitcherExploreBar";
import {
  getPersonalizedActivityPairForStudent,
  initializeStudentActivity,
  type PersonalizedActivity,
} from "../data/next-move-activities";
import { type ActivityStep, type StudentNextMoveActivity } from "@/lib/firestore-service";

export type ProjectTaskFilter = "all" | "in_progress" | "not_started" | "completed";

export interface UnifiedStudentTask {
  id: string;
  title: string;
  description: string;
  learningOutcome: string;
  estimatedDuration: string;
  categories: string[];
  steps: ActivityStep[];
  completedStepIds: string[];
  progressPercentage: number;
  status: "not_started" | "in_progress" | "completed";
  isAssignedRecommendation: boolean;
  isCurrentActive: boolean;
  whySuggested?: string;
  completedAt?: string | null;
  updatedAt?: string | null;
}

export function StudentAssignedProjectsWorkspace() {
  const {
    viewModel,
    startingPoint,
    userProfile,
    activePersonaId,
    isRealAuthenticatedUser,
    nextMoveActivity,
    nextMoveHistory,
    saveNextMoveActivity,
  } = useStudentHome();

  const [activeFilter, setActiveFilter] = useState<ProjectTaskFilter>("all");
  const [expandedTaskIds, setExpandedTaskIds] = useState<Record<string, boolean>>({});
  const [isSavingStep, setIsSavingStep] = useState(false);

  // Student identification & stage
  const studentName = userProfile?.name || viewModel.studentName || "Student";
  const academicStage = userProfile?.academicStage || viewModel.academicStageId;

  // 1. Resolve student's personalized assigned activity pair
  const personalizedPair = useMemo(() => {
    return getPersonalizedActivityPairForStudent({
      startingPoint,
      academicStage,
      activePersonaId,
      isRealUser: isRealAuthenticatedUser,
    });
  }, [startingPoint, academicStage, activePersonaId, isRealAuthenticatedUser]);

  // 2. Build unified list of real tasks for this student
  const tasks: UnifiedStudentTask[] = useMemo(() => {
    const taskMap = new Map<string, UnifiedStudentTask>();

    // A. Add historical / attempted activities from nextMoveHistory
    if (nextMoveHistory && Object.keys(nextMoveHistory).length > 0) {
      Object.values(nextMoveHistory).forEach((act) => {
        const total = act.steps?.length || 5;
        const doneCount = act.completedStepIds?.length || 0;
        let status: "not_started" | "in_progress" | "completed" = "not_started";
        if (doneCount >= total && total > 0) {
          status = "completed";
        } else if (doneCount > 0) {
          status = "in_progress";
        }

        taskMap.set(act.activityId, {
          id: act.activityId,
          title: act.title,
          description: act.description,
          learningOutcome: act.learningOutcome,
          estimatedDuration: act.estimatedDuration || "20 mins",
          categories: ["Hands-on Learning"],
          steps: act.steps || [],
          completedStepIds: act.completedStepIds || [],
          progressPercentage: act.progressPercentage || Math.round((doneCount / total) * 100),
          status: act.status === "completed" || status === "completed" ? "completed" : status,
          isAssignedRecommendation: false,
          isCurrentActive: nextMoveActivity?.activityId === act.activityId,
          completedAt: act.completedAt,
          updatedAt: act.updatedAt,
        });
      });
    }

    // B. Add active activity (if present and not already mapped or has fresher state)
    if (nextMoveActivity) {
      const act = nextMoveActivity;
      const total = act.steps?.length || 5;
      const doneCount = act.completedStepIds?.length || 0;
      let status: "not_started" | "in_progress" | "completed" = "not_started";
      if (doneCount >= total && total > 0) {
        status = "completed";
      } else if (doneCount > 0) {
        status = "in_progress";
      }

      taskMap.set(act.activityId, {
        id: act.activityId,
        title: act.title,
        description: act.description,
        learningOutcome: act.learningOutcome,
        estimatedDuration: act.estimatedDuration || "20 mins",
        categories: ["Primary Focus"],
        steps: act.steps || [],
        completedStepIds: act.completedStepIds || [],
        progressPercentage: act.progressPercentage || Math.round((doneCount / total) * 100),
        status: act.status === "completed" || status === "completed" ? "completed" : status,
        isAssignedRecommendation: true,
        isCurrentActive: true,
        completedAt: act.completedAt,
        updatedAt: act.updatedAt,
      });
    }

    // C. Add the assigned 2 personalized activities from Starting Point
    personalizedPair.forEach((pairAct) => {
      if (!taskMap.has(pairAct.id)) {
        taskMap.set(pairAct.id, {
          id: pairAct.id,
          title: pairAct.title,
          description: pairAct.description,
          learningOutcome: pairAct.learningOutcome,
          estimatedDuration: pairAct.estimatedDuration,
          categories: pairAct.categories,
          steps: pairAct.steps,
          completedStepIds: [],
          progressPercentage: 0,
          status: "not_started",
          isAssignedRecommendation: true,
          isCurrentActive: false,
          whySuggested: pairAct.whySuggested,
        });
      } else {
        // Tag as assigned recommendation even if already in history
        const existing = taskMap.get(pairAct.id)!;
        existing.isAssignedRecommendation = true;
        if (!existing.whySuggested) existing.whySuggested = pairAct.whySuggested;
        if (pairAct.categories.length > 0) existing.categories = pairAct.categories;
      }
    });

    return Array.from(taskMap.values());
  }, [nextMoveHistory, nextMoveActivity, personalizedPair]);

  // Counts for filters
  const counts = useMemo(() => {
    const inProgress = tasks.filter((t) => t.status === "in_progress").length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const notStarted = tasks.filter((t) => t.status === "not_started").length;
    return {
      all: tasks.length,
      in_progress: inProgress,
      completed,
      not_started: notStarted,
    };
  }, [tasks]);

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    if (activeFilter === "all") return tasks;
    return tasks.filter((t) => t.status === activeFilter);
  }, [tasks, activeFilter]);

  // Toggle step completion in real-time
  const handleToggleStep = async (task: UnifiedStudentTask, stepId: string) => {
    if (isSavingStep) return;
    setIsSavingStep(true);

    const isDone = task.completedStepIds.includes(stepId);
    const newCompletedStepIds = isDone
      ? task.completedStepIds.filter((id) => id !== stepId)
      : [...task.completedStepIds, stepId];

    const totalSteps = task.steps.length;
    const isCompleted = newCompletedStepIds.length >= totalSteps && totalSteps > 0;
    const progressPct = totalSteps > 0 ? Math.round((newCompletedStepIds.length / totalSteps) * 100) : 0;

    const updatedActivity: StudentNextMoveActivity = {
      activityId: task.id,
      title: task.title,
      description: task.description,
      learningOutcome: task.learningOutcome,
      estimatedDuration: task.estimatedDuration,
      steps: task.steps,
      completedStepIds: newCompletedStepIds,
      progressPercentage: progressPct,
      status: isCompleted ? "completed" : newCompletedStepIds.length > 0 ? "in_progress" : "not_started",
      createdAt: task.updatedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: isCompleted ? new Date().toISOString() : null,
    };

    try {
      await saveNextMoveActivity(updatedActivity);
    } catch (err) {
      console.error("Failed to update task step:", err);
    } finally {
      setIsSavingStep(false);
    }
  };

  const toggleExpand = (taskId: string) => {
    setExpandedTaskIds((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  // Check if student has no assigned work (e.g. fresh account with no questionnaire)
  const hasNoWork = tasks.length === 0 && !startingPoint;

  return (
    <div className="space-y-6 pb-12" data-testid="student-projects-workspace">
      {/* Dev Persona Switcher Bar */}
      <PersonaSwitcherExploreBar />

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#171A2B] via-[#222842] to-[#171A2B] text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/dashboard/student"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-white/70 hover:text-white transition-colors bg-white/10 px-2.5 py-1 rounded-xl"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>

            <span className="text-[10px] font-bold uppercase tracking-wider text-[#DDD8FE] bg-white/10 px-2.5 py-1 rounded-xl">
              My Projects & Assigned Work
            </span>

            {academicStage && (
              <span className="text-[10px] font-bold text-[#A7F3D0] bg-[#065F46]/60 px-2.5 py-1 rounded-xl">
                {academicStage === "classes-4-7"
                  ? "Classes 4–7 · Practical Challenges"
                  : `Stage: ${academicStage}`}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
              {studentName}&apos;s Assigned Work &amp; Projects
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
              Track your actual assigned learning challenges, step-by-step progress, and completed work. Every activity you do builds concrete skills.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 pt-2 text-xs text-white/90 flex-wrap">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <FolderGit2 className="w-4 h-4 text-[#DDD8FE]" />
              <span>
                <strong className="text-white">{counts.all}</strong> Assigned Tasks
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <Clock className="w-4 h-4 text-[#FEDF89]" />
              <span>
                <strong className="text-white">{counts.in_progress}</strong> In Progress
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-[#A7F3D0]" />
              <span>
                <strong className="text-white">{counts.completed}</strong> Completed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8E6F3] pb-3 text-xs overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          data-testid="filter-all"
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeFilter === "all"
              ? "bg-[#6757F5] text-white shadow-xs"
              : "bg-white text-[#626987] hover:bg-[#F4F3F8] hover:text-[#171A2B] border border-[#E8E6F3]"
          }`}
        >
          <span>All Tasks</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeFilter === "all" ? "bg-white/20 text-white" : "bg-[#F2F1FA] text-[#6757F5]"}`}>
            {counts.all}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter("in_progress")}
          data-testid="filter-in-progress"
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeFilter === "in_progress"
              ? "bg-[#6757F5] text-white shadow-xs"
              : "bg-white text-[#626987] hover:bg-[#F4F3F8] hover:text-[#171A2B] border border-[#E8E6F3]"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>In Progress</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeFilter === "in_progress" ? "bg-white/20 text-white" : "bg-[#FEF0C7] text-[#B54708]"}`}>
            {counts.in_progress}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter("not_started")}
          data-testid="filter-not-started"
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeFilter === "not_started"
              ? "bg-[#6757F5] text-white shadow-xs"
              : "bg-white text-[#626987] hover:bg-[#F4F3F8] hover:text-[#171A2B] border border-[#E8E6F3]"
          }`}
        >
          <Circle className="w-3.5 h-3.5" />
          <span>Not Started</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeFilter === "not_started" ? "bg-white/20 text-white" : "bg-[#F4F3F8] text-[#626987]"}`}>
            {counts.not_started}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter("completed")}
          data-testid="filter-completed"
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeFilter === "completed"
              ? "bg-[#6757F5] text-white shadow-xs"
              : "bg-white text-[#626987] hover:bg-[#F4F3F8] hover:text-[#171A2B] border border-[#E8E6F3]"
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Completed</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeFilter === "completed" ? "bg-white/20 text-white" : "bg-[#ECFDF3] text-[#027A48]"}`}>
            {counts.completed}
          </span>
        </button>
      </div>

      {/* Empty State: When no work assigned */}
      {hasNoWork ? (
        <div className="bg-white rounded-3xl border border-[#E8E6F3] p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F4F3F8] text-[#6757F5] flex items-center justify-center mx-auto">
            <FolderGit2 className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-lg sm:text-xl font-black text-[#171A2B]">No Activities Assigned Yet</h2>
            <p className="text-xs sm:text-sm text-[#626987] leading-relaxed">
              Complete your quick Starting Point questionnaire on the Home dashboard to get personalized learning activities, challenges, and mini-projects tailored to your class and interests.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/dashboard/student"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] text-white font-bold text-xs hover:bg-[#5545E0] transition-colors shadow-xs"
            >
              <span>Go to Home Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : filteredTasks.length === 0 ? (
        /* Empty State for current active filter */
        <div className="bg-white rounded-3xl border border-[#E8E6F3] p-8 text-center max-w-lg mx-auto space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#F4F3F8] text-[#626987] flex items-center justify-center mx-auto">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#171A2B]">
            No {activeFilter.replace("_", " ")} tasks
          </h2>
          <p className="text-xs text-[#626987]">
            {activeFilter === "completed"
              ? "You haven't completed any tasks yet. Continue working on your in-progress activities to complete them."
              : activeFilter === "in_progress"
              ? "You don't have any tasks in progress right now. Pick an assigned task below to start."
              : "All your assigned tasks have been started or completed!"}
          </p>
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className="text-xs font-bold text-[#6757F5] hover:underline pt-1"
          >
            View all tasks
          </button>
        </div>
      ) : (
        /* Tasks List Grid */
        <div className="grid grid-cols-1 gap-5">
          {filteredTasks.map((task) => {
            const isExpanded = expandedTaskIds[task.id] ?? (task.status === "in_progress");
            const totalSteps = task.steps.length;
            const completedCount = task.completedStepIds.length;
            const isCompleted = task.status === "completed";
            const isInProgress = task.status === "in_progress";

            return (
              <div
                key={task.id}
                data-testid={`project-task-${task.id}`}
                className={`bg-white rounded-3xl border transition-all p-5 sm:p-6 space-y-4 ${
                  isCompleted
                    ? "border-[#D1FADF] bg-[#F6FEF9]/30"
                    : isInProgress
                    ? "border-[#DDD8FE] shadow-sm"
                    : "border-[#E8E6F3]"
                }`}
              >
                {/* Top Row: Status & Category Tags */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Status Badge */}
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    ) : isInProgress ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-[#F4F3F8] text-[#6757F5] border border-[#DDD8FE]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>In Progress · {completedCount}/{totalSteps} steps ({task.progressPercentage}%)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-[#F4F3F8] text-[#626987] border border-[#E8E6F3]">
                        <Circle className="w-3.5 h-3.5" />
                        <span>Not Started · {totalSteps} steps</span>
                      </span>
                    )}

                    {/* Assigned Recommendation Tag */}
                    {task.isAssignedRecommendation && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold bg-[#F4F3F8] text-[#6757F5] border border-[#DDD8FE]">
                        <Sparkles className="w-3 h-3 text-[#6757F5]" />
                        <span>Assigned Recommendation</span>
                      </span>
                    )}

                    {/* Current Focus Tag */}
                    {task.isCurrentActive && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold bg-[#FFF4ED] text-[#B93815] border border-[#FECDCA]">
                        <Target className="w-3 h-3 text-[#B93815]" />
                        <span>Current Focus</span>
                      </span>
                    )}
                  </div>

                  {/* Duration & Categories */}
                  <div className="flex items-center gap-2 text-xs text-[#626987]">
                    <span className="font-semibold">{task.estimatedDuration}</span>
                    {task.categories.map((cat) => (
                      <span key={cat} className="hidden sm:inline-block px-2 py-0.5 rounded-lg bg-[#F4F3F8] text-[10px] font-medium text-[#626987]">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight">
                    {task.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#626987] leading-relaxed">
                    {task.description}
                  </p>
                </div>

                {/* What You'll Learn Box */}
                {task.learningOutcome && (
                  <div className="p-3.5 rounded-2xl bg-[#F9F8FD] border border-[#EAE7FD] flex items-start gap-2.5 text-xs text-[#344054]">
                    <Lightbulb className="w-4 h-4 text-[#6757F5] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#171A2B] block font-bold">What You&apos;ll Learn:</strong>
                      <span className="text-[#626987]">{task.learningOutcome}</span>
                    </div>
                  </div>
                )}

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#171A2B]">
                      {completedCount} of {totalSteps} steps completed
                    </span>
                    <span className="font-bold text-[#6757F5]">{task.progressPercentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E8E6F3] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isCompleted ? "bg-[#12B76A]" : "bg-[#6757F5]"
                      }`}
                      style={{ width: `${task.progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Interactive Steps Section Toggle */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => toggleExpand(task.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] hover:text-[#5545E0] transition-colors"
                  >
                    <ListChecks className="w-3.5 h-3.5" />
                    <span>{isExpanded ? "Hide Steps" : `View & Complete Steps (${completedCount}/${totalSteps})`}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Expanded Step-by-Step Checklist */}
                {isExpanded && (
                  <div className="space-y-2.5 pt-2 border-t border-[#F2F1FA]">
                    <p className="text-[11px] font-bold text-[#626987] uppercase tracking-wider">
                      Interactive Step Checklist
                    </p>
                    <div className="space-y-2">
                      {task.steps.map((step) => {
                        const stepDone = task.completedStepIds.includes(step.id);
                        return (
                          <div
                            key={step.id}
                            className={`p-3 rounded-2xl border transition-all flex items-start gap-3 text-xs ${
                              stepDone
                                ? "bg-[#F6FEF9] border-[#D1FADF] text-[#027A48]"
                                : "bg-white border-[#E8E6F3] text-[#171A2B] hover:border-[#DDD8FE]"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => handleToggleStep(task, step.id)}
                              aria-label={`Mark step ${step.stepNumber}: ${step.title} as ${stepDone ? "incomplete" : "complete"}`}
                              className="shrink-0 mt-0.5 focus:outline-hidden"
                            >
                              {stepDone ? (
                                <CheckCircle2 className="w-5 h-5 text-[#12B76A] fill-[#D1FADF]" />
                              ) : (
                                <Circle className="w-5 h-5 text-[#98A2B3] hover:text-[#6757F5]" />
                              )}
                            </button>
                            <div className="space-y-0.5 flex-1">
                              <p className={`font-bold ${stepDone ? "line-through text-[#626987]" : "text-[#171A2B]"}`}>
                                Step {step.stepNumber}: {step.title}
                              </p>
                              <p className={`text-[11px] leading-relaxed ${stepDone ? "text-[#98A2B3]" : "text-[#626987]"}`}>
                                {step.instruction}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Bottom Actions Bar */}
                <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#F2F1FA] flex-wrap">
                  <div className="text-xs text-[#626987]">
                    {task.completedAt ? (
                      <span>Completed on {new Date(task.completedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    ) : isInProgress ? (
                      <span className="text-[#6757F5] font-semibold">Active task</span>
                    ) : (
                      <span>Ready to start</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <Link
                        href="/dashboard/student/explore"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#ECFDF3] text-[#027A48] hover:bg-[#D1FADF] transition-colors"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Explore Possibilities</span>
                      </Link>
                    ) : isInProgress ? (
                      <Link
                        href="/dashboard/student#next-move"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#6757F5] text-white hover:bg-[#5545E0] transition-colors shadow-xs"
                      >
                        <span>Continue on Dashboard</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={async () => {
                          const now = new Date().toISOString();
                          const toStart: StudentNextMoveActivity = {
                            activityId: task.id,
                            title: task.title,
                            description: task.description,
                            learningOutcome: task.learningOutcome,
                            estimatedDuration: task.estimatedDuration,
                            steps: task.steps,
                            completedStepIds: [],
                            progressPercentage: 0,
                            status: "in_progress",
                            createdAt: now,
                            updatedAt: now,
                            completedAt: null,
                          };
                          await saveNextMoveActivity(toStart);
                          setExpandedTaskIds((prev) => ({ ...prev, [task.id]: true }));
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#6757F5] text-white hover:bg-[#5545E0] transition-colors shadow-xs"
                      >
                        <span>Start This Task</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
