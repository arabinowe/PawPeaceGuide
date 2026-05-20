# PawPeaceGuide

https://www.pawpeaceguide.com

PawPeaceGuide is a static-first Next.js affiliate funnel for pet insurance education. It is built for Google Search traffic, organic SEO, plain-English pre-sell content, a 60-second quiz, a vet bill calculator, provider comparison cards, and tracked third-party affiliate clickouts. Conservative Facebook/Instagram landing pages still exist, but Google Search is the preferred paid test channel while Meta treats pet insurance as a financial-products category.

PawPeaceGuide does not sell insurance, bind coverage, collect full insurance applications, quote exact premiums, process insurance payments, or act as an insurer, agency, broker, producer, underwriter, financial advisor, or legal advisor.

## How The Funnel Works

Google Search, organic, or social traffic lands on a focused education page. Users read original plain-English context, start the quiz or calculator, compare provider quote options, and then click through `/go/[providerSlug]` to a third-party provider or marketplace once the approved affiliate link is configured.

Preferred Google Search path:

```text
Google Search ad -> /pet-insurance, /dog-insurance, or /cat-insurance -> quiz, calculator, compare, or provider education -> /go/odie when it fits
```

Conservative Meta review path:

```text
Facebook ad -> /pet-parent-protection or /dog-parent-protection -> /find-my-path -> relevant education, quiz, calculator, or current live provider path -> /go/odie when it fits
```

Main paths:

- `/pet-insurance` for the primary Google Search and homepage landing page
- `/pet-parent-protection` for broad happy dog/cat/puppy/kitten Facebook creative
- `/dog-parent-protection` for the dog-owner paid ad variant referenced in the launch checklist
- `/emergency-vet-bills` for organic or retargeting education after Meta compliance is stable
- `/start-60-second-check` for creative focused on starting the 60-second check
- `/dog-insurance`, `/cat-insurance`, `/puppy-insurance`, `/kitten-insurance`, `/vet-bill-help`
- `/quiz`
- `/calculator`
- `/compare`
- `/go/[providerSlug]`

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful checks:

```bash
npm run lint
npm run build
```

## Deploy To Vercel

1. Push this project to GitHub.
2. In Vercel, create a new project from the GitHub repository.
3. Use the default Next.js framework preset.
4. Add environment variables from `.env.example`.
5. Deploy.

Vercel should auto-deploy preview URLs for pull requests and production when changes merge to `main`.

## Publishing Workflow

1. Push changes to a feature branch.
2. Open a pull request.
3. Vercel generates a preview deployment.
4. Test the quiz, calculator, compare page, and affiliate redirects.
5. Merge to main.
6. Vercel deploys production automatically.
7. Run ads only against the production URL.

GitHub Actions also runs on pull requests and pushes to `main`:

- `npm ci`
- `npm run lint --if-present`
- `npm run build`

Lint is configured with the standard Next.js ESLint setup.

## Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=
NEXT_PUBLIC_APPEND_UTM_TO_AFFILIATE_LINKS=true
NEXT_PUBLIC_PRIMARY_AFFILIATE_URL=
NEXT_PUBLIC_ODIE_AFFILIATE_URL=
NEXT_PUBLIC_SWIFTEST_AFFILIATE_URL=
NEXT_PUBLIC_ENGAGEMENT_TRACKING_ENABLED=true
NEXT_PUBLIC_ENGAGEMENT_EVENT_ENDPOINT=/api/engagement
NEXT_PUBLIC_ENGAGEMENT_SAMPLE_RATE=1
CANONICAL_HOST_REDIRECT_ENABLED=false
CANONICAL_REDIRECT_HOSTS=pawpeaceguide.vercel.app,www.pawpeaceguide.com
```

Do not commit real affiliate links, private API keys, partner tokens, or private tracking credentials.

Public analytics and engagement values are read in `data/siteConfig.ts`. The Google tag loads only when `NEXT_PUBLIC_GA_ID` or `NEXT_PUBLIC_GOOGLE_ADS_ID` is configured. Google Ads conversion tracking fires on `affiliate_cta_clicked` when both `NEXT_PUBLIC_GOOGLE_ADS_ID` and `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` are set. Meta Pixel remains a TODO integration and should only receive generic, privacy-reviewed events if added later.

## Public Launch Milestone

Use `/pet-parent-protection` for broad dog/cat Facebook traffic and `/dog-parent-protection` for dog-specific creative. The paid landing pages route first to `/find-my-path` so Meta review sees an educational path selector rather than an insurance application or personal-data intake:

```text
https://your-production-domain.com/pet-parent-protection?utm_source=facebook&utm_medium=paid_social&utm_campaign=pet_parent_test_1&utm_content=education_options
https://your-production-domain.com/dog-parent-protection?utm_source=instagram&utm_medium=paid_social&utm_campaign=dog_parent_test_1&utm_content=dog_education_options
```

Run locally with `npm install` and `npm run dev`. Build and QA with `npm run lint` and `npm run build`.

Deploy to Vercel by connecting the GitHub repo, using the default Next.js preset, and setting the required environment variables from `.env.example`. Set `NEXT_PUBLIC_SITE_URL` to the production origin, for example `https://pawpeaceguide.com`, so canonical URLs, robots, sitemap, and Open Graph metadata use the production domain.

After `pawpeaceguide.com` is registered, assigned to the Vercel project, and resolving correctly, set `CANONICAL_HOST_REDIRECT_ENABLED=true` and keep `CANONICAL_REDIRECT_HOSTS=pawpeaceguide.vercel.app,www.pawpeaceguide.com`. That makes the Vercel app URL and `www` host redirect to the trusted apex domain without turning it on before DNS is ready.

Odie is the current primary approved affiliate offer. Its Awin tracking URL is configured in `data/siteConfig.ts` so production can earn revenue immediately; you can override it with `NEXT_PUBLIC_PRIMARY_AFFILIATE_URL` or `NEXT_PUBLIC_ODIE_AFFILIATE_URL`. Add The Swiftest affiliate link to `NEXT_PUBLIC_SWIFTEST_AFFILIATE_URL` after approval. Other backup affiliate links live in `data/siteConfig.ts` or can be edited directly in `data/providers.ts`. Affiliate tracking links are usually public click-tracking URLs, but do not commit private API keys, dashboard credentials, or partner tokens.

Test `/go/odie` after deployment. It should show the PawPeaceGuide leaving-site page, then redirect through the Awin tracking URL and preserve UTMs when `NEXT_PUBLIC_APPEND_UTM_TO_AFFILIATE_LINKS=true`. Test `/go/the-swiftest` separately after approval; until then it should show: "This partner link has not been configured yet."

Do not add direct public links to `https://theswiftest.com` anywhere in the app. All consumer paths to The Swiftest must go through `/go/the-swiftest`, which redirects only to the approved affiliate tracking URL. `npm run audit:outbound` checks this rule and CI runs the audit before build.

Connect Google Analytics by setting `NEXT_PUBLIC_GA_ID`. Connect Google Ads conversion tracking by setting `NEXT_PUBLIC_GOOGLE_ADS_ID` and `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`; the conversion fires when a visitor clicks an affiliate CTA such as `/go/odie`. Connect Meta Pixel only after a separate privacy and policy review. The app also captures privacy-safe engagement events through `/api/engagement`, stores the current browser session locally, and writes generic production events to Vercel Runtime Logs.

## Google Search Ads Setup

Use Google Search as the preferred small-budget paid test channel. Search traffic has explicit keyword intent and can land on pages with substantial original content rather than a pure bridge page.

Recommended starting URL:

```text
https://pawpeaceguide.com/pet-insurance?utm_source=google&utm_medium=paid_search&utm_campaign=pet_insurance_search_test&utm_content=general
```

