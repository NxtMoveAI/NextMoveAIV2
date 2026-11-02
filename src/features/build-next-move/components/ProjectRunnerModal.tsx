/**
 * NEXT MOVE AI V2 — FLOW 7: PROJECT RUNNER MODAL
 * 
 * Interactive milestone runner, step-by-step notes, artifact attachment,
 * and reflective project completion.
 * 
 * Epistemic Rules:
 * - Evidence artifacts require student link/document (no fake verification).
 * - Completing project prompts honest reflection, not algorithmic grades.
 */

"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  Plus,
  ExternalLink,
  Code,
  PenTool,
  FileText,
} from "lucide-react";
import {
  type ActiveProject,
  type ProjectEvidenceArtifact,
  type ProjectArtifactType,
  type ProjectReflectionData,
} from "../types";

interface ProjectRunnerModalProps {
  project: ActiveProject;
  onClose: () => void;
  onStepUpdate: (projectId: string, stepId: string, updates: { isCompleted?: boolean; workNotes?: string }) => void;
  onAttachArtifact: (projectId: string, artifact: Omit<ProjectEvidenceArtifact, "id" | "addedAt">) => void;
  onCompleteProject: (projectId: string, reflection: ProjectReflectionData) => void;
}

export function ProjectRunnerModal({
  project,
  onClose,
  onStepUpdate,
  onAttachArtifact,
  onCompleteProject,
}: ProjectRunnerModalProps) {
  // New artifact state
  const [artifactType, setArtifactType] = useState<ProjectArtifactType>("link_github");
  const [artifactTitle, setArtifactTitle] = useState("");
  const [artifactUrl, setArtifactUrl] = useState("");
  const [showArtifactForm, setShowArtifactForm] = useState(false);

  // Reflection form state
  const [showReflectionForm, setShowReflectionForm] = useState(false);
  const [whatLearned, setWhatLearned] = useState(
    project.reflection?.whatLearned || project.reflection?.whatWorkedWell || ""
  );
  const [whatWasChallenging, setWhatWasChallenging] = useState(
    project.reflection?.whatWasChallenging || project.reflection?.biggestObstacle || ""
  );
  const [wouldPursueFurther, setWouldPursueFurther] = useState<"yes" | "maybe" | "no">(
    project.reflection?.wouldPursueFurther || "yes"
  );
  const [nextCuriosity, setNextCuriosity] = useState(project.reflection?.nextCuriosity || "");

  const totalSteps = project.steps.length;
  const completedSteps = project.steps.filter((s) => s.isCompleted).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const handleAddArtifact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artifactTitle.trim() || !artifactUrl.trim()) return;

    onAttachArtifact(project.id, {
      title: artifactTitle.trim(),
      artifactType,
      type: artifactType,
      urlOrReference: artifactUrl.trim(),
      url: artifactUrl.trim(),
      description: artifactTitle.trim(),
    });

    setArtifactTitle("");
    setArtifactUrl("");
    setShowArtifactForm(false);
  };

  const handleFinishProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatLearned.trim()) return;

    onCompleteProject(project.id, {
      whatLearned: whatLearned.trim(),
      whatWorkedWell: whatLearned.trim(),
      whatWasChallenging: whatWasChallenging.trim(),
      biggestObstacle: whatWasChallenging.trim(),
      whatLearnedAboutSelf: whatLearned.trim(),
      wouldPursueFurther,
      wouldContinueField: wouldPursueFurther === "no" ? "not_for_me" : wouldPursueFurther,
      nextCuriosity: nextCuriosity.trim(),
      submittedAt: new Date().toISOString(),
    });

    setShowReflectionForm(false);
  };

  const getArtifactIcon = (type: ProjectArtifactType) => {
    switch (type) {
      case "link_github":
        return <Code className="w-4 h-4 text-[#171A2B]" />;
      case "link_figma":
        return <PenTool className="w-4 h-4 text-[#A259FF]" />;
      case "link_spreadsheet":
      case "link_document":
      default:
        return <FileText className="w-4 h-4 text-[#2E90FA]" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171A2B]/60 backdrop-blur-sm animate-in fade-in"
      data-testid="project-runner-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-[#E8E6F3] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#F2F1FA] flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#F2F1FA] text-[#6757F5]">
                {project.categoryLabel}
              </span>
              {project.difficulty && (
                <>
                  <span className="text-xs text-[#98A2B3]">·</span>
                  <span className="text-xs font-semibold text-[#4A4E69] capitalize">
                    {project.difficulty} Level
                  </span>
                </>
              )}
              {project.status === "completed" && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#DCFCE7] text-[#166534]">
                  Completed
                </span>
              )}
            </div>
            <h2 id="project-modal-title" className="text-xl font-black text-[#171A2B]">
              {project.title}
            </h2>
            <p className="text-xs text-[#4A4E69] leading-relaxed max-w-xl">
              {project.problemStatement}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl text-[#98A2B3] hover:text-[#171A2B] hover:bg-[#F7F7FD] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Progress bar */}
          <div className="p-4 rounded-2xl bg-[#F7F7FD] border border-[#E8E6F3] space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#171A2B]">Step Progress</span>
              <span className="text-[#6757F5]">
                {completedSteps} of {totalSteps} Steps ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#E8E6F3] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#6757F5] to-[#8C7EFF] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Project Steps Checklist */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171A2B]">
              Execution Steps
            </h3>

            <div className="space-y-3">
              {project.steps.map((step, idx) => {
                const stepDesc = step.description || step.instruction;
                return (
                  <div
                    key={step.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      step.isCompleted
                        ? "bg-[#FAFCFB] border-[#BBF7D0]"
                        : "bg-white border-[#E8E6F3] hover:border-[#6757F5]"
                    }`}
                    data-testid={`project-step-${step.id}`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() =>
                          onStepUpdate(project.id, step.id, { isCompleted: !step.isCompleted })
                        }
                        data-testid={`step-checkbox-${step.id}`}
                        aria-label={`Mark step ${step.title} as ${step.isCompleted ? "incomplete" : "complete"}`}
                        className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                          step.isCompleted
                            ? "bg-[#6757F5] border-[#6757F5] text-white"
                            : "border-[#D0D5DD] bg-white hover:border-[#6757F5]"
                        }`}
                      >
                        {step.isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-[#98A2B3]">Step {idx + 1}</span>
                          <h4
                            className={`text-sm font-bold ${
                              step.isCompleted ? "text-[#171A2B] line-through opacity-75" : "text-[#171A2B]"
                            }`}
                          >
                            {step.title}
                          </h4>
                        </div>
                        {stepDesc && (
                          <p className="text-xs text-[#4A4E69] leading-relaxed">
                            {stepDesc}
                          </p>
                        )}
                        {step.guidanceTip && (
                          <p className="text-[11px] text-[#6757F5] bg-[#F2F1FA] p-2 rounded-lg">
                            💡 {step.guidanceTip}
                          </p>
                        )}

                        {/* Work notes textarea */}
                        <div className="pt-2">
                          <textarea
                            placeholder="Record findings, commands, or thoughts for this step..."
                            value={step.workNotes || ""}
                            onChange={(e) =>
                              onStepUpdate(project.id, step.id, { workNotes: e.target.value })
                            }
                            className="w-full text-xs p-2.5 rounded-xl border border-[#E8E6F3] bg-white focus:outline-none focus:border-[#6757F5] text-[#171A2B] resize-y min-h-[50px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Evidence Artifacts Section */}
          <div className="space-y-3 pt-2 border-t border-[#F2F1FA]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#171A2B]">
                  Portfolio Evidence Artifacts ({project.artifacts.length})
                </h3>
                <p className="text-[11px] text-[#4A4E69]">
                  Attach GitHub repos, Figma prototypes, or document links demonstrating your work.
                </p>
              </div>

              {!showArtifactForm && (
                <button
                  onClick={() => setShowArtifactForm(true)}
                  data-testid="add-artifact-btn"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8E6F3] bg-[#F7F7FD] hover:bg-[#F2F1FA] text-xs font-bold text-[#6757F5] transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Attach Artifact
                </button>
              )}
            </div>

            {/* Artifact form */}
            {showArtifactForm && (
              <form
                onSubmit={handleAddArtifact}
                className="p-4 rounded-2xl bg-[#F7F7FD] border border-[#6757F5]/30 space-y-3 animate-in fade-in"
              >
                <div className="text-xs font-bold text-[#171A2B]">Attach Work Deliverable</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select
                    value={artifactType}
                    onChange={(e) => setArtifactType(e.target.value as ProjectArtifactType)}
                    className="p-2 rounded-xl text-xs border border-[#E8E6F3] bg-white text-[#171A2B]"
                  >
                    <option value="link_github">GitHub Repository</option>
                    <option value="link_figma">Figma Design File</option>
                    <option value="link_document">Google Doc / PDF</option>
                    <option value="link_spreadsheet">Spreadsheet Model</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Artifact Title (e.g., V1 Code Repo)"
                    value={artifactTitle}
                    onChange={(e) => setArtifactTitle(e.target.value)}
                    required
                    className="p-2 rounded-xl text-xs border border-[#E8E6F3] bg-white text-[#171A2B]"
                  />

                  <input
                    type="url"
                    placeholder="https://..."
                    value={artifactUrl}
                    onChange={(e) => setArtifactUrl(e.target.value)}
                    required
                    className="p-2 rounded-xl text-xs border border-[#E8E6F3] bg-white text-[#171A2B]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowArtifactForm(false)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#4A4E69] hover:bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-[#6757F5] text-white text-xs font-bold hover:bg-[#5645E5]"
                  >
                    Save Artifact
                  </button>
                </div>
              </form>
            )}

            {/* Artifacts list */}
            {project.artifacts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.artifacts.map((art) => {
                  const artType = art.type || art.artifactType;
                  const artUrl = art.url || art.urlOrReference;
                  return (
                    <div
                      key={art.id}
                      className="p-3 rounded-xl bg-white border border-[#E8E6F3] flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {getArtifactIcon(artType)}
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#171A2B] truncate">{art.title}</div>
                          <div className="text-[10px] text-[#98A2B3] truncate">{artUrl}</div>
                        </div>
                      </div>
                      <a
                        href={artUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-[#6757F5] hover:bg-[#F7F7FD] flex-shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-[#98A2B3] italic">No artifacts attached yet.</p>
            )}
          </div>

          {/* Reflection Section */}
          {project.reflection ? (
            <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#166534]">
                Completed Reflection
              </span>
              <p className="text-xs text-[#171A2B]">
                <strong>What was learned:</strong>{" "}
                {project.reflection.whatLearned || project.reflection.whatWorkedWell}
              </p>
              {(project.reflection.whatWasChallenging || project.reflection.biggestObstacle) && (
                <p className="text-xs text-[#4A4E69]">
                  <strong>Challenge faced:</strong>{" "}
                  {project.reflection.whatWasChallenging || project.reflection.biggestObstacle}
                </p>
              )}
              {project.reflection.nextCuriosity && (
                <p className="text-xs text-[#4A4E69]">
                  <strong>Next curiosity:</strong> {project.reflection.nextCuriosity}
                </p>
              )}
            </div>
          ) : showReflectionForm ? (
            <form
              onSubmit={handleFinishProject}
              className="p-5 rounded-2xl bg-[#F7F7FD] border border-[#6757F5]/40 space-y-3 animate-in fade-in"
              data-testid="completion-reflection-form"
            >
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#171A2B]">Project Reflection</h4>
                <p className="text-xs text-[#4A4E69]">
                  Summarize what you discovered to validate your experience in your student intelligence profile.
                </p>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="text-xs font-semibold text-[#171A2B] block mb-1">
                    What did you create, test, or learn? *
                  </label>
                  <textarea
                    required
                    value={whatLearned}
                    onChange={(e) => setWhatLearned(e.target.value)}
                    placeholder="Describe your implementation and results..."
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E8E6F3] bg-white text-[#171A2B] min-h-[60px]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#171A2B] block mb-1">
                    What was the hardest or most unexpected friction?
                  </label>
                  <textarea
                    value={whatWasChallenging}
                    onChange={(e) => setWhatWasChallenging(e.target.value)}
                    placeholder="Debugging, math derivation, trade-offs..."
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E8E6F3] bg-white text-[#171A2B] min-h-[50px]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#171A2B] block mb-1">
                    Would you want to explore this domain further?
                  </label>
                  <div className="flex gap-4 text-xs">
                    {(["yes", "maybe", "no"] as const).map((opt) => (
                      <label key={opt} className="inline-flex items-center gap-1.5 cursor-pointer capitalize">
                        <input
                          type="radio"
                          name="wouldPursueFurther"
                          value={opt}
                          checked={wouldPursueFurther === opt}
                          onChange={() => setWouldPursueFurther(opt)}
                          className="accent-[#6757F5]"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#171A2B] block mb-1">
                    What is your next curiosity question?
                  </label>
                  <input
                    type="text"
                    value={nextCuriosity}
                    onChange={(e) => setNextCuriosity(e.target.value)}
                    placeholder="e.g., How does this scale to real production systems?"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E8E6F3] bg-white text-[#171A2B]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReflectionForm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#4A4E69] hover:bg-white"
                >
                  Back to Steps
                </button>
                <button
                  type="submit"
                  data-testid="submit-project-reflection"
                  className="px-5 py-2 rounded-xl bg-[#22C55E] text-white text-xs font-bold hover:bg-[#16A34A] transition-all shadow-xs"
                >
                  Save Reflection & Complete Project
                </button>
              </div>
            </form>
          ) : (
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowReflectionForm(true)}
                data-testid="complete-project-btn"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#171A2B] hover:bg-[#252A40] text-white text-xs font-bold transition-all shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                Mark Project Complete & Reflect
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#F2F1FA] bg-[#F7F7FD] flex items-center justify-between">
          <span className="text-[11px] text-[#4A4E69]">
            Progress is automatically saved to your session.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white border border-[#E8E6F3] text-xs font-bold text-[#171A2B] hover:bg-[#F2F1FA]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
