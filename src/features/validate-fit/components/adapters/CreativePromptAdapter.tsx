/**
 * NEXT MOVE AI V2 — CREATIVE PROMPT ADAPTER
 * 
 * Interactive adapter for open-ended creative, drawing, making, and storytelling challenges.
 * Used for Classes 4–7 curiosity themes and design mini-projects.
 */

"use client";

import React, { useState } from "react";
import { CheckSquare, Square, PenTool, Sparkles, Lightbulb } from "lucide-react";
import { type CreativePromptContent } from "../../types";

interface CreativePromptAdapterProps {
  content: CreativePromptContent;
  onSaveProgress: (workText: string) => void;
  initialWorkText?: string;
}

export function CreativePromptAdapter({
  content,
  onSaveProgress,
  initialWorkText = "",
}: CreativePromptAdapterProps) {
  const [workNotes, setWorkNotes] = useState(initialWorkText);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  function toggleCheck(idx: number) {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function handleNotesChange(text: string) {
    setWorkNotes(text);
    onSaveProgress(text);
  }

  return (
    <div className="space-y-6">
      {/* Context banner */}
      <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#F0EEF8] text-xs text-[#474D66] leading-relaxed">
        <p>{content.contextSummary}</p>
      </div>

      {/* Suggested Materials */}
      {content.materialsSuggested.length > 0 && (
        <div className="p-4 rounded-2xl bg-white border border-[#E8E6F3] space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#6757F5] flex items-center gap-1.5">
            <PenTool className="w-3.5 h-3.5" />
            <span>Suggested Materials & Tools</span>
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {content.materialsSuggested.map((mat, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-xl bg-[#F4F3F8] text-[#171A2B] text-xs font-semibold"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Step by Step Prompt Instructions */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-[#171A2B] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#6757F5]" />
          <span>Step-by-Step Creative Steps</span>
        </h3>
        <div className="space-y-2">
          {content.promptSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white border border-[#E8E6F3] flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-full bg-[#EDEAFF] text-[#6757F5] font-black text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <p className="text-xs text-[#31364F] leading-relaxed pt-0.5">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Student Work Notes Area */}
      <div className="space-y-2">
        <label
          htmlFor="creative-work-notes"
          className="text-xs font-black uppercase tracking-wider text-[#171A2B] block"
        >
          Your Story Description or Reflection Notes
        </label>
        <textarea
          id="creative-work-notes"
          rows={4}
          value={workNotes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Describe your creation here (e.g. 'In Panel 1, Sparky hears thunder. In Panel 2, he opens his metal hatch...')"
          className="w-full p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] text-xs text-[#171A2B] placeholder:text-[#8C93AD] focus:outline-none focus:ring-2 focus:ring-[#6757F5] transition-all resize-y"
        />
      </div>

      {/* Self-Checklist Rubric */}
      {content.rubricChecklist.length > 0 && (
        <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] space-y-3">
          <h3 className="text-xs font-bold text-[#6757F5] flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Self-Reflection Checklist</span>
          </h3>
          <div className="space-y-2">
            {content.rubricChecklist.map((check, idx) => {
              const isChecked = checkedItems.has(idx);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleCheck(idx)}
                  className="w-full text-left p-2.5 rounded-xl bg-white border border-[#DDD8FE] flex items-center gap-2.5 transition-colors hover:bg-[#FAF9F6] text-xs"
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-[#059669] shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-[#8C93AD] shrink-0" />
                  )}
                  <span className={isChecked ? "text-[#059669] font-medium" : "text-[#474D66]"}>
                    {check}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
