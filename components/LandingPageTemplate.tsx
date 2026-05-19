import {
  Calculator,
  Cat,
  ClipboardCheck,
  Dog,
  FileText,
  HeartPulse,
  ListChecks,
  PawPrint,
  SearchCheck,
  ShieldAlert,
  Stethoscope,
  TableProperties,
  WalletCards
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { CTABlock } from "@/components/CTABlock";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FeatureCard } from "@/components/FeatureCard";
import { IntentPathRouter } from "@/components/IntentPathRouter";
import { PageEventTracker } from "@/components/PageEventTracker";
import { getPetImageForPath, petImages } from "@/components/PetImage";
import { PrimaryOfferButton } from "@/components/PrimaryOfferButton";
import { ProviderComparisonGrid } from "@/components/ProviderComparisonGrid";
import { QuoteReadinessChecklist } from "@/components/QuoteReadinessChecklist";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { UTMLink } from "@/components/UTMLink";
import { siteConfig } from "@/data/siteConfig";
import type { LandingPageVariant } from "@/lib/types";

const animalPaths = [
  {
    icon: Dog,
    label: "Dog owners",
    href: "/dog-parent-protection",
    image: petImages.dogOwner.src,
    alt: petImages.dogOwner.alt,
    note: "The default Facebook ad path for adult dogs, breed questions, and emergency-bill planning."
  },
  {
    icon: Cat,
    label: "Cat owners",
    href: "/cat-insurance",
    image: petImages.catHome.src,
    alt: petImages.catHome.alt,
    note: "For indoor, outdoor, and mixed-lifestyle cats where illness and diagnostics can drive costs."
  },
  {
    icon: Dog,
    label: "Puppies",
    href: "/puppy-insurance",
    image: petImages.puppy.src,
    alt: petImages.puppy.alt,
    note: "For new dog owners comparing early, before a long health history develops."
  },
  {
    icon: PawPrint,
    label: "Kittens",
    href: "/kitten-insurance",
    image: petImages.kitten.src,
    alt: petImages.kitten.alt,
    note: "For new cat owners weighing routine care, accident risk, and future illness protection."
  }
];

const swiftestPrepItems = [
  {
    icon: TableProperties,
    title: "Provider table context",
    body: "The Swiftest's public pet page compares multiple dog and cat insurance options. Scan each card as a starting point, then verify terms directly."
  },
  {
    icon: WalletCards,
    title: "Cost assumptions",
    body: "Monthly cost examples are only useful when you also check deductible, reimbursement amount, annual benefit, pet age, breed, and location."
  },
  {
    icon: SearchCheck,
    title: "SwiftScore context",
    body: "Treat any score or ranking as one input. Policy wording, exclusions, waiting periods, and claim rules still deserve your own review."
  }
];

