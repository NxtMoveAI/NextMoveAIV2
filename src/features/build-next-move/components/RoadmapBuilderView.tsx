/**
 * NEXT MOVE AI V2 — FLOW 7: ROADMAP BUILDER VIEW
 * 
 * Flexible, non-punitive milestone progression and pathway roadmap builder.
 * 
 * Philosophy:
 * - Adapts to student pace (no rigid deadlines, no punitive overdue badges).
 * - Tracks milestones across foundational, intermediate, and portfolio phases.
 * - Connected to projects and evidence from Flow 6.
 * - Stage-aware guidance across all 6 cohorts.
 */

"use client";

import React, { useState } from "react";
import {
  Compass,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Sliders,
  FolderGit2,
  BookOpen,
} from "lucide-react";
import {
  type StudentRoadmap,
  type NextMoveWorkspaceTab,
} from "../types";

interface RoadmapBuilderViewProps {
  roadmap: StudentRoadmap | null;
  onToggleMilestone: (phaseId: string, milestoneId: string) => void;
  onSwitchTrack: (trackId: string) => void;
  onOpenCustomizeModal: () => void;
  onTabChange: (tab: NextMoveWorkspaceTab) => void;
  onStartProject?: (templateId: string) => void;
}

export function RoadmapBuilderView({
  roadmap,
  onToggleMilestone,
  onSwitchTrack,
  onOpenCustomizeModal,
  onTabChange,
  onStartProject,
}: RoadmapBuilderViewProps) {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null);

  if (!roadmap) {
    return (
      <div data-testid="roadmap-builder-view" className="p-8 rounded-3xl bg-white border border-[#E8E6F3] text-center space-y-4">
        <Compass className="w-10 h-10 text-[#6757F5] mx-auto opacity-75" />
        <h3 className="text-lg font-bold text-[#171A2B]">No Active Roadmap Initialized</h3>
        <p className="text-sm text-[#4A4E69] max-w-md mx-auto">
          Select a growth track or customize your discovery journey to generate an adaptable roadmap.
        </p>
        <button
          onClick={onOpenCustomizeModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5645E5] transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Create My Roadmap
        </button>
      </div>
    );
  }

  const activePhase = selectedPhaseId
    ? roadmap.phases.find((p) => p.id === selectedPhaseId) || roadmap.phases[0]
    : roadmap.phases.find((p) => p.isCurrent || p.status === "in_progress") || roadmap.phases[0];

  const totalMilestones = roadmap.phases.reduce((acc, p) => acc + p.milestones.length, 0);
  const completedMilestones = roadmap.phases.reduce(
    (acc, p) => acc + p.milestones.filter((m) => m.isCompleted).length,
    0
  );
  const overallPercent = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-200" data-testid="roadmap-builder-view">
      {/* 1. Header & Roadmap Metadata */}
      <section className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
                Adaptable Learning Roadmap
              </span>
              <span className="text-xs text-[#98A2B3]">·</span>
              <span className="text-xs font-semibold text-[#4A4E69] capitalize">
                {roadmap.pacing} Pacing
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#171A2B] tracking-tight">
              {roadmap.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4E69] max-w-2xl leading-relaxed">
              {roadmap.description}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onOpenCustomizeModal}
              data-testid="customize-roadmap-btn"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E8E6F3] bg-[#F7F7FD] hover:bg-[#F2F1FA] text-[#171A2B] text-xs font-bold transition-all"
            >
              <Sliders className="w-3.5 h-3.5 text-[#6757F5]" />
              Customize Track & Pacing
            </button>
          </div>
        </div>

        {/* Overall progress indicator */}
        <div className="p-4 rounded-2xl bg-[#F7F7FD] border border-[#E8E6F3] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#171A2B]">Milestone Momentum</span>
            <span className="font-semibold text-[#6757F5]">
              {completedMilestones} of {totalMilestones} Milestones Completed ({overallPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-[#E8E6F3] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#6757F5] to-[#8C7EFF] rounded-full transition-all duration-300"
              style={{ width: `${overallPercent}%` }}
              role="progressbar"
              aria-valuenow={overallPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <p className="text-[11px] text-[#4A4E69]">
            🌱 You learn at your own pace. Completed items feed directly into your verified student profile.
          </p>
        </div>

        {/* Alternative Tracks Switcher */}
        {roadmap.alternativeTracks && roadmap.alternativeTracks.length > 0 && (
          <div className="pt-2 border-t border-[#F2F1FA]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#98A2B3] mb-2">
              Available Tracks in This Discipline
            </p>
            <div className="flex flex-wrap gap-2">
              {roadmap.alternativeTracks.map((trk) => {
                const isCurrent = trk.trackId === (roadmap.trackId || roadmap.id);
                return (
                  <button
                    key={trk.trackId}
                    onClick={() => !isCurrent && onSwitchTrack(trk.trackId)}
                    disabled={isCurrent}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isCurrent
                        ? "bg-[#6757F5] text-white cursor-default"
                        : "bg-white border border-[#E8E6F3] text-[#4A4E69] hover:border-[#6757F5] hover:text-[#6757F5]"
                    }`}
                  >
                    {trk.title}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* 2. Phase Navigation & Milestone Matrix */}
      <section className="space-y-4">
        {/* Phase Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {roadmap.phases.map((phase, idx) => {
            const isSelected = phase.id === activePhase?.id;
            const completedCount = phase.milestones.filter((m) => m.isCompleted).length;
            const totalCount = phase.milestones.length;
            const isCompleted = phase.status === "completed" || (totalCount > 0 && completedCount === totalCount);

            return (
              <button
                key={phase.id}
                onClick={() => setSelectedPhaseId(phase.id)}
                className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-[#171A2B] text-white border-[#171A2B] shadow-sm"
                    : isCompleted
                    ? "bg-[#F0FDF4] text-[#166534] border-[#BBF7D0] hover:bg-[#DCFCE7]"
                    : "bg-white text-[#4A4E69] border-[#E8E6F3] hover:border-[#6757F5]"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : isCompleted
                      ? "bg-[#22C55E] text-white"
                      : "bg-[#F2F1FA] text-[#6757F5]"
                  }`}
                >
                  {isCompleted ? "✓" : idx + 1}
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">{phase.title}</div>
                  <div
                    className={`text-[10px] ${
                      isSelected ? "text-white/70" : isCompleted ? "text-[#166534]/70" : "text-[#98A2B3]"
                    }`}
                  >
                    {completedCount}/{totalCount} completed · ~{phase.estimatedDuration || "Flexible"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Phase Detail */}
        {activePhase && (
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
                  Active Roadmap Phase
                </span>
                <span className="text-xs text-[#98A2B3]">·</span>
                <span className="text-xs text-[#4A4E69] font-medium">
                  Estimated ~{activePhase.estimatedDuration || "Flexible"}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#171A2B]">{activePhase.title}</h3>
              <p className="text-xs sm:text-sm text-[#4A4E69]">{activePhase.description}</p>
            </div>

            {/* Milestones List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#171A2B]">
                Phase Milestones ({activePhase.milestones.filter((m) => m.isCompleted).length}/
                {activePhase.milestones.length})
              </h4>

              <div className="divide-y divide-[#F2F1FA] border border-[#E8E6F3] rounded-2xl overflow-hidden">
                {activePhase.milestones.map((milestone) => {
                  return (
                    <div
                      key={milestone.id}
                      className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-colors ${
                        milestone.isCompleted ? "bg-[#FAFCFB]" : "bg-white hover:bg-[#FDFDFF]"
                      }`}
                    >
                      <div className="flex items-start gap-3.5 flex-1">
                        <button
                          onClick={() => onToggleMilestone(activePhase.id, milestone.id)}
                          data-testid={`milestone-toggle-${milestone.id}`}
                          aria-label={`Mark milestone ${milestone.title} as ${
                            milestone.isCompleted ? "incomplete" : "completed"
                          }`}
                          className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            milestone.isCompleted
                              ? "bg-[#6757F5] border-[#6757F5] text-white"
                              : "border-[#D0D5DD] bg-white hover:border-[#6757F5]"
                          }`}
                        >
                          {milestone.isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>

                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h5
                              className={`text-sm font-bold tracking-tight ${
                                milestone.isCompleted ? "text-[#171A2B] line-through opacity-75" : "text-[#171A2B]"
                              }`}
                            >
                              {milestone.title}
                            </h5>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F2F1FA] text-[#6757F5] capitalize">
                              {milestone.category}
                            </span>
                          </div>
                          <p className="text-xs text-[#4A4E69] leading-relaxed">
                            {milestone.description}
                          </p>

                          {/* Skill Tags */}
                          {milestone.skillTags && milestone.skillTags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {milestone.skillTags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#F7F7FD] text-[#4A4E69] border border-[#E8E6F3]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Associated project template button if present */}
                      {(milestone.associatedProjectTemplateId || milestone.relatedProjectId) && (
                        <div className="sm:text-right flex-shrink-0">
                          <button
                            onClick={() => {
                              const projId = milestone.associatedProjectTemplateId || milestone.relatedProjectId;
                              if (onStartProject && projId) {
                                onStartProject(projId);
                              } else {
                                onTabChange("projects");
                              }
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7F7FD] hover:bg-[#F2F1FA] border border-[#E8E6F3] text-[11px] font-bold text-[#6757F5] transition-all"
                          >
                            <FolderGit2 className="w-3.5 h-3.5" />
                            Work on Project
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stage-appropriate learning bridge */}
            <div className="p-4 rounded-2xl bg-[#F7F7FD] border border-[#E8E6F3] flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-[#6757F5] flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#4A4E69] space-y-1">
                <p className="font-semibold text-[#171A2B]">
                  Connect Learning to Hands-On Trials
                </p>
                <p>
                  Milestones in this roadmap align with Flow 6 Validate Fit trials and real project artifacts.
                  Completing a project or trial validates your milestones with real evidence.
                </p>
                <button
                  onClick={() => onTabChange("experiences")}
                  className="inline-flex items-center gap-1 font-bold text-[#6757F5] hover:underline pt-1 text-[11px]"
                >
                  Explore practical experiences <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
