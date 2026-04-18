---
name: chrome-web-store-submit-review
description: Use this skill when preparing or submitting a Chrome Web Store extension for review, troubleshooting submission blockers, uploading an updated package, and confirming the item moves from Draft to Pending review.
---

# Chrome Web Store Submit Review

## Goal
- Prepare a Chrome extension draft so it can be submitted successfully.
- Resolve common submission blockers quickly.
- Confirm final submission state in the Developer Dashboard.

## Required Inputs
- Publisher account access in Chrome Web Store Developer Dashboard.
- Extension source directory with a valid `manifest.json`.
- A build artifact (`.zip`) for upload.
- Public privacy policy URL and complete listing assets.

## Submission Workflow
1. Open the extension item in Chrome Web Store Developer Dashboard.
2. Go to `Package` and verify the current draft version and permissions.
3. Go to `Store listing`, `Privacy`, and `Test instructions` and ensure required fields are complete.
4. Click `Submit for review` (or open the blocker details link if submission is disabled).
5. Capture the exact blocker list before changing anything.
6. Apply fixes in source and dashboard settings.
7. Re-upload a new package if code/manifest changed.
8. Re-run submission and confirm status changes from `Draft` to `Pending review`.

## Common Blockers And Fixes

### Broad Host Permissions
- Symptom: blocker mentions broad host permissions (for example, `<all_urls>`).
- Fix in `manifest.json`:
  - Remove broad `host_permissions`.
  - Keep only required permissions.
  - Bump `version` before packaging.
- Build a new zip and upload from `Package` -> `Upload new package`.
- Re-check the permissions table in the draft package before submitting again.

### Permission Scope Warning (Non-blocking)
- Symptom: submit dialog recommends narrower permissions.
- Action: treat as guidance unless shown as a hard blocker.
- Prefer least-privilege permissions and document why each permission is needed.

### Privacy/Disclosure Missing
- Provide a public privacy policy URL.
- Complete privacy declarations consistent with actual data behavior.

### Listing/Test Instructions Incomplete
- Add required description and screenshot assets.
- Add clear reviewer test credentials/instructions when relevant.

### Account Verification Pending
- Complete required email/account verification steps.
- Retry submission after verification is acknowledged in dashboard.

## Packaging Checklist
- Confirm `manifest_version` is valid for current Chrome policy.
- Confirm `name`, `description`, and `version` are updated.
- Zip the extension root files (not an extra top-level parent folder).
- Keep release notes/changelog notes in repo if your workflow uses them.

## Final Verification
- In `Package`, confirm expected version and permission list.
- In `Store listing`, click `Submit for review` and complete the final confirmation dialog.
- Confirm the status label reads `Pending review`.
- Record item ID, submitted version, and submission timestamp in project notes.
