# Interview Prep — Head of Tech @ Surbana Jurong (OutSystems Senior)

**Candidate:** Tran Manh Tu · `willtran11235@gmail.com` · 0838810018  
**Interviewer:** Ivan Lim (`ivan.limwy@surbanajurong.com`) — Head of Tech  
**When:** Thu **25 Jun 2026**, 15:00–16:00 (GMT+7 / Indochina Time)  
**Where:** [Microsoft Teams](https://teams.live.com/meet/9329469970608?p=iBTJ8NNOxrs4bBkA2j)  
**Job:** [OutSystems Senior Developer — SJ](https://aniday.com/job-view/job-15661.html)  
**Your portfolio:** [fm-work-order-hub-outsystems](https://github.com/willtran112358/fm-work-order-hub-outsystems)

> **Disclaimer:** Public-source research for interview prep only — not affiliated with Surbana Jurong.

---

## 0. One glance before you join

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '13px'}}}%%
mindmap
  root((Head of Tech<br/>Interview))
    Who is SJ
      S$2.3B revenue
      16k staff · 7k projects
      24K + OMNI digital core
      OutSystems partner since 2018
    Your positioning
      Experience layer NOT replacement
      Integration discipline
      SDLC + mentoring
      Azure-aligned stack
    Proof you bring
      FM Work Order Hub repo
      REST 24K mock integration
      Security SiteId RBAC
      BPT escalation pattern
    Close strong
      90s pitch
      3 smart questions
      Confirm next steps
```

### 30-second pitch (memorize)

> "SJ already owns world-class FM data in **24K** and **OMNI**. OutSystems should be the **governed experience and workflow layer** on top — client portals, work orders, mobile field apps — integrated via **Integration Services** and **Azure APIM**, not a replacement for the twin platform. I've prepared an FM Work Order Hub solution package that shows how I'd deliver that: foundation modules first, REST contracts, site-scoped security, audit trail, and Lifetime-ready SDLC."

---

## 1. Interview flow (what Ivan likely probes)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    classDef intro fill:#e3f2fd,stroke:#1565c0,color:#0d47a1
    classDef deep fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
    classDef lead fill:#fff3e0,stroke:#ef6c00,color:#e65100
    classDef close fill:#f3e5f5,stroke:#7b1fa2,color:#4a148c

    A["Intro + CV<br/>10 min"]:::intro
    B["Architecture<br/>whiteboard 20 min"]:::deep
    C["Technical deep dive<br/>REST · security · perf 20 min"]:::deep
    D["Leadership + SDLC<br/>10 min"]:::lead
    E["Your questions<br/>10 min"]:::close

    A --> B --> C --> D --> E
```

| Segment | Head of Tech cares about | Your anchor phrase |
|---------|--------------------------|-------------------|
| **Intro** | Senior = independent delivery, not ticket-closer | "I own spec → deploy → hypercare" |
| **Architecture** | Strategic fit with 24K/OMNI | "Experience layer, system of record stays in 24K" |
| **Technical** | Production-grade integration & security | "APIM, OAuth, SiteId filter, audit events" |
| **Leadership** | Scale a small OSE bench (~4 public certs) | "Standards, code review, reusable foundation modules" |
| **Close** | Culture fit, long-term digital roadmap | Ask about squad, Lifetime, 24K API ownership |

---

## 2. SJ business context (answer "why us?")

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TB
    classDef client fill:#e3f2fd,stroke:#1565c0,color:#0d47a1
    classDef sj fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
    classDef digital fill:#fff9c4,stroke:#f9a825,color:#f57f17

    CLIENT["Government · Airport · Campus · REIT"]:::client
    SJ["SJ Group<br/>Consulting + PMC + Design<br/>~S$2.3B · ~16k staff"]:::sj
    ST["Surbana Technologies<br/>24K · OMNI · OutSystems"]:::digital
    PARTNER["Azure · Autodesk · OutSystems"]:::digital

    CLIENT -->|Professional services fees| SJ
    CLIENT -->|Platform + implementation| ST
    SJ --> ST
    ST --> PARTNER
