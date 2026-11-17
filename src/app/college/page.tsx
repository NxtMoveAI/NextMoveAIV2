import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { AudiencePageHero } from "@/components/marketing/AudiencePageHero";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { AudienceCard } from "@/components/marketing/AudienceCard";
import { CollegeDynamicLearningFramework } from "@/components/marketing/college/CollegeDynamicLearningFramework";
import { CollegeProjectShowcase } from "@/components/marketing/college/CollegeProjectShowcase";
import { CollegeRoadmapPreview } from "@/components/marketing/college/CollegeRoadmapPreview";
import { CollegeOpportunitiesSection } from "@/components/marketing/college/CollegeOpportunitiesSection";
import { CollegePartnerSection } from "@/components/marketing/college/CollegePartnerSection";
import { CollegePartnershipSection } from "@/components/marketing/college/CollegePartnershipSection";
import {
  GraduationCap,
  Sparkles,
  Cpu,
  Compass,
  Briefcase,
  HelpCircle,
  Code,
  Workflow,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next Move Build — Higher Education & Degree Roadmaps | Next Move AI",
  description:
    "Structured Discover, Begin, Progress paths for Diploma, Degree, Engineering, and Graduate students. Real projects, honest alternatives, and actionable clarity.",
};

const COLLEGE_FAQS = [
  {
    q: "How does Next Move Build handle Polytechnic Diploma students?",
    a: "We provide dedicated lateral entry B.Tech comparison paths, hands-on automation and manufacturing challenges, and practical skill benchmarking tailored specifically to polytechnic graduates.",
  },
  {
    q: "How does Next Move AI approach institutional or course recommendations?",
    a: "Our recommendations are designed strictly around learner-first suitability, transparent trade-offs, and practical educational outcomes. If institutional or academic collaborations are established in the future, they will always be clearly and transparently disclosed.",
  },
  {
    q: "What does the Discover, Begin, Progress framework mean?",
    a: "Instead of jumping blindly into a course, you first Discover options through low-stakes trials, Begin with targeted prerequisites and short starter activities, and Progress by building verified, reviewable portfolio projects.",
  },
  {
    q: "Does completing a project guarantee a job or campus placement?",
    a: "No. Completing a starter project does not make a student immediately employment-ready. True industry readiness requires a coherent body of reviewed work, fundamental conceptual depth, and the ability to articulate trade-offs in interviews. We help you systematically build that evidence base.",
  },
  {
    q: "How does the platform support non-IT degree students (B.Com, BBA, B.Sc)?",
    a: "Next Move Build does not reduce every career to coding. We feature comprehensive practical tracks in corporate financial modeling, business intelligence, operations engineering, and strategic communication alongside technical tracks.",
  },
  {
    q: "Can I explore without creating an account or paying fees?",
    a: "Yes. The entire college exploration framework, trial experiences, and roadmap previews are publicly accessible without mandatory account registration or paywalls.",
  },
];

