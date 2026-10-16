import { site } from "@/lib/site";
import { STREETS } from "@/lib/streets";
import { MapBackdrop } from "./MapBackdrop";
import { Section } from "./Section";
import { StorePaths } from "./StageIcons";

/**
 * The ask, carried over from the corporate site, and the page's close.
 *
 * It carries `id="demo"`, so every "Book an Intro" on the site (the header's
 * included) lands here. Its own button opens a mail to sales: there is no form
 * on this site and no backend to post one to, and a form that silently drops
 * submissions is worse than an address. When a scheduling link or a form
 * endpoint exists, this button is the one place that needs to change.
 *
 * A contained box rather than a full-bleed band, so it reads as a pause in the
 * page and not as a section of its own. It sits on `blue-deep`, the same value
 * as the Results section, because flat corporate `blue` over an area this size
 * was too bright on the dark ground.
 *
 * Depth comes from what is drawn into the blue, not from a shadow: a fine rule
 * grid, the hero story's street map over it, and one soft light in the far
 * corner. All three fade out towards the left, so the headline and the button
 * sit on clean blue and the texture gathers in the empty right half.
 *
 * On that map, in the foreground, a few dealers as storefront pins, drawn in
 * the same quiet tone as the map so they stay a pattern. Backdrop and
 * foreground share one viewBox anchored to the right edge (`xMaxYMid slice`),
 * so the pins stay on their streets at any box width and a narrower box crops
 * the empty left side, never the pins.
 */

/**
 * The pins, in the street map's 960 × 400 space, one larger than the rest.
 * Everything stays between y 100 and 300: on a wide desktop box the slice
 * crops the map's top and bottom, and the band that survives is roughly 70 to
 * 330.
 */
const PINS = [
  { x: 815, y: 165, size: 48 },
  { x: 735, y: 292, size: 34 },
  { x: 905, y: 270, size: 34 },
  { x: 690, y: 118, size: 34 },
];

/**
 * A storefront, drawn on a 24-unit grid and centred on the origin at `size`.
 * Stroke only, so it takes its colour from the class on the group. The stroke is set on
 * the grid, not on the page, so it scales with the icon: every icon has the
 * same weight relative to its own size.
 */
function Store({ size }: { size: number }) {
  const k = size / 24;
  return (
    <g
      transform={`translate(${-size / 2} ${-size / 2}) scale(${k})`}
      fill="none"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <StorePaths />
    </g>
  );
}

/** A plate with a storefront on it, at `size`; the icon is just over half of it. */
function Pin({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x={-size / 2}
        y={-size / 2}
        width={size}
        height={size}
        rx="2"
        className="fill-white/10 stroke-white/20"
      />
      <g className="stroke-on-blue-muted opacity-70">
        <Store size={Math.round(size * 0.53)} />
      </g>
    </g>
  );
}

export function PartnerCta() {
  return (
    <Section id="demo" pad="tight">
      <div className="reveal bg-blue-deep relative isolate overflow-hidden rounded-lg px-7 py-12 sm:px-12 sm:py-16">
        <MapBackdrop className="partner-backdrop" anchor="xMaxYMid" />

        <svg
          viewBox={`0 0 ${STREETS.width} ${STREETS.height}`}
          preserveAspectRatio="xMaxYMid slice"
          className="absolute inset-0 -z-10 hidden size-full md:block"
          aria-hidden
        >
          {/* One quiet style for every pin; the larger one comes forward by size alone. */}
          {PINS.map((pin) => (
            <Pin key={`${pin.x}-${pin.y}`} {...pin} />
          ))}
        </svg>

        <h2 className="text-on-blue max-w-xl text-[28px] leading-[1.12] font-bold tracking-[-0.025em] text-balance sm:text-[38px]">
          Partner with us for smarter lead management
        </h2>
        <p className="text-on-blue-muted mt-5 max-w-xl text-[16px] leading-[1.65] sm:text-[17px]">
          Discover how LeadHanger can streamline your B2B2C lead generation.
          See our platform in action and unlock growth with a personalized
          demo.
        </p>
        <a
          href={`mailto:${site.contact.sales}?subject=${encodeURIComponent(
            "LeadHanger demo request",
          )}`}
          className="text-blue hover:bg-on-blue-muted mt-8 inline-flex rounded-full bg-white px-6 py-3 text-[15px] font-semibold transition-colors"
        >
          {site.cta}
        </a>
      </div>
    </Section>
  );
}
