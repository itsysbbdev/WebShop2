# Netlify deployment

## Recommended setup

1. Connect the GitHub repository `itsysbbdev/WebShop2` to Netlify.
2. Keep the detected Next.js build settings or use the values from `netlify.toml`.
3. Add the required environment variables in the Netlify site settings.
4. Create the Stripe webhook endpoint at:

```text
https://<your-site-domain>/api/stripe/webhook
```

5. Redeploy the site after saving environment variables.

## Environment variables to set in Netlify

Public values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`

Server-only secrets:

- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Notes

- `NEXT_PUBLIC_APP_URL` should point to the production domain you want to use for canonical URLs and Stripe redirects.
- If `NEXT_PUBLIC_APP_URL` is missing, the app falls back to Netlify deploy URL variables to keep previews and production deploys working.
- The repository does not pin the legacy Next.js Netlify runtime plugin. Modern Netlify Next.js support is handled by framework detection.
- Keep Stripe and Supabase secrets in Netlify environment variables only.

## Useful links

- Netlify Next.js docs: https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- Netlify Next.js config values: https://docs.netlify.com/snippets/frameworks/nextjs-config-values/
- Netlify environment variables: https://docs.netlify.com/environment-variables/get-started/
