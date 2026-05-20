# Monetization Roadmap

PawPeaceGuide should monetize the trust it creates, not interrupt it.

## Current Live Revenue Paths

1. Odie insurance affiliate
   - Route: `/go/odie`
   - Placement: direct quote/provider path for dog and cat shoppers when it genuinely fits.
   - Priority: highest current revenue path.

2. Moodifypet wellness/comfort affiliate
   - Route: `/go/moodifypet`
   - Placement: wellness extras, comfort routines, and routine-support content only.
   - Guardrail: never present as insurance, coverage, claims, reimbursement, or vet-bill protection.

3. AdSense
   - Placement: low-direct-conversion SEO surfaces such as guides, blog, and glossary.
   - Guardrail: keep Auto Ads excluded from `/quiz`, `/calculator`, `/compare`, `/ready-to-compare`, `/go/*`, and paid landing pages unless data proves ads help.

## Pending High-Value Paths

1. The Swiftest
   - Intended role: comparison-flow partner once approved.
   - Best fit: shoppers who want multiple quote options or are unsure which provider to review first.

2. Petted
   - Intended role: future comparison or widget lane if approved.
   - Best fit: embedded comparison experience.

3. Pets Best, Fetch, Trupanion, ASPCA Pet Health Insurance, Lemonade
   - Intended role: direct-provider backup lanes after approval.
   - Best fit: provider-specific comparison after education.

## Additional Monetization That Fits

1. Email checklist sponsorship
   - A sponsor can support the comparison checklist without changing recommendations.
   - Keep the sponsor message separate from provider fit logic.

2. Downloadable comparison worksheet
   - Free version now, paid or sponsor-supported later.
   - Do not make users pay to reach compliance-critical disclosures or core education.

3. Retargeting audiences
   - Use only privacy-safe generic events.
   - Good audiences: calculator completed, ready-to-compare viewed, guide reader with high engagement.
   - Do not send quiz answers, health details, or financial details to ad platforms.

4. Pet-care affiliate sidebars
   - Good for wellness, comfort, travel, safety, training, and preventive-care content.
   - Keep out of insurance comparison grids unless the product is truly relevant.

5. Veterinary telehealth or prescription partners
   - Only if terms are verified and the content clearly says they are not emergency care.
   - Avoid medical claims and avoid replacing veterinary advice.

## Do Not Add

- Aggressive popups on paid-search pages.
- Display ads near Odie handoff CTAs.
- Fake reviews, fake star ratings, or unsupported rankings.
- Direct provider links outside `/go/[providerSlug]`.
- Paid search on partner brand terms unless the affiliate terms explicitly allow it.

## Measurement Priority

Optimize to these first-party events before judging affiliate revenue:

1. `paid_landing_page_view`
2. `quiz_started`
3. `quiz_completed`
4. `calculator_started`
5. `calculator_completed`
6. `compare_page_viewed`
7. `ready_to_compare_viewed`
8. `primary_offer_clicked`
9. `affiliate_cta_clicked`
10. `outbound_redirect_started`

Actual policy sales must be reconciled from affiliate dashboards or partner postbacks.
