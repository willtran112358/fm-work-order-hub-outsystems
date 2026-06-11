# ODC dev environment & banking app — visual guide

**Mục tiêu:** Nhìn một lần hiểu **laptop + ODC cloud + mock core banking** và **luồng build OnlineBankingApp** (hoặc lab `BranchQueue`).

> Render trên GitHub, VS Code/Cursor, Obsidian. Theme `base` + `classDef` — màu nhẹ, dễ in.

**Liên quan:** [`odc-studio-quickstart.md`](odc-studio-quickstart.md) · [`odc-web-developer-path.md`](odc-web-developer-path.md) · [`free-hands-on-local.md`](free-hands-on-local.md)

---

## 1. ODC dev environment — toàn cảnh

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '12px'}}}%%
flowchart TB
    classDef local fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
    classDef tunnel fill:#fff3e0,stroke:#ef6c00,color:#e65100
    classDef cloud fill:#e3f2fd,stroke:#1565c0,color:#0d47a1
    classDef mock fill:#fce4ec,stroke:#c2185b,color:#880e4f
    classDef core fill:#fff9c4,stroke:#f9a825,color:#f57f17

    subgraph laptop["Your laptop (Windows)"]
        STU["ODC Studio<br/>OnlineBankingApp / BranchQueue"]:::local
        SS["Service Studio (O11 PE)<br/>personal-*.outsystemscloud.com"]:::local
        NODE["node mock-server<br/>:3000 + mock-core-banking-db.json"]:::mock
        NG["ngrok HTTPS tunnel"]:::tunnel
        GIT["outsystems-dev-banking<br/>specs + interview prep"]:::local
    end

    subgraph odc["OutSystems Developer Cloud"]
        PORT["ODC Portal<br/>Create · Deliver · Monitor"]:::cloud
        APP["Published Reactive Web App<br/>*.outsystems.app"]:::cloud
        CONN["INTEGRATE → Connections<br/>REST consumer"]:::cloud
    end

    subgraph bank["Client core (interview narrative)"]
        CB["Core Banking APIs<br/>accounts · transfers · KYC"]:::core
        ERP["ERP / GL<br/>invoice · inventory"]:::core
    end

    STU <-->|"Sign in · Publish"| PORT
    STU -->|"1-Click Publish"| APP
    SS -->|"Publish"| APP
    NODE --> NG
    NG -->|"public Base URL"| CONN
    CONN -->|"GetCustomer · PostTransfer"| APP
    CONN -.->|"production"| CB
    CB -.-> ERP
    GIT --> STU
    GIT --> SS
```

**Ghi nhớ (30s):** *ODC app chạy cloud — REST tới `localhost` không được; dev dùng **ngrok** hoặc Postman Mock. O11 Personal Environment thì `localhost` thường OK.*

---

## 2. OnlineBankingApp — module & screen map (FM banking flows)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '12px'}}}%%
flowchart LR
    classDef ui fill:#bbdefb,stroke:#1565c0,color:#0d47a1
    classDef logic fill:#c8e6c9,stroke:#388e3c,color:#1b5e20
    classDef int fill:#ffe0b2,stroke:#ef6c00,color:#e65100
    classDef sec fill:#ffcdd2,stroke:#c62828,color:#b71c1c

  subgraph app["OnlineBankingApp (Reactive Web)"]
        LAY["Layout · Common header/footer"]:::ui
        MF["MainFlow"]:::ui
        S1["Screen1 — Dashboard"]:::ui
        REG["Banking Registration"]:::ui
        BAL["Check Balance"]:::ui
        TXN["Transaction List"]:::ui
        SEND["Send Money"]:::ui
    end

    subgraph logic["Server layer"]
        ACT["Server Actions<br/>validate · map errors"]:::logic
        AGG["Aggregates<br/>filter by CustomerId"]:::logic
    end

    subgraph intmod["IntegrationServices"]
        REST["REST: Core Banking"]:::int
        MAP["Structures / DTO mapping"]:::int
    end

    subgraph auth["Security"]
        ROLE["Role: Registered"]:::sec
        ANON["Anonymous — login only"]:::sec
    end

    LAY --> MF --> S1
    S1 --> REG & BAL & TXN & SEND
    REG & BAL & TXN & SEND --> ACT
    ACT --> AGG
    ACT --> REST
    REST --> MAP
    ROLE --> S1
    ANON -.->|"login screen"| S1
```

**Interview line:** *Tách **IntegrationServices** khỏi UI — đổi contract core mà không redeploy toàn bộ MainFlow.*

---

## 3. Publish & integration flow (Day 0 → demo)

```mermaid
%%{init: {'theme': 'base'}}%%
sequenceDiagram
    autonumber
    participant Dev as Developer
    participant Studio as ODC Studio / Service Studio
    participant App as OnlineBankingApp
    participant Mock as mock-server + ngrok
    participant Core as Core Banking API

    Dev->>Studio: Entity model · screens · Registered role
    Dev->>Studio: Publish
    Studio->>App: Deploy succeeded
    Dev->>Mock: node mock-server.js (+ ngrok if ODC)
    Dev->>Studio: INTEGRATE → Connection → test GET /customers
    App->>Mock: Server Action GetCustomer
    Mock-->>App: JSON customer + accounts
    Dev->>App: Check Balance → Transaction List
    App->>Core: POST /transfers (idempotent ref)
    Core-->>App: 200 + transactionRef
    Note over Dev,App: AuditLog entity for compliance trail
```

---

## 4. Senior assistant dev — delivery context (interview)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TB
    classDef client fill:#e3f2fd,stroke:#1565c0,color:#0d47a1
    classDef team fill:#e8f5e9,stroke:#388e3c,color:#1b5e20
    classDef you fill:#fff9c4,stroke:#f9a825,color:#f57f17

    BID["Client bid<br/>external banking app"]:::client
    SA["Solution Architect<br/>Savannah GA"]:::client
    YOU["Senior Assistant Dev<br/>architecture quality + mentor juniors"]:::you
    JR["Junior developers"]:::team
    OS["OutSystems delivery<br/>Reactive Web + Mobile + Integration"]:::team
    CORE["Core / ERP / DWH APIs"]:::client

    BID --> SA --> YOU
    YOU --> JR
    YOU --> OS
    OS <-->|REST contracts| CORE
```

---

## 5. ODC Portal sidebar (quick map)

| Sidebar | Banking prep | Ghi chú |
|---------|--------------|---------|
| **CREATE → Apps** | `OnlineBankingApp` / `BranchQueue` | Lab Day 1 |
| **DELIVER → Deployments** | Publish sau mỗi milestone | ≈ O11 Publish |
| **MONITOR → Logs** | Debug REST / action errors | Giống Service Center logs |
| **INTEGRATE → Connections** | Core banking mock | ODC: **ngrok** bắt buộc |
| **FORGE** | OutSystemsUI · Charts | Header, lists, forms |
