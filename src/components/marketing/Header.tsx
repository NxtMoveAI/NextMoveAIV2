"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { AudienceNav } from "./AudienceNav";
import { useIsMarketingMode } from "@/lib/deployment-mode";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isMarketing = useIsMarketingMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const prefix = isHomePage ? "" : "/";
  const navLinks = [
    { label: "How It Works", href: `${prefix}#how-it-works` },
    { label: "Explore", href: `${prefix}#explorer` },
    { label: "Experience", href: `${prefix}#experiences` },
    { label: "My Partner", href: `${prefix}#my-partner` },
    { label: "For Parents", href: `${prefix}#for-parents` },
    { label: "FAQ", href: `${prefix}#faq` },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E8E6F3] shadow-[0_4px_20px_-4px_rgba(23,26,43,0.05)]"
          : "bg-[#FAF9F6] border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand identity */}
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
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-[#171A2B]">
                Next Move <span className="text-[#6757F5]">AI</span>
              </span>
            </div>
            <span className="text-[11px] text-[#626987] font-medium hidden 2xl:inline-block">
              Student Intelligence & Decision Platform
            </span>
          </div>
        </Link>

        {/* Audience Navigation */}
        <div className="hidden md:flex items-center shrink-0">
          <AudienceNav />
        </div>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs xl:text-sm font-medium text-[#31364F] hover:text-[#6757F5] px-2 xl:px-3 py-1.5 rounded-lg hover:bg-[#EDEAFF]/60 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA actions */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0" suppressHydrationWarning>
          {!isMarketing ? (
            <>
              <Link
                href="/dashboard/student"
                className="hidden xl:inline-flex items-center gap-1.5 text-xs font-bold text-[#6757F5] bg-[#EDEAFF] hover:bg-[#DDD8FE] px-3 py-2 rounded-xl transition-colors border border-[#DDD8FE] shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Workspace Demo</span>
              </Link>
              <Link
                href="/sign-in"
                className="text-xs xl:text-sm font-semibold text-[#31364F] hover:text-[#6757F5] px-3 xl:px-4 py-2 rounded-xl hover:bg-[#EDEAFF]/50 transition-colors shrink-0"
              >
                Sign In
              </Link>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-1.5 xl:gap-2 text-xs xl:text-sm font-semibold text-white bg-[#6757F5] hover:bg-[#5342E8] px-4 xl:px-5 py-2.5 rounded-xl shadow-[0_4px_14px_rgba(103,87,245,0.3)] hover:shadow-[0_6px_20px_rgba(103,87,245,0.4)] transition-all duration-200 group active:scale-[0.98] shrink-0"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </>
          ) : (
            <>
              <a
                href={isHomePage ? "#explorer" : "/#explorer"}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs xl:text-sm font-semibold text-[#6757F5] bg-[#EDEAFF] hover:bg-[#DDD8FE] px-3.5 py-2 rounded-xl transition-colors border border-[#DDD8FE] shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Try Explorer</span>
              </a>
              <a
                href="mailto:partnerships@nextmove.ai?subject=Institutional%20Pilot%20Inquiry"
                className="inline-flex items-center gap-1.5 xl:gap-2 text-xs xl:text-sm font-semibold text-white bg-[#6757F5] hover:bg-[#5342E8] px-4 xl:px-5 py-2.5 rounded-xl shadow-[0_4px_14px_rgba(103,87,245,0.3)] hover:shadow-[0_6px_20px_rgba(103,87,245,0.4)] transition-all duration-200 group active:scale-[0.98] shrink-0"
              >
                <span>Pilot Inquiries</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2" suppressHydrationWarning>
          {!isMarketing ? (
            <Link
              href="/get-started"
              className="text-xs font-semibold text-white bg-[#6757F5] px-3.5 py-2 rounded-lg"
            >
              Get Started
            </Link>
          ) : (
            <a
              href={isHomePage ? "#explorer" : "/#explorer"}
              className="text-xs font-semibold text-white bg-[#6757F5] px-3.5 py-2 rounded-lg"
            >
              Try Explorer
            </a>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#171A2B] hover:bg-[#EDEAFF] focus:outline-none focus:ring-2 focus:ring-[#6757F5]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 top-20 z-50 lg:hidden flex flex-col bg-[#FAF9F6]/95 backdrop-blur-xl border-t border-[#E8E6F3] animate-fadeIn"
        >
          <div className="p-6 flex flex-col justify-between h-[calc(100vh-5rem)] overflow-y-auto">
            {/* Audience Journeys in Drawer */}
            <div className="pb-4 mb-4 border-b border-[#E8E6F3]">
              <AudienceNav variant="drawer" />
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider font-semibold text-[#626987] px-3 mb-2">
                Explore Sections
              </p>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-base font-medium text-[#171A2B] hover:text-[#6757F5] p-3 rounded-xl hover:bg-[#EDEAFF] transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#626987]" />
                </a>
              ))}
            </div>

            <div className="pt-6 border-t border-[#E8E6F3] space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#EDEAFF] to-[#E8F9FA] border border-[#DDD8FE] flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#6757F5] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#171A2B]">
                    We don’t decide careers; we enable clarity.
                  </p>
                  <p className="text-[11px] text-[#626987] mt-0.5">
                    Experience sample exploration without needing an account.
                  </p>
                </div>
              </div>

              {!isMarketing ? (
                <>
                  <Link
                    href="/get-started"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-semibold bg-[#6757F5] hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/25"
                  >
                    <span>Discover My Next Move</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/student"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-[#6757F5] font-semibold bg-[#EDEAFF] border border-[#DDD8FE] hover:bg-[#DDD8FE]"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Explore Student Workspace (Demo)</span>
                  </Link>
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl text-[#31364F] font-semibold bg-white border border-[#DDD8FE] hover:bg-[#FAF9F6]"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <>
                  <a
                    href={isHomePage ? "#explorer" : "/#explorer"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-semibold bg-[#6757F5] hover:bg-[#5342E8] shadow-md shadow-[#6757F5]/25"
                  >
                    <span>Try Interactive Explorer</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:partnerships@nextmove.ai?subject=Institutional%20Pilot%20Inquiry"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-[#6757F5] font-semibold bg-[#EDEAFF] border border-[#DDD8FE] hover:bg-[#DDD8FE]"
                  >
                    <span>Institutional Pilot Inquiries</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
