import { Section, SectionHeading } from "./Section";
import { site } from "@/lib/site";

/**
 * Straight from "Leadhanger Service Levels Simplified" (Drive). The wording is
 * deliberately close to that sheet, including the honest "None." entries on
 * Lite: a comparison table that never says no is not a comparison table, and a
 * buyer who finds out later feels sold to.
 *
 * No prices on purpose. Setup runs to three and ten weeks on the upper tiers,
 * which means every deal is scoped before it is quoted.
 *
 * Two layouts, one data source. Three columns of real sentences cannot compress
 * to a phone width: a scrollable table there showed one column with the text
 * sliced mid-word, and scrolling sideways carried the feature name off screen,
 * so a reader could not tell what a value referred to. Below `lg` the same rows
 * stack into one card per tier instead. `rows` feeds both, so the two can never
 * disagree.
 */
const tiers = ["Lite", "Pro", "Custom"] as const;

const rows: { feature: string; values: [string, string, string] }[] = [
  {
    feature: "Setup time",
    values: ["Ready to use", "About 3 weeks", "About 10 weeks"],
  },
  {
    feature: "Customization",
    values: [
      "Standard setup, ready to use",
      "Industry-standard setup with self-service API integration",
      "Tailored to your company, with dedicated setup",
    ],
  },
  {
    feature: "Chat branding",
    values: [
      "Generic LeadHanger branding",
      "White-label: your name and logo",
      "White-label: your name and logo",
    ],
  },
  {
    feature: "Customer interaction",
    values: [
      "Basic. Collects contact details",
      "Industry-specific. Collects detailed requirements",
      "Menus and dialogue built around your catalogue",
    ],
  },
  {
    feature: "Lead qualification",
    values: [
      "Identifies the customer's buying stage",
      "Industry-specific questions for sharper qualification",
      "Uses your product detail to position value and carry campaigns",
    ],
  },
  {
    feature: "Customer consent",
    values: [
      "Captured for brand and dealer",
      "Captured for brand and dealer",
      "Captured for brand and dealer",
    ],
  },
  {
    feature: "Lead matching",
    values: [
      "By location",
      "By your own routing rules",
      "Multiple factors, AI-assisted",
    ],
  },
  {
    feature: "Lead transfer",
    values: [
      "Emailed to the dealer",
      "Delivered in the LeadHanger app",
      "Delivered in your white-labeled app",
    ],
  },
  {
    feature: "Dealer follow-up tracking",
    values: [
      "None",
      "Response tracked and reported",
      "Response tracked and reported",
    ],
  },
  {
    feature: "Customer follow-up",
    values: ["None", "By text or email", "By text or email"],
  },
  {
    feature: "CRM integration",
    values: [
      "None. Leads download from the dashboard",
      "Self-service APIs",
      "Fully integrated with your CRM",
    ],
  },
  {
    feature: "Reporting",
    values: [
      "Standard reports",
      "Industry-specific reports, including dealer follow-up",
      "Reports built to your definitions",
    ],
  },
  {
    feature: "CX operations",
    values: [
      "None",
      "Self-service APIs for CX applications",
      "Fully integrated with your CX stack",
    ],
  },
];

export function Plans() {
  return (
    <Section id="plans" className="border-t border-outline-variant">
      <SectionHeading
        eyebrow="Plans"
        title="Three service levels"
        lead="Start on a standard setup, or have the whole flow built around your catalogue and your CRM. Pricing depends on network size and integration scope, so it is quoted after a scoping call rather than listed here."
      />

      {/* Phone and tablet: one card per tier. */}
      <div className="mt-10 space-y-6 lg:hidden">
        {tiers.map((tier, tierIndex) => (
          <div
            key={tier}
            className="overflow-hidden rounded-lg border border-outline-variant bg-surface-lowest"
          >
            <div className="border-b border-outline-variant bg-surface-low px-5 py-4">
              <h3 className="text-[18px] font-bold tracking-[-0.015em] text-ink">
                {tier}
              </h3>
              {/* Setup time reads as the tier's headline promise, so it sits
                  in the card header rather than in the list below. */}
              <p className="mt-0.5 text-[13px] text-ink-muted">
                <span className="font-semibold">{rows[0].feature}:</span>{" "}
                {rows[0].values[tierIndex]}
              </p>
            </div>

            <dl className="divide-y divide-outline-variant">
              {/* Setup time is already in the card header, so it is skipped here. */}
              {rows.slice(1).map((row) => (
                <div key={row.feature} className="px-5 py-3.5">
                  <dt className="text-[13px] font-semibold text-ink-muted">
                    {row.feature}
                  </dt>
                  <dd
                    className={`mt-1 text-[15px] leading-6 ${
                      row.values[tierIndex] === "None"
                        ? "text-outline"
                        : "text-ink"
                    }`}
                  >
                    {row.values[tierIndex]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* Desktop: the comparison as a comparison. */}
      <div className="mt-12 hidden overflow-x-auto rounded-lg border border-outline-variant lg:block">
        <table className="w-full border-collapse bg-surface-lowest text-left">
          <caption className="sr-only">
            LeadHanger service levels compared across setup, branding,
            qualification, routing, integration and reporting.
          </caption>
          <thead>
            <tr className="border-b border-outline-variant bg-surface-low">
              <th
                scope="col"
                className="w-[14rem] px-5 py-4 text-[13px] font-bold text-ink-muted"
              >
                Feature
              </th>
              {tiers.map((tier) => (
                <th
                  key={tier}
                  scope="col"
                  className="px-5 py-4 text-[15px] font-bold tracking-[-0.01em] text-ink"
                >
                  {tier}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.feature}
                className="border-b border-outline-variant last:border-b-0"
              >
                <th
                  scope="row"
                  className="px-5 py-4 align-top text-[14px] font-semibold text-ink"
                >
                  {row.feature}
                </th>
                {row.values.map((value, index) => (
                  <td
                    key={tiers[index]}
                    className={`px-5 py-4 align-top text-[14px] leading-6 ${
                      value === "None" ? "text-outline" : "text-ink-muted"
                    }`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href="#demo"
          className="rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-primary-bright"
        >
          {site.cta}
        </a>
        <p className="text-[14px] text-ink-muted">
          We will tell you which level fits on the first call.
        </p>
      </div>
    </Section>
  );
}
