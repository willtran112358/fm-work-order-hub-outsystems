# ODC platform layer

**Platform:** OutSystems Developer Cloud (ODC)  
**Runtime:** Managed cloud — no customer-managed application servers

---

## 1. ODC runtime stack

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '12px'}}}%%
flowchart TB
    classDef user fill:#e3f2fd,stroke:#1565c0,color:#0d47a1
    classDef edge fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef runtime fill:#e8f5e9,stroke:#388e3c,color:#1b5e20
    classDef data fill:#f3e5f5,stroke:#7b1fa2,color:#4a148c

    BROWSER["Browser / PWA<br/>Reactive Web"]:::user
    CDN["CDN + TLS termination"]:::edge
    FE["Front-end runtime<br/>generated JS + CSS"]:::runtime
    BE["Application server<br/>.NET — server actions, sessions"]:::runtime
    DB[("Platform database<br/>Azure SQL")]:::data
    EXT["External REST<br/>24K via APIM"]:::edge

    BROWSER --> CDN --> FE
    FE <-->|"JSON over HTTPS"| BE
    BE --> DB
    BE <-->|"Server-side only"| EXT
```

| Layer | Responsibility | Developer artifact |
|-------|----------------|-------------------|
| Front-end runtime | Render UI, run client actions | Screens, blocks, widgets |
| Application server | Business logic, integration, auth | Server actions, aggregates |
| Platform DB | Application state | Entities, indexes |
| ODC Portal | Deploy, monitor, integrate | Connections, deployments |

---

## 2. ODC Portal map (delivery operations)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    classDef create fill:#c8e6c9,stroke:#388e3c,color:#1b5e20
    classDef deliver fill:#bbdefb,stroke:#1565c0,color:#0d47a1
    classDef ops fill:#fff9c4,stroke:#f9a825,color:#f57f17

    CREATE["CREATE<br/>Apps · Workflows · Data"]:::create
    DELIVER["DELIVER<br/>Deployments · Environments"]:::deliver
    INTEGRATE["INTEGRATE<br/>Connections · APIs"]:::deliver
    MONITOR["MONITOR<br/>Logs · Traces · Analytics"]:::ops
    FORGE["FORGE<br/>UI patterns · Charts"]:::create

    CREATE --> DELIVER --> MONITOR
    INTEGRATE --> DELIVER
```

| Portal area | FM programme usage |
|-------------|-------------------|
| **CREATE → Apps** | `FMWorkOrderHub`, `IntegrationServices` |
| **CREATE → Workflows** | `AlertEscalationProcess` BPT |
| **DELIVER → Deployments** | DEV → TST → PRD promotion |
| **INTEGRATE → Connections** | 24K REST base URL + OAuth |
| **MONITOR → Logs** | REST failure triage, action errors |

---

## 3. Environment topology

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    classDef dev fill:#b3e5fc,stroke:#0288d1,color:#01579b
    classDef tst fill:#fff9c4,stroke:#fbc02d,color:#f57f17
    classDef prd fill:#ffcdd2,stroke:#e53935,color:#b71c1c

    DEV["DEV<br/>build · debug · ngrok mock"]:::dev
    TST["TST<br/>regression · UAT"]:::tst
    PRD["PRD<br/>client go-live"]:::prd

    DEV -->|"Publish + tag"| TST
    TST -->|"Change approval"| PRD
```

| Environment | 24K endpoint | Auth |
|-------------|--------------|------|
| DEV | ngrok → `mock-server.js` or APIM-dev | OAuth2 client credentials |
| TST | `apim-tst.sj.internal/24k/v1` | OAuth2 + test subscription |
| PRD | `apim.sj.internal/24k/v1` | OAuth2 + IP allowlist |

---

## 4. Publish flow (no-code platform operation)

```mermaid
sequenceDiagram
    autonumber
    participant Dev as Senior Engineer
    participant Studio as ODC Studio
    participant Portal as ODC Portal
    participant Env as Target Environment

    Dev->>Studio: TrueChange clean
    Dev->>Studio: 1-Click Publish
    Studio->>Portal: DELIVER → new deployment
    Portal->>Env: Compile + deploy modules
    Env-->>Dev: App URL live
    Dev->>Portal: MONITOR → verify logs
```

**Delivery checklist per publish:**

- [ ] Module dependency order: `FM_Domain` → `IntegrationServices` → `FMWorkOrderHub`
- [ ] Connection credentials scoped to target environment
- [ ] Smoke test: `WorkOrderList` loads, `GetOpenAlerts` returns data
- [ ] Deployment notes in change ticket

---

## 5. Module dependency (governance)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TD
    classDef foundation fill:#c8e6c9,stroke:#2e7d32,stroke-width:3px,color:#1b5e20
    classDef shared fill:#ffe0b2,stroke:#f57c00,stroke-width:2px,color:#e65100
    classDef app fill:#bbdefb,stroke:#1976d2,stroke-width:2px,color:#0d47a1

    SJUI["SJ_UI_Foundation<br/>theme · header · logging"]:::foundation
    DOM["FM_Domain<br/>entities only"]:::foundation
    INT["IntegrationServices<br/>REST 24K / OMNI"]:::shared
    WO["FMWorkOrderHub<br/>screens · actions"]:::app
    MOB["FieldInspection<br/>mobile screens"]:::app

    SJUI --> DOM
    DOM --> INT
    DOM --> WO
    INT --> WO
    DOM --> MOB
    INT --> MOB
```

**Rule:** Integration modules have **no UI** — prevents circular dependencies and enables independent contract versioning.
