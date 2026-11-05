import type { ReactNode } from "react";
import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { site } from "@/lib/site";

/** A paragraph, or a paragraph that opens with a bold run-in label. */
export type LegalText = string | { lead: string; text: string };

/** One block in a section: a paragraph, or a bulleted list. */
export type LegalBlock = LegalText | { items: readonly LegalText[] };

export type LegalSection = {
  heading: string;
  /** Anchor for an in-page link to this section. */
  id?: string;
  /** Consecutive sections with the same group sit under one group heading. */
  group?: string;
  paragraphs: readonly LegalBlock[];
};

/** The anchor a group heading gets, for "On this page" links. */
export function anchorFor(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Links inside section text are written `[label](href)`. A path ("/privacy")
 * becomes a `Link`; "mailto:" and "#anchor" become plain anchors. Links to
 * other pages belong in the sentence that needs them, not in a row of their
 * own: a row of links under the title reads like the "On this page" band and
 * the two get mixed up.
 */
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const linkClass =
  "text-blue-pale decoration-blue/60 hover:decoration-blue-pale font-medium underline underline-offset-[4px] transition-colors";

/** `[address](mailto:address)`, for an email address inside section text. */
export function mailLink(address: string) {
  return `[${address}](mailto:${address})`;
}

function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    const at = match.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(
      href.startsWith("/") ? (
        <Link key={at} href={href} className={linkClass}>
          {label}
        </Link>
      ) : (
        <a key={at} href={href} className={linkClass}>
          {label}
        </a>
      ),
    );
    last = at + whole.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

function Text({ value }: { value: LegalText }) {
  if (typeof value === "string") return <Inline text={value} />;
  return (
    <>
      <strong className="text-ink font-semibold">{value.lead}</strong>{" "}
      <Inline text={value.text} />
    </>
  );
}

function groupSections(sections: readonly LegalSection[]) {
  const blocks: { group?: string; sections: LegalSection[] }[] = [];
  for (const section of sections) {
    const last = blocks[blocks.length - 1];
    if (last && last.group === section.group) last.sections.push(section);
    else blocks.push({ group: section.group, sections: [section] });
  }
  return blocks;
}

/**
 * Shared frame for /privacy, /sms-terms, /sms-consent, /support, /trust and
 * /delete-account. Long-form copy, held to the same measure and the same side
 * rules as every section on the home page, so these pages read as part of the
 * site rather than as documents someone linked to. The measure inside is
 * narrower than the rules, because a 1150px line length is unreadable and these
 * are the pages that are genuinely read (by visitors, by carrier reviewers
 * checking SMS compliance, by App Review checking the privacy and support URLs,
 * and by a buyer's IT and legal reviewers).
 *
 * Page names are in Title Case ("Delete Your Account"), section headings in
 * sentence case. A page that speaks to more than one reader groups its sections
 * (`group`): each group gets a real h2 and its sections h3. With `contents`, the
 * "On this page" list is built from those same group headings, plus "Contact
 * us", so the list and the headings can never say different things.
 * /support and /trust are not legal documents, so they pass their own eyebrow,
 * address and date label.
 */
export function LegalPage({
  title,
  effective,
  dateLabel = "Effective",
  intro,
  contents = false,
  sections,
  children,
  eyebrow = "Legal",
  email = site.contact.privacy,
  contactNote,
}: {
  title: string;
  effective?: string;
  dateLabel?: string;
  intro?: string;
  contents?: boolean;
  sections: readonly LegalSection[];
  children?: ReactNode;
  eyebrow?: string;
  email?: string;
  /** A line inside the "Contact us" box, under the address, such as what to include in a support email. */
  contactNote?: string;
}) {
  const blocks = groupSections(sections);
  const groups = blocks.flatMap((block) => (block.group ? [block.group] : []));
  const onThisPage = [
    ...groups.map((group) => ({ label: group, href: `#${anchorFor(group)}` })),
    { label: "Contact us", href: "#contact" },
  ];

  return (
    <>
      <Header />

      <main className="flex-1">
        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
            <article className="w-full max-w-2xl">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="eyebrow text-blue-pale shrink-0">
                  {eyebrow}
                </span>
                <span className="bg-line h-px flex-1" aria-hidden />
              </div>

              <h1 className="text-ink mt-8 text-[30px] leading-[1.1] font-bold tracking-[-0.03em] sm:text-[40px]">
                {title}
              </h1>
              {effective && (
                <p className="text-ink-dim mt-4 text-[12.5px]">
                  {dateLabel} {effective}
                </p>
              )}
              {intro && (
                <p className="text-ink-muted mt-8 text-[15.5px] leading-[1.75]">
                  {intro}
                </p>
              )}

              {children}

              {/* After `children`, so a page's own opening (the support
                  address) comes first and the "On this page" band leads
                  straight into the sections. Only in-page links go here;
                  links to other pages sit in the sentences that need them. */}
              {contents && groups.length > 0 && (
                <nav
                  aria-labelledby="on-this-page"
                  className="border-line mt-8 border-y py-4"
                >
                  <p
                    id="on-this-page"
                    className="text-ink mb-2.5 text-[14px] font-semibold"
                  >
                    On this page
                  </p>
                  <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
                    {onThisPage.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className="text-ink-muted hover:text-ink font-medium transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div className="mt-12 space-y-14">
                {blocks.map((block, i) => {
                  const Heading = block.group ? "h3" : "h2";
                  return (
                    <div key={block.group ?? `block-${i}`} className="space-y-8">
                      {block.group && (
                        <h2
                          id={anchorFor(block.group)}
                          className="text-ink scroll-mt-28 text-[24px] leading-tight font-bold tracking-[-0.02em] text-balance sm:text-[26px]"
                        >
                          {block.group}
                        </h2>
                      )}
                      {block.sections.map((section) => (
                        <section
                          key={section.heading}
                          id={section.id}
                          className="scroll-mt-28"
                        >
                          <Heading
                            className={
                              block.group
                                ? "text-ink text-[17px] leading-snug font-semibold tracking-[-0.01em]"
                                : "text-ink text-[19px] leading-snug font-bold tracking-[-0.015em]"
                            }
                          >
                            {section.heading}
                          </Heading>
                          {section.paragraphs.map((part, j) =>
                            typeof part === "object" && "items" in part ? (
                              <ul
                                key={j}
                                className="text-ink-muted marker:text-ink-dim mt-4 list-disc space-y-2 pl-5 text-[15.5px] leading-[1.75]"
                              >
                                {part.items.map((item, k) => (
                                  <li key={k}>
                                    <Text value={item} />
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p
                                key={j}
                                className="text-ink-muted mt-4 text-[15.5px] leading-[1.75]"
                              >
                                <Text value={part} />
                              </p>
                            ),
                          )}
                        </section>
                      ))}
                    </div>
                  );
                })}
              </div>

              <div
                id="contact"
                className="border-line bg-panel mt-14 scroll-mt-28 rounded-lg border p-6"
              >
                <h2 className="text-ink text-[17px] font-bold tracking-[-0.015em]">
                  Contact us
                </h2>
                <p className="text-ink-muted mt-3 text-[15px] leading-[1.7]">
                  {site.company.legalName}
                  <br />
                  {site.company.address}
                  <br />
                  {site.offices.map((office) => office.city).join(" · ")}
                  <br />
                  <a
                    href={`mailto:${email}`}
                    className="text-blue-pale decoration-blue/60 hover:decoration-blue-pale font-semibold underline underline-offset-[5px] transition-colors"
                  >
                    {email}
                  </a>
                </p>
                {contactNote && (
                  <p className="text-ink-muted border-line mt-4 border-t pt-4 text-[15px] leading-[1.7]">
                    <Inline text={contactNote} />
                  </p>
                )}
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
