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
import { getPrimaryProvider } from "@/data/providers";
import { siteConfig } from "@/data/siteConfig";
import type { LandingPageVariant } from "@/lib/types";

const animalPaths = [
  {
    icon: Dog,
    label: "Dog owners",
    href: "/dog-insurance-options",
    image: petImages.dogOwner.src,
    alt: petImages.dogOwner.alt,
    note: "A calm path for age, breed, deductible, reimbursement, and quote-readiness questions."
  },
  {
    icon: Cat,
    label: "Cat owners",
    href: "/cat-insurance-options",
    image: petImages.catHome.src,
    alt: petImages.catHome.alt,
    note: "For indoor, outdoor, and mixed-lifestyle cats where policy details deserve a careful look."
  },
  {
    icon: Dog,
    label: "Puppies",
    href: "/puppy-insurance-options",
    image: petImages.puppy.src,
    alt: petImages.puppy.alt,
    note: "For new dog owners comparing early, while questions are still manageable."
  },
  {
    icon: PawPrint,
    label: "Kittens",
    href: "/kitten-insurance-options",
    image: petImages.kitten.src,
    alt: petImages.kitten.alt,
    note: "For new cat owners separating routine wellness from accident and illness coverage."
  },
  {
    icon: HeartPulse,
    label: "Senior pets",
    href: "/senior-pet-insurance",
    image: petImages.calmTrust.src,
    alt: petImages.calmTrust.alt,
    note: "For older dog and cat owners who want realistic questions around health history and eligibility."
  },
  {
    icon: PawPrint,
    label: "Other pets",
    href: "/other-pet-insurance-options",
    image: petImages.calmTrust.src,
    alt: petImages.calmTrust.alt,
    note: "For species eligibility questions without being pushed into a dog or cat path."
  },
  {
    icon: SearchCheck,
    label: "Ready to compare",
    href: "/ready-to-compare",
    image: petImages.calmTrust.src,
    alt: petImages.calmTrust.alt,
    note: "For shoppers who already understand the basics and want a final checklist before clickout."
  }
];

const providerPrepItems = [
  {
    icon: TableProperties,
    title: "Provider-page context",
    body: "Use PawPeaceGuide first to understand the terms you are likely to see on a provider or comparison page."
  },
  {
    icon: WalletCards,
    title: "Cost assumptions",
    body: "Monthly cost examples are only useful when you also check deductible, reimbursement amount, annual benefit, pet age, breed, and location."
  },
  {
    icon: SearchCheck,
    title: "Policy-detail context",
    body: "Treat provider pages as starting points. Policy wording, exclusions, waiting periods, and claim rules still deserve your own review."
  }
];

const policyTransparencyItems = [
  {
    icon: HeartPulse,
    title: "Senior pet planning",
    body:
      "Older dogs and cats may need a closer look at enrollment age, medical history, renewal rules, and how past symptoms are reviewed."
  },
  {
    icon: WalletCards,
    title: "Value-focused comparison",
    body:
      "A lower monthly premium is not the whole value story. Compare deductible, reimbursement rate, annual limit, exclusions, and waiting periods together."
  },
  {
    icon: ShieldAlert,
    title: "Pre-existing condition rules",
    body:
      "Do not assume coverage. Ask how symptoms, diagnoses, medical records, waiting periods, and curable-condition language are reviewed."
  }
];

