import Image from "next/image";
import { site } from "@/lib/site";

/**
 * The brand logo, mark and wordmark together.
 *
 * The file served here is `leadhanger-logo-on-dark.svg`, a recolour of the
 * supplied master (`leadhanger-logo.svg`, still in the same folder). It has to
 * be a separate file rather than a filter or a `currentColor` swap, because the
 * mark is two-tone and the wordmark is drawn as paths: the master paints the
 * name in #161A25, which is invisible on this page's ground, and its two blues
 * do not match the corporate set. The recolour maps those three fills onto
 * corporate values (ink, blue-pale, blue-bright) and changes nothing else.
 *
 * Both files carry their own letterforms rather than setting the name in HTML,
 * so the wordmark never depends on the page's webfont having loaded. That also
 * means it does NOT follow the ink token: if `--color-ink` moves, the SVG has to
 * be redrawn, not restyled.
 *
 * `unoptimized`: Next's image optimizer refuses SVG by default on security
 * grounds, and the request 400s without this flag.
 *
 * Height is fixed and width follows it, because the file's own 140×30 ratio is
 * the only correct one.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/leadhanger-logo-on-dark.svg"
      alt={site.name}
      width={140}
      height={30}
      unoptimized
      priority
      className={`h-7 w-auto ${className}`}
    />
  );
}
