/**
 * NEXT MOVE AI V2 — FLOW 8: CHAT MESSAGE ITEM
 * 
 * Renders individual conversational turns with rich formatting, epistemic citations,
 * direct deep-linking action cards, and confirmation triggers.
 */

"use client";

import React from "react";
import {
  Sparkles,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  PlusCircle,
  Compass,
  TrendingUp,
  FolderGit2,
} from "lucide-react";
import {
  type PartnerMessage,
  type EpistemicCitation,
  type PartnerActionSuggestion,
} from "../types";

interface ChatMessageItemProps {
  message: PartnerMessage;
  onActionClick: (action: PartnerActionSuggestion) => void;
}

export function ChatMessageItem({ message, onActionClick }: ChatMessageItemProps) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  if (isSystem) {
    return (
      <div
        data-testid="system-chat-message"
        className="my-3 mx-auto max-w-xl p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs flex items-center gap-2.5"
      >
        <CheckCircle2 className="w-4 h-4 shrink-0 text-[#22C55E]" />
        <div>{message.content}</div>
      </div>
    );
  }

  return (
    <div
      data-testid={isUser ? "user-chat-message" : "partner-chat-message"}
      className={`flex gap-3 my-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {/* Partner Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center text-[#6757F5] shrink-0 mt-0.5 shadow-sm">
          <Sparkles className="w-4 h-4" />
        </div>
      )}

      {/* Message Bubble Container */}
      <div
        className={`max-w-2xl rounded-2xl p-4 transition-all shadow-sm ${
          isUser
            ? "bg-[#6757F5] text-white rounded-tr-sm"
            : "bg-white border border-[#E2E8F0] text-[#171A2B] rounded-tl-sm"
        }`}
      >
        {/* Message Role Header (Partner Only) */}
        {!isUser && (
          <div className="flex items-center justify-between gap-3 mb-2 pb-1.5 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#171A2B]">My Partner</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EEF2FF] text-[#6757F5] border border-[#C7D2FE]">
                AI Companion
              </span>
            </div>
            {message.isPrototypeSimulated && (
              <span className="text-[10px] text-[#94A3B8]">
                Grounded Prototype
              </span>
            )}
          </div>
        )}

        {/* Message Content */}
        <div
          className={`text-sm leading-relaxed prose prose-sm max-w-none ${
            isUser ? "text-white" : "text-[#334155]"
          }`}
        >
          {formatMessageContent(message.content, isUser)}
        </div>

        {/* Epistemic Citations (Partner Only) */}
        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="mt-3 pt-3 border-t border-[#F1F5F9] space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#6757F5]" />
              <span>Grounded in Authentic Student Facts:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {message.citations.map((cite) => (
                <CitationBadge key={cite.id} citation={cite} />
              ))}
            </div>
          </div>
        )}

        {/* Suggested Actions & Deep Links */}
        {!isUser && message.suggestedActions && message.suggestedActions.length > 0 && (
          <div className="mt-3 pt-3 border-t border-[#F1F5F9] space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              Recommended Next Moves:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {message.suggestedActions.map((action) => (
                <ActionCard
                  key={action.id}
                  action={action}
                  onClick={() => onActionClick(action)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Message Timestamp */}
        <div
          className={`text-[10px] mt-2 text-right ${
            isUser ? "text-white/70" : "text-[#94A3B8]"
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-[#171A2B] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper: Format message lines (handles bolding, headings, and lists cleanly)
// ---------------------------------------------------------------------------
function formatMessageContent(content: string, isUser: boolean) {
  const lines = content.split("\n");
  return lines.map((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={idx}
          className={`text-sm font-bold mt-2 mb-1 ${
            isUser ? "text-white" : "text-[#171A2B]"
          }`}
        >
          {trimmed.replace("### ", "")}
        </h3>
      );
    }

    if (trimmed.startsWith("> ")) {
      return (
        <blockquote
          key={idx}
          className={`pl-3 border-l-2 my-2 italic text-xs ${
            isUser
              ? "border-white/50 text-white/90"
              : "border-[#6757F5] bg-[#F8FAFC] text-[#475569] py-1 rounded-r"
          }`}
        >
          {trimmed.replace("> ", "")}
        </blockquote>
      );
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      return (
        <li key={idx} className="ml-4 list-disc text-xs my-0.5">
          {renderFormattedInline(trimmed.substring(2))}
        </li>
      );
    }

    if (/^\d+\.\s/.test(trimmed)) {
      return (
        <div key={idx} className="text-xs my-1 font-medium">
          {renderFormattedInline(trimmed)}
        </div>
      );
    }

    if (trimmed === "") {
      return <div key={idx} className="h-1.5" />;
    }

    return (
      <p key={idx} className="my-0.5">
        {renderFormattedInline(line)}
      </p>
    );
  });
}

function renderFormattedInline(text: string) {
  // Simple bold markdown parser: **text**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

// ---------------------------------------------------------------------------
// Helper: Citation Badge
// ---------------------------------------------------------------------------
function CitationBadge({ citation }: { citation: EpistemicCitation }) {
  const getBadgeStyle = () => {
    switch (citation.sourceType) {
      case "profile_fact":
        return "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]";
      case "practised_evidence":
        return "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]";
      case "self_reported_interest":
        return "bg-[#FDF4FF] text-[#A21CAF] border-[#F5D0FE]";
      case "active_roadmap":
      case "active_project":
        return "bg-[#EEF2FF] text-[#4338CA] border-[#C7D2FE]";
      default:
        return "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0]";
    }
  };

  return (
    <span
      data-testid="epistemic-citation-badge"
      title={citation.detail}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getBadgeStyle()}`}
    >
      <span>{citation.label}</span>
      {citation.linkHref && <ExternalLink className="w-2.5 h-2.5 opacity-60" />}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Helper: Action Card
// ---------------------------------------------------------------------------
function ActionCard({
  action,
  onClick,
}: {
  action: PartnerActionSuggestion;
  onClick: () => void;
}) {
  const getIcon = () => {
    if (action.type === "navigate_explore") return <Compass className="w-3.5 h-3.5 text-[#6757F5]" />;
    if (action.type === "navigate_growth") return <TrendingUp className="w-3.5 h-3.5 text-[#16A34A]" />;
    if (action.type === "navigate_projects") return <FolderGit2 className="w-3.5 h-3.5 text-[#D97706]" />;
    return <PlusCircle className="w-3.5 h-3.5 text-[#6757F5]" />;
  };

  return (
    <button
      type="button"
      data-testid={`partner-action-${action.type}`}
      onClick={onClick}
      className="p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#EEF2FF] hover:border-[#C7D2FE] text-left transition-all group flex flex-col justify-between"
    >
      <div className="flex items-start justify-between gap-1.5 mb-1">
        <div className="flex items-center gap-1.5 font-bold text-xs text-[#171A2B] group-hover:text-[#6757F5]">
          {getIcon()}
          <span>{action.title}</span>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#6757F5] group-hover:translate-x-0.5 transition-transform shrink-0" />
      </div>
      <p className="text-[11px] text-[#64748B] leading-tight line-clamp-2">
        {action.description}
      </p>
      {action.requiresConfirmation && (
        <span className="mt-1.5 inline-block text-[9px] font-bold text-[#D97706] uppercase tracking-wider">
          * Requires your confirmation
        </span>
      )}
    </button>
  );
}
