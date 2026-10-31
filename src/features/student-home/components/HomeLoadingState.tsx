/**
 * NEXT MOVE AI V2 — HOME LOADING STATE
 * High-fidelity skeleton loader matching the dashboard layout geometry.
 */

"use client";

import React from "react";

export function HomeLoadingState() {
  return (
    <div
      aria-label="Loading student dashboard"
      className="space-y-6 animate-pulse"
    >
      {/* Welcome Skeleton */}
      <div className="h-44 rounded-3xl bg-white border border-[#E8E6F3] p-8 space-y-4">
        <div className="h-6 w-32 bg-[#EDEAFF] rounded-full" />
        <div className="h-8 w-80 bg-[#E8E6F3] rounded-xl" />
        <div className="h-4 w-96 bg-[#F4F3F8] rounded-lg" />
      </div>

      {/* Starting Point Skeleton */}
      <div className="h-40 rounded-3xl bg-white border border-[#E8E6F3] p-6 space-y-4">
        <div className="h-6 w-40 bg-[#E8E6F3] rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="h-16 bg-[#F7F6FF] rounded-2xl" />
          <div className="h-16 bg-[#F7F6FF] rounded-2xl" />
          <div className="h-16 bg-[#F7F6FF] rounded-2xl" />
        </div>
      </div>

      {/* Next Move Skeleton */}
      <div className="h-64 rounded-3xl bg-white border border-[#DDD8FE] p-8 space-y-4">
        <div className="h-6 w-48 bg-[#6757F5]/20 rounded-lg" />
        <div className="h-7 w-3/4 bg-[#E8E6F3] rounded-xl" />
        <div className="h-4 w-5/6 bg-[#F4F3F8] rounded-lg" />
        <div className="h-12 w-40 bg-[#6757F5]/30 rounded-xl pt-4" />
      </div>
    </div>
  );
}

