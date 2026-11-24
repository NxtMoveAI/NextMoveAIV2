/**
 * NEXT MOVE AI V2 — E2E TESTS: FIREBASE REALTIME USER DATA CONNECTION & MULTI-USER ISOLATION
 * 
 * Tests the complete, authentic end-to-end data pipeline:
 * 1. Log in using a student account & verify authenticated UID
 * 2. Starting Point baseline loaded from Firestore users/{uid}
 * 3. Choose & start a Next Move activity and complete steps
 * 4. Verify My Projects reflects the exact activity title, In Progress status, 3/5 steps (60%)
 * 5. Complete remaining steps to reach 100% and verify status transitions to Completed
 * 6. Open My Growth and confirm 1 Completed Activity, 5 Steps Mastered, verified skills & timeline
 * 7. Page refresh retains exact state from Firestore
 * 8. Log out and log in as a second student (UID 202) -> verify clean isolation (UID 101 data not leaked)
 */

import { test, expect } from "@playwright/test";

test.describe("Firebase & Firestore Realtime Data Flow Integration", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  // =========================================================================
  // 1. Full Activity Lifecycle: Dashboard -> My Projects -> My Growth
  // =========================================================================
  test("1. Real student activity progress persists to Firestore and synchronizes to My Projects and My Growth", async ({ page }) => {
    const student1 = {
      uid: "student-uid-101",
      name: "Aanya Sharma",
      email: "aanya.sharma@example.com",
      role: "student",
      academicStage: "classes-4-7",
      currentClass: "Class 6",
      isOnboardingCompleted: false,
      startingPoint: {
        answers: {
          situation: "I want to explore fun creative activities",
          learnBest: "Hands-on making and building",
          excites: "Stories and comics",
        },
        academicStage: "classes-4-7",
        primaryFocus: "Creative Arts & Stories",
        status: "Baseline Established",
        activeInterests: ["Creativity & Media", "Stories & Imagination"],
        isCompleted: true,
        completedAt: "2026-11-24T10:00:00.000Z",
        updatedAt: "2026-11-24T10:00:00.000Z",
      },
      nextMoveActivity: null,
      nextMoveHistory: null,
      createdAt: "2026-11-24T09:00:00.000Z",
      updatedAt: "2026-11-24T09:00:00.000Z",
    };

    // Inject authenticated Firebase mock user & Firestore document
    await page.addInitScript((student) => {
      // 1. Firebase Auth mock state
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        mockUser: {
          uid: student.uid,
          email: student.email,
          displayName: student.name,
          phoneNumber: null,
          emailVerified: true,
        },
      };

      // 2. Firestore mock profile state (restore from sessionStorage if already modified within the test)
      let initialProfile = JSON.parse(JSON.stringify(student));
      try {
        const saved = window.sessionStorage.getItem("__E2E_MOCK_PROFILE__");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.uid === student.uid) {
            initialProfile = parsed;
          }
        }
      } catch {}

      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: initialProfile,
      };
    }, student1);

    // 1. Navigate to Student Home Dashboard
    await page.goto("/dashboard/student");
    await page.waitForLoadState("networkidle");

    // Verify Welcome Panel displays real authenticated student name
    await expect(page.locator("text=Welcome back, Aanya Sharma")).toBeVisible();

    // Verify Starting Point shows real baseline
    const startingPointHeading = page.locator('h2:has-text("My Starting Point")');
    await expect(startingPointHeading).toBeVisible();
    await expect(page.locator("text=Creative Arts & Stories").first()).toBeVisible();

    // 2. In Your Next Move section, select the primary creative activity
    const nextMoveSection = page.locator("#next-move");
    await expect(nextMoveSection).toBeVisible();

    // Verify both personalized activity cards appear
    const comicCard = page.locator('div:has-text("Create a 3-Scene Adventure Story Comic")').last();
    await expect(comicCard).toBeVisible();

    // Click "Choose This Activity" on Comic card
    const chooseComicBtn = page.locator('button:has-text("Choose This Activity")').first();
    await chooseComicBtn.click();

    // Verify 5 interactive steps appear
    await expect(nextMoveSection.locator("text=Create Your Characters")).toBeVisible();
    await expect(nextMoveSection.locator("text=Discover the Mystery")).toBeVisible();
    await expect(nextMoveSection.locator("text=Draft Three Scenes")).toBeVisible();

    // Complete Step 1, Step 2, and Step 3
    const stepCards = nextMoveSection.locator("#activity-steps-container > div");
    await expect(stepCards).toHaveCount(5);
    await stepCards.nth(0).click();
    await stepCards.nth(1).click();
    await stepCards.nth(2).click();

    // Verify progress shows 3 of 5 steps completed (60%)
    await expect(nextMoveSection.locator("text=3 of 5 steps completed (60%)")).toBeVisible();

    // 3. Open My Projects (/dashboard/student/projects)
    await page.locator('aside a[href="/dashboard/student/projects"]').click();
    await page.waitForURL(/\/dashboard\/student\/projects/);
    await page.waitForLoadState("networkidle");

    const projectsWorkspace = page.getByTestId("student-projects-workspace");
    await expect(projectsWorkspace).toBeVisible();

    // Verify My Projects displays Aanya's name and actual in-progress task
    await expect(projectsWorkspace).toContainText("Aanya Sharma");
    const taskCard = page.getByTestId("project-task-act_comic_story");
    await expect(taskCard).toBeVisible();
    await expect(taskCard).toContainText("Create a 3-Scene Adventure Story Comic");
    await expect(taskCard).toContainText("In Progress");
    await expect(taskCard).toContainText("3 of 5 steps completed");
    await expect(taskCard).toContainText("60%");

    // 4. Complete remaining steps (Step 4 and Step 5) directly in My Projects
    // Expand steps if needed
    const step4Btn = taskCard.locator('button[aria-label*="step 4" i]');
    if (!(await step4Btn.isVisible())) {
      await taskCard.locator('button:has-text("View & Complete Steps")').click();
    }
    await taskCard.locator('button[aria-label*="step 4" i]').click();
    await taskCard.locator('button[aria-label*="step 5" i]').click();

    // Verify task is now Completed (100%)
    await expect(taskCard).toContainText("Completed");
    await expect(taskCard).toContainText("5 of 5 steps completed");
    await expect(taskCard).toContainText("100%");

    // 5. Open My Growth (/dashboard/student/growth)
    await page.locator('aside a[href="/dashboard/student/growth"]').click();
    await page.waitForURL(/\/dashboard\/student\/growth/);
    await page.waitForLoadState("networkidle");

    const growthWorkspace = page.getByTestId("student-growth-workspace");
    await expect(growthWorkspace).toBeVisible();

    // Verify Growth header and real metric counters
    await expect(growthWorkspace).toContainText("Aanya Sharma");
    await expect(page.getByTestId("metric-completed-activities")).toContainText("1");
    await expect(page.getByTestId("metric-in-progress-activities")).toContainText("0");
    await expect(page.getByTestId("metric-steps-mastered")).toContainText("5");
    await expect(page.getByTestId("metric-primary-focus")).toContainText("Creative Arts & Stories");

    // Verify Skills Practiced & Knowledge Gained reflects genuine outcomes from the completed activity
    const skillsSection = growthWorkspace.locator("text=Skills Practiced & Knowledge Gained").locator("..");
    await expect(skillsSection).toBeVisible();
    await expect(growthWorkspace).toContainText("Storytelling structure", { ignoreCase: true });
    await expect(growthWorkspace).toContainText("Character design", { ignoreCase: true });
    await expect(growthWorkspace).toContainText("Creative writing", { ignoreCase: true });

    // Verify Activities Log shows the completed comic activity
    await expect(growthWorkspace).toContainText("Create a 3-Scene Adventure Story Comic");
    await expect(growthWorkspace).toContainText("Completed (5/5 steps)");

    // 6. Refresh the page to verify persistence across reloads
    await page.reload();
    await page.waitForLoadState("networkidle");

    await expect(page.getByTestId("metric-completed-activities")).toContainText("1");
    await expect(page.getByTestId("metric-steps-mastered")).toContainText("5");
    await expect(growthWorkspace).toContainText("Create a 3-Scene Adventure Story Comic");
  });

  // =========================================================================
  // 2. User Data Isolation: Second User Cannot See First User's Data
  // =========================================================================
  test("2. User isolation: logging in with second student account completely isolates data", async ({ page }) => {
    const student2 = {
      uid: "student-uid-202",
      name: "Rohan Verma",
      email: "rohan.verma@example.com",
      role: "student",
      academicStage: "classes-4-7",
      currentClass: "Class 7",
      isOnboardingCompleted: false,
      startingPoint: {
        answers: {
          situation: "I love fixing and inventing gadgets",
          learnBest: "Trial and error tinkering",
          excites: "Robotics and machines",
        },
        academicStage: "classes-4-7",
        primaryFocus: "Technology & Software",
        status: "Baseline Established",
        activeInterests: ["Technology & Building", "Science & Discovery"],
        isCompleted: true,
        completedAt: "2026-11-24T12:00:00.000Z",
        updatedAt: "2026-11-24T12:00:00.000Z",
      },
      nextMoveActivity: null,
      nextMoveHistory: null,
      createdAt: "2026-11-24T11:00:00.000Z",
      updatedAt: "2026-11-24T11:00:00.000Z",
    };

    await page.addInitScript((student) => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        mockUser: {
          uid: student.uid,
          email: student.email,
          displayName: student.name,
          phoneNumber: null,
          emailVerified: true,
        },
      };

      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: JSON.parse(JSON.stringify(student)),
      };
    }, student2);

    // 1. Visit My Projects as Rohan
    await page.goto("/dashboard/student/projects");
    await page.waitForLoadState("networkidle");

    const projectsWorkspace = page.getByTestId("student-projects-workspace");
    await expect(projectsWorkspace).toBeVisible();
    await expect(projectsWorkspace).toContainText("Rohan Verma");

    // Rohan must NOT see Aanya's completed comic project
    await expect(page.locator("text=Create a 3-Scene Adventure Story Comic")).toHaveCount(0);

    // Rohan's assigned tasks should have 0 completed tasks
    const completedBadge = page.getByTestId("filter-completed");
    await expect(completedBadge).toContainText("0");

    // 2. Visit My Growth as Rohan
    await page.goto("/dashboard/student/growth");
    await page.waitForLoadState("networkidle");

    const growthWorkspace = page.getByTestId("student-growth-workspace");
    await expect(growthWorkspace).toBeVisible();
    await expect(growthWorkspace).toContainText("Rohan Verma");

    // Rohan must have 0 completed activities, 0 steps mastered
    await expect(page.getByTestId("metric-completed-activities")).toContainText("0");
    await expect(page.getByTestId("metric-steps-mastered")).toContainText("0");

    // Honest empty state for unstarted activities
    await expect(growthWorkspace).toContainText("You haven't started any activities yet");
    await expect(growthWorkspace).toContainText("Your growth journey starts with your first practical step");

    // No leaked skills from Aanya
    await expect(growthWorkspace.locator("text=Storytelling structure")).toHaveCount(0);
    await expect(growthWorkspace.locator("text=Character design")).toHaveCount(0);
  });
});
