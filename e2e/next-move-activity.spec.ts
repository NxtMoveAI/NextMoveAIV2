import { test, expect } from "@playwright/test";

test.describe("Your Next Move: Interactive Personalized Step-by-Step Activity", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("1. Two distinct personalized activity options are displayed based on Starting Point data", async ({
    page,
  }) => {
    // Student with Creativity & Media interest in Starting Point
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-creative-student",
        customEmail: "creative@example.com",
        customName: "Riya Sen",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-creative-student",
          name: "Riya Sen",
          email: "creative@example.com",
          role: "student",
          academicStage: "classes-4-7",
          isOnboardingCompleted: false,
          startingPoint: {
            answers: { "1": "Drawing, painting, or making digital art" },
            academicStage: "classes-4-7",
            primaryFocus: "Discovering creative ideas and learning by making, drawing, and exploring.",
            status: "Exploring Interests",
            activeInterests: ["Creativity & Media", "Stories & Imagination"],
            isCompleted: true,
            completedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          nextMoveActivity: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    const nextMove = page.locator("#next-move");
    await expect(nextMove).toBeVisible();

    // Verify Choice Mode badge & subtitle
    await expect(nextMove.locator("text=Choose Between 2 Activities")).toBeVisible();
    await expect(nextMove.locator("text=Compare these 2 personalized options")).toBeVisible();

    // Verify exactly 2 activity option cards are shown
    await expect(nextMove.locator("text=Option 1")).toBeVisible();
    await expect(nextMove.locator("text=Option 2")).toBeVisible();

    // Verify Option 1: Creative storytelling approach
    await expect(nextMove.locator("text=Create a 3-Scene Adventure Story Comic")).toBeVisible();
    await expect(nextMove.locator("text=Storytelling structure, character design")).toBeVisible();

    // Verify Option 2: Hands-on maker approach (different distinct approach)
    await expect(nextMove.locator("text=Design a Smart Invention Blueprint on Paper")).toBeVisible();
    await expect(nextMove.locator("text=Design thinking, mechanical logic")).toBeVisible();

    // Both cards show estimated time and step count
    await expect(nextMove.locator("text=20 mins").first()).toBeVisible();
    await expect(nextMove.locator("text=5 steps").first()).toBeVisible();
    await expect(nextMove.locator("text=5 steps").nth(1)).toBeVisible();

    // Both cards have "Choose This Activity" buttons
    const chooseButtons = nextMove.locator('button:has-text("Choose This Activity")');
    await expect(chooseButtons).toHaveCount(2);

    // Neither activity is auto-started before student selection
    await expect(nextMove.locator("text=In Progress")).not.toBeVisible();
    await expect(nextMove.locator("#activity-steps-container")).not.toBeVisible();
  });

  test("2. Technology student receives practical engineering and logic activity pair", async ({
    page,
  }) => {
    // Student with Technology & Building in Starting Point
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-tech-student",
        customEmail: "tech@example.com",
        customName: "Kabir Roy",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-tech-student",
          name: "Kabir Roy",
          email: "tech@example.com",
          role: "student",
          academicStage: "classes-4-7",
          isOnboardingCompleted: false,
          startingPoint: {
            answers: { "1": "Building with blocks, LEGO, or taking things apart" },
            academicStage: "classes-4-7",
            primaryFocus: "Building, tinkering with models, and discovering how machines and tools work.",
            status: "Discovering Possibilities",
            activeInterests: ["Technology & Building", "Science & Discovery"],
            isCompleted: true,
            completedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          nextMoveActivity: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    const nextMove = page.locator("#next-move");
    await expect(nextMove).toBeVisible();

    // Technology student receives Smart invention blueprint + Secret cipher logic
    await expect(nextMove.locator("text=Design a Smart Invention Blueprint on Paper")).toBeVisible();
    await expect(nextMove.locator("text=Crack the Secret Cipher: Build & Decode Secret Codes")).toBeVisible();

    // Exactly 2 distinct cards
    await expect(nextMove.locator("text=Option 1")).toBeVisible();
    await expect(nextMove.locator("text=Option 2")).toBeVisible();
  });

  test("3. Selecting Option 1 opens its 5 actionable steps and saves active state", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-student-step-test",
        customEmail: "steps@example.com",
        customName: "Ananya Roy",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-student-step-test",
          name: "Ananya Roy",
          email: "steps@example.com",
          role: "student",
          academicStage: "classes-4-7",
          isOnboardingCompleted: false,
          startingPoint: {
            answers: { "1": "Drawing, painting, or making digital art" },
            academicStage: "classes-4-7",
            primaryFocus: "Discovering creative ideas and learning by making, drawing, and exploring.",
            status: "Exploring Interests",
            activeInterests: ["Creativity & Media"],
            isCompleted: true,
            completedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          nextMoveActivity: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    const nextMove = page.locator("#next-move");
    await expect(page.locator("text=Welcome back, Ananya Roy")).toBeVisible();

    // Click "Choose This Activity" on Option 1 (Comic Story)
    await nextMove.locator('button:has-text("Choose This Activity")').first().click();

    // Verify step-by-step experience opened
    await expect(nextMove.locator("text=In Progress")).toBeVisible();
    await expect(nextMove.locator("text=0 of 5 steps completed (0%)")).toBeVisible();

    // Verify 5 distinct steps exist
    const stepCards = nextMove.locator("#activity-steps-container > div");
    await expect(stepCards).toHaveCount(5);

    // Verify step 1 title and instruction
    await expect(nextMove.locator("text=Step 1")).toBeVisible();
    await expect(nextMove.locator("text=Create Your Characters")).toBeVisible();
    await expect(nextMove.locator("text=Choose two characters and give each one a name")).toBeVisible();

    // Verify step 5 exists
    await expect(nextMove.locator("text=Step 5")).toBeVisible();
    await expect(nextMove.locator("text=Reflect on Your Story")).toBeVisible();
  });

  test("4. Marking individual steps complete updates progress and persists in Firestore mock", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-student-progress",
        customEmail: "progress@example.com",
        customName: "Dev Sharma",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-student-progress",
          name: "Dev Sharma",
          email: "progress@example.com",
          role: "student",
          academicStage: "classes-4-7",
          isOnboardingCompleted: false,
          startingPoint: {
            answers: { "1": "Drawing, painting, or making digital art" },
            academicStage: "classes-4-7",
            primaryFocus: "Discovering creative ideas and learning by making, drawing, and exploring.",
            status: "Exploring Interests",
            activeInterests: ["Creativity & Media"],
            isCompleted: true,
            completedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          nextMoveActivity: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    const nextMove = page.locator("#next-move");
    await expect(page.locator("text=Welcome back, Dev Sharma")).toBeVisible();

    // Choose Option 1
    await nextMove.locator('button:has-text("Choose This Activity")').first().click();
    await expect(nextMove.locator("text=In Progress")).toBeVisible();

    // Click Step 1 checkbox
    const step1 = nextMove.locator("#activity-steps-container > div").first();
    await step1.click();

    // Progress updates to 1 of 5 (20%)
    await expect(nextMove.locator("text=1 of 5 steps completed (20%)")).toBeVisible();
    await expect(step1.locator("text=Completed")).toBeVisible();

    // Click Step 2 checkbox
    const step2 = nextMove.locator("#activity-steps-container > div").nth(1);
    await step2.click();

    // Progress updates to 2 of 5 (40%)
    await expect(nextMove.locator("text=2 of 5 steps completed (40%)")).toBeVisible();
    await expect(step2.locator("text=Completed")).toBeVisible();

    // Verify Firestore mock captured the write
    const lastSaved = await page.evaluate(() => {
      const host = window as unknown as {
        __NEXT_MOVE_MOCK_FIRESTORE__: {
          mockProfile: {
            nextMoveActivity: {
              completedStepIds: string[];
              progressPercentage: number;
              status: string;
            };
          };
        };
      };
      return host.__NEXT_MOVE_MOCK_FIRESTORE__.mockProfile.nextMoveActivity;
    });

    expect(lastSaved.completedStepIds).toEqual(["step-1", "step-2"]);
    expect(lastSaved.progressPercentage).toBe(40);
    expect(lastSaved.status).toBe("in_progress");
  });

  test("5. Progress persists after page refresh and resumes where left off", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-student-resume",
        customEmail: "resume@example.com",
        customName: "Zoya Khan",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-student-resume",
          name: "Zoya Khan",
          email: "resume@example.com",
          role: "student",
          academicStage: "classes-4-7",
          isOnboardingCompleted: false,
          startingPoint: {
            answers: { "1": "Drawing, painting, or making digital art" },
            academicStage: "classes-4-7",
            primaryFocus: "Discovering creative ideas and learning by making, drawing, and exploring.",
            status: "Exploring Interests",
            activeInterests: ["Creativity & Media"],
            isCompleted: true,
            completedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          nextMoveActivity: {
            activityId: "act_comic_story",
            title: "Create a 3-Scene Adventure Story Comic",
            description: "Design and write a short three-panel adventure story comic featuring original characters solving a creative mystery.",
            learningOutcome: "Storytelling structure, character design, creative writing, and visual narrative planning.",
            estimatedDuration: "20 mins",
            steps: [
              { id: "step-1", stepNumber: 1, title: "Create Your Characters", instruction: "Choose two characters..." },
              { id: "step-2", stepNumber: 2, title: "Discover the Mystery", instruction: "Think of a small mystery..." },
              { id: "step-3", stepNumber: 3, title: "Draft Three Scenes", instruction: "Draw or describe..." },
              { id: "step-4", stepNumber: 4, title: "Solve the Mystery", instruction: "Decide how your characters solve..." },
              { id: "step-5", stepNumber: 5, title: "Reflect on Your Story", instruction: "Write one thing you learned..." },
            ],
            completedStepIds: ["step-1", "step-2", "step-3"],
            progressPercentage: 60,
            status: "in_progress",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            completedAt: null,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    const nextMove = page.locator("#next-move");

    // Student directly resumes at 3 of 5 steps completed (60%)
    await expect(nextMove.locator("text=3 of 5 steps completed (60%)")).toBeVisible();
    await expect(nextMove.locator("text=In Progress")).toBeVisible();

    // Verify step 1, 2, 3 have Completed badge, step 4 and 5 are pending
    const stepCards = nextMove.locator("#activity-steps-container > div");
    await expect(stepCards.nth(0).locator("text=Completed")).toBeVisible();
    await expect(stepCards.nth(1).locator("text=Completed")).toBeVisible();
    await expect(stepCards.nth(2).locator("text=Completed")).toBeVisible();
    await expect(stepCards.nth(3).locator("text=Completed")).not.toBeVisible();
    await expect(stepCards.nth(4).locator("text=Completed")).not.toBeVisible();
  });

  test("6. Completing all steps transitions activity to completed celebration state", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-student-complete",
        customEmail: "complete@example.com",
        customName: "Sanya Gupta",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-student-complete",
          name: "Sanya Gupta",
          email: "complete@example.com",
          role: "student",
          academicStage: "classes-4-7",
          isOnboardingCompleted: false,
          startingPoint: {
            answers: { "1": "Drawing, painting, or making digital art" },
            academicStage: "classes-4-7",
            primaryFocus: "Discovering creative ideas and learning by making, drawing, and exploring.",
            status: "Exploring Interests",
            activeInterests: ["Creativity & Media"],
            isCompleted: true,
            completedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          nextMoveActivity: {
            activityId: "act_comic_story",
            title: "Create a 3-Scene Adventure Story Comic",
            description: "Design and write a short three-panel adventure story comic featuring original characters solving a creative mystery.",
            learningOutcome: "Storytelling structure, character design, creative writing, and visual narrative planning.",
            estimatedDuration: "20 mins",
            steps: [
              { id: "step-1", stepNumber: 1, title: "Create Your Characters", instruction: "Choose two characters..." },
              { id: "step-2", stepNumber: 2, title: "Discover the Mystery", instruction: "Think of a small mystery..." },
              { id: "step-3", stepNumber: 3, title: "Draft Three Scenes", instruction: "Draw or describe..." },
              { id: "step-4", stepNumber: 4, title: "Solve the Mystery", instruction: "Decide how your characters solve..." },
              { id: "step-5", stepNumber: 5, title: "Reflect on Your Story", instruction: "Write one thing you learned..." },
            ],
            completedStepIds: ["step-1", "step-2", "step-3", "step-4"],
            progressPercentage: 80,
            status: "in_progress",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            completedAt: null,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    const nextMove = page.locator("#next-move");

    // Click 5th and final step
    const step5 = nextMove.locator("#activity-steps-container > div").nth(4);
    await step5.click();

    // Verify 100% completed progress
    await expect(nextMove.locator("text=5 of 5 steps completed (100%)")).toBeVisible();

    // Verify celebration banner appears
    await expect(nextMove.locator("text=Activity Completed! Excellent work! 🎉")).toBeVisible();
    await expect(nextMove.locator("text=You've completed all steps of this activity")).toBeVisible();

    // Verify Completed badge in card header
    await expect(nextMove.locator("text=Completed 🎉")).toBeVisible();

    // Verify Choose Another Activity button is available
    await expect(nextMove.locator('button:has-text("Choose Another Activity")')).toBeVisible();
  });

  test("7. Choose Another Activity displays 2 options with Continue Activity and preserves progress across switches", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-student-alt",
        customEmail: "alt@example.com",
        customName: "Mehul Sen",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-student-alt",
          name: "Mehul Sen",
          email: "alt@example.com",
          role: "student",
          academicStage: "classes-4-7",
          isOnboardingCompleted: false,
          startingPoint: {
            answers: { "1": "Drawing, painting, or making digital art" },
            academicStage: "classes-4-7",
            primaryFocus: "Discovering creative ideas and learning by making, drawing, and exploring.",
            status: "Exploring Interests",
            activeInterests: ["Creativity & Media"],
            isCompleted: true,
            completedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          nextMoveActivity: null,
          nextMoveHistory: {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    const nextMove = page.locator("#next-move");
    await expect(page.locator("text=Welcome back, Mehul Sen")).toBeVisible();

    // 1. Start Option 1 (Comic activity) and complete Step 1
    await nextMove.locator('button:has-text("Choose This Activity")').first().click();
    await expect(nextMove.locator("text=In Progress")).toBeVisible();
    await nextMove.locator("#activity-steps-container > div").first().click();
    await expect(nextMove.locator("text=1 of 5 steps completed (20%)")).toBeVisible();

    // 2. Click "Choose Another Activity" to view the 2 comparison cards
    await nextMove.locator('button:has-text("Choose Another Activity")').click();
    await expect(nextMove.locator("text=Choose Between 2 Activities")).toBeVisible();

    // Verify Option 1 prioritizes "Continue Activity" with progress badge
    await expect(nextMove.locator("text=In Progress (20%)")).toBeVisible();
    await expect(nextMove.locator('button:has-text("Continue Activity")')).toBeVisible();

    // 3. Switch to Option 2 ("Design a Smart Invention Blueprint on Paper")
    await nextMove.locator('button:has-text("Choose This Activity")').click();

    // Verify Option 2 is now active in step-by-step checklist
    await expect(nextMove.locator("text=Design a Smart Invention Blueprint on Paper")).toBeVisible();
    await expect(nextMove.locator("text=0 of 5 steps completed (0%)")).toBeVisible();

    // Complete Step 1 and Step 2 of Option 2
    await nextMove.locator("#activity-steps-container > div").first().click();
    await nextMove.locator("#activity-steps-container > div").nth(1).click();
    await expect(nextMove.locator("text=2 of 5 steps completed (40%)")).toBeVisible();

    // 4. Click "Choose Another Activity" and switch back to Option 1
    await nextMove.locator('button:has-text("Choose Another Activity")').click();
    await nextMove.locator('button:has-text("Choose This Activity")').click();

    // Verify Option 1 resumes where left off (1 of 5 steps completed / 20%)
    await expect(nextMove.locator("text=Create a 3-Scene Adventure Story Comic")).toBeVisible();
    await expect(nextMove.locator("text=1 of 5 steps completed (20%)")).toBeVisible();
    const comicStep1 = nextMove.locator("#activity-steps-container > div").first();
    await expect(comicStep1.locator("text=Completed")).toBeVisible();
  });
});
