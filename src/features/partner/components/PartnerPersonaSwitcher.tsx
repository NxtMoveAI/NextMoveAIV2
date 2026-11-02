/**
 * NEXT MOVE AI V2 — FLOW 8: PARTNER DEV PERSONA SWITCHER
 * 
 * Development toolbar enabling rapid testing of My Partner across all student personas.
 * Hidden in production mode.
 */

"use client";

import React from "react";
import { Users } from "lucide-react";
import { studentProfileStore } from "@/features/student-home/services/profile-store";
import { DEMO_PERSONAS } from "@/features/student-home/data/demo-personas";
import { type PersonaFixtureId } from "@/features/student-home/schemas/types";

const PERSONA_OPTIONS: { id: PersonaFixtureId; label: string; badge: string }[] = [
  { id: "persona_a_class6", label: "Class 6 Creative", badge: "A" },
  { id: "persona_b_class9", label: "Class 9 Undecided", badge: "B" },
  { id: "persona_c_class12", label: "Class 12 PCM", badge: "C" },
  { id: "persona_d_diploma", label: "Diploma Mech", badge: "D" },
  { id: "persona_e_bca", label: "BCA Python", badge: "E" },
  { id: "persona_f_bcom", label: "BCom Finance", badge: "F" },
  { id: "persona_g_engineering", label: "Eng Senior", badge: "G" },
  { id: "persona_h_grad", label: "Humanities Grad", badge: "H" },
];

export function PartnerPersonaSwitcher() {
  const isAnonymousPreview =
    typeof window !== "undefined" &&
    (window.location.search.includes("mode=production") ||
      window.location.search.includes("session=anonymous"));

  if (process.env.NODE_ENV === "production" || isAnonymousPreview) {
    return null;
  }

  const activePersonaId = studentProfileStore.getActivePersonaId();
  const hasRealHandoff = studentProfileStore.hasRealHandoff();
  const currentPersona = DEMO_PERSONAS[activePersonaId];

  return (
    <aside
      aria-label="Development Persona Switcher"
      data-testid="partner-persona-switcher"
      className="p-2 sm:p-2.5 bg-[#171A2B] text-white border-b border-[#31364F] select-none shrink-0"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#6757F5] flex items-center justify-center text-white shrink-0">
            <Users className="w-3 h-3" />
          </div>
          <span className="text-[11px] font-bold text-white tracking-tight">
            Dev Persona Switcher:
          </span>
          <span className="text-[10px] text-[#A5B4FC]">
            Active: <strong>{currentPersona?.name || activePersonaId}</strong> ({currentPersona?.profile?.academicStageId})
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {PERSONA_OPTIONS.map((p) => {
            const isActive = activePersonaId === p.id && !hasRealHandoff;
            return (
              <button
                key={p.id}
                type="button"
                data-testid={`persona-btn-${p.id}`}
                onClick={() => studentProfileStore.setActivePersonaId(p.id)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all shrink-0 ${
                  isActive
                    ? "bg-[#6757F5] text-white ring-1 ring-white/50"
                    : "bg-[#272B44] text-[#A5B4FC] hover:bg-[#343B5C] hover:text-white"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