Dog-specific:

```text
https://pawpeaceguide.com/dog-insurance?utm_source=google&utm_medium=paid_search&utm_campaign=dog_insurance_search_test&utm_content=dog
```

Cat-specific:

```text
https://pawpeaceguide.com/cat-insurance?utm_source=google&utm_medium=paid_search&utm_campaign=cat_insurance_search_test&utm_content=cat
```

Google Ads posture:

- Do not send paid ads directly to `/go/[providerSlug]`.
- Keep original educational content visible before affiliate CTAs.
- Keep affiliate disclosure near monetized CTAs.
- Use exact and phrase match first.
- Avoid provider brand bidding unless affiliate terms explicitly allow it.
- Do not claim PawPeaceGuide sells insurance, recommends a policy, guarantees coverage, guarantees approval, or guarantees savings.
- Keep pending partner cards clearly labeled as pending or educational.

More detail lives in `launch/google-ads.md`.

## Facebook And Instagram Ad Funnel Setup

Recommended broad starting URL:

```text
https://your-production-domain.com/pet-parent-protection
```

Recommended dog-specific starting URL:

```text
https://your-production-domain.com/dog-parent-protection
```

Example UTM URL:

```text
https://your-production-domain.com/pet-parent-protection?utm_source=facebook&utm_medium=paid_social&utm_campaign=education_test_1&utm_content=pet_options_01
```

Recommended creative-to-URL map:

- Broad education creative: `/pet-parent-protection`
- Dog-specific education creative: `/dog-parent-protection`
- "Start the 60-second pet insurance check" creative: `/start-60-second-check`
- Avoid using emergency, crisis, sick-pet, or pressure-heavy creative for the initial Meta review retry.

Use matching `utm_content` values so performance can be read by creative:

```text
utm_content=pet_options_square
utm_content=dog_options_wide
utm_content=start_60_second_check_wide
```

Where to configure things:

- Brand name, tagline, disclosures, analytics placeholders, UTM behavior: `data/siteConfig.ts`
- Meta Pixel ID: `NEXT_PUBLIC_META_PIXEL_ID`
- Google Analytics ID: `NEXT_PUBLIC_GA_ID`
- Affiliate links and provider details: `data/providers.ts`
- Landing page copy: `data/landingPages.ts`
- Funnel event names and placeholders: `lib/tracking.ts`
- UTM handling: `lib/utm.ts`

Before running ads, confirm partner paid-ad rules, avoid restricted provider brand terms unless explicitly allowed, and review Meta ad policies plus insurance compliance requirements before scaling.

## Paid Animal Creative Notes

- Use real, happy-looking pets in ordinary home or outdoor settings.
- Keep broad creative to dogs, cats, puppies, and kittens unless the affiliate partner confirms other animal categories.
- Match creative to the landing page: dog creative to `/dog-parent-protection`, cat creative to `/cat-insurance`, broad pet creative to `/pet-parent-protection`.
- Avoid sick-pet imagery, graphic vet scenes, fearmongering, fake urgency, fake reviews, fake star ratings, or claims that coverage is guaranteed.
- Keep the ad promise simple: plain-English education first, then compare quote options through a third-party comparison path.

## Mobile Conversion Notes

Most paid social visitors should be assumed to arrive on mobile. The ad landing pages are structured so the first thumb-scroll includes the ad-matched headline, full-width primary CTA, disclosure, trust chips, relevant happy-pet image, and a short "what happens next" strip before longer educational content.

Mobile QA priorities:

- CTA is visible without hunting.
- Sticky mobile CTA says `Find my path` on paid pages.
- Pet image appears in the first scroll without pushing the CTA below the fold.
- Quiz and calculator inputs use mobile-friendly text sizing to reduce iOS zoom.
- Users can still reach the deeper desktop-style education sections by scrolling.
- No public page links directly to The Swiftest; any future Swiftest outbound handoff must remain `/go/the-swiftest`.

