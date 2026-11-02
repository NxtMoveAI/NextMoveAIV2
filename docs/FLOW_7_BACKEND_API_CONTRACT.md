# Next Move AI V2 — Flow 7 Frontend-to-Backend API Contract
**Target Backend Engineer:** Havyas  
**Module:** Build My Next Move: Roadmaps, Projects, Practical Experiences & Career Opportunities (`/dashboard/student/projects`)  
**Product:** Next Move AI (Navlore AI Technologies LLP)  
**Specification Version:** 1.0.0 (Flow 7 Baseline)  
**Philosophy:** *"We don't decide careers; we enable clarity."*  

---

## 1. Executive Summary & Purpose

This document specifies the exact Supabase database schema, REST API endpoints, RPC functions, and integrity safeguards required to support **Flow 7 — Build My Next Move**.

In the current frontend implementation, all Flow 7 features are fully functional using a profile-scoped reactive service store (`src/features/build-next-move/services/next-move-store.ts`) backed by `sessionStorage`. When Havyas implements the backend, these contracts serve as the exact drop-in integration layer without requiring any frontend component rewrites.

---

## 2. Core Epistemic & Child-Safety Invariants

1. **Child-Safety Protection (Under 18 / School Cohorts):**
   - For `classes-4-7` (Middle School) and `classes-8-10` (Secondary School), the backend **must never** return adult employment listings, paid corporate internships, or wage postings.
   - Middle school and high school students must strictly receive enrichment camps, science fairs, maker challenges, and curiosity programs.
2. **Data Provenance Transparency:**
   - Every opportunity item **must** specify its provenance:
     - `verified_listing`: Independently verified active posting.
     - `curated_educational`: Sourced national scheme or educational initiative.
     - `prototype_example`: Synthetic demo fixture.
3. **Evidence Integrity:**
   - Projects and roadmap milestones record authentic student deliverables (code repos, Figma links, spreadsheets, reflection memos).
   - The backend **must never** emit automated or unverified "professional certifications".
4. **Student Profile Isolation:**
   - All roadmaps, projects, goals, and artifact associations are strictly scoped to the authenticated student ID (`auth.uid()`).
   - Cross-student leakage is prevented via Supabase Row-Level Security (RLS).

---

## 3. Proposed Database Schema (PostgreSQL / Supabase)

### 3.1 `student_roadmaps`
Stores student-customized learning roadmaps.
```sql
CREATE TABLE public.student_roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    stage_id VARCHAR(50) NOT NULL,
    track_id VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    broad_objective TEXT NOT NULL,
    target_focus VARCHAR(255) NOT NULL,
    pacing VARCHAR(50) NOT NULL DEFAULT 'steady', -- 'flexible', 'steady', 'intensive', 'exploratory'
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.student_roadmaps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can only access own roadmaps" ON public.student_roadmaps
    FOR ALL USING (auth.uid() = student_id);
```

### 3.2 `roadmap_phases` & `roadmap_milestones`
```sql
CREATE TABLE public.roadmap_phases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    roadmap_id UUID NOT NULL REFERENCES public.student_roadmaps(id) ON DELETE CASCADE,
    phase_order INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    growth_objective TEXT NOT NULL,
    estimated_duration VARCHAR(50) DEFAULT '2-4 weeks',
    is_current BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE public.roadmap_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id UUID NOT NULL REFERENCES public.roadmap_phases(id) ON DELETE CASCADE,
    milestone_order INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'foundational_skill', 'practical_project', 'educational_route', 'reflection'
    estimated_hours INT NOT NULL DEFAULT 3,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    completed_at TIMESTAMPTZ,
    student_notes TEXT,
    related_project_template_id VARCHAR(100),
    related_trial_id VARCHAR(100)
);

ALTER TABLE public.roadmap_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_milestones ENABLE ROW LEVEL SECURITY;
```

### 3.3 `student_projects` & `project_steps`
```sql
CREATE TABLE public.student_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    template_id VARCHAR(100), -- NULL if custom project
    title VARCHAR(255) NOT NULL,
    problem_statement TEXT NOT NULL,
    stage_id VARCHAR(50) NOT NULL,
    category_label VARCHAR(100) NOT NULL,
    difficulty VARCHAR(50) DEFAULT 'intermediate', -- 'beginner', 'intermediate', 'advanced'
    estimated_hours INT NOT NULL DEFAULT 8,
    status VARCHAR(50) NOT NULL DEFAULT 'in_progress', -- 'in_progress', 'completed', 'paused'
    started_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    completed_at TIMESTAMPTZ,
    reflection_what_learned TEXT,
    reflection_what_challenging TEXT,
    reflection_would_pursue_further VARCHAR(20), -- 'yes', 'maybe', 'not_for_me'
    reflection_next_curiosity TEXT,
    is_synthetic_fixture BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE public.project_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.student_projects(id) ON DELETE CASCADE,
    step_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    instruction TEXT NOT NULL,
    guidance_tip TEXT,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    work_notes TEXT,
    completed_at TIMESTAMPTZ
);

CREATE TABLE public.project_artifacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.student_projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    artifact_type VARCHAR(50) NOT NULL, -- 'link_github', 'link_figma', 'link_document', 'link_spreadsheet'
    url TEXT NOT NULL,
    description TEXT,
    added_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.student_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_artifacts ENABLE ROW LEVEL SECURITY;
```

