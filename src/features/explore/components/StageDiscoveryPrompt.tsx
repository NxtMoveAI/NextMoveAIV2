/**
 * NEXT MOVE AI V2 — STAGE DISCOVERY PROMPT
 * 
 * Contextual discovery prompt tailored to the student's active academic stage.
 * Provides encouraging, grounded guidance without pressure.
 */

"use client";

import React from "react";
import { Sparkles, Lightbulb, Compass, Award, Briefcase, GraduationCap } from "lucide-react";
import { type AcademicStageId } from "@/data/landing-demo";

interface StageDiscoveryPromptProps {
  stageId?: AcademicStageId;
}

export function StageDiscoveryPrompt({ stageId }: StageDiscoveryPromptProps) {
  const content = getStagePromptContent(stageId);

  return (
    <div
      aria-label="Discovery Guidance Prompt"
      className="p-4 sm:p-5 rounded-3xl bg-[#F7F6FF] border border-[#DDD8FE] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-white border border-[#DDD8FE] text-[#6757F5] flex items-center justify-center shrink-0 mt-0.5">
          {content.icon}
        </div>
        <div className="space-y-0.5">
          <span className="font-bold text-[#6757F5] block text-[11px] uppercase tracking-wider">
            {content.tagline}
          </span>
          <p className="text-[#31364F] leading-relaxed max-w-2xl font-medium">
            {content.message}
          </p>
        </div>
      </div>

      <div className="shrink-0 text-[11px] font-bold text-[#6757F5] bg-white px-3 py-1 rounded-full border border-[#DDD8FE] self-end sm:self-center">
        {content.stageBadge}
      </div>
    </div>
  );
}

function getStagePromptContent(stageId?: AcademicStageId): {
  icon: React.ReactNode;
  tagline: string;
  message: string;
  stageBadge: string;
} {
  switch (stageId) {
    case "classes-4-7":
      return {
        icon: <Sparkles className="w-4 h-4 text-[#6757F5]" />,
        tagline: "Exploration Without Career Locks",
        message:
          "In middle school, you don't need to choose an adult career! Try drawing stories, observing garden ecosystems, or making cardboard machines to discover what you enjoy building.",
        stageBadge: "Classes 4–7 Theme",
      };
    case "classes-8-10":
      return {
        icon: <Compass className="w-4 h-4 text-[#0284C7]" />,
        tagline: "Stream & Subject Curiosity",
        message:
          "Notice which school subjects make you lose track of time. Use these pathways to understand what high school Science, Commerce, and Arts look like in practice.",
        stageBadge: "Classes 8–10 Foundation",
      };
    case "classes-11-12":
      return {
        icon: <GraduationCap className="w-4 h-4 text-[#6757F5]" />,
        tagline: "Higher Education & Degree Reality",
        message:
          "Entrance exams are only one doorway. Discover multidisciplinary degrees, design institutes, economics programs, and emerging fields that fit your learning style.",
        stageBadge: "Classes 11–12 Horizon",
      };
    case "diploma":
      return {
        icon: <Award className="w-4 h-4 text-[#D97706]" />,
        tagline: "Practical Advantage & Lateral Transitions",
        message:
          "Your hands-on workshop experience is a genuine strength. Compare lateral entry B.Tech routes with immediate industrial automation and systems administration tracks.",
        stageBadge: "Diploma Practical",
      };
    case "degree-engineering":
      return {
        icon: <Briefcase className="w-4 h-4 text-[#059669]" />,
        tagline: "Projects & Real-World Capability",
        message:
          "Degrees don't guarantee jobs; verifiable projects and open-source contributions do. Test your fit with our micro-trials before committing to competitive campus sprints.",
        stageBadge: "Undergraduate Track",
      };
    case "final-year-grad":
      return {
        icon: <Lightbulb className="w-4 h-4 text-[#9333EA]" />,
        tagline: "Grounded Career Next Steps",
        message:
          "Evaluate early corporate engineering, public policy fellowships, and customer-funded bootstrapped ventures with transparent day-to-day realities.",
        stageBadge: "Graduate Transition",
      };
    default:
      return {
        icon: <Compass className="w-4 h-4 text-[#6757F5]" />,
        tagline: "Discovery Workspace",
        message:
          "Browse educational avenues, degree structures, and career realities. Bookmark possibilities that interest you and compare trade-offs side by side.",
        stageBadge: "All Stages",
      };
  }
}

