import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BLOCKED_KEYS = new Set([
  "email",
  "petName",
  "petType",
  "ageRange",
  "breed",
  "lifestyle",
  "existingConditions",
  "budget",
  "emergencyFund",
  "riskTolerance",
  "healthDetails",
  "quizAnswers",
  "monthlyPremium",
  "deductible",
  "reimbursementRate",
  "vetBill",
  "annualLimit",
  "financialDetails"
]);

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid engagement event." }, { status: 400 });
  }

  const safeEvent = sanitizeEvent(body);

  if (!safeEvent) {
    return NextResponse.json({ error: "Invalid engagement event." }, { status: 400 });
  }

  console.info("ppg_engagement_event", JSON.stringify(safeEvent));

  return new Response(null, {
    status: 204,
    headers: {
      "cache-control": "no-store"
    }
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type"
    }
  });
}

function sanitizeEvent(value: unknown) {
  if (!isRecord(value)) return null;

  return {
    eventId: sanitizeString(value.eventId),
    eventName: sanitizeString(value.eventName),
    timestamp: sanitizeString(value.timestamp),
    sessionId: sanitizeString(value.sessionId),
    page: sanitizeString(value.page),
    score: sanitizeNumber(value.score),
    payload: sanitizePayload(isRecord(value.payload) ? value.payload : {})
  };
}

function sanitizePayload(payload: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(payload)
      .filter(([key, value]) => !BLOCKED_KEYS.has(key) && value !== undefined && value !== null)
      .map(([key, value]) => [key, sanitizePrimitive(value)])
      .filter(([, value]) => value !== undefined)
  );
}

function sanitizePrimitive(value: unknown) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return sanitizeNumber(value);
  if (typeof value === "string") return sanitizeString(value);
  return undefined;
}

function sanitizeString(value: unknown) {
  return typeof value === "string" ? value.slice(0, 180).replace(/[<>]/g, "") : "";
}

function sanitizeNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
