import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LucideIcon } from "lucide-react";

export interface AudienceCardProps {
  id: "school" | "college" | "professionals";
  title: string;
  badge: string;
  subtitle?: string;
  tagline?: string;
  description: string;
  highlights: string[];
  ctaLabel: string;
  href: string;
  icon: LucideIcon;
  accent?: "cyan" | "iris" | "blue";
  statusNotice?: string;
}

export function AudienceCard({
  id,
  title,
  badge,
  subtitle,
  tagline,
  description,
  highlights,
  ctaLabel,
  href,
  icon: Icon,
  accent = "iris",
  statusNotice,
}: AudienceCardProps) {
  const accentTheme = {
    cyan: {
      badge: "bg-[#e8f9fa] text-[#269ca8] border-[#cbf0f3]",
      iconBg: "bg-[#e8f9fa] text-[#269ca8] group-hover:bg-[#35b8c5] group-hover:text-white",
      border: "border-[#e8e6f3] hover:border-[#35b8c5]",
      btn: "bg-[#269ca8] hover:bg-[#1f808a] text-white shadow-[#35b8c5]/20",
      ring: "focus-visible:ring-[#35b8c5]",
      bullet: "text-[#269ca8]",
    },
    iris: {
      badge: "bg-[#edeaff] text-[#6757f5] border-[#dedaf5]",
      iconBg: "bg-[#edeaff] text-[#6757f5] group-hover:bg-[#6757f5] group-hover:text-white",
      border: "border-[#e8e6f3] hover:border-[#6757f5]",
      btn: "bg-[#6757f5] hover:bg-[#5342e8] text-white shadow-[#6757f5]/25",
      ring: "focus-visible:ring-[#6757f5]",
      bullet: "text-[#6757f5]",
    },
    blue: {
      badge: "bg-[#eff6ff] text-[#2563eb] border-[#dbeafe]",
      iconBg: "bg-[#eff6ff] text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white",
      border: "border-[#e8e6f3] hover:border-[#2563eb]",
      btn: "bg-[#171a2b] hover:bg-[#2563eb] text-white shadow-[#171a2b]/20",
      ring: "focus-visible:ring-[#2563eb]",
      bullet: "text-[#2563eb]",
    },
  }[accent];

  return (
    <article
      data-testid={`audience-card-${id}`}
      className={`group flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white border-2 ${accentTheme.border} transition-all duration-200 hover:shadow-xl hover:-translate-y-1 relative`}
    >
      <div>
        {/* Top Badges & Icon */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 shrink-0 ${accentTheme.iconBg}`}
          >
            <Icon className="w-6 h-6 transition-transform group-hover:scale-105" />
          </div>
          <div className="flex flex-col items-end">
            <span
              className={`inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full border ${accentTheme.badge}`}
            >
              {badge}
            </span>
            {statusNotice && (
              <span className="text-[10px] text-[#626987] font-semibold mt-1">
                {statusNotice}
              </span>
            )}
          </div>
        </div>

        {/* Title & Subtitle / Tagline */}
        <h3 className="text-xl sm:text-2xl font-black text-[#171a2b] tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-sm font-bold text-[#6757f5] mt-0.5">
            {subtitle}
          </p>
        )}
        {tagline && !subtitle && (
          <p className="text-xs sm:text-sm font-semibold text-[#6757f5] mt-1">
            {tagline}
          </p>
        )}

        {/* Description */}
        <p className="mt-3 text-xs sm:text-sm text-[#474d66] leading-relaxed">
          {description}
        </p>

        {/* Bullet Highlights */}
        <ul className="mt-5 space-y-2 border-t border-[#f1f0f8] pt-4">
          {highlights.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-xs sm:text-[13px] text-[#31364f]"
            >
              <CheckCircle2
                className={`w-4 h-4 shrink-0 mt-0.5 ${accentTheme.bullet}`}
              />
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="mt-7 pt-4 border-t border-[#f1f0f8]">
        <Link
          href={href}
          className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all duration-200 group-hover:gap-3 focus-visible:outline-none focus-visible:ring-2 ${accentTheme.ring} ${accentTheme.btn}`}
        >
          <span>{ctaLabel}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