```

| Fact | Value | Why it matters in interview |
|------|-------|---------------------------|
| Revenue (FY2024) | ~**S$2.3B** | Enterprise scale — governance matters |
| Headcount | ~**16,000** | Global delivery, need repeatable SDLC |
| Active projects | ~**7,000** | Can't build custom portal per project |
| Digital products | **24K** (IoT/twin), **OMNI** (FM/BIM) | You integrate — don't replace |
| OSE bench (public) | ~**4 associate certs** | Senior = mentoring + standards |
| Cloud bias | **Azure** (24K on Marketplace) | Lead with AD, APIM, App Insights |

### Pain → why they hire you

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    classDef pain fill:#ffcdd2,stroke:#c62828,color:#b71c1c
    classDef fix fill:#c8e6c9,stroke:#388e3c,color:#1b5e20

    P1["Fragmented client portals"]:::pain
    P2["Alert → Excel gap"]:::pain
    P3["Small OSE bench"]:::pain
    P4["Integration sprawl"]:::pain

    F1["Reusable Reactive apps"]:::fix
    F2["BPT + auto work order"]:::fix
    F3["Senior-led squad standards"]:::fix
    F4["IntegrationServices + APIM"]:::fix

    P1 --> F1
    P2 --> F2
    P3 --> F3
    P4 --> F4
```

---

## 3. Core architecture answer (whiteboard in 5 min)

**Prompt you'll likely get:** *"Campus FM client uses 24K for IoT. Design work orders on OutSystems."*

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '12px'}}}%%
flowchart TB
    classDef ux fill:#c8e6c9,stroke:#388e3c,color:#1b5e20
    classDef int fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef core fill:#e1bee7,stroke:#7b1fa2,color:#4a148c
    classDef cloud fill:#e3f2fd,stroke:#1565c0,color:#0d47a1

    U1["FM Supervisor"] --> APP1["FMWorkOrderHub<br/>Reactive Web"]:::ux
    U2["Field Tech"] --> APP2["FieldInspection<br/>Mobile"]:::ux
    U3["Client Admin"] --> APP3["ClientDashboard<br/>Read-only"]:::ux

    APP1 --> INT["IntegrationServices<br/>REST wrappers"]:::int
    APP2 --> INT
    INT --> CONN["ODC Connection"]:::int
    CONN --> APIM["Azure APIM"]:::cloud
    APIM --> K24["24K Alerts API"]:::core
    APIM --> OMNI["OMNI Analytics"]:::core

    APP1 --> AD["Azure AD SSO"]:::cloud
    APP1 --> DB[("Platform DB<br/>operational WO data")]:::ux
```

### As-Is → To-Be (one slide mental model)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    subgraph before["As-Is"]
        direction TB
        U["Users"] --> S["Silo apps + spreadsheets"]
        S --> K1["24K / OMNI"]
    end

    subgraph after["To-Be"]
        direction TB
        U2["Users"] --> O["OutSystems experience layer"]
        O --> IS["Integration Services"]
        IS --> K2["24K / OMNI unchanged"]
    end

    before -.->|transform| after
```

| Layer | System of record | OutSystems role |
|-------|------------------|-----------------|
| IoT / digital twin | **24K** | Consume alerts, acknowledge |
| FM analytics / BIM | **OMNI** | Read KPIs for dashboards |
| Work orders, assignments, audit | **Platform DB** | Own operational workflow |
| Identity | **Azure AD** | SSO + B2B client users |

**Golden rule (say this explicitly):** OutSystems = **governed experience layer** — not a replacement for 24K or OMNI.

---

