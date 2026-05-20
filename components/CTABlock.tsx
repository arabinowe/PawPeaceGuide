import { Button } from "@/components/Button";

type CTABlockProps = {
  eyebrow?: string;
  title: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  disclosure?: boolean;
};

export function CTABlock({
  eyebrow,
  title,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  disclosure = false
}: CTABlockProps) {
  return (
    <section className="rounded-md border border-line bg-white p-5 shadow-tight md:p-7">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-2xl font-semibold text-ink md:text-3xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{body}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button href={primaryHref}>{primaryLabel}</Button>
        {secondaryHref && secondaryLabel ? (
          <Button href={secondaryHref} variant="secondary">
            {secondaryLabel}
          </Button>
        ) : null}
      </div>
      {disclosure ? (
        <p className="mt-4 text-xs leading-5 text-muted">
          Affiliate-supported resource. PawPeaceGuide is educational and is not an insurer or broker.
        </p>
      ) : null}
    </section>
  );
}
