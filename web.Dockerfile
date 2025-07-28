FROM node:22.17.1-bookworm AS base

RUN npm install -g corepack@latest
RUN corepack enable
RUN corepack prepare pnpm --activate

FROM base AS installer
WORKDIR /app
 
COPY pnpm-workspace.yaml ./
COPY ./apps/web/package*json ./apps/web/tsconfig.json ./apps/web/
COPY package*json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

COPY ./apps/web ./apps/web/
RUN npm run web:build

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs

ARG PORT=3000
EXPOSE ${PORT}
ENV PORT=${PORT}
ENV HOSTNAME=0.0.0.0

CMD ["node", "apps/web/server.js"]