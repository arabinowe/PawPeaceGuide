# Affiliate Link Status

## Odie

- Status: Approved.
- Role: Current primary revenue offer.
- Slug: `odie`.
- Config field: `NEXT_PUBLIC_PRIMARY_AFFILIATE_URL`, `NEXT_PUBLIC_ODIE_AFFILIATE_URL`, or `providerAffiliateUrls.odie` in `data/siteConfig.ts`.
- Current tracking link: configured as an Awin click-tracking URL.
- Public payout claim: Unknown; verify payout, cookie window, qualifying action, and paid-social permission in Awin.
- Required before scaling: confirm allowed traffic sources, qualifying action, cookie window, payout terms, disclosure requirements, and paid social permission.

## The Swiftest

- Status: Pending approval.
- Role: Pending high-priority comparison backup.
- Slug: `the-swiftest`.
- Config field: `NEXT_PUBLIC_SWIFTEST_AFFILIATE_URL` or `providerAffiliateUrls.theSwiftest` in `data/siteConfig.ts`.
- Current placeholder: `PLACEHOLDER_SWIFTEST_AFFILIATE_URL`.
- Public payout claim: `$125 per conversion, verify in affiliate dashboard`.
- Required before launch: approved tracking URL, allowed traffic sources, qualifying action, cookie window, payout terms, disclosure requirements, and paid social permission.

## Pets Best

- Status: Not applied.
- Role: Backup direct-provider option.
- Slug: `pets-best`.
- Config field: `providerAffiliateUrls.petsBest` in `data/siteConfig.ts`.
- Network note: Impact Radius according to affiliate-program materials; verify after approval.
- Required before use: approved tracking URL, payout terms, qualifying action, paid social permission, and required disclosures.

## Embrace

- Status: Not applied.
- Role: Backup provider option.
- Slug: `embrace`.
- Config field: `providerAffiliateUrls.embrace` in `data/siteConfig.ts`.
- Network note: FlexOffers or Unknown until confirmed.
- Required before use: approved tracking URL, payout terms, qualifying action, paid social permission, and required disclosures.

## Lemonade Pet Insurance

- Status: Pending approval.
- Role: Pending backup direct-provider option.
- Slug: `lemonade-pet-insurance`.
- Config field: `LEMONADE_AFFILIATE_URL` for the private server-side destination, plus `providerAffiliateUrls.lemonade = "configured://lemonade"` once approved.
- Network note: Unknown until confirmed in the affiliate dashboard.
- Required before use: approved tracking URL, payout terms, qualifying action, paid search permission, brand bidding rules, state availability notes, age eligibility notes, and required disclosures.
- Content guardrail: use "pre-existing condition rules" or "definitions" language. Do not claim pre-existing conditions are covered unless verified directly from current provider terms.

## Link QA Steps

1. Before the approved URL is added, visit `/compare` and confirm provider cards route users back into the quiz or guide instead of promising an outbound quote page.
2. Visit `/go/odie` and confirm it redirects through the Awin tracking URL.
3. Before the approved Swiftest URL is added, visit `/go/the-swiftest` and confirm it shows the graceful pending-link page.
4. Add each approved tracking URL as it arrives.
5. Redeploy.
6. Visit `/go/[providerSlug]`.
7. Confirm redirect destination.
8. Test with UTMs:
   `/go/odie?utm_source=instagram&utm_medium=paid_social&utm_campaign=dog_parent_test_1&utm_content=know_before_you_need_it`
9. Confirm disclosure appears before clickout.
10. Confirm no blank, malformed, placeholder, or `example.com` URL redirects.
