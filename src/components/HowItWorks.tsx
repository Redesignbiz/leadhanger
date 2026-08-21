import { Section, SectionHeading } from "./Section";

/**
 * Four steps, in the order the lead actually moves. Every bullet describes
 * behaviour the platform has today; nothing here is a roadmap item.
 */
const steps = [
  {
    title: "Engage the visitor in a conversation",
    points: [
      "One line of script puts the chat interface on your existing site. No replatforming, no new page.",
      "The conversation opens in context, so a visitor comparing prices is not handed a generic contact form.",
      "White-labeled to your brand on Pro and Custom, so it reads as part of your site rather than a bolted-on widget.",
    ],
  },
  {
    title: "Qualify the need and capture consent",
    points: [
      "The conversation establishes what the customer needs, what fits their vehicle or property, and how close they are to buying.",
      "Marketing consent is captured in the flow, for your brand and for the dealer who will make the call.",
      "Contact details reach your CRM as a structured record, not a free-text message someone has to interpret.",
    ],
  },
  {
    title: "Route it to the right dealer, immediately",
    points: [
      "Matched on location, specialization and availability, not round-robin.",
      "Delivered to the dealer with a call time attached, so the follow-up lands when the customer expects it.",
      "If the window is missed, the lead moves on to the next dealer instead of going quiet.",
    ],
  },
  {
    title: "Follow through, and record what happened",
    points: [
      "The dealer marks the outcome: quoted, appointment booked, no answer, wrong number, out of stock.",
      "No answer does not close the task. It reschedules, and the second attempt is tracked too.",
      "Your team sees response times and conversion by dealer and by region, from the first lead routed.",
    ],
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="border-t border-outline-variant">
      <SectionHeading
        eyebrow="How it works"
        title="From a visitor on your site to a call from your dealer"
        lead="Four steps, each of them measured. The point is not that a lead gets sent somewhere. It is that the lead arrives qualified, with consent, at a dealer who is expected to call and is measured on whether they did."
      />

      <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-outline-variant bg-outline-variant sm:grid-cols-2">
        {steps.map((step, index) => (
          <li key={step.title} className="bg-surface-lowest p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-[12px] font-bold text-white tabular-nums">
                {index + 1}
              </span>
              <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">
                {step.title}
              </h3>
            </div>

            <ul className="mt-4 space-y-2.5">
              {step.points.map((point) => (
                <li key={point} className="flex gap-2.5">
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-[5px] size-3.5 shrink-0 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                  <span className="text-[15px] leading-6 text-ink-muted">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
