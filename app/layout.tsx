import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "@/app/globals.css";
import { AwinPublisherTag } from "@/components/AwinPublisherTag";
import { BehavioralNudge } from "@/components/BehavioralNudge";
import { EngagementTracker } from "@/components/EngagementTracker";
import { Footer } from "@/components/Footer";
import { GoogleAdSense } from "@/components/GoogleAdSense";
import { GoogleRouteTracker } from "@/components/GoogleRouteTracker";
import { GoogleTag } from "@/components/GoogleTag";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/data/siteConfig";
import { absoluteUrl } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.brandName} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.brandName}`
  },
  description: siteConfig.tagline,
  openGraph: {
    title: `${siteConfig.brandName} | ${siteConfig.tagline}`,
    description: siteConfig.tagline,
    url: siteConfig.siteUrl,
    siteName: siteConfig.brandName,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brandName} | ${siteConfig.tagline}`,
    description: siteConfig.tagline
  },
  icons: {
    icon: [
      {
        url: "/brand/pawpeaceguide-logo-small.png",
        type: "image/png",
        sizes: "180x180"
      }
    ],
    apple: [
      {
        url: "/brand/pawpeaceguide-logo.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  },
  other: {
    "google-adsense-account": siteConfig.googleAdSenseClientId
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    description: siteConfig.tagline,
    logo: absoluteUrl("/brand/pawpeaceguide-logo.png")
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    description: siteConfig.tagline,
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName
    }
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <GoogleAdSense />
      </head>
      <body className="font-sans antialiased">
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <EngagementTracker />
        <Header />
        <main>{children}</main>
        <Footer />
        <BehavioralNudge />
        <GoogleTag />
        <Suspense fallback={null}>
          <GoogleRouteTracker />
        </Suspense>
        <AwinPublisherTag />
        <Analytics />
      </body>
    </html>
  );
}
