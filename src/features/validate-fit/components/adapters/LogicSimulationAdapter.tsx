/**
 * NEXT MOVE AI V2 — LOGIC SIMULATION ADAPTER
 * 
 * Interactive adapter for code bug investigations, test case verification,
 * and algorithmic reasoning. Used for Python debugging and Big-O efficiency stress tests.
 */

"use client";

import React, { useState } from "react";
import { Terminal, CheckCircle2, XCircle, Code2, Play } from "lucide-react";
import { type LogicSimulationContent } from "../../types";

interface LogicSimulationAdapterProps {
  content: LogicSimulationContent;
  onSelectFix: (fixId: string) => void;
  onSaveWorkNotes: (notes: string) => void;
  initialFixId?: string;
  initialNotes?: string;
}

export function LogicSimulationAdapter({
  content,
  onSelectFix,
  onSaveWorkNotes,
  initialFixId,
  initialNotes = "",
}: LogicSimulationAdapterProps) {
  const [selectedFixId, setSelectedFixId] = useState<string | undefined>(initialFixId);
  const [workNotes, setWorkNotes] = useState(initialNotes);

  function handlePick(id: string) {
    setSelectedFixId(id);
    onSelectFix(id);
  }

  function handleNotesChange(text: string) {
    setWorkNotes(text);
    onSaveWorkNotes(text);
  }

  return (
    <div className="space-y-6">
      {/* Context Summary */}
      <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#F0EEF8] text-xs text-[#474D66] leading-relaxed">
        <p>{content.contextSummary}</p>
      </div>

      {/* Code Inspector Block */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#626987]">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#6757F5]" />
            <span>Code / Algorithm Inspector</span>
          </span>
          <span className="text-[10px] uppercase font-bold text-[#D97706] bg-[#FFFBEB] px-2 py-0.5 rounded-full border border-[#FDE68A]">
            Bug Analysis
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#171A2B] text-white font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
          <pre>{content.initialCodeOrState}</pre>
        </div>
        <p className="text-xs text-[#DC2626] font-medium pt-1">
          Observed Issue: {content.problemDescription}
        </p>
      </div>

      {/* Test Cases */}
      {content.testCases.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#171A2B] flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 text-[#059669]" />
            <span>Failing Test Case Assertion</span>
          </h3>
          <div className="space-y-2">
            {content.testCases.map((tc, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white border border-[#E8E6F3] space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[#6757F5] font-bold">Input: {tc.input}</span>
                  <span className="font-mono text-[#059669] font-bold">Expected: {tc.expectedOutput}</span>
                </div>
                <p className="text-[11px] text-[#626987]">{tc.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fix Approaches */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-[#171A2B] flex items-center gap-1.5">
          <Code2 className="w-4 h-4 text-[#6757F5]" />
          <span>Select the Correct Algorithmic Solution</span>
        </h3>

        <div className="space-y-3">
          {content.fixOptions.map((fix) => {
            const isSelected = selectedFixId === fix.id;
            return (
              <div
                key={fix.id}
                onClick={() => handlePick(fix.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#F7F6FF] border-[#6757F5] shadow-xs ring-1 ring-[#6757F5]"
                    : "bg-white border-[#E8E6F3] hover:border-[#6757F5]/50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-[#171A2B]">{fix.label}</h4>
                    <div className="p-2.5 rounded-xl bg-[#FAF9F6] font-mono text-[11px] text-[#31364F] overflow-x-auto border border-[#E8E6F3] mt-2">
                      <pre>{fix.codeChange}</pre>
                    </div>
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

                {isSelected && (
                  <div
                    className={`mt-3 p-3 rounded-xl text-xs flex items-start gap-2 ${
                      fix.isCorrectApproach
                        ? "bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]"
                        : "bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]"
                    }`}
                  >
                    {fix.isCorrectApproach ? (
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-0.5">
                      <strong className="block">
                        {fix.isCorrectApproach ? "Optimal Solution Found" : "Sub-optimal or Buggy"}
                      </strong>
                      <p className="text-[11px] leading-relaxed">{fix.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Debugging Reflection Notes */}
      <div className="space-y-2">
        <label
          htmlFor="logic-work-notes"
          className="text-xs font-black uppercase tracking-wider text-[#171A2B] block"
        >
          Your Debugging Process Notes (Optional)
        </label>
        <textarea
          id="logic-work-notes"
          rows={3}
          value={workNotes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Note how you spotted the boundary issue or how Big-O scaling affects runtime..."
          className="w-full p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] text-xs text-[#171A2B] placeholder:text-[#8C93AD] focus:outline-none focus:ring-2 focus:ring-[#6757F5] transition-all resize-y"
        />
      </div>
    </div>
  );
}
