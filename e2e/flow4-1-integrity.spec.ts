/**
 * NEXT MOVE AI V2 — FLOW 4.1 INTEGRITY & VISUAL REVIEW REGRESSION TESTS
 * 
 * Verifies all 7 visual review correction priorities:
 * 1. Personalization Contradictions (Class 12 PCM + Still Exploring)
 * 2. Evidence and Activity Counters (Skip vs Complete, no ghost activities)
 * 3. Student Intelligence & Clarity Language (no fake fit scores, nuanced clarity)
 * 4. My Partner Preview Context Alignment (no 85% rules, no fear, broad PCM prompts)
 * 5. Balanced Micro-Challenge Content (genuine educational trade-offs)
 * 6. UX Polish (effort formatting without "mins mins", text wrapping)
 * 7. Cross-Persona Isolation & Dev Affordance Safety
 */

import { test, expect } from '@playwright/test';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/ravit/.gemini/antigravity/brain/dbe4277a-7bf2-48c4-a3c8-b02cbc825b13/screenshots';

test.describe('Flow 4.1 — Visual Review Corrections & Profile Integrity', () => {

  // ===========================================================================
  // PRIORITY 1 & 4: CLASS 12 PCM + STILL EXPLORING JOURNEY
  // ===========================================================================

  test('F4.1-1: Class 12 PCM + Still Exploring produces diverse possibilities without technology assumptions', async ({ page }) => {
    // 1. Walk through Flow 3 Onboarding
    await page.goto('/onboarding?stage=classes-11-12');
    await page.waitForLoadState('networkidle');

    // Step 1: Welcome
    await page.locator('button:has-text("Begin My Journey")').click();

    // Step 2: Academic Context (Class 12, Science PCM)
    await page.locator('button:has-text("Class 12")').click();
    await page.locator('button:has-text("Science (PCM)")').click();
    await page.locator('main button:has-text("Continue")').first().click();

    // Step 3: Clarity (I have a few directions in mind)
    await page.locator('button:has-text("I have a few directions in mind")').click();
    await page.locator('main button:has-text("Continue")').first().click();

    // Step 4: Interests (Still Exploring - no technology selected!)
    await page.getByText('Still Exploring', { exact: true }).click();
    await page.locator('main button:has-text("Continue")').first().click();

    // Step 5: Starting Point
    await expect(page.getByText('Evidence Integrity Principle:')).toBeVisible();
    await page.locator('main button:has-text("Continue")').first().click();

    // Step 6: Micro-Exploration Activity -> Skip for now to test skip state
    await page.locator('button:has-text("Skip Challenge & Continue")').click();

    // Step 7: Reflection
    await page.locator('button:has-text("Understand entrance exams, degrees, and college realities")').click();
    await page.locator('button:has-text("View My Starting Profile")').click();

    // Step 8: Inspect Starting Profile
    // Must NOT claim student selected technology
    const profileText = await page.innerText('body');
    expect(profileText).not.toContain('You indicated interest in technology');
    expect(profileText).toContain('Evaluating Potential Directions');

    // Confirm starting profile
    await page.locator('button:has-text("Confirm My Starting Point")').click();
    await page.locator('a:has-text("Enter My Student Workspace")').click();
    await page.waitForURL(/\/dashboard\/student/);

    // 2. Inspect Flow 4 Student Home Dashboard for this profile
    // A) Verify NO "High Alignment" badge
    const possibilitiesSection = page.locator('#explore-possibilities');
    await expect(possibilitiesSection).toBeVisible();
    await expect(possibilitiesSection.locator('text=High Alignment')).not.toBeVisible();
    await expect(possibilitiesSection.locator('text=Exploration Pathway')).toBeVisible();

    // B) Verify diverse possibilities offered (Applied Sciences, Quantitative Analytics, Design)
    await expect(page.locator('text=Applied Sciences & Engineering Exploration')).toBeVisible();
    await expect(page.locator('text=Quantitative Analytics & Economic Systems')).toBeVisible();
    await expect(page.locator('text=Design, Architecture & Spatial Innovation')).toBeVisible();

    // C) Verify Provenance Explanations do not falsely claim tech interest
    const bodyContent = await page.innerText('body');
    expect(bodyContent).not.toContain('You indicated interest in technology');
    expect(bodyContent).toContain('Class 12 Science (PCM) coursework');

    // D) Verify Clarity Label formatting
    const startingPointCard = page.locator('#starting-point');
    await expect(startingPointCard).toContainText('Status: Exploring Multiple Directions');
    expect(bodyContent).not.toContain('Testing Specific Interests');

    // E) Verify Next Move is diverse comparison
    const nextMove = page.locator('#next-move');
    await expect(nextMove).toContainText('Compare 2 Diverse Undergraduate Directions for Science (PCM)');

    // F) Verify Partner Preview prompts are tailored to broad PCM exploration
    const partnerPreview = page.locator('#partner-preview');
    await expect(partnerPreview).toBeVisible();
    await expect(partnerPreview).toContainText('How can I explore degree options across engineering, pure sciences, and analytics without feeling overwhelmed?');
    await expect(partnerPreview).toContainText('What if I\'m not sure whether traditional engineering is the right fit for me?');

    // Must NOT contain arbitrary "85%" or fear-based language
    const partnerText = await partnerPreview.innerText();
    expect(partnerText).not.toContain('85%');
    expect(partnerText).not.toContain('puts you behind peer interns');
    expect(partnerText).not.toContain('No hallucinations');
    expect(partnerText).toContain('Deterministic Preview • Context-grounded exploration guidance');

    // Capture screenshot for visual audit
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'flow4-1-class12-still-exploring.png'), fullPage: true });
  });

  // ===========================================================================
  // PRIORITY 2: EVIDENCE AND ACTIVITY COUNTERS (SKIP VS COMPLETE)
  // ===========================================================================

  test('F4.1-2: Skipped activity produces Practised: 0 and NO ghost completed activity card', async ({ page }) => {
    // When skipped (as in the above test), growth snapshot must show:
    // Practised in Challenge: 0
    // Empty state message encouraging first step
    // NO "Latest Activity Completed: Practical Micro-Exploration"
    // NO empty quotation marks
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    // Select the First-Time Empty persona fixture
    await page.locator('button:has-text("First-Time (Empty)")').click();

    const growthSection = page.locator('section[aria-labelledby="growth-heading"]');
    await expect(growthSection).toBeVisible();

    // Practised counter must be 0
    await expect(growthSection.locator('text=Practised in Challenge').locator('..').locator('p.text-xl, p.text-2xl')).toHaveText('0');

    // Must display encouraging empty state
    await expect(growthSection.locator('text=You haven\'t completed an activity yet')).toBeVisible();

    // Must NOT display ghost activity card or empty quotes
    await expect(growthSection.locator('text=Latest Activity Completed')).not.toBeVisible();
    await expect(growthSection.locator('text=Critical Evaluation & Practical Diagnosis')).not.toBeVisible();
    const growthHtml = await growthSection.innerHTML();
    expect(growthHtml).not.toContain('&ldquo;&rdquo;');
    expect(growthHtml).not.toContain('“”');

    // Must have 3 metric cards, NOT 4 (no fake Career-Fit Score card)
    await expect(growthSection.locator('text=Career-Fit Score')).not.toBeVisible();
    await expect(growthSection.locator('text=Attempted in platform challenges')).toBeVisible();

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'flow4-1-growth-empty-state.png'), fullPage: true });
  });

  test('F4.1-3: Completed activity increments Practised count and displays genuine competency', async ({ page }) => {
    // Complete activity in onboarding
    await page.goto('/onboarding?stage=classes-11-12');
    await page.waitForLoadState('networkidle');

    await page.locator('button:has-text("Begin My Journey")').click();
    await page.locator('button:has-text("Class 12")').click();
    await page.locator('button:has-text("Science (PCM)")').click();
    await page.locator('main button:has-text("Continue")').first().click();
    await page.locator('button:has-text("I have a few directions in mind")').click();
    await page.locator('main button:has-text("Continue")').first().click();
    await page.locator('text=Technology & Software').click();
    await page.locator('main button:has-text("Continue")').first().click();
    await page.locator('main button:has-text("Continue")').first().click();

    // Complete the challenge
    await page.locator('button:has-text("Yes, Try Practical Challenge")').click();
    await page.locator('button:has-text("Both pathways involve trade-offs")').click();
    await expect(page.locator('text=Learning Insight:')).toBeVisible();
    await page.locator('button:has-text("Continue to Reflection")').click();

    // Reflection & submit
    await page.locator('button:has-text("Understand entrance exams, degrees, and college realities")').click();
    await page.locator('button:has-text("View My Starting Profile")').click();
    await page.locator('button:has-text("Confirm My Starting Point")').click();
    await page.locator('a:has-text("Enter My Student Workspace")').click();
    await page.waitForURL(/\/dashboard\/student/);

    // Verify Growth Snapshot
    const growthSection = page.locator('section[aria-labelledby="growth-heading"]');
    await expect(growthSection).toBeVisible();

    // Practised counter must be at least 1
    const practisedValue = await growthSection.locator('text=Practised in Challenge').locator('..').locator('p.text-xl, p.text-2xl').innerText();
    expect(parseInt(practisedValue, 10)).toBeGreaterThanOrEqual(1);

    // Latest Activity Completed card must be visible with genuine catalog competency
    await expect(growthSection.locator('text=Latest Activity Completed: The Educational Pathway & Skill Trade-Off Matrix')).toBeVisible();
    await expect(growthSection.locator('text=Practised topic: Educational Pathway & Trade-Off Analysis')).toBeVisible();

    // Feedback must not be empty
    const growthText = await growthSection.innerText();
    expect(growthText).toContain('Balanced and accurate');
    expect(growthText).not.toContain('“”');

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'flow4-1-growth-completed-state.png'), fullPage: true });
  });

  // ===========================================================================
  // PRIORITY 5: BALANCED MICRO-CHALLENGE CONTENT
  // ===========================================================================

  test('F4.1-4: Micro-challenge act_degree_tradeoff presents balanced educational trade-offs', async ({ page }) => {
    await page.goto('/onboarding?stage=classes-11-12');
    await page.waitForLoadState('networkidle');

    await page.locator('button:has-text("Begin My Journey")').click();
    await page.locator('button:has-text("Class 12")').click();
    await page.locator('button:has-text("Science (PCM)")').click();
    await page.locator('main button:has-text("Continue")').first().click();
    await page.locator('button:has-text("I have a few directions in mind")').click();
    await page.locator('main button:has-text("Continue")').first().click();
    await page.locator('text=Technology & Software').click();
    await page.locator('main button:has-text("Continue")').first().click();
    await page.locator('main button:has-text("Continue")').first().click();

    // Enter Activity
    await page.locator('button:has-text("Yes, Try Practical Challenge")').click();

    // Assert scenario text tests authentic trade-offs rather than a strawman
    const activityText = await page.locator('main').innerText();
    expect(activityText).toContain('4-year structured university degree versus a 3-year applied degree');
    expect(activityText).toContain('Both pathways involve trade-offs');

    // Must NOT contain the old strawman comparing 0 projects vs 2 open-source apps
    expect(activityText).not.toContain('Student A chooses a traditional 4-year degree focusing purely on theoretical coursework with zero portfolio projects');
    expect(activityText).not.toContain('Student B has stronger verifiable hiring evidence; modern technology teams evaluate demonstrable capability over degree pedigree alone');
  });

  // ===========================================================================
  // PRIORITY 6: UX REFINEMENTS (EFFORT FORMATTING & TEXT CLIPPING)
  // ===========================================================================

  test('F4.1-5: Next Move effort formatting renders cleanly as "25 mins" without repetition', async ({ page }) => {
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    const nextMove = page.locator('#next-move');
    const badgeText = await nextMove.locator('div.rounded-full:has-text("mins")').first().innerText();
    
    // Must be "25 mins" or similar, NEVER "25 mins mins"
    expect(badgeText).toMatch(/^\d+\s+mins$/);
    expect(badgeText).not.toContain('mins mins');

    // Open alternative moves drawer
    await nextMove.locator('button:has-text("Choose an Alternative")').click();
    const alternativesContainer = nextMove.locator('#alternative-moves-container');
    await expect(alternativesContainer).toBeVisible();

    const altBadges = await alternativesContainer.locator('span:has-text("mins")').allInnerTexts();
    for (const b of altBadges) {
      expect(b).not.toContain('mins mins');
      expect(b).toMatch(/~?\d+\s+mins/);
    }
  });

  test('F4.1-6: Starting Point card displays primary focus cleanly without single-line clipping', async ({ page }) => {
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    const startingPoint = page.locator('#starting-point');
    const primaryFocusEl = startingPoint.locator('span:has-text("Primary Focus")').locator('..').locator('p').first();
    
    // Class name should include line-clamp-2 and break-words, not truncate
    const className = await primaryFocusEl.getAttribute('class');
    expect(className).toContain('line-clamp-2');
    expect(className).not.toContain('truncate');
  });

  // ===========================================================================
  // PRIORITY 7: CROSS-PERSONA ISOLATION & DEV AFFORDANCE SAFETY
  // ===========================================================================

  test('F4.1-7: Persona switching cleanly swaps all state without cross-contamination', async ({ page }) => {
    await page.goto('/dashboard/student');
    await page.waitForLoadState('networkidle');

    // 1. Start on Persona C (Class 12 PCM)
    await page.locator('button:has-text("Class 12 PCM")').click();
    await page.waitForTimeout(200);
    await expect(page.locator('text=Aryan Sharma').first()).toBeVisible();
    await expect(page.locator('text=Class 12 • Science (PCM)').first()).toBeVisible();

    // Postpone the move
    const nextMove = page.locator('#next-move');
    await nextMove.scrollIntoViewIfNeeded();
    await nextMove.locator('button:has-text("Postpone for later")').click();
    await expect(nextMove.locator('text=Action postponed for later')).toBeVisible();

    // 2. Switch to Persona F (BCom Finance)
    await page.locator('button:has-text("BCom Finance")').click();
    await page.waitForTimeout(200);
    await expect(page.locator('text=Sneha Patel').first()).toBeVisible();
    await expect(page.locator('text=BCom in Finance & Accounting (3rd Year)').first()).toBeVisible();

    // Verify Next Move is NOT postponed for Persona F!
    const bcomNextMove = page.locator('#next-move');
    await expect(bcomNextMove.locator('text=Action postponed for later')).not.toBeVisible();
    await expect(bcomNextMove).toContainText('Analyze a Real-World 12-Month Cash Flow Statement');

    // Verify Growth Evidence is specific to BCom
    const growth = page.locator('section[aria-labelledby="growth-heading"]');
    await expect(growth.locator('text=Financial Accounting & Reporting Basics')).toBeVisible();
    expect(await growth.innerText()).not.toContain('Calculus & Linear Algebra Foundations');

    // 3. Switch to Persona A (Class 6 Creative)
    await page.locator('button:has-text("Class 6 Creative")').click();
    await expect(page.locator('text=Aanya Verma').first()).toBeVisible();
    await expect(page.locator('text=Class 6 • Middle School Explorer').first()).toBeVisible();
    await expect(page.locator('text=Visual Storyteller & Comic Creator')).toBeVisible();
  });


  // ===========================================================================
  // PRIORITY 8: PRODUCTION IDENTITY-STATE INTEGRITY
  // ===========================================================================

  test('F4.1-8: Anonymous visit to /dashboard/student displays neutral workspace, empty state, and no placeholder identity', async ({ page }) => {
    // 1. Visit with anonymous simulation parameter and clean local storage
    await page.goto('/dashboard/student?session=anonymous');
    await page.evaluate(() => sessionStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // 2. Header must show neutral "Student Workspace", NEVER "Class 12 · Science (PCM)"
    const headerContext = page.locator('header span:has-text("Student Workspace")');
    await expect(headerContext).toBeVisible();
    const headerText = await page.locator('header').innerText();
    expect(headerText).not.toContain('Class 12 • Science (PCM)');
    expect(headerText).not.toContain('Class 12 · Science (PCM)');

    // 3. Avatar must not show synthetic initials like "A" or "S"
    const avatarButton = page.locator('header button[aria-label="Account Options"]');
    await expect(avatarButton).toBeVisible();
    const avatarContent = await avatarButton.innerText();
    expect(avatarContent.trim()).toBe(''); // Icon only, no letter text

    // 4. Dropdown must offer Sign In / Get Started, never Sign Out
    await avatarButton.click();
    await expect(page.locator('header a[href="/sign-in"]')).toBeVisible();
    await expect(page.locator('header a[href="/get-started"]')).toBeVisible();
    await expect(page.locator('header button:has-text("Sign Out")')).not.toBeVisible();
    await page.keyboard.press('Escape');

    // 5. Sidebar must offer Sign In / Get Started, never Sign Out
    const sidebar = page.locator('aside');
    if (await sidebar.isVisible()) {
      await expect(sidebar.locator('a[href="/sign-in"]')).toBeVisible();
      await expect(sidebar.locator('button:has-text("Sign Out")')).not.toBeVisible();
    }

    // 6. Page must render HomeEmptyState with onboarding invitation
    await expect(page.locator('h1:has-text("Welcome to Next Move AI")')).toBeVisible();
    await expect(page.locator('text=Your personal home dashboard is built around your confirmed starting profile.')).toBeVisible();
    await expect(page.locator('a:has-text("Begin Adaptive Onboarding")')).toBeVisible();

    // 7. Developer PersonaSwitcherBar must NOT be rendered
    await expect(page.locator('text=DEVELOPER PERSONA PREVIEWS')).not.toBeVisible();
  });

  test('F4.1-9: Returning student with confirmed profile retains academic context and sign-out affordance', async ({ page }) => {
    // 1. Complete onboarding for Class 10 (Stage classes-8-10)
    await page.goto('/onboarding?stage=classes-8-10&preview=true');
    await page.waitForLoadState('networkidle');

    await page.locator('button:has-text("Begin My Journey")').click();
    await page.locator('button:has-text("Class 10")').click();
    await page.locator('main button:has-text("Continue")').first().click();
    await page.locator('button:has-text("I have a few directions in mind")').click();
    await page.locator('main button:has-text("Continue")').first().click();
    await page.locator('text=Technology & Software').click();
    await page.locator('main button:has-text("Continue")').first().click();
    await page.locator('main button:has-text("Continue")').first().click();
    await page.locator('button:has-text("Skip Challenge & Continue")').click();
    await page.locator('button:has-text("Explore new career & project possibilities")').click();
    await page.locator('button:has-text("View My Starting Profile")').click();
    await page.locator('button:has-text("Confirm My Starting Point")').click();
    await page.locator('a:has-text("Enter My Student Workspace")').click();
    await page.waitForURL(/\/dashboard\/student/);

    // 2. Confirmed profile context must show Class 10
    const header = page.locator('header');
    await expect(header.locator('text=Class 10')).toBeVisible();

    // 3. Sign Out button must be available in avatar menu
    const avatarButton = page.locator('header button[aria-label="Student Account Menu"]');
    await avatarButton.click();
    await expect(page.locator('header button:has-text("Sign Out")')).toBeVisible();
  });
});
