import Script from "next/script";
import { siteConfig } from "@/data/siteConfig";

function isConfigured(value: string) {
  return Boolean(value && !value.startsWith("TODO_") && !value.includes("PLACEHOLDER"));
}

export function GoogleTagManagerHead() {
  if (!isConfigured(siteConfig.googleTagManagerId)) {
    return null;
  }

  return (
    <Script
      id="pawpeace-google-tag-manager"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${siteConfig.googleTagManagerId}');
        `
      }}
    />
  );
}

export function GoogleTagManagerNoScript() {
  if (!isConfigured(siteConfig.googleTagManagerId)) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(siteConfig.googleTagManagerId)}`}
        height="0"
        width="0"
        className="hidden"
        title="Google Tag Manager"
      />
    </noscript>
  );
}