export default function CollegeLandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] selection:bg-[#EDEAFF] selection:text-[#6757F5] overflow-x-clip">
      {/* SECTION 1: Public Header with Audience-Aware Navigation */}
      <Header />

      <main className="flex-1">
        {/* SECTION 2: College Audience Hero */}
        <AudiencePageHero
          audience="college"
          eyebrow="Next Move Build · Diploma, Engineering & Degrees"
          eyebrowIcon={GraduationCap}
          headlineMain="Your degree is one part of your journey."
          headlineAccent="What will you build next?"
          description="Discover what interests you, explore practical skills, build meaningful projects, and take informed steps toward your future. Whether you're exploring possibilities, starting something new, or already developing a skill, Next Move AI helps you find a meaningful next action."
          primaryCta={{
            label: "Find My Starting Point",
            href: "#college-framework",
          }}
          secondaryCta={{
            label: "Explore Practical Experiences",
            href: "#college-projects",
          }}
          trustPills={[
            "Personalized Learning Situations",
            "Zero Course-Selling or Commissions",
            "Demonstrated Work Over Multiple-Choice Scores",
            "Aligned with Indian Higher Ed Realities",
          ]}
          visualSlot={
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#E8E6F3] shadow-lg shadow-[#6757F5]/5 relative overflow-hidden">
              <div className="flex items-center gap-2.5 pb-4 border-b border-[#F1F0F8]">
                <div className="w-9 h-9 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center font-bold text-sm">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#171A2B]">
                    Next Move Build · 3-State Framework
                  </h3>
                  <p className="text-[11px] text-[#626987]">
                    Diploma · Degree (BCA/B.Com) · Engineering (B.Tech)
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3.5">
                <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0 mt-0.5">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#171A2B]">
                      Discover · Compare Before Committing
                    </h4>
                    <p className="text-[11px] text-[#626987] mt-0.5 leading-relaxed">
                      Introductory 15-minute trials across web systems, data analytics, UI/UX, and finance.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0 mt-0.5">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#171A2B]">
                      Begin · Grounded 14-Day Starter Roadmap
                    </h4>
                    <p className="text-[11px] text-[#626987] mt-0.5 leading-relaxed">
                      Lightweight diagnostics matching your hardware and prior exposure to real starting tasks.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0 mt-0.5">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#171A2B]">
                      Progress · Demonstrated Portfolio Proof
                    </h4>
                    <p className="text-[11px] text-[#626987] mt-0.5 leading-relaxed">
                      Rigorously reviewed projects separating claimed knowledge from defensible capability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
        />

        {/* SECTION 3: Dynamic Discover / Begin / Progress Selector & Academic Context */}
        <CollegeDynamicLearningFramework />

        {/* SECTION 4: Practical Project Showcase ("Learn by Building Something Meaningful") */}
        <CollegeProjectShowcase />

        {/* SECTION 5: Actionable Roadmap Preview */}
        <CollegeRoadmapPreview />

        {/* SECTION 6: Opportunities and Industry Context ("Connect Learning to Real-World Possibilities") */}
        <CollegeOpportunitiesSection />

        {/* SECTION 7: My Partner in College Context */}
        <CollegePartnerSection />

        {/* SECTION 8: College Partnerships */}
        <CollegePartnershipSection />

        {/* SECTION 9: College FAQ Accordion */}
        <section id="college-faqs" className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E8E6F3] overflow-x-clip">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              eyebrowIcon={<HelpCircle className="w-3.5 h-3.5" />}
              title="Clarity on Degrees, Practical Proof &amp; Careers"
              subtitle="Transparent answers regarding college transitions, skill proof, and how Next Move AI maintains zero institutional bias."
              accent="iris"
              className="mb-10"
            />

            <div className="space-y-4">
              {COLLEGE_FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-[#E8E6F3] shadow-xs"
                >
                  <h3 className="text-base font-bold text-[#171A2B] flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-[#EDEAFF] text-[#6757F5] text-xs font-extrabold flex items-center justify-center shrink-0">
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

        {/* SECTION 10: Final Call to Action */}
        <section className="py-16 lg:py-24 bg-white border-b border-[#E8E6F3] text-center overflow-x-clip">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE] shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Take Your Next Step</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
              Your degree gives you a qualification.{" "}
              <span className="text-[#6757F5]">Your projects prove your capability.</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed max-w-2xl mx-auto">
              Stop relying solely on multiple-choice scores. Explore practical challenges, build verified projects, and plan your next move with confidence.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/get-started/student?stage=degree-engineering"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#6757F5] text-white font-bold text-sm shadow-md shadow-[#6757F5]/25 hover:bg-[#5342E8] transition-all"
              >
                <span>Find My Starting Point</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#college-framework"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#FAF9F6] border-2 border-[#E8E6F3] text-[#171A2B] font-bold text-sm hover:bg-[#EDEAFF] hover:border-[#DDD8FE] hover:text-[#6757F5] transition-all"
              >
                <span>Explore 3-State Framework</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 11: Cross-Audience Navigation Cards */}
        <section className="py-16 lg:py-20 bg-[#FAF9F6] border-b border-[#E8E6F3] overflow-x-clip">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Explore Other Journeys"
              eyebrowIcon={<Sparkles className="w-3.5 h-3.5" />}
              title="Discover Next Move AI for School or Professional Growth"
              subtitle="Every learning stage has its own tailored tools, decision frameworks, and practical studio."
              accent="iris"
              className="mb-10"
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

      {/* SECTION 12: Footer */}
      <Footer />
    </div>
  );
}
