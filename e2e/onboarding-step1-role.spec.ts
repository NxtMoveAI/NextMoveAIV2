import { test, expect } from "@playwright/test";

test.describe("Onboarding Step 1 — Role Selection", () => {
  test("1. Clicking Get Started from homepage opens Step 1 Role Selection", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Next Move AI/);

    // Find and click the Get Started button in the header
    const getStartedLink = page.locator('header a[href="/get-started"]').first();
    await expect(getStartedLink).toBeVisible();
    await getStartedLink.click();

    await expect(page).toHaveURL(/\/get-started/);
    await expect(page.locator("text=Step 1: Role Selection")).toBeVisible();
    await expect(page.getByRole("heading", { name: "How would you like to start?" })).toBeVisible();
  });

  test("2. Displays both Student and Professional roles with Continue disabled initially", async ({ page }) => {
    await page.goto("/get-started");

    const studentCard = page.locator('div[role="radio"]:has-text("I\'m a Student")');
    const professionalCard = page.locator('div[role="radio"]:has-text("I\'m a Professional")');
    const continueBtn = page.locator('button:has-text("Continue")');

    await expect(studentCard).toBeVisible();
    await expect(professionalCard).toBeVisible();

    // Neither is preselected by default
    await expect(studentCard).toHaveAttribute("aria-checked", "false");
    await expect(professionalCard).toHaveAttribute("aria-checked", "false");

    // Continue button must be disabled until a role is selected
    await expect(continueBtn).toBeDisabled();
  });

  test("3. Selecting Student highlights the card and clicking Continue navigates to /get-started/student", async ({ page }) => {
    await page.goto("/get-started");

    const studentCard = page.locator('div[role="radio"]:has-text("I\'m a Student")');
    const professionalCard = page.locator('div[role="radio"]:has-text("I\'m a Professional")');
    const continueBtn = page.locator('button:has-text("Continue")');

    // Click Student
    await studentCard.click();

    // Verify visual / aria-checked highlight
    await expect(studentCard).toHaveAttribute("aria-checked", "true");
    await expect(professionalCard).toHaveAttribute("aria-checked", "false");
    await expect(continueBtn).toBeEnabled();

    // Click Continue
    await continueBtn.click();
    await expect(page).toHaveURL(/\/get-started\/student/);
  });

  test("4. Selecting Professional highlights the card and clicking Continue navigates to /professionals", async ({ page }) => {
    await page.goto("/get-started");

    const studentCard = page.locator('div[role="radio"]:has-text("I\'m a Student")');
    const professionalCard = page.locator('div[role="radio"]:has-text("I\'m a Professional")');
    const continueBtn = page.locator('button:has-text("Continue")');

    // Click Professional
    await professionalCard.click();

    // Verify visual / aria-checked highlight
    await expect(professionalCard).toHaveAttribute("aria-checked", "true");
    await expect(studentCard).toHaveAttribute("aria-checked", "false");
    await expect(continueBtn).toBeEnabled();

    // Click Continue
    await continueBtn.click();
    await expect(page).toHaveURL(/\/professionals/);
  });

  test("5. Switching selection toggles aria-checked state correctly", async ({ page }) => {
    await page.goto("/get-started");

    const studentCard = page.locator('div[role="radio"]:has-text("I\'m a Student")');
    const professionalCard = page.locator('div[role="radio"]:has-text("I\'m a Professional")');

    // Select Student
    await studentCard.click();
    await expect(studentCard).toHaveAttribute("aria-checked", "true");
    await expect(professionalCard).toHaveAttribute("aria-checked", "false");

    // Switch to Professional
    await professionalCard.click();
    await expect(professionalCard).toHaveAttribute("aria-checked", "true");
    await expect(studentCard).toHaveAttribute("aria-checked", "false");

    // Switch back to Student
    await studentCard.click();
    await expect(studentCard).toHaveAttribute("aria-checked", "true");
    await expect(professionalCard).toHaveAttribute("aria-checked", "false");
  });

  test("6. Back navigation link points back to home", async ({ page }) => {
    await page.goto("/get-started");

    const backLink = page.locator('header a:has-text("Return to Landing Page")');
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute("href", "/");
  });

  test("7. Capture visual screenshots of Step 1", async ({ page }) => {
    await page.goto("/get-started");
    await page.screenshot({ path: "C:/Users/havya/.gemini/antigravity/brain/f4597f5d-ca23-49fa-ad19-b1f1a04c857a/onboarding-step1-unselected.png" });

    await page.locator('div[role="radio"]:has-text("I\'m a Student")').click();
    await page.screenshot({ path: "C:/Users/havya/.gemini/antigravity/brain/f4597f5d-ca23-49fa-ad19-b1f1a04c857a/onboarding-step1-student.png" });

    await page.locator('div[role="radio"]:has-text("I\'m a Professional")').click();
    await page.screenshot({ path: "C:/Users/havya/.gemini/antigravity/brain/f4597f5d-ca23-49fa-ad19-b1f1a04c857a/onboarding-step1-professional.png" });
  });
});
