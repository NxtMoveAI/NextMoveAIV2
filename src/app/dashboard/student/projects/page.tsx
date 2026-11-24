/**
 * NEXT MOVE AI V2 — FLOW 7: MY PROJECTS PAGE
 * 
 * Route: /dashboard/student/projects
 * 
 * Upgraded to show the student's actual assigned activities, tasks, mini-projects,
 * step-by-step progress, and completion states from their authenticated profile.
 * 
 * For unauthenticated fresh prototype testing, falls back to the Flow 7 catalog workspace.
 */

"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStudentHome } from "@/features/student-home/hooks/useStudentHome";
import { NextMoveWorkspace } from "@/features/build-next-move/components/NextMoveWorkspace";
import { StudentAssignedProjectsWorkspace } from "@/features/student-home/components/StudentAssignedProjectsWorkspace";

function NextMoveLoadingFallback() {
  return (
    <div className="p-8 sm:p-12 text-center space-y-3">
      <div className="w-8 h-8 rounded-full border-2 border-[#6757F5] border-t-transparent animate-spin mx-auto" />
      <p className="text-xs font-semibold text-[#626987]">Loading assigned projects...</p>
    </div>
  );
}

function StudentProjectsContent() {
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
    return <NextMoveLoadingFallback />;
  }

  const viewParam = searchParams.get("view");
  const hasHistory = nextMoveHistory && Object.keys(nextMoveHistory).length > 0;

  // Show Student Assigned Projects Workspace when:
  // 1. Explicitly requested via ?view=assigned or ?view=projects
  // 2. Real authenticated Firebase user
  // 3. User profile exists
  // 4. Starting Point questionnaire has been completed
  // 5. Active activity or activity history exists
  // 6. User is not an anonymous fresh visitor
  const showAssignedProjects =
    viewParam === "assigned" ||
    viewParam === "projects" ||
    isRealAuthenticatedUser ||
    Boolean(userProfile) ||
    Boolean(startingPoint) ||
    Boolean(nextMoveActivity) ||
    Boolean(hasHistory) ||
    (hasConfirmedProfile && viewParam !== "flow7");

  if (showAssignedProjects) {
    return <StudentAssignedProjectsWorkspace />;
  }

  return <NextMoveWorkspace />;
}

export default function StudentProjectsPage() {
  return (
    <Suspense fallback={<NextMoveLoadingFallback />}>
      <StudentProjectsContent />
    </Suspense>
  );
}
