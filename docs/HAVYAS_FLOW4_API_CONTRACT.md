# Next Move AI V2 — Flow 4 Frontend-to-Backend API Contract
**Target Backend Engineer:** Havyas  
**Module:** Personalized Student Home Dashboard (`/dashboard/student`)  
**Product:** Next Move AI (Navlore AI Technologies LLP)  
**Specification Version:** 1.0.0 (Flow 4 Baseline)  
**Philosophy:** *"We don't decide careers; we enable clarity."*  

---

## 1. Executive Summary & Purpose

This document outlines the exact HTTP API contracts, schemas, headers, error formats, and behavioral requirements for Flow 4 (Personalized Student Home Dashboard). In the current frontend implementation, this is completely mocked via `src/features/student-home/services/home-adapter.ts` and in-memory state store `studentProfileStore.ts`. 

When Havyas connects the live backend, these contracts will serve as the drop-in integration point without requiring frontend UI rewrites.

---

## 2. Authentication & Session Context

All endpoints must be protected behind JWT / bearer authentication established in Flow 2:
```http
Authorization: Bearer <access_token>
X-Student-Id: <uuid>
Content-Type: application/json
```

- If unauthenticated: Return `401 Unauthorized` with `{ "error": "unauthorized", "message": "Valid session required" }`.
- If student has not completed Flow 3 onboarding: Return `307 Redirect` to `/onboarding` or payload `{ "code": "ONBOARDING_INCOMPLETE", "redirectTo": "/onboarding" }`.

---

## 3. Endpoints

### 3.1 `GET /api/v1/student/home`

Returns the compiled view model required to render the full personalized dashboard.

