import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Section, SectionHeading } from "./Section";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { Faq } from "./Faq";
import { site } from "@/lib/site";
import { audit, auditHref } from "@/lib/audit";
import type { Vertical, VerticalItem } from "@/lib/verticals";

function Item({ item }: { item: VerticalItem }) {
  return (
    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span>{item.text}</span>
      {item.availability && item.availability !== "live" && (
        <AvailabilityBadge value={item.availability} />
      )}
    </span>
  );
}

/**
 * The skeleton both vertical pages share, from the website brief (p.16): a
 * hero with one button per buyer role, the sector's problem, the flow, what
 * each side gets, proof, the systems it works with, questions, and the pilot.
 * Content lives in lib/verticals.ts; nothing sector-specific is written here.
 *
 * Every action on the page leads to the free Lead Response Audit, the brief's
 * main action: the role buttons open /audit with the role and the industry
 * chosen, and the close pairs the audit with the brief's "Ask about a free
 * 60-day pilot", which stays an email until the pilot has a page.
 */
export function VerticalPage({ vertical }: { vertical: Vertical }) {
  return (
    <>
      <Header />

      <main className="flex-1">
        <Section pad="tight">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
            <div className="reveal">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="eyebrow text-blue-pale shrink-0">
                  {site.category} · {vertical.name}
                </span>
                <span className="bg-line h-px flex-1" aria-hidden />
              </div>
              <h1 className="text-ink mt-8 text-[30px] leading-[1.08] font-bold tracking-[-0.03em] text-balance sm:text-[42px]">
                {vertical.headline}
              </h1>
              <p className="text-ink-muted mt-6 max-w-xl text-[15px] leading-[1.65] sm:text-[17px]">
                {vertical.lead}
              </p>
              {vertical.headlineNote && (
                <p className="text-ink-muted mt-4 text-[14px]">
                  <Item item={vertical.headlineNote} />
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                {vertical.roles.map((role, index) => (
                  <Link
                    key={role.label}
                    href={auditHref(role.audit)}
                    className={`rounded-full px-6 py-3 text-[15px] font-semibold transition-colors ${
                      index === 0
                        ? "bg-blue hover:bg-blue-hover text-white"
                        : "border-line-strong text-ink hover:bg-panel-high border"
                    }`}
                  >
                    {role.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="reveal flex justify-center lg:justify-end">
              <MediaPlaceholder label={vertical.screenLabel} />
            </div>
          </div>
        </Section>

        <Section className="border-line border-t">
          <SectionHeading title={vertical.problemsTitle} />
          <div className="reveal-stack mt-12 grid gap-4 md:grid-cols-3">
            {vertical.problems.map((problem) => (
              <div
                key={problem.title}
                className="border-line bg-panel rounded-lg border p-6"
              >
                <h3 className="text-ink text-[17px] leading-snug font-semibold tracking-[-0.01em]">
                  {problem.title}
                </h3>
                <p className="text-ink-muted mt-3 text-[15px] leading-[1.65]">
                  {problem.body}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section className="border-line border-t">
          <SectionHeading title={vertical.stepsTitle} />
          <ol className="reveal-stack mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {vertical.steps.map((step, index) => (
              <li
                key={step.title}
                className="border-line bg-panel flex flex-col rounded-lg border p-6"
              >
                <span className="text-blue-pale text-[13px] font-semibold tabular-nums">
                  {index + 1}
                </span>
                <h3 className="text-ink mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[17px] font-semibold tracking-[-0.01em]">
                  {step.title}
                  {step.availability && step.availability !== "live" && (
                    <AvailabilityBadge value={step.availability} />
                  )}
                </h3>
                <p className="text-ink-muted mt-3 text-[15px] leading-[1.65]">
                  {step.body}
                </p>
                {step.extra && (
                  <ul className="text-ink-muted mt-3 space-y-1.5 text-[14px]">
                    {step.extra.map((item) => (
                      <li key={item.text}>
                        <Item item={item} />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </Section>

        <Section className="border-line border-t">
          <div className="reveal-stack grid gap-4 lg:grid-cols-2">
            {vertical.audiences.map((audience) => (
              <div
                key={audience.title}
                className="border-line bg-panel rounded-lg border p-6 sm:p-7"
              >
                <h2 className="text-ink text-[22px] leading-tight font-bold tracking-[-0.02em]">
                  {audience.title}
                </h2>
                <ul className="text-ink mt-5 space-y-3 text-[15px] leading-[1.5]">
                  {audience.items.map((item) => (
                    <li key={item.text} className="flex gap-3">
                      <span
                        className="bg-blue-pale mt-[0.55em] size-1.5 shrink-0 rounded-full"
                        aria-hidden
                      />
                      <Item item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section className="border-line border-t">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <SectionHeading
              title={vertical.proof.title}
              lead={vertical.proof.body}
            />
            <div className="reveal">
              <MediaPlaceholder label={vertical.proof.videoLabel} kind="video" />
            </div>
          </div>
        </Section>

        <Section className="border-line border-t" pad="tight">
          <div className="reveal flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-ink text-[20px] font-bold tracking-[-0.015em]">
                Works with your systems
              </h2>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5 text-[15px]">
                {vertical.integrations.map((integration) => (
                  <li
                    key={integration.name}
                    className="text-ink flex items-center gap-2"
                  >
                    {integration.name}
                    <AvailabilityBadge value={integration.availability} />
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/integrations"
              className="text-blue-pale decoration-blue/60 hover:decoration-blue-pale shrink-0 text-[15px] font-semibold underline underline-offset-[5px] transition-colors"
            >
              All integrations
            </Link>
          </div>
        </Section>

        <Section className="border-line border-t">
          <SectionHeading title="Frequently asked questions" />
          <div className="mt-12 max-w-3xl">
            <Faq items={vertical.faqs} />
          </div>
        </Section>

        <Section className="border-line border-t" pad="tight">
          <div className="reveal flex flex-col items-center gap-4 text-center">
            <h2 className="text-ink text-[24px] leading-tight font-bold tracking-[-0.02em] sm:text-[28px]">
              {audit.title}
            </h2>
            <p className="text-ink-muted max-w-xl text-[15px] leading-[1.65]">
              {audit.intro} A pilot runs for 60 days, free, on the brand
              dashboard and without connecting your systems.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={auditHref({ industry: vertical.slug })}
                className="bg-blue hover:bg-blue-hover rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-colors"
              >
                {audit.cta}
              </Link>
              <a
                href={`mailto:${site.contact.sales}?subject=${encodeURIComponent(
                  `${site.name} pilot for ${vertical.name}`,
                )}`}
                className="border-line-strong text-ink hover:bg-panel-high rounded-full border px-6 py-3 text-[15px] font-semibold transition-colors"
              >
                Ask about a free 60-day pilot
              </a>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
