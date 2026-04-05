"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { createCartItem, useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/domain";

export function AddToCartPanel({ product }: { product: Product }) {
  const initialVariant = useMemo(() => product.variants.find((variant) => variant.isDefault) ?? product.variants[0], [product.variants]);
  const [selectedVariantId, setSelectedVariantId] = useState(initialVariant?.id ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const { addItem } = useCart();

  const selectedVariant = product.variants.find((variant) => variant.id === selectedVariantId) ?? initialVariant;

  if (!selectedVariant) {
    return null;
  }

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle>Vásárlás</CardTitle>
        <CardDescription>Válassz variációt, majd add hozzá a kosárhoz.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <span className="text-sm font-medium">Variáció</span>
          <Select value={selectedVariantId} onChange={(event) => setSelectedVariantId(event.target.value)}>
            {product.variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.name} • {formatPrice(variant.price, product.currency)}
              </option>
            ))}
          </Select>
        </div>
        <div className="rounded-xl bg-muted/60 p-4 text-sm">
          <div className="flex justify-between">
            <span>Készlet</span>
            <span>{selectedVariant.stockQuantity} db</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span>SKU</span>
            <span>{selectedVariant.sku}</span>
          </div>
        </div>
        <Button
          className="w-full"
          onClick={() => {
            addItem(createCartItem(product, selectedVariant));
            setMessage("A termék bekerült a kosárba.");
          }}
        >
          Kosárba rakom
        </Button>
        {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
      </CardContent>
    </Card>
  );
}
