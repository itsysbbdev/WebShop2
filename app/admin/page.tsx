import { DashboardShell } from "@/components/admin/dashboard-shell";
import { OrdersTable } from "@/components/admin/orders-table";
import { ProductForm } from "@/components/admin/product-form";
import { SettingsForm } from "@/components/admin/settings-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth";
import { listOrders } from "@/lib/repositories/orders";
import { getAllProducts, getCategories } from "@/lib/repositories/products";
import { getStoreSettings } from "@/lib/repositories/settings";

export default async function AdminPage() {
  await requireAdmin();
  const [orders, categories, products, settings] = await Promise.all([
    listOrders(),
    getCategories(),
    getAllProducts({ includeDrafts: true }),
    getStoreSettings()
  ]);

  return (
    <main>
      <DashboardShell>
        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Termékek</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{products.length}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Rendelések</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{orders.length}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Valuta</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{settings.currency}</CardContent>
          </Card>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.1fr,0.9fr]">
          <OrdersTable orders={orders} />
          <div className="space-y-8">
            <ProductForm categories={categories} settings={settings} />
            <SettingsForm settings={settings} />
          </div>
        </section>
      </DashboardShell>
    </main>
  );
}
