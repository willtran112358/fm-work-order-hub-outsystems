# Reference — OutSystems platform patterns (banking programme)

Reusable patterns from a parallel **banking / client-bid** programme. Same ODC primitives apply to the FM Work Order Hub.

---

## 1. Four-layer architecture

```mermaid
%%{init: {'theme': 'forest'}}%%
flowchart LR
    classDef ui fill:#81d4fa,stroke:#0277bd,color:#01579b
    classDef logic fill:#a5d6a7,stroke:#2e7d32,color:#1b5e20
    classDef domain fill:#ffcc80,stroke:#ef6c00,color:#e65100
    classDef int fill:#ce93d8,stroke:#6a1b9a,color:#4a148c

    subgraph presentation["Presentation"]
        S1["Screens / Blocks"]:::ui
        S2["Client Actions"]:::ui
    end
    subgraph business["Business Logic"]
        L1["Server Actions"]:::logic
    end
    subgraph domain["Domain"]
        E1["Entities"]:::domain
    end
    subgraph integration["Integration"]
        I1["REST APIs"]:::int
    end

    S1 --> L1 --> E1
    L1 --> I1
```

| FM equivalent | Banking equivalent |
|---------------|-------------------|
| `FMWorkOrderHub` | `OnlineBankingApp` |
| `IntegrationServices` (24K) | `IntegrationServices` (core banking) |
| `WorkOrder` entity | `LoanApplication` entity |
| `AlertConsole` | `TransactionList` screen |

---

## 2. Module governance

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TD
    FND["Foundation"] --> UIKIT["UI Kit"]
    UIKIT --> FEATURE["Feature modules"]
    INT["IntegrationServices"] --> FEATURE
```

**Rule (both programmes):** Integration module has no UI — contract changes isolated from screens.

---

## 3. FM mapping

| Banking pattern | FM application |
|-----------------|----------------|
| Maker-checker loan approval | Supervisor assign → close WO |
| Idempotent `ClientRequestId` on POST | Idempotent `AcknowledgeAlert24K` on 409 |
| `AuditLog` entity | `WorkOrderEvent` entity |
| Role `Registered` on screens | `FM_Supervisor` / `FieldTech` roles |
| Core banking REST structures | 24K `Alert` / `AlertList` structures |

Full banking specs: [samples/](samples/) in this folder.
