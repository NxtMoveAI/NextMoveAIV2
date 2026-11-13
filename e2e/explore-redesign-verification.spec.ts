import { test, expect } from "@playwright/test";
import path from "path";

const SCREENSHOT_DIR = "C:/Users/ravit/.gemini/antigravity/brain/dbe4277a-7bf2-48c4-a3c8-b02cbc825b13/screenshots";

test.describe("Landing Page Explore Section Redesign 2.1 — Verification Suite", () => {
  test("1. Verify Introduction, Default Neutral State, and Honest Disclosure", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    const explorer = page.locator("#explorer");
    await expect(explorer).toBeVisible();

    // 1. Verify Simplified Section Headline & Subtext
    await expect(explorer).toContainText("What are you");
    await expect(explorer).toContainText("curious");
    await expect(explorer).toContainText("about today?");
    await expect(explorer).toContainText(
      "Pick something that interests you, try a quick activity, and discover where your curiosity could lead."
    );

    // 2. Verify Default Neutral State (No stage pre-selected)
    const class12Radio = explorer.locator('button[role="radio"]:has-text("Classes 11 – 12")');
    await expect(class12Radio).toHaveAttribute("aria-checked", "false");
    await expect(explorer).toContainText("Click your stage to begin");
    await expect(explorer).toContainText("Ready to explore your possibilities?");

    // 3. Verify No Developer-Facing Jargon
    const explorerText = await explorer.innerText();
    expect(explorerText).not.toContain("Deterministic local preview");
    expect(explorerText).not.toContain("Zero Backend Calls");
    expect(explorerText).not.toContain("Optional Activity Previews for Future Exploration");
    expect(explorerText).not.toContain("Sample Learning & Decision Clarity");
  });

  test("2. Verify All 6 Academic Cohorts and Selection Behavior", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    const explorer = page.locator("#explorer");

    const cohorts = [
      { name: "Classes 4 – 7", sublabel: "Middle School" },
      { name: "Classes 8 – 10", sublabel: "High School" },
      { name: "Classes 11 – 12", sublabel: "Pre-University" },
      { name: "Diploma", sublabel: "Polytechnic & Applied" },
      { name: "Degree / Engineering", sublabel: "Undergraduate" },
      { name: "Final Year / Graduate", sublabel: "Career Launch" },
    ];

    for (const cohort of cohorts) {
      const btn = explorer.locator(`button[role="radio"]:has-text("${cohort.name}")`);
      await expect(btn).toBeVisible();
      await btn.click();
      await expect(btn).toHaveAttribute("aria-checked", "true");
      await expect(explorer).toContainText(`Selected: ${cohort.name}`);
    }
  });

  test("3. Verify All 6 Curiosities and Interactive Challenge Functionality", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    const explorer = page.locator("#explorer");

    // Select Classes 11 - 12
    await explorer.locator('button[role="radio"]:has-text("Classes 11 – 12")').click();

    // 1. Technology & Making
    await explorer.locator('button[role="radio"]:has-text("Technology & Making")').click();
    await expect(explorer).toContainText("30-Second Hands-On Micro-Challenge");
    await expect(explorer).toContainText("Target #58");
    // Click Node 6 (Target 58)
    const node6 = explorer.locator('button:has-text("Node 6")');
    await node6.click();
    await expect(explorer).toContainText("Target #58 found");
    // Click Reset
    const resetBtn = explorer.locator('button[aria-label="Reset Challenge"]');
    await resetBtn.click();
    await expect(explorer).toContainText("Target #58 active");

    // 2. Art & Creativity
    await explorer.locator('button[role="radio"]:has-text("Art & Creativity")').click();
    await expect(explorer).toContainText("Visual Hierarchy & Design Tuner");
    const contrastBtn = explorer.locator('button:has-text("Text Contrast:")');
    await contrastBtn.click();
    await expect(explorer).toContainText("Live Layout Poster");

    // 3. Ideas & Business
    await explorer.locator('button[role="radio"]:has-text("Ideas & Business")').click();
    await expect(explorer).toContainText("Fixed Costs: ₹30,000");
    const tier499 = explorer.locator('button:has-text("₹499")');
    await tier499.click();
    await expect(explorer).toContainText("120 students");
    await expect(explorer).toContainText("₹29,880");

    // 4. Science & Nature
    await explorer.locator('button[role="radio"]:has-text("Science & Nature")').click();
    await expect(explorer).toContainText("Enzyme Temperature & Reaction Lab");
    const temp37 = explorer.locator('button:has-text("37°C")');
    await temp37.click();
    await expect(explorer).toContainText("100%");
    await expect(explorer).toContainText("Optimal Body Temperature");

    // 5. People & Community
    await explorer.locator('button[role="radio"]:has-text("People & Community")').click();
    await expect(explorer).toContainText("Health Science Lab");
    const aerobicBtn = explorer.locator('button:has-text("Active Movement")');
    await aerobicBtn.click();
    await expect(explorer).toContainText("138 bpm");

    // 6. Still Exploring
    await explorer.locator('button[role="radio"]:has-text("Still Exploring")').click();
    await expect(explorer).toContainText("Pick what naturally pulls your curiosity");
    const systemsDim = explorer.locator('button:has-text("Digital Systems & Logic")');
    await systemsDim.click();
    await expect(explorer).toContainText("Interdisciplinary Directions:");
  });

  test("4. Verify Progressive Disclosure: Curated Options, Expandable Details, and Dominant CTA", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    const explorer = page.locator("#explorer");

    // Select Diploma
    await explorer.locator('button[role="radio"]:has-text("Diploma")').click();
    await explorer.locator('button[role="radio"]:has-text("Technology & Making")').click();

    // Verify Curated Options (Possibilities Unfolded)
    await expect(explorer).toContainText("You might enjoy exploring:");
    await expect(explorer).toContainText("Option 01");
    await expect(explorer).toContainText("Option 02");
    await expect(explorer).toContainText("Option 03");

    // Verify Expandable Details Accordion
    const expandBtn = explorer.locator('button[aria-expanded="false"]:has-text("Preview Deeper Project Trials")');
    await expect(expandBtn).toBeVisible();
    await expandBtn.click();

    // Verify expanded content (Practical trial & guidance insights)
    await expect(explorer).toContainText("Practical Trial Preview");
    await expect(explorer).toContainText("Estimated time:");
    await expect(explorer).toContainText("First Hands-On Step:");
    await expect(explorer).toContainText("Self-Reflection Prompt:");
    await expect(explorer).toContainText("Curated Guidance Insights for Diploma:");

    // Verify Dominant Primary CTA
    const cta = explorer.locator('a:has-text("Continue My Journey")');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/get-started/student?stage=diploma");
    await expect(cta).toContainText("Continue My Journey");
    await expect(cta).toContainText("Diploma");
  });

  test("5. Capture Visual Verification Screenshots across Viewports", async ({ page }) => {
    // ----------------------------------------------------
    // 1440px Desktop Captures
    // ----------------------------------------------------
    await page.setViewportSize({ width: 1440, height: 950 });
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(600);
    const explorer = page.locator("#explorer");
    await explorer.scrollIntoViewIfNeeded();

    // Screenshot 1: Desktop Default Neutral State
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "explore-redesign-1440px-neutral.png"),
      fullPage: false,
    });

    // Screenshot 2: Classes 11–12 + Technology & Making
    await explorer.locator('button[role="radio"]:has-text("Classes 11 – 12")').click();
    await explorer.locator('button[role="radio"]:has-text("Technology & Making")').click();
    await page.waitForTimeout(300);
    await explorer.screenshot({
      path: path.join(SCREENSHOT_DIR, "explore-redesign-1440px-classes11-12-tech.png"),
    });

    // Screenshot 3: Classes 4–7 + Art & Creativity
    await explorer.locator('button[role="radio"]:has-text("Classes 4 – 7")').click();
    await explorer.locator('button[role="radio"]:has-text("Art & Creativity")').click();
    await page.waitForTimeout(300);
    await explorer.screenshot({
      path: path.join(SCREENSHOT_DIR, "explore-redesign-1440px-classes4-7-creative.png"),
    });

    // Screenshot 4: Degree / Engineering + Ideas & Business
    await explorer.locator('button[role="radio"]:has-text("Degree / Engineering")').click();
    await explorer.locator('button[role="radio"]:has-text("Ideas & Business")').click();
    await page.waitForTimeout(300);
    await explorer.screenshot({
      path: path.join(SCREENSHOT_DIR, "explore-redesign-1440px-degree-business.png"),
    });

    // Screenshot 5: Diploma + Science & Nature
    await explorer.locator('button[role="radio"]:has-text("Diploma")').click();
    await explorer.locator('button[role="radio"]:has-text("Science & Nature")').click();
    await page.waitForTimeout(300);
    await explorer.screenshot({
      path: path.join(SCREENSHOT_DIR, "explore-redesign-1440px-diploma-science.png"),
    });

    // Screenshot 6: Final Year / Graduate + People & Community
    await explorer.locator('button[role="radio"]:has-text("Final Year / Graduate")').click();
    await explorer.locator('button[role="radio"]:has-text("People & Community")').click();
    await page.waitForTimeout(300);
    await explorer.screenshot({
      path: path.join(SCREENSHOT_DIR, "explore-redesign-1440px-finalyear-impact.png"),
    });

    // Screenshot 7: Still Exploring Curiosity Compass
    await explorer.locator('button[role="radio"]:has-text("Still Exploring")').click();
    await explorer.locator('button:has-text("Digital Systems & Logic")').click();
    await page.waitForTimeout(300);
    await explorer.screenshot({
      path: path.join(SCREENSHOT_DIR, "explore-redesign-1440px-still-exploring.png"),
    });

    // Screenshot 8: Expanded Curriculum & Practical Trial Breakdown
    const expandBtn = explorer.locator('button[aria-expanded="false"]:has-text("Preview Deeper Project Trials")');
    if (await expandBtn.isVisible()) {
      await expandBtn.click();
      await page.waitForTimeout(300);
    }
    await explorer.screenshot({
      path: path.join(SCREENSHOT_DIR, "explore-redesign-1440px-expanded-details.png"),
    });

    // ----------------------------------------------------
    // 390px Mobile Captures
    // ----------------------------------------------------
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(600);
    const mobileExplorer = page.locator("#explorer");
    await mobileExplorer.scrollIntoViewIfNeeded();

    // Screenshot 9: Mobile Default Neutral State
    await mobileExplorer.screenshot({
      path: path.join(SCREENSHOT_DIR, "explore-redesign-390px-neutral.png"),
    });

    // Screenshot 10: Mobile Active Challenge View (Classes 11–12 + Tech)
    await mobileExplorer.locator('button[role="radio"]:has-text("Classes 11 – 12")').click();
    await page.waitForTimeout(300);
    await mobileExplorer.screenshot({
      path: path.join(SCREENSHOT_DIR, "explore-redesign-390px-active-challenge.png"),
    });

    // ----------------------------------------------------
    // 360px Compact Mobile Capture
    // ----------------------------------------------------
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(500);
    const compactExplorer = page.locator("#explorer");
    await compactExplorer.scrollIntoViewIfNeeded();
    await compactExplorer.screenshot({
      path: path.join(SCREENSHOT_DIR, "explore-redesign-360px-compact.png"),
    });

    // ----------------------------------------------------
    // 768px Tablet & 1024px Small Desktop Captures
    // ----------------------------------------------------
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(500);
    const tabletExplorer = page.locator("#explorer");
    await tabletExplorer.scrollIntoViewIfNeeded();
    await tabletExplorer.screenshot({
      path: path.join(SCREENSHOT_DIR, "explore-redesign-768px-tablet.png"),
    });

    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(500);
    const smallDeskExplorer = page.locator("#explorer");
    await smallDeskExplorer.scrollIntoViewIfNeeded();
    await smallDeskExplorer.screenshot({
      path: path.join(SCREENSHOT_DIR, "explore-redesign-1024px-desktop.png"),
    });
  });
});

