# Week 8 — Feedback Tests

## Manual Failure-Path Tests

### 1. Invalid Product Data — 422

- Open Products → Add Product.
- Submit invalid or incomplete data.
- Confirm Laravel returns validation errors.
- Confirm the relevant field errors appear inline.
- Confirm the Save button becomes usable again.

**Expected:** No silent failure; the user can see what needs to be fixed.

### 2. Invalid Supplier Data — 422

- Open Suppliers → Add Supplier.
- Submit invalid or incomplete data.
- Confirm field-level validation feedback appears.
- Confirm the Save button becomes usable again.

**Expected:** No silent failure; the user can correct the highlighted fields.

### 3. Missing Record — 404

- Open an existing Product, Supplier, or Category edit/update flow.
- Use a record ID that no longer exists or remove the record before submitting the update.
- Confirm the application displays a clear not-found message.

**Expected:** A not-found message is shown instead of a blank screen or raw HTTP status.

### 4. Server Failure — 500+

- Trigger a server-side failure in a controlled development environment.
- Confirm the frontend shows a general, human-readable error.
- Confirm no stack trace or raw status code is shown to the user.

**Expected:** The UI remains usable and explains that the operation could not be completed.

### 5. Network Failure

- Stop the Laravel server temporarily.
- Load or refresh the product/supplier catalog.
- Confirm a visible connection failure appears.
- Confirm the list provides a retry action.
- Try a form submission while the API is unavailable.
- Confirm the form returns to an enabled state.

**Expected:** The UI does not freeze and gives the user a clear next step.

### 6. Loading / Double Submit

- Submit a Product or Supplier form.
- Observe the Save button while the request is pending.
- Confirm the button is disabled and shows Saving....
- Confirm repeated clicks do not create duplicate submissions.

**Expected:** One request is processed and the control becomes usable after completion.

### 7. Destructive Action Confirmation

- Attempt to delete a Product or Category.
- Confirm the application asks for confirmation before deletion.

**Expected:** Cancel prevents deletion; confirmation continues the delete request.

## Verification Result

**Week 8 implementation prepared for manual failure-path verification.**

The branch should be tested before its pull request is merged.
