import { LegalPage } from "@/components/LegalPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms of Use",
  description: "Terms for using PawPeaceGuide educational content and affiliate-supported resources.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of Use"
      intro="By using PawPeaceGuide, you agree that the site provides general educational information and links to third-party provider resources."
      sections={[
        {
          heading: "Educational use only",
          body: [
            "PawPeaceGuide is not an insurer, insurance agency, broker, producer, underwriter, financial advisor, or legal advisor.",
            "Nothing on this site is a quote, offer to sell insurance, recommendation to buy a specific policy, or promise that a claim will be covered."
          ]
        },
        {
          heading: "No applications or transactions",
          body: [
            "PawPeaceGuide does not collect full insurance applications, bind coverage, quote exact premiums, underwrite policies, process insurance payments, or adjudicate claims.",
            "Any insurance quote, application, purchase, payment, or policy servicing happens directly on third-party provider sites."
          ]
        },
        {
          heading: "Your responsibility",
          body: [
            "You are responsible for reviewing provider policy terms, exclusions, waiting periods, reimbursement rules, pricing, and availability before making a purchase decision.",
            "Consult qualified insurance, financial, legal, or veterinary professionals when you need advice specific to your situation."
          ]
        }
      ]}
    />
  );
}
