import Image from "next/image";
import { Section, SectionHeading } from "./Section";

/**
 * The qualifying question is not the vertical, it is the shape of the purchase:
 * bought rarely, fitted or installed by someone, and researched by a buyer who
 * is not an expert. That framing comes straight from the sales material and is
 * the sharpest thing in it, so it leads the section and the verticals follow.
 *
 * Each cell opens on a landscape photo of the category, full width, so the six
 * read as six kinds of purchase at a glance (sources in docs/images.md). They are drawn on one 24px grid at one stroke weight, so
 * the grid reads as a set rather than as six borrowed marks.
 */
const industries = [
  {
    name: "Tires and auto service",
    photo: "/images/industries/tires.webp",
    detail: "Fitment, stock and appointment",
  },
  {
    name: "HVAC and climate",
    photo: "/images/industries/hvac.webp",
    detail: "Site survey and installation",
  },
  {
    name: "Kitchen and bath",
    photo: "/images/industries/kitchen-bath.webp",
    detail: "Specification and fitting",
  },
  {
    name: "Insurance and agency networks",
    photo: "/images/industries/insurance.webp",
    detail: "Quote and local agent",
  },
  {
    name: "Batteries and energy",
    photo: "/images/industries/batteries.webp",
    detail: "Compatibility and urgent service",
  },
  {
    name: "Appliances and home improvement",
    photo: "/images/industries/appliances.webp",
    detail: "Delivery and install",
  },
];

export function Industries() {
  return (
    <Section id="industries" pad="tight">
      <SectionHeading
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
            className="group bg-ground hover:bg-panel transition-colors"
          >
            <div className="relative aspect-[2/1] overflow-hidden">
              <Image
                src={industry.photo}
                alt=""
                fill
                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
                className="object-cover opacity-85 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
              />
            </div>
            <div className="px-6 py-6">
              <p className="text-ink text-[15.5px] font-semibold tracking-[-0.01em]">
                {industry.name}
              </p>
              <p className="text-ink-dim mt-1.5 text-[13.5px]">
                {industry.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
