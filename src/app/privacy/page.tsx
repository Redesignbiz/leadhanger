import type { Metadata } from "next";
import { LegalPage, mailLink, type LegalSection } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.company.legalName} handles personal information collected through the ${site.name} website and the ${site.name} app.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/**
 * IMPORTANT, and repeated in docs/leadhanger-us-brief.md: this is a drafted
 * notice, written to match what the site and the app actually do. It has not
 * been reviewed by counsel, and it must be before launch.
 *
 * This page is also the Privacy Policy URL for the LeadHanger app in App Store
 * Connect. App Review reads it against guideline 5.1.1(i): what the app
 * collects, how it is used, who it is shared with, how long it is kept, and how
 * a user revokes consent or deletes their account.
 *
 * It speaks to three readers: someone who emailed us or requested an audit on
 * the website, someone
 * who uses the LeadHanger app at a location, and a brand's customer who gets
 * text messages. Their parts are grouped and listed at the top, so nobody
 * reads the others' to find their own. A buyer's legal reviewer reads it too,
 * which is why the roles (business or service provider) are named outright.
 *
 * Register: professional and plain, in the active voice ("we retain", not "is
 * retained"). Headings are the names US privacy notices use ("Information we
 * collect", "Data retention"); sentences avoid conversational turns ("so we
 * can", "there is nothing here that"). The one passive passage left is the
 * Twilio paragraph under "Use of opt-in data", kept as registered.
 *
 * Several claims here are only true because of how the site and the app are
 * built, and become false the moment someone changes that:
 *   1. The website sets no cookies and loads no analytics script. Adding Vercel
 *      Analytics, GA, a chat widget or a pixel makes "This website › Cookies
 *      and tracking" wrong and, in several US states, makes a consent banner
 *      necessary. The one exception is the product video, and only after a
 *      visitor presses play (see components/Video.tsx); the notice says so.
 *   2. The website has one form, the free audit request on /audit
 *      (components/AuditForm.tsx). It collects exactly the fields listed under
 *      "This website › Information we collect", and no phone number. Adding a
 *      field, or another form, means listing it there. Where requests go is
 *      an open item: app/api/audit forwards them to AUDIT_FORWARD_URL, and
 *      the service behind that address must be added to "Disclosure of
 *      information" before it receives anything.
 *   3. The app uses no location, contacts, photos, camera or microphone, and
 *      runs no analytics, crash-reporting or session-recording service. The app
 *      code (brisa-frontend/dealer-mobile) still carries the Microsoft Clarity
 *      SDK, switched off on iOS and Android since October 12, 2026; what happens
 *      to it is an open item in docs/leadhanger-us-brief.md. Switching it back
 *      on, or adding PostHog, makes "The LeadHanger app › Device permissions
 *      and tracking" wrong and changes the App Privacy answers in App Store
 *      Connect.
 *   4. There is no delete button in the app, on purpose (decided November 4,
 *      2026, following Yeni Müşterim): accounts are created centrally and
 *      deleted on request through /delete-account. Apple's guideline 5.1.1(v)
 *      asks for in-app deletion when an app supports account creation, and
 *      owners can create staff accounts in the app. If App Review reads that as
 *      account creation, the smallest fix is a link from the Account tab to
 *      /delete-account.
 *   5. The schedule under "Data retention" comes from `site.retention`: days
 *      from the request to removal from live systems, then days for backups to
 *      roll over. Both are an open item in docs/leadhanger-us-brief.md and are
 *      not confirmed. The backup figure follows the database's backup setting.
 *      The deletion figure is a manual procedure until the backend has a
 *      deletion job.
 *
 * The "Text messages" part is required for the Twilio A2P 10DLC campaign:
 * Twilio requires a page titled "Privacy Policy" containing, verbatim, "We do
 * not sell or share your SMS opt-in data or personal information with third
 * parties for marketing purposes." Do not reword that sentence. Keep it in
 * step with /sms-terms and /sms-consent.
 */
const ABOUT = "About this notice";
const WEBSITE = "This website";
const APP = "The LeadHanger app";
const TEXTS = "Text messages";
const SHARED = "Your information";
const RIGHTS = "Your rights";

