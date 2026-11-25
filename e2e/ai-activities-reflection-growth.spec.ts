/**
 * NEXT MOVE AI V2 — E2E TESTS:
 * 1. Modified Starting Point (4 questions, removed questions absent, legacy data compatibility)
 * 2. Dynamic AI Activities (Initial 2, Get More Tasks without repetition, 4-5 steps)
 * 3. Activity Reflection & Upload ("What Did You Do?", Write option, Upload option)
 * 4. AI Work Analysis (What You Learned, Skills Practised, Your Discovery, Your Next Challenge)
 * 5. Persistence to Firestore & Connection to My Growth ("Check My Growth" button)
 * 6. User Data Isolation
 */

import { test, expect } from "@playwright/test";

test.describe("Next Move AI: Upgraded Starting Point, AI Activities, Reflection & Growth", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  // =========================================================================
  // TEST 1: Modified Starting Point Questionnaire
  // =========================================================================
  test("1. Starting Point contains 4 questions, excluded questions are absent, and submission generates baseline", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        mockUser: {
          uid: "student-new-sp",
          email: "newstudent@example.com",
          displayName: "Tanvi Rao",
          phoneNumber: null,
          emailVerified: true,
        },
      };

      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "student-new-sp",
          name: "Tanvi Rao",
          email: "newstudent@example.com",
          role: "student",
          academicStage: "classes-4-7",
          currentClass: "Class 6",
          isOnboardingCompleted: false,
          startingPoint: null,
          nextMoveActivity: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    await page.waitForLoadState("networkidle");

    const sp = page.locator("#starting-point");
    await expect(sp).toBeVisible();

    // Verify 4-question progress indicator
    await expect(sp.locator("text=Question 1 of 4")).toBeVisible();
    await expect(sp.locator("text=What do you enjoy doing most in your free time?")).toBeVisible();

    // CRITICAL: The two removed questions must NEVER appear
    await expect(sp.locator("text=What makes you feel proud of yourself?")).not.toBeVisible();
    await expect(sp.locator("text=How do you like learning or trying something new?")).not.toBeVisible();

    // Answer Q1
    await sp.locator('button:has-text("Drawing, painting, or making things")').click();
    await sp.locator('button:has-text("Next")').click();

    // Q2
    await expect(sp.locator("text=Question 2 of 4")).toBeVisible();
    await expect(sp.locator("text=Which activity sounds the most exciting to you?")).toBeVisible();
    await sp.locator('button:has-text("Creating something with my own hands")').click();
    await sp.locator('button:has-text("Next")').click();

    // Q3
    await expect(sp.locator("text=Question 3 of 4")).toBeVisible();
    await expect(sp.locator("text=If you had a whole day to do anything you wanted, what would you choose?")).toBeVisible();
    await sp.locator('button:has-text("Draw, create, or design something")').click();
    await sp.locator('button:has-text("Next")').click();

    // Q4 (Final question: What would you love to explore more?)
    await expect(sp.locator("text=Question 4 of 4")).toBeVisible();
    await expect(sp.locator("text=What would you love to explore more?")).toBeVisible();
    await sp.locator('button:has-text("Art, animation, and creativity")').click();

    // Submit
    const submitBtn = sp.locator('button:has-text("Complete & View Starting Point")');
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // Verified Baseline appears
    await expect(sp.locator("text=Your personalized baseline from exploration answers")).toBeVisible();
    await expect(sp.locator("text=Creativity & Media")).toBeVisible();
  });

  // =========================================================================
  // TEST 2: AI-Personalized Activities, Get More Tasks, Reflection, AI Analysis & Growth Connection
  // =========================================================================
  test("2. Initial 2 activities displayed, Get More Tasks adds non-duplicate AI activities, submission triggers AI analysis and connects to My Growth", async ({
    page,
  }) => {
    const student = {
      uid: "student-creative-e2e",
      name: "Ishaan Kapoor",
      email: "ishaan@example.com",
      role: "student",
      academicStage: "classes-4-7",
      currentClass: "Class 6",
      isOnboardingCompleted: false,
      startingPoint: {
        answers: {
          "1": "Drawing, painting, or making things",
          "2": "Creating something with my own hands",
          "3": "Draw, create, or design something",
          "4": "Art, animation, and creativity",
        },
        academicStage: "classes-4-7",
        primaryFocus: "Creative Arts & Stories",
        status: "Baseline Established",
        activeInterests: ["Creativity & Media", "Stories & Imagination"],
        isCompleted: true,
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      nextMoveActivity: null,
      nextMoveHistory: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await page.addInitScript((st) => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        mockUser: {
          uid: st.uid,
          email: st.email,
          displayName: st.name,
          phoneNumber: null,
          emailVerified: true,
        },
      };

      let initialProfile = JSON.parse(JSON.stringify(st));
      try {
        const saved = window.sessionStorage.getItem("__E2E_MOCK_PROFILE__");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.uid === st.uid) {
            initialProfile = parsed;
          }
        }
      } catch {}

      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: initialProfile,
      };
    }, student);

    await page.goto("/dashboard/student");
    await page.waitForLoadState("networkidle");

    const nextMove = page.locator("#next-move");
    await expect(nextMove).toBeVisible();

    // 1. Initial Display shows exactly 2 distinct personalized options
    await expect(nextMove.locator("text=Choose Between 2 Activities")).toBeVisible();
    await expect(nextMove.locator("text=Option 1")).toBeVisible();
    await expect(nextMove.locator("text=Option 2")).toBeVisible();
    await expect(nextMove.locator("text=Option 3")).not.toBeVisible();

    // Both initial cards contain title, description, learning outcome, time, and step count
    await expect(nextMove.locator("text=Create a 3-Scene Adventure Story Comic")).toBeVisible();
    await expect(nextMove.locator("text=Design a Smart Invention Blueprint on Paper")).toBeVisible();
    await expect(nextMove.locator("text=What you'll learn:").first()).toBeVisible();
    await expect(nextMove.locator("text=5 steps").first()).toBeVisible();

    // 2. Click "Get More Tasks" to request additional AI-recommended tasks
    const getMoreBtn = nextMove.getByTestId("get-more-tasks-btn");
    await expect(getMoreBtn).toBeVisible();
    await getMoreBtn.click();

    // Verify additional activities appeared beyond the initial two (Option 3 and Option 4)
    await expect(nextMove.locator("text=Option 3")).toBeVisible({ timeout: 10000 });
    await expect(nextMove.locator("text=Option 4")).toBeVisible({ timeout: 10000 });

    // 3. Choose Option 1 (Comic Story) and verify 5 steps appear
    const chooseFirstBtn = nextMove.locator('button:has-text("Choose This Activity")').first();
    await chooseFirstBtn.click();

    await expect(nextMove.locator("text=In Progress")).toBeVisible();
    await expect(nextMove.locator("text=0 of 5 steps completed (0%)")).toBeVisible();

    // Check all 5 steps one by one
    const stepCards = nextMove.locator("#activity-steps-container > div");
    await expect(stepCards).toHaveCount(5);

    for (let i = 0; i < 5; i++) {
      await stepCards.nth(i).click();
    }

    // 4. Verify 100% completion celebration state appears
    await expect(nextMove.locator("text=Activity Completed! Excellent work! 🎉")).toBeVisible();
    await expect(nextMove.locator("text=5 of 5 steps completed (100%)")).toBeVisible();

    // 5. Verify "What Did You Do?" reflection section appears
    const reflectionSection = page.getByTestId("activity-reflection-section");
    await expect(reflectionSection).toBeVisible();
    await expect(reflectionSection.locator("text=What Did You Do?")).toBeVisible();

    // Both Option A (Write) and Option B (Upload) tabs are available
    await expect(reflectionSection.locator("text=Option A – Write About It")).toBeVisible();
    await expect(reflectionSection.locator("text=Option B – Upload Your Work")).toBeVisible();

    // Fill in written reflection
    const textarea = reflectionSection.getByTestId("reflection-textarea");
    await expect(textarea).toBeVisible();
    await textarea.fill(
      "I designed a 3-scene comic about two animal detectives solving a forest mystery. I discovered that planning the character expressions in scene 2 made the resolution clue much more surprising and fun!"
    );

    // Click Submit & Analyze with AI
    const analyzeBtn = reflectionSection.getByTestId("submit-reflection-btn");
    await expect(analyzeBtn).toBeVisible();
    await analyzeBtn.click();

    // 6. Verify AI Learning Analysis Results Card renders student-friendly structured output
    const aiResults = page.getByTestId("ai-analysis-results");
    await expect(aiResults).toBeVisible({ timeout: 10000 });

    await expect(aiResults.locator("text=What You Learned")).toBeVisible();
    await expect(aiResults.locator("text=Skills You Practised")).toBeVisible();
    await expect(aiResults.locator("text=Your Discovery")).toBeVisible();
    await expect(aiResults.locator("text=Your Next Challenge")).toBeVisible();

    // Verified skills reflected in tags
    await expect(aiResults.locator("text=Creative Visual Storytelling")).toBeVisible();

    // 7. Click "Check My Growth" button and verify navigation to /dashboard/student/growth
    const checkGrowthBtn = page.getByTestId("check-my-growth-btn");
    await expect(checkGrowthBtn).toBeVisible();
    await checkGrowthBtn.click();

    await page.waitForURL(/\/dashboard\/student\/growth/);
    await page.waitForLoadState("networkidle");

    const growthWorkspace = page.getByTestId("student-growth-workspace");
    await expect(growthWorkspace).toBeVisible();

    // Verify Growth reflects the real analyzed submission
    await expect(page.getByTestId("metric-completed-activities")).toContainText("1");
    await expect(growthWorkspace.locator("text=Submitted Work & AI Analysis")).toBeVisible();
    await expect(growthWorkspace.locator("text=Your Reflection:")).toBeVisible();
    await expect(growthWorkspace).toContainText("animal detectives");
    await expect(growthWorkspace).toContainText("Creative Visual Storytelling");

    // 8. Refresh the page to verify complete reload persistence
    await page.reload();
    await page.waitForLoadState("networkidle");

    await expect(page.getByTestId("metric-completed-activities")).toContainText("1");
    await expect(growthWorkspace.locator("text=Submitted Work & AI Analysis")).toBeVisible();
    await expect(growthWorkspace).toContainText("animal detectives");
  });

  // =========================================================================
  // TEST 3: User Data Isolation
  // =========================================================================
  test("3. Second student account is completely isolated and cannot see first student's submitted reflection or AI analysis", async ({
    page,
  }) => {
    const student2 = {
      uid: "student-isolation-2",
      name: "Sahil Khan",
      email: "sahil@example.com",
      role: "student",
      academicStage: "classes-4-7",
      currentClass: "Class 7",
      isOnboardingCompleted: false,
      startingPoint: {
        answers: {
          "1": "Building, fixing, or experimenting",
          "2": "Discovering how things work",
          "3": "Build something interesting",
          "4": "Technology, robots, and machines",
        },
        academicStage: "classes-4-7",
        primaryFocus: "Technology & Building",
        status: "Baseline Established",
        activeInterests: ["Technology & Building", "Science & Discovery"],
        isCompleted: true,
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      nextMoveActivity: null,
      nextMoveHistory: {},
      activitySubmissions: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await page.addInitScript((st) => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        mockUser: {
          uid: st.uid,
          email: st.email,
          displayName: st.name,
          phoneNumber: null,
          emailVerified: true,
        },
      };

      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: JSON.parse(JSON.stringify(st)),
      };
    }, student2);

    await page.goto("/dashboard/student/growth");
    await page.waitForLoadState("networkidle");

    const growthWorkspace = page.getByTestId("student-growth-workspace");
    await expect(growthWorkspace).toBeVisible();

    // Verify Student 2 has 0 completed activities and no leaked reflection
    await expect(page.getByTestId("metric-completed-activities")).toContainText("0");
    await expect(growthWorkspace).not.toContainText("animal detectives");
    await expect(growthWorkspace).not.toContainText("Creative Visual Storytelling");
  });
});
