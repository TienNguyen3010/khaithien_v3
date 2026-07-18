# Tổng hợp những gì đã làm — khaithien_v3

Nhật ký phát triển từ lúc scaffold đến hiện tại. Commit gần nhất: `625a39a`.

## 1. Khởi tạo & scaffold
- Tạo dự án Next.js 16 (App Router) + Payload CMS 3.86 + TypeScript.
- Cấu hình i18n song ngữ vi/en (`src/i18n/config.ts`, `vi.json`, `en.json`).
- Định nghĩa collections: `Users, Media, Pages, Services, Projects, Articles, Categories, ContactRequests, ConsentEvents, Redirects, AuditEvents, SiteSettings`.

## 2. Contact form (API)
- Route `src/app/api/v1/contact-requests/route.ts` — nhận POST, validate, lưu vào Payload, trả reference `KT-202607-XXXXXX`.
- Thêm **Idempotency-Key** để tránh duplicate submit.
- Đã verify: `POST` trả **201** trên dev server.

## 3. Build & typecheck
- `pnpm build` + typecheck thành công (22 pages, vi/en).
- Smoke test dev server: mọi route `HTTP 200`.

## 4. Tích hợp brand thật (từ fanpage — user gửi ảnh qua Telegram)
- **Logo** (`public/brand/logo.png`) → header, footer, favicon (`[lang]/layout.tsx` `metadata.icons`).
- **Footer**: logo + Hotline **076 489 8969** + Email `khaithienmande@gmail.com` + Địa chỉ + Website `https://khaithien.vn`.
- **Landing page**: section 5 dịch vụ (từ flyer) + banner ảnh sự kiện.
- **Theme navy/blue**: `globals.css` (`--color-navy #101336`, `--color-accent #0065A9`, hero bg image).

## 5. Ảnh brand đã lưu (`public/brand/`)
`logo.png`, `hero.png`, `services-banner.png`, `event-grand-opening.png`, `tvc-production.png`, `tvc-production-banner.png`, `team-meeting-1.png`, `team-meeting-2.png`, `office-team.png`, `filming-meeting.png`, `team-uniform.png`.

## 6. Trang Services chi tiết (`/[lang]/services`)
- 5 dịch vụ, mỗi cái 1 ảnh thật + mô tả song ngữ + nút "Nhận tư vấn" → Contact.
- Commit `ab814b2`.

## 7. Trang Về chúng tôi (`/[lang]/about`)
- Hero logo, Sứ mệnh, Giá trị cốt lõi (Tư duy lớn / Thực thi tin cậy / Kết quả đo lường), gallery 4 ảnh team, CTA.
- Commit `5de2ab0`.

## 8. Docker packaging
- `Dockerfile` (multi-stage), `docker-compose.yml` (port 3000:3000, `./data:/data`, env), `.dockerignore`, `.npmrc` (`dangerously-allow-all-builds=true`), `DOCKER.md`.
- `deploy.sh` (auto docker+env+build+up+nginx option), `deploy/install-docker.sh`, `deploy/nginx-khaithien.conf`, `docs/BACKUP_RESTORE.md`.

## 9. Fix SQLite path (commit `625a39a`)
- Vấn đề: config dùng `file:/data/khaithien_v3.db` (cho Docker volume) → trên local `/data` không tồn tại (không có root) → sqlite treo.
- Fix: fallback `./khaithien_v3.db` nếu `/data` không tồn tại; ưu tiên env `SQLITE_FILE`. Docker (có `/data`) vẫn dùng volume.

## 10. Public test (Cloudflare tunnel)
- Chạy `pnpm dev` + `cloudflared tunnel --url http://localhost:3000`.
- Link test: `https://item-streaming-environment-applications.trycloudflare.com`
- Verify từ internet: `/vi`, `/vi/about`, `/vi/services`, `/en` đều **200**.
- Contact route chậm lần đầu trên sandbox RAM thấp (1.9GB) → timeout, nhưng code đúng (đã verify 201 trước đó).

## 📌 Các blocker chưa giải quyết
1. **Không có dockerd** trong sandbox → build Docker phải làm trên VPS.
2. **Admin CMS lỗi**: `@payloadcms/next@3.86.0` thiếu export `./admin` → disabled (`_payload_admin_disabled/`).
3. **Seed script lỗi**: SQLite bind `localized` fields fail ("can only bind numbers/strings") → chưa có demo data.
4. **Facebook scrape bất khả thi** (login wall) → user gửi asset thủ công.

## 🔜 Gợi ý tiếp theo
- Đưa bài recap (`content/insights/team-return.md`) lên mục Insights.
- Sửa seed data để Projects/Services hiển thị động.
- Video section nếu có link video.
- Deploy chính thức trên Vultr (tarball hoặc `git clone`).
