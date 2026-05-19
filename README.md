# PawPeaceGuide

pawpeaceguide.com

PawPeaceGuide is a static-first Next.js affiliate funnel for pet insurance education. It is built for Facebook/Instagram/Meta paid traffic, plain-English pre-sell content, a 60-second quiz, a vet bill calculator, provider comparison cards, and tracked third-party affiliate clickouts.

PawPeaceGuide does not sell insurance, bind coverage, collect full insurance applications, quote exact premiums, process insurance payments, or act as an insurer, agency, broker, producer, underwriter, financial advisor, or legal advisor.

## How The Funnel Works

Facebook or Instagram ad traffic lands on `/pet-parent-protection`, `/dog-parent-protection`, `/pet-insurance`, or another focused ad page. Users read educational context, start the quiz or calculator, compare provider quote options, and then click through `/go/[providerSlug]` to a third-party provider or marketplace once the approved affiliate link is configured.

Preferred paid-traffic path:

```text
Facebook ad -> /pet-parent-protection or /dog-parent-protection -> quiz or calculator -> primary comparison offer -> /go/the-swiftest
```

Main paths:

- `/pet-parent-protection` for broad happy dog/cat/puppy/kitten Facebook creative
- `/pet-insurance` for the primary general paid ad landing page
- `/dog-parent-protection` for the dog-owner paid ad variant referenced in the launch checklist
- `/emergency-vet-bills` for surprise-vet-bill creative
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
NEXT_PUBLIC_APPEND_UTM_TO_AFFILIATE_LINKS=true
NEXT_PUBLIC_PRIMARY_AFFILIATE_URL=
NEXT_PUBLIC_ENGAGEMENT_TRACKING_ENABLED=true
NEXT_PUBLIC_ENGAGEMENT_EVENT_ENDPOINT=/api/engagement
NEXT_PUBLIC_ENGAGEMENT_SAMPLE_RATE=1
CANONICAL_HOST_REDIRECT_ENABLED=false
CANONICAL_REDIRECT_HOSTS=pawpeaceguide.vercel.app,www.pawpeaceguide.com
```

Do not commit real affiliate links, private API keys, partner tokens, or private tracking credentials.

Public analytics and engagement values are read in `data/siteConfig.ts`. Real Meta Pixel and Google Analytics scripts are intentionally left as TODO integrations in the funnel tracking utility.

## Public Launch Milestone

Use `/pet-parent-protection` for broad dog/cat Facebook traffic and `/dog-parent-protection` for dog-specific creative:

```text
https://your-production-domain.com/pet-parent-protection?utm_source=facebook&utm_medium=paid_social&utm_campaign=pet_parent_test_1&utm_content=happy_pet_presell
https://your-production-domain.com/dog-parent-protection?utm_source=instagram&utm_medium=paid_social&utm_campaign=dog_parent_test_1&utm_content=know_before_you_need_it
```

Run locally with `npm install` and `npm run dev`. Build and QA with `npm run lint` and `npm run build`.

Deploy to Vercel by connecting the GitHub repo, using the default Next.js preset, and setting the required environment variables from `.env.example`. Set `NEXT_PUBLIC_SITE_URL` to the production origin, for example `https://pawpeaceguide.com`, so canonical URLs, robots, sitemap, and Open Graph metadata use the production domain.

After `pawpeaceguide.com` is registered, assigned to the Vercel project, and resolving correctly, set `CANONICAL_HOST_REDIRECT_ENABLED=true` and keep `CANONICAL_REDIRECT_HOSTS=pawpeaceguide.vercel.app,www.pawpeaceguide.com`. That makes the Vercel app URL and `www` host redirect to the trusted apex domain without turning it on before DNS is ready.

Add The Swiftest affiliate link in `NEXT_PUBLIC_PRIMARY_AFFILIATE_URL` after approval. Backup affiliate links live in `data/siteConfig.ts` or can be edited directly in `data/providers.ts` if you choose to store public tracking URLs in config. Affiliate tracking links are usually public click-tracking URLs, but do not commit private API keys, dashboard credentials, or partner tokens.

Test `/go/the-swiftest` after deployment. With no approved link configured, it should show: "This partner link has not been configured yet." Public provider cards should route users back into the quiz or comparison guide instead of firing affiliate click events. With an approved link configured, it should send users to the partner page and preserve UTMs when `NEXT_PUBLIC_APPEND_UTM_TO_AFFILIATE_LINKS=true`.

Do not add direct public links to `https://theswiftest.com` anywhere in the app. All consumer paths to The Swiftest must go through `/go/the-swiftest`, which redirects only to the approved affiliate tracking URL. `npm run audit:outbound` checks this rule and CI runs the audit before build.

