# CI/CD, testing & monitoring

**Pipeline:** OutSystems Lifetime (or ODC DELIVER for cloud-only)  
**Monitoring:** ODC MONITOR + Azure App Insights

---

## 1. CI/CD pipeline

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '12px'}}}%%
flowchart LR
    classDef dev fill:#b3e5fc,stroke:#0288d1,color:#01579b
    classDef gate fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef prod fill:#ffcdd2,stroke:#e53935,color:#b71c1c

    DEV["DEV<br/>ODC Studio publish"]:::dev
    TC["TrueChange<br/>zero errors"]:::gate
    UT["Unit / API tests"]:::gate
    TST["TST deploy<br/>tag v1.2.0"]:::gate
    UAT["UAT sign-off"]:::gate
    PRD["PRD promote"]:::prod

    DEV --> TC --> UT --> TST --> UAT --> PRD
```

| Stage | Gate | Owner |
|-------|------|-------|
| DEV | TrueChange clean | Developer |
| TST | Automated smoke + peer review | Senior engineer |
| UAT | Client FM supervisor sign-off | BA + client |
| PRD | Change advisory board | Release manager |

---

## 2. Module publish order

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TD
    M1["1. SJ_UI_Foundation"] --> M2["2. FM_Domain"]
    M2 --> M3["3. IntegrationServices"]
    M3 --> M4["4. FMWorkOrderHub"]
    M4 --> M5["5. BPT AlertEscalation"]
```

Breaking change in `IntegrationServices` → regression all consumers before PRD.

---

## 3. Test strategy

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TB
    classDef auto fill:#c8e6c9,stroke:#388e3c,color:#1b5e20
    classDef manual fill:#fff9c4,stroke:#f9a825,color:#f57f17

    UNIT["Server action unit tests<br/>BDD framework"]:::auto
    API["REST contract tests<br/>mock + TST APIM"]:::auto
    UI["Reactive UI tests<br/>BDD in ODC"]:::auto
    E2E["E2E: alert → WO → close"]:::manual
    SEC["Security role matrix"]:::manual
    PERF["Load: 50 concurrent lists"]:::manual
```

### Delivered test cases

| ID | Scenario | Type |
|----|----------|------|
| T01 | CreateWorkOrder happy path | Unit |
| T02 | CreateWorkOrderFromAlert + 409 ack | Unit |
| T03 | GetOpenAlerts24K maps 500 error | Integration |
| T04 | ClientReadOnly cross-site blocked | Security |
| T05 | WorkOrderList pagination 20 rows | UI |
| T06 | BPT escalates after 30 min | Process |

### Server action unit test (pattern)

```text
Test: CreateWorkOrder_ValidAsset_ReturnsId
  Setup: Seed Asset, Site, User with FM_Supervisor
  Execute: CreateWorkOrder(AssetId, ...)
  Assert: WorkOrderId <> NullIdentifier
  Assert: WorkOrderEvent count = 1, type CREATED
```

---

## 4. ODC MONITOR operations

| Signal | Where | Action |
|--------|-------|--------|
| REST 5xx spike | MONITOR → Logs | Page on-call |
| Slow aggregate | Analytics | Add index / reduce joins |
| Failed publish | DELIVER | Rollback deployment |
| Auth errors | Logs filter `401` | Check AD app registration |

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    APP["FMWorkOrderHub"] --> LOG["ODC Logs"]
    LOG --> AI["App Insights"]
    AI --> ALERT["PagerDuty / Teams"]
```

---

## 5. Versioning & release notes

| Artifact | Format |
|----------|--------|
| Git tag | `fm-hub-v1.2.0` |
| Lifetime tag | Same as git |
| Release notes | Module diff + REST contract changes |
| Rollback | Redeploy previous Lifetime tag |

---

## 6. Definition of Done (senior sign-off)

- [ ] TrueChange zero errors/warnings (justified exceptions documented)
- [ ] Server actions have unit tests for happy + error paths
- [ ] REST errors mapped per `07-integration-rest.md`
- [ ] RBAC verified per role matrix
- [ ] Publish to TST with deployment notes
- [ ] MONITOR clean for 24h smoke period
