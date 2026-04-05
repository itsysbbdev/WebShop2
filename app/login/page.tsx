import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { hasSupabaseConfig } from "@/lib/env";

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;
  const supabaseReady = hasSupabaseConfig();

  return (
    <main className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin bejelentkezés</CardTitle>
          <CardDescription>Google OAuth belépés Supabase Auth mögött, szerveroldali role ellenőrzéssel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {supabaseReady ? (
            <GoogleSignInButton nextPath={next ?? "/admin"} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Állítsd be a Supabase környezeti változókat a `.env.local` fájlban, hogy az OAuth folyamat működni tudjon.
            </p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
