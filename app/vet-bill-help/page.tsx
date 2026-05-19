import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import { getLandingPage } from "@/data/landingPages";
import { createMetadata } from "@/lib/seo";

const page = getLandingPage("vet-bill-help")!;

export const metadata = createMetadata({
  title: page.title,
  description: page.description,
  path: "/vet-bill-help"
});

export default function VetBillHelpPage() {
  return <LandingPageTemplate page={page} />;
}
