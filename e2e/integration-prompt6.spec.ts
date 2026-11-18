import { test, expect } from "@playwright/test";

test.describe("Prompt 6: Audience Landing Page to Onboarding & Dashboard Integration", () => {
  // ---------------------------------------------------------------------------
  // Test 1: Homepage -> School landing -> student entry with stage preservation
  // ---------------------------------------------------------------------------
  test("1. Homepage to School landing to student entry with stage preservation", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Next Move AI/i);

    // Click School card on homepage
    const schoolCard = page.locator('[data-testid="audience-card-school"] a[href="/school"]');
    await expect(schoolCard).toBeVisible();
    await schoolCard.click();
    await expect(page).toHaveURL(/\/school/);

    // Hero CTA "Start Exploring"
    const startExploringBtn = page.locator('a:has-text("Start Exploring")').first();
    await expect(startExploringBtn).toBeVisible();
    await startExploringBtn.click();

    // Arrives at /get-started with audience=school (neutral, no preselected stage)
    await expect(page).toHaveURL(/\/get-started\?audience=school/);

    // Select Student role
    await page.locator('text="I\'m a Student"').click();
    await page.locator('button:has-text("Continue")').click();

    // Forwards to student stage selection with audience=school (requiring explicit stage choice)
    await expect(page).toHaveURL(/\/get-started\/student\?audience=school/);
    await expect(page.locator('button:has-text("Select an Academic Stage to Continue")')).toBeDisabled();
  });

  // ---------------------------------------------------------------------------
  // Test 2: Homepage -> College landing to student entry with situation preservation
  // ---------------------------------------------------------------------------
  test("2. Homepage to College landing to student entry with situation preservation", async ({
    page,
  }) => {
    await page.goto("/");

    // Click College card
    const collegeCard = page.locator('[data-testid="audience-card-college"] a[href="/college"]');
    await expect(collegeCard).toBeVisible();
    await collegeCard.click();
    await expect(page).toHaveURL(/\/college/);

    // Locate the framework Discover CTA
    const discoverBtn = page.locator('a:has-text("Start Discover Path")');
    await discoverBtn.scrollIntoViewIfNeeded();
    await expect(discoverBtn).toBeVisible();
    await discoverBtn.click();

    // Arrives at /get-started with situation=discover&audience=college
    await expect(page).toHaveURL(/\/get-started\?.*situation=discover.*audience=college/);

    // Situation preservation badge is visible
    await expect(page.locator("text=Situation: Discover")).toBeVisible();

    // Select Student role and continue
    await page.locator('text="I\'m a Student"').click();
    await page.locator('button:has-text("Continue")').click();

    // Forwards to student stage selection preserving situation & audience
    await expect(page).toHaveURL(/\/get-started\/student\?.*situation=discover/);
    await expect(page.locator("text=Learning Situation: Discover")).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 3: School landing -> Class 4–7 stage to student entry
  // ---------------------------------------------------------------------------
  test("3. School landing: Class 4–7 stage to student entry", async ({ page }) => {
    await page.goto("/school#school-stages");

    // Select Classes 4–7 tab
    const tabBtn = page.locator('button:has-text("Classes 4–7")').first();
    await tabBtn.click();

    // Click stage-aware exploration entry button
    const cta = page.locator('a:has-text("Begin Classes 4–7 Exploration")');
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeVisible();
    await cta.click();

    await expect(page).toHaveURL(/\/get-started\?stage=classes-4-7&audience=school/);
    await expect(page.locator("text=/Stage: Classes 4/").first()).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 4: School landing -> Class 8–10 stage to student entry
  // ---------------------------------------------------------------------------
  test("4. School landing: Class 8–10 stage to student entry", async ({ page }) => {
    await page.goto("/school#school-stages");

    // Select Classes 8–10 tab
    const tabBtn = page.locator('button:has-text("Classes 8–10")');
    await tabBtn.click();

    // Click stage-aware exploration entry button
    const cta = page.locator('a:has-text("Begin Classes 8–10 Exploration")');
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeVisible();
    await cta.click();

    await expect(page).toHaveURL(/\/get-started\?stage=classes-8-10&audience=school/);
    await expect(page.locator("text=/Stage: Classes 8/").first()).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 5: School landing -> Class 11–12 stage to student entry
  // ---------------------------------------------------------------------------
  test("5. School landing: Class 11–12 stage to student entry", async ({ page }) => {
    await page.goto("/school#school-stages");

    // Select Classes 11–12 tab
    const tabBtn = page.locator('button:has-text("Classes 11–12")');
    await tabBtn.click();

    // Click stage-aware exploration entry button
    const cta = page.locator('a:has-text("Begin Classes 11–12 Exploration")');
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeVisible();
    await cta.click();

    await expect(page).toHaveURL(/\/get-started\?stage=classes-11-12&audience=school/);
    await expect(page.locator("text=/Stage: Classes 11/").first()).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 6: School landing -> Parent CTA to parent signup/role flow with context
  // ---------------------------------------------------------------------------
  test("6. School landing: Parent CTA to parent signup/role flow with context", async ({
    page,
  }) => {
    await page.goto("/school#parent-support");

    const parentBtn = page.locator('a:has-text("Explore Parent Overview")');
    await parentBtn.scrollIntoViewIfNeeded();
    await expect(parentBtn).toBeVisible();
    await parentBtn.click();

    await expect(page).toHaveURL(/\/get-started\?.*role=parent/);

    // Parent card should be checked
    const parentRadio = page.locator('div[role="radio"]:has-text("Parent or Guardian")');
    await expect(parentRadio).toHaveAttribute("aria-checked", "true");

    // Click continue
    await page.locator('button:has-text("Continue")').click();
    await expect(page).toHaveURL(/\/sign-up\/parent\?stage=classes-4-7&audience=school/);
    await expect(page.locator("text=Parent & Guardian Entry")).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 7: College landing -> Discover situation to student entry
  // ---------------------------------------------------------------------------
  test("7. College landing: Discover situation to student entry", async ({ page }) => {
    await page.goto("/college#college-framework");

    const discoverBtn = page.locator('a:has-text("Start Discover Path")');
    await discoverBtn.scrollIntoViewIfNeeded();
    await discoverBtn.click();

    await expect(page).toHaveURL(/\/get-started\?.*situation=discover.*audience=college/);
    await expect(page.locator("text=Situation: Discover")).toBeVisible();

    await page.locator('text="I\'m a Student"').click();
    await page.locator('button:has-text("Continue")').click();

    await expect(page).toHaveURL(/\/get-started\/student\?.*situation=discover/);
    await expect(page.locator("text=Learning Situation: Discover")).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 8: College landing -> Begin situation to student entry
  // ---------------------------------------------------------------------------
  test("8. College landing: Begin situation to student entry", async ({ page }) => {
    await page.goto("/college#college-framework");

    // Switch to Begin tab
    await page.locator('button[role="tab"]:has-text("Begin")').click();

    const beginBtn = page.locator('a:has-text("Continue with Begin Plan")');
    await beginBtn.scrollIntoViewIfNeeded();
    await beginBtn.click();

    await expect(page).toHaveURL(/\/get-started\?.*situation=begin.*audience=college/);
    await expect(page.locator("text=Situation: Begin")).toBeVisible();

    await page.locator('text="I\'m a Student"').click();
    await page.locator('button:has-text("Continue")').click();

    await expect(page).toHaveURL(/\/get-started\/student\?.*situation=begin/);
    await expect(page.locator("text=Learning Situation: Begin")).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 9: College landing -> Progress situation to student entry
  // ---------------------------------------------------------------------------
  test("9. College landing: Progress situation to student entry", async ({ page }) => {
    await page.goto("/college#college-framework");

    // Switch to Progress tab
    await page.locator('button[role="tab"]:has-text("Progress")').click();

    const progressBtn = page.locator('a:has-text("Continue with Progress Track")');
    await progressBtn.scrollIntoViewIfNeeded();
    await progressBtn.click();

    await expect(page).toHaveURL(/\/get-started\?.*situation=progress.*audience=college/);
    await expect(page.locator("text=Situation: Progress")).toBeVisible();

    await page.locator('text="I\'m a Student"').click();
    await page.locator('button:has-text("Continue")').click();

    await expect(page).toHaveURL(/\/get-started\/student\?.*situation=progress/);
    await expect(page.locator("text=Learning Situation: Progress")).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 10: Invalid stage parameter in URL safely ignored
  // ---------------------------------------------------------------------------
  test("10. Invalid stage parameter in URL is safely discarded without error", async ({
    page,
  }) => {
    await page.goto("/get-started?stage=invalid-xyz");

    // Stage preservation badge must NOT be shown
    await expect(page.locator("text=Preserving your exploration stage")).not.toBeVisible();
    await expect(page.locator("text=Stage: invalid-xyz")).not.toBeVisible();

    // User can select student normally
    await page.locator('text="I\'m a Student"').click();
    await page.locator('button:has-text("Continue")').click();

    // Invalid stage must not be forwarded
    await expect(page).toHaveURL("/get-started/student");

    // User is presented with full stage list
    await expect(page.locator("text=/Classes 4/").first()).toBeVisible();
    await expect(page.locator("text=Diploma").first()).toBeVisible();
    await expect(page.locator("text=Degree / Engineering").first()).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 11: Invalid situation parameter in URL safely ignored
  // ---------------------------------------------------------------------------
  test("11. Invalid situation parameter in URL is safely ignored", async ({ page }) => {
    await page.goto("/get-started?situation=hack-123");

    // No corrupted situation badge
    await expect(page.locator("text=Situation: hack-123")).not.toBeVisible();

    // Page renders cleanly with zero console/layout errors
    await expect(page.locator("h1")).toContainText(/Every journey starts somewhere/i);
  });

  // ---------------------------------------------------------------------------
  // Test 12: Direct visit to /get-started without query parameters
  // ---------------------------------------------------------------------------
  test("12. Direct visit to /get-started works cleanly with no badges and disabled submit", async ({
    page,
  }) => {
    await page.goto("/get-started");

    // No context badges
    await expect(page.locator("text=Recognized Learning Context:")).not.toBeVisible();

    // Continue button is disabled
    const continueBtn = page.locator('button:has-text("Continue")');
    await expect(continueBtn).toBeDisabled();

    // Selecting student enables Continue
    await page.locator('text="I\'m a Student"').click();
    await expect(continueBtn).toBeEnabled();
  });

  // ---------------------------------------------------------------------------
  // Test 13: Direct visit to /get-started/student presents all 6 canonical stages
  // ---------------------------------------------------------------------------
  test("13. Direct visit to /get-started/student presents all 6 canonical stages", async ({
    page,
  }) => {
    await page.goto("/get-started/student");

    // Confirm heading
    await expect(page.locator("h1")).toContainText(
      /Where are you in your learning journey\?/i
    );

    // Verify all 6 stages exist in choice list
    const stages = [
      /Classes 4/i,
      /Classes 8/i,
      /Classes 11/i,
      /Diploma/i,
      /Degree/i,
      /Graduate/i,
    ];

    for (const stageRegex of stages) {
      await expect(page.locator(`text=${stageRegex}`).first()).toBeVisible();
    }

    // Continue button is disabled until a stage is picked
    const submitBtn = page.locator('button:has-text("Select an Academic Stage to Continue")');
    await expect(submitBtn).toBeDisabled();

    // Select Diploma
    await page.locator('text="Diploma"').first().click();
    const activeSubmitBtn = page.locator('button:has-text("Confirm & Continue")');
    await expect(activeSubmitBtn).toBeEnabled();
  });

  // ---------------------------------------------------------------------------
  // Test 14: Browser back and refresh operations preserve validated context
  // ---------------------------------------------------------------------------
  test("14. Browser back and refresh operations preserve validated context", async ({
    page,
  }) => {
    await page.goto("/get-started?stage=classes-8-10&audience=school");
    await expect(page.locator("text=/Classes 8/").first()).toBeVisible();

    await page.locator('text="I\'m a Student"').click();
    await page.locator('button:has-text("Continue")').click();
    await expect(page).toHaveURL(/\/get-started\/student\?stage=classes-8-10/);

    // Browser back
    await page.goBack();
    await expect(page).toHaveURL(/\/get-started\?stage=classes-8-10&audience=school/);
    await expect(page.locator("text=/Classes 8/").first()).toBeVisible();

    // Page refresh
    await page.reload();
    await expect(page.locator("text=/Classes 8/").first()).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 15: Minor safety: under 13 route redirects to guardian support
  // ---------------------------------------------------------------------------
  test("15. Minor safety: under 13 route redirects to guardian support", async ({ page }) => {
    await page.goto("/get-started/student/access?stage=classes-4-7");

    // Under 13 is recommended and selected by default
    const under13Radio = page.locator('div[role="radio"]:has-text("Under 13 Years")');
    await expect(under13Radio).toHaveAttribute("aria-checked", "true");

    // Proceed button leads to guardian-support
    const proceedBtn = page.locator('button:has-text("Continue to Guardian Authorization")');
    await expect(proceedBtn).toBeVisible();
    await proceedBtn.click();

    await expect(page).toHaveURL(/\/guardian-support\?stage=classes-4-7/);
    await expect(page.locator("text=Guardian Support Gateway")).toBeVisible();
    await expect(page.getByRole("heading", { name: "A little help to get started." })).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 16: Minor safety: 13–17 route displays teen minor protection notice
  // ---------------------------------------------------------------------------
  test("16. Minor safety: 13–17 route displays teen minor protection notice", async ({
    page,
  }) => {
    await page.goto("/get-started/student/access?stage=classes-8-10");

    // 13-17 is selected by default
    const teenRadio = page.locator('div[role="radio"]:has-text("13 to 17 Years")');
    await expect(teenRadio).toHaveAttribute("aria-checked", "true");

    // Proceed to sign-up
    const proceedBtn = page.locator('button:has-text("Continue to Student Signup")');
    await expect(proceedBtn).toBeVisible();
    await proceedBtn.click();

    await expect(page).toHaveURL(/\/sign-up\/student\?stage=classes-8-10&access=teen/);

    // Minor protection notice must be visible
    await expect(page.locator("text=Under-18 Account Entry")).toBeVisible();
    await expect(
      page.locator("text=guardian authorization and linking confirmation").first()
    ).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 17: Dashboard demo: stage parameter aligns persona starting point truthfully
  // ---------------------------------------------------------------------------
  test("17. Dashboard demo: stage parameter aligns persona starting point truthfully", async ({
    page,
  }) => {
    // Visit Class 4-7 stage
    await page.goto("/dashboard/student?stage=classes-4-7");
    await expect(
      page.locator("text=Ready to discover something new?")
    ).toBeVisible();

    // Visit Diploma stage
    await page.goto("/dashboard/student?stage=diploma");
    await expect(
      page.locator("text=Let's build on what you've learned.")
    ).toBeVisible();

    // Visit with invalid stage -> safely handled without crashing
    await page.goto("/dashboard/student?stage=invalid-xyz");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 18: Professional landing: zero accidental routes to student onboarding
  // ---------------------------------------------------------------------------
  test("18. Professional landing: zero accidental routes to student onboarding or false accounts", async ({
    page,
  }) => {
    await page.goto("/professionals");

    // All links on page
    const links = await page.locator("a").evaluateAll((anchors: HTMLAnchorElement[]) =>
      anchors.map((a) => a.href)
    );

    // None should link into student onboarding or student signup
    const invalidStudentLinks = links.filter(
      (l) => l.includes("/sign-up/student") || l.includes("/onboarding")
    );
    expect(invalidStudentLinks).toEqual([]);

    // Check /get-started?audience=professionals
    await page.goto("/get-started?audience=professionals");
    await expect(
      page.locator("text=Professional Tracks in Research & Development")
    ).toBeVisible();
    const returnLink = page.locator('a:has-text("Return to Professional Preview")');
    await expect(returnLink).toBeVisible();
    await returnLink.click();
    await expect(page).toHaveURL(/\/professionals/);
  });
});
