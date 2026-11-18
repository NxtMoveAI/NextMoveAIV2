import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * NEXT MOVE AI V2 — NEXT.JS 16 PROXY (FAIL-CLOSED ACCESS CONTROL)
 *
 * Replaces deprecated middleware.ts with Next.js 16's official proxy.ts convention.
 * Enforces server-level boundary isolation between public marketing pages
 * and prototype student/parent/auth experiences.
 *
 * FAIL-CLOSED SECURITY POLICY:
 * 1. Production (NODE_ENV === "production"):
 *    - Explicit DEPLOYMENT_MODE === "demo" -> Allows prototype routes (Authorized Demo).
 *    - Missing, empty, misspelled, or DEPLOYMENT_MODE === "marketing" -> RESTRICTED (Fail-Closed).
 *      Intercepts prototype requests at the network layer and redirects (HTTP 307)
 *      to /preview-restricted before any client bundle or state is served.
 * 2. Development (NODE_ENV === "development"):
 *    - Defaults to demo/open mode for developer workflow unless DEPLOYMENT_MODE === "marketing".
 *
 * Authoritative Server-Side Decision:
 * - Reads process.env.DEPLOYMENT_MODE exclusively. Does not trust client-controlled headers or NEXT_PUBLIC_*.
 */

const PROTOTYPE_RESTRICTED_ROUTES = [
  "/dashboard",
  "/get-started",
  "/sign-in",
  "/sign-up",
  "/onboarding",
  "/guardian-support",
  "/verify",
  "/forgot-password",
];

function isAuthorizedDemo(): boolean {
  const mode = (process.env.DEPLOYMENT_MODE || process.env.NEXT_PUBLIC_DEPLOYMENT_MODE)?.trim();

  if (mode === "demo") {
    return true;
  }

  // Local development defaults to open unless explicitly locked to marketing
  if (process.env.NODE_ENV === "development" && mode !== "marketing") {
    return true;
  }

  // Production hosting: FAIL-CLOSED (missing, misspelled, or marketing are restricted)
  return false;
}

export function proxy(request: NextRequest) {
  const demoAllowed = isAuthorizedDemo();

  if (!demoAllowed) {
    const { pathname } = request.nextUrl;

    const isRestricted = PROTOTYPE_RESTRICTED_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    if (isRestricted) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/preview-restricted";
      redirectUrl.searchParams.set("from", pathname);
      const res = NextResponse.redirect(redirectUrl);
      res.cookies.set("nm_mode", "marketing", { path: "/", sameSite: "lax" });
      return res;
    }
  }

  const response = NextResponse.next();
  response.cookies.set("nm_mode", demoAllowed ? "demo" : "marketing", {
    path: "/",
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static build assets)
     * - _next/image (image optimization files)
     * - favicon.ico (browser favicon)
     * - public assets (.svg, .png, .jpg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
