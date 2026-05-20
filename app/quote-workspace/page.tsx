import { QuoteWorkspace } from "@/components/QuoteWorkspace";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/data/siteConfig";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pet Insurance Quote Comparison Workspace",
  description:
    "A no-login PawPeaceGuide workspace for comparing pet insurance quote terms, deductibles, reimbursement rates, annual limits, waiting periods, and exclusions.",
  path: "/quote-workspace"
});

export default function QuoteWorkspacePage() {
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PawPeaceGuide Quote Comparison Workspace",
    url: absoluteUrl("/quote-workspace"),
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description:
      "A no-login educational worksheet for comparing pet insurance quote terms before visiting third-party provider pages.",
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName,
      url: siteConfig.siteUrl
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <>
      <JsonLd data={webApplicationSchema} />
      <QuoteWorkspace />
    </>
  );
}
