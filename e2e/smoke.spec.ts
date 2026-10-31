import { test, expect } from '@playwright/test';

test('landing page loads with title and header', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Next Move AI/);
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toBeVisible();
});

