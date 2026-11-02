/**
 * NEXT MOVE AI V2 — FLOW 8: GROUNDED MOCK RESPONSE GENERATOR
 * 
 * Provides deterministic, pedagogically sound, and context-grounded AI guidance
 * for the prototype frontend without exposing API keys or making unmonitored model calls.
 * 
 * All responses strictly adhere to:
 * - "We don't decide careers; we enable clarity."
 * - No hallucinated career guarantees or fake suitability percentages.
 * - Explicit distinction between profile facts, self-reported interests, and verified evidence.
 */

import { type PartnerContextSnapshot, type PartnerMessage, type EpistemicCitation, type PartnerActionSuggestion } from "../types";

export function generateGroundedResponse(params: {
  conversationId: string;
  userQuery: string;
  context: PartnerContextSnapshot;
}): PartnerMessage {
  const { conversationId, userQuery, context } = params;
  const q = userQuery.toLowerCase().trim();
  const studentName = context.studentProfile.studentName;
  const stage = context.studentProfile.academicStageId;
  const stream = context.studentProfile.streamOrBranch || "your current stream";
  const savedCount = context.savedPathways.length;
  const evidenceCount = context.practisedEvidence.length;
  const roadmap = context.activeRoadmap;

  const citations: EpistemicCitation[] = [];
  const suggestedActions: PartnerActionSuggestion[] = [];

  // Default Profile Fact Citation
  citations.push({
    id: "cite_profile_fact",
    sourceType: "profile_fact",
    label: "Academic Profile",
    detail: `Stage: ${stage}${stream ? ` · Stream: ${stream}` : ""}`,
  });

  // ---------------------------------------------------------------------------
  // INTENT 1: Pathway Comparison
  // ---------------------------------------------------------------------------
  if (
    q.includes("compare") ||
    q.includes("pathway") ||
    q.includes("science vs commerce") ||
    q.includes("software vs data")
  ) {
    if (savedCount > 0) {
      citations.push({
        id: "cite_saved_pathways",
        sourceType: "curated_catalog",
        label: "Saved Pathways (Flow 5)",
        detail: `Student has saved ${savedCount} pathways: ${context.savedPathways.map((p) => p.title).join(", ")}`,
        linkHref: "/dashboard/student/explore",
      });
    }

    const savedSummary =
      savedCount > 0
        ? `You currently have **${savedCount} saved pathways** (${context.savedPathways.map((p) => p.title).join(", ")}).`
        : `You haven't saved specific pathways in Explore yet, but you're exploring options relevant to ${stream}.`;

    suggestedActions.push({
      id: "act_explore_pathways",
      type: "navigate_explore",
      title: "Explore Possibilities Workspace",
      description: "Compare entrance prerequisites, syllabus depth, and day-to-day work across your saved pathways.",
      targetHref: "/dashboard/student/explore",
      requiresConfirmation: false,
    });

    const content = `### Comparing Your Pathway Options

${savedSummary}

When comparing these directions, here is how you can evaluate the key trade-offs without feeling pressured to make a permanent commitment:

1. **Academic Prerequisites & Time Commitment**:
   - Technical & Engineering pathways typically require focused entrance preparation (e.g. JEE, state CETs) alongside 4 years of undergraduate study.
   - Applied Sciences & Data pathways often offer faster entry via BSc/BCA degrees with progressive portfolio building.

2. **Daily Practice vs Theory**:
   - Think about whether you enjoy solving abstract mathematical derivations or constructing functional prototypes and experiments.

3. **Reversibility & Backup Strategies**:
   - Building foundational competence in analytical problem-solving keeps multiple doors open across both sectors.

> **Provenance Notice**: This guidance is synthesized from your verified academic stage (${stage}) and your saved pathways. No career outcome is guaranteed.`;

    return {
      id: `msg_${Date.now()}`,
      conversationId,
      role: "partner",
      content,
      timestamp: new Date().toISOString(),
      citations,
      suggestedActions,
      isPrototypeSimulated: true,
    };
  }

  // ---------------------------------------------------------------------------
  // INTENT 2: Skill Evidence vs Interests (Epistemic Transparency)
  // ---------------------------------------------------------------------------
  if (
    q.includes("evidence") ||
    q.includes("practised") ||
    q.includes("difference") ||
    q.includes("self-reported") ||
    q.includes("skills")
  ) {
    const interestsList = context.selfReportedInterests.join(", ") || "General exploration";
    citations.push({
      id: "cite_interests",
      sourceType: "self_reported_interest",
      label: "Self-Reported Interests",
      detail: `Stated interests: ${interestsList}`,
    });

    if (evidenceCount > 0) {
      citations.push({
        id: "cite_practised",
        sourceType: "practised_evidence",
        label: "Practised Evidence Ledger (Flow 6)",
        detail: `${evidenceCount} trial(s) completed: ${context.practisedEvidence.map((e) => e.trialTitle).join(", ")}`,
        linkHref: "/dashboard/student/growth",
      });
    }

    suggestedActions.push({
      id: "act_growth_trials",
      type: "navigate_growth",
      title: "Open Evidence Ledger (Validate Fit)",
      description: "Review your completed trial work notes and try another interactive challenge.",
      targetHref: "/dashboard/student/growth",
      requiresConfirmation: false,
    });

    const content = `### Your Evidence vs. Self-Reported Interests

Here is the exact distinction between what you have stated and what you have verified in Next Move AI:

1. **Self-Reported Interests (What you enjoy thinking about)**:
   - You noted an interest in: **${interestsList}**.
   - *Status*: Self-Reported. This represents your curiosity and aspirations, but does not measure current technical competence.

2. **Practised Evidence (What you have actively tried)**:
   - You have completed **${evidenceCount} practical trial(s)**: ${
      evidenceCount > 0
        ? context.practisedEvidence.map((e) => `*${e.trialTitle}* (${e.evidenceStatus})`).join(", ")
        : "No interactive trials completed yet."
    }
   - *Status*: ${evidenceCount > 0 ? "Practised / Attempted" : "Unassessed"}. This shows willingness to engage with real scenarios, not a final professional evaluation.

3. **What Remains Unassessed**:
   - We do not assert competitive exam rankings, peer percentile scores, or psychological profiling. Those require verified third-party rubrics.

> **Next Move Principle**: We believe clarity comes from doing, not self-labeling. Trying a 15-minute trial is always more informative than an aptitude quiz!`;

    return {
      id: `msg_${Date.now()}`,
      conversationId,
      role: "partner",
      content,
      timestamp: new Date().toISOString(),
      citations,
      suggestedActions,
      isPrototypeSimulated: true,
    };
  }

  // ---------------------------------------------------------------------------
  // INTENT 3: Next Best Action / Roadmap Planning
  // ---------------------------------------------------------------------------
  if (
    q.includes("next") ||
    q.includes("focus") ||
    q.includes("plan") ||
    q.includes("roadmap") ||
    q.includes("milestone") ||
    q.includes("week")
  ) {
    if (roadmap) {
      citations.push({
        id: "cite_roadmap",
        sourceType: "active_roadmap",
        label: "Active Growth Roadmap (Flow 7)",
        detail: `${roadmap.title} · ${roadmap.completedMilestones}/${roadmap.totalMilestones} completed · ${roadmap.pacing} pacing`,
        linkHref: "/dashboard/student/projects",
      });
    }

    suggestedActions.push({
      id: "act_open_projects",
      type: "navigate_projects",
      title: "View Active Roadmap & Projects",
      description: "Inspect your active milestones and adjust your target pacing.",
      targetHref: "/dashboard/student/projects",
      requiresConfirmation: false,
    });

    // Propose an actionable milestone addition requiring confirmation
    suggestedActions.push({
      id: "act_propose_milestone",
      type: "add_roadmap_milestone",
      title: "Add Milestone: Complete 1 Practical Micro-Trial",
      description: "Add a concrete 2-hour exploration milestone to your active growth roadmap.",
      payload: {
        milestoneTitle: "Complete 1 Practical Scenario Trial in Validate Fit",
        milestoneEstimatedHours: 2,
        milestoneVerificationMethod: "Completed trial reflection in Evidence Ledger",
      },
      requiresConfirmation: true,
    });

    const content = `### Recommended Next Action for You

Based on your current progress in **${roadmap ? roadmap.title : "your active stage"}**:

1. **Immediate Focus for This Week**:
   - ${
     roadmap && roadmap.totalMilestones > roadmap.completedMilestones
       ? `You have **${roadmap.totalMilestones - roadmap.completedMilestones} remaining milestones** in *${roadmap.title}*. Pick the very next milestone and spend 45 minutes on it rather than attempting the entire roadmap at once.`
       : "Take one small, bounded action. Consistency matters more than marathon sessions."
   }

2. **Low-Stakes Validation**:
   - If you're feeling uncertain about a topic, don't wait for exam day. Sample a short challenge in **Validate Fit** to see how the concepts work in practice.

3. **Adaptive Pacing**:
   - Your roadmap is completely non-punitive. If school or personal commitments require time, shift your pacing to *Exploratory* without penalty.

Would you like me to add a quick 2-hour practical trial milestone to your active roadmap? Click the proposal button below to review and confirm.`;

    return {
      id: `msg_${Date.now()}`,
      conversationId,
      role: "partner",
      content,
      timestamp: new Date().toISOString(),
      citations,
      suggestedActions,
      isPrototypeSimulated: true,
    };
  }

  // ---------------------------------------------------------------------------
  // INTENT 4: Exam Stress & Balance (Classes 11–12 & Degree)
  // ---------------------------------------------------------------------------
  if (
    q.includes("stress") ||
    q.includes("balance") ||
    q.includes("board") ||
    q.includes("burnout") ||
    q.includes("overwhelmed")
  ) {
    const content = `### Managing Exam Stress & Maintaining Perspective

Preparing for competitive exams and board evaluations alongside daily schoolwork is demanding. Here are grounded strategies:

1. **Separate Board Conceptual Mastery from Speed Drills**:
   - Board exams evaluate structured written derivations and textbook definitions.
   - Competitive tests evaluate pattern recognition and speed.
   - Don't mix both in the same 2-hour study block—dedicate clear blocks to each.

2. **The "Backup Pathway" Anxiety Relief**:
   - Much of entrance exam anxiety comes from the false assumption that only a single college or rank dictates your entire life.
   - In Next Move AI, explore alternative degree paths (e.g., state institutions, applied research colleges, interdisciplinary institutes) so you know you have robust backup plans.

3. **Take Active 15-Minute Breaks**:
   - When mental fatigue hits, switch away from test papers. Reviewing an interactive simulation or working with your hands refreshes analytical clarity.

> **Remember**: An entrance score is a snapshot of test performance on a single Sunday, not a ceiling on your potential or creativity.`;

    suggestedActions.push({
      id: "act_explore_backups",
      type: "navigate_explore",
      title: "Explore Parallel Pathways",
      description: "Discover flexible alternative degrees and backup educational institutions.",
      targetHref: "/dashboard/student/explore",
      requiresConfirmation: false,
    });

    return {
      id: `msg_${Date.now()}`,
      conversationId,
      role: "partner",
      content,
      timestamp: new Date().toISOString(),
      citations,
      suggestedActions,
      isPrototypeSimulated: true,
    };
  }

  // ---------------------------------------------------------------------------
  // INTENT 5: Project Help & Breakdown
  // ---------------------------------------------------------------------------
  if (
    q.includes("project") ||
    q.includes("break down") ||
    q.includes("code") ||
    q.includes("technical")
  ) {
    const projectCount = context.activeProjects.length;
    if (projectCount > 0) {
      citations.push({
        id: "cite_projects",
        sourceType: "active_project",
        label: "Active Projects (Flow 7)",
        detail: `${projectCount} active project(s): ${context.activeProjects.map((p) => p.title).join(", ")}`,
        linkHref: "/dashboard/student/projects",
      });
    }

    suggestedActions.push({
      id: "act_open_projects_workspace",
      type: "navigate_projects",
      title: "Open Projects Workspace",
      description: "Work on active project steps and upload evidence notes.",
      targetHref: "/dashboard/student/projects",
      requiresConfirmation: false,
    });

    const content = `### Breaking Down Your Project

${
  projectCount > 0
    ? `You currently have **${projectCount} active project(s)** in your workspace (${context.activeProjects.map((p) => p.title).join(", ")}).`
    : "Starting a project is the single best way to convert theoretical knowledge into durable competence."
}

Here is a 4-step framework to make tangible progress:

1. **Step 1 — Define the Smallest Working Demo (Day 1–2)**:
   - Don't build the entire architecture upfront. Build a minimal proof-of-concept that solves one slice of the problem.

2. **Step 2 — Document Failure Points (Day 3–4)**:
   - When something breaks (a circuit, a script, or a financial model), write down why it failed. That note is genuine evidence of problem-solving!

3. **Step 3 — Seek Peer Critique (Day 5)**:
   - Show your prototype to a friend, mentor, or teacher. Ask: *"What is the most confusing part about this?"*

4. **Step 4 — Attach Evidence Artifact**:
   - In Next Move AI, upload your schematic, code snippet, or reflection note to your project card.`;

    return {
      id: `msg_${Date.now()}`,
      conversationId,
      role: "partner",
      content,
      timestamp: new Date().toISOString(),
      citations,
      suggestedActions,
      isPrototypeSimulated: true,
    };
  }

  // ---------------------------------------------------------------------------
  // DEFAULT / GENERAL RESPONSE
  // ---------------------------------------------------------------------------
  suggestedActions.push({
    id: "act_general_explore",
    type: "navigate_explore",
    title: "Browse Pathways in Explore",
    targetHref: "/dashboard/student/explore",
    description: "Discover curated pathways matching your stage.",
    requiresConfirmation: false,
  });

  suggestedActions.push({
    id: "act_general_growth",
    type: "navigate_growth",
    title: "Try a Scenario in Validate Fit",
    targetHref: "/dashboard/student/growth",
    description: "Build evidence through hands-on trials.",
    requiresConfirmation: false,
  });

  const defaultContent = `### Thinking Through This Together, ${studentName}

Thank you for bringing this question to My Partner. Here is how we can think through this systematically:

1. **Grounded In Your Current Stage**:
   - As a **${stage.replace(/-/g, " ")}** student${stream ? ` focusing on **${stream}**` : ""}, your primary goal right now is building strong conceptual foundations while maintaining curiosity about what lies ahead.

2. **Exploring Directions vs. Deciding Forever**:
   - You do not need to lock in a permanent career identity today. Focus instead on gathering high-signal feedback:
     - Read pathway descriptions in **Explore Possibilities**.
     - Test your natural reactions through quick scenario trials in **Validate Fit**.
     - Document your milestones in **Build My Next Move**.

3. **What You Can Ask Me**:
   - *"Compare my saved pathways"*
   - *"What should I focus on this week?"*
   - *"What is the difference between my self-reported interests and my practised evidence?"*
   - *"Help me break down my project into steps"*

What specific direction or question would you like to dig into first?`;

  return {
    id: `msg_${Date.now()}`,
    conversationId,
    role: "partner",
    content: defaultContent,
    timestamp: new Date().toISOString(),
    citations,
    suggestedActions,
    isPrototypeSimulated: true,
  };
}
