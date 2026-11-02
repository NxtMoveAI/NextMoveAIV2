/**
 * NEXT MOVE AI V2 — FLOW 7: ROADMAP CUSTOMIZE MODAL
 * 
 * Allows students to adapt their learning roadmap, switch tracks, adjust pacing,
 * and define personal growth goals.
 */

"use client";

import React, { useState } from "react";
import { X, Check } from "lucide-react";
import {
  type StudentRoadmap,
  type RoadmapPacing,
  type StudentGrowthGoal,
  type GoalType,
} from "../types";

interface RoadmapCustomizeModalProps {
  isOpen: boolean;
  roadmap: StudentRoadmap | null;
  currentGoal: StudentGrowthGoal | null;
  onClose: () => void;
  onSwitchTrack: (trackId: string) => void;
  onRegenerateRoadmap: (focus: string) => void;
  onSetGoal: (goal: Omit<StudentGrowthGoal, "id" | "createdAt">) => void;
}

export function RoadmapCustomizeModal({
  isOpen,
  roadmap,
  currentGoal,
  onClose,
  onSwitchTrack,
  onRegenerateRoadmap,
  onSetGoal,
}: RoadmapCustomizeModalProps) {
  const [selectedPacing, setSelectedPacing] = useState<RoadmapPacing>(
    roadmap?.pacing || "steady"
  );
  const [customFocus, setCustomFocus] = useState(
    roadmap?.focusDiscipline || roadmap?.targetFocus || ""
  );
  const [goalTitle, setGoalTitle] = useState(currentGoal?.title || "");
  const [goalType, setGoalType] = useState<GoalType>(currentGoal?.goalType || "project_portfolio");
  const [targetQuarter, setTargetQuarter] = useState(currentGoal?.targetQuarter || "Next 3 Months");

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (customFocus.trim() && customFocus !== (roadmap?.focusDiscipline || roadmap?.targetFocus)) {
      onRegenerateRoadmap(customFocus.trim());
    }

    if (goalTitle.trim()) {
      onSetGoal({
        title: goalTitle.trim(),
        targetHorizon: "3_months",
        focusArea: customFocus || "Portfolio Growth",
        status: "active",
        goalType,
        targetQuarter,
      });
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171A2B]/60 backdrop-blur-sm animate-in fade-in"
      data-testid="roadmap-customize-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customize-modal-title"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E8E6F3] flex flex-col overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#F2F1FA] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
              Roadmap Customization
            </span>
            <h2 id="customize-modal-title" className="text-xl font-black text-[#171A2B]">
              Adapt Your Pathway & Goal
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#98A2B3] hover:text-[#171A2B] hover:bg-[#F7F7FD]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Track selection */}
          {roadmap?.alternativeTracks && roadmap.alternativeTracks.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#171A2B]">
                Select Growth Track
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {roadmap.alternativeTracks.map((trk) => {
                  const isCurrent = trk.trackId === (roadmap.trackId || roadmap.id);
                  return (
                    <button
                      key={trk.trackId}
                      type="button"
                      onClick={() => onSwitchTrack(trk.trackId)}
                      className={`p-3 rounded-xl border text-left flex items-start justify-between gap-2 transition-all ${
                        isCurrent
                          ? "bg-[#F7F7FD] border-[#6757F5] shadow-xs"
                          : "bg-white border-[#E8E6F3] hover:border-[#6757F5]"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-[#171A2B]">{trk.title}</div>
                        <div className="text-[11px] text-[#4A4E69] mt-0.5">{trk.description}</div>
                      </div>
                      {isCurrent && <Check className="w-4 h-4 text-[#6757F5] flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Learning Pacing */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#171A2B]">
              Learning Pacing (Non-Punitive)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "exploratory", label: "Exploratory", desc: "1-2 hrs / week" },
                { id: "steady", label: "Steady", desc: "3-5 hrs / week" },
                { id: "intensive", label: "Intensive", desc: "6+ hrs / week" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPacing(p.id as RoadmapPacing)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedPacing === p.id
                      ? "bg-[#171A2B] text-white border-[#171A2B]"
                      : "bg-[#F7F7FD] border-[#E8E6F3] text-[#4A4E69] hover:bg-white"
                  }`}
                >
                  <div className="text-xs font-bold">{p.label}</div>
                  <div className={`text-[10px] mt-0.5 ${selectedPacing === p.id ? "text-white/70" : "text-[#98A2B3]"}`}>
                    {p.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Personal Growth Goal */}
          <div className="space-y-3 pt-3 border-t border-[#F2F1FA]">
            <div className="space-y-0.5">
              <label className="block text-xs font-bold text-[#171A2B]">
                Define Your Personal Next Move Goal
              </label>
              <p className="text-[11px] text-[#4A4E69]">
                Set a clear milestone for your portfolio, college direction, or internship prep.
              </p>
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-[11px] font-semibold text-[#4A4E69] mb-1">
                  Primary Learning Focus
                </label>
                <input
                  type="text"
                  value={customFocus}
                  onChange={(e) => setCustomFocus(e.target.value)}
                  placeholder="e.g., Applied Systems Architecture & Design"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8E6F3] bg-[#F7F7FD] focus:bg-white text-[#171A2B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#4A4E69] mb-1">
                  Target Outcome / Goal
                </label>
                <input
                  type="text"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  placeholder="e.g., Complete 2 portfolio projects and attach GitHub repos"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8E6F3] bg-[#F7F7FD] focus:bg-white text-[#171A2B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#4A4E69] mb-1">
                  Goal Focus Area
                </label>
                <select
                  value={goalType}
                  onChange={(e) => setGoalType(e.target.value as GoalType)}
                  className="w-full text-xs p-2 rounded-xl border border-[#E8E6F3] bg-white text-[#171A2B]"
                >
                  <option value="project_portfolio">Project Portfolio</option>
                  <option value="skill_mastery">Skill Demonstration</option>
                  <option value="academic_preparation">Subject & Stream Prep</option>
                  <option value="internship_readiness">Internship / Fellowship</option>
                  <option value="exploration_clarity">Exploration Clarity</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#4A4E69] mb-1">
                  Target Horizon
                </label>
                <select
                  value={targetQuarter}
                  onChange={(e) => setTargetQuarter(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-[#E8E6F3] bg-white text-[#171A2B]"
                >
                  <option value="Next 4 Weeks">Next 4 Weeks</option>
                  <option value="Next 3 Months">Next 3 Months</option>
                  <option value="This Semester">This Semester</option>
                  <option value="This Academic Year">This Academic Year</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#F2F1FA]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#4A4E69] hover:bg-[#F7F7FD]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5645E5] transition-all shadow-xs"
            >
              Save Customization
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
