#!/bin/sh
set -eu

DB_DIR="/app/apps/cms/data"
UPLOADS_DIR="/app/apps/cms/public/uploads"
BACKUP_DIR="${BACKUP_DIR:-$DB_DIR/backups}"
MODE="${1:-hourly}"

mkdir -p "$BACKUP_DIR"

DATE=$(date +%Y-%m-%d_%H-%M)
BACKUP_FILE="$BACKUP_DIR/${DATE}_${MODE}.tar.gz"

# 临时目录用于组装备份内容
TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

# 备份数据库（使用 sqlite3 .backup 做原子备份，避免并发写入导致损坏）
DB_FILE="$DB_DIR/data.db"
if [ -f "$DB_FILE" ]; then
  sqlite3 "$DB_FILE" ".backup '$TMP_DIR/data.sqlite3'"
  echo "Database backup ready"
else
  echo "Database file not found: $DB_FILE, skipping"
fi

# 备份上传文件
if [ -d "$UPLOADS_DIR" ]; then
  cp -a "$UPLOADS_DIR" "$TMP_DIR/uploads"
  echo "Uploads backup ready"
else
  echo "Uploads directory not found: $UPLOADS_DIR, skipping"
fi

# 打包压缩
tar -czf "$BACKUP_FILE" -C "$TMP_DIR" .
echo "Backup created: $BACKUP_FILE ($(du -h "$BACKUP_FILE" | cut -f1))"

# 清理过期备份
case "$MODE" in
  hourly)
    find "$BACKUP_DIR" -maxdepth 1 -name '*_hourly.tar.gz' -mmin +720 -delete
    echo "Cleaned up hourly backups older than 12 hours"
    ;;
  daily)
    find "$BACKUP_DIR" -maxdepth 1 -name '*_daily.tar.gz' -mtime +7 -delete
    echo "Cleaned up daily backups older than 7 days"
    ;;
  monthly)
    find "$BACKUP_DIR" -maxdepth 1 -name '*_monthly.tar.gz' -mtime +180 -delete
    echo "Cleaned up monthly backups older than 6 months"
    ;;
  yearly)
    echo "Yearly backup created (kept forever)"
    ;;
esac
