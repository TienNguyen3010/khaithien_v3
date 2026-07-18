# Phân tích kỹ năng con thiếu cho dự án khaithien_v3

Danh sách các năng lực chưa có / yếu trong dự án hiện tại, kèm mức độ ưu tiên
và hướng khắc phục. Dùng làm roadmap bổ sung kỹ năng cho dự án web này.

## 🔴 Ưu tiên cao (blocker thực tế đã gặp)
| # | Kỹ năng thiếu | Vấn đề hiện tại | Hướng khắc phục |
|---|---|---|---|
| 1 | **Admin CMS vận hành** | `@payloadcms/next@3.86.0` thiếu export `./admin` → admin build fail, disabled | Debug version mismatch (dùng `@payloadcms/next` khớp Payload 3.86); hoặc deploy admin riêng; hoặc dùng Payload Cloud |
| 2 | **Database seeding** | Seed script lỗi "SQLite can only bind numbers/strings" trên localized fields (richText/array) | Viết seed xử lý đúng locale + richText AST; hoặc seed qua Admin UI thủ công |
| 3 | **Production DB (PostgreSQL)** | Mới có adapter code, chưa setup thực tế + migration | Cài Postgres trên VPS, set `DATABASE_URL`, chạy `payload migrate` |

## 🟠 Ưu tiên trung bình (nên có để production)
| # | Kỹ năng thiếu | Hiện tại | Hướng khắc phục |
|---|---|---|---|
| 4 | **Image optimization & CDN** | Ảnh thô 400KB–2MB, chưa config `next/image` domain, chưa CDN | Cấu hình `images.remotePatterns`, chuyển ảnh lên CDN (Cloudflare/R2); nén WebP |
| 5 | **Email delivery** | Contact form chỉ lưu DB, không gửi email cho khách/admin | Tích hợp SMTP (nodemailer) hoặc Resend; gửi template xác nhận |
| 6 | **Spam/abuse protection** | Form có honeypot `website` nhưng chưa rate-limit/IP block | Thêm rate-limit (Upstash/Redis), CAPTCHA (Cloudflare Turnstile) |
| 7 | **SEO & Metadata** | Có i18n nhưng thiếu sitemap.xml, robots.txt, OG image | Tạo `app/sitemap.ts`, `app/robots.ts`, dynamic OG image (`next/og`) |
| 8 | **Video embedding** | Chưa có section video (FB/YT) | Embed YouTube/Vimeo; hoặc lưu video local + `<video>` |

## 🟡 Ưu tiên thấp (polish)
| # | Kỹ năng thiếu | Hiện tại | Hướng khắc phục |
|---|---|---|---|
| 9 | **CI/CD (GitHub Actions)** | Deploy thủ công qua tarball | Tạo workflow: lint → build → docker build → deploy VPS qua SSH |
| 10 | **Testing** | Chỉ smoke test thủ công | Thêm Vitest (đã có) unit test route/validate; Playwright E2E |
| 11 | **Analytics** | Chưa track | GA4 hoặc Plausible (privacy-friendly) |
| 12 | **Monitoring & backup auto** | Có `docs/BACKUP_RESTORE.md` thủ công | Cron backup DB volume; uptime monitor (UptimeRobot) |
| 13 | **Accessibility (a11y)** | Chưa audit | Lighthouse a11y; alt text, contrast, keyboard nav |
| 14 | **Performance audit** | Chưa Lighthouse | Tối ưu font (next/font), lazy-load, code-split |
| 15 | **Content workflow FB→CMS** | User gửi ảnh thủ công qua Telegram | Quy trình: ảnh → `public/brand` → seed Articles/Projects qua API |

## 📊 Tóm tắt
- **3 kỹ năng đỏ** (blocker): Admin CMS, Seeding, Postgres thực tế.
- **4 kỹ năng cam** (production-ready): Image/CDN, Email, Spam, SEO.
- **8 kỹ năng vàng** (polish): CI/CD, Test, Analytics, Monitor, a11y, Perf, Content flow.

## 🎯 Đề xuất lộ trình
1. **Ngay**: Fix Admin CMS (dùng version đúng) + Seeding để có data thật.
2. **Trước deploy VPS**: Postgres + Email + Spam protection + SEO basics.
3. **Sau launch**: CI/CD, Analytics, Monitoring, a11y/perf audit.
