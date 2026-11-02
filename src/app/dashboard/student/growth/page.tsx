/**
 * NEXT MOVE AI V2 — FLOW 6: VALIDATE FIT PAGE
 * 
 * Route: /dashboard/student/growth
 * Hosts the full experiential discovery feed, interactive trials,
 * reflection engine, and verifiable evidence ledger.
 */

"use client";

import React, { Suspense } from "react";
import { ValidateFitWorkspace } from "@/features/validate-fit/components/ValidateFitWorkspace";

function ValidateFitLoadingFallback() {
  return (
    <div className="p-8 sm:p-12 text-center space-y-3">
      <div className="w-8 h-8 rounded-full border-2 border-[#6757F5] border-t-transparent animate-spin mx-auto" />
      <p className="text-xs font-semibold text-[#626987]">Loading practical learning trials...</p>
    </div>
  );
}

export default function StudentGrowthPage() {
  return (
    <Suspense fallback={<ValidateFitLoadingFallback />}>
      <ValidateFitWorkspace />
    </Suspense>
  );
}
