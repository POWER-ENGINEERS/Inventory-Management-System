# Week 12 — Final Retrospective

## What went well

- The project progressed from an initial frontend inventory interface into a Laravel-backed inventory management application.
- Authentication, products, suppliers, categories, stock-in, stock-out, search, dashboard, reports, and other inventory workflows were connected to backend services.
- Automated testing became part of the workflow, with the latest local evidence showing 46 tests passed and 150 assertions.
- Manual browser verification was performed across the major application views.
- Git branches, pull requests, reviews, AI prompt logs, and QA documentation were incorporated into the development process.
- Several development issues were identified and resolved during the term, including authentication setup in tests, duplicate phone migrations, navigation behavior, and frontend integration problems.

## What did not go as planned

- Some manual QA and production verification took longer than expected.
- Public deployment was not completed, so the live-demo requirement remains a release gap.
- Some failure-path scenarios were documented but not all were directly reproduced during manual testing.
- Frontend and backend changes sometimes needed repeated alignment and testing.
- The team had to revisit earlier work when integration issues appeared.

## What we would change next time

1. Deploy a working staging version earlier instead of waiting until the final weeks.
2. Maintain the QA matrix continuously while features are being developed.
3. Add regression tests immediately after each bug is fixed.
4. Keep frontend/backend API contracts documented from the beginning.
5. Rehearse the final demo earlier and maintain a screenshot/video backup.
6. Reduce late-stage changes by applying a clearer feature-freeze process.

## Concrete lessons

- A passing automated suite does not replace manual user-flow testing.
- A local application is not the same as a deployed production application.
- Error handling and validation should be designed together with the happy path.
- AI can accelerate implementation, but every generated suggestion needs human review.
- Git history and clear documentation make individual contributions easier to explain and defend.

## Honest final status

The repository contains substantial implementation, testing, QA, and documentation evidence. The Week 12 handout expects a deployed application and live demo; because public deployment was intentionally skipped, that portion should not be claimed as completed.
