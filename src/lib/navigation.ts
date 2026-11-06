import { verticals } from "./verticals";
import { audit } from "./audit";

export type NavLink = { label: string; href: string; note?: string };
export type NavGroup = { label: string; items: readonly NavLink[] };
export type NavItem = NavLink | NavGroup;

export function isGroup(item: NavItem): item is NavGroup {
  return "items" in item;
}

/**
 * The top menu as the website brief (Drive, November 3, 2026, p.11) lays it
 * out: Solutions · Product · Plans · Proof · Trust, with the main action on
 * the right. The header renders it, and the footer builds its columns from
 * the same list, so the two never drift apart.
 *
 * Solutions lists the vertical pages from lib/verticals.ts; Product and
 * Proof list the brief's pages under them (p.11). /insights is a draft and
 * the case study says "coming soon" until Brisa's written permission arrives
 * (both decided November 6, 2026, to stay on their branch until then).
 *
 * An anchor link would use an absolute path ("/#results"), never a bare
 * fragment: the menus render on every route.
 */
export const nav: readonly NavItem[] = [
  {
    label: "Solutions",
    items: verticals.map((vertical) => ({
      label: vertical.name,
      href: `/${vertical.slug}`,
      note: vertical.audience,
    })),
  },
  {
    label: "Product",
    items: [
      {
        label: "How it works",
        href: "/how-it-works",
        note: "From the brand's website to the appointment, in four steps",
      },
      {
        label: "Dealer app",
        href: "/dealer-app",
        note: "Where dealers call and record each lead",
      },
      {
        label: "Brand dashboard",
        href: "/brand-dashboard",
        note: "Response time and appointments by dealer and region",
      },
      {
        label: "Integrations",
        href: "/integrations",
        note: "What connects today and what is planned",
      },
    ],
  },
  { label: "Plans", href: "/plans" },
  {
    label: "Proof",
    items: [
      {
        label: "Insights",
        href: "/insights",
        note: "Articles and routing test findings",
      },
      {
        label: "Case study",
        href: "/case-studies/brisa",
        note: "A dealer network on LeadHanger since 2023",
      },
    ],
  },
  // The buyer's IT, security and legal reviewer should not have to look for it.
  { label: "Trust", href: "/trust" },
];

/** The main action, the header's button on the right. */
export const navAction: NavLink = { label: audit.cta, href: "/audit" };
