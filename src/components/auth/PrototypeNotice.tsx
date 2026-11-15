import React from "react";
import { Sparkles, ShieldCheck } from "lucide-react";

interface PrototypeNoticeProps {
  message?: string;
  className?: string;
}

export function PrototypeNotice({
  message = "Design & UX Preview · Account creation will be available when secure sign-in is connected. No credentials are stored or persisted in demo mode.",
  className = "",
}: PrototypeNoticeProps) {
  return (
    <div
      className={`p-3.5 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-left text-xs text-[#31364F] leading-relaxed flex items-start gap-2.5 ${className}`}
    >
      <div className="w-5 h-5 rounded-lg bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0 mt-0.5">
        <Sparkles className="w-3.5 h-3.5" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-[#6757F5] text-[11px] uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-[#35B8C5]" />
          <span>Public Preview Notice</span>
        </div>
        <p className="text-[11px] text-[#474D66]">{message}</p>
      </div>
    </div>
  );
}
