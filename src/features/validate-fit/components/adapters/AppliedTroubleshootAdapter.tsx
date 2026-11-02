/**
 * NEXT MOVE AI V2 — APPLIED TROUBLESHOOT ADAPTER
 * 
 * Interactive adapter for industrial PLC automation, hardware circuits,
 * and Linux server diagnostic triages.
 */

"use client";

import React, { useState } from "react";
import { Wrench, CheckCircle2, AlertTriangle, Activity, Search } from "lucide-react";
import { type AppliedTroubleshootContent } from "../../types";

interface AppliedTroubleshootAdapterProps {
  content: AppliedTroubleshootContent;
  onSelectFault: (faultId: string) => void;
  onSaveDiagnosticsNotes: (notes: string) => void;
  initialFaultId?: string;
  initialNotes?: string;
}

export function AppliedTroubleshootAdapter({
  content,
  onSelectFault,
  onSaveDiagnosticsNotes,
  initialFaultId,
  initialNotes = "",
}: AppliedTroubleshootAdapterProps) {
  const [selectedFaultId, setSelectedFaultId] = useState<string | undefined>(initialFaultId);
  const [notes, setNotes] = useState(initialNotes);

  function handlePick(id: string) {
    setSelectedFaultId(id);
    onSelectFault(id);
  }

  function handleNotesChange(text: string) {
    setNotes(text);
    onSaveDiagnosticsNotes(text);
  }

  return (
    <div className="space-y-6">
      {/* System Description */}
      <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#F0EEF8] space-y-2 text-xs">
        <span className="font-bold text-[#6757F5] uppercase tracking-wider text-[10px] block">
          Target System Specification
        </span>
        <p className="text-[#171A2B] font-semibold leading-relaxed">{content.systemDescription}</p>
        <p className="text-[#626987] leading-relaxed">{content.contextSummary}</p>
      </div>

      {/* Diagnostic Instrument Logs or Readings */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-black uppercase tracking-wider text-[#171A2B] flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-[#059669]" />
          <span>Diagnostic Instrument Telemetry & Logs</span>
        </h3>
        <div className="p-4 rounded-2xl bg-[#171A2B] text-white font-mono text-xs space-y-1.5 shadow-inner">
          {content.diagnosticLogsOrReadings.map((reading, idx) => (
            <div key={idx} className="flex items-start gap-2 leading-relaxed">
              <span className="text-[#059669] shrink-0 font-bold">&gt;</span>
              <span className={reading.includes("FAIL") || reading.includes("FAULT") ? "text-[#F87171] font-bold" : "text-[#E2E8F0]"}>
                {reading}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fault Isolation Hypotheses */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-[#171A2B] flex items-center gap-1.5">
          <Search className="w-4 h-4 text-[#6757F5]" />
          <span>Select the Confirmed Root Cause</span>
        </h3>

        <div className="space-y-3">
          {content.possibleFaults.map((fault) => {
            const isSelected = selectedFaultId === fault.id;
            return (
              <div
                key={fault.id}
                onClick={() => handlePick(fault.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#F7F6FF] border-[#6757F5] shadow-xs ring-1 ring-[#6757F5]"
                    : "bg-white border-[#E8E6F3] hover:border-[#6757F5]/50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-3.5 h-3.5 text-[#6757F5]" />
                      <h4 className="text-xs font-bold text-[#171A2B]">{fault.component}</h4>
                    </div>
                    <p className="text-xs text-[#474D66] leading-relaxed">{fault.hypothesis}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? "bg-[#6757F5] border-[#6757F5] text-white"
                        : "border-[#8C93AD] bg-white"
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {isSelected && (
                  <div
                    className={`mt-3 p-3 rounded-xl text-xs flex items-start gap-2 ${
                      fault.isRootCause
                        ? "bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]"
                        : "bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]"
                    }`}
                  >
                    {fault.isRootCause ? (
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-0.5">
                      <strong className="block">
                        {fault.isRootCause ? "Root Cause Confirmed" : "Disproved by Diagnostic Readings"}
                      </strong>
                      <p className="text-[11px] leading-relaxed">{fault.verificationStep}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Technician Maintenance Log */}
      <div className="space-y-2">
        <label
          htmlFor="troubleshoot-notes"
          className="text-xs font-black uppercase tracking-wider text-[#171A2B] block"
        >
          Maintenance Action & Recovery Log
        </label>
        <textarea
          id="troubleshoot-notes"
          rows={3}
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Document the corrective repair action you would take (e.g. 'Replaced severed 24V signal line and verified 24V at PLC DI-04...')"
          className="w-full p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] text-xs text-[#171A2B] placeholder:text-[#8C93AD] focus:outline-none focus:ring-2 focus:ring-[#6757F5] transition-all resize-y"
        />
      </div>
    </div>
  );
}
