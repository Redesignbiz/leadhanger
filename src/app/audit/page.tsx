import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuditForm } from "@/components/AuditForm";
import { site } from "@/lib/site";
import { audit } from "@/lib/audit";

export const metadata: Metadata = {
  title: audit.title,
  description: audit.intro,
  alternates: { canonical: "/audit" },
  openGraph: {
    type: "website",
    url: `${site.url}/audit`,
    title: `${audit.title} · ${site.name}`,
  },
  robots: { index: true, follow: true },
};

/**
 * The free Lead Response Audit, the site's main action (website brief, Drive,
 * November 3, 2026, p.17). The header's main button and the vertical pages
 * lead here. The form, its open items and where the request goes are
 * described in components/AuditForm.tsx and lib/audit.ts.
 */
export default function Audit() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="px-5 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24 lg:px-12">
            <AuditForm />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
