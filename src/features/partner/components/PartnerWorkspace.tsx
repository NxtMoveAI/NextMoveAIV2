/**
 * NEXT MOVE AI V2 — FLOW 8: PARTNER WORKSPACE
 * 
 * Core conversational interface for My Partner.
 * Bridges student intelligence, interactive guidance, transparent provenance inspection,
 * and guarded state mutations into one cohesive, accessible workspace.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, Sparkles } from "lucide-react";
import { usePartnerChat } from "../hooks/usePartnerChat";
import { PrivacyGuardBanner } from "./PrivacyGuardBanner";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInputBar } from "./ChatInputBar";
import { ContextGroundedDrawer } from "./ContextGroundedDrawer";
import { ActionConfirmationModal } from "./ActionConfirmationModal";
import { PartnerPersonaSwitcher } from "./PartnerPersonaSwitcher";

export function PartnerWorkspace() {
  const {
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
    hasConfirmedProfile,
  } = usePartnerChat();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const stage = contextSnapshot.studentProfile.academicStageId;

  return (
    <div
      data-testid="partner-workspace"
      className="flex flex-col h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] bg-[#F8F9FC] relative overflow-hidden"
    >
      {/* 1. Development Persona Switcher */}
      <PartnerPersonaSwitcher />

      {/* 2. Top Header Bar */}
      <div className="bg-white border-b border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/student"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#64748B] hover:text-[#171A2B] transition-colors p-1 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Student Home</span>
          </Link>
          <div className="h-4 w-px bg-[#E2E8F0]" />
          <h1 className="text-sm font-bold text-[#171A2B] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#6757F5]" />
            <span>My Partner • Personal AI Guide</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EEF2FF] text-[#6757F5] border border-[#C7D2FE]">
            Flow 8 • AI Companion
          </span>
        </div>
      </div>

      {/* 3. Privacy & Epistemic Safeguards Banner */}
      <PrivacyGuardBanner
        stageId={stage}
        isConfirmedProfile={hasConfirmedProfile}
      />

      {/* 3. Success / Notice Toast */}
      {actionSuccessMessage && (
        <div
          data-testid="action-success-toast"
          className="mx-4 mt-2 px-4 py-2.5 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D] text-xs font-semibold flex items-center gap-2 shadow-sm animate-fade-in"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#22C55E]" />
          <span>{actionSuccessMessage}</span>
        </div>
      )}

      {/* 4. Error Toast */}
      {error && (
        <div
          data-testid="partner-error-toast"
          className="mx-4 mt-2 px-4 py-2.5 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] text-[#991B1B] text-xs font-semibold shadow-sm animate-fade-in"
        >
          <span>{error}</span>
        </div>
      )}

      {/* 5. Main Conversation Container */}
      <div className="flex-1 flex flex-col min-h-0 relative max-w-5xl w-full mx-auto">
        {/* Message Stream */}
        <ChatMessageList
          messages={messages}
          isThinking={isThinking}
          onActionClick={handleActionClick}
        />

        {/* Input & Toolbar */}
        <ChatInputBar
          onSendMessage={sendMessage}
          onClearConversation={clearConversation}
          onExportConversation={exportConversation}
          onToggleContextDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
          suggestedPrompts={suggestedPrompts}
          isThinking={isThinking}
          isDrawerOpen={isDrawerOpen}
        />
      </div>

      {/* 6. Context Grounded Drawer ("What My Partner Knows") */}
      <ContextGroundedDrawer
        context={contextSnapshot}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* 7. Action Confirmation Modal */}
      <ActionConfirmationModal
        action={pendingAction}
        onConfirm={confirmPendingAction}
        onCancel={cancelPendingAction}
      />
    </div>
  );
}
