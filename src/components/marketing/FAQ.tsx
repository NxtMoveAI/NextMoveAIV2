"use client";

import React, { useState } from "react";
import { FAQ_ITEMS } from "@/data/landing-demo";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E8E6F3] relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DDD8FE]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A2B] tracking-tight">
            Clear answers about Next Move AI.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#31364F] leading-relaxed">
            Everything you need to know about our student-centered philosophy, privacy
            commitments, and how we help learners discover clarity.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            const buttonId = `faq-btn-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#6757F5] shadow-md ring-1 ring-[#6757F5]/20"
                    : "bg-white/90 border-[#E8E6F3] hover:border-[#DDD8FE]"
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6757F5]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#6757F5] bg-[#EDEAFF] w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-[#171A2B]">
                        {item.question}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "bg-[#6757F5] text-white rotate-180"
                          : "bg-[#FAF9F6] text-[#626987]"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#31364F] leading-relaxed border-t border-[#F0EEF8] animate-fadeIn"
                  >
                    <div className="pt-2">{item.answer}</div>
                    <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-[#6757F5]">
                      <span>Category: {item.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className="mt-10 p-6 rounded-3xl bg-white border border-[#DDD8FE] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-[#171A2B]">
              Have a specific question about your academic situation?
            </h4>
            <p className="text-xs text-[#626987] mt-0.5">
              Explore your academic stage in our interactive explorer or learn how the platform works.
            </p>
          </div>
          <a
            href="#explorer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#6757F5] hover:bg-[#5342E8] text-white whitespace-nowrap shadow-sm transition-colors"
          >
            <span>Try Explorer</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
