import { site } from "@/lib/site";
import { verticalBySlug } from "@/lib/verticals";
import { addressFooter, cardSize, shareCard } from "@/lib/og";

const vertical = verticalBySlug("windows-and-doors");

export const size = cardSize;
export const contentType = "image/png";
export const alt = `${vertical.name}: ${vertical.headline}`;

/**
 * This vertical page's own share card (website brief, p.26), so a link to it
 * in a cold email or a LinkedIn post shows the page's own headline rather
 * than the home page's. Copy from lib/verticals.ts.
 */
export default function Image() {
  return shareCard({
    eyebrow: `${site.category} · ${vertical.name}`,
    title: vertical.headline,
    lead: vertical.lead,
    footer: addressFooter(`/${vertical.slug}`),
  });
}
