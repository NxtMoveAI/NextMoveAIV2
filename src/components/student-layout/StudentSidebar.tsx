/**
 * NEXT MOVE AI V2 — SHARED STUDENT SIDEBAR (DESKTOP)
 * 
 * Compact, balanced left navigation sidebar.
 * Follows V2 design system (Electric Iris, Deep Ink, Warm Off-White).
 */

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Compass,
  TrendingUp,
  FolderGit2,
  Sparkles,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useStudentHome } from "@/features/student-home/hooks/useStudentHome";
import { studentProfileStore } from "@/features/student-home/services/profile-store";

// Home icon using SVG to avoid Lucide import collisions if needed
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

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const PRIMARY_NAV: NavItem[] = [
  {
    label: "Home",
    href: "/dashboard/student",
    icon: <HomeIcon className="w-4 h-4 shrink-0" />,
  },
  {
    label: "Explore",
    href: "/dashboard/student/explore",
    icon: <Compass className="w-4 h-4 shrink-0" />,
  },
  {
    label: "My Growth",
    href: "/dashboard/student/growth",
    icon: <TrendingUp className="w-4 h-4 shrink-0" />,
  },
  {
    label: "My Projects",
    href: "/dashboard/student/projects",
    icon: <FolderGit2 className="w-4 h-4 shrink-0" />,
  },
  {
    label: "My Partner",
    href: "/dashboard/student/partner",
    icon: <Sparkles className="w-4 h-4 shrink-0" />,
    badge: "AI",
  },
];

const SECONDARY_NAV: NavItem[] = [
  {
    label: "Profile Review",
    href: "/dashboard/student/profile",
    icon: <User className="w-4 h-4 shrink-0" />,
  },
  {
    label: "Settings",
    href: "/dashboard/student/settings",
    icon: <Settings className="w-4 h-4 shrink-0" />,
  },
];

export function StudentSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { hasConfirmedProfile } = useStudentHome();

  const isCurrent = (href: string) => {
    if (href === "/dashboard/student") {
      return pathname === "/dashboard/student";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      aria-label="Student Application Sidebar"
      className="hidden lg:flex flex-col w-64 bg-white border-r border-[#E8E6F3] h-screen sticky top-0 shrink-0 z-30 select-none"
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-[#E8E6F3]">
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5] rounded-xl p-1"
        >
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#E4E1F8] bg-white flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-200">
            <Image
              src="/logo.png"
              alt="Next Move AI Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-[#171A2B]">
                Next Move <span className="text-[#6757F5]">AI</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.2 rounded-full bg-[#EDEAFF] text-[#6757F5] border border-[#DDD8FE]">
                V2
              </span>
            </div>
            <span className="text-[10px] text-[#626987] font-medium leading-none">
              Student Workspace
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Group */}
      <div className="flex-1 flex flex-col justify-between p-4 overflow-y-auto">
        {/* Primary Navigation */}
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#8C93AD]">
            Navigation
          </span>
          <nav aria-label="Primary Student Destinations" className="space-y-0.5 pt-1">
            {PRIMARY_NAV.map((item) => {
              const active = isCurrent(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    active
                      ? "bg-[#6757F5] text-white shadow-sm shadow-[#6757F5]/20"
                      : "text-[#474D66] hover:bg-[#F4F3F8] hover:text-[#171A2B]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={active ? "text-white" : "text-[#626987] group-hover:text-[#6757F5]"}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-[#EDEAFF] text-[#6757F5]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Secondary Navigation & User Area */}
        <div className="space-y-4 pt-4 border-t border-[#E8E6F3]">
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#8C93AD]">
              Account & Help
            </span>
            <nav aria-label="Secondary Settings" className="space-y-0.5 pt-1">
              {SECONDARY_NAV.map((item) => {
                const active = isCurrent(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                      active
                        ? "bg-[#EDEAFF] text-[#6757F5] font-semibold"
                        : "text-[#626987] hover:bg-[#F4F3F8] hover:text-[#171A2B]"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className={active ? "text-[#6757F5]" : "text-[#8C93AD] group-hover:text-[#6757F5]"}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {hasConfirmedProfile ? (
                <button
                  type="button"
                  onClick={() => {
                    studentProfileStore.clearConfirmedProfile();
                    router.push("/sign-in");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#C026D3] hover:bg-[#FDF4FF] transition-all group text-left"
                >
                  <LogOut className="w-4 h-4 shrink-0 text-[#C026D3]" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <div className="space-y-1 pt-1">
                  <Link
                    href="/sign-in"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#6757F5] hover:bg-[#EDEAFF] transition-all group"
                  >
                    <User className="w-4 h-4 shrink-0 text-[#6757F5]" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href="/get-started"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#059669] hover:bg-[#ECFDF5] transition-all group"
                  >
                    <Sparkles className="w-4 h-4 shrink-0 text-[#059669]" />
                    <span>Get Started</span>
                  </Link>
                </div>
              )}
            </nav>
          </div>

          {/* Philosophy Card */}
          <div className="p-3 rounded-2xl bg-[#F7F6FF] border border-[#DDD8FE] text-left">
            <p className="text-[11px] font-semibold text-[#171A2B] leading-tight">
              &ldquo;We don&apos;t decide careers; we enable clarity.&rdquo;
            </p>
            <p className="text-[10px] text-[#626987] pt-1">
              Your intelligence space evolves as you practice and reflect.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
