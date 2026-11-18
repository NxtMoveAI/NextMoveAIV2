import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * NEXT MOVE AI V2 — PUBLIC MARKETING RELEASE MIDDLEWARE
 *
 * Enforces server-level boundary isolation between public marketing pages
 * and prototype student/parent/auth experiences.
 *
 * Operational Rules:
 * 1. When DEPLOYMENT_MODE === "marketing" or NEXT_PUBLIC_DEPLOYMENT_MODE === "marketing":
 *    - Public marketing routes (/, /school, /college, /professionals, /preview-restricted) are served normally.
 *    - All prototype, authentication, onboarding, and dashboard routes are intercepted at the server level
 *      and redirected (HTTP 307) to /preview-restricted before any client bundle or state is served.
 * 2. When DEPLOYMENT_MODE !== "marketing" (default for development, local verification, and controlled demos):
 *    - All prototype workflows pass through cleanly for supervised stakeholder evaluations and Playwright suites.
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

export function middleware(request: NextRequest) {
  const deploymentMode =
    process.env.DEPLOYMENT_MODE || process.env.NEXT_PUBLIC_DEPLOYMENT_MODE;

  if (deploymentMode === "marketing") {
    const { pathname } = request.nextUrl;

    const isRestricted = PROTOTYPE_RESTRICTED_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    if (isRestricted) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/preview-restricted";
      redirectUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (.svg, .png, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
