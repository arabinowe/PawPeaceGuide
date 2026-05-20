import { getGuideCategorySlug, guideCategories, guides } from "@/data/guides";
import { siteConfig } from "@/data/siteConfig";
import { absoluteUrl } from "@/lib/seo";

export function GET() {
  const guideLines = guides
    .map((guide) => `- ${guide.title}: ${absoluteUrl(`/guides/${guide.slug}`)} — ${guide.summary}`)
    .join("\n");
  const categoryLines = guideCategories
    .map((category) => `- ${category}: ${absoluteUrl(`/guides/category/${getGuideCategorySlug(category)}`)}`)
    .join("\n");

  const body = `# PawPeaceGuide

PawPeaceGuide is an educational, affiliate-supported pet insurance guidance website.

Canonical site: ${siteConfig.siteUrl}
Positioning: Plain-English pet coverage and pet care decisions before choices feel rushed.
Important compliance: PawPeaceGuide does not sell, solicit, bind, underwrite, negotiate, or directly recommend insurance. Policy terms vary. Users should review details directly with providers.

Core public routes:
- Guides index: ${absoluteUrl("/guides")}
- Glossary: ${absoluteUrl("/glossary")}
- 60-second check: ${absoluteUrl("/quiz")}
- Vet bill calculator: ${absoluteUrl("/calculator")}
- Quote comparison workspace: ${absoluteUrl("/quote-workspace")}
- Compare quote options: ${absoluteUrl("/compare")}
- Find my path: ${absoluteUrl("/find-my-path")}
- Dog insurance options: ${absoluteUrl("/dog-insurance-options")}
- Cat insurance options: ${absoluteUrl("/cat-insurance-options")}
- Puppy insurance options: ${absoluteUrl("/puppy-insurance-options")}
- Kitten insurance options: ${absoluteUrl("/kitten-insurance-options")}
- Senior pet insurance: ${absoluteUrl("/senior-pet-insurance")}
- Pet wellness extras: ${absoluteUrl("/pet-wellness-extras")}
- Other pet insurance options: ${absoluteUrl("/other-pet-insurance-options")}

Published guides:
${guideLines}

Guide topic hubs:
${categoryLines}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600"
    }
  });
}
