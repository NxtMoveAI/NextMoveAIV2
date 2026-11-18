import { test, expect } from "@playwright/test";

test.describe("Next Move AI — Prompt 10.1 Public Marketing Release & CTA Isolation Suite", () => {
  test("1. Homepage (/) CTAs in marketing mode point truthfully to public interactive sections", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Header CTAs
    const desktopTryExplorer = page.locator('header a:has-text("Try Explorer")').first();
    await expect(desktopTryExplorer).toBeVisible();
    await expect(desktopTryExplorer).toHaveAttribute("href", "#explorer");

    const desktopPilotInquiries = page.locator('header a:has-text("Pilot Inquiries")').first();
    await expect(desktopPilotInquiries).toBeVisible();
    expect(await desktopPilotInquiries.getAttribute("href")).toContain("mailto:partnerships@nextmove.ai");

    // Must NOT have dead-end prototype links in header
    await expect(page.locator('header a[href="/sign-in"]')).not.toBeVisible();
    await expect(page.locator('header a[href="/get-started"]')).not.toBeVisible();
    await expect(page.locator('header a[href="/dashboard/student"]')).not.toBeVisible();

    // Hero CTA
    const heroPrimary = page.locator('section a:has-text("Try Interactive Explorer")').first();
    await expect(heroPrimary).toBeVisible();
    await expect(heroPrimary).toHaveAttribute("href", "#explorer");

    const heroSecondary = page.locator('section a:has-text("See How It Works")').first();
    await expect(heroSecondary).toBeVisible();
    await expect(heroSecondary).toHaveAttribute("href", "#how-it-works");

    // Final CTA section
    const finalPrimary = page.locator('section a:has-text("Try Interactive Explorer")').last();
    await expect(finalPrimary).toBeVisible();
    await expect(finalPrimary).toHaveAttribute("href", "#explorer");
  });

  test("2. School Landing (/school) CTAs point to on-page stages and pilot inquiries", async ({
    page,
  }) => {
    await page.goto("/school");
    await page.waitForLoadState("networkidle");

    // Hero primary CTA
    const schoolHeroPrimary = page.locator('a:has-text("Explore School Activities")').first();
    await expect(schoolHeroPrimary).toBeVisible();
    await expect(schoolHeroPrimary).toHaveAttribute("href", "#school-stages");

    // School Final CTA
    const finalSchoolActivity = page.locator('section a:has-text("Try School Activities")').first();
    await expect(finalSchoolActivity).toBeVisible();
    await expect(finalSchoolActivity).toHaveAttribute("href", "#school-stages");

    const finalSchoolPilot = page.locator('section a:has-text("School Pilot Inquiries")').first();
    await expect(finalSchoolPilot).toBeVisible();
    await expect(finalSchoolPilot).toHaveAttribute("href", "#school-partnerships");

    // Must not have links to /get-started
    await expect(page.locator('main a[href*="/get-started"]')).toHaveCount(0);
  });

  test("3. College Landing (/college) CTAs point to framework and college pilot inquiries", async ({
    page,
  }) => {
    await page.goto("/college");
    await page.waitForLoadState("networkidle");

    // Hero primary CTA
    const heroFramework = page.locator('a:has-text("Find My Starting Point")').first();
    await expect(heroFramework).toBeVisible();
    await expect(heroFramework).toHaveAttribute("href", "#college-framework");

    // College Final CTA
    const finalFramework = page.locator('section a:has-text("Explore 3-State Framework")').last();
    await expect(finalFramework).toBeVisible();
    await expect(finalFramework).toHaveAttribute("href", "#college-framework");

    const finalCollegePilot = page.locator('section a:has-text("College Pilot Inquiries")').first();
    await expect(finalCollegePilot).toBeVisible();
    await expect(finalCollegePilot).toHaveAttribute("href", "#college-partnerships");

    // Must not have links to /get-started
    await expect(page.locator('main a[href*="/get-started"]')).toHaveCount(0);
  });

  test("4. Professionals Landing (/professionals) preserves research inquiries without prototype routes", async ({
    page,
  }) => {
    await page.goto("/professionals");
    await page.waitForLoadState("networkidle");

    // Hero primary CTA
    const heroGrowth = page.locator('a:has-text("Explore Growth Directions")').first();
    await expect(heroGrowth).toBeVisible();
    await expect(heroGrowth).toHaveAttribute("href", "#growth-directions");

    // Direct research mailto
    const mailto = page.locator('a[href*="mailto:contact@nextmove.ai"]').first();
    await expect(mailto).toBeVisible();
  });

  test("5. Direct access to prototype routes in marketing mode redirects to /preview-restricted", async ({
    page,
  }) => {
    const restrictedPaths = [
      "/dashboard/student",
      "/dashboard/parent",
      "/sign-in",
      "/sign-up/student",
      "/sign-up/parent",
      "/get-started",
      "/get-started/student",
      "/onboarding",
    ];

    for (const path of restrictedPaths) {
      await page.goto(path);
      await expect(page).toHaveURL(new RegExp(`/preview-restricted\\?from=`));
      await expect(page.locator("h1")).toContainText("Interactive Workspaces Restricted in Public Preview");
    }
  });

  test("6. Dedicated boundary notice page (/preview-restricted) provides clear guidance and public links", async ({
    page,
  }) => {
    await page.goto("/preview-restricted?from=/dashboard/student");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toContainText("Interactive Workspaces Restricted in Public Preview");
    await expect(page.locator("text=Zero Data Collection Guarantee")).toBeVisible();
    await expect(page.locator("text=Digital Personal Data Protection (DPDP) Act")).toBeVisible();

    // Verify all 3 track links exist
    await expect(page.locator('a[href="/school"]').first()).toBeVisible();
    await expect(page.locator('a[href="/college"]').first()).toBeVisible();
    await expect(page.locator('a[href="/professionals"]').first()).toBeVisible();
    await expect(page.locator('a[href="/"]').first()).toBeVisible();
  });

  test("7. Mobile navigation drawer in marketing mode presents public explorer and inquiries", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Open mobile menu
    const menuBtn = page.locator('button[aria-label="Open menu"]');
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    // Verify drawer contents
    await expect(page.locator('div[role="dialog"] a:has-text("Try Interactive Explorer")')).toBeVisible();
    await expect(page.locator('div[role="dialog"] a:has-text("Institutional Pilot Inquiries")')).toBeVisible();

    // Must NOT have prototype links in drawer
    await expect(page.locator('div[role="dialog"] a[href="/sign-in"]')).not.toBeVisible();
    await expect(page.locator('div[role="dialog"] a[href="/get-started"]')).not.toBeVisible();
  });

  test("8. Client cookie manipulation (nm_mode=demo) cannot bypass server-side route restrictions", async ({
    page,
    context,
  }) => {
    // Attempt malicious cookie injection
    await context.addCookies([
      {
        name: "nm_mode",
        value: "demo",
        domain: "localhost",
        path: "/",
      },
    ]);

    // Try accessing a restricted route directly with spoofed cookie
    await page.goto("/dashboard/student");
    await expect(page).toHaveURL(new RegExp(`/preview-restricted\\?from=`));
    await expect(page.locator("h1")).toContainText("Interactive Workspaces Restricted in Public Preview");

    // Try accessing onboarding with spoofed cookie
    await page.goto("/onboarding?stage=classes-11-12");
    await expect(page).toHaveURL(/\/preview-restricted.*from=/);
  });

  test("9. Client-side navigation to prototype routes is intercepted by server proxy", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Attempt client-side navigation via location assignment
    await page.evaluate(() => {
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign("/dashboard/student");
    });

    await expect(page).toHaveURL(new RegExp(`/preview-restricted\\?from=`));
    await expect(page.locator("h1")).toContainText("Interactive Workspaces Restricted in Public Preview");
  });
});
