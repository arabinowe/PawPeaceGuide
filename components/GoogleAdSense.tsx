import { siteConfig } from "@/data/siteConfig";

function isConfiguredAdSenseClient(value: string) {
  return Boolean(value && value.startsWith("ca-pub-") && !value.includes("TODO"));
}

export function GoogleAdSense() {
  if (!siteConfig.googleAdSenseEnabled || !isConfiguredAdSenseClient(siteConfig.googleAdSenseClientId)) {
    return null;
  }

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.googleAdSenseClientId}`}
      crossOrigin="anonymous"
    />
  );
}
