import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { ProductHero } from "@/components/ProductPage";
import { AuditCall } from "@/components/AuditCall";
import { DraftBanner, TextPlaceholder } from "@/components/DraftNote";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insights",
  description: `What ${site.name} learns from routing dealer leads: articles and routing test findings.`,
  alternates: { canonical: "/insights" },
  // A draft until the first article is in: kept out of search and the sitemap.
  robots: { index: false, follow: true },
};

/**
 * /insights, from the website brief (Drive, November 3, 2026, p.20): proof
 * and content. The first piece is the LinkedIn article "Half of your dealer
 * leads never get a phone call", the second the routing test findings,
 * without company names; the brief plans both for December 11, 2026. The
 * twelve archived drafts join once their unsourced figures are removed, and
 * every article ends with the audit.
 *
 * WORK IN PROGRESS (decided November 6, 2026): the page is a skeleton until
 * the first article exists, and stays on its branch. When it is ready, remove
 * the banner, give the page `index: true`, and add it to the sitemap and
 * llms.txt.
 */
const upcoming = [
  {
    title: "Half of your dealer leads never get a phone call",
    kind: "Article",
  },
  {
    title: "What our routing test found",
    kind: "Findings",
  },
];

export default function Insights() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <Section pad="tight">
          <DraftBanner>
            The first articles are being written. This page is a skeleton and
            is not published.
          </DraftBanner>
        </Section>

        <ProductHero
          eyebrow="Insights"
          title="What we learn from routing dealer leads"
          lead="Articles and the findings of our routing test, without company names."
        />

        <Section className="border-line border-t">
          <ul className="reveal-stack grid gap-4 md:grid-cols-2">
            {upcoming.map((item) => (
              <li key={item.title} className="border-line bg-panel rounded-lg border p-6 sm:p-7">
                <p className="eyebrow text-ink-dim">{item.kind} · In progress</p>
                <h2 className="text-ink mt-3 text-[22px] leading-tight font-bold tracking-[-0.02em]">
                  {item.title}
                </h2>
                <p className="mt-4">
                  <TextPlaceholder>Summary and link, once the text is written</TextPlaceholder>
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <AuditCall />
      </main>

      <Footer />
    </>
  );
}
