/**
 * NEXT MOVE AI V2 — SCREENSHOT CAPTURE FOR FINAL AUDIT
 */

import { test } from "@playwright/test";
import * as path from "path";

const SCREENSHOT_DIR = "C:/Users/ravit/.gemini/antigravity/brain/dbe4277a-7bf2-48c4-a3c8-b02cbc825b13/screenshots";

test.describe("Final Audit Visual Artifacts", () => {
  test("Capture Student Settings screens", async ({ page }) => {
    // 1. Desktop settings
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/dashboard/student/settings");
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "final-settings-desktop-workspace.png"),
      fullPage: true,
    });

    // 2. Mobile settings
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/dashboard/student/settings");
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "final-settings-mobile-viewport.png"),
      fullPage: true,
    });
  });

  test("Capture Parent Dashboard screens", async ({ page }) => {
    // 1. Desktop Parent Dashboard (Aarav)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/dashboard/parent");
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "final-parent-dashboard-desktop.png"),
      fullPage: true,
    });

    // 2. Mobile Parent Dashboard (390px)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/dashboard/parent");
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "final-parent-dashboard-mobile.png"),
      fullPage: true,
    });

    // 3. Desktop Parent Dashboard (Ananya)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/dashboard/parent?student=student_ananya_6");
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "final-parent-dashboard-ananya.png"),
      fullPage: true,
    });
  });

  test("Capture Error 404 Recovery screen", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/non-existent-career-pathway-route-404");
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "final-error-404-recovery.png"),
      fullPage: true,
    });
  });
});

