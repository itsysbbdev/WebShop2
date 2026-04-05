import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AddToCartPanel } from "@/components/storefront/add-to-cart-panel";
import { Badge } from "@/components/ui/badge";
import { absoluteUrl, formatPrice } from "@/lib/utils";
import { getProductBySlug } from "@/lib/repositories/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Termék nem található"
    };
  }

  return {
    title: product.seoTitle ?? product.name,
    description: product.seoDescription ?? product.shortDescription,
    alternates: {
      canonical: absoluteUrl(`/products/${product.slug}`)
    },
    openGraph: {
      title: product.seoTitle ?? product.name,
      description: product.seoDescription ?? product.shortDescription,
      url: absoluteUrl(`/products/${product.slug}`),
      images: product.featuredImageUrl ? [{ url: product.featuredImageUrl }] : []
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr,0.9fr] lg:px-8">
      <section className="space-y-6">
        <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border/60 bg-muted">
          {product.featuredImageUrl ? (
            <Image src={product.featuredImageUrl} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          ) : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {product.variants.map((variant) => (
            <div key={variant.id} className="rounded-2xl border border-border/60 bg-card p-4">
              <p className="font-medium">{variant.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {variant.selections.map((selection) => `${selection.optionName}: ${selection.optionValue}`).join(" • ")}
              </p>
              <p className="mt-3 text-sm font-medium">{formatPrice(variant.price, product.currency)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        {product.category ? <Badge>{product.category.name}</Badge> : null}
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight">{product.name}</h1>
          <p className="text-lg text-muted-foreground">{product.shortDescription}</p>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold">{formatPrice(product.basePrice, product.currency)}</span>
            {product.compareAtPrice ? <span className="text-muted-foreground line-through">{formatPrice(product.compareAtPrice, product.currency)}</span> : null}
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-border/60 bg-card p-6">
          <h2 className="text-lg font-semibold">Leírás</h2>
          <p className="mt-3 whitespace-pre-line leading-7 text-muted-foreground">{product.description}</p>
        </div>
        <AddToCartPanel product={product} />
      </section>
    </main>
  );
}
