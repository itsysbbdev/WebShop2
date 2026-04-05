import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { Category } from "@/types/domain";

export function CategoryStrip({ categories }: { categories: Category[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.slug}`}>
          <Badge className="bg-background px-4 py-2 text-sm text-foreground ring-1 ring-border">
            {category.name}
          </Badge>
        </Link>
      ))}
    </div>
  );
}
