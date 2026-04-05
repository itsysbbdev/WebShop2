import { CartView } from "@/components/storefront/cart-view";
import { getStoreSettings } from "@/lib/repositories/settings";

export default async function CartPage() {
  const settings = await getStoreSettings();

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Checkout</p>
        <h1 className="text-4xl font-semibold tracking-tight">Kosár</h1>
      </div>
      <CartView settings={settings} />
    </main>
  );
}
