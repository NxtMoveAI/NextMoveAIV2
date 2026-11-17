import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { AudiencePageHero } from "@/components/marketing/AudiencePageHero";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { AudienceCard } from "@/components/marketing/AudienceCard";
import { ProfessionalDynamicGoalSelector } from "@/components/marketing/professionals/ProfessionalDynamicGoalSelector";
import { ProfessionalTransferableCapabilities } from "@/components/marketing/professionals/ProfessionalTransferableCapabilities";
import { ProfessionalPracticalExperience } from "@/components/marketing/professionals/ProfessionalPracticalExperience";
import { ProfessionalPathwaysSection } from "@/components/marketing/professionals/ProfessionalPathwaysSection";
import { ProfessionalOpportunitiesSection } from "@/components/marketing/professionals/ProfessionalOpportunitiesSection";
import { ProfessionalPartnerSection } from "@/components/marketing/professionals/ProfessionalPartnerSection";
import { ProfessionalResearchNoticeSection } from "@/components/marketing/professionals/ProfessionalResearchNoticeSection";
import {
  Briefcase,
  Compass,
  GraduationCap,
  Sparkles,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Next Move Grow — Professional Learning & Development Preview | Next Move AI",
  description:
    "An upcoming continuous learning and growth horizon for experienced professionals. Transferable capability analysis, realistic upskilling, and grounded career transitions. In research & development.",
};

const PROFESSIONAL_FAQS = [
  {
    q: "Is Next Move Grow an operational product today?",
    a: "No. Next Move Grow is currently in active research and development. The operational launch tracks of Next Move AI are School (Classes 4–12) and College (Diploma, Degree & Engineering). We are exploring future capabilities for working professionals and welcome research feedback.",
  },
  {
    q: "How do Upskill, Reskill, and Career Transition differ?",
    a: "Upskilling deepens capabilities in your existing role (e.g. adding data analytics to marketing). Reskilling prepares you for emerging organizational needs or new workflow responsibilities without starting from zero. Career Transition explores adjacent sectors while taking into account family commitments, financial buffers, and realistic job requirements.",
  },
  {
    q: "Do I have to switch into software or coding to benefit?",
    a: "Absolutely not. We reject the assumption that non-IT professionals must abandon their background to code. Real-world expertise in finance, operations, education, logistics, and customer communication has compounding value when paired with modern workflow tools.",
  },
  {
    q: "Does Next Move AI guarantee job placements or provide salary predictions?",
    a: "Never. We are not a recruitment agency, staffing firm, or placement consultancy. We do not invent vacancies or promise 30-day career switches. We provide structured capability building, transferable skill analysis, and realistic progression pathways.",
  },
  {
    q: "How can I participate in research or stay updated?",
    a: "You can reach our research team directly at contact@nextmove.ai. We do not operate a fake waiting list or collect marketing leads; we conduct thoughtful qualitative interviews with professionals navigating career decisions.",
  },
];

