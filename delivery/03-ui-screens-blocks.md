# UI layer — Screens, blocks, containers

**Application:** `FMWorkOrderHub` (Reactive Web)  
**Pattern:** Layout + UI Flow + reusable blocks

---

## 1. UI composition model

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '12px'}}}%%
flowchart TB
    classDef layout fill:#e3f2fd,stroke:#1565c0,color:#0d47a1
    classDef flow fill:#e8f5e9,stroke:#388e3c,color:#1b5e20
    classDef block fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef widget fill:#f3e5f5,stroke:#7b1fa2,color:#4a148c

    LAY["Layout<br/>MainLayout"]:::layout
    FLOW["UI Flow<br/>WorkOrdersFlow"]:::flow
    SCR["Screen<br/>WorkOrderList"]:::flow
    BLK["Block<br/>WorkOrderCard"]:::block
    CON["Container<br/>vertical stack"]:::widget
    WID["Widgets<br/>Table · Button · Badge"]:::widget

    LAY --> FLOW --> SCR
    SCR --> CON --> BLK
    SCR --> WID
```

| Artifact | Purpose | FM example |
|----------|---------|------------|
| **Layout** | Shell: header, menu, footer | `SJ_MainLayout` — logo, user menu |
| **UI Flow** | Group related screens | `WorkOrdersFlow` |
| **Screen** | One route / view | `WorkOrderList`, `AlertConsole` |
| **Block** | Reusable UI fragment | `PriorityBadge`, `WorkOrderTimeline` |
| **Container** | Layout structure | Vertical / horizontal / columns |
| **Widget** | Atomic control | Table, Form, Button, Expression |

---

## 2. Screen map — FMWorkOrderHub

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TB
    classDef home fill:#c8e6c9,stroke:#388e3c,color:#1b5e20
    classDef list fill:#bbdefb,stroke:#1565c0,color:#0d47a1
    classDef detail fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef alert fill:#ffcdd2,stroke:#c62828,color:#b71c1c

    HOME["Home<br/>KPI tiles"]:::home
    LIST["WorkOrderList<br/>filters + table"]:::list
    DETAIL["WorkOrderDetail<br/>timeline + actions"]:::detail
    CREATE["CreateWorkOrder<br/>2-step wizard"]:::list
    ALERTS["AlertConsole<br/>24K live feed"]:::alert

    HOME --> LIST --> DETAIL
    HOME --> ALERTS
    LIST --> CREATE
    ALERTS -->|"Create from alert"| CREATE
```

---

## 3. Screen anatomy (WorkOrderList)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TB
    subgraph screen["Screen: WorkOrderList"]
        direction TB
        H["Header block<br/>title + New button"]
        F["Filter container<br/>Status · Priority · Building · Date"]
        T["Table widget<br/>bound to Aggregate GetWorkOrders"]
        P["Pagination container<br/>StartIndex / MaxRecords"]
    end

    H --> F --> T --> P
```

### Delivered UI specification

| Zone | Widget / block | Data binding |
|------|----------------|--------------|
| Header | Title + Button `NewWorkOrder` | — |
| Filters | Dropdowns + DatePicker | Local variables `FilterStatus`, `FilterPriority` |
| Table | Table (columns from aggregate) | `GetWorkOrders` aggregate |
| Pagination | Previous / Next | `StartIndex`, `MaxRecords = 20` |
| Row click | Navigate | `WorkOrderDetail` with `WorkOrderId` input |

---

## 4. Block pattern — WorkOrderTimeline

Reusable across `WorkOrderDetail` and `ClientDashboard`.

```text
Block: WorkOrderTimeline
Input: WorkOrderId (Work Order Identifier)

Internal:
  Aggregate GetWorkOrderEvents
    Source: WorkOrderEvent
    Filter: WorkOrderId = Input.WorkOrderId
    Sort: CreatedOn ascending

UI:
  List → ForEach event
    Expression: EventType + CreatedBy + CreatedOn
    Icon by EventType (CREATED, ASSIGNED, STATUS_CHANGE, CLOSED)
```

---

## 5. Container layout patterns

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    classDef col fill:#e8f5e9,stroke:#388e3c,color:#1b5e20

    subgraph two_col["Two-column (Detail screen)"]
        direction LR
        LEFT["Left 60%<br/>form + description"]:::col
        RIGHT["Right 40%<br/>timeline block"]:::col
    end

    subgraph stack["Vertical stack (Mobile)"]
        direction TB
        A["Asset summary"]:::col
        B["Action buttons"]:::col
        C["Photo upload"]:::col
    end
```

| Pattern | Use when |
|---------|----------|
| Columns 60/40 | Detail + sidebar timeline |
| Vertical stack | Mobile field inspection |
| Tabs | Settings vs history (avoid > 3 tabs) |
| Modal popup | Quick assign — not full navigation |

---

## 6. Responsive & accessibility (delivery standard)

| Rule | Implementation |
|------|----------------|
| Touch targets | Buttons ≥ 44px on field screens |
| Priority colours | Badge block — not colour-only (add icon + text) |
| Loading state | `IsDataFetched` on aggregates — show spinner container |
| Empty state | Expression + illustration when zero work orders |
| Error banner | Block `ErrorBanner` — bound to `LastErrorMessage` local var |

Full screen spec: [`samples/work-order-fm-portal.spec.md`](../samples/work-order-fm-portal.spec.md)
