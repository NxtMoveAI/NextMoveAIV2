import { test } from "@playwright/test";
import path from "path";

const ARTIFACT_DIR = path.resolve(
  "C:/Users/ravit/.gemini/antigravity/brain/dbe4277a-7bf2-48c4-a3c8-b02cbc825b13/screenshots"
);

test("Capture Prompt 4 College Desktop and Mobile Screenshots", async ({ page }) => {
  // 1. Desktop 1280px
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/college");
  await page.waitForLoadState("networkidle");

  // Hero
  await page.locator("section").first().screenshot({
    path: path.join(ARTIFACT_DIR, "prompt4-desktop-college-hero.png"),
  });

  // Dynamic Framework
  await page.locator("#college-framework").screenshot({
    path: path.join(ARTIFACT_DIR, "prompt4-desktop-college-dynamic-framework.png"),
  });

  // Project Showcase
  await page.locator("#college-projects").screenshot({
    path: path.join(ARTIFACT_DIR, "prompt4-desktop-college-project-showcase.png"),
  });

  // Actionable Roadmaps
  await page.locator("#college-roadmaps").screenshot({
    path: path.join(ARTIFACT_DIR, "prompt4-desktop-college-roadmaps.png"),
  });

  // Opportunities
  await page.locator("#college-opportunities").screenshot({
    path: path.join(ARTIFACT_DIR, "prompt4-desktop-college-opportunities.png"),
  });

  // My Partner
  await page.locator("#my-partner-college").screenshot({
    path: path.join(ARTIFACT_DIR, "prompt4-desktop-college-partner.png"),
  });

  // Partnerships
  await page.locator("#college-partnerships").screenshot({
    path: path.join(ARTIFACT_DIR, "prompt4-desktop-college-partnerships.png"),
  });

  // 2. Mobile 390px
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/college");
  await page.waitForLoadState("networkidle");

  // Mobile Hero
  await page.locator("section").first().screenshot({
    path: path.join(ARTIFACT_DIR, "prompt4-mobile-college-hero.png"),
  });

  // Mobile Dynamic Framework
  await page.locator("#college-framework").screenshot({
    path: path.join(ARTIFACT_DIR, "prompt4-mobile-college-dynamic-framework.png"),
  });

  // Mobile Project Showcase
  await page.locator("#college-projects").screenshot({
    path: path.join(ARTIFACT_DIR, "prompt4-mobile-college-project-showcase.png"),
  });

  // Mobile Roadmaps
  await page.locator("#college-roadmaps").screenshot({
    path: path.join(ARTIFACT_DIR, "prompt4-mobile-college-roadmaps.png"),
  });

  // Mobile Opportunities
  await page.locator("#college-opportunities").screenshot({
    path: path.join(ARTIFACT_DIR, "prompt4-mobile-college-opportunities.png"),
  });

  // Mobile My Partner
  await page.locator("#my-partner-college").screenshot({
    path: path.join(ARTIFACT_DIR, "prompt4-mobile-college-partner.png"),
  });

  // Mobile Partnerships
  await page.locator("#college-partnerships").screenshot({
    path: path.join(ARTIFACT_DIR, "prompt4-mobile-college-partnerships.png"),
  });
});
