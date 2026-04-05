function readEnv(name: string) {
  return process.env[name]?.trim();
}

export function getAppUrl() {
  return (
    readEnv("NEXT_PUBLIC_APP_URL") ||
    readEnv("URL") ||
    readEnv("DEPLOY_PRIME_URL") ||
    readEnv("DEPLOY_URL") ||
    "http://localhost:3000"
  );
}

function requireEnv(name: string) {
  const value = readEnv(name);

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export function hasSupabaseConfig() {
  return Boolean(readEnv("NEXT_PUBLIC_SUPABASE_URL") && readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"));
}

export function hasSupabaseAdminConfig() {
  return Boolean(readEnv("NEXT_PUBLIC_SUPABASE_URL") && readEnv("SUPABASE_SERVICE_ROLE_KEY"));
}

export function hasStripeConfig() {
  return Boolean(readEnv("STRIPE_SECRET_KEY") && readEnv("STRIPE_WEBHOOK_SECRET"));
}

export function getPublicEnv() {
  return {
    appUrl: getAppUrl(),
    supabaseUrl: readEnv("NEXT_PUBLIC_SUPABASE_URL") || "",
    supabaseAnonKey: readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") || ""
  };
}

export function getSupabaseAdminEnv() {
  return {
    supabaseUrl: requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    serviceRoleKey: requireEnv("SUPABASE_SERVICE_ROLE_KEY")
  };
}

export function getStripeServerEnv() {
  return {
    appUrl: getAppUrl(),
    stripeSecretKey: requireEnv("STRIPE_SECRET_KEY")
  };
}

export function getStripeWebhookSecret() {
  return requireEnv("STRIPE_WEBHOOK_SECRET");
}

export function getStripeRuntimeEnv() {
  return {
    appUrl: getAppUrl(),
    stripeSecretKey: requireEnv("STRIPE_SECRET_KEY"),
    stripeWebhookSecret: requireEnv("STRIPE_WEBHOOK_SECRET")
  };
}