## Organic Guided Blog Funnel

The organic funnel is separate from the Facebook ad funnel. Use `/blog` and `/blog/pet-insurance-comparison-checklist` for search, community sharing, newsletter mentions, and backlink outreach.

Recommended organic path:

```text
Organic visitor -> /blog/pet-insurance-comparison-checklist -> quiz or calculator -> /ready-to-compare -> /go/odie
```

The checklist article is designed as a linkable asset: it explains deductible, reimbursement, annual limit, waiting period, exclusion, pre-existing condition, and wellness add-on concepts without claiming PawPeaceGuide sells or recommends insurance.

Backlink outreach ideas:

- Pet adoption groups that maintain new-owner resource pages
- Local veterinary clinic blog/resource pages, only where affiliate disclosure is acceptable
- Dog trainer and cat behaviorist resource pages
- Breed club or rescue newsletters
- Personal finance blogs covering emergency funds and pet ownership
- Apartment living, new puppy, and new kitten checklists

Every public page family uses real, happy pet imagery. Keep future images calm, bright, and relevant to the page route. Avoid clinical, distressed, graphic, or fear-based imagery.

## SEO System Overview

PawPeaceGuide's SEO thesis is: pet insurance explained before the stressful vet bill moment.

The organic system is static-first:

- `/guides` is the main education library.
- `/guides/[slug]` renders published guide records from `data/guides.ts`.
- `/glossary` explains pet insurance terms with linkable anchors.
- `/sitemap.xml` lists indexable public routes and published guide pages.
- `/robots.txt` disallows `/admin/`, `/go/`, and `/api/`.
- `/llms.txt` gives AI crawlers and answer engines a concise description of the site, core routes, compliance boundaries, and guide URLs.

The SEO funnel should educate first, then offer natural links to `/quiz`, `/calculator`, and `/compare`. It should never auto-redirect organic visitors to affiliate partners.

## How to Add a New Guide

1. Add a new record to `data/guides.ts`.
2. Include `slug`, `title`, `metaTitle`, `metaDescription`, `category`, `summary`, `shortAnswer`, `keyTakeaways`, `sections`, `exampleScenario`, `whatToCompare`, `commonMistakes`, `faqs`, `relatedGuideSlugs`, `datePublished`, `dateModified`, and `readingTimeMinutes`.
3. Keep the article useful enough to publish. Do not add empty or thin placeholder guide pages.
4. Add 2-4 related guide slugs that already exist.
5. Run `npm run build` to confirm the dynamic `/guides/[slug]` route, Article schema, FAQ schema, and sitemap generation work.

## How to Edit Guide Metadata

Guide metadata is controlled in `data/guides.ts`:

- `metaTitle` becomes the page title.
- `metaDescription` becomes the search description and Open Graph description.
- `dateModified` updates Article schema and sitemap `lastModified`.
- `category` controls the `/guides` index grouping.

Canonical URLs come from `NEXT_PUBLIC_SITE_URL` through `lib/seo.ts`. Keep production set to `https://pawpeaceguide.com` so canonical and Open Graph URLs do not point to Vercel preview domains.

## How Internal Links Work

Each guide page automatically includes:

- A link back to `/guides`.
- Table of contents anchors.
- Links to related guides from `relatedGuideSlugs`.
- CTA links to `/quiz`, `/calculator`, and `/compare`.
- Affiliate disclosure near monetized CTAs.
- Bottom legal disclaimer.

SEO click tracking events stay generic: `guide_page_viewed`, `related_guide_clicked`, `seo_compare_cta_clicked`, and `seo_quiz_cta_clicked`.

## Sitemap and Robots Setup

`app/sitemap.ts` includes:

- `/`
- `/pet-insurance`
- `/dog-parent-protection`
- `/quiz`
- `/calculator`
- `/compare`
- `/guides`
- `/glossary`
- published guide pages
- legal pages

