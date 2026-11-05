import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.company.legalName} handles personal information collected through the ${site.name} website and mobile app.`,
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
 * Several claims here are only true because of how the site and the app are
 * built, and become false the moment someone changes that:
 *   1. The website sets no cookies and loads no analytics script. Adding Vercel
 *      Analytics, GA, a chat widget or a pixel makes "What the website does not
 *      do" wrong and, in several US states, makes a consent banner necessary.
 *      The one exception is the product video, and only after a visitor presses
 *      play (see components/Video.tsx); the notice says so.
 *   2. There is no form on the website. Contact happens by email. Adding a form
 *      means naming what it collects and where the submissions are stored.
 *   3. The app uses no location, contacts, photos, camera or microphone, and
 *      runs no analytics, crash-reporting or session-recording service. The app
 *      code (brisa-frontend/dealer-mobile) still carries the Microsoft Clarity
 *      SDK, switched off on iOS and Android since October 12, 2026; what happens
 *      to it is an open item in docs/leadhanger-us-brief.md. Switching it back
 *      on, or adding PostHog, makes "What the app does not do" wrong and
 *      changes the App Privacy answers in App Store Connect.
 *   4. There is no delete button in the app, on purpose (decided November 4,
 *      2026, following Yeni Müşterim): accounts are created centrally and
 *      deleted on request through /delete-account. Apple's guideline 5.1.1(v)
 *      asks for in-app deletion when an app supports account creation, and
 *      owners can create staff accounts in the app. If App Review reads that as
 *      account creation, the smallest fix is a link from the Account tab to
 *      /delete-account.
 *   5. The schedule under "How long we keep it" comes from `site.retention`:
 *      days from the request to removal from live systems, then days for
 *      backups to roll over. Both are an open item in
 *      docs/leadhanger-us-brief.md and are not confirmed. The backup figure
 *      follows the database's backup setting. The deletion figure is a manual
 *      procedure until the backend has a deletion job.
 *
 * The "Text messages (SMS)" section is required for the Twilio A2P 10DLC
 * campaign: Twilio requires a page titled "Privacy Policy" containing, verbatim,
 * "We do not sell or share your SMS opt-in data or personal information with
 * third parties for marketing purposes." Do not reword that sentence. Keep
 * it in step with /sms-terms and /sms-consent.
 */
const sections = [
  {
    heading: "Who this notice covers",
    paragraphs: [
      `${site.company.legalName} ("we") operates ${site.name}: this website at ${site.url.replace(/^https?:\/\//, "")}, and the ${site.name} mobile app that dealers, agents and their staff use to receive leads and record how they followed them up. This notice explains what personal information we handle through the website and the app, why, who else sees it, how long we keep it, and how to reach us about it.`,
      `Information about a brand's own customers is handled differently. When a brand runs ${site.name} on its website, that brand decides what is collected from its visitors and why. We process that information on the brand's instructions, as its service provider, and the brand's own privacy notice governs it. That includes the leads that reach dealers through the app. If you spoke to a chat assistant on some other company's site and want your information removed, contact that company. We will support them in handling your request.`,
    ],
  },
  {
    heading: "What we collect on the website",
    paragraphs: [
      "If you email us, we receive whatever you put in that message: your name, your email address, your company, and anything you choose to tell us about your business. We keep the correspondence so we can answer you and continue the conversation.",
      "Our hosting provider records standard technical information when a page is requested, including IP address, user agent and the URL requested. These logs exist to keep the site available and secure.",
    ],
  },
  {
    heading: "What the website does not do",
    paragraphs: [
      "This website sets no cookies, loads no analytics or advertising scripts, and runs no tracking pixels. There is nothing here that follows you to another site, and no profile is built from your visit.",
      "The one exception is the product video on the home page. Nothing is loaded from YouTube until you press play. When you do, the video player loads from YouTube's privacy-enhanced domain (youtube-nocookie.com), and YouTube's own privacy policy applies to what it collects from then on.",
    ],
  },
  {
    heading: "What the app collects",
    paragraphs: [
      "Your account. Accounts are set up by the brand or by the owner of your dealer business; there is no sign-up in the app. An account holds your name, your username and password, an email address if one was given for sending your sign-in details, your role (owner or staff), and the dealer locations you work for.",
      "Your work in the app. The follow-up you record on each lead, such as call outcomes, appointments and notes, is saved with the time and the account that recorded it. We also record each time a customer's full phone number is opened, with the dealer location and the time.",
      "Sign-in and device information. We record when your account signs in, from which platform (iOS, Android or web), and failed sign-in attempts, to protect the account and to help when you are locked out. The app creates a random identifier for its installation and reports it with the app version it runs, so we can see which version each account is on and fix problems. This identifier is not your device's advertising identifier, and deleting the app removes it.",
      "Notifications. If you allow notifications, your phone gives the app a push token, an address for delivering notifications to that phone. We store it with your account so we can tell you when a new lead arrives. Signing out withdraws it, and that phone stops receiving your notifications.",
    ],
  },
  {
    heading: "Leads in the app",
    paragraphs: [
      "The app shows the leads routed to your locations: the customer's name and contact details, what they asked about, and when they would like to be contacted. This information belongs to the brand. We process it as the brand's service provider, to deliver each lead to the right dealer and to record the follow-up.",
      "One-touch calling uses your phone's own dialer. The app does not record calls or read your call log.",
    ],
  },
  {
    heading: "What the app does not do",
    paragraphs: [
      "The app does not use your device's location, contacts, photos, camera or microphone. It shows no advertising and runs no analytics, crash-reporting or session-recording service. It does not track you across other companies' apps or websites.",
    ],
  },
  {
    heading: "Why we use it",
    paragraphs: [
      "On the website: to reply to you, to evaluate whether LeadHanger fits what you are trying to do, and to keep records of our business communications. We do not use messages sent to us for unrelated marketing.",
      "In the app: to sign you in and keep your account secure, to deliver each lead to the right dealer and tell you it has arrived, to show the brand and the owner of your dealer business how leads were followed up, and to keep the app working and up to date. That is the whole purpose.",
    ],
  },
  {
    heading: "Who else sees it",
    paragraphs: [
      "The brand whose leads you handle, and the owner of your dealer business, can see the follow-up you record and how quickly leads were answered.",
      `Service providers that run parts of ${site.name} for us: our cloud hosting provider, which stores the data; our email provider; Expo, which delivers app notifications and app updates; Apple and Google, whose notification services carry notifications to phones; and Twilio, which delivers text messages. They process information on our behalf under contract, may not use it for their own purposes, and must protect it at least as well as this notice describes.`,
      "We may also disclose information where the law requires it, or to protect our rights.",
      "We do not sell personal information, and we do not share it for cross-context behavioral advertising.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "Business correspondence is kept for as long as the relationship is active, and afterwards for as long as we may need it for legal, accounting or dispute-resolution reasons. You can ask us to delete your correspondence sooner.",
      `App account information is kept while the account is open. When you ask us to delete your account, we remove its information from our live systems within ${site.retention.deletionDays} days of the request. Our backups are kept for ${site.retention.backupDays} days, so copies in them are gone within ${site.retention.backupDays} days after that.`,
      "Leads, and the follow-up recorded on them, are the brand's records. We keep them for as long as the brand's contract with us requires, and delete them on the same schedule when the brand asks or the contract ends.",
      "Server logs are kept for a short operational period and then discarded.",
    ],
  },
  {
    heading: "Deleting your app account",
    paragraphs: [
      `The app has no sign-up, so it has no delete button either. Accounts are set up by the brand or by the owner of a dealer business, and deleted on request. To ask for yours to be deleted, follow the steps at leadhanger.com/delete-account, or email ${site.contact.privacy}. You do not need the app, or a working sign-in, to do this.`,
      "We confirm the request comes from you, delete your account information on the schedule above, and tell you when it is done. Deletion is permanent. Leads you followed up stay with the brand, because they are the brand's records, and the fields in them that identify you are anonymized.",
    ],
  },
  {
    heading: "Turning off notifications",
    paragraphs: [
      "You can turn app notifications off at any time in your phone's settings. Signing out of the app also stops notifications to that phone. New leads still appear in the app when you open it.",
    ],
  },
  {
    heading: "Text messages (SMS)",
    paragraphs: [
      "When a consumer asks for a quote or appointment through a LeadHanger form or chat assistant on a brand's website and agrees to receive text messages, we send messages about that request on the brand's behalf: confirmation, the assigned dealer's name, appointment time and reminders.",
      "We do not sell or share your SMS opt-in data or personal information with third parties for marketing purposes. Mobile phone numbers and SMS consent are not shared with or sold to third parties or affiliates for their marketing or promotional purposes. Information is shared only with the brand and the authorized dealer assigned to the request, and with service providers that deliver the messages, solely to provide the service.",
      "You can opt out at any time by replying STOP, and get help by replying HELP. The full terms are on the SMS Terms page at leadhanger.com/sms-terms.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "Depending on where you live, you may have the right to know what personal information we hold about you, to get a copy of it, to have it corrected, and to have it deleted. You also have the right not to be treated differently for exercising any of these rights.",
      "California residents have these rights under the California Consumer Privacy Act as amended, including the right to opt out of the sale or sharing of personal information. As stated above, we do not sell or share personal information, so there is nothing to opt out of. Residents of other states with comparable laws have comparable rights.",
      `To exercise any of them, including deleting your app account, email ${site.contact.privacy}. Before acting on a request we will verify who you are, which normally means replying from the address we already hold for you, and we will respond within the period the applicable law allows.`,
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "Traffic to the website, and between the app and our servers, is encrypted in transit. Passwords are stored as one-way hashes, so nobody, including us, can read them. In the app, a customer's phone number stays partly hidden until a dealer opens it, and each opening is recorded. Access to our systems, and to the mailbox that receives inquiries, is limited to the people who need it. No system is perfect, and we do not claim otherwise.",
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "The website and the app are for businesses. Neither is directed to children, and we do not knowingly collect personal information from anyone under 16.",
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
    <LegalPage
      title="Privacy Policy"
      effective={site.privacyUpdatedLabel}
      sections={sections}
    />
  );
}
