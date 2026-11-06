import { site } from "./site";

/**
 * The home page's share card (app/opengraph-image.tsx), for pages that set
 * their own Open Graph title. A page's `openGraph` replaces the layout's
 * whole, image included, so without this line such a page is shared with no
 * image at all. Pages with a card of their own (the vertical pages) do not
 * need it.
 */
export const homeShareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} · ${site.category}`,
};
