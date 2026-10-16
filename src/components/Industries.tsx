import { Section, SectionHeading } from "./Section";

/**
 * The qualifying question is not the vertical, it is the shape of the purchase:
 * bought rarely, fitted or installed by someone, and researched by a buyer who
 * is not an expert. That framing comes straight from the sales material and is
 * the sharpest thing in it, so it leads the section and the verticals follow.
 *
 * The icons are here to make six near-identical text cells scannable, not to
 * illustrate anything. They are drawn on one 24px grid at one stroke weight, so
 * the grid reads as a set rather than as six borrowed marks.
 */
const industries = [
  {
    name: "Tires and auto service",
    detail: "Fitment, stock and appointment",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3.5" />
      </>
    ),
  },
  {
    name: "HVAC and climate",
    detail: "Site survey and installation",
    icon: (
      <>
        <path d="M3 8h11a3 3 0 1 0-3-3" />
        <path d="M3 13h15a3 3 0 1 1-3 3" />
        <path d="M3 18h7" />
      </>
    ),
  },
  {
    name: "Kitchen and bath",
    detail: "Specification and fitting",
    icon: (
      <>
        <path d="M12 3.5s5.5 6 5.5 9.5a5.5 5.5 0 0 1-11 0C6.5 9.5 12 3.5 12 3.5Z" />
      </>
    ),
  },
  {
    name: "Insurance and agency networks",
    detail: "Quote and local agent",
    icon: (
      <>
        <path d="M12 3l8 3v5.5c0 4.8-3.4 8.2-8 9.5-4.6-1.3-8-4.7-8-9.5V6l8-3Z" />
      </>
    ),
  },
  {
    name: "Batteries and energy",
    detail: "Compatibility and urgent service",
    icon: (
      <>
        <rect x="2.5" y="7" width="16" height="10" rx="2.5" />
        <path d="M21.5 10.5v3" />
        <path d="M11 9.5 8.5 13H12l-2 3.5" />
      </>
    ),
  },
  {
    name: "Appliances and home improvement",
    detail: "Delivery and install",
    icon: (
      <>
        <path d="M3.5 10.5 12 4l8.5 6.5V20a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-9.5Z" />
        <path d="M9.5 21v-6h5v6" />
      </>
    ),
  },
];

export function Industries() {
  return (
    <Section id="industries" pad="tight">
      <SectionHeading
        eyebrow="Where it fits"
        index="05"
        title="Built for the purchase that cannot happen in a checkout"
        lead="Something bought once every five or ten years, fitted or installed by a professional, by a buyer who does not know the category well. Those visitors do not fill in forms, they leave. The conversation is what keeps them, and the dealer is what closes them."
      />

      {/*
        `gap-px` over a ruled background draws every internal rule in one go,
        which is what keeps a six-cell responsive grid from needing per-index
        border classes. The frame is closed rather than flush here: every cell
        is padded, so an open left edge would leave the first column indented
        away from the heading above it while the rules stayed put.

        The cells carry the page ground, not `panel`, or the block reads as one
        raised card rather than as a grid of six.
      */}
      <ul className="reveal-stack bg-line border-line mt-12 grid gap-px overflow-hidden rounded-lg border sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <li
            key={industry.name}
            className="group bg-ground hover:bg-panel px-6 py-6 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="text-ink-dim group-hover:text-blue-pale size-5 transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {industry.icon}
            </svg>
            <p className="text-ink mt-4 text-[15.5px] font-semibold tracking-[-0.01em]">
              {industry.name}
            </p>
            <p className="text-ink-dim mt-1.5 text-[13.5px]">
              {industry.detail}
            </p>
          </li>
        ))}
      </ul>

      <p className="text-ink-muted mt-8 max-w-2xl text-[15px] leading-[1.6]">
        If your customers buy from you through someone else, the handoff is the
        part worth fixing. The vertical matters less than the network.
      </p>
    </Section>
  );
}
