import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { AudiencePageHero } from "@/components/marketing/AudiencePageHero";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { AudienceCard } from "@/components/marketing/AudienceCard";
import { SchoolDynamicStageExperience } from "@/components/marketing/school/SchoolDynamicStageExperience";
import { SchoolCreationsShowcase } from "@/components/marketing/school/SchoolCreationsShowcase";
import { SchoolPartnerSection } from "@/components/marketing/school/SchoolPartnerSection";
import { SchoolParentExperience } from "@/components/marketing/school/SchoolParentExperience";
import { SchoolPartnershipSection } from "@/components/marketing/school/SchoolPartnershipSection";
import { SchoolFinalCTA } from "@/components/marketing/school/SchoolFinalCTA";
import {
  Compass,
  Sparkles,
  BookOpen,
  Palette,
  HeartHandshake,
  GraduationCap,
  Briefcase,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Next Move Explore — School & Stream Discovery (Classes 4–12) | Next Move AI",
  description:
    "Playful curiosity, practical activities, and thoughtful stream exploration for school students from Classes 4 to 12 and their families.",
};

const SCHOOL_FAQS = [
  {
    q: "How does Next Move Explore help middle school students (Classes 4–7)?",
    a: "We focus on open curiosity, playful observation, and creative micro-challenges. We never assign adult career titles, calculate fake fit scores, or lock young students into rigid paths.",
  },
  {
    q: "How does stream exploration work for Class 10 students?",
    a: "Instead of forcing an immediate stream decision under pressure, we present balanced educational scenarios across Science, Commerce, Arts, and vocational avenues, letting students test starter trials to experience what the work feels like.",
  },
  {
    q: "Is Next Move AI an entrance exam coaching or tutoring app?",
    a: "No. Next Move AI is not a test coaching or rote memorization app. We focus on hands-on curiosity, practical micro-projects, and foundational skill development across arts, sciences, logic, commerce, and civic problems.",
  },
  {
    q: "Can parents participate without overwhelming their child?",
    a: "Yes. Our Family Conversation Cards offer thoughtful, dinner-table discussion prompts that celebrate what excited the student during their week, rather than turning learning into stressful interrogations.",
  },
  {
    q: "Does the public preview collect my child's personal data?",
    a: "No. The public preview runs entirely without account creation, cookies, or profiling. When families choose to create a student account, full guardian consent and strict data privacy safeguards apply.",
  },
  {
    q: "How can schools integrate Next Move Explore into their timetable?",
    a: "Our proposed co-curricular enrichment model fits smoothly into zero-hour or club periods with ready-to-use teacher facilitation guides that require no extra homework or grading overhead.",
  },
];

