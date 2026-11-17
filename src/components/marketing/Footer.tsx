"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#171A2B] text-white pt-16 pb-12 border-t border-[#2C314E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-md">
                <Image
                  src="/logo.png"
                  alt="Next Move AI Logo"
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl tracking-tight text-white">
                    Next Move <span className="text-[#35B8C5]">AI</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-full bg-white/10 text-[#35B8C5] border border-white/20">
                    V2
                  </span>
                </div>
                <span className="text-[11px] text-white/60 font-medium">
                  Student Intelligence, Skill Development &amp; Continuous Growth Platform
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed">
              &ldquo;We don’t decide careers; we enable clarity.&rdquo;
              Next Move AI helps students understand themselves, explore curated
              educational pathways, and build practical skills with confidence.
            </p>

            <div className="pt-2 text-xs text-[#35B8C5] font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#35B8C5] animate-pulse" />
              <span>Phase 1 — Intelligent Landing Page</span>
            </div>
          </div>

          {/* Column: How It Works */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 mb-4">
              The 4 Stages
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/70">
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  01. Understand Me
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  02. Explore Possibilities
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  03. Make Informed Choices
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  04. Build My Next Move
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  Continuous Growth Loop
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Target Audiences */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 mb-4">
              Audience Journeys
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/70">
              <li>
                <Link href="/school" className="hover:text-[#35B8C5] transition-colors font-medium">
                  Next Move Explore (School 4–12)
                </Link>
              </li>
              <li>
                <Link href="/college" className="hover:text-[#35B8C5] transition-colors font-medium">
                  Next Move Build (College & Degrees)
                </Link>
              </li>
              <li>
                <Link href="/professionals" className="hover:text-[#35B8C5] transition-colors font-medium">
                  Next Move Grow (Professionals Preview)
                </Link>
              </li>
              <li>
                <Link href="/school#for-parents" className="hover:text-white transition-colors">
                  Parents & Families
                </Link>
              </li>
              <li>
                <Link href="/dashboard/student" className="hover:text-white transition-colors">
                  Student Workspace (Demo)
                </Link>
              </li>
              <li>
                <Link href="/dashboard/parent" className="hover:text-white transition-colors">
                  Guardian Portal (Demo)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Platform & Governance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 mb-4">
              Governance & Access
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/70">
              <li>
                <Link href="/#my-partner" className="hover:text-white transition-colors">
                  Meet My Partner
                </Link>
              </li>
              <li>
                <Link href="/#experiences" className="hover:text-white transition-colors">
                  Interactive Previews
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  FAQ & Pricing Beta
                </Link>
              </li>
              <li>
                <Link href="/get-started" className="hover:text-white transition-colors">
                  Get Started (Role Entry)
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/dashboard/student" className="text-[#35B8C5] hover:text-white transition-colors font-medium">
                  Student Workspace (Demo)
                </Link>
              </li>
              <li>
                <Link href="/dashboard/parent" className="text-[#35B8C5] hover:text-white transition-colors font-medium">
                  Guardian Portal (Demo)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution and Legal Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© 2026 Next Move AI. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span className="font-semibold text-white/90">
              A brand of Navlore AI Technologies LLP.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70">
              Frontend V2 Phase 1 (Marketing & Explorer)
            </span>
            <span>Bengaluru, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
