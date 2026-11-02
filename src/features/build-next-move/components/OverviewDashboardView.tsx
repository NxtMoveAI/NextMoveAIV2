/**
 * NEXT MOVE AI V2 — FLOW 7: OVERVIEW DASHBOARD VIEW
 * 
 * Answers: "Where I am now, what I want to explore, and my single suggested next action."
 * 
 * Epistemic Mandate:
 * - Grounded exclusively in confirmed profile and real evidence.
 * - Zero fabricated scores, inferred career certainty, or guaranteed outcomes.
 * - Full student agency to edit, postpone, or replace suggested actions.
 */

"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Target,
  FolderGit2,
  Clock,
  ArrowRight,
  Sparkles,
  Briefcase,
  Layers,
} from "lucide-react";
import { type StudentIntelligenceProfile } from "@/features/onboarding/schemas/types";
import {
  type NextMoveRecommendation,
  type ActiveProject,
  type StudentRoadmap,
  type StudentGrowthGoal,
  type NextMoveWorkspaceTab,
} from "../types";

interface OverviewDashboardViewProps {
  profile: StudentIntelligenceProfile | null;
  isAnonymous: boolean;
  activeMove: NextMoveRecommendation;
  alternatives: NextMoveRecommendation[];
  selectedAlternativeId: string | null;
  activeProjects: ActiveProject[];
  completedProjects: ActiveProject[];
  roadmap: StudentRoadmap | null;
  goal: StudentGrowthGoal | null;
  completedTrialCount: number;
  onSelectAlternative: (id: string | null) => void;
  onPostponeMove: (id: string) => void;
  onTabChange: (tab: NextMoveWorkspaceTab) => void;
  onOpenProject: (project: ActiveProject) => void;
  onOpenCustomProject: () => void;
}

