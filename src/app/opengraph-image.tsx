import { site } from "@/lib/site";
import { cardSize, metricsFooter, shareCard } from "@/lib/og";

export const size = cardSize;
export const contentType = "image/png";
export const alt = `${site.name} · ${site.category}: your brand creates the demand, LeadHanger turns it into an appointment`;

/**
 * The home page's share card, also used by the pages without a card of their
 * own (lib/share.ts). The headline is the hero's (Hero.tsx); the metrics are
 * the published four in site.ts. The vertical pages have their own cards.
 */
export default function Image() {
  return shareCard({
    eyebrow: site.category,
    title: "Your brand creates the demand. LeadHanger turns it into an appointment.",
    footer: metricsFooter(),
  });
}
