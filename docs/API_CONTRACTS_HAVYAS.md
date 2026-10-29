# Next Move AI V2 — Flow 2 Backend API Contracts Specification

**Author:** Antigravity Frontend Architect & UX Team  
**Recipient:** Havyas (Backend Engineering Lead)  
**Status:** PROPOSED & FRONTEND-ALIGNED  
**Release Target:** Flow 2 (Intelligent Entry, Signup & Sign In)

---

## Executive Summary

This document specifies the 10 core API endpoints required to transition students and parents from the public landing page into authenticated workspaces and Flow 3 (Adaptive Student Onboarding).

### Core Guardrails & Behavioral Rules
1. **No Fake Authentication:** The frontend never stores tokens or creates authenticated sessions client-side.
2. **Backend Determines Authority:** Frontend route parameters (such as `stage` or `role`) do not grant authorization. The backend validates age eligibility, consent requirements, and onboarding status.
3. **No Sensitive URL Leaks:** Passwords, birthdates, and private notes must never appear in query strings.
4. **Minor Privacy & Compliance:** In compliance with the Indian Digital Personal Data Protection (DPDP) Act 2023 and COPPA, learners under 18 (specifically under 13 for strict parental management) require verified guardian authorization before personalized data collection begins.

---

## 1. Endpoint Summary Matrix

| # | Endpoint Proposal | Method | Primary Purpose | Auth Required |
|---|---|---|---|---|
| **1** | `/api/v1/auth/register/student` | `POST` | Register student account with academic stage | Public |
| **2** | `/api/v1/auth/register/parent` | `POST` | Register parent or guardian account | Public |
| **3** | `/api/v1/auth/sign-in` | `POST` | Authenticate existing user | Public |
| **4** | `/api/v1/auth/sign-out` | `POST` | Terminate active user session | Session Cookie / Bearer |
| **5** | `/api/v1/auth/session` | `GET` | Retrieve current authentication & role state | Session Cookie / Bearer |
| **6** | `/api/v1/auth/verify-email` | `POST` | Validate email verification token | Public |
| **7** | `/api/v1/auth/forgot-password` | `POST` | Request password reset token | Public |
| **8** | `/api/v1/auth/reset-password` | `POST` | Apply new password with valid reset token | Public |
| **9** | `/api/v1/auth/eligibility/check-age` | `POST` | Determine minor consent & guardian route | Public |
| **10** | `/api/v1/guardian/authorization-status` | `GET` | Query guardian consent status for minor | Student Session |

---

## 2. Detailed Endpoint Specifications

### 2.1 Register Student
- **Endpoint:** `POST /api/v1/auth/register/student`
- **Request Body:**
  ```json
  {
    "displayName": "Aryan Sharma",
    "email": "aryan.student@example.com",
    "passwordHash": "argon2id$...or TLS raw password for server-side hashing",
    "academicStage": "classes-11-12",
    "ageCategory": "13_to_17",
    "guardianEmail": "parent@example.com",
    "acceptedTermsVersion": "v2.0-draft"
  }
  ```
- **Response 201 Created:**
  ```json
  {
    "userId": "usr_stu_98127391823",
    "email": "aryan.student@example.com",
    "displayName": "Aryan Sharma",
    "role": "student",
    "academicStage": "classes-11-12",
    "accessStatus": "guardian_pending",
    "emailVerified": false,
    "guardianVerificationRequired": true,
    "nextStep": "await_guardian",
    "createdAt": "2026-10-29T08:00:00Z"
  }
  ```
- **Error Codes:**
  - `400 VALIDATION_FAILED`: Invalid email or weak password (< 8 chars, no digit).
  - `409 USER_ALREADY_EXISTS`: An account with this email already exists.
  - `422 GUARDIAN_CONSENT_REQUIRED`: Underage learner provided without guardian email.
- **Frontend States:**
  - Loading: Disables submit, shows spinner.
  - Success: Directs to `/verify?type=guardian_pending` or `/verify?type=email_pending`.
  - Prototype State: Explains backend integration pending; allows Flow 3 preview navigation.

---

### 2.2 Register Parent
- **Endpoint:** `POST /api/v1/auth/register/parent`
- **Request Body:**
  ```json
  {
    "fullName": "Meera Sharma",
    "email": "meera.sharma@example.com",
    "passwordHash": "argon2id$...or TLS raw password",
    "roleType": "parent_guardian",
    "acceptedTermsVersion": "v2.0-draft"
  }
  ```
- **Role Differentiation:**
  - `parent_guardian`: "Parent or Legally Authorized Guardian" — potentially eligible to provide guardian authorization after verification.
  - `mentor_advisor`: "Mentor, Teacher, or Educational Advisor" — separate support role without legal guardian consent authority.
- **Student Linking Security Rule:**
  - Initial parent signup does NOT ask for or accept a student invite code or student private data.
  - Student linking occurs exclusively post-verification in an authenticated session via `POST /api/v1/guardian/link-student` with mutual student consent.
- **Response 201 Created:**
  ```json
  {
    "userId": "usr_par_1298371982",
    "email": "meera.sharma@example.com",
    "fullName": "Meera Sharma",
    "role": "parent",
    "roleType": "parent_guardian",
    "canAuthorizeMinors": true,
    "emailVerified": false,
    "linkedStudentsCount": 0,
    "nextStep": "verify_email",
    "createdAt": "2026-10-29T08:00:00Z"
  }
  ```

