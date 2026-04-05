# WebShop2

High-performance ecommerce engine built with Next.js App Router, TypeScript, Tailwind CSS, Supabase, and Stripe.

## What is included

- Modular storefront built with reusable UI components and client hooks.
- Server-side protected admin dashboard with product CRUD flow and order visibility.
- Scalable catalog schema with categories, options, option values, variants, and inventory tracking.
- Stripe Checkout session creation and webhook processing.
- Product page SEO with the Next.js Metadata API.
- Netlify-ready deployment configuration.

## Environment variables

Copy `.env.example` to `.env.local` for local development.

Required variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

Optional but recommended:

- `NEXT_PUBLIC_APP_URL`
  Use your canonical production domain. If it is not set, the app falls back to Netlify-provided deploy URLs.

## Local development

```bash
npm install
npm run dev
```

## Database and architecture

- Schema: [db/supabase/schema.sql](/C:/Users/balaz/Documents/CODEX/Webshop2/db/supabase/schema.sql)
- Architecture diagram: [docs/architecture.md](/C:/Users/balaz/Documents/CODEX/Webshop2/docs/architecture.md)
- Netlify deployment notes: [docs/netlify-deploy.md](/C:/Users/balaz/Documents/CODEX/Webshop2/docs/netlify-deploy.md)

## Netlify

This repository includes [netlify.toml](/C:/Users/balaz/Documents/CODEX/Webshop2/netlify.toml) with explicit Next.js build settings and Next.js skew protection enabled for deploys.

Secrets should be configured in the Netlify UI or CLI, not committed to the repository.
