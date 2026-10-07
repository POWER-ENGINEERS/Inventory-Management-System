# Week 12 — Roderick D. Andoy Contribution

## Contributor

**Roderick D. Andoy (RodeRode81)**

## Contribution Summary

Roderick extended the automated QA coverage on the `main` development line with regression tests focused on invalid and boundary input.

### Added regression coverage

1. Product update with a negative price:
   - expects HTTP 422 validation;
   - verifies the existing product record is unchanged.

2. Stock-in with a negative quantity:
   - expects HTTP 422 validation;
   - verifies the existing product quantity is unchanged.

3. Supplier creation with an invalid email:
   - expects HTTP 422 validation;
   - verifies that the invalid supplier record is not created.

## Why these tests matter

These tests protect data integrity by checking that invalid input is rejected before the database state is changed. They also strengthen the Week 10 boundary/invalid-input QA evidence used for the final deliverable.

## Branch Safety

This contribution targets **`main`** only.

The **`develop`** branch is intentionally not modified by this contribution.

## Defense Talking Point

Roderick can explain the contribution as:

> "I strengthened the QA coverage by testing invalid product, stock-in, and supplier inputs. The tests check both the 422 response and the database state, so invalid requests cannot silently change or create records."
