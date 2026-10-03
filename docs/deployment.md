# Deliverable 4 — Deployment Plan and Evidence

## Goal
Deploy the Laravel Inventory Management System to a live public host and verify the production build.

The Deliverable 4 handout requires a live public URL with end-to-end CRUD, graceful failure handling, and a passing quality-evidence package. fileciteturn211file0L9-L25

## Current deployment status
STATUS: PENDING

No public production URL is claimed here until an actual deployment is completed and verified.

## Pre-deployment checklist
- [ ] Configure production environment and database.
- [ ] Generate application key.
- [ ] Run migrations.
- [ ] Run automated tests.
- [ ] Configure correct document root.
- [ ] Disable debug mode.
- [ ] Protect production secrets.
- [ ] Verify storage/writable directories.
- [ ] Confirm HTTPS.
- [ ] Verify login.
- [ ] Verify Product/Supplier/Category CRUD.
- [ ] Verify graceful validation and failure messages.
- [ ] Record public URL.

## Production verification
| Item | Result |
|---|---|
| Public URL | PENDING |
| HTTPS | PENDING |
| Login | PENDING |
| Product CRUD | PENDING |
| Supplier CRUD | PENDING |
| Category CRUD | PENDING |
| Validation errors | PENDING |
| Not-found handling | PENDING |
| Server failure handling | PENDING |
| Network failure handling | PENDING |
| Automated tests | PASS — 46 tests / 150 assertions locally |

## Security release gate
Never deploy passwords, API keys, database credentials, or debug-enabled production configuration. The handout identifies committed secrets and debug-on production as release failures. fileciteturn211file0L49-L55
