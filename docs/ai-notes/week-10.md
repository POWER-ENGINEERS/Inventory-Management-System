# Week 10 AI Prompt Log

## Purpose

Use AI only for test scaffolding and documentation support. The QA scenarios and final pass/fail decisions remain human-designed and human-verified.

## Prompt used for test scaffolding

> Review the existing Laravel inventory API test coverage and propose a small Week 10 set of automated tests for critical QA gaps. Focus on authentication protection, category deletion safety, and stock-out validation. Do not change application behavior.

## AI-assisted test scaffolding

- Added a test confirming a protected inventory endpoint rejects unauthenticated requests.
- Added a test confirming a category with linked products cannot be deleted.
- Added a test confirming zero stock-out quantity is rejected without changing inventory.

## Human QA checklist

- [ ] Build and complete the manual test matrix.
- [ ] Run every applicable matrix scenario.
- [ ] Mark each scenario PASS or FAIL.
- [ ] Perform the adversarial testing session.
- [ ] Record every failure with reproduction steps, expected result, actual result, and P0/P1/P2 severity.
- [ ] Create a tracker issue for every confirmed bug.
- [ ] Run the full automated suite after QA test scaffolding is added.
- [ ] Keep the Week 10 feature freeze: do not fix discovered bugs during this pass.


## Eric — Week 10 QA Test Scaffolding

### Prompt used
> Review the existing Laravel inventory API tests and identify a few high-value Week 10 QA gaps that can be covered without changing application behavior. Add focused Pest tests for search input length validation, missing-product update handling, and zero-quantity stock-in rejection. Keep the feature freeze intact and do not fix application bugs.

### Human verification notes
- Automated test coverage added for the three critical paths above.
- Manual test matrix and adversarial testing still require direct browser execution.
- Do not mark unobserved manual scenarios as PASS.
