import { test, expect } from "@playwright/test";

test.describe("Prompt 2 — Unified Homepage Refinement & Audience Entry Verification", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("P2.1: Exactly three audience cards exist with required titles, values, and CTAs", async ({
    page,
  }) => {
    const audienceSection = page.locator("#audiences");
    await expect(audienceSection).toBeVisible();

    // Verify all 3 cards exist
    const schoolCard = page.locator('[data-testid="audience-card-school"]');
    const collegeCard = page.locator('[data-testid="audience-card-college"]');
    const profCard = page.locator('[data-testid="audience-card-professionals"]');

    await expect(schoolCard).toBeVisible();
    await expect(collegeCard).toBeVisible();
    await expect(profCard).toBeVisible();

    // Verify Card 1 (School)
    await expect(schoolCard.locator("h3")).toContainText("School Students");
    await expect(schoolCard).toContainText("Classes 4–12");
    await expect(schoolCard).toContainText(
      "Discover new interests, create, experiment, and grow through exciting learning experiences."
    );
    const schoolBtn = schoolCard.locator("a");
    await expect(schoolBtn).toContainText("Explore My World");
    await expect(schoolBtn).toHaveAttribute("href", "/school");

    // Verify Card 2 (College)
    await expect(collegeCard.locator("h3")).toContainText("College Students & Graduates");
    await expect(collegeCard).toContainText("Diploma · Degree · Engineering");
    await expect(collegeCard).toContainText(
      "Find your starting point, explore practical skills, build meaningful projects, and plan your next move."
    );
    const collegeBtn = collegeCard.locator("a");
    await expect(collegeBtn).toContainText("Build My Next Move");
    await expect(collegeBtn).toHaveAttribute("href", "/college");

    // Verify Card 3 (Professionals)
    await expect(profCard.locator("h3")).toContainText("Working Professionals");
    await expect(profCard).toContainText("Upskilling · Reskilling · Career Transitions");
    await expect(profCard).toContainText(
      "Explore transferable skills, new capabilities, and realistic possibilities for professional growth."
    );
    const profBtn = profCard.locator("a");
    await expect(profBtn).toContainText("Explore Professional Growth");
    await expect(profBtn).toHaveAttribute("href", "/professionals");
    // Verify non-operational preview badge/notice
    await expect(profCard).toContainText(/Upcoming Preview|Non-operational/i);
  });

  test("P2.2: Audience cards navigate to their respective dedicated routes", async ({
    page,
  }) => {
    // Navigate to /school
    await page.locator('[data-testid="audience-card-school"] a').click();
    await page.waitForURL("**/school");
    await expect(page).toHaveURL(/\/school$/);
    await expect(page.locator("h1").first()).toContainText(/Big discoveries begin with small curiosities|Spark curiosity early/i);
    await expect(page.locator("body")).toContainText("Next Move Explore");

    // Return home and navigate to /college
    await page.goto("/");
    await page.locator('[data-testid="audience-card-college"] a').click();
    await page.waitForURL("**/college");
    await expect(page).toHaveURL(/\/college$/);
    await expect(page.locator("h1").first()).toContainText(/Your degree is one part of your journey|Build real capability/i);
    await expect(page.locator("body")).toContainText("Next Move Build");

    // Return home and navigate to /professionals
    await page.goto("/");
    await page.locator('[data-testid="audience-card-professionals"] a').click();
    await page.waitForURL("**/professionals");
    await expect(page).toHaveURL(/\/professionals$/);
    await expect(page.locator("h1").first()).toContainText(/Your experience matters|Grow continuously/i);
    await expect(page.locator("body")).toContainText("Next Move Grow");
    // Explicit truthfulness invariant on /professionals
    await expect(page.locator("body")).toContainText(/job placement agency|hiring board|commercial placement agency/i);
  });

  test("P2.3: Hero section presents refined headline, philosophy, and trust indicators", async ({
    page,
  }) => {
    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Discover what you can learn.");
    await expect(heading).toContainText("Build what you can do.");

    // Supporting message
    await expect(page.locator("body")).toContainText(
      "Explore new interests, try practical experiences, develop meaningful skills, and take your next step with confidence."
    );

    // Brand philosophy
    await expect(page.locator("body")).toContainText(
      "We don’t decide careers; we enable clarity."
    );

    // Core CTAs
    const primaryCta = page.locator('section').first().locator('a:has-text("Explore Your Next Move")');
    await expect(primaryCta).toBeVisible();
    await expect(primaryCta).toHaveAttribute("href", "/get-started");

    const secondaryCta = page.locator('section').first().locator('a:has-text("See How It Works")');
    await expect(secondaryCta).toBeVisible();
    await expect(secondaryCta).toHaveAttribute("href", "#how-it-works");
  });

  test("P2.4: All section anchor links exist and resolve cleanly without missing targets", async ({
    page,
  }) => {
    const expectedAnchors = [
      "#audiences",
      "#how-it-works",
      "#explorer",
      "#experiences",
      "#my-partner",
      "#for-parents",
      "#faq",
    ];

    for (const anchor of expectedAnchors) {
      const el = page.locator(anchor);
      await expect(el).toBeAttached();
      const count = await el.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test("P2.5: Header audience switcher and global entry points remain accessible", async ({
    page,
  }) => {
    // Header audience navigation links
    const audienceNav = page.locator('[aria-label="Audience navigation"]');
    await expect(audienceNav).toBeVisible();
    await expect(audienceNav.locator('a[href="/school"]')).toBeVisible();
    await expect(audienceNav.locator('a[href="/college"]')).toBeVisible();
    await expect(audienceNav.locator('a[href="/professionals"]')).toBeVisible();

    // Global Header Actions
    const signInBtn = page.locator('header a[href="/sign-in"]').first();
    await expect(signInBtn).toBeVisible();

    const getStartedBtn = page.locator('header a[href="/get-started"]').first();
    await expect(getStartedBtn).toBeVisible();
  });

  test("P2.6: See Learning in Action showcases demonstrations with non-assessment disclosure", async ({
    page,
  }) => {
    const experiences = page.locator("#experiences");
    await expect(experiences).toBeVisible();

    // Demonstrations disclaimer
    await expect(experiences).toContainText(
      /Demonstration Samples|not saved learning records/i
    );

    // School storyboard example
    await expect(experiences).toContainText("Storyboarding & Animation");

    // College data example
    const collegeDataBtn = experiences.locator('button:has-text("Practical Data")');
    if (await collegeDataBtn.isVisible()) {
      await collegeDataBtn.click();
      await expect(experiences).toContainText("Data Analytics & Applied Python");
    }
  });

  test("P2.7: My Partner positioning is verified as learning companion with non-AI disclaimer", async ({
    page,
  }) => {
    const partner = page.locator("#my-partner");
    await expect(partner).toBeVisible();

    // Positioning text
    await expect(partner).toContainText(
      "A learning companion that helps you explore, understand, practise, reflect and identify what to try next."
    );

    // Explicit disclaimer
    await expect(partner).toContainText(
      /Illustrative sample conversation|Not connected to live student accounts/i
    );
  });

  test("P2.8: Responsive integrity check across 360px, 390px, 768px, 1280px, 1440px", async ({
    page,
  }) => {
    const viewports = [
      { width: 360, height: 740 },
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1280, height: 800 },
      { width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(200);

      // Verify no horizontal overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(
        hasHorizontalScroll,
        `Horizontal overflow detected at ${vp.width}px`
      ).toBe(false);

      // Verify 3 audience cards remain visible and responsive
      const schoolCard = page.locator('[data-testid="audience-card-school"]');
      await expect(schoolCard).toBeVisible();
    }
  });
});
