# As-Is architecture — Surbana Jurong digital & applications

**Scope:** Điển hình hệ thống SJ **trước** khi chuẩn hóa OutSystems experience layer — dựa trên public product descriptions (24K, OMNI, Smart City in a Box).

---

## 1. Landscape overview

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '13px'}}}%%
flowchart TB
    classDef core fill:#e1bee7,stroke:#7b1fa2,color:#4a148c
    classDef legacy fill:#ffecb3,stroke:#ff8f00,color:#e65100
    classDef custom fill:#ffcdd2,stroke:#c62828,color:#b71c1c
    classDef user fill:#e3f2fd,stroke:#1565c0,color:#0d47a1

    U1["Building operator<br/>FM supervisor"]:::user
    U2["Field technician"]:::user
    U3["Client / campus admin"]:::user
    U4["SJ project team<br/>PMC, engineers"]:::user

    L1["Legacy FM web<br/>per contract"]:::legacy
    L2["Excel / SharePoint<br/>work tracking"]:::legacy
    C1["Custom mobile<br/>.NET / Xamarin one-off"]:::custom
    C2["Custom client portal<br/>per project"]:::custom

    K24["24K Platform<br/>CDE, IoT fusion, Azure"]:::core
    OMNI["OMNI<br/>BIM + Smart FM analytics"]:::core
    BIM["Autodesk BIM 360<br/>design & construction"]:::core
    IOT["BMS / sensors / CCTV<br/>MQTT, OPC, vendor APIs"]:::core

    U1 --> L1
    U1 --> OMNI
    U2 --> C1
    U2 --> L2
    U3 --> C2
    U4 --> BIM

    IOT --> K24
    BIM --> OMNI
    K24 --> OMNI
    L1 -.->|manual export| K24
    C1 -.->|ad-hoc REST| K24
```

**Đặc điểm As-Is:**

- **Data plane mạnh** (24K, OMNI) — IoT, BIM, analytics  
- **Experience plane yếu / phân mảnh** — nhiều app custom hoặc thủ công  
- **Integration point-to-point** — mỗi project tự nối 24K  

---

## 2. 24K platform (core — không thay thế)

| Capability | Mô tả |
|------------|--------|
| **Data fusion** | BMS, security, IoT sensors → common platform |
| **Scale** | Single building → entire city |
| **Hosting** | Azure Marketplace SaaS |
| **Analytics** | Real-time dashboards, AI (marketing) |
| **Consumers** | IHL campuses, estates, smart city pilots |

**OutSystems không thay 24K** — làm **human workflow & client UX** trên data 24K expose.

---

## 3. OMNI (FM & asset management)

| Layer | Function |
|-------|----------|
| **Static** | BIM model, asset registry |
| **Dynamic** | IoT sensor streams |
| **Analytics** | Preventive/corrective maintenance optimization |
| **Output** | Dashboards for building operators |

**Gap:** Work **execution** (assign tech, capture photo, sign-off) often outside OMNI UI → spreadsheets or custom apps.

---

## 4. Typical application silos (pain)

```mermaid
%%{init: {'theme': 'forest'}}%%
flowchart LR
    subgraph silo1["Project A — Airport FM"]
        A1["Custom portal"]
        A2["Separate mobile APK"]
    end
    subgraph silo2["Project B — Campus"]
        B1["SharePoint lists"]
        B2["Power BI only"]
    end
    subgraph silo3["Internal SJ"]
        I1["HR / timesheet<br/>mixed ERP"]
        I2["IT ticketing<br/>ServiceNow"]
    end

    silo1 --> K24A["24K tenant A"]
    silo2 --> K24B["24K tenant B"]
```

| Silo type | Tech stack | Problem |
|-----------|------------|---------|
| Client portal | ASP.NET, React one-off | 6–12 month build; hard to maintain |
| Field mobile | Native / hybrid per project | App store friction; no reuse |
| Internal ops | ERP modules, spreadsheets | Not integrated with project IoT data |
| Reporting | Power BI on 24K | Read-only — no closed-loop workflow |

---

## 5. Integration patterns (As-Is)

| Pattern | Usage | Risk |
|---------|-------|------|
| **REST ad-hoc** | Custom app → 24K API | No version contract; breaks on upgrade |
| **Batch CSV** | Export alerts → email → manual ticket | Latency hours; no audit |
| **Direct DB** (anti-pattern) | Some legacy read replica | Security; coupling |
| **Azure IoT Hub** | Device → 24K | Good at ingestion; UX still separate |
| **SSO** | Mixed AD / local accounts | Role drift across apps |

---

## 6. SDLC & governance (As-Is)

| Area | Typical state |
|------|---------------|
| **Source control** | Git for custom code; OutSystems **limited** or per-dev |
| **Environments** | DEV/TST/PRD inconsistent naming |
| **Documentation** | Word/Confluence per project; outdated API maps |
| **Code review** | Strong in .NET teams; ** ad hoc** in low-code |
| **Testing** | Manual UAT heavy; few automated API tests |
| **Deployment** | Manual publish; no Lifetime pipeline on smaller engagements |

---

## 7. Security & compliance (As-Is concerns)

| Concern | As-Is manifestation |
|---------|---------------------|
| **Multi-tenant** | Campus clients must not see each other's assets |
| **PII** | Technician location, visitor logs |
| **OT security** | IoT credentials in config files (found in audits) |
| **Availability** | FM apps must work when 24K analytics up — graceful degradation |

---

## 8. What Senior Dev inherits (talking points)

1. **Respect 24K/OMNI** — không đề xuất "rewrite platform"  
2. **Map silos** — inventory apps per sector (aviation vs campus)  
3. **Integration debt** — catalog REST endpoints; propose Integration Services module  
4. **Team maturity** — lift code review, Architecture Canvas, Lifetime where licensed  
5. **Quick win** — FM work order portal on OutSystems (see `samples/work-order-fm-portal.spec.md`)

---

## 9. Reference diagram — data flow (IoT alert, As-Is)

```mermaid
flowchart LR
    S["Temperature sensor"] --> H["IoT Hub"]
    H --> K["24K ingest"]
    K --> D["Dashboard<br/>operator sees alert"]
    D --> E["Email / phone call"]
    E --> X["Manual ticket<br/>Excel or legacy FM"]
```

**Latency:** Minutes to hours. **Audit:** Partial. **Senior Dev mission:** close the loop in software.
