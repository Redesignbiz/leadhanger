import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/privacy`,
      // The notice's own effective date, from the same constant the page prints.
      lastModified: new Date(site.privacyUpdatedAt),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
