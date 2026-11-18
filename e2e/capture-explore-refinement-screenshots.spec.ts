import { test } from "@playwright/test";

const SCREENSHOT_DIR = "C:/Users/ravit/.gemini/antigravity/brain/dbe4277a-7bf2-48c4-a3c8-b02cbc825b13/screenshots";

test.describe("Explore Activity Refinement Screenshots", () => {
  test("Capture Visual Verification Screenshots Across Tiers and Viewports", async ({ page }) => {
    // ----------------------------------------------------
    // Desktop Viewport: 1440px
    // ----------------------------------------------------
    await page.setViewportSize({ width: 1440, height: 950 });
    await page.goto("http://localhost:3000/");
    const explorer = page.locator("#explorer");
    await explorer.scrollIntoViewIfNeeded();

    // 1. Classes 4-7 Foundation - Technology Robot
    await explorer.locator('button[role="radio"]:has-text("Classes 4 – 7")').click();
    await explorer.locator('button[role="radio"]:has-text("Technology & Making")').click();
    await explorer.locator('button:has-text("Rocket Hop")').click();
    await page.waitForTimeout(400);
    await explorer.screenshot({
      path: `${SCREENSHOT_DIR}/activity-refinement-1440px-classes4-7-robot.png`,
    });

    // 2. Classes 4-7 Foundation - Creativity Poster
    await explorer.locator('button[role="radio"]:has-text("Art & Creativity")').click();
    await explorer.locator('button:has-text("Sunny Yellow & Purple")').click();
    await page.waitForTimeout(400);
    await explorer.screenshot({
      path: `${SCREENSHOT_DIR}/activity-refinement-1440px-classes4-7-poster.png`,
    });

    // 3. Classes 4-7 Foundation - Science Bloom
    await explorer.locator('button[role="radio"]:has-text("Science & Nature")').click();
    await explorer.locator('button:has-text("Invite a Friendly Bee")').click();
    await page.waitForTimeout(400);
    await explorer.screenshot({
      path: `${SCREENSHOT_DIR}/activity-refinement-1440px-classes4-7-science.png`,
    });

    // 4. Classes 11-12 Pre-University - Technology Delivery
    await explorer.locator('button[role="radio"]:has-text("Classes 11 – 12")').click();
    await explorer.locator('button[role="radio"]:has-text("Technology & Making")').click();
    await explorer.locator('button:has-text("Pedestrian Safety")').click();
    await page.waitForTimeout(400);
    await explorer.screenshot({
      path: `${SCREENSHOT_DIR}/activity-refinement-1440px-classes11-12-tech.png`,
    });

    // 5. Classes 11-12 Pre-University - Business Kit
    await explorer.locator('button[role="radio"]:has-text("Ideas & Business")').click();
    await explorer.locator('button:has-text("Starter Maker Kit")').click();
    await page.waitForTimeout(400);
    await explorer.screenshot({
      path: `${SCREENSHOT_DIR}/activity-refinement-1440px-classes11-12-business.png`,
    });

    // 6. Classes 11-12 Pre-University - Community Transit
    await explorer.locator('button[role="radio"]:has-text("People & Community")').click();
    await explorer.locator('button:has-text("Protected Crossings")').click();
    await page.waitForTimeout(400);
    await explorer.screenshot({
      path: `${SCREENSHOT_DIR}/activity-refinement-1440px-classes11-12-community.png`,
    });

    // 7. Degree Applied - Smart Grid Power Router
    await explorer.locator('button[role="radio"]:has-text("Degree / Engineering")').click();
    await explorer.locator('button[role="radio"]:has-text("Technology & Making")').click();
    await explorer.locator('button:has-text("Research Computing Lab")').click();
    await page.waitForTimeout(400);
    await explorer.screenshot({
      path: `${SCREENSHOT_DIR}/activity-refinement-1440px-degree-smartgrid.png`,
    });

    // ----------------------------------------------------
    // Responsive Mobile: 390px (iPhone 14 / modern mobile)
    // ----------------------------------------------------
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/");
    await explorer.scrollIntoViewIfNeeded();
    await explorer.locator('button[role="radio"]:has-text("Classes 4 – 7")').click();
    await explorer.locator('button[role="radio"]:has-text("Technology & Making")').click();
    await explorer.locator('button:has-text("Step Forward")').click();
    await page.waitForTimeout(400);
    await explorer.screenshot({
      path: `${SCREENSHOT_DIR}/activity-refinement-390px-mobile.png`,
    });

    // ----------------------------------------------------
    // Responsive Compact Mobile: 360px
    // ----------------------------------------------------
    await page.setViewportSize({ width: 360, height: 740 });
    await explorer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await explorer.screenshot({
      path: `${SCREENSHOT_DIR}/activity-refinement-360px-compact.png`,
    });

    // ----------------------------------------------------
    // Responsive Tablet: 768px (iPad)
    // ----------------------------------------------------
    await page.setViewportSize({ width: 768, height: 1024 });
    await explorer.scrollIntoViewIfNeeded();
    await explorer.locator('button[role="radio"]:has-text("Classes 11 – 12")').click();
    await page.waitForTimeout(400);
    await explorer.screenshot({
      path: `${SCREENSHOT_DIR}/activity-refinement-768px-tablet.png`,
    });

    // ----------------------------------------------------
    // Desktop: 1024px
    // ----------------------------------------------------
    await page.setViewportSize({ width: 1024, height: 768 });
    await explorer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await explorer.screenshot({
      path: `${SCREENSHOT_DIR}/activity-refinement-1024px-desktop.png`,
    });
  });
});
