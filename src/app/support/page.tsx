import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description: `Help with the ${site.name} app: signing in, notifications, deleting your account, and how to reach us.`,
  alternates: { canonical: "/support" },
  robots: { index: true, follow: true },
};

/**
 * The Support URL given to App Store Connect, which does not accept a mailto
 * link. App Review opens it to check that a user can reach a person, so the
 * address sits at the top, not only in the contact box at the bottom.
 *
 * Every answer here describes the app as built (brisa-frontend/dealer-mobile):
 * no sign-up and no "forgot password" in the app, password change under the
 * Account tab, push registered again on each sign-in, no delete button
 * (deletion is by request, through /delete-account). Keep it in step with the
 * app.
 */
const sections = [
  {
    heading: "Signing in",
    paragraphs: [
      "Accounts are set up by the brand you work with, or by the owner of your dealer business. There is no sign-up in the app, so if you need an account, ask whoever manages your dealer business.",
      "If you forget your password, ask the owner of your dealer business to set a new one. Owners can ask their brand's LeadHanger administrator, or email us. Once you are signed in, you can change your password at any time from the Account tab.",
    ],
  },
  {
    heading: "Notifications",
    paragraphs: [
      "The app notifies you when a new lead reaches your location. If notifications stop arriving, check that they are allowed for LeadHanger in your phone's settings, then sign out and sign back in. Signing in registers your phone for notifications again.",
    ],
  },
  {
    heading: "Deleting your account",
    paragraphs: [
      "Accounts are deleted on request, not from inside the app. Follow the steps at leadhanger.com/delete-account. You can do this even if you no longer have the app or cannot sign in. What is deleted, and when, is set out in the Privacy Policy at leadhanger.com/privacy.",
    ],
  },
  {
    heading: "Text messages about a request",
    paragraphs: [
      "If you received a text about a quote or appointment request, reply HELP for help or STOP to stop the messages. The full terms are on the SMS Terms page at leadhanger.com/sms-terms.",
    ],
  },
  {
    heading: "For brand teams",
    paragraphs: [
      "Use the same address for anything about the dashboard, lead routing or your dealer accounts.",
    ],
  },
];

export default function Support() {
  return (
    <LegalPage
      eyebrow="Help"
      title="Support"
      email={site.contact.support}
      sections={sections}
    >
      <p className="text-ink-muted mt-8 text-[15.5px] leading-[1.75]">
        Email{" "}
        <a
          href={`mailto:${site.contact.support}`}
          className="text-blue-pale decoration-blue/60 hover:decoration-blue-pale font-semibold underline underline-offset-[5px] transition-colors"
        >
          {site.contact.support}
        </a>{" "}
        with your username, the app version shown in the Account tab, and what
        happened. A screenshot helps.
      </p>
    </LegalPage>
  );
}
