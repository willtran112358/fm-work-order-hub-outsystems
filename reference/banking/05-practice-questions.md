# Practice questions — OutSystems Developer (banking context)

Answer in **English** unless interviewer uses Vietnamese. Target **1–2 minutes** per question.

---

## Platform fundamentals

1. What is the difference between an **Entity** and a **Structure**?
2. When do you use a **Static Entity** vs a regular Entity?
3. Explain **Aggregate** and why OutSystems generates SQL for you.
4. **Client Action** vs **Server Action** — examples from a banking form.
5. What is a **Block** and when would you extract one?
6. Reactive Web vs Traditional Web — which would you pick for a new branch tablet app in 2026?
7. What happens when you **Publish** vs **Deploy** to another environment?
8. Name three ways to optimize a slow screen list in OutSystems.

---

## Data & logic

9. How would you model **maker-checker** without BPT (simple version)?
10. How would you implement **soft delete** on `CustomerApplication`?
11. Duplicate form submit — how prevent double loan booking?
12. Validations: client-side vs server-side — what must always be server-side in banking?
13. When is **Advanced Query** justified?
14. How store **uploaded KYC PDF** — platform blob vs external DMS integration?

---

## Integration

15. Walk through consuming a **REST GET** for customer CIF lookup.
16. Core returns HTTP 200 with `{ "status": "FAILED", "code": "INSUFFICIENT_BALANCE" }` — how handle?
17. SOAP legacy core — high-level approach in OutSystems?
18. Timeout on payment POST — UX and backend state?
19. How design **idempotent** POST to core (keys, headers)?
20. API keys — where configured?

---

## Security & compliance

21. Explain **Roles** and checking permission in a Server Action.
22. Branch officer must only see own branch tickets — implement how?
23. PII masking on screen list vs detail screen?
24. Audit trail — platform vs custom entity?
25. Session timeout requirements for banking — what configure?

---

## Processes (BPT)

26. BPT vs Server Action workflow — when choose BPT?
27. Human activity assignment to **Regional Manager** role?
28. Timer escalation 30 days no KYC response?
29. How cancel / compensate a process instance?

---

## Architecture & delivery

30. How split modules for **Loan** and **Onboarding** apps sharing integration?
31. What is **Lifetime** and typical DEV → TST → PRD flow?
32. Technical debt in low-code — one example and mitigation.
33. Forge component in production — review checklist?

---

## DE bridge (expect these if CV is DE)

34. How your **data quality** experience helps OutSystems delivery?
35. Difference fixing bad data in **warehouse** vs at **capture** in app?
36. Would you still write SQL? Where in OutSystems stack?
37. Event from app to **Kafka** — realistic patterns?
38. Reconciliation report when app DB and core disagree?

---

## Scenario (whiteboard — 5–10 min each)

### S1 — Branch queue tablet

300 tickets/day/branch; offline 5 minutes — what is feasible on OutSystems?

**Expect:** Honest offline limits; cache last aggregate; sync on reconnect; conflict on status.

### S2 — Loan amount threshold

≤ 50M branch auto; > 50M regional — BPT or pure logic?

**Expect:** BPT when audit + reassignment; logic when simple + logged.

### S3 — Core maintenance window

Scoring API down 2 hours during UAT — degrade how?

**Expect:** Queue status; message; no fake success; retry job.

---

## Sample answer skeleton (Q15 — REST GET)

```text
"I define a Structure matching the core JSON schema.
 In Integration Studio or REST consume, I bind GET /customers/{cif}.
 A Server Action calls the API with timeout from Service Center.
 On success I map to local variables and return to the screen.
 On 404 I show a controlled message; on 5xx I log in Service Center and show retry — never expose stack trace.
 Same contract discipline I used for DE source APIs."
```

---

## Sample answer skeleton (Q34 — DQ → OS)

```text
"In DE I defined rules with quarantine and metrics.
 In OutSystems I put non-negotiable rules in Server Actions before any core call —
 for example income must match document band or application stops with coded error.
 I also log validation failures to an AuditLog entity for ops dashboards —
 similar to DQ incident tables I maintained in the warehouse."
```

---

## Questions to ask interviewer

1. O11 or ODC; Reactive-only or mobile native?  
2. Who owns API catalog and sandbox cores?  
3. Regression suite before Lifetime promote?  
4. Team split: dev / BA / QA ratios?  
5. First 90 days success definition?
