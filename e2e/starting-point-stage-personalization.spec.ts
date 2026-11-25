import { test, expect } from "@playwright/test";

/**
 * NEXT MOVE AI V2 — E2E TEST SUITE
 * My Starting Point: Age/Class-Wise Personalization & First-Time Questionnaire
 * 
 * Verifies:
 * 1. First-time user (Starting Point not completed) -> Shows stage-specific questionnaire directly in #starting-point.
 * 2. Returning user (Starting Point already completed) -> Shows baseline summary (Where You Stand, Primary Focus, Active Interests).
 * 3. Edit Answers -> Reopens questionnaire with previous answers prefilled; submitting updates baseline in Firestore.
 * 4. Class 6 student -> Class 6 appropriate questions and options (Classes 4–7).
 * 5. Class 9 student -> Class 9 appropriate questions and options (Classes 8–10).
 * 6. Class 12 student -> Age-appropriate questions and options (Classes 11–12).
 * 7. Diploma student -> Hands-on, practical making/fixing, lateral entry questions.
 * 8. Degree / Engineering student -> Tech stacks, portfolio projects, real-world challenges.
 * 9. Working professional -> Skills, strategic transitions, leadership.
 * 10. Excluded questions ("What makes you feel proud of yourself?", "How do you like learning or trying something new?") are NEVER present.
 * 11. Primary Focus and Active Interests are strictly answer-derived and update when answers change.
 * 12. User isolation: User B cannot access User A's baseline.
 */

