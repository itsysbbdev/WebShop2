import { randomUUID } from "node:crypto";

import { hasSupabaseAdminConfig, hasSupabaseConfig } from "@/lib/env";
import { mockCategories, mockProducts } from "@/lib/data/mock-store";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import type { CreateProductInput, Product, ProductVariant } from "@/types/domain";

function mapVariantRow(row: any): ProductVariant {
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    price: Number(row.price ?? 0),
    compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : null,
    stockQuantity: Number(row.stock_quantity ?? 0),
    isDefault: Boolean(row.is_default),
    isActive: Boolean(row.is_active),
    stripePriceId: row.stripe_price_id ?? null,
    imageUrl: row.image_url ?? null,
    selections: (row.product_variant_option_values ?? []).map((entry: any) => ({
      optionName: entry.product_option_values?.product_options?.name ?? "Option",
      optionValue: entry.product_option_values?.value ?? ""
    }))
  };
}

function mapProductRow(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description ?? "",
    description: row.description ?? "",
    status: row.status ?? "draft",
    currency: row.currency ?? "HUF",
    basePrice: Number(row.base_price ?? 0),
    compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : null,
    category: row.categories
      ? {
          id: row.categories.id,
          slug: row.categories.slug,
          name: row.categories.name,
          description: row.categories.description ?? "",
          parentId: row.categories.parent_id ?? null
        }
      : null,
    trackInventory: Boolean(row.track_inventory),
    featuredImageUrl: row.featured_image_url ?? row.product_images?.[0]?.url ?? null,
    seoTitle: row.seo_title ?? null,
    seoDescription: row.seo_description ?? null,
    images: (row.product_images ?? [])
      .sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0))
      .map((image: any) => ({
        id: image.id,
        url: image.url,
        alt: image.alt_text ?? row.name,
        position: image.position ?? 0
      })),
    variants: (row.product_variants ?? []).map(mapVariantRow)
  };
}

function buildDemoProduct(input: CreateProductInput): Product {
  const category = mockCategories.find((item) => item.slug === input.categorySlug) ?? mockCategories[0];

  return {
    id: randomUUID(),
    slug: input.slug || slugify(input.name),
    name: input.name,
    shortDescription: input.shortDescription,
    description: input.description,
    status: input.status,
    currency: input.currency,
    basePrice: input.basePrice,
    compareAtPrice: input.compareAtPrice ?? null,
    category,
    trackInventory: input.trackInventory,
    featuredImageUrl: input.featuredImageUrl ?? null,
    seoTitle: input.seoTitle ?? input.name,
    seoDescription: input.seoDescription ?? input.shortDescription,
    images: input.featuredImageUrl
      ? [
          {
            id: randomUUID(),
            url: input.featuredImageUrl,
            alt: input.name,
            position: 0
          }
        ]
      : [],
    variants: input.variants.map((variant) => ({
      id: randomUUID(),
      sku: variant.sku,
      name: variant.name,
      price: variant.price,
      compareAtPrice: variant.compareAtPrice ?? null,
      stockQuantity: variant.stockQuantity,
      isDefault: variant.isDefault,
      isActive: true,
      stripePriceId: variant.stripePriceId ?? null,
      selections: variant.selections,
      imageUrl: input.featuredImageUrl ?? null
    }))
  };
}

async function fetchProductsFromSupabase() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        slug,
        name,
        description,
        parent_id
      ),
      product_images (
        id,
        url,
        alt_text,
        position
      ),
      product_variants (
        *,
        product_variant_option_values (
          option_value_id,
          product_option_values (
            value,
            product_options (
              name
            )
          )
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapProductRow);
}

export async function getAllProducts(options?: { includeDrafts?: boolean }) {
  if (!hasSupabaseConfig()) {
    return mockProducts.filter((product) => options?.includeDrafts || product.status === "active");
  }

  const products = await fetchProductsFromSupabase();
  return products.filter((product) => options?.includeDrafts || product.status === "active");
}

export async function getFeaturedProducts(limit = 3) {
  const products = await getAllProducts();
  return products.slice(0, limit);
}

