import type { Metadata } from "next";
import { LegalPage, mailLink, type LegalSection } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description: `Help with the ${site.name} app and with running ${site.name} for your brand: signing in, notifications, deleting your account, and how to reach us.`,
  alternates: { canonical: "/support" },
  robots: { index: true, follow: true },
};

/**
 * The Support URL given to App Store Connect, which does not accept a mailto
 * link. App Review opens it to check that a user can reach a person: the
 * "Contact us" box holds the address and what to include, and "On this page"
 * links to it from the top.
 *
 * Two readers, grouped and listed at the top: people who use the app at a
 * location (a dealer, a store or a franchisee, so "your manager", never "your
 * dealer business"), and the brand's team. The text-message part is for a
 * third: a brand's customer who asked for a quote and got a text, then looked
 * LeadHanger up. Carriers expect HELP and STOP to be findable.
 *
 * Every answer here describes the app as built (brisa-frontend/dealer-mobile):
 * no sign-up and no "forgot password" in the app, password change under the
 * Account tab, push registered again on each sign-in, no delete button
 * (deletion is by request, through /delete-account). Keep it in step with the
 * app, and keep "Account tab" in step with the app's English labels.
 */
const APP = "Using the LeadHanger app at work";
const BRAND = "Running LeadHanger for your brand";
const TEXTS = "Text messages";

const sections: LegalSection[] = [
  {
    group: APP,
    heading: "Sign-in and passwords",
    paragraphs: [
      "Your manager or your company's LeadHanger administrator creates your account. The app does not offer self sign-up. To request an account, contact one of them.",
      "To reset a forgotten password, contact your manager or your company's LeadHanger administrator. Administrators can also email us. You can change your password at any time from the Account tab.",
    ],
  },
  {
    group: APP,
    heading: "Notifications",
    paragraphs: [
      "The app notifies you when a new lead reaches your location. If notifications stop arriving, confirm that your device settings allow notifications for LeadHanger, then sign out and sign in again to register the device.",
    ],
  },
  {
    group: APP,
    heading: "Account deletion",
    paragraphs: [
      "We delete accounts on request rather than through the app. Follow the steps on the [Delete Your Account](/delete-account) page. You can make a request without the app or an active sign-in. The [Privacy Policy](/privacy) describes what we delete and when.",
    ],
  },

  {
    group: BRAND,
    heading: "Dashboard, routing and accounts",
    paragraphs: [
      `For questions about the dashboard, lead routing or location accounts, email ${mailLink(site.contact.support)} or contact your LeadHanger representative.`,
    ],
  },

  {
    group: TEXTS,
    heading: "About a quote or appointment request",
    paragraphs: [
      "If you requested a quote or appointment from a brand and received a related text message, reply HELP for assistance or STOP to stop receiving messages. The [SMS Terms](/sms-terms) page sets out the full terms.",
    ],
  },
];

export default function Support() {
  return (
    <LegalPage
      eyebrow="Help"
      title="Support"
      email={site.contact.support}
      contents
      sections={sections}
      contactNote="When you contact support, please include your username, the app version shown in the Account tab, and a description of the issue. A screenshot helps us understand it."
    />
  );
}
