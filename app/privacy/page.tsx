import { LegalPage } from "@/components/LegalPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "PawPeaceGuide privacy practices for the educational pet insurance funnel.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This MVP is designed to be privacy-conscious and static-first. It does not collect full insurance applications, bind coverage, or process insurance payments."
      sections={[
        {
          heading: "Information this site may handle",
          body: [
            "The quiz stores answers only in client state during your session. PawPeaceGuide does not send quiz answers, pet health details, or email addresses to Meta Pixel by default.",
            "The email capture form is a placeholder and is not connected to a real email provider until a future integration is configured."
          ]
        },
        {
          heading: "Analytics and UTM parameters",
          body: [
            "The site includes placeholder event utilities for generic funnel events such as page views, quiz completion, calculator completion, and affiliate clickouts.",
            "UTM parameters may be stored in sessionStorage to preserve campaign context through the funnel. If enabled, UTM values may be appended to affiliate links."
          ]
        },
        {
          heading: "Third-party links",
          body: [
            "Provider quote pages and affiliate networks may collect information under their own privacy policies after you leave PawPeaceGuide.",
            "Review third-party privacy notices before submitting any quote form, application, payment, or health information."
          ]
        }
      ]}
    />
  );
}
