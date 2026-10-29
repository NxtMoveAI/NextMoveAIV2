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
    "passwordHash": "...",
    "relationship": "parent",
    "studentInviteCode": "INV-78923",
    "acceptedTermsVersion": "v2.0-draft"
  }
  ```
- **Response 201 Created:**
  ```json
  {
    "userId": "usr_par_1298371982",
    "email": "meera.sharma@example.com",
    "fullName": "Meera Sharma",
    "role": "parent",
    "relationship": "parent",
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

### 2.4 Age & Access Eligibility Check
- **Endpoint:** `POST /api/v1/auth/eligibility/check-age`
- **Request Body:**
  ```json
  {
    "academicStage": "classes-4-7",
    "ageCategory": "under_13",
    "countryCode": "IN"
  }
  ```
- **Response 200 OK:**
  ```json
  {
    "eligible": true,
    "accessStatus": "guardian_required",
    "requiresGuardianConsent": true,
    "minimumAgeForIndependentAccess": 18,
    "explanation": "Students in Classes 4–7 explore with active guardian support under the Indian DPDP Act minor consent framework.",
    "applicableLaw": "Digital Personal Data Protection Act 2023 (India)"
  }
  ```

---

## 3. Flow 3 Transition Contract

When a student successfully authenticates and passes access verification, the frontend navigates to:
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

## 4. Frontend Adapter Implementation Note

The frontend provides `src/lib/auth-adapter.ts` which mirrors these exact request and response interfaces. When Havyas is ready to connect the live Supabase / Node.js backend, swapping the mock adapter for the `fetch()` network layer requires zero UI component refactoring.