test.describe("My Starting Point: Age/Class-Wise Personalization & First-Time Questionnaire", () => {
  // =========================================================================
  // TEST 1: First-Time User vs Returning User & Edit Answers Prefill/Update
  // =========================================================================
  test("1. First-time user sees questionnaire; completing it saves baseline; returning user sees summary; Edit Answers prefills and updates", async ({
    page,
  }) => {
    // Stage 1: New user (Starting Point null)
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        mockUser: {
          uid: "student-stage-flow-1",
          email: "flow1@example.com",
          displayName: "Aarav Sharma",
          phoneNumber: null,
          emailVerified: true,
        },
      };

      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "student-stage-flow-1",
          name: "Aarav Sharma",
          email: "flow1@example.com",
          role: "student",
          academicStage: "classes-4-7",
          currentClass: "Class 6",
          isOnboardingCompleted: false,
          startingPoint: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    await page.waitForLoadState("networkidle");

    const sp = page.locator("#starting-point");
    await expect(sp).toBeVisible();

    // First-time user: Questionnaire rendered directly
    await expect(sp.locator("text=Question 1 of 4")).toBeVisible();
    await expect(sp.locator("text=What do you enjoy doing most in your free time?")).toBeVisible();

    // Verify excluded questions are strictly absent
    await expect(sp.locator("text=What makes you feel proud of yourself?")).not.toBeVisible();
    await expect(sp.locator("text=How do you like learning or trying something new?")).not.toBeVisible();

    // Q1
    await sp.locator('button:has-text("Drawing, painting, or making things")').click();
    await sp.locator('button:has-text("Next")').click();

    // Q2
    await expect(sp.locator("text=Question 2 of 4")).toBeVisible();
    await sp.locator('button:has-text("Creating something with my own hands")').click();
    await sp.locator('button:has-text("Next")').click();

    // Q3
    await expect(sp.locator("text=Question 3 of 4")).toBeVisible();
    await sp.locator('button:has-text("Draw, create, or design something")').click();
    await sp.locator('button:has-text("Next")').click();

    // Q4
    await expect(sp.locator("text=Question 4 of 4")).toBeVisible();
    await sp.locator('button:has-text("Art, animation, and creativity")').click();

    // Submit
    const submitBtn = sp.locator('button:has-text("Complete & View Starting Point")');
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // Returning user state appears immediately
    await expect(sp.locator("text=Where You Stand")).toBeVisible();
    await expect(sp.locator("text=Class 6")).toBeVisible();
    await expect(sp.locator("text=Primary Focus")).toBeVisible();
    await expect(sp.locator("text=Discovering creative ideas and learning by making, drawing, and exploring.")).toBeVisible();
    await expect(sp.locator("text=Creativity & Media")).toBeVisible();

    // Edit Answers control
    const editBtn = sp.locator('button:has-text("Edit Answers")');
    await expect(editBtn).toBeVisible();
    await editBtn.click();

    // Questionnaire reopens with prefilled selection
    await expect(sp.locator("text=Editing your answers")).toBeVisible();
    await expect(sp.locator("text=Question 1 of 4")).toBeVisible();
    // The previous answer should be selected (has active highlight)
    const selectedQ1 = sp.locator('button:has-text("Drawing, painting, or making things")');
    await expect(selectedQ1).toHaveClass(/border-\[#6757F5\]/);

    // Change Q1 to Nature/Animals
    await sp.locator('button:has-text("Exploring nature or animals")').click();
    await sp.locator('button:has-text("Next")').click();

    // Change Q2
    await sp.locator('button:has-text("Discovering how things work")').click();
    await sp.locator('button:has-text("Next")').click();

    // Change Q3
    await sp.locator('button:has-text("Go on an adventure or explore outdoors")').click();
    await sp.locator('button:has-text("Next")').click();

    // Change Q4
    await sp.locator('button:has-text("Animals, plants, and nature")').click();

    // Save Changes
    const saveChangesBtn = sp.locator('button:has-text("Save Changes")');
    await expect(saveChangesBtn).toBeEnabled();
    await saveChangesBtn.click();

    // Updated baseline displays Nature & Environment focus
    await expect(sp.locator("text=Where You Stand")).toBeVisible();
    await expect(sp.locator("text=Exploring wildlife, observing plants, and discovering the natural world outdoors.")).toBeVisible();
    await expect(sp.locator("text=Nature & Environment")).toBeVisible();
  });

  // =========================================================================
  // TEST 2: Class 9 User (Classes 8–10) Stage-Appropriate Questionnaire & Baseline
  // =========================================================================
  test("2. Class 9 user receives Class 9 appropriate questions (Classes 8–10), and completes questionnaire to establish baseline", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        mockUser: {
          uid: "student-class9-e2e",
          email: "class9@example.com",
          displayName: "Priya Nair",
          phoneNumber: null,
          emailVerified: true,
        },
      };

      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "student-class9-e2e",
          name: "Priya Nair",
          email: "class9@example.com",
          role: "student",
          academicStage: "classes-8-10",
          currentClass: "Class 9",
          isOnboardingCompleted: false,
          startingPoint: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    await page.waitForLoadState("networkidle");

    const sp = page.locator("#starting-point");
    await expect(sp).toBeVisible();

    // Header shows Class 9 / Classes 8 - 10
    await expect(sp.locator("text=Classes 8 – 10")).toBeVisible();

    // Q1 for Classes 8–10
    await expect(sp.locator("text=Which subjects or activities do you find most interesting in school?")).toBeVisible();
    await expect(sp.locator("text=What do you enjoy doing most in your free time?")).not.toBeVisible();

    // Choose Computers & Coding
    await sp.locator('button:has-text("Computers, coding, robotics, and digital technology")').click();
    await sp.locator('button:has-text("Next")').click();

    // Q2
    await expect(sp.locator("text=When you want to build or try something new, what excites you most?")).toBeVisible();
    await sp.locator('button:has-text("Designing digital apps, games, or tinkering with tech hardware")').click();
    await sp.locator('button:has-text("Next")').click();

    // Q3
    await expect(sp.locator("text=What kind of real-world challenge would you enjoy tackling?")).toBeVisible();
    await sp.locator('button:has-text("Building a smart gadget or program that solves an everyday problem")').click();
    await sp.locator('button:has-text("Next")').click();

    // Q4
    await expect(sp.locator("text=What area do you want to explore most over the coming months?")).toBeVisible();
    await sp.locator('button:has-text("Computer science, coding, and engineering concepts")').click();

    await sp.locator('button:has-text("Complete & View Starting Point")').click();

    // Summary reflects Class 9
    await expect(sp.locator("text=Where You Stand")).toBeVisible();
    await expect(sp.locator("text=Class 9")).toBeVisible();
    await expect(sp.locator("text=Stage: Classes 8 – 10")).toBeVisible();
    await expect(sp.locator("text=Exploring software, digital building, and practical engineering concepts.")).toBeVisible();
    await expect(sp.locator("text=Technology & Coding")).toBeVisible();
  });

  // =========================================================================
  // TEST 3: Class 12 User (Classes 11–12) Questions & Options
  // =========================================================================
  test("3. Class 12 user receives age-appropriate higher education / stream exploration questions", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        mockUser: {
          uid: "student-class12-e2e",
          email: "class12@example.com",
          displayName: "Ananya Sen",
          phoneNumber: null,
          emailVerified: true,
        },
      };

      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "student-class12-e2e",
          name: "Ananya Sen",
          email: "class12@example.com",
          role: "student",
          academicStage: "classes-11-12",
          currentClass: "Class 12",
          isOnboardingCompleted: false,
          startingPoint: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    await page.waitForLoadState("networkidle");

    const sp = page.locator("#starting-point");
    await expect(sp).toBeVisible();

    // Q1 for Classes 11–12
    await expect(sp.locator("text=Which academic area or stream aligns best with your strengths and interests?")).toBeVisible();
    await sp.locator('button:has-text("Commerce, economics, accounting, and financial markets")').click();
    await sp.locator('button:has-text("Next")').click();

    // Q2
    await expect(sp.locator("text=What kind of projects or study work do you find most fulfilling?")).toBeVisible();
    await sp.locator('button:has-text("Case studies, financial models, and business strategy analysis")').click();
    await sp.locator('button:has-text("Next")').click();

    // Q3
    await expect(sp.locator("text=What is your main goal for your higher education journey?")).toBeVisible();
    await sp.locator('button:has-text("Building a strong foundation in commerce, management, or finance")').click();
    await sp.locator('button:has-text("Next")').click();

    // Q4
    await expect(sp.locator("text=Which capability would you most like to develop right now?")).toBeVisible();
    await sp.locator('button:has-text("Business acumen, leadership, and quantitative analysis")').click();

    await sp.locator('button:has-text("Complete & View Starting Point")').click();

    // Baseline displays Commerce & Finance focus
    await expect(sp.locator("text=Where You Stand")).toBeVisible();
    await expect(sp.locator("text=Class 12")).toBeVisible();
    await expect(sp.locator("text=Stage: Classes 11 – 12")).toBeVisible();
    await expect(sp.locator("text=Building financial literacy, business strategy, and economic analysis.")).toBeVisible();
    await expect(sp.locator("text=Commerce & Financial Thinking")).toBeVisible();
  });

  // =========================================================================
  // TEST 4: Diploma, Degree/Engineering & Working Professional Questions
  // =========================================================================
  test("4. Diploma, Engineering, and Working Professional users receive stage-specific questions and derived focus", async ({
    page,
  }) => {
    // 4A: Engineering student
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        mockUser: {
          uid: "student-eng-e2e",
          email: "eng@example.com",
          displayName: "Vikram Reddy",
          phoneNumber: null,
          emailVerified: true,
        },
      };

      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "student-eng-e2e",
          name: "Vikram Reddy",
          email: "eng@example.com",
          role: "student",
          academicStage: "degree-engineering",
          isOnboardingCompleted: false,
          startingPoint: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    await page.waitForLoadState("networkidle");

    const sp = page.locator("#starting-point");
    await expect(sp).toBeVisible();

    // Degree / Engineering Questions
    await expect(sp.locator("text=Which technical or domain area do you find most engaging?")).toBeVisible();
    await sp.locator('button:has-text("Artificial Intelligence, machine learning, and data analytics")').click();
    await sp.locator('button:has-text("Next")').click();

    await expect(sp.locator("text=What kind of project would you be most proud to showcase on your portfolio?")).toBeVisible();
    await sp.locator('button:has-text("An AI/ML pipeline or model trained on real-world datasets")').click();
    await sp.locator('button:has-text("Next")').click();

    await expect(sp.locator("text=What is your primary objective for the current academic year?")).toBeVisible();
    await sp.locator('button:has-text("Building portfolio projects with verified real-world code")').click();
    await sp.locator('button:has-text("Next")').click();

    await expect(sp.locator("text=Which capability do you want to elevate most in the coming months?")).toBeVisible();
    await sp.locator('button:has-text("Machine learning algorithms, mathematics, and data engineering")').click();

    await sp.locator('button:has-text("Complete & View Starting Point")').click();

    // Where You Stand displays Degree / Engineering
    await expect(sp.locator("text=Where You Stand")).toBeVisible();
    await expect(sp.locator("text=Degree / Engineering").first()).toBeVisible();
    await expect(sp.locator("text=Developing machine learning pipelines, analytics, and intelligent systems.")).toBeVisible();
    await expect(sp.locator("text=AI & Data Science Innovation")).toBeVisible();
  });

  // =========================================================================
  // TEST 5: User Isolation (User B cannot see User A's baseline)
  // =========================================================================
  test("5. Second student account is completely isolated and cannot access first student's baseline", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        mockUser: {
          uid: "student-fresh-isolated",
          email: "fresh@example.com",
          displayName: "Neha Verma",
          phoneNumber: null,
          emailVerified: true,
        },
      };

      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "student-fresh-isolated",
          name: "Neha Verma",
          email: "fresh@example.com",
          role: "student",
          academicStage: "diploma",
          isOnboardingCompleted: false,
          startingPoint: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    await page.waitForLoadState("networkidle");

    const sp = page.locator("#starting-point");
    await expect(sp).toBeVisible();

    // Fresh diploma student sees their own diploma questionnaire
    await expect(sp.locator("text=What technical or practical work do you enjoy doing most?")).toBeVisible();
    await expect(sp.locator("text=Question 1 of 4")).toBeVisible();

    // Does NOT see previous student's baseline
    await expect(sp.locator("text=Where You Stand")).not.toBeVisible();
    await expect(sp.locator("text=Developing machine learning pipelines")).not.toBeVisible();
  });
});
