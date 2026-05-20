import Script from "next/script";
import { siteConfig } from "@/data/siteConfig";

function isConfiguredPublisherId(value: string) {
  return Boolean(value && /^\d+$/.test(value));
}

export function AwinPublisherTag() {
  if (!siteConfig.awinPublisherTagEnabled || !isConfiguredPublisherId(siteConfig.awinPublisherId)) {
    return null;
  }

  return (
    <Script
      src={`https://www.dwin2.com/pub.${siteConfig.awinPublisherId}.min.js`}
      strategy="afterInteractive"
    />
  );
}
