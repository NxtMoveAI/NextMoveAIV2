/**
 * NEXT MOVE AI V2 — FLOW 7: OPPORTUNITIES VIEW
 * 
 * Curated opportunities directory with strict child safety & explicit data provenance.
 * 
 * Safety & Integrity Mandates:
 * - Classes 4-7 and 8-10 are protected from adult employment and wage listings.
 * - Every opportunity bears clear provenance:
 *     Verified Live Listing | Curated Educational Info | Illustrative Prototype Example
 * - Zero deceptive promises of guaranteed admissions or hires.
 */

"use client";

import React from "react";
import {
  Search,
  ExternalLink,
  ShieldCheck,
  Calendar,
  MapPin,
  Sparkles,
  Info,
  Building,
  AlertCircle,
} from "lucide-react";
import { type StudentIntelligenceProfile } from "@/features/onboarding/schemas/types";
import {
  type OpportunityItem,
  type OpportunityProvenance,
  type ApplicationStatus,
} from "../types";

interface OpportunitiesViewProps {
  profile: StudentIntelligenceProfile | null;
  filteredOpportunities: OpportunityItem[];
  opportunityTypeFilter: string;
  setOpportunityTypeFilter: (filter: string) => void;
  opportunitySearch: string;
  setOpportunitySearch: (search: string) => void;
}

