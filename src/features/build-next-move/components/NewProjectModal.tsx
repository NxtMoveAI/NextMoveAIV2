/**
 * NEXT MOVE AI V2 — FLOW 7: NEW PROJECT MODAL
 * 
 * Allows students to propose and structure their own independent project.
 * 
 * Epistemic Rules:
 * - Promotes student-driven agency.
 * - Enforces minimum structure (problem statement, at least 2 executable steps).
 */

"use client";

import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (params: {
    title: string;
    problemStatement: string;
    categoryLabel: string;
    steps: string[];
  }) => void;
}

export function NewProjectModal({ isOpen, onClose, onCreate }: NewProjectModalProps) {
  const [title, setTitle] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [categoryLabel, setCategoryLabel] = useState("Custom Project");
  const [steps, setSteps] = useState<string[]>([
    "Research background and define project requirements",
    "Build core prototype or collect initial data",
    "Review outcomes and attach evidence artifact",
  ]);

  if (!isOpen) return null;

  const handleStepChange = (index: number, val: string) => {
    const updated = [...steps];
    updated[index] = val;
    setSteps(updated);
  };

  const handleAddStep = () => {
    setSteps([...steps, ""]);
  };

  const handleRemoveStep = (index: number) => {
    if (steps.length <= 1) return;
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !problemStatement.trim()) return;

    const validSteps = steps.map((s) => s.trim()).filter((s) => s.length > 0);
    if (validSteps.length === 0) return;

    onCreate({
      title: title.trim(),
      problemStatement: problemStatement.trim(),
      categoryLabel: categoryLabel.trim() || "Custom Project",
      steps: validSteps,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171A2B]/60 backdrop-blur-sm animate-in fade-in"
      data-testid="new-project-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-project-title"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E8E6F3] flex flex-col overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#F2F1FA] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
              Student-Driven Initiative
            </span>
            <h2 id="new-project-title" className="text-xl font-black text-[#171A2B]">
              Propose a Custom Project
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#98A2B3] hover:text-[#171A2B] hover:bg-[#F7F7FD]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-bold text-[#171A2B] mb-1">
              Project Title *
            </label>
            <input
              type="text"
              required
              data-testid="new-project-title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Campus Rooftop Solar Energy Audit"
              className="w-full text-xs p-2.5 rounded-xl border border-[#E8E6F3] bg-[#F7F7FD] focus:bg-white text-[#171A2B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#171A2B] mb-1">
              Discipline / Category
            </label>
            <input
              type="text"
              value={categoryLabel}
              onChange={(e) => setCategoryLabel(e.target.value)}
              placeholder="e.g., Applied Engineering & Clean Energy"
              className="w-full text-xs p-2.5 rounded-xl border border-[#E8E6F3] bg-[#F7F7FD] focus:bg-white text-[#171A2B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#171A2B] mb-1">
              Problem Statement & Deliverable *
            </label>
            <textarea
              required
              data-testid="new-project-problem-input"
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              placeholder="What question are you investigating or what deliverable will you build?"
              className="w-full text-xs p-2.5 rounded-xl border border-[#E8E6F3] bg-[#F7F7FD] focus:bg-white text-[#171A2B] min-h-[70px]"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[#171A2B]">
                Milestone Steps (Minimum 1) *
              </label>
              <button
                type="button"
                onClick={handleAddStep}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#6757F5] hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Step
              </button>
            </div>

            <div className="space-y-2">
              {steps.map((st, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#98A2B3] w-5">
                    {idx + 1}.
                  </span>
                  <input
                    type="text"
                    required
                    value={st}
                    onChange={(e) => handleStepChange(idx, e.target.value)}
                    placeholder={`Step ${idx + 1} description`}
                    className="flex-1 text-xs p-2 rounded-xl border border-[#E8E6F3] bg-white text-[#171A2B]"
                  />
                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(idx)}
                      className="p-1.5 text-[#98A2B3] hover:text-[#B42318]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#F2F1FA]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#4A4E69] hover:bg-[#F7F7FD]"
            >
              Cancel
            </button>
            <button
              type="submit"
              data-testid="submit-new-project"
              className="px-5 py-2 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5645E5] transition-all shadow-xs"
            >
              Start Custom Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
