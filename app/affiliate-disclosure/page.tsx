import { LegalPage } from "@/components/LegalPage";
import { siteConfig } from "@/data/siteConfig";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Affiliate Disclosure",
  description: "How PawPeaceGuide may earn compensation from third-party provider links.",
  path: "/affiliate-disclosure"
});

export default function AffiliateDisclosurePage() {
  return (
    <LegalPage
      eyebrow="Disclosure"
      title="Affiliate Disclosure"
      intro={siteConfig.affiliateDisclosure}
      sections={[
        {
          heading: "How compensation may work",
          body: [
            "PawPeaceGuide may earn compensation if you click a provider link and later complete a quote, application, lead form, or policy purchase on a third-party site.",
            "Compensation can vary by provider, network, contract, and conversion type. Placeholder provider data should be replaced only with approved affiliate information."
          ]
        },
        {
          heading: "Editorial framing",
          body: [
            "Our content is intended to explain pet insurance concepts in plain English. Provider cards are not personalized recommendations, policy rankings, or guarantees.",
            "Users should review coverage, pricing, exclusions, waiting periods, reimbursement rules, and availability directly with each provider."
          ]
        },
        {
          heading: "Third-party sites",
          body: [
            "When you click a provider CTA, you leave PawPeaceGuide for a third-party provider or marketplace site.",
            "PawPeaceGuide does not control third-party quote forms, policy terms, underwriting, claims decisions, pricing, or payment processing."
          ]
        }
      ]}
    />
  );
}
