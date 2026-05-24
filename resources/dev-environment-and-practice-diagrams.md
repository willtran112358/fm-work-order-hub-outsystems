# Dev environment & senior practice — visual guide

**Mục tiêu:** Nhìn một lần hiểu **máy bạn + ODC cloud + mock 24K** và **lộ trình practice** để phỏng vấn Senior OutSystems (SJ / built-environment context).

> Render tốt trên **GitHub**, **VS Code/Cursor** (Markdown preview), **Obsidian**. Dùng theme `base` + `classDef` để màu nhẹ, dễ in.

**Liên quan:** [`odc-studio-quickstart.md`](odc-studio-quickstart.md) · [`free-hands-on.md`](free-hands-on.md) · [`OUTSYSTEMS-SENIOR-Prep-7-Ngay.md`](../OUTSYSTEMS-SENIOR-Prep-7-Ngay.md)

---

## 1. Dev environment — toàn cảnh (ODC prep)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '12px'}}}%%
flowchart TB
    classDef local fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
    classDef tunnel fill:#fff3e0,stroke:#ef6c00,color:#e65100
    classDef cloud fill:#e3f2fd,stroke:#1565c0,color:#0d47a1
    classDef mock fill:#fce4ec,stroke:#c2185b,color:#880e4f
    classDef sj fill:#f3e5f5,stroke:#7b1fa2,color:#4a148c

    subgraph laptop["Your laptop (Windows)"]
        STU["ODC Studio<br/>FMWorkOrderHub"]:::local
        NODE["node mock-server.js<br/>:3000"]:::mock
        NG["ngrok<br/>HTTPS tunnel"]:::tunnel
        GIT["senior-outsystems-prep-book<br/>specs + interview"]:::local
    end

    subgraph odc["OutSystems Developer Cloud"]
        PORT["ODC Portal<br/>Create · Deliver · Monitor"]:::cloud
        APP["Published app<br/>*.outsystems.app"]:::cloud
        CONN["INTEGRATE → Connections<br/>REST consumer"]:::cloud
    end

    subgraph future["Interview narrative (SJ enterprise)"]
        APIM["Azure APIM"]:::sj
        K24["24K / OMNI APIs"]:::sj
    end

    STU <-->|"Sign in · Publish"| PORT
    STU -->|"1-Click Publish"| APP
    NODE -->|"localhost only"| NG
    NG -->|"public Base URL"| CONN
    CONN -->|"GetOpenAlerts"| APP
    CONN -.->|"production path"| APIM
    APIM -.-> K24
    GIT --> STU
```

**Ghi nhớ senior (30s):** *"ODC app chạy cloud — REST tới `localhost` không được; dev dùng ngrok hoặc Postman Mock; pattern giống enterprise qua APIM."*

---

## 2. Luồng publish & debug (Day 0 → demo)

```mermaid
%%{init: {'theme': 'base'}}%%
sequenceDiagram
    autonumber
    participant Dev as You
    participant Studio as ODC Studio
    participant Portal as ODC Portal
    participant App as FMWorkOrderHub
    participant Mock as mock-server + ngrok

    Dev->>Studio: Create Web app · entities · screens
    Dev->>Studio: Publish
    Studio->>Portal: DELIVER → Deployments
    Portal->>App: Deploy succeeded
    Dev->>Mock: node mock-server.js + ngrok http 3000
    Dev->>Portal: INTEGRATE → Connections → test GET alerts
    App->>Mock: Server action GetOpenAlerts
    Mock-->>App: JSON alerts
    Dev->>App: AlertConsole → Create Work Order
    Note over Dev,App: MONITOR → Logs nếu REST fail
```

---

## 3. ODC Portal map (sidebar bạn thấy)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    classDef create fill:#c8e6c9,stroke:#388e3c,color:#1b5e20
    classDef deliver fill:#bbdefb,stroke:#1976d2,color:#0d47a1
    classDef monitor fill:#ffe0b2,stroke:#f57c00,color:#e65100
    classDef integrate fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef analyze fill:#e1bee7,stroke:#7b1fa2,color:#4a148c

    subgraph CREATE["CREATE"]
        A1["Apps<br/>FMWorkOrderHub"]:::create
        A2["Workflows<br/>BPT Day 5"]:::create
    end

    subgraph DELIVER["DELIVER"]
        D1["Deployments<br/>Publish status"]:::deliver
        D2["Overview"]:::deliver
    end

    subgraph MONITOR["MONITOR"]
        M1["Logs / Traces<br/>REST debug"]:::monitor
    end

    subgraph INTEGRATE["INTEGRATE"]
        I1["Connections<br/>mock 24K REST"]:::integrate
        I2["External logic"]:::integrate
    end

    subgraph ANALYZE["ANALYZE"]
        Q1["Code quality<br/>Senior review story"]:::analyze
    end

    A1 --> D1
    D1 --> M1
    I1 --> A1
    Q1 --> A1
```

