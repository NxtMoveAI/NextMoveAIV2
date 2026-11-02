/**
 * NEXT MOVE AI V2 — FLOW 6: INTERACTIVE TRIAL RUNNER MODAL
 * 
 * Master execution shell for experiential learning trials.
 * Features:
 * - Scenario background & learning objective
 * - Progressive disclosure of optional hints
 * - Dynamic dispatch to typed interactive adapters
 * - Save progress, non-punitive skip, and reflection transition
 */

"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, Save, ArrowRight, Ban, Lightbulb } from "lucide-react";
import { type TrialActivity } from "../types";
import { CreativePromptAdapter } from "./adapters/CreativePromptAdapter";
import { ScenarioTradeoffAdapter } from "./adapters/ScenarioTradeoffAdapter";
import { LogicSimulationAdapter } from "./adapters/LogicSimulationAdapter";
import { AppliedTroubleshootAdapter } from "./adapters/AppliedTroubleshootAdapter";
import { CaseCritiqueAdapter } from "./adapters/CaseCritiqueAdapter";

interface TrialRunnerModalProps {
  trial: TrialActivity;
  onClose: () => void;
  onFinishContent: (trial: TrialActivity) => void;
  onSkip: (trial: TrialActivity) => void;
  onSaveProgress: (trialId: string, updates: { selectedOptionIds?: string[]; submittedWorkText?: string }) => void;
}

export function TrialRunnerModal({
  trial,
  onClose,
  onFinishContent,
  onSkip,
  onSaveProgress,
}: TrialRunnerModalProps) {
  const [showHints, setShowHints] = useState(false);
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [workNotes, setWorkNotes] = useState<string>("");
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  function handleSave() {
    onSaveProgress(trial.id, {
      selectedOptionIds,
      submittedWorkText: workNotes,
    });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  }

  function handleAdapterOptionSelect(id: string) {
    setSelectedOptionIds([id]);
    onSaveProgress(trial.id, { selectedOptionIds: [id], submittedWorkText: workNotes });
  }

  function handleAdapterTextSave(text: string) {
    setWorkNotes(text);
    onSaveProgress(trial.id, { selectedOptionIds, submittedWorkText: text });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trial-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-[#E8E6F3] flex flex-col overflow-hidden outline-none">
        {/* Sticky Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E8E6F3] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5] bg-[#EDEAFF] px-2 py-0.5 rounded-full">
                  {trial.categoryLabel}
                </span>
                <span className="text-[10px] font-semibold text-[#626987]">
                  Suggested: ~{trial.suggestedMinutes} mins (No deadline)
                </span>
              </div>
              <h1
                id="trial-modal-title"
                className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight mt-0.5"
              >
                {trial.title}
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close trial"
            className="p-2 rounded-xl text-[#8C93AD] hover:text-[#171A2B] hover:bg-[#F4F3F8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-7 space-y-6 overflow-y-auto">
          {/* Scenario & Objective Banner */}
          <div className="p-4 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] space-y-2 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-[#6757F5] uppercase tracking-wider text-[10px] block">
                Learning Objective
              </span>
              <p className="text-[#171A2B] font-semibold leading-relaxed">
                {trial.learningObjective}
              </p>
            </div>
            <p className="text-[#474D66] leading-relaxed pt-1 border-t border-[#DDD8FE]/60">
              {trial.scenarioBackground}
            </p>
          </div>

          {/* Instructions List */}
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#171A2B]">
              Instructions
            </h2>
            <div className="space-y-1.5">
              {trial.instructions.map((inst, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#31364F]">
                  <span className="w-4 h-4 rounded-full bg-[#EDEAFF] text-[#6757F5] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{inst}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Optional Progressive Disclosure Hints */}
          {trial.optionalHints.length > 0 && (
            <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3.5 space-y-2">
              <button
                type="button"
                onClick={() => setShowHints((prev) => !prev)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#92400E] focus:outline-none"
              >
                <span className="flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-[#D97706]" />
                  <span>Optional Guidance Hints ({trial.optionalHints.length})</span>
                </span>
                <span className="text-[11px] underline">
                  {showHints ? "Hide hints" : "Show hints"}
                </span>
              </button>

              {showHints && (
                <div className="pt-2 border-t border-[#FDE68A] space-y-1.5 text-xs text-[#B45309]">
                  {trial.optionalHints.map((hint, idx) => (
                    <p key={idx} className="leading-relaxed">
                      💡 {hint}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Dynamic Adapter Dispatch */}
          <div className="pt-2 border-t border-[#F0EEF8]">
            {trial.content.format === "creative_prompt" && (
              <CreativePromptAdapter
                content={trial.content.payload}
                onSaveProgress={handleAdapterTextSave}
                initialWorkText={workNotes}
              />
            )}
            {trial.content.format === "scenario_tradeoff" && (
              <ScenarioTradeoffAdapter
                content={trial.content.payload}
                onSelectOption={handleAdapterOptionSelect}
                onSaveReasoning={handleAdapterTextSave}
                initialSelectedId={selectedOptionIds[0]}
                initialReasoning={workNotes}
              />
            )}
            {trial.content.format === "logic_simulation" && (
              <LogicSimulationAdapter
                content={trial.content.payload}
                onSelectFix={handleAdapterOptionSelect}
                onSaveWorkNotes={handleAdapterTextSave}
                initialFixId={selectedOptionIds[0]}
                initialNotes={workNotes}
              />
            )}
            {trial.content.format === "applied_troubleshoot" && (
              <AppliedTroubleshootAdapter
                content={trial.content.payload}
                onSelectFault={handleAdapterOptionSelect}
                onSaveDiagnosticsNotes={handleAdapterTextSave}
                initialFaultId={selectedOptionIds[0]}
                initialNotes={workNotes}
              />
            )}
            {trial.content.format === "case_critique" && (
              <CaseCritiqueAdapter
                content={trial.content.payload}
                onSaveAnalysis={handleAdapterTextSave}
                initialAnalysisText={workNotes}
              />
            )}
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 bg-[#FAF9F6] border-t border-[#E8E6F3] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#626987] hover:text-[#171A2B] hover:bg-[#F4F3F8] transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Progress</span>
            </button>

            <button
              type="button"
              onClick={() => onSkip(trial)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#8C93AD] hover:text-[#DC2626] hover:bg-[#FEE2E2] transition-colors"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Skip without Penalty</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {saveToast && (
              <span className="text-xs text-[#059669] font-bold animate-in fade-in">
                Progress saved!
              </span>
            )}
            <button
              type="button"
              onClick={() => onFinishContent(trial)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold shadow-sm transition-all"
            >
              <span>Reflect on this Experience</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
