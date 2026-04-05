import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { SiteHeader } from "@/components/storefront/site-header";

export const metadata: Metadata = {
  title: {
    default: "Northstar Commerce",
    template: "%s | Northstar Commerce"
  },
  description: "Next.js App Router alapú, skálázható webshop motor Supabase és Stripe integrációval."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hu">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
