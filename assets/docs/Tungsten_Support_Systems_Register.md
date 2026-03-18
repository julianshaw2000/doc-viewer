**TUNGSTEN SUPPLY CHAIN**

**COMPLIANCE PLATFORM**

*Support Systems Register*

  --------------------- -------------------------------------------------
  **Document Status**   DRAFT --- For CTO & Compliance Lead Review

  **Version**           Derived from Platform Spec v2.3 (US Edition)

  **Date**              March 2026

  **Classification**    Confidential --- Internal Use Only

  **Scope**             United States Operations Only
  --------------------- -------------------------------------------------

This document identifies all support systems required to operate the Tungsten Supply Chain Compliance Platform. It is derived from the Platform Specification v2.3 (US Edition) and covers billing, identity, cloud infrastructure, external integrations, security, audit, and commercial support functions.

**1. Billing & Commercial Systems**

The platform operates a three-tier SaaS subscription model. The following systems are required to administer subscriptions and commercial operations.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **System / Function**         **Purpose**                                                                                                                                                      **Tier Applicability**
  ----------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------
  Subscription management       Administer Starter, Professional, and Enterprise tiers; enforce active batch limits, user caps, and feature entitlements                                         All tiers

  Pricing & invoicing           Billing per tier; contractually binding SLA terms per subscription. Azure cost model and pricing schedule required within 60 days of spec sign-off (Action L4)   All tiers

  Tenant onboarding workflow    Structured onboarding including data-sharing agreement execution and role provisioning                                                                           All tiers

  Tenant offboarding workflow   Full data export provided before soft-delete; 90-day confirmation window before hard deletion (FR-070)                                                           All tiers

  Regulatory change billing     Rule updates included in SaaS fee at no extra charge for all tiers (FR-067)                                                                                      All tiers
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **⚠ Action L4 --- Open**                                                                                                                                                                                          |
|                                                                                                                                                                                                                   |
| The Platform Operator must complete an Azure infrastructure cost model and pricing schedule within 60 days of spec sign-off. Enterprise sales conversations must not begin until this pricing schedule is signed. |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**2. Identity & Access Management (IAM)**

All users must authenticate via MFA. Single-factor access is not permitted for any role. IAM must be enforced at the identity provider level.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Component**                      **Requirement**
  ---------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Identity Provider (IdP)            MFA-enforced for all roles. Platform decision D2 (identity platform selection) required by Week 2 of the project schedule

  Role-Based Access Control (RBAC)   Five defined roles: Supplier, Buyer, Auditor, Compliance Officer, Platform Administrator. Permissions enforced at application and data layers

  Row-Level Security (RLS)           Tenant data isolation enforced at the SQL data layer, not only at the application layer. A privilege-escalation bug must not expose one tenant's data to another

  API Key Management                 Tenant-scoped API keys rotatable by the tenant administrator without service interruption. All usage logged to the audit trail (FR-053)

  Secrets Vault                      All integration credentials and API keys managed via a dedicated secrets vault. No secrets stored in source code or configuration files
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

+-------------------------------------------------------------------------------------------------------------------------------+
| **⚠ Decision D2 --- Open**                                                                                                    |
|                                                                                                                               |
| The identity platform must be selected and confirmed by Week 2 of the project schedule. This is a pre-APPROVED-status action. |
+-------------------------------------------------------------------------------------------------------------------------------+

**3. Cloud Infrastructure (Microsoft Azure)**

All tenant data must reside within United States Azure regions. No data may be written to non-US regions (NFR-13).

  ----------------------------------------------------------------------------------------------------------------------------------------------------
  **Azure Service**                 **Role**                                                                                     **Region**
  --------------------------------- -------------------------------------------------------------------------------------------- ---------------------
  Azure US East                     Primary region for all tenant data and platform operations                                   US East (primary)

  Azure US West                     Secondary disaster recovery region. RPO: 1 hour; RTO: 4 hours (NFR-08)                       US West (secondary)

  Azure IoT Hub                     Inbound real-time tracking data from IoT devices (Tive, Roambee)                             US East primary

  Azure Communication Services      Outbound email notification and alert delivery. Retry 3× over 24 hours on failure (FR-025)   US East primary

  Azure API Management (APIM)       OpenAPI 3.0 documentation portal for Enterprise tenant Partner API (FR-051)                  US East primary

  Secrets Vault (Azure Key Vault)   Secure storage for all integration secrets, API keys, and BYOK keys (FR-053, D5)             US East primary
  ----------------------------------------------------------------------------------------------------------------------------------------------------

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **⚠ Decision D5 --- Open**                                                                                                                                                                                    |
|                                                                                                                                                                                                               |
| BYOK key management design review required within 30 days of spec sign-off. Enterprise tier must not be marketed or sold until D5 is resolved. This decision affects the Restricted data classification tier. |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**4. External Data Integrations**

