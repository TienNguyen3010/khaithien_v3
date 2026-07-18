# API CONTRACT — MVP V3

**Phiên bản:** Bilingual MVP V3.0  
**Supported locales:** `vi`, `en`; default `vi`

## 1. Quy ước

Base path `/api/v1`; JSON UTF-8; thời gian ISO-8601 UTC; ID là số trong internal/admin response. Public reference là chuỗi opaque, không suy diễn được.

Locale public được truyền bằng path của page và field/header theo từng endpoint. Chỉ `vi` và `en` hợp lệ. API không suy đoán locale từ nội dung user nhập và không tự fallback public sang locale khác.

## 2. Locale contract

| Thuộc tính | Contract |
|---|---|
| Allowlist | `vi`, `en` |
| Default | `vi` chỉ ở route `/`/server policy; API mutation yêu cầu locale explicit |
| Header tùy chọn | `Accept-Language` chỉ dùng cho generic error fallback, không thay `submissionLocale` |
| Content query | Locale explicit; `fallback=false` cho required public fields |
| Error language | Locale request hợp lệ; nếu không hợp lệ dùng safe default `vi` cùng stable error code |
| Analytics | Lưu locale code, không PII |

## 3. Response envelope

```json
{
  "data": {},
  "meta": { "requestId": "req_...", "locale": "vi" },
  "error": null
}
```

Lỗi:

```json
{
  "data": null,
  "meta": { "requestId": "req_...", "locale": "vi" },
  "error": { "code": "VALIDATION_ERROR", "message": "Dữ liệu chưa hợp lệ", "fields": {} }
}
```

`error.code` và field keys luôn ổn định bằng English machine code; chỉ `error.message` được localized. Client logic không được phụ thuộc vào message text.

## 4. Public endpoint

### POST `/api/v1/contact-requests`

Headers: `Content-Type: application/json`, `Idempotency-Key` bắt buộc; `Accept-Language` tùy chọn. Payload tối đa 32KB.

```json
{
  "name": "Nguyen Van A",
  "company": "Example",
  "email": "hello@example.com",
  "phone": "+84901234567",
  "serviceInterest": "event-production",
  "message": "Nhu cầu và thời gian dự kiến",
  "submissionLocale": "vi",
  "privacyConsent": true,
  "policyVersion": "privacy-vi-2026-01",
  "sourceUrl": "https://example.com/vi/contact",
  "utm": { "source": "google", "campaign": "brand" },
  "website": ""
}
```

`website` là honeypot và phải rỗng. `submissionLocale` bắt buộc thuộc `vi|en`; server không tin locale ngoài allowlist. Server normalize, validate, rate-limit, tạo lead/consent/outbox cùng locale trong transaction.

Success `201`:

```json
{
  "data": { "reference": "KT-202607-AB12CD", "receivedAt": "2026-07-13T10:00:00Z" },
  "meta": { "requestId": "req_123", "locale": "vi" },
  "error": null
}
```

Không trả ID database, trạng thái nội bộ hoặc PII.

### Validation examples

VI:

```json
{
  "data": null,
  "meta": { "requestId": "req_124", "locale": "vi" },
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Vui lòng kiểm tra thông tin đã nhập.",
    "fields": { "email": ["EMAIL_INVALID"] }
  }
}
```

EN:

```json
{
  "data": null,
  "meta": { "requestId": "req_125", "locale": "en" },
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please review the information provided.",
    "fields": { "email": ["EMAIL_INVALID"] }
  }
}
```

Field error codes giữ nguyên; frontend map code sang dictionary cùng locale.

## 5. Public content read contract

Website ưu tiên Payload Local API server-side. Nếu expose content endpoint riêng, contract bắt buộc:

`GET /api/v1/content/{collection}/{slug}?locale=vi|en`

- `collection` thuộc allowlist.
- `locale` bắt buộc và chỉ nhận `vi|en`.
- Query chỉ trả document public/published ở locale đó với `fallback=false`.
- Response có `documentId`, `locale`, localized `slug/content/seo` và `alternates` chỉ cho locale đã publish.
- Private metrics, drafts, internal notes và unapproved media bị loại trước serialization.
- Không tìm thấy bản locale trả `404 CONTENT_NOT_FOUND`, không trả body locale khác.

