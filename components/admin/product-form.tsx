"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useProductForm } from "@/hooks/use-product-form";
import type { Category, StoreSettings } from "@/types/domain";

const defaultVariantsJson = JSON.stringify(
  [
    {
      name: "Fekete / M",
      sku: "SKU-BLK-M",
      price: 26990,
      compareAtPrice: null,
      stockQuantity: 15,
      isDefault: true,
      stripePriceId: null,
      selections: [
        { optionName: "Szín", optionValue: "Fekete" },
        { optionName: "Méret", optionValue: "M" }
      ]
    }
  ],
  null,
  2
);

export function ProductForm({ categories, settings }: { categories: Category[]; settings: StoreSettings }) {
  const form = useProductForm({
    name: "",
    slug: "",
    shortDescription: "",
    description: "",
    categorySlug: categories[0]?.slug ?? "",
    status: "active",
    currency: settings.currency,
    basePrice: "",
    compareAtPrice: "",
    trackInventory: true,
    featuredImageUrl: "",
    seoTitle: "",
    seoDescription: "",
    variantsJson: defaultVariantsJson
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Új termék</CardTitle>
        <CardDescription>Shadcn stílusú admin form, ahol a variációk JSON tömbként adhatók meg a gyors indításhoz.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="product-name">Név</Label>
            <Input id="product-name" value={form.values.name} onChange={(event) => form.updateValue("name", event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-slug">Slug</Label>
            <Input id="product-slug" value={form.values.slug} onChange={(event) => form.updateValue("slug", event.target.value)} placeholder="auto-generált ha üres" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="product-category">Kategória</Label>
            <Select id="product-category" value={form.values.categorySlug} onChange={(event) => form.updateValue("categorySlug", event.target.value)}>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-status">Állapot</Label>
            <Select id="product-status" value={form.values.status} onChange={(event) => form.updateValue("status", event.target.value as "draft" | "active" | "archived")}>
              <option value="active">active</option>
              <option value="draft">draft</option>
              <option value="archived">archived</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-currency">Valuta</Label>
            <Input id="product-currency" value={form.values.currency} onChange={(event) => form.updateValue("currency", event.target.value)} />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="product-base-price">Alapár</Label>
            <Input id="product-base-price" type="number" value={form.values.basePrice} onChange={(event) => form.updateValue("basePrice", event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-compare-price">Akció előtti ár</Label>
            <Input id="product-compare-price" type="number" value={form.values.compareAtPrice} onChange={(event) => form.updateValue("compareAtPrice", event.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="product-short-description">Rövid leírás</Label>
          <Textarea id="product-short-description" value={form.values.shortDescription} onChange={(event) => form.updateValue("shortDescription", event.target.value)} className="min-h-[90px]" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="product-description">Hosszú leírás</Label>
          <Textarea id="product-description" value={form.values.description} onChange={(event) => form.updateValue("description", event.target.value)} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="product-image">Kiemelt kép URL</Label>
            <Input id="product-image" value={form.values.featuredImageUrl} onChange={(event) => form.updateValue("featuredImageUrl", event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-seo-title">SEO cím</Label>
            <Input id="product-seo-title" value={form.values.seoTitle} onChange={(event) => form.updateValue("seoTitle", event.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="product-seo-description">SEO leírás</Label>
          <Textarea id="product-seo-description" value={form.values.seoDescription} onChange={(event) => form.updateValue("seoDescription", event.target.value)} className="min-h-[90px]" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="product-variants">Variációk JSON</Label>
          <Textarea id="product-variants" value={form.values.variantsJson} onChange={(event) => form.updateValue("variantsJson", event.target.value)} className="min-h-[220px] font-mono text-xs" />
        </div>
        <div className="flex items-center gap-3">
          <input
            id="product-track-inventory"
            type="checkbox"
            checked={form.values.trackInventory}
            onChange={(event) => form.updateValue("trackInventory", event.target.checked)}
            className="h-4 w-4 rounded border-border"
          />
          <Label htmlFor="product-track-inventory">Készletkövetés variáció szinten</Label>
        </div>
        <Button onClick={() => form.submit()} disabled={form.isSubmitting}>
          {form.isSubmitting ? "Mentés..." : "Termék létrehozása"}
        </Button>
        {form.error ? <p className="text-sm text-red-600">{form.error}</p> : null}
        {form.success ? <p className="text-sm text-emerald-700">{form.success}</p> : null}
      </CardContent>
    </Card>
  );
}
