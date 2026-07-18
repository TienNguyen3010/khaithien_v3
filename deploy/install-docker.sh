#!/usr/bin/env bash
# =============================================================================
# Cài đặt Docker Engine (dockerd + daemon + compose plugin) trên VPS Debian/Ubuntu
# Chạy:  sudo ./deploy/install-docker.sh
# =============================================================================
set -euo pipefail

if [[ $EUID -ne 0 ]]; then
  echo -e "\033[1;31m[error]\033[0m Hãy chạy với quyền root:  sudo $0" >&2
  exit 1
fi

echo -e "\033[1;32m[install-docker]\033[0m Đang cài Docker Engine..."

if command -v docker >/dev/null 2>&1; then
  echo "[install-docker] Docker đã có: $(docker -v)"
else
  # Cài bản chính thức (bao gồm dockerd + containerd + daemon)
  curl -fsSL https://get.docker.com | sh
fi

# Đảm bảo daemon chạy và tự khởi động cùng hệ thống
systemctl enable --now docker

# Plugin compose (docker compose v2)
if ! docker compose version >/dev/null 2>&1; then
  apt-get update -y
  apt-get install -y docker-compose-plugin
fi

echo -e "\033[1;32m[install-docker]\033[0m Hoàn tất:"
docker --version
docker compose version
echo -e "\033[1;32m[install-docker]\033[0m dockerd đang chạy: $(systemctl is-active docker)"
