"use client";

import { Button } from "@/components/Button";
import { siteConfig } from "@/data/siteConfig";
import { trackFunnelEvent } from "@/lib/tracking";

export function GuideCtaButtons({ guideSlug }: { guideSlug: string }) {
  function track(source: string) {
    trackFunnelEvent(siteConfig.eventNames.guideCtaClicked, { guideSlug, source });
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Button href="/compare" className="w-full" onClick={() => track("compare")}>
        Compare quote options
      </Button>
      <Button href="/quiz" variant="secondary" className="w-full" onClick={() => track("quiz")}>
        Take quiz
      </Button>
      <Button href="/pet-insurance" variant="secondary" className="w-full" onClick={() => track("landing")}>
        Main guide
      </Button>
    </div>
  );
}
