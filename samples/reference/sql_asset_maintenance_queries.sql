-- Reference SQL for OutSystems Senior prep — FM / Asset domain
-- Use in: SQL tool on PE (if extension DB access), Advanced Query, or explain in interview
-- Target: SQL Server syntax (OutSystems default on many installs)

-- =============================================================================
-- 1. Indexes for WorkOrder list performance (Senior: always mention indexes)
-- =============================================================================

-- CREATE NONCLUSTERED INDEX IX_WorkOrder_Site_Status_Created
-- ON OSUSR_xxx_WorkOrder (SiteId, StatusId, CreatedOn DESC)
-- INCLUDE (Title, PriorityId, AssignedTo, AssetId);

-- CREATE NONCLUSTERED INDEX IX_Asset_External24KId
-- ON OSUSR_xxx_Asset (External24KId)
-- WHERE External24KId IS NOT NULL;

-- =============================================================================
-- 2. Open work orders by site with SLA breach flag
-- =============================================================================

SELECT
    wo.Id              AS WorkOrderId,
    wo.Title,
    s.Code             AS SiteCode,
    a.AssetTag,
    p.Label            AS Priority,
    st.Label           AS Status,
    wo.CreatedOn,
    wo.DueOn,
    CASE
        WHEN wo.DueOn < GETUTCDATE() AND st.IsClosed = 0 THEN 1
        ELSE 0
    END                AS IsSlaBreached,
    DATEDIFF(HOUR, wo.CreatedOn, GETUTCDATE()) AS AgeHours
FROM OSUSR_xxx_WorkOrder wo
INNER JOIN OSUSR_xxx_Asset a      ON a.Id = wo.AssetId
INNER JOIN OSUSR_xxx_Building b   ON b.Id = a.BuildingId
INNER JOIN OSUSR_xxx_Site s       ON s.Id = b.SiteId
INNER JOIN OSUSR_xxx_WOStatus st  ON st.Id = wo.StatusId
INNER JOIN OSUSR_xxx_WOPriority p ON p.Id = wo.PriorityId
WHERE s.Code = @SiteCode
  AND st.IsClosed = 0
ORDER BY p.SLAHours ASC, wo.CreatedOn DESC;

-- =============================================================================
-- 3. Asset maintenance backlog — count open WOs per asset type
-- =============================================================================

SELECT
    at.Label           AS AssetType,
    COUNT(*)           AS OpenWorkOrderCount,
    SUM(CASE WHEN wo.DueOn < GETUTCDATE() THEN 1 ELSE 0 END) AS BreachedCount
FROM OSUSR_xxx_WorkOrder wo
INNER JOIN OSUSR_xxx_Asset a       ON a.Id = wo.AssetId
INNER JOIN OSUSR_xxx_AssetType at  ON at.Id = a.AssetTypeId
INNER JOIN OSUSR_xxx_WOStatus st    ON st.Id = wo.StatusId
WHERE st.IsClosed = 0
GROUP BY at.Label
ORDER BY OpenWorkOrderCount DESC;

-- =============================================================================
-- 4. Technician workload (for assignment dashboard)
-- =============================================================================

SELECT
    wo.AssignedTo,
    COUNT(*)           AS OpenCount,
    MIN(wo.DueOn)      AS NextDue
FROM OSUSR_xxx_WorkOrder wo
INNER JOIN OSUSR_xxx_WOStatus st ON st.Id = wo.StatusId
WHERE st.IsClosed = 0
  AND wo.AssignedTo IS NOT NULL
GROUP BY wo.AssignedTo
ORDER BY OpenCount DESC;

-- =============================================================================
-- 5. Audit trail query — last 10 events for a work order
-- =============================================================================

SELECT TOP 10
    e.EventOn,
    e.EventType,
    e.EventBy,
    e.Notes
FROM OSUSR_xxx_WorkOrderEvent e
WHERE e.WorkOrderId = @WorkOrderId
ORDER BY e.EventOn DESC;

-- =============================================================================
-- 6. Duplicate alert prevention (idempotency check before insert)
-- =============================================================================

SELECT COUNT(*) AS ExistingCount
FROM OSUSR_xxx_WorkOrder wo
INNER JOIN OSUSR_xxx_WOStatus st ON st.Id = wo.StatusId
WHERE wo.SourceAlertId = @AlertId
  AND st.IsClosed = 0;

-- Interview note: Prefer this check in Server Action CreateWorkOrderFromAlert
-- Table prefix OSUSR_xxx_ varies per environment — use Service Center table names.

-- =============================================================================
-- 7. Monthly KPI for FM supervisor dashboard
-- =============================================================================

SELECT
    FORMAT(wo.CreatedOn, 'yyyy-MM') AS Month,
    COUNT(*)                        AS Created,
    SUM(CASE WHEN st.Label = 'Completed' THEN 1 ELSE 0 END) AS Completed,
    AVG(DATEDIFF(HOUR, wo.CreatedOn, wo.CompletedOn)) AS AvgResolutionHours
FROM OSUSR_xxx_WorkOrder wo
INNER JOIN OSUSR_xxx_WOStatus st ON st.Id = wo.StatusId
WHERE wo.CreatedOn >= DATEADD(MONTH, -6, GETUTCDATE())
GROUP BY FORMAT(wo.CreatedOn, 'yyyy-MM')
ORDER BY Month;
