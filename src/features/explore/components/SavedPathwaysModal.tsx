/**
 * NEXT MOVE AI V2 — SAVED PATHWAYS DRAWER / MODAL
 * 
 * Shows student's bookmarked pathways for reflection and comparison.
 */

"use client";

import React, { useEffect } from "react";
import { X, Bookmark, ArrowRight, Trash2 } from "lucide-react";
import { type Pathway } from "../types";

interface SavedPathwaysModalProps {
  isOpen: boolean;
  savedPathways: Pathway[];
  onClose: () => void;
  onRemove: (pathwayId: string) => void;
  onOpenDetail: (pathway: Pathway) => void;
}

export function SavedPathwaysModal({
  isOpen,
  savedPathways,
  onClose,
  onRemove,
  onOpenDetail,
}: SavedPathwaysModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-[#E8E6F3] flex flex-col overflow-hidden outline-none">
        {/* Sticky Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#E8E6F3] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-[#6757F5]" />
            </div>
            <div>
              <h1
                id="saved-modal-title"
                className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight"
              >
                Saved Exploration List
              </h1>
              <p className="text-xs text-[#626987]">
                {savedPathways.length} bookmarked possibilit{savedPathways.length === 1 ? "y" : "ies"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close saved pathways"
            className="p-2 rounded-xl text-[#8C93AD] hover:text-[#171A2B] hover:bg-[#F4F3F8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-3">
          {savedPathways.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F3F8] text-[#8C93AD] flex items-center justify-center mx-auto">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-[#171A2B]">No saved pathways yet</p>
              <p className="text-xs text-[#626987] max-w-xs mx-auto">
                Bookmark pathways that catch your curiosity so you can revisit them, conduct micro-trials, and compare trade-offs.
              </p>
            </div>
          ) : (
            savedPathways.map((pathway) => (
              <div
                key={pathway.id}
                className="p-4 rounded-2xl bg-white border border-[#E8E6F3] hover:border-[#DDD8FE] shadow-2xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#6757F5] bg-[#EDEAFF] px-2 py-0.5 rounded-full">
                      {pathway.categoryLabel}
                    </span>
                    <span className="text-[10px] text-[#8C93AD]">
                      {pathway.type.replace("_", " ")}
                    </span>
                  </div>
                  <h2 className="text-sm font-bold text-[#171A2B] group-hover:text-[#6757F5] transition-colors">
                    {pathway.title}
                  </h2>
                  <p className="text-xs text-[#474D66] line-clamp-1">
                    {pathway.headlineSummary}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      onOpenDetail(pathway);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRemove(pathway.id)}
                    aria-label={`Remove ${pathway.title} from saved`}
                    className="p-1.5 rounded-xl text-[#8C93AD] hover:text-[#DC2626] hover:bg-[#FEE2E2] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF9F6] border-t border-[#E8E6F3] flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#171A2B] hover:bg-[#31364F] text-white text-xs font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