const sections: LegalSection[] = [
  {
    group: ABOUT,
    heading: "Scope",
    paragraphs: [
      `${site.company.legalName} ("we") operates ${site.name}, including this website at ${site.url.replace(/^https?:\/\//, "")} and the ${site.name} app, which dealers, stores and franchisees use to receive leads and record their follow-up. This notice describes the personal information we handle through the website and the app, how we use and disclose it, how long we retain it, and how to contact us about it.`,
    ],
  },
  {
    group: ABOUT,
    heading: "Terms used in this notice",
    paragraphs: [
      `In this notice, "brand" refers to the company that runs ${site.name}, such as a manufacturer, a franchise system or a retail chain. "Location" refers to any place that receives the brand's leads, such as a dealer, a store or a franchisee.`,
    ],
  },
  {
    group: ABOUT,
    heading: "Our role",
    paragraphs: [
      "For information we collect through this website and the LeadHanger app, we are the business that decides how to use it. We handle information about the brand's own customers differently. The brand decides what to collect from its website visitors and for what purpose. We process that information on the brand's instructions as its service provider, and the brand's privacy notice governs it. This includes the leads that reach locations through the app.",
    ],
  },
  {
    group: ABOUT,
    heading: "Chat assistants on other websites",
    paragraphs: [
      "To have information removed that you provided through a chat assistant on another company's website, contact that company directly. We will assist them with your request.",
    ],
  },

  {
    group: ABOUT,
    heading: "Changes to this notice",
    paragraphs: [
      "When we change this notice, we update the effective date at the top of this page and describe any material change on this page.",
    ],
  },

  {
    group: WEBSITE,
    heading: "Information we collect",
    paragraphs: [
      "If you email us, we receive the information you include in your message, such as your name, email address, company and details about your business. We retain this correspondence to respond to you and to continue the conversation.",
      "If you request a free Lead Response Audit through the form on this website, we collect your role, your industry, the number of dealer locations, the website you want us to audit and your work email address. We use this information to run the audit and to contact you about your request, and we retain it as business correspondence.",
      "Our hosting provider records standard technical information when someone requests a page, including IP address, user agent and the URL requested. It uses these logs to keep the site available and secure.",
    ],
  },
  {
    group: WEBSITE,
    heading: "Cookies and tracking",
    paragraphs: [
      "This website sets no cookies, loads no analytics or advertising scripts, and runs no tracking pixels. It does not track visitors across other sites or build profiles from their visits.",
      "The only exception is the product video on the home page. The page loads nothing from YouTube until you press play. The player then loads from YouTube's privacy-enhanced domain (youtube-nocookie.com), and YouTube's privacy policy governs the information it collects from that point.",
    ],
  },

  {
    group: APP,
    heading: "Information we collect",
    paragraphs: [
      {
        lead: "Account information.",
        text: "The brand or the owner of your location creates your account. The app does not offer self sign-up. Each account contains your name, username and password, an email address if the account creator added one for sending sign-in details, your role (owner or staff), and the locations you work for.",
      },
      {
        lead: "Activity in the app.",
        text: "We save the follow-up you record on each lead, such as call outcomes, appointments and notes, with the time and the account that recorded it. Each time someone opens a customer's full phone number, we record the location and the time.",
      },
      {
        lead: "Sign-in and device information.",
        text: "We record when your account signs in, the platform used (iOS, Android or web), and failed sign-in attempts, to protect the account and to support account recovery. The app generates a random installation identifier and reports it with the app version in use, to identify the version each account runs and to resolve issues. This identifier is not your device's advertising identifier, and deleting the app removes it.",
      },
      {
        lead: "Notifications.",
        text: "If you allow notifications, your device provides a push token that identifies where to deliver notifications. We store it with your account to notify you of new leads. Signing out revokes the token, and the device stops receiving your notifications.",
      },
    ],
  },
  {
    group: APP,
    heading: "Lead information",
    paragraphs: [
      "The app displays the leads routed to your locations, including the customer's name and contact details, the request, and the preferred contact time. This information belongs to the brand. We process it as the brand's service provider to deliver each lead to the right location and to record the follow-up.",
      "One-touch calling uses your device's native dialer. The app does not record calls or access your call log.",
    ],
  },
  {
    group: APP,
    heading: "Device permissions and tracking",
    paragraphs: [
      "The app does not access your device's location, contacts, photos, camera or microphone. It displays no advertising and uses no analytics, crash-reporting or session-recording service. It does not track you across other companies' apps or websites.",
    ],
  },
  {
    group: APP,
    heading: "Account deletion",
    paragraphs: [
      `Because the brand or the owner of a location creates each account, the app does not include a delete function, and we delete accounts on request. To request deletion, follow the steps on the [Delete Your Account](/delete-account) page, or email ${mailLink(site.contact.privacy)}. You can make a request without the app or an active sign-in.`,
      "We verify that the request comes from the account holder, delete the account information on the schedule described under “Data retention”, and confirm by email when the deletion is complete. Deletion is permanent. Leads you followed up remain with the brand as part of its records, and we anonymize the fields that identify you.",
    ],
  },
  {
    group: APP,
    heading: "Notification settings",
    paragraphs: [
      "You can turn off app notifications at any time in your device settings. Signing out also stops notifications to that device. New leads remain visible in the app.",
    ],
  },

  {
    group: TEXTS,
    heading: "Messages we send",
    paragraphs: [
      "If you request a quote or appointment through a LeadHanger form or chat assistant on a brand's website and agree to receive text messages, we send you messages about that request on the brand's behalf. These include a confirmation, the name of the assigned dealer, the appointment time and reminders. The [SMS Consent](/sms-consent) page shows the wording you agree to.",
    ],
  },
  {
    group: TEXTS,
    heading: "Use of opt-in data",
    paragraphs: [
      "We do not sell or share your SMS opt-in data or personal information with third parties for marketing purposes. Mobile phone numbers and SMS consent are not shared with or sold to third parties or affiliates for their marketing or promotional purposes. Information is shared only with the brand and the authorized dealer assigned to the request, and with service providers that deliver the messages, solely to provide the service.",
    ],
  },
  {
    group: TEXTS,
    heading: "Opting out",
    paragraphs: [
      "You can opt out at any time by replying STOP, and request help by replying HELP. The [SMS Terms](/sms-terms) page sets out the full terms.",
    ],
  },

  {
    group: SHARED,
    heading: "How we use information",
    paragraphs: [
      "On the website, we use information to respond to you, to run an audit you request, to assess whether LeadHanger meets your needs, and to keep records of our business communications. We do not use messages or audit requests sent to us for unrelated marketing.",
      "In the app, we use information to sign you in and secure your account, to deliver each lead to the right location and notify you of its arrival, to show the brand and the owner of your location the follow-up on each lead, and to keep the app working and up to date. We do not use it for anything else.",
    ],
  },
  {
    group: SHARED,
    heading: "Disclosure of information",
    paragraphs: [
      "The brand whose leads you handle, and the owner of your location, can see the follow-up you record and the response time for each lead.",
      `Service providers operate parts of ${site.name} on our behalf. They process information under contract, may not use it for their own purposes, and must protect it to at least the standard this notice describes. They are:`,
      {
        items: [
          "our cloud hosting provider, which stores the data",
          "our email provider",
          "Expo, which delivers app notifications and app updates",
          "Apple and Google, whose notification services carry notifications to devices",
          "Twilio, which delivers text messages",
        ],
      },
      "We may also disclose information where the law requires it or to protect our rights.",
      "We do not sell personal information, and we do not share it for cross-context behavioral advertising.",
    ],
  },
  {
    group: SHARED,
    heading: "Data retention",
    paragraphs: [
      "We retain business correspondence while the relationship is active, and afterwards for as long as we need it for legal, accounting or dispute-resolution purposes. You can ask us to delete your correspondence sooner.",
      `We retain app account information while the account is open. When you request deletion of your account, we remove its information from our live systems within ${site.retention.deletionDays} days of the request. We keep backups for ${site.retention.backupDays} days, and we delete the copies in them within ${site.retention.backupDays} days after removal from live systems.`,
      "Leads and the follow-up recorded on them are the brand's records. We retain them for the term of the brand's contract and delete them on the same schedule when the brand requests it or the contract ends.",
      "We keep server logs for a short operational period and then delete them.",
    ],
  },
  {
    group: SHARED,
    heading: "Security",
    paragraphs: [
      "We encrypt all traffic to the website and between the app and our servers. We hash passwords to ensure that nobody, including us, can read them back. In the app, a customer's phone number remains partially hidden until someone at the location opens it, and we record each opening. We limit access to our systems, and to the mailbox that receives inquiries, to the people who need it. No way of storing or sending data is completely secure. The [Security & Compliance](/trust) page describes how the platform protects data in more detail.",
    ],
  },
  {
    group: SHARED,
    heading: "Children's privacy",
    paragraphs: [
      "The website and the app serve businesses. Neither targets children, and we do not knowingly collect personal information from anyone under 16.",
    ],
  },

  {
    group: RIGHTS,
    heading: "Access, correction and deletion",
    paragraphs: [
      "Depending on where you live, you may have the right to know what personal information we hold about you, to obtain a copy, and to ask us to correct or delete it. We will not treat you differently for exercising any of these rights.",
    ],
  },
  {
    group: RIGHTS,
    heading: "California and other states",
    paragraphs: [
      "California residents have these rights under the California Consumer Privacy Act, as amended, including the right to opt out of the sale or sharing of personal information. Because we do not sell or share personal information, you do not need to opt out. Residents of other states with comparable laws have comparable rights.",
    ],
  },
  {
    group: RIGHTS,
    heading: "Making a request",
    paragraphs: [
      `To exercise any of these rights, including deletion of your app account, email ${mailLink(site.contact.privacy)}. Before acting on a request, we verify your identity, typically by confirming the request from the email address we have on file, and we respond within the period that applicable law requires.`,
    ],
  },
];

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      effective={site.privacyUpdatedLabel}
      contents
      sections={sections}
    />
  );
}
