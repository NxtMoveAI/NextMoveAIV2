/**
 * NEXT MOVE AI V2 — FLOW 8: USE PARTNER CHAT HOOK
 * 
 * Manages conversational lifecycle, reactive synchronization with student profile
 * and cross-feature stores, safe action execution with confirmation gating,
 * and exportable conversation summaries.
 */

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useStudentHome } from "@/features/student-home/hooks/useStudentHome";
import { savedPathwaysStore } from "@/features/explore/services/saved-store";
import { activityEvidenceStore } from "@/features/validate-fit/services/evidence-store";
import { nextMoveStore } from "@/features/build-next-move/services/next-move-store";
import { partnerChatStore } from "../services/partner-chat-store";
import { defaultPartnerService } from "../services/partner-service-adapter";
import { PartnerContextEngine } from "../services/partner-context-engine";
import { getSuggestedPromptsForStage } from "../data/suggested-prompts";
import {
  type PartnerMessage,
  type PartnerContextSnapshot,
  type PartnerActionSuggestion,
  type SuggestedPrompt,
} from "../types";

export function usePartnerChat() {
  const router = useRouter();
  const { viewModel, activePersonaId, hasConfirmedProfile } = useStudentHome();

  // Profile scope key for clean storage isolation
  const profileScope = useMemo(() => {
    if (hasConfirmedProfile && viewModel.profileRevision) {
      return viewModel.profileRevision;
    }
    return activePersonaId || "anonymous";
  }, [hasConfirmedProfile, viewModel.profileRevision, activePersonaId]);

  const [contextSnapshot, setContextSnapshot] = useState<PartnerContextSnapshot>(() =>
    PartnerContextEngine.assembleSnapshot()
  );
  const [messages, setMessages] = useState<PartnerMessage[]>(() => {
    const snap = PartnerContextEngine.assembleSnapshot();
    partnerChatStore.setProfileScope(profileScope, snap);
    return partnerChatStore.getMessages();
  });
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<PartnerActionSuggestion | null>(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Synchronize state when profile scope or stage changes using React's render-time pattern
  const [prevScope, setPrevScope] = useState(profileScope);
  const [prevStage, setPrevStage] = useState(viewModel.academicStageId);

  if (profileScope !== prevScope || viewModel.academicStageId !== prevStage) {
    setPrevScope(profileScope);
    setPrevStage(viewModel.academicStageId);

    // 1. Sync child stores
    savedPathwaysStore.setProfileScope(profileScope, viewModel.academicStageId);
    activityEvidenceStore.setProfileScope(profileScope, viewModel.academicStageId);
    nextMoveStore.setProfileScope(profileScope, viewModel.academicStageId);

    // 2. Refresh context snapshot
    const freshSnapshot = PartnerContextEngine.assembleSnapshot();
    setContextSnapshot(freshSnapshot);

    // 3. Sync partner chat store
    partnerChatStore.setProfileScope(profileScope, freshSnapshot);
    setMessages(partnerChatStore.getMessages());
  }

  // Subscribe to partner chat store updates
  useEffect(() => {
    const unsubscribeChat = partnerChatStore.subscribe(() => {
      setMessages([...partnerChatStore.getMessages()]);
    });
    return () => unsubscribeChat();
  }, []);

  // Subscribe to changes in other stores to keep context drawer updated
  useEffect(() => {
    const handleStoreChange = () => {
      setContextSnapshot(PartnerContextEngine.assembleSnapshot());
    };

    const unsubExplore = savedPathwaysStore.subscribe(handleStoreChange);
    const unsubEvidence = activityEvidenceStore.subscribe(handleStoreChange);
    const unsubNextMove = nextMoveStore.subscribe(handleStoreChange);

    return () => {
      unsubExplore();
      unsubEvidence();
      unsubNextMove();
    };
  }, []);

  // Stage-appropriate prompts
  const suggestedPrompts: SuggestedPrompt[] = useMemo(() => {
    return getSuggestedPromptsForStage(contextSnapshot.studentProfile.academicStageId);
  }, [contextSnapshot.studentProfile.academicStageId]);

  // Send a user message and generate partner response
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isThinking) return;

      setError(null);
      const conversationId = partnerChatStore.getConversationId();

      const userMsg: PartnerMessage = {
        id: `msg_user_${Date.now()}`,
        conversationId,
        role: "user",
        content: trimmed,
        timestamp: new Date().toISOString(),
      };

      partnerChatStore.addMessage(userMsg);
      setIsThinking(true);

      try {
        const response = await defaultPartnerService.generateResponse({
          conversationId,
          userQuery: trimmed,
          context: contextSnapshot,
          history: partnerChatStore.getMessages(),
        });

        partnerChatStore.addMessage(response);
      } catch (err: unknown) {
        console.error("Failed to generate partner response", err);
        setError("Unable to generate response right now. Please try again.");
      } finally {
        setIsThinking(false);
      }
    },
    [isThinking, contextSnapshot]
  );

  // Clear conversation history
  const clearConversation = useCallback(() => {
    partnerChatStore.clearHistory(contextSnapshot);
    setMessages(partnerChatStore.getMessages());
    setActionSuccessMessage("Conversation reset to initial state.");
    setTimeout(() => setActionSuccessMessage(null), 3000);
  }, [contextSnapshot]);

  // Export conversation
  const exportConversation = useCallback(() => {
    const markdown = partnerChatStore.exportMarkdown();
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `NextMove_Partner_${contextSnapshot.studentProfile.academicStageId}_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setActionSuccessMessage("Conversation exported successfully.");
    setTimeout(() => setActionSuccessMessage(null), 3000);
  }, [contextSnapshot]);

  // Handle action click
  const handleActionClick = useCallback(
    (action: PartnerActionSuggestion) => {
      // If requires confirmation, open confirmation modal
      if (action.requiresConfirmation) {
        setPendingAction(action);
        return;
      }

      // If direct navigation, route to target
      if (action.targetHref) {
        router.push(action.targetHref);
      }
    },
    [router]
  );

  // Confirm pending action
  const confirmPendingAction = useCallback(() => {
    if (!pendingAction) return;

    if (pendingAction.type === "add_roadmap_milestone" && pendingAction.payload) {
      const success = nextMoveStore.addMilestoneToActiveRoadmap({
        title: pendingAction.payload.milestoneTitle || "Practical trial milestone",
        estimatedHours: pendingAction.payload.milestoneEstimatedHours || 2,
        description: pendingAction.payload.milestoneVerificationMethod,
      });

      if (success) {
        setActionSuccessMessage(`Added "${pendingAction.payload.milestoneTitle}" to your active roadmap!`);
        // Notify chat with confirmation system receipt
        const receiptMsg: PartnerMessage = {
          id: `msg_receipt_${Date.now()}`,
          conversationId: partnerChatStore.getConversationId(),
          role: "system",
          content: `Milestone Confirmed & Added: **${pendingAction.payload.milestoneTitle}** has been attached to your active growth roadmap. You can view or adjust it anytime in [Build My Next Move](/dashboard/student/projects).`,
          timestamp: new Date().toISOString(),
        };
        partnerChatStore.addMessage(receiptMsg);
      }
    } else if (pendingAction.type === "save_pathway" && pendingAction.payload?.pathwayId) {
      savedPathwaysStore.toggleSaved(pendingAction.payload.pathwayId);
      setActionSuccessMessage("Pathway saved to your Explore collection.");
    }

    setPendingAction(null);
    setTimeout(() => setActionSuccessMessage(null), 4000);
  }, [pendingAction]);

  // Cancel pending action
  const cancelPendingAction = useCallback(() => {
    setPendingAction(null);
  }, []);

  return {
    messages,
    isThinking,
    error,
    contextSnapshot,
    suggestedPrompts,
    sendMessage,
    clearConversation,
    exportConversation,
    handleActionClick,
    pendingAction,
    confirmPendingAction,
    cancelPendingAction,
    actionSuccessMessage,
    activePersonaId,
    hasConfirmedProfile,
  };
}
