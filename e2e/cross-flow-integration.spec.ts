import { test, expect } from '@playwright/test';

test.describe('Flow 1–3 Complete Cross-Flow Integration Journeys', () => {

  // ===========================================================================
  // JOURNEY 1: Class 12 Science PCM Student Complete Lifecycle
  // Landing -> Explorer -> Entry -> Age Context -> Signup -> Onboarding -> Profile
  // ===========================================================================
  test('INTEG.1: Class 12 Science Student: Complete cross-flow journey from Landing to Starting Profile', async ({ page }) => {
    // 1. Landing Page
    const landingRes = await page.goto('/');
    expect(landingRes?.status()).toBe(200);
    await page.waitForLoadState('networkidle');

    // Scroll to Student Explorer
    await page.locator('#explorer').scrollIntoViewIfNeeded();

    // Select Class 12 tab in Explorer
    await page.locator('button:has-text("Classes 11 – 12")').first().click();
    await expect(page.locator('text=Streams, Degrees & Alternatives').first()).toBeVisible();

    // Click CTA handoff to Flow 2
    await page.locator('a:has-text("Start My Journey with Classes 11 – 12")').click();
    await page.waitForURL(/get-started\/student/);
    expect(page.url()).toContain('stage=classes-11-12');

    // 2. Stage Confirmation
    await expect(page.getByRole('heading', { name: 'Where are you in your' })).toBeVisible();
    await page.locator('button:has-text("Confirm & Continue")').click();
    await page.waitForURL(/get-started\/student\/access/);

    // 3. Age Context
    await expect(page.getByRole('heading', { name: 'Safety and access context' })).toBeVisible();
    await page.locator('div[role="radio"]:has-text("13 to 17 Years")').click();
    await page.locator('button:has-text("Continue to Student Signup")').click();
    await page.waitForURL(/sign-up\/student/);

    // 4. Student Signup (Synthetic Data)
    await expect(page.getByRole('heading', { name: 'Create your space' })).toBeVisible();
    await page.locator('#student-name').fill('Aryan Sharma (Synthetic Test)');
    await page.locator('#student-email').fill('aryan.synth.test@example.com');
    await page.locator('#student-password').fill('SyntheticPass123!');
    await page.locator('#student-confirm-password').fill('SyntheticPass123!');
    await page.locator('input[type="checkbox"]').check();

    await page.locator('button[type="submit"]:has-text("Create Student Space")').click();
    await expect(page.locator('text=Account creation will be available once secure authentication is connected')).toBeVisible();

    // Click prototype preview button to proceed to Flow 3
    await page.locator('a:has-text("Design Preview: Continue to Flow 3 Onboarding Preview")').click();
    await page.waitForURL(/onboarding/);
    expect(page.url()).toContain('stage=classes-11-12');

    // 5. Flow 3 Adaptive Onboarding
    // Step 1: Welcome
    await expect(page.locator('text=Step 1 of')).toBeVisible();
    await page.locator('button:has-text("Begin My Journey")').click();

    // Step 2: Academic Context (Class 12, Science PCM)
    await page.locator('button:has-text("Class 12")').click();
    await page.locator('button:has-text("Science (PCM)")').click();
    await page.locator('main button:has-text("Continue")').first().click();

    // Step 3: Clarity
    await page.locator('button:has-text("I have a few directions in mind")').click();
    await page.locator('main button:has-text("Continue")').first().click();

    // Step 4: Interests
    await page.locator('text=Technology & Software').click();
    await page.locator('main button:has-text("Continue")').first().click();

    // Step 5: Starting Point (Starter Skills)
    await expect(page.getByText('My Starting Point').first()).toBeVisible();
    await page.locator('main button:has-text("Continue")').first().click();

    // Step 6: Micro-Exploration Activity
    await page.locator('button:has-text("Yes, Try Practical Challenge")').click();
    await expect(page.locator('text=Educational Pathway & Skill Trade-Off Matrix')).toBeVisible();
    // Choose correct option
    await page.locator('button:has-text("Both pathways involve trade-offs")').click();
    await expect(page.locator('text=Learning Insight:')).toBeVisible();
    await page.locator('button:has-text("Continue to Reflection")').click();

    // Step 7: Reflection
    await page.locator('button:has-text("Work on an interactive, guided starter project")').click();
    await page.locator('button:has-text("View My Starting Profile")').click();

    // Step 8: Starting Profile Review
    await expect(page.getByRole('heading', { name: 'Your journey starts here.' })).toBeVisible();
    await expect(page.locator('text=Draft (Under Review)')).toBeVisible();
    await expect(page.locator('text=Class 12 • Science (PCM)').first()).toBeVisible();
    await expect(page.locator('text=Science (PCM)').first()).toBeVisible();
    await expect(page.locator('text=Practised in Challenge').first()).toBeVisible();
    await expect(page.locator('text=Self-Reported Familiarity').first()).toBeVisible();
  });

  // ===========================================================================
  // JOURNEY 2: BCom Student Complete Lifecycle
  // Entry -> Degree Context -> Business Interest -> Finance Activity -> Starting Profile
  // ===========================================================================
  test('INTEG.2: BCom Student: Cross-flow journey with commerce context and cash flow activity', async ({ page }) => {
    // 1. Role Selection
    const entryRes = await page.goto('/get-started');
    expect(entryRes?.status()).toBe(200);
    await page.locator('div[role="radio"]:has-text("I\'m a Student")').click();
    await page.locator('button:has-text("Continue")').click();
    await page.waitForURL(/get-started\/student/);

    // 2. Select Degree / Engineering Stage
    await page.locator('div[role="radio"]:has-text("Degree / Engineering")').click();
    await page.locator('button:has-text("Confirm & Continue")').click();
    await page.waitForURL(/get-started\/student\/access/);

    // 3. Age Context: 18+ Adult
    await page.locator('div[role="radio"]:has-text("18 Years or Older")').click();
    await page.locator('button:has-text("Continue to Student Signup")').click();
    await page.waitForURL(/sign-up\/student/);

    // 4. Fill synthetic signup data
    await page.locator('#student-name').fill('Sneha Patel (Synthetic Test)');
    await page.locator('#student-email').fill('sneha.patel.test@example.com');
    await page.locator('#student-password').fill('SyntheticPass123!');
    await page.locator('#student-confirm-password').fill('SyntheticPass123!');
    await page.locator('input[type="checkbox"]').check();
    await page.locator('button[type="submit"]:has-text("Create Student Space")').click();

    // Proceed to Flow 3
    await page.locator('a:has-text("Design Preview: Continue to Flow 3 Onboarding Preview")').click();
    await page.waitForURL(/onboarding/);

    // 5. Step 1: Welcome
    await page.locator('button:has-text("Begin My Journey")').click();

    // 6. Step 2: Academic Context (BCom, Finance & Accounting)
    await page.locator('button:has-text("BCom")').click();
    await page.selectOption('#degree-branch', 'Finance & Accounting');
    await page.locator('button:has-text("3rd Year")').click();
    await page.locator('main button:has-text("Continue")').first().click();

    // 7. Step 3: Clarity
    await page.locator('button:has-text("I have a few directions in mind")').click();
    await page.locator('main button:has-text("Continue")').first().click();

    // 8. Step 4: Interests (Business & Ventures)
    await page.locator('text=Business & Ventures').click();
    await page.locator('main button:has-text("Continue")').first().click();

    // 9. Step 5: Starting Point
    await expect(page.locator('text=Financial Accounting & Reporting Basics')).toBeVisible();
    await page.locator('main button:has-text("Continue")').first().click();

    // 10. Step 6: Micro-Exploration (Resolves to Cash Flow vs Profit!)
    await expect(page.locator('text=Financial Insight: Cash Flow vs. Accounting Profit')).toBeVisible();
    await page.locator('button:has-text("Yes, Try Practical Challenge")').click();
    await expect(page.locator('text=Cash Flow vs. Accounting Profit')).toBeVisible();

    // Solve challenge (Working capital timing gap)
    await page.locator('button:has-text("Revenue was booked on accrual credit")').click();
    await expect(page.locator('text=Learning Insight:')).toBeVisible();
    await page.locator('button:has-text("Continue to Reflection")').click();

    // 11. Step 7: Reflection
    await page.locator('button:has-text("Work on an interactive, guided starter project")').click();
    await page.locator('button:has-text("View My Starting Profile")').click();

    // 12. Step 8: Starting Profile Review
    await expect(page.getByRole('heading', { name: 'Your journey starts here.' })).toBeVisible();
    await expect(page.locator('text=Draft (Under Review)')).toBeVisible();
    await expect(page.locator('text=BCom in Finance & Accounting (3rd Year)')).toBeVisible();
    await expect(page.locator('text=Financial Analytics, Modeling')).toBeVisible();
    await expect(page.locator('text=Practised in Challenge').first()).toBeVisible();
  });

  // ===========================================================================
  // JOURNEY 3: Minor Student & Safety Boundary
  // Guardian authorization pending must not be mistaken for authenticated access
  // ===========================================================================
  test('INTEG.3: Minor Student Safety: Guardian authorization pending must not grant authenticated access', async ({ page }) => {
    // 1. Under-13 Boundary: Direct student signup is blocked, routed to Guardian Support
    await page.goto('/get-started/student/access?stage=classes-4-7');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('text=Guardian-Led Co-Setup Required')).toBeVisible();
    await page.locator('button:has-text("Continue to Guardian Authorization")').click();

    // Must route to guardian support guidance page
    await page.waitForURL(/guardian-support/);
    expect(page.url()).toContain('/guardian-support?stage=classes-4-7');
    await expect(page.getByRole('heading', { name: 'A little help to get started.' })).toBeVisible();

    // 2. Teen Boundary (13-17): Guardian Pending status
    await page.goto('/verify?type=guardian_pending');
    await page.waitForLoadState('networkidle');

    // Verify Guardian Authorization Pending screen
    await expect(page.locator('h1')).toHaveText('Guardian approval pending');
    await expect(page.locator('text=Under digital minor safety guidelines')).toBeVisible();

    // Assert that client-side storage contains NO authentication token
    const tokenInStorage = await page.evaluate(() => {
      return localStorage.getItem('token') || localStorage.getItem('auth_token') || sessionStorage.getItem('token');
    });
    expect(tokenInStorage).toBeNull();

    // Assert direct navigation to protected student dashboard without auth is blocked/redirected
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    // Page must either 404 (route not yet built) or redirect to sign-in / home — NOT display student data
    const url = page.url();
    const isProtected = url.includes('/sign-in') || url.includes('/get-started') || url.endsWith('/') || (await page.locator('text=404').isVisible());
    expect(isProtected).toBe(true);
  });

});
