import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

const sections = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Platform", href: "/#platform" },
  { label: "Results", href: "/#results" },
];

/**
 * The footer closes the ruled column: same measure, same side rules, so the two
 * vertical lines run from the top of the header to the bottom of the page
 * without a break.
 */
export function Footer() {
  return (
    <footer className="border-line bg-ground-deep mt-auto border-t">
      <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
        <div className="px-5 py-14 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Logo />
              <p className="text-ink-muted mt-4 max-w-xs text-[14px] leading-[1.5]">
                {site.tagline}
              </p>
              <p className="text-ink-dim mt-5 text-[13px] leading-[1.5]">
                Built and operated by{" "}
                <a
                  href={site.company.href}
                  className="text-ink-muted hover:text-ink font-medium underline underline-offset-4 transition-colors"
                >
                  {site.company.shortName}
                </a>
              </p>
            </div>

            <div className="flex gap-12 sm:gap-20">
              <nav className="flex flex-col gap-3.5">
                <p className="eyebrow text-ink-dim mb-1">Sections</p>
                {sections.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-ink-muted hover:text-ink text-[14px] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <nav className="flex flex-col gap-3.5">
                {/* Routes and an address, as against the anchors on the left.
                    Hence "More" rather than "Contact": the column stopped being
                    only contact details when /our-solution joined it. */}
                <p className="eyebrow text-ink-dim mb-1">More</p>
                <Link
                  href="/our-solution"
                  className="text-ink-muted hover:text-ink text-[14px] transition-colors"
                >
                  Our solution
                </Link>
                <Link
                  href="/privacy"
                  className="text-ink-muted hover:text-ink text-[14px] transition-colors"
                >
                  Privacy
                </Link>
                <a
                  href={`mailto:${site.contact.sales}`}
                  className="text-ink-muted hover:text-ink text-[14px] transition-colors"
                >
                  {site.contact.sales}
                </a>
              </nav>
            </div>
          </div>

          <p className="border-line text-ink-dim mt-12 border-t pt-6 text-[12px]">
            © {new Date().getFullYear()} {site.company.legalName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
