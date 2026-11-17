/**
 * NEXT MOVE AI V2 — PROMPT 6.1 TARGETED INTEGRATION CLOSURE TEST SUITE
 * 
 * Verifies the 3 closed integration gaps before Founder acceptance:
 * 1. College Progress stage preservation across Degree, Engineering, Diploma, and Final-Year.
 * 2. School landing hero CTA neutral entry (/get-started?audience=school) without premature stage lock.
 * 3. School dynamic stage explorer preserving explicit stages.
 * 4. Parent role shortcut validation against account role contract (isValidAccountRole).
 * 5. Real profile precedence over URL demo parameters in useStudentHome & profile store.
 */

import { test, expect } from "@playwright/test";

test.describe("Next Move AI — Prompt 6.1 Integration Closure Suite", () => {
  // ---------------------------------------------------------------------------
  // Test 1: College Progress stage preservation for Degree
  // ---------------------------------------------------------------------------
  test("Test 1: College Progress stage preservation for Degree", async ({ page }) => {
    await page.goto("/college#college-framework");

    // Ensure Degree academic context is active (it's the first tab)
    const degreeTab = page.locator('button[role="tab"]:has-text("Degree")').first();
    await degreeTab.click();

    // Switch to Progress learning situation
    const progressTab = page.locator('button[role="tab"]:has-text("Progress")');
    await progressTab.click();

    // Locate Progress CTA button
    const progressCta = page.locator('a:has-text("Continue with Progress Track")');
    await progressCta.scrollIntoViewIfNeeded();
    await expect(progressCta).toBeVisible();

    // Verify href dynamically preserves stage=degree-engineering & context=degree & situation=progress & audience=college
    await expect(progressCta).toHaveAttribute(
      "href",
      "/get-started?stage=degree-engineering&context=degree&situation=progress&audience=college"
    );

    // Click CTA and verify destination
    await progressCta.click();
    await expect(page).toHaveURL(
      /\/get-started\?stage=degree-engineering&context=degree&situation=progress&audience=college/
    );

    // Recognized context badges
    await expect(page.locator("text=/Stage: Degree / Engineering/").first()).toBeVisible();
    await expect(page.locator("text=Situation: Progress").first()).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 2: College Progress stage preservation for Engineering
  // ---------------------------------------------------------------------------
  test("Test 2: College Progress stage preservation for Engineering", async ({ page }) => {
    await page.goto("/college#college-framework");

    // Select Engineering academic context
    const engineeringTab = page.locator('button[role="tab"]:has-text("Engineering")').first();
    await engineeringTab.click();

    // Switch to Progress learning situation
    const progressTab = page.locator('button[role="tab"]:has-text("Progress")');
    await progressTab.click();

    const progressCta = page.locator('a:has-text("Continue with Progress Track")');
    await progressCta.scrollIntoViewIfNeeded();

    // Verify href maps Engineering to stage=degree-engineering & context=engineering & situation=progress
    await expect(progressCta).toHaveAttribute(
      "href",
      "/get-started?stage=degree-engineering&context=engineering&situation=progress&audience=college"
    );

    await progressCta.click();
    await expect(page).toHaveURL(
      /\/get-started\?stage=degree-engineering&context=engineering&situation=progress&audience=college/
    );
    await expect(page.locator("text=/Stage: Degree / Engineering/").first()).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 3: College Progress stage preservation for Diploma
  // ---------------------------------------------------------------------------
  test("Test 3: College Progress stage preservation for Diploma", async ({ page }) => {
    await page.goto("/college#college-framework");

    // Select Diploma academic context
    const diplomaTab = page.locator('button[role="tab"]:has-text("Diploma")').first();
    await diplomaTab.click();

    // Switch to Progress learning situation
    const progressTab = page.locator('button[role="tab"]:has-text("Progress")');
    await progressTab.click();

    const progressCta = page.locator('a:has-text("Continue with Progress Track")');
    await progressCta.scrollIntoViewIfNeeded();

    // Verify href dynamically preserves stage=diploma & context=diploma & situation=progress
    await expect(progressCta).toHaveAttribute(
      "href",
      "/get-started?stage=diploma&context=diploma&situation=progress&audience=college"
    );

    await progressCta.click();
    await expect(page).toHaveURL(
      /\/get-started\?stage=diploma&context=diploma&situation=progress&audience=college/
    );
    await expect(page.locator("text=/Stage: Diploma/").first()).toBeVisible();
    await expect(page.locator("text=Situation: Progress").first()).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 4: College Progress stage preservation for Final-Year / Graduate
  // ---------------------------------------------------------------------------
  test("Test 4: College Progress stage preservation for Final-Year / Graduate", async ({ page }) => {
    await page.goto("/college#college-framework");

    // Select Final-Year & Grad context
    const finalYearTab = page.locator('button[role="tab"]:has-text("Final-Year & Grad")').first();
    await finalYearTab.click();

    // Switch to Progress learning situation
    const progressTab = page.locator('button[role="tab"]:has-text("Progress")');
    await progressTab.click();

    const progressCta = page.locator('a:has-text("Continue with Progress Track")');
    await progressCta.scrollIntoViewIfNeeded();

    // Verify href preserves stage=final-year-grad & context=final-year-grad & situation=progress
    await expect(progressCta).toHaveAttribute(
      "href",
      "/get-started?stage=final-year-grad&context=final-year-grad&situation=progress&audience=college"
    );

    await progressCta.click();
    await expect(page).toHaveURL(
      /\/get-started\?stage=final-year-grad&context=final-year-grad&situation=progress&audience=college/
    );
    await expect(page.locator("text=/Stage: Final\\s*Year/").first()).toBeVisible();
    await expect(page.locator("text=Situation: Progress").first()).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 5: School hero CTA navigates to neutral entry (no stage preselected)
  // ---------------------------------------------------------------------------
  test("Test 5: School hero CTA navigates to neutral entry without preselected stage", async ({ page }) => {
    await page.goto("/school");

    // Click hero CTA 'Start Exploring'
    const heroCta = page.locator('a:has-text("Start Exploring")').first();
    await expect(heroCta).toBeVisible();
    await expect(heroCta).toHaveAttribute("href", "/get-started?audience=school");
    await heroCta.click();

    // Verify arrival at neutral school entry
    await expect(page).toHaveURL(/\/get-started\?audience=school/);

    // Verify NO stage badge is shown in recognized learning context
    await expect(page.locator("text=Recognized Learning Context:")).not.toBeVisible();
    await expect(page.locator("text=/Stage:/")).not.toBeVisible();

    // Select Student role and continue
    await page.locator('text="I\'m a Student"').click();
    await page.locator('button:has-text("Continue")').click();

    // Arrives at /get-started/student?audience=school
    await expect(page).toHaveURL(/\/get-started\/student\?audience=school/);

    // Verify no stage is preselected and user must choose explicitly
    const continueBtn = page.locator('button:has-text("Select an Academic Stage to Continue")');
    await expect(continueBtn).toBeVisible();
    await expect(continueBtn).toBeDisabled();

    // Select Classes 8–10 explicitly
    const class810Card = page.locator('div[role="radio"]:has-text("Classes 8")');
    await class810Card.click();

    // Now button becomes active with "Confirm & Continue"
    const activeContinueBtn = page.locator('button:has-text("Confirm & Continue")');
    await expect(activeContinueBtn).toBeEnabled();
  });

  // ---------------------------------------------------------------------------
  // Test 6: School dynamic stage selection preserves explicit stage
  // ---------------------------------------------------------------------------
  test("Test 6: School dynamic stage selection preserves explicit stage", async ({ page }) => {
    await page.goto("/school#school-stages");

    // Select Classes 8–10 tab
    const tab810 = page.locator('button:has-text("Classes 8–10")');
    await tab810.click();

    // Click dynamic stage CTA
    const dynamicStageCta = page.locator('a:has-text("Begin Classes 8–10 Exploration")');
    await dynamicStageCta.scrollIntoViewIfNeeded();
    await expect(dynamicStageCta).toBeVisible();
    await expect(dynamicStageCta).toHaveAttribute(
      "href",
      "/get-started?stage=classes-8-10&audience=school"
    );
    await dynamicStageCta.click();

    // Verify arrival with stage=classes-8-10&audience=school
    await expect(page).toHaveURL(/\/get-started\?stage=classes-8-10&audience=school/);
    await expect(page.locator("text=/Stage: Classes 8/").first()).toBeVisible();

    // Select Student role
    await page.locator('text="I\'m a Student"').click();
    await page.locator('button:has-text("Continue")').click();

    // Arrives at /get-started/student with explicit stage preserved
    await expect(page).toHaveURL(/\/get-started\/student\?stage=classes-8-10&audience=school/);
    await expect(page.locator("text=/Classes 8/").first()).toBeVisible();
    await expect(page.locator('button:has-text("Confirm & Continue")')).toBeEnabled();
  });

  // ---------------------------------------------------------------------------
  // Test 7: Parent role shortcut validation
  // ---------------------------------------------------------------------------
  test("Test 7: Parent role shortcut validation against account role contract", async ({ page }) => {
    // 7A: Valid role=parent
    await page.goto("/get-started?role=parent");
    const parentRadio = page.locator('div[role="radio"]:has-text("Parent or Guardian")');
    await expect(parentRadio).toHaveAttribute("aria-checked", "true");

    const studentRadio = page.locator('div[role="radio"]:has-text("I\'m a Student")');
    await expect(studentRadio).toHaveAttribute("aria-checked", "false");

    // 7B: Invalid role=invalid-role
    await page.goto("/get-started?role=invalid-role");
    const parentRadioInvalid = page.locator('div[role="radio"]:has-text("Parent or Guardian")');
    await expect(parentRadioInvalid).toHaveAttribute("aria-checked", "false");

    const studentRadioInvalid = page.locator('div[role="radio"]:has-text("I\'m a Student")');
    await expect(studentRadioInvalid).toHaveAttribute("aria-checked", "false");

    // Continue button must not navigate without explicit selection
    const continueBtn = page.locator('button:has-text("Continue")');
    await expect(continueBtn).toBeDisabled();
  });

  // ---------------------------------------------------------------------------
  // Test 8: Real profile precedence over URL demo parameters
  // ---------------------------------------------------------------------------
  test("Test 8: Real profile precedence over URL demo parameters", async ({ page }) => {
    // Seed real student profile into sessionStorage before page load
    await page.addInitScript(() => {
      const realConfirmedProfile = {
        profileId: "sip_real_confirmed_bca_999",
        academicStageId: "degree-engineering",
        academicContext: {
          type: "degree-engineering",
          data: {
            degreeProgram: "BCA",
            branchOrMajor: "Computer Applications",
            currentYear: "2nd Year",
            currentFocusAreas: ["Python Scripting", "Database Management (MySQL)", "Web Technologies"],
          },
        },
        clarity: {
          clarityLevel: "somewhat_clear",
          primaryHelpReason: "Real confirmed BCA student profile from Flow 3",
          studentStatement: "Real authenticated BCA student - never overwrite with demo data",
        },
        interests: {
          selectedCategoryIds: ["technology", "analysis_problem_solving"],
          selectedSubInterestIds: ["tech_programming", "tech_web_apps"],
          isStillExploring: false,
        },
        startingSkills: [
          {
            id: "skill_bca_python",
            name: "Python Scripting & Basic Syntax",
            category: "Programming Languages",
            familiarity: "practised",
            evidenceStatus: "self_reported",
          },
        ],
        activityAttempt: {
          activityId: "act_api_bottleneck",
          attempted: true,
          selectedOptionId: "opt_1",
          isCorrect: true,
          retriesCount: 0,
          feedback: "Great job! Query optimization reduces roundtrips.",
          status: "completed",
          completedAt: "2026-10-28T14:00:00.000Z",
          isSyntheticFixture: false,
        },
        reflection: {
          enjoyedMost: "Seeing real backend code performance.",
          directionPreference: "explore_similar",
          immediateSupportNeeded: ["Build a verified portfolio project"],
        },
        possibilities: [
          {
            id: "poss_bca_1",
            title: "Backend Web & API Development",
            type: "applied_skill_track",
            summary: "Building REST services in Python.",
            whySuggested: "Your Python foundation translates directly to backend engineering.",
            whatRemainsUnknown: "Your familiarity with asynchronous programming.",
            sampleNextActions: ["Build a lightweight CRUD API"],
          },
        ],
        firstNextMove: {
          id: "fnm_real_bca_1",
          title: "Build a Structured 3-Tier Python Project to Verify Your Skills",
          description: "Transform your self-reported Python familiarity into demonstrated code by creating a tested utility.",
          estimatedTime: "30 mins",
          actionType: "try_mini_project",
        },
        status: "confirmed",
        updatedAt: "2026-10-31T12:00:00.000Z",
      };
      sessionStorage.setItem("confirmed_student_profile", JSON.stringify(realConfirmedProfile));
    });

    // Navigate to student dashboard with conflicting demo URL parameters (e.g. ?stage=classes-4-7)
    await page.goto("/dashboard/student?stage=classes-4-7&situation=discover");

    // Verify dashboard renders the real confirmed BCA student profile
    await expect(
      page.locator("text=Build a Structured 3-Tier Python Project to Verify Your Skills")
    ).toBeVisible();
    await expect(
      page.locator("text=/BCA in Computer Applications/").first()
    ).toBeVisible();

    // Verify Class 4–7 demo persona (Aanya Verma / Visual Sketching) is NOT displayed
    await expect(page.locator("text=Aanya Verma")).not.toBeVisible();
    await expect(page.locator("text=Visual Sketching & Character Doodles")).not.toBeVisible();

    // Verify that sessionStorage confirmed profile was NOT overwritten
    const stored = await page.evaluate(() => sessionStorage.getItem("confirmed_student_profile"));
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed.profileId).toBe("sip_real_confirmed_bca_999");
    expect(parsed.academicContext.data.degreeProgram).toBe("BCA");
  });
});
