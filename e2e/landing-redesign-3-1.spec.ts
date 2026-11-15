import { test, expect } from "@playwright/test";

const SCREENSHOT_DIR = "C:/Users/ravit/.gemini/antigravity/brain/dbe4277a-7bf2-48c4-a3c8-b02cbc825b13/screenshots";

test.describe("Landing Page Experience Redesign 3.1 — Verification Suite", () => {
  test("1. Section A (How It Works): Verify 4 interactive illustrated stages", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#how-it-works");
    await expect(section).toBeVisible();

    // Verify Headline & Supporting Text
    await expect(section).toContainText("A little curiosity can lead to big discoveries.");
    await expect(section).toContainText(
      "Discover what you enjoy, try new things, and keep growing—one step at a time."
    );

    // Verify 4 stages exist
    await expect(section.locator('button:has-text("Discover")')).toBeVisible();
    await expect(section.locator('button:has-text("Explore")')).toBeVisible();
    await expect(section.locator('button:has-text("Try")')).toBeVisible();
    await expect(section.locator('button:has-text("Grow")')).toBeVisible();

    // Stage 1 (Discover) active by default
    await expect(section).toContainText("What do you love exploring?");
    await expect(section).toContainText("Sample Discovery Spark");

    // Click Stage 2 (Explore)
    await section.locator('button:has-text("Explore")').click();
    await expect(section).toContainText("See what else is possible.");
    await expect(section).toContainText("Sample Pathway View");

    // Click Stage 3 (Try)
    await section.locator('button:has-text("Try")').click();
    await expect(section).toContainText("Give something new a go!");
    await expect(section).toContainText("Sample 15-Min Trial");

    // Click Stage 4 (Grow)
    await section.locator('button:has-text("Grow")').click();
    await expect(section).toContainText("Take your next step, your way.");
    await expect(section).toContainText("Sample Reflection Map");
  });

  test("2. Section B (Platform Previews): Verify 3 interactive experiences (Explore, Try, Plan)", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#experiences");
    await expect(section).toBeVisible();

    // Verify Headline & Supporting Text
    await expect(section).toContainText("See what you can do with Next Move AI.");
    await expect(section).toContainText(
      "Explore ideas, try activities, and turn discoveries into your next step."
    );

    // Verify 3 tabs exist
    const exploreTab = section.locator('#preview-tab-explore');
    const tryTab = section.locator('#preview-tab-try');
    const planTab = section.locator('#preview-tab-plan');
    await expect(exploreTab).toBeVisible();
    await expect(tryTab).toBeVisible();
    await expect(planTab).toBeVisible();

    // Preview 1 (Explore) interactions
    await exploreTab.click();
    await expect(section).toContainText("Pick an interest to see what you could discover");
    const natureBtn = section.locator('button:has-text("Nature & Science")');
    await natureBtn.click();
    await expect(section).toContainText("Sprout Lab Observation");

    // Preview 2 (Try) interactions
    await tryTab.click();
    await expect(section).toContainText("Try a 15-minute low-stakes project");
    const plantMiniBtn = section.locator('button:has-text("Help the Plant Grow")');
    await plantMiniBtn.click();
    await expect(section).toContainText("Sunlight + Water = Healthy Photosynthesis Bloom!");

    // Preview 3 (Plan) interactions
    await planTab.click();
    await expect(section).toContainText("A visual learning plan shaped by you");
    await expect(section).toContainText("2 of 3 steps completed");
    // Toggle task 3
    const task3 = section.locator('button:has-text("Reflect on What You Enjoyed")');
    await task3.click();
    await expect(section).toContainText("3 of 3 steps completed");
  });

  test("3. Section C (My Partner): Verify interactive chat illustration & 3 question chips", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#my-partner");
    await expect(section).toBeVisible();

    // Verify Headline & Supporting Text
    await expect(section).toContainText("Have a question? My Partner is here to help.");
    await expect(section).toContainText(
      "Explore your ideas, ask questions, and discover a next step that feels right for you."
    );

    // Question 1 (Curiosity) active by default
    await expect(section).toContainText("I like drawing and science. Can I explore both?");
    await expect(section).toContainText("Of course! You don't have to choose just one interest.");
    await expect(section).toContainText("Explore an Activity");

    // Question 2 (Uncertainty)
    const q2Btn = section.locator('button:has-text("Not Sure What to Learn")');
    await q2Btn.click();
    await expect(section).toContainText("I'm not sure what I want to learn next.");
    await expect(section).toContainText("That's completely normal—most great discoveries start with not being sure!");
    await expect(section).toContainText("Try a Discovery Activity");

    // Question 3 (Growth)
    const q3Btn = section.locator('button:has-text("Start a Small Project")');
    await q3Btn.click();
    await expect(section).toContainText("Can you help me start a small project?");
    await expect(section).toContainText("A great first project takes under 30 minutes");
    await expect(section).toContainText("Pick a Project Spark");
  });

  test("4. Section D (Continuous Growth): Verify Living Learning Garden interaction", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#continuous-growth");
    await expect(section).toBeVisible();

    // Verify Headline & Supporting Text
    await expect(section).toContainText("Your curiosity grows with you.");
    await expect(section).toContainText(
      "Your interests can change. Every experience helps you discover something new."
    );

    // Step 1: Explore
    await expect(section).toContainText("A Seed of Curiosity");
    await expect(section).toContainText("You discover an idea that catches your eye.");

    // Step 2: Try
    await section.locator('button:has-text("2. Try")').click();
    await expect(section).toContainText("Hands-On Experiments");
    await expect(section).toContainText("You build a mini project and test what doing the work feels like.");

    // Step 3: Reflect
    await section.locator('button:has-text("3. Reflect")').click();
    await expect(section).toContainText("Understanding What You Enjoy");
    await expect(section).toContainText("You reflect on what felt fun and what felt challenging.");

    // Step 4: Grow
    await section.locator('button:has-text("4. Grow")').click();
    await expect(section).toContainText("An Expanding World");
    await expect(section).toContainText("Your confidence expands, and you decide your next move on your own terms.");
  });

  test("5. Section E (For Parents): Verify 3 benefits & interactive Family Conversation Cards", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#for-parents");
    await expect(section).toBeVisible();

    // Verify Headline & Supporting Text
    await expect(section).toContainText("Support their curiosity. Celebrate their growth.");
    await expect(section).toContainText(
      "Stay involved, have better conversations, and help your child explore with confidence."
    );

    // 3 benefits
    await expect(section).toContainText("Understand Their Journey");
    await expect(section).toContainText("Talk About Possibilities");
    await expect(section).toContainText("Support Their Choices");

    // Card 1
    await expect(section).toContainText("What was the most interesting thing you discovered this week?");
    await expect(section).toContainText("Card 01 of 05");

    // Cycle to Card 2
    const nextBtn = section.locator('button[aria-label="Next question card"]');
    await nextBtn.click();
    await expect(section).toContainText("Was there anything new you enjoyed trying recently?");
    await expect(section).toContainText("Card 02 of 05");

    // Cycle to Card 3
    await nextBtn.click();
    await expect(section).toContainText("What would you like to explore or build together?");
    await expect(section).toContainText("Card 03 of 05");
  });

  test("6. Section F (Trust): Verify 3 principles & expandable details", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#trust");
    await expect(section).toBeVisible();

    // Verify Headline & Supporting Text
    await expect(section).toContainText("Your journey. Your choices. Your trust.");
    await expect(section).toContainText(
      "We believe guidance should be clear, thoughtful, and respectful of every student."
    );

    // 3 Principles
    await expect(section).toContainText("You're in Control");
    await expect(section).toContainText("Honest Guidance");
    await expect(section).toContainText("Privacy Matters");

    // Core Highlights required by tests
    await expect(section).toContainText("The Student Remains in Control");
    await expect(section).toContainText("Why We Reject Artificial “Fit” Percentages");

    // Expand details on Principle 1
    const learnMoreBtn = section.locator('button:has-text("Learn More")').first();
    await learnMoreBtn.click();
    await expect(section).toContainText("We don’t decide careers; we enable clarity.");
    await expect(section.locator('button:has-text("Hide Details")')).toBeVisible();
  });

  test("7. Capture Visual Verification Screenshots across Sections and Viewports", async ({ page }) => {
    // ----------------------------------------------------
    // Desktop Viewport: 1440px
    // ----------------------------------------------------
    await page.setViewportSize({ width: 1440, height: 950 });
    await page.goto("/");
    await page.waitForTimeout(500);

    // Screenshot Section A: How It Works
    const howItWorks = page.locator("#how-it-works");
    await howItWorks.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await howItWorks.screenshot({
      path: `${SCREENSHOT_DIR}/redesign3-1-1440px-how-it-works.png`,
    });

    // Screenshot Section B: Platform Previews (Plan tab)
    const experiences = page.locator("#experiences");
    await experiences.scrollIntoViewIfNeeded();
    await experiences.locator("#preview-tab-plan").click();
    await page.waitForTimeout(300);
    await experiences.screenshot({
      path: `${SCREENSHOT_DIR}/redesign3-1-1440px-platform-previews.png`,
    });

    // Screenshot Section C: My Partner
    const myPartner = page.locator("#my-partner");
    await myPartner.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await myPartner.screenshot({
      path: `${SCREENSHOT_DIR}/redesign3-1-1440px-my-partner.png`,
    });

    // Screenshot Section D: Continuous Growth (Living Garden)
    const growth = page.locator("#continuous-growth");
    await growth.scrollIntoViewIfNeeded();
    await growth.locator('button:has-text("4. Grow")').click();
    await page.waitForTimeout(300);
    await growth.screenshot({
      path: `${SCREENSHOT_DIR}/redesign3-1-1440px-continuous-growth.png`,
    });

    // Screenshot Section E: For Parents (Family Card)
    const parents = page.locator("#for-parents");
    await parents.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await parents.screenshot({
      path: `${SCREENSHOT_DIR}/redesign3-1-1440px-for-parents.png`,
    });

    // Screenshot Section F: Trust & Transparency
    const trust = page.locator("#trust");
    await trust.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await trust.screenshot({
      path: `${SCREENSHOT_DIR}/redesign3-1-1440px-trust-transparency.png`,
    });

    // ----------------------------------------------------
    // Responsive Mobile Viewport: 390px (iPhone 14)
    // ----------------------------------------------------
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForTimeout(500);

    await howItWorks.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await howItWorks.screenshot({
      path: `${SCREENSHOT_DIR}/redesign3-1-390px-how-it-works.png`,
    });

    await experiences.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await experiences.screenshot({
      path: `${SCREENSHOT_DIR}/redesign3-1-390px-platform-previews.png`,
    });

    await myPartner.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await myPartner.screenshot({
      path: `${SCREENSHOT_DIR}/redesign3-1-390px-my-partner.png`,
    });

    await parents.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await parents.screenshot({
      path: `${SCREENSHOT_DIR}/redesign3-1-390px-for-parents.png`,
    });

    await trust.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await trust.screenshot({
      path: `${SCREENSHOT_DIR}/redesign3-1-390px-trust-transparency.png`,
    });
  });
});
