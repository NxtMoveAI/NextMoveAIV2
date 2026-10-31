"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Edit3, CheckCircle2, Shield } from "lucide-react";
import { useStudentHome } from "@/features/student-home/hooks/useStudentHome";

export default function StudentProfileReviewPage() {
  const { viewModel } = useStudentHome();

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 space-y-6">
      {/* Header with back navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/student"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#6757F5] hover:text-[#5342E8] p-1 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student Home</span>
        </Link>

        <span className="text-[11px] font-bold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-3 py-1 rounded-full flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Confirmed Baseline Active</span>
        </span>
      </div>

      {/* Main Profile Summary Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#DDD8FE] shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E6F3] pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
              Student Intelligence Starting Profile Baseline
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
              {viewModel.studentName || "My Intelligence Baseline"}
            </h1>
            <p className="text-xs sm:text-sm text-[#474D66]">
              {viewModel.academicSummary} • {viewModel.academicStageLabel}
            </p>
          </div>

          <div>
            <Link
              href={`/onboarding?stage=${viewModel.academicStageId}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#DDD8FE] bg-[#F7F6FF] text-[#6757F5] text-xs font-bold hover:bg-[#EDEAFF] transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit via Flow 3 Onboarding</span>
            </Link>
          </div>
        </div>

        {/* Section 1: Academic & Goal Context */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
              Academic Context
            </span>
            <p className="text-sm font-bold text-[#171A2B]">
              {viewModel.academicSummary}
            </p>
            <p className="text-xs text-[#626987]">
              Stage ID: <code className="text-[#6757F5]">{viewModel.academicStageId}</code>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
              Primary Goal & Clarity
            </span>
            <p className="text-sm font-bold text-[#171A2B]">
              {viewModel.primaryGoal}
            </p>
            <p className="text-xs text-[#059669] font-medium">
              State: {viewModel.clarityLevelLabel}
            </p>
          </div>
        </div>

        {/* Section 2: Evidence Taxonomy Summary */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#171A2B]">
            Where You Stand • Evidence Taxonomy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {viewModel.growthSnapshot.evidenceItems.length > 0 ? (
              viewModel.growthSnapshot.evidenceItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-[#E8E6F3] bg-white flex items-start justify-between gap-3 shadow-xs"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-[#171A2B]">{item.title}</p>
                    <p className="text-[11px] text-[#626987]">{item.category}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      item.evidenceStatus === "practised"
                        ? "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]"
                        : item.evidenceStatus === "self_reported"
                        ? "bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]"
                        : "bg-[#F4F3F8] text-[#626987]"
                    }`}
                  >
                    {item.statusLabel}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#626987] italic p-3 bg-[#F4F3F8] rounded-xl col-span-2">
                No initial skills reported. You can explore and practice whenever you are ready.
              </p>
            )}
          </div>
        </div>

        {/* Section 3: Grounded Epistemic Statement */}
        <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-start gap-3 text-xs text-[#92400E]">
          <Shield className="w-4 h-4 shrink-0 text-[#D97706] mt-0.5" />
          <p className="leading-relaxed">
            <strong>Truth in Student Intelligence:</strong> Self-reported skills reflect familiarity, not verified mastery. Only interactive tasks completed under rubric evaluation are marked as Practised or Demonstrated.
          </p>
        </div>
      </div>
    </div>
  );
}
