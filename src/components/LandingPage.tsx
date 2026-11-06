import Link from "next/link";
import { site } from "@/lib/site";
import { audit } from "@/lib/audit";
import { verticalBySlug } from "@/lib/verticals";
import { landingSteps, type Landing } from "@/lib/landing";
import { Logo } from "./Logo";
import { Section } from "./Section";
import { AuditForm } from "./AuditForm";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { ProductScreen } from "./ProductScreen";
import { UnverifiedFigure } from "./DraftNote";
import { referenceLine } from "./ProductPage";

/**
 * An ad landing page, from the website brief (Drive, November 3, 2026,
 * p.18): one message, one form, no menu. The header carries only the logo and
 * "Get a free audit", which jumps to the form; the first screen has the
 * headline for the search and the audit form; then three proof lines, the
 * four steps with one screen, and the free pilot. No video, so the page stays
 * light on a phone. Not indexed: organic search lands on the vertical pages.
 *
 * The form records the ad's UTM parameters and Google Ads click ID with the
 * request (AuditForm, lib/audit.ts). /privacy says the click ID goes back to
 * Google when a click leads to a request; that upload is not built yet.
 *
 * The proof lines are the brief's "Brisa, a Bridgestone company · 47 dealers,
 * 20 regions · New York", with the client named anonymously
 * (`site.reference`) until its written permission (decided November 6, 2026)
 * and the dealer count marked to verify (the network is passing 100). The
 * screen is an English mockup (lib/screens.ts) until the English screens.
 */
export function LandingPage({ landing }: { landing: Landing }) {
  const vertical = verticalBySlug(landing.industry);

  return (
    <>
      <header className="border-line bg-ground/75 sticky top-0 z-50 border-b backdrop-blur-xl">
        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-8 lg:px-12">
            <Link href="/" className="shrink-0">
              <Logo />
            </Link>
            <a
              href="#audit"
              className="bg-blue hover:bg-blue-hover shrink-0 rounded-full px-3.5 py-2 text-[13.5px] font-semibold text-white transition-colors sm:px-5 sm:text-[14.5px]"
            >
              {audit.cta}
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Section pad="tight">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
            <div>
              <p className="eyebrow text-blue-pale">
                {site.category} · {vertical.name}
              </p>
              <h1 className="text-ink mt-6 text-[30px] leading-[1.08] font-bold tracking-[-0.03em] text-balance sm:text-[42px]">
                {landing.headline}
              </h1>
              <p className="text-ink-muted mt-6 max-w-xl text-[15px] leading-[1.65] sm:text-[17px]">
                {vertical.lead}
              </p>

              <ul className="mt-8 flex flex-col items-start gap-2.5 text-[14px]">
                <li className="text-ink-muted">{referenceLine}</li>
                <li className="text-ink-muted">
                  <UnverifiedFigure>47 dealers in 20 regions</UnverifiedFigure>
                </li>
                <li className="text-ink-muted">New York team</li>
              </ul>
            </div>

            <div
              id="audit"
              className="border-line bg-panel scroll-mt-24 rounded-lg border p-6 sm:p-8"
            >
              <AuditForm variant="embedded" industry={landing.industry} />
            </div>
          </div>
        </Section>

        <Section className="border-line border-t">
          <h2 className="text-ink text-[28px] leading-[1.12] font-bold tracking-[-0.025em] sm:text-[34px]">
            How it works
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {landingSteps.map((step, index) => (
              <li key={step.title} className="border-line-strong border-t pt-4">
                <p className="text-ink flex flex-wrap items-center gap-x-2 gap-y-1 text-[16px] font-semibold">
                  <span className="text-blue-pale tabular-nums">{index + 1}.</span>
                  {step.title}
                  {step.availability && <AvailabilityBadge value={step.availability} />}
                </p>
                <p className="text-ink-muted mt-2 text-[15px] leading-[1.6]">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex justify-center">
            <ProductScreen screen={landing.screen} />
          </div>
        </Section>

        <Section className="border-line border-t" pad="tight">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-ink text-[24px] leading-tight font-bold tracking-[-0.02em] sm:text-[28px]">
              Start with a free 60-day pilot
            </h2>
            <p className="text-ink-muted max-w-xl text-[15px] leading-[1.65]">
              A pilot runs for 60 days, free, on the brand dashboard and without
              connecting your systems.
            </p>
            <a
              href="#audit"
              className="bg-blue hover:bg-blue-hover mt-2 rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-colors"
            >
              {audit.cta}
            </a>
          </div>
        </Section>
      </main>

      <footer className="border-line bg-ground-deep border-t">
        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="text-ink-dim flex flex-col gap-3 px-5 py-8 text-[12px] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
            <p>
              © {new Date().getFullYear()} {site.company.legalName}
            </p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/privacy" className="hover:text-ink transition-colors">
                Privacy Policy
              </Link>
              <Link href="/sms-terms" className="hover:text-ink transition-colors">
                SMS Terms
              </Link>
              <Link href="/sms-consent" className="hover:text-ink transition-colors">
                SMS Consent
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
