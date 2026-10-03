# Week 11 — Fix, Clean Up & Ship

## Current status

This checklist follows the Week 11 lab: fix P0/P1 bugs, pay down limited technical debt, configure environments safely, deploy, and smoke-test the live application.

## P0/P1 bug work
- [x] Review the Week 10 historical bug list.
- [x] Confirm previously reported development issues were already resolved.
- [ ] Reproduce any remaining P0/P1 issue.
- [ ] Create one branch per bug or related small set.
- [ ] Add or adjust a regression test.
- [ ] Open a reviewed PR.
- [ ] Confirm the full test suite is green before merge.

## Technical debt
- [ ] Select one or two meaningful debt items.
- [ ] Refactor only within the selected scope.
- [ ] Run the full test suite after the refactor.
- [ ] Avoid unrelated feature work.

## Environment configuration
- [x] Keep secrets out of the repository.
- [x] Maintain `.env.example` as the documented environment template.
- [ ] Configure production database credentials through host environment variables.
- [ ] Set production APP_ENV=production.
- [ ] Set production APP_DEBUG=false.
- [ ] Set production APP_URL to the live URL.

## Deployment
- [ ] Provision the production host.
- [ ] Configure production environment variables.
- [ ] Deploy the application.
- [ ] Run production migrations.
- [ ] Confirm the public URL.

## Live smoke test
- [ ] Login at the public URL.
- [ ] Create a record.
- [ ] View the record.
- [ ] Edit the record.
- [ ] Delete the record.
- [ ] Submit invalid data and confirm the 422 validation message.
- [ ] Record the live URL and deployment notes.

## Current evidence
- Local automated suite: **46 tests passed / 150 assertions / 1.57s**.
- Local browser verification evidence exists for the main application views.
- Public deployment and live smoke testing are not claimed until actually completed.

## Definition of done
Week 11 is complete only when P0/P1 work is reviewed and green, debt is addressed, configuration is safe, deployment and migrations are complete, live happy/failure smoke tests pass, and the Week 11 AI prompt log is current.
