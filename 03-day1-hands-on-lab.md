# Day 1 & 2 — Hands-on lab (ODC hoặc O11)

**Bạn đang dùng ODC portal?** → Đọc [`resources/odc-studio-quickstart.md`](resources/odc-studio-quickstart.md) trước, rồi làm lab bên dưới (nhánh **ODC**).

**O11 Personal Environment:** Service Studio + PE — [`resources/free-hands-on.md`](resources/free-hands-on.md)

| | ODC (bạn) | O11 (classic) |
|--|-----------|---------------|
| IDE | **ODC Studio** (Download từ portal) | Service Studio |
| Tạo app | Portal **Create → App → Web** | Studio New Reactive App |
| Publish | Studio Publish + **Deliver → Deployments** | Publish to PE |
| REST mock URL | **ngrok** (app chạy cloud) | `http://localhost:3000` OK |
| Integration | **INTEGRATE → Connections** | REST API consumed in module |

---

## Lab overview

| App / module | Mục đích | Thời gian |
|--------------|----------|-----------|
| **FMWorkOrderHub** | Entity, screens, server actions, roles | Day 1 — 3h |
| **IntegrationServices** | REST consume mock 24K | Day 2 — 2h |
| **AlertConsole** | Alert → work order flow | Day 2 — 1h |
| **AlertEscalationProcess** (optional) | BPT timer | Day 2 — 30–60 min |

Specs: [`samples/`](samples/)

---

## Part A — FMWorkOrderHub (Day 1)

### A1. Create web app

**ODC (portal bạn đã mở):**

1. **Create** → **App** → **Web app**  
2. Name: `FMWorkOrderHub`  
3. **Download ODC Studio** (nếu chưa) → Sign in → Open app  
4. **Publish** → mở URL app (`*.outsystems.app`)

**O11:**

1. Service Studio → New Application → **Reactive Web App**  
2. Name: `FMWorkOrderHub` → Publish → PE URL  

**Done when:** Home screen loads in browser.

---

### A2. Foundation module (optional — senior pattern)

**ODC:** New **Service** / shared module `FM_Domain` (Studio: Add module → Service) — entities ở đây, UI app references.

**O11:** New Module → Service → `FM_Domain`.

Nếu thiếu thời gian: entities trực tiếp trong `FMWorkOrderHub`.

---

### A3. Data model (rút gọn)

Theo [`samples/entity-model-facility-asset.spec.md`](samples/entity-model-facility-asset.spec.md):

| Entity | Fields (minimum) |
|--------|------------------|
| `Site` | Id, Code, Name |
| `Building` | Id, SiteId, Name |
| `Asset` | Id, BuildingId, AssetTag, External24KId |
| `WorkOrder` | Id, AssetId, Title, Description, StatusId, PriorityId, AssignedTo, SourceAlertId, CreatedOn, DueOn |
| `WorkOrderEvent` | Id, WorkOrderId, EventType, EventOn, EventBy, Notes |
| `WOStatus` (Static) | Open, In Progress, Completed, Cancelled |
| `WOPriority` (Static) | Critical, High, Medium, Low |

**Seed:** 1 site `SIN-CAMPUS-01`, 1 building, 2 assets, 2 work orders.

---

### A4. Screens

| Screen | Widgets | Logic |
|--------|---------|-------|
| **WorkOrderList** | Table / List | Aggregate paginated; filter Status = Open |
| **WorkOrderDetail** | Form read-only + buttons | Change status, view events |
| **CreateWorkOrder** | Dropdown Asset, inputs | Submit → `CreateWorkOrder` |

Chi tiết UX: [`samples/work-order-fm-portal.spec.md`](samples/work-order-fm-portal.spec.md)

---

### A5. Server actions

| Action | Steps |
|--------|-------|
| `CreateWorkOrder` | Validate asset → Insert WO (Status=Open) → Insert Event CREATED |
| `AssignWorkOrder` | Update AssignedTo → Event ASSIGNED |
| `ChangeWorkOrderStatus` | Validate transition → Update → Event STATUS_CHANGE |

**Senior add-on:** `GetSiteIdForUser()` — filter aggregate (hardcode SiteId 1 nếu chưa có SiteUser mapping).

---

### A6. Roles (basic)

| Role | Screens |
|------|---------|
| `FM_Supervisor` | All + Create |
| `FieldTech` | List (assigned only) + Detail update |

**ODC:** Portal / Studio → **Users & roles** (App security) → assign roles.  
**O11:** Service Center → Users → assign roles.

