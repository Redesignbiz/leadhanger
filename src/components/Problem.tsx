import type { CSSProperties } from "react";
import { Highlight, Section, SectionHeading } from "./Section";

/**
 * The five failure points, as published on the corporate site, with spelling
 * and punctuation corrected. Order is the order a lead is lost in: money spent
 * to bring the visitor, the visitor leaving, no help, no handoff, gone.
 */
/**
 * How far each box sits below the first, from `lg`: an easing decline, small
 * steps at first and larger ones later, the way a lead drains away.
 */
const DROPS = [0, 24, 64, 120, 188];

/**
 * The decline, drawn through the top centre of each box. One smooth curve
 * through the five stops (Catmull-Rom, turned into cubic Béziers), from the
 * content's left edge, carried on past the last stop down to its right edge. The box is 1000 units wide and
 * as tall in units as it is in pixels, so the drops above are used as they
 * are; only the width stretches, and the stroke does not stretch with it.
 */
function LossCurve() {
  const pts = DROPS.map((y, i) => ({ x: ((i + 0.5) / 5) * 1000, y: y + 1 }));
  const all = [{ x: 0, y: -4 }, ...pts, { x: 1000, y: 262 }];
  let d = `M ${all[0].x} ${all[0].y}`;
  for (let i = 0; i < all.length - 1; i++) {
    const p0 = all[Math.max(i - 1, 0)];
    const p1 = all[i];
    const p2 = all[i + 1];
    const p3 = all[Math.min(i + 2, all.length - 1)];
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p2.x} ${p2.y}`;
  }

  return (
    <>
      <svg
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[300px] w-full overflow-visible lg:block"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="decline-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--color-blue-pale)" />
            <stop offset="1" stopColor="var(--color-blue-pale)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d={d}
          pathLength={1}
          className="decline-curve"
          stroke="url(#decline-fade)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* Stacked: the same line, straight, down the left. */}
      <span
        className="loss-track-y pointer-events-none absolute top-6 bottom-6 left-[5px] w-px lg:hidden"
        aria-hidden
      />
    </>
  );
}

const failures = [
  {
    title: "High costs in digital marketing",
    body: "Companies spend heavily on SEO and digital marketing to attract potential customers.",
  },
  {
    title: "Visitors drop off, wasting the effort",
    body: "Visitors arrive ready to decide, but instead of being guided, they drop off.",
  },
  {
    title: "No support for customers",
    body: "Customers are either pushed into outdated contact forms or left to find a dealer on their own, with no follow-up.",
  },
  {
    title: "Inefficient communication",
    body: "Most companies fail to understand, qualify and efficiently transfer website leads to their dealers, losing high-value opportunities.",
  },
  {
    title: "Losing leads",
    body: "Without smart qualification and instant engagement, high-intent leads go to waste, and those buyers most likely end up with your competitors.",
  },
];

export function Problem() {
  return (
    <Section id="problem">
      <SectionHeading
        title={
          <>
            Why is <Highlight>lead management</Highlight> broken?
          </>
        }
      />

      {/*
        The five failures are one chain, each step losing what the step before
        it paid for, so they sit on one curve: a decline. From `lg` the five
        boxes step down across the measure, each a little further than the
        last, and a pale blue line runs through the stop on top of
        each box, fading as it goes and running on off the right edge, where
        the lead is gone. Below `lg` the boxes stack and the line runs down the
        left.
      */}
      <div className="decline relative mt-12">
        <LossCurve />
        <ol className="relative grid gap-4 lg:grid-cols-5 lg:gap-4">
          {failures.map((failure, index) => (
            <li
              key={failure.title}
              className="decline-step relative pl-7 lg:pl-0"
              style={{ "--drop": `${DROPS[index]}px`, "--i": index } as CSSProperties}
            >
              {/* The stop on the curve. */}
              <span
                className="border-blue-pale bg-ground absolute top-5 left-0 z-10 block size-[11px] rounded-full border-[1.5px] lg:top-[var(--drop)] lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
                style={{ opacity: 1 - index * 0.14 }}
                aria-hidden
              />
              <div className="border-line bg-panel h-full rounded-lg border p-5 lg:mt-[var(--drop)] lg:h-auto">
                <span
                  className="text-blue-pale text-[12px] tracking-[0.1em] tabular-nums"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-ink mt-2 text-[16px] leading-snug font-bold tracking-[-0.015em] text-balance">
                  {failure.title}
                </h3>
                <p className="text-ink-muted mt-3 text-[14px] leading-[1.6]">
                  {failure.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
