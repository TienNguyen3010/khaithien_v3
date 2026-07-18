#!/usr/bin/env bash
# =============================================================================
# Khải Thiên v3 — Automated deploy script (chạy trên VPS, quyền root)
# =============================================================================
# Cách dùng:
#   sudo ./deploy.sh                 # cài Docker (nếu thiếu), build & chạy :3000
#   sudo ./deploy.sh --nginx DOMAIN  # thêm Nginx + Let's Encrypt SSL cho DOMAIN
#   sudo ./deploy.sh --nginx DOMAIN --email you@mail.com
#
# Yêu cầu: Debian/Ubuntu, chạy từ thư mục gốc dự án (nơi có docker-compose.yml).
# =============================================================================
set -euo pipefail

log() { echo -e "\033[1;32m[deploy]\033[0m $*"; }
err() { echo -e "\033[1;31m[error]\033[0m $*" >&2; }

DOMAIN=""; EMAIL=""; WITH_NGINX=0
while [[ $# -gt 0 ]]; do
  case "$1" in
    --nginx) WITH_NGINX=1; DOMAIN="${2:-}"; shift 2;;
    --email) EMAIL="${2:-}"; shift 2;;
    -h|--help) sed -n '2,14p' "$0"; exit 0;;
    *) err "Tham số không hiểu: $1"; exit 1;;
  esac
done

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

# 1) Cần quyền root
if [[ $EUID -ne 0 ]]; then
  err "Hãy chạy script với quyền root:  sudo ./deploy.sh ..."
  exit 1
fi

# 2) Cài Docker nếu chưa có
if ! command -v docker >/dev/null 2>&1; then
  log "Đang cài đặt Docker..."
  curl -fsSL https://get.docker.com | sh
  systemctl enable --now docker
else
  log "Docker đã có sẵn: $(docker -v)"
fi
if ! docker compose version >/dev/null 2>&1; then
  log "Cài docker-compose-plugin..."
  apt-get update -y && apt-get install -y docker-compose-plugin
fi

# 3) Tạo .env (KHÔNG ghi đè nếu đã có secret)
if [[ ! -f .env ]]; then
  SECRET="$(openssl rand -hex 32)"
  cat > .env <<EOF
PAYLOAD_SECRET=$SECRET
DATABASE_URL=
NEXT_PUBLIC_SITE_URL=${DOMAIN:+https://$DOMAIN}
EOF
  log "Đã tạo .env (PAYLOAD_SECRET ngẫu nhiên, an toàn)."
else
  log ".env đã tồn tại — giữ nguyên, không ghi đè."
fi

# 4) Build & chạy container
log "Build Docker image (lần đầu có thể mất vài phút)..."
docker compose build
log "Khởi chạy container..."
docker compose up -d
sleep 3
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/vi | grep -q 200; then
  log "✅ Web chạy OK tại http://localhost:3000"
else
  log "⚠️  Web chưa phản hồi 200 — xem log: docker compose logs -f web"
fi

# 5) (Tuỳ chọn) Nginx + Let's Encrypt SSL
if [[ $WITH_NGINX -eq 1 ]]; then
  if [[ -z "$DOMAIN" ]]; then err "--nginx cần truyền DOMAIN"; exit 1; fi
  if [[ -z "$EMAIL" ]]; then read -rp "Email nhận thông báo SSL (Let's Encrypt): " EMAIL; fi
  log "Cài đặt Nginx + Certbot cho $DOMAIN ..."
  apt-get update -y
  apt-get install -y nginx certbot python3-certbot-nginx
  sed "s/__DOMAIN__/$DOMAIN/g" deploy/nginx-khaithien.conf > /etc/nginx/sites-available/khaithien_v3
  ln -sf /etc/nginx/sites-available/khaithien_v3 /etc/nginx/sites-enabled/khaithien_v3
  rm -f /etc/nginx/sites-enabled/default
  nginx -t && systemctl reload nginx
  certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect
  log "🎉 Xong! Truy cập: https://$DOMAIN"
fi

log "Hoàn tất."
