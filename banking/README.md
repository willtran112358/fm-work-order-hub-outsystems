# Banking track — OutSystems interview prep (2 days)

**Audience:** Developers with **Data Engineering / banking** background moving into **OutSystems low-code**.  
**Hands-on:** `OnlineBankingApp` or lab `BranchQueue` on **ODC** or **O11 Personal Environment**.

> Shared ODC setup lives in the parent repo: [`../resources/odc-studio-quickstart.md`](../resources/odc-studio-quickstart.md) · [`../resources/odc-web-developer-path.md`](../resources/odc-web-developer-path.md)

---

## Interview context (Jun 2026 — Savannah GA)

| | |
|--|--|
| **Role** | Senior Assistant Developer — **architecture quality** + **mentor juniors** |
| **Delivery** | **Client bid** (external app), not in-house |
| **Stack** | OutSystems **Reactive Web + Mobile**, **integration layer** (REST, ERP, core banking) |
| **Fit** | ~6yr backend, banking consulting, ERP/DB, OutSystems since **~2023** |
| **Current build** | `OnlineBankingApp` on **O11 PE** (`personal-*.outsystemscloud.com`) |

**Pitch:** *"I bring banking integration and data architecture rigor into OutSystems — governed entity models, REST contracts, maker-checker flows — and I help juniors ship with the same quality bar on client delivery."*

Diagrams: [`resources/odc-dev-environment-diagrams.md`](resources/odc-dev-environment-diagrams.md)

---

## ODC dev environment

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '12px'}}}%%
flowchart TB
    classDef local fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
    classDef cloud fill:#e3f2fd,stroke:#1565c0,color:#0d47a1
    classDef mock fill:#fce4ec,stroke:#c2185b,color:#880e4f
    classDef core fill:#fff9c4,stroke:#f9a825,color:#f57f17

    subgraph laptop["Laptop"]
        STU["ODC Studio / Service Studio"]:::local
        MOCK["mock-core-banking-db.json<br/>+ ngrok (ODC)"]:::mock
    end

    subgraph platform["OutSystems"]
        APP["OnlineBankingApp"]:::cloud
        INT["IntegrationServices"]:::cloud
    end

    CORE["Core Banking · ERP APIs"]:::core

    STU -->|"Publish"| APP
    MOCK -->|"HTTPS"| INT
    INT <--> APP
    INT -.-> CORE
```

---

## OnlineBankingApp — screen map

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '12px'}}}%%
flowchart LR
    classDef ui fill:#bbdefb,stroke:#1565c0,color:#0d47a1
    classDef logic fill:#c8e6c9,stroke:#388e3c,color:#1b5e20
    classDef int fill:#ffe0b2,stroke:#ef6c00,color:#e65100

    subgraph screens["MainFlow"]
        DASH["Dashboard"]:::ui
        REG["Registration"]:::ui
        BAL["Check Balance"]:::ui
        TXN["Transactions"]:::ui
        SEND["Send Money"]:::ui
    end

    subgraph backend["Server layer"]
        ACT["Server Actions"]:::logic
        ENT["Entities + Aggregates"]:::logic
    end

    subgraph ext["Integration"]
        API["REST Core Banking"]:::int
    end

    DASH --> REG & BAL & TXN & SEND
    REG & BAL & TXN & SEND --> ACT --> ENT
    ACT --> API
```

---

## Track contents

| File | Purpose |
|------|---------|
| [`00-business-banking-lowcode.md`](00-business-banking-lowcode.md) | Why banks use low-code, domain, KPI, compliance |
| [`01-architecture-outsystems.md`](01-architecture-outsystems.md) | O11/ODC architecture, layers, integration |
| [`OUTSYSTEMS-DEV-Sach-2-Ngay.md`](OUTSYSTEMS-DEV-Sach-2-Ngay.md) | 2-day hour-by-hour schedule |
| [`02-bridge-de-to-outsystems.md`](02-bridge-de-to-outsystems.md) | DE banking → OutSystems skill map |
| [`03-day1-hands-on-lab.md`](03-day1-hands-on-lab.md) | Day 1 lab (`BranchQueue`) |
| [`04-day2-interview-prep.md`](04-day2-interview-prep.md) | Day 2 + mock interview |
| [`05-practice-questions.md`](05-practice-questions.md) | Technical + banking scenarios |
| [`samples/`](samples/) | Entity, REST, BPT specs (no `.oml`) |

**90-min cram:** `00` → `01` + diagrams → `02` → `samples/rest-integration-core-banking.spec.md` → `04`.
