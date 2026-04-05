import type { ReactNode } from "react";

export function DashboardShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">{children}</div>;
}
