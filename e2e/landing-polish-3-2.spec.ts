import { test, expect } from "@playwright/test";

const SCREENSHOT_DIR = "C:/Users/ravit/.gemini/antigravity/brain/dbe4277a-7bf2-48c4-a3c8-b02cbc825b13/screenshots";

test.describe("Landing Page Final Visual Polish 3.2 — Verification Suite", () => {
  test("1. Section A (How It Works): Verify 4 interactive illustrated stages & rich SVG scenes", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#how-it-works");
    await expect(section).toBeVisible();

    // Verify Headline & Subtitle
    await expect(section).toContainText("A little curiosity can lead to big discoveries.");
    await expect(section).toContainText(
      "Discover what you enjoy, try new things, and keep growing—one step at a time."
    );

    // Verify 4 stage pill buttons
    await expect(section.locator('button:has-text("Discover")')).toBeVisible();
    await expect(section.locator('button:has-text("Explore")')).toBeVisible();
    await expect(section.locator('button:has-text("Try")')).toBeVisible();
    await expect(section.locator('button:has-text("Grow")')).toBeVisible();

    // Stage 1 (Discover) active by default
    await expect(section).toContainText("Notice what catches your curiosity.");
    await expect(section).toContainText("Real-world Spark");
    await expect(section.locator('svg[aria-label*="discovering interests"]')).toBeVisible();

    // Click Stage 2 (Explore)
    await section.locator('button:has-text("Explore")').click();
    await expect(section).toContainText("Connect interests to real-world possibilities.");
    await expect(section).toContainText("Pathway Connection");
    await expect(section.locator('svg[aria-label*="curated educational pathways"]')).toBeVisible();

    // Click Stage 3 (Try)
    await section.locator('button:has-text("Try")').click();
    await expect(section).toContainText("Test the work with a 15-minute trial.");
    await expect(section).toContainText("Hands-on Micro-Trial");
    await expect(section.locator('svg[aria-label*="15-minute hands-on"]')).toBeVisible();

    // Click Stage 4 (Grow)
    await section.locator('button:has-text("Grow")').click();
    await expect(section).toContainText("Shape your own path, one step at a time.");
    await expect(section).toContainText("Continuous Reflection");
    await expect(section.locator('svg[aria-label*="reflecting and choosing"]')).toBeVisible();
  });

  test("2. Section B (Platform Previews): Verify 3 interactive experiences & prominent work examples", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#experiences");
    await expect(section).toBeVisible();

    // Verify Headline
    await expect(section).toContainText("See what you can do with Next Move AI.");

    // Verify 3 tabs
    const exploreTab = section.locator('#preview-tab-explore');
    const tryTab = section.locator('#preview-tab-try');
    const planTab = section.locator('#preview-tab-plan');
    await expect(exploreTab).toBeVisible();
    await expect(tryTab).toBeVisible();
    await expect(planTab).toBeVisible();

    // Tab 1: Explore an Interest - Test interest switching
    await expect(section).toContainText("Storyboarding & Animation");
    await section.locator('button:has-text("Nature Lab")').click();
    await expect(section).toContainText("Field Observation & Botany");
    await section.locator('button:has-text("Maker Project")').click();
    await expect(section).toContainText("Friendly Maker Prototyping");

    // Tab 2: Try Something New
    await tryTab.click();
    await expect(section).toContainText("Try a 15-minute hands-on mini activity");
    await expect(section).toContainText("Activity Challenge: Arrange the Sequence");
    await section.locator('button:has-text("Seedling Observation")').click();
    await expect(section).toContainText("Experiment Challenge: Match the Variable");

    // Tab 3: Plan Your Next Step
    await planTab.click();
    await expect(section).toContainText("Plan your next step without pressure");
    await expect(section).toContainText("steps completed");

    // Toggle checklist
    const firstCheckbox = section.locator('button[aria-label*="Toggle"]').first();
    await firstCheckbox.click();
  });

  test("3. Section C (My Partner): Verify friendly avatar & 3 question chips", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#my-partner");
    await expect(section).toBeVisible();

    // Verify Headline
    await expect(section).toContainText("Have a question? My Partner is here to help.");

    // Verify 3 question chips
    await expect(section.locator('button:has-text("Drawing + Science")')).toBeVisible();
    await expect(section.locator('button:has-text("Not Sure What to Learn")')).toBeVisible();
    await expect(section.locator('button:has-text("Start a Small Project")')).toBeVisible();

    // Verify avatar SVG & disclosure
    await expect(section.locator('svg[aria-label="My Partner Assistant Avatar"]').first()).toBeVisible();
    await expect(section).toContainText("Illustrative sample conversation");

    // Click Uncertainty chip
    await section.locator('button:has-text("Not Sure What to Learn")').click();
    await expect(section).toContainText("I'm not sure what I want to learn next");
    await expect(section).toContainText("Every great explorer begins without knowing the whole map");

    // Click Small Project chip
    await section.locator('button:has-text("Start a Small Project")').click();
    await expect(section).toContainText("Can you help me start a small project this weekend?");
    await expect(section).toContainText("Pick a Project Spark");
  });

  test("4. Section D (Continuous Growth): Verify Living Learning Garden & student character scenes", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#continuous-growth");
    await expect(section).toBeVisible();

    // Verify Headline
    await expect(section).toContainText("Your curiosity grows with you.");

    // Verify 4 steps
    await expect(section.locator('button:has-text("1. Explore")')).toBeVisible();
    await expect(section.locator('button:has-text("2. Try")')).toBeVisible();
    await expect(section.locator('button:has-text("3. Reflect")')).toBeVisible();
    await expect(section.locator('button:has-text("4. Grow")')).toBeVisible();

    // Step 1: Explore (Notebook & curiosity sparks)
    await expect(section.locator('svg[aria-label*="exploring curiosity sparks"]')).toBeVisible();
    await expect(section).toContainText("A spark of curiosity begins your journey");

    // Step 2: Try (Building prototype on table)
    await section.locator('button:has-text("2. Try")').click();
    await expect(section.locator('svg[aria-label*="trying a hands-on project"]')).toBeVisible();
    await expect(section).toContainText("You build a project and test the work with your hands");

    // Step 3: Reflect (Pause, notes & insight cards)
    await section.locator('button:has-text("3. Reflect")').click();
    await expect(section.locator('svg[aria-label*="reflecting on learning experience"]')).toBeVisible();
    await expect(section).toContainText("You reflect on what felt exciting and what you'd change");

    // Step 4: Grow (Open horizon, multiple pathways)
    await section.locator('button:has-text("4. Grow")').click();
    await expect(section.locator('svg[aria-label*="Expanding learning landscape"]')).toBeVisible();
    await expect(section).toContainText("Your world expands, and you choose your next move");
  });

  test("5. Section E (For Parents): Verify warm illustration & interactive Family Cards", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#for-parents");
    await expect(section).toBeVisible();

    // Verify Headline
    await expect(section).toContainText("Support their curiosity. Celebrate their growth.");

    // Verify 3 Parent pillars
    await expect(section).toContainText("Understand Their Journey");
    await expect(section).toContainText("Talk About Possibilities");
    await expect(section).toContainText("Support Their Choices");

    // Verify Parent & Student illustration
    await expect(section.locator('svg[aria-label*="Parent and student discussing"]')).toBeVisible();

    // Verify Card 1
    await expect(section).toContainText("Card 01 of 05");
    await expect(section).toContainText("What was the most interesting idea you discovered this week?");

    // Cycle to Card 2
    const nextBtn = section.locator('button[aria-label="Next Conversation Card"]');
    await nextBtn.click();
    await expect(section).toContainText("Card 02 of 05");
    await expect(section).toContainText("Was there anything unfamiliar you enjoyed trying recently?");

    // Verify qualified scope note
    await expect(section).toContainText("*Guardian-student collaboration features to be linked upon account activation.");
  });

  test("6. Section F (Trust): Verify vector badges, clean labels & core principles", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#trust");
    await expect(section).toBeVisible();

    // Verify Headline
    await expect(section).toContainText("Your journey. Your choices. Your trust.");

    // Verify 3 principles
    await expect(section).toContainText("You're in Control");
    await expect(section).toContainText("Honest Guidance");
    await expect(section).toContainText("Privacy Matters");

    // Verify clean badges
    await expect(section).toContainText("Student Agency");
    await expect(section).toContainText("Objective Realities");
    await expect(section).toContainText("Safe Harbor");

    // Verify core assertions
    await expect(section).toContainText("The Student Remains in Control");
    await expect(section).toContainText("Why We Reject Artificial “Fit” Percentages");

    // Expand details on Principle 1
    const learnMoreBtn = section.locator('button:has-text("Learn More")').first();
    await learnMoreBtn.click();
    await expect(section).toContainText("We don’t decide careers; we enable clarity.");
    await expect(section.locator('button:has-text("Hide Details")')).toBeVisible();
  });

  test("7. Capture Visual Polish 3.2 Screenshots across Sections and Viewports", async ({ page }) => {
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
      path: `${SCREENSHOT_DIR}/polish3-2-1440px-how-it-works.png`,
    });

    // Screenshot Section B: Platform Previews (Explore tab)
    const experiences = page.locator("#experiences");
    await experiences.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await experiences.screenshot({
      path: `${SCREENSHOT_DIR}/polish3-2-1440px-platform-previews.png`,
    });

    // Screenshot Section C: My Partner
    const myPartner = page.locator("#my-partner");
    await myPartner.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await myPartner.screenshot({
      path: `${SCREENSHOT_DIR}/polish3-2-1440px-my-partner.png`,
    });

    // Screenshot Section D: Continuous Growth (Grow stage)
    const growth = page.locator("#continuous-growth");
    await growth.scrollIntoViewIfNeeded();
    await growth.locator('button:has-text("4. Grow")').click();
    await page.waitForTimeout(300);
    await growth.screenshot({
      path: `${SCREENSHOT_DIR}/polish3-2-1440px-continuous-growth.png`,
    });

    // Screenshot Section E: For Parents
    const parents = page.locator("#for-parents");
    await parents.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await parents.screenshot({
      path: `${SCREENSHOT_DIR}/polish3-2-1440px-for-parents.png`,
    });

    // Screenshot Section F: Trust & Transparency
    const trust = page.locator("#trust");
    await trust.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await trust.screenshot({
      path: `${SCREENSHOT_DIR}/polish3-2-1440px-trust-transparency.png`,
    });

    // ----------------------------------------------------
    // Mobile Viewport: 390px (iPhone 14/15 size)
    // ----------------------------------------------------
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForTimeout(500);

    // Section A Mobile
    await howItWorks.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await howItWorks.screenshot({
      path: `${SCREENSHOT_DIR}/polish3-2-390px-how-it-works.png`,
    });

    // Section B Mobile
    await experiences.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await experiences.screenshot({
      path: `${SCREENSHOT_DIR}/polish3-2-390px-platform-previews.png`,
    });

    // Section C Mobile
    await myPartner.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await myPartner.screenshot({
      path: `${SCREENSHOT_DIR}/polish3-2-390px-my-partner.png`,
    });

    // Section D Mobile
    await growth.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await growth.screenshot({
      path: `${SCREENSHOT_DIR}/polish3-2-390px-continuous-growth.png`,
    });

    // Section E Mobile
    await parents.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await parents.screenshot({
      path: `${SCREENSHOT_DIR}/polish3-2-390px-for-parents.png`,
    });

    // Section F Mobile
    await trust.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await trust.screenshot({
      path: `${SCREENSHOT_DIR}/polish3-2-390px-trust-transparency.png`,
    });
  });
});
