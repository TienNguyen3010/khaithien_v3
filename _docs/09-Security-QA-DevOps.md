# SECURITY, QA & DEVOPS PLAN

## 1. Security baseline

- TLS, secure headers, CSP phù hợp, HSTS sau khi xác thực toàn domain.
- Least privilege cho DB, S3, CMS và CI credentials.
- Password hashing do Payload; MFA/SSO cho admin khi khả dụng.
- Rate limit, idempotency, honeypot và optional Turnstile cho form.
- Dependency scanning, secret scanning và lockfile review.
- Không log PII, token, cookie, request body form hoặc signed URL.

## 2. Test pyramid

| Lớp | Phạm vi |
|---|---|
| Unit | Validators, access functions, serializers, hooks |
| Integration | Payload + PostgreSQL, transaction, migration, S3 |
| API contract | Status, schema, idempotency, errors, rate limit |
| Component | States, keyboard, accessibility |
| E2E | Navigation, project, contact, admin publish/revalidate |
| Manual | Visual QA, real devices, content/legal review |

## 3. CI quality gates

Mỗi pull request phải chạy format check, ESLint, typecheck, unit/integration test, migration smoke test, production build và dependency/security checks. Không được bỏ qua lint đang lỗi; sửa ESLint config trước Sprint 1.

## 4. Performance budget

- LCP p75 ≤ 2.5s; INP p75 ≤ 200ms; CLS p75 ≤ 0.1.
- JS initial theo template được đo và đặt budget trong CI.
- Hero image ưu tiên đúng mức; ảnh dưới fold lazy load.
- Font subset/self-host theo license; tránh quá nhiều weights.
- Test bằng dữ liệu/media gần production, không chỉ placeholder nhẹ.

## 5. Accessibility QA

Automated axe/Lighthouse chỉ là lớp đầu. Bắt buộc keyboard-only, zoom 200%, reduced motion, screen reader smoke test và kiểm tra lỗi form.

## 6. Deployment pipeline

1. PR preview không chứa production PII.
2. Merge main → build immutable artifact.
3. Backup staging → migrate → deploy → smoke test.
4. Approval → backup production → migrate → deploy canary/rolling.
5. Verify health, form, email, analytics, logs và Core Web Vitals.

## 7. Observability

- Structured logs với request ID.
- Error tracking cho frontend/server/jobs.
- Metrics: request error/latency, form success, email retry, DB/S3 health.
- Alert có owner và runbook; tránh alert không hành động được.
- Synthetic test định kỳ cho home và contact submit dùng dữ liệu test nhận diện rõ.

## 8. Backup và recovery

Managed PostgreSQL PITR nếu có; backup S3/versioning theo risk; restore drill trước launch và định kỳ. RPO/RTO phải được business owner chốt, không suy đoán trong tài liệu kỹ thuật.

## 9. Release checklist

- Migration/rollback đã thử.
- DNS/TLS/redirect/canonical/sitemap/robots đúng.
- Admin không index; preview không cache.
- Security headers và cookie consent đúng lựa chọn analytics.
- Form failure mode và outbox retry được diễn tập.

