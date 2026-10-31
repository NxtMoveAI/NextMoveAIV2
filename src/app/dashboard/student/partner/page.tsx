"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { FutureModulePlaceholder } from "@/components/student-layout/FutureModulePlaceholder";

export default function StudentPartnerPage() {
  return (
    <FutureModulePlaceholder
      moduleName="My Partner • Personal AI Guide"
      flowNumber="Flow 8"
      shortDescription="An empathetic, memory-anchored learning partner that understands your starting baseline and helps you think through daily decisions."
      upcomingCapabilities={[
        "Context-grounded guidance grounded exclusively in your verified profile",
        "Deterministic structured advice: Exploration Directions + Trade-Offs + Next Step",
        "No hallucinated career guarantees or fake confidence scores",
        "Integration with Havyas's backend retrieval & secure student intelligence engine",
      ]}
      icon={<Sparkles className="w-8 h-8" />}
    />
  );
}

