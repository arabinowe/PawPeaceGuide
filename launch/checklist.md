# PawPeaceGuide Launch Checklist

## Local QA

- Run `npm install`.
- Run `npm run lint`.
- Run `npm run build`.
- Start the app with `npm run dev`.
- Confirm `/dog-parent-protection`, `/pet-insurance`, `/quiz`, `/calculator`, `/compare`, and `/go/the-swiftest` load locally.

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
- Confirm an unconfigured backup link shows a graceful placeholder instead of redirecting.
- Confirm affiliate disclosures are visible before provider clickout.

## Mobile QA

- Test `/dog-parent-protection` on mobile.
- Confirm the primary CTA is visible above the fold.
- Confirm sticky mobile CTA works.
- Complete the quiz on mobile.
- Use the calculator on mobile.
- Confirm provider cards and legal disclosures fit without overlap.

## Analytics QA

- Confirm generic events are dispatched for landing page, quiz, calculator, compare page, primary offer, affiliate click, outbound redirect, and email capture.
- Confirm no quiz answers, pet health details, emails, or financial details are sent to Meta Pixel by default.
- If Meta Pixel is intentionally blank, document that decision.
- If Google Analytics is intentionally blank, document that decision.
- Confirm UTMs persist through internal links.
- Confirm UTMs append to affiliate URLs only when enabled.

## Ad Readiness QA

- Use `/dog-parent-protection` as the first ad destination.
- Target insurance-related ads to 18+.
- Do not imply the viewer has financial problems.
- Do not imply the viewer's pet is currently sick.
- Do not use fake urgency, fake countdown timers, fake testimonials, fake reviews, or fake star ratings.
- Confirm affiliate terms allow Meta/Instagram paid social traffic before launching.

## Compliance QA

- Confirm PawPeaceGuide does not claim to sell, solicit, bind, underwrite, negotiate, or directly offer insurance.
- Confirm PawPeaceGuide does not call itself an insurer, agency, broker, producer, financial advisor, or legal advisor.
- Confirm legal pages exist: `/affiliate-disclosure`, `/privacy`, `/terms`, `/disclaimer`.
- Confirm monetized CTAs include nearby affiliate disclosures.
- Confirm provider copy uses safe language such as "compare quote options," "visit provider site," "features to compare," "questions to ask," "policy terms vary," and "review details directly with the provider."
