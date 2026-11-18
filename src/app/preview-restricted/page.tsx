import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldAlert,
  ArrowRight,
  Compass,
  GraduationCap,
  Briefcase,
  Home,
  Mail,
  Lock,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Preview Restricted | Next Move AI",
  description:
    "Prototype experience is restricted in the public marketing deployment. Explore public curriculum and institutional tracks.",
};

function RestrictedNoticeContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] selection:bg-[#EDEAFF] selection:text-[#6757F5]">
      {/* Header Bar */}
      <header className="w-full bg-[#FAF9F6] border-b border-[#E8E6F3] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] rounded-xl p-1"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-[#E4E1F8] bg-white flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo.png"
                alt="Next Move AI Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-[#171A2B]">
                Next Move <span className="text-[#6757F5]">AI</span>
              </span>
              <span className="text-[11px] text-[#626987] font-medium hidden sm:inline-block">
                Student Intelligence &amp; Decision Platform
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#6757F5] hover:text-[#5342E8] bg-[#EDEAFF] hover:bg-[#DDD8FE] px-3.5 py-2 rounded-xl transition-colors border border-[#DDD8FE]"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col items-center text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-6 border border-[#DDD8FE]">
          <Lock className="w-3.5 h-3.5" />
          <span>Public Marketing Release Boundary</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight max-w-2xl">
          Interactive Workspaces Restricted in Public Preview
        </h1>

        {/* Subtitle / Core Explanation */}
        <p className="mt-4 text-base sm:text-lg text-[#626987] max-w-2xl leading-relaxed">
          In adherence to our data minimization commitments and student data protection standards under the Digital Personal Data Protection (DPDP) Act, live registration, credential storage, and personal student accounts are deactivated in this public marketing preview.
        </p>

        {/* Security & Data Safeguard Callout */}
        <div className="mt-8 w-full max-w-2xl bg-white rounded-2xl border border-[#E8E6F3] p-6 text-left shadow-sm space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 text-[#D97706]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-[#171A2B]">
                Zero Data Collection Guarantee
              </h2>
              <p className="text-xs sm:text-sm text-[#626987] leading-relaxed">
                This public environment does not collect personal passwords, verify email addresses, or store minor profile data. Operational authentication and verifiable parental consent are reserved for controlled institutional pilots.
              </p>
            </div>
          </div>

          <div className="border-t border-[#F0EEFF] pt-4 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F0EEFF] border border-[#DDD8FE] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#6757F5]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-[#171A2B]">
                Controlled Institutional Pilots
              </h2>
              <p className="text-xs sm:text-sm text-[#626987] leading-relaxed">
                Partner institutions, educators, and research evaluators can access simulated test personas and supervised exploration environments under institutional data agreements.
              </p>
            </div>
          </div>
        </div>

        {/* Available Public Tracks */}
        <div className="mt-10 w-full max-w-2xl">
          <h2 className="text-xs font-bold text-[#626987] uppercase tracking-wider mb-4">
            Explore Available Public Curriculum Overviews
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left">
            {/* School */}
            <Link
              href="/school"
              className="group p-4 bg-white rounded-xl border border-[#E8E6F3] hover:border-[#0EA5E9] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#171A2B] group-hover:text-[#0284C7] transition-colors">
                  School Track
                </h3>
                <p className="text-xs text-[#626987] mt-1">
                  Classes 4–12 curiosity exploration &amp; family discussion prompts.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#0284C7]">
                <span>View Track</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* College */}
            <Link
              href="/college"
              className="group p-4 bg-white rounded-xl border border-[#E8E6F3] hover:border-[#6757F5] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#171A2B] group-hover:text-[#6757F5] transition-colors">
                  College Track
                </h3>
                <p className="text-xs text-[#626987] mt-1">
                  Degree &amp; diploma practical trials, project blueprints &amp; fit checks.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#6757F5]">
                <span>View Track</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Professionals */}
            <Link
              href="/professionals"
              className="group p-4 bg-white rounded-xl border border-[#E8E6F3] hover:border-[#10B981] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#D1FAE5] text-[#059669] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#171A2B] group-hover:text-[#059669] transition-colors">
                  Professionals
                </h3>
                <p className="text-xs text-[#626987] mt-1">
                  Continuous career growth research &amp; transition framework preview.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#059669]">
                <span>View Preview</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        {/* Institutional Contact */}
        <div className="mt-10 p-5 rounded-xl bg-[#F8F7FF] border border-[#E4E1F8] max-w-2xl w-full text-xs text-[#626987] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-left">
            <Mail className="w-4 h-4 text-[#6757F5] shrink-0" />
            <span>
              Interested in institutional pilot participation? Email our partnerships team directly.
            </span>
          </div>
          <a
            href="mailto:partnerships@nextmove.ai?subject=Institutional%20Pilot%20Inquiry"
            className="shrink-0 font-bold text-[#6757F5] hover:text-[#5342E8] underline"
          >
            partnerships@nextmove.ai
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#E8E6F3] py-6 text-center text-xs text-[#626987]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 Next Move AI &bull; Navlore AI Technologies LLP</span>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#6757F5] transition-colors">
              Platform Home
            </Link>
            <Link href="/school" className="hover:text-[#6757F5] transition-colors">
              School
            </Link>
            <Link href="/college" className="hover:text-[#6757F5] transition-colors">
              College
            </Link>
            <Link href="/professionals" className="hover:text-[#6757F5] transition-colors">
              Professionals
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function PreviewRestrictedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] text-[#6757F5] font-semibold text-sm">
          Loading boundary protection...
        </div>
      }
    >
      <RestrictedNoticeContent />
    </Suspense>
  );
}
