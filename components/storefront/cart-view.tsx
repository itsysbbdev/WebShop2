"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useCheckout } from "@/hooks/use-checkout";
import { formatPrice } from "@/lib/utils";
import type { StoreSettings } from "@/types/domain";

export function CartView({ settings }: { settings: StoreSettings }) {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const { startCheckout, error, isSubmitting } = useCheckout();
  const [email, setEmail] = useState("");
  const taxTotal = subtotal * (settings.taxRate / 100);
  const grandTotal = subtotal + taxTotal;

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>A kosár üres</CardTitle>
          <CardDescription>Adj hozzá egy terméket a katalógusból, és innen indíthatod a Stripe checkout folyamatot.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/" className={buttonVariants()}>
            Vissza a termékekhez
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr,0.8fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.variantId}>
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-muted">
                  {item.imageUrl ? <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" sizes="80px" /> : null}
                </div>
                <div>
                  <h3 className="font-semibold">{item.productName}</h3>
                  <p className="text-sm text-muted-foreground">{item.variantName}</p>
                  <p className="text-sm text-muted-foreground">{formatPrice(item.unitPrice, item.currency, settings.locale)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  min={1}
                  max={item.maxQuantity}
                  value={item.quantity}
                  onChange={(event) => updateQuantity(item.variantId, Number(event.target.value))}
                  className="w-20"
                />
                <Button variant="ghost" onClick={() => removeItem(item.variantId)}>
                  Törlés
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Összegzés</CardTitle>
          <CardDescription>A fizetés előtt a szerver újra validálja az árakat és a készletet.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Részösszeg</span>
              <span>{formatPrice(subtotal, settings.currency, settings.locale)}</span>
            </div>
            <div className="flex justify-between">
              <span>Adó</span>
              <span>{formatPrice(taxTotal, settings.currency, settings.locale)}</span>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <span>Végösszeg</span>
              <span>{formatPrice(grandTotal, settings.currency, settings.locale)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="checkout-email">
              Vásárlói email
            </label>
            <Input id="checkout-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="anna@example.com" />
          </div>
          <Button className="w-full" disabled={isSubmitting || !email} onClick={() => startCheckout(email)}>
            {isSubmitting ? "Folyamatban..." : "Tovább a Stripe fizetéshez"}
          </Button>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}
