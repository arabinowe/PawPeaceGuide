import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import { getLandingPage } from "@/data/landingPages";
import { createMetadata } from "@/lib/seo";

const page = getLandingPage("cat-insurance")!;

export const metadata = createMetadata({
  title: page.title,
  description: page.description,
  path: "/cat-insurance"
});

export default function CatInsurancePage() {
  return <LandingPageTemplate page={page} />;
}
