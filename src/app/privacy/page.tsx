import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: `How ${site.company.legalName} handles personal information collected through the ${site.name} website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/**
 * IMPORTANT, and repeated in docs/leadhanger-us-brief.md: this is a drafted
 * notice, written to match what the site as built actually does. It has not
 * been reviewed by counsel, and it must be before launch.
 *
 * Two claims here are only true because of how this codebase is built, and both
 * become false the moment someone changes that:
 *   1. No cookies are set and no analytics script is loaded. Adding Vercel
 *      Analytics, GA, a chat widget or a pixel makes the "no tracking" section
 *      wrong and, in several US states, makes a consent banner necessary.
 *   2. There is no form on the site. Contact happens by email. Adding a form
 *      means naming what it collects and where the submissions are stored.
 */
const sections = [
  {
    heading: "Who this notice covers",
    paragraphs: [
      `${site.company.legalName} ("we") operates ${site.name} and this website at ${site.url.replace(/^https?:\/\//, "")}. This notice explains what happens to personal information you give us through this website, and how to reach us about it.`,
      `It does not cover the LeadHanger platform itself. When a brand runs LeadHanger on its own website, that brand decides what is collected from its visitors and why. We process that information on the brand's instructions, as its service provider, and the brand's own privacy notice governs it. If you spoke to a chat assistant on some other company's site and want your information removed, contact that company. We will support them in handling your request.`,
    ],
  },
  {
    heading: "What we collect here",
    paragraphs: [
      "If you email us, we receive whatever you put in that message: your name, your email address, your company, and anything you choose to tell us about your business. We keep the correspondence so we can answer you and continue the conversation.",
      "Our hosting provider records standard technical information when a page is requested, including IP address, user agent and the URL requested. These logs exist to keep the site available and secure.",
    ],
  },
  {
    heading: "What we do not do",
    paragraphs: [
      "This website sets no cookies, loads no analytics or advertising scripts, and runs no tracking pixels. There is nothing here that follows you to another site, and no profile is built from your visit.",
      "We do not sell personal information, and we do not share it for cross-context behavioral advertising.",
    ],
  },
  {
    heading: "Why we use it",
    paragraphs: [
      "To reply to you, to evaluate whether LeadHanger fits what you are trying to do, and to keep records of our business communications. That is the whole purpose. We do not use messages sent to us for unrelated marketing.",
    ],
  },
  {
    heading: "Who else sees it",
    paragraphs: [
      "Our email and cloud hosting providers, who process it on our behalf under contract and may not use it for their own purposes. We may also disclose information where the law requires it, or to protect our rights.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "Business correspondence is kept for as long as the relationship is active, and afterwards for as long as we may need it for legal, accounting or dispute-resolution reasons. Server logs are kept for a short operational period and then discarded. You can ask us to delete your correspondence sooner.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "Depending on where you live, you may have the right to know what personal information we hold about you, to get a copy of it, to have it corrected, and to have it deleted. You also have the right not to be treated differently for exercising any of these rights.",
      "California residents have these rights under the California Consumer Privacy Act as amended, including the right to opt out of the sale or sharing of personal information. As stated above, we do not sell or share personal information, so there is nothing to opt out of. Residents of other states with comparable laws have comparable rights.",
      `To exercise any of them, email ${site.contact.privacy}. We will verify who you are before acting, which normally means replying from the address we already hold for you, and we will respond within the period the applicable law allows.`,
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "Traffic to this site is encrypted in transit. Access to the mailbox that receives inquiries is limited to the people who need it. No system is perfect, and we do not claim otherwise.",
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "This is a website for businesses. It is not directed to children, and we do not knowingly collect personal information from anyone under 16.",
    ],
  },
  {
    heading: "Changes",
    paragraphs: [
      "If this notice changes, the effective date below changes with it. Material changes will be described here rather than made quietly.",
    ],
  },
];

export default function Privacy() {
  return (
    <>
      <Header />

      <main className="flex-1 px-4 py-14 sm:px-6 sm:py-20">
        <article className="mx-auto w-full max-w-3xl">
          <p className="eyebrow text-primary">Legal</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em] text-ink sm:text-4xl">
            Privacy Notice
          </h1>
          <p className="mt-4 text-[14px] text-outline">
            Effective {site.privacyUpdatedLabel}
          </p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-[19px] font-bold tracking-[-0.015em] text-ink">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-4 text-[16px] leading-7 text-ink-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-outline-variant bg-surface-low p-6">
            <h2 className="text-[17px] font-bold tracking-[-0.01em] text-ink">
              Contact
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-ink-muted">
              {site.company.legalName}
              <br />
              {site.offices.map((office) => office.city).join(" · ")}
              <br />
              <a
                href={`mailto:${site.contact.privacy}`}
                className="font-semibold text-primary underline underline-offset-4 transition-colors hover:text-primary-bright"
              >
                {site.contact.privacy}
              </a>
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