All integrations must define: data format, refresh frequency, failure behaviour, fallback state, and minimum API version supported. Integration failures must not cause the platform to reject custody event submissions (FR-059).

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **System**                                                           **Direction**        **Frequency**                         **Failure Behaviour & Fallback**
  -------------------------------------------------------------------- -------------------- ------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------
  Accredited Laboratories (SGS, ALS, Bureau Veritas, US equivalents)   Inbound              Polled every 15 min                   Staleness alert if no update within 2 hours. Manual entry fallback with 'manual-entry' flag and four-eyes approval required

  RMI RMAP Smelter List                                                Inbound              On publication (\~quarterly)          Retry 3× with exponential backoff. If unavailable after 24 hours, alert Compliance Officer. Existing list version remains active

  CBP ACE (US Customs & Border Protection)                             Inbound / Outbound   Event-driven (export/import events)   Custody event stored with 'customs-pending' flag. Manual reconciliation workflow available to Compliance Officer

  IoT Tracking Devices (Tive, Roambee)                                 Inbound              Real-time via IoT Hub                 Last-known position retained on connectivity loss. 'tracking-gap' flag applied if no update within reporting interval

  Blockchain Anchoring (Minespider / Hyperledger Fabric)               Outbound             Event-driven (every write)            'anchor-pending' status on failure. Retry every 5 minutes. Alert after 1 hour unanchored. Event is not rejected

  Email Notification (Azure Communication Services)                    Outbound             Event-driven (alerts)                 Retry 3× over 24 hours. Delivery failure logged. Escalation contact notified via webhook if configured

  Partner API (Enterprise tenants)                                     Inbound              On demand                             HTTP 401 on auth failure; HTTP 429 with retry-after on rate limit breach; HTTP 503 with recovery estimate on unavailability
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**5. Security & Compliance Systems**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **System / Control**              **Requirement Reference**
  --------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Penetration testing service       Independent annual pen test required. Critical findings remediated within 30 days; high findings within 60 days

  Anomaly detection                 Detect and alert on bulk data exports, access from unexpected locations, and unusual query volumes within 30 minutes (FR-061)

  Breach notification workflow      4-hour internal breach report covering data categories, individuals affected, likely consequences, and remediation measures (FR-062)

  CMMC 2.0 gap assessment           110-control NIST SP 800-171 gap assessment required before Phase 1 go-live. Decision on C3PAO vs self-attestation required by Week 4 (FR-079, FR-080)

  ITAR/EAR compliance controls      Export-controlled document references only (no full content stored). Controls for ITAR/EAR obligations for applicable tenant batches (FR-081, FR-082)

  FedRAMP posture assessment        Phase 1 operates on Azure Commercial (no FedRAMP Moderate/High). CTO to assess FedRAMP Moderate feasibility in Phase 2 commercial planning (NFR-14)

  US state privacy law compliance   Written legal opinion on CCPA, CPRA, VCDPA, TDPSA, and equivalents required before Phase 2 go-live. Legal counsel engagement within 14 days of spec sign-off (Action C2)
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**6. Audit & Logging Infrastructure**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **System / Function**              **Specification**
  ---------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Append-only audit log store        All create/modify/delete actions logged with: user identity, timestamp, action type, affected record identifier, and before/after state. Append-only at data store level. Retained 7 years (NFR-05)

  Blockchain verification call log   All blockchain verification calls made during audit dossier assembly recorded with result and timestamp (FR-016)

  RMAP re-evaluation change log      Named, retained, auditable report type. Accessible to Compliance Officers and Auditors (FR-029)

  Document access log                All document access events (who accessed what and when) included in the audit log. Required for DFARS audit defensibility (FR-032)

  API key usage log                  All Partner API key usage logged to the audit trail (FR-053)

  Compliance assessment history      All compliance assessments retained alongside the rule set version applied. Rule set versions immutable once deployed (FR-046)

  10-year document retention store   All custody event records, compliance assessments, and document hashes retained minimum 10 years from event date. Hard deletion blocked until period elapsed (NFR-04, FR-036)
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**7. Support & Service Management**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Support Channel**                                             **Tier**        **SLA / Response Target**
  --------------------------------------------------------------- --------------- ------------------------------------------------------------------------------------------------------------------------------------------------------
  Community forum + email                                         Starter         2 business day target response (FR-072)

  Business hours email + in-platform chat                         Professional    4 business hour target response (FR-072)

  24/7 telephone, email, and dedicated Customer Success Manager   Enterprise      1 hour for P1 incidents; dedicated CSM (FR-072)

  Public service status page                                      All tiers       Updated within 15 minutes of any P1 or P2 incident (FR-074)

  P1 incident escalation to CTO                                   All tiers       Within 30 minutes of P1 declaration. P1 = platform unavailable or compliance package generation failing with DFARS deadline within 48 hours (FR-073)
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**8. Regulatory Change Management**

