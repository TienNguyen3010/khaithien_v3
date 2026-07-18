# Chạy Khải Thiên v3 bằng Docker

Website được đóng gói sẵn Docker. Sau khi copy source lên server (có Docker),
chỉ cần vài lệnh là chạy được — không cần cài Node/pnpm trên server.

## Yêu cầu trên server
- Docker Engine 24+ và docker compose v2 (hoặc Docker Desktop)
- Port 3000 còn trống (đổi trong `docker-compose.yml` nếu muốn)

## 1. Chuẩn bị env
Tạo file `.env` (cùng cấp với `docker-compose.yml`) và điền:

```
PAYLOAD_SECRET=<một chuỗi ngẫu nhiên 32+ ký tự, giữ bí mật>
DATABASE_URL=            # để trống -> dùng SQLite trên volume /data
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Sinh secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

> Production với Postgres: đặt `DATABASE_URL=postgres://user:pass@host:5432/dbname`.

## 2. Build & chạy
```bash
docker compose build
docker compose up -d
```
Mở: http://localhost:3000 (hoặc domain trỏ về server).

## 3. Dữ liệu bền vững
- SQLite DB nằm tại `./data/khaithien_v3.db` trên host (mount vào `/data` trong container).
- Copy thư mục `data/` cùng source là mang được toàn bộ nội dung CMS sang server khác.

## 4. Seed dữ liệu demo (tuỳ chọn)
```bash
docker compose exec web pnpm tsx scripts/seed.ts
```

## 5. Dừng / log
```bash
docker compose down          # dừng (giữ data/)
docker compose logs -f web   # xem log
```

## Lưu ý
- Admin CMS chưa được wire-up (bản `@payloadcms/next@3.86.0` thiếu admin runtime).
  Nhập nội dung tạm thời qua seed script hoặc Payload API cho đến khi xử lý xong Admin.
- `docker-compose.yml` đọc biến từ `.env`; file `.env` đã được gitignore (không commit secret).
