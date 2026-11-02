/**
 * NEXT MOVE AI V2 — FLOW 8: CONTEXT GROUNDED DRAWER
 * 
 * Transparent inspector revealing all authentic data points grounding My Partner.
 * Provides students with complete visibility into their genuine profile facts,
 * self-reported interests, verified trial evidence, and explicitly unassessed areas.
 */

"use client";

import React from "react";
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  FolderGit2,
  AlertCircle,
  X,
  ExternalLink,
  ShieldCheck,
  Compass,
} from "lucide-react";
import Link from "next/link";
import { type PartnerContextSnapshot } from "../types";

interface ContextGroundedDrawerProps {
  context: PartnerContextSnapshot;
  isOpen: boolean;
  onClose: () => void;
}

export function ContextGroundedDrawer({
  context,
  isOpen,
  onClose,
}: ContextGroundedDrawerProps) {
  if (!isOpen) return null;

  const {
    studentProfile,
    selfReportedInterests,
    savedPathways,
    practisedEvidence,
    activeRoadmap,
    activeProjects,
    epistemicGaps,
  } = context;

  return (
    <aside
      aria-label="Partner Memory and Context Inspector"
      data-testid="context-grounded-drawer"
      className="fixed inset-y-0 right-0 z-40 w-full sm:w-96 bg-white border-l border-[#E2E8F0] shadow-2xl flex flex-col animate-slide-left overflow-hidden"
    >
      {/* Drawer Header */}
      <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center text-[#6757F5]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#171A2B]">
              What My Partner Knows
            </h2>
            <p className="text-[11px] text-[#64748B]">
              Authentic session grounding data
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          data-testid="close-context-drawer-btn"
          className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close context drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs text-[#475569]">
        {/* Section 1: Genuine Academic Profile Facts */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#6757F5]">
            <GraduationCap className="w-4 h-4" />
            <span>Profile Facts (Flow 2–4)</span>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Academic Stage:</span>
              <span className="font-semibold text-[#171A2B] capitalize">
                {studentProfile.academicStageId.replace(/-/g, " ")}
              </span>
            </div>
            {studentProfile.academicSummary && (
              <div className="flex justify-between">
                <span className="text-[#64748B]">Summary:</span>
                <span className="font-semibold text-[#171A2B]">
                  {studentProfile.academicSummary}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#64748B]">Profile Status:</span>
              <span
                className={`font-semibold ${
                  studentProfile.isConfirmedProfile
                    ? "text-[#16A34A]"
                    : "text-[#D97706]"
                }`}
              >
                {studentProfile.isConfirmedProfile
                  ? "Confirmed Real Profile"
                  : "Development Persona"}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Self-Reported Interests */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#6757F5]">
            <Sparkles className="w-4 h-4" />
            <span>Self-Reported Interests (Flow 3)</span>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3">
            {selfReportedInterests.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {selfReportedInterests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-white border border-[#CBD5E1] text-[#334155] text-[11px] font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-[#94A3B8] italic">
                No self-reported interests added yet.
              </p>
            )}
            <p className="text-[10px] text-[#64748B] mt-2 pt-2 border-t border-[#E2E8F0]">
              *Note: Represents student-stated curiosity, not tested competence.
            </p>
          </div>
        </div>

        {/* Section 3: Saved Pathways */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#6757F5]">
              <Compass className="w-4 h-4" />
              <span>Saved Pathways (Flow 5)</span>
            </div>
            <Link
              href="/dashboard/student/explore"
              className="text-[11px] text-[#6757F5] hover:underline flex items-center gap-0.5"
            >
              Explore <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 space-y-1.5">
            {savedPathways.length > 0 ? (
              savedPathways.map((path) => (
                <div
                  key={path.id}
                  className="p-2 bg-white rounded-lg border border-[#E2E8F0] flex items-center justify-between"
                >
                  <span className="font-semibold text-[#171A2B] text-[11px]">
                    {path.title}
                  </span>
                  <span className="text-[10px] text-[#64748B] capitalize">
                    {path.stream}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-[11px] text-[#94A3B8] italic">
                No pathways saved yet in Explore.
              </p>
            )}
          </div>
        </div>

        {/* Section 4: Practised Trial Evidence */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#6757F5]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Practised Evidence (Flow 6)</span>
            </div>
            <Link
              href="/dashboard/student/growth"
              className="text-[11px] text-[#6757F5] hover:underline flex items-center gap-0.5"
            >
              Ledger <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 space-y-2">
            {practisedEvidence.length > 0 ? (
              practisedEvidence.map((ev, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-white rounded-lg border border-[#E2E8F0] flex items-start justify-between gap-2"
                >
                  <div>
                    <div className="font-semibold text-[#171A2B] text-[11px]">
                      {ev.trialTitle}
                    </div>
                    <div className="text-[10px] text-[#64748B]">
                      Competency: {ev.competencyPractised}
                    </div>
                  </div>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                      ev.evidenceStatus === "practised"
                        ? "bg-[#DCFCE7] text-[#15803D]"
                        : "bg-[#FEF3C7] text-[#B45309]"
                    }`}
                  >
                    {ev.evidenceStatus}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-[11px] text-[#94A3B8] italic">
                No trial evidence recorded yet.
              </p>
            )}
          </div>
        </div>

        {/* Section 5: Active Roadmap & Projects */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#6757F5]">
              <FolderGit2 className="w-4 h-4" />
              <span>Next Move Plan (Flow 7)</span>
            </div>
            <Link
              href="/dashboard/student/projects"
              className="text-[11px] text-[#6757F5] hover:underline flex items-center gap-0.5"
            >
              Projects <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 space-y-2">
            {activeRoadmap ? (
              <div>
                <div className="font-semibold text-[#171A2B] text-[11px]">
                  {activeRoadmap.title}
                </div>
                <div className="text-[10px] text-[#64748B]">
                  {activeRoadmap.completedMilestones} of {activeRoadmap.totalMilestones} milestones completed ({activeRoadmap.pacing} pacing)
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-[#94A3B8] italic">
                No active roadmap set.
              </p>
            )}

            {activeProjects.length > 0 && (
              <div className="pt-2 border-t border-[#E2E8F0] space-y-1">
                <span className="text-[10px] font-bold text-[#64748B] uppercase">Active Projects:</span>
                {activeProjects.map((p, idx) => (
                  <div key={idx} className="flex justify-between text-[11px]">
                    <span className="truncate max-w-[180px]">{p.title}</span>
                    <span className="font-semibold text-[#6757F5]">{p.progressPercentage}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 6: Epistemic Gaps / Declared Unknowns */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-[#B45309] text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>Declared Unknowns (No Assumptions)</span>
          </div>
          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3 space-y-1">
            {epistemicGaps.map((gap, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#92400E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] shrink-0" />
                <span>{gap}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
