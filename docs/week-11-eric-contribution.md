# Week 11 — Eric Contribution

## Scope

Week 11 is the release cycle: address confirmed P0/P1 bugs, pay down a small amount of meaningful technical debt, verify production configuration, deploy, and smoke-test the live application.

### Current contribution

- Updated `docs/deployment.md` with the Railway deployment URL and deployment-session evidence.
- Documented production environment variables without committing secrets.
- Recorded migration/seed completion.
- Kept live CRUD and 422 browser checks marked pending until directly observed.
- Updated the Week 11 AI prompt log.
- No unverified P0/P1 bug fix is claimed because the Week 10 manual QA results did not provide a confirmed bug list.

## Production record

Public URL:

`https://inventory-management-system-production-7080.up.railway.app`

Deployment-session evidence already available:

- Successful production login.
- Dashboard opened successfully.
- Laravel production migrations completed with no pending migrations.
- Production database seeding completed.

## Remaining manual smoke tests

These must be performed against the public URL:

1. Create a record.
2. View the created record.
3. Edit the record.
4. Delete the record.
5. Submit invalid data and confirm the 422 validation feedback.

## P0/P1 and technical debt

The Week 11 handout requires fixing the confirmed P0/P1 bugs from Week 10 and paying down one or two meaningful debt items. This contribution does not invent a defect or mark an unconfirmed bug as fixed. Once the Week 10 manual QA produces a confirmed P0/P1 issue, it should be handled on its own branch with a regression test and reviewed PR.

## Branch policy

- Target: `main`
- `develop`: intentionally untouched
