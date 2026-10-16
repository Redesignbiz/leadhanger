import { site } from "@/lib/site";

/**
 * The three service levels: the packages, and the feature comparison.
 *
 * PROVENANCE, and the reason this file exists at all: the previous version was
 * a thirteen-row table transcribed from an internal Drive sheet ("Leadhanger
 * Service Levels Simplified"). That wording was never cleared for publication.
 * It is gone from this component, from the home page, and from the site.
 * Everything below — package copy, row labels, cell values — is the copy Selen
 * supplied on 2026-09-15, and is the only version that may ship.
 *
 * Three deliberate departures from the supplied artwork, each in one place so
 * each can be reversed in one place:
 *
 *   1. The brand is spelled "LeadHanger" throughout, matching `site.name`. The
 *      supplied package cards read "Leadhanger"; the supplied table reads
 *      "LeadHanger". The table's spelling is the one that matches the site.
 *   2. "3 weeeks" in the supplied table is set here as "3 weeks".
 *   3. The accent is this site's blue, not the artwork's blue. The blue
 *      belongs to the palette this site moved off.
 */
const tiers = [
  {
    name: "Lite",
    timing: "Start using within 3 days",
    summary:
      "The Lite package offers basic lead qualification, customer engagement for collecting contact information, and email-based lead transfer matched by dealer location.",
    points: [
      "Identifies customer lead's buying stage",
      "Basic customer engagement",
      "Standard downloadable reports from dashboard",
      "Matches leads to dealers by location",
      "Leads are sent to dealers via email",
    ],
    /*
     * The supplied design marks Pro as the recommended tier: it is the one with
     * the filled button and the lit column. That is encoded as a flag rather
     * than as a badge, because a badge needs words ("Most popular") that
     * nothing here supports.
     */
    recommended: false,
    /* A house, a mid-rise, a tower. The icons carry the scale the three tiers
       step through — the one thing the cards cannot say in words without
       saying it three times. */
    icon: (
      <>
        <path d="M3.5 10.5 12 4l8.5 6.5V20a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-9.5Z" />
        <path d="M9.5 21v-6h5v6" />
      </>
    ),
  },
  {
    name: "Pro",
    timing: "Start using within 3 weeks",
    summary:
      "The Pro package provides industry-tailored lead qualification, detailed reporting, and preference-based lead matching via the LeadHanger app.",
    points: [
      "Qualifies leads with questions tailored to your industry",
      "Industry-specific customer engagement",
      "Industry-specific reports and dealer follow-up insights",
      "Matches leads based on your preferences",
      "Leads are sent via the LeadHanger app",
    ],
    recommended: true,
    icon: (
      <>
        <path d="M4 21V7a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v14" />
        <path d="M15 11.5h4.5a1 1 0 0 1 1 1V21" />
        <path d="M7.5 9.5h1M11 9.5h1M7.5 13h1M11 13h1M7.5 16.5h1M11 16.5h1M17.5 15h.5M17.5 18h.5" />
        <path d="M2.5 21h19" />
      </>
    ),
  },
  {
    name: "Custom",
    timing: "Live in 3 months after full customization",
    summary:
      "The Custom package delivers tailored campaigns, AI-powered lead matching, and advanced white-label app integration, all customized to meet your business needs.",
    points: [
      "Guides lead preferences using your product and campaign details",
      "Collects tailored info based on your needs",
      "Custom reports tailored to your needs",
      "Uses AI and multiple factors to match leads to dealers",
      "Leads are sent via customized white-label LeadHanger app",
    ],
    recommended: false,
    icon: (
      <>
        <path d="M6 21V3.5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1V21" />
        <path d="M9.5 6h1M13 6h1M9.5 9.5h1M13 9.5h1M9.5 13h1M13 13h1M9.5 16.5h1M13 16.5h1" />
        <path d="M2.5 21h19" />
      </>
    ),
  },
] as const;

/**
 * The comparison, one row per feature, values in tier order.
 *
 * `true` means the feature is included with nothing further to qualify, and
 * `false` means it is not in that package. Anything else is the qualifier the
 * supplied table prints. Modelling the first two as booleans rather than as the
 * strings "✓" and "-" is what lets the cells carry real text for a screen
 * reader: a glyph alone in a table cell is unreadable, and thirteen rows of
 * unreadable cells is a table nobody can use without sight.
 */
