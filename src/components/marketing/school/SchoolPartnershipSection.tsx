"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Mail,
  ArrowRight,
  ShieldCheck,
  Send,
  Building,
} from "lucide-react";

interface PartnershipPillar {
  number: string;
  title: string;
  tag: string;
  description: string;
  highlight: string;
  icon: string;
}

const PARTNERSHIP_PILLARS: PartnershipPillar[] = [
  {
    number: "01",
    title: "Curated Exploration Sessions",
    tag: "Co-Curricular Learning",
    description:
      "Structured, low-pressure 30–45 minute activity modules designed for zero-stress classroom exploration and club periods.",
    highlight: "Fits regular zero-hour or activity timetables",
    icon: "🧭",
  },
  {
    number: "02",
    title: "Teacher Facilitation Guides",
    tag: "Educator Support",
    description:
      "Ready-to-use discussion prompts, inquiry prompts, and debrief templates that let teachers facilitate open-ended curiosity effortlessly.",
    highlight: "Zero extra grading or assessment workload",
    icon: "📖",
  },
  {
    number: "03",
    title: "Multi-Stream Parity",
    tag: "Balanced Exposure",
    description:
      "Balanced micro-challenges across arts, sciences, logic, commerce, and civic problems—helping students see diverse pathways early.",
    highlight: "No unilateral push toward engineering or IT",
    icon: "⚖️",
  },
  {
    number: "04",
    title: "Curiosity Observation Framework",
    tag: "Non-Competitive",
    description:
      "Observation frameworks that celebrate problem-solving persistence and creative iteration rather than competitive exam rankings.",
    highlight: "Encourages every learner, not just top rankers",
    icon: "🌱",
  },
  {
    number: "05",
    title: "Flexible Integration",
    tag: "Zero Disruption",
    description:
      "Complements existing school board curricula (CBSE, ICSE, State Boards) without disrupting academic syllabus pacing.",
    highlight: "Pure enrichment, no curriculum replacement",
    icon: "🧩",
  },
];

export function SchoolPartnershipSection() {
  const [emailInput, setEmailInput] = useState<string>("");
  const [schoolName, setSchoolName] = useState<string>("");

  return (
    <section id="school-partnerships" className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F7FA] text-[#00838F] text-xs font-bold uppercase tracking-wider mb-4 border border-[#B2EBF2] shadow-xs">
            <Building className="w-3.5 h-3.5" />
            <span>School Partnerships</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Bring exploration into{" "}
            <span className="text-[#00838F]">
              your school.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            A proposed co-curricular enrichment model for schools and educators who believe curiosity, creativity, and foundational thinking belong alongside textbook learning.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] border border-[#E8E6F3] text-[11px] text-[#626987] shadow-xs">
            <AlertCircle className="w-3.5 h-3.5 text-[#00838F]" />
            <span>Proposed Pilot Program · Expressions of interest open for progressive educational institutions</span>
          </div>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {PARTNERSHIP_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="p-6 rounded-3xl bg-[#FAF9F6] border border-[#E8E6F3] hover:border-[#00838F]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{pillar.icon}</span>
                  <span className="text-xs font-extrabold text-[#7B82A0]">
                    #{pillar.number}
                  </span>
                </div>

                <span className="text-[10px] font-bold text-[#00838F] uppercase tracking-wider block mb-1">
                  {pillar.tag}
                </span>

                <h3 className="text-base font-bold text-[#171A2B] mb-2 leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#626987] leading-relaxed mb-4">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E6F3] flex items-center gap-1.5 text-[11px] font-semibold text-[#00838F]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{pillar.highlight}</span>
              </div>
            </div>
          ))}

          {/* Quick Pilot Inquiry Box in 6th Slot */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#E0F7FA]/50 to-[#FAF9F6] border-2 border-[#B2EBF2] flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#00838F] text-white flex items-center justify-center font-bold text-sm mb-3">
                <Mail className="w-4 h-4" />
              </div>

              <span className="text-[10px] font-bold text-[#00838F] uppercase tracking-wider block mb-1">
                Pilot Inquiries
              </span>

              <h3 className="text-base font-bold text-[#171A2B] mb-2 leading-snug">
                Partner With Us on a Pilot
              </h3>

              <p className="text-xs text-[#626987] leading-relaxed mb-4">
                We are designing pilots for progressive primary, middle, and high schools across India.
              </p>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="School Name & City"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#D5D8E2] bg-white text-[#171A2B] focus:outline-none focus:ring-1 focus:ring-[#00838F]"
              />
              <input
                type="email"
                placeholder="Official Email Address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#D5D8E2] bg-white text-[#171A2B] focus:outline-none focus:ring-1 focus:ring-[#00838F]"
              />
              <a
                href={`mailto:partnerships@nextmove.ai?subject=School%20Exploration%20Pilot%20Inquiry&body=School%20Name:%20${encodeURIComponent(
                  schoolName || "[Your School Name]"
                )}%0AContact%20Email:%20${encodeURIComponent(
                  emailInput || "[Your Email]"
                )}%0A%0AHello%20Next%20Move%20AI%20Team,%0AWe%20are%20interested%20in%20exploring%20a%20co-curricular%20pilot%20for%20our%20school.`}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#00838F] text-white text-xs font-bold hover:bg-[#006978] transition-all shadow-xs"
              >
                <span>Launch Email Inquiry</span>
                <Send className="w-3 h-3" />
              </a>
              <p className="text-[11px] text-[#626987] leading-relaxed text-center">
                Opens your email client to message <strong>partnerships@nextmove.ai</strong> directly. No unverified submission or database storage is performed on this preview.
              </p>
            </div>
          </div>
        </div>

        {/* Clear Non-ERP Disclosure Callout Box */}
        <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-[#FAF9F6] border-2 border-[#E8E6F3] shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-[#E0F7FA] text-[#00838F] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#171A2B]">
                Clear Scope &amp; Honest Disclosure
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-[#474D66] leading-relaxed">
                Next Move AI is <strong>not a school ERP, teacher management portal, attendance tracker, or commercial entrance coaching system</strong>. We do not replace board syllabi or collect personal student data for ranking. We focus strictly on sparking genuine curiosity, multi-stream exploration, and hands-on capability development.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href="mailto:partnerships@nextmove.ai?subject=School%20Exploration%20Pilot%20Inquiry"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00838F] hover:underline"
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
