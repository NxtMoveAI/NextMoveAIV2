"use client";

import React, { useState } from "react";
import {
  Building,
  CheckCircle2,
  AlertCircle,
  Mail,
  Send,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

interface CollegePillar {
  number: string;
  title: string;
  tag: string;
  description: string;
  highlight: string;
  icon: string;
}

const COLLEGE_PILLARS: CollegePillar[] = [
  {
    number: "01",
    title: "Beyond-Syllabus Practical Studios",
    tag: "Co-Curricular Studios",
    description:
      "Structured practical micro-challenges that fit seamlessly into existing lab periods or weekend club hours without disrupting university syllabi.",
    highlight: "Complements autonomous and affiliated degree curricula",
    icon: "🔬",
  },
  {
    number: "02",
    title: "Multi-Disciplinary Tracks",
    tag: "Non-IT & IT Parity",
    description:
      "Grounded experiential project tracks across BCA, B.Com, BBA, B.Sc, and Engineering branches—not just computer science.",
    highlight: "Equitable exposure across commerce, science, and tech",
    icon: "⚖️",
  },
  {
    number: "03",
    title: "Faculty Enablement Toolkits",
    tag: "Educator Support",
    description:
      "Ready-to-use code/project review rubrics, Socratic discussion prompts, and debrief templates that empower professors without adding grading burdens.",
    highlight: "Zero administrative overhead for departments",
    icon: "📖",
  },
  {
    number: "04",
    title: "Demonstrated Portfolio Evidence",
    tag: "Placement Support",
    description:
      "Students graduate with verified project artifacts, architectural write-ups, and defensible code repositories that elevate technical interviews.",
    highlight: "Concrete deliverables over generic resumes",
    icon: "📁",
  },
  {
    number: "05",
    title: "Descriptive Capability Observations",
    tag: "Objective Evidence",
    description:
      "Descriptive documentation of what students have built and tested, moving beyond flat MCQ percentages to verifiable capability logs.",
    highlight: "Transparent evidence of student effort and growth",
    icon: "📈",
  },
];

export function CollegePartnershipSection() {
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);
  const [collegeName, setCollegeName] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setInquirySubmitted(true);
    }
  };

  return (
    <section id="college-partnerships" className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE] shadow-xs">
            <Building className="w-3.5 h-3.5" />
            <span>Institutional Collaboration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Bring practical learning into{" "}
            <span className="text-[#6757F5]">
              your college.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            A proposed institutional enrichment model for degree colleges, engineering institutes, and polytechnics seeking to bridge classroom theory and workplace readiness.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] border border-[#E8E6F3] text-[11px] text-[#626987] shadow-xs">
            <AlertCircle className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>Proposed Pilot Program · Expressions of interest open for colleges and universities</span>
          </div>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {COLLEGE_PILLARS.map((pil) => (
            <div
              key={pil.number}
              className="p-6 rounded-3xl bg-[#FAF9F6] border border-[#E8E6F3] hover:border-[#6757F5]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{pil.icon}</span>
                  <span className="text-xs font-extrabold text-[#7B82A0]">
                    #{pil.number}
                  </span>
                </div>

                <span className="text-[10px] font-bold text-[#6757F5] uppercase tracking-wider block mb-1">
                  {pil.tag}
                </span>

                <h3 className="text-base font-bold text-[#171A2B] mb-2 leading-snug">
                  {pil.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#626987] leading-relaxed mb-4">
                  {pil.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E6F3] flex items-center gap-1.5 text-[11px] font-semibold text-[#4338CA]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6757F5]" />
                <span>{pil.highlight}</span>
              </div>
            </div>
          ))}

          {/* Quick Pilot Inquiry Box in 6th Slot */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#EDEAFF]/40 to-[#FAF9F6] border-2 border-[#DDD8FE] flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#6757F5] text-white flex items-center justify-center font-bold text-sm mb-3">
                <Mail className="w-4 h-4" />
              </div>

              <span className="text-[10px] font-bold text-[#6757F5] uppercase tracking-wider block mb-1">
                Institutional Pilots
              </span>

              <h3 className="text-base font-bold text-[#171A2B] mb-2 leading-snug">
                Request an Academic Pilot
              </h3>

              <p className="text-xs text-[#626987] leading-relaxed mb-4">
                We are co-designing pilot programs with forward-thinking degree and engineering institutions across India.
              </p>
            </div>

            {!inquirySubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="text"
                  placeholder="College Name &amp; City"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D5D8E2] bg-white text-[#171A2B] focus:outline-none focus:ring-1 focus:ring-[#6757F5]"
                />
                <input
                  type="email"
                  required
                  placeholder="Official Institutional Email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D5D8E2] bg-white text-[#171A2B] focus:outline-none focus:ring-1 focus:ring-[#6757F5]"
                />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5342E8] transition-all"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-3 h-3" />
                </button>
              </form>
            ) : (
              <div className="p-3.5 rounded-xl bg-white border border-[#DDD8FE] text-xs text-[#4338CA] font-semibold text-center animate-fade-in">
                ✓ Thank you! Our academic partnerships team will contact {emailInput}.
              </div>
            )}
          </div>
        </div>

        {/* Clear Institutional Scope / Non-ERP Disclosure */}
        <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-[#FAF9F6] border-2 border-[#E8E6F3] shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#171A2B]">
                Institutional Scope Notice &amp; Ethical Disclosure
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-[#474D66] leading-relaxed">
                Next Move AI is <strong>not a college ERP, attendance tracking system, examination controller, or commercial placement agency</strong>. We prioritize learner-first capability development and transparent guidance over commercial promotion, and we never sell student contact details. Any future institutional or academic relationships will be transparently disclosed.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href="mailto:partnerships@nextmove.ai?subject=College%20Practical%20Enrichment%20Pilot%20Inquiry"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] hover:underline"
                >
                  <span>Direct inquiries: partnerships@nextmove.ai</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
