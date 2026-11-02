/**
 * NEXT MOVE AI V2 — FLOW 7: PROJECTS WORKSPACE VIEW
 * 
 * Interactive project-based learning and portfolio builder workspace.
 * 
 * Mandates:
 * - Active projects with incremental step completion and progress tracking.
 * - Starter project catalog tailored to student's academic stage.
 * - Real portfolio artifacts (GitHub, Figma, Docs, Sheets) attachment.
 * - Reflective completion (no fake certifications).
 * - "Create Custom Project" option for student-driven initiatives.
 */

"use client";

import React, { useState } from "react";
import {
  FolderGit2,
  Plus,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  type ActiveProject,
  type ProjectTemplate,
  type ProjectDifficulty,
} from "../types";

interface ProjectsWorkspaceViewProps {
  activeProjects: ActiveProject[];
  completedProjects: ActiveProject[];
  projectTemplates: ProjectTemplate[];
  onStartProject: (templateId: string) => void;
  onOpenProject: (project: ActiveProject) => void;
  onOpenCustomProject: () => void;
}

export function ProjectsWorkspaceView({
  activeProjects,
  completedProjects,
  projectTemplates,
  onStartProject,
  onOpenProject,
  onOpenCustomProject,
}: ProjectsWorkspaceViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Disciplines" },
    { id: "technology", label: "Technology & Software" },
    { id: "science", label: "Science & Environment" },
    { id: "creative", label: "Creative & Media" },
    { id: "business", label: "Business & Commerce" },
    { id: "social", label: "Social & Community" },
    { id: "hardware", label: "Engineering & Applied" },
  ];

  const filteredTemplates = projectTemplates.filter((t) => {
    if (selectedCategory !== "all") {
      const catLower = t.categoryLabel.toLowerCase();
      if (selectedCategory === "technology" && !catLower.includes("tech") && !catLower.includes("code") && !catLower.includes("software")) {
        return false;
      }
      if (selectedCategory === "science" && !catLower.includes("science") && !catLower.includes("bio") && !catLower.includes("environ")) {
        return false;
      }
      if (selectedCategory === "creative" && !catLower.includes("creative") && !catLower.includes("media") && !catLower.includes("design")) {
        return false;
      }
      if (selectedCategory === "business" && !catLower.includes("business") && !catLower.includes("finance") && !catLower.includes("market") && !catLower.includes("sme")) {
        return false;
      }
      if (selectedCategory === "social" && !catLower.includes("social") && !catLower.includes("civic") && !catLower.includes("community") && !catLower.includes("policy")) {
        return false;
      }
      if (selectedCategory === "hardware" && !catLower.includes("engineer") && !catLower.includes("hardware") && !catLower.includes("industrial") && !catLower.includes("automation")) {
        return false;
      }
    }
    if (selectedDifficulty !== "all" && t.difficulty !== selectedDifficulty) {
      return false;
    }
    return true;
  });

  const getDifficultyBadge = (diff?: ProjectDifficulty) => {
    switch (diff) {
      case "beginner":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]">Beginner</span>;
      case "intermediate":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]">Intermediate</span>;
      case "advanced":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F4F3FF] text-[#5925DC] border border-[#D9D6FE]">Advanced</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F2F1FA] text-[#6757F5] border border-[#E8E6F3]">Custom</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200" data-testid="projects-workspace-view">
      {/* 1. Header with CTA */}
      <section className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
            Experiential Project Studio
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#171A2B] tracking-tight">
            Build Real Work & Demonstrate Ability
          </h2>
          <p className="text-xs sm:text-sm text-[#4A4E69] max-w-2xl leading-relaxed">
            Move beyond passive tests. Every project produces concrete artifacts you can share with mentors, 
            institutions, and future collaborators.
          </p>
        </div>

        <button
          onClick={onOpenCustomProject}
          data-testid="create-custom-project-btn"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5645E5] text-white text-xs font-bold shadow-sm transition-all flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          Propose Custom Project
        </button>
      </section>

      {/* 2. Active Projects In Progress */}
      {activeProjects.length > 0 && (
        <section className="space-y-4" data-testid="active-projects-section">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#171A2B]">
              Active In-Progress Projects ({activeProjects.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeProjects.map((proj) => {
              const totalSteps = proj.steps.length;
              const completedSteps = proj.steps.filter((s) => s.isCompleted).length;
              const percent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

              return (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl bg-white border border-[#E8E6F3] hover:border-[#6757F5] transition-all space-y-4 flex flex-col justify-between"
                  data-testid={`active-project-card-${proj.id}`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#F2F1FA] text-[#6757F5]">
                        {proj.categoryLabel}
                      </span>
                      {getDifficultyBadge(proj.difficulty)}
                    </div>
                    <h4 className="text-base font-bold text-[#171A2B]">{proj.title}</h4>
                    <p className="text-xs text-[#4A4E69] line-clamp-2">{proj.problemStatement}</p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-[#F2F1FA]">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-[#4A4E69]">
                        <span className="font-semibold">Step Progress</span>
                        <span className="font-bold text-[#6757F5]">
                          {completedSteps} of {totalSteps} Steps ({percent}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#E8E6F3] overflow-hidden">
                        <div
                          className="h-full bg-[#6757F5] rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className="text-[11px] text-[#98A2B3] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> ~{proj.estimatedHours} hrs total
                      </span>
                      <button
                        onClick={() => onOpenProject(proj)}
                        data-testid={`continue-project-${proj.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#171A2B] text-white text-xs font-bold hover:bg-[#252A40] transition-all"
                      >
                        Continue Project <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. Completed Projects Archive */}
      {completedProjects.length > 0 && (
        <section className="space-y-4" data-testid="completed-projects-section">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#166534]">
              Completed Projects & Deliverables ({completedProjects.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedProjects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-2xl bg-[#FAFCFB] border border-[#BBF7D0] space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#DCFCE7] text-[#166534]">
                      Completed & Documented
                    </span>
                    <span className="text-xs text-[#166534] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" /> 100%
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#171A2B]">{proj.title}</h4>
                  {proj.reflection && (
                    <p className="text-xs text-[#4A4E69] italic bg-white p-2.5 rounded-xl border border-[#E8E6F3]">
                      &ldquo;{proj.reflection.whatLearned}&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#BBF7D0]/40">
                  <span className="text-[11px] text-[#4A4E69]">
                    {proj.artifacts.length} verified artifact(s) attached
                  </span>
                  <button
                    onClick={() => onOpenProject(proj)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#166534] hover:underline"
                  >
                    View Deliverables <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Starter Project Catalog */}
      <section className="space-y-5" data-testid="starter-project-catalog">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight">
              Curated Starter Projects
            </h3>
            <p className="text-xs text-[#4A4E69]">
              Scaffolded projects matched to your academic stage and interests.
            </p>
          </div>

          {/* Difficulty filter */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="text-[11px] font-bold text-[#98A2B3]">Level:</span>
            {["all", "beginner", "intermediate", "advanced"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedDifficulty(lvl)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-all ${
                  selectedDifficulty === lvl
                    ? "bg-[#171A2B] text-white"
                    : "bg-white border border-[#E8E6F3] text-[#4A4E69] hover:bg-[#F7F7FD]"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#6757F5] text-white shadow-xs"
                  : "bg-white border border-[#E8E6F3] text-[#4A4E69] hover:border-[#6757F5]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTemplates.map((template) => {
            const isAlreadyActive = activeProjects.some((p) => p.templateId === template.id);
            const isAlreadyDone = completedProjects.some((p) => p.templateId === template.id);

            return (
              <div
                key={template.id}
                className="p-5 rounded-2xl bg-white border border-[#E8E6F3] hover:border-[#6757F5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                data-testid={`project-template-card-${template.id}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F2F1FA] text-[#6757F5]">
                      {template.categoryLabel}
                    </span>
                    {getDifficultyBadge(template.difficulty)}
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-[#171A2B] leading-snug">
                      {template.title}
                    </h4>
                    <p className="text-xs text-[#4A4E69] mt-1.5 line-clamp-3 leading-relaxed">
                      {template.problemStatement}
                    </p>
                  </div>

                  {/* Learning outcomes */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">
                      Deliverable & Outcome
                    </span>
                    <p className="text-xs font-medium text-[#171A2B]">
                      📦 {template.deliverableSummary || template.deliverableSuggestions?.[0] || template.subtitle}
                    </p>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {(template.skillsCovered || template.tags || []).slice(0, 3).map((s: string) => (
                      <span
                        key={s}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#F7F7FD] text-[#4A4E69] border border-[#E8E6F3]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F2F1FA] flex items-center justify-between gap-2">
                  <span className="text-[11px] text-[#98A2B3] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> ~{template.estimatedHours} hrs
                  </span>

                  {isAlreadyDone ? (
                    <span className="text-xs font-bold text-[#166534] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  ) : isAlreadyActive ? (
                    <button
                      onClick={() => {
                        const active = activeProjects.find((p) => p.templateId === template.id);
                        if (active) onOpenProject(active);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#F2F1FA] text-[#6757F5] text-xs font-bold hover:bg-[#E8E6F3] transition-all"
                    >
                      In Progress <ArrowRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onStartProject(template.id)}
                      data-testid={`start-project-btn-${template.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#6757F5] hover:bg-[#5645E5] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <FolderGit2 className="w-3.5 h-3.5" /> Start Project
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="p-8 rounded-2xl bg-white border border-[#E8E6F3] text-center space-y-2">
            <p className="text-sm font-bold text-[#171A2B]">No projects match your current filter.</p>
            <p className="text-xs text-[#4A4E69]">Try switching disciplines or proposing your own custom project.</p>
          </div>
        )}
      </section>
    </div>
  );
}
