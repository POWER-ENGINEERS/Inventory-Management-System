# Week 10 — Manual QA Test Matrix

## Purpose

Use this matrix during the Week 10 feature-freeze QA pass. Test each feature against the relevant happy, boundary, invalid, empty, and permissions scenarios. Record PASS or FAIL after actually testing the application.

> Feature freeze: Week 10 is for finding and logging bugs. Do not fix bugs during this QA pass.

## Result legend

- PASS — expected behavior observed.
- FAIL — actual behavior differs from expected behavior; create a bug issue and record it in the QA notes.

| Feature | Happy | Boundary | Invalid | Empty | Permissions | Result / Notes |
|---|---|---|---|---|---|---|
| Login / authentication | Valid credentials log in | Long valid input | Wrong password / invalid credentials | Missing identifier or password | Protected endpoint without token | Not run |
| User account management | Create/update/delete user | Maximum allowed field lengths | Invalid role/password data | Missing required fields | Cashier cannot manage accounts | Not run |
| Dashboard | Dashboard loads correct summary | Large inventory values | Invalid/unexpected data | Empty inventory | Unauthenticated access blocked | Not run |
| Categories | Create/update/delete category | 255-character name | Invalid field type/too-long name | Missing category name | Unauthenticated access blocked | Not run |
| Products | Create/view/update/delete product | Quantity/price limits | Missing or invalid category/supplier/quantity/price | Missing required fields | Unauthenticated access blocked | Not run |
| Product search | Search by name/SKU/barcode/brand | Very long search input | Invalid input | Empty search | Unauthenticated access blocked | Not run |
| Suppliers | Create/view/update/delete supplier | Maximum field lengths | Invalid contact/name data | Missing required fields | Unauthenticated access blocked | Not run |
| Stock-in | Record stock-in and quantity increases | Large quantity | Zero/negative/invalid quantity | Missing product/quantity | Unauthenticated access blocked | Not run |
| Stock-out | Record stock-out and quantity decreases | Quantity equal to available stock | Quantity greater than available / zero / invalid | Missing product/quantity | Unauthenticated access blocked | Not run |
| Inventory reports | View inventory report/export | Large inventory dataset | Invalid direct request parameters | Empty inventory | Unauthenticated access blocked | Not run |
| App state | Load/save application state | Large valid state | Invalid payload | Empty state payload | Unauthenticated access blocked | Not run |
| Navigation / frontend forms | Open each feature and submit normally | Repeated navigation/refresh | Invalid form submission | Submit empty form | UI actions match logged-in permissions | Not run |

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
2. Numbered reproduction steps
3. Expected result
4. Actual result
5. Severity: P0, P1, or P2

Do not fix the bug during the Week 10 QA pass. Record it for the Week 11 fix cycle.
