"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItem, Product, ProductVariant } from "@/types/domain";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clear: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((entry) => entry.variantId === item.variantId);

          if (!existing) {
            return {
              items: [...state.items, item]
            };
          }

          return {
            items: state.items.map((entry) =>
              entry.variantId === item.variantId
                ? {
                    ...entry,
                    quantity: Math.min(entry.quantity + item.quantity, entry.maxQuantity)
                  }
                : entry
            )
          };
        }),
      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((entry) => entry.variantId !== variantId)
        })),
      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items: state.items
            .map((entry) =>
              entry.variantId === variantId
                ? {
                    ...entry,
                    quantity: Math.max(1, Math.min(quantity, entry.maxQuantity))
                  }
                : entry
            )
            .filter((entry) => entry.quantity > 0)
        })),
      clear: () => set({ items: [] })
    }),
    {
      name: "webshop-cart"
    }
  )
);

export function createCartItem(product: Product, variant: ProductVariant): CartItem {
  return {
    productId: product.id,
    variantId: variant.id,
    slug: product.slug,
    productName: product.name,
    variantName: variant.name,
    imageUrl: variant.imageUrl ?? product.featuredImageUrl ?? null,
    sku: variant.sku,
    currency: product.currency,
    unitPrice: variant.price,
    quantity: 1,
    maxQuantity: variant.stockQuantity,
    selections: variant.selections
  };
}

export function useCart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clear = useCartStore((state) => state.clear);

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    subtotal,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clear
  };
}
