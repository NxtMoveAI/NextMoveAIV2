/**
 * NEXT MOVE AI V2 — ADAPTIVE QUESTION RENDERER
 * 
 * Central controller component mounting the active onboarding stage
 * and coordinating step transitions.
 */

"use client";

import React from "react";
import { type AcademicStageId } from "@/data/landing-demo";
import { useOnboardingState } from "../hooks/useOnboardingState";
import { OnboardingLayout } from "./OnboardingLayout";
import { OnboardingProgress } from "./OnboardingProgress";
import { WelcomeStep } from "./WelcomeStep";
import { AcademicContextStep } from "./AcademicContextStep";
import { ClarityStep } from "./ClarityStep";
import { InterestExplorer } from "./InterestExplorer";
import { StartingPointStep } from "./StartingPointStep";
import { ActivityPromptStep } from "./ActivityPromptStep";
import { MicroExploration } from "./MicroExploration";
import { ReflectionStep } from "./ReflectionStep";
import { StartingProfile } from "./StartingProfile";
import { compileStudentIntelligenceProfile } from "../services/onboarding-adapter";

interface AdaptiveQuestionRendererProps {
  initialStageId: AcademicStageId;
  isDemoMode?: boolean;
}

export function AdaptiveQuestionRenderer({
  initialStageId,
  isDemoMode = true,
}: AdaptiveQuestionRendererProps) {
  const {
    state,
    currentActivity,
    currentStepIndex,
    totalSteps,
    progressPercentage,
    goToStep,
    goNext,
    goBack,
    setAcademicStage,
    updateAcademicContext,
    updateClarity,
    toggleInterestCategory,
    toggleSubInterest,
    setCustomInterest,
    updateSkillFamiliarity,
    acceptOptionalActivity,
    skipOptionalActivity,
    submitActivityChoice,
    retryActivity,
    updateReflection,
    confirmStartingProfile,
    isConfirmed,
    confirmedId,
  } = useOnboardingState(initialStageId, isDemoMode);

  // Compile profile if at profile step
  const activeProfile = state.profile || compileStudentIntelligenceProfile(state);

  return (
    <OnboardingLayout stageId={state.stageId} isDemoMode={isDemoMode}>
      {/* Progress tracker */}
      <OnboardingProgress
        currentStep={state.currentStep}
        currentStepIndex={currentStepIndex}
        totalSteps={totalSteps}
        progressPercentage={progressPercentage}
        stageId={state.stageId}
        onSelectStage={setAcademicStage}
      />

      {/* Step Router */}
      <div className="flex-1 flex flex-col justify-center py-6">
        {state.currentStep === "welcome" && (
          <WelcomeStep
            stageId={state.stageId}
            onContinue={goNext}
            onSelectStage={setAcademicStage}
          />
        )}

        {state.currentStep === "academic" && (
          <AcademicContextStep
            stageId={state.stageId}
            academicContext={state.academicContext}
            onUpdate={updateAcademicContext}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {state.currentStep === "clarity" && (
          <ClarityStep
            stageId={state.stageId}
            clarity={state.clarity}
            onUpdate={updateClarity}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {state.currentStep === "interests" && (
          <InterestExplorer
            stageId={state.stageId}
            interests={state.interests}
            onToggleCategory={toggleInterestCategory}
            onToggleSubInterest={toggleSubInterest}
            onSetCustomInterest={setCustomInterest}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {state.currentStep === "starting-point" && (
          <StartingPointStep
            stageId={state.stageId}
            skills={state.startingSkills}
            onUpdateSkill={updateSkillFamiliarity}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {state.currentStep === "activity-prompt" && (
          <ActivityPromptStep
            stageId={state.stageId}
            activity={currentActivity}
            onAccept={acceptOptionalActivity}
            onSkip={skipOptionalActivity}
            onBack={goBack}
          />
        )}

        {state.currentStep === "activity" && (
          <MicroExploration
            stageId={state.stageId}
            activity={currentActivity}
            attempt={state.activityAttempt}
            onSubmitChoice={submitActivityChoice}
            onRetry={retryActivity}
            onSkip={skipOptionalActivity}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {state.currentStep === "reflection" && (
          <ReflectionStep
            reflection={state.reflection}
            onUpdate={updateReflection}
            onNext={() => goToStep("profile")}
            onBack={goBack}
          />
        )}

        {state.currentStep === "profile" && (
          <StartingProfile
            profile={activeProfile}
            stageId={state.stageId}
            isConfirmed={isConfirmed}
            confirmedId={confirmedId}
            isSubmitting={state.isSubmitting}
            onEditStep={goToStep}
            onConfirmProfile={confirmStartingProfile}
          />
        )}
      </div>
    </OnboardingLayout>
  );
}
