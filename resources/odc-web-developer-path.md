# ODC — Becoming a web developer (official ↔ Senior prep 7 ngày)

**Nguồn:** [learn.outsystems.com](https://learn.outsystems.com) → **Becoming a web developer** (Platform: **ODC**, ~161 lessons / ~11h).

Path dạy nền tảng web trên ODC và **platform fluency cho AI-assisted development** — biết khi nào data model, logic flow, hoặc aggregate cần chỉnh lại thay vì chấp nhận output AI.

**Repo map:** Lab `FMWorkOrderHub` + REST 24K + BPT — xem [`odc-studio-quickstart.md`](odc-studio-quickstart.md), [`03-day1-hands-on-lab.md`](../03-day1-hands-on-lab.md).

> Pack banking DE (BranchQueue): `interview/outsystems-dev-banking/resources/odc-web-developer-path.md` — cùng curriculum, domain khác.

---

## Curriculum → Senior prep

| Module (official) | Senior prep (ngày) |
|-------------------|-------------------|
| ODC overview + Portal + Quiz | Day 0 — `odc-studio-quickstart.md` |
| ODC Studio overview | Day 0 — publish `FMWorkOrderHub` |
| Intro to OutSystems development | Day 2 arch narrative — `docs/03-to-be-architecture.md` |
| Modeling data / Relationships / Integrity | **Day 3** — `entity-model-facility-asset.spec.md` |
| UI 101, Aggregates 101, Screens with Data, Web Forms | **Day 3** — WorkOrderList, forms |
| Logic, Form Validations | **Day 3** — assign / validate server actions |
| Advanced Aggregates | **Day 6** — perf + SiteId filter |
| Role-based security | **Day 3** + **Day 6** — technician vs FM manager |
| Debugging | **Day 4** — MONITOR Logs khi REST/ngrok fail |
| Pagination and Sorting | Day 3 list screens |
| Blocks and Events, Reactive model, Client Variables | Day 3 optional refactor |
| Settings | Day 6 — config vs hardcode (senior) |
| SQL Queries | Day 6 + `samples/reference/sql_asset_maintenance_queries.sql` |

**Ngoài Web Developer path (Learn riêng):**

| Topic | Senior day |
|-------|------------|
| Integrate with external systems | **Day 4** — `rest-integration-24k-iot.spec.md` |
| Security (enterprise) | **Day 6** — SiteId, RBAC |
| BPT / Processes | **Day 5** — `iot-alert-escalation-bpt.spec.md` |

---

## AI-assisted dev — senior review checklist

| AI output | Senior checks |
|-----------|---------------|
| Entity model | Multi-tenant `SiteId`, audit, FK integrity |
| Aggregate | Index-friendly filters; no N+1 on alert list |
| Integration action | Timeout, retry, idempotency on acknowledge POST |
| BPT | Escalation timer + audit trail |

**Interview line:** *"I treat AI as a pair programmer on scaffolding—I still own architecture review, aggregate design, and integration contracts, same as code review on a senior squad."*

---

## 2 ngày gấp — lesson priority

Nếu chỉ có 2 ngày (`OUTSYSTEMS-SENIOR-Sach-2-Ngay.md`):

1. ODC overview quiz + Modeling §7–9  
2. Day 1 chiều lab FM (§10–15)  
3. Day 2 sáng REST (Integration path) + §17–18  
4. Day 2 chiều đọc BPT spec + senior Q&A — không cần hoàn thành 161 lesson

Full 7-day alignment: [`dev-environment-and-practice-diagrams.md`](dev-environment-and-practice-diagrams.md) §5.

---

## Links

| Resource | URL |
|----------|-----|
| Guided paths | https://learn.outsystems.com/training/decision/guided-paths |
| Free / Personal Edition | https://www.outsystems.com/low-code-platform/free/ |