`app/sitemap.ts` excludes `/go/[providerSlug]`, `/admin/*`, `/api/*`, and unbuilt placeholder topics.

`app/robots.ts` allows public pages and disallows:

- `/admin/`
- `/go/`
- `/api/`

Noindex metadata is also applied to `/go/[providerSlug]`, `/admin/economics`, and `/admin/engagement`; robots.txt is not the only protection.

## Google Search Launch Checklist

1. Confirm the custom domain is connected and resolving with HTTPS.
2. Confirm `NEXT_PUBLIC_SITE_URL=https://pawpeaceguide.com`.
3. Verify `pawpeaceguide.com` in Google Search Console.
4. Submit `https://pawpeaceguide.com/sitemap.xml`.
5. Inspect the homepage.
6. Inspect `/guides`.
7. Inspect the top 5 guide URLs.
8. Confirm `https://pawpeaceguide.com/robots.txt` works.
9. Confirm `/go/` and `/admin/` are noindex and disallowed.
10. Check mobile usability for the homepage, `/dog-parent-protection`, `/guides`, and a top guide.
11. Run PageSpeed Insights on the homepage and `/guides/is-pet-insurance-worth-it`.
12. Confirm canonical URLs do not point to `vercel.app`.
13. Confirm each guide has unique metadata.

## Content Quality Rules

- Write for a pet owner making a real financial decision, not for keyword stuffing.
- Avoid generic filler and affiliate-farm phrasing.
- Use hypotheticals clearly labeled as examples.
- Do not invent current provider pricing, coverage details, payout terms, or rankings.
- If provider-specific details are mentioned, tell readers to verify them directly with the provider.
- Do not use fake reviews, fake star ratings, fake testimonials, countdowns, or unsupported savings claims.
- Use safe language: features to compare, questions to ask, policy terms vary, review details directly with the provider, compare quote options, educational guide, affiliate-supported resource.

## Affiliate Disclosure Rules

Affiliate disclosures must appear near monetized CTAs and provider comparison sections.

Use this framing:

```text
PawPeaceGuide is an educational, affiliate-supported website. We may earn compensation if you visit a provider through our links and purchase a policy. We are not an insurer, broker, agency, producer, financial advisor, or legal advisor. Review all policy terms directly with the provider.
```

Do not imply PawPeaceGuide sells, solicits, binds, underwrites, negotiates, or directly recommends insurance.

## Primary Affiliate Strategy

Odie is currently the primary offer because PawPeaceGuide has an approved Awin affiliate link and can earn revenue through that path now. Treat Odie as the current direct-provider handoff while preserving flexibility to reprioritize when higher-EPC comparison partners approve the site.

The Swiftest remains a high-priority pending comparison offer because the working affiliate strategy is based on a public payout claim of `$125 per conversion`. Treat this as an unverified public claim until PawPeaceGuide is accepted and the final approved terms are visible in the affiliate dashboard.

The public funnel is intentionally written as an education-first handoff into the current approved provider option. PawPeaceGuide explains terms first, then routes users toward Odie through `/go/odie`. Keep the copy clear that PawPeaceGuide is separate from every provider and does not control quote pages, eligibility, pricing, coverage, or claim decisions.

Pets Best is a backup/direct provider option and uses Impact Radius according to its official affiliate-program materials. Approved affiliates should receive a unique tracking URL after acceptance. Verify payout, qualifying actions, traffic rules, and tracking details inside Impact before using it in paid campaigns.

Actual approval, payout, traffic rules, cookie windows, qualifying events, and paid social permissions must be verified inside each affiliate dashboard before scaling ads. Paid traffic should not be scaled until the approved affiliate terms confirm Meta/Instagram traffic is allowed.

When The Swiftest, Petted, Pets Best, Fetch, Trupanion, ASPCA Pet Health Insurance, or another partner approves PawPeaceGuide, add the tracking URL and decide whether its expected EPC justifies making it primary in `data/providers.ts`.

