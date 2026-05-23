/**
 * Mock 24K API for OutSystems Personal Environment prep
 * Run: node mock-server.js
 * Endpoints:
 *   GET  http://localhost:3000/sites/:siteCode/alerts
 *   POST http://localhost:3000/alerts/:alertId/acknowledge
 *   GET  http://localhost:3000/assets/:externalId
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const dataPath = path.join(__dirname, "mock-24k-alerts.json");
let db = JSON.parse(fs.readFileSync(dataPath, "utf8"));

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify(body));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  const alertsMatch = url.pathname.match(/^\/sites\/([^/]+)\/alerts$/);
  if (req.method === "GET" && alertsMatch) {
    const siteCode = alertsMatch[1];
    const status = url.searchParams.get("status") || "OPEN";
    const severity = url.searchParams.get("severity");
    let alerts = db.alerts.filter(
      (a) => a.siteCode === siteCode && (status === "ALL" || a.status === status)
    );
    if (severity) {
      alerts = alerts.filter((a) => a.severity === severity);
    }
    return sendJson(res, 200, { alerts, totalCount: alerts.length });
  }

  const ackMatch = url.pathname.match(/^\/alerts\/([^/]+)\/acknowledge$/);
  if (req.method === "POST" && ackMatch) {
    const alertId = ackMatch[1];
    const body = await parseBody(req);
    const alert = db.alerts.find((a) => a.alertId === alertId);
    if (!alert) {
      return sendJson(res, 404, { code: "NOT_FOUND", message: "Alert not found" });
    }
    if (alert.status === "ACKNOWLEDGED") {
      return sendJson(res, 409, { code: "ALREADY_ACK", message: "Already acknowledged" });
    }
    alert.status = "ACKNOWLEDGED";
    return sendJson(res, 200, {
      alertId,
      status: "ACKNOWLEDGED",
      acknowledgedAt: new Date().toISOString(),
      workOrderRef: body.workOrderRef || null,
    });
  }

  const assetMatch = url.pathname.match(/^\/assets\/([^/]+)$/);
  if (req.method === "GET" && assetMatch) {
    const asset = db.assets.find((a) => a.externalId === assetMatch[1]);
    if (!asset) return sendJson(res, 404, { code: "NOT_FOUND" });
    return sendJson(res, 200, asset);
  }

  sendJson(res, 404, { code: "NOT_FOUND", message: "Route not found" });
});

server.listen(PORT, () => {
  console.log(`Mock 24K API → http://localhost:${PORT}`);
  console.log("Try: GET /sites/SIN-CAMPUS-01/alerts?status=OPEN");
});
