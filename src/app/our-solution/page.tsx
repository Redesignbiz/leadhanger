import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceLevels, FeatureComparison } from "@/components/ServiceLevels";
import { ServiceFaq } from "@/components/ServiceFaq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our solution",
  description:
    `The three ${site.name} packages compared: Lite, Pro and Custom, across lead ` +
    `qualification, dealer matching, reporting, CRM integration and time to launch.`,
  alternates: { canonical: "/our-solution" },
  openGraph: {
    type: "website",
    url: `${site.url}/our-solution`,
    title: `Our solution · ${site.name}`,
  },
  robots: { index: true, follow: true },
};

/**
 * Everything about the packages, on one page.
 *
 * This exists because the home page carried all of it and should not have: a
 * thirteen-row comparison table and seven questions sat between the argument
 * and the ask, and together they were a third of the page. They are a
 * destination, not a step in the story — a buyer goes looking for them.
 *
 * It keeps the ruled column the rest of the site is built on, so the two pages
 * read as one site rather than as a landing page with an appendix.
 */
export default function OurSolution() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="px-5 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24 lg:px-12">
            <div className="reveal">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="eyebrow text-blue-pale shrink-0">
                  Our solution
                </span>
                <span className="bg-line h-px flex-1" aria-hidden />
              </div>

              <h1 className="text-ink mt-8 max-w-3xl text-[30px] leading-[1.08] font-bold tracking-[-0.03em] text-balance sm:text-[42px]">
                Three packages
              </h1>
            </div>

            <div className="mt-12">
              <ServiceLevels />
            </div>
          </div>
        </div>

        {/*
          The comparison introduces itself centred, as the supplied design has
          it. It is the one centred block on the site, and it earns that by
          sitting above a full-width matrix rather than above a text column.
        */}
        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="border-line border-t px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="reveal mx-auto max-w-2xl text-center">
              <h2 className="text-ink text-[28px] leading-[1.1] font-bold tracking-[-0.03em] text-balance sm:text-[38px]">
                Features{" "}
                <span className="from-blue-pale to-blue-bright bg-gradient-to-r bg-clip-text text-transparent">
                  comparison
                </span>
                .
              </h2>
              <p className="text-ink-muted mt-6 text-[15px] leading-[1.65] sm:text-[17px]">
                Compare our Lite, Pro, and Custom packages to find the right
                solution for your lead management needs — from basic contact
                collection to advanced, AI-driven lead matching and fully
                customized reporting.
              </p>
            </div>

            <div className="mt-12">
              <FeatureComparison />
            </div>
          </div>
        </div>

        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="border-line border-t px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="reveal mx-auto max-w-2xl text-center">
              <h2 className="text-ink text-[28px] leading-[1.1] font-bold tracking-[-0.03em] text-balance sm:text-[38px]">
                Frequently Asked{" "}
                <span className="from-blue-pale to-blue-bright bg-gradient-to-r bg-clip-text text-transparent">
                  Questions
                </span>
                .
              </h2>
            </div>

            <div className="mx-auto mt-12 max-w-3xl">
              <ServiceFaq />
            </div>
          </div>
        </div>

        {/* The close, so the page does not dead-end after the last answer.
            Centred at every width, under the centred FAQ heading. */}
        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="border-line border-t px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
            <div className="reveal flex flex-col items-center gap-4 text-center">
              <p className="text-ink-muted text-[14px] leading-[1.55] sm:text-[15px]">
                Not sure which package fits?{" "}
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