export function LandingPageTemplate({ page }: { page: LandingPageVariant }) {
  const heroImage = getPetImageForPath(page.slug);
  const isPrimaryPaidPage =
    page.slug === "pet-insurance" ||
    page.slug === "pet-parent-protection" ||
    page.slug === "dog-parent-protection";

  return (
    <>
      <PageEventTracker page={`/${page.slug}`} paid />
      <section
        className="relative isolate overflow-hidden border-b border-line bg-ink"
        style={{
          backgroundImage:
            `linear-gradient(90deg, rgba(248,250,247,0.98) 0%, rgba(248,250,247,0.94) 43%, rgba(248,250,247,0.64) 66%, rgba(23,33,43,0.12) 100%), url('${heroImage.src}')`,
          backgroundPosition: "center right",
          backgroundSize: "cover"
        }}
      >
        <div className="mx-auto min-h-[520px] max-w-6xl px-5 py-8 md:flex md:items-center md:py-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">{page.eyebrow}</p>
            {isPrimaryPaidPage ? (
              <h1 className="mt-4 max-w-2xl text-5xl font-black uppercase leading-none text-ink md:text-7xl">
                Know before <span className="block text-[#4d6538]">you need it.</span>
              </h1>
            ) : null}
            {!isPrimaryPaidPage ? (
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-normal text-ink md:text-6xl">
                {page.headline}
              </h1>
            ) : null}
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{page.subheadline}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/quiz">{page.primaryCta}</Button>
              <Button href="/compare" variant="secondary">
                {page.secondaryCta}
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">{siteConfig.shortDisclosure}</p>
            <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ["60 sec", "shopping profile"],
                ["Dogs + cats", "primary pet paths"],
                ["No quote app", "education only"]
              ].map(([stat, label]) => (
                <div key={label} className="rounded-md border border-white/70 bg-white/75 px-4 py-3 shadow-tight">
                  <p className="text-lg font-semibold text-ink">{stat}</p>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-3 px-5 py-4 md:grid-cols-3">
          {[
            ["Plain-English guidance", "We break down insurance terms so the quote page makes more sense."],
            ["Compare quote options", "See features to review across provider sites."],
            ["Plan ahead", "Be ready before a surprise vet bill becomes a crisis."]
          ].map(([title, body]) => (
            <div key={title} className="flex gap-3 rounded-md bg-mist p-4">
              <Stethoscope className="mt-1 h-5 w-5 shrink-0 text-pine" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-ink">{title}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <QuoteReadinessChecklist
        pageSource={`/${page.slug}-quote-ready`}
        compact
        className="mx-auto max-w-6xl px-5 py-12"
      />

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Popular pet paths</p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">
                Start with the happy pet in your household.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted">
                The public Swiftest pet insurance comparison content focuses on dogs and cats.
                PawPeaceGuide keeps this pre-sell flow centered on dog, cat, puppy, and kitten
                shoppers until a partner confirms any additional animal categories.
              </p>
            </div>
            <div className="rounded-md border border-line bg-mist p-5">
              <p className="text-sm font-semibold text-ink">Facebook traffic angle</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Use happy, everyday pet creative that matches the landing page. Send dog creative
                into the dog-owner path and cat creative into the cat-owner path. Keep ad copy
                educational and avoid implying a viewer has a sick pet or that coverage is guaranteed.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {animalPaths.map((path) => (
              <UTMLink
                key={path.href}
                href={path.href}
                className="group overflow-hidden rounded-md border border-line bg-white shadow-tight transition hover:-translate-y-0.5 hover:border-pine/40 hover:shadow-soft"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                  <Image
                    src={path.image}
                    alt={path.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <path.icon className="h-5 w-5 text-pine" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-ink">{path.label}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted">{path.note}</p>
                </div>
              </UTMLink>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Why compare early</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">{page.compareReasonTitle}</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Pet insurance is easiest to evaluate before a stressful diagnosis or emergency invoice is in front of you.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {page.compareReasons.map((reason, index) => (
              <div key={reason} className="rounded-md border border-line bg-white p-5 shadow-tight">
                <p className="text-sm font-semibold text-clay">0{index + 1}</p>
                <p className="mt-3 text-sm leading-6 text-muted">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <IntentPathRouter
        pageSource={`/${page.slug}-intent-router`}
        className="mx-auto max-w-6xl px-5 pb-12"
      />

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
                The Swiftest handoff
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">
                Prepared visitors make better use of comparison pages
              </h2>
            </div>
            <div className="rounded-md border border-line bg-mist p-5">
              <p className="text-base leading-7 text-muted">
                The Swiftest is the intended third-party comparison destination for PawPeaceGuide.
                Their public pet insurance page organizes provider options with comparison details
                and SwiftScore context. PawPeaceGuide helps you understand the terms to scan before
                you leave this site.
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                PawPeaceGuide does not sell insurance. PawPeaceGuide is an educational,
                affiliate-supported site that links to third-party providers and comparison tools.
                Policy terms, quote availability, pricing, and provider rankings are controlled by
                the third-party destination.
              </p>
              <div className="mt-5">
                <PrimaryOfferButton pageSource={`/${page.slug}-comparison-section`}>
                  Continue to The Swiftest comparison
                </PrimaryOfferButton>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {swiftestPrepItems.map((item, index) => (
              <div key={item.title} className="rounded-md border border-line bg-white p-5 shadow-tight">
                <item.icon className="h-5 w-5 text-pine" aria-hidden="true" />
                <p className="mt-4 text-sm font-semibold text-clay">0{index + 1}</p>
                <h3 className="mt-3 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-5 md:grid-cols-2">
            <FeatureCard
              icon={HeartPulse}
              title="What dog and cat insurance may help with"
              body={page.helpWith.join(" ")}
            />
            <FeatureCard
              icon={ShieldAlert}
              title="What pet insurance usually does not cover"
              body={page.usuallyNotCovered.join(" ")}
            />
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={Calculator}
              title="Deductibles"
              body="The amount you pay before eligible reimbursement begins. Higher deductibles can change monthly premium and claim math."
            />
            <FeatureCard
              icon={ListChecks}
              title="Reimbursement and limits"
              body="Reimbursement rates and annual limits influence how much of an eligible bill may still be your responsibility."
            />
            <FeatureCard
              icon={FileText}
              title="Waiting periods and exclusions"
              body="Coverage may not apply immediately, and policy wording controls what is eligible. Review details directly with the provider."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="rounded-md border border-line bg-white p-5 shadow-soft md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">How the funnel works</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">Three calm steps before The Swiftest handoff</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              "Answer a few pet and budget questions without sharing health details",
              "See which quote-page details deserve attention",
              "Continue to the primary comparison option once the approved link is live"
            ].map((step, index) => (
              <div key={step} className="rounded-md bg-mist p-5">
                <ClipboardCheck className="h-5 w-5 text-pine" aria-hidden="true" />
                <p className="mt-4 text-sm font-semibold text-ink">Step {index + 1}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button href="/quiz">Start the 60-second pet insurance check</Button>
          </div>
        </div>
      </section>

      <section className="bg-mist py-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Provider preview</p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">The Swiftest first, backups below</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
                The primary handoff is The Swiftest comparison flow once the approved affiliate URL
                is configured. Backup direct-provider cards remain available below the main path.
              </p>
            </div>
            <PrimaryOfferButton pageSource={`/${page.slug}-provider-preview`} variant="secondary">
              Review The Swiftest path
            </PrimaryOfferButton>
          </div>
          <div className="mt-6">
            <ProviderComparisonGrid compact role="primary" emphasizePrimary pageSource={`/${page.slug}`} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-12 lg:grid-cols-[1fr_0.9fr]">
        <CTABlock
          eyebrow="Cost calculator"
          title="Preview how premium, deductible, and reimbursement can change the math."
          body="Use a simplified calculator to compare a hypothetical bill with and without insurance. It is educational only and does not predict claim approval."
          primaryHref="/calculator"
          primaryLabel="Use the cost calculator"
          secondaryHref="/compare"
          secondaryLabel="Compare quote options"
        />
        <EmailCaptureForm />
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">Questions before you compare</h2>
          <div className="mt-6">
            <FAQAccordion items={page.faq} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 pb-28 md:pb-12">
        <CTABlock
          eyebrow="Ready when you are"
          title="Start with education, then continue to the comparison path."
          body="PawPeaceGuide helps you prepare better questions before leaving for The Swiftest or another third-party quote option."
          primaryHref="/quiz"
          primaryLabel={page.primaryCta}
          secondaryHref="/compare"
          secondaryLabel="Compare quote options"
        />
      </section>
      <StickyMobileCTA href="/quiz" label="Start quiz" />
    </>
  );
}
