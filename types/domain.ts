export type AppRole = "customer" | "admin";
export type ProductStatus = "draft" | "active" | "archived";
export type OrderStatus = "draft" | "pending_payment" | "paid" | "fulfilled" | "cancelled" | "refunded";

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  parentId?: string | null;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  position?: number;
}

export interface ProductVariantSelection {
  optionName: string;
  optionValue: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  stockQuantity: number;
  isDefault: boolean;
  isActive: boolean;
  stripePriceId?: string | null;
  imageUrl?: string | null;
  selections: ProductVariantSelection[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  status: ProductStatus;
  currency: string;
  basePrice: number;
  compareAtPrice?: number | null;
  category?: Category | null;
  trackInventory: boolean;
  featuredImageUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  images: ProductImage[];
  variants: ProductVariant[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  slug: string;
  productName: string;
  variantName: string;
  imageUrl?: string | null;
  sku: string;
  currency: string;
  unitPrice: number;
  quantity: number;
  maxQuantity: number;
  selections: ProductVariantSelection[];
}

export interface StoreSettings {
  storeName: string;
  currency: string;
  taxRate: number;
  supportEmail: string;
  locale: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string | null;
  productName: string;
  variantName?: string | null;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  email: string;
  status: OrderStatus;
  currency: string;
  subtotal: number;
  taxTotal: number;
  shippingTotal: number;
  grandTotal: number;
  items: OrderItem[];
  createdAt: string;
  paidAt?: string | null;
}

export interface AuthUserProfile {
  id: string;
  email: string;
  fullName: string;
  role: AppRole;
  avatarUrl?: string | null;
}

export interface CreateProductVariantInput {
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number | null;
  stockQuantity: number;
  isDefault: boolean;
  stripePriceId?: string | null;
  selections: ProductVariantSelection[];
}

export interface CreateProductInput {
  name: string;
  slug?: string;
  shortDescription: string;
  description: string;
  categorySlug: string;
  status: ProductStatus;
  currency: string;
  basePrice: number;
  compareAtPrice?: number | null;
  trackInventory: boolean;
  featuredImageUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  variants: CreateProductVariantInput[];
}

export interface UpdateStoreSettingsInput {
  storeName: string;
  currency: string;
  taxRate: number;
  supportEmail: string;
  locale: string;
}
