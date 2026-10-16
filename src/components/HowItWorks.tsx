import { RouteLine, type RouteStep } from "./RouteLine";
import { Highlight, Section, SectionHeading } from "./Section";

/**
 * Four steps, in the order the lead actually moves. Steps 2 to 4 are the three
 * "fixes" from the corporate site, with spelling and punctuation corrected; step
 * 1 is the arrival that the other three act on.
 */
const steps: RouteStep[] = [
  {
    title: "Visitor arrives at your brand's website",
    points: [
      "One line of script puts the chat interface on your existing site. No replatforming, no new page.",
    ],
  },
  {
    title: "Engage, qualify & get consent",
    points: [
      "Engage with website visitors through pre-designed, dynamic conversation paths before assigning them to a dealer.",
      "Obtain GDPR/KVKK-compliant consent before sharing data.",
    ],
  },
  {
    title: "Smart matching & handoff",
    points: [
      "Match leads to the right dealer based on location, expertise and availability.",
      "Instant transfer to dealers, ensuring fast response times and higher conversions.",
    ],
  },
  {
    title: "Track, optimize & engage",
    points: [
      "Know where each lead goes and how it performs.",
      "Ensure no high-intent lead is lost in the process. With LeadHanger, website visitors don't just browse. They become real sales opportunities.",
    ],
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <SectionHeading
        eyebrow="How it works"
        index="02"
        title={
          <>
            How <Highlight>LeadHanger</Highlight> fixes it
          </>
        }
        lead="From website visitors to sales-ready leads, instantly. This is how LeadHanger solves these issues."
      />

      <div className="reveal mt-14">
        <RouteLine steps={steps} />
      </div>
    </Section>
  );
}
