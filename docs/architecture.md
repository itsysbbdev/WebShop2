# Webshop Engine Architecture

```mermaid
flowchart LR
    Shopper["Vásárló böngésző"] --> NextApp["Next.js App Router UI"]
    Admin["Admin böngésző"] --> NextApp
    NextApp --> Storefront["Storefront Server Components"]
    NextApp --> AdminSSR["Admin SSR + Role Guard"]
    NextApp --> CartState["Zustand Cart Hook"]
    Storefront --> Metadata["Next Metadata API"]
    AdminSSR --> AuthGuard["Supabase session + public.users role check"]
    NextApp --> ApiRoutes["Route Handlers"]
    ApiRoutes --> Checkout["Stripe Checkout Session API"]
    ApiRoutes --> Webhook["Stripe Webhook Handler"]
    ApiRoutes --> AdminApi["Admin Product / Settings API"]
    Checkout --> Stripe["Stripe Platform"]
    Stripe --> Webhook
    NextApp --> Repo["Repository Layer"]
    AdminApi --> Repo
    Checkout --> Repo
    Webhook --> Repo
    Repo --> Supabase["Supabase Postgres + Auth + RLS"]
    Supabase --> Catalog["Products / Categories / Variants"]
    Supabase --> Orders["Orders / Order Items"]
    Supabase --> Users["Auth Users + public.users"]
    Supabase --> Settings["Store Settings"]
```

## Fő döntések

- A nézet és üzleti logika szét van választva: a UI komponensek a `components/` alatt, az állapot és kliens oldali logika a `hooks/` és `lib/repositories/` rétegekben kap helyet.
- Az admin felület védelme szerveroldalon történik a `requireAdmin()` ellenőrzéssel, ami Supabase sessionből és a `public.users.role` mezőből dolgozik.
- A Stripe kulcsok és az adatbázis kulcsok kizárólag környezeti változókból olvashatók.
- A termékmodell külön kezeli a `product_options`, `product_option_values`, `product_variants` és `product_variant_option_values` táblákat, ezért a méret és szín jellegű kombinációk jól skálázhatók.
- A webhook Node.js runtime-on fut, mert a Stripe aláírás ellenőrzéséhez nyers request body szükséges.
