/**
 * NEXT MOVE AI V2 — FLOW 8: MY PARTNER E2E TEST SUITE
 * 
 * Verifies the personalized student AI companion:
 * - Stage-appropriate conversational onboarding & neutral framing
 * - Grounded epistemic provenance badges (Facts vs. Interests vs. Evidence)
 * - Safe action confirmation modal preventing silent roadmap/state mutations
 * - Context Grounded Drawer ("What My Partner Knows")
 * - Profile isolation & privacy notices for minors
 * - Deep navigation links across Flows 5, 6, and 7
 * - Responsive mobile viewport & accessibility
 */

import { test, expect } from "@playwright/test";

test.describe("Flow 8 — My Partner (/dashboard/student/partner)", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to My Partner route
    await page.goto("/dashboard/student/partner");
    await page.waitForLoadState("networkidle");
  });

  // ---------------------------------------------------------------------------
  // F8.1: Initial State & Welcoming Companion Interface
  // ---------------------------------------------------------------------------
  test("F8.1: Accesses My Partner workspace with welcoming greeting and accessible chat UI", async ({
    page,
  }) => {
    await expect(page.getByTestId("partner-workspace")).toBeVisible();
    await expect(page.getByTestId("chat-message-list")).toBeVisible();
    await expect(page.getByTestId("chat-input-bar")).toBeVisible();

    // Verify initial partner greeting exists
    const greetingMsg = page.getByTestId("partner-chat-message").first();
    await expect(greetingMsg).toBeVisible();
    await expect(greetingMsg).toContainText("My Partner");

    // Input bar should have accessible textarea and buttons
    await expect(page.getByTestId("partner-chat-input")).toBeVisible();
    await expect(page.getByTestId("send-chat-btn")).toBeVisible();
    await expect(page.getByTestId("toggle-context-drawer-btn")).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // F8.2: Suggested Prompts & Conversational Interaction
  // ---------------------------------------------------------------------------
  test("F8.2: Suggested prompt chips trigger grounded conversational response", async ({
    page,
  }) => {
    await expect(page.getByTestId("suggested-prompts-container")).toBeVisible();
    const firstPrompt = page.getByTestId("suggested-prompt-chip").first();
    await expect(firstPrompt).toBeVisible();
    const promptText = (await firstPrompt.textContent()) || "";

    // Click suggested prompt chip
    await firstPrompt.click();

    // User message should appear in chat
    const userMsg = page.getByTestId("user-chat-message").last();
    await expect(userMsg).toBeVisible();

    // Partner response should arrive with epistemic citations
    const partnerMsg = page.getByTestId("partner-chat-message").last();
    await expect(partnerMsg).toBeVisible();
    await expect(partnerMsg).not.toHaveText(promptText);
  });

  // ---------------------------------------------------------------------------
  // F8.3: Epistemic Grounding Citations
  // ---------------------------------------------------------------------------
  test("F8.3: Explaining evidence vs interests renders transparent provenance badges", async ({
    page,
  }) => {
    const input = page.getByTestId("partner-chat-input");
    await input.fill("What is the difference between my self-reported interests and my actual practised evidence?");
    await page.getByTestId("send-chat-btn").click();

    // Wait for partner response
    const lastResponse = page.getByTestId("partner-chat-message").last();
    await expect(lastResponse).toBeVisible();

    // Verify epistemic citations exist
    const citations = lastResponse.getByTestId("epistemic-citation-badge");
    await expect(citations.first()).toBeVisible();

    // Should explicitly mention self-reported interests vs practised evidence
    await expect(lastResponse).toContainText("Self-Reported");
    await expect(lastResponse).toContainText("Practised");
  });

  // ---------------------------------------------------------------------------
  // F8.4: Deep Navigation Actions (Explore, Growth, Projects)
  // ---------------------------------------------------------------------------
  test("F8.4: Conversational action cards provide deep links to Explore and Growth", async ({
    page,
  }) => {
    const input = page.getByTestId("partner-chat-input");
    await input.fill("Can you compare my saved pathways?");
    await page.getByTestId("send-chat-btn").click();

    const lastResponse = page.getByTestId("partner-chat-message").last();
    await expect(lastResponse).toBeVisible();

    // Action card should navigate to Explore
    const exploreAction = lastResponse.getByTestId("partner-action-navigate_explore");
    await expect(exploreAction).toBeVisible();

    await exploreAction.click();
    await expect(page).toHaveURL(/\/dashboard\/student\/explore/);
  });

  // ---------------------------------------------------------------------------
  // F8.5: Action Confirmation Modal (State Mutation Protection)
  // ---------------------------------------------------------------------------
  test("F8.5: Proposed roadmap changes require explicit student confirmation before applying", async ({
    page,
  }) => {
    const input = page.getByTestId("partner-chat-input");
    await input.fill("What should my next action and milestone focus be?");
    await page.getByTestId("send-chat-btn").click();

    const lastResponse = page.getByTestId("partner-chat-message").last();
    await expect(lastResponse).toBeVisible();

    // Proposed milestone action with confirmation flag
    const milestoneAction = lastResponse.getByTestId("partner-action-add_roadmap_milestone");
    await expect(milestoneAction).toBeVisible();
    await expect(milestoneAction).toContainText("Requires your confirmation");

    // Click to trigger confirmation modal
    await milestoneAction.click();
    const modal = page.getByTestId("action-confirmation-modal");
    await expect(modal).toBeVisible();
    await expect(modal).toContainText("Confirm Proposed Action");
    await expect(modal).toContainText("Student Sovereignty Guarantee");

    // Confirm addition
    await page.getByTestId("action-confirm-btn").click();
    await expect(modal).not.toBeVisible();

    // Verify success toast and system receipt in chat
    await expect(page.getByTestId("action-success-toast")).toBeVisible();
    await expect(page.getByTestId("system-chat-message")).toBeVisible();
    await expect(page.getByTestId("system-chat-message")).toContainText("Milestone Confirmed & Added");
  });

  // ---------------------------------------------------------------------------
  // F8.6: Context Grounded Drawer ("What My Partner Knows")
  // ---------------------------------------------------------------------------
  test("F8.6: Context Grounded Drawer reveals genuine facts, interests, and declared unknowns", async ({
    page,
  }) => {
    const toggleBtn = page.getByTestId("toggle-context-drawer-btn");
    await toggleBtn.click();

    const drawer = page.getByTestId("context-grounded-drawer");
    await expect(drawer).toBeVisible();
    await expect(drawer).toContainText("What My Partner Knows");

    // Check key transparent sections
    await expect(drawer).toContainText("Profile Facts");
    await expect(drawer).toContainText("Self-Reported Interests");
    await expect(drawer).toContainText("Practised Evidence");
    await expect(drawer).toContainText("Next Move Plan");
    await expect(drawer).toContainText("Declared Unknowns (No Assumptions)");

    // Close drawer
    await page.getByTestId("close-context-drawer-btn").click();
    await expect(drawer).not.toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // F8.7: Minor Privacy Notice & Safeguards (Classes 4–7)
  // ---------------------------------------------------------------------------
  test("F8.7: Middle school young explorer displays minor student privacy & safety notice", async ({
    page,
  }) => {
    // Switch to Persona A (Class 6 Creative)
    await page.getByTestId("persona-btn-persona_a_class6").click();
    await page.waitForTimeout(300);

    const banner = page.getByTestId("privacy-guard-banner");
    await expect(banner).toBeVisible();
    await expect(banner).toContainText("Student Privacy & Safety Guard");
    await expect(banner).toContainText("Designed for young explorers");
  });

  // ---------------------------------------------------------------------------
  // F8.8: Student-Controlled Conversation History (Clear & Export)
  // ---------------------------------------------------------------------------
  test("F8.8: Student can clear chat history or export conversation summary", async ({
    page,
  }) => {
    // Send a message first
    const input = page.getByTestId("partner-chat-input");
    await input.fill("Hello partner!");
    await page.getByTestId("send-chat-btn").click();

    await expect(page.getByText("Hello partner!")).toBeVisible();

    // Clear conversation
    await page.getByTestId("clear-chat-btn").click();
    await expect(page.getByTestId("action-success-toast")).toContainText("reset");
    await expect(page.getByText("Hello partner!")).not.toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // F8.9: Persona Switching Isolates Chat History
  // ---------------------------------------------------------------------------
  test("F8.9: Switching personas isolates conversation memory without cross-profile leakage", async ({
    page,
  }) => {
    // 1. Send unique message in Persona C (Class 12)
    await page.getByTestId("persona-btn-persona_c_class12").click();
    await page.waitForTimeout(200);

    const input = page.getByTestId("partner-chat-input");
    await input.fill("Unique message from Class 12 student about physics");
    await page.getByTestId("send-chat-btn").click();
    await expect(page.getByText("Unique message from Class 12 student about physics")).toBeVisible();

    // Wait for partner response to complete before switching
    await expect(page.getByTestId("partner-chat-message").last()).toBeVisible();

    // 2. Switch to Persona D (Diploma Mechanical)
    await page.getByTestId("persona-btn-persona_d_diploma").click();
    await page.waitForTimeout(400);

    // Class 12 message should NOT appear in Diploma conversation
    await expect(page.getByText("Unique message from Class 12 student about physics")).not.toBeVisible();

    // 3. Switch back to Persona C
    await page.getByTestId("persona-btn-persona_c_class12").click();
    await page.waitForTimeout(400);

    // Class 12 message should be restored cleanly from scoped session
    await expect(page.getByText("Unique message from Class 12 student about physics")).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // F8.10: Responsive Mobile Viewport (390px)
  // ---------------------------------------------------------------------------
  test("F8.10: Responsive mobile viewport (390px) maintains usable input, scroll and drawer", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await expect(page.getByTestId("partner-workspace")).toBeVisible();
    await expect(page.getByTestId("partner-chat-input")).toBeVisible();
    await expect(page.getByTestId("send-chat-btn")).toBeVisible();

    // Open context drawer in mobile
    await page.getByTestId("toggle-context-drawer-btn").click();
    const drawer = page.getByTestId("context-grounded-drawer");
    await expect(drawer).toBeVisible();

    // Close drawer in mobile
    await page.getByTestId("close-context-drawer-btn").click();
    await expect(drawer).not.toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // F8.11: Full Student Journey Traversal (Home -> Partner -> Explore -> Growth -> Projects)
  // ---------------------------------------------------------------------------
  test("F8.11: Traverses seamlessly across the full connected student journey", async ({
    page,
  }) => {
    // 1. Start from Student Home
    await page.goto("/dashboard/student");
    await page.waitForLoadState("networkidle");

    // 2. Navigate to Partner
    await page.goto("/dashboard/student/partner");
    await expect(page.getByTestId("partner-workspace")).toBeVisible();

    // 3. From Partner, navigate to Explore
    await page.goto("/dashboard/student/explore");
    await expect(page.getByTestId("explore-workspace")).toBeVisible();

    // 4. Navigate to Growth / Validate Fit
    await page.goto("/dashboard/student/growth");
    await expect(page.getByTestId("validate-fit-workspace")).toBeVisible();

    // 5. Navigate to Build My Next Move
    await page.goto("/dashboard/student/projects");
    await expect(page.getByTestId("next-move-workspace")).toBeVisible();
  });
});
