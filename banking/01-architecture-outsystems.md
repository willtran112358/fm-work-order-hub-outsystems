# Architecture: OutSystems platform (O11 focus + ODC note)

**Mục tiêu:** Vẽ được 3 diagram trong phỏng vấn — **runtime**, **app layers**, **integration**.

---

## 1. Platform stack (runtime)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '14px'}}}%%
flowchart TB
    classDef client fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef edge fill:#fff9c4,stroke:#f9a825,stroke-width:2px,color:#f57f17
    classDef app fill:#e8f5e9,stroke:#388e3c,stroke-width:2px,color:#1b5e20
    classDef data fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef ext fill:#eceff1,stroke:#607d8b,stroke-width:2px,color:#37474f

    WEB["Browser / Mobile<br/>Reactive or Native"]:::client
    CDN["CDN / LB"]:::edge
    FE["Front-end runtime<br/>generated UI + JS"]:::app
    BE["Application Server<br/>.NET - logic, sessions"]:::app
    DB[("Platform DB<br/>SQL Server / Oracle / Azure SQL")]:::data
    CORE["Core Banking APIs<br/>REST / SOAP"]:::ext
    DWH["Data Warehouse / Kafka<br/>your DE background"]:::ext

    WEB --> CDN --> FE
    FE <--> BE
    BE --> DB
    BE <-->|Integration| CORE
    CORE -.->|batch / CDC| DWH
```

**Nhớ:** Developer **không** viết HTML/CSS thủ công hàng ngày — Service Studio sinh UI; bạn thiết kế **screens, aggregates, logic**.

---

## 2. Application architecture (4-layer)

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
        L2["Validations / Rules"]:::logic
    end

    subgraph domain["Domain"]
        E1["Entities"]:::domain
        E2["Static Entities"]:::domain
    end

    subgraph integration["Integration"]
        I1["REST / SOAP APIs"]:::int
        I2["Structures / Mappings"]:::int
    end

    S1 --> L1 --> E1
    L1 --> I1
    I1 --> CORE2["External Systems"]
```

| Layer | DE banking tương đương | OutSystems artifact |
|-------|----------------------|---------------------|
| Presentation | Dashboard / report UI | Screen, Block, List |
| Business | ETL transform rules | Server Action, Expression |
| Domain | Curated tables / dims | Entity, Aggregate |
| Integration | Source connectors | Extension, API method |

---

## 3. Module & dependency (governance)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TD
    classDef foundation fill:#c8e6c9,stroke:#2e7d32,stroke-width:3px
    classDef feature fill:#bbdefb,stroke:#1976d2,stroke-width:2px
    classDef shared fill:#ffe0b2,stroke:#f57c00,stroke-width:2px

    FND["Foundation Module<br/>theme, auth helpers, logging"]:::foundation
    UIKIT["UI Kit / Patterns"]:::shared
    LOAN["LoanOrigination"]:::feature
    ONB["RetailOnboarding"]:::feature
    INT["IntegrationServices<br/>CoreBanking wrapper"]:::shared

    FND --> UIKIT
    UIKIT --> LOAN
    UIKIT --> ONB
    INT --> LOAN
    INT --> ONB
```

**Interview line:** "Tách **integration** khỏi feature module để đổi contract core mà không redeploy toàn bộ UI."

---

## 4. Data flow: Aggregate vs SQL (DE bridge)

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant SC as Screen
    participant AG as Aggregate
    participant DB as Platform DB
    participant API as REST Core

    U->>SC: Open Loan List
    SC->>AG: Fetch (filter BranchId)
    AG->>DB: Optimized query (platform)
    DB-->>AG: Rows
    AG-->>SC: List
    U->>SC: Approve
    SC->>API: POST /loans/{id}/approve
    API-->>SC: 200 + refNo
    SC->>DB: Update status via Action
```

| Khái niệm | Giải thích ngắn |
|-----------|-----------------|
| **Entity** | Bảng trong app DB (application data) |
| **Aggregate** | Query có filter/sort/join — **không** viết SQL tay trừ Advanced Query |
| **Advanced Query** | SQL thủ công — dùng ít, cần justify performance |
| **Structure** | DTO cho API — giống schema staging |

DE habit: "Tôi chỉ dùng Advanced Query khi aggregate không đủ — và document execution plan."

---

## 5. Security architecture

```mermaid
flowchart LR
    classDef sec fill:#ffcdd2,stroke:#c62828,color:#b71c1c
    classDef ok fill:#c8e6c9,stroke:#388e3c,color:#1b5e20

    USER["End User"]:::ok
    ROLE["Roles<br/>BranchOfficer, Approver"]:::sec
    CHECK["Check Role<br/>in Screen / Action"]:::sec
    ENT["Entity Permissions<br/>Read/Write per role"]:::sec
    API["Integrated API<br/>OAuth / API Key in Service Center"]:::sec

    USER --> ROLE --> CHECK --> ENT
    CHECK --> API
```

---

## 6. Deployment: Lifetime (enterprise mental model)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    classDef dev fill:#b3e5fc,stroke:#0288d1
    classDef tst fill:#fff9c4,stroke:#fbc02d
    classDef prd fill:#ffcdd2,stroke:#e53935

    DEV["DEV<br/>build & debug"]:::dev
    TST["TST / UAT<br/>regression"]:::tst
    PRD["PRD<br/>controlled promote"]:::prd

    DEV -->|Publish| TST
    TST -->|Approve + tag| PRD
```

**Personal Environment:** Chỉ 1 env — vẫn nói được quy trình **DEV→TST→PRD** từ kinh nghiệm project.

---

## 7. O11 vs ODC (30 giây)

| | **O11** (mature) | **ODC** (cloud-native) |
|--|------------------|-------------------------|
| IDE | Service Studio desktop | **ODC Studio** |
| Hosting | Customer cloud / on-prem / PE | OutSystems cloud |
| Learn path | Become a Reactive Web Developer | **Becoming a web developer** (~11h) |
| REST dev mock | `localhost` thường OK (PE) | **ngrok** + Connections |
| Prep pack | Path B nếu chưa có ODC portal | **Path A** — `resources/odc-web-developer-path.md` |
| AI-assisted build | Có (IDE mới) | Path ODC nhấn **review output** — entity, aggregate, logic |

**Bank VN:** Nhiều khách hàng enterprise vẫn O11 + Lifetime; pattern entity / aggregate / RBAC **giống** ODC.

---

## 8. Anti-patterns (senior signal)

| Anti-pattern | Hậu quả | Fix |
|--------------|---------|-----|
| God Screen 2000 dòng logic | Maintain hell | Tách Server Actions, Blocks |
| Duplicate integration | Contract drift | Foundation `IntegrationServices` |
| Mọi thứ Advanced Query | Lock-in DB, slow | Aggregates + indexes |
| Không audit custom | Audit fail | `AuditLog` entity + BPT history |
| Sync long call core | Timeout UX | Async + polling / message |

---

## 9. Whiteboard prompt (luyện 10 phút)

**Đề:** "Branch officer duyệt khoản vay < 50M trên tablet; > 50M escalate regional manager."

Vẽ: Screen → Action validate amount → BPT fork → REST notify core → Audit entity.

Spec chi tiết: `samples/loan-approval-action-flow.spec.md`, `samples/bpt-kyc-escalation.spec.md`.
