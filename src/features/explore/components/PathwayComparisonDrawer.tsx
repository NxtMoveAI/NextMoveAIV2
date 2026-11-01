/**
 * NEXT MOVE AI V2 — PATHWAY COMPARISON DRAWER / MODAL
 * 
 * Side-by-side comparative matrix for 2 to 3 pathways.
 * Allows students to objectively weigh:
 * - Educational duration & routes
 * - Daily work style & environment
 * - Subject foundations & prerequisites
 * - Pre-commitment micro-trials
 * - Critical unknown questions
 */

"use client";

import React, { useEffect } from "react";
import { X, Trash2, ArrowRight } from "lucide-react";
import { type Pathway } from "../types";

interface PathwayComparisonDrawerProps {
  isOpen: boolean;
  pathways: Pathway[];
  onClose: () => void;
  onRemove: (pathwayId: string) => void;
  onClearAll: () => void;
  onOpenDetail: (pathway: Pathway) => void;
}

export function PathwayComparisonDrawer({
  isOpen,
  pathways,
  onClose,
  onRemove,
  onClearAll,
  onOpenDetail,
}: PathwayComparisonDrawerProps) {
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
      aria-labelledby="comparison-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-[#E8E6F3] flex flex-col overflow-hidden outline-none">
        {/* Sticky Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#E8E6F3] flex items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#6757F5] bg-[#EDEAFF] px-2.5 py-0.5 rounded-full">
              Side-by-Side Trade-off Analysis
            </span>
            <h1
              id="comparison-modal-title"
              className="text-lg sm:text-xl font-black text-[#171A2B] tracking-tight mt-1"
            >
              Comparing {pathways.length} Possibilit{pathways.length === 1 ? "y" : "ies"}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {pathways.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C93AD] hover:text-[#DC2626] px-2.5 py-1.5 rounded-xl hover:bg-[#FEE2E2] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close comparison view"
              className="p-2 rounded-xl text-[#8C93AD] hover:text-[#171A2B] hover:bg-[#F4F3F8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-7 overflow-y-auto">
          {pathways.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F3F8] text-[#8C93AD] flex items-center justify-center mx-auto">
                <Columns3Icon className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-[#171A2B]">No pathways selected for comparison</p>
              <p className="text-xs text-[#626987] max-w-sm mx-auto">
                Select the &quot;Compare&quot; checkbox on any 2 or 3 pathway cards to evaluate their educational duration, day-to-day focus, and prerequisites.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto pb-4">
              <table className="w-full text-left text-xs border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-[#E8E6F3]">
                    <th className="py-3 px-4 font-bold text-[#8C93AD] uppercase tracking-wider text-[11px] w-1/4">
                      Comparison Dimension
                    </th>
                    {pathways.map((p) => (
                      <th key={p.id} className="py-3 px-4 w-1/3 align-top">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold text-[#6757F5] bg-[#EDEAFF] px-2 py-0.5 rounded-full">
                              {p.categoryLabel}
                            </span>
                            <button
                              type="button"
                              onClick={() => onRemove(p.id)}
                              aria-label={`Remove ${p.title} from comparison`}
                              className="p-1 text-[#8C93AD] hover:text-[#DC2626] rounded-md transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <h2 className="text-sm font-black text-[#171A2B] leading-snug">
                            {p.title}
                          </h2>
                          <button
                            type="button"
                            onClick={() => onOpenDetail(p)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#6757F5] hover:text-[#5342E8] pt-1"
                          >
                            <span>View Full Details</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EEF8]">
                  {/* Row 1: Pathway Classification */}
                  <tr>
                    <td className="py-3 px-4 font-bold text-[#171A2B] bg-[#FAF9F6]">
                      Pathway Type
                    </td>
                    {pathways.map((p) => (
                      <td key={p.id} className="py-3 px-4 text-[#474D66]">
                        <span className="font-semibold text-[#171A2B]">
                          {p.type.replace("_", " ").toUpperCase()}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Row 2: Headline Summary */}
                  <tr>
                    <td className="py-3 px-4 font-bold text-[#171A2B] bg-[#FAF9F6]">
                      Core Focus
                    </td>
                    {pathways.map((p) => (
                      <td key={p.id} className="py-3 px-4 text-[#474D66] leading-relaxed">
                        {p.headlineSummary}
                      </td>
                    ))}
                  </tr>

                  {/* Row 3: Educational Routes & Duration */}
                  <tr>
                    <td className="py-3 px-4 font-bold text-[#171A2B] bg-[#FAF9F6]">
                      Typical Duration & Routes
                    </td>
                    {pathways.map((p) => (
                      <td key={p.id} className="py-3 px-4 space-y-1.5">
                        {p.educationRoutes.map((r, rIdx) => (
                          <div key={rIdx} className="p-2 rounded-xl bg-[#FAF9F6] border border-[#F0EEF8]">
                            <div className="font-bold text-[#171A2B] text-[11px]">{r.title}</div>
                            <div className="text-[10px] text-[#059669] font-semibold">{r.duration}</div>
                          </div>
                        ))}
                      </td>
                    ))}
                  </tr>

                  {/* Row 4: Daily Work Environment */}
                  <tr>
                    <td className="py-3 px-4 font-bold text-[#171A2B] bg-[#FAF9F6]">
                      Daily Environment
                    </td>
                    {pathways.map((p) => (
                      <td key={p.id} className="py-3 px-4 text-[#474D66] space-y-1">
                        {p.dayInTheLife.map((d, dIdx) => (
                          <div key={dIdx} className="text-[11px]">
                            <span className="font-semibold text-[#171A2B]">{d.title}: </span>
                            <span className="text-[#626987]">{d.environmentNote}</span>
                          </div>
                        ))}
                      </td>
                    ))}
                  </tr>

                  {/* Row 5: Foundational Skills */}
                  <tr>
                    <td className="py-3 px-4 font-bold text-[#171A2B] bg-[#FAF9F6]">
                      Key Skill Foundations
                    </td>
                    {pathways.map((p) => (
                      <td key={p.id} className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {p.foundationalSkills.map((s, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded-md bg-[#EDEAFF] text-[#6757F5] text-[10px] font-semibold"
                            >
                              {s.name}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Row 6: Pre-Commitment Trial */}
                  <tr>
                    <td className="py-3 px-4 font-bold text-[#171A2B] bg-[#FAF9F6]">
                      Low-Stakes Micro-Trial
                    </td>
                    {pathways.map((p) => (
                      <td key={p.id} className="py-3 px-4 space-y-1">
                        <span className="font-bold text-[#171A2B] block">
                          {p.beforeYouCommitTrial.title}
                        </span>
                        <p className="text-[11px] text-[#626987] leading-snug">
                          {p.beforeYouCommitTrial.objective}
                        </p>
                      </td>
                    ))}
                  </tr>

                  {/* Row 7: Critical Unknown Question */}
                  <tr>
                    <td className="py-3 px-4 font-bold text-[#171A2B] bg-[#FAF9F6]">
                      What Remains Unknown
                    </td>
                    {pathways.map((p) => (
                      <td key={p.id} className="py-3 px-4 text-[#B45309] bg-[#FFFBEB]/50 leading-relaxed text-[11px]">
                        {p.whatRemainsUnknown}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#FAF9F6] border-t border-[#E8E6F3] flex items-center justify-between gap-3 shrink-0">
          <p className="text-[11px] text-[#626987]">
            Comparisons help weigh trade-offs objectively without forcing an early lock.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#171A2B] hover:bg-[#31364F] text-white text-xs font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}

function Columns3Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </svg>
  );
}

