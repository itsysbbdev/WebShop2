import Link from "next/link";

import { ClearCartOnMount } from "@/components/storefront/clear-cart-on-mount";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type SuccessPageProps = {
  searchParams: Promise<{ order?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { order } = await searchParams;

  return (
    <main className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <ClearCartOnMount />
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle>Sikeres fizetés</CardTitle>
          <CardDescription>A Stripe checkout sikeresen lefutott. A webhook ezután frissíti a rendelés állapotát.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Rendelés azonosító: {order ?? "függőben"}</p>
          <Link href="/" className={buttonVariants()}>
            Vissza a főoldalra
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
