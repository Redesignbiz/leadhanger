import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { verticals } from "@/lib/verticals";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...verticals.map((vertical) => ({
      url: `${site.url}/${vertical.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // The product pages. /insights, the case study and the ad landing pages
    // are not here: the first two are drafts and the last are not indexed.
    ...["how-it-works", "dealer-app", "brand-dashboard"].map((path) => ({
      url: `${site.url}/${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${site.url}/audit`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/plans`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/integrations`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${site.url}/trust`,
      // The page's own "Last reviewed" date, from the same constant it prints.
      lastModified: new Date(site.trustReviewedAt),
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
