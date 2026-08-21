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

      {/*
        The table scrolls inside its own container. Three columns of real
        sentences cannot compress to a phone width, and letting the page body
        scroll sideways instead would break every other section.
      */}
      <div className="mt-12 overflow-x-auto rounded-lg border border-outline-variant">
        <table className="w-full min-w-[46rem] border-collapse bg-surface-lowest text-left">
          <caption className="sr-only">
            LeadHanger service levels compared across setup, branding,
            qualification, routing, integration and reporting.
          </caption>
          <thead>
            <tr className="border-b border-outline-variant bg-surface-low">
              <th
                scope="col"
                className="w-[15rem] px-5 py-4 text-[13px] font-bold text-ink-muted"
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
