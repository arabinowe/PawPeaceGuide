import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import { getLandingPage } from "@/data/landingPages";
import { createMetadata } from "@/lib/seo";

const page = getLandingPage("pet-insurance")!;

export const metadata = createMetadata({
  title: page.title,
  description: page.description,
  path: "/"
});

export default function HomePage() {
  return <LandingPageTemplate page={page} pagePath="/" />;
}
