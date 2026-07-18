# KHẢI THIÊN WEBSITE V3 — DOCUMENT INDEX

## 1. Mục đích

Bộ tài liệu này là nguồn tham chiếu thống nhất để thiết kế, lập trình, kiểm thử và nghiệm thu website Khải Thiên Communication & Entertainment.

## 2. Quyết định đã chốt

| Hạng mục | Quyết định V3 |
|---|---|
| MVP | Website thương hiệu + CMS + form liên hệ |
| Frontend/CMS | Next.js + Payload CMS, TypeScript |
| Database | PostgreSQL, ID số do Payload quản lý |
| Media | S3-compatible private bucket + CDN |
| Public form | Chỉ qua `/api/v1/contact-requests` |
| Ngôn ngữ | Tiếng Việt (`vi`) và English (`en`) cùng nằm trong MVP; 100% route P0 phải được duyệt ở cả hai locale trước launch |
| CRM-lite | Phase 2 |
| Project brief/upload | Phase 2 |
| Scheduled publishing | Phase 2 hoặc sau khi có worker |

## 3. Danh mục tài liệu

1. `01-Product-Strategy-MVP.md` — chiến lược, phạm vi và KPI.
2. `02-Technology-Stack-ADR.md` — ngôn ngữ, công nghệ và quyết định kiến trúc.
3. `03-SRS-User-Stories.md` — yêu cầu phần mềm và tiêu chí nghiệm thu.
4. `04-UX-Wireframe-UI-Spec.md` — cấu trúc trang, component và responsive.
5. `05-Database-Design.md` — mô hình dữ liệu phù hợp Payload.
6. `06-API-Contract.md` — API public/internal và lỗi chuẩn.
7. `07-Payload-Schema-Migration.md` — schema, access control và migration.
8. `08-Content-Media-Readiness.md` — nội dung, media, quyền sử dụng.
9. `09-Security-QA-DevOps.md` — bảo mật, kiểm thử, CI/CD và vận hành.
10. `10-Delivery-Roadmap-Go-Live.md` — sprint, trách nhiệm và Go/No-Go.
11. `11-Dashboard-Quan-Tri-Website-Song-Ngu.md` — dashboard quản trị nội dung, translation readiness, quyền và vận hành.
12. `12-Pre-Development-Readiness.md` — trạng thái sẵn sàng, Sprint 0 checklist và release gates trước khi code.

## 4. Thứ tự ưu tiên khi có mâu thuẫn

1. ADR và quyết định trong file 02.
2. SRS trong file 03.
3. API contract và database design.
4. UX/UI specification.
5. Tài liệu cũ chỉ dùng tham khảo.

## 5. Definition of Ready

- Brand guideline, logo và font có quyền sử dụng.
- Sitemap và phạm vi MVP đã ký duyệt.
- Có tối thiểu 3 dự án được phép công bố.
- Có người duyệt nội dung và người nghiệm thu kỹ thuật.
- Môi trường dev/staging, PostgreSQL và S3 đã cấp.

## 6. Definition of Done toàn dự án

- Mọi acceptance criterion P0/P1 đạt.
- Migration chạy trên database sạch và staging.
- Không còn lỗi Critical/High về bảo mật.
- Lighthouse mục tiêu đạt trên các template chính.
- Form liên hệ, email, analytics và backup được kiểm chứng.
- Nội dung, pháp lý và media có trạng thái Approved.
