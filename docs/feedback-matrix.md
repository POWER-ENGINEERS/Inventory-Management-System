# Week 8 — Feedback Matrix

This matrix covers the main asynchronous actions in the Inventory Management System.

| Action | Loading | Success | Error |
|---|---|---|---|
| Product Create | Save button disabled and shows Saving... | Product appears in the list and success toast is shown | 422 field errors inline; 404/network/server errors shown as helpful toast |
| Product Update | Save button disabled and shows Saving... | Updated product remains in the list | 422 field errors inline; 404/network/server errors shown as helpful toast |
| Product Delete | Confirmation required before deletion | Record is removed and success toast is shown | 404/not-found or network/server failure is shown |
| Supplier Create | Save button disabled and shows Saving... | Supplier appears in the list and success toast is shown | 422 field errors inline; 404/network/server errors shown as helpful toast |
| Supplier Update | Save button disabled and shows Saving... | Updated supplier remains in the list | 422 field errors inline; 404/network/server errors shown as helpful toast |
| Category Create/Update | Save button disabled and shows Saving... | Category list updates and success toast is shown | 422 validation, 404, network, or server errors are shown |
| Category Delete | Confirmation required before deletion | Category is removed and success toast is shown | 404, 409 linked-product protection, network, or server errors are shown |
| Load Product/Supplier Lists | Table shows a loading state | Latest Laravel records render | Error state includes a retry action |
| API Request | Pending request keeps controls disabled where applicable | UI updates from the response | 422, 404, 500+, and network failures are converted to visible user feedback |

## Week 8 Rules

- Every async action has a visible loading, success, and error path.
- Controls are disabled while form submissions are pending to prevent double-submits.
- Validation errors are shown beside the affected fields.
- Not-found responses are presented as a clear state/message.
- Server and network failures use human-readable messages.
- List loading failures provide a retry action.
- Destructive category/product actions require confirmation.
