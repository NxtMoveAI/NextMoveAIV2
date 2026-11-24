/**
 * NEXT MOVE AI V2 — CLASSES 4–7 EXPLORATION DISCOVERY SPACE
 * 
 * Simplified, child-friendly, curiosity-driven exploration space specifically for Classes 4–7.
 * Replaces large corporate catalogue filters, comparisons, and adult career terminology
 * with 5–6 personalized experiences, challenges, and hands-on discoveries.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  X,
  Lightbulb,
  CheckSquare,
} from "lucide-react";
import {
  type ChildExploration,
  type ValidChildClass,
  getPersonalizedChildExplorations,
  getChildExplorationsExplanation,
  extractStudentClass,
} from "../data/child-explorations";
import { type UserStartingPoint, type StudentNextMoveActivity, type UserProfile } from "@/lib/firestore-service";
import { type StudentIntelligenceProfile } from "@/features/onboarding/schemas/types";

interface Classes47ExploreSpaceProps {
  startingPoint?: UserStartingPoint | null;
  activeInterests?: string[];
  completedActivity?: StudentNextMoveActivity | null;
  studentClass?: ValidChildClass | string | null;
  userProfile?: UserProfile | null;
  profile?: StudentIntelligenceProfile | null;
}

export function Classes47ExploreSpace({
  startingPoint,
  activeInterests,
  completedActivity,
  studentClass,
  userProfile,
  profile,
}: Classes47ExploreSpaceProps) {
  const [selectedExploration, setSelectedExploration] = useState<ChildExploration | null>(null);

  // 1. Resolve exact student class (e.g., "Class 4", "Class 5", "Class 6", "Class 7")
  const targetClass = extractStudentClass({
    studentClass,
    userProfile,
    profile,
    startingPoint,
  });

  // 2. Generate strictly filtered & personalized recommendations based on exact class & interests
  const explorations = getPersonalizedChildExplorations({
    studentClass: targetClass,
    startingPoint,
    activeInterests,
    completedActivity,
    userProfile,
    profile,
  });

  const friendlyExplanation = getChildExplorationsExplanation({
    studentClass: targetClass,
    startingPoint,
    activeInterests,
    completedActivity,
    userProfile,
    profile,
  });

  return (
    <div data-testid="classes-4-7-explore-space" className="space-y-6">
      {/* ------------------------------------------------------------------- */}
      {/* 1. HEADER BANNER */}
      {/* ------------------------------------------------------------------- */}
      <section
        aria-label="Classes 4-7 Exploration Header"
        className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDD8FE] shadow-sm space-y-5"
      >
        {/* Navigation & Mode Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#626987]">
          <Link
            href="/dashboard/student"
            className="inline-flex items-center gap-1.5 font-bold text-[#6757F5] hover:text-[#5342E8] transition-colors p-1 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home Dashboard</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6757F5] bg-[#EDEAFF] px-3 py-1 rounded-full">
              {targetClass} • Classes 4–7 Exploration
            </span>
            <button
              type="button"
              className="text-[11px] font-bold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-3 py-1 rounded-full flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>{targetClass} · Classes 4–7 · Curiosity Mode</span>
            </button>
          </div>
        </div>

        {/* Title & Friendly Explanation */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#171A2B] tracking-tight">
                <span className="text-xs font-bold text-[#6757F5] uppercase tracking-wider block mb-0.5">
                  Explore Pathways &amp; Possibilities
                </span>
                Things You Might Love Exploring
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#474D66] max-w-2xl leading-relaxed">
            {friendlyExplanation}
          </p>
        </div>

        {/* Reassurance Banner */}
        <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE]/60 flex items-start sm:items-center gap-3 text-xs text-[#31364F]">
          <Lightbulb className="w-4 h-4 text-[#6757F5] shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            <strong>No career locks or adult pressures:</strong> In {targetClass}, exploration is about trying hands-on challenges, discovering what brings you joy, and building practical things.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 2. PERSONALIZED 5–6 EXPLORATION CARDS GRID */}
      {/* ------------------------------------------------------------------- */}
      <section aria-label="Curiosity Exploration Suggestions" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-lg font-bold text-[#171A2B]">
              Recommended Experiences &amp; Mini-Challenges
            </h2>
            <p className="text-xs text-[#626987]">
              Showing {explorations.length} personalized discoveries chosen for your {targetClass} interests
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {explorations.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-3xl bg-white border border-[#DDD8FE] hover:border-[#6757F5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3.5">
                {/* Card Top Meta */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6757F5] bg-[#EDEAFF] px-2.5 py-1 rounded-lg">
                    {exp.badge}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#626987] bg-[#F4F3F8] px-2.5 py-0.5 rounded-full">
                    <Clock className="w-3 h-3 text-[#6757F5]" />
                    <span>{exp.estimatedTime}</span>
                  </span>
                </div>

                {/* Title & Short Description */}
                <div className="space-y-1.5">
                  <h2 className="text-base sm:text-lg font-bold text-[#171A2B] group-hover:text-[#6757F5] transition-colors leading-snug">
                    {exp.title}
                  </h2>
                  <p className="text-xs text-[#474D66] leading-relaxed">
                    {exp.shortDescription}
                  </p>
                </div>

                {/* What You Can Try */}
                <div className="p-3.5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE]/60 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#171A2B]">
                    <Sparkles className="w-3.5 h-3.5 text-[#6757F5]" />
                    <span>What you can try:</span>
                  </div>
                  <p className="text-[#474D66] text-[11px] leading-relaxed">
                    {exp.whatYouCanTry}
                  </p>
                </div>

                {/* Things You Will Learn */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#171A2B]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                    <span>What you&apos;ll learn or discover:</span>
                  </div>
                  <p className="text-[#626987] text-[11px] leading-relaxed">
                    {exp.whatYouWillLearn}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-[#E8E6F3]">
                <button
                  type="button"
                  onClick={() => setSelectedExploration(exp)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>Explore This Experience</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 3. CHILD EXPLORATION DETAIL MODAL */}
      {/* ------------------------------------------------------------------- */}
      {selectedExploration && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-exploration-title"
          className="fixed inset-0 z-50 bg-[#171A2B]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-5 border border-[#DDD8FE] shadow-xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-[#E8E6F3] pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6757F5] bg-[#EDEAFF] px-2.5 py-0.5 rounded-md">
                  {selectedExploration.badge} · {selectedExploration.estimatedTime}
                </span>
                <h3
                  id="modal-exploration-title"
                  className="text-xl font-black text-[#171A2B] pt-1"
                >
                  {selectedExploration.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedExploration(null)}
                aria-label="Close modal"
                className="p-1.5 rounded-xl hover:bg-[#F4F3F8] text-[#8C93AD] hover:text-[#171A2B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overview */}
            <p className="text-xs sm:text-sm text-[#31364F] leading-relaxed">
              {selectedExploration.shortDescription}
            </p>

            {/* Materials Needed */}
            <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] space-y-2 text-xs">
              <span className="font-bold text-[#171A2B] block">Everyday Materials Needed:</span>
              <div className="flex flex-wrap gap-2">
                {selectedExploration.materialsNeeded.map((mat, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-white border border-[#DDD8FE] text-[#474D66] font-medium text-[11px]"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            {/* Step-by-Step Mini Challenge */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-[#171A2B] block">
                Mini Challenge Steps:
              </span>
              <div className="space-y-2">
                {selectedExploration.challengeSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white border border-[#E8E6F3] flex items-start gap-2.5 text-xs text-[#31364F]"
                  >
                    <CheckSquare className="w-4 h-4 text-[#6757F5] shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 border-t border-[#E8E6F3] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedExploration(null)}
                className="px-5 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold transition-all"
              >
                Got It! Ready to Try
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
