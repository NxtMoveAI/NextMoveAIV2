import { test, expect } from "@playwright/test";

test.describe("Student Dashboard Section Order & Starting Point Questionnaire", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("1. Dashboard section order is strictly: Welcome Panel -> My Starting Point -> Your Next Move", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-kid-class5",
        customEmail: "kid@example.com",
        customName: "Anik Verma",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-kid-class5",
          name: "Anik Verma",
          email: "kid@example.com",
          role: "student",
          academicStage: "classes-4-7",
          isOnboardingCompleted: false,
          startingPoint: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");

    // Welcome panel is visible
    const welcome = page.locator("#welcome-heading");
    await expect(welcome).toBeVisible();

    // Starting Point card is visible
    const startingPoint = page.locator("#starting-point");
    await expect(startingPoint).toBeVisible();

    // Next Move card is visible
    const nextMove = page.locator("#next-move");
    await expect(nextMove).toBeVisible();

    // Verify DOM section order: Starting Point must appear BEFORE Next Move
    const isStartingPointBeforeNextMove = await page.evaluate(() => {
      const sp = document.getElementById("starting-point");
      const nm = document.getElementById("next-move");
      if (!sp || !nm) return false;
      return Boolean(sp.compareDocumentPosition(nm) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(isStartingPointBeforeNextMove).toBe(true);

    // Verify removed sections are completely gone from DOM
    await expect(page.locator("#explore-possibilities")).toHaveCount(0);
    await expect(page.locator("#growth-snapshot")).toHaveCount(0);
    await expect(page.locator("#partner-preview")).toHaveCount(0);
  });

  test("2. Classes 4–7 shows interactive questionnaire with 4 questions, navigation, and validation", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-meera-class6",
        customEmail: "meera@example.com",
        customName: "Meera Sen",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-meera-class6",
          name: "Meera Sen",
          email: "meera@example.com",
          role: "student",
          academicStage: "classes-4-7",
          isOnboardingCompleted: false,
          startingPoint: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");

    const sp = page.locator("#starting-point");
    await expect(sp).toBeVisible();

    // Check Question 1 header and progress
    await expect(sp.locator("text=Question 1 of 4")).toBeVisible();
    await expect(sp.locator("text=What do you enjoy doing most in your free time?")).toBeVisible();

    // Explicitly verify the two removed questions are NOT rendered anywhere
    await expect(sp.locator("text=What makes you feel proud of yourself?")).not.toBeVisible();
    await expect(sp.locator("text=How do you like learning or trying something new?")).not.toBeVisible();

    // Next button is disabled when no option selected
    const nextBtn = sp.locator('button:has-text("Next")');
    await expect(nextBtn).toBeDisabled();

    // Previous button is disabled on Question 1
    const prevBtn = sp.locator('button:has-text("Previous")');
    await expect(prevBtn).toBeDisabled();

    // Select Q1 option
    await sp.locator('button:has-text("Drawing, painting, or making things")').click();
    await expect(nextBtn).toBeEnabled();

    // Advance to Q2
    await nextBtn.click();
    await expect(sp.locator("text=Question 2 of 4")).toBeVisible();
    await expect(sp.locator("text=Which activity sounds the most exciting to you?")).toBeVisible();

    // Test Previous button preserves selection
    await prevBtn.click();
    await expect(sp.locator("text=Question 1 of 4")).toBeVisible();
    await expect(sp.locator('button:has-text("Drawing, painting, or making things")')).toHaveClass(/border-\[#6757F5\]/);

    // Move forward through questions answering with a Creative profile
    await nextBtn.click(); // to Q2
    await sp.locator('button:has-text("Creating something with my own hands")').click();
    await nextBtn.click(); // to Q3

    await expect(sp.locator("text=Question 3 of 4")).toBeVisible();
    await sp.locator('button:has-text("Draw, create, or design something")').click();
    await nextBtn.click(); // to Q4 (Final question: What would you love to explore more?)

    await expect(sp.locator("text=Question 4 of 4")).toBeVisible();
    await expect(sp.locator("text=What would you love to explore more?")).toBeVisible();

    // Complete button appears on last question
    const completeBtn = sp.locator('button:has-text("Complete & View Starting Point")');
    await expect(completeBtn).toBeDisabled();

    await sp.locator('button:has-text("Art, animation, and creativity")').click();
    await expect(completeBtn).toBeEnabled();

    // Submit questionnaire
    await completeBtn.click();

    // Replaced with completed baseline summary
    await expect(sp.locator("text=Your personalized baseline from exploration answers")).toBeVisible();
    await expect(sp.locator("text=Where You Stand")).toBeVisible();
    await expect(sp.locator("text=Classes 4 – 7")).toBeVisible();

    // Primary focus generated for Creative selections
    await expect(sp.locator("text=Discovering creative ideas and learning by making, drawing, and exploring.")).toBeVisible();

    // Active interests include Creativity & Media
    await expect(sp.locator("text=Creativity & Media")).toBeVisible();

    // Edit answers button is available
    await expect(sp.locator('button:has-text("Edit Answers")')).toBeVisible();

    // Verify Firestore was updated under authenticated user's profile
    const savedPoint = await page.evaluate(
      () =>
        (window as unknown as { __LAST_SAVED_STARTING_POINT__?: { isCompleted: boolean; primaryFocus: string } })
          .__LAST_SAVED_STARTING_POINT__
    );
    expect(savedPoint).toBeDefined();
    expect(savedPoint?.isCompleted).toBe(true);
    expect(savedPoint?.primaryFocus).toContain("creative ideas");
  });

  test("3. Different questionnaire answers generate distinct baseline focus and interests", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-tech-kid",
        customEmail: "techkid@example.com",
        customName: "Kabir Roy",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-tech-kid",
          name: "Kabir Roy",
          email: "techkid@example.com",
          role: "student",
          academicStage: "classes-4-7",
          isOnboardingCompleted: false,
          startingPoint: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    const sp = page.locator("#starting-point");

    // Answer tech / building path
    await sp.locator('button:has-text("Building, fixing, or experimenting")').click();
    await sp.locator('button:has-text("Next")').click();

    await sp.locator('button:has-text("Discovering how things work")').click();
    await sp.locator('button:has-text("Next")').click();

    await sp.locator('button:has-text("Build something interesting")').click();
    await sp.locator('button:has-text("Next")').click();

    await sp.locator('button:has-text("Technology, robots, and machines")').click();
    await sp.locator('button:has-text("Complete & View Starting Point")').click();

    // Verify distinct technology / building output
    await expect(sp.locator("text=Technology & Building")).toBeVisible();
    await expect(
      sp.locator("text=Building, tinkering with models, and discovering how machines and tools work.")
    ).toBeVisible();
  });

  test("4. Returning user with completed starting point directly sees saved baseline", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-returning-kid",
        customEmail: "returning@example.com",
        customName: "Rohan V",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-returning-kid",
          name: "Rohan V",
          email: "returning@example.com",
          role: "student",
          academicStage: "classes-4-7",
          isOnboardingCompleted: false,
          startingPoint: {
            answers: {
              "1": "Exploring nature or animals",
              "2": "Discovering how things work",
              "3": "Go on an adventure or explore outdoors",
              "4": "When I learn something I didn't know",
              "5": "Animals, plants, and nature",
              "6": "By doing it myself",
            },
            academicStage: "classes-4-7",
            primaryFocus: "Exploring wildlife, observing plants, and discovering the natural world outdoors.",
            status: "Building Curiosity",
            activeInterests: ["Nature & Environment", "Science & Discovery"],
            isCompleted: true,
            completedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    const sp = page.locator("#starting-point");

    // Directly renders baseline summary without showing questionnaire questions
    await expect(sp.locator("text=Question 1 of 4")).toHaveCount(0);
    await expect(sp.locator("text=Exploring wildlife, observing plants, and discovering the natural world outdoors.")).toBeVisible();
    await expect(sp.locator("text=Nature & Environment")).toBeVisible();
    await expect(sp.locator("text=Status: Building Curiosity")).toBeVisible();
    await expect(sp.locator('button:has-text("Edit Answers")')).toBeVisible();

    // Inspect full answers progressive disclosure
    await sp.locator('button:has-text("Inspect full baseline answers")').click();
    await expect(sp.locator("text=Your Questionnaire Responses (4 Questions):")).toBeVisible();
    await expect(sp.locator("text=Exploring nature or animals")).toBeVisible();
  });

  test("5. Edit Answers reopens questionnaire, preloads selections, and updates baseline", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-edit-kid",
        customEmail: "editkid@example.com",
        customName: "Ira Patel",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-edit-kid",
          name: "Ira Patel",
          email: "editkid@example.com",
          role: "student",
          academicStage: "classes-4-7",
          isOnboardingCompleted: false,
          startingPoint: {
            answers: {
              "1": "Drawing, painting, or making things",
              "2": "Creating something with my own hands",
              "3": "Draw, create, or design something",
              "4": "When I create something new",
              "5": "Art, animation, and creativity",
              "6": "By doing it myself",
            },
            academicStage: "classes-4-7",
            primaryFocus: "Discovering creative ideas and learning by making, drawing, and exploring.",
            status: "Exploring Interests",
            activeInterests: ["Creativity & Media", "Technology & Building"],
            isCompleted: true,
            completedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    const sp = page.locator("#starting-point");

    // Click Edit Answers
    await sp.locator('button:has-text("Edit Answers")').click();

    // Reopens at Question 1 with previous answer pre-selected
    await expect(sp.locator("text=Question 1 of 4")).toBeVisible();
    await expect(sp.locator('button:has-text("Drawing, painting, or making things")')).toHaveClass(/border-\[#6757F5\]/);

    // Cancel edit returns to summary without changing
    await sp.locator('button:has-text("Cancel")').click();
    await expect(sp.locator("text=Your personalized baseline from exploration answers")).toBeVisible();

    // Reopen edit and change answer to Nature
    await sp.locator('button:has-text("Edit Answers")').click();
    await sp.locator('button:has-text("Exploring nature or animals")').click();

    // Advance to end (3 clicks for 4 questions)
    for (let i = 0; i < 3; i++) {
      await sp.locator('button:has-text("Next")').click();
    }

    // Save changes
    const saveBtn = sp.locator('button:has-text("Save Changes")');
    await expect(saveBtn).toBeVisible();
    await saveBtn.click();

    // Returned to summary with updated responses
    await expect(sp.locator("text=Your personalized baseline from exploration answers")).toBeVisible();
  });

  test("6. Non-Classes 4–7 stages (e.g. Class 9, Engineering) do not show the Classes 4–7 questionnaire", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-class9-student",
        customEmail: "student9@example.com",
        customName: "Rohan Kulkarni",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-class9-student",
          name: "Rohan Kulkarni",
          email: "student9@example.com",
          role: "student",
          academicStage: "classes-8-10",
          isOnboardingCompleted: false,
          startingPoint: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    const sp = page.locator("#starting-point");

    // Classes 4–7 questionnaire must NOT be shown
    await expect(sp.locator("text=Question 1 of 6")).toHaveCount(0);
    await expect(sp.locator("text=What do you enjoy doing most in your free time?")).toHaveCount(0);

    // Shows stage questionnaire tailored for Classes 8-10
    await expect(sp.locator("text=Classes 8 – 10").first()).toBeVisible();
    await expect(sp.locator("text=Which subjects or activities do you find most interesting in school?")).toBeVisible();
  });

  test("7. Your Next Move section remains functional after repositioning", async ({
    page,
  }) => {
    await page.goto("/dashboard/student");
    const nextMove = page.locator("#next-move");

    // Next Move card is visible and interactive
    await expect(nextMove).toBeVisible();
    await expect(nextMove.locator('button:has-text("Why was this action suggested?")')).toBeVisible();

    // Click Why this move toggle
    await nextMove.locator('button:has-text("Why was this action suggested?")').click();
    await expect(nextMove.locator('text=Grounded Suggestion Basis:')).toBeVisible();
  });
});
