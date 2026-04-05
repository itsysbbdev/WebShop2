import { hasSupabaseAdminConfig, hasSupabaseConfig } from "@/lib/env";
import { mockStoreSettings } from "@/lib/data/mock-store";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { StoreSettings, UpdateStoreSettingsInput } from "@/types/domain";

function mapSettings(row: any): StoreSettings {
  return {
    storeName: row.store_name,
    currency: row.currency,
    taxRate: Number(row.tax_rate ?? 0),
    supportEmail: row.support_email,
    locale: row.locale ?? "hu-HU"
  };
}

export async function getStoreSettings() {
  if (!hasSupabaseConfig()) {
    return mockStoreSettings;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("store_settings").select("*").eq("id", 1).maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapSettings(data) : mockStoreSettings;
}

export async function updateStoreSettings(input: UpdateStoreSettingsInput) {
  if (!hasSupabaseAdminConfig()) {
    return {
      settings: input,
      persisted: false
    };
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("store_settings")
    .upsert(
      {
        id: 1,
        store_name: input.storeName,
        currency: input.currency,
        tax_rate: input.taxRate,
        support_email: input.supportEmail,
        locale: input.locale
      },
      { onConflict: "id" }
    )
    .select("*")
    .single();

  if (error || !data) {
    throw error ?? new Error("Unable to update store settings.");
  }

  return {
    settings: mapSettings(data),
    persisted: true
  };
}
