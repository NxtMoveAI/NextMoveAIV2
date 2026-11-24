/**
 * NEXT MOVE AI V2 — FLOW 4: PERSONALIZED STUDENT HOME DASHBOARD
 * 
 * The central everyday workspace for Next Move AI students.
 * Integrates:
 * A. Personalized Welcome
 * B. My Starting Point
 * C. Your Next Move (Primary decision widget)
 * D. Explore Possibilities Preview
 * E. My Growth Snapshot
 * F. My Partner Preview
 * G. Shared Application Layout
 */

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStudentHome } from "@/features/student-home/hooks/useStudentHome";
import { PersonaSwitcherBar } from "@/features/student-home/components/PersonaSwitcherBar";
import { WelcomePanel } from "@/features/student-home/components/WelcomePanel";
import { StartingPointCard } from "@/features/student-home/components/StartingPointCard";
import { NextMoveCard } from "@/features/student-home/components/NextMoveCard";
import { HomeLoadingState } from "@/features/student-home/components/HomeLoadingState";
import { HomeErrorState } from "@/features/student-home/components/HomeErrorState";
import { HomeEmptyState } from "@/features/student-home/components/HomeEmptyState";

export default function StudentHomePage() {
  const router = useRouter();
  const { viewModel, hasRealHandoff, isLoading, error, retryLoad, isRealAuthenticatedUser } = useStudentHome();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessStatus = sessionStorage.getItem("access_status");
      if (accessStatus === "guardian_pending") {
        router.replace("/sign-in?reason=guardian_pending");
      }
    }
  }, [router]);

  if (isLoading) {
    return <HomeLoadingState />;
  }

  if (error) {
    return <HomeErrorState errorMessage={error} onRetry={retryLoad} />;
  }

  // Never display the default synthetic Class 12 fixture on a production public route.
  // Until Havyas supplies a server-validated session/profile, no demo account is available.
  // Only display the unconfigured empty state when explicitly visiting in anonymous session mode
  const isAnonymousProductionVisit =
    typeof window !== "undefined" &&
    (window.location.search.includes("mode=production") ||
      window.location.search.includes("session=anonymous"));

  if (isAnonymousProductionVisit && !hasRealHandoff && !isRealAuthenticatedUser) {
    return <HomeEmptyState />;
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Development Persona Switcher (Non-production only, completely hidden for authenticated users) */}
      {!isRealAuthenticatedUser && process.env.NODE_ENV !== "production" && !isAnonymousProductionVisit && (
        <PersonaSwitcherBar />
      )}

      {/* 1. Personalized Welcome Area */}
      <WelcomePanel
        stageId={viewModel.academicStageId}
        studentName={viewModel.studentName}
        stageLabel={viewModel.academicStageLabel}
        academicSummary={viewModel.academicSummary}
      />

      {/* 2. My Starting Point (Baseline Questionnaire & Profile Summary) */}
      <StartingPointCard viewModel={viewModel} />

      {/* 3. Your Next Move (Primary Intelligent Decision Widget) */}
      <NextMoveCard />
    </div>
  );
}