Connect Meta Pixel by setting `NEXT_PUBLIC_META_PIXEL_ID` and implementing the TODOs in `lib/tracking.ts`. Connect Google Analytics by setting `NEXT_PUBLIC_GA_ID` and implementing the GA4 TODO in `lib/tracking.ts`. Until those integrations are added, the app captures privacy-safe engagement events through `/api/engagement`, stores the current browser session locally, and writes generic production events to Vercel Runtime Logs.

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
https://your-production-domain.com/pet-parent-protection?utm_source=facebook&utm_medium=paid_social&utm_campaign=happy_pet_presell&utm_content=happy_dog_01
```

Recommended creative-to-URL map:

- "Before you need it" square creative: `/pet-parent-protection`
- "A surprise vet bill..." wide creative: `/emergency-vet-bills`
- "Start the 60-second pet insurance check" wide creative: `/start-60-second-check`
- Dog-specific variants: `/dog-parent-protection`

Use matching `utm_content` values so performance can be read by creative:

```text
utm_content=before_you_need_it_square
utm_content=surprise_vet_bill_wide
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
- Sticky mobile CTA says `Start 60-sec check` on paid pages.
- Pet image appears in the first scroll without pushing the CTA below the fold.
- Quiz and calculator inputs use mobile-friendly text sizing to reduce iOS zoom.
- Users can still reach the deeper desktop-style education sections by scrolling.
- No public page links directly to The Swiftest; all outbound handoff remains `/go/the-swiftest`.

## Organic Guided Blog Funnel

The organic funnel is separate from the Facebook ad funnel. Use `/blog` and `/blog/pet-insurance-comparison-checklist` for search, community sharing, newsletter mentions, and backlink outreach.

Recommended organic path:

```text
Organic visitor -> /blog/pet-insurance-comparison-checklist -> quiz or calculator -> /ready-to-compare -> /go/the-swiftest
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

## Primary Affiliate Strategy

The Swiftest is currently the preferred primary offer because the working affiliate strategy is based on a public payout claim of `$125 per conversion`. Treat this as an unverified public claim until PawPeaceGuide is accepted and the final approved terms are visible in the affiliate dashboard.

The public funnel is intentionally written as a warm handoff into The Swiftest's pet insurance comparison experience: PawPeaceGuide explains terms first, then routes users toward The Swiftest as the primary third-party comparison destination once the approved tracking URL is configured. Keep the copy clear that PawPeaceGuide is separate from The Swiftest and does not control SwiftScore rankings, provider quote pages, eligibility, pricing, coverage, or claim decisions.

Pets Best is a backup/direct provider option and uses Impact Radius according to its official affiliate-program materials. Approved affiliates should receive a unique tracking URL after acceptance. Verify payout, qualifying actions, traffic rules, and tracking details inside Impact before using it in paid campaigns.

Actual approval, payout, traffic rules, cookie windows, qualifying events, and paid social permissions must be verified inside each affiliate dashboard before scaling ads. Paid traffic should not be scaled until the approved affiliate terms confirm Meta/Instagram traffic is allowed.

If the primary partner does not approve PawPeaceGuide, switch the primary provider in `data/providers.ts` by setting another provider to `role: "primary"` and priority `1`.

Current provider strategy:

- Primary: The Swiftest, `slug: "the-swiftest"`
- Backup: Pets Best, `slug: "pets-best"`
- Backup: Embrace, `slug: "embrace"`

## How to Add Approved Affiliate Links

1. Apply to The Swiftest first.
2. Apply to Pets Best and at least one backup provider.
3. Confirm paid social is allowed.
4. Confirm whether direct linking or pre-sell pages are required.
5. Copy the approved affiliate tracking URL.
6. Paste it into the provider config `affiliateUrl` field in `data/providers.ts` or the central URL placeholders in `data/siteConfig.ts`.
7. Test `/go/the-swiftest`.
8. Confirm UTMs are preserved.
9. Click once in test mode if allowed by the affiliate program.
10. Do not run paid ads until links and disclosures are correct.

Never link directly to the public The Swiftest homepage or pet insurance page from consumer-facing UI. Use `/go/the-swiftest` so the approved affiliate tracking link is the only outbound path.

## Affiliate Link Insertion

1. Wait for The Swiftest approval.
2. Copy the approved tracking URL from the affiliate dashboard.
3. Add it to `NEXT_PUBLIC_PRIMARY_AFFILIATE_URL` or provider config.
4. Restart/redeploy the app.
5. Visit `/go/the-swiftest`.
6. Confirm it redirects to the correct partner page.
7. Confirm UTMs append correctly if enabled.
8. Confirm affiliate disclosure appears before users click out.
9. Do not run paid ads until the redirect works.

## Before The Swiftest Link Is Live

- Keep `/pet-parent-protection` and `/dog-parent-protection` available for review, QA, and affiliate approval.
- Do not scale paid traffic until `NEXT_PUBLIC_PRIMARY_AFFILIATE_URL` is configured.
- If a visitor reaches the site before the link is live, primary provider cards should send them to the quiz or comparison guide instead of a broken outbound URL.
- Placeholder click paths should track generic guide CTA events, not affiliate clickout events.
- Re-test `/go/the-swiftest` immediately after adding the approved link.

## Meta/Instagram Compliance Notes

- Insurance-related ads should be targeted to 18+.
- Do not ask for personal financial information or insurance policy information in Meta ads or lead forms.
- Do not imply the viewer has financial problems.
- Do not imply their pet is currently sick.
- Do not use fearmongering, graphic injury imagery, fake urgency, fake countdown timers, fake testimonials, fake reviews, or fake star ratings.
- Send traffic to the educational landing page first.

## Pre-Ad Launch Checklist

- Production URL works
- Production site deployed
- Custom domain connected
- `/pet-parent-protection` works on mobile
- `/dog-parent-protection` works on mobile
- `/quiz` works
- `/calculator` works
- `/compare` works
- `/go/the-swiftest` redirects correctly
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
- `guide_cta_clicked`
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
