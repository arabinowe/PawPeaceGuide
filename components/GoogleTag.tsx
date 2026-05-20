import Script from "next/script";
import { siteConfig } from "@/data/siteConfig";

function isConfigured(value: string) {
  return Boolean(value && !value.startsWith("TODO_") && !value.includes("PLACEHOLDER"));
}

function jsString(value: string) {
  return JSON.stringify(value);
}

export function GoogleTag() {
  const ids = [siteConfig.googleAnalyticsId, siteConfig.googleAdsId].filter(isConfigured);
  const primaryId = ids[0];

  if (!primaryId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primaryId)}`}
        strategy="afterInteractive"
      />
      <Script
        id="pawpeace-google-tag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());
            ${ids.map((id) => `gtag('config', ${jsString(id)}, { anonymize_ip: true });`).join("\n")}
          `
        }}
      />
    </>
  );
}