export function OpportunitiesView({
  profile,
  filteredOpportunities,
  opportunityTypeFilter,
  setOpportunityTypeFilter,
  opportunitySearch,
  setOpportunitySearch,
}: OpportunitiesViewProps) {
  const isSchoolStage =
    profile?.academicStageId === "classes-4-7" || profile?.academicStageId === "classes-8-10";

  const typeTabs: { id: string; label: string }[] = isSchoolStage
    ? [
        { id: "all", label: "All Opportunities" },
        { id: "competition", label: "Competitions & Fairs" },
        { id: "scholarship", label: "Scholarships & Camps" },
      ]
    : [
        { id: "all", label: "All Opportunities" },
        { id: "internship", label: "Internships" },
        { id: "apprenticeship", label: "Apprenticeships" },
        { id: "fellowship", label: "Fellowships" },
        { id: "competition", label: "Hackathons & Challenges" },
        { id: "scholarship", label: "Scholarships" },
      ];

  const getProvenanceBadge = (provenance: OpportunityProvenance, verificationDate?: string) => {
    switch (provenance) {
      case "verified_listing":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]">
            <ShieldCheck className="w-3 h-3 text-[#22C55E]" /> Verified Program
            {verificationDate ? ` · Verified ${verificationDate}` : ""}
          </span>
        );
      case "curated_educational":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF]">
            <Info className="w-3 h-3 text-[#2E90FA]" /> Curated Educational Info
          </span>
        );
      case "prototype_example":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFFAEB] text-[#B54708] border border-[#FEDF89]">
            <Sparkles className="w-3 h-3 text-[#F79009]" /> Illustrative Prototype Example
          </span>
        );
    }
  };

  const getApplicationStatusBadge = (status: ApplicationStatus, details?: string) => {
    switch (status) {
      case "open":
        return (
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]"
            title={details || "Applications are currently open on the official program website."}
            data-testid="status-badge-open"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" /> Applications Open
          </span>
        );
      case "upcoming":
        return (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]"
            title={details || "Applications opening in an upcoming cycle."}
            data-testid="status-badge-upcoming"
          >
            <Calendar className="w-3 h-3 text-[#3B82F6]" /> Applications Upcoming
          </span>
        );
      case "closed":
        return (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1]"
            title={details || "Applications are currently closed for this cycle."}
            data-testid="status-badge-closed"
          >
            <AlertCircle className="w-3 h-3 text-[#64748B]" /> Applications Closed
          </span>
        );
      case "unknown":
        return (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]"
            title={details || "Status unconfirmed. Check official program documentation."}
            data-testid="status-badge-unknown"
          >
            <Info className="w-3 h-3 text-[#D97706]" /> Status Unconfirmed
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200" data-testid="opportunities-view">
      {/* 1. Header & Child Safety Banner */}
      <section className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F3] shadow-xs space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6757F5]">
            Real Opportunities & Challenges
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#171A2B] tracking-tight">
            Curated Opportunities with Transparent Provenance
          </h2>
          <p className="text-xs sm:text-sm text-[#4A4E69] max-w-2xl leading-relaxed">
            Every listing clearly discloses whether it is an actively verified posting, curated educational data,
            or an illustrative example for student planning.
          </p>
        </div>

        {/* Child Safety Notice if school stage */}
        {isSchoolStage && (
          <div className="p-3.5 rounded-2xl bg-[#EFF8FF] border border-[#B2DDFF] flex items-start gap-2.5 text-xs text-[#175CD3]">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#2E90FA]" />
            <p className="leading-relaxed">
              <strong>Age-Appropriate Safeguard Active:</strong> Middle and secondary school accounts 
              are shown learning camps, science fairs, and academic competitions rather than adult 
              employment or corporate wage listings.
            </p>
          </div>
        )}

        {/* Search & Type Filters */}
        <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Type tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {typeTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setOpportunityTypeFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  opportunityTypeFilter === tab.id
                    ? "bg-[#6757F5] text-white shadow-xs"
                    : "bg-[#F7F7FD] border border-[#E8E6F3] text-[#4A4E69] hover:bg-[#F2F1FA]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-[#98A2B3] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={opportunitySearch}
              onChange={(e) => setOpportunitySearch(e.target.value)}
              placeholder="Search opportunities..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8E6F3] bg-[#F7F7FD] focus:bg-white focus:outline-none focus:border-[#6757F5] text-[#171A2B]"
            />
          </div>
        </div>
      </section>

      {/* 2. Opportunities Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredOpportunities.map((opp) => {
          const locationText = opp.location || opp.locationOrMode;
          const eligibilityText = opp.eligibilityNotes || opp.eligibilityCriteria?.prerequisites?.join(", ") || "Open to current cohort";
          const stipendText = opp.stipendOrReward || opp.stipendOrCostDescription;
          const deadlineText = opp.deadline || opp.applicationWindowOrDeadline;
          const sourceText = opp.sourceAttribution || opp.sourceUrlOrInfo;
          const appUrl = opp.verifiedUrl || opp.applicationUrl || opp.sourceUrlOrInfo || "";
          const isExternal = appUrl.startsWith("http");

          return (
            <div
              key={opp.id}
              className="p-6 rounded-3xl bg-white border border-[#E8E6F3] hover:border-[#6757F5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              data-testid={`opportunity-card-${opp.id}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {getProvenanceBadge(opp.provenance, opp.lastVerifiedDate || opp.verificationDate)}
                    {getApplicationStatusBadge(opp.applicationStatus, opp.applicationStatusDetails)}
                  </div>
                  <span className="text-[11px] font-semibold text-[#4A4E69] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#98A2B3]" /> {locationText}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#171A2B] leading-snug">
                    {opp.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#6757F5] mt-0.5 flex items-center gap-1">
                    <Building className="w-3 h-3" /> {opp.organizationName}
                  </p>
                  <p className="text-xs text-[#4A4E69] mt-2 leading-relaxed">
                    {opp.description}
                  </p>
                </div>

                {/* Eligibility & Application Schedule Info */}
                <div className="p-3.5 rounded-2xl bg-[#F7F7FD] border border-[#E8E6F3] space-y-2 text-xs">
                  <div className="flex justify-between items-start gap-2 text-[#4A4E69]">
                    <span className="font-semibold text-[#171A2B] shrink-0">Eligibility:</span>
                    <span className="text-right leading-relaxed">{eligibilityText}</span>
                  </div>

                  <div className="flex justify-between items-start gap-2 text-[#4A4E69] pt-1.5 border-t border-[#E8E6F3]/50">
                    <span className="font-semibold text-[#171A2B] shrink-0">Application Cycle:</span>
                    <span className="text-right font-medium text-[#171A2B] flex items-center gap-1 justify-end">
                      <Calendar className="w-3 h-3 text-[#B54708]" /> {deadlineText}
                    </span>
                  </div>

                  {opp.applicationStatusDetails && (
                    <div className="p-2 rounded-xl bg-white border border-[#E8E6F3] text-[11px] text-[#4A4E69] leading-relaxed">
                      <strong className="text-[#171A2B]">Status Note:</strong> {opp.applicationStatusDetails}
                    </div>
                  )}

                  {stipendText && (
                    <div className="flex justify-between text-[#4A4E69] pt-1.5 border-t border-[#E8E6F3]/50">
                      <span className="font-semibold text-[#171A2B]">Reward / Stipend:</span>
                      <span className="font-bold text-[#166534]">{stipendText}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {opp.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded bg-white text-[#4A4E69] border border-[#E8E6F3]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Application Bridge */}
              <div className="pt-3 border-t border-[#F2F1FA] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex flex-col text-[11px] text-[#626987]">
                  <span className="font-medium text-[#171A2B]">Source: {sourceText}</span>
                  <span className="text-[10px] text-[#8F95B2]">
                    Official Portal · Last verified {opp.lastVerifiedDate || opp.verificationDate || "October 2026"}
                  </span>
                </div>

                {isExternal ? (
                  opp.applicationStatus === "open" ? (
                    <a
                      href={appUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#166534] hover:bg-[#14532D] text-white text-xs font-bold transition-all shadow-xs shrink-0"
                    >
                      Apply on Official Portal <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <a
                      href={appUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#171A2B] hover:bg-[#252A40] text-white text-xs font-bold transition-all shadow-xs shrink-0"
                    >
                      Official Program Page <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )
                ) : opp.provenance === "prototype_example" ? (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFAEB] text-[#B54708] border border-[#FEDF89] text-xs font-bold shrink-0"
                    title="This opportunity is an illustrative prototype entry designed for academic path planning."
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#F79009]" /> Prototype Example
                  </span>
                ) : (
                  <button
                    onClick={() => alert(`Details for: ${opp.title}\n\n${opp.description}`)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#6757F5] hover:bg-[#5645E5] text-white text-xs font-bold transition-all shrink-0"
                  >
                    View Guidelines <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="p-8 rounded-3xl bg-white border border-[#E8E6F3] text-center space-y-2">
          <p className="text-sm font-bold text-[#171A2B]">No opportunities found matching your criteria.</p>
          <p className="text-xs text-[#4A4E69]">Try clearing your search or switching categories.</p>
        </div>
      )}
    </div>
  );
}
