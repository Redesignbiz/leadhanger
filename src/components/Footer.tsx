import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

const sections = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Platform", href: "/#platform" },
  { label: "Results", href: "/#results" },
  { label: "Plans", href: "/#plans" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-outline-variant bg-surface-low">
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-[14px] leading-5 text-ink-muted">
              {site.tagline}
            </p>
            <p className="mt-4 text-[13px] leading-5 text-outline">
              Built and operated by{" "}
              <a
                href={site.company.href}
                className="font-semibold text-ink-muted underline underline-offset-4 transition-colors hover:text-ink"
              >
                {site.company.shortName}
              </a>
            </p>
          </div>

          <div className="flex gap-12 sm:gap-16">
            <nav className="flex flex-col gap-3">
              {sections.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[14px] font-semibold text-ink-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <nav className="flex flex-col gap-3">
              <Link
                href="/privacy"
                className="text-[14px] font-semibold text-ink-muted transition-colors hover:text-ink"
              >
                Privacy
              </Link>
              <a
                href={`mailto:${site.contact.sales}`}
                className="text-[14px] font-semibold text-ink-muted transition-colors hover:text-ink"
              >
                {site.contact.sales}
              </a>
            </nav>
          </div>
        </div>

        <p className="mt-10 border-t border-outline-variant pt-6 text-[13px] text-outline">
          © {new Date().getFullYear()} {site.company.legalName}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
