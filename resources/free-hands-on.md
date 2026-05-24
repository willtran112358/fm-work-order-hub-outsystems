# Free hands-on resources — OutSystems Senior (Surbana Jurong prep)

**Mục tiêu:** Tất cả **$0** — cloud + local download + offline docs trong repo này.

> **Đã login ODC portal (Apps, Create, Download ODC Studio)?** → Bắt đầu tại **[`odc-studio-quickstart.md`](odc-studio-quickstart.md)** — map đúng UI bạn đang thấy.

**Visual guide (Mermaid, color):** [`dev-environment-and-practice-diagrams.md`](dev-environment-and-practice-diagrams.md) — laptop ↔ ODC ↔ ngrok ↔ mock 24K, senior practice pillars.

---

## 1. OutSystems platform

### Path A — ODC (khuyến nghị nếu bạn đã vào portal)

| Resource | Ghi chú |
|----------|---------|
| **ODC Portal** | Apps, Create, Deliver, Monitor, Integrate — bạn đã có |
| **ODC Studio** | Nút **Download ODC Studio** trên portal → cài Windows |
| **Quickstart repo** | [`odc-studio-quickstart.md`](odc-studio-quickstart.md) |
| **REST mock** | `node mock-server.js` + **ngrok** (ODC app chạy cloud — không dùng localhost) |

### Path B — O11 (classic, backup)

| Resource | Link | Ghi chú |
|----------|------|---------|
| **Personal Environment (O11)** | https://www.outsystems.com/personal-environment/ | Sleep sau ~15 ngày idle |
| **Service Studio** | https://success.outsystems.com/documentation/11/getting_started/service_studio_overview/ | Windows IDE |
| **Service Center** | PE portal | Logs, users |
| **REST mock** | `http://localhost:3000` — OK vì logic chạy gần PE |

| Context | Link |
|---------|------|
| **Free signup** | https://www.outsystems.com/low-code-platform/free/ |
| **Surbana partner** | https://www.outsystems.com/partners/surbana-technologies-pte-ltd/ |

**Không có:** On-prem OutSystems enterprise miễn phí.

---

## 2. Khóa học online (free)

| Resource | Link | Senior focus |
|----------|------|--------------|
| **Learning paths** | https://learn.outsystems.com/training/decision/guided-paths | Reactive + Integration |
| **Become a Reactive Web Developer** | Learn portal | Day 3 lab FM portal |
| **Integrate with external systems** | Learn | Day 4 REST |
| **Security** | Learn | RBAC, SiteId pattern |
| **Business Process Technology** | Learn | Day 5 escalation |
| **Architecture Dashboard** | Docs: https://www.outsystems.com/evaluation-guide/ | Lifetime concepts |
| **Documentation 11** | https://success.outsystems.com/documentation/11/ | Tra cứu |
| **OutSystems 101 videos** | https://www.outsystems.com/learn/ | 1–2 video intro |

**Offline:** Service Studio → Help → Guided Tutorials (sau khi cài IDE).

---

## 3. Forge & community

| Resource | Link | SJ use case |
|----------|------|-------------|
| **Forge** | https://www.outsystems.com/forge/ | Charts (FM KPI), PDF export inspection |
| **Forums** | https://www.outsystems.com/forums/ | PE wake-up, REST SSL |
| **NTU Omnibus case study** | https://www.outsystems.com/case-studies/ntu-singapore-mobile-campus-experience/ | Analogy campus FM |

---

## 4. Mock 24K API (local — thay IoT platform)

### Option A — Node mock (recommended)

```bash
cd interview/surbana-jurong-outsystems-senior/resources
node mock-server.js
```

| Endpoint | Method |
|----------|--------|
| `/sites/SIN-CAMPUS-01/alerts?status=OPEN` | GET |
| `/alerts/ALT-2024-8891/acknowledge` | POST |
| `/assets/24K-AHU-991` | GET |

**ODC → REST:** Bắt buộc URL public — **ngrok** `ngrok http 3000` → BaseURL trong **INTEGRATE → Connections**.

**O11 PE → REST:** `http://localhost:3000` thường đủ; PE cloud xa máy bạn → ngrok.

### Option B — Mockoon

| Tool | Link |
|------|------|
| **Mockoon desktop** | https://mockoon.com/ | Import routes từ `samples/rest-integration-24k-iot.spec.md` |

### Option C — Postman Mock

https://www.postman.com/ — cloud mock free tier.

---

## 5. Azure free tier (preferred JD skill)

| Service | Free learning | SJ relevance |
|---------|---------------|--------------|
| **Azure free account** | https://azure.microsoft.com/free/ | $200 credit 30 days |
| **Azure IoT Hub free tier** | Docs: IoT Hub pricing | Hiểu device → 24K path |
| **API Management consumption** | Limited free dev | Gateway pattern |
| **Azure AD** | Free tier dev tenant | SSO lab |
| **24K on Marketplace** | https://azuremarketplace.microsoft.com/ (search 24K) | Đọc product page — không bắt buộc deploy |

**Không cần deploy 24K** để prep — mock API đủ cho integration lab.

---

## 6. SJ-flavored labs (repo specs) — 2 ngày path

| Ngày | Mini-app | Spec |
|------|----------|------|
| 1 | FM Work Order | `entity-model-facility-asset`, `work-order-fm-portal` |
| 2 | 24K REST + Alert | `rest-integration-24k-iot` |
| 2 (optional) | BPT | `iot-alert-escalation-bpt` |

**Reference code (paste Extension / SQL):**

- `samples/reference/sql_asset_maintenance_queries.sql`
- `samples/reference/js_geofence_validation.js`

---

## 7. Offline prep (không cần OutSystems online)

| Content | Location |
|---------|----------|
| Business + revenue | `docs/01-business-context.md` |
| Architecture | `docs/02`, `03`, `04` |
| Interview Q&A | `interview/` |
| Engineering specs | `samples/` |

Copy cả folder vào laptop — đọc trên máy bay / không Wi-Fi.

---

## 8. Setup checklist

### ODC (bạn)

```text
[x] Login ODC portal — Apps
[ ] Download + install ODC Studio
[ ] Create → App → Web → FMWorkOrderHub
[ ] Publish once — app URL opens
[ ] node mock-server.js + ngrok — test GET alerts via ngrok URL
[ ] INTEGRATE → Connections — REST test OK
[ ] Lab Day 1: entities + WorkOrderList (03-day1-hands-on-lab.md)
[ ] Lab Day 2: GetOpenAlerts + AlertConsole
[ ] Pitch EN 90s
```

### O11 (nếu dùng thêm)

```text
[ ] Personal Environment awake + Service Studio connected
[ ] localhost:3000 REST (no ngrok required)
```

---

## 9. Giới hạn free tier (nói trong phỏng vấn senior)

| Topic | ODC free / personal | O11 PE | Enterprise (SJ) |
|-------|---------------------|--------|-----------------|
| Users | Limited | Low | AD SSO |
| Localhost integration | **Không** — cần public URL | Có thể | APIM |
| Deploy | Deployments pipeline | Publish | Lifetime multi-env |
| Monitor | Portal Logs/Traces | Service Center | APM + SIEM |
| Sleep | Account policy | ~15 days idle | 24/7 |

**Senior answer:** "I've built on ODC with Connections and cloud deploy; at SJ I'd apply the same integration and governance patterns on enterprise environments with APIM and Azure AD."

---

## 10. ngrok (optional — PE cloud calls localhost)

```bash
ngrok http 3000
```

Use HTTPS forwarding URL in REST consumer **DEV** config only — never commit ngrok URL to repo.
