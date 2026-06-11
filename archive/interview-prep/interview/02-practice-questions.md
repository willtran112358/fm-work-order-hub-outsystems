# Practice questions — OutSystems Senior @ Surbana Jurong

**40+ câu** map trực tiếp JD — ôn Day 6–7.

---

## A. Platform & architecture (10)

1. Explain OutSystems runtime: front-end vs application server vs platform DB.  
2. Difference between Reactive Web and Traditional Web — when would SJ choose Reactive?  
3. What is a foundation module vs application module?  
4. Describe Architecture Canvas purpose for a Senior Dev.  
5. How does Lifetime support DEV → TST → UAT → PRD?  
6. O11 vs ODC — high-level differences?  
7. Where does business logic belong — client action vs server action?  
8. How would you structure Integration Services for 24K APIs?  
9. Explain forge component reuse vs internal SJ block library.  
10. How does OutSystems fit **on top of** 24K without replacing it?

---

## B. UI/UX & front-end (6)

11. UI/UX best practices for FM supervisor web + mobile — 3 examples.  
12. How do you implement responsive layout in Reactive?  
13. When use Client Variables vs Server Variables?  
14. How handle loading and error states on slow REST calls?  
15. Accessibility considerations for client portal?  
16. Role-based UI — hide vs disable buttons?

---

## C. Integration & APIs (8)

17. Design REST consumer for paginated 24K alert list.  
18. OAuth2 client credentials flow in OutSystems — where store secrets?  
19. How handle HTTP 429 rate limit from APIM?  
20. Idempotency for `CreateWorkOrderFromAlert` — how implement?  
21. SOAP vs REST — when still see SOAP at enterprise FM vendors?  
22. Difference between REST API **exposed** vs **consumed** in OutSystems?  
23. How test integrations without 24K production access?  
24. What is correlationId and why log it?

---

## D. Data & SQL (6)

25. Entity vs Static Entity — WOStatus example.  
26. Aggregate vs Advanced Query — when use SQL?  
27. How optimize list screen with 100k work orders?  
28. Index strategy for `WorkOrder(SiteId, StatusId, CreatedOn)` — explain.  
29. How prevent SQL injection in OutSystems (parameterized queries)?  
30. SCD / audit — WorkOrderEvent pattern?

---

## E. BPT & workflow (4)

31. BPT human activity vs timer — escalation example.  
32. How cancel BPT when work order closed early?  
33. Duplicate BPT instances — prevention?  
34. Maker-checker pattern in OutSystems?

---

## F. Performance, scalability, security (8)

35. Three performance optimizations you applied in production.  
36. Server-side pagination vs fetch all — tradeoff.  
37. Caching static site metadata — where and TTL?  
38. Multi-tenant security with SiteId — implement in aggregate.  
39. Azure AD SSO integration overview.  
40. Secrets in module configuration vs hardcode — audit finding?  
41. How scale OutSystems for 500 concurrent FM users?  
42. Graceful degradation when 24K API down?

---

## G. SDLC, Agile, documentation (6)

43. Your definition of Done for a user story.  
44. How participate in sprint planning as Senior?  
45. Code review checklist — 5 items for server actions.  
46. Technical documentation you maintain per module.  
47. How troubleshoot P1 in production after hours?  
48. Version control / merge strategy on OutSystems team?

---

## H. SJ / domain specific (6)

49. What is SJ 24K platform in one sentence?  
50. OMNI vs OutSystems app — division of responsibility?  
51. Pain point: alert to work order manual — your solution?  
52. Why SJ hired OutSystems partner since 2018?  
53. Azure vs AWS — why Azure matters for this role?  
54. NTU Omnibus case — relevance to SJ campus clients?

---

## I. Scenario answers (short)

### Scenario 1: Critical alert storm (100 alerts/min)

**Q:** System creates duplicate work orders. Fix?

**A:** Dedupe on SourceAlertId; batch processing queue; rate limit; supervisor dashboard for flood mode.

### Scenario 2: Client sees another campus data

**Q:** P1 security — root cause?

**A:** Missing SiteId filter in aggregate — fix hotfix, audit all screens, add automated test on security filter.

### Scenario 3: PE vs enterprise

**Q:** "Have you used Lifetime?"

**A:** Honest: PE for dev; explain Lifetime promotion, merge, rollback concept; reference docs + enterprise project if any.

---

## J. English fluency drills

Practice **out loud** — 2 min each:

1. Walk through To-Be architecture diagram.  
2. Explain BPT escalation to non-technical PM.  
3. Describe a difficult integration bug you fixed.  
4. Why leave current role for SJ?  
5. Where do you see low-code in built environment in 5 years?

---

## Answer key pointers

| Section | See file |
|---------|----------|
| Architecture | `docs/02`, `docs/03` |
| Integration | `samples/rest-integration-24k-iot.spec.md` |
| BPT | `samples/iot-alert-escalation-bpt.spec.md` |
| SQL | `samples/reference/sql_asset_maintenance_queries.sql` |
| Business | `docs/01-business-context.md` |
