import { test, expect } from '@playwright/test';

test.describe('Academic Stage Fallback & Validation Regression Suite', () => {

  test('STAGE.1: Missing stage parameter on /onboarding requires explicit stage selection and does NOT silently select Class 12', async ({ page }) => {
    // Direct navigation without stage parameter
    const response = await page.goto('/onboarding');
    expect(response?.status()).toBe(200);
    await page.waitForLoadState('networkidle');

    // Must show explicit stage selection heading
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Select your academic stage to begin');

    // Must show badge indicating stage selection
    await expect(page.locator('text=Academic Stage Selection')).toBeVisible();

    // Must NOT show Class 12 adaptive onboarding steps (e.g. Welcome step with Class 12 context)
    await expect(page.locator('text=Step 1 of')).not.toBeVisible();
    await expect(page.locator('text=Streams, Degrees & Alternatives')).not.toBeVisible();

    // All 6 stage options must be rendered
    const stageCards = page.locator('main .grid a');
    await expect(stageCards).toHaveCount(6);

    // Verify card labels
    await expect(page.locator('text=Classes 4 – 7')).toBeVisible();
    await expect(page.locator('text=Classes 8 – 10')).toBeVisible();
    await expect(page.locator('text=Classes 11 – 12')).toBeVisible();
    await expect(page.locator('text=Diploma')).toBeVisible();
    await expect(page.locator('text=Degree / Engineering')).toBeVisible();
    await expect(page.locator('text=Final Year / Graduate')).toBeVisible();
  });

  test('STAGE.2: Invalid stage parameter on /onboarding is rejected and requires explicit stage selection', async ({ page }) => {
    // Direct navigation with invalid/tampered stage parameter
    const response = await page.goto('/onboarding?stage=invalid-stage-xyz123&tamper=true');
    expect(response?.status()).toBe(200);
    await page.waitForLoadState('networkidle');

    // Must show explicit stage selection heading (NOT default to Class 12)
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Select your academic stage to begin');

    // Must NOT silently mount Class 12 or any other stage
    await expect(page.locator('text=Step 1 of')).not.toBeVisible();
  });

  test('STAGE.3: Selecting a stage from fallback screen successfully transitions into that stage', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');

    // Click "Diploma" card and wait for client-side navigation
    await Promise.all([
      page.waitForURL(/stage=diploma/),
      page.locator('a:has-text("Diploma")').first().click(),
    ]);

    // URL must now have stage=diploma
    expect(page.url()).toContain('stage=diploma');

    // Step 1 welcome for Diploma must be visible
    await expect(page.locator('text=Applied Skills & Lateral Pathways')).toBeVisible();
  });

});
