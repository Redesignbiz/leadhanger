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
      url: `${site.url}/our-solution`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/trust`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${site.url}/support`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // Both pages print the notice's own effective date, from the same constant.
    ...["privacy", "delete-account"].map((path) => ({
      url: `${site.url}/${path}`,
      lastModified: new Date(site.privacyUpdatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
    ...["sms-terms", "sms-consent"].map((path) => ({
      url: `${site.url}/${path}`,
      lastModified: new Date(site.smsUpdatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
