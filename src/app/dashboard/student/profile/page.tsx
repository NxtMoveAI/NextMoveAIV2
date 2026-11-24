"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Edit3,
  CheckCircle2,
  Shield,
  User,
  Mail,
  Phone,
  MapPin,
  School,
  GraduationCap,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useStudentHome } from "@/features/student-home/hooks/useStudentHome";

export default function StudentProfileReviewPage() {
  const { viewModel, userProfile, isRealAuthenticatedUser, isLoading, error, retryLoad } = useStudentHome();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center space-y-4">
        <div className="w-10 h-10 border-3 border-[#6757F5] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-semibold text-[#474D66]">Loading student profile...</p>
      </div>
    );
  }

  if (error && !userProfile) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
        <Link
          href="/dashboard/student"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#6757F5] hover:text-[#5342E8] p-1 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student Home</span>
        </Link>
        <div className="p-8 rounded-3xl bg-white border border-[#FCA5A5] shadow-sm text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center mx-auto text-[#DC2626]">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#171A2B]">Unable to Load Profile</h2>
          <p className="text-sm text-[#474D66] max-w-md mx-auto">{error}</p>
          <button
            type="button"
            onClick={retryLoad}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  const displayName = isRealAuthenticatedUser && userProfile ? userProfile.name : (viewModel.studentName || "My Intelligence Baseline");

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
          <span>{isRealAuthenticatedUser ? "Verified Account Profile Active" : "Confirmed Baseline Active"}</span>
        </span>
      </div>

      {/* Main Profile Summary Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#DDD8FE] shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E6F3] pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
              {isRealAuthenticatedUser ? "Verified Student Profile Baseline" : "Student Intelligence Starting Profile Baseline"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
              {displayName}
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

        {/* Real User Registration Details (Authenticated Users) */}
        {isRealAuthenticatedUser && userProfile && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#171A2B]">
              Registered Account Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#DDD8FE] flex items-center justify-center shrink-0 text-[#6757F5]">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#626987]">Full Name</span>
                  <p className="text-xs font-bold text-[#171A2B] truncate">{userProfile.name}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#DDD8FE] flex items-center justify-center shrink-0 text-[#6757F5]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#626987]">Email Address</span>
                  <p className="text-xs font-bold text-[#171A2B] truncate">{userProfile.email}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#DDD8FE] flex items-center justify-center shrink-0 text-[#6757F5]">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#626987]">Phone Number</span>
                  <p className="text-xs font-bold text-[#171A2B] truncate">{userProfile.phoneNumber || "Not provided"}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#DDD8FE] flex items-center justify-center shrink-0 text-[#6757F5]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#626987]">City / Location</span>
                  <p className="text-xs font-bold text-[#171A2B] truncate">{userProfile.city || "Not provided"}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#DDD8FE] flex items-center justify-center shrink-0 text-[#6757F5]">
                  <School className="w-4 h-4" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#626987]">Institution</span>
                  <p className="text-xs font-bold text-[#171A2B] truncate">{userProfile.institution || "Not provided"}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#DDD8FE] flex items-center justify-center shrink-0 text-[#6757F5]">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#626987]">Academic Stage</span>
                  <p className="text-xs font-bold text-[#6757F5] truncate">{viewModel.academicStageLabel}</p>
                </div>
              </div>
            </div>
          </div>
        )}

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