---

## 4. ODC vs O11 — chọn môi trường practice

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TD
    classDef odc fill:#e3f2fd,stroke:#1565c0,color:#0d47a1
    classDef o11 fill:#f3e5f5,stroke:#7b1fa2,color:#4a148c
    classDef ok fill:#c8e6c9,stroke:#388e3c,color:#1b5e20

    START(["Bắt đầu prep"]) --> Q1{"Đã login<br/>ODC portal?"}
    Q1 -->|Yes| ODC["Path A: ODC + ODC Studio"]:::odc
    Q1 -->|No| O11["Path B: O11 Personal Environment<br/>+ Service Studio"]:::o11

    ODC --> NG["mock-server + ngrok<br/>→ Connections"]:::ok
    O11 --> LOC["mock-server localhost:3000<br/>→ REST extension"]:::ok

    NG --> LAB["Cùng lab: FMWorkOrderHub<br/>entities · REST · RBAC"]:::ok
    LOC --> LAB

    LAB --> PITCH["Phỏng vấn: patterns giống nhau<br/>khác delivery surface"]:::ok
```

| | **ODC (repo ưu tiên)** | **O11 PE (backup)** |
|--|------------------------|---------------------|
| IDE | ODC Studio | Service Studio |
| Admin | Portal | Service Center |
| REST dev | **ngrok / cloud mock** | `localhost:3000` |
| SJ story | App mới, cloud-native | Nhiều partner legacy |

---

## 5. Senior practice plan — 7 ngày (extended)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '11px'}}}%%
flowchart LR
    classDef d1 fill:#ffcdd2,stroke:#c62828,color:#b71c1c
    classDef d2 fill:#ffe0b2,stroke:#ef6c00,color:#e65100
    classDef d3 fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef d4 fill:#dcedc8,stroke:#689f38,color:#33691e
    classDef d5 fill:#c8e6c9,stroke:#388e3c,color:#1b5e20
    classDef d6 fill:#b2dfdb,stroke:#00796b,color:#004d40
    classDef d7 fill:#bbdefb,stroke:#1976d2,color:#0d47a1

    D1["Day 1<br/>Business + JD<br/>Pitch EN 90s"]:::d1
    D2["Day 2<br/>As-Is / To-Be<br/>Whiteboard 5 min"]:::d2
    D3["Day 3<br/>FM entities + portal<br/>FMWorkOrderLab"]:::d3
    D4["Day 4<br/>REST 24K mock<br/>Alert → WO"]:::d4
    D5["Day 5<br/>BPT escalation<br/>Timer + audit"]:::d5
    D6["Day 6<br/>Perf · Security<br/>Lifetime cheat sheet"]:::d6
    D7["Day 7<br/>Mock interview<br/>STAR + code review"]:::d7

    D1 --> D2 --> D3 --> D4 --> D5 --> D6 --> D7
```

### 5b. Gộp 7 ngày → 2 ngày (gấp)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TB
    classDef day1 fill:#e3f2fd,stroke:#1565c0,color:#0d47a1
    classDef day2 fill:#f3e5f5,stroke:#7b1fa2,color:#4a148c

    subgraph DAY1["Day 1 (~8h)"]
        AM1["Sáng: Business + Architecture<br/>docs/01 · 02 · 03 · 04"]:::day1
        PM1["Chiều: Lab FM Work Order<br/>03-day1-hands-on-lab"]:::day1
        EV1["Tối: Đọc REST spec"]:::day1
    end

    subgraph DAY2["Day 2 (~8h)"]
        AM2["Sáng: REST + AlertConsole<br/>ngrok + Connections"]:::day2
        MD2["Trưa: BPT spec (build optional)"]:::day2
        PM2["Chiều: Senior topics + mock<br/>04-day2-interview-prep"]:::day2
    end

    DAY1 --> DAY2
