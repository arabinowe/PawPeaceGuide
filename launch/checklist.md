# PawPeaceGuide Launch Checklist

## Local QA

- Run `npm install`.
- Run `npm run lint`.
- Run `npm run build`.
- Start the app with `npm run dev`.
- Confirm `/pet-parent-protection`, `/dog-parent-protection`, `/emergency-vet-bills`, `/start-60-second-check`, `/cat-insurance`, `/pet-insurance`, `/quiz`, `/calculator`, `/compare`, and `/go/the-swiftest` load locally.

## Production QA

- Deploy to Vercel from the GitHub repo.
- Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- Confirm the custom domain resolves with HTTPS.
- Confirm `/robots.txt` and `/sitemap.xml` load.
- Confirm page titles and Open Graph metadata use the production site URL.

## Affiliate Link QA

- Wait for The Swiftest approval.
- Add the approved tracking URL to `NEXT_PUBLIC_PRIMARY_AFFILIATE_URL`.
- Redeploy after adding the URL.
- Visit `/go/the-swiftest`.
- Confirm it redirects to the approved partner page.
- Confirm the public site has no direct links to `theswiftest.com`; every consumer click path must use `/go/the-swiftest`.
- Run `npm run audit:outbound` before launch.
- Confirm an unconfigured backup link shows a graceful placeholder instead of redirecting.
- Confirm affiliate disclosures are visible before provider clickout.

## Mobile QA

- Test `/pet-parent-protection` and `/dog-parent-protection` on mobile.
- Test `/emergency-vet-bills` and `/start-60-second-check` on mobile against their matching ad creatives.
- Confirm happy dog, cat, puppy, and kitten images load without slowing or crowding the first CTA.
- Confirm `/blog`, `/blog/pet-insurance-comparison-checklist`, `/ready-to-compare`, `/quiz`, `/calculator`, `/compare`, guide pages, and legal pages all include relevant happy pet imagery.
- Confirm the primary CTA, disclosure, trust chips, and "what happens next" strip are visible in the first mobile scroll.
- Confirm the sticky mobile CTA reads `Start 60-sec check` on paid pages.
- Confirm sticky mobile CTA works.
- Complete the quiz on mobile.
- Use the calculator on mobile.
- Confirm provider cards and legal disclosures fit without overlap.

## Analytics QA

- Confirm generic events are dispatched for landing page, quiz, calculator, compare page, primary offer, affiliate click, outbound redirect, and email capture.
- Confirm `/admin/engagement` shows the current browser session score and recent events.
- Confirm Vercel Runtime Logs receive generic `ppg_engagement_event` entries after production deployment.
- Confirm scroll depth, time-on-page, section visibility, CTA click, sticky mobile CTA, and high-intent threshold events fire without page errors.
- Confirm the behavioral nudge appears only after meaningful engagement and does not block the primary mobile CTA.
- Confirm no quiz answers, pet health details, emails, or financial details are sent to Meta Pixel by default.
- Confirm no quiz answers, pet health details, emails, calculator inputs, or financial details are sent to `/api/engagement`.
- If Meta Pixel is intentionally blank, document that decision.
- If Google Analytics is intentionally blank, document that decision.
- Confirm UTMs persist through internal links.
- Confirm UTMs append to affiliate URLs only when enabled.

## Ad Readiness QA

- Use `/pet-parent-protection` for broad happy-pet creative and `/dog-parent-protection` for dog-specific creative.
- Use `/emergency-vet-bills` for the surprise-vet-bill creative.
- Use `/start-60-second-check` for the 60-second-check creative.
- Match ad images to the landing page path: dog to dog, cat to cat, puppy to puppy, kitten to kitten.
- Use real, happy-looking pets in ordinary settings rather than fear-based or clinical imagery.
- Target insurance-related ads to 18+.
- Do not imply the viewer has financial problems.
- Do not imply the viewer's pet is currently sick.
- Do not use fake urgency, fake countdown timers, fake testimonials, fake reviews, or fake star ratings.
- Confirm affiliate terms allow Meta/Instagram paid social traffic before launching.

## Organic Funnel QA

- Confirm `/blog` is indexable and linked from the public nav.
- Confirm `/blog/pet-insurance-comparison-checklist` has a table of contents, internal links, affiliate disclosure, and bottom disclaimer.
- Confirm the organic path can move from blog article to quiz, calculator, `/ready-to-compare`, `/compare`, and `/go/the-swiftest`.
- Confirm the blog does not use fake statistics, fake reviews, fake testimonials, fake star ratings, or unsupported savings claims.
- Confirm outreach targets understand PawPeaceGuide is affiliate-supported before requesting backlinks from professional or veterinary resource pages.

## Compliance QA

- Confirm PawPeaceGuide does not claim to sell, solicit, bind, underwrite, negotiate, or directly offer insurance.
- Confirm PawPeaceGuide does not call itself an insurer, agency, broker, producer, financial advisor, or legal advisor.
- Confirm legal pages exist: `/affiliate-disclosure`, `/privacy`, `/terms`, `/disclaimer`.
- Confirm monetized CTAs include nearby affiliate disclosures.
- Confirm provider copy uses safe language such as "compare quote options," "visit provider site," "features to compare," "questions to ask," "policy terms vary," and "review details directly with the provider."
