import type { Availability } from "./availability";

/**
 * The three plans, as the website brief (Drive, November 3, 2026, p.22) sets
 * them out. They replace the Lite, Pro and Custom packages that /our-solution
 * showed; that address now redirects to /plans.
 *
 * No prices: the brief keeps them off the site until the pricing decision on
 * February 5, 2027, and every plan's button leads to a conversation. When
 * prices are decided, they become one more row here.
 *
 * Every value that is not live today carries its label, the same labels
 * /integrations uses. Values the brief gives that still need the product
 * team's confirmation are listed in docs/leadhanger-us-brief.md.
 */
export type PlanValue = { text: string; availability?: Availability };
export type PlanCell = readonly PlanValue[];

export type Plan = {
  name: string;
  audience: string;
  cta: string;
  recommended?: boolean;
};

export const plans: readonly Plan[] = [
  { name: "Starter", audience: "For a single dealer", cta: "Talk to sales" },
  {
    name: "Business",
    audience: "For dealer groups and regional chains",
    cta: "Talk to sales",
    // The brief expects this to be the plan most buyers choose.
    recommended: true,
  },
  {
    name: "Enterprise",
    audience: "For manufacturers and brands",
    cta: "Ask about a free 60-day pilot",
  },
];

export const planRows: readonly {
  label: string;
  values: readonly [PlanCell, PlanCell, PlanCell];
}[] = [
  {
    label: "Chat and form",
    values: [
      [{ text: "LeadHanger branded" }],
      [{ text: "Your brand, with window or tire flows" }],
      [{ text: "Built for your products" }],
    ],
  },
  {
    label: "Routing",
    values: [
      [{ text: "By ZIP code" }],
      [{ text: "Rules by region, ZIP code, brand and tier" }],
      [{ text: "AI-assisted matching", availability: "planned" }],
    ],
  },
  {
    label: "Follow-up",
    values: [
      [{ text: "Alerts and the dealer app" }],
      [
        { text: "Call window and reassignment after a set time" },
        { text: "Text or call from one number", availability: "december" },
      ],
      [
        { text: "Full lead operations and dealer scorecard" },
        { text: "Customer satisfaction text", availability: "december" },
      ],
    ],
  },
  {
    label: "Appointments",
    values: [
      [{ text: "Dealer books" }],
      [{ text: "Customer picks a slot", availability: "planned" }],
      [{ text: "Customer picks a slot", availability: "planned" }],
    ],
  },
  {
    label: "Integration",
    values: [
      [{ text: "Email" }, { text: "CSV export", availability: "planned" }],
      [{ text: "REST API and webhooks", availability: "january" }],
      [
        { text: "One CRM connection included", availability: "planned" },
        { text: "White-label app" },
      ],
    ],
  },
  {
    label: "Onboarding",
    values: [
      [{ text: "Self-serve, 1 day" }],
      [{ text: "10 days" }],
      [{ text: "4 to 6 weeks" }],
    ],
  },
  {
    label: "Contract",
    values: [
      [{ text: "Monthly" }],
      [{ text: "Annual" }],
      [{ text: "Annual, free for your dealers" }],
    ],
  },
];

/**
 * The questions the brief lists for /plans, answered from the brief itself.
 * "Can we pay per appointment?" is left out until pricing is decided.
 */
export const planFaqs: readonly { q: string; a: string }[] = [
  {
    q: "Do dealers pay?",
    a: "On Starter and Business, the dealer or dealer group is the customer. On Enterprise, the brand pays, and the dealer app is free for its dealers.",
  },
  {
    q: "Is the pilot free?",
    a: "Yes. Pilots are free and run for 60 days, before an annual contract.",
  },
  {
    q: "Do pilots need integration?",
    a: "No. A pilot runs on the brand dashboard, without connecting your systems. Integrations start with an annual contract and are in place within 30 days.",
  },
  {
    q: "Do you sell leads?",
    a: "No. LeadHanger works with the requests that come from your own website and channels. We do not sell or share them.",
  },
];
