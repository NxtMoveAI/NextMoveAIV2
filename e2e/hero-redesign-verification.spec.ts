import { test, expect } from "@playwright/test";
import path from "path";

const SCREENSHOT_DIR = "C:/Users/ravit/.gemini/antigravity/brain/dbe4277a-7bf2-48c4-a3c8-b02cbc825b13/screenshots";

test.describe("Hero Redesign — Verification & Multi-Viewport Screen Captures", () => {
  test("Verify Hero Section Content, Copy, and No Version Labels", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    // 1. Verify Header has no V2 badge
    const headerBrand = page.locator('header a[href="/"]').first();
    await expect(headerBrand).toBeVisible();
    await expect(headerBrand).toContainText("Next Move AI");
    await expect(headerBrand).not.toContainText("V2");

    // 2. Verify Hero Eyebrow
    const eyebrow = page.locator("text=We don’t decide careers; we enable clarity.").first();
    await expect(eyebrow).toBeVisible();

    // 3. Verify Headline
    const headline = page.locator("h1").first();
    await expect(headline).toContainText("Discover what excites you.");
    await expect(headline).toContainText("Build what comes next.");

    // 4. Verify Supporting Copy
    const copy = page.locator("text=Explore your interests, try new things, discover possibilities, and grow with guidance that understands your journey.").first();
    await expect(copy).toBeVisible();

    // 5. Verify Primary CTA
    const primaryCta = page.locator('a:has-text("Explore Your Next Move")').first();
    await expect(primaryCta).toBeVisible();
    await expect(primaryCta).toHaveAttribute("href", "/get-started");

    // 6. Verify Secondary CTA
    const secondaryCta = page.locator('a:has-text("See How It Works")').first();
    await expect(secondaryCta).toBeVisible();
    await expect(secondaryCta).toHaveAttribute("href", "#how-it-works");

    // 7. Verify Trust Indicators
    await expect(page.locator("text=Classes 4–12 & College").first()).toBeVisible();
    await expect(page.locator("text=Zero premature labels").first()).toBeVisible();
    await expect(page.locator("text=Hands-on projects & trials").first()).toBeVisible();

    // 8. Verify No Public Version Branding in Hero
    const heroSection = page.locator("section").first();
    const heroText = await heroSection.innerText();
    expect(heroText).not.toMatch(/\bV2\b/);
    expect(heroText).not.toMatch(/\bBeta\b/);
    expect(heroText).not.toMatch(/\bMVP\b/);
  });

  test("Interactive Showcase — Mode toggle, Scene navigation, and Play/Pause", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    const showcase = page.locator('[aria-label="Student Journey Interactive Showcase"]');
    await expect(showcase).toBeVisible();

    // Pause autoplay for steady testing
    const pauseBtn = showcase.locator('button[aria-label="Pause autoplay"]');
    if (await pauseBtn.isVisible()) {
      await pauseBtn.click();
    }

    // Default Scene 1 (School Mode)
    await expect(showcase).toContainText("What makes you curious?");
    await expect(showcase).toContainText("Robotics & AI");

    // Switch to College Mode
    const collegeBtn = showcase.locator('button:has-text("College & Career")');
    await collegeBtn.click();
    await expect(showcase).toContainText("Where do your strengths lie?");
    await expect(showcase).toContainText("Cloud Systems");

    // Switch back to School Mode
    const schoolBtn = showcase.locator('button:has-text("School (4–12)")');
    await schoolBtn.click();
    await expect(showcase).toContainText("What makes you curious?");

    // Switch to Scene 2 (Explore Possibilities)
    const scene2Tab = showcase.locator('#journey-tab-1');
    await scene2Tab.click();
    await expect(showcase).toContainText("Discover a world of possibilities.");

    // Switch to Scene 3 (Give It a Try)
    const scene3Tab = showcase.locator('#journey-tab-2');
    await scene3Tab.click();
    await expect(showcase).toContainText("Learn by trying something new.");
    await expect(showcase).toContainText("Solar Rover Tracker");

    // Switch to Scene 4 (Make Your Next Move)
    const scene4Tab = showcase.locator('#journey-tab-3');
    await scene4Tab.click();
    await expect(showcase).toContainText("Take your next step, your way.");
    await expect(showcase).toContainText("Shortlist 3 Subject Combinations");
  });

  test("Capture AFTER screenshots across viewports", async ({ page }) => {
    // 1440px Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-redesign-after-1440px.png"),
      fullPage: false,
    });

    // 390px Mobile
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-redesign-after-390px.png"),
      fullPage: false,
    });

    // 360px Compact Mobile
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-redesign-after-360px.png"),
      fullPage: false,
    });

    // 768px Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-redesign-after-768px.png"),
      fullPage: false,
    });

    // 1024px Small Desktop
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-redesign-after-1024px.png"),
      fullPage: false,
    });

    // Capture Scene 2 on Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(400);
    const showcase = page.locator('[aria-label="Student Journey Interactive Showcase"]');
    await showcase.locator('#journey-tab-1').click();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-redesign-scene2-explore.png"),
      fullPage: false,
    });

    // Capture Scene 3 on Desktop
    await showcase.locator('#journey-tab-2').click();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-redesign-scene3-trial.png"),
      fullPage: false,
    });

    // Capture Scene 4 on Desktop
    await showcase.locator('#journey-tab-3').click();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-redesign-scene4-nextmove.png"),
      fullPage: false,
    });

    // Capture College Mode on Desktop
    await showcase.locator('button:has-text("College & Career")').click();
    await showcase.locator('#journey-tab-0').click();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-redesign-college-mode.png"),
      fullPage: false,
    });
  });
});