const comparison: {
  label: string;
  icon: React.ReactNode;
  values: readonly [string | boolean, string | boolean, string | boolean];
}[] = [
  {
    label: "Customer Consent",
    values: [true, true, true],
    icon: (
      <>
        <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
        <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
      </>
    ),
  },
  {
    label: "Customization",
    values: [false, "Limited", "Full"],
    icon: (
      <>
        <path d="M4 20.5 4.9 17a2 2 0 0 1 .53-.95L16.2 5.28a2 2 0 0 1 2.83 0l.7.7a2 2 0 0 1 0 2.83L8.95 19.57a2 2 0 0 1-.95.53L4 20.5Z" />
      </>
    ),
  },
  {
    label: "Chatbot Branding",
    values: [false, true, true],
    icon: (
      <>
        <path d="M21 11.5a7.5 7.5 0 0 1-7.5 7.5H9l-4.5 2.5L6 17.2A7.5 7.5 0 0 1 13.5 4 7.5 7.5 0 0 1 21 11.5Z" />
        <path d="M10 11.5h.01M13.5 11.5h.01M17 11.5h.01" />
      </>
    ),
  },
  {
    label: "CRM Integration",
    values: [false, "Self-service", "Fully integrated"],
    icon: (
      <>
        <ellipse cx="12" cy="6" rx="7.5" ry="3" />
        <path d="M4.5 6v12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6" />
        <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" />
      </>
    ),
  },
  {
    label: "Dealer Follow-up",
    values: [false, true, true],
    icon: (
      <>
        <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
      </>
    ),
  },
  {
    label: "Customer Follow-up",
    values: [false, true, true],
    icon: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
        <path d="M16.5 5.2a3.5 3.5 0 0 1 0 5.6M18.5 13.2a6.5 6.5 0 0 1 3 5.3" />
      </>
    ),
  },
  {
    label: "Customer Experience Operations",
    values: [false, "Self-service", "Fully integrated"],
    icon: (
      <>
        <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9-5.3-2.9-5.3 2.9 1.1-5.9L3.5 9.7l5.9-.8L12 3.5Z" />
      </>
    ),
  },
  {
    label: "Lead Qualification",
    values: ["Standard", "Industry-Specific", "Company-Specific"],
    icon: (
      <>
        <path d="M13.5 2.5 4 14h7l-.5 7.5L20 10h-7l.5-7.5Z" />
      </>
    ),
  },
  {
    label: "Customer Engagement",
    values: ["Standard", "Industry-Specific", "Company-Specific"],
    icon: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20.5a7 7 0 0 1 14 0" />
      </>
    ),
  },
  {
    label: "Dashboard",
    values: ["Standard", "Industry-Specific", "Company-Specific"],
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M8.5 9v11" />
      </>
    ),
  },
  {
    label: "Lead Matching",
    values: ["Dealer location", "Company-Specific", "Company-Specific"],
    icon: (
      <>
        <path d="M3 8.5h13.5a4 4 0 0 1 0 8H7.5" />
        <path d="m6.5 5 -3.5 3.5 3.5 3.5M10.5 13l-3 3.5 3 3.5" />
      </>
    ),
  },
  {
    label: "Lead Transfer",
    values: ["E-mail", "LeadHanger App", "White-labeled App"],
    icon: (
      <>
        <circle cx="18" cy="5.5" r="2.5" />
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="18.5" r="2.5" />
        <path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1" />
      </>
    ),
  },
  {
    label: "Live in",
    values: ["3 days", "3 weeks", "3 months"],
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
];

function CircleCheck({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </svg>
  );
}

/**
 * One cell's value, in whichever of the three shapes it takes. The boolean
 * cases carry their meaning as text for assistive technology, because the
 * glyph on its own says nothing.
 */
function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <>
        <CircleCheck className="text-blue-pale mx-auto size-5" />
        <span className="sr-only">Included</span>
      </>
    );
  }

  if (value === false) {
    return (
      <>
        <span className="text-ink-dim" aria-hidden>
          &mdash;
        </span>
        <span className="sr-only">Not included</span>
      </>
    );
  }

  return <>{value}</>;
}

