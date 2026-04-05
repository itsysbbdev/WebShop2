import type { Category, Order, Product, StoreSettings } from "@/types/domain";

export const mockCategories: Category[] = [
  {
    id: "cat-running",
    slug: "running",
    name: "Running",
    description: "Technikai futófelszerelés nagy terhelésre."
  },
  {
    id: "cat-lifestyle",
    slug: "lifestyle",
    name: "Lifestyle",
    description: "Letisztult utcai modellek mindennapi használatra."
  },
  {
    id: "cat-accessories",
    slug: "accessories",
    name: "Accessories",
    description: "Prémium kiegészítők és edzéshez tervezett apróságok."
  }
];

export const mockProducts: Product[] = [
  {
    id: "prod-velocity-knit",
    slug: "velocity-knit-runner",
    name: "Velocity Knit Runner",
    shortDescription: "Ultrakönnyű futócipő lélegző kötött felsőrésszel.",
    description: "A Velocity Knit Runner olyan mindennapi edzőcipő, amely a kényelmet, a stabilitást és a gyors reakciót egyesíti. A termékvariációk méret és szín szerint kezelhetők, így a készlet pontosan nyomon követhető.",
    status: "active",
    currency: "HUF",
    basePrice: 44990,
    compareAtPrice: 49990,
    category: mockCategories[0],
    trackInventory: true,
    featuredImageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Velocity Knit Runner | Next.js Webshop Demo",
    seoDescription: "Teljesítményre hangolt futócipő gyors szállítással és valós készletkezeléssel.",
    images: [
      {
        id: "img-velocity-main",
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
        alt: "Velocity Knit Runner piros színben",
        position: 0
      }
    ],
    variants: [
      {
        id: "var-velocity-red-42",
        sku: "VKR-RED-42",
        name: "Piros / 42",
        price: 44990,
        stockQuantity: 7,
        isDefault: true,
        isActive: true,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
        selections: [
          { optionName: "Szín", optionValue: "Piros" },
          { optionName: "Méret", optionValue: "42" }
        ]
      },
      {
        id: "var-velocity-black-43",
        sku: "VKR-BLK-43",
        name: "Fekete / 43",
        price: 44990,
        stockQuantity: 4,
        isDefault: false,
        isActive: true,
        imageUrl: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80",
        selections: [
          { optionName: "Szín", optionValue: "Fekete" },
          { optionName: "Méret", optionValue: "43" }
        ]
      }
    ]
  },
  {
    id: "prod-studio-hoodie",
    slug: "studio-hoodie",
    name: "Studio Hoodie",
    shortDescription: "Puha, vastag kapucnis pulóver utcai és stúdió használatra.",
    description: "A Studio Hoodie klasszikus szabású, mégis modern megjelenésű felső, amely több méretben és színben is elérhető. A variációs adatmodell miatt később új kombinációk is könnyen felvehetők.",
    status: "active",
    currency: "HUF",
    basePrice: 26990,
    category: mockCategories[1],
    trackInventory: true,
    featuredImageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Studio Hoodie | Next.js Webshop Demo",
    seoDescription: "Prémium hoodie méret és szín szerinti variációkkal.",
    images: [
      {
        id: "img-hoodie-main",
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
        alt: "Studio Hoodie természetes fényben",
        position: 0
      }
    ],
    variants: [
      {
        id: "var-hoodie-sand-m",
        sku: "SHD-SND-M",
        name: "Homok / M",
        price: 26990,
        stockQuantity: 12,
        isDefault: true,
        isActive: true,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
        selections: [
          { optionName: "Szín", optionValue: "Homok" },
          { optionName: "Méret", optionValue: "M" }
        ]
      }
    ]
  },
  {
    id: "prod-carbon-bottle",
    slug: "carbon-bottle",
    name: "Carbon Bottle",
    shortDescription: "Duplafalú kulacs teljes napos hőtartással.",
    description: "A Carbon Bottle a kiegészítő kínálat része, és jó példa arra, hogy a katalógusban nem minden terméknek kell méretvariációval rendelkeznie. A rendszer ezt is támogatja.",
    status: "active",
    currency: "HUF",
    basePrice: 9990,
    category: mockCategories[2],
    trackInventory: true,
    featuredImageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Carbon Bottle | Next.js Webshop Demo",
    seoDescription: "Prémium duplafalú kulacs gyors rendelési folyamattal.",
    images: [
      {
        id: "img-bottle-main",
        url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80",
        alt: "Carbon Bottle fekete kivitelben",
        position: 0
      }
    ],
    variants: [
      {
        id: "var-bottle-black",
        sku: "CBT-BLK-750",
        name: "Fekete / 750 ml",
        price: 9990,
        stockQuantity: 18,
        isDefault: true,
        isActive: true,
        imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80",
        selections: [
          { optionName: "Szín", optionValue: "Fekete" },
          { optionName: "Méret", optionValue: "750 ml" }
        ]
      }
    ]
  }
];

export const mockStoreSettings: StoreSettings = {
  storeName: "Northstar Commerce",
  currency: "HUF",
  taxRate: 27,
  supportEmail: "support@northstar-commerce.test",
  locale: "hu-HU"
};

export const mockOrders: Order[] = [
  {
    id: "ord-1001",
    orderNumber: "1001",
    email: "anna@example.com",
    status: "paid",
    currency: "HUF",
    subtotal: 44990,
    taxTotal: 9565,
    shippingTotal: 0,
    grandTotal: 54555,
    createdAt: "2026-04-05T10:15:00.000Z",
    paidAt: "2026-04-05T10:18:00.000Z",
    items: [
      {
        id: "item-1001-1",
        productId: "prod-velocity-knit",
        variantId: "var-velocity-red-42",
        productName: "Velocity Knit Runner",
        variantName: "Piros / 42",
        quantity: 1,
        unitPrice: 44990,
        lineTotal: 44990
      }
    ]
  },
  {
    id: "ord-1002",
    orderNumber: "1002",
    email: "mark@example.com",
    status: "pending_payment",
    currency: "HUF",
    subtotal: 36980,
    taxTotal: 7861,
    shippingTotal: 0,
    grandTotal: 44841,
    createdAt: "2026-04-06T08:02:00.000Z",
    items: [
      {
        id: "item-1002-1",
        productId: "prod-studio-hoodie",
        variantId: "var-hoodie-sand-m",
        productName: "Studio Hoodie",
        variantName: "Homok / M",
        quantity: 1,
        unitPrice: 26990,
        lineTotal: 26990
      },
      {
        id: "item-1002-2",
        productId: "prod-carbon-bottle",
        variantId: "var-bottle-black",
        productName: "Carbon Bottle",
        variantName: "Fekete / 750 ml",
        quantity: 1,
        unitPrice: 9990,
        lineTotal: 9990
      }
    ]
  }
];
