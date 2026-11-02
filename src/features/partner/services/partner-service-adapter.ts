/**
 * NEXT MOVE AI V2 — FLOW 8: PARTNER SERVICE ADAPTER
 * 
 * Clean abstraction layer separating the frontend chat interface from backend AI execution.
 * Includes MockPartnerAdapter for frontend prototype operation.
 * Havyas can easily connect the real LLM/RAG backend by implementing PartnerServiceAdapter.
 */

import {
  type PartnerServiceAdapter,
  type PartnerMessage,
  type PartnerContextSnapshot,
} from "../types";
import { generateGroundedResponse } from "../data/mock-responses";

export class MockPartnerAdapter implements PartnerServiceAdapter {
  private simulatedLatencyMs: number;

  constructor(simulatedLatencyMs: number = 400) {
    this.simulatedLatencyMs = simulatedLatencyMs;
  }

  public async generateResponse(params: {
    conversationId: string;
    userQuery: string;
    context: PartnerContextSnapshot;
    history: PartnerMessage[];
  }): Promise<PartnerMessage> {
    // Artificial latency for conversational pacing (skipped if running in test environment)
    const isTest =
      typeof window !== "undefined" &&
      (Boolean(navigator.webdriver) ||
        Boolean((window as unknown as { __playwright?: boolean }).__playwright));

    if (this.simulatedLatencyMs > 0 && !isTest) {
      await new Promise((resolve) => setTimeout(resolve, this.simulatedLatencyMs));
    }

    return generateGroundedResponse({
      conversationId: params.conversationId,
      userQuery: params.userQuery,
      context: params.context,
    });
  }
}

// Default singleton instance of the mock service adapter
export const defaultPartnerService: PartnerServiceAdapter = new MockPartnerAdapter();
