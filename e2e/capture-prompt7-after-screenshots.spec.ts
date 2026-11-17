/**
 * NEXT MOVE AI V2 — PROMPT 7 POST-REFINEMENT SCREENSHOT CAPTURE
 * Captures post-refinement screenshots of /, /school, /college, /professionals, /get-started
 * across 360px, 390px, 768px, 1280px, and 1440px.
 */

import { test } from "@playwright/test";
import path from "path";

const ARTIFACT_SCREENSHOTS_DIR = "C:/Users/ravit/.gemini/antigravity/brain/dbe4277a-7bf2-48c4-a3c8-b02cbc825b13/screenshots";

const VIEWPORTS = [
  { width: 360, height: 740, name: "360px" },
  { width: 390, height: 844, name: "390px" },
  { width: 768, height: 1024, name: "768px" },
  { width: 1280, height: 800, name: "1280px" },
  { width: 1440, height: 900, name: "1440px" },
];

const ROUTES = [
  { path: "/", name: "homepage" },
  { path: "/school", name: "school" },
  { path: "/college", name: "college" },
  { path: "/professionals", name: "professionals" },
  { path: "/get-started", name: "get-started" },
];

test.describe("Prompt 7 Post-Refinement Screenshot Capture", () => {
  for (const route of ROUTES) {
    for (const vp of VIEWPORTS) {
      test(`Capture after: ${route.name} at ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(route.path, { waitUntil: "networkidle" });
        await page.waitForTimeout(500);

        const screenshotPath = path.join(
          ARTIFACT_SCREENSHOTS_DIR,
          `prompt7-after-${route.name}-${vp.name}.png`
        );

        await page.screenshot({
          path: screenshotPath,
          fullPage: false,
        });
      });
    }
  }

  // Also capture audience-aware student entry state & mobile/tablet drawer
  test("Capture after: tablet drawer at 768px", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.click('button[aria-label="Open menu"]');
    await page.waitForTimeout(300);

    const screenshotPath = path.join(
      ARTIFACT_SCREENSHOTS_DIR,
      `prompt7-after-tablet-drawer-768px.png`
    );

    await page.screenshot({
      path: screenshotPath,
      fullPage: false,
    });
  });

  test("Capture after: get-started student audience-aware college at 1280px", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/get-started/student?audience=college&context=degree", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    const screenshotPath = path.join(
      ARTIFACT_SCREENSHOTS_DIR,
      `prompt7-after-get-started-college-context-1280px.png`
    );

    await page.screenshot({
      path: screenshotPath,
      fullPage: false,
    });
  });
});
