import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "SMS Terms",
  description: `Terms for text messages sent through ${site.name} about quote and appointment requests.`,
  alternates: { canonical: "/sms-terms" },
  robots: { index: true, follow: true },
};

/**
 * Published for the Twilio A2P 10DLC campaign. Carrier reviewers check this
 * page for program name, frequency, rates, STOP/HELP and the privacy link.
 * Keep the wording in step with the consent text on /sms-consent and with the
 * opt-in, opt-out and help messages registered in Twilio.
 */
const sections = [
  {
    heading: "Program",
    paragraphs: [
      `${site.name} is operated by ${site.company.legalName}. Brands use ${site.name} on their websites to handle quote and appointment requests. If you submit a request and agree to receive text messages, you will receive messages about that request from the brand and its authorized dealer: request confirmation, the name of the dealer assigned to you, appointment times, reminders and status updates.`,
    ],
  },
  {
    heading: "Consent",
    paragraphs: [
      'You agree by checking the consent box on the request form, or by tapping "Yes, call or text me" in the chat assistant. Consent is not a condition of purchase, and a request can be sent with email only.',
    ],
  },
  {
    heading: "Message frequency and cost",
    paragraphs: [
      "Message frequency varies by request, typically 1 to 5 messages per request. Message and data rates may apply.",
    ],
  },
  {
    heading: "Opting out",
    paragraphs: [
      "Reply STOP to any message to stop receiving messages. You will receive one final message confirming that you are unsubscribed. Reply START to subscribe again.",
    ],
  },
  {
    heading: "Help",
    paragraphs: [
      `Reply HELP to any message, or email ${site.contact.privacy}.`,
    ],
  },
  {
    heading: "Carriers",
    paragraphs: [
      "Carriers are not liable for delayed or undelivered messages.",
    ],
  },
  {
    heading: "Privacy",
    paragraphs: [
      "Mobile phone numbers and SMS consent are not shared with or sold to third parties or affiliates for their marketing or promotional purposes. How we handle personal information is described in our Privacy Notice at leadhanger.com/privacy.",
    ],
  },
];

export default function SmsTerms() {
  return (
    <LegalPage
      title="SMS Terms"
      effective={site.smsUpdatedLabel}
      sections={sections}
    />
  );
}
