import { test } from "@playwright/test";
import path from "path";

const ARTIFACT_DIR = path.resolve(
  "C:/Users/ravit/.gemini/antigravity/brain/dbe4277a-7bf2-48c4-a3c8-b02cbc825b13/screenshots"
);

test("Capture Prompt 5 Professionals Desktop and Mobile Screenshots", async ({ page }) => {
  // 1. Desktop Viewport (1280px)
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/professionals");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(500);

  // Desktop Hero
  const heroSection = page.locator("section").first();
  await heroSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt5-desktop-professionals-hero.png"),
  });

  // Desktop Dynamic Goal Selector
  const goalSection = page.locator("#growth-directions");
  await goalSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt5-desktop-professionals-goal-selector.png"),
  });

  // Desktop Transferable Capabilities
  const capSection = page.locator("#transferable-capabilities");
  await capSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt5-desktop-professionals-transferable-capabilities.png"),
  });

  // Desktop Practical Experience
  const practicalSection = page.locator("#practical-preview");
  await practicalSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt5-desktop-professionals-practical-preview.png"),
  });

  // Desktop Flexible Pathways
  const pathwaysSection = page.locator("#flexible-pathways");
  await pathwaysSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt5-desktop-professionals-flexible-pathways.png"),
  });

  // Desktop Opportunities Section
  const oppSection = page.locator("#opportunities");
  await oppSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt5-desktop-professionals-opportunities.png"),
  });

  // Desktop My Partner
  const partnerSection = page.locator("#professional-partner");
  await partnerSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt5-desktop-professionals-partner.png"),
  });

  // Desktop Research Notice
  const researchSection = page.locator("#research-notice");
  await researchSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt5-desktop-professionals-research-notice.png"),
  });

  // 2. Mobile Viewport (390px - iPhone 14 / modern smartphone)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/professionals");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(500);

  await heroSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt5-mobile-professionals-hero.png"),
  });

  await goalSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt5-mobile-professionals-goal-selector.png"),
  });

  await capSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt5-mobile-professionals-transferable-capabilities.png"),
  });

  await practicalSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt5-mobile-professionals-practical-preview.png"),
  });

  await pathwaysSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt5-mobile-professionals-flexible-pathways.png"),
  });

  await oppSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt5-mobile-professionals-opportunities.png"),
  });

  await partnerSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt5-mobile-professionals-partner.png"),
  });

  await researchSection.screenshot({
    path: path.join(ARTIFACT_DIR, "prompt5-mobile-professionals-research-notice.png"),
  });
});
