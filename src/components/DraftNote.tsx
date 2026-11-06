import type { ReactNode } from "react";

/**
 * Marks a page that is not ready to publish (decided November 6, 2026: such
 * pages stay on their branch until their content exists). A dashed band at
 * the top of the page, so nobody mistakes the draft for the finished page.
 * Remove it, and the page's `noindex`, when the content is in.
 */
export function DraftBanner({ children }: { children: ReactNode }) {
  return (
    <div className="border-line-strong bg-panel/60 text-ink-muted rounded-lg border border-dashed px-5 py-4 text-[14px] leading-[1.6]">
      <span className="eyebrow text-blue-pale mr-3">Work in progress</span>
      {children}
    </div>
  );
}

/**
 * A figure that is on the page but not yet checked against its source: the
 * value, framed and marked "to verify", so a reviewer sees which numbers are
 * pending. Replace it with the plain value once the figure is checked.
 */
export function UnverifiedFigure({ children }: { children: ReactNode }) {
  return (
    <span className="border-line-strong inline-flex items-baseline gap-2 rounded-md border border-dashed px-2 py-0.5">
      {children}
      <span className="text-ink-dim text-[0.7em] font-medium tracking-normal">to verify</span>
    </span>
  );
}

/**
 * Stands in for a piece of text that is missing, and says what is missing
 * and why. Dashed, like MediaPlaceholder, so it never reads as finished copy.
 */
export function TextPlaceholder({ children }: { children: ReactNode }) {
  return (
    <span className="border-line-strong text-ink-dim inline-flex items-center gap-2 rounded-md border border-dashed px-3 py-1.5 text-[13.5px] leading-[1.5]">
      <span aria-hidden className="text-blue-pale">
        ◌
      </span>
      {children}
    </span>
  );
}
