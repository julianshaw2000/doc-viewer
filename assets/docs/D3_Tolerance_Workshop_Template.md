> **D3 Decision Workshop**
>
> *Cross-Validation Tolerance Definition --- Phase 1 Pre-Build*

  ---------------- --------------------------------------------- ---------------- ------------------
  **Project**      *Tungsten Supply Chain Compliance Platform*   **Doc ref**      D3-WORKSHOP-v1.0

  **Decision**     D3 --- Cross-validation tolerances            **Date**         

  **Status**       **OPEN --- required before Phase 1 build**    **Version**      1.0 DRAFT
  ---------------- --------------------------------------------- ---------------- ------------------

> *⚠ This document must be completed and signed off before Phase 1 Compliance Rule Engine build begins. Per the platform specification: \"Development discretion shall not be used as a substitute.\"*
>
> **1. Purpose**

Decision D3 requires the Compliance Lead and Supply Chain Expert to define numeric cross-validation tolerances for the Compliance Rule Engine. These values will be stored as a versioned configuration artefact and applied deterministically at runtime to flag anomalies in custody event data.

Three tolerance types must be defined per applicable event type:

> **Quantity tolerance (%)** --- Maximum acceptable percentage difference between reported input and output quantities across a processing or transfer event.
>
> **Date tolerance (days)** --- Maximum number of days between a linked pair of events before the gap is flagged for review.
>
> **Mass balance threshold (%)** --- Maximum acceptable percentage by which output mass may exceed input mass across a processing event.
>
> **2. Industry Benchmark Reference**

The following standards and sources should inform the workshop discussion. Agreed tolerance values should be traceable to at least one of these references or to documented pilot supplier data.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Standard / Source**        **Applies to**        **Typical Value**   **Notes**
  ---------------------------- --------------------- ------------------- ------------------------------------------------------------------------------------------------
  ASTM E1108 / ISO 13909       Sampling / weighing   ±0.5 -- 1.0%        Mineral concentrates --- quantity tolerance benchmark

  RMAP Smelter Audit Reports   Smelting (Event 5)    85 -- 92% yield     APT recovery from concentrate. Per-smelter figures available.

  OECD DDG Annex II            All event types       No fixed value      Sets due diligence obligation --- platform thresholds must be defensible against this standard

  CBP ACE Filing Rules         Events 8 & 10         ±2% quantity        US Customs filing tolerance for mineral shipments

  Pilot Supplier Data          All applicable        TBD                 Validate proposed tolerances against real supplier batch records before finalising
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

> **3. Per-Event Workshop Guidance**

Review each event type in the workshop. The guidance column identifies the primary benchmark source and flags where tighter scrutiny is warranted.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **\#**   **Event Type**                          **Guidance for workshop discussion**
  -------- --------------------------------------- -------------------------------------------------------------------------------------------------------------------
  1        **Mine Extraction**                     Weighbridge variance typical 0.5--1%. No linked prior event --- date tolerance N/A.

  2        **Concentration / Beneficiation**       Mass balance critical --- tungsten recovery from ore typically 60--80%. Date spans processing range.

  3        **Trading / Ownership Transfer**        Legal vs physical transfer may differ by days. Quantity should match prior custody event exactly.

  4        **Laboratory Assay**                    Quantity tolerance N/A (sample, not full batch). Date tolerance = time from extraction to assay receipt.

  5        **Primary Processing (Smelting)**       APT yield from concentrate \~85--92%. RMAP smelter audit reports are primary benchmark source.

  6        **Secondary Processing (Conversion)**   Conversion yield varies by product (oxide, carbide). Facility\'s own documented recovery rate is the reference.

  7        **Warehousing / Storage**               Storage quantity should match inbound exactly. Date tolerance = max acceptable delay between receipt and logging.

  8        **Export Clearance**                    CBP ACE cross-validation applies. Date tolerance = gap between physical departure and declaration date.

  9        **In-Transit Monitoring**               Quantity not re-weighed in transit --- tolerance N/A. Date tolerance = waypoint timestamp lag.

  10       **Import Clearance**                    Section 232 tariff quantities must match export declaration. Date = port arrival to declaration filing.

  11       **Customer Delivery**                   Final signed receipt quantity vs shipment manifest. Date = dispatch to signed receipt.

  12       **End-of-Life / Recycling Re-entry**    HIGH INTEGRITY event. Provenance break acknowledged. Tighter tolerances recommended.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------

> **4. Agreed Tolerance Values --- TO BE COMPLETED**

Complete all applicable cells. For each value entered, record the reference standard or data source used to justify it. N/A cells are pre-populated where the tolerance type is not applicable to that event type.

> *⚠ Values marked N/A have been excluded on the basis that the relevant metric is not measured at that event stage. If your supply chain differs, override N/A and document the reason.*

  --------------------------------------------------------------------------------------------------------------------------------
  **\#**   **Event Type**                      **Qty Tol (%)**   **Date Tol (days)**   **Mass Bal (%)**   **Reference / Source**
  -------- ----------------------------------- ----------------- --------------------- ------------------ ------------------------
  1        Mine Extraction                     *Enter %*         N/A                   N/A                *Cite standard/data*

  2        Concentration / Beneficiation       *Enter %*         *Enter days*          *Enter %*          *Cite standard/data*

  3        Trading / Ownership Transfer        *Enter %*         *Enter days*          N/A                *Cite standard/data*

  4        Laboratory Assay                    N/A               *Enter days*          N/A                *Cite standard/data*

  5        Primary Processing (Smelting)       *Enter %*         *Enter days*          *Enter %*          *Cite standard/data*

  6        Secondary Processing (Conversion)   *Enter %*         *Enter days*          *Enter %*          *Cite standard/data*

  7        Warehousing / Storage               *Enter %*         *Enter days*          N/A                *Cite standard/data*

  8        Export Clearance                    *Enter %*         *Enter days*          N/A                *Cite standard/data*

  9        In-Transit Monitoring               N/A               *Enter days*          N/A                *Cite standard/data*

  10       Import Clearance                    *Enter %*         *Enter days*          N/A                *Cite standard/data*

  11       Customer Delivery                   *Enter %*         *Enter days*          N/A                *Cite standard/data*

  12       End-of-Life / Recycling Re-entry    *Enter %*         *Enter days*          *Enter %*          *Cite standard/data*
  --------------------------------------------------------------------------------------------------------------------------------

> **5. Configuration Artefact Instructions**

Once agreed, these values shall be transcribed into the platform configuration file:

> **compliance-config/tolerance-rules.json**

This file must be:

-   Committed to version control with this signed document attached as evidence

-   Tagged with the schema version it applies to

-   Subject to Compliance Lead sign-off for any future changes

> *⚠ Any future change to tolerance values constitutes a compliance rule change and must follow the regulatory change management process defined in FR-065 to FR-067.*
>
> **6. Sign-off**

By signing below, the named individuals confirm that the tolerance values in Section 4 are agreed, defensible against the referenced standards, and approved for use in Phase 1 build.

  ---------------------------------------------------------------------------
  **Role**              **Name**          **Signature**     **Date**
  --------------------- ----------------- ----------------- -----------------
  Compliance Lead                                           

  Supply Chain Expert                                       

  CTO (witness)                                             
  ---------------------------------------------------------------------------

*Once signed, file with project documentation and attach to Jira/Azure DevOps ticket for Decision D3.*
