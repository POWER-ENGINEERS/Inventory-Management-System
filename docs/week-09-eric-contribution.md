# Week 9 — Eric Contribution / Code Review

## Scope
Eric's Week 9 contribution follows the lab handout "Reviewing Code (Especially the AI's)". The pull request targets `main`; `develop` remains intentionally untouched. fileciteturn451file0

## Task 1 — Open an AI-assisted PR
A small validation-feedback accessibility improvement was implemented with AI assistance:
- invalid fields receive `aria-invalid="true"`;
- field-level validation messages use `role="alert"`;
- clearing validation feedback removes the invalid-field accessibility state.

A focused Pest test was added in `tests/Feature/Week9ReviewTest.php`.

## Task 2 — Review a teammate's PR
Eric reviewed teammate PR #65, `Update StockInTest.php`.

### Review checklist
**Correctness:** BLOCKING issue found — the added Stock In update test sends a protected `PUT /api/stock-ins/{id}` request without a Sanctum token, so the test can receive HTTP 401 before exercising the update logic.

**Readability:** The test name and assertions are understandable.

**Consistency:** The test should follow the authenticated request pattern used elsewhere in the repository.

**Security:** Authentication is part of the API contract and should be included in the test setup.

**Tests:** The test meaningfully checks persistence and the product quantity side effect.

### Substantive review
A GitHub review comment was submitted with the **Blocking** label, an actionable fix using `withToken()`, and positive feedback about the persistence assertions.

## Task 3 — Find the flaw
The repository's `docs/find-the-flaw.md` contains four AI-style practice snippets covering missing validation, wrong status code, missing edge cases, and a hallucinated method. These align with the Week 9 target flaw categories in the handout. fileciteturn451file0

**Status:** documented practice. The handout allows generated snippets to be swapped with another team; no swap/instructor-provided evidence is recorded here.

## Task 4 — Good feedback
The teammate review uses:
- **blocking** for the authentication defect;
- a specific explanation of the impact;
- an actionable correction;
- positive feedback on what the test does well.

## Task 5 — Merge rule
The Week 9 handout requires no merge without passing tests and one approving review. This branch records Eric's review activity; it does not claim that repository branch-protection enforcement has been independently verified. fileciteturn451file0

## Verification status
- AI-assisted PR work: COMPLETE
- AI prompt log: COMPLETE
- Substantive teammate review: COMPLETE
- Find-the-flaw documentation: COMPLETE
- Peer approving review of Eric's Week 9 PR: PENDING
