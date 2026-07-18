# API MAPPING

Endpoint: `POST /api/v1/contact-requests`

## Required headers

- `Content-Type: application/json`.
- `Idempotency-Key: <opaque-key>`.

## Body mapping

- `name`, `company`, `email`, `phone`.
- `serviceInterest` dùng stable service code.
- `message` giữ nguyên văn.
- `submissionLocale` = locale route hiện tại.
- `privacyConsent` phải `true`.
- `policyVersion` đúng locale/version.
- `sourceUrl` phải được normalize/validate.
- `utm` allowlist, không chứa PII.
- `website` honeypot phải rỗng.

## Transaction

Trong một transaction: contact request + consent event + outbox event. Commit DB trước khi worker gửi email.

## Responses

- `201`: success.
- `409`: idempotency conflict.
- `413`: payload too large.
- `422`: validation.
- `429`: rate limited.
- `500/503`: error/dependency unavailable.

Public response không trả database ID, internal status hoặc PII.
