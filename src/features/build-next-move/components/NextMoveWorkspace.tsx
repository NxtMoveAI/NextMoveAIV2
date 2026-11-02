/**
 * NEXT MOVE AI V2 — FLOW 7: BUILD MY NEXT MOVE MASTER WORKSPACE
 * 
 * Master experiential growth workspace rendered at /dashboard/student/projects.
 * 
 * Unifies:
 * - Grounded situation & continuous growth recommendation
 * - Adaptable learning roadmaps
 * - Step-by-step project studio with real portfolio artifacts
 * - Practical tastings & Flow 6 simulation bridges
 * - Age-gated opportunities with transparent provenance
 */

"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  ArrowLeft,
  FolderGit2,
  TrendingUp,
  CheckCircle2,
  Layers,
  Briefcase,
} from "lucide-react";
import { PersonaSwitcherExploreBar } from "@/features/explore/components/PersonaSwitcherExploreBar";
import { useNextMove } from "../hooks/useNextMove";
import { OverviewDashboardView } from "./OverviewDashboardView";
import { RoadmapBuilderView } from "./RoadmapBuilderView";
import { ProjectsWorkspaceView } from "./ProjectsWorkspaceView";
import { PracticalExperiencesView } from "./PracticalExperiencesView";
import { OpportunitiesView } from "./OpportunitiesView";
import { ProjectRunnerModal } from "./ProjectRunnerModal";
import { NewProjectModal } from "./NewProjectModal";
import { RoadmapCustomizeModal } from "./RoadmapCustomizeModal";
import { type NextMoveWorkspaceTab } from "../types";

