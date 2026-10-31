/**
 * NEXT MOVE AI V2 — STAGE E: MY STARTING POINT
 * 
 * Collects self-reported familiarity while rigorously preserving the evidence taxonomy.
 * Explicitly distinguishes self-report from verified proof.
 */

"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Layers, HelpCircle } from "lucide-react";
import { type AcademicStageId } from "@/data/landing-demo";
import { type SkillItem, type FamiliarityLevel } from "../schemas/types";
import { EvidenceStatusCard } from "./EvidenceStatusCard";

interface StartingPointStepProps {
  stageId: AcademicStageId;
  skills: SkillItem[];
  onUpdateSkill: (skillId: string, level: FamiliarityLevel) => void;
  onNext: () => void;
  onBack: () => void;
}

const FAMILIARITY_CHOICES: {
  level: FamiliarityLevel;
  label: string;
  badge: string;
}[] = [
  { level: "not_explored", label: "Haven't explored it yet", badge: "Not Assessed" },
  { level: "heard_about", label: "I've heard about it", badge: "Aware" },
  { level: "tried_it", label: "I've tried it once or twice", badge: "Tried" },
  { level: "practised", label: "I've practised it in coursework/labs", badge: "Practised" },
  { level: "created_something", label: "I've created a real project with it", badge: "Created" },
];

export function StartingPointStep({
  skills,
  onUpdateSkill,
  onNext,
  onBack,
}: StartingPointStepProps) {
  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-8 sm:py-10 flex flex-col justify-center">
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#DDD8FE] shadow-xl text-center space-y-6">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider border border-[#DDD8FE]">
          <Layers className="w-3.5 h-3.5" />
          <span>Stage E • My Starting Point</span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#171A2B] tracking-tight">
            What have you already tried or explored?
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#626987] max-w-xl mx-auto">
            Honest answers help us tailor starting recommendations. Anything you skip is simply marked as &ldquo;Not assessed yet&rdquo; — never as a weak skill.
          </p>
        </div>

        {/* Evidence Notice Banner */}
        <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#DDD8FE] text-left flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-[#6757F5] shrink-0 mt-0.5" />
          <p className="text-xs text-[#474D66] leading-relaxed">
            <strong>Evidence Integrity Principle:</strong> Next Move AI preserves a strict boundary between <em>self-reported familiarity</em> and <em>demonstrated work</em>. We never convert self-ratings into fake psychometric or general aptitude scores.
          </p>
        </div>

        {/* Skills List */}
        <div className="space-y-4 text-left">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E6F3] hover:border-[#DDD8FE] transition-colors space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6757F5] block">
                    {skill.category}
                  </span>
                  <h3 className="text-sm font-black text-[#171A2B]">
                    {skill.name}
                  </h3>
                </div>

                <EvidenceStatusCard status={skill.evidenceStatus} />
              </div>

              {/* Familiarity Radio Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
                {FAMILIARITY_CHOICES.map((choice) => {
                  const isSelected = skill.familiarity === choice.level;
                  return (
                    <button
                      key={choice.level}
                      type="button"
                      onClick={() => onUpdateSkill(skill.id, choice.level)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-[#6757F5] text-white border-[#6757F5] font-bold shadow-xs"
                          : "bg-[#FAF9F6] text-[#31364F] border-[#E8E6F3] hover:bg-white hover:border-[#DDD8FE]"
                      }`}
                    >
                      <span className="leading-tight">{choice.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="pt-4 border-t border-[#E8E6F3] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E8E6F3] text-xs font-bold text-[#626987] hover:bg-[#FAF9F6] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold shadow-md shadow-[#6757F5]/20 transition-all"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