#### Response Body (`200 OK`)
```json
{
  "studentId": "std_8923a10f",
  "studentName": "Aryan Sharma",
  "academicStage": "classes-11-12",
  "academicStageLabel": "Classes 11–12",
  "academicSummary": "Class 12 • Science (PCM)",
  "stream": "science_pcm",
  "confidenceLevel": "exploring",
  "onboardingStatus": "student_reviewed",
  "primaryInterests": [
    "Technology & Software",
    "Mathematics & Quantitative Logic"
  ],
  "startingPointSummary": {
    "stage": "classes-11-12",
    "stageLabel": "Classes 11–12",
    "streamLabel": "Science (PCM)",
    "clarityLabel": "Exploring a few directions",
    "primaryInterestLabels": [
      "Technology & Software",
      "Mathematics & Quantitative Logic"
    ],
    "subInterestLabels": [
      "Algorithms",
      "Full Stack Development",
      "Applied Mathematics"
    ],
    "explorationPreferences": [
      "Hands-on starter project",
      "Direct pathway comparisons"
    ],
    "isConfirmed": true,
    "lastUpdated": "2026-10-31T12:00:00Z"
  },
  "activeNextMove": {
    "id": "act_c12_comp_01",
    "title": "Compare 2 Undergraduate Pathways: B.Tech CS vs B.Sc Computer Science",
    "description": "Inspect real course curriculum, laboratory intensity, entrance examination criteria, and actual industry role outcomes side by side.",
    "actionType": "pathway_comparison",
    "actionTypeLabel": "Pathway Comparison",
    "estimatedMinutes": 15,
    "difficulty": "introductory",
    "route": "/dashboard/student/explore?action=compare-cs",
    "whySuggested": "You reported studying Class 12 Science (PCM) and indicated curiosity about software careers. This low-stakes comparison clarifies eligibility trade-offs early.",
    "isPostponed": false
  },
  "alternativeNextMoves": [
    {
      "id": "act_c12_alt_01",
      "title": "Try a 10-Minute Micro-Challenge: Logic Flow & Debugging",
      "description": "Review a tiny logic snippet to experience firsthand how software engineers debug state transitions.",
      "actionType": "hands_on_micro_challenge",
      "actionTypeLabel": "Micro-Challenge",
      "estimatedMinutes": 10,
      "difficulty": "introductory",
      "route": "/dashboard/student/projects?preview=logic-debug",
      "whySuggested": "Provides hands-on signal before committing to semester-length coursework.",
      "isPostponed": false
    },
    {
      "id": "act_c12_alt_02",
      "title": "Explore Reality Check: A Day in the Life of a Junior Software Engineer",
      "description": "Read truthful day-to-day accounts of code reviews, documentation, bug triage, and team standups.",
      "actionType": "reality_check_read",
      "actionTypeLabel": "Field Reality Read",
      "estimatedMinutes": 8,
      "difficulty": "introductory",
      "route": "/dashboard/student/explore?read=swe-day-in-life",
      "whySuggested": "Demystifies tech stereotypes and shows daily cognitive reality.",
      "isPostponed": false
    }
  ],
  "possibilities": [
    {
      "id": "poss_c12_01",
      "title": "Computer Science & Engineering Pathways",
      "domain": "academic_stream",
      "domainLabel": "Undergraduate Degree",
      "description": "Comprehensive engineering core covering systems, compilers, algorithms, and distributed computing.",
      "relevanceReason": "Directly builds on your Mathematics and Physics coursework in Class 12.",
      "openQuestions": [
        "Are you excited by abstract mathematical logic, or do you prefer product design?",
        "How do you feel about rigorous 4-year lab requirements?"
      ],
      "route": "/dashboard/student/explore?path=cse"
    },
    {
      "id": "poss_c12_02",
      "title": "Data Science & Applied Statistics",
      "domain": "interdisciplinary_area",
      "domainLabel": "Applied Analytics",
      "description": "Blends computational modeling, statistical inference, and business domain decision-making.",
      "relevanceReason": "Aligns with your interest in quantitative problem solving and software tools.",
      "openQuestions": [
        "Do you prefer pure programming or mathematical modeling and statistical visualization?"
      ],
      "route": "/dashboard/student/explore?path=data-science"
    },
    {
      "id": "poss_c12_03",
      "title": "Open-Source Software Contributor Track",
      "domain": "applied_skill_track",
      "domainLabel": "Practical Competency Track",
      "description": "Learn version control, git workflows, issue tracking, and collaborative code reviews on public repos.",
      "relevanceReason": "Creates public, verifiable hiring evidence regardless of college brand.",
      "openQuestions": [
        "Have you used Git before, or would you like a guided zero-cost sandbox tutorial?"
      ],
      "route": "/dashboard/student/projects?track=open-source"
    }
  ],
  "growthSnapshot": {
    "totalActivitiesAttempted": 1,
    "totalEvidenceArtifacts": 2,
    "evidenceTaxonomyCounts": {
      "self_reported": 1,
      "practised": 1,
      "demonstrated": 0,
      "evaluated": 0,
      "verified": 0
    },
    "latestEvidence": [
      {
        "id": "evi_c12_01",
        "title": "Computer Science & Software Engineering",
        "category": "Technology & Software",
        "epistemicLevel": "self_reported",
        "epistemicLevelLabel": "You Told Us (Self-Reported)",
        "source": "Flow 3 Onboarding Interest Selection",
        "createdAt": "2026-10-31T11:50:00Z"
      },
      {
        "id": "evi_c12_02",
        "title": "Hiring Evidence Recognition Challenge",
        "category": "Portfolio & Practical Proof",
        "epistemicLevel": "practised",
        "epistemicLevelLabel": "Practised in Challenge",
        "source": "Flow 3 Micro-Exploration Exercise",
        "createdAt": "2026-10-31T11:55:00Z"
      }
    ],
    "recentActivity": null
  },
  "partnerPrompts": [
    {
      "id": "prm_c12_01",
      "label": "Is B.Tech CS really worth it if I don't love competitive exams?",
      "category": "dilemma",
      "question": "Is B.Tech CS really worth it if I don't love competitive exams?",
      "structuredAnswer": {
        "understanding": "Competitive exam prep can be emotionally draining and doesn't always reflect actual software building skills.",
        "directions": [
          "Explore BCA + MCA or specialized university admissions that evaluate portfolio and coding ability over raw memorization.",
          "Consider applied mathematics, statistics, or informatics degrees which open identical software engineering career doors."
        ],
        "tradeOffs": "Some legacy government jobs or campus hiring filters still mandate formal engineering degrees, though top modern tech employers prioritize GitHub proof.",
        "suggestedAction": "Review the 'Degree vs Portfolio' guide in our Explore section to compare real placement criteria across 20 companies."
      }
    },
    {
      "id": "prm_c12_02",
      "label": "How early should I start learning programming in 12th?",
      "category": "planning",
      "question": "How early should I start learning programming in 12th?",
      "structuredAnswer": {
        "understanding": "Balancing board exam marks with learning practical tech skills causes anxiety for many science students.",
        "directions": [
          "Keep high school board exam preparation as primary; spend just 2 hours every weekend on beginner Python or web basics.",
          "Use holidays or post-exam vacation to complete an intensive 4-week starter project."
        ],
        "tradeOffs": "Attempting full-time coding during board exam season risks your immediate academic grades without conferring immediate hiring advantage.",
        "suggestedAction": "Add a reminder in your planner to start our 15-minute Python micro-explorations right after your practical exams."
      }
    }
  ]
}
```

