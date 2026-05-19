import { LegalPage } from "@/components/LegalPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Disclaimer",
  description: "Important disclaimer for PawPeaceGuide educational pet insurance content.",
  path: "/disclaimer"
});

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Disclaimer"
      title="Disclaimer"
      intro="PawPeaceGuide provides general educational information only."
      sections={[
        {
          heading: "No licensed insurance role",
          body: [
            "PawPeaceGuide is not an insurer, insurance agency, broker, producer, underwriter, financial advisor, or legal advisor.",
            "PawPeaceGuide does not sell insurance, recommend a specific policy, bind coverage, quote exact premiums, underwrite risk, process insurance payments, or decide claims."
          ]
        },
        {
          heading: "Affiliate-supported resource",
          body: [
            "PawPeaceGuide may earn compensation from affiliate links if users visit provider sites and purchase policies or complete qualifying actions.",
            "Affiliate compensation does not guarantee that any provider is right for a specific pet owner or situation."
          ]
        },
        {
          heading: "Policy terms vary",
          body: [
            "Users should review policy terms directly with providers. Coverage, pricing, exclusions, waiting periods, reimbursement, approval, and availability may vary.",
            "Nothing on the site guarantees coverage, pricing, approval, reimbursement, claim payment, savings, or provider acceptance."
          ]
        }
      ]}
    />
  );
}
