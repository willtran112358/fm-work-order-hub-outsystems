# ODC Studio quickstart — bạn đã vào portal

**Bạn đang ở:** **OutSystems Developer Cloud (ODC)** — portal web (Apps, Create, Deliver, Monitor…).  
**IDE để code:** **ODC Studio** (nút **Download ODC Studio** góc phải trên màn hình Apps).

> SJ enterprise có thể dùng **O11 + Lifetime** hoặc **ODC** tùy contract. Prep của repo **ưu tiên ODC** nếu bạn đã login được portal này; O11 vẫn xem [`free-hands-on.md`](free-hands-on.md) §O11.

---

## 1. Portal map (màn hình bạn thấy)

| Khu vực sidebar | Dùng khi prep SJ | Ghi chú interview |
|-----------------|------------------|-------------------|
| **CREATE → Apps** | Tạo / mở app `FMWorkOrderHub` | “Starting point for delivery” |
| **CREATE → Workflows** | BPT escalation (Day 2 optional) | Map JD “business process” |
| **DELIVER → Deployments** | Publish app lên environment | ≈ Publish / Lifetime promote |
| **DELIVER → Overview** | Trạng thái app | |
| **MONITOR → Logs / Traces** | Debug REST lỗi | JD troubleshoot |
| **ANALYZE → Code quality** | Senior: review findings | JD code review |
| **INTEGRATE → Connections** | REST tới mock 24K / Azure | JD third-party APIs |
| **INTEGRATE → External logic** | Logic tái sử dụng, extensions | ≈ Integration Services module |
| **FORGE** | Charts, Maps, UI templates | Template Web App trong grid |

**Grid “App assets”:** OutSystems UI, Maps, Screen Templates — dùng **OutSystems UI** + **Template Web App** để khởi tạo nhanh (không bắt buộc cho lab FM).

---

## 2. Day 0 — 15 phút (bạn đã xong bước login)

```text
[x] Login ODC portal — Apps page
[ ] Download ODC Studio → cài Windows
[ ] ODC Studio → Sign in cùng account
[ ] Portal → Create → App → Web app (hoặc trong Studio: New App)
[ ] Đặt tên: FMWorkOrderHub
[ ] node mock-server.js + ngrok (Day 2 REST) — xem §5
```

---

## 3. Tạo app FM (ODC Studio)

### Cách A — Từ portal (khuyến nghị)

1. Portal → **Create** → **App**  
2. Chọn **Web app** (Reactive-style trên ODC)  
3. Name: `FMWorkOrderHub`  
4. **Open in ODC Studio** (hoặc mở Studio → app vừa tạo)

### Cách B — Từ ODC Studio

1. **File → New Application** (hoặc welcome screen New App)  
2. Type: **Web**  
3. Publish lần đầu: **1-Click Publish** hoặc **Publish** toolbar  

**Done when:** Browser mở URL app (domain `*.outsystems.app` hoặc tương tự) — màn hình trống cũng được.

---

## 4. ODC vs O11 — nói trong phỏng vấn (30 giây)

| | O11 (classic) | ODC (bạn đang dùng) |
|--|---------------|---------------------|
| IDE | Service Studio | **ODC Studio** |
| Admin | Service Center | **Portal** (Deliver / Monitor) |
| Deploy | Publish to environment | **Deployments** pipeline |
| Integration | REST extension in module | **Connections** + consumed APIs |
| SJ | Nhiều partner vẫn O11 | SJ có thể adopt ODC cho app mới |

**Senior line:** “Patterns are the same — entities, server logic, REST, RBAC — delivery surface is ODC with Connections and cloud-native monitor.”

---

## 5. Mock 24K API + ODC (quan trọng)

App **chạy trên cloud ODC** → **`http://localhost:3000` không gọi được** từ server OutSystems.

| Cách | Khi nào |
|------|---------|
| **ngrok** | Dev nhanh: `ngrok http 3000` → BaseURL = `https://xxxx.ngrok-free.app` |
| **Mockoon desktop + tunnel** | Tương tự |
| **Postman Mock Server** | URL public sẵn, không cần máy bạn online |

**Setup ngrok (Day 2 trước khi REST lab):**

```bash
# Terminal 1
cd interview/surbana-jurong-outsystems-senior/resources
node mock-server.js

# Terminal 2
ngrok http 3000
```

Trong ODC: **INTEGRATE → Connections** → REST → Base URL = ngrok HTTPS URL.

---

## 6. Data model trong ODC Studio

Tên menu có thể khác Service Studio một chút — concept giống:

| Việc | Tìm trong Studio |
|------|------------------|
| Entity | Data tab / Entities |
| Static entity | Static Entity |
| Screen | Interface → Screens |
| Server action | Logic → Server Actions |
| Aggregate | Screen → Data sources |
| REST consume | Logic → Integrations hoặc Connections (import) |

Chi tiết field: [`samples/entity-model-facility-asset.spec.md`](../samples/entity-model-facility-asset.spec.md)

---

## 7. Roles & security (ODC)

1. Portal hoặc Studio → **Users / Roles** (tên menu có thể là **App security**)  
2. Tạo `FM_Supervisor`, `FieldTech`  
3. Gán role cho user test  
4. Screen checks: chỉ hiện nút Create cho Supervisor  

Pattern SiteId: server action filter — không đổi so với spec.

---

## 8. Publish / demo trước phỏng vấn

1. Studio → **Publish** (fix errors đỏ trước)  
2. Portal → **DELIVER → Deployments** — xem deployment succeeded  
3. Mở app URL → WorkOrderList + (Day 2) AlertConsole  
4. Chụp screenshot: Deployments + app list + 1 screen  

Nếu deployment fail → **MONITOR → Logs** — đọc stack / integration error.

---

## 9. Troubleshooting ODC

| Vấn đề | Cách xử lý |
|--------|------------|
| Không thấy app trong Studio | Portal Apps → ⋮ → Open in Studio |
| REST timeout | localhost vs ngrok; Connection test trong INTEGRATE |
| Publish validation | Architecture / unused references — xóa broken refs |
| Template quá nhiều trong grid | Bỏ qua; tự tạo app trống qua Create → App |
| Code quality warnings | ANALYZE → xem; fix critical trước interview story |

---

## 10. Link lab đầy đủ

- Day 1–2 steps: [`03-day1-hands-on-lab.md`](../03-day1-hands-on-lab.md) (đã có nhánh ODC)  
- 2 ngày schedule: [`OUTSYSTEMS-SENIOR-Sach-2-Ngay.md`](../OUTSYSTEMS-SENIOR-Sach-2-Ngay.md)
