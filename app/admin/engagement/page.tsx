import { EngagementDebugPanel } from "@/components/EngagementDebugPanel";
import { PetImagePanel, petImages } from "@/components/PetImage";
import { siteConfig } from "@/data/siteConfig";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Internal Engagement Tracking",
  description: "Internal PawPeaceGuide engagement monitoring and event QA.",
  path: "/admin/engagement",
  noIndex: true,
  noFollow: true
});

const trackedSignals = [
  "Page views and paid landing page views",
  "Scroll depth milestones",
  "Time-on-page milestones",
  "Section visibility",
  "CTA clicks and sticky mobile CTA clicks",
  "Quiz and calculator completion events",
  "Primary offer views and click intent",
  "Affiliate redirect start events",
  "Email checklist placeholder submissions"
];

const privacyGuardrails = [
  "No quiz answers are sent by default",
  "No pet health details are sent by default",
  "No email addresses are sent to tracking by default",
  "No calculator cost inputs are sent by default",
  "External links are reduced to host names before logging"
];

export default function AdminEngagementPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
      <div className="grid gap-6 rounded-md border border-clay/30 bg-[#fff4ef] p-5 lg:grid-cols-[1fr_0.72fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
            Internal monitoring
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-ink">Engagement tracking</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
            Development and launch QA page. It is not linked in public navigation. Use this page to
            verify generic funnel events locally, then use Vercel Runtime Logs in production filtered
            by <code className="rounded bg-white px-1 py-0.5">ppg_engagement_event</code>.
          </p>
        </div>
        <PetImagePanel image={petImages.dogSolo} label="Engagement monitoring view" priority unframed />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <MetricCard label="Tracking endpoint" value={siteConfig.engagementEventEndpoint} />
        <MetricCard
          label="Client tracking"
          value={siteConfig.engagementTrackingEnabled ? "Enabled" : "Disabled"}
        />
        <MetricCard label="Sample rate" value={String(siteConfig.engagementSampleRate)} />
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <InfoList title="Tracked generic signals" items={trackedSignals} />
        <InfoList title="Privacy guardrails" items={privacyGuardrails} />
      </div>

      <div className="mt-8 rounded-md border border-line bg-white p-5 shadow-tight">
        <h2 className="text-2xl font-semibold text-ink">How to use this during launch</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Open the paid landing page with campaign UTMs, move through the quiz or calculator, and
          confirm events appear here in the same browser. After deployment, open Vercel Runtime Logs
          and filter for <code className="rounded bg-mist px-1 py-0.5">ppg_engagement_event</code> to
          monitor production traffic. Look for which UTM content reaches compare, primary offer, and
          outbound redirect events before scaling spend.
        </p>
      </div>

      <div className="mt-8">
        <EngagementDebugPanel />
      </div>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-line bg-white p-5 shadow-tight">
      <p className="text-sm font-semibold text-muted">{label}</p>
      <p className="mt-2 break-words text-2xl font-semibold text-pine">{value}</p>
    </div>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-line bg-white p-5 shadow-tight">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm leading-6 text-muted">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
