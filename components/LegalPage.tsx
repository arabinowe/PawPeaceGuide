import { PetImagePanel, getPetImageForPath } from "@/components/PetImage";
import { siteConfig } from "@/data/siteConfig";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{ heading: string; body: string[] }>;
};

export function LegalPage({ eyebrow, title, intro, sections }: LegalPageProps) {
  const image = getPetImageForPath(title.toLowerCase());

  return (
    <section className="mx-auto max-w-5xl px-5 py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-semibold text-ink md:text-5xl">{title}</h1>
          <p className="mt-4 text-lg leading-8 text-muted">{intro}</p>
        </div>
        <PetImagePanel image={image} label="Calm pet-owner trust center" priority />
      </div>
      <div className="mt-8 space-y-8 rounded-md border border-line bg-white p-5 shadow-soft md:p-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-semibold text-ink">{section.heading}</h2>
            <div className="mt-3 space-y-3">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="mt-8 rounded-md border border-line bg-mist px-4 py-3 text-sm leading-6 text-muted">
        {siteConfig.legalDisclaimer}
      </p>
    </section>
  );
}
