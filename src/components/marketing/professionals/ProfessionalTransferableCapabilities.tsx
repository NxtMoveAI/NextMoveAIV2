"use client";

import React, { useState } from "react";
import {
  Layers,
  MessageSquare,
  BarChart3,
  GitBranch,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

interface TransferableCluster {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  sourceDomains: string[];
  targetApplications: string[];
  concreteScenario: {
    origin: string;
    targetRole: string;
    sharedMechanism: string;
    leveragePoint: string;
  };
}

const CAPABILITY_CLUSTERS: TransferableCluster[] = [
  {
    id: "communication",
    name: "Communication & Stakeholder Translation",
    icon: MessageSquare,
    tagline: "Translating complex reality into clarity across diverse stakeholders",
    sourceDomains: [
      "Customer Support & Success",
      "Classroom Teaching & Education",
      "Field Operations & Logistics",
      "B2B Sales & Account Management",
      "Cross-Functional Project Coordination",
    ],
    targetApplications: [
      "Product Management & Requirements Drafting",
      "Technical Customer Onboarding Architecture",
      "Executive Solutions Consulting & Pre-Sales",
      "Change Management & Internal Training",
    ],
    concreteScenario: {
      origin: "High School Teacher / Educator",
      targetRole: "Customer Education or Instructional Designer",
      sharedMechanism:
        "Breaking multi-step conceptual topics into accessible mental models, anticipating student/user misconceptions, and verifying understanding with diagnostic checkpoints.",
      leveragePoint:
        "You already know how to make difficult concepts digestible; learning the modern SaaS LMS or interactive authoring tool is simply a platform change, not a fundamental capability restart.",
    },
  },
  {
    id: "data-interpretation",
    name: "Data Interpretation & Analytical Rigor",
    icon: BarChart3,
    tagline: "Transforming raw records into defensible business judgment",
    sourceDomains: [
      "Commercial Accounting & Finance",
      "Retail & E-commerce Operations",
      "Digital Marketing & Growth",
      "Academic & Clinical Research",
      "Industrial Quality Inspection",
    ],
    targetApplications: [
      "Business Intelligence & SQL Analytics",
      "Revenue Operations & Pipeline Modeling",
      "Product Analytics & User Behavior Tracking",
      "Risk & Compliance Assessment",
    ],
    concreteScenario: {
      origin: "Branch Accountant / Retail Store Auditor",
      targetRole: "Business Intelligence Analyst",
      sharedMechanism:
        "Reconciling ledger entries, understanding revenue leakage, and identifying unexpected variance patterns across thousands of transaction rows.",
      leveragePoint:
        "Junior analysts often write fancy queries that produce meaningless metrics because they do not understand double-entry bookkeeping or commercial unit economics. Your real-world domain rigor is the rarest part of the puzzle.",
    },
  },
  {
    id: "process-improvement",
    name: "Process Optimization & Operational Workflow",
    icon: GitBranch,
    tagline: "Pinpointing bottlenecks, reducing waste, and building reliable systems",
    sourceDomains: [
      "Manufacturing & Shop-Floor Assembly",
      "Supply Chain & Warehouse Logistics",
      "Office Administration & Clerical Ops",
      "Hospital & Clinic Scheduling",
      "Customer Service Escalation Teams",
    ],
    targetApplications: [
      "Digital Workflow Automation & Low-Code Systems",
      "IT Service Management (ITSM) Coordination",
      "Supply Chain Systems Optimization",
      "Operational Risk & Standard Operating Procedures (SOP)",
    ],
    concreteScenario: {
      origin: "Warehouse Operations Supervisor",
      targetRole: "Logistics Systems & Automation Specialist",
      sharedMechanism:
        "Mapping buffer queues, calculating cycle times, coordinating physical staging bins, and eliminating idle human waiting time.",
      leveragePoint:
        "Software engineers build automated dispatch algorithms, but field supervisors know why drivers skip scanning steps or where barcodes get smudged. That ground truth is indispensable.",
    },
  },
  {
    id: "people-leadership",
    name: "People Coordination & Crisis Resilience",
    icon: Users,
    tagline: "Aligning human teams, de-escalating friction, and delivering under pressure",
    sourceDomains: [
      "Branch Banking & Store Management",
      "Healthcare Nursing & Ward Coordination",
      "Event Planning & Hospitality",
      "Site Civil Engineering & Contractors",
      "Team Leaders across any discipline",
    ],
    targetApplications: [
      "Agile Scrum Master / Delivery Lead",
      "People Operations & Talent Enablement",
      "Vendor & Partner Operations Manager",
      "Operations Program Manager",
    ],
    concreteScenario: {
      origin: "Branch Bank Operations Manager",
      targetRole: "Operations Program Manager / Delivery Lead",
      sharedMechanism:
        "Balancing regulatory compliance, customer emotions during system outages, and motivating front-line tellers under tight daily reconciliation targets.",
      leveragePoint:
        "Agile terminology (sprints, standups, retros) can be learned in two weeks; leading stressed humans through an unplanned service incident without panicking takes years to cultivate.",
    },
  },
];

export function ProfessionalTransferableCapabilities() {
  const [activeClusterId, setActiveClusterId] = useState<string>("communication");
  const activeCluster =
    CAPABILITY_CLUSTERS.find((c) => c.id === activeClusterId) || CAPABILITY_CLUSTERS[0];

  return (
    <section id="transferable-capabilities" className="py-16 lg:py-24 bg-[#FAF9F6] border-b border-[#E8E6F3] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DBEAFE] shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>Transferable Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171A2B] tracking-tight">
            Your experience is{" "}
            <span className="text-[#2563EB]">
              not wasted.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#626987] leading-relaxed">
            Many working professionals worry that moving toward modern technology or emerging responsibilities means throwing away their entire career history. Next Move AI illustrates how real-world capabilities carry forward across industries.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E6F3] text-[11px] text-[#626987] shadow-xs">
            <AlertCircle className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Illustrative capability connections · Not verified individual assessments or eligibility decisions</span>
          </div>
        </div>

        {/* 4 Cluster Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-10">
          {CAPABILITY_CLUSTERS.map((cluster) => {
            const isSelected = cluster.id === activeClusterId;
            const Icon = cluster.icon;

            return (
              <button
                key={cluster.id}
                onClick={() => setActiveClusterId(cluster.id)}
                className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  isSelected
                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-[#2563EB]/20 scale-[1.02]"
                    : "bg-white text-[#474D66] border-[#E8E6F3] hover:border-[#BFDBFE] hover:text-[#171A2B]"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold leading-snug">
                    {cluster.name}
                  </h3>
                  <p
                    className={`text-[11px] mt-1 line-clamp-2 ${
                      isSelected ? "text-blue-100" : "text-[#7B82A0]"
                    }`}
                  >
                    {cluster.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Cluster Breakdown Container */}
        <div className="rounded-3xl bg-white border-2 border-[#E8E6F3] p-6 sm:p-8 lg:p-10 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#F0EEF8] mb-8">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                <activeCluster.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                  Capability Architecture
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#171A2B] tracking-tight">
                  {activeCluster.name}
                </h3>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E8E6F3] text-xs font-semibold text-[#626987] self-start sm:self-auto">
              Real-World Bridge
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Where You Cultivated It */}
            <div className="lg:col-span-6 space-y-3">
              <h4 className="text-xs font-bold text-[#626987] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Where This Capability Is Already Built (Traditional Work):</span>
              </h4>
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E6F3] space-y-2">
                {activeCluster.sourceDomains.map((src, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#373D54]">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>{src}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Where It Applies in Modern Work */}
            <div className="lg:col-span-6 space-y-3">
              <h4 className="text-xs font-bold text-[#626987] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                <span>How It Translates to High-Value Emerging Roles:</span>
              </h4>
              <div className="p-4 rounded-2xl bg-[#EFF6FF]/40 border border-[#DBEAFE] space-y-2">
                {activeCluster.targetApplications.map((tgt, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#1E40AF]">
                    <ArrowRight className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>{tgt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deep Concrete Scenario Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FAF9F6] via-white to-[#EFF6FF]/50 border-2 border-[#DBEAFE]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E6F3] mb-4">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                Concrete Transition Case Study
              </span>
              <div className="text-xs text-[#626987] flex items-center gap-2">
                <span className="font-bold text-[#171A2B]">{activeCluster.concreteScenario.origin}</span>
                <span>→</span>
                <span className="font-bold text-[#2563EB]">{activeCluster.concreteScenario.targetRole}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-xs font-bold text-[#171A2B] uppercase tracking-wider mb-1">
                  The Shared Underlying Mechanism:
                </h5>
                <p className="text-xs sm:text-sm text-[#474D66] leading-relaxed">
                  {activeCluster.concreteScenario.sharedMechanism}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1">
                  Why You Have an Advantage:
                </h5>
                <p className="text-xs sm:text-sm text-[#1E40AF] leading-relaxed">
                  {activeCluster.concreteScenario.leveragePoint}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ethical Transparency Disclaimer */}
        <div className="p-4 rounded-2xl bg-white border border-[#E8E6F3] text-center max-w-3xl mx-auto flex items-center justify-center gap-2 text-xs text-[#626987]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
          <span>
            <strong>Honest Capability Principle:</strong> We do not fabricate quantitative transferable skill percentages (e.g. &ldquo;84% match&rdquo;). Real career mobility depends on demonstrably applying past judgment to new challenges.
          </span>
        </div>
      </div>
    </section>
  );
}
