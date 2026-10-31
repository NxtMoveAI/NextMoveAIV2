/**
 * NEXT MOVE AI V2 — STUDENT DASHBOARD LAYOUT
 */

import React from "react";
import { StudentAppShell } from "@/components/student-layout/StudentAppShell";

export const metadata = {
  title: "Student Workspace • Next Move AI V2",
  description: "Your personalized student intelligence space, evolving with your everyday exploration and decisions.",
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudentAppShell>{children}</StudentAppShell>;
}
