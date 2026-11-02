/**
 * NEXT MOVE AI V2 — PARENT DASHBOARD WORKSPACE
 * 
 * Production-quality guardian discovery & observation workspace.
 * Follows strict educational design principles:
 * - No fake aptitude scores or predictive ranking
 * - Grounded qualitative observations from hands-on trials
 * - Clear privacy boundaries (student AI chats are confidential)
 * - Explicit prototype disclaimers regarding real legal consent
 * - Strict client-side authorization: URL tampering is rejected
 */

"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Users,
  Shield,
  CheckCircle2,
  BookOpen,
  MessageSquare,
  AlertTriangle,
  Lock,
  ShieldCheck,
  Compass,
} from "lucide-react";
import {
  MOCK_PARENT_PROFILE,
  MOCK_LINKED_STUDENTS,
  getLinkedStudentById,
} from "../data/mock-parent-data";

export function ParentDashboardWorkspace() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read student parameter with fallback to first authorized child
  const requestedStudentId = searchParams.get("student") || MOCK_LINKED_STUDENTS[0].id;
  const activeStudent = getLinkedStudentById(requestedStudentId);

  // Preference toggles (simulated local state)
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [activityAlerts, setActivityAlerts] = useState(true);
  const [consentModalOpen, setConsentModalOpen] = useState(false);

  // Handler for student switcher
  const handleSelectStudent = (studentId: string) => {
    router.push(`/dashboard/parent?student=${studentId}`);
  };

  // If URL was tampered with an unauthorized student ID
  if (!activeStudent) {
    return (
      <div className="py-12 max-w-xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-[#FEF2F2] text-[#DC2626] mx-auto flex items-center justify-center border border-[#FECACA] shadow-sm">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#DC2626]">
            Access Restricted
          </span>
          <h1 className="text-2xl font-black text-[#171A2B]">
            Unauthorized Student Profile
          </h1>
          <p className="text-sm text-[#626987] leading-relaxed">
            You do not have verified guardian authorization to view this student profile.
            Linked student access is strictly confined to your confirmed minor children.
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleSelectStudent(MOCK_LINKED_STUDENTS[0].id)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#6757F5] text-white text-xs font-bold shadow-md hover:bg-[#5342E8] transition-all cursor-pointer"
        >
          <span>Return to Authorized Student</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. Prototype Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
          <span>
            <strong>Prototype Guardian Demonstration:</strong> Demonstrates guardian observation for minor students. Authentic legal consent and multi-factor parent-child verification will be provisioned by Havyas via backend APIs.
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] bg-[#FEF3C7] px-2.5 py-1 rounded-full border border-[#FDE68A] whitespace-nowrap self-start sm:self-auto">
          Frontend Prototype
        </span>
      </div>

      {/* 2. Welcome & Linked Student Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#6757F5] uppercase tracking-wider">
            Guardian Observation Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171A2B] tracking-tight">
            Welcome, {MOCK_PARENT_PROFILE.name}
          </h1>
          <p className="text-sm text-[#626987]">
            Observing learning journeys, supporting discovery, and guiding next steps without pressure.
          </p>
        </div>

        {/* Linked Children Pill Selector */}
        <div className="space-y-1.5 self-start lg:self-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F95B2] block">
            Select Linked Child:
          </span>
          <div className="flex items-center gap-2">
            {MOCK_LINKED_STUDENTS.map((student) => {
              const isSelected = student.id === activeStudent.id;
              return (
                <button
                  key={student.id}
                  type="button"
                  onClick={() => handleSelectStudent(student.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                    isSelected
                      ? "bg-[#6757F5] text-white border-[#6757F5] shadow-md shadow-[#6757F5]/20"
                      : "bg-[#F7F6FF] text-[#474D66] border-[#DDD8FE] hover:bg-[#EDEAFF]"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{student.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-white text-[#6757F5]"}`}>
                    {student.gradeLevel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Student Overview Card */}
      <section
        aria-labelledby="student-overview-heading"
        className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E6F3] pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center font-black text-lg">
              {activeStudent.name[0]}
            </div>
            <div>
              <h2
                id="student-overview-heading"
                className="text-xl font-black text-[#171A2B] tracking-tight"
              >
                {activeStudent.name}
              </h2>
              <p className="text-xs text-[#626987]">
                {activeStudent.academicStageLabel} • {activeStudent.schoolName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-3 py-1 rounded-full flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Guardian Consent Active</span>
            </span>
            <span className="text-xs font-medium text-[#8F95B2] bg-[#FAF9F6] border border-[#E8E6F3] px-3 py-1 rounded-full">
              Active: {activeStudent.lastActiveFormatted}
            </span>
          </div>
        </div>

        {/* 3-Column Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F95B2]">
              Explored Career Pathways
            </span>
            <p className="text-2xl font-black text-[#171A2B]">
              {activeStudent.exploredPathways.length}
            </p>
            <p className="text-xs text-[#626987]">Saved for home discussion</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F95B2]">
              Practical Challenges Tried
            </span>
            <p className="text-2xl font-black text-[#6757F5]">
              {activeStudent.practicalTrialsCount}
            </p>
            <p className="text-xs text-[#626987]">Hands-on micro-activities completed</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F95B2]">
              Active Exploration Projects
            </span>
            <p className="text-2xl font-black text-[#059669]">
              {activeStudent.activeProjects.length}
            </p>
            <p className="text-xs text-[#626987]">Self-driven milestone progress</p>
          </div>
        </div>
      </section>

      {/* 4. Student Privacy & Confidentiality Principle */}
      <section
        aria-labelledby="privacy-principle-heading"
        className="p-6 sm:p-7 rounded-3xl bg-[#F7F6FF] border border-[#DDD8FE] shadow-xs space-y-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white text-[#6757F5] flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2
              id="privacy-principle-heading"
              className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight"
            >
              Student Confidentiality & Safe Agency Principle
            </h2>
            <p className="text-xs text-[#626987]">
              Why guardian observation protects student candor
            </p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-[#474D66] leading-relaxed">
          In alignment with our learning philosophy, <strong>conversations between {activeStudent.name} and My Partner AI companion are private to the student</strong>.
          Young learners express uncertainty and ask creative questions most freely when they are not being graded or monitored in real time.
          Guardians receive high-level weekly summaries, verified trial evidence, and safety notifications — never raw conversational logs.
        </p>
      </section>

      {/* 5. Pathways Explored & Active Curiosity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Explored Pathways */}
        <section
          aria-labelledby="pathways-heading"
          className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-4 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-[#6757F5]" />
              <h2
                id="pathways-heading"
                className="text-base font-black text-[#171A2B] tracking-tight"
              >
                Saved Educational Pathways
              </h2>
            </div>
            <p className="text-xs text-[#626987]">
              Career and academic routes {activeStudent.name} is currently curious about:
            </p>

            <div className="space-y-2.5">
              {activeStudent.exploredPathways.map((pathway) => (
                <div
                  key={pathway.id}
                  className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#171A2B]">{pathway.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EDEAFF] text-[#6757F5]">
                      {pathway.stream}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8F95B2]">{pathway.cluster}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Declared Curiosity Topics */}
          <div className="pt-4 border-t border-[#E8E6F3]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F95B2] block mb-2">
              Active Curiosity Tags:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeStudent.curiosityTopics.map((topic, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-xl bg-[#F4F3F8] text-[#474D66] text-xs font-medium border border-[#E8E6F3]"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Practical Evidence & Observations */}
        <section
          aria-labelledby="observations-heading"
          className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#059669]" />
            <h2
              id="observations-heading"
              className="text-base font-black text-[#171A2B] tracking-tight"
            >
              Practical Evidence & Observations
            </h2>
          </div>
          <p className="text-xs text-[#626987]">
            Non-judgmental observations from completed hands-on challenges:
          </p>

          <div className="space-y-3">
            {activeStudent.observations.map((obs) => (
              <div
                key={obs.id}
                className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#171A2B]">
                    {obs.activityTitle}
                  </span>
                  <span className="text-[10px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                    Completed
                  </span>
                </div>
                <p className="text-xs text-[#474D66] leading-relaxed">
                  {obs.observationSummary}
                </p>
                <div className="flex items-center justify-between text-[10px] text-[#8F95B2] pt-1">
                  <span>Category: {obs.category}</span>
                  <span>{obs.completedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 6. Family Discussion Starters (Task D Continuous Growth) */}
      <section
        aria-labelledby="discussion-heading"
        className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <MessageSquare className="w-5 h-5 text-[#6757F5]" />
          <h2
            id="discussion-heading"
            className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight"
          >
            Family Conversation Starters
          </h2>
        </div>
        <p className="text-xs text-[#626987]">
          Suggested prompts to encourage open discussion at dinner or weekend check-ins:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {activeStudent.discussionPrompts.map((prompt, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] text-xs text-[#474D66] space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#EDEAFF] text-[#6757F5] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="leading-relaxed">{prompt}</p>
              </div>
              <span className="text-[10px] text-[#8F95B2] font-semibold pt-2">
                Open-ended inquiry • No pressure
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Guardian Consent & Notification Preferences */}
      <section
        aria-labelledby="consent-preferences-heading"
        className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E6F3] pb-4">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[#D97706]" />
            <div>
              <h2
                id="consent-preferences-heading"
                className="text-base font-black text-[#171A2B] tracking-tight"
              >
                Guardian Consent & Notification Preferences
              </h2>
              <p className="text-xs text-[#626987]">
                Manage observation permissions and communication frequency
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setConsentModalOpen(true)}
            className="px-4 py-2 rounded-xl border border-[#DDD8FE] bg-[#F7F6FF] text-[#6757F5] text-xs font-bold hover:bg-[#EDEAFF] transition-all cursor-pointer self-start sm:self-auto"
          >
            Review Consent Terms
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3]">
            <div className="space-y-0.5">
              <label htmlFor="weekly-digest-toggle" className="text-xs font-bold text-[#171A2B] block cursor-pointer">
                Weekly Exploration Digest
              </label>
              <p className="text-[11px] text-[#626987]">
                Receive a summary email every Sunday highlighting pathways explored and completed trials.
              </p>
            </div>
            <input
              id="weekly-digest-toggle"
              type="checkbox"
              checked={weeklyDigest}
              onChange={(e) => setWeeklyDigest(e.target.checked)}
              className="w-5 h-5 text-[#6757F5] rounded border-[#DDD8FE] focus:ring-[#6757F5] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3]">
            <div className="space-y-0.5">
              <label htmlFor="activity-alerts-toggle" className="text-xs font-bold text-[#171A2B] block cursor-pointer">
                Practical Activity Notifications
              </label>
              <p className="text-[11px] text-[#626987]">
                Notify me when {activeStudent.name} completes a hands-on project milestone.
              </p>
            </div>
            <input
              id="activity-alerts-toggle"
              type="checkbox"
              checked={activityAlerts}
              onChange={(e) => setActivityAlerts(e.target.checked)}
              className="w-5 h-5 text-[#6757F5] rounded border-[#DDD8FE] focus:ring-[#6757F5] cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* Modal: Guardian Consent Terms */}
      {consentModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-[#DDD8FE] space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#E8E6F3] pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#171A2B]">
                <ShieldCheck className="w-5 h-5 text-[#059669]" />
                <span id="consent-modal-title">Guardian Consent Scope & Disclosures</span>
              </div>
              <button
                type="button"
                onClick={() => setConsentModalOpen(false)}
                className="p-1 rounded-lg text-[#8F95B2] hover:text-[#171A2B] hover:bg-[#F4F3F8]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#474D66] leading-relaxed">
              <p>
                <strong>What guardian consent covers in Next Move AI:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-[#626987]">
                <li>Access to age-appropriate career exploration simulations for secondary and middle school students.</li>
                <li>Participation in non-hazardous household micro-challenges and science trials.</li>
                <li>Parental visibility into weekly milestone progress and evidence logs.</li>
              </ul>

              <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] space-y-1">
                <p className="font-bold">Backend Integration Disclosure</p>
                <p>
                  Formal legal consent records, identity verification, and revocation are maintained securely by Havyas via PostgreSQL database tables with audit trails conforming to the Digital Personal Data Protection (DPDP) Act.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setConsentModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5342E8] transition-all cursor-pointer"
            >
              Close Terms Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
