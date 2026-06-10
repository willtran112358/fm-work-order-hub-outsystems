# Day 1 & 2 — Hands-on lab

**Prerequisite (chọn một):**

| Path | IDE | Setup |
|------|-----|--------|
| **A — ODC** | ODC Studio | `resources/odc-studio-quickstart.md` |
| **B — O11** | Service Studio + Personal Environment | `resources/free-hands-on-local.md` |

**Learn song song:** [`resources/odc-web-developer-path.md`](resources/odc-web-developer-path.md) — mỗi milestone lab map 1 module *Becoming a web developer*.

---

## Lab app overview

| App name | Mục đích | Thời gian |
|----------|----------|-----------|
| **BranchQueue** | Entity, screens, actions | Day 1 — 3h |
| **CustomerLookup** | REST integration | Day 2 — 2h |
| **LoanApprove** (optional) | BPT + roles | Day 2 — 1h |

Specs chi tiết: thư mục `samples/`.

---

## Part A — BranchQueue (Day 1)

### A1. Create web app

**ODC:** Portal → Create → Web app → `BranchQueue` → Open in ODC Studio → Publish.  
**O11:** Service Studio → New Application → Reactive Web App → `BranchQueue` → Publish.

**Done when:** Empty home screen loads on browser (ODC `*.outsystems.app` hoặc PE URL).

---

### A2. Data model (theo spec)

Implement fields từ `samples/entity-model-retail-onboarding.spec.md` — **rút gọn** chỉ queue:

| Entity | Fields (minimum) |
|--------|------------------|
| `BranchTicket` | Id, TicketNumber, CustomerName, ServiceTypeId, StatusId, CreatedOn, BranchId |
| `ServiceType` (Static) | Id, Label — e.g. OpenAccount, LoanInquiry |
| `TicketStatus` (Static) | Id, Label — Queued, InProgress, Done |

**DE parallel:** Static Entity = small dimension table; Entity = fact/transaction.

---

### A3. Screens

| Screen | Widgets | Logic |
|--------|---------|-------|
| **TicketList** | Table / List | Aggregate: all tickets, filter BranchId = session; **pagination/sort** (Learn §19) |
| **TicketDetail** | Form | Show fields; button Start / Complete |
| **NewTicket** | Form inputs | Client validation non-empty name |

---

### A4. Server Actions

| Action | Steps (pseudo) |
|--------|----------------|
| `CreateTicket` | Validate → assign TicketNumber (max+1) → Insert → AuditLog |
| `UpdateTicketStatus` | Check allowed transition → Update → AuditLog |

Không cần code file — trong IDE: drag Assign, Entity Actions.

---

### A5. Publish checklist

- [ ] Create 3 tickets — list refreshes  
- [ ] Invalid empty name blocked  
- [ ] Service Center shows app deployed  

Screenshot → folder local (optional) cho portfolio.

---

## Part B — CustomerLookup REST (Day 2 sáng)

### B1. Mock API local

**Option JSON Server:**

```json
{
  "customers": [
    { "cif": "CIF001", "fullName": "Nguyen Van A", "kycStatus": "VERIFIED", "segment": "RETAIL" },
    { "cif": "CIF002", "fullName": "Tran Thi B", "kycStatus": "PENDING", "segment": "PRIORITY" }
  ]
}
```

```bash
json-server --watch db.json --port 3000
```

**Option Mockoon:** Import OpenAPI từ `samples/rest-integration-core-banking.spec.md` §3.

---

### B2. OutSystems structures

Create Structure `CustomerResponse` matching JSON fields.

Create REST API **Consume**:

- Method GET `/customers?cif={cif}`  
- Map response → Structure  
- On 404 → User message "Customer not found"

---

### B3. Screen `CustomerSearch`

- Input CIF  
- Button Search → Server Action calls REST  
- Display result + KYC badge (color by status)

**DE parallel:** Structure = JSON schema in contract; Server Action = thin orchestration like Lambda handler.

---

### B4. Error handling table (implement in Action)

| HTTP | Core body code | UX |
|------|----------------|-----|
| 200 | — | Show data |
| 404 | CIF_NOT_FOUND | Friendly message |
| 503 | — | "Core unavailable, try later" + log |
| Timeout | — | Same as 503 |

---

## Part C — LoanApprove optional (Day 2 chiều)

Follow `samples/loan-approval-action-flow.spec.md` + `samples/bpt-kyc-escalation.spec.md`.

Minimum:

1. Entity `LoanApplication` — Amount, Status, SubmittedBy  
2. Role `BranchOfficer`, `RegionalManager`  
3. BPT: if Amount <= 50M auto approve path; else human task  

Nếu hết thời gian: **vẽ BPT trên giấy** + giải thích — vẫn pass nhiều vòng phỏng vấn.

---

## Troubleshooting (Personal Environment)

| Issue | Fix |
|-------|-----|
| Environment asleep | Login portal → Wake environment |
| Publish fail | Check internet; retry; forum search error code |
| REST localhost not reachable | Use ngrok URL or Mockoon cloud |
| IDE slow | Close unused modules; restart Service Studio |

---

## Lab completion rubric

| Level | Criteria |
|-------|----------|
| **Pass** | BranchQueue live + 1 REST call works |
| **Strong** | + error mapping + role on one screen |
| **Excellent** | + BPT + AuditLog entity |