Ví dụ alternate:

```json
{
  "alternates": {
    "vi": "/vi/projects/du-an-mau",
    "en": "/en/projects/sample-project"
  }
}
```

## 6. Internal endpoint

### POST `/api/v1/internal/revalidate`

Chỉ nhận server-to-server signed request. Body gồm `collection`, `documentId`, `operation`, `locale`, `localizedSlug` và affected listing tags. `locale` bắt buộc thuộc allowlist. Kiểm tra timestamp, signature và replay window trước khi invalidation cache; không revalidate locale còn lại nếu không bị ảnh hưởng.

### GET `/api/v1/health/live`

Chỉ xác nhận process sống; không lộ cấu hình.

### GET `/api/v1/health/ready`

Kiểm tra dependency tối thiểu; endpoint production phải giới hạn truy cập hoặc giảm chi tiết.

## 7. Status và error codes

| HTTP | Code | Khi dùng |
|---:|---|---|
| 400 | BAD_REQUEST | JSON/header sai |
| 401 | UNAUTHORIZED | Internal auth sai |
| 403 | FORBIDDEN | Không đủ quyền |
| 409 | IDEMPOTENCY_CONFLICT | Cùng key, body khác |
| 413 | PAYLOAD_TOO_LARGE | Quá giới hạn |
| 422 | VALIDATION_ERROR | Field không hợp lệ |
| 429 | RATE_LIMITED | Quá tần suất |
| 500 | INTERNAL_ERROR | Lỗi không dự kiến |
| 503 | DEPENDENCY_UNAVAILABLE | Dịch vụ bắt buộc lỗi |
| 400 | LOCALE_INVALID | Locale không thuộc `vi|en` |
| 404 | CONTENT_NOT_FOUND | Không có bản đã publish ở locale yêu cầu |
| 409 | TRANSLATION_NOT_READY | Internal publication action thiếu nội dung/approval |

## 8. Locale-aware email/outbox contract

- Contact transaction ghi `submissionLocale`, consent `policyVersion/consentLocale` và outbox `templateKey/locale`.
- Template allowlist: ví dụ `contact_internal_vi`, `contact_internal_en`, `contact_ack_vi`, `contact_ack_en` hoặc template key + locale riêng.
- Worker không nhận path/template tùy ý từ client.
- Retry giữ nguyên locale và template version ban đầu để acknowledgement nhất quán.
- Nội dung message của visitor không tự động dịch.

## 9. Security contract

- Không expose Payload create API cho contact/consent.
- Rate limit theo IP hash + fingerprint nhẹ; không dùng fingerprint xâm phạm.
- CORS allowlist; CSRF/origin check nếu dùng cookie.
- Log request ID, code, latency; redact PII và secret.
- Idempotency TTL tối thiểu 24 giờ.
- Locale được validate trước khi chọn dictionary, email template, redirect hoặc content query; không dùng input locale làm file path/import động tùy ý.
- Preview/internal revalidation gắn locale trong signed payload và audit.

## 10. Caching và headers

- Content GET có `Vary` chỉ trên header thực sự ảnh hưởng response; locale ưu tiên nằm trong query/path để cache key rõ ràng.
- POST contact dùng `Cache-Control: no-store`.
- Content ETag/cache tag bao gồm document ID + locale + version.
- Localized 404 không bị cache thành kết quả của locale khác.

## 11. API tests bắt buộc

Happy path cho `vi` và `en`; missing/invalid locale; missing consent; invalid contact; duplicate retry; conflicting idempotency; oversized payload; honeypot; rate limit; transaction rollback; email provider failure; đúng localized message nhưng stable error code; không mixed-language fallback; private metrics/media filtering; revalidation locale isolation và log redaction.

## 12. API acceptance criteria

- Cùng request type trả message đúng `vi`/`en` nhưng machine code không thay đổi.
- Contact, consent và outbox lưu cùng locale trong một transaction.
- Content locale chưa publish trả 404, không fallback sang locale khác.
- Alternates chỉ chứa localized URL đã publish.
- Cache/idempotency không gây trả response sai locale.
- OpenAPI/Zod/generated client types phản ánh `Locale = 'vi' | 'en'`.
