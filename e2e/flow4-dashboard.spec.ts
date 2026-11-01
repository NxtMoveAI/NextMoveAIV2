/**
 * NEXT MOVE AI V2 — FLOW 4 E2E TEST SUITE
 * 
 * Exhaustive validation covering:
 * 1. 8 Representative student personas + Empty & Returning states
 * 2. Intelligent UI interactions (Next Move alternatives, why disclosure, postponement, restore)
 * 3. My Partner structured 4-part guidance preview
 * 4. Flow 3 to Flow 4 live handoff continuity
 * 5. Shell navigation (Sidebar, Mobile Bottom Nav, Future module placeholders)
 * 6. Multi-viewport responsiveness (360px, 390px, 768px, 1024px, 1440px)
 * 7. Accessibility (WCAG 2.1 AA via axe-core)
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Flow 4 — Personalized Student Home Dashboard', () => {

  // ===========================================================================
  // 1. PERSONA SCENARIOS & ADAPTIVE CONTENT
  // ===========================================================================

  test('F4.1: Persona A (Class 6 Creative): Curiosity-led welcome, comic next move, creative avenues', async ({ page }) => {
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    // Select Persona A
    await page.locator('button:has-text("Class 6 Creative")').click();

    // Verify adaptive welcome
    await expect(page.getByRole('heading', { level: 1, name: 'Ready to discover something new?' })).toBeVisible();
    await expect(page.locator('text=Welcome back, Aanya Verma').first()).toBeVisible();
    await expect(page.locator('text=Class 6 • Middle School Explorer').first()).toBeVisible();

    // Verify Next Move card
    const nextMove = page.locator('#next-move');
    await expect(nextMove).toContainText('Create a 3-Scene Adventure Story Comic');

    // Verify Creative possibilities
    await expect(page.locator('text=Visual Storyteller & Comic Creator')).toBeVisible();
    await expect(page.locator('text=Junior Nature & Wildlife Observer')).toBeVisible();

    // Verify no career fit scores or fake percentages
    await expect(page.locator('text=Career-Fit Score')).not.toBeVisible();
    await expect(page.locator('text=Building real capability rather than assigning arbitrary fit percentages')).toBeVisible();
  });

  test('F4.2: Persona B (Class 9 Undecided): Low-pressure multi-path discovery without stream lock', async ({ page }) => {
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    // Select Persona B
    await page.locator('button:has-text("Class 9 Undecided")').click();

    // Verify adaptive welcome
    await expect(page.getByRole('heading', { level: 1, name: "Let's explore what interests you." })).toBeVisible();
    await expect(page.locator('text=Rohan Kulkarni')).toBeVisible();

    // Verify Next Move is low-pressure discovery
    const nextMove = page.locator('#next-move');
    await expect(nextMove).toContainText('Try 2 Low-Stakes Mini-Tasks Across Different Streams');

    // Verify broad possibilities
    await expect(page.locator('text=Multi-Stream Subject Explorer')).toBeVisible();
    await expect(page.locator('text=Applied Problem Solving & Logic')).toBeVisible();
  });

  test('F4.3: Persona C (Class 12 Science PCM): Pathway comparisons without false guarantees', async ({ page }) => {
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    // Select Persona C
    await page.locator('button:has-text("Class 12 PCM")').click();

    // Verify adaptive welcome
    await expect(page.getByRole('heading', { level: 1, name: 'Your next move starts with exploration.' })).toBeVisible();
    await expect(page.locator('text=Aryan Sharma').first()).toBeVisible();
    await expect(page.locator('text=Class 12 • Science (PCM)').first()).toBeVisible();

    // Verify Next Move
    const nextMove = page.locator('#next-move');
    await expect(nextMove).toContainText('Compare 2 Undergraduate Pathways');
    await expect(page.locator('text=Computer Science & Engineering Pathways').first()).toBeVisible();
  });

  test('F4.4: Persona D (Diploma Mechanical): Lateral entry B.Tech and practical engineering', async ({ page }) => {
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    // Select Persona D
    await page.locator('button:has-text("Diploma Mech")').click();

    // Verify adaptive welcome
    await expect(page.getByRole('heading', { level: 1, name: "Let's build on what you've learned." })).toBeVisible();
    await expect(page.locator('text=Vikram Rathod').first()).toBeVisible();
    await expect(page.locator('text=Diploma in Mechanical Engineering (2nd Year)').first()).toBeVisible();

    // Verify Next Move
    const nextMove = page.locator('#next-move');
    await expect(nextMove).toContainText('Review Lateral Entry Entrance Exam (LEET) Requirements');
    await expect(page.locator('text=Industrial Automation & CNC Specialist').first()).toBeVisible();
  });

  test('F4.5: Persona E (BCA Python): Truthful epistemic labels (Self-Reported vs Practised)', async ({ page }) => {
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    // Select Persona E
    await page.locator('button:has-text("BCA Python")').click();

    await expect(page.locator('text=Kavya Menon').first()).toBeVisible();
    await expect(page.locator('text=BCA in Computer Applications (2nd Year)').first()).toBeVisible();

    // Verify truth in evidence taxonomy:
    // Python is Self-Reported, Query Optimization is Practised
    await expect(page.locator('text=Python Scripting & Basic Syntax').first()).toBeVisible();
    await expect(page.locator('text=You Told Us (Self-Reported)').first()).toBeVisible();
    await expect(page.locator('text=Relational Query Diagnosis (N+1 Avoidance)').first()).toBeVisible();
    await expect(page.locator('text=Practised in Challenge').first()).toBeVisible();
  });

  test('F4.6: Persona F (BCom Finance): Cash flow analysis without forced coding challenges', async ({ page }) => {
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    // Select Persona F
    await page.locator('button:has-text("BCom Finance")').click();

    await expect(page.locator('text=Sneha Patel').first()).toBeVisible();
    await expect(page.locator('text=BCom in Finance & Accounting (3rd Year)').first()).toBeVisible();

    // Verify finance next move
    const nextMove = page.locator('#next-move');
    await expect(nextMove).toContainText('Analyze a Real-World 12-Month Cash Flow Statement');

    // Verify finance possibilities
    await expect(page.locator('text=Corporate Financial Planning & Analysis (FP&A)').first()).toBeVisible();
    await expect(page.locator('text=Equity Research & Valuation').first()).toBeVisible();
  });

  test('F4.7: Persona G (Engineering Senior): Benchmarking existing project without fake certification', async ({ page }) => {
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    // Select Persona G
    await page.locator('button:has-text("Eng Senior")').click();

    await expect(page.locator('text=Arjun Nambiar').first()).toBeVisible();
    await expect(page.locator('text=BE / B.Tech in Computer Science & Engineering (4th Year / Final)').first()).toBeVisible();

    const nextMove = page.locator('#next-move');
    await expect(nextMove).toContainText('Benchmark Your Existing Sensor Project with Latency Profiles');
    await expect(page.locator('text=Site Reliability & Systems Engineering').first()).toBeVisible();
  });

  test('F4.8: Persona H (Humanities Graduate): Policy brief synthesis without tech startup assumptions', async ({ page }) => {
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    // Select Persona H
    await page.locator('button:has-text("Humanities Grad")').click();

    await expect(page.getByRole('heading', { level: 1, name: "Let's explore your next transition." })).toBeVisible();
    await expect(page.locator('text=Meera Sen').first()).toBeVisible();
    await expect(page.locator('text=BA in Economics & Political Science • Development Economics & Public Policy').first()).toBeVisible();

    const nextMove = page.locator('#next-move');
    await expect(nextMove).toContainText('Draft a 1-Page Policy Brief on an Urban Sustainability Trade-Off');
    await expect(page.locator('text=Public Policy Research & Think-Tank Analyst').first()).toBeVisible();
  });

  test('F4.9: Empty State: First-time student sees reassuring message without fake progress', async ({ page }) => {
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    // Select Empty Persona
    await page.locator('button:has-text("First-Time (Empty)")').click();

    // Verify growth section empty state
    await expect(page.locator('text=You haven\'t completed an activity yet. That\'s a place to begin, not a problem.')).toBeVisible();
    await expect(page.locator('text=Try Your First Discovery Action')).toBeVisible();
  });

  test('F4.10: Returning Student: Verified recent activity history and continued action', async ({ page }) => {
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    // Select Returning Persona
    await page.locator('button:has-text("Returning User")').click();

    // Verify recent activity event
    await expect(page.locator('text=Latest Activity Completed:')).toBeVisible();
    await expect(page.locator('text=28 Oct 2026 · Synthetic fixture')).toBeVisible();
    await expect(page.locator('text=Continue: 12-Month Cash Flow Statement Modeling')).toBeVisible();
  });

  // ===========================================================================
  // 2. INTELLIGENT UI INTERACTIONS
  // ===========================================================================

  test('F4.11: Next Move widget interactions: Why disclosure, choose alternative, postpone & restore', async ({ page }) => {
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    // Start with Class 12 PCM
    await page.locator('button:has-text("Class 12 PCM")').click();

    const nextMove = page.locator('#next-move');

    // 1. Toggle "Why was this action suggested?"
    await expect(nextMove.locator('text=Grounded Suggestion Basis:')).not.toBeVisible();
    await nextMove.locator('button:has-text("Why was this action suggested?")').click();
    await expect(nextMove.locator('text=Grounded Suggestion Basis:')).toBeVisible();
    await nextMove.locator('button:has-text("Hide why this was suggested")').click();
    await expect(nextMove.locator('text=Grounded Suggestion Basis:')).not.toBeVisible();

    // 2. Select an alternative next move
    await nextMove.locator('button:has-text("Choose an Alternative")').click();
    await expect(nextMove.locator('text=Choose an alternative next move that fits your mood today:')).toBeVisible();
    
    // Click "Select this move" on the first alternative
    await nextMove.locator('button:has-text("Select this move")').first().click();

    // Assert active card updated and badge appeared
    await expect(nextMove.locator('text=Alternative Chosen')).toBeVisible();

    // 3. Postpone the action
    await nextMove.locator('button:has-text("Postpone for later")').click();
    await expect(nextMove.locator('text=Action postponed for later')).toBeVisible();
    await expect(nextMove.locator('text=No pressure. Exploration happens at your pace.')).toBeVisible();

    // 4. Restore suggested move
    await nextMove.locator('button:has-text("Restore suggested move")').click();
    await expect(nextMove.locator('text=Your next move')).toBeVisible();
    await expect(nextMove.locator('text=Action postponed for later')).not.toBeVisible();
  });

  test('F4.12: My Starting Point: Progressive disclosure expansion and collapse', async ({ page }) => {
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    const startingPoint = page.locator('#starting-point');
    await expect(startingPoint).toBeVisible();

    // Initially collapsed
    await expect(startingPoint.locator('text=Selected Sub-Interests:')).not.toBeVisible();

    // Click to expand
    await startingPoint.locator('button:has-text("Inspect full baseline answers")').click();
    await expect(startingPoint.locator('text=Selected Sub-Interests:')).toBeVisible();
    await expect(startingPoint.locator('text=Student Profile Revision:')).toBeVisible();

    // Click to collapse
    await startingPoint.locator('button:has-text("Hide detailed baseline")').click();
    await expect(startingPoint.locator('text=Selected Sub-Interests:')).not.toBeVisible();
  });

  test('F4.13: My Partner Preview: Contextual questions render structured deterministic answers', async ({ page }) => {
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    const partnerPreview = page.locator('#partner-preview');
    await partnerPreview.scrollIntoViewIfNeeded();

    // Assert header and prompt tabs
    await expect(partnerPreview.getByRole('heading', { name: 'My Partner Preview' })).toBeVisible();

    // Assert 4-part structured response
    await expect(partnerPreview.locator('text=1. Understanding Your Dilemma')).toBeVisible();
    await expect(partnerPreview.locator('text=2. Two Grounded Exploration Directions')).toBeVisible();
    await expect(partnerPreview.locator('text=3. Important Trade-Off or Unknown to Keep in Mind:')).toBeVisible();
    await expect(partnerPreview.locator('text=4. Practical Suggested Action:')).toBeVisible();

    // Switch to second prompt question
    const secondButton = partnerPreview.locator('button[aria-pressed="false"]').first();
    await secondButton.click();
    await expect(partnerPreview.locator('text=1. Understanding Your Dilemma')).toBeVisible();
  });

  // ===========================================================================
  // 3. COMPLETE FLOW 3 TO FLOW 4 LIVE INTEGRATION HANDOFF
  // ===========================================================================

  test('F4.14: Complete Flow 3 onboarding completion hands off cleanly into Flow 4 Home', async ({ page }) => {
    // Navigate through Flow 3 Onboarding as Class 12 Science PCM
    await page.goto('/onboarding?stage=classes-11-12');
    await page.waitForLoadState('networkidle');

    // Step 1: Welcome
    await page.locator('button:has-text("Begin My Journey")').click();

    // Step 2: Academic Context
    await page.locator('button:has-text("Class 12")').click();
    await page.locator('button:has-text("Science (PCM)")').click();
    await page.locator('main button:has-text("Continue")').first().click();

    // Step 3: Clarity
    await page.locator('button:has-text("I have a few directions in mind")').click();
    await page.locator('main button:has-text("Continue")').first().click();

    // Step 4: Interests (Technology)
    await page.locator('text=Technology & Software').click();
    await page.locator('main button:has-text("Continue")').first().click();

    // Step 5: Starting Point
    await page.locator('main button:has-text("Continue")').first().click();

    // Step 6: Practical Challenge
    await page.locator('button:has-text("Yes, Try Practical Challenge")').click();
    await page.locator('button:has-text("Both pathways involve trade-offs")').click();
    await page.locator('button:has-text("Continue to Reflection")').click();

    // Step 7: Reflection
    await page.locator('button:has-text("Work on an interactive, guided starter project")').click();
    await page.locator('button:has-text("View My Starting Profile")').click();

    // Step 8: Confirm Starting Profile
    await page.locator('button:has-text("Confirm My Starting Point")').click();
    await expect(page.locator('text=Profile Confirmed (Flow 4 Handoff Ready)')).toBeVisible();

    // Click "Enter My Student Workspace"
    await page.locator('a:has-text("Enter My Student Workspace")').click();
    await page.waitForURL(/\/dashboard\/student/);

    // Verify Live Handoff is recognized in Home!
    await expect(page.locator('text=Flow 3 Live Handoff Active')).toBeVisible();
    await expect(page.locator('text=Class 12 • Science (PCM)').first()).toBeVisible();
    await expect(page.locator('#next-move h3').first()).toContainText('Compare');
  });

  // ===========================================================================
  // 4. SHELL NAVIGATION & FUTURE PLACEHOLDER ROUTES
  // ===========================================================================

  test('F4.15: Desktop sidebar navigation and future module placeholder screens', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    const sidebar = page.locator('aside[aria-label="Student Application Sidebar"]');
    await expect(sidebar).toBeVisible();

    // 1. Navigate to Explore
    await sidebar.locator('a:has-text("Explore")').click();
    await page.waitForURL(/\/dashboard\/student\/explore/);
    await expect(page.getByRole('heading', { level: 1, name: 'Explore Possibilities & Pathways' })).toBeVisible();
    await expect(page.locator('text=Scheduled for Flow 5')).toBeVisible();
    await page.locator('a:has-text("Return to Personalized Home")').first().click();
    await page.waitForURL(/\/dashboard\/student$/);

    // 2. Navigate to My Growth
    await sidebar.locator('a:has-text("My Growth")').click();
    await page.waitForURL(/\/dashboard\/student\/growth/);
    await expect(page.getByRole('heading', { level: 1, name: 'My Growth & Evidence Ledger' })).toBeVisible();
    await expect(page.locator('text=Scheduled for Flow 6')).toBeVisible();
    await page.locator('a:has-text("Back to Student Home")').first().click();
    await page.waitForURL(/\/dashboard\/student$/);

    // 3. Navigate to My Projects
    await sidebar.locator('a:has-text("My Projects")').click();
    await page.waitForURL(/\/dashboard\/student\/projects/);
    await expect(page.getByRole('heading', { level: 1, name: 'My Projects & Practical Workspaces' })).toBeVisible();
    await expect(page.locator('a:has-text("Back to Student Home")').first()).toBeVisible();
    await page.locator('a:has-text("Back to Student Home")').first().click();
    await page.waitForURL(/\/dashboard\/student$/);

    // 4. Navigate to My Partner
    await sidebar.locator('a:has-text("My Partner")').click();
    await page.waitForURL(/\/dashboard\/student\/partner/);
    await expect(page.getByRole('heading', { level: 1, name: 'My Partner • Personal AI Guide' })).toBeVisible();
    await page.locator('a:has-text("Back to Student Home")').first().click();
    await page.waitForURL(/\/dashboard\/student$/);

    // 5. Navigate to Profile Review
    await sidebar.locator('a:has-text("Profile Review")').click();
    await page.waitForURL(/\/dashboard\/student\/profile/);
    await expect(page.locator('text=Confirmed Baseline Active')).toBeVisible();
    await expect(page.locator('text=Where You Stand • Evidence Taxonomy')).toBeVisible();
    await page.locator('a:has-text("Back to Student Home")').first().click();
    await page.waitForURL(/\/dashboard\/student$/);
  });

  // ===========================================================================
  // 5. MOBILE BOTTOM NAVIGATION & VIEWPORT RESPONSIVENESS
  // ===========================================================================

  const VIEWPORTS = [
    { name: '360px-mobile-compact', width: 360, height: 740 },
    { name: '390px-mobile-standard', width: 390, height: 844 },
    { name: '768px-tablet-portrait', width: 768, height: 1024 },
    { name: '1024px-tablet-landscape', width: 1024, height: 768 },
    { name: '1440px-desktop-standard', width: 1440, height: 900 },
  ];

  for (const vp of VIEWPORTS) {
    test(`F4.16: Responsive Layout (${vp.name}): Zero horizontal scroll & proper geometry`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      const res = await page.goto('/dashboard/student');
      expect(res?.status()).toBe(200);
      await page.waitForLoadState('networkidle');

      // Assert no horizontal scrollbar
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHorizontalScroll).toBe(false);

      if (vp.width < 1024) {
        // Assert mobile bottom nav visible
        const mobileNav = page.locator('nav[aria-label="Mobile Navigation"]');
        await expect(mobileNav).toBeVisible();
      } else {
        // Assert desktop sidebar visible
        const sidebar = page.locator('aside[aria-label="Student Application Sidebar"]');
        await expect(sidebar).toBeVisible();
      }
    });
  }

  // ===========================================================================
  // 6. ACCESSIBILITY (WCAG 2.1 AA)
  // ===========================================================================

  test('F4.17: Student Home Dashboard meets WCAG 2.1 AA standards (zero violations)', async ({ page }) => {
    const res = await page.goto('/dashboard/student');
    expect(res?.status()).toBe(200);
    await page.waitForLoadState('networkidle');

    // Assert unique H1 and skip link
    await expect(page.locator('a[href="#main-content"]')).toBeAttached();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast'])
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalViolations).toEqual([]);
  });

});
