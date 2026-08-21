import { Section, SectionHeading } from "./Section";
import { site } from "@/lib/site";

/**
 * Answers stay inside what the service-level sheet actually commits to. Where a
 * question has a legal edge (consent for outbound calling), the answer says what
 * the platform does and stops there, rather than implying the platform makes the
 * client compliant. See docs/leadhanger-us-brief.md.
 */
const faqs = [
  {
    q: "How long does it take to go live?",
    a: "Lite is a standard setup and is ready to use. Pro takes about three weeks, which covers the industry-specific conversation flow and your API integration. Custom runs to about ten weeks, because the flow, the routing logic and the reporting are built around your catalogue and your systems.",
  },
  {
    q: "Do we have to change our CRM?",
    a: "No. On Lite, leads download from the dashboard. Pro connects through self-service APIs, so your team integrates on your own schedule. Custom is integrated with your CRM as part of the build. In every case LeadHanger sits in front of the CRM, it does not replace it.",
  },
  {
    q: "What do our dealers have to install?",
    a: "On Pro and Custom, the dealer app, which is where the lead list, the call reminder and the outcome capture live. On Lite there is nothing to install, because leads arrive by email, though that also means dealer follow-up is not tracked.",
  },
  {
    q: "Can it run under our own brand?",
    a: "Yes, on Pro and Custom. The chat interface carries your name and logo, and on Custom the dealer app is white-labeled too, so your network sees your brand rather than ours.",
  },
  {
    q: "How is customer consent handled?",
    a: "Consent is captured inside the conversation, before contact details are passed on, and it covers both your brand and the dealer who will make the call. The record travels with the lead. The wording itself is yours to approve with your own counsel, since what a US outbound call requires depends on how you contact people and in which states.",
  },
  {
    q: "Is this only for automotive?",
    a: "No. It was first built for a tire manufacturer's dealer network, which is why the automotive examples are the most detailed, but the pattern fits any product a customer researches online and buys through a dealer, agent or installer.",
  },
  {
    q: "Who owns the data?",
    a: "You do. LeadHanger processes leads on your behalf: your visitors, your consent record, your dealer network, your reporting. Your team can export it at any time.",
  },
];

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <Section id="faq" className="border-t border-outline-variant">
      {/*
        `<` is escaped to its unicode form: JSON.stringify does not sanitize,
        and this payload goes into the document as raw HTML.
        Source: node_modules/next/dist/docs/01-app/02-guides/json-ld.md
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <SectionHeading
        eyebrow="Questions"
        title="What buyers ask first"
        lead={`If the answer you need is not here, ${site.contact.sales} reaches a person who knows the platform.`}
      />

      <div className="mt-10 divide-y divide-outline-variant overflow-hidden rounded-lg border border-outline-variant bg-surface-lowest">
        {faqs.map((faq) => (
          <details key={faq.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-[16px] font-semibold text-ink transition-colors hover:bg-surface-low">
              {faq.q}
              <svg
                viewBox="0 0 24 24"
                className="size-4 shrink-0 text-outline transition-transform group-open:rotate-45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </summary>
            <p className="px-5 pb-5 text-[15px] leading-7 text-ink-muted">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
