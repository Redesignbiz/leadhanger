import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "SMS Consent",
  description: `How consumers opt in to text messages on ${site.name} request forms and chat assistants.`,
  alternates: { canonical: "/sms-consent" },
  robots: { index: true, follow: true },
};

/**
 * A static picture of the consent step, published so Twilio and carrier
 * reviewers can see the opt-in that happens on brand websites. Nothing here is
 * an input: the privacy notice says this site has no form, and that stays true.
 * Keep the text identical to the consent text in the product.
 */
const formConsent =
  "By checking this box, I agree that [Brand] and the authorized [Brand] dealer assigned to my request may contact me about this request at the phone number I provided, by call or text message, including calls and texts made with automated technology. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out and HELP for help. My information will not be sold or shared with other companies. See the Privacy Policy and SMS Terms.";

const chatConsent =
  "To set up your appointment, the authorized [Brand] dealer assigned to your request will contact you. May [Brand] and that dealer call or text you about this request at the number you share? Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out.";

const sections = [
  {
    heading: "What is recorded",
    paragraphs: [
      "For every request the platform records the version of the consent text shown, the date and time, the page and channel (form or chat assistant), the IP address and browser, the checkbox or button state, and the dealer the request was assigned to. Opt-outs are recorded with their time and applied across all messages for that brand.",
    ],
  },
  {
    heading: "Related pages",
    paragraphs: [
      "SMS Terms: leadhanger.com/sms-terms. Privacy Policy: leadhanger.com/privacy.",
    ],
  },
];

function Field({ label }: { label: string }) {
  return (
    <div>
      <p className="text-ink-dim text-[12.5px] font-semibold">{label}</p>
      <div className="border-line bg-ground mt-1.5 h-10 rounded-md border" />
    </div>
  );
}

export default function SmsConsent() {
  return (
    <LegalPage
      title="How consumers opt in to text messages"
      effective={site.smsUpdatedLabel}
      intro={`${site.name} runs on brand websites. Consumers opt in on the brand's request form or in the chat assistant, before a phone number is collected. Below is the consent step as the consumer sees it; [Brand] is replaced with the brand's name.`}
      sections={sections}
    >
      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-ink text-[19px] leading-snug font-bold tracking-[-0.015em]">
            On the request form
          </h2>
          <div
            className="border-line bg-panel mt-5 space-y-4 rounded-lg border p-6"
            aria-label="Sample request form"
          >
            <Field label="Name" />
            <Field label="ZIP code" />
            <Field label="Mobile phone" />
            <div className="flex gap-3">
              <span
                className="border-line-strong mt-1 h-4 w-4 shrink-0 rounded-sm border"
                aria-label="Unchecked checkbox"
              />
              <p className="text-ink-muted text-[13.5px] leading-[1.6]">
                {formConsent}
              </p>
            </div>
            <Field label="Email" />
          </div>
          <p className="text-ink-muted mt-4 text-[15.5px] leading-[1.75]">
            The checkbox is not pre-checked. The request can be submitted with
            email only.
          </p>
        </section>

        <section>
          <h2 className="text-ink text-[19px] leading-snug font-bold tracking-[-0.015em]">
            In the chat assistant
          </h2>
          <div className="border-line bg-panel mt-5 rounded-lg border p-6">
            <p className="text-ink-muted text-[13.5px] leading-[1.6]">
              {chatConsent}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="bg-blue text-on-blue rounded-md px-4 py-2 text-[13px] font-semibold">
                Yes, call or text me
              </span>
              <span className="border-line text-ink-muted rounded-md border px-4 py-2 text-[13px] font-semibold">
                Email me instead
              </span>
            </div>
          </div>
          <p className="text-ink-muted mt-4 text-[15.5px] leading-[1.75]">
            The phone number is asked for only after the consumer taps
            &ldquo;Yes, call or text me&rdquo;.
          </p>
        </section>
      </div>
    </LegalPage>
  );
}
