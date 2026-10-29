import React from "react";
import Link from "next/link";
import { GraduationCap, Edit3 } from "lucide-react";
import { type AcademicStage } from "@/data/landing-demo";

interface StageBadgeProps {
  stage: AcademicStage;
  editHref?: string;
  onEdit?: () => void;
  showEdit?: boolean;
}

export function StageBadge({
  stage,
  editHref,
  onEdit,
  showEdit = true,
}: StageBadgeProps) {
  return (
    <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#DDD8FE] flex items-center justify-between text-left">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#6757F5] text-white flex items-center justify-center shrink-0">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-[#6757F5] uppercase tracking-wider block">
            Recognized Stage
          </span>
          <span className="text-sm font-bold text-[#171A2B]">
            {stage.label} ({stage.sublabel})
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[11px] font-semibold text-[#626987] bg-white px-2 py-0.5 rounded-md border border-[#E8E6F3] hidden sm:inline">
          {stage.ageRange}
        </span>
        {showEdit && (
          editHref ? (
            <Link
              href={editHref}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#6757F5] hover:text-[#5342E8] p-1.5 rounded-lg hover:bg-[#EDEAFF] transition-colors"
              title="Change academic stage"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </Link>
          ) : onEdit ? (
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#6757F5] hover:text-[#5342E8] p-1.5 rounded-lg hover:bg-[#EDEAFF] transition-colors"
              title="Change academic stage"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          ) : null
        )}
      </div>
    </div>
  );
}
