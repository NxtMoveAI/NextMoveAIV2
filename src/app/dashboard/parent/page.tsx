/**
 * NEXT MOVE AI V2 — PARENT DASHBOARD PAGE
 * 
 * Guardian discovery, exploration observation, and consent portal.
 */

"use client";

import React, { Suspense } from "react";
import { ParentDashboardWorkspace } from "@/features/parent-dashboard/components/ParentDashboardWorkspace";

export default function ParentDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-sm text-[#8F95B2]">
          Loading guardian workspace...
        </div>
      }
    >
      <ParentDashboardWorkspace />
    </Suspense>
  );
}

