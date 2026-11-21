import { test, expect } from "@playwright/test";

test.describe("Step 5 — Connect Create Space to Firebase Auth & Firestore", () => {
  test("1. Successfully creates Firebase Auth account and Firestore profile document, then redirects to Student Workspace", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        customUid: "uid-verified-student-12345",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: boolean }).__NEXT_MOVE_MOCK_FIRESTORE__ = true;
    });

    await page.goto("/sign-up/student?stage=classes-8-10&access=guardian_led");

    // Fill valid registration form
    await page.locator("input#full-name").fill("Devansh Mehta");
    await page.locator("input#phone-number").fill("9876543210");
    await page.locator("input#email").fill("devansh.mehta@example.com");
    await page.locator("input#location").fill("Pune, Maharashtra");
    await page.locator("input#institution").fill("Bishop's School");
    await page.locator("input#password").fill("StrongPass2026!");
    await page.locator("input#confirm-password").fill("StrongPass2026!");

    const submitBtn = page.locator('button:has-text("Create Student Space")');
    await expect(submitBtn).toBeEnabled();

    // Submit the form
    await submitBtn.click();

    // Verify redirection to Student Workspace upon completion
    await page.waitForURL(/\/dashboard\/student\?.*stage=classes-8-10/);

    // Verify Auth params captured
    const lastAuth = await page.evaluate(
      () =>
        (
          window as unknown as {
            __LAST_AUTH_SIGNUP__?: {
              name: string;
              email: string;
              password: string;
              phoneNumber?: string;
            };
          }
        ).__LAST_AUTH_SIGNUP__
    );

    expect(lastAuth).toBeDefined();
    expect(lastAuth?.email).toBe("devansh.mehta@example.com");
    expect(lastAuth?.password).toBe("StrongPass2026!");
    expect(lastAuth?.phoneNumber).toBe("9876543210");
    expect(lastAuth?.name).toBe("Devansh Mehta");

    // Verify Firestore document fields from client-side execution
    const lastWrite = await page.evaluate(
      () =>
        (
          window as unknown as {
            __LAST_FIRESTORE_WRITE__?: {
              uid: string;
              name: string;
              email: string;
              phoneNumber: string;
              city: string;
              institution: string;
              role: string;
              academicStage: string;
              isOnboardingCompleted: boolean;
              password?: string;
              confirmPassword?: string;
            };
          }
        ).__LAST_FIRESTORE_WRITE__
    );

    expect(lastWrite).toBeDefined();
    // CRITICAL: Document key / UID matches authenticated UID
    expect(lastWrite?.uid).toBe("uid-verified-student-12345");
    expect(lastWrite?.name).toBe("Devansh Mehta");
    expect(lastWrite?.email).toBe("devansh.mehta@example.com");
    expect(lastWrite?.phoneNumber).toBe("9876543210");
    expect(lastWrite?.city).toBe("Pune, Maharashtra");
    expect(lastWrite?.institution).toBe("Bishop's School");
    expect(lastWrite?.role).toBe("student");
    expect(lastWrite?.academicStage).toBe("classes-8-10");
    expect(lastWrite?.isOnboardingCompleted).toBe(false);

    // Strict Security requirement: Verify password is NEVER stored in Firestore document
    expect(lastWrite?.password).toBeUndefined();
    expect(lastWrite?.confirmPassword).toBeUndefined();
  });

  test("2. Handles existing email error gracefully with friendly message and no Firestore writes", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        shouldFail: true,
        errorCode: "auth/email-already-in-use",
        errorMessage: "The email address is already in use by another account.",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: boolean }).__NEXT_MOVE_MOCK_FIRESTORE__ = true;
    });

    await page.goto("/sign-up/student?stage=classes-8-10&access=teen");

    await page.locator("input#full-name").fill("Devansh Mehta");
    await page.locator("input#phone-number").fill("9876543210");
    await page.locator("input#email").fill("existing.student@example.com");
    await page.locator("input#location").fill("Pune, Maharashtra");
    await page.locator("input#institution").fill("Bishop's School");
    await page.locator("input#password").fill("StrongPass2026!");
    await page.locator("input#confirm-password").fill("StrongPass2026!");

    await page.locator('button:has-text("Create Student Space")').click();

    // Friendly error banner should be displayed
    await expect(
      page.locator("text=This email address is already registered. Please sign in or use a different email.")
    ).toBeVisible();

    // Verify Firestore was never called
    const writeCount = await page.evaluate(
      () =>
        (window as unknown as { __FIRESTORE_WRITE_COUNT__?: number }).__FIRESTORE_WRITE_COUNT__ || 0
    );
    expect(writeCount).toBe(0);

    // Verify page did NOT redirect
    expect(page.url()).toContain("/sign-up/student");

    // Verify form values remain preserved
    await expect(page.locator("input#full-name")).toHaveValue("Devansh Mehta");
    await expect(page.locator("input#phone-number")).toHaveValue("9876543210");
    await expect(page.locator("input#email")).toHaveValue("existing.student@example.com");
  });

  test("3. Handles network errors safely without losing entered form values", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        shouldFail: true,
        errorCode: "auth/network-request-failed",
        errorMessage: "Network error: Unable to reach authentication servers.",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: boolean }).__NEXT_MOVE_MOCK_FIRESTORE__ = true;
    });

    await page.goto("/sign-up/student?stage=classes-8-10&access=teen");

    await page.locator("input#full-name").fill("Devansh Mehta");
    await page.locator("input#phone-number").fill("9876543210");
    await page.locator("input#email").fill("devansh@example.com");
    await page.locator("input#location").fill("Pune, Maharashtra");
    await page.locator("input#institution").fill("Bishop's School");
    await page.locator("input#password").fill("StrongPass2026!");
    await page.locator("input#confirm-password").fill("StrongPass2026!");

    await page.locator('button:has-text("Create Student Space")').click();

    // Friendly network error message should be displayed
    await expect(
      page.locator("text=Network error: Unable to reach authentication servers")
    ).toBeVisible();

    // Inputs remain intact for retry
    await expect(page.locator("input#email")).toHaveValue("devansh@example.com");
    await expect(page.locator("input#location")).toHaveValue("Pune, Maharashtra");
  });

  test("4. Recovers from partial registration (Auth succeeds, Firestore fails -> retry succeeds without duplicate Auth call)", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        customUid: "uid-partial-retry-user-999",
      };
      (
        window as unknown as {
          __NEXT_MOVE_MOCK_FIRESTORE__: { shouldFail: boolean; failCount: number };
        }
      ).__NEXT_MOVE_MOCK_FIRESTORE__ = { shouldFail: true, failCount: 1 };
    });

    await page.goto("/sign-up/student?stage=classes-8-10&access=teen");

    await page.locator("input#full-name").fill("Devansh Mehta");
    await page.locator("input#phone-number").fill("9876543210");
    await page.locator("input#email").fill("retry.user@example.com");
    await page.locator("input#location").fill("Pune, Maharashtra");
    await page.locator("input#institution").fill("Bishop's School");
    await page.locator("input#password").fill("StrongPass2026!");
    await page.locator("input#confirm-password").fill("StrongPass2026!");

    // First submit attempt
    await page.locator('button:has-text("Create Student Space")').click();

    // Partial failure error message displayed
    await expect(
      page.locator("text=Your account was created, but we could not set up your student profile in Firestore")
    ).toBeVisible();

    // Submit button changes text to "Retry Saving Profile"
    const retryBtn = page.locator('button:has-text("Retry Saving Profile")');
    await expect(retryBtn).toBeVisible();
    await expect(retryBtn).toBeEnabled();

    // Verify Auth was called once, Firestore was called once
    const firstAuthCount = await page.evaluate(
      () => (window as unknown as { __AUTH_SIGNUP_COUNT__?: number }).__AUTH_SIGNUP_COUNT__ || 0
    );
    const firstWriteCount = await page.evaluate(
      () =>
        (window as unknown as { __FIRESTORE_WRITE_COUNT__?: number }).__FIRESTORE_WRITE_COUNT__ || 0
    );
    expect(firstAuthCount).toBe(1);
    expect(firstWriteCount).toBe(1);

    // Second submit attempt (Retry)
    await retryBtn.click();

    // Redirection should now succeed to Student Workspace
    await page.waitForURL(/\/dashboard\/student\?.*stage=classes-8-10/);

    // CRITICAL REQUIREMENT 5: Auth signUp was NOT called a second time (reused authenticated UID safely)
    const secondAuthCount = await page.evaluate(
      () => (window as unknown as { __AUTH_SIGNUP_COUNT__?: number }).__AUTH_SIGNUP_COUNT__ || 0
    );
    const secondWriteCount = await page.evaluate(
      () =>
        (window as unknown as { __FIRESTORE_WRITE_COUNT__?: number }).__FIRESTORE_WRITE_COUNT__ || 0
    );
    expect(secondAuthCount).toBe(1);
    expect(secondWriteCount).toBe(2);
  });

  test("5. Class 4–7 onboarding flow: Verify as Parent -> Create Space -> Workspace", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        customUid: "uid-class4-7-student",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: boolean }).__NEXT_MOVE_MOCK_FIRESTORE__ = true;
    });

    // Start on Step 3 for Class 4-7
    await page.goto("/get-started/student/access?stage=classes-4-7");

    // Click Verify as Parent
    const verifyParentBtn = page.locator('button:has-text("Verify as Parent")');
    await expect(verifyParentBtn).toBeVisible();
    await verifyParentBtn.click();

    // Lands on Create Space with Class 4-7 context
    await page.waitForURL(/\/sign-up\/student\?.*stage=classes-4-7/);

    // Fill registration
    await page.locator("input#full-name").fill("Aarav Roy");
    await page.locator("input#phone-number").fill("9876543210");
    await page.locator("input#email").fill("class47@example.com");
    await page.locator("input#location").fill("Kolkata, West Bengal");
    await page.locator("input#institution").fill("Don Bosco Park Circus");
    await page.locator("input#password").fill("Explore2026!");
    await page.locator("input#confirm-password").fill("Explore2026!");

    await page.locator('button:has-text("Create Student Space")').click();

    // Redirects to Workspace preserving classes-4-7 stage
    await page.waitForURL(/\/dashboard\/student\?.*stage=classes-4-7/);
  });

  test("6. Non-school stage onboarding flow: Step 2 -> Step 4 bypass -> Workspace", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        customUid: "uid-engineering-student",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: boolean }).__NEXT_MOVE_MOCK_FIRESTORE__ = true;
    });

    // In Step 2, selecting Engineering and continuing bypasses Step 3 to /sign-up/student
    await page.goto("/get-started/student/access?stage=engineering");
    await page.waitForURL(/\/sign-up\/student\?.*stage=degree-engineering.*access=adult/);

    // Fill registration
    await page.locator("input#full-name").fill("Rohan Kulkarni");
    await page.locator("input#phone-number").fill("9876543210");
    await page.locator("input#email").fill("engineer@example.com");
    await page.locator("input#location").fill("Pune, Maharashtra");
    await page.locator("input#institution").fill("COEP Pune");
    await page.locator("input#password").fill("Explore2026!");
    await page.locator("input#confirm-password").fill("Explore2026!");

    await page.locator('button:has-text("Create Student Space")').click();

    // Redirects to Workspace with degree-engineering stage
    await page.waitForURL(/\/dashboard\/student\?.*stage=degree-engineering/);
  });
});