export function LandingPageTemplate({ page, pagePath }: { page: LandingPageVariant; pagePath?: string }) {
  const primaryProvider = getPrimaryProvider();
  const routePath = pagePath ?? `/${page.slug}`;
  const pageSourceBase = routePath === "/" ? "/home" : routePath;
  const heroImage = getPetImageForPath(page.slug);
  const heroBackgroundImage = usesHeroBackground(page.slug) ? petImages.heroPets : heroImage;
  const usesKnowBeforeHero =
    page.slug === "pet-insurance" ||
    page.slug === "pet-parent-protection" ||
    page.slug === "dog-parent-protection";
  const isPaidSocialLandingPage =
    page.slug === "pet-parent-protection" ||
    page.slug === "dog-parent-protection" ||
    page.slug === "start-60-second-check" ||
    page.slug === "emergency-vet-bills" ||
    page.slug === "vet-bill-help";
  const isSearchLandingPage = page.slug === "pet-insurance";
  const isLeanLandingPage = isSearchLandingPage || isPaidSocialLandingPage;
  const secondaryHeroHref =
    page.slug === "emergency-vet-bills" || page.slug === "vet-bill-help"
      ? "/calculator"
      : isSearchLandingPage || isPaidSocialLandingPage
        ? "/ready-to-compare"
        : "/compare";
  const mobileStickyLabel = isPaidSocialLandingPage ? "Find my path" : "Start quiz";
  const primaryEducationHref = isPaidSocialLandingPage ? "/find-my-path" : "/quiz";

  return (
    <>
      <PageEventTracker page={routePath} paid />
      <section className="relative isolate overflow-hidden border-b border-line bg-[#f7f2e9]">
        <div className="absolute inset-0 hidden md:block">
          <Image
            src={heroBackgroundImage.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(248,250,247,0.98) 0%, rgba(248,250,247,0.9) 38%, rgba(248,250,247,0.24) 60%, rgba(248,250,247,0) 100%)"
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(180deg, rgba(248,250,247,0.54) 0%, rgba(248,250,247,0.14) 58%, rgba(248,250,247,0.04) 100%)"
          }}
        />
        <div className="absolute inset-x-0 bottom-0 hidden h-28 bg-gradient-to-t from-[#f7f2e9]/38 to-transparent md:block" />
        <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-5 md:flex md:min-h-[560px] md:items-center md:py-12">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay sm:text-sm">
              {page.eyebrow}
            </p>
            <h1
              className={
                usesKnowBeforeHero
                  ? "mt-3 max-w-3xl text-[2.9rem] font-black uppercase leading-[0.95] text-ink sm:text-6xl md:mt-4 md:text-7xl"
                  : "mt-4 max-w-3xl text-4xl font-semibold tracking-normal text-ink md:mt-5 md:text-6xl"
              }
            >
              {page.headline}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted md:mt-5 md:text-lg md:leading-8">
              {page.subheadline}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-7">
              <Button href={primaryEducationHref} variant={isPaidSocialLandingPage || isSearchLandingPage ? "accent" : "primary"} className="w-full sm:w-auto">
                {page.primaryCta}
              </Button>
              <Button href={secondaryHeroHref} variant="secondary" className="w-full sm:w-auto">
                {page.secondaryCta}
              </Button>
            </div>
            <p className="mt-3 text-xs leading-5 text-muted sm:text-sm">{siteConfig.shortDisclosure}</p>
            <div className="mt-4 grid max-w-2xl grid-cols-3 gap-2 md:mt-6 md:gap-3">
              {[
                ["60 sec", "shopping profile"],
                ["Dogs + cats", "primary pet paths"],
                ["No quote app", "education only"]
              ].map(([stat, label]) => (
                <div key={label} className="rounded-md border border-white/70 bg-white/80 px-3 py-2 shadow-tight md:px-4 md:py-3">
                  <p className="text-sm font-semibold text-ink md:text-lg">{stat}</p>
                  <p className="mt-0.5 text-[0.64rem] font-medium uppercase leading-4 tracking-[0.08em] text-muted md:text-xs md:tracking-[0.12em]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 overflow-hidden rounded-md border border-white/70 bg-white/70 shadow-tight md:hidden">
              <div className="relative aspect-[16/9]">
                <Image
                  src={heroBackgroundImage.src}
                  alt={heroBackgroundImage.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-2 px-4 py-3 sm:px-5 md:grid-cols-3 md:gap-3 md:py-4">
          {[
            ["Plain-English guidance", "We break down insurance terms so the quote page makes more sense."],
            ["Compare quote options", "See features to review across provider sites."],
            ["Review calmly", "Learn the key details before visiting a third-party provider page."]
          ].map(([title, body]) => (
            <div key={title} className="flex gap-3 rounded-md bg-mist p-3 md:p-4">
              <Stethoscope className="mt-1 h-5 w-5 shrink-0 text-pine" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-ink">{title}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-line bg-mist md:hidden">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">What happens next</p>
          <div className="mt-3 grid gap-2">
            {[
              "Choose your pet type and shopping goal",
              "See the policy features to compare",
              "Continue to a fitting partner path when ready"
            ].map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-md bg-white px-3 py-2 shadow-tight">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-pine text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <p className="text-sm font-medium leading-5 text-ink">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isSearchLandingPage ? (
        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-5 md:py-8">
            <div className="grid gap-4 rounded-md border border-line bg-mist p-4 shadow-tight md:grid-cols-[0.85fr_1.15fr] md:p-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
                  Pick the search path that fits
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-ink">
                  Here from Google? Start where your question already is.
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted md:text-base md:leading-7">
                  Some visitors want a quick insurance check. Some want cost math. Some are ready
                  to review Odie as the current live provider path. If you searched around senior
                  pets, value, or pre-existing condition rules, start with the lane that matches
                  your pace.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-md border border-line bg-white p-4">
                  <p className="text-sm font-semibold text-ink">I want a guided check</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Answer a few non-sensitive shopping questions and get a plain-English profile.
                  </p>
                  <div className="mt-4">
                    <Button href="/quiz" variant="accent" className="w-full">
                      Start the 60-second check
                    </Button>
                  </div>
                </div>
                <div className="rounded-md border border-pine/30 bg-white p-4 shadow-tight">
                  <p className="text-sm font-semibold text-ink">I am ready to review Odie</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    If you are planning for a dog or cat and want one live provider quote path now,
                    continue through the tracked Odie route and verify terms directly.
                  </p>
                  <ul className="mt-3 grid gap-2 text-xs leading-5 text-muted">
                    <li className="flex gap-2">
                      <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-pine" aria-hidden="true" />
                      <span>Leaves PawPeaceGuide through the disclosed affiliate handoff.</span>
                    </li>
                    <li className="flex gap-2">
                      <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-pine" aria-hidden="true" />
                      <span>Odie controls quote flow, eligibility, pricing, and policy terms.</span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <PrimaryOfferButton
                      pageSource={`${pageSourceBase}-google-search-fast-path`}
                      showDisclosure={false}
                      className="w-full"
                    >
                      Review Odie quote options
                    </PrimaryOfferButton>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-muted">
                    Affiliate-supported handoff. PawPeaceGuide is not an insurer or broker.
                  </p>
                </div>
                <div className="rounded-md border border-line bg-white p-4">
                  <p className="text-sm font-semibold text-ink">I want dog or cat specifics</p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <Button href="/dog-insurance-options" variant="secondary" className="w-full">
                      Dog options
                    </Button>
                    <Button href="/cat-insurance-options" variant="secondary" className="w-full">
                      Cat options
                    </Button>
                  </div>
                </div>
                <div className="rounded-md border border-line bg-white p-4">
                  <p className="text-sm font-semibold text-ink">I want cost context first</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Use a rough calculator before deciding whether a provider quote page makes
                    sense.
                  </p>
                  <div className="mt-4">
                    <Button href="/calculator" variant="secondary" className="w-full">
                      Use calculator
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {isSearchLandingPage ? (
        <section className="border-b border-line bg-mist">
          <div className="mx-auto max-w-6xl px-5 py-10 md:py-12">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
                  Policy transparency
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-ink">
                  The questions pet owners are bringing to search.
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  Google shoppers are not just looking for a low monthly number. They are asking
                  whether a plan makes sense for an older pet, what value means after the
                  deductible, and how pre-existing condition rules are reviewed. PawPeaceGuide
                  keeps those questions visible before any provider handoff.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Button href="/senior-pet-insurance" variant="secondary">
                    Senior pet planning
                  </Button>
                  <Button href="/guides/pre-existing-conditions-pet-insurance" variant="secondary">
                    Pre-existing rules
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {policyTransparencyItems.map((item) => (
                  <FeatureCard key={item.title} {...item} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {isPaidSocialLandingPage ? (
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-5 md:py-12">
          <div className="grid gap-5 rounded-md border border-line bg-white p-5 shadow-soft md:grid-cols-[0.9fr_1.1fr] md:p-7">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
                Education-first path
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-ink md:text-3xl">
                Start by choosing what you want to understand.
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted md:text-base md:leading-7">
                PawPeaceGuide is not an insurance application and does not collect full quote
                applications or private intake details. The goal is to help you learn the policy
                features to compare before visiting a third-party provider page.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Dog or cat path", "/find-my-path"],
                ["Cost examples", "/calculator"],
                ["Coverage terms", "/guides/what-does-pet-insurance-cover"],
                ["Ready checklist", "/ready-to-compare"]
              ].map(([label, href]) => (
                <Button key={href} href={href} variant="secondary" className="w-full">
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </section>
      ) : isSearchLandingPage ? null : (
        <QuoteReadinessChecklist
          pageSource={`${pageSourceBase}-quote-ready`}
          compact
          className="mx-auto max-w-6xl px-4 py-8 sm:px-5 md:py-12"
        />
      )}

      {!isSearchLandingPage ? (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Popular pet paths</p>
                <h2 className="mt-3 text-3xl font-semibold text-ink">
                  Start with the path that matches your pet.
                </h2>
                <p className="mt-4 text-base leading-7 text-muted">
                  PawPeaceGuide helps dog, cat, puppy, kitten, senior-pet, and other-pet shoppers
                  understand the next useful step. Live partner links appear only when they fit the
                  selected path.
                </p>
              </div>
              <div className="rounded-md border border-line bg-mist p-5">
                <p className="text-sm font-semibold text-ink">Choose a calmer lane</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Pick the path that matches your pet and pace. PawPeaceGuide keeps the explanation
                  educational, then shows a live partner route only when it fits what you are trying
                  to solve.
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
                      sizes="(min-width: 1024px) 20vw, (min-width: 768px) 50vw, 100vw"
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
      ) : null}

      {!isLeanLandingPage ? (
        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Why compare early</p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">{page.compareReasonTitle}</h2>
              <p className="mt-4 text-base leading-7 text-muted">
                Pet insurance is easiest to evaluate when you have room to learn, compare, and ask
                better questions.
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
      ) : null}

      {!isLeanLandingPage ? (
        <IntentPathRouter
          pageSource={`${pageSourceBase}-intent-router`}
          className="mx-auto max-w-6xl px-5 pb-12"
          directProviderCta={!isPaidSocialLandingPage}
        />
      ) : null}

      {!isLeanLandingPage ? (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
                  Provider handoff
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-ink">
                  Prepared visitors make better use of provider pages
                </h2>
              </div>
              <div className="rounded-md border border-line bg-mist p-5">
                <p className="text-base leading-7 text-muted">
                  {`${primaryProvider.name} is the current approved provider clickout for PawPeaceGuide. This page helps you understand the terms to scan before you leave this site for a third-party provider.`}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  PawPeaceGuide does not sell insurance. PawPeaceGuide is an educational,
                  affiliate-supported site that links to third-party providers and comparison tools.
                  Policy terms, quote availability, pricing, and claim decisions are controlled by
                  the third-party destination.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <PrimaryOfferButton pageSource={`${pageSourceBase}-comparison-section`} />
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {providerPrepItems.map((item, index) => (
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
      ) : null}

      {!isLeanLandingPage ? (
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
      ) : null}

      {!isLeanLandingPage ? (
        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="rounded-md border border-line bg-white p-5 shadow-soft md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">How the funnel works</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">Three calm steps before provider handoff</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                "Choose your pet type and shopping goal without sharing sensitive details",
                "See which quote-page details deserve attention",
                `Continue to ${primaryProvider.name} or another approved provider option when you are ready`
              ].map((step, index) => (
                <div key={step} className="rounded-md bg-mist p-5">
                  <ClipboardCheck className="h-5 w-5 text-pine" aria-hidden="true" />
                  <p className="mt-4 text-sm font-semibold text-ink">Step {index + 1}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button href={primaryEducationHref}>
                Start the 60-second pet insurance check
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      {isSearchLandingPage && !isLeanLandingPage ? (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
                  Search shopper guide
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-ink">
                  A useful landing page, not just a redirect.
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  PawPeaceGuide is built to help search visitors understand the actual comparison
                  work before leaving for a provider site. Start here if you searched for pet
                  insurance costs, quote options, coverage terms, or whether pet insurance is worth
                  comparing for your dog or cat.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  [
                    "What you can learn here",
                    "Deductibles, reimbursement rates, annual limits, waiting periods, exclusions, wellness add-ons, and how provider quote pages differ."
                  ],
                  [
                    "What happens next",
                    `When you feel ready, PawPeaceGuide can route you to ${primaryProvider.name}, the current live provider path, through a disclosed tracking page.`
                  ],
                  [
                    "What we do not claim",
                    "No provider is called best, cheapest, guaranteed, or certain to cover a future claim. Policy terms vary and must be reviewed directly."
                  ],
                  [
                    "How we make money",
                    "PawPeaceGuide may earn compensation from approved affiliate partners when visitors click through and purchase a policy."
                  ]
                ].map(([title, body]) => (
                  <div key={title} className="rounded-md border border-line bg-mist p-5">
                    <h3 className="text-base font-semibold text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-mist py-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Provider preview</p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">
                {isPaidSocialLandingPage
                  ? "Live partner paths after self-selection"
                  : isSearchLandingPage
                    ? `Ready visitors can review ${primaryProvider.name}`
                    : `${primaryProvider.name} first, comparison backups below`}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
                {isPaidSocialLandingPage
                  ? `${primaryProvider.name} is the current live affiliate-supported path when it fits a visitor's pet type and shopping goal. Start with the path finder or comparison page before leaving PawPeaceGuide.`
                  : isSearchLandingPage
                    ? `${primaryProvider.name} is the current live affiliate-supported path for dog and cat shoppers who feel ready to review quote options. If you still need context, use the quiz or calculator first.`
                    : `${primaryProvider.name} is the current live affiliate-supported path. Pending comparison and provider programs stay configurable below it, but the main CTA now prioritizes the approved offer.`}
              </p>
            </div>
            {isPaidSocialLandingPage ? (
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/find-my-path" variant="accent">
                  Find my path
                </Button>
                <Button href="/compare" variant="secondary">
                  Compare quote options
                </Button>
              </div>
            ) : (
              <PrimaryOfferButton pageSource={`${pageSourceBase}-provider-preview`} variant="secondary" />
            )}
          </div>
          {isPaidSocialLandingPage ? (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Choose intent", "Select dog, cat, puppy, kitten, senior pet, or another pet path."],
                ["Review terms", "Check deductible, reimbursement, limits, waiting periods, exclusions, and eligibility."],
                ["Continue when ready", `If ${primaryProvider.name} fits, you can continue through PawPeaceGuide's tracked provider route.`]
              ].map(([title, body]) => (
                <div key={title} className="rounded-md border border-line bg-white p-5 shadow-tight">
                  <p className="text-base font-semibold text-ink">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <ProviderComparisonGrid compact role="primary" emphasizePrimary pageSource={pageSourceBase} />
            </div>
          )}
        </div>
      </section>

      {!isLeanLandingPage ? (
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
      ) : null}

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
          body={`PawPeaceGuide helps you prepare better questions before leaving for ${primaryProvider.name} or another third-party quote option.`}
          primaryHref={primaryEducationHref}
          primaryLabel={page.primaryCta}
          secondaryHref={isLeanLandingPage ? "/ready-to-compare" : "/compare"}
          secondaryLabel="Compare quote options"
        />
      </section>
      <StickyMobileCTA href={primaryEducationHref} label={mobileStickyLabel} variant={isPaidSocialLandingPage || isSearchLandingPage ? "accent" : "primary"} />
    </>
  );
}

function usesHeroBackground(slug: string) {
  return slug === "pet-insurance" || slug === "pet-parent-protection";
}
