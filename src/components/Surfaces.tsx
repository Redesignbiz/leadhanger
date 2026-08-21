import { Section, SectionHeading } from "./Section";

/**
 * LeadHanger is not one screen. It is three surfaces, and each one belongs to a
 * different group of people: your visitors, your network, your team. Buyers ask
 * "what would my dealers actually have to use", so the middle column matters
 * more than its size on the page suggests.
 */
const surfaces = [
  {
    audience: "Your visitors",
    title: "Conversation on your site",
    points: [
      "Added with one line of script",
      "Structured dialogue instead of a static form",
      "Consent captured in the flow",
      "Your branding on Pro and Custom",
    ],
    icon: (
      <>
        <path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.5-5A8 8 0 0 1 13 4a8 8 0 0 1 8 8Z" />
      </>
    ),
  },
  {
    audience: "Your network",
    title: "App for dealers and agents",
    points: [
      "Today's leads in one list, with the call time on each",
      "Push reminder when a lead is due",
      "One-touch call or message from inside the app",
      "Outcome recorded in a single tap",
    ],
    icon: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <path d="M11 18.5h2" />
      </>
    ),
  },
  {
    audience: "Your team",
    title: "Dashboard for the brand",
    points: [
      "Lead volume and funnel by period",
      "Response time and conversion per dealer",
      "Regional breakdown, strongest to weakest",
      "Reporting you can take into a channel review",
    ],
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 15v-4M12 15V7M17 15v-6" />
      </>
    ),
  },
];

export function Surfaces() {
  return (
    <Section id="platform" className="border-t border-outline-variant">
      <SectionHeading
        eyebrow="The platform"
        title="Three surfaces, one handoff"
        lead="The brand side and the dealer side are the same system, which is the only way response time becomes a number anyone can act on."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-outline-variant bg-outline-variant lg:grid-cols-3">
        {surfaces.map((surface) => (
          <div key={surface.title} className="bg-surface-lowest p-6 sm:p-7">
            <span className="flex size-10 items-center justify-center rounded-DEFAULT bg-primary-fixed">
              <svg
                viewBox="0 0 24 24"
                className="size-5 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {surface.icon}
              </svg>
            </span>

            <p className="eyebrow mt-5 text-outline">{surface.audience}</p>
            <h3 className="mt-1.5 text-[18px] font-semibold tracking-[-0.015em] text-ink">
              {surface.title}
            </h3>

            <ul className="mt-4 space-y-2 border-t border-outline-variant pt-4">
              {surface.points.map((point) => (
                <li
                  key={point}
                  className="text-[14px] leading-6 text-ink-muted"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
