# Database & persistence

**Database:** Azure SQL (ODC-managed platform database)  
**Module:** `FM_Domain` entities

---

## 1. Persistence model

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '12px'}}}%%
flowchart TB
    classDef app fill:#e8f5e9,stroke:#388e3c,color:#1b5e20
    classDef db fill:#f3e5f5,stroke:#7b1fa2,color:#4a148c
    classDef ext fill:#eceff1,stroke:#607d8b,color:#37474f

    ENT["OutSystems Entities<br/>FM_Domain"]:::app
    AGG["Aggregates<br/>optimised reads"]:::app
    ADV["Advanced Query<br/>exception only"]:::app
    TBL["OSUSR_* tables<br/>Azure SQL"]:::db
    IDX["Indexes"]:::db
    K24["24K<br/>system of record IoT"]:::ext

    ENT --> TBL
    AGG --> TBL
    ADV --> TBL
    TBL --> IDX
    ENT -.->|"External24KId ref only"| K24
```

---

## 2. What lives in platform DB vs 24K

| Data | System of record | OutSystems holds |
|------|------------------|------------------|
| Sensor telemetry | 24K | — |
| Digital twin graph | 24K | — |
| BIM model | OMNI | — |
| Work orders | **OutSystems** | Full lifecycle |
| Assignment / SLA | **OutSystems** | Yes |
| Audit events | **OutSystems** | `WorkOrderEvent` |
| Asset registry (ops) | 24K (master) | Cache subset + `External24KId` |

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    K24["24K<br/>telemetry + twin"] 
    OS["Platform DB<br/>work orders"]
    OMNI["OMNI<br/>BIM analytics"]

    K24 -->|"REST read"| OS
    OMNI -->|"REST read"| OS
```

---

## 3. Entity physical design

| Entity | Est. rows (year 1) | Growth | Index |
|--------|-------------------|--------|-------|
| `Site` | 50 | Low | PK |
| `Building` | 500 | Low | SiteId |
| `Asset` | 50,000 | Medium | External24KId, BuildingId |
| `WorkOrder` | 200,000 | High | StatusId+CreatedOn, AssetId |
| `WorkOrderEvent` | 1M+ | High | WorkOrderId+CreatedOn |

---

## 4. Transaction patterns

```text
Server Action: CloseWorkOrder
  Start Transaction

  Update WorkOrder.StatusId = Closed
  LogWorkOrderEvent(CLOSED)
  // Optional: Notify24K — async preferred

  Commit Transaction

  On Error
    Rollback Transaction
    Raise
```

| Pattern | Use |
|---------|-----|
| Single transaction | WO update + audit event |
| No transaction | Read-only aggregates |
| Async handoff | Email / webhook after commit |

---

## 5. Advanced Query policy

Delivered rule: **Aggregates first.**

| Scenario | Tool |
|----------|------|
| List with 4 joins | Aggregate |
| CSV export 10k rows | Advanced Query + timer action |
| Cross-module report | Separate reporting module |
| Full-text search | Extension or external search |

Reference SQL: [`samples/reference/sql_asset_maintenance_queries.sql`](../samples/reference/sql_asset_maintenance_queries.sql)

---

## 6. Backup & DR (ODC managed)

| Concern | ODC responsibility | Team responsibility |
|---------|-------------------|---------------------|
| DB backup | Platform SLA | Verify restore in TST yearly |
| Point-in-time | ODC portal | Document RPO/RTO |
| Entity export | Manual OML | Version in git specs |
| Secrets | Not in DB | Connections per env |

---

## 7. Data migration (bootstrap)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    CSV["Site/Building CSV"] --> SA["BootstrapSites action"]
    K24API["24K asset export"] --> SA2["ImportAssets action"]
    SA --> DB["Platform DB"]
    SA2 --> DB
```

One-time server actions — disabled in PRD after cutover.
