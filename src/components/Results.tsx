import { site } from "@/lib/site";
import { Tally } from "./Tally";

/**
 * The one bright section on the page, on a solid deep blue (`blue-deep`,
 * deliberately darker than the corporate `blue`). It carries the
 * reference story and the four published figures, so it earns the break — and
 * spending the accent anywhere else at this size is what would stop it working
 * here.
 *
 * It keeps the same measure and the same side rules as every other section,
 * drawn in the on-blue line colour, so the ruled column runs straight through
 * the colour change instead of restarting after it.
 *
 * Every number quoted here is one of the four in `site.metrics`, which are the
 * figures already published on the Redesign Business case study. Nothing else
 * goes in this section.
 */
export function Results() {
  return (
    <section id="results" className="bg-blue-deep">
      <div className="border-on-blue-line mx-auto w-full max-w-6xl lg:border-x">
        <div className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="eyebrow text-on-blue shrink-0">Proof</span>
            <span className="bg-on-blue-line h-px flex-1" aria-hidden />
            <span
              className="eyebrow text-on-blue-muted shrink-0 tabular-nums"
              aria-hidden
            >
              04
            </span>
          </div>

          <div className="mt-10 grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div>
              <h2 className="text-on-blue text-[28px] leading-[1.1] font-bold tracking-[-0.03em] text-balance sm:text-[38px]">
                Built for a tire manufacturer. Now running across 10,000+
                parties.
              </h2>
              <p className="text-on-blue-muted mt-7 text-[15.5px] leading-[1.65] sm:text-[16.5px]">
                {site.caseStudy.client} was generating real digital demand and
                losing it at the dealer handoff. Response time was measured in
                days. LeadHanger was built to close that gap, and the
                measurement framework was built alongside it, so there was data
                on lead-to-sale performance from the first lead routed.
              </p>
              <p className="text-on-blue-muted mt-5 text-[15.5px] leading-[1.65] sm:text-[16.5px]">
                The platform has since expanded well beyond that first network.
                It now operates as the commercial handoff layer for B2B2C
                organizations in automotive, consumer goods and other
                dealer-network industries.
              </p>

              <a
                href={site.caseStudy.href}
                className="text-on-blue decoration-on-blue-line hover:decoration-on-blue group mt-8 inline-flex items-center gap-2 text-[15px] font-semibold underline underline-offset-[6px] transition-colors"
              >
                Read the {site.caseStudy.client} case study
                <svg
                  viewBox="0 0 24 24"
                  className="size-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>

            {/*
              The figures are the loudest type on the page, set in tabular figures
              so they share a grid with every other number on the site. Rules
              between the cells, not tiles: a filled tile on this ground would
              have to be another blue, and there is no second blue.
            */}
            <dl className="reveal-stack border-on-blue-line grid grid-cols-2 self-start border-t">
              {site.metrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className={[
                    "border-on-blue-line py-7",
                    index % 2 === 1 && "border-l pl-6",
                    index >= 2 && "border-t",
                    index % 2 === 0 && "pr-6",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <dt className="text-on-blue text-[40px] leading-none font-medium tracking-[-0.04em] tabular-nums sm:text-[52px]">
                    <Tally value={metric.value} />
                  </dt>
                  <dd className="text-on-blue-muted mt-4 text-[13px] leading-[1.45]">
                    {metric.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
