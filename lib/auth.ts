import { redirect } from "next/navigation";

import { hasSupabaseConfig } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AuthUserProfile } from "@/types/domain";

function getDisplayName(user: { user_metadata?: Record<string, unknown> }) {
  const fullName = user.user_metadata?.full_name;
  const name = user.user_metadata?.name;

  if (typeof fullName === "string" && fullName.length > 0) {
    return fullName;
  }

  if (typeof name === "string" && name.length > 0) {
    return name;
  }

  return "Authenticated user";
}

export async function getCurrentUserProfile(): Promise<AuthUserProfile | null> {
  if (!hasSupabaseConfig()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("users")
    .select("id, email, full_name, avatar_url, role")
    .eq("id", user.id)
    .maybeSingle();

  return {
    id: user.id,
    email: profile?.email ?? user.email ?? "",
    fullName: profile?.full_name ?? getDisplayName(user),
    role: (profile?.role ?? "customer") as AuthUserProfile["role"],
    avatarUrl: profile?.avatar_url ?? ((user.user_metadata?.avatar_url as string | undefined) ?? null)
  };
}

export async function requireAdmin() {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    redirect("/login?next=/admin");
  }

  if (profile.role !== "admin") {
    redirect("/");
  }

  return profile;
}

export async function isAdminRequest() {
  const profile = await getCurrentUserProfile();
  return Boolean(profile && profile.role === "admin");
}
