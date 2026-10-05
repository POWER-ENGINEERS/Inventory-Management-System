# Week 10 — Eric QA Contribution

## Scope

This contribution follows the Week 10 feature-freeze requirement: improve critical automated QA coverage and document the manual QA work without changing application behavior or fixing bugs found during the QA pass.

- Target branch: `main`
- Working branch: `ericgabrieldiola/week-10-qa`
- `develop`: intentionally untouched

## Automated QA added

Expanded `tests/Feature/Week10QaTest.php` with critical regression/validation coverage for:

1. Overly long product-search input returns HTTP 422.
2. Updating a non-existent product returns HTTP 404 with the expected error contract.
3. Stock-in with zero quantity returns HTTP 422 and does not change product inventory.

The existing Week 10 tests also cover:

- Unauthenticated access to a protected inventory endpoint.
- Category deletion protection when products are linked.
- Zero-quantity stock-out rejection without inventory changes.

## Manual QA status

The Week 10 handout requires a human-run feature matrix and an adversarial browser session. The repository's `docs/test-matrix.md` remains the source matrix, and its unverified cells are intentionally not marked PASS by this contribution.

Manual scenarios still requiring direct execution include:

- Happy, boundary, invalid, empty, and permissions checks for each applicable feature.
- Double-submit, refresh/back-button, direct non-existent URL, post-delete action, network-off, and slow-network scenarios.
- Recording confirmed failures with reproduction steps and P0/P1/P2 severity.
- Creating tracker issues only for bugs actually reproduced during the manual QA session.

No manual bug is claimed as confirmed here because source-code inspection or automated tests are not a substitute for the required browser QA pass.

## AI prompt log

The AI was used only for test scaffolding, matching the Week 10 restriction. Final QA scenario design and manual PASS/FAIL decisions remain human responsibilities.

## Verification

Automated tests are expected to run through the repository's existing GitHub Actions Laravel test workflow on this pull request.

