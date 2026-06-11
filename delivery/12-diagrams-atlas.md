# Diagrams atlas — FM Work Order Hub

All key Mermaid diagrams in one place for reviews, client workshops, and architecture sign-off.

---

## 1. Solution context

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '12px'}}}%%
flowchart TB
    classDef pain fill:#ffcdd2,stroke:#c62828,color:#b71c1c
    classDef solve fill:#c8e6c9,stroke:#388e3c,color:#1b5e20
    classDef core fill:#e1bee7,stroke:#7b1fa2,color:#4a148c

    P1["Fragmented portals"]:::pain
    P2["Manual alert handling"]:::pain
    S1["FMWorkOrderHub"]:::solve
    S2["IntegrationServices"]:::solve
    K24["24K"]:::core
    OMNI["OMNI"]:::core

    P1 --> S1
    P2 --> S2 --> K24
    S1 -.-> OMNI
```

---

## 2. Enterprise landscape

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '12px'}}}%%
flowchart TB
    classDef ux fill:#c8e6c9,stroke:#388e3c,color:#1b5e20
    classDef int fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef core fill:#e1bee7,stroke:#7b1fa2,color:#4a148c
    classDef cloud fill:#e3f2fd,stroke:#1565c0,color:#0d47a1

    U1["FM Supervisor"] --> APP1["FMWorkOrderHub"]:::ux
    U2["Field Tech"] --> APP2["FieldInspection"]:::ux
    U3["Client"] --> APP3["ClientDashboard"]:::ux
    APP1 --> INT["IntegrationServices"]:::int
    APP2 --> INT
    INT --> APIM["Azure APIM"]:::cloud
    APIM --> K24["24K API"]:::core
    APIM --> OMNI["OMNI API"]:::core
    APP1 --> AD["Azure AD"]:::cloud
```

---

## 3. ODC dev environment

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '12px'}}}%%
flowchart TB
    classDef local fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
    classDef cloud fill:#e3f2fd,stroke:#1565c0,color:#0d47a1
    classDef mock fill:#fce4ec,stroke:#c2185b,color:#880e4f

    subgraph laptop["Developer laptop"]
        STU["ODC Studio"]:::local
        MOCK["mock-server.js"]:::mock
        NG["ngrok"]:::local
    end

    subgraph odc["ODC Cloud"]
        APP["FMWorkOrderHub"]:::cloud
        CONN["REST Connection"]:::cloud
    end

    STU --> APP
    MOCK --> NG --> CONN --> APP
```

---

## 4. Four application layers

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

---

## 5. Screen map

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TB
    HOME["Home"] --> LIST["WorkOrderList"]
    HOME --> ALERTS["AlertConsole"]
    LIST --> DETAIL["WorkOrderDetail"]
    LIST --> CREATE["CreateWorkOrder"]
    ALERTS --> CREATE
```

---

## 6. Entity model

```mermaid
%%{init: {'theme': 'base'}}%%
erDiagram
    SITE ||--o{ BUILDING : has
    BUILDING ||--o{ ASSET : has
    ASSET ||--o{ WORK_ORDER : has
    WORK_ORDER ||--o{ WORK_ORDER_EVENT : logs
```

---

## 7. Alert to work order sequence

```mermaid
sequenceDiagram
    autonumber
    participant UI as AlertConsole
    participant SA as CreateWorkOrderFromAlert
    participant DB as Platform DB
    participant API as 24K REST

    UI->>SA: AlertId, AssetExternalId
    SA->>DB: Create WorkOrder
    SA->>DB: Log CREATED event
    SA->>API: POST acknowledge
    API-->>SA: 200
    SA-->>UI: WorkOrderId
```

---

## 8. Reactive screen lifecycle

```mermaid
sequenceDiagram
    participant User
    participant Screen
    participant Agg as Aggregate

    User->>Screen: Navigate
    Screen->>Screen: On Initialize
    Screen->>Agg: Fetch on Render
    Agg-->>Screen: Data
    User->>Screen: Filter change
    Screen->>Agg: Refresh
```

---

## 9. Security model

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    USER["User"] --> AD["Azure AD"]
    AD --> ROLE["OutSystems Roles"]
    ROLE --> SCREEN["Screen check"]
    SCREEN --> SA["CheckSitePermission"]
    SA --> DB["Filtered data"]
```

---

## 10. CI/CD pipeline

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    DEV["DEV"] --> TC["TrueChange"]
    TC --> TST["TST"]
    TST --> UAT["UAT"]
    UAT --> PRD["PRD"]
```

---

## 11. BPT escalation

```mermaid
%%{init: {'theme': 'base'}}%%
stateDiagram-v2
    [*] --> Open
    Open --> Supervisor: 30 min
    Supervisor --> Escalated: timeout
    Supervisor --> Resolved: assigned
    Escalated --> ClientNotify: 4 h
    Resolved --> [*]
    ClientNotify --> [*]
```

---

## 12. Module dependencies

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TD
    DOM["FM_Domain"] --> INT["IntegrationServices"]
    DOM --> WO["FMWorkOrderHub"]
    INT --> WO
```

---

> **Source chapters:** [`01-solution-overview.md`](01-solution-overview.md) through [`11-fm-work-order-hub-guide.md`](11-fm-work-order-hub-guide.md) · [`resources/dev-environment-and-practice-diagrams.md`](../resources/dev-environment-and-practice-diagrams.md)
