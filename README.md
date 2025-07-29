# Akselerasi AI Take Home Test

https://akselerasi-ai.fahrezy.work

## Apps

### web

The interface for input and see the lead data in database.

The project structure is described below:

```bash
/web/src
|____/app/                      # the Next.js page and API routes
|____/components/               # app or global component that doesn't relate to domain
|______/[component-name].tsx    # component name in kebab-case
|______/ui/[component-name].tsx # omponents from shadcn/ui
|____/features                  # the app domain(s)
|______/[name]                  # domain name
|________/actions/              # Next.js / React server actions that relate to domain
|________/components/           # components that relate to domain
|________/lib/                  # utils or helper that relate to domain
|________/schemas.ts            # domain object
|________/types.ts              # domain type
|____/lib                       # global utils or helper that doesn't relate to domain
|______/[name]                  # group of utils or helper
```

### cron

Used for background process for scraping data from SEO service to enrich lead data. It only process unfinished lead data (marked by some status)

## Packages

### db

This is package used by both `web` and `cron` apps to perform opration to the database.

The motivation use independent package instead of setup on each apps is because all apps will access the same database. We are able to only maintain one part of project that used to all apps, intead of each apps manage database related code.

This package also could treated as repository

## Development

### Setup environment variable

Create `.env` for each apps, use `.env.example` on each apps for quick start.

```bash
# cd apps/cron
cp .env.example .env

# cd apps/web
cp .env.example .env
```

### Install dependencies

```bash
# on project root
pnpm install
```

### Run database migration

```bash
# on project root
npm run migrate:up
```

### Run the app

```bash
# Run development for the `web` app
npm run web:dev

# Run development for the `cron` app
npm run cron:dev
```
