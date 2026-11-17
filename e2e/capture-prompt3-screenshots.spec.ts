import { test } from "@playwright/test";
import path from "path";

const ARTIFACT_DIR = path.resolve(
  "C:/Users/ravit/.gemini/antigravity/brain/dbe4277a-7bf2-48c4-a3c8-b02cbc825b13/screenshots"
);

test("Capture Prompt 3 Desktop and Mobile Screenshots", async ({ page }) => {
  // 1. Desktop 1280px
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/school");
  await page.waitForLoadState("networkidle");

  // Hero
  const heroSection = page.locator("section").first();
  await heroSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt3-desktop-school-hero.png"),
  });

  // Stage Selector & Experience
  const stageSection = page.locator("#school-stages");
  await stageSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt3-desktop-school-interactive-experience.png"),
  });

  // Creations Showcase
  const creationsSection = page.locator("#student-creations");
  await creationsSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt3-desktop-school-creations-showcase.png"),
  });

  // Partner Section
  const partnerSection = page.locator("#my-partner-school");
  await partnerSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt3-desktop-school-partner-and-guardrails.png"),
  });

  // Parents Section
  const parentsSection = page.locator("#parent-support");
  await parentsSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt3-desktop-school-parents.png"),
  });

  // School Partnerships Section
  const partnershipsSection = page.locator("#school-partnerships");
  await partnershipsSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt3-desktop-school-partnerships.png"),
  });

  // 2. Mobile 390px
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/school");
  await page.waitForLoadState("networkidle");

  // Mobile Hero
  await page.locator("section").first().screenshot({
    path: path.join(ARTIFACT_DIR, "prompt3-mobile-school-hero.png"),
  });

  // Mobile Stage experience
  await page.locator("#school-stages").screenshot({
    path: path.join(ARTIFACT_DIR, "prompt3-mobile-school-stage-experience.png"),
  });

  // Mobile Creations
  await page.locator("#student-creations").screenshot({
    path: path.join(ARTIFACT_DIR, "prompt3-mobile-school-creations.png"),
  });

  // Mobile Partner
  await page.locator("#my-partner-school").screenshot({
    path: path.join(ARTIFACT_DIR, "prompt3-mobile-school-partner.png"),
  });

  // Mobile Parents
  await page.locator("#parent-support").screenshot({
    path: path.join(ARTIFACT_DIR, "prompt3-mobile-school-parents.png"),
  });

  // Mobile Partnerships
  await page.locator("#school-partnerships").screenshot({
    path: path.join(ARTIFACT_DIR, "prompt3-mobile-school-partnerships.png"),
  });
});
