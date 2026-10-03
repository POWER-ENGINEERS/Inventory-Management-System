# Deliverable 4 — Project Retrospective

## What went well
- The project evolved from a frontend prototype into a Laravel-backed inventory application.
- Automated coverage grew around authentication, products, suppliers, stock-in, stock-out, inventory APIs, search, and form binding.
- Reusable loading, empty, and error states improved frontend consistency.
- AI assistance accelerated implementation and review while prompt logs and human review were retained.
- Development issues were identified and resolved during the build.

## What was difficult
- Keeping frontend fields and backend models/API responses aligned required repeated testing.
- Authentication had to be handled consistently in automated requests.
- Failure handling required more attention than the happy path.
- Manual verification is different from automated testing.

## What we learned
1. Build around a clear backend contract.
2. Treat validation and failure states as first-class features.
3. Use automated tests for regressions and manual QA for real user flows.
4. Review AI-generated code instead of assuming it is correct.
5. Keep deployment configuration separate from development secrets.
6. Keep evidence close to the code through documentation, commits, and tests.

## What we would improve
- Perform production deployment earlier.
- Expand automated coverage for frontend-facing failure paths.
- Maintain a continuously updated release checklist.
- Rehearse the live demo and keep a backup demo path.

## Honest release note
At the time this document was created, local automated testing and browser-rendering evidence were available, but public production deployment and final production verification were still pending.
