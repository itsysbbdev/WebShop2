"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStoreSettingsForm } from "@/hooks/use-store-settings-form";
import type { StoreSettings } from "@/types/domain";

export function SettingsForm({ settings }: { settings: StoreSettings }) {
  const form = useStoreSettingsForm(settings);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Boltbeállítások</CardTitle>
        <CardDescription>Alap üzleti metaadatok, amelyeket a checkout és az admin modulok is használnak.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="store-name">Bolt neve</Label>
            <Input id="store-name" value={form.values.storeName} onChange={(event) => form.updateValue("storeName", event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-currency">Valuta</Label>
            <Input id="store-currency" value={form.values.currency} onChange={(event) => form.updateValue("currency", event.target.value)} />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="store-tax">Adókulcs (%)</Label>
            <Input id="store-tax" type="number" value={String(form.values.taxRate)} onChange={(event) => form.updateValue("taxRate", Number(event.target.value))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-locale">Locale</Label>
            <Input id="store-locale" value={form.values.locale} onChange={(event) => form.updateValue("locale", event.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="store-support-email">Support email</Label>
          <Input id="store-support-email" type="email" value={form.values.supportEmail} onChange={(event) => form.updateValue("supportEmail", event.target.value)} />
        </div>
        <Button onClick={() => form.submit()} disabled={form.isSubmitting}>
          {form.isSubmitting ? "Mentés..." : "Beállítások mentése"}
        </Button>
        {form.error ? <p className="text-sm text-red-600">{form.error}</p> : null}
        {form.success ? <p className="text-sm text-emerald-700">{form.success}</p> : null}
      </CardContent>
    </Card>
  );
}
