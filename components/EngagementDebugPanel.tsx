"use client";

import { RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { FunnelEventName } from "@/lib/types";
import { getEngagementSnapshot, type StoredEngagementEvent } from "@/lib/tracking";

type Snapshot = {
  sessionId: string;
  score: number;
  events: StoredEngagementEvent[];
};

export function EngagementDebugPanel() {
  const [snapshot, setSnapshot] = useState<Snapshot>({
    sessionId: "",
    score: 0,
    events: []
  });

  function refresh() {
    setSnapshot(getEngagementSnapshot());
  }

  useEffect(() => {
    refresh();

    function onEvent() {
      refresh();
    }

    window.addEventListener("pawpeaceguide:event", onEvent);
    window.addEventListener("pawpeaceguide:engagement-score", onEvent);

    const interval = window.setInterval(refresh, 2000);

    return () => {
      window.removeEventListener("pawpeaceguide:event", onEvent);
      window.removeEventListener("pawpeaceguide:engagement-score", onEvent);
      window.clearInterval(interval);
    };
  }, []);

  const counts = useMemo(() => countEvents(snapshot.events), [snapshot.events]);
  const microConversions = useMemo(() => countMicroConversions(snapshot.events), [snapshot.events]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-md border border-line bg-white p-5 shadow-tight">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-muted">Current session score</p>
            <p className="mt-2 text-4xl font-semibold text-pine">{snapshot.score}</p>
          </div>
          <button
            type="button"
            onClick={refresh}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-semibold text-pine transition hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Refresh
          </button>
        </div>
        <p className="mt-4 break-all text-xs leading-5 text-muted">
          Session: {snapshot.sessionId || "No client session yet"}
        </p>
        <div className="mt-5 grid gap-3">
          {microConversions.length > 0 ? (
            <div className="rounded-md border border-pine/15 bg-sky/35 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clay">
                Micro-conversions
              </p>
              <div className="mt-3 grid gap-2">
                {microConversions.slice(0, 6).map(([name, count]) => (
                  <div key={name} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">{name}</span>
                    <span className="font-semibold text-pine">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {counts.slice(0, 8).map(([name, count]) => (
            <div key={name} className="flex items-center justify-between rounded-md bg-mist px-3 py-2 text-sm">
              <span className="font-medium text-ink">{name}</span>
              <span className="font-semibold text-pine">{count}</span>
            </div>
          ))}
          {counts.length === 0 ? (
            <p className="rounded-md bg-mist px-3 py-2 text-sm text-muted">
              Interact with the site in this browser session to populate the live panel.
            </p>
          ) : null}
        </div>
      </div>

      <div className="rounded-md border border-line bg-white shadow-tight">
        <div className="border-b border-line p-5">
          <h2 className="text-2xl font-semibold text-ink">Recent client events</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            This reads the current browser session. Production-wide monitoring comes from Vercel
            Runtime Logs filtered by <code className="rounded bg-mist px-1 py-0.5">ppg_engagement_event</code>.
          </p>
        </div>
        <div className="max-h-[520px] overflow-auto">
          {snapshot.events.length > 0 ? (
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="sticky top-0 bg-mist text-ink">
                <tr>
                  <th className="px-4 py-3 font-semibold">Time</th>
                  <th className="px-4 py-3 font-semibold">Event</th>
                  <th className="px-4 py-3 font-semibold">Page</th>
                  <th className="px-4 py-3 font-semibold">Micro</th>
                  <th className="px-4 py-3 font-semibold">Signal</th>
                  <th className="px-4 py-3 font-semibold">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {snapshot.events.map((event) => (
                  <tr key={event.eventId}>
                    <td className="px-4 py-3 text-muted">{formatTime(event.timestamp)}</td>
                    <td className="px-4 py-3 font-medium text-ink">{event.eventName}</td>
                    <td className="px-4 py-3 text-muted">{event.payload.page || event.page}</td>
                    <td className="px-4 py-3 text-muted">{event.microConversion?.name || "-"}</td>
                    <td className="px-4 py-3 text-muted">
                      {event.payload.section ||
                        event.payload.ctaLabel ||
                        event.payload.providerSlug ||
                        event.payload.scrollDepth ||
                        event.payload.seconds ||
                        "-"}
                    </td>
                    <td className="px-4 py-3 text-pine">{event.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-5 text-sm text-muted">No recent events stored in this session.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function countEvents(events: StoredEngagementEvent[]) {
  const counts = new Map<FunnelEventName, number>();

  events.forEach((event) => {
    counts.set(event.eventName, (counts.get(event.eventName) || 0) + 1);
  });

  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
}

function countMicroConversions(events: StoredEngagementEvent[]) {
  const counts = new Map<string, number>();

  events.forEach((event) => {
    if (!event.microConversion) return;
    counts.set(event.microConversion.name, (counts.get(event.microConversion.name) || 0) + 1);
  });

  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
}

function formatTime(timestamp: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date(timestamp));
  } catch {
    return timestamp;
  }
}
