import { Section, SectionHeading } from "./Section";

/**
 * The qualifying question is not the vertical, it is the shape of the purchase:
 * bought rarely, fitted or installed by someone, and researched by a buyer who
 * is not an expert. That framing comes straight from the sales material and is
 * the sharpest thing in it, so it leads the section and the verticals follow.
 */
const industries = [
  { name: "Tires and auto service", detail: "Fitment, stock and appointment" },
  { name: "HVAC and climate", detail: "Site survey and installation" },
  { name: "Kitchen and bath", detail: "Specification and fitting" },
  { name: "Insurance and agency networks", detail: "Quote and local agent" },
  { name: "Batteries and energy", detail: "Compatibility and urgent service" },
  { name: "Appliances and home improvement", detail: "Delivery and install" },
];

export function Industries() {
  return (
    <Section id="industries" className="border-t border-outline-variant">
      <SectionHeading
        eyebrow="Where it fits"
        title="Built for the purchase that cannot happen in a checkout"
        lead="Something bought once every five or ten years, fitted or installed by a professional, by a buyer who does not know the category well. Those visitors do not fill in forms, they leave. The conversation is what keeps them, and the dealer is what closes them."
      />

      <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-outline-variant bg-outline-variant sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <li key={industry.name} className="bg-surface-lowest p-6">
            <p className="text-[16px] font-semibold tracking-[-0.01em] text-ink">
              {industry.name}
            </p>
            <p className="mt-1.5 text-[14px] text-ink-muted">
              {industry.detail}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-[15px] leading-6 text-ink-muted">
        If your customers buy from you through someone else, the handoff is the
        part worth fixing. The vertical matters less than the network.
      </p>
    </Section>
  );
}
