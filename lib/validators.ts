import { z } from "zod";

export const productVariantSelectionSchema = z.object({
  optionName: z.string().min(1),
  optionValue: z.string().min(1)
});

export const createProductVariantSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  price: z.number().nonnegative(),
  compareAtPrice: z.number().nullable().optional(),
  stockQuantity: z.number().int().nonnegative(),
  isDefault: z.boolean(),
  stripePriceId: z.string().nullable().optional(),
  selections: z.array(productVariantSelectionSchema)
});

export const createProductSchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional(),
  shortDescription: z.string().min(10),
  description: z.string().min(20),
  categorySlug: z.string().min(1),
  status: z.enum(["draft", "active", "archived"]),
  currency: z.string().min(3),
  basePrice: z.number().nonnegative(),
  compareAtPrice: z.number().nullable().optional(),
  trackInventory: z.boolean(),
  featuredImageUrl: z.union([z.string().url(), z.literal(""), z.null()]).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  variants: z.array(createProductVariantSchema).min(1)
});

export const updateStoreSettingsSchema = z.object({
  storeName: z.string().min(2),
  currency: z.string().min(3),
  taxRate: z.number().min(0),
  supportEmail: z.string().email(),
  locale: z.string().min(2)
});

export const cartItemSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
  slug: z.string().min(1),
  productName: z.string().min(1),
  variantName: z.string().min(1),
  imageUrl: z.string().nullable().optional(),
  sku: z.string().min(1),
  currency: z.string().min(3),
  unitPrice: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  maxQuantity: z.number().int().nonnegative(),
  selections: z.array(productVariantSelectionSchema)
});

export const checkoutPayloadSchema = z.object({
  email: z.string().email(),
  items: z.array(cartItemSchema).min(1)
});
