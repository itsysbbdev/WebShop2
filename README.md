# Webshop2

Next.js App Router alapú, moduláris webshop motor Supabase és Stripe architektúrával, amelyet WooCommerce kiváltására terveztünk.

## Főbb elemek

- Dinamikus termékoldalak Metadata API támogatással.
- Skálázható termékvariációs adatmodell méret és szín kombinációkhoz.
- Szigorúan szerveroldalon védett admin dashboard.
- Stripe Checkout Session és webhook feldolgozás.
- Supabase Auth alapú Google OAuth integrációs minta.

## Környezeti változók

Másold át a `.env.example` fájl kulcsait a saját `.env.local` fájlodba:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Fázisok

1. Adatmodell: [db/supabase/schema.sql](/C:/Users/balaz/Documents/CODEX/Webshop2/db/supabase/schema.sql)
2. Admin UI: [app/admin/page.tsx](/C:/Users/balaz/Documents/CODEX/Webshop2/app/admin/page.tsx)
3. Stripe: [app/api/checkout/route.ts](/C:/Users/balaz/Documents/CODEX/Webshop2/app/api/checkout/route.ts) és [app/api/stripe/webhook/route.ts](/C:/Users/balaz/Documents/CODEX/Webshop2/app/api/stripe/webhook/route.ts)
4. Architektúra: [docs/architecture.md](/C:/Users/balaz/Documents/CODEX/Webshop2/docs/architecture.md)

## Indítás

```bash
npm install
npm run dev
```