## 4. Application portfolio (what you'd build)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    classDef p0 fill:#a5d6a7,stroke:#2e7d32,color:#1b5e20
    classDef p1 fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef found fill:#bbdefb,stroke:#1565c0,color:#0d47a1

    FND["FM_Domain<br/>entities"]:::found
    INT["IntegrationServices<br/>REST"]:::found
    WO["FMWorkOrderHub<br/>P0"]:::p0
    MOB["FieldInspection<br/>P1"]:::p1
    BPT["AlertEscalationProcess<br/>P1"]:::p1

    FND --> WO
    FND --> MOB
    INT --> WO
    INT --> MOB
    WO --> BPT
```

| App | Type | Priority | Users |
|-----|------|----------|-------|
| `FM_Domain` | Foundation (entities) | P0 | — |
| `IntegrationServices` | Foundation (REST) | P0 | — |
| `FMWorkOrderHub` | Reactive Web | P0 | FM supervisor, helpdesk |
| `FieldInspection` | Mobile / Reactive | P1 | Field technicians |
| `AlertEscalationProcess` | BPT workflow | P1 | Automated escalation |

---

## 5. Alert → Work Order flow (domain story)

```mermaid
sequenceDiagram
    autonumber
    participant UI as AlertConsole
    participant SA as CreateWorkOrderFromAlert
    participant DB as Platform DB
    participant API as 24K REST via APIM

    UI->>SA: AlertId, AssetExternalId
    SA->>DB: Check duplicate SourceAlertId
    alt Already open WO
        SA-->>UI: Return existing WorkOrderId
    else New alert
        SA->>DB: Create WorkOrder + CREATED event
        SA->>API: POST acknowledge
        API-->>SA: 200 OK
        SA-->>UI: WorkOrderId
    end
