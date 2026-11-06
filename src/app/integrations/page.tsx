import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { site } from "@/lib/site";
import { audit } from "@/lib/audit";
import { integrationGroups } from "@/lib/integrations";

export const metadata: Metadata = {
  title: "Integrations",
  description: `What connects to ${site.name} today and what is planned: lead intake, the brand dashboard, REST API and webhooks, CRM, ad platforms, dealer systems and SSO.`,
  alternates: { canonical: "/integrations" },
  openGraph: {
    type: "website",
    url: `${site.url}/integrations`,
    title: `Integrations · ${site.name}`,
  },
  robots: { index: true, follow: true },
};

const flow = [
  "Your website, forms and call center",
  site.name,
  "Your CRM, ad platforms and dealer systems",
];

/**
 * The integrations page, from the website brief (Drive, November 3, 2026,
 * p.21). It answers the first question a brand's IT or CRM owner asks, "does
 * the data reach our systems?", and says plainly what works today and what is
 * planned. The labels live in lib/integrations.ts.
 */
export default function Integrations() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="px-5 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24 lg:px-12">
            <div className="reveal">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="eyebrow text-blue-pale shrink-0">
                  Integrations
                </span>
                <span className="bg-line h-px flex-1" aria-hidden />
              </div>

              <h1 className="text-ink mt-8 max-w-3xl text-[30px] leading-[1.08] font-bold tracking-[-0.03em] text-balance sm:text-[42px]">
                Your data, in your systems
              </h1>
              <p className="text-ink-muted mt-6 max-w-2xl text-[15px] leading-[1.65] sm:text-[17px]">
                Today, leads reach {site.name} from your website, forms and
                call center, and your teams work them in the brand dashboard
                and the dealer app. Connections to your CRM, ad platforms and
                dealer systems follow, each labeled below.
              </p>
            </div>

            <ol
              aria-label="How data moves"
              className="reveal mt-12 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center"
            >
              {flow.map((step, index) => (
                <li key={step} className="contents">
                  <span
                    className={`rounded-lg border px-5 py-4 text-center text-[14.5px] font-semibold ${
                      index === 1
                        ? "border-blue/45 bg-panel-blue text-ink"
                        : "border-line bg-panel text-ink-muted"
                    }`}
                  >
                    {step}
                  </span>
                  {index < flow.length - 1 && (
                    <span
                      className="text-ink-dim justify-self-center text-[18px] sm:rotate-0"
                      aria-hidden
                    >
                      <span className="sm:hidden">↓</span>
                      <span className="hidden sm:inline">→</span>
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="border-line border-t px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="reveal max-w-2xl">
              <h2 className="text-ink text-[28px] leading-[1.1] font-bold tracking-[-0.03em] text-balance sm:text-[38px]">
                Connections
              </h2>
              <p className="text-ink-muted mt-5 text-[15px] leading-[1.65] sm:text-[17px]">
                Live works today. Planned and dated items are on the roadmap.
                On request means we build the connection when a customer needs
                it.
              </p>
            </div>

            <div className="reveal-stack mt-12 grid gap-8 lg:grid-cols-2">
              {integrationGroups.map((group) => (
                <section key={group.name} aria-label={group.name}>
                  <h3 className="text-ink text-[17px] font-semibold tracking-[-0.01em]">
                    {group.name}
                  </h3>
                  <ul className="border-line bg-panel divide-line mt-3 divide-y rounded-lg border">
                    {group.items.map((item) => (
                      <li key={item.name} className="px-5 py-4">
                        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                          <span className="text-ink text-[15px] font-medium">
                            {item.name}
                          </span>
                          <AvailabilityBadge value={item.availability} />
                        </div>
                        {item.note && (
                          <p className="text-ink-muted mt-1.5 text-[13.5px] leading-[1.55]">
                            {item.note}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <p className="text-ink-dim mt-10 max-w-2xl text-[13px] leading-[1.6]">
              Product names belong to their owners. Listing a name here does
              not mean a formal partnership.
            </p>
          </div>
        </div>

        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="border-line border-t px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="reveal grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-ink text-[24px] leading-[1.15] font-bold tracking-[-0.025em] sm:text-[28px]">
                  Pilots run without integration
                </h2>
                <p className="text-ink-muted mt-4 text-[15px] leading-[1.7]">
                  A pilot runs on the brand dashboard, without connecting your
                  systems. Integrations start with an annual contract and are
                  in place within 30 days.
                </p>
              </div>
              <div>
                <h2 className="text-ink text-[24px] leading-[1.15] font-bold tracking-[-0.025em] sm:text-[28px]">
                  Security
                </h2>
                <p className="text-ink-muted mt-4 text-[15px] leading-[1.7]">
                  Access control, authentication, encryption and subprocessors
                  are described on the{" "}
                  <Link
                    href="/trust"
                    className="text-blue-pale decoration-blue/60 hover:decoration-blue-pale font-medium underline underline-offset-[4px] transition-colors"
                  >
                    Security &amp; Compliance
                  </Link>{" "}
                  page.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="border-line border-t px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
            <div className="reveal flex flex-col items-center gap-4 text-center">
              <p className="text-ink-muted text-[14px] leading-[1.55] sm:text-[15px]">
                Questions about your systems?{" "}
                <span className="block sm:inline">
                  We will map the connection with you.
                </span>
              </p>
              <Link
                href="/audit"
                className="bg-blue hover:bg-blue-hover rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-colors"
              >
                {audit.cta}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
