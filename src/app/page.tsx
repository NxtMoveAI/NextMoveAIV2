import React from "react";
import { Header } from "@/components/marketing/Header";
import { Hero } from "@/components/marketing/Hero";
import { AudienceCard } from "@/components/marketing/AudienceCard";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { StudentExplorer } from "@/components/marketing/StudentExplorer";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { ExperiencePreviews } from "@/components/marketing/ExperiencePreviews";
import { MyPartnerPreview } from "@/components/marketing/MyPartnerPreview";
import { GrowthJourney } from "@/components/marketing/GrowthJourney";
import { ParentSection } from "@/components/marketing/ParentSection";
import { TrustSection } from "@/components/marketing/TrustSection";
import { FAQ } from "@/components/marketing/FAQ";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { Footer } from "@/components/marketing/Footer";
import { Compass, GraduationCap, Briefcase, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] selection:bg-[#EDEAFF] selection:text-[#6757F5] overflow-x-clip">
      {/* SECTION 1: Premium Navigation with Audience Selector */}
      <Header />

      <main className="flex-1">
        {/* SECTION 2: Hero Experience */}
        <Hero />

        {/* SECTION 2.5: Three Tailored Audience Pathways */}
        <section
          id="audiences"
          className="py-14 lg:py-20 bg-gradient-to-b from-[#FAF9F6] to-white border-b border-[#E8E6F3]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Audience Pathways"
              eyebrowIcon={<Sparkles className="w-3.5 h-3.5" />}
              title="Tailored Learning Journeys for Every Stage"
              subtitle="Whether discovering curiosity in school, building projects in college, or planning career moves, Next Move AI provides clarity without pressure."
              accent="iris"
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <AudienceCard
                id="school"
                title="School Students"
                subtitle="Classes 4–12"
                badge="Next Move Explore"
                tagline="School Learners &amp; Families"
                description="Discover new interests, create, experiment, and grow through exciting learning experiences."
                highlights={[
                  "Age-appropriate exploratory activities",
                  "Family conversation starter cards",
                  "Zero premature career locking",
                ]}
                ctaLabel="Explore My World"
                href="/school"
                icon={Compass}
                accent="cyan"
              />

              <AudienceCard
                id="college"
                title="College Students & Graduates"
                subtitle="Diploma · Degree · Engineering"
                badge="Next Move Build"
                tagline="Practical Capability Over Exam Hype"
                description="Find your starting point, explore practical skills, build meaningful projects, and plan your next move."
                highlights={[
                  "Discover · Begin · Progress structured paths",
                  "Honest degree alternatives & trade-offs",
                  "Practical project-based capability building",
                ]}
                ctaLabel="Build My Next Move"
                href="/college"
                icon={GraduationCap}
                accent="iris"
              />

              <AudienceCard
                id="professionals"
                title="Working Professionals"
                subtitle="Upskilling · Reskilling · Career Transitions"
                badge="Next Move Grow"
                tagline="Lifelong Continuous Development"
                description="Explore transferable skills, new capabilities, and realistic possibilities for professional growth."
                highlights={[
                  "Transferable capability exploration",
                  "Role transition & adjacent skill mapping",
                  "Unbiased guidance — not a placement agency",
                ]}
                ctaLabel="Explore Professional Growth"
                href="/professionals"
                icon={Briefcase}
                accent="blue"
                statusNotice="Upcoming Preview · Non-operational"
              />
            </div>
          </div>
        </section>

        {/* SECTION 3: How Next Move AI Works (The 4 Stages) */}
        <HowItWorks />

        {/* SECTION 4: Interactive Student Explorer */}
        <StudentExplorer />

        {/* SECTION 5: What Students Can Actually Experience (6 Feature Previews) */}
        <ExperiencePreviews />

        {/* SECTION 6: Introducing My Partner (Contextual AI Companion) */}
        <MyPartnerPreview />

        {/* SECTION 7: Student Growth and Continuity */}
        <GrowthJourney />

        {/* SECTION 8: For Parents */}
        <ParentSection />

        {/* SECTION 9: Trust and Transparency */}
        <TrustSection />

        {/* SECTION 10: Frequently Asked Questions */}
        <FAQ />

        {/* SECTION 11: Final Call to Action */}
        <FinalCTA />
      </main>

      {/* SECTION 12: Footer */}
      <Footer />
    </div>
  );
}
