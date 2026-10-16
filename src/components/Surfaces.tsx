import type { ReactNode } from "react";
import { Section, SectionHeading } from "./Section";

/**
 * LeadHanger is not one screen. It is three surfaces, and each one belongs to a
 * different group of people: your visitors, your network, your team. Buyers ask
 * "what would my dealers actually have to use", so this section has to show
 * three screens rather than describe them — the bullets underneath are the
 * caption, not the answer.
 *
 * Every mockup here is illustrative. No real conversation, dealer or reporting
 * figure is depicted, which is also why the dashboard carries no numbers: a
 * percentage printed on a landing page is read as a claim even when it sits
 * inside a picture of a screen. Replace all three with real captures when any
 * exist (see docs/images.md).
 */

/** The visitor's side: a qualifying exchange, still in progress. */
function ChatMockup() {
  const turns = [
    { from: "them", text: "Do you have 235/55R19 in stock?" },
    { from: "us", text: "What vehicle is it for?" },
    { from: "them", text: "2022 SUV — all-season" },
  ];

  return (
    <div className="reveal-stack flex h-full flex-col justify-end gap-2">
      {turns.map((turn) => (
        <div
          key={turn.text}
          className={`max-w-[85%] rounded-md px-3 py-2 text-[12.5px] leading-[1.4] ${
            turn.from === "us"
              ? "bg-blue/18 border-blue/30 text-ink self-start border"
              : "bg-panel-high border-line text-ink-muted self-end border"
          }`}
        >
          {turn.text}
        </div>
      ))}
      <div className="bg-blue/18 border-blue/30 self-start rounded-md border px-3 py-2.5">
        <span className="typing flex gap-1" aria-hidden>
          <span />
          <span />
          <span />
        </span>
      </div>
    </div>
  );
}

/** The network's side: today's list, with the one that is due marked. */
function AppMockup() {
  const leads = [
    { time: "12:15", place: "Brooklyn, NY", due: true },
    { time: "13:40", place: "Bay Ridge", due: false },
    { time: "15:00", place: "Sunset Park", due: false },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="border-line flex items-center justify-between border-b pb-2.5">
        <span className="eyebrow text-ink-dim">Today</span>
        <span className="text-ink-dim text-[11px] tabular-nums">
          3 leads
        </span>
      </div>

      <ul className="reveal-stack divide-line mt-1 divide-y">
        {leads.map((lead) => (
          <li key={lead.time} className="flex items-center gap-3 py-2.5">
            <span className="text-ink w-9 shrink-0 text-[11.5px] tabular-nums">
              {lead.time}
            </span>
            <span className="text-ink-muted min-w-0 flex-1 truncate text-[12.5px]">
              {lead.place}
            </span>
            {lead.due ? (
              <span className="bg-sage/12 border-sage/40 text-sage-lift shrink-0 rounded-full border px-2 py-0.5 text-[10px]">
                Call now
              </span>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="text-ink-dim size-3.5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The brand's side: response by dealer, as the dashboard reports it.
 *
 * One series, so one hue and no legend — the title names what the bars are. The
 * bars carry no value labels on purpose (see the note at the top of this file),
 * and they are all the same blue: colouring the longest one differently would
 * encode rank in hue, which breaks the moment the sort order changes.
 *
 * Each bar's length lives in its own `width`; the growth animation declares only
 * a `from`, so the number is never written down twice.
 */
function DashboardMockup() {
  const dealers = [
    { name: "Bay Ridge", width: "92%" },
    { name: "Flatbush", width: "78%" },
    { name: "Midwood", width: "64%" },
    { name: "Canarsie", width: "47%" },
  ];

  return (
    <div className="flex h-full flex-col">
      <p className="eyebrow text-ink-dim">Response within window</p>

      <div className="mt-4 flex flex-1 flex-col justify-center gap-2.5">
        {dealers.map((dealer) => (
          <div key={dealer.name} className="flex items-center gap-3">
            <span className="text-ink-muted w-16 shrink-0 truncate text-[11.5px]">
              {dealer.name}
            </span>
            {/* The track is the axis; it is recessive, and the bar is anchored
                to it so the rounded end always marks the data end. */}
            <div className="bg-panel-high h-2 flex-1 overflow-hidden rounded-sm">
              <div
                className="bar-grow bg-blue h-full rounded-r-sm"
                style={{ width: dealer.width }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const surfaces: {
  audience: string;
  title: string;
  points: string[];
  visual: ReactNode;
}[] = [
  {
    audience: "Your visitors",
    title: "Conversation on your site",
    points: [
      "Added with one line of script",
      "Structured dialogue instead of a static form",
      "Consent captured in the flow",
      "Your branding on Pro and Custom",
    ],
    visual: <ChatMockup />,
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
    visual: <AppMockup />,
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
    visual: <DashboardMockup />,
  },
];

export function Surfaces() {
  return (
    <Section id="platform">
      <SectionHeading
        eyebrow="The platform"
        index="03"
        title="Three surfaces, one handoff"
        lead="The brand side and the dealer side are the same system, which is the only way response time becomes a number anyone can act on."
      />

      <div className="reveal-stack mt-14 grid gap-4 lg:grid-cols-3">
        {surfaces.map((surface) => (
          <div
            key={surface.title}
            className="border-line bg-panel hover:border-line-strong overflow-hidden rounded-lg border transition-colors"
          >
            {/* The screen. A fixed height across all three so the three cards
                line up on the fold below the mockups rather than ragging. */}
            <div className="border-line bg-ground h-[186px] border-b p-5">
              {surface.visual}
            </div>

            <div className="p-6">
              <p className="eyebrow text-ink-dim">{surface.audience}</p>
              <h3 className="text-ink mt-2 text-[19px] leading-snug font-bold tracking-[-0.015em]">
                {surface.title}
              </h3>

              <ul className="border-line divide-line mt-5 divide-y border-t">
                {surface.points.map((point) => (
                  <li
                    key={point}
                    className="text-ink-muted py-2.5 text-[14px] leading-[1.5]"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
