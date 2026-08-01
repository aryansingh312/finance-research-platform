import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Aryan Singh | Independent Finance Researcher",
    template: "%s | Aryan Singh",
  },
  description:
    "Independent research on businesses, markets, and long-term value creation.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "Aryan Singh | Independent Finance Researcher",
    description: "Independent research on businesses, markets, and long-term value creation.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a href="#main-content" className="sr-only fixed left-4 top-4 z-50 bg-ink px-4 py-3 text-sm text-[var(--canvas)] focus:not-sr-only">
          Skip to main content
        </a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
