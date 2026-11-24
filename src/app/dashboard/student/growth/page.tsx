/**
 * NEXT MOVE AI V2 — FLOW 6: MY GROWTH PAGE
 * 
 * Route: /dashboard/student/growth
 * 
 * Upgraded to serve as the student's true learning and growth log:
 * - Starting Point baseline
 * - Activities attempted and completed
 * - Tasks in progress
 * - Skills practiced and knowledge gained
 * - Project milestones and outcomes achieved
 * - Learning and exploration history over time
 * 
 * For unauthenticated fresh prototype testing, falls back to the Flow 6 discovery workspace.
 */

"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStudentHome } from "@/features/student-home/hooks/useStudentHome";
import { ValidateFitWorkspace } from "@/features/validate-fit/components/ValidateFitWorkspace";
import { StudentGrowthRecordWorkspace } from "@/features/student-home/components/StudentGrowthRecordWorkspace";

function ValidateFitLoadingFallback() {
  return (
    <div className="p-8 sm:p-12 text-center space-y-3">
      <div className="w-8 h-8 rounded-full border-2 border-[#6757F5] border-t-transparent animate-spin mx-auto" />
      <p className="text-xs font-semibold text-[#626987]">Loading your growth record...</p>
    </div>
  );
}

function StudentGrowthContent() {
  const searchParams = useSearchParams();
  const {
    isLoading,
    isRealAuthenticatedUser,
    userProfile,
    startingPoint,
    nextMoveActivity,
    nextMoveHistory,
    hasConfirmedProfile,
  } = useStudentHome();

  if (isLoading) {
    return <ValidateFitLoadingFallback />;
  }

  const viewParam = searchParams.get("view");
  const hasHistory = nextMoveHistory && Object.keys(nextMoveHistory).length > 0;

  // Show Student Growth Record Workspace when:
  // 1. Explicitly requested via ?view=growth or ?view=record
  // 2. Real authenticated Firebase user
  // 3. User profile exists
  // 4. Starting Point questionnaire has been completed
  // 5. Active activity or activity history exists
  // 6. User is not an anonymous fresh visitor
  const showGrowthRecord =
    viewParam === "growth" ||
    viewParam === "record" ||
    isRealAuthenticatedUser ||
    Boolean(userProfile) ||
    Boolean(startingPoint) ||
    Boolean(nextMoveActivity) ||
    Boolean(hasHistory) ||
    (hasConfirmedProfile && viewParam !== "flow6");

  if (showGrowthRecord) {
    return <StudentGrowthRecordWorkspace />;
  }

  return <ValidateFitWorkspace />;
}

export default function StudentGrowthPage() {
  return (
    <Suspense fallback={<ValidateFitLoadingFallback />}>
      <StudentGrowthContent />
    </Suspense>
  );
}
