/**
 * NEXT MOVE AI V2 — FLOW 8: PARTNER CHAT STORE
 * 
 * Manages client-side chat messages, session continuity, and exportable logs.
 * Strictly scoped per student profile / persona to prevent cross-profile data leakage.
 */

import { type PartnerMessage, type PartnerConversation, type PartnerContextSnapshot } from "../types";

type StoreListener = () => void;

const BASE_STORAGE_KEY = "nextmove_partner_chat";

export class PartnerChatStore {
  private activeScope: string = "anonymous";
  private conversation: PartnerConversation = {
    conversationId: `conv_${Date.now()}`,
    profileScope: "anonymous",
    createdAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
    messages: [],
  };
  private listeners: Set<StoreListener> = new Set();
  private isHydrated: boolean = false;

  constructor() {
    this.hydrateFromStorage();
  }

  private getStorageKey(): string {
    return `${BASE_STORAGE_KEY}_${this.activeScope}`;
  }

  private hydrateFromStorage(): void {
    if (typeof window === "undefined") return;
    try {
      const stored = sessionStorage.getItem(this.getStorageKey());
      if (stored) {
        const parsed: PartnerConversation = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.messages)) {
          this.conversation = parsed;
        } else {
          this.resetConversationState();
        }
      } else {
        this.resetConversationState();
      }
    } catch {
      this.resetConversationState();
    }
    this.isHydrated = true;
  }

  private resetConversationState(): void {
    this.conversation = {
      conversationId: `conv_${Date.now()}`,
      profileScope: this.activeScope,
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
      messages: [],
    };
  }

  private persistToStorage(): void {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(this.getStorageKey(), JSON.stringify(this.conversation));
    } catch {
      // Storage fallback
    }
  }

  public setProfileScope(scope: string, context?: PartnerContextSnapshot): void {
    const normalized = scope || "anonymous";
    if (this.activeScope === normalized && this.isHydrated) {
      if (this.conversation.messages.length === 0 && context) {
        this.seedInitialGreeting(context);
        this.notify();
      }
      return;
    }
    this.activeScope = normalized;
    this.hydrateFromStorage();

    // If fresh conversation, populate stage-appropriate initial greeting
    if (this.conversation.messages.length === 0 && context) {
      this.seedInitialGreeting(context);
    }

    this.notify();
  }

  private seedInitialGreeting(context: PartnerContextSnapshot): void {
    const name = context.studentProfile.studentName;
    const stage = context.studentProfile.academicStageId;
    const stream = context.studentProfile.streamOrBranch;
    const savedCount = context.savedPathways.length;
    const evidenceCount = context.practisedEvidence.length;

    let greetingText = `Hello! I'm **My Partner**, your personalized AI learning and career companion.`;

    if (stage === "classes-4-7") {
      greetingText = `Hi ${name}! Welcome to your learning space. I'm here to help you explore exciting science, creative ideas, and fun challenges at your own pace. There are no tests or pressure here—just curiosity!`;
    } else if (stage === "classes-8-10") {
      greetingText = `Hi ${name}! As a middle/high school student, you have time to explore different fields before choosing a stream. I can help you think through Science, Commerce, Arts, or Vocational directions and sample hands-on trials.`;
    } else if (stage === "classes-11-12") {
      greetingText = `Welcome ${name}! You're navigating Class 11–12${stream ? ` in **${stream}**` : ""}. I'm here to help you balance board syllabus with entrance options, evaluate alternative degree paths, and take actionable next steps.`;
    } else if (stage === "diploma") {
      greetingText = `Hello ${name}! As a diploma/polytechnic student, your practical skills are your superpower. I can help you weigh lateral entry into B.Tech versus direct technical apprenticeships.`;
    } else if (stage === "degree-engineering") {
      greetingText = `Hello ${name}! Welcome to your degree planning space${stream ? ` for **${stream}**` : ""}. I'm here to help you plan portfolio projects, navigate internship timing, and turn theoretical coursework into demonstrated evidence.`;
    } else if (stage === "final-year-grad") {
      greetingText = `Hello ${name}! Welcome to your career transition and growth workspace. Whether you're targeting competitive fellowships, specialized postgraduate paths, or transitioning domains, we'll ground every step in realistic evidence.`;
    }

    // Add context reflection
    if (savedCount > 0 || evidenceCount > 0) {
      greetingText += `\n\n*Quick snapshot*: You have **${savedCount} saved pathway(s)** and **${evidenceCount} verified trial record(s)** in your workspace.`;
    }

    const greetingMessage: PartnerMessage = {
      id: `msg_welcome_${Date.now()}`,
      conversationId: this.conversation.conversationId,
      role: "partner",
      content: greetingText,
      timestamp: new Date().toISOString(),
      isPrototypeSimulated: true,
      citations: [
        {
          id: "cite_initial_stage",
          sourceType: "profile_fact",
          label: "Active Profile",
          detail: `Stage: ${stage}`,
        },
      ],
    };

    this.conversation.messages = [greetingMessage];
    this.persistToStorage();
  }

  public subscribe(listener: StoreListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error("Error in PartnerChatStore listener", err);
      }
    });
  }

  // --- Public Conversation Actions ---

  public getMessages(): PartnerMessage[] {
    if (!this.isHydrated) this.hydrateFromStorage();
    return this.conversation.messages;
  }

  public getConversationId(): string {
    return this.conversation.conversationId;
  }

  public addMessage(message: PartnerMessage): void {
    if (!this.isHydrated) this.hydrateFromStorage();
    this.conversation.messages.push(message);
    this.conversation.lastActiveAt = new Date().toISOString();
    this.persistToStorage();
    this.notify();
  }

  public clearHistory(context?: PartnerContextSnapshot): void {
    this.resetConversationState();
    if (context) {
      this.seedInitialGreeting(context);
    }
    this.persistToStorage();
    this.notify();
  }

  public exportMarkdown(): string {
    if (!this.isHydrated) this.hydrateFromStorage();
    const lines: string[] = [
      `# Next Move AI — My Partner Conversation Summary`,
      `**Exported Date:** ${new Date().toLocaleDateString()}`,
      `**Scope:** ${this.activeScope}`,
      `\n---\n`,
    ];

    this.conversation.messages.forEach((m) => {
      const sender = m.role === "user" ? "You" : "My Partner";
      lines.push(`### ${sender} (${new Date(m.timestamp).toLocaleTimeString()})`);
      lines.push(m.content);
      if (m.citations && m.citations.length > 0) {
        lines.push(`\n*Grounded In:* ${m.citations.map((c) => `${c.label} (${c.detail})`).join("; ")}`);
      }
      lines.push(`\n---\n`);
    });

    return lines.join("\n");
  }
}

// Global singleton instance
export const partnerChatStore = new PartnerChatStore();
