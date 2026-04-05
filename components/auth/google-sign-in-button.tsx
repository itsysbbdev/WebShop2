"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function GoogleSignInButton({ nextPath = "/admin" }: { nextPath?: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className="w-full"
      onClick={() =>
        startTransition(async () => {
          const supabase = createSupabaseBrowserClient();
          await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`
            }
          });
        })
      }
      disabled={isPending}
    >
      {isPending ? "Átirányítás..." : "Belépés Google fiókkal"}
    </Button>
  );
}
