import { test, expect } from "@playwright/test";

test.describe("Next Move AI — Prompt 7 Comprehensive UX & Interaction Audit", () => {
  // Test 1: All four public pages load cleanly
  test("Test 1: All four public pages load without errors", async ({ page }) => {
    const pages = [
      { path: "/", titleRegex: /Next Move AI/i, headingRegex: /We don’t decide careers|We enable clarity/i },
      { path: "/school", titleRegex: /Next Move Explore|School/i, headingRegex: /Explore what you love|Next Move Explore/i },
      { path: "/college", titleRegex: /Next Move Build|College/i, headingRegex: /From classes to capabilities|Next Move Build/i },
      { path: "/professionals", titleRegex: /Next Move Grow|Professionals/i, headingRegex: /Deepen expertise|Next Move Grow/i },
    ];

    for (const p of pages) {
      const response = await page.goto(p.path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(p.titleRegex);
      await expect(page.locator("h1, h2, span").filter({ hasText: p.headingRegex }).first()).toBeVisible();
    }
  });

  // Test 2: The three homepage cards route correctly
  test("Test 2: The three homepage cards route to correct audience journeys", async ({ page }) => {
    await page.goto("/");

    // School card
    const schoolCardCta = page.locator('[data-testid="audience-card-school"] a').first();
    await expect(schoolCardCta).toBeVisible();
    await schoolCardCta.click();
    await expect(page).toHaveURL(/\/school/);
    await expect(page.locator("h1").first()).toContainText(/Big discoveries begin with small curiosities/i);

    // Back to home
    await page.goto("/");

    // College card
    const collegeCardCta = page.locator('[data-testid="audience-card-college"] a').first();
    await expect(collegeCardCta).toBeVisible();
    await collegeCardCta.click();
    await expect(page).toHaveURL(/\/college/);
    await expect(page.locator("h1").first()).toContainText(/Your degree is one part of your journey/i);

    // Back to home
    await page.goto("/");

    // Professionals card
    const profCardCta = page.locator('[data-testid="audience-card-professionals"] a').first();
    await expect(profCardCta).toBeVisible();
    await profCardCta.click();
    await expect(page).toHaveURL(/\/professionals/);
    await expect(page.locator("h1").first()).toContainText(/Your experience matters/i);
  });

  // Test 3: School stage selector works dynamically
  test("Test 3: School stage selector switches content without jitter", async ({ page }) => {
    await page.goto("/school");

    // Click Classes 8-10 tab inside the stage selector
    const stage8to10 = page.locator('div[aria-label="School Academic Stages"] button').filter({ hasText: /Classes 8/i }).first();
    await stage8to10.click();
    await expect(page.locator("text=/Build real understanding across streams/i").first()).toBeVisible();
    await expect(page.locator('a:has-text("Begin Classes 8–10 Exploration")')).toBeVisible();

    // Click Classes 11-12 tab inside the stage selector
    const stage11to12 = page.locator('div[aria-label="School Academic Stages"] button').filter({ hasText: /Classes 11/i }).first();
    await stage11to12.click();
    await expect(page.locator('a:has-text("Begin Classes 11–12 Exploration")')).toBeVisible();
  });

  // Test 4: College learning-situation selector works
  test("Test 4: College learning-situation selector switches between Discover, Begin, and Progress", async ({ page }) => {
    await page.goto("/college");

    // Begin tab
    const beginTab = page.locator('div[role="tablist"] button').filter({ hasText: /Begin/i }).first();
    await beginTab.click();
    await expect(page.locator("text=/I know my interest, but don't know where to start|Starter Pathways/i").first()).toBeVisible();

    // Progress tab
    const progressTab = page.locator('div[role="tablist"] button').filter({ hasText: /Progress/i }).first();
    await progressTab.click();
    await expect(page.locator("text=/I've started and want to apply what I know|Demonstrated Capability/i").first()).toBeVisible();

    // Discover tab
    const discoverTab = page.locator('div[role="tablist"] button').filter({ hasText: /Discover/i }).first();
    await discoverTab.click();
    await expect(page.locator("text=/What the Work Actually Involves|Discover Mode/i").first()).toBeVisible();
  });

  // Test 5: Professional goal selector works
  test("Test 5: Professional goal selector switches between Upskill, Reskill, and Transition", async ({ page }) => {
    await page.goto("/professionals");

    // Reskill tab in #growth-directions
    const reskillTab = page.locator('#growth-directions button').filter({ hasText: /Reskill/i }).first();
    await reskillTab.click();
    await expect(page.locator('#growth-directions').locator('text=/capabilities for new responsibilities or emerging work/i').first()).toBeVisible();

    // Transition tab in #growth-directions
    const transitionTab = page.locator('#growth-directions button').filter({ hasText: /Transition/i }).first();
    await transitionTab.click();
    await expect(page.locator('#growth-directions').locator('text=/explore moving into a different professional direction/i').first()).toBeVisible();

    // Upskill tab in #growth-directions
    const upskillTab = page.locator('#growth-directions button').filter({ hasText: /Upskill/i }).first();
    await upskillTab.click();
    await expect(page.locator('#growth-directions').locator('text=/grow in my existing profession/i').first()).toBeVisible();
  });

  // Test 6: Degree vs. Engineering context distinction
  test("Test 6: Degree vs Engineering context distinction preserved across flows", async ({ page }) => {
    // 6a: Degree context in get-started
    await page.goto("/get-started?audience=college&context=degree");
    await expect(page.locator("text=/Degree Focus/i").first()).toBeVisible();

    // Continue to student
    const studentCard = page.locator('div[role="radio"]:has-text("Student")').first();
    await studentCard.click();
    const continueBtn = page.locator('button:has-text("Continue")');
    await continueBtn.click();
    await expect(page).toHaveURL(/\/get-started\/student/);
    await expect(page).toHaveURL(/context=degree/);
    await expect(page.locator("text=/Degree Focus/i").first()).toBeVisible();

    // 6b: Dashboard demo persona alignment: degree -> BCA in Computer Applications
    await page.goto("/dashboard/student?stage=degree-engineering&context=degree");
    await expect(page.locator("text=/BCA in Computer Applications/i").first()).toBeVisible();
    await expect(page.locator("text=/Build a Structured 3-Tier Python Project/i").first()).toBeVisible();

    // 6c: Dashboard demo persona alignment: engineering -> BE / B.Tech in Computer Science
    await page.goto("/dashboard/student?stage=degree-engineering&context=engineering");
    await expect(page.locator("text=/BE \\/ B\\.Tech in Computer Science/i").first()).toBeVisible();
  });

  // Test 7: Public-to-entry navigation preserves only approved context
  test("Test 7: Navigation preserves approved context parameters cleanly", async ({ page }) => {
    await page.goto("/college");

    // Click Discover CTA
    const discoverCTA = page.locator('a:has-text("Start Discover Path")').first();
    await expect(discoverCTA).toBeVisible();
    await discoverCTA.click();
    await expect(page).toHaveURL(/\/get-started/);
    await expect(page).toHaveURL(/audience=college/);
    await expect(page).toHaveURL(/situation=discover/);

    // Verify parameter safety
    const currentUrl = page.url();
    expect(currentUrl).not.toContain("password");
    expect(currentUrl).not.toContain("token");
  });

  // Test 8: Real authenticated profile never overwritten by demo URL query parameters
  test("Test 8: Real student profile is strictly protected against URL parameter overwrite", async ({ page }) => {
    // Seed real student profile into sessionStorage before page load (as in Flow 3 handoff)
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

    // Real profile display name/project must remain intact!
    await expect(
      page.locator("text=Build a Structured 3-Tier Python Project to Verify Your Skills")
    ).toBeVisible();
    await expect(
      page.locator("text=/BCA in Computer Applications/").first()
    ).toBeVisible();

    // Verify Class 4–7 demo persona is NOT displayed
    await expect(page.locator("text=Aanya Verma")).not.toBeVisible();
    await expect(page.locator("text=Ananya Sharma")).not.toBeVisible();
  });

  // Test 9: Header and footer anchors resolve correctly from any page
  test("Test 9: Header and footer anchor links resolve to homepage sections from subpages", async ({ page }) => {
    await page.goto("/school");

    // Click footer link for How It Works
    const howItWorksLink = page.locator('footer a[href="/#how-it-works"]').first();
    await expect(howItWorksLink).toBeVisible();
    await howItWorksLink.click();
    await expect(page).toHaveURL(/#how-it-works/);

    // From college, click Meet My Partner
    await page.goto("/college");
    const partnerLink = page.locator('footer a[href="/#my-partner"]').first();
    await expect(partnerLink).toBeVisible();
    await partnerLink.click();
    await expect(page).toHaveURL(/#my-partner/);
  });

  // Test 10: Desktop navigation and mobile/tablet drawer work at 390px, 768px, and 1280px
  test("Test 10: Navigation bar and drawer work across mobile, tablet, and desktop viewports", async ({ page }) => {
    // Desktop (1280px)
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await expect(page.locator('header a[href="/school"]').first()).toBeVisible();
    await expect(page.locator('header a[href="/college"]').first()).toBeVisible();

    // Tablet (768px)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    const tabletHamburger = page.locator('header button[aria-label*="menu" i]').first();
    await expect(tabletHamburger).toBeVisible();
    await tabletHamburger.click();
    // Drawer should open and be visible
    const tabletDrawer = page.locator('header div[role="dialog"]');
    await expect(tabletDrawer).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(tabletDrawer).not.toBeVisible();

    // Mobile (390px)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const mobileHamburger = page.locator('header button[aria-label*="menu" i]').first();
    await expect(mobileHamburger).toBeVisible();
    await mobileHamburger.click();
    const mobileDrawer = page.locator('header div[role="dialog"]');
    await expect(mobileDrawer).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(mobileDrawer).not.toBeVisible();
  });

  // Test 11: All CTAs perform meaningful actions
  test("Test 11: Primary CTAs link to valid routes without dead-end placeholder hrefs", async ({ page }) => {
    await page.goto("/");
    const ctas = page.locator('main a[href="#"], main a[href=""]');
    const deadLinkCount = await ctas.count();
    expect(deadLinkCount).toBe(0);

    await page.goto("/school");
    const schoolDeadLinks = await page.locator('main a[href="#"], main a[href=""]').count();
    expect(schoolDeadLinks).toBe(0);

    await page.goto("/college");
    const collegeDeadLinks = await page.locator('main a[href="#"], main a[href=""]').count();
    expect(collegeDeadLinks).toBe(0);

    await page.goto("/professionals");
    const profDeadLinks = await page.locator('main a[href="#"], main a[href=""]').count();
    expect(profDeadLinks).toBe(0);
  });

  // Test 12: No clipped or inaccessible primary content
  test("Test 12: Hero headings and primary badges are visible and unobstructed", async ({ page }) => {
    const viewports = [
      { width: 390, height: 844 },
      { width: 1280, height: 800 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto("/school");
      await expect(page.locator("h1")).toBeVisible();
      await page.goto("/college");
      await expect(page.locator("h1")).toBeVisible();
      await page.goto("/professionals");
      await expect(page.locator("h1")).toBeVisible();
    }
  });

  // Test 13: Zero horizontal overflow across all 5 viewports
  test("Test 13: Zero horizontal overflow across all 5 viewports on all public pages", async ({ page }) => {
    const viewports = [
      { width: 360, height: 740 },
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1280, height: 800 },
      { width: 1440, height: 900 },
    ];

    const paths = ["/", "/school", "/college", "/professionals", "/get-started"];

    for (const path of paths) {
      for (const vp of viewports) {
        await page.setViewportSize(vp);
        await page.goto(path);
        const hasOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });
        expect(hasOverflow).toBe(false);
      }
    }
  });

  // Test 14: Keyboard interaction and focus rings supported
  test("Test 14: Keyboard navigation and Enter/Space activation work on stage radio choices", async ({ page }) => {
    await page.goto("/get-started/student");
    const firstRadio = page.locator('div[role="radio"]').first();
    await firstRadio.focus();
    await page.keyboard.press("Space");
    await expect(firstRadio).toHaveAttribute("aria-checked", "true");
  });

  // Test 15: Public demos clearly labeled as non-assessment/demonstrations
  test("Test 15: Non-prescriptive disclaimers and sample exploration notices are clearly visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=/We don’t decide careers|enable clarity/i").first()).toBeVisible();

    await page.goto("/school");
    await expect(page.locator("text=/Zero Premature Career Labels|Curiosity Before Career Decisions/i").first()).toBeVisible();

    await page.goto("/college");
    await expect(page.locator("text=/Zero Course-Selling|exploratory experience/i").first()).toBeVisible();

    await page.goto("/professionals");
    await expect(page.locator("text=/In Active Research & Development|In Development/i").first()).toBeVisible();
  });

  // Test 16: Minor safety and guardian protections intact
  test("Test 16: Minor safety protections route under-13 students to guardian co-setup", async ({ page }) => {
    await page.goto("/get-started/student/access?stage=classes-4-7");
    await expect(page.locator("text=/Guardian-Led Co-Setup Required/i")).toBeVisible();

    // Proceed should navigate to guardian-support
    const proceedBtn = page.locator('button:has-text("Continue to Guardian Authorization")');
    await proceedBtn.click();
    await expect(page).toHaveURL(/\/guardian-support/);
  });

  // Test 17: Interactive matrix toggle in school and college dynamically renders without breaking
  test("Test 17: StudentExplorer accordion toggles dynamically on school and college pages", async ({ page }) => {
    // School page matrix accordion
    await page.goto("/school");
    const schoolMatrixBtn = page.locator('button:has-text("Browse Extended 24-Experience Matrix for School Stages")').first();
    await expect(schoolMatrixBtn).toBeVisible();
    await schoolMatrixBtn.click();
    // Wait for dynamic import to load and render
    await expect(page.locator("text=/Explore All 6 Domains Across School Cohorts/i")).toBeVisible();

    // College page matrix accordion
    await page.goto("/college");
    const collegeMatrixBtn = page.locator('button:has-text("Browse Extended 24-Experience Matrix for Higher Ed")').first();
    await expect(collegeMatrixBtn).toBeVisible();
    await collegeMatrixBtn.click();
    // Wait for dynamic import to load and render
    await expect(page.locator("text=/Explore Higher Education Cohorts & Disciplines/i")).toBeVisible();
  });

  // Test 18: Direct /get-started entry remains clean and functional
  test("Test 18: Direct /get-started entry displays clean unselected state without forced preselection", async ({ page }) => {
    await page.goto("/get-started");
    // Verify all role options visible
    await expect(page.locator('div[role="radio"]:has-text("Student")').first()).toBeVisible();
    await expect(page.locator('div[role="radio"]:has-text("Parent")').first()).toBeVisible();

    // Verify continue button is disabled until selection made
    const continueBtn = page.locator('button:has-text("Continue")');
    await expect(continueBtn).toBeDisabled();

    // Direct student stage entry without stage param
    await page.goto("/get-started/student");
    const stageContinueBtn = page.locator('button:has-text("Select an Academic Stage to Continue")');
    await expect(stageContinueBtn).toBeDisabled();
  });
});
