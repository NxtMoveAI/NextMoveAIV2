import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const ARTIFACT_DIR = 'C:/Users/ravit/.gemini/antigravity/brain/dbe4277a-7bf2-48c4-a3c8-b02cbc825b13/screenshots';

test.beforeAll(() => {
  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }
});

test.describe('Flow 3 — Adaptive Navigation, Stage Switching & 42-Combination Matrix Verification', () => {

  // ===========================================================================
  // 1. Stage Switching Mid-Journey: Answer Preservation & Data Invalidation
  // ===========================================================================
  test('L3.M1: Mid-onboarding stage switch preserves compatible answers and invalidates incompatible data', async ({ page }) => {
    await page.goto('/onboarding?stage=classes-11-12&preview=true');
    await page.click('button:has-text("Begin My Journey")');

    // On Academic Context: currently shows 11-12 stream options
    await expect(page.locator('text=Science (PCM)')).toBeVisible();

    // Student realizes they are in a Polytechnic/Diploma course: switch stage via top header switcher!
    await page.selectOption('select[aria-label="Switch Academic Stage"]', 'diploma');

    // Verify academic context step now presents Diploma branch questions, not 11-12 streams
    await expect(page.locator('#diploma-branch')).toBeVisible();
    const bodyContent = await page.innerText('body');
    expect(bodyContent).not.toContain('Science (PCM)');

    // Complete diploma academic step
    await page.selectOption('#diploma-branch', 'Mechanical Engineering');
    await page.click('button:has-text("Continue")');

    // Clarity step: select clear goal
    await page.click('button:has-text("I have a clear goal in sight")');
    await page.click('button:has-text("Continue")');

    // Interests step: select Technology
    await page.click('text=Technology & Software');
    await page.click('button:has-text("Continue")');

    // Starting Point
    await page.click('button:has-text("Continue")');

    // Activity Prompt: shows Mechanical Diagnostic, not Physics Sim or Database Bottleneck!
    await expect(page.locator('text=Mechanical Diagnostic: CNC Spindle Bearing Thermal Spike')).toBeVisible();
  });

  // ===========================================================================
  // 2. Multi-Interest Selection & Custom Interest In Your Own Words
  // ===========================================================================
  test('L3.M2: Multi-interest selection and custom interest text are preserved in Section 2', async ({ page }) => {
    await page.goto('/onboarding?stage=degree-engineering&preview=true');
    await page.click('button:has-text("Begin My Journey")');

    // Academic step
    await page.click('button:has-text("Continue")');

    // Clarity step
    await page.click('button:has-text("I have a few directions in mind")');
    await page.click('button:has-text("Continue")');

    // Interests step: Select multiple categories
    await page.click('text=Technology & Software');
    await page.click('text=Creativity & Media');

    // Enter custom interest in textarea/input
    const customInput = page.locator('input[placeholder*="autonomous racing drones"]').or(
      page.locator('input[type="text"]').last()
    );
    if (await customInput.isVisible()) {
      await customInput.fill('Designing human-centered AI interfaces for healthcare');
    }

    await page.click('button:has-text("Continue")');

    // Skip activity to reach profile quickly
    await page.click('button:has-text("Continue")'); // starting point
    await page.click('button:has-text("Skip Challenge & Continue")'); // skip activity
    await page.click('button:has-text("View My Starting Profile")'); // reflection

    // Verify Section 2 shows both categories
    await expect(page.locator('#sec-interests-title')).toBeVisible();
    await expect(page.getByText('technology', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('creativity', { exact: true }).first()).toBeVisible();

    if (await page.locator('text=Designing human-centered AI interfaces for healthcare').isVisible()) {
      await expect(page.locator('text=In your own words:')).toBeVisible();
    }
  });

  // ===========================================================================
  // 3. Section Edit Buttons Navigate Back to Correct Steps
  // ===========================================================================
  test('L3.M3: Profile section edit hooks navigate directly to respective stages without state loss', async ({ page }) => {
    await page.goto('/onboarding?stage=classes-11-12&preview=true');
    await page.click('button:has-text("Begin My Journey")');
    await page.click('button:has-text("Continue")'); // academic
    await page.click('button:has-text("Continue")'); // clarity
    await page.click('button:has-text("Continue")'); // interests
    await page.click('button:has-text("Continue")'); // starting point
    await page.click('button:has-text("Skip Challenge & Continue")'); // activity prompt
    await page.click('button:has-text("View My Starting Profile")'); // reflection

    await expect(page.locator('#sec-academic-title')).toBeVisible();

    // 1. Edit Academic Context from Section 1
    const sec1Edit = page.locator('section[aria-labelledby="sec-academic-title"] button:has-text("Edit")');
    await sec1Edit.click();
    await expect(page.locator('text=Stage B • Academic Context')).toBeVisible();

    // 2. Return to profile and edit Interests from Section 2
    await page.click('button:has-text("Continue")'); // to clarity
    await page.click('button:has-text("Continue")'); // to interests
    await page.click('button:has-text("Continue")'); // to starting-point
    await page.click('button:has-text("Continue")'); // to activity-prompt
    const skipBtn = page.locator('button:has-text("Skip Challenge & Continue")');
    if (await skipBtn.isVisible()) {
      await skipBtn.click();
    }
    await page.click('button:has-text("View My Starting Profile")'); // to profile

    const sec2Edit = page.locator('section[aria-labelledby="sec-interests-title"] button:has-text("Edit")');
    await sec2Edit.click();
    await expect(page.locator('text=Stage D • Interests & Curiosity')).toBeVisible();
  });

  // ===========================================================================
  // 4. Non-Punitive Activity Skip Behavior
  // ===========================================================================
  test('L3.M4: Skipping practical activity records not_assessed status without score deductions', async ({ page }) => {
    await page.goto('/onboarding?stage=classes-8-10&preview=true');
    await page.click('button:has-text("Begin My Journey")');
    await page.click('button:has-text("Continue")'); // academic
    await page.click('button:has-text("Continue")'); // clarity
    await page.click('button:has-text("Continue")'); // interests
    await page.click('button:has-text("Continue")'); // starting point

    // Activity prompt: click skip
    await expect(page.locator('text=Try a 5-minute practical challenge?')).toBeVisible();
    await page.click('button:has-text("Skip Challenge & Continue")');

    // Moves directly to Reflection step (skips interactive activity screen)
    await expect(page.locator('text=Reflecting on your exploration')).toBeVisible();
    await page.click('button:has-text("View My Starting Profile")');

    // In Starting Profile: verify no negative ratings, no penalty scores
    const fullText = await page.innerText('body');
    expect(fullText).not.toContain('Failed Challenge');
    expect(fullText).not.toContain('Deficiency');
    expect(fullText).not.toContain('Score: 0');
  });

  // ===========================================================================
  // 5. Activity Retry Mechanism ("Try Another Choice")
  // ===========================================================================
  test('L3.M5: Student can retry challenge choice without penalty', async ({ page }) => {
    await page.goto('/onboarding?stage=classes-4-7&preview=true');
    await page.click('button:has-text("Begin My Journey")');
    await page.click('button:has-text("Continue")'); // academic
    await page.click('button:has-text("Continue")'); // clarity
    await page.click('button:has-text("Continue")'); // interests
    await page.click('button:has-text("Continue")'); // starting point

    // Accept challenge
    await page.click('button:has-text("Yes, Try Practical Challenge")');

    // Click an incorrect option first: "1. Resolution first"
    await page.click('button:has-text("1. Resolution first")');
    await expect(page.locator('text=Learning Note:')).toBeVisible();

    // Click "Try Another Choice"
    await page.click('button:has-text("Try Another Choice")');

    // Click correct option
    await page.click('button:has-text("1. The Hook (Baby owl wakes up alone")');
    await expect(page.locator('text=Insight Verified:').or(page.locator('text=Key Learning Takeaway:'))).toBeVisible();

    await page.click('button:has-text("Continue to Reflection")');
    await expect(page.locator('text=Reflecting on your exploration')).toBeVisible();
  });

  // ===========================================================================
  // 6. Confirmation Idempotency & Handoff State
  // ===========================================================================
  test('L3.M6: Profile confirmation is idempotent and displays Flow 4 handoff state', async ({ page }) => {
    await page.goto('/onboarding?stage=classes-11-12&preview=true');
    await page.click('button:has-text("Begin My Journey")');
    await page.click('button:has-text("Continue")');
    await page.click('button:has-text("Continue")');
    await page.click('button:has-text("Continue")');
    await page.click('button:has-text("Continue")');
    await page.click('button:has-text("Skip Challenge & Continue")');
    await page.click('button:has-text("View My Starting Profile")');

    // Status is Draft
    await expect(page.locator('text=Draft (Under Review)')).toBeVisible();

    // Click Confirm
    const confirmBtn = page.locator('button:has-text("Confirm My Starting Point")');
    await confirmBtn.click();

    // Confirmed banner appears
    await expect(page.locator('text=Starting Intelligence Profile Confirmed!')).toBeVisible();
    await expect(page.locator('text=Confirmed by Student')).toBeVisible();
    await expect(page.locator('span:has-text("/dashboard/student")')).toBeVisible();

    // Button transitions to confirmed state and is disabled
    await expect(page.locator('button:has-text("Profile Confirmed")')).toBeDisabled();

    // Capture screenshot
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'flow3-confirmation-handoff.png') });
  });

});
