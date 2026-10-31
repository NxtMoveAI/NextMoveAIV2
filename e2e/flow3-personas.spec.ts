import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const ARTIFACT_DIR = 'C:/Users/ravit/.gemini/antigravity/brain/dbe4277a-7bf2-48c4-a3c8-b02cbc825b13/screenshots';

test.beforeAll(() => {
  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }
});

test.describe('Flow 3 — Adaptive Student Onboarding Persona Verification', () => {

  // ===========================================================================
  // PERSONA A — Class 6 (Creative, Nature, Storytelling)
  // ===========================================================================
  test('Persona A: Class 6 creative student completes playful, non-prescriptive journey', async ({ page }) => {
    await page.goto('/onboarding?stage=classes-4-7&preview=true');
    await expect(page.locator('h1')).toContainText("Let's discover what you enjoy!");
    await expect(page.locator('text=Curiosity & Playful Discovery')).toBeVisible();

    // Rights grid assertions: no career choice pressure
    await expect(page.locator('text=No premature decisions')).toBeVisible();
    await page.click('button:has-text("Begin My Journey")');

    // Academic context: select Class 6 and Drawing & Art
    await expect(page.locator('text=Which class are you in right now?')).toBeVisible();
    await page.click('button:has-text("Class 6")');
    await page.click('button:has-text("Storytelling & Reading")');
    await page.click('button:has-text("Continue")');

    // Clarity step: younger age-appropriate options
    await expect(page.locator("text=Do you already have something you'd like to try?")).toBeVisible();
    await page.click('button:has-text("Yes! I already have something")');
    await page.click('button:has-text("Continue")');

    // Interest explorer: select Creativity & Media
    await expect(page.locator('text=What subjects or activities make you curious?')).toBeVisible();
    await page.click('text=Creativity & Media');
    await page.click('button:has-text("Continue")');

    // Starting point step
    await expect(page.locator('text=What have you already tried or explored?')).toBeVisible();
    await page.click('button:has-text("Continue")');

    // Activity Prompt: Stage F optional challenge
    await expect(page.locator('text=Try a 5-minute practical challenge?')).toBeVisible();
    await expect(page.locator('text=The Illustrated Adventure Storyboard')).toBeVisible();
    await page.click('button:has-text("Yes, Try Practical Challenge")');

    // Micro-exploration: Storyboard Pacing (act_story_pacing)
    await expect(page.locator('text=The Illustrated Adventure Storyboard')).toBeVisible();
    await expect(page.locator('text=Practical Scenario')).toBeVisible();
    // Select option 1: hook, climax, resolution
    await page.click('button:has-text("1. The Hook (Baby owl wakes up alone")');
    await expect(page.locator('text=Key Learning Takeaway:').or(page.locator('text=Insight Verified:'))).toBeVisible();
    await page.click('button:has-text("Continue to Reflection")');

    // Reflection step
    await expect(page.locator('text=Reflecting on your exploration')).toBeVisible();
    await page.click('button:has-text("Explore new career & project possibilities")');
    await page.click('button:has-text("View My Starting Profile")');

    // Profile Section Assertions (Stage H)
    await expect(page.locator('#sec-academic-title')).toBeVisible();
    await expect(page.locator('text=Class 6 • Primary & Middle School')).toBeVisible();
    await expect(page.locator('#sec-interests-title')).toBeVisible();
    await expect(page.locator('#sec-evidence-title')).toBeVisible();

    // Verify evidence integrity: Storyboard pacing must be marked practised / attempted
    await expect(page.locator('text=practised').first()).toBeVisible();

    // Verify non-employment focused possibilities
    await expect(page.locator('#sec-possibilities-title')).toBeVisible();
    await expect(page.locator('text=Visual Storyteller & Creative Maker')).toBeVisible();

    // Must NOT contain corporate placement or college entrance guarantees
    const pageText = await page.innerText('body');
    expect(pageText).not.toContain('Campus Placements');
    expect(pageText).not.toContain('100% Guaranteed');

    // Take persona screenshot
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'persona-a-class6-profile.png'), fullPage: true });

    // Confirm profile
    await page.click('button:has-text("Confirm My Starting Point")');
    await expect(page.locator('text=Starting Intelligence Profile Confirmed!')).toBeVisible();
    await expect(page.locator('span:has-text("/dashboard/student")')).toBeVisible();
  });

  // ===========================================================================
  // PERSONA B — Class 9 (Still Exploring, Unsure)
  // ===========================================================================
  test('Persona B: Class 9 unsure student supported without pressure or premature stream lock', async ({ page }) => {
    await page.goto('/onboarding?stage=classes-8-10&preview=true');
    await page.click('button:has-text("Begin My Journey")');

    // Academic context: Class 9
    await page.click('button:has-text("Class 9")');
    await page.click('button:has-text("Science (Physics & Chem)")');
    await page.click('button:has-text("Visual Arts & Design")');
    await page.click('button:has-text("Continue")');

    // Clarity: Still exploring / unsure
    await page.click("button:has-text(\"I'm feeling uncertain / exploring broadly\")");
    await page.click('button:has-text("Continue")');

    // Interests: Still Exploring
    await page.click('text=Still Exploring');
    await page.click('button:has-text("Continue")');

    // Starting point: proceed with defaults
    await page.click('button:has-text("Continue")');

    // Activity Prompt: Stream comparison challenge
    await expect(page.locator('text=The 10th-to-11th Stream Exploration Challenge')).toBeVisible();
    await page.click('button:has-text("Yes, Try Practical Challenge")');

    // Micro-exploration
    await expect(page.locator('text=The 10th-to-11th Stream Exploration Challenge')).toBeVisible();
    await page.click('button:has-text("Both paths allow computing and tech careers")');
    await page.click('button:has-text("Continue to Reflection")');

    // Reflection
    await page.click("button:has-text(\"I'm still figuring it out — show me gentle starting options\")");
    await page.click('button:has-text("View My Starting Profile")');

    // Profile verification
    await expect(page.locator('text=Class 9 • Secondary School')).toBeVisible();
    await expect(page.locator('#sec-interests-title')).toBeVisible();
    await expect(page.locator('text=Still Exploring').first()).toBeVisible();
    // Verify What Remains Unknown is clearly disclosed
    await expect(page.locator('text=What Remains Unknown:').first()).toBeVisible();

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'persona-b-class9-profile.png'), fullPage: true });

    // Confirm profile
    await page.click('button:has-text("Confirm My Starting Point")');
    await expect(page.locator('text=Starting Intelligence Profile Confirmed!')).toBeVisible();
  });

  // ===========================================================================
  // PERSONA C — Class 12 (Science PCM exploring college pathways)
  // ===========================================================================
  test('Persona C: Class 12 Science PCM receives multi-path educational options without false guarantees', async ({ page }) => {
    await page.goto('/onboarding?stage=classes-11-12&preview=true');
    await page.click('button:has-text("Begin My Journey")');

    // Academic context: Class 12 Science PCM
    await page.click('button:has-text("Class 12")');
    await page.click('button:has-text("Science (PCM)")');
    await page.click('button:has-text("Continue")');

    // Clarity
    await page.click('button:has-text("I have a few directions in mind")');
    await page.click('button:has-text("Continue")');

    // Interests: Technology & Software
    await page.click('text=Technology & Software');
    await page.click('button:has-text("Continue")');

    // Starting point
    await page.click('button:has-text("Continue")');

    // Activity prompt: Educational Trade-off
    await expect(page.locator('text=The Educational Pathway & Skill Trade-Off Matrix')).toBeVisible();
    await page.click('button:has-text("Yes, Try Practical Challenge")');

    // Answer challenge
    await page.click('button:has-text("Student B has stronger verifiable hiring evidence")');
    await page.click('button:has-text("Continue to Reflection")');

    // Reflection
    await page.click('button:has-text("Understand entrance exams, degrees, and college realities")');
    await page.click('button:has-text("View My Starting Profile")');

    // Assertions
    await expect(page.locator('text=Class 12 • Science (PCM)')).toBeVisible();
    await expect(page.locator('#sec-possibilities-title')).toBeVisible();
    const bodyText = await page.innerText('body');
    expect(bodyText).not.toContain('Guaranteed Seat');
    expect(bodyText).not.toContain('100% Cutoff Clearance');

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'persona-c-class12-profile.png'), fullPage: true });
    await page.click('button:has-text("Confirm My Starting Point")');
    await expect(page.locator('text=Starting Intelligence Profile Confirmed!')).toBeVisible();
  });

  // ===========================================================================
  // PERSONA D — Diploma (Mechanical Engineering student)
  // ===========================================================================
  test('Persona D: Diploma Mechanical student receives branch-relevant manufacturing task and lateral pathways', async ({ page }) => {
    await page.goto('/onboarding?stage=diploma&preview=true');
    await page.click('button:has-text("Begin My Journey")');

    // Academic context: select Mechanical Engineering
    await page.selectOption('#diploma-branch', 'Mechanical Engineering');
    await page.click('button:has-text("2nd Year")');
    await page.click('button:has-text("Lateral Entry (B.Tech / B.E.)")');
    await page.click('button:has-text("Continue")');

    // Clarity
    await page.click('button:has-text("I have a few directions in mind")');
    await page.click('button:has-text("Continue")');

    // Interests: Technology & Software
    await page.click('text=Technology & Software');
    await page.click('button:has-text("Continue")');

    // Starting point: shows mechanical CAD / workshop skills
    await expect(page.locator('text=CAD / Technical Drafting (AutoCAD/SolidWorks)')).toBeVisible();
    await page.click('button:has-text("Continue")');

    // Activity Prompt: Must show CNC Spindle Bearing, NOT software backend!
    await expect(page.locator('text=Mechanical Diagnostic: CNC Spindle Bearing Thermal Spike')).toBeVisible();
    await page.click('button:has-text("Yes, Try Practical Challenge")');

    // Practical scenario
    await expect(page.locator('text=Mechanical Diagnostic: CNC Spindle Bearing Thermal Spike')).toBeVisible();
    await page.click('button:has-text("Over-lubrication causing grease churning friction")');
    await page.click('button:has-text("Continue to Reflection")');

    // Reflection
    await page.click('button:has-text("Build concrete skills and practical portfolio projects")');
    await page.click('button:has-text("View My Starting Profile")');

    // Profile verification
    await expect(page.locator('text=Mechanical Engineering (2nd Year) • Technical Diploma')).toBeVisible();
    await expect(page.locator('text=Lateral-Entry B.Tech')).toBeVisible();

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'persona-d-diploma-profile.png'), fullPage: true });
    await page.click('button:has-text("Confirm My Starting Point")');
    await expect(page.locator('text=Starting Intelligence Profile Confirmed!')).toBeVisible();
  });

  // ===========================================================================
  // PERSONA E — BCA (Self-reported Python familiarity)
  // ===========================================================================
  test('Persona E: BCA student with self-reported Python is recorded with epistemic integrity', async ({ page }) => {
    await page.goto('/onboarding?stage=degree-engineering&preview=true');
    await page.click('button:has-text("Begin My Journey")');

    // Academic context: Degree = BCA
    await page.click('button:has-text("BCA")');
    await page.selectOption('#degree-branch', 'Computer Science & Engineering');
    await page.click('button:has-text("2nd Year")');
    await page.click('button:has-text("Continue")');

    // Clarity
    await page.click('button:has-text("I have a few directions in mind")');
    await page.click('button:has-text("Continue")');

    // Interests: Technology & Software
    await page.click('text=Technology & Software');
    await page.click('button:has-text("Continue")');

    // Starting Point: Mark Python / Data Analytics as "I've tried it once or twice"
    await expect(page.locator('text=Data Analytics & SQL / Python')).toBeVisible();
    await page.locator('button:has-text("I\'ve tried it once or twice")').first().click();
    await page.click('button:has-text("Continue")');

    // Activity Prompt: Database Query Bottleneck
    await expect(page.locator('text=Engineering Inspection: The N+1 Database Query Bottleneck')).toBeVisible();
    await page.click('button:has-text("Yes, Try Practical Challenge")');

    // Choose query batching option
    await page.click('button:has-text("Classic N+1 query problem")');
    await page.click('button:has-text("Continue to Reflection")');

    // Reflection
    await page.click('button:has-text("Work on an interactive, guided starter project")');
    await page.click('button:has-text("View My Starting Profile")');

    // Assert Section 1 & Section 3
    await expect(page.locator('text=BCA in Computer Science & Engineering (2nd Year)')).toBeVisible();
    // Must be labeled self-reported, NOT verified mastery
    await expect(page.locator('text=Self-Reported Familiarity').first()).toBeVisible();
    const pageText = await page.innerText('body');
    expect(pageText).not.toContain('Verified Python Master');
    expect(pageText).not.toContain('100% Python Fit');

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'persona-e-bca-profile.png'), fullPage: true });
    await page.click('button:has-text("Confirm My Starting Point")');
    await expect(page.locator('text=Starting Intelligence Profile Confirmed!')).toBeVisible();
  });

  // ===========================================================================
  // PERSONA F — BCom (Finance & Accounting)
  // ===========================================================================
  test('Persona F: BCom student receives cash flow challenge without forced coding tasks', async ({ page }) => {
    await page.goto('/onboarding?stage=degree-engineering&preview=true');
    await page.click('button:has-text("Begin My Journey")');

    // Academic context: BCom + Finance & Accounting
    await page.click('button:has-text("BCom")');
    await page.selectOption('#degree-branch', 'Finance & Accounting');
    await page.click('button:has-text("3rd Year")');
    await page.click('button:has-text("Continue")');

    // Clarity
    await page.click('button:has-text("I have a few directions in mind")');
    await page.click('button:has-text("Continue")');

    // Interests: Business & Ventures
    await page.click('text=Business & Ventures');
    await page.click('button:has-text("Continue")');

    // Starting Point: Should show Financial Accounting & Spreadsheet modeling
    await expect(page.locator('text=Financial Accounting & Reporting Basics')).toBeVisible();
    await page.click('button:has-text("Continue")');

    // Activity Prompt: MUST show Financial Insight: Cash Flow, NOT SQL N+1!
    await expect(page.locator('text=Financial Insight: Cash Flow vs. Accounting Profit')).toBeVisible();
    const promptText = await page.innerText('body');
    expect(promptText).not.toContain('N+1 Database Query Bottleneck');

    await page.click('button:has-text("Yes, Try Practical Challenge")');

    // Practical scenario
    await page.click('button:has-text("Revenue was booked on accrual credit with a 60-day customer payment cycle")');
    await page.click('button:has-text("Continue to Reflection")');

    // Reflection
    await page.click('button:has-text("Explore new career & project possibilities")');
    await page.click('button:has-text("View My Starting Profile")');

    // Profile verification
    await expect(page.locator('text=BCom in Finance & Accounting (3rd Year)')).toBeVisible();
    await expect(page.locator('text=Financial Analytics, Modeling')).toBeVisible();

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'persona-f-bcom-profile.png'), fullPage: true });
    await page.click('button:has-text("Confirm My Starting Point")');
    await expect(page.locator('text=Starting Intelligence Profile Confirmed!')).toBeVisible();
  });

  // ===========================================================================
  // PERSONA G — Engineering (Student with previous project experience)
  // ===========================================================================
  test('Persona G: Engineering student reports prior project without fabricated test certification', async ({ page }) => {
    await page.goto('/onboarding?stage=degree-engineering&preview=true');
    await page.click('button:has-text("Begin My Journey")');

    // Academic context: BE/B.Tech CS
    await page.click('button:has-text("BE / B.Tech")');
    await page.selectOption('#degree-branch', 'Computer Science & Engineering');
    await page.click('button:has-text("4th Year / Final")');
    await page.click('button:has-text("Continue")');

    // Clarity: Very clear
    await page.click('button:has-text("I have a clear goal in sight")');
    await page.click('button:has-text("Continue")');

    // Interests: Technology & Software
    await page.click('text=Technology & Software');
    await page.click('button:has-text("Continue")');

    // Starting point: Mark project created for Data Structures
    await page.locator('button:has-text("I\'ve created a real project with it")').first().click();
    await page.click('button:has-text("Continue")');

    // Activity prompt
    await page.click('button:has-text("Yes, Try Practical Challenge")');

    // Solve N+1 challenge
    await page.click('button:has-text("Classic N+1 query problem")');
    await page.click('button:has-text("Continue to Reflection")');

    // Reflection
    await page.click('button:has-text("Build concrete skills and practical portfolio projects")');
    await page.click('button:has-text("View My Starting Profile")');

    // Assert Section 3: Evidence is grounded, not certified without code review
    await expect(page.locator('text=BE / B.Tech in Computer Science & Engineering (4th Year / Final)')).toBeVisible();
    await expect(page.locator('text=practised').first()).toBeVisible();

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'persona-g-engineering-profile.png'), fullPage: true });
    await page.click('button:has-text("Confirm My Starting Point")');
    await expect(page.locator('text=Starting Intelligence Profile Confirmed!')).toBeVisible();
  });

  // ===========================================================================
  // PERSONA H — Final Year / Graduate (Humanities/Policy background)
  // ===========================================================================
  test('Persona H: Final Year Humanities graduate receives policy synthesis without tech startup assumptions', async ({ page }) => {
    await page.goto('/onboarding?stage=final-year-grad&preview=true');
    await page.click('button:has-text("Begin My Journey")');

    // Academic context: BA Economics & Policy
    const degreeInput = page.locator('input[placeholder*="B.Tech Computer Science"]');
    await degreeInput.fill('B.A. Public Policy & Economics');
    await page.click('button:has-text("Preparing for Master\'s / Higher Ed")');
    await page.click('button:has-text("Continue")');

    // Clarity: Exploring options
    await page.click('button:has-text("I have a few directions in mind")');
    await page.click('button:has-text("Continue")');

    // Interests: Social Impact & People
    await page.click('text=Social Impact & People');
    await page.click('button:has-text("Continue")');

    // Starting Point
    await page.click('button:has-text("Continue")');

    // Activity Prompt: MUST show Evidence-Based Policy Synthesis!
    await expect(page.locator('text=Strategic Evaluation: Evidence-Based Policy Synthesis')).toBeVisible();
    const promptText = await page.innerText('body');
    expect(promptText).not.toContain('Modular Monolith');

    await page.click('button:has-text("Yes, Try Practical Challenge")');

    // Complete policy activity
    await page.click('button:has-text("Prioritize structured teacher coaching")');
    await page.click('button:has-text("Continue to Reflection")');

    // Reflection
    await page.click('button:has-text("Compare trade-offs between two different paths")');
    await page.click('button:has-text("View My Starting Profile")');

    // Profile verification: Humanities context preserved
    await expect(page.locator('text=B.A. Public Policy & Economics')).toBeVisible();
    await expect(page.locator('text=Strategic Corporate & Analytical Roles')).toBeVisible();

    // Flow 4 handoff ready
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'persona-h-grad-profile.png'), fullPage: true });
    await page.click('button:has-text("Confirm My Starting Point")');
    await expect(page.locator('text=Starting Intelligence Profile Confirmed!')).toBeVisible();
  });

});
