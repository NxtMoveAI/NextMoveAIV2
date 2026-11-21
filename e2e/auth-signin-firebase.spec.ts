import { test, expect } from "@playwright/test";

test.describe("Real Firebase Sign In & Authentication Flow", () => {
  test("1. Demo authentication UI, simulator, pending cards, and direct workspace bypass buttons are completely removed", async ({
    page,
  }) => {
    await page.goto("/sign-in");

    // Verify Demo Simulator and QA Switcher are removed
    await expect(page.locator("text=QA Backend Response Simulator")).toHaveCount(0);
    await expect(page.locator("text=Standard Pending")).toHaveCount(0);
    await expect(page.locator("text=Backend 503 Unavailable")).toHaveCount(0);

    // Verify "Backend Authentication Pending" card is removed
    await expect(page.locator("text=Backend Authentication Pending")).toHaveCount(0);
    await expect(page.locator("text=Authentication request submitted")).toHaveCount(0);

    // Verify direct bypass buttons are removed from sign in page
    await expect(page.locator('a:has-text("Enter Student Workspace")')).toHaveCount(0);
    await expect(page.locator('a:has-text("Enter Guardian Portal")')).toHaveCount(0);
    await expect(page.locator('a:has-text("Student Workspace →")')).toHaveCount(0);
    await expect(page.locator('a:has-text("Guardian Portal →")')).toHaveCount(0);

    // Verify demo password notice hint is removed
    await expect(page.locator("text=Do NOT enter a real personal password")).toHaveCount(0);
    await expect(page.locator("text=Prototype Mode:")).toHaveCount(0);

    // Verify standard production fields are present
    await expect(page.locator("input#signin-email")).toBeVisible();
    await expect(page.locator("input#signin-password")).toBeVisible();
    await expect(page.locator('button:has-text("Sign In")')).toBeVisible();
    await expect(page.locator('a:has-text("Forgot password?")')).toBeVisible();
  });

  test("2. Empty fields and invalid email format show inline validation errors without submitting", async ({
    page,
  }) => {
    await page.goto("/sign-in");

    const submitBtn = page.locator('button:has-text("Sign In")');

    // Click submit with empty form
    await submitBtn.click();
    await expect(page.locator("text=Please enter your email address.")).toBeVisible();
    await expect(page.locator("text=Please enter your password.")).toBeVisible();

    // Invalid email format
    const emailInput = page.locator("input#signin-email");
    await emailInput.fill("invalid-email-format");
    await submitBtn.click();
    await expect(page.locator("text=Please enter a valid email address.")).toBeVisible();

    // Valid email clears email error
    await emailInput.fill("valid.student@example.com");
    await submitBtn.click();
    await expect(page.locator("text=Please enter a valid email address.")).toHaveCount(0);
    await expect(page.locator("text=Please enter your password.")).toBeVisible();
  });

  test("3. Invalid credentials displays friendly error message and stays on sign-in page", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        shouldFailSignIn: true,
        signInErrorCode: "auth/invalid-credential",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: boolean }).__NEXT_MOVE_MOCK_FIRESTORE__ = true;
    });

    await page.goto("/sign-in");

    await page.locator("input#signin-email").fill("wrong.user@example.com");
    await page.locator("input#signin-password").fill("WrongPassword123!");

    await page.locator('button:has-text("Sign In")').click();

    // Friendly error message displayed
    await expect(
      page.locator("text=Incorrect email or password. Please check your credentials and try again.")
    ).toBeVisible();

    // Must remain on sign-in page
    expect(page.url()).toContain("/sign-in");
  });

  test("4. Network connection error displays friendly error message", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        shouldFailSignIn: true,
        signInErrorCode: "auth/network-request-failed",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: boolean }).__NEXT_MOVE_MOCK_FIRESTORE__ = true;
    });

    await page.goto("/sign-in");

    await page.locator("input#signin-email").fill("student@example.com");
    await page.locator("input#signin-password").fill("AnyPass123!");

    await page.locator('button:has-text("Sign In")').click();

    await expect(
      page.locator("text=Network error: Unable to reach authentication servers")
    ).toBeVisible();
    expect(page.url()).toContain("/sign-in");
  });

  test("5. Valid student login fetches Firestore profile and redirects to Student Workspace with stage", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        customUid: "uid-student-456",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        customRole: "student",
        customStage: "classes-8-10",
      };
    });

    await page.goto("/sign-in");

    await page.locator("input#signin-email").fill("devansh.mehta@example.com");
    await page.locator("input#signin-password").fill("ValidPass2026!");

    const submitBtn = page.locator('button:has-text("Sign In")');
    await submitBtn.click();

    // Redirects to Student Workspace with canonical stage preserved
    await page.waitForURL(/\/dashboard\/student\?stage=classes-8-10/);

    // Verify Firestore lookup was called with authenticated user's UID
    const lookupUid = await page.evaluate(
      () =>
        (window as unknown as { __LAST_FIRESTORE_GET_UID__?: string }).__LAST_FIRESTORE_GET_UID__
    );
    expect(lookupUid).toBe("uid-student-456");
  });

  test("6. Valid parent login fetches Firestore profile and redirects to Guardian Portal", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        customUid: "uid-guardian-789",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        customRole: "parent",
      };
    });

    await page.goto("/sign-in");

    await page.locator("input#signin-email").fill("sunita.parent@example.com");
    await page.locator("input#signin-password").fill("ParentSecure2026!");

    await page.locator('button:has-text("Sign In")').click();

    // Redirects to Guardian Observation Portal
    await page.waitForURL(/\/dashboard\/parent/);
  });

  test("7. Missing Firestore profile denies workspace access and shows helpful recovery message", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        customUid: "uid-no-profile-user",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        profileNotFound: true,
      };
    });

    await page.goto("/sign-in");

    await page.locator("input#signin-email").fill("orphan.auth@example.com");
    await page.locator("input#signin-password").fill("ValidPass2026!");

    await page.locator('button:has-text("Sign In")').click();

    // Friendly error explaining missing profile
    await expect(
      page.locator("text=Your user profile was not found in our records. Please contact support or complete registration.")
    ).toBeVisible();

    // Does NOT redirect to workspace
    expect(page.url()).toContain("/sign-in");
  });

  test("8. Unknown role in Firestore profile denies workspace access", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        customUid: "uid-unknown-role-user",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        customRole: "unrecognized_role_xyz",
      };
    });

    await page.goto("/sign-in");

    await page.locator("input#signin-email").fill("mystery.role@example.com");
    await page.locator("input#signin-password").fill("ValidPass2026!");

    await page.locator('button:has-text("Sign In")').click();

    // Friendly error explaining unrecognized role
    await expect(
      page.locator("text=Unrecognized account role. Please contact support for access assistance.")
    ).toBeVisible();

    // Does NOT redirect to workspace
    expect(page.url()).toContain("/sign-in");
  });

  test("9. Forgot password UI sends password reset email and displays friendly confirmation", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: boolean }).__NEXT_MOVE_MOCK_AUTH__ = true;
    });

    await page.goto("/forgot-password");

    // Empty email error
    const submitBtn = page.locator('button:has-text("Send Recovery Instructions")');
    await submitBtn.click();
    await expect(page.locator("text=Please enter your email address.")).toBeVisible();

    // Invalid email format error
    await page.locator("input#recovery-email").fill("not-an-email");
    await submitBtn.click();
    await expect(page.locator("text=Please enter a valid email address.")).toBeVisible();

    // Valid email
    await page.locator("input#recovery-email").fill("user.reset@example.com");
    await submitBtn.click();

    // Confirmation message shown
    await expect(page.locator("text=Password Reset Instructions Sent")).toBeVisible();
    await expect(
      page.locator("text=If an account is associated with user.reset@example.com, instructions to reset your password have been sent")
    ).toBeVisible();

    // Verify reset email was passed to Firebase Auth service
    const resetEmail = await page.evaluate(
      () =>
        (window as unknown as { __LAST_PASSWORD_RESET_EMAIL__?: string })
          .__LAST_PASSWORD_RESET_EMAIL__
    );
    expect(resetEmail).toBe("user.reset@example.com");

    // Verify "Return to Sign In" link works
    await page.locator('a:has-text("Return to Sign In")').click();
    await page.waitForURL(/\/sign-in/);
  });

  test("10. Guardian Portal cannot be accessed directly without valid guardian authentication", async ({
    page,
  }) => {
    // Unauthenticated direct access to Guardian Portal
    await page.goto("/dashboard/parent");

    // Must show Access Restricted guard
    await expect(page.locator("text=Access Restricted")).toBeVisible();
    await expect(page.locator("text=Guardian Authentication Required")).toBeVisible();
    await expect(
      page.locator("text=The Guardian Observation Portal requires an authenticated parent or legal guardian account")
    ).toBeVisible();

    // Has action linking to sign in
    const signInLink = page.locator('a:has-text("Sign In to Guardian Portal")');
    await expect(signInLink).toBeVisible();
    await signInLink.click();
    await page.waitForURL(/\/sign-in/);
  });
});
