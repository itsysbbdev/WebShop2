import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ProductGrid } from "@/components/storefront/product-grid";
import { getCategories, getProductsByCategorySlug } from "@/lib/repositories/products";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((entry) => entry.slug === slug);

  return {
    title: category ? `${category.name} kategória` : "Kategória"
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((entry) => entry.slug === slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategorySlug(slug);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Kategória</p>
        <h1 className="text-4xl font-semibold tracking-tight">{category.name}</h1>
        <p className="max-w-2xl text-muted-foreground">{category.description}</p>
      </div>
      <ProductGrid products={products} />
    </main>
  );
}
