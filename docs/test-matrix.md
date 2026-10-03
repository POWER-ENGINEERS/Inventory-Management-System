# Deliverable 4 — QA Test Matrix

## Scope
Manual and automated verification for the Inventory Management System before production release.

| Area | Check | Expected | Status |
|---|---|---|---|
| Authentication | Valid login | Dashboard opens and session is established | PASS |
| Authentication | Required username/email | Visible required-field validation | PASS |
| Dashboard | Summary/cards/charts render | Data and UI render without crash | PASS |
| Products | List loads | Products and actions render | PASS |
| Suppliers | List loads | Suppliers and actions render | PASS |
| Categories | List loads | Categories and actions render | PASS |
| Purchase Orders | List loads | Orders render with status/actions | PASS |
| Receiving | Available POs render | Receiving workflow is visible | PASS |
| Inventory Movements | Records render | Movement history is visible | PASS |
| POS | Products/cart render | Sales terminal is usable | PASS |
| Customers | Records render | Customer table is visible | PASS |
| Employees | Records render | Employee table is visible | PASS |
| Reports | Report data renders | Report and transactions are visible | PASS |
| Audit Trail | Records render | Activity history is visible | PASS |
| Settings | Settings render | Company/settings controls are visible | PASS |
| Automated suite | php artisan test | All tests pass | PASS — 46 tests / 150 assertions |
| Product CRUD | Create/Update/Delete | Verify in production before final sign-off | PENDING |
| Supplier CRUD | Create/Update/Delete | Verify in production before final sign-off | PENDING |
| Category CRUD | Create/Update/Delete | Verify in production before final sign-off | PENDING |
| 422 validation | Invalid form data | Helpful validation message | PENDING |
| 404 handling | Missing record | Helpful not-found message | PENDING |
| 500 handling | Server failure | Helpful error, no crash/stack trace | PENDING |
| Network failure | API unavailable | Helpful connection error and retry where supported | PENDING |

## Release gate
1. Automated suite passing.
2. P0/P1 bugs resolved.
3. Production CRUD verification completed.
4. Failure-path checks completed.
5. Public URL confirmed.
6. Presentation backup prepared.

Do not mark pending production checks as PASS until they are actually executed.
