# Reactive Web — Events, screen lifecycle, data actions

**App type:** Reactive Web (`FMWorkOrderHub`)

---

## 1. Reactive runtime model

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '12px'}}}%%
flowchart TB
    classDef event fill:#fff9c4,stroke:#f9a825,color:#f57f17
    classDef state fill:#e8f5e9,stroke:#388e3c,color:#1b5e20
    classDef ui fill:#bbdefb,stroke:#1565c0,color:#0d47a1

    EV["Screen / Widget Events"]:::event
    CA["Client Actions"]:::event
    LV["Local Variables"]:::state
    DV["Client Variables<br/>session scope"]:::state
    AGG["Aggregates / Data Sources"]:::state
    UI["Widgets re-render"]:::ui

    EV --> CA --> LV
    CA --> AGG
    LV --> UI
    AGG --> UI
    DV --> UI
```

| Concept | Scope | FM example |
|---------|-------|------------|
| **Input parameter** | Screen | `WorkOrderId` on Detail |
| **Local variable** | Screen / action | `FilterStatus`, `IsLoading` |
| **Client variable** | Session | `SelectedSiteId`, `UserDisplayName` |
| **Aggregate** | Data source | `GetWorkOrders` |

---

## 2. Screen events lifecycle

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant Screen as WorkOrderList
    participant Init as On Initialize
    participant Agg as GetWorkOrders
    participant Ready as On Ready

    User->>Screen: Navigate
    Screen->>Init: Set defaults (FilterStatus = Open)
    Screen->>Agg: Fetch (On Render)
    Agg-->>Screen: Data
    Screen->>Ready: Focus management (optional)
    User->>Screen: Change filter
    Screen->>Screen: OnFilterChange client action
    Screen->>Agg: Refresh Fetch
```

### Delivered event bindings — WorkOrderList

| Event | Handler | Behaviour |
|-------|---------|-----------|
| **On Initialize** | `InitWorkOrderList` | Set `StartIndex=0`, default filters |
| **On Render** | — | `GetWorkOrders` auto-fetch |
| **Filter dropdown OnChange** | `ApplyFilters` | Reset `StartIndex`, refresh aggregate |
| **Table row OnClick** | `OpenDetail` | Navigate `WorkOrderDetail(WorkOrderId)` |
| **New button OnClick** | `GoToCreate` | Navigate `CreateWorkOrder` |

---

## 3. Fetch on demand — AlertConsole

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart LR
    classDef idle fill:#eceff1,stroke:#607d8b,color:#37474f
    classDef active fill:#c8e6c9,stroke:#388e3c,color:#1b5e20

    S1["Screen loads<br/>no alert fetch"]:::idle
    S2["User opens Alerts tab"]:::active
    S3["Data Action FetchAlerts"]:::active
    S4["Server: GetOpenAlerts24K"]:::active
    S5["Table populated"]:::active

    S1 --> S2 --> S3 --> S4 --> S5
```

```text
Client Action: OnAlertsTabSelected
  // Fetch on demand — not on screen initialize
  Refresh GetOpenAlerts

Aggregate: GetOpenAlerts
  Source: Server action result via Data Action
  Fetch: On Demand — property enabled
```

---

## 4. Widget events

```mermaid
%%{init: {'theme': 'base'}}%%
flowchart TB
    BTN["Button OnClick"] --> CA1["SubmitAssign"]
    DD["Dropdown OnChange"] --> CA2["ApplyFilters"]
    FORM["Form OnSubmit"] --> CA3["ValidateAndSave"]
    TIMER["Timer OnTimer"] --> CA4["PollAlertCount"]
```

| Widget | Event | FM usage |
|--------|-------|----------|
| Button | OnClick | Assign, Close, Refresh |
| Dropdown | OnChange | Filter change |
| Input | OnBlur | Inline validation |
| Timer | OnTimer | Poll critical alert count (60s) — use sparingly |
| Popup | OnClose | Reset wizard step |

---

## 5. Client variables (session state)

```text
Client Variable: SelectedSiteId (Site Identifier)
  Set on: Login callback / Home screen initialize
  Read on: All aggregates via GetSiteIdForUser() server helper

Client Variable: LastErrorMessage (Text)
  Set on: Server action error handler
  Clear on: Next successful action or dismiss banner
```

---

## 6. Reactive vs Traditional Web

| Aspect | Reactive (delivered) | Traditional Web |
|--------|---------------------|-----------------|
| Page model | SPA — partial refresh | Full page submit |
| Data fetch | Aggregates + AJAX | Preparation + submit |
| Mobile | Responsive by default | Separate mobile app |
| FM choice | **Reactive** for supervisor portal | Legacy only if mandated |

---

## 7. Performance checklist

- [ ] Aggregates use **Max records** — never unbounded lists
- [ ] Heavy REST calls behind **fetch on demand**
- [ ] Client actions stay < 30 logic nodes
- [ ] `IsDataFetched` gates table render — no flash of empty state
- [ ] Images in field app — lazy load block
