# Senior technical round prep — Surbana Jurong OutSystems

**Format:** 60–90 phút — system design + deep OutSystems + behavioral + code review scenario.

---

## 1. Round structure (typical)

| Segment | Duration | What they assess |
|---------|----------|------------------|
| Intro + CV deep dive | 10 min | 3+ years OSE, enterprise scale |
| Agile / Scrum experience | 5 min | Sprint, retro, estimation |
| System design whiteboard | 20 min | 24K + OutSystems — **not replace core** |
| Technical deep dive | 20 min | REST, BPT, performance, security |
| Code review scenario | 10 min | Spot issues in pseudo-spec |
| Your questions | 10 min | Squad, roadmap, cert path |

---

## 2. Whiteboard prompt — practice twice

**Prompt:** "Design an FM work order system for a university campus. They already use 24K for IoT. How would you build it on OutSystems?"

**Answer skeleton (5 min):**

1. **Users:** supervisor web, tech mobile, client read-only  
2. **Apps:** FMWorkOrderHub + Integration Services module  
3. **Data:** Operational entities in OSE; twin in 24K  
4. **Flow:** Alert → REST → create WO → BPT assign → mobile close-out  
5. **Non-functionals:** SiteId tenant filter, APIM, audit, pagination  
6. **Phasing:** Foundation → MVP → mobile → portal  

Reference: [`docs/03-to-be-architecture.md`](../docs/03-to-be-architecture.md)

---

## 3. Code review scenario

**Given pseudo server action (intentional bugs):**

```text
Server Action CreateWorkOrderFromAlert(AlertId, SiteCode)
  // Gets API key from screen variable
  Set APIKey = GetGlobalConfig().ApiKey
  REST GET http://24k.internal/alerts/{AlertId}
  Create WorkOrder (no duplicate check)
  Assign to hardcoded user "tech1@sj.com"
  // No audit log
  Return
```

**Senior findings:**

| # | Issue | Fix |
|---|-------|-----|
| 1 | API key in client-accessible path | Module config + server only |
| 2 | HTTP not HTTPS | TLS + APIM |
| 3 | No idempotency on SourceAlertId | Check open WO first |
| 4 | Hardcoded assignee | Round-robin or supervisor queue |
| 5 | No audit trail | WorkOrderEvent |
| 6 | No error handling on REST | Map errors; don't lose alert |
| 7 | Internal URL | Externalized per environment |

---

## 4. Production troubleshooting scenario

**Situation:** After release, FM supervisors report work order list timeout on one campus only.

**Structured response:**

1. **Reproduce** — SiteId filter? Data volume?  
2. **Service Center** — slow queries, errors  
3. **Aggregate** — missing pagination? N+1 joins?  
4. **SQL** — index on SiteId + StatusId  
5. **Integration** — not list issue if only one site → data spike from alert storm  
6. **Mitigation** — hotfix pagination; index; comms to client  
7. **Prevent** — load test before release; monitor p95  

---

## 5. Agile / Scrum talking points (JD)

| Topic | Senior contribution |
|-------|---------------------|
| **Sprint planning** | Break Integration Services vs UI; dependency first |
| **Estimation** | Story points; spike for unknown 24K API |
| **Retro** | "We merged without Architecture Canvas review" → action |
| **DoD** | Spec updated, peer review, UAT script, no P1 in SC |
| **Blockers** | Escalate 24K API contract delay to architect early |

---

## 6. Documentation sample (show you know JD)

Point interviewer to repo specs as **your standard**:

- Entity model table  
- REST contract with error codes  
- Screen map diagram  
- Acceptance criteria per story  

---

## 7. Questions to ask interviewer

1. How is OutSystems positioned vs 24K/OMNI — experience layer or also internal ERP replacement?  
2. Current squad size and cert levels — mentoring expectation?  
3. Lifetime / environment strategy for client deployments?  
4. Typical integration: APIM + Azure AD already standard?  
5. Next 12-month digital product roadmap for Surbana Technologies?  

---

## 8. Red flags to avoid

- Proposing to **replace** 24K with OutSystems DB for IoT  
- Ignoring **multi-tenant** SiteId security  
- "Low-code = no code review"  
- No mention of **documentation** or **SDLC**  
- Dismissing Azure — SJ stack is Azure-aligned  

---

## 9. STAR templates (fill with your experience)

### Integration failure

**S:** Production REST to external API returned 500 after vendor upgrade.  
**T:** Restore FM workflow without data loss.  
**A:** Circuit breaker, queue retry, manual reconcile screen; postmortem with versioned contract.  
**R:** Zero duplicate work orders; APIM contract tests added.

### Mentoring / code review

**S:** Junior published aggregate fetching 50k rows.  
**T:** Fix performance before client UAT.  
**A:** Code review + pagination pattern doc; pair programming.  
**R:** Screen load 28s → 1.8s; pattern reused in second app.

---

## 10. 90-second closing

> "I'm excited about Surbana Technologies because you're one of few built-environment firms with both a digital twin platform and an OutSystems partnership — the Senior role is about turning that into repeatable client delivery. I'd bring full SDLC ownership, integration discipline with 24K, and the mentoring needed to grow your OSE bench."