export default function ProfessionalsLandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] selection:bg-[#EFF6FF] selection:text-[#2563EB] overflow-x-clip">
      {/* SECTION 1: Public Header with Audience-Aware Navigation */}
      <Header />

      <main className="flex-1">
        {/* SECTION 2: Professional Audience Hero */}
        <AudiencePageHero
          audience="professionals"
          eyebrow="Professional Learning Experience — In Development"
          eyebrowIcon={Briefcase}
          headlineMain="Your experience matters."
          headlineAccent="Your next move starts with what you know."
          description="Understand your existing capabilities, explore new possibilities, develop relevant skills and build a realistic path toward your professional goals."
          primaryCta={{
            label: "Explore Growth Directions",
            href: "#growth-directions",
          }}
          secondaryCta={{
            label: "Discover Next Move AI",
            href: "/",
          }}
          trustPills={[
            "In Active Research & Development",
            "Zero Job Board or Placement Agency Claims",
            "Transferable Capabilities Framework",
            "Grounded Practical Micro-Trials",
          ]}
          visualSlot={
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#E8E6F3] shadow-lg shadow-[#2563EB]/5 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#F1F0F8]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold text-sm">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#171A2B]">
                      Next Move Grow
                    </h3>
                    <p className="text-[11px] text-[#626987]">
                      Continuous Professional Development
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]">
                  In Development
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span className="text-xs font-bold text-[#171A2B]">
                      Catalog Existing Capital
                    </span>
                  </div>
                  <span className="text-[11px] text-[#10B981] font-semibold">
                    100% Transferable
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                    <span className="text-xs font-bold text-[#171A2B]">
                      20-Min Practical Trials
                    </span>
                  </div>
                  <span className="text-[11px] text-[#2563EB] font-semibold">
                    Try Before Tuition
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#6757F5]" />
                    <span className="text-xs font-bold text-[#171A2B]">
                      Self-Directed Sprints
                    </span>
                  </div>
                  <span className="text-[11px] text-[#6757F5] font-semibold">
                    Flexible Pacing
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#F1F0F8] flex items-center justify-between">
                <span className="text-[11px] text-[#7B82A0]">
                  Grounded in demonstrated deliverables
                </span>
                <span className="text-xs font-bold text-[#2563EB] inline-flex items-center gap-1">
                  <span>Explore below</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          }
        />

        {/* SECTION 3: Dynamic Professional Goal Selector (Upskill / Reskill / Transition) */}
        <ProfessionalDynamicGoalSelector />

        {/* SECTION 4: Transferable Capabilities ("Your Experience Is Not Wasted") */}
        <ProfessionalTransferableCapabilities />

        {/* SECTION 5: Practical Experience Preview ("Experience a Possible Next Direction") */}
        <ProfessionalPracticalExperience />

        {/* SECTION 6: Flexible Development Pathways ("Build Your Next Move at Your Own Pace") */}
        <ProfessionalPathwaysSection />

        {/* SECTION 7: Professional Growth Possibilities & Opportunity Context */}
        <ProfessionalOpportunitiesSection />

        {/* SECTION 8: My Partner for Professionals Preview */}
        <ProfessionalPartnerSection />

        {/* SECTION 9: Research Notice & Interest Validation ("Help Shape Next Move Grow") */}
        <ProfessionalResearchNoticeSection />

        {/* SECTION 10: Frequently Asked Questions */}
        <section id="professional-faqs" className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E8E6F3]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Clear Guidance"
              eyebrowIcon={<HelpCircle className="w-3.5 h-3.5" />}
              title="Frequently Asked Questions"
              subtitle="Straightforward answers about our professional learning vision and development roadmap."
              accent="iris"
              className="mb-12"
            />

            <div className="space-y-4">
              {PROFESSIONAL_FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-[#E8E6F3] shadow-xs"
                >
                  <h3 className="text-base font-bold text-[#171A2B] mb-2 flex items-start gap-2.5">
                    <span className="text-[#2563EB] font-black">Q.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-sm text-[#474D66] leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 11: Cross-Audience Navigation Cards */}
        <section className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Active Launch Tracks"
              eyebrowIcon={<Sparkles className="w-3.5 h-3.5" />}
              title="Explore Active Next Move AI Journeys"
              subtitle="Browse our operational public learning platforms currently live for school students and higher education learners."
              accent="iris"
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <AudienceCard
                id="school"
                title="Next Move Explore"
                badge="Classes 4–12"
                tagline="Spark Curiosity Early"
                description="Low-pressure exploration, playful micro-challenges, and balanced stream discovery with zero premature labels."
                highlights={[
                  "Classes 4–12 age-appropriate activities",
                  "Family conversation starter cards",
                  "No premature career locking",
                ]}
                ctaLabel="Explore School Journey"
                href="/school"
                icon={Compass}
                accent="cyan"
              />

              <AudienceCard
                id="college"
                title="Next Move Build"
                badge="Diploma & Degree"
                tagline="Practical Capability Over Exam Hype"
                description="Structured Discover, Begin, Progress paths for Diploma, Degree, Engineering, and Graduate students with real project blueprints."
                highlights={[
                  "3-state Discover, Begin, Progress framework",
                  "Equal depth for Non-IT and IT disciplines",
                  "Project-based capability development",
                ]}
                ctaLabel="Explore College Paths"
                href="/college"
                icon={GraduationCap}
                accent="iris"
              />
            </div>
          </div>
        </section>
      </main>

      {/* SECTION 12: Shared Company Footer */}
      <Footer />
    </div>
  );
}
