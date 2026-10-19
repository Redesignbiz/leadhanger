import Image from "next/image";
import { site } from "@/lib/site";
import { LOWER_STREET, STREETS } from "@/lib/streets";
import { MapBackdrop } from "./MapBackdrop";
import { Tally } from "./Tally";

/**
 * The one bright section on the page, on a solid deep blue (`blue-deep`,
 * deliberately darker than the corporate `blue`). It carries the
 * reference story and the four published figures, so it earns the break — and
 * spending the accent anywhere else at this size is what would stop it working
 * here.
 *
 * The blue carries the same street-map texture as the partner box, clear at
 * the top and building towards the bottom, under the figures.
 *
 * It keeps the same measure and the same side rules as every other section,
 * drawn in the on-blue line colour, so the ruled column runs straight through
 * the colour change instead of restarting after it.
 *
 * The story is the Redesign Business portfolio card for the same project:
 * its cover, its headline and its one-line summary, used as published (see
 * `site.caseStudy`). The cover is the only real product imagery on the page,
 * so it gets the room; the figures follow underneath, in one row.
 *
 * Every number quoted here is one of the four in `site.metrics`, which are the
 * figures already published on the Redesign Business case study. Nothing else
 * goes in this section.
 */
/** The lower cross street, full width, cropped to its own height. */
function StreetStrip({ className }: { className: string }) {
  const d = STREETS.paths[LOWER_STREET];
  return (
    <svg
      viewBox="-10 300 980 62"
      className={`pointer-events-none absolute left-1/2 -z-10 w-screen max-w-none -translate-x-1/2 ${className}`}
      fill="none"
      aria-hidden
    >
      <path
        d={d}
        className="stroke-on-blue-line"
        strokeWidth="1.65"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Results() {
  const study = site.caseStudy;

  return (
    <section
      id="results"
      className="bg-blue-deep relative isolate overflow-hidden"
    >
      <MapBackdrop className="proof-backdrop" grid={false} omit={[LOWER_STREET]} />
      <div className="border-on-blue-line mx-auto w-full max-w-6xl lg:border-x">
        <div className="px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            {/*
              The cover, as the portfolio shows it: the client's mark top left
              over a soft shade so it reads on any part of the photograph. The
              whole cover links to the case study, same as the card it is
              taken from.
            */}
            <a
              href={study.href}
              className="reveal group border-on-blue-line relative block aspect-[1000/760] overflow-hidden rounded-md border"
            >
              <Image
                src={study.cover}
                alt={`LeadHanger dashboard and dealer app, built for ${study.client}`}
                fill
                sizes="(min-width: 1024px) 38rem, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <span
                className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent"
                aria-hidden
              />
              <Image
                src={study.logo}
                alt={study.client}
                width={225}
                height={56}
                className="absolute top-5 left-5 h-6 w-auto sm:top-6 sm:left-6 sm:h-8"
              />
            </a>

            <div className="reveal">
              <h2 className="text-on-blue text-[28px] leading-[1.1] font-bold tracking-[-0.03em] text-balance sm:text-[38px]">
                {study.headline}
              </h2>
              <p className="text-on-blue-muted mt-6 text-[15.5px] leading-[1.65] sm:text-[16.5px]">
                {study.summary}
              </p>

              <a
                href={study.href}
                className="text-on-blue border-on-blue/40 hover:border-on-blue hover:bg-on-blue/10 group mt-8 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[15px] font-semibold transition-colors"
              >
                Read the {study.client} case study
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
          </div>

          {/*
            The figures, set in tabular figures so they share a grid with every
            other number on the site, at the size the hero's teaser row used
            before it was folded in here. Rules
            between the cells, not tiles: a filled tile on this ground would
            have to be another blue, and there is no second blue. Two columns
            on a phone, four in a row from `lg`, which is why the border classes
            are computed per index.
          */}
          {/*
            The grid behind the section is drawn from this row, so its lines
            land on the row's top rule, its left edge and every divider
            between the figures (see `.proof-grid`).
          */}
          <div className="@container relative mt-10 sm:mt-12">
            <div className="proof-grid" aria-hidden />
          {/*
            The map's lower cross street, taken out of the backdrop, where it
            ran through the figures, and set twice along this row instead:
            once just above its top rule and once just below the labels. Same
            curve, same weight; each copy spans the full section and keeps the
            street's own proportions, its strip cropped tight to the curve so
            the line never reaches back into the figures.
          */}
          <StreetStrip className="bottom-[calc(100%+0.75rem)]" />
          <StreetStrip className="top-[calc(100%+0.75rem)]" />
            <dl className="reveal-stack border-on-blue-line grid grid-cols-2 border-t lg:grid-cols-4">
              {site.metrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className={[
                    "border-on-blue-line py-6",
                    index % 2 === 1 && "border-l pl-5",
                    index >= 2 && "border-t lg:border-t-0",
                    index % 2 === 0 && "pr-5",
                    index === 2 && "lg:border-l lg:pl-5",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <dt className="text-on-blue text-[24px] leading-none font-medium tracking-[-0.02em] tabular-nums sm:text-[28px]">
                    <Tally value={metric.value} />
                  </dt>
                  <dd className="text-on-blue-muted mt-3 text-[13px] leading-5">
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
