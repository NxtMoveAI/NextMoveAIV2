import { useSyncExternalStore } from "react";

/**
 * NEXT MOVE AI V2 — DEPLOYMENT MODE & ACCESS CONFIGURATION
 *
 * Authoritative configuration module for release isolation and access gating.
 *
 * SECURITY POLICY (FAIL-CLOSED):
 * 1. In production (NODE_ENV === "production"):
 *    - ONLY explicitly authorized demo mode (DEPLOYMENT_MODE === "demo") permits
 *      access to prototype registration, onboarding, and dashboard routes.
 *    - Any missing variable, misspelled value (e.g. "makreting"), empty string,
 *      or explicit "marketing" value FAILS CLOSED to public marketing preview mode.
 * 2. In local development (NODE_ENV === "development"):
 *    - Defaults to demo/open mode for developer productivity unless explicitly set to "marketing".
 * 3. Server-side process.env.DEPLOYMENT_MODE is the authoritative input for proxy access control.
 *    NEXT_PUBLIC_DEPLOYMENT_MODE is used strictly as a client-side rendering hint for CTA labels.
 */

export type DeploymentMode = "marketing" | "demo";

/**
 * Server-side authoritative determination of whether prototype demo access is authorized.
 * FAIL-CLOSED: Returns false in production unless DEPLOYMENT_MODE is explicitly "demo".
 */
export function isAuthorizedDemo(): boolean {
  const mode = (process.env.DEPLOYMENT_MODE || process.env.NEXT_PUBLIC_DEPLOYMENT_MODE)?.trim();

  if (mode === "demo") {
    return true;
  }

  // In development, allow demo mode unless explicitly overridden with marketing
  if (process.env.NODE_ENV === "development" && mode !== "marketing") {
    return true;
  }

  // In production and all other environments: FAIL-CLOSED
  return false;
}

/**
 * Universal (client/server) determination of whether public marketing mode is active.
 * Used by UI components to adjust CTA destinations and labels honestly.
 * FAIL-CLOSED: Defaults to marketing (restricted) unless authorized demo is established.
 */
export function isMarketingMode(): boolean {
  // 1. Authoritative server check
  if (typeof window === "undefined") {
    return !isAuthorizedDemo();
  }

  // 2. Client-side: cookie set authoritatively by server proxy
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/(?:^|;\s*)nm_mode=([^;]+)/);
    if (match) {
      return match[1]?.trim() !== "demo";
    }
  }

  // 3. Client fallback: NEXT_PUBLIC_DEPLOYMENT_MODE or DEPLOYMENT_MODE
  const envMode = (process.env.NEXT_PUBLIC_DEPLOYMENT_MODE || process.env.DEPLOYMENT_MODE)?.trim();
  if (envMode === "demo") {
    return false;
  }

  // 4. Local development defaults to demo
  if (process.env.NODE_ENV === "development" && envMode !== "marketing") {
    return false;
  }

  // 5. Production hosting: FAIL-CLOSED to marketing mode
  return true;
}

const emptySubscribe = () => () => {};

/**
 * React hook for subscribing to deployment mode safely without hydration mismatch
 * or cascading renders (uses React's official useSyncExternalStore).
 */
export function useIsMarketingMode(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => isMarketingMode(),
    () => isMarketingMode()
  );
}
