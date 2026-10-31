"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { FutureModulePlaceholder } from "@/components/student-layout/FutureModulePlaceholder";

export default function StudentGrowthPage() {
  return (
    <FutureModulePlaceholder
      moduleName="My Growth & Evidence Ledger"
      flowNumber="Flow 6"
      shortDescription="A continuous, non-judgmental record of what you have explored, practised, built, and reflected upon throughout your learning journey."
      upcomingCapabilities={[
        "Truthful categorization: Self-Reported vs Practised vs Demonstrated",
        "Interactive challenge retry and skill strengthening history",
        "Longitudinal reflections and evolving certainty tracking",
        "Verifiable portfolio evidence export for college & internship applications",
      ]}
      icon={<TrendingUp className="w-8 h-8" />}
    />
  );
}

