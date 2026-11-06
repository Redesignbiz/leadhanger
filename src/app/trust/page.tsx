import type { Metadata } from "next";
import { LegalPage, mailLink, type LegalSection } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security & Compliance",
  description: `For the IT, security and legal teams evaluating ${site.name}: access control, authentication, encryption, consent capture, SMS compliance and subprocessors.`,
  alternates: { canonical: "/trust" },
  robots: { index: true, follow: true },
};

/**
 * Written for the buyer's IT, security and legal reviewer, the second visitor
 * from a buyer's team. This reader scans for the categories of a security
 * questionnaire, so the headings use those names (access control,
 * authentication, subprocessors), not everyday ones. This reader also checks
 * claims, so every statement describes the platform as built (brisa-frontend,
 * checked November 5, 2026): bcrypt and JWT are what brisa-backend uses.
 * The address and the page name follow the website brief in Drive
 * (November 3, 2026).
 *
 * The data region is undecided, an open item in docs/leadhanger-us-brief.md.
 * It comes from `site.dataRegions`. While that list is empty, "Data residency"
 * points the reader to us instead of naming a region. Do not write a region
 * here by hand.
 *
 * Deliberately absent until they are true or decided, and listed in the brief:
 * SOC 2 status, encryption at rest (state it once the hosting provider is
 * named), a consent record stored with each lead (TCPA), CRM integrations,
 * SSO or multi-factor sign-in, and a DPA. Do not add any of them before then.
 *
 * Keep the subprocessor list and the retention figures in step with /privacy.
 * The phone number log stores the location and the time, not the account; say
 * no more than that. Move `site.trustReviewedAt` whenever the page is checked
 * against the platform again.
 */
const regions = site.dataRegions.length
  ? new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(
      site.dataRegions,
    )
  : null;

const sections: LegalSection[] = [
  {
    heading: "Data residency",
    paragraphs: [
      regions
        ? `${site.name} stores its data in data centers in ${regions}.`
        : `For information on data residency, contact ${mailLink(site.contact.security)}.`,
    ],
  },
  {
    heading: "Access control",
    paragraphs: [
      "Each account can access only the leads routed to its own locations. The server, not the app, enforces this restriction. Owners can grant staff access to a subset of their own locations only. Brand users see the network in the dashboard according to their role.",
    ],
  },
  {
    heading: "Phone number protection",
    paragraphs: [
      "The LeadHanger app partially masks a customer's phone number until someone at the location reveals it. We log each reveal with the location and the time.",
    ],
  },
  {
    heading: "Authentication",
    paragraphs: [
      "We hash passwords with bcrypt. Sessions use signed tokens (JWT) that expire. We record each account's most recent sign-in and its failed sign-in attempts.",
    ],
  },
  {
    heading: "Encryption",
    paragraphs: [
      "We encrypt traffic between the chat, the LeadHanger app, the dashboard and our servers in transit, using HTTPS (TLS).",
    ],
  },
  {
    heading: "Consent capture",
    paragraphs: [
      "The chat shows the brand's own consent language and can link to the brand's privacy notice. The visitor must accept it before sending the request. Consent to calls and texts is a separate, optional opt-in.",
    ],
  },
  {
    heading: "SMS compliance (A2P 10DLC)",
    paragraphs: [
      "We send text messages about a request through Twilio, under a registered A2P 10DLC brand. Recipients can reply STOP to opt out or HELP for help. We never share SMS opt-in data for marketing. The [SMS Terms](/sms-terms) and [SMS Consent](/sms-consent) pages set out the program terms and the opt-in wording.",
    ],
  },
  {
    heading: "Lead intake API",
    paragraphs: [
      "Leads reach LeadHanger from the chat on the brand's website or from the brand's own systems through our lead intake API. The API accepts requests over HTTPS and authenticates them with an API key we issue. The [Integrations](/integrations) page lists what connects today and what is planned.",
    ],
  },
  {
    heading: "Subprocessors",
    paragraphs: [
      "Each processes data only to provide its service to us, under contract.",
      {
        items: [
          { lead: "Cloud hosting provider", text: "stores the data." },
          { lead: "Email provider", text: "sends and receives our email." },
          { lead: "Twilio", text: "delivers text messages." },
          {
            lead: "Expo",
            text: "delivers app notifications and app updates.",
          },
          {
            lead: "Apple and Google",
            text: "carry notifications to phones through their notification services.",
          },
        ],
      },
    ],
  },
  {
    heading: "Data retention and deletion",
    paragraphs: [
      `We retain leads for the term of the brand's contract. When a location user requests deletion of their account, we remove it from live systems within ${site.retention.deletionDays} days and from backups within ${site.retention.backupDays} days after that. The [Privacy Policy](/privacy) and the [Delete Your Account](/delete-account) page provide details.`,
    ],
  },
  {
    heading: "Security questionnaires and vulnerability reports",
    paragraphs: [
      `For security questionnaires and vulnerability reports, contact ${mailLink(site.contact.security)}.`,
    ],
  },
];

export default function Trust() {
  return (
    <LegalPage
      eyebrow="Trust"
      title="Security & Compliance"
      effective={site.trustReviewedLabel}
      dateLabel="Last reviewed"
      intro={`For the IT, security and legal teams evaluating ${site.name}. On this page, "brand" refers to the company that runs ${site.name}, such as a manufacturer, a franchise system or a retail chain. "Location" refers to any place that receives the brand's leads, such as a dealer, a store or a franchisee.`}
      email={site.contact.security}
      sections={sections}
    />
  );
}
