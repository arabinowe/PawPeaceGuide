import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import { getLandingPage } from "@/data/landingPages";
import { createMetadata } from "@/lib/seo";

const page = getLandingPage("kitten-insurance")!;

export const metadata = createMetadata({
  title: page.title,
  description: page.description,
  path: "/kitten-insurance"
});

export default function KittenInsurancePage() {
  return <LandingPageTemplate page={page} />;
}
