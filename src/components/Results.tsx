import { site } from "@/lib/site";

/**
 * The one dark section on the page. It carries the reference story, so it earns
 * the visual break.
 *
 * Every number quoted here is one of the four in `site.metrics`, which are the
 * figures already published on the Redesign Business case study. Nothing else
 * goes in this section.
 */
export function Results() {
  return (
    <section
      id="results"
      className="bg-inverse-surface px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-3 text-primary-fixed-dim">Proof</p>
            <h2 className="text-2xl font-bold leading-tight tracking-[-0.02em] text-inverse-ink sm:text-3xl">
              Built for a tire manufacturer. Now running across 10,000+ parties.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-inverse-ink-muted sm:text-lg">
              {site.caseStudy.client} was generating real digital demand and
              losing it at the dealer handoff. Response time was measured in
              days. LeadHanger was built to close that gap, and the measurement
              framework was built alongside it, so there was data on lead-to-sale
              performance from the first lead routed.
            </p>
            <p className="mt-5 text-base leading-relaxed text-inverse-ink-muted sm:text-lg">
              The platform has since expanded well beyond that first network. It
              now operates as the commercial handoff layer for B2B2C
              organizations in automotive, consumer goods and other
              dealer-network industries.
            </p>

            <a
              href={site.caseStudy.href}
              className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-primary-fixed-dim underline underline-offset-4 transition-colors hover:text-inverse-ink"
            >
              Read the {site.caseStudy.client} case study
              <svg
                viewBox="0 0 24 24"
                className="size-4"
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

          <dl className="grid gap-px self-start overflow-hidden rounded-lg border border-inverse-surface-high bg-inverse-surface-high sm:grid-cols-2">
            {site.metrics.map((metric) => (
              <div key={metric.label} className="bg-inverse-surface p-6">
                <dt className="text-[34px] font-bold leading-none tracking-[-0.03em] text-inverse-ink tabular-nums">
                  {metric.value}
                </dt>
                <dd className="mt-2.5 text-[13px] leading-5 text-inverse-ink-muted">
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
