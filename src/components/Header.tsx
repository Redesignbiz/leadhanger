import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

const nav = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Platform", href: "/#platform" },
  { label: "Results", href: "/#results" },
  { label: "Plans", href: "/#plans" },
];

/**
 * Anchor links use an absolute path ("/#plans"), never a bare fragment.
 *
 * The header renders on every route. A bare "#plans" is dead on /privacy,
 * because that anchor only exists on the home page.
 *
 * They are also plain `a` elements rather than `Link`, on purpose: on the home
 * page a `Link` resolves to the current route with only the hash differing, the
 * router does not count that as a navigation, and the scroll never fires, so
 * the link looks broken. A plain `a` bypasses the router entirely, which costs
 * a full page load when jumping from /privacy back to a section. On a two-page
 * static site that is the cheaper of the two problems.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[14px] font-semibold text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/#demo"
          className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-bright sm:px-5"
        >
          {site.cta}
        </a>
      </div>
    </header>
  );
}
