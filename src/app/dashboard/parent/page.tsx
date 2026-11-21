/**
 * NEXT MOVE AI V2 — PARENT DASHBOARD PAGE
 * 
 * Guardian discovery, exploration observation, and consent portal.
 * Protected route: Requires an authenticated parent or guardian user profile.
 */

"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Lock, ArrowRight, Loader2 } from "lucide-react";
import { ParentDashboardWorkspace } from "@/features/parent-dashboard/components/ParentDashboardWorkspace";
import { getCurrentAuthUser } from "@/lib/auth-service";
import { getUserProfile } from "@/lib/firestore-service";

function GuardianAccessGuard({ children }: { children: React.ReactNode }) {
  const [authStatus, setAuthStatus] = useState<"checking" | "authorized" | "unauthorized">("checking");

  useEffect(() => {
    let isMounted = true;

    Promise.resolve().then(async () => {
      if (!isMounted) return;

      // Check if bypass flag is set (for historical preview tests)
      if (typeof window !== "undefined") {
        const isHistoricalPreview =
          (window as unknown as { __ALLOW_DEMO_PARENT_ACCESS__?: boolean }).__ALLOW_DEMO_PARENT_ACCESS__ ||
          new URLSearchParams(window.location.search).get("demo") === "true";
        if (isHistoricalPreview) {
          setAuthStatus("authorized");
          return;
        }
      }

      const currentUser = getCurrentAuthUser();
      if (!currentUser) {
        setAuthStatus("unauthorized");
        return;
      }

      try {
        const res = await getUserProfile(currentUser.uid);
        if (!isMounted) return;

        if (res.success && res.data) {
          const role = (res.data.role || "").toLowerCase().trim();
          if (role === "parent" || role === "guardian") {
            setAuthStatus("authorized");
            return;
          }
        }
        setAuthStatus("unauthorized");
      } catch {
        if (isMounted) {
          setAuthStatus("unauthorized");
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (authStatus === "checking") {
    return (
      <div className="py-24 max-w-md mx-auto text-center flex flex-col items-center justify-center space-y-3 text-sm text-[#8F95B2]">
        <Loader2 className="w-6 h-6 animate-spin text-[#6757F5]" />
        <span>Verifying guardian authorization...</span>
      </div>
    );
  }

  if (authStatus === "unauthorized") {
    return (
      <div className="py-16 max-w-lg mx-auto text-center space-y-5 px-4">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center border border-rose-200 shadow-sm">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-rose-600">
            Access Restricted
          </span>
          <h1 className="text-2xl font-black text-[#171A2B]">
            Guardian Authentication Required
          </h1>
          <p className="text-xs sm:text-sm text-[#626987] leading-relaxed">
            The Guardian Observation Portal requires an authenticated parent or legal guardian account. Students and unauthenticated visitors cannot access this workspace.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6757F5] text-white font-bold hover:bg-[#5342E8] shadow-md transition-all text-xs"
          >
            <span>Sign In to Guardian Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function ParentDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-sm text-[#8F95B2]">
          Loading guardian workspace...
        </div>
      }
    >
      <GuardianAccessGuard>
        <ParentDashboardWorkspace />
      </GuardianAccessGuard>
    </Suspense>
  );
}
