# Week 11 — AI Prompt Log

## Prompt 1 — Review the Week 10 triage
**Purpose:** Identify which Week 10 issues are still actionable for Week 11 without inventing new bugs.

**Prompt:** Review the Week 10 triage and distinguish previously resolved development issues from remaining release blockers. Do not claim a bug is fixed unless there is evidence. Prepare a focused Week 11 fix checklist.

**Human review:** The checklist keeps production deployment and live verification as pending rather than treating them as completed.

## Prompt 2 — Environment safety
**Purpose:** Prepare the project for production configuration.

**Prompt:** Review the Laravel environment configuration and `.env.example`. Identify values that must be supplied through environment variables in production, and make sure the repository documents the required keys without committing secrets. Keep local development defaults clearly separate from production requirements.

**Human review:** Existing `.env.example` was inspected. No real credentials were added.

## Prompt 3 — Week 11 release checklist
**Purpose:** Create a concise release checklist matching the lab requirements.

**Prompt:** Create a Week 11 checklist covering P0/P1 bug fixes, regression tests, limited technical-debt cleanup, environment variables, production debug settings, deployment, migrations, live CRUD smoke testing, 422 failure testing, deployment notes, and AI prompt logging.

**Human review:** Pending production items remain unchecked until actually performed.

## AI-use rule
AI suggestions are reviewed before adoption. AI output is not treated as evidence that a test, deployment, or bug fix occurred.
