import Link from "next/link";

import { CategoryStrip } from "@/components/storefront/category-strip";
import { ProductGrid } from "@/components/storefront/product-grid";
import { buttonVariants } from "@/components/ui/button";
import { getCategories, getFeaturedProducts } from "@/lib/repositories/products";
import { getStoreSettings } from "@/lib/repositories/settings";

export default async function HomePage() {
  const [categories, products, settings] = await Promise.all([getCategories(), getFeaturedProducts(), getStoreSettings()]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 rounded-[2rem] border border-border/60 bg-card/90 p-8 shadow-soft lg:grid-cols-[1.4fr,0.8fr] lg:p-12">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
            Next.js + Supabase + Stripe
          </span>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Egyedi webshop motor WooCommerce helyett, tiszta architektúrával.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Moduláris storefront, szerveroldalon védett admin felület, Stripe checkout és skálázható variációs adatmodell egyetlen Next.js kódbázisban.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#featured-products" className={buttonVariants()}>
              Kiemelt termékek
            </a>
            <Link href="/admin" className={buttonVariants({ variant: "outline" })}>
              Admin dashboard
            </Link>
          </div>
          <CategoryStrip categories={categories} />
        </div>
        <div className="grid gap-4 rounded-[1.5rem] bg-muted/70 p-6">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Store settings</p>
            <p className="mt-2 text-2xl font-semibold">{settings.storeName}</p>
          </div>
          <div className="grid gap-3 text-sm text-muted-foreground">
            <div className="flex justify-between rounded-xl bg-background/80 px-4 py-3">
              <span>Valuta</span>
              <span className="font-medium text-foreground">{settings.currency}</span>
            </div>
            <div className="flex justify-between rounded-xl bg-background/80 px-4 py-3">
              <span>Adókulcs</span>
              <span className="font-medium text-foreground">{settings.taxRate}%</span>
            </div>
            <div className="flex justify-between rounded-xl bg-background/80 px-4 py-3">
              <span>Support</span>
              <span className="font-medium text-foreground">{settings.supportEmail}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-products" className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Katalógus</p>
          <h2 className="text-3xl font-semibold tracking-tight">Kiemelt termékek</h2>
        </div>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
