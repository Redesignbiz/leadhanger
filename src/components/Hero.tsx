import { site } from "@/lib/site";

/**
 * The right column is drawn in markup, not shipped as an image.
 *
 * There is no LeadHanger product screenshot in any project archive, and a
 * stock-looking mockup would say less than this does. It shows the one thing
 * the product is: a qualified lead, with consent attached, landing on a
 * specific dealer within minutes. Replace it with a real capture from the
 * dashboard or the dealer app when one exists (see docs/images.md).
 */
function LeadCard() {
  const fields = [
    { label: "Looking for", value: "4 × 235/55R19, all-season" },
    { label: "Vehicle", value: "2022 SUV" },
    { label: "Area", value: "Brooklyn, NY 11209" },
    { label: "Buying stage", value: "Ready this week" },
  ];

  return (
    <div className="rounded-lg border border-outline-variant bg-surface-lowest p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[13px] font-bold text-ink">Incoming lead</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-fixed px-2.5 py-1 text-[11px] font-bold text-on-accent-fixed">
          <svg
            viewBox="0 0 24 24"
            className="size-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m5 12 5 5L20 7" />
          </svg>
          Consent captured
        </span>
      </div>

      <dl className="mt-4 space-y-2.5">
        {fields.map((field) => (
          <div key={field.label} className="flex items-baseline gap-3">
            <dt className="w-24 shrink-0 text-[12px] text-outline">
              {field.label}
            </dt>
            <dd className="text-[13px] font-medium text-ink">{field.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 border-t border-outline-variant pt-4">
        <p className="text-[11px] font-bold tracking-[0.06em] text-outline uppercase">
          Routed to
        </p>
        <div className="mt-2.5 flex items-center gap-3">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-DEFAULT bg-primary text-[12px] font-bold text-white"
            aria-hidden
          >
            BR
          </span>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold text-ink">
              Bay Ridge Tire &amp; Auto
            </p>
            <p className="text-[12px] text-ink-muted">
              2.1 mi · matched on location and fitment
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between gap-3 text-[12px]">
            <span className="text-ink-muted">Notified</span>
            <span className="font-semibold text-ink tabular-nums">12:04</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-[12px]">
            <span className="text-ink-muted">Dealer called back</span>
            <span className="font-semibold text-accent tabular-nums">
              12:08
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="border-b border-outline-variant px-4 pt-12 pb-14 sm:px-6 sm:pt-20 sm:pb-20"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <p className="eyebrow inline-flex items-start gap-2 rounded-full border border-primary-fixed-dim bg-primary-fixed px-3.5 py-1.5 text-on-primary-fixed">
              <span
                className="mt-[5px] size-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              For brands with a dealer network
            </p>

            <h1 className="mt-6 text-[34px] font-bold leading-[1.1] tracking-[-0.035em] text-ink sm:text-[48px]">
              Turn website visitors into dealer sales
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              LeadHanger qualifies every visitor in a real conversation, captures
              consent, and routes the lead to the right dealer in real time. Your
              network responds in minutes, and you can see what happened after
              the handoff.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#demo"
                className="rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-primary-bright"
              >
                {site.cta}
              </a>
              <a
                href="#how-it-works"
                className="rounded-full border border-outline-variant bg-surface-lowest px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-surface-low"
              >
                See how it works
              </a>
            </div>
          </div>

          <div className="lg:pl-4">
            <LeadCard />
          </div>
        </div>

        {/*
          A teaser, not the proof itself. The same four figures get full labels
          and room to breathe in the Results section; repeating them at full
          size in both places just reads as padding.
        */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-outline-variant pt-7 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
          {site.metrics.map((metric) => (
            // Stacked on phones: side by side, the label wraps under the
            // number with a hanging indent and the grid reads ragged.
            <p
              key={metric.short}
              className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2"
            >
              <span className="text-[19px] font-bold tracking-[-0.02em] text-primary tabular-nums">
                {metric.value}
              </span>
              <span className="text-[14px] text-ink-muted">{metric.short}</span>
            </p>
          ))}
        </div>

      </div>
    </section>
  );
}
