import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * AI crawlers the website brief names, listed by name so the permission is
 * explicit rather than implied by the wildcard. The site is built to be read
 * by AI assistants as well as by search engines: /llms.txt is their summary.
 */
const aiCrawlers = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
