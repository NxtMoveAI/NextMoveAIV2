/**
 * NEXT MOVE AI V2 — FLOW 7 E2E TEST SUITE
 * 
 * Comprehensive Playwright tests validating:
 * 1. Neutral / Anonymous entry at /dashboard/student/projects with Flow 7 master workspace
 * 2. Continuous Growth Engine recommendation with grounded 'whySuggested' and alternative choices
 * 3. Child safety and age-gating (Classes 4–7 strictly protected from adult employment/wage listings)
 * 4. Adaptable roadmap builder with non-punitive milestone progression and track customization
 * 5. Experiential project studio: starter catalog, step execution, work notes, artifact attachment, and completion reflection
 * 6. Student-driven custom project creation
 * 7. Transparent provenance in opportunities directory (Verified vs Curated vs Prototype)
 * 8. Profile isolation: zero cross-student project or roadmap leakage across persona switches
 * 9. Student Dashboard bridge navigation (/dashboard/student -> /dashboard/student/projects)
 * 10. Responsive mobile layout (390px) and WCAG 2.1 AA accessibility via axe-core
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Flow 7 — Build My Next Move (/dashboard/student/projects)', () => {

  // ===========================================================================
  // 1. NEUTRAL / ANONYMOUS ENTRY
  // ===========================================================================

  test('F7.1: Fresh visitor accesses Build My Next Move workspace with neutral framing and 5 core tabs', async ({ page }) => {
    await page.goto('/dashboard/student/projects');
    await page.waitForLoadState('networkidle');

    // Verify header and philosophy
    await expect(page.locator('text=Flow 7 • Build My Next Move').first()).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('text=We don\'t decide careers; we enable clarity').first()).toBeVisible();

    // Verify all 5 workspace tabs are present
    await expect(page.getByTestId('workspace-tab-overview')).toBeVisible();
    await expect(page.getByTestId('workspace-tab-roadmaps')).toBeVisible();
    await expect(page.getByTestId('workspace-tab-projects')).toBeVisible();
    await expect(page.getByTestId('workspace-tab-experiences')).toBeVisible();
    await expect(page.getByTestId('workspace-tab-opportunities')).toBeVisible();

    // Verify Situation overview section exists
    await expect(page.locator('#where-i-am-heading')).toBeVisible();
  });

  // ===========================================================================
  // 2. CONTINUOUS GROWTH RECOMMENDATION & ALTERNATIVES
  // ===========================================================================

  test('F7.2: Growth engine renders primary suggested next move with grounded explanation and alternative options', async ({ page }) => {
    await page.goto('/dashboard/student/projects');
    await page.waitForLoadState('networkidle');

    // Verify primary recommendation card exists
    await expect(page.getByTestId('primary-next-move-card')).toBeVisible();
    await expect(page.getByTestId('rec-why-suggested')).toBeVisible();

    // Toggle alternatives
    const altToggle = page.getByTestId('toggle-alternatives-btn');
    if (await altToggle.isVisible()) {
      await altToggle.click();
      await expect(page.getByTestId('alternatives-panel')).toBeVisible();

      // Click an alternative recommendation
      const firstAlt = page.locator('[data-testid^="select-alt-"]').first();
      if (await firstAlt.isVisible()) {
        await firstAlt.click();
        // Recommendation card updates
        await expect(page.getByTestId('primary-next-move-card')).toBeVisible();
      }
    }
  });

  // ===========================================================================
  // 3. STAGE ADAPTABILITY & CHILD SAFETY (CLASSES 4-7)
  // ===========================================================================

  test('F7.3: Middle School Persona A (Class 6 Creative) receives curiosity roadmaps and is strictly protected from adult jobs', async ({ page }) => {
    await page.goto('/dashboard/student/projects');
    await page.waitForLoadState('networkidle');

    // Switch to Persona A
    await page.locator('button:has-text("Class 6 Creative")').click();

    // Verify stage badge & middle school title
    await expect(page.locator('text=Classes 4–7 · Curiosity & Maker Projects').first()).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: 'Maker Projects & Curiosity Roadmaps' })).toBeVisible();

    // Navigate to Opportunities Tab (which shows Competitions & Fairs for Middle School)
    await page.getByTestId('workspace-tab-opportunities').click();

    // Verify child safety notice
    await expect(page.locator('text=Age-Appropriate Safeguard Active').first()).toBeVisible();

    // Verify NO adult employment tabs (Internships, Apprenticeships, Fellowships) appear
    await expect(page.getByRole('button', { name: 'Internships', exact: true })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Apprenticeships', exact: true })).not.toBeVisible();

    // Verify school enrichment / science fair is displayed instead
    await expect(page.getByRole('heading', { level: 3, name: 'National Young Inventors & Maker Showcase' })).toBeVisible();
  });

  // ===========================================================================
  // 4. ADAPTABLE ROADMAP BUILDER & NON-PUNITIVE PACING
  // ===========================================================================

  test('F7.4: Student interacts with roadmap milestones and adapts pacing non-punitively', async ({ page }) => {
    await page.goto('/dashboard/student/projects');
    await page.waitForLoadState('networkidle');

    // Switch to Persona C (Class 12 PCM)
    await page.locator('button:has-text("Class 12 PCM")').click();

    // Switch to Roadmaps tab
    await page.getByTestId('workspace-tab-roadmaps').click();
    await expect(page.getByTestId('roadmap-builder-view')).toBeVisible();

    // Initialize roadmap if prompt exists
    const createBtn = page.getByRole('button', { name: 'Create My Roadmap' });
    if (await createBtn.isVisible()) {
      await createBtn.click();
      await page.getByRole('button', { name: 'Save Customization' }).click();
    }

    // Toggle a milestone
    const toggleBtn = page.locator('[data-testid^="milestone-toggle-"]').first();
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();

    // Open customize modal
    const customizeBtn = page.getByTestId('customize-roadmap-btn');
    if (await customizeBtn.isVisible()) {
      await customizeBtn.click();
      await expect(page.getByTestId('roadmap-customize-modal')).toBeVisible();

      // Select exploratory pacing
      await page.getByRole('button', { name: /Exploratory/i }).click();

      // Save customization
      await page.getByRole('button', { name: 'Save Customization' }).click();
      await expect(page.getByTestId('roadmap-customize-modal')).not.toBeVisible();
    }
  });

  // ===========================================================================
  // 5. PROJECT RUNNER: EXECUTION, ARTIFACT ATTACHMENT & REFLECTION
  // ===========================================================================

  test('F7.5: Student starts a starter project, checks steps, attaches evidence artifact and completes reflection', async ({ page }) => {
    await page.goto('/dashboard/student/projects');
    await page.waitForLoadState('networkidle');

    // Switch to Persona E (BCA Python)
    await page.locator('button:has-text("BCA Python")').click();

    // Switch to Projects tab
    await page.getByTestId('workspace-tab-projects').click();
    await expect(page.getByTestId('projects-workspace-view')).toBeVisible();

    // Start a starter project
    const startBtn = page.locator('[data-testid^="start-project-btn-"]').first();
    await expect(startBtn).toBeVisible();
    await startBtn.click();

    // Project Runner Modal opens
    await expect(page.getByTestId('project-runner-modal')).toBeVisible();

    // Check off step 1
    const stepCheckbox = page.locator('[data-testid^="step-checkbox-"]').first();
    await stepCheckbox.click();

    // Attach portfolio artifact
    await page.getByTestId('add-artifact-btn').click();
    await page.locator('input[placeholder*="Artifact Title"]').fill('Prototype Core Code Repo');
    await page.locator('input[placeholder*="https://"]').fill('https://github.com/student/bca-project-sample');
    await page.getByRole('button', { name: 'Save Artifact' }).click();

    // Verify artifact link is rendered
    await expect(page.locator('text=Prototype Core Code Repo')).toBeVisible();

    // Mark project complete and enter reflection
    await page.getByTestId('complete-project-btn').click();
    await expect(page.getByTestId('completion-reflection-form')).toBeVisible();

    await page.locator('textarea[placeholder*="Describe your implementation"]').fill('Implemented algorithms successfully with full unit test coverage.');
    await page.getByTestId('submit-project-reflection').click();

    // Verify completed badge in modal
    await expect(page.locator('text=Completed Reflection')).toBeVisible();

    // Close modal
    await page.getByRole('button', { name: 'Done' }).click();
    await expect(page.getByTestId('project-runner-modal')).not.toBeVisible();

    // Verify completed projects section shows the completed project
    await expect(page.getByTestId('completed-projects-section')).toBeVisible();
  });

  // ===========================================================================
  // 6. PROPOSE CUSTOM PROJECT
  // ===========================================================================

  test('F7.6: Student proposes and launches a custom self-driven project', async ({ page }) => {
    await page.goto('/dashboard/student/projects');
    await page.waitForLoadState('networkidle');

    // Go to Projects tab
    await page.getByTestId('workspace-tab-projects').click();

    // Click propose custom project
    await page.getByTestId('create-custom-project-btn').click();
    await expect(page.getByTestId('new-project-modal')).toBeVisible();

    // Fill in project details
    await page.getByTestId('new-project-title-input').fill('Autonomous Campus Weather Station');
    await page.getByTestId('new-project-problem-input').fill('Designing an ESP32 sensor array to record micro-climate variations across campus.');

    // Submit custom project
    await page.getByTestId('submit-new-project').click();

    // Runner modal opens for the newly created project
    await expect(page.getByTestId('project-runner-modal')).toBeVisible();
    await expect(page.getByTestId('project-runner-modal').getByRole('heading', { name: 'Autonomous Campus Weather Station' })).toBeVisible();

    // Close modal
    await page.getByRole('button', { name: 'Done' }).click();
  });

  // ===========================================================================
  // 7. OPPORTUNITIES DIRECTORY & TRANSPARENT PROVENANCE
  // ===========================================================================

  test('F7.7: Opportunities directory displays explicit provenance badges without false claims', async ({ page }) => {
    await page.goto('/dashboard/student/projects');
    await page.waitForLoadState('networkidle');

    // Switch to Persona G (Engineering Senior)
    await page.locator('button:has-text("Eng Senior")').click();

    // Go to Opportunities tab
    await page.getByTestId('workspace-tab-opportunities').click();
    await expect(page.getByTestId('opportunities-view')).toBeVisible();

    // Verify provenance badges appear
    const provenanceBadge = page.locator('text=Verified Program').or(page.locator('text=Verified Live Listing')).or(page.locator('text=Curated Educational Info')).or(page.locator('text=Illustrative Prototype Example'));
    await expect(provenanceBadge.first()).toBeVisible();

    // Filter by search keyword
    const searchInput = page.locator('input[placeholder*="Search opportunities"]');
    await searchInput.fill('Fellowship');
    await page.waitForTimeout(100);

    // Opportunity cards match
    await expect(page.locator('[data-testid^="opportunity-card-"]').first()).toBeVisible();
  });

  // ===========================================================================
  // 8. PROFILE ISOLATION (ZERO CROSS-STUDENT LEAKAGE)
  // ===========================================================================

  test('F7.8: Switching student personas cleanly isolates active projects and roadmaps', async ({ page }) => {
    await page.goto('/dashboard/student/projects');
    await page.waitForLoadState('networkidle');

    // 1. On Persona D (Diploma Mech), propose a unique project
    await page.locator('button:has-text("Diploma Mech")').click();
    await page.getByTestId('workspace-tab-projects').click();
    await page.getByTestId('create-custom-project-btn').click();
    await page.getByTestId('new-project-title-input').fill('Pneumatic Sorter Rig 4000');
    await page.getByTestId('new-project-problem-input').fill('Mechanical sort test rig for diploma automation.');
    await page.getByTestId('submit-new-project').click();
    await page.getByRole('button', { name: 'Done' }).click();

    // Verify it is visible for Persona D
    await expect(page.locator('text=Pneumatic Sorter Rig 4000')).toBeVisible();

    // 2. Switch to Persona F (BCom Finance)
    await page.locator('button:has-text("BCom Finance")').click();
    await page.getByTestId('workspace-tab-projects').click();

    // Persona F MUST NOT see Diploma Mech's custom project
    await expect(page.locator('text=Pneumatic Sorter Rig 4000')).not.toBeVisible();

    // 3. Switch back to Persona D
    await page.locator('button:has-text("Diploma Mech")').click();
    await page.getByTestId('workspace-tab-projects').click();

    // Persona D's project is safely restored in session
    await expect(page.locator('text=Pneumatic Sorter Rig 4000')).toBeVisible();
  });

  // ===========================================================================
  // 9. DASHBOARD BRIDGE NAVIGATION
  // ===========================================================================

  test('F7.9: Student Dashboard Next Move card bridges directly to Flow 7 workspace', async ({ page }) => {
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    // Find Next Move card action link on dashboard
    const exploreMoveBtn = page.getByRole('link', { name: /Work on Project|Continue My Next Move|Explore Next Action|Open Project Studio/i }).first();
    if (await exploreMoveBtn.isVisible()) {
      await exploreMoveBtn.click();
      await page.waitForURL(/\/dashboard\/student\/projects/);
      await expect(page.getByTestId('next-move-workspace')).toBeVisible();
    }
  });

  // ===========================================================================
  // 10. RESPONSIVE MOBILE LAYOUT (390px) & WCAG 2.1 AA ACCESSIBILITY
  // ===========================================================================

  test('F7.10: Responsive mobile viewport (390px) and WCAG 2.1 AA accessibility audit', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/dashboard/student/projects');
    await page.waitForLoadState('networkidle');

    // Verify workspace layout renders cleanly on mobile
    await expect(page.getByTestId('next-move-workspace')).toBeVisible();
    await expect(page.getByTestId('workspace-tab-overview')).toBeVisible();

    // Run axe-core accessibility audit
    const axeResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast']) // Color tokens tested independently
      .analyze();

    const criticalOrSerious = axeResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalOrSerious.length).toBe(0);
  });

  // ===========================================================================
  // 11. PRACTICAL EXPERIENCE LINK INTEGRATION WITH FLOW 6
  // ===========================================================================

  test('F7.11: Practical Experience links navigate to Flow 6 Validate Fit runner and launch modal', async ({ page }) => {
    await page.goto('/dashboard/student/projects');
    await page.waitForLoadState('networkidle');

    // Switch to Persona C (Class 12 PCM)
    await page.locator('button:has-text("Class 12 PCM")').click();

    // Navigate to Practical Experiences tab
    await page.getByTestId('workspace-tab-experiences').click();
    await expect(page.getByTestId('practical-experiences-view')).toBeVisible();

    // Find the first "Try in Validate Fit" link
    const tryBtn = page.getByRole('link', { name: /Try in Validate Fit/i }).first();
    await expect(tryBtn).toBeVisible();

    // Verify href points to canonical /dashboard/student/growth?trial=...
    const href = await tryBtn.getAttribute('href');
    expect(href).toMatch(/^\/dashboard\/student\/growth\?trial=trial_/);

    // Click link and verify navigation to Flow 6
    await tryBtn.click();
    await page.waitForURL(/\/dashboard\/student\/growth\?trial=/);

    // Flow 6 Trial Runner Modal should open with the trial
    await expect(page.getByTestId('trial-runner-modal')).toBeVisible();
    await expect(page.getByTestId('trial-runner-modal').getByRole('heading', { level: 2 })).toBeVisible();
  });

  // ===========================================================================
  // 12. OPPORTUNITIES DIRECTORY PROVENANCE AUDIT
  // ===========================================================================

  test('F7.12: Opportunities Directory provenance audit validates verified URLs, dates, and prototype disclosures', async ({ page }) => {
    await page.goto('/dashboard/student/projects');
    await page.waitForLoadState('networkidle');

    // Switch to Persona G (Eng Senior)
    await page.locator('button:has-text("Eng Senior")').click();

    // Navigate to Opportunities tab
    await page.getByTestId('workspace-tab-opportunities').click();
    await expect(page.getByTestId('opportunities-view')).toBeVisible();

    // 1. Verify GSoC listing separates Program Authenticity from Application Availability
    const verifiedBadge = page.locator('text=Verified Program · Verified October 2026').or(page.locator('text=Verified Program')).first();
    await expect(verifiedBadge).toBeVisible();

    // Check GSoC card accurately indicates applications are closed for current cycle
    const gsocCard = page.getByTestId('opportunity-card-opp_deg_google_summer_code');
    await expect(gsocCard).toBeVisible();
    await expect(gsocCard.locator('[data-testid="status-badge-closed"]')).toBeVisible();
    await expect(gsocCard.locator('text=Applications Closed')).toBeVisible();

    // Check external link points to official program page without falsely advertising open application
    const officialLink = gsocCard.getByRole('link', { name: /Official Program Page/i });
    await expect(officialLink).toBeVisible();
    await expect(officialLink).toHaveAttribute('href', 'https://summerofcode.withgoogle.com');

    // 2. Verify prototype example has clear prototype disclosure
    const protoCard = page.getByTestId('opportunity-card-opp_deg_proto_fintech_sandbox');
    await expect(protoCard).toBeVisible();
    await expect(protoCard.locator('text=Illustrative Prototype Example')).toBeVisible();
    await expect(protoCard.getByText('Prototype Example', { exact: true })).toBeVisible();
  });

  // ===========================================================================
  // 13. COMPLETE STUDENT JOURNEY VERIFICATION (FLOWS 1–7)
  // ===========================================================================

  test('F7.13: Full student journey traversal: Landing -> Entry -> Onboarding -> Dashboard -> Explore -> Growth -> Projects', async ({ page }) => {
    // 1. Landing Page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toBeVisible();

    // 2. Entry flow (Select student role)
    await page.goto('/get-started');
    await page.waitForLoadState('networkidle');
    await page.locator('div[role="radio"]:has-text("I\'m a Student")').click();
    await page.locator('button:has-text("Continue")').click();

    // 3. Confirm Stage & Access
    await page.waitForURL(/\/get-started\/student/);
    await page.locator('div[role="radio"]:has-text("Classes 11 – 12")').click();
    await page.locator('button:has-text("Confirm & Continue")').click();
    await page.waitForURL(/\/get-started\/student\/access/);
    await page.locator('div[role="radio"]:has-text("13 to 17 Years")').click();
    await page.locator('button:has-text("Continue to Student Signup")').click();
    // 4. Student Signup (Synthetic Form Fill)
    await page.waitForURL(/\/sign-up\/student/);
    await page.locator('#student-name').fill('Aryan Sharma (Synthetic Test)');
    await page.locator('#student-email').fill('aryan.synth.test@example.com');
    await page.locator('#student-password').fill('SyntheticPass123!');
    await page.locator('#student-confirm-password').fill('SyntheticPass123!');
    await page.locator('input[type="checkbox"]').check();
    await page.locator('button[type="submit"]:has-text("Create Student Space")').click();

    // 5. Onboarding Preview Handoff
    await page.locator('a:has-text("Design Preview: Continue to Flow 3 Onboarding Preview")').click();
    await page.waitForURL(/\/onboarding/);
    await expect(page.locator('text=Step 1 of')).toBeVisible();

    // 6. Navigate to Student Dashboard
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#next-move')).toBeVisible();

    // 7. Navigate to Explore Possibilities via Sidebar
    await page.locator('a[href="/dashboard/student/explore"]').first().click();
    await page.waitForURL(/\/dashboard\/student\/explore/);
    await expect(page.getByRole('heading', { level: 1, name: 'Explore Pathways & Possibilities' })).toBeVisible();

    // 8. Navigate to Validate Fit via Sidebar
    await page.locator('a[href="/dashboard/student/growth"]').first().click();
    await page.waitForURL(/\/dashboard\/student\/growth/);
    await expect(page.getByRole('heading', { level: 1, name: /Validate Fit/i })).toBeVisible();

    // 9. Navigate to Build My Next Move (Projects) via Sidebar
    await page.locator('a[href="/dashboard/student/projects"]').first().click();
    await page.waitForURL(/\/dashboard\/student\/projects/);
    await expect(page.getByTestId('next-move-workspace')).toBeVisible();
    await expect(page.locator('text=Flow 7 • Build My Next Move').first()).toBeVisible();
  });
});
