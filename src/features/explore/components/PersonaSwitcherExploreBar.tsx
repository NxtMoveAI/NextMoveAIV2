/**
 * NEXT MOVE AI V2 — EXPLORE DEV PERSONA SWITCHER BAR
 * 
 * Development-only toolbar enabling rapid verification across all 8 personas in Flow 5.
 * Excluded completely in production mode and anonymous previews.
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
  { id: "persona_empty", label: "First-Time (Empty)", badge: "Empty" },
  { id: "persona_returning_bcom", label: "Returning User", badge: "Return" },
];

export function PersonaSwitcherExploreBar() {
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
                Flow 5 Dev Persona Switcher
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EDEAFF] text-[#6757F5]">
                {hasRealHandoff
                  ? "Flow 3 Live Handoff Active"
                  : currentPersona?.shortLabel || "Persona"}
              </span>
            </div>
            <p className="text-[11px] text-[#A6ACBE]">
              Preview how Explore Possibilities adapts pathways across all 6 stages.
            </p>
          </div>
        </div>

        {hasRealHandoff && (
          <button
            type="button"
            onClick={() => studentProfileStore.clearConfirmedProfile()}
            className="text-[11px] text-[#DDD8FE] hover:text-white underline self-start md:self-auto"
          >
            Switch to Fixtures
          </button>
        )}
      </div>

      <div className="pt-2 flex flex-wrap gap-1.5 overflow-x-auto">
        {PERSONA_OPTIONS.map((item) => {
          const isSelected = !hasRealHandoff && activePersonaId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => studentProfileStore.setActivePersonaId(item.id)}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] ${
                isSelected
                  ? "bg-[#6757F5] text-white shadow-xs"
                  : "bg-[#23273D] text-[#A6ACBE] hover:text-white hover:bg-[#31364F]"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${
                  isSelected
                    ? "bg-white text-[#6757F5]"
                    : "bg-[#31364F] text-[#A6ACBE]"
                }`}
              >
                {item.badge}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

