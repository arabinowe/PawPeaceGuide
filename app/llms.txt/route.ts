import { guides } from "@/data/guides";
import { siteConfig } from "@/data/siteConfig";
import { absoluteUrl } from "@/lib/seo";

export function GET() {
  const guideLines = guides
    .map((guide) => `- ${guide.title}: ${absoluteUrl(`/guides/${guide.slug}`)} — ${guide.summary}`)
    .join("\n");

  const body = `# PawPeaceGuide

PawPeaceGuide is an educational, affiliate-supported pet insurance guidance website.

Canonical site: ${siteConfig.siteUrl}
Positioning: Pet insurance explained before the stressful vet bill moment.
Important compliance: PawPeaceGuide does not sell, solicit, bind, underwrite, negotiate, or directly recommend insurance. Policy terms vary. Users should review details directly with providers.

Core public routes:
- Guides index: ${absoluteUrl("/guides")}
- Glossary: ${absoluteUrl("/glossary")}
- 60-second check: ${absoluteUrl("/quiz")}
- Vet bill calculator: ${absoluteUrl("/calculator")}
- Compare quote options: ${absoluteUrl("/compare")}

Published guides:
${guideLines}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600"
    }
  });
}
