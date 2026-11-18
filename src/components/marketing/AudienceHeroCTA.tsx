"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useIsMarketingMode } from "@/lib/deployment-mode";

interface AudienceHeroCTAProps {
  audience: "school" | "college" | "professionals";
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  btnClass: string;
}

export function AudienceHeroCTA({
  audience,
  primaryCta,
  secondaryCta,
  btnClass,
}: AudienceHeroCTAProps) {
  const isMarketing = useIsMarketingMode();

  const effectivePrimaryCta =
    audience === "school"
      ? isMarketing
        ? { label: "Explore School Activities", href: "#school-stages" }
        : { label: "Start Exploring", href: "/get-started?audience=school" }
      : primaryCta;

  return (
    <div
      className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
      suppressHydrationWarning
    >
      <Link
        href={effectivePrimaryCta.href}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold shadow-md transition-all duration-200 group active:scale-[0.99] ${btnClass}`}
      >
        <span>{effectivePrimaryCta.label}</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>

      {secondaryCta && (
        <Link
          href={secondaryCta.href}
          className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-[#31364f] bg-white border border-[#dedaf5] hover:bg-[#faf9f6] transition-colors"
        >
          <span>{secondaryCta.label}</span>
        </Link>
      )}
    </div>
  );
}
