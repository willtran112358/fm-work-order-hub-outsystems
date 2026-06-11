# Data model — Entities, aggregates, fetch on demand

**Foundation module:** `FM_Domain`  
**Spec:** [`samples/entity-model-facility-asset.spec.md`](../samples/entity-model-facility-asset.spec.md)

---

## 1. Entity relationship (delivered model)

```mermaid
%%{init: {'theme': 'base'}}%%
erDiagram
    SITE ||--o{ BUILDING : contains
    BUILDING ||--o{ ASSET : has
    ASSET ||--o{ WORK_ORDER : generates
    WORK_ORDER ||--o{ WORK_ORDER_EVENT : logs
    WORK_ORDER }o--|| WO_STATUS : status
    WORK_ORDER }o--|| WO_PRIORITY : priority
    ASSET }o--o| ASSET_TYPE : type

    SITE {
        Identifier Id PK
        Text Code UK
        Text Name
        Text ClientName
        Text TimeZone
    }
    BUILDING {
        Identifier Id PK
        Identifier SiteId FK
        Text Name
        Text Block
    }
    ASSET {
        Identifier Id PK
        Identifier BuildingId FK
        Text AssetTag
        Text External24KId
        Identifier AssetTypeId FK
    }
    WORK_ORDER {
        Identifier Id PK
        Identifier AssetId FK
        Text Title
        DateTime CreatedOn
        Identifier StatusId FK
        Identifier PriorityId FK
        Text AssignedTo
        Text SourceAlertId
    }
    WORK_ORDER_EVENT {
        Identifier Id PK
        Identifier WorkOrderId FK
        Text EventType
        Text CreatedBy
        DateTime CreatedOn
        Text Payload
    }
```

---

## 2. Static entities (reference data)

| Static entity | Records | Purpose |
|---------------|---------|---------|
| `WOStatus` | Open, InProgress, OnHold, Closed, Cancelled | Work order lifecycle |
| `WOPriority` | Critical, High, Medium, Low | SLA sorting |
| `AssetType` | AHU, Lift, Chiller, Pump, … | Icon + filter grouping |
| `EventType` | CREATED, ASSIGNED, STATUS_CHANGE, NOTE, CLOSED | Audit taxonomy |

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    classDef static fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef trans fill:#e8f5e9,stroke:#388e3c,color:#1b5e20

    WO["WorkOrder"]:::trans
    ST["WOStatus"]:::static
    PR["WOPriority"]:::static
    AT["AssetType"]:::static

    WO --> ST
    WO --> PR
```

---

## 3. Aggregate — data retrieve pattern

OutSystems **Aggregates** replace hand-written SQL for 95% of reads.

```mermaid
%%{init: {'theme': 'base'}}%%
sequenceDiagram
    autonumber
    participant Screen as WorkOrderList
    participant Agg as Aggregate GetWorkOrders
    participant DB as Platform DB

    Screen->>Agg: On Render — Fetch
    Agg->>DB: Optimised query (joins + filters)
    DB-->>Agg: Result set
    Agg-->>Screen: List bound to Table

    Note over Screen,Agg: Max records + StartIndex = server pagination
```

### Delivered aggregate: `GetWorkOrders`

```text
Aggregate: GetWorkOrders
  Source: WorkOrder
  Joins:
    Asset (WorkOrder.AssetId = Asset.Id)
    Building (Asset.BuildingId = Building.Id)
    Site (Building.SiteId = Site.Id)
    WOStatus, WOPriority
  Filters:
    Site.Id = GetSiteIdForUser()          -- row-level security
    WOStatus.Id = FilterStatus            -- optional, when FilterStatus <> Null
    WOPriority.Id = FilterPriority        -- optional
  Sort: WOPriority.Order asc, WorkOrder.CreatedOn desc
  Max records: MaxRecords (default 20)
  Start index: StartIndex
```

---

## 4. Fetch on demand

**Fetch on demand** defers data load until the user or event triggers it — improves first paint on heavy screens.

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TB
    classDef screen fill:#bbdefb,stroke:#1565c0,color:#0d47a1
    classDef data fill:#e8f5e9,stroke:#388e3c,color:#1b5e20

    INIT["Screen Initialize<br/>light variables only"]:::screen
    TAB["User clicks Alerts tab"]:::screen
    FETCH["Data Action: RefreshAlerts<br/>Fetch aggregate GetOpenAlerts"]:::data
    RENDER["Table renders alert rows"]:::screen

    INIT --> TAB --> FETCH --> RENDER
```

| Scenario | Strategy |
|----------|----------|
| `WorkOrderList` | Fetch on render — primary view |
| `AlertConsole` | **Fetch on demand** — tab click or Refresh button |
| `WorkOrderDetail` | Fetch on render — single record + events aggregate |
| `CreateWorkOrder` wizard step 2 | Fetch asset list only when step 2 opens |

### Data action (no-code pattern)

```text
Data Action: RefreshAlerts
  Aggregate: GetOpenAlertsFrom24K   -- server call wrapper
  On After Fetch:
    Assign AlertCount = GetOpenAlertsFrom24K.List.Length
```

---

## 5. Advanced Query policy

| Allowed | Requires approval |
|---------|-------------------|
| Aggregate with joins ≤ 5 tables | Advanced Query for reporting export |
| Index on `WorkOrder(StatusId, CreatedOn)` | Dynamic SQL |
| Calculated attributes in aggregate | Cross-database queries |

**Delivered index recommendations:**

```sql
-- Platform DBA script (reference/samples/reference/sql_asset_maintenance_queries.sql)
CREATE INDEX IX_WorkOrder_Status_CreatedOn ON OSUSR_xxx_WorkOrder (StatusId, CreatedOn DESC);
CREATE INDEX IX_Asset_External24KId ON OSUSR_xxx_Asset (External24KId);
```

---

## 6. External key — 24K bridge

| Entity field | Maps to | Rule |
|--------------|---------|------|
| `Asset.External24KId` | 24K asset registry | Immutable after create |
| `WorkOrder.SourceAlertId` | 24K alert ID | Set when created from AlertConsole |
| `Site.Code` | 24K `siteCode` param | e.g. `SIN-CAMPUS-01` |

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    OS["OutSystems Asset<br/>External24KId"] 
    K24["24K Asset Registry"]
    OS <-->|"GET /assets/{id}"| K24
```
