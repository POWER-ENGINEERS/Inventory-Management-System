# Week 09 — Review Feedback Practice

These are sample review comments for practicing the handout's blocking/nit format.

## Blocking

> **blocking:** This endpoint accepts unvalidated search input. Please add a string and maximum-length validation rule before the query runs. This prevents an uncontrolled input size and gives the frontend a predictable 422 response.

> **blocking:** This missing-record path returns HTTP 200. Please return HTTP 404 so API clients can distinguish a successful lookup from a missing resource.

## Nit

> **nit:** Please format the chained query consistently with the surrounding controller code. The behavior is correct, but consistent formatting will make the file easier to scan.

## Positive feedback

> The tests clearly cover both the successful search path and the invalid-input path. That makes the intended API behavior easier to verify during review.
