FROM node:22-slim AS base
ENV TZ=Asia/Shanghai

FROM base AS deps
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/cms/package.json ./apps/cms/

RUN pnpm install --frozen-lockfile

FROM base AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/cms/node_modules ./apps/cms/node_modules
COPY . .

RUN pnpm --filter cms build

FROM base AS runner
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN apt-get update && apt-get install -y sqlite3 cron && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/cms/package.json ./apps/cms/

RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/apps/cms/src ./apps/cms/src
COPY --from=builder /app/apps/cms/config ./apps/cms/config
COPY --from=builder /app/apps/cms/dist ./apps/cms/dist
COPY --from=builder /app/apps/cms/public ./apps/cms/public
COPY --from=builder /app/apps/cms/tsconfig.json ./apps/cms/tsconfig.json

COPY apps/cms/scripts/backup.sh /app/scripts/backup.sh
COPY apps/cms/scripts/crontab /etc/cron.d/backup-cron
COPY apps/cms/scripts/entrypoint.sh /app/scripts/entrypoint.sh
RUN chmod +x /app/scripts/backup.sh /app/scripts/entrypoint.sh \
  && chmod 0644 /etc/cron.d/backup-cron \
  && crontab /etc/cron.d/backup-cron

EXPOSE 1337

ENTRYPOINT ["/app/scripts/entrypoint.sh"]
CMD ["pnpm", "--filter", "cms", "start"]
