"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { trackFunnelEvent } from "@/lib/tracking";

export function EmailCaptureForm() {
  const [submitted, setSubmitted] = useState(false);

  function onReserve() {
    setSubmitted(true);
    trackFunnelEvent(siteConfig.eventNames.emailCaptureSubmitted, { source: "checklist" });
    // TODO ConvertKit: connect checklist form endpoint.
    // TODO Beehiiv: connect publication subscribe endpoint.
    // TODO Mailchimp: connect audience form endpoint.
    // TODO Resend: add double-opt-in transactional workflow if chosen.
  }

  return (
    <div className="rounded-md border border-line bg-white p-5 shadow-tight">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-sky text-pine">
          <Mail className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-ink">Want a checklist before you compare plans?</h3>
          <p className="mt-1 text-sm leading-6 text-muted">
            Get the PawPeaceGuide pet insurance comparison checklist.
          </p>
        </div>
      </div>
      {submitted ? (
        <p className="mt-4 rounded-md border border-sage/45 bg-mist px-4 py-3 text-sm font-medium text-pine">
          Checklist reserved. Email integration will be connected soon.
        </p>
      ) : (
        <button
          type="button"
          onClick={onReserve}
          className="mt-4 min-h-11 w-full rounded-md bg-pine px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1b433c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine sm:w-auto"
        >
          Reserve checklist
        </button>
      )}
      <p className="mt-3 text-xs leading-5 text-muted">
        We are not collecting email addresses yet. A real checklist delivery and consent flow can be connected later.
      </p>
    </div>
  );
}
