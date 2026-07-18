# PRE-DEVELOPMENT READINESS — WEBSITE V3

**Ngày kiểm tra:** 2026-07-15  
**Quyết định:** Conditional Go cho Sprint 0; No-Go cho production/go-live

## 1. Đã hoàn tất

- [x] Chuẩn hóa version V3.0.
- [x] Chốt stack Next.js + Payload + PostgreSQL.
- [x] Chốt locale `vi/en`, default `vi`, URL có prefix.
- [x] Chốt public fallback false cho nội dung bắt buộc.
- [x] Có SRS, UX, Database, API, migration và roadmap.
- [x] Có working content/assets cho Brand, Company, Services, Projects, Teams, Clients, Testimonials và Contact.
- [x] Thông tin contact hiện hành đã được Project Owner xác nhận.
- [x] JSON content/assets hợp lệ.
- [x] Dọn thư mục `05-Team` trùng; giữ `05-Teams`.
- [x] Document Index ghi rõ VI/EN cùng trong MVP.

## 2. Sprint 0 bắt buộc

- [ ] Cài Node.js và package manager được khóa.
- [ ] Khởi tạo Next.js App Router tương thích Payload.
- [ ] Pin cùng version cho `payload` và `@payloadcms/*`.
- [ ] Cấu hình `@payloadcms/db-postgres` với PostgreSQL.
- [ ] Tạo `.env` từ `.env.example`, không commit secret.
- [ ] Setup CI: lint, typecheck, test, build.
- [ ] Technical spike localization/publish độc lập theo locale.
- [ ] Seed một document đủ VI/EN và một document thiếu EN.
- [ ] Test localized slug uniqueness và language switcher.
- [ ] Test preview token gắn document + locale + expiry.
- [ ] Test cache/revalidation isolation theo locale.
- [ ] Chốt S3/email provider và local development strategy.

## 3. Technical spike exit criteria

- `/vi` và `/en` render độc lập, `<html lang>` đúng.
- Locale ngoài allowlist trả 404.
- Query public truyền locale explicit và `fallbackLocale:false`.
- Cùng document trả localized slug/title/body đúng locale.
- Locale thiếu translation không lộ fallback/draft.
- Publish/unpublish một locale không đổi locale còn lại.
- Revalidation tag chứa document ID + locale.
- Generated migration chạy trên database sạch.
- Generated types không có version mismatch.

## 4. Content/brand gates

- [ ] Brand Owner duyệt logo, màu, typography, graphic direction và tagline.
- [ ] Có logo vector master và favicon/icon set.
- [ ] Có font license/webfont files được duyệt.
- [ ] Có Brand Photos gốc và rights evidence.
- [ ] Có tối thiểu 3 case study approved cho VI/EN.
- [ ] Client logos/testimonials chỉ bật khi approved.
- [ ] Founder bio/portrait được duyệt nếu hiển thị.
- [ ] Privacy/Terms/consent version được Legal Owner duyệt.

## 5. Production gates

- [ ] PostgreSQL staging/production và backup/restore evidence.
- [ ] S3/CDN, image variants và media rights enforcement.
- [ ] Email domain/provider, SPF/DKIM/DMARC và outbox retry.
- [ ] Rate limit/idempotency/contact transaction tests.
- [ ] Canonical, reciprocal hreflang, sitemap và structured data crawl.
- [ ] WCAG 2.2 AA, performance budget và cross-browser QA.
- [ ] Không còn Severity 1/2 hoặc security Critical/High.
- [ ] Monitoring, alert, runbook và rollback rehearsal.

## 6. Dependency constraints đã đối chiếu

- Payload yêu cầu Node.js 20.9+ và một Next.js version range được hỗ trợ.
- Payload có thể dùng Next.js 16.2.6+ theo tài liệu hiện hành tại thời điểm audit.
- PostgreSQL dùng `@payloadcms/db-postgres`; adapter sử dụng Drizzle và quản lý migrations.
- Mọi package Payload/React critical phải pin cùng version để tránh duplicate context/runtime errors.

Tech Lead phải kiểm tra lại compatibility matrix chính thức ngay trước khi tạo lockfile.
