import { test, expect } from '@playwright/test';

test.describe('Flow 1 — Intelligent Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('L1.1: Header navigation and brand display', async ({ page }) => {
    // Check brand logo and title
    const brand = page.locator('header a[href="/"]').first();
    await expect(brand).toBeVisible();
    await expect(brand).toContainText('Next Move AI');
    await expect(brand).not.toContainText('V2');

    // Desktop nav links exist
    const navLinks = ['How It Works', 'Explore', 'Experience', 'My Partner', 'For Parents', 'FAQ'];
    for (const label of navLinks) {
      const link = page.locator(`header nav a:has-text("${label}")`);
      await expect(link).toBeVisible();
    }

    // Sign In and Get Started links
    const signInBtn = page.locator('header a[href="/sign-in"]').first();
    const getStartedBtn = page.locator('header a[href="/get-started"]').first();
    await expect(signInBtn).toBeVisible();
    await expect(getStartedBtn).toBeVisible();
  });

  test('L1.2: Mobile menu drawer open, ESC close, and body scroll lock', async ({ page }) => {
    // Resize to mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });

    const openMenuBtn = page.locator('button[aria-label="Open menu"]');
    await expect(openMenuBtn).toBeVisible();
    await openMenuBtn.click();

    // Check mobile drawer visible
    const closeMenuBtn = page.locator('button[aria-label="Close menu"]');
    await expect(closeMenuBtn).toBeVisible();

    // Check body overflow is locked
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe('hidden');

    // Press Escape to close
    await page.keyboard.press('Escape');
    await expect(closeMenuBtn).not.toBeVisible();

    // Check body overflow unlocked
    const overflowAfter = await page.evaluate(() => document.body.style.overflow);
    expect(overflowAfter).toBe('');
  });

  test('L1.3: Section anchors are present and functional', async ({ page }) => {
    const anchors = ['#how-it-works', '#explorer', '#experiences', '#my-partner', '#for-parents', '#faq'];
    for (const anchor of anchors) {
      const target = page.locator(anchor);
      await expect(target).toBeAttached();
    }
  });

  test('L1.4: Student Explorer default state and stage switches', async ({ page }) => {
    const explorer = page.locator('#explorer');
    await expect(explorer).toBeVisible();

    // Default neutral welcome state check
    const class12Radio = explorer.locator('button[role="radio"]:has-text("Classes 11 – 12")');
    await expect(class12Radio).toHaveAttribute('aria-checked', 'false');
    await expect(explorer).toContainText('Ready to explore your possibilities?');

    // Click Classes 11 - 12 to activate
    await class12Radio.click();
    await expect(class12Radio).toHaveAttribute('aria-checked', 'true');

    // Switch to Middle School (Classes 4 - 7)
    const class47Radio = explorer.locator('button[role="radio"]:has-text("Classes 4 – 7")');
    await class47Radio.click();
    await expect(class47Radio).toHaveAttribute('aria-checked', 'true');
    await expect(class12Radio).toHaveAttribute('aria-checked', 'false');

    // Switch to Degree / Engineering
    const degRadio = explorer.locator('button[role="radio"]:has-text("Degree / Engineering")');
    await degRadio.click();
    await expect(degRadio).toHaveAttribute('aria-checked', 'true');
    await expect(explorer).toContainText('Selected: Degree / Engineering');

    // Verify language does not force BCA exclusively on all students
    const explorerContent = await explorer.textContent();
    expect(explorerContent).not.toMatch(/all students must study BCA/i);
  });

  test('L1.5: Student Explorer interest switching and Still Exploring behavior', async ({ page }) => {
    const explorer = page.locator('#explorer');

    // Select "Creativity" interest
    const creativityBtn = explorer.locator('button[role="radio"]:has-text("Design & Creativity")');
    await creativityBtn.click();
    await expect(creativityBtn).toHaveAttribute('aria-checked', 'true');

    // Select "Still Exploring"
    const stillExploringBtn = explorer.locator('button[role="radio"]:has-text("Still Exploring")');
    await stillExploringBtn.click();
    await expect(stillExploringBtn).toHaveAttribute('aria-checked', 'true');

    // Check Still Exploring advice rendered
    await expect(explorer).toContainText('Still Exploring');
  });

  test('L1.6: Interactive mini-challenge participation, feedback, and reset', async ({ page }) => {
    const explorer = page.locator('#explorer');

    // Set to Classes 11-12 and Technology
    await explorer.locator('button[role="radio"]:has-text("Classes 11 – 12")').click();
    await explorer.locator('button[role="radio"]:has-text("Technology & Coding")').click();

    // Select Activity tab
    const activityTab = explorer.locator('#tab-activity');
    await activityTab.click();

    // In the Binary Search Data Router, target is 58 (node index 5: Node 6)
    const node6 = explorer.locator('button:has-text("Node 6")');
    await expect(node6).toBeVisible();
    await node6.click();

    // Feedback should report finding target #58
    await expect(explorer).toContainText('Target #58 found');

    // Reset challenge
    const resetBtn = explorer.locator('button[aria-label="Reset Challenge"]');
    await resetBtn.click();
    await expect(explorer).toContainText('Target #58 active');
  });

  test('L1.7: Student Explorer CTA handoff to Flow 2 preserves stage', async ({ page }) => {
    const explorer = page.locator('#explorer');

    // Select Diploma stage
    await explorer.locator('button[role="radio"]:has-text("Diploma")').click();

    // Check CTA link href
    const ctaLink = explorer.locator('a:has-text("Start My Journey with Diploma")');
    await expect(ctaLink).toBeVisible();
    await expect(ctaLink).toHaveAttribute('href', '/get-started/student?stage=diploma');

    // Click CTA and verify navigation to Flow 2
    await ctaLink.click();
    await expect(page).toHaveURL(/\/get-started\/student\?stage=diploma/);

    // Verify Flow 2 page recognized Diploma
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('text=Build on your practical learning').first()).toBeVisible();

    // Verify stage card confirmed Diploma
    const confirmedBadge = page.locator('text=Diploma (Polytechnic & Applied)').first();
    await expect(confirmedBadge).toBeVisible();
  });

  test('L1.8: FAQ accordion expand and collapse', async ({ page }) => {
    const faq = page.locator('#faq');
    await expect(faq).toBeVisible();

    // Check FAQ 1 is open by default
    const faq1Btn = faq.locator('#faq-btn-faq-1');
    await expect(faq1Btn).toHaveAttribute('aria-expanded', 'true');
    const panel1 = faq.locator('#faq-panel-faq-1');
    await expect(panel1).toBeVisible();

    // Click FAQ 2 to open it
    const faq2Btn = faq.locator('#faq-btn-faq-2');
    await faq2Btn.click();
    await expect(faq2Btn).toHaveAttribute('aria-expanded', 'true');
    await expect(faq.locator('#faq-panel-faq-2')).toBeVisible();
    await expect(faq1Btn).toHaveAttribute('aria-expanded', 'false');
  });

  test('L1.9: Content integrity audit — no unsupported claims or fake scores', async ({ page }) => {
    const pageText = await page.innerText('body');

    // Next Move AI explicitly rejects arbitrary fit percentages in its Trust section:
    expect(pageText).toContain("Why We Reject Artificial “Fit” Percentages");
    expect(pageText).toContain("The Student Remains in Control");
    expect(pageText).toContain("We don’t decide careers; we enable clarity");

    // Ensure no unsupported claims of guaranteed placement or verified intelligence quotients
    expect(pageText).not.toMatch(/100% placement guaranteed/i);
    expect(pageText).not.toMatch(/guaranteed college admission/i);
    expect(pageText).not.toMatch(/verified IQ test/i);
  });
});
