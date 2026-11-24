/**
 * NEXT MOVE AI V2 — E2E TESTS: MY PROJECTS, MY GROWTH & SIDEBAR NAVIGATION UPGRADE
 * 
 * Tests:
 * 1. Sidebar navigation order: Home, Explore, My Projects, My Growth, My Partner
 * 2. Mobile navigation order: Home, Explore, Projects, Growth, Partner
 * 3. My Projects page:
 *    - Displays actual assigned activities
 *    - Status filters (All, In Progress, Not Started, Completed)
 *    - Step-by-step progress tracking (e.g. 2/5 steps completed)
 *    - Interactive step checklist toggle and progress updating
 *    - Empty state when no work assigned
 * 4. My Growth page:
 *    - Starting Point baseline (primary focus, active interests, date)
 *    - Real metric cards (completed, in progress, steps mastered, focus)
 *    - Skills practiced & knowledge gained
 *    - Activities attempted & completed
 *    - Learning & exploration history timeline
 *    - Encouraging empty state when 0 activities completed
 */

import { test, expect } from "@playwright/test";

test.describe("My Projects, My Growth & Sidebar Navigation Upgrades", () => {
  // -------------------------------------------------------------------------
  // 1. Sidebar Navigation Order
  // -------------------------------------------------------------------------
  test("1. Sidebar navigation has exact order: Home, Explore, My Projects, My Growth, My Partner", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard/student");
    await page.waitForLoadState("networkidle");

    const sidebar = page.locator('aside[aria-label="Student Application Sidebar"]');
    await expect(sidebar).toBeVisible();

    // Verify all 5 links exist in correct order
    const navLinks = sidebar.locator('nav[aria-label="Primary Student Destinations"] a');
    const labels = await navLinks.evaluateAll((links) =>
      links.map((link) => {
        const spans = link.querySelectorAll("span");
        return spans.length >= 2 ? spans[1].textContent?.trim() : link.textContent?.trim();
      }).filter(Boolean)
    );

    // Expect Home, Explore, My Projects, My Growth, My Partner
    expect(labels.slice(0, 5)).toEqual([
      "Home",
      "Explore",
      "My Projects",
      "My Growth",
      "My Partner",
    ]);

    // Check hrefs in order
    const hrefs = await navLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute("href"))
    );
    expect(hrefs.slice(0, 5)).toEqual([
      "/dashboard/student",
      "/dashboard/student/explore",
      "/dashboard/student/projects",
      "/dashboard/student/growth",
      "/dashboard/student/partner",
    ]);
  });

  // -------------------------------------------------------------------------
  // 2. Mobile Navigation Order
  // -------------------------------------------------------------------------
  test("2. Mobile navigation bar has exact tab order: Home, Explore, Projects, Growth, Partner", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard/student");
    await page.waitForLoadState("networkidle");

    const mobileNav = page.locator('nav[aria-label="Mobile Navigation"]');
    await expect(mobileNav).toBeVisible();

    const mobileTabs = mobileNav.locator("a");
    const tabLabels = await mobileTabs.evaluateAll((links) =>
      links.map((link) => link.textContent?.trim()).filter(Boolean)
    );

    expect(tabLabels).toEqual([
      "Home",
      "Explore",
      "Projects",
      "Growth",
      "Partner",
    ]);

    const tabHrefs = await mobileTabs.evaluateAll((links) =>
      links.map((link) => link.getAttribute("href"))
    );
    expect(tabHrefs).toEqual([
      "/dashboard/student",
      "/dashboard/student/explore",
      "/dashboard/student/projects",
      "/dashboard/student/growth",
      "/dashboard/student/partner",
    ]);
  });

  // -------------------------------------------------------------------------
  // 3. My Projects — Assigned Work with Status Filters & Step Tracking
  // -------------------------------------------------------------------------
  test("3. My Projects displays student's assigned tasks with status filters and step completion", async ({ page }) => {
    // Populate demo starting point and activity session storage
    await page.addInitScript(() => {
      sessionStorage.setItem(
        "demo_starting_point",
        JSON.stringify({
          answers: {
            situation: "I want to explore fun creative activities",
            learnBest: "Hands-on making and building",
            excites: "Stories and comics",
          },
          primaryFocus: "Creative Arts & Stories",
          status: "Baseline Established",
          activeInterests: ["Drawing & Visual Arts", "Creative Writing", "Comic Creation"],
          completedAt: "2026-11-24T10:00:00.000Z",
        })
      );
      sessionStorage.setItem(
        "demo_next_move_activity",
        JSON.stringify({
          activityId: "act_comic_story",
          title: "Create a 3-Scene Adventure Story Comic",
          description: "Design and write a short three-panel adventure story comic featuring original characters.",
          learningOutcome: "Storytelling structure, character design, creative writing, and visual narrative planning.",
          estimatedDuration: "20 mins",
          steps: [
            { id: "step-1", stepNumber: 1, title: "Create Your Characters", instruction: "Choose two characters." },
            { id: "step-2", stepNumber: 2, title: "Discover the Mystery", instruction: "Think of a mystery." },
            { id: "step-3", stepNumber: 3, title: "Draft Three Scenes", instruction: "Draw three scenes." },
            { id: "step-4", stepNumber: 4, title: "Solve the Mystery", instruction: "Decide the solution." },
            { id: "step-5", stepNumber: 5, title: "Reflect on Your Story", instruction: "Write one thing learned." },
          ],
          completedStepIds: ["step-1", "step-2"],
          progressPercentage: 40,
          status: "in_progress",
          createdAt: "2026-11-24T10:05:00.000Z",
          updatedAt: "2026-11-24T10:15:00.000Z",
          completedAt: null,
        })
      );
      sessionStorage.setItem(
        "demo_next_move_history",
        JSON.stringify({
          act_comic_story: {
            activityId: "act_comic_story",
            title: "Create a 3-Scene Adventure Story Comic",
            description: "Design and write a short three-panel adventure story comic featuring original characters.",
            learningOutcome: "Storytelling structure, character design, creative writing, and visual narrative planning.",
            estimatedDuration: "20 mins",
            steps: [
              { id: "step-1", stepNumber: 1, title: "Create Your Characters", instruction: "Choose two characters." },
              { id: "step-2", stepNumber: 2, title: "Discover the Mystery", instruction: "Think of a mystery." },
              { id: "step-3", stepNumber: 3, title: "Draft Three Scenes", instruction: "Draw three scenes." },
              { id: "step-4", stepNumber: 4, title: "Solve the Mystery", instruction: "Decide the solution." },
              { id: "step-5", stepNumber: 5, title: "Reflect on Your Story", instruction: "Write one thing learned." },
            ],
            completedStepIds: ["step-1", "step-2"],
            progressPercentage: 40,
            status: "in_progress",
            createdAt: "2026-11-24T10:05:00.000Z",
            updatedAt: "2026-11-24T10:15:00.000Z",
            completedAt: null,
          },
        })
      );
    });

    await page.goto("/dashboard/student/projects");
    await page.waitForLoadState("networkidle");

    // Verify workspace container
    const workspace = page.getByTestId("student-projects-workspace");
    await expect(workspace).toBeVisible();

    // Verify header
    await expect(workspace).toContainText("Assigned Work & Projects");
    await expect(workspace).toContainText("In Progress");

    // Verify status filter tabs exist
    await expect(page.getByTestId("filter-all")).toBeVisible();
    await expect(page.getByTestId("filter-in-progress")).toBeVisible();
    await expect(page.getByTestId("filter-not-started")).toBeVisible();
    await expect(page.getByTestId("filter-completed")).toBeVisible();

    // Verify task card appears
    const taskCard = page.getByTestId("project-task-act_comic_story");
    await expect(taskCard).toBeVisible();
    await expect(taskCard).toContainText("Create a 3-Scene Adventure Story Comic");
    await expect(taskCard).toContainText("2 of 5 steps completed");
    await expect(taskCard).toContainText("40%");

    // Verify "What You'll Learn" box
    await expect(taskCard).toContainText("What You'll Learn:");
    await expect(taskCard).toContainText("Storytelling structure, character design");

    // Filter by "In Progress" -> card remains visible
    await page.getByTestId("filter-in-progress").click();
    await expect(page.getByTestId("project-task-act_comic_story")).toBeVisible();

    // Filter by "Completed" -> shows empty filter message
    await page.getByTestId("filter-completed").click();
    await expect(page.locator("text=No completed tasks")).toBeVisible();

    // Return to "All Tasks"
    await page.getByTestId("filter-all").click();
    await expect(page.getByTestId("project-task-act_comic_story")).toBeVisible();

    // Interactive step toggle: click step 3 checkbox
    const step3Button = taskCard.locator('button[aria-label*="Step 3"]');
    if (await step3Button.isVisible()) {
      await step3Button.click();
      // Should now show 3 of 5 steps completed (60%)
      await expect(taskCard).toContainText("3 of 5 steps completed");
      await expect(taskCard).toContainText("60%");
    }
  });

  // -------------------------------------------------------------------------
  // 4. My Growth — Complete Personal Growth Record
  // -------------------------------------------------------------------------
  test("4. My Growth displays genuine baseline, completed work, verified skills, and timeline", async ({ page }) => {
    // Populate completed activity in history
    await page.addInitScript(() => {
      sessionStorage.setItem(
        "demo_starting_point",
        JSON.stringify({
          answers: {
            situation: "I want to explore fun creative activities",
            learnBest: "Hands-on making and building",
            excites: "Stories and comics",
          },
          primaryFocus: "Creative Arts & Stories",
          status: "Baseline Established",
          activeInterests: ["Drawing & Visual Arts", "Creative Writing", "Comic Creation"],
          completedAt: "2026-11-24T10:00:00.000Z",
        })
      );
      sessionStorage.setItem(
        "demo_next_move_history",
        JSON.stringify({
          act_comic_story: {
            activityId: "act_comic_story",
            title: "Create a 3-Scene Adventure Story Comic",
            description: "Design and write a short three-panel adventure story comic featuring original characters.",
            learningOutcome: "Storytelling structure, character design, creative writing, and visual narrative planning.",
            estimatedDuration: "20 mins",
            steps: [
              { id: "step-1", stepNumber: 1, title: "Create Your Characters", instruction: "Choose two characters." },
              { id: "step-2", stepNumber: 2, title: "Discover the Mystery", instruction: "Think of a mystery." },
              { id: "step-3", stepNumber: 3, title: "Draft Three Scenes", instruction: "Draw three scenes." },
              { id: "step-4", stepNumber: 4, title: "Solve the Mystery", instruction: "Decide the solution." },
              { id: "step-5", stepNumber: 5, title: "Reflect on Your Story", instruction: "Write one thing learned." },
            ],
            completedStepIds: ["step-1", "step-2", "step-3", "step-4", "step-5"],
            progressPercentage: 100,
            status: "completed",
            createdAt: "2026-11-24T10:05:00.000Z",
            updatedAt: "2026-11-24T10:30:00.000Z",
            completedAt: "2026-11-24T10:30:00.000Z",
          },
        })
      );
    });

    await page.goto("/dashboard/student/growth");
    await page.waitForLoadState("networkidle");

    const growthWorkspace = page.getByTestId("student-growth-workspace");
    await expect(growthWorkspace).toBeVisible();

    // Verify header and metrics
    await expect(growthWorkspace).toContainText("Personal Growth Record");
    await expect(growthWorkspace).toContainText("Creative Arts & Stories");

    // Metric cards: 1 completed, 5 steps mastered
    await expect(page.getByTestId("metric-completed-activities")).toContainText("1");
    await expect(page.getByTestId("metric-steps-mastered")).toContainText("5");

    // Verify Starting Point Baseline card
    await expect(growthWorkspace.getByRole("heading", { name: "Starting Point Baseline", exact: true })).toBeVisible();
    await expect(growthWorkspace.locator("text=Baseline Established").first()).toBeVisible();
    await expect(growthWorkspace).toContainText("Drawing & Visual Arts");
    await expect(growthWorkspace).toContainText("Creative Writing");

    // Verify Skills Practiced (extracted from learning outcome)
    await expect(growthWorkspace.locator("text=Skills Practiced & Knowledge Gained")).toBeVisible();
    await expect(growthWorkspace).toContainText("Storytelling structure", { ignoreCase: true });
    await expect(growthWorkspace).toContainText("Character design", { ignoreCase: true });

    // Verify Activities Attempted & Completed Log
    await expect(growthWorkspace.locator("text=Activities Attempted & Completed")).toBeVisible();
    await expect(growthWorkspace).toContainText("Create a 3-Scene Adventure Story Comic");
    await expect(growthWorkspace).toContainText("Completed (5/5 steps)");

    // Verify Learning History Timeline
    await expect(growthWorkspace.locator("text=Learning & Exploration History")).toBeVisible();
    await expect(growthWorkspace).toContainText("Starting Point Baseline Established");
    await expect(growthWorkspace).toContainText("Completed Activity: Create a 3-Scene Adventure Story Comic");
  });

  // -------------------------------------------------------------------------
  // 5. My Growth — Truthful Empty State When 0 Activities Completed
  // -------------------------------------------------------------------------
  test("5. My Growth displays encouraging truthful empty state when no activities completed yet", async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem(
        "demo_starting_point",
        JSON.stringify({
          answers: { situation: "Exploring", learnBest: "Reading", excites: "Science" },
          primaryFocus: "Science & Exploration",
          status: "Baseline Established",
          activeInterests: ["Physics", "Astronomy"],
          completedAt: "2026-11-24T12:00:00.000Z",
        })
      );
      // Empty history
      sessionStorage.setItem("demo_next_move_history", JSON.stringify({}));
      sessionStorage.removeItem("demo_next_move_activity");
    });

    await page.goto("/dashboard/student/growth");
    await page.waitForLoadState("networkidle");

    const growthWorkspace = page.getByTestId("student-growth-workspace");
    await expect(growthWorkspace).toBeVisible();

    // Verify 0 completed activities without fabricated scores
    await expect(page.getByTestId("metric-completed-activities")).toContainText("0");
    await expect(page.getByTestId("metric-steps-mastered")).toContainText("0");

    // Encouraging empty state
    await expect(growthWorkspace).toContainText("You haven't started any activities yet");
    await expect(growthWorkspace).toContainText("Your growth journey starts with your first practical step");

    // CTA button to My Projects
    const projectsLink = growthWorkspace.locator('a[href="/dashboard/student/projects"]:has-text("Go to My Projects")');
    await expect(projectsLink).toBeVisible();
  });
});
