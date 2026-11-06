import Link from "next/link";
import { nav, navAction } from "@/lib/navigation";
import { Logo } from "./Logo";
import { HeaderNav } from "./HeaderNav";

/**
 * The menu itself, the website brief's, is in lib/navigation.ts, shared with
 * the footer.
 *
 * The header carries the same side rules as every Section, so the ruled column
 * starts at the top of the viewport rather than below the fold of the header.
 * The menus themselves are in HeaderNav, a client component, because the
 * drop-downs and the phone menu open and close.
 *
 * Anchor links use an absolute path ("/#results"), never a bare fragment. The
 * header renders on every route, and a bare "#results" is dead on /privacy or
 * /plans, because that anchor only exists on the home page.
 *
 * They are also plain `a` elements rather than `Link`, on purpose: on the home
 * page a `Link` resolves to the current route with only the hash differing, the
 * router does not count that as a navigation, and the scroll never fires, so
 * the link looks broken. A plain `a` bypasses the router entirely, which costs
 * a full page load when jumping from another route back to a section. On a
 * static site of this size that is the cheaper of the two problems. Routes
 * ("/plans", "/trust", the vertical pages) use `Link` and get the prefetch.
 */
export function Header() {
  return (
    <header className="border-line bg-ground/75 sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="border-line relative mx-auto w-full max-w-6xl lg:border-x">
        <div className="flex items-center justify-between gap-3 px-5 py-4 sm:gap-6 sm:px-8 lg:px-12">
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>

          <HeaderNav items={nav} cta={navAction} />
        </div>
      </div>
    </header>
  );
}