```

Chi tiết giờ: [`OUTSYSTEMS-SENIOR-Sach-2-Ngay.md`](../OUTSYSTEMS-SENIOR-Sach-2-Ngay.md) · [`OUTSYSTEMS-SENIOR-Prep-7-Ngay.md`](../OUTSYSTEMS-SENIOR-Prep-7-Ngay.md)

---

## 6. Senior skill pillars — practice có chủ đích

```mermaid
%%{init: {'theme': 'base'}}%%
mindmap
  root((Senior OSE<br/>Interview))
    Architecture
      As-Is silos
      To-Be experience layer
      APIM gateway
    Build
      Entities SiteId
      Server actions
      Reactive UI
    Integration
      REST structures
      Error handling
      Idempotent ack
    Process
      BPT human task
      Escalation timer
      Audit trail
    Governance
      RBAC roles
      Code review
      Lifetime envs
    Delivery
      ODC Deployments
      Monitor Logs
      Performance aggregates
```

---

## 7. Hands-on stack — bạn build gì trong OutSystems

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TB
    classDef app fill:#c8e6c9,stroke:#388e3c,color:#1b5e20
    classDef data fill:#e1bee7,stroke:#7b1fa2,color:#4a148c
    classDef int fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef proc fill:#ffccbc,stroke:#e64a19,color:#bf360c

    APP["App: FMWorkOrderHub"]:::app

    subgraph layer1["Day 1 — Domain"]
        E1["Facility · Asset · WorkOrder"]:::data
        E2["Static: Status · Priority"]:::data
        S1["WorkOrderList · Create · Assign"]:::app
    end

    subgraph layer2["Day 2 — Integration"]
        R1["REST: GetOpenAlerts"]:::int
        S2["AlertConsole screen"]:::app
        A1["CreateWorkOrderFromAlert"]:::int
    end

    subgraph layer3["Stretch — Process"]
        B1["BPT: Acknowledge → Escalate"]:::proc
        L1["AuditLog entity"]:::data
    end

    APP --> layer1
    layer1 --> layer2
    layer2 --> layer3
```

Specs: [`samples/`](../samples/) · Lab steps: [`03-day1-hands-on-lab.md`](../03-day1-hands-on-lab.md)

---

## 8. REST lab — alert → work order (end-to-end)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    classDef ext fill:#fce4ec,stroke:#c2185b,color:#880e4f
    classDef logic fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef ui fill:#c8e6c9,stroke:#388e3c,color:#1b5e20

    MOCK["mock-server<br/>GET /sites/.../alerts"]:::ext
    SA["Server Action<br/>GetOpenAlerts"]:::logic
    SCR["Screen AlertConsole<br/>List + Refresh"]:::ui
    CWO["CreateWorkOrderFromAlert<br/>map severity → priority"]:::logic
    WO["WorkOrder entity<br/>SiteId filter"]:::ui

    MOCK --> SA --> SCR
    SCR --> CWO --> WO
```

---

## 9. Checklist trước phỏng vấn (visual)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TD
    classDef done fill:#c8e6c9,stroke:#388e3c,color:#1b5e20
    classDef todo fill:#eeeeee,stroke:#757575,color:#424242

    C1["Pitch EN 90s thuộc"]:::todo
    C2["Vẽ To-Be trong 3 phút"]:::todo
    C3["Demo FMWorkOrderHub published"]:::todo
    C4["1 perf optimization cụ thể"]:::todo
    C5["SiteId multi-tenant security"]:::todo
    C6["2 STAR stories integration"]:::todo
    C7["Câu hỏi cho interviewer<br/>24K roadmap · squad"]:::todo

    C1 --> C2 --> C3 --> C4 --> C5 --> C6 --> C7

    style C1 fill:#fff9c4
    style C3 fill:#e3f2fd
    style C7 fill:#e1bee7
```

Đánh dấu `[x]` trong [`OUTSYSTEMS-SENIOR-Prep-7-Ngay.md`](../OUTSYSTEMS-SENIOR-Prep-7-Ngay.md) khi xong từng mục.

---

## 10. Setup nhanh — thứ tự lệnh

| Bước | Lệnh / hành động |
|------|------------------|
| 1 | Portal → **Download ODC Studio** → Sign in |
| 2 | **Create → App → Web** → `FMWorkOrderHub` → Publish |
| 3 | `cd resources && node mock-server.js` |
| 4 | Terminal 2: `ngrok http 3000` → copy HTTPS URL |
| 5 | **INTEGRATE → Connections** → REST → Base URL = ngrok |
| 6 | Lab theo [`03-day1-hands-on-lab.md`](../03-day1-hands-on-lab.md) |

---

*Educational prep only — not affiliated with OutSystems or Surbana Jurong.*
