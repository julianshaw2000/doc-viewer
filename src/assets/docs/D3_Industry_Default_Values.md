> **D3 --- Industry Default Tolerance Values**
>
> *Cross-Validation Defaults for Compliance Lead Review --- Phase 1 Pre-Build*

  ---------------- ------------------------------------------------------------- ---------------- ------------------
  **Project**      Tungsten Supply Chain Compliance Platform                     **Doc ref**      D3-DEFAULTS-v1.0

  **Decision**     D3 --- Cross-validation tolerances                            **Date**         16 March 2026

  **Status**       **PROPOSED DEFAULTS --- Awaiting Compliance Lead sign-off**   **Version**      1.0 DRAFT
  ---------------- ------------------------------------------------------------- ---------------- ------------------

> *⚠ These are proposed industry-standard defaults. They are NOT active until reviewed and signed off by the Compliance Lead and Supply Chain Expert. Any value that does not reflect your specific supply chain or contract obligations must be overridden before sign-off.*
>
> **1. How to Use This Document**

This document presents industry-standard default tolerance values for all 12 custody event types. It is intended to shorten the D3 workshop by giving the Compliance Lead and Supply Chain Expert a concrete starting position rather than a blank table.

For each event type, review the proposed value and its stated source. If the value is acceptable, mark it approved in the sign-off table. If your supply chain or contract terms require a different value, record the override and your justification in the annotations column.

> *ℹ The rationale for every default is explained in full in Section 3. Read Section 3 before the workshop so discussion time is spent on exceptions, not explanations.*
>
> **2. Proposed Default Values**

All values are derived from published industry standards, RMAP audit data, or US Customs filing rules. Sources are shown in the final column. N/A indicates the tolerance type is not applicable to that event stage.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------
  **\#**   **Event Type**                         **Qty Tol (%)**   **Date Tol (days)**   **Mass Bal (%)**   **Industry Source**
  -------- -------------------------------------- ----------------- --------------------- ------------------ ---------------------------------------------------
  1        Mine Extraction                        **1.0** %         *N/A*                 *N/A*              *ASTM E1108 / ISO 13909*

  2        Concentration / Beneficiation          **2.0** %         **30** days           **5.0** %          *ASTM E1108 · OECD DDG Annex II*

  3        Trading / Ownership Transfer           **0.5** %         **7** days            *N/A*              *LBMA Good Delivery · CBP ACE*

  4        Laboratory Assay                       *N/A*             **14** days           *N/A*              *ISO 17025 accreditation turnaround*

  5        Primary Processing (Smelting)          **1.5** %         **30** days           **10.0** %         *RMAP Smelter Audit Reports · RMI*

  6        Secondary Processing (Conversion)      **1.5** %         **30** days           **8.0** %          *Facility documented recovery rates · ASTM B777*

  7        Warehousing / Storage                  **0.5** %         **3** days            *N/A*              *ASTM E1108 · Warehouse receipt practice*

  8        Export Clearance                       **2.0** %         **5** days            *N/A*              *CBP ACE filing rules · US Customs 19 CFR 141*

  9        In-Transit Monitoring                  *N/A*             **2** days            *N/A*              *IoT/GPS telemetry latency standards*

  10       Import Clearance                       **2.0** %         **7** days            *N/A*              *CBP ACE · US Customs 19 CFR 141*

  11       Customer Delivery                      **0.5** %         **14** days           *N/A*              *ASTM E1108 · Commercial delivery practice*

  **12**   **End-of-Life / Recycling Re-entry**   **1.0** %         **14** days           **3.0** %          *OECD DDG Annex II · RMAP recycled content rules*
  --------------------------------------------------------------------------------------------------------------------------------------------------------------

**Key:** Qty Tol = quantity tolerance between linked event records. Date Tol = maximum days between linked event dates. Mass Bal = maximum % by which output mass may exceed input mass.

> *⚠ Event 12 (End-of-Life / Recycling Re-entry) carries the tightest thresholds in the chain. The provenance break acknowledgement field carries zero tolerance --- it is mandatory with no override permitted.*
>
> **3. Rationale and Source Notes**

