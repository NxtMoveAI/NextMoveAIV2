/**
 * NEXT MOVE AI V2 — FLOW 8: CHAT MESSAGE LIST
 * 
 * Scrollable message viewport supporting responsive rendering, animated typing indicator,
 * and accessible ARIA live-region notifications.
 */

"use client";

import React, { useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { ChatMessageItem } from "./ChatMessageItem";
import {
  type PartnerMessage,
  type PartnerActionSuggestion,
} from "../types";

interface ChatMessageListProps {
  messages: PartnerMessage[];
  isThinking: boolean;
  onActionClick: (action: PartnerActionSuggestion) => void;
}

export function ChatMessageList({
  messages,
  isThinking,
  onActionClick,
}: ChatMessageListProps) {
  const scrollEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <div
      aria-label="Conversation with My Partner"
      data-testid="chat-message-list"
      className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-2"
    >
      {messages.map((message) => (
        <ChatMessageItem
          key={message.id}
          message={message}
          onActionClick={onActionClick}
        />
      ))}

      {/* Thinking / Streaming Indicator */}
      {isThinking && (
        <div
          data-testid="partner-thinking-indicator"
          className="flex items-center gap-3 my-4 animate-fade-in"
        >
          <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center text-[#6757F5] shrink-0 shadow-sm">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white border border-[#E2E8F0] shadow-sm flex items-center gap-2">
            <span className="text-xs font-medium text-[#64748B]">
              My Partner is thinking
            </span>
            <div className="flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6757F5] animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#6757F5] animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#6757F5] animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      )}

      <div ref={scrollEndRef} className="h-2" />
    </div>
  );
}
