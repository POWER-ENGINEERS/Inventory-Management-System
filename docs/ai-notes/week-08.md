# Week 8 — AI Prompt Log

## AI Use

AI assistance was used as required by the Week 8 lab to scaffold, review, and improve error handling and user feedback.

## Prompt Log

### Prompt 1 — Error Handling Scaffold
**Type:** AI-generated assistance

> Review the existing Laravel inventory frontend and improve the shared API request handling for Week 8. Handle 422 validation, 404 not found, 500+ server errors, and network failures with clear user-facing messages. Do not expose raw stack traces or status codes.

**Use:** Updated the shared `apiRequest()` error handling.

### Prompt 2 — Loading States
**Type:** AI-generated assistance

> Add visible loading feedback for the product and supplier catalog requests. Disable pending form controls where applicable and make sure the user can see that the application is waiting for Laravel.

**Use:** Added table loading states and retained the existing form loading behavior.

### Prompt 3 — Retry and Failure States
**Type:** AI-generated assistance

> Add a visible error state with a retry action when the product or supplier catalog cannot be loaded. Keep the existing UI and data mapping intact.

**Use:** Added table error states with retry callbacks.

### Prompt 4 — Review of Failure Branches
**Type:** AI-assisted review

> Review the Week 8 changes against the lab requirements: 422 inline errors, 404 not-found handling, 500/server handling, network retry, loading states, helpful messages, and destructive-action confirmation.

**Use:** Reviewed the implementation and documented the expected manual failure-path tests in `docs/feedback-tests.md`.

## Hand-Written Work

The following documentation and verification checklist were organized and reviewed for the project:

- `docs/feedback-matrix.md`
- `docs/feedback-tests.md`
- Week 8 manual verification plan

## Review Notes

AI-generated changes must still be manually tested. The Week 8 lab specifically requires teams to deliberately test failure paths and confirm that failures are visible to the user.
