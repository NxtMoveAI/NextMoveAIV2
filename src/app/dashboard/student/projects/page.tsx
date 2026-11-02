/**
 * NEXT MOVE AI V2 — FLOW 7: BUILD MY NEXT MOVE PAGE
 * 
 * Route: /dashboard/student/projects
 * Hosts the full continuous growth system: situation overview, adaptable roadmaps,
 * project studio with portfolio artifacts, practical experiences, and age-gated opportunities.
 */

"use client";

import React, { Suspense } from "react";
import { NextMoveWorkspace } from "@/features/build-next-move/components/NextMoveWorkspace";

function NextMoveLoadingFallback() {
  return (
    <div className="p-8 sm:p-12 text-center space-y-3">
      <div className="w-8 h-8 rounded-full border-2 border-[#6757F5] border-t-transparent animate-spin mx-auto" />
      <p className="text-xs font-semibold text-[#626987]">Loading your next move workspace...</p>
    </div>
  );
}

export default function StudentProjectsPage() {
  return (
    <Suspense fallback={<NextMoveLoadingFallback />}>
      <NextMoveWorkspace />
    </Suspense>
  );
}