export function OverviewDashboardView({
  profile,
  activeMove,
  alternatives,
  selectedAlternativeId,
  activeProjects,
  completedProjects,
  goal,
  completedTrialCount,
  onSelectAlternative,
  onPostponeMove,
  onTabChange,
  onOpenProject,
  onOpenCustomProject,
}: OverviewDashboardViewProps) {
  const [showAlternatives, setShowAlternatives] = useState(false);

  const stageLabel = profile?.academicStageId
    ? profile.academicStageId.replace("-", " ").replace("-", " ")
    : "Self-Guided Explorer";

  const startingSkills = profile?.startingSkills || [];
  const interests = profile?.interests?.selectedCategoryIds || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* ===================================================================== */}
      {/* 1. WHERE I AM NOW — SITUATION BANNER */}
      {/* ===================================================================== */}
      <section
        aria-labelledby="where-i-am-heading"
        className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
              Current Grounded Situation
            </span>
            <h2
              id="where-i-am-heading"
              className="text-lg sm:text-xl font-black text-[#171A2B] tracking-tight"
            >
              Where I Am Now
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] border border-[#DDD8FE] capitalize">
              {stageLabel}
            </span>
          </div>
        </div>

        {/* Situation Snapshot Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#F0EEF8] space-y-1">
            <span className="text-[10px] font-bold text-[#8C93AD] uppercase tracking-wider block">
              Starting Stated Skills
            </span>
            <p className="text-xl sm:text-2xl font-black text-[#171A2B]">
              {startingSkills.length}
            </p>
            <p className="text-[11px] text-[#626987]">Self-reported baseline</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-1">
            <span className="text-[10px] font-bold text-[#059669] uppercase tracking-wider block">
              Practised in Flow 6
            </span>
            <p className="text-xl sm:text-2xl font-black text-[#065F46]">
              {completedTrialCount}
            </p>
            <p className="text-[11px] text-[#047857]">Real challenge attempts</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] space-y-1">
            <span className="text-[10px] font-bold text-[#1D4ED8] uppercase tracking-wider block">
              Active Projects
            </span>
            <p className="text-xl sm:text-2xl font-black text-[#1E40AF]">
              {activeProjects.length}
            </p>
            <p className="text-[11px] text-[#1D4ED8]">Hands-on portfolio work</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF5FF] border border-[#E9D5FF] space-y-1">
            <span className="text-[10px] font-bold text-[#7E22CE] uppercase tracking-wider block">
              Completed Projects
            </span>
            <p className="text-xl sm:text-2xl font-black text-[#581C87]">
              {completedProjects.length}
            </p>
            <p className="text-[11px] text-[#7E22CE]">Finished deliverables</p>
          </div>
        </div>

        {/* Interests & Goal Row */}
        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#F0EEF8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-[#171A2B] block">What I Want to Explore:</span>
            <p className="text-[#626987]">
              {interests.length > 0
                ? `Focus areas: ${interests.map((i) => i.replace("_", " ")).join(", ")}`
                : "Still actively exploring multidisciplinary directions"}
            </p>
          </div>

          {goal && (
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#E8E6F3] text-xs">
              <Target className="w-3.5 h-3.5 text-[#6757F5]" />
              <span className="text-[#171A2B] font-semibold">{goal.title}</span>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. SUGGESTED NEXT ACTION (PRIMARY INTELLIGENT ENGINE) */}
      {/* ===================================================================== */}
      <section
        aria-labelledby="primary-action-heading"
        data-testid="primary-next-move-card"
        className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDD8FE] shadow-sm shadow-[#6757F5]/5 ring-1 ring-[#6757F5]/10 space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E6F3]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#6757F5] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#6757F5]/25">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="primary-action-heading"
                  className="text-lg sm:text-xl font-black text-[#171A2B] tracking-tight"
                >
                  Suggested Next Action
                </h2>
                {selectedAlternativeId && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]">
                    Alternative Selected
                  </span>
                )}
              </div>
              <p className="text-xs text-[#626987]">
                Continuous growth recommendation grounded in your learning history
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F6FF] text-[#6757F5] border border-[#DDD8FE] text-xs font-bold self-start sm:self-auto">
            <Clock className="w-3.5 h-3.5" />
            <span>~{activeMove.estimatedMinutes} mins</span>
          </div>
        </div>

        {/* Recommendation Content */}
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-[#171A2B]">
              {activeMove.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#474D66] leading-relaxed">
              {activeMove.description}
            </p>
          </div>

          {/* Grounded Why Disclosure */}
          <div data-testid="rec-why-suggested" className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-xs space-y-1">
            <span className="font-bold text-[#92400E] block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Why this was suggested:</span>
            </span>
            <p className="text-[#92400E] leading-relaxed">{activeMove.whySuggested}</p>
            <p className="text-[11px] text-[#B45309] italic pt-0.5">
              Context: {activeMove.supportingContext}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#E8E6F3]">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onTabChange(activeMove.targetTab)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold shadow-md shadow-[#6757F5]/20 transition-all transform hover:-translate-y-0.5"
            >
              <span>Take This Action</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {alternatives.length > 0 && (
              <button
                type="button"
                data-testid="toggle-alternatives-btn"
                onClick={() => setShowAlternatives((prev) => !prev)}
                className="px-4 py-2.5 rounded-xl bg-[#F4F3F8] hover:bg-[#E8E6F3] text-[#31364F] text-xs font-bold transition-colors"
              >
                <span>{showAlternatives ? "Hide Alternatives" : "Choose an Alternative"}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {selectedAlternativeId && (
              <button
                type="button"
                onClick={() => onSelectAlternative(null)}
                className="text-xs font-semibold text-[#6757F5] hover:underline"
              >
                Reset to Primary
              </button>
            )}

            <button
              type="button"
              onClick={() => onPostponeMove(activeMove.id)}
              className="text-xs font-medium text-[#8C93AD] hover:text-[#474D66] transition-colors"
            >
              Postpone for later
            </button>
          </div>
        </div>

        {/* Alternatives List */}
        {showAlternatives && (
          <div data-testid="alternatives-panel" className="pt-4 border-t border-[#E8E6F3] space-y-3 animate-in fade-in">
            <span className="text-xs font-bold text-[#171A2B] block">
              Grounded Alternative Moves:
            </span>
            <div className="space-y-2">
              {alternatives.map((alt) => (
                <div
                  key={alt.id}
                  data-testid={`select-alt-${alt.id}`}
                  onClick={() => {
                    onSelectAlternative(alt.id);
                    setShowAlternatives(false);
                  }}
                  className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] hover:border-[#6757F5] cursor-pointer transition-all flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <p className="font-bold text-[#171A2B]">{alt.title}</p>
                    <p className="text-[#626987] leading-relaxed">{alt.description}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#6757F5] bg-[#EDEAFF] px-2.5 py-1 rounded-lg shrink-0">
                    Switch
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* 3. ACTIVE PROJECTS & PRACTICAL WORK */}
      {/* ===================================================================== */}
      <section aria-labelledby="active-projects-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2
              id="active-projects-heading"
              className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight flex items-center gap-2"
            >
              <FolderGit2 className="w-5 h-5 text-[#6757F5]" />
              <span>Active Projects & Evidence Building</span>
            </h2>
            <p className="text-xs text-[#626987]">
              Step-by-step portfolio projects demonstrating practical problem solving
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenCustomProject}
              className="text-xs font-bold text-[#6757F5] hover:bg-[#EDEAFF] px-3 py-1.5 rounded-xl border border-[#DDD8FE] transition-colors"
            >
              + Custom Project
            </button>
            <button
              type="button"
              onClick={() => onTabChange("projects")}
              className="text-xs font-bold text-[#626987] hover:text-[#171A2B] px-2 py-1.5"
            >
              View Catalog →
            </button>
          </div>
        </div>

        {activeProjects.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-[#E8E6F3] text-center space-y-3">
            <p className="text-sm font-bold text-[#171A2B]">No active projects started yet</p>
            <p className="text-xs text-[#626987] max-w-sm mx-auto">
              Starting a small project turns concepts into real capability. Browse starter ideas tailored to your stage.
            </p>
            <button
              type="button"
              onClick={() => onTabChange("projects")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5342E8] transition-colors"
            >
              <span>Explore Starter Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeProjects.map((project) => {
              const completedCount = project.steps.filter((s) => s.isCompleted).length;
              const percent = Math.round((completedCount / Math.max(1, project.steps.length)) * 100);

              return (
                <div
                  key={project.id}
                  onClick={() => onOpenProject(project)}
                  className="p-5 rounded-3xl bg-white border border-[#E8E6F3] hover:border-[#6757F5] shadow-xs cursor-pointer transition-all space-y-3 group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-[#6757F5] bg-[#EDEAFF] px-2.5 py-0.5 rounded-full">
                      {project.categoryLabel}
                    </span>
                    <span className="text-xs font-semibold text-[#8C93AD]">
                      {completedCount} / {project.steps.length} Steps
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-[#171A2B] group-hover:text-[#6757F5] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#626987] line-clamp-2">
                      {project.problemStatement}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="w-full h-1.5 bg-[#F0EEF8] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#6757F5] transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#8C93AD]">
                      <span>Progress</span>
                      <span className="font-bold text-[#171A2B]">{percent}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* 4. WHAT I CAN EXPLORE NEXT (QUICK-JUMP TO OTHER MODULES) */}
      {/* ===================================================================== */}
      <section aria-labelledby="quick-explore-heading" className="space-y-3">
        <h2
          id="quick-explore-heading"
          className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight"
        >
          Explore All Dimensions of Your Next Move
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            onClick={() => onTabChange("roadmaps")}
            className="p-5 rounded-3xl bg-white border border-[#E8E6F3] hover:border-[#6757F5] cursor-pointer transition-all space-y-2 group shadow-xs"
          >
            <div className="w-8 h-8 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#171A2B] group-hover:text-[#6757F5] transition-colors">
              Adaptable Roadmap
            </h3>
            <p className="text-xs text-[#626987] leading-relaxed">
              Flexible phases without rigid deadlines. Adapt anytime your priorities shift.
            </p>
          </div>

          <div
            onClick={() => onTabChange("experiences")}
            className="p-5 rounded-3xl bg-white border border-[#E8E6F3] hover:border-[#6757F5] cursor-pointer transition-all space-y-2 group shadow-xs"
          >
            <div className="w-8 h-8 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#171A2B] group-hover:text-[#059669] transition-colors">
              Practical Experiences
            </h3>
            <p className="text-xs text-[#626987] leading-relaxed">
              Hands-on trials and day-in-the-life simulations connected to Flow 6.
            </p>
          </div>

          <div
            onClick={() => onTabChange("opportunities")}
            className="p-5 rounded-3xl bg-white border border-[#E8E6F3] hover:border-[#6757F5] cursor-pointer transition-all space-y-2 group shadow-xs"
          >
            <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#171A2B] group-hover:text-[#1D4ED8] transition-colors">
              Educational Opportunities
            </h3>
            <p className="text-xs text-[#626987] leading-relaxed">
              Age-gated internships, scholarships, and enrichment listings with clear provenance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
