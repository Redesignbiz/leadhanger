import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

// The product: the home page's sections, /plans and /trust, the same
// order as the header.
const sections = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Results", href: "/#results" },
  { label: "Plans", href: "/plans" },
  { label: "Trust", href: "/trust" },
];

// Privacy, support and an address.
const more = [
  // In the column, not only in the small legal line: people look for it here,
  // and California (CalOPPA) expects a conspicuous privacy policy link.
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Support", href: "/support" },
];

// On every page, small, in the line under the columns, where Twilio's A2P
// reviewers look for them. The Privacy Policy is in the column above, once.
// /delete-account is not here; dealers reach it from /support and /privacy.
const legal = [
  { label: "SMS Terms", href: "/sms-terms" },
  { label: "SMS Consent", href: "/sms-consent" },
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
                {sections.map((item) => {
                  const className =
                    "text-ink-muted hover:text-ink text-[14px] transition-colors";
                  // Same rule as the header: a "/#section" anchor stays a
                  // plain `a`, a route gets `Link` (see Header.tsx).
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

              <nav className="flex flex-col gap-3.5">
                {/* Only what a buyer looks for besides the product; the SMS
                    pages live in the line at the bottom. */}
                <p className="eyebrow text-ink-dim mb-1">More</p>
                {more.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-ink-muted hover:text-ink text-[14px] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={`mailto:${site.contact.sales}`}
                  className="text-ink-muted hover:text-ink text-[14px] transition-colors"
                >
                  {site.contact.sales}
                </a>
              </nav>
            </div>
          </div>

          <div className="border-line text-ink-dim mt-12 flex flex-col gap-3 border-t pt-6 text-[12px] sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.company.legalName}. All rights
              reserved.
            </p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
              {legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-ink transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              {/* A plain `a`: /llms.txt is a text file for AI assistants, not
                  a page, so there is nothing for `Link` to prefetch. The
                  website brief puts the link in the footer. */}
              <a href="/llms.txt" className="hover:text-ink transition-colors">
                llms.txt
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
