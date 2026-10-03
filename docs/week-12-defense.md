# Week 12 — Individual Defense Preparation

## Important rule

The Week 12 handout states that AI is **off for the oral defense**. The following is a preparation guide only; each member must explain their own code without AI during the actual defense.

## Be ready to explain

### 1. Frontend to backend flow

Explain the request path:

Browser UI → JavaScript/API request → Laravel route → controller → model/database → JSON response → UI update.

### 2. Authentication

Be able to explain:
- Where login is handled.
- How the API token is obtained.
- How protected requests send authentication.
- What happens when a request has no valid authentication.

### 3. Validation

Be able to explain:
- Where server-side validation lives.
- What happens when required data is missing.
- Why invalid input returns a validation response.
- How the frontend displays validation feedback.

### 4. Missing records

Be able to explain what the controller does when a requested product, supplier, or other record does not exist.

### 5. Error handling

Explain how the frontend distinguishes validation, not-found, server, and network failures and turns them into user-facing feedback.

### 6. Testing

Know:
- What the main feature tests cover.
- Why authentication is included in protected API tests.
- What regression tests protect against.
- The latest local evidence: 46 tests passed and 150 assertions.

### 7. One bug you can defend

Choose one real issue from development and explain:
1. What happened.
2. How it was reproduced.
3. What caused it.
4. What was changed.
5. How it was tested afterward.

### 8. One piece of code you can trace

Choose one feature and trace it from the UI through the API/controller to the database and back.

## Practice questions

1. Why did you choose this implementation approach?
2. Where does validation happen?
3. What happens if the user submits invalid data?
4. What happens if a requested record does not exist?
5. What happens if the API is unavailable?
6. How are protected routes authenticated?
7. What test proves this behavior works?
8. What would you improve if you had another week?
9. Which part of the system did you personally contribute?
10. Can you explain this code without using AI?

## Defense rule

During the actual oral defense, answer from your own understanding and repository history. Do not use AI assistance.
