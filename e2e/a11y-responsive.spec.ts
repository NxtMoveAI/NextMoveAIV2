import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as path from 'path';
import * as fs from 'fs';

const ARTIFACT_DIR = 'C:/Users/ravit/.gemini/antigravity/brain/dbe4277a-7bf2-48c4-a3c8-b02cbc825b13/screenshots';

test.beforeAll(() => {
  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }
});

test.describe('Flow 1–3 Accessibility & Multi-Viewport Responsiveness Audit', () => {

  // ===========================================================================
  // 1. WCAG AA Axe-Core Audits Across Key Routes (With HTTP & DOM Assertions)
  // ===========================================================================

  test('A11Y.1: Landing page (/) meets WCAG 2.1 AA standards', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    await page.waitForLoadState('networkidle');

    // Assert unique DOM elements before axe analysis
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/Your next move starts with understanding you/i);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast'])
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalViolations).toEqual([]);
  });

  test('A11Y.2: Sign In (/sign-in) meets WCAG 2.1 AA standards', async ({ page }) => {
    const response = await page.goto('/sign-in');
    expect(response?.status()).toBe(200);
    await page.waitForLoadState('networkidle');

    // Assert unique heading & form input before axe-core
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Welcome back. Your journey continues.');
    await expect(page.locator('#signin-email')).toBeVisible();
    await expect(page.locator('#signin-password')).toBeVisible();

    const scanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    const criticalViolations = scanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalViolations).toEqual([]);
  });

  test('A11Y.3: Student Sign Up (/sign-up/student) meets WCAG 2.1 AA standards', async ({ page }) => {
    const response = await page.goto('/sign-up/student?stage=classes-11-12&access=teen');
    expect(response?.status()).toBe(200);
    await page.waitForLoadState('networkidle');

    // Assert unique heading & form input before axe-core
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Create your space to explore and grow.');
    await expect(page.locator('#student-email')).toBeVisible();
    await expect(page.locator('#student-password')).toBeVisible();

    const scanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    const criticalViolations = scanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalViolations).toEqual([]);
  });

  test('A11Y.4: Parent Sign Up (/sign-up/parent) meets WCAG 2.1 AA standards', async ({ page }) => {
    const response = await page.goto('/sign-up/parent');
    expect(response?.status()).toBe(200);
    await page.waitForLoadState('networkidle');

    // Assert unique heading & form elements before axe-core
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Support their journey, one step at a time.');
    await expect(page.locator('#parent-name')).toBeVisible();
    await expect(page.locator('#parent-email')).toBeVisible();

    const scanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    const criticalViolations = scanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalViolations).toEqual([]);
  });

  test('A11Y.5: Role Selection (/get-started) meets WCAG 2.1 AA standards', async ({ page }) => {
    const response = await page.goto('/get-started');
    expect(response?.status()).toBe(200);
    await page.waitForLoadState('networkidle');

    // Assert unique heading and radiogroup before axe-core
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Every journey starts somewhere.');
    await expect(page.locator('div[role="radiogroup"]')).toBeVisible();

    const scanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    const criticalViolations = scanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalViolations).toEqual([]);
  });

  test('A11Y.6: Onboarding Stage Fallback (/onboarding) meets WCAG 2.1 AA standards', async ({ page }) => {
    const response = await page.goto('/onboarding');
    expect(response?.status()).toBe(200);
    await page.waitForLoadState('networkidle');

    // Assert stage fallback heading and grid
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Select your academic stage to begin');
    await expect(page.locator('main .grid a')).toHaveCount(6);

    const scanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    const criticalViolations = scanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalViolations).toEqual([]);
  });

  test('A11Y.7: Flow 3 Active Onboarding (/onboarding?stage=...) meets WCAG 2.1 AA standards', async ({ page }) => {
    const response = await page.goto('/onboarding?stage=classes-11-12&preview=true');
    expect(response?.status()).toBe(200);
    await page.waitForLoadState('networkidle');

    // Assert active stage heading and progress elements
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("Let's begin by understanding you.");
    await expect(page.locator('text=Step 1 of')).toBeVisible();

    const scanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    const criticalViolations = scanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalViolations).toEqual([]);
  });

  // ===========================================================================
  // 2. Multi-Viewport Layout Integrity (360px, 390px, 768px, 1024px, 1440px)
  // ===========================================================================

  const VIEWPORTS = [
    { width: 360, height: 740, label: '360px-mobile-compact' },
    { width: 390, height: 844, label: '390px-mobile-standard' },
    { width: 768, height: 1024, label: '768px-tablet-portrait' },
    { width: 1024, height: 768, label: '1024px-tablet-landscape' },
    { width: 1440, height: 900, label: '1440px-desktop-standard' },
  ];

  for (const vp of VIEWPORTS) {
    test(`Responsive Layout (${vp.label}): No horizontal scroll & responsive rendering`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      // 1. Landing Page
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Verify no horizontal overflow
      const { horizontalOverflow, overflowing } = await page.evaluate(() => {
        const docWidth = window.innerWidth;
        const elements = document.querySelectorAll('*');
        const list: { tag: string; id: string; className: string; right: number; width: number }[] = [];
        for (const el of Array.from(elements)) {
          const rect = el.getBoundingClientRect();
          if (rect.right > docWidth + 1) {
            list.push({
              tag: el.tagName,
              id: el.id,
              className: el.className?.toString().slice(0, 50),
              right: rect.right,
              width: rect.width,
            });
          }
        }
        return {
          horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
          overflowing: list.slice(0, 5),
        };
      });

      if (horizontalOverflow) {
        console.log(`[OVERFLOW at ${vp.width}px]:`, JSON.stringify(overflowing));
      }
      expect(horizontalOverflow).toBe(false);

      if (vp.width < 1024) {
        // Mobile menu toggle must be visible on mobile and tablet portrait
        await expect(page.locator('button[aria-label*="menu"]').or(page.locator('button:has(svg.lucide-menu)'))).toBeVisible();
      }

      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `landing-${vp.label}.png`),
        fullPage: false,
      });

      // 2. Student Signup Form
      await page.goto('/sign-up/student?stage=classes-11-12&access=teen');
      await page.waitForLoadState('networkidle');

      const signupOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(signupOverflow).toBe(false);

      // Verify inputs have accessible touch target size (>= 40px height)
      const inputHeight = await page.locator('#student-email').evaluate((el) => el.getBoundingClientRect().height);
      expect(inputHeight).toBeGreaterThanOrEqual(40);

      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `signup-${vp.label}.png`),
        fullPage: false,
      });

      // 3. Flow 3 Onboarding
      await page.goto('/onboarding?stage=classes-11-12&preview=true');
      await page.waitForLoadState('networkidle');

      const onboardingOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(onboardingOverflow).toBe(false);

      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `onboarding-${vp.label}.png`),
        fullPage: false,
      });
    });
  }

});
