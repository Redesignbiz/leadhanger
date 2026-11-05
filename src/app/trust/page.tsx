import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security & Compliance",
  description: `Who can see ${site.name} data, how it is protected, and how consent and text messages are handled.`,
  alternates: { canonical: "/trust" },
  robots: { index: true, follow: true },
};

/**
 * Written for the buyer's IT, security and legal reviewer, the second visitor
 * from a buyer's team: where the data is, who can see it, how consent and text
 * messages are handled. This reader checks claims, so every statement here
 * describes the platform as built (brisa-frontend, checked November 5, 2026).
 * The address and the page name ("Security & compliance" at /trust) follow the
 * website brief in Drive (November 3, 2026).
 *
 * The data region is undecided, an open item in docs/leadhanger-us-brief.md.
 * It comes from `site.dataRegions`, and the "Where data is stored" section is
 * left out while that list is empty. Do not write a region here by hand.
 *
 * Deliberately absent until they are true or decided, and listed in the brief:
 * SOC 2 status, encryption at rest (state it once the hosting provider is
 * named), a consent record stored with each lead (TCPA), CRM integrations,
 * SSO or multi-factor sign-in, and a DPA. Do not add any of them before then.
 *
 * Keep the service provider list and the retention figures in step with
 * /privacy. The phone number log stores the dealer location and the time, not
 * the account; say no more than that.
 */
const regions = site.dataRegions.length
  ? new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(
      site.dataRegions,
    )
  : null;

const sections = [
  ...(regions
    ? [
        {
          heading: "Where data is stored",
          paragraphs: [
            `${site.name} stores its data in data centers in ${regions}.`,
          ],
        },
      ]
    : []),
  {
    heading: "Who can see what",
    paragraphs: [
      "Each dealer account sees only the leads routed to its own locations. The server enforces this, not the app. An owner can give staff access to some of the owner's locations, never to more. The brand sees its whole network in the dashboard.",
    ],
  },
  {
    heading: "Customer phone numbers",
    paragraphs: [
      "In the dealer app, a customer's phone number stays partly hidden until a dealer opens it. Each opening is recorded with the dealer location and the time.",
    ],
  },
  {
    heading: "Sign-in and encryption",
    paragraphs: [
      "Passwords are stored as one-way hashes. A sign-in issues a signed token that expires. Each account's sign-ins and failed attempts are recorded. Traffic between the chat, the dealer app, the dashboard and our servers is encrypted in transit.",
    ],
  },
  {
    heading: "Consent in the chat",
    paragraphs: [
      "The chat shows the brand's own consent text and can link to the brand's privacy notice. The visitor has to accept it before the request is sent. Optional permissions, such as agreeing to calls or texts, are separate choices.",
    ],
  },
  {
    heading: "Text messages",
    paragraphs: [
      "Text messages about a request are sent through Twilio, under a registered A2P 10DLC brand. Recipients can reply STOP to opt out or HELP for help, and SMS opt-in data is never shared for marketing. The SMS Terms and the consent wording are published on this site.",
    ],
  },
  {
    heading: "How leads arrive",
    paragraphs: [
      "Leads come from the chat on the brand's website, or from the brand's own systems through our lead intake API. The API is called over HTTPS, with an API key we issue.",
    ],
  },
  {
    heading: "Service providers",
    paragraphs: [
      "Our cloud hosting provider, which stores the data; our email provider; Twilio, which delivers text messages; Expo, which delivers app notifications and app updates; and Apple and Google, whose notification services carry notifications to phones. Each processes data only to provide its service to us, under contract.",
    ],
  },
  {
    heading: "Retention and deletion",
    paragraphs: [
      `Leads are kept for as long as the brand's contract requires. When a dealer asks for their account to be deleted, we remove it from live systems within ${site.retention.deletionDays} days and from backups within ${site.retention.backupDays} days after that. The Privacy Policy and the account deletion page give the details.`,
    ],
  },
  {
    heading: "Security questions",
    paragraphs: [
      `For a security questionnaire, or to report a vulnerability, email ${site.contact.security}.`,
    ],
  },
];

const related = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "SMS Terms", href: "/sms-terms" },
  { label: "SMS Consent", href: "/sms-consent" },
  { label: "Delete your account", href: "/delete-account" },
];

export default function Security() {
  return (
    <LegalPage
      eyebrow="Trust"
      title="Security and compliance"
      intro={`Who can see ${site.name} data, how it is protected, and how consent and text messages are handled.`}
      email={site.contact.security}
      sections={sections}
    >
      <nav
        aria-label="Related pages"
        className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14px]"
      >
        {related.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-blue-pale decoration-blue/60 hover:decoration-blue-pale font-semibold underline underline-offset-[5px] transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </LegalPage>
  );
}
