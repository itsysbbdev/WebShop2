"use client";

import { useState } from "react";

import { useCart } from "@/hooks/use-cart";

export function useCheckout() {
  const { items } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(email: string) {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          items
        })
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Checkout could not be started.");
      }

      if (payload.url) {
        window.location.href = payload.url;
      }
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Unexpected checkout error.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    isSubmitting,
    error,
    startCheckout
  };
}
