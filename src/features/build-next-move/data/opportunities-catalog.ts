/**
 * NEXT MOVE AI V2 — FLOW 7: CAREER & EDUCATIONAL OPPORTUNITIES CATALOG
 * 
 * Age-appropriate opportunity directory spanning all 6 academic stages.
 * 
 * Strict Epistemic Mandate:
 * - Clear distinction of Verified Live Listing vs Curated Educational Information vs Prototype Example.
 * - Zero fabricated vacancies, fake employer promises, or guaranteed admissions.
 * - Child-safety protection: Middle schoolers (Classes 4-7) and high schoolers (Classes 8-10)
 *   see enrichment camps, science fairs, and maker festivals; NEVER adult employment/salary posts.
 */

import { type OpportunityItem } from "../types";

export const OPPORTUNITY_CATALOG: OpportunityItem[] = [
  // ===========================================================================
  // 1. CLASSES 4–7: CURIOSITY CAMPS & MAKER ENRICHMENT (NO EMPLOYMENT)
  // ===========================================================================
  {
    id: "opp_c47_tinker_camp",
    title: "National Young Inventors & Maker Showcase",
    organizationName: "Atal Innovation Mission / NITI Aayog (Atal Tinkering Labs)",
    opportunityType: "school_enrichment",
    typeLabel: "School Maker Showcase",
    provenance: "curated_educational",
    stageSuitability: ["classes-4-7", "classes-8-10"],
    locationOrMode: "In-School & Regional Hubs (Pan-India)",
    stipendOrCostDescription: "Free participation through affiliated school innovation labs",
    description: "An annual school-level festival inviting students to display cardboard robotics, eco-friendly models, and creative science projects.",
    eligibilityCriteria: {
      minStageRequired: "classes-4-7",
      prerequisites: ["Enrolled in Classes 4–10 in an affiliated school"],
      isEligibleCurrently: true,
    },
    applicationWindowOrDeadline: "Annual submission cycle (August – November)",
    sourceUrlOrInfo: "Official government educational innovation initiative (aim.gov.in)",
    whatStudentGains: "Hands-on maker experience, feedback from school mentors, and community exhibition certificate.",
    tags: ["Making", "Science", "Curiosity", "Classes 4-7"],
  },
  {
    id: "opp_c47_wildlife_camp",
    title: "Junior Naturalist Summer Nature Camp",
    organizationName: "World Wide Fund for Nature (WWF India) / Nature Clubs",
    opportunityType: "curiosity_camp",
    typeLabel: "Enrichment Nature Camp",
    provenance: "curated_educational",
    stageSuitability: ["classes-4-7"],
    locationOrMode: "Regional Nature Centers & Online Guided Trails",
    stipendOrCostDescription: "Subsidized non-profit registration (fee waivers available upon request)",
    description: "A 5-day experiential nature study program introducing students to bird watching, tree classification, and nature sketching.",
    eligibilityCriteria: {
      minStageRequired: "classes-4-7",
      prerequisites: ["Curious about animals, plants, and outdoor ecosystems; Ages 9–13"],
      isEligibleCurrently: true,
    },
    applicationWindowOrDeadline: "Summer holiday cycles (April – May)",
    sourceUrlOrInfo: "Curated educational non-profit program (wwfindia.org)",
    whatStudentGains: "Observation skills, environmental awareness, and a naturalist field journal.",
    tags: ["Nature", "Wildlife", "Enrichment", "Classes 4-7"],
  },

  // ===========================================================================
  // 2. CLASSES 8–10: FOUNDATIONAL SKILLS, FAIRS & CIVIC COMPETITIONS
  // ===========================================================================
  {
    id: "opp_c810_iris_science_fair",
    title: "IRIS National Science Fair Research Competition",
    organizationName: "Department of Science & Technology (DST) India",
    opportunityType: "school_enrichment",
    typeLabel: "National Science Research Fair",
    provenance: "curated_educational",
    stageSuitability: ["classes-8-10", "classes-11-12"],
    locationOrMode: "National Annual Fair (New Delhi / Regional finals)",
    stipendOrCostDescription: "Free entry for secondary school science project submissions",
    description: "India's premier pre-college science research platform enabling students to present independent empirical research across 21 disciplines.",
    eligibilityCriteria: {
      minStageRequired: "classes-8-10",
      prerequisites: ["Classes 8–12 with an original research project or hypothesis model"],
      isEligibleCurrently: true,
    },
    applicationWindowOrDeadline: "Annual entries close September 30",
    sourceUrlOrInfo: "National science research repository (irisnationalfair.org)",
    whatStudentGains: "Mentorship by university scientists, national exhibition, and international science fair qualification.",
    tags: ["Science", "Research", "Fair", "Classes 8-10"],
  },

  // ===========================================================================
  // 3. CLASSES 11–12: SCHOLARSHIPS, HIGHER ED & SKILL CHALLENGES
  // ===========================================================================
  {
    id: "opp_c1112_inspire_scholarship",
    title: "INSPIRE Scholarship for Higher Science Education (SHE)",
    organizationName: "Ministry of Science & Technology, Government of India",
    opportunityType: "higher_education",
    typeLabel: "Collegiate Merit Scholarship",
    provenance: "curated_educational",
    stageSuitability: ["classes-11-12"],
    locationOrMode: "Pan-India Higher Education Institutes",
    stipendOrCostDescription: "₹80,000 / year (₹60,000 annual scholarship + ₹20,000 summer research grant)",
    description: "National scholarship scheme supporting meritorious Class 12 natural science students pursuing B.Sc / B.S. / Int. M.Sc. in basic sciences.",
    eligibilityCriteria: {
      minStageRequired: "classes-11-12",
      prerequisites: [
        "Class 12 board examination top 1% aggregate in respective State/Central Board",
        "Enrolled in Basic & Natural Science degree programs (Physics, Chem, Math, Bio)",
      ],
      isEligibleCurrently: true,
    },
    applicationWindowOrDeadline: "Annual portal opening: October – December post board results",
    sourceUrlOrInfo: "Official government education portal (online-inspire.gov.in)",
    whatStudentGains: "Substantial educational financial support and summer mentorship at premier research laboratories.",
    tags: ["Scholarship", "Higher Education", "B.Sc", "Classes 11-12"],
  },
  {
    id: "opp_c1112_smart_india_junior",
    title: "Smart India Hackathon (Junior Track)",
    organizationName: "Ministry of Education Innovation Cell (MIC)",
    opportunityType: "skill_program",
    typeLabel: "National Innovation Hackathon",
    provenance: "curated_educational",
    stageSuitability: ["classes-11-12"],
    locationOrMode: "Hybrid / Regional Nodal Centers",
    stipendOrCostDescription: "Free participation with certificates and cash rewards for winning school teams",
    description: "National software and hardware competition for school students to tackle problem statements submitted by government ministries and civic bodies.",
    eligibilityCriteria: {
      minStageRequired: "classes-11-12",
      prerequisites: ["Enrolled in Classes 11–12; teams of 6 students with at least 1 female teammate"],
      isEligibleCurrently: true,
    },
    applicationWindowOrDeadline: "Registration window typically opens July – August annually",
    sourceUrlOrInfo: "Official national hackathon platform (sih.gov.in)",
    whatStudentGains: "Collaborative project delivery, mentorship from software engineers, and national exposure.",
    tags: ["Hackathon", "Problem Solving", "Coding", "Classes 11-12"],
  },

  // ===========================================================================
  // 4. DIPLOMA: APPRENTICESHIPS & INDUSTRIAL TRAINING
  // ===========================================================================
  {
    id: "opp_dip_naps_automation",
    title: "National Apprenticeship Promotion Scheme (NAPS) — Mechatronics Technician",
    organizationName: "Directorate General of Training (DGT) / Manufacturing Council",
    opportunityType: "apprenticeship",
    typeLabel: "Certified Government Apprenticeship",
    provenance: "curated_educational",
    stageSuitability: ["diploma", "degree-engineering"],
    locationOrMode: "Automotive & Manufacturing Clusters (Pune, Chennai, NCR)",
    stipendOrCostDescription: "Prescribed monthly stipend ₹9,000 – ₹13,500 with government co-funding",
    description: "12-month structured on-the-job industrial apprenticeship for polytechnic diploma holders in mechanical, electrical, and mechatronics engineering.",
    eligibilityCriteria: {
      minStageRequired: "diploma",
      prerequisites: [
        "Completed 3-year Polytechnic Diploma in Mechanical/Electrical/Mechatronics",
        "Minimum 18 years of age at contract commencement",
      ],
      isEligibleCurrently: true,
    },
    applicationWindowOrDeadline: "Rolling monthly recruitment through official apprenticeship portal",
    sourceUrlOrInfo: "National Apprenticeship Portal (apprenticeshipindia.gov.in)",
    whatStudentGains: "Government National Apprenticeship Certificate (NAC) and live shop-floor PLC operating credentials.",
    tags: ["Apprenticeship", "NAPS", "Manufacturing", "Diploma"],
  },

  // ===========================================================================
  // 5. DEGREE / ENGINEERING: INTERNSHIPS & RESEARCH FELLOWSHIPS
  // ===========================================================================
  {
    id: "opp_deg_google_summer_code",
    title: "Google Summer of Code (GSoC) — Open-Source Software Fellowship",
    organizationName: "Google Open Source Initiative",
    opportunityType: "internship",
    typeLabel: "Open-Source Engineering Fellowship",
    provenance: "verified_listing",
    stageSuitability: ["degree-engineering", "final-year-grad"],
    locationOrMode: "100% Remote / Global Open Source Organizations",
    stipendOrCostDescription: "Stipend $1,500 – $3,300 USD (tier-based per country purchasing power)",
    description: "An international program pairing university students and developers with open-source software organizations for 12-to-22 week coding projects.",
    eligibilityCriteria: {
      minStageRequired: "degree-engineering",
      prerequisites: [
        "18+ years old at time of registration",
        "Demonstrated familiarity with Git and contribution history in an open-source repo",
      ],
      isEligibleCurrently: true,
    },
    applicationWindowOrDeadline: "Annual contributor application window: March – April",
    sourceUrlOrInfo: "Official global program portal (summerofcode.withgoogle.com)",
    whatStudentGains: "Real-world codebase contributions, 1-on-1 mentorship from senior open-source maintainers, and international engineering portfolio proof.",
    tags: ["Open Source", "Software", "Remote", "Engineering", "Degree"],
  },
  {
    id: "opp_deg_mitacs_globalink",
    title: "Mitacs Globalink Research Internship (GRI)",
    organizationName: "Mitacs & Canadian Universities",
    opportunityType: "research_fellowship",
    typeLabel: "International Research Fellowship",
    provenance: "verified_listing",
    stageSuitability: ["degree-engineering"],
    locationOrMode: "Canadian Universities (Direct Lab Placement)",
    stipendOrCostDescription: "Fully funded: flight, accommodation, health insurance, and weekly living stipend",
    description: "12-week summer research internship for top undergraduate students to conduct cutting-edge research alongside Canadian university professors.",
    eligibilityCriteria: {
      minStageRequired: "degree-engineering",
      prerequisites: [
        "Enrolled in 2nd or 3rd year of a 4-year undergraduate degree program",
        "Minimum CGPA 8.0/10.0 or 80% aggregate",
      ],
      isEligibleCurrently: true,
    },
    applicationWindowOrDeadline: "Annual applications open August – September for following summer",
    sourceUrlOrInfo: "Official international research fellowship portal (mitacs.ca)",
    whatStudentGains: "Academic paper co-authorship opportunities, graduate school pathway eligibility, and laboratory research experience.",
    tags: ["Research", "International", "Fellowship", "Engineering", "Degree"],
  },

  // ===========================================================================
  // 6. FINAL-YEAR / GRADUATES: POLICY FELLOWSHIPS & EARLY-CAREER
  // ===========================================================================
  {
    id: "opp_grad_lamp_fellowship",
    title: "Legislative Assistants to Members of Parliament (LAMP) Fellowship",
    organizationName: "PRS Legislative Research",
    opportunityType: "research_fellowship",
    typeLabel: "Public Policy & Parliamentary Fellowship",
    provenance: "verified_listing",
    stageSuitability: ["final-year-grad"],
    locationOrMode: "New Delhi (In-Person / Parliament House)",
    stipendOrCostDescription: "₹20,000 / month stipend + intensive preparatory policy training",
    description: "A prestigious 10-month fellowship providing young graduates an opportunity to be mentored by Members of Parliament (MPs) across political parties.",
    eligibilityCriteria: {
      minStageRequired: "final-year-grad",
      prerequisites: [
        "Bachelor's degree completed in any academic discipline",
        "Age 25 years or below at the time of application",
      ],
      isEligibleCurrently: true,
    },
    applicationWindowOrDeadline: "Annual application portal opens November – January",
    sourceUrlOrInfo: "Official public policy research portal (prsindia.org/lamp)",
    whatStudentGains: "Direct parliamentary research experience, policy drafting portfolio, and high-impact legislative network.",
    tags: ["Public Policy", "Fellowship", "Government", "Humanities", "Graduate"],
  },
  {
    id: "opp_grad_startup_seed_incubator",
    title: "NSRCEL Early-Stage Social & Tech Venture Incubation",
    organizationName: "IIM Bangalore / NSRCEL",
    opportunityType: "entrepreneurship_incubator",
    typeLabel: "University Startup Incubator",
    provenance: "curated_educational",
    stageSuitability: ["final-year-grad", "degree-engineering"],
    locationOrMode: "Hybrid / IIM Bangalore Campus",
    stipendOrCostDescription: "Equity-free incubation grants up to ₹5,00,000 for selected early-stage ventures",
    description: "A 6-month pre-incubation program for student founders and early graduates developing scalable technology or social-impact prototypes.",
    eligibilityCriteria: {
      minStageRequired: "final-year-grad",
      prerequisites: [
        "A working prototype, user test results, or initial customer traction data",
        "At least one co-founder committed full-time upon graduation",
      ],
      isEligibleCurrently: true,
    },
    applicationWindowOrDeadline: "Cohort admissions open bi-annually: April & October",
    sourceUrlOrInfo: "IIM Bangalore entrepreneurship portal (nsrcel.org)",
    whatStudentGains: "Faculty mentorship, legal incorporation advisory, peer founder network, and angel investor demo days.",
    tags: ["Startup", "Incubator", "Entrepreneurship", "Venture", "Graduate"],
  },
];

