# Khải Thiên Website V3

Website thương hiệu song ngữ cho Khải Thiên Communication & Entertainment.

## Trạng thái

Repository đang ở giai đoạn **Sprint 0 / pre-development**. Asset hero tham khảo đã có; ứng dụng chưa được khởi tạo vì môi trường hiện tại chưa cài Node.js/npm.

## Kiến trúc đã chốt

- Next.js App Router.
- React + TypeScript.
- Payload CMS 3.x.
- PostgreSQL qua `@payloadcms/db-postgres`.
- Payload là nguồn sở hữu schema/migration.
- Locales: `vi`, `en`; default `vi`.
- Public content không fallback âm thầm giữa locale.
- URL public: `/vi/...` và `/en/...`.
- Form public: `POST /api/v1/contact-requests`.

## Điều kiện khởi tạo

- Node.js `22.13.0` hoặc bản tương thích đã được Tech Lead khóa.
- pnpm được ưu tiên theo tài liệu Payload; chỉ giữ một lockfile.
- PostgreSQL local/staging.
- S3-compatible storage hoặc bucket dev.
- Email provider và secrets được cấp qua environment/secret manager.

## Quy tắc dependency

- Pin chính xác `payload`, mọi package `@payloadcms/*`, `next`, `react` và `react-dom`.
- Tất cả package Payload phải cùng một version.
- Không dùng Prisma song song với Payload migrations.
- Không dùng `db push` ở production.

## Asset hiện có

- `assets/brand/landing-page/khai-thien-landing-hero-v3-optimized.png` — hero reference, chưa approved media rights.

## Trước khi code

Đọc bộ tài liệu ở `E:\Khai Thien Website\V3 Architecture`, đặc biệt ADR, SRS, Database Design, API Contract và Pre-Development Readiness.
