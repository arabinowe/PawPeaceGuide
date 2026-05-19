# Affiliate Link Status

## The Swiftest

- Status: Pending approval.
- Role: Primary comparison offer.
- Slug: `the-swiftest`.
- Config field: `NEXT_PUBLIC_PRIMARY_AFFILIATE_URL` or `providerAffiliateUrls.theSwiftest` in `data/siteConfig.ts`.
- Current placeholder: `PLACEHOLDER_PRIMARY_AFFILIATE_URL`.
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

## Link QA Steps

1. Before the approved URL is added, visit `/compare` and confirm provider cards route users back into the quiz or guide instead of promising an outbound quote page.
2. Before the approved URL is added, visit `/go/the-swiftest` and confirm it shows the graceful pending-link page.
3. Add approved tracking URL.
4. Redeploy.
5. Visit `/go/the-swiftest`.
6. Confirm redirect destination.
7. Test with UTMs:
   `/go/the-swiftest?utm_source=instagram&utm_medium=paid_social&utm_campaign=dog_parent_test_1&utm_content=know_before_you_need_it`
8. Confirm disclosure appears before clickout.
9. Confirm no blank, malformed, placeholder, or `example.com` URL redirects.
