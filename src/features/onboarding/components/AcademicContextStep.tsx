/**
 * NEXT MOVE AI V2 — STAGE B: ACADEMIC CONTEXT
 * 
 * Dynamic, stage-specific educational context questions.
 * Strictly asks only relevant questions without generic forms or mark-ranking.
 */

"use client";

import React from "react";
import { ArrowLeft, ArrowRight, GraduationCap, Check } from "lucide-react";
import { type AcademicStageId } from "@/data/landing-demo";
import {
  type AcademicContextData,
  type Classes4to7Context,
  type Classes8to10Context,
  type Classes11to12Context,
  type DiplomaContext,
  type DegreeEngineeringContext,
  type FinalYearGradContext,
} from "../schemas/types";
import {
  DEGREE_PROGRAM_OPTIONS,
  DEGREE_BRANCH_OPTIONS,
  DIPLOMA_BRANCH_OPTIONS,
  STREAM_11_12_OPTIONS,
} from "../data/questions";

interface AcademicContextStepProps {
  stageId: AcademicStageId;
  academicContext: AcademicContextData;
  onUpdate: (context: AcademicContextData) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AcademicContextStep({
  stageId,
  academicContext,
  onUpdate,
  onNext,
  onBack,
}: AcademicContextStepProps) {
  // Render specific sub-form based on stageId
  const renderStageForm = () => {
    switch (stageId) {
      // -----------------------------------------------------------------------
      // 1. Classes 4-7
      // -----------------------------------------------------------------------
      case "classes-4-7": {
        const data = (academicContext.data as Classes4to7Context) || {
          currentClass: "Class 6",
          favoriteSchoolActivities: ["Drawing & Art"],
        };

        const classOptions = ["Class 4", "Class 5", "Class 6", "Class 7"] as const;
        const activityOptions = [
          "Drawing & Art",
          "Science Experiments & Puzzles",
          "Storytelling & Reading",
          "Coding & Games",
          "Building Things / Crafts",
          "Music & Performance",
        ];

        return (
          <div className="space-y-6 text-left">
            <div>
              <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider mb-2">
                Which class are you in right now?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {classOptions.map((cls) => {
                  const isSelected = data.currentClass === cls;
                  return (
                    <button
                      key={cls}
                      type="button"
                      onClick={() =>
                        onUpdate({
                          type: "classes-4-7",
                          data: { ...data, currentClass: cls },
                        })
                      }
                      className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                        isSelected
                          ? "bg-[#6757F5] text-white border-[#6757F5] shadow-md shadow-[#6757F5]/20"
                          : "bg-white text-[#171A2B] border-[#DDD8FE] hover:border-[#6757F5]/50"
                      }`}
                    >
                      {cls}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider mb-2">
                What school activities make you smile? (Select any you like)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activityOptions.map((act) => {
                  const isSelected = data.favoriteSchoolActivities.includes(act);
                  return (
                    <button
                      key={act}
                      type="button"
                      onClick={() => {
                        const next = isSelected
                          ? data.favoriteSchoolActivities.filter((a) => a !== act)
                          : [...data.favoriteSchoolActivities, act];
                        onUpdate({
                          type: "classes-4-7",
                          data: { ...data, favoriteSchoolActivities: next },
                        });
                      }}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? "bg-[#EDEAFF] text-[#5342E8] border-[#6757F5] font-bold"
                          : "bg-white text-[#31364F] border-[#E8E6F3] hover:border-[#DDD8FE]"
                      }`}
                    >
                      <span>{act}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#6757F5]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }

      // -----------------------------------------------------------------------
      // 2. Classes 8-10
      // -----------------------------------------------------------------------
      case "classes-8-10": {
        const data = (academicContext.data as Classes8to10Context) || {
          currentClass: "Class 9",
          subjectInterests: ["Mathematics"],
          streamCuriosity: "Exploring all",
        };

        const classOptions = ["Class 8", "Class 9", "Class 10"] as const;
        const subjects = [
          "Mathematics",
          "Science (Physics & Chem)",
          "Biology & Nature",
          "Computers & Coding",
          "Social Science & History",
          "Languages & Literature",
          "Visual Arts & Design",
        ];

        return (
          <div className="space-y-6 text-left">
            <div>
              <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider mb-2">
                Current Class
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {classOptions.map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() =>
                      onUpdate({
                        type: "classes-8-10",
                        data: { ...data, currentClass: cls },
                      })
                    }
                    className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                      data.currentClass === cls
                        ? "bg-[#6757F5] text-white border-[#6757F5] shadow-md shadow-[#6757F5]/20"
                        : "bg-white text-[#171A2B] border-[#DDD8FE] hover:border-[#6757F5]/50"
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider mb-2">
                Which subjects do you find engaging? (Choose any)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {subjects.map((sub) => {
                  const isSelected = data.subjectInterests.includes(sub);
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => {
                        const next = isSelected
                          ? data.subjectInterests.filter((s) => s !== sub)
                          : [...data.subjectInterests, sub];
                        onUpdate({
                          type: "classes-8-10",
                          data: { ...data, subjectInterests: next },
                        });
                      }}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? "bg-[#EDEAFF] text-[#5342E8] border-[#6757F5] font-bold"
                          : "bg-white text-[#31364F] border-[#E8E6F3] hover:border-[#DDD8FE]"
                      }`}
                    >
                      <span>{sub}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#6757F5]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {data.currentClass === "Class 10" && (
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#DDD8FE] space-y-2">
                <span className="text-xs font-bold text-[#6757F5] uppercase tracking-wider block">
                  Optional: 11th Stream Curiosity
                </span>
                <p className="text-xs text-[#626987]">
                  You don&apos;t have to lock in a decision. Which general direction are you most curious to explore?
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {["Science", "Commerce", "Arts/Humanities", "Vocational", "Exploring all"].map((stm) => (
                    <button
                      key={stm}
                      type="button"
                      onClick={() =>
                        onUpdate({
                          type: "classes-8-10",
                          data: {
                            ...data,
                            streamCuriosity: stm as Classes8to10Context["streamCuriosity"],
                          },
                        })
                      }
                      className={`p-2 rounded-lg border text-xs font-bold transition-all text-center ${
                        data.streamCuriosity === stm
                          ? "bg-[#6757F5] text-white border-[#6757F5]"
                          : "bg-white text-[#171A2B] border-[#DDD8FE]"
                      }`}
                    >
                      {stm}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }

      // -----------------------------------------------------------------------
      // 3. Classes 11-12
      // -----------------------------------------------------------------------
      case "classes-11-12": {
        const data = (academicContext.data as Classes11to12Context) || {
          currentClass: "Class 12",
          stream: "Science (PCM)",
          currentSubjects: ["Physics", "Chemistry", "Mathematics"],
        };

        return (
          <div className="space-y-6 text-left">
            <div>
              <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider mb-2">
                Current Class
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {(["Class 11", "Class 12"] as const).map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() =>
                      onUpdate({
                        type: "classes-11-12",
                        data: { ...data, currentClass: cls },
                      })
                    }
                    className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                      data.currentClass === cls
                        ? "bg-[#6757F5] text-white border-[#6757F5] shadow-md shadow-[#6757F5]/20"
                        : "bg-white text-[#171A2B] border-[#DDD8FE] hover:border-[#6757F5]/50"
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider mb-2">
                Current Stream or Subject Combination
              </label>
              <p className="text-xs text-[#626987] mb-2">
                We support Science (PCM/PCB/PCMB), Commerce, Humanities, Vocational, and flexible curricula.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {STREAM_11_12_OPTIONS.map((strm) => {
                  const isSelected = data.stream === strm;
                  return (
                    <button
                      key={strm}
                      type="button"
                      onClick={() =>
                        onUpdate({
                          type: "classes-11-12",
                          data: { ...data, stream: strm },
                        })
                      }
                      className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? "bg-[#EDEAFF] text-[#5342E8] border-[#6757F5] font-bold"
                          : "bg-white text-[#31364F] border-[#E8E6F3] hover:border-[#DDD8FE]"
                      }`}
                    >
                      <span>{strm}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#6757F5]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }

      // -----------------------------------------------------------------------
      // 4. Diploma
      // -----------------------------------------------------------------------
      case "diploma": {
        const data = (academicContext.data as DiplomaContext) || {
          branch: "Computer Engineering / IT",
          currentYear: "2nd Year",
          practicalFocus: [],
          postDiplomaAspiration: "Lateral Entry (B.Tech / B.E.)",
        };

        return (
          <div className="space-y-6 text-left">
            <div>
              <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider mb-2">
                Diploma Branch / Field
              </label>
              <select
                value={data.branch}
                onChange={(e) =>
                  onUpdate({
                    type: "diploma",
                    data: { ...data, branch: e.target.value },
                  })
                }
                className="w-full p-3 rounded-xl border border-[#DDD8FE] bg-white text-xs font-semibold text-[#171A2B] focus:outline-none focus:ring-2 focus:ring-[#6757F5]"
              >
                {DIPLOMA_BRANCH_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider mb-2">
                Current Year
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["1st Year", "2nd Year", "3rd Year (Final Year)"] as const).map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() =>
                      onUpdate({
                        type: "diploma",
                        data: { ...data, currentYear: yr },
                      })
                    }
                    className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                      data.currentYear === yr
                        ? "bg-[#6757F5] text-white border-[#6757F5]"
                        : "bg-white text-[#171A2B] border-[#DDD8FE]"
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider mb-2">
                Post-Diploma Next Step Curiosity
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(
                  [
                    "Lateral Entry (B.Tech / B.E.)",
                    "Industry Technical Role",
                    "Entrepreneurship",
                    "Undecided / Exploring",
                  ] as const
                ).map((asp) => (
                  <button
                    key={asp}
                    type="button"
                    onClick={() =>
                      onUpdate({
                        type: "diploma",
                        data: { ...data, postDiplomaAspiration: asp },
                      })
                    }
                    className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                      data.postDiplomaAspiration === asp
                        ? "bg-[#EDEAFF] text-[#5342E8] border-[#6757F5] font-bold"
                        : "bg-white text-[#31364F] border-[#E8E6F3]"
                    }`}
                  >
                    <span>{asp}</span>
                    {data.postDiplomaAspiration === asp && (
                      <Check className="w-4 h-4 text-[#6757F5]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      }

      // -----------------------------------------------------------------------
      // 5. Degree / Engineering
      // -----------------------------------------------------------------------
      case "degree-engineering": {
        const data = (academicContext.data as DegreeEngineeringContext) || {
          degreeProgram: "BE / B.Tech",
          branchOrMajor: "Computer Science & Engineering",
          currentYear: "3rd Year",
          currentFocusAreas: [],
        };

        return (
          <div className="space-y-6 text-left">
            <div>
              <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider mb-2">
                Degree / Program
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {DEGREE_PROGRAM_OPTIONS.map((deg) => (
                  <button
                    key={deg}
                    type="button"
                    onClick={() =>
                      onUpdate({
                        type: "degree-engineering",
                        data: { ...data, degreeProgram: deg },
                      })
                    }
                    className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                      data.degreeProgram === deg
                        ? "bg-[#6757F5] text-white border-[#6757F5]"
                        : "bg-white text-[#171A2B] border-[#DDD8FE]"
                    }`}
                  >
                    {deg}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider mb-2">
                Branch or Major
              </label>
              <select
                value={data.branchOrMajor}
                onChange={(e) =>
                  onUpdate({
                    type: "degree-engineering",
                    data: { ...data, branchOrMajor: e.target.value },
                  })
                }
                className="w-full p-3 rounded-xl border border-[#DDD8FE] bg-white text-xs font-semibold text-[#171A2B] focus:outline-none focus:ring-2 focus:ring-[#6757F5]"
              >
                {DEGREE_BRANCH_OPTIONS.map((br) => (
                  <option key={br} value={br}>
                    {br}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider mb-2">
                Current Year of Study
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(["1st Year", "2nd Year", "3rd Year", "4th Year / Final"] as const).map(
                  (yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() =>
                        onUpdate({
                          type: "degree-engineering",
                          data: { ...data, currentYear: yr },
                        })
                      }
                      className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                        data.currentYear === yr
                          ? "bg-[#6757F5] text-white border-[#6757F5]"
                          : "bg-white text-[#171A2B] border-[#DDD8FE]"
                      }`}
                    >
                      {yr}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        );
      }

      // -----------------------------------------------------------------------
      // 6. Final Year / Grad
      // -----------------------------------------------------------------------
      case "final-year-grad":
      default: {
        const data = (academicContext.data as FinalYearGradContext) || {
          completedDegree: "B.Tech Computer Science",
          specialization: "Software Systems",
          transitionStage: "Seeking Direct Industry / Tech Role",
          timelinePreference: "Medium-term (3-12 months)",
        };

        return (
          <div className="space-y-6 text-left">
            <div>
              <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider mb-2">
                Current / Completed Course & Specialization
              </label>
              <input
                type="text"
                value={data.completedDegree}
                onChange={(e) =>
                  onUpdate({
                    type: "final-year-grad",
                    data: { ...data, completedDegree: e.target.value },
                  })
                }
                placeholder="e.g. B.Tech Computer Science, BCom Economics, BSc Physics"
                className="w-full p-3 rounded-xl border border-[#DDD8FE] bg-white text-xs font-semibold text-[#171A2B] focus:outline-none focus:ring-2 focus:ring-[#6757F5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6757F5] uppercase tracking-wider mb-2">
                Current Transition Direction
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(
                  [
                    "Preparing for Master's / Higher Ed",
                    "Seeking Direct Industry / Tech Role",
                    "Building a Startup / Venture",
                    "Undecided / Evaluating Paths",
                  ] as const
                ).map((stg) => (
                  <button
                    key={stg}
                    type="button"
                    onClick={() =>
                      onUpdate({
                        type: "final-year-grad",
                        data: { ...data, transitionStage: stg },
                      })
                    }
                    className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                      data.transitionStage === stg
                        ? "bg-[#EDEAFF] text-[#5342E8] border-[#6757F5] font-bold"
                        : "bg-white text-[#31364F] border-[#E8E6F3]"
                    }`}
                  >
                    <span>{stg}</span>
                    {data.transitionStage === stg && (
                      <Check className="w-4 h-4 text-[#6757F5]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-8 sm:py-10 flex flex-col justify-center">
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#DDD8FE] shadow-xl text-center space-y-6">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFF] text-[#6757F5] text-xs font-bold uppercase tracking-wider border border-[#DDD8FE]">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Stage B • Academic Context</span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#171A2B] tracking-tight">
            Tell us about your current studies
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#626987]">
            This helps Next Move AI tailor all future explorations to your actual educational stage.
          </p>
        </div>

        {/* Dynamic Context Form */}
        <div className="pt-2">{renderStageForm()}</div>

        {/* Navigation Buttons */}
        <div className="pt-6 border-t border-[#E8E6F3] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E8E6F3] text-xs font-bold text-[#626987] hover:bg-[#FAF9F6] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold shadow-md shadow-[#6757F5]/20 transition-all"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
