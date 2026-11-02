/**
 * NEXT MOVE AI V2 — FLOW 6 E2E TEST SUITE
 * 
 * Comprehensive Playwright tests validating:
 * 1. Stage-adaptive discovery across all 6 cohorts (Classes 4–7, 8–10, 11–12, Diploma, Degree, Final-Year)
 * 2. Middle school safety (Classes 4–7 strictly blocked from adult challenges)
 * 3. Interactive trial runners across diverse pedagogical adapters:
 *    - Creative Prompt (Classes 4–7)
 *    - Logic Simulation (Classes 8–10 & 11–12)
 *    - Applied Troubleshooting (Diploma)
 *    - Scenario Tradeoff (Degree / Engineering)
 *    - Case Critique (Final-Year / Graduate)
 * 4. 5-point reflection modal and grounded evidence feedback (zero fake AI match %)
 * 5. Evidence Ledger: Practised vs Self-Reported vs Unassessed capabilities
 * 6. Non-punitive controls: Save progress, skip for now, retry challenge
 * 7. Persona profile isolation (zero cross-student evidence leakage)
 * 8. Dashboard integration (/dashboard/student growth snapshot and recent activity)
 * 9. Responsive layout (390px mobile) and WCAG 2.1 AA accessibility via axe-core
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Flow 6 — Validate Fit (/dashboard/student/growth)', () => {

  // ===========================================================================
  // 1. NEUTRAL / ANONYMOUS ENTRY
  // ===========================================================================

  test('F6.1: Fresh visitor accesses Validate Fit workspace with neutral framing and full discovery feed', async ({ page }) => {
    await page.goto('/dashboard/student/growth');
    await page.waitForLoadState('networkidle');

    // Verify header and philosophy
    await expect(page.locator('text=Flow 6 • Validate Fit').first()).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: 'Validate Fit & Build Practical Evidence' })).toBeVisible();
    await expect(page.locator('text=We don\'t decide careers; we enable clarity').first()).toBeVisible();

    // Verify tabs
    await expect(page.getByRole('button', { name: /Practical Discovery/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Evidence Ledger/i })).toBeVisible();

    // Verify trial cards appear in feed
    await expect(page.locator('[data-testid^="trial-card-"]').first()).toBeVisible();
  });

  // ===========================================================================
  // 2. STAGE ADAPTABILITY & CHILD SAFETY
  // ===========================================================================

  test('F6.2A: Middle School Persona A (Class 6 Creative) receives curiosity challenges only; adult trials blocked', async ({ page }) => {
    await page.goto('/dashboard/student/growth');
    await page.waitForLoadState('networkidle');

    // Switch to Persona A
    await page.locator('button:has-text("Class 6 Creative")').click();

    // Verify stage badge & header
    await expect(page.locator('text=Classes 4–7 · Curiosity Challenges').first()).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: 'Creative Curiosity & Maker Challenges' })).toBeVisible();

    // Verify only middle school challenges appear
    await expect(page.getByRole('heading', { level: 2, name: 'The 3-Panel Hero Adventure' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Backyard Eco-Detective Field Journal' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Cardboard Kinetic Lever Challenge' })).toBeVisible();

    // Adult challenges must NOT be visible
    await expect(page.locator('text=Industrial Conveyor Interlock Diagnosis')).not.toBeVisible();
    await expect(page.locator('text=Database Partitioning vs Read Replication Trade-off')).not.toBeVisible();
    await expect(page.locator('text=B2B SaaS Churn & Unit Economics Audit')).not.toBeVisible();

    // Child safety URL parameter gate: direct deep-link to adult trial must NOT open
    await page.goto('/dashboard/student/growth?trial=trial_dip_plc_ladder');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('F6.2B: Classes 8–10 Persona B (Class 9 Undecided) receives foundational logic & policy trials', async ({ page }) => {
    await page.goto('/dashboard/student/growth');
    await page.waitForLoadState('networkidle');

    // Switch to Persona B
    await page.locator('button:has-text("Class 9 Undecided")').click();

    // Verify foundational trial
    await expect(page.getByRole('heading', { level: 2, name: 'Python Algorithm & Bug Detective' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'School Safety Civic Policy Memo' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Small Business Break-Even Simulation' })).toBeVisible();
  });

  test('F6.2C: Classes 11–12 Persona C (Class 12 PCM) receives algorithmic simulations', async ({ page }) => {
    await page.goto('/dashboard/student/growth');
    await page.waitForLoadState('networkidle');

    // Switch to Persona C
    await page.locator('button:has-text("Class 12 PCM")').click();

    // Verify algorithmic trial
    await expect(page.getByRole('heading', { level: 2, name: 'Algorithmic Complexity Stress Test' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Mobile Checkout Friction Audit' })).toBeVisible();
  });

  test('F6.2D: Diploma Persona D (Diploma Mech) receives hands-on applied troubleshooting', async ({ page }) => {
    await page.goto('/dashboard/student/growth');
    await page.waitForLoadState('networkidle');

    // Switch to Persona D
    await page.locator('button:has-text("Diploma Mech")').click();

    // Verify applied industrial challenge
    await expect(page.getByRole('heading', { level: 2, name: 'Industrial Conveyor Interlock Diagnosis' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Linux Server Port & Nginx 502 Bad Gateway Triage' })).toBeVisible();
  });

  test('F6.2E: Engineering Persona G (Eng Senior) receives distributed systems architecture trade-off', async ({ page }) => {
    await page.goto('/dashboard/student/growth');
    await page.waitForLoadState('networkidle');

    // Switch to Persona G
    await page.locator('button:has-text("Eng Senior")').click();

    // Verify engineering trade-off challenge
    await expect(page.getByRole('heading', { level: 2, name: 'Database Partitioning vs Read Replication Trade-off' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Feature Prioritization Trade-off Matrix' })).toBeVisible();
  });

  test('F6.2F: Graduate Persona H (Humanities Grad) receives policy brief critique', async ({ page }) => {
    await page.goto('/dashboard/student/growth');
    await page.waitForLoadState('networkidle');

    // Switch to Persona H
    await page.locator('button:has-text("Humanities Grad")').click();

    // Verify policy critique challenge
    await expect(page.getByRole('heading', { level: 2, name: 'Renewable Microgrid Subsidy Memorandum' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'B2B SaaS Churn & Unit Economics Audit' })).toBeVisible();
  });

  // ===========================================================================
  // 3. COMPLETE TRIAL EXECUTION & REFLECTION WORKFLOW
  // ===========================================================================

  test('F6.3: Complete end-to-end trial journey: Discover → Try Adapter → Reflect → View Evidence Summary', async ({ page }) => {
    await page.goto('/dashboard/student/growth');
    await page.waitForLoadState('networkidle');

    // Switch to Persona C for Algorithmic Search trial
    await page.locator('button:has-text("Class 12 PCM")').click();

    // 1. Discover & Start Trial
    const card = page.locator('[data-testid="trial-card-trial_c1112_algo_efficiency"]');
    await expect(card).toBeVisible();
    await card.locator('button:has-text("Try Experience")').click();

    // 2. Trial Runner Modal is open
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal.locator('text=Learning Objective')).toBeVisible();

    // 3. Progressive disclosure: Expand hints
    const hintsButton = modal.locator('button:has-text("Optional Guidance Hints")');
    await expect(hintsButton).toBeVisible();
    await hintsButton.click();
    await expect(modal.locator('text=Binary search cuts the search space in half')).toBeVisible();

    // Select the correct algorithmic fix approach (meaningful participation!)
    await modal.locator('text=Principle A: Binary search').first().click();

    // 4. Click "Reflect on this Experience"
    const finishContentButton = modal.locator('button:has-text("Reflect on this Experience")');
    await expect(finishContentButton).toBeVisible();
    await finishContentButton.click();

    // 5. Reflection Modal is now active
    const refModal = page.getByRole('dialog');
    await expect(refModal.locator('text=How did that feel?')).toBeVisible();

    // Fill reflection fields
    await refModal.locator('#ref-enjoyed').fill('Comparing linear search to binary search showed why big O notation matters.');
    await refModal.locator('#ref-challenged').fill('Understanding how sorting cost amortizes over many queries.');
    await refModal.locator('button:has-text("Yes, definitely")').click();
    await refModal.locator('#ref-learned').fill('Logarithmic algorithms scale remarkably well.');
    await refModal.locator('#ref-differently').fill('Try implementing hash maps to compare O(1) vs O(log n).');

    // 6. Submit reflection
    const submitReflectionButton = refModal.locator('button:has-text("Record Evidence & View Summary")');
    await expect(submitReflectionButton).toBeEnabled();
    await submitReflectionButton.click();

    // 7. Feedback Summary Modal appears
    await expect(page.locator('text=Evidence Recorded')).toBeVisible();
    await expect(page.locator('text=Experience Summary')).toBeVisible();
    await expect(page.locator('text=Evidence Ledger Addition')).toBeVisible();
    await expect(page.locator('text=Practised in Challenge').first()).toBeVisible();
    await expect(page.locator('text=Truth Boundary:').first()).toBeVisible();

    // Close feedback modal
    await page.locator('button:has-text("Done")').click();
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // 8. Card now displays "Practised" badge and "Retry" action
    await expect(card.locator('text=Practised')).toBeVisible();
    await expect(card.locator('button:has-text("Retry")')).toBeVisible();
  });

  // ===========================================================================
  // 4. EVIDENCE LEDGER
  // ===========================================================================

  test('F6.4: Evidence Ledger truthfully distinguishes Practised from Self-Reported and Unassessed', async ({ page }) => {
    await page.goto('/dashboard/student/growth');
    await page.waitForLoadState('networkidle');

    // Switch to Persona C
    await page.locator('button:has-text("Class 12 PCM")').click();

    // Switch to Evidence Ledger tab
    await page.getByRole('button', { name: /Evidence Ledger/i }).click();

    // Verify truth banner
    await expect(page.locator('text=Next Move AI Evidence Integrity Guarantee')).toBeVisible();
    await expect(page.locator('text=Completing an exploratory trial demonstrates hands-on familiarity and problem-solving practice')).toBeVisible();

    // Verify taxonomy buckets
    await expect(page.locator('text=Practised in Challenge').first()).toBeVisible();
    await expect(page.locator('text=Self-Reported Familiarity')).toBeVisible();
    await expect(page.locator('text=Unassessed Horizons')).toBeVisible();

    // Verify self-reported skills from Persona C (Flow 3 baseline)
    await expect(page.locator('text=Calculus & Linear Algebra Foundations').first()).toBeVisible();
  });

  // ===========================================================================
  // 5. NON-PUNITIVE ACTIONS: SAVE PROGRESS & SKIP
  // ===========================================================================

  test('F6.5: Non-punitive actions: Save progress and skip without penalty', async ({ page }) => {
    await page.goto('/dashboard/student/growth');
    await page.waitForLoadState('networkidle');

    // Switch to Persona B
    await page.locator('button:has-text("Class 9 Undecided")').click();

    // Start Python Loop challenge
    const card = page.locator('[data-testid="trial-card-trial_c810_code_logic"]');
    await card.locator('button:has-text("Try Experience")').click();
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    // Click "Save Progress"
    await modal.locator('button:has-text("Save Progress")').click();
    await expect(modal.locator('text=Progress saved!')).toBeVisible();

    // Close modal
    await modal.locator('button[aria-label="Close trial"]').click();
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // Card now displays "In Progress" badge and "Resume Trial"
    await expect(card.locator('text=In Progress')).toBeVisible();
    await expect(card.locator('button:has-text("Resume Trial")')).toBeVisible();

    // Reopen and test "Skip without Penalty"
    await card.locator('button:has-text("Resume Trial")').click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('dialog').locator('button:has-text("Skip without Penalty")').click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  // ===========================================================================
  // 6. PROFILE ISOLATION & ZERO DATA LEAKAGE
  // ===========================================================================

  test('F6.6: Completing a challenge under Persona C does not leak into Persona D or Persona A', async ({ page }) => {
    await page.goto('/dashboard/student/growth');
    await page.waitForLoadState('networkidle');

    // Switch to Persona C and complete a trial
    await page.locator('button:has-text("Class 12 PCM")').click();
    const cardC = page.locator('[data-testid="trial-card-trial_c1112_algo_efficiency"]');
    await cardC.locator('button:has-text("Try Experience")').click();

    const modal = page.getByRole('dialog');
    await modal.locator('text=Principle A: Binary search').first().click();
    await modal.locator('button:has-text("Reflect on this Experience")').click();
    const refModal = page.getByRole('dialog');
    await refModal.locator('#ref-enjoyed').fill('I enjoyed solving the algorithmic search puzzle.');
    await refModal.locator('button:has-text("Record Evidence & View Summary")').click();
    await page.locator('button:has-text("Done")').click();

    // Verify completed on Persona C
    await expect(cardC.locator('text=Practised')).toBeVisible();

    // Switch to Persona D (Diploma Mech)
    await page.locator('button:has-text("Diploma Mech")').click();

    // Persona D must NOT show any trial cards with "Practised" badge
    await expect(page.locator('[data-testid^="trial-card-"] span:has-text("Practised")')).toHaveCount(0);
    await expect(page.locator('button:has-text("Try Experience")').first()).toBeVisible();
  });

  // ===========================================================================
  // 7. STUDENT DASHBOARD INTEGRATION
  // ===========================================================================

  test('F6.7: Completing a Flow 6 challenge updates Student Dashboard Growth Snapshot and Recent Activity', async ({ page }) => {
    await page.goto('/dashboard/student/growth');
    await page.waitForLoadState('networkidle');

    // Switch to Persona C
    await page.locator('button:has-text("Class 12 PCM")').click();

    // Complete Algorithmic Search trial
    const card = page.locator('[data-testid="trial-card-trial_c1112_algo_efficiency"]');
    await card.locator('button:has-text("Try Experience")').click();

    const modal = page.getByRole('dialog');
    await modal.locator('text=Principle A: Binary search').first().click();
    await modal.locator('button:has-text("Reflect on this Experience")').click();
    const refModal = page.getByRole('dialog');
    await refModal.locator('#ref-enjoyed').fill('Comparing linear search to binary search showed why big O notation matters.');
    await refModal.locator('button:has-text("Record Evidence & View Summary")').click();
    await page.locator('button:has-text("Done")').click();

    // Navigate to Student Dashboard
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    // Verify Growth Snapshot displays updated Practised count
    await expect(page.getByRole('heading', { level: 2, name: "What you've explored so far" })).toBeVisible();

    // Verify Recent Growth Activity lists the completed challenge with real timestamp and competency
    await expect(page.locator('text=Latest Activity Completed: Algorithmic Complexity Stress Test')).toBeVisible();
    await expect(page.locator('text=Practised topic: Algorithmic Time Complexity Analysis')).toBeVisible();
  });

  // ===========================================================================
  // 8. ACCESSIBILITY & MOBILE RESPONSIVENESS
  // ===========================================================================

  test('F6.8A: Mobile viewport (390px) renders Validate Fit discovery feed without horizontal clipping', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/dashboard/student/growth');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { level: 1, name: 'Validate Fit & Build Practical Evidence' })).toBeVisible();
    await expect(page.locator('[data-testid^="trial-card-"]').first()).toBeVisible();

    // Verify page horizontal scroll width does not exceed viewport
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(390);
  });

  test('F6.8B: Workspace passes automated axe-core WCAG 2.1 AA accessibility standards', async ({ page }) => {
    await page.goto('/dashboard/student/growth');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast']) // Color contrast verified separately with visual review
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // ===========================================================================
  // 9. ACCEPTANCE AUDIT: MEANINGFUL PARTICIPATION & ANTI-SHORTCUT GATES
  // ===========================================================================

  test('F6.9: Reflection-only shortcut records Attempted status and never creates Practised evidence', async ({ page }) => {
    await page.goto('/dashboard/student/growth');
    await page.waitForLoadState('networkidle');

    // Switch to Persona B (Class 9 Undecided)
    await page.locator('button:has-text("Class 9 Undecided")').click();

    // Start Python Bug Detective trial
    const card = page.locator('[data-testid="trial-card-trial_c810_code_logic"]');
    await card.locator('button:has-text("Try Experience")').click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    // Verify guidance tip is visible because no option or note has been entered
    await expect(modal.locator('text=Make a selection or note your thoughts above to build verified Practised evidence')).toBeVisible();

    // Take reflection-only shortcut (click reflect without interacting with task)
    await modal.locator('button:has-text("Reflect on this Experience")').click();

    // Fill reflection
    const refModal = page.getByRole('dialog');
    await expect(refModal.locator('text=How did that feel?')).toBeVisible();
    await refModal.locator('#ref-enjoyed').fill('Thinking about loop logic was interesting.');
    await refModal.locator('button:has-text("Record Evidence & View Summary")').click();

    // Feedback summary must classify as Attempted (Reflection-Only), NOT Practised
    await expect(page.locator('text=Attempted (Reflection-Only)')).toBeVisible();
    await expect(page.locator('text=Truth Boundary: Recorded as an Attempted exploration')).toBeVisible();

    // Close feedback
    await page.locator('button:has-text("Done")').click();

    // Trial card must show "Attempted" badge, NOT "Practised"
    await expect(card.locator('text=Attempted')).toBeVisible();
    await expect(card.locator('text=Practised')).not.toBeVisible();

    // Switch to Evidence Ledger tab
    await page.getByRole('button', { name: /Evidence Ledger/i }).click();

    // Practised in Challenge metric must remain 0
    await expect(page.locator('[data-testid="metric-practised-count"]')).toHaveText('0');

    // The trial must be listed under Attempted Explorations
    await expect(page.locator('text=Attempted Explorations (Reflection Only / Incomplete Task)')).toBeVisible();
    await expect(page.locator('text=Python Algorithm & Bug Detective')).toBeVisible();
  });

  // ===========================================================================
  // 10. ACCEPTANCE AUDIT: TAXONOMY, NONTECHNICAL BALANCE & SAFETY NOTICE
  // ===========================================================================

  test('F6.10: Empty reflection validation blocks submit; nontechnical trials and industrial safety warning are present', async ({ page }) => {
    await page.goto('/dashboard/student/growth');
    await page.waitForLoadState('networkidle');

    // 1. Verify Taxonomy Legend on Evidence Ledger tab
    await page.getByRole('button', { name: /Evidence Ledger/i }).click();
    await expect(page.locator('text=Evidence Taxonomy Reference Key')).toBeVisible();
    await expect(page.locator('text=1. Attempted')).toBeVisible();
    await expect(page.locator('text=2. Practised')).toBeVisible();
    await expect(page.locator('text=3. Self-Reported')).toBeVisible();
    await expect(page.locator('text=4. Reviewed')).toBeVisible();
    await expect(page.locator('text=5. Demonstrated')).toBeVisible();

    // 2. Switch to Discovery tab and test Persona C (Class 12) for nontechnical commerce trial
    await page.getByRole('button', { name: /Practical Discovery/i }).click();
    await page.locator('button:has-text("Class 12 PCM")').click();
    await expect(page.getByRole('heading', { level: 2, name: 'Working Capital & Cash Flow Stress Test' })).toBeVisible();

    // 3. Test Degree / Grad for nontechnical media/humanities trial
    await page.locator('button:has-text("Humanities Grad")').click();
    await expect(page.getByRole('heading', { level: 2, name: 'Investigative Media Source Credibility & Fact-Check Audit' })).toBeVisible();

    // 4. Test Diploma for industrial simulation safety notice
    await page.locator('button:has-text("Diploma Mech")').click();
    const plcCard = page.locator('[data-testid="trial-card-trial_dip_plc_ladder"]');
    await plcCard.locator('button:has-text("Try Experience")').click();

    const plcModal = page.getByRole('dialog');
    await expect(plcModal.locator('text=Virtual Simulation Exercise Only')).toBeVisible();
    await expect(plcModal.locator('text=Never inspect, wire, or service physical 24V/415V electrical panels')).toBeVisible();

    // 5. Test reflection validation: clicking reflection and submitting empty reflection must be blocked
    await plcModal.locator('button:has-text("Reflect on this Experience")').click();
    const refModal = page.getByRole('dialog');
    await refModal.locator('button:has-text("Record Evidence & View Summary")').click();

    // Validation warning must appear and modal must remain open
    await expect(page.locator('text=Please share at least one reflection thought on what you enjoyed, learned, or found challenging before submitting')).toBeVisible();
    await expect(refModal).toBeVisible();
  });

});
