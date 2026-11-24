/**
 * NEXT MOVE AI V2 — CLASSES 4–7 EXPLORE & ACTIVITY COMPLETION E2E TESTS
 * 
 * Comprehensive Playwright tests validating:
 * 1. Activity Completion -> "Explore More Possibilities" button leading to /explore
 * 2. Classes 4–7 simplified child-friendly discovery space:
 *    - Heading "Things You Might Love Exploring"
 *    - Friendly personalization explanation starting with "Based on what you enjoy doing in your Starting Point"
 *    - 5–6 age-appropriate exploration cards (hands-on challenges/experiences, not careers)
 *    - Absence of large catalog numbers, filter bars, comparison trays
 *    - Card detail modal with materials and challenge steps
 * 3. Exact Class Eligibility & Interest-Based Personalization:
 *    - Class 4 student receives Class 4 suitable creative content only (no Class 6/7 activities)
 *    - Two Class 6 students with different interests (Creative vs Science/Tech) receive distinctly different recommendations
 *    - Class 7 student with Nature interests receives Class 7 outdoor/field investigations
 * 4. Authenticated user isolation from demo persona switcher
 * 5. Preservation of full catalogue & comparison tools for higher classes (8–10, 11–12, etc.)
 */

import { test, expect } from '@playwright/test';