Current provider strategy:

- Primary: Odie, `slug: "odie"`
- Pending backup comparison offer: The Swiftest, `slug: "the-swiftest"`
- Pending backup programs: Petted, Pets Best, Fetch, Trupanion, ASPCA Pet Health Insurance, Embrace

## How to Add Approved Affiliate Links

1. Add approved links as they arrive.
2. Keep Odie primary until another approved partner has better expected EPC and confirmed paid-social permission.
3. Confirm paid social is allowed.
4. Confirm whether direct linking or pre-sell pages are required.
5. Copy the approved affiliate tracking URL.
6. Paste it into the provider config `affiliateUrl` field in `data/providers.ts` or the central URL placeholders in `data/siteConfig.ts`.
7. Test `/go/[providerSlug]`.
8. Confirm UTMs are preserved.
9. Click once in test mode if allowed by the affiliate program.
10. Do not run paid ads until links and disclosures are correct.

Never link directly to the public The Swiftest homepage or pet insurance page from consumer-facing UI. Use `/go/the-swiftest` so the approved affiliate tracking link is the only outbound path.

## Affiliate Link Insertion

1. Wait for each program approval.
2. Copy the approved tracking URL from the affiliate dashboard.
3. Add it to the matching provider URL in `data/siteConfig.ts`, provider config, or an environment variable.
4. Restart/redeploy the app.
5. Visit `/go/[providerSlug]`.
6. Confirm it redirects to the correct partner page.
7. Confirm UTMs append correctly if enabled.
8. Confirm affiliate disclosure appears before users click out.
9. Do not run paid ads until the redirect works.

## Before The Swiftest Link Is Live

- Keep `/pet-parent-protection` and `/dog-parent-protection` available for review, QA, and affiliate approval.
- Odie is configured as the current primary revenue path.
- If a visitor reaches a pending partner before its link is live, provider cards should send them to the quiz or comparison guide instead of a broken outbound URL.
- Placeholder click paths should track generic guide CTA events, not affiliate clickout events.
- Re-test `/go/the-swiftest` immediately after adding the approved link.

## Meta/Instagram Compliance Notes

- Insurance-related ads must use the `Financial products and services` Special Ad Category in Meta Ads Manager when Meta classifies the ad this way.
- Insurance-related ads should be targeted only to Accounts Center accounts age 18+.
- Do not ask for personal financial information or insurance policy information in Meta ads or lead forms.
- Do not use paid landing pages to directly request personally identifiable information, bank details, card details, routing numbers, Social Security numbers, or full insurance applications.
- Do not imply the viewer has financial problems.
- Do not imply their pet is currently sick.
- Do not use fearmongering, graphic injury imagery, fake urgency, fake countdown timers, fake testimonials, fake reviews, or fake star ratings.
- Do not claim discounted insurance, large savings, guaranteed approval, guaranteed coverage, or request any upfront fee on PawPeaceGuide.
- Send traffic to the educational landing page first.

## Meta Rejection Recovery: Financial Products And Services

If Meta rejects PawPeaceGuide ads under `Discriminatory Practices` or `Financial products and services`, do not request review unchanged. Edit the campaign or ad set first:

1. In Ads Manager, set Special Ad Category to `Financial products and services`.
2. Confirm the audience is 18+.
3. Use broad, non-sensitive targeting. Avoid age/gender narrowing beyond the required minimum, ZIP-level targeting, protected-class proxies, personal hardship targeting, and exclusion stacks.
4. Send traffic to `https://pawpeaceguide.com/pet-parent-protection` with education-focused UTMs.
5. Keep the ad copy educational: `Plain-English pet insurance guidance. Learn coverage features to compare before visiting a provider quote page.`
6. Avoid copy that implies the viewer is in financial trouble, their pet is sick, or an urgent event is happening now.
7. Confirm the landing page does not directly request PII or sensitive financial details.
8. Confirm the ad and landing page do not claim discounted insurance, large savings, guaranteed approval, guaranteed coverage, or request any upfront fee.
9. Keep affiliate and legal disclosures visible before partner clickout.
10. Request review after these changes are saved.

