import type { Availability } from "./availability";

/**
 * What connects to LeadHanger today and what is planned, as the website brief
 * (Drive, November 3, 2026, p.21) labels it. Names are listed for
 * compatibility; none of them is a formal partnership, and the page says so.
 * Update the labels with the product team at each release.
 */
export type Integration = {
  name: string;
  availability: Availability;
  note?: string;
};

export const integrationGroups: readonly {
  name: string;
  items: readonly Integration[];
}[] = [
  {
    name: "Intake and dashboard",
    items: [
      { name: "Chat, form and call center intake (API)", availability: "live" },
      { name: "Brand dashboard", availability: "live" },
      { name: "CSV export", availability: "planned" },
    ],
  },
  {
    name: "Developer access",
    items: [
      {
        name: "REST API and webhooks",
        availability: "january",
        note: "Events: lead created, dealer assigned, contacted, booked, won.",
      },
    ],
  },
  {
    name: "Brand CRM",
    items: [
      { name: "Salesforce", availability: "january" },
      { name: "Microsoft Dynamics, HubSpot", availability: "planned" },
    ],
  },
  {
    name: "Ad platforms",
    items: [
      {
        name: "Google Ads and Meta offline conversions",
        availability: "planned",
      },
    ],
  },
  {
    name: "Dealer systems",
    items: [
      {
        name: "Leap, MarketSharp, TireConnect, Tekmetric",
        availability: "on-request",
      },
    ],
  },
  {
    name: "Sign-in",
    items: [
      { name: "SSO with Okta or Microsoft Entra", availability: "on-request" },
    ],
  },
];
