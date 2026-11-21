import { test, expect } from "@playwright/test";

test.describe("Onboarding Step 3 — Access & Safety", () => {
  test("1. Missing or invalid stage shows stage required warning", async ({ page }) => {
    // Missing stage
    await page.goto("/get-started/student/access");
    await expect(page.getByRole("heading", { name: "No Academic Stage Selected" })).toBeVisible();
    await expect(page.locator('a:has-text("Select Your Stage")')).toBeVisible();

    // Invalid stage
    await page.goto("/get-started/student/access?stage=invalid-stage-xyz");
    await expect(page.getByRole("heading", { name: "No Academic Stage Selected" })).toBeVisible();
    await expect(page.locator('a:has-text("Select Your Stage")')).toBeVisible();
  });

  test("2. Class 4–7 displays single 'Verify as Parent' button and navigates to Create Space", async ({ page }) => {
    await page.goto("/get-started/student/access?stage=classes-4-7");

    // Header & Badge check
    await expect(page.locator("text=Safety & Guardian Guidance")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Safety & access for young learners" })
    ).toBeVisible();
    await expect(page.getByText("Classes 4 – 7 (Middle School)").first()).toBeVisible();

    // Step indicator check
    await expect(page.locator("text=Step 3 of 4")).toBeVisible();
    await expect(page.locator("text=Access & Safety").first()).toBeVisible();

    // Option cards / radio groups should NOT be displayed
    const options = page.locator('div[role="radio"][data-option]');
    await expect(options).toHaveCount(0);

    // Single "Verify as Parent" button should be visible
    const verifyParentBtn = page.locator('button:has-text("Verify as Parent")');
    await expect(verifyParentBtn).toBeVisible();
    await expect(verifyParentBtn).toBeEnabled();

    // Clicking it navigates directly to Create Space (/sign-up/student)
    await verifyParentBtn.click();
    await page.waitForURL(/\/sign-up\/student\?.*stage=classes-4-7/);
  });

  test("3. Class 4–7 singular 'class-4-7' is normalized and displays 'Verify as Parent'", async ({ page }) => {
    await page.goto("/get-started/student/access?stage=class-4-7");

    await expect(
      page.getByRole("heading", { name: "Safety & access for young learners" })
    ).toBeVisible();

    const verifyParentBtn = page.locator('button:has-text("Verify as Parent")');
    await expect(verifyParentBtn).toBeVisible();
    await verifyParentBtn.click();

    await page.waitForURL(/\/sign-up\/student\?.*stage=classes-4-7/);
  });

  test("4. Class 8–10 displays single 'Verify as Parent' button and navigates to Create Space", async ({ page }) => {
    await page.goto("/get-started/student/access?stage=classes-8-10");

    await expect(page.locator("text=Teen Safety & Stream Exploration")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Safety & access for high school" })
    ).toBeVisible();
    await expect(page.getByText("Classes 8 – 10 (High School)").first()).toBeVisible();

    // Option cards should NOT be displayed
    const options = page.locator('div[role="radio"][data-option]');
    await expect(options).toHaveCount(0);

    // Single "Verify as Parent" button should be visible
    const verifyParentBtn = page.locator('button:has-text("Verify as Parent")');
    await expect(verifyParentBtn).toBeVisible();
    await expect(verifyParentBtn).toBeEnabled();

    // Clicking it navigates directly to Create Space (/sign-up/student)
    await verifyParentBtn.click();
    await page.waitForURL(/\/sign-up\/student\?.*stage=classes-8-10/);
  });

  test("5. Class 11–12 retains existing options and behavior", async ({ page }) => {
    await page.goto("/get-started/student/access?stage=classes-11-12");

    await expect(page.locator("text=Pre-University Decision Support")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Safety & access for higher secondary" })
    ).toBeVisible();
    await expect(page.getByText("Classes 11 – 12 (Pre-University / +2)").first()).toBeVisible();

    // Verify as Parent should NOT be present for Class 11-12
    await expect(page.locator('button:has-text("Verify as Parent")')).not.toBeVisible();

    // 2 Options should be present
    const options = page.locator('div[role="radio"][data-option]');
    await expect(options).toHaveCount(2);
    await expect(page.locator('div[data-option="teen_independent"]')).toBeVisible();
    await expect(page.locator('div[data-option="adult_autonomous"]')).toBeVisible();

    // Continue is initially disabled
    const continueBtn = page.locator('button:has-text("Select an Access Option to Continue")');
    await expect(continueBtn).toBeDisabled();

    // Select 18+ autonomous option
    await page.locator('div[data-option="adult_autonomous"]').click();
    const activeBtn = page.locator('button:has-text("Continue to Create Space")');
    await expect(activeBtn).toBeEnabled();
    await activeBtn.click();

    await page.waitForURL(/\/sign-up\/student\?.*stage=classes-11-12.*access=adult/);
  });

  test("6. Non-school stages bypass Access & Safety screen and redirect directly to Create Space", async ({ page }) => {
    // Degree bypasses
    await page.goto("/get-started/student/access?stage=degree");
    await page.waitForURL(/\/sign-up\/student\?.*stage=degree-engineering.*access=adult/);
    await expect(page.locator("text=Safety & Guardian Guidance")).not.toBeVisible();

    // Engineering bypasses
    await page.goto("/get-started/student/access?stage=engineering");
    await page.waitForURL(/\/sign-up\/student\?.*stage=degree-engineering.*access=adult/);

    // Diploma bypasses
    await page.goto("/get-started/student/access?stage=diploma");
    await page.waitForURL(/\/sign-up\/student\?.*stage=diploma.*access=adult/);

    // Working Professional bypasses
    await page.goto("/get-started/student/access?stage=working-professional");
    await page.waitForURL(/\/sign-up\/student\?.*stage=final-year-grad.*access=adult/);
  });

  test("7. Query parameters are preserved through 'Verify as Parent' and back links", async ({ page }) => {
    await page.goto(
      "/get-started/student/access?stage=classes-8-10&situation=discover&audience=school"
    );

    // Context badges rendered
    await expect(page.locator("text=Learning Situation: Discover")).toBeVisible();

    // Back link preserved
    const backLink = page.locator('a:has-text("Back to Stage")');
    await expect(backLink).toHaveAttribute(
      "href",
      "/get-started/student?stage=classes-8-10&situation=discover&audience=school"
    );

    // "Verify as Parent" preserves parameters
    await page.locator('button:has-text("Verify as Parent")').click();

    await page.waitForURL(/\/sign-up\/student\?.*stage=classes-8-10.*situation=discover.*audience=school/);
  });

  test("8. Capture visual screenshots of Step 3 for Class 4-7, 8-10, and 11-12", async ({ page }) => {
    const artifactDir = "C:/Users/havya/.gemini/antigravity/brain/f4597f5d-ca23-49fa-ad19-b1f1a04c857a";

    // Class 4-7 with Verify as Parent
    await page.goto("/get-started/student/access?stage=classes-4-7");
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${artifactDir}/onboarding-step3-class4-7-verify-parent.png`, fullPage: true });

    // Class 8-10 with Verify as Parent
    await page.goto("/get-started/student/access?stage=classes-8-10");
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${artifactDir}/onboarding-step3-class8-10-verify-parent.png`, fullPage: true });

    // Class 11-12 with options
    await page.goto("/get-started/student/access?stage=classes-11-12");
    await page.locator('div[data-option="teen_independent"]').click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${artifactDir}/onboarding-step3-class11-12-options.png`, fullPage: true });
  });
});
