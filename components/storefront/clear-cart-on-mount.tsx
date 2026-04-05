"use client";

import { useEffect } from "react";

import { useCart } from "@/hooks/use-cart";

export function ClearCartOnMount() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return null;
}
