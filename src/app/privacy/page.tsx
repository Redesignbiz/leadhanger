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
 *      wrong and, in several US states, makes a consent banner necessary. The
 *      one exception is the product video, and only after a visitor presses
 *      play (see components/Video.tsx); the notice says so.
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
      "The one exception is the product video on the home page. Nothing is loaded from YouTube until you press play. When you do, the video player loads from YouTube's privacy-enhanced domain (youtube-nocookie.com), and YouTube's own privacy policy applies to what it collects from then on.",
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
      "If this notice changes, the effective date at the top of this page changes with it. Material changes will be described here rather than made quietly.",
    ],
  },
];

export default function Privacy() {
  return (
    <>
      <Header />

      {/*
        Long-form legal copy, held to the same measure and the same side rules
        as every section on the home page, so /privacy reads as part of the site
        rather than as a document someone linked to. The measure inside is
        narrower than the rules, because a 1150px line length is unreadable and
        a privacy notice is the one page here that is genuinely read.
      */}
      <main className="flex-1">
        <div className="border-line mx-auto w-full max-w-6xl lg:border-x">
          <div className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
            <article className="w-full max-w-2xl">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="eyebrow text-blue-pale shrink-0">Legal</span>
                <span className="bg-line h-px flex-1" aria-hidden />
              </div>

              <h1 className="text-ink mt-8 text-[30px] leading-[1.1] font-bold tracking-[-0.03em] sm:text-[40px]">
                Privacy Notice
              </h1>
              <p className="text-ink-dim mt-4 text-[12.5px]">
                Effective {site.privacyUpdatedLabel}
              </p>

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
