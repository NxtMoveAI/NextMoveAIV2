# Next Move AI V2 — Backend API Contract Reconciliation & Architectural Alignment

**Author:** Antigravity Principal QA Architect & Senior Frontend Engineer  
**Recipient:** Havyas (Backend Engineering Lead)  
**Status:** APPROVED & AUDIT-VERIFIED  
**Date:** October 30, 2026  
**Related Documents:**
- `docs/API_CONTRACTS_HAVYAS.md` (Flow 2: Entry, Signup & Sign In)
- `docs/API_CONTRACTS_HAVYAS_FLOW3.md` (Flow 3: Adaptive Onboarding & Starting Profile)

---

## 1. Purpose of this Document

During the comprehensive end-to-end audit of Next Move AI V2 (Flows 1, 2, and 3), several architectural interfaces and behavioral edge cases were audited across automated Playwright suites, responsive layout checks, and security boundaries.

This reconciliation document resolves inconsistencies between initial design drafts and the verified frontend implementation, providing Havyas with an unambiguous, production-ready specification for the backend integration.

---

## 2. Key Architectural Reconciliations

### 2.1 Minor Consent & Privacy Minimization (Reconciling Student-Side Guardian Email)

#### The Ambiguity
An early Flow 2 test inventory mentioned: *"Guardian email is captured during student signup."* Conversely, modern privacy-by-design standards (India DPDP Act 2023, COPPA, GDPR-K) advocate minimizing minor data collection and preventing unverified minors from submitting third-party email addresses without parental awareness.

#### The Reconciliation & Verified Implementation
1. **Under 13 (Strict Guardian-Led Flow):**
   - Learners under 13 are **not** permitted to create independent student accounts or submit personal data on `/signup/student`.
   - The UI immediately routes them to `/signup/parent` with clear explanatory guidance: *"Under 13 learners explore Next Move AI through a parent- or guardian-managed space."*
   - As a result, the student signup endpoint `POST /api/v1/auth/register/student` will never receive an under-13 payload.
2. **Ages 13–17 (Secondary / Teen Flow):**
   - Teenagers register their own student accounts with standard credentials.
   - To prevent unverified third-party email harvesting, **guardian email is not collected as a mandatory field during student signup**.
   - Instead, the backend marks the user's `accessStatus` as `"teen_guardian_required"`.
   - Guardian linking occurs through a mutual authorization flow:
     - The student is routed to `/verify?type=guardian_pending` where they can view a secure authorization invite code or request a parent link.
     - The parent registers independently on `/signup/parent` (with role `parent_guardian`) and initiates or approves the link via `POST /api/v1/guardian/link-student` inside an authenticated session.
3. **Endpoint Schema Reconciliation (`POST /api/v1/auth/register/student`):**
   - The field `guardianEmail` is marked **OPTIONAL**. If provided, it initiates a verification invite; if omitted, the account is created in `teen_guardian_required` status awaiting parental linkage.

---

### 2.2 Authentication, Session Cookies & Token Hygiene

#### The Guardrail
Under no circumstances should the client store JWTs or credentials in `localStorage` or `sessionStorage`, nor should authentication tokens be exposed in URL query parameters.

#### Specification for Havyas:
1. **HTTP-Only Cookies:**
   - The backend auth handler must set an HTTP-only, secure, `SameSite=Lax` session cookie (`__Host-nextmove-session`).
   - Session lifetime: 1 hour access, sliding refresh token up to 14 days.
2. **URL Parameter Discipline:**
   - The URL parameter `?stage={stageId}` passed from Flow 2 to `/onboarding` is strictly an optimistic UX continuity hint.
   - The backend `/api/v1/onboarding/state` endpoint must derive the user's validated stage and user identity exclusively from the authenticated session cookie.
   - If a student modifies the URL parameter (e.g., from `classes-11-12` to `final-year-grad`), the backend session claims maintain authority until the student explicitly changes their stage through the verified onboarding stage switcher.

---

### 2.3 Evidence Taxonomy & Psychometric Boundary Integrity

#### The Guardrail
Next Move AI explicitly rejects unsupported psychometric scores, arbitrary IQ numbers, and pseudo-scientific career-fit percentages.

#### Specification for Havyas:
1. **Evidence Taxonomy Enums:**
   The backend schema must store all student skills and capabilities under the strict 4-tier evidence model:
   - `self_reported`: Stated by the student during onboarding without practical demonstration.
   - `practised`: Attempted in an interactive micro-exploration challenge.
   - `demonstrated`: Validated by real submitted code, writing, or practical tasks evaluated against rubric criteria (Flow 4+).
   - `not_assessed`: Skipped, unexplored, or pending areas.
