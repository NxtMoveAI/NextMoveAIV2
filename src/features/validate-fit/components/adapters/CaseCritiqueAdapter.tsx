/**
 * NEXT MOVE AI V2 — CASE CRITIQUE ADAPTER
 * 
 * Interactive adapter for qualitative policy analysis, industry briefs,
 * stakeholder balancing, and research critiques.
 */

"use client";

import React, { useState } from "react";
import { Users, HelpCircle, CheckSquare } from "lucide-react";
import { type CaseCritiqueContent } from "../../types";

interface CaseCritiqueAdapterProps {
  content: CaseCritiqueContent;
  onSaveAnalysis: (analysisText: string) => void;
  initialAnalysisText?: string;
}

export function CaseCritiqueAdapter({
  content,
  onSaveAnalysis,
  initialAnalysisText = "",
}: CaseCritiqueAdapterProps) {
  const [analysisText, setAnalysisText] = useState(initialAnalysisText);

  function handleTextChange(text: string) {
    setAnalysisText(text);
    onSaveAnalysis(text);
  }

  return (
    <div className="space-y-6">
      {/* Context Executive Brief */}
      <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#F0EEF8] space-y-2 text-xs">
        <span className="font-bold text-[#6757F5] uppercase tracking-wider text-[10px] block">
          Executive Briefing
        </span>
        <p className="text-[#171A2B] font-bold leading-relaxed">{content.briefText}</p>
        <p className="text-[#626987] leading-relaxed">{content.contextSummary}</p>
      </div>

      {/* Stakeholders & Constraints */}
      {content.stakeholders.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#171A2B] flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#6757F5]" />
            <span>Key Stakeholders & Competing Priorities</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {content.stakeholders.map((s, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-white border border-[#E8E6F3] text-xs text-[#31364F] space-y-1 shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#6757F5] block" />
                <p className="leading-snug text-[11px]">{s}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guiding Questions */}
      <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] space-y-2 text-xs">
        <h3 className="font-bold text-[#6757F5] flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4" />
          <span>Core Analytical Questions</span>
        </h3>
        <ul className="space-y-1.5 list-disc list-inside text-[#31364F]">
          {content.keyQuestions.map((q, idx) => (
            <li key={idx} className="leading-relaxed">{q}</li>
          ))}
        </ul>
      </div>

      {/* Student Memorandum / Case Response */}
      <div className="space-y-2">
        <label
          htmlFor="case-analysis-text"
          className="text-xs font-black uppercase tracking-wider text-[#171A2B] block"
        >
          Your Structured Case Analysis & Recommendation
        </label>
        <textarea
          id="case-analysis-text"
          rows={5}
          value={analysisText}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Draft your analysis (e.g. '1. Root cause: The 5% monthly churn stems from poor initial onboarding... 2. Proposed policy: Switch to annual contracts with...')"
          className="w-full p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] text-xs text-[#171A2B] placeholder:text-[#8C93AD] focus:outline-none focus:ring-2 focus:ring-[#6757F5] transition-all resize-y"
        />
      </div>

      {/* Analytical Rubric Guidance */}
      <div className="space-y-2">
        <h3 className="text-xs font-black uppercase tracking-wider text-[#626987] flex items-center gap-1.5">
          <CheckSquare className="w-3.5 h-3.5 text-[#059669]" />
          <span>Qualitative Evaluation Rubric</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {content.guidingRubric.map((r, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-white border border-[#E8E6F3] space-y-0.5">
              <span className="font-bold text-[#171A2B] text-[11px] block">{r.criterion}</span>
              <p className="text-[10px] text-[#626987] leading-snug">{r.considerations}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
