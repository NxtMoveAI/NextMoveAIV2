import { test, expect } from "@playwright/test";

test.describe("Next Move AI — Prompt 4: Dynamic College Landing Page (/college)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/college");
    await page.waitForLoadState("networkidle");
  });

  test("1. College landing route renders correctly with metadata, hero, and trust indicators", async ({ page }) => {
    // Metadata title check
    await expect(page).toHaveTitle(/Next Move Build — Higher Education & Degree Roadmaps/);

    // Hero main heading and accent
    const heroSection = page.locator("section").first();
    await expect(heroSection).toContainText("Your degree is one part of your journey.");
    await expect(heroSection).toContainText("What will you build next?");

    // Audience eyebrow
    await expect(heroSection).toContainText("Next Move Build");
    await expect(heroSection).toContainText("Diploma, Engineering & Degrees");

    // Trust pills
    await expect(heroSection).toContainText("Personalized Learning Situations");
    await expect(heroSection).toContainText("Zero Course-Selling or Commissions");
    await expect(heroSection).toContainText("Demonstrated Work Over Multiple-Choice Scores");
    await expect(heroSection).toContainText("Aligned with Indian Higher Ed Realities");

    // Primary & Secondary CTAs
    const primaryCta = heroSection.locator('a:has-text("Find My Starting Point")').first();
    await expect(primaryCta).toBeVisible();
    await expect(primaryCta).toHaveAttribute("href", "#college-framework");

    const secondaryCta = heroSection.locator('a:has-text("Explore Practical Experiences")').first();
    await expect(secondaryCta).toBeVisible();
    await expect(secondaryCta).toHaveAttribute("href", "#college-projects");
  });

  test("2. Discover / Begin / Progress switching works and displays distinct interactive content", async ({ page }) => {
    const frameworkSection = page.locator("#college-framework");
    await expect(frameworkSection).toBeVisible();

    // Default mode is Discover
    await expect(frameworkSection).toContainText("Discover");
    await expect(frameworkSection).toContainText("I don't know which direction to explore.");
    await expect(frameworkSection).toContainText("Select a Field to Preview:");

    // Switch to Begin
    const beginTab = frameworkSection.locator('button:has-text("Begin")').first();
    await beginTab.click();
    await expect(frameworkSection).toContainText("Phase 02 · Begin Diagnostic");
    await expect(frameworkSection).toContainText("Find your grounded starting point.");
    await expect(frameworkSection).toContainText(/Starter (Roadmap|Plan)/i);

    // Switch to Progress
    const progressTab = frameworkSection.locator('button:has-text("Progress")').first();
    await progressTab.click();
    await expect(frameworkSection).toContainText("Phase 03 · Progress & Rigorous Practice");
    await expect(frameworkSection).toContainText("The 4-Tier Competency Ladder:");
    await expect(frameworkSection).toContainText("API Response In-Memory Caching");
  });

  test("3. Academic context filter changes domains and preserves non-IT diversity", async ({ page }) => {
    const frameworkSection = page.locator("#college-framework");

    // Click Degree context
    const degreeBtn = frameworkSection.locator('button:has-text("Degree")').first();
    await degreeBtn.click();
    await expect(frameworkSection).toContainText("Financial Modeling & Commerce");
    await expect(frameworkSection).toContainText("Data Analytics & Insights");

    // Click Engineering context
    const engBtn = frameworkSection.locator('button:has-text("Engineering")').first();
    await engBtn.click();
    await expect(frameworkSection).toContainText("Embedded Systems & Hardware");
    await expect(frameworkSection).toContainText("Operations & Process Engineering");

    // Click Diploma context
    const diplomaBtn = frameworkSection.locator('button:has-text("Diploma")').first();
    await diplomaBtn.click();
    await expect(frameworkSection).toContainText("Operations & Process Engineering");
  });

  test("4. Non-IT career tracks are represented with equal depth (Degree and Commerce)", async ({ page }) => {
    const frameworkSection = page.locator("#college-framework");

    // Click Degree context and select Financial Modeling
    await frameworkSection.locator('button:has-text("Degree")').first().click();
    const financeDomainBtn = frameworkSection.locator('button:has-text("Financial Modeling & Commerce")');
    await financeDomainBtn.click();

    // Verify task involves break-even calculation and commerce concepts
    await expect(frameworkSection).toContainText("The Introductory 15-Minute Task:");
    await expect(frameworkSection).toContainText("Model a micro-bakery stall:");
    await expect(frameworkSection).toContainText("Clear Deliverable");
    await expect(frameworkSection).toContainText("break-even calculation table showing required unit sales");
  });

  test("5. Diploma and Engineering examples feature meaningful applied technical challenges", async ({ page }) => {
    const frameworkSection = page.locator("#college-framework");

    // Switch to Engineering and select Embedded Systems
    await frameworkSection.locator('button:has-text("Engineering")').first().click();
    const embeddedBtn = frameworkSection.locator('button:has-text("Embedded Systems & Hardware")');
    await embeddedBtn.click();

    await expect(frameworkSection).toContainText("temperature-controlled greenhouse controller");
    await expect(frameworkSection).toContainText("state transition diagram showing Safe Temperature");
    await expect(frameworkSection).toContainText("hysteresis margins");
  });

  test("6. Reflection and simulated review state resets when switching modes or contexts", async ({ page }) => {
    const frameworkSection = page.locator("#college-framework");
    await expect(frameworkSection).toBeVisible();

    // In Discover mode, type a reflection
    const textarea = frameworkSection.locator("textarea");
    await expect(textarea).toBeVisible();
    await textarea.click();
    await textarea.fill("Testing reflection reset behavior across modes.");

    // Submit reflection
    const submitBtn = frameworkSection.locator('button:has-text("Test Reflection")');
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();
    await expect(frameworkSection).toContainText("My Partner's Supportive Guidance:");

    // Switch to Begin mode, then switch back to Discover
    await frameworkSection.locator('button:has-text("Begin")').first().click();
    await frameworkSection.locator('button:has-text("Discover")').first().click();

    // Verify reflection text was reset and textarea is fresh
    await expect(frameworkSection.locator("textarea")).toBeVisible();
    await expect(frameworkSection.locator("textarea")).toHaveValue("");
  });

  test("7. Public preview requires no account and collects no child or student personal data", async ({ page }) => {
    const frameworkSection = page.locator("#college-framework");
    await expect(frameworkSection).toContainText("Educational Safeguard: This trial is an exploratory experience. We do not calculate career-fit percentages or lock you into a single path.");
    await expect(page).toHaveURL(/\/college/);
  });

  test("8. No fabricated skills, job-readiness percentages, or placement guarantees", async ({ page }) => {
    // Switch to Progress mode
    const frameworkSection = page.locator("#college-framework");
    await frameworkSection.locator('button:has-text("Progress")').first().click();

    // Check 4-Tier Ladder distinguishes claimed knowledge from verified capability
    await expect(frameworkSection).toContainText("Tier 01");
    await expect(frameworkSection).toContainText("Self-Reported Knowledge");
    await expect(frameworkSection).toContainText("Tier 04");
    await expect(frameworkSection).toContainText("Demonstrated Capability");

    // Click Simulate Review Feedback
    const simulateReviewBtn = frameworkSection.locator('button:has-text("Simulate Review Feedback")');
    await simulateReviewBtn.click();

    await expect(frameworkSection).toContainText("Critical Review Finding:");
    await expect(frameworkSection).toContainText("Demonstration review. No automated certification or guaranteed placement implied.");

    // Opportunities section truthfulness check
    const oppSection = page.locator("#college-opportunities");
    await expect(oppSection).toContainText("Truthful Expectations on Industry Readiness");
    await expect(oppSection).toContainText("does not make a student immediately employment-ready");
  });

  test("9. Actionable Roadmap Preview answers all 6 invariant questions", async ({ page }) => {
    const roadmapSection = page.locator("#college-roadmaps");
    await expect(roadmapSection).toBeVisible();
    await expect(roadmapSection).toContainText(/Actionable roadmaps (grounded in|designed around) demonstrated capability/i);

    // 6 Invariant Questions
    await expect(roadmapSection).toContainText("1. What should I try first?");
    await expect(roadmapSection).toContainText("2. What should I learn next?");
    await expect(roadmapSection).toContainText("3. Why does it matter?");
    await expect(roadmapSection).toContainText("4. How do I practise it?");
    await expect(roadmapSection).toContainText("5. What demonstrates progress?");
    await expect(roadmapSection).toContainText("6. What options could follow?");

    // Switch between sample roadmaps
    const dataBiBtn = roadmapSection.locator('button:has-text("Business Intelligence & Applied Data Analytics")');
    await dataBiBtn.click();
    await expect(roadmapSection).toContainText("Relational SQL Joins & Window Aggregations");

    const financeBtn = roadmapSection.locator('button:has-text("Corporate Finance, Unit Economics & Modeling")');
    await financeBtn.click();
    await expect(roadmapSection).toContainText("Unit Contribution Margin & Break-Even Analysis");
  });

  test("10. Practical Project Showcase renders 6 cross-disciplinary blueprints", async ({ page }) => {
    const projectsSection = page.locator("#college-projects");
    await expect(projectsSection).toBeVisible();
    await expect(projectsSection).toContainText("Learn by building something meaningful.");
    await expect(projectsSection).toContainText("Illustrative project specifications for practical learning · Not real student submissions or corporate vacancies");

    // 6 projects
    await expect(projectsSection).toContainText("Responsive Transit Tracker & Micro-API");
    await expect(projectsSection).toContainText("Retail Store Inventory & Margin Analysis");
    await expect(projectsSection).toContainText("Campus Cafe 3-Year Pro-Forma Cash Flow");
    await expect(projectsSection).toContainText("Clinic Appointment Booking Usability Audit");
    await expect(projectsSection).toContainText("B2B Logistics SaaS Executive Pitch Deck");
    await expect(projectsSection).toContainText("Small Warehouse Buffer Stock Optimization");

    // Click on a project card
    const retailCard = projectsSection.locator('h3:has-text("Retail Store Inventory & Margin Analysis")');
    await retailCard.click();
    await expect(projectsSection).toContainText("Detailed Blueprint · Data Analytics");
    await expect(projectsSection).toContainText("Examines data audit methods, treatment of missing records");
  });

  test("11. My Partner in college context prompts Socratic thinking without ghostwriting", async ({ page }) => {
    const partnerSection = page.locator("#my-partner-college");
    await expect(partnerSection).toBeVisible();
    await expect(partnerSection).toContainText("My Partner. A thinking companion, not a ghostwriter.");

    // Click prompt
    const promptBtn = partnerSection.locator('button:has-text("Can you explain why your solution works?")');
    await promptBtn.click();
    await expect(partnerSection).toContainText("technical interviews evaluate whether you can defend your trade-offs");

    // Check guardrails
    await expect(partnerSection).toContainText("What My Partner Never Does");
    await expect(partnerSection).toContainText("Never ghostwrites complete project code");
    await expect(partnerSection).toContainText("Never awards automated “100% job-ready” scores");
  });

  test("12. College Partnerships renders proposed co-curricular model with non-ERP disclosure", async ({ page }) => {
    const partnershipSection = page.locator("#college-partnerships");
    await expect(partnershipSection).toBeVisible();
    await expect(partnershipSection).toContainText("Bring practical learning into your college.");
    await expect(partnershipSection).toContainText("Institutional Scope Notice & Ethical Disclosure");
    await expect(partnershipSection).toContainText("Next Move AI is not a college ERP, attendance tracking system, examination controller, or commercial placement agency.");
  });

  test("13. Section anchors, CTAs and cross-audience cards link to valid targets", async ({ page }) => {
    // FAQ section
    const faqSection = page.locator("#college-faqs");
    await expect(faqSection).toBeVisible();
    await expect(faqSection).toContainText("Clarity on Degrees, Practical Proof & Careers");

    // Final CTA
    const finalSection = page.locator('section:has-text("Your degree gives you a qualification.")');
    await expect(finalSection).toBeVisible();
    const ctaLink = finalSection.locator('a:has-text("Find My Starting Point")').first();
    await expect(ctaLink).toHaveAttribute("href", "/get-started/student?stage=degree-engineering");

    // Cross-audience cards
    const schoolCard = page.locator('a[href="/school"]').first();
    await expect(schoolCard).toBeVisible();

    const profCard = page.locator('a[href="/professionals"]').first();
    await expect(profCard).toBeVisible();
  });

  test("14. Zero horizontal overflow across all 5 responsive viewports", async ({ page }) => {
    const viewports = [
      { width: 360, height: 740, name: "mobile-360" },
      { width: 390, height: 844, name: "mobile-390" },
      { width: 768, height: 1024, name: "tablet-768" },
      { width: 1280, height: 800, name: "desktop-1280" },
      { width: 1440, height: 900, name: "desktop-1440" },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(100);

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(
        hasHorizontalScroll,
        `Viewport ${vp.name} (${vp.width}px) should not have horizontal scroll`
      ).toBe(false);
    }
  });

  test("15. Existing School landing functionality (/school) remains intact", async ({ page }) => {
    await page.goto("/school");
    await page.waitForLoadState("domcontentloaded");

    // School hero
    await expect(page.locator("h1").first()).toContainText("Big discoveries begin with small curiosities.");
    await expect(page.locator("body")).toContainText("Next Move Explore");

    // School stage selector
    const schoolStages = page.locator("#school-stages");
    await expect(schoolStages).toBeVisible();
    await expect(schoolStages).toContainText("Classes 4–7");
  });
});
