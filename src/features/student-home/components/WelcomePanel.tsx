/**
 * NEXT MOVE AI V2 — PERSONALIZED WELCOME PANEL
 * 
 * Adaptive hero header matching the student's confirmed academic stage.
 * Calm, intelligent, and focused without generic motivational hype.
 */

"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, Sparkles, Compass } from "lucide-react";
import { type AcademicStageId } from "@/data/landing-demo";

interface WelcomePanelProps {
  stageId: AcademicStageId;
  studentName?: string;
  stageLabel: string;
  academicSummary: string;
}

export function WelcomePanel({
  stageId,
  studentName,
  stageLabel,
  academicSummary,
}: WelcomePanelProps) {
  // Adaptive stage heading
  const getAdaptiveHeading = () => {
    switch (stageId) {
      case "classes-4-7":
        return "Ready to discover something new?";
      case "classes-8-10":
        return "Let's explore what interests you.";
      case "classes-11-12":
        return "Your next move starts with exploration.";
      case "diploma":
        return "Let's build on what you've learned.";
      case "degree-engineering":
        return "Understand where you stand. Build what comes next.";
      case "final-year-grad":
        return "Let's explore your next transition.";
      default:
        return "Your student intelligence workspace.";
    }
  };

  const getSubheading = () => {
    switch (stageId) {
      case "classes-4-7":
        return "Explore fun drawing, nature, and creative puzzles without any pressure to pick a career.";
      case "classes-8-10":
        return "Discover how different school subjects connect to real-world avenues before choosing your stream.";
      case "classes-11-12":
        return "Compare degree pathways, entrance timelines, and practical skills to make confident college choices.";
      case "diploma":
        return "Evaluate lateral entry B.Tech, specialized automation tracks, and realistic technical roles.";
      case "degree-engineering":
        return "Turn textbook concepts into demonstrated portfolio evidence and clear industry options.";
      case "final-year-grad":
        return "Synthesize policy, research, or enterprise avenues as you prepare for your post-degree leap.";
      default:
        return "Understand where you are, discover where you could go, and build your next move.";
    }
  };

  return (
    <section
      aria-labelledby="welcome-heading"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#F7F6FF] to-[#EDEAFF]/40 border border-[#DDD8FE] p-6 sm:p-8 md:p-10 shadow-sm"
    >
      <div className="relative z-10 max-w-3xl space-y-4">
        {/* Context pill */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] border border-[#DDD8FE] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{stageLabel}</span>
          </span>

          <span className="text-xs font-semibold text-[#626987]">
            {academicSummary}
          </span>
        </div>

        {/* Greeting and Heading */}
        <div className="space-y-1.5">
          {studentName && (
            <p className="text-xs sm:text-sm font-bold text-[#6757F5] uppercase tracking-wider">
              Welcome back, {studentName}
            </p>
          )}
          <h1
            id="welcome-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-[#171A2B] tracking-tight leading-tight"
          >
            {getAdaptiveHeading()}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#474D66] max-w-2xl leading-relaxed">
            {getSubheading()}
          </p>
        </div>

        {/* Primary CTA */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href="#next-move"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold shadow-md shadow-[#6757F5]/25 transition-all transform hover:-translate-y-0.5"
          >
            <span>See Your Next Move</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <Link
            href="/dashboard/student/profile"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F4F3F8] text-[#31364F] border border-[#E8E6F3] text-xs font-semibold transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>Review Starting Baseline</span>
          </Link>
        </div>
      </div>

      {/* Subtle background decoration */}
      <div className="absolute right-0 top-0 w-72 h-72 bg-radial from-[#6757F5]/10 to-transparent rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
    </section>
  );
}
