import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * Inter. The codebase this was seeded from loaded Nunito Sans because that was
 * the typeface of the mobile app it described; nothing carries that constraint
 * here, and Inter is the safer read for a US B2B audience at small sizes.
 *
 * `latin-ext` stays in the subset list for one reason: the footer prints
 * Istanbul, and the dotted capital I in "İstanbul" is outside plain `latin`.
 */
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Lead qualification and distribution for dealer networks`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /*
     * `data-scroll-behavior="smooth"` is load-bearing, not decoration.
     *
     * globals.css sets `html { scroll-behavior: smooth }` for the anchor links.
     * Up to Next 15, Next temporarily forced that back to `auto` during a
     * navigation so a new route opened at the top; Next 16 no longer overrides
     * it. Without this attribute, opening /privacy from the footer leaves you
     * wherever you were scrolled to on the previous page.
     * Source: node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md
     */
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface text-ink font-[family-name:var(--font-sans)]">
        {children}
      </body>
    </html>
  );
}
