# Integration layer — REST API

**Module:** `IntegrationServices` (foundation, no UI)  
**Spec:** [`samples/rest-integration-24k-iot.spec.md`](../samples/rest-integration-24k-iot.spec.md)

---

## 1. Integration landscape

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '12px'}}}%%
flowchart LR
    classDef os fill:#c8e6c9,stroke:#388e3c,color:#1b5e20
    classDef gw fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef core fill:#e1bee7,stroke:#7b1fa2,color:#4a148c

    APP["FMWorkOrderHub<br/>Server Actions"]:::os
    INT["IntegrationServices<br/>REST wrappers"]:::os
    CONN["ODC Connection<br/>OAuth2 + base URL"]:::os
    APIM["Azure APIM<br/>rate limit · keys"]:::gw
    K24["24K Alerts API"]:::core
    OMNI["OMNI Analytics API"]:::core

    APP --> INT --> CONN --> APIM
    APIM --> K24
    APIM --> OMNI
```

---

## 2. REST consumer setup (ODC — no-code)

| Step | Portal path | Value |
|------|-------------|-------|
| 1 | INTEGRATE → Connections | New REST connection `SJ_24K_DEV` |
| 2 | Base URL | `https://xxxx.ngrok-free.app` (DEV) |
| 3 | Auth | None (mock) / OAuth2 (TST/PRD) |
| 4 | Studio | Add REST API → import swagger or manual methods |
| 5 | Module | `IntegrationServices` — expose server actions only |

```mermaid
sequenceDiagram
    autonumber
    participant SA as GetOpenAlerts24K
    participant REST as REST API entity
    participant APIM as Azure APIM
    participant K24 as 24K Platform

    SA->>REST: GET /sites/{siteCode}/alerts
    REST->>APIM: HTTPS + subscription key
    APIM->>K24: Forward
    K24-->>APIM: AlertList JSON
    APIM-->>REST: 200
    REST-->>SA: Structure AlertList
```

---

## 3. Structures (DTO mapping)

```mermaid
%%{init: {'theme': 'base'}}%%
classDiagram
    class AlertList {
        +Alert[] alerts
        +Integer totalCount
    }
    class Alert {
        +Text alertId
        +Text siteCode
        +Text assetExternalId
        +Text severity
        +Text message
        +DateTime raisedAt
        +Text status
    }
    class AckRequest {
        +Text acknowledgedBy
        +Text workOrderRef
    }
    AlertList "1" --> "*" Alert
```

| Structure | Direction | Purpose |
|-----------|-----------|---------|
| `AlertList` | Response | List endpoint wrapper |
| `Alert` | Response | Single alert row |
| `AckRequest` | Request | POST acknowledge body |
| `Asset24K` | Response | Asset lookup enrichment |

---

## 4. Delivered REST methods

| Method | HTTP | Server action wrapper |
|--------|------|----------------------|
| `GetSiteAlerts` | GET `/sites/{siteCode}/alerts` | `GetOpenAlerts24K` |
| `AcknowledgeAlert` | POST `/alerts/{id}/acknowledge` | `AcknowledgeAlert24K` |
| `GetAsset` | GET `/assets/{externalId}` | `GetAssetFrom24K` |

### GetOpenAlerts24K (pseudo-logic)

```text
Server Action: GetOpenAlerts24K
  Input: SiteCode, SeverityFilter (optional)
  Output: AlertList

  Response = REST_SJ24K.GetSiteAlerts(
    SiteCode,
    Query: status=OPEN, severity=SeverityFilter
  )

  If Response.StatusCode = 200 Then
    Output = Response.Body
  Else
    Output.alerts = Empty list
    LogIntegrationError(Response)
    Raise Error: Map24KError(Response)
  End If
```

---

## 5. Error mapping

| HTTP | 24K code | User message | Retry |
|------|----------|--------------|-------|
| 400 | INVALID_SITE | "Site not found in 24K" | No |
| 401 | — | "Integration auth failed — contact admin" | No |
| 404 | ALERT_GONE | "Alert already cleared" | No |
| 409 | ALREADY_ACK | Silent success (idempotent) | — |
| 429 | RATE_LIMIT | "Too many requests — wait 30s" | Yes |
| 500+ | — | "24K unavailable — ref {correlationId}" | Yes |

---

## 6. DEV mock API

```bash
cd resources
node mock-server.js
# ODC: ngrok http 3000 → use HTTPS URL in Connection
```

| Endpoint | Mock file |
|----------|-----------|
| `GET /sites/SIN-CAMPUS-01/alerts` | `mock-24k-alerts.json` |
| `POST /alerts/{id}/acknowledge` | In-memory state |

---

## 7. OMNI read integration (P1)

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    WO["WorkOrderDetail"] --> SA["GetAssetHealthScore"]
    SA --> OMNI["GET /assets/{id}/health"]
    OMNI --> UI["Badge: health score"]
```

Read-only — OMNI remains analytics system of record.
