import type { Availability } from "./availability";
import type { AuditIndustry } from "./audit";

/**
 * The two ad landing pages, /lp/windows and /lp/tires, from the website brief
 * (Drive, November 3, 2026, p.18). Google Ads sends each search to the page
 * that matches it; the headlines are the brief's, written for that search.
 * The lead under each headline is its vertical page's (lib/verticals.ts), so
 * the two never say different things. Open items are in LandingPage.tsx.
 */
export type Landing = {
  slug: "windows" | "tires";
  industry: Extract<AuditIndustry, "windows-and-doors" | "tires">;
  headline: string;
  /** The brief's "one screen": the conversation thread or the brand dashboard. */
  screen: { label: string; kind: "screen" | "desktop" };
};

export const landings: readonly Landing[] = [
  {
    slug: "windows",
    industry: "windows-and-doors",
    headline: "Dealer lead routing for window brands",
    screen: { label: "The brand dashboard", kind: "desktop" },
  },
  {
    slug: "tires",
    industry: "tires",
    headline: "Appointment routing for tire chains",
    screen: { label: "One conversation thread in the store app", kind: "screen" },
  },
];

export function landingBySlug(slug: Landing["slug"]): Landing {
  const found = landings.find((landing) => landing.slug === slug);
  if (!found) throw new Error(`Unknown landing page: ${slug}`);
  return found;
}

/** The brief's four steps (p.15), with the December label the confirmation list asks for. */
export const landingSteps: readonly { title: string; body: string; availability?: Availability }[] = [
  { title: "Capture", body: "Qualifying form or chat on your site" },
  { title: "Route", body: "Right dealer by ZIP, tier and capacity" },
  {
    title: "Respond and book",
    body: "Dealer texts or calls from one brand number",
    availability: "december",
  },
  { title: "Report", body: "Response time and appointments by dealer" },
];
