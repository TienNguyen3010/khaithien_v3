# CONTACT SECURITY CONTROLS

- Honeypot `website` phải rỗng.
- Rate limit theo IP hash + fingerprint nhẹ đã được privacy review.
- Idempotency TTL tối thiểu 24 giờ.
- Payload tối đa 32KB.
- Validate locale, service code, URL và mọi field server-side.
- Origin/CSRF control phù hợp deployment.
- CORS allowlist.
- Redact PII và secret khỏi logs.
- Payload CMS REST/GraphQL không cho public create lead/consent/outbox.
- Turnstile chỉ bật khi mức spam yêu cầu và phải có accessible fallback.
- Không dùng locale input làm file path hoặc dynamic import.
