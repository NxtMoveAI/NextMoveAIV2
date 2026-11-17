import { test, expect } from "@playwright/test";

test.describe("Next Move AI — Prompt 3: Dynamic School Landing Page (/school)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/school");
    await page.waitForLoadState("domcontentloaded");
  });

  test("1. School page loads with accurate metadata, header, and hero content", async ({ page }) => {
    // Metadata title check
    await expect(page).toHaveTitle(/Next Move Explore — School & Stream Discovery/);

    // Hero main heading and accent
    const heroSection = page.locator("section").first();
    await expect(heroSection).toContainText("Big discoveries begin with small curiosities.");
    await expect(heroSection).toContainText("Explore what you love learning.");

    // Audience eyebrow
    await expect(heroSection).toContainText("Next Move Explore");
    await expect(heroSection).toContainText("Classes 4–12 & Families");

    // Trust pills
    await expect(heroSection).toContainText("Classes 4–12 Age Appropriate");
    await expect(heroSection).toContainText("Zero Premature Career Labels");
    await expect(heroSection).toContainText("Respectful Parent Collaboration");
    await expect(heroSection).toContainText("Independent & Unbiased Guidance");

    // Primary & Secondary CTAs
    const primaryCta = heroSection.locator('a:has-text("Start Exploring")').first();
    await expect(primaryCta).toBeVisible();
    await expect(primaryCta).toHaveAttribute("href", "/get-started?audience=school");

    const secondaryCta = heroSection.locator('a:has-text("See How It Works")').first();
    await expect(secondaryCta).toBeVisible();
    await expect(secondaryCta).toHaveAttribute("href", "#school-stages");
  });

  test("2. Academic stage selector changes stages and stage-specific content dynamically", async ({ page }) => {
    const stageSection = page.locator("#school-stages");
    await expect(stageSection).toBeVisible();

    // Default stage is Classes 4-7
    await expect(stageSection).toContainText("Classes 4–7");
    await expect(stageSection).toContainText("Curiosity Before Career Decisions");
    await expect(stageSection).toContainText("Creative Storytelling");
    await expect(stageSection).toContainText("Logic & Problem-Solving");
    await expect(stageSection).toContainText("Science & Observation");

    // Switch to Classes 8-10
    const btn810 = stageSection.locator('button:has-text("Classes 8–10")');
    await btn810.click();

    await expect(stageSection).toContainText("Guided Exploration & Foundational Thinking");
    await expect(stageSection).toContainText("Technology Foundations");
    await expect(stageSection).toContainText("Scientific Thinking");
    await expect(stageSection).toContainText("Communication & Debating");

    // Switch to Classes 11-12
    const btn1112 = stageSection.locator('button:has-text("Classes 11–12")');
    await btn1112.click();

    await expect(stageSection).toContainText("Practical Streams & Future Pathways");
    await expect(stageSection).toContainText("Programming & Technology");
    await expect(stageSection).toContainText("Business & Financial Thinking");
    await expect(stageSection).toContainText("Educational Pathways After Class 12");
  });

  test("3. Classes 4–7 experience enforces zero forced career paths and zero aptitude rankings", async ({ page }) => {
    const stageSection = page.locator("#school-stages");
    const btn47 = stageSection.locator('button:has-text("Classes 4–7")');
    await btn47.click();

    // Verify safeguards banner
    await expect(stageSection).toContainText("Educational Safeguard");
    await expect(stageSection).toContainText("Zero career-fit percentages");
    await expect(stageSection).toContainText("No job recommendations");
    await expect(stageSection).toContainText("No competitive rankings");
  });

  test("4. Category selection updates practical activity, expected output, and reflection sandbox", async ({ page }) => {
    const stageSection = page.locator("#school-stages");

    // Click on Science & Observation category in Classes 4-7
    const scienceCatBtn = stageSection.locator('button:has-text("Science & Observation")');
    await scienceCatBtn.click();

    // Check activity title and expected output
    await expect(stageSection).toContainText("Observe How Plants Seek the Light");
    await expect(stageSection).toContainText("A mini 4-day field journal containing sketches");

    // Check reflection sandbox prompt
    await expect(stageSection).toContainText("What surprised you about how the shoot in the dark box navigated toward the tiny light beam?");

    // Type a reflection in the textarea
    const textarea = stageSection.locator("textarea");
    await textarea.fill("It bent like an elbow to reach the light beam from the hole.");

    // Submit reflection
    const submitBtn = stageSection.locator('button:has-text("Test Reflection")');
    await submitBtn.click();

    // Check feedback rendered with Partner's Encouraging Feedback
    await expect(stageSection).toContainText("My Partner's Encouraging Feedback:");
    await expect(stageSection).toContainText("Fascinating scientific observation!");
    await expect(stageSection).toContainText("Demonstration Preview");
  });

  test("5. Public preview works without account creation and does not collect child data", async ({ page }) => {
    const stageSection = page.locator("#school-stages");
    await expect(stageSection).toContainText("Public Preview Safety: No accounts, no cookies, and no personal student data collected in this public demonstration.");

    // Verify interactive exploration does not redirect or prompt login
    await expect(page).toHaveURL(/\/school/);
  });

  test("6. 'Look What You Can Create' section renders illustrative student creations with disclaimer", async ({ page }) => {
    const creationsSection = page.locator("#student-creations");
    await expect(creationsSection).toBeVisible();
    await expect(creationsSection).toContainText("Look what you can create.");
    await expect(creationsSection).toContainText("Illustrative conceptual examples demonstrating possibilities · Not real student profiles or live submissions");

    // 4 creation projects
    await expect(creationsSection).toContainText("The Curious Robot & The Garden Snail");
    await expect(creationsSection).toContainText("Neighborhood Micro-Composting Flow");
    await expect(creationsSection).toContainText("Campus Cold-Brew Cafe Unit Model");
    await expect(creationsSection).toContainText("Exoplanet Transit Light Curve Micro-Sim");

    // Click on a creation card
    const compostingCard = creationsSection.locator('h3:has-text("Neighborhood Micro-Composting Flow")');
    await compostingCard.click();
    await expect(creationsSection).toContainText("Decomposition Biology");
  });

  test("7. My Partner in school context simulates supportive reflection and enforces ethical guardrails", async ({ page }) => {
    const partnerSection = page.locator("#my-partner-school");
    await expect(partnerSection).toBeVisible();
    await expect(partnerSection).toContainText("My Partner. A friendly guide, not a judge.");
    await expect(partnerSection).toContainText("Interactive Demonstration Preview");

    // Click a reflection prompt
    const promptBtn = partnerSection.locator('button:has-text("Can you explain how you solved that?")');
    await promptBtn.click();

    // Check dialogue update
    await expect(partnerSection).toContainText("I love how you broke that puzzle into smaller pieces!");

    // Check strict guardrails
    await expect(partnerSection).toContainText("What My Partner Never Does");
    await expect(partnerSection).toContainText("You are destined to become an engineer.");
    await expect(partnerSection).toContainText("Your intelligence score is 94%.");
    await expect(partnerSection).toContainText("You are unsuitable for science.");
  });

  test("8. Parent and School Partnership sections render with honest non-ERP disclosures", async ({ page }) => {
    // Parent experience
    const parentSection = page.locator("#parent-support");
    await expect(parentSection).toBeVisible();
    await expect(parentSection).toContainText("Learning is better when we explore together.");
    await expect(parentSection).toContainText("Supportive Conversations at Home");
    await expect(parentSection).toContainText("Curiosity-Led Dialogue:");
    await expect(parentSection).toContainText("Guardian Privacy Promise:");

    // School partnership
    const schoolPartnershipSection = page.locator("#school-partnerships");
    await expect(schoolPartnershipSection).toBeVisible();
    await expect(schoolPartnershipSection).toContainText("Bring exploration into your school.");
    await expect(schoolPartnershipSection).toContainText("Clear Scope & Honest Disclosure");
    await expect(schoolPartnershipSection).toContainText("Next Move AI is not a school ERP, teacher management portal, attendance tracker, or commercial entrance coaching system.");
  });

  test("9. Navigation anchors, CTAs and cross-audience cards link to valid destinations", async ({ page }) => {
    // FAQ section exists
    const faqSection = page.locator("#school-faqs");
    await expect(faqSection).toBeVisible();
    await expect(faqSection).toContainText("Common Questions from Students & Families");

    // Final CTA
    const finalSection = page.locator('section:has-text("Every child has a spark of curiosity.")');
    await expect(finalSection).toBeVisible();
    const startExploringBtn = finalSection.locator('a:has-text("Start Exploring")').first();
    await expect(startExploringBtn).toHaveAttribute("href", "/get-started/student?stage=classes-4-7");

    // Cross-audience cards
    const collegeCard = page.locator('a[href="/college"]').first();
    await expect(collegeCard).toBeVisible();

    const profCard = page.locator('a[href="/professionals"]').first();
    await expect(profCard).toBeVisible();
  });

  test("10. Zero horizontal overflow across all 5 responsive viewports", async ({ page }) => {
    const viewports = [
      { width: 360, height: 740, name: "mobile-360" },
      { width: 390, height: 844, name: "mobile-390" },
      { width: 768, height: 1024, name: "tablet-768" },
      { width: 1280, height: 800, name: "desktop-1280" },
      { width: 1440, height: 900, name: "desktop-1440" },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(100);

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(
        hasHorizontalScroll,
        `Viewport ${vp.name} (${vp.width}px) should not have horizontal scroll`
      ).toBe(false);
    }
  });
});