export default function SchoolLandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] selection:bg-[#E8F9FA] selection:text-[#269CA8] overflow-x-clip">
      {/* SECTION 1: Public Header with Audience-Aware Navigation */}
      <Header />

      <main className="flex-1">
        {/* SECTION 2: School Audience Hero */}
        <AudiencePageHero
          audience="school"
          eyebrow="Next Move Explore · Classes 4–12 & Families"
          eyebrowIcon={Compass}
          headlineMain="Big discoveries begin with small curiosities."
          headlineAccent="Explore what you love learning."
          description="Explore new ideas, create something meaningful, try exciting activities, and discover what you love learning — one experience at a time. From storytelling and problem-solving to technology, creativity and practical learning, Next Move AI helps children explore a world of possibilities."
          primaryCta={{
            label: "Start Exploring",
            href: "/get-started?audience=school",
          }}
          secondaryCta={{
            label: "See How It Works",
            href: "#school-stages",
          }}
          trustPills={[
            "Classes 4–12 Age Appropriate",
            "Zero Premature Career Labels",
            "Respectful Parent Collaboration",
            "Independent & Unbiased Guidance",
          ]}
          visualSlot={
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#E8E6F3] shadow-lg shadow-[#35B8C5]/5 relative overflow-hidden">
              <div className="flex items-center gap-2.5 pb-4 border-b border-[#F1F0F8]">
                <div className="w-9 h-9 rounded-xl bg-[#E8F9FA] text-[#269CA8] flex items-center justify-center font-bold text-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#171A2B]">
                    Next Move Explore
                  </h3>
                  <p className="text-[11px] text-[#626987]">
                    Classes 4–7 · Classes 8–10 · Classes 11–12
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3.5">
                <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#E8F9FA] text-[#269CA8] flex items-center justify-center shrink-0 mt-0.5">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#171A2B]">
                      Classes 4–7 · Curiosity Before Careers
                    </h4>
                    <p className="text-[11px] text-[#626987] mt-0.5 leading-relaxed">
                      Drawing comics, observing plant phototropism, crafting puzzles, and building confidence.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#171A2B]">
                      Classes 8–10 · Guided Multi-Stream Clarity
                    </h4>
                    <p className="text-[11px] text-[#626987] mt-0.5 leading-relaxed">
                      Hands-on trials across tech, science, design, and commerce before high-stakes stream choices.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#E8F9FA] text-[#269CA8] flex items-center justify-center shrink-0 mt-0.5">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#171A2B]">
                      Classes 11–12 · Real Degree & Project Insight
                    </h4>
                    <p className="text-[11px] text-[#626987] mt-0.5 leading-relaxed">
                      Practical financial modeling, algorithm scale, and pre-university clarity without coaching hype.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
        />

        {/* SECTION 3: Dynamic Academic Stage Selector & Interactive Experience */}
        <SchoolDynamicStageExperience />

        {/* SECTION 4: Look What You Can Create (Illustrative Student Output) */}
        <SchoolCreationsShowcase />

        {/* SECTION 5: My Partner in School Context */}
        <SchoolPartnerSection />

        {/* SECTION 6: For Parents & Family Collaboration */}
        <SchoolParentExperience />

        {/* SECTION 7: School Partnerships */}
        <SchoolPartnershipSection />

        {/* SECTION 8: School FAQs */}
        <section id="school-faqs" className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E8E6F3] overflow-x-clip">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              eyebrowIcon={<HelpCircle className="w-3.5 h-3.5" />}
              title="Common Questions from Students & Families"
              subtitle="Everything you need to know about our student-first philosophy, privacy safeguards, and educational approach."
              accent="cyan"
              className="mb-10"
            />

            <div className="space-y-4">
              {SCHOOL_FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-[#E8E6F3] shadow-xs"
                >
                  <h3 className="text-base font-bold text-[#171A2B] flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-[#E8F9FA] text-[#269CA8] text-xs font-extrabold flex items-center justify-center shrink-0">
                      Q
                    </span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="mt-2.5 text-sm text-[#474D66] leading-relaxed pl-8.5">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: Final Call to Action */}
        <SchoolFinalCTA />

        {/* SECTION 10: Cross-Audience Navigation Cards */}
        <section className="py-16 lg:py-20 bg-[#FAF9F6] border-b border-[#E8E6F3] overflow-x-clip">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Explore Other Journeys"
              eyebrowIcon={<Sparkles className="w-3.5 h-3.5" />}
              title="Not in School? Discover Next Move AI for Higher Ed & Careers"
              subtitle="Every learning stage has its own tailored tools, decision frameworks, and practical studio."
              accent="iris"
              className="mb-10"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <AudienceCard
                id="college"
                title="Next Move Build"
                badge="Diploma & Degree"
                tagline="Practical Capability Over Exam Hype"
                description="Compare B.Tech, BCA, and lateral entry paths, build real projects, and craft actionable next moves."
                highlights={[
                  "Discover, Begin, Progress structured paths",
                  "Honest degree alternatives & trade-offs",
                  "Project-based capability building",
                ]}
                ctaLabel="Explore College & Degree Paths"
                href="/college"
                icon={GraduationCap}
                accent="iris"
              />

              <AudienceCard
                id="professionals"
                title="Next Move Grow"
                badge="Continuous Horizon"
                tagline="Lifelong Skill Verification"
                description="Early access preview for working professionals seeking continuous skill validation and career clarity."
                highlights={[
                  "Truthful evidence ledger",
                  "Role transition exploration",
                  "Independent & unbiased guidance",
                ]}
                ctaLabel="View Professionals Preview"
                href="/professionals"
                icon={Briefcase}
                accent="blue"
                statusNotice="Upcoming Preview · Non-operational"
              />
            </div>
          </div>
        </section>
      </main>

      {/* SECTION 11: Footer */}
      <Footer />
    </div>
  );
}
