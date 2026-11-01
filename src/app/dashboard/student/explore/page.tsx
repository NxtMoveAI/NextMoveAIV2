/**
 * NEXT MOVE AI V2 — FLOW 5: EXPLORE POSSIBILITIES PAGE
 * 
 * Route: /dashboard/student/explore
 * Serves the full interactive educational and career pathway discovery workspace.
 */

"use client";

import React, { Suspense } from "react";
import { ExploreWorkspace } from "@/features/explore/components/ExploreWorkspace";

function ExploreLoadingFallback() {
  return (
    <div className="p-8 sm:p-12 text-center space-y-3">
      <div className="w-8 h-8 rounded-full border-2 border-[#6757F5] border-t-transparent animate-spin mx-auto" />
      <p className="text-xs font-semibold text-[#626987]">Loading possibilities...</p>
    </div>
  );
}

export default function StudentExplorePage() {
  return (
    <Suspense fallback={<ExploreLoadingFallback />}>
      <ExploreWorkspace />
    </Suspense>
  );
}