The table below sets out the full basis for each proposed default. Reviewers should check that the cited standards are appropriate for their specific contract obligations and supplier base.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **\#**   **Event Type**                          **Basis for default values**
  -------- --------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  1        **Mine Extraction**                     Weighbridge and belt-scale variance for mineral concentrates. ASTM E1108 permits ±0.5--1.0% for correctly calibrated equipment. 1.0% adopted as the conservative upper bound. No linked prior event so date tolerance is N/A. Mass balance not applicable at extraction.

  2        **Concentration / Beneficiation**       Tungsten recovery from ore is typically 60--80% --- output is expected to be substantially less than input, so mass balance threshold flags only anomalous gains. 2.0% quantity tolerance reflects weighing variance across multiple transfer points. 30-day date window covers typical processing cycle. Mass balance threshold of 5% flags any output that inexplicably exceeds input by more than 5%.

  3        **Trading / Ownership Transfer**        Legal title transfer should match the prior custody event quantity exactly; 0.5% accounts only for weighbridge re-measurement at point of handover. 7 days covers typical commercial settlement and documentation lead time. Mass balance N/A --- no processing occurs.

  4        **Laboratory Assay**                    No quantity re-measurement at assay stage --- tolerance N/A. 14 days is the standard turnaround for ISO 17025-accredited laboratories for tungsten concentrate assay. Extend to 21 days if pilot suppliers use labs with longer certification cycles.

  5        **Primary Processing (Smelting)**       RMAP-audited smelters publish expected APT (ammonium paratungstate) recovery rates of 85--92% from concentrate. Output exceeding input by more than 10% is a strong anomaly indicator. 1.5% quantity tolerance covers re-weighing at smelter intake. 30-day date window reflects typical smelter batch cycle times.

  6        **Secondary Processing (Conversion)**   Conversion yield varies by product type (oxide, carbide, metal powder). 8% mass balance threshold is tighter than smelting as secondary conversion is a more controlled process. Reference each facility\'s own documented recovery rate as primary benchmark --- ASTM B777 covers tungsten metal powder specifications.

  7        **Warehousing / Storage**               Storage quantity should match the inbound consignment note exactly. 0.5% accounts only for re-weighing on receipt. 3-day date tolerance covers same-day to next-business-day logging practice; tighten to 1 day if warehouse systems are automated.

  8        **Export Clearance**                    CBP ACE allows ±2% on mineral shipment quantity declarations (19 CFR 141). 5-day date tolerance covers the gap between physical vessel departure and formal export declaration filing, which is standard commercial practice for ocean freight.

  9        **In-Transit Monitoring**               Quantity is not re-measured in transit --- N/A. 2-day date tolerance covers GPS waypoint timestamp lag and cellular connectivity gaps in remote shipping corridors. Flag any gap exceeding 48 hours between expected and actual waypoint confirmation.

  10       **Import Clearance**                    Mirrors export tolerance at ±2% per CBP ACE rules. 7-day date tolerance covers port processing time from vessel arrival to formal entry filing, which varies by port congestion and broker processing time. Section 232 exclusion references must reconcile exactly --- no tolerance applied to exclusion identifiers.

  11       **Customer Delivery**                   Final signed receipt quantity vs shipment manifest. 0.5% accounts for final weighing on delivery. 14-day date tolerance covers extended last-mile delivery scenarios including customs holds and delivery scheduling delays. Tighten to 7 days for domestic US delivery.

  12       **End-of-Life / Recycling Re-entry**    HIGH INTEGRITY EVENT --- tighter tolerances recommended throughout. 1.0% quantity tolerance matches mine extraction (the analogous \'entry point\' event). 3.0% mass balance threshold is the tightest in the chain --- any anomalous gain in a recycling re-entry event is a significant fraud indicator. Provenance break acknowledgement field has zero tolerance: it is mandatory with no override.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

> **4. Override Instructions**

Where a proposed default does not reflect actual operating conditions, record the override here before sign-off. Each override requires a named source or operational justification.

  ---------------------------------------------------------------------------------------------------------
  **\#**   **Event Type**                      **Override Value**   **Justification / Source**
  -------- ----------------------------------- -------------------- ---------------------------------------
  1        Mine Extraction                                          

  2        Concentration / Beneficiation                            

  3        Trading / Ownership Transfer                             

  4        Laboratory Assay                                         

  5        Primary Processing (Smelting)                            

  6        Secondary Processing (Conversion)                        

  7        Warehousing / Storage                                    

  8        Export Clearance                                         

  9        In-Transit Monitoring                                    

  10       Import Clearance                                         

  11       Customer Delivery                                        

  12       End-of-Life / Recycling Re-entry                         
  ---------------------------------------------------------------------------------------------------------

> **5. Sign-off**

By signing below, the named individuals confirm that the defaults in Section 2 (as modified by any overrides in Section 4) are approved for implementation in the Phase 1 Compliance Rule Engine configuration file.

  -------------------------------------------------------------------------------
  **Role**              **Name**          **Decision**          **Date**
  --------------------- ----------------- --------------------- -----------------
  Compliance Lead                         ☐ Approved ☐ Modify   

  Supply Chain Expert                     ☐ Approved ☐ Modify   

  CTO (witness)                           ☐ Confirmed           
  -------------------------------------------------------------------------------

*Once signed, transcribe approved values into compliance-config/tolerance-rules.json and commit with this document attached. Raise Jira/ADO ticket to close Decision D3.*
