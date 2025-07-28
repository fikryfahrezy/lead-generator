FROM node:22.17.1-bookworm AS base

RUN npm install -g corepack@latest
RUN corepack enable
RUN corepack prepare pnpm --activate

FROM base AS installer
WORKDIR /app
 
COPY pnpm-workspace.yaml ./
COPY package*json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY ./apps/cron/package*json ./apps/cron/tsconfig.json ./apps/cron/
COPY ./packages ./packages/

RUN pnpm install --frozen-lockfile

COPY . .
RUN npm run cron:build

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 cron

COPY --from=installer --chown=cron:nodejs /app/node_modules /app/node_modules
COPY --from=installer --chown=cron:nodejs /app/package.json /app/package.json

COPY --from=installer --chown=cron:nodejs /app/apps/cron/node_modules /app/apps/cron/node_modules
COPY --from=installer --chown=cron:nodejs /app/apps/cron/package.json /app/apps/cron/package.json
COPY --from=installer --chown=cron:nodejs /app/apps/cron/dist /app/apps/cron/dist

USER cron

CMD ["node", "apps/cron/dist/index.js"]