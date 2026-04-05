import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckoutCancelPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle>Fizetés megszakítva</CardTitle>
          <CardDescription>A vásárló visszalépett a Stripe fizetési folyamatról. A kosár innen újraindítható.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/cart" className={buttonVariants()}>
            Vissza a kosárhoz
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
