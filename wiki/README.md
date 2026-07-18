# Wiki — khaithien_v3

> Cẩm nang dự án website thương hiệu **Khải Thiên Communication & Entertainment**
> Stack: Next.js 16 (App Router) + Payload CMS 3.86 + SQLite/PostgreSQL, song ngữ vi/en

## 📑 Mục lục
- [Tổng hợp những gì đã làm](./tong-hop-da-lam.md) — nhật ký phát triển chi tiết từng bước
- [Kỹ năng xây dựng web](./ky-nang-xay-dung-web.md) — how-to, lệnh tái sử dụng, pitfalls đã gặp

## 🏢 Thông tin thương hiệu (thực tế lấy từ fanpage)
| Trường | Giá trị |
|---|---|
| Tên | Khải Thiên Communication & Entertainment |
| Website | https://khaithien.vn |
| Hotline | **076 489 8969** (khớp áo đồng phục team + FB info; số 037 912 5458 ở flyer cũ, 090.261.7788 ở banner TVC) |
| Email | khaithienmande@gmail.com |
| Địa chỉ | 35 đường số 31D, P. An Phú, TP. Thủ Đức, TP. HCM, 70000 |
| 5 nhóm dịch vụ | (1) Tổ chức sự kiện trọn gói · (2) Booking Ca sĩ/Nghệ sĩ/KOLs · (3) Cung cấp nhân sự (vũ đoàn, PG, lễ tân, MC) · (4) Quay/Dựng TVC & Viral clip · (5) Cho thuê âm thanh/ánh sáng/màn hình LED |
| Màu thương hiệu | navy `#101336` · blue `#0065A9` · cyan `#9ED6E3` · ice `#DFF2F8` |
| Logo | `public/brand/logo.png` (huy hiệu tròn navy/trắng, 3 đỉnh núi) |

## 🧱 Tech stack
- **Next.js 16** — App Router, Turbopack, TypeScript
- **Payload CMS 3.86** — headless CMS
- **Database** — SQLite (`@libsql/client`) cho dev/local, PostgreSQL cho production (target)
- **i18n** — vi/en custom dictionary (`src/i18n/vi.json`, `en.json`)
- **Docker** — multi-stage Dockerfile + docker-compose (port 3000, volume `./data:/data`) + Nginx (Vultr VPS)
- **Package manager** — pnpm 11

## 📂 Cấu trúc trang đã có
| Route | Nội dung |
|---|---|
| `/[lang]` (`/vi`, `/en`) | Landing: hero, 5 dịch vụ, banner ảnh sự kiện, CTA |
| `/[lang]/about` | Về chúng tôi: hero logo, sứ mệnh, giá trị cốt lõi, gallery team |
| `/[lang]/services` | 5 dịch vụ chi tiết, mỗi cái 1 ảnh thật + mô tả song ngữ |
| `/[lang]/contact` | Form liên hệ → API `/api/v1/contact-requests` (đã verify 201) |
| `/[lang]/projects` | Dự án (chờ seed data) |
| `/[lang]/insights` | Góc nhìn (chờ đưa bài recap) |

## 🌿 Trạng thái
- ✅ Hoàn thiện: landing, About, Services, Contact API, i18n, brand thực, Docker files, deploy scripts
- 🟡 Đang test public qua Cloudflare quick tunnel (tạm thời, hết hạn khi process chết)
- ❌ Chưa làm: Admin CMS (lỗi `@payloadcms/next` thiếu export `./admin`), seed data, video section, đẩy content Insights

## 🚀 Deploy nhanh lên Vultr
```bash
scp khaithien_v3.tar.gz root@IP_VPS:~/
ssh root@IP_VPS
mkdir -p ~/khaithien_v3 && tar -xzf khaithien_v3.tar.gz -C ~/
cd ~/khaithien_v3
sudo ./deploy.sh --nginx tenmien.cua.anh --email you@mail.com
```

## ⚠️ Lưu ý quan trọng
- **Sandbox Hermes KHÔNG có Docker daemon** (container unprivileged, `CapEff 0000000000000000`, user không phải root) → không build/run Docker image tại chỗ. Phải build trên VPS.
- **Facebook chặn scrape** (bắt login) → user phải gửi ảnh/text thủ công qua Telegram.
- Không commit `.env` (chứa `PAYLOAD_SECRET`) — `deploy.sh` sinh random trên VPS.
