"use client";

import { Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { trackFunnelEvent } from "@/lib/tracking";

export function EmailCaptureForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="checklist-email">
            Email address
          </label>
          <input
            id="checklist-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="min-h-11 flex-1 rounded-md border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-pine focus:ring-2 focus:ring-sky"
          />
          <button
            type="submit"
            className="min-h-11 rounded-md bg-pine px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1b433c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine"
          >
            Reserve checklist
          </button>
        </form>
      )}
      <p className="mt-3 text-xs leading-5 text-muted">
        We will not connect this form to an email provider until an actual integration and consent flow are configured.
      </p>
    </div>
  );
}
