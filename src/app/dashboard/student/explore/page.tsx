"use client";

import React from "react";
import { Compass } from "lucide-react";
import { FutureModulePlaceholder } from "@/components/student-layout/FutureModulePlaceholder";

export default function StudentExplorePage() {
  return (
    <FutureModulePlaceholder
      moduleName="Explore Possibilities & Pathways"
      flowNumber="Flow 5"
      shortDescription="A comprehensive, multi-dimensional discovery space to evaluate educational streams, university degrees, vocational alternatives, and emerging career domains."
      upcomingCapabilities={[
        "Side-by-side degree and pathway trade-off matrix",
        "Syllabus comparisons and semester workload previews",
        "Direct connections from student interests to verified industry requirements",
        "Grounded 'What Remains Unknown' analysis for every career avenue",
      ]}
      icon={<Compass className="w-8 h-8" />}
    />
  );
}

