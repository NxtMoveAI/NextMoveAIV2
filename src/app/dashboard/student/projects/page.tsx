"use client";

import React from "react";
import { FolderGit2 } from "lucide-react";
import { FutureModulePlaceholder } from "@/components/student-layout/FutureModulePlaceholder";

export default function StudentProjectsPage() {
  return (
    <FutureModulePlaceholder
      moduleName="My Projects & Practical Workspaces"
      flowNumber="Flow 7"
      shortDescription="Guided, real-world mini-projects designed to turn theoretical textbook knowledge into demonstrated, portfolio-ready capability."
      upcomingCapabilities={[
        "Step-by-step guided starter projects for all 6 academic stages",
        "Code repositories, financial spreadsheets, design briefs, and policy notes",
        "Transparent rubrics without deceptive automated certification",
        "Integration with GitHub, Notion, and local project environments",
      ]}
      icon={<FolderGit2 className="w-8 h-8" />}
    />
  );
}

