+-----------------------------------------------------------------------+
| **TUNGSTEN SUPPLY CHAIN**                                             |
|                                                                       |
| **COMPLIANCE PLATFORM**                                               |
+-----------------------------------------------------------------------+
| DFARS Compliance Feature Set • v2.3 US Edition • March 2026           |
+-----------------------------------------------------------------------+

**Classification: Confidential --- Internal Use Only**

Document Version: 2.3 US Edition \| Date: March 2026 \| Source: Platform Specification v2.3

This document details the full DFARS (Defense Federal Acquisition Regulation Supplement) compliance feature set embedded in the Tungsten Supply Chain Compliance Platform. DFARS governs US DoD procurement rules for conflict minerals under clauses 252.225-7008 (prime contractors) and 252.225-7009 (sub-contractors), which are implemented as separate, independent compliance checks throughout the platform.

**1. Regulatory Framework Coverage**

The platform implements DFARS as two distinct, non-conflated compliance frameworks:

  ------------------------ ------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------- ---------------------------------------------
  **Clause**               **Full Name**                                                             **Key Checks**                                                                                                       **Output Status**

  **DFARS 252.225-7008**   Prime Contractors --- Defense Federal Acquisition Regulation Supplement   Covered-country origin flag; smelter list conformance; declaration completeness; prime contractor obligations        Compliant / Non-Compliant / Requires Review

  **DFARS 252.225-7009**   Sub-Contractors --- Defense Federal Acquisition Regulation Supplement     Covered-country origin flag; smelter list conformance; sub-contractor-specific obligation set (distinct from 7008)   Compliant / Non-Compliant / Requires Review
  ------------------------ ------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------- ---------------------------------------------

Per FR-011, these two clauses are separate evaluation paths in the rule engine --- they are never merged in any assessment record, user interface, or generated document.

**2. Document Generation**

**2.1 DFARS Declaration Package**

  ------------------------------- ----------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------
  **Package**                     **Contents**                                                                                                                        **Trigger**

  **DFARS Declaration Package**   Supplier representation statements · Smelter list extracts · Country-of-origin certifications · Conflict-mineral declaration form   On-demand (buyer/compliance team) or auto on annual cycle
  ------------------------------- ----------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------

Performance SLA (OBJ-01): Submission-ready package generated within 30 minutes of request, with zero manual document assembly.

**3. Functional Requirements**

The following functional requirements directly support or are mandated by DFARS obligations:

  ------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------
  **Ref**      **Requirement**                                                                                                                                                                                                           **DFARS Relevance**

  **FR-010**   Each compliance assessment record stores the exact regulatory version used at time of assessment.                                                                                                                         Ensures DFARS clause version is pinned to each evaluation --- required for audit defensibility.

  **FR-011**   DFARS 252.225-7008 and 252.225-7009 shall be implemented as separate, independent compliance check rows with distinct obligation sets. They shall not be conflated in any assessment record, UI, or generated document.   Reflects distinct DoD obligations for prime vs sub-contractors.

  **FR-014**   The system shall re-evaluate all affected batch compliance records when a regulatory rule set is updated.                                                                                                                 Keeps DFARS assessments current when clause obligations change.

  **FR-022**   Automated alerts issued when a compliance document deadline is approaching.                                                                                                                                               Critical for contractors with hard DFARS submission windows.

  **FR-026**   Real-time compliance dashboard provided across all active batches.                                                                                                                                                        Enables compliance officers to monitor DFARS status at a glance.

  **FR-032**   All custody events included in the append-only audit log.                                                                                                                                                                 Explicitly required for DFARS audit defensibility.

  **FR-044**   Each compliance rule defined as a named, versioned object.                                                                                                                                                                Supports traceability of DFARS rule versions used per decision.

  **FR-045**   New rule set versions deployable by Compliance Lead without engineering involvement.                                                                                                                                      Allows rapid DFARS clause updates post-rulemaking.

  **FR-073**   P1 incident: platform unavailable or compliance package generation failing when an active batch has a DFARS submission deadline within 48 hours. Escalated to CTO within 30 minutes.                                      Protects contractors from missing DoD filing deadlines.
  ------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------

**4. Non-Functional Requirements & SLAs**

  ------------ --------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------
  **Ref**      **Requirement**                         **Detail**

  **NFR-04**   Data Retention --- 7 years              All custody event records and compliance assessments retained for 7 years, satisfying DFARS record-keeping requirements.

  **NFR-05**   Audit Logging --- Append-only           All user actions logged with: user identity, timestamp, action type, affected record identifier, and before/after state. Logs are append-only.

  **OBJ-01**   Package Generation SLA --- 30 minutes   Submission-ready DFARS declaration package generated within 30 minutes of request, with zero manual document assembly.
  ------------ --------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------

**5. Acceptance Criteria**

  ----------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Ref**     **Acceptance Criterion**

  **AC-01**   A DFARS Declaration Package generated by the platform has been reviewed and accepted by a qualified US government contractor compliance officer as submission-ready.

  **AC-03**   DFARS 7008/7009 framework coverage threshold is 100% (all other frameworks: 95%+, with documented exceptions approved by the Compliance Lead).

  **AC-11**   A buyer can reconstruct their entire DFARS compliance record from a platform data export file alone, without requiring access to the live platform.
  ----------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

**6. Tier Availability**

DFARS 7008 and 7009 frameworks are available across all subscription tiers:

  --------------------------------------------- ------------- ------------------ ----------------
  **Feature**                                   **Starter**   **Professional**   **Enterprise**

  DFARS 7008 & 7009 compliance frameworks       **✓**         **✓**              **✓**

  All 9 standard regulatory frameworks          ---           **✓**              **✓**

  Custom compliance rules (tenant-configured)   ---           ---                **✓**

  DFARS Declaration Package generation          **✓**         **✓**              **✓**

  Audit log & 7-year data retention             **✓**         **✓**              **✓**

  White-label branding on document packages     ---           ---                **✓**
  --------------------------------------------- ------------- ------------------ ----------------

**7. Legal Defensibility**

A core design principle of the platform is that DFARS declarations and government filing documents must be fully traceable to specific, auditable data points. Key guarantees:

-   All compliance assessments reference the exact DFARS clause version used at evaluation time (FR-010).

-   Audit logs are append-only and retained for 7 years (NFR-04, NFR-05).

-   A buyer can reconstruct their complete DFARS compliance record from a platform data export alone, without access to the live system (AC-11).

-   AI-assisted features are excluded from DFARS decision paths --- all regulatory assessments require full explainability traceable to auditable data.

-   The platform supports continuity of DFARS compliance record demonstration from export data alone.

**8. Key Definitions**

  ------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Term**                        **Definition**

  **DFARS**                       Defense Federal Acquisition Regulation Supplement --- US DoD procurement rules governing conflict minerals. Clauses 252.225-7008 (prime contractors) and 252.225-7009 (sub-contractors) impose distinct obligations and are implemented as separate compliance checks.

  **Covered Country (DFARS)**     A country listed under DFARS 252.225-7008 whose minerals are subject to conflict-mineral restrictions.

  **DFARS Declaration Package**   A structured compliance document containing supplier representation statements, smelter list extracts, country-of-origin certifications, and conflict-mineral declaration forms --- generated automatically by the platform.

  **Compliance Framework**        A named regulatory standard (e.g., DFARS 7008, DFARS 7009, RMAP, OECD DDG) implemented as a versioned rule set in the platform\'s rule engine.
  ------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Source: Tungsten Supply Chain Compliance Platform Specification v2.3 US Edition (March 2026). Confidential --- Internal Use Only.
