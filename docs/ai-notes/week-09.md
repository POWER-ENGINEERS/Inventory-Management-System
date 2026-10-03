# Week 09 AI Prompt Log

## Purpose
Use AI assistance for a small, reviewable fix while keeping the implementation subject to tests and peer review.

## Prompt used
> Review the existing Laravel product search endpoint and propose a small Week 9 fix that improves input validation without changing the existing search behavior. Keep the change focused and add automated Pest tests for successful name/SKU searches and invalid overly long input.

## AI-assisted change
- Added validation for the existing `search` and `q` query parameters.
- Limited each search parameter to 100 characters.
- Preserved the existing product name, SKU, barcode, and brand search behavior.
- Added feature tests for name/SKU matching and a 422 validation response.

## Human review checklist
- [ ] Confirm the validation rules match the intended API contract.
- [ ] Confirm existing search behavior remains unchanged.
- [ ] Run the full test suite.
- [ ] Review the PR for correctness, readability, consistency, security, and tests.
- [ ] Obtain one approving peer review before merge.