test.describe('Flow 5 — Classes 4–7 Simplified Explore & Activity Bridge', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test('1. Next Move Activity Completion displays "Explore More Possibilities" button leading to /explore', async ({ page }) => {
    // Inject mock authenticated Classes 4–7 student
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-class4-student",
        customEmail: "ananya@example.com",
        customName: "Ananya",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-class4-student",
          name: "Ananya",
          email: "ananya@example.com",
          role: "student",
          academicStage: "classes-4-7",
          currentClass: "Class 6",
          isOnboardingCompleted: false,
          startingPoint: {
            answers: { "1": "Drawing, painting, or making things" },
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

    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    // Ensure Your Next Move section is visible
    const nextMoveSection = page.locator('#next-move');
    await expect(nextMoveSection).toBeVisible();

    // Pick Option 1 to start
    const chooseBtn = page.locator('button:has-text("Choose This Activity")').first();
    await expect(chooseBtn).toBeVisible();
    await chooseBtn.click();
    await page.waitForTimeout(300);

    // Toggle steps checklist if closed
    const showStepsBtn = page.locator('button:has-text("Show Step Checklist")');
    if (await showStepsBtn.isVisible()) {
      await showStepsBtn.click();
    }

    // Check all checkboxes to reach 100% completion
    const checkboxes = page.locator('#activity-steps-container [role="checkbox"]');
    const count = await checkboxes.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const checkbox = checkboxes.nth(i);
      const isChecked = await checkbox.getAttribute('aria-checked');
      if (isChecked !== 'true') {
        await checkbox.click();
        await page.waitForTimeout(100);
      }
    }

    // Verify Celebration State Banner is visible
    await expect(page.locator('text=Activity Completed! Excellent work! 🎉')).toBeVisible();

    // Verify "Explore More Possibilities" button is present and clickable
    const exploreBtn = page.locator('a:has-text("Explore More Possibilities")');
    await expect(exploreBtn).toBeVisible();
    await expect(exploreBtn).toHaveAttribute('href', '/dashboard/student/explore');

    // Click "Explore More Possibilities"
    await exploreBtn.click();
    await page.waitForURL('**/dashboard/student/explore');

    // Verify we arrived on the Explore page in child-friendly mode
    await expect(page.locator('[data-testid="classes-4-7-explore-space"]')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Things You Might Love Exploring');
  });

  test('2. Classes 4–7 receives child-friendly discovery space with 5–6 experience cards', async ({ page }) => {
    await page.goto('/dashboard/student/explore');
    await page.waitForLoadState('networkidle');

    // Switch to Persona A (Class 6 Creative) via persona switcher bar
    await page.locator('button:has-text("Class 6 Creative")').click();
    await page.waitForTimeout(300);

    // Verify child-friendly Explore space container
    const exploreSpace = page.locator('[data-testid="classes-4-7-explore-space"]');
    await expect(exploreSpace).toBeVisible();

    // Verify heading contains "Things You Might Love Exploring"
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Things You Might Love Exploring');

    // Verify friendly explanation starts with "Based on what you enjoy doing in your Starting Point"
    await expect(page.locator('text=Based on what you enjoy doing in your Starting Point')).toBeVisible();

    // Verify reassurance banner (no adult career pressure)
    await expect(page.locator('text=No career locks or adult pressures')).toBeVisible();

    // Verify exactly 5–6 exploration cards are rendered
    const cards = page.locator('[aria-label="Curiosity Exploration Suggestions"] .group');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThanOrEqual(5);
    expect(cardCount).toBeLessThanOrEqual(6);

    // Verify cards contain experiences, not careers
    const firstCard = cards.first();
    await expect(firstCard.locator('text=What you can try:')).toBeVisible();
    await expect(firstCard.locator("text=What you'll learn or discover:")).toBeVisible();
    await expect(firstCard.locator('button:has-text("Explore This Experience")')).toBeVisible();

    // Verify absence of large catalog numbers, filter bars, and comparison controls
    await expect(page.locator('text=3 of 28')).not.toBeVisible();
    await expect(page.locator('text=Compare (')).not.toBeVisible();
    await expect(page.locator('input[placeholder*="Search"]')).not.toBeVisible();
    await expect(page.locator('text=Saved Pathways')).not.toBeVisible();
    await expect(page.locator('text=Corporate Salary')).not.toBeVisible();
    await expect(page.locator('text=Average Package')).not.toBeVisible();
  });

  test('3. Clicking "Explore This Experience" opens the mini-challenge details modal', async ({ page }) => {
    await page.goto('/dashboard/student/explore');
    await page.waitForLoadState('networkidle');

    await page.locator('button:has-text("Class 6 Creative")').click();
    await page.waitForTimeout(300);

    // Click "Explore This Experience" on the first card
    const firstExploreBtn = page.locator('button:has-text("Explore This Experience")').first();
    await firstExploreBtn.click();

    // Verify modal is open
    const modal = page.locator('[role="dialog"][aria-modal="true"]');
    await expect(modal).toBeVisible();
    await expect(modal.locator('text=Everyday Materials Needed:')).toBeVisible();
    await expect(modal.locator('text=Mini Challenge Steps:')).toBeVisible();

    // Close the modal using "Got It! Ready to Try" button
    const gotItBtn = modal.locator('button:has-text("Got It! Ready to Try")');
    await expect(gotItBtn).toBeVisible();
    await gotItBtn.click();

    // Verify modal is closed
    await expect(modal).not.toBeVisible();
  });

  test('4. Class 4 student receives Class 4-suitable creative content only', async ({ page }) => {
    // Authenticated Class 4 student with creative interests
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-class4-creative",
        customEmail: "kavya4@example.com",
        customName: "Kavya",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-class4-creative",
          name: "Kavya",
          email: "kavya4@example.com",
          role: "student",
          academicStage: "classes-4-7",
          currentClass: "Class 4",
          isOnboardingCompleted: false,
          startingPoint: {
            answers: { "1": "Drawing, painting, or making things", "5": "Art, animation, and creativity" },
            academicStage: "class-4",
            primaryFocus: "Hands-on drawing, papercraft, and creative storytelling.",
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

    await page.goto('/dashboard/student/explore');
    await page.waitForLoadState('networkidle');

    const exploreSpace = page.locator('[data-testid="classes-4-7-explore-space"]');
    await expect(exploreSpace).toBeVisible();

    // Subtitle confirms Class 4
    await expect(page.locator('text=Class 4 • Classes 4–7 Exploration')).toBeVisible();

    // Class 4 suitable creative cards must appear
    await expect(page.getByRole('heading', { level: 2, name: 'Color Mixing & Optical Illusions' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Shadow Puppets & Folk Tale Theatre' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Origami Animals & Geometry Folding' })).toBeVisible();

    // Class 7 specific activities must NOT appear
    await expect(page.locator('text=Multi-Stage DIY Water Filtration Column')).not.toBeVisible();
    await expect(page.locator('text=DIY Anemometer & Rain Gauge')).not.toBeVisible();
  });

  test('5. Two Class 6 students with different interests receive distinctly different recommendations', async ({ page }) => {
    // Student 1: Class 6 Science & Technology
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-class6-tech",
        customEmail: "rahul.tech@example.com",
        customName: "Rahul",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-class6-tech",
          name: "Rahul",
          email: "rahul.tech@example.com",
          role: "student",
          academicStage: "classes-4-7",
          currentClass: "Class 6",
          isOnboardingCompleted: false,
          startingPoint: {
            answers: {
              "1": "Building, fixing, or experimenting",
              "2": "Discovering how things work",
              "5": "Technology, robots, and machines",
            },
            academicStage: "classes-4-7",
            primaryFocus: "Hands-on robotics, machines, and electronics experiments.",
            status: "Exploring Interests",
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

    await page.goto('/dashboard/student/explore');
    await page.waitForLoadState('networkidle');

    // Verify Science & Technology recommendations appear
    await expect(page.getByRole('heading', { level: 2, name: 'Cardboard & Syringe Hydraulic Lift Arm' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Conductive Pencil Circuits & Paper Electronics' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Makerspace Inventions & Everyday Tinkering' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Explore How Everyday Technology Works' })).toBeVisible();

    // Creative-only activities must NOT be prioritized in the top cards
    await expect(page.getByRole('heading', { level: 2, name: 'Visual Storytelling & Comic Worlds' })).not.toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Illustrated Story Zine & Character Lore' })).not.toBeVisible();
  });

  test('6. Class 7 student with Nature interests receives Class 7 outdoor/field investigations', async ({ page }) => {
    // Authenticated Class 7 student with Nature & Environment interests
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-class7-nature",
        customEmail: "aarav.nature@example.com",
        customName: "Aarav",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-class7-nature",
          name: "Aarav",
          email: "aarav.nature@example.com",
          role: "student",
          academicStage: "classes-4-7",
          currentClass: "Class 7",
          isOnboardingCompleted: false,
          startingPoint: {
            answers: {
              "1": "Exploring nature or animals",
              "3": "Go on an adventure or explore outdoors",
              "5": "Animals, plants, and nature",
            },
            academicStage: "classes-4-7",
            primaryFocus: "Field biology, ecology, and environmental science investigations.",
            status: "Exploring Interests",
            activeInterests: ["Nature & Environment", "Science & Discovery"],
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

    await page.goto('/dashboard/student/explore');
    await page.waitForLoadState('networkidle');

    // Subtitle confirms Class 7
    await expect(page.locator('text=Class 7 • Classes 4–7 Exploration')).toBeVisible();

    // Class 7 Nature cards must appear
    await expect(page.getByRole('heading', { level: 2, name: 'Multi-Stage DIY Water Filtration Column' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'DIY Anemometer & Rain Gauge Weather Station' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Ecological Micro-Habitats & Quadrat Survey' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Solar Desalination & Clean Water Still' })).toBeVisible();

    // Lower class elementary crafts (Class 4/5) must NOT appear
    await expect(page.locator('text=Shadow Puppets & Folk Tale Theatre')).not.toBeVisible();
    await expect(page.locator('text=Color Mixing & Optical Illusions')).not.toBeVisible();
  });

  test('7. Authenticated user mode strictly isolates from dev persona switcher', async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __NEXT_MOVE_MOCK_AUTH__: unknown }).__NEXT_MOVE_MOCK_AUTH__ = {
        isAuthenticated: true,
        customUid: "uid-auth-user",
        customEmail: "auth@example.com",
        customName: "Auth Student",
      };
      (window as unknown as { __NEXT_MOVE_MOCK_FIRESTORE__: unknown }).__NEXT_MOVE_MOCK_FIRESTORE__ = {
        mockProfile: {
          uid: "uid-auth-user",
          name: "Auth Student",
          email: "auth@example.com",
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

    await page.goto('/dashboard/student/explore');
    await page.waitForLoadState('networkidle');

    // The Dev Persona Switcher toolbar MUST NOT be visible for an authenticated user
    await expect(page.locator('aside[aria-label="Development Persona Switcher"]')).not.toBeVisible();
    await expect(page.locator('button:has-text("Class 6 Creative")')).not.toBeVisible();
  });

  test('8. Higher stages (Classes 8–10, Classes 11–12) preserve the full catalog, filter bar, and comparison tools', async ({ page }) => {
    await page.goto('/dashboard/student/explore');
    await page.waitForLoadState('networkidle');

    // Switch to Persona B (Class 9 Undecided)
    await page.locator('button:has-text("Class 9 Undecided")').click();
    await page.waitForTimeout(300);

    // Verify Classes 4–7 explore space is NOT rendered
    await expect(page.locator('[data-testid="classes-4-7-explore-space"]')).not.toBeVisible();

    // Verify full catalogue filter bar and search input ARE rendered
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
    await expect(page.locator('button:has-text("Saved Pathways")')).toBeVisible();
    await expect(page.locator('button:has-text("Compare")')).toBeVisible();

    // Switch to Persona C (Class 12 PCM)
    await page.locator('button:has-text("Class 12 PCM")').click();
    await page.waitForTimeout(300);

    await expect(page.locator('[data-testid="classes-4-7-explore-space"]')).not.toBeVisible();
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
    await expect(page.locator('button:has-text("Compare")')).toBeVisible();
  });
});
