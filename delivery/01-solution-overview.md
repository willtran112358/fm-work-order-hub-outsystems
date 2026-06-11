# Solution overview — FM Work Order Hub

**Programme:** SJ FM Client Experience Modernisation  
**Solution name:** `FMWorkOrderHub` (+ foundation modules)  
**Platform:** OutSystems Developer Cloud (ODC)  
**Status:** Solution design & delivery specification

---

## 1. Problem statement

SJ operates world-class FM platforms — **24K** (IoT / digital twin) and **OMNI** (BIM / Smart FM analytics). Client-facing work execution (assign technician, track SLA, sign-off, audit) still fragments across spreadsheets and bespoke apps.

**OutSystems delivers:** a governed **experience layer** — not a replacement for 24K or OMNI.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '12px'}}}%%
flowchart TB
    classDef pain fill:#ffcdd2,stroke:#c62828,color:#b71c1c
    classDef solve fill:#c8e6c9,stroke:#388e3c,color:#1b5e20
    classDef core fill:#e1bee7,stroke:#7b1fa2,color:#4a148c

    P1["Fragmented client portals"]:::pain
    P2["Manual alert → work order"]:::pain
    P3["No audit trail on field close"]:::pain

    S1["FMWorkOrderHub<br/>Reactive Web"]:::solve
    S2["IntegrationServices<br/>24K REST wrapper"]:::solve
    S3["AlertEscalation BPT"]:::solve

    K24["24K Alerts API"]:::core
    OMNI["OMNI Analytics"]:::core

    P1 --> S1
    P2 --> S2
    P3 --> S3
    S2 --> K24
    S1 -.-> OMNI
```

---

## 2. Solution scope

| In scope | Out of scope |
|----------|--------------|
| Reactive web app `FMWorkOrderHub` | Replacing 24K digital twin |
| Foundation `FM_Domain` entities | OMNI BIM authoring |
| `IntegrationServices` REST to 24K | Custom IoT ingestion |
| `AlertConsole` + BPT escalation | ERP / finance integration |
| RBAC: Supervisor, FieldTech, ClientReadOnly | Native hardware SDKs |
| Audit entity `WorkOrderEvent` | Data warehouse ETL (separate workstream) |

---

## 3. Application portfolio

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    classDef p0 fill:#a5d6a7,stroke:#2e7d32,color:#1b5e20
    classDef p1 fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef found fill:#bbdefb,stroke:#1565c0,color:#0d47a1

    FND["FM_Domain"]:::found
    INT["IntegrationServices"]:::found
    WO["FMWorkOrderHub"]:::p0
    MOB["FieldInspection"]:::p1
    DASH["ClientDashboard"]:::p1

    FND --> WO
    FND --> MOB
    INT --> WO
    INT --> MOB
```

| Application | Type | Priority | Users |
|-------------|------|----------|-------|
| `FM_Domain` | Foundation (entities) | P0 | — |
| `IntegrationServices` | Foundation (REST) | P0 | — |
| `FMWorkOrderHub` | Reactive Web | P0 | FM supervisor, helpdesk |
| `FieldInspection` | Mobile / Reactive | P1 | Field technicians |
| `ClientDashboard` | Reactive Web | P1 | Client admin |

---

## 4. Deliverables (senior engineer)

| Deliverable | Location in repo |
|-------------|------------------|
| Solution architecture | `delivery/02`–`07`, `docs/03` |
| Entity & screen specifications | `samples/` |
| REST integration contract | `samples/rest-integration-24k-iot.spec.md` |
| Security & RBAC model | `delivery/08-security-authentication.md` |
| CI/CD & test strategy | `delivery/10-cicd-testing.md` |
| Implementation build guide | `delivery/11-fm-work-order-hub-guide.md` |
| Mock API for DEV/TST | `resources/mock-server.js` |

---

## 5. Success criteria

| KPI | Target |
|-----|--------|
| Alert → work order creation | < 2 min operator time |
| REST error visibility | 100% mapped to user message + log |
| Role-based site isolation | Zero cross-site data leak in UAT |
| Publish to TST | < 15 min via Lifetime pipeline |
| Audit completeness | Every status change → `WorkOrderEvent` |

---

## 6. Technology stack

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TB
    classDef odc fill:#e3f2fd,stroke:#1565c0,color:#0d47a1
    classDef az fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef sj fill:#e1bee7,stroke:#7b1fa2,color:#4a148c

    subgraph odc_layer["OutSystems ODC"]
        STU["ODC Studio"]:::odc
        APP["Reactive runtime"]:::odc
        DB[("Azure SQL<br/>platform DB")]:::odc
    end

    subgraph azure_layer["Azure"]
        AD["Azure AD B2B"]:::az
        APIM["API Management"]:::az
        AI["App Insights"]:::az
    end

    subgraph sj_core["SJ Digital Core"]
        K24["24K REST API"]:::sj
        OMNI["OMNI API"]:::sj
    end

    STU --> APP --> DB
    APP --> AD
    APP --> APIM --> K24
    APIM --> OMNI
    APP --> AI
```