---

### 3.2 `POST /api/v1/student/next-actions/select`

Called when a student chooses one of the alternative moves.

#### Request Body
```json
{
  "selectedActionId": "act_c12_alt_01",
  "previousActionId": "act_c12_comp_01"
}
```

#### Response Body (`200 OK`)
```json
{
  "success": true,
  "activeNextMove": {
    "id": "act_c12_alt_01",
    "title": "Try a 10-Minute Micro-Challenge: Logic Flow & Debugging",
    "actionType": "hands_on_micro_challenge",
    "isPostponed": false
  },
  "updatedAt": "2026-10-31T12:05:00Z"
}
```

---

### 3.3 `POST /api/v1/student/next-actions/postpone`

Called when a student chooses "Postpone for later".

#### Request Body
```json
{
  "actionId": "act_c12_alt_01",
  "reason": "student_requested_delay"
}
```

#### Response Body (`200 OK`)
```json
{
  "success": true,
  "isPostponed": true,
  "actionId": "act_c12_alt_01",
  "postponedUntil": null
}
```

---

### 3.4 `POST /api/v1/student/next-actions/restore`

Called when a student restores their suggested next move.

#### Request Body
```json
{
  "actionId": "act_c12_comp_01"
}
```

#### Response Body (`200 OK`)
```json
{
  "success": true,
  "isPostponed": false,
  "activeNextMoveId": "act_c12_comp_01"
}
```

---

## 4. Epistemic Evidence Taxonomy Rules

The backend must strictly enforce the truthful 5-tier evidence hierarchy. The frontend never calculates fake match scores:

| Epistemic Level | Key in JSON | Definition | Example Source |
|:---|:---|:---|:---|
| **Level 1** | `self_reported` | Stated by student in survey or profile form. Unverified. | Interest check, survey questions |
| **Level 2** | `practised` | Attempted in platform challenge, quiz, or guided sandbox. | Micro-exploration challenge answer |
| **Level 3** | `demonstrated` | Produced complete, viewable artifact (code repo, design sheet, written brief). | Project milestone submission |
| **Level 4** | `evaluated` | Assessed by structured rubric, automated test runner, or peer review. | Unit test pass in code sandbox |
| **Level 5** | `verified` | Externally attested by verified mentor, employer, or credential authority. | Verified internship confirmation |

> **Strict Rule:** Backend must NEVER aggregate these tiers into a single percentage "Career Fit: 87%". Tiers must be returned as discrete counts (`evidenceTaxonomyCounts`).

---

## 5. Error Responses

Standardized JSON error envelope:
```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Student profile baseline not found.",
    "details": {}
  }
}
```

HTTP status codes:
- `400 Bad Request`: Validation failure on payload
- `401 Unauthorized`: Missing or expired auth token
- `403 Forbidden`: Cross-student access attempt
- `404 Not Found`: Profile or action does not exist
- `500 Internal Server Error`: Backend processing fault

