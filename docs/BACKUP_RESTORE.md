# Backup & Restore — Khải Thiên v3 (SQLite trên volume /data)

DB nằm tại `./data/khaithien_v3.db` trên host (mount vào `/data` trong container).
Vì dùng SQLite file đơn, backup = copy file; restore = copy ngược lại.

## 1) BACKUP (trên server đang chạy)
```bash
cd ~/khaithien_v3
# Tạm dừng container để tránh ghi lệch khi copy (an toàn tuyệt đối)
docker compose stop web
cp data/khaithien_v3.db backup-$(date +%Y%m%d-%H%M%S).db
docker compose start web

# Hoặc backup tự động mỗi ngày (crontab -e):
# 0 3 * * *  cd /root/khaithien_v3 && docker compose stop web && cp data/khaithien_v3.db /backups/kt-$(date +\%F).db && docker compose start web
```

## 2) COPY sang server/ten khác
```bash
# Từ server A:
scp data/khaithien_v3.db root@SERVER_B_IP:~/khaithien_v3/data/khaithien_v3.db

# Hoặc nén rồi chuyển:
tar -czf kt-db.tar.gz data/khaithien_v3.db
scp kt-db.tar.gz root@SERVER_B_IP:~/
```

## 3) RESTORE (trên server đích)
```bash
cd ~/khaithien_v3
docker compose stop web
# Copy file DB vào đúng chỗ:
cp ~/khaithien_v3.db data/khaithien_v3.db
# hoặc giải nén:  tar -xzf kt-db.tar.gz -C ./
docker compose start web
```
Mở web kiểm tra — toàn bộ services/projects/articles/contact đã có.

## 4) Nếu dùng Postgres (production DATABASE_URL)
```bash
docker compose exec web \
  pnpm payload migrate:status   # kiểm tra trạng thái migration
# Hoặc dump/restore bằng pg_dump trên host Postgres (không nằm trong container này).
```

## Lưu ý
- Luôn `docker compose stop web` trước khi copy DB để tránh file bị ghi lệch (corrupt).
- File `.db` KHÔNG được commit vào git (đã nằm trong .gitignore).
- Volume `./data` là nguồn chân lý — backup thư mục này là đủ.