The Platform Operator must maintain a regulatory watch function covering all nine compliance frameworks (FR-065). Rule updates are included in the SaaS subscription fee at no additional charge for all tiers (FR-067).

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Function**                 **Requirement**
  ---------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Regulatory watch service     Monitors changes to all nine named regulatory frameworks. Compliance Lead notified within 5 business days of any material change (FR-065)

  Tenant notification system   Upcoming regulatory changes and planned rule updates communicated to all affected tenants at least 10 business days before the update is applied to production (FR-068)

  Rule update SLAs             Starter: within 90 days. Professional: within 30 days. Enterprise: within 14 days. Contractually binding per tier (FR-066)

  Rule authoring system        Named, versioned rule sets with: framework identifier, rule version, effective date, expiry date, and rule logic. Deployable by Compliance Officer via UI without code deployment (FR-044, FR-045)

  Rule test environment        Proposed rule set versions must be validatable against historical batch scenarios before production deployment (FR-048)
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**9. Data Portability & Exit Rights**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Function**                                  **Requirement Reference**
  --------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------
  On-demand full data export                    Complete archive in JSON + PDF format at any time: all custody events, compliance assessments, document hashes, generated packages, and audit logs (FR-069)

  Offboarding export pipeline                   Full export delivered to tenant before soft-delete period begins. 90-day confirmation window before hard deletion proceeds (FR-070)

  Documented export format                      Export format published so migrating buyers can demonstrate continuity of DFARS compliance record from export data alone (FR-071)

  Data correction & pseudonymisation workflow   Available to Compliance Officers for processing user access and correction requests under applicable US privacy law (FR-064)
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**10. Open Decisions Affecting System Procurement**

The following decisions must be resolved before the systems in this register can be fully specified, procured, or contracted.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Ref**       **Decision Required**                                                                     **Owner**               **Deadline**
  ------------- ----------------------------------------------------------------------------------------- ----------------------- ----------------------------
  D2            Identity platform selection (IdP for MFA and RBAC)                                        CTO                     Week 2 of project schedule

  D5            BYOK key management design and provider selection                                         CTO                     30 days from spec sign-off

  FR-080 (C1)   CMMC 2.0: C3PAO third-party assessment vs self-attestation                                CTO + Compliance Lead   Week 4 of project schedule

  C2            Legal counsel engagement on applicable US state privacy laws (CCPA, CPRA, VCDPA, TDPSA)   CTO + Compliance Lead   14 days from spec sign-off

  L4            Azure infrastructure cost model and pricing schedule                                      Platform Operator       60 days from spec sign-off

  FR-044 (M4)   Compliance rule authoring format (structured DB, YAML DSL, or compiled rule class)        CTO + Compliance Lead   Week 3 of project schedule
  ------------------------------------------------------------------------------------------------------------------------------------------------------------

*Document version derived from Tungsten Platform Spec v2.3 (US Edition) · March 2026 · Confidential --- Internal Use Only*
