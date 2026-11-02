/**
 * NEXT MOVE AI V2 — STUDENT SETTINGS WORKSPACE
 * 
 * Comprehensive student settings interface.
 * Implements:
 * - Profile overview and baseline navigation
 * - Privacy preferences and AI context memory controls
 * - Flexible learning pace (Task D)
 * - Guardian visibility preferences with server-authorization notice
 * - Prototype JSON data export with explicit DPDP disclosure
 * - Accessibility controls (reduced motion, high contrast)
 * - Clear separation of local client vs backend-dependent capabilities
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Shield,
  Eye,
  Download,
  Accessibility,
  KeyRound,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sliders,
  Lock,
  Info,
  ArrowRight,
  X,
} from "lucide-react";
import { useSettings } from "../hooks/useSettings";
import { useStudentHome } from "@/features/student-home/hooks/useStudentHome";
import { type LearningPacePreference } from "../types";

export function StudentSettingsWorkspace() {
  const {
    state,
    downloadSuccess,
    guardianNoticeOpen,
    setGuardianNoticeOpen,
    toggleCompanionMemory,
    togglePathwaysPersonalization,
    toggleReducedMotion,
    toggleHighContrast,
    setLearningPace,
    handleExportJSON,
  } = useSettings();

  const { viewModel } = useStudentHome();
  const [securityNoticeOpen, setSecurityNoticeOpen] = useState(false);

  const stageLabel = viewModel.academicStageLabel || "Current Stage";
  const isMinor = viewModel.academicStageId === "classes-4-7" || viewModel.academicStageId === "classes-8-10";

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Workspace Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider border border-[#DDD8FE]">
          <Sliders className="w-3.5 h-3.5" />
          <span>Student Preferences & Privacy</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
          Account & Learning Settings
        </h1>
        <p className="text-sm text-[#626987] max-w-2xl leading-relaxed">
          Manage your personal discovery preferences, guardian visibility, learning pace, and export your prototype session profile.
        </p>
      </div>

      {/* 1. Profile Overview & Starting Baseline */}
      <section
        aria-labelledby="profile-overview-heading"
        className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E6F3] pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="profile-overview-heading"
                className="text-lg font-black text-[#171A2B] tracking-tight"
              >
                Student Starting Profile
              </h2>
              <p className="text-xs text-[#626987]">
                Your confirmed educational baseline and stage context
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/student/profile"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#DDD8FE] bg-[#F7F6FF] text-[#6757F5] text-xs font-bold hover:bg-[#EDEAFF] transition-all"
            >
              <span>View Baseline Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`/onboarding?stage=${viewModel.academicStageId}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E8E6F3] bg-white text-[#474D66] text-xs font-bold hover:bg-[#FAF9F6] transition-all"
            >
              <span>Edit via Onboarding</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Profile Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F95B2]">
              Student Name
            </span>
            <p className="text-sm font-bold text-[#171A2B]">
              {viewModel.studentName || "Student Explorer (Active Session)"}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F95B2]">
              Academic Stage
            </span>
            <p className="text-sm font-bold text-[#6757F5] flex items-center gap-1.5">
              <span>{stageLabel}</span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#EDEAFF] text-[#6757F5]">
                {viewModel.academicStageId}
              </span>
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F95B2]">
              Account Type & Safety
            </span>
            <p className="text-sm font-bold text-[#059669] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isMinor ? "Protected Minor Cohort" : "Independent Student"}</span>
            </p>
          </div>
        </div>

        {/* Declared Interests */}
        {(viewModel.interests.selectedCategoryIds.length > 0 ||
          viewModel.interests.selectedSubInterestIds.length > 0) && (
          <div className="pt-2">
            <span className="text-[11px] font-bold text-[#8F95B2] uppercase tracking-wider block mb-2">
              Current Explored Interests
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                ...viewModel.interests.selectedCategoryIds,
                ...viewModel.interests.selectedSubInterestIds,
              ].map((interest: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl bg-[#F4F3F8] text-[#474D66] text-xs font-medium border border-[#E8E6F3]"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 2. Flexible Learning Pace & Goals (Task D Continuous Growth) */}
      <section
        aria-labelledby="learning-pace-heading"
        className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-5"
      >
        <div className="flex items-center gap-3 border-b border-[#E8E6F3] pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2
              id="learning-pace-heading"
              className="text-lg font-black text-[#171A2B] tracking-tight"
            >
              Learning Pace & Goal Rhythm
            </h2>
            <p className="text-xs text-[#626987]">
              You determine your exploration rhythm • No compulsory deadlines or artificial streaks
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(
            [
              {
                id: "explorer",
                label: "Explorer",
                badge: "Self-Paced",
                desc: "Sample multiple domains without pressure. Ideal for discovering new interests and light trial activities.",
              },
              {
                id: "builder",
                label: "Builder",
                badge: "Project-Driven",
                desc: "Focus on practical experiments, building starter project artifacts, and active roadmaps.",
              },
              {
                id: "deep_dive",
                label: "Deep Dive",
                badge: "Transition-Focused",
                desc: "Rigorous evidence gathering for entrance decisions, university applications, or career placements.",
              },
            ] as const
          ).map((pace) => {
            const isSelected = state.learningPace === pace.id;
            return (
              <button
                key={pace.id}
                type="button"
                onClick={() => setLearningPace(pace.id as LearningPacePreference)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2.5 ${
                  isSelected
                    ? "bg-[#F7F6FF] border-[#6757F5] shadow-xs ring-1 ring-[#6757F5]"
                    : "bg-white border-[#E8E6F3] hover:border-[#DDD8FE]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-[#171A2B]">{pace.label}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-[#6757F5] text-white"
                        : "bg-[#F4F3F8] text-[#626987]"
                    }`}
                  >
                    {pace.badge}
                  </span>
                </div>
                <p className="text-xs text-[#626987] leading-relaxed">{pace.desc}</p>
                {isSelected && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#6757F5]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active Goal Preference</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Guardian Visibility & Consent State */}
      <section
        aria-labelledby="guardian-visibility-heading"
        className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E6F3] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="guardian-visibility-heading"
                className="text-lg font-black text-[#171A2B] tracking-tight"
              >
                Guardian Visibility & Consent
              </h2>
              <p className="text-xs text-[#626987]">
                Transparency controls for parent and guardian observation
              </p>
            </div>
          </div>

          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border self-start sm:self-auto ${
              isMinor
                ? "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]"
                : "bg-[#F4F3F8] text-[#626987] border-[#E8E6F3]"
            }`}
          >
            {isMinor ? "Observation Mode Active" : "Adult Cohort (Optional)"}
          </span>
        </div>

        {isMinor ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
                    Connected Guardian
                  </span>
                  <p className="text-sm font-bold text-[#171A2B]">
                    {state.guardianName} ({state.guardianEmail})
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#059669] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0] self-start sm:self-auto">
                  Consent Verified • Prototype Demo
                </span>
              </div>
              <p className="text-xs text-[#474D66] leading-relaxed">
                Your guardian can view weekly exploration topics, completed hands-on challenges, and active project milestones.
                <strong> Private My Partner chat conversations are confidential to you and are never shared.</strong>
              </p>
            </div>

            {/* Guardian Consent Change Guard */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3]">
              <div className="flex items-center gap-2.5 text-xs text-[#474D66]">
                <Shield className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>Guardian authorization changes require verified parent authentication.</span>
              </div>
              <button
                type="button"
                onClick={() => setGuardianNoticeOpen(true)}
                className="px-3.5 py-1.5 rounded-xl border border-[#DDD8FE] bg-white text-[#6757F5] text-xs font-bold hover:bg-[#EDEAFF] transition-all cursor-pointer self-start sm:self-auto"
              >
                Request Consent Update
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] text-xs text-[#626987] space-y-2">
            <p className="font-bold text-[#171A2B]">Independent Student Profile</p>
            <p>
              As a student in higher education or adult stage ({stageLabel}), your account is independent. You may optionally invite a parent or mentor for observation during backend onboarding.
            </p>
          </div>
        )}
      </section>

      {/* 4. Privacy Preferences & Student Data Controls */}
      <section
        aria-labelledby="privacy-heading"
        className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-5"
      >
        <div className="flex items-center gap-3 border-b border-[#E8E6F3] pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#FAF5FF] text-[#9333EA] flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2
              id="privacy-heading"
              className="text-lg font-black text-[#171A2B] tracking-tight"
            >
              Privacy Preferences & Companion Memory
            </h2>
            <p className="text-xs text-[#626987]">
              Control how local exploratory signals inform AI suggestions
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Companion memory toggle */}
          <div className="flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3]">
            <div className="space-y-0.5">
              <label htmlFor="companion-memory-toggle" className="text-sm font-bold text-[#171A2B] block cursor-pointer">
                AI Companion Episodic Context
              </label>
              <p className="text-xs text-[#626987]">
                Allow My Partner to reference your saved pathways and completed practical trials when suggesting next steps.
              </p>
            </div>
            <input
              id="companion-memory-toggle"
              type="checkbox"
              checked={state.allowCompanionMemory}
              onChange={(e) => toggleCompanionMemory(e.target.checked)}
              className="w-5 h-5 text-[#6757F5] rounded border-[#DDD8FE] focus:ring-[#6757F5] cursor-pointer"
            />
          </div>

          {/* Discovery personalization toggle */}
          <div className="flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3]">
            <div className="space-y-0.5">
              <label htmlFor="pathway-personalization-toggle" className="text-sm font-bold text-[#171A2B] block cursor-pointer">
                Pathway Discovery Personalization
              </label>
              <p className="text-xs text-[#626987]">
                Prioritize exploration recommendations based on your confirmed academic stage and self-reported interests.
              </p>
            </div>
            <input
              id="pathway-personalization-toggle"
              type="checkbox"
              checked={state.allowPathwaysPersonalization}
              onChange={(e) => togglePathwaysPersonalization(e.target.checked)}
              className="w-5 h-5 text-[#6757F5] rounded border-[#DDD8FE] focus:ring-[#6757F5] cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#F4F3F8] text-[11px] text-[#8F95B2] flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#6757F5] shrink-0" />
            <span>Active in current browser session • Persistent cross-device sync will be managed by backend PostgreSQL RLS policies.</span>
          </div>
        </div>
      </section>

      {/* 5. Accessibility Preferences (Local Controls) */}
      <section
        aria-labelledby="accessibility-heading"
        className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-5"
      >
        <div className="flex items-center gap-3 border-b border-[#E8E6F3] pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold">
            <Accessibility className="w-5 h-5" />
          </div>
          <div>
            <h2
              id="accessibility-heading"
              className="text-lg font-black text-[#171A2B] tracking-tight"
            >
              Accessibility & Visual Comfort
            </h2>
            <p className="text-xs text-[#626987]">
              Local client-side display preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3]">
            <div className="space-y-0.5">
              <label htmlFor="reduced-motion-toggle" className="text-sm font-bold text-[#171A2B] block cursor-pointer">
                Reduced Motion
              </label>
              <p className="text-xs text-[#626987]">
                Disable animations, transitions, and pulsing indicator lights.
              </p>
            </div>
            <input
              id="reduced-motion-toggle"
              type="checkbox"
              checked={state.reducedMotion}
              onChange={(e) => toggleReducedMotion(e.target.checked)}
              className="w-5 h-5 text-[#6757F5] rounded border-[#DDD8FE] focus:ring-[#6757F5] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3]">
            <div className="space-y-0.5">
              <label htmlFor="high-contrast-toggle" className="text-sm font-bold text-[#171A2B] block cursor-pointer">
                High Contrast Mode
              </label>
              <p className="text-xs text-[#626987]">
                Enhance border contrast and text emphasis for low-vision clarity.
              </p>
            </div>
            <input
              id="high-contrast-toggle"
              type="checkbox"
              checked={state.highContrast}
              onChange={(e) => toggleHighContrast(e.target.checked)}
              className="w-5 h-5 text-[#6757F5] rounded border-[#DDD8FE] focus:ring-[#6757F5] cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* 6. Prototype Profile Data Export (JSON) */}
      <section
        aria-labelledby="export-heading"
        className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E6F3] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center font-bold">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="export-heading"
                className="text-lg font-black text-[#171A2B] tracking-tight"
              >
                Prototype Session Data Export
              </h2>
              <p className="text-xs text-[#626987]">
                Download your current exploration baseline, saved pathways, and evidence ledger
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExportJSON}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#6757F5] text-white text-xs font-bold shadow-md shadow-[#6757F5]/20 hover:bg-[#5342E8] transition-all cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Download Prototype Profile (.JSON)</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="p-3.5 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center gap-2 text-xs font-bold text-[#059669]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Prototype profile downloaded successfully as JSON file!</span>
          </div>
        )}

        <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-2 font-bold">
            <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0" />
            <span>Prototype Export Disclosure (DPDP Notice)</span>
          </div>
          <p>
            This file exports active browser exploration data (saved pathways, completed practical trials, and starting baseline).
            It is provided for testing and portability in this prototype. <strong>It does not constitute a certified statutory export under the Digital Personal Data Protection (DPDP) Act or GDPR</strong>, which will be provisioned by Havyas via authenticated backend endpoints.
          </p>
        </div>
      </section>

      {/* 7. Account & Security (Explicitly Marked Backend-Dependent) */}
      <section
        aria-labelledby="security-heading"
        className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E6F3] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F4F3F8] text-[#474D66] flex items-center justify-center font-bold">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="security-heading"
                className="text-lg font-black text-[#171A2B] tracking-tight"
              >
                Account Authentication & Security
              </h2>
              <p className="text-xs text-[#626987]">
                User credentials and access security infrastructure
              </p>
            </div>
          </div>

          <span className="text-[11px] font-bold text-[#D97706] bg-[#FEF3C7] border border-[#FDE68A] px-3 py-1 rounded-full flex items-center gap-1.5 self-start sm:self-auto">
            <Lock className="w-3.5 h-3.5" />
            <span>Backend-Dependent (Supabase Auth)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F95B2]">
              Registered Email
            </span>
            <p className="text-sm font-bold text-[#171A2B]">student@nextmove.ai</p>
            <p className="text-[11px] text-[#8F95B2]">
              Email modification and verification tokens handled by Supabase Auth service.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F95B2]">
              Password & Multi-Factor Auth
            </span>
            <p className="text-sm font-bold text-[#171A2B]">••••••••••••</p>
            <button
              type="button"
              onClick={() => setSecurityNoticeOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] hover:text-[#5342E8] cursor-pointer"
            >
              <span>Manage Credentials (Backend Flow)</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Modal: Guardian Notice (Cannot be altered from student client) */}
      {guardianNoticeOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="guardian-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-[#DDD8FE] space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#E8E6F3] pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#D97706]">
                <Shield className="w-5 h-5" />
                <span id="guardian-modal-title">Guardian Authorization Required</span>
              </div>
              <button
                type="button"
                onClick={() => setGuardianNoticeOpen(false)}
                className="p-1 rounded-lg text-[#8F95B2] hover:text-[#171A2B] hover:bg-[#F4F3F8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#474D66] leading-relaxed">
              In accordance with student privacy protection guidelines, guardian consent status cannot be modified from the student workspace.
            </p>

            <div className="p-3.5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-xs text-[#474D66] space-y-2">
              <p className="font-bold text-[#171A2B]">How to update guardian settings:</p>
              <ol className="list-decimal list-inside space-y-1 text-[#626987]">
                <li>Ask your parent or guardian to sign in to the Parent Portal.</li>
                <li>They can review and modify consent preferences from their dashboard.</li>
                <li>Changes are verified and stored securely via the backend server.</li>
              </ol>
            </div>

            <button
              type="button"
              onClick={() => setGuardianNoticeOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5342E8] transition-all cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Modal: Security Notice (Supabase Auth Handoff) */}
      {securityNoticeOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="security-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-[#DDD8FE] space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#E8E6F3] pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#6757F5]">
                <KeyRound className="w-5 h-5" />
                <span id="security-modal-title">Backend Authentication Notice</span>
              </div>
              <button
                type="button"
                onClick={() => setSecurityNoticeOpen(false)}
                className="p-1 rounded-lg text-[#8F95B2] hover:text-[#171A2B] hover:bg-[#F4F3F8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#474D66] leading-relaxed">
              Password changes, email updates, and two-factor authentication require verified backend integration.
            </p>

            <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] space-y-1">
              <p className="font-bold">Backend Integration Scope (Havyas)</p>
              <p>
                In the integrated deployment, this action triggers a secure Supabase Auth password reset email with temporary JWT tokens.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSecurityNoticeOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5342E8] transition-all cursor-pointer"
            >
              Close Notice
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
