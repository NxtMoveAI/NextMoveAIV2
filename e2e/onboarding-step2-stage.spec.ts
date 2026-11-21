import { test, expect } from "@playwright/test";

test.describe("Onboarding Step 2 — Academic Stage Selection", () => {
  test("1. Renders Step 2 with all exactly 7 academic stage options", async ({ page }) => {
    await page.goto("/get-started/student");

    await expect(page.locator("text=Step 2: Academic Stage")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Where are you in your learning journey?" })
    ).toBeVisible();

    // Verify all 7 options are visible using data-stage
    const stageRadios = page.locator('div[role="radio"][data-stage]');
    await expect(stageRadios).toHaveCount(7);

    await expect(page.locator('div[data-stage="classes-4-7"]')).toBeVisible();
    await expect(page.locator('div[data-stage="classes-8-10"]')).toBeVisible();
    await expect(page.locator('div[data-stage="classes-11-12"]')).toBeVisible();
    await expect(page.locator('div[data-stage="diploma"]')).toBeVisible();
    await expect(page.locator('div[data-stage="degree"]')).toBeVisible();
    await expect(page.locator('div[data-stage="engineering"]')).toBeVisible();
    await expect(page.locator('div[data-stage="working-professional"]')).toBeVisible();

    // Verify label texts
    await expect(page.locator('div[data-stage="classes-4-7"] span.font-extrabold')).toHaveText("Class 4–7");
    await expect(page.locator('div[data-stage="classes-8-10"] span.font-extrabold')).toHaveText("Class 8–10");
    await expect(page.locator('div[data-stage="classes-11-12"] span.font-extrabold')).toHaveText("Class 11–12");
    await expect(page.locator('div[data-stage="diploma"] span.font-extrabold')).toHaveText("Diploma");
    await expect(page.locator('div[data-stage="degree"] span.font-extrabold')).toHaveText("Degree");
    await expect(page.locator('div[data-stage="engineering"] span.font-extrabold')).toHaveText("Engineering");
    await expect(page.locator('div[data-stage="working-professional"] span.font-extrabold')).toHaveText("Working Professional");
  });

  test("2. Continue button is disabled until an academic stage is selected", async ({ page }) => {
    await page.goto("/get-started/student");

    const continueBtn = page.locator('button:has-text("Select an Academic Stage to Continue")');
    await expect(continueBtn).toBeDisabled();

    // All 7 options should be unselected initially
    const stageRadios = page.locator('div[role="radio"][data-stage]');
    const count = await stageRadios.count();
    for (let i = 0; i < count; i++) {
      await expect(stageRadios.nth(i)).toHaveAttribute("aria-checked", "false");
    }
  });

  test("3. Selecting each of the 7 options highlights it and enables Continue", async ({ page }) => {
    await page.goto("/get-started/student");

    const stageIds = [
      "classes-4-7",
      "classes-8-10",
      "classes-11-12",
      "diploma",
      "degree",
      "engineering",
      "working-professional",
    ];

    for (const id of stageIds) {
      const card = page.locator(`div[data-stage="${id}"]`);
      await card.click();

      // Card is highlighted
      await expect(card).toHaveAttribute("aria-checked", "true");

      // Continue is enabled with Confirm & Continue
      const continueBtn = page.locator('button:has-text("Confirm & Continue")');
      await expect(continueBtn).toBeEnabled();
    }
  });

  test("4. Clicking Continue navigates to next step and preserves stage in query", async ({ page }) => {
    await page.goto("/get-started/student");

    // Select Engineering
    await page.locator('div[data-stage="engineering"]').click();

    const continueBtn = page.locator('button:has-text("Confirm & Continue")');
    await continueBtn.click();

    await expect(page).toHaveURL(/\/get-started\/student\/access\?stage=engineering/);
  });

  test("5. Working Professional selection hands off correctly without redirecting away", async ({ page }) => {
    await page.goto("/get-started/student");

    // Select Working Professional
    const wpCard = page.locator('div[data-stage="working-professional"]');
    await wpCard.click();
    await expect(wpCard).toHaveAttribute("aria-checked", "true");

    const continueBtn = page.locator('button:has-text("Confirm & Continue")');
    await expect(continueBtn).toBeEnabled();
    await continueBtn.click();

    await expect(page).toHaveURL(/\/get-started\/student\/access\?stage=working-professional/);
  });

  test("6. Back navigation returns to Step 1 preserving role context", async ({ page }) => {
    await page.goto("/get-started/student");

    const backLink = page.locator('header a:has-text("Change Role")');
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute("href", "/get-started?role=student");

    await backLink.click();
    await expect(page).toHaveURL(/\/get-started/);
  });

  test("7. Capture visual screenshots of Step 2", async ({ page }) => {
    await page.goto("/get-started/student");
    await page.screenshot({
      path: "C:/Users/havya/.gemini/antigravity/brain/f4597f5d-ca23-49fa-ad19-b1f1a04c857a/onboarding-step2-unselected.png",
    });

    await page.locator('div[data-stage="engineering"]').click();
    await page.screenshot({
      path: "C:/Users/havya/.gemini/antigravity/brain/f4597f5d-ca23-49fa-ad19-b1f1a04c857a/onboarding-step2-engineering-selected.png",
    });

    await page.locator('div[data-stage="working-professional"]').click();
    await page.screenshot({
      path: "C:/Users/havya/.gemini/antigravity/brain/f4597f5d-ca23-49fa-ad19-b1f1a04c857a/onboarding-step2-wp-selected.png",
    });
  });
});
