import Link from "next/link";
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Section } from "./Section";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { FeatureList } from "./FeatureList";
import { AuditCall } from "./AuditCall";
import { TextPlaceholder } from "./DraftNote";
import { Proof } from "./Proof";
import { site } from "@/lib/site";
import type { ProductSurface } from "@/lib/product";

/** The hero's proof: where LeadHanger runs, named as `site.reference` allows. */
export const referenceLine = `Running at ${site.reference.name} since ${site.reference.since}`;

/**
 * The opening of a product page: the page's name over a rule, the headline,
 * the lead, and the screen beside them from `lg`. /how-it-works and the two
 * surface pages share it.
 */
export function ProductHero({
  eyebrow,
  title,
  lead,
  media,
  proof,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  media?: ReactNode;
  /** One line of proof under the lead. */
  proof?: string;
  children?: ReactNode;
}) {
  return (
    <Section pad="tight">
      <div
        className={`grid gap-12 lg:items-center lg:gap-16 ${
          media ? "lg:grid-cols-[1.15fr_0.85fr]" : ""
        }`}
      >
        <div className="reveal">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="eyebrow text-blue-pale shrink-0">{eyebrow}</span>
            <span className="bg-line h-px flex-1" aria-hidden />
          </div>
          <h1 className="text-ink mt-8 max-w-3xl text-[30px] leading-[1.08] font-bold tracking-[-0.03em] text-balance sm:text-[42px]">
            {title}
          </h1>
          <p className="text-ink-muted mt-6 max-w-2xl text-[15px] leading-[1.65] sm:text-[17px]">
            {lead}
          </p>
          {proof && (
            <p className="border-blue-pale text-ink-muted mt-6 border-l-2 pl-3 text-[14.5px]">
              {proof}
            </p>
          )}
          {children}
        </div>
        {media && <div className="reveal flex justify-center lg:justify-end">{media}</div>}
      </div>
    </Section>
  );
}

/**
 * /dealer-app and /brand-dashboard: the hero with the surface's screen, what
 * it does in a few labelled lists, a second screen where there is one, a
 * link to the other surface, and the audit. Content in lib/product.ts.
 */
export function ProductPage({ surface }: { surface: ProductSurface }) {
  return (
    <>
      <Header />

      <main className="flex-1">
        <ProductHero
          eyebrow={surface.name}
          title={surface.title}
          lead={surface.lead}
          media={<MediaPlaceholder label={surface.screen.label} kind={surface.screen.kind} />}
          proof={referenceLine}
        >
          {surface.slug === "dealer-app" && (
            <p className="mt-8">
              <TextPlaceholder>
                App Store and Google Play badges, once the US app is approved
              </TextPlaceholder>
            </p>
          )}
        </ProductHero>

        <Section className="border-line border-t">
          <div className="reveal-stack grid gap-4 lg:grid-cols-3">
            {surface.sections.map((section) => (
              <div key={section.title} className="border-line bg-panel rounded-lg border p-6 sm:p-7">
                <h2 className="text-ink text-[20px] leading-tight font-bold tracking-[-0.015em]">
                  {section.title}
                </h2>
                {section.proof && <Proof proof={section.proof} className="mt-4" />}
                <div className="mt-5">
                  <FeatureList items={section.items} />
                </div>
              </div>
            ))}
          </div>

          {surface.secondScreen && (
            <div className="reveal mt-12 flex justify-center">
              <MediaPlaceholder
                label={surface.secondScreen.label}
                kind={surface.secondScreen.kind}
              />
            </div>
          )}

          <p className="text-ink-muted mt-12 text-[15px]">
            {surface.other.lead}{" "}
            <Link
              href={surface.other.href}
              className="text-blue-pale decoration-blue/60 hover:decoration-blue-pale font-semibold underline underline-offset-[5px] transition-colors"
            >
              {surface.other.label}
            </Link>
          </p>
        </Section>

        <AuditCall />
      </main>

      <Footer />
    </>
  );
}
