import React from "react";
import { Header } from "@/components/marketing/Header";
import { Hero } from "@/components/marketing/Hero";
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

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] selection:bg-[#EDEAFF] selection:text-[#6757F5]">
      {/* SECTION 1: Premium Navigation */}
      <Header />

      <main className="flex-1">
        {/* SECTION 2: Hero Experience */}
        <Hero />

        {/* SECTION 3: Interactive Student Explorer */}
        <StudentExplorer />

        {/* SECTION 4: How Next Move AI Works (The 4 Stages) */}
        <HowItWorks />

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
