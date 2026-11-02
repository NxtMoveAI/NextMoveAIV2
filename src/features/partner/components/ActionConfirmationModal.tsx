/**
 * NEXT MOVE AI V2 — FLOW 8: ACTION CONFIRMATION MODAL
 * 
 * Safety guard preventing silent state alterations.
 * Requires explicit student review and consent before mutating roadmaps,
 * adding milestones, or saving new pathways.
 */

"use client";

import React from "react";
import { AlertTriangle, CheckCircle2, X, PlusCircle } from "lucide-react";
import { type PartnerActionSuggestion } from "../types";

interface ActionConfirmationModalProps {
  action: PartnerActionSuggestion | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ActionConfirmationModal({
  action,
  onConfirm,
  onCancel,
}: ActionConfirmationModalProps) {
  if (!action) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-modal-title"
      data-testid="action-confirmation-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full border border-[#E2E8F0] shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center text-[#6757F5]">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="confirmation-modal-title"
                className="text-lg font-bold text-[#171A2B]"
              >
                Confirm Proposed Action
              </h2>
              <p className="text-xs text-[#64748B]">
                Review the changes My Partner wants to add to your plan
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            data-testid="action-modal-close-btn"
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close confirmation dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 mb-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#6757F5] mb-1">
            {action.type === "add_roadmap_milestone"
              ? "New Roadmap Milestone"
              : "State Modification"}
          </div>
          <div className="text-base font-bold text-[#171A2B] mb-1">
            {action.payload?.milestoneTitle || action.title}
          </div>
          <p className="text-xs text-[#475569] leading-relaxed mb-3">
            {action.description}
          </p>

          {action.payload?.milestoneEstimatedHours && (
            <div className="flex items-center gap-2 text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
              <span className="font-semibold text-[#171A2B]">Time commitment:</span>
              <span>~{action.payload.milestoneEstimatedHours} hours</span>
            </div>
          )}
        </div>

        {/* Ethical Transparency Note */}
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-xs mb-6">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong>Student Sovereignty Guarantee:</strong> Next Move AI will never alter your goals or active roadmap without your explicit consent. You can edit, reschedule, or remove this milestone anytime in <em>Build My Next Move</em>.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            data-testid="action-cancel-btn"
            className="px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-sm font-semibold text-[#475569] hover:bg-gray-50 transition-colors"
          >
            Cancel / Keep As Is
          </button>
          <button
            type="button"
            onClick={onConfirm}
            data-testid="action-confirm-btn"
            className="px-5 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5546E0] text-sm font-semibold text-white shadow-sm flex items-center gap-2 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirm & Add to Roadmap</span>
          </button>
        </div>
      </div>
    </div>
  );
}
