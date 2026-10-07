# Week 12 — Final Presentation & Live Demo Checklist

## Presentation arc

Follow the required story:

1. **Problem** — explain the inventory-management problems the project addresses.
2. **Solution** — introduce the web-based Inventory Management System and its main workflows.
3. **Architecture** — explain the frontend → Laravel API → MySQL request flow using one concrete example.
4. **Live demo** — use the deployed Railway application, not localhost.
5. **Lessons learned** — close with the team's QA, Git/review, AI-review, deployment, and collaboration lessons.

## Suggested live-demo path

Use one short, reliable workflow instead of trying to demonstrate every feature:

1. Open the public Railway URL.
2. Sign in with the prepared account.
3. Open Products.
4. Create or open a product and show the resulting record.
5. Edit the product and show the updated information.
6. Demonstrate a controlled invalid submission and show the visible validation feedback.
7. Return to the main inventory/dashboard view.
8. Close with one lesson about testing/review/deployment.

## Architecture explanation

Be ready to trace one request:

**Browser form/action → JavaScript fetch/API request → Laravel route → controller validation/business logic → Eloquent model/database → JSON response → frontend state/feedback.**

The protected inventory routes are grouped behind Laravel Sanctum authentication. Product, supplier, category, stock-in, stock-out, report, dashboard, and search endpoints are exposed through the API layer.

## Backup demo

Prepare screenshots or a short recording of:

- Login
- Dashboard
- Products
- Create/update flow
- Validation error
- A report or inventory view

Use the backup only if the live deployment cannot be demonstrated reliably.

## Rehearsal rules

- Run the exact click-path from start to finish before presentation day.
- Keep the demo short and repeatable.
- Use the public URL, not localhost.
- Have the backup ready before starting.
- Do not make last-minute feature changes before the presentation unless necessary.

## Oral-defense reminder

The individual defense is **unassisted**. Before the session, each member should be able to explain their own code without AI or teammate help.

Know:

- Why the approach was chosen.
- Where validation happens.
- What happens with invalid input.
- What happens when a record is missing.
- How authentication protects the API.
- How tests verify important behavior.
- What was changed during the member's own contributions.
- What could be improved next.