### 3.4 `student_growth_goals`
```sql
CREATE TABLE public.student_growth_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    focus_area VARCHAR(100) NOT NULL,
    goal_type VARCHAR(50) NOT NULL DEFAULT 'project_portfolio',
    target_horizon VARCHAR(50) NOT NULL DEFAULT '3_months',
    target_quarter VARCHAR(50) DEFAULT 'Next 3 Months',
    status VARCHAR(50) NOT NULL DEFAULT 'active', -- 'active', 'achieved', 'postponed'
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.student_growth_goals ENABLE ROW LEVEL SECURITY;
```

---

## 4. REST API Endpoints

### 4.1 `GET /api/v1/student/next-move/overview`
Returns the compiled situation view model, current primary recommendation, alternatives, active projects summary, and goal.

#### Response (`200 OK`)
```json
{
  "studentId": "std_8923a10f",
  "academicStageId": "classes-11-12",
  "situation": {
    "stageLabel": "Classes 11–12",
    "startingSkillsCount": 3,
    "completedTrialCount": 2,
    "activeProjectsCount": 1,
    "completedProjectsCount": 0
  },
  "primaryRecommendation": {
    "id": "rec_project_continue_1",
    "title": "Continue Working Capital Model Step 2",
    "description": "Calculate debtor collection cycles for the SME case study.",
    "actionCategory": "continue_project",
    "whySuggested": "Grounds Class 12 Commerce theoretical concepts in realistic financial modeling.",
    "supportingContext": "You have an active in-progress project with 1 of 3 steps completed.",
    "estimatedMinutes": 30,
    "targetTab": "projects",
    "targetEntityId": "proj_sme_cash_flow",
    "status": "active"
  },
  "alternatives": [
    {
      "id": "rec_explore_roadmap_1",
      "title": "Review Stream Preparation Milestones",
      "actionCategory": "explore_roadmap",
      "whySuggested": "Align your learning pace with upcoming academic transitions.",
      "estimatedMinutes": 15,
      "targetTab": "roadmaps",
      "status": "active"
    }
  ]
}
```

### 4.2 `POST /api/v1/student/projects/start-template`
Starts an active project from a template ID.

#### Request Body
```json
{
  "templateId": "proj_c1112_sme_cash_flow"
}
```

#### Response (`201 Created`)
```json
{
  "id": "proj_9921_abc",
  "templateId": "proj_c1112_sme_cash_flow",
  "title": "SME Working Capital & Cash Flow Forecast Model",
  "status": "in_progress",
  "steps": [
    {
      "id": "step_1",
      "stepNumber": 1,
      "title": "Establish Opening Cash & Revenue Assumptions",
      "isCompleted": false
    }
  ]
}
```

### 4.3 `POST /api/v1/student/projects/:id/artifacts`
Attaches an authentic portfolio artifact to a project.

#### Request Body
```json
{
  "title": "Working Capital Sensitivity Spreadsheet",
  "artifactType": "link_spreadsheet",
  "url": "https://docs.google.com/spreadsheets/d/1Xyz987Sample"
}
```

#### Response (`201 Created`)
```json
{
  "id": "art_8812_xyz",
  "projectId": "proj_9921_abc",
  "title": "Working Capital Sensitivity Spreadsheet",
  "artifactType": "link_spreadsheet",
  "url": "https://docs.google.com/spreadsheets/d/1Xyz987Sample",
  "addedAt": "2026-11-02T09:00:00Z"
}
```

### 4.4 `POST /api/v1/student/projects/:id/complete`
Records student reflection and closes the project.

#### Request Body
```json
{
  "whatLearned": "Learned how accounts receivable delays cause cash shortages even when profitable.",
  "whatWasChallenging": "Modeling trade credit penalty interest accurately.",
  "wouldPursueFurther": "yes",
  "nextCuriosity": "How commercial banks assess working capital debt limits."
}
```

#### Response (`200 OK`)
```json
{
  "id": "proj_9921_abc",
  "status": "completed",
  "completedAt": "2026-11-02T09:05:00Z"
}
```

### 4.5 `GET /api/v1/student/opportunities`
Returns directory of opportunities filtered by academic stage and age safeguards.

#### Query Parameters
- `type`: `all | internship | scholarship | competition | fellowship | curiosity_camp`
- `q`: string keyword

---

## 5. Summary of Frontend Readiness

| Frontend Feature | Current Store Method | Proposed Backend Route | Status |
| :--- | :--- | :--- | :--- |
| Next Move Overview | `growthEngine.computeNextMove` | `GET /api/v1/student/next-move/overview` | Ready for drop-in wire-up |
| Roadmap Milestone Check | `nextMoveStore.toggleMilestone` | `PATCH /api/v1/student/roadmaps/milestones/:id` | Ready for drop-in wire-up |
| Start Template Project | `nextMoveStore.startProjectFromTemplate` | `POST /api/v1/student/projects/start-template` | Ready for drop-in wire-up |
| Propose Custom Project | `nextMoveStore.createCustomProject` | `POST /api/v1/student/projects/custom` | Ready for drop-in wire-up |
| Update Step / Work Notes | `nextMoveStore.updateProjectStep` | `PATCH /api/v1/student/projects/:id/steps/:stepId` | Ready for drop-in wire-up |
| Attach Portfolio Artifact | `nextMoveStore.attachArtifact` | `POST /api/v1/student/projects/:id/artifacts` | Ready for drop-in wire-up |
| Complete Project & Reflect | `nextMoveStore.completeProject` | `POST /api/v1/student/projects/:id/complete` | Ready for drop-in wire-up |
| Set Student Growth Goal | `nextMoveStore.setStudentGoal` | `POST /api/v1/student/goals` | Ready for drop-in wire-up |
| Age-Gated Opportunities | `useNextMove (filtered)` | `GET /api/v1/student/opportunities` | Ready for drop-in wire-up |

