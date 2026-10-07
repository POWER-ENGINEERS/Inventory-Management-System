# Week 7 — Eric Contribution / Manual Verification Evidence

## Scope
This contribution records Week 7 frontend-to-Laravel verification work without changing the `develop` branch.

## Manual verification observed
- Product Create: test product was submitted through the UI and appeared in the Product list with a success message stating that the product was saved to the Laravel database.
- Product Update: the Edit Product form was opened and the Save action displayed a `Saving...` loading state.
- Categories: the Categories page was opened and category records were visible after frontend/backend interaction.
- Supplier Update: the Edit Supplier form was opened with the existing supplier values pre-filled.

## Remaining Week 7 checks
The following still require direct execution before they can be marked PASS:
- Product Create persistence after a browser refresh
- Product Update persistence after a browser refresh
- Supplier Create and persistence
- Supplier Update persistence after a browser refresh
- Category Create and Update persistence
- Product 422 validation
- Supplier 422 validation
- Network/API failure handling

## Verification rule
Only scenarios actually executed and observed should be marked PASS. This document is evidence of the work observed so far, not a claim that every Week 7 manual check is complete.


## Additional screenshot evidence — 2026-10-05
- Supplier Create form: the Add Supplier Company form was opened and required supplier fields were filled before Save Supplier.
- Supplier list: the supplier table visibly contained a `POWER` supplier record with contact information and address.
- Supplier Update form: the Edit Supplier Company form opened with existing supplier values pre-filled.
- Client-side required-field validation: Supplier and Product forms displayed the browser's `Please fill out this field.` message when a required field was left empty.

These screenshots do not by themselves prove HTTP 422 API validation, persistence after refresh, or network/API failure handling.
