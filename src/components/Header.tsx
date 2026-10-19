import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

const nav = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Results", href: "/#results" },
  { label: "Our solution", href: "/our-solution" },
];

/**
 * The header carries the same side rules as every Section, so the ruled column
 * starts at the top of the viewport rather than below the fold of the header.
 *
 * Anchor links use an absolute path ("/#results"), never a bare fragment.
 *
 * The header renders on every route. A bare "#results" is dead on /privacy and
 * on /our-solution, because that anchor only exists on the home page.
 *
 * They are also plain `a` elements rather than `Link`, on purpose: on the home
 * page a `Link` resolves to the current route with only the hash differing, the
 * router does not count that as a navigation, and the scroll never fires, so
 * the link looks broken. A plain `a` bypasses the router entirely, which costs
 * a full page load when jumping from another route back to a section. On a
 * static site of this size that is the cheaper of the two problems.
 *
 * "/our-solution" is a route rather than an anchor, so it is the one nav item
 * that does use `Link` — none of the above applies to it, and it gets the
 * prefetch.
 */
export function Header() {
  return (
    <header className="border-line bg-ground/75 sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
        <div className="flex items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const className =
                "text-ink-muted hover:text-ink text-[16px] font-medium transition-colors";

              // A "/#section" link is an anchor and must stay a plain `a`; a
              // bare path is a real route and gets `Link`, for the prefetch.
              return item.href.includes("#") ? (
                <a key={item.href} href={item.href} className={className}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} className={className}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/#demo"
            className="bg-blue hover:bg-blue-hover shrink-0 rounded-full px-4 py-2 text-[14.5px] font-semibold text-white transition-colors sm:px-5"
          >
            {site.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
