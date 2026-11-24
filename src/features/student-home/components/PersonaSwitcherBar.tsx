/**
 * NEXT MOVE AI V2 — DEV PERSONA SWITCHER BAR
 * 
 * Development-only toolbar enabling rapid verification across all 8 personas,
 * plus empty state and returning user state. Excluded in production builds.
 */

"use client";

import React from "react";
import { Users, RefreshCw } from "lucide-react";
import { useStudentHome } from "../hooks/useStudentHome";
import { type PersonaFixtureId } from "../schemas/types";
import { DEMO_PERSONAS } from "../data/demo-personas";

const PERSONA_OPTIONS: { id: PersonaFixtureId; label: string; badge: string }[] = [
  { id: "persona_a_class6", label: "Class 6 Creative", badge: "A" },
  { id: "persona_b_class9", label: "Class 9 Undecided", badge: "B" },
  { id: "persona_c_class12", label: "Class 12 PCM", badge: "C" },
  { id: "persona_d_diploma", label: "Diploma Mech", badge: "D" },
  { id: "persona_e_bca", label: "BCA Python", badge: "E" },
  { id: "persona_f_bcom", label: "BCom Finance", badge: "F" },
  { id: "persona_g_engineering", label: "Eng Senior", badge: "G" },
  { id: "persona_h_grad", label: "Humanities Grad", badge: "H" },
  { id: "persona_empty", label: "First-Time (Empty)", badge: "Empty" },
  { id: "persona_returning_bcom", label: "Returning User", badge: "Return" },
];

export function PersonaSwitcherBar() {
  const { activePersonaId, hasRealHandoff, switchPersona, restoreSuggestedMove, isRealAuthenticatedUser } = useStudentHome();

  // Exclude from production builds, anonymous production preview visits, OR authenticated users
  const isAnonymousPreview = typeof window !== "undefined" && (
    window.location.search.includes("mode=production") ||
    window.location.search.includes("session=anonymous")
  );
  if (process.env.NODE_ENV === "production" || isAnonymousPreview || isRealAuthenticatedUser) {
    return null;
  }

  const currentPersona = DEMO_PERSONAS[activePersonaId];

  return (
    <div
      aria-label="Development Persona Switcher"
      className="mb-6 p-3 rounded-2xl bg-[#171A2B] text-white shadow-md border border-[#31364F] select-none"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2.5 border-b border-[#31364F]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#6757F5] flex items-center justify-center text-white shrink-0">
            <Users className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-tight">
                Dev Persona Switcher
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EDEAFF] text-[#6757F5]">
                {hasRealHandoff ? "Flow 3 Live Handoff Active" : currentPersona?.shortLabel || "Persona"}
              </span>
            </div>
            <p className="text-[11px] text-[#A5ABBD]">
              {hasRealHandoff
                ? "Displaying the student profile confirmed in your current Flow 3 session."
                : currentPersona?.description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={restoreSuggestedMove}
          className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#31364F] hover:bg-[#474D66] text-xs font-medium text-white transition-colors"
        >
          <RefreshCw className="w-3 h-3 text-[#A5ABBD]" />
          <span>Reset Action State</span>
        </button>
      </div>

      {/* Persona Pill Buttons */}
      <div className="flex items-center gap-1.5 pt-2.5 overflow-x-auto pb-1 text-xs">
        {PERSONA_OPTIONS.map((opt) => {
          const isSelected = !hasRealHandoff && activePersonaId === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => switchPersona(opt.id)}
              className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium text-xs transition-all ${
                isSelected
                  ? "bg-[#6757F5] text-white font-bold shadow-sm"
                  : "bg-[#25293E] text-[#C2C7D6] hover:bg-[#31364F] hover:text-white"
              }`}
            >
              <span className={`text-[9px] px-1 py-0.2 rounded ${isSelected ? "bg-white/20" : "bg-black/30"}`}>
                {opt.badge}
              </span>
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
