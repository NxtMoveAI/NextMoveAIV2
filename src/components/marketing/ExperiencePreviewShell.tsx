import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, LucideIcon } from "lucide-react";
import Link from "next/link";

export interface ExperiencePreviewShellProps {
  badge: string;
  badgeIcon?: LucideIcon;
  title: string;
  subtitle: string;
  accent?: "cyan" | "iris" | "blue";
  footerNotice?: string;
  cta?: {
    label: string;
    href: string;
  };
  children: React.ReactNode;
}

export function ExperiencePreviewShell({
  badge,
  badgeIcon: BadgeIcon = Sparkles,
  title,
  subtitle,
  accent = "iris",
  footerNotice,
  cta,
  children,
}: ExperiencePreviewShellProps) {
  const accentTheme = {
    cyan: {
      badge: "bg-[#e8f9fa] text-[#269ca8] border-[#cbf0f3]",
      border: "border-[#e8e6f3]",
      headerBg: "bg-gradient-to-r from-[#e8f9fa]/50 to-white",
      btn: "text-[#269ca8] hover:text-[#1f808a]",
    },
    iris: {
      badge: "bg-[#edeaff] text-[#6757f5] border-[#dedaf5]",
      border: "border-[#e8e6f3]",
      headerBg: "bg-gradient-to-r from-[#edeaff]/50 to-white",
      btn: "text-[#6757f5] hover:text-[#5342e8]",
    },
    blue: {
      badge: "bg-[#eff6ff] text-[#2563eb] border-[#dbeafe]",
      border: "border-[#e8e6f3]",
      headerBg: "bg-gradient-to-r from-[#eff6ff]/50 to-white",
      btn: "text-[#2563eb] hover:text-[#1d4ed8]",
    },
  }[accent];

  return (
    <div
      className={`rounded-3xl bg-white border ${accentTheme.border} shadow-sm overflow-hidden`}
    >
      {/* Top Header */}
      <div
        className={`p-6 sm:p-7 border-b border-[#f1f0f8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${accentTheme.headerBg}`}
      >
        <div>
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2 border ${accentTheme.badge}`}
          >
            <BadgeIcon className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#171a2b] tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#474d66] mt-1">
            {subtitle}
          </p>
        </div>

        {cta && (
          <Link
            href={cta.href}
            className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-all shrink-0 ${accentTheme.btn}`}
          >
            <span>{cta.label}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-8">
        {children}
      </div>

      {/* Footer Notice */}
      {footerNotice && (
        <div className="px-6 py-3.5 bg-[#faf9f6] border-t border-[#f1f0f8] flex items-center gap-2 text-xs text-[#626987]">
          <ShieldCheck className="w-4 h-4 text-[#6757f5] shrink-0" />
          <span>{footerNotice}</span>
        </div>
      )}
    </div>
  );
}
