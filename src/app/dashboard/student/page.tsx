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
import { ExplorePreview } from "@/features/student-home/components/ExplorePreview";
import { GrowthSnapshot } from "@/features/student-home/components/GrowthSnapshot";
import { PartnerPreview } from "@/features/student-home/components/PartnerPreview";
import { HomeLoadingState } from "@/features/student-home/components/HomeLoadingState";
import { HomeErrorState } from "@/features/student-home/components/HomeErrorState";
import { HomeEmptyState } from "@/features/student-home/components/HomeEmptyState";

export default function StudentHomePage() {
  const router = useRouter();
  const { viewModel, hasRealHandoff, isLoading, error, retryLoad } = useStudentHome();

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
  if (process.env.NODE_ENV === "production" && !hasRealHandoff) {
    return <HomeEmptyState />;
  }

  return (
    <div className="space-y-8 pb-8">
      {/* 1. Development Persona Switcher (Non-production only) */}
      {process.env.NODE_ENV !== "production" && <PersonaSwitcherBar />}

      {/* 2. Personalized Welcome Area */}
      <WelcomePanel
        stageId={viewModel.academicStageId}
        studentName={viewModel.studentName}
        stageLabel={viewModel.academicStageLabel}
        academicSummary={viewModel.academicSummary}
      />

      {/* 3. Your Next Move (Primary Intelligent Decision Widget) */}
      <NextMoveCard />

      {/* 4. My Starting Point (Profile Summary & Progressive Disclosure) */}
      <StartingPointCard viewModel={viewModel} />

      {/* 5. Explore Possibilities Preview (Up to 3 curated cards) */}
      <ExplorePreview
        possibilities={viewModel.possibilities}
        stageLabel={viewModel.academicStageLabel}
      />

      {/* 6. My Growth Snapshot (Truthful Evidence Taxonomy) */}
      <GrowthSnapshot
        snapshot={viewModel.growthSnapshot}
      />

      {/* 7. My Partner Preview (Contextual Guidance Cards) */}
      <PartnerPreview
        prompts={viewModel.partnerPrompts}
        stageLabel={viewModel.academicStageLabel}
      />
    </div>
  );
}
