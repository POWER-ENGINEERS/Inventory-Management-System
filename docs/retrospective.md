# Week 12 — Final Retrospective

## What went well

- The project progressed from an initial inventory interface into a Laravel-backed inventory management application.
- Authentication, products, suppliers, categories, stock-in, stock-out, search, dashboard, reports, and related inventory workflows were connected to backend services.
- Automated testing became part of the development workflow, with the project maintaining feature tests and GitHub Actions coverage.
- The team used branches, pull requests, peer review, AI prompt logs, and QA documentation as part of the development process.
- Several development issues were identified and resolved during the term, including authentication setup in tests, duplicate migration problems, navigation behavior, and frontend/backend integration issues.
- The application was deployed to Railway with MySQL, production configuration, migrations, and database seeding completed. The recorded public URL is:
  `https://inventory-management-system-production-7080.up.railway.app`

## What did not go as planned

- Manual QA and production verification required more time than expected.
- Some failure-path scenarios were documented before they were directly reproduced in the browser.
- Frontend and backend changes sometimes needed repeated alignment and regression testing.
- Some late-stage work involved revisiting earlier integration decisions.

## What we would change next time

1. Deploy a staging environment earlier instead of waiting until the final release cycle.
2. Maintain the QA matrix continuously while features are being developed.
3. Add a regression test immediately after each confirmed bug is fixed.
4. Keep frontend/backend API contracts documented from the beginning.
5. Rehearse the final demo earlier and maintain a screenshot/video backup.
6. Freeze features earlier so the final weeks focus on QA, release, and presentation.

## Concrete lessons

- A passing automated suite does not replace manual user-flow testing.
- A local application and a production application need separate verification.
- Error handling and validation should be designed together with the happy path.
- AI can accelerate implementation, but generated suggestions require human review and testing.
- Git history and clear documentation make individual contributions easier to explain and defend.
- A good final demo should follow one clear request-response story rather than trying to show every feature.

## Final release status

The repository now contains implementation, testing, review, QA, deployment documentation, and a recorded Railway deployment. The remaining Week 12 work is to complete the final live smoke-test evidence where needed, rehearse the presentation and backup demo, and complete each member's individual unassisted oral defense.

## Blameless takeaway

The biggest lesson from the project is that software quality is a team process: building features, reviewing AI-assisted code, testing edge cases, documenting problems, deploying safely, and being able to explain the final implementation all matter together.
