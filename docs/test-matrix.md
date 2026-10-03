# Week 10 — Manual QA Test Matrix

## Purpose

Use this matrix during the Week 10 feature-freeze QA pass. Test each feature against the relevant happy, boundary, invalid, empty, and permissions scenarios. Record PASS or FAIL after actually testing the application.

> Feature freeze: Week 10 is for finding and logging bugs. Do not fix bugs during this QA pass.

## Result legend

- PASS — expected behavior observed.
- FAIL — actual behavior differs from expected behavior; create a bug issue and record it in the QA notes.
- Historical regression — a problem previously reported during development; retest it even if it was already fixed.

## Main feature matrix

| Feature | Happy | Boundary | Invalid | Empty | Permissions | Result / Notes |
|---|---|---|---|---|---|---|
| Login / authentication | Valid credentials log in | Long valid input | Wrong password / invalid credentials | Missing identifier or password | Protected endpoint without token | Not run |
| User account management | Create/update/delete user | Maximum allowed field lengths | Invalid role/password data | Missing required fields | Cashier cannot manage accounts | Not run |
| Dashboard | Dashboard loads correct summary | Large inventory values | Invalid/unexpected data | Empty inventory | Unauthenticated access blocked | Not run |
| Employees / user management navigation | Employee page opens and works | Repeated navigation | Invalid employee action | Empty employee list | Cashier cannot perform restricted actions | Not run |
| Categories | Create/update/delete category | 255-character name | Invalid field type/too-long name | Missing category name / empty state | Unauthenticated access blocked | Not run |
| Products | Create/view/update/delete product | Quantity/price limits | Missing or invalid category/supplier/quantity/price | Missing required fields | Unauthenticated access blocked | Not run |
| Product search | Search by name/SKU/barcode/brand | Very long search input | Invalid input | Empty search | Unauthenticated access blocked | Not run |
| Suppliers | Create/view/update/delete supplier | Maximum field lengths | Invalid contact/name data | Missing required fields | Unauthenticated access blocked | Not run |
| Stock-in | Record stock-in and quantity increases | Large quantity | Zero/negative/invalid quantity | Missing product/quantity | Unauthenticated access blocked | Not run |
| Stock-out | Record stock-out and quantity decreases | Quantity equal to available stock | Quantity greater than available / zero / invalid | Missing product/quantity | Unauthenticated access blocked | Not run |
| Inventory reports | View inventory report/export | Large inventory dataset | Invalid direct request parameters | Empty inventory | Unauthenticated access blocked | Not run |
| App state | Load/save application state | Large valid state | Invalid payload | Empty state payload | Unauthenticated access blocked | Not run |
| Navigation / frontend forms | Open each feature and submit normally | Repeated navigation/refresh | Invalid form submission | Submit empty form | UI actions match logged-in permissions | Not run |

## Historical regression checks

These are real problems that were previously encountered during development. They are included so Week 10 QA verifies that they do not return.

| Previous problem | Regression test | Expected result | Result / Notes |
|---|---|---|---|
| Employee page previously returned to Dashboard instead of opening the employee page | Click Employee from the dashboard/sidebar | Employee page opens and stays on the employee feature | Not run |
| Dashboard previously had an empty state/problem during earlier integration work | Open Dashboard with normal logged-in account and with an empty dataset | Dashboard loads correctly and displays an intentional empty state when there is no data | Not run |
| Categories previously had empty-state/integration issues | Open Categories with no categories and then with categories | Empty state is clear; categories load correctly after data exists | Not run |
| Brands previously had empty-state/integration issues | Open the Brands feature/section if present | Empty state is clear and data loads correctly | Not run |
| Protected API tests previously returned 401 because test requests did not include authentication tokens | Run protected API requests/tests without and with a token | Unauthenticated requests are rejected; authenticated requests work | Not run |
| Duplicate users.phone migrations previously caused duplicate-column test failures | Run migrations/tests from a clean test database | Migrations complete without attempting to add phone twice | Not run |
| Horizontal bottom navigation/scroller was previously removed from the frontend | Resize/scroll the application and inspect the bottom of the layout | No unwanted horizontal bottom navigation/scroller appears | Not run |

## Manual QA workflow

For each matrix row:

1. Perform the happy-path scenario.
2. Test the relevant boundary condition.
3. Try invalid input.
4. Try the empty-state scenario.
5. Verify permissions/authentication where applicable.
6. Mark the result as PASS or FAIL.
7. If FAIL, do not fix it during Week 10. Create a bug issue and record the reproduction details below.

## Adversarial session checklist

Run these separately after the normal matrix:

- [ ] Weird input: huge numbers
- [ ] Weird input: emoji
- [ ] Weird input: empty values
- [ ] Weird input: <script> input
- [ ] Double-click a submit action
- [ ] Refresh during or immediately after submission
- [ ] Use the browser back button during a workflow
- [ ] Open a direct URL for a non-existent record
- [ ] Delete a record, then try to act on it again
- [ ] Disable the network and test a request
- [ ] Simulate a slow/unreliable network and check the feedback

## Bug references

For every FAIL result, create a tracker issue with:

1. Bug title
2. Numbered steps to reproduce
3. Expected result
4. Actual result
5. Severity: P0, P1, or P2

Do not fix the bug during the Week 10 QA pass. Record it for the Week 11 fix cycle.
