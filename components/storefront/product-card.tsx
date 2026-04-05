import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/domain";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group">
      <Card className="overflow-hidden border-border/60 transition-transform duration-300 group-hover:-translate-y-1">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {product.featuredImageUrl ? (
            <Image
              src={product.featuredImageUrl}
              alt={product.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : null}
        </div>
        <CardContent className="space-y-3 p-5">
          {product.category ? <Badge>{product.category.name}</Badge> : null}
          <div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{product.shortDescription}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold">{formatPrice(product.basePrice, product.currency)}</span>
            {product.compareAtPrice ? (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product.compareAtPrice, product.currency)}</span>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
