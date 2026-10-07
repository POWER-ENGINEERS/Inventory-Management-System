# Deliverable 4 — QA, Deployment & Final Presentation

## Purpose

Deliverable 4 closes Weeks 9–12. The final submission must demonstrate a tested, bug-resistant application deployed to a live public URL, a professional presentation with a live demo, an honest retrospective, and each member's individual unassisted oral defense.

## Team Artifact Checklist

| Requirement | Repository evidence | Current status |
|---|---|---|
| Live public application | `docs/deployment.md` | PRESENT — Railway URL recorded |
| CRUD works end to end in production | `docs/deployment.md` live smoke-test table | PENDING DIRECT LIVE EXECUTION |
| Edge cases/failures handled gracefully | `docs/feedback-tests.md`, Week 8 tests | IMPLEMENTED; LIVE FAILURE PATH REQUIRES DIRECT EXECUTION |
| Test matrix | `docs/test-matrix.md` | PRESENT; several manual cells still require execution |
| Expanded automated test suite | `tests/Feature/Week8FeedbackTest.php`, `Week9ReviewTest.php`, `Week10QaTest.php`, existing feature tests | PRESENT |
| Passing automated suite | GitHub Actions Laravel test workflow | AUTOMATED CHECKS USED THROUGHOUT WEEKS 8–11 |
| P0/P1 bug list worked down | Week 10 QA issue evidence | PENDING CONFIRMED MANUAL BUG RESULTS |
| Professional presentation | `docs/week-12-final-demo.md` | REHEARSAL MATERIAL PRESENT; SLIDE DECK/CLASS PRESENTATION STILL REQUIRED |
| Live demo | Railway public URL | REQUIRES DIRECT PRESENTATION |
| Backup demo | `docs/week-12-final-demo.md` | CHECKLIST PRESENT; SCREENSHOTS/VIDEO SHOULD BE PREPARED |
| Retrospective | `docs/retrospective.md` | PRESENT |
| Deployment notes | `docs/deployment.md` | PRESENT |
| AI prompt logs | `docs/ai-notes/week-09.md` through `week-12.md` | PRESENT |
| Board/commit contribution evidence | Git history and prior PRs | PRESENT |

## Individual Artifact — Eric Gabriel Penkian Diola

Eric's contribution history includes work across the final phase:

- Week 7 frontend-to-Laravel verification evidence.
- Week 8 feedback/error handling and automated verification.
- Week 9 AI-assisted accessibility work and substantive teammate code review.
- Week 10 critical QA test coverage.
- Week 11 deployment/release documentation.
- Week 12 retrospective and final-demo preparation.

The final individual contribution should be corroborated by the repository commit history and board ownership.

## Quality Evidence

### Automated testing

The repository contains Laravel feature coverage for:

- authenticated and unauthenticated API access;
- Product, Supplier, Category, Stock-in, and Stock-out workflows;
- validation responses;
- missing-record responses;
- inventory side-effect checks;
- Week 8 feedback contracts;
- Week 9 accessibility feedback hooks;
- Week 10 critical QA gaps.

The existing GitHub Actions workflow runs the Laravel test suite for pull requests and the relevant development branches.

### Manual QA

The manual QA source of truth is:

`docs/test-matrix.md`

Manual PASS/FAIL values must be based on direct observation. Do not convert unexecuted scenarios into PASS merely because automated tests exist.

### Bug triage

For any confirmed Week 10 bug, record:

1. Bug title.
2. Numbered reproduction steps.
3. Expected result.
4. Actual result.
5. Severity: P0, P1, or P2.
6. A Week 11 fix PR and regression test for each confirmed P0/P1 issue.

No unconfirmed bug is claimed as fixed in this document.

## Production Deployment

### Public URL

`https://inventory-management-system-production-7080.up.railway.app`

### Recorded deployment evidence

- Railway application and MySQL service provisioned.
- Production environment variables configured outside the repository.
- `APP_DEBUG=false` documented for production.
- Laravel production migrations completed.
- Database seed completed.
- Production login/dashboard access was observed during the deployment session.

### Live smoke tests still requiring direct execution

- Create a record.
- View the record.
- Edit the record.
- Delete the record.
- Submit invalid data and confirm the 422 feedback is visible.

## Presentation Requirements

Use the required story:

**Problem → Solution → Architecture → Live Demo → Lessons Learned**

### Architecture demonstration

Explain one request end to end:

**Browser action → JavaScript fetch → Laravel route → controller validation/business logic → Eloquent/database → JSON response → frontend state/feedback**

Use the deployed application for the demo, not localhost.

## Rehearsal Requirements

Before presentation:

- Run the exact demo click-path from start to finish.
- Include one graceful failure, such as invalid form data producing visible validation feedback.
- Prepare a backup using screenshots or a short recording.
- Keep each member's presentation responsibility clear.
- Avoid last-minute feature changes.

## Individual Oral Defense

The oral defense is individual and unassisted.

Each member must be able to explain their own code and answer questions such as:

- Why was this implementation approach chosen?
- Where does validation occur?
- What happens with invalid input?
- What happens when a record does not exist?
- How does authentication protect the API?
- How do the automated tests verify the behavior?
- What did the member personally change?
- What would the member improve next?

Preparation documents may be used before the defense, but AI must not be used during the actual defense.

## Final Definition-of-Done Check

### Team
- [ ] Live application reachable and usable.
- [ ] Production CRUD verified end to end.
- [ ] Failure paths verified in production.
- [ ] Test matrix completed with observed results.
- [ ] Automated suite passing.
- [ ] Confirmed P0/P1 bugs resolved through reviewed PRs.
- [ ] Professional slide deck completed.
- [ ] Live demo rehearsed.
- [ ] Backup demo prepared.
- [ ] Retrospective documented.

### Individual
- [ ] Final commits/contributions visible.
- [ ] Test/review contribution visible.
- [ ] Board ownership and Git history corroborate contribution.
- [ ] Unassisted oral defense completed.

## Evidence Rule

This document separates repository evidence from activities that require classroom or direct browser execution. It does not claim that the final presentation, live CRUD smoke test, bug-free production state, or oral defense has occurred unless those activities are actually observed and completed.
