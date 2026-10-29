# Next Move AI V2 — Flow 3 Backend API Contracts Specification

**Author:** Antigravity Frontend Architect & UX Team  
**Recipient:** Havyas (Backend Engineering Lead)  
**Status:** PROPOSED & FRONTEND-ALIGNED  
**Release Target:** Flow 3 (Adaptive Student Onboarding & Initial Student Intelligence Profile)  
**Parent Contract:** Aligns with `docs/API_CONTRACTS_HAVYAS.md` (Flow 2)

---

## Executive Summary

This document specifies the 8 core API endpoints required for **Flow 3: Complete Adaptive Student Onboarding & Initial Student Intelligence Profile**. 

Flow 3 takes the validated academic stage confirmed in Flow 2 (`classes-4-7`, `classes-8-10`, `classes-11-12`, `diploma`, `degree-engineering`, `final-year-grad`), facilitates an adaptive, one-question-at-a-time discovery journey, captures self-reported familiarity under strict evidence taxonomies, hosts optional stage-tailored practical micro-explorations, and produces an editable initial **Student Intelligence Profile** that hands off to Flow 4 (Student Home Dashboard).

---

## 1. Architectural Guardrails & Security Policies

1. **Backend Authorization & Identity:**  
   The frontend never provides or dictates the `studentId`. All requests rely on HTTP-only authenticated session cookies issued during Flow 2 sign-in. The server derives the authenticated user ID and role directly from the verified session claims.
2. **Minor Protection & DPDP Compliance:**  
   Under-18 learners (specifically under 13 for strict guardian accounts) must have verified parental/guardian authorization before persistent profiling data is finalized.
3. **Evidence Taxonomy Integrity:**  
   All skills and competencies captured during onboarding are stored under explicit evidence levels:
   - `self_reported`: Stated by the student without formal evaluation.
   - `practised`: Attempted in an interactive micro-challenge.
   - `demonstrated`: Validated by real submitted code, writing, or practical tasks against defined rubrics.
   - `not_assessed`: Skipped or unexplored areas (never recorded as 'weak' or deficient).
   Under no circumstances shall the backend convert self-reported familiarity into definitive psychometric scores, IQ numbers, or permanent career prescriptions.
4. **Student Approval Supremacy:**  
   AI-generated suggestions or knowledge retrievals must never silently overwrite student-approved profile selections. All recommendations must explicitly disclose **Why Suggested** and **What Remains Unknown**.
5. **Idempotent Completion Semantics:**  
   The onboarding completion endpoint (`POST /api/v1/onboarding/complete`) is fully idempotent. Retries or duplicate submissions return the existing confirmed profile without creating duplicate records or state corruption.
6. **Optimistic Concurrency & Versioning:**  
   All profile updates require an `etag` or `version` integer to prevent race conditions during multi-tab or mobile/desktop transitions.

---

## 2. Flow 3 Endpoint Summary Matrix

| # | Endpoint Proposal | Method | Primary Purpose | Auth Required |
|---|---|---|---|---|
| **1** | `/api/v1/onboarding/state` | `GET` | Retrieve existing onboarding draft or active step | Session Cookie (Student) |
| **2** | `/api/v1/onboarding/questions` | `GET` | Fetch dynamic, stage-specific question definitions | Session Cookie (Student) |
| **3** | `/api/v1/onboarding/draft` | `PUT` | Incrementally save onboarding progress and answers | Session Cookie (Student) |
| **4** | `/api/v1/onboarding/activity-attempt` | `POST` | Record an interactive micro-exploration attempt | Session Cookie (Student) |
| **5** | `/api/v1/onboarding/profile/review` | `GET` | Compile draft Student Intelligence Starting Profile | Session Cookie (Student) |
| **6** | `/api/v1/onboarding/profile/update` | `PUT` | Update student-edited fields in starting profile | Session Cookie (Student) |
| **7** | `/api/v1/onboarding/complete` | `POST` | Finalize onboarding and confirm starting profile | Session Cookie (Student) |
| **8** | `/api/v1/onboarding/profile/confirmed` | `GET` | Fetch confirmed profile for Flow 4 handoff | Session Cookie (Student) |

---

## 3. Detailed Endpoint Specifications

### 3.1 Get Onboarding State
- **Endpoint:** `GET /api/v1/onboarding/state`
- **Headers:** `Cookie: session_token=...`
- **Response 200 OK:**
  ```json
  {
    "onboardingStatus": "in_progress",
    "stageId": "classes-11-12",
    "currentStep": "interests",
    "completedSteps": ["welcome", "academic", "clarity"],
    "version": 3,
    "draftData": {
      "academicContext": {
        "type": "classes-11-12",
        "data": {
          "currentClass": "Class 12",
          "stream": "Science (PCM)",
          "currentSubjects": ["Physics", "Chemistry", "Mathematics", "Computer Science"]
        }
      },
      "clarity": {
        "clarityLevel": "somewhat_clear",
        "primaryHelpReason": "Compare computer science degree vs applied software projects."
      }
    },
    "updatedAt": "2026-10-29T10:15:00Z"
  }
  ```
- **Error Codes:**
  - `401 UNAUTHORIZED`: No valid session found.
  - `403 FORBIDDEN`: User is not a student or guardian consent pending.

---

### 3.2 Retrieve Stage Questions
- **Endpoint:** `GET /api/v1/onboarding/questions?stage={stageId}`
- **Query Parameters:**
  - `stage`: Academic stage ID (`classes-4-7`, `classes-8-10`, `classes-11-12`, `diploma`, `degree-engineering`, `final-year-grad`).
