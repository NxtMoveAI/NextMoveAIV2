"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Mail,
  Send,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export function ProfessionalResearchNoticeSection() {
  const [userRole, setUserRole] = useState<string>("");
  const [interestNote, setInterestNote] = useState<string>("");

  return (
    <section id="research-notice" className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DBEAFE] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Research &amp; Future Development</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Help shape{" "}
            <span className="text-[#2563EB]">
              Next Move Grow.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            We are exploring how Next Move AI can support experienced professionals with continuous learning, upskilling, reskilling and realistic career transitions.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] border border-[#E8E6F3] text-[11px] text-[#626987] shadow-xs">
            <AlertCircle className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>In-Development Notice · Active launch tracks remain School &amp; College</span>
          </div>
        </div>

        {/* Dual Card Container: Research Principles + Direct Email Communication */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto mb-10">
          {/* Left Column: Research Focus Areas */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#FAF9F6] border-2 border-[#E8E6F3] flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#171A2B] mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#2563EB]" />
                <span>What We Are Actively Investigating:</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#474D66] leading-relaxed mb-6">
                Our design team is conducting exploratory interviews with professionals across Indian cities and towns to answer core learning questions:
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-white border border-[#E8E6F3] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-md bg-[#EFF6FF] text-[#2563EB] font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    1
                  </span>
                  <p className="text-xs text-[#373D54] leading-relaxed">
                    <strong>Time Sensitivity:</strong> How do full-time employees effectively schedule 4–6 weekly practice hours around irregular commute and shift schedules?
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#E8E6F3] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-md bg-[#EFF6FF] text-[#2563EB] font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    2
                  </span>
                  <p className="text-xs text-[#373D54] leading-relaxed">
                    <strong>Proof Over Resumes:</strong> What specific project deliverables actually convince managers and recruiters that an applicant has authentic capability?
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#E8E6F3] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-md bg-[#EFF6FF] text-[#2563EB] font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    3
                  </span>
                  <p className="text-xs text-[#373D54] leading-relaxed">
                    <strong>Non-IT Protection:</strong> How do we ensure marketing, finance, and operations professionals grow within their disciplines without being steered toward unwanted coding?
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E6F3] flex items-center gap-2 text-xs text-[#626987]">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>Grounded research driven by real learner interviews</span>
            </div>
          </div>

          {/* Right Column: Direct Contact & Honest Email Channel */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#EFF6FF]/60 via-white to-[#FAF9F6] border-2 border-[#DBEAFE] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-bold mb-4 shadow-sm">
                <Mail className="w-5 h-5" />
              </div>

              <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block mb-1">
                Participate in Research
              </span>

              <h3 className="text-xl font-black text-[#171A2B] mb-2">
                Share Your Experience
              </h3>

              <p className="text-xs text-[#474D66] leading-relaxed mb-4">
                If you are a working professional interested in sharing how you approach upskilling or career transitions, contact our research team directly.
              </p>

              {/* Input for pre-populating mailto */}
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  placeholder="Your Current Profession (e.g. Operations Lead)"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D5D8E2] bg-white text-[#171A2B] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
                <textarea
                  rows={2}
                  placeholder="What is your biggest professional learning challenge?"
                  value={interestNote}
                  onChange={(e) => setInterestNote(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D5D8E2] bg-white text-[#171A2B] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>

              <a
                href={`mailto:contact@nextmove.ai?subject=Professional%20Growth%20Research%20Interest&body=Current%20Profession:%20${encodeURIComponent(
                  userRole || "[My Profession]"
                )}%0A%0ALearning%20Challenge:%0A${encodeURIComponent(
                  interestNote || "[My Notes]"
                )}%0A%0AHello%20Next%20Move%20AI%20Team,%0AI%20am%20interested%20in%20participating%20in%20your%20professional%20learning%20research.`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#2563EB] text-white text-xs sm:text-sm font-bold hover:bg-[#1D4ED8] transition-all shadow-xs"
              >
                <span>Express Interest in Research</span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="mt-4 pt-3 border-t border-[#DBEAFE] text-[11px] text-[#626987] leading-relaxed text-center">
              Direct email to <strong>contact@nextmove.ai</strong>. We do not run a fake waiting list or save personal data without real submission.
            </p>
          </div>
        </div>

        {/* Operational Status Disclosure */}
        <div className="p-5 rounded-3xl bg-[#FAF9F6] border border-[#E8E6F3] max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#626987]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
            <span>
              <strong>Launch Tracks:</strong> Operational platforms are currently live for School (`/school`) and College (`/college`) students.
            </span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-bold text-[#171A2B] hover:text-[#2563EB] transition-colors shrink-0"
          >
            <span>Return to Company Homepage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