Current compliant retry URL:

```text
https://pawpeaceguide.com/pet-parent-protection?utm_source=facebook&utm_medium=paid_social&utm_campaign=education_test_1&utm_content=pet_options_01
```

Odie remains the live monetized route after the visitor self-selects a dog or cat insurance path. It remains reachable only through `/go/odie`, with affiliate disclosure before clickout.

## Pre-Ad Launch Checklist

- Production URL works
- Production site deployed
- Custom domain connected
- `/pet-parent-protection` works on mobile
- `/dog-parent-protection` works on mobile
- `/quiz` works
- `/calculator` works
- `/compare` works
- `/go/odie` redirects correctly
- `/go/the-swiftest` shows the pending-link page until approved
- `/go/[providerSlug]` redirects correctly
- Affiliate disclosure appears near monetized CTAs
- Privacy, terms, disclaimer, and affiliate disclosure pages exist
- Meta Pixel placeholder is ready
- Meta Pixel installed or intentionally left blank
- Google Analytics placeholder is ready
- Google Analytics installed or intentionally left blank
- UTM parameters are preserved
- `/admin/engagement` shows current-session events during QA
- Vercel Runtime Logs receive generic `ppg_engagement_event` entries
- Engagement payloads do not include quiz answers, health details, emails, or calculator inputs
- Provider affiliate programs have approved paid social traffic
- Affiliate program confirms paid social traffic is allowed
- No fake claims, fake reviews, fake testimonials, or fake urgency

## Update Brand And Copy

Change the brand name, tagline, site URL, disclosure text, legal disclaimer, event names, and placeholder analytics IDs in `data/siteConfig.ts`.

Edit ad landing page variants in `data/landingPages.ts`.

Edit guide content in `data/guides.ts`.

## Add Affiliate Links And Providers

Provider cards are configured in `data/providers.ts`. Affiliate URLs are intentionally empty placeholders until approval. Add real tracking URLs only after affiliate approval.

For each partner, confirm:

- Affiliate network
- Commission type
- Approval status
- Required disclosure text
- Traffic restrictions
- Paid search restrictions
- Whether brand bidding is allowed

The redirect route is `app/go/[providerSlug]/page.tsx`. It shows a leaving-site message and then sends users to the configured third-party URL.

If `affiliateUrl` is empty, `/go/[providerSlug]` shows: "This partner link has not been configured yet." It will not redirect to a blank or broken URL.

## UTM Tracking

`lib/utm.ts` reads these parameters:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

UTMs are stored in `sessionStorage`, appended to internal links, and optionally appended to affiliate URLs when `NEXT_PUBLIC_APPEND_UTM_TO_AFFILIATE_LINKS=true`.

## Engagement Tracking

The site includes lightweight, privacy-safe engagement tracking for launch QA and early paid-traffic optimization.

Tracked generic signals:

- Landing page, quiz, calculator, compare, offer, and outbound redirect events
- Session start
- Scroll depth milestones
- Time-on-page milestones
- Section visibility
- CTA clicks and sticky mobile CTA clicks
- Email checklist placeholder submissions
- Engagement score thresholds for `engaged_session` and `high_intent_signal`

Not tracked by default:

- Quiz answers
- Pet health details
- Email addresses
- Calculator cost inputs
- Personal financial details

Production monitoring:

1. Deploy to Vercel.
2. Open Vercel Runtime Logs.
3. Filter for `ppg_engagement_event`.
4. Compare event quality by `utm_campaign`, `utm_content`, page, and event name.
5. Use `/admin/engagement` for current-browser QA and to confirm events are firing before traffic goes live.

Real-time behavior:

