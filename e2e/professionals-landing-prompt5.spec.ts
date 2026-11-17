import { test, expect } from "@playwright/test";

test.describe("Prompt 5: Dynamic Professionals Landing Page (/professionals)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/professionals");
    await page.waitForLoadState("domcontentloaded");
  });

  test("1. Professional page renders with correct metadata and semantic structure", async ({ page }) => {
    await expect(page).toHaveTitle(/Next Move Grow — Professional Learning & Development Preview \| Next Move AI/);

    const mainHeader = page.locator("header");
    await expect(mainHeader).toBeVisible();

    const mainElement = page.locator("main");
    await expect(mainElement).toBeVisible();

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("2. Upcoming in-development status is clearly and prominently visible", async ({ page }) => {
    const heroSection = page.locator("section").first();
    await expect(heroSection).toBeVisible();

    // Check badges and text declaring in-development status
    await expect(heroSection).toContainText(/Professional Learning Experience — In Development/i);
    await expect(heroSection).toContainText("Your experience matters.");
    await expect(heroSection).toContainText("Your next move starts with what you know.");
    await expect(heroSection).toContainText(/In Active Research & Development/i);

    // Verify preview card badge
    await expect(heroSection.locator("text=In Development").first()).toBeVisible();
  });

  test("3. Upskill / Reskill / Transition selector works and switches modes", async ({ page }) => {
    const goalSection = page.locator("#growth-directions");
    await expect(goalSection).toBeVisible();

    // Verify initial Upskill mode
    await expect(goalSection).toContainText("I want to grow in my existing profession.");
    await expect(goalSection).toContainText("Grow in Place");

    // Click Reskill
    const reskillBtn = goalSection.locator('button:has-text("Reskill")').first();
    await reskillBtn.click();
    await expect(goalSection).toContainText("I want to develop capabilities for new responsibilities or emerging work.");
    await expect(goalSection).toContainText("Adapt & Expand");

    // Click Transition
    const transitionBtn = goalSection.locator('button:has-text("Career Transition")').first();
    await transitionBtn.click();
    await expect(goalSection).toContainText("I want to explore moving into a different professional direction.");
    await expect(goalSection).toContainText("Realistic Pivot");
  });

  test("4. Each mode changes relevant content (personas, strengths, activities)", async ({ page }) => {
    const goalSection = page.locator("#growth-directions");

    // Upskill: Check Marketing, Operations, Educator
    const upskillBtn = goalSection.locator('button:has-text("Upskill")').first();
    await upskillBtn.click();
    await expect(goalSection).toContainText("Marketing Professional");
    await expect(goalSection).toContainText("Operations Professional");
    await expect(goalSection).toContainText("Teacher / Educator");

    // Reskill: Check Admin, Customer Support, QA
    const reskillBtn = goalSection.locator('button:has-text("Reskill")').first();
    await reskillBtn.click();
    await expect(goalSection).toContainText("Administrative Professional");
    await expect(goalSection).toContainText("Customer Support Specialist");
    await expect(goalSection).toContainText("Quality Assurance / Inspection Officer");

    // Transition: Check Non-IT, Sales, Engineer
    const transitionBtn = goalSection.locator('button:has-text("Career Transition")').first();
    await transitionBtn.click();
    await expect(goalSection).toContainText("Non-IT Professional");
    await expect(goalSection).toContainText("Sales / Account Manager");
    await expect(goalSection).toContainText("Mechanical / Civil Engineer");
  });

  test("5. State resets when switching modes or personas", async ({ page }) => {
    const goalSection = page.locator("#growth-directions");

    // On Upskill, write a reflection note
    const upskillBtn = goalSection.locator('button:has-text("Upskill")').first();
    await upskillBtn.click();

    const textarea = goalSection.locator("textarea");
    await textarea.fill("My personal reflection about marketing campaigns");

    const submitBtn = goalSection.locator('button:has-text("Simulate My Partner Reflection")');
    await submitBtn.click();

    await expect(goalSection).toContainText("My Partner Socratic Perspective:");
    await expect(goalSection).toContainText("My personal reflection about marketing campaigns");

    // Switch to Reskill -> Reflection must be reset
    const reskillBtn = goalSection.locator('button:has-text("Reskill")').first();
    await reskillBtn.click();

    await expect(goalSection).not.toContainText("My personal reflection about marketing campaigns");
    await expect(goalSection.locator("textarea")).toHaveValue("");
  });

  test("6. Transferable capability examples display across 4 functional clusters", async ({ page }) => {
    const capSection = page.locator("#transferable-capabilities");
    await expect(capSection).toBeVisible();
    await expect(capSection).toContainText("Your experience is not wasted.");

    // Check cluster tabs
    await expect(capSection).toContainText("Communication & Stakeholder Translation");
    await expect(capSection).toContainText("Data Interpretation & Analytical Rigor");
    await expect(capSection).toContainText("Process Optimization & Operational Workflow");
    await expect(capSection).toContainText("People Coordination & Crisis Resilience");

    // Test switching to Data Interpretation
    const dataClusterBtn = capSection.locator('button:has-text("Data Interpretation")');
    await dataClusterBtn.click();
    await expect(capSection).toContainText("Branch Accountant / Retail Store Auditor");
    await expect(capSection).toContainText("Business Intelligence Analyst");

    // Test switching to Process Optimization
    const processClusterBtn = capSection.locator('button:has-text("Process Optimization")');
    await processClusterBtn.click();
    await expect(capSection).toContainText("Warehouse Operations Supervisor");
    await expect(capSection).toContainText("Logistics Systems & Automation Specialist");
  });

  test("7. Practical experience preview renders 6 curated exercises with reflection", async ({ page }) => {
    const practicalSection = page.locator("#practical-preview");
    await expect(practicalSection).toBeVisible();
    await expect(practicalSection).toContainText("Experience a possible next direction.");

    // Check 6 pill options
    await expect(practicalSection).toContainText("Analyse a Multi-Channel Sales Dataset");
    await expect(practicalSection).toContainText("Map an Operational Hand-Off Workflow");
    await expect(practicalSection).toContainText("Create a Realistic 30-Day Project Plan");
    await expect(practicalSection).toContainText("Design a High-Touch Customer Service Process");
    await expect(practicalSection).toContainText("Evaluate a Digital Automation Opportunity");
    await expect(practicalSection).toContainText("Investigate an Industry Structural Problem");

    // Switch to Workflow exercise
    const workflowBtn = practicalSection.locator('button:has-text("Map an Operational Hand-Off Workflow")');
    await workflowBtn.click();
    await expect(practicalSection).toContainText("Visual Workflow Diagram & Exception SOP");

    // Interactive reflection sandbox in practical preview
    const reflectionArea = practicalSection.locator("textarea");
    await reflectionArea.fill("Workers skip software because it is 5 clicks too slow.");
    const feedbackBtn = practicalSection.locator('button:has-text("Simulate My Partner Feedback")');
    await feedbackBtn.click();

    await expect(practicalSection).toContainText("My Partner Analytical Review:");
  });

  test("8. No live job or placement claims, salary guarantees, or vacancy boards", async ({ page }) => {
    const bodyText = await page.innerText("main");

    // Verify negative boundaries & ethical disclosures
    expect(bodyText).not.toMatch(/100% Placement Guaranteed/i);
    expect(bodyText).not.toMatch(/Average Salary: ₹\d+/i);
    expect(bodyText).not.toMatch(/Active Vacancies: \d+/i);

    // Verify presence of ethical truth disclosures
    expect(bodyText).toContain("Ethical Platform Boundaries & No Vacancy Claims");
    expect(bodyText).toContain("Truthful Career Transition Standards");
    expect(bodyText).toContain("not a commercial placement agency, recruitment consultancy, headhunting service, or live job portal");
  });

  test("9. No fake AI assessment, scoring, or automated job-readiness badges", async ({ page }) => {
    const bodyText = await page.innerText("main");

    expect(bodyText).not.toMatch(/Your AI Career Fit Score: \d+%/i);
    expect(bodyText).not.toMatch(/100% Job-Ready Certified/i);

    // Verify truth invariant statements
    expect(bodyText).toContain("We do not fabricate quantitative transferable skill percentages");
  });

  test("10. Contact and research CTAs are truthful and honest (no fake registration)", async ({ page }) => {
    const researchSection = page.locator("#research-notice");
    await expect(researchSection).toBeVisible();
    await expect(researchSection).toContainText("Help shape Next Move Grow.");
    await expect(researchSection).toContainText("Participate in Research");

    // Mailto anchor check
    const emailLink = researchSection.locator('a[href*="mailto:contact@nextmove.ai"]');
    await expect(emailLink).toBeVisible();
    await expect(researchSection).toContainText("We do not run a fake waiting list or save personal data without real submission.");
  });

  test("11. All section anchors resolve to valid targets on the page", async ({ page }) => {
    const primaryHeroCta = page.locator('a[href="#growth-directions"]').first();
    await expect(primaryHeroCta).toBeVisible();

    const growthSection = page.locator("#growth-directions");
    await expect(growthSection).toBeVisible();

    // Check all page landmark section IDs exist
    await expect(page.locator("#growth-directions")).toBeAttached();
    await expect(page.locator("#transferable-capabilities")).toBeAttached();
    await expect(page.locator("#practical-preview")).toBeAttached();
    await expect(page.locator("#flexible-pathways")).toBeAttached();
    await expect(page.locator("#opportunities")).toBeAttached();
    await expect(page.locator("#professional-partner")).toBeAttached();
    await expect(page.locator("#research-notice")).toBeAttached();
    await expect(page.locator("#professional-faqs")).toBeAttached();
  });

  test("12. Cross-audience navigation links to /school and /college", async ({ page }) => {
    const schoolCard = page.locator('a[href="/school"]');
    await expect(schoolCard.first()).toBeVisible();

    const collegeCard = page.locator('a[href="/college"]');
    await expect(collegeCard.first()).toBeVisible();
  });

  test("13. Responsive layouts have no horizontal overflow across 5 standard viewports", async ({ page }) => {
    const viewports = [
      { width: 360, height: 740, name: "360px" },
      { width: 390, height: 844, name: "390px" },
      { width: 768, height: 1024, name: "768px" },
      { width: 1280, height: 800, name: "1280px" },
      { width: 1440, height: 900, name: "1440px" },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(100);

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasHorizontalScroll, `Horizontal scroll detected at ${vp.name}`).toBeFalsy();
    }
  });

  test("14. Existing School page (/school) remains intact and operational", async ({ page }) => {
    await page.goto("/school");
    await page.waitForLoadState("domcontentloaded");

    await expect(page).toHaveTitle(/Next Move Explore — School & Stream Discovery/);
    await expect(page.locator("h1").first()).toContainText(/Big discoveries begin with small curiosities/i);
    await expect(page.locator("#school-stages")).toBeVisible();
  });

  test("15. Existing College page (/college) remains intact and operational with Prompt 4 follow-up adjustments", async ({ page }) => {
    await page.goto("/college");
    await page.waitForLoadState("domcontentloaded");

    await expect(page).toHaveTitle(/Next Move Build — Higher Education & Degree Roadmaps/);
    await expect(page.locator("h1").first()).toContainText(/Your degree is one part of your journey/i);
    await expect(page.locator("#college-framework")).toBeVisible();

    // Verify qualified roadmaps and flexible starter wording
    const frameworkSection = page.locator("#college-framework");
    const beginBtn = frameworkSection.locator('button:has-text("Begin")').first();
    await beginBtn.click();
    await expect(frameworkSection).toContainText(/Starter (Roadmap|Plan)/i);

    const roadmapSection = page.locator("#college-roadmaps");
    await expect(roadmapSection).toContainText(/Actionable roadmaps (grounded in|designed around) demonstrated capability/i);
  });
});
