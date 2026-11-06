import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { ProductHero } from "@/components/ProductPage";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { DraftBanner, TextPlaceholder, UnverifiedFigure } from "@/components/DraftNote";
import { site } from "@/lib/site";
import { audit, auditHref } from "@/lib/audit";

export const metadata: Metadata = {
  title: "Case study",
  description:
    "How a leading tire manufacturer turned web requests into dealer appointments with LeadHanger.",
  alternates: { canonical: "/case-studies/brisa" },
  robots: { index: false, follow: true },
};

/**
 * The case study, from the website brief (Drive, November 3, 2026, p.19), in
 * the ANONYMOUS version (decided November 6, 2026): while the client's written
 * permission is pending, the page names no client and shows no logo. The
 * brief's version names "Brisa, a Bridgestone company"; swap the wording in
 * when permission arrives. The product is named LeadHanger only: the page
 * never mentions YeniMüşterim or Otopratik, or any other client.
 *
 * FIGURES TO VERIFY. Every figure below is the brief's, from the client's
 * monthly report, and each is shown as "to verify" until checked against
 * that report. Checked on November 6, 2026 against the local data
 * (Redesign-Team/05-Lead-Hanger/data/standardized, August 2023 to July 2026):
 *   - 97,418 requests in three years fits the 36 months from August 2023 to
 *     July 2026 only if June 2026 is corrected: that month records 39,991
 *     requests to dealers, the same value as its conversions, which looks
 *     like a data error. With June at about 2,600 the total is 97,418.
 *   - 15,748 tires in total fits the trend: 14,320 through July 2026, plus
 *     August to October.
 *   - The October 2026 figures, the September and August comparisons, the
 *     50.5% of dealers who called and the 47 dealers in 20 regions are not in
 *     the local data (its latest month, July 2026, has 31 dealers in 13
 *     regions). They need the August to October monthly reports.
 * Once a figure is checked, replace its `<UnverifiedFigure>` with plain text, and give
 * each figure its definition and period in the notes.
 */

const headline = [
  { value: "86%", label: "of requests followed up by the dealer", note: "September: 51%" },
  { value: "14.3%", label: "of requests not called", note: "August: 41%, September: 49.2%" },
  { value: "4,085", label: "requests routed", note: "3,280 to dealers, 805 to the call center" },
  { value: "39.6%", label: "conversion at the best dealer", note: "" },
];

const funnel = [
  { value: "326,634", label: "Visits" },
  { value: "74,379", label: "Chat interactions" },
  { value: "26,716", label: "Quote requests" },
  { value: "4,085", label: "Requests routed" },
  { value: "186", label: "Customers who bought, 744 tires" },
];

const screens = [
  "The manufacturer's site, with the chat",
  "A request in the dealer app",
  "The brand dashboard",
];

