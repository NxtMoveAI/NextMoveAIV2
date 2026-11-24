import { test, expect } from "@playwright/test";

test.describe("Student Workspace Real User Personalization & Academic Stage Lock", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("1. Authenticated student with Class 8-10 profile sees real name, correct stage, and no Persona Switcher", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-aarav-class9",
        customEmail: "aarav.mehta@example.com",
        customName: "Aarav Mehta",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-aarav-class9",
          name: "Aarav Mehta",
          email: "aarav.mehta@example.com",
          phoneNumber: "+919876543210",
          city: "New Delhi",
          institution: "Delhi Public School",
          role: "student",
          academicStage: "classes-8-10",
          isOnboardingCompleted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");

    // Real student name displayed in Welcome panel
    await expect(page.locator("text=Welcome back, Aarav Mehta")).toBeVisible();

    // Stage badge reflects user's registered academic stage
    await expect(page.locator("text=Classes 8 – 10").first()).toBeVisible();

    // Dev Persona Switcher is completely hidden for authenticated users
    await expect(page.locator("text=Dev Persona Switcher")).toHaveCount(0);
    await expect(page.locator('button:has-text("Class 6 Creative")')).toHaveCount(0);

    // Demonstration Preview banner is hidden for authenticated users
    await expect(
      page.locator("text=Real student accounts and cloud database persistence are currently disabled")
    ).toHaveCount(0);
  });

  test("2. URL query parameters cannot tamper with or override registered academic stage", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-aarav-class9",
        customEmail: "aarav.mehta@example.com",
        customName: "Aarav Mehta",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-aarav-class9",
          name: "Aarav Mehta",
          email: "aarav.mehta@example.com",
          phoneNumber: "+919876543210",
          city: "New Delhi",
          institution: "Delhi Public School",
          role: "student",
          academicStage: "classes-8-10",
          isOnboardingCompleted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    // Attempt URL tampering with stage=classes-4-7 and persona=persona_a_class6
    await page.goto("/dashboard/student?stage=classes-4-7&persona=persona_a_class6&context=bca");

    // Must still show real user name and registered stage (Classes 8 – 10)
    await expect(page.locator("text=Welcome back, Aarav Mehta")).toBeVisible();
    await expect(page.locator("text=Classes 8 – 10").first()).toBeVisible();

    // Must NOT switch to Aanya Verma or Class 6
    await expect(page.locator("text=Aanya Verma")).toHaveCount(0);
    await expect(page.locator("text=Classes 4 – 7")).toHaveCount(0);

    // Persona Switcher remains hidden
    await expect(page.locator("text=Dev Persona Switcher")).toHaveCount(0);
  });

  test("3. Authenticated engineering student sees Engineering workspace and real name", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-rhea-eng",
        customEmail: "rhea.sengupta@example.com",
        customName: "Rhea Sengupta",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-rhea-eng",
          name: "Rhea Sengupta",
          email: "rhea.sengupta@example.com",
          phoneNumber: "+919811223344",
          city: "Bengaluru",
          institution: "RV College of Engineering",
          role: "student",
          academicStage: "degree-engineering",
          isOnboardingCompleted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");

    // Real student name displayed
    await expect(page.locator("text=Welcome back, Rhea Sengupta")).toBeVisible();

    // Stage badge reflects degree/engineering
    await expect(page.locator("text=Degree / Engineering").first()).toBeVisible();

    // Dev Persona Switcher is hidden
    await expect(page.locator("text=Dev Persona Switcher")).toHaveCount(0);
  });

  test("4. Profile Review page displays authenticated user's real Firestore profile", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-aarav-class9",
        customEmail: "aarav.mehta@example.com",
        customName: "Aarav Mehta",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-aarav-class9",
          name: "Aarav Mehta",
          email: "aarav.mehta@example.com",
          phoneNumber: "+919876543210",
          city: "New Delhi",
          institution: "Delhi Public School",
          role: "student",
          academicStage: "classes-8-10",
          isOnboardingCompleted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student/profile");

    // Display title has user's real name
    await expect(page.locator("h1:has-text('Aarav Mehta')")).toBeVisible();

    // Verified badge
    await expect(page.getByText("Verified Account Profile Active", { exact: true })).toBeVisible();

    // Registered fields are displayed
    await expect(page.locator("text=Registered Account Details")).toBeVisible();
    await expect(page.locator("text=aarav.mehta@example.com")).toBeVisible();
    await expect(page.locator("text=+919876543210")).toBeVisible();
    await expect(page.locator("text=New Delhi")).toBeVisible();
    await expect(page.locator("text=Delhi Public School")).toBeVisible();
    await expect(page.locator("text=Classes 8 – 10").first()).toBeVisible();

    // Back button returns to student dashboard
    const backBtn = page.locator('a:has-text("Back to Student Home")');
    await expect(backBtn).toBeVisible();
    await backBtn.click();
    await expect(page).toHaveURL(/\/dashboard\/student/);
  });

  test("5. Missing Firestore profile document displays friendly error state", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-missing-profile",
        customEmail: "missing@example.com",
        customName: "Missing Profile User",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        profileNotFound: true,
      };
    });

    await page.goto("/dashboard/student");

    // HomeErrorState is displayed instead of falling back to arbitrary persona data
    await expect(page.locator("text=User profile document not found")).toBeVisible();
    await expect(page.locator('button:has-text("Retry")')).toBeVisible();
  });

  test("6. Sign out clears session and redirects to sign-in page", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-aarav-class9",
        customEmail: "aarav.mehta@example.com",
        customName: "Aarav Mehta",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-aarav-class9",
          name: "Aarav Mehta",
          email: "aarav.mehta@example.com",
          phoneNumber: "+919876543210",
          city: "New Delhi",
          institution: "Delhi Public School",
          role: "student",
          academicStage: "classes-8-10",
          isOnboardingCompleted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    await page.goto("/dashboard/student");
    await expect(page.locator("text=Welcome back, Aarav Mehta")).toBeVisible();

    // Click Sign Out in sidebar
    const signOutBtn = page.locator('aside button:has-text("Sign Out")');
    await expect(signOutBtn).toBeVisible();
    await signOutBtn.click();

    // Must redirect to /sign-in
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test("7. Unauthenticated dev visit preserves demo personas for testing", async ({
    page,
  }) => {
    await page.goto("/dashboard/student");

    // Persona Switcher is visible in dev mode when unauthenticated
    await expect(page.locator("text=Dev Persona Switcher")).toBeVisible();
    await expect(page.locator('button:has-text("Class 6 Creative")')).toBeVisible();

    // Demonstration notice is visible for demo users
    await expect(
      page.locator("text=Real student accounts and cloud database persistence are currently disabled")
    ).toBeVisible();
  });
});
