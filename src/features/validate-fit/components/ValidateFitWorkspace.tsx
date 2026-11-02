/**
 * NEXT MOVE AI V2 — FLOW 6: VALIDATE FIT WORKSPACE
 * 
 * Master experiential learning workspace rendered at /dashboard/student/growth.
 * Seamlessly integrates Discovery, Execution, Reflection, and Evidence Ledger.
 */

"use client";

import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck, History, ArrowLeft, Sparkles } from "lucide-react";
import { PersonaSwitcherExploreBar } from "@/features/explore/components/PersonaSwitcherExploreBar";
import { useValidateFit } from "../hooks/useValidateFit";
import { TrialDiscoveryFeed } from "./TrialDiscoveryFeed";
import { EvidenceLedgerView } from "./EvidenceLedgerView";
import { TrialRunnerModal } from "./TrialRunnerModal";
import { ReflectionStep } from "./ReflectionStep";
import { FeedbackSummaryModal } from "./FeedbackSummaryModal";
import { TRIAL_CATALOG } from "../data/trial-catalog";

export function ValidateFitWorkspace() {
  const {
    profile,
    studentStageId,
    activeTab,
    setActiveTab,
    filters,
    setFilters,
    filteredTrials,
    totalCatalogCount,
    activeTrial,
    setActiveTrial,
    activeReflectionTrial,
    setActiveReflectionTrial,
    activeFeedback,
    attempts,
    completedCount,
    handleStartTrial,
    handleSaveProgress,
    handleFinishTrialContent,
    handleSubmitReflection,
    handleSkipTrial,
    handleRetryTrial,
    handleCloseFeedback,
    handleResetFilters,
  } = useValidateFit();

  const isMiddleSchool = studentStageId === "classes-4-7";

  return (
    <div className="space-y-6 pb-12">
      {/* Dev Persona Switcher Bar */}
      <PersonaSwitcherExploreBar />

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#171A2B] via-[#242942] to-[#171A2B] text-white shadow-md relative overflow-hidden">
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
              Flow 6 • Validate Fit
            </span>

            {studentStageId && (
              <span className="text-[10px] font-bold text-[#A7F3D0] bg-[#065F46]/60 px-2.5 py-1 rounded-xl">
                {isMiddleSchool ? "Classes 4–7 · Curiosity Challenges" : `Adaptive to ${studentStageId}`}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
              {isMiddleSchool
                ? "Creative Curiosity & Maker Challenges"
                : "Validate Fit & Build Practical Evidence"}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
              {isMiddleSchool
                ? "Try fun drawing, nature, and making activities. No tests, no grades—just explore what you like doing!"
                : "We don't decide careers; we enable clarity. Test real-world scenarios and hands-on tasks to understand what daily work genuinely feels like before committing."}
            </p>
          </div>

          {/* Quick Stats Pill Bar */}
          <div className="flex items-center gap-3 pt-2 text-xs text-white/90 flex-wrap">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-[#A7F3D0]" />
              <span>
                <strong className="text-white">{completedCount}</strong> Practised Challenges
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <Sparkles className="w-4 h-4 text-[#DDD8FE]" />
              <span>
                <strong className="text-white">{filteredTrials.length}</strong> Available Trials
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#E8E6F3] pb-3 text-xs overflow-x-auto scrollbar-thin">
        <button
          type="button"
          onClick={() => setActiveTab("discovery")}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === "discovery"
              ? "bg-[#6757F5] text-white shadow-xs"
              : "bg-white text-[#626987] hover:bg-[#F4F3F8] hover:text-[#171A2B]"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Practical Discovery ({filteredTrials.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("ledger")}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === "ledger"
              ? "bg-[#6757F5] text-white shadow-xs"
              : "bg-white text-[#626987] hover:bg-[#F4F3F8] hover:text-[#171A2B]"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Evidence Ledger ({completedCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === "history"
              ? "bg-[#6757F5] text-white shadow-xs"
              : "bg-white text-[#626987] hover:bg-[#F4F3F8] hover:text-[#171A2B]"
          }`}
        >
          <History className="w-4 h-4" />
          <span>Completed History ({attempts.filter((a) => a.status === "completed").length})</span>
        </button>
      </div>

      {/* Tab 1: Discovery Feed */}
      {activeTab === "discovery" && (
        <TrialDiscoveryFeed
          trials={filteredTrials}
          attempts={attempts}
          filters={filters}
          studentStageId={studentStageId}
          totalCatalog={totalCatalogCount}
          onFilterChange={(updates) => setFilters((prev) => ({ ...prev, ...updates }))}
          onResetFilters={handleResetFilters}
          onStartTrial={handleStartTrial}
          onRetryTrial={handleRetryTrial}
        />
      )}

      {/* Tab 2 & 3: Evidence Ledger and Completed History */}
      {(activeTab === "ledger" || activeTab === "history") && (
        <EvidenceLedgerView
          profile={profile}
          attempts={attempts}
          onRetryTrial={(trialId) => {
            const found = TRIAL_CATALOG.find((t) => t.id === trialId);
            if (found) handleRetryTrial(found);
          }}
          onExploreMore={() => setActiveTab("discovery")}
        />
      )}

      {/* Interactive Execution Modals */}
      {activeTrial && (
        <TrialRunnerModal
          trial={activeTrial}
          onClose={() => setActiveTrial(null)}
          onFinishContent={handleFinishTrialContent}
          onSkip={handleSkipTrial}
          onSaveProgress={handleSaveProgress}
        />
      )}

      {activeReflectionTrial && (
        <ReflectionStep
          trial={activeReflectionTrial}
          onSubmit={(ref) => handleSubmitReflection(activeReflectionTrial, ref)}
          onCancel={() => {
            setActiveTrial(activeReflectionTrial);
            setActiveReflectionTrial(null);
          }}
        />
      )}

      {activeFeedback && (
        <FeedbackSummaryModal
          summary={activeFeedback}
          onClose={handleCloseFeedback}
          onRetry={() => {
            const trial = TRIAL_CATALOG.find((t) => t.title === activeFeedback.trialTitle);
            if (trial) handleRetryTrial(trial);
          }}
        />
      )}
    </div>
  );
}