---

### 2.3 Sign In
- **Endpoint:** `POST /api/v1/auth/sign-in`
- **Request Body:**
  ```json
  {
    "email": "student@example.com",
    "passwordHash": "..."
  }
  ```
- **Response 200 OK:**
  ```json
  {
    "user": {
      "id": "usr_stu_98127391823",
      "email": "student@example.com",
      "displayName": "Aryan",
      "role": "student",
      "academicStage": "classes-11-12",
      "emailVerified": true,
      "accessStatus": "standard_eligible"
    },
    "session": {
      "accessTokenExpiresAt": "2026-10-29T09:00:00Z",
      "refreshTokenExpiresAt": "2026-11-05T08:00:00Z"
    },
    "destination": "onboarding"
  }
  ```
- **Error Codes:**
  - `401 INVALID_CREDENTIALS`: Email or password mismatch.
  - `403 UNVERIFIED_EMAIL`: Email verification required. Redirects to `/verify?type=email_pending`.
  - `403 GUARDIAN_APPROVAL_PENDING`: Redirects to `/verify?type=guardian_pending`.
  - `429 RATE_LIMITED`: Too many login attempts (lockout for 15 minutes).

---

### 2.4 Age & Access Eligibility Check (3-Tier Framework)
- **Endpoint:** `POST /api/v1/auth/eligibility/check-age`
- **Request Body:**
  ```json
  {
    "academicStage": "classes-11-12",
    "ageCategory": "13_to_17",
    "countryCode": "IN"
  }
  ```
- **Response 200 OK (Ages 13–17 Teen Framework):**
  ```json
  {
    "eligible": true,
    "accessStatus": "teen_guardian_required",
    "requiresGuardianConsent": true,
    "minimumAgeForIndependentAccess": 18,
    "explanation": "Secondary students (ages 13–17) can configure profiles; continuous platform exploration requires verified guardian authorization under phased DPDP minor protection guidelines.",
    "applicableLaw": "Draft Framework for Minor Safety & DPDP Phased Implementation"
  }
  ```
- **Response 200 OK (Under 13 Guardian-Led):**
  ```json
  {
    "eligible": true,
    "accessStatus": "guardian_required",
    "requiresGuardianConsent": true,
    "minimumAgeForIndependentAccess": 18,
    "explanation": "Learners under 13 require parental or legal guardian co-setup before platform entry.",
    "applicableLaw": "Draft Framework for Minor Safety & DPDP Phased Implementation"
  }
  ```

---

## 3. Flow 3 Transition Contract

When a student successfully authenticates and passes access verification, the backend issues an authenticated HTTP-only session cookie and redirects the frontend to:
```
/onboarding?stage={validated_stage_id}
```
**Important Security Constraints:**
- Do NOT pass passwords, tokens, full names, birthdates, or phone numbers in URL parameters.
- The backend session cookie or Bearer token determines identity.
- The `stage` parameter is solely a UX continuity hint matching one of the 6 supported IDs:
  - `classes-4-7`
  - `classes-8-10`
  - `classes-11-12`
  - `diploma`
  - `degree-engineering`
  - `final-year-grad`

---

## 4. Security Architecture Specification for Havyas

### 4.1 Session Management
- **HTTP-Only Cookies:** Sessions MUST be stored in secure HTTP-only cookies (`__Host-nextmove-session`) with `SameSite=Lax` (or `Strict`), `Secure: true`, and `Path=/`.
- **No Client Credential Storage:** The client application never accesses or stores session tokens in `localStorage` or `sessionStorage`.
- **CSRF Defense:** State-changing requests (`POST`, `PUT`, `DELETE`) require an anti-CSRF token (Double Submit Cookie or custom header `X-CSRF-Token`).

### 4.2 Authentication Provider Integration Options
1. **Option A: Supabase Auth (Recommended)**
   - Use Supabase GoTrue Auth with server-side cookie handlers (`@supabase/ssr`).
   - Store role (`student`, `parent`, `admin`), `academic_stage`, and `guardian_authorization_status` in JWT custom user metadata and `profiles` table with Row Level Security (RLS).
2. **Option B: Node.js / FastAPI Custom Auth Server**
   - Issue cryptographically signed session IDs stored in Redis or PostgreSQL.
   - Use Argon2id for password hashing.
   - Enforce rate-limiting using Redis token bucket algorithms (e.g. max 5 failed attempts per IP/account per 15 minutes).

### 4.3 Flow 3 Gatekeeper Verification
Before allowing access to `/onboarding`, the backend API gateway or middleware verifies:
1. `session.authenticated === true`
2. `user.email_verified === true`
3. If `user.age < 18` or `user.access_status === "teen_guardian_required"`, confirm `guardian_consent_status === "approved"`.
4. If consent is pending, route to `/verify?type=guardian_pending`.

---

## 5. Frontend Adapter Implementation Note

The frontend provides `src/lib/auth-adapter.ts` which mirrors these exact request and response interfaces. When Havyas is ready to connect the live backend, swapping the mock adapter for the `fetch()` network layer requires zero UI component refactoring.