export async function getCategories() {
  if (!hasSupabaseConfig()) {
    return mockCategories;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, name, description, parent_id")
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
    parentId: row.parent_id ?? null
  }));
}

export async function getProductBySlug(slug: string) {
  const products = await getAllProducts({ includeDrafts: true });
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getProductsByCategorySlug(categorySlug: string) {
  const products = await getAllProducts();
  return products.filter((product) => product.category?.slug === categorySlug);
}

export async function createProduct(input: CreateProductInput) {
  if (!hasSupabaseAdminConfig()) {
    return {
      product: buildDemoProduct(input),
      persisted: false
    };
  }

  const supabase = createSupabaseAdminClient();
  const slug = input.slug || slugify(input.name);
  const { data: categoryRow } = await supabase.from("categories").select("id").eq("slug", input.categorySlug).maybeSingle();

  const { data: productRow, error: productError } = await supabase
    .from("products")
    .insert({
      slug,
      name: input.name,
      short_description: input.shortDescription,
      description: input.description,
      status: input.status,
      currency: input.currency,
      base_price: input.basePrice,
      compare_at_price: input.compareAtPrice ?? null,
      category_id: categoryRow?.id ?? null,
      track_inventory: input.trackInventory,
      featured_image_url: input.featuredImageUrl ?? null,
      seo_title: input.seoTitle ?? input.name,
      seo_description: input.seoDescription ?? input.shortDescription
    })
    .select("*")
    .single();

  if (productError || !productRow) {
    throw productError ?? new Error("Unable to create product.");
  }

  if (input.featuredImageUrl) {
    await supabase.from("product_images").insert({
      product_id: productRow.id,
      url: input.featuredImageUrl,
      alt_text: input.name,
      position: 0
    });
  }

  const optionKeyToId = new Map<string, string>();
  const optionValueKeyToId = new Map<string, string>();

  for (const selection of input.variants.flatMap((variant) => variant.selections)) {
    if (!optionKeyToId.has(selection.optionName)) {
      const { data: optionRow, error: optionError } = await supabase
        .from("product_options")
        .insert({
          product_id: productRow.id,
          name: selection.optionName
        })
        .select("id, name")
        .single();

      if (optionError || !optionRow) {
        throw optionError ?? new Error("Unable to create product option.");
      }

      optionKeyToId.set(selection.optionName, optionRow.id);
    }

    const valueKey = `${selection.optionName}:${selection.optionValue}`;

    if (!optionValueKeyToId.has(valueKey)) {
      const { data: valueRow, error: valueError } = await supabase
        .from("product_option_values")
        .insert({
          option_id: optionKeyToId.get(selection.optionName),
          value: selection.optionValue,
          label: selection.optionValue
        })
        .select("id")
        .single();

      if (valueError || !valueRow) {
        throw valueError ?? new Error("Unable to create product option value.");
      }

      optionValueKeyToId.set(valueKey, valueRow.id);
    }
  }

  for (const variant of input.variants) {
    const { data: variantRow, error: variantError } = await supabase
      .from("product_variants")
      .insert({
        product_id: productRow.id,
        sku: variant.sku,
        name: variant.name,
        price: variant.price,
        compare_at_price: variant.compareAtPrice ?? null,
        stock_quantity: variant.stockQuantity,
        is_default: variant.isDefault,
        is_active: true,
        stripe_price_id: variant.stripePriceId ?? null,
        image_url: input.featuredImageUrl ?? null
      })
      .select("id")
      .single();

    if (variantError || !variantRow) {
      throw variantError ?? new Error("Unable to create product variant.");
    }

    const joinRows = variant.selections.map((selection) => ({
      variant_id: variantRow.id,
      option_value_id: optionValueKeyToId.get(`${selection.optionName}:${selection.optionValue}`)
    }));

    if (joinRows.length > 0) {
      const { error: joinError } = await supabase.from("product_variant_option_values").insert(joinRows);

      if (joinError) {
        throw joinError;
      }
    }
  }

  const product = await getProductBySlug(slug);

  return {
    product: product ?? buildDemoProduct(input),
    persisted: true
  };
}