export function NextMoveWorkspace() {
  const {
    profile,
    isAnonymous,
    studentStageId,
    activeTab,
    setActiveTab,
    completedProjects,
    activeProjects,
    roadmap,
    goal,
    completedTrialCount,
    activeMove,
    alternatives,
    selectedAlternativeId,
    setSelectedAlternativeId,
    activeProjectModal,
    setActiveProjectModal,
    isCustomProjectOpen,
    setIsCustomProjectOpen,
    isCustomizeRoadmapOpen,
    setIsCustomizeRoadmapOpen,
    projectTemplates,
    experiences,
    filteredOpportunities,
    opportunityTypeFilter,
    setOpportunityTypeFilter,
    opportunitySearch,
    setOpportunitySearch,
    handleStartProject,
    handleCreateCustomProject,
    handleToggleMilestone,
    handleStepUpdate,
    handleAttachArtifact,
    handleCompleteProject,
    handlePostponeMove,
    switchRoadmapTrack,
    regenerateRoadmap,
    setStudentGoal,
  } = useNextMove();

  const isMiddleSchool = studentStageId === "classes-4-7";

  const getStageDisplayLabel = () => {
    switch (studentStageId) {
      case "classes-4-7":
        return "Classes 4–7 · Curiosity & Maker Projects";
      case "classes-8-10":
        return "Classes 8–10 · Stream Discovery & Subject Building";
      case "classes-11-12":
        return "Classes 11–12 · Stream Preparation & Applied Projects";
      case "diploma":
        return "Diploma · Applied Automation & Hands-on Systems";
      case "degree-engineering":
        return "Degree · Systems Architecture & Portfolio Readiness";
      case "final-year-grad":
        return "Graduates · Industry Portfolios, Fellowships & Venture";
      default:
        return "Student Workspace";
    }
  };

  const tabs: { id: NextMoveWorkspaceTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "overview", label: "Growth Overview", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "roadmaps", label: "Learning Roadmaps", icon: <Compass className="w-4 h-4" /> },
    {
      id: "projects",
      label: "Project Studio",
      icon: <FolderGit2 className="w-4 h-4" />,
      count: activeProjects.length,
    },
    {
      id: "experiences",
      label: "Practical Experiences",
      icon: <Layers className="w-4 h-4" />,
      count: experiences.length,
    },
    {
      id: "opportunities",
      label: isMiddleSchool ? "Competitions & Fairs" : "Opportunities & Directory",
      icon: <Briefcase className="w-4 h-4" />,
      count: filteredOpportunities.length,
    },
  ];

  return (
    <div className="space-y-6 pb-12" data-testid="next-move-workspace">
      {/* Dev Persona Switcher Bar */}
      <PersonaSwitcherExploreBar />

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#171A2B] via-[#222842] to-[#171A2B] text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/dashboard/student"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-white/70 hover:text-white transition-colors bg-white/10 px-2.5 py-1 rounded-xl"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>

            <span className="text-[10px] font-bold uppercase tracking-wider text-[#DDD8FE] bg-white/10 px-2.5 py-1 rounded-xl">
              Flow 7 • Build My Next Move
            </span>

            <span className="text-[10px] font-bold text-[#A7F3D0] bg-[#065F46]/60 px-2.5 py-1 rounded-xl">
              {getStageDisplayLabel()}
            </span>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
              {isMiddleSchool
                ? "Maker Projects & Curiosity Roadmaps"
                : "Roadmaps, Projects & Real Next Actions"}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
              {isMiddleSchool
                ? "Build hands-on creations, try fun challenges, and discover what you enjoy making—without grades or pressure."
                : "We don't decide careers; we enable clarity. Transform your interests and practical evidence into concrete deliverables, adaptable roadmaps, and verified portfolio artifacts."}
            </p>
          </div>

          {/* Quick Stats Pill Bar */}
          <div className="flex items-center gap-3 pt-2 text-xs text-white/90 flex-wrap">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <FolderGit2 className="w-4 h-4 text-[#DDD8FE]" />
              <span>
                <strong className="text-white">{activeProjects.length}</strong> Active Projects
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-[#A7F3D0]" />
              <span>
                <strong className="text-white">{completedProjects.length}</strong> Completed
              </span>
            </div>
            {roadmap && (
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
                <Compass className="w-4 h-4 text-[#FEDF89]" />
                <span>
                  Track: <strong className="text-white">{roadmap.trackId || roadmap.targetFocus}</strong>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#E8E6F3] pb-3 text-xs overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              data-testid={`workspace-tab-${tab.id}`}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 ${
                isSelected
                  ? "bg-[#6757F5] text-white shadow-xs"
                  : "bg-white text-[#626987] hover:bg-[#F4F3F8] hover:text-[#171A2B] border border-[#E8E6F3]"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? "bg-white/20 text-white" : "bg-[#F2F1FA] text-[#6757F5]"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Views */}
      <main>
        {activeTab === "overview" && (
          <OverviewDashboardView
            profile={profile}
            isAnonymous={isAnonymous}
            activeMove={activeMove}
            alternatives={alternatives}
            selectedAlternativeId={selectedAlternativeId}
            activeProjects={activeProjects}
            completedProjects={completedProjects}
            roadmap={roadmap}
            goal={goal}
            completedTrialCount={completedTrialCount}
            onSelectAlternative={setSelectedAlternativeId}
            onPostponeMove={handlePostponeMove}
            onTabChange={setActiveTab}
            onOpenProject={(p) => setActiveProjectModal(p)}
            onOpenCustomProject={() => setIsCustomProjectOpen(true)}
          />
        )}

        {activeTab === "roadmaps" && (
          <RoadmapBuilderView
            roadmap={roadmap}
            onToggleMilestone={handleToggleMilestone}
            onSwitchTrack={switchRoadmapTrack}
            onOpenCustomizeModal={() => setIsCustomizeRoadmapOpen(true)}
            onTabChange={setActiveTab}
            onStartProject={handleStartProject}
          />
        )}

        {activeTab === "projects" && (
          <ProjectsWorkspaceView
            activeProjects={activeProjects}
            completedProjects={completedProjects}
            projectTemplates={projectTemplates}
            onStartProject={handleStartProject}
            onOpenProject={(p) => setActiveProjectModal(p)}
            onOpenCustomProject={() => setIsCustomProjectOpen(true)}
          />
        )}

        {activeTab === "experiences" && (
          <PracticalExperiencesView
            experiences={experiences}
            completedTrialCount={completedTrialCount}
            onTabChange={setActiveTab}
          />
        )}

        {activeTab === "opportunities" && (
          <OpportunitiesView
            profile={profile}
            filteredOpportunities={filteredOpportunities}
            opportunityTypeFilter={opportunityTypeFilter}
            setOpportunityTypeFilter={setOpportunityTypeFilter}
            opportunitySearch={opportunitySearch}
            setOpportunitySearch={setOpportunitySearch}
          />
        )}
      </main>

      {/* Modals */}
      {activeProjectModal && (
        <ProjectRunnerModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
          onStepUpdate={handleStepUpdate}
          onAttachArtifact={handleAttachArtifact}
          onCompleteProject={handleCompleteProject}
        />
      )}

      {isCustomProjectOpen && (
        <NewProjectModal
          isOpen={isCustomProjectOpen}
          onClose={() => setIsCustomProjectOpen(false)}
          onCreate={handleCreateCustomProject}
        />
      )}

      {isCustomizeRoadmapOpen && (
        <RoadmapCustomizeModal
          isOpen={isCustomizeRoadmapOpen}
          roadmap={roadmap}
          currentGoal={goal}
          onClose={() => setIsCustomizeRoadmapOpen(false)}
          onSwitchTrack={switchRoadmapTrack}
          onRegenerateRoadmap={regenerateRoadmap}
          onSetGoal={setStudentGoal}
        />
      )}
    </div>
  );
}
