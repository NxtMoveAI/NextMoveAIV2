/**
 * NEXT MOVE AI V2 — FINAL FRONTEND COMPLETION SUITE
 * 
 * Verifies newly implemented functionality:
 * - Student Settings (/dashboard/student/settings)
 * - Parent Dashboard (/dashboard/parent)
 * - Global 404 Error Recovery (/_not-found)
 * - Safe client-side authorization boundaries & minor protections
 */

import { test, expect } from "@playwright/test";

test.describe("Final Frontend Completion & Integrity Suite", () => {
  // ---------------------------------------------------------------------------
  // 1. STUDENT SETTINGS TESTS
  // ---------------------------------------------------------------------------
  test("SET.1: Student Settings loads profile overview and active stage context", async ({ page }) => {
    await page.goto("http://localhost:3000/dashboard/student/settings");
    await expect(page.getByRole("heading", { name: "Account & Learning Settings" })).toBeVisible();
    await expect(page.getByText("Student Starting Profile")).toBeVisible();
    await expect(page.getByText("View Baseline Details")).toBeVisible();
  });

  test("SET.2: Flexible Learning Pace selection updates goal rhythm", async ({ page }) => {
    await page.goto("http://localhost:3000/dashboard/student/settings");
    
    // Select Builder pace
    const builderButton = page.getByRole("button", { name: /Builder/i });
    await expect(builderButton).toBeVisible();
    await builderButton.click();
    await expect(builderButton).toContainText("Active Goal Preference");

    // Select Deep Dive pace
    const deepDiveButton = page.getByRole("button", { name: /Deep Dive/i });
    await deepDiveButton.click();
    await expect(deepDiveButton).toContainText("Active Goal Preference");
  });

  test("SET.3: Minor student cannot unilaterally modify guardian consent from student client", async ({ page }) => {
    await page.goto("http://localhost:3000/dashboard/student/settings");
    
    const requestChangeBtn = page.getByRole("button", { name: /Request Consent Update/i });
    if (await requestChangeBtn.isVisible()) {
      await requestChangeBtn.click();
      await expect(page.getByText("Guardian Authorization Required")).toBeVisible();
      await expect(page.getByText("In accordance with student privacy protection guidelines")).toBeVisible();
      await page.getByRole("button", { name: "Understood" }).click();
      await expect(page.getByText("Guardian Authorization Required")).not.toBeVisible();
    }
  });

  test("SET.4: Prototype profile JSON export downloads data with DPDP disclosure", async ({ page }) => {
    await page.goto("http://localhost:3000/dashboard/student/settings");
    
    // Listen for download event
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /Download Prototype Profile \(\.JSON\)/i }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toContain("nextmove-prototype-profile");
    await expect(page.getByText("Prototype profile downloaded successfully as JSON file!")).toBeVisible();
    await expect(page.getByText("Prototype Export Disclosure (DPDP Notice)")).toBeVisible();
  });

  test("SET.5: Backend-dependent security controls trigger integration notice", async ({ page }) => {
    await page.goto("http://localhost:3000/dashboard/student/settings");
    
    await page.getByRole("button", { name: /Manage Credentials \(Backend Flow\)/i }).click();
    await expect(page.getByText("Backend Authentication Notice")).toBeVisible();
    await expect(page.getByText("Backend Integration Scope (Havyas)")).toBeVisible();
    await page.getByRole("button", { name: "Close Notice" }).click();
    await expect(page.getByText("Backend Authentication Notice")).not.toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // 2. PARENT DASHBOARD TESTS
  // ---------------------------------------------------------------------------
  test("PAR.1: Parent Dashboard renders linked student overview without false aptitude scores", async ({ page }) => {
    await page.goto("http://localhost:3000/dashboard/parent");
    
    await expect(page.getByText("Guardian Observation Portal")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Welcome, Sunita Sharma/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Aarav Sharma" })).toBeVisible();
    
    // Assert no fake aptitude scores exist
    const textContent = await page.textContent("body");
    expect(textContent).not.toContain("Aptitude Score:");
    expect(textContent).not.toContain("Career Fit: 9");
  });

  test("PAR.2: Guardian can switch between authorized linked children cleanly", async ({ page }) => {
    await page.goto("http://localhost:3000/dashboard/parent");
    
    // Switch to Ananya
    await page.getByRole("button", { name: /Ananya Sharma/i }).click();
    await expect(page).toHaveURL(/student=student_ananya_6/);
    await expect(page.getByRole("heading", { name: "Ananya Sharma" })).toBeVisible();
    await expect(page.getByText("Class 6 • Middle School")).toBeVisible();

    // Switch back to Aarav
    await page.getByRole("button", { name: /Aarav Sharma/i }).click();
    await expect(page).toHaveURL(/student=student_aarav_9/);
    await expect(page.getByRole("heading", { name: "Aarav Sharma" })).toBeVisible();
    await expect(page.getByText("Class 9 • Secondary School")).toBeVisible();
  });

  test("PAR.3: Student Confidentiality Principle clearly guarantees private My Partner chats", async ({ page }) => {
    await page.goto("http://localhost:3000/dashboard/parent");
    
    await expect(page.getByText("Student Confidentiality & Safe Agency Principle")).toBeVisible();
    await expect(page.getByText(/conversations between .* and My Partner AI companion are private/i)).toBeVisible();
  });

  test("PAR.4: Unauthorized student ID query parameter is rejected by access guard", async ({ page }) => {
    await page.goto("http://localhost:3000/dashboard/parent?student=unknown_unauthorized_id");
    
    await expect(page.getByText("Access Restricted")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Unauthorized Student Profile" })).toBeVisible();
    
    // Recovery button returns to authorized student
    await page.getByRole("button", { name: "Return to Authorized Student" }).click();
    await expect(page.getByRole("heading", { name: "Aarav Sharma" })).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // 3. GLOBAL ERROR & NOT FOUND RECOVERY
  // ---------------------------------------------------------------------------
  test("ERR.1: Non-existent route renders branded 404 page with recovery navigation", async ({ page }) => {
    await page.goto("http://localhost:3000/non-existent-career-pathway-route-404");
    
    await expect(page.getByText("Error 404 • Pathway Not Found")).toBeVisible();
    await expect(page.getByRole("heading", { name: "We couldn't find that page" })).toBeVisible();
    
    const returnHomeBtn = page.getByRole("link", { name: "Return to Student Home" });
    await expect(returnHomeBtn).toBeVisible();
    await returnHomeBtn.click();
    await expect(page).toHaveURL(/dashboard\/student/);
  });
});
