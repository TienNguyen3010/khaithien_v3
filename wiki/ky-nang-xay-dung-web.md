# Kỹ năng xây dựng web cho khaithien_v3

Cẩm nang how-to, lệnh tái sử dụng và pitfalls đã gặp khi build dự án này. Dành cho ai tiếp quản hoặc làm dự án web tương tự.

## 1. Môi trường & package manager (pnpm 11)
- **Pitfall**: pnpm 11 KHÔNG đọc `pnpm.onlyBuiltDependencies` từ `package.json`. Nếu cần build native (vd `sharp`) thì dùng `.npmrc`:
  ```
  dangerously-allow-all-builds=true
  ```
  Hoặc `pnpm-workspace.yaml` với `allowBuilds`.
- Cài deps: `pnpm install` (dùng `.npmrc` ở trên).
- Build: `pnpm build`. Dev: `pnpm dev`. Typecheck: `pnpm typecheck` (nếu có script).

## 2. Payload CMS 3.86 — getPayload quirk
- **Pitfall**: gọi `getPayload({ config })` trực tiếp bị lỗi `reduce` vì config chưa sanitized.
- **Fix (dùng mọi chỗ gọi getPayload)**:
  ```ts
  import { getPayload } from 'payload'
  import { sanitizeConfig } from '@payloadcms/config'
  import config from '@/payload.config'

  export async function getPayloadClient() {
    return getPayload({ config: sanitizeConfig((config as any)()) })
  }
  ```
- Dùng trong: `src/lib/payload-content.ts`, `src/app/api/v1/contact-requests/route.ts`, `src/scripts/seed.ts`.

## 3. Database — SQLite cho dev, Postgres cho prod
- Dev dùng `@payloadcms/db-sqlite` + `@libsql/client` (KHÔNG dùng `better-sqlite3` — native build khó trên sandbox).
- Config linh hoạt (Docker + local):
  ```ts
  db: process.env.DATABASE_URL
    ? postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL } })
    : sqliteAdapter({
        client: {
          url: process.env.SQLITE_FILE
            || (fs.existsSync('/data')
              ? 'file:/data/khaithien_v3.db'      // Docker: volume mount ./data -> /data
              : 'file:' + path.resolve(__dirname, 'khaithien_v3.db')), // local fallback
        },
      }),
  ```
- **Pitfall**: trên local không có quyền tạo `/data` (non-root) → phải fallback `./khaithien_v3.db`.

## 4. i18n (vi/en)
- Dictionary: `src/i18n/vi.json` / `en.json` — key khớp nhau.
- Dùng: `const dict = getDictionary(locale)`; `locale` từ `params.lang`.
- Route động: `src/app/[lang]/...`.
- Khi thêm text mới → sửa CẢ 2 file json, không quên validate JSON (`python3 -c "import json; json.load(open(...))"`).

## 5. Docker (chỉ build trên VPS, KHÔNG build ở sandbox)
- Sandbox Hermes: không có `dockerd` (unprivileged, `CapEff 0000000000000000`, user `hermes` ≠ root) → build/run Docker image bất khả thi.
- Trên VPS (Debian/Ubuntu, root): `sudo ./deploy/install-docker.sh` rồi `sudo ./deploy.sh --nginx domain --email you@mail.com`.
- Volume `./data:/data` giữ DB bền vững, dễ copy sang server khác.

## 6. Public test nhanh không cần domain (Cloudflare quick tunnel)
- Tải `cloudflared`:
  ```bash
  curl -sL -o /tmp/cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
  chmod +x /tmp/cloudflared
  ```
- Chạy app + tunnel:
  ```bash
  pnpm dev &   # hoặc pnpm build && pnpm start
  /tmp/cloudflared tunnel --url http://localhost:3000 --no-autoupdate
  ```
- Lấy URL từ log: `grep -oE "https://[a-zA-Z0-9.-]+\.trycloudflare\.com" /tmp/cf.log`.
- **Lưu ý**: quick tunnel TẠM THỜI (hết hạn khi process chết/máy restart). Để permanent dùng Cloudflare named tunnel hoặc deploy Vultr.
- **Pitfall**: sandbox RAM thấp (1.9GB) → route API lần đầu compile > timeout. GET pages thì ổn.

## 7. Xử lý asset từ Facebook
- Facebook CHẶN scrape (bắt login) → không lấy được ảnh/text fanpage tự động.
- Quy trình: user gửi ảnh qua Telegram → Hermes lưu `/opt/data/cache/images/img_*.png` → copy vào `public/brand/`:
  ```bash
  cp /opt/data/cache/images/img_XXXX.png public/brand/ten-anh.png
  ```

## 8. Commit an toàn
- KHÔNG commit `.env` (chứa `PAYLOAD_SECRET`). Đã có `.gitignore`.
- Trước commit: `git add -A && git diff --cached --name-only | grep -E "\.env$|\.next/|khaithien_v3\.db$"` → phải trống.
- Đóng gói tarball (loại trừ secret):
  ```bash
  tar --exclude='node_modules' --exclude='.next' --exclude='.env' \
      --exclude='data' --exclude='.git' --exclude='*.db' \
      -czf khaithien_v3.tar.gz khaithien_v3
  ```

## 9. ADRs (quyết định thiết kế)
- i18n vi/en, collections, localized URLs.
- Mọi web project MỚI: **thiết kế Docker từ đầu** (Dockerfile + compose + .dockerignore, SQLite trên volume `/data`, env qua `.env`).
- Prod DB: PostgreSQL (locked choice), SQLite fallback chỉ để dev/local.

## 10. Troubleshoot nhanh
| Triệu chứng | Nguyên nhân | Xử lý |
|---|---|---|
| `getPayload` lỗi `reduce` | config chưa sanitize | bọc `sanitizeConfig((config as any)())` |
| SQLite treo / timeout | `/data` không tồn tại local | fallback `./khaithien_v3.db` |
| `pnpm install` báo native build fail | pnpm 11 bỏ qua build scripts | thêm `.npmrc` `dangerously-allow-all-builds=true` |
| `docker: command not found` / permission | sandbox không có dockerd | build trên VPS |
| Contact API timeout trên sandbox | RAM thấp, compile chậm | chạy trên VPS (RAM lớn) sẽ mượt |
| JSON parse error sau khi sửa dict | thiếu dấu phẩy/ngoặc | validate bằng `python3 -c "import json"` |
