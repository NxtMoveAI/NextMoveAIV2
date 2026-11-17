"use client";

import React, { useState } from "react";
import {
  Palette,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface CreationExample {
  id: string;
  stageBadge: string;
  category: string;
  title: string;
  conceptTag: string;
  description: string;
  skills: string[];
  outputType: string;
  mockupContent: React.ReactNode;
}

const CREATION_EXAMPLES: CreationExample[] = [
  {
    id: "comic-strip",
    stageBadge: "Classes 4–7",
    category: "Creative Storytelling",
    title: "The Curious Robot & The Garden Snail",
    conceptTag: "Visual Storyboard & Dialogue",
    description:
      "A playful 3-panel comic exploring how an inquisitive service robot learns about patience from an elderly garden snail.",
    skills: ["Narrative Sequencing", "Character Design", "Comic Timing", "Visual Pacing"],
    outputType: "Illustrated 3-Panel Storyboard",
    mockupContent: (
      <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3]">
        <div className="p-2 rounded-lg bg-white border border-[#E8E6F3] text-center flex flex-col justify-between h-24">
          <span className="text-[9px] font-bold text-[#269CA8] uppercase">Panel 1</span>
          <div className="text-xl">🤖🔍🌱</div>
          <span className="text-[10px] text-[#474D66] font-medium leading-tight">&ldquo;Scanning... 0% speed detected.&rdquo;</span>
        </div>
        <div className="p-2 rounded-lg bg-white border border-[#E8E6F3] text-center flex flex-col justify-between h-24">
          <span className="text-[9px] font-bold text-[#269CA8] uppercase">Panel 2</span>
          <div className="text-xl">🐌💬🍂</div>
          <span className="text-[10px] text-[#474D66] font-medium leading-tight">&ldquo;Slow down. The moss smells lovely.&rdquo;</span>
        </div>
        <div className="p-2 rounded-lg bg-white border border-[#E8E6F3] text-center flex flex-col justify-between h-24">
          <span className="text-[9px] font-bold text-[#269CA8] uppercase">Panel 3</span>
          <div className="text-xl">🤖❤️🐌</div>
          <span className="text-[10px] text-[#474D66] font-medium leading-tight">&ldquo;Recalibrating happiness index...&rdquo;</span>
        </div>
      </div>
    ),
  },
  {
    id: "waste-sorter",
    stageBadge: "Classes 8–10",
    category: "Science & Community",
    title: "Neighborhood Micro-Composting Flow",
    conceptTag: "Systems Design & Civic Action",
    description:
      "A pragmatic blueprint designed to divert vegetable peel waste from 50 school households into organic garden compost.",
    skills: ["Decomposition Biology", "Systems Thinking", "Community Logistics", "Civic Problem Solving"],
    outputType: "1-Page Action Blueprint & Flowchart",
    mockupContent: (
      <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-2">
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#171A2B] pb-1 border-b border-[#E8E6F3]">
          <span>Household Kitchen Peels</span>
          <span className="text-[#10B981] font-bold">50 kg / wk</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[#626987]">
          <span>Aerobic Compost Bins (30 Days)</span>
          <span>→ Nitrogen / Carbon 30:1</span>
        </div>
        <div className="p-1.5 rounded-lg bg-[#ECFDF5] text-[#047857] text-[10px] font-bold flex items-center justify-between">
          <span>School Botanical Garden Yield</span>
          <span>15 kg Organic Fertilizer</span>
        </div>
      </div>
    ),
  },
  {
    id: "cafe-budget",
    stageBadge: "Classes 11–12",
    category: "Commerce & Financial Thinking",
    title: "Campus Cold-Brew Cafe Unit Model",
    conceptTag: "Spreadsheet Model & Unit Margins",
    description:
      "A break-even spreadsheet mapping ingredient unit costs, packaging, and booth rent for a student-run cold brew stall.",
    skills: ["Contribution Margins", "Fixed vs Variable Costs", "Break-Even Volume", "Spreadsheet Design"],
    outputType: "Financial Projection Spreadsheet",
    mockupContent: (
      <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-1.5">
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-1.5 rounded bg-white border border-[#E8E6F3]">
            <span className="text-[#626987] block">Selling Price</span>
            <span className="font-extrabold text-[#171A2B]">₹75 / cup</span>
          </div>
          <div className="p-1.5 rounded bg-white border border-[#E8E6F3]">
            <span className="text-[#626987] block">Unit Cost (Beans+Cup)</span>
            <span className="font-extrabold text-[#171A2B]">₹25 / cup</span>
          </div>
        </div>
        <div className="p-1.5 rounded bg-[#FAF5FF] border border-[#E9D5FF] flex items-center justify-between text-[10px] font-bold text-[#6757F5]">
          <span>Break-Even Threshold</span>
          <span>30 cups covers ₹1,500 stall</span>
        </div>
      </div>
    ),
  },
  {
    id: "astronomy-sim",
    stageBadge: "Classes 11–12",
    category: "Technology & Astronomy",
    title: "Exoplanet Transit Light Curve Micro-Sim",
    conceptTag: "Interactive Web Prototype",
    description:
      "A lightweight 40-line JavaScript canvas model demonstrating how the Kepler telescope detects exoplanets by tracking starlight dips.",
    skills: ["Algorithmic Loops", "Data Coordinates", "Physics Modeling", "Scientific Visualization"],
    outputType: "Lightweight Interactive Micro-App",
    mockupContent: (
      <div className="p-3 rounded-xl bg-[#171A2B] text-white space-y-2">
        <div className="flex items-center justify-between text-[10px] text-[#A0A5BA]">
          <span>Star Brightness Flux</span>
          <span className="text-[#35B8C5] font-mono">Dip: -1.2%</span>
        </div>
        <div className="h-8 w-full rounded bg-[#202538] flex items-center px-2 relative overflow-hidden">
          <div className="w-full h-0.5 bg-[#474D66]" />
          <div className="absolute left-1/2 -translate-x-1/2 w-8 h-3 rounded-full bg-[#35B8C5]/20 border border-[#35B8C5]" />
          <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white" />
        </div>
        <div className="flex justify-between text-[9px] text-[#A0A5BA] font-mono">
          <span>Transit Start</span>
          <span className="text-[#35B8C5]">Exoplanet Ingress</span>
          <span>Egress</span>
        </div>
      </div>
    ),
  },
];

export function SchoolCreationsShowcase() {
  const [selectedCreation, setSelectedCreation] = useState<string>("comic-strip");

  return (
    <section id="student-creations" className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F9FA] text-[#269CA8] text-xs font-bold uppercase tracking-wider mb-4 border border-[#CBF0F3] shadow-xs">
            <Palette className="w-3.5 h-3.5" />
            <span>Real Student Output</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Look what you can create.{" "}
            <span className="text-[#269CA8]">
              One curiosity at a time.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Meaningful learning isn&apos;t just about reading textbooks or taking tests. It&apos;s about designing, sketching, calculating, and building things that matter.
          </p>

          {/* Illustrative Disclaimer Notice */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E6F3] text-[11px] text-[#626987] shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#269CA8]" />
            <span>Illustrative conceptual examples demonstrating possibilities · Not real student profiles or live submissions</span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {CREATION_EXAMPLES.map((item) => {
            const isSelected = item.id === selectedCreation;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedCreation(item.id)}
                className={`p-6 rounded-3xl transition-all duration-200 cursor-pointer flex flex-col justify-between border-2 ${
                  isSelected
                    ? "bg-white border-[#269CA8] shadow-lg shadow-[#35B8C5]/10 scale-[1.02]"
                    : "bg-white/80 border-[#E8E6F3] hover:border-[#CBF0F3] hover:bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#E8F9FA] text-[#269CA8] text-[10px] font-extrabold uppercase tracking-wider border border-[#CBF0F3]">
                      {item.stageBadge}
                    </span>
                    <span className="text-[10px] text-[#7B82A0] font-semibold">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#171A2B] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#626987] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Mockup Preview Box */}
                  <div className="mb-4">{item.mockupContent}</div>
                </div>

                <div>
                  {/* Skills Tags */}
                  <div className="pt-3 border-t border-[#F0EEF8] flex flex-wrap gap-1.5 mb-3">
                    {item.skills.slice(0, 2).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E8E6F3] text-[10px] font-semibold text-[#474D66]"
                      >
                        {skill}
                      </span>
                    ))}
                    {item.skills.length > 2 && (
                      <span className="text-[10px] text-[#7B82A0] self-center">
                        +{item.skills.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-[#269CA8]">
                    <span>{item.outputType}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Takeaway Banner */}
        <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-white border-2 border-[#E8E6F3] text-center shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-[#171A2B]">
            <div className="w-8 h-8 rounded-xl bg-[#E8F9FA] text-[#269CA8] flex items-center justify-center font-bold shrink-0">
              💡
            </div>
            <p className="font-semibold text-center sm:left">
              Every meaningful project begins with a simple question and a low-pressure trial, never a high-stakes exam paper.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
