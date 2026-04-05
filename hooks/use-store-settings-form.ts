"use client";

import { useState } from "react";

import { updateStoreSettingsSchema } from "@/lib/validators";
import type { StoreSettings } from "@/types/domain";

export function useStoreSettingsForm(initialValues: StoreSettings) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateValue<Key extends keyof StoreSettings>(key: Key, value: StoreSettings[Key]) {
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
      const payload = updateStoreSettingsSchema.parse(values);
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "A boltbeállítások mentése sikertelen.");
      }

      setSuccess(result.persisted ? "A boltbeállítások frissültek." : "Demo módban validáltuk a boltbeállításokat.");
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