2. **Challenge Scoring Rule:**
   - Completing an onboarding micro-challenge (e.g., database query bottleneck or cash flow diagnosis) records the skill at the `practised` level.
   - It **must never** be stored as `demonstrated` or converted into a generalized "career fit" score.
   - Skipping an activity awards `not_assessed` with zero score deductions or penalty flags.

---

### 2.4 Idempotency & Concurrency in Flow 3

#### Specification for Havyas:
1. **Incremental Draft Saving (`PUT /api/v1/onboarding/draft`):**
   - The frontend sends periodic or step-change drafts with a numeric `version` property.
   - The backend must enforce optimistic locking: if `incoming_version < db_version`, return `409 CONFLICT` with the latest server state.
2. **Completion Idempotency (`POST /api/v1/onboarding/complete`):**
   - When the student confirms their draft profile on `/onboarding` Step 8, the frontend calls `/api/v1/onboarding/complete`.
   - Rapid double-clicks or repeated network attempts must be handled idempotently:
     - First request: transitions profile from `draft` to `confirmed`, creates the Flow 4 dashboard baseline, returns `201 Created` with `nextHandoffRoute: "/dashboard/student"`.
     - Subsequent requests with the same `profileId`: return `200 OK` with the existing confirmed profile. No duplicate records or errors.

---

### 2.5 Profile Handoff Schema to Flow 4

The confirmed profile structure handed off to Flow 4 (Student Home Dashboard) conforms to the verified 7-section model:

```json
{
  "profileId": "sip_classes-11-12_m29f8c",
  "userId": "usr_stu_98127391823",
  "academicStage": "classes-11-12",
  "academicStartingPoint": {
    "currentClass": "Class 12",
    "stream": "Science (PCM)",
    "currentSubjects": ["Physics", "Chemistry", "Mathematics", "Computer Science"],
    "curiosityNote": "Exploring both engineering paths and pure computing projects."
  },
  "interestsAndCuriosity": {
    "primaryCategories": ["Technology & Systems", "Analysis & Problem Solving"],
    "subInterests": ["Software Development", "Data Analytics"],
    "customInterest": "Open source developer tools",
    "isStillExploring": false
  },
  "whereYouStand": {
    "demonstratedStrengths": [],
    "practisedSkills": [
      {
        "skillName": "Logic & Systems Thinking",
        "evidenceLevel": "practised",
        "activitySource": "act_science_tradeoff"
      }
    ],
    "selfReportedSkills": [
      {
        "skillName": "Python & Basic Algorithms",
        "evidenceLevel": "self_reported"
      }
    ],
    "notAssessedAreas": [
      "Production Systems Engineering",
      "Advanced Calculus Applications"
    ]
  },
  "currentQuestionsAndGoals": {
    "clarityLevel": "somewhat_clear",
    "primaryQuestion": "Compare computer science degree vs applied software projects.",
    "urgentDeadlines": []
  },
  "possibilitiesToExplore": [
    {
      "id": "pos_cs_btech",
      "title": "B.Tech in Computer Science / Software Engineering",
      "stageRelevance": "Core technical route with entrance exams (JEE, state CETs).",
      "whySuggested": "Matches self-reported interest in Technology & Systems.",
      "whatRemainsUnknown": "Preferred engineering specializations and entrance exam strategy."
    }
  ],
  "firstNextMove": {
    "id": "fnm_high_compare_degrees",
    "title": "Compare B.Tech vs BCA vs Applied BSc Paths",
    "estimatedMinutes": 15,
    "category": "exploration",
    "whyThisFirst": "Directly addresses your primary question on educational paths."
  },
  "reviewStatus": {
    "isConfirmed": true,
    "confirmedAt": "2026-10-30T17:27:00Z",
    "lastEditedSection": null
  }
}
```

---

## 3. Summary of Action Items for Backend (Havyas)

| # | Item | Backend Implementation Responsibility | Status |
|---|---|---|---|
| 1 | **Session Auth** | Issue secure HTTP-only cookie `__Host-nextmove-session`; derive student identity from cookie claims. | Ready for integration |
| 2 | **Minor Consent** | Block direct under-13 student registration; enforce guardian link verification for teen cohort (13–17). | Aligned with DPDP |
| 3 | **Evidence Model** | Enforce 4-tier taxonomy (`self_reported`, `practised`, `demonstrated`, `not_assessed`); reject arbitrary psychometric scores. | Ready for schema migration |
| 4 | **Draft Concurrency**| Implement versioned draft updates with optimistic locking (`409 CONFLICT`). | Ready for integration |
| 5 | **Completion Idempotency** | Guarantee idempotent behavior on `POST /api/v1/onboarding/complete`. | Ready for integration |
| 6 | **Flow 4 Schema** | Ingest verified 7-section Starting Profile JSON schema into student dashboard tables. | Ready for Flow 4 |

---
*Verified and aligned with Next Move AI V2 Frontend Test Suites (100% pass across 39 Playwright tests).*

