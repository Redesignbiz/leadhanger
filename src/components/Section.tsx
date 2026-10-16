import type { ReactNode } from "react";

/**
 * One measure for the whole page, and the rules that make it visible.
 *
 * Every section is the same width and carries a 1px rule down each side, so the
 * sections stack into one continuous ruled column rather than a series of
 * unrelated bands. The side rules only appear at `lg`: below that the measure is
 * the viewport and a rule on the edge of the screen reads as a rendering fault,
 * not as structure.
 *
 * Vertical rhythm is deliberately uneven. `pad` lets a section open wider than
 * its neighbours — used where the page should draw breath (before the close)
 * rather than on a fixed cadence.
 */
export function Section({
  id,
  children,
  className = "",
  pad = "default",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  pad?: "default" | "wide" | "tight";
}) {
  const padding = {
    tight: "py-16 sm:py-20",
    default: "py-20 sm:py-28",
    wide: "py-24 sm:py-36",
  }[pad];

  return (
    <section id={id} className={className}>
      <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
        <div className={`px-5 sm:px-8 lg:px-12 ${padding}`}>{children}</div>
      </div>
    </section>
  );
}

/**
 * The section header: a label, a rule that runs the full measure, and an index
 * on the far right.
 *
 * The rule is the point. It ties the label to the section's own width, repeats
 * at every section, and is the horizontal answer to the vertical rules on the
 * measure. The index numbers are `aria-hidden` — they are a reading aid on the
 * page, not information, and a screen reader announcing "zero three" before
 * every heading is noise.
 */
export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  tone = "dark",
}: {
  eyebrow: string;
  /** Two-digit section marker, e.g. "03". Decorative. */
  index?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** `blue` is for a section that sits on the full blue ground. */
  tone?: "dark" | "blue";
}) {
  const onBlue = tone === "blue";

  return (
    <div className="reveal">
      <div className="flex items-center gap-4 sm:gap-6">
        <span
          className={`eyebrow shrink-0 ${onBlue ? "text-on-blue" : "text-blue-pale"}`}
        >
          {eyebrow}
        </span>
        <span
          className={`h-px flex-1 ${onBlue ? "bg-on-blue-line" : "bg-line"}`}
          aria-hidden
        />
        {index && (
          <span
            className={`eyebrow shrink-0 tabular-nums ${
              onBlue ? "text-on-blue-muted" : "text-ink-dim"
            }`}
            aria-hidden
          >
            {index}
          </span>
        )}
      </div>

      <div className="mt-8 max-w-3xl">
        <h2
          className={`text-[28px] leading-[1.12] font-bold tracking-[-0.025em] text-balance sm:text-[38px] ${
            onBlue ? "text-on-blue" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {lead && (
          <p
            className={`mt-6 max-w-2xl text-[16px] leading-[1.65] sm:text-[17px] ${
              onBlue ? "text-on-blue-muted" : "text-ink-muted"
            }`}
          >
            {lead}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * The corporate headline treatment: the words a heading turns on, set in a
 * pale-to-bright blue gradient. One run per heading; two and neither reads as
 * the point.
 */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="from-blue-pale to-blue-bright bg-gradient-to-r bg-clip-text text-transparent">
      {children}
    </span>
  );
}
