#!/bin/sh
set -e

# 启动 cron 调度备份
cron

# 启动 Strapi
exec "$@"
