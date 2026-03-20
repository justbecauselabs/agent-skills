# App Store Connect CLI Quick Reference

Use these commands as starting points and adapt IDs/filters for the task.

## Install and Version
```bash
brew tap rudrankriyam/tap
brew install rudrankriyam/tap/asc
asc --version
```

## Authentication
```bash
# Login with an API key profile
asc auth login \
  --name "MyApp" \
  --key-id "ABC123" \
  --issuer-id "DEF456" \
  --private-key /path/to/AuthKey.p8

# Validate auth and inspect health
asc auth status --validate
asc auth doctor

# Switch profile
asc auth switch --name "ClientApp"
```

## Common App Queries
```bash
# List apps
asc apps list

# Strict auth resolution in automation
asc --strict-auth apps list
```

## TestFlight and Builds
```bash
# List TestFlight apps
asc testflight apps list

# List beta groups for an app
asc testflight beta-groups list --app "123456789"

# Upload a build and wait for processing
asc builds upload \
  --app "123456789" \
  --ipa "app.ipa" \
  --test-notes "Internal QA build" \
  --locale "en-US" \
  --wait
```

## Reviews and Feedback
```bash
# List customer reviews
asc reviews --app "123456789"

# Respond to a review
asc reviews respond --review-id "REVIEW_ID" --response "Thanks for your feedback."
```

## Devices
```bash
# List devices for an app team account
asc devices list

# Register a device
asc devices register --name "QA iPhone" --platform IOS --udid "YOUR_UDID"
```

## Analytics and Reports
```bash
# Download daily sales summary
asc analytics sales --vendor "YOUR_VENDOR" --type SALES --subtype SUMMARY --frequency DAILY --date "2026-02-10"

# Download finance report
asc finance reports \
  --vendor "YOUR_VENDOR" \
  --report-type FINANCIAL \
  --region "US" \
  --date "2026-01"
```

## Output Modes
```bash
# Machine-readable
asc apps list

# Human-readable table
asc apps list --output table

# Markdown for docs
asc apps list --output markdown
```

## Pagination
```bash
# Fetch all pages
asc reviews list --app "123456789" --paginate
```
