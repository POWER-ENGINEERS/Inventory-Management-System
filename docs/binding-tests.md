# Week 7 Binding Tests

These are the tests required before the Week 7 PR is considered complete.

## Automated Laravel tests

File: `tests/Feature/Week7BindingTest.php`

- [ ] Frontend-shaped Product Create persists to Laravel
- [ ] Frontend-shaped Product Update persists to Laravel
- [ ] Frontend-shaped Supplier Create persists to Laravel
- [ ] Frontend-shaped Supplier Update persists to Laravel
- [ ] Invalid Product data returns HTTP 422 validation errors

## Manual browser tests

### Product Create
- [ ] Open Products → Add Product
- [ ] Fill the existing form
- [ ] Submit
- [ ] Save button shows loading state
- [ ] Success toast appears
- [ ] New record appears in the Product list
- [ ] Refresh the page and confirm the record is loaded from Laravel

### Product Update
- [ ] Open Edit on an existing product
- [ ] Change at least one field
- [ ] Submit
- [ ] Loading state appears
- [ ] Success toast appears
- [ ] Updated value remains after refresh

### Supplier Create/Update
- [ ] Create a supplier through the existing form
- [ ] Confirm it appears in the supplier list
- [ ] Edit the supplier
- [ ] Confirm changes persist after refresh

### Validation
- [ ] Submit invalid Product data
- [ ] Confirm Laravel returns HTTP 422
- [ ] Confirm field-level errors appear beside the relevant inputs
- [ ] Confirm the Save button becomes usable again

### Network/API failure
- [ ] Stop Laravel temporarily
- [ ] Submit a Product or Supplier form
- [ ] Confirm a visible failure toast appears
- [ ] Confirm the Save button becomes usable again

## Result
**Not yet manually verified.**
