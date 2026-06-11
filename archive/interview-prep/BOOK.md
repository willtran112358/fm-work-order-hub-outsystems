# Senior OutSystems Prep Book — Table of Contents

**Read this repo like a short technical book.** Start at [README.md](README.md), then follow **Part I → V** in order. The **2-day path** is the main storyline; **7-day** is the extended edition.

---

## How to read (2 days)

| When | Part | Chapter | File |
|------|------|---------|------|
| **Day 0** | Setup | ODC quickstart | [resources/odc-studio-quickstart.md](resources/odc-studio-quickstart.md) |
| **Day 0** | Setup | **Learn: Becoming a web developer (ODC)** | [resources/odc-web-developer-path.md](resources/odc-web-developer-path.md) |
| **Day 0** | Setup | **Visual: dev env + practice plan** | [resources/dev-environment-and-practice-diagrams.md](resources/dev-environment-and-practice-diagrams.md) |
| **Day 1 AM** | I — Business | SJ context & revenue | [docs/01-business-context.md](docs/01-business-context.md) |
| **Day 1 AM** | I — Business | JD mapping | [interview/03-jd-mapping.md](interview/03-jd-mapping.md) |
| **Day 1 AM** | II — Architecture | As-Is | [docs/02-as-is-architecture.md](docs/02-as-is-architecture.md) |
| **Day 1 AM** | II — Architecture | To-Be | [docs/03-to-be-architecture.md](docs/03-to-be-architecture.md) |
| **Day 1 AM** | II — Architecture | Summary | [docs/04-as-is-to-be-summary.md](docs/04-as-is-to-be-summary.md) |
| **Day 1 PM** | III — Build | **2-day schedule** | [OUTSYSTEMS-SENIOR-Sach-2-Ngay.md](OUTSYSTEMS-SENIOR-Sach-2-Ngay.md) |
| **Day 1 PM** | III — Build | Lab Day 1 | [03-day1-hands-on-lab.md](03-day1-hands-on-lab.md) |
| **Day 1 Eve** | IV — Specs | REST contract | [samples/rest-integration-24k-iot.spec.md](samples/rest-integration-24k-iot.spec.md) |
| **Day 2 AM** | III — Build | Lab Day 2 | [03-day1-hands-on-lab.md](03-day1-hands-on-lab.md) §Part B |
| **Day 2 PM** | V — Interview | Mock + whiteboard | [04-day2-interview-prep.md](04-day2-interview-prep.md) |
| **Day 2 PM** | V — Interview | 40+ questions | [interview/02-practice-questions.md](interview/02-practice-questions.md) |
| **Day 2 PM** | V — Interview | Senior round | [interview/01-senior-round-prep.md](interview/01-senior-round-prep.md) |

**90 minutes only?** → [OUTSYSTEMS-SENIOR-Sach-2-Ngay.md](OUTSYSTEMS-SENIOR-Sach-2-Ngay.md) section *Đọc nhanh*.

---

## Part I — Business (why SJ hires you)

1. [docs/01-business-context.md](docs/01-business-context.md) — Model, ~S$2.3B revenue, pain points, profit levers, STAR

---

## Part II — Architecture (what you design in the interview)

1. [docs/02-as-is-architecture.md](docs/02-as-is-architecture.md) — 24K, OMNI, siloed apps  
2. [docs/03-to-be-architecture.md](docs/03-to-be-architecture.md) — OutSystems layer, APIM, security  
3. [docs/04-as-is-to-be-summary.md](docs/04-as-is-to-be-summary.md) — One-page whiteboard cheat sheet  

---

## Part III — Hands-on (build on ODC / O11)

1. [resources/dev-environment-and-practice-diagrams.md](resources/dev-environment-and-practice-diagrams.md) — **Mermaid:** ODC topology, 7-day / 2-day practice, senior pillars  
2. [resources/odc-web-developer-path.md](resources/odc-web-developer-path.md) — Official Learn path ↔ FM lab / 7-day map + AI review checklist  
3. [resources/free-hands-on.md](resources/free-hands-on.md) — Free tier, mock API, checklist  
4. [resources/odc-studio-quickstart.md](resources/odc-studio-quickstart.md) — Portal map (Apps, Integrate, Deliver)  
5. [03-day1-hands-on-lab.md](03-day1-hands-on-lab.md) — `FMWorkOrderHub` + REST mock  
6. [resources/mock-server.js](resources/mock-server.js) — Local 24K API (+ ngrok for ODC)  

---

## Part IV — Engineering specs (no `.oml` — you implement)

| Spec | Topic |
|------|--------|
| [samples/entity-model-facility-asset.spec.md](samples/entity-model-facility-asset.spec.md) | Domain model |
| [samples/work-order-fm-portal.spec.md](samples/work-order-fm-portal.spec.md) | Reactive portal |
| [samples/rest-integration-24k-iot.spec.md](samples/rest-integration-24k-iot.spec.md) | REST integration |
| [samples/iot-alert-escalation-bpt.spec.md](samples/iot-alert-escalation-bpt.spec.md) | BPT escalation |
| [samples/project-inspection-mobile.spec.md](samples/project-inspection-mobile.spec.md) | Mobile field app |
| [samples/reference/](samples/reference/) | SQL + JavaScript samples |

---

## Part V — Interview

1. [04-day2-interview-prep.md](04-day2-interview-prep.md) — Agenda, whiteboard, demo flow  
2. [interview/01-senior-round-prep.md](interview/01-senior-round-prep.md) — Code review scenario  
3. [interview/02-practice-questions.md](interview/02-practice-questions.md) — Q&A bank  
4. [interview/03-jd-mapping.md](interview/03-jd-mapping.md) — JD → proof points  

---

## Extended edition (7 days)

[OUTSYSTEMS-SENIOR-Prep-7-Ngay.md](OUTSYSTEMS-SENIOR-Prep-7-Ngay.md) — deeper BPT, performance, extra mock time.

---

## Banking track (alternate 2-day path)

Use this instead of Parts I–V above when prepping for **banking / client-bid** roles (core banking, ERP, Savannah GA context).

| When | File |
|------|------|
| Overview + diagrams | [banking/README.md](banking/README.md) |
| 2-day schedule | [banking/OUTSYSTEMS-DEV-Sach-2-Ngay.md](banking/OUTSYSTEMS-DEV-Sach-2-Ngay.md) |
| Business | [banking/00-business-banking-lowcode.md](banking/00-business-banking-lowcode.md) |
| Architecture | [banking/01-architecture-outsystems.md](banking/01-architecture-outsystems.md) |
| DE bridge | [banking/02-bridge-de-to-outsystems.md](banking/02-bridge-de-to-outsystems.md) |
| Labs | [banking/03-day1-hands-on-lab.md](banking/03-day1-hands-on-lab.md) · [banking/04-day2-interview-prep.md](banking/04-day2-interview-prep.md) |
| ODC diagrams | [banking/resources/odc-dev-environment-diagrams.md](banking/resources/odc-dev-environment-diagrams.md) |
| Specs | [banking/samples/](banking/samples/) |

Shared ODC setup: [resources/odc-studio-quickstart.md](resources/odc-studio-quickstart.md) · [resources/odc-web-developer-path.md](resources/odc-web-developer-path.md)

---

## Disclaimer

Public-source business research for interview prep only — not affiliated with Surbana Jurong. No proprietary SJ or OutSystems source code included.
