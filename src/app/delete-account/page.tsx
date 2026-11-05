import type { Metadata } from "next";
import { LegalPage, mailLink } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description: `How to ask us to delete your ${site.name} app account, what is deleted and what is kept, and how long it takes.`,
  alternates: { canonical: "/delete-account" },
  robots: { index: true, follow: true },
};

/**
 * The account deletion page, modelled on yenimusterim.com/hesap-silme (same
 * app, same decision, November 4, 2026): the app has no sign-up, so it has no
 * delete button either. Accounts are created centrally, or by an owner for
 * their staff, and deleted on request after the requester is verified.
 *
 * Built for App Review first: /privacy and /support point here, so a reviewer
 * who looks for account deletion finds a complete path without the app. If the
 * app goes to Google Play later, this is also the deletion URL Play Console
 * asks for. The day counts come from `site.retention`, the same values
 * /privacy prints, and are an open item until confirmed. What
 * is deleted and what is anonymized describes the team's deletion procedure,
 * which is manual until the backend has a deletion job; confirm with the
 * backend team that it does exactly this before publishing.
 */
const sections = [
  {
    heading: "Why we handle deletion by request",
    paragraphs: [
      `${site.name} is a business app. The brand or the owner of a location creates each account, and deleting an account affects that location and any leads still assigned to it. For this reason, we delete accounts on request, after we confirm the account holder's identity.`,
    ],
  },
  {
    heading: "1. Prepare your request",
    paragraphs: [
      "Include your full name, the username you use in the app, the name of the location you work for, and a clear statement such as “Please delete my account and my personal information.”",
    ],
  },
  {
    heading: "2. Submit your request",
    paragraphs: [
      `Email your request to ${mailLink(site.contact.privacy)} with “Account deletion request” in the subject line.`,
    ],
  },
  {
    heading: "3. Identity verification",
    paragraphs: [
      "We verify that the request comes from the account holder and may ask for additional information. This step prevents others from requesting deletion on your behalf.",
    ],
  },
  {
    heading: "4. Deletion and confirmation",
    paragraphs: [
      `We complete the request within ${site.retention.deletionDays} days and confirm it by email to the address the request came from. We overwrite the copies in our backups within ${site.retention.backupDays} days after that.`,
    ],
  },
  {
    heading: "Data we delete",
    paragraphs: [
      "Your account record, name, username and password, the notification tokens of your devices, and your links to locations.",
    ],
  },
  {
    heading: "Data we retain",
    paragraphs: [
      "Leads and appointments you followed up are the brand's records and remain with the brand. We anonymize the fields in them that identify you. The record of customer phone numbers opened at your locations identifies the location, not you, and we retain it for as long as security and audit requirements apply.",
    ],
  },
  {
    heading: "After deletion",
    paragraphs: [
      "Once we complete your request, your account cannot be restored. If you need access again, the brand or the owner of your location can create a new account.",
    ],
  },
];

export default function DeleteAccount() {
  return (
    <LegalPage
      eyebrow="Account"
      title="Delete Your Account"
      effective={site.privacyUpdatedLabel}
      intro={`You can request deletion of your ${site.name} account and the personal information linked to it, including after you have deleted the app or if you can no longer sign in.`}
      sections={sections}
    >
      <p className="text-ink-muted mt-6 text-[15.5px] leading-[1.75]">
        Send your request to{" "}
        <a
          href={`mailto:${site.contact.privacy}?subject=Account%20deletion%20request`}
          className="text-blue-pale decoration-blue/60 hover:decoration-blue-pale font-semibold underline underline-offset-[5px] transition-colors"
        >
          {site.contact.privacy}
        </a>
        . The steps below describe what to include.
      </p>
    </LegalPage>
  );
}