/** The three packages, side by side. */
export function ServiceLevels() {
  return (
    <div className="reveal-stack grid gap-4 lg:grid-cols-3">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`flex flex-col rounded-lg border p-6 transition-colors sm:p-7 ${
            tier.recommended
              ? "border-blue/45 bg-panel-blue"
              : "border-line bg-panel hover:border-line-strong"
          }`}
        >
          <div className="flex items-center gap-3">
            <svg
              viewBox="0 0 24 24"
              className="text-blue-pale size-6 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {tier.icon}
            </svg>
            <h2 className="text-ink text-[24px] font-bold tracking-[-0.025em]">
              {tier.name}
            </h2>
          </div>

          <p className="text-blue-pale mt-5 flex items-start gap-2 text-[14px] font-semibold">
            <svg
              viewBox="0 0 24 24"
              className="mt-[3px] size-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7.5V12l3 2" />
            </svg>
            {tier.timing}
          </p>

          <p className="text-ink-muted mt-4 text-[15px] leading-[1.6]">
            {tier.summary}
          </p>

          <ul className="border-line mt-6 space-y-3 border-t pt-6">
            {tier.points.map((point) => (
              <li key={point} className="flex gap-3">
                <CircleCheck className="text-blue-pale mt-[3px] size-4 shrink-0" />
                <span className="text-ink text-[14.5px] leading-[1.5] font-medium">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          {/*
            `mt-auto` is what keeps the three buttons on one line across the row
            even though the three cards carry different amounts of copy.

            The subject names the tier, so an enquiry arrives already routed.
            There is no form on this site and no endpoint to post one to — the
            reasoning is in PartnerCta.tsx.
          */}
          <a
            href={`mailto:${site.contact.sales}?subject=${encodeURIComponent(
              `${site.name} — ${tier.name}`,
            )}`}
            className={`mt-auto rounded-full px-6 py-3 text-center text-[15px] font-semibold transition-colors ${
              tier.recommended
                ? "bg-blue hover:bg-blue-hover text-white"
                : "border-line-strong text-ink hover:bg-panel-high border"
            }`}
          >
            Get started
          </a>
        </div>
      ))}
    </div>
  );
}

/**
 * The comparison matrix.
 *
 * Below `lg` this is not a table at all. Three columns of qualifiers cannot
 * compress to a phone: a horizontally scrolling table carries the row label off
 * screen and the reader loses what the value refers to. The same thirteen rows
 * stack instead, each carrying its three answers with the tier named on every
 * line. One data source feeds both, so the two can never disagree.
 */
export function FeatureComparison() {
  return (
    <>
      <div className="reveal-stack border-line divide-line divide-y border-y lg:hidden">
        {comparison.map((row) => (
          <div key={row.label} className="py-5">
            <p className="text-ink flex items-center gap-2.5 text-[15px] font-semibold">
              <svg
                viewBox="0 0 24 24"
                className="text-blue-pale size-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {row.icon}
              </svg>
              {row.label}
            </p>

            <dl className="mt-3 space-y-2">
              {tiers.map((tier, index) => (
                <div key={tier.name} className="flex items-baseline gap-3">
                  <dt className="text-ink-dim w-14 shrink-0 text-[11.5px]">
                    {tier.name}
                  </dt>
                  <dd className="text-ink text-[14px] leading-[1.5]">
                    {/* The check is centred inside a table cell; inline in a
                        list it has to sit on the text baseline instead. */}
                    {row.values[index] === true ? (
                      <span className="text-blue-pale inline-flex items-center gap-2">
                        <CircleCheck className="size-4" />
                        Included
                      </span>
                    ) : row.values[index] === false ? (
                      <span className="text-ink-dim">Not included</span>
                    ) : (
                      row.values[index]
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <div className="reveal border-line hidden overflow-hidden rounded-lg border lg:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            LeadHanger service levels compared across consent, customization,
            branding, CRM and CX integration, follow-up, qualification,
            engagement, reporting, matching, transfer and time to launch.
          </caption>
          <thead>
            <tr className="border-line bg-panel border-b">
              <th scope="col" className="eyebrow text-ink-dim px-5 py-4">
                Feature
              </th>
              {tiers.map((tier) => (
                <th
                  key={tier.name}
                  scope="col"
                  className={`border-line text-ink w-[20%] border-l px-5 py-4 text-center text-[17px] font-bold tracking-[-0.02em] ${
                    tier.recommended ? "bg-panel-blue" : ""
                  }`}
                >
                  {tier.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr
                key={row.label}
                className="border-line border-b last:border-b-0"
              >
                <th
                  scope="row"
                  className="text-ink px-5 py-3.5 text-[14px] font-medium"
                >
                  <span className="flex items-center gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      className="text-blue-pale size-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      {row.icon}
                    </svg>
                    {row.label}
                  </span>
                </th>
                {row.values.map((value, index) => (
                  <td
                    key={tiers[index].name}
                    className={`border-line text-ink-muted border-l px-5 py-3.5 text-center text-[13.5px] ${
                      tiers[index].recommended ? "bg-panel-blue/60" : ""
                    }`}
                  >
                    <Cell value={value} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
