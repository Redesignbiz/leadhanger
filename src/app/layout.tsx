import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * Nunito Sans, matching the Yeni Müşterim landing project. The two sites share
 * their typeface as well as their colour and geometry tokens, so this
 * declaration is meant to stay identical to the one in that project.
 *
 * The four weights are the ones this site actually uses: 400 for body, 500,
 * 600 for labels and subheadings, 700 for headlines. Nothing here goes heavier.
 *
 * `latin-ext` is not needed by the current English copy, which has no accented
 * characters. It stays because the other project needs it and these two
 * declarations are kept in step, and because it costs little if a Turkish place
 * name is ever set with its proper diacritics.
 */
const nunitoSans = Nunito_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
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
      className={`${nunitoSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface text-ink font-[family-name:var(--font-sans)]">
        {children}
      </body>
    </html>
  );
}