- `components/BehavioralNudge.tsx` listens for high-engagement sessions and shows a restrained comparison prompt when a visitor appears quote-ready.
- Edit score weights in `lib/tracking.ts` if early traffic shows that different behaviors are stronger purchase-intent signals.
- Keep payloads generic unless a future consent-aware analytics plan explicitly approves more detail.

## Funnel Events

Events are defined in `data/siteConfig.ts` and handled in `lib/tracking.ts`:

- `landing_page_view`
- `paid_landing_page_view`
- `session_started`
- `section_viewed`
- `scroll_depth_reached`
- `time_on_page_milestone`
- `cta_clicked`
- `mobile_sticky_cta_clicked`
- `engaged_session`
- `high_intent_signal`
- `behavioral_nudge_shown`
- `behavioral_nudge_clicked`
- `quiz_started`
- `quiz_step_completed`
- `quiz_completed`
- `calculator_started`
- `calculator_completed`
- `compare_page_viewed`
- `provider_card_viewed`
- `primary_offer_viewed`
- `primary_offer_clicked`
- `backup_offer_clicked`
- `affiliate_cta_clicked`
- `email_capture_submitted`
- `guide_page_viewed`
- `guide_cta_clicked`
- `glossary_viewed`
- `related_guide_clicked`
- `seo_compare_cta_clicked`
- `seo_quiz_cta_clicked`
- `outbound_redirect_started`

Privacy rule: do not send quiz answers, pet health details, calculator inputs, personal financial details, or user email addresses to Meta Pixel or the engagement endpoint by default. Send generic events only unless a future consent-aware implementation explicitly changes that.

Offer-specific tracking payloads can include `providerSlug`, `providerRole`, `commissionType`, `campaignSource`, `utm_campaign`, `utm_content`, and `pageSource`. Do not add pet health details or email addresses to these payloads.

## Internal Economics Page

`/admin/economics` shows editable break-even math for the primary comparison offer and backup CPL-style offers. It is not linked in public navigation and is for internal planning only.

Edit assumptions in `lib/economics.ts`:

- Expected CPC low/base/high
- Primary offer payout assumption
- Backup lead payout assumption
- Provider conversion low/base/high
- Visitor-to-provider-clickout low/base/high

## Email Capture

The reusable placeholder form is `components/EmailCaptureForm.tsx`. It shows: "Checklist reserved. Email integration will be connected soon."

TODO integrations are marked for ConvertKit, Beehiiv, Mailchimp, and Resend.

## Affiliate Setup Checklist

1. Apply to pet insurance affiliate programs and aggregators.
2. Confirm whether each partner pays per lead, quote, completed application, or policy sale.
3. Confirm whether Instagram/Meta paid ads are allowed.
4. Confirm whether direct linking, bridge pages, or pre-sell pages are required.
5. Confirm whether brand bidding is prohibited.
6. Add approved affiliate URLs to provider config.
7. Add disclosures required by the provider.
8. Track clickout rate and estimated earnings per click.
9. Pause campaigns where cost per qualified conversion exceeds expected payout.
10. Consult insurance compliance guidance before scaling.

## Compliance Notes

Use language like "compare quote options," "visit provider site," "features to consider," "questions to ask," "policy terms vary," "review details directly with the provider," "educational guide," and "affiliate-supported resource."

Avoid language like "buy insurance from PawPeaceGuide," "we sell insurance," "we recommend this policy," "guaranteed savings," "guaranteed approval," "guaranteed coverage," "your best plan," "enroll through PawPeaceGuide," "we found the perfect policy," or "this will cover your claim."

## Next Suggested Features

- Add real Meta Pixel, GA4, or GTM after privacy review.
- Add server-side click logging for `/go/[providerSlug]`.
- Add partner-specific disclosure overrides.
- Add A/B test variants for headline, hero CTA, and provider ordering.
- Add Vercel Analytics or another privacy-reviewed analytics provider.
- Add CMS or JSON import workflow for guide content after MVP validation.
