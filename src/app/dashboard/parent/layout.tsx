/**
 * NEXT MOVE AI V2 — PARENT DASHBOARD LAYOUT
 */

import React from "react";
import { ParentAppShell } from "@/features/parent-dashboard/components/ParentAppShell";

export const metadata = {
  title: "Guardian Workspace • Next Move AI V2",
  description: "Observe learning journeys, explore practical trial progress, and support student clarity.",
};

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ParentAppShell>{children}</ParentAppShell>;
}

