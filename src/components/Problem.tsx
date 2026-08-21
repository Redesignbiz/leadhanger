import { Section, SectionHeading } from "./Section";

/**
 * The framing, the three failure modes and the closing line are lifted from the
 * Bridgestone engagement narrative (redesignbiz.com/work/bridgestone). Kept
 * close to that wording on purpose: it is the version that has already been
 * through review, and the Results section names the client it came from.
 */
const failures = [
  {
    title: "Nothing on the dealer side to receive it",
    body: "A form submission arrives as an email in a shared inbox. Nobody owns it, nothing prioritizes it, and no one can tell which leads are still open.",
  },
  {
    title: "Response measured in days",
    body: "A buyer who asked about a price on Tuesday hears back on Friday. The intent that made them a lead has already expired.",
  },
  {
    title: "No line of sight after the handoff",
    body: "Marketing can prove it generated demand. Nobody can prove what the network did with it, so the argument stalls on both sides.",
  },
];

export function Problem() {
  return (
    <Section id="problem">
      <SectionHeading
        eyebrow="The gap"
        title="The marketing is working. The handoff is not."
        lead="Products that need fitting, installing or servicing cannot be bought in a checkout. The sale happens at a dealer, which means every digital lead has to survive a handoff, and that is where most of them are lost."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-outline-variant bg-outline-variant lg:grid-cols-3">
        {failures.map((failure, index) => (
          <div key={failure.title} className="bg-surface-lowest p-6">
            <span
              className="text-[13px] font-bold text-outline tabular-nums"
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.01em] text-ink">
              {failure.title}
            </h3>
            <p className="mt-2 text-[15px] leading-6 text-ink-muted">
              {failure.body}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 border-l-2 border-primary pl-5 text-[17px] leading-7 font-medium text-ink sm:text-lg">
        By the time a dealer follows up, the customer has already bought
        elsewhere, often from a competitor with a more responsive local dealer.
      </p>
    </Section>
  );
}
