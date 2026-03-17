FROM node:22.17.1-bookworm AS base

RUN npm install -g corepack@latest
RUN corepack enable
RUN corepack prepare pnpm --activate

FROM base AS installer
WORKDIR /app
 
COPY pnpm-workspace.yaml ./
COPY package*json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY ./packages ./packages/

RUN pnpm install --frozen-lockfile

COPY ./packages/db ./packages/db/
COPY ./scripts/wait-db.cjs ./wait-db.cjs

CMD ["sh", "-c", "node ./wait-db.cjs && npm run migrate:up"]