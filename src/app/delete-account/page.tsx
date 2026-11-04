import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
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
    heading: "Why there is no delete button in the app",
    paragraphs: [
      `${site.name} is a business app. Accounts are set up by the brand or by the owner of a dealer business, not by signing up, and deleting one affects the location it belongs to and any leads still assigned to it. So we delete accounts on request, once we have confirmed the request comes from the account holder.`,
    ],
  },
  {
    heading: "1. Prepare your request",
    paragraphs: [
      "Include your full name, the username you use in the app, the name of the dealer business you work for, and a clear statement such as: “Please delete my account and my personal information.”",
    ],
  },
  {
    heading: "2. Send it",
    paragraphs: [
      `Email it to ${site.contact.privacy} with “Account deletion request” in the subject line.`,
    ],
  },
  {
    heading: "3. We confirm it is you",
    paragraphs: [
      "We check that the request comes from the account holder, and may ask for more information. This stops anyone else from deleting your account in your name.",
    ],
  },
  {
    heading: "4. We delete the account and tell you",
    paragraphs: [
      `We complete the request within ${site.retention.deletionDays} days and confirm it by email to the address you wrote from. Copies in our backups are overwritten within ${site.retention.backupDays} days after that.`,
    ],
  },
  {
    heading: "What is deleted",
    paragraphs: [
      "Your account record, name, username and password, the notification tokens of your phones, and your links to dealer locations.",
    ],
  },
  {
    heading: "What is kept, without your name",
    paragraphs: [
      "Leads and appointments you followed up are the brand's records, so they stay with the brand. The fields in them that identify you are anonymized. The same applies to the record of customer phone numbers opened from your account, which we keep for as long as security and audit needs require.",
    ],
  },
  {
    heading: "After deletion",
    paragraphs: [
      "You can no longer sign in, and notifications stop. Deletion cannot be undone. If you need access again, the brand or the owner of your dealer business has to set up a new account, and nothing from the old account carries over.",
    ],
  },
];

export default function DeleteAccount() {
  return (
    <LegalPage
      eyebrow="Account"
      title="Delete your account"
      effective={site.privacyUpdatedLabel}
      intro={`You can ask us to delete your ${site.name} account and the personal information linked to it, even if you have deleted the app or can no longer sign in.`}
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
        . The steps below say what to include.
      </p>
    </LegalPage>
  );
}
