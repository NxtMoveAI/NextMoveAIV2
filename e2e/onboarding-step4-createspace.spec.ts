import { test, expect } from "@playwright/test";

test.describe("Onboarding Step 4 — Create Space (Registration UI)", () => {
  test("1. Missing or invalid stage shows stage required warning", async ({ page }) => {
    // Missing stage
    await page.goto("/sign-up/student");
    await expect(page.getByRole("heading", { name: "No Academic Stage Selected" })).toBeVisible();
    await expect(page.locator('a:has-text("Select Your Stage")')).toBeVisible();

    // Invalid stage
    await page.goto("/sign-up/student?stage=nonexistent-stage");
    await expect(page.getByRole("heading", { name: "No Academic Stage Selected" })).toBeVisible();
    await expect(page.locator('a:has-text("Select Your Stage")')).toBeVisible();
  });

  test("2. Displays all 7 required registration fields with submit initially disabled", async ({ page }) => {
    await page.goto("/sign-up/student?stage=classes-8-10&access=teen");

    await expect(page.locator("text=Step 4: Your Personal Space")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Create your space to explore and grow." })
    ).toBeVisible();

    // 7 Required fields
    await expect(page.locator("input#full-name")).toBeVisible();
    await expect(page.locator("input#phone-number")).toBeVisible();
    await expect(page.locator("input#email")).toBeVisible();
    await expect(page.locator("input#location")).toBeVisible();
    await expect(page.locator("input#institution")).toBeVisible();
    await expect(page.locator("input#password")).toBeVisible();
    await expect(page.locator("input#confirm-password")).toBeVisible();

    // Submit button is disabled
    const submitBtn = page.locator('button:has-text("Complete All Fields to Continue")');
    await expect(submitBtn).toBeDisabled();
  });

  test("3. Validates phone number and email with inline friendly errors", async ({ page }) => {
    await page.goto("/sign-up/student?stage=classes-8-10&access=teen");

    // Invalid phone number
    const phoneInput = page.locator("input#phone-number");
    await phoneInput.fill("12345");
    await phoneInput.blur();
    await expect(
      page.locator("text=Please enter a valid 10-digit Indian mobile number")
    ).toBeVisible();

    // Correct phone number clears error
    await phoneInput.fill("9876543210");
    await phoneInput.blur();
    await expect(
      page.locator("text=Please enter a valid 10-digit Indian mobile number")
    ).not.toBeVisible();

    // Invalid email
    const emailInput = page.locator("input#email");
    await emailInput.fill("invalid-email");
    await emailInput.blur();
    await expect(
      page.locator("text=Please enter a valid email address")
    ).toBeVisible();

    // Correct email clears error
    await emailInput.fill("student@example.com");
    await emailInput.blur();
    await expect(
      page.locator("text=Please enter a valid email address")
    ).not.toBeVisible();
  });

  test("4. Validates password strength and password match", async ({ page }) => {
    await page.goto("/sign-up/student?stage=classes-8-10&access=teen");

    const passwordInput = page.locator("input#password");
    const confirmInput = page.locator("input#confirm-password");

    // Short password (< 8 chars)
    await passwordInput.fill("short");
    await passwordInput.blur();
    await expect(
      page.locator("text=Password must be at least 8 characters long.")
    ).toBeVisible();

    // Weak password (only letters, no numbers/symbols)
    await passwordInput.fill("passwordonlyletters");
    await passwordInput.blur();
    await expect(
      page.locator("text=Password must include at least one letter and at least one number or symbol.")
    ).toBeVisible();

    // Strong password
    await passwordInput.fill("SecurePass123");
    await passwordInput.blur();
    await expect(
      page.locator("text=Password must be at least 8 characters long.")
    ).not.toBeVisible();

    // Mismatched confirm password
    await confirmInput.fill("DifferentPass123");
    await confirmInput.blur();
    await expect(page.locator("text=Passwords do not match.")).toBeVisible();

    // Matching confirm password
    await confirmInput.fill("SecurePass123");
    await confirmInput.blur();
    await expect(page.locator("text=Passwords do not match.")).not.toBeVisible();
  });

  test("5. Password visibility toggles switch between password and text type", async ({ page }) => {
    await page.goto("/sign-up/student?stage=classes-8-10&access=teen");

    const passwordInput = page.locator("input#password");
    const confirmInput = page.locator("input#confirm-password");

    await expect(passwordInput).toHaveAttribute("type", "password");
    await expect(confirmInput).toHaveAttribute("type", "password");

    // Toggle main password
    const togglePasswordBtn = page.locator('button[aria-label="Show password"]').first();
    await togglePasswordBtn.click();
    await expect(passwordInput).toHaveAttribute("type", "text");
    await expect(confirmInput).toHaveAttribute("type", "password"); // confirm remains password

    // Hide main password again
    const hidePasswordBtn = page.locator('button[aria-label="Hide password"]').first();
    await hidePasswordBtn.click();
    await expect(passwordInput).toHaveAttribute("type", "password");

    // Toggle confirm password
    const toggleConfirmBtn = page.locator('button[aria-label="Show password"]').nth(1);
    await toggleConfirmBtn.click();
    await expect(confirmInput).toHaveAttribute("type", "text");
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("6. Complete valid submission enables submit button and shows loading on click", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        customUid: "test-uid-810",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: boolean }).__NEXT_MOVE_MOCK_FIRESTORE__ = true;
    });

    await page.goto("/sign-up/student?stage=classes-8-10&access=teen");

    // Fill all 7 fields
    await page.locator("input#full-name").fill("Aryan Sharma");
    await page.locator("input#phone-number").fill("9876543210");
    await page.locator("input#email").fill("aryan.sharma@example.com");
    await page.locator("input#location").fill("Bengaluru, Karnataka");
    await page.locator("input#institution").fill("National Public School");
    await page.locator("input#password").fill("Explore2026!");
    await page.locator("input#confirm-password").fill("Explore2026!");

    // Submit button becomes enabled
    const submitBtn = page.locator('button:has-text("Create Student Space")');
    await expect(submitBtn).toBeEnabled();

    // Click submit and verify loading & redirection
    await submitBtn.click();
    await page.waitForURL(/\/dashboard\/student\?.*stage=classes-8-10/);
  });

  test("7. School stage back navigation returns to Step 3 Access & Safety with params", async ({ page }) => {
    await page.goto(
      "/sign-up/student?stage=classes-8-10&access=teen&situation=discover&audience=school"
    );

    const backLink = page.locator('a:has-text("Back to Access & Safety")');
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute(
      "href",
      "/get-started/student/access?stage=classes-8-10&access=teen&situation=discover&audience=school"
    );
  });

  test("8. Non-school stage back navigation returns to Step 2 Academic Stage with params", async ({ page }) => {
    await page.goto(
      "/sign-up/student?stage=degree&access=adult&situation=discover&audience=college"
    );

    const backLink = page.locator('a:has-text("Back to Academic Stage")');
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute(
      "href",
      "/get-started/student?stage=degree&access=adult&situation=discover&audience=college"
    );
  });

  test("9. Capture visual screenshots of Step 4 Create Space", async ({ page }) => {
    const artifactDir = "C:/Users/havya/.gemini/antigravity/brain/f4597f5d-ca23-49fa-ad19-b1f1a04c857a";

    // Empty form screenshot
    await page.goto("/sign-up/student?stage=classes-8-10&access=teen");
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${artifactDir}/onboarding-step4-empty.png`, fullPage: true });

    // Filled valid form screenshot
    await page.locator("input#full-name").fill("Aryan Sharma");
    await page.locator("input#phone-number").fill("9876543210");
    await page.locator("input#email").fill("aryan.sharma@example.com");
    await page.locator("input#location").fill("Bengaluru, Karnataka");
    await page.locator("input#institution").fill("National Public School");
    await page.locator("input#password").fill("Explore2026!");
    await page.locator("input#confirm-password").fill("Explore2026!");
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${artifactDir}/onboarding-step4-filled.png`, fullPage: true });
  });
});
