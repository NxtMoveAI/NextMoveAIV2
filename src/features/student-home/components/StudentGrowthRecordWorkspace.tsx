/**
 * NEXT MOVE AI V2 — STUDENT GROWTH RECORD WORKSPACE
 * 
 * Rendered at: /dashboard/student/growth
 * 
 * Upgrades My Growth into the student's true learning and growth log:
 * - Starting Point baseline (answers, primary focus, status, active interests)
 * - Activities attempted and completed
 * - Tasks currently in progress
 * - Skills practiced through activities and knowledge gained
 * - Project milestones and outcomes achieved
 * - Learning and exploration history over time (chronological timeline)
 * - Encouraging empty states when no activities completed yet
 * - Real data only: derived strictly from student's profile, Starting Point, and activity history
 */

"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  FolderGit2,
  Calendar,
  Award,
  Lightbulb,
  Compass,
  Circle,
  ShieldCheck,
  Target,
  BookOpen,
} from "lucide-react";
import { useStudentHome } from "../hooks/useStudentHome";
import { PersonaSwitcherExploreBar } from "@/features/explore/components/PersonaSwitcherExploreBar";
import { type StudentNextMoveActivity } from "@/lib/firestore-service";

export function StudentGrowthRecordWorkspace() {
  const {
    viewModel,
    startingPoint,
    userProfile,
    nextMoveActivity,
    nextMoveHistory,
  } = useStudentHome();

  const studentName = userProfile?.name || viewModel.studentName || "Student";
  const academicStage = userProfile?.academicStage || viewModel.academicStageId;

  // 1. Gather all activities attempted or completed
  const allActivities: StudentNextMoveActivity[] = useMemo(() => {
    const map = new Map<string, StudentNextMoveActivity>();

    if (nextMoveHistory) {
      Object.values(nextMoveHistory).forEach((act) => {
        map.set(act.activityId, act);
      });
    }

    if (nextMoveActivity) {
      map.set(nextMoveActivity.activityId, nextMoveActivity);
    }

    return Array.from(map.values());
  }, [nextMoveHistory, nextMoveActivity]);

  const completedActivities = useMemo(() => {
    return allActivities.filter((act) => {
      const total = act.steps?.length || 5;
      const done = act.completedStepIds?.length || 0;
      return act.status === "completed" || (done >= total && total > 0);
    });
  }, [allActivities]);

  const inProgressActivities = useMemo(() => {
    return allActivities.filter((act) => {
      const total = act.steps?.length || 5;
      const done = act.completedStepIds?.length || 0;
      return act.status !== "completed" && done > 0 && done < total;
    });
  }, [allActivities]);

  // Total steps mastered
  const totalStepsMastered = useMemo(() => {
    return allActivities.reduce((acc, act) => acc + (act.completedStepIds?.length || 0), 0);
  }, [allActivities]);

  // 2. Extract genuine skills practiced from learningOutcome of attempted activities
  const skillsPracticed = useMemo(() => {
    const list: { skill: string; activityTitle: string; isCompleted: boolean }[] = [];
    const seen = new Set<string>();

    allActivities.forEach((act) => {
      if (!act.learningOutcome) return;
      const isCompleted = act.status === "completed" || (act.completedStepIds?.length || 0) >= (act.steps?.length || 5);
      // Split learning outcomes into discrete skill phrases
      const parts = act.learningOutcome.split(/[,;•.]+/);
      parts.forEach((p) => {
        const clean = p.trim().replace(/^and\s+/i, "");
        if (clean.length > 3 && !seen.has(clean.toLowerCase())) {
          seen.add(clean.toLowerCase());
          const capitalized = clean.charAt(0).toUpperCase() + clean.slice(1);
          list.push({
            skill: capitalized,
            activityTitle: act.title,
            isCompleted,
          });
        }
      });
    });

    return list;
  }, [allActivities]);

  // 3. Learning History Events Timeline
  const timelineEvents = useMemo(() => {
    const events: {
      id: string;
      title: string;
      description: string;
      timestamp: string | null;
      type: "baseline" | "activity_completed" | "activity_started" | "step";
      badge: string;
    }[] = [];

    // Starting Point Baseline Event
    if (startingPoint) {
      events.push({
        id: "ev-starting-point",
        title: "Starting Point Baseline Established",
        description: `Identified primary focus as "${startingPoint.primaryFocus}" with ${startingPoint.activeInterests?.length || 0} active interest areas.`,
        timestamp: startingPoint.completedAt || null,
        type: "baseline",
        badge: "Baseline",
      });
    }

    // Completed Activities
    completedActivities.forEach((act) => {
      events.push({
        id: `ev-completed-${act.activityId}`,
        title: `Completed Activity: ${act.title}`,
        description: `Successfully finished all ${act.steps?.length || 5} steps. Gained practical experience in ${act.learningOutcome}`,
        timestamp: act.completedAt || act.updatedAt || null,
        type: "activity_completed",
        badge: "Activity Completed",
      });
    });

    // In Progress Activities
    inProgressActivities.forEach((act) => {
      events.push({
        id: `ev-progress-${act.activityId}`,
        title: `Started Activity: ${act.title}`,
        description: `Completed ${act.completedStepIds?.length || 0} of ${act.steps?.length || 5} steps (${act.progressPercentage || 0}%).`,
        timestamp: act.updatedAt || act.createdAt || null,
        type: "activity_started",
        badge: "In Progress",
      });
    });

    return events;
  }, [startingPoint, completedActivities, inProgressActivities]);

  const hasStartingPoint = Boolean(startingPoint);
  const hasCompletedActivities = completedActivities.length > 0;
  const hasAnyActivity = allActivities.length > 0;

  return (
    <div className="space-y-6 pb-12" data-testid="student-growth-workspace">
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
              My Growth Record
            </span>

            {academicStage && (
              <span className="text-[10px] font-bold text-[#A7F3D0] bg-[#065F46]/60 px-2.5 py-1 rounded-xl">
                {academicStage === "classes-4-7"
                  ? "Classes 4–7 · Growth Log"
                  : `Stage: ${academicStage}`}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
              {studentName}&apos;s Personal Growth Record
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
              A verified record of your starting baseline, practical challenges completed, skills practiced, and personal learning milestones.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 pt-2 text-xs text-white/90 flex-wrap">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-[#A7F3D0]" />
              <span>
                <strong className="text-white">{completedActivities.length}</strong> Completed
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <Clock className="w-4 h-4 text-[#FEDF89]" />
              <span>
                <strong className="text-white">{inProgressActivities.length}</strong> In Progress
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <Target className="w-4 h-4 text-[#DDD8FE]" />
              <span>
                <strong className="text-white">{totalStepsMastered}</strong> Steps Mastered
              </span>
            </div>
            {Boolean(startingPoint?.primaryFocus) && (
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
                <Sparkles className="w-4 h-4 text-[#FEDF89]" />
                <span>
                  Focus: <strong className="text-white">{startingPoint?.primaryFocus}</strong>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid: 4 Genuine Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div data-testid="metric-completed-activities" className="bg-white rounded-2xl border border-[#E8E6F3] p-4.5 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-[#027A48]">
            <span className="text-xs font-bold text-[#626987]">Completed Activities</span>
            <CheckCircle2 className="w-4 h-4 text-[#12B76A]" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#171A2B]">{completedActivities.length}</p>
          <p className="text-[11px] text-[#626987]">Hands-on projects finished</p>
        </div>

        <div data-testid="metric-in-progress-activities" className="bg-white rounded-2xl border border-[#E8E6F3] p-4.5 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-[#B54708]">
            <span className="text-xs font-bold text-[#626987]">In Progress</span>
            <Clock className="w-4 h-4 text-[#F79009]" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#171A2B]">{inProgressActivities.length}</p>
          <p className="text-[11px] text-[#626987]">Active tasks currently underway</p>
        </div>

        <div data-testid="metric-steps-mastered" className="bg-white rounded-2xl border border-[#E8E6F3] p-4.5 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-[#6757F5]">
            <span className="text-xs font-bold text-[#626987]">Steps Mastered</span>
            <Target className="w-4 h-4 text-[#6757F5]" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#171A2B]">{totalStepsMastered}</p>
          <p className="text-[11px] text-[#626987]">Practical action steps checked</p>
        </div>

        <div data-testid="metric-primary-focus" className="bg-white rounded-2xl border border-[#E8E6F3] p-4.5 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-[#6757F5]">
            <span className="text-xs font-bold text-[#626987]">Primary Focus</span>
            <Sparkles className="w-4 h-4 text-[#6757F5]" />
          </div>
          <p className="text-sm sm:text-base font-bold text-[#171A2B] truncate">
            {startingPoint?.primaryFocus || "Exploring"}
          </p>
          <p className="text-[11px] text-[#626987]">
            {startingPoint?.completedAt ? "From Starting Point baseline" : "Baseline not set yet"}
          </p>
        </div>
      </div>

      {/* Starting Point Baseline Section */}
      <div className="bg-white rounded-3xl border border-[#E8E6F3] p-6 sm:p-7 space-y-5 shadow-xs">
        <div className="flex items-center justify-between gap-3 flex-wrap border-b border-[#F2F1FA] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F4F3F8] text-[#6757F5] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#171A2B]">
                Starting Point Baseline
              </h2>
              <p className="text-xs text-[#626987]">
                Your foundational assessment recorded during onboarding
              </p>
            </div>
          </div>

          {startingPoint ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Baseline Established</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-[#F4F3F8] text-[#626987] border border-[#E8E6F3]">
              <Circle className="w-3.5 h-3.5" />
              <span>Baseline Pending</span>
            </span>
          )}
        </div>

        {startingPoint ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#F9F8FD] border border-[#EAE7FD] space-y-1">
                <span className="text-[11px] font-bold text-[#626987] uppercase tracking-wider block">
                  Primary Focus
                </span>
                <p className="text-sm font-black text-[#171A2B]">{startingPoint.primaryFocus}</p>
                <span className="text-[11px] text-[#6757F5] font-semibold">{startingPoint.status}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F9F8FD] border border-[#EAE7FD] space-y-1 sm:col-span-2">
                <span className="text-[11px] font-bold text-[#626987] uppercase tracking-wider block">
                  Active Interests ({startingPoint.activeInterests?.length || 0})
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {startingPoint.activeInterests?.map((interest) => (
                    <span
                      key={interest}
                      className="px-2.5 py-1 rounded-xl bg-white border border-[#DDD8FE] text-xs font-bold text-[#171A2B]"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Starting Point Answers Summary */}
            {startingPoint.answers && Object.keys(startingPoint.answers).length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-[#171A2B] uppercase tracking-wider">
                  Baseline Question Responses
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {Object.entries(startingPoint.answers).map(([qKey, aVal]) => (
                    <div key={qKey} className="p-3 rounded-xl bg-[#F4F3F8] space-y-1">
                      <span className="text-[10px] font-bold text-[#626987] uppercase block">
                        {qKey.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <p className="font-semibold text-[#171A2B]">
                        {Array.isArray(aVal) ? aVal.join(", ") : String(aVal)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-[#F9F8FD] border border-[#EAE7FD] text-center space-y-3">
            <p className="text-xs sm:text-sm text-[#626987]">
              You haven&apos;t established your Starting Point baseline yet. Complete the quick questionnaire on the dashboard to personalize your learning trajectory.
            </p>
            <Link
              href="/dashboard/student"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6757F5] text-white font-bold text-xs hover:bg-[#5545E0] transition-colors"
            >
              <span>Complete Starting Point Questionnaire</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Skills Practiced & Knowledge Gained */}
      <div className="bg-white rounded-3xl border border-[#E8E6F3] p-6 sm:p-7 space-y-4 shadow-xs">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F4F3F8] text-[#6757F5] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#171A2B]">
                Skills Practiced &amp; Knowledge Gained
              </h2>
              <p className="text-xs text-[#626987]">
                Real skills verified by doing practical activities and projects
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-[#6757F5] bg-[#F4F3F8] px-3 py-1 rounded-xl">
            {skillsPracticed.length} Skills Logged
          </span>
        </div>

        {skillsPracticed.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {skillsPracticed.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl border border-[#E8E6F3] bg-[#F9F8FD] flex items-start gap-2.5 text-xs hover:border-[#DDD8FE] transition-colors"
              >
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${item.isCompleted ? "text-[#12B76A]" : "text-[#6757F5]"}`} />
                <div className="space-y-0.5">
                  <p className="font-bold text-[#171A2B]">{item.skill}</p>
                  <p className="text-[11px] text-[#626987]">
                    Practiced in: <span className="font-semibold text-[#6757F5]">{item.activityTitle}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-[#F4F3F8] text-center space-y-2">
            <p className="text-xs font-semibold text-[#171A2B]">No practical skills logged yet</p>
            <p className="text-xs text-[#626987]">
              Complete hands-on activities in My Projects to automatically log verified skills here.
            </p>
            <Link
              href="/dashboard/student/projects"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] hover:underline pt-1"
            >
              <span>Explore Assigned Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Activities Attempted & Completed Log */}
      <div className="bg-white rounded-3xl border border-[#E8E6F3] p-6 sm:p-7 space-y-4 shadow-xs">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F4F3F8] text-[#6757F5] flex items-center justify-center">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#171A2B]">
                Activities Attempted &amp; Completed
              </h2>
              <p className="text-xs text-[#626987]">
                Every challenge and mini-project you have worked on
              </p>
            </div>
          </div>
        </div>

        {allActivities.length > 0 ? (
          <div className="space-y-3 pt-2">
            {allActivities.map((act) => {
              const total = act.steps?.length || 5;
              const done = act.completedStepIds?.length || 0;
              const isCompleted = act.status === "completed" || done >= total;

              return (
                <div
                  key={act.activityId}
                  className={`p-4 rounded-2xl border transition-all space-y-2 ${
                    isCompleted
                      ? "bg-[#F6FEF9] border-[#D1FADF]"
                      : "bg-[#F9F8FD] border-[#E8E6F3]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#ECFDF3] text-[#027A48]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed ({done}/{total} steps)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#FEF0C7] text-[#B54708]">
                          <Clock className="w-3.5 h-3.5" />
                          <span>In Progress ({done}/{total} steps)</span>
                        </span>
                      )}
                      <h4 className="font-bold text-sm text-[#171A2B]">{act.title}</h4>
                    </div>

                    <Link
                      href="/dashboard/student/projects"
                      className="text-xs font-bold text-[#6757F5] hover:underline"
                    >
                      View in My Projects
                    </Link>
                  </div>

                  {act.learningOutcome && (
                    <p className="text-xs text-[#626987]">
                      <strong>Outcome:</strong> {act.learningOutcome}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[#F9F8FD] border border-[#EAE7FD] text-center space-y-3">
            <h3 className="text-sm font-bold text-[#171A2B]">You haven&apos;t started any activities yet</h3>
            <p className="text-xs text-[#626987] max-w-md mx-auto">
              Your growth journey starts with your first practical step! Pick an activity from My Projects or your Home dashboard to begin building real skills.
            </p>
            <div className="pt-1">
              <Link
                href="/dashboard/student/projects"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6757F5] text-white font-bold text-xs hover:bg-[#5545E0] transition-colors shadow-xs"
              >
                <span>Go to My Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Learning & Exploration History Timeline */}
      <div className="bg-white rounded-3xl border border-[#E8E6F3] p-6 sm:p-7 space-y-5 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#F4F3F8] text-[#6757F5] flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#171A2B]">
              Learning &amp; Exploration History
            </h2>
            <p className="text-xs text-[#626987]">
              Chronological timeline of your milestones and journey
            </p>
          </div>
        </div>

        {timelineEvents.length > 0 ? (
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8E6F3]">
            {timelineEvents.map((ev) => (
              <div key={ev.id} className="relative space-y-1">
                <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white bg-[#6757F5]" />
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#F4F3F8] text-[#6757F5]">
                    {ev.badge}
                  </span>
                  {ev.timestamp && (
                    <span className="text-[11px] text-[#98A2B3]">
                      {new Date(ev.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#171A2B]">{ev.title}</h4>
                <p className="text-xs text-[#626987] leading-relaxed">{ev.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-[#F4F3F8] text-center text-xs text-[#626987]">
            Your learning timeline will be recorded automatically as you establish your baseline and complete activities.
          </div>
        )}
      </div>
    </div>
  );
}
