/**
 * NEXT MOVE AI V2 — ACTIVITY REFLECTION & UPLOAD SECTION
 * 
 * Displayed below the activity completion state when all steps are completed:
 * - Title: "What Did You Do?"
 * - Option A: Write about the activity (what created, steps, discovery, difficulties)
 * - Option B: Upload completed activity (PNG, JPG, PDF, DOC/DOCX) + evidence + optional description
 * - AI Analysis: Identifies What You Learned, Skills Practised, Your Discovery, and Your Next Challenge
 * - Direct "Check My Growth" button navigating to /dashboard/student/growth
 * - Saves submission and AI analysis to Firestore (users/{uid})
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  PenTool,
  UploadCloud,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Lightbulb,
  Target,
  ShieldCheck,
  BookOpen,
  X,
  Loader2,
} from "lucide-react";
import {
  type StudentNextMoveActivity,
  type ActivitySubmission,
  type ActivitySubmissionFile,
  type ActivityAIAnalysis,
} from "@/lib/firestore-service";
import { useStudentHome } from "../hooks/useStudentHome";

interface ActivityReflectionSectionProps {
  activity: StudentNextMoveActivity;
  onSubmissionComplete?: (submission: ActivitySubmission) => void;
}

export function ActivityReflectionSection({
  activity,
  onSubmissionComplete,
}: ActivityReflectionSectionProps) {
  const { userProfile, saveActivitySubmission } = useStudentHome();

  // If already analyzed in Firestore, initialize with existing submission
  const savedSubmission =
    activity.submission || userProfile?.activitySubmissions?.[activity.activityId] || null;

  const [activeTab, setActiveTab] = useState<"write" | "upload">(
    savedSubmission?.uploadedFile && !savedSubmission?.writtenReflection ? "upload" : "write"
  );

  const [writtenText, setWrittenText] = useState(savedSubmission?.writtenReflection || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDescription, setFileDescription] = useState(
    savedSubmission?.uploadedFile?.description || ""
  );
  const [existingFile] = useState<ActivitySubmissionFile | null>(
    savedSubmission?.uploadedFile || null
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ActivityAIAnalysis | null>(
    savedSubmission?.aiAnalysis || null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Max 15MB
      if (file.size > 15 * 1024 * 1024) {
        setErrorMsg("File is too large. Please upload a file smaller than 15MB.");
        return;
      }
      setSelectedFile(file);
      setErrorMsg(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSubmitAndAnalyze = async () => {
    setErrorMsg(null);

    const hasText = writtenText.trim().length > 0;
    const hasNewFile = selectedFile !== null;
    const hasPriorFile = existingFile !== null;

    if (!hasText && !hasNewFile && !hasPriorFile) {
      setErrorMsg("Please write a few words about what you created or select a file to upload.");
      return;
    }

    setIsAnalyzing(true);

    try {
      // 1. Prepare file metadata
      let filePayload: {
        fileName: string;
        fileType: string;
        fileSize: number;
        description?: string;
        base64Data?: string;
      } | null = null;

      if (selectedFile) {
        filePayload = {
          fileName: selectedFile.name,
          fileType: selectedFile.type,
          fileSize: selectedFile.size,
          description: fileDescription.trim() || undefined,
        };
      } else if (existingFile) {
        filePayload = {
          fileName: existingFile.fileName,
          fileType: existingFile.fileType,
          fileSize: existingFile.fileSize,
          description: fileDescription.trim() || existingFile.description,
        };
      }

      // 2. Call server-side AI analysis API
      const res = await fetch("/api/ai/analyze-work", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activityId: activity.activityId,
          activityTitle: activity.title,
          activityDescription: activity.description,
          studentClass: userProfile?.currentClass || "Class 6",
          academicStage: userProfile?.academicStage || "classes-4-7",
          writtenReflection: writtenText.trim(),
          uploadedFile: filePayload,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Could not analyze submission. Please try again.");
        setIsAnalyzing(false);
        return;
      }

      const aiAnalysis: ActivityAIAnalysis = data.analysis;
      setAnalysisResult(aiAnalysis);

      // 3. Assemble submission document
      const submissionDoc: ActivitySubmission = {
        activityId: activity.activityId,
        activityTitle: activity.title,
        completionDetails: {
          completedStepIds: activity.completedStepIds || [],
          totalSteps: activity.steps?.length || 5,
          completedAt: activity.completedAt || new Date().toISOString(),
        },
        writtenReflection: writtenText.trim() || undefined,
        uploadedFile: filePayload
          ? {
              fileName: filePayload.fileName,
              fileType: filePayload.fileType,
              fileSize: filePayload.fileSize,
              uploadedAt: new Date().toISOString(),
              description: filePayload.description,
            }
          : null,
        submittedAt: new Date().toISOString(),
        aiAnalysis,
        skillsIdentified: aiAnalysis.skillsPracticed || [],
        learningOutcomes: aiAnalysis.whatYouLearned || activity.learningOutcome,
        suggestedNextChallenge: aiAnalysis.nextChallenge || "",
      };

      // 4. Persist to Firestore under authenticated user profile
      await saveActivitySubmission(submissionDoc);

      if (onSubmissionComplete) {
        onSubmissionComplete(submissionDoc);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMsg("Something went wrong while analyzing your work. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div
      id="activity-reflection-section"
      data-testid="activity-reflection-section"
      className="p-5 sm:p-7 rounded-3xl bg-[#FBFBFE] border border-[#DDD8FE] space-y-6 shadow-xs animate-in fade-in duration-300"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E6F3] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6757F5] animate-pulse" />
            <h3 className="text-base sm:text-lg font-black text-[#171A2B] tracking-tight">
              What Did You Do?
            </h3>
          </div>
          <p className="text-xs text-[#626987] leading-relaxed">
            Share what you created or discovered to receive personalized AI learning insights and track your skills.
          </p>
        </div>

        {analysisResult && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-xs font-bold self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Analyzed by AI</span>
          </span>
        )}
      </div>

      {/* Mode Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8E6F3] pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("write")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "write"
              ? "bg-[#6757F5] text-white shadow-xs"
              : "text-[#626987] hover:text-[#171A2B] hover:bg-[#F4F3F8]"
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Option A – Write About It</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "upload"
              ? "bg-[#6757F5] text-white shadow-xs"
              : "text-[#626987] hover:text-[#171A2B] hover:bg-[#F4F3F8]"
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Option B – Upload Your Work</span>
        </button>
      </div>

      {/* Tab A: Write About It */}
      {activeTab === "write" && (
        <div className="space-y-3 animate-in fade-in duration-150">
          <label htmlFor="reflection-textarea" className="block text-xs font-bold text-[#171A2B]">
            Describe what you made, how you did it, or what surprised you:
          </label>
          <textarea
            id="reflection-textarea"
            data-testid="reflection-textarea"
            rows={4}
            value={writtenText}
            onChange={(e) => setWrittenText(e.target.value)}
            placeholder="e.g., I designed a 3-scene comic about two space detectives solving a lost satellite mystery. I discovered that sketching character expressions first made the story much easier to write..."
            className="w-full p-4 rounded-2xl border border-[#DDD8FE] bg-white text-xs sm:text-sm text-[#171A2B] placeholder:text-[#98A2B3] focus:outline-hidden focus:ring-2 focus:ring-[#6757F5]/30 focus:border-[#6757F5] transition-all resize-y leading-relaxed"
          />
          <p className="text-[11px] text-[#626987]">
            Tip: You can mention what you found tricky, what worked well, or any fun discoveries you made!
          </p>
        </div>
      )}

      {/* Tab B: Upload Work */}
      {activeTab === "upload" && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <label className="block text-xs font-bold text-[#171A2B]">
            Upload drawings, photos of models, written work, or screenshots:
          </label>

          {/* Upload Drop Zone / Input */}
          <div className="relative border-2 border-dashed border-[#DDD8FE] hover:border-[#6757F5] bg-white rounded-2xl p-6 text-center transition-all">
            <input
              type="file"
              id="activity-file-input"
              data-testid="activity-file-input"
              accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf,.doc,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="space-y-2 pointer-events-none">
              <div className="w-10 h-10 rounded-xl bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center mx-auto">
                <UploadCloud className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-[#171A2B]">
                Click or drag & drop your completed project here
              </p>
              <p className="text-[11px] text-[#626987]">
                Supports PNG, JPG, PDF, DOC, DOCX up to 15MB
              </p>
            </div>
          </div>

          {/* Selected File Card */}
          {(selectedFile || existingFile) && (
            <div className="p-3.5 rounded-2xl bg-white border border-[#DDD8FE] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#F4F3F8] text-[#6757F5] flex items-center justify-center shrink-0">
                  {selectedFile?.type.startsWith("image/") || existingFile?.fileType.startsWith("image/") ? (
                    <ImageIcon className="w-4 h-4" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#171A2B] truncate">
                    {selectedFile ? selectedFile.name : existingFile?.fileName}
                  </p>
                  <p className="text-[10px] text-[#626987]">
                    {selectedFile
                      ? `${(selectedFile.size / 1024).toFixed(1)} KB`
                      : existingFile
                      ? `${(existingFile.fileSize / 1024).toFixed(1)} KB (Saved)`
                      : ""}
                  </p>
                </div>
              </div>

              {selectedFile && (
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1 rounded-lg text-[#98A2B3] hover:text-[#D92D20] hover:bg-[#FEE4E2] transition-colors"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Optional File Description */}
          <div className="space-y-1.5">
            <label htmlFor="file-description" className="block text-[11px] font-bold text-[#626987]">
              Optional note about this upload:
            </label>
            <input
              id="file-description"
              type="text"
              value={fileDescription}
              onChange={(e) => setFileDescription(e.target.value)}
              placeholder="e.g. Photo of the cardboard machine prototype after step 4"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD8FE] bg-white text-xs text-[#171A2B] placeholder:text-[#98A2B3] focus:outline-hidden focus:border-[#6757F5]"
            />
          </div>
        </div>
      )}

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-[#FEF3F2] border border-[#FECDCA] flex items-center gap-2.5 text-xs text-[#B42318] animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submit / Analyze Button */}
      {!analysisResult && (
        <div className="pt-2">
          <button
            type="button"
            onClick={handleSubmitAndAnalyze}
            disabled={isAnalyzing}
            data-testid="submit-reflection-btn"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#6757F5] hover:bg-[#5342E8] text-white text-xs font-bold shadow-md shadow-[#6757F5]/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI is analyzing your work...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Submit & Analyze with AI</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* AI ANALYSIS RESULTS CARD */}
      {/* --------------------------------------------------------------------- */}
      {analysisResult && (
        <div
          data-testid="ai-analysis-results"
          className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DDD8FE] shadow-sm space-y-5 animate-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center gap-2 pb-2 border-b border-[#F2F1FA]">
            <div className="w-7 h-7 rounded-lg bg-[#EDEAFF] text-[#6757F5] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-[#171A2B]">
                AI Learning Analysis
              </h4>
              <p className="text-[10px] text-[#626987]">
                Insights generated from your submitted work
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. What You Learned */}
            <div className="p-4 rounded-xl bg-[#F7F6FF] border border-[#DDD8FE]/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#6757F5]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>What You Learned</span>
              </div>
              <p className="text-xs text-[#31364F] leading-relaxed">
                {analysisResult.whatYouLearned}
              </p>
            </div>

            {/* 2. Skills You Practised */}
            <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#059669]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Skills You Practised</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {analysisResult.skillsPracticed.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white text-[#027A48] border border-[#A7F3D0]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Your Discovery */}
            <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#D97706]">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Your Discovery</span>
              </div>
              <p className="text-xs text-[#92400E] leading-relaxed">
                {analysisResult.discovery}
              </p>
            </div>

            {/* 4. Your Next Challenge */}
            <div className="p-4 rounded-xl bg-[#EFF8FF] border border-[#B9E6FE] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0284C7]">
                <Target className="w-3.5 h-3.5" />
                <span>Your Next Challenge</span>
              </div>
              <p className="text-xs text-[#0369A1] leading-relaxed">
                {analysisResult.nextChallenge}
              </p>
            </div>
          </div>

          {/* Action Footer: Connect to My Growth */}
          <div className="pt-3 border-t border-[#F2F1FA] flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/dashboard/student/growth"
              data-testid="check-my-growth-btn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold transition-all shadow-md shadow-[#059669]/20 transform hover:-translate-y-0.5"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Check My Growth</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setAnalysisResult(null)}
              className="text-[11px] font-semibold text-[#626987] hover:text-[#171A2B] transition-colors"
            >
              Update or submit another note
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
