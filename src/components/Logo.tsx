import Image from "next/image";
import { site } from "@/lib/site";

/**
 * Mark from a file, wordmark in HTML.
 *
 * The wordmark is deliberately NOT part of the SVG: text inside an SVG renders
 * with whatever font the viewer happens to have, so the name would drift away
 * from the rest of the page. Setting it in HTML keeps it on the site's own
 * typeface at every size.
 *
 * `unoptimized`: Next's image optimizer refuses SVG by default on security
 * grounds, and the request 400s without this flag.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/images/leadhanger-mark.svg"
        alt=""
        width={32}
        height={32}
        unoptimized
        priority
        className="size-7"
      />
      <span className="text-[19px] font-bold tracking-[-0.02em] text-ink">
        {site.name}
      </span>
    </span>
  );
}
