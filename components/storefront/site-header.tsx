"use client";

import Link from "next/link";

import { useCart } from "@/hooks/use-cart";

export function SiteHeader() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Northstar Commerce
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href="/">Shop</Link>
          <Link href="/cart">Kosár</Link>
          <Link href="/admin">Admin</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-muted-foreground">
            Bejelentkezés
          </Link>
          <Link
            href="/cart"
            className="inline-flex h-10 min-w-24 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Kosár ({itemCount})
          </Link>
        </div>
      </div>
    </header>
  );
}