```

### Entity model (keep simple on whiteboard)

```mermaid
erDiagram
    SITE ||--o{ BUILDING : has
    BUILDING ||--o{ ASSET : has
    ASSET ||--o{ WORK_ORDER : has
    WORK_ORDER ||--o{ WORK_ORDER_EVENT : logs
    WORK_ORDER {
        text SourceAlertId
        text Status
        datetime CreatedOn
    }
```

---

## 6. OutSystems four layers (technical depth)

```mermaid
%%{init: {'theme': 'forest'}}%%
flowchart TB
    subgraph presentation["Presentation"]
        SCR["Screens · Blocks · Containers"]
        CA["Client Actions"]
    end
    subgraph business["Business Logic"]
        SA["Server Actions"]
        BPT["Business Processes"]
    end
    subgraph domain["Domain"]
        ENT["Entities · Static Entities"]
        AGG["Aggregates"]
    end
    subgraph integration["Integration"]
        REST["REST API Methods"]
        STR["Structures"]
    end

    SCR --> CA --> SA --> ENT
    SA --> AGG
    SA --> REST --> STR
    BPT --> SA
```

| Question | Short answer |
|----------|--------------|
| Client vs server action? | UI orchestration → client; business rules, DB, secrets → **server only** |
| Foundation vs app module? | `FM_Domain` + `IntegrationServices` shared; UI apps consume them |
| Reactive vs Traditional Web? | SJ greenfield FM portals → **Reactive** (mobile-first, modern UX) |
| Where do REST secrets live? | ODC Connection per env — **never** screen variables |

---

## 7. Integration pattern (REST + APIM)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    classDef os fill:#c8e6c9,stroke:#388e3c,color:#1b5e20
    classDef gw fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef core fill:#e1bee7,stroke:#7b1fa2,color:#4a148c

    APP["FMWorkOrderHub<br/>Server Actions"]:::os
    INT["IntegrationServices<br/>GetOpenAlerts24K"]:::os
    CONN["ODC Connection<br/>OAuth2 + base URL"]:::os
    APIM["Azure APIM<br/>rate limit · keys"]:::gw
    K24["24K API"]:::core

    APP --> INT --> CONN --> APIM --> K24
```

```mermaid
sequenceDiagram
    participant SA as GetOpenAlerts24K
    participant REST as REST entity
    participant APIM as Azure APIM
    participant K24 as 24K

    SA->>REST: GET /sites/{siteCode}/alerts
    REST->>APIM: HTTPS + subscription key
    APIM->>K24: Forward
    K24-->>APIM: AlertList JSON
    APIM-->>REST: 200
    REST-->>SA: Structure AlertList
```

### Integration checklist (say out loud)

| # | Practice | Why |
|---|----------|-----|
| 1 | Wrapper server actions in `IntegrationServices` | UI never calls REST directly |
| 2 | Map HTTP errors to user message + log | 100% error visibility |
| 3 | Idempotency on `SourceAlertId` | No duplicate WOs in alert storm |
| 4 | `correlationId` in logs | Cross-system troubleshooting |
| 5 | Mock API in DEV (`mock-server.js` + ngrok) | Test without 24K prod access |
| 6 | Contract tests at APIM | Vendor upgrade won't break silently |

---

## 8. Security model (Head of Tech will drill here)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TB
    classDef id fill:#e3f2fd,stroke:#1565c0,color:#0d47a1
    classDef os fill:#e8f5e9,stroke:#388e3c,color:#1b5e20
    classDef data fill:#f3e5f5,stroke:#7b1fa2,color:#4a148c

    USER["End user"]:::id
    AD["Azure AD B2B / OIDC"]:::id
    ROLE["OutSystems Roles"]:::os
    SCREEN["Screen role check"]:::os
    SA["CheckSitePermission<br/>server action"]:::os
    AGG["Aggregate filtered by SiteId"]:::data
    AUDIT["WorkOrderEvent"]:::data

    USER --> AD --> ROLE --> SCREEN --> SA --> AGG
    SA --> AUDIT
```

| Role | Access |
|------|--------|
| `FM_Supervisor` | Full work order CRUD, assign, close |
| `FieldTech` | Assigned WOs, status updates |
| `ClientReadOnly` | Dashboard filtered by site |
| `Admin` | Site config, user-site mapping |

**Critical line:** *"Never rely on UI filters alone — every server action checks SiteId."*

### Security incident response (scenario)

```mermaid
flowchart TD
    A["P1: Client sees another campus data"] --> B["Root cause?<br/>Missing SiteId in aggregate"]
    B --> C["Hotfix: add filter + audit all screens"]
    C --> D["Automated test on security filter"]
    D --> E["Postmortem: code review checklist update"]
```

---

## 9. Performance & scalability

```mermaid
flowchart LR
    classDef bad fill:#ffcdd2,stroke:#c62828,color:#b71c1c
    classDef good fill:#c8e6c9,stroke:#388e3c,color:#1b5e20

    B1["Fetch 50k rows<br/>28s load"]:::bad
    B2["No index on SiteId+Status"]:::bad
    B3["N+1 joins in aggregate"]:::bad

    G1["Server-side pagination<br/>~1.8s load"]:::good
    G2["Index WorkOrder<br/>SiteId, StatusId, CreatedOn"]:::good
    G3["Fetch on demand<br/>minimal joins"]:::good

    B1 --> G1
    B2 --> G2
    B3 --> G3
```

| KPI | Target language |
|-----|-----------------|
| Screen load (asset list) | < **2s** with pagination |
| Alert → work order | < **2 min** operator time |
| REST reliability | **99.5%** + circuit breaker when 24K down |
| Publish to TST | < **15 min** via Lifetime pipeline |
| Audit | Every status change → `WorkOrderEvent` |

---

## 10. BPT escalation (workflow depth)

```mermaid
stateDiagram-v2
    [*] --> Open: Alert creates WO
    Open --> Assigned: Supervisor assigns
    Assigned --> InProgress: Tech starts
    InProgress --> Escalated: SLA timer fires
    Escalated --> InProgress: Supervisor action
    InProgress --> Closed: Sign-off
    Closed --> [*]

    note right of Escalated
        BPT human activity
        or timer-based escalation
    end note
```

| BPT topic | Answer |
|-----------|--------|
| Human vs timer | Timer for SLA breach → human activity for supervisor |
| Cancel BPT | Close WO early → terminate process instance |
| Duplicate instances | Guard: one BPT per WorkOrderId |
| Maker-checker | Separate roles on approve/close actions |

---

## 11. CI/CD & SDLC (senior ownership)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    DEV["DEV"] --> TC["TrueChange review"]
    TC --> TST["TST"]
    TST --> UAT["UAT"]
    UAT --> PRD["PRD"]
```

```mermaid
flowchart TB
    REQ["Requirements<br/>samples/*.spec.md"] --> DESIGN["Architecture Canvas<br/>+ integration ADR"]
    DESIGN --> BUILD["Foundation first<br/>IntegrationServices"]
    BUILD --> TEST["Server action tests<br/>+ mock API"]
    TEST --> DEPLOY["Lifetime promotion"]
    DEPLOY --> OPS["Service Center<br/>+ App Insights"]
```

### Definition of Done (say confidently)

| DoD item | Detail |
|----------|--------|
| Spec updated | Entity table, screen map, acceptance criteria |
| Peer review | Server actions + aggregates reviewed |
| Security | SiteId filter verified |
| Integration | Error mapping + mock test passed |
| UAT script | Supervisor + field tech paths |
| No P1 in Service Center | Before promote to next env |

---

## 12. Code review scenario (spot the bugs)

**Given (intentionally bad pseudo-code):**

```text
Server Action CreateWorkOrderFromAlert(AlertId, SiteCode)
  Set APIKey = GetGlobalConfig().ApiKey   // from screen path
  REST GET http://24k.internal/alerts/{AlertId}
  Create WorkOrder (no duplicate check)
  Assign to "tech1@sj.com"
  // No audit log
```

```mermaid
flowchart TD
    classDef bug fill:#ffcdd2,stroke:#c62828,color:#b71c1c
    classDef fix fill:#c8e6c9,stroke:#388e3c,color:#1b5e20

    B1["API key exposed"]:::bug --> F1["ODC Connection server-only"]:::fix
    B2["HTTP not HTTPS"]:::bug --> F2["TLS + APIM"]:::fix
    B3["No idempotency"]:::bug --> F3["Check SourceAlertId"]:::fix
    B4["Hardcoded assignee"]:::bug --> F4["Queue / round-robin"]:::fix
    B5["No audit"]:::bug --> F5["WorkOrderEvent log"]:::fix
    B6["No REST error handling"]:::bug --> F6["Map errors, don't lose alert"]:::fix
```

---

## 13. Decision tree — "how would you handle X?"

```mermaid
flowchart TD
    Q["Technical question from Ivan"] --> A{"About architecture?"}
    A -->|Yes| A1["24K stays system of record<br/>OSE = experience layer"]
    A -->|No| B{"About integration?"}
    B -->|Yes| B1["IntegrationServices wrapper<br/>APIM + OAuth + error map"]
    B -->|No| C{"About security?"}
    C -->|Yes| C1["AD SSO + role + SiteId server check"]
    C -->|No| D{"About team/SDLC?"}
    D -->|Yes| D1["Foundation first, code review,<br/>specs, mentoring juniors"]
    D -->|No| E["Honest experience +<br/>how you'd learn it fast"]
```

### Scenario quick answers

| Scenario | Root cause | Fix |
|----------|------------|-----|
| **100 alerts/min → duplicate WOs** | No dedupe on `SourceAlertId` | Idempotency + batch queue + flood dashboard |
| **One campus list timeout** | Data spike or missing pagination | Index + pagination; check alert storm |
| **24K API down** | External dependency | Graceful degradation, queue retry, manual reconcile screen |
| **Client cross-site data leak** | Aggregate missing SiteId filter | Hotfix + audit all queries + automated security test |

---

## 14. STAR stories (fill with your real projects)

```mermaid
flowchart LR
  subgraph star["STAR Framework"]
    S["Situation"] --> T["Task"] --> A["Action"] --> R["Result"]
  end
```

### Template 1 — Integration failure

| | |
|--|--|
| **S** | Production REST to external API returned 500 after vendor upgrade |
| **T** | Restore FM workflow without duplicate work orders |
| **A** | Circuit breaker, retry queue, manual reconcile screen; APIM contract tests |
| **R** | Zero duplicates; mean time to recover **X hours** |

### Template 2 — Performance

| | |
|--|--|
| **S** | Junior published aggregate fetching 50k rows — client UAT at risk |
| **T** | Fix before go-live |
| **A** | Code review, pagination pattern doc, pair programming |
| **R** | Load **28s → 1.8s**; pattern reused in second app |

### Template 3 — Business impact (SJ-aligned)

| | |
|--|--|
| **S** | Campus FM tracked WOs in Excel; 24K had alerts but no closed loop |
| **T** | Mobile-friendly WO app integrated to 24K in one quarter |
| **A** | Entity model, REST consumer, BPT escalation, Azure AD SSO; mentored 2 juniors |
| **R** | Alert acknowledge **4h → 45min**; **~30% less effort** on second campus |

---

## 15. Phased delivery roadmap (if asked "how would you start?")

```mermaid
gantt
    title FM Work Order Hub — Phased delivery
    dateFormat  YYYY-MM-DD
    section Foundation
    IntegrationServices + SSO + envs     :f0, 2026-07-01, 6w
    section MVP
    FMWorkOrderHub + 24K alerts          :f1, after f0, 8w
    section Mobile
    FieldInspection app                  :f2, after f1, 6w
    section Portal
    ClientDashboard                      :f3, after f2, 8w
```

| Phase | Weeks | Outcome |
|-------|-------|---------|
| **0 Foundation** | 1–6 | Integration Services, SSO, DEV/TST envs |
| **1 FM Hub** | 7–14 | Work orders + 24K alert integration |
| **2 Mobile** | 15–20 | Field inspection |
| **3 Portal** | 21–28 | Client-facing dashboard |
| **4 Decommission** | Ongoing | Retire silo apps |

---

## 16. Questions to ask Ivan (pick 3)

```mermaid
mindmap
  root((Ask Ivan))
    Strategy
      OSE vs 24K/OMNI positioning
      12-month digital roadmap
    Delivery
      Squad size and cert levels
      Lifetime env strategy
      APIM + Azure AD standard?
    Role
      Client-facing FM vs internal products
      Mentoring expectation
      Success in first 90 days
```

1. How is OutSystems positioned today — **experience layer** on 24K/OMNI, or also internal ERP replacement?
2. What does the OutSystems squad look like (size, cert levels), and what's the mentoring expectation for this Senior role?
3. Is Lifetime / DEV→TST→UAT→PRD already standard for client FM engagements?
4. Who owns the 24K API contract — your team or a separate integration group?
5. What would success look like in my **first 90 days**?

---

## 17. Red flags to avoid

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TD
    classDef bad fill:#ffcdd2,stroke:#c62828,color:#b71c1c

    R1["Replace 24K with OSE DB for IoT"]:::bad
    R2["Low-code = no code review"]:::bad
    R3["UI-only security filter"]:::bad
    R4["Ignore Azure stack"]:::bad
    R5["No documentation / SDLC"]:::bad
    R6["Secrets in client variables"]:::bad
```

---

## 18. Tech stack one picture

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TB
    classDef odc fill:#e3f2fd,stroke:#1565c0,color:#0d47a1
    classDef az fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef sj fill:#e1bee7,stroke:#7b1fa2,color:#4a148c

    subgraph odc_layer["OutSystems ODC"]
        STU["ODC Studio"]:::odc
        APP["Reactive runtime"]:::odc
        DB[("Azure SQL platform DB")]:::odc
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

---

## 19. Top 15 likely questions — flash answers

| # | Question | 20-second answer |
|---|----------|------------------|
| 1 | What is 24K in one sentence? | SJ's Azure-based IoT/digital twin platform — system of record for sensor and asset telemetry |
| 2 | OMNI vs OutSystems? | OMNI = FM/BIM analytics; OutSystems = workflows, portals, mobile execution |
| 3 | O11 vs ODC? | ODC = cloud-native studio + runtime; same concepts, different hosting/ops model |
| 4 | Foundation module? | Shared `FM_Domain` entities + `IntegrationServices` — DRY across apps |
| 5 | REST secrets? | ODC Connection per environment — rotated, never in code |
| 6 | Idempotency for alerts? | Check `SourceAlertId` before create; return existing WO if open |
| 7 | 100k work orders on list? | Server-side pagination, indexes on SiteId+Status+CreatedOn, minimal joins |
| 8 | Multi-tenant security? | `UserSiteMapping` + `CheckSitePermission` on every server action |
| 9 | 24K API down? | Circuit breaker, cached read-only mode, queue retries, supervisor manual path |
| 10 | BPT vs server action? | BPT for long-running human/timer workflows; server action for transactional steps |
| 11 | Test without prod 24K? | `mock-server.js` + ngrok in DEV; contract tests at APIM |
| 12 | Architecture Canvas? | Living diagram — modules, integrations, security boundaries for reviews |
| 13 | Your DoD? | Spec, peer review, security check, UAT script, no P1 in Service Center |
| 14 | Why SJ? | Rare combo: built-environment domain + 24K/OMNI + OutSystems partnership |
| 15 | Azure vs AWS here? | SJ is Azure-heavy; I'd lead with AD/APIM — AWS patterns transfer |

---

## 20. Day-of checklist

```mermaid
flowchart TD
    START["T-60 min"] --> T1["Re-read §0 pitch + §3 architecture"]
    T1 --> T2["Open repo: delivery/12-diagrams-atlas.md"]
    T2 --> T3["Test Teams link + mic/camera"]
    T3 --> T4["Paper: SiteId security + idempotency"]
    T4 --> JOIN["T-5 min: Join Teams"]
    JOIN --> INTRO["Intro: name, years OSE, FM repo ready"]
    INTRO --> WB["Whiteboard: §3 diagram"]
    WB --> CLOSE["Close: §16 questions + thank Ivan"]
```

| Item | Done |
|------|------|
| Teams link tested | ☐ |
| 30s pitch rehearsed out loud | ☐ |
| Whiteboard / share screen ready | ☐ |
| Repo link handy: `github.com/willtran112358/fm-work-order-hub-outsystems` | ☐ |
| Reply **Yes** to calendar invite if not yet confirmed | ☐ |
| Quiet room, stable internet | ☐ |

---

## 21. Repo deep-dive map (if Ivan asks "show me your work")

| Topic | File |
|-------|------|
| Solution overview | `delivery/01-solution-overview.md` |
| All diagrams | `delivery/12-diagrams-atlas.md` |
| REST integration spec | `samples/rest-integration-24k-iot.spec.md` |
| Work order portal spec | `samples/work-order-fm-portal.spec.md` |
| Security & RBAC | `delivery/08-security-authentication.md` |
| Business context | `docs/01-business-context.md` |
| As-Is → To-Be summary | `docs/04-as-is-to-be-summary.md` |
| Mock 24K API | `resources/mock-server.js` |
| Build guide | `delivery/11-fm-work-order-hub-guide.md` |

---

## 22. 90-second closing (memorize)

> "I'm excited about Surbana Technologies because you're one of few built-environment firms with both a **digital twin platform** and an **OutSystems partnership** — the Senior role is about turning that into **repeatable client delivery**. I'd bring full SDLC ownership, integration discipline with 24K, site-scoped security, and the mentoring needed to grow your OSE bench. I've documented an FM Work Order Hub approach in my GitHub repo and I'm ready to contribute from day one."

---

**Good luck tomorrow, Tu.** Lead with architecture clarity, prove production thinking, and ask Ivan about squad strategy — Heads of Tech hire for **scale**, not just syntax.
