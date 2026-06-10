# Free hands-on resources — OutSystems (cloud + local download)

**Mục tiêu:** Tất cả mục dưới đây **$0** — phù hợp prep 2 ngày. Không cần license enterprise on-prem.

> **Đã login ODC portal?** → [`odc-studio-quickstart.md`](odc-studio-quickstart.md) + khóa chính thức **Becoming a web developer** map tại [`odc-web-developer-path.md`](odc-web-developer-path.md).

---

## 0. Chọn path môi trường

| | **Path A — ODC** (khuyến nghị nếu đã có portal) | **Path B — O11** |
|--|--------------------------------------------------|------------------|
| Learn | **Becoming a web developer** (~11h, ODC) | Become a Reactive Web Developer |
| IDE | ODC Studio | Service Studio |
| REST mock | **ngrok** + Connections | `localhost:3000` thường đủ |
| Quickstart | [`odc-studio-quickstart.md`](odc-studio-quickstart.md) | §1 bảng PE bên dưới |

---

## 1. Môi trường dev miễn phí (bắt buộc)

| Resource | Loại | Link | Ghi chú |
|----------|------|------|---------|
| **Free platform signup** | Cloud | https://www.outsystems.com/low-code-platform/free/ | Tạo account; deploy app thật lên cloud |
| **Personal Environment (O11)** | Cloud (riêng bạn) | https://www.outsystems.com/personal-environment/ | Không phải trial 7 ngày doanh nghiệp; sleep sau ~15 ngày idle |
| **ODC Personal Edition** | Cloud (thế hệ mới) | https://www.outsystems.com/product-updates/introducing-the-new-outsystems-personal-edition/ | Shared/temporary hơn O11; học xong O11 rồi thử ODC |
| **Service Studio** | **Download local** (IDE) | https://success.outsystems.com/documentation/11/getting_started/service_studio_overview/ | Cài trên Windows; kết nối Personal Environment |
| **Service Center** | Web (quản trị env) | Mở từ portal sau khi login | Users, apps, logs — giống “ops console” nhẹ |

**Không có:** On-prem OutSystems **miễn phí** tự cài SQL Server/Oracle. Enterprise on-prem = commercial license only.

---

## 2. Khóa học & tutorial (online, free)

| Resource | Link | Thời lượng gợi ý (2 ngày) |
|----------|------|---------------------------|
| **Learning path decision** | https://learn.outsystems.com/training/decision/guided-paths | ODC → **Becoming a web developer** |
| **Becoming a web developer (ODC)** | Learn portal — Platform **ODC** | Day 0–1: ODC overview → Modeling → UI/Aggregates — **map:** [`odc-web-developer-path.md`](odc-web-developer-path.md) |
| **Become a Reactive Web Developer** | Learn — O11 | Path B — tương đương §7–24 path ODC |
| **Integrate with external systems** | Learn (path riêng) | Day 2 sáng — REST lab |
| **Security / Users & Roles** | Learn hoặc module *Role-based security* trong Web path | Day 2 — `BranchOfficer` |
| **Processes / BPT** | Learn | Day 2 optional — `bpt-kyc-escalation.spec.md` |
| **OutSystems 101 (video)** | https://www.outsystems.com/learn/ | 1–2 clip trước khi cài IDE |
| **Documentation** | https://success.outsystems.com/documentation/ | Entity, Aggregate, Action, BPT |

**AI-assisted dev (path ODC):** Studio có thể sinh screen/entity/logic từ mô tả — prep banking vẫn cần review data model, aggregate filter (`BranchId`), server validation. Xem §3 trong [`odc-web-developer-path.md`](odc-web-developer-path.md).

**Offline tip:** ODC Studio / Service Studio → Help → Guided Tutorials sau khi cài IDE.

---

## 3. Forge & community (free components)

| Resource | Link | Dùng khi prep |
|----------|------|----------------|
| **Forge** | https://www.outsystems.com/forge/ | Chart, PDF, QR — cài vào Personal Env từ IDE |
| **Forums** | https://www.outsystems.com/forums/ | Search lỗi deploy, Personal Environment wake-up |
| **Architecture dashboard** | Trong Lifetime (nếu có) / docs | Hiểu dependency app — phỏng vấn senior |

---

## 4. Banking-flavored practice (tự làm trên Personal Env)

Không có “bank simulator” official free — **tự dựng** theo spec trong `samples/`:

| Mini-app | Spec file | Kỹ năng luyện |
|----------|-----------|----------------|
| Retail onboarding | `samples/entity-model-retail-onboarding.spec.md` | Entity, Static Entity, screens |
| Loan approval | `samples/loan-approval-action-flow.spec.md` | Actions, validations, audit |
| Core REST mock | `samples/rest-integration-core-banking.spec.md` | REST API, structures, error handling |
| KYC escalation | `samples/bpt-kyc-escalation.spec.md` | BPT, human tasks, timers |

**Mock API free (thay core banking):**

| Tool | Link | Local? |
|------|------|--------|
| **JSON Server** | https://github.com/typicode/json-server | `npm i -g json-server` — chạy `db.json` local |
| **Mockoon** | https://mockoon.com/ | Desktop app — export OpenAPI |
| **Postman Mock Server** | https://www.postman.com/ | Cloud free tier |

Flow: Mockoon/JSON Server trên laptop → REST consume từ OutSystems Personal Environment (public URL hoặc ngrok nếu cần callback).

**File mock có sẵn trong repo:** `resources/mock-core-banking-db.json`

```bash
cd interview/outsystems-dev-banking/resources
npx json-server --watch mock-core-banking-db.json --port 3000
```

---

## 5. Checklist cài đặt (copy-paste)

```text
[ ] Account OutSystems (free)
[ ] ODC: portal + ODC Studio OR O11: PE + Service Studio
[ ] Learn: Becoming a web developer (ODC) — ODC overview quiz + Modeling §7-9
[ ] Publish app BranchQueue once
[ ] Mock REST: json-server + ngrok (ODC) OR localhost (O11)
[ ] Lab BranchQueue — entities + list + server actions (3h)
[ ] Lab CustomerLookup — Connections/REST spec (2h)
[ ] Đọc odc-web-developer-path.md — checklist interview ready
```

---

## 6. Giới hạn free tier (nói trong phỏng vấn)

- User count / storage / CPU thấp hơn enterprise.  
- Không full control DB — khác on-prem SQL Server admin.  
- Personal Environment **sleep** — cần wake trước interview demo.  
- **Lifetime** (CI/CD multi-env) thường chỉ thấy ở khách hàng trả phí — hiểu concept, không bắt buộc có trong PE.

---

## 7. Tài liệu trong repo (offline)

Toàn bộ thư mục `interview/outsystems-dev-banking/` đọc **offline** trên máy — không phụ thuộc OutSystems khi ôn lý thuyết.
