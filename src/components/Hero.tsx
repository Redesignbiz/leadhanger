import { site } from "@/lib/site";
import { Highlight } from "./Section";
import { Tally } from "./Tally";

/**
 * The right column is drawn in markup, not shipped as an image.
 *
 * There is no LeadHanger product screenshot in any project archive, and a
 * stock-looking mockup would say less than this does. It shows the one thing
 * the product is: a qualified lead, with consent attached, landing on a
 * specific dealer within minutes. Replace it with a real capture from the
 * dashboard or the dealer app when one exists (see docs/images.md).
 *
 * It is also the only place on the page where three of the four state colours
 * appear together, which is what makes it read as a live record rather than as
 * decoration: sage for what was confirmed, blue for the routing, pale blue for
 * the figure that matters.
 */
function LeadCard() {
  const fields = [
    { label: "Looking for", value: "4 × 235/55R19, all-season" },
    { label: "Vehicle", value: "2022 SUV" },
    { label: "Area", value: "Brooklyn, NY 11209" },
    { label: "Buying stage", value: "Ready this week" },
  ];

  return (
    <div className="lead-seq border-line bg-panel rounded-lg border">
      <div className="border-line flex items-center justify-between gap-3 border-b px-5 py-4">
        <span className="eyebrow text-ink-dim">Incoming lead</span>
        <span className="seq-chip text-sage-lift border-sage/40 bg-sage/10 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium">
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

      <dl className="divide-line divide-y">
        {fields.map((field) => (
          <div
            key={field.label}
            className="flex items-baseline gap-4 px-5 py-3"
          >
            <dt className="text-ink-dim w-24 shrink-0 text-[11px]">
              {field.label}
            </dt>
            <dd className="text-ink text-[13.5px] font-medium">
              {field.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="border-line bg-panel-blue border-t px-5 py-5">
        <p className="eyebrow text-ink-dim">Routed to</p>

        <div className="mt-3.5 flex items-center gap-3">
          <span
            className="bg-blue flex size-9 shrink-0 items-center justify-center rounded-sm text-[12px] font-bold text-white"
            aria-hidden
          >
            BR
          </span>
          <div className="min-w-0">
            <p className="text-ink truncate text-[14px] font-semibold">
              Bay Ridge Tire &amp; Auto
            </p>
            <p className="text-ink-muted text-[12px]">
              2.1 mi · matched on location and fitment
            </p>
          </div>
        </div>

        {/*
          The two timestamps are the whole argument, so they get a rule of their
          own between them rather than sitting in a plain list. The gap is the
          product: four minutes from routed to ringing.
        */}
        <div className="border-line/70 mt-5 border-t pt-4">
          <div className="flex items-center justify-between gap-3 text-[12px]">
            <span className="text-ink-muted">Notified</span>
            <span className="text-ink tabular-nums">12:04</span>
          </div>
          <div className="border-line/70 ml-1 h-4 w-px border-l" aria-hidden />
          <div className="seq-callback flex items-center justify-between gap-3 text-[12px]">
            <span className="text-ink-muted">Dealer called back</span>
            <span className="text-sage-lift tabular-nums">12:08</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/*
        Two decorative layers, both behind the content and neither of them a
        shadow: a blue wash standing in for elevation, and a faint rule grid
        that gives the ground a texture at the measure's own rhythm.
      */}
      <div
        className="hero-wash pointer-events-none absolute inset-x-0 top-0 h-[48rem]"
        aria-hidden
      />
      <div className="ruled pointer-events-none absolute inset-0" aria-hidden />

      <div className="border-line relative mx-auto w-full max-w-6xl lg:border-x">
        <div className="px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-20 lg:px-12">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="intro">
              <p className="border-line bg-panel/60 text-ink-muted inline-flex items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-3 backdrop-blur">
                <span
                  className="bg-blue-pale size-1.5 shrink-0 rounded-full"
                  aria-hidden
                />
                <span className="eyebrow">For brands with a dealer network</span>
              </p>

              <h1 className="text-ink mt-7 text-[38px] leading-[1.04] font-bold tracking-[-0.035em] text-balance sm:text-[56px]">
                Boost Your <Highlight>B2B2C Sell-outs.</Highlight>
              </h1>

              <p className="text-ink-muted mt-7 max-w-xl text-[16px] leading-[1.65] sm:text-[17.5px]">
                LeadHanger is an intelligent lead qualification and
                distribution platform that engages website visitors in real
                time and seamlessly connects them with the right dealers for
                B2B2C companies.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#demo"
                  className="bg-blue hover:bg-blue-hover rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-colors"
                >
                  {site.cta}
                </a>
                <a
                  href="#how-it-works"
                  className="border-line-strong text-ink hover:bg-panel rounded-full border px-6 py-3 text-[15px] font-semibold transition-colors"
                >
                  See how it works
                </a>
              </div>
            </div>

            <div className="lg:pl-6">
              <LeadCard />
            </div>
          </div>

          {/*
            A teaser, not the proof itself. The same four figures get full
            labels and room to breathe in the Results section; repeating them at
            full size in both places just reads as padding.

            The cells are separated by rules rather than by filled tiles,
            because a filled tile here would punch an opaque hole in the wash
            and the grid behind it. Two columns on a phone, four in a row above
            `sm`, which is why the border classes are computed per index.
          */}
          <dl className="reveal-stack border-line mt-16 grid grid-cols-2 border-t sm:mt-20 sm:grid-cols-4">
            {site.metrics.map((metric, index) => (
              <div
                key={metric.short}
                className={[
                  "border-line py-6",
                  index % 2 === 1 && "border-l pl-5",
                  index >= 2 && "border-t",
                  "sm:border-t-0",
                  index > 0 ? "sm:border-l sm:pl-5" : "sm:border-l-0 sm:pl-0",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <dt className="text-blue-pale text-[24px] leading-none font-medium tracking-[-0.02em] tabular-nums sm:text-[28px]">
                  <Tally value={metric.value} />
                </dt>
                <dd className="text-ink-muted mt-3 text-[13px] leading-5">
                  {metric.short}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
