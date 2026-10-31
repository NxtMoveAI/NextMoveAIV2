import { test, expect } from '@playwright/test';

test.describe('Flow 2 — Student / Parent Entry, Signup and Sign In', () => {
  test('L2.1: Entry role selection — student vs parent routing', async ({ page }) => {
    await page.goto('/get-started');
    await expect(page).toHaveTitle(/Next Move AI/);

    const studentCard = page.locator('div[role="radio"]:has-text("I\'m a Student")');
    const parentCard = page.locator('div[role="radio"]:has-text("I\'m a Parent or Guardian")');
    const continueBtn = page.locator('button:has-text("Continue")');

    await expect(studentCard).toBeVisible();
    await expect(parentCard).toBeVisible();

    // Select Student and click continue
    await studentCard.click();
    await continueBtn.click();
    await expect(page).toHaveURL(/\/get-started\/student/);

    // Go back and select Parent
    await page.goto('/get-started');
    await parentCard.click();
    await continueBtn.click();
    await expect(page).toHaveURL(/\/sign-up\/parent/);
  });

  test('L2.2: Academic stage preservation, invalid stage rejection, and missing stage handling', async ({ page }) => {
    // 1. Valid stage preserved from query
    await page.goto('/get-started/student?stage=classes-11-12');
    await expect(page.locator('text=Classes 11 – 12 (Pre-University / +2)').first()).toBeVisible();
    await expect(page.locator('button:has-text("Confirm & Continue")')).toBeVisible();

    // 2. Invalid stage rejected — does not auto-select or crash
    await page.goto('/get-started/student?stage=completely-invalid-stage');
    // Verify continue button is disabled because no stage is preselected
    await expect(page.locator('button:has-text("Select an Academic Stage to Continue")')).toBeDisabled();
    // Verify the grid of stages is displayed for user selection
    const stageButtons = page.locator('div[role="radio"]');
    expect(await stageButtons.count()).toBe(6);

    // 3. Missing stage — requires explicit selection
    await page.goto('/get-started/student');
    await expect(page.locator('button:has-text("Select an Academic Stage to Continue")')).toBeDisabled();

    // Select Diploma explicitly
    await page.locator('div[role="radio"]:has-text("Diploma")').click();
    await expect(page.locator('button:has-text("Confirm & Continue")')).toBeEnabled();
    await page.locator('button:has-text("Confirm & Continue")').click();
    await expect(page).toHaveURL(/\/get-started\/student\/access\?stage=diploma/);
  });

  test('L2.3: Minor and guardian access logic (Under 13, Teen 13-17, Adult 18+)', async ({ page }) => {
    // Under 13 journey (classes-4-7)
    await page.goto('/get-started/student/access?stage=classes-4-7');
    await expect(page.locator('text=Guardian-Led Co-Setup Required')).toBeVisible();
    const proceedBtn = page.locator('button:has-text("Continue to Guardian Authorization")');
    await expect(proceedBtn).toBeVisible();
    await proceedBtn.click();
    await expect(page).toHaveURL(/\/guardian-support\?stage=classes-4-7/);

    // Teen journey (classes-11-12)
    await page.goto('/get-started/student/access?stage=classes-11-12');
    await expect(page.locator('text=Teen Student Entry with Guardian Authorization')).toBeVisible();
    const proceedTeenBtn = page.locator('button:has-text("Continue to Student Signup")');
    await proceedTeenBtn.click();
    await expect(page).toHaveURL(/\/sign-up\/student\?stage=classes-11-12&access=teen/);

    // Adult journey (degree-engineering)
    await page.goto('/get-started/student/access?stage=degree-engineering');
    await expect(page.locator('text=Adult Autonomous Student Entry')).toBeVisible();
    const proceedAdultBtn = page.locator('button:has-text("Continue to Student Signup")');
    await proceedAdultBtn.click();
    await expect(page).toHaveURL(/\/sign-up\/student\?stage=degree-engineering&access=adult/);
  });

  test('L2.4: Direct access to access-page without stage blocks gracefully', async ({ page }) => {
    await page.goto('/get-started/student/access');
    await expect(page.locator('text=No Academic Stage Selected')).toBeVisible();
    const pickStageLink = page.locator('a:has-text("Select Your Stage")');
    await expect(pickStageLink).toBeVisible();
    await pickStageLink.click();
    await expect(page).toHaveURL(/\/get-started\/student/);
  });

  test('L2.5: Student signup form validation, password visibility, and prototype notice', async ({ page }) => {
    await page.goto('/sign-up/student?stage=classes-11-12&access=teen');

    // Verify stage badge is visible
    await expect(page.locator('text=Classes 11 – 12').first()).toBeVisible();

    // Verify Prototype Notice is visible
    await expect(page.locator('text=Prototype Mode: No credentials, tokens, or sessions are stored')).toBeVisible();

    // Submit empty form — validation errors should appear
    const submitBtn = page.locator('button:has-text("Create Student Space")');
    await submitBtn.click();

    await expect(page.locator('text=Please enter your preferred display name.')).toBeVisible();
    await expect(page.locator('text=Please enter your email address.')).toBeVisible();
    await expect(page.locator('text=Please create a password.')).toBeVisible();

    // Fill valid data using correct field IDs
    await page.locator('#student-name').fill('Aryan Test');
    await page.locator('#student-email').fill('aryan.test@example.com');
    await page.locator('#student-password').fill('StrongPass123!');
    await page.locator('#student-confirm-password').fill('StrongPass123!');
    await page.locator('input[type="checkbox"]').check();

    // Submit form
    await submitBtn.click();

    // Verify Prototype Feedback appears explaining Havyas integration pending
    await expect(page.locator('text=Authentication Integration Pending')).toBeVisible();
    await expect(page.locator('text=Account creation will be available once secure authentication is connected by Havyas.')).toBeVisible();

    // Verify preview link to Flow 3 is presented
    const previewLink = page.locator('a:has-text("Design Preview: Continue to Flow 3 Onboarding Preview")');
    await expect(previewLink).toBeVisible();
    await expect(previewLink).toHaveAttribute('href', '/onboarding?stage=classes-11-12&preview=true');
  });

  test('L2.6: Parent signup — role distinction, security guardrail (no student invite code), and prototype notice', async ({ page }) => {
    await page.goto('/sign-up/parent');

    // Role options exist with correct titles from flow2-config
    await expect(page.locator('text=Parent or Legal Guardian')).toBeVisible();
    await expect(page.locator('text=Mentor, Teacher, or Academic Advisor')).toBeVisible();

    // Ensure student invite code or student private data field is NOT present on initial signup
    const studentCodeInput = page.locator('input[name="studentCode"], input[name="studentInvite"]');
    await expect(studentCodeInput).toHaveCount(0);

    // Fill form using correct field IDs
    await page.locator('#parent-name').fill('Meera Sharma');
    await page.locator('#parent-email').fill('meera.sharma@example.com');
    await page.locator('#parent-password').fill('ParentPass123!');
    await page.locator('#parent-confirm-password').fill('ParentPass123!');
    await page.locator('input[type="checkbox"]').check();

    await page.locator('button:has-text("Create Parent Space")').click();

    // Check submission feedback
    await expect(page.locator('text=Parent account creation proposal submitted')).toBeVisible();
  });

  test('L2.7: Sign in form validation, prototype simulator, and error handling', async ({ page }) => {
    await page.goto('/sign-in');

    const submitBtn = page.locator('button:has-text("Sign In")');

    // Empty submission
    await submitBtn.click();
    await expect(page.locator('text=Please enter your email address.')).toBeVisible();
    await expect(page.locator('text=Please enter your password.')).toBeVisible();

    // Fill credentials using correct IDs
    await page.locator('#signin-email').fill('test.student@example.com');
    await page.locator('#signin-password').fill('TestPassword123!');

    // Submit with default normal simState
    await submitBtn.click();
    await expect(page.locator('text=Backend Authentication Pending')).toBeVisible();
  });

  test('L2.8: URL tampering security check — query parameter does not grant authenticated session', async ({ page }) => {
    // Navigate with fake query params pretending to be adult or authenticated
    await page.goto('/onboarding?stage=classes-4-7&access=adult&role=admin&preview=true');

    // Check that localStorage and sessionStorage contain NO auth tokens
    const localStorageTokens = await page.evaluate(() => {
      return Object.keys(localStorage).filter(k => k.includes('token') || k.includes('auth') || k.includes('session'));
    });
    expect(localStorageTokens.length).toBe(0);

    // Verify the page is in demo mode and clearly labeled
    await expect(page.locator('text=Flow 3 Development Demonstration')).toBeVisible();
  });
});
