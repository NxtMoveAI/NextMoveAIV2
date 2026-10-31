"use client";

import React from "react";
import { Settings } from "lucide-react";
import { FutureModulePlaceholder } from "@/components/student-layout/FutureModulePlaceholder";

export default function StudentSettingsPage() {
  return (
    <FutureModulePlaceholder
      moduleName="Student Preferences & Privacy Settings"
      flowNumber="Flow 9"
      shortDescription="Control your privacy settings, notification frequencies, guardian visibility preferences, and data export tools."
      upcomingCapabilities={[
        "Parent and guardian transparency controls",
        "Learning pace and accessibility preferences (e.g. reduced motion, high contrast)",
        "Download your complete Student Intelligence Profile in portable JSON/PDF",
        "Account deletion and privacy minimization tools conforming to DPDP standards",
      ]}
      icon={<Settings className="w-8 h-8" />}
    />
  );
}

