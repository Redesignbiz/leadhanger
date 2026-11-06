import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PlanCards, PlanTable } from "@/components/PlanComparison";
import { Faq } from "@/components/Faq";
import { site } from "@/lib/site";
import { planFaqs } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Plans",
  description: `${site.name} plans for a single dealer, dealer groups and regional chains, and manufacturers and brands: chat and form, routing, follow-up, appointments, integration, onboarding and contract.`,
  alternates: { canonical: "/plans" },
  openGraph: {
    type: "website",
    url: `${site.url}/plans`,
    title: `Plans · ${site.name}`,
  },
  robots: { index: true, follow: true },
};

/**
 * The plans page, from the website brief (Drive, November 3, 2026, p.22). A US
 * buyer looks for a pricing page and does not take a product without one
 * seriously; this is that page, without prices until they are decided. The
 * plans, rows and answers live in lib/plans.ts. /our-solution redirects here
 * (next.config.ts).
 *
 * It keeps the ruled column the rest of the site is built on.
 */
export default function Plans() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="px-5 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24 lg:px-12">
            <div className="reveal">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="eyebrow text-blue-pale shrink-0">Plans</span>
                <span className="bg-line h-px flex-1" aria-hidden />
              </div>

              <h1 className="text-ink mt-8 max-w-3xl text-[30px] leading-[1.08] font-bold tracking-[-0.03em] text-balance sm:text-[42px]">
                Plans built around your dealer network
              </h1>
              <p className="text-ink-muted mt-6 max-w-2xl text-[15px] leading-[1.65] sm:text-[17px]">
                Every plan includes the chat and form, lead routing and the
                dealer app. We share pricing in a call.
              </p>
            </div>

            <div className="mt-12">
              <PlanCards />
            </div>
          </div>
        </div>

        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="border-line border-t px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="reveal max-w-2xl">
              <h2 className="text-ink text-[28px] leading-[1.1] font-bold tracking-[-0.03em] text-balance sm:text-[38px]">
                Compare plans
              </h2>
              <p className="text-ink-muted mt-5 text-[15px] leading-[1.65] sm:text-[17px]">
                Features that are not live yet carry their label, the same
                labels the{" "}
                <Link
                  href="/integrations"
                  className="text-blue-pale decoration-blue/60 hover:decoration-blue-pale font-medium underline underline-offset-[4px] transition-colors"
                >
                  Integrations
                </Link>{" "}
                page uses.
              </p>
            </div>

            <div className="mt-12">
              <PlanTable />
            </div>
          </div>
        </div>

        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="border-line border-t px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="reveal max-w-2xl">
              <h2 className="text-ink text-[28px] leading-[1.1] font-bold tracking-[-0.03em] text-balance sm:text-[38px]">
                Frequently asked questions
              </h2>
            </div>

            <div className="mt-12 max-w-3xl">
              <Faq items={planFaqs} />
            </div>
          </div>
        </div>

        {/* The close, so the page does not dead-end after the last answer. */}
        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="border-line border-t px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
            <div className="reveal flex flex-col items-center gap-4 text-center">
              <p className="text-ink-muted text-[14px] leading-[1.55] sm:text-[15px]">
                Not sure which plan fits?{" "}
                <span className="block sm:inline">
                  We will help you choose.
                </span>
              </p>
              <a
                href={`mailto:${site.contact.sales}?subject=${encodeURIComponent(
                  `${site.name} demo request`,
                )}`}
                className="bg-blue hover:bg-blue-hover rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-colors"
              >
                {site.cta}
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
