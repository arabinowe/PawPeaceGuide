import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import { getLandingPage } from "@/data/landingPages";
import { createMetadata } from "@/lib/seo";

const page = getLandingPage("emergency-vet-bills")!;

export const metadata = createMetadata({
  title: page.title,
  description: page.description,
  path: "/emergency-vet-bills"
});

export default function EmergencyVetBillsPage() {
  return <LandingPageTemplate page={page} />;
}