---

### A7. Day 1 checklist

- [ ] 3+ work orders visible on list  
- [ ] Create new WO from form  
- [ ] Status change writes WorkOrderEvent  
- [ ] App published — URL mở được (ODC hoặc PE)  
- [ ] ODC: **Deliver → Deployments** shows success  

---

## Part B — IntegrationServices + AlertConsole (Day 2)

### B1. Mock 24K API

```bash
cd interview/surbana-jurong-outsystems-senior/resources
node mock-server.js
```

Verify local: `GET http://localhost:3000/sites/SIN-CAMPUS-01/alerts?status=OPEN`

| Runtime | Base URL cho REST Connection |
|---------|------------------------------|
| **ODC (cloud)** | **Bắt buộc ngrok:** `ngrok http 3000` → `https://xxxx.ngrok-free.app` |
| **O11 PE local** | `http://localhost:3000` |

ODC: Portal → **INTEGRATE → Connections** → Add REST → paste ngrok URL → Test connection.

---

### B2. REST API (consumed)

**ODC path:**

1. **INTEGRATE → Connections** → New REST connection → Base URL = ngrok HTTPS  
2. Import / define methods (hoặc trong Studio: **Integrations** → Consume REST)  
3. Map to structures below  

**O11 path:** New REST API consumed in `IntegrationServices` module.

| Method | URL template |
|--------|--------------|
| GET | `{BaseURL}/sites/{SiteCode}/alerts?status={Status}` |
| POST | `{BaseURL}/alerts/{AlertId}/acknowledge` |

**Structures:** `Alert`, `AlertList`, `AckRequest`, `AckResponse` — [`samples/rest-integration-24k-iot.spec.md`](samples/rest-integration-24k-iot.spec.md) §3.

**BaseURL:** ngrok (ODC) hoặc `http://localhost:3000` (O11 only).

---

### B3. Server actions

| Action | Logic |
|--------|-------|
| `GetOpenAlerts` | REST GET → deserialize AlertList; on error return empty + log |
| `AcknowledgeAlert24K` | POST body; handle 409 as success (idempotent) |
| `CreateWorkOrderFromAlert` | Check duplicate SourceAlertId → CreateWorkOrder → Ack (optional) |

**Idempotency (senior must-have):**

```text
Aggregate: count WorkOrder where SourceAlertId = AlertId AND Status not Closed
If count > 0 → return existing Id
```

---

### B4. Screen AlertConsole

| Element | Behavior |
|---------|----------|
| List alerts | OnReady → GetOpenAlerts('SIN-CAMPUS-01', 'OPEN') |
| Button "Create WO" | CreateWorkOrderFromAlert → navigate to WorkOrderDetail |
| Severity badge | Critical = red styling |

---

### B5. Error handling demo

Stop mock server → refresh screen → user sees friendly message, app không crash.

Nói trong phỏng vấn: "Work order still creatable manually if 24K down."

---

### B6. Day 2 checklist

- [ ] Alerts load from mock  
- [ ] Create WO from alert ALT-2024-8891  
- [ ] Second click same alert → no duplicate WO  
- [ ] Acknowledge returns 200 (check mock server log / second GET status)  

---

## Part C — BPT optional (Day 2 buffer)

Chỉ khi còn 30–60 phút. Spec: [`samples/iot-alert-escalation-bpt.spec.md`](samples/iot-alert-escalation-bpt.spec.md)

1. Business Process → `AlertEscalationProcess`  
2. Trigger from `CreateWorkOrderFromAlert` when Priority = Critical  
3. Human activity "Acknowledge" + Wait 30 minutes  
4. Send email / notification action (placeholder)  

**Interview:** Mô tả diagram là đủ nếu chưa kịp build.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| ODC REST fails | Dùng ngrok, không localhost; Connections → Test |
| PE asleep (O11) | Login portal → wake environment |
| REST connection refused | mock-server running? Firewall? |
| Publish error entity | Check FK relationships Site→Building→Asset |
| Empty alert list | SiteCode must be `SIN-CAMPUS-01` |
| Duplicate REST structure | One structure per DTO; reuse in actions |

---

## Screenshot checklist (portfolio / interview)

1. WorkOrderList with open tickets  
2. AlertConsole with CRITICAL badge  
3. **ODC:** Deliver → Deployments **or** **O11:** Service Center — last publish  
4. Architecture Canvas (module dependencies) — optional senior bonus  
