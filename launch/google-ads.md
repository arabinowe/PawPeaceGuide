# Google Ads Search Launch Notes

Use Google Search as the primary paid test channel when Meta treats pet insurance education as a restricted financial-services ad.

## Policy Posture

PawPeaceGuide should look like a useful pet insurance education site, not a thin affiliate bridge page.

- Send Google Search traffic to `/pet-insurance`, `/dog-insurance`, `/cat-insurance`, or a matching guide page.
- Do not send ads directly to `/go/[providerSlug]`.
- Keep original educational content visible before provider CTAs.
- Keep affiliate disclosures near provider CTAs.
- Do not claim PawPeaceGuide sells, binds, underwrites, guarantees, ranks, or recommends insurance.
- Do not claim a provider is best, cheapest, guaranteed, or certain to cover a claim.
- Do not mention unavailable partner links as if they are active.
- Do not bid on provider brand terms unless affiliate terms explicitly allow it.

## Recommended Google Search Starting URL

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

## Safer Search Ad Copy

Use the fuller Performance Max/search asset pack in `launch/google-ads-asset-pack.md`.

Headline ideas:

- Pet Insurance Explained
- Compare Coverage Features
- Plain-English Pet Insurance Guide
- Understand Quote Options

Description ideas:

- Learn deductibles, reimbursement rates, annual limits, waiting periods, and exclusions before visiting provider quote pages.
- Educational, affiliate-supported guide for dog and cat owners comparing pet insurance options.

Avoid:

- Best pet insurance
- Cheapest pet insurance
- Guaranteed savings
- Guaranteed approval
- Buy insurance here
- Perfect plan for your pet

## Conversion Tracking

Set these public environment variables after Google Ads conversion tracking is created:

```text
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=XXXXXXXXXXXX
```

The site loads the Google tag only when a real Google Ads or GA4 ID is configured. The `affiliate_cta_clicked` event fires a Google Ads conversion event when both values are set.

Privacy rule: do not send quiz answers, pet health details, calculator inputs, emails, or private financial details to Google by default. The tracking utility sends generic funnel events only.

## Keyword Test Structure

Start with exact and phrase match. Keep budgets small until clickout rate and cost per provider clickout are known.

- General: `pet insurance`, `pet insurance quote`, `compare pet insurance`
- Dog: `dog insurance`, `pet insurance for dogs`, `dog health insurance`
- Cat: `cat insurance`, `pet insurance for cats`, `cat health insurance`
- Cost/research: `pet insurance cost`, `is pet insurance worth it`, `pet insurance deductible`
- Puppy/kitten: `puppy insurance`, `kitten insurance`
- Senior pet planning: `senior pet insurance`, `senior dog insurance`, `senior cat insurance`, `pet insurance for older dogs`, `pet insurance for older cats`
- Transparency intent: `pet insurance pre-existing condition rules`, `pet insurance waiting periods`, `what does pet insurance not cover`, `pet insurance exclusions`
- Value comparison: `affordable pet insurance options`, `pet insurance value`, `pet insurance deductible comparison`, `pet insurance reimbursement rates`

Use `pre-existing condition rules`, `definitions`, or `waiting periods` in ad copy and landing pages. Avoid implying that pre-existing conditions are covered unless a provider's current policy terms explicitly support a specific exception.

Suggested negatives:

- jobs
- career
- login
- customer service
- phone number
- coupon
- free
- reddit
- reviews, if the landing page is not review-oriented
- guaranteed coverage
- guaranteed approval
- pre-existing condition coverage, if the ad copy would imply a promise the landing page cannot support

## Launch QA

- `/pet-insurance` has original educational content above and below the fold.
- `/pet-insurance` includes a live Odie CTA through `/go/odie`.
- `/pet-insurance` stays focused: quiz, calculator, and Odie are the main choices.
- `/go/odie` is noindex, not in the sitemap, and preserves UTMs.
- Pending partners are clearly labeled as pending or educational.
- Legal pages are linked in the footer.
- Affiliate disclosure is visible near monetized CTAs.
- `npm run audit:outbound`, `npm run lint`, and `npm run build` pass.

## Early Spend Optimization

Do not overreact to the first few dollars. At a small daily budget, the first goal is to learn which queries and assets produce intent signals before expecting affiliate conversions.

High-intent signals:

- `/quiz` start or completion
- `/calculator` start or completion
- `/ready-to-compare` view
- `/compare` view
- `/go/odie` click

If spend is going to low-intent search terms, add negatives before rewriting the site. If visitors are reaching `/pet-insurance` but not clicking anything, test a tighter landing-page variant with the primary decision cards above the fold and fewer educational sections.
