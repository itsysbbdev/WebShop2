"use client";

import { useState } from "react";

import { createProductSchema } from "@/lib/validators";
import type { CreateProductInput } from "@/types/domain";

export interface ProductFormValues {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  categorySlug: string;
  status: "draft" | "active" | "archived";
  currency: string;
  basePrice: string;
  compareAtPrice: string;
  trackInventory: boolean;
  featuredImageUrl: string;
  seoTitle: string;
  seoDescription: string;
  variantsJson: string;
}

export function useProductForm(initialValues: ProductFormValues) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateValue<Key extends keyof ProductFormValues>(key: Key, value: ProductFormValues[Key]) {
    setValues((current) => ({
      ...current,
      [key]: value
    }));
  }

  async function submit() {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const parsedVariants = JSON.parse(values.variantsJson) as unknown;
      const payload: CreateProductInput = createProductSchema.parse({
        name: values.name,
        slug: values.slug || undefined,
        shortDescription: values.shortDescription,
        description: values.description,
        categorySlug: values.categorySlug,
        status: values.status,
        currency: values.currency,
        basePrice: Number(values.basePrice),
        compareAtPrice: values.compareAtPrice ? Number(values.compareAtPrice) : null,
        trackInventory: values.trackInventory,
        featuredImageUrl: values.featuredImageUrl || null,
        seoTitle: values.seoTitle || undefined,
        seoDescription: values.seoDescription || undefined,
        variants: parsedVariants
      });

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "A termék mentése sikertelen.");
      }

      setSuccess(result.persisted ? "A termék elmentve az adatbázisba." : "Demo módban validáltuk és létrehoztuk a mintaterméket.");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Ismeretlen hiba történt.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    values,
    error,
    success,
    isSubmitting,
    updateValue,
    submit
  };
}
