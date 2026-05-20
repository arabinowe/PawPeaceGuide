import { readFileSync } from "node:fs";

const inputPath = process.argv[2];
const raw = inputPath ? readFileSync(inputPath, "utf8") : readFileSync(0, "utf8");
const rows = raw
  .split(/\n/)
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => {
    try {
      return JSON.parse(line);
    } catch {
      return null;
    }
  })
  .filter(Boolean);

const events = rows.flatMap((row) => {
  const message = row.message || "";
  const marker = "ppg_engagement_event ";
  const index = message.indexOf(marker);
  if (index === -1) return [];

  try {
    return [JSON.parse(message.slice(index + marker.length))];
  } catch {
    return [];
  }
});

const get = (event, key) => event.payload?.[key] || "";

function countsBy(items, getKey) {
  const counts = new Map();

  items.forEach((item) => {
    const key = getKey(item) || "(empty)";
    counts.set(key, (counts.get(key) || 0) + 1);
  });

  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function printTable(title, rowsToPrint, limit = 20) {
  console.log(`\n${title}`);
  if (rowsToPrint.length === 0) {
    console.log("  none");
    return;
  }
  console.table(rowsToPrint.slice(0, limit).map(([name, count]) => ({ name, count })));
}

const uniqueSessions = new Set(events.map((event) => event.sessionId)).size;
const microEvents = events.filter((event) => event.microConversion);
const partnerEvents = events.filter((event) =>
  ["primary_offer_clicked", "affiliate_cta_clicked", "outbound_redirect_started"].includes(event.eventName)
);
const paidEvents = events.filter((event) => get(event, "utm_source") || get(event, "utm_campaign"));

console.log("PawPeaceGuide engagement report");
console.log(`Log rows: ${rows.length}`);
console.log(`Engagement events: ${events.length}`);
console.log(`Unique sessions: ${uniqueSessions}`);
console.log(`Events with UTMs: ${paidEvents.length}`);
console.log(`Micro-conversions: ${microEvents.length}`);
console.log(`Partner handoff events: ${partnerEvents.length}`);

printTable("Events", countsBy(events, (event) => event.eventName));
printTable("Micro-conversions", countsBy(microEvents, (event) => event.microConversion.name));
printTable("Micro-conversion stages", countsBy(microEvents, (event) => event.microConversion.stage));
printTable("Pages", countsBy(events, (event) => event.page));
printTable("UTM source", countsBy(events, (event) => get(event, "utm_source")));
printTable("UTM campaign", countsBy(events, (event) => get(event, "utm_campaign")));
printTable("UTM content", countsBy(events, (event) => get(event, "utm_content")));
printTable("CTA labels", countsBy(events.filter((event) => event.eventName === "cta_clicked"), (event) => get(event, "ctaLabel")));

console.log("\nPartner handoffs");
if (partnerEvents.length === 0) {
  console.log("  none");
} else {
  console.table(
    partnerEvents.slice(0, 30).map((event) => ({
      timestamp: event.timestamp,
      event: event.eventName,
      page: event.page,
      provider: get(event, "providerSlug"),
      source: get(event, "utm_source"),
      campaign: get(event, "utm_campaign"),
      content: get(event, "utm_content")
    }))
  );
}

console.log("\nSession paths");
[...new Set(events.map((event) => event.sessionId))].slice(0, 20).forEach((sessionId) => {
  const sessionEvents = events
    .filter((event) => event.sessionId === sessionId)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  const pages = [...new Set(sessionEvents.map((event) => event.page))].join(" -> ");
  const important = sessionEvents
    .filter((event) =>
      [
        "paid_landing_page_view",
        "quiz_started",
        "quiz_completed",
        "calculator_started",
        "calculator_completed",
        "compare_page_viewed",
        "ready_to_compare_viewed",
        "primary_offer_clicked",
        "affiliate_cta_clicked",
        "outbound_redirect_started"
      ].includes(event.eventName)
    )
    .map((event) => event.eventName)
    .join(" | ");

  console.log(`- ${sessionId}: ${pages || "(no page data)"}`);
  if (important) console.log(`  ${important}`);
});
