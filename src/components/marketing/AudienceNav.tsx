"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, GraduationCap, Briefcase, Home } from "lucide-react";

export interface AudienceNavProps {
  className?: string;
  variant?: "header" | "drawer" | "page";
}

const AUDIENCE_ITEMS = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: Home,
    tag: "Platform",
  },
  {
    id: "school",
    label: "School",
    sublabel: "Classes 4–12",
    href: "/school",
    icon: Compass,
    accent: "text-[#269ca8] bg-[#e8f9fa] border-[#cbf0f3]",
    activeRing: "ring-[#35b8c5]/30",
  },
  {
    id: "college",
    label: "College",
    sublabel: "Degrees & Diplomas",
    href: "/college",
    icon: GraduationCap,
    accent: "text-[#6757f5] bg-[#edeaff] border-[#dedaf5]",
    activeRing: "ring-[#6757f5]/30",
  },
  {
    id: "professionals",
    label: "Professionals",
    sublabel: "Growth Preview",
    href: "/professionals",
    icon: Briefcase,
    accent: "text-[#2563eb] bg-[#eff6ff] border-[#dbeafe]",
    activeRing: "ring-[#2563eb]/30",
  },
];

export function AudienceNav({ className = "", variant = "header" }: AudienceNavProps) {
  const pathname = usePathname();

  const isCurrent = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  if (variant === "drawer") {
    return (
      <div className={`space-y-1 ${className}`} role="navigation" aria-label="Audience navigation">
        <p className="text-xs uppercase tracking-wider font-semibold text-[#626987] px-3 mb-2">
          Audience Journeys
        </p>
        <div className="grid grid-cols-1 gap-1.5">
          {AUDIENCE_ITEMS.map((item) => {
            const active = isCurrent(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-[#6757f5] text-white shadow-xs"
                    : "text-[#31364f] hover:text-[#171a2b] hover:bg-[#edeaff]/60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${active ? "text-white" : "text-[#6757f5]"}`} />
                  <span>{item.label}</span>
                </div>
                {item.sublabel && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-[#edeaff] text-[#6757f5]"
                    }`}
                  >
                    {item.sublabel}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // Header segmented pill variant
  return (
    <nav
      className={`inline-flex items-center p-1 rounded-2xl bg-[#f1f0f8]/80 border border-[#e4e1f8] backdrop-blur-xs ${className}`}
      aria-label="Audience navigation"
    >
      {AUDIENCE_ITEMS.map((item) => {
        const active = isCurrent(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.id}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6757f5] ${
              active
                ? "bg-white text-[#171a2b] shadow-xs border border-[#dedaf5]"
                : "text-[#626987] hover:text-[#171a2b] hover:bg-white/60"
            }`}
          >
            <Icon
              className={`w-3.5 h-3.5 ${
                active
                  ? item.id === "school"
                    ? "text-[#269ca8]"
                    : item.id === "college"
                    ? "text-[#6757f5]"
                    : item.id === "professionals"
                    ? "text-[#2563eb]"
                    : "text-[#6757f5]"
                  : "text-[#9ea3b5]"
              }`}
            />
            <span>{item.label}</span>
            {item.sublabel && (
              <span className="hidden xl:inline text-[9px] text-[#9ea3b5] font-normal">
                ({item.sublabel})
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
