import { test, expect } from "@playwright/test";
import path from "path";

const SCREENSHOT_DIR = "C:/Users/ravit/.gemini/antigravity/brain/dbe4277a-7bf2-48c4-a3c8-b02cbc825b13/screenshots";

test.describe("Hero Visual Refinement 1.2 — Verification & Storytelling Screen Captures", () => {
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

  test("Visual Storytelling Showcase — Inviting Header, Compact 4 Steps, Pure Story", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    const showcase = page.locator('[aria-label="Student Journey Interactive Showcase"]');
    await expect(showcase).toBeVisible();

    // 1. Verify new inviting heading
    await expect(showcase).toContainText("See how your journey unfolds");

    // 2. Verify 4 compact steps
    const stepTabs = showcase.locator('button[role="tab"]');
    await expect(stepTabs).toHaveCount(4);
    await expect(stepTabs.nth(0)).toContainText("Discover");
    await expect(stepTabs.nth(1)).toContainText("Explore");
    await expect(stepTabs.nth(2)).toContainText("Try");
    await expect(stepTabs.nth(3)).toContainText("Grow");

    // 3. Pause autoplay for deterministic inspection
    const pauseBtn = showcase.locator('button[aria-label="Pause autoplay"]');
    if (await pauseBtn.isVisible()) {
      await pauseBtn.click();
    }

    // 4. Default Scene 1 (School Mode)
    await expect(showcase).toContainText("What makes you curious?");
    await expect(showcase).toContainText("Start by exploring what genuinely excites you");

    // 5. Switch to College Mode
    const collegeBtn = showcase.locator('button:has-text("College & Career")');
    await collegeBtn.click();
    await expect(showcase).toContainText("Discover where your natural strengths lie");

    // Switch back to School Mode
    const schoolBtn = showcase.locator('button:has-text("School (4–12)")');
    await schoolBtn.click();

    // 6. Switch to Scene 2 (Explore)
    await stepTabs.nth(1).click();
    await expect(showcase).toContainText("There's so much to discover.");
    await expect(showcase).toContainText("Step into vibrant worlds of learning");

    // 7. Switch to Scene 3 (Try)
    await stepTabs.nth(2).click();
    await expect(showcase).toContainText("Try something new!");
    await expect(showcase).toContainText("Build a fun mini-project");

    // 8. Switch to Scene 4 (Grow)
    await stepTabs.nth(3).click();
    await expect(showcase).toContainText("Your journey keeps growing.");
    await expect(showcase).toContainText("Every new experience opens more possibilities.");

    // 9. Verify technical dashboard jargon and truncated labels are gone
    const fullText = await showcase.innerText();
    expect(fullText).not.toContain("Step 2 — Horizons");
    expect(fullText).not.toContain("Verified career horizons");
    expect(fullText).not.toContain("All paths transparently mapped");
    expect(fullText).not.toContain("Prerequisites · Calendars · Realities");
    expect(fullText).not.toContain("Curiosity Radar");
    expect(fullText).not.toContain("Evidence recorded in your growth log");
    expect(fullText).not.toMatch(/Make Your Next Mo/);
    expect(fullText).not.toContain("Every small step helps you grow");
  });

  test("Capture AFTER screenshots across viewports for all 4 scenes and College mode", async ({ page }) => {
    // ============================================
    // 1440px Desktop Captures
    // ============================================
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(600);
    const showcase = page.locator('[aria-label="Student Journey Interactive Showcase"]');
    const pauseBtn = showcase.locator('button[aria-label="Pause autoplay"]');
    if (await pauseBtn.isVisible()) {
      await pauseBtn.click();
    }

    // Desktop Scene 1 (School)
    await showcase.locator('#journey-tab-0').click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-refinement-1440px-scene1-discover.png"),
      fullPage: false,
    });

    // Desktop Scene 2 (School)
    await showcase.locator('#journey-tab-1').click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-refinement-1440px-scene2-explore.png"),
      fullPage: false,
    });

    // Desktop Scene 3 (School)
    await showcase.locator('#journey-tab-2').click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-refinement-1440px-scene3-try.png"),
      fullPage: false,
    });

    // Desktop Scene 4 (School)
    await showcase.locator('#journey-tab-3').click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-refinement-1440px-scene4-grow.png"),
      fullPage: false,
    });

    // Desktop College Mode (Scene 1)
    await showcase.locator('button:has-text("College & Career")').click();
    await showcase.locator('#journey-tab-0').click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-refinement-1440px-college-mode.png"),
      fullPage: false,
    });

    // Desktop College Mode (Scene 4: Grow)
    await showcase.locator('#journey-tab-3').click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-refinement-1440px-college-grow.png"),
      fullPage: false,
    });

    // ============================================
    // 390px Mobile Viewport Captures
    // ============================================
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(600);
    const mobileShowcase = page.locator('[aria-label="Student Journey Interactive Showcase"]');
    const mobilePause = mobileShowcase.locator('button[aria-label="Pause autoplay"]');
    if (await mobilePause.isVisible()) {
      await mobilePause.click();
    }

    // Mobile Scene 1 (School)
    await mobileShowcase.locator('#journey-tab-0').click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-refinement-390px-scene1-discover.png"),
      fullPage: false,
    });

    // Mobile Scene 2 (School)
    await mobileShowcase.locator('#journey-tab-1').click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-refinement-390px-scene2-explore.png"),
      fullPage: false,
    });

    // Mobile Scene 3 (School)
    await mobileShowcase.locator('#journey-tab-2').click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-refinement-390px-scene3-try.png"),
      fullPage: false,
    });

    // Mobile Scene 4 (School)
    await mobileShowcase.locator('#journey-tab-3').click();
    await page.waitForTimeout(300);
    await mobileShowcase.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-refinement-390px-scene4-element.png"),
    });
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-refinement-390px-scene4-grow.png"),
      fullPage: false,
    });

    // Mobile College Mode (Scene 1)
    await mobileShowcase.locator('button:has-text("College & Career")').click();
    await mobileShowcase.locator('#journey-tab-0').click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-refinement-390px-college-mode.png"),
      fullPage: false,
    });

    // Mobile College Mode (Scene 4: Grow)
    await mobileShowcase.locator('#journey-tab-3').click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-refinement-390px-college-grow.png"),
      fullPage: false,
    });

    // ============================================
    // 768px Tablet & 1024px Small Desktop Captures
    // ============================================
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-refinement-768px.png"),
      fullPage: false,
    });

    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "hero-refinement-1024px.png"),
      fullPage: false,
    });
  });
});
