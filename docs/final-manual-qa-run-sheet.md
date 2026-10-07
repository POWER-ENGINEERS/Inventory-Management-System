# Final Manual QA Run Sheet

## Purpose

This sheet completes the repository-side preparation for the final manual QA pass without claiming browser actions that have not actually been observed.

## Live production URL

`https://inventory-management-system-production-7080.up.railway.app`

## Production CRUD evidence to collect

| Scenario | Expected observation | Result |
|---|---|---|
| Login | User reaches Dashboard | [ ] |
| Create Product | Success feedback and new product visible | [ ] |
| View Product | Created product details are visible | [ ] |
| Edit Product | Updated values persist after refresh | [ ] |
| Delete Product | Product is removed from the list | [ ] |
| Invalid Product | Visible validation feedback; request rejected | [ ] |

## Permissions evidence to collect

| Scenario | Expected observation | Result |
|---|---|---|
| Unauthenticated protected URL/API | Access is rejected | [ ] |
| Cashier restricted action | Restricted account action is rejected/hidden | [ ] |
| Super Admin account management | Allowed for authorized account | [ ] |

## Adversarial checks to execute manually

- [ ] Huge quantity/price values
- [ ] Emoji in a text field
- [ ] Empty required fields
- [ ] `<script>` as plain text input
- [ ] Double-click submit
- [ ] Refresh immediately after submission
- [ ] Browser Back during a workflow
- [ ] Non-existent record URL
- [ ] Delete a record, then attempt another action on it
- [ ] Disable network and submit
- [ ] Simulate a slow/unreliable network

## Evidence rule

Mark a row PASS only after direct browser observation. Automated tests support backend confidence but do not substitute for the required live/manual demonstration.

## Defense capture checklist

- [ ] Login screenshot
- [ ] Dashboard screenshot
- [ ] Create product screenshot
- [ ] Edit product screenshot
- [ ] Delete product screenshot
- [ ] 422 validation screenshot
- [ ] Stock-in screenshot
- [ ] Stock-out screenshot
- [ ] Report screenshot
- [ ] Backup screen recording

## Final status

Repository-side QA preparation is complete. Live browser execution, screenshots/video capture, presentation rehearsal, and the individual unassisted oral defense remain human/classroom activities.