export default function CaseStudy() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <Section pad="tight">
          <DraftBanner>
            Anonymous version while the client&apos;s written permission is
            pending. Figures marked &ldquo;to verify&rdquo; come from the
            website brief and still need checking against the client&apos;s
            monthly reports. Not published.
          </DraftBanner>
        </Section>

        <ProductHero
          eyebrow="Case study"
          title="How a leading tire manufacturer turned web requests into dealer appointments"
          lead="The manufacturer has routed its website's requests to its dealers through LeadHanger since 2023."
        />

        <Section className="border-line border-t">
          <h2 className="text-ink text-[28px] leading-[1.12] font-bold tracking-[-0.025em] sm:text-[34px]">
            The problem
          </h2>
          <p className="text-ink-muted mt-6 max-w-3xl text-[17px] leading-[1.7]">
            Over three years, <UnverifiedFigure>97,418</UnverifiedFigure> web requests reached the
            manufacturer&apos;s dealers. Only <UnverifiedFigure>50.5%</UnverifiedFigure> of the
            dealers called back.
          </p>
        </Section>

        <Section className="border-line border-t">
          <h2 className="text-ink text-[28px] leading-[1.12] font-bold tracking-[-0.025em] sm:text-[34px]">
            October 2026
          </h2>
          <dl className="reveal-stack mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {headline.map((item) => (
              <div key={item.label} className="border-line bg-panel rounded-lg border p-6">
                <dt className="sr-only">{item.label}</dt>
                <dd className="text-ink text-[34px] leading-none font-bold tracking-[-0.03em]">
                  <UnverifiedFigure>{item.value}</UnverifiedFigure>
                </dd>
                <dd className="text-ink-muted mt-4 text-[15px] leading-[1.5]">{item.label}</dd>
                {item.note && (
                  <dd className="text-ink-dim mt-2 text-[13.5px]">{item.note}</dd>
                )}
              </div>
            ))}
          </dl>

          <h3 className="text-ink mt-14 text-[20px] font-bold tracking-[-0.015em]">
            From visit to sale
          </h3>
          <ol className="mt-6 grid gap-3 sm:grid-cols-5">
            {funnel.map((step) => (
              <li key={step.label} className="border-line-strong border-t pt-4">
                <p className="text-ink text-[22px] font-bold tracking-[-0.02em]">
                  <UnverifiedFigure>{step.value}</UnverifiedFigure>
                </p>
                <p className="text-ink-muted mt-2 text-[14px] leading-[1.5]">{step.label}</p>
              </li>
            ))}
          </ol>
          <p className="text-ink-muted mt-8 text-[15px]">
            Tires sold through the program since launch: <UnverifiedFigure>15,748</UnverifiedFigure>
          </p>

          <div className="mt-10">
            <TextPlaceholder>
              Notes: each figure&apos;s definition and period, from the
              client&apos;s monthly report
            </TextPlaceholder>
          </div>
        </Section>

        <Section className="border-line border-t">
          <h2 className="text-ink text-[28px] leading-[1.12] font-bold tracking-[-0.025em] sm:text-[34px]">
            How it works
          </h2>
          <p className="text-ink-muted mt-4 max-w-2xl text-[16px] leading-[1.65]">
            The visitor answers a few questions in a chat on the
            manufacturer&apos;s site, the request goes to the dealer that can
            fit the tires, and the brand sees what each dealer did with it.
          </p>
          <div className="reveal-stack mt-10 grid gap-4 md:grid-cols-3">
            {screens.map((label) => (
              <MediaPlaceholder key={label} label={label} kind="desktop" />
            ))}
          </div>
        </Section>

        <Section className="border-line border-t">
          <h2 className="text-ink text-[28px] leading-[1.12] font-bold tracking-[-0.025em] sm:text-[34px]">
            Scale
          </h2>
          <p className="text-ink-muted mt-6 max-w-3xl text-[17px] leading-[1.7]">
            <UnverifiedFigure>47</UnverifiedFigure> dealers in <UnverifiedFigure>20</UnverifiedFigure> regions, with
            the network growing past <UnverifiedFigure>100</UnverifiedFigure>.
          </p>
        </Section>

        <Section className="border-line border-t" pad="tight">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-ink text-[24px] leading-tight font-bold tracking-[-0.02em] sm:text-[28px]">
              {audit.title}
            </h2>
            <p className="text-ink-muted max-w-xl text-[15px] leading-[1.65]">
              {audit.intro} A pilot runs for 60 days, free, on the brand
              dashboard and without connecting your systems.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={auditHref({ industry: "tires" })}
                className="bg-blue hover:bg-blue-hover rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-colors"
              >
                {audit.cta}
              </Link>
              <a
                href={`mailto:${site.contact.sales}?subject=${encodeURIComponent(
                  `${site.name} pilot`,
                )}`}
                className="border-line-strong text-ink hover:bg-panel-high rounded-full border px-6 py-3 text-[15px] font-semibold transition-colors"
              >
                Ask about a free 60-day pilot
              </a>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