- **Response 200 OK:**
  ```json
  {
    "stageId": "degree-engineering",
    "welcome": {
      "headline": "Let's begin by understanding you.",
      "subheadline": "Let's understand what you've learned, what you've built, and where you'd like to grow.",
      "stageNote": "Capabilities, Skills & Projects"
    },
    "academicFields": [
      {
        "fieldId": "degreeProgram",
        "label": "Degree / Program",
        "options": ["BCA", "BBA", "BCom", "BA", "BSc", "BE / B.Tech", "Other"]
      },
      {
        "fieldId": "currentYear",
        "label": "Current Year",
        "options": ["1st Year", "2nd Year", "3rd Year", "4th Year / Final"]
      }
    ],
    "microActivity": {
      "id": "act_api_bottleneck",
      "type": "debugging_or_data",
      "title": "Engineering Inspection: The N+1 Database Query Bottleneck",
      "estimatedMinutes": 5
    }
  }
  ```

---

### 3.3 Save or Update Onboarding Draft
- **Endpoint:** `PUT /api/v1/onboarding/draft`
- **Headers:**
  - `Cookie: session_token=...`
  - `If-Match: "version-number"` (concurrency lock)
- **Request Body:**
  ```json
  {
    "currentStep": "starting-point",
    "stageId": "classes-11-12",
    "academicContext": {
      "type": "classes-11-12",
      "data": {
        "currentClass": "Class 12",
        "stream": "Science (PCM)"
      }
    },
    "clarity": {
      "clarityLevel": "somewhat_clear",
      "primaryHelpReason": "Evaluate engineering entrance exams vs software portfolio paths."
    },
    "interests": {
      "selectedCategoryIds": ["technology", "analysis_problem_solving"],
      "selectedSubInterestIds": ["tech_programming", "ana_data_analytics"],
      "customInterestText": "Open source developer tools",
      "isStillExploring": false
    },
    "version": 3
  }
  ```
- **Response 200 OK:**
  ```json
  {
    "success": true,
    "version": 4,
    "savedAt": "2026-10-29T10:20:00Z"
  }
  ```
- **Error Codes:**
  - `409 CONFLICT`: Version mismatch. Client must re-fetch state.
  - `400 VALIDATION_FAILED`: Invalid stage or missing required fields.

---

### 3.4 Record Micro-Exploration Attempt
- **Endpoint:** `POST /api/v1/onboarding/activity-attempt`
- **Request Body:**
  ```json
  {
    "activityId": "act_api_bottleneck",
    "attempted": true,
    "selectedOptionId": "opt_1",
    "retriesCount": 0,
    "clientTimestamp": "2026-10-29T10:25:00Z"
  }
  ```
- **Response 200 OK:**
  ```json
  {
    "recorded": true,
    "outcome": "completed",
    "isCorrect": true,
    "evidenceAwarded": {
      "skillName": "Backend Architectural Efficiency & Database Query Optimization",
      "evidenceLevel": "practised",
      "evidenceSource": "Micro-Exploration Challenge (act_api_bottleneck)"
    },
    "feedback": "Outstanding! Replacing the loop query with a batch lookup avoids the N+1 latency penalty."
  }
  ```

---

### 3.5 Review Starting Profile
- **Endpoint:** `GET /api/v1/onboarding/profile/review`
- **Response 200 OK:**
  Returns the complete, structured 7-section Student Intelligence Starting Profile including `academicStartingPoint`, `interestsAndCuriosity`, `whereYouStand`, `currentQuestionsAndGoals`, `possibilitiesToExplore`, `firstNextMove`, and `reviewStatus`.

---

### 3.6 Complete Onboarding (Idempotent)
- **Endpoint:** `POST /api/v1/onboarding/complete`
- **Request Body:**
  ```json
  {
    "profileId": "sip_classes-11-12_m29f8c",
    "studentConfirmed": true,
    "firstNextMoveId": "fnm_high_compare_degrees",
    "clientConfirmedAt": "2026-10-29T10:30:00Z"
  }
  ```
- **Response 200 OK (or 201 Created):**
  ```json
  {
    "success": true,
    "profileId": "sip_classes-11-12_m29f8c",
    "status": "confirmed",
    "confirmedAt": "2026-10-29T10:30:01Z",
    "nextHandoffRoute": "/dashboard/student"
  }
  ```
- **Idempotency Rule:** If invoked again with the same profile ID, returns the exact same 200 OK response without regenerating or re-saving.

---

## 4. Frontend State & Error Handling Matrix

| Frontend Scenario | Expected API Error | User-Facing Actionable Resolution |
|---|---|---|
| Incomplete academic stage | `400 INVALID_STAGE` | Prompt student to select valid stage from 6 supported variants. |
| Session token expired | `401 SESSION_EXPIRED` | Show respectful notification: "Session paused. Please sign in to save your draft." |
| Minor consent pending | `403 GUARDIAN_PENDING` | Redirect to guardian verification notice screen (`/verify?type=guardian_pending`). |
| Network offline | Network error / `503` | Preserve local form state. Show "Offline — answers kept in memory. Click Retry." |
| Version collision | `409 CONFLICT` | Merge non-conflicting sections, prompt student before overwriting. |
| Duplicate complete call | Handled idempotently | Seamless transition directly to `/dashboard/student`. |

---

*End of API Contracts Specification for Flow 3.*
