/**
 * NEXT MOVE AI V2 — USE SETTINGS HOOK
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { studentSettingsStore } from "../services/settings-store";
import { type StudentSettingsState, type LearningPacePreference } from "../types";

export function useSettings() {
  const [state, setState] = useState<StudentSettingsState>(studentSettingsStore.getState());
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [guardianNoticeOpen, setGuardianNoticeOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = studentSettingsStore.subscribe(() => {
      setState(studentSettingsStore.getState());
    });
    return unsubscribe;
  }, []);

  const toggleCompanionMemory = useCallback((enabled: boolean) => {
    studentSettingsStore.setCompanionMemory(enabled);
  }, []);

  const togglePathwaysPersonalization = useCallback((enabled: boolean) => {
    studentSettingsStore.setPathwaysPersonalization(enabled);
  }, []);

  const toggleReducedMotion = useCallback((enabled: boolean) => {
    studentSettingsStore.setReducedMotion(enabled);
  }, []);

  const toggleHighContrast = useCallback((enabled: boolean) => {
    studentSettingsStore.setHighContrast(enabled);
  }, []);

  const setLearningPace = useCallback((pace: LearningPacePreference) => {
    studentSettingsStore.setLearningPace(pace);
  }, []);

  const handleExportJSON = useCallback(() => {
    studentSettingsStore.downloadPrototypeExport();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  }, []);

  return {
    state,
    downloadSuccess,
    guardianNoticeOpen,
    setGuardianNoticeOpen,
    toggleCompanionMemory,
    togglePathwaysPersonalization,
    toggleReducedMotion,
    toggleHighContrast,
    setLearningPace,
    handleExportJSON,
  };
}

