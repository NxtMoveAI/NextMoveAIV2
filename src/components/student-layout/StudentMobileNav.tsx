/**
 * NEXT MOVE AI V2 — SHARED STUDENT BOTTOM NAVIGATION (MOBILE)
 * 
 * Clean, accessible bottom navigation bar for mobile (< 1024px).
 * Supports one-handed reach, legible labels, safe-area insets, and screen readers.
 */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  TrendingUp,
  FolderGit2,
  Sparkles,
} from "lucide-react";

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

interface NavTab {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const TABS: NavTab[] = [
  {
    label: "Home",
    href: "/dashboard/student",
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    label: "Explore",
    href: "/dashboard/student/explore",
    icon: <Compass className="w-5 h-5" />,
  },
  {
    label: "Growth",
    href: "/dashboard/student/growth",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    label: "Projects",
    href: "/dashboard/student/projects",
    icon: <FolderGit2 className="w-5 h-5" />,
  },
  {
    label: "Partner",
    href: "/dashboard/student/partner",
    icon: <Sparkles className="w-5 h-5" />,
  },
];

export function StudentMobileNav() {
  const pathname = usePathname();

  const isCurrent = (href: string) => {
    if (href === "/dashboard/student") {
      return pathname === "/dashboard/student";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E6F3] shadow-[0_-4px_20px_-4px_rgba(23,26,43,0.06)] px-2 pt-1 pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)]"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {TABS.map((tab) => {
          const active = isCurrent(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 px-1 min-h-[48px] rounded-xl transition-all relative ${
                active
                  ? "text-[#6757F5]"
                  : "text-[#626987] hover:text-[#171A2B] hover:bg-[#F4F3F8]"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {/* Active dot indicator */}
              {active && (
                <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#6757F5]" />
              )}
              <span className={`transition-transform duration-150 ${active ? "scale-110" : ""}`}>
                {tab.icon}
              </span>
              <span className={`text-[10px] tracking-tight pt-0.5 leading-none ${active ? "font-bold text-[#6757F5]" : "font-medium"}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

