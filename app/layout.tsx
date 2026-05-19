import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { BehavioralNudge } from "@/components/BehavioralNudge";
import { EngagementTracker } from "@/components/EngagementTracker";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/data/siteConfig";

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
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <EngagementTracker />
        <Header />
        <main>{children}</main>
        <Footer />
        <BehavioralNudge />
      </body>
    </html>
  );
}
