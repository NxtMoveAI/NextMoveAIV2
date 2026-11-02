/**
 * NEXT MOVE AI V2 — SCENARIO TRADEOFF ADAPTER
 * 
 * Interactive adapter for multi-factor decision dilemmas.
 * Used for commerce break-even, product management, and systems engineering tradeoffs.
 */

"use client";

import React, { useState } from "react";
import { CheckCircle2, Scale, ShieldAlert, Sparkles } from "lucide-react";
import { type ScenarioTradeoffContent } from "../../types";

interface ScenarioTradeoffAdapterProps {
  content: ScenarioTradeoffContent;
  onSelectOption: (optionId: string) => void;
  onSaveReasoning: (reasoningText: string) => void;
  initialSelectedId?: string;
  initialReasoning?: string;
}

export function ScenarioTradeoffAdapter({
  content,
  onSelectOption,
  onSaveReasoning,
  initialSelectedId,
  initialReasoning = "",
}: ScenarioTradeoffAdapterProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>(initialSelectedId);
  const [reasoning, setReasoning] = useState(initialReasoning);

  function handlePick(id: string) {
    setSelectedId(id);
    onSelectOption(id);
  }

  function handleReasoningChange(text: string) {
    setReasoning(text);
    onSaveReasoning(text);
  }

  return (
    <div className="space-y-6">
      {/* Context Situation */}
      <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#F0EEF8] space-y-2 text-xs">
        <span className="font-bold text-[#6757F5] uppercase tracking-wider text-[10px] block">
          Operating Situation
        </span>
        <p className="text-[#171A2B] font-semibold leading-relaxed">{content.situation}</p>
        <p className="text-[#626987] leading-relaxed">{content.contextSummary}</p>
      </div>

      {/* Decision Options with Tradeoff Comparison */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-[#171A2B] flex items-center gap-1.5">
          <Scale className="w-4 h-4 text-[#6757F5]" />
          <span>Evaluate Strategic Options</span>
        </h3>

        <div className="space-y-3">
          {content.options.map((opt) => {
            const isSelected = selectedId === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => handlePick(opt.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#F7F6FF] border-[#6757F5] shadow-xs ring-1 ring-[#6757F5]"
                    : "bg-white border-[#E8E6F3] hover:border-[#6757F5]/50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-[#171A2B]">{opt.label}</h4>
                    <p className="text-xs text-[#474D66] leading-relaxed">{opt.description}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? "bg-[#6757F5] border-[#6757F5] text-white"
                        : "border-[#8C93AD] bg-white"
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* Tradeoffs Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#F0EEF8] text-[11px]">
                  <div className="p-2 rounded-xl bg-[#ECFDF5] text-[#065F46] space-y-0.5">
                    <span className="font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#059669]" />
                      <span>Benefits Gained:</span>
                    </span>
                    <p className="leading-snug">{opt.tradeoffsGained}</p>
                  </div>

                  <div className="p-2 rounded-xl bg-[#FFFBEB] text-[#92400E] space-y-0.5">
                    <span className="font-bold flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 text-[#D97706]" />
                      <span>Tradeoffs Sacrificed:</span>
                    </span>
                    <p className="leading-snug">{opt.tradeoffsSacrificed}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Discussion Reasoning */}
      <div className="space-y-2">
        <label
          htmlFor="tradeoff-reasoning"
          className="text-xs font-black uppercase tracking-wider text-[#171A2B] block"
        >
          {content.discussionPrompt || "Why did you choose this option over the others?"}
        </label>
        <textarea
          id="tradeoff-reasoning"
          rows={3}
          value={reasoning}
          onChange={(e) => handleReasoningChange(e.target.value)}
          placeholder="Explain your trade-off calculation (e.g. 'I chose Option A because mitigating customer support friction protects long-term retention...')"
          className="w-full p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] text-xs text-[#171A2B] placeholder:text-[#8C93AD] focus:outline-none focus:ring-2 focus:ring-[#6757F5] transition-all resize-y"
        />
      </div>
    </div>
  );
}
