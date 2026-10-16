import { Highlight, Section, SectionHeading } from "./Section";
import { Tally } from "./Tally";

/**
 * The five failure points, as published on the corporate site, with spelling
 * and punctuation corrected. Order is the order a lead is lost in: money spent
 * to bring the visitor, the visitor leaving, no help, no handoff, gone.
 */
const failures = [
  {
    title: "High costs in digital marketing",
    body: "Companies spend heavily on SEO and digital marketing to attract potential customers.",
  },
  {
    title: "Visitors drop off, wasting the effort",
    body: "Visitors arrive ready to decide, but instead of being guided, they drop off.",
  },
  {
    title: "No support for customers",
    body: "Customers are either pushed into outdated contact forms or left to find a dealer on their own, with no follow-up.",
  },
  {
    title: "Inefficient communication",
    body: "Most companies fail to understand, qualify and efficiently transfer website leads to their dealers, losing high-value opportunities.",
  },
  {
    title: "Losing leads",
    body: "Without smart qualification and instant engagement, high-intent leads go to waste, and those buyers most likely end up with your competitors.",
  },
];

/**
 * The broken state, drawn as the thing it actually is: a shared mailbox.
 *
 * This is the hero's lead card with everything taken out of it. Same panel,
 * same rules, same metadata — and no owner, no routing, no outcome, no
 * second timestamp. The two are meant to be recognised as the same kind of
 * object so the difference between them reads as the product rather than as a
 * change of illustration style.
 *
 * Nothing here animates except the unread count, which climbs. That is the one
 * thing this inbox does.
 *
 * Illustrative, like the hero card: no real mailbox is depicted. Replace with a
 * real capture if one is ever cleared for use (see docs/images.md).
 */
function DeadInbox() {
  const messages = [
    { subject: "Website enquiry — 235/55R19", state: "Unopened", age: "5d" },
    { subject: "Website enquiry — HVAC quote", state: "Unopened", age: "4d" },
    { subject: "Contact form submission", state: "Opened", age: "4d" },
    { subject: "Website enquiry — (no subject)", state: "Unopened", age: "2d" },
  ];

  return (
    <div className="border-line bg-panel rounded-lg border">
      <div className="border-line flex items-center justify-between gap-3 border-b px-5 py-4">
        <span className="eyebrow text-ink-dim">Shared inbox · leads@</span>
        <span className="text-rose-lift text-[11px] tabular-nums">
          <Tally value="47" /> unread
        </span>
      </div>

      <ul className="divide-line divide-y">
        {messages.map((message) => (
          <li
            key={message.subject}
            className="flex items-center gap-4 px-5 py-3"
          >
            <span
              className={`size-1.5 shrink-0 rounded-full ${
                message.state === "Unopened" ? "bg-rose" : "bg-line-strong"
              }`}
              aria-hidden
            />
            <span className="text-ink-muted min-w-0 flex-1 truncate text-[13.5px]">
              {message.subject}
            </span>
            <span className="text-ink-dim shrink-0 text-[11px]">
              {message.state}
            </span>
            <span className="text-rose-lift w-7 shrink-0 text-right text-[11px] tabular-nums">
              {message.age}
            </span>
          </li>
        ))}
      </ul>

      {/*
        The footer is where the hero card carries its routing block. Here the
        same space carries the three things that are missing, which is the whole
        comparison in one line.
      */}
      <div className="border-line flex flex-wrap gap-x-6 gap-y-2 border-t px-5 py-4">
        {["No owner", "No priority", "No outcome"].map((gap) => (
          <span
            key={gap}
            className="text-ink-dim inline-flex items-center gap-2 text-[12px]"
          >
            <svg
              viewBox="0 0 24 24"
              className="text-rose size-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
            {gap}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Problem() {
  return (
    <Section id="problem">
      <SectionHeading
        eyebrow="The gap"
        index="01"
        title={
          <>
            Why is <Highlight>lead management</Highlight> broken?
          </>
        }
        lead="You invest in traffic, but lose the leads."
      />

      <div className="reveal mt-12 max-w-2xl">
        <DeadInbox />
      </div>

      {/*
        Five rows rather than columns: five does not divide into a grid without
        leaving a ragged last row, and a numbered list is what this is. On wide
        screens the title takes a fixed column so the five bodies align.

        Rose is the page's loss colour and it runs through this whole section —
        the inbox above, and these five counters.
      */}
      <ol className="reveal-stack border-line divide-line mt-14 divide-y border-t">
        {failures.map((failure, index) => (
          <li
            key={failure.title}
            className="grid gap-x-8 gap-y-3 py-7 lg:grid-cols-[3rem_18rem_1fr] lg:py-8"
          >
            <span
              className="text-rose-lift text-[12px] tracking-[0.1em] tabular-nums lg:pt-1.5"
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-ink text-[19px] leading-snug font-bold tracking-[-0.015em]">
              {failure.title}
            </h3>
            <p className="text-ink-muted text-[15px] leading-[1.6] lg:pt-0.5">
              {failure.body}
            </p>
          </li>
        ))}
      </ol>

      <p className="reveal border-rose text-ink mt-14 max-w-3xl border-l-2 pl-6 text-[20px] leading-[1.4] font-medium tracking-[-0.02em] text-balance sm:pl-8 sm:text-[24px]">
        By the time a dealer follows up, the customer has already bought
        elsewhere, often from a competitor with a more responsive local dealer.
      </p>
    </Section>
  );
}
