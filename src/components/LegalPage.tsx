import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { site } from "@/lib/site";

export type LegalSection = { heading: string; paragraphs: string[] };

/**
 * Shared frame for /privacy, /sms-terms and /sms-consent. Long-form legal copy,
 * held to the same measure and the same side rules as every section on the
 * home page, so these pages read as part of the site rather than as documents
 * someone linked to. The measure inside is narrower than the rules, because a
 * 1150px line length is unreadable and these are the pages that are genuinely
 * read (by visitors, and by carrier reviewers checking SMS compliance).
 */
export function LegalPage({
  title,
  effective,
  intro,
  sections,
  children,
}: {
  title: string;
  effective: string;
  intro?: string;
  sections: readonly LegalSection[];
  children?: ReactNode;
}) {
  return (
    <>
      <Header />

      <main className="flex-1">
        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
            <article className="w-full max-w-2xl">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="eyebrow text-blue-pale shrink-0">Legal</span>
                <span className="bg-line h-px flex-1" aria-hidden />
              </div>

              <h1 className="text-ink mt-8 text-[30px] leading-[1.1] font-bold tracking-[-0.03em] sm:text-[40px]">
                {title}
              </h1>
              <p className="text-ink-dim mt-4 text-[12.5px]">
                Effective {effective}
              </p>
              {intro && (
                <p className="text-ink-muted mt-8 text-[15.5px] leading-[1.75]">
                  {intro}
                </p>
              )}

              {children}

              <div className="mt-12 space-y-10">
                {sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-ink text-[19px] leading-snug font-bold tracking-[-0.015em]">
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-ink-muted mt-4 text-[15.5px] leading-[1.75]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </section>
                ))}
              </div>

              <div className="border-line bg-panel mt-14 rounded-lg border p-6">
                <h2 className="text-ink text-[17px] font-bold tracking-[-0.015em]">
                  Contact
                </h2>
                <p className="text-ink-muted mt-3 text-[15px] leading-[1.7]">
                  {site.company.legalName}
                  <br />
                  {site.company.address}
                  <br />
                  {site.offices.map((office) => office.city).join(" · ")}
                  <br />
                  <a
                    href={`mailto:${site.contact.privacy}`}
                    className="text-blue-pale decoration-blue/60 hover:decoration-blue-pale font-semibold underline underline-offset-[5px] transition-colors"
                  >
                    {site.contact.privacy}
                  </a>
                </p>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
