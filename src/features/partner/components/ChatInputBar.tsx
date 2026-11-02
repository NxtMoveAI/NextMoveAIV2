/**
 * NEXT MOVE AI V2 — FLOW 8: CHAT INPUT BAR
 * 
 * Accessible input container with contextual prompt chips, send triggers,
 * conversation reset, export utilities, and context drawer toggle.
 */

"use client";

import React, { useState, useRef } from "react";
import {
  Send,
  Trash2,
  Download,
  Info,
  Sparkles,
} from "lucide-react";
import { type SuggestedPrompt } from "../types";

interface ChatInputBarProps {
  onSendMessage: (text: string) => void;
  onClearConversation: () => void;
  onExportConversation: () => void;
  onToggleContextDrawer: () => void;
  suggestedPrompts: SuggestedPrompt[];
  isThinking: boolean;
  isDrawerOpen: boolean;
}

export function ChatInputBar({
  onSendMessage,
  onClearConversation,
  onExportConversation,
  onToggleContextDrawer,
  suggestedPrompts,
  isThinking,
  isDrawerOpen,
}: ChatInputBarProps) {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!inputText.trim() || isThinking) return;
    onSendMessage(inputText);
    setInputText("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePromptClick = (promptText: string) => {
    if (isThinking) return;
    onSendMessage(promptText);
  };

  return (
    <div
      data-testid="chat-input-bar"
      className="p-3 sm:p-4 bg-white border-t border-[#E2E8F0] space-y-3 shrink-0"
    >
      {/* 1. Contextual Suggested Prompt Chips */}
      {suggestedPrompts.length > 0 && (
        <div
          data-testid="suggested-prompts-container"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none"
        >
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#6757F5] shrink-0 pr-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Try asking:</span>
          </div>
          {suggestedPrompts.slice(0, 4).map((p) => (
            <button
              key={p.id}
              type="button"
              data-testid="suggested-prompt-chip"
              disabled={isThinking}
              onClick={() => handlePromptClick(p.promptText)}
              className="px-2.5 py-1 rounded-full text-xs bg-[#F8FAFC] border border-[#CBD5E1] text-[#334155] hover:bg-[#EEF2FF] hover:border-[#C7D2FE] hover:text-[#6757F5] transition-all whitespace-nowrap shrink-0 disabled:opacity-50"
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* 2. Chat Input Box */}
      <div className="flex items-end gap-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-2xl p-2 focus-within:ring-2 focus-within:ring-[#6757F5] focus-within:border-transparent transition-all">
        <textarea
          ref={inputRef}
          rows={1}
          value={inputText}
          disabled={isThinking}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask My Partner anything about your pathways, projects, or next steps..."
          data-testid="partner-chat-input"
          aria-label="Message My Partner"
          className="flex-1 bg-transparent border-0 outline-none resize-none text-xs sm:text-sm text-[#171A2B] placeholder-[#94A3B8] max-h-28 py-1.5 px-2"
        />

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!inputText.trim() || isThinking}
          data-testid="send-chat-btn"
          aria-label="Send message"
          className="p-2 rounded-xl bg-[#6757F5] text-white hover:bg-[#5546E0] disabled:opacity-40 disabled:hover:bg-[#6757F5] transition-all shrink-0 shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Utility Toolbar */}
      <div className="flex items-center justify-between text-xs text-[#64748B] pt-1">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleContextDrawer}
            data-testid="toggle-context-drawer-btn"
            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${
              isDrawerOpen
                ? "bg-[#EEF2FF] text-[#6757F5]"
                : "hover:bg-gray-100 text-[#475569]"
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>{isDrawerOpen ? "Hide Context" : "What Partner Knows"}</span>
          </button>

          <button
            type="button"
            onClick={onExportConversation}
            data-testid="export-chat-btn"
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs hover:bg-gray-100 text-[#475569] transition-colors"
            title="Download conversation summary as markdown"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Summary</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onClearConversation}
          data-testid="clear-chat-btn"
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-[#DC2626] hover:bg-[#FEE2E2] transition-colors"
          title="Reset conversation"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>
    </div>
  );
}
